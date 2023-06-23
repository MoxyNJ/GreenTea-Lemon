<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import type { IModalProps } from './type'

const props = defineProps<IModalProps>()

const emit = defineEmits(['commitClick'])

/** 定义属性 */
/** modal的显示/隐藏 */
const dialogVisible = ref(false)
/** 表单内容 */
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
/** 编辑/新建表单 */
const isNewRef = ref(true)
/** 编辑表单时，表单的原始数据，用于提交编辑时确认角色id */
const editData = ref()

/** 获取选择列表的下拉内容 */
const systemStore = useSystemStore()

/**
 * 对外暴露：显示/隐藏 modal 逻辑
 * @param isNew true新建 / false编辑
 * @param itemData 编辑数据时，表单的原始数据
 */
function setModalVisible(isNew: boolean = true, itemData?: any): void {
  // 显示 modal
  dialogVisible.value = true
  isNewRef.value = isNew

  if (!isNew && itemData) {
    // 编辑数据：数据回流，将外界的itemData数据放入本地表单fromData中
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据，将旧数据清空
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

/** 表单提交 */
async function handleConfirmClick() {
  // 隐藏 modal
  dialogVisible.value = false

  // 传入额外数据，角色管理-新建角色-权限选择的复选框 使用
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    await systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的用户
    await systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
  emit('commitClick')
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
