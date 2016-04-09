<template>
  <div id="app" class="grid__item">
    <collection :model="collection"></collection>
    <product-list :products="products"></product-list>
    <quantity-selector :store="store.state"></quantity-selector>
    <buy-button :store="store"></buy-button>
  </div>
</template>

<script type="text/babel">
  import config from './config';
  import DataStore from './data-store';
  import watchWindowSize from './tools/window-size-monitor';
  import collection from './components/collection'
  import productList from './components/product-list'
  import quantitySelector from './components/quantity-selector';
  import buyButton from './components/buy-button';

  export default {
    components: {
      collection,
      productList,
      quantitySelector,
      buyButton
    },

    init () {
      this.store = new DataStore(config);
      watchWindowSize(this.store);
      this.store.init();
    },

    data () {
      return {
        store: this.store,
        collection: this.store.state.collection,
        products: this.store.state.products
      }
    }
  }

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
