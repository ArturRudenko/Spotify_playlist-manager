<template>
  <div class="track-list__item track">
    <div class="track__left">
      <p><span class="track__index">{{ num + 1 }}</span>
      <span><span class="track__name">{{ track.track.name }}</span><br>
        <span class="tack__author">{{ track.track.artists[0].name }}</span></span></p>
    </div>
    <div class="track__line"></div>
    <div class="track__right"><span>{{ (track.track.duration_ms/60000).toFixed(2).split('.').join(':') }}</span></div>
  </div>
</template>

<script>
export default {
  name: 'Track',
  props: {
    track: {
      type: Object,
    },
    num: {
        type: Number,
    }
  }
}
</script>

<style lang="scss">
.track{
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, .3);
  padding: 15px;
  margin-bottom: 15px;
  span{
    display: inline-block;
    vertical-align: middle;
  }
  &__right{
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  &__index{
    margin-right: 10px;
    font-size: .9em;
  }
  &__name{
    font-size: 1.2em;
  }
  &__author{
    font-size: 0.95em;
  }
}
</style>