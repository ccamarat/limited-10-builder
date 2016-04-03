import Cache from '../cache';

const config = {
  client: {
    apiKey: 'cccc9170b9d1911d095a199a51df92d4',
    myShopifyDomain: 'rails-test-42',
    appId: '6'
  },
  collectionId: 221262849,
  cacheLifetime: 0 // 0 = unlimited
};

const cache = new Cache();
const client = window.ShopifyBuy.buildClient(config.client);

const store = cache.get('store') || {
  collection: {
    title: ''
  },
  products: []
};

const isLoaded = () => {
  return store.products.length;
};

const fetch = () => {
  const maybeUpdateCache = () => {
    if (isLoaded) {
      cache.set('store', store, config.cacheLifetime);
    }
  };

  const unpackResponse = (response) => {
    return response.map((item) => {
      return item.attrs;
    });
  };

  client.fetchCollection(221262849)
    .then(function (response) {
      const collection = unpackResponse([response])[0];
      store.collection.title = collection.title;
      maybeUpdateCache();
    })
    .catch(function (e) {
      console.log('Request failed', e);
    });

  client.fetchQueryProducts({collection_id: config.collectionId})
    .then(function (response) {
      // console.log(response);
      store.products = unpackResponse(response);
      maybeUpdateCache();
      // console.log(store.products);
    })
    .catch(function (e) {
      console.log('Request failed', e);
    });
};

if (!isLoaded()) {
  fetch();
}

export default store;
