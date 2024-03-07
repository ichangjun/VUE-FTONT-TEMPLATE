/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-12 11:40:06
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 14:16:05
 * @FilePath: /vue-front-template/src/directives/index.js
 * @Description: 全局指令
 */

/**
 * 注册全局指令
 */
export default {
  install(app) {
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      app.directive(arr[arr.length - 1].replace('.js', ''), value.default)
    }
  },
}
