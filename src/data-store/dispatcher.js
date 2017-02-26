export class Dispatcher {
  constructor (config, store, shopifyClient) {
    this.config = config;
    this.store = store.state;
    this.client = shopifyClient;
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.store.selections[option.id]).join(' / ')
    return product.variants.find(variant => variant.title === variantName)
  }

  updateSelection (optionId, value) {
    this.store.selections[optionId] = value
    const option = this.store.optionsById[optionId]
    const product = this.store.productsById[option.product_id]
    const variant = this.getSelectedVariant(product)
    console.log('updateSelection', ...arguments, product, option, variant)
  }

  addToCart () {
    const selections = this.store.products.map(product => this.getSelectedVariant(product))
    return this.client.addToCart(selections, this.store.quantity)
      .then(cart => {
        if (window.parent !== window) {
          window.parent.postMessage({
            message: 'order-complete',
            checkoutUrl: cart.checkoutUrl
          }, '*')
        } else {
          window.location = cart.checkoutUrl
        }
      })
  }
}
