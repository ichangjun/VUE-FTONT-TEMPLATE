/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-20 20:10:43
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-20 20:43:33
 * @FilePath: /vue-front-template/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'
import { message } from '../../libs'

export default {
  namespaced: true,
  state: () => ({
    // 登录之后的 token
    token: '',
    userInfo: {},
  }),
  mutations: {
    /**
     * 保存 token
     */
    setToken(state, newToken) {
      state.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    },
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : '',
      })
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    // 获取用户信息
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      // 欢迎
      message({
        text: `欢迎您 ${
          data.vipLevel ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname : data.nickname
        } `,
        tyoe: 'success',
        duartion: 6000,
      })
    },
    /**
     * 退出登录
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    },
  },
}
