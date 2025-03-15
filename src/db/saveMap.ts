import type { ServerGame } from '$lib/types/Game'
import type { ObjectId } from 'mongodb'
import { getDb } from './mongo'

export type DbGame = ServerGame & {
  _id?: ObjectId
}

export const saveMap = async (game: ServerGame, token: string) => {
  await (await getDb()).collection('games').updateOne(
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
