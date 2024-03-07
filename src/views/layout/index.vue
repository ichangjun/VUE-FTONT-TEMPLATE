<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 19:56:06
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-10 17:15:05
 * @FilePath: /vue-front-template/src/views/layout/index.vue
 * @Description: PC端主框架
-->
<template>
  <div class="h-screen w-screen">
    <header-comp></header-comp>
    <div class="h-main">
      <main-comp></main-comp>
    </div>
    <float-comp></float-comp>
  </div>
</template>
<script lang="ts" setup name="PcLayout">
import HeaderComp from './components/header/index.vue'
import MainComp from './components/main/index.vue'
import FloatComp from './components/floating/index.vue'
</script>
