<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-21 14:58:13
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-09-21 16:58:54
 * @FilePath: /vue-front-template/src/libs/svg-icon/index.vue
 * @Description: svg-icon 组件
-->
<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>
<script lang="js" setup>
import {computed} from 'vue'
const props = defineProps({
// 显示的svg
  name: {
    type: String,
    required: true
  },
  // 图标颜色
  color: {
    type: String
  },
  // tailwindcss 指定的svg的颜色
  fillClass: {
    type: String
  }
})
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>
