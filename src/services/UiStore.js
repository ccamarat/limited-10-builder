export class UiStore {
  constructor () {
    this.state = {
      visibleProductId: null
    };
  }

  showProduct (product) {
    if (this.state.visibleProductId === product.product_id) {
      this.state.visibleProductId = null;
    } else {
      this.state.visibleProductId = product.product_id;
    }
  }
}
