<template>
  <div />
</template>

<script>

export default {
  data: function () {
    return {
      data: '',
    }
  },
  created() {
    window.location=this.$spotify.prepLoginUrl();
  },
}
</script>