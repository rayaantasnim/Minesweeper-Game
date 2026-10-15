import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          root: path.resolve(__dirname, 'index.html'),
          gateway: path.resolve(__dirname, 'src/games/minesweeper-lite/index.html'),
          play: path.resolve(__dirname, 'src/games/minesweeper-lite/play.html'),
          results: path.resolve(__dirname, 'src/games/minesweeper-lite/results.html'),
          faq: path.resolve(__dirname, 'src/games/minesweeper-lite/faq.html'),
          about: path.resolve(__dirname, 'src/games/minesweeper-lite/about.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
