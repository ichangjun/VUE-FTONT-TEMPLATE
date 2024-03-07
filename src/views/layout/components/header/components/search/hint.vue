<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 px-1 text-[14px] text-left font-[500] text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200"
      @click="handleItemClick(item)"
      v-html="highLightWork(item)"
    ></div>
  </div>
</template>
<script lang="js">
const ITEM_CLICK = 'itemClick'
</script>
<script lang="js" setup>
import { defineOptions, defineProps, defineEmits, ref, computed } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { getHint } from '../../../../../../api/pexels'
defineOptions({
  name: 'HintComponent',
})
const props = defineProps({
  // 搜索文本
  searchText: {
    type: String,
    default: ''
  }
})
/**
 * 处理搜索数据的数据获取
 */
const hintData = ref([])
const initHintData = async () => {
  if (!props.searchText) {
    return
  }
  const res = await getHint(props.searchText)
  hintData.value = res?.result
}
/**
 * 监听搜索关键词
 */
 watchDebounced(() => props.searchText, () => {
  initHintData()
}, {
   immediate: true,
   debounce: 500
})
/**
 * 点击搜索项
 */
const emits = defineEmits([ITEM_CLICK])

const handleItemClick = (item) => {
  emits(ITEM_CLICK, item)
}
/**
 * 关键词高亮
 */
const highLightWork = computed(() => (val) => {
  const regexp = new RegExp(props.searchText, 'gi')
  const str = val.replace(regexp, '')
  return `<span class="font-[800] text-main">${props.searchText}</span>${str}`
})
</script>
