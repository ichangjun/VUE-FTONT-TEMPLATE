/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-08 10:29:05
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 20:32:25
 * @FilePath: /vue-front-template/src/store/modules/category.js
 * @Description: 搜索记录
 */
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      historys: [
        {
          text: '',
          time: new Date().getTime(),
        },
      ], // 搜索历史
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
      const isHave = state.historys.findIndex((item) => item.text === history)
      if (isHave > -1) {
        state.historys.splice(isHave, 1)
      }
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
  },
}
