<template>
  <span class="pi">
    <img :src="selectedVariantImage"/>
  </span>
</template>

<style lang="scss">
  .pi {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<script>
  export default {
    props: {
      product: Object
    },

    computed: {
      selectedVariantImage () {
        const DEFAULT_THUMBNAIL = null;

        if (!this.product.images || this.product.images.length === 0) {
          return DEFAULT_THUMBNAIL;
        }

        // If there's only one variant just return the first image.
        if (this.product.variants.length === 1 && this.product.variants[0].option_values.length === 1) {
          return this.product.images[0].src;
        }

        const selectedVariant = this.$getSelectedVariant(this.product);
        if (!selectedVariant) {
          return this.product.images[0].src;
        }

        const selectedVariantId = selectedVariant.id;
        const img = this.product.images.find(image => image.variant_ids.find(variantId => variantId === selectedVariantId));
        return img ? img.src : DEFAULT_THUMBNAIL;
      }
    }
  };
</script>
