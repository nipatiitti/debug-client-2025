import type { CurrentUser } from '$lib/types/Users'

export let users = $state<{ currentUser: CurrentUser | null }>({
  currentUser: null
})
