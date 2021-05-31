<template>
  <div class="track-list__item track">
    <div class="track__left">
      <p><span class="track__index">{{ num }}</span>
        <span><span class="track__name">{{ trackName }}</span><br>
          <span class="tack__author">{{ artistName }} - {{ albumName }}</span></span></p>
    </div>
    <div class="track__controls">
      <pause-icon
        v-if="isPlaying && currentTrackId && currentTrackId === trackId"
        @click.native="$emit('pause', trackId)"
      />
      <play-icon
        v-else
        @click.native="$emit('play', trackId)"
      />
    </div>
    <div class="track__right">
      <span>{{ duration }}</span>
      <div
        class="track__options track-options"
        v-if="changeable"
        @click="showOptions = !showOptions"
      >
        <options-icon />
        <transition name="fade">
          <ul
            class="track-options__list"
            v-show="showOptions"
          >
            <li
              class="track-options__list-item"
              v-if="addable"
              @click="$emit('add', trackId)"
            >add to playlist</li>
            <li
              class="track-options__list-item"
              v-if="removable"
              @click="$emit('remove', trackId)"
            >remove from playlist</li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import OptionsIcon from '@/components/icons/OptionsIcon'
import PlayIcon from '@/components/icons/PlayIcon'
import PauseIcon from '@/components/icons/PauseIcon'

export default {
  name: 'Track',
  components: {
    OptionsIcon,
    PlayIcon,
    PauseIcon
  },
  props: {
    trackId: {
      type: String,
      required: true
    },
    currentTrackId: {
      type: String,
      default : ''
    },
    trackName: {
      type: String,
      default: ''
    },
    artistName: {
      type: String,
      default: ''
    },
    albumName: {
      type: String,
      default: ''
    },
    trackDuration: {
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    changeable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    removable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showOptions: false,
      duration: 0
    }
  },
  created () {
    let num = (this.trackDuration/60000).toFixed(2).split('.')
    if (num[1] > 60) {
      num[0]++
      num[1] = num[1] - 60
    }
    if (num[1] < 10 && !String(num[1]).startsWith('0')) num[1] = `0${num[1]}`
    this.duration = num.join(':')
  }
}
</script>

<style lang="scss">
.track{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(40 ,40 ,40, .7);
  padding: 15px;
  margin-bottom: 15px;
  span{
    display: inline-block;
    vertical-align: middle;
  }
  &__right{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  &__index{
    margin-right: 10px;
    font-size: .9em;
  }
  &__name{
    font-size: 1.25em;
    letter-spacing: .5px;
  }
  &__author{
    font-size: 0.95em;
  }
  &__controls {
    min-width: 23px;
    margin-left: auto;
    margin-right: 60px;
  }
  &-options {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
    &__list {
        position: absolute;
        top: 115%;
        right: 6px;
        &:before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          top: -7px;
          right: 0;
          border: 7px solid transparent;
          border-top-width: 0;
          border-bottom-color: #000;
        }
        &-item {
          font-size: .9em;
          letter-spacing: .5px;
          width: 180px;
          padding: 8px;
          background: rgba(0, 0, 0, 1);
          transition: background .3s;
          &:hover {
            background: rgba(0, 0, 0, .5);
          }
        }
      }
  }
}
</style>