import request from '@/service'

/** 用户管理：下拉列表 */
export function postUsersListData(queryInfo: any) {
  return request.post({
    url: '/users/list',
    data: queryInfo
  })
}
/** 用户管理：删除数据 */
export function deleteUserById(id: number) {
  return request.delete({
    url: `/users/${id}`
  })
}

/** 用户管理：新建用户 */
export function newUserData(userInfo: any) {
  return request.post({
    url: '/users',
    data: userInfo
  })
}

/** 用户管理：编辑用户 */
export function editUserData(id: number, userInfo: any) {
  return request.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 针对页面的网络请求: 增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return request.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return request.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return request.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return request.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
