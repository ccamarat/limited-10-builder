export class Dispatcher {
  constructor (config, store, shopifyClient) {
    this.config = config
    this.store = store.state
    this.client = shopifyClient
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.store.selections[option.id]).join(' / ')
    return product.variants.find(variant => variant.title === variantName)
  }

  updateSelection (optionId, value) {
    const linkedOptions = this.store.linkedOptions.controllers;
    this.store.selections[optionId] = value

    if (linkedOptions[optionId]) {
      linkedOptions[optionId].forEach(linkedOption => {
        this.store.selections[linkedOption.id] = value
      })
    }
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
