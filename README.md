<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-14 11:28:18
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-21 12:05:38
 * @FilePath: /vue-front-template/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# Vue 中台前端通用脚手架

### 应用项目架构

```
├── src
│   ├── App.vue // 项目根组件，一级路由出口
│   ├── api // 接口请求
│   ├── assets // 静态资源
│   │   ├── icons // svg icon 图标
│   │   ├── images // image 图标。比如:xxx.png
│   │   └── logo.png // logo
│   ├── components // 通用的业务组件。比如：一个组件在多个页面中使用到
│   ├── constants // 常量
│   ├── directives // 自定义指令
│   ├── libs // 通用组件，可用于构建中台物料库或通用组件库
│   ├── main.js // 入口文件
│   ├── permission.js // 页面权限控制中心
│   ├── router // 路由
│   │   ├── index.js // 路由处理中心
│   │   └── modules // 路由模块
│   │       ├── mobile-routes.js // 移动端路由
│   │       └── pc-routes.js // PC 端路由
│   ├── store // 全局状态
│   │   ├── getters.js // 全局状态访问处理
│   │   ├── index.js // 全局状态中心
│   │   └── modules // 状态子模块
│   ├── styles // 全局样式
│   │   └── index.scss // 全局通用的样式处理
│   ├── utils // 工具模块
│   ├── vendor // 外部供应资源。比如：人类行为认证
│   └── views // 页面组件。与 components 的区别在于：此处组件对应路由表，以页面的形式展示
│       └── layout // 用于 PC 端，分割一级路由和二级路由
│           ├── components // 该页面组件下的业务组件
│           └── index.vue // layout 组件
├── tailwind.config.js // wailwind css 配置文件，与 src 平级
└── vite.config.js // vite 配置文件，与 src 平级

```

### 技术点

##### 实现浏览器滚动条自定义样式

tailwind 结合 tailwind-scrollbar 插件

##### GSAP 实现高阶路由动画

GSAP 结合 transition 实现高阶路由动画，主要适用场景为无感进入详情，返回不刷新列表页的场景。

##### vee-validate 实现自定义表单校验

vee-validate 结合自定义校验规则，实现表单校验

##### transtion-router-view 过度动效实现移动端转场过渡动画

###### 转场动画

###### 组件缓存
