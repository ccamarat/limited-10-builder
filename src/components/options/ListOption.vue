<template>
  <div class="option-list-container" v-if="options.length > 0">
    <div v-if="!hideTitle" class="variant-title">
      {{product.title}}
    </div>

    <div class="option-list-options">
      <a v-for="option in options"
         class="option-list-item"
         :class="{'selected': option.selected, 'disabled': !option.enabled}"
         @click="SET_VALUE({product, option})"
      >
        {{option.value}}
      </a>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../variables";

  .option-list-container {
    width: 100%;
  }

  .variant-title {
    font-size: 1rem;
    font-weight: bold;
    background: $color-primary-light;
    padding: 5px;
  }

  .option-list-options {
    display: flex;
    flex-wrap: wrap;
  }

  .option-list-item {
    background: $color-primary-background;
    color: $color-light-text;
    margin-bottom: 0;
    border-bottom: 3px solid $color-primary-background;
    padding: 10px;

    &.selected {
      background: $color-primary-background;
      color: $color-light-text;
      border-bottom: 3px solid $color-secondary;
      cursor: pointer;
    }

    &:hover {
      background: $color-primary-background;
      border-bottom: 3px solid $color-primary-background;
      color: $color-secondary;
      cursor: pointer;

      &.selected {
        border-bottom: 3px solid $color-secondary;
      }
    }

    &.disabled {
      background: $color-primary-background;
      border-bottom: 3px solid $color-primary-background;
      color: darken($color-primary-dark, 15%);
      cursor: inherit;
    }
  }
</style>

<script>
  import { mapActions } from 'vuex';
  import { ACTIONS } from '../../stores/products';

  export default {
    props: {
      options: Array,
      product: Object,
      hideTitle: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions([
        ACTIONS.SET_VALUE
      ])
    }
  };
</script>
