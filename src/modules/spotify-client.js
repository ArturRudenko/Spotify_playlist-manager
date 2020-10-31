import urlParamsCompiler from "@/utils/urlParams-compiler";

export default class SpotifyClient {
  constructor(httpClient, configs) {
    if (!configs.host || !configs.clientId || !configs.appSecretCode || !configs.accountsUrl || !configs.redirectRoute) throw new Error('invalid configs')

    this.configs = configs;
    this.setHttpClient(httpClient);
  }

  setHttpClient(httpClient) {
    if (!httpClient) throw new Error('http is not defined')

    httpClient.defaults.baseURL = this.configs.host;
    httpClient.defaults.mode = 'cors';
    httpClient.defaults.headers.common['Accept'] = 'application/json';
    this.httpClient = httpClient;
  }

  prepScopes() {
    return ['ugc-image-upload', 'user-read-recently-played', 'user-read-playback-position', 'user-top-read', 'playlist-modify-private', 'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-public', 'streaming', 'app-remote-control', 'user-read-email', 'user-read-private', 'user-follow-read', 'user-follow-modify', 'user-library-modify', 'user-library-read', 'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state'].join(' ')
  }

  prepLoginUrl() {
    const params = {
      response_type: 'code',
      client_id: this.configs.clientId,
      scope: encodeURIComponent(this.prepScopes()),
      redirect_uri: encodeURIComponent(this.configs.redirectRoute)
    };

    return `${this.configs.accountsUrl}/authorize?${urlParamsCompiler.prepareGetParams(params)}`
  }

  basicAuthProperty() {
    return btoa(`${this.configs.clientId}:${this.configs.appSecretCode}`)
  }

  setDefaultAuthorizationHeader(accessToken) {
    this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  async me() {
    return this.httpClient.get('/v1/me')
  }

  async playlists(userId) {
    return this.httpClient.get(`/v1/users/${userId}/playlists`)
  }

  async playlist(playlistId) {
    return this.httpClient.get(`/v1/playlists/${playlistId}`)
  }

  async tracks(playlistId) {
    return this.httpClient.get(`/v1/playlists/${playlistId}/tracks`)
  }

  async token({ code }) {
    const form = new URLSearchParams();
    form.append('grant_type', 'authorization_code')
    form.append('code', code)
    form.append('redirect_uri', this.configs.redirectRoute)

    const headers = {
        'Authorization': 'Basic ' + this.basicAuthProperty(),
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.httpClient.post(this.configs.accountsUrl+'/api/token', form, {
      headers: headers,
    })
  }
}
