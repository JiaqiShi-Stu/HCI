import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // 确保路径正确
import Chat from './views/Chat.vue'; // 确保路径正确
import Draw from './views/Draw.vue'; // 确保路径正确
const routes = [
  { path: '/home', component: Home },
  { path: '/chat', component: Chat },
  { path: '/draw', component: Draw },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
