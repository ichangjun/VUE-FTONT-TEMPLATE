<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-15 16:42:40
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-15 11:49:22
 * @FilePath: /vue-front-template/src/views/main/index.vue
 * @Description: 移动端首页
-->
<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-900 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget">
    <navigation />
    <div class="max-w-screen-xl mx-auto relative xl:mt-4">
      <pexels-index></pexels-index>
    </div>
    <i-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
      <i-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">
        首页
      </i-trigger-menu-item>
      <i-trigger-menu-item v-if="$store.getters.token" icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500" @click="onVipClick">
        VIP
      </i-trigger-menu-item>
      <i-trigger-menu-item icon="profile" iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500" @click="onMyClick">
        {{ $store.getters.token ? '我的' : '去登录' }}
      </i-trigger-menu-item>
    </i-trigger-menu>
  </div>
</template>
<script lang="js" setup>
import { defineOptions, ref, onActivated } from 'vue'
defineOptions({
  name: 'main'
})
import Navigation from './components/navigation/index.vue'
import PexelsIndex from './components/list/index.vue'
import { isMobileTerminal } from '../../utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
const store = useStore()
const router = useRouter()
const onVipClick = () => {

}
// 监听页面滚动
const containerTarget = ref(null)
const { x: containerX, y: containerY } = useScroll(containerTarget)
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerY.value
})
const onMyClick = () => {
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push({
      path: '/profile'
    })
  } else {
    router.push({
      path: '/login'
    })
  }
}
</script>
