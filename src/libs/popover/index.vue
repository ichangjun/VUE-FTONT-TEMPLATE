<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-07 14:51:37
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-08 17:19:14
 * @FilePath: /vue-front-template/src/libs/popover/index.vue
 * @Description: Popoper 弹出层
-->
<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <!-- 具名插槽 -->
    <div ref="referenceRef">
      <slot name="reference" />
    </div>
    <!-- 匿名插槽 气泡动画展示 -->
    <transition name="slide">
      <div
        ref="contentRef"
        v-if="isVisable"
        class="absolute border border-zinc-100 dark:border-zinc-800 rounded-sm p-1 bg-white dark:bg-zinc-800 z-20 shadow-sm"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="js">
const DELAY_TIME = 200
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script lang="js" setup name="iPopoper">
import { ref, defineProps, watch, nextTick } from 'vue'
const props = defineProps({
  // 气泡位置
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`placement必须是${placementEnum.join('、')}中的一个！`)
      }
      return result
    }
  }
})
const isVisable = ref(false)
let timeout = null
/**
 * 鼠标移入
 */
const onMouseenter = () => {
  isVisable.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}
/**
 * 鼠标移出
 */
const onMouseleave = () => {
  // 延时装置：解决鼠标移动导致气泡消息问题
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}
/**
 * 计算元素的尺寸及位置
 */
const referenceRef = ref(null)
const contentRef = ref(null)
const useElementSize = (target) => {
  if (!target) {
    return {
      width: 0,
      height: 0
    }
  }
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
// 弹出层的位置
const contentStyle = ref({
  top: 0,
  left: 0
})
// 当气泡弹出时，再进行计算位置和尺寸
watch(isVisable, (val) => {
  if (!val) {
    return
  }
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentRef.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceRef.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceRef.value).height + 'px'
        contentStyle.value.left = -useElementSize(contentRef.value).width + 'px'
        break
        // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceRef.value).height + 'px'
        contentStyle.value.left = useElementSize(referenceRef.value).width + 'px'
        break
    }
    console.log('contentStyle.value:', contentStyle.value);
  })
})
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slice-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
