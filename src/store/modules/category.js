/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-08 10:29:05
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-12 14:52:40
 * @FilePath: /vue-front-template/src/store/modules/category.js
 * @Description: 导航栏，处理navigationBar中的数据categorys
 */
import { NAV_BAR_ALL_CATEGORY, DEFAULT_CATEGORY_DATA } from '@/constants/index'
import { getCatetoryList } from '@/api/category'
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [NAV_BAR_ALL_CATEGORY, ...DEFAULT_CATEGORY_DATA],
    }
  },
  mutations: {
    /**
     * 为state中的categorys赋值
     * @param {*} state
     * @param {*} categorys 数据
     */
    setCategorys(state, categorys) {
      state.categorys = [NAV_BAR_ALL_CATEGORY, ...categorys]
    },
  },
  actions: {
    /**
     * 为categorys请求数据
     */
    async useCategoryData(context) {
      const { categorys } = await getCatetoryList()

      if (categorys && categorys.length > 0) {
        context.commit('setCategorys', categorys)
      }
    },
  },
}
