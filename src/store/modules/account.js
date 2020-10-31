import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    async loginByCode(store, code) {
      const spotifyResponseData = await Vue.prototype.$spotify.token(code)
      Vue.prototype.$cookies.set('access-token', `${spotifyResponseData.data.access_token}`, '60m')
      Vue.prototype.$cookies.set('refresh-token', `${spotifyResponseData.data.refresh_token}`, '60m')
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
    async getPlaylists(store) {
      return await Vue.prototype.$spotify.playlists(store.state.user.id)
    },
    async getPlaylist(store, playlistId) {
      console.log(playlistId)
      return await Vue.prototype.$spotify.playlist(playlistId)
    },
    async getTracks(store, playlistId) {
      return await Vue.prototype.$spotify.tracks(playlistId)
    }
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
