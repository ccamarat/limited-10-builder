<template>
  <li @click="showThisProduct">
    {{product.title}}
    <div v-if="optionsAreVisible" @click.stop>
      <product-options v-for="option in product.options"
                       v-if="!isLinked(option)"
                       :option="option"
                       :key="option.id">
      </product-options>
    </div>
  </li>
</template>

<style lang="scss" scoped>
  @import './styling/variables';
  @import './styling/list-button.scss';

  li {
    @extend %list-button;

    position: relative;

    > div {
      margin-left: 80%;
      width: 150%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      // Background shouldn't bleed through
      background: $color-white;
    }
  }
</style>

<script>
  import ProductOptions from './product-options.vue';

  export default {
    components: {
      ProductOptions
    },

    props: {
      product: Object
    },

    data () {
      return {
        showOptions: false,
        uiState: this.$uiStore.state
      };
    },

    computed: {
      selectedVariantPrice () {
        const variant = this.$getSelectedVariant(this.product);
        return (variant) ? variant.price : 'Unavailable';
      },
      optionsAreVisible () {
        return this.uiState.visibleProductId === this.product.product_id;
      }
    },

    methods: {
      isLinked(option) {
        return this.$store.linkedOptions.servants.indexOf(option.id) > -1;
      },
      showThisProduct () {
        this.$uiStore.showProduct(this.product);
      }
    }
  };
</script>
