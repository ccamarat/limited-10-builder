export class Dispatcher {
  constructor (config, store, shopifyClient) {
    this.config = config
    this.store = store.state
    this.client = shopifyClient
  }

  init () {
    const linkedOptions = this.config.products.linkedOptions
    const links = {}
    const lookup = (link) => {
      const [productName, optionName] = link.split('.')
      const product = this.store.products.find(p => p.title === productName)
      if (!product) {
        console.warn(`Invalid linkedOptions setting '${link}'`)
        return
      }
      const option = product.options.find(o => o.name === optionName)
      if (!option) {
        console.warn(`Invalid linkedOptions setting '${link}'`)
        return
      }
      return option
    }
    Object.keys(linkedOptions).forEach(o => {
      const option = lookup(o)
      links[option.id] = linkedOptions[o].map(lo => lookup(lo)).filter(o => !!o)
    })

    this.linkedOptions = links
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.store.selections[option.id]).join(' / ')
    return product.variants.find(variant => variant.title === variantName)
  }

  updateSelection (optionId, value) {
    this.store.selections[optionId] = value

    if (this.linkedOptions[optionId]) {
      this.linkedOptions[optionId].forEach(linkedOption => {
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
