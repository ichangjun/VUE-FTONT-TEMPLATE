<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 13:55:42
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-09-25 15:25:14
 * @FilePath: /vue-front-template/src/libs/popup/index.vue
 * @Description: 通用弹出层
-->
<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isVisable"
          @click="emits('update:modelValue', false)"
          class="popup-mask w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-[98]"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisable"
          v-bind="$attrs"
          class="w-screen fixed bottom-0 left-0 z-[99] popup-content"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script lang="js" setup>
import { defineProps, defineEmits, watch } from 'vue'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const isVisable = useVModel(props, 'modelValue', emits)
// 阻止背景滚动
const isLockedBody = useScrollLock(document.body)
watch(isVisable, (val) => {
  isLockedBody.value = val
}, {
  immediate: true
 })
//
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
