<template>
  <div>
    <button class="btn" @click="handleClick()" :disabled="isBuying">Buy Now!</button>
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
        // const self = this;
        this.isBuying = true;
        this.store.addToCart().then(() => {
          // self.isBuying = false;
        });
      }
    }
  }
</script>
