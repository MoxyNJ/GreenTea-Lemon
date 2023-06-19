<template>
  <div iv class="panel-phone">
    <el-form
      ref="formRef"
      :model="phone"
      label-width="74px"
      size="large"
      :rules="phoneRules"
      status-icon
    >
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="phone.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码" prop="verified">
        <div class="verify-code">
          <el-input v-model="phone.verified" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="phone">
import type { IPhoneNumber } from '@/types'
import type { ElForm } from 'element-plus/lib/components/index.js'
import { reactive, ref } from 'vue'

const formRef = ref<InstanceType<typeof ElForm>>()

/**表单数据 */
const phone = reactive<IPhoneNumber>({
  phoneNumber: '',
  verified: ''
})

const phoneRules = {
  phoneNumber: [
    { required: true, message: '必须输入手机号', trigger: 'blur' },
    { pattern: /^[0-9]{11}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  verified: [
    { required: true, message: '必须输入验证码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{4}$/, message: '验证码格式不正确', trigger: 'blur' }
  ]
}
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
