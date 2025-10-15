import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://michell-riblike-overanimatedly.ngrok-free.dev
export default defineConfig({
  // vite.config.js

  server: {
    allowedHosts: ['michell-riblike-overanimatedly.ngrok-free.dev']
  },
  plugins: [react()],
})
