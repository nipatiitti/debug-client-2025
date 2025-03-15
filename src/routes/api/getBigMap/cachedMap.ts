import type { ServerGame } from '$lib/types/Game'
import { resolveBigMap } from '$lib/utils/mapUtils'
import type { ObjectId } from 'mongodb'
import { getFreshMaps } from '../../../db/map'
import { getDb } from '../../../db/mongo'

type serverBigMap = {
  _id?: ObjectId
  maps: ServerGame[]
  createdAt: Date
}

const UPDATE_INTERVAL = 1000 * 30 // 30 seconds

const serverResolveBigMap = async () => {
  const db = await getDb()

  // Find the latest big map from db
  const maps = db.collection('big-maps')
  const bigMap = await maps.findOne({}, { sort: { _id: -1 } })

  // If the latest big map is older than UPDATE_INTERVAL, update it
  if (!bigMap || new Date().getTime() - bigMap.createdAt.getTime() > UPDATE_INTERVAL) {
    console.log(`Calculating THE BIG MAP`)
    const maps = await getFreshMaps()
    console.log(`Found ${maps.length} maps`)

    const serverMaps = maps.map(
      (map) =>
        [
          map.token,
          {
            playerSpawn: map.playerSpawn,
            pixels: map.pixels
          }
        ] as [string, ServerGame]
    )
    const bigMaps = resolveBigMap(serverMaps)

    // Save the big map to db
    await db.collection('big-maps').insertOne({
      maps: bigMaps,
      createdAt: new Date()
    })

    return bigMaps
  }
}
