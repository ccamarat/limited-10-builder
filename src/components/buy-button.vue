<template>
  <span>
    <button class="btn" @click="handleClick()" :disabled="isBuying">Take my money!</button>
  </span>
</template>

<script>
  export default {
    props: {
      store: Object
    },

    data () {
      return {
        isBuying: false
      };
    },

    methods: {
      handleClick () {
        this.isBuying = true;
        this.store.addToCart();
      }
    }
  };
</script>
