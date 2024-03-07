<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-19 17:27:21
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-06 17:07:54
 * @FilePath: /vue-front-template/src/views/main/pins/components/pins.vue
 * @Description: 组件详情
-->
<template>
  <div class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2">
    <!-- 移动端下展示 navbar -->
    <i-navbar v-if="isMobileTerminal" @clickLeft="onPop" @clickRight="onPop">
      {{ pexelData.title }}
      <template #right>
        <i-svg-icon name="share" class="w-4 h-4" fillClass="fill-zinc-900 dark:fill-zinc-200"></i-svg-icon>
      </template>
    </i-navbar>
    <!-- pc 端下展示关闭图标 -->
    <i-svg-icon v-else name="close"
      class="w-4 h-5 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400" @click="onPop"></i-svg-icon>

    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg" :src="pexelData.photo" />
      <div class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <i-svg-icon name="share"
            class="w-7 h-7 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"></i-svg-icon>

          <i-button class="" type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200" />
        </div>
        <!-- 标题 -->
        <p class="text-[18px] text-left text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-[24px] xl:mb-5">
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-2 px-1">
          <img class="h-8 w-8 rounded-full" :src="pexelData.avatar" alt="" />
          <span class="text-[14px] text-zinc-900 dark:text-zinc-200 ml-2">{{
                      pexelData.author
                      }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineOptions, ref, defineProps } from 'vue'
import { getPexelsFromId } from '@/api/pexels'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '../../../../utils/flexible'
defineOptions({
  name: 'PinsComponent',
})
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const pexelData = ref({})
/**
 * 获取详情数据
 */
const getPexelData = async () => {
  const data = await getPexelsFromId(props.id)
  pexelData.value = data
}
getPexelData()
/**
 * 关闭按钮处理事件
 */
const router = useRouter()
const onPop = () => {
  router.back()
}
</script>
