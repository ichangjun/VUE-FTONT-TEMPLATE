<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-16 23:35:39
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-17 00:10:48
 * @FilePath: /vue-front-template/src/views/layout/components/header/components/search/themes.vue
 * @Description: 主题
-->
<template>
  <div class="px-2 py-4">
    <div class="mb-2 text-[13px] text-zinc-400 text-left">热门精选</div>
    <div class="flex h-[140px]" v-if="themeList?.list.length">
      <div
        class="w-[260px] cursor-pointer rounded relative"
        :style="{ backgroundColor: randomRGBA }"
      >
        <img v-lazy class="w-[100%] h-[100%] object-cover rounded" :src="themeList?.big.photo" />
        <div
          class="absolute w-[100%] h-[100%] left-0 bottom-0 flex items-center backdrop-blur rounded px-2 text-zinc-200 text-[13px] duration-300 hover:backdrop-blur-none"
        >
          #{{ themeList?.big.title }}
        </div>
      </div>
      <div class="flex flex-wrap max-w-[860px] flex-1">
        <div
          v-for="item in themeList?.list"
          :key="item.id"
          class="h-[45%] w-[260px] backdrop-blur rounded text-zinc-200 text-[13px] duration-300 hover:backdrop-blur-none ml-3.5 mb-3.5"
          :style="{ backgroundColor: randomRGBA }"
        >
          <img v-lazy class="w-[100%] h-[100%] object-cover rounded" :src="item.photo" />
          <div
            class="absolute w-[100%] h-[100%] left-0 bottom-0 flex items-center backdrop-blur rounded px-2 text-zinc-200 text-[13px] duration-300 hover:backdrop-blur-none"
          >
            #{{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js" setup>
import { defineOptions, ref } from 'vue'
import { getThemes } from '@/api/pexels'
import { randomRGBA } from '@/utils/colors'

defineOptions({
  name: 'ThemesComponent'
})
const themeList = ref(null)
const getThemesList = async  () => {
  const { themes } = await getThemes()
  if (themes) {
    themeList.value = {
      big: themes[0],
      list: themes.splice(1, themes.length)
    }
  }
}
getThemesList()
</script>
