// 公用信息状态管理

import { defineStore } from 'pinia'
import { UserInfo } from '../interface'
import router from '@/router';

interface State {
  userInfo: UserInfo
  activeMenu: string
}
export const useCommon = defineStore('common', {
  state: (): State => {
    return {
      userInfo: {
        adminToken: '', // 管理后台的token
        screenToken: '', // 大屏的登录token
        menuList: [], // 菜单列表
        username: '', // 用户名
        name: '' // 姓名、昵称
      },
      activeMenu: ''
    }
  },

  // 开启数据缓存，用于状态管理器的数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, // 修改缓存的存储位置
      }
    ]
  },

  actions: {
    // 更新活跃状态的menu
    updateActiveMenu(activeIndex: string) {
      this.activeMenu = activeIndex
    },

    // 移除token等缓存内容
    removeToken() {
      this.userInfo = {
        adminToken: '', // 管理后台的token
        screenToken: '', // 大屏的登录token
        menuList: [], // 菜单列表
        username: '', // 用户名
        name: '' // 姓名、昵称
      }
      router.replace({ path: '/login' })
    }
  },
  getters: {
    // 获取token
    getAdminToken: (state) => {
      return state.userInfo?.adminToken
    },

    // 获取活跃状态menu的activeindex
    getActiveMenu: (state) => {
      return state.activeMenu
    }
  }
})
