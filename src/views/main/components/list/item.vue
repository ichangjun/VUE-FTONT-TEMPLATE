<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-09 11:57:54
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-02 09:32:23
 * @FilePath: /vue-front-template/src/views/main/components/list/item.vue
 * @Description: 列表项
-->
<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img v-lazy ref="imgElTarget" :src="data.photo" :data-src="data.photo" class="w-full rounded bg-transparent" :style="{
                      width: width + 'px',
                      height: (width / data.photoWidth) * data.photoHeight + 'px',
                    }" />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
        @click="handleItemClick()">
        <!-- 分享 -->
        <i-button class="absolute top-1.5 left-1.5" type="main">分享</i-button>
        <!-- 点赞 -->
        <i-button class="absolute top-1.5 right-1.5" type="info" icon="heart"
          icon-class="fill-zinc-900 dark:fill-zinc-200"></i-button>
        <!-- 下载 -->
        <i-button class="absolute bottom-1.5 left-1.5 bg-zinc-100/70" type="info" size="small" icon="download"
          icon-class="fill-zinc-900 dark:fill-zinc-200" @click="handleDownload()"></i-button>
        <!-- 全屏 -->
        <i-button class="absolute bottom-1.5 right-1.5 bg-zinc-100/70" type="info" size="small" icon="full"
          icon-class="fill-zinc-900 dark:fill-zinc-200" @click.stop="onImageFullScreen()"></i-button>
      </div>
      <!-- 标题 -->
      <div
        class="text-[.35rem] leading-4 pt-1 font-[500] text-zinc-900 bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 dark:text-zinc-300 line-clamp-2 text-left px-1">
        {{ data.title }}
      </div>
      <!-- 作者 -->
      <div class="flex items-center pt-1 px-1 bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800">
        <img class="rounded-full" :class="isMobileTerminal ? 'h-2 w-2' : 'h-5 w-5'" :src="data.avatar" />
        <span class="text-sm text-zinc-500 ml-1 text-left">{{ data.author }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="js" setup>
import { defineProps, defineOptions, defineEmits, ref, computed } from 'vue'
import { isMobileTerminal } from '../../../../utils/flexible'
import { saveAs } from 'file-saver'
import { message } from '../../../../libs/index'
import { useFullscreen, useElementBounding } from '@vueuse/core'

defineOptions({
  name: 'PexelsItem'
})
const props = defineProps({
  data: {
    type: Object
  },
  // 图片现有宽度
  width: {
    type: Number
  }
})
const imgElTarget = ref(null)
const { enter: onImageFullScreen } = useFullscreen(imgElTarget)
const emits = defineEmits(['click'])
/**
 * 文件下载
 */
const handleDownload = () => {
  message({
    text: '我是一段提示内容，我是一段提示内容，我是一段提示内容，我是一段提示内容',
    type: 'success',
    duration: 3000
  })
  saveAs(props.data?.photoDownLink)
}
/**
 * pins 跳转处理，记录图片的中心点（X|Y位置 + 宽|高的一半）
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgElTarget)
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})
/**
 * item点击
 */
const handleItemClick = () => {
  console.log('imgContainerCenter.value:', imgContainerCenter.value);
  emits('click', {
    id: props.data.id,
    localtion: imgContainerCenter.value
  })
}
</script>
