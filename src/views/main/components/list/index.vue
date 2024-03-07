<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-09 11:57:50
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-21 17:06:57
 * @FilePath: /vue-front-template/src/views/main/components/list/index.vue
 * @Description: 列表
-->
<template>
  <div class="px-1 mt-1 w-full">
    <i-infinite v-model="isLoading" :is-finished="isFinished" @onLoad="getPexleList()">
      <i-waterfall :data="pexelsList" node-key="id" :column="isMobileTerminal ? 2 : 5" :picture-pre-reading="false">
        <template v-slot="{ item, width }">
          <pexel-item :data="item" :width="width" @click="onToPins"></pexel-item>
        </template>
      </i-waterfall>
    </i-infinite>
    <!-- 大图详情处理 -->
    <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <pins-component v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>
<script lang="js" setup>
import { ref, reactive, defineOptions, watch } from 'vue'
import { getPexelsList } from '../../../../api/pexels'
import PexelItem from './item.vue'
import { isMobileTerminal } from '../../../../utils/flexible'
import PinsComponent from '../../pins/components/pins.vue'
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
defineOptions({
  name: 'PexelsIndex'
})
const store = useStore()
/**
 * 请求数据
 */
const pagation = reactive({
  size: 20,
  page: 1
})
// 筛选条件
const query = reactive({
  categoryId: ''
})
// 数据是否加载中
const isLoading = ref(false)
// 数据是否加载完成
const isFinished = ref(false)

const pexelsList = ref([])
const getPexleList = async () => {
  if (isFinished.value) {
    return
  }
  // 当完成第一次请求后，page自增
  if (pexelsList.value.length) {
    pagation.page += 1
  }
  const res = await getPexelsList({ ...pagation, ...query })
  if (pexelsList.page === 1) {
    pexelsList.value = res?.list
  } else {
    pexelsList.value.push(...res?.list)
  }
  // 判断全部加载完成
  if (pexelsList.value.length === res.total || res?.list.length < pagation.size) {
    isFinished.value = true
  }
  isLoading.value = false
}
// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})
/**
 * 监听项点击
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}
watch(() => store.getters.currentCategory, (currentCategory) => {
  query.categoryId = currentCategory.id
  pagation.page = 1
  isFinished.value = false
  pexelsList.value = []
})
watch(() => store.getters.searchText, (val) => {
  query.searchText = val,
    pagation.page = 1
  isFinished.value = false
  pexelsList.value = []
})

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
</script>
