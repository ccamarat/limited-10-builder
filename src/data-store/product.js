const contains = (array, optionValue) => {
  return array.find((value) => {
    return value === optionValue;
  });
};

export default class Product {
  constructor (raw) {
    Object.assign(this, raw);
    this.variants.forEach((variant) => {
      variant.option_values.forEach((optionValue, index) => {
        let values = raw.options[index].values;
        optionValue = optionValue.value;
        if (!values) {
          values = raw.options[index].values = [];
          raw.options[index].selected = optionValue; // self-select first option
          values.push(optionValue);
        } else if (!contains(values, optionValue)) {
          values.push(optionValue);
        }
      });
    });
  }
}
