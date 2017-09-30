webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MUTATIONS; });
/* harmony export (immutable) */ __webpack_exports__["c"] = createProductStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_init__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constraints__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__linked_products__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__defaults__ = __webpack_require__(123);








var ACTIONS = {
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
  CONFIGURE_LINKED_PRODUCTS: 'CONFIGURE_LINKED_PRODUCTS',
  CONFIGURE_DEFAULTS: 'CONFIGURE_DEFAULTS',
  CONFIGURE_CONSTRAINTS: 'CONFIGURE_CONSTRAINTS',
  SET_VALUE: 'SET_VALUE',
  EVALUATE_CONSTRAINTS: 'EVALUATE_CONSTRAINTS',
  UPDATE_SELECTIONS: 'UPDATE_SELECTIONS',
  UPDATE_LINKED_PRODUCTS: 'UPDATE_LINKED_PRODUCTS',
  APPLY_CONSTRAINTS: 'APPLY_CONSTRAINTS',
  REMOVE_CONSTRAINTS: 'REMOVE_CONSTRAINTS'
};

var MUTATIONS = {
  RECEIVE_ALL_PRODUCTS: 'RECEIVE_ALL_PRODUCTS',
  SELECT_OPTION: 'SELECT_OPTION',
  DESELECT_OPTION: 'DESELECT_OPTION',
  ENABLE_OPTION: 'ENABLE_OPTION',
  DISABLE_OPTION: 'DISABLE_OPTION'
};

function createProductStore(config, shopifyClient) {
  var _actions, _mutations;

  var state = {
    tree: [],
    variations: [],
    options: []
  };

  var activeConstraints = void 0;

  var actions = (_actions = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.GET_ALL_PRODUCTS, function (_ref) {
    var _this = this;

    var commit = _ref.commit,
        dispatch = _ref.dispatch;
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      var products;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(__WEBPACK_IMPORTED_MODULE_3__product_init__["b" /* retrieveProducts */])(shopifyClient);

            case 2:
              products = _context.sent;

              commit(MUTATIONS.RECEIVE_ALL_PRODUCTS, { products: products });

              dispatch(ACTIONS.CONFIGURE_LINKED_PRODUCTS);
              dispatch(ACTIONS.CONFIGURE_DEFAULTS);
              dispatch(ACTIONS.CONFIGURE_CONSTRAINTS);
              dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
              dispatch(ACTIONS.UPDATE_LINKED_PRODUCTS);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.CONFIGURE_LINKED_PRODUCTS, function (_ref2) {
    var state = _ref2.state;

    Object(__WEBPACK_IMPORTED_MODULE_5__linked_products__["a" /* configureLinkedProducts */])(state);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.CONFIGURE_DEFAULTS, function (_ref3) {
    var state = _ref3.state,
        commit = _ref3.commit;

    Object(__WEBPACK_IMPORTED_MODULE_6__defaults__["a" /* configureDefaults */])(state);
    Object(__WEBPACK_IMPORTED_MODULE_6__defaults__["c" /* selectDefaults */])(commit);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.CONFIGURE_CONSTRAINTS, function (_ref4) {
    var state = _ref4.state;

    Object(__WEBPACK_IMPORTED_MODULE_4__constraints__["a" /* configureConstraints */])(state);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.EVALUATE_CONSTRAINTS, function (_ref5) {
    var dispatch = _ref5.dispatch;

    activeConstraints = Object(__WEBPACK_IMPORTED_MODULE_4__constraints__["b" /* evaluateConstraints */])();
    if (activeConstraints.length > 0) {
      dispatch(ACTIONS.APPLY_CONSTRAINTS);
      dispatch(ACTIONS.UPDATE_SELECTIONS);
      // ...and reevaluate constraints.
      dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
    }
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.APPLY_CONSTRAINTS, function (_ref6) {
    var commit = _ref6.commit;

    activeConstraints.forEach(function (c) {
      return c.enforce(commit);
    });
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.UPDATE_SELECTIONS, function (_ref7) {
    var commit = _ref7.commit,
        state = _ref7.state;

    // 1. Find options and related products
    var opts = state.options.filter(function (o) {
      return !o.enabled && o.selected;
    });
    var prods = opts.map(function (o) {
      return o.product;
    }).filter(unique);

    // 2. Deselect disabled options
    opts.forEach(function (option) {
      return commit(MUTATIONS.DESELECT_OPTION, { option: option });
    });

    // 3. Select default or first available
    prods.forEach(function (product) {
      if (product.config.multiSelect) {
        return;
      }
      var selected = product.options.filter(function (o) {
        return o.selected;
      });
      if (selected.length > 0) {
        return;
      }
      var defaults = Object(__WEBPACK_IMPORTED_MODULE_6__defaults__["b" /* getEnabledDefaults */])(product);
      defaults.forEach(function (option) {
        return commit(MUTATIONS.SELECT_OPTION, { option: option });
      });
    });
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.UPDATE_LINKED_PRODUCTS, function (_ref8) {
    var commit = _ref8.commit;

    Object(__WEBPACK_IMPORTED_MODULE_5__linked_products__["b" /* updateLinkedProducts */])(commit);
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_actions, ACTIONS.SET_VALUE, function (_ref9, _ref10) {
    var commit = _ref9.commit,
        dispatch = _ref9.dispatch;
    var product = _ref10.product,
        option = _ref10.option;

    product.set(commit, option);
    dispatch(ACTIONS.EVALUATE_CONSTRAINTS);
    dispatch(ACTIONS.UPDATE_LINKED_PRODUCTS);
  }), _actions);

  var mutations = (_mutations = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, MUTATIONS.RECEIVE_ALL_PRODUCTS, function (state, _ref11) {
    var products = _ref11.products;

    var _configureProducts = Object(__WEBPACK_IMPORTED_MODULE_3__product_init__["a" /* configureProducts */])(config, products),
        options = _configureProducts.options,
        variations = _configureProducts.variations,
        tree = _configureProducts.tree;

    state.tree = tree;
    state.variations = variations;
    state.options = options;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, MUTATIONS.SELECT_OPTION, function (state, _ref12) {
    var option = _ref12.option;

    option.selected = true;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, MUTATIONS.DESELECT_OPTION, function (state, _ref13) {
    var option = _ref13.option;

    option.selected = false;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, MUTATIONS.ENABLE_OPTION, function (state, _ref14) {
    var option = _ref14.option;

    option.enabled = true;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, MUTATIONS.DISABLE_OPTION, function (state, _ref15) {
    var option = _ref15.option;

    option.enabled = false;
  }), _mutations);

  return {
    state: state,
    actions: actions,
    mutations: mutations
  };
}

var unique = function unique(item, index, arr) {
  return arr.indexOf(item) === index;
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deepCopy;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(108);
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
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
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
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = findPeer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__);

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

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_store__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_CurrencyFilter__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sample_config__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_ShopifyClient__ = __webpack_require__(166);
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
/* 73 */,
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_549db798_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(148);
function injectStyle (ssrContext) {
  __webpack_require__(75)
}
var normalizeComponent = __webpack_require__(8)
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
/* 75 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProductListContainer_vue__ = __webpack_require__(78);
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
    ProductListContainer: __WEBPACK_IMPORTED_MODULE_0__ProductListContainer_vue__["a" /* default */]
  }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductListContainer_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b8a9bed_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductListContainer_vue__ = __webpack_require__(147);
function injectStyle (ssrContext) {
  __webpack_require__(79)
}
var normalizeComponent = __webpack_require__(8)
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
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stores_products__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProductList_vue__ = __webpack_require__(124);


//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    ProductList: __WEBPACK_IMPORTED_MODULE_4__ProductList_vue__["a" /* default */]
  },

  computed: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapState */])(['tree']),

  created: function created() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.$store.dispatch(__WEBPACK_IMPORTED_MODULE_3__stores_products__["a" /* ACTIONS */].GET_ALL_PRODUCTS);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
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
/* harmony export (immutable) */ __webpack_exports__["b"] = retrieveProducts;
/* harmony export (immutable) */ __webpack_exports__["a"] = configureProducts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_util__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__products__ = __webpack_require__(7);






function retrieveProducts(client) {
  return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    var products = localStorage.getItem('products');
    if (products) {
      return resolve(JSON.parse(products));
    }
    client.getProducts(function (_ref) {
      var products = _ref.products;

      localStorage.setItem('products', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(products));
      resolve(products);
    });
  });
}

function configureProducts(config, products) {
  var options = [];
  var variations = [];
  var tree = config.products.map(function (pConf) {
    var p = Object(__WEBPACK_IMPORTED_MODULE_3__services_util__["a" /* deepCopy */])(products.find(function (p) {
      return p.title === pConf.title;
    }));

    p.id = p.product_id;

    p.config = Object(__WEBPACK_IMPORTED_MODULE_3__services_util__["a" /* deepCopy */])(pConf);

    p.price = Number(p.variants[0].price);

    p.options = (p.config.options || []).map(createOption.bind(null, p));

    p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

    if (p.options.length) {
      options.push.apply(options, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.options));
      // options.push(...p.options.map(o => ({product: p, option: o})));
    }

    if (p.variations.length) {
      variations.push.apply(variations, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.variations));
      // variations.push(...p.variations.map(v => ({product: p, variation: v})));
    }

    // All products are variations. Or is it vice versa? Or both?
    variations.push(p);
    // variations.push({product: null, variation: p});

    p.set = getSetter(p);

    return p;
  });

  return { options: options, variations: variations, tree: tree };
}

var createOption = function createOption(p, v) {
  return {
    product: p,
    value: v,
    enabled: true,
    selected: false
  };
};

var createVariant = function createVariant(options, variations, product, vConf) {
  var p = {};

  p.parent = product;

  p.title = vConf.title;

  p.config = vConf;

  p.options = (p.config.options || []).map(createOption.bind(null, p));

  p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

  if (p.options.length) {
    options.push.apply(options, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.options));
    // options.push(...p.options.map(o => ({product: p, option: o})));
  }

  if (p.variations.length) {
    variations.push.apply(variations, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(p.variations));
    // variations.push(...p.variations.map(v => ({product: p, variation: v})));
  }

  p.set = getSetter(p);

  return p;
};

function getSetter(product) {
  if (product.config.multiSelect) {
    return function (commit, option) {
      // Toggle selected if already selected
      commit(option.selected ? __WEBPACK_IMPORTED_MODULE_4__products__["b" /* MUTATIONS */].DESELECT_OPTION : __WEBPACK_IMPORTED_MODULE_4__products__["b" /* MUTATIONS */].SELECT_OPTION, { option: option });
    };
  }

  return function (commit, option) {
    // First deselect current
    var current = this.options.find(function (o) {
      return o.selected;
    });
    if (current) {
      commit(__WEBPACK_IMPORTED_MODULE_4__products__["b" /* MUTATIONS */].DESELECT_OPTION, { option: current });
    }
    // Then select new
    commit(__WEBPACK_IMPORTED_MODULE_4__products__["b" /* MUTATIONS */].SELECT_OPTION, { option: option });
  };
}

/***/ }),
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureConstraints;
/* harmony export (immutable) */ __webpack_exports__["b"] = evaluateConstraints;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(71);





var constraints = [];

function configureConstraints(_ref) {
  var tree = _ref.tree,
      variations = _ref.variations;

  variations.forEach(function (v) {
    if (v.config.constraints) {
      var c = v.config.constraints.map(createConstraint.bind(null, v, tree));
      constraints.push.apply(constraints, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(c));
    }
  });
}

function evaluateConstraints() {
  return constraints.filter(function (c) {
    return c.needsAttention();
  });
}

function createConstraint(target, tree, rule) {
  var source = Object(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* findPeer */])(tree, rule.when.source);
  var targetOptions = findTargets(target.options, rule);
  var check = createCheckFn(rule.when);
  var isActive = void 0;
  var nextAction = void 0;

  return {
    source: source,
    target: target,
    targetOptions: targetOptions,
    needsAttention: function needsAttention() {
      var shouldBeActive = !!source.options.find(function (o) {
        return o.selected && check(o);
      });
      var needsAttention = shouldBeActive !== isActive;
      if (needsAttention) {
        nextAction = shouldBeActive ? __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].DISABLE_OPTION : __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].ENABLE_OPTION;
        isActive = shouldBeActive;
      }
      return needsAttention;
    },
    enforce: function enforce(commit) {
      targetOptions.forEach(function (option) {
        return commit(nextAction, { option: option });
      });
      nextAction = null;
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

  console.warn('could not create check function for "' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(rule) + '"');
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
/* 121 */,
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureLinkedProducts;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateLinkedProducts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products__ = __webpack_require__(7);




var links = [];

function configureLinkedProducts(_ref) {
  var tree = _ref.tree,
      variations = _ref.variations;

  variations.forEach(function (v) {
    if (v.config.master) {
      var l = createLinks(v, tree);
      links.push.apply(links, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(l));
    }
  });
}

function createLinks(variation, tree) {
  var source = Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* findPeer */])(tree, variation.config.master);
  return source.options.map(function (source) {
    var target = variation.options.find(function (o) {
      return o.value === source.value;
    });
    return {
      source: source,
      target: target
    };
  });
}

function updateLinkedProducts(commit) {
  links.forEach(function (_ref2) {
    var source = _ref2.source,
        target = _ref2.target;

    var option = target;
    if (source.enabled !== target.enabled) {
      var type = source.enabled ? __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].ENABLE_OPTION : __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].DISABLE_OPTION;
      commit(type, { option: option });
    }
    if (source.selected !== target.selected) {
      var _type = source.selected ? __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].SELECT_OPTION : __WEBPACK_IMPORTED_MODULE_2__products__["b" /* MUTATIONS */].DESELECT_OPTION;
      commit(_type, { option: option });
    }
  });
}

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureDefaults;
/* harmony export (immutable) */ __webpack_exports__["c"] = selectDefaults;
/* harmony export (immutable) */ __webpack_exports__["b"] = getEnabledDefaults;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__products__ = __webpack_require__(7);



var defaults = [];

function configureDefaults(_ref) {
  var variations = _ref.variations;

  variations.forEach(function (v) {
    var def = v.config.default;
    if (!Array.isArray(def)) {
      def = [def];
    }
    defaults.push.apply(defaults, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(v.options.filter(function (o) {
      return def.includes(o.value);
    })));
  });
}

function selectDefaults(commit) {
  defaults.forEach(function (option) {
    return commit(__WEBPACK_IMPORTED_MODULE_1__products__["b" /* MUTATIONS */].SELECT_OPTION, { option: option });
  });
}

function getEnabledDefaults(product) {
  var defs = defaults.filter(function (o) {
    return o.enabled && o.product === product;
  });
  if (defs.length === 0) {
    defs = [product.options.find(function (o) {
      return o.enabled;
    })];
  }
  return defs;
}

/*
export const selectDefaultOptions = (commit, {variations}) => {
  variations.forEach(variation => {
    addProductDefault(commit, variation);
  });
};

function addProductDefault (commit, product) {
  const enabledValues = getDefaultEnabledValues(product);
  if (enabledValues.length === 0 && product.options.length > 0) {
    console.warn(`Could not set default value on product ${product.title}. The requested value does not exist.`);
  } else {
    enabledValues.forEach((option) => {
      commit(MUTATIONS.SELECT_OPTION, {option});
    });
  }
}

function getDefaultEnabledValues (product) {
  // if product has no options just return
  if (product.options.length === 0) {
    return [];
  }

  const enabledOptions = product.options.filter(o => o.enabled);

  // If 1 or 0, are enabled, no need to keep hunting.
  if (enabledOptions.length === 0) {
    console.warn(`${product.title} has no options enabled.`);
    return enabledOptions;
  } else if (enabledOptions.length === 1) {
    // Product only has one option enabled.
    return enabledOptions;
  }

  // Otherwise, hunt away!
  const val = product.config.default;

  if (val === undefined) {
    // Product has no default; returning first available.
    return [enabledOptions[0]];
  }

  if (Array.isArray(val)) {
    const selections = enabledOptions.filter(o => val.includes(o.value));
    if (selections.length > 0) {
      // Found enabled default options for product; returning them.
      return selections;
    }
  } else {
    const selection = enabledOptions.find(o => o.value === val);
    if (selection) {
      // Found enabled default option for product returning it.
      return [selection];
    }
  }

  // All defaults are disabled for product returning first available.
  return [enabledOptions[0]];
}
*/

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductList_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56176aa4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProductList_vue__ = __webpack_require__(146);
var normalizeComponent = __webpack_require__(8)
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
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OptionList_vue__ = __webpack_require__(126);
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
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OptionList_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_892760e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_OptionList_vue__ = __webpack_require__(145);
function injectStyle (ssrContext) {
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(8)
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
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__options_ListOption_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__options_CheckboxOption_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__options_TextBoxOption_vue__ = __webpack_require__(141);
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
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListOption_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a10961d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ListOption_vue__ = __webpack_require__(136);
function injectStyle (ssrContext) {
  __webpack_require__(130)
}
var normalizeComponent = __webpack_require__(8)
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
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_products__ = __webpack_require__(7);

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
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_2__stores_products__["a" /* ACTIONS */].SET_VALUE]))
});

/***/ }),
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.options.length > 0)?_c('div',{staticClass:"content"},_vm._l((_vm.options),function(option){return _c('a',{staticClass:"button",class:{'is-success': option.selected},attrs:{"disabled":!option.enabled},on:{"click":function($event){_vm.SET_VALUE({product: _vm.product, option: option})}}},[_vm._v("\n    "+_vm._s(option.value)+"\n  ")])})):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CheckboxOption_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_37b19e02_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_CheckboxOption_vue__ = __webpack_require__(140);
function injectStyle (ssrContext) {
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(8)
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
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_products__ = __webpack_require__(7);

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
  computed: {
    selectedOption: function selectedOption() {
      return this.options.find(function (o) {
        return o.selected;
      });
    },
    isDisabled: function isDisabled() {
      return !!this.options.find(function (o) {
        return !o.enabled;
      });
    }
  },
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])([__WEBPACK_IMPORTED_MODULE_2__stores_products__["a" /* ACTIONS */].SET_VALUE]), {
    toggleCart: function toggleCart() {
      var _this = this;

      var option = this.options.find(function (o) {
        return o !== _this.selectedOption;
      });
      this[__WEBPACK_IMPORTED_MODULE_2__stores_products__["a" /* ACTIONS */].SET_VALUE]({ product: this.product, option: option });
    }
  })
});

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"button",class:{'is-success': _vm.selectedOption && _vm.selectedOption.value},attrs:{"disabled":_vm.isDisabled},on:{"click":_vm.toggleCart}},[_vm._v("\n  "+_vm._s(_vm.product.title)+"\n")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TextBoxOption_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_187114f9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_TextBoxOption_vue__ = __webpack_require__(144);
function injectStyle (ssrContext) {
  __webpack_require__(142)
}
var normalizeComponent = __webpack_require__(8)
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
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
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
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{attrs:{"type":"text"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.componentType,{tag:"component",attrs:{"options":_vm.options,"product":_vm.product}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible())?_c('div',_vm._l((_vm.products),function(p){return _c('div',{staticClass:"content",staticStyle:{"display":"flex"}},[(_vm.hasChildren(p))?_c('div',{staticClass:"box"},[_c(_vm.level,{tag:"component"},[_vm._v("\n        "+_vm._s(p.title)+" - "+_vm._s(_vm._f("currency")(p.price))+"\n      ")]),_vm._v(" "),_c('product-list',{attrs:{"products":p.variations}})],1):_vm._e(),_vm._v(" "),(_vm.hasOptions(p))?_c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-heading"},[_vm._v("\n          "+_vm._s(p.title)+" - "+_vm._s(_vm._f("currency")(p.price))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"panel-block"},[_c('option-list',{attrs:{"options":p.options,"product":p}})],1)]):_vm._e()])})):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('product-list',{staticStyle:{"display":"flex","flex-wrap":"wrap"},attrs:{"products":_vm.tree}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"section"},[_c('h1',[_vm._v("Gun Builder Constraint Checker")]),_vm._v(" "),_c('div',{staticClass:"content",attrs:{"id":"app"}},[_c('h2',[_vm._v("Select Options")]),_vm._v(" "),_c('product-list-container')],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logger__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__products__ = __webpack_require__(7);





// const debug = process.env.NODE_ENV !== 'production';
var debug = false;

function createStore(config, shopifyClient) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_3__products__["c" /* createProductStore */])(config, shopifyClient);

  return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, store, {
    strict: debug,
    plugins: debug ? [Object(__WEBPACK_IMPORTED_MODULE_2__services_logger__["a" /* createLogger */])()] : []
  }));
}

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(46);
// Credits: borrowed code from fcomb/redux-logger



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
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrencyFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(153);
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
/* 152 */,
/* 153 */,
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "products", function() { return products; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productMap", function() { return productMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shopify", function() { return shopify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);

var products = [{
  title: 'Caliber',
  options: ['9mm', '9x23', '.38 SC', '.40', '10mm', '.45'],
  default: '9mm' // uncompensated '.40'
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
    }, {
      when: {
        source: 'Top End Options.Compensated',
        is: false
      },
      disable: ['Standard']
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
    default: 'Full-Size'
  }, {
    title: 'Grip Texture',
    options: ['WarDrum Medium', 'WarDrum Velvet', 'Signature Aggressive', 'Signature Blank', 'Signature Medium'],
    default: 'Signature Blank',
    constraints: [{
      when: {
        source: 'Grip Options.Material',
        is: 'Polymer'
      },
      enable: ['WarDrum Medium', 'WarDrum Velvet']
    }]
  }]
}, {
  title: 'Magwell',
  options: ['Competition', 'Compact', 'None'],
  default: 'Competition',
  constraints: [{
    when: {
      source: 'Grip Options.Length',
      is: 'Compact'
    },
    disable: 'Competition'
  }]
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
  default: 'RTS2' // uncompensated: 'Adjustable Bomar w/ Fiber Front'
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
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ShopifyClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_shopify_buy__ = __webpack_require__(167);
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
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[72]);
//# sourceMappingURL=app.633278d2c5c012e676dd.js.map