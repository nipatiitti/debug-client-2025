import { authCookie, baseUrl } from '$lib/client'
import type { PlayerSpawn, ServerPixel } from '$lib/types/Game'
import type { RequestHandler } from '@sveltejs/kit'
import { upsertMap } from '../../../db/map'
import { getTokenFromQuery } from '../apiUtils'

// This way we can insert x-Authorization cookie and circumvent CORS
export const GET: RequestHandler = async (req) => {
  const token = getTokenFromQuery(req)
  if (!token) {
    return new Response(JSON.stringify({ error: 'No token provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const res = await fetch(`${baseUrl}/api/v1/state/map/pixels`, {
      headers: {
        Cookie: authCookie(token)
      },
      credentials: 'include'
    })

    // Check content type to ensure it's actually JSON
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Unexpected content type: ${contentType}`)
      throw new Error(`API returned non-JSON response: ${contentType}`)
    }

    let json

    // If the response is huge (over 15MB) we will use streams
    const contentLength = res.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 15 * 1024 * 1024) {
      console.log(`Huge request detected (size: ${contentLength}). Streaming it straight trough.`)

      return new Response(res.body, {
        status: res.status,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      json = await res.json()
    }

    // Parse
    const data = json as {
      pixels: (ServerPixel & { backgroundGraphic?: string })[][]
      playerSpawn: PlayerSpawn
    }

    await upsertMap(data, token)

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
