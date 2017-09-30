import { findPeer } from './util';
import { MUTATIONS } from './products';

const links = [];

export function configureLinkedProducts ({tree, variations}) {
  variations.forEach(v => {
    if (v.config.master) {
      const l = createLinks(v, tree);
      links.push(...l);
    }
  });
}

function createLinks (variation, tree) {
  const source = findPeer(tree, variation.config.master);
  return source.options.map(source => {
    const target = variation.options.find(o => o.value === source.value);
    return {
      source,
      target
    };
  });
}

export function updateLinkedProducts (commit) {
  links.forEach(({source, target}) => {
    const option = target;
    if (source.enabled !== target.enabled) {
      const type = source.enabled ? MUTATIONS.ENABLE_OPTION : MUTATIONS.DISABLE_OPTION;
      commit(type, {option});
    }
    if (source.selected !== target.selected) {
      const type = source.selected ? MUTATIONS.SELECT_OPTION : MUTATIONS.DESELECT_OPTION;
      commit(type, {option});
    }
  });
}
