<template>
  <div class="pagination">
    <button
        class="pagination__item pagination__item--first"
        @click="updateActivePage(1)"
    >&#8676;</button>
    <button
        :class="['pagination__item', {'pagination__item--active': page === activePage}]"
        v-for="(page, index) in pages"
        :key="index"
        @click="updateActivePage(page)"
    >{{ page }}</button>
    <button
        class="pagination__item pagination__item--last"
        @click="updateActivePage(fullPagesQuantity)"
    >&#8677;</button>
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
  methods: {
    updateActivePage (value) {
      value
        ? this.activePage = value
        : this.activePage

      this.$emit('change', this.activePage)
    },
    logFunc (value) {
      console.log(value)
    }
  },
  computed: {
    pages () {
      const minPage = this.activePage - Math.floor(this.maxPages / 2)
      const maxPage = this.activePage + Math.floor(this.maxPages / 2)
      let currentPages = []

      for (let page = minPage; page <= maxPage && page <= this.fullPagesQuantity; page++) {
        if (page > 0) currentPages.push(page)
      }

      return currentPages
    },
    fullPagesQuantity () {
      return Math.ceil(this.itemsQuantity / this.limit)
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
}
.pagination__item {
  cursor: pointer;
  color: #C4C4C4;
  font-size: 1.2em;
  padding:  0 7px 5px 7px;
  outline: none;
  border-bottom: 1px solid #C4C4C4;
  background: transparent;
  transition: color .4s, border-color .4s;
  &--active,
  &:hover{
    color: #FFF;
    border-color: #FFF;
  }
  &--first,
  &--last {
    border-color: transparent;
    font-size: 1.7em;
    vertical-align: sub;
    &:hover {
      border-color: transparent;
    }
  }
}
</style>