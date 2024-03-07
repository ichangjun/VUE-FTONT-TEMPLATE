<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-11 17:16:51
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-27 16:39:58
 * @FilePath: /vue-front-template/src/libs/infinite/index.vue
 * @Description: 无限滚动加载
-->
<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="laodingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <i-svg-icon v-show="loading" class="w-2 h-2 mx-auto animate-spin" name="infinite-load"></i-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">已经没有更多数据了!</p>
    </div>
  </div>
</template>

<script lang="js" setup>
import { defineOptions, defineProps, defineEmits, ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
defineOptions({
  name: 'Infinite'
})
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: true
  }
})
const loading = useVModel(props, 'modelValue')
const emits = defineEmits(['onLoad', 'update:modelValue'])

const laodingTarget = ref(null)
// 解决一屏未铺满，不请求第二次的问题
const targetIsIntersecting = ref(false)
useIntersectionObserver(laodingTarget, ([{ isIntersecting }], observerElement) => {
  // 当目标元素在可视区域出现时，加载更多数据
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})
const emitLoad = () => {
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    loading.value = true
    // 加载更多
    emits('onLoad')
  }
}
watch(loading, (val) => {
  // 延迟用于解决铺满一屏时，请求两次接口的问题
  setTimeout(() => {
    emitLoad()
  }, 150)
})
</script>
