<template>
  <div>
    <p v-if="isError">We have some problems...</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import urlParamsCompiler from "@/utils/urlParams-compiler";

export default {
  name: 'Callback',
  data: function () {
    return {
      isError: false
    }
  },
  methods: {
    ...mapActions('account', ['loginByCode']),
  },
  async created() {
    const parsedUrl = urlParamsCompiler.parseGetParams(window.location.search.slice(1))

    if (parsedUrl.error) {
      console.error(parsedUrl.error);
      this.isError = true
      return
    }

      if(await this.loginByCode({ code: parsedUrl.code })) await this.$router.push({name: 'playlists'})
    }
  }
</script>
