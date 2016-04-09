<template>
  <span class="grid-link__image grid-link__image--product">
    <span class="grid-link__image-centered">
      <img :src="selectedVariantImage"/>
    </span>
  </span>
</template>

<script type="text/babel">
  const DEFAULT_THUMBNAIL = 'https://raw.githubusercontent.com/ccamarat/limited-10-builder/gh-pages/static/404.png';
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
</style>
