import { miscState } from '$lib/states/misc.svelte'
import type { LocalPixel } from '$lib/types/LocalGame'
import { toast } from '@zerodevx/svelte-toast'
import { IncrementalMapUpdateRequest, MiscStateUpdateRequest } from './game_pb'
import { StateUpdateClient } from './GameServiceClientPb'

const client = new StateUpdateClient('/api/proto')

export const getIncrementalMapUpdate = async (token: string, onPixelUpdate: (pixel: LocalPixel) => void) => {
  const request = new IncrementalMapUpdateRequest()
  const stream = client.getIncrementalMapUpdate(request, {
    token: token
  })

  stream.on('data', (response) => {
    const updates = response.getUpdatesList()

    // Process updates in the next event loop tick to avoid blocking
    setTimeout(() => {
      for (const update of updates) {
        const localPixel: LocalPixel = {
          x: update.getSpawnrelativecoordinate()?.getX() || 0,
          y: update.getSpawnrelativecoordinate()?.getY() || 0,
          guild: update.getGuild(),
          owner: update.getOwner()?.getId() || 0,
          type: update.getType(),
          highlight: true
        }

        onPixelUpdate(JSON.parse(JSON.stringify(localPixel)))
      }
    }, 0)
  })

  stream.on('end', () => {
    console.log('Stream ended')
  })

  stream.on('error', (error) => {
    console.error('Stream error:', error)
  })
}

export const getMiscUpdate = async (token: string) => {
  const request = new MiscStateUpdateRequest()
  const stream = await client.getMiscGameStateUpdate(request, {
    token: token
  })

  stream.on('data', (response) => {
    const notification = response.getNotification()
    if (notification) {
      toast.push(notification.getMessage())
    }

    const pixelBucket = response.getPixelbucket()
    if (pixelBucket) {
      miscState.pixelBucket = {
        amount: pixelBucket.getAmount(),
        maxAmount: pixelBucket.getMaxamount(),
        increasePerMinute: pixelBucket.getIncreaseperminute()
      }
    }

    const scores = response.getScoresList()
    if (scores.length > 0) {
      miscState.scores = scores.map((score) => ({
        guild: score.getGuild(),
        amount: score.getAmount()
      }))
    }

    const powerUps = response.getPowerupsList()
    if (powerUps.length > 0) {
      miscState.powerUps = powerUps.map((powerUp) => ({
        powerUpId: powerUp.getPowerupid(),
        Directed: powerUp.getDirected(),
        name: powerUp.getName(),
        description: powerUp.getDescription()
      }))
    }

    const powerupUpdate = response.getPowerupupdate()
    if (powerupUpdate) {
      miscState.powerupUpdate = powerupUpdate
    }
  })

  stream.on('end', () => {
    console.log('Stream ended')
  })

  stream.on('error', (error) => {
    console.error('Stream error:', error)
  })
}
