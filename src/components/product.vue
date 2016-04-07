<template>
  <div class="product">
    <h3>{{ product.title }}</h3>
    <p v-html="product.body_html"></p>
    <product-options v-for="option in product.options" :option="option"></product-options>
    Selected Variant: {{ selectedVariantId }}, img: {{ selectedVariantImage }}
  </div>
</template>

<script type="text/babel">
  import productOptions from './product-options';

  export default {
    props: {
      product: Object
    },

    components: {
      productOptions
    },

    computed: {
      selectedVariantId () {
        const variantName = this.product.options.map(option => option.selected).join(' / ');
        const variant = this.product.variants.find(variant => variant.title === variantName);
        return variant.id;
      },

      selectedVariantImage () {
        if (!this.product.images || this.product.images.length === 0) {
          return '';
        }
        const selectedVariantId = this.selectedVariantId;
        const img = this.product.images.find(image => image.variant_ids.find(variantId => variantId === selectedVariantId));
        return img ? img.src : '';
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
