import { deepCopy } from '../services/util';
import { MUTATIONS } from './products';

export function retrieveProducts (client) {
  return new Promise((resolve, reject) => {
    let products = localStorage.getItem('products');
    if (products) {
      return resolve(JSON.parse(products));
    }
    client.getProducts(({products}) => {
      localStorage.setItem('products', JSON.stringify(products));
      resolve(products);
    });
  });
}

export function configureProducts (config, products) {
  const options = [];
  const variations = [];
  const tree = config.products.map(pConf => {
    const p = deepCopy(
      products.find(p => p.title === pConf.title)
    );

    p.id = p.product_id;

    p.config = deepCopy(pConf);

    p.price = Number(p.variants[0].price);

    p.options = (p.config.options || []).map(createOption.bind(null, p));

    p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

    if (p.options.length) {
      options.push(...p.options);
      // options.push(...p.options.map(o => ({product: p, option: o})));
    }

    if (p.variations.length) {
      variations.push(...p.variations);
      // variations.push(...p.variations.map(v => ({product: p, variation: v})));
    }

    // All products are variations. Or is it vice versa? Or both?
    variations.push(p);
    // variations.push({product: null, variation: p});

    p.set = getSetter(p);

    return p;
  });

  return {options, variations, tree};
}

const createOption = (p, v) => ({
  product: p,
  value: v,
  enabled: true,
  selected: false
});

const createVariant = (options, variations, product, vConf) => {
  const p = {};

  p.parent = product;

  p.title = vConf.title;

  p.config = vConf;

  p.options = (p.config.options || []).map(createOption.bind(null, p));

  p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

  if (p.options.length) {
    options.push(...p.options);
    // options.push(...p.options.map(o => ({product: p, option: o})));
  }

  if (p.variations.length) {
    variations.push(...p.variations);
    // variations.push(...p.variations.map(v => ({product: p, variation: v})));
  }

  p.set = getSetter(p);

  return p;
};

function getSetter (product) {
  if (product.config.multiSelect) {
    return function (commit, option) {
      // Toggle selected if already selected
      commit(option.selected ? MUTATIONS.DESELECT_OPTION : MUTATIONS.SELECT_OPTION, {option});
    };
  }

  return function (commit, option) {
    // First deselect current
    const current = this.options.find(o => o.selected);
    if (current) {
      commit(MUTATIONS.DESELECT_OPTION, {option: current});
    }
    // Then select new
    commit(MUTATIONS.SELECT_OPTION, {option});
  };
}
