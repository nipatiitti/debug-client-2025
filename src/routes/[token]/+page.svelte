<script lang="ts">
  import { browser } from '$app/environment'
  import { getMap } from '$lib/client/map'
  import { getUser } from '$lib/client/users'
  import GuildColors from '$lib/components/GuildColors.svelte'
  import PixelBucket from '$lib/components/PixelBucket.svelte'
  import Game from '$lib/game/Game.svelte'
  import { game } from '$lib/states/game.svelte'
  import { users } from '$lib/states/users.svelte'
  import { getIncrementalMapUpdate, getMiscUpdate } from '../../proto/client'

  let { data }: { data: { token: string } } = $props()

  let token = $derived(data.token)

  const initMap = async () => {
    const map = await getMap(token)

    game.playerSpawn = map.playerSpawn
    game.pixels = map.pixels.map((row, rowIndex) =>
      row.map((pixel, colIndex) => ({
        ...pixel,
        x: colIndex - map.playerSpawn.x,
        y: rowIndex - map.playerSpawn.y
      }))
    )
  }

  const initUserData = async () => {
    const currentUser = await getUser(token)
    users.currentUser = currentUser
  }

  const startIncrementalUpdates = async () => {
    const reconnect = async (streamFn: () => Promise<void>, name: string) => {
      while (true) {
        try {
          console.log(`Starting ${name} stream...`)
          await streamFn()
          console.log(`${name} stream ended, reconnecting...`)
        } catch (error) {
          console.error(`Error in ${name} stream:`, error)
        }
      }
    }

    // Start map updates with reconnection
    reconnect(
      () =>
        getIncrementalMapUpdate(token, (newPixel) => {
          const coords = {
            x: newPixel.x + game.playerSpawn.x,
            y: newPixel.y + game.playerSpawn.y
          }

          if (game.pixels[coords.y] === undefined) {
            game.pixels[coords.y] = []
          }

          game.pixels[newPixel.y + game.playerSpawn.y][newPixel.x + game.playerSpawn.x] = newPixel
        }),
      'map update'
    )

    // Start misc updates with reconnection
    reconnect(() => getMiscUpdate(token), 'misc update')
  }

  $effect(() => {
    initMap()
    initUserData()

    if (browser) {
      startIncrementalUpdates()
    }
  })
</script>

<div class="h-[100vh] w-[100vw]">
  <Game {token} pixels={game.pixels} />
</div>

<GuildColors />
<PixelBucket />
