<template>
  <ul>
    <li class="product-item" :class="{selected: p === activeProduct}" v-for="p in products" @click="TOGGLE_PRODUCT(p)">
      <div class="product-title">
        {{ p.title }}
      </div>

      <div class="product-price">
        {{ p.price | currency }}
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "./variables";

  .product-item {
    background: $color-primary-light;
    color: $color-light-text;
    margin-bottom: 0;
    padding: 0 10px;
    border-top: 1px solid $color-primary-dark;
    border-bottom: 3px solid $color-primary-light;
    font-family: Trebuchet, Verdana, Helvetica, serif;

    &.selected {
      background: $color-primary-light;
      color: $color-light-text;
      border-bottom: 3px solid $color-secondary;
      cursor: pointer;
    }

    &:hover {
      background: $color-primary-background;
      border-bottom: 3px solid $color-primary-background;
      cursor: pointer;

      &.selected {
        border-bottom: 3px solid $color-secondary;
      }
    }

    &:first-of-type {
      border-top: 1px solid $color-primary-dark;
    }
  }
  ul {
    border-bottom: 1px solid $color-primary-dark;
  }
  .product-title {
    font-weight: bold;
  }

  .product-price {
    font-size: .8rem;
  }
</style>

<script>
  import { mapActions, mapState } from 'vuex';
  import { ACTIONS } from '../stores/visibility';

  export default {
    name: 'product-list',

    props: {
      products: Array
    },

    computed: {
      ...mapState({
        activeProduct: (state) => state.visibility.activeProduct
      })
    },

    methods: {
      ...mapActions([ACTIONS.TOGGLE_PRODUCT])
    }
  };
</script>
