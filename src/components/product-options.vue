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
      option: Object
    },
    methods: {
      handleChange (event) {
        console.log(event.srcElement.value);
      }
    }
  }
</script>
