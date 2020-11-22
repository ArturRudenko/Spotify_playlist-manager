import Vue from 'vue'

export default {
  namespaced: true,
  actions: {
    async getPlaylists({ rootState }, queryObj) {
      return await Vue.prototype.$spotify.playlists(rootState.account.user.id, queryObj)
    },
    async createPlaylist({ rootState }, playlistName, playlistIsPublic) {
      return await Vue.prototype.$spotify.createPlaylist(rootState.account.user.id, playlistName, playlistIsPublic)
    },
    async getPlaylist (store, playlistId) {
      return await Vue.prototype.$spotify.playlist(playlistId)
    },
    async getTracks (store, playlistId) {
      return await Vue.prototype.$spotify.tracks(playlistId)
    },
    async addTrack ({ rootState }, queryObj) {
      return await Vue.prototype.$spotify.addTrackToPlaylist(rootState.account.user.id, queryObj)
    },
    async removeTrack ({ rootState }, queryObj) {
      return await Vue.prototype.$spotify.removeTrackFromPlaylist(rootState.account.user.id, queryObj)
    },
    async search (store, queryObj) {
      return await Vue.prototype.$spotify.search(queryObj)
    },
  }
}