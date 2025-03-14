export type CurrentUser = {
  firstName: string
  guild: number
  id: number
  lastName: string
  username: string
}

export type PixelBucket = {
  amount: number
  maxAmount: number
  increasePerMinute: number
}

export type Score = {
  guild: number
  amount: number
}
