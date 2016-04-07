<template>
  <div>
    <b>{{ option.name }}</b>
    <select v-model="option.selected" @:change="onChange">
      <option v-for="value in option.values" :value="value">{{value}}</option>
    </select>
    Selected: {{option.selected}}
  </div>
</template>

<script>
  export default {
    props: {
      option: Object
    },

    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
      }
    },

    methods: {
      onChange () {
        console.log('change', this.option.selected);
      }
    }
  }
</script>
