<template>
  <div class="main">
    <h2>main</h2>
    <h2>counter: {{ counterStore.counter }} -- {{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

const changeCounter = () => {
  counterStore.changeCounterAction(counterStore.counter + 1)
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
