<template>
  <div v-if="product !== null"
       class="variant-list-container"
       :class="{'has-children': hasChildren(product)}"
  >
    <div class="product-title">
      {{ product.title }}
    </div>

    <ul v-if="hasChildren(product)">
      <li v-if="isVisible(v)" class="variant-item" v-for="v in product.variations">
        <variant-list v-if="hasChildren(v)" :product="v"></variant-list>
        <option-list v-if="hasOptions(v)" :options="v.options" :product="v"></option-list>
      </li>
    </ul>

    <option-list v-if="hasOptions(product)" :options="product.options" :product="product"
                 :hide-title="true"></option-list>
  </div>
</template>

<style lang="scss" scoped>
  @import "./variables";

  .variant-list-container {
    background: $color-primary-background;
    border: 1px solid $color-primary-dark;
    min-width: 400px;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);

    &.has-children {
      background: #e1e2e1;
    }

    // Override "timber" style
    > ul {
      margin: 0;
    }
  }

  .product-title {
    background: $color-primary-light;
    font-size: 1.25rem;
    border-bottom: 1px solid $color-primary-dark;
    padding: 10px;
  }

  .variant-item {
    margin: 5px;
    min-height: 40px;
    align-items: center;
    display: flex;
    background: #F5F5F6;
  }
</style>

<script>
  import { mapState } from 'vuex';
  import OptionList from './OptionList.vue';
  import VariantList from './VariantList';

  export default {
    name: 'variant-mixer',

    components: {
      VariantList,
      OptionList
    },

    computed: {
      ...mapState({
        product: (state) => state.visibility.activeProduct
      })
    },

    methods: {
      isVisible (product) {
        return !product.config.hidden;
      },
      hasChildren (variation) {
        return variation.variations.length > 0;
      },
      hasOptions (variation) {
        return variation.options.length > 0;
      }
    }
  };
</script>

<style scoped>

</style>
