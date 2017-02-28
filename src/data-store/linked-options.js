export const getLinkedOptions = (linkedOptions, products) => {
  const controllers = {}
  let servants = []

  const lookup = (link) => {
    const [productName, optionName] = link.split('.')

    const product = products.find(p => p.title === productName)
    if (!product) {
      console.warn(`Invalid linkedOptions setting '${link}'`)
      return
    }

    const option = product.options.find(o => o.name === optionName)
    if (!option) {
      console.warn(`Invalid linkedOptions setting '${link}'`)
      return
    }

    return option
  }

  Object.keys(linkedOptions).forEach(o => {
    const option = lookup(o)
    const slaves = linkedOptions[o].map(lo => lookup(lo)).filter(o => !!o);
    servants = servants.concat(slaves.map(s => s.id))
    controllers[option.id] = slaves
  })

  return {controllers, servants}
}
