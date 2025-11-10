import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import fs from 'fs'
import path from 'path'
import mkcert from'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    mkcert(),
  ],

  server: {
    host: '0.0.0.0',
    https: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  test: {
    globals: true,

    environment: 'jsdom',

    reporters: 'dot',

    deps: {
      inline: ['vue2', '@vue/composition-api', 'vue-demi', '@vueuse/core'],
    },

    coverage: {
      provider: 'v8',
    },

    pool: 'vmThreads',
  },
})
