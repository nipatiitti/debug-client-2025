<script lang="ts">
  import { claimPixel } from '$lib/client/pixel'
  import type { LocalPixel } from '$lib/types/LocalGame'
  import { PIXEL_SIZE } from '$lib/utils/constants'
  import { Viewport } from 'pixi-viewport'
  import { Application, Container, FederatedPointerEvent } from 'pixi.js'
  import { game } from '../states/game.svelte'
  import { users } from '../states/users.svelte'
  import { renderPixel } from './renderPixel'

  let { token, pixels }: { token?: string; pixels: LocalPixel[][] } = $props()

  let container: HTMLDivElement

  let app = new Application()
  let viewport = $state<Viewport>()

  let pixelsContainer = new Container()

  let isDragging = false

  $effect(() => {
    app
      .init({
        background: '#000000', // black
        resizeTo: container
      })
      .then(() => {
        container.appendChild(app.canvas)

        viewport = new Viewport({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          worldWidth: 1000,
          worldHeight: 1000,
          events: app.renderer.events
        })

        app.stage.addChild(viewport)

        viewport.drag().pinch().wheel().decelerate()
        viewport.addChild(pixelsContainer)
        pixelsContainer.interactiveChildren = false

        viewport.on('drag-start', handleDragStart)
        viewport.on('drag-end', handleDragEnd)

        viewport.on('mousemove', handleMove)

        console.log('app initialized')
      })

    return () => {
      console.log('destroying app')

      viewport?.off('drag-start', handleDragStart)
      viewport?.off('drag-end', handleDragEnd)
      viewport?.off('mousemove', handleMove)

      app.destroy()
    }
  })

  const handleDragStart = () => {
    isDragging = true
  }

  const handleDragEnd = () => {
    isDragging = false
  }

  const handleMove = async (e: FederatedPointerEvent) => {
    const pixel = getPixelFromEvent(e)

    if (!pixel?.owner && game.highlightedUser) {
      game.highlightedUser = undefined
    } else if (pixel && pixel.owner) {
      game.highlightedUser = pixel.owner
    }
  }

  $effect(() => {
    if (!pixels || !viewport) return

    pixelsContainer.removeChildren()

    pixels.forEach((row, rowIndex) => {
      row.forEach((pixel, colIndex) => {
        renderPixel({
          pixel,
          app,
          container: pixelsContainer,
          currentUserId: users.currentUser?.id,
          hovering: (game.highlightedUser && game.highlightedUser === pixel.owner) || false
        })
      })
    })

    return () => {
      pixelsContainer.removeChildren()
    }
  })

  const getPixelFromEvent = (e: FederatedPointerEvent): LocalPixel | undefined => {
    if (isDragging || !viewport) return

    const gridSize = PIXEL_SIZE
    const world = viewport.toWorld(e.data.global.x, e.data.global.y)
    const x = Math.floor(world.x / gridSize)
    const y = Math.floor(world.y / gridSize)
    return pixels[y + game.playerSpawn.y]?.[x + game.playerSpawn.x]
  }

  $effect(() => {
    if (!game.pixels || !viewport || !token) return

    const handleOnClick = (e: FederatedPointerEvent) => {
      const pixel = getPixelFromEvent(e)
      if (!pixel) return

      handleClick(pixel)
    }

    viewport.on('click', handleOnClick)

    return () => {
      viewport?.off('click', handleOnClick)
    }
  })

  const checkForAdjacentOwnedPixels = (pixel: LocalPixel) => {
    const { x, y } = pixel
    const adjacentPixels = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 }
    ]

    const ownedPixels = adjacentPixels.filter((p) => {
      const x = p.x + game.playerSpawn.x
      const y = p.y + game.playerSpawn.y
      const ap = game.pixels[y]?.[x]
      return ap?.owner === users.currentUser?.id
    })

    return ownedPixels
  }

  const handleClick = (pixel: LocalPixel) => {
    if (!token) return
    // Make sure this pixel is valid for claiming aka we
    // are not the owner and it has atleast one adjacent pixel owned by us
    const aps = checkForAdjacentOwnedPixels(pixel)
    if (pixel.owner === users.currentUser?.id || aps.length === 0) {
      return
    }

    claimPixel(
      {
        x: pixel.x,
        y: pixel.y
      },
      token
    )
  }
</script>

<!-- {#each game.pixels as row, rowIndex (rowIndex)}
  {#each row as pixel, colIndex (colIndex)}
    <Pixel {pixel} container={pixels} {app} />
  {/each}
{/each} -->

<div bind:this={container} class="game h-full w-full"></div>
