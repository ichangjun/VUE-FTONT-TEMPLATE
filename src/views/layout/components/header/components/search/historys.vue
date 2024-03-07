<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-12 19:53:36
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-16 23:30:58
 * @FilePath: /vue-front-template/src/views/layout/components/header/components/search/historys.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="flex items-center text-[13px] mb-2 p-2 text-zinc-400">
      <span>最新搜索</span>
      <i-svg-icon
        name="delete"
        class="w-4 h-4 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fill-class="fill-zinc-400"
        @click="handleDeleteAll"
      >
      </i-svg-icon>
    </div>
    <div class="flex flex-wrap px-2">
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="index"
        class="mr-2 mb-1.5 flex items-center justify-center cursor-pointer bg-zinc-100 px-2 py-1 text-zinc-900 text-[12px] font-[500] rounded-sm duration-300 hover:bg-zinc-200"
        @click="handleItemClick(item)"
      >
        <span>{{ item.text }}</span>
        <i-svg-icon
          name="input-delete"
          class="w-3 h-3 ml-2 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="handleDelete(index)"
        ></i-svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="js">
const ITEM_CLICK = 'itemClick'
</script>
<script lang="js" setup>
import { defineOptions, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { confirm } from '@/libs/index'

defineOptions({
  name: 'HistoryCompanent'
})
const store = useStore()
/**
 * 删除全部
 */
const handleDeleteAll = () => {
  confirm('提醒', '确定删除所有记录么？', '不删除了', '删除').then(() => {
      store.commit('history/deleeAllHistory')
  }).catch(() => {
    console.log('点击了取消')
  })
}
/**
 * 单个删除
 */
const handleDelete = (index) => {
  store.commit('history/deleteHistory', index)
}
/**
 * 点击搜索记录单个
 */
const emits = defineEmits([ITEM_CLICK])
const handleItemClick = (item)=>{
  emits(ITEM_CLICK, item.text)
}
</script>
