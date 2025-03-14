import type { CurrentUser } from '$lib/types/Users'

export const getUser = async () => {
  const res = await fetch('/api/users/current')
  return (await res.json()) as CurrentUser
}

export const allUsers = async () => {
  const res = await fetch('/api/users')
  return (await res.json()) as CurrentUser[]
}
