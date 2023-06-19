import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import pinia from './store'
import router from './router'
import registerIcons from './global/register-icons'

// 插件不生效，暂时全局引入
// import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(registerIcons)

app.mount('#app')
