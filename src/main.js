import Vue from "vue";
import App from "./App";
import DataStore from './data-store';
import 'babel-polyfill';

module.exports = {
  build (el, config) {
    const store = new DataStore(config);
    store.init();

    /* eslint-disable no-new */
    new Vue({
      el,
      components: {App},
      data: {store}
    });
  }
};
