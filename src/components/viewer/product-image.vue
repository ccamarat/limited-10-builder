<template>
  <span class="pi">
    <img :src="selectedVariantImage"/>
  </span>
</template>

<style lang="scss">
  .pi {
    display: flex;
    width: 200px;
  }

  img {
    min-width: 200px;
    max-height: 200px;
  }
</style>

<script>
  const DEFAULT_THUMBNAIL = 'https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif';

  export default {
    props: {
      product: Object
    },

    computed: {
      selectedVariantImage () {
        if (!this.product.images || this.product.images.length === 0) {
          return DEFAULT_THUMBNAIL;
        }
        const selectedVariant = this.$getSelectedVariant(this.product);
        if (!selectedVariant) {
          return DEFAULT_THUMBNAIL;
        }
        const selectedVariantId = selectedVariant.id;
        const img = this.product.images.find(image => image.variant_ids.find(variantId => variantId === selectedVariantId));
        return img ? img.src : DEFAULT_THUMBNAIL;
      }
    }
  };
</script>
