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
    async pausePlayback (store, queryObj) {
      return await Vue.prototype.$spotify.pausePlayback(queryObj)
    },
    async getPlayback (store) {
        const currentPlayback = await Vue.prototype.$spotify.getCurrentPlayback()
        store.state.currentTrack = currentPlayback.data

        return currentPlayback
    }
  }
}