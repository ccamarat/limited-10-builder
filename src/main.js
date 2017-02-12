// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import DataStore from './data-store';
import 'babel-polyfill';

export function build(el, config) {
  const store = new DataStore(config);
  store.init();

  /* eslint-disable no-new */
  new Vue({
    el,
    template: '<App :store="store"></App>',
    components: { App },
    data: { store }
  });
}
