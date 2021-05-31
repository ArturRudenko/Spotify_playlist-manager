<template>
  <div class="playlist-page">
    <div class="playlist-page__content">
      <div class="playlist-page__meta playlist-meta">
        <div class="playlist-meta__left">
          <div 
            class="playlist-meta__img"
            v-if="playlistData.images && playlistData.images[0]"
          >
            <img 
              :src="playlistData.images[0].url"
              alt="Playlist photo"
            >
          </div>
          <div v-else class="playlist-meta__img--placeholder">
            <folder-icon />
          </div>
        </div>
        <div class="playlist-meta__right">
          <h1 class="playlist-meta__title">{{ playlistData.name }}</h1>
        </div>
      </div>
      <div class="playlist-page__track-list">
        <Track
          v-for="(track, index) in tracks"
          :key="track.id"
          :track-id="track.id"
          :current-track-id="currentTrack ? currentTrack.item.id : ''"
          :is-playing="currentTrack ? currentTrack.is_playing : false"
          :track-name="track.name"
          :artist-name="track.artists[0].name"
          :album-name="track.album.name"
          :track-duration="track.duration_ms"
          :num="index + 1"
          :index="index"
          changeable
          removable
          @remove="onRemove"
          @play="play"
          @pause="pause"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FolderIcon from '@/components/icons/FolderIcon'
import Track from '@/components/Track'

export default {
  name: 'PlaylistPage',
  data: function () {
    return {
      playlistData: {},
      playlistId: this.$route.params.playlist_id,
      tracks: []
    }
  },
  components: {
    Track,
    FolderIcon
  },
  computed: {
    ...mapState({ currentTrack: state => state.playback.currentTrack })
  },
  methods: {
    ...mapActions('playlist', ['getPlaylist', 'getTracks', 'removeTrack']),
    ...mapActions('playback', ['startPlayback', 'pausePlayback', 'getPlayback']),
    async onRemove (id) {
      await this.removeTrack({
        playlistId: this.playlistId,
        trackId: id
      })

      this.tracks = this.tracks.filter(track => track.id !== id)
    },
    async play (trackId) {
      await this.startPlayback({
        deviceId: this.$cookies.get('active-device'),
        playlistId: this.playlistId,
        trackId,
        position_ms: this.currentTrack ? this.currentTrack.progress_ms : 0
      })
      await this.getPlayback()
    },
    async pause () {
      console.log(this.currentTrack)
      await this.pausePlayback()
      await this.getPlayback()
    }
  },
  async created() {
    await this.getPlaylist(this.playlistId)
      .then(response => this.playlistData = response.data)

    await this.getTracks(this.playlistId)
      .then(response => response.data.items.forEach(item => this.tracks.push(item.track)))
  }
}
</script>

<style lang="scss">
.playlist-page{
  padding-bottom: 70px;
  &__content{
    max-width: 1170px;
    margin: 0 auto;
  }
  .playlist-meta{
    display: flex;
    align-items: flex-end;
    margin-bottom: 35px;
    &__left{
      margin-right: 40px;
    }
    &__title{
      font-size: 3.6em;
      line-height: 1em;
    }
    &__img,
    &__img--placeholder{
      width: 320px;
      height: 320px;
    }
    &__img img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__img--placeholder{
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, .3);
    }
  }
}
</style>
