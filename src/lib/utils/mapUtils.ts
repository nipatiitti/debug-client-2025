import type { ServerGame, ServerPixel } from '$lib/types/Game'
import type { LocalGame } from '$lib/types/LocalGame'
import { PixelGuild, PixelTypes } from './constants'

// Map indexed by [y][x]: ServerPixel
export type BigMap = Map<number, Map<number, ServerPixel>>

/**
 * ServerMap to LocalMap
 * @param serverMap
 * @returns LocalMap
 */
export const serverMapToLocalMap = (serverMap: ServerGame): LocalGame => {
  const newMap: LocalGame = {
    pixels: [],
    playerSpawn: serverMap.playerSpawn
  }

  newMap.pixels = serverMap.pixels.map((row, rowIndex) =>
    row.map((pixel, colIndex) => ({
      ...pixel,
      x: colIndex - serverMap.playerSpawn.x,
      y: rowIndex - serverMap.playerSpawn.y
    }))
  )

  return newMap
}

/**
 * Return map of all spawn points
 * @param serverMap
 * @returns Map of all spawn points in the format of [playerId, [x, y]]
 */
export const getSpawnPoints = (serverMap: ServerGame): Map<number, [number, number]> => {
  const spawnPoints = new Map<number, [number, number]>()
  serverMap.pixels.forEach((row, i) => {
    row.forEach((pixel, j) => {
      if (pixel.type === PixelTypes.Spawn) {
        spawnPoints.set(pixel.owner, [j, i])
      }
    })
  })
  return spawnPoints
}

/**
 * Resolve multiple ServerMaps to several big maps
 * @param serverMaps
 * @returns BigMap
 */
export const resolveBigMap = (maps: [string, ServerGame][]): ServerGame[] => {
  // Step 1: Find all spawn points for all maps
  const mapSpawnPoints = new Map<string, Map<number, [number, number]>>()
  maps.forEach(([token, map]) => {
    const spawnPoints = getSpawnPoints(map)
    mapSpawnPoints.set(token, spawnPoints)
  })

  // Step 2: Build the graph - maps are connected if they share spawn points
  const graph: Map<string, Set<string>> = new Map()
  // Initialize the graph
  maps.forEach(([token]) => {
    graph.set(token, new Set())
  })

  // Connect maps that share spawn points (same player ID)
  for (let i = 0; i < maps.length; i++) {
    const [tokenA] = maps[i]
    const spawnPointsA = mapSpawnPoints.get(tokenA)!

    for (let j = i + 1; j < maps.length; j++) {
      const [tokenB] = maps[j]
      const spawnPointsB = mapSpawnPoints.get(tokenB)!

      // Check for common spawn points
      for (const [ownerId] of spawnPointsA) {
        if (spawnPointsB.has(ownerId)) {
          // Connect these maps
          graph.get(tokenA)!.add(tokenB)
          graph.get(tokenB)!.add(tokenA)
          break
        }
      }
    }
  }

  // Step 3: Find all connected components (networks)
  const visited = new Set<string>()
  const networks: string[][] = []

  for (const token of graph.keys()) {
    if (!visited.has(token)) {
      const network: string[] = []
      dfs(token, network, visited, graph)
      networks.push(network)
    }
  }

  console.log(`Found ${networks.length} networks: ${networks.map((network) => network.join(' -> ')).join('\n')}`)

  // Step 4: For each network, construct a BigMap
  const bigMaps: BigMap[] = []

  for (const network of networks) {
    // Start with the first map in the network
    const startToken = network[0]
    const startMap = maps.find(([token]) => token === startToken)![1]

    // Initialize BigMap
    const bigMap: BigMap = new Map()

    // Add first map's pixels to BigMap with original coordinates
    startMap.pixels.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (!bigMap.has(y)) {
          bigMap.set(y, new Map())
        }
        bigMap.get(y)!.set(x, { ...pixel })
      })
    })

    // Track which tokens have been processed
    const processedTokens = new Set([startToken])

    // Process remaining maps in the network
    let changed = true

    // Keep iterating until no more maps can be added or all maps are processed
    while (changed && processedTokens.size < network.length) {
      changed = false

      for (const token of network) {
        if (processedTokens.has(token)) continue

        const map = maps.find(([t]) => t === token)![1]
        const mapSpawns = mapSpawnPoints.get(token)!

        // Check if this map shares any spawn points with the current BigMap
        let commonOwnerId = -1
        let bigMapSpawnX = -1
        let bigMapSpawnY = -1
        let mapSpawnX = -1
        let mapSpawnY = -1

        // Search for a common spawn point
        outerLoop: for (const [ownerId, [x, y]] of mapSpawns) {
          for (const [bigY, xMap] of bigMap) {
            for (const [bigX, pixel] of xMap) {
              if (pixel.type === PixelTypes.Spawn && pixel.owner === ownerId) {
                commonOwnerId = ownerId
                bigMapSpawnX = bigX
                bigMapSpawnY = bigY
                mapSpawnX = x
                mapSpawnY = y
                break outerLoop
              }
            }
          }
        }

        // If a common spawn point was found, add this map to the BigMap
        if (commonOwnerId !== -1) {
          // Calculate offset to align the common spawn point
          const offsetX = bigMapSpawnX - mapSpawnX
          const offsetY = bigMapSpawnY - mapSpawnY

          // Add all pixels from this map to the BigMap with the calculated offset
          map.pixels.forEach((row, y) => {
            row.forEach((pixel, x) => {
              const bigY = y + offsetY
              const bigX = x + offsetX

              // Initialize row if needed
              if (!bigMap.has(bigY)) {
                bigMap.set(bigY, new Map())
              }

              // Check for conflicts
              if (bigMap.get(bigY)!.has(bigX)) {
                const existingPixel = bigMap.get(bigY)!.get(bigX)!

                // If existing pixel is FogOfWar, replace it
                if (existingPixel.type === PixelTypes.FogOfWar) {
                  bigMap.get(bigY)!.set(bigX, { ...pixel })
                }
                // Otherwise, keep the existing one (it was added earlier)
              } else {
                // No conflict, just add the pixel
                bigMap.get(bigY)!.set(bigX, { ...pixel })
              }
            })
          })

          // Mark this map as processed
          processedTokens.add(token)
          changed = true
        }
      }
    }

    // Add this BigMap to the result
    bigMaps.push(bigMap)
  }

  // Step 5: Convert each BigMap to a square 2D array
  const serializedMaps: ServerGame[] = bigMaps.map((bigMap) => {
    // Find min and max coordinates
    let minX = Infinity,
      maxX = -Infinity
    let minY = Infinity,
      maxY = -Infinity

    for (const [y, xMap] of bigMap) {
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)

      for (const x of xMap.keys()) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
      }
    }

    // Create a square 2D array filled with fog of war pixels
    const width = maxX - minX + 1
    const height = maxY - minY + 1

    const pixels = Array(height)
      .fill(0)
      .map(() =>
        Array(width)
          .fill(0)
          .map(() => ({
            type: PixelTypes.FogOfWar,
            owner: 0,
            guild: PixelGuild.Nobody
          }))
      )

    // Fill with actual pixels from the BigMap
    for (const [y, xMap] of bigMap) {
      const normalizedY = y - minY

      for (const [x, pixel] of xMap) {
        const normalizedX = x - minX
        pixels[normalizedY][normalizedX] = { ...pixel, guild: pixel.guild || PixelGuild.Nobody }
      }
    }

    // Create a ServerGame structure
    return {
      pixels,
      playerSpawn: { x: 0, y: 0 } // Default value, adjust if needed
    }
  })

  return serializedMaps
}

function dfs(token: string, network: string[], visited: Set<string>, graph: Map<string, Set<string>>) {
  visited.add(token)
  network.push(token)

  for (const neighbor of graph.get(token)!) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, network, visited, graph)
    }
  }
}
