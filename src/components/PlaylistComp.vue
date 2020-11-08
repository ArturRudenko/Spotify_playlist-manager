<template>
  <div class="playlists__item playlist">
    <div v-if="playlist.images && playlist.images[0]" class="playlist__img">
      <img :src="playlist.images[0].url" alt="Playlist photo">
    </div>
    <div v-else class="playlist__img--placeholder">
      <folder-icon />
    </div>
    <h3 class="playlist__title">{{ playlist.name }}</h3>
  </div>
</template>

<script>
import FolderIcon from '@/components/FolderIcon'

export default {
  name: 'PlaylistComp',
  props: {
    playlist: Object,
  },
  components: {
    FolderIcon
  },
}
</script>

<style lang="scss">
.playlist{
  width: 23%;
  padding: 15px 15px 25px 15px;
  margin-right: 31px;
  margin-bottom: 30px;
  background: rgba(18, 30, 61,.5);
  transition: background .3s;
  cursor: pointer;
  &:nth-child(4n){
    margin-right: 0;
  }
  &:hover{
    background: lighten(rgba(18, 30, 61,1), 5%);
  }
  &__img{
    img{
      width: 100%;
      height: 100%;
    }
  }
  &__img--placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__title{
    margin-top: 10px;
    font-weight: 600;
  }
}
</style>
