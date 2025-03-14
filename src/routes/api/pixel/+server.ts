import { authCookie, baseUrl } from '$lib/client'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (req) => {
  try {
    const { x, y, token } = await req.request.json()
    if (!x || !y || !token) {
      return new Response(JSON.stringify({ error: 'Missing x, y or' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const res = await fetch(`${baseUrl}/api/v1/state/map/pixels`, {
      headers: {
        Cookie: authCookie(token),
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ x, y }),
      method: 'POST'
    })

    return new Response(JSON.stringify(await res.json()), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Failed to claim pixel' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
