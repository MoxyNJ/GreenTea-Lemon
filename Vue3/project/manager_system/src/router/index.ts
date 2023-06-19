import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

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
  } else if (to.path === '/login') {
    // 验证token是否正确
  }
})

export default router
