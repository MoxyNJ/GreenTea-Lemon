import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    /**请求userList数据 */
    async postUsersListAction() {
      const res = await postUsersListData({})
      const { totalCount, list } = res.list
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
