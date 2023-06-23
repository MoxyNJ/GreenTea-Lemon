import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

/**
 * 获取：contentRef、点击搜索、点击重置 的回调函数
 * @returns
 */
function usePageSearch() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageSearch
