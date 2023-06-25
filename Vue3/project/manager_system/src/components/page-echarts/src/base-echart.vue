<!-- echart 的基本封装：创建实例、封装缩放方法等，通过props.option 传入不同的图形配置 -->
<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

const props = defineProps<{
  option: EChartsOption
}>()

const echartRef = ref<HTMLElement>()

/** 组件已挂载，DOM 更新完毕 */
onMounted(() => {
  // 1.初始化echarts实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })

  // 2.第一次进行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})

onMounted(() => {})
</script>

<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>
