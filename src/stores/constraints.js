import { MUTATIONS } from './products';

let constraints = [];

export function configureConstraints ({tree, variations}) {
  variations
    .forEach(v => {
      if (v.config.constraints) {
        const c = v.config.constraints.map(createConstraint.bind(null, v, tree));
        constraints.push(...c);
      }
    });
}

export function evaluateConstraints () {
  return constraints.filter(c => c.needsAttention());
}

function createConstraint (target, tree, rule) {
  const source = findPeer(tree, rule.when.source);
  const targetOptions = findTargets(target.options, rule);
  const check = createCheckFn(rule.when);
  let isActive;
  let nextAction;

  return {
    source,
    target,
    targetOptions,
    needsAttention () {
      const shouldBeActive = !!source.options.find(o => o.selected && check(o));
      const needsAttention = shouldBeActive !== isActive;
      if (needsAttention) {
        nextAction = shouldBeActive ? MUTATIONS.DISABLE_OPTION : MUTATIONS.ENABLE_OPTION;
        isActive = shouldBeActive;
      }
      return needsAttention;
    },
    enforce (commit) {
      targetOptions.forEach(option => commit(nextAction, {option}));
      nextAction = null;
    }
  };
}

function createCheckFn (rule) {
  if (rule.hasOwnProperty('is')) {
    return (option) => option.value === rule.is;
  }

  if (rule.hasOwnProperty('in')) {
    return (option) => rule.in.includes(option.value);
  }

  if (rule.hasOwnProperty('greaterThan')) {
    return (option) => option.value > rule.greaterThan;
  }

  console.warn(`could not create check function for "${JSON.stringify(rule)}"`);
}

function findPeer (products, source) {
  const [needle, ...rest] = source.split('.');
  let product = products.find(p => p.title === needle);

  if (!product || (rest.length && !product.variations)) {
    console.warn(`Could not locate peer for "${source}"; possible misconfiguration`);
  } else if (rest.length && product.variations) {
    product = findPeer(product.variations, rest.join('.'));
  }
  return product;
}

function findTargets (options, rule) {
  const values = rule.enable || rule.disable;
  if (rule.enable) {
    return options.filter(o => !values.includes(o.value));
  } else {
    return options.filter(o => values.includes(o.value));
  }
}
