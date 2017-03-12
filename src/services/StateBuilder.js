import { Product } from './Product'

export class StateBuilder {
  constructor (config) {
    this.config = config
  }

  createState (results) {
    const state = DEFAULT_STORE

    Object.assign(state.collection, results.collection)
    results.products.forEach((product, index) => {
      const p = new Product(product)
      state.products.push(p)
      state.productsById[p.product_id] = p

      p.options.forEach((option) => {
        state.optionsById[option.id] = option
        state.selections[option.id] = option.values[0]
      })

      state.variants = state.variants.concat(p.variants)
    })

    state.linkedOptions = getLinkedOptions(this.config.products.linkedOptions, state.products)

    return state;
  }
}

const DEFAULT_STORE = {
  collection: {
    title: ''
  },
  products: [],
  productsById: {},
  optionsById: {},
  variants: [],
  linkedOptions: {},
  selections: {},
  quantity: 1
}

const getLinkedOptions = (linkedOptions, products) => {
  const controllers = {}
  let servants = []

  const lookup = (link) => {
    const [productName, optionName] = link.split('.')

    const product = products.find(p => p.title === productName)
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
    const slaves = linkedOptions[o].map(lo => lookup(lo)).filter(o => !!o);
    servants = servants.concat(slaves.map(s => s.id))
    controllers[option.id] = slaves
  })

  return {controllers, servants}
}
