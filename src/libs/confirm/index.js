/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-16 10:13:04
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-18 14:58:24
 * @FilePath: /vue-front-template/src/libs/confirm/index.js
 * @Description: confirm组件函数
 */
/**
 * 确认弹窗
 * @param {*} title 标题（如果用户没有传递标题，content内容可作为标题参数）
 * @param {*} content 内容（如果用户没有船体内容，title标题被作为内容参数）
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确认按钮文本
 */
import { h, render } from 'vue'
import ConfirmComponent from './index.vue'
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    // 关闭的回调
    const close = () => {
      render(null, document.body)
    }
    // 取消按钮的回调
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }
    // 确定按钮的回调
    const confirmHandle = () => {
      resolve()
    }
    // 生成vnode
    const vnode = h(
      ConfirmComponent,
      {
        title,
        content,
        cancelText,
        confirmText,
        cancelHandler,
        confirmHandle,
        close,
      },
      null,
    )
    render(vnode, document.body)
  })
}
