<template>
  <div class="search">
    <modal v-model="showModal">
      <div class="users-playlists">
        <p class="users-playlists__title">Choose playlist</p>
        <ul class="users-playlists__list">
          <li
            class="users-playlists__item"
            v-for="playlist of playlists"
            :key="playlist.id"
            @click="confirmPlaylist(playlist.id)"
          >- {{ playlist.name }}</li>
        </ul>
      </div>
    </modal>
    <div class="search__content">
      <div class="search__input-wrapper">
        <input 
          class="search__input"
          @keyup.enter="searchTracks"
          v-model="query"
          placeholder="Search"
        >
      </div>
      <p
        class="search__placeholder"
        v-if="!totalTracksQuantity"
      >Search found nothing</p>
      <div
        class="search__output"
        v-else
      >
        <Track 
          v-for="(track, index) in tracks.items"
          :key="track.id"
          :track-id="track.id"
          :current-track-id="currentTrack ? currentTrack.item.id : ''"
          :is-playing="currentTrack ? currentTrack.is_playing : false"
          :track-name="track.name"
          :artist-name="track.artists[0].name"
          :album-name="track.album.name"
          :track-duration="track.duration_ms"
          :num="index + 1"
          changeable
          addable
          @add="onAdd"
          @play="play"
          @pause="pause"
        />
      </div>
    </div>
    <pagination
      v-show="totalTracksQuantity"
      :items-quantity="totalTracksQuantity"
      :limit="queryLimit"
      :max-pages="maxPages"
      @change="searchTracks"
    />
  </div>
</template>

<script>
import Track from '@/components/Track'
import Pagination from '@/components/Pagination'
import Modal from '@/components/Modal'
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Search',
  components: {
    Track,
    Modal,
    Pagination
  },
  data: function () {
    return {
      showModal: false,
      query: '',
      tracks: [],
      trackToAdd: null,
      playlists: [],
      maxPages: 5,
      queryLimit: 20,
      queryOffset: 0,
      totalTracksQuantity: 0
    }
  },
  methods: {
    ...mapActions('playlist', ['search', 'addTrack', 'getPlaylists']),
    ...mapActions('playback', ['startPlayback', 'pausePlayback']),
    ...mapMutations('playback', ['SET_URIS']),
    async searchTracks (value) {
      value && value > 0
        ? this.queryOffset = this.queryLimit * (value - 1)
        : this.queryOffset

      const queryObj = {
        query: this.query,
        limit: this.queryLimit,
        offset: this.queryOffset
      }

      await this.search(queryObj)
        .then(res => {
          this.tracks = res.data.tracks
          this.totalTracksQuantity = res.data.tracks.total
        })
        .then(() => {
          this.SET_URIS(this.tracks.items.map(item => item.uri))
        })
    },
    async confirmPlaylist (id) {
      await this.addTrack({
        playlistId: id,
        trackId: this.trackToAdd
      })
        .then(res => console.log(res))

      this.showModal = false
      this.trackToAdd = null
    },
    async onAdd (id) {
      this.showModal = true
      this.trackToAdd = id

      await this.getPlaylists()
          .then(res => this.playlists = res.data.items)
    },
    async play (trackId) {
      await this.startPlayback({
        deviceId: this.$cookies.get('active-device'),
        uris: this.uris,
        trackId,
        position_ms: this.progress
      })
    },
    async pause () {
      await this.pausePlayback()
    }
  },
  computed: {
    ...mapState({
      currentTrack: state => state.playback.currentTrack,
      uris: state => state.playback.uris,
      progress: state => state.playback.progress
    })
  }
}
</script>

<style lang="scss">
.search{
  width: 1170px;
  margin: 0 auto;
  padding-bottom: 35px;
  &__placeholder {
    font-size: 2em;
    line-height: 2em;
  }
  &__input-wrapper {
    margin-bottom: 25px;
  }
  &__input{
    width: 300px;
    padding: 10px;
    font-size: 1em;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 8px;
    background: #fff;
  }
}
.users-playlists {
  &__title {
    font-size: 2em;
    margin-bottom: 25px;
  }
  &__item {
    cursor: pointer;
    font-size: 1.3em;
    line-height: 1em;
    margin-bottom: 20px;
    transition: color .3s;
    &:hover {
      color: darken(#fff, 50%)
    }
  }
}
</style>