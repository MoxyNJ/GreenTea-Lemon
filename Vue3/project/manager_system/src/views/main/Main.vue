<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'

/** 退出登录 */
function handleExitClick() {
  // 删除token、跳回登录
  localCache.remove(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
