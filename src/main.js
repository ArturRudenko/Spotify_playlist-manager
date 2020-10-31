import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router/router'
import spotify from "@/plugins/spotify";
import VueCookies from 'vue-cookies'
import '@/assets/styles/style.scss'

Vue.use(spotify, store, router)
Vue.use(VueCookies)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
