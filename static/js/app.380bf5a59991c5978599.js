webpackJsonp([1],Array(28).concat([
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getFullProductTitle;
function getFullProductTitle(product) {
  var title = product.title;

  while (product.parent) {
    product = product.parent;
    title = product.title + "." + title;
  }
  return title;
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APPLY_CONSTRAINT; });
/* unused harmony export CONFIGURE_CONSTRAINTS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD_TO_CART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CHECKOUT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CHECKOUT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CHECKOUT_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return RECEIVE_PRODUCTS; });
var APPLY_CONSTRAINT = 'APPLY_CONSTRAINT';
var CONFIGURE_CONSTRAINTS = 'CONFIGURE_CONSTRAINTS';
// export const CONFIGURE_OPTION = 'CONFIGURE_OPTION';
var ADD_TO_CART = 'ADD_TO_CART';
var CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
var CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
var CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
var RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createCart;
/* harmony export (immutable) */ __webpack_exports__["c"] = findCartItem;
/* unused harmony export setValue */
/* harmony export (immutable) */ __webpack_exports__["a"] = addProduct;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutation_types__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_cartUtil__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__products__ = __webpack_require__(69);





function createCart(shopifyClient) {
  var _mutations;

  var state = {
    added: [],
    checkoutStatus: null
  };

  var getters = {
    checkoutStatus: function checkoutStatus(state) {
      return state.checkoutStatus;
    }
  };

  var actions = {
    checkout: function checkout(_ref, products) {
      var commit = _ref.commit,
          state = _ref.state;

      commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* CHECKOUT_REQUEST */]);
      setTimeout(function () {
        commit(__WEBPACK_IMPORTED_MODULE_1__mutation_types__["e" /* CHECKOUT_SUCCESS */]);
      }, Math.random() * 1000);
    }
  };

  var mutations = (_mutations = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["a" /* ADD_TO_CART */], function (state, item) {
    state.lastCheckout = null;

    var value = item.option;
    var config = item.product.config;

    var _findCartItem = findCartItem(item.product, state),
        title = _findCartItem.title,
        existing = _findCartItem.existing;

    if (!existing) {
      existing = {
        title: title,
        values: []
      };
      state.added.push(existing);
    }
    setValue(existing, value, config);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["d" /* CHECKOUT_REQUEST */], function (state) {
    // clear cart
    state.added = {};
    state.checkoutStatus = null;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["e" /* CHECKOUT_SUCCESS */], function (state) {
    state.checkoutStatus = 'successful';
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["c" /* CHECKOUT_FAILURE */], function (state, _ref2) {
    var savedCartItems = _ref2.savedCartItems;

    // rollback to the cart saved before sending the request
    state.added = savedCartItems;
    state.checkoutStatus = 'failed';
  }), _mutations);

  return {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  };
}

function findCartItem(product, state) {
  var title = Object(__WEBPACK_IMPORTED_MODULE_2__services_cartUtil__["a" /* getFullProductTitle */])(product);
  var existing = state.added.find(function (p) {
    return p.title === title;
  });
  return { title: title, existing: existing };
}

function setValue(item, value, config) {
  if (config.multiSelect) {
    if (!item.values.includes(value)) {
      item.values.push(value);
    } else {
      item.values.splice(item.values.indexOf(value), 1);
    }
  } else if (item.values.includes(value)) {
    // Already added; do nothing.
  } else if (item.values.length > 0) {
    item.values.splice(0, 1, value);
  } else {
    item.values.push(value);
  }
}

function addProduct(dispatch, product) {
  var enabledValues = Object(__WEBPACK_IMPORTED_MODULE_3__products__["b" /* getDefaultEnabledValues */])(product);
  if (enabledValues.length === 0 && product.options.length > 0) {
    console.warn('Could not set default value on product ' + product.title + '. The requested value does not exist.');
  } else {
    enabledValues.forEach(setValue);
  }

  function setValue(option) {
    dispatch('addToCart', {
      product: product,
      option: option
    });
  }
}

/***/ }),
/* 49 */,
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deepCopy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);


/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  // just return if obj is immutable value
  if (obj === null || (typeof obj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(obj)) !== 'object') {
    return obj;
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) {
    return c.original === obj;
  });
  if (hit) {
    return hit.copy;
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0];
}

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createProductStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = getDefaultEnabledValues;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configureProducts__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mutation_types__ = __webpack_require__(29);








function createProductStore(config, shopifyClient) {
  var state = {
    all: [], // This is really a product tree
    variations: [], // This is really a flattened product list, mapped to product ({product, variation})
    options: [] // This is a flattened list of all options, mapped to product ({product, option})
    // TODO: The flattened hierarchies have artificial links to product which is not needed since both option and
    // variation schemas include the parent product
  };

  var getters = {
    allProducts: function allProducts(state) {
      return state.all;
    }
    // TODO: This getter is probably useless
  };

  var actions = {
    getAllProducts: function getAllProducts(_ref) {
      var _this = this;

      var commit = _ref.commit,
          dispatch = _ref.dispatch;
      return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee() {
        var products;
        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return retrieveProducts(shopifyClient);

              case 2:
                products = _context.sent;

                commit(__WEBPACK_IMPORTED_MODULE_6__mutation_types__["f" /* RECEIVE_PRODUCTS */], { products: products });
                dispatch('configureConstraints', { productState: state });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

  var mutations = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_6__mutation_types__["f" /* RECEIVE_PRODUCTS */], function (state, _ref2) {
    var products = _ref2.products;

    var _configureProducts = Object(__WEBPACK_IMPORTED_MODULE_5__configureProducts__["a" /* configureProducts */])(config, products),
        options = _configureProducts.options,
        variations = _configureProducts.variations,
        all = _configureProducts.all;

    state.all = all;
    state.variations = variations;
    state.options = options;
  });

  return {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  };
}

function retrieveProducts(client) {
  return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    var products = localStorage.getItem('products');
    if (products) {
      return resolve(JSON.parse(products));
    }
    client.getProducts(function (_ref3) {
      var products = _ref3.products;

      localStorage.setItem('products', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(products));
      resolve(products);
    });
  });
}

function getDefaultEnabledValues(product) {
  // if product has no options just return
  if (product.options.length === 0) {
    return [];
  }

  var enabledOptions = product.options.filter(function (o) {
    return o.enabled;
  });

  // If 1 or 0, are enabled, no need to keep hunting.
  if (enabledOptions.length === 0) {
    console.warn(product.title + ' has no options enabled.');
    return enabledOptions;
  } else if (enabledOptions.length === 1) {
    // Product only has one option enabled.
    return enabledOptions;
  }

  // Otherwise, hunt away!
  var val = product.config.default;

  if (!val) {
    // Product has no default; returning first available.
    return [enabledOptions[0]];
  }

  if (Array.isArray(val)) {
    var selections = enabledOptions.filter(function (o) {
      return val.includes(o.value);
    });
    if (selections.length > 0) {
      // Found enabled default options for product; returning them.
      return selections;
    }
  } else {
    var selection = enabledOptions.find(function (o) {
      return o.value === val;
    });
    if (selection) {
      // Found enabled default option for product returning it.
      return [selection];
    }
  }

  // All defaults are disabled for product returning first available.
  return [enabledOptions[0]];
}

/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mutations; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_cart__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mutation_types__ = __webpack_require__(29);






var constraints = [];

var actions = {
  configureConstraints: function configureConstraints(_ref) {
    var state = _ref.state;

    constraints = createConstraints(state.products);
  },
  enforceConstraints: function enforceConstraints(vuex, item) {
    constraints.forEach(function (c) {
      c.onchange(vuex, item);
    });
  },
  cleanupCart: function cleanupCart(_ref2, option) {
    var state = _ref2.state,
        dispatch = _ref2.dispatch;

    if (option.enabled) {
      console.warn('option is enabled; nothing changing. Should not be here');
      return;
    }

    var _findCartItem = Object(__WEBPACK_IMPORTED_MODULE_3__modules_cart__["c" /* findCartItem */])(option.product, state.cart),
        existing = _findCartItem.existing;

    var found = existing && existing.values.find(function (i) {
      return i.value === option.value;
    });
    if (found) {
      Object(__WEBPACK_IMPORTED_MODULE_3__modules_cart__["a" /* addProduct */])(dispatch, found.product);
    }
  }
};

var mutations = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_4__mutation_types__["b" /* APPLY_CONSTRAINT */], function (state, _ref3) {
  var option = _ref3.option,
      enabled = _ref3.enabled;

  option.enabled = enabled;
});

function createConstraints(_ref4) {
  var all = _ref4.all,
      variations = _ref4.variations,
      options = _ref4.options;

  var constraints = [];
  variations.forEach(function (v) {
    if (v.variation.config.constraints) {
      var c = v.variation.config.constraints.map(createConstraint.bind(null, v.variation, all));
      constraints.push.apply(constraints, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(c));
    }
  });
  return constraints;
}

function createConstraint(self, allProducts, rule) {
  var peer = findPeer(allProducts, rule.when.source);
  var targets = findTargets(self.options, rule);
  var shouldEnforce = createCheckFn(rule.when);
  var isActive = false;

  function enforce(_ref5) {
    var commit = _ref5.commit,
        dispatch = _ref5.dispatch;

    if (isActive) {
      return;
    }
    targets.forEach(function (option) {
      commit(__WEBPACK_IMPORTED_MODULE_4__mutation_types__["b" /* APPLY_CONSTRAINT */], { option: option, enabled: false });
      dispatch('cleanupCart', option);
    });
    isActive = true;
  }

  function free(_ref6) {
    var commit = _ref6.commit,
        dispatch = _ref6.dispatch;

    if (!isActive) {
      return;
    }
    targets.forEach(function (option) {
      commit(__WEBPACK_IMPORTED_MODULE_4__mutation_types__["b" /* APPLY_CONSTRAINT */], { option: option, enabled: true });
      // not needed cos the constraint is removed, right? - dispatch('cleanupCart', option);
    });
    isActive = false;
  }

  return {
    // BEGIN for debug only
    // title: self.title,
    // peer: peer.title,
    // get isActive () {
    //   return isActive;
    // },
    // END for debug only
    onchange: function onchange(vuex, _ref7) {
      var product = _ref7.product,
          option = _ref7.option;

      if (product !== peer) {
        return;
      }
      if (shouldEnforce(option)) {
        enforce(vuex);
      } else {
        free(vuex);
      }
    }
  };
}

function createCheckFn(rule) {
  if (rule.hasOwnProperty('is')) {
    return function (option) {
      return option.value === rule.is;
    };
  }

  if (rule.hasOwnProperty('in')) {
    return function (option) {
      return rule.in.includes(option.value);
    };
  }

  if (rule.hasOwnProperty('greaterThan')) {
    return function (option) {
      return option.value > rule.greaterThan;
    };
  }

  console.warn('could not create check function for "' + rule + '"');
}

function findPeer(products, source) {
  var _source$split = source.split('.'),
      _source$split2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default()(_source$split),
      needle = _source$split2[0],
      rest = _source$split2.slice(1);

  var product = products.find(function (p) {
    return p.title === needle;
  });

  if (!product || rest.length && !product.variations) {
    console.warn('Could not locate peer for "' + source + '"; possible misconfiguration');
  } else if (rest.length && product.variations) {
    product = findPeer(product.variations, rest.join('.'));
  }
  return product;
}

function findTargets(options, rule) {
  var values = rule.enable || rule.disable;
  if (rule.enable) {
    return options.filter(function (o) {
      return !values.includes(o.value);
    });
  } else {
    return options.filter(function (o) {
      return values.includes(o.value);
    });
  }
}

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_store__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_CurrencyFilter__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sample_config__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_ShopifyClient__ = __webpack_require__(172);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.








__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4__services_CurrencyFilter__["a" /* CurrencyFilter */]);

var client = new __WEBPACK_IMPORTED_MODULE_6__services_ShopifyClient__["a" /* ShopifyClient */](__WEBPACK_IMPORTED_MODULE_5__sample_config__["shopify"]);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__components_App_vue__["a" /* default */] },
  store: Object(__WEBPACK_IMPORTED_MODULE_3__stores_store__["a" /* createStore */])(__WEBPACK_IMPORTED_MODULE_5__sample_config__, client)
});

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_549db798_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(126);
function injectStyle (ssrContext) {
  __webpack_require__(78)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_549db798_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 78 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 79 */,
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProductListContainer_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cart_vue__ = __webpack_require__(123);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    ProductListContainer: __WEBPACK_IMPORTED_MODULE_0__ProductListContainer_vue__["a" /* default */],
    Cart: __WEBPACK_IMPORTED_MODULE_1__Cart_vue__["a" /* default */]
  }
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductListContainer_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b8a9bed_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductListContainer_vue__ = __webpack_require__(122);
function injectStyle (ssrContext) {
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4b8a9bed"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductListContainer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b8a9bed_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductListContainer_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProductList_vue__ = __webpack_require__(99);


//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    ProductList: __WEBPACK_IMPORTED_MODULE_3__ProductList_vue__["a" /* default */]
  },

  computed: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['allProducts']),

  methods: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])(['addToCart']),

  created: function created() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.$store.dispatch('getAllProducts');

            case 2:
              _this.$store.dispatch('addDefaultItemsToCart');

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});

/***/ }),
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductList_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56176aa4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductList_vue__ = __webpack_require__(121);
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56176aa4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OptionList_vue__ = __webpack_require__(101);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'product-list',

  components: {
    OptionList: __WEBPACK_IMPORTED_MODULE_0__OptionList_vue__["a" /* default */]
  },

  props: {
    products: Array
  },

  data: function data() {
    return {
      level: getLevel(this.products[0])
    };
  },


  methods: {
    isVisible: function isVisible() {
      return this.products.length > 0;
    },
    hasOptions: function hasOptions(product) {
      return product.options.length > 0;
    },
    hasChildren: function hasChildren(product) {
      return product.variations.length > 0;
    }
  }
});

function getLevel(product) {
  var level = 2;
  while (product) {
    level++;
    product = product.parent;
  }
  return 'h' + level;
}

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OptionList_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_892760e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_OptionList_vue__ = __webpack_require__(120);
function injectStyle (ssrContext) {
  __webpack_require__(102)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OptionList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_892760e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_OptionList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__options_ListOption_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__options_CheckboxOption_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__options_TextBoxOption_vue__ = __webpack_require__(116);
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    ListOption: __WEBPACK_IMPORTED_MODULE_0__options_ListOption_vue__["a" /* default */],
    CheckboxOption: __WEBPACK_IMPORTED_MODULE_1__options_CheckboxOption_vue__["a" /* default */],
    TextboxOption: __WEBPACK_IMPORTED_MODULE_2__options_TextBoxOption_vue__["a" /* default */]
  },

  props: {
    options: Array,
    product: Object
  },

  computed: {
    componentType: function componentType() {
      var valueType = this.product.config.type || String;
      switch (valueType) {
        case Boolean:
          {
            return 'checkbox-option';
          }
        case 'textbox':
          {
            return 'textbox-option';
          }
        default:
          {
            return 'list-option';
          }
      }
    }
  }
});

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListOption_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a10961d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ListOption_vue__ = __webpack_require__(111);
function injectStyle (ssrContext) {
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7a10961d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a10961d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ListOption_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cartUtil__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(15);

//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    options: Array,
    product: Object
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['cart']), {
    selections: function selections() {
      var title = Object(__WEBPACK_IMPORTED_MODULE_1__services_cartUtil__["a" /* getFullProductTitle */])(this.product);
      var cartItem = this.cart.find(function (p) {
        return p.title === title;
      });
      return cartItem ? cartItem.values : [];
    }
  }),
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])(['addToCart']))
});

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.options.length > 0)?_c('div',{staticClass:"content"},_vm._l((_vm.options),function(option){return _c('a',{staticClass:"button",class:{'is-success': _vm.selections.includes(option)},attrs:{"disabled":!option.enabled},on:{"click":function($event){_vm.addToCart({product: _vm.product, option: option})}}},[_vm._v("\n    "+_vm._s(option.value)+"\n  ")])})):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CheckboxOption_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37b19e02_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_CheckboxOption_vue__ = __webpack_require__(115);
function injectStyle (ssrContext) {
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-37b19e02"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CheckboxOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37b19e02_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_CheckboxOption_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cartUtil__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(15);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    options: Array,
    product: Object
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['cart']), {
    selectedOption: function selectedOption() {
      var title = Object(__WEBPACK_IMPORTED_MODULE_1__services_cartUtil__["a" /* getFullProductTitle */])(this.product);
      var cartItem = this.cart.find(function (p) {
        return p.title === title;
      });
      return cartItem ? cartItem.values[0] : this.options[0];
    },
    isDisabled: function isDisabled() {
      return !!this.options.find(function (o) {
        return !o.enabled;
      });
    }
  }),
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])(['addToCart']), {
    toggleCart: function toggleCart() {
      var _this = this;

      var option = this.options.find(function (o) {
        return o !== _this.selectedOption;
      });
      this.addToCart({ product: this.product, option: option });
    }
  })
});

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"button",class:{'is-success': _vm.selectedOption.value},attrs:{"disabled":_vm.isDisabled},on:{"click":_vm.toggleCart}},[_vm._v("\n  "+_vm._s(_vm.product.title)+"\n")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TextBoxOption_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_187114f9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_TextBoxOption_vue__ = __webpack_require__(119);
function injectStyle (ssrContext) {
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-187114f9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TextBoxOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_187114f9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_TextBoxOption_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    options: Array,
    product: Object
  }
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{attrs:{"type":"text"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.componentType,{tag:"component",attrs:{"options":_vm.options,"product":_vm.product}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible())?_c('div',_vm._l((_vm.products),function(p){return _c('div',{staticClass:"content",staticStyle:{"display":"flex"}},[(_vm.hasChildren(p))?_c('div',{staticClass:"box"},[_c(_vm.level,{tag:"component"},[_vm._v("\n        "+_vm._s(p.title)+" - "+_vm._s(_vm._f("currency")(p.price))+"\n      ")]),_vm._v(" "),_c('product-list',{attrs:{"products":p.variations}})],1):_vm._e(),_vm._v(" "),(_vm.hasOptions(p))?_c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-heading"},[_vm._v("\n          "+_vm._s(p.title)+" - "+_vm._s(_vm._f("currency")(p.price))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"panel-block"},[_c('option-list',{attrs:{"options":p.options,"product":p}})],1)]):_vm._e()])})):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('product-list',{staticStyle:{"display":"flex","flex-wrap":"wrap"},attrs:{"products":_vm.allProducts}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06fcf38e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__ = __webpack_require__(125);
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06fcf38e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(15);

//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapGetters */])({
    products: 'cartProducts',
    checkoutStatus: 'checkoutStatus'
  }), {
    total: function total() {
      return this.products.reduce(function (total, p) {
        return total + p.price * p.quantity;
      }, 0);
    }
  }),
  methods: {
    checkout: function checkout(products) {
      this.$store.dispatch('checkout', products);
    }
  }
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cart"},[_c('p',{directives:[{name:"show",rawName:"v-show",value:(!_vm.products.length),expression:"!products.length"}]},[_c('i',[_vm._v("Please add some products to cart.")])]),_vm._v(" "),_c('ul',_vm._l((_vm.products),function(p){return _c('li',[_vm._v("\n      "+_vm._s(p.title)+" - "+_vm._s(_vm._f("currency")(p.price))+" x "+_vm._s(p.quantity)+"\n    ")])})),_vm._v(" "),_c('p',[_vm._v("Total: "+_vm._s(_vm._f("currency")(_vm.total)))]),_vm._v(" "),_c('p',[_c('button',{attrs:{"disabled":!_vm.products.length},on:{"click":function($event){_vm.checkout(_vm.products)}}},[_vm._v("Checkout")])]),_vm._v(" "),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.checkoutStatus),expression:"checkoutStatus"}]},[_vm._v("Checkout "+_vm._s(_vm.checkoutStatus)+".")])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"section"},[_c('h1',[_vm._v("Gun Builder Constraint Checker")]),_vm._v(" "),_c('div',{staticClass:"content",attrs:{"id":"app"}},[_c('h2',[_vm._v("Select Options")]),_vm._v(" "),_c('product-list-container')],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutations__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_products__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_cart__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_logger__ = __webpack_require__(156);








var debug = "production" !== 'production';

function createStore(config, shopifyClient) {
  var products = Object(__WEBPACK_IMPORTED_MODULE_4__modules_products__["a" /* createProductStore */])(config, shopifyClient);
  var cart = Object(__WEBPACK_IMPORTED_MODULE_5__modules_cart__["b" /* createCart */])(shopifyClient);

  return new __WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* default */].Store({
    actions: __WEBPACK_IMPORTED_MODULE_1__actions__,
    mutations: __WEBPACK_IMPORTED_MODULE_2__mutations__,
    getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
    modules: {
      cart: cart,
      products: products
    },
    strict: debug,
    plugins: debug ? [Object(__WEBPACK_IMPORTED_MODULE_6__services_logger__["a" /* createLogger */])()] : []
  });
}

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configureConstraints", function() { return configureConstraints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforceConstraints", function() { return enforceConstraints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanupCart", function() { return cleanupCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToCart", function() { return addToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSyncdItems", function() { return updateSyncdItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDefaultItemsToCart", function() { return addDefaultItemsToCart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cartUtil__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_cart__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constraints__ = __webpack_require__(74);






var configureConstraints = __WEBPACK_IMPORTED_MODULE_3__constraints__["a" /* actions */].configureConstraints;
var enforceConstraints = __WEBPACK_IMPORTED_MODULE_3__constraints__["a" /* actions */].enforceConstraints;
var cleanupCart = __WEBPACK_IMPORTED_MODULE_3__constraints__["a" /* actions */].cleanupCart;

var addToCart = function addToCart(_ref, item) {
  var commit = _ref.commit,
      dispatch = _ref.dispatch,
      state = _ref.state;

  if (!item.option.enabled) {
    return;
  }

  var title = Object(__WEBPACK_IMPORTED_MODULE_1__services_cartUtil__["a" /* getFullProductTitle */])(item.product);
  var lineItem = state.cart.added.find(function (i) {
    return i.title === title;
  });

  if (item.product.config.multiSelect || !lineItem || !lineItem.values.includes(item.option)) {
    commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["a" /* ADD_TO_CART */], item);
    dispatch('updateSyncdItems', { title: title, selection: item.option });
    dispatch('enforceConstraints', item);
  }
};

var updateSyncdItems = function updateSyncdItems(_ref2, _ref3) {
  var dispatch = _ref2.dispatch,
      state = _ref2.state;
  var title = _ref3.title,
      selection = _ref3.selection;

  state.products.all.forEach(syncItem);

  function syncItem(product) {
    if (product.config.master === title) {
      var option = product.options.find(function (o) {
        return o.value === selection.value;
      });
      dispatch('addToCart', { product: product, option: option });
    }
    product.variations.forEach(syncItem);
  }
};

var addDefaultItemsToCart = function addDefaultItemsToCart(_ref4) {
  var dispatch = _ref4.dispatch,
      state = _ref4.state;

  state.products.variations.forEach(function (item) {
    Object(__WEBPACK_IMPORTED_MODULE_2__modules_cart__["a" /* addProduct */])(dispatch, item.variation);
  });
};

/***/ }),
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureProducts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_util__ = __webpack_require__(50);



function configureProducts(config, products) {
  var options = [];
  var variations = [];
  var all = config.products.map(function (pConf) {
    var p = Object(__WEBPACK_IMPORTED_MODULE_1__services_util__["a" /* deepCopy */])(products.find(function (p) {
      return p.title === pConf.title;
    }));

    p.id = p.product_id;

    p.config = Object(__WEBPACK_IMPORTED_MODULE_1__services_util__["a" /* deepCopy */])(pConf);

    p.price = Number(p.variants[0].price);

    p.options = (p.config.options || []).map(createOption.bind(null, p));

    p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

    if (p.options.length) {
      options.push.apply(options, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.options.map(function (o) {
        return { product: p, option: o };
      })));
    }

    if (p.variations.length) {
      variations.push.apply(variations, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.variations.map(function (v) {
        return { product: p, variation: v };
      })));
    }

    // All products are variations. Or is it vice versa? Or both?
    variations.push({ product: null, variation: p });

    return p;
  });

  return { options: options, variations: variations, all: all };
}

var createOption = function createOption(p, v) {
  return { product: p, value: v, enabled: true };
};

var createVariant = function createVariant(options, variations, product, vConf) {
  var p = {};

  p.parent = product;

  p.title = vConf.title;

  p.config = vConf;

  p.options = (p.config.options || []).map(createOption.bind(null, p));

  p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

  if (p.options.length) {
    options.push.apply(options, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.options.map(function (o) {
      return { product: p, option: o };
    })));
  }

  if (p.variations.length) {
    variations.push.apply(variations, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.variations.map(function (v) {
      return { product: p, variation: v };
    })));
  }

  return p;
};

/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APPLY_CONSTRAINT", function() { return APPLY_CONSTRAINT; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constraints__ = __webpack_require__(74);


var APPLY_CONSTRAINT = __WEBPACK_IMPORTED_MODULE_0__constraints__["b" /* mutations */].APPLY_CONSTRAINT;

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartProducts", function() { return cartProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cart", function() { return cart; });
var cartProducts = function cartProducts(state) {
  return state.cart.added.map(function (item) {
    return {};
  });
};

var cart = function cart(state) {
  return state.cart.added;
};

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(50);
// Credits: borrowed code from fcomb/redux-logger



var DO_LOG = false;

function createLogger() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$collapsed = _ref.collapsed,
      collapsed = _ref$collapsed === undefined ? true : _ref$collapsed,
      _ref$filter = _ref.filter,
      filter = _ref$filter === undefined ? function (mutation, stateBefore, stateAfter) {
    return true;
  } : _ref$filter,
      _ref$transformer = _ref.transformer,
      transformer = _ref$transformer === undefined ? function (state) {
    return state;
  } : _ref$transformer,
      _ref$mutationTransfor = _ref.mutationTransformer,
      mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
    return mut;
  } : _ref$mutationTransfor;

  if (!DO_LOG) {
    return function () {};
  }

  return function (store) {
    var prevState = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* deepCopy */])(store.state);

    store.subscribe(function (mutation, state) {
      if (typeof console === 'undefined') {
        return;
      }
      var nextState = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* deepCopy */])(state);

      if (filter(mutation, prevState, nextState)) {
        var time = new Date();
        var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
        var formattedMutation = mutationTransformer(mutation);
        var message = 'mutation ' + mutation.type + formattedTime;
        var startMessage = collapsed ? console.groupCollapsed : console.group;

        // render
        try {
          startMessage.call(console, message);
        } catch (e) {
          console.log(message);
        }

        console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
        console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
        console.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

        try {
          console.groupEnd();
        } catch (e) {
          console.log('—— log end ——');
        }
      }

      prevState = nextState;
    });
  };
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


var digitsRE = /(\d{3})(?=\d)/g;

var CurrencyFilter = function () {
  function CurrencyFilter() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, CurrencyFilter);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(CurrencyFilter, null, [{
    key: 'install',
    value: function install(Vue) {
      Vue.filter('currency', currency);
    }
  }]);

  return CurrencyFilter;
}();

function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || !value && value !== 0) return '';
  currency = currency != null ? currency : '$';
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  var _float = decimals ? stringified.slice(-1 - decimals) : '';
  var sign = value < 0 ? '-' : '';
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
}

/***/ }),
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "products", function() { return products; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productMap", function() { return productMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shopify", function() { return shopify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);

var products = [{
  title: 'Caliber',
  options: ['9mm', '.38 SC', '.40', '10mm', '.45'],
  default: '.40'
}, {
  title: 'Top End Options',
  variations: [{
    title: 'Compensated',
    type: Boolean,
    options: [true, false],
    default: true
  }, {
    title: 'Barrel Configuration',
    options: ['Standard', '3/4" Tungsten Sleeve', '3/4" Bull Barrel', 'Bushing', 'Sightblock'],
    default: '3/4" Tungsten Sleeve',
    constraints: [{
      when: {
        source: 'Top End Options.Compensated',
        is: true
      },
      disable: ['Bushing', 'Sightblock']
    }]
  }, {
    title: 'Length',
    type: Number,
    options: [4.25, 4.5, 5, 5.4, 6],
    default: 4.5,
    constraints: [{
      when: {
        source: 'Top End Options.Compensated',
        is: true
      },
      enable: [4.5, 5]
    }, {
      when: {
        source: 'Top End Options.Compensated',
        is: false
      },
      disable: [4.5]
    }, {
      when: {
        source: 'Top End Options.Barrel Configuration',
        is: 'Bushing'
      },
      enable: [4.25, 5, 6]
    }, {
      when: {
        source: 'Top End Options.Barrel Configuration',
        is: 'Sightblock'
      },
      enable: [5, 5.4, 6]
    }]
  }, {
    title: 'w/ Popple Holes',
    type: Boolean,
    options: [true, false],
    default: true,
    constraints: [{
      when: {
        source: 'Top End Options.Compensated',
        is: false
      },
      disable: [true]
    }]
  }]
}, {
  title: 'Performance Options',
  multiSelect: true,
  options: ['Stroked', 'Front Internal Lightening', 'Rear Internal Lightening'],
  default: ['Stroked', 'Rear Internal Lightening'],
  constraints: [{
    when: {
      source: 'Top End Options.Barrel Configuration',
      in: ['3/4" Tungsten Sleeve', '3/4" Bull Barrel']
    },
    disable: ['Front Internal Lightening']
  }]
}, {
  title: 'Slide Options',
  variations: [{
    title: 'Slide Length',
    hidden: true,
    options: [4.25, 4.5, 5, 5.4, 6],
    master: 'Top End Options.Length'
  }, {
    title: 'Top',
    options: ['Top', 'Flat Top', 'Tri-Top', 'Partial Tri-Top', 'Round', 'Signature'],
    default: 'Signature'
  }, {
    title: 'Serrations',
    options: ['4 LPI', '8 LPI', 'Signature'],
    default: 'Signature'
  }, {
    title: 'Panel Cuts',
    type: Boolean,
    options: [true, false],
    default: true
  }, {
    title: 'Front Serrations',
    options: ['Standard', 'Reverse High Power', 'Butler', 'High Power', '4 LPI', '8 LPI', 'Signature'],
    default: 'Signature'
  }, {
    title: 'Material',
    options: ['Stainless', 'Carbon Steel'],
    default: 'Carbon Steel'
  }]
}, {
  title: 'Frame Options',
  variations: [{
    title: 'Configuration',
    options: ['Long Wide', 'Heavy Long Wide', 'Tactical'],
    default: 'Heavy Long Wide'
  }, {
    title: 'Length',
    options: ['Butler', 'Full', 'Standard'],
    default: 'Full',
    constraints: [{
      when: {
        source: 'Top End Options.Length',
        greaterThan: 5
      },
      disable: ['Full']
    }]
  }, {
    title: 'Material',
    options: ['Steel', 'Stainless', 'Aluminum'],
    default: 'Steel'
  }]
}, {
  title: 'Grip Options',
  variations: [{
    title: 'Material',
    options: ['Steel', 'Stainless', 'Aluminum', 'Polymer'],
    default: 'Steel'
  }, {
    title: 'Length',
    options: ['Full-Size', 'Compact'],
    default: 'Full-Size',
    // I'm not entirely sure how to interpret the magwell/grip length constraints Is it basically, "when length
    // is full-size, disable compact, and when it's compact, disable full-size?"
    constraints: [{
      when: {
        source: 'Magwell',
        in: ['Compact', 'None']
      },
      disable: ['Full-Size']
    }]
  }, {
    title: 'Grip Texture',
    options: ['WarDrum Medium', 'WarDrum Velvet', 'Signature Aggressive', 'Signature Blank', 'Signature Medium'],
    default: 'Signature Blank'
  }]
}, {
  title: 'Magwell',
  options: ['Competition', 'Compact', 'None'],
  default: 'Competition'
}, {
  title: 'Thumb Safety',
  variations: [{
    title: 'Paddle',
    type: Array,
    variations: [{
      title: 'Ambi',
      type: Boolean,
      options: [true, false],
      default: true
    }, {
      title: 'Shield',
      type: Boolean,
      options: [true, false],
      default: true
    }]
  }, {
    title: 'Width',
    options: ['Wide', 'Extra Wide'],
    default: 'Extra Wide'
  }]
}, {
  title: 'Sights',
  options: ['Tritium Novak', 'Adjustable Bomar w/ Fiber Front', 'RTS2', 'RMR w/ Tritium'],
  default: 'Adjustable Bomar w/ Fiber Front'
}, {
  title: 'Slide Racker',
  type: Boolean,
  options: [true, false],
  default: false
}, {
  title: 'Gas Pedal',
  type: Boolean,
  options: [true, false],
  default: false
}, {
  title: 'Guide Rod',
  options: ['FLGR', 'GI', 'Tungsten FLGR'],
  default: 'FLGR'
}, {
  title: 'Trigger',
  variations: [{
    title: 'Length',
    options: ['Standard', 'Long', 'Short'],
    default: 'Standard'
  }, {
    title: 'Shape',
    options: ['Flat', 'Curved'],
    default: 'Flat'
  }, {
    title: 'Weight',
    type: 'range',
    min: 2.0,
    max: 4.75,
    increment: 0.25,
    default: 2.75
  }]
}, {
  title: 'Grip Safety Pinned',
  type: Boolean,
  options: [true, false],
  default: false
}, {
  title: 'Custom Serial',
  type: 'textbox'
}];

var productMap = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a();
products.forEach(function (item) {
  return productMap.set(item.title, item);
});

var shopify = {
  client: {
    accessToken: 'cccc9170b9d1911d095a199a51df92d4',
    domain: 'rails-test-42.myshopify.com',
    appId: '6'
  },
  collection: {
    id: 442402061
  }
};

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ShopifyClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_shopify_buy__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_shopify_buy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_shopify_buy__);



function ShopifyClient(config) {
  var products = void 0,
      collection = void 0;
  var client = __WEBPACK_IMPORTED_MODULE_1_shopify_buy___default.a.buildClient(config.client);

  var isLoaded = function isLoaded() {
    return products && collection;
  };

  // TODO: Return a promise
  this.getProducts = function (resolve) {
    var reject = function reject(err) {
      console.error('error loading product', err);
    };
    // return new Promise((resolve, reject) => {
    var maybeReturn = function maybeReturn() {
      if (isLoaded()) {
        resolve({
          collection: collection,
          products: products
        });
      }
    };

    // The Shopify Client wraps the raw response in a class, which we just toss. The raw props are on an "attrs" object
    // so we copy those and treat them as the raw data.
    var unpackResponse = function unpackResponse(response) {
      return response.map(function (item) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* deepCopy */])(item.attrs);
      });
    };

    client.fetchCollection(config.collection.id).then(function (response) {
      collection = unpackResponse([response])[0];
      maybeReturn();
    }).catch(reject);

    client.fetchQueryProducts({ collection_id: config.collection.id }).then(function (response) {
      products = unpackResponse(response);
      maybeReturn();
    }).catch(reject);
  };
}

/***/ }),
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
]),[75]);
//# sourceMappingURL=app.380bf5a59991c5978599.js.map