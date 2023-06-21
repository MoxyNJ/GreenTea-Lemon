import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function resisterStore(app: App<Element>) {
  app.use(pinia)
  // 动态绑定路由
  const loginStore = useLoginStore()
  loginStore.perMissionAction()
}

export default resisterStore
