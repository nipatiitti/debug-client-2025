import type { LocalPixel } from '$lib/types/LocalGame'
import { rgbToNumber } from '$lib/utils/colors'
import { PIXEL_SIZE, PixelGuild, PixelTypes, RBG_COLORS } from '$lib/utils/constants'
import { Application, BitmapText, Graphics, type Container } from 'pixi.js'

type Props = { app: Application; container: Container; pixel: LocalPixel; currentUserId?: number; hovering?: boolean }
export const renderPixel = ({ container, pixel, currentUserId, hovering, app }: Props) => {
  const g = new Graphics()
  g.setStrokeStyle({
    width: 1,
    color: 0xff0000
  })
  g.rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
  g.fill(rgbToNumber(RBG_COLORS[(pixel.guild ?? 0) as PixelGuild]))

  const ownPixel = pixel.owner === currentUserId

  // If it's our own pixel draw a border
  if (ownPixel) {
    g.stroke({
      color: 0x000000,
      width: 2,
      pixelLine: false
    })
    g.rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
  }

  if (hovering) {
    g.stroke({
      // Pink
      color: 0xff69b4,
      width: 2,
      pixelLine: false
    })
    g.rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
  }

  const text = new BitmapText()
  text.style = {
    fill: '#ffffff',
    fontSize: 12,
    stroke: '#000000'
  }

  const pt = pixel.type
  switch (pt) {
    case PixelTypes.MapBorder:
      text.text = 'B'
      break
    case PixelTypes.Spawn:
      text.text = `S${pixel.guild}`
      if (ownPixel) {
        text.style.fill = '#ff0000'
      }
      break
    case PixelTypes.FogOfWar:
      text.text = 'X'
      break
    default:
      text.text = ''
      break
  }

  // Center text to pixel
  text.anchor.set(0.5)
  text.position.set(pixel.x * PIXEL_SIZE + PIXEL_SIZE / 2, pixel.y * PIXEL_SIZE + PIXEL_SIZE / 2)
  // Add both graphics and text to container separately
  container.addChild(g)
  container.addChild(text)

  // Add highlight effect if needed
  if (pixel.highlight) {
    const highlight = new Graphics()
    highlight.position.set(pixel.x * PIXEL_SIZE + PIXEL_SIZE / 2, pixel.y * PIXEL_SIZE + PIXEL_SIZE / 2)

    // Set initial properties
    let radius = PIXEL_SIZE / 4
    let alpha = 0.8
    const maxRadius = PIXEL_SIZE * 1.5
    const speed = 0.05

    // Create animation ticker function
    const tickerCallback = () => {
      // Clear previous drawing
      highlight.clear()

      // Update properties
      radius += speed * PIXEL_SIZE
      alpha = Math.max(0, alpha - 0.01)

      // Draw updated circle
      highlight.beginFill(0xff69b4, alpha)
      highlight.drawCircle(0, 0, radius)
      highlight.endFill()

      // Remove ticker when animation completes
      if (radius > maxRadius || alpha <= 0) {
        app.ticker.remove(tickerCallback)
        container.removeChild(highlight)
      }
    }
    // Add the ticker callback
    container.addChild(highlight)
    app.ticker.add(tickerCallback)
  }
}
