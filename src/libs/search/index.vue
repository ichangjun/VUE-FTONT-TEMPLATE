<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-26 15:02:53
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-18 17:35:55
 * @FilePath: /vue-front-template/src/libs/search/index.vue
 * @Description: 通用搜索框
-->
<template>
  <div
    class="w-full h-full items-center justify-center flex flex-col px-2 relative"
    ref="containerTarget"
  >
    <div
      class="group w-full p-0.5 relative rounded-[30px] duration-500 hover:bg-red-100/40 dark:bg-zinc-800"
    >
      <!-- 搜索按钮 -->
      <i-svg-icon
        name="search"
        class="w-4 h-4 absolute translate-y-[50%] translate-x-[50%] top-[16%] left-2"
        color="#707070"
      ></i-svg-icon>
      <!-- 输入框 -->
      <input
        class="block w-full h-[40px] pl-10 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-[30px] box-border text-zinc-900 dark:text-zinc-200 tracking-wide text-[13px] font-semibold border duration-200 border-zinc-100 dark:border-zinc-500 focus:border-red-300 dark:focus:border-red-300 focus:bg-white dark:focus:bg-zinc-900 group-hover:border-white group-hover:border-2 dark:group-hover:border-red-300 group-hover:bg-white dark:group-hover:bg-zinc-900"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @focus="onFocusIn"
        @blur="onBlurIn"
        @keyup.enter="handleSearch"
      />
      <!-- 删除按钮 -->
      <i-svg-icon
        name="input-delete"
        class="w-3.5 h-3.5 absolute translate-y-[50%] translate-x-[50%] top-[18%] right-16 cursor-pointer duration-500"
        v-show="inputValue"
        @click="onClearInput"
      ></i-svg-icon>
      <!-- 分隔线 -->
      <div
        class="opacity-0 h-4 w-[.5px] absolute translate-y-[50%] translate-x-[50%] top-[14%] right-[48px] duration-800 bg-zinc-200 dark:bg-zinc-50 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮 -->
      <i-button
        icon="search"
        type="main"
        icon-color="#ffffff"
        class="absolute right-1.5 top-[12%] w-8 h-8 rounded-full opacity-0 duration-800 group-hover:opacity-100"
        :class="isShowSlide ? 'opacity-100' : ''"
        @click="handleSearch"
      ></i-button>
    </div>
    <transition name="slide">
      <div
        class="w-full bg-white overflow-y-auto dark:bg-zinc-900 rounded-[8px] absolute top-[60px] left-0 p-2 border border-zinc-20 dark:border-zinc-500 duration-200 z-30 hover:shadow-3xl scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
        v-if="$slots.dropdown"
        v-show="isShowSlide"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="js">
// 双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 搜索
const EMIT_SEARCH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>
<script lang="js" setup>
import { ref, defineEmits, defineProps, defineOptions, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
defineOptions({
  name: 'iSearch'
})
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
// 结构props传参
const inputValue = useVModel(props)
const isShowSlide = ref(false)
// 注册事件
const emits = defineEmits([EMIT_UPDATE_MODELVALUE, EMIT_SEARCH, EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
const containerTarget = ref(null)
// 清空文本
const onClearInput = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
// 搜索
const handleSearch = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
// 获取到焦点
const onFocusIn = () => {
  isShowSlide.value = true
  emits(EMIT_FOCUS)
}
// 失去焦点
const onBlurIn = () => {
  emits(EMIT_BLUR)
}
// 点击目标元素之外的事件触发
onClickOutside(containerTarget, () => {
  isShowSlide.value= false
})
</script>
<style lang="scss">
.slide-enter-active,
.slice-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(60px);
  opacity: 0;
}
</style>
