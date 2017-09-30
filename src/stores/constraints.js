import { MUTATIONS } from './products';
import { findPeer } from './util';

let constraints = [];

export function configureConstraints ({tree, variations}) {
  variations.forEach(v => {
    if (v.config.constraints) {
      const c = v.config.constraints.map(createConstraint.bind(null, v, tree));
      constraints.push(...c);
    }
  });
}

export function evaluateConstraints () {
  // Collect eval results
  const results = constraints.map(c => c.evaluate());
  return results
    // only interested in items that need attention
    .filter(r => r.needsAttention)
    // should enable first, then disable
    .sort((r) => r.nextAction === MUTATIONS.ENABLE_OPTION ? -1 : 1)
    // return ordered list of constraints needing attention
    .map(r => r.constraint);
}

function createConstraint (target, tree, rule) {
  const source = findPeer(tree, rule.when.source);
  const targetOptions = findTargets(target.options, rule);
  const check = createCheckFn(rule.when);
  let isActive;
  let nextAction;

  const constraint = {
    source,
    target,
    targetOptions,
    evaluate () {
      const shouldBeActive = !!source.options.find(o => o.selected && check(o));
      const needsAttention = shouldBeActive !== isActive;
      if (needsAttention) {
        nextAction = shouldBeActive ? MUTATIONS.DISABLE_OPTION : MUTATIONS.ENABLE_OPTION;
        isActive = shouldBeActive;
      }
      return {needsAttention, nextAction, constraint};
    },
    enforce (commit) {
      targetOptions.forEach(option => commit(nextAction, {option}));
      nextAction = null;
    }
  };
  return constraint;
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

function findTargets (options, rule) {
  const values = rule.enable || rule.disable;
  if (rule.enable) {
    return options.filter(o => !values.includes(o.value));
  } else {
    return options.filter(o => values.includes(o.value));
  }
}
