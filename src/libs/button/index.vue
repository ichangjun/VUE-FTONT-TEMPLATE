<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-26 18:40:35
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 18:50:52
 * @FilePath: /vue-front-template/src/libs/button/index.vue
 * @Description: 通用按钮组件
-->

<template>
  <button
    class="text-center rounded duration-300 flex justify-center items-center border-none focus:outline-none"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isAcctiveAnim,
      },
    ]"
    @click.stop="handleBtn"
  >
    <i-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></i-svg-icon>
    <i-svg-icon
      v-if="icon"
      :name="icon"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fill-class="iconClass"
    ></i-svg-icon>
    <slot></slot>
  </button>
</template>
<script lang="js">
// 按钮分类
const typeEnum = {
  primary: 'text-white bg-[#409eff] dark:bg-zinc-900 hover:bg-[#79bbff] dark:hover:bg-zinc-500 active:bg-[#79bbff] dark:active:bg-zinc-500',
  main: 'text-white bg-main dark:bg-zinc-900 hover: bg-hover-main dark:hover:bg-zinc-500 active: bg-main dark:active:bg-zinc-500',
  info: 'text-zinc-800 bg-zinc-200 hover: bg-zinc-300 active: bg-zinc-200 p-2'
}
// 按钮大小
const sizeEnum = {
  default: {
    button: 'min-w-[78px] min-h-[32px] text-base',
    icon: 'w-4 h-4'
  },
  'icon-default': {
    button: 'min-w-6 min-h-6',
    icon: 'w-4 h-4'
  },
  small: {
    button: 'min-w-[54px] min-h-[24px] text-base',
    icon: 'w-4 h-4'
  },
  'icon-small': {
    button: 'min-w-4 min-h-4',
    icon: 'w-2.5 h-2.5'
  }
}
const EMIT_CLICK = 'click'
</script>
<script lang="js" setup>
import { defineProps, defineOptions, computed } from 'vue'
import iSvgIcon from '../svg-icon/index.vue'
defineOptions({
  name: 'iButton'
})
const props = defineProps({
  // 按钮类型
  type: {
    type: String,
    default: 'primary',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`type必须是${keys.join('、')}中的一个`)
      }
      return  result
    }
  },
  // 按钮大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key)=>!key.includes('icon-'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`size必须是${keys.join('、')}中的一个`)
      }
      return  result
    }
  },
  // 图标
  icon: {
    type: String,
    default: ''
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: ''
  },
  // 图标类名（tailwindcss）
  iconClass: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  isAcctiveAnim: {
    type: Boolean,
    default: true
  }
})
const sizeKey = computed(() => {
  return props.icon? 'icon-'+props.size : props.size
})
const emits = defineEmits([EMIT_CLICK])
const handleBtn = () => {
  if (props.loading) {
    return
  }
  emits(EMIT_CLICK)
}
</script>
