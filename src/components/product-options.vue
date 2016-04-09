<template>
  <div class="selector-wrapper">
    <label>{{ option.name }}
      <select class="single-option-selector" v-model="option.selected">
        <option v-for="value in option.values" :value="value">{{value}}</option>
      </select>
    </label>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      option: Object
    }
  }
</script>
