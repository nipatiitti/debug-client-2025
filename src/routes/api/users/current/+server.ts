import { authCookie, baseUrl } from '$lib/client'
import type { CurrentUser } from '$lib/types/Users'
import type { RequestHandler } from '@sveltejs/kit'
import { upsertUser } from '../../../../db/users'
import { getTokenFromQuery } from '../../apiUtils'

// This way we can insert x-Authorization cookie and circumvent CORS
export const GET: RequestHandler = async (req) => {
  const token = getTokenFromQuery(req)
  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing token' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const res = await fetch(`${baseUrl}/api/v1/users/current`, {
      headers: {
        Cookie: authCookie(token)
      },
      credentials: 'include'
    })
    const data = (await res.json()) as CurrentUser

    await upsertUser(data, token)

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
