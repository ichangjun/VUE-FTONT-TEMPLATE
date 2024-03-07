/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-16 23:50:16
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-16 23:50:23
 * @FilePath: /vue-front-template/src/utils/colors.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 随机色值
 * @returns RGBA
 */
export const randomRGBA = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r},${g},${b},.8)`
}
