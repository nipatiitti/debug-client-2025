export interface PlayerSpawn {
  x: number
  y: number
}

export interface ServerPixel {
  type: number
  guild: number | null
  owner: number
}

export interface ServerGame {
  playerSpawn: PlayerSpawn
  pixels: ServerPixel[][]
}
