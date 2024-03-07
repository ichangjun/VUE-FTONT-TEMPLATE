<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 11:28:18
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-30 19:15:19
 * @FilePath: /vue-front-template/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <i-transition-router-view :routerType="$store.getters.routerType"
      main-component-name="main"></i-transition-router-view>
  </div>
</template>
<script lang="js" setup>
import { useStore } from 'vuex'
const store = useStore()
</script>
<style lang="scss" scoped>
</style>
