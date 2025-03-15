import type { ServerGame } from '$lib/types/Game'
import type { ObjectId } from 'mongodb'
import { getDb } from './mongo'

export type DbGame = ServerGame & {
  _id?: ObjectId
  token: string
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

export const getAllMaps = async () => {
  const db = await getDb()
  return db.collection('games').find().toArray() as Promise<DbGame[]>
}
