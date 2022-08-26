<template>
  <!-- 基础表格封装组件 -->
  <el-table ref="table">
    <children :key="key" />
  </el-table>
</template>

<script setup lang="ts">
import {
  cloneVNode,
  Component,
  computed,
  reactive,
  ref,
  VNode,
  readonly,
  useSlots,
  watch,
} from 'vue'
import * as storage from './storage'
/**
 * 
 * 表格处理
 * 
 * */
export interface TableColumnProps {
  prop?: string
  label?: string
  fixed?: 'left' | 'right' | boolean
  visiable?: boolean
}

/* 判断 vnode 是否是 el-table-column 组件 */
const isElTableColumn = (vnode: VNode) => {
  return (vnode.type as Component)?.name === 'ElTableColumn'
}

const table = ref()

const pagination = ref()

const slotsOrigin = useSlots()

const slots = computed(() => {
  /* 对 slot 进行分类 */
  const main: VNode[] = [] // ElTableColumn 且存在 prop 属性
  const left: VNode[] = [] // ElTableColumn 不存在 prop 属性，但 fixed="left"
  const other: VNode[] = [] // 其他

  slotsOrigin.default?.()?.forEach((vnode) => {
    if (isElTableColumn(vnode)) {
      const { prop, fixed } = vnode.props ?? {}
      if (prop !== undefined) return main.push(vnode)
      if (fixed === 'left') return left.push(vnode)
    }
    other.push(vnode)
  })

  return {
    main,
    left,
    other,
  }
})

// 从缓存中获取列的数据
const columnsFormStorage = ref<TableColumnProps[]>(
  storage.get('columns') ?? []
)

/* 列的排序与部分属性 */
const columns = reactive({
  // 本地储存的
  storage: computed<TableColumnProps[]>({
    get() {
      return columnsFormStorage.value
    },
    set(value) {
      columnsFormStorage.value = value
      storage.set('columns', value)
    },
  }),

  // slot 中获取的
  slot: computed(() =>
    slots.value.main.map(({ props }) => ({
      prop: props!.prop,
      label: props!.label,
      fixed: props!.fixed,
      visiable: props!.visiable ?? true,
    }))
  ),

  // 渲染使用的
  render: computed(() => {
    const slot = [...columns.slot]
    const storage = [...columns.storage]

    const res: TableColumnProps[] = []
    storage.forEach((props) => {
      const index = slot.findIndex(({ prop }) => prop === props.prop)
      if (~index) {
        const propsFromSlot = slot[index]
        res.push({
          ...propsFromSlot,
          ...props,
        })
        slot.splice(index, 1)
      }
    })
    res.push(...slot)

    return res
  }),
})

/* 重构 slot.main */
const refactorSlot = computed(() => {
  const { main } = slots.value

  /* 对 slot.main 进行改写 */
  const refactorySlot: VNode[] = []
  columns.render.forEach(({ prop, visiable, fixed }) => {
    if (!visiable) return

    const vnode = main.find((vnode) => prop === vnode.props?.prop)
    if (!vnode) return

    const cloned = cloneVNode(vnode, {
      fixed,
    })

    refactorySlot.push(cloned)
  })

  return refactorySlot
})

/* 强制更新 el-table-column */
const key = ref(0)
watch(refactorSlot, () => (key.value += 1))

/* 对外暴露的内容 */
defineExpose({
  table, // el-table 实例的访问
  columns: computed(() => readonly(columns.render)),
  updateColumns(value: TableColumnProps[]) {
    columns.storage = value
  },
})

console.log('children', slots)
console.log('refactorSlot', refactorSlot)
const children = () => [slots.value.left, refactorSlot.value, slots.value.other]

</script>

<style scoped lang="scss">
</style>