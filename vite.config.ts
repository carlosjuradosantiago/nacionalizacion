import { defineConfig } from 'vite';
import angular from '@vitejs/plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    port: 4200,
    // Add historyApiFallback to handle Angular routing
    historyApiFallback: true
  },
  // Add base URL configuration
  base: '/',
  // Add build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});