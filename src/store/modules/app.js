/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-08 10:29:05
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 14:54:44
 * @FilePath: /vue-front-template/src/store/modules/category.js
 * @Description: 业务组件通数据通讯
 */
import { NAV_BAR_ALL_CATEGORY } from '@/constants/index'
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      currentCategory: NAV_BAR_ALL_CATEGORY,
      historys: [
        {
          text: '',
          time: new Date().getTime(),
        },
      ], // 搜索历史
      searchText: '', // 搜索内容
      routerType: 'none', // 路由跳转类型
    }
  },
  mutations: {
    /**
     * 为当前的category赋值。切换选中的分类
     * @param {*} state
     * @param {*} current 数据
     */
    setCurrentCategory(state, current) {
      state.currentCategory = current
    },
    /**
     * 新增
     */
    setHistory(state, history) {
      if (state.historys.includes(history)) return
      state.historys.push({
        text: history,
        time: new Date().getTime(), // 时间戳，用于排序
      })
      state.historys.sort((a, b) => b.time - a.time)
      // 控制搜索历史的数量
      if (state.historys.length > 20) state.historys.pop()
    },

    /**
     * 单个删除
     */
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    /**
     * 全部删除
     */
    deleeAllHistory(state) {
      state.historys = []
    },
    /**
     * 修改搜索文本
     */
    changeSearchText(state, value) {
      state.searchText = value
    },
    /**
     * 修改routerType
     */
    changeRouterType(state, value) {
      state.routerType = value
    },
  },
  actions: {
    /**
     * 切换选中的分类
     */
    async useCurrentCategory(context, current) {
      if (current) {
        console.log('current:', current)
        context.commit('setCurrentCategory', current)
      }
    },
  },
}
