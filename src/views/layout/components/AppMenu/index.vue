<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :collapse="isCollapse" :unique-opened="false" :show-timeout="200"
      :default-active="activeIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router
      @select="menuSelect">
      <menu-item v-for="menu in state.menus" :item="menu" :key="menu.id"></menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">

import menuItem from './components/menuItem.vue'
import { formatTree } from '@/utils/common'
import router from "@/router";
import { useCommon } from '@/store/modules/common' // 状态管理器
// 初始化状态管理器
const commonStore = useCommon()


interface State {
  menus: Menu[]
}
const state = reactive<State>({
  menus: []
})
// 菜单列表数组
const activeIndex = ref<string>()

// 获取菜单列表
const getMenuList = () => {
  const originData = {
    "code": 200,
    "msg": "请求成功",
    "data": {
      "sysMenusList": [
        {
          "id": "3",
          "icon": null,
          "name": "业务页面",
          "url": "/home",
          "parentId": null,
          "sort": "0"
        },
        {
          "id": "1",
          "icon": null,
          "name": "首页",
          "url": "/home",
          "parentId": "3",
          "sort": "0"
        },
        {
          "id": "2",
          "icon": null,
          "name": "Demo",
          "url": "/demo",
          "parentId": "3",
          "sort": "0"
        },
        {
          "id": "a5bb46c9-f680-4502-a22a-4c65953e3e84",
          "icon": null,
          "name": "通用页面",
          "url": "/system",
          "parentId": null,
          "sort": "0"
        },
        {
          "id": "b6508d8e-8c06-4987-8ff1-83835fdffb50",
          "icon": null,
          "name": "404",
          "url": "/404",
          "parentId": "a5bb46c9-f680-4502-a22a-4c65953e3e84",
          "sort": "0"
        }
      ]
    }
  }

  state.menus = [...formatTree(originData.data.sysMenusList)]
}

const isCollapse = ref(false)

// 菜单选择
const menuSelect = (index: string) => {
  commonStore.updateActiveMenu(index)
}

const setCurrentActive = () => {
  console.log('watch', commonStore.getActiveMenu)
  activeIndex.value = commonStore.getActiveMenu
}

onMounted(() => {
  // 暂定为在此处进行菜单列表的获取
  getMenuList()
})

watchEffect(() => {
  setCurrentActive()
})
</script>

<style scoped lang="scss">
</style>