import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    currentTrack: null,
    uris: null,
    progress: 0,
    lastTrackId: null,
    progressCounter: null
  },
  mutations: {
    SET_URIS (state, uris) {
      state.uris = uris
    },
    SET_CURRENT_TRACK (state, track) {
      state.currentTrack = track
    },
    SET_PROGRESS (state, value) {
      state.progress = value
    },
    SET_LAST_TRACK_ID (state, id) {
      state.lastTrackId = id
    },
    SET_COUNTER (state) {
      state.progressCounter = setInterval(() => {
        state.progress += 1000
      }, 1000)
    },
    REMOVE_COUNTER (state) {
      clearInterval(state.progressCounter)
    }
  },
  actions: {
    async startPlayback ({ dispatch, commit }, queryObj) {
      await Vue.prototype.$spotify.startPlayback(queryObj)
      await dispatch('setPlayback')
        .then(() => commit('SET_COUNTER'))
    },
    async pausePlayback ({ dispatch, commit }) {
      await Vue.prototype.$spotify.pausePlayback()
      await dispatch('setPlayback')
        .then(() => commit('REMOVE_COUNTER'))
    },
    async nextTrack ({ dispatch }) {
      await Vue.prototype.$spotify.nextTrack()
      await dispatch('setPlayback')
    },
    async prevTrack ({ dispatch }) {
      await Vue.prototype.$spotify.prevTrack()
      await dispatch('setPlayback')
    },
    async repeatTrack (store, query) {
      await Vue.prototype.$spotify.repeatTrack(query)
    },
    async setPlayback ({ commit, state }) {
      const track = await Vue.prototype.$spotify.getCurrentPlayback()

      if (track.data.item.id === state.lastTrackId && track.data.progress_ms !== 0) {
        commit('SET_PROGRESS', track.data.progress_ms)
      }
      if (track.data.item.id !== state.lastTrackId) {
        commit('SET_LAST_TRACK_ID', track.data.item.id)
        commit('SET_PROGRESS', 0)
      }

      commit('SET_CURRENT_TRACK', track.data)
    }
  }
}