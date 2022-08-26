<template>
  <div>
    <!-- <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
    <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="iconName" />
    </svg> -->
  </div>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/common'

// const isExternal = () => {
//   return isExternal(this.iconClass)
// }

</script>

<style scoped lang="scss">
</style>