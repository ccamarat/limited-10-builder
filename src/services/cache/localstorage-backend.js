const localStorage = window.localStorage;

export default {
  setter: (key, valueObject) => {
    return localStorage.setItem(key, valueObject);
  },
  getter: (key) => {
    return localStorage.getItem(key);
  },
  purger: (key) => {
    // removeItem handles incorrect types as the key (as far as tested so far) so let's keep this simple
    return localStorage.removeItem(key);
  }
};
