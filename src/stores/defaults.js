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
