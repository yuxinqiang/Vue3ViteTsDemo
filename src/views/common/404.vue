<template>
  <div class="error-page">
    <div class="errop-tips">
      <span class="tips-title">哎呀，页面走丢了~ ~</span>
      <el-button type="primary" size="large" @click="backHome">返回首页</el-button>
    </div>
    <el-image :src="src" fit="fill">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getAssetsImages } from '@/utils/common'

const src = ref<string>()
src.value = getAssetsImages('/common/404.svg')

const backHome = () => {
  router.replace({
    path: '/home'
  })
}

</script>

<style scoped lang="scss">
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  .errop-tips {
    margin: auto;
    display: flex;
    flex-direction: column;

    .tips-title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>