import { hslToRgb, type RGB } from './colors'

// Values are from game source code
export const HSL_COLORS = {
  0: { r: 0, g: 0, b: 0 }, // Nobody
  1: { r: 23, g: 100, b: 50 }, // Tietokilta
  2: { r: 75, g: 100, b: 50 }, // Algo
  3: { r: 0, g: 100, b: 50 }, // Cluster
  4: { r: 94, g: 100, b: 50 }, // OulunTietoteekkarit
  5: { r: 155, g: 100, b: 50 }, // TietoTeekkarikilta
  6: { r: 178, g: 100, b: 50 }, // Digit
  7: { r: 240, g: 100, b: 50 }, // Sosa
  8: { r: 280, g: 100, b: 50 }, // Date
  9: { r: 312, g: 100, b: 50 } // Tutti
}

export const RBG_COLORS = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
  .map((guild) => {
    const hsl = HSL_COLORS[guild]
    return hslToRgb(hsl.r, hsl.g, hsl.b)
  })
  .reduce(
    (acc: Record<PixelGuild, RGB>, color: RGB, index: PixelGuild) => {
      acc[index as PixelGuild] = color
      return acc
    },
    {} as Record<PixelGuild, RGB>
  )

export enum PixelGuild {
  Nobody = 0,
  Tietokilta = 1,
  Algo = 2,
  Cluster = 3,
  OulunTietoteekkarit = 4,
  TietoTeekkarikilta = 5,
  Digit = 6,
  Sosa = 7,
  Date = 8,
  Tutti = 9
}

export enum PixelTypes {
  Normal = 0,
  MapBorder = 1,
  Spawn = 2,
  FogOfWar = 3
}

export const PIXEL_SIZE = 16
