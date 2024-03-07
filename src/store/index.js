/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 19:54:02
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-11-27 08:49:12
 * @FilePath: /vue-front-template/src/store/index.js
 * @Description: 状态机
 */
import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import app from './modules/app'
import history from './modules/history'
import theme from './modules/theme'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    history,
    user,
  },
  plugins: [
    createPersistedState({
      key: 'front-template',
      paths: ['category', 'theme', 'history', 'user'],
    }),
  ],
})

export default store
