/** elementplus 全局注册图标 */
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  // 遍历所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // app.component 将图标注册成组件
    app.component(key, component)
  }
}

// 导出注册函数，在main.ts中使用plugin方式直接自动调用并注册
export default registerIcons
