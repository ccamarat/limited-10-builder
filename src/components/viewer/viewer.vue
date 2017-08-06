<template>
    <div class="container">
      <product-image v-for="product in products" :key="product.product_id" :product="product"></product-image>
    </div>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
</style>

<script>
  import ProductImage from './product-image.vue';

  export default {
    components: {
      ProductImage
    },

    props: {
      products: Array
    }
  };
</script>
