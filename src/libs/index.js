/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-21 16:07:11
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-18 15:08:56
 * @FilePath: /vue-front-template/src/libs/index.js
 * @Description: 公共组件注册
 */
import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index.js'
export { message } from './message/index.js'
// 获取当前路径下所有的组件index.vue
const components = import.meta.glob('./*/index.vue')

export default {
  install: (app) => {
    // 将组件自动注册到公共组件对象中
    for (const [path, fn] of Object.entries(components)) {
      app.component(`i-${path.split('/')[1]}`, defineAsyncComponent(fn))
    }
  },
}
