export class Dispatcher {
  constructor (config, store) {
    this.config = config;
    this.store = store;
  }

  updateSelection (productId, optionId, value) {
    console.log('updateSelection', ...arguments);
    // debugger;
  }
}
