<template>
  <div class="section-header section-header--small">
    <h2 class="section-header__title">
      {{ model.title }}
    </h2>
  </div>
</template>

<script>
  export default {
    props: {
      model: Object
    }
  }
</script>
