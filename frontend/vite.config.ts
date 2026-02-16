import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Required for HMR when running in Docker (host file events don't reach the container).
      usePolling: true,
    },
    proxy: {
      // In dev, /api is proxied to the backend so you get same-origin requests (no CORS).
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
