<template>
  <div class="selector-wrapper">
    <label>{{ option.name }}
      <select class="single-option-selector" v-model="selection">
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
    computed: {
      selection: {
        get () {
          return this.$store.state.selections[this.option.id];
        },
        set (value) {
          this.$dispatcher.updateSelection(this.option.id, value);
        }
      }
    }
  };
</script>
