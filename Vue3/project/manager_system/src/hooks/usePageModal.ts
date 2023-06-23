import { ref, type Ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
import type PageContent from '@/components/page-content/page-content.vue'

type CallbackFnType = (data?: any) => void

/**
 * 获取：modalRef、新建角色、编辑角色、新建/编辑角色后提交 的回调函数
 * @param newCallback 可选，新建角色后的回调函数
 * @param editCallback 可选，编辑角色后的回调函数
 * @returns
 */
function usePageModal(
  contentRef: Ref,
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调
    if (editCallback) editCallback(itemData)
  }
  function handleCommitClick() {
    contentRef.value?.fetchPageListData()
  }

  return { modalRef, handleNewClick, handleEditClick, handleCommitClick }
}

export default usePageModal
