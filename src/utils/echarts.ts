// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts';

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  PolarComponentOption,
} from 'echarts/components';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// import { EChartsOption } from 'echarts/types/dist/shared';
import { EChartsType } from 'echarts/core';
import { type } from 'os';

/** 图表容器初始化配置 */
interface EChartsInitOpts {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  [k: string]: any;
}

interface BaseChartExpose {
  /**
   * 获取 echarts 实例
   */
  getEchartsInstance: () => EChartsType | null;
}

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
]);

export type { EChartsInitOpts, BaseChartExpose };
export { echarts }
