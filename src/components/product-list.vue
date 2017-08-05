<template>
  <div class="grid-uniform">
    <product v-for="product in products" :product="product" :key="product.id"></product>
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
    }
  };
</script>
<style lang="scss">
</style>
