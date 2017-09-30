<template>
  <div class="content" v-if="options.length > 0">
    <a v-for="option in options" :disabled="!option.enabled" class="button" :class="{'is-success': option.selected}" @click="SET_VALUE({product, option})">
      {{option.value}}
    </a>
  </div>
</template>

<style lang="scss" scoped>
  a {
    margin-right: 5px;
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
    methods: {
      ...mapActions([
        ACTIONS.SET_VALUE
      ])
    }
  };
</script>
