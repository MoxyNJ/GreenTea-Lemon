import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount, UserInfo } from '@/types'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'

interface ILoginState {
  token: string
  isRemPwd: boolean
  userInfo: UserInfo
  userMenus: Array<any>
}

/** 存储用户登录信息，action封装用户登录验证网络请求 */
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    isRemPwd: false,
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.登录请求，并保存pinia
      const res = await accountLoginRequest(account)
      if (res.code !== 0) {
        console.log('请求错误')
        return
      }
      const id = res.data.id
      this.token = res.data.token
      // 2.本地缓存token
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 3.角色权限获取
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data
      const userMenusRes = await getUserMenusByRoleId(id)
      this.userMenus = userMenusRes.data

      // 4.页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
