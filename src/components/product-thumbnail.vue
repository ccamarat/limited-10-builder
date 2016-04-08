<template>
  <div>
    <img class="product-preview" :src="selectedVariantImage" />
  </div>
</template>

<script type="text/babel">
  const DEFAULT_THUMBNAIL = '/static/404.png';
  export default {
    props: {
      product: Object
    },

    computed: {
      selectedVariantImage () {
        if (!this.product.images || this.product.images.length === 0) {
          return DEFAULT_THUMBNAIL;
        }
        const selectedVariantId = this.product.getSelectedVariantId();
        const img = this.product.images.find(image => image.variant_ids.find(variantId => variantId === selectedVariantId));
        return img ? img.src : DEFAULT_THUMBNAIL;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .product-preview {
    max-width: 200px;
  }
</style>
