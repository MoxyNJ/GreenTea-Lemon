import request from '..'

/** 完整角色信息 */
export function getEntireRoles() {
  return request.post({
    url: '/role/list'
  })
}

/** 完整部门信息 */
export function getEntireDepartments() {
  return request.post({
    url: '/department/list'
  })
}

/** 完整菜单信息 */
export function getEntireMenus() {
  return request.post({
    url: '/menu/list'
  })
}
