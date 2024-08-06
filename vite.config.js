import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/agentplatform': {
        target: 'https://open.oppomobile.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/agentplatform/, '/agentplatform')
      }
    }
  }
});
