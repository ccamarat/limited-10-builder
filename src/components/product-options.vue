<template>
  <div class="selector-wrapper">
    <label>{{ option.name }}
      <select class="single-option-selector" v-model="option.selected" v-on:change="handleChange">
        <option v-for="value in option.values" :value="value">{{value}}</option>
      </select>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      productId: Number,
      option: Object
    },
    methods: {
      handleChange (event) {
        this.$dispatcher.updateSelection(this.productId, this.option.id, event.srcElement.value);
      }
    }
  }
</script>
