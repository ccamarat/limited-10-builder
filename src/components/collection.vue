<template>
  <div>
    <h2>{{ model.title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    model: Object
  },

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  }
}
</script>
