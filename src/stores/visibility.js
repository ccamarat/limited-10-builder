export const ACTIONS = {
  TOGGLE_PRODUCT: 'TOGGLE_PRODUCT',
  CLEAR_PRODUCT: 'CLEAR_PRODUCT'
};

export const MUTATIONS = {
  SET_ACTIVE_PRODUCT: 'SET_ACTIVE_PRODUCT',
  CLEAR_ACTIVE_PRODUCT: 'CLEAR_ACTIVE_PRODUCT'
};

export function createVisibilityStore () {
  const state = {
    activeProduct: null
  };

  const actions = {
    [ACTIONS.TOGGLE_PRODUCT] ({commit, dispatch, state}, product) {
      if (state.activeProduct === product) {
        dispatch(ACTIONS.CLEAR_PRODUCT);
      } else {
        commit(MUTATIONS.SET_ACTIVE_PRODUCT, product);
      }
    },

    [ACTIONS.CLEAR_PRODUCT] ({commit}) {
      commit(MUTATIONS.CLEAR_ACTIVE_PRODUCT);
    }
  };

  const mutations = {
    [MUTATIONS.SET_ACTIVE_PRODUCT] (state, product) {
      state.activeProduct = product;
    },

    [MUTATIONS.CLEAR_ACTIVE_PRODUCT] (state) {
      state.activeProduct = null;
    }
  };

  return {
    state,
    actions,
    mutations
  };
}
