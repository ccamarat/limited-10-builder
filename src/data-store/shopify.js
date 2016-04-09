// import '../vendors/shopify-sdk/shopify-buy.polyfilled.globals.min';

/*
 export default function (config) {
 const shopClient = window.ShopifyBuy.buildClient(config.client);

 let cart;
 shopClient.createCart().then(function (newCart) {
 cart = newCart;
 });
 if (cart) {
 cart.addVariants({});
 }

 shopClient.fetchProduct(5613172993)
 .then(function (product) {
 console.log(product);
 })
 .catch(function () {
 console.log('Request failed');
 });

 this.fetch = function () {
 return new Promise(() => {
 });
 }
 }
 */

export default function ShopifyClient(config) {
  const store = {};
  const client = window.ShopifyBuy.buildClient(config.client);
  let cart;

  client.createCart().then(function (newCart) {
    cart = newCart;
  });

  const isLoaded = () => {
    return store.products && store.collection;
  };

  this.fetch = () => {
    return new Promise((resolve, reject) => {
      const maybeReturn = () => {
        if (isLoaded()) {
          resolve(store);
        }
      };

      const unpackResponse = (response) => {
        return response.map((item) => {
          return item.attrs;
        });
      };

      client.fetchCollection(config.collectionId)
        .then(function (response) {
          store.collection = unpackResponse([response])[0];
          // store.collection = response;
          maybeReturn();
        })
        .catch(reject);

      client.fetchQueryProducts({collection_id: config.collectionId})
        .then(function (response) {
          store.products = unpackResponse(response);
          // store.products = response;
          maybeReturn();
        })
        .catch(reject);
    });
  };

  this.addToCart = (variants, quantity) => {
    const items = variants.map((variant) => {
      return {variant, quantity};
    });
    return cart.addVariants.apply(cart, items);
  };
};
