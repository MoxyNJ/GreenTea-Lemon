<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
    >
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
import { reactive, ref } from 'vue'
import type { ElForm, FormInstance, FormRules } from 'element-plus/lib/components/form/index.js'
import { ElMessage } from 'element-plus/lib/components/index.js'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PWD = 'password'

/**表单ref */
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

/**表单数据 */
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PWD) ?? ''
})

/** 校验规则 */
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,}$/, message: '密码必须在6位以上', trigger: 'blur' }
  ]
}

/** 登录时校验逻辑 */
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      // Login success
      // 服务器网络请求
      const { name, password } = account // 解除响应式
      const res = loginStore.loginAccountAction({ name, password })
      // 记住密码
      if (isRemPwd) {
        localCache.setCache(CACHE_NAME, name)
        localCache.setCache(CACHE_PWD, password)
      } else {
        localCache.remove(CACHE_NAME)
        localCache.remove(CACHE_PWD)
      }
    } else {
      // Login failure：message 提示
      ElMessage.error('Oops，请输入正确的格式后再操作')
    }
  })
}

/**对外暴露回调函数 */
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
