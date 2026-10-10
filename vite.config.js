import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // ✅ Minificar para produção
    minify: 'oxc',
    // ✅ Sourcemaps para debug (desabilitar em produção)
    sourcemap: false,
    // ✅ Otimizar chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/[/\\]node_modules[/\\](react|react-dom|react-router|react-router-dom)[/\\]/.test(id)) {
            return 'react-vendor'
          }
          if (/[/\\]node_modules[/\\]framer-motion[/\\]/.test(id)) {
            return 'animation-vendor'
          }
        }
      }
    },
    // ✅ Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    open: true
  }
})
