<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="24px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './cpns/header-info.vue'
import headerCrumb from './cpns/header-crumb.vue'

/** 折叠状态 */
const isFold = ref<boolean>(false)
/** 自定义事件：切换折叠isFold*/
const emit = defineEmits(['foldChange'])

/** 切换折叠回调 */
function handleMenuIconClick() {
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
