import type { ServerGame } from '$lib/types/Game'
import { resolveBigMap } from '$lib/utils/mapUtils'
import type { RequestHandler } from '@sveltejs/kit'
import { getFreshMaps } from '../../../db/map'

export const GET: RequestHandler = async (req) => {
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

  return new Response(JSON.stringify(bigMaps), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
