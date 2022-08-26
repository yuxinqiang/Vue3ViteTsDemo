<template>
  <div class="chart-demo">
    <baseChartsVue ref="baseChart" :option="option" :echarts-init-opts="echartsInitOpts"></baseChartsVue>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from 'vue';
import baseChartsVue from '@/components/base/chart/baseCharts.vue';
import { EChartsInitOpts, echarts, BaseChartExpose } from '@/utils/echarts';
// XAXisOption,
//   YAXisOption,
import {
  BarSeriesOption,
  EChartsOption,
} from 'echarts';
import { ComposeOption } from 'echarts/core';
import {
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import { XAXisComponentOption, YAXisComponentOption } from 'echarts';

const echartsInitOpts: EChartsInitOpts = {
  width: 300,
  height: 300,
};

const option: EChartsOption = {
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// type ECOption = ComposeOption<
//   | TitleComponentOption
//   | TooltipComponentOption
//   | XAXisComponentOption
//   | YAXisComponentOption
//   | BarSeriesOption
// >;
// const option: ECOption = {
//   title: {
//     text: 'ECharts 入门示例',
//   },
//   tooltip: { show: true },
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20],
//     },
//   ],
// };

const baseChart = ref<ComponentPublicInstance<unknown, BaseChartExpose>>();

onMounted(() => {
  // 获取 echarts 实例
  const chartInstance = baseChart.value?.getEchartsInstance();
  console.log('%c——echarts', 'color: green', chartInstance);
});
</script>

<style scoped lang="scss">
.chart-demo {}
</style>