<template>
  <div :class="['ui-tab-bar', {'ui-tab-bar--block-behaviour': blockBehaviour}]">
    <div class="ui-tab-bar__tabs">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiTabBar',
  props: {
    value: {},
    blockBehaviour: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value () {
      this.activeTab = this.value
    }
  },
  data: () => ({
    activeTab: null
  }),
  provide: function () {
    return {
      getActiveTab: this.getActiveTab,
      setActiveTab: this.setActiveTab
    }
  },
  created () {
    this.activeTab = this.value
  },
  methods: {
    getActiveTab () {
      return this.activeTab
    },
    setActiveTab (value) {
      if(value) this.activeTab = value
      this.$emit('input', this.activeTab)
    }
  }
}
</script>

<style scoped lang="scss">
.ui-tab-bar {
  display: inline-flex;
  border-bottom: 1px solid darken(#999, 35%);
  &--block-behaviour {
    display: flex;
  }
  &__tabs {
    display: flex;
    flex: 1;
  }
}
</style>