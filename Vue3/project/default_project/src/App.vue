<template>
  <div class="app">
    <h2>app</h2>
    <nav>
      <RouterLink to="/login">登录</RouterLink>
      <RouterLink to="/main">主要</RouterLink>
    </nav>
  </div>

  <!-- 路由占位 -->
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav a {
  padding: 0 10px;
}
</style>
