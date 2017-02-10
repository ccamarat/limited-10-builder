<template>
  <div class="grid-uniform">
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
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
