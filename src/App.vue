<template>
  <div id="app">
    <collection :model="collection"></collection>
    <product-list :products="products"></product-list>
  </div>
</template>

<script type="text/babel">
import collection from './components/collection'
import productList from './components/product-list'
import store from './data-store/shopify';

export default {
  components: {
    collection,
    productList
  },

  data () {
    return {
      collection: store.collection,
      products: store.products
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
