/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-08 10:38:59
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-23 14:56:50
 * @FilePath: /vue-front-template/src/store/getters.js
 * @Description: 取数据
 */
import { isMobileTerminal } from '../utils/flexible'
export default {
  // 分类数据
  categorys: (state) => state.category.categorys,
  // 主题类型
  themeType: (state) => state.theme.themeType,
  // 当前选中的分类
  currentCategory: (state) => state.app.currentCategory,
  // 选中项分类下标
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  // 搜索历史
  historys: (state) => state.history.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 路由跳转方式
  routerType: (state) => {
    // 在pc下，永远为none
    if (!isMobileTerminal) {
      return 'none'
    }
    return state.app.routerType
  },
}
