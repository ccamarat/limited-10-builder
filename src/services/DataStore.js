import { StateBuilder } from './StateBuilder'

export class DataStore {
  constructor (config, client, cache) {
    this.config = config
    this.client = client
    this.cache = cache
  }

  init () {
    const stateBuilder = new StateBuilder(this.config)
    const cachedState = this.cache.get('store')

    return new Promise(resolve => {
      if (cachedState) {
        this.state = stateBuilder.createState(cachedState)
        resolve();
      } else {
        this.client.fetch()
          .then((results) => {
            this.cache.set('store', results, this.config.cacheLifetime)
            this.state = stateBuilder.createState(results)
            resolve();
          })
      }
    });
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.state.selections[option.id]).join(' / ')
    return product.variants.find(variant => variant.title === variantName)
  }
}
