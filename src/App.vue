<template>
  <div id="app">
    <!-- Navigation Buttons -->
    <button @click="goToHome">Go to Home</button>
    <button @click="goToChat">Go to Chat</button>

    <!-- Route View -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 使用 Vue Router
const router = useRouter();

// 跳转到 Home 页
const goToHome = () => {
  router.push('/home');
};

// 跳转到 Chat 页
const goToChat = () => {
  router.push('/chat');
};
</script>

<style>
/* 添加你的样式 */
</style>
