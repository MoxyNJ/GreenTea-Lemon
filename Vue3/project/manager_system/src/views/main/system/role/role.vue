<template>
  <div class="role">
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
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
      @commit-click="handleCommitClick"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { mapMenuListToIds } from '@/utils/map-menus'
import type { ElTree } from 'element-plus/lib/components/tree/index.js'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'

const { contentRef, handleQueryClick, handleResetClick } = usePageSearch()
const { modalRef, handleNewClick, handleEditClick, handleCommitClick } = usePageModal(
  contentRef,
  newCallback,
  editCallback
)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
/** 复选框选中的数据，通过props 传递给 page-content */
const otherInfo = ref({})
/**
 * 当用户点击任意复选框，触发
 * @param data1：Proxy对象，当前点中复选框的完整数据
 * @param data2：Object 对象，保存了 4 个数组：已选中完整数据、已选中的 id、半选择状态的父/祖父对象、半选择状态的父/祖父对象id
 */
function handleElTreeCheck(data1: any, data2: any) {
  // 只要选中的当前项id、父id、祖父 id
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuList)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()

/**新建角色的回流 */
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
/** 编辑角色的回流 */
function editCallback(itemData: any) {
  nextTick(() => {
    // 获取数据，该位置的作用域为调用editCallback的作用域，也就是usePageModal的作用域
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
