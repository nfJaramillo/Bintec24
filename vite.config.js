import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';


export default defineConfig({
  base: '/Bintec24/',
  plugins: [react()],
  build:{
    outDir: "dist"
  }
})

// For deploy
/*
export default defineConfig({
  base: '/Bintec24/',
  plugins: [react()],
  build:{
    outDir: "build"
  }
})
  */

// For dev
/*
export default defineConfig({
  base: '/Bintec24/',
  plugins: [react(), eslint()],
  define: {
    global: {},
    "process.env": {}
  },
  server:{
    port: 3000
  }
})
  */
