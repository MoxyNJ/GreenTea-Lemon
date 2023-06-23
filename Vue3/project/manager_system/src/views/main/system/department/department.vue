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
    >
      <!-- <template #parent="scope">{{ scope.row.parentId }} </template> -->
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" @commit-click="handleCommitClick" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import useMainStore from '@/store/main/main'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'
import usePageSearch from '@/hooks/usePageSearch'

// 对modalConfig进行操作
// 增加自动依赖，一旦mainStore 中的数据（entireDepartments）发生改变，就自动更新modalConfigRef 数据。
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  // 为 parentId 内部添加可选项
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

const { contentRef, handleQueryClick, handleResetClick } = usePageSearch()
const { modalRef, handleNewClick, handleEditClick, handleCommitClick } = usePageModal(contentRef)

/** 下列逻辑全部抽离至上侧的 hooks  */
// /** refs */
// const contentRef = ref<InstanceType<typeof PageContent>>()
// const modalRef = ref<InstanceType<typeof PageModal>>()

// /**点击搜索 */
// function handleQueryClick(formData: any) {
//   contentRef.value?.fetchPageListData(formData)
// }
// /** 点击重置 */
// function handleResetClick() {
//   contentRef.value?.fetchPageListData()
// }

// /**新建角色 */
// function handleNewClick() {
//   modalRef.value?.setModalVisible()
// }
// /**编辑角色 */
// function handleEditClick(itemData: any) {
//   modalRef.value?.setModalVisible(false, itemData)
// }

// /** 新建/编辑提交 */
// function handleCommitClick() {
//   contentRef.value?.fetchPageListData()
// }
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
@/hooks/usePageSearch
