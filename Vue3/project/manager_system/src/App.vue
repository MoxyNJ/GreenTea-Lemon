<template>
  <div class="app">
    <!-- 路由占位 -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  height: 100%;
  width: 100%;
}
</style>
