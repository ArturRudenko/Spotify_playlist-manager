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
    <TimeLine
      :duration="currentTrack.item.duration_ms"
      :current-progress="progress"
      :is-playing="currentTrack.is_playing"
      class="playback-panel__line"
    />
    <div class="playback-panel__controls">
      <div class="playback-panel__buttons">
        <next-icon
            @click.native="prev"
            class="playback-panel__button playback-panel__button--prev"
        />
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
        <next-icon
          @click.native="next"
          class="playback-panel__button playback-panel__button--next"
        />
        <div class="playback-panel__button playback-panel__button--repeat repeat-btn">
          <repeat-icon @click.native="repeat" />
          <span
            v-show="repeatState !== 'off'"
            class="repeat-btn__indicator"
          >
            <span
              v-show="repeatState === 'track'"
              class="repeat-btn__num"
            >1</span>
          </span>
        </div>
      </div>
    </div>
    <div class="playback-panel__volume" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PlayIcon from '@/components/icons/PlayIcon'
import PauseIcon from '@/components/icons/PauseIcon'
import NextIcon from '@/components/icons/NextIcon'
import RepeatIcon from '@/components/icons/RepeatIcon'
import TimeLine from '@/components/TimeLine'

export default {
  name: 'PlaybackPanel',
  components: {
    PlayIcon,
    PauseIcon,
    NextIcon,
    RepeatIcon,
    TimeLine
  },
  props: {
    currentTrack: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    progress (value) {
      if (value >= this.currentTrack.item.duration_ms) {
        this.setPlayback()
      }
    }
  },
  data () {
    return {
      repeatState: 'off'
    }
  },
  methods: {
    ...mapActions('playback',
        ['startPlayback', 'pausePlayback', 'nextTrack', 'prevTrack', 'repeatTrack', 'setPlayback']
    ),
    async play () {
      let playbackObj = {}

      if (this.uris && this.uris.length > 0) {
        playbackObj = {
          deviceId: this.$cookies.get('active-device'),
          uris: this.uris,
          trackId: this.currentTrack.item.id,
          position_ms: this.progress
        }
      } else {
        playbackObj = {
          deviceId: this.$cookies.get('active-device'),
          playlistId: this.currentTrack.context.uri.split(':').slice(2),
          trackId: this.currentTrack.item.id,
          position_ms: this.progress
        }
      }

      await this.startPlayback(playbackObj)
    },
    async pause () {
      await this.pausePlayback()
    },
    async next () {
      await this.nextTrack()
    },
    async prev () {
      await this.prevTrack()
    },
    async repeat () {
      this.repeatState = this.repeatState === 'off' ? 'context'
          : this.repeatState === 'context' ? 'track' : 'off'
      await this.repeatTrack(this.repeatState)
    }
  },
  computed: {
    ...mapState({
      uris: state => state.playback.uris,
      progress: state => state.playback.progress
    })
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
  &__line {
    margin: 0 auto;
  }
  &__track {
      margin-bottom: 3px;
  }
  &__button {
      min-width: 23px;
    &--prev {
      transform: rotate(180deg);
      margin-right: 20px;
    }
    &--next {
      margin-left: 20px;
    }
    &--repeat {
      margin-left: 20px;
    }
  }
}
.repeat-btn {
  display: inline-block;
  position: relative;
  &__indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(100% - 7px);
    left: calc(100% - 7px);
    width: 15px;
    height: 15px;
    padding: 5px;
    border-radius: 50%;
    background: #f8f8f8;
    color: #373737;
    font-size: 12px;
    user-select: none;
    pointer-events: none;
  }
}
</style>