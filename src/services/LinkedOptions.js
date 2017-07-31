/**
 * Tracks changes to options that should be linked together, e.g. the various length settings.
 */
export class LinkedOptions {
  constructor (store) {
    this.store = store;
  }

  init (linkedOptions) {
    const products = this.store.state.products;
    // A controller is an option that is the "primary key" for a particular settings. Any items bound to it will update
    // when the controller selection changes.
    const controllers = {};
    // Servants, or slaves, will be updated when the controller's state changes.
    let servants = [];

    // Helper function to locate a product option by it's name (e.g. "frame.length"). Warns if either segment is not found.
    const lookup = (link) => {
      const [productName, optionName] = link.split('.');

      const product = products.find(p => p.title === productName);
      if (!product) {
        console.warn(`Invalid linkedOptions setting '${link}'`);
        return;
      }

      const option = product.options.find(o => o.name === optionName);
      if (!option) {
        console.warn(`Invalid linkedOptions setting '${link}'`);
        return;
      }

      return option;
    };

    // Iterate through the linked option definitions and locate all controllers and servants.
    Object.keys(linkedOptions).forEach(o => {
      const option = lookup(o);
      const slaves = linkedOptions[o].map(lo => lookup(lo)).filter(o => !!o);
      servants = servants.concat(slaves.map(s => s.id));
      controllers[option.id] = slaves;
    });

    this.controllers = controllers;
    this.servants = servants;

    // Sync all slaves initial values to their controller's initial value.
    Object.keys(this.controllers).forEach(cId => this.sync(cId));
  }

  sync (optionId) {
    if (this.controllers[optionId]) {
      this.controllers[optionId].forEach(linkedOption => {
        this.store.state.selections[linkedOption.id] = this.store.state.selections[optionId];
      });
    }
  }
}
