// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DataStore from './data-store';
import Shopify from "./data-store/shopify";
import Cache from "./cache";
import {Dispatcher} from './data-store/dispatcher';
import 'babel-polyfill';

export function build(el, config) {
  const client = new Shopify(config);
  const cache = new Cache();
  const store = new DataStore(config, client, cache);
  const dispatcher = new Dispatcher(config, store, client);

  store.ready = () => {
    dispatcher.init();
  };
  store.init();

  Vue.use({
    install (Vue, options) {
      Vue.prototype.$dispatcher = dispatcher;
      Vue.prototype.$selections = store.state.selections;
    }
  });

  /* eslint-disable no-new */
  new Vue({
    el,
    template: '<App :store="store"></App>',
    components: { App },
    data: { store }
  });
}
