<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 22:49:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-20 20:44:58
 * @FilePath: /vue-front-template/src/views/layout/components/header/components/my.vue
 * @Description: 头部主题
-->
<template>
  <i-popover class="flex items-center">
    <template #reference>
      <div
        class="relative flex items-center cursor-pointer outline-none p-1 duration-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        v-if="$store.getters.token"
      >
        <!-- 头像 -->
        <img :src="$store.getters.userInfo.avatar" class="w-6 h-6 rounded-sm" />
        <!-- 箭头 -->
        <i-svg-icon
          name="down-arrow"
          class="w-3 h-3 ml-1"
          fill-class="fill-zinc-500 dark:fill-zinc-200"
        ></i-svg-icon>
        <!-- vip -->
        <i-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="w-3 h-3 absolute bottom-0 right-3"
        ></i-svg-icon>
      </div>
      <div v-else>
        <i-button
          class="w-6 h-6"
          icon="profile"
          type="main"
          iconColor="#fff"
          @click="onToLogin"
        ></i-button>
      </div>
    </template>
    <div v-if="$store.getters.token" class="w-[140px] outline-none overflow-hidden">
      <div
        v-for="item in myMenuData"
        :key="item.id"
        class="px-1 py-1.5 cursor-pointer flex items-center hover:bg-zinc-100/60 dark:hover:bg-zinc-600"
        @click="item.function"
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
<script lang="js" setup>
import { defineOptions } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '../../../../../libs'

defineOptions({
  name: 'HeaderMyComp'
})
const myMenuData = [
  {
    id: 0,
    name: '个人资料',
    icon: 'profile'
  },
  {
    id: 1,
    name: '升级VIP',
    icon: 'vip-profile'
  },
  {
    id: 2,
    name: '退出登录',
    icon: 'logout',
    function: () => {
      onItemClick()
    }
  }
]
const router = useRouter()
// 进入登录
const onToLogin = () => {
  router.push('/login')
}
const store = useStore()
/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
 const onItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    router.push(path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？').then(() => {
    // 退出登录不存在跳转路径
    store.dispatch('user/logout')
  })
}
</script>
