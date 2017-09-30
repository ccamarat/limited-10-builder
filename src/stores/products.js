import { configureProducts, retrieveProducts } from './product-init';
import { configureConstraints, evaluateConstraints } from './constraints';
import { configureDefaults, getEnabledDefaults, selectDefaults } from './defaults';

export const ACTIONS = {
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
  CONFIGURE_DEFAULTS: 'CONFIGURE_DEFAULTS',
  CONFIGURE_CONSTRAINTS: 'CONFIGURE_CONSTRAINTS',
  SET_VALUE: 'SET_VALUE',
  EVALUATE_CONSTRAINTS: 'EVALUATE_CONSTRAINTS',
  UPDATE_SELECTIONS: 'UPDATE_SELECTIONS',
  APPLY_CONSTRAINTS: 'APPLY_CONSTRAINTS',
  REMOVE_CONSTRAINTS: 'REMOVE_CONSTRAINTS'
};

export const MUTATIONS = {
  RECEIVE_ALL_PRODUCTS: 'RECEIVE_ALL_PRODUCTS',
  SELECT_OPTION: 'SELECT_OPTION',
  DESELECT_OPTION: 'DESELECT_OPTION',
  ENABLE_OPTION: 'ENABLE_OPTION',
  DISABLE_OPTION: 'DISABLE_OPTION'
};

export function createProductStore (config, shopifyClient) {
  const state = {
    tree: [],
    variations: [],
    options: []
  };

  let activeConstraints;

  const actions = {
    async [ACTIONS.GET_ALL_PRODUCTS] ({commit, dispatch}) {
      const products = await retrieveProducts(shopifyClient);
      commit(MUTATIONS.RECEIVE_ALL_PRODUCTS, {products});

      dispatch(ACTIONS.CONFIGURE_DEFAULTS);
      dispatch(ACTIONS.CONFIGURE_CONSTRAINTS);
      dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
    },

    [ACTIONS.CONFIGURE_DEFAULTS] ({state, commit}) {
      configureDefaults(state);
      selectDefaults(commit);
    },

    [ACTIONS.CONFIGURE_CONSTRAINTS] ({state}) {
      configureConstraints(state);
    },

    [ACTIONS.EVALUATE_CONSTRAINTS] ({dispatch}) {
      activeConstraints = evaluateConstraints();
      if (activeConstraints.length > 0) {
        dispatch(ACTIONS.APPLY_CONSTRAINTS);
        dispatch(ACTIONS.UPDATE_SELECTIONS);
        // ...and reevaluate constraints.
        dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
      }
    },

    [ACTIONS.APPLY_CONSTRAINTS] ({commit}) {
      activeConstraints.forEach(c => c.enforce(commit));
    },

    [ACTIONS.UPDATE_SELECTIONS] ({commit, state}) {
      // 1. Find options and related products
      const opts = state.options.filter(o => !o.enabled && o.selected);
      const prods = opts.map(o => o.product).filter(unique);

      // 2. Deselect disabled options
      opts.forEach(option => commit(MUTATIONS.DESELECT_OPTION, {option}));

      // 3. Select default or first available
      prods.forEach(product => {
        if (product.config.multiSelect) {
          return;
        }
        const selected = product.options.filter(o => o.selected);
        if (selected.length > 0) {
          return;
        }
        let defaults = getEnabledDefaults(product);
        defaults.forEach(option => commit(MUTATIONS.SELECT_OPTION, {option}));
      });
    },

    [ACTIONS.SET_VALUE] ({commit, dispatch}, {product, option}) {
      product.set(commit, option);
      dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
    }
  };

  const mutations = {
    [MUTATIONS.RECEIVE_ALL_PRODUCTS] (state, {products}) {
      const {options, variations, tree} = configureProducts(config, products);
      state.tree = tree;
      state.variations = variations;
      state.options = options;
    },
    [MUTATIONS.SELECT_OPTION] (state, {option}) {
      option.selected = true;
    },
    [MUTATIONS.DESELECT_OPTION] (state, {option}) {
      option.selected = false;
    },
    [MUTATIONS.ENABLE_OPTION] (state, {option}) {
      option.enabled = true;
    },
    [MUTATIONS.DISABLE_OPTION] (state, {option}) {
      option.enabled = false;
    }
  };

  return {
    state,
    actions,
    mutations
  };
}

const unique = (item, index, arr) => arr.indexOf(item) === index;
