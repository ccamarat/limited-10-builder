<template>
  <div>
    <div class="grid-uniform grid-link__container">
      <product-list class="grid__item large--one-fifth medium-down--one-half" :products="products"></product-list>
      <div class="grid__item large--four-fifths medium-down--one-half">Stuff goes here</div>
    </div>

    <div>
      <collection-price :store="store"></collection-price>
      <buy-button :store="store"></buy-button>
    </div>
  </div>
</template>

<script>
  import productList from './components/take-2/product-list';
  import buyButton from './components/buy-button';
  import collectionPrice from './components/collection-price.vue';

  export default {
    name: 'app',
    props: {
      store: {
        type: Object,
        required: true
      }
    },

    components: {
      productList,
      buyButton,
      collectionPrice
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
