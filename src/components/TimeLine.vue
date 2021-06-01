<template>
  <div class="time-line">
    <p>{{ currentProgress | durationFilter }}</p>
    <div class="time-line__bar">
      <div
        :style="{width: width + '%'}"
        class="time-line__indicator"
      />
    </div>
    <p>{{ duration | durationFilter }}</p>
  </div>
</template>

<script>
import durationFilter from '@/utils/durationFilter'

export default {
  name: 'TimeLine',
  props: {
    duration: {
      type: Number,
      default: 0
    },
    currentProgress: {
      type: Number,
      default: 0
    },
  },
  filters: { durationFilter },
  computed: {
    width () {
      return this.currentProgress * 100 / this.duration
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line{
  display: flex;
  align-items: center;
  &__bar {
    width: 30vw;
    height: 5px;
    margin: 0 20px;
    border-radius: 4px;
    background: #121212;
  }
  &__indicator {
    height: 100%;
    border-radius: 4px;
    background: #f8f8f8;
  }
}
</style>