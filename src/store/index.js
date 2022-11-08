import { createStore } from 'vuex'

export default createStore({
  state: {
    isShowRocord: true,
    temporaryFile: null
  },
  getters: {
    temporaryFile: state => state.temporaryFile,
  },

  actions: {
    setFILE: (context, data) => {
      console.log(context, data)
      context.commit('SETFILE', data)
    }
  },
  mutations: {
    SETFILE (state, data) {
      state.temporaryFile = data
    }
  },
  modules: {
  }
})
