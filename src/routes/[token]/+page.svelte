<script lang="ts">
  import { getMap } from '$lib/client/map'
  import { getUser } from '$lib/client/users'
  import GuildColors from '$lib/components/GuildColors.svelte'
  import Game from '$lib/game/Game.svelte'
  import { game } from '$lib/states/game.svelte'
  import { users } from '$lib/states/users.svelte'

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

  $effect(() => {
    initMap()
    initUserData()
  })
</script>

<Game {token} />

<GuildColors />
