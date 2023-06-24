import type { RouteRecordRaw } from 'vue-router'

/** 构建localRoutes，保存全部的页面路由信息 */
function buildLocalRoutes(): RouteRecordRaw[] {
  const localRoutes: RouteRecordRaw[] = []
  // 读取所有router/main/*.ts文件，'eager'：自动加载
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default) // file.default 就是路由信息，添加到 localRoutes 中
  }
  return localRoutes
}

// 设置 '/main' 的重定向，为动态路由中的第一个路由地址
export let firstMenu: any = null

/** 把角色menus映射为路由 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 获取本地路由
  const localRoutes = buildLocalRoutes()

  // 将角色可访问的路由，添加到router中；通过menu查找角色可访问的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      // 如果匹配到，找到一个满足条件的路由信息
      if (route) {
        routes.push(route) // 添加到路由表中

        // 顶层菜单 / 二级路由的默认跳转，跳转到第一个
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        if (firstMenu === null) firstMenu = subMenu // 第一个路由做标记
      }
    }
  }
  return routes
}

/**
 * 根据路径匹配菜单
 *
 * @export 返回匹配到的菜单
 * @param {string} path 需要匹配的路径
 * @param {any[]} userMenus 完整菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
  return undefined
}

interface IBreadCrumbs {
  name: string
  path: string
}

/**
 * 解析面包屑
 * @param path 当前地址
 * @param userMenus 菜单
 */
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadCrumbs[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }

  return breadcrumbs
}

/**
 * 菜单映射到id的列表，将层层嵌套的menuList对象，展开为 Array ，且只要对象最底层叶子节点的 id
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  recurseGetId(menuList)

  // 递归
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      // 如果有 chidlren，就继续往里递归，只要最底层叶子节点的 id
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  // 递归，获取叶子节点的所有 permission 参数
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      // 根据menu结构得知，权限在第三层，所以直接锁定第三层
      if (item.type === 3) {
        // 权限参数：permission: "system:users:create"
        permissions.push(item.permission)
      } else {
        item.children && recurseGetPermission(item.children)
        // todo 看一下上面的逻辑行不行
        // recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
