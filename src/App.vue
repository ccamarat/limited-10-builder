<template>
  <div>
    <div class="grid-uniform grid-link__container">
      <product-list class="grid__item large--one-fifth medium-down--one-half" :products="products"></product-list>
      <viewer class="grid__item large--four-fifths medium-down--one-half" :products="products"></viewer>
    </div>

    <div>
      <collection-price :store="store"></collection-price>
      <buy-button :store="store"></buy-button>
    </div>
  </div>
</template>

<script>
  import ProductList from './components/product-list/product-list.vue';
  import BuyButton from './components/buy-button.vue';
  import CollectionPrice from './components/collection-price.vue';
  import Viewer from './components/viewer/viewer.vue';

  export default {
    name: 'app',
    props: {
      store: {
        type: Object,
        required: true
      }
    },

    components: {
      ProductList,
      BuyButton,
      CollectionPrice,
      Viewer
    },

    data () {
      return {
        collection: this.store.state.collection,
        products: this.store.state.products
      };
    }
  };
</script>

<style lang="scss" scoped>
</style>
