import { authCookie, baseUrl } from '$lib/client'
import type { PlayerSpawn, ServerGame, ServerPixel } from '$lib/types/Game'
import type { ObjectId } from 'mongodb'
import { getDb } from './mongo'

export type DbGame = ServerGame & {
  _id?: ObjectId
  token: string
  lastUpdated: Date
}

export const upsertMap = async (game: ServerGame, token: string) => {
  const db = await getDb()
  await db.collection('games').updateOne(
    { token },
    {
      $set: {
        pixels: game.pixels,
        playerSpawn: game.playerSpawn,
        lastUpdated: new Date(),
        token
      }
    },
    { upsert: true }
  )
}

const STALE = 1000 * 60 * 5 // 5 minutes

export const getNewMap = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/state/map/pixels`, {
      headers: {
        Cookie: authCookie(token)
      },
      credentials: 'include'
    })

    if (!res.ok) {
      console.error(res)
      throw new Error(`Failed to fetch map for ${token}`)
    }

    // If the response is huge (over 15MB) just return an empty object
    const contentLength = res.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 15 * 1024 * 1024) {
      console.log(`Huge request detected (size: ${contentLength}). Skipping it.`)
      return {
        pixels: [],
        playerSpawn: { x: 0, y: 0 },
        token,
        lastUpdated: new Date()
      } as DbGame
    }

    // Check content type to ensure it's actually JSON
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Unexpected content type: ${contentType}`)
      throw new Error(`API returned non-JSON response: ${contentType}`)
    }

    // Get the text first to see what we're dealing with
    const text = await res.text()
    let rawData

    try {
      rawData = JSON.parse(text) as {
        pixels: (ServerPixel & { backgroundGraphic?: string })[][]
        playerSpawn: PlayerSpawn
        token: string
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Response text (truncated):', text.substring(0, 200) + '...')
      throw new Error('Failed to parse API response as JSON')
    }

    // Strip out the backgroundGraphic to prevent BSON serialization issues
    const data = {
      ...rawData,
      pixels: rawData.pixels.map((row) =>
        row.map((pixel) => {
          const { backgroundGraphic, ...rest } = pixel
          return rest
        })
      )
    }

    await upsertMap(data, token)

    return data
  } catch (e) {
    console.log(`Failed to fetch map for ${token}`)
    console.error(e)
    // Return a minimal valid object to prevent cascade failures
    return {
      pixels: [],
      playerSpawn: { x: 0, y: 0 },
      token,
      lastUpdated: new Date()
    } as DbGame
  }
}

export const getFreshMaps = async () => {
  const db = await getDb()
  const maps = (await db.collection('games').find().toArray()) as DbGame[]

  // Check for stale maps but return the existing ones immediately
  maps.forEach((map) => {
    if (new Date().getTime() - map.lastUpdated.getTime() > STALE) {
      console.log(`Map ${map.token.split('.')[1]} is stale, updating in background`)
      // Fire and forget - update in the background
      getNewMap(map.token).catch((err) =>
        console.error(`Background update failed for map ${map.token.split('.')[1]}:`, err)
      )
    }
  })

  console.log(`Returning ${maps.length} maps (background refresh if needed)`)
  return maps
}
