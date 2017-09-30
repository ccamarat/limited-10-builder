import Vuex from 'vuex';
import { createLogger } from '../services/logger';
import { createProductStore } from './products';

// const debug = process.env.NODE_ENV !== 'production';
const debug = false;

export function createStore (config, shopifyClient) {
  const store = createProductStore(config, shopifyClient);

  return new Vuex.Store({
    ...store,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  });
}
