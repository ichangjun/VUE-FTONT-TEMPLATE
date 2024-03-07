<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-15 17:35:22
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-11 09:33:45
 * @FilePath: /vue-front-template/src/views/main/components/navigation/index.vue
 * @Description: 导航栏组件
-->
<template>
  <mobile-navigation-header v-if="isMobileTerminal" />
  <pc-navigation-header v-else />
</template>
<script lang="js" setup name="Navigation">
import { isMobileTerminal } from '../../../../utils/flexible'
import MobileNavigationHeader from './mobile/index.vue'
import PcNavigationHeader from './pc/index.vue'
import { useStore } from 'vuex'

// 初始化导航栏数据
const store = useStore()
store.dispatch('category/useCategoryData')
</script>
