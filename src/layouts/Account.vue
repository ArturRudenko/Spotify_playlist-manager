<template>
  <div class="account">
    <header-comp />
    <router-view />
    <playback-panel
      v-if="currentTrack"
      :current-track="currentTrack"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import HeaderComp from '@/components/HeaderComp'
import PlaybackPanel from '@/components/PlaybackPanel'

export default {
  name: 'Account',
  components: {
    HeaderComp,
    PlaybackPanel
  },
  computed: {
    ...mapState({ currentTrack: state => state.playback.currentTrack })
  },
  methods: {
    ...mapActions('account', ['getAccountData']),
  },
  async created() {
    this.getAccountData()
        .then(response => console.log(response))
  }
}
</script>

<style lang="scss" scoped>
.account {
  position: relative;
  padding-bottom: 70px;
}
</style>