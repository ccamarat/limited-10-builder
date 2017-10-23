<template>
    <product-list :products="tree"></product-list>
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

    created () {
      this.$store.dispatch(ACTIONS.GET_ALL_PRODUCTS);
    }
  };
</script>
