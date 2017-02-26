import Shopify from "./shopify";
import Cache from "../cache";
import Product from "./product";

const DEFAULT_STORE = {
  collection: {
    title: ''
  },
  products: [],
  selections: [],
  quantity: 1
};

export default function (config) {
  const self = this;
  const store = DEFAULT_STORE;
  let client;

  const buildStore = (results) => {
    Object.assign(store.collection, results.collection);
    results.products.forEach((product, index) => {
      store.products.push(new Product(product));
    });
    if (typeof self.ready === 'function') {
      self.ready();
    }
  };

  this.init = () => {
    client = new Shopify(config);
    const cache = new Cache();
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

  this.addToCart = () => {
    const selections = store.products.map(product => product.getSelectedVariant());
    return client.addToCart(selections, store.quantity)
      .then(cart => {
        if (window.parent !== window) {
          window.parent.postMessage({
            message: 'order-complete',
            checkoutUrl: cart.checkoutUrl
          }, '*');
        } else {
          window.location = cart.checkoutUrl;
        }
      });
  };
};
