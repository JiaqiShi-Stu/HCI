import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router.js'; // 确保路径正确
import './assets/main.css';

// 创建 Vue 应用
const app = createApp(App);

// 全局注册 axios
app.config.globalProperties.$axios = axios;

// 使用路由和挂载应用
app.use(router).mount('#app');

