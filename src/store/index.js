import Vue from 'vue'
import Vuex from 'vuex'
import account from "@/store/modules/account";
import playlist from "@/store/modules/playlist";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    playlist
  }
})