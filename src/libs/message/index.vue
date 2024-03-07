<template>
  <transition name="down" @after-leave="close()">
    <div
      v-show="isVisable"
      class="z-[99] py-[12px] px-[20px] flex flex-wrap items-center fixed top-[60px] left-1/2 translate-x-[-50%] max-w-[80%] border rounded duration-300"
      :class="typeClass"
    >
      <!-- 内容 -->
      <div class="text-[13px]">{{ message }}</div>
      <!-- 关闭按钮 -->
      <i-svg-icon
        v-if="showClose"
        name="close"
        class="w-2.5 h-2.5 ml-4"
        fill-class="fill-zinc-400"
        @click="close()"
      ></i-svg-icon>
    </div>
  </transition>
</template>
<script lang="js">
import { computed } from 'vue'
import ISvgIcon from '../svg-icon/index.vue'
const typeEnum = {
  success: 'bg-[#f0f9eb] text-[#67c23a] border-[#e1f3d8]', // 成功
  warning: 'bg-[#fdf6ec] text-[#e6a23c] border-[#faecd8]', // 警告
  info: 'bg-[#f4f4f5] text-zinc-900 border-[#e9e9eb]', // 消息
  error: 'bg-[#fde2e2] text-[#f56c6c] border-[#fef0f0]', // 错误
 }
</script>
<script lang="js" setup>
import { defineOptions, defineProps, onMounted, ref } from 'vue'
defineOptions({
  name: 'iMessage'
})
const props = defineProps({
  // 消息内容
  message: {
    type: String
  },
  // 消息类型
  type: {
    type: String,
    default: 'success',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`type 必须是${keys.join('|')}中的一个`)
      }
      return result
    }
  },
  // 显示时间
  duration: {
    type: Number,
    default: 2000
  },
  // 关闭执行的方法
  close: {
    type: Function
  },
  // 是否手动关闭
  showClose: {
    type: Boolean,
    default: true
  }
})
const isVisable = ref(false)
const show = () => {
  isVisable.value = true
}
onMounted(() => {
  show()
  // 关闭弹窗，延迟时长
const closeTimeout = setTimeout(() => {
    close()
    clearTimeout(closeTimeout)
  }, props.duration)
})

/**
 * 关闭
 */
const close = () => {
  if (props.close) {
      props.close()
    }
    isVisable.value = false
}

// 根据类型，获取不同的样式
const typeClass = computed(() => {
  return typeEnum[props.type]
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -60px, 0);
}
</style>
