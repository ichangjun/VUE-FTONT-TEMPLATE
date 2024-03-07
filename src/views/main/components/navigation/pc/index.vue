<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-15 17:35:54
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 16:15:04
 * @FilePath: /vue-front-template/src/views/main/components/navigation/pc/index.vue
 * @Description: pc 下的头部导航栏
-->
<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
    <ul
      class="w-[800px] relative flex flex-wrap overflow-x-auto justify-center px-[12px] py-1.5 text-zinc-800 dark:text-zinc-200 duration-300 overflow-hidden mx-auto"
      :class="isOpenCategoty ? 'h-[170px]' : 'h-[44px]'"
    >
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="text-[15px] font-bold shrink-0 px-4 py-0 h-8 leading-8 mr-1 mb-2 cursor-pointer rounded-md"
        :class="
          $store.getters.currentCategoryIndex === index
            ? 'text-white bg-main hover:bg-main'
            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
        "
        @click="handleItemClick(item)"
      >
        {{ item.name }}
      </li>
      <!-- 箭头 -->
      <li
        class="absolute right-1 bottom-2 z-20 cursor-pointer rounded-sm duration-300 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        @click="handleOpenCategory"
      >
        <i-svg-icon
          :name="isOpenCategoty ? 'fold' : 'unfold'"
          class="w-2.5 h-2.5"
          fill-class="fill-zinc-500"
        ></i-svg-icon>
      </li>
    </ul>
  </div>
</template>
<script lang="js" setup>
import { ref, defineOptions } from 'vue'
import { useStore } from 'vuex'
defineOptions({
  name: 'PcNavigationHeader'
})
const store = useStore()
/**
 * 折叠展开
 */
const isOpenCategoty = ref(false)
const handleOpenCategory = () => {
  isOpenCategoty.value = !isOpenCategoty.value
}
/**
 * 选中
 */
const handleItemClick = (item) => {
  store.dispatch('app/useCurrentCategory', item)
}
</script>
