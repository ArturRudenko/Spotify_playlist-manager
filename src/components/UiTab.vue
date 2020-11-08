<template>
  <div @click="setActive"
    :class="['ui-tab', {'ui-tab--active': isActive, 'ui-tab--disabled': disabled}]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiTabBarTab',
  props: {
    value: {
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    active: true
  }),
  inject: ['getActiveTab', 'setActiveTab'],
  computed: {
    isActive () {
      return this.getActiveTab() === this.value
    }
  },
  methods: {
    setActive () {
      if (!this.disabled) this.setActiveTab(this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.ui-tab {
  padding: 3px 15px;
  margin-bottom: -1px;
  display: flex;
  justify-content: center;
  color: darken(#999, 35%);
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: color .3s ease-out, border-color .3s ease-out;
  &:hover {
    color: inherit;
  }
  &--active {
    color: inherit;
    font-size: 1.1em;
    border-color: inherit;
  }

  &--disabled {
    opacity: .3;
  }
}
</style>