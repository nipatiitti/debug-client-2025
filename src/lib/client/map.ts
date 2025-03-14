import type { ServerGame } from '$lib/types/Game'

export const getMap = async (token: string) => {
  const res = await fetch(`/api/getMap?token=${token}`)
  return (await res.json()) as ServerGame
}
