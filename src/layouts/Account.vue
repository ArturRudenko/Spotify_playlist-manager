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
  components: {
    HeaderComp
  },
  methods: {
    ...mapActions('account', ['getAccountData']),
  },
  async created() {
    await this.getAccountData()
        .then(response => console.log(response))
        .catch(error => console.log(error))
  }
}
</script>