import type { CurrentUser } from '$lib/types/Users'

export const getUser = async (token: string) => {
  const res = await fetch(`/api/users/current?token=${token}`)
  return (await res.json()) as CurrentUser
}
