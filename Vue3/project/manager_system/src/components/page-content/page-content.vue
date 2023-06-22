<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewPageClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" :="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :="item" :width="`${item.width ?? 150}px`">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" :="item" :width="`${item.width ?? 150}px`" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import { PAGE_NAME } from '@/global/constants'
// import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}

const props = defineProps<IProps>()

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

/** 组件初始化 */
// 获取用户权限
// const isCreate = usePermissions('users:create')
// const isDelete = usePermissions('users:delete')
// const isUpdate = usePermissions('users:delete')
// const isQuery = usePermissions('users:query')
const isCreate = true
const isDelete = true
const isUpdate = true
const isQuery = true

// 初始化网络请求：userLists 相关参数
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
const { pageList, pageTotalCount } = storeToRefs(systemStore)

fetchPageListData()

/** 按钮：单页数量 */
function handleSizeChange() {
  fetchPageListData()
}
/** 按钮：当前页数 */
function handleCurrentChange() {
  fetchPageListData()
}

/** 页面刷新，网络请求获取新数据 */
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(PAGE_NAME, queryInfo)
}

/** 删除角色 */
async function handleDeleteBtnClick(id: number) {
  await systemStore.deletePageByIdAction(PAGE_NAME, id)
  // 删除成功后，刷新页面
  fetchPageListData()
}

/** 创建角色 */
function handleNewPageClick() {
  emit('newClick')
}

/** 编辑角色 */
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

/** 对外暴露方法 */
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
