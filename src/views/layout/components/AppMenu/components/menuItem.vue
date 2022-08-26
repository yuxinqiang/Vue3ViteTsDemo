<template>
  <div class="menu-item-wrapper">
    <!-- 没有子菜单只有一级菜单 -->
    <template v-if="!item.children || item.children.length === 0">
      <el-menu-item class="submenu-title-noDropdown" :index="item.url">
        <component v-if="item.icon != ''" :is="item.icon" class="icon-size" />
        <template #title>
          <el-icon>
            <Setting />
          </el-icon>
          {{ item.name }}
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="item.id">
      <template #title>
        <component v-if="item.icon != ''" :is="item.icon" class="icon-size" />
        <el-icon>
          <Setting />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <menu-item v-for="child in item.children" :item="child" :key="child.id"></menu-item>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { isExternal } from '@/utils/common'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.icon-size {
  width: 19px;
  padding-right: 5px;
}
</style>
