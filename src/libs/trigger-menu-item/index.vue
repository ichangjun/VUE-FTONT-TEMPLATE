<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-21 11:51:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-21 11:56:11
 * @FilePath: /vue-front-template/src/libs/trigger-menu-item/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-5 flex flex-col items-center justify-center mx-0.5" @click="onItemClick">
    <i-svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"></i-svg-icon>
    <p class="text-sm mt-0.5" :class="textClass">
      <slot />
    </p>
  </div>
</template>
<script lang="js" setup>
import { defineOptions, defineProps } from 'vue'
import {useRouter} from 'vue-router'
defineOptions({
  name: 'iTriggerMenuItem'
})
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  to: {
    type: String
  }
})
const router = useRouter()
const onItemClick = () => {
  if (!props.to) {
    return
  }
  router.push(props.to)
}
</script>
