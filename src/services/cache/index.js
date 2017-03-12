// Hoarked from https://github.com/neilstuartcraig/TDPBrowserCache.

import localStorageBackend from "./localstorage-backend";
import fallbackBackend from "./in-memory-backend";

export function Cache (options) {
  // Default options
  let backend = null;
  let preferLocalStorage = true;
  let keyNamespace = `__BC_`;

  // Defaults for safety - these get overwritten during init()
  let backendSetter = function () {
    throw new Error(`ERROR: Backend setter not defined!`);
  };
  let backendGetter = function () {
    throw new Error(`ERROR: Backend getter not defined!`);
  };
  let backendPurger = function () {
    throw new Error(`ERROR: Backend purger not defined!`);
  };

  const init = function (options) {
    options = typeof options === `object` ? options : {};

    // Default option values
    keyNamespace = options.keyNamespace !== undefined ? options.keyNamespace : keyNamespace;
    preferLocalStorage = options.preferLocalStorage !== undefined ? options.preferLocalStorage : preferLocalStorage;

    // Select the backend to use
    if (preferLocalStorage && isLocalStorageSupported()) {
      backend = localStorageBackend;
    } else {
      backend = fallbackBackend;
    }

    backendSetter = backend.setter;
    backendGetter = backend.getter;
    backendPurger = backend.purger;

    return true;
  };

  const isLocalStorageSupported = () => {
    try {
      return `localStorage` in window && window[`localStorage`] !== null;
    } catch (e) {
      return false;
    }
  };

  this.set = (key, value, ttl) => {
    // Find the type of the value...
    const vt = typeof value;

    // key and value are required...functions get stringified and thus broken so let's not allow their use as a value
    if (key !== undefined && value !== undefined && vt !== `function`) {
      // Add namespace to key
      key = keyNamespace + key;

      // Ignore ttl if it's not a number
      ttl = (typeof ttl === `number` && ttl >= 0) ? ttl : 0;

      const valueObject = JSON.stringify({
        // We'll store a 0 for omitted TTLs because it takes up less storage space than a timestamp
        e: ttl === 0 ? 0 : new Date().getTime() + ttl,
        d: JSON.stringify(value)
      });

      // Also need to handle the failure states e.g. storage full

      return backendSetter(key, valueObject);
    } else {
      // Bad request, key and value are required
      return null;
    }
  };

  this.get = (key) => {
    if (typeof key === `string`) {
      // Add namespace to key
      key = keyNamespace + key;

      const res = backendGetter(key);

      if (res !== null) {
        const v = JSON.parse(res);
        // If the item has no ttl/expiration set or it's within its ttl then return it
        if (v.e === 0 || v.e >= new Date().getTime()) {
          return JSON.parse(v.d);
        } else { // Else (Item has expired...)
          // ...purge it from the backend
          backendPurger(key);
          return null;
        }
      }
    }

    return null;
  };

  this.purge = function (key) {
    if (typeof key === `string`) {
      // Add namespace to key
      key = keyNamespace + key;

      return backendPurger(key);
    } else {
      return null;
    }
  };

  // Run the initialiser
  return init(options);
};
