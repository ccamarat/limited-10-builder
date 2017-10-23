<template>
  <section class="layout-container">
    <div class="gun-builder">
      <div class="left-side">
        <product-list-container></product-list-container>
      </div>
      <div class="right-side">
        <viewer></viewer>
      </div>
    </div>
    <click-mask class="click-mask"></click-mask>
    <div class="floating-list">
      <variant-mixer></variant-mixer>
    </div>
  </section>
</template>

<style lang="scss">
  // Provide baseline element size for relatively-sized components
  html {
    font-size: 16px;
  }
  // temporarily hide the logo
  .site-header__logo {
    display: none
  }
</style>

<style lang="scss" scoped>
  @import "./variables";

  .layout-container {
    position: relative;
  }
  .gun-builder {
    display: flex;
    flex-wrap: nowrap;

    > div {
      min-height: 100%;
    }
  }
  .left-side {
    flex: 0 0 215px;
  }
  .right-side {
    flex: auto;
  }
  .floating-list {
    position: absolute;
    top: 0;
    left: 220px;
  }

  // Hide the floating list when clicking outside of it
  .click-mask {
    background: $color-primary-background;
    opacity: 0.15;
    z-index: 1;
  }
  .left-side,
  .floating-list {
    z-index: 2;
  }
</style>

<script>
  import ProductListContainer from './ProductListContainer.vue';
  import Viewer from './viewer/Viewer';
  import VariantMixer from './VariantMixer';
  import ClickMask from './ClickMask';

  export default {
    components: {
      ClickMask,
      VariantMixer,
      ProductListContainer,
      Viewer
    }
  };
</script>
