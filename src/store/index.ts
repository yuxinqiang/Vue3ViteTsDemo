// pinia状态管理统一注册
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
// 增加store的数据持久化
store.use(piniaPluginPersist)

export default store