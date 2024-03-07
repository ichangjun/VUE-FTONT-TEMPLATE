/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-08 18:22:28
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 18:56:39
 * @FilePath: /vue-front-template/src/utils/theme.js
 * @Description: 修改系统主题变量
 */
import { watch } from 'vue'
import store from '../store/index'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'

/**
 * 跟随系统检测主题
 */
let systemTheme
const onSystemThemeChange = () => {
  if (!systemTheme) {
    // ☆☆☆☆☆重点知识点语法☆☆☆☆☆
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    systemTheme.onchange = () => {
      if (store.getters.themeType === THEME_SYSTEM) {
        console.log('我执行了！！！')
        changeTheme(THEME_SYSTEM)
      }
    }
  }
}
/**
 * 变更主题
 * @param {*} theme
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      onSystemThemeChange()
      themeClassName = systemTheme.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      changeTheme(val)
    },
    {
      immediate: true,
    },
  )
}
