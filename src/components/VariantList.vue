<template>
    <div class="xxxx">
      <option-list v-if="hasOptions(v)"
                   v-for="v in product.variations"
                   :options="v.options"
                   :product="v"
                   key="v.id"
      ></option-list>
    </div>
</template>

<style lang="scss" scoped>
  @import "./variables";

  .xxxx {
    // Allow children to fill this element's parent
    width: 100%;

    // Make it look like there's a space between items in the options list
    background: #e1e2e1;
    & > div {
      margin-bottom: 5px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>

<script>
  import OptionList from './OptionList';

  export default {
    components: {OptionList},
    props: ['product'],

    methods: {
      hasOptions(product) {
        return product.options.length > 0;
      }
    }
  };
</script>
