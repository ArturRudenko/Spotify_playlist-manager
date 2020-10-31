<template>
  <div class="playlists">
    <div class="playlists__content">
      <h1 class="playlists__title">Welcome to your playlists</h1>
      <div class="playlists__items">
        <playlist-comp v-for="playlist in playlists.reverse()"
                       :key="playlist.id"
                       :playlist="playlist"
                       @click.native="$router.push({ name: 'playlist.page', params: { playlist_id: playlist.id } })"></playlist-comp>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistComp from '@/components/PlaylistComp'
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions('account', ['getAccountData', 'getPlaylists']),
  },
  components: {
    PlaylistComp,
  },
  data: function () {
    return {
      playlists: [],
    }
  },
  async created() {
    await this.getAccountData()
        .then(response => console.log(response))
        .catch(error => console.log(error.message))
    await this.getPlaylists()
        .then(response => {
          console.log(response)
          this.playlists = response.data.items
        })
  }
}
</script>

<style lang="scss">
.playlists {
  &__content {
    max-width: 1170px;
    margin: 0 auto;
  }

  &__title {
    margin-top: 50px;
    font-size: 2.5em;
    font-weight: 600;
  }

  button {
    margin-top: 25px;
  }
}
</style>

<style lang="scss">
.playlists {
  padding-bottom: 40px;
  &__items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 50px;
  }
}
</style>