<template>
    <span class="price-wrapper">
        <span class="price-label">Total cost:</span>
        <span class="price-value">{{totalPrice}}</span>
    </span>
</template>

<style lang="scss" scoped>
    .price-wrapper {
        font-size: 1.5em;
        margin-right: 20px;
    }

    .price-value {
        font-weight: bold;
    }
</style>

<script>
  export default {
    props: {
      store: Object
    },
    computed: {
      totalPrice () {
        try {
          const selectedVariants = this.store.state.products.map(p => this.$getSelectedVariant(p).price)
          const total = selectedVariants.reduce((t, v) => t + Number(v), 0)
          return `$ ${total.toFixed(2)}`
        } catch (e) {
          return 'Invalid options selected'
        }
      }
    }
  };
</script>
