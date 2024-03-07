/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-15 09:43:20
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-11 15:05:40
 * @FilePath: /vue-front-template/src/utils/flexible.js
 * @Description: 响应式方案
 */
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '../constants'
import { computed } from 'vue'
/**
 * 判断当前是否为移动端设备
 */
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  // 第一种方式
  // return width.value < PC_DEVICE_WIDTH
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})
/**
 * 指定rem的基准值，最大为40px；
 * 根据屏幕宽度，动态计算并赋值给html跟标签作为font-size的基准值
 */
export const useREM = () => {
  // 获取html标签
  const html = document.querySelector('html')
  if (isMobileTerminal.value) {
    // 定义最大值
    const MAX = 40
    // 监听 html 文档被解析完成的事件
    document.addEventListener('DOMContentLoaded', () => {
      // 计算fontsize，根据当前屏幕宽度 / 10
      let fontSize = window.innerWidth / 10
      fontSize = fontSize < MAX ? MAX : fontSize
      html.style.fontSize = `${fontSize}px`
    })
  } else {
    html.style.fontSize = ''
  }
}
