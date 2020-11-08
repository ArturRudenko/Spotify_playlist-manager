<template>
  <div class="new-playlist-from">
    <h2 class="new-playlist-from__title">Write a new playlist's name</h2>
    <input @keyup.enter="submitNewPlaylist" type="text" class="new-playlist-from__input" v-model="newPlaylist.title">
    <br>
    <input type="checkbox" class="new-playlist-from__privacy-check" hidden id="togglePlaylistPrivacy" v-model.lazy="newPlaylist.isPrivate">
    <label class="new-playlist-from__privacy-label" for="togglePlaylistPrivacy">Create a private playlist</label>
  </div>
</template>

<script>
export default {
  name: 'NewPlaylistForm',
  data: function () {
    return {
      newPlaylist: {
        title: '',
        isPrivate: false,
      }
    }
  },
  methods: {
    submitNewPlaylist() {
      if (!this.newPlaylist.title) return
      this.$emit('create', this.newPlaylist)
      this.newPlaylist = {
        title: '',
        isPrivate: false
      }
    },
  }
}
</script>

<style lang="scss">
.new-playlist-from{
  margin-top: 10%;
  &__title{
    font-size: 2.2em;
    line-height: 1em;
    font-weight: 600;
    margin-bottom: 55px;
  }
  &__input{
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
    width: 100%;
    padding: 7px;
    margin-bottom: 50px;
    background: transparent;
    border-bottom: 1px solid rgba(255,255,255,.5);
    font-size: 2em;
    font-weight: 600;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }
  &__privacy-label{
    position: relative;
    font-size: 2em;
    padding-left: 40px;
    cursor: pointer;
    &::before{
      position: absolute;
      content: '';
      top: 3px;
      left: 0;
      width: 27px;
      height: 27px;
      background: #fff url('../assets/img/mark.svg') no-repeat center/cover;
      background-size: 100%;
    }
  }
  &__privacy-check:checked ~ .new-playlist-from__privacy-label::before{
    background-color: #000;
  }
}
</style>