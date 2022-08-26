 <template>
  <!-- vueuse使用实例 -->
  <div class="vue-sue-demo">
    <h3> 测试vueUse的鼠标坐标位置</h3>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>
<style lang="scss" scoped>
.vue-sue-demo {
  display: flex;
}
</style>