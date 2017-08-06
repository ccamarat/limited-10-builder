<template>
  <ul>
    <product v-for="product in products" :key="product.product_id" :product="product"></product>
  </ul>
</template>

<style lang="scss" scoped>
</style>

<script>
  import Product from './product.vue';

  export default {
    components: {
      Product
    },

    props: {
      products: Array
    }
  };
</script>
