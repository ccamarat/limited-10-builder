const contains = (array, optionValue) => {
  return array.find((value) => {
    return value === optionValue;
  });
};

export default class Product {
  constructor(raw) {
    const self = this;
    // graft the raw data structure onto `this` object
    Object.assign(self, raw);

    // TODO: Move this info to "selections"
    self.getSelectedVariant = () => {
      const variantName = self.options.map(option => option.selected).join(' / ');
      return self.variants.find(variant => variant.title === variantName);
    };
    self.getSelectedVariantId = () => {
      return self.getSelectedVariant().id;
    };

    // while the raw data contains an "options" object, that object doesn't actually contain the list of values available
    // for itself. To get it, we need to iterate through the variants instead.
    self.variants.forEach((variant) => {
      variant.option_values.forEach((optionValue, index) => {
        let values = raw.options[index].values;
        optionValue = optionValue.value;
        if (!values) {
          values = raw.options[index].values = [];
          raw.options[index].selected = optionValue; // self-select first option
        }
        if (!contains(values, optionValue)) {
          values.push(optionValue);
        }
      });
    });
  }
}
