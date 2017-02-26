import Product from "./product";

const DEFAULT_STORE = {
  collection: {
    title: ''
  },
  products: [],
  productsById: {},
  optionsById: {},
  variantsById: {},
  selections: {},
  quantity: 1
};

export default function (config, client, cache) {
  const self = this;
  const store = DEFAULT_STORE;

  const buildStore = (results) => {
    Object.assign(store.collection, results.collection);
    results.products.forEach((product, index) => {
      const p = new Product(product);
      store.products.push(p);
      store.productsById[p.product_id] = p;

      p.options.forEach((option) => {
        store.optionsById[option.id] = option;
        store.selections[option.id] = option.values[0];
      });
    });

    if (typeof self.ready === 'function') {
      self.ready();
    }
  };

  this.init = () => {
    const cachedStore = cache.get('store');

    if (cachedStore) {
      buildStore(cachedStore);
    } else {
      client.fetch()
        .then((results) => {
          cache.set('store', results, config.cacheLifetime);
          buildStore(results);
        });
    }
  };

  this.state = store;
};
