<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 19:47:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-08 18:29:01
 * @FilePath: /vue-front-template/src/views/layout/components/floating/index.vue
 * @Description: 顶部组件
-->
<template>
  <div
    class="h-header bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-500 w-full px-2 py-1 duration-500"
  >
    <div class="flex h-full w-full flex-row items-center justify-center">
      <div class="h-8 w-8 flex-initial cursor-pointer mr-2 rounded-[100px]">
        <img class="rounded-[100px]" src="../../../../assets/images/logo-512.png" />
      </div>
      <header-search-comp></header-search-comp>
      <header-theme-comp></header-theme-comp>
      <header-my-comp></header-my-comp>
    </div>
  </div>
</template>
<script lang="js" setup name="HeaderComp">
import HeaderSearchComp from './components/search/index.vue'
import HeaderMyComp from './components/my.vue'
import HeaderThemeComp from './components/theme.vue'
</script>
