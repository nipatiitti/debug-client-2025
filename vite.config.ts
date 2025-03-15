import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['google-protobuf', 'grpc-web']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/google-protobuf/, /grpc-web/, /proto/]
    }
  }
})
