<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-25 22:49:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-17 00:11:53
 * @FilePath: /vue-front-template/src/views/layout/components/header/components/my.vue
 * @Description: 头部搜索
-->
<template>
  <div class="w-full h-full">
    <i-search v-model="searchValue" @search="onItemClick">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint :search-text="searchValue" v-show="searchValue" @item-click="onItemClick"></hint>
          <!-- 最新搜索 -->
          <history v-show="!searchValue" @item-click="onItemClick"></history>
          <!-- 主题 -->
          <theme v-show="!searchValue"></theme>
        </div>
      </template>
    </i-search>
  </div>
</template>
<script lang="js" setup name="HeaderSearchComp">
import { ref } from 'vue'
import { useStore } from 'vuex'
import Hint from './hint.vue'
import History from './historys.vue'
import Theme from './themes.vue'
const searchValue = ref('')
/**
 * 搜索项
 * @param {*} value
 */
const store = useStore()
const onItemClick = (value) => {
  searchValue.value = value
  if (value) {
    store.commit('history/setHistory', value)
    // 修改seatchText
    store.commit('app/changeSearchText', value)
  }
}
</script>
