function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty2(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import angular from 'angular';
import Vue$1 from 'Vue';
function CreateAngularVuePlainPlugin(ngServiceName, ngService) {
  return {
    // called by Vue.use(CreateAngularVuePlainPlugin)
    install: function install(Vue, options) {
      if (!Vue.prototype[ngServiceName]) Vue.prototype[ngServiceName] = ngService;
    }
  };
}
function AngularVueRoutePlugin($injector) {
  if (!$injector) throw new Error('Angular $injector not provided, cannot use AngularVueRoutePlugin plugin');
  var $location = $injector.get('$location');
  var $route = $injector.get('$route');
  var $rootScope = $injector.get('$rootScope');
  if (!$location) throw new Error('Angular $location service not available, cannot use AngularVueRoutePlugin plugin');
  if (!$route) throw new Error('Angular $route service not available, cannot use AngularVueRoutePlugin');
  var observableRoute = window.Vue.observable({
    _route: null
  });
  function updateRoute() {
    var _$route$current;
    var path = $location.path();
    var query = _objectSpread({}, $location.search() || {});
    var params = _objectSpread({}, ((_$route$current = $route.current) === null || _$route$current === void 0 ? void 0 : _$route$current.params) || {});
    observableRoute._route = {
      get path() {
        return path;
      },
      get query() {
        return _objectSpread({}, query);
      },
      get params() {
        return _objectSpread({}, params);
      }
    };
  }
  $rootScope.$on('$routeUpdate', function () {
    updateRoute();
  });
  if (!$route.current) {
    // initial route (at boot time)
    var cancelWatch = $rootScope.$watch(function () {
      return $route.current;
    }, function (currentRoute) {
      if (currentRoute === undefined) return;
      cancelWatch();
      updateRoute();
    });
  }
  updateRoute();
  return {
    install: function install(Vue, options) {
      if (!Vue.prototype.$route) {
        Object.defineProperty(Vue.prototype, '$route', {
          get: function get() {
            return observableRoute._route;
          }
        });
      }
    }
  };
}
function AngularVueRouterPlugin($injector) {
  if (!$injector) throw new Error('Angular $injector not provided, cannot use AngularVueRouterPlugin plugin');
  var $location = $injector.get('$location');
  var $rootScope = $injector.get('$rootScope');
  if (!$location) throw new Error('Angular $location service not available, cannot use AngularVueRouterPlugin plugin');
  var ngApply = function ngApply(callback) {
    if ($rootScope.$$phase) callback();else $rootScope.$apply(callback);
  };
  var router = {
    push: function push(_ref) {
      var path = _ref.path,
        query = _ref.query,
        hash = _ref.hash;
      ngApply(function () {
        if (path) $location.path(path);
        if (query) $location.search(query || {});
        if (hash !== undefined) $location.hash((hash || '').replace(/^#/, ''));
      });
    },
    replace: function replace() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      ngApply(function () {
        $location.replace();
        _this.push.apply(_this, args);
      });
    }
  };
  return {
    install: function install(Vue, options) {
      if (!Vue.prototype.$router) Vue.prototype.$router = router;
    }
  };
}
function angularVueAuthPlugin() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _logout = _ref2.logout,
    _fetchUser = _ref2.fetchUser;
  var state = Vue.observable({
    user: null,
    userToken: null
  });
  var auth = {
    get user() {
      return state.user;
    },
    get loggedIn() {
      var _state$user;
      return !!(state.user && state !== null && state !== void 0 && (_state$user = state.user) !== null && _state$user !== void 0 && _state$user.isAuthenticated);
    },
    setUser: function setUser(newUser) {
      state.user = newUser;
    },
    setUserToken: function setUserToken(token) {
      state.userToken = token;
    },
    logout: function logout() {
      if (!_logout) {
        throw new Error('Not Implemented');
      }
      _logout();
    },
    fetchUser: function fetchUser() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var user;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_fetchUser) {
                  _context.next = 2;
                  break;
                }
                throw new Error('Not Implemented');
              case 2:
                _context.next = 4;
                return _fetchUser();
              case 4:
                user = _context.sent;
                _this2.setUser(user);
                return _context.abrupt("return", user);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    hasScope: function hasScope(scopeName) {
      var _this3 = this;
      var rolesToValidate = [];
      if (typeof scopeName === 'string') rolesToValidate = [scopeName];else if (!Array.isArray(scopeName)) throw new Error('`scopeName` must be string or array od string');
      rolesToValidate = scopeName;
      var hasRole = rolesToValidate.find(function (scope) {
        var _this3$user;
        return (_this3$user = _this3.user) === null || _this3$user === void 0 ? void 0 : _this3$user.roles.includes(scope);
      });
      return !!hasRole;
    },
    refreshTokens: function refreshTokens() {
      throw new Error('Not Implemented');
    },
    onError: function onError() {
      throw new Error('Not Implemented');
    },
    onRedirect: function onRedirect() {
      throw new Error('Not Implemented');
    },
    strategy: {
      token: {
        get: function get() {
          return state.userToken;
        },
        set: function set(token) {
          state.userToken = token;
        }
      },
      get refreshToken() {
        throw new Error('Not Implemented');
      }
    }
  };
  return {
    install: function install(Vue, options) {
      if (!Vue.prototype.$auth) {
        Object.defineProperty(Vue.prototype, '$auth', {
          get: function get() {
            return auth;
          }
        });
      }
    }
  };
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$9 = freeGlobal || freeSelf || Function('return this')();
var _root = root$9;
var root$8 = _root;

/** Built-in value references. */
var Symbol$6 = root$8.Symbol;
var _Symbol = Symbol$6;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$3(array, iteratee) {
  var index = -1,
    length = array == null ? 0 : array.length,
    result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$3;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$c = Array.isArray;
var isArray_1 = isArray$c;
var Symbol$5 = _Symbol;

/** Used for built-in method references. */
var objectProto$f = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$f.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$f.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
    tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$e = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$e.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$4 = _Symbol,
  getRawTag = _getRawTag,
  objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$6(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$6;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$9(value) {
  return value != null && _typeof(value) == 'object';
}
var isObjectLike_1 = isObjectLike$9;
var baseGetTag$5 = _baseGetTag,
  isObjectLike$8 = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag$3 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$4(value) {
  return _typeof(value) == 'symbol' || isObjectLike$8(value) && baseGetTag$5(value) == symbolTag$3;
}
var isSymbol_1 = isSymbol$4;
var Symbol$3 = _Symbol,
  arrayMap$2 = _arrayMap,
  isArray$b = isArray_1,
  isSymbol$3 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = Symbol$3 ? Symbol$3.prototype : undefined,
  symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$b(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap$2(value, baseToString$1) + '';
  }
  if (isSymbol$3(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$5(value) {
  return value == null ? '' : baseToString(value);
}
var toString_1 = toString$5;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */

function baseSlice$2(array, start, end) {
  var index = -1,
    length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var _baseSlice = baseSlice$2;
var baseSlice$1 = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice$1(array, start, end);
}
var _castSlice = castSlice$1;

/** Used to compose unicode character classes. */

var rsAstralRange$2 = "\\ud800-\\udfff",
  rsComboMarksRange$3 = "\\u0300-\\u036f",
  reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f",
  rsComboSymbolsRange$3 = "\\u20d0-\\u20ff",
  rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
  rsVarRange$2 = "\\ufe0e\\ufe0f";

/** Used to compose unicode capture groups. */
var rsZWJ$2 = "\\u200d";

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$2(string) {
  return reHasUnicode.test(string);
}
var _hasUnicode = hasUnicode$2;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray$1(string) {
  return string.split('');
}
var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */

var rsAstralRange$1 = "\\ud800-\\udfff",
  rsComboMarksRange$2 = "\\u0300-\\u036f",
  reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f",
  rsComboSymbolsRange$2 = "\\u20d0-\\u20ff",
  rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
  rsVarRange$1 = "\\ufe0e\\ufe0f";

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']',
  rsCombo$2 = '[' + rsComboRange$2 + ']',
  rsFitz$1 = "\\ud83c[\\udffb-\\udfff]",
  rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
  rsNonAstral$1 = '[^' + rsAstralRange$1 + ']',
  rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  rsZWJ$1 = "\\u200d";

/** Used to compose unicode regexes. */
var reOptMod$1 = rsModifier$1 + '?',
  rsOptVar$1 = '[' + rsVarRange$1 + ']?',
  rsOptJoin$1 = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
  rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
  rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}
var _unicodeToArray = unicodeToArray$1;
var asciiToArray = _asciiToArray,
  hasUnicode$1 = _hasUnicode,
  unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode$1(string) ? unicodeToArray(string) : asciiToArray(string);
}
var _stringToArray = stringToArray$1;
var castSlice = _castSlice,
  hasUnicode = _hasUnicode,
  stringToArray = _stringToArray,
  toString$4 = toString_1;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst$1(methodName) {
  return function (string) {
    string = toString$4(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var _createCaseFirst = createCaseFirst$1;
var createCaseFirst = _createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst$1 = createCaseFirst('toUpperCase');
var upperFirst_1 = upperFirst$1;
var toString$3 = toString_1,
  upperFirst = upperFirst_1;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize$1(string) {
  return upperFirst(toString$3(string).toLowerCase());
}
var capitalize_1 = capitalize$1;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */

function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1,
    length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce$1;

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyOf$1(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}
var _basePropertyOf = basePropertyOf$1;
var basePropertyOf = _basePropertyOf;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  "\u0100": 'A',
  "\u0102": 'A',
  "\u0104": 'A',
  "\u0101": 'a',
  "\u0103": 'a',
  "\u0105": 'a',
  "\u0106": 'C',
  "\u0108": 'C',
  "\u010A": 'C',
  "\u010C": 'C',
  "\u0107": 'c',
  "\u0109": 'c',
  "\u010B": 'c',
  "\u010D": 'c',
  "\u010E": 'D',
  "\u0110": 'D',
  "\u010F": 'd',
  "\u0111": 'd',
  "\u0112": 'E',
  "\u0114": 'E',
  "\u0116": 'E',
  "\u0118": 'E',
  "\u011A": 'E',
  "\u0113": 'e',
  "\u0115": 'e',
  "\u0117": 'e',
  "\u0119": 'e',
  "\u011B": 'e',
  "\u011C": 'G',
  "\u011E": 'G',
  "\u0120": 'G',
  "\u0122": 'G',
  "\u011D": 'g',
  "\u011F": 'g',
  "\u0121": 'g',
  "\u0123": 'g',
  "\u0124": 'H',
  "\u0126": 'H',
  "\u0125": 'h',
  "\u0127": 'h',
  "\u0128": 'I',
  "\u012A": 'I',
  "\u012C": 'I',
  "\u012E": 'I',
  "\u0130": 'I',
  "\u0129": 'i',
  "\u012B": 'i',
  "\u012D": 'i',
  "\u012F": 'i',
  "\u0131": 'i',
  "\u0134": 'J',
  "\u0135": 'j',
  "\u0136": 'K',
  "\u0137": 'k',
  "\u0138": 'k',
  "\u0139": 'L',
  "\u013B": 'L',
  "\u013D": 'L',
  "\u013F": 'L',
  "\u0141": 'L',
  "\u013A": 'l',
  "\u013C": 'l',
  "\u013E": 'l',
  "\u0140": 'l',
  "\u0142": 'l',
  "\u0143": 'N',
  "\u0145": 'N',
  "\u0147": 'N',
  "\u014A": 'N',
  "\u0144": 'n',
  "\u0146": 'n',
  "\u0148": 'n',
  "\u014B": 'n',
  "\u014C": 'O',
  "\u014E": 'O',
  "\u0150": 'O',
  "\u014D": 'o',
  "\u014F": 'o',
  "\u0151": 'o',
  "\u0154": 'R',
  "\u0156": 'R',
  "\u0158": 'R',
  "\u0155": 'r',
  "\u0157": 'r',
  "\u0159": 'r',
  "\u015A": 'S',
  "\u015C": 'S',
  "\u015E": 'S',
  "\u0160": 'S',
  "\u015B": 's',
  "\u015D": 's',
  "\u015F": 's',
  "\u0161": 's',
  "\u0162": 'T',
  "\u0164": 'T',
  "\u0166": 'T',
  "\u0163": 't',
  "\u0165": 't',
  "\u0167": 't',
  "\u0168": 'U',
  "\u016A": 'U',
  "\u016C": 'U',
  "\u016E": 'U',
  "\u0170": 'U',
  "\u0172": 'U',
  "\u0169": 'u',
  "\u016B": 'u',
  "\u016D": 'u',
  "\u016F": 'u',
  "\u0171": 'u',
  "\u0173": 'u',
  "\u0174": 'W',
  "\u0175": 'w',
  "\u0176": 'Y',
  "\u0177": 'y',
  "\u0178": 'Y',
  "\u0179": 'Z',
  "\u017B": 'Z',
  "\u017D": 'Z',
  "\u017A": 'z',
  "\u017C": 'z',
  "\u017E": 'z',
  "\u0132": 'IJ',
  "\u0133": 'ij',
  "\u0152": 'Oe',
  "\u0153": 'oe',
  "\u0149": "'n",
  "\u017F": 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter$1 = basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter$1;
var deburrLetter = _deburrLetter,
  toString$2 = toString_1;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$1 = "\\u0300-\\u036f",
  reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
  rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
  rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$1 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr$1(string) {
  string = toString$2(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}
var deburr_1 = deburr$1;

/** Used to match words composed of alphanumeric characters. */

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords$1;

/** Used to detect strings that need a more robust regexp to match words. */

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}
var _hasUnicodeWord = hasUnicodeWord$1;

/** Used to compose unicode character classes. */

var rsAstralRange = "\\ud800-\\udfff",
  rsComboMarksRange = "\\u0300-\\u036f",
  reComboHalfMarksRange = "\\ufe20-\\ufe2f",
  rsComboSymbolsRange = "\\u20d0-\\u20ff",
  rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
  rsDingbatRange = "\\u2700-\\u27bf",
  rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
  rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
  rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
  rsPunctuationRange = "\\u2000-\\u206f",
  rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
  rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
  rsVarRange = "\\ufe0e\\ufe0f",
  rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos$1 = "['\u2019]",
  rsBreak = '[' + rsBreakRange + ']',
  rsCombo = '[' + rsComboRange + ']',
  rsDigits = '\\d+',
  rsDingbat = '[' + rsDingbatRange + ']',
  rsLower = '[' + rsLowerRange + ']',
  rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
  rsFitz = "\\ud83c[\\udffb-\\udfff]",
  rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
  rsNonAstral = '[^' + rsAstralRange + ']',
  rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  rsUpper = '[' + rsUpperRange + ']',
  rsZWJ = "\\u200d";

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
  rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
  rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
  rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
  reOptMod = rsModifier + '?',
  rsOptVar = '[' + rsVarRange + ']?',
  rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
  rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
  rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords$1;
var asciiWords = _asciiWords,
  hasUnicodeWord = _hasUnicodeWord,
  toString$1 = toString_1,
  unicodeWords = _unicodeWords;

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words$1(string, pattern, guard) {
  string = toString$1(string);
  pattern = guard ? undefined : pattern;
  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var words_1 = words$1;
var arrayReduce = _arrayReduce,
  deburr = deburr_1,
  words = words_1;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder$2(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}
var _createCompounder = createCompounder$2;
var capitalize = capitalize_1,
  createCompounder$1 = _createCompounder;

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder$1(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});
var camelCase_1 = camelCase;
function safeApply($scope, fn) {
  var phase = $scope.$root.$$phase;
  if (phase == '$apply' || phase == '$digest') {
    fn();
  } else {
    $scope.$apply(fn);
  }
}
function renderVNodeToDomElement(vNode) {
  var comp = new Vue({
    render: function render() {
      return vNode;
    }
  }); // create a dummy component that return the VNode from the render fn

  comp.$mount(); // Mount as an orphan component

  var domElement = comp.$el; // Save the native DOM Element converted from VNode;

  comp.$destroy();
  return domElement;
}
var AngularVueComponent = {
  render: function render(h) {
    return h(null, 'angular placeholder');
  },
  mounted: function mounted() {
    var _angular$element$pare,
      _this4 = this;
    if (!this.$ngVue) throw new Error("AngularVuePlugin not installed");
    var $injector = this.$ngVue.$injector;

    //lookup throughout parent tree first to find closest ngScope.... otherwise  
    var $parentScope = ((_angular$element$pare = angular.element(this.$el).parents('.ng-scope:first')) === null || _angular$element$pare === void 0 ? void 0 : _angular$element$pare.scope()) || $injector.get('$rootScope');
    var $scope = $parentScope.$new(true); // create ew isolated scope!
    this.$scope = $scope;
    Object.keys(this.$attrs).forEach(function (attrKey) {
      var propKey = camelCase_1(attrKey);
      console.debug("vue(ng): initial set vue => ng (".concat(propKey, "):"), _this4.$attrs[attrKey]);
      $scope[propKey] = _this4.$attrs[attrKey];

      // From Vue => Angular
      _this4.$watch(function () {
        return _this4.$attrs[attrKey];
      }, function (v) {
        if ($scope.$$destroyed) return;
        safeApply($scope, function () {
          if ($scope[propKey] === v) return;
          console.debug("vue(ng): vue => ng (".concat(propKey, ")"), v);
          $scope[propKey] = v;
        });
      });

      // From Angular => Vue
      $scope.$watch(function () {
        return $scope[propKey];
      }, function (v) {
        if (_this4.$attrs[attrKey] === v) return;
        console.debug("vue(ng): ng => vue (".concat(propKey, ")"), v);
        _this4.$emit("update:".concat(propKey), v);
      });
    });
    var domElement = renderVNodeToDomElement(this.$slots.default); // convert default slot to domElement
    var $compile = $injector.get('$compile');
    var bindFn = $compile(domElement);
    var _bindFn = bindFn($scope),
      _bindFn2 = _slicedToArray(_bindFn, 1),
      ngElement = _bindFn2[0]; //Bind to scope

    ngElement.$component = this; //save current component to DOM element 

    //Replace this component wrapper (this.$el) in the browser DOM with the angular one (ngElement) 
    this.$el.parentElement.replaceChild(ngElement, this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    var $scope = this.$scope;
    if ($scope) {
      console.debug('vue(ng): destroying ng-scope', $scope);
      delete this.$scope;
      $scope.$destroy();
    }
  }
};
function pascalCase(t) {
  t = camelCase_1(t);
  if (t) t = t[0].toUpperCase() + t.slice(1);
  return t;
}
function AngularVuePlugin(_ref3) {
  var $injector = _ref3.$injector,
    ngApp = _ref3.ngApp,
    vueApp = _ref3.vueApp;
  // if(!$injector)
  //     throw new Error('Angular $injector not provided, cannot use AngularVuePlugin plugin');

  var ngVuePlugin = {
    get $injector() {
      return $injector || angular.injector();
    },
    get vueApp() {
      return vueApp;
    },
    get ngApp() {
      return ngApp;
    }
  };
  return {
    install: function install(Vue, options) {
      if (!Vue.prototype.$ngVue) {
        var _ref4 = options || {},
          vueNgName = _ref4.vueNgName;
        Vue.component(pascalCase(vueNgName || 'VueNg'), AngularVueComponent);
        Object.defineProperty(Vue.prototype, '$ngVue', {
          get: function get() {
            return ngVuePlugin;
          }
        });
      }
    }
  };
}
var paths = {
  parent: parent$2,
  parents: parents,
  leaf: leaf,
  root: root$7,
  isRoot: isRoot
};
function parent$2(path) {
  var parts = split(path);
  parts.pop();
  return combine(parts);
}
function parents(path) {
  var parentPaths = [];
  var parentPath = parent$2(path);
  while (parentPath) {
    parentPaths.push(parentPath);
    parentPath = parent$2(parentPath);
  }
  return parentPaths;
}
function leaf(path) {
  var parts = split(path);
  return parts.pop();
}
function root$7(path) {
  return split(path)[0];
}
function isRoot(path) {
  return split(path).length === 1;
}
function split(path) {
  if (!path) throw new Error("Invalid path ".concat(path));
  return path.split('.');
}
function combine(parts) {
  return parts.join('.');
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
    index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
    index = assocIndexOf$2(data, key);
  return index < 0 ? undefined : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
    index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear,
  listCacheDelete = _listCacheDelete,
  listCacheGet = _listCacheGet,
  listCacheHas = _listCacheHas,
  listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
    result = data['delete'](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$7(value) {
  var type = _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}
var isObject_1 = isObject$7;
var baseGetTag$4 = _baseGetTag,
  isObject$6 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
  funcTag$2 = '[object Function]',
  genTag$1 = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$6(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$4(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$2;
var root$6 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$6['__core-js_shared__'];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}
var _toSource = toSource$2;
var isFunction$1 = isFunction_1,
  isMasked = _isMasked,
  isObject$5 = isObject_1,
  toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
  objectProto$d = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative,
  getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
var _getNative = getNative$7;
var getNative$6 = _getNative,
  root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$3 = getNative$6(root$5, 'Map');
var _Map = Map$3;
var getNative$5 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$5(Object, 'create');
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$9.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear,
  hashDelete = _hashDelete,
  hashGet = _hashGet,
  hashHas = _hashHas,
  hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash,
  ListCache$2 = _ListCache,
  Map$2 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map$2 || ListCache$2)(),
    'string': new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
    size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear,
  mapCacheDelete = _mapCacheDelete,
  mapCacheGet = _mapCacheGet,
  mapCacheHas = _mapCacheHas,
  mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$3(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype['delete'] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;
var _MapCache = MapCache$3;
var ListCache$1 = _ListCache,
  Map$1 = _Map,
  MapCache$2 = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$2(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache,
  stackClear = _stackClear,
  stackDelete = _stackDelete,
  stackGet = _stackGet,
  stackHas = _stackHas,
  stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$3(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$3.prototype.clear = stackClear;
Stack$3.prototype['delete'] = stackDelete;
Stack$3.prototype.get = stackGet;
Stack$3.prototype.has = stackHas;
Stack$3.prototype.set = stackSet;
var _Stack = Stack$3;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach$2(array, iteratee) {
  var index = -1,
    length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$2;
var getNative$4 = _getNative;
var defineProperty$2 = function () {
  try {
    var func = getNative$4(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$2(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$2;
var baseAssignValue$1 = _baseAssignValue,
  eq$2 = eq_1;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq$2(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$2;
var assignValue$1 = _assignValue,
  baseAssignValue = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$5(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
    length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$5;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
    result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var baseGetTag$3 = _baseGetTag,
  isObjectLike$7 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$7(value) && baseGetTag$3(value) == argsTag$3;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments,
  isObjectLike$6 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$3 = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike$6(value) && hasOwnProperty$7.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};
var isArguments_1 = isArguments$3;
var isBuffer$3 = {
  exports: {}
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function (module, exports) {
  var root = _root,
    stubFalse = stubFalse_1;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;
  module.exports = isBuffer;
})(isBuffer$3, isBuffer$3.exports);

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$3(value, length) {
  var type = _typeof(value);
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
var _isIndex = isIndex$3;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$3(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$3;
var baseGetTag$2 = _baseGetTag,
  isLength$2 = isLength_1,
  isObjectLike$5 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
  arrayTag$2 = '[object Array]',
  boolTag$3 = '[object Boolean]',
  dateTag$3 = '[object Date]',
  errorTag$2 = '[object Error]',
  funcTag$1 = '[object Function]',
  mapTag$5 = '[object Map]',
  numberTag$3 = '[object Number]',
  objectTag$4 = '[object Object]',
  regexpTag$3 = '[object RegExp]',
  setTag$5 = '[object Set]',
  stringTag$3 = '[object String]',
  weakMapTag$2 = '[object WeakMap]';
var arrayBufferTag$3 = '[object ArrayBuffer]',
  dataViewTag$4 = '[object DataView]',
  float32Tag$2 = '[object Float32Array]',
  float64Tag$2 = '[object Float64Array]',
  int8Tag$2 = '[object Int8Array]',
  int16Tag$2 = '[object Int16Array]',
  int32Tag$2 = '[object Int32Array]',
  uint8Tag$2 = '[object Uint8Array]',
  uint8ClampedTag$2 = '[object Uint8ClampedArray]',
  uint16Tag$2 = '[object Uint16Array]',
  uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$5(value) && isLength$2(value.length) && !!typedArrayTags[baseGetTag$2(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$4(func) {
  return function (value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$4;
var _nodeUtil = {
  exports: {}
};
(function (module, exports) {
  var freeGlobal = _freeGlobal;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = function () {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;
      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();
  module.exports = nodeUtil;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray,
  baseUnary$3 = _baseUnary,
  nodeUtil$2 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$3(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
var baseTimes = _baseTimes,
  isArguments$2 = isArguments_1,
  isArray$a = isArray_1,
  isBuffer$2 = isBuffer$3.exports,
  isIndex$2 = _isIndex,
  isTypedArray$1 = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$a(value),
    isArg = !isArr && isArguments$2(value),
    isBuff = !isArr && !isArg && isBuffer$2(value),
    isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
    skipIndexes = isArr || isArg || isBuff || isType,
    result = skipIndexes ? baseTimes(value.length, String) : [],
    length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex$2(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;

/** Used for built-in method references. */

var objectProto$7 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$3(value) {
  var Ctor = value && value.constructor,
    proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$7;
  return value === proto;
}
var _isPrototype = isPrototype$3;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype,
  nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction = isFunction_1,
  isLength$1 = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$6(value) {
  return value != null && isLength$1(value.length) && !isFunction(value);
}
var isArrayLike_1 = isArrayLike$6;
var arrayLikeKeys$1 = _arrayLikeKeys,
  baseKeys = _baseKeys,
  isArrayLike$5 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$5(object) {
  return isArrayLike$5(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$5;
var copyObject$4 = _copyObject,
  keys$4 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign$1(object, source) {
  return object && copyObject$4(source, keys$4(source), object);
}
var _baseAssign = baseAssign$1;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$4 = isObject_1,
  isPrototype$1 = _isPrototype,
  nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$4(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object),
    result = [];
  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys,
  baseKeysIn = _baseKeysIn,
  isArrayLike$4 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$3(object) {
  return isArrayLike$4(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$3;
var copyObject$3 = _copyObject,
  keysIn$2 = keysIn_1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn$1(object, source) {
  return object && copyObject$3(source, keysIn$2(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = {
  exports: {}
};
(function (module, exports) {
  var root = _root;

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer;
})(_cloneBuffer, _cloneBuffer.exports);

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
    length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$1;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter,
  stubArray$1 = stubArray_1;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$2 = _copyObject,
  getSymbols$2 = _getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$2(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$3(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var _arrayPush = arrayPush$3;
var overArg = _overArg;

/** Built-in value references. */
var getPrototype$3 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var arrayPush$2 = _arrayPush,
  getPrototype$2 = _getPrototype,
  getSymbols$1 = _getSymbols,
  stubArray = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function (object) {
  var result = [];
  while (object) {
    arrayPush$2(result, getSymbols$1(object));
    object = getPrototype$2(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$1 = _copyObject,
  getSymbolsIn$1 = _getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn$1(source, object) {
  return copyObject$1(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush$1 = _arrayPush,
  isArray$9 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$9(object) ? result : arrayPush$1(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys,
  getSymbols = _getSymbols,
  keys$3 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$2(object) {
  return baseGetAllKeys$1(object, keys$3, getSymbols);
}
var _getAllKeys = getAllKeys$2;
var baseGetAllKeys = _baseGetAllKeys,
  getSymbolsIn = _getSymbolsIn,
  keysIn$1 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$2(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$2;
var getNative$3 = _getNative,
  root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$3(root$4, 'DataView');
var _DataView = DataView$1;
var getNative$2 = _getNative,
  root$3 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$3, 'Promise');
var _Promise = Promise$2;
var getNative$1 = _getNative,
  root$2 = _root;

/* Built-in method references that are verified to be native. */
var Set$2 = getNative$1(root$2, 'Set');
var _Set = Set$2;
var getNative = _getNative,
  root$1 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root$1, 'WeakMap');
var _WeakMap = WeakMap$1;
var DataView = _DataView,
  Map = _Map,
  Promise$1 = _Promise,
  Set$1 = _Set,
  WeakMap = _WeakMap,
  baseGetTag$1 = _baseGetTag,
  toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]',
  objectTag$3 = '[object Object]',
  promiseTag = '[object Promise]',
  setTag$4 = '[object Set]',
  weakMapTag$1 = '[object WeakMap]';
var dataViewTag$3 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
  mapCtorString = toSource(Map),
  promiseCtorString = toSource(Promise$1),
  setCtorString = toSource(Set$1),
  weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$4 = baseGetTag$1;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag$4(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map && getTag$4(new Map()) != mapTag$4 || Promise$1 && getTag$4(Promise$1.resolve()) != promiseTag || Set$1 && getTag$4(new Set$1()) != setTag$4 || WeakMap && getTag$4(new WeakMap()) != weakMapTag$1) {
  getTag$4 = function getTag$4(value) {
    var result = baseGetTag$1(value),
      Ctor = result == objectTag$3 ? value.constructor : undefined,
      ctorString = Ctor ? toSource(Ctor) : '';
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$4;

/** Used for built-in method references. */

var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
    result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$3.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var root = _root;

/** Built-in value references. */
var Uint8Array$2 = root.Uint8Array;
var _Uint8Array = Uint8Array$2;
var Uint8Array$1 = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;

/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$2 = _Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
  symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
var cloneArrayBuffer = _cloneArrayBuffer,
  cloneDataView = _cloneDataView,
  cloneRegExp = _cloneRegExp,
  cloneSymbol = _cloneSymbol,
  cloneTypedArray = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]',
  dateTag$2 = '[object Date]',
  mapTag$3 = '[object Map]',
  numberTag$2 = '[object Number]',
  regexpTag$2 = '[object RegExp]',
  setTag$3 = '[object Set]',
  stringTag$2 = '[object String]',
  symbolTag$2 = '[object Symbol]';
var arrayBufferTag$2 = '[object ArrayBuffer]',
  dataViewTag$2 = '[object DataView]',
  float32Tag$1 = '[object Float32Array]',
  float64Tag$1 = '[object Float64Array]',
  int8Tag$1 = '[object Int8Array]',
  int16Tag$1 = '[object Int16Array]',
  int32Tag$1 = '[object Int32Array]',
  uint8Tag$1 = '[object Uint8Array]',
  uint8ClampedTag$1 = '[object Uint8ClampedArray]',
  uint16Tag$1 = '[object Uint16Array]',
  uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$3 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = function () {
  function object() {}
  return function (proto) {
    if (!isObject$3(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate,
  getPrototype$1 = _getPrototype,
  isPrototype = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$1;
var getTag$3 = _getTag,
  isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap$1(value) {
  return isObjectLike$4(value) && getTag$3(value) == mapTag$2;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap,
  baseUnary$2 = _baseUnary,
  nodeUtil$1 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap$1 = nodeIsMap ? baseUnary$2(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$2 = _getTag,
  isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var setTag$2 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet$1(value) {
  return isObjectLike$3(value) && getTag$2(value) == setTag$2;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet,
  baseUnary$1 = _baseUnary,
  nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet$1 = nodeIsSet ? baseUnary$1(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack$2 = _Stack,
  arrayEach$1 = _arrayEach,
  assignValue = _assignValue,
  baseAssign = _baseAssign,
  baseAssignIn = _baseAssignIn,
  cloneBuffer = _cloneBuffer.exports,
  copyArray = _copyArray,
  copySymbols = _copySymbols,
  copySymbolsIn = _copySymbolsIn,
  getAllKeys$1 = _getAllKeys,
  getAllKeysIn$1 = _getAllKeysIn,
  getTag$1 = _getTag,
  initCloneArray = _initCloneArray,
  initCloneByTag = _initCloneByTag,
  initCloneObject = _initCloneObject,
  isArray$8 = isArray_1,
  isBuffer$1 = isBuffer$3.exports,
  isMap = isMap_1,
  isObject$2 = isObject_1,
  isSet = isSet_1,
  keys$2 = keys_1,
  keysIn = keysIn_1;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
  CLONE_FLAT_FLAG$1 = 2,
  CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
  arrayTag$1 = '[object Array]',
  boolTag$1 = '[object Boolean]',
  dateTag$1 = '[object Date]',
  errorTag$1 = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag$1 = '[object Map]',
  numberTag$1 = '[object Number]',
  objectTag$2 = '[object Object]',
  regexpTag$1 = '[object RegExp]',
  setTag$1 = '[object Set]',
  stringTag$1 = '[object String]',
  symbolTag$1 = '[object Symbol]',
  weakMapTag = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
  dataViewTag$1 = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$2] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result,
    isDeep = bitmask & CLONE_DEEP_FLAG$1,
    isFlat = bitmask & CLONE_FLAT_FLAG$1,
    isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$2(value)) {
    return value;
  }
  var isArr = isArray$8(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
      isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$1 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack$2());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys$1 : isFlat ? keysIn : keys$2;
  var props = isArr ? undefined : keysFunc(value);
  arrayEach$1(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
var isArray$7 = isArray_1,
  isSymbol$2 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$3(value, object) {
  if (isArray$7(value)) {
    return false;
  }
  var type = _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$2(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$3;
var MapCache$1 = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$1)();
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache$1;
var memoize_1 = memoize$1;
var memoize = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function (string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
var _stringToPath = stringToPath$1;
var isArray$6 = isArray_1,
  isKey$2 = _isKey,
  stringToPath = _stringToPath,
  toString = toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$4(value, object) {
  if (isArray$6(value)) {
    return value;
  }
  return isKey$2(value, object) ? [value] : stringToPath(toString(value));
}
var _castPath = castPath$4;

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

function last$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
var last_1 = last$1;
var isSymbol$1 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$5(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}
var _toKey = toKey$5;
var castPath$3 = _castPath,
  toKey$4 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$4(object, path) {
  path = castPath$3(path, object);
  var index = 0,
    length = path.length;
  while (object != null && index < length) {
    object = object[toKey$4(path[index++])];
  }
  return index && index == length ? object : undefined;
}
var _baseGet = baseGet$4;
var baseGet$3 = _baseGet,
  baseSlice = _baseSlice;

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent$1(object, path) {
  return path.length < 2 ? object : baseGet$3(object, baseSlice(path, 0, -1));
}
var _parent = parent$1;
var castPath$2 = _castPath,
  last = last_1,
  parent = _parent,
  toKey$3 = _toKey;

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset$1(object, path) {
  path = castPath$2(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey$3(last(path))];
}
var _baseUnset = baseUnset$1;
var baseGetTag = _baseGetTag,
  getPrototype = _getPrototype,
  isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
  objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike$2(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
var isPlainObject = isPlainObject_1;

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone$1(value) {
  return isPlainObject(value) ? undefined : value;
}
var _customOmitClone = customOmitClone$1;
var Symbol$1 = _Symbol,
  isArguments$1 = isArguments_1,
  isArray$5 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
  return isArray$5(value) || isArguments$1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable$1;
var arrayPush = _arrayPush,
  isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$3(array, depth, predicate, isStrict, result) {
  var index = -1,
    length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$3(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten$3;
var baseFlatten$2 = _baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten$2(array, 1) : [];
}
var flatten_1 = flatten$1;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$2(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
      index = -1,
      length = nativeMax(args.length - start, 0),
      array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$2;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$1(value) {
  return function () {
    return value;
  };
}
var constant_1 = constant$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$5(value) {
  return value;
}
var identity_1 = identity$5;
var constant = constant_1,
  defineProperty = _defineProperty,
  identity$4 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty ? identity$4 : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
  HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
    lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
      remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString,
  shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$2 = shortOut(baseSetToString);
var _setToString = setToString$2;
var flatten = flatten_1,
  overRest$1 = _overRest,
  setToString$1 = _setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest$1(func) {
  return setToString$1(overRest$1(func, undefined, flatten), func + '');
}
var _flatRest = flatRest$1;
var arrayMap$1 = _arrayMap,
  baseClone = _baseClone,
  baseUnset = _baseUnset,
  castPath$1 = _castPath,
  copyObject = _copyObject,
  customOmitClone = _customOmitClone,
  flatRest = _flatRest,
  getAllKeysIn = _getAllKeysIn;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
  CLONE_FLAT_FLAG = 2,
  CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function (object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap$1(paths, function (path) {
    path = castPath$1(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
var omit_1 = omit;
var baseGet$2 = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet$2(object, path);
  return result === undefined ? defaultValue : result;
}
var get_1 = get$1;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor$1(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
      iterable = Object(object),
      props = keysFunc(object),
      length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var baseFor = _baseFor,
  keys$1 = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys$1);
}
var _baseForOwn = baseForOwn$1;
var isArrayLike$3 = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$3(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
      index = fromRight ? length : -1,
      iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach$1;
var baseForOwn = _baseForOwn,
  createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$2 = createBaseEach(baseForOwn);
var _baseEach = baseEach$2;
var identity$3 = identity_1;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction$1(value) {
  return typeof value == 'function' ? value : identity$3;
}
var _castFunction = castFunction$1;
var arrayEach = _arrayEach,
  baseEach$1 = _baseEach,
  castFunction = _castFunction,
  isArray$4 = isArray_1;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray$4(collection) ? arrayEach : baseEach$1;
  return func(collection, castFunction(iteratee));
}
var forEach_1 = forEach;
var createCompounder = _createCompounder;

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});
var kebabCase_1 = kebabCase;
var identity$2 = identity_1,
  overRest = _overRest,
  setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$2(func, start) {
  return setToString(overRest(func, start, identity$2), func + '');
}
var _baseRest = baseRest$2;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd$1;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */

function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache = _MapCache,
  setCacheAdd = _setCacheAdd,
  setCacheHas = _setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache$2(values) {
  var index = -1,
    length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache$2.prototype.add = SetCache$2.prototype.push = setCacheAdd;
SetCache$2.prototype.has = setCacheHas;
var _SetCache = SetCache$2;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
  var length = array.length,
    index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var _baseFindIndex = baseFindIndex$1;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */

function baseIsNaN$1(value) {
  return value !== value;
}
var _baseIsNaN = baseIsNaN$1;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function strictIndexOf$1(array, value, fromIndex) {
  var index = fromIndex - 1,
    length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var _strictIndexOf = strictIndexOf$1;
var baseFindIndex = _baseFindIndex,
  baseIsNaN = _baseIsNaN,
  strictIndexOf = _strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf$1(array, value, fromIndex) {
  return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
var _baseIndexOf = baseIndexOf$1;
var baseIndexOf = _baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes$1(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
var _arrayIncludes = arrayIncludes$1;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludesWith$1(array, value, comparator) {
  var index = -1,
    length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var _arrayIncludesWith = arrayIncludesWith$1;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function cacheHas$2(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas$2;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */

function noop$1() {
  // No operation performed.
}
var noop_1 = noop$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

function setToArray$3(set) {
  var index = -1,
    result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray$3;
var Set = _Set,
  noop = noop_1,
  setToArray$2 = _setToArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet$1 = !(Set && 1 / setToArray$2(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
  return new Set(values);
};
var _createSet = createSet$1;
var SetCache$1 = _SetCache,
  arrayIncludes = _arrayIncludes,
  arrayIncludesWith = _arrayIncludesWith,
  cacheHas$1 = _cacheHas,
  createSet = _createSet,
  setToArray$1 = _setToArray;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq$2(array, iteratee, comparator) {
  var index = -1,
    includes = arrayIncludes,
    length = array.length,
    isCommon = true,
    result = [],
    seen = result;
  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray$1(set);
    }
    isCommon = false;
    includes = cacheHas$1;
    seen = new SetCache$1();
  } else {
    seen = iteratee ? [] : result;
  }
  outer: while (++index < length) {
    var value = array[index],
      computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}
var _baseUniq = baseUniq$2;
var isArrayLike$2 = isArrayLike_1,
  isObjectLike$1 = isObjectLike_1;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject$1(value) {
  return isObjectLike$1(value) && isArrayLike$2(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var baseFlatten$1 = _baseFlatten,
  baseRest$1 = _baseRest,
  baseUniq$1 = _baseUniq,
  isArrayLikeObject = isArrayLikeObject_1;

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest$1(function (arrays) {
  return baseUniq$1(baseFlatten$1(arrays, 1, isArrayLikeObject, true));
});
var union_1 = union;
var baseUniq = _baseUniq;

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return array && array.length ? baseUniq(array) : [];
}
var uniq_1 = uniq;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arraySome$1(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$1;
var SetCache = _SetCache,
  arraySome = _arraySome,
  cacheHas = _cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
  COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
    arrLength = array.length,
    othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
    result = true,
    seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
      othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}
var _equalArrays = equalArrays$2;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

function mapToArray$1(map) {
  var index = -1,
    result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray$1;
var _Symbol2 = _Symbol,
  Uint8Array = _Uint8Array,
  eq$1 = eq_1,
  equalArrays$1 = _equalArrays,
  mapToArray = _mapToArray,
  setToArray = _setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
  COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol2 ? _Symbol2.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq$1(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$1;
var getAllKeys = _getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
    objProps = getAllKeys(object),
    objLength = objProps.length,
    othProps = getAllKeys(other),
    othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
      othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
      othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}
var _equalObjects = equalObjects$1;
var Stack$1 = _Stack,
  equalArrays = _equalArrays,
  equalByTag = _equalByTag,
  equalObjects = _equalObjects,
  getTag = _getTag,
  isArray$3 = isArray_1,
  isBuffer = isBuffer$3.exports,
  isTypedArray = isTypedArray_1;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$3(object),
    othIsArr = isArray$3(other),
    objTag = objIsArr ? arrayTag : getTag(object),
    othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
    othIsObj = othTag == objectTag,
    isSameTag = objTag == othTag;
  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$1());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
        othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack$1());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$1());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep$1;
var baseIsEqualDeep = _baseIsEqualDeep,
  isObjectLike = isObjectLike_1;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual$2(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack);
}
var _baseIsEqual = baseIsEqual$2;
var Stack = _Stack,
  baseIsEqual$1 = _baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
  COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length,
    length = index,
    noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
      objValue = object[key],
      srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch$1;
var isObject$1 = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$2(value) {
  return value === value && !isObject$1(value);
}
var _isStrictComparable = isStrictComparable$2;
var isStrictComparable$1 = _isStrictComparable,
  keys = keys_1;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData$1(object) {
  var result = keys(object),
    length = result.length;
  while (length--) {
    var key = result[length],
      value = object[key];
    result[length] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}
var _getMatchData = getMatchData$1;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function matchesStrictComparable$2(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}
var _matchesStrictComparable = matchesStrictComparable$2;
var baseIsMatch = _baseIsMatch,
  getMatchData = _getMatchData,
  matchesStrictComparable$1 = _matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
var _baseMatches = baseMatches$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */

function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn$1;
var castPath = _castPath,
  isArguments = isArguments_1,
  isArray$2 = isArray_1,
  isIndex$1 = _isIndex,
  isLength = isLength_1,
  toKey$2 = _toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath$1(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1,
    length = path.length,
    result = false;
  while (++index < length) {
    var key = toKey$2(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) && (isArray$2(object) || isArguments(object));
}
var _hasPath = hasPath$1;
var baseHasIn = _baseHasIn,
  hasPath = _hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var hasIn_1 = hasIn$1;
var baseIsEqual = _baseIsEqual,
  get = get_1,
  hasIn = hasIn_1,
  isKey$1 = _isKey,
  isStrictComparable = _isStrictComparable,
  matchesStrictComparable = _matchesStrictComparable,
  toKey$1 = _toKey;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
  COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$1(path), srcValue);
  }
  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
var _baseMatchesProperty = baseMatchesProperty$1;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function baseProperty$1(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}
var _baseProperty = baseProperty$1;
var baseGet$1 = _baseGet;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep$1(path) {
  return function (object) {
    return baseGet$1(object, path);
  };
}
var _basePropertyDeep = basePropertyDeep$1;
var baseProperty = _baseProperty,
  basePropertyDeep = _basePropertyDeep,
  isKey = _isKey,
  toKey = _toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property$1(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
var property_1 = property$1;
var baseMatches = _baseMatches,
  baseMatchesProperty = _baseMatchesProperty,
  identity$1 = identity_1,
  isArray$1 = isArray_1,
  property = property_1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee$1(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity$1;
  }
  if (_typeof(value) == 'object') {
    return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
var _baseIteratee = baseIteratee$1;
var baseEach = _baseEach,
  isArrayLike$1 = isArrayLike_1;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap$1(collection, iteratee) {
  var index = -1,
    result = isArrayLike$1(collection) ? Array(collection.length) : [];
  baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}
var _baseMap = baseMap$1;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */

function baseSortBy$1(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
var _baseSortBy = baseSortBy$1;
var isSymbol = isSymbol_1;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending$1(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
      valIsNull = value === null,
      valIsReflexive = value === value,
      valIsSymbol = isSymbol(value);
    var othIsDefined = other !== undefined,
      othIsNull = other === null,
      othIsReflexive = other === other,
      othIsSymbol = isSymbol(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
var _compareAscending = compareAscending$1;
var compareAscending = _compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple$1(object, other, orders) {
  var index = -1,
    objCriteria = object.criteria,
    othCriteria = other.criteria,
    length = objCriteria.length,
    ordersLength = orders.length;
  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}
var _compareMultiple = compareMultiple$1;
var arrayMap = _arrayMap,
  baseGet = _baseGet,
  baseIteratee = _baseIteratee,
  baseMap = _baseMap,
  baseSortBy = _baseSortBy,
  baseUnary = _baseUnary,
  compareMultiple = _compareMultiple,
  identity = identity_1,
  isArray = isArray_1;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy$1(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function (iteratee) {
      if (isArray(iteratee)) {
        return function (value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }
  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return {
      'criteria': criteria,
      'index': ++index,
      'value': value
    };
  });
  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}
var _baseOrderBy = baseOrderBy$1;
var eq = eq_1,
  isArrayLike = isArrayLike_1,
  isIndex = _isIndex,
  isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseFlatten = _baseFlatten,
  baseOrderBy = _baseOrderBy,
  baseRest = _baseRest,
  isIterateeCall = _isIterateeCall;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});
var sortBy_1 = sortBy;
function lookup(element) {
  var _parent2;
  var parent = element;
  var component = (_parent2 = parent) === null || _parent2 === void 0 ? void 0 : _parent2.$component;
  while (!component && parent) {
    var _parent3;
    parent = parent.parentElement;
    component = (_parent3 = parent) === null || _parent3 === void 0 ? void 0 : _parent3.$component;
  }
  return component;
}
var ngVue = [function () {
  return {
    restrict: 'A',
    terminal: true,
    // any directive with lower priority will be ignored
    priority: 1001,
    // 1 more than ngNonBindable => disable angular interpolation!
    link: function link(scope, element, attrs) {
      var _Vue$1$prototype, _Vue$1$prototype$$ngV;
      var ngDelegates = loadExposedDelegates(attrs);
      var ngProperties = loadExposedProperties(attrs);
      var syncedPropertiesMapping = loadSyncedPropertiesMapping(attrs);

      // test declarations

      ngProperties.forEach(function (prop) {
        return testDefined(scope, prop);
      });
      ngDelegates.forEach(function (prop) {
        return testDefined(scope, prop);
      });
      var vueData = {};
      var vueMethods = {};
      ngProperties.filter(paths.isRoot).forEach(function (ngProp) {
        var vueProp = ngProp;
        vueData[vueProp] = scope.$eval(ngProp); // set initial value
      });

      // Create root component;
      var options = {};
      if (attrs.ngVue) options = scope.$eval(attrs.ngVue) || {};
      options = omit_1(options, 'props', 'data', 'computed', 'methods', 'watch');
      ngDelegates.forEach(function (ngDelegate) {
        vueMethods[ngDelegate] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          console.debug("ng(vue): Calling ng delegate: ".concat(ngDelegate, "()"));
          safeApply(scope, function () {
            return scope.$eval(ngDelegate).apply(scope, args);
          });
        };
      });

      // try to lookup the closet vue parent component in the DOM tree; 
      var parent = lookup(element) || ((_Vue$1$prototype = Vue$1.prototype) === null || _Vue$1$prototype === void 0 ? void 0 : (_Vue$1$prototype$$ngV = _Vue$1$prototype.$ngVue) === null || _Vue$1$prototype$$ngV === void 0 ? void 0 : _Vue$1$prototype$$ngV.vueApp) || undefined;
      console.log('parent', parent);
      var vm = new Vue$1(_objectSpread(_objectSpread({
        parent: parent
      }, options), {}, {
        data: vueData,
        methods: vueMethods
      })).$mount(element[0]);
      vm.$el.$component = vm; //save current component to DOM element 

      scope.$on('$destroy', function () {
        //Destroy vue component when parent scope is destroyed. 
        console.debug('ng(vue): destroying vue-comp', vm);
        vm.$destroy();
      });

      // Watch changes

      ngProperties.forEach(function (ngProp) {
        var vueProp = ngProp;
        scope.$watch(ngProp, function (value) {
          console.debug("ng(vue): ng(".concat(ngProp, ") => vue(").concat(vueProp, ") ="), value);
          var target = vm;
          var prop = vueProp;
          if (!paths.isRoot(prop)) {
            target = get_1(vm, paths.parent(prop));
            prop = paths.leaf(prop);
          }
          Vue$1.set(target, prop, value);
        });
      });
      forEach_1(syncedPropertiesMapping, function (ngProp, vueProp) {
        // .sync

        vm.$children.forEach(function (c) {
          return c.$on("update:".concat(camelCase_1(vueProp)), function (value) {
            console.debug("ng(vue): vue(".concat(vueProp, ") => ng(").concat(ngProp, ") ="), value);
            safeApply(scope, function () {
              return get_1(scope, ngProp, value);
            });
          });
        });

        //shoudl only use CamelCase.. keep kebabCase support for backward compatibility 
        vm.$children.forEach(function (c) {
          return c.$on("update:".concat(kebabCase_1(vueProp)), function (value) {
            console.warn("$emit event using camelCase (update:".concat(camelCase_1(vueProp), "). instead of kebabCase (update:").concat(kebabCase_1(vueProp), ")."));
            console.debug("ng(vue): vue(".concat(vueProp, ") => ng(").concat(ngProp, ") ="), value);
            safeApply(scope, function () {
              return get_1(scope, ngProp, value);
            });
          });
        });
      });
    }
  };
  function loadExposedProperties(attrs) {
    var _attrs$ngVueExpose;
    var vDirectives = /^(?:v-model|v-html|v-text|v-show|v-class|v-attr|v-style|v-if)(?:\.[a-z0-9]+)*$/i;
    var vBind = /^(?:v-bind)?:[a-z-]+(\.[a-z]+)*$/i;
    var vBindValue = /^[a-z$_][a-z0-9$_]*(\.[a-z$_][a-z0-9$_]*)*$/i;
    var properties = ((_attrs$ngVueExpose = attrs.ngVueExpose) !== null && _attrs$ngVueExpose !== void 0 ? _attrs$ngVueExpose : '').split(',').map(function (o) {
      return o.trim();
    }).filter(function (o) {
      return vBindValue.test(o);
    });

    // autodetect simple binding on props detect

    var attributes = remapAttributes(attrs);
    forEach_1(attributes, function (value, name) {
      var validName = vBind.test(name) || vDirectives.test(name);
      if (validName && vBindValue.test(value)) {
        properties.push(value);
      }
    });

    // Add parent properties

    var allProperties = _toConsumableArray(properties);
    properties.forEach(function (prop) {
      allProperties = union_1(allProperties, paths.parents(prop));
    });
    return sortBy_1(uniq_1(allProperties));
  }
  function loadSyncedPropertiesMapping(attrs) {
    // autodetect simple binding on props detect

    var vModel = /^(?:v-model)$/i;
    var vBind = /^(?:v-bind)?:([a-z-]+)\.sync*$/i;
    var vBindValue = /^[a-z$_][a-z0-9$_]*(\.[a-z$_][a-z0-9$_]*)*$/i;
    var mapping = {};
    var attributes = remapAttributes(attrs);
    forEach_1(attributes, function (value, name) {
      if (vModel.test(name)) {
        var vueProp = 'value';
        if (!vBindValue.test(value)) throw Error("Unsupported v-model binding value: ".concat(value));
        mapping[vueProp] = value;
      }
      if (vBind.test(name)) {
        var _vueProp = name.replace(vBind, '$1') // Keep only property name
        .replace(/-[a-z]/g, function (m) {
          return m[1].toUpperCase();
        }).replace(/^[A-Z]/, function (m) {
          return m[1].toLowerCase();
        }); // convert to camel-case

        if (!vBindValue.test(value)) throw Error("Unsupported v-bind:".concat(_vueProp, ".sync binding value: ").concat(value));
        mapping[_vueProp] = value;
      }
    });
    return mapping;
  }
  function loadExposedDelegates(attrs) {
    var _attrs$ngVueExpose2;
    var ngVueDeclaredRe = /^&([a-z$_][a-z0-9$_]*)$/i;
    var ngDelegates = ((_attrs$ngVueExpose2 = attrs.ngVueExpose) !== null && _attrs$ngVueExpose2 !== void 0 ? _attrs$ngVueExpose2 : '').split(',').map(function (o) {
      return o.trim();
    }).filter(function (o) {
      return ngVueDeclaredRe.test(o);
    }).map(function (o) {
      return o.replace(ngVueDeclaredRe, '$1');
    });

    // autodetect simple delegate call with empty ()
    // eg: call_function()

    var vOnRe = /^(?:v-on:|@)[a-z-]+(:[a-z0-9-]+)?(\.[a-z0-9-]+)*/i;
    var vOnDelegateRe = /^([a-z_$][a-z0-9_$]*)(?:\(\))?$/i;
    var attributes = remapAttributes(attrs);
    forEach_1(attributes, function (value, name) {
      var validName = vOnRe.test(name);
      if (validName && vOnDelegateRe.test(value)) {
        ngDelegates.push(value.replace(vOnDelegateRe, '$1'));
      }
    });
    return ngDelegates;
  }
  function remapAttributes(attrs) {
    var attributes = {};
    forEach_1(attrs.$attr, function (name, key) {
      var value = attrs[key];
      attributes[name] = value;
    });
    return attributes;
  }
  function testDefined(scope, expression) {
    if (scope.$eval(expression) === undefined) {
      throw Error("\"".concat(expression, "\" is not defined on parent scope"));
    }
  }
}];
export { angularVueAuthPlugin as AngularVueAuthPlugin, ngVue as AngularVueDirective, AngularVuePlugin, AngularVueRoutePlugin, AngularVueRouterPlugin, CreateAngularVuePlainPlugin, AngularVueComponent as VueAngularComponent };
//# sourceMappingURL=index.mjs.map
