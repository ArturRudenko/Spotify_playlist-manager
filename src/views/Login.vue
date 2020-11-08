<template>
  <div />
</template>

<script>

export default {
  name: 'Login',
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