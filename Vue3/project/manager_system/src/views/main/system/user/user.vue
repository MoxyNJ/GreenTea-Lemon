<template>
  <div class="user">
    <h2>user</h2>
  </div>
</template>

<script setup lang="ts" name="user">
// 网络请求测试
import useSystemStore from '@/store/main/system/system'

const systemStore = useSystemStore()
systemStore.postUsersListAction()
</script>

<style scoped></style>
