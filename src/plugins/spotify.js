import spotifyClient from "@/modules/spotify-client";
import VueCookies from 'vue-cookies'
import axios from 'axios'

const install = function (Vue) {
  const spotify = new spotifyClient(axios, {
    host: process.env.VUE_APP_SPOTIFY_HOST,
    accountsUrl: process.env.VUE_APP_SPOTIFY_ACCOUNTS_URL,
    clientId: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
    appSecretCode: process.env.VUE_APP_SPOTIFY_SECRET_CODE,
    redirectRoute: `${location.origin}/callback/login`
  })
  Vue.prototype.$spotify = spotify;
  const accessToken = VueCookies.get('access-token');
  spotify.setDefaultAuthorizationHeader(accessToken);
}

export default {install}
