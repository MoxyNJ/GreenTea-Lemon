<template>
  <div class="panel-account">
    <el-form :model="account" label-width="60px" size="large" :rules="accountRules" status-icon>
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus/lib/components/form/index.js'

/**表单数据 */
const account = reactive({
  name: '',
  password: ''
})

/** 校验规则 */
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{8,}$/, message: '密码必须在8位以上', trigger: 'blur' }
  ]
}

/** 登录按钮逻辑 */
function loginAction() {
  console.log('loginAction')
}

/**对外暴露回调函数 */
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
