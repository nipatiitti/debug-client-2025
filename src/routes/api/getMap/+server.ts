import { authCookie, baseUrl } from '$lib/client'
import type { PlayerSpawn, ServerPixel } from '$lib/types/Game'
import type { RequestHandler } from '@sveltejs/kit'

// This way we can insert x-Authorization cookie and circumvent CORS
export const GET: RequestHandler = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/state/map/pixels`, {
      headers: {
        Cookie: authCookie
      },
      credentials: 'include'
    })

    const data = (await res.json()) as {
      pixels: (ServerPixel & { backgroundGraphic?: string })[][]
      playerSpawn: PlayerSpawn
    }

    const newData = {
      // Strip out the backgroundGraphic from the pixels
      pixels: data.pixels.map((row) =>
        row.map((pixel) => {
          delete pixel.backgroundGraphic
          return pixel
        })
      ),
      playerSpawn: data.playerSpawn
    }

    return new Response(JSON.stringify(newData), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    console.log(e)

    return new Response(JSON.stringify({ error: 'Failed to fetch map data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
