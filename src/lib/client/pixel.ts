import { miscState } from '$lib/states/misc.svelte'
import { toast } from '@zerodevx/svelte-toast'

export const claimPixel = async ({ x, y }: { x: number; y: number }, token: string) => {
  try {
    const res = await fetch(`/api/pixel`, {
      method: 'POST',
      body: JSON.stringify({ x, y, token }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status !== 200) {
      toast.push('Failed to claim pixel', {
        theme: {
          '--toastBackground': 'red',
          '--toastProgressBackground': 'var(--toastBackground)'
        }
      })
      return { error: 'Failed to claim pixel' }
    }

    const data = await res.json()
    toast.push('Pixel claimed')
    miscState.pixelBucket.amount -= 1
    return data
  } catch (error) {
    console.log(error)
    return { error: 'Failed to claim pixel' }
  }
}
