<template>
  <div class="product-single__quantity">
    <label>Quantity
      <input type="number" name="quantity" value="1" min="1" class="quantity-selector" :model="store.quantity">
    </label>
  </div>
</template>

<script>
  export default{
    props: {
      store: Object
    }
  };
</script>
