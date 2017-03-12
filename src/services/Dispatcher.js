/**
 * What the heck is a dispatcher? It's an idea borrowed from the FLUX pattern. The flux pattern allows us to separate
 * state changes from the rest of the application. Since we know for sure that the UI is fluid I didn't want to store
 * state information in the UI, so it seemed like a good idea to build on for this project. Full-on flux seemed like
 * overkill since there's only a few actions we actually need.
 */
export class Dispatcher {
  constructor (store, shopifyClient) {
    this.store = store
    this.client = shopifyClient
  }

  updateSelection (optionId, value) {
    const linkedOptions = this.store.state.linkedOptions.controllers;
    this.store.state.selections[optionId] = value

    if (linkedOptions[optionId]) {
      linkedOptions[optionId].forEach(linkedOption => {
        this.store.state.selections[linkedOption.id] = value
      })
    }
  }

  addToCart () {
    const selections = this.store.state.products.map(product => this.store.getSelectedVariant(product))
    return this.client.addToCart(selections, this.store.state.quantity)
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
