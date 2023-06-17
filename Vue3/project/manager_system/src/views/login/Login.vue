<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
import request from '@/service'

request
  .get({
    url: '/test'
  })
  .then((res) => {
    console.log(res.response.data)
  })
</script>

<style lang="less" scoped>
.login {
  color: red;
}
</style>
