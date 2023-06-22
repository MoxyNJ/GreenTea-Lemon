<template>
  <div class="page">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" @commit-click="handleCommitClick" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

/** refs */
const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

/**点击搜索 */
function handleQueryClick(formData: any) {
  contentRef.value?.fetchPageListData(formData)
}
/** 点击重置 */
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

/**新建角色 */
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
/**编辑角色 */
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

/** 新建/编辑提交 */
function handleCommitClick() {
  contentRef.value?.fetchPageListData()
}
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
