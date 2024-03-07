<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-16 10:13:10
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-16 23:29:24
 * @FilePath: /vue-front-template/src/libs/confirm/index.vue
 * @Description: 确认弹窗
-->
<template>
  <!-- 蒙版 -->
  <transition name="fade">
    <div
      v-if="isVisable"
      class="fixed left-0 top-0 w-screen h-screen bg-zinc-900/60 z-[98]"
      @click="close"
    ></div>
  </transition>
  <!-- 内容区域 -->
  <transition name="up">
    <div
      v-if="isVisable"
      class="bg-white dark:bg-zinc-900 w-[80%] fixed top-1/3 left-1/2 translate-x-[-50%] z-[99] px-4 py-2 rounded-sm border cursor-pointer xl:w-[35%]"
    >
      <!-- 标题 -->
      <div class="text-[18px] text-zinc-900 dark:text-zinc-200 mb-4 text-left">
        {{ title }}
      </div>
      <!-- 文本 -->
      <div class="text-[14px] text-zinc-700 dark:text-zinc-200 mb-2 text-left">
        {{ content }}
      </div>
      <!-- 按钮 -->
      <div class="flex justify-end">
        <i-button type="info" class="mr-2" @click="handleCancleClick">{{ cancelText }}</i-button>
        <i-button type="main" @click="handleConfirmClick">{{ confirmText }}</i-button>
      </div>
    </div>
  </transition>
</template>
<script lang="js" setup>
import { defineProps, defineOptions, ref, onMounted } from 'vue'
import IButton from '../button/index.vue'
defineOptions({
  name: 'iConfirm'
})
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 描述
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮事件
  confirmHandle: {
    type: Function
  },
  close: {
    type: Function
  }
})
const isVisable = ref(false)
const show = () => {
  isVisable.value = true
}
onMounted(() => {
  show()
})
/**
 * 关闭
 */
// 关闭弹窗，延迟时长
const duration = '0.3s'
const close = () => {
  const closeTimeout = setTimeout(() => {
    if (props.close) {
      props.close()
    }
    isVisable.value = false
    clearTimeout(closeTimeout)
  }, duration.replace('0.', '').replace('s', '') * 100)
}
/**
 * 取消按钮
 */
const handleCancleClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
 }
/**
 * 确定按钮
 */
const handleConfirmClick = () => {
  if (props.confirmHandle) {
    props.confirmHandle()
  }
  close()
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
