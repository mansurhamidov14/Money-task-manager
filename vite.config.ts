import path from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import checker from 'vite-plugin-checker';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  build: {
    target: 'es2015',
    outDir: path.join(__dirname, "www")
  },
  plugins: [
    checker({ typescript: true }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    solid()
  ],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
