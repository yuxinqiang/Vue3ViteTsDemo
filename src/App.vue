<template>
  <el-config-provider :locale="lang">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import router from "@/router";
import { useCommon } from '@/store/modules/common' // 状态管理器

// 初始化状态管理器
const commonStore = useCommon()
const lang = zhCn

// 路由监听，根据判断页面路径跳转
const unwatch = router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!commonStore.getAdminToken) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
})

onMounted(() => {
  unwatch()
})

</script>

<style scoped>
</style>
