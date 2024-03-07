import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    return {
      themeType: THEME_LIGHT,
    }
  },
  mutations: {
    setThemeType(state, themeType) {
      state.themeType = themeType
    },
  },
  actions: {
    useSetThemeType({ commit }, themeType) {
      commit('setThemeType', themeType)
    },
  },
}
