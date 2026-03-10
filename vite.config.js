import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Base URL para el despliegue (cambiar según el entorno)
  // Para GitHub Pages, usar el nombre del repositorio: '/tecnodjesus-web/'
  // Para Vercel/Netlify u otros, normalmente '/' (raíz)
  base: process.env.NODE_ENV === 'production' ? '/tecnodjesus-web/' : '/',
  // Alias para importaciones más limpias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true,
  },
  // Optimizaciones de build
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', '@supabase/supabase-js'],
        },
      },
    },
  },
})
