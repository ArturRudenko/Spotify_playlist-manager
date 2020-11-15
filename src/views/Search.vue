<template>
  <div class="search">
    <div class="search__content">
      <div class="search__input-wrapper">
        <input 
          class="search__input"
          @keyup.enter="searchTracks"
          v-model="query"
          placeholder="Search"
        >
      </div>
      <div class="search__output">
        <Track 
          v-for="(track, index) in tracks.items"
          :key="track.id"
          :track="track"
          :num="index"
        />
      </div>
      <div class="search__pagination">
        <ui-tab-bar 
          v-model="activePageTab"
          @input="searchTracks"
        >
          <ui-tab 
            v-for="(pageTab,index) in pagination"
            :key="index"
            :value="index + 1"
            >
              {{ index + 1 }}
          </ui-tab>
        </ui-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import UiTab from '@/components/UiTab'
import UiTabBar from '@/components/UiTabBar'
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  components: {
    Track,
    UiTab,
    UiTabBar
  },
  data: function () {
    return {
      query: '',
      tracks: [],
      activePageTab: 1,
      maxPages: 5,
      queryLimit: 20,
      queryOffset: 0,
      totalTracksQuantity: 0
    }
  },
  methods: {
    ...mapActions('playlist', ['search']),
    async searchTracks (value = 1) {
      let currentOffset = this.queryLimit * (value - 1)

      currentOffset > 0
        ? this.queryOffset = currentOffset
        : this.queryOffset = 0

      const queryObj = {
        query: this.query,
        limit: this.queryLimit,
        offset: this.queryOffset
      }

      await this.search(queryObj)
          .then(res => {
            console.log(res)
            this.tracks = res.data.tracks
            this.totalTracksQuantity = res.data.tracks.total
          })
    }
  },
  computed: {
    pagination() {
      return Math.ceil(this.totalTracksQuantity / this.queryLimit )
    }
  },
}
</script>

<style lang="scss">
.search{
  width: 1170px;
  margin: 0 auto;
  padding-bottom: 35px;
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
</style>