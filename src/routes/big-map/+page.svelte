<script lang="ts">
  import Game from '$lib/game/Game.svelte'
  import type { ServerGame } from '$lib/types/Game'
  import { serverMapToLocalMap } from '$lib/utils/mapUtils'

  type Props = {
    data: {
      maps: ServerGame[]
    }
  }
  let { data }: Props = $props()
</script>

<div class="flex min-h-[100vh] w-[100vw] flex-col items-center">
  <h1 class="my-4 text-4xl">Calculated {data.maps.length} maps</h1>

  {#each data.maps as map}
    <div
      class="m-4 h-[80vh] w-11/12 rounded-lg border-2 border-pink-600"
      onscroll={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Game pixels={serverMapToLocalMap(map).pixels} />
    </div>
  {/each}
</div>
