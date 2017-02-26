export class Dispatcher {
  constructor (config, store) {
    this.config = config;
    this.store = store.state;
  }

  getSelectedVariant (product) {
    const variantName = product.options.map(option => this.store.selections[option.id]).join(' / ');
    return product.variants.find(variant => variant.title === variantName);
  }

  updateSelection (optionId, value) {
    this.store.selections[optionId] = value;
    const option = this.store.optionsById[optionId];
    const product = this.store.productsById[option.product_id];
    const variant = this.getSelectedVariant(product);
    console.log('updateSelection', ...arguments, product, option, variant);
  }
}
