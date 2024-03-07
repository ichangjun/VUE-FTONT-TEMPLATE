<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
      <keep-alive :include="virualTaskStack">
        <component
          :class="{ 'fixed top-0 left-0 w-screen z-[5000]': isAnimation }"
          :is="Component"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="js">
// 无动效
const NONE = 'none'
// 进入
const ROUTER_TYPE_PUSH = 'push'
// 退出
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
</script>
<script lang="js" setup>
import { defineOptions, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'iTransitionRouterView'
})
const props = defineProps({
  // 路由跳转的类型
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val)
      if (!result) {
        throw new Error(`你的routerType必须是${ROUTER_TYPE_ENUM.join('、')}中的一个`)
      }
      return result
    }
  },
  // 首页的组件名称，对应任务栈中的第一个组件
  mainComponentName: {
    type: String,
    required: true
  }
})
const router = useRouter()
// 跳转动画
const transitionName = ref('')
// 虚拟任务栈的数组，用来表示需要持久化的组件
const virualTaskStack = ref([props.mainComponentName])
// 监听路由变化
router.beforeEach((to, from) => {
  // 定义当前动画名称
  transitionName.value = props.routerType
  if (props.routerType === ROUTER_TYPE_PUSH) {
    virualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    virualTaskStack.value.pop()
  }
  // 当进入首页，默认清空栈
  if (to.name === props.mainComponentName) {
    virualTaskStack.value = [props.mainComponentName]
  }
})
const isAnimation = ref(false)
// 动画开始前
const onBeforeEnter = () => {
  isAnimation.value = true
}
// 动画结束后
const onAfterLeave = () => {
  isAnimation.value = false
}
</script>
<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.5s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.5s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
