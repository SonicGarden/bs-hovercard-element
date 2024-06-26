import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/bs-hovercard-element.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^bootstrap/,
    },
  },
})
