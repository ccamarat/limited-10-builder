<template>
  <div v-if="product !== null" class="click-mask" @click="hideProduct"></div>
</template>

<script>
  import { mapState } from 'vuex';
  import { ACTIONS } from '../stores/visibility';

  export default {
    name: 'click-mask',
    computed: {
      ...mapState({
        product: (state) => state.visibility.activeProduct
      })
    },
    methods: {
      hideProduct (e) {
        this.$store.dispatch(ACTIONS.CLEAR_PRODUCT);
      }
    }
  };
</script>

<style scoped lang="scss">
  .click-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>
