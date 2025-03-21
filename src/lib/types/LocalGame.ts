import type { PlayerSpawn, ServerPixel } from './Game'

export type LocalPixel = ServerPixel & {
  x: number
  y: number
  highlight?: boolean
}

export type LocalGame = {
  playerSpawn: PlayerSpawn
  pixels: LocalPixel[][]
  highlightedUser?: number
}
