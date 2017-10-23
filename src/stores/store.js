import Vuex from 'vuex';
import { createLogger } from '../services/logger';
import { createProductStore } from './products';
import { createVisibilityStore } from './visibility';

// const debug = process.env.NODE_ENV !== 'production';
const debug = false;

export function createStore (config, shopifyClient) {
  const store = createProductStore(config, shopifyClient);
  const visibility = createVisibilityStore();

  return new Vuex.Store({
    ...store,
    modules: {
      visibility
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  });
}
