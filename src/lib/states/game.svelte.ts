import type { LocalGame } from '$lib/types/LocalGame'

export let game = $state<LocalGame>({
  pixels: [],
  playerSpawn: { x: 0, y: 0 },
  highlightedUser: undefined
})
