import { toast } from '@zerodevx/svelte-toast'

export const claimPixel = async ({ x, y }: { x: number; y: number }) => {
  try {
    const res = await fetch('/api/pixel', {
      method: 'POST',
      body: JSON.stringify({ x, y }),
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
    return data
  } catch (error) {
    console.log(error)
    return { error: 'Failed to claim pixel' }
  }
}
