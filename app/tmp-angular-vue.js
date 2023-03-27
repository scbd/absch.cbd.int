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
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import t from "angular";
import r from "Vue";
function e(t, r) {
  return {
    install: function install(e, n) {
      e.prototype[t] || (e.prototype[t] = r);
    }
  };
}
function n(t) {
  if (!t) throw new Error("Angular $injector not provided, cannot use AngularVueRoutePlugin plugin");
  var r = t.get("$location"),
    e = t.get("$route"),
    n = t.get("$rootScope");
  if (!r) throw new Error("Angular $location service not available, cannot use AngularVueRoutePlugin plugin");
  if (!e) throw new Error("Angular $route service not available, cannot use AngularVueRoutePlugin");
  var o = window.Vue.observable({
    _route: null
  });
  function u() {
    var _e$current;
    var t = r.path(),
      n = _objectSpread({}, r.search() || {}),
      u = _objectSpread({}, ((_e$current = e.current) === null || _e$current === void 0 ? void 0 : _e$current.params) || {});
    o._route = {
      get path() {
        return t;
      },
      get query() {
        return _objectSpread({}, n);
      },
      get params() {
        return _objectSpread({}, u);
      }
    };
  }
  if (n.$on("$routeUpdate", function () {
    u();
  }), !e.current) {
    var _t2 = n.$watch(function () {
      return e.current;
    }, function (r) {
      void 0 !== r && (_t2(), u());
    });
  }
  return u(), {
    install: function install(t, r) {
      t.prototype.$route || Object.defineProperty(t.prototype, "$route", {
        get: function get() {
          return o._route;
        }
      });
    }
  };
}
function o(t) {
  if (!t) throw new Error("Angular $injector not provided, cannot use AngularVueRouterPlugin plugin");
  var r = t.get("$location"),
    e = t.get("$rootScope");
  if (!r) throw new Error("Angular $location service not available, cannot use AngularVueRouterPlugin plugin");
  var n = function n(t) {
    e.$$phase ? t() : e.$apply(t);
  };
  var o = {
    push: function push(_ref) {
      var t = _ref.path,
        e = _ref.query;
      n(function () {
        t && r.path(t), e && r.search(e || {});
      });
    },
    replace: function replace() {
      var _this = this;
      for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
        t[_key] = arguments[_key];
      }
      n(function () {
        r.replace(), _this.push.apply(_this, t);
      });
    }
  };
  return {
    install: function install(t, r) {
      t.prototype.$router || (t.prototype.$router = o);
    }
  };
}
function u() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    t = _ref2.logout,
    r = _ref2.fetchUser;
  var e = Vue.observable({
      user: null,
      userToken: null
    }),
    n = {
      get user() {
        return e.user;
      },
      get loggedIn() {
        return !!(e.user && e?.user?.isAuthenticated);
      },
      setUser: function setUser(t) {
        e.user = t;
      },
      setUserToken: function setUserToken(t) {
        e.userToken = t;
      },
      logout: function logout() {
        if (!t) throw new Error("logout Not Implemented");
        t();
      },
      fetchUser: function fetchUser() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var t;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (r) {
                    _context.next = 2;
                    break;
                  }
                  throw new Error("fetchUser Not Implemented");
                case 2:
                  _context.next = 4;
                  return r();
                case 4:
                  t = _context.sent;
                  return _context.abrupt("return", (_this2.setUser(t), t));
                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      hasScope: function hasScope(t) {
        var _this3 = this;
        var r = [];
        if ("string" == typeof t) r = [t];else if (!Array.isArray(t)) throw new Error("`scopeName` must be string or array od string");
        r = t;
        return !!r.find(function (t) {
          var _this3$user;
          return (_this3$user = _this3.user) === null || _this3$user === void 0 ? void 0 : _this3$user.roles.includes(t);
        });
      },
      refreshTokens: function refreshTokens() {
        throw new Error("refreshTokens Not Implemented");
      },
      onError: function onError() {
        throw new Error("onError Not Implemented");
      },
      onRedirect: function onRedirect() {
        throw new Error("onRedirect Not Implemented");
      },
      strategy: {
        token: {
          get: function get() {
            return e.userToken;
          },
          set: function set(t) {
            e.userToken = t;
          }
        },
        get refreshToken() {
          throw new Error("refreshToken Not Implemented");
        }
      }
    };
  return {
    install: function install(t, r) {
      t.prototype.$auth || Object.defineProperty(t.prototype, "$auth", {
        get: function get() {
          return n;
        }
      });
    }
  };
}
var a = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
  i = "object" == _typeof(a) && a && a.Object === Object && a,
  c = i,
  f = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
  s = c || f || Function("return this")(),
  l = s.Symbol;
var v = function v(t, r) {
    for (var e = -1, n = null == t ? 0 : t.length, o = Array(n); ++e < n;) {
      o[e] = r(t[e], e, t);
    }
    return o;
  },
  p = Array.isArray,
  h = l,
  d = Object.prototype,
  b = d.hasOwnProperty,
  g = d.toString,
  y = h ? h.toStringTag : void 0;
var j = function j(t) {
    var r = b.call(t, y),
      e = t[y];
    try {
      t[y] = void 0;
      var n = !0;
    } catch (t) {}
    var o = g.call(t);
    return n && (r ? t[y] = e : delete t[y]), o;
  },
  _ = Object.prototype.toString;
var $ = j,
  w = function w(t) {
    return _.call(t);
  },
  A = l ? l.toStringTag : void 0;
var m = function m(t) {
  return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : A && A in Object(t) ? $(t) : w(t);
};
var x = function x(t) {
    return null != t && "object" == _typeof(t);
  },
  O = m,
  E = x;
var z = function z(t) {
    return "symbol" == _typeof(t) || E(t) && "[object Symbol]" == O(t);
  },
  S = v,
  U = p,
  I = z,
  P = l ? l.prototype : void 0,
  V = P ? P.toString : void 0;
var T = function t(r) {
    if ("string" == typeof r) return r;
    if (U(r)) return S(r, t) + "";
    if (I(r)) return V ? V.call(r) : "";
    var e = r + "";
    return "0" == e && 1 / r == -Infinity ? "-0" : e;
  },
  k = T;
var R = function R(t) {
  return null == t ? "" : k(t);
};
var C = function C(t, r, e) {
    var n = -1,
      o = t.length;
    r < 0 && (r = -r > o ? 0 : o + r), (e = e > o ? o : e) < 0 && (e += o), o = r > e ? 0 : e - r >>> 0, r >>>= 0;
    for (var u = Array(o); ++n < o;) {
      u[n] = t[n + r];
    }
    return u;
  },
  D = C;
var N = function N(t, r, e) {
    var n = t.length;
    return e = void 0 === e ? n : e, !r && e >= n ? t : D(t, r, e);
  },
  L = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
var F = function F(t) {
  return L.test(t);
};
var M = function M(t) {
    return t.split("");
  },
  B = "[\\ud800-\\udfff]",
  Z = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
  G = "\\ud83c[\\udffb-\\udfff]",
  W = "[^\\ud800-\\udfff]",
  q = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  H = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  Y = "(?:" + Z + "|" + G + ")" + "?",
  J = "[\\ufe0e\\ufe0f]?" + Y + ("(?:\\u200d(?:" + [W, q, H].join("|") + ")[\\ufe0e\\ufe0f]?" + Y + ")*"),
  K = "(?:" + [W + Z + "?", Z, q, H, B].join("|") + ")",
  Q = RegExp(G + "(?=" + G + ")|" + K + J, "g");
var X = M,
  tt = F,
  rt = function rt(t) {
    return t.match(Q) || [];
  };
var et = N,
  nt = F,
  ot = function ot(t) {
    return tt(t) ? rt(t) : X(t);
  },
  ut = R;
var at = function (t) {
    return function (r) {
      r = ut(r);
      var e = nt(r) ? ot(r) : void 0,
        n = e ? e[0] : r.charAt(0),
        o = e ? et(e, 1).join("") : r.slice(1);
      return n[t]() + o;
    };
  }("toUpperCase"),
  it = R,
  ct = at;
var ft = function ft(t) {
  return ct(it(t).toLowerCase());
};
var st = function st(t, r, e, n) {
  var o = -1,
    u = null == t ? 0 : t.length;
  for (n && u && (e = t[++o]); ++o < u;) {
    e = r(e, t[o], o, t);
  }
  return e;
};
var lt = function (t) {
    return function (r) {
      return null == t ? void 0 : t[r];
    };
  }({
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "Ç": "C",
    "ç": "c",
    "Ð": "D",
    "ð": "d",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "Ñ": "N",
    "ñ": "n",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "Ý": "Y",
    "ý": "y",
    "ÿ": "y",
    "Æ": "Ae",
    "æ": "ae",
    "Þ": "Th",
    "þ": "th",
    "ß": "ss",
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "s"
  }),
  vt = R,
  pt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
  ht = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g");
var dt = function dt(t) {
    return (t = vt(t)) && t.replace(pt, lt).replace(ht, "");
  },
  bt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
var gt = function gt(t) {
    return t.match(bt) || [];
  },
  yt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
var jt = function jt(t) {
    return yt.test(t);
  },
  _t = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
  $t = "[" + _t + "]",
  wt = "\\d+",
  At = "[\\u2700-\\u27bf]",
  mt = "[a-z\\xdf-\\xf6\\xf8-\\xff]",
  xt = "[^\\ud800-\\udfff" + _t + wt + "\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",
  Ot = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  Et = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  zt = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
  St = "(?:" + mt + "|" + xt + ")",
  Ut = "(?:" + zt + "|" + xt + ")",
  It = "(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",
  Pt = "[\\ufe0e\\ufe0f]?" + It + ("(?:\\u200d(?:" + ["[^\\ud800-\\udfff]", Ot, Et].join("|") + ")[\\ufe0e\\ufe0f]?" + It + ")*"),
  Vt = "(?:" + [At, Ot, Et].join("|") + ")" + Pt,
  Tt = RegExp([zt + "?" + mt + "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" + [$t, zt, "$"].join("|") + ")", Ut + "+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" + [$t, zt + St, "$"].join("|") + ")", zt + "?" + St + "+(?:['’](?:d|ll|m|re|s|t|ve))?", zt + "+(?:['’](?:D|LL|M|RE|S|T|VE))?", "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", wt, Vt].join("|"), "g");
var kt = gt,
  Rt = jt,
  Ct = R,
  Dt = function Dt(t) {
    return t.match(Tt) || [];
  };
var Nt = st,
  Lt = dt,
  Ft = function Ft(t, r, e) {
    return t = Ct(t), void 0 === (r = e ? void 0 : r) ? Rt(t) ? Dt(t) : kt(t) : t.match(r) || [];
  },
  Mt = RegExp("['’]", "g");
var Bt = function Bt(t) {
    return function (r) {
      return Nt(Ft(Lt(r).replace(Mt, "")), t, "");
    };
  },
  Zt = ft,
  Gt = Bt(function (t, r, e) {
    return r = r.toLowerCase(), t + (e ? Zt(r) : r);
  });
function Wt(t, r) {
  var e = t.$root.$$phase;
  "$apply" == e || "$digest" == e ? r() : t.$apply(r);
}
var qt = {
  render: function render(t) {
    return t(null, "angular placeholder");
  },
  mounted: function mounted() {
    var _t$element$parents,
      _this4 = this;
    if (!this.$ngVue) throw new Error("AngularVuePlugin not installed");
    var r = this.$ngVue.$injector,
      e = (((_t$element$parents = t.element(this.$el).parents(".ng-scope:first")) === null || _t$element$parents === void 0 ? void 0 : _t$element$parents.scope()) || r.get("$rootScope")).$new(!0);
    this.$scope = e, Object.keys(this.$attrs).forEach(function (t) {
      var r = Gt(t);
      console.debug("vue(ng): initial set vue => ng (".concat(r, "):"), _this4.$attrs[t]), e[r] = _this4.$attrs[t], _this4.$watch(function () {
        return _this4.$attrs[t];
      }, function (t) {
        e.$$destroyed || Wt(e, function () {
          e[r] !== t && (console.debug("vue(ng): vue => ng (".concat(r, ")"), t), e[r] = t);
        });
      }), e.$watch(function () {
        return e[r];
      }, function (e) {
        _this4.$attrs[t] !== e && (console.debug("vue(ng): ng => vue (".concat(r, ")"), e), _this4.$emit("update:".concat(r), e));
      });
    });
    var n = function (t) {
        var r = new Vue({
          render: function render() {
            return t;
          }
        });
        r.$mount();
        var e = r.$el;
        return r.$destroy(), e;
      }(this.$slots.default),
      o = r.get("$compile")(n),
      _o2 = o(e),
      _o3 = _slicedToArray(_o2, 1),
      u = _o3[0];
    u.$component = this, this.$el.parentElement.replaceChild(u, this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    var t = this.$scope;
    t && (console.debug("vue(ng): destroying ng-scope", t), delete this.$scope, t.$destroy());
  }
};
function Ht(_ref3) {
  var r = _ref3.$injector,
    e = _ref3.ngApp,
    n = _ref3.vueApp;
  var o = {
    get $injector() {
      return r || t.injector();
    },
    get vueApp() {
      return n;
    },
    get ngApp() {
      return e;
    }
  };
  return {
    install: function install(t, r) {
      if (!t.prototype.$ngVue) {
        var _ref4 = r || {},
          _n2 = _ref4.vueNgName;
        t.component(((e = Gt(e = _n2 || "VueNg")) && (e = e[0].toUpperCase() + e.slice(1)), e), qt), Object.defineProperty(t.prototype, "$ngVue", {
          get: function get() {
            return o;
          }
        });
      }
      var e;
    }
  };
}
var Yt = {
  parent: Jt,
  parents: function parents(t) {
    var r = [];
    var e = Jt(t);
    for (; e;) {
      r.push(e), e = Jt(e);
    }
    return r;
  },
  leaf: function leaf(t) {
    return Kt(t).pop();
  },
  root: function root(t) {
    return Kt(t)[0];
  },
  isRoot: function isRoot(t) {
    return 1 === Kt(t).length;
  }
};
function Jt(t) {
  var r = Kt(t);
  return r.pop(), function (t) {
    return t.join(".");
  }(r);
}
function Kt(t) {
  if (!t) throw new Error("Invalid path ".concat(t));
  return t.split(".");
}
var Qt = function Qt() {
  this.__data__ = [], this.size = 0;
};
var Xt = function Xt(t, r) {
    return t === r || t != t && r != r;
  },
  tr = Xt;
var rr = function rr(t, r) {
    for (var e = t.length; e--;) {
      if (tr(t[e][0], r)) return e;
    }
    return -1;
  },
  er = rr,
  nr = Array.prototype.splice;
var or = rr;
var ur = rr;
var ar = rr;
var ir = Qt,
  cr = function cr(t) {
    var r = this.__data__,
      e = er(r, t);
    return !(e < 0) && (e == r.length - 1 ? r.pop() : nr.call(r, e, 1), --this.size, !0);
  },
  fr = function fr(t) {
    var r = this.__data__,
      e = or(r, t);
    return e < 0 ? void 0 : r[e][1];
  },
  sr = function sr(t) {
    return ur(this.__data__, t) > -1;
  },
  lr = function lr(t, r) {
    var e = this.__data__,
      n = ar(e, t);
    return n < 0 ? (++this.size, e.push([t, r])) : e[n][1] = r, this;
  };
function vr(t) {
  var r = -1,
    e = null == t ? 0 : t.length;
  for (this.clear(); ++r < e;) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
vr.prototype.clear = ir, vr.prototype.delete = cr, vr.prototype.get = fr, vr.prototype.has = sr, vr.prototype.set = lr;
var pr = vr,
  hr = pr;
var dr = function dr() {
  this.__data__ = new hr(), this.size = 0;
};
var br = function br(t) {
  var r = this.__data__,
    e = r.delete(t);
  return this.size = r.size, e;
};
var gr = function gr(t) {
  return this.__data__.get(t);
};
var yr = function yr(t) {
  return this.__data__.has(t);
};
var jr = function jr(t) {
    var r = _typeof(t);
    return null != t && ("object" == r || "function" == r);
  },
  _r = m,
  $r = jr;
var wr,
  Ar = function Ar(t) {
    if (!$r(t)) return !1;
    var r = _r(t);
    return "[object Function]" == r || "[object GeneratorFunction]" == r || "[object AsyncFunction]" == r || "[object Proxy]" == r;
  },
  mr = s["__core-js_shared__"],
  xr = (wr = /[^.]+$/.exec(mr && mr.keys && mr.keys.IE_PROTO || "")) ? "Symbol(src)_1." + wr : "";
var Or = function Or(t) {
    return !!xr && xr in t;
  },
  Er = Function.prototype.toString;
var zr = function zr(t) {
    if (null != t) {
      try {
        return Er.call(t);
      } catch (t) {}
      try {
        return t + "";
      } catch (t) {}
    }
    return "";
  },
  Sr = Ar,
  Ur = Or,
  Ir = jr,
  Pr = zr,
  Vr = /^\[object .+?Constructor\]$/,
  Tr = Function.prototype,
  kr = Object.prototype,
  Rr = Tr.toString,
  Cr = kr.hasOwnProperty,
  Dr = RegExp("^" + Rr.call(Cr).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
var Nr = function Nr(t) {
    return !(!Ir(t) || Ur(t)) && (Sr(t) ? Dr : Vr).test(Pr(t));
  },
  Lr = function Lr(t, r) {
    return null == t ? void 0 : t[r];
  };
var Fr = function Fr(t, r) {
    var e = Lr(t, r);
    return Nr(e) ? e : void 0;
  },
  Mr = Fr(s, "Map"),
  Br = Fr(Object, "create"),
  Zr = Br;
var Gr = function Gr() {
  this.__data__ = Zr ? Zr(null) : {}, this.size = 0;
};
var Wr = function Wr(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  },
  qr = Br,
  Hr = Object.prototype.hasOwnProperty;
var Yr = function Yr(t) {
    var r = this.__data__;
    if (qr) {
      var e = r[t];
      return "__lodash_hash_undefined__" === e ? void 0 : e;
    }
    return Hr.call(r, t) ? r[t] : void 0;
  },
  Jr = Br,
  Kr = Object.prototype.hasOwnProperty;
var Qr = Br;
var Xr = Gr,
  te = Wr,
  re = Yr,
  ee = function ee(t) {
    var r = this.__data__;
    return Jr ? void 0 !== r[t] : Kr.call(r, t);
  },
  ne = function ne(t, r) {
    var e = this.__data__;
    return this.size += this.has(t) ? 0 : 1, e[t] = Qr && void 0 === r ? "__lodash_hash_undefined__" : r, this;
  };
function oe(t) {
  var r = -1,
    e = null == t ? 0 : t.length;
  for (this.clear(); ++r < e;) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
oe.prototype.clear = Xr, oe.prototype.delete = te, oe.prototype.get = re, oe.prototype.has = ee, oe.prototype.set = ne;
var ue = oe,
  ae = pr,
  ie = Mr;
var ce = function ce(t) {
  var r = _typeof(t);
  return "string" == r || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== t : null === t;
};
var fe = function fe(t, r) {
    var e = t.__data__;
    return ce(r) ? e["string" == typeof r ? "string" : "hash"] : e.map;
  },
  se = fe;
var le = fe;
var ve = fe;
var pe = fe;
var he = function he() {
    this.size = 0, this.__data__ = {
      hash: new ue(),
      map: new (ie || ae)(),
      string: new ue()
    };
  },
  de = function de(t) {
    var r = se(this, t).delete(t);
    return this.size -= r ? 1 : 0, r;
  },
  be = function be(t) {
    return le(this, t).get(t);
  },
  ge = function ge(t) {
    return ve(this, t).has(t);
  },
  ye = function ye(t, r) {
    var e = pe(this, t),
      n = e.size;
    return e.set(t, r), this.size += e.size == n ? 0 : 1, this;
  };
function je(t) {
  var r = -1,
    e = null == t ? 0 : t.length;
  for (this.clear(); ++r < e;) {
    var n = t[r];
    this.set(n[0], n[1]);
  }
}
je.prototype.clear = he, je.prototype.delete = de, je.prototype.get = be, je.prototype.has = ge, je.prototype.set = ye;
var _e = je,
  $e = pr,
  we = Mr,
  Ae = _e;
var me = pr,
  xe = dr,
  Oe = br,
  Ee = gr,
  ze = yr,
  Se = function Se(t, r) {
    var e = this.__data__;
    if (e instanceof $e) {
      var n = e.__data__;
      if (!we || n.length < 199) return n.push([t, r]), this.size = ++e.size, this;
      e = this.__data__ = new Ae(n);
    }
    return e.set(t, r), this.size = e.size, this;
  };
function Ue(t) {
  var r = this.__data__ = new me(t);
  this.size = r.size;
}
Ue.prototype.clear = xe, Ue.prototype.delete = Oe, Ue.prototype.get = Ee, Ue.prototype.has = ze, Ue.prototype.set = Se;
var Ie = Ue;
var Pe = function Pe(t, r) {
    for (var e = -1, n = null == t ? 0 : t.length; ++e < n && !1 !== r(t[e], e, t);) {
      ;
    }
    return t;
  },
  Ve = Fr,
  Te = function () {
    try {
      var t = Ve(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch (t) {}
  }(),
  ke = Te;
var Re = function Re(t, r, e) {
    "__proto__" == r && ke ? ke(t, r, {
      configurable: !0,
      enumerable: !0,
      value: e,
      writable: !0
    }) : t[r] = e;
  },
  Ce = Re,
  De = Xt,
  Ne = Object.prototype.hasOwnProperty;
var Le = function Le(t, r, e) {
    var n = t[r];
    Ne.call(t, r) && De(n, e) && (void 0 !== e || r in t) || Ce(t, r, e);
  },
  Fe = Le,
  Me = Re;
var Be = function Be(t, r, e, n) {
  var o = !e;
  e || (e = {});
  for (var u = -1, a = r.length; ++u < a;) {
    var i = r[u],
      c = n ? n(e[i], t[i], i, e, t) : void 0;
    void 0 === c && (c = t[i]), o ? Me(e, i, c) : Fe(e, i, c);
  }
  return e;
};
var Ze = function Ze(t, r) {
    for (var e = -1, n = Array(t); ++e < t;) {
      n[e] = r(e);
    }
    return n;
  },
  Ge = m,
  We = x;
var qe = function qe(t) {
    return We(t) && "[object Arguments]" == Ge(t);
  },
  He = x,
  Ye = Object.prototype,
  Je = Ye.hasOwnProperty,
  Ke = Ye.propertyIsEnumerable,
  Qe = qe(function () {
    return arguments;
  }()) ? qe : function (t) {
    return He(t) && Je.call(t, "callee") && !Ke.call(t, "callee");
  },
  Xe = {
    exports: {}
  };
var tn = function tn() {
  return !1;
};
!function (t, r) {
  var e = s,
    n = tn,
    o = r && !r.nodeType && r,
    u = o && t && !t.nodeType && t,
    a = u && u.exports === o ? e.Buffer : void 0,
    i = (a ? a.isBuffer : void 0) || n;
  t.exports = i;
}(Xe, Xe.exports);
var rn = /^(?:0|[1-9]\d*)$/;
var en = function en(t, r) {
  var e = _typeof(t);
  return !!(r = null == r ? 9007199254740991 : r) && ("number" == e || "symbol" != e && rn.test(t)) && t > -1 && t % 1 == 0 && t < r;
};
var nn = function nn(t) {
    return "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991;
  },
  on = m,
  un = nn,
  an = x,
  cn = {};
cn["[object Float32Array]"] = cn["[object Float64Array]"] = cn["[object Int8Array]"] = cn["[object Int16Array]"] = cn["[object Int32Array]"] = cn["[object Uint8Array]"] = cn["[object Uint8ClampedArray]"] = cn["[object Uint16Array]"] = cn["[object Uint32Array]"] = !0, cn["[object Arguments]"] = cn["[object Array]"] = cn["[object ArrayBuffer]"] = cn["[object Boolean]"] = cn["[object DataView]"] = cn["[object Date]"] = cn["[object Error]"] = cn["[object Function]"] = cn["[object Map]"] = cn["[object Number]"] = cn["[object Object]"] = cn["[object RegExp]"] = cn["[object Set]"] = cn["[object String]"] = cn["[object WeakMap]"] = !1;
var fn = function fn(t) {
  return an(t) && un(t.length) && !!cn[on(t)];
};
var sn = function sn(t) {
    return function (r) {
      return t(r);
    };
  },
  ln = {
    exports: {}
  };
!function (t, r) {
  var e = i,
    n = r && !r.nodeType && r,
    o = n && t && !t.nodeType && t,
    u = o && o.exports === n && e.process,
    a = function () {
      try {
        var t = o && o.require && o.require("util").types;
        return t || u && u.binding && u.binding("util");
      } catch (t) {}
    }();
  t.exports = a;
}(ln, ln.exports);
var vn = fn,
  pn = sn,
  hn = ln.exports,
  dn = hn && hn.isTypedArray,
  bn = dn ? pn(dn) : vn,
  gn = Ze,
  yn = Qe,
  jn = p,
  _n = Xe.exports,
  $n = en,
  wn = bn,
  An = Object.prototype.hasOwnProperty;
var mn = function mn(t, r) {
    var e = jn(t),
      n = !e && yn(t),
      o = !e && !n && _n(t),
      u = !e && !n && !o && wn(t),
      a = e || n || o || u,
      i = a ? gn(t.length, String) : [],
      c = i.length;
    for (var f in t) {
      !r && !An.call(t, f) || a && ("length" == f || o && ("offset" == f || "parent" == f) || u && ("buffer" == f || "byteLength" == f || "byteOffset" == f) || $n(f, c)) || i.push(f);
    }
    return i;
  },
  xn = Object.prototype;
var On = function On(t) {
  var r = t && t.constructor;
  return t === ("function" == typeof r && r.prototype || xn);
};
var En = function En(t, r) {
    return function (e) {
      return t(r(e));
    };
  },
  zn = En(Object.keys, Object),
  Sn = On,
  Un = zn,
  In = Object.prototype.hasOwnProperty;
var Pn = Ar,
  Vn = nn;
var Tn = function Tn(t) {
    return null != t && Vn(t.length) && !Pn(t);
  },
  kn = mn,
  Rn = function Rn(t) {
    if (!Sn(t)) return Un(t);
    var r = [];
    for (var e in Object(t)) {
      In.call(t, e) && "constructor" != e && r.push(e);
    }
    return r;
  },
  Cn = Tn;
var Dn = function Dn(t) {
    return Cn(t) ? kn(t) : Rn(t);
  },
  Nn = Be,
  Ln = Dn;
var Fn = function Fn(t, r) {
  return t && Nn(r, Ln(r), t);
};
var Mn = jr,
  Bn = On,
  Zn = function Zn(t) {
    var r = [];
    if (null != t) for (var e in Object(t)) {
      r.push(e);
    }
    return r;
  },
  Gn = Object.prototype.hasOwnProperty;
var Wn = mn,
  qn = function qn(t) {
    if (!Mn(t)) return Zn(t);
    var r = Bn(t),
      e = [];
    for (var n in t) {
      ("constructor" != n || !r && Gn.call(t, n)) && e.push(n);
    }
    return e;
  },
  Hn = Tn;
var Yn = function Yn(t) {
    return Hn(t) ? Wn(t, !0) : qn(t);
  },
  Jn = Be,
  Kn = Yn;
var Qn = function Qn(t, r) {
    return t && Jn(r, Kn(r), t);
  },
  Xn = {
    exports: {}
  };
!function (t, r) {
  var e = s,
    n = r && !r.nodeType && r,
    o = n && t && !t.nodeType && t,
    u = o && o.exports === n ? e.Buffer : void 0,
    a = u ? u.allocUnsafe : void 0;
  t.exports = function (t, r) {
    if (r) return t.slice();
    var e = t.length,
      n = a ? a(e) : new t.constructor(e);
    return t.copy(n), n;
  };
}(Xn, Xn.exports);
var to = function to(t, r) {
  var e = -1,
    n = t.length;
  for (r || (r = Array(n)); ++e < n;) {
    r[e] = t[e];
  }
  return r;
};
var ro = function ro() {
    return [];
  },
  eo = function eo(t, r) {
    for (var e = -1, n = null == t ? 0 : t.length, o = 0, u = []; ++e < n;) {
      var a = t[e];
      r(a, e, t) && (u[o++] = a);
    }
    return u;
  },
  no = ro,
  oo = Object.prototype.propertyIsEnumerable,
  uo = Object.getOwnPropertySymbols,
  ao = uo ? function (t) {
    return null == t ? [] : (t = Object(t), eo(uo(t), function (r) {
      return oo.call(t, r);
    }));
  } : no,
  io = Be,
  co = ao;
var fo = function fo(t, r) {
  return io(t, co(t), r);
};
var so = function so(t, r) {
    for (var e = -1, n = r.length, o = t.length; ++e < n;) {
      t[o + e] = r[e];
    }
    return t;
  },
  lo = En(Object.getPrototypeOf, Object),
  vo = so,
  po = lo,
  ho = ao,
  bo = ro,
  go = Object.getOwnPropertySymbols ? function (t) {
    for (var r = []; t;) {
      vo(r, ho(t)), t = po(t);
    }
    return r;
  } : bo,
  yo = Be,
  jo = go;
var _o = function _o(t, r) {
    return yo(t, jo(t), r);
  },
  $o = so,
  wo = p;
var Ao = function Ao(t, r, e) {
    var n = r(t);
    return wo(t) ? n : $o(n, e(t));
  },
  mo = Ao,
  xo = ao,
  Oo = Dn;
var Eo = function Eo(t) {
    return mo(t, Oo, xo);
  },
  zo = Ao,
  So = go,
  Uo = Yn;
var Io = function Io(t) {
    return zo(t, Uo, So);
  },
  Po = Fr(s, "DataView"),
  Vo = Fr(s, "Promise"),
  To = Fr(s, "Set"),
  ko = Po,
  Ro = Mr,
  Co = Vo,
  Do = To,
  No = Fr(s, "WeakMap"),
  Lo = m,
  Fo = zr,
  Mo = Fo(ko),
  Bo = Fo(Ro),
  Zo = Fo(Co),
  Go = Fo(Do),
  Wo = Fo(No),
  qo = Lo;
(ko && "[object DataView]" != qo(new ko(new ArrayBuffer(1))) || Ro && "[object Map]" != qo(new Ro()) || Co && "[object Promise]" != qo(Co.resolve()) || Do && "[object Set]" != qo(new Do()) || No && "[object WeakMap]" != qo(new No())) && (qo = function qo(t) {
  var r = Lo(t),
    e = "[object Object]" == r ? t.constructor : void 0,
    n = e ? Fo(e) : "";
  if (n) switch (n) {
    case Mo:
      return "[object DataView]";
    case Bo:
      return "[object Map]";
    case Zo:
      return "[object Promise]";
    case Go:
      return "[object Set]";
    case Wo:
      return "[object WeakMap]";
  }
  return r;
});
var Ho = qo,
  Yo = Object.prototype.hasOwnProperty;
var Jo = function Jo(t) {
    var r = t.length,
      e = new t.constructor(r);
    return r && "string" == typeof t[0] && Yo.call(t, "index") && (e.index = t.index, e.input = t.input), e;
  },
  Ko = s.Uint8Array,
  Qo = Ko;
var Xo = function Xo(t) {
    var r = new t.constructor(t.byteLength);
    return new Qo(r).set(new Qo(t)), r;
  },
  tu = Xo;
var ru = function ru(t, r) {
    var e = r ? tu(t.buffer) : t.buffer;
    return new t.constructor(e, t.byteOffset, t.byteLength);
  },
  eu = /\w*$/;
var nu = function nu(t) {
    var r = new t.constructor(t.source, eu.exec(t));
    return r.lastIndex = t.lastIndex, r;
  },
  ou = l ? l.prototype : void 0,
  uu = ou ? ou.valueOf : void 0;
var au = Xo;
var iu = Xo,
  cu = ru,
  fu = nu,
  su = function su(t) {
    return uu ? Object(uu.call(t)) : {};
  },
  lu = function lu(t, r) {
    var e = r ? au(t.buffer) : t.buffer;
    return new t.constructor(e, t.byteOffset, t.length);
  };
var vu = function vu(t, r, e) {
    var n = t.constructor;
    switch (r) {
      case "[object ArrayBuffer]":
        return iu(t);
      case "[object Boolean]":
      case "[object Date]":
        return new n(+t);
      case "[object DataView]":
        return cu(t, e);
      case "[object Float32Array]":
      case "[object Float64Array]":
      case "[object Int8Array]":
      case "[object Int16Array]":
      case "[object Int32Array]":
      case "[object Uint8Array]":
      case "[object Uint8ClampedArray]":
      case "[object Uint16Array]":
      case "[object Uint32Array]":
        return lu(t, e);
      case "[object Map]":
      case "[object Set]":
        return new n();
      case "[object Number]":
      case "[object String]":
        return new n(t);
      case "[object RegExp]":
        return fu(t);
      case "[object Symbol]":
        return su(t);
    }
  },
  pu = jr,
  hu = Object.create,
  du = function () {
    function t() {}
    return function (r) {
      if (!pu(r)) return {};
      if (hu) return hu(r);
      t.prototype = r;
      var e = new t();
      return t.prototype = void 0, e;
    };
  }(),
  bu = lo,
  gu = On;
var yu = function yu(t) {
    return "function" != typeof t.constructor || gu(t) ? {} : du(bu(t));
  },
  ju = Ho,
  _u = x;
var $u = function $u(t) {
    return _u(t) && "[object Map]" == ju(t);
  },
  wu = sn,
  Au = ln.exports,
  mu = Au && Au.isMap,
  xu = mu ? wu(mu) : $u,
  Ou = Ho,
  Eu = x;
var zu = function zu(t) {
    return Eu(t) && "[object Set]" == Ou(t);
  },
  Su = sn,
  Uu = ln.exports,
  Iu = Uu && Uu.isSet,
  Pu = Iu ? Su(Iu) : zu,
  Vu = Ie,
  Tu = Pe,
  ku = Le,
  Ru = Fn,
  Cu = Qn,
  Du = Xn.exports,
  Nu = to,
  Lu = fo,
  Fu = _o,
  Mu = Eo,
  Bu = Io,
  Zu = Ho,
  Gu = Jo,
  Wu = vu,
  qu = yu,
  Hu = p,
  Yu = Xe.exports,
  Ju = xu,
  Ku = jr,
  Qu = Pu,
  Xu = Dn,
  ta = Yn,
  ra = {};
ra["[object Arguments]"] = ra["[object Array]"] = ra["[object ArrayBuffer]"] = ra["[object DataView]"] = ra["[object Boolean]"] = ra["[object Date]"] = ra["[object Float32Array]"] = ra["[object Float64Array]"] = ra["[object Int8Array]"] = ra["[object Int16Array]"] = ra["[object Int32Array]"] = ra["[object Map]"] = ra["[object Number]"] = ra["[object Object]"] = ra["[object RegExp]"] = ra["[object Set]"] = ra["[object String]"] = ra["[object Symbol]"] = ra["[object Uint8Array]"] = ra["[object Uint8ClampedArray]"] = ra["[object Uint16Array]"] = ra["[object Uint32Array]"] = !0, ra["[object Error]"] = ra["[object Function]"] = ra["[object WeakMap]"] = !1;
var ea = function t(r, e, n, o, u, a) {
    var i,
      c = 1 & e,
      f = 2 & e,
      s = 4 & e;
    if (n && (i = u ? n(r, o, u, a) : n(r)), void 0 !== i) return i;
    if (!Ku(r)) return r;
    var l = Hu(r);
    if (l) {
      if (i = Gu(r), !c) return Nu(r, i);
    } else {
      var v = Zu(r),
        p = "[object Function]" == v || "[object GeneratorFunction]" == v;
      if (Yu(r)) return Du(r, c);
      if ("[object Object]" == v || "[object Arguments]" == v || p && !u) {
        if (i = f || p ? {} : qu(r), !c) return f ? Fu(r, Cu(i, r)) : Lu(r, Ru(i, r));
      } else {
        if (!ra[v]) return u ? r : {};
        i = Wu(r, v, c);
      }
    }
    a || (a = new Vu());
    var h = a.get(r);
    if (h) return h;
    a.set(r, i), Qu(r) ? r.forEach(function (o) {
      i.add(t(o, e, n, o, r, a));
    }) : Ju(r) && r.forEach(function (o, u) {
      i.set(u, t(o, e, n, u, r, a));
    });
    var d = l ? void 0 : (s ? f ? Bu : Mu : f ? ta : Xu)(r);
    return Tu(d || r, function (o, u) {
      d && (o = r[u = o]), ku(i, u, t(o, e, n, u, r, a));
    }), i;
  },
  na = p,
  oa = z,
  ua = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  aa = /^\w*$/;
var ia = function ia(t, r) {
    if (na(t)) return !1;
    var e = _typeof(t);
    return !("number" != e && "symbol" != e && "boolean" != e && null != t && !oa(t)) || aa.test(t) || !ua.test(t) || null != r && t in Object(r);
  },
  ca = _e;
function fa(t, r) {
  if ("function" != typeof t || null != r && "function" != typeof r) throw new TypeError("Expected a function");
  var e = function e() {
    var n = arguments,
      o = r ? r.apply(this, n) : n[0],
      u = e.cache;
    if (u.has(o)) return u.get(o);
    var a = t.apply(this, n);
    return e.cache = u.set(o, a) || u, a;
  };
  return e.cache = new (fa.Cache || ca)(), e;
}
fa.Cache = ca;
var sa = fa;
var la = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  va = /\\(\\)?/g,
  pa = function (t) {
    var r = sa(t, function (t) {
        return 500 === e.size && e.clear(), t;
      }),
      e = r.cache;
    return r;
  }(function (t) {
    var r = [];
    return 46 === t.charCodeAt(0) && r.push(""), t.replace(la, function (t, e, n, o) {
      r.push(n ? o.replace(va, "$1") : e || t);
    }), r;
  }),
  ha = p,
  da = ia,
  ba = pa,
  ga = R;
var ya = function ya(t, r) {
  return ha(t) ? t : da(t, r) ? [t] : ba(ga(t));
};
var ja = z;
var _a = function _a(t) {
    if ("string" == typeof t || ja(t)) return t;
    var r = t + "";
    return "0" == r && 1 / t == -Infinity ? "-0" : r;
  },
  $a = ya,
  wa = _a;
var Aa = function Aa(t, r) {
    for (var e = 0, n = (r = $a(r, t)).length; null != t && e < n;) {
      t = t[wa(r[e++])];
    }
    return e && e == n ? t : void 0;
  },
  ma = Aa,
  xa = C;
var Oa = ya,
  Ea = function Ea(t) {
    var r = null == t ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  },
  za = function za(t, r) {
    return r.length < 2 ? t : ma(t, xa(r, 0, -1));
  },
  Sa = _a;
var Ua = function Ua(t, r) {
    return r = Oa(r, t), null == (t = za(t, r)) || delete t[Sa(Ea(r))];
  },
  Ia = m,
  Pa = lo,
  Va = x,
  Ta = Function.prototype,
  ka = Object.prototype,
  Ra = Ta.toString,
  Ca = ka.hasOwnProperty,
  Da = Ra.call(Object);
var Na = function Na(t) {
  if (!Va(t) || "[object Object]" != Ia(t)) return !1;
  var r = Pa(t);
  if (null === r) return !0;
  var e = Ca.call(r, "constructor") && r.constructor;
  return "function" == typeof e && e instanceof e && Ra.call(e) == Da;
};
var La = function La(t) {
    return Na(t) ? void 0 : t;
  },
  Fa = Qe,
  Ma = p,
  Ba = l ? l.isConcatSpreadable : void 0;
var Za = so,
  Ga = function Ga(t) {
    return Ma(t) || Fa(t) || !!(Ba && t && t[Ba]);
  };
var Wa = function t(r, e, n, o, u) {
    var a = -1,
      i = r.length;
    for (n || (n = Ga), u || (u = []); ++a < i;) {
      var c = r[a];
      e > 0 && n(c) ? e > 1 ? t(c, e - 1, n, o, u) : Za(u, c) : o || (u[u.length] = c);
    }
    return u;
  },
  qa = Wa;
var Ha = function Ha(t) {
  return (null == t ? 0 : t.length) ? qa(t, 1) : [];
};
var Ya = function Ya(t, r, e) {
    switch (e.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, e[0]);
      case 2:
        return t.call(r, e[0], e[1]);
      case 3:
        return t.call(r, e[0], e[1], e[2]);
    }
    return t.apply(r, e);
  },
  Ja = Math.max;
var Ka = function Ka(t, r, e) {
  return r = Ja(void 0 === r ? t.length - 1 : r, 0), function () {
    for (var n = arguments, o = -1, u = Ja(n.length - r, 0), a = Array(u); ++o < u;) {
      a[o] = n[r + o];
    }
    o = -1;
    for (var i = Array(r + 1); ++o < r;) {
      i[o] = n[o];
    }
    return i[r] = e(a), Ya(t, this, i);
  };
};
var Qa = function Qa(t) {
    return t;
  },
  Xa = function Xa(t) {
    return function () {
      return t;
    };
  },
  ti = Te,
  ri = ti ? function (t, r) {
    return ti(t, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Xa(r),
      writable: !0
    });
  } : Qa,
  ei = Date.now;
var ni = function (t) {
    var r = 0,
      e = 0;
    return function () {
      var n = ei(),
        o = 16 - (n - e);
      if (e = n, o > 0) {
        if (++r >= 800) return arguments[0];
      } else r = 0;
      return t.apply(void 0, arguments);
    };
  }(ri),
  oi = Ha,
  ui = Ka,
  ai = ni;
var ii = v,
  ci = ea,
  fi = Ua,
  si = ya,
  li = Be,
  vi = La,
  pi = Io,
  hi = function (t) {
    return ai(ui(t, void 0, oi), t + "");
  }(function (t, r) {
    var e = {};
    if (null == t) return e;
    var n = !1;
    r = ii(r, function (r) {
      return r = si(r, t), n || (n = r.length > 1), r;
    }), li(t, pi(t), e), n && (e = ci(e, 7, vi));
    for (var o = r.length; o--;) {
      fi(e, r[o]);
    }
    return e;
  }),
  di = hi,
  bi = Aa;
var gi = function gi(t, r, e) {
  var n = null == t ? void 0 : bi(t, r);
  return void 0 === n ? e : n;
};
var yi = function (t) {
    return function (r, e, n) {
      for (var o = -1, u = Object(r), a = n(r), i = a.length; i--;) {
        var c = a[t ? i : ++o];
        if (!1 === e(u[c], c, u)) break;
      }
      return r;
    };
  }(),
  ji = Dn;
var _i = Tn;
var $i = function (t, r) {
    return function (e, n) {
      if (null == e) return e;
      if (!_i(e)) return t(e, n);
      for (var o = e.length, u = r ? o : -1, a = Object(e); (r ? u-- : ++u < o) && !1 !== n(a[u], u, a);) {
        ;
      }
      return e;
    };
  }(function (t, r) {
    return t && yi(t, r, ji);
  }),
  wi = Qa;
var Ai = Pe,
  mi = $i,
  xi = function xi(t) {
    return "function" == typeof t ? t : wi;
  },
  Oi = p;
var Ei = function Ei(t, r) {
    return (Oi(t) ? Ai : mi)(t, xi(r));
  },
  zi = Bt(function (t, r, e) {
    return t + (e ? "-" : "") + r.toLowerCase();
  }),
  Si = Qa,
  Ui = Ka,
  Ii = ni;
var Pi = function Pi(t, r) {
  return Ii(Ui(t, r, Si), t + "");
};
var Vi = _e,
  Ti = function Ti(t) {
    return this.__data__.set(t, "__lodash_hash_undefined__"), this;
  },
  ki = function ki(t) {
    return this.__data__.has(t);
  };
function Ri(t) {
  var r = -1,
    e = null == t ? 0 : t.length;
  for (this.__data__ = new Vi(); ++r < e;) {
    this.add(t[r]);
  }
}
Ri.prototype.add = Ri.prototype.push = Ti, Ri.prototype.has = ki;
var Ci = Ri;
var Di = function Di(t, r, e, n) {
    for (var o = t.length, u = e + (n ? 1 : -1); n ? u-- : ++u < o;) {
      if (r(t[u], u, t)) return u;
    }
    return -1;
  },
  Ni = function Ni(t) {
    return t != t;
  },
  Li = function Li(t, r, e) {
    for (var n = e - 1, o = t.length; ++n < o;) {
      if (t[n] === r) return n;
    }
    return -1;
  };
var Fi = function Fi(t, r, e) {
  return r == r ? Li(t, r, e) : Di(t, Ni, e);
};
var Mi = function Mi(t, r) {
  return !!(null == t ? 0 : t.length) && Fi(t, r, 0) > -1;
};
var Bi = function Bi(t, r, e) {
  for (var n = -1, o = null == t ? 0 : t.length; ++n < o;) {
    if (e(r, t[n])) return !0;
  }
  return !1;
};
var Zi = function Zi(t, r) {
  return t.has(r);
};
var Gi = function Gi(t) {
    var r = -1,
      e = Array(t.size);
    return t.forEach(function (t) {
      e[++r] = t;
    }), e;
  },
  Wi = To,
  qi = function qi() {},
  Hi = Wi && 1 / Gi(new Wi([, -0]))[1] == 1 / 0 ? function (t) {
    return new Wi(t);
  } : qi,
  Yi = Ci,
  Ji = Mi,
  Ki = Bi,
  Qi = Zi,
  Xi = Hi,
  tc = Gi;
var rc = function rc(t, r, e) {
    var n = -1,
      o = Ji,
      u = t.length,
      a = !0,
      i = [],
      c = i;
    if (e) a = !1, o = Ki;else if (u >= 200) {
      var f = r ? null : Xi(t);
      if (f) return tc(f);
      a = !1, o = Qi, c = new Yi();
    } else c = r ? [] : i;
    t: for (; ++n < u;) {
      var s = t[n],
        l = r ? r(s) : s;
      if (s = e || 0 !== s ? s : 0, a && l == l) {
        for (var v = c.length; v--;) {
          if (c[v] === l) continue t;
        }
        r && c.push(l), i.push(s);
      } else o(c, l, e) || (c !== i && c.push(l), i.push(s));
    }
    return i;
  },
  ec = Tn,
  nc = x;
var oc = Wa,
  uc = rc,
  ac = function ac(t) {
    return nc(t) && ec(t);
  },
  ic = Pi(function (t) {
    return uc(oc(t, 1, ac, !0));
  }),
  cc = rc;
var fc = function fc(t) {
  return t && t.length ? cc(t) : [];
};
var sc = Ci,
  lc = function lc(t, r) {
    for (var e = -1, n = null == t ? 0 : t.length; ++e < n;) {
      if (r(t[e], e, t)) return !0;
    }
    return !1;
  },
  vc = Zi;
var pc = function pc(t, r, e, n, o, u) {
  var a = 1 & e,
    i = t.length,
    c = r.length;
  if (i != c && !(a && c > i)) return !1;
  var f = u.get(t),
    s = u.get(r);
  if (f && s) return f == r && s == t;
  var l = -1,
    v = !0,
    p = 2 & e ? new sc() : void 0;
  for (u.set(t, r), u.set(r, t); ++l < i;) {
    var h = t[l],
      d = r[l];
    if (n) var b = a ? n(d, h, l, r, t, u) : n(h, d, l, t, r, u);
    if (void 0 !== b) {
      if (b) continue;
      v = !1;
      break;
    }
    if (p) {
      if (!lc(r, function (t, r) {
        if (!vc(p, r) && (h === t || o(h, t, e, n, u))) return p.push(r);
      })) {
        v = !1;
        break;
      }
    } else if (h !== d && !o(h, d, e, n, u)) {
      v = !1;
      break;
    }
  }
  return u.delete(t), u.delete(r), v;
};
var hc = Ko,
  dc = Xt,
  bc = pc,
  gc = function gc(t) {
    var r = -1,
      e = Array(t.size);
    return t.forEach(function (t, n) {
      e[++r] = [n, t];
    }), e;
  },
  yc = Gi,
  jc = l ? l.prototype : void 0,
  _c = jc ? jc.valueOf : void 0;
var $c = function $c(t, r, e, n, o, u, a) {
    switch (e) {
      case "[object DataView]":
        if (t.byteLength != r.byteLength || t.byteOffset != r.byteOffset) return !1;
        t = t.buffer, r = r.buffer;
      case "[object ArrayBuffer]":
        return !(t.byteLength != r.byteLength || !u(new hc(t), new hc(r)));
      case "[object Boolean]":
      case "[object Date]":
      case "[object Number]":
        return dc(+t, +r);
      case "[object Error]":
        return t.name == r.name && t.message == r.message;
      case "[object RegExp]":
      case "[object String]":
        return t == r + "";
      case "[object Map]":
        var i = gc;
      case "[object Set]":
        var c = 1 & n;
        if (i || (i = yc), t.size != r.size && !c) return !1;
        var f = a.get(t);
        if (f) return f == r;
        n |= 2, a.set(t, r);
        var s = bc(i(t), i(r), n, o, u, a);
        return a.delete(t), s;
      case "[object Symbol]":
        if (_c) return _c.call(t) == _c.call(r);
    }
    return !1;
  },
  wc = Eo,
  Ac = Object.prototype.hasOwnProperty;
var mc = Ie,
  xc = pc,
  Oc = $c,
  Ec = function Ec(t, r, e, n, o, u) {
    var a = 1 & e,
      i = wc(t),
      c = i.length;
    if (c != wc(r).length && !a) return !1;
    for (var f = c; f--;) {
      var s = i[f];
      if (!(a ? s in r : Ac.call(r, s))) return !1;
    }
    var l = u.get(t),
      v = u.get(r);
    if (l && v) return l == r && v == t;
    var p = !0;
    u.set(t, r), u.set(r, t);
    for (var h = a; ++f < c;) {
      var d = t[s = i[f]],
        b = r[s];
      if (n) var g = a ? n(b, d, s, r, t, u) : n(d, b, s, t, r, u);
      if (!(void 0 === g ? d === b || o(d, b, e, n, u) : g)) {
        p = !1;
        break;
      }
      h || (h = "constructor" == s);
    }
    if (p && !h) {
      var y = t.constructor,
        j = r.constructor;
      y == j || !("constructor" in t) || !("constructor" in r) || "function" == typeof y && y instanceof y && "function" == typeof j && j instanceof j || (p = !1);
    }
    return u.delete(t), u.delete(r), p;
  },
  zc = Ho,
  Sc = p,
  Uc = Xe.exports,
  Ic = bn,
  Pc = "[object Object]",
  Vc = Object.prototype.hasOwnProperty;
var Tc = function Tc(t, r, e, n, o, u) {
    var a = Sc(t),
      i = Sc(r),
      c = a ? "[object Array]" : zc(t),
      f = i ? "[object Array]" : zc(r),
      s = (c = "[object Arguments]" == c ? Pc : c) == Pc,
      l = (f = "[object Arguments]" == f ? Pc : f) == Pc,
      v = c == f;
    if (v && Uc(t)) {
      if (!Uc(r)) return !1;
      a = !0, s = !1;
    }
    if (v && !s) return u || (u = new mc()), a || Ic(t) ? xc(t, r, e, n, o, u) : Oc(t, r, c, e, n, o, u);
    if (!(1 & e)) {
      var p = s && Vc.call(t, "__wrapped__"),
        h = l && Vc.call(r, "__wrapped__");
      if (p || h) {
        var d = p ? t.value() : t,
          b = h ? r.value() : r;
        return u || (u = new mc()), o(d, b, e, n, u);
      }
    }
    return !!v && (u || (u = new mc()), Ec(t, r, e, n, o, u));
  },
  kc = x;
var Rc = function t(r, e, n, o, u) {
    return r === e || (null == r || null == e || !kc(r) && !kc(e) ? r != r && e != e : Tc(r, e, n, o, t, u));
  },
  Cc = Ie,
  Dc = Rc;
var Nc = jr;
var Lc = function Lc(t) {
    return t == t && !Nc(t);
  },
  Fc = Lc,
  Mc = Dn;
var Bc = function Bc(t, r) {
    return function (e) {
      return null != e && e[t] === r && (void 0 !== r || t in Object(e));
    };
  },
  Zc = function Zc(t, r, e, n) {
    var o = e.length,
      u = o,
      a = !n;
    if (null == t) return !u;
    for (t = Object(t); o--;) {
      var i = e[o];
      if (a && i[2] ? i[1] !== t[i[0]] : !(i[0] in t)) return !1;
    }
    for (; ++o < u;) {
      var c = (i = e[o])[0],
        f = t[c],
        s = i[1];
      if (a && i[2]) {
        if (void 0 === f && !(c in t)) return !1;
      } else {
        var l = new Cc();
        if (n) var v = n(f, s, c, t, r, l);
        if (!(void 0 === v ? Dc(s, f, 3, n, l) : v)) return !1;
      }
    }
    return !0;
  },
  Gc = function Gc(t) {
    for (var r = Mc(t), e = r.length; e--;) {
      var n = r[e],
        o = t[n];
      r[e] = [n, o, Fc(o)];
    }
    return r;
  },
  Wc = Bc;
var qc = ya,
  Hc = Qe,
  Yc = p,
  Jc = en,
  Kc = nn,
  Qc = _a;
var Xc = function Xc(t, r) {
    return null != t && r in Object(t);
  },
  tf = function tf(t, r, e) {
    for (var n = -1, o = (r = qc(r, t)).length, u = !1; ++n < o;) {
      var a = Qc(r[n]);
      if (!(u = null != t && e(t, a))) break;
      t = t[a];
    }
    return u || ++n != o ? u : !!(o = null == t ? 0 : t.length) && Kc(o) && Jc(a, o) && (Yc(t) || Hc(t));
  };
var rf = Rc,
  ef = gi,
  nf = function nf(t, r) {
    return null != t && tf(t, r, Xc);
  },
  of = ia,
  uf = Lc,
  af = Bc,
  cf = _a;
var ff = Aa;
var sf = function sf(t) {
    return function (r) {
      return null == r ? void 0 : r[t];
    };
  },
  lf = function lf(t) {
    return function (r) {
      return ff(r, t);
    };
  },
  vf = ia,
  pf = _a;
var hf = function hf(t) {
    var r = Gc(t);
    return 1 == r.length && r[0][2] ? Wc(r[0][0], r[0][1]) : function (e) {
      return e === t || Zc(e, t, r);
    };
  },
  df = function df(t, r) {
    return of(t) && uf(r) ? af(cf(t), r) : function (e) {
      var n = ef(e, t);
      return void 0 === n && n === r ? nf(e, t) : rf(r, n, 3);
    };
  },
  bf = Qa,
  gf = p,
  yf = function yf(t) {
    return vf(t) ? sf(pf(t)) : lf(t);
  };
var jf = $i,
  _f = Tn;
var $f = z;
var wf = function wf(t, r) {
  if (t !== r) {
    var e = void 0 !== t,
      n = null === t,
      o = t == t,
      u = $f(t),
      a = void 0 !== r,
      i = null === r,
      c = r == r,
      f = $f(r);
    if (!i && !f && !u && t > r || u && a && c && !i && !f || n && a && c || !e && c || !o) return 1;
    if (!n && !u && !f && t < r || f && e && o && !n && !u || i && e && o || !a && o || !c) return -1;
  }
  return 0;
};
var Af = v,
  mf = Aa,
  xf = function xf(t) {
    return "function" == typeof t ? t : null == t ? bf : "object" == _typeof(t) ? gf(t) ? df(t[0], t[1]) : hf(t) : yf(t);
  },
  Of = function Of(t, r) {
    var e = -1,
      n = _f(t) ? Array(t.length) : [];
    return jf(t, function (t, o, u) {
      n[++e] = r(t, o, u);
    }), n;
  },
  Ef = function Ef(t, r) {
    var e = t.length;
    for (t.sort(r); e--;) {
      t[e] = t[e].value;
    }
    return t;
  },
  zf = sn,
  Sf = function Sf(t, r, e) {
    for (var n = -1, o = t.criteria, u = r.criteria, a = o.length, i = e.length; ++n < a;) {
      var c = wf(o[n], u[n]);
      if (c) return n >= i ? c : c * ("desc" == e[n] ? -1 : 1);
    }
    return t.index - r.index;
  },
  Uf = Qa,
  If = p;
var Pf = Xt,
  Vf = Tn,
  Tf = en,
  kf = jr;
var Rf = Wa,
  Cf = function Cf(t, r, e) {
    r = r.length ? Af(r, function (t) {
      return If(t) ? function (r) {
        return mf(r, 1 === t.length ? t[0] : t);
      } : t;
    }) : [Uf];
    var n = -1;
    r = Af(r, zf(xf));
    var o = Of(t, function (t, e, o) {
      return {
        criteria: Af(r, function (r) {
          return r(t);
        }),
        index: ++n,
        value: t
      };
    });
    return Ef(o, function (t, r) {
      return Sf(t, r, e);
    });
  },
  Df = function Df(t, r, e) {
    if (!kf(e)) return !1;
    var n = _typeof(r);
    return !!("number" == n ? Vf(e) && Tf(r, e.length) : "string" == n && r in e) && Pf(e[r], t);
  },
  Nf = Pi(function (t, r) {
    if (null == t) return [];
    var e = r.length;
    return e > 1 && Df(t, r[0], r[1]) ? r = [] : e > 2 && Df(r[0], r[1], r[2]) && (r = [r[0]]), Cf(t, Rf(r, 1), []);
  });
var Lf = [function () {
  return {
    restrict: "A",
    terminal: !0,
    priority: 1001,
    link: function link(n, o, u) {
      var _r$prototype, _r$prototype$$ngVue;
      var a = function (r) {
          var _r$ngVueExpose;
          var e = /^&([a-z$_][a-z0-9$_]*)$/i,
            n = ((_r$ngVueExpose = r.ngVueExpose) !== null && _r$ngVueExpose !== void 0 ? _r$ngVueExpose : "").split(",").map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return e.test(t);
            }).map(function (t) {
              return t.replace(e, "$1");
            }),
            o = /^(?:v-on:|@)[a-z-]+(:[a-z0-9-]+)?(\.[a-z0-9-]+)*/i,
            u = /^([a-z_$][a-z0-9_$]*)(?:\(\))?$/i,
            a = t(r);
          return Ei(a, function (t, r) {
            o.test(r) && u.test(t) && n.push(t.replace(u, "$1"));
          }), n;
        }(u),
        i = function (r) {
          var _r$ngVueExpose2;
          var e = /^(?:v-model|v-html|v-text|v-show|v-class|v-attr|v-style|v-if)(?:\.[a-z0-9]+)*$/i,
            n = /^(?:v-bind)?:[a-z-]+(\.[a-z]+)*$/i,
            o = /^[a-z$_][a-z0-9$_]*(\.[a-z$_][a-z0-9$_]*)*$/i,
            u = ((_r$ngVueExpose2 = r.ngVueExpose) !== null && _r$ngVueExpose2 !== void 0 ? _r$ngVueExpose2 : "").split(",").map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return o.test(t);
            }),
            a = t(r);
          Ei(a, function (t, r) {
            (n.test(r) || e.test(r)) && o.test(t) && u.push(t);
          });
          var i = _toConsumableArray(u);
          return u.forEach(function (t) {
            i = ic(i, Yt.parents(t));
          }), Nf(fc(i));
        }(u),
        c = function (r) {
          var e = /^(?:v-model)$/i,
            n = /^(?:v-bind)?:([a-z-]+)\.sync*$/i,
            o = /^[a-z$_][a-z0-9$_]*(\.[a-z$_][a-z0-9$_]*)*$/i,
            u = {},
            a = t(r);
          return Ei(a, function (t, r) {
            if (e.test(r)) {
              var _r2 = "value";
              if (!o.test(t)) throw Error("Unsupported v-model binding value: ".concat(t));
              u[_r2] = t;
            }
            if (n.test(r)) {
              var _e2 = r.replace(n, "$1").replace(/-[a-z]/g, function (t) {
                return t[1].toUpperCase();
              }).replace(/^[A-Z]/, function (t) {
                return t[1].toLowerCase();
              });
              if (!o.test(t)) throw Error("Unsupported v-bind:".concat(_e2, ".sync binding value: ").concat(t));
              u[_e2] = t;
            }
          }), u;
        }(u);
      i.forEach(function (t) {
        return e(n, t);
      }), a.forEach(function (t) {
        return e(n, t);
      });
      var f = {},
        s = {};
      i.filter(Yt.isRoot).forEach(function (t) {
        f[t] = n.$eval(t);
      });
      var l = {};
      u.ngVue && (l = n.$eval(u.ngVue) || {}), l = di(l, "props", "data", "computed", "methods", "watch"), a.forEach(function (t) {
        s[t] = function () {
          for (var _len2 = arguments.length, r = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            r[_key2] = arguments[_key2];
          }
          console.debug("ng(vue): Calling ng delegate: ".concat(t, "()")), Wt(n, function () {
            return n.$eval(t).apply(n, r);
          });
        };
      });
      var v = function (t) {
        var _r3;
        var r = t,
          e = (_r3 = r) === null || _r3 === void 0 ? void 0 : _r3.$component;
        for (; !e && r;) {
          var _r4;
          r = r.parentElement, e = (_r4 = r) === null || _r4 === void 0 ? void 0 : _r4.$component;
        }
        return e;
      }(o) || ((_r$prototype = r.prototype) === null || _r$prototype === void 0 ? void 0 : (_r$prototype$$ngVue = _r$prototype.$ngVue) === null || _r$prototype$$ngVue === void 0 ? void 0 : _r$prototype$$ngVue.vueApp) || void 0;
      console.log("parent", v);
      var p = new r(_objectSpread(_objectSpread({
        parent: v
      }, l), {}, {
        data: f,
        methods: s
      })).$mount(o[0]);
      p.$el.$component = p, n.$on("$destroy", function () {
        console.debug("ng(vue): destroying vue-comp", p), p.$destroy();
      }), i.forEach(function (t) {
        var e = t;
        n.$watch(t, function (n) {
          console.debug("ng(vue): ng(".concat(t, ") => vue(").concat(e, ") ="), n);
          var o = p,
            u = e;
          Yt.isRoot(u) || (o = gi(p, Yt.parent(u)), u = Yt.leaf(u)), r.set(o, u, n);
        });
      }), Ei(c, function (t, r) {
        p.$children.forEach(function (e) {
          return e.$on("update:".concat(Gt(r)), function (e) {
            console.debug("ng(vue): vue(".concat(r, ") => ng(").concat(t, ") ="), e), Wt(n, function () {
              return gi(n, t, e);
            });
          });
        }), p.$children.forEach(function (e) {
          return e.$on("update:".concat(zi(r)), function (e) {
            console.warn("$emit event using camelCase (update:".concat(Gt(r), "). instead of kebabCase (update:").concat(zi(r), ").")), console.debug("ng(vue): vue(".concat(r, ") => ng(").concat(t, ") ="), e), Wt(n, function () {
              return gi(n, t, e);
            });
          });
        });
      });
    }
  };
  function t(t) {
    var r = {};
    return Ei(t.$attr, function (e, n) {
      var o = t[n];
      r[e] = o;
    }), r;
  }
  function e(t, r) {
    if (void 0 === t.$eval(r)) throw Error("\"".concat(r, "\" is not defined on parent scope"));
  }
}];
export { u as AngularVueAuthPlugin, Lf as AngularVueDirective, Ht as AngularVuePlugin, n as AngularVueRoutePlugin, o as AngularVueRouterPlugin, e as CreateAngularVuePlainPlugin, qt as VueAngularComponent };
//# sourceMappingURL=index.min.mjs.map
