<script lang="ts">
  import { rgbToHex } from '$lib/utils/colors'
  import { PixelGuild, RBG_COLORS } from '$lib/utils/constants'

  let colors = Object.entries(RBG_COLORS).map(([key, value]) => ({
    guild: PixelGuild[parseInt(key)],
    color: rgbToHex(value),
    key: parseInt(key)
  }))

  console.log(colors)
</script>

<div class="absolute left-0 top-0 m-2 flex flex-col gap-2 rounded-lg bg-white p-2">
  {#each colors as { guild, color, key }}
    <div class="flex items-center gap-2">
      <div class="h-4 w-4 rounded-full" style="background-color: {color}"></div>
      <span>{key}: {guild}</span>
    </div>
  {/each}
</div>
