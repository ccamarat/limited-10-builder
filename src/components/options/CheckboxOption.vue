<template>
  <div class="checkbox-option-container" v-if="options.length > 0" @click="toggleCart">
    <div class="variant-title">
      {{product.title}}
    </div>

    <div class="checkbox-container">
      <div class="onoffswitch">
      <span class="onoffswitch-label"
            :class="{'selected': selectedOption && selectedOption.value, disabled: isDisabled}"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../variables";

  .checkbox-option-container {
    display: flex;
    cursor: pointer;
    background: $color-primary-light;
    padding: 5px;
    width: 100%;
  }

  .variant-title {
    font-size: 1rem;
    font-weight: bold;

    // Try to leave a space between the title and the checkbox
    margin-right: 10px;
    min-width: 100px;
  }

  .onoffswitch {
    position: relative;
    width: 55px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    height: 20px;
    padding: 0;
    line-height: 20px;
    border: 0 solid $color-primary;
    border-radius: 30px;
    background-color: $color-secondary-light;

    &:before {
      content: "";
      display: block;
      width: 30px;
      height: 30px;
      margin: -5px;
      background: $color-primary;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 31px;
      border-radius: 30px;
      box-shadow: 0 6px 12px 0 $color-primary-dark;
      transition: all 250ms;
    }

    &:before,
    &.selected:before {
      border-color: $color-secondary;
    }

    &.selected:before {
      right: 0;
      background-color: $color-secondary;
      box-shadow: 3px 6px 18px 0 rgba(0, 0, 0, 0.2);
    }

    &.disabled {
      background-color: $color-primary-background;
      &:before {
        background-color: $color-primary-dark;
        box-shadow: 3px 6px 18px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>

<script>
  import { mapActions } from 'vuex';
  import { ACTIONS } from '../../stores/products';

  export default {
    props: {
      options: Array,
      product: Object
    },
    computed: {
      selectedOption () {
        return this.options.find(o => o.selected);
      },
      isDisabled () {
        return !!this.options.find(o => !o.enabled);
      }
    },
    methods: {
      ...mapActions([
        ACTIONS.SET_VALUE
      ]),
      toggleCart () {
        if (this.isDisabled) {
          return;
        }
        const option = this.options.find(o => o !== this.selectedOption);
        this[ACTIONS.SET_VALUE]({product: this.product, option});
      }
    }
  };
</script>
