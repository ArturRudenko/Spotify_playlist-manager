import Vue from 'vue'
import Vuex from 'vuex'
import account from "./modules/account"
import playlist from "./modules/playlist"
import playback from "./modules/playback"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    playlist,
    playback
  }
})