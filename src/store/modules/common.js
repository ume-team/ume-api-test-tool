// initial state
const state = {
  loading: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  toggleLoading (state, {isShowLoading}) {
    state.loading = isShowLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
