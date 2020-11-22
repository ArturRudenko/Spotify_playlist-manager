<template>
  <div class="track-list__item track">
    <div class="track__left">
      <p><span class="track__index">{{ num }}</span>
        <span><span class="track__name">{{ trackName }}</span><br>
          <span class="tack__author">{{ artistName }} - {{ albumName }}</span></span></p>
    </div>
    <div class="track__line" />
    <div class="track__right">
      <span>{{ duration }}</span>
      <div
        class="track__options track-options"
        v-if="changeable"
        @click="showOptions = !showOptions"
      >
        <button class="track-options__btn" />
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
export default {
  name: 'Track',
  props: {
    trackId: {
      type: String,
      required: true
    },
    trackName: {
      type: String,
      default () {
        return ''
      }
    },
    artistName: {
      type: String,
      default () {
        return ''
      }
    },
    albumName: {
      type: String,
      default () {
        return ''
      }
    },
    trackDuration: {
      type: Number
    },
    num: {
        type: Number
    },
    index: {
      type: Number
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
      showOptions: false
    }
  },
  computed: {
    duration () {
      return (this.trackDuration/60000).toFixed(2).split('.').join(':')
    }
  }
}
</script>

<style lang="scss">
.track{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, .3);
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
  &-options {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
    &__btn {
      position: relative;
      background: #fff;
      width: 3px;
      height: 3px;
      border: none;
      outline: none;
      &:before,
      &:after {
        position: absolute;
        content: '';
        background: #fff;
        width: 3px;
        height: 3px;
        left: 0;
      }
      &:before {
        top: -9px;
      }
      &:after {
        bottom: -9px;
      }
    }
    &__list {
        position: absolute;
        top: 115%;
        right: -4px;
        &-item {
          font-size: .9em;
          letter-spacing: .5px;
          width: 180px;
          padding: 8px;
          background: rgba(0, 0, 0, 1);
          transition: background .3s;
          &:hover {
            background: rgba(0, 0, 0, .7);
          }
        }
        &:before {
          position: absolute;
          content: '';
          width: 11px;
          height: 11px;
          top: -6px;
          right: 3px;
          background: #000;
          transform: rotate(45deg);
        }
      }
  }
}
</style>