<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 19:47:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-18 17:46:19
 * @FilePath: /vue-front-template/src/views/layout/components/floating/index.vue
 * @Description: 悬浮框组件
-->
<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-8 h-8 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
    >
      <i-svg-icon
        name="guide"
        class="w-4 h-4"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
      ></i-svg-icon>
    </div>
    <!-- 反馈 -->
    <i-popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-8 h-8 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <i-svg-icon
            name="feedback"
            class="w-4 h-4"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></i-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <i-svg-icon
            name="feedback"
            class="w-3.5 h-3.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></i-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-[13px]">立即吐槽</span>
        </div>
      </div>
    </i-popover>
  </div>
</template>

<script lang="js" setup>
import { defineOptions } from 'vue'

defineOptions({
  name: 'FloatingComp'
})
</script>
