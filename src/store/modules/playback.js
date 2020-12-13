import Vue from 'vue'

export default {
  namespaced: true,
  sate: {
    currentTrack: null
  },
  actions: {
    async startPlayback (store, queryObj) {
      return await Vue.prototype.$spotify.startPlayback(queryObj)
    },
    async getPlayback (store) {
        const currentPlayback = await Vue.prototype.$spotify.getCurrentPlayback()
        store.state.currentTrack = currentPlayback.data.item

        return currentPlayback
    }
  }
}