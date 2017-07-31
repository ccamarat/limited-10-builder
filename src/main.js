// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { Dispatcher, DataStore, ShopifyClient, Cache } from './services';
import 'babel-polyfill';

export function build (el, config) {
  const client = new ShopifyClient(config);
  const cache = new Cache();
  const store = new DataStore(config, client, cache);
  const dispatcher = new Dispatcher(store, client);

  store.init().then(() => {
    Vue.use({
      install (Vue, options) {
        Vue.prototype.$dispatcher = dispatcher;
        Vue.prototype.$getSelectedVariant = store.getSelectedVariant.bind(store);
        Vue.prototype.$store = store;
      }
    });

    /* eslint-disable no-new */
    new Vue({
      el,
      template: '<App :store="store"></App>',
      components: {App},
      data: {store}
    });
  });
}
