import type { ServerGame } from '$lib/types/Game'

export const getMap = async () => {
  const res = await fetch('/api/getMap')
  return (await res.json()) as ServerGame
}
