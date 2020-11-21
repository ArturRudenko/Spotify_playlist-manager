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
    </div>
    <pagination
        v-show="totalTracksQuantity"
        @change="searchTracks"
        :items-quantity="totalTracksQuantity"
        :limit="queryLimit"
        :max-pages="maxPages"
    />
  </div>
</template>

<script>
import Track from '@/components/Track'
import Pagination from '@/components/Pagination'
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  components: {
    Pagination,
    Track
  },
  data: function () {
    return {
      query: '',
      tracks: [],
      maxPages: 5,
      queryLimit: 20,
      queryOffset: 0,
      totalTracksQuantity: 0
    }
  },
  methods: {
    ...mapActions('playlist', ['search']),
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
            console.log(res)
            this.tracks = res.data.tracks
            this.totalTracksQuantity = res.data.tracks.total
          })
    },
    logFunc (value) {
      console.log(value)
    }
  }
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