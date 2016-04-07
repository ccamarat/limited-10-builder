<template>
  <div class="product-list">
    <product v-for="product in products" :product="product"></product>
  </div>
</template>

<script>
  import product from './product';

  export default {
    props: {
      products: Array
    },

    components: {
      product
    },

    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  $color: 'red';
  .product-list {
    color: $color;
  }
</style>
