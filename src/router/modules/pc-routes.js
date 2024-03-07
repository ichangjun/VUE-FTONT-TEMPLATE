/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 19:53:22
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 15:01:56
 * @FilePath: /vue-front-template/src/router/modules/mobile-routes.js
 * @Description: PC端路由表
 */
export default [
  {
    path: '/',
    name: '首页',
    component: () => import('../../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../views/main/index.vue'),
      },
      {
        path: '/profile',
        name: '我的',
        component: () => import('@/views/profile/index.vue'),
      },
    ],
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/main/pins/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue'),
  },
]
