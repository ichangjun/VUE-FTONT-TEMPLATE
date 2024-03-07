/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 11:28:18
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 11:50:38
 * @FilePath: /vue-front-template/src/main.js
 * @Description: 工程入口文件
 */
import { createApp } from 'vue'
import './style.css'
import store from './store/index'
import router from './router/index'
import App from './App.vue'
import './styles/index.scss'
import Libs from './libs'
import Directives from './directives'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
// 注册svg图标虚拟地址
import 'virtual:svg-icons-register'
useREM()
useTheme()

createApp(App).use(store).use(router).use(Libs).use(Directives).mount('#app')
