import path from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  build: {
    target: 'es2015'
  },
  plugins: [
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
