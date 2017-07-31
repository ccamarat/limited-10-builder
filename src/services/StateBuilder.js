import { Product } from './Product';

export class StateBuilder {
  constructor (config) {
    this.config = config;
  }

  createState (results) {
    const state = DEFAULT_STORE;

    Object.assign(state.collection, results.collection);
    results.products.forEach((product, index) => {
      const p = new Product(product);
      state.products.push(p);
      state.productsById[p.product_id] = p;

      p.options.forEach((option) => {
        state.optionsById[option.id] = option;
        state.selections[option.id] = option.values[0];
      });

      state.variants = state.variants.concat(p.variants);
    });

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
  selections: {},
  quantity: 1
};
