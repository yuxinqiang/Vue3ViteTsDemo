<template>
  <div class="base-echart-box" :style="{ width: width, height: height }">
    <div ref="echartDivRef" class="base-echart"></div>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { EChartsInitOpts, echarts, BaseChartExpose } from '@/utils/echarts';
// import { EChartsOption } from 'echarts/types/dist/shared';
import { EChartsOption } from 'echarts';
import { EChartsType } from 'echarts/core';

const props = withDefaults(
  defineProps<{
    option: EChartsOption | UnwrapRef<EChartsOption>
    /** 图表容器初始化配置 */
    echartsInitOpts: EChartsInitOpts
    width?: string;
    height?: string;
    mode?: string;
  }>(),
  {
    width: '100%',
    height: '100%',
    mode: 'vintage'
  }
)

const emits = defineEmits(['echartClick']);

const echartDivRef = ref()
const { option } = toRefs(props);
let chartInstance: EChartsType | null = null;

const getEchartsInstance = () => {
  return chartInstance
}

/**
 * 对外暴露属性
 */
defineExpose<BaseChartExpose>({
  getEchartsInstance
});

onMounted(() => {
  // 创建图表
  chartInstance = echarts.init(
    echartDivRef.value as HTMLElement,
    undefined,
    props.echartsInitOpts
  );
  chartInstance.setOption(props.option as EChartsOption);
})
</script>

<style scoped lang="scss">
</style>