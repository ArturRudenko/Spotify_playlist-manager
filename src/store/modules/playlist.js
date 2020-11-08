import Vue from 'vue'

export default {
  namespaced: true,
  actions: {
    async getPlaylist(store, playlistId) {
      return await Vue.prototype.$spotify.playlist(playlistId)
    },
    async getTracks(store, playlistId) {
      return await Vue.prototype.$spotify.tracks(playlistId)
    },
    async search(store, query) {
      return await Vue.prototype.$spotify.search(query)
    },
  }
}