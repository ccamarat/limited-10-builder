<template>
    <product-list :products="tree" style="display: flex; flex-wrap: wrap;"></product-list>
</template>

<style lang="scss" scoped>
</style>

<script>
  import { mapState } from 'vuex';
  import { ACTIONS } from '../stores/products';
  import ProductList from './ProductList.vue';

  export default {
    components: {
      ProductList
    },

    computed: mapState([
      'tree'
    ]),

    async created () {
      await this.$store.dispatch(ACTIONS.GET_ALL_PRODUCTS);
      // this.$store.dispatch('addDefaultItemsToCart');
    }
  };
</script>
