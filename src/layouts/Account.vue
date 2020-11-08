<template>
  <div class="user-account">
    <header-comp />
    <router-view />
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp";
import {mapActions} from "vuex";

export default {
  name: 'Account',
  components: {
    HeaderComp
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
