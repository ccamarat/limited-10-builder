import { MUTATIONS } from './products';

const defaults = [];

export function configureDefaults ({variations}) {
  variations
    .forEach(v => {
      let def = v.config.default;
      if (!Array.isArray(def)) {
        def = [def];
      }
      defaults.push(...v.options.filter(o => def.includes(o.value)));
    });
}

export function selectDefaults (commit) {
  defaults.forEach(option => commit(MUTATIONS.SELECT_OPTION, {option}));
}

export function getEnabledDefaults (product) {
  let defs = defaults.filter(o => o.enabled && o.product === product);
  if (defs.length === 0) {
    defs = [product.options.find(o => o.enabled)];
  }
  return defs;
}

/*
export const selectDefaultOptions = (commit, {variations}) => {
  variations.forEach(variation => {
    addProductDefault(commit, variation);
  });
};

function addProductDefault (commit, product) {
  const enabledValues = getDefaultEnabledValues(product);
  if (enabledValues.length === 0 && product.options.length > 0) {
    console.warn(`Could not set default value on product ${product.title}. The requested value does not exist.`);
  } else {
    enabledValues.forEach((option) => {
      commit(MUTATIONS.SELECT_OPTION, {option});
    });
  }
}

function getDefaultEnabledValues (product) {
  // if product has no options just return
  if (product.options.length === 0) {
    return [];
  }

  const enabledOptions = product.options.filter(o => o.enabled);

  // If 1 or 0, are enabled, no need to keep hunting.
  if (enabledOptions.length === 0) {
    console.warn(`${product.title} has no options enabled.`);
    return enabledOptions;
  } else if (enabledOptions.length === 1) {
    // Product only has one option enabled.
    return enabledOptions;
  }

  // Otherwise, hunt away!
  const val = product.config.default;

  if (val === undefined) {
    // Product has no default; returning first available.
    return [enabledOptions[0]];
  }

  if (Array.isArray(val)) {
    const selections = enabledOptions.filter(o => val.includes(o.value));
    if (selections.length > 0) {
      // Found enabled default options for product; returning them.
      return selections;
    }
  } else {
    const selection = enabledOptions.find(o => o.value === val);
    if (selection) {
      // Found enabled default option for product returning it.
      return [selection];
    }
  }

  // All defaults are disabled for product returning first available.
  return [enabledOptions[0]];
}
*/
