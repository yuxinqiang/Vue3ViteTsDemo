<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header>
        <AppHeader />
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <el-scrollbar>
            <AppMenu />
          </el-scrollbar>
        </el-aside>
        <el-main class="main">
          <!-- 横向导航条 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
          <el-scrollbar :style="{ 'max-height': 'calc(100vh - 120px)' }">
            <router-view v-slot="{ Component }">
              <transition name="slide-left" mode="out-in">
                <keep-alive>
                  <component :is="Component" :key="$route.path" />
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader/index.vue' // header
import AppMenu from './components/AppMenu/index.vue' // 左侧导航

</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;

  .layout-container {
    width: 100%;
    height: 100%;
  }

  .aside {
    background-color: #545c64;
  }

  .main {
    background-color: #fafafa;
    box-shadow: inset 5px 5px 15px #eaeaea;
  }

  // 动画设置
  .slide-left-enter-from {
    transform: translateX(-20px);
    opacity: 0;
  }

  .slide-left-enter-to {
    transform: translateX(0px);
  }

  .slide-left-leave-from {
    transform: translateX(0);
  }

  .slide-left-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.3s;
  }
}
</style>