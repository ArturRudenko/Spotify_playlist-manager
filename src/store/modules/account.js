import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    userData: null,
  },
  actions: {
    async loginByCode(store, code) {
      const spotifyResponseData = await Vue.prototype.$spotify.token(code)
      Vue.prototype.$cookies.set('access-token', `${spotifyResponseData.data.access_token}`, `${spotifyResponseData.data.expires_in}s`)
      Vue.prototype.$cookies.set('refresh-token', `${spotifyResponseData.data.refresh_token}`, `${spotifyResponseData.data.expires_in}s`)
      if (spotifyResponseData) {
        return true
      } else throw new Error('No request from server')
    },
    async getAccountData(store) {
      const accountDataResponse = await Vue.prototype.$spotify.me().catch(error => console.log(error.response))
      const accountData = accountDataResponse.data
      store.state.userData = accountData
      return accountData
    }
  },
  getters: {
    user(state) {
      return  state.userData
    },
    accessToken() {
      return Vue.prototype.$cookies.get('access-token')
    }
  }
}
