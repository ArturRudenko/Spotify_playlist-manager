<template>
  <div class="playback-panel">
    <div class="playback-panel__meta">
      <div class="playback-panel__img">
        <img
          :src="currentTrack.item.album.images[0].url"
          alt="Album"
          class="playback-panel__img-content"
        >
      </div>
      <div class="playback-panel__text">
        <p class="playback-panel__track">{{ currentTrack.item.name }}</p>
        <p class="playback-panel__author">{{ currentTrack.item.artists[0].name }}</p>
      </div>
    </div>
    <div class="playback-panel__controls">
      <div class="playback-panel__buttons">
        <pause-icon
          v-if="currentTrack.is_playing"
          @click.native="pause"
          class="playback-panel__button"
        />
        <play-icon
          v-else
          @click.native="play"
          class="playback-panel__button"
        />
      </div>
      <div class="playback-panel__timeline" />
    </div>
    <div class="playback-panel__volume" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PlayIcon from '@/components/icons/PlayIcon'
import PauseIcon from '@/components/icons/PauseIcon'

export default {
  name: 'PlaybackPanel',
  components: {
    PlayIcon,
    PauseIcon
  },
  props: {
    currentTrack: {
      type: Object
    },
    created () {
      console.log(this.currentTrack);
    }
  },
  methods: {
    ...mapActions('playback', ['startPlayback', 'pausePlayback', 'getPlayback']),
    async play () {
      await this.startPlayback({
        deviceId: this.$cookies.get('active-device'),
        playlistId: this.currentTrack.context.uri.split(':').slice(2),
        trackId: this.currentTrack.item.id
      })
      await this.getPlayback()
    },
    async pause () {
      await this.pausePlayback()
      await this.getPlayback()
      .then(res => console.log(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.playback-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  padding: 15px;
  background: rgb(55, 55, 55);
  &__img {
    width: 56px;
    height: 56px;
    margin-right: 15px;
    &-content {
      width: 100%;
    }
  }
  &__meta {
    display: flex;
    align-items: center;
  }
  &__track {
      margin-bottom: 3px;
  }
  &__controls {
      margin-right: auto;
      margin-left: 33%;
  }
  &__button {
      min-width: 23px;
  }
}
</style>