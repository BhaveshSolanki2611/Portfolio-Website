import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: {
    // Generate source maps for production builds
    sourcemap: false,
    // Minify output
    minify: 'terser',
    // Control chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Configure terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Configure rollup
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion']
        },
        // Control chunk files naming format for easy debugging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  // Configure dev server
  server: {
    port: 3000,
    open: true, 
    cors: true,
  },
  // Base path if deploying to a subdirectory
  base: './',
})
