// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  define: {
    "process.env": {},
  },
  base: './',

  // ✅ 개발 서버 fallback 설정 (개발 중 직접 URL 접근 시에도 문제 방지)
  server: {
    historyApiFallback: true
  },

  // ✅ 프로덕션 빌드를 위한 SPA fallback 설정
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html',
    },
  }
});
