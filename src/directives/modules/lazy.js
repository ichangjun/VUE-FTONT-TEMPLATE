/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-12 11:40:20
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-16 23:51:00
 * @FilePath: /vue-front-template/src/directives/modules/lazy.js
 * @Description: 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core'
import { randomRGBA } from '../../utils/colors'
export default {
  mounted(el) {
    const imgSrc = el.getAttribute('data-src') || el.src
    el.removeAttribute('data-src')
    el.src = ''
    // 获取父级节点
    const parent = el.parentNode
    parent.style.background = randomRGBA()
    parent.style.backgroundSize = 'cover'
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  },
}
