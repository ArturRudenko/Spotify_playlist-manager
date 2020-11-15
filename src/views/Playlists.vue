<template>
  <div class="playlists">
    <modal v-model="modalIsOpen">
      <new-playlist-form @create="createNewPlaylist" />
    </modal>
    <div class="playlists__content">
      <h1 class="playlists__title">Your playlists</h1>
      <button @click="changeModalStatus" class="playlists__btn-create">Create new playlist</button>
      <br>
      <button @click="$router.push({ name: 'search' })" class="playlists__btn-search">Search</button>
      <div class="playlists__items">
        <playlist-comp v-for="playlist in playlists"
                       :key="playlist.id"
                       :playlist="playlist"
                       @click.native="$router.push({ name: 'playlist.page', params: { playlist_id: playlist.id } })"/>
      </div>
      <div class="playlists__pagination">
        <ui-tab-bar v-model="activePageTab"
                    @input="updatePlaylists">
          <ui-tab v-for="(pageTab,index) in pagesQuantity"
                  :key="index"
                  :value="index + 1">
                  {{ index + 1 }}
          </ui-tab>
        </ui-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistComp from '@/components/PlaylistComp'
import NewPlaylistForm from '@/components/NewPlaylistForm'
import Modal from '@/components/Modal'
import UiTab from '@/components/UiTab'
import UiTabBar from '@/components/UiTabBar'
import {mapActions} from 'vuex'

export default {
  name: 'Playlists',
  components: {
    PlaylistComp,
    Modal,
    NewPlaylistForm,
    UiTab,
    UiTabBar
  },
  data: function () {
    return {
      modalIsOpen: false,
      playlists: [],
      activePageTab: 1,
      playlistsLimit: 20,
      playlistsOffset: 0,
      totalPlaylistsQuantity: 0
    }
  },
  methods: {
    ...mapActions('account', ['getAccountData', 'getPlaylists', 'createPlaylist']),
    changeModalStatus() {
      this.modalIsOpen = !this.modalIsOpen
    },
    async createNewPlaylist(newPlaylistData) {
      this.changeModalStatus()
      await this.createPlaylist(newPlaylistData.title, newPlaylistData.isPrivate)
          .then(res => console.log(res))
    },
    async updatePlaylists(value) {
      let currentOffset = this.playlistsLimit * (value - 1)

      currentOffset > 0
        ? this.playlistsOffset = currentOffset
        : this.playlistsOffset = 0

      await this.getPlaylists({limit: this.playlistsLimit, offset: this.playlistsOffset})
        .then(response => {
          console.log(response)
          this.playlists = response.data.items
        })
    }
  },
  computed: {
    pagesQuantity() {
      return Math.ceil(this.totalPlaylistsQuantity / this.playlistsLimit )
    }
  },
  async created() {
    await this.getAccountData()
        .then(response => console.log(response))
    await this.getPlaylists({limit: this.playlistsLimit, offset: this.playlistsOffset})
        .then(response => {
          console.log(response)
          this.playlists = response.data.items
          this.totalPlaylistsQuantity = response.data.total
        })
  }
}
</script>

<style lang="scss">
.playlists {
  padding-bottom: 40px;
  &__content {
    max-width: 1170px;
    margin: 0 auto;
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 50px;
  }
  &__title {
    margin-top: 50px;
    font-size: 2.5em;
    font-weight: 600;
  }
  [class^="playlists__btn"] {
    margin-top: 15px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.3em;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    transition: color .3s;
    &:hover{
      color: darken(#fff, 20%);
    }
    &:first-of-type{
      margin-top: 40px;
    }
  }
}
</style>