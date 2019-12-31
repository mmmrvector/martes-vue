const state = {
  accessToken: '',
  user: {}
}

const mutations = {
  ADD_USER (state, user) {
    state.user = user
  },
  REMOVE_USER (state) {
    state.user = {}
  },
  ADD_TOKEN (state, token) {
    state.accessToken = token
  },
  REMOVE_TOKEN (state, token) {
    state.accessToken = ''
  }
}

const actions = {
  // some async task
}

export default {
  state,
  mutations,
  actions
}
