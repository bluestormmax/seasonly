import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@models': path.resolve(__dirname, './src/models'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  plugins: [
    react(),
    ViteWebfontDownload([
      'https://fonts.googleapis.com/css?family=Slabo+27px',
      'https://fonts.googleapis.com/css?family=Lato',
    ]),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
