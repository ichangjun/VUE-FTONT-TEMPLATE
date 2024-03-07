<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-19 18:07:57
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-19 22:01:50
 * @FilePath: /vue-front-template/src/libs/navbar/index.vue
 * @Description: navbar头部导航栏
-->
<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div class="h-full w-5 absolute left-0 flex items-center justify-center" @click="onClickLeft">
      <slot name="left">
        <i-svg-icon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200" />
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div class="h-full w-5 absolute right-0 flex items-center justify-center" @click="onClickRight">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="js" setup>
import { defineOptions, defineProps } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'iNavbar'
})
const props = defineProps({
  clickLeft: {
    type: Function
  },
  clickRight: {
    type: Function
  },
  sticky: {
    type: Boolean
  }
})
const router = useRouter()
/**
 * 左侧按钮点击事件
 */
const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}

/**
 * 右侧按钮点击事件
 */
const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>
