<template>
  <div class="login-panel">
    <!-- 顶部 -->
    <h1 class="title">🌈后台管理系统</h1>
    <!-- 中间 -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <panel-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="icon">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <panel-phone />
      </el-tab-pane>
    </el-tabs>
    <!-- 底部 -->
    <div class="control-account">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginBtnClick" size="large"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
import { localCache } from '@/utils/cache'
import { IS_REM_PWD } from '@/global/constants'

/**记住密码 */
const isRemPwd = ref<boolean>(localCache.getCache(IS_REM_PWD) ?? false)
/**当前登录方式 */
const currentTab = ref<'account' | 'phone'>('account')
/**子组件：账号登录表单 */
/**ref保存的类型是“组件的实例”，而type PanelAccount是该组件的类型，通过InstanceType获取实例类型*/
const accountRef = ref<InstanceType<typeof PanelAccount>>()

/** 逻辑 */

/** 更新记住密码 */
watch(isRemPwd, (newValue) => {
  localCache.setCache(IS_REM_PWD, newValue)
})

/** 登录逻辑 */
function handleLoginBtnClick() {
  if (currentTab.value == 'account') {
    /*** 流程
     * （1）获取子组件实例 => ref
     * （2）调用子组件方法，校验并传递数据
     * （3）子组件通过isRemPwd确定是否保存密码
     */
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录，暂未开发')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
