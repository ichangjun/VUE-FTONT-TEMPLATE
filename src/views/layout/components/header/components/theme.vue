<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 22:49:46
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 18:57:14
 * @FilePath: /vue-front-template/src/views/layout/components/header/components/theme.vue
 * @Description: 系统主题
-->
<template>
  <i-popover placement="bottom-left">
    <template #reference>
      <i-svg-icon
        :name="themeIcon"
        class="guide-theme w-6 h-6 p-1 mx-2 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-800 dark:fill-zinc-200"
      ></i-svg-icon>
    </template>
    <div class="w-[140px] outline-none overflow-hidden">
      <div
        v-for="item in themeData"
        :key="item.id"
        class="px-1 py-1.5 cursor-pointer flex items-center dark:hover:bg-zinc-600"
        @click="handleChangeTheme(item)"
      >
        <i-svg-icon
          :name="item.icon"
          class="w-6 h-6 p-1 outline-none"
          fillClass="fill-zinc-800 dark:fill-zinc-200"
        ></i-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-200 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </i-popover>
</template>
<script lang="js" setup name="HeaderThemeComp">
import { computed } from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants/index'
import { useStore } from 'vuex'
const themeData = [
  {
    id: 0,
    type: THEME_LIGHT,
    name: '极简白',
    icon: 'theme-light'
  },
  {
    id: 1,
    type: THEME_DARK,
    name: '极夜黑',
    icon: 'theme-dark'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    name: '跟随系统',
    icon: 'theme-system'
  }
]
const store = useStore()
/**
 * 修改主题
 * @param {*} item
 */
const handleChangeTheme = (item) => {
  store.dispatch('theme/useSetThemeType', item.type)
}
/**
 * 当前主题图标
 */
const themeIcon = computed(() => {
  const currentTheme = themeData.find((item) => {
    return item.type === store.getters.themeType
  })
  return currentTheme?.icon
})
</script>
