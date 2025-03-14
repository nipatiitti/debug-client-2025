<script lang="ts">
  import type { LocalPixel } from '$lib/types/LocalGame'
  import { rgbToNumber } from '$lib/utils/colors'
  import { PIXEL_SIZE, PixelTypes, RBG_COLORS } from '$lib/utils/constants'
  import { Container, Graphics, Text } from 'pixi.js'
  import { users } from '../states/users.svelte'

  let { pixel, container, onClick }: { pixel: LocalPixel; container: Container; onClick: (pixel: LocalPixel) => void } =
    $props()

  let guild = $derived((pixel.guild ?? 0) as keyof typeof RBG_COLORS)

  $effect(() => {
    const g = new Graphics()
    g.setStrokeStyle({
      width: 1,
      color: 0xff0000
    })
    g.rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
    g.fill(rgbToNumber(RBG_COLORS[guild]))

    g.eventMode = 'static'
    g.on('click', () => {
      onClick(pixel)
    })

    const ownPixel = pixel.owner === users.currentUser?.id

    // If it's our own pixel draw a border
    if (ownPixel) {
      g.stroke({
        color: 0x000000,
        width: 2,
        pixelLine: false
      })
      g.rect(pixel.x * PIXEL_SIZE, pixel.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
    }

    const text = new Text()
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
    g.addChild(text)

    container.addChild(g)
  })
</script>
