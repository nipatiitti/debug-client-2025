<script lang="ts">
  import { getMap } from '$lib/client/map'
  import { toast } from '@zerodevx/svelte-toast'

  let token = $state('')

  // const onSubmit = (e: Event) => {
  //   e.preventDefault()
  //   goto(`/${token}`)
  // }

  let loading = $state(false)

  const fetchMap = async () => {
    loading = true
    await getMap(token)
    loading = false
    toast.push('Map saved!', {
      theme: {
        '--toastBackground': '#333',
        '--toastColor': '#fff'
      }
    })
  }
</script>

<main class="container flex flex-col items-center justify-center">
  <div class="flex flex-col gap-2">
    Gib jwt token >:)
    <input type="text" bind:value={token} class="rounded border border-gray-300 p-2" />

    <!-- EIther fetch map or navigate to game -->
    <div class="flex items-center gap-2">
      <button onclick={fetchMap} class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Fetch map
      </button>
      <a href={`/${token}`} class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Go to game
      </a>
    </div>
  </div>
</main>
