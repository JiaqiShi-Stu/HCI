import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/agentplatform': {
        target: 'https://open.oppomobile.com',
        changeOrigin: true,
        secure: false, // 这行代码允许代理到未安全（HTTPS）站点
        rewrite: (path) => path.replace(/^\/agentplatform/, '/agentplatform')
      }
    }
  }
});
