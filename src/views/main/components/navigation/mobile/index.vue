<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-15 17:35:54
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 19:59:02
 * @FilePath: /vue-front-template/src/views/main/components/navigation/mobile/index.vue
 * @Description: mobile 下的头部导航栏
-->
<template>
  <div class="bg-white dark:bg-zinc-900 sticky z-10 left-0 top-0 p-0 duration-500">
    <ul
      ref="sliderTarget"
      class="relative flex overflow-x-auto overflow-hidden text-sm text-zinc-600 dark:text-zinc-200 px-2 py-1 box-border"
    >
      <!-- 选中滑块 -->
      <li :style="sliderStyle" class="bg-main rounded-md duration-200 h-3 absolute"></li>
      <!-- 左侧汉堡按钮 -->
      <li
        @click="handleShowPopup"
        class="h-4 px-1 fixed top-0 right-[-1px] flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-zinc-900"
      >
        <i-svg-icon class="w-1.5 h-1.5" name="hamburger"></i-svg-icon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 text-sm py-0.5 duration-200 last:mr-4 z-10"
        :class="{ 'text-zinc-50': index === $store.getters.currentCategoryIndex }"
        :ref="setItemRef"
        @click="handleCategoryTap(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <i-popup v-model="popupVisable">
    <div class="h-60 overflow-y-hidden bg-white dark:bg-zinc-900 rounded-t-md">
      <i-menu v-model="$store.getters.currentCategoryIndex" @on-item-click="onItemClick" />
    </div>
  </i-popup>
</template>
<script lang="js" setup>
import { ref, onBeforeUpdate, watch, defineOptions, onActivated } from 'vue'
import { useScroll } from '@vueuse/core'
import iMenu from '../../menu/index.vue'
import { useStore } from 'vuex'
defineOptions({
  name: 'MobileNavigationHeader'
})
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '1.5rem'
})
const store = useStore()
/**
 * 导航栏目的点击
 */
const sliderTarget = ref(null)
const handleCategoryTap = (item) => {
  store.dispatch('app/useCurrentCategory', item)
}
// 获取所有的item元素
const itemRefList = ref([])
const setItemRef = (el) => {
  if (el) {
    itemRefList.value.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefList.value = []
})
// 当前滑块横向滑动的距离
const { x: ulScrollLeft, } = useScroll(sliderTarget)
// watch监听getters时，需要提供一个函数
watch(() => store.getters.currentCategoryIndex, (val) => {
  try {
    const itemRef = itemRefList.value[val]
    if (!itemRef) {
      throw new Error('Invalid item reference')
    }
    const { left, width } = itemRef.getBoundingClientRect()
    if (isNaN(left) || isNaN(width)) {
      throw new Error('Invalid bounding rectangle')
    }
    // 获取当前html的基准值
    const { fontSize } = getComputedStyle(document.querySelector('html'), null)
    const _scale = fontSize ? fontSize.substring(0, fontSize.length - 2) / 2 : 1
    sliderStyle.value = {
      transform: `translateX(${left + ulScrollLeft.value - _scale}px)`,
      width: `${width}px`
    }
    sliderTarget.value.scrollTo({
      left: left + ulScrollLeft.value - 10,
      behavior: 'smooth'
    })
  } catch (error) {
    console.error('Error:', error.message)
    // 处理异常情况，例如设置默认值或回滚操作
  }
})
// 记录当前横向滚动
onActivated(() => {
  if (!sliderTarget.value) {
    return
  }
  sliderTarget.value.scrollLeft = ulScrollLeft.value
})
/**
 * 控制popup弹出层
 */
const popupVisable = ref(false)
const handleShowPopup = () => {
  popupVisable.value = true
}
/**
 * 更多分类项目点击
 * @param {*} index
 */
const onItemClick = (item) => {
  store.dispatch('app/useCurrentCategory', item)
  popupVisable.value = false
}
</script>
