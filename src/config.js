const sortOrder = [
  'Barrel',
  'Performance Options',
  'Slide',
  'Grip',
  'Trigger',
  'Hammer',
  'Sear',
  'Disconnector',
  'Thumb Safety',
  'Grip Safety',
  'Slide Stop',
  'Front Sight',
  'Rear Sight',
  'Mag Button'];

export default {
  client: {
    apiKey: 'cccc9170b9d1911d095a199a51df92d4',
    myShopifyDomain: 'rails-test-42',
    appId: '6'
  },
  collection: {
    id: 221262849
  },
  products: {
    sortOrder
  },
  collectionId: 221262849,
  cacheLifetime: 24 * 3600 * 1000 // 0 = unlimited
};

/*
export default {
  client: {
    apiKey: '1b69ce14bebfed248f488343efe88a8a',
    myShopifyDomain: 'limitedten',
    appId: '6'
  },
  collection: {
    id: 175354177
  },
  products: {
    sortOrder
  },
  cacheLifetime: 0 // 0 = unlimited
};
*/
