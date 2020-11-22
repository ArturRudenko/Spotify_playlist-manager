<template>
  <transition name="fade">
    <div class="modal" v-show="value">
      <div @click.self="toggleModal" class="modal__body">
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  watch: {
    value(value) {
      this.show = value
    }
  },
  data: function () {
    return {
      show: this.value
    }
  },
  props: {
    value: Boolean,
  },
  methods: {
    toggleModal: function () {
      this.show = !this.show
      this.$emit('input', this.show)
    }
  }
}
</script>

<style lang="scss">
.modal {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, .5);
  transition: opacity .4s, visibility .4s;

  &__title{
    margin-bottom: 50px;
    text-align: center;
  }

  &__body {
    min-height: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    position: relative;
    overflow-y: auto;
    width: 90vw;
    height: 90vh;
    max-width: 800px;
    max-height: 600px;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(0,0,0,.8);

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      background-color: rgba(0, 0, 0, .3);
      border-radius: 0 0 8px 8px;
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: rgba(0, 0, 0, .3);
      border-radius: 0 0 8px 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: hsla(0,0%,100%,.3);
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>