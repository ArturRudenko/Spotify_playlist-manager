<template>
  <div class="pagination">
    <button class="pagination__item" />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    itemsQuantity: {
      type: Number,
      required: true
    },
    maxPages: {
      type: Number,
      default () {
        return 5
      }
    },
    limit: {
        type: Number,
        required: true
    }
  },
  data () {
    return {
      activePage: 1
    }
  },
  computed: {
    pages() {
      let minPage = this.activePage - Math.floor(this.maxPages / 2)
      let maxPage = this.activePage + Math.floor(this.maxPages / 2)

      return Math.ceil(this.itemsQuantity / this.limit )
    }
  },
}
</script>

<style lang="scss" scoped>
</style>