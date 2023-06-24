import { ID, LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import router, { defaultRoutes } from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount, UserInfo } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: UserInfo
  userMenus: Array<any>
  routes: RouteRecordRaw[]
  permissions: Array<any>
}

/** 存储用户登录信息，action封装用户登录验证网络请求 */
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    routes: [],
    permissions: []
  }),
  actions: {
    /** 登录后获取数据 */
    async loginAccountAction(account: IAccount) {
      // 1.POST：登录请求
      const res = await accountLoginRequest(account)
      res.data.id = res.data.id == 5 ? 4 : res.data.id
      const id = res.data.id
      const token = res.data.token
      localCache.setCache(LOGIN_TOKEN, token)

      // 获取：角色权限
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      localCache.setCache(USER_INFO, userInfo)

      // 获取：角色菜单
      const userMenusRes = await getUserMenusByRoleId(id)
      const userMenus = userMenusRes.data
      localCache.setCache(USER_MENUS, userMenus)

      //防刷新，加载：Pinia 保存 + 权限请求 + 动态绑定路由
      this.perMissionAction(userInfo, userMenus, token)

      // 4.页面跳转
      router.push('/main')
    },

    /** 防刷新：Pinia 保存 + 权限请求 + 动态绑定路由 */
    perMissionAction(
      userInfo = localCache.getCache(USER_INFO),
      userMenus = localCache.getCache(USER_MENUS),
      token = localCache.getCache(LOGIN_TOKEN)
    ) {
      // 防刷新：获取：roles、department 数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // Pinia 保存
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 获取：按钮权限
        this.permissions = mapMenusToPermissions(userMenus)

        /**动态添加路由对象 */
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((item) => router.addRoute('main', item))
        this.routes = routes
      }
    }
  }
})

export default useLoginStore
