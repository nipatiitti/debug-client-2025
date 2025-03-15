import { authCookie, baseUrl } from '$lib/client'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
  const token = event.request.headers.get('token')
  if (!token) {
    return new Response(JSON.stringify({ error: 'No token provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const method = event.params.method
  const clientRequestBody = await event.request.arrayBuffer()

  const response = await fetch(`${baseUrl}/${method}`, {
    headers: {
      accept: 'application/grpc-web-text',
      'content-type': 'application/grpc-web-text',
      'x-grpc-web': '1',
      cookie: authCookie(token)
    },
    body: clientRequestBody,
    method: 'POST'
  })

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/grpc-web-text',
      'grpc-status': response.headers.get('grpc-status') || '',
      'grpc-message': response.headers.get('grpc-message') || '',
      'x-grpc-web': '1'
    }
  })
}
