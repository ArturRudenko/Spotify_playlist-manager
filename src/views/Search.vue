<template>
  <div class="search">
    <div class="search__content">
      <div class="search__input-wrapper">
        <input @keyup.enter="startSearch" v-model="query" class="search__input" type="text" placeholder="Search">
      </div>
      <div class="search__output">
        {{ searchResponse }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  data: function () {
    return {
      query: '',
      searchResponse: null,
    }
  },
  methods: {
    ...mapActions('playlist', ['search']),
    async startSearch() {
      await this.search(this.query)
          .then(res => {
            console.log(res)
            this.searchResponse = res.data
          })
      this.query = '';
    }
  },
}
</script>

<style lang="scss">
.search{
  width: 1170px;
  margin: 0 auto;
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