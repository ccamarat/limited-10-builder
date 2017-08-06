<template>
  <li @click="showThisProduct" :class="{'has-options': hasAvailableOptions}">
    {{product.title}}
    <div v-if="optionsAreVisible" @click.stop>
      <product-options v-for="option in unlinkedOptions"
                       :option="option"
                       :hide-header="unlinkedOptions.length === 1"
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

    &.has-options:after {
      content: '\25B6';
      position: absolute;
      right: 5px;
    }

    > div {
      margin-left: 80%;
      width: 150%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      // Background shouldn't bleed through
      background: $color-white;

      // ppp
      padding: 5px;
      border: 1px solid $color-green;
      border-radius: 5px;
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
      hasAvailableOptions () {
        return !(this.product.variants.length === 1 && this.product.variants[0].option_values.length === 1);
      },

      optionsAreVisible () {
        return this.hasAvailableOptions && this.uiState.visibleProductId === this.product.product_id;
      },

      unlinkedOptions () {
        return this.product.options.filter((option) => {
          return this.$store.linkedOptions.servants.indexOf(option.id) === -1;
        });
      }
    },

    methods: {
      showThisProduct () {
        this.$uiStore.showProduct(this.product);
      }
    }
  };
</script>
