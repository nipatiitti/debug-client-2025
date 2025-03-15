import type { RequestHandler } from '@sveltejs/kit'
import { serverResolveBigMap } from './cachedMap'

export const GET: RequestHandler = async (req) => {
  const bigMaps = await serverResolveBigMap()

  return new Response(JSON.stringify(bigMaps), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
