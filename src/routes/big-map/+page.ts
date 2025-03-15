import { getBigMap } from '$lib/client/map.js'

export const load = async ({ fetch }) => {
  return {
    maps: await getBigMap(fetch)
  }
}
