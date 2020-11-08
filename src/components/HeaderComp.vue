<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__img"><img src="../assets/img/spotify.png" alt="Spotify logo"></div>
      <div class="header__info user-info">
        <div class="user-info__name">
          <p v-if="getUser">{{ getUser.display_name }}</p>
          <p v-else>Name</p>
        </div>
        <div class="user-info__img">
          <user-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from '@/components/UserIcon'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComp',
  props: {
    data: {
      type: Object
    }
  },
  components: {
    UserIcon
  },
  computed: {
    ...mapGetters('account', ['getUser']),
  }
}
</script>

<style lang="scss">
.header {
  margin-bottom: 20px;
  background: #000;
  font-weight: 600;
  &__wrapper {
    max-width: 1170px;
    padding: 18px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__img{
    width: 140px;
    img{
      width: 100%;
    }
  }
  &__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info__name{
      margin-right: 25px;
    }
    .user-info__img{
      width: 36px;
      img{
        width: 100%;
      }
    }
  }
  &__title {
    font-size: 2.25em;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
</style>