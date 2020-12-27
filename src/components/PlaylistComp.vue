<template>
  <div class="playlists__item playlist">
    <div
      class="playlist__img"
      v-if="playlist.images && playlist.images[0]"
    >
      <img
        :src="playlist.images[0].url"
        alt="Playlist photo"
      >
    </div>
    <div 
      class="playlist__img--placeholder"
      v-else
    >
      <folder-icon />
    </div>
    <h3 class="playlist__title">{{ playlist.name }}</h3>
  </div>
</template>

<script>
import FolderIcon from '@/components/icons/FolderIcon'

export default {
  name: 'PlaylistComp',
  props: {
    playlist: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  components: {
    FolderIcon
  },
}
</script>

<style lang="scss">
.playlist{
  display: flex;
  flex-direction: column;
  width: 23%;
  min-height: 315px;
  padding: 15px 15px 25px 15px;
  margin-right: 31px;
  margin-bottom: 30px;
  background: lighten(#171717, 2%);
  transition: background .4s;
  cursor: pointer;
  &:nth-child(4n){
    margin-right: 0;
  }
  &:hover{
    background: lighten(#171717, 12%);
  }
  &__img{
    width: 240px;
    height: 240px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__img--placeholder{
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__title{
    margin-top: auto;
    font-weight: 600;
  }
}
</style>
