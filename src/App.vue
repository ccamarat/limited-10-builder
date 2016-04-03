<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello :collection="collection"></hello>
    <p>
      Welcome to your Vue.js app. To get started, take a look at the
      <a href="https://github.com/vuejs-templates/webpack#folder-structure" target="_blank">README</a>
      of this template. If you have any issues with the setup, please file an issue at this template's repository.
    </p>
  </div>
</template>

<script type="text/babel">
import Hello from './components/Hello'
import store from './data-store/shopify';

export default {
  components: {
    Hello
  },
  data () {
    return {
      collection: store.collection
    }
  }
}

</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
