<template>
  <div class="login"><login-panel /></div>
</template>

<script setup lang="ts">
import LoginPanel from './cpns/LoginPanel.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  background: url('@/assets/img/login-bg.svg');
}
</style>
