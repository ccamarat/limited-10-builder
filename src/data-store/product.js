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

    // while the raw data contains an "options" object, that object doesn't actually contain the list of values available
    // for itself. To get it, we need to iterate through the variants instead.
    self.variants.forEach((variant) => {
      variant.option_values.forEach((optionValue, index) => {
        let values = raw.options[index].values;
        optionValue = optionValue.value;
        if (!values) {
          values = raw.options[index].values = [];
        }
        if (!contains(values, optionValue)) {
          values.push(optionValue);
        }
      });
    });
  }
}
