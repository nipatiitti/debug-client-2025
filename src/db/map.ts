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

    const rawData = (await res.json()) as {
      pixels: (ServerPixel & { backgroundGraphic?: string })[][]
      playerSpawn: PlayerSpawn
      token: string
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

  // Make sure the maps are not stale and get new ones if they are
  const freshMaps = await Promise.all(
    maps.map(async (map) => {
      if (new Date().getTime() - map.lastUpdated.getTime() > STALE) {
        console.log(`Map ${map.token.split('.')[1]} is stale, fetching new one`)
        return await getNewMap(map.token)
      }
      return map
    })
  )

  console.log(`Found ${freshMaps.length} fresh maps`)
  return freshMaps
}
