import { authCookie, baseUrl } from '$lib/client'
import type { RequestHandler } from '@sveltejs/kit'

// This way we can insert x-Authorization cookie and circumvent CORS
export const GET: RequestHandler = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/users/current`, {
      headers: {
        Cookie: authCookie
      },
      credentials: 'include'
    })
    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    console.log(e)

    return new Response(JSON.stringify({ error: 'Failed to fetch all user data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
