<template>
  <div class="custom-product grid__item medium--one-third post-large--one-third">
    <product-thumbnail :product="product"></product-thumbnail>
    <p class="grid-link__title">{{ product.title }}</p>
    <p v-html="product.body_html"></p>
    <product-options v-for="option in product.options" :option="option"></product-options>
    <p class="grid-link__meta">
      Cost: {{ selectedVariant.price }}
    </p>
  </div>
</template>

<script>
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
      selectedVariant () {
        return this.product.getSelectedVariant();
      }
    }
  }
</script>

<style lang="scss">
  .custom-product {

  }
</style>
