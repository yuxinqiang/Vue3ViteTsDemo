<template>
  <div>
    <CustomeTable :data="data" ref="table" border max-height="320px" header-row-class-name="table-header">
      <slot>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="order" label="订单号" />
        <el-table-column prop="price" label="价格">
          <template #default="{ row }">￥{{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="amount" label="总计">
          <template #default="{ row }">{{ row.amount }}件</template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />
      </slot>
    </CustomeTable>
  </div>
</template>

<script setup lang="ts">
const table = ref()

interface IDataItem {
  id: number
  order: string
  price: number
  amount: number
  title: string
}

const data = ref<IDataItem[]>([])

// 演示数据，仅供参考
function fetchMore() {
  let id = 0
  const list = Array.from(new Array(20), () => ({
    id: ++id,
    order: `O${Math.random().toFixed(20).slice(2, 22)}`,
    price: Number((Math.random() * 500).toFixed(2)),
    amount: Math.floor(Math.random() * 100),
    title: Number(Math.random().toFixed(10).slice(2, 10))
      .toString(32)
      .toUpperCase(),
  }))

  data.value = [...list]
  console.log('演示数据', list)
}
fetchMore()

</script>

<style scoped lang="scss">
.table-header {
  background: #ccc;
}
</style>