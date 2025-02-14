import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import critical from 'rollup-plugin-critical';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Code Resources',
          description: 'A curated collection of the best resources for developers',
        },
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    critical({
      criticalUrl: 'http://localhost:5173',
      criticalBase: 'dist',
      criticalPages: [
        { uri: '', template: 'index' },
        { uri: 'about', template: 'index' },
        { uri: 'contact', template: 'index' },
        { uri: 'pricing', template: 'index' },
      ],
      criticalConfig: {
        inline: true,
        extract: true,
        dimensions: [
          {
            width: 375,
            height: 565,
          },
          {
            width: 1200,
            height: 800,
          },
        ],
      },
    }),
  ],
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
    sourcemap: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react']
        },
        sourcemapExcludeSources: true
      }
    },
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
});