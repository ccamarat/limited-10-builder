import { StateBuilder } from './StateBuilder';
import { LinkedOptions } from './LinkedOptions';

export class DataStore {
  constructor (config, client, cache) {
    this.config = config;
    this.client = client;
    this.cache = cache;
  }

  init () {
    const stateBuilder = new StateBuilder(this.config);
    const cachedState = this.cache.get('store');
    this.linkedOptions = new LinkedOptions(this);

    const sync = (state) => {
      this.state = stateBuilder.createState(state);
      this.linkedOptions.init(this.config.products.linkedOptions);
    };

    return new Promise(resolve => {
      if (cachedState) {
        sync(cachedState);
        resolve();
      } else {
        this.client.fetch()
          .then((results) => {
            this.cache.set('store', results, this.config.cacheLifetime);
            sync(results);
            resolve();
          });
      }
    });
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.state.selections[option.id]).join(' / ');
    return product.variants.find(variant => variant.title === variantName);
  }
}
