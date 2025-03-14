<script lang="ts">
  import { goto } from '$app/navigation'

  let token = $state('')

  const onSubmit = () => {
    goto(`/${token}`)
  }
</script>

<main class="container flex flex-col items-center justify-center">
  <form on:submit|preventDefault={onSubmit} class="flex flex-col gap-2">
    Gib token >:)
    <input type="text" bind:value={token} class="rounded border border-gray-300 p-2" />
    <button type="submit">Submit</button>
  </form>
</main>
