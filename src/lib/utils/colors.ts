export type HEX = string
export type RGB = { r: number; g: number; b: number }

/**
 * Convert hex string like "#ffffff" to number like 0xffffff
 * @param hex Hex string
 * @returns Number
 */
export function hexToNumber(hex: HEX): number {
  return parseInt(hex.replace(/^#/, ''), 16)
}

/**
 * { r: 0, g: 0, b: 0 } => 0x000000
 * @param color Color object
 * @returns Number
 */
export function rgbToNumber(color: RGB): number {
  return (color.r << 16) + (color.g << 8) + color.b
}

/**
 * rgb to hex
 * @param color Color object
 * @returns Hex string
 */
export function rgbToHex(color: RGB): HEX {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
}

export function hslToRgb(h: number, s: number, l: number) {
  const saturation = s / 100
  const lightness = l / 100

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lightness - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}
