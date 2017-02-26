// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DataStore from './data-store';
import {Dispatcher} from './data-store/dispatcher';
import 'babel-polyfill';

export function build(el, config) {
  const store = new DataStore(config);
  const dispatcher = new Dispatcher(config, store);
  store.init();

  Vue.use({
    install (Vue, options) {
      Vue.prototype.$dispatcher = dispatcher;
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
