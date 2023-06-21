import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/** 不需要权限的路由 */
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/Main.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRoutes
})

// export function resetRouter() {
//   const newRoute = createRouter({})
// }

/**
 * 路由导航守卫
 * 参数：to(原本跳转到哪里去), from(从哪里过来)
 * 返回：不返回/undefined，就是默认跳转
 */
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  // 验证：登录成功进入main
  if (to.path === '/main' && !token) {
    // 没有token，跳转登录页面
    return '/login'
  }

  // 如果进入 main，且有 token 值，跳转到第一个子路由表
  if (to.path == '/main') {
    return firstMenu?.url
  }
})

export default router
