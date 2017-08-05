<template>
  <div id="app" class="grid__item">
    <collection :model="collection"></collection>
    <product-list :products="products"></product-list>
    <quantity-selector :store="store.state"></quantity-selector>
    <div>
      <collection-price :store="store"></collection-price>
      <buy-button :store="store"></buy-button>
    </div>
  </div>
</template>

<script>
  import collection from './components/collection';
  import productList from './components/product-list';
  import quantitySelector from './components/quantity-selector';
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
      collection,
      productList,
      quantitySelector,
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

<style>
  html, body {
    font-family: Helvetica, sans-serif;
    font-size: 14px;
  }

  #app {
    margin-top: 10px;
  }

</style>
