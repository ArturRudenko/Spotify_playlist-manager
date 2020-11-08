import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    user: null,
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
      store.state.user = accountData
      return accountData
    },
    async getPlaylists(store, obj) {
      return await Vue.prototype.$spotify.playlists(store.state.user.id, obj)
    },
    async createPlaylist(store, playlistName, playlistIsPublic) {
      return await Vue.prototype.$spotify.createPlaylist(store.state.user.id, playlistName, playlistIsPublic)
    },
  },
  getters: {
    getUser(state) {
      return  state.user
    },
    accessToken() {
      return Vue.prototype.$cookies.get('access-token')
    }
  }
}
