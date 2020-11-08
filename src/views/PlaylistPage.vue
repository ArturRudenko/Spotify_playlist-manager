<template>
  <div class="playlist-page">
    <div class="playlist-page__content">
      <div class="playlist-page__meta playlist-meta">
        <div class="playlist-meta__left">
          <div v-if="playlistData.images && playlistData.images[0]" class="playlist-meta__img">
            <img :src="playlistData.images[0].url" alt="Playlist photo">
          </div>
          <div v-else class="playlist-meta__img--placeholder">
            <folder-icon />
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
import FolderIcon from '@/components/FolderIcon'
import Track from '@/components/Track'
import { mapActions } from 'vuex'

export default {
  name: 'PlaylistPage',
  data: function () {
    return {
      playlistData: {},
      tracks: [],
      playlistId: this.$route.params.playlist_id,
    }
  },
  components: {
    Track,
    FolderIcon,
  },
  async created() {
    this.getPlaylist(this.playlistId)
      .then(response => {
        this.playlistData = response.data;
      })

    this.getTracks(this.playlistId)
      .then(response => {
        this.tracks = response.data.items
      })
  },
  methods: {
    ...mapActions('playlist', ['getPlaylist', 'getTracks'])
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
