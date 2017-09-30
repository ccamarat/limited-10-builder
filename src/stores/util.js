export function findPeer (products, source) {
  const [needle, ...rest] = source.split('.');
  let product = products.find(p => p.title === needle);

  if (!product || (rest.length && !product.variations)) {
    console.warn(`Could not locate peer for "${source}"; possible misconfiguration`);
  } else if (rest.length && product.variations) {
    product = findPeer(product.variations, rest.join('.'));
  }
  return product;
}
