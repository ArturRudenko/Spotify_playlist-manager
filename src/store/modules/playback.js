import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    currentTrack: null
  },
  actions: {
    async startPlayback (store, queryObj) {
      return await Vue.prototype.$spotify.startPlayback(queryObj)
    },
    async pausePlayback () {
      return await Vue.prototype.$spotify.pausePlayback()
    },
    async nextTrack () {
      return await Vue.prototype.$spotify.nextTrack()
    },
    async prevTrack () {
      return await Vue.prototype.$spotify.prevTrack()
    },
    async repeatTrack (store, query) {
      return await Vue.prototype.$spotify.repeatTrack(query)
    },
    async getPlayback (store) {
        const currentPlayback = await Vue.prototype.$spotify.getCurrentPlayback()
        store.state.currentTrack = currentPlayback.data

        return currentPlayback
    }
  }
}