import { defineConfig } from 'vite';
import reactSwc from '@vitejs/plugin-react-swc';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import preload from 'vite-plugin-preload';

export default defineConfig({
  plugins: [
    reactSwc(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Code Tutorials: Tools, Components, and Best Practices for Modern Web Development',
        },
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    preload(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500, // Adjust chunk limits
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Enhanced chunk splitting logic
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@radix') || id.includes('class-variance-authority') || 
                id.includes('clsx') || id.includes('tailwind-merge')) return 'vendor-ui';
            if (id.includes('framer-motion')) return 'vendor-animation';
            if (id.includes('lucide')) return 'vendor-icons';
            return 'vendor'; // all other deps
          }
        },
      },
    },
  },
  // Enable caching
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
});