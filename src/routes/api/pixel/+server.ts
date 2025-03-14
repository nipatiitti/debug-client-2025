import { authCookie, baseUrl } from '$lib/client'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { x, y } = await request.json()
    if (!x || !y) {
      return new Response(JSON.stringify({ error: 'Missing x or y' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const res = await fetch(`${baseUrl}/api/v1/state/map/pixels`, {
      headers: {
        Cookie: authCookie,
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
