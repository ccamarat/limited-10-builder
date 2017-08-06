<template>
  <div>
    <h3>{{ option.name }}</h3>
    <ul>
      <li v-for="value in option.values"
          :key="value"
          :class="{active: selectedValue === value}"
          @click="select(value)">
        {{value}}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import './styling/variables';
  @import './styling/list-button.scss';

  li {
    @extend %list-button;
  }

  div {
    position: relative;
    color: $color-grey;
  }
</style>

<script>
  export default {
    props: {
      option: Object
    },

    computed: {
      selectedValue: {
        get () {
          return this.$store.state.selections[this.option.id];
        }
      }
    },
    methods: {
      select (value) {
        this.$dispatcher.updateSelection(this.option.id, value);
      }
    }
  };
</script>
