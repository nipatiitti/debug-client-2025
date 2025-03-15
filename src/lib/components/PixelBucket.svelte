<script lang="ts">
  import { miscState } from '$lib/states/misc.svelte'

  let bucket = $derived(miscState.pixelBucket)
</script>

<div class="absolute right-0 top-0 m-2 flex flex-col gap-2 rounded-lg bg-white p-2">
  <div class="flex items-center gap-2">
    <span class="font-bold">{bucket.amount}</span> / <span class="font-bold">{bucket.maxAmount}</span>
  </div>

  <div class="flex items-center gap-2">
    <span>Gen:</span> <span class="font-bold">{bucket.increasePerMinute.toFixed(3)}</span> <span>px/min</span>
  </div>
</div>
