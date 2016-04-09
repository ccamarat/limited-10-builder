import Shopify from "./shopify";
import Cache from "../cache";
import Product from "./product";

const DEFAULT_STORE = {
  collection: {
    title: ''
  },
  products: [],
  quantity: 1
};

export default function (config) {
  const store = DEFAULT_STORE;
  let client;

  const buildStore = (results) => {
    Object.assign(store.collection, results.collection);
    // store.collection.title = results.collection.title;
    results.products.forEach((product, index) => {
      store.products.push(new Product(product));
    });
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
        document.location = cart.checkoutUrl;
      });
  };
};
