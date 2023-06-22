import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number

  pageList: any[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),

  actions: {
    /**请求userList数据 */
    async postUsersListAction(queryInfo: any) {
      const res = await postUsersListData(queryInfo)
      this.usersTotalCount = res.data.totalCount
      this.usersList = res.data.list
      return 'success'
    },
    /**删除角色 */
    async deleteUserByIdAction(id: number) {
      const res = await deleteUserById(id)
      return res
    },
    /** 编辑角色 */
    async editUserDataAction(id: number, data: any) {
      const res = await editUserData(id, data)
      return res
    },
    /** 新建角色 */
    async newUserDataAction(data: any) {
      const res = await newUserData(data)
      return res
    },
    /** 封装Page 的增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const res = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = res.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    /**删除角色 */
    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id)
      return res
    },
    /** 编辑角色 */
    async editPageDataAction(pageName: string, id: number, data: any) {
      const res = await editPageData(pageName, id, data)
      return res
    },
    /** 新建角色 */
    async newPageDataAction(pageName: string, data: any) {
      const res = await newPageData(pageName, data)
      return res
    }
  }
})

export default useSystemStore
