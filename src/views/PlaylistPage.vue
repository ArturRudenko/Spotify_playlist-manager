<template>
  <div class="playlist-page">
    <div class="playlist-page__content">
      <div class="playlist-page__meta playlist-meta">
        <div class="playlist-meta__left">
          <div class="playlist-meta__img">
            <img :src="playlistData.images[0].url" alt="Playlist photo">
          </div>
        </div>
        <div class="playlist-meta__right">
          <h1 class="playlist-meta__title">{{ playlistData.name }}</h1>
        </div>
      </div>
      <div class="playlist-page__track-list track-list__items">
        <Track v-for="(track, index) in tracks"
               :key="track.track.id" 
               :track="track"
               :num="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      playlistData: {},
      tracks: [],
    }
  },
  components: {
    Track,
  },
  computed: {
    ...mapActions('account', ['getPlaylist', 'getTracks']),
  },
  async created() {
    await this.$spotify.playlist(this.$route.params.playlist_id)
        .then(response => {
          this.playlistData = response.data
          console.log(this.playlistData)
        })
        .catch(error => console.log(error))
    await this.$spotify.tracks(this.$route.params.playlist_id)
        .then(response => {
          this.tracks = response.data.items
          console.log(this.tracks)
        })
        .catch(error => console.log(error))
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
    &__img{
      width: 320px;
      img{
        width: 100%;
      }
    }
  }
}
</style>