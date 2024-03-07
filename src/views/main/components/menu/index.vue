<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 16:18:22
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 16:21:12
 * @FilePath: /vue-front-template/src/views/main/components/menu/index.vue
 * @Description: 移动端的顶部菜单展开
-->
<template>
  <div class="py-2 h-full box-border">
    <div class="text-[.45rem] font-medium text-black dark:text-zinc-200 pb-1 px-2">所有分类</div>
    <ul ref="ulTargetRef" class="h-full overflow-y-auto pb-2">
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="text-sm duration-200 py-1 box-border px-2.5 text-black dark:text-zinc-200"
        :class="{ 'text-pink-600 dark:text-pink-600 font-medium': currentCategoryIndex === index }"
        @click="handleItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="js" setup>
import { ref, onMounted, defineOptions } from 'vue'
import { useVModel } from '@vueuse/core'
defineOptions({
  name: 'IMenu'
})
const props = defineProps({
  modelValue:  {
    type: [Number, String],
    require: true
  }
})
const ulTargetRef = ref(null)
const currentCategoryIndex = useVModel(props, 'modelValue')
// 竖向滚动至指定位置
onMounted(() => {
  ulTargetRef.value.scrollTo({
      top: currentCategoryIndex.value > 1 ? (currentCategoryIndex.value  - 1) * 38 : 0,
      behavior: 'smooth'
  })
})

const $emits = defineEmits(['onItemClick'])
const handleItemClick = (item) => {
  $emits('onItemClick', item)
}
</script>
