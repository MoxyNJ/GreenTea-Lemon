<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" @commit-click="handleCommitClick" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import UserSearch from './cpns/user-search.vue'
import UserContent from './cpns/user-content.vue'
import UserModal from './cpns/user-modal.vue'

/** refs */
const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

/**点击搜索 */
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
/** 点击重置 */
function handleResetClick() {
  contentRef.value?.fetchUserListData()
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
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
