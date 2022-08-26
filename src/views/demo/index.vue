<template>
  <div class="demo">
    <div class="vue-use-demo">
      <vueUse></vueUse>
    </div>
    <el-divider />
    <chart></chart>
    <el-divider />
    <customTable></customTable>
  </div>
</template>

<script setup lang="ts">
import vueUse from './components/vueUse.vue'
import chart from './components/chartsDemo.vue'
import customTable from './components/tableDemo.vue'
</script>

<style scoped lang="scss">
.demo {
  .vue-use-demo {
    width: 100%;
  }
}
</style>