<template>
  <div class="product">
    <h3>{{ product.title }}</h3>
    <p v-html="product.body_html"></p>
    <product-thumbnail :product="product"></product-thumbnail>
    <product-options v-for="option in product.options" :option="option"></product-options>
    Selected Variant: {{ selectedVariantId }}
  </div>
</template>

<script type="text/babel">
  import productOptions from './product-options';
  import productThumbnail from './product-thumbnail';

  export default {
    props: {
      product: Object
    },

    components: {
      productOptions,
      productThumbnail
    },

    computed: {
      selectedVariantId () {
        return this.product.getSelectedVariantId();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .product {
    display: inline-block;
    width: 30%;
    border: 1px solid black;
  }
</style>
