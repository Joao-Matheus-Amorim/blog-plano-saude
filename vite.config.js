import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // ✅ Minificar para produção
    minify: 'esbuild',
    // ✅ Sourcemaps para debug (desabilitar em produção)
    sourcemap: false,
    // ✅ Otimizar chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion']
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
