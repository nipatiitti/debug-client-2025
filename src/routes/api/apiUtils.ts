import type { RequestEvent } from '@sveltejs/kit'

export const getTokenFromQuery = (req: RequestEvent): string | null => {
  const query = req.url.searchParams
  const token = query.get('token')
  return token
}
