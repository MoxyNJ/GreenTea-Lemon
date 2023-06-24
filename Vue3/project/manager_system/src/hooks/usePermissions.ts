import useLoginStore from '@/store/login/login'

/**
 * 获取权限数据
 * @param permissionID 一级菜单:二级菜单：users:create
 * @returns boolean 是否有权限
 */
function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
