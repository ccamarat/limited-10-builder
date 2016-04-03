const storageObj = {};

export default {
  setter: (key, valueObject) => {
    storageObj[key] = valueObject;
  },
  getter: (key) => {
    // We need to return null for non-existent keys
    return storageObj[key] !== undefined ? storageObj[key] : null;
  },
  purger: (key) => {
    delete storageObj[key];
    return null;
  }
};
