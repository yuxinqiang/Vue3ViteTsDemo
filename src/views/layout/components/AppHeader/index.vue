<template>
  <div class="header">
    <div class="header-left">
      <el-image :src="src" fit="scale-down" />
    </div>
    <div class="header-right">
      <span class="right-btn" @click="fullScreenChange">
        <el-icon>
          <FullScreen />
        </el-icon>
      </span>
      <span class="right-btn">
        <el-icon>
          <Bell />
        </el-icon>
      </span>
      <div class="user-info">
        <el-avatar class="user-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-dropdown class="dropdown-select" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userName }}
            <!-- <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon> -->
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="changePsw">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/common'
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

// logo路径
const src = ref<string>()
src.value = getAssetsImages('vue.svg')

// 登录用户的姓名
const userName = ref<string>('超级管理员')

// 网页全屏
const fullScreenChange = () => {
  toggle()
  console.log('屏幕状态', isFullscreen)
}

// 登录用户信息下拉
const handleCommand = (command: string | number | object) => {
  console.log('下拉切换', command)
}

</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .header-left {
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .header-right {
    display: flex;
    justify-content: flex-end;

    .right-btn {
      margin: auto 10px;
      font-size: 20px;
      cursor: pointer;
    }

    .user-info {
      margin: auto 0 auto 10px;
      display: flex;

      .user-avatar {
        width: 35px;
        height: 35px;
        margin: auto 5px auto auto;
      }

      .dropdown-select {
        margin: auto;
      }
    }
  }
}
</style>