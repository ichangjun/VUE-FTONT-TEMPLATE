/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-18 14:57:38
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-18 15:22:38
 * @FilePath: /vue-front-template/src/libs/message/index.js
 * @Description: message 组件函数
 */
import { h, render } from 'vue'
import MessageComponent from './index.vue'
export const message = ({ text, type, duration, showClose } = params) => {
  // 关闭的回调
  const close = () => {
    render(null, document.body)
  }
  const vnode = h(
    MessageComponent,
    {
      message: text,
      type,
      duration,
      close,
      showClose,
    },
    null,
  )
  render(vnode, document.body)
}
