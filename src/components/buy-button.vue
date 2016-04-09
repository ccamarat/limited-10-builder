<template>
  <div>
    <button class="btn" @click="handleClick()" :disabled="isBuying">Take my money!</button>
  </div>
</template>

<script type="text/babel">
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
  }
</script>
