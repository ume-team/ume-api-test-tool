import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    'token': ''
  },
  getters: {

  },
  mutations: {
    updateToken (state, {token}) {
      state.token = token
    }
  },
  actions: {

  },
  strict: debug
})
