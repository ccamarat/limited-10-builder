<template>
  <a :disabled="isDisabled" class="button" :class="{'is-success': selectedOption && selectedOption.value}" @click="toggleCart">
    {{product.title}}
  </a>
</template>

<style lang="scss" scoped>
  @import "../variables";
  .selected {
    background: $color-selected;
  }
  .disabled {
    background: $color-disabled;
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
        const option = this.options.find(o => o !== this.selectedOption);
        this[ACTIONS.SET_VALUE]({product: this.product, option});
      }
    }
  };
</script>
