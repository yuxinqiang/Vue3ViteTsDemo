import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from '@/router'
// 全局注册element的icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


// 创建APP实例
const app = createApp(App)

// 挂载pinia
app.use(store)

// 挂载路由
app.use(router)

// 挂载图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载app实例
app.mount('#app')
