var t2 = Object.defineProperty;
var r2 = (e, t, r) => t in e ? t2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Ie = (e, t, r) => r2(e, typeof t != "symbol" ? t + "" : t, r);
var mp = { exports: {} }, Jl = {}, gp = { exports: {} }, Se = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ko = Symbol.for("react.element"), n2 = Symbol.for("react.portal"), i2 = Symbol.for("react.fragment"), o2 = Symbol.for("react.strict_mode"), l2 = Symbol.for("react.profiler"), a2 = Symbol.for("react.provider"), s2 = Symbol.for("react.context"), u2 = Symbol.for("react.forward_ref"), c2 = Symbol.for("react.suspense"), f2 = Symbol.for("react.memo"), d2 = Symbol.for("react.lazy"), uf = Symbol.iterator;
function p2(e) {
  return e === null || typeof e != "object" ? null : (e = uf && e[uf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var yp = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, _p = Object.assign, wp = {};
function mi(e, t, r) {
  this.props = e, this.context = t, this.refs = wp, this.updater = r || yp;
}
mi.prototype.isReactComponent = {};
mi.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
mi.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function xp() {
}
xp.prototype = mi.prototype;
function wu(e, t, r) {
  this.props = e, this.context = t, this.refs = wp, this.updater = r || yp;
}
var xu = wu.prototype = new xp();
xu.constructor = wu;
_p(xu, mi.prototype);
xu.isPureReactComponent = !0;
var cf = Array.isArray, kp = Object.prototype.hasOwnProperty, ku = { current: null }, Sp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ep(e, t, r) {
  var o, a = {}, u = null, d = null;
  if (t != null) for (o in t.ref !== void 0 && (d = t.ref), t.key !== void 0 && (u = "" + t.key), t) kp.call(t, o) && !Sp.hasOwnProperty(o) && (a[o] = t[o]);
  var h = arguments.length - 2;
  if (h === 1) a.children = r;
  else if (1 < h) {
    for (var g = Array(h), y = 0; y < h; y++) g[y] = arguments[y + 2];
    a.children = g;
  }
  if (e && e.defaultProps) for (o in h = e.defaultProps, h) a[o] === void 0 && (a[o] = h[o]);
  return { $$typeof: ko, type: e, key: u, ref: d, props: a, _owner: ku.current };
}
function v2(e, t) {
  return { $$typeof: ko, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Su(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ko;
}
function h2(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var ff = /\/+/g;
function ja(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? h2("" + e.key) : t.toString(36);
}
function hl(e, t, r, o, a) {
  var u = typeof e;
  (u === "undefined" || u === "boolean") && (e = null);
  var d = !1;
  if (e === null) d = !0;
  else switch (u) {
    case "string":
    case "number":
      d = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case ko:
        case n2:
          d = !0;
      }
  }
  if (d) return d = e, a = a(d), e = o === "" ? "." + ja(d, 0) : o, cf(a) ? (r = "", e != null && (r = e.replace(ff, "$&/") + "/"), hl(a, t, r, "", function(y) {
    return y;
  })) : a != null && (Su(a) && (a = v2(a, r + (!a.key || d && d.key === a.key ? "" : ("" + a.key).replace(ff, "$&/") + "/") + e)), t.push(a)), 1;
  if (d = 0, o = o === "" ? "." : o + ":", cf(e)) for (var h = 0; h < e.length; h++) {
    u = e[h];
    var g = o + ja(u, h);
    d += hl(u, t, r, g, a);
  }
  else if (g = p2(e), typeof g == "function") for (e = g.call(e), h = 0; !(u = e.next()).done; ) u = u.value, g = o + ja(u, h++), d += hl(u, t, r, g, a);
  else if (u === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return d;
}
function Xo(e, t, r) {
  if (e == null) return e;
  var o = [], a = 0;
  return hl(e, o, "", "", function(u) {
    return t.call(r, u, a++);
  }), o;
}
function m2(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
    }, function(r) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var St = { current: null }, ml = { transition: null }, g2 = { ReactCurrentDispatcher: St, ReactCurrentBatchConfig: ml, ReactCurrentOwner: ku };
function Cp() {
  throw Error("act(...) is not supported in production builds of React.");
}
Se.Children = { map: Xo, forEach: function(e, t, r) {
  Xo(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return Xo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Xo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Su(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Se.Component = mi;
Se.Fragment = i2;
Se.Profiler = l2;
Se.PureComponent = wu;
Se.StrictMode = o2;
Se.Suspense = c2;
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = g2;
Se.act = Cp;
Se.cloneElement = function(e, t, r) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var o = _p({}, e.props), a = e.key, u = e.ref, d = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (u = t.ref, d = ku.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var h = e.type.defaultProps;
    for (g in t) kp.call(t, g) && !Sp.hasOwnProperty(g) && (o[g] = t[g] === void 0 && h !== void 0 ? h[g] : t[g]);
  }
  var g = arguments.length - 2;
  if (g === 1) o.children = r;
  else if (1 < g) {
    h = Array(g);
    for (var y = 0; y < g; y++) h[y] = arguments[y + 2];
    o.children = h;
  }
  return { $$typeof: ko, type: e.type, key: a, ref: u, props: o, _owner: d };
};
Se.createContext = function(e) {
  return e = { $$typeof: s2, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: a2, _context: e }, e.Consumer = e;
};
Se.createElement = Ep;
Se.createFactory = function(e) {
  var t = Ep.bind(null, e);
  return t.type = e, t;
};
Se.createRef = function() {
  return { current: null };
};
Se.forwardRef = function(e) {
  return { $$typeof: u2, render: e };
};
Se.isValidElement = Su;
Se.lazy = function(e) {
  return { $$typeof: d2, _payload: { _status: -1, _result: e }, _init: m2 };
};
Se.memo = function(e, t) {
  return { $$typeof: f2, type: e, compare: t === void 0 ? null : t };
};
Se.startTransition = function(e) {
  var t = ml.transition;
  ml.transition = {};
  try {
    e();
  } finally {
    ml.transition = t;
  }
};
Se.unstable_act = Cp;
Se.useCallback = function(e, t) {
  return St.current.useCallback(e, t);
};
Se.useContext = function(e) {
  return St.current.useContext(e);
};
Se.useDebugValue = function() {
};
Se.useDeferredValue = function(e) {
  return St.current.useDeferredValue(e);
};
Se.useEffect = function(e, t) {
  return St.current.useEffect(e, t);
};
Se.useId = function() {
  return St.current.useId();
};
Se.useImperativeHandle = function(e, t, r) {
  return St.current.useImperativeHandle(e, t, r);
};
Se.useInsertionEffect = function(e, t) {
  return St.current.useInsertionEffect(e, t);
};
Se.useLayoutEffect = function(e, t) {
  return St.current.useLayoutEffect(e, t);
};
Se.useMemo = function(e, t) {
  return St.current.useMemo(e, t);
};
Se.useReducer = function(e, t, r) {
  return St.current.useReducer(e, t, r);
};
Se.useRef = function(e) {
  return St.current.useRef(e);
};
Se.useState = function(e) {
  return St.current.useState(e);
};
Se.useSyncExternalStore = function(e, t, r) {
  return St.current.useSyncExternalStore(e, t, r);
};
Se.useTransition = function() {
  return St.current.useTransition();
};
Se.version = "18.3.1";
gp.exports = Se;
var M = gp.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y2 = M, _2 = Symbol.for("react.element"), w2 = Symbol.for("react.fragment"), x2 = Object.prototype.hasOwnProperty, k2 = y2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S2 = { key: !0, ref: !0, __self: !0, __source: !0 };
function bp(e, t, r) {
  var o, a = {}, u = null, d = null;
  r !== void 0 && (u = "" + r), t.key !== void 0 && (u = "" + t.key), t.ref !== void 0 && (d = t.ref);
  for (o in t) x2.call(t, o) && !S2.hasOwnProperty(o) && (a[o] = t[o]);
  if (e && e.defaultProps) for (o in t = e.defaultProps, t) a[o] === void 0 && (a[o] = t[o]);
  return { $$typeof: _2, type: e, key: u, ref: d, props: a, _owner: k2.current };
}
Jl.Fragment = w2;
Jl.jsx = bp;
Jl.jsxs = bp;
mp.exports = Jl;
var D = mp.exports, Pp = { exports: {} }, Bt = {}, Tp = { exports: {} }, Lp = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(ie, fe) {
    var me = ie.length;
    ie.push(fe);
    e: for (; 0 < me; ) {
      var $e = me - 1 >>> 1, ye = ie[$e];
      if (0 < a(ye, fe)) ie[$e] = fe, ie[me] = ye, me = $e;
      else break e;
    }
  }
  function r(ie) {
    return ie.length === 0 ? null : ie[0];
  }
  function o(ie) {
    if (ie.length === 0) return null;
    var fe = ie[0], me = ie.pop();
    if (me !== fe) {
      ie[0] = me;
      e: for (var $e = 0, ye = ie.length, $t = ye >>> 1; $e < $t; ) {
        var dt = 2 * ($e + 1) - 1, cr = ie[dt], gt = dt + 1, er = ie[gt];
        if (0 > a(cr, me)) gt < ye && 0 > a(er, cr) ? (ie[$e] = er, ie[gt] = me, $e = gt) : (ie[$e] = cr, ie[dt] = me, $e = dt);
        else if (gt < ye && 0 > a(er, me)) ie[$e] = er, ie[gt] = me, $e = gt;
        else break e;
      }
    }
    return fe;
  }
  function a(ie, fe) {
    var me = ie.sortIndex - fe.sortIndex;
    return me !== 0 ? me : ie.id - fe.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var u = performance;
    e.unstable_now = function() {
      return u.now();
    };
  } else {
    var d = Date, h = d.now();
    e.unstable_now = function() {
      return d.now() - h;
    };
  }
  var g = [], y = [], x = 1, L = null, C = 3, P = !1, $ = !1, B = !1, Y = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, w = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function S(ie) {
    for (var fe = r(y); fe !== null; ) {
      if (fe.callback === null) o(y);
      else if (fe.startTime <= ie) o(y), fe.sortIndex = fe.expirationTime, t(g, fe);
      else break;
      fe = r(y);
    }
  }
  function E(ie) {
    if (B = !1, S(ie), !$) if (r(g) !== null) $ = !0, Vt(A);
    else {
      var fe = r(y);
      fe !== null && Ye(E, fe.startTime - ie);
    }
  }
  function A(ie, fe) {
    $ = !1, B && (B = !1, k(W), W = -1), P = !0;
    var me = C;
    try {
      for (S(fe), L = r(g); L !== null && (!(L.expirationTime > fe) || ie && !T()); ) {
        var $e = L.callback;
        if (typeof $e == "function") {
          L.callback = null, C = L.priorityLevel;
          var ye = $e(L.expirationTime <= fe);
          fe = e.unstable_now(), typeof ye == "function" ? L.callback = ye : L === r(g) && o(g), S(fe);
        } else o(g);
        L = r(g);
      }
      if (L !== null) var $t = !0;
      else {
        var dt = r(y);
        dt !== null && Ye(E, dt.startTime - fe), $t = !1;
      }
      return $t;
    } finally {
      L = null, C = me, P = !1;
    }
  }
  var N = !1, F = null, W = -1, K = 5, Z = -1;
  function T() {
    return !(e.unstable_now() - Z < K);
  }
  function re() {
    if (F !== null) {
      var ie = e.unstable_now();
      Z = ie;
      var fe = !0;
      try {
        fe = F(!0, ie);
      } finally {
        fe ? pe() : (N = !1, F = null);
      }
    } else N = !1;
  }
  var pe;
  if (typeof w == "function") pe = function() {
    w(re);
  };
  else if (typeof MessageChannel < "u") {
    var Ct = new MessageChannel(), Ee = Ct.port2;
    Ct.port1.onmessage = re, pe = function() {
      Ee.postMessage(null);
    };
  } else pe = function() {
    Y(re, 0);
  };
  function Vt(ie) {
    F = ie, N || (N = !0, pe());
  }
  function Ye(ie, fe) {
    W = Y(function() {
      ie(e.unstable_now());
    }, fe);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(ie) {
    ie.callback = null;
  }, e.unstable_continueExecution = function() {
    $ || P || ($ = !0, Vt(A));
  }, e.unstable_forceFrameRate = function(ie) {
    0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : K = 0 < ie ? Math.floor(1e3 / ie) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return C;
  }, e.unstable_getFirstCallbackNode = function() {
    return r(g);
  }, e.unstable_next = function(ie) {
    switch (C) {
      case 1:
      case 2:
      case 3:
        var fe = 3;
        break;
      default:
        fe = C;
    }
    var me = C;
    C = fe;
    try {
      return ie();
    } finally {
      C = me;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(ie, fe) {
    switch (ie) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        ie = 3;
    }
    var me = C;
    C = ie;
    try {
      return fe();
    } finally {
      C = me;
    }
  }, e.unstable_scheduleCallback = function(ie, fe, me) {
    var $e = e.unstable_now();
    switch (typeof me == "object" && me !== null ? (me = me.delay, me = typeof me == "number" && 0 < me ? $e + me : $e) : me = $e, ie) {
      case 1:
        var ye = -1;
        break;
      case 2:
        ye = 250;
        break;
      case 5:
        ye = 1073741823;
        break;
      case 4:
        ye = 1e4;
        break;
      default:
        ye = 5e3;
    }
    return ye = me + ye, ie = { id: x++, callback: fe, priorityLevel: ie, startTime: me, expirationTime: ye, sortIndex: -1 }, me > $e ? (ie.sortIndex = me, t(y, ie), r(g) === null && ie === r(y) && (B ? (k(W), W = -1) : B = !0, Ye(E, me - $e))) : (ie.sortIndex = ye, t(g, ie), $ || P || ($ = !0, Vt(A))), ie;
  }, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(ie) {
    var fe = C;
    return function() {
      var me = C;
      C = fe;
      try {
        return ie.apply(this, arguments);
      } finally {
        C = me;
      }
    };
  };
})(Lp);
Tp.exports = Lp;
var E2 = Tp.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var C2 = M, zt = E2;
function ee(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Dp = /* @__PURE__ */ new Set(), ro = {};
function Ln(e, t) {
  ui(e, t), ui(e + "Capture", t);
}
function ui(e, t) {
  for (ro[e] = t, e = 0; e < t.length; e++) Dp.add(t[e]);
}
var Fr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ss = Object.prototype.hasOwnProperty, b2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, df = {}, pf = {};
function P2(e) {
  return Ss.call(pf, e) ? !0 : Ss.call(df, e) ? !1 : b2.test(e) ? pf[e] = !0 : (df[e] = !0, !1);
}
function T2(e, t, r, o) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return o ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function L2(e, t, r, o) {
  if (t === null || typeof t > "u" || T2(e, t, r, o)) return !0;
  if (o) return !1;
  if (r !== null) switch (r.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Et(e, t, r, o, a, u, d) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = a, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = d;
}
var ft = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ft[e] = new Et(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ft[t] = new Et(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ft[e] = new Et(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ft[e] = new Et(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ft[e] = new Et(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ft[e] = new Et(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ft[e] = new Et(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ft[e] = new Et(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ft[e] = new Et(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Eu = /[\-:]([a-z])/g;
function Cu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Eu,
    Cu
  );
  ft[t] = new Et(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Eu, Cu);
  ft[t] = new Et(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Eu, Cu);
  ft[t] = new Et(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ft[e] = new Et(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ft.xlinkHref = new Et("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ft[e] = new Et(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function bu(e, t, r, o) {
  var a = ft.hasOwnProperty(t) ? ft[t] : null;
  (a !== null ? a.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (L2(t, r, a, o) && (r = null), o || a === null ? P2(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : a.mustUseProperty ? e[a.propertyName] = r === null ? a.type === 3 ? !1 : "" : r : (t = a.attributeName, o = a.attributeNamespace, r === null ? e.removeAttribute(t) : (a = a.type, r = a === 3 || a === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
}
var Mr = C2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Yo = Symbol.for("react.element"), Wn = Symbol.for("react.portal"), Hn = Symbol.for("react.fragment"), Pu = Symbol.for("react.strict_mode"), Es = Symbol.for("react.profiler"), Rp = Symbol.for("react.provider"), Fp = Symbol.for("react.context"), Tu = Symbol.for("react.forward_ref"), Cs = Symbol.for("react.suspense"), bs = Symbol.for("react.suspense_list"), Lu = Symbol.for("react.memo"), Ur = Symbol.for("react.lazy"), $p = Symbol.for("react.offscreen"), vf = Symbol.iterator;
function $i(e) {
  return e === null || typeof e != "object" ? null : (e = vf && e[vf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Xe = Object.assign, Na;
function Bi(e) {
  if (Na === void 0) try {
    throw Error();
  } catch (r) {
    var t = r.stack.trim().match(/\n( *(at )?)/);
    Na = t && t[1] || "";
  }
  return `
` + Na + e;
}
var za = !1;
function Ba(e, t) {
  if (!e || za) return "";
  za = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (y) {
        var o = y;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (y) {
        o = y;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (y) {
        o = y;
      }
      e();
    }
  } catch (y) {
    if (y && o && typeof y.stack == "string") {
      for (var a = y.stack.split(`
`), u = o.stack.split(`
`), d = a.length - 1, h = u.length - 1; 1 <= d && 0 <= h && a[d] !== u[h]; ) h--;
      for (; 1 <= d && 0 <= h; d--, h--) if (a[d] !== u[h]) {
        if (d !== 1 || h !== 1)
          do
            if (d--, h--, 0 > h || a[d] !== u[h]) {
              var g = `
` + a[d].replace(" at new ", " at ");
              return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), g;
            }
          while (1 <= d && 0 <= h);
        break;
      }
    }
  } finally {
    za = !1, Error.prepareStackTrace = r;
  }
  return (e = e ? e.displayName || e.name : "") ? Bi(e) : "";
}
function D2(e) {
  switch (e.tag) {
    case 5:
      return Bi(e.type);
    case 16:
      return Bi("Lazy");
    case 13:
      return Bi("Suspense");
    case 19:
      return Bi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ba(e.type, !1), e;
    case 11:
      return e = Ba(e.type.render, !1), e;
    case 1:
      return e = Ba(e.type, !0), e;
    default:
      return "";
  }
}
function Ps(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Hn:
      return "Fragment";
    case Wn:
      return "Portal";
    case Es:
      return "Profiler";
    case Pu:
      return "StrictMode";
    case Cs:
      return "Suspense";
    case bs:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Fp:
      return (e.displayName || "Context") + ".Consumer";
    case Rp:
      return (e._context.displayName || "Context") + ".Provider";
    case Tu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Lu:
      return t = e.displayName || null, t !== null ? t : Ps(e.type) || "Memo";
    case Ur:
      t = e._payload, e = e._init;
      try {
        return Ps(e(t));
      } catch {
      }
  }
  return null;
}
function R2(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Ps(t);
    case 8:
      return t === Pu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function rn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ap(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function F2(e) {
  var t = Ap(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
    var a = r.get, u = r.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return a.call(this);
    }, set: function(d) {
      o = "" + d, u.call(this, d);
    } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
      return o;
    }, setValue: function(d) {
      o = "" + d;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Ko(e) {
  e._valueTracker || (e._valueTracker = F2(e));
}
function Op(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(), o = "";
  return e && (o = Ap(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
}
function Tl(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ts(e, t) {
  var r = t.checked;
  return Xe({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
}
function hf(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
  r = rn(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Mp(e, t) {
  t = t.checked, t != null && bu(e, "checked", t, !1);
}
function Ls(e, t) {
  Mp(e, t);
  var r = rn(t.value), o = t.type;
  if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
  else if (o === "submit" || o === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ds(e, t.type, r) : t.hasOwnProperty("defaultValue") && Ds(e, t.type, rn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function mf(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var o = t.type;
    if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
  }
  r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
}
function Ds(e, t, r) {
  (t !== "number" || Tl(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var Ui = Array.isArray;
function ri(e, t, r, o) {
  if (e = e.options, t) {
    t = {};
    for (var a = 0; a < r.length; a++) t["$" + r[a]] = !0;
    for (r = 0; r < e.length; r++) a = t.hasOwnProperty("$" + e[r].value), e[r].selected !== a && (e[r].selected = a), a && o && (e[r].defaultSelected = !0);
  } else {
    for (r = "" + rn(r), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === r) {
        e[a].selected = !0, o && (e[a].defaultSelected = !0);
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function Rs(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ee(91));
  return Xe({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function gf(e, t) {
  var r = t.value;
  if (r == null) {
    if (r = t.children, t = t.defaultValue, r != null) {
      if (t != null) throw Error(ee(92));
      if (Ui(r)) {
        if (1 < r.length) throw Error(ee(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ""), r = t;
  }
  e._wrapperState = { initialValue: rn(r) };
}
function Ip(e, t) {
  var r = rn(t.value), o = rn(t.defaultValue);
  r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
}
function yf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function jp(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Fs(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? jp(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Qo, Np = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, r, o, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Qo = Qo || document.createElement("div"), Qo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Qo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function no(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Hi = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, $2 = ["Webkit", "ms", "Moz", "O"];
Object.keys(Hi).forEach(function(e) {
  $2.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Hi[t] = Hi[e];
  });
});
function zp(e, t, r) {
  return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || Hi.hasOwnProperty(e) && Hi[e] ? ("" + t).trim() : t + "px";
}
function Bp(e, t) {
  e = e.style;
  for (var r in t) if (t.hasOwnProperty(r)) {
    var o = r.indexOf("--") === 0, a = zp(r, t[r], o);
    r === "float" && (r = "cssFloat"), o ? e.setProperty(r, a) : e[r] = a;
  }
}
var A2 = Xe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function $s(e, t) {
  if (t) {
    if (A2[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ee(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ee(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ee(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ee(62));
  }
}
function As(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Os = null;
function Du(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ms = null, ni = null, ii = null;
function _f(e) {
  if (e = Co(e)) {
    if (typeof Ms != "function") throw Error(ee(280));
    var t = e.stateNode;
    t && (t = ia(t), Ms(e.stateNode, e.type, t));
  }
}
function Up(e) {
  ni ? ii ? ii.push(e) : ii = [e] : ni = e;
}
function Vp() {
  if (ni) {
    var e = ni, t = ii;
    if (ii = ni = null, _f(e), t) for (e = 0; e < t.length; e++) _f(t[e]);
  }
}
function Wp(e, t) {
  return e(t);
}
function Hp() {
}
var Ua = !1;
function Gp(e, t, r) {
  if (Ua) return e(t, r);
  Ua = !0;
  try {
    return Wp(e, t, r);
  } finally {
    Ua = !1, (ni !== null || ii !== null) && (Hp(), Vp());
  }
}
function io(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var o = ia(r);
  if (o === null) return null;
  r = o[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(ee(231, t, typeof r));
  return r;
}
var Is = !1;
if (Fr) try {
  var Ai = {};
  Object.defineProperty(Ai, "passive", { get: function() {
    Is = !0;
  } }), window.addEventListener("test", Ai, Ai), window.removeEventListener("test", Ai, Ai);
} catch {
  Is = !1;
}
function O2(e, t, r, o, a, u, d, h, g) {
  var y = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, y);
  } catch (x) {
    this.onError(x);
  }
}
var Gi = !1, Ll = null, Dl = !1, js = null, M2 = { onError: function(e) {
  Gi = !0, Ll = e;
} };
function I2(e, t, r, o, a, u, d, h, g) {
  Gi = !1, Ll = null, O2.apply(M2, arguments);
}
function j2(e, t, r, o, a, u, d, h, g) {
  if (I2.apply(this, arguments), Gi) {
    if (Gi) {
      var y = Ll;
      Gi = !1, Ll = null;
    } else throw Error(ee(198));
    Dl || (Dl = !0, js = y);
  }
}
function Dn(e) {
  var t = e, r = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (r = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function Xp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function wf(e) {
  if (Dn(e) !== e) throw Error(ee(188));
}
function N2(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Dn(e), t === null) throw Error(ee(188));
    return t !== e ? null : e;
  }
  for (var r = e, o = t; ; ) {
    var a = r.return;
    if (a === null) break;
    var u = a.alternate;
    if (u === null) {
      if (o = a.return, o !== null) {
        r = o;
        continue;
      }
      break;
    }
    if (a.child === u.child) {
      for (u = a.child; u; ) {
        if (u === r) return wf(a), e;
        if (u === o) return wf(a), t;
        u = u.sibling;
      }
      throw Error(ee(188));
    }
    if (r.return !== o.return) r = a, o = u;
    else {
      for (var d = !1, h = a.child; h; ) {
        if (h === r) {
          d = !0, r = a, o = u;
          break;
        }
        if (h === o) {
          d = !0, o = a, r = u;
          break;
        }
        h = h.sibling;
      }
      if (!d) {
        for (h = u.child; h; ) {
          if (h === r) {
            d = !0, r = u, o = a;
            break;
          }
          if (h === o) {
            d = !0, o = u, r = a;
            break;
          }
          h = h.sibling;
        }
        if (!d) throw Error(ee(189));
      }
    }
    if (r.alternate !== o) throw Error(ee(190));
  }
  if (r.tag !== 3) throw Error(ee(188));
  return r.stateNode.current === r ? e : t;
}
function Yp(e) {
  return e = N2(e), e !== null ? Kp(e) : null;
}
function Kp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Kp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qp = zt.unstable_scheduleCallback, xf = zt.unstable_cancelCallback, z2 = zt.unstable_shouldYield, B2 = zt.unstable_requestPaint, qe = zt.unstable_now, U2 = zt.unstable_getCurrentPriorityLevel, Ru = zt.unstable_ImmediatePriority, Zp = zt.unstable_UserBlockingPriority, Rl = zt.unstable_NormalPriority, V2 = zt.unstable_LowPriority, qp = zt.unstable_IdlePriority, ea = null, _r = null;
function W2(e) {
  if (_r && typeof _r.onCommitFiberRoot == "function") try {
    _r.onCommitFiberRoot(ea, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var ar = Math.clz32 ? Math.clz32 : X2, H2 = Math.log, G2 = Math.LN2;
function X2(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (H2(e) / G2 | 0) | 0;
}
var Zo = 64, qo = 4194304;
function Vi(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Fl(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var o = 0, a = e.suspendedLanes, u = e.pingedLanes, d = r & 268435455;
  if (d !== 0) {
    var h = d & ~a;
    h !== 0 ? o = Vi(h) : (u &= d, u !== 0 && (o = Vi(u)));
  } else d = r & ~a, d !== 0 ? o = Vi(d) : u !== 0 && (o = Vi(u));
  if (o === 0) return 0;
  if (t !== 0 && t !== o && !(t & a) && (a = o & -o, u = t & -t, a >= u || a === 16 && (u & 4194240) !== 0)) return t;
  if (o & 4 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - ar(t), a = 1 << r, o |= e[r], t &= ~a;
  return o;
}
function Y2(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function K2(e, t) {
  for (var r = e.suspendedLanes, o = e.pingedLanes, a = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
    var d = 31 - ar(u), h = 1 << d, g = a[d];
    g === -1 ? (!(h & r) || h & o) && (a[d] = Y2(h, t)) : g <= t && (e.expiredLanes |= h), u &= ~h;
  }
}
function Ns(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Jp() {
  var e = Zo;
  return Zo <<= 1, !(Zo & 4194240) && (Zo = 64), e;
}
function Va(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function So(e, t, r) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ar(t), e[t] = r;
}
function Q2(e, t) {
  var r = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var o = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var a = 31 - ar(r), u = 1 << a;
    t[a] = 0, o[a] = -1, e[a] = -1, r &= ~u;
  }
}
function Fu(e, t) {
  var r = e.entangledLanes |= t;
  for (e = e.entanglements; r; ) {
    var o = 31 - ar(r), a = 1 << o;
    a & t | e[o] & t && (e[o] |= t), r &= ~a;
  }
}
var Fe = 0;
function ev(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var tv, $u, rv, nv, iv, zs = !1, Jo = [], Yr = null, Kr = null, Qr = null, oo = /* @__PURE__ */ new Map(), lo = /* @__PURE__ */ new Map(), Wr = [], Z2 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function kf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Yr = null;
      break;
    case "dragenter":
    case "dragleave":
      Kr = null;
      break;
    case "mouseover":
    case "mouseout":
      Qr = null;
      break;
    case "pointerover":
    case "pointerout":
      oo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      lo.delete(t.pointerId);
  }
}
function Oi(e, t, r, o, a, u) {
  return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: u, targetContainers: [a] }, t !== null && (t = Co(t), t !== null && $u(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function q2(e, t, r, o, a) {
  switch (t) {
    case "focusin":
      return Yr = Oi(Yr, e, t, r, o, a), !0;
    case "dragenter":
      return Kr = Oi(Kr, e, t, r, o, a), !0;
    case "mouseover":
      return Qr = Oi(Qr, e, t, r, o, a), !0;
    case "pointerover":
      var u = a.pointerId;
      return oo.set(u, Oi(oo.get(u) || null, e, t, r, o, a)), !0;
    case "gotpointercapture":
      return u = a.pointerId, lo.set(u, Oi(lo.get(u) || null, e, t, r, o, a)), !0;
  }
  return !1;
}
function ov(e) {
  var t = yn(e.target);
  if (t !== null) {
    var r = Dn(t);
    if (r !== null) {
      if (t = r.tag, t === 13) {
        if (t = Xp(r), t !== null) {
          e.blockedOn = t, iv(e.priority, function() {
            rv(r);
          });
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function gl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = Bs(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var o = new r.constructor(r.type, r);
      Os = o, r.target.dispatchEvent(o), Os = null;
    } else return t = Co(r), t !== null && $u(t), e.blockedOn = r, !1;
    t.shift();
  }
  return !0;
}
function Sf(e, t, r) {
  gl(e) && r.delete(t);
}
function J2() {
  zs = !1, Yr !== null && gl(Yr) && (Yr = null), Kr !== null && gl(Kr) && (Kr = null), Qr !== null && gl(Qr) && (Qr = null), oo.forEach(Sf), lo.forEach(Sf);
}
function Mi(e, t) {
  e.blockedOn === t && (e.blockedOn = null, zs || (zs = !0, zt.unstable_scheduleCallback(zt.unstable_NormalPriority, J2)));
}
function ao(e) {
  function t(a) {
    return Mi(a, e);
  }
  if (0 < Jo.length) {
    Mi(Jo[0], e);
    for (var r = 1; r < Jo.length; r++) {
      var o = Jo[r];
      o.blockedOn === e && (o.blockedOn = null);
    }
  }
  for (Yr !== null && Mi(Yr, e), Kr !== null && Mi(Kr, e), Qr !== null && Mi(Qr, e), oo.forEach(t), lo.forEach(t), r = 0; r < Wr.length; r++) o = Wr[r], o.blockedOn === e && (o.blockedOn = null);
  for (; 0 < Wr.length && (r = Wr[0], r.blockedOn === null); ) ov(r), r.blockedOn === null && Wr.shift();
}
var oi = Mr.ReactCurrentBatchConfig, $l = !0;
function ex(e, t, r, o) {
  var a = Fe, u = oi.transition;
  oi.transition = null;
  try {
    Fe = 1, Au(e, t, r, o);
  } finally {
    Fe = a, oi.transition = u;
  }
}
function tx(e, t, r, o) {
  var a = Fe, u = oi.transition;
  oi.transition = null;
  try {
    Fe = 4, Au(e, t, r, o);
  } finally {
    Fe = a, oi.transition = u;
  }
}
function Au(e, t, r, o) {
  if ($l) {
    var a = Bs(e, t, r, o);
    if (a === null) Ja(e, t, o, Al, r), kf(e, o);
    else if (q2(a, e, t, r, o)) o.stopPropagation();
    else if (kf(e, o), t & 4 && -1 < Z2.indexOf(e)) {
      for (; a !== null; ) {
        var u = Co(a);
        if (u !== null && tv(u), u = Bs(e, t, r, o), u === null && Ja(e, t, o, Al, r), u === a) break;
        a = u;
      }
      a !== null && o.stopPropagation();
    } else Ja(e, t, o, null, r);
  }
}
var Al = null;
function Bs(e, t, r, o) {
  if (Al = null, e = Du(o), e = yn(e), e !== null) if (t = Dn(e), t === null) e = null;
  else if (r = t.tag, r === 13) {
    if (e = Xp(t), e !== null) return e;
    e = null;
  } else if (r === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Al = e, null;
}
function lv(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (U2()) {
        case Ru:
          return 1;
        case Zp:
          return 4;
        case Rl:
        case V2:
          return 16;
        case qp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Gr = null, Ou = null, yl = null;
function av() {
  if (yl) return yl;
  var e, t = Ou, r = t.length, o, a = "value" in Gr ? Gr.value : Gr.textContent, u = a.length;
  for (e = 0; e < r && t[e] === a[e]; e++) ;
  var d = r - e;
  for (o = 1; o <= d && t[r - o] === a[u - o]; o++) ;
  return yl = a.slice(e, 1 < o ? 1 - o : void 0);
}
function _l(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function el() {
  return !0;
}
function Ef() {
  return !1;
}
function Ut(e) {
  function t(r, o, a, u, d) {
    this._reactName = r, this._targetInst = a, this.type = o, this.nativeEvent = u, this.target = d, this.currentTarget = null;
    for (var h in e) e.hasOwnProperty(h) && (r = e[h], this[h] = r ? r(u) : u[h]);
    return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? el : Ef, this.isPropagationStopped = Ef, this;
  }
  return Xe(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var r = this.nativeEvent;
    r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = el);
  }, stopPropagation: function() {
    var r = this.nativeEvent;
    r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = el);
  }, persist: function() {
  }, isPersistent: el }), t;
}
var gi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Mu = Ut(gi), Eo = Xe({}, gi, { view: 0, detail: 0 }), rx = Ut(Eo), Wa, Ha, Ii, ta = Xe({}, Eo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Iu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Ii && (Ii && e.type === "mousemove" ? (Wa = e.screenX - Ii.screenX, Ha = e.screenY - Ii.screenY) : Ha = Wa = 0, Ii = e), Wa);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ha;
} }), Cf = Ut(ta), nx = Xe({}, ta, { dataTransfer: 0 }), ix = Ut(nx), ox = Xe({}, Eo, { relatedTarget: 0 }), Ga = Ut(ox), lx = Xe({}, gi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ax = Ut(lx), sx = Xe({}, gi, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), ux = Ut(sx), cx = Xe({}, gi, { data: 0 }), bf = Ut(cx), fx = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, dx = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, px = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function vx(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = px[e]) ? !!t[e] : !1;
}
function Iu() {
  return vx;
}
var hx = Xe({}, Eo, { key: function(e) {
  if (e.key) {
    var t = fx[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dx[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Iu, charCode: function(e) {
  return e.type === "keypress" ? _l(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), mx = Ut(hx), gx = Xe({}, ta, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Pf = Ut(gx), yx = Xe({}, Eo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Iu }), _x = Ut(yx), wx = Xe({}, gi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), xx = Ut(wx), kx = Xe({}, ta, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Sx = Ut(kx), Ex = [9, 13, 27, 32], ju = Fr && "CompositionEvent" in window, Xi = null;
Fr && "documentMode" in document && (Xi = document.documentMode);
var Cx = Fr && "TextEvent" in window && !Xi, sv = Fr && (!ju || Xi && 8 < Xi && 11 >= Xi), Tf = " ", Lf = !1;
function uv(e, t) {
  switch (e) {
    case "keyup":
      return Ex.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function cv(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Gn = !1;
function bx(e, t) {
  switch (e) {
    case "compositionend":
      return cv(t);
    case "keypress":
      return t.which !== 32 ? null : (Lf = !0, Tf);
    case "textInput":
      return e = t.data, e === Tf && Lf ? null : e;
    default:
      return null;
  }
}
function Px(e, t) {
  if (Gn) return e === "compositionend" || !ju && uv(e, t) ? (e = av(), yl = Ou = Gr = null, Gn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return sv && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Tx = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Df(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Tx[e.type] : t === "textarea";
}
function fv(e, t, r, o) {
  Up(o), t = Ol(t, "onChange"), 0 < t.length && (r = new Mu("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
}
var Yi = null, so = null;
function Lx(e) {
  kv(e, 0);
}
function ra(e) {
  var t = Kn(e);
  if (Op(t)) return e;
}
function Dx(e, t) {
  if (e === "change") return t;
}
var dv = !1;
if (Fr) {
  var Xa;
  if (Fr) {
    var Ya = "oninput" in document;
    if (!Ya) {
      var Rf = document.createElement("div");
      Rf.setAttribute("oninput", "return;"), Ya = typeof Rf.oninput == "function";
    }
    Xa = Ya;
  } else Xa = !1;
  dv = Xa && (!document.documentMode || 9 < document.documentMode);
}
function Ff() {
  Yi && (Yi.detachEvent("onpropertychange", pv), so = Yi = null);
}
function pv(e) {
  if (e.propertyName === "value" && ra(so)) {
    var t = [];
    fv(t, so, e, Du(e)), Gp(Lx, t);
  }
}
function Rx(e, t, r) {
  e === "focusin" ? (Ff(), Yi = t, so = r, Yi.attachEvent("onpropertychange", pv)) : e === "focusout" && Ff();
}
function Fx(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ra(so);
}
function $x(e, t) {
  if (e === "click") return ra(t);
}
function Ax(e, t) {
  if (e === "input" || e === "change") return ra(t);
}
function Ox(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ur = typeof Object.is == "function" ? Object.is : Ox;
function uo(e, t) {
  if (ur(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length) return !1;
  for (o = 0; o < r.length; o++) {
    var a = r[o];
    if (!Ss.call(t, a) || !ur(e[a], t[a])) return !1;
  }
  return !0;
}
function $f(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Af(e, t) {
  var r = $f(e);
  e = 0;
  for (var o; r; ) {
    if (r.nodeType === 3) {
      if (o = e + r.textContent.length, e <= t && o >= t) return { node: r, offset: t - e };
      e = o;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = $f(r);
  }
}
function vv(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vv(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function hv() {
  for (var e = window, t = Tl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = Tl(e.document);
  }
  return t;
}
function Nu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Mx(e) {
  var t = hv(), r = e.focusedElem, o = e.selectionRange;
  if (t !== r && r && r.ownerDocument && vv(r.ownerDocument.documentElement, r)) {
    if (o !== null && Nu(r)) {
      if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
      else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = r.textContent.length, u = Math.min(o.start, a);
        o = o.end === void 0 ? u : Math.min(o.end, a), !e.extend && u > o && (a = o, o = u, u = a), a = Af(r, u);
        var d = Af(
          r,
          o
        );
        a && d && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== d.node || e.focusOffset !== d.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), u > o ? (e.addRange(t), e.extend(d.node, d.offset)) : (t.setEnd(d.node, d.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Ix = Fr && "documentMode" in document && 11 >= document.documentMode, Xn = null, Us = null, Ki = null, Vs = !1;
function Of(e, t, r) {
  var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  Vs || Xn == null || Xn !== Tl(o) || (o = Xn, "selectionStart" in o && Nu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Ki && uo(Ki, o) || (Ki = o, o = Ol(Us, "onSelect"), 0 < o.length && (t = new Mu("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = Xn)));
}
function tl(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
}
var Yn = { animationend: tl("Animation", "AnimationEnd"), animationiteration: tl("Animation", "AnimationIteration"), animationstart: tl("Animation", "AnimationStart"), transitionend: tl("Transition", "TransitionEnd") }, Ka = {}, mv = {};
Fr && (mv = document.createElement("div").style, "AnimationEvent" in window || (delete Yn.animationend.animation, delete Yn.animationiteration.animation, delete Yn.animationstart.animation), "TransitionEvent" in window || delete Yn.transitionend.transition);
function na(e) {
  if (Ka[e]) return Ka[e];
  if (!Yn[e]) return e;
  var t = Yn[e], r;
  for (r in t) if (t.hasOwnProperty(r) && r in mv) return Ka[e] = t[r];
  return e;
}
var gv = na("animationend"), yv = na("animationiteration"), _v = na("animationstart"), wv = na("transitionend"), xv = /* @__PURE__ */ new Map(), Mf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function on(e, t) {
  xv.set(e, t), Ln(t, [e]);
}
for (var Qa = 0; Qa < Mf.length; Qa++) {
  var Za = Mf[Qa], jx = Za.toLowerCase(), Nx = Za[0].toUpperCase() + Za.slice(1);
  on(jx, "on" + Nx);
}
on(gv, "onAnimationEnd");
on(yv, "onAnimationIteration");
on(_v, "onAnimationStart");
on("dblclick", "onDoubleClick");
on("focusin", "onFocus");
on("focusout", "onBlur");
on(wv, "onTransitionEnd");
ui("onMouseEnter", ["mouseout", "mouseover"]);
ui("onMouseLeave", ["mouseout", "mouseover"]);
ui("onPointerEnter", ["pointerout", "pointerover"]);
ui("onPointerLeave", ["pointerout", "pointerover"]);
Ln("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ln("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ln("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ln("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ln("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Wi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zx = new Set("cancel close invalid load scroll toggle".split(" ").concat(Wi));
function If(e, t, r) {
  var o = e.type || "unknown-event";
  e.currentTarget = r, j2(o, t, void 0, e), e.currentTarget = null;
}
function kv(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var o = e[r], a = o.event;
    o = o.listeners;
    e: {
      var u = void 0;
      if (t) for (var d = o.length - 1; 0 <= d; d--) {
        var h = o[d], g = h.instance, y = h.currentTarget;
        if (h = h.listener, g !== u && a.isPropagationStopped()) break e;
        If(a, h, y), u = g;
      }
      else for (d = 0; d < o.length; d++) {
        if (h = o[d], g = h.instance, y = h.currentTarget, h = h.listener, g !== u && a.isPropagationStopped()) break e;
        If(a, h, y), u = g;
      }
    }
  }
  if (Dl) throw e = js, Dl = !1, js = null, e;
}
function ze(e, t) {
  var r = t[Ys];
  r === void 0 && (r = t[Ys] = /* @__PURE__ */ new Set());
  var o = e + "__bubble";
  r.has(o) || (Sv(t, e, 2, !1), r.add(o));
}
function qa(e, t, r) {
  var o = 0;
  t && (o |= 4), Sv(r, e, o, t);
}
var rl = "_reactListening" + Math.random().toString(36).slice(2);
function co(e) {
  if (!e[rl]) {
    e[rl] = !0, Dp.forEach(function(r) {
      r !== "selectionchange" && (zx.has(r) || qa(r, !1, e), qa(r, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[rl] || (t[rl] = !0, qa("selectionchange", !1, t));
  }
}
function Sv(e, t, r, o) {
  switch (lv(t)) {
    case 1:
      var a = ex;
      break;
    case 4:
      a = tx;
      break;
    default:
      a = Au;
  }
  r = a.bind(null, t, r, e), a = void 0, !Is || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), o ? a !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: a }) : e.addEventListener(t, r, !0) : a !== void 0 ? e.addEventListener(t, r, { passive: a }) : e.addEventListener(t, r, !1);
}
function Ja(e, t, r, o, a) {
  var u = o;
  if (!(t & 1) && !(t & 2) && o !== null) e: for (; ; ) {
    if (o === null) return;
    var d = o.tag;
    if (d === 3 || d === 4) {
      var h = o.stateNode.containerInfo;
      if (h === a || h.nodeType === 8 && h.parentNode === a) break;
      if (d === 4) for (d = o.return; d !== null; ) {
        var g = d.tag;
        if ((g === 3 || g === 4) && (g = d.stateNode.containerInfo, g === a || g.nodeType === 8 && g.parentNode === a)) return;
        d = d.return;
      }
      for (; h !== null; ) {
        if (d = yn(h), d === null) return;
        if (g = d.tag, g === 5 || g === 6) {
          o = u = d;
          continue e;
        }
        h = h.parentNode;
      }
    }
    o = o.return;
  }
  Gp(function() {
    var y = u, x = Du(r), L = [];
    e: {
      var C = xv.get(e);
      if (C !== void 0) {
        var P = Mu, $ = e;
        switch (e) {
          case "keypress":
            if (_l(r) === 0) break e;
          case "keydown":
          case "keyup":
            P = mx;
            break;
          case "focusin":
            $ = "focus", P = Ga;
            break;
          case "focusout":
            $ = "blur", P = Ga;
            break;
          case "beforeblur":
          case "afterblur":
            P = Ga;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            P = Cf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            P = ix;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            P = _x;
            break;
          case gv:
          case yv:
          case _v:
            P = ax;
            break;
          case wv:
            P = xx;
            break;
          case "scroll":
            P = rx;
            break;
          case "wheel":
            P = Sx;
            break;
          case "copy":
          case "cut":
          case "paste":
            P = ux;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            P = Pf;
        }
        var B = (t & 4) !== 0, Y = !B && e === "scroll", k = B ? C !== null ? C + "Capture" : null : C;
        B = [];
        for (var w = y, S; w !== null; ) {
          S = w;
          var E = S.stateNode;
          if (S.tag === 5 && E !== null && (S = E, k !== null && (E = io(w, k), E != null && B.push(fo(w, E, S)))), Y) break;
          w = w.return;
        }
        0 < B.length && (C = new P(C, $, null, r, x), L.push({ event: C, listeners: B }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (C = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", C && r !== Os && ($ = r.relatedTarget || r.fromElement) && (yn($) || $[$r])) break e;
        if ((P || C) && (C = x.window === x ? x : (C = x.ownerDocument) ? C.defaultView || C.parentWindow : window, P ? ($ = r.relatedTarget || r.toElement, P = y, $ = $ ? yn($) : null, $ !== null && (Y = Dn($), $ !== Y || $.tag !== 5 && $.tag !== 6) && ($ = null)) : (P = null, $ = y), P !== $)) {
          if (B = Cf, E = "onMouseLeave", k = "onMouseEnter", w = "mouse", (e === "pointerout" || e === "pointerover") && (B = Pf, E = "onPointerLeave", k = "onPointerEnter", w = "pointer"), Y = P == null ? C : Kn(P), S = $ == null ? C : Kn($), C = new B(E, w + "leave", P, r, x), C.target = Y, C.relatedTarget = S, E = null, yn(x) === y && (B = new B(k, w + "enter", $, r, x), B.target = S, B.relatedTarget = Y, E = B), Y = E, P && $) t: {
            for (B = P, k = $, w = 0, S = B; S; S = Un(S)) w++;
            for (S = 0, E = k; E; E = Un(E)) S++;
            for (; 0 < w - S; ) B = Un(B), w--;
            for (; 0 < S - w; ) k = Un(k), S--;
            for (; w--; ) {
              if (B === k || k !== null && B === k.alternate) break t;
              B = Un(B), k = Un(k);
            }
            B = null;
          }
          else B = null;
          P !== null && jf(L, C, P, B, !1), $ !== null && Y !== null && jf(L, Y, $, B, !0);
        }
      }
      e: {
        if (C = y ? Kn(y) : window, P = C.nodeName && C.nodeName.toLowerCase(), P === "select" || P === "input" && C.type === "file") var A = Dx;
        else if (Df(C)) if (dv) A = Ax;
        else {
          A = Fx;
          var N = Rx;
        }
        else (P = C.nodeName) && P.toLowerCase() === "input" && (C.type === "checkbox" || C.type === "radio") && (A = $x);
        if (A && (A = A(e, y))) {
          fv(L, A, r, x);
          break e;
        }
        N && N(e, C, y), e === "focusout" && (N = C._wrapperState) && N.controlled && C.type === "number" && Ds(C, "number", C.value);
      }
      switch (N = y ? Kn(y) : window, e) {
        case "focusin":
          (Df(N) || N.contentEditable === "true") && (Xn = N, Us = y, Ki = null);
          break;
        case "focusout":
          Ki = Us = Xn = null;
          break;
        case "mousedown":
          Vs = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Vs = !1, Of(L, r, x);
          break;
        case "selectionchange":
          if (Ix) break;
        case "keydown":
        case "keyup":
          Of(L, r, x);
      }
      var F;
      if (ju) e: {
        switch (e) {
          case "compositionstart":
            var W = "onCompositionStart";
            break e;
          case "compositionend":
            W = "onCompositionEnd";
            break e;
          case "compositionupdate":
            W = "onCompositionUpdate";
            break e;
        }
        W = void 0;
      }
      else Gn ? uv(e, r) && (W = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (W = "onCompositionStart");
      W && (sv && r.locale !== "ko" && (Gn || W !== "onCompositionStart" ? W === "onCompositionEnd" && Gn && (F = av()) : (Gr = x, Ou = "value" in Gr ? Gr.value : Gr.textContent, Gn = !0)), N = Ol(y, W), 0 < N.length && (W = new bf(W, e, null, r, x), L.push({ event: W, listeners: N }), F ? W.data = F : (F = cv(r), F !== null && (W.data = F)))), (F = Cx ? bx(e, r) : Px(e, r)) && (y = Ol(y, "onBeforeInput"), 0 < y.length && (x = new bf("onBeforeInput", "beforeinput", null, r, x), L.push({ event: x, listeners: y }), x.data = F));
    }
    kv(L, t);
  });
}
function fo(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Ol(e, t) {
  for (var r = t + "Capture", o = []; e !== null; ) {
    var a = e, u = a.stateNode;
    a.tag === 5 && u !== null && (a = u, u = io(e, r), u != null && o.unshift(fo(e, u, a)), u = io(e, t), u != null && o.push(fo(e, u, a))), e = e.return;
  }
  return o;
}
function Un(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function jf(e, t, r, o, a) {
  for (var u = t._reactName, d = []; r !== null && r !== o; ) {
    var h = r, g = h.alternate, y = h.stateNode;
    if (g !== null && g === o) break;
    h.tag === 5 && y !== null && (h = y, a ? (g = io(r, u), g != null && d.unshift(fo(r, g, h))) : a || (g = io(r, u), g != null && d.push(fo(r, g, h)))), r = r.return;
  }
  d.length !== 0 && e.push({ event: t, listeners: d });
}
var Bx = /\r\n?/g, Ux = /\u0000|\uFFFD/g;
function Nf(e) {
  return (typeof e == "string" ? e : "" + e).replace(Bx, `
`).replace(Ux, "");
}
function nl(e, t, r) {
  if (t = Nf(t), Nf(e) !== t && r) throw Error(ee(425));
}
function Ml() {
}
var Ws = null, Hs = null;
function Gs(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Xs = typeof setTimeout == "function" ? setTimeout : void 0, Vx = typeof clearTimeout == "function" ? clearTimeout : void 0, zf = typeof Promise == "function" ? Promise : void 0, Wx = typeof queueMicrotask == "function" ? queueMicrotask : typeof zf < "u" ? function(e) {
  return zf.resolve(null).then(e).catch(Hx);
} : Xs;
function Hx(e) {
  setTimeout(function() {
    throw e;
  });
}
function es(e, t) {
  var r = t, o = 0;
  do {
    var a = r.nextSibling;
    if (e.removeChild(r), a && a.nodeType === 8) if (r = a.data, r === "/$") {
      if (o === 0) {
        e.removeChild(a), ao(t);
        return;
      }
      o--;
    } else r !== "$" && r !== "$?" && r !== "$!" || o++;
    r = a;
  } while (r);
  ao(t);
}
function Zr(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Bf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var yi = Math.random().toString(36).slice(2), yr = "__reactFiber$" + yi, po = "__reactProps$" + yi, $r = "__reactContainer$" + yi, Ys = "__reactEvents$" + yi, Gx = "__reactListeners$" + yi, Xx = "__reactHandles$" + yi;
function yn(e) {
  var t = e[yr];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if (t = r[$r] || r[yr]) {
      if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Bf(e); e !== null; ) {
        if (r = e[yr]) return r;
        e = Bf(e);
      }
      return t;
    }
    e = r, r = e.parentNode;
  }
  return null;
}
function Co(e) {
  return e = e[yr] || e[$r], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ee(33));
}
function ia(e) {
  return e[po] || null;
}
var Ks = [], Qn = -1;
function ln(e) {
  return { current: e };
}
function Be(e) {
  0 > Qn || (e.current = Ks[Qn], Ks[Qn] = null, Qn--);
}
function je(e, t) {
  Qn++, Ks[Qn] = e.current, e.current = t;
}
var nn = {}, mt = ln(nn), Dt = ln(!1), Sn = nn;
function ci(e, t) {
  var r = e.type.contextTypes;
  if (!r) return nn;
  var o = e.stateNode;
  if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
  var a = {}, u;
  for (u in r) a[u] = t[u];
  return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
}
function Rt(e) {
  return e = e.childContextTypes, e != null;
}
function Il() {
  Be(Dt), Be(mt);
}
function Uf(e, t, r) {
  if (mt.current !== nn) throw Error(ee(168));
  je(mt, t), je(Dt, r);
}
function Ev(e, t, r) {
  var o = e.stateNode;
  if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
  o = o.getChildContext();
  for (var a in o) if (!(a in t)) throw Error(ee(108, R2(e) || "Unknown", a));
  return Xe({}, r, o);
}
function jl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || nn, Sn = mt.current, je(mt, e), je(Dt, Dt.current), !0;
}
function Vf(e, t, r) {
  var o = e.stateNode;
  if (!o) throw Error(ee(169));
  r ? (e = Ev(e, t, Sn), o.__reactInternalMemoizedMergedChildContext = e, Be(Dt), Be(mt), je(mt, e)) : Be(Dt), je(Dt, r);
}
var Tr = null, oa = !1, ts = !1;
function Cv(e) {
  Tr === null ? Tr = [e] : Tr.push(e);
}
function Yx(e) {
  oa = !0, Cv(e);
}
function an() {
  if (!ts && Tr !== null) {
    ts = !0;
    var e = 0, t = Fe;
    try {
      var r = Tr;
      for (Fe = 1; e < r.length; e++) {
        var o = r[e];
        do
          o = o(!0);
        while (o !== null);
      }
      Tr = null, oa = !1;
    } catch (a) {
      throw Tr !== null && (Tr = Tr.slice(e + 1)), Qp(Ru, an), a;
    } finally {
      Fe = t, ts = !1;
    }
  }
  return null;
}
var Zn = [], qn = 0, Nl = null, zl = 0, Xt = [], Yt = 0, En = null, Lr = 1, Dr = "";
function mn(e, t) {
  Zn[qn++] = zl, Zn[qn++] = Nl, Nl = e, zl = t;
}
function bv(e, t, r) {
  Xt[Yt++] = Lr, Xt[Yt++] = Dr, Xt[Yt++] = En, En = e;
  var o = Lr;
  e = Dr;
  var a = 32 - ar(o) - 1;
  o &= ~(1 << a), r += 1;
  var u = 32 - ar(t) + a;
  if (30 < u) {
    var d = a - a % 5;
    u = (o & (1 << d) - 1).toString(32), o >>= d, a -= d, Lr = 1 << 32 - ar(t) + a | r << a | o, Dr = u + e;
  } else Lr = 1 << u | r << a | o, Dr = e;
}
function zu(e) {
  e.return !== null && (mn(e, 1), bv(e, 1, 0));
}
function Bu(e) {
  for (; e === Nl; ) Nl = Zn[--qn], Zn[qn] = null, zl = Zn[--qn], Zn[qn] = null;
  for (; e === En; ) En = Xt[--Yt], Xt[Yt] = null, Dr = Xt[--Yt], Xt[Yt] = null, Lr = Xt[--Yt], Xt[Yt] = null;
}
var Nt = null, jt = null, Ve = !1, lr = null;
function Pv(e, t) {
  var r = Kt(5, null, null, 0);
  r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
}
function Wf(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Nt = e, jt = Zr(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Nt = e, jt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (r = En !== null ? { id: Lr, overflow: Dr } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = Kt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, Nt = e, jt = null, !0) : !1;
    default:
      return !1;
  }
}
function Qs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zs(e) {
  if (Ve) {
    var t = jt;
    if (t) {
      var r = t;
      if (!Wf(e, t)) {
        if (Qs(e)) throw Error(ee(418));
        t = Zr(r.nextSibling);
        var o = Nt;
        t && Wf(e, t) ? Pv(o, r) : (e.flags = e.flags & -4097 | 2, Ve = !1, Nt = e);
      }
    } else {
      if (Qs(e)) throw Error(ee(418));
      e.flags = e.flags & -4097 | 2, Ve = !1, Nt = e;
    }
  }
}
function Hf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Nt = e;
}
function il(e) {
  if (e !== Nt) return !1;
  if (!Ve) return Hf(e), Ve = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Gs(e.type, e.memoizedProps)), t && (t = jt)) {
    if (Qs(e)) throw Tv(), Error(ee(418));
    for (; t; ) Pv(e, t), t = Zr(t.nextSibling);
  }
  if (Hf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ee(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              jt = Zr(e.nextSibling);
              break e;
            }
            t--;
          } else r !== "$" && r !== "$!" && r !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      jt = null;
    }
  } else jt = Nt ? Zr(e.stateNode.nextSibling) : null;
  return !0;
}
function Tv() {
  for (var e = jt; e; ) e = Zr(e.nextSibling);
}
function fi() {
  jt = Nt = null, Ve = !1;
}
function Uu(e) {
  lr === null ? lr = [e] : lr.push(e);
}
var Kx = Mr.ReactCurrentBatchConfig;
function ji(e, t, r) {
  if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (r._owner) {
      if (r = r._owner, r) {
        if (r.tag !== 1) throw Error(ee(309));
        var o = r.stateNode;
      }
      if (!o) throw Error(ee(147, e));
      var a = o, u = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(d) {
        var h = a.refs;
        d === null ? delete h[u] : h[u] = d;
      }, t._stringRef = u, t);
    }
    if (typeof e != "string") throw Error(ee(284));
    if (!r._owner) throw Error(ee(290, e));
  }
  return e;
}
function ol(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ee(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Gf(e) {
  var t = e._init;
  return t(e._payload);
}
function Lv(e) {
  function t(k, w) {
    if (e) {
      var S = k.deletions;
      S === null ? (k.deletions = [w], k.flags |= 16) : S.push(w);
    }
  }
  function r(k, w) {
    if (!e) return null;
    for (; w !== null; ) t(k, w), w = w.sibling;
    return null;
  }
  function o(k, w) {
    for (k = /* @__PURE__ */ new Map(); w !== null; ) w.key !== null ? k.set(w.key, w) : k.set(w.index, w), w = w.sibling;
    return k;
  }
  function a(k, w) {
    return k = tn(k, w), k.index = 0, k.sibling = null, k;
  }
  function u(k, w, S) {
    return k.index = S, e ? (S = k.alternate, S !== null ? (S = S.index, S < w ? (k.flags |= 2, w) : S) : (k.flags |= 2, w)) : (k.flags |= 1048576, w);
  }
  function d(k) {
    return e && k.alternate === null && (k.flags |= 2), k;
  }
  function h(k, w, S, E) {
    return w === null || w.tag !== 6 ? (w = ss(S, k.mode, E), w.return = k, w) : (w = a(w, S), w.return = k, w);
  }
  function g(k, w, S, E) {
    var A = S.type;
    return A === Hn ? x(k, w, S.props.children, E, S.key) : w !== null && (w.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ur && Gf(A) === w.type) ? (E = a(w, S.props), E.ref = ji(k, w, S), E.return = k, E) : (E = bl(S.type, S.key, S.props, null, k.mode, E), E.ref = ji(k, w, S), E.return = k, E);
  }
  function y(k, w, S, E) {
    return w === null || w.tag !== 4 || w.stateNode.containerInfo !== S.containerInfo || w.stateNode.implementation !== S.implementation ? (w = us(S, k.mode, E), w.return = k, w) : (w = a(w, S.children || []), w.return = k, w);
  }
  function x(k, w, S, E, A) {
    return w === null || w.tag !== 7 ? (w = kn(S, k.mode, E, A), w.return = k, w) : (w = a(w, S), w.return = k, w);
  }
  function L(k, w, S) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return w = ss("" + w, k.mode, S), w.return = k, w;
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Yo:
          return S = bl(w.type, w.key, w.props, null, k.mode, S), S.ref = ji(k, null, w), S.return = k, S;
        case Wn:
          return w = us(w, k.mode, S), w.return = k, w;
        case Ur:
          var E = w._init;
          return L(k, E(w._payload), S);
      }
      if (Ui(w) || $i(w)) return w = kn(w, k.mode, S, null), w.return = k, w;
      ol(k, w);
    }
    return null;
  }
  function C(k, w, S, E) {
    var A = w !== null ? w.key : null;
    if (typeof S == "string" && S !== "" || typeof S == "number") return A !== null ? null : h(k, w, "" + S, E);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Yo:
          return S.key === A ? g(k, w, S, E) : null;
        case Wn:
          return S.key === A ? y(k, w, S, E) : null;
        case Ur:
          return A = S._init, C(
            k,
            w,
            A(S._payload),
            E
          );
      }
      if (Ui(S) || $i(S)) return A !== null ? null : x(k, w, S, E, null);
      ol(k, S);
    }
    return null;
  }
  function P(k, w, S, E, A) {
    if (typeof E == "string" && E !== "" || typeof E == "number") return k = k.get(S) || null, h(w, k, "" + E, A);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Yo:
          return k = k.get(E.key === null ? S : E.key) || null, g(w, k, E, A);
        case Wn:
          return k = k.get(E.key === null ? S : E.key) || null, y(w, k, E, A);
        case Ur:
          var N = E._init;
          return P(k, w, S, N(E._payload), A);
      }
      if (Ui(E) || $i(E)) return k = k.get(S) || null, x(w, k, E, A, null);
      ol(w, E);
    }
    return null;
  }
  function $(k, w, S, E) {
    for (var A = null, N = null, F = w, W = w = 0, K = null; F !== null && W < S.length; W++) {
      F.index > W ? (K = F, F = null) : K = F.sibling;
      var Z = C(k, F, S[W], E);
      if (Z === null) {
        F === null && (F = K);
        break;
      }
      e && F && Z.alternate === null && t(k, F), w = u(Z, w, W), N === null ? A = Z : N.sibling = Z, N = Z, F = K;
    }
    if (W === S.length) return r(k, F), Ve && mn(k, W), A;
    if (F === null) {
      for (; W < S.length; W++) F = L(k, S[W], E), F !== null && (w = u(F, w, W), N === null ? A = F : N.sibling = F, N = F);
      return Ve && mn(k, W), A;
    }
    for (F = o(k, F); W < S.length; W++) K = P(F, k, W, S[W], E), K !== null && (e && K.alternate !== null && F.delete(K.key === null ? W : K.key), w = u(K, w, W), N === null ? A = K : N.sibling = K, N = K);
    return e && F.forEach(function(T) {
      return t(k, T);
    }), Ve && mn(k, W), A;
  }
  function B(k, w, S, E) {
    var A = $i(S);
    if (typeof A != "function") throw Error(ee(150));
    if (S = A.call(S), S == null) throw Error(ee(151));
    for (var N = A = null, F = w, W = w = 0, K = null, Z = S.next(); F !== null && !Z.done; W++, Z = S.next()) {
      F.index > W ? (K = F, F = null) : K = F.sibling;
      var T = C(k, F, Z.value, E);
      if (T === null) {
        F === null && (F = K);
        break;
      }
      e && F && T.alternate === null && t(k, F), w = u(T, w, W), N === null ? A = T : N.sibling = T, N = T, F = K;
    }
    if (Z.done) return r(
      k,
      F
    ), Ve && mn(k, W), A;
    if (F === null) {
      for (; !Z.done; W++, Z = S.next()) Z = L(k, Z.value, E), Z !== null && (w = u(Z, w, W), N === null ? A = Z : N.sibling = Z, N = Z);
      return Ve && mn(k, W), A;
    }
    for (F = o(k, F); !Z.done; W++, Z = S.next()) Z = P(F, k, W, Z.value, E), Z !== null && (e && Z.alternate !== null && F.delete(Z.key === null ? W : Z.key), w = u(Z, w, W), N === null ? A = Z : N.sibling = Z, N = Z);
    return e && F.forEach(function(re) {
      return t(k, re);
    }), Ve && mn(k, W), A;
  }
  function Y(k, w, S, E) {
    if (typeof S == "object" && S !== null && S.type === Hn && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Yo:
          e: {
            for (var A = S.key, N = w; N !== null; ) {
              if (N.key === A) {
                if (A = S.type, A === Hn) {
                  if (N.tag === 7) {
                    r(k, N.sibling), w = a(N, S.props.children), w.return = k, k = w;
                    break e;
                  }
                } else if (N.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ur && Gf(A) === N.type) {
                  r(k, N.sibling), w = a(N, S.props), w.ref = ji(k, N, S), w.return = k, k = w;
                  break e;
                }
                r(k, N);
                break;
              } else t(k, N);
              N = N.sibling;
            }
            S.type === Hn ? (w = kn(S.props.children, k.mode, E, S.key), w.return = k, k = w) : (E = bl(S.type, S.key, S.props, null, k.mode, E), E.ref = ji(k, w, S), E.return = k, k = E);
          }
          return d(k);
        case Wn:
          e: {
            for (N = S.key; w !== null; ) {
              if (w.key === N) if (w.tag === 4 && w.stateNode.containerInfo === S.containerInfo && w.stateNode.implementation === S.implementation) {
                r(k, w.sibling), w = a(w, S.children || []), w.return = k, k = w;
                break e;
              } else {
                r(k, w);
                break;
              }
              else t(k, w);
              w = w.sibling;
            }
            w = us(S, k.mode, E), w.return = k, k = w;
          }
          return d(k);
        case Ur:
          return N = S._init, Y(k, w, N(S._payload), E);
      }
      if (Ui(S)) return $(k, w, S, E);
      if ($i(S)) return B(k, w, S, E);
      ol(k, S);
    }
    return typeof S == "string" && S !== "" || typeof S == "number" ? (S = "" + S, w !== null && w.tag === 6 ? (r(k, w.sibling), w = a(w, S), w.return = k, k = w) : (r(k, w), w = ss(S, k.mode, E), w.return = k, k = w), d(k)) : r(k, w);
  }
  return Y;
}
var di = Lv(!0), Dv = Lv(!1), Bl = ln(null), Ul = null, Jn = null, Vu = null;
function Wu() {
  Vu = Jn = Ul = null;
}
function Hu(e) {
  var t = Bl.current;
  Be(Bl), e._currentValue = t;
}
function qs(e, t, r) {
  for (; e !== null; ) {
    var o = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
    e = e.return;
  }
}
function li(e, t) {
  Ul = e, Vu = Jn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Lt = !0), e.firstContext = null);
}
function Zt(e) {
  var t = e._currentValue;
  if (Vu !== e) if (e = { context: e, memoizedValue: t, next: null }, Jn === null) {
    if (Ul === null) throw Error(ee(308));
    Jn = e, Ul.dependencies = { lanes: 0, firstContext: e };
  } else Jn = Jn.next = e;
  return t;
}
var _n = null;
function Gu(e) {
  _n === null ? _n = [e] : _n.push(e);
}
function Rv(e, t, r, o) {
  var a = t.interleaved;
  return a === null ? (r.next = r, Gu(t)) : (r.next = a.next, a.next = r), t.interleaved = r, Ar(e, o);
}
function Ar(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
  return r.tag === 3 ? r.stateNode : null;
}
var Vr = !1;
function Xu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Fv(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Rr(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function qr(e, t, r) {
  var o = e.updateQueue;
  if (o === null) return null;
  if (o = o.shared, Pe & 2) {
    var a = o.pending;
    return a === null ? t.next = t : (t.next = a.next, a.next = t), o.pending = t, Ar(e, r);
  }
  return a = o.interleaved, a === null ? (t.next = t, Gu(o)) : (t.next = a.next, a.next = t), o.interleaved = t, Ar(e, r);
}
function wl(e, t, r) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
    var o = t.lanes;
    o &= e.pendingLanes, r |= o, t.lanes = r, Fu(e, r);
  }
}
function Xf(e, t) {
  var r = e.updateQueue, o = e.alternate;
  if (o !== null && (o = o.updateQueue, r === o)) {
    var a = null, u = null;
    if (r = r.firstBaseUpdate, r !== null) {
      do {
        var d = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
        u === null ? a = u = d : u = u.next = d, r = r.next;
      } while (r !== null);
      u === null ? a = u = t : u = u.next = t;
    } else a = u = t;
    r = { baseState: o.baseState, firstBaseUpdate: a, lastBaseUpdate: u, shared: o.shared, effects: o.effects }, e.updateQueue = r;
    return;
  }
  e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
}
function Vl(e, t, r, o) {
  var a = e.updateQueue;
  Vr = !1;
  var u = a.firstBaseUpdate, d = a.lastBaseUpdate, h = a.shared.pending;
  if (h !== null) {
    a.shared.pending = null;
    var g = h, y = g.next;
    g.next = null, d === null ? u = y : d.next = y, d = g;
    var x = e.alternate;
    x !== null && (x = x.updateQueue, h = x.lastBaseUpdate, h !== d && (h === null ? x.firstBaseUpdate = y : h.next = y, x.lastBaseUpdate = g));
  }
  if (u !== null) {
    var L = a.baseState;
    d = 0, x = y = g = null, h = u;
    do {
      var C = h.lane, P = h.eventTime;
      if ((o & C) === C) {
        x !== null && (x = x.next = {
          eventTime: P,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        e: {
          var $ = e, B = h;
          switch (C = t, P = r, B.tag) {
            case 1:
              if ($ = B.payload, typeof $ == "function") {
                L = $.call(P, L, C);
                break e;
              }
              L = $;
              break e;
            case 3:
              $.flags = $.flags & -65537 | 128;
            case 0:
              if ($ = B.payload, C = typeof $ == "function" ? $.call(P, L, C) : $, C == null) break e;
              L = Xe({}, L, C);
              break e;
            case 2:
              Vr = !0;
          }
        }
        h.callback !== null && h.lane !== 0 && (e.flags |= 64, C = a.effects, C === null ? a.effects = [h] : C.push(h));
      } else P = { eventTime: P, lane: C, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, x === null ? (y = x = P, g = L) : x = x.next = P, d |= C;
      if (h = h.next, h === null) {
        if (h = a.shared.pending, h === null) break;
        C = h, h = C.next, C.next = null, a.lastBaseUpdate = C, a.shared.pending = null;
      }
    } while (!0);
    if (x === null && (g = L), a.baseState = g, a.firstBaseUpdate = y, a.lastBaseUpdate = x, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        d |= a.lane, a = a.next;
      while (a !== t);
    } else u === null && (a.shared.lanes = 0);
    bn |= d, e.lanes = d, e.memoizedState = L;
  }
}
function Yf(e, t, r) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var o = e[t], a = o.callback;
    if (a !== null) {
      if (o.callback = null, o = r, typeof a != "function") throw Error(ee(191, a));
      a.call(o);
    }
  }
}
var bo = {}, wr = ln(bo), vo = ln(bo), ho = ln(bo);
function wn(e) {
  if (e === bo) throw Error(ee(174));
  return e;
}
function Yu(e, t) {
  switch (je(ho, t), je(vo, e), je(wr, bo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Fs(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Fs(t, e);
  }
  Be(wr), je(wr, t);
}
function pi() {
  Be(wr), Be(vo), Be(ho);
}
function $v(e) {
  wn(ho.current);
  var t = wn(wr.current), r = Fs(t, e.type);
  t !== r && (je(vo, e), je(wr, r));
}
function Ku(e) {
  vo.current === e && (Be(wr), Be(vo));
}
var He = ln(0);
function Wl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var rs = [];
function Qu() {
  for (var e = 0; e < rs.length; e++) rs[e]._workInProgressVersionPrimary = null;
  rs.length = 0;
}
var xl = Mr.ReactCurrentDispatcher, ns = Mr.ReactCurrentBatchConfig, Cn = 0, Ge = null, rt = null, it = null, Hl = !1, Qi = !1, mo = 0, Qx = 0;
function pt() {
  throw Error(ee(321));
}
function Zu(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++) if (!ur(e[r], t[r])) return !1;
  return !0;
}
function qu(e, t, r, o, a, u) {
  if (Cn = u, Ge = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, xl.current = e === null || e.memoizedState === null ? ek : tk, e = r(o, a), Qi) {
    u = 0;
    do {
      if (Qi = !1, mo = 0, 25 <= u) throw Error(ee(301));
      u += 1, it = rt = null, t.updateQueue = null, xl.current = rk, e = r(o, a);
    } while (Qi);
  }
  if (xl.current = Gl, t = rt !== null && rt.next !== null, Cn = 0, it = rt = Ge = null, Hl = !1, t) throw Error(ee(300));
  return e;
}
function Ju() {
  var e = mo !== 0;
  return mo = 0, e;
}
function mr() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return it === null ? Ge.memoizedState = it = e : it = it.next = e, it;
}
function qt() {
  if (rt === null) {
    var e = Ge.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = rt.next;
  var t = it === null ? Ge.memoizedState : it.next;
  if (t !== null) it = t, rt = e;
  else {
    if (e === null) throw Error(ee(310));
    rt = e, e = { memoizedState: rt.memoizedState, baseState: rt.baseState, baseQueue: rt.baseQueue, queue: rt.queue, next: null }, it === null ? Ge.memoizedState = it = e : it = it.next = e;
  }
  return it;
}
function go(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function is(e) {
  var t = qt(), r = t.queue;
  if (r === null) throw Error(ee(311));
  r.lastRenderedReducer = e;
  var o = rt, a = o.baseQueue, u = r.pending;
  if (u !== null) {
    if (a !== null) {
      var d = a.next;
      a.next = u.next, u.next = d;
    }
    o.baseQueue = a = u, r.pending = null;
  }
  if (a !== null) {
    u = a.next, o = o.baseState;
    var h = d = null, g = null, y = u;
    do {
      var x = y.lane;
      if ((Cn & x) === x) g !== null && (g = g.next = { lane: 0, action: y.action, hasEagerState: y.hasEagerState, eagerState: y.eagerState, next: null }), o = y.hasEagerState ? y.eagerState : e(o, y.action);
      else {
        var L = {
          lane: x,
          action: y.action,
          hasEagerState: y.hasEagerState,
          eagerState: y.eagerState,
          next: null
        };
        g === null ? (h = g = L, d = o) : g = g.next = L, Ge.lanes |= x, bn |= x;
      }
      y = y.next;
    } while (y !== null && y !== u);
    g === null ? d = o : g.next = h, ur(o, t.memoizedState) || (Lt = !0), t.memoizedState = o, t.baseState = d, t.baseQueue = g, r.lastRenderedState = o;
  }
  if (e = r.interleaved, e !== null) {
    a = e;
    do
      u = a.lane, Ge.lanes |= u, bn |= u, a = a.next;
    while (a !== e);
  } else a === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function os(e) {
  var t = qt(), r = t.queue;
  if (r === null) throw Error(ee(311));
  r.lastRenderedReducer = e;
  var o = r.dispatch, a = r.pending, u = t.memoizedState;
  if (a !== null) {
    r.pending = null;
    var d = a = a.next;
    do
      u = e(u, d.action), d = d.next;
    while (d !== a);
    ur(u, t.memoizedState) || (Lt = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), r.lastRenderedState = u;
  }
  return [u, o];
}
function Av() {
}
function Ov(e, t) {
  var r = Ge, o = qt(), a = t(), u = !ur(o.memoizedState, a);
  if (u && (o.memoizedState = a, Lt = !0), o = o.queue, ec(jv.bind(null, r, o, e), [e]), o.getSnapshot !== t || u || it !== null && it.memoizedState.tag & 1) {
    if (r.flags |= 2048, yo(9, Iv.bind(null, r, o, a, t), void 0, null), ot === null) throw Error(ee(349));
    Cn & 30 || Mv(r, t, a);
  }
  return a;
}
function Mv(e, t, r) {
  e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Ge.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ge.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
}
function Iv(e, t, r, o) {
  t.value = r, t.getSnapshot = o, Nv(t) && zv(e);
}
function jv(e, t, r) {
  return r(function() {
    Nv(t) && zv(e);
  });
}
function Nv(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !ur(e, r);
  } catch {
    return !0;
  }
}
function zv(e) {
  var t = Ar(e, 1);
  t !== null && sr(t, e, 1, -1);
}
function Kf(e) {
  var t = mr();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: go, lastRenderedState: e }, t.queue = e, e = e.dispatch = Jx.bind(null, Ge, e), [t.memoizedState, e];
}
function yo(e, t, r, o) {
  return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = Ge.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Ge.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
}
function Bv() {
  return qt().memoizedState;
}
function kl(e, t, r, o) {
  var a = mr();
  Ge.flags |= e, a.memoizedState = yo(1 | t, r, void 0, o === void 0 ? null : o);
}
function la(e, t, r, o) {
  var a = qt();
  o = o === void 0 ? null : o;
  var u = void 0;
  if (rt !== null) {
    var d = rt.memoizedState;
    if (u = d.destroy, o !== null && Zu(o, d.deps)) {
      a.memoizedState = yo(t, r, u, o);
      return;
    }
  }
  Ge.flags |= e, a.memoizedState = yo(1 | t, r, u, o);
}
function Qf(e, t) {
  return kl(8390656, 8, e, t);
}
function ec(e, t) {
  return la(2048, 8, e, t);
}
function Uv(e, t) {
  return la(4, 2, e, t);
}
function Vv(e, t) {
  return la(4, 4, e, t);
}
function Wv(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Hv(e, t, r) {
  return r = r != null ? r.concat([e]) : null, la(4, 4, Wv.bind(null, t, e), r);
}
function tc() {
}
function Gv(e, t) {
  var r = qt();
  t = t === void 0 ? null : t;
  var o = r.memoizedState;
  return o !== null && t !== null && Zu(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
}
function Xv(e, t) {
  var r = qt();
  t = t === void 0 ? null : t;
  var o = r.memoizedState;
  return o !== null && t !== null && Zu(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
}
function Yv(e, t, r) {
  return Cn & 21 ? (ur(r, t) || (r = Jp(), Ge.lanes |= r, bn |= r, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Lt = !0), e.memoizedState = r);
}
function Zx(e, t) {
  var r = Fe;
  Fe = r !== 0 && 4 > r ? r : 4, e(!0);
  var o = ns.transition;
  ns.transition = {};
  try {
    e(!1), t();
  } finally {
    Fe = r, ns.transition = o;
  }
}
function Kv() {
  return qt().memoizedState;
}
function qx(e, t, r) {
  var o = en(e);
  if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, Qv(e)) Zv(t, r);
  else if (r = Rv(e, t, r, o), r !== null) {
    var a = kt();
    sr(r, e, o, a), qv(r, t, o);
  }
}
function Jx(e, t, r) {
  var o = en(e), a = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Qv(e)) Zv(t, a);
  else {
    var u = e.alternate;
    if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
      var d = t.lastRenderedState, h = u(d, r);
      if (a.hasEagerState = !0, a.eagerState = h, ur(h, d)) {
        var g = t.interleaved;
        g === null ? (a.next = a, Gu(t)) : (a.next = g.next, g.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    r = Rv(e, t, a, o), r !== null && (a = kt(), sr(r, e, o, a), qv(r, t, o));
  }
}
function Qv(e) {
  var t = e.alternate;
  return e === Ge || t !== null && t === Ge;
}
function Zv(e, t) {
  Qi = Hl = !0;
  var r = e.pending;
  r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
}
function qv(e, t, r) {
  if (r & 4194240) {
    var o = t.lanes;
    o &= e.pendingLanes, r |= o, t.lanes = r, Fu(e, r);
  }
}
var Gl = { readContext: Zt, useCallback: pt, useContext: pt, useEffect: pt, useImperativeHandle: pt, useInsertionEffect: pt, useLayoutEffect: pt, useMemo: pt, useReducer: pt, useRef: pt, useState: pt, useDebugValue: pt, useDeferredValue: pt, useTransition: pt, useMutableSource: pt, useSyncExternalStore: pt, useId: pt, unstable_isNewReconciler: !1 }, ek = { readContext: Zt, useCallback: function(e, t) {
  return mr().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Zt, useEffect: Qf, useImperativeHandle: function(e, t, r) {
  return r = r != null ? r.concat([e]) : null, kl(
    4194308,
    4,
    Wv.bind(null, t, e),
    r
  );
}, useLayoutEffect: function(e, t) {
  return kl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return kl(4, 2, e, t);
}, useMemo: function(e, t) {
  var r = mr();
  return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
}, useReducer: function(e, t, r) {
  var o = mr();
  return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = qx.bind(null, Ge, e), [o.memoizedState, e];
}, useRef: function(e) {
  var t = mr();
  return e = { current: e }, t.memoizedState = e;
}, useState: Kf, useDebugValue: tc, useDeferredValue: function(e) {
  return mr().memoizedState = e;
}, useTransition: function() {
  var e = Kf(!1), t = e[0];
  return e = Zx.bind(null, e[1]), mr().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, r) {
  var o = Ge, a = mr();
  if (Ve) {
    if (r === void 0) throw Error(ee(407));
    r = r();
  } else {
    if (r = t(), ot === null) throw Error(ee(349));
    Cn & 30 || Mv(o, t, r);
  }
  a.memoizedState = r;
  var u = { value: r, getSnapshot: t };
  return a.queue = u, Qf(jv.bind(
    null,
    o,
    u,
    e
  ), [e]), o.flags |= 2048, yo(9, Iv.bind(null, o, u, r, t), void 0, null), r;
}, useId: function() {
  var e = mr(), t = ot.identifierPrefix;
  if (Ve) {
    var r = Dr, o = Lr;
    r = (o & ~(1 << 32 - ar(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = mo++, 0 < r && (t += "H" + r.toString(32)), t += ":";
  } else r = Qx++, t = ":" + t + "r" + r.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, tk = {
  readContext: Zt,
  useCallback: Gv,
  useContext: Zt,
  useEffect: ec,
  useImperativeHandle: Hv,
  useInsertionEffect: Uv,
  useLayoutEffect: Vv,
  useMemo: Xv,
  useReducer: is,
  useRef: Bv,
  useState: function() {
    return is(go);
  },
  useDebugValue: tc,
  useDeferredValue: function(e) {
    var t = qt();
    return Yv(t, rt.memoizedState, e);
  },
  useTransition: function() {
    var e = is(go)[0], t = qt().memoizedState;
    return [e, t];
  },
  useMutableSource: Av,
  useSyncExternalStore: Ov,
  useId: Kv,
  unstable_isNewReconciler: !1
}, rk = { readContext: Zt, useCallback: Gv, useContext: Zt, useEffect: ec, useImperativeHandle: Hv, useInsertionEffect: Uv, useLayoutEffect: Vv, useMemo: Xv, useReducer: os, useRef: Bv, useState: function() {
  return os(go);
}, useDebugValue: tc, useDeferredValue: function(e) {
  var t = qt();
  return rt === null ? t.memoizedState = e : Yv(t, rt.memoizedState, e);
}, useTransition: function() {
  var e = os(go)[0], t = qt().memoizedState;
  return [e, t];
}, useMutableSource: Av, useSyncExternalStore: Ov, useId: Kv, unstable_isNewReconciler: !1 };
function ir(e, t) {
  if (e && e.defaultProps) {
    t = Xe({}, t), e = e.defaultProps;
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function Js(e, t, r, o) {
  t = e.memoizedState, r = r(o, t), r = r == null ? t : Xe({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
}
var aa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Dn(e) === e : !1;
}, enqueueSetState: function(e, t, r) {
  e = e._reactInternals;
  var o = kt(), a = en(e), u = Rr(o, a);
  u.payload = t, r != null && (u.callback = r), t = qr(e, u, a), t !== null && (sr(t, e, a, o), wl(t, e, a));
}, enqueueReplaceState: function(e, t, r) {
  e = e._reactInternals;
  var o = kt(), a = en(e), u = Rr(o, a);
  u.tag = 1, u.payload = t, r != null && (u.callback = r), t = qr(e, u, a), t !== null && (sr(t, e, a, o), wl(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var r = kt(), o = en(e), a = Rr(r, o);
  a.tag = 2, t != null && (a.callback = t), t = qr(e, a, o), t !== null && (sr(t, e, o, r), wl(t, e, o));
} };
function Zf(e, t, r, o, a, u, d) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, u, d) : t.prototype && t.prototype.isPureReactComponent ? !uo(r, o) || !uo(a, u) : !0;
}
function Jv(e, t, r) {
  var o = !1, a = nn, u = t.contextType;
  return typeof u == "object" && u !== null ? u = Zt(u) : (a = Rt(t) ? Sn : mt.current, o = t.contextTypes, u = (o = o != null) ? ci(e, a) : nn), t = new t(r, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = aa, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = u), t;
}
function qf(e, t, r, o) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && aa.enqueueReplaceState(t, t.state, null);
}
function eu(e, t, r, o) {
  var a = e.stateNode;
  a.props = r, a.state = e.memoizedState, a.refs = {}, Xu(e);
  var u = t.contextType;
  typeof u == "object" && u !== null ? a.context = Zt(u) : (u = Rt(t) ? Sn : mt.current, a.context = ci(e, u)), a.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (Js(e, t, u, r), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && aa.enqueueReplaceState(a, a.state, null), Vl(e, r, a, o), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function vi(e, t) {
  try {
    var r = "", o = t;
    do
      r += D2(o), o = o.return;
    while (o);
    var a = r;
  } catch (u) {
    a = `
Error generating stack: ` + u.message + `
` + u.stack;
  }
  return { value: e, source: t, stack: a, digest: null };
}
function ls(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function tu(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function() {
      throw r;
    });
  }
}
var nk = typeof WeakMap == "function" ? WeakMap : Map;
function e0(e, t, r) {
  r = Rr(-1, r), r.tag = 3, r.payload = { element: null };
  var o = t.value;
  return r.callback = function() {
    Yl || (Yl = !0, fu = o), tu(e, t);
  }, r;
}
function t0(e, t, r) {
  r = Rr(-1, r), r.tag = 3;
  var o = e.type.getDerivedStateFromError;
  if (typeof o == "function") {
    var a = t.value;
    r.payload = function() {
      return o(a);
    }, r.callback = function() {
      tu(e, t);
    };
  }
  var u = e.stateNode;
  return u !== null && typeof u.componentDidCatch == "function" && (r.callback = function() {
    tu(e, t), typeof o != "function" && (Jr === null ? Jr = /* @__PURE__ */ new Set([this]) : Jr.add(this));
    var d = t.stack;
    this.componentDidCatch(t.value, { componentStack: d !== null ? d : "" });
  }), r;
}
function Jf(e, t, r) {
  var o = e.pingCache;
  if (o === null) {
    o = e.pingCache = new nk();
    var a = /* @__PURE__ */ new Set();
    o.set(t, a);
  } else a = o.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), o.set(t, a));
  a.has(r) || (a.add(r), e = gk.bind(null, e, t, r), t.then(e, e));
}
function ed(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function td(e, t, r, o, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Rr(-1, 1), t.tag = 2, qr(r, t, 1))), r.lanes |= 1), e);
}
var ik = Mr.ReactCurrentOwner, Lt = !1;
function xt(e, t, r, o) {
  t.child = e === null ? Dv(t, null, r, o) : di(t, e.child, r, o);
}
function rd(e, t, r, o, a) {
  r = r.render;
  var u = t.ref;
  return li(t, a), o = qu(e, t, r, o, u, a), r = Ju(), e !== null && !Lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Or(e, t, a)) : (Ve && r && zu(t), t.flags |= 1, xt(e, t, o, a), t.child);
}
function nd(e, t, r, o, a) {
  if (e === null) {
    var u = r.type;
    return typeof u == "function" && !uc(u) && u.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = u, r0(e, t, u, o, a)) : (e = bl(r.type, null, o, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (u = e.child, !(e.lanes & a)) {
    var d = u.memoizedProps;
    if (r = r.compare, r = r !== null ? r : uo, r(d, o) && e.ref === t.ref) return Or(e, t, a);
  }
  return t.flags |= 1, e = tn(u, o), e.ref = t.ref, e.return = t, t.child = e;
}
function r0(e, t, r, o, a) {
  if (e !== null) {
    var u = e.memoizedProps;
    if (uo(u, o) && e.ref === t.ref) if (Lt = !1, t.pendingProps = o = u, (e.lanes & a) !== 0) e.flags & 131072 && (Lt = !0);
    else return t.lanes = e.lanes, Or(e, t, a);
  }
  return ru(e, t, r, o, a);
}
function n0(e, t, r) {
  var o = t.pendingProps, a = o.children, u = e !== null ? e.memoizedState : null;
  if (o.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, je(ti, It), It |= r;
  else {
    if (!(r & 1073741824)) return e = u !== null ? u.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, je(ti, It), It |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = u !== null ? u.baseLanes : r, je(ti, It), It |= o;
  }
  else u !== null ? (o = u.baseLanes | r, t.memoizedState = null) : o = r, je(ti, It), It |= o;
  return xt(e, t, a, r), t.child;
}
function i0(e, t) {
  var r = t.ref;
  (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
}
function ru(e, t, r, o, a) {
  var u = Rt(r) ? Sn : mt.current;
  return u = ci(t, u), li(t, a), r = qu(e, t, r, o, u, a), o = Ju(), e !== null && !Lt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Or(e, t, a)) : (Ve && o && zu(t), t.flags |= 1, xt(e, t, r, a), t.child);
}
function id(e, t, r, o, a) {
  if (Rt(r)) {
    var u = !0;
    jl(t);
  } else u = !1;
  if (li(t, a), t.stateNode === null) Sl(e, t), Jv(t, r, o), eu(t, r, o, a), o = !0;
  else if (e === null) {
    var d = t.stateNode, h = t.memoizedProps;
    d.props = h;
    var g = d.context, y = r.contextType;
    typeof y == "object" && y !== null ? y = Zt(y) : (y = Rt(r) ? Sn : mt.current, y = ci(t, y));
    var x = r.getDerivedStateFromProps, L = typeof x == "function" || typeof d.getSnapshotBeforeUpdate == "function";
    L || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h !== o || g !== y) && qf(t, d, o, y), Vr = !1;
    var C = t.memoizedState;
    d.state = C, Vl(t, o, d, a), g = t.memoizedState, h !== o || C !== g || Dt.current || Vr ? (typeof x == "function" && (Js(t, r, x, o), g = t.memoizedState), (h = Vr || Zf(t, r, h, o, C, g, y)) ? (L || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = g), d.props = o, d.state = g, d.context = y, o = h) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
  } else {
    d = t.stateNode, Fv(e, t), h = t.memoizedProps, y = t.type === t.elementType ? h : ir(t.type, h), d.props = y, L = t.pendingProps, C = d.context, g = r.contextType, typeof g == "object" && g !== null ? g = Zt(g) : (g = Rt(r) ? Sn : mt.current, g = ci(t, g));
    var P = r.getDerivedStateFromProps;
    (x = typeof P == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (h !== L || C !== g) && qf(t, d, o, g), Vr = !1, C = t.memoizedState, d.state = C, Vl(t, o, d, a);
    var $ = t.memoizedState;
    h !== L || C !== $ || Dt.current || Vr ? (typeof P == "function" && (Js(t, r, P, o), $ = t.memoizedState), (y = Vr || Zf(t, r, y, o, C, $, g) || !1) ? (x || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, $, g), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, $, g)), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = $), d.props = o, d.state = $, d.context = g, o = y) : (typeof d.componentDidUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), o = !1);
  }
  return nu(e, t, r, o, u, a);
}
function nu(e, t, r, o, a, u) {
  i0(e, t);
  var d = (t.flags & 128) !== 0;
  if (!o && !d) return a && Vf(t, r, !1), Or(e, t, u);
  o = t.stateNode, ik.current = t;
  var h = d && typeof r.getDerivedStateFromError != "function" ? null : o.render();
  return t.flags |= 1, e !== null && d ? (t.child = di(t, e.child, null, u), t.child = di(t, null, h, u)) : xt(e, t, h, u), t.memoizedState = o.state, a && Vf(t, r, !0), t.child;
}
function o0(e) {
  var t = e.stateNode;
  t.pendingContext ? Uf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Uf(e, t.context, !1), Yu(e, t.containerInfo);
}
function od(e, t, r, o, a) {
  return fi(), Uu(a), t.flags |= 256, xt(e, t, r, o), t.child;
}
var iu = { dehydrated: null, treeContext: null, retryLane: 0 };
function ou(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function l0(e, t, r) {
  var o = t.pendingProps, a = He.current, u = !1, d = (t.flags & 128) !== 0, h;
  if ((h = d) || (h = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), h ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), je(He, a & 1), e === null)
    return Zs(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (d = o.children, e = o.fallback, u ? (o = t.mode, u = t.child, d = { mode: "hidden", children: d }, !(o & 1) && u !== null ? (u.childLanes = 0, u.pendingProps = d) : u = ca(d, o, 0, null), e = kn(e, o, r, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = ou(r), t.memoizedState = iu, e) : rc(t, d));
  if (a = e.memoizedState, a !== null && (h = a.dehydrated, h !== null)) return ok(e, t, d, o, h, a, r);
  if (u) {
    u = o.fallback, d = t.mode, a = e.child, h = a.sibling;
    var g = { mode: "hidden", children: o.children };
    return !(d & 1) && t.child !== a ? (o = t.child, o.childLanes = 0, o.pendingProps = g, t.deletions = null) : (o = tn(a, g), o.subtreeFlags = a.subtreeFlags & 14680064), h !== null ? u = tn(h, u) : (u = kn(u, d, r, null), u.flags |= 2), u.return = t, o.return = t, o.sibling = u, t.child = o, o = u, u = t.child, d = e.child.memoizedState, d = d === null ? ou(r) : { baseLanes: d.baseLanes | r, cachePool: null, transitions: d.transitions }, u.memoizedState = d, u.childLanes = e.childLanes & ~r, t.memoizedState = iu, o;
  }
  return u = e.child, e = u.sibling, o = tn(u, { mode: "visible", children: o.children }), !(t.mode & 1) && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
}
function rc(e, t) {
  return t = ca({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ll(e, t, r, o) {
  return o !== null && Uu(o), di(t, e.child, null, r), e = rc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function ok(e, t, r, o, a, u, d) {
  if (r)
    return t.flags & 256 ? (t.flags &= -257, o = ls(Error(ee(422))), ll(e, t, d, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = o.fallback, a = t.mode, o = ca({ mode: "visible", children: o.children }, a, 0, null), u = kn(u, a, d, null), u.flags |= 2, o.return = t, u.return = t, o.sibling = u, t.child = o, t.mode & 1 && di(t, e.child, null, d), t.child.memoizedState = ou(d), t.memoizedState = iu, u);
  if (!(t.mode & 1)) return ll(e, t, d, null);
  if (a.data === "$!") {
    if (o = a.nextSibling && a.nextSibling.dataset, o) var h = o.dgst;
    return o = h, u = Error(ee(419)), o = ls(u, o, void 0), ll(e, t, d, o);
  }
  if (h = (d & e.childLanes) !== 0, Lt || h) {
    if (o = ot, o !== null) {
      switch (d & -d) {
        case 4:
          a = 2;
          break;
        case 16:
          a = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          a = 32;
          break;
        case 536870912:
          a = 268435456;
          break;
        default:
          a = 0;
      }
      a = a & (o.suspendedLanes | d) ? 0 : a, a !== 0 && a !== u.retryLane && (u.retryLane = a, Ar(e, a), sr(o, e, a, -1));
    }
    return sc(), o = ls(Error(ee(421))), ll(e, t, d, o);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = yk.bind(null, e), a._reactRetry = t, null) : (e = u.treeContext, jt = Zr(a.nextSibling), Nt = t, Ve = !0, lr = null, e !== null && (Xt[Yt++] = Lr, Xt[Yt++] = Dr, Xt[Yt++] = En, Lr = e.id, Dr = e.overflow, En = t), t = rc(t, o.children), t.flags |= 4096, t);
}
function ld(e, t, r) {
  e.lanes |= t;
  var o = e.alternate;
  o !== null && (o.lanes |= t), qs(e.return, t, r);
}
function as(e, t, r, o, a) {
  var u = e.memoizedState;
  u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: a } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = o, u.tail = r, u.tailMode = a);
}
function a0(e, t, r) {
  var o = t.pendingProps, a = o.revealOrder, u = o.tail;
  if (xt(e, t, o.children, r), o = He.current, o & 2) o = o & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ld(e, r, t);
      else if (e.tag === 19) ld(e, r, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    o &= 1;
  }
  if (je(He, o), !(t.mode & 1)) t.memoizedState = null;
  else switch (a) {
    case "forwards":
      for (r = t.child, a = null; r !== null; ) e = r.alternate, e !== null && Wl(e) === null && (a = r), r = r.sibling;
      r = a, r === null ? (a = t.child, t.child = null) : (a = r.sibling, r.sibling = null), as(t, !1, a, r, u);
      break;
    case "backwards":
      for (r = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && Wl(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = r, r = a, a = e;
      }
      as(t, !0, r, null, u);
      break;
    case "together":
      as(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Sl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Or(e, t, r) {
  if (e !== null && (t.dependencies = e.dependencies), bn |= t.lanes, !(r & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ee(153));
  if (t.child !== null) {
    for (e = t.child, r = tn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = tn(e, e.pendingProps), r.return = t;
    r.sibling = null;
  }
  return t.child;
}
function lk(e, t, r) {
  switch (t.tag) {
    case 3:
      o0(t), fi();
      break;
    case 5:
      $v(t);
      break;
    case 1:
      Rt(t.type) && jl(t);
      break;
    case 4:
      Yu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var o = t.type._context, a = t.memoizedProps.value;
      je(Bl, o._currentValue), o._currentValue = a;
      break;
    case 13:
      if (o = t.memoizedState, o !== null)
        return o.dehydrated !== null ? (je(He, He.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? l0(e, t, r) : (je(He, He.current & 1), e = Or(e, t, r), e !== null ? e.sibling : null);
      je(He, He.current & 1);
      break;
    case 19:
      if (o = (r & t.childLanes) !== 0, e.flags & 128) {
        if (o) return a0(e, t, r);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), je(He, He.current), o) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, n0(e, t, r);
  }
  return Or(e, t, r);
}
var s0, lu, u0, c0;
s0 = function(e, t) {
  for (var r = t.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      r.child.return = r, r = r.child;
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    r.sibling.return = r.return, r = r.sibling;
  }
};
lu = function() {
};
u0 = function(e, t, r, o) {
  var a = e.memoizedProps;
  if (a !== o) {
    e = t.stateNode, wn(wr.current);
    var u = null;
    switch (r) {
      case "input":
        a = Ts(e, a), o = Ts(e, o), u = [];
        break;
      case "select":
        a = Xe({}, a, { value: void 0 }), o = Xe({}, o, { value: void 0 }), u = [];
        break;
      case "textarea":
        a = Rs(e, a), o = Rs(e, o), u = [];
        break;
      default:
        typeof a.onClick != "function" && typeof o.onClick == "function" && (e.onclick = Ml);
    }
    $s(r, o);
    var d;
    r = null;
    for (y in a) if (!o.hasOwnProperty(y) && a.hasOwnProperty(y) && a[y] != null) if (y === "style") {
      var h = a[y];
      for (d in h) h.hasOwnProperty(d) && (r || (r = {}), r[d] = "");
    } else y !== "dangerouslySetInnerHTML" && y !== "children" && y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && y !== "autoFocus" && (ro.hasOwnProperty(y) ? u || (u = []) : (u = u || []).push(y, null));
    for (y in o) {
      var g = o[y];
      if (h = a != null ? a[y] : void 0, o.hasOwnProperty(y) && g !== h && (g != null || h != null)) if (y === "style") if (h) {
        for (d in h) !h.hasOwnProperty(d) || g && g.hasOwnProperty(d) || (r || (r = {}), r[d] = "");
        for (d in g) g.hasOwnProperty(d) && h[d] !== g[d] && (r || (r = {}), r[d] = g[d]);
      } else r || (u || (u = []), u.push(
        y,
        r
      )), r = g;
      else y === "dangerouslySetInnerHTML" ? (g = g ? g.__html : void 0, h = h ? h.__html : void 0, g != null && h !== g && (u = u || []).push(y, g)) : y === "children" ? typeof g != "string" && typeof g != "number" || (u = u || []).push(y, "" + g) : y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && (ro.hasOwnProperty(y) ? (g != null && y === "onScroll" && ze("scroll", e), u || h === g || (u = [])) : (u = u || []).push(y, g));
    }
    r && (u = u || []).push("style", r);
    var y = u;
    (t.updateQueue = y) && (t.flags |= 4);
  }
};
c0 = function(e, t, r, o) {
  r !== o && (t.flags |= 4);
};
function Ni(e, t) {
  if (!Ve) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
      r === null ? e.tail = null : r.sibling = null;
      break;
    case "collapsed":
      r = e.tail;
      for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
      o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
  }
}
function vt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
  if (t) for (var a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags & 14680064, o |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) r |= a.lanes | a.childLanes, o |= a.subtreeFlags, o |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= o, e.childLanes = r, t;
}
function ak(e, t, r) {
  var o = t.pendingProps;
  switch (Bu(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return vt(t), null;
    case 1:
      return Rt(t.type) && Il(), vt(t), null;
    case 3:
      return o = t.stateNode, pi(), Be(Dt), Be(mt), Qu(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (il(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, lr !== null && (vu(lr), lr = null))), lu(e, t), vt(t), null;
    case 5:
      Ku(t);
      var a = wn(ho.current);
      if (r = t.type, e !== null && t.stateNode != null) u0(e, t, r, o, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!o) {
          if (t.stateNode === null) throw Error(ee(166));
          return vt(t), null;
        }
        if (e = wn(wr.current), il(t)) {
          o = t.stateNode, r = t.type;
          var u = t.memoizedProps;
          switch (o[yr] = t, o[po] = u, e = (t.mode & 1) !== 0, r) {
            case "dialog":
              ze("cancel", o), ze("close", o);
              break;
            case "iframe":
            case "object":
            case "embed":
              ze("load", o);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Wi.length; a++) ze(Wi[a], o);
              break;
            case "source":
              ze("error", o);
              break;
            case "img":
            case "image":
            case "link":
              ze(
                "error",
                o
              ), ze("load", o);
              break;
            case "details":
              ze("toggle", o);
              break;
            case "input":
              hf(o, u), ze("invalid", o);
              break;
            case "select":
              o._wrapperState = { wasMultiple: !!u.multiple }, ze("invalid", o);
              break;
            case "textarea":
              gf(o, u), ze("invalid", o);
          }
          $s(r, u), a = null;
          for (var d in u) if (u.hasOwnProperty(d)) {
            var h = u[d];
            d === "children" ? typeof h == "string" ? o.textContent !== h && (u.suppressHydrationWarning !== !0 && nl(o.textContent, h, e), a = ["children", h]) : typeof h == "number" && o.textContent !== "" + h && (u.suppressHydrationWarning !== !0 && nl(
              o.textContent,
              h,
              e
            ), a = ["children", "" + h]) : ro.hasOwnProperty(d) && h != null && d === "onScroll" && ze("scroll", o);
          }
          switch (r) {
            case "input":
              Ko(o), mf(o, u, !0);
              break;
            case "textarea":
              Ko(o), yf(o);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof u.onClick == "function" && (o.onclick = Ml);
          }
          o = a, t.updateQueue = o, o !== null && (t.flags |= 4);
        } else {
          d = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = jp(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = d.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = d.createElement(r, { is: o.is }) : (e = d.createElement(r), r === "select" && (d = e, o.multiple ? d.multiple = !0 : o.size && (d.size = o.size))) : e = d.createElementNS(e, r), e[yr] = t, e[po] = o, s0(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (d = As(r, o), r) {
              case "dialog":
                ze("cancel", e), ze("close", e), a = o;
                break;
              case "iframe":
              case "object":
              case "embed":
                ze("load", e), a = o;
                break;
              case "video":
              case "audio":
                for (a = 0; a < Wi.length; a++) ze(Wi[a], e);
                a = o;
                break;
              case "source":
                ze("error", e), a = o;
                break;
              case "img":
              case "image":
              case "link":
                ze(
                  "error",
                  e
                ), ze("load", e), a = o;
                break;
              case "details":
                ze("toggle", e), a = o;
                break;
              case "input":
                hf(e, o), a = Ts(e, o), ze("invalid", e);
                break;
              case "option":
                a = o;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!o.multiple }, a = Xe({}, o, { value: void 0 }), ze("invalid", e);
                break;
              case "textarea":
                gf(e, o), a = Rs(e, o), ze("invalid", e);
                break;
              default:
                a = o;
            }
            $s(r, a), h = a;
            for (u in h) if (h.hasOwnProperty(u)) {
              var g = h[u];
              u === "style" ? Bp(e, g) : u === "dangerouslySetInnerHTML" ? (g = g ? g.__html : void 0, g != null && Np(e, g)) : u === "children" ? typeof g == "string" ? (r !== "textarea" || g !== "") && no(e, g) : typeof g == "number" && no(e, "" + g) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (ro.hasOwnProperty(u) ? g != null && u === "onScroll" && ze("scroll", e) : g != null && bu(e, u, g, d));
            }
            switch (r) {
              case "input":
                Ko(e), mf(e, o, !1);
                break;
              case "textarea":
                Ko(e), yf(e);
                break;
              case "option":
                o.value != null && e.setAttribute("value", "" + rn(o.value));
                break;
              case "select":
                e.multiple = !!o.multiple, u = o.value, u != null ? ri(e, !!o.multiple, u, !1) : o.defaultValue != null && ri(
                  e,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                );
                break;
              default:
                typeof a.onClick == "function" && (e.onclick = Ml);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
          }
          o && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return vt(t), null;
    case 6:
      if (e && t.stateNode != null) c0(e, t, e.memoizedProps, o);
      else {
        if (typeof o != "string" && t.stateNode === null) throw Error(ee(166));
        if (r = wn(ho.current), wn(wr.current), il(t)) {
          if (o = t.stateNode, r = t.memoizedProps, o[yr] = t, (u = o.nodeValue !== r) && (e = Nt, e !== null)) switch (e.tag) {
            case 3:
              nl(o.nodeValue, r, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && nl(o.nodeValue, r, (e.mode & 1) !== 0);
          }
          u && (t.flags |= 4);
        } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[yr] = t, t.stateNode = o;
      }
      return vt(t), null;
    case 13:
      if (Be(He), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Ve && jt !== null && t.mode & 1 && !(t.flags & 128)) Tv(), fi(), t.flags |= 98560, u = !1;
        else if (u = il(t), o !== null && o.dehydrated !== null) {
          if (e === null) {
            if (!u) throw Error(ee(318));
            if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(ee(317));
            u[yr] = t;
          } else fi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          vt(t), u = !1;
        } else lr !== null && (vu(lr), lr = null), u = !0;
        if (!u) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, t.mode & 1 && (e === null || He.current & 1 ? nt === 0 && (nt = 3) : sc())), t.updateQueue !== null && (t.flags |= 4), vt(t), null);
    case 4:
      return pi(), lu(e, t), e === null && co(t.stateNode.containerInfo), vt(t), null;
    case 10:
      return Hu(t.type._context), vt(t), null;
    case 17:
      return Rt(t.type) && Il(), vt(t), null;
    case 19:
      if (Be(He), u = t.memoizedState, u === null) return vt(t), null;
      if (o = (t.flags & 128) !== 0, d = u.rendering, d === null) if (o) Ni(u, !1);
      else {
        if (nt !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (d = Wl(e), d !== null) {
            for (t.flags |= 128, Ni(u, !1), o = d.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) u = r, e = o, u.flags &= 14680066, d = u.alternate, d === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = d.childLanes, u.lanes = d.lanes, u.child = d.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = d.memoizedProps, u.memoizedState = d.memoizedState, u.updateQueue = d.updateQueue, u.type = d.type, e = d.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
            return je(He, He.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        u.tail !== null && qe() > hi && (t.flags |= 128, o = !0, Ni(u, !1), t.lanes = 4194304);
      }
      else {
        if (!o) if (e = Wl(d), e !== null) {
          if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), Ni(u, !0), u.tail === null && u.tailMode === "hidden" && !d.alternate && !Ve) return vt(t), null;
        } else 2 * qe() - u.renderingStartTime > hi && r !== 1073741824 && (t.flags |= 128, o = !0, Ni(u, !1), t.lanes = 4194304);
        u.isBackwards ? (d.sibling = t.child, t.child = d) : (r = u.last, r !== null ? r.sibling = d : t.child = d, u.last = d);
      }
      return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = qe(), t.sibling = null, r = He.current, je(He, o ? r & 1 | 2 : r & 1), t) : (vt(t), null);
    case 22:
    case 23:
      return ac(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && t.mode & 1 ? It & 1073741824 && (vt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ee(156, t.tag));
}
function sk(e, t) {
  switch (Bu(t), t.tag) {
    case 1:
      return Rt(t.type) && Il(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pi(), Be(Dt), Be(mt), Qu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ku(t), null;
    case 13:
      if (Be(He), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ee(340));
        fi();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Be(He), null;
    case 4:
      return pi(), null;
    case 10:
      return Hu(t.type._context), null;
    case 22:
    case 23:
      return ac(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var al = !1, ht = !1, uk = typeof WeakSet == "function" ? WeakSet : Set, le = null;
function ei(e, t) {
  var r = e.ref;
  if (r !== null) if (typeof r == "function") try {
    r(null);
  } catch (o) {
    Qe(e, t, o);
  }
  else r.current = null;
}
function au(e, t, r) {
  try {
    r();
  } catch (o) {
    Qe(e, t, o);
  }
}
var ad = !1;
function ck(e, t) {
  if (Ws = $l, e = hv(), Nu(e)) {
    if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      r = (r = e.ownerDocument) && r.defaultView || window;
      var o = r.getSelection && r.getSelection();
      if (o && o.rangeCount !== 0) {
        r = o.anchorNode;
        var a = o.anchorOffset, u = o.focusNode;
        o = o.focusOffset;
        try {
          r.nodeType, u.nodeType;
        } catch {
          r = null;
          break e;
        }
        var d = 0, h = -1, g = -1, y = 0, x = 0, L = e, C = null;
        t: for (; ; ) {
          for (var P; L !== r || a !== 0 && L.nodeType !== 3 || (h = d + a), L !== u || o !== 0 && L.nodeType !== 3 || (g = d + o), L.nodeType === 3 && (d += L.nodeValue.length), (P = L.firstChild) !== null; )
            C = L, L = P;
          for (; ; ) {
            if (L === e) break t;
            if (C === r && ++y === a && (h = d), C === u && ++x === o && (g = d), (P = L.nextSibling) !== null) break;
            L = C, C = L.parentNode;
          }
          L = P;
        }
        r = h === -1 || g === -1 ? null : { start: h, end: g };
      } else r = null;
    }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (Hs = { focusedElem: e, selectionRange: r }, $l = !1, le = t; le !== null; ) if (t = le, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, le = e;
  else for (; le !== null; ) {
    t = le;
    try {
      var $ = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ($ !== null) {
            var B = $.memoizedProps, Y = $.memoizedState, k = t.stateNode, w = k.getSnapshotBeforeUpdate(t.elementType === t.type ? B : ir(t.type, B), Y);
            k.__reactInternalSnapshotBeforeUpdate = w;
          }
          break;
        case 3:
          var S = t.stateNode.containerInfo;
          S.nodeType === 1 ? S.textContent = "" : S.nodeType === 9 && S.documentElement && S.removeChild(S.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ee(163));
      }
    } catch (E) {
      Qe(t, t.return, E);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, le = e;
      break;
    }
    le = t.return;
  }
  return $ = ad, ad = !1, $;
}
function Zi(e, t, r) {
  var o = t.updateQueue;
  if (o = o !== null ? o.lastEffect : null, o !== null) {
    var a = o = o.next;
    do {
      if ((a.tag & e) === e) {
        var u = a.destroy;
        a.destroy = void 0, u !== void 0 && au(t, r, u);
      }
      a = a.next;
    } while (a !== o);
  }
}
function sa(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var r = t = t.next;
    do {
      if ((r.tag & e) === e) {
        var o = r.create;
        r.destroy = o();
      }
      r = r.next;
    } while (r !== t);
  }
}
function su(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function f0(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, f0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[yr], delete t[po], delete t[Ys], delete t[Gx], delete t[Xx])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function d0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function sd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || d0(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function uu(e, t, r) {
  var o = e.tag;
  if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Ml));
  else if (o !== 4 && (e = e.child, e !== null)) for (uu(e, t, r), e = e.sibling; e !== null; ) uu(e, t, r), e = e.sibling;
}
function cu(e, t, r) {
  var o = e.tag;
  if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (o !== 4 && (e = e.child, e !== null)) for (cu(e, t, r), e = e.sibling; e !== null; ) cu(e, t, r), e = e.sibling;
}
var ut = null, or = !1;
function zr(e, t, r) {
  for (r = r.child; r !== null; ) p0(e, t, r), r = r.sibling;
}
function p0(e, t, r) {
  if (_r && typeof _r.onCommitFiberUnmount == "function") try {
    _r.onCommitFiberUnmount(ea, r);
  } catch {
  }
  switch (r.tag) {
    case 5:
      ht || ei(r, t);
    case 6:
      var o = ut, a = or;
      ut = null, zr(e, t, r), ut = o, or = a, ut !== null && (or ? (e = ut, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : ut.removeChild(r.stateNode));
      break;
    case 18:
      ut !== null && (or ? (e = ut, r = r.stateNode, e.nodeType === 8 ? es(e.parentNode, r) : e.nodeType === 1 && es(e, r), ao(e)) : es(ut, r.stateNode));
      break;
    case 4:
      o = ut, a = or, ut = r.stateNode.containerInfo, or = !0, zr(e, t, r), ut = o, or = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ht && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
        a = o = o.next;
        do {
          var u = a, d = u.destroy;
          u = u.tag, d !== void 0 && (u & 2 || u & 4) && au(r, t, d), a = a.next;
        } while (a !== o);
      }
      zr(e, t, r);
      break;
    case 1:
      if (!ht && (ei(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
        o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
      } catch (h) {
        Qe(r, t, h);
      }
      zr(e, t, r);
      break;
    case 21:
      zr(e, t, r);
      break;
    case 22:
      r.mode & 1 ? (ht = (o = ht) || r.memoizedState !== null, zr(e, t, r), ht = o) : zr(e, t, r);
      break;
    default:
      zr(e, t, r);
  }
}
function ud(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new uk()), t.forEach(function(o) {
      var a = _k.bind(null, e, o);
      r.has(o) || (r.add(o), o.then(a, a));
    });
  }
}
function nr(e, t) {
  var r = t.deletions;
  if (r !== null) for (var o = 0; o < r.length; o++) {
    var a = r[o];
    try {
      var u = e, d = t, h = d;
      e: for (; h !== null; ) {
        switch (h.tag) {
          case 5:
            ut = h.stateNode, or = !1;
            break e;
          case 3:
            ut = h.stateNode.containerInfo, or = !0;
            break e;
          case 4:
            ut = h.stateNode.containerInfo, or = !0;
            break e;
        }
        h = h.return;
      }
      if (ut === null) throw Error(ee(160));
      p0(u, d, a), ut = null, or = !1;
      var g = a.alternate;
      g !== null && (g.return = null), a.return = null;
    } catch (y) {
      Qe(a, t, y);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) v0(t, e), t = t.sibling;
}
function v0(e, t) {
  var r = e.alternate, o = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (nr(t, e), vr(e), o & 4) {
        try {
          Zi(3, e, e.return), sa(3, e);
        } catch (B) {
          Qe(e, e.return, B);
        }
        try {
          Zi(5, e, e.return);
        } catch (B) {
          Qe(e, e.return, B);
        }
      }
      break;
    case 1:
      nr(t, e), vr(e), o & 512 && r !== null && ei(r, r.return);
      break;
    case 5:
      if (nr(t, e), vr(e), o & 512 && r !== null && ei(r, r.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          no(a, "");
        } catch (B) {
          Qe(e, e.return, B);
        }
      }
      if (o & 4 && (a = e.stateNode, a != null)) {
        var u = e.memoizedProps, d = r !== null ? r.memoizedProps : u, h = e.type, g = e.updateQueue;
        if (e.updateQueue = null, g !== null) try {
          h === "input" && u.type === "radio" && u.name != null && Mp(a, u), As(h, d);
          var y = As(h, u);
          for (d = 0; d < g.length; d += 2) {
            var x = g[d], L = g[d + 1];
            x === "style" ? Bp(a, L) : x === "dangerouslySetInnerHTML" ? Np(a, L) : x === "children" ? no(a, L) : bu(a, x, L, y);
          }
          switch (h) {
            case "input":
              Ls(a, u);
              break;
            case "textarea":
              Ip(a, u);
              break;
            case "select":
              var C = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!u.multiple;
              var P = u.value;
              P != null ? ri(a, !!u.multiple, P, !1) : C !== !!u.multiple && (u.defaultValue != null ? ri(
                a,
                !!u.multiple,
                u.defaultValue,
                !0
              ) : ri(a, !!u.multiple, u.multiple ? [] : "", !1));
          }
          a[po] = u;
        } catch (B) {
          Qe(e, e.return, B);
        }
      }
      break;
    case 6:
      if (nr(t, e), vr(e), o & 4) {
        if (e.stateNode === null) throw Error(ee(162));
        a = e.stateNode, u = e.memoizedProps;
        try {
          a.nodeValue = u;
        } catch (B) {
          Qe(e, e.return, B);
        }
      }
      break;
    case 3:
      if (nr(t, e), vr(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
        ao(t.containerInfo);
      } catch (B) {
        Qe(e, e.return, B);
      }
      break;
    case 4:
      nr(t, e), vr(e);
      break;
    case 13:
      nr(t, e), vr(e), a = e.child, a.flags & 8192 && (u = a.memoizedState !== null, a.stateNode.isHidden = u, !u || a.alternate !== null && a.alternate.memoizedState !== null || (oc = qe())), o & 4 && ud(e);
      break;
    case 22:
      if (x = r !== null && r.memoizedState !== null, e.mode & 1 ? (ht = (y = ht) || x, nr(t, e), ht = y) : nr(t, e), vr(e), o & 8192) {
        if (y = e.memoizedState !== null, (e.stateNode.isHidden = y) && !x && e.mode & 1) for (le = e, x = e.child; x !== null; ) {
          for (L = le = x; le !== null; ) {
            switch (C = le, P = C.child, C.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Zi(4, C, C.return);
                break;
              case 1:
                ei(C, C.return);
                var $ = C.stateNode;
                if (typeof $.componentWillUnmount == "function") {
                  o = C, r = C.return;
                  try {
                    t = o, $.props = t.memoizedProps, $.state = t.memoizedState, $.componentWillUnmount();
                  } catch (B) {
                    Qe(o, r, B);
                  }
                }
                break;
              case 5:
                ei(C, C.return);
                break;
              case 22:
                if (C.memoizedState !== null) {
                  fd(L);
                  continue;
                }
            }
            P !== null ? (P.return = C, le = P) : fd(L);
          }
          x = x.sibling;
        }
        e: for (x = null, L = e; ; ) {
          if (L.tag === 5) {
            if (x === null) {
              x = L;
              try {
                a = L.stateNode, y ? (u = a.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (h = L.stateNode, g = L.memoizedProps.style, d = g != null && g.hasOwnProperty("display") ? g.display : null, h.style.display = zp("display", d));
              } catch (B) {
                Qe(e, e.return, B);
              }
            }
          } else if (L.tag === 6) {
            if (x === null) try {
              L.stateNode.nodeValue = y ? "" : L.memoizedProps;
            } catch (B) {
              Qe(e, e.return, B);
            }
          } else if ((L.tag !== 22 && L.tag !== 23 || L.memoizedState === null || L === e) && L.child !== null) {
            L.child.return = L, L = L.child;
            continue;
          }
          if (L === e) break e;
          for (; L.sibling === null; ) {
            if (L.return === null || L.return === e) break e;
            x === L && (x = null), L = L.return;
          }
          x === L && (x = null), L.sibling.return = L.return, L = L.sibling;
        }
      }
      break;
    case 19:
      nr(t, e), vr(e), o & 4 && ud(e);
      break;
    case 21:
      break;
    default:
      nr(
        t,
        e
      ), vr(e);
  }
}
function vr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (d0(r)) {
            var o = r;
            break e;
          }
          r = r.return;
        }
        throw Error(ee(160));
      }
      switch (o.tag) {
        case 5:
          var a = o.stateNode;
          o.flags & 32 && (no(a, ""), o.flags &= -33);
          var u = sd(e);
          cu(e, u, a);
          break;
        case 3:
        case 4:
          var d = o.stateNode.containerInfo, h = sd(e);
          uu(e, h, d);
          break;
        default:
          throw Error(ee(161));
      }
    } catch (g) {
      Qe(e, e.return, g);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function fk(e, t, r) {
  le = e, h0(e);
}
function h0(e, t, r) {
  for (var o = (e.mode & 1) !== 0; le !== null; ) {
    var a = le, u = a.child;
    if (a.tag === 22 && o) {
      var d = a.memoizedState !== null || al;
      if (!d) {
        var h = a.alternate, g = h !== null && h.memoizedState !== null || ht;
        h = al;
        var y = ht;
        if (al = d, (ht = g) && !y) for (le = a; le !== null; ) d = le, g = d.child, d.tag === 22 && d.memoizedState !== null ? dd(a) : g !== null ? (g.return = d, le = g) : dd(a);
        for (; u !== null; ) le = u, h0(u), u = u.sibling;
        le = a, al = h, ht = y;
      }
      cd(e);
    } else a.subtreeFlags & 8772 && u !== null ? (u.return = a, le = u) : cd(e);
  }
}
function cd(e) {
  for (; le !== null; ) {
    var t = le;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ht || sa(5, t);
            break;
          case 1:
            var o = t.stateNode;
            if (t.flags & 4 && !ht) if (r === null) o.componentDidMount();
            else {
              var a = t.elementType === t.type ? r.memoizedProps : ir(t.type, r.memoizedProps);
              o.componentDidUpdate(a, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
            }
            var u = t.updateQueue;
            u !== null && Yf(t, u, o);
            break;
          case 3:
            var d = t.updateQueue;
            if (d !== null) {
              if (r = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  r = t.child.stateNode;
                  break;
                case 1:
                  r = t.child.stateNode;
              }
              Yf(t, d, r);
            }
            break;
          case 5:
            var h = t.stateNode;
            if (r === null && t.flags & 4) {
              r = h;
              var g = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  g.autoFocus && r.focus();
                  break;
                case "img":
                  g.src && (r.src = g.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var y = t.alternate;
              if (y !== null) {
                var x = y.memoizedState;
                if (x !== null) {
                  var L = x.dehydrated;
                  L !== null && ao(L);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(ee(163));
        }
        ht || t.flags & 512 && su(t);
      } catch (C) {
        Qe(t, t.return, C);
      }
    }
    if (t === e) {
      le = null;
      break;
    }
    if (r = t.sibling, r !== null) {
      r.return = t.return, le = r;
      break;
    }
    le = t.return;
  }
}
function fd(e) {
  for (; le !== null; ) {
    var t = le;
    if (t === e) {
      le = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      r.return = t.return, le = r;
      break;
    }
    le = t.return;
  }
}
function dd(e) {
  for (; le !== null; ) {
    var t = le;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            sa(4, t);
          } catch (g) {
            Qe(t, r, g);
          }
          break;
        case 1:
          var o = t.stateNode;
          if (typeof o.componentDidMount == "function") {
            var a = t.return;
            try {
              o.componentDidMount();
            } catch (g) {
              Qe(t, a, g);
            }
          }
          var u = t.return;
          try {
            su(t);
          } catch (g) {
            Qe(t, u, g);
          }
          break;
        case 5:
          var d = t.return;
          try {
            su(t);
          } catch (g) {
            Qe(t, d, g);
          }
      }
    } catch (g) {
      Qe(t, t.return, g);
    }
    if (t === e) {
      le = null;
      break;
    }
    var h = t.sibling;
    if (h !== null) {
      h.return = t.return, le = h;
      break;
    }
    le = t.return;
  }
}
var dk = Math.ceil, Xl = Mr.ReactCurrentDispatcher, nc = Mr.ReactCurrentOwner, Qt = Mr.ReactCurrentBatchConfig, Pe = 0, ot = null, et = null, ct = 0, It = 0, ti = ln(0), nt = 0, _o = null, bn = 0, ua = 0, ic = 0, qi = null, Tt = null, oc = 0, hi = 1 / 0, Pr = null, Yl = !1, fu = null, Jr = null, sl = !1, Xr = null, Kl = 0, Ji = 0, du = null, El = -1, Cl = 0;
function kt() {
  return Pe & 6 ? qe() : El !== -1 ? El : El = qe();
}
function en(e) {
  return e.mode & 1 ? Pe & 2 && ct !== 0 ? ct & -ct : Kx.transition !== null ? (Cl === 0 && (Cl = Jp()), Cl) : (e = Fe, e !== 0 || (e = window.event, e = e === void 0 ? 16 : lv(e.type)), e) : 1;
}
function sr(e, t, r, o) {
  if (50 < Ji) throw Ji = 0, du = null, Error(ee(185));
  So(e, r, o), (!(Pe & 2) || e !== ot) && (e === ot && (!(Pe & 2) && (ua |= r), nt === 4 && Hr(e, ct)), Ft(e, o), r === 1 && Pe === 0 && !(t.mode & 1) && (hi = qe() + 500, oa && an()));
}
function Ft(e, t) {
  var r = e.callbackNode;
  K2(e, t);
  var o = Fl(e, e === ot ? ct : 0);
  if (o === 0) r !== null && xf(r), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = o & -o, e.callbackPriority !== t) {
    if (r != null && xf(r), t === 1) e.tag === 0 ? Yx(pd.bind(null, e)) : Cv(pd.bind(null, e)), Wx(function() {
      !(Pe & 6) && an();
    }), r = null;
    else {
      switch (ev(o)) {
        case 1:
          r = Ru;
          break;
        case 4:
          r = Zp;
          break;
        case 16:
          r = Rl;
          break;
        case 536870912:
          r = qp;
          break;
        default:
          r = Rl;
      }
      r = S0(r, m0.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = r;
  }
}
function m0(e, t) {
  if (El = -1, Cl = 0, Pe & 6) throw Error(ee(327));
  var r = e.callbackNode;
  if (ai() && e.callbackNode !== r) return null;
  var o = Fl(e, e === ot ? ct : 0);
  if (o === 0) return null;
  if (o & 30 || o & e.expiredLanes || t) t = Ql(e, o);
  else {
    t = o;
    var a = Pe;
    Pe |= 2;
    var u = y0();
    (ot !== e || ct !== t) && (Pr = null, hi = qe() + 500, xn(e, t));
    do
      try {
        hk();
        break;
      } catch (h) {
        g0(e, h);
      }
    while (!0);
    Wu(), Xl.current = u, Pe = a, et !== null ? t = 0 : (ot = null, ct = 0, t = nt);
  }
  if (t !== 0) {
    if (t === 2 && (a = Ns(e), a !== 0 && (o = a, t = pu(e, a))), t === 1) throw r = _o, xn(e, 0), Hr(e, o), Ft(e, qe()), r;
    if (t === 6) Hr(e, o);
    else {
      if (a = e.current.alternate, !(o & 30) && !pk(a) && (t = Ql(e, o), t === 2 && (u = Ns(e), u !== 0 && (o = u, t = pu(e, u))), t === 1)) throw r = _o, xn(e, 0), Hr(e, o), Ft(e, qe()), r;
      switch (e.finishedWork = a, e.finishedLanes = o, t) {
        case 0:
        case 1:
          throw Error(ee(345));
        case 2:
          gn(e, Tt, Pr);
          break;
        case 3:
          if (Hr(e, o), (o & 130023424) === o && (t = oc + 500 - qe(), 10 < t)) {
            if (Fl(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & o) !== o) {
              kt(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = Xs(gn.bind(null, e, Tt, Pr), t);
            break;
          }
          gn(e, Tt, Pr);
          break;
        case 4:
          if (Hr(e, o), (o & 4194240) === o) break;
          for (t = e.eventTimes, a = -1; 0 < o; ) {
            var d = 31 - ar(o);
            u = 1 << d, d = t[d], d > a && (a = d), o &= ~u;
          }
          if (o = a, o = qe() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * dk(o / 1960)) - o, 10 < o) {
            e.timeoutHandle = Xs(gn.bind(null, e, Tt, Pr), o);
            break;
          }
          gn(e, Tt, Pr);
          break;
        case 5:
          gn(e, Tt, Pr);
          break;
        default:
          throw Error(ee(329));
      }
    }
  }
  return Ft(e, qe()), e.callbackNode === r ? m0.bind(null, e) : null;
}
function pu(e, t) {
  var r = qi;
  return e.current.memoizedState.isDehydrated && (xn(e, t).flags |= 256), e = Ql(e, t), e !== 2 && (t = Tt, Tt = r, t !== null && vu(t)), e;
}
function vu(e) {
  Tt === null ? Tt = e : Tt.push.apply(Tt, e);
}
function pk(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
        var a = r[o], u = a.getSnapshot;
        a = a.value;
        try {
          if (!ur(u(), a)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Hr(e, t) {
  for (t &= ~ic, t &= ~ua, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var r = 31 - ar(t), o = 1 << r;
    e[r] = -1, t &= ~o;
  }
}
function pd(e) {
  if (Pe & 6) throw Error(ee(327));
  ai();
  var t = Fl(e, 0);
  if (!(t & 1)) return Ft(e, qe()), null;
  var r = Ql(e, t);
  if (e.tag !== 0 && r === 2) {
    var o = Ns(e);
    o !== 0 && (t = o, r = pu(e, o));
  }
  if (r === 1) throw r = _o, xn(e, 0), Hr(e, t), Ft(e, qe()), r;
  if (r === 6) throw Error(ee(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, gn(e, Tt, Pr), Ft(e, qe()), null;
}
function lc(e, t) {
  var r = Pe;
  Pe |= 1;
  try {
    return e(t);
  } finally {
    Pe = r, Pe === 0 && (hi = qe() + 500, oa && an());
  }
}
function Pn(e) {
  Xr !== null && Xr.tag === 0 && !(Pe & 6) && ai();
  var t = Pe;
  Pe |= 1;
  var r = Qt.transition, o = Fe;
  try {
    if (Qt.transition = null, Fe = 1, e) return e();
  } finally {
    Fe = o, Qt.transition = r, Pe = t, !(Pe & 6) && an();
  }
}
function ac() {
  It = ti.current, Be(ti);
}
function xn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var r = e.timeoutHandle;
  if (r !== -1 && (e.timeoutHandle = -1, Vx(r)), et !== null) for (r = et.return; r !== null; ) {
    var o = r;
    switch (Bu(o), o.tag) {
      case 1:
        o = o.type.childContextTypes, o != null && Il();
        break;
      case 3:
        pi(), Be(Dt), Be(mt), Qu();
        break;
      case 5:
        Ku(o);
        break;
      case 4:
        pi();
        break;
      case 13:
        Be(He);
        break;
      case 19:
        Be(He);
        break;
      case 10:
        Hu(o.type._context);
        break;
      case 22:
      case 23:
        ac();
    }
    r = r.return;
  }
  if (ot = e, et = e = tn(e.current, null), ct = It = t, nt = 0, _o = null, ic = ua = bn = 0, Tt = qi = null, _n !== null) {
    for (t = 0; t < _n.length; t++) if (r = _n[t], o = r.interleaved, o !== null) {
      r.interleaved = null;
      var a = o.next, u = r.pending;
      if (u !== null) {
        var d = u.next;
        u.next = a, o.next = d;
      }
      r.pending = o;
    }
    _n = null;
  }
  return e;
}
function g0(e, t) {
  do {
    var r = et;
    try {
      if (Wu(), xl.current = Gl, Hl) {
        for (var o = Ge.memoizedState; o !== null; ) {
          var a = o.queue;
          a !== null && (a.pending = null), o = o.next;
        }
        Hl = !1;
      }
      if (Cn = 0, it = rt = Ge = null, Qi = !1, mo = 0, nc.current = null, r === null || r.return === null) {
        nt = 1, _o = t, et = null;
        break;
      }
      e: {
        var u = e, d = r.return, h = r, g = t;
        if (t = ct, h.flags |= 32768, g !== null && typeof g == "object" && typeof g.then == "function") {
          var y = g, x = h, L = x.tag;
          if (!(x.mode & 1) && (L === 0 || L === 11 || L === 15)) {
            var C = x.alternate;
            C ? (x.updateQueue = C.updateQueue, x.memoizedState = C.memoizedState, x.lanes = C.lanes) : (x.updateQueue = null, x.memoizedState = null);
          }
          var P = ed(d);
          if (P !== null) {
            P.flags &= -257, td(P, d, h, u, t), P.mode & 1 && Jf(u, y, t), t = P, g = y;
            var $ = t.updateQueue;
            if ($ === null) {
              var B = /* @__PURE__ */ new Set();
              B.add(g), t.updateQueue = B;
            } else $.add(g);
            break e;
          } else {
            if (!(t & 1)) {
              Jf(u, y, t), sc();
              break e;
            }
            g = Error(ee(426));
          }
        } else if (Ve && h.mode & 1) {
          var Y = ed(d);
          if (Y !== null) {
            !(Y.flags & 65536) && (Y.flags |= 256), td(Y, d, h, u, t), Uu(vi(g, h));
            break e;
          }
        }
        u = g = vi(g, h), nt !== 4 && (nt = 2), qi === null ? qi = [u] : qi.push(u), u = d;
        do {
          switch (u.tag) {
            case 3:
              u.flags |= 65536, t &= -t, u.lanes |= t;
              var k = e0(u, g, t);
              Xf(u, k);
              break e;
            case 1:
              h = g;
              var w = u.type, S = u.stateNode;
              if (!(u.flags & 128) && (typeof w.getDerivedStateFromError == "function" || S !== null && typeof S.componentDidCatch == "function" && (Jr === null || !Jr.has(S)))) {
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var E = t0(u, h, t);
                Xf(u, E);
                break e;
              }
          }
          u = u.return;
        } while (u !== null);
      }
      w0(r);
    } catch (A) {
      t = A, et === r && r !== null && (et = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function y0() {
  var e = Xl.current;
  return Xl.current = Gl, e === null ? Gl : e;
}
function sc() {
  (nt === 0 || nt === 3 || nt === 2) && (nt = 4), ot === null || !(bn & 268435455) && !(ua & 268435455) || Hr(ot, ct);
}
function Ql(e, t) {
  var r = Pe;
  Pe |= 2;
  var o = y0();
  (ot !== e || ct !== t) && (Pr = null, xn(e, t));
  do
    try {
      vk();
      break;
    } catch (a) {
      g0(e, a);
    }
  while (!0);
  if (Wu(), Pe = r, Xl.current = o, et !== null) throw Error(ee(261));
  return ot = null, ct = 0, nt;
}
function vk() {
  for (; et !== null; ) _0(et);
}
function hk() {
  for (; et !== null && !z2(); ) _0(et);
}
function _0(e) {
  var t = k0(e.alternate, e, It);
  e.memoizedProps = e.pendingProps, t === null ? w0(e) : et = t, nc.current = null;
}
function w0(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (r = sk(r, t), r !== null) {
        r.flags &= 32767, et = r;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        nt = 6, et = null;
        return;
      }
    } else if (r = ak(r, t, It), r !== null) {
      et = r;
      return;
    }
    if (t = t.sibling, t !== null) {
      et = t;
      return;
    }
    et = t = e;
  } while (t !== null);
  nt === 0 && (nt = 5);
}
function gn(e, t, r) {
  var o = Fe, a = Qt.transition;
  try {
    Qt.transition = null, Fe = 1, mk(e, t, r, o);
  } finally {
    Qt.transition = a, Fe = o;
  }
  return null;
}
function mk(e, t, r, o) {
  do
    ai();
  while (Xr !== null);
  if (Pe & 6) throw Error(ee(327));
  r = e.finishedWork;
  var a = e.finishedLanes;
  if (r === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(ee(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var u = r.lanes | r.childLanes;
  if (Q2(e, u), e === ot && (et = ot = null, ct = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || sl || (sl = !0, S0(Rl, function() {
    return ai(), null;
  })), u = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || u) {
    u = Qt.transition, Qt.transition = null;
    var d = Fe;
    Fe = 1;
    var h = Pe;
    Pe |= 4, nc.current = null, ck(e, r), v0(r, e), Mx(Hs), $l = !!Ws, Hs = Ws = null, e.current = r, fk(r), B2(), Pe = h, Fe = d, Qt.transition = u;
  } else e.current = r;
  if (sl && (sl = !1, Xr = e, Kl = a), u = e.pendingLanes, u === 0 && (Jr = null), W2(r.stateNode), Ft(e, qe()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) a = t[r], o(a.value, { componentStack: a.stack, digest: a.digest });
  if (Yl) throw Yl = !1, e = fu, fu = null, e;
  return Kl & 1 && e.tag !== 0 && ai(), u = e.pendingLanes, u & 1 ? e === du ? Ji++ : (Ji = 0, du = e) : Ji = 0, an(), null;
}
function ai() {
  if (Xr !== null) {
    var e = ev(Kl), t = Qt.transition, r = Fe;
    try {
      if (Qt.transition = null, Fe = 16 > e ? 16 : e, Xr === null) var o = !1;
      else {
        if (e = Xr, Xr = null, Kl = 0, Pe & 6) throw Error(ee(331));
        var a = Pe;
        for (Pe |= 4, le = e.current; le !== null; ) {
          var u = le, d = u.child;
          if (le.flags & 16) {
            var h = u.deletions;
            if (h !== null) {
              for (var g = 0; g < h.length; g++) {
                var y = h[g];
                for (le = y; le !== null; ) {
                  var x = le;
                  switch (x.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Zi(8, x, u);
                  }
                  var L = x.child;
                  if (L !== null) L.return = x, le = L;
                  else for (; le !== null; ) {
                    x = le;
                    var C = x.sibling, P = x.return;
                    if (f0(x), x === y) {
                      le = null;
                      break;
                    }
                    if (C !== null) {
                      C.return = P, le = C;
                      break;
                    }
                    le = P;
                  }
                }
              }
              var $ = u.alternate;
              if ($ !== null) {
                var B = $.child;
                if (B !== null) {
                  $.child = null;
                  do {
                    var Y = B.sibling;
                    B.sibling = null, B = Y;
                  } while (B !== null);
                }
              }
              le = u;
            }
          }
          if (u.subtreeFlags & 2064 && d !== null) d.return = u, le = d;
          else e: for (; le !== null; ) {
            if (u = le, u.flags & 2048) switch (u.tag) {
              case 0:
              case 11:
              case 15:
                Zi(9, u, u.return);
            }
            var k = u.sibling;
            if (k !== null) {
              k.return = u.return, le = k;
              break e;
            }
            le = u.return;
          }
        }
        var w = e.current;
        for (le = w; le !== null; ) {
          d = le;
          var S = d.child;
          if (d.subtreeFlags & 2064 && S !== null) S.return = d, le = S;
          else e: for (d = w; le !== null; ) {
            if (h = le, h.flags & 2048) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, h);
              }
            } catch (A) {
              Qe(h, h.return, A);
            }
            if (h === d) {
              le = null;
              break e;
            }
            var E = h.sibling;
            if (E !== null) {
              E.return = h.return, le = E;
              break e;
            }
            le = h.return;
          }
        }
        if (Pe = a, an(), _r && typeof _r.onPostCommitFiberRoot == "function") try {
          _r.onPostCommitFiberRoot(ea, e);
        } catch {
        }
        o = !0;
      }
      return o;
    } finally {
      Fe = r, Qt.transition = t;
    }
  }
  return !1;
}
function vd(e, t, r) {
  t = vi(r, t), t = e0(e, t, 1), e = qr(e, t, 1), t = kt(), e !== null && (So(e, 1, t), Ft(e, t));
}
function Qe(e, t, r) {
  if (e.tag === 3) vd(e, e, r);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      vd(t, e, r);
      break;
    } else if (t.tag === 1) {
      var o = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Jr === null || !Jr.has(o))) {
        e = vi(r, e), e = t0(t, e, 1), t = qr(t, e, 1), e = kt(), t !== null && (So(t, 1, e), Ft(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function gk(e, t, r) {
  var o = e.pingCache;
  o !== null && o.delete(t), t = kt(), e.pingedLanes |= e.suspendedLanes & r, ot === e && (ct & r) === r && (nt === 4 || nt === 3 && (ct & 130023424) === ct && 500 > qe() - oc ? xn(e, 0) : ic |= r), Ft(e, t);
}
function x0(e, t) {
  t === 0 && (e.mode & 1 ? (t = qo, qo <<= 1, !(qo & 130023424) && (qo = 4194304)) : t = 1);
  var r = kt();
  e = Ar(e, t), e !== null && (So(e, t, r), Ft(e, r));
}
function yk(e) {
  var t = e.memoizedState, r = 0;
  t !== null && (r = t.retryLane), x0(e, r);
}
function _k(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var o = e.stateNode, a = e.memoizedState;
      a !== null && (r = a.retryLane);
      break;
    case 19:
      o = e.stateNode;
      break;
    default:
      throw Error(ee(314));
  }
  o !== null && o.delete(t), x0(e, r);
}
var k0;
k0 = function(e, t, r) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Dt.current) Lt = !0;
  else {
    if (!(e.lanes & r) && !(t.flags & 128)) return Lt = !1, lk(e, t, r);
    Lt = !!(e.flags & 131072);
  }
  else Lt = !1, Ve && t.flags & 1048576 && bv(t, zl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var o = t.type;
      Sl(e, t), e = t.pendingProps;
      var a = ci(t, mt.current);
      li(t, r), a = qu(null, t, o, e, a, r);
      var u = Ju();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Rt(o) ? (u = !0, jl(t)) : u = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Xu(t), a.updater = aa, t.stateNode = a, a._reactInternals = t, eu(t, o, e, r), t = nu(null, t, o, !0, u, r)) : (t.tag = 0, Ve && u && zu(t), xt(null, t, a, r), t = t.child), t;
    case 16:
      o = t.elementType;
      e: {
        switch (Sl(e, t), e = t.pendingProps, a = o._init, o = a(o._payload), t.type = o, a = t.tag = xk(o), e = ir(o, e), a) {
          case 0:
            t = ru(null, t, o, e, r);
            break e;
          case 1:
            t = id(null, t, o, e, r);
            break e;
          case 11:
            t = rd(null, t, o, e, r);
            break e;
          case 14:
            t = nd(null, t, o, ir(o.type, e), r);
            break e;
        }
        throw Error(ee(
          306,
          o,
          ""
        ));
      }
      return t;
    case 0:
      return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : ir(o, a), ru(e, t, o, a, r);
    case 1:
      return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : ir(o, a), id(e, t, o, a, r);
    case 3:
      e: {
        if (o0(t), e === null) throw Error(ee(387));
        o = t.pendingProps, u = t.memoizedState, a = u.element, Fv(e, t), Vl(t, o, null, r);
        var d = t.memoizedState;
        if (o = d.element, u.isDehydrated) if (u = { element: o, isDehydrated: !1, cache: d.cache, pendingSuspenseBoundaries: d.pendingSuspenseBoundaries, transitions: d.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
          a = vi(Error(ee(423)), t), t = od(e, t, o, r, a);
          break e;
        } else if (o !== a) {
          a = vi(Error(ee(424)), t), t = od(e, t, o, r, a);
          break e;
        } else for (jt = Zr(t.stateNode.containerInfo.firstChild), Nt = t, Ve = !0, lr = null, r = Dv(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
        else {
          if (fi(), o === a) {
            t = Or(e, t, r);
            break e;
          }
          xt(e, t, o, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return $v(t), e === null && Zs(t), o = t.type, a = t.pendingProps, u = e !== null ? e.memoizedProps : null, d = a.children, Gs(o, a) ? d = null : u !== null && Gs(o, u) && (t.flags |= 32), i0(e, t), xt(e, t, d, r), t.child;
    case 6:
      return e === null && Zs(t), null;
    case 13:
      return l0(e, t, r);
    case 4:
      return Yu(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = di(t, null, o, r) : xt(e, t, o, r), t.child;
    case 11:
      return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : ir(o, a), rd(e, t, o, a, r);
    case 7:
      return xt(e, t, t.pendingProps, r), t.child;
    case 8:
      return xt(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return xt(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (o = t.type._context, a = t.pendingProps, u = t.memoizedProps, d = a.value, je(Bl, o._currentValue), o._currentValue = d, u !== null) if (ur(u.value, d)) {
          if (u.children === a.children && !Dt.current) {
            t = Or(e, t, r);
            break e;
          }
        } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
          var h = u.dependencies;
          if (h !== null) {
            d = u.child;
            for (var g = h.firstContext; g !== null; ) {
              if (g.context === o) {
                if (u.tag === 1) {
                  g = Rr(-1, r & -r), g.tag = 2;
                  var y = u.updateQueue;
                  if (y !== null) {
                    y = y.shared;
                    var x = y.pending;
                    x === null ? g.next = g : (g.next = x.next, x.next = g), y.pending = g;
                  }
                }
                u.lanes |= r, g = u.alternate, g !== null && (g.lanes |= r), qs(
                  u.return,
                  r,
                  t
                ), h.lanes |= r;
                break;
              }
              g = g.next;
            }
          } else if (u.tag === 10) d = u.type === t.type ? null : u.child;
          else if (u.tag === 18) {
            if (d = u.return, d === null) throw Error(ee(341));
            d.lanes |= r, h = d.alternate, h !== null && (h.lanes |= r), qs(d, r, t), d = u.sibling;
          } else d = u.child;
          if (d !== null) d.return = u;
          else for (d = u; d !== null; ) {
            if (d === t) {
              d = null;
              break;
            }
            if (u = d.sibling, u !== null) {
              u.return = d.return, d = u;
              break;
            }
            d = d.return;
          }
          u = d;
        }
        xt(e, t, a.children, r), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, o = t.pendingProps.children, li(t, r), a = Zt(a), o = o(a), t.flags |= 1, xt(e, t, o, r), t.child;
    case 14:
      return o = t.type, a = ir(o, t.pendingProps), a = ir(o.type, a), nd(e, t, o, a, r);
    case 15:
      return r0(e, t, t.type, t.pendingProps, r);
    case 17:
      return o = t.type, a = t.pendingProps, a = t.elementType === o ? a : ir(o, a), Sl(e, t), t.tag = 1, Rt(o) ? (e = !0, jl(t)) : e = !1, li(t, r), Jv(t, o, a), eu(t, o, a, r), nu(null, t, o, !0, e, r);
    case 19:
      return a0(e, t, r);
    case 22:
      return n0(e, t, r);
  }
  throw Error(ee(156, t.tag));
};
function S0(e, t) {
  return Qp(e, t);
}
function wk(e, t, r, o) {
  this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Kt(e, t, r, o) {
  return new wk(e, t, r, o);
}
function uc(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function xk(e) {
  if (typeof e == "function") return uc(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Tu) return 11;
    if (e === Lu) return 14;
  }
  return 2;
}
function tn(e, t) {
  var r = e.alternate;
  return r === null ? (r = Kt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
}
function bl(e, t, r, o, a, u) {
  var d = 2;
  if (o = e, typeof e == "function") uc(e) && (d = 1);
  else if (typeof e == "string") d = 5;
  else e: switch (e) {
    case Hn:
      return kn(r.children, a, u, t);
    case Pu:
      d = 8, a |= 8;
      break;
    case Es:
      return e = Kt(12, r, t, a | 2), e.elementType = Es, e.lanes = u, e;
    case Cs:
      return e = Kt(13, r, t, a), e.elementType = Cs, e.lanes = u, e;
    case bs:
      return e = Kt(19, r, t, a), e.elementType = bs, e.lanes = u, e;
    case $p:
      return ca(r, a, u, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Rp:
          d = 10;
          break e;
        case Fp:
          d = 9;
          break e;
        case Tu:
          d = 11;
          break e;
        case Lu:
          d = 14;
          break e;
        case Ur:
          d = 16, o = null;
          break e;
      }
      throw Error(ee(130, e == null ? e : typeof e, ""));
  }
  return t = Kt(d, r, t, a), t.elementType = e, t.type = o, t.lanes = u, t;
}
function kn(e, t, r, o) {
  return e = Kt(7, e, o, t), e.lanes = r, e;
}
function ca(e, t, r, o) {
  return e = Kt(22, e, o, t), e.elementType = $p, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
}
function ss(e, t, r) {
  return e = Kt(6, e, null, t), e.lanes = r, e;
}
function us(e, t, r) {
  return t = Kt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function kk(e, t, r, o, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Va(0), this.expirationTimes = Va(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Va(0), this.identifierPrefix = o, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function cc(e, t, r, o, a, u, d, h, g) {
  return e = new kk(e, t, r, h, g), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = Kt(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xu(u), e;
}
function Sk(e, t, r) {
  var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wn, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
}
function E0(e) {
  if (!e) return nn;
  e = e._reactInternals;
  e: {
    if (Dn(e) !== e || e.tag !== 1) throw Error(ee(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Rt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(ee(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Rt(r)) return Ev(e, r, t);
  }
  return t;
}
function C0(e, t, r, o, a, u, d, h, g) {
  return e = cc(r, o, !0, e, a, u, d, h, g), e.context = E0(null), r = e.current, o = kt(), a = en(r), u = Rr(o, a), u.callback = t ?? null, qr(r, u, a), e.current.lanes = a, So(e, a, o), Ft(e, o), e;
}
function fa(e, t, r, o) {
  var a = t.current, u = kt(), d = en(a);
  return r = E0(r), t.context === null ? t.context = r : t.pendingContext = r, t = Rr(u, d), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = qr(a, t, d), e !== null && (sr(e, a, d, u), wl(e, a, d)), d;
}
function Zl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function hd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function fc(e, t) {
  hd(e, t), (e = e.alternate) && hd(e, t);
}
function Ek() {
  return null;
}
var b0 = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function dc(e) {
  this._internalRoot = e;
}
da.prototype.render = dc.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ee(409));
  fa(e, t, null, null);
};
da.prototype.unmount = dc.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Pn(function() {
      fa(null, e, null, null);
    }), t[$r] = null;
  }
};
function da(e) {
  this._internalRoot = e;
}
da.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = nv();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < Wr.length && t !== 0 && t < Wr[r].priority; r++) ;
    Wr.splice(r, 0, e), r === 0 && ov(e);
  }
};
function pc(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function pa(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function md() {
}
function Ck(e, t, r, o, a) {
  if (a) {
    if (typeof o == "function") {
      var u = o;
      o = function() {
        var y = Zl(d);
        u.call(y);
      };
    }
    var d = C0(t, o, e, 0, null, !1, !1, "", md);
    return e._reactRootContainer = d, e[$r] = d.current, co(e.nodeType === 8 ? e.parentNode : e), Pn(), d;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof o == "function") {
    var h = o;
    o = function() {
      var y = Zl(g);
      h.call(y);
    };
  }
  var g = cc(e, 0, !1, null, null, !1, !1, "", md);
  return e._reactRootContainer = g, e[$r] = g.current, co(e.nodeType === 8 ? e.parentNode : e), Pn(function() {
    fa(t, g, r, o);
  }), g;
}
function va(e, t, r, o, a) {
  var u = r._reactRootContainer;
  if (u) {
    var d = u;
    if (typeof a == "function") {
      var h = a;
      a = function() {
        var g = Zl(d);
        h.call(g);
      };
    }
    fa(t, d, e, a);
  } else d = Ck(r, t, e, a, o);
  return Zl(d);
}
tv = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = Vi(t.pendingLanes);
        r !== 0 && (Fu(t, r | 1), Ft(t, qe()), !(Pe & 6) && (hi = qe() + 500, an()));
      }
      break;
    case 13:
      Pn(function() {
        var o = Ar(e, 1);
        if (o !== null) {
          var a = kt();
          sr(o, e, 1, a);
        }
      }), fc(e, 1);
  }
};
$u = function(e) {
  if (e.tag === 13) {
    var t = Ar(e, 134217728);
    if (t !== null) {
      var r = kt();
      sr(t, e, 134217728, r);
    }
    fc(e, 134217728);
  }
};
rv = function(e) {
  if (e.tag === 13) {
    var t = en(e), r = Ar(e, t);
    if (r !== null) {
      var o = kt();
      sr(r, e, t, o);
    }
    fc(e, t);
  }
};
nv = function() {
  return Fe;
};
iv = function(e, t) {
  var r = Fe;
  try {
    return Fe = e, t();
  } finally {
    Fe = r;
  }
};
Ms = function(e, t, r) {
  switch (t) {
    case "input":
      if (Ls(e, r), t = r.name, r.type === "radio" && t != null) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== e && o.form === e.form) {
            var a = ia(o);
            if (!a) throw Error(ee(90));
            Op(o), Ls(o, a);
          }
        }
      }
      break;
    case "textarea":
      Ip(e, r);
      break;
    case "select":
      t = r.value, t != null && ri(e, !!r.multiple, t, !1);
  }
};
Wp = lc;
Hp = Pn;
var bk = { usingClientEntryPoint: !1, Events: [Co, Kn, ia, Up, Vp, lc] }, zi = { findFiberByHostInstance: yn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Pk = { bundleType: zi.bundleType, version: zi.version, rendererPackageName: zi.rendererPackageName, rendererConfig: zi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Mr.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Yp(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: zi.findFiberByHostInstance || Ek, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ul = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ul.isDisabled && ul.supportsFiber) try {
    ea = ul.inject(Pk), _r = ul;
  } catch {
  }
}
Bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bk;
Bt.createPortal = function(e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!pc(t)) throw Error(ee(200));
  return Sk(e, t, null, r);
};
Bt.createRoot = function(e, t) {
  if (!pc(e)) throw Error(ee(299));
  var r = !1, o = "", a = b0;
  return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = cc(e, 1, !1, null, null, r, !1, o, a), e[$r] = t.current, co(e.nodeType === 8 ? e.parentNode : e), new dc(t);
};
Bt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ee(188)) : (e = Object.keys(e).join(","), Error(ee(268, e)));
  return e = Yp(t), e = e === null ? null : e.stateNode, e;
};
Bt.flushSync = function(e) {
  return Pn(e);
};
Bt.hydrate = function(e, t, r) {
  if (!pa(t)) throw Error(ee(200));
  return va(null, e, t, !0, r);
};
Bt.hydrateRoot = function(e, t, r) {
  if (!pc(e)) throw Error(ee(405));
  var o = r != null && r.hydratedSources || null, a = !1, u = "", d = b0;
  if (r != null && (r.unstable_strictMode === !0 && (a = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (d = r.onRecoverableError)), t = C0(t, null, e, 1, r ?? null, a, !1, u, d), e[$r] = t.current, co(e), o) for (e = 0; e < o.length; e++) r = o[e], a = r._getVersion, a = a(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, a] : t.mutableSourceEagerHydrationData.push(
    r,
    a
  );
  return new da(t);
};
Bt.render = function(e, t, r) {
  if (!pa(t)) throw Error(ee(200));
  return va(null, e, t, !1, r);
};
Bt.unmountComponentAtNode = function(e) {
  if (!pa(e)) throw Error(ee(40));
  return e._reactRootContainer ? (Pn(function() {
    va(null, null, e, !1, function() {
      e._reactRootContainer = null, e[$r] = null;
    });
  }), !0) : !1;
};
Bt.unstable_batchedUpdates = lc;
Bt.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
  if (!pa(r)) throw Error(ee(200));
  if (e == null || e._reactInternals === void 0) throw Error(ee(38));
  return va(e, t, r, !1, o);
};
Bt.version = "18.3.1-next-f1338f8080-20240426";
function P0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(P0);
    } catch (e) {
      console.error(e);
    }
}
P0(), Pp.exports = Bt;
var eo = Pp.exports, T0, gd = eo;
T0 = gd.createRoot, gd.hydrateRoot;
async function Tk(e = {}) {
  var of, lf, af;
  var t, r = e, o = !!globalThis.window, a = !!globalThis.WorkerGlobalScope, u = ((lf = (of = globalThis.process) == null ? void 0 : of.versions) == null ? void 0 : lf.node) && ((af = globalThis.process) == null ? void 0 : af.type) != "renderer";
  if (u) {
    const { createRequire: n } = await Promise.resolve().then(() => Tb);
    var d = n(import.meta.url);
  }
  var h = "./this.program", g = (n, i) => {
    throw i;
  }, y = import.meta.url, x = "";
  function L(n) {
    return r.locateFile ? r.locateFile(n, x) : x + n;
  }
  var C, P;
  if (u) {
    var $ = d("node:fs");
    y.startsWith("file:") && (x = d("node:path").dirname(d("node:url").fileURLToPath(y)) + "/"), P = (n) => {
      n = E(n) ? new URL(n) : n;
      var i = $.readFileSync(n);
      return i;
    }, C = async (n, i = !0) => {
      n = E(n) ? new URL(n) : n;
      var l = $.readFileSync(n, i ? void 0 : "utf8");
      return l;
    }, process.argv.length > 1 && (h = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), g = (n, i) => {
      throw process.exitCode = n, i;
    };
  } else if (o || a) {
    try {
      x = new URL(".", y).href;
    } catch {
    }
    a && (P = (n) => {
      var i = new XMLHttpRequest();
      return i.open("GET", n, !1), i.responseType = "arraybuffer", i.send(null), new Uint8Array(i.response);
    }), C = async (n) => {
      if (E(n))
        return new Promise((l, s) => {
          var c = new XMLHttpRequest();
          c.open("GET", n, !0), c.responseType = "arraybuffer", c.onload = () => {
            if (c.status == 200 || c.status == 0 && c.response) {
              l(c.response);
              return;
            }
            s(c.status);
          }, c.onerror = s, c.send(null);
        });
      var i = await fetch(n, { credentials: "same-origin" });
      if (i.ok)
        return i.arrayBuffer();
      throw new Error(i.status + " : " + i.url);
    };
  }
  var B = console.log.bind(console), Y = console.error.bind(console), k, w = !1, S, E = (n) => n.startsWith("file://"), A, N, F, W, K, Z, T, re, pe, Ct, Ee, Vt, Ye = !1;
  function ie() {
    var n = Go.buffer;
    F = new Int8Array(n), K = new Int16Array(n), r.HEAPU8 = W = new Uint8Array(n), Z = new Uint16Array(n), T = new Int32Array(n), re = new Uint32Array(n), pe = new Float32Array(n), Ct = new Float64Array(n), Ee = new BigInt64Array(n), Vt = new BigUint64Array(n);
  }
  function fe() {
    if (r.preRun)
      for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; )
        $n(r.preRun.shift());
    We(yt);
  }
  function me() {
    Ye = !0, !r.noFSInit && !p.initialized && p.init(), ae.root = p.mount(ae, {}, null), pn.Uc(), p.ignorePermissions = !1;
  }
  function $e() {
    if (r.postRun)
      for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; )
        At(r.postRun.shift());
    We(Wt);
  }
  function ye(n) {
    var l;
    (l = r.onAbort) == null || l.call(r, n), n = "Aborted(" + n + ")", Y(n), w = !0, n += ". Build with -sASSERTIONS for more info.", Ye && Kc();
    var i = new WebAssembly.RuntimeError(n);
    throw N == null || N(i), i;
  }
  var $t;
  function dt() {
    return r.locateFile ? L("ImFusionLib.wasm") : new URL("ImFusionLib.wasm".concat(""), import.meta.url).href;
  }
  function cr(n) {
    if (n == $t && k)
      return new Uint8Array(k);
    if (P)
      return P(n);
    throw "both async and sync fetching of the wasm failed";
  }
  async function gt(n) {
    if (!k)
      try {
        var i = await C(n);
        return new Uint8Array(i);
      } catch {
      }
    return cr(n);
  }
  async function er(n, i) {
    try {
      var l = await gt(n), s = await WebAssembly.instantiate(l, i);
      return s;
    } catch (c) {
      Y(`failed to asynchronously prepare wasm: ${c}`), ye(c);
    }
  }
  async function oe(n, i, l) {
    if (!n && !E(i) && !u)
      try {
        var s = fetch(i, { credentials: "same-origin" }), c = await WebAssembly.instantiateStreaming(s, l);
        return c;
      } catch (f) {
        Y(`wasm streaming compile failed: ${f}`), Y("falling back to ArrayBuffer instantiation");
      }
    return er(i, l);
  }
  function Te() {
    var n = { a: Jw };
    return n;
  }
  async function be() {
    function n(f, v) {
      return pn = f.exports, pn = e2(pn), qw(pn), ie(), pn;
    }
    function i(f) {
      return n(f.instance);
    }
    var l = Te();
    if (r.instantiateWasm)
      return new Promise((f, v) => {
        r.instantiateWasm(l, (m, _) => {
          f(n(m));
        });
      });
    $t ?? ($t = dt());
    var s = await oe(k, $t, l), c = i(s);
    return c;
  }
  class Le {
    constructor(i) {
      Ie(this, "name", "ExitStatus");
      this.message = `Program terminated with exit(${i})`, this.status = i;
    }
  }
  var We = (n) => {
    for (; n.length > 0; )
      n.shift()(r);
  }, Wt = [], At = (n) => Wt.push(n), yt = [], $n = (n) => yt.push(n), lt = !0, _e = { isAbs: (n) => n.charAt(0) === "/", splitPath: (n) => {
    var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return i.exec(n).slice(1);
  }, normalizeArray: (n, i) => {
    for (var l = 0, s = n.length - 1; s >= 0; s--) {
      var c = n[s];
      c === "." ? n.splice(s, 1) : c === ".." ? (n.splice(s, 1), l++) : l && (n.splice(s, 1), l--);
    }
    if (i)
      for (; l; l--)
        n.unshift("..");
    return n;
  }, normalize: (n) => {
    var i = _e.isAbs(n), l = n.slice(-1) === "/";
    return n = _e.normalizeArray(n.split("/").filter((s) => !!s), !i).join("/"), !n && !i && (n = "."), n && l && (n += "/"), (i ? "/" : "") + n;
  }, dirname: (n) => {
    var i = _e.splitPath(n), l = i[0], s = i[1];
    return !l && !s ? "." : (s && (s = s.slice(0, -1)), l + s);
  }, basename: (n) => n && n.match(/([^\/]+|\/)\/*$/)[1], join: (...n) => _e.normalize(n.join("/")), join2: (n, i) => _e.normalize(n + "/" + i) }, tr = () => {
    if (u) {
      var n = d("node:crypto");
      return (i) => n.randomFillSync(i);
    }
    return (i) => crypto.getRandomValues(i);
  }, Ot = (n) => {
    (Ot = tr())(n);
  }, xr = { resolve: (...n) => {
    for (var i = "", l = !1, s = n.length - 1; s >= -1 && !l; s--) {
      var c = s >= 0 ? n[s] : p.cwd();
      if (typeof c != "string")
        throw new TypeError("Arguments to path.resolve must be strings");
      if (!c)
        return "";
      i = c + "/" + i, l = _e.isAbs(c);
    }
    return i = _e.normalizeArray(i.split("/").filter((f) => !!f), !l).join("/"), (l ? "/" : "") + i || ".";
  }, relative: (n, i) => {
    n = xr.resolve(n).slice(1), i = xr.resolve(i).slice(1);
    function l(b) {
      for (var R = 0; R < b.length && b[R] === ""; R++)
        ;
      for (var V = b.length - 1; V >= 0 && b[V] === ""; V--)
        ;
      return R > V ? [] : b.slice(R, V - R + 1);
    }
    for (var s = l(n.split("/")), c = l(i.split("/")), f = Math.min(s.length, c.length), v = f, m = 0; m < f; m++)
      if (s[m] !== c[m]) {
        v = m;
        break;
      }
    for (var _ = [], m = v; m < s.length; m++)
      _.push("..");
    return _ = _.concat(c.slice(v)), _.join("/");
  } }, Ir = globalThis.TextDecoder && new TextDecoder(), kr = (n, i, l, s) => {
    var c = i + l;
    if (s) return c;
    for (; n[i] && !(i >= c); ) ++i;
    return i;
  }, rr = (n, i = 0, l, s) => {
    i >>>= 0;
    var c = kr(n, i, l, s);
    if (c - i > 16 && n.buffer && Ir)
      return Ir.decode(n.subarray(i, c));
    for (var f = ""; i < c; ) {
      var v = n[i++];
      if (!(v & 128)) {
        f += String.fromCharCode(v);
        continue;
      }
      var m = n[i++] & 63;
      if ((v & 224) == 192) {
        f += String.fromCharCode((v & 31) << 6 | m);
        continue;
      }
      var _ = n[i++] & 63;
      if ((v & 240) == 224 ? v = (v & 15) << 12 | m << 6 | _ : v = (v & 7) << 18 | m << 12 | _ << 6 | n[i++] & 63, v < 65536)
        f += String.fromCharCode(v);
      else {
        var b = v - 65536;
        f += String.fromCharCode(55296 | b >> 10, 56320 | b & 1023);
      }
    }
    return f;
  }, Sr = [], Mt = (n) => {
    for (var i = 0, l = 0; l < n.length; ++l) {
      var s = n.charCodeAt(l);
      s <= 127 ? i++ : s <= 2047 ? i += 2 : s >= 55296 && s <= 57343 ? (i += 4, ++l) : i += 3;
    }
    return i;
  }, wi = (n, i, l, s) => {
    if (l >>>= 0, !(s > 0)) return 0;
    for (var c = l, f = l + s - 1, v = 0; v < n.length; ++v) {
      var m = n.codePointAt(v);
      if (m <= 127) {
        if (l >= f) break;
        i[l++ >>> 0] = m;
      } else if (m <= 2047) {
        if (l + 1 >= f) break;
        i[l++ >>> 0] = 192 | m >> 6, i[l++ >>> 0] = 128 | m & 63;
      } else if (m <= 65535) {
        if (l + 2 >= f) break;
        i[l++ >>> 0] = 224 | m >> 12, i[l++ >>> 0] = 128 | m >> 6 & 63, i[l++ >>> 0] = 128 | m & 63;
      } else {
        if (l + 3 >= f) break;
        i[l++ >>> 0] = 240 | m >> 18, i[l++ >>> 0] = 128 | m >> 12 & 63, i[l++ >>> 0] = 128 | m >> 6 & 63, i[l++ >>> 0] = 128 | m & 63, v++;
      }
    }
    return i[l >>> 0] = 0, l - c;
  }, An = (n, i, l) => {
    var s = Mt(n) + 1, c = new Array(s), f = wi(n, c, 0, c.length);
    return c.length = f, c;
  }, Po = () => {
    var f;
    if (!Sr.length) {
      var n = null;
      if (u) {
        var i = 256, l = Buffer.alloc(i), s = 0, c = process.stdin.fd;
        try {
          s = $.readSync(c, l, 0, i);
        } catch (v) {
          if (v.toString().includes("EOF")) s = 0;
          else throw v;
        }
        s > 0 && (n = l.slice(0, s).toString("utf-8"));
      } else (f = globalThis.window) != null && f.prompt && (n = window.prompt("Input: "), n !== null && (n += `
`));
      if (!n)
        return null;
      Sr = An(n);
    }
    return Sr.shift();
  }, fr = { ttys: [], init() {
  }, shutdown() {
  }, register(n, i) {
    fr.ttys[n] = { input: [], output: [], ops: i }, p.registerDevice(n, fr.stream_ops);
  }, stream_ops: { open(n) {
    var i = fr.ttys[n.node.rdev];
    if (!i)
      throw new p.ErrnoError(43);
    n.tty = i, n.seekable = !1;
  }, close(n) {
    n.tty.ops.fsync(n.tty);
  }, fsync(n) {
    n.tty.ops.fsync(n.tty);
  }, read(n, i, l, s, c) {
    if (!n.tty || !n.tty.ops.get_char)
      throw new p.ErrnoError(60);
    for (var f = 0, v = 0; v < s; v++) {
      var m;
      try {
        m = n.tty.ops.get_char(n.tty);
      } catch {
        throw new p.ErrnoError(29);
      }
      if (m === void 0 && f === 0)
        throw new p.ErrnoError(6);
      if (m == null) break;
      f++, i[l + v] = m;
    }
    return f && (n.node.atime = Date.now()), f;
  }, write(n, i, l, s, c) {
    if (!n.tty || !n.tty.ops.put_char)
      throw new p.ErrnoError(60);
    try {
      for (var f = 0; f < s; f++)
        n.tty.ops.put_char(n.tty, i[l + f]);
    } catch {
      throw new p.ErrnoError(29);
    }
    return s && (n.node.mtime = n.node.ctime = Date.now()), f;
  } }, default_tty_ops: { get_char(n) {
    return Po();
  }, put_char(n, i) {
    i === null || i === 10 ? (B(rr(n.output)), n.output = []) : i != 0 && n.output.push(i);
  }, fsync(n) {
    var i;
    ((i = n.output) == null ? void 0 : i.length) > 0 && (B(rr(n.output)), n.output = []);
  }, ioctl_tcgets(n) {
    return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
  }, ioctl_tcsets(n, i, l) {
    return 0;
  }, ioctl_tiocgwinsz(n) {
    return [24, 80];
  } }, default_tty1_ops: { put_char(n, i) {
    i === null || i === 10 ? (Y(rr(n.output)), n.output = []) : i != 0 && n.output.push(i);
  }, fsync(n) {
    var i;
    ((i = n.output) == null ? void 0 : i.length) > 0 && (Y(rr(n.output)), n.output = []);
  } } }, xi = (n, i) => W.fill(0, n, n + i), To = (n, i) => Math.ceil(n / i) * i, Lo = (n) => {
    n = To(n, 65536);
    var i = Yc(65536, n);
    return i && xi(i, n), i;
  }, he = { ops_table: null, mount(n) {
    return he.createNode(null, "/", 16895, 0);
  }, createNode(n, i, l, s) {
    if (p.isBlkdev(l) || p.isFIFO(l))
      throw new p.ErrnoError(63);
    he.ops_table || (he.ops_table = { dir: { node: { getattr: he.node_ops.getattr, setattr: he.node_ops.setattr, lookup: he.node_ops.lookup, mknod: he.node_ops.mknod, rename: he.node_ops.rename, unlink: he.node_ops.unlink, rmdir: he.node_ops.rmdir, readdir: he.node_ops.readdir, symlink: he.node_ops.symlink }, stream: { llseek: he.stream_ops.llseek } }, file: { node: { getattr: he.node_ops.getattr, setattr: he.node_ops.setattr }, stream: { llseek: he.stream_ops.llseek, read: he.stream_ops.read, write: he.stream_ops.write, mmap: he.stream_ops.mmap, msync: he.stream_ops.msync } }, link: { node: { getattr: he.node_ops.getattr, setattr: he.node_ops.setattr, readlink: he.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: he.node_ops.getattr, setattr: he.node_ops.setattr }, stream: p.chrdev_stream_ops } });
    var c = p.createNode(n, i, l, s);
    return p.isDir(c.mode) ? (c.node_ops = he.ops_table.dir.node, c.stream_ops = he.ops_table.dir.stream, c.contents = {}) : p.isFile(c.mode) ? (c.node_ops = he.ops_table.file.node, c.stream_ops = he.ops_table.file.stream, c.usedBytes = 0, c.contents = null) : p.isLink(c.mode) ? (c.node_ops = he.ops_table.link.node, c.stream_ops = he.ops_table.link.stream) : p.isChrdev(c.mode) && (c.node_ops = he.ops_table.chrdev.node, c.stream_ops = he.ops_table.chrdev.stream), c.atime = c.mtime = c.ctime = Date.now(), n && (n.contents[i] = c, n.atime = n.mtime = n.ctime = c.atime), c;
  }, getFileDataAsTypedArray(n) {
    return n.contents ? n.contents.subarray ? n.contents.subarray(0, n.usedBytes) : new Uint8Array(n.contents) : new Uint8Array(0);
  }, expandFileStorage(n, i) {
    var l = n.contents ? n.contents.length : 0;
    if (!(l >= i)) {
      var s = 1024 * 1024;
      i = Math.max(i, l * (l < s ? 2 : 1.125) >>> 0), l != 0 && (i = Math.max(i, 256));
      var c = n.contents;
      n.contents = new Uint8Array(i), n.usedBytes > 0 && n.contents.set(c.subarray(0, n.usedBytes), 0);
    }
  }, resizeFileStorage(n, i) {
    if (n.usedBytes != i)
      if (i == 0)
        n.contents = null, n.usedBytes = 0;
      else {
        var l = n.contents;
        n.contents = new Uint8Array(i), l && n.contents.set(l.subarray(0, Math.min(i, n.usedBytes))), n.usedBytes = i;
      }
  }, node_ops: { getattr(n) {
    var i = {};
    return i.dev = p.isChrdev(n.mode) ? n.id : 1, i.ino = n.id, i.mode = n.mode, i.nlink = 1, i.uid = 0, i.gid = 0, i.rdev = n.rdev, p.isDir(n.mode) ? i.size = 4096 : p.isFile(n.mode) ? i.size = n.usedBytes : p.isLink(n.mode) ? i.size = n.link.length : i.size = 0, i.atime = new Date(n.atime), i.mtime = new Date(n.mtime), i.ctime = new Date(n.ctime), i.blksize = 4096, i.blocks = Math.ceil(i.size / i.blksize), i;
  }, setattr(n, i) {
    for (const l of ["mode", "atime", "mtime", "ctime"])
      i[l] != null && (n[l] = i[l]);
    i.size !== void 0 && he.resizeFileStorage(n, i.size);
  }, lookup(n, i) {
    throw he.doesNotExistError || (he.doesNotExistError = new p.ErrnoError(44), he.doesNotExistError.stack = "<generic error, no stack>"), he.doesNotExistError;
  }, mknod(n, i, l, s) {
    return he.createNode(n, i, l, s);
  }, rename(n, i, l) {
    var s;
    try {
      s = p.lookupNode(i, l);
    } catch {
    }
    if (s) {
      if (p.isDir(n.mode))
        for (var c in s.contents)
          throw new p.ErrnoError(55);
      p.hashRemoveNode(s);
    }
    delete n.parent.contents[n.name], i.contents[l] = n, n.name = l, i.ctime = i.mtime = n.parent.ctime = n.parent.mtime = Date.now();
  }, unlink(n, i) {
    delete n.contents[i], n.ctime = n.mtime = Date.now();
  }, rmdir(n, i) {
    var l = p.lookupNode(n, i);
    for (var s in l.contents)
      throw new p.ErrnoError(55);
    delete n.contents[i], n.ctime = n.mtime = Date.now();
  }, readdir(n) {
    return [".", "..", ...Object.keys(n.contents)];
  }, symlink(n, i, l) {
    var s = he.createNode(n, i, 41471, 0);
    return s.link = l, s;
  }, readlink(n) {
    if (!p.isLink(n.mode))
      throw new p.ErrnoError(28);
    return n.link;
  } }, stream_ops: { read(n, i, l, s, c) {
    var f = n.node.contents;
    if (c >= n.node.usedBytes) return 0;
    var v = Math.min(n.node.usedBytes - c, s);
    if (v > 8 && f.subarray)
      i.set(f.subarray(c, c + v), l);
    else
      for (var m = 0; m < v; m++) i[l + m] = f[c + m];
    return v;
  }, write(n, i, l, s, c, f) {
    if (i.buffer === F.buffer && (f = !1), !s) return 0;
    var v = n.node;
    if (v.mtime = v.ctime = Date.now(), i.subarray && (!v.contents || v.contents.subarray)) {
      if (f)
        return v.contents = i.subarray(l, l + s), v.usedBytes = s, s;
      if (v.usedBytes === 0 && c === 0)
        return v.contents = i.slice(l, l + s), v.usedBytes = s, s;
      if (c + s <= v.usedBytes)
        return v.contents.set(i.subarray(l, l + s), c), s;
    }
    if (he.expandFileStorage(v, c + s), v.contents.subarray && i.subarray)
      v.contents.set(i.subarray(l, l + s), c);
    else
      for (var m = 0; m < s; m++)
        v.contents[c + m] = i[l + m];
    return v.usedBytes = Math.max(v.usedBytes, c + s), s;
  }, llseek(n, i, l) {
    var s = i;
    if (l === 1 ? s += n.position : l === 2 && p.isFile(n.node.mode) && (s += n.node.usedBytes), s < 0)
      throw new p.ErrnoError(28);
    return s;
  }, mmap(n, i, l, s, c) {
    if (!p.isFile(n.node.mode))
      throw new p.ErrnoError(43);
    var f, v, m = n.node.contents;
    if (!(c & 2) && m && m.buffer === F.buffer)
      v = !1, f = m.byteOffset;
    else {
      if (v = !0, f = Lo(i), !f)
        throw new p.ErrnoError(48);
      m && ((l > 0 || l + i < m.length) && (m.subarray ? m = m.subarray(l, l + i) : m = Array.prototype.slice.call(m, l, l + i)), F.set(m, f >>> 0));
    }
    return { ptr: f, allocated: v };
  }, msync(n, i, l, s, c) {
    return he.stream_ops.write(n, i, 0, s, l, !1), 0;
  } } }, ga = (n) => {
    var i = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, l = i[n];
    if (typeof l > "u")
      throw new Error(`Unknown file open mode: ${n}`);
    return l;
  }, ki = (n, i) => {
    var l = 0;
    return n && (l |= 365), i && (l |= 146), l;
  }, ya = async (n) => {
    var i = await C(n);
    return new Uint8Array(i);
  }, Si = (...n) => p.createDataFile(...n), dr = 0, jr = null, Do = (n) => {
    var l;
    if (dr--, (l = r.monitorRunDependencies) == null || l.call(r, dr), dr == 0 && jr) {
      var i = jr;
      jr = null, i();
    }
  }, O = (n) => {
    var i;
    dr++, (i = r.monitorRunDependencies) == null || i.call(r, dr);
  }, I = [], Q = async (n, i) => {
    typeof te < "u" && te.init();
    for (var l of I)
      if (l.canHandle(i))
        return l.handle(n, i);
    return n;
  }, z = async (n, i, l, s, c, f, v, m) => {
    var _ = i ? xr.resolve(_e.join2(n, i)) : n;
    O();
    try {
      var b = l;
      typeof l == "string" && (b = await ya(l)), b = await Q(b, _), m == null || m(), f || Si(n, i, b, s, c, v);
    } finally {
      Do();
    }
  }, J = (n, i, l, s, c, f, v, m, _, b) => {
    z(n, i, l, s, c, m, _, b).then(f).catch(v);
  }, p = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: !1, ignorePermissions: !0, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
    constructor(n) {
      Ie(this, "name", "ErrnoError");
      this.errno = n;
    }
  }, FSStream: class {
    constructor() {
      Ie(this, "shared", {});
    }
    get object() {
      return this.node;
    }
    set object(n) {
      this.node = n;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return this.flags & 1024;
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(n) {
      this.shared.flags = n;
    }
    get position() {
      return this.shared.position;
    }
    set position(n) {
      this.shared.position = n;
    }
  }, FSNode: class {
    constructor(n, i, l, s) {
      Ie(this, "node_ops", {});
      Ie(this, "stream_ops", {});
      Ie(this, "readMode", 365);
      Ie(this, "writeMode", 146);
      Ie(this, "mounted", null);
      n || (n = this), this.parent = n, this.mount = n.mount, this.id = p.nextInode++, this.name = i, this.mode = l, this.rdev = s, this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(n) {
      n ? this.mode |= this.readMode : this.mode &= ~this.readMode;
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(n) {
      n ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
    }
    get isFolder() {
      return p.isDir(this.mode);
    }
    get isDevice() {
      return p.isChrdev(this.mode);
    }
  }, lookupPath(n, i = {}) {
    if (!n)
      throw new p.ErrnoError(44);
    i.follow_mount ?? (i.follow_mount = !0), _e.isAbs(n) || (n = p.cwd() + "/" + n);
    e: for (var l = 0; l < 40; l++) {
      for (var s = n.split("/").filter((b) => !!b), c = p.root, f = "/", v = 0; v < s.length; v++) {
        var m = v === s.length - 1;
        if (m && i.parent)
          break;
        if (s[v] !== ".") {
          if (s[v] === "..") {
            if (f = _e.dirname(f), p.isRoot(c)) {
              n = f + "/" + s.slice(v + 1).join("/"), l--;
              continue e;
            } else
              c = c.parent;
            continue;
          }
          f = _e.join2(f, s[v]);
          try {
            c = p.lookupNode(c, s[v]);
          } catch (b) {
            if ((b == null ? void 0 : b.errno) === 44 && m && i.noent_okay)
              return { path: f };
            throw b;
          }
          if (p.isMountpoint(c) && (!m || i.follow_mount) && (c = c.mounted.root), p.isLink(c.mode) && (!m || i.follow)) {
            if (!c.node_ops.readlink)
              throw new p.ErrnoError(52);
            var _ = c.node_ops.readlink(c);
            _e.isAbs(_) || (_ = _e.dirname(f) + "/" + _), n = _ + "/" + s.slice(v + 1).join("/");
            continue e;
          }
        }
      }
      return { path: f, node: c };
    }
    throw new p.ErrnoError(32);
  }, getPath(n) {
    for (var i; ; ) {
      if (p.isRoot(n)) {
        var l = n.mount.mountpoint;
        return i ? l[l.length - 1] !== "/" ? `${l}/${i}` : l + i : l;
      }
      i = i ? `${n.name}/${i}` : n.name, n = n.parent;
    }
  }, hashName(n, i) {
    for (var l = 0, s = 0; s < i.length; s++)
      l = (l << 5) - l + i.charCodeAt(s) | 0;
    return (n + l >>> 0) % p.nameTable.length;
  }, hashAddNode(n) {
    var i = p.hashName(n.parent.id, n.name);
    n.name_next = p.nameTable[i], p.nameTable[i] = n;
  }, hashRemoveNode(n) {
    var i = p.hashName(n.parent.id, n.name);
    if (p.nameTable[i] === n)
      p.nameTable[i] = n.name_next;
    else
      for (var l = p.nameTable[i]; l; ) {
        if (l.name_next === n) {
          l.name_next = n.name_next;
          break;
        }
        l = l.name_next;
      }
  }, lookupNode(n, i) {
    var l = p.mayLookup(n);
    if (l)
      throw new p.ErrnoError(l);
    for (var s = p.hashName(n.id, i), c = p.nameTable[s]; c; c = c.name_next) {
      var f = c.name;
      if (c.parent.id === n.id && f === i)
        return c;
    }
    return p.lookup(n, i);
  }, createNode(n, i, l, s) {
    var c = new p.FSNode(n, i, l, s);
    return p.hashAddNode(c), c;
  }, destroyNode(n) {
    p.hashRemoveNode(n);
  }, isRoot(n) {
    return n === n.parent;
  }, isMountpoint(n) {
    return !!n.mounted;
  }, isFile(n) {
    return (n & 61440) === 32768;
  }, isDir(n) {
    return (n & 61440) === 16384;
  }, isLink(n) {
    return (n & 61440) === 40960;
  }, isChrdev(n) {
    return (n & 61440) === 8192;
  }, isBlkdev(n) {
    return (n & 61440) === 24576;
  }, isFIFO(n) {
    return (n & 61440) === 4096;
  }, isSocket(n) {
    return (n & 49152) === 49152;
  }, flagsToPermissionString(n) {
    var i = ["r", "w", "rw"][n & 3];
    return n & 512 && (i += "w"), i;
  }, nodePermissions(n, i) {
    return p.ignorePermissions ? 0 : i.includes("r") && !(n.mode & 292) || i.includes("w") && !(n.mode & 146) || i.includes("x") && !(n.mode & 73) ? 2 : 0;
  }, mayLookup(n) {
    if (!p.isDir(n.mode)) return 54;
    var i = p.nodePermissions(n, "x");
    return i || (n.node_ops.lookup ? 0 : 2);
  }, mayCreate(n, i) {
    if (!p.isDir(n.mode))
      return 54;
    try {
      var l = p.lookupNode(n, i);
      return 20;
    } catch {
    }
    return p.nodePermissions(n, "wx");
  }, mayDelete(n, i, l) {
    var s;
    try {
      s = p.lookupNode(n, i);
    } catch (f) {
      return f.errno;
    }
    var c = p.nodePermissions(n, "wx");
    if (c)
      return c;
    if (l) {
      if (!p.isDir(s.mode))
        return 54;
      if (p.isRoot(s) || p.getPath(s) === p.cwd())
        return 10;
    } else if (p.isDir(s.mode))
      return 31;
    return 0;
  }, mayOpen(n, i) {
    return n ? p.isLink(n.mode) ? 32 : p.isDir(n.mode) && (p.flagsToPermissionString(i) !== "r" || i & 576) ? 31 : p.nodePermissions(n, p.flagsToPermissionString(i)) : 44;
  }, checkOpExists(n, i) {
    if (!n)
      throw new p.ErrnoError(i);
    return n;
  }, MAX_OPEN_FDS: 4096, nextfd() {
    for (var n = 0; n <= p.MAX_OPEN_FDS; n++)
      if (!p.streams[n])
        return n;
    throw new p.ErrnoError(33);
  }, getStreamChecked(n) {
    var i = p.getStream(n);
    if (!i)
      throw new p.ErrnoError(8);
    return i;
  }, getStream: (n) => p.streams[n], createStream(n, i = -1) {
    return n = Object.assign(new p.FSStream(), n), i == -1 && (i = p.nextfd()), n.fd = i, p.streams[i] = n, n;
  }, closeStream(n) {
    p.streams[n] = null;
  }, dupStream(n, i = -1) {
    var s, c;
    var l = p.createStream(n, i);
    return (c = (s = l.stream_ops) == null ? void 0 : s.dup) == null || c.call(s, l), l;
  }, doSetAttr(n, i, l) {
    var s = n == null ? void 0 : n.stream_ops.setattr, c = s ? n : i;
    s ?? (s = i.node_ops.setattr), p.checkOpExists(s, 63), s(c, l);
  }, chrdev_stream_ops: { open(n) {
    var l, s;
    var i = p.getDevice(n.node.rdev);
    n.stream_ops = i.stream_ops, (s = (l = n.stream_ops).open) == null || s.call(l, n);
  }, llseek() {
    throw new p.ErrnoError(70);
  } }, major: (n) => n >> 8, minor: (n) => n & 255, makedev: (n, i) => n << 8 | i, registerDevice(n, i) {
    p.devices[n] = { stream_ops: i };
  }, getDevice: (n) => p.devices[n], getMounts(n) {
    for (var i = [], l = [n]; l.length; ) {
      var s = l.pop();
      i.push(s), l.push(...s.mounts);
    }
    return i;
  }, syncfs(n, i) {
    typeof n == "function" && (i = n, n = !1), p.syncFSRequests++, p.syncFSRequests > 1 && Y(`warning: ${p.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    var l = p.getMounts(p.root.mount), s = 0;
    function c(m) {
      return p.syncFSRequests--, i(m);
    }
    function f(m) {
      if (m)
        return f.errored ? void 0 : (f.errored = !0, c(m));
      ++s >= l.length && c(null);
    }
    for (var v of l)
      v.type.syncfs ? v.type.syncfs(v, n, f) : f(null);
  }, mount(n, i, l) {
    var s = l === "/", c = !l, f;
    if (s && p.root)
      throw new p.ErrnoError(10);
    if (!s && !c) {
      var v = p.lookupPath(l, { follow_mount: !1 });
      if (l = v.path, f = v.node, p.isMountpoint(f))
        throw new p.ErrnoError(10);
      if (!p.isDir(f.mode))
        throw new p.ErrnoError(54);
    }
    var m = { type: n, opts: i, mountpoint: l, mounts: [] }, _ = n.mount(m);
    return _.mount = m, m.root = _, s ? p.root = _ : f && (f.mounted = m, f.mount && f.mount.mounts.push(m)), _;
  }, unmount(n) {
    var i = p.lookupPath(n, { follow_mount: !1 });
    if (!p.isMountpoint(i.node))
      throw new p.ErrnoError(28);
    var l = i.node, s = l.mounted, c = p.getMounts(s);
    for (var [f, v] of Object.entries(p.nameTable))
      for (; v; ) {
        var m = v.name_next;
        c.includes(v.mount) && p.destroyNode(v), v = m;
      }
    l.mounted = null;
    var _ = l.mount.mounts.indexOf(s);
    l.mount.mounts.splice(_, 1);
  }, lookup(n, i) {
    return n.node_ops.lookup(n, i);
  }, mknod(n, i, l) {
    var s = p.lookupPath(n, { parent: !0 }), c = s.node, f = _e.basename(n);
    if (!f)
      throw new p.ErrnoError(28);
    if (f === "." || f === "..")
      throw new p.ErrnoError(20);
    var v = p.mayCreate(c, f);
    if (v)
      throw new p.ErrnoError(v);
    if (!c.node_ops.mknod)
      throw new p.ErrnoError(63);
    return c.node_ops.mknod(c, f, i, l);
  }, statfs(n) {
    return p.statfsNode(p.lookupPath(n, { follow: !0 }).node);
  }, statfsStream(n) {
    return p.statfsNode(n.node);
  }, statfsNode(n) {
    var i = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: p.nextInode, ffree: p.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
    return n.node_ops.statfs && Object.assign(i, n.node_ops.statfs(n.mount.opts.root)), i;
  }, create(n, i = 438) {
    return i &= 4095, i |= 32768, p.mknod(n, i, 0);
  }, mkdir(n, i = 511) {
    return i &= 1023, i |= 16384, p.mknod(n, i, 0);
  }, mkdirTree(n, i) {
    var l = n.split("/"), s = "";
    for (var c of l)
      if (c) {
        (s || _e.isAbs(n)) && (s += "/"), s += c;
        try {
          p.mkdir(s, i);
        } catch (f) {
          if (f.errno != 20) throw f;
        }
      }
  }, mkdev(n, i, l) {
    return typeof l > "u" && (l = i, i = 438), i |= 8192, p.mknod(n, i, l);
  }, symlink(n, i) {
    if (!xr.resolve(n))
      throw new p.ErrnoError(44);
    var l = p.lookupPath(i, { parent: !0 }), s = l.node;
    if (!s)
      throw new p.ErrnoError(44);
    var c = _e.basename(i), f = p.mayCreate(s, c);
    if (f)
      throw new p.ErrnoError(f);
    if (!s.node_ops.symlink)
      throw new p.ErrnoError(63);
    return s.node_ops.symlink(s, c, n);
  }, rename(n, i) {
    var l = _e.dirname(n), s = _e.dirname(i), c = _e.basename(n), f = _e.basename(i), v, m, _;
    if (v = p.lookupPath(n, { parent: !0 }), m = v.node, v = p.lookupPath(i, { parent: !0 }), _ = v.node, !m || !_) throw new p.ErrnoError(44);
    if (m.mount !== _.mount)
      throw new p.ErrnoError(75);
    var b = p.lookupNode(m, c), R = xr.relative(n, s);
    if (R.charAt(0) !== ".")
      throw new p.ErrnoError(28);
    if (R = xr.relative(i, l), R.charAt(0) !== ".")
      throw new p.ErrnoError(55);
    var V;
    try {
      V = p.lookupNode(_, f);
    } catch {
    }
    if (b !== V) {
      var G = p.isDir(b.mode), X = p.mayDelete(m, c, G);
      if (X)
        throw new p.ErrnoError(X);
      if (X = V ? p.mayDelete(_, f, G) : p.mayCreate(_, f), X)
        throw new p.ErrnoError(X);
      if (!m.node_ops.rename)
        throw new p.ErrnoError(63);
      if (p.isMountpoint(b) || V && p.isMountpoint(V))
        throw new p.ErrnoError(10);
      if (_ !== m && (X = p.nodePermissions(m, "w"), X))
        throw new p.ErrnoError(X);
      p.hashRemoveNode(b);
      try {
        m.node_ops.rename(b, _, f), b.parent = _;
      } catch (ce) {
        throw ce;
      } finally {
        p.hashAddNode(b);
      }
    }
  }, rmdir(n) {
    var i = p.lookupPath(n, { parent: !0 }), l = i.node, s = _e.basename(n), c = p.lookupNode(l, s), f = p.mayDelete(l, s, !0);
    if (f)
      throw new p.ErrnoError(f);
    if (!l.node_ops.rmdir)
      throw new p.ErrnoError(63);
    if (p.isMountpoint(c))
      throw new p.ErrnoError(10);
    l.node_ops.rmdir(l, s), p.destroyNode(c);
  }, readdir(n) {
    var i = p.lookupPath(n, { follow: !0 }), l = i.node, s = p.checkOpExists(l.node_ops.readdir, 54);
    return s(l);
  }, unlink(n) {
    var i = p.lookupPath(n, { parent: !0 }), l = i.node;
    if (!l)
      throw new p.ErrnoError(44);
    var s = _e.basename(n), c = p.lookupNode(l, s), f = p.mayDelete(l, s, !1);
    if (f)
      throw new p.ErrnoError(f);
    if (!l.node_ops.unlink)
      throw new p.ErrnoError(63);
    if (p.isMountpoint(c))
      throw new p.ErrnoError(10);
    l.node_ops.unlink(l, s), p.destroyNode(c);
  }, readlink(n) {
    var i = p.lookupPath(n), l = i.node;
    if (!l)
      throw new p.ErrnoError(44);
    if (!l.node_ops.readlink)
      throw new p.ErrnoError(28);
    return l.node_ops.readlink(l);
  }, stat(n, i) {
    var l = p.lookupPath(n, { follow: !i }), s = l.node, c = p.checkOpExists(s.node_ops.getattr, 63);
    return c(s);
  }, fstat(n) {
    var i = p.getStreamChecked(n), l = i.node, s = i.stream_ops.getattr, c = s ? i : l;
    return s ?? (s = l.node_ops.getattr), p.checkOpExists(s, 63), s(c);
  }, lstat(n) {
    return p.stat(n, !0);
  }, doChmod(n, i, l, s) {
    p.doSetAttr(n, i, { mode: l & 4095 | i.mode & -4096, ctime: Date.now(), dontFollow: s });
  }, chmod(n, i, l) {
    var s;
    if (typeof n == "string") {
      var c = p.lookupPath(n, { follow: !l });
      s = c.node;
    } else
      s = n;
    p.doChmod(null, s, i, l);
  }, lchmod(n, i) {
    p.chmod(n, i, !0);
  }, fchmod(n, i) {
    var l = p.getStreamChecked(n);
    p.doChmod(l, l.node, i, !1);
  }, doChown(n, i, l) {
    p.doSetAttr(n, i, { timestamp: Date.now(), dontFollow: l });
  }, chown(n, i, l, s) {
    var c;
    if (typeof n == "string") {
      var f = p.lookupPath(n, { follow: !s });
      c = f.node;
    } else
      c = n;
    p.doChown(null, c, s);
  }, lchown(n, i, l) {
    p.chown(n, i, l, !0);
  }, fchown(n, i, l) {
    var s = p.getStreamChecked(n);
    p.doChown(s, s.node, !1);
  }, doTruncate(n, i, l) {
    if (p.isDir(i.mode))
      throw new p.ErrnoError(31);
    if (!p.isFile(i.mode))
      throw new p.ErrnoError(28);
    var s = p.nodePermissions(i, "w");
    if (s)
      throw new p.ErrnoError(s);
    p.doSetAttr(n, i, { size: l, timestamp: Date.now() });
  }, truncate(n, i) {
    if (i < 0)
      throw new p.ErrnoError(28);
    var l;
    if (typeof n == "string") {
      var s = p.lookupPath(n, { follow: !0 });
      l = s.node;
    } else
      l = n;
    p.doTruncate(null, l, i);
  }, ftruncate(n, i) {
    var l = p.getStreamChecked(n);
    if (i < 0 || !(l.flags & 2097155))
      throw new p.ErrnoError(28);
    p.doTruncate(l, l.node, i);
  }, utime(n, i, l) {
    var s = p.lookupPath(n, { follow: !0 }), c = s.node, f = p.checkOpExists(c.node_ops.setattr, 63);
    f(c, { atime: i, mtime: l });
  }, open(n, i, l = 438) {
    if (n === "")
      throw new p.ErrnoError(44);
    i = typeof i == "string" ? ga(i) : i, i & 64 ? l = l & 4095 | 32768 : l = 0;
    var s, c;
    if (typeof n == "object")
      s = n;
    else {
      c = n.endsWith("/");
      var f = p.lookupPath(n, { follow: !(i & 131072), noent_okay: !0 });
      s = f.node, n = f.path;
    }
    var v = !1;
    if (i & 64)
      if (s) {
        if (i & 128)
          throw new p.ErrnoError(20);
      } else {
        if (c)
          throw new p.ErrnoError(31);
        s = p.mknod(n, l | 511, 0), v = !0;
      }
    if (!s)
      throw new p.ErrnoError(44);
    if (p.isChrdev(s.mode) && (i &= -513), i & 65536 && !p.isDir(s.mode))
      throw new p.ErrnoError(54);
    if (!v) {
      var m = p.mayOpen(s, i);
      if (m)
        throw new p.ErrnoError(m);
    }
    i & 512 && !v && p.truncate(s, 0), i &= -131713;
    var _ = p.createStream({ node: s, path: p.getPath(s), flags: i, seekable: !0, position: 0, stream_ops: s.stream_ops, ungotten: [], error: !1 });
    return _.stream_ops.open && _.stream_ops.open(_), v && p.chmod(s, l & 511), r.logReadFiles && !(i & 1) && (n in p.readFiles || (p.readFiles[n] = 1)), _;
  }, close(n) {
    if (p.isClosed(n))
      throw new p.ErrnoError(8);
    n.getdents && (n.getdents = null);
    try {
      n.stream_ops.close && n.stream_ops.close(n);
    } catch (i) {
      throw i;
    } finally {
      p.closeStream(n.fd);
    }
    n.fd = null;
  }, isClosed(n) {
    return n.fd === null;
  }, llseek(n, i, l) {
    if (p.isClosed(n))
      throw new p.ErrnoError(8);
    if (!n.seekable || !n.stream_ops.llseek)
      throw new p.ErrnoError(70);
    if (l != 0 && l != 1 && l != 2)
      throw new p.ErrnoError(28);
    return n.position = n.stream_ops.llseek(n, i, l), n.ungotten = [], n.position;
  }, read(n, i, l, s, c) {
    if (s < 0 || c < 0)
      throw new p.ErrnoError(28);
    if (p.isClosed(n))
      throw new p.ErrnoError(8);
    if ((n.flags & 2097155) === 1)
      throw new p.ErrnoError(8);
    if (p.isDir(n.node.mode))
      throw new p.ErrnoError(31);
    if (!n.stream_ops.read)
      throw new p.ErrnoError(28);
    var f = typeof c < "u";
    if (!f)
      c = n.position;
    else if (!n.seekable)
      throw new p.ErrnoError(70);
    var v = n.stream_ops.read(n, i, l, s, c);
    return f || (n.position += v), v;
  }, write(n, i, l, s, c, f) {
    if (s < 0 || c < 0)
      throw new p.ErrnoError(28);
    if (p.isClosed(n))
      throw new p.ErrnoError(8);
    if (!(n.flags & 2097155))
      throw new p.ErrnoError(8);
    if (p.isDir(n.node.mode))
      throw new p.ErrnoError(31);
    if (!n.stream_ops.write)
      throw new p.ErrnoError(28);
    n.seekable && n.flags & 1024 && p.llseek(n, 0, 2);
    var v = typeof c < "u";
    if (!v)
      c = n.position;
    else if (!n.seekable)
      throw new p.ErrnoError(70);
    var m = n.stream_ops.write(n, i, l, s, c, f);
    return v || (n.position += m), m;
  }, mmap(n, i, l, s, c) {
    if (s & 2 && !(c & 2) && (n.flags & 2097155) !== 2)
      throw new p.ErrnoError(2);
    if ((n.flags & 2097155) === 1)
      throw new p.ErrnoError(2);
    if (!n.stream_ops.mmap)
      throw new p.ErrnoError(43);
    if (!i)
      throw new p.ErrnoError(28);
    return n.stream_ops.mmap(n, i, l, s, c);
  }, msync(n, i, l, s, c) {
    return n.stream_ops.msync ? n.stream_ops.msync(n, i, l, s, c) : 0;
  }, ioctl(n, i, l) {
    if (!n.stream_ops.ioctl)
      throw new p.ErrnoError(59);
    return n.stream_ops.ioctl(n, i, l);
  }, readFile(n, i = {}) {
    i.flags = i.flags || 0, i.encoding = i.encoding || "binary", i.encoding !== "utf8" && i.encoding !== "binary" && ye(`Invalid encoding type "${i.encoding}"`);
    var l = p.open(n, i.flags), s = p.stat(n), c = s.size, f = new Uint8Array(c);
    return p.read(l, f, 0, c, 0), i.encoding === "utf8" && (f = rr(f)), p.close(l), f;
  }, writeFile(n, i, l = {}) {
    l.flags = l.flags || 577;
    var s = p.open(n, l.flags, l.mode);
    typeof i == "string" && (i = new Uint8Array(An(i))), ArrayBuffer.isView(i) ? p.write(s, i, 0, i.byteLength, void 0, l.canOwn) : ye("Unsupported data type"), p.close(s);
  }, cwd: () => p.currentPath, chdir(n) {
    var i = p.lookupPath(n, { follow: !0 });
    if (i.node === null)
      throw new p.ErrnoError(44);
    if (!p.isDir(i.node.mode))
      throw new p.ErrnoError(54);
    var l = p.nodePermissions(i.node, "x");
    if (l)
      throw new p.ErrnoError(l);
    p.currentPath = i.path;
  }, createDefaultDirectories() {
    p.mkdir("/tmp"), p.mkdir("/home"), p.mkdir("/home/web_user");
  }, createDefaultDevices() {
    p.mkdir("/dev"), p.registerDevice(p.makedev(1, 3), { read: () => 0, write: (s, c, f, v, m) => v, llseek: () => 0 }), p.mkdev("/dev/null", p.makedev(1, 3)), fr.register(p.makedev(5, 0), fr.default_tty_ops), fr.register(p.makedev(6, 0), fr.default_tty1_ops), p.mkdev("/dev/tty", p.makedev(5, 0)), p.mkdev("/dev/tty1", p.makedev(6, 0));
    var n = new Uint8Array(1024), i = 0, l = () => (i === 0 && (Ot(n), i = n.byteLength), n[--i]);
    p.createDevice("/dev", "random", l), p.createDevice("/dev", "urandom", l), p.mkdir("/dev/shm"), p.mkdir("/dev/shm/tmp");
  }, createSpecialDirectories() {
    p.mkdir("/proc");
    var n = p.mkdir("/proc/self");
    p.mkdir("/proc/self/fd"), p.mount({ mount() {
      var i = p.createNode(n, "fd", 16895, 73);
      return i.stream_ops = { llseek: he.stream_ops.llseek }, i.node_ops = { lookup(l, s) {
        var c = +s, f = p.getStreamChecked(c), v = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => f.path }, id: c + 1 };
        return v.parent = v, v;
      }, readdir() {
        return Array.from(p.streams.entries()).filter(([l, s]) => s).map(([l, s]) => l.toString());
      } }, i;
    } }, {}, "/proc/self/fd");
  }, createStandardStreams(n, i, l) {
    n ? p.createDevice("/dev", "stdin", n) : p.symlink("/dev/tty", "/dev/stdin"), i ? p.createDevice("/dev", "stdout", null, i) : p.symlink("/dev/tty", "/dev/stdout"), l ? p.createDevice("/dev", "stderr", null, l) : p.symlink("/dev/tty1", "/dev/stderr"), p.open("/dev/stdin", 0), p.open("/dev/stdout", 1), p.open("/dev/stderr", 1);
  }, staticInit() {
    p.nameTable = new Array(4096), p.mount(he, {}, "/"), p.createDefaultDirectories(), p.createDefaultDevices(), p.createSpecialDirectories(), p.filesystems = { MEMFS: he };
  }, init(n, i, l) {
    p.initialized = !0, n ?? (n = r.stdin), i ?? (i = r.stdout), l ?? (l = r.stderr), p.createStandardStreams(n, i, l);
  }, quit() {
    p.initialized = !1;
    for (var n of p.streams)
      n && p.close(n);
  }, findObject(n, i) {
    var l = p.analyzePath(n, i);
    return l.exists ? l.object : null;
  }, analyzePath(n, i) {
    try {
      var l = p.lookupPath(n, { follow: !i });
      n = l.path;
    } catch {
    }
    var s = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
    try {
      var l = p.lookupPath(n, { parent: !0 });
      s.parentExists = !0, s.parentPath = l.path, s.parentObject = l.node, s.name = _e.basename(n), l = p.lookupPath(n, { follow: !i }), s.exists = !0, s.path = l.path, s.object = l.node, s.name = l.node.name, s.isRoot = l.path === "/";
    } catch (c) {
      s.error = c.errno;
    }
    return s;
  }, createPath(n, i, l, s) {
    n = typeof n == "string" ? n : p.getPath(n);
    for (var c = i.split("/").reverse(); c.length; ) {
      var f = c.pop();
      if (f) {
        var v = _e.join2(n, f);
        try {
          p.mkdir(v);
        } catch (m) {
          if (m.errno != 20) throw m;
        }
        n = v;
      }
    }
    return v;
  }, createFile(n, i, l, s, c) {
    var f = _e.join2(typeof n == "string" ? n : p.getPath(n), i), v = ki(s, c);
    return p.create(f, v);
  }, createDataFile(n, i, l, s, c, f) {
    var v = i;
    n && (n = typeof n == "string" ? n : p.getPath(n), v = i ? _e.join2(n, i) : n);
    var m = ki(s, c), _ = p.create(v, m);
    if (l) {
      if (typeof l == "string") {
        for (var b = new Array(l.length), R = 0, V = l.length; R < V; ++R) b[R] = l.charCodeAt(R);
        l = b;
      }
      p.chmod(_, m | 146);
      var G = p.open(_, 577);
      p.write(G, l, 0, l.length, 0, f), p.close(G), p.chmod(_, m);
    }
  }, createDevice(n, i, l, s) {
    var m;
    var c = _e.join2(typeof n == "string" ? n : p.getPath(n), i), f = ki(!!l, !!s);
    (m = p.createDevice).major ?? (m.major = 64);
    var v = p.makedev(p.createDevice.major++, 0);
    return p.registerDevice(v, { open(_) {
      _.seekable = !1;
    }, close(_) {
      var b;
      (b = s == null ? void 0 : s.buffer) != null && b.length && s(10);
    }, read(_, b, R, V, G) {
      for (var X = 0, ce = 0; ce < V; ce++) {
        var ve;
        try {
          ve = l();
        } catch {
          throw new p.ErrnoError(29);
        }
        if (ve === void 0 && X === 0)
          throw new p.ErrnoError(6);
        if (ve == null) break;
        X++, b[R + ce] = ve;
      }
      return X && (_.node.atime = Date.now()), X;
    }, write(_, b, R, V, G) {
      for (var X = 0; X < V; X++)
        try {
          s(b[R + X]);
        } catch {
          throw new p.ErrnoError(29);
        }
      return V && (_.node.mtime = _.node.ctime = Date.now()), X;
    } }), p.mkdev(c, f, v);
  }, forceLoadFile(n) {
    if (n.isDevice || n.isFolder || n.link || n.contents) return !0;
    if (globalThis.XMLHttpRequest)
      ye("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    else
      try {
        n.contents = P(n.url);
      } catch {
        throw new p.ErrnoError(29);
      }
  }, createLazyFile(n, i, l, s, c) {
    class f {
      constructor() {
        Ie(this, "lengthKnown", !1);
        Ie(this, "chunks", []);
      }
      get(G) {
        if (!(G > this.length - 1 || G < 0)) {
          var X = G % this.chunkSize, ce = G / this.chunkSize | 0;
          return this.getter(ce)[X];
        }
      }
      setDataGetter(G) {
        this.getter = G;
      }
      cacheLength() {
        var G = new XMLHttpRequest();
        G.open("HEAD", l, !1), G.send(null), G.status >= 200 && G.status < 300 || G.status === 304 || ye("Couldn't load " + l + ". Status: " + G.status);
        var X = Number(G.getResponseHeader("Content-length")), ce, ve = (ce = G.getResponseHeader("Accept-Ranges")) && ce === "bytes", ge = (ce = G.getResponseHeader("Content-Encoding")) && ce === "gzip", ke = 1024 * 1024;
        ve || (ke = X);
        var De = (Re, wt) => {
          Re > wt && ye("invalid range (" + Re + ", " + wt + ") or no bytes requested!"), wt > X - 1 && ye("only " + X + " bytes available! programmer error!");
          var Ae = new XMLHttpRequest();
          return Ae.open("GET", l, !1), X !== ke && Ae.setRequestHeader("Range", "bytes=" + Re + "-" + wt), Ae.responseType = "arraybuffer", Ae.overrideMimeType && Ae.overrideMimeType("text/plain; charset=x-user-defined"), Ae.send(null), Ae.status >= 200 && Ae.status < 300 || Ae.status === 304 || ye("Couldn't load " + l + ". Status: " + Ae.status), Ae.response !== void 0 ? new Uint8Array(Ae.response || []) : An(Ae.responseText || "");
        }, Me = this;
        Me.setDataGetter((Re) => {
          var wt = Re * ke, Ae = (Re + 1) * ke - 1;
          return Ae = Math.min(Ae, X - 1), typeof Me.chunks[Re] > "u" && (Me.chunks[Re] = De(wt, Ae)), typeof Me.chunks[Re] > "u" && ye("doXHR failed!"), Me.chunks[Re];
        }), (ge || !X) && (ke = X = 1, X = this.getter(0).length, ke = X, B("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = X, this._chunkSize = ke, this.lengthKnown = !0;
      }
      get length() {
        return this.lengthKnown || this.cacheLength(), this._length;
      }
      get chunkSize() {
        return this.lengthKnown || this.cacheLength(), this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      a || ye("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
      var v = new f(), m = { isDevice: !1, contents: v };
    } else
      var m = { isDevice: !1, url: l };
    var _ = p.createFile(n, i, m, s, c);
    m.contents ? _.contents = m.contents : m.url && (_.contents = null, _.url = m.url), Object.defineProperties(_, { usedBytes: { get: function() {
      return this.contents.length;
    } } });
    var b = {};
    for (const [V, G] of Object.entries(_.stream_ops))
      b[V] = (...X) => (p.forceLoadFile(_), G(...X));
    function R(V, G, X, ce, ve) {
      var ge = V.node.contents;
      if (ve >= ge.length) return 0;
      var ke = Math.min(ge.length - ve, ce);
      if (ge.slice)
        for (var De = 0; De < ke; De++)
          G[X + De] = ge[ve + De];
      else
        for (var De = 0; De < ke; De++)
          G[X + De] = ge.get(ve + De);
      return ke;
    }
    return b.read = (V, G, X, ce, ve) => (p.forceLoadFile(_), R(V, G, X, ce, ve)), b.mmap = (V, G, X, ce, ve) => {
      p.forceLoadFile(_);
      var ge = Lo(G);
      if (!ge)
        throw new p.ErrnoError(48);
      return R(V, F, ge, G, X), { ptr: ge, allocated: !0 };
    }, _.stream_ops = b, _;
  } }, se = (n, i, l) => (n >>>= 0, n ? rr(W, n, i, l) : ""), H = { calculateAt(n, i, l) {
    if (_e.isAbs(i))
      return i;
    var s;
    if (n === -100)
      s = p.cwd();
    else {
      var c = H.getStreamFromFD(n);
      s = c.path;
    }
    if (i.length == 0) {
      if (!l)
        throw new p.ErrnoError(44);
      return s;
    }
    return s + "/" + i;
  }, writeStat(n, i) {
    re[n >>> 2 >>> 0] = i.dev, re[n + 4 >>> 2 >>> 0] = i.mode, re[n + 8 >>> 2 >>> 0] = i.nlink, re[n + 12 >>> 2 >>> 0] = i.uid, re[n + 16 >>> 2 >>> 0] = i.gid, re[n + 20 >>> 2 >>> 0] = i.rdev, Ee[n + 24 >>> 3 >>> 0] = BigInt(i.size), T[n + 32 >>> 2 >>> 0] = 4096, T[n + 36 >>> 2 >>> 0] = i.blocks;
    var l = i.atime.getTime(), s = i.mtime.getTime(), c = i.ctime.getTime();
    return Ee[n + 40 >>> 3 >>> 0] = BigInt(Math.floor(l / 1e3)), re[n + 48 >>> 2 >>> 0] = l % 1e3 * 1e3 * 1e3, Ee[n + 56 >>> 3 >>> 0] = BigInt(Math.floor(s / 1e3)), re[n + 64 >>> 2 >>> 0] = s % 1e3 * 1e3 * 1e3, Ee[n + 72 >>> 3 >>> 0] = BigInt(Math.floor(c / 1e3)), re[n + 80 >>> 2 >>> 0] = c % 1e3 * 1e3 * 1e3, Ee[n + 88 >>> 3 >>> 0] = BigInt(i.ino), 0;
  }, writeStatFs(n, i) {
    re[n + 4 >>> 2 >>> 0] = i.bsize, re[n + 60 >>> 2 >>> 0] = i.bsize, Ee[n + 8 >>> 3 >>> 0] = BigInt(i.blocks), Ee[n + 16 >>> 3 >>> 0] = BigInt(i.bfree), Ee[n + 24 >>> 3 >>> 0] = BigInt(i.bavail), Ee[n + 32 >>> 3 >>> 0] = BigInt(i.files), Ee[n + 40 >>> 3 >>> 0] = BigInt(i.ffree), re[n + 48 >>> 2 >>> 0] = i.fsid, re[n + 64 >>> 2 >>> 0] = i.flags, re[n + 56 >>> 2 >>> 0] = i.namelen;
  }, doMsync(n, i, l, s, c) {
    if (!p.isFile(i.node.mode))
      throw new p.ErrnoError(43);
    if (s & 2)
      return 0;
    var f = W.slice(n, n + l);
    p.msync(i, f, c, l, s);
  }, getStreamFromFD(n) {
    var i = p.getStreamChecked(n);
    return i;
  }, varargs: void 0, getStr(n) {
    var i = se(n);
    return i;
  } }, q = 9007199254740992, ne = -9007199254740992, de = (n) => n < ne || n > q ? NaN : Number(n);
  function xe(n, i) {
    n >>>= 0;
    try {
      return n = H.getStr(n), p.chmod(n, i), 0;
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  var ae = { websocketArgs: {}, callbacks: {}, on(n, i) {
    ae.callbacks[n] = i;
  }, emit(n, i) {
    var l, s;
    (s = (l = ae.callbacks)[n]) == null || s.call(l, i);
  }, mount(n) {
    return ae.websocketArgs = r.websocket || {}, (r.websocket ?? (r.websocket = {})).on = ae.on, p.createNode(null, "/", 16895, 0);
  }, createSocket(n, i, l) {
    if (n != 2)
      throw new p.ErrnoError(5);
    if (i &= -526337, i != 1 && i != 2)
      throw new p.ErrnoError(28);
    var s = i == 1;
    if (s && l && l != 6)
      throw new p.ErrnoError(66);
    var c = { family: n, type: i, protocol: l, server: null, error: null, peers: {}, pending: [], recv_queue: [], sock_ops: ae.websocket_sock_ops }, f = ae.nextname(), v = p.createNode(ae.root, f, 49152, 0);
    v.sock = c;
    var m = p.createStream({ path: f, node: v, flags: 2, seekable: !1, stream_ops: ae.stream_ops });
    return c.stream = m, c;
  }, getSocket(n) {
    var i = p.getStream(n);
    return !i || !p.isSocket(i.node.mode) ? null : i.node.sock;
  }, stream_ops: { poll(n) {
    var i = n.node.sock;
    return i.sock_ops.poll(i);
  }, ioctl(n, i, l) {
    var s = n.node.sock;
    return s.sock_ops.ioctl(s, i, l);
  }, read(n, i, l, s, c) {
    var f = n.node.sock, v = f.sock_ops.recvmsg(f, s);
    return v ? (i.set(v.buffer, l), v.buffer.length) : 0;
  }, write(n, i, l, s, c) {
    var f = n.node.sock;
    return f.sock_ops.sendmsg(f, i, l, s);
  }, close(n) {
    var i = n.node.sock;
    i.sock_ops.close(i);
  } }, nextname() {
    return ae.nextname.current || (ae.nextname.current = 0), `socket[${ae.nextname.current++}]`;
  }, websocket_sock_ops: { createPeer(n, i, l) {
    var s;
    if (typeof i == "object" && (s = i, i = null, l = null), s)
      if (s._socket)
        i = s._socket.remoteAddress, l = s._socket.remotePort;
      else {
        var c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(s.url);
        if (!c)
          throw new Error("WebSocket URL must be in the format ws(s)://address:port");
        i = c[1], l = parseInt(c[2], 10);
      }
    else
      try {
        var f = "ws://".replace("#", "//"), v = "binary", m = void 0;
        if (ae.websocketArgs.url && (f = ae.websocketArgs.url), ae.websocketArgs.subprotocol ? v = ae.websocketArgs.subprotocol : ae.websocketArgs.subprotocol === null && (v = "null"), f === "ws://" || f === "wss://") {
          var _ = i.split("/");
          f = f + _[0] + ":" + l + "/" + _.slice(1).join("/");
        }
        v !== "null" && (v = v.replace(/^ +| +$/g, "").split(/ *, */), m = v);
        var b;
        u ? b = d("ws") : b = WebSocket, s = new b(f, m), s.binaryType = "arraybuffer";
      } catch {
        throw new p.ErrnoError(23);
      }
    var R = { addr: i, port: l, socket: s, msg_send_queue: [] };
    return ae.websocket_sock_ops.addPeer(n, R), ae.websocket_sock_ops.handlePeerEvents(n, R), n.type === 2 && typeof n.sport < "u" && R.msg_send_queue.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (n.sport & 65280) >> 8, n.sport & 255])), R;
  }, getPeer(n, i, l) {
    return n.peers[i + ":" + l];
  }, addPeer(n, i) {
    n.peers[i.addr + ":" + i.port] = i;
  }, removePeer(n, i) {
    delete n.peers[i.addr + ":" + i.port];
  }, handlePeerEvents(n, i) {
    var l = !0, s = function() {
      n.connecting = !1, ae.emit("open", n.stream.fd);
      try {
        for (var f = i.msg_send_queue.shift(); f; )
          i.socket.send(f), f = i.msg_send_queue.shift();
      } catch {
        i.socket.close();
      }
    };
    function c(f) {
      if (typeof f == "string") {
        var v = new TextEncoder();
        f = v.encode(f);
      } else {
        if (f.byteLength == 0)
          return;
        f = new Uint8Array(f);
      }
      var m = l;
      if (l = !1, m && f.length === 10 && f[0] === 255 && f[1] === 255 && f[2] === 255 && f[3] === 255 && f[4] === 112 && f[5] === 111 && f[6] === 114 && f[7] === 116) {
        var _ = f[8] << 8 | f[9];
        ae.websocket_sock_ops.removePeer(n, i), i.port = _, ae.websocket_sock_ops.addPeer(n, i);
        return;
      }
      n.recv_queue.push({ addr: i.addr, port: i.port, data: f }), ae.emit("message", n.stream.fd);
    }
    u ? (i.socket.on("open", s), i.socket.on("message", function(f, v) {
      v && c(new Uint8Array(f).buffer);
    }), i.socket.on("close", function() {
      ae.emit("close", n.stream.fd);
    }), i.socket.on("error", function(f) {
      n.error = 14, ae.emit("error", [n.stream.fd, n.error, "ECONNREFUSED: Connection refused"]);
    })) : (i.socket.onopen = s, i.socket.onclose = function() {
      ae.emit("close", n.stream.fd);
    }, i.socket.onmessage = function(v) {
      c(v.data);
    }, i.socket.onerror = function(f) {
      n.error = 14, ae.emit("error", [n.stream.fd, n.error, "ECONNREFUSED: Connection refused"]);
    });
  }, poll(n) {
    if (n.type === 1 && n.server)
      return n.pending.length ? 65 : 0;
    var i = 0, l = n.type === 1 ? ae.websocket_sock_ops.getPeer(n, n.daddr, n.dport) : null;
    return (n.recv_queue.length || !l || l && l.socket.readyState === l.socket.CLOSING || l && l.socket.readyState === l.socket.CLOSED) && (i |= 65), (!l || l && l.socket.readyState === l.socket.OPEN) && (i |= 4), (l && l.socket.readyState === l.socket.CLOSING || l && l.socket.readyState === l.socket.CLOSED) && (n.connecting ? i |= 4 : i |= 16), i;
  }, ioctl(n, i, l) {
    switch (i) {
      case 21531:
        var s = 0;
        return n.recv_queue.length && (s = n.recv_queue[0].data.length), T[l >>> 2 >>> 0] = s, 0;
      case 21537:
        var c = T[l >>> 2 >>> 0];
        return c ? n.stream.flags |= 2048 : n.stream.flags &= -2049, 0;
      default:
        return 28;
    }
  }, close(n) {
    if (n.server) {
      try {
        n.server.close();
      } catch {
      }
      n.server = null;
    }
    for (var i of Object.values(n.peers)) {
      try {
        i.socket.close();
      } catch {
      }
      ae.websocket_sock_ops.removePeer(n, i);
    }
    return 0;
  }, bind(n, i, l) {
    if (typeof n.saddr < "u" || typeof n.sport < "u")
      throw new p.ErrnoError(28);
    if (n.saddr = i, n.sport = l, n.type === 2) {
      n.server && (n.server.close(), n.server = null);
      try {
        n.sock_ops.listen(n, 0);
      } catch (s) {
        if (s.name !== "ErrnoError" || s.errno !== 138) throw s;
      }
    }
  }, connect(n, i, l) {
    if (n.server)
      throw new p.ErrnoError(138);
    if (typeof n.daddr < "u" && typeof n.dport < "u") {
      var s = ae.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
      if (s)
        throw s.socket.readyState === s.socket.CONNECTING ? new p.ErrnoError(7) : new p.ErrnoError(30);
    }
    var c = ae.websocket_sock_ops.createPeer(n, i, l);
    n.daddr = c.addr, n.dport = c.port, n.connecting = !0;
  }, listen(n, i) {
    if (!u)
      throw new p.ErrnoError(138);
    if (n.server)
      throw new p.ErrnoError(28);
    var l = d("ws").Server, s = n.saddr;
    n.server = new l({ host: s, port: n.sport }), ae.emit("listen", n.stream.fd), n.server.on("connection", function(c) {
      if (n.type === 1) {
        var f = ae.createSocket(n.family, n.type, n.protocol), v = ae.websocket_sock_ops.createPeer(f, c);
        f.daddr = v.addr, f.dport = v.port, n.pending.push(f), ae.emit("connection", f.stream.fd);
      } else
        ae.websocket_sock_ops.createPeer(n, c), ae.emit("connection", n.stream.fd);
    }), n.server.on("close", function() {
      ae.emit("close", n.stream.fd), n.server = null;
    }), n.server.on("error", function(c) {
      n.error = 23, ae.emit("error", [n.stream.fd, n.error, "EHOSTUNREACH: Host is unreachable"]);
    });
  }, accept(n) {
    if (!n.server || !n.pending.length)
      throw new p.ErrnoError(28);
    var i = n.pending.shift();
    return i.stream.flags = n.stream.flags, i;
  }, getname(n, i) {
    var l, s;
    if (i) {
      if (n.daddr === void 0 || n.dport === void 0)
        throw new p.ErrnoError(53);
      l = n.daddr, s = n.dport;
    } else
      l = n.saddr || 0, s = n.sport || 0;
    return { addr: l, port: s };
  }, sendmsg(n, i, l, s, c, f) {
    if (n.type === 2) {
      if ((c === void 0 || f === void 0) && (c = n.daddr, f = n.dport), c === void 0 || f === void 0)
        throw new p.ErrnoError(17);
    } else
      c = n.daddr, f = n.dport;
    var v = ae.websocket_sock_ops.getPeer(n, c, f);
    if (n.type === 1 && (!v || v.socket.readyState === v.socket.CLOSING || v.socket.readyState === v.socket.CLOSED))
      throw new p.ErrnoError(53);
    ArrayBuffer.isView(i) && (l += i.byteOffset, i = i.buffer);
    var m = i.slice(l, l + s);
    if (!v || v.socket.readyState !== v.socket.OPEN)
      return n.type === 2 && (!v || v.socket.readyState === v.socket.CLOSING || v.socket.readyState === v.socket.CLOSED) && (v = ae.websocket_sock_ops.createPeer(n, c, f)), v.msg_send_queue.push(m), s;
    try {
      return v.socket.send(m), s;
    } catch {
      throw new p.ErrnoError(28);
    }
  }, recvmsg(n, i) {
    if (n.type === 1 && n.server)
      throw new p.ErrnoError(53);
    var l = n.recv_queue.shift();
    if (!l) {
      if (n.type === 1) {
        var s = ae.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
        if (!s)
          throw new p.ErrnoError(53);
        if (s.socket.readyState === s.socket.CLOSING || s.socket.readyState === s.socket.CLOSED)
          return null;
        throw new p.ErrnoError(6);
      }
      throw new p.ErrnoError(6);
    }
    var c = l.data.byteLength || l.data.length, f = l.data.byteOffset || 0, v = l.data.buffer || l.data, m = Math.min(i, c), _ = { buffer: new Uint8Array(v, f, m), addr: l.addr, port: l.port };
    if (n.type === 1 && m < c) {
      var b = c - m;
      l.data = new Uint8Array(v, f + m, b), n.recv_queue.unshift(l);
    }
    return _;
  } } }, Oe = (n) => {
    var i = ae.getSocket(n);
    if (!i) throw new p.ErrnoError(8);
    return i;
  }, Je = (n) => (n & 255) + "." + (n >> 8 & 255) + "." + (n >> 16 & 255) + "." + (n >> 24 & 255), at = (n) => {
    var i = "", l = 0, s = 0, c = 0, f = 0, v = 0, m = 0, _ = [n[0] & 65535, n[0] >> 16, n[1] & 65535, n[1] >> 16, n[2] & 65535, n[2] >> 16, n[3] & 65535, n[3] >> 16], b = !0, R = "";
    for (m = 0; m < 5; m++)
      if (_[m] !== 0) {
        b = !1;
        break;
      }
    if (b) {
      if (R = Je(_[6] | _[7] << 16), _[5] === -1)
        return i = "::ffff:", i += R, i;
      if (_[5] === 0)
        return i = "::", R === "0.0.0.0" && (R = ""), R === "0.0.0.1" && (R = "1"), i += R, i;
    }
    for (l = 0; l < 8; l++)
      _[l] === 0 && (l - c > 1 && (v = 0), c = l, v++), v > s && (s = v, f = l - s + 1);
    for (l = 0; l < 8; l++) {
      if (s > 1 && _[l] === 0 && l >= f && l < f + s) {
        l === f && (i += ":", f === 0 && (i += ":"));
        continue;
      }
      i += Number(Ma(_[l] & 65535)).toString(16), i += l < 7 ? ":" : "";
    }
    return i;
  }, st = (n, i) => {
    var l = K[n >>> 1 >>> 0], s = Ma(Z[n + 2 >>> 1 >>> 0]), c;
    switch (l) {
      case 2:
        if (i !== 16)
          return { errno: 28 };
        c = T[n + 4 >>> 2 >>> 0], c = Je(c);
        break;
      case 10:
        if (i !== 28)
          return { errno: 28 };
        c = [T[n + 8 >>> 2 >>> 0], T[n + 12 >>> 2 >>> 0], T[n + 16 >>> 2 >>> 0], T[n + 20 >>> 2 >>> 0]], c = at(c);
        break;
      default:
        return { errno: 5 };
    }
    return { family: l, addr: c, port: s };
  }, tt = (n) => {
    for (var i = n.split("."), l = 0; l < 4; l++) {
      var s = Number(i[l]);
      if (isNaN(s)) return null;
      i[l] = s;
    }
    return (i[0] | i[1] << 8 | i[2] << 16 | i[3] << 24) >>> 0;
  }, Nr = (n) => {
    var i, l, s, c, f = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i, v = [];
    if (!f.test(n))
      return null;
    if (n === "::")
      return [0, 0, 0, 0, 0, 0, 0, 0];
    for (n.startsWith("::") ? n = n.replace("::", "Z:") : n = n.replace("::", ":Z:"), n.indexOf(".") > 0 ? (n = n.replace(new RegExp("[.]", "g"), ":"), i = n.split(":"), i[i.length - 4] = Number(i[i.length - 4]) + Number(i[i.length - 3]) * 256, i[i.length - 3] = Number(i[i.length - 2]) + Number(i[i.length - 1]) * 256, i = i.slice(0, i.length - 2)) : i = n.split(":"), s = 0, c = 0, l = 0; l < i.length; l++)
      if (typeof i[l] == "string")
        if (i[l] === "Z") {
          for (c = 0; c < 8 - i.length + 1; c++)
            v[l + c] = 0;
          s = c - 1;
        } else
          v[l + s] = Ho(parseInt(i[l], 16));
      else
        v[l + s] = i[l];
    return [v[1] << 16 | v[0], v[3] << 16 | v[2], v[5] << 16 | v[4], v[7] << 16 | v[6]];
  }, _t = { address_map: { id: 1, addrs: {}, names: {} }, lookup_name(n) {
    var i = tt(n);
    if (i !== null || (i = Nr(n), i !== null))
      return n;
    var l;
    if (_t.address_map.addrs[n])
      l = _t.address_map.addrs[n];
    else {
      var s = _t.address_map.id++;
      l = "172.29." + (s & 255) + "." + (s & 65280), _t.address_map.names[l] = n, _t.address_map.addrs[n] = l;
    }
    return l;
  }, lookup_addr(n) {
    return _t.address_map.names[n] ? _t.address_map.names[n] : null;
  } }, On = (n, i) => {
    var l = st(n, i);
    if (l.errno) throw new p.ErrnoError(l.errno);
    return l.addr = _t.lookup_addr(l.addr) || l.addr, l;
  };
  function Ro(n, i, l, s, c, f) {
    i >>>= 0, l >>>= 0;
    try {
      var v = Oe(n), m = On(i, l);
      return v.sock_ops.connect(v, m.addr, m.port), 0;
    } catch (_) {
      if (typeof p > "u" || _.name !== "ErrnoError") throw _;
      return -_.errno;
    }
  }
  function rh(n, i, l, s) {
    i >>>= 0;
    try {
      if (i = H.getStr(i), i = H.calculateAt(n, i), l & -8)
        return -28;
      var c = p.lookupPath(i, { follow: !0 }), f = c.node;
      if (!f)
        return -44;
      var v = "";
      return l & 4 && (v += "r"), l & 2 && (v += "w"), l & 1 && (v += "x"), v && p.nodePermissions(f, v) ? -2 : 0;
    } catch (m) {
      if (typeof p > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  var Fo = () => {
    var n = T[+H.varargs >>> 2 >>> 0];
    return H.varargs += 4, n;
  }, Mn = Fo;
  function nh(n, i, l) {
    l >>>= 0, H.varargs = l;
    try {
      var s = H.getStreamFromFD(n);
      switch (i) {
        case 0: {
          var c = Fo();
          if (c < 0)
            return -28;
          for (; p.streams[c]; )
            c++;
          var f;
          return f = p.dupStream(s, c), f.fd;
        }
        case 1:
        case 2:
          return 0;
        case 3:
          return s.flags;
        case 4: {
          var c = Fo();
          return s.flags |= c, 0;
        }
        case 12: {
          var c = Mn(), v = 0;
          return K[c + v >>> 1 >>> 0] = 2, 0;
        }
        case 13:
        case 14:
          return 0;
      }
      return -28;
    } catch (m) {
      if (typeof p > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  function ih(n, i) {
    i >>>= 0;
    try {
      return H.writeStat(i, p.fstat(n));
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  var Ht = (n, i, l) => wi(n, W, i, l);
  function oh(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      if (i === 0) return -28;
      var l = p.cwd(), s = Mt(l) + 1;
      return i < s ? -68 : (Ht(l, n, i), s);
    } catch (c) {
      if (typeof p > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function lh(n, i, l) {
    i >>>= 0, l >>>= 0;
    try {
      var s = H.getStreamFromFD(n);
      s.getdents || (s.getdents = p.readdir(s.path));
      for (var c = 280, f = 0, v = p.llseek(s, 0, 1), m = Math.floor(v / c), _ = Math.min(s.getdents.length, m + Math.floor(l / c)), b = m; b < _; b++) {
        var R, V, G = s.getdents[b];
        if (G === ".")
          R = s.node.id, V = 4;
        else if (G === "..") {
          var X = p.lookupPath(s.path, { parent: !0 });
          R = X.node.id, V = 4;
        } else {
          var ce;
          try {
            ce = p.lookupNode(s.node, G);
          } catch (ve) {
            if ((ve == null ? void 0 : ve.errno) === 28)
              continue;
            throw ve;
          }
          R = ce.id, V = p.isChrdev(ce.mode) ? 2 : p.isDir(ce.mode) ? 4 : p.isLink(ce.mode) ? 10 : 8;
        }
        Ee[i + f >>> 3 >>> 0] = BigInt(R), Ee[i + f + 8 >>> 3 >>> 0] = BigInt((b + 1) * c), K[i + f + 16 >>> 1 >>> 0] = 280, F[i + f + 18 >>> 0] = V, Ht(G, i + f + 19, 256), f += c;
      }
      return p.llseek(s, b * c, 0), f;
    } catch (ve) {
      if (typeof p > "u" || ve.name !== "ErrnoError") throw ve;
      return -ve.errno;
    }
  }
  function ah(n, i, l) {
    l >>>= 0, H.varargs = l;
    try {
      var s = H.getStreamFromFD(n);
      switch (i) {
        case 21509:
          return s.tty ? 0 : -59;
        case 21505: {
          if (!s.tty) return -59;
          if (s.tty.ops.ioctl_tcgets) {
            var c = s.tty.ops.ioctl_tcgets(s), f = Mn();
            T[f >>> 2 >>> 0] = c.c_iflag || 0, T[f + 4 >>> 2 >>> 0] = c.c_oflag || 0, T[f + 8 >>> 2 >>> 0] = c.c_cflag || 0, T[f + 12 >>> 2 >>> 0] = c.c_lflag || 0;
            for (var v = 0; v < 32; v++)
              F[f + v + 17 >>> 0] = c.c_cc[v] || 0;
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
          return s.tty ? 0 : -59;
        case 21506:
        case 21507:
        case 21508: {
          if (!s.tty) return -59;
          if (s.tty.ops.ioctl_tcsets) {
            for (var f = Mn(), m = T[f >>> 2 >>> 0], _ = T[f + 4 >>> 2 >>> 0], b = T[f + 8 >>> 2 >>> 0], R = T[f + 12 >>> 2 >>> 0], V = [], v = 0; v < 32; v++)
              V.push(F[f + v + 17 >>> 0]);
            return s.tty.ops.ioctl_tcsets(s.tty, i, { c_iflag: m, c_oflag: _, c_cflag: b, c_lflag: R, c_cc: V });
          }
          return 0;
        }
        case 21519: {
          if (!s.tty) return -59;
          var f = Mn();
          return T[f >>> 2 >>> 0] = 0, 0;
        }
        case 21520:
          return s.tty ? -28 : -59;
        case 21537:
        case 21531: {
          var f = Mn();
          return p.ioctl(s, i, f);
        }
        case 21523: {
          if (!s.tty) return -59;
          if (s.tty.ops.ioctl_tiocgwinsz) {
            var G = s.tty.ops.ioctl_tiocgwinsz(s.tty), f = Mn();
            K[f >>> 1 >>> 0] = G[0], K[f + 2 >>> 1 >>> 0] = G[1];
          }
          return 0;
        }
        case 21524:
          return s.tty ? 0 : -59;
        case 21515:
          return s.tty ? 0 : -59;
        default:
          return -28;
      }
    } catch (X) {
      if (typeof p > "u" || X.name !== "ErrnoError") throw X;
      return -X.errno;
    }
  }
  function sh(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return n = H.getStr(n), H.writeStat(i, p.lstat(n));
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  function uh(n, i, l) {
    i >>>= 0;
    try {
      return i = H.getStr(i), i = H.calculateAt(n, i), p.mkdir(i, l, 0), 0;
    } catch (s) {
      if (typeof p > "u" || s.name !== "ErrnoError") throw s;
      return -s.errno;
    }
  }
  function ch(n, i, l, s) {
    i >>>= 0, l >>>= 0;
    try {
      i = H.getStr(i);
      var c = s & 256, f = s & 4096;
      return s = s & -6401, i = H.calculateAt(n, i, f), H.writeStat(l, c ? p.lstat(i) : p.stat(i));
    } catch (v) {
      if (typeof p > "u" || v.name !== "ErrnoError") throw v;
      return -v.errno;
    }
  }
  function fh(n, i, l, s) {
    i >>>= 0, s >>>= 0, H.varargs = s;
    try {
      i = H.getStr(i), i = H.calculateAt(n, i);
      var c = s ? Fo() : 0;
      return p.open(i, l, c).fd;
    } catch (f) {
      if (typeof p > "u" || f.name !== "ErrnoError") throw f;
      return -f.errno;
    }
  }
  function dh(n, i, l, s) {
    i >>>= 0, l >>>= 0, s >>>= 0;
    try {
      if (i = H.getStr(i), i = H.calculateAt(n, i), s <= 0) return -28;
      var c = p.readlink(i), f = Math.min(s, Mt(c)), v = F[l + f >>> 0];
      return Ht(c, l, s + 1), F[l + f >>> 0] = v, f;
    } catch (m) {
      if (typeof p > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  function ph(n, i, l, s) {
    i >>>= 0, s >>>= 0;
    try {
      return i = H.getStr(i), s = H.getStr(s), i = H.calculateAt(n, i), s = H.calculateAt(l, s), p.rename(i, s), 0;
    } catch (c) {
      if (typeof p > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function vh(n) {
    n >>>= 0;
    try {
      return n = H.getStr(n), p.rmdir(n), 0;
    } catch (i) {
      if (typeof p > "u" || i.name !== "ErrnoError") throw i;
      return -i.errno;
    }
  }
  function hh(n, i, l, s, c, f) {
    i >>>= 0, l >>>= 0, c >>>= 0, f >>>= 0;
    try {
      var v = Oe(n);
      if (!c)
        return p.write(v.stream, F, i, l);
      var m = On(c, f);
      return v.sock_ops.sendmsg(v, F, i, l, m.addr, m.port);
    } catch (_) {
      if (typeof p > "u" || _.name !== "ErrnoError") throw _;
      return -_.errno;
    }
  }
  function mh(n, i, l) {
    try {
      var s = ae.createSocket(n, i, l);
      return s.stream.fd;
    } catch (c) {
      if (typeof p > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function gh(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return n = H.getStr(n), H.writeStat(i, p.stat(n));
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  function yh(n, i, l) {
    n >>>= 0, l >>>= 0;
    try {
      return n = H.getStr(n), l = H.getStr(l), l = H.calculateAt(i, l), p.symlink(n, l), 0;
    } catch (s) {
      if (typeof p > "u" || s.name !== "ErrnoError") throw s;
      return -s.errno;
    }
  }
  function _h(n, i, l) {
    i >>>= 0;
    try {
      if (i = H.getStr(i), i = H.calculateAt(n, i), !l)
        p.unlink(i);
      else if (l === 512)
        p.rmdir(i);
      else
        return -28;
      return 0;
    } catch (s) {
      if (typeof p > "u" || s.name !== "ErrnoError") throw s;
      return -s.errno;
    }
  }
  var gc = (n) => re[n >>> 2 >>> 0] + T[n + 4 >>> 2 >>> 0] * 4294967296;
  function wh(n, i, l, s) {
    i >>>= 0, l >>>= 0;
    try {
      i = H.getStr(i), i = H.calculateAt(n, i, !0);
      var c = Date.now(), f, v;
      if (!l)
        f = c, v = c;
      else {
        var m = gc(l), _ = T[l + 8 >>> 2 >>> 0];
        _ == 1073741823 ? f = c : _ == 1073741822 ? f = null : f = m * 1e3 + _ / (1e3 * 1e3), l += 16, m = gc(l), _ = T[l + 8 >>> 2 >>> 0], _ == 1073741823 ? v = c : _ == 1073741822 ? v = null : v = m * 1e3 + _ / (1e3 * 1e3);
      }
      return (v ?? f) !== null && p.utime(i, f, v), 0;
    } catch (b) {
      if (typeof p > "u" || b.name !== "ErrnoError") throw b;
      return -b.errno;
    }
  }
  var xh = () => ye(""), Ei = (n, i) => Object.defineProperty(i, "name", { value: n }), yc = [], un = [0, 1, , 1, null, 1, !0, 1, !1, 1], Ci = class extends Error {
    constructor(i) {
      super(i), this.name = "BindingError";
    }
  }, we = (n) => {
    throw new Ci(n);
  }, Ce = { toValue: (n) => (n || we(`Cannot use deleted val. handle = ${n}`), un[n]), toHandle: (n) => {
    switch (n) {
      case void 0:
        return 2;
      case null:
        return 4;
      case !0:
        return 6;
      case !1:
        return 8;
      default: {
        const i = yc.pop() || un.length;
        return un[i] = n, un[i + 1] = 1, i;
      }
    }
  } };
  class kh extends Error {
  }
  var Ne = (n) => {
    n >>>= 0;
    for (var i = ""; ; ) {
      var l = W[n++ >>> 0];
      if (!l) return i;
      i += String.fromCharCode(l);
    }
  }, bi = {}, _a = (n, i) => {
    for (i === void 0 && we("ptr should not be undefined"); n.baseClass; )
      i = n.upcast(i), n = n.baseClass;
    return i;
  }, Sh = (n, i, l) => {
    i = _a(n, i), bi.hasOwnProperty(i) ? we(`Tried to register registered instance: ${i}`) : bi[i] = l;
  }, cn = {}, _c = (n) => {
    var i = Gc(n), l = Ne(i);
    return pr(i), l;
  }, wa = (n, i) => {
    var l = cn[n];
    return l === void 0 && we(`${i} has unknown type ${_c(n)}`), l;
  }, Eh = (n, i) => {
    i = _a(n, i), bi.hasOwnProperty(i) ? delete bi[i] : we(`Tried to unregister unregistered instance: ${i}`);
  }, $o = (n) => {
  }, xa = !1, Ch = (n) => {
    n.smartPtr ? n.smartPtrType.rawDestructor(n.smartPtr) : n.ptrType.registeredClass.rawDestructor(n.ptr);
  }, wc = (n) => {
    n.count.value -= 1;
    var i = n.count.value === 0;
    i && Ch(n);
  }, In = (n) => globalThis.FinalizationRegistry ? (xa = new FinalizationRegistry((i) => {
    wc(i.$$);
  }), In = (i) => {
    var l = i.$$, s = !!l.smartPtr;
    if (s) {
      var c = { $$: l };
      xa.register(i, c, i);
    }
    return i;
  }, $o = (i) => xa.unregister(i), In(n)) : (In = (i) => i, n);
  function bh(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, n = Ne(n), i = wa(i, "wrapper"), l = Ce.toValue(l);
    var s = i.registeredClass, c = s.instancePrototype, f = s.baseClass, v = f.instancePrototype, m = s.baseClass.constructor, _ = Ei(n, function(...b) {
      for (var R of s.baseClass.pureVirtualFunctions)
        if (this[R] === v[R])
          throw new kh(`Pure virtual function ${R} must be implemented in JavaScript`);
      Object.defineProperty(this, "__parent", { value: c }), this.__construct(...b);
    });
    return c.__construct = function(...R) {
      this === c && we("Pass correct 'this' to __construct");
      var V = m.implement(this, ...R);
      $o(V);
      var G = V.$$;
      V.notifyOnDestruction(), G.preservePointerOnDelete = !0, Object.defineProperties(this, { $$: { value: G } }), In(this), Sh(s, G.ptr, this);
    }, c.__destruct = function() {
      this === c && we("Pass correct 'this' to __destruct"), $o(this), Eh(s, this.$$.ptr);
    }, _.prototype = Object.create(c), Object.assign(_.prototype, l), Ce.toHandle(_);
  }
  var Ao = {}, Pi = (n) => {
    for (; n.length; ) {
      var i = n.pop(), l = n.pop();
      l(i);
    }
  };
  function jn(n) {
    return this.fromWireType(re[n >>> 2 >>> 0]);
  }
  var Nn = {}, Oo = {}, Ph = class extends Error {
    constructor(i) {
      super(i), this.name = "InternalError";
    }
  }, Mo = (n) => {
    throw new Ph(n);
  }, bt = (n, i, l) => {
    n.forEach((m) => Oo[m] = i);
    function s(m) {
      var _ = l(m);
      _.length !== n.length && Mo("Mismatched type converter count");
      for (var b = 0; b < n.length; ++b)
        Pt(n[b], _[b]);
    }
    var c = new Array(i.length), f = [], v = 0;
    for (let [m, _] of i.entries())
      cn.hasOwnProperty(_) ? c[m] = cn[_] : (f.push(_), Nn.hasOwnProperty(_) || (Nn[_] = []), Nn[_].push(() => {
        c[m] = cn[_], ++v, v === f.length && s(c);
      }));
    f.length === 0 && s(c);
  }, Th = function(n) {
    n >>>= 0;
    var i = Ao[n];
    delete Ao[n];
    var l = i.elements, s = l.length, c = l.map((m) => m.getterReturnType).concat(l.map((m) => m.setterArgumentType)), f = i.rawConstructor, v = i.rawDestructor;
    bt([n], c, (m) => {
      for (const [_, b] of l.entries()) {
        const R = m[_], V = b.getter, G = b.getterContext, X = m[_ + s], ce = b.setter, ve = b.setterContext;
        b.read = (ge) => R.fromWireType(V(G, ge)), b.write = (ge, ke) => {
          var De = [];
          ce(ve, ge, X.toWireType(De, ke)), Pi(De);
        };
      }
      return [{ name: i.name, fromWireType: (_) => {
        for (var b = new Array(s), R = 0; R < s; ++R)
          b[R] = l[R].read(_);
        return v(_), b;
      }, toWireType: (_, b) => {
        if (s !== b.length)
          throw new TypeError(`Incorrect number of tuple elements for ${i.name}: expected=${s}, actual=${b.length}`);
        for (var R = f(), V = 0; V < s; ++V)
          l[V].write(R, b[V]);
        return _ !== null && _.push(v, R), R;
      }, readValueFromPointer: jn, destructorFunction: v }];
    });
  }, Io = {}, Lh = function(n) {
    n >>>= 0;
    var i = Io[n];
    delete Io[n];
    var l = i.rawConstructor, s = i.rawDestructor, c = i.fields, f = c.map((v) => v.getterReturnType).concat(c.map((v) => v.setterArgumentType));
    bt([n], f, (v) => {
      var m = {};
      for (var [_, b] of c.entries()) {
        const R = v[_], V = b.getter, G = b.getterContext, X = v[_ + c.length], ce = b.setter, ve = b.setterContext;
        m[b.fieldName] = { read: (ge) => R.fromWireType(V(G, ge)), write: (ge, ke) => {
          var De = [];
          ce(ve, ge, X.toWireType(De, ke)), Pi(De);
        }, optional: R.optional };
      }
      return [{ name: i.name, fromWireType: (R) => {
        var V = {};
        for (var G in m)
          V[G] = m[G].read(R);
        return s(R), V;
      }, toWireType: (R, V) => {
        for (var G in m)
          if (!(G in V) && !m[G].optional)
            throw new TypeError(`Missing field: "${G}"`);
        var X = l();
        for (G in m)
          m[G].write(X, V[G]);
        return R !== null && R.push(s, X), X;
      }, readValueFromPointer: jn, destructorFunction: s }];
    });
  };
  function Dh(n, i, l = {}) {
    var s = i.name;
    if (n || we(`type "${s}" must have a positive integer typeid pointer`), cn.hasOwnProperty(n)) {
      if (l.ignoreDuplicateRegistrations)
        return;
      we(`Cannot register type '${s}' twice`);
    }
    if (cn[n] = i, delete Oo[n], Nn.hasOwnProperty(n)) {
      var c = Nn[n];
      delete Nn[n], c.forEach((f) => f());
    }
  }
  function Pt(n, i, l = {}) {
    return Dh(n, i, l);
  }
  var xc = (n, i, l) => {
    switch (i) {
      case 1:
        return l ? (s) => F[s >>> 0] : (s) => W[s >>> 0];
      case 2:
        return l ? (s) => K[s >>> 1 >>> 0] : (s) => Z[s >>> 1 >>> 0];
      case 4:
        return l ? (s) => T[s >>> 2 >>> 0] : (s) => re[s >>> 2 >>> 0];
      case 8:
        return l ? (s) => Ee[s >>> 3 >>> 0] : (s) => Vt[s >>> 3 >>> 0];
      default:
        throw new TypeError(`invalid integer width (${i}): ${n}`);
    }
  }, Rh = function(n, i, l, s, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = Ne(i);
    const f = s === 0n;
    let v = (m) => m;
    if (f) {
      const m = l * 8;
      v = (_) => BigInt.asUintN(m, _), c = v(c);
    }
    Pt(n, { name: i, fromWireType: v, toWireType: (m, _) => (typeof _ == "number" && (_ = BigInt(_)), _), readValueFromPointer: xc(i, l, !f), destructorFunction: null });
  };
  function Fh(n, i, l, s) {
    n >>>= 0, i >>>= 0, i = Ne(i), Pt(n, { name: i, fromWireType: function(c) {
      return !!c;
    }, toWireType: function(c, f) {
      return f ? l : s;
    }, readValueFromPointer: function(c) {
      return this.fromWireType(W[c >>> 0]);
    }, destructorFunction: null });
  }
  var $h = (n) => ({ count: n.count, deleteScheduled: n.deleteScheduled, preservePointerOnDelete: n.preservePointerOnDelete, ptr: n.ptr, ptrType: n.ptrType, smartPtr: n.smartPtr, smartPtrType: n.smartPtrType }), ka = (n) => {
    function i(l) {
      return l.$$.ptrType.registeredClass.name;
    }
    we(i(n) + " instance already deleted");
  }, Ah = () => {
    let n = jo.prototype;
    Object.assign(n, { isAliasOf(l) {
      if (!(this instanceof jo) || !(l instanceof jo))
        return !1;
      var s = this.$$.ptrType.registeredClass, c = this.$$.ptr;
      l.$$ = l.$$;
      for (var f = l.$$.ptrType.registeredClass, v = l.$$.ptr; s.baseClass; )
        c = s.upcast(c), s = s.baseClass;
      for (; f.baseClass; )
        v = f.upcast(v), f = f.baseClass;
      return s === f && c === v;
    }, clone() {
      if (this.$$.ptr || ka(this), this.$$.preservePointerOnDelete)
        return this.$$.count.value += 1, this;
      var l = In(Object.create(Object.getPrototypeOf(this), { $$: { value: $h(this.$$) } }));
      return l.$$.count.value += 1, l.$$.deleteScheduled = !1, l;
    }, delete() {
      this.$$.ptr || ka(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && we("Object already scheduled for deletion"), $o(this), wc(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
    }, isDeleted() {
      return !this.$$.ptr;
    }, deleteLater() {
      return this.$$.ptr || ka(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && we("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
    } });
    const i = Symbol.dispose;
    i && (n[i] = n.delete);
  };
  function jo() {
  }
  var kc = {}, Sa = (n, i, l) => {
    if (n[i].overloadTable === void 0) {
      var s = n[i];
      n[i] = function(...c) {
        return n[i].overloadTable.hasOwnProperty(c.length) || we(`Function '${l}' called with an invalid number of arguments (${c.length}) - expects one of (${n[i].overloadTable})!`), n[i].overloadTable[c.length].apply(this, c);
      }, n[i].overloadTable = [], n[i].overloadTable[s.argCount] = s;
    }
  }, Ti = (n, i, l) => {
    r.hasOwnProperty(n) ? ((l === void 0 || r[n].overloadTable !== void 0 && r[n].overloadTable[l] !== void 0) && we(`Cannot register public name '${n}' twice`), Sa(r, n, n), r[n].overloadTable.hasOwnProperty(l) && we(`Cannot register multiple overloads of a function with the same number of arguments (${l})!`), r[n].overloadTable[l] = i) : (r[n] = i, r[n].argCount = l);
  }, Oh = 48, Mh = 57, Ih = (n) => {
    n = n.replace(/[^a-zA-Z0-9_]/g, "$");
    var i = n.charCodeAt(0);
    return i >= Oh && i <= Mh ? `_${n}` : n;
  };
  function jh(n, i, l, s, c, f, v, m) {
    this.name = n, this.constructor = i, this.instancePrototype = l, this.rawDestructor = s, this.baseClass = c, this.getActualType = f, this.upcast = v, this.downcast = m, this.pureVirtualFunctions = [];
  }
  var No = (n, i, l) => {
    for (; i !== l; )
      i.upcast || we(`Expected null or instance of ${l.name}, got an instance of ${i.name}`), n = i.upcast(n), i = i.baseClass;
    return n;
  }, Ea = (n) => {
    if (n === null)
      return "null";
    var i = typeof n;
    return i === "object" || i === "array" || i === "function" ? n.toString() : "" + n;
  };
  function Nh(n, i) {
    if (i === null)
      return this.isReference && we(`null is not a valid ${this.name}`), 0;
    i.$$ || we(`Cannot pass "${Ea(i)}" as a ${this.name}`), i.$$.ptr || we(`Cannot pass deleted object as a pointer of type ${this.name}`);
    var l = i.$$.ptrType.registeredClass, s = No(i.$$.ptr, l, this.registeredClass);
    return s;
  }
  function zh(n, i) {
    var l;
    if (i === null)
      return this.isReference && we(`null is not a valid ${this.name}`), this.isSmartPointer ? (l = this.rawConstructor(), n !== null && n.push(this.rawDestructor, l), l) : 0;
    (!i || !i.$$) && we(`Cannot pass "${Ea(i)}" as a ${this.name}`), i.$$.ptr || we(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && i.$$.ptrType.isConst && we(`Cannot convert argument of type ${i.$$.smartPtrType ? i.$$.smartPtrType.name : i.$$.ptrType.name} to parameter type ${this.name}`);
    var s = i.$$.ptrType.registeredClass;
    if (l = No(i.$$.ptr, s, this.registeredClass), this.isSmartPointer)
      switch (i.$$.smartPtr === void 0 && we("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
        case 0:
          i.$$.smartPtrType === this ? l = i.$$.smartPtr : we(`Cannot convert argument of type ${i.$$.smartPtrType ? i.$$.smartPtrType.name : i.$$.ptrType.name} to parameter type ${this.name}`);
          break;
        case 1:
          l = i.$$.smartPtr;
          break;
        case 2:
          if (i.$$.smartPtrType === this)
            l = i.$$.smartPtr;
          else {
            var c = i.clone();
            l = this.rawShare(l, Ce.toHandle(() => c.delete())), n !== null && n.push(this.rawDestructor, l);
          }
          break;
        default:
          we("Unsupported sharing policy");
      }
    return l;
  }
  function Bh(n, i) {
    if (i === null)
      return this.isReference && we(`null is not a valid ${this.name}`), 0;
    i.$$ || we(`Cannot pass "${Ea(i)}" as a ${this.name}`), i.$$.ptr || we(`Cannot pass deleted object as a pointer of type ${this.name}`), i.$$.ptrType.isConst && we(`Cannot convert argument of type ${i.$$.ptrType.name} to parameter type ${this.name}`);
    var l = i.$$.ptrType.registeredClass, s = No(i.$$.ptr, l, this.registeredClass);
    return s;
  }
  var Sc = (n, i, l) => {
    if (i === l)
      return n;
    if (l.baseClass === void 0)
      return null;
    var s = Sc(n, i, l.baseClass);
    return s === null ? null : l.downcast(s);
  }, Uh = (n, i) => (i = _a(n, i), bi[i]), zo = (n, i) => {
    (!i.ptrType || !i.ptr) && Mo("makeClassHandle requires ptr and ptrType");
    var l = !!i.smartPtrType, s = !!i.smartPtr;
    return l !== s && Mo("Both smartPtrType and smartPtr must be specified"), i.count = { value: 1 }, In(Object.create(n, { $$: { value: i, writable: !0 } }));
  };
  function Vh(n) {
    var i = this.getPointee(n);
    if (!i)
      return this.destructor(n), null;
    var l = Uh(this.registeredClass, i);
    if (l !== void 0) {
      if (l.$$.count.value === 0)
        return l.$$.ptr = i, l.$$.smartPtr = n, l.clone();
      var s = l.clone();
      return this.destructor(n), s;
    }
    function c() {
      return this.isSmartPointer ? zo(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: i, smartPtrType: this, smartPtr: n }) : zo(this.registeredClass.instancePrototype, { ptrType: this, ptr: n });
    }
    var f = this.registeredClass.getActualType(i), v = kc[f];
    if (!v)
      return c.call(this);
    var m;
    this.isConst ? m = v.constPointerType : m = v.pointerType;
    var _ = Sc(i, this.registeredClass, m.registeredClass);
    return _ === null ? c.call(this) : this.isSmartPointer ? zo(m.registeredClass.instancePrototype, { ptrType: m, ptr: _, smartPtrType: this, smartPtr: n }) : zo(m.registeredClass.instancePrototype, { ptrType: m, ptr: _ });
  }
  var Wh = () => {
    Object.assign(Li.prototype, { getPointee(n) {
      return this.rawGetPointee && (n = this.rawGetPointee(n)), n;
    }, destructor(n) {
      var i;
      (i = this.rawDestructor) == null || i.call(this, n);
    }, readValueFromPointer: jn, fromWireType: Vh });
  };
  function Li(n, i, l, s, c, f, v, m, _, b, R) {
    this.name = n, this.registeredClass = i, this.isReference = l, this.isConst = s, this.isSmartPointer = c, this.pointeeType = f, this.sharingPolicy = v, this.rawGetPointee = m, this.rawConstructor = _, this.rawShare = b, this.rawDestructor = R, !c && i.baseClass === void 0 ? s ? (this.toWireType = Nh, this.destructorFunction = null) : (this.toWireType = Bh, this.destructorFunction = null) : this.toWireType = zh;
  }
  var Ec = (n, i, l) => {
    r.hasOwnProperty(n) || Mo("Replacing nonexistent public symbol"), r[n].overloadTable !== void 0 && l !== void 0 ? r[n].overloadTable[l] = i : (r[n] = i, r[n].argCount = l);
  }, Cc = [], Ca = (n) => {
    var i = Cc[n];
    return i || (Cc[n] = i = nf.get(n)), i;
  }, Hh = (n, i, l = [], s = !1) => {
    var c = Ca(i), f = c(...l);
    function v(m) {
      return n[0] == "p" ? m >>> 0 : m;
    }
    return v(f);
  }, Gh = (n, i, l = !1) => (...s) => Hh(n, i, s, l), Ke = (n, i, l = !1) => {
    n = Ne(n);
    function s() {
      if (n.includes("p"))
        return Gh(n, i, l);
      var f = Ca(i);
      return f;
    }
    var c = s();
    return typeof c != "function" && we(`unknown function pointer with signature ${n}: ${i}`), c;
  };
  class Xh extends Error {
  }
  var fn = (n, i) => {
    var l = [], s = {};
    function c(f) {
      if (!s[f] && !cn[f]) {
        if (Oo[f]) {
          Oo[f].forEach(c);
          return;
        }
        l.push(f), s[f] = !0;
      }
    }
    throw i.forEach(c), new Xh(`${n}: ` + l.map(_c).join([", "]));
  };
  function Yh(n, i, l, s, c, f, v, m, _, b, R, V, G) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0, m >>>= 0, _ >>>= 0, b >>>= 0, R >>>= 0, V >>>= 0, G >>>= 0, R = Ne(R), f = Ke(c, f), m && (m = Ke(v, m)), b && (b = Ke(_, b)), G = Ke(V, G);
    var X = Ih(R);
    Ti(X, function() {
      fn(`Cannot construct ${R} due to unbound types`, [s]);
    }), bt([n, i, l], s ? [s] : [], (ce) => {
      var Bn;
      ce = ce[0];
      var ve, ge;
      s ? (ve = ce.registeredClass, ge = ve.instancePrototype) : ge = jo.prototype;
      var ke = Ei(R, function(...Fi) {
        if (Object.getPrototypeOf(this) !== De)
          throw new Ci(`Use 'new' to construct ${R}`);
        if (Me.constructor_body === void 0)
          throw new Ci(`${R} has no accessible constructor`);
        var sf = Me.constructor_body[Fi.length];
        if (sf === void 0)
          throw new Ci(`Tried to invoke ctor of ${R} with invalid number of parameters (${Fi.length}) - expected (${Object.keys(Me.constructor_body).toString()}) parameters instead!`);
        return sf.apply(this, Fi);
      }), De = Object.create(ge, { constructor: { value: ke } });
      ke.prototype = De;
      var Me = new jh(R, ke, De, G, ve, f, m, b);
      Me.baseClass && ((Bn = Me.baseClass).__derivedClasses ?? (Bn.__derivedClasses = []), Me.baseClass.__derivedClasses.push(Me));
      var Re = new Li(R, Me, !0, !1, !1), wt = new Li(R + "*", Me, !1, !1, !1), Ae = new Li(R + " const*", Me, !1, !0, !1);
      return kc[n] = { pointerType: wt, constPointerType: Ae }, Ec(X, ke), [Re, wt, Ae];
    });
  }
  function bc(n) {
    for (var i = 1; i < n.length; ++i)
      if (n[i] !== null && n[i].destructorFunction === void 0)
        return !0;
    return !1;
  }
  function Kh(n, i, l, s) {
    var c = bc(n), f = n.length - 2, v = [], m = ["fn"];
    i && m.push("thisWired");
    for (var _ = 0; _ < f; ++_)
      v.push(`arg${_}`), m.push(`arg${_}Wired`);
    v = v.join(","), m = m.join(",");
    var b = `return function (${v}) {
`;
    c && (b += `var destructors = [];
`);
    var R = c ? "destructors" : "null", V = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    i && (b += `var thisWired = toClassParamWire(${R}, this);
`);
    for (var _ = 0; _ < f; ++_) {
      var G = `toArg${_}Wire`;
      b += `var arg${_}Wired = ${G}(${R}, arg${_});
`, V.push(G);
    }
    if (b += (l || s ? "var rv = " : "") + `invoker(${m});
`, c)
      b += `runDestructors(destructors);
`;
    else
      for (var _ = i ? 1 : 2; _ < n.length; ++_) {
        var X = _ === 1 ? "thisWired" : "arg" + (_ - 2) + "Wired";
        n[_].destructorFunction !== null && (b += `${X}_dtor(${X});
`, V.push(`${X}_dtor`));
      }
    return l && (b += `var ret = fromRetWire(rv);
return ret;
`), b += `}
`, new Function(V, b);
  }
  function Bo(n, i, l, s, c, f) {
    var v = i.length;
    v < 2 && we("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var m = i[1] !== null && l !== null, _ = bc(i), b = !i[0].isVoid, R = i[0], V = i[1], G = [n, we, s, c, Pi, R.fromWireType.bind(R), V == null ? void 0 : V.toWireType.bind(V)], X = 2; X < v; ++X) {
      var ce = i[X];
      G.push(ce.toWireType.bind(ce));
    }
    if (!_)
      for (var X = m ? 1 : 2; X < i.length; ++X)
        i[X].destructorFunction !== null && G.push(i[X].destructorFunction);
    var ge = Kh(i, m, b, f)(...G);
    return Ei(n, ge);
  }
  var Uo = (n, i) => {
    for (var l = [], s = 0; s < n; s++)
      l.push(re[i + s * 4 >>> 2 >>> 0]);
    return l;
  }, ba = (n) => {
    n = n.trim();
    const i = n.indexOf("(");
    return i === -1 ? n : n.slice(0, i);
  }, Qh = function(n, i, l, s, c, f, v, m, _) {
    n >>>= 0, i >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0;
    var b = Uo(l, s);
    i = Ne(i), i = ba(i), f = Ke(c, f, m), bt([], [n], (R) => {
      R = R[0];
      var V = `${R.name}.${i}`;
      function G() {
        fn(`Cannot call ${V} due to unbound types`, b);
      }
      i.startsWith("@@") && (i = Symbol[i.substring(2)]);
      var X = R.registeredClass.constructor;
      return X[i] === void 0 ? (G.argCount = l - 1, X[i] = G) : (Sa(X, i, V), X[i].overloadTable[l - 1] = G), bt([], b, (ce) => {
        var ve = [ce[0], null].concat(ce.slice(1)), ge = Bo(V, ve, null, f, v, m);
        if (X[i].overloadTable === void 0 ? (ge.argCount = l - 1, X[i] = ge) : X[i].overloadTable[l - 1] = ge, R.registeredClass.__derivedClasses)
          for (const ke of R.registeredClass.__derivedClasses)
            ke.constructor.hasOwnProperty(i) || (ke.constructor[i] = ge);
        return [];
      }), [];
    });
  }, Zh = function(n, i, l, s, c, f) {
    n >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0;
    var v = Uo(i, l);
    c = Ke(s, c), bt([], [n], (m) => {
      m = m[0];
      var _ = `constructor ${m.name}`;
      if (m.registeredClass.constructor_body === void 0 && (m.registeredClass.constructor_body = []), m.registeredClass.constructor_body[i - 1] !== void 0)
        throw new Ci(`Cannot register multiple constructors with identical number of parameters (${i - 1}) for class '${m.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      return m.registeredClass.constructor_body[i - 1] = () => {
        fn(`Cannot construct ${m.name} due to unbound types`, v);
      }, bt([], v, (b) => (b.splice(1, 0, null), m.registeredClass.constructor_body[i - 1] = Bo(_, b, null, c, f), [])), [];
    });
  }, qh = function(n, i, l, s, c, f, v, m, _, b) {
    n >>>= 0, i >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0;
    var R = Uo(l, s);
    i = Ne(i), i = ba(i), f = Ke(c, f, _), bt([], [n], (V) => {
      V = V[0];
      var G = `${V.name}.${i}`;
      i.startsWith("@@") && (i = Symbol[i.substring(2)]), m && V.registeredClass.pureVirtualFunctions.push(i);
      function X() {
        fn(`Cannot call ${G} due to unbound types`, R);
      }
      var ce = V.registeredClass.instancePrototype, ve = ce[i];
      return ve === void 0 || ve.overloadTable === void 0 && ve.className !== V.name && ve.argCount === l - 2 ? (X.argCount = l - 2, X.className = V.name, ce[i] = X) : (Sa(ce, i, G), ce[i].overloadTable[l - 2] = X), bt([], R, (ge) => {
        var ke = Bo(G, ge, V, f, v, _);
        return ce[i].overloadTable === void 0 ? (ke.argCount = l - 2, ce[i] = ke) : ce[i].overloadTable[l - 2] = ke, [];
      }), [];
    });
  }, Pc = (n, i, l) => (n instanceof Object || we(`${l} with invalid "this": ${n}`), n instanceof i.registeredClass.constructor || we(`${l} incompatible with "this" of type ${n.constructor.name}`), n.$$.ptr || we(`cannot call emscripten binding method ${l} on deleted object`), No(n.$$.ptr, n.$$.ptrType.registeredClass, i.registeredClass)), Jh = function(n, i, l, s, c, f, v, m, _, b) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0, m >>>= 0, _ >>>= 0, b >>>= 0, i = Ne(i), c = Ke(s, c), bt([], [n], (R) => {
      R = R[0];
      var V = `${R.name}.${i}`, G = { get() {
        fn(`Cannot access ${V} due to unbound types`, [l, v]);
      }, enumerable: !0, configurable: !0 };
      return _ ? G.set = () => fn(`Cannot access ${V} due to unbound types`, [l, v]) : G.set = (X) => we(V + " is a read-only property"), Object.defineProperty(R.registeredClass.instancePrototype, i, G), bt([], _ ? [l, v] : [l], (X) => {
        var ce = X[0], ve = { get() {
          var ke = Pc(this, R, V + " getter");
          return ce.fromWireType(c(f, ke));
        }, enumerable: !0 };
        if (_) {
          _ = Ke(m, _);
          var ge = X[1];
          ve.set = function(ke) {
            var De = Pc(this, R, V + " setter"), Me = [];
            _(b, De, ge.toWireType(Me, ke)), Pi(Me);
          };
        }
        return Object.defineProperty(R.registeredClass.instancePrototype, i, ve), [];
      }), [];
    });
  };
  function Pa(n) {
    n >>>= 0, n > 9 && --un[n + 1] === 0 && (un[n] = void 0, yc.push(n));
  }
  var Tc = { name: "emscripten::val", fromWireType: (n) => {
    var i = Ce.toValue(n);
    return Pa(n), i;
  }, toWireType: (n, i) => Ce.toHandle(i), readValueFromPointer: jn, destructorFunction: null };
  function Lc(n) {
    return n >>>= 0, Pt(n, Tc);
  }
  var Ta = (n, i, l) => {
    switch (i) {
      case 1:
        return l ? function(s) {
          return this.fromWireType(F[s >>> 0]);
        } : function(s) {
          return this.fromWireType(W[s >>> 0]);
        };
      case 2:
        return l ? function(s) {
          return this.fromWireType(K[s >>> 1 >>> 0]);
        } : function(s) {
          return this.fromWireType(Z[s >>> 1 >>> 0]);
        };
      case 4:
        return l ? function(s) {
          return this.fromWireType(T[s >>> 2 >>> 0]);
        } : function(s) {
          return this.fromWireType(re[s >>> 2 >>> 0]);
        };
      default:
        throw new TypeError(`invalid integer width (${i}): ${n}`);
    }
  };
  function em(n) {
    return n === 0 ? "object" : n === 1 ? "number" : "string";
  }
  function tm(n, i, l, s, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = Ne(i);
    const f = em(c);
    switch (f) {
      case "object": {
        let b = function() {
        };
        b.values = {}, Pt(n, { name: i, constructor: b, valueType: f, fromWireType: function(R) {
          return this.constructor.values[R];
        }, toWireType: (R, V) => V.value, readValueFromPointer: Ta(i, l, s), destructorFunction: null }), Ti(i, b);
        break;
      }
      case "number": {
        var v = {};
        Pt(n, { name: i, keysMap: v, valueType: f, fromWireType: (b) => b, toWireType: (b, R) => R, readValueFromPointer: Ta(i, l, s), destructorFunction: null }), Ti(i, v), delete r[i].argCount;
        break;
      }
      case "string": {
        var m = {}, _ = {}, v = {};
        Pt(n, { name: i, valuesMap: m, reverseMap: _, keysMap: v, valueType: f, fromWireType: function(R) {
          return this.reverseMap[R];
        }, toWireType: function(R, V) {
          return this.valuesMap[V];
        }, readValueFromPointer: Ta(i, l, s), destructorFunction: null }), Ti(i, v), delete r[i].argCount;
        break;
      }
    }
  }
  function rm(n, i, l) {
    n >>>= 0, i >>>= 0;
    var s = wa(n, "enum");
    switch (i = Ne(i), s.valueType) {
      case "object": {
        var c = s.constructor, f = Object.create(s.constructor.prototype, { value: { value: l }, constructor: { value: Ei(`${s.name}_${i}`, function() {
        }) } });
        c.values[l] = f, c[i] = f;
        break;
      }
      case "number": {
        s.keysMap[i] = l;
        break;
      }
      case "string": {
        s.valuesMap[i] = l, s.reverseMap[l] = i, s.keysMap[i] = i;
        break;
      }
    }
  }
  var nm = (n, i) => {
    switch (i) {
      case 4:
        return function(l) {
          return this.fromWireType(pe[l >>> 2 >>> 0]);
        };
      case 8:
        return function(l) {
          return this.fromWireType(Ct[l >>> 3 >>> 0]);
        };
      default:
        throw new TypeError(`invalid float width (${i}): ${n}`);
    }
  }, im = function(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = Ne(i), Pt(n, { name: i, fromWireType: (s) => s, toWireType: (s, c) => c, readValueFromPointer: nm(i, l), destructorFunction: null });
  };
  function om(n, i, l, s, c, f, v, m) {
    n >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0;
    var _ = Uo(i, l);
    n = Ne(n), n = ba(n), c = Ke(s, c, v), Ti(n, function() {
      fn(`Cannot call ${n} due to unbound types`, _);
    }, i - 1), bt([], _, (b) => {
      var R = [b[0], null].concat(b.slice(1));
      return Ec(n, Bo(n, R, null, c, f, v), i - 1), [];
    });
  }
  var lm = function(n, i, l, s, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = Ne(i);
    const f = s === 0;
    let v = (_) => _;
    if (f) {
      var m = 32 - 8 * l;
      v = (_) => _ << m >>> m, c = v(c);
    }
    Pt(n, { name: i, fromWireType: v, toWireType: (_, b) => b, readValueFromPointer: xc(i, l, s !== 0), destructorFunction: null });
  }, am = (n, i, l) => {
    const s = (c, f) => {
      let v = 0;
      return { next() {
        if (v >= c)
          return { done: !0 };
        const m = v;
        return v++, { value: f(m), done: !1 };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
    n[Symbol.iterator] || (n[Symbol.iterator] = function() {
      const c = this[i]();
      return s(c, (f) => this[l](f));
    });
  }, sm = function(n, i, l, s) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, l = Ne(l), s = Ne(s), bt([], [n, i], (c) => {
      const f = c[0];
      return am(f.registeredClass.instancePrototype, l, s), [];
    });
  };
  function um(n, i, l) {
    n >>>= 0, l >>>= 0;
    var s = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array], c = s[i];
    function f(v) {
      var m = re[v >>> 2 >>> 0], _ = re[v + 4 >>> 2 >>> 0];
      return new c(F.buffer, _, m);
    }
    l = Ne(l), Pt(n, { name: l, fromWireType: f, readValueFromPointer: f }, { ignoreDuplicateRegistrations: !0 });
  }
  var cm = Object.assign({ optional: !0 }, Tc);
  function fm(n, i) {
    n >>>= 0, Pt(n, cm);
  }
  var dm = function(n, i, l, s, c, f, v, m, _, b, R, V) {
    n >>>= 0, i >>>= 0, l >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0, m >>>= 0, _ >>>= 0, b >>>= 0, R >>>= 0, V >>>= 0, l = Ne(l), f = Ke(c, f), m = Ke(v, m), b = Ke(_, b), V = Ke(R, V), bt([n], [i], (G) => {
      G = G[0];
      var X = new Li(l, G.registeredClass, !1, !1, !0, G, s, f, m, b, V);
      return [X];
    });
  };
  function pm(n, i) {
    n >>>= 0, i >>>= 0, i = Ne(i), Pt(n, { name: i, fromWireType(l) {
      var s = re[l >>> 2 >>> 0], c = l + 4, f;
      return f = se(c, s, !0), pr(l), f;
    }, toWireType(l, s) {
      s instanceof ArrayBuffer && (s = new Uint8Array(s));
      var c, f = typeof s == "string";
      f || ArrayBuffer.isView(s) && s.BYTES_PER_ELEMENT == 1 || we("Cannot pass non-string to std::string"), f ? c = Mt(s) : c = s.length;
      var v = zn(4 + c + 1), m = v + 4;
      return re[v >>> 2 >>> 0] = c, f ? Ht(s, m, c + 1) : W.set(s, m >>> 0), l !== null && l.push(pr, v), v;
    }, readValueFromPointer: jn, destructorFunction(l) {
      pr(l);
    } });
  }
  var Dc = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, vm = (n, i, l) => {
    var s = n >>> 1, c = kr(Z, s, i / 2, l);
    if (c - s > 16 && Dc) return Dc.decode(Z.subarray(s >>> 0, c >>> 0));
    for (var f = "", v = s; v < c; ++v) {
      var m = Z[v >>> 0];
      f += String.fromCharCode(m);
    }
    return f;
  }, hm = (n, i, l) => {
    if (l ?? (l = 2147483647), l < 2) return 0;
    l -= 2;
    for (var s = i, c = l < n.length * 2 ? l / 2 : n.length, f = 0; f < c; ++f) {
      var v = n.charCodeAt(f);
      K[i >>> 1 >>> 0] = v, i += 2;
    }
    return K[i >>> 1 >>> 0] = 0, i - s;
  }, mm = (n) => n.length * 2, gm = (n, i, l) => {
    for (var s = "", c = n >>> 2, f = 0; !(f >= i / 4); f++) {
      var v = re[c + f >>> 0];
      if (!v && !l) break;
      s += String.fromCodePoint(v);
    }
    return s;
  }, ym = (n, i, l) => {
    if (i >>>= 0, l ?? (l = 2147483647), l < 4) return 0;
    for (var s = i, c = s + l - 4, f = 0; f < n.length; ++f) {
      var v = n.codePointAt(f);
      if (v > 65535 && f++, T[i >>> 2 >>> 0] = v, i += 4, i + 4 > c) break;
    }
    return T[i >>> 2 >>> 0] = 0, i - s;
  }, _m = (n) => {
    for (var i = 0, l = 0; l < n.length; ++l) {
      var s = n.codePointAt(l);
      s > 65535 && l++, i += 4;
    }
    return i;
  };
  function wm(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, l = Ne(l);
    var s, c, f;
    i === 2 ? (s = vm, c = hm, f = mm) : (s = gm, c = ym, f = _m), Pt(n, { name: l, fromWireType: (v) => {
      var m = re[v >>> 2 >>> 0], _ = s(v + 4, m * i, !0);
      return pr(v), _;
    }, toWireType: (v, m) => {
      typeof m != "string" && we(`Cannot pass non-string to C++ string type ${l}`);
      var _ = f(m), b = zn(4 + _ + i);
      return re[b >>> 2 >>> 0] = _ / i, c(m, b + 4, _ + i), v !== null && v.push(pr, b), b;
    }, readValueFromPointer: jn, destructorFunction(v) {
      pr(v);
    } });
  }
  function xm(n, i) {
    n >>>= 0, Lc(n);
  }
  function km(n, i, l, s, c, f) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, Ao[n] = { name: Ne(i), rawConstructor: Ke(l, s), rawDestructor: Ke(c, f), elements: [] };
  }
  function Sm(n, i, l, s, c, f, v, m, _) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0, m >>>= 0, _ >>>= 0, Ao[n].elements.push({ getterReturnType: i, getter: Ke(l, s), getterContext: c, setterArgumentType: f, setter: Ke(v, m), setterContext: _ });
  }
  function Em(n, i, l, s, c, f) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, Io[n] = { name: Ne(i), rawConstructor: Ke(l, s), rawDestructor: Ke(c, f), fields: [] };
  }
  function Cm(n, i, l, s, c, f, v, m, _, b) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, f >>>= 0, v >>>= 0, m >>>= 0, _ >>>= 0, b >>>= 0, Io[n].fields.push({ fieldName: Ne(i), getterReturnType: l, getter: Ke(s, c), getterContext: f, setterArgumentType: v, setter: Ke(m, _), setterContext: b });
  }
  var bm = function(n, i) {
    n >>>= 0, i >>>= 0, i = Ne(i), Pt(n, { isVoid: !0, name: i, fromWireType: () => {
    }, toWireType: (l, s) => {
    } });
  };
  function Pm(n, i) {
    n >>>= 0, i >>>= 0, n = Ce.toValue(n), i = Ce.toValue(i), n.set(i);
  }
  var La = [], Tm = (n) => {
    var i = La.length;
    return La.push(n), i;
  }, Lm = (n, i) => {
    for (var l = new Array(n), s = 0; s < n; ++s)
      l[s] = wa(re[i + s * 4 >>> 2 >>> 0], `parameter ${s}`);
    return l;
  }, Dm = (n, i, l) => {
    var s = [], c = n(s, l);
    return s.length && (re[i >>> 2 >>> 0] = Ce.toHandle(s)), c;
  }, Rm = {}, Vo = (n) => {
    var i = Rm[n];
    return i === void 0 ? Ne(n) : i;
  }, Fm = function(n, i, l) {
    i >>>= 0;
    var s = 8, [c, ...f] = Lm(n, i), v = c.toWireType.bind(c), m = f.map((X) => X.readValueFromPointer.bind(X));
    n--;
    var _ = { toValue: Ce.toValue }, b = m.map((X, ce) => {
      var ve = `argFromPtr${ce}`;
      return _[ve] = X, `${ve}(args${ce ? "+" + ce * s : ""})`;
    }), R;
    switch (l) {
      case 0:
        R = "toValue(handle)";
        break;
      case 2:
        R = "new (toValue(handle))";
        break;
      case 3:
        R = "";
        break;
      case 1:
        _.getStringOrSymbol = Vo, R = "toValue(handle)[getStringOrSymbol(methodName)]";
        break;
    }
    R += `(${b})`, c.isVoid || (_.toReturnWire = v, _.emval_returnValue = Dm, R = `return emval_returnValue(toReturnWire, destructorsRef, ${R})`), R = `return function (handle, methodName, destructorsRef, args) {
${R}
}`;
    var V = new Function(Object.keys(_), R)(...Object.values(_)), G = `methodCaller<(${f.map((X) => X.name)}) => ${c.name}>`;
    return Tm(Ei(G, V));
  };
  function $m(n) {
    return n >>>= 0, n ? (n = Vo(n), Ce.toHandle(globalThis[n])) : Ce.toHandle(globalThis);
  }
  function Am(n) {
    return n >>>= 0, n = Vo(n), Ce.toHandle(r[n]);
  }
  function Om(n, i) {
    return n >>>= 0, i >>>= 0, n = Ce.toValue(n), i = Ce.toValue(i), Ce.toHandle(n[i]);
  }
  function Mm(n) {
    n >>>= 0, n > 9 && (un[n + 1] += 1);
  }
  function Im(n, i) {
    return n >>>= 0, i >>>= 0, n = Ce.toValue(n), i = Ce.toValue(i), n instanceof i;
  }
  function jm(n, i, l, s, c) {
    return n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, c >>>= 0, La[n](i, l, s, c);
  }
  function Nm(n) {
    return n >>>= 0, n = Ce.toValue(n), Ce.toHandle(n[Symbol.iterator]());
  }
  function zm(n) {
    n >>>= 0, n = Ce.toValue(n);
    var i = n.next();
    return i.done ? 0 : Ce.toHandle(i.value);
  }
  function Bm() {
    return Ce.toHandle([]);
  }
  function Um(n) {
    n >>>= 0, n = Ce.toValue(n);
    for (var i = new Array(n.length), l = 0; l < n.length; l++) i[l] = n[l];
    return Ce.toHandle(i);
  }
  function Vm(n) {
    return n >>>= 0, Ce.toHandle(Vo(n));
  }
  function Wm() {
    return Ce.toHandle({});
  }
  function Hm(n) {
    n >>>= 0;
    var i = Ce.toValue(n);
    Pi(i), Pa(n);
  }
  function Gm(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, n = Ce.toValue(n), i = Ce.toValue(i), l = Ce.toValue(l), n[i] = l;
  }
  function Xm(n, i) {
    return n >>>= 0, i >>>= 0, n = Ce.toValue(n), i = Ce.toValue(i), n === i;
  }
  function Ym(n) {
    return n >>>= 0, n = Ce.toValue(n), Ce.toHandle(typeof n);
  }
  function Km(n, i) {
    n = de(n), i >>>= 0;
    var l = new Date(n * 1e3);
    T[i >>> 2 >>> 0] = l.getUTCSeconds(), T[i + 4 >>> 2 >>> 0] = l.getUTCMinutes(), T[i + 8 >>> 2 >>> 0] = l.getUTCHours(), T[i + 12 >>> 2 >>> 0] = l.getUTCDate(), T[i + 16 >>> 2 >>> 0] = l.getUTCMonth(), T[i + 20 >>> 2 >>> 0] = l.getUTCFullYear() - 1900, T[i + 24 >>> 2 >>> 0] = l.getUTCDay();
    var s = Date.UTC(l.getUTCFullYear(), 0, 1, 0, 0, 0, 0), c = (l.getTime() - s) / (1e3 * 60 * 60 * 24) | 0;
    T[i + 28 >>> 2 >>> 0] = c;
  }
  var Qm = (n) => n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0), Zm = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], qm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Rc = (n) => {
    var i = Qm(n.getFullYear()), l = i ? Zm : qm, s = l[n.getMonth()] + n.getDate() - 1;
    return s;
  };
  function Jm(n, i) {
    n = de(n), i >>>= 0;
    var l = new Date(n * 1e3);
    T[i >>> 2 >>> 0] = l.getSeconds(), T[i + 4 >>> 2 >>> 0] = l.getMinutes(), T[i + 8 >>> 2 >>> 0] = l.getHours(), T[i + 12 >>> 2 >>> 0] = l.getDate(), T[i + 16 >>> 2 >>> 0] = l.getMonth(), T[i + 20 >>> 2 >>> 0] = l.getFullYear() - 1900, T[i + 24 >>> 2 >>> 0] = l.getDay();
    var s = Rc(l) | 0;
    T[i + 28 >>> 2 >>> 0] = s, T[i + 36 >>> 2 >>> 0] = -(l.getTimezoneOffset() * 60);
    var c = new Date(l.getFullYear(), 0, 1), f = new Date(l.getFullYear(), 6, 1).getTimezoneOffset(), v = c.getTimezoneOffset(), m = (f != v && l.getTimezoneOffset() == Math.min(v, f)) | 0;
    T[i + 32 >>> 2 >>> 0] = m;
  }
  var eg = function(n) {
    n >>>= 0;
    var i = (() => {
      var l = new Date(T[n + 20 >>> 2 >>> 0] + 1900, T[n + 16 >>> 2 >>> 0], T[n + 12 >>> 2 >>> 0], T[n + 8 >>> 2 >>> 0], T[n + 4 >>> 2 >>> 0], T[n >>> 2 >>> 0], 0), s = T[n + 32 >>> 2 >>> 0], c = l.getTimezoneOffset(), f = new Date(l.getFullYear(), 0, 1), v = new Date(l.getFullYear(), 6, 1).getTimezoneOffset(), m = f.getTimezoneOffset(), _ = Math.min(m, v);
      if (s < 0)
        T[n + 32 >>> 2 >>> 0] = +(v != m && _ == c);
      else if (s > 0 != (_ == c)) {
        var b = Math.max(m, v), R = s > 0 ? _ : b;
        l.setTime(l.getTime() + (R - c) * 6e4);
      }
      T[n + 24 >>> 2 >>> 0] = l.getDay();
      var V = Rc(l) | 0;
      T[n + 28 >>> 2 >>> 0] = V, T[n >>> 2 >>> 0] = l.getSeconds(), T[n + 4 >>> 2 >>> 0] = l.getMinutes(), T[n + 8 >>> 2 >>> 0] = l.getHours(), T[n + 12 >>> 2 >>> 0] = l.getDate(), T[n + 16 >>> 2 >>> 0] = l.getMonth(), T[n + 20 >>> 2 >>> 0] = l.getYear();
      var G = l.getTime();
      return isNaN(G) ? -1 : G / 1e3;
    })();
    return BigInt(i);
  };
  function tg(n, i, l, s, c, f, v) {
    n >>>= 0, c = de(c), f >>>= 0, v >>>= 0;
    try {
      var m = H.getStreamFromFD(s), _ = p.mmap(m, n, c, i, l), b = _.ptr;
      return T[f >>> 2 >>> 0] = _.allocated, re[v >>> 2 >>> 0] = b, 0;
    } catch (R) {
      if (typeof p > "u" || R.name !== "ErrnoError") throw R;
      return -R.errno;
    }
  }
  function rg(n, i, l, s, c, f) {
    n >>>= 0, i >>>= 0, f = de(f);
    try {
      var v = H.getStreamFromFD(c);
      l & 2 && H.doMsync(n, v, i, s, f);
    } catch (m) {
      if (typeof p > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  var ng = function(n, i, l, s) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0;
    var c = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(c, 0, 1), v = new Date(c, 6, 1), m = f.getTimezoneOffset(), _ = v.getTimezoneOffset(), b = Math.max(m, _);
    re[n >>> 2 >>> 0] = b * 60, T[i >>> 2 >>> 0] = +(m != _);
    var R = (X) => {
      var ce = X >= 0 ? "-" : "+", ve = Math.abs(X), ge = String(Math.floor(ve / 60)).padStart(2, "0"), ke = String(ve % 60).padStart(2, "0");
      return `UTC${ce}${ge}${ke}`;
    }, V = R(m), G = R(_);
    _ < m ? (Ht(V, l, 17), Ht(G, s, 17)) : (Ht(V, s, 17), Ht(G, l, 17));
  }, Fc = () => performance.now(), $c = () => Date.now(), ig = (n) => n >= 0 && n <= 3;
  function og(n, i, l) {
    if (l >>>= 0, !ig(n))
      return 28;
    var s;
    n === 0 ? s = $c() : s = Fc();
    var c = Math.round(s * 1e3 * 1e3);
    return Ee[l >>> 3 >>> 0] = BigInt(c), 0;
  }
  var Ac = (n) => {
    if (n instanceof Le || n == "unwind")
      return S;
    g(1, n);
  }, lg = 0, Oc = () => lt || lg > 0, Mc = (n) => {
    var i;
    S = n, Oc() || ((i = r.onExit) == null || i.call(r, n), w = !0), g(n, new Le(n));
  }, ag = (n, i) => {
    S = n, Mc(n);
  }, Ic = ag, sg = () => {
    if (!Oc())
      try {
        Ic(S);
      } catch (n) {
        Ac(n);
      }
  }, ug = (n) => {
    if (!w)
      try {
        return n();
      } catch (i) {
        Ac(i);
      } finally {
        sg();
      }
  };
  function jc() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
  }
  var Nc = (n, i) => setTimeout(() => {
    ug(n);
  }, i), te = { useWebGL: !1, isFullscreen: !1, pointerLock: !1, moduleContextCreatedCallbacks: [], workers: [], preloadedImages: {}, preloadedAudios: {}, getCanvas: () => r.canvas, init() {
    if (te.initted) return;
    te.initted = !0;
    var n = {};
    n.canHandle = function(f) {
      return !r.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test(f);
    }, n.handle = async function(f, v) {
      var m = new Blob([f], { type: te.getMimetype(v) });
      m.size !== f.length && (m = new Blob([new Uint8Array(f).buffer], { type: te.getMimetype(v) }));
      var _ = URL.createObjectURL(m);
      return new Promise((b, R) => {
        var V = new Image();
        V.onload = () => {
          var G = document.createElement("canvas");
          G.width = V.width, G.height = V.height;
          var X = G.getContext("2d");
          X.drawImage(V, 0, 0), te.preloadedImages[v] = G, URL.revokeObjectURL(_), b(f);
        }, V.onerror = (G) => {
          Y(`Image ${_} could not be decoded`), R();
        }, V.src = _;
      });
    }, I.push(n);
    var i = {};
    i.canHandle = function(f) {
      return !r.noAudioDecoding && f.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
    }, i.handle = async function(f, v) {
      return new Promise((m, _) => {
        var b = !1;
        function R(ce) {
          b || (b = !0, te.preloadedAudios[v] = ce, m(f));
        }
        var V = new Blob([f], { type: te.getMimetype(v) }), G = URL.createObjectURL(V), X = new Audio();
        X.addEventListener("canplaythrough", () => R(X), !1), X.onerror = function(ve) {
          if (b) return;
          Y(`warning: browser could not fully decode audio ${v}, trying slower base64 approach`);
          function ge(ke) {
            for (var De = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Me = "=", Re = "", wt = 0, Ae = 0, Bn = 0; Bn < ke.length; Bn++)
              for (wt = wt << 8 | ke[Bn], Ae += 8; Ae >= 6; ) {
                var Fi = wt >> Ae - 6 & 63;
                Ae -= 6, Re += De[Fi];
              }
            return Ae == 2 ? (Re += De[(wt & 3) << 4], Re += Me + Me) : Ae == 4 && (Re += De[(wt & 15) << 2], Re += Me), Re;
          }
          X.src = "data:audio/x-" + v.slice(-3) + ";base64," + ge(f), R(X);
        }, X.src = G, Nc(() => {
          R(X);
        }, 1e4);
      });
    }, I.push(i);
    function l() {
      var c = te.getCanvas();
      te.pointerLock = document.pointerLockElement === c;
    }
    var s = te.getCanvas();
    s && (document.addEventListener("pointerlockchange", l, !1), r.elementPointerLock && s.addEventListener("click", (c) => {
      !te.pointerLock && te.getCanvas().requestPointerLock && (te.getCanvas().requestPointerLock(), c.preventDefault());
    }, !1));
  }, createContext(n, i, l, s) {
    if (i && r.ctx && n == te.getCanvas()) return r.ctx;
    var c, f;
    if (i) {
      var v = { antialias: !1, alpha: !1, majorVersion: typeof WebGL2RenderingContext < "u" ? 2 : 1 };
      if (s)
        for (var m in s)
          v[m] = s[m];
      typeof U < "u" && (f = U.createContext(n, v), f && (c = U.getContext(f).GLctx));
    } else
      c = n.getContext("2d");
    return c ? (l && (r.ctx = c, i && U.makeContextCurrent(f), te.useWebGL = i, te.moduleContextCreatedCallbacks.forEach((_) => _()), te.init()), c) : null;
  }, fullscreenHandlersInstalled: !1, lockPointer: void 0, resizeCanvas: void 0, requestFullscreen(n, i) {
    te.lockPointer = n, te.resizeCanvas = i, typeof te.lockPointer > "u" && (te.lockPointer = !0), typeof te.resizeCanvas > "u" && (te.resizeCanvas = !1);
    var l = te.getCanvas();
    function s() {
      var v, m;
      te.isFullscreen = !1;
      var f = l.parentNode;
      jc() === f ? (l.exitFullscreen = te.exitFullscreen, te.lockPointer && l.requestPointerLock(), te.isFullscreen = !0, te.resizeCanvas ? te.setFullscreenCanvasSize() : te.updateCanvasDimensions(l)) : (f.parentNode.insertBefore(l, f), f.parentNode.removeChild(f), te.resizeCanvas ? te.setWindowedCanvasSize() : te.updateCanvasDimensions(l)), (v = r.onFullScreen) == null || v.call(r, te.isFullscreen), (m = r.onFullscreen) == null || m.call(r, te.isFullscreen);
    }
    te.fullscreenHandlersInstalled || (te.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", s, !1), document.addEventListener("mozfullscreenchange", s, !1), document.addEventListener("webkitfullscreenchange", s, !1), document.addEventListener("MSFullscreenChange", s, !1));
    var c = document.createElement("div");
    l.parentNode.insertBefore(c, l), c.appendChild(l), c.requestFullscreen = c.requestFullscreen || c.mozRequestFullScreen || c.msRequestFullscreen || (c.webkitRequestFullscreen ? () => c.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (c.webkitRequestFullScreen ? () => c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null), c.requestFullscreen();
  }, exitFullscreen() {
    if (!te.isFullscreen)
      return !1;
    var n = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || (() => {
    });
    return n.apply(document, []), !0;
  }, safeSetTimeout(n, i) {
    return Nc(n, i);
  }, getMimetype(n) {
    return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", bmp: "image/bmp", ogg: "audio/ogg", wav: "audio/wav", mp3: "audio/mpeg" }[n.slice(n.lastIndexOf(".") + 1)];
  }, getUserMedia(n) {
    window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(n);
  }, getMovementX(n) {
    return n.movementX || n.mozMovementX || n.webkitMovementX || 0;
  }, getMovementY(n) {
    return n.movementY || n.mozMovementY || n.webkitMovementY || 0;
  }, getMouseWheelDelta(n) {
    var i = 0;
    switch (n.type) {
      case "DOMMouseScroll":
        i = n.detail / 3;
        break;
      case "mousewheel":
        i = n.wheelDelta / 120;
        break;
      case "wheel":
        switch (i = n.deltaY, n.deltaMode) {
          case 0:
            i /= 100;
            break;
          case 1:
            i /= 3;
            break;
          case 2:
            i *= 80;
            break;
          default:
            ye("unrecognized mouse wheel delta mode: " + n.deltaMode);
        }
        break;
      default:
        ye("unrecognized mouse wheel event: " + n.type);
    }
    return i;
  }, mouseX: 0, mouseY: 0, mouseMovementX: 0, mouseMovementY: 0, touches: {}, lastTouches: {}, calculateMouseCoords(n, i) {
    var l = te.getCanvas(), s = l.getBoundingClientRect(), c = typeof window.scrollX < "u" ? window.scrollX : window.pageXOffset, f = typeof window.scrollY < "u" ? window.scrollY : window.pageYOffset, v = n - (c + s.left), m = i - (f + s.top);
    return v = v * (l.width / s.width), m = m * (l.height / s.height), { x: v, y: m };
  }, setMouseCoords(n, i) {
    const { x: l, y: s } = te.calculateMouseCoords(n, i);
    te.mouseMovementX = l - te.mouseX, te.mouseMovementY = s - te.mouseY, te.mouseX = l, te.mouseY = s;
  }, calculateMouseEvent(n) {
    if (te.pointerLock)
      n.type != "mousemove" && "mozMovementX" in n ? te.mouseMovementX = te.mouseMovementY = 0 : (te.mouseMovementX = te.getMovementX(n), te.mouseMovementY = te.getMovementY(n)), te.mouseX += te.mouseMovementX, te.mouseY += te.mouseMovementY;
    else {
      if (n.type === "touchstart" || n.type === "touchend" || n.type === "touchmove") {
        var i = n.touch;
        if (i === void 0)
          return;
        var l = te.calculateMouseCoords(i.pageX, i.pageY);
        if (n.type === "touchstart")
          te.lastTouches[i.identifier] = l, te.touches[i.identifier] = l;
        else if (n.type === "touchend" || n.type === "touchmove") {
          var s = te.touches[i.identifier];
          s || (s = l), te.lastTouches[i.identifier] = s, te.touches[i.identifier] = l;
        }
        return;
      }
      te.setMouseCoords(n.pageX, n.pageY);
    }
  }, resizeListeners: [], updateResizeListeners() {
    var n = te.getCanvas();
    te.resizeListeners.forEach((i) => i(n.width, n.height));
  }, setCanvasSize(n, i, l) {
    var s = te.getCanvas();
    te.updateCanvasDimensions(s, n, i), l || te.updateResizeListeners();
  }, windowedWidth: 0, windowedHeight: 0, setFullscreenCanvasSize() {
    if (typeof SDL < "u") {
      var n = re[SDL.screen >>> 2 >>> 0];
      n = n | 8388608, T[SDL.screen >>> 2 >>> 0] = n;
    }
    te.updateCanvasDimensions(te.getCanvas()), te.updateResizeListeners();
  }, setWindowedCanvasSize() {
    if (typeof SDL < "u") {
      var n = re[SDL.screen >>> 2 >>> 0];
      n = n & -8388609, T[SDL.screen >>> 2 >>> 0] = n;
    }
    te.updateCanvasDimensions(te.getCanvas()), te.updateResizeListeners();
  }, updateCanvasDimensions(n, i, l) {
    i && l ? (n.widthNative = i, n.heightNative = l) : (i = n.widthNative, l = n.heightNative);
    var s = i, c = l;
    if (r.forcedAspectRatio > 0 && (s / c < r.forcedAspectRatio ? s = Math.round(c * r.forcedAspectRatio) : c = Math.round(s / r.forcedAspectRatio)), jc() === n.parentNode && typeof screen < "u") {
      var f = Math.min(screen.width / s, screen.height / c);
      s = Math.round(s * f), c = Math.round(c * f);
    }
    te.resizeCanvas ? (n.width != s && (n.width = s), n.height != c && (n.height = c), typeof n.style < "u" && (n.style.removeProperty("width"), n.style.removeProperty("height"))) : (n.width != i && (n.width = i), n.height != l && (n.height = l), typeof n.style < "u" && (s != i || c != l ? (n.style.setProperty("width", s + "px", "important"), n.style.setProperty("height", c + "px", "important")) : (n.style.removeProperty("width"), n.style.removeProperty("height"))));
  } }, ue = { errorCode: 12288, defaultDisplayInitialized: !1, currentContext: 0, currentReadSurface: 0, currentDrawSurface: 0, contextAttributes: { alpha: !1, depth: !1, stencil: !1, antialias: !1 }, stringCache: {}, setErrorCode(n) {
    ue.errorCode = n;
  }, chooseConfig(n, i, l, s, c) {
    if (n != 62e3)
      return ue.setErrorCode(12296), 0;
    if (i)
      for (; ; ) {
        var f = T[i >>> 2 >>> 0];
        if (f == 12321) {
          var v = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.alpha = v > 0;
        } else if (f == 12325) {
          var m = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.depth = m > 0;
        } else if (f == 12326) {
          var _ = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.stencil = _ > 0;
        } else if (f == 12337) {
          var b = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.antialias = b > 0;
        } else if (f == 12338) {
          var b = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.antialias = b == 1;
        } else if (f == 12544) {
          var R = T[i + 4 >>> 2 >>> 0];
          ue.contextAttributes.lowLatency = R != 12547;
        } else if (f == 12344)
          break;
        i += 8;
      }
    return (!l || !s) && !c ? (ue.setErrorCode(12300), 0) : (c && (T[c >>> 2 >>> 0] = 1), l && s > 0 && (re[l >>> 2 >>> 0] = 62002), ue.setErrorCode(12288), 1);
  } }, cg = (n) => n == 12448 ? (ue.setErrorCode(12288), 1) : (ue.setErrorCode(12300), 0);
  function fg(n, i, l, s, c) {
    return n >>>= 0, i >>>= 0, l >>>= 0, c >>>= 0, ue.chooseConfig(n, i, l, s, c);
  }
  var j, dg = (n) => {
    var i = n.getExtension("ANGLE_instanced_arrays");
    if (i)
      return n.vertexAttribDivisor = (l, s) => i.vertexAttribDivisorANGLE(l, s), n.drawArraysInstanced = (l, s, c, f) => i.drawArraysInstancedANGLE(l, s, c, f), n.drawElementsInstanced = (l, s, c, f, v) => i.drawElementsInstancedANGLE(l, s, c, f, v), 1;
  }, pg = (n) => {
    var i = n.getExtension("OES_vertex_array_object");
    if (i)
      return n.createVertexArray = () => i.createVertexArrayOES(), n.deleteVertexArray = (l) => i.deleteVertexArrayOES(l), n.bindVertexArray = (l) => i.bindVertexArrayOES(l), n.isVertexArray = (l) => i.isVertexArrayOES(l), 1;
  }, vg = (n) => {
    var i = n.getExtension("WEBGL_draw_buffers");
    if (i)
      return n.drawBuffers = (l, s) => i.drawBuffersWEBGL(l, s), 1;
  }, hg = (n) => !!(n.dibvbi = n.getExtension("WEBGL_draw_instanced_base_vertex_base_instance")), mg = (n) => !!(n.mdibvbi = n.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance")), gg = (n) => !!(n.extPolygonOffsetClamp = n.getExtension("EXT_polygon_offset_clamp")), yg = (n) => !!(n.extClipControl = n.getExtension("EXT_clip_control")), _g = (n) => !!(n.webglPolygonMode = n.getExtension("WEBGL_polygon_mode")), wg = (n) => !!(n.multiDrawWebgl = n.getExtension("WEBGL_multi_draw")), zc = (n) => {
    var i = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode"];
    return (n.getSupportedExtensions() || []).filter((l) => i.includes(l));
  }, U = { counter: 1, buffers: [], programs: [], framebuffers: [], renderbuffers: [], textures: [], shaders: [], vaos: [], contexts: [], offscreenCanvases: {}, queries: [], samplers: [], transformFeedbacks: [], syncs: [], stringCache: {}, stringiCache: {}, unpackAlignment: 4, unpackRowLength: 0, recordError: (n) => {
    U.lastError || (U.lastError = n);
  }, getNewId: (n) => {
    for (var i = U.counter++, l = n.length; l < i; l++)
      n[l] = null;
    return i;
  }, genObject: (n, i, l, s) => {
    for (var c = 0; c < n; c++) {
      var f = j[l](), v = f && U.getNewId(s);
      f ? (f.name = v, s[v] = f) : U.recordError(1282), T[i + c * 4 >>> 2 >>> 0] = v;
    }
  }, getSource: (n, i, l, s) => {
    for (var c = "", f = 0; f < i; ++f) {
      var v = s ? re[s + f * 4 >>> 2 >>> 0] : void 0;
      c += se(re[l + f * 4 >>> 2 >>> 0], v);
    }
    return c;
  }, createContext: (n, i) => {
    if (!n.getContextSafariWebGL2Fixed) {
      let c = function(f, v) {
        var m = n.getContextSafariWebGL2Fixed(f, v);
        return f == "webgl" == m instanceof WebGLRenderingContext ? m : null;
      };
      n.getContextSafariWebGL2Fixed = n.getContext, n.getContext = c;
    }
    var l = i.majorVersion > 1 ? n.getContext("webgl2", i) : n.getContext("webgl", i);
    if (!l) return 0;
    var s = U.registerContext(l, i);
    return s;
  }, registerContext: (n, i) => {
    var l = U.getNewId(U.contexts), s = { handle: l, attributes: i, version: i.majorVersion, GLctx: n };
    return n.canvas && (n.canvas.GLctxObject = s), U.contexts[l] = s, (typeof i.enableExtensionsByDefault > "u" || i.enableExtensionsByDefault) && U.initExtensions(s), l;
  }, makeContextCurrent: (n) => {
    var i;
    return U.currentContext = U.contexts[n], r.ctx = j = (i = U.currentContext) == null ? void 0 : i.GLctx, !(n && !j);
  }, getContext: (n) => U.contexts[n], deleteContext: (n) => {
    var i;
    U.currentContext === U.contexts[n] && (U.currentContext = null), typeof JSEvents == "object" && JSEvents.removeAllHandlersOnTarget(U.contexts[n].GLctx.canvas), (i = U.contexts[n]) != null && i.GLctx.canvas && (U.contexts[n].GLctx.canvas.GLctxObject = void 0), U.contexts[n] = null;
  }, initExtensions: (n) => {
    if (n || (n = U.currentContext), !n.initExtensionsDone) {
      n.initExtensionsDone = !0;
      var i = n.GLctx;
      wg(i), gg(i), yg(i), _g(i), dg(i), pg(i), vg(i), hg(i), mg(i), n.version >= 2 && (i.disjointTimerQueryExt = i.getExtension("EXT_disjoint_timer_query_webgl2")), (n.version < 2 || !i.disjointTimerQueryExt) && (i.disjointTimerQueryExt = i.getExtension("EXT_disjoint_timer_query"));
      for (var l of zc(i))
        !l.includes("lose_context") && !l.includes("debug") && i.getExtension(l);
    }
  } };
  function xg(n, i, l, s) {
    if (n >>>= 0, s >>>= 0, n != 62e3)
      return ue.setErrorCode(12296), 0;
    for (var c = 1; ; ) {
      var f = T[s >>> 2 >>> 0];
      if (f == 12440)
        c = T[s + 4 >>> 2 >>> 0];
      else {
        if (f == 12344)
          break;
        return ue.setErrorCode(12292), 0;
      }
      s += 8;
    }
    return c < 2 || c > 3 ? (ue.setErrorCode(12293), 0) : (ue.contextAttributes.majorVersion = c - 1, ue.contextAttributes.minorVersion = 0, ue.context = U.createContext(te.getCanvas(), ue.contextAttributes), ue.context != 0 ? (ue.setErrorCode(12288), U.makeContextCurrent(ue.context), te.useWebGL = !0, te.moduleContextCreatedCallbacks.forEach((v) => v()), U.makeContextCurrent(null), 62004) : (ue.setErrorCode(12297), 0));
  }
  function kg(n, i, l, s) {
    return n >>>= 0, i >>>= 0, n != 62e3 ? (ue.setErrorCode(12296), 0) : i != 62002 ? (ue.setErrorCode(12293), 0) : (ue.setErrorCode(12288), 62006);
  }
  function Sg(n, i) {
    return n >>>= 0, i >>>= 0, n != 62e3 ? (ue.setErrorCode(12296), 0) : i != 62006 ? (ue.setErrorCode(12301), 1) : (ue.currentReadSurface == i && (ue.currentReadSurface = 0), ue.currentDrawSurface == i && (ue.currentDrawSurface = 0), ue.setErrorCode(12288), 1);
  }
  function Eg() {
    return ue.currentContext;
  }
  function Cg(n) {
    return n >>>= 0, ue.setErrorCode(12288), n != 0 && n != 1 ? 0 : 62e3;
  }
  var bg = () => ue.errorCode;
  function Pg(n, i, l) {
    return n >>>= 0, i >>>= 0, l >>>= 0, n != 62e3 ? (ue.setErrorCode(12296), 0) : (i && (T[i >>> 2 >>> 0] = 1), l && (T[l >>> 2 >>> 0] = 4), ue.defaultDisplayInitialized = !0, ue.setErrorCode(12288), 1);
  }
  function Tg(n, i, l, s) {
    return n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0, n != 62e3 ? (ue.setErrorCode(12296), 0) : s != 0 && s != 62004 ? (ue.setErrorCode(12294), 0) : l != 0 && l != 62006 || i != 0 && i != 62006 ? (ue.setErrorCode(12301), 0) : (U.makeContextCurrent(s ? ue.context : null), ue.currentContext = s, ue.currentDrawSurface = i, ue.currentReadSurface = l, ue.setErrorCode(12288), 1);
  }
  var Er = (n) => {
    var i = Mt(n) + 1, l = zn(i);
    return l && Ht(n, l, i), l;
  };
  function Lg(n, i) {
    if (n >>>= 0, n != 62e3)
      return ue.setErrorCode(12296), 0;
    if (ue.setErrorCode(12288), ue.stringCache[i]) return ue.stringCache[i];
    var l;
    switch (i) {
      case 12371:
        l = Er("Emscripten");
        break;
      case 12372:
        l = Er("1.4 Emscripten EGL");
        break;
      case 12373:
        l = Er("");
        break;
      case 12429:
        l = Er("OpenGL_ES");
        break;
      default:
        return ue.setErrorCode(12300), 0;
    }
    return ue.stringCache[i] = l, l;
  }
  function Dg(n) {
    return n >>>= 0, n != 62e3 ? (ue.setErrorCode(12296), 0) : (ue.currentContext = 0, ue.currentReadSurface = 0, ue.currentDrawSurface = 0, ue.defaultDisplayInitialized = !1, ue.setErrorCode(12288), 1);
  }
  var Rg = (n) => cancelAnimationFrame(n), Bc = () => 4294901760;
  function Fg() {
    return Bc();
  }
  var $g = function(n, i) {
    return n >>>= 0, i >>>= 0, requestAnimationFrame((l) => Ca(n)(l, i));
  }, Ag = (n) => {
    var i = Go.buffer.byteLength, l = (n - i + 65535) / 65536 | 0;
    try {
      return Go.grow(l), ie(), 1;
    } catch {
    }
  };
  function Og(n) {
    n >>>= 0;
    var i = W.length, l = Bc();
    if (n > l)
      return !1;
    for (var s = 1; s <= 4; s *= 2) {
      var c = i * (1 + 0.2 / s);
      c = Math.min(c, n + 100663296);
      var f = Math.min(l, To(Math.max(n, c), 65536)), v = Ag(f);
      if (v)
        return !0;
    }
    return !1;
  }
  var Da = {}, Mg = () => h || "./this.program", Di = () => {
    var c;
    if (!Di.strings) {
      var n = (((c = globalThis.navigator) == null ? void 0 : c.language) ?? "C").replace("-", "_") + ".UTF-8", i = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: n, _: Mg() };
      for (var l in Da)
        Da[l] === void 0 ? delete i[l] : i[l] = Da[l];
      var s = [];
      for (var l in i)
        s.push(`${l}=${i[l]}`);
      Di.strings = s;
    }
    return Di.strings;
  };
  function Ig(n, i) {
    n >>>= 0, i >>>= 0;
    var l = 0, s = 0;
    for (var c of Di()) {
      var f = i + l;
      re[n + s >>> 2 >>> 0] = f, l += Ht(c, f, 1 / 0) + 1, s += 4;
    }
    return 0;
  }
  function jg(n, i) {
    n >>>= 0, i >>>= 0;
    var l = Di();
    re[n >>> 2 >>> 0] = l.length;
    var s = 0;
    for (var c of l)
      s += Mt(c) + 1;
    return re[i >>> 2 >>> 0] = s, 0;
  }
  function Ng(n) {
    try {
      var i = H.getStreamFromFD(n);
      return p.close(i), 0;
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return l.errno;
    }
  }
  function zg(n, i) {
    i >>>= 0;
    try {
      var l = 0, s = 0, c = 0, f = H.getStreamFromFD(n), v = f.tty ? 2 : p.isDir(f.mode) ? 3 : p.isLink(f.mode) ? 7 : 4;
      return F[i >>> 0] = v, K[i + 2 >>> 1 >>> 0] = c, Ee[i + 8 >>> 3 >>> 0] = BigInt(l), Ee[i + 16 >>> 3 >>> 0] = BigInt(s), 0;
    } catch (m) {
      if (typeof p > "u" || m.name !== "ErrnoError") throw m;
      return m.errno;
    }
  }
  var Bg = (n, i, l, s) => {
    for (var c = 0, f = 0; f < l; f++) {
      var v = re[i >>> 2 >>> 0], m = re[i + 4 >>> 2 >>> 0];
      i += 8;
      var _ = p.read(n, F, v, m, s);
      if (_ < 0) return -1;
      if (c += _, _ < m) break;
    }
    return c;
  };
  function Ug(n, i, l, s) {
    i >>>= 0, l >>>= 0, s >>>= 0;
    try {
      var c = H.getStreamFromFD(n), f = Bg(c, i, l);
      return re[s >>> 2 >>> 0] = f, 0;
    } catch (v) {
      if (typeof p > "u" || v.name !== "ErrnoError") throw v;
      return v.errno;
    }
  }
  function Vg(n, i, l, s) {
    i = de(i), s >>>= 0;
    try {
      if (isNaN(i)) return 61;
      var c = H.getStreamFromFD(n);
      return p.llseek(c, i, l), Ee[s >>> 3 >>> 0] = BigInt(c.position), c.getdents && i === 0 && l === 0 && (c.getdents = null), 0;
    } catch (f) {
      if (typeof p > "u" || f.name !== "ErrnoError") throw f;
      return f.errno;
    }
  }
  var Wg = (n, i, l, s) => {
    for (var c = 0, f = 0; f < l; f++) {
      var v = re[i >>> 2 >>> 0], m = re[i + 4 >>> 2 >>> 0];
      i += 8;
      var _ = p.write(n, F, v, m, s);
      if (_ < 0) return -1;
      if (c += _, _ < m)
        break;
    }
    return c;
  };
  function Hg(n, i, l, s) {
    i >>>= 0, l >>>= 0, s >>>= 0;
    try {
      var c = H.getStreamFromFD(n), f = Wg(c, i, l);
      return re[s >>> 2 >>> 0] = f, 0;
    } catch (v) {
      if (typeof p > "u" || v.name !== "ErrnoError") throw v;
      return v.errno;
    }
  }
  var Gg = (n, i, l, s, c) => {
    switch (i) {
      case 2:
        l = tt(l), xi(n, 16), K[n >>> 1 >>> 0] = i, T[n + 4 >>> 2 >>> 0] = l, K[n + 2 >>> 1 >>> 0] = Ho(s);
        break;
      case 10:
        l = Nr(l), xi(n, 28), T[n >>> 2 >>> 0] = i, T[n + 8 >>> 2 >>> 0] = l[0], T[n + 12 >>> 2 >>> 0] = l[1], T[n + 16 >>> 2 >>> 0] = l[2], T[n + 20 >>> 2 >>> 0] = l[3], K[n + 2 >>> 1 >>> 0] = Ho(s);
        break;
      default:
        return 5;
    }
    return 0;
  };
  function Xg(n, i, l, s) {
    n >>>= 0, i >>>= 0, l >>>= 0, s >>>= 0;
    var c = 0, f = 0, v = 0, m = 0, _ = 0, b = 0, R;
    function V(G, X, ce, ve, ge, ke) {
      var De, Me, Re;
      return Me = G === 10 ? 28 : 16, ge = G === 10 ? at(ge) : Je(ge), De = zn(Me), Gg(De, G, ge, ke), Re = zn(32), T[Re + 4 >>> 2 >>> 0] = G, T[Re + 8 >>> 2 >>> 0] = X, T[Re + 12 >>> 2 >>> 0] = ce, re[Re + 24 >>> 2 >>> 0] = ve, re[Re + 20 >>> 2 >>> 0] = De, G === 10 ? T[Re + 16 >>> 2 >>> 0] = 28 : T[Re + 16 >>> 2 >>> 0] = 16, T[Re + 28 >>> 2 >>> 0] = 0, Re;
    }
    if (l && (v = T[l >>> 2 >>> 0], m = T[l + 4 >>> 2 >>> 0], _ = T[l + 8 >>> 2 >>> 0], b = T[l + 12 >>> 2 >>> 0]), _ && !b && (b = _ === 2 ? 17 : 6), !_ && b && (_ = b === 17 ? 2 : 1), b === 0 && (b = 6), _ === 0 && (_ = 1), !n && !i)
      return -2;
    if (v & -1088 || l !== 0 && T[l >>> 2 >>> 0] & 2 && !n)
      return -1;
    if (v & 32)
      return -2;
    if (_ !== 0 && _ !== 1 && _ !== 2)
      return -7;
    if (m !== 0 && m !== 2 && m !== 10)
      return -6;
    if (i && (i = se(i), f = parseInt(i, 10), isNaN(f)))
      return v & 1024 ? -2 : -8;
    if (!n)
      return m === 0 && (m = 2), v & 1 || (m === 2 ? c = Ri(2130706433) : c = [0, 0, 0, Ri(1)]), R = V(m, _, b, null, c, f), re[s >>> 2 >>> 0] = R, 0;
    if (n = se(n), c = tt(n), c !== null)
      if (m === 0 || m === 2)
        m = 2;
      else if (m === 10 && v & 8)
        c = [0, 0, Ri(65535), c], m = 10;
      else
        return -2;
    else if (c = Nr(n), c !== null)
      if (m === 0 || m === 10)
        m = 10;
      else
        return -2;
    return c != null ? (R = V(m, _, b, n, c, f), re[s >>> 2 >>> 0] = R, 0) : v & 4 ? -2 : (n = _t.lookup_name(n), c = tt(n), m === 0 ? m = 2 : m === 10 && (c = [0, 0, Ri(65535), c]), R = V(m, _, b, null, c, f), re[s >>> 2 >>> 0] = R, 0);
  }
  var Yg = (n) => j.activeTexture(n), Kg = Yg, Qg = (n, i) => {
    j.attachShader(U.programs[n], U.shaders[i]);
  }, Zg = Qg, qg = (n, i) => {
    n == 35051 ? j.currentPixelPackBufferBinding = i : n == 35052 && (j.currentPixelUnpackBufferBinding = i), j.bindBuffer(n, U.buffers[i]);
  }, Jg = qg, ey = (n, i) => {
    j.bindFramebuffer(n, U.framebuffers[i]);
  }, ty = ey, ry = (n, i) => {
    j.bindSampler(n, U.samplers[i]);
  }, ny = ry, iy = (n, i) => {
    j.bindTexture(n, U.textures[i]);
  }, oy = iy, ly = (n) => {
    j.bindVertexArray(U.vaos[n]);
  }, ay = ly, sy = (n, i, l, s) => j.blendColor(n, i, l, s), uy = sy, cy = (n, i) => j.blendEquationSeparate(n, i), fy = cy, dy = (n, i) => j.blendFunc(n, i), py = dy, vy = (n, i, l, s) => j.blendFuncSeparate(n, i, l, s), hy = vy, my = (n, i, l, s, c, f, v, m, _, b) => j.blitFramebuffer(n, i, l, s, c, f, v, m, _, b), gy = my;
  function yy(n, i, l, s) {
    i >>>= 0, l >>>= 0, j.bufferData(n, l ? W.subarray(l >>> 0, l + i >>> 0) : i, s);
  }
  var _y = yy;
  function wy(n, i, l, s) {
    i >>>= 0, l >>>= 0, s >>>= 0, j.bufferSubData(n, i, W.subarray(s >>> 0, s + l >>> 0));
  }
  var xy = wy, ky = (n) => j.checkFramebufferStatus(n), Sy = ky, Ey = (n) => j.clear(n), Cy = Ey, by = (n, i, l, s) => j.clearColor(n, i, l, s), Py = by, Ty = (n) => j.clearDepth(n), Ly = Ty, Dy = (n) => j.clearStencil(n), Ry = Dy, Fy = (n, i, l, s) => {
    j.colorMask(!!n, !!i, !!l, !!s);
  }, $y = Fy, Ay = (n) => {
    j.compileShader(U.shaders[n]);
  }, Oy = Ay, My = () => {
    var n = U.getNewId(U.programs), i = j.createProgram();
    return i.name = n, i.maxUniformLength = i.maxAttributeLength = i.maxUniformBlockNameLength = 0, i.uniformIdCounter = 1, U.programs[n] = i, n;
  }, Iy = My, jy = (n) => {
    var i = U.getNewId(U.shaders);
    return U.shaders[i] = j.createShader(n), i;
  }, Ny = jy, zy = (n) => j.cullFace(n), By = zy;
  function Uy(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var s = T[i + l * 4 >>> 2 >>> 0], c = U.buffers[s];
      c && (j.deleteBuffer(c), c.name = 0, U.buffers[s] = null, s == j.currentPixelPackBufferBinding && (j.currentPixelPackBufferBinding = 0), s == j.currentPixelUnpackBufferBinding && (j.currentPixelUnpackBufferBinding = 0));
    }
  }
  var Vy = Uy;
  function Wy(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; ++l) {
      var s = T[i + l * 4 >>> 2 >>> 0], c = U.framebuffers[s];
      c && (j.deleteFramebuffer(c), c.name = 0, U.framebuffers[s] = null);
    }
  }
  var Hy = Wy, Gy = (n) => {
    if (n) {
      var i = U.programs[n];
      if (!i) {
        U.recordError(1281);
        return;
      }
      j.deleteProgram(i), i.name = 0, U.programs[n] = null;
    }
  }, Xy = Gy;
  function Yy(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var s = T[i + l * 4 >>> 2 >>> 0], c = U.samplers[s];
      c && (j.deleteSampler(c), c.name = 0, U.samplers[s] = null);
    }
  }
  var Ky = Yy, Qy = (n) => {
    if (n) {
      var i = U.shaders[n];
      if (!i) {
        U.recordError(1281);
        return;
      }
      j.deleteShader(i), U.shaders[n] = null;
    }
  }, Zy = Qy;
  function qy(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var s = T[i + l * 4 >>> 2 >>> 0], c = U.textures[s];
      c && (j.deleteTexture(c), c.name = 0, U.textures[s] = null);
    }
  }
  var Jy = qy;
  function e_(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var s = T[i + l * 4 >>> 2 >>> 0];
      j.deleteVertexArray(U.vaos[s]), U.vaos[s] = null;
    }
  }
  var t_ = e_, r_ = (n) => j.depthFunc(n), n_ = r_, i_ = (n) => {
    j.depthMask(!!n);
  }, o_ = i_, l_ = (n, i) => {
    j.detachShader(U.programs[n], U.shaders[i]);
  }, a_ = l_, s_ = (n) => j.disable(n), u_ = s_, c_ = (n) => {
    j.disableVertexAttribArray(n);
  }, f_ = c_, d_ = (n, i, l) => {
    j.drawArrays(n, i, l);
  }, p_ = d_, v_ = (n, i, l, s) => {
    j.drawArraysInstanced(n, i, l, s);
  }, h_ = v_, Uc = [];
  function m_(n, i) {
    i >>>= 0;
    for (var l = Uc[n], s = 0; s < n; s++)
      l[s] = T[i + s * 4 >>> 2 >>> 0];
    j.drawBuffers(l);
  }
  var g_ = m_;
  function y_(n, i, l, s) {
    s >>>= 0, j.drawElements(n, i, l, s);
  }
  var __ = y_, w_ = (n) => j.enable(n), x_ = w_, k_ = (n) => {
    j.enableVertexAttribArray(n);
  }, S_ = k_, E_ = () => j.finish(), C_ = E_, b_ = (n, i, l, s, c) => {
    j.framebufferTexture2D(n, i, l, U.textures[s], c);
  }, P_ = b_, T_ = (n, i, l, s, c) => {
    j.framebufferTextureLayer(n, i, U.textures[l], s, c);
  }, L_ = T_;
  function D_(n, i) {
    i >>>= 0, U.genObject(n, i, "createBuffer", U.buffers);
  }
  var R_ = D_;
  function F_(n, i) {
    i >>>= 0, U.genObject(n, i, "createFramebuffer", U.framebuffers);
  }
  var $_ = F_;
  function A_(n, i) {
    i >>>= 0, U.genObject(n, i, "createSampler", U.samplers);
  }
  var O_ = A_;
  function M_(n, i) {
    i >>>= 0, U.genObject(n, i, "createTexture", U.textures);
  }
  var I_ = M_;
  function j_(n, i) {
    i >>>= 0, U.genObject(n, i, "createVertexArray", U.vaos);
  }
  var N_ = j_, z_ = (n) => j.generateMipmap(n), B_ = z_, U_ = (n, i) => {
    re[n >>> 2 >>> 0] = i;
    var l = re[n >>> 2 >>> 0];
    re[n + 4 >>> 2 >>> 0] = (i - l) / 4294967296;
  }, Ra = () => {
    var n = zc(j);
    return n = n.concat(n.map((i) => "GL_" + i)), n;
  }, Fa = (n, i, l) => {
    if (!i) {
      U.recordError(1281);
      return;
    }
    var s = void 0;
    switch (n) {
      case 36346:
        s = 1;
        break;
      case 36344:
        l != 0 && l != 1 && U.recordError(1280);
        return;
      case 34814:
      case 36345:
        s = 0;
        break;
      case 34466:
        var c = j.getParameter(34467);
        s = c ? c.length : 0;
        break;
      case 33309:
        if (U.currentContext.version < 2) {
          U.recordError(1282);
          return;
        }
        s = Ra().length;
        break;
      case 33307:
      case 33308:
        if (U.currentContext.version < 2) {
          U.recordError(1280);
          return;
        }
        s = n == 33307 ? 3 : 0;
        break;
    }
    if (s === void 0) {
      var f = j.getParameter(n);
      switch (typeof f) {
        case "number":
          s = f;
          break;
        case "boolean":
          s = f ? 1 : 0;
          break;
        case "string":
          U.recordError(1280);
          return;
        case "object":
          if (f === null)
            switch (n) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068: {
                s = 0;
                break;
              }
              default: {
                U.recordError(1280);
                return;
              }
            }
          else if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
            for (var v = 0; v < f.length; ++v)
              switch (l) {
                case 0:
                  T[i + v * 4 >>> 2 >>> 0] = f[v];
                  break;
                case 2:
                  pe[i + v * 4 >>> 2 >>> 0] = f[v];
                  break;
                case 4:
                  F[i + v >>> 0] = f[v] ? 1 : 0;
                  break;
              }
            return;
          } else
            try {
              s = f.name | 0;
            } catch (m) {
              U.recordError(1280), Y(`GL_INVALID_ENUM in glGet${l}v: Unknown object returned from WebGL getParameter(${n})! (error: ${m})`);
              return;
            }
          break;
        default:
          U.recordError(1280), Y(`GL_INVALID_ENUM in glGet${l}v: Native code calling glGet${l}v(${n}) and it returns ${f} of type ${typeof f}!`);
          return;
      }
    }
    switch (l) {
      case 1:
        U_(i, s);
        break;
      case 0:
        T[i >>> 2 >>> 0] = s;
        break;
      case 2:
        pe[i >>> 2 >>> 0] = s;
        break;
      case 4:
        F[i >>> 0] = s ? 1 : 0;
        break;
    }
  };
  function V_(n, i) {
    return i >>>= 0, Fa(n, i, 4);
  }
  var W_ = V_, H_ = () => {
    var n = j.getError() || U.lastError;
    return U.lastError = 0, n;
  }, G_ = H_;
  function X_(n, i) {
    return i >>>= 0, Fa(n, i, 2);
  }
  var Y_ = X_;
  function K_(n, i) {
    return i >>>= 0, Fa(n, i, 0);
  }
  var Q_ = K_;
  function Z_(n, i, l, s) {
    l >>>= 0, s >>>= 0;
    var c = j.getProgramInfoLog(U.programs[n]);
    c === null && (c = "(unknown error)");
    var f = i > 0 && s ? Ht(c, s, i) : 0;
    l && (T[l >>> 2 >>> 0] = f);
  }
  var q_ = Z_;
  function J_(n, i, l) {
    if (l >>>= 0, !l) {
      U.recordError(1281);
      return;
    }
    if (n >= U.counter) {
      U.recordError(1281);
      return;
    }
    if (n = U.programs[n], i == 35716) {
      var s = j.getProgramInfoLog(n);
      s === null && (s = "(unknown error)"), T[l >>> 2 >>> 0] = s.length + 1;
    } else if (i == 35719) {
      if (!n.maxUniformLength)
        for (var c = j.getProgramParameter(n, 35718), f = 0; f < c; ++f)
          n.maxUniformLength = Math.max(n.maxUniformLength, j.getActiveUniform(n, f).name.length + 1);
      T[l >>> 2 >>> 0] = n.maxUniformLength;
    } else if (i == 35722) {
      if (!n.maxAttributeLength)
        for (var v = j.getProgramParameter(n, 35721), f = 0; f < v; ++f)
          n.maxAttributeLength = Math.max(n.maxAttributeLength, j.getActiveAttrib(n, f).name.length + 1);
      T[l >>> 2 >>> 0] = n.maxAttributeLength;
    } else if (i == 35381) {
      if (!n.maxUniformBlockNameLength)
        for (var m = j.getProgramParameter(n, 35382), f = 0; f < m; ++f)
          n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, j.getActiveUniformBlockName(n, f).length + 1);
      T[l >>> 2 >>> 0] = n.maxUniformBlockNameLength;
    } else
      T[l >>> 2 >>> 0] = j.getProgramParameter(n, i);
  }
  var e1 = J_;
  function t1(n, i, l, s) {
    l >>>= 0, s >>>= 0;
    var c = j.getShaderInfoLog(U.shaders[n]);
    c === null && (c = "(unknown error)");
    var f = i > 0 && s ? Ht(c, s, i) : 0;
    l && (T[l >>> 2 >>> 0] = f);
  }
  var r1 = t1;
  function n1(n, i, l) {
    if (l >>>= 0, !l) {
      U.recordError(1281);
      return;
    }
    if (i == 35716) {
      var s = j.getShaderInfoLog(U.shaders[n]);
      s === null && (s = "(unknown error)");
      var c = s ? s.length + 1 : 0;
      T[l >>> 2 >>> 0] = c;
    } else if (i == 35720) {
      var f = j.getShaderSource(U.shaders[n]), v = f ? f.length + 1 : 0;
      T[l >>> 2 >>> 0] = v;
    } else
      T[l >>> 2 >>> 0] = j.getShaderParameter(U.shaders[n], i);
  }
  var i1 = n1;
  function o1(n) {
    var i = U.stringCache[n];
    if (!i) {
      switch (n) {
        case 7939:
          i = Er(Ra().join(" "));
          break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          var l = j.getParameter(n);
          l || U.recordError(1280), i = l ? Er(l) : 0;
          break;
        case 7938:
          var s = j.getParameter(7938), c = `OpenGL ES 2.0 (${s})`;
          U.currentContext.version >= 2 && (c = `OpenGL ES 3.0 (${s})`), i = Er(c);
          break;
        case 35724:
          var f = j.getParameter(35724), v = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/, m = f.match(v);
          m !== null && (m[1].length == 3 && (m[1] = m[1] + "0"), f = `OpenGL ES GLSL ES ${m[1]} (${f})`), i = Er(f);
          break;
        default:
          U.recordError(1280);
      }
      U.stringCache[n] = i;
    }
    return i;
  }
  var l1 = o1;
  function a1(n, i) {
    if (U.currentContext.version < 2)
      return U.recordError(1282), 0;
    var l = U.stringiCache[n];
    if (l)
      return i < 0 || i >= l.length ? (U.recordError(1281), 0) : l[i];
    switch (n) {
      case 7939:
        var s = Ra().map(Er);
        return l = U.stringiCache[n] = s, i < 0 || i >= l.length ? (U.recordError(1281), 0) : l[i];
      default:
        return U.recordError(1280), 0;
    }
  }
  var s1 = a1;
  function u1(n, i, l) {
    if (l >>>= 0, !l) {
      U.recordError(1281);
      return;
    }
    T[l >>> 2 >>> 0] = j.getTexParameter(n, i);
  }
  var c1 = u1, f1 = (n) => parseInt(n), Vc = (n) => n.slice(-1) == "]" && n.lastIndexOf("["), d1 = (n) => {
    var i = n.uniformLocsById, l = n.uniformSizeAndIdsByName, s, c;
    if (!i) {
      n.uniformLocsById = i = {}, n.uniformArrayNamesById = {};
      var f = j.getProgramParameter(n, 35718);
      for (s = 0; s < f; ++s) {
        var v = j.getActiveUniform(n, s), m = v.name, _ = v.size, b = Vc(m), R = b > 0 ? m.slice(0, b) : m, V = n.uniformIdCounter;
        for (n.uniformIdCounter += _, l[R] = [_, V], c = 0; c < _; ++c)
          i[V] = c, n.uniformArrayNamesById[V++] = R;
      }
    }
  };
  function p1(n, i) {
    if (i >>>= 0, i = se(i), n = U.programs[n]) {
      d1(n);
      var l = n.uniformLocsById, s = 0, c = i, f = Vc(i);
      f > 0 && (s = f1(i.slice(f + 1)) >>> 0, c = i.slice(0, f));
      var v = n.uniformSizeAndIdsByName[c];
      if (v && s < v[0] && (s += v[1], l[s] = l[s] || j.getUniformLocation(n, i)))
        return s;
    } else
      U.recordError(1281);
    return -1;
  }
  var v1 = p1, h1 = (n) => j.isEnabled(n), m1 = h1, g1 = (n) => {
    n = U.programs[n], j.linkProgram(n), n.uniformLocsById = 0, n.uniformSizeAndIdsByName = {};
  }, y1 = g1, _1 = (n, i) => {
    n == 3317 ? U.unpackAlignment = i : n == 3314 && (U.unpackRowLength = i), j.pixelStorei(n, i);
  }, w1 = _1, x1 = (n) => j.readBuffer(n), k1 = x1, S1 = (n, i, l) => {
    function s(v, m) {
      return v + m - 1 & -m;
    }
    var c = (U.unpackRowLength || n) * l, f = s(c, U.unpackAlignment);
    return i * f;
  }, E1 = (n) => {
    var i = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 };
    return i[n - 6402] || 1;
  }, $a = (n) => (n -= 5120, n == 0 ? F : n == 1 ? W : n == 2 ? K : n == 4 ? T : n == 6 ? pe : n == 5 || n == 28922 || n == 28520 || n == 30779 || n == 30782 ? re : Z), Aa = (n, i) => n >>> 31 - Math.clz32(i.BYTES_PER_ELEMENT), Wo = (n, i, l, s, c, f) => {
    var v = $a(n), m = E1(i) * v.BYTES_PER_ELEMENT, _ = S1(l, s, m);
    return v.subarray(Aa(c, v) >>> 0, Aa(c + _, v) >>> 0);
  };
  function C1(n, i, l, s, c, f, v) {
    if (v >>>= 0, U.currentContext.version >= 2 && j.currentPixelPackBufferBinding) {
      j.readPixels(n, i, l, s, c, f, v);
      return;
    }
    var m = Wo(f, c, l, s, v);
    if (!m) {
      U.recordError(1280);
      return;
    }
    j.readPixels(n, i, l, s, c, f, m);
  }
  var b1 = C1, P1 = (n, i, l) => {
    j.samplerParameterf(U.samplers[n], i, l);
  }, T1 = P1, L1 = (n, i, l) => {
    j.samplerParameteri(U.samplers[n], i, l);
  }, D1 = L1, R1 = (n, i, l, s) => j.scissor(n, i, l, s), F1 = R1;
  function $1(n, i, l, s) {
    l >>>= 0, s >>>= 0;
    var c = U.getSource(n, i, l, s);
    j.shaderSource(U.shaders[n], c);
  }
  var A1 = $1, O1 = (n, i, l) => j.stencilFunc(n, i, l), M1 = O1, I1 = (n, i, l, s) => j.stencilFuncSeparate(n, i, l, s), j1 = I1, N1 = (n, i) => j.stencilMaskSeparate(n, i), z1 = N1, B1 = (n, i, l) => j.stencilOp(n, i, l), U1 = B1, V1 = (n, i, l, s) => j.stencilOpSeparate(n, i, l, s), W1 = V1;
  function H1(n, i, l, s, c, f, v, m, _) {
    if (_ >>>= 0, U.currentContext.version >= 2 && j.currentPixelUnpackBufferBinding) {
      j.texImage2D(n, i, l, s, c, f, v, m, _);
      return;
    }
    var b = _ ? Wo(m, v, s, c, _) : null;
    j.texImage2D(n, i, l, s, c, f, v, m, b);
  }
  var G1 = H1;
  function X1(n, i, l, s, c, f, v, m, _, b) {
    if (b >>>= 0, j.currentPixelUnpackBufferBinding)
      j.texImage3D(n, i, l, s, c, f, v, m, _, b);
    else if (b) {
      $a(_);
      var R = Wo(_, m, s, c * f, b);
      j.texImage3D(n, i, l, s, c, f, v, m, _, R);
    } else
      j.texImage3D(n, i, l, s, c, f, v, m, _, null);
  }
  var Y1 = X1, K1 = (n, i, l) => j.texParameteri(n, i, l), Q1 = K1;
  function Z1(n, i, l, s, c, f, v, m, _) {
    if (_ >>>= 0, U.currentContext.version >= 2 && j.currentPixelUnpackBufferBinding) {
      j.texSubImage2D(n, i, l, s, c, f, v, m, _);
      return;
    }
    var b = _ ? Wo(m, v, c, f, _) : null;
    j.texSubImage2D(n, i, l, s, c, f, v, m, b);
  }
  var q1 = Z1;
  function J1(n, i, l, s, c, f, v, m, _, b, R) {
    if (R >>>= 0, j.currentPixelUnpackBufferBinding)
      j.texSubImage3D(n, i, l, s, c, f, v, m, _, b, R);
    else if (R) {
      var V = $a(b);
      j.texSubImage3D(n, i, l, s, c, f, v, m, _, b, V, Aa(R, V));
    } else
      j.texSubImage3D(n, i, l, s, c, f, v, m, _, b, null);
  }
  var ew = J1, Gt = (n) => {
    var i = j.currentProgram;
    if (i) {
      var l = i.uniformLocsById[n];
      return typeof l == "number" && (i.uniformLocsById[n] = l = j.getUniformLocation(i, i.uniformArrayNamesById[n] + (l > 0 ? `[${l}]` : ""))), l;
    } else
      U.recordError(1282);
  }, tw = (n, i) => {
    j.uniform1f(Gt(n), i);
  }, rw = tw, dn = [];
  function nw(n, i, l) {
    if (l >>>= 0, i <= 288)
      for (var s = dn[i], c = 0; c < i; ++c)
        s[c] = pe[l + 4 * c >>> 2 >>> 0];
    else
      var s = pe.subarray(l >>> 2 >>> 0, l + i * 4 >>> 2 >>> 0);
    j.uniform1fv(Gt(n), s);
  }
  var iw = nw, ow = (n, i) => {
    j.uniform1i(Gt(n), i);
  }, lw = ow, aw = (n, i) => {
    j.uniform1ui(Gt(n), i);
  }, sw = aw;
  function uw(n, i, l) {
    l >>>= 0, i && j.uniform1uiv(Gt(n), re, l >>> 2, i);
  }
  var cw = uw;
  function fw(n, i, l) {
    if (l >>>= 0, i <= 144) {
      i *= 2;
      for (var s = dn[i], c = 0; c < i; c += 2)
        s[c] = pe[l + 4 * c >>> 2 >>> 0], s[c + 1] = pe[l + (4 * c + 4) >>> 2 >>> 0];
    } else
      var s = pe.subarray(l >>> 2 >>> 0, l + i * 8 >>> 2 >>> 0);
    j.uniform2fv(Gt(n), s);
  }
  var dw = fw, Oa = [];
  function pw(n, i, l) {
    if (l >>>= 0, i <= 144) {
      i *= 2;
      for (var s = Oa[i], c = 0; c < i; c += 2)
        s[c] = T[l + 4 * c >>> 2 >>> 0], s[c + 1] = T[l + (4 * c + 4) >>> 2 >>> 0];
    } else
      var s = T.subarray(l >>> 2 >>> 0, l + i * 8 >>> 2 >>> 0);
    j.uniform2iv(Gt(n), s);
  }
  var vw = pw;
  function hw(n, i, l) {
    if (l >>>= 0, i <= 96) {
      i *= 3;
      for (var s = dn[i], c = 0; c < i; c += 3)
        s[c] = pe[l + 4 * c >>> 2 >>> 0], s[c + 1] = pe[l + (4 * c + 4) >>> 2 >>> 0], s[c + 2] = pe[l + (4 * c + 8) >>> 2 >>> 0];
    } else
      var s = pe.subarray(l >>> 2 >>> 0, l + i * 12 >>> 2 >>> 0);
    j.uniform3fv(Gt(n), s);
  }
  var mw = hw;
  function gw(n, i, l) {
    if (l >>>= 0, i <= 96) {
      i *= 3;
      for (var s = Oa[i], c = 0; c < i; c += 3)
        s[c] = T[l + 4 * c >>> 2 >>> 0], s[c + 1] = T[l + (4 * c + 4) >>> 2 >>> 0], s[c + 2] = T[l + (4 * c + 8) >>> 2 >>> 0];
    } else
      var s = T.subarray(l >>> 2 >>> 0, l + i * 12 >>> 2 >>> 0);
    j.uniform3iv(Gt(n), s);
  }
  var yw = gw;
  function _w(n, i, l) {
    if (l >>>= 0, i <= 72) {
      var s = dn[4 * i], c = pe;
      l = l >>> 2, i *= 4;
      for (var f = 0; f < i; f += 4) {
        var v = l + f;
        s[f] = c[v >>> 0], s[f + 1] = c[v + 1 >>> 0], s[f + 2] = c[v + 2 >>> 0], s[f + 3] = c[v + 3 >>> 0];
      }
    } else
      var s = pe.subarray(l >>> 2 >>> 0, l + i * 16 >>> 2 >>> 0);
    j.uniform4fv(Gt(n), s);
  }
  var ww = _w;
  function xw(n, i, l, s) {
    if (s >>>= 0, i <= 32) {
      i *= 9;
      for (var c = dn[i], f = 0; f < i; f += 9)
        c[f] = pe[s + 4 * f >>> 2 >>> 0], c[f + 1] = pe[s + (4 * f + 4) >>> 2 >>> 0], c[f + 2] = pe[s + (4 * f + 8) >>> 2 >>> 0], c[f + 3] = pe[s + (4 * f + 12) >>> 2 >>> 0], c[f + 4] = pe[s + (4 * f + 16) >>> 2 >>> 0], c[f + 5] = pe[s + (4 * f + 20) >>> 2 >>> 0], c[f + 6] = pe[s + (4 * f + 24) >>> 2 >>> 0], c[f + 7] = pe[s + (4 * f + 28) >>> 2 >>> 0], c[f + 8] = pe[s + (4 * f + 32) >>> 2 >>> 0];
    } else
      var c = pe.subarray(s >>> 2 >>> 0, s + i * 36 >>> 2 >>> 0);
    j.uniformMatrix3fv(Gt(n), !!l, c);
  }
  var kw = xw;
  function Sw(n, i, l, s) {
    if (s >>>= 0, i <= 18) {
      var c = dn[16 * i], f = pe;
      s = s >>> 2, i *= 16;
      for (var v = 0; v < i; v += 16) {
        var m = s + v;
        c[v] = f[m >>> 0], c[v + 1] = f[m + 1 >>> 0], c[v + 2] = f[m + 2 >>> 0], c[v + 3] = f[m + 3 >>> 0], c[v + 4] = f[m + 4 >>> 0], c[v + 5] = f[m + 5 >>> 0], c[v + 6] = f[m + 6 >>> 0], c[v + 7] = f[m + 7 >>> 0], c[v + 8] = f[m + 8 >>> 0], c[v + 9] = f[m + 9 >>> 0], c[v + 10] = f[m + 10 >>> 0], c[v + 11] = f[m + 11 >>> 0], c[v + 12] = f[m + 12 >>> 0], c[v + 13] = f[m + 13 >>> 0], c[v + 14] = f[m + 14 >>> 0], c[v + 15] = f[m + 15 >>> 0];
      }
    } else
      var c = pe.subarray(s >>> 2 >>> 0, s + i * 64 >>> 2 >>> 0);
    j.uniformMatrix4fv(Gt(n), !!l, c);
  }
  var Ew = Sw, Cw = (n) => {
    n = U.programs[n], j.useProgram(n), j.currentProgram = n;
  }, bw = Cw, Pw = (n, i, l, s, c) => j.vertexAttrib4f(n, i, l, s, c), Tw = Pw;
  function Lw(n, i) {
    i >>>= 0, j.vertexAttrib4f(n, pe[i >>> 2], pe[i + 4 >>> 2], pe[i + 8 >>> 2], pe[i + 12 >>> 2]);
  }
  var Dw = Lw;
  function Rw(n, i, l, s, c) {
    c >>>= 0, j.vertexAttribIPointer(n, i, l, s, c);
  }
  var Fw = Rw;
  function $w(n, i, l, s, c, f) {
    f >>>= 0, j.vertexAttribPointer(n, i, l, !!s, c, f);
  }
  var Aw = $w, Ow = (n, i, l, s) => j.viewport(n, i, l, s), Mw = Ow;
  function Iw(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return Ot(W.subarray(n >>> 0, n + i >>> 0)), 0;
    } catch (l) {
      if (typeof p > "u" || l.name !== "ErrnoError") throw l;
      return l.errno;
    }
  }
  var jw = () => rf, Wc = (n) => {
    var i = n.getArg(jw(), 0);
    return ef(i);
  }, Nw = () => qc(), zw = (n) => Qc(n), Hc = (n) => Zc(n), Bw = (n) => {
    var i = Nw(), l = Hc(4), s = Hc(4);
    tf(n, l, s);
    var c = re[l >>> 2 >>> 0], f = re[s >>> 2 >>> 0], v = se(c);
    pr(c);
    var m;
    return f && (m = se(f), pr(f)), zw(i), [v, m];
  }, Uw = (n) => {
    var i = Wc(n);
    return Bw(i);
  }, Vw = (n) => {
    var i = Wc(n);
    Jc(i);
  }, Ww = (...n) => p.createPath(...n), Hw = (...n) => p.unlink(...n), Gw = (...n) => p.createLazyFile(...n), Xw = (...n) => p.createDevice(...n);
  p.createPreloadedFile = J, p.preloadFile = z, p.staticInit(), Ah(), Wh();
  for (let n = 0; n < 32; ++n) Uc.push(new Array(n));
  for (var Yw = new Float32Array(288), Cr = 0; Cr <= 288; ++Cr)
    dn[Cr] = Yw.subarray(0, Cr);
  for (var Kw = new Int32Array(288), Cr = 0; Cr <= 288; ++Cr)
    Oa[Cr] = Kw.subarray(0, Cr);
  if (r.noExitRuntime && (lt = r.noExitRuntime), r.preloadPlugins && (I = r.preloadPlugins), r.print && (B = r.print), r.printErr && (Y = r.printErr), r.wasmBinary && (k = r.wasmBinary), r.arguments && r.arguments, r.thisProgram && (h = r.thisProgram), r.preInit)
    for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; )
      r.preInit.shift()();
  r.addRunDependency = O, r.removeRunDependency = Do, r.decrementExceptionRefcount = Vw, r.getExceptionMessage = Uw, r.FS_preloadFile = z, r.FS_unlink = Hw, r.FS_createPath = Ww, r.FS_createDevice = Xw, r.FS = p, r.FS_createDataFile = Si, r.FS_createLazyFile = Gw;
  function Qw() {
    if (typeof r != "object" || !r) return;
    const n = (v) => v != null && typeof v.isAliasOf == "function", i = (v, m) => v === m ? !0 : n(v) && n(m) ? v.isAliasOf(m) : !1, l = (v, m) => {
      if (v == null) return 0;
      let _ = Number(v);
      return Number.isFinite(_) ? (_ = Math.trunc(_), _ < 0 ? Math.max(m + _, 0) : Math.min(_, m)) : _ < 0 ? 0 : m;
    }, s = (v, m) => {
      if (m === 0) return -1;
      if (v == null) return m - 1;
      let _ = Number(v);
      return Number.isFinite(_) ? (_ = Math.trunc(_), _ < 0 ? m + _ : Math.min(_, m - 1)) : _ < 0 ? -1 : m - 1;
    }, c = (v, m, _) => {
      for (let b = _; b < v.length; ++b)
        if (i(v[b], m)) return b;
      return -1;
    }, f = (v, m, _) => {
      for (let b = _; b >= 0; --b)
        if (i(v[b], m)) return b;
      return -1;
    };
    typeof r.HandleArray != "function" && (r.HandleArray = class extends Array {
      includes(m, _) {
        return c(this, m, l(_, this.length)) !== -1;
      }
      indexOf(m, _) {
        return c(this, m, l(_, this.length));
      }
      lastIndexOf(m, _) {
        return f(this, m, s(_, this.length));
      }
      static get [Symbol.species]() {
        return this;
      }
    }), r._imfusion_wrap_handle_array = function(v) {
      return Array.isArray(v) && Object.getPrototypeOf(v) !== r.HandleArray.prototype && Object.setPrototypeOf(v, r.HandleArray.prototype), v;
    };
  }
  function Zw(n) {
    let i = !0;
    const l = function() {
      i && (i = !1, Xc(n));
    };
    return Ce.toHandle(l);
  }
  var Gc, zn, Xc, pr, Ma, Ho, Ri, Yc, Kc, Qc, Zc, qc, Jc, ef, tf, rf, Go, nf;
  function qw(n) {
    Gc = n.Vc, zn = n.Yc, Xc = r._imfusion_disconnect_signal = n.Zc, pr = n._c, Ma = n.$c, Ho = n.ad, Ri = n.bd, Yc = n.cd, Kc = n.dd, Qc = n.ed, Zc = n.fd, qc = n.gd, Jc = n.hd, ef = n.id, tf = n.jd, Go = n.Tc, nf = n.Wc, rf = n.Xc;
  }
  var Jw = { fc: xe, Fb: Ro, gc: rh, M: nh, bc: ih, Zb: oh, Nb: lh, cc: ah, _b: sh, Ub: uh, $b: ch, Ca: fh, Mb: dh, Kb: ph, Lb: vh, Eb: hh, Sa: mh, ac: gh, Jb: yh, Aa: _h, Ib: wh, hc: xh, xb: bh, x: Th, L: Lh, Ra: Rh, Cb: Fh, n: Yh, B: Qh, C: Zh, b: qh, t: Jh, Ab: Lc, G: tm, g: rm, Qa: im, s: om, T: lm, ja: sm, A: um, z: fm, ia: dm, Bb: pm, za: wm, p: xm, Q: km, m: Sm, ha: Em, y: Cm, Db: bm, $: Pm, f: Fm, a: Pa, F: $m, I: Am, i: Om, c: Mm, R: Im, e: jm, ec: Nm, eb: zm, D: Bm, va: Um, h: Vm, Y: Wm, d: Hm, J: Gm, X: Xm, La: Ym, Qb: Km, Rb: Jm, Sb: eg, Ob: tg, Pb: rg, Tb: ng, dc: og, lc: cg, nc: fg, kc: xg, mc: kg, Za: Sg, _: Eg, pc: Cg, na: bg, oc: Pg, Ya: Tg, jc: Lg, qc: Dg, hb: Rg, Va: $c, Xa: Fg, Ta: Fc, Ha: $g, Hb: Og, Xb: Ig, Yb: jg, Z: Ic, ma: Ng, Wb: zg, Ua: Ug, Vb: Vg, Ba: Hg, Wa: Xg, aa: Kg, Qc: Zg, P: Jg, da: ty, Ea: ny, ca: oy, O: ay, vb: uy, Ma: fy, v: py, ea: hy, wb: gy, sb: _y, rb: xy, pb: Sy, u: Cy, K: Py, N: Ly, wc: Ry, ta: $y, Mc: Oy, jb: Iy, ib: Ny, V: By, Ka: Vy, lb: Hy, Pc: Xy, Dc: Ky, Oc: Zy, yc: Jy, Da: t_, w: n_, ya: o_, fb: a_, l: u_, E: f_, la: p_, uc: h_, xa: g_, vc: __, k: x_, tc: S_, ua: C_, U: P_, kb: L_, tb: R_, mb: $_, Ec: O_, Bc: I_, _a: N_, Na: B_, ob: W_, qb: G_, ub: Y_, o: Q_, Rc: q_, gb: e1, Lc: r1, db: i1, ra: l1, nb: s1, ka: c1, q: v1, ba: m1, Sc: y1, ga: w1, W: k1, fa: b1, cb: T1, S: D1, Cc: F1, Nc: A1, Pa: M1, bb: j1, sa: z1, Oa: U1, ab: W1, Ac: G1, zc: Y1, r: Q1, $a: q1, xc: ew, Fa: rw, Ic: iw, oa: lw, Kc: sw, Jc: cw, Ga: dw, Hc: vw, wa: mw, Gc: yw, pa: ww, Fc: kw, qa: Ew, j: bw, Ja: Tw, Ia: Dw, sc: Fw, rc: Aw, H: Mw, yb: Qw, zb: Zw, ic: Mc, Gb: Iw };
  function e2(n) {
    n = Object.assign({}, n);
    var i = (c) => (f) => c(f) >>> 0, l = (c) => (f, v) => c(f, v) >>> 0, s = (c) => () => c() >>> 0;
    return n.Vc = i(n.Vc), n.Yc = i(n.Yc), n.cd = l(n.cd), n.fd = i(n.fd), n.gd = s(n.gd), n;
  }
  function Ia() {
    if (dr > 0) {
      jr = Ia;
      return;
    }
    if (fe(), dr > 0) {
      jr = Ia;
      return;
    }
    function n() {
      var i;
      r.calledRun = !0, !w && (me(), A == null || A(r), (i = r.onRuntimeInitialized) == null || i.call(r), $e());
    }
    r.setStatus ? (r.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => r.setStatus(""), 1), n();
    }, 1)) : n();
  }
  var pn;
  return pn = await be(), Ia(), Ye ? t = r : t = new Promise((n, i) => {
    A = n, N = i;
  }), t;
}
async function Lk(e, t) {
  if (!t || !e.body)
    return e.arrayBuffer();
  const r = e.headers.get("content-length"), o = r == null ? NaN : Number(r), a = Number.isFinite(o) ? o : null, u = e.body.getReader(), d = [];
  let h = 0;
  for (t(0, a); ; ) {
    const { done: x, value: L } = await u.read();
    if (x)
      break;
    L && (d.push(L), h += L.length, t(h, a));
  }
  const g = new Uint8Array(h);
  let y = 0;
  for (const x of d)
    g.set(x, y), y += x.length;
  return g.buffer;
}
const L0 = /* @__PURE__ */ new Map();
function Dk(e, t) {
  const r = L0.get(e);
  if (!r)
    return null;
  Rk(e, r), t != null && t.onProgress && (r.progress = t.onProgress);
  const o = t == null ? void 0 : t.signal;
  if (o)
    if (o.aborted)
      r.fetchController.abort();
    else {
      const a = () => r.fetchController.abort();
      o.addEventListener("abort", a, { once: !0 });
      const u = () => o.removeEventListener("abort", a);
      r.promise.then(u, u);
    }
  return r.promise;
}
function Rk(e, t) {
  L0.delete(e), t.evictionController.abort();
}
class Fk {
  constructor(t, r, o) {
    Ie(this, "_bindings");
    Ie(this, "_canvas");
    Ie(this, "_dpiScale");
    Ie(this, "_dataModel");
    Ie(this, "_display");
    Ie(this, "_annotationModel");
    Ie(this, "_brush");
    Ie(this, "_rafId", null);
    Ie(this, "_autoRenderPaused", !1);
    Ie(this, "_autoResizePaused", !1);
    Ie(this, "_resizeObserver", null);
    Ie(this, "_eventAbort", new AbortController());
    Ie(this, "_contextMenuCallback", null);
    Ie(this, "_dirCounter", 0);
    try {
      this._bindings = t, this._canvas = r, this._dpiScale = (o == null ? void 0 : o.dpiScale) ?? window.devicePixelRatio ?? 1, this._bindings.init(o == null ? void 0 : o.licenseToken), this._bindings.setDpiScale(this._dpiScale), this._dataModel = this._bindings.dataModel(), this._display = this._bindings.display(), this._annotationModel = this._bindings.annotationModel(), this._brush = this._bindings.brush(), (o == null ? void 0 : o.autoRender) !== !1 && this._setupAutoRender(), (o == null ? void 0 : o.autoResize) !== !1 && this._setupResizeObserver(), (o == null ? void 0 : o.autoInputHandling) !== !1 && this._setupInputHandling(), (o == null ? void 0 : o.uiAnimations) === !1 && this._bindings.enableAnimations(!1), this._updateCanvasSize(!0);
    } catch (a) {
      if (a instanceof WebAssembly.Exception) {
        const u = (() => {
          if ("message" in a && typeof a.message == "string")
            return a.message;
          {
            const [d, h] = t.getExceptionMessage(a);
            return `${d}: ${h}`;
          }
        })();
        throw t.decrementExceptionRefcount(a), new Error(u);
      }
      throw a;
    }
  }
  get dataModel() {
    return this._dataModel;
  }
  get display() {
    return this._display;
  }
  get annotationModel() {
    return this._annotationModel;
  }
  get brush() {
    return this._brush;
  }
  compatibleAlgorithms(t) {
    return this._bindings.compatibleAlgorithms(t);
  }
  async loadFile(t) {
    const r = await t.arrayBuffer();
    return this.loadBuffer(r, t.name);
  }
  async loadFileFromUrl(t, r) {
    const { onProgress: o, signal: a } = r ?? {};
    a == null || a.throwIfAborted();
    const u = new URL(t, window.location.href).pathname, d = decodeURIComponent(u.slice(u.lastIndexOf("/") + 1));
    if (!d)
      throw new Error(`Cannot derive a filename from URL: ${t}`);
    const h = await this._fetchUrlBytes(t, { signal: a, onProgress: o });
    return this.loadBuffer(h, d);
  }
  async loadFolder(t) {
    if (t.length === 0)
      return this.asHandleArray([]);
    const r = this._generateTempDir();
    try {
      const o = t.map((h) => h.webkitRelativePath || h.name), { parentName: a, relativePaths: u } = this._stripCommonParent(o), d = a ? `${r}/${a}` : r;
      for (let h = 0; h < t.length; h++) {
        const g = await t[h].arrayBuffer();
        this._writeFileWithParents(`${d}/${u[h]}`, new Uint8Array(g));
      }
      return this.dataModel.loadFile(d);
    } finally {
      this._rmrf(r);
    }
  }
  async loadFolderFromUrls(t, r) {
    const { onProgress: o, signal: a, concurrency: u = 6 } = r ?? {};
    if (a == null || a.throwIfAborted(), !Number.isFinite(u) || u < 1)
      throw new Error(`concurrency must be a finite positive number, got ${u}`);
    if (t.length === 0)
      return this.asHandleArray([]);
    const d = t.map((B) => new URL(B, window.location.href)), { origin: h } = d[0];
    for (let B = 0; B < d.length; B++) {
      const Y = d[B];
      if (Y.origin !== h)
        throw new Error(`All URLs must share the same origin. Got both "${h}" and "${Y.origin}".`);
      if (Y.pathname.endsWith("/"))
        throw new Error(`URL must point to a file: ${t[B]}`);
    }
    const g = new AbortController(), y = () => g.abort();
    a == null || a.addEventListener("abort", y, { once: !0 });
    const x = this._generateTempDir(), L = d.map((B) => decodeURIComponent(B.pathname).replace(/^\/+/, "")), { parentName: C, relativePaths: P } = this._stripCommonParent(L), $ = C ? `${x}/${C}` : x;
    try {
      const B = new Array(t.length).fill(null), Y = new Array(t.length).fill(0), k = () => {
        if (!o)
          return;
        let N = 0, F = 0;
        for (let W = 0; W < t.length; W++)
          if (N += Y[W], F !== null) {
            const K = B[W];
            K === null ? F = null : F += K;
          }
        o(N, F);
      };
      k();
      const w = async (N) => {
        const F = t[N], W = (Z, T) => {
          Y[N] = Z, B[N] === null && T !== null && (B[N] = T), k();
        }, K = await this._fetchUrlBytes(F, { signal: g.signal, onProgress: W });
        Y[N] = K.byteLength, B[N] === null && (B[N] = K.byteLength), k(), this._writeFileWithParents(`${$}/${P[N]}`, new Uint8Array(K));
      };
      let S = 0;
      const E = async () => {
        for (; !g.signal.aborted; ) {
          const N = S++;
          if (N >= t.length)
            return;
          try {
            await w(N);
          } catch (F) {
            throw g.abort(), F;
          }
        }
      }, A = Math.min(Math.floor(u), t.length);
      return await Promise.all(Array.from({ length: A }, () => E())), a == null || a.throwIfAborted(), this.dataModel.loadFile($);
    } finally {
      a == null || a.removeEventListener("abort", y), this._rmrf(x);
    }
  }
  loadBuffer(t, r) {
    const o = this._generateTempDir(), a = `${o}/${r}`;
    try {
      return this._writeFileWithParents(a, new Uint8Array(t)), Promise.resolve(this.dataModel.loadFile(a));
    } finally {
      this._rmrf(o);
    }
  }
  createImage(t) {
    const { dimensions: r, channels: o, data: a, spacing: u } = t, { PixelType: d } = this._bindings;
    let h = null;
    if (a instanceof Int8Array ? h = d.Byte : a instanceof Uint8Array ? h = d.UByte : a instanceof Int16Array ? h = d.Short : a instanceof Uint16Array ? h = d.UShort : a instanceof Int32Array ? h = d.Int : a instanceof Uint32Array ? h = d.UInt : a instanceof Float32Array ? h = d.Float : a instanceof Float64Array && (h = d.Double), h === null)
      return null;
    const g = new this._bindings.ImageDescriptor(h, r, o);
    return u !== void 0 && g.setSpacing(u, !0), this._bindings.Image.fromTypedArray(g, a);
  }
  createSharedImageSet(t) {
    const r = new this._bindings.SharedImageSet();
    if (t)
      for (const o of t)
        r.add(o);
    return r;
  }
  show(t) {
    const r = this.display.viewGroup();
    r.showData(t), r.centerOnData(t), this.render();
  }
  showAll(t) {
    const r = this.display.viewGroup();
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      a && (r.showData(a), o === 0 && r.centerOnData(a));
    }
    this.render();
  }
  asHandleArray(t) {
    return this._bindings._imfusion_wrap_handle_array(t);
  }
  onContextMenu(t) {
    return this._contextMenuCallback = t, () => {
      this._contextMenuCallback = null;
    };
  }
  render() {
    this.display.render();
  }
  pauseAutoRender() {
    this._autoRenderPaused = !0, this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null);
  }
  resumeAutoRender() {
    this._autoRenderPaused = !1;
  }
  get isAutoRenderPaused() {
    return this._autoRenderPaused;
  }
  get isAutoResizePaused() {
    return this._autoResizePaused;
  }
  pauseAutoResize() {
    this._autoResizePaused = !0;
  }
  resumeAutoResize() {
    this._autoResizePaused = !1, this._updateCanvasSize();
  }
  get dpiScale() {
    return this._dpiScale;
  }
  setDpiScale(t) {
    this._dpiScale = t, this._bindings.setDpiScale(t), this._updateCanvasSize();
  }
  updateSize() {
    this._updateCanvasSize();
  }
  createCustomGlObject(t, r) {
    return this._bindings.GlObject.implement(t, r);
  }
  get bindings() {
    return this._bindings;
  }
  get FS() {
    return this._bindings.FS;
  }
  get canvas() {
    return this._canvas;
  }
  destroy() {
    var t;
    (t = this._resizeObserver) == null || t.disconnect(), this._resizeObserver = null, this._eventAbort.abort(), this._rafId !== null && (cancelAnimationFrame(this._rafId), this._rafId = null);
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // Private Methods
  // ═══════════════════════════════════════════════════════════════════════════
  _setupAutoRender() {
    this._display.onUpdateRequested(() => {
      this._autoRenderPaused || this._rafId === null && (this._rafId = requestAnimationFrame(() => {
        this._rafId = null, this._autoRenderPaused || this.display.render();
      }));
    });
  }
  _setupResizeObserver() {
    this._resizeObserver = new ResizeObserver(() => {
      this._autoResizePaused || this._updateCanvasSize();
    }), this._resizeObserver.observe(this._canvas);
  }
  _setupInputHandling() {
    const t = this._canvas, r = this.display, { signal: o } = this._eventAbort, a = (u, d) => {
      const h = d(this._createScaledEvent(u));
      t.style.cursor = h.cursorShape, !h.contextMenu.isEmpty() && this._contextMenuCallback && this._contextMenuCallback(h.contextMenu, u), h.stopPropagation && u.stopPropagation();
    };
    t.addEventListener("pointerdown", (u) => {
      u.pointerType !== "touch" && (t.setPointerCapture(u.pointerId), a(u, (d) => r.handleMouseDown(d)));
    }, { signal: o }), t.addEventListener("pointermove", (u) => {
      u.pointerType !== "touch" && a(u, (d) => r.handleMouseMove(d));
    }, { signal: o }), t.addEventListener("pointerup", (u) => {
      u.pointerType !== "touch" && a(u, (d) => r.handleMouseUp(d));
    }, { signal: o }), t.addEventListener("touchstart", (u) => {
      u.preventDefault(), a(u, (d) => r.handleTouchStart(d));
    }, { passive: !1, signal: o }), t.addEventListener("touchmove", (u) => {
      u.preventDefault(), a(u, (d) => r.handleTouchMove(d));
    }, { passive: !1, signal: o }), t.addEventListener("touchend", (u) => {
      u.preventDefault(), a(u, (d) => r.handleTouchEnd(d));
    }, { signal: o }), t.addEventListener("dblclick", (u) => a(u, (d) => r.handleDoubleClick(d)), { signal: o }), t.addEventListener("wheel", (u) => {
      u.preventDefault(), a(u, (d) => r.handleMouseWheel(d));
    }, { passive: !1, signal: o }), t.addEventListener("contextmenu", (u) => {
      u.preventDefault(), a(u, (d) => r.handleContextMenu(d));
    }, { signal: o });
  }
  _updateCanvasSize(t = !1) {
    if (!this._canvas.isConnected)
      return;
    const r = this._canvas.getBoundingClientRect(), o = r.width, a = r.height, u = Math.floor(o * this._dpiScale), d = Math.floor(a * this._dpiScale);
    (t || this._canvas.width !== u || this._canvas.height !== d) && (this._canvas.width = u, this._canvas.height = d, this._bindings.setDpiScale(this._dpiScale), this.display.setSize(u, d), this.display.render());
  }
  _createScaledEvent(t) {
    if (this._dpiScale === 1)
      return t;
    const r = this._canvas.getBoundingClientRect(), o = this._dpiScale, a = (u, d) => d + (u - d) * o;
    if (t instanceof MouseEvent)
      return new Proxy(t, {
        get(u, d) {
          if (d === "clientX")
            return a(u.clientX, r.left);
          if (d === "clientY")
            return a(u.clientY, r.top);
          if (d === "deltaX" && "deltaX" in u)
            return u.deltaX * o;
          if (d === "deltaY" && "deltaY" in u)
            return u.deltaY * o;
          const h = Reflect.get(u, d);
          return typeof h == "function" ? h.bind(u) : h;
        }
      });
    if (t instanceof TouchEvent) {
      const u = (h) => new Proxy(h, {
        get(g, y) {
          return y === "clientX" ? a(g.clientX, r.left) : y === "clientY" ? a(g.clientY, r.top) : Reflect.get(g, y);
        }
      }), d = (h) => Array.from(h, u);
      return new Proxy(t, {
        get(h, g) {
          if (g === "touches")
            return d(h.touches);
          if (g === "changedTouches")
            return d(h.changedTouches);
          if (g === "targetTouches")
            return d(h.targetTouches);
          const y = Reflect.get(h, g);
          return typeof y == "function" ? y.bind(h) : y;
        }
      });
    }
    return t;
  }
  _generateTempDir() {
    return `/temp_${this._dirCounter++}`;
  }
  /** Fetch `url` into an ArrayBuffer. Checks the prefetch cache first. */
  async _fetchUrlBytes(t, r) {
    const { signal: o, onProgress: a } = r, u = Dk(t, { onProgress: a, signal: o });
    let d;
    if (u)
      d = await u;
    else {
      const h = await fetch(t, { signal: o });
      if (!h.ok)
        throw new Error(`Failed to fetch ${t}: ${h.status} ${h.statusText}`);
      d = await Lk(h, a);
    }
    return o == null || o.throwIfAborted(), d;
  }
  _commonParentPath(t) {
    if (t.length === 0)
      return "";
    const r = t[0];
    let o = r.length;
    for (let a = 1; a < t.length; a++) {
      const u = t[a], d = Math.min(o, u.length);
      let h = 0;
      for (; h < d && u[h] === r[h]; )
        h++;
      o = h;
    }
    for (; o > 0 && r[o - 1] !== "/"; )
      o--;
    return r.slice(0, o);
  }
  /** Strip the shared parent directory from folder-entry paths and return its basename separately. */
  _stripCommonParent(t) {
    for (const d of t)
      this._validateRelativePath(d);
    const r = this._commonParentPath(t), o = r.replace(/\/+$/, ""), a = o ? o.slice(o.lastIndexOf("/") + 1) : null, u = t.map((d) => {
      const h = d.slice(r.length);
      return this._validateRelativePath(h), h;
    });
    return { parentName: a, relativePaths: u };
  }
  _validateRelativePath(t) {
    if (!t)
      throw new Error("Directory entry path must not be empty");
    if (t.includes("\\"))
      throw new Error(`Directory entry path must use forward slashes: "${t}"`);
    if (t.startsWith("/"))
      throw new Error(`Directory entry path must be relative: "${t}"`);
    for (const r of t.split("/"))
      if (r === "" || r === "." || r === "..")
        throw new Error(`Directory entry path has an invalid segment "${r}" in: "${t}"`);
  }
  /** Write a file to wasm FS, creating any missing parent directories. */
  _writeFileWithParents(t, r) {
    this._bindings.FS.mkdirTree(t.substring(0, t.lastIndexOf("/")), 511), this._bindings.FS.writeFile(t, r);
  }
  /** Recursively remove a file or directory from wasm FS. */
  _rmrf(t) {
    const r = this._bindings.FS;
    let o;
    try {
      o = r.readdir(t);
    } catch {
      try {
        r.unlink(t);
      } catch {
      }
      return;
    }
    for (const a of o)
      a === "." || a === ".." || this._rmrf(`${t}/${a}`);
    try {
      r.rmdir(t);
    } catch {
    }
  }
}
let cs = null;
function D0(e) {
  return cs ?? (cs = (async () => {
    const t = (e == null ? void 0 : e.url) ?? new URL("..".concat("/wasm/ImFusionLib.wasm"), import.meta.url);
    try {
      return await WebAssembly.compileStreaming(fetch(t));
    } catch {
      const r = await fetch(t).then((o) => o.arrayBuffer());
      return WebAssembly.compile(r);
    }
  })().catch((t) => {
    throw cs = null, t;
  })), cs;
}
async function $k(e, t) {
  const r = await D0(), o = await Tk({
    canvas: e,
    instantiateWasm: (a, u) => (WebAssembly.instantiate(r, a).then((d) => u(d, r)), {})
  });
  return new Fk(o, e, t);
}
const Rn = M.createContext(null);
function Ak({ options: e, onReady: t, onError: r, children: o }) {
  const [a, u] = M.useState(null), [d, h] = M.useState(null), [g, y] = M.useState(null), x = M.useRef(null), L = M.useRef(null), C = M.useRef(e), P = M.useRef(t), $ = M.useRef(r);
  P.current = t, $.current = r;
  const B = M.useCallback((k) => {
    if (L.current) {
      L.current !== k && console.warn("ImFusionProvider: A different canvas element was registered after SDK initialization. The SDK remains bound to the original canvas.");
      return;
    }
    L.current = k, u(k);
  }, []);
  M.useEffect(() => {
    if (!a)
      return;
    let k = !1;
    return x.current || (x.current = $k(a, C.current)), x.current.then((w) => {
      var S;
      k || (h(w), (S = P.current) == null || S.call(P, w));
    }).catch((w) => {
      var S;
      if (!k) {
        const E = w instanceof Error ? w : new Error(String(w));
        y(E), (S = $.current) == null || S.call($, E);
      }
    }), () => {
      var w;
      k = !0, (w = x.current) == null || w.then((S) => S.destroy());
    };
  }, [a]);
  const Y = M.useMemo(() => ({ imf: d, error: g, registerCanvas: B }), [d, g, B]);
  return D.jsx(Rn.Provider, { value: Y, children: o });
}
const Ok = M.forwardRef(function(t, r) {
  const o = M.useContext(Rn), a = M.useRef(null);
  if (!o)
    throw new Error("ImFusionCanvas must be used within an ImFusionProvider");
  M.useEffect(() => {
    const d = a.current;
    d && o.registerCanvas(d);
  }, [o.registerCanvas]);
  const u = (d) => {
    a.current = d, typeof r == "function" ? r(d) : r && (r.current = d);
  };
  return D.jsx("canvas", { ref: u, ...t });
});
function Mk({ children: e }) {
  const t = M.useContext(Rn);
  if (!t)
    throw new Error("ImFusionReady must be used within an ImFusionProvider");
  return t.imf ? D.jsx(D.Fragment, { children: e }) : null;
}
function Ik({ children: e }) {
  const t = M.useContext(Rn);
  if (!t)
    throw new Error("ImFusionLoading must be used within an ImFusionProvider");
  return !t.imf && !t.error ? D.jsx(D.Fragment, { children: e }) : null;
}
function jk({ children: e }) {
  const t = M.useContext(Rn);
  if (!t)
    throw new Error("ImFusionError must be used within an ImFusionProvider");
  return t.error ? D.jsx(D.Fragment, { children: e }) : null;
}
function sn() {
  const e = M.useContext(Rn);
  if (!e)
    throw new Error("useImFusion must be used within an ImFusionProvider");
  if (!e.imf)
    throw new Error("ImFusion SDK is not yet initialized");
  return e.imf;
}
function Nk() {
  const e = M.useContext(Rn);
  if (!e)
    throw new Error("useImFusionError must be used within an ImFusionProvider");
  if (!e.error)
    throw new Error("No initialization error has occurred");
  return e.error;
}
function vc(e) {
  const [t, r] = M.useState(e);
  return e !== void 0 && t !== void 0 ? e.isAliasOf(t) || r(e) : e !== t && r(e), t;
}
function cl(e) {
  const t = sn(), r = vc(e), [o, a] = M.useState(() => t.display.layouter().isViewHidden(r));
  M.useEffect(() => {
    const d = t.display.layouter();
    return a(d.isViewHidden(r)), d.onViewHiddenChanged((g, y) => {
      g.isAliasOf(r) && a(y);
    });
  }, [t, r]);
  const u = M.useCallback((d) => t.display.layouter().setViewHidden(r, d), [t, r]);
  return { hidden: o, setHidden: u };
}
function zk(e) {
  sn();
  const [, t] = M.useReducer((u) => !u, !1), r = vc(e), [o, a] = M.useState(() => r.displayOptions2d());
  return M.useEffect(() => {
    const u = r.displayOptions2d();
    return a(u), u.onChanged(() => t());
  }, [r]), o;
}
function Bk(e) {
  sn();
  const [, t] = M.useReducer((u) => !u, !1), r = vc(e), [o, a] = M.useState(() => r.displayOptions3d());
  return M.useEffect(() => {
    const u = r.displayOptions3d();
    return a(u), u.onChanged(() => t());
  }, [r]), o;
}
const R0 = 320, F0 = 180, Uk = F0 / R0;
function yd({ color: e, size: t = 24, style: r }) {
  const o = t * Uk;
  return /* @__PURE__ */ D.jsxs(
    "svg",
    {
      width: t,
      height: o,
      viewBox: `0 0 ${R0} ${F0}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ D.jsx("path", { d: "M320 180H0V159.715L237.082 128.105L320 65.916V180Z", fill: e }),
        /* @__PURE__ */ D.jsx("path", { d: "M320 20.2832L82.918 51.8945L0 114.082V0H320V20.2832Z", fill: e })
      ]
    }
  );
}
const Vk = "0.1.1";
function Wk({ isDark: e }) {
  const [t, r] = M.useState(!1), o = M.useRef(null);
  M.useEffect(() => {
    if (!t) return;
    function u(h) {
      o.current && !o.current.contains(h.target) && r(!1);
    }
    function d(h) {
      h.key === "Escape" && r(!1);
    }
    return document.addEventListener("mousedown", u), document.addEventListener("keydown", d), () => {
      document.removeEventListener("mousedown", u), document.removeEventListener("keydown", d);
    };
  }, [t]);
  const a = e ? "#F9FDFE" : "#245EFF";
  return /* @__PURE__ */ D.jsxs("div", { ref: o, style: Hk, children: [
    /* @__PURE__ */ D.jsx(
      "button",
      {
        type: "button",
        onClick: () => r((u) => !u),
        style: Gk,
        "aria-label": "About ImFusion Viewer",
        title: "About ImFusion Viewer",
        "aria-expanded": t,
        children: /* @__PURE__ */ D.jsx(yd, { color: a, size: 16 })
      }
    ),
    t && /* @__PURE__ */ D.jsxs("div", { style: Xk, role: "dialog", "aria-label": "About ImFusion Viewer", children: [
      /* @__PURE__ */ D.jsx(yd, { color: a, size: 30, style: Yk }),
      /* @__PURE__ */ D.jsx("div", { style: Kk, children: "ImFusion Viewer" }),
      /* @__PURE__ */ D.jsxs("div", { style: Qk, children: [
        "Version ",
        Vk
      ] }),
      /* @__PURE__ */ D.jsx("div", { style: Zk, children: "Copyright © ImFusion GmbH." }),
      /* @__PURE__ */ D.jsx("div", { style: qk, children: "Not for clinical use." })
    ] })
  ] });
}
const Hk = {
  position: "relative",
  flexShrink: 0
}, Gk = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  cursor: "pointer"
}, Xk = {
  position: "absolute",
  top: "calc(100% + 6px)",
  right: 0,
  zIndex: 20,
  width: 260,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "12px 14px",
  background: "color-mix(in srgb, var(--tb-surface) 92%, transparent)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid var(--tb-border)",
  borderRadius: 8,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  color: "var(--tb-text)",
  lineHeight: 1.45
}, Yk = {
  marginBottom: 2
}, Kk = {}, Qk = {
  color: "var(--tb-text-muted)",
  marginBottom: 4
}, Zk = {}, qk = {
  color: "var(--tb-error)"
}, Jk = {
  color: "var(--tb-text-muted)",
  marginTop: 2
};
function _i(e) {
  let t = e.length;
  for (; --t >= 0; )
    e[t] = 0;
}
const eS = 3, tS = 258, $0 = 29, rS = 256, nS = rS + 1 + $0, A0 = 30, iS = 512, oS = new Array((nS + 2) * 2);
_i(oS);
const lS = new Array(A0 * 2);
_i(lS);
const aS = new Array(iS);
_i(aS);
const sS = new Array(tS - eS + 1);
_i(sS);
const uS = new Array($0);
_i(uS);
const cS = new Array(A0);
_i(cS);
const fS = (e, t, r, o) => {
  let a = e & 65535 | 0, u = e >>> 16 & 65535 | 0, d = 0;
  for (; r !== 0; ) {
    d = r > 2e3 ? 2e3 : r, r -= d;
    do
      a = a + t[o++] | 0, u = u + a | 0;
    while (--d);
    a %= 65521, u %= 65521;
  }
  return a | u << 16 | 0;
};
var hu = fS;
const dS = () => {
  let e, t = [];
  for (var r = 0; r < 256; r++) {
    e = r;
    for (var o = 0; o < 8; o++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[r] = e;
  }
  return t;
}, pS = new Uint32Array(dS()), vS = (e, t, r, o) => {
  const a = pS, u = o + r;
  e ^= -1;
  for (let d = o; d < u; d++)
    e = e >>> 8 ^ a[(e ^ t[d]) & 255];
  return e ^ -1;
};
var hr = vS, mu = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, O0 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const hS = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
var mS = function(e) {
  const t = Array.prototype.slice.call(arguments, 1);
  for (; t.length; ) {
    const r = t.shift();
    if (r) {
      if (typeof r != "object")
        throw new TypeError(r + "must be non-object");
      for (const o in r)
        hS(r, o) && (e[o] = r[o]);
    }
  }
  return e;
}, gS = (e) => {
  let t = 0;
  for (let o = 0, a = e.length; o < a; o++)
    t += e[o].length;
  const r = new Uint8Array(t);
  for (let o = 0, a = 0, u = e.length; o < u; o++) {
    let d = e[o];
    r.set(d, a), a += d.length;
  }
  return r;
}, M0 = {
  assign: mS,
  flattenChunks: gS
};
let I0 = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  I0 = !1;
}
const wo = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  wo[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
wo[254] = wo[255] = 1;
var yS = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let t, r, o, a, u, d = e.length, h = 0;
  for (a = 0; a < d; a++)
    r = e.charCodeAt(a), (r & 64512) === 55296 && a + 1 < d && (o = e.charCodeAt(a + 1), (o & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (o - 56320), a++)), h += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
  for (t = new Uint8Array(h), u = 0, a = 0; u < h; a++)
    r = e.charCodeAt(a), (r & 64512) === 55296 && a + 1 < d && (o = e.charCodeAt(a + 1), (o & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (o - 56320), a++)), r < 128 ? t[u++] = r : r < 2048 ? (t[u++] = 192 | r >>> 6, t[u++] = 128 | r & 63) : r < 65536 ? (t[u++] = 224 | r >>> 12, t[u++] = 128 | r >>> 6 & 63, t[u++] = 128 | r & 63) : (t[u++] = 240 | r >>> 18, t[u++] = 128 | r >>> 12 & 63, t[u++] = 128 | r >>> 6 & 63, t[u++] = 128 | r & 63);
  return t;
};
const _S = (e, t) => {
  if (t < 65534 && e.subarray && I0)
    return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
  let r = "";
  for (let o = 0; o < t; o++)
    r += String.fromCharCode(e[o]);
  return r;
};
var wS = (e, t) => {
  const r = t || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, t));
  let o, a;
  const u = new Array(r * 2);
  for (a = 0, o = 0; o < r; ) {
    let d = e[o++];
    if (d < 128) {
      u[a++] = d;
      continue;
    }
    let h = wo[d];
    if (h > 4) {
      u[a++] = 65533, o += h - 1;
      continue;
    }
    for (d &= h === 2 ? 31 : h === 3 ? 15 : 7; h > 1 && o < r; )
      d = d << 6 | e[o++] & 63, h--;
    if (h > 1) {
      u[a++] = 65533;
      continue;
    }
    d < 65536 ? u[a++] = d : (d -= 65536, u[a++] = 55296 | d >> 10 & 1023, u[a++] = 56320 | d & 1023);
  }
  return _S(u, a);
}, xS = (e, t) => {
  t = t || e.length, t > e.length && (t = e.length);
  let r = t - 1;
  for (; r >= 0 && (e[r] & 192) === 128; )
    r--;
  return r < 0 || r === 0 ? t : r + wo[e[r]] > t ? r : t;
}, gu = {
  string2buf: yS,
  buf2string: wS,
  utf8border: xS
};
function kS() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var SS = kS;
const fl = 16209, ES = 16191;
var CS = function(t, r) {
  let o, a, u, d, h, g, y, x, L, C, P, $, B, Y, k, w, S, E, A, N, F, W, K, Z;
  const T = t.state;
  o = t.next_in, K = t.input, a = o + (t.avail_in - 5), u = t.next_out, Z = t.output, d = u - (r - t.avail_out), h = u + (t.avail_out - 257), g = T.dmax, y = T.wsize, x = T.whave, L = T.wnext, C = T.window, P = T.hold, $ = T.bits, B = T.lencode, Y = T.distcode, k = (1 << T.lenbits) - 1, w = (1 << T.distbits) - 1;
  e:
    do {
      $ < 15 && (P += K[o++] << $, $ += 8, P += K[o++] << $, $ += 8), S = B[P & k];
      t:
        for (; ; ) {
          if (E = S >>> 24, P >>>= E, $ -= E, E = S >>> 16 & 255, E === 0)
            Z[u++] = S & 65535;
          else if (E & 16) {
            A = S & 65535, E &= 15, E && ($ < E && (P += K[o++] << $, $ += 8), A += P & (1 << E) - 1, P >>>= E, $ -= E), $ < 15 && (P += K[o++] << $, $ += 8, P += K[o++] << $, $ += 8), S = Y[P & w];
            r:
              for (; ; ) {
                if (E = S >>> 24, P >>>= E, $ -= E, E = S >>> 16 & 255, E & 16) {
                  if (N = S & 65535, E &= 15, $ < E && (P += K[o++] << $, $ += 8, $ < E && (P += K[o++] << $, $ += 8)), N += P & (1 << E) - 1, N > g) {
                    t.msg = "invalid distance too far back", T.mode = fl;
                    break e;
                  }
                  if (P >>>= E, $ -= E, E = u - d, N > E) {
                    if (E = N - E, E > x && T.sane) {
                      t.msg = "invalid distance too far back", T.mode = fl;
                      break e;
                    }
                    if (F = 0, W = C, L === 0) {
                      if (F += y - E, E < A) {
                        A -= E;
                        do
                          Z[u++] = C[F++];
                        while (--E);
                        F = u - N, W = Z;
                      }
                    } else if (L < E) {
                      if (F += y + L - E, E -= L, E < A) {
                        A -= E;
                        do
                          Z[u++] = C[F++];
                        while (--E);
                        if (F = 0, L < A) {
                          E = L, A -= E;
                          do
                            Z[u++] = C[F++];
                          while (--E);
                          F = u - N, W = Z;
                        }
                      }
                    } else if (F += L - E, E < A) {
                      A -= E;
                      do
                        Z[u++] = C[F++];
                      while (--E);
                      F = u - N, W = Z;
                    }
                    for (; A > 2; )
                      Z[u++] = W[F++], Z[u++] = W[F++], Z[u++] = W[F++], A -= 3;
                    A && (Z[u++] = W[F++], A > 1 && (Z[u++] = W[F++]));
                  } else {
                    F = u - N;
                    do
                      Z[u++] = Z[F++], Z[u++] = Z[F++], Z[u++] = Z[F++], A -= 3;
                    while (A > 2);
                    A && (Z[u++] = Z[F++], A > 1 && (Z[u++] = Z[F++]));
                  }
                } else if (E & 64) {
                  t.msg = "invalid distance code", T.mode = fl;
                  break e;
                } else {
                  S = Y[(S & 65535) + (P & (1 << E) - 1)];
                  continue r;
                }
                break;
              }
          } else if (E & 64)
            if (E & 32) {
              T.mode = ES;
              break e;
            } else {
              t.msg = "invalid literal/length code", T.mode = fl;
              break e;
            }
          else {
            S = B[(S & 65535) + (P & (1 << E) - 1)];
            continue t;
          }
          break;
        }
    } while (o < a && u < h);
  A = $ >> 3, o -= A, $ -= A << 3, P &= (1 << $) - 1, t.next_in = o, t.next_out = u, t.avail_in = o < a ? 5 + (a - o) : 5 - (o - a), t.avail_out = u < h ? 257 + (h - u) : 257 - (u - h), T.hold = P, T.bits = $;
};
const Vn = 15, _d = 852, wd = 592, xd = 0, fs = 1, kd = 2, bS = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), PS = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  199,
  75
]), TS = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), LS = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), DS = (e, t, r, o, a, u, d, h) => {
  const g = h.bits;
  let y = 0, x = 0, L = 0, C = 0, P = 0, $ = 0, B = 0, Y = 0, k = 0, w = 0, S, E, A, N, F, W = null, K;
  const Z = new Uint16Array(Vn + 1), T = new Uint16Array(Vn + 1);
  let re = null, pe, Ct, Ee;
  for (y = 0; y <= Vn; y++)
    Z[y] = 0;
  for (x = 0; x < o; x++)
    Z[t[r + x]]++;
  for (P = g, C = Vn; C >= 1 && Z[C] === 0; C--)
    ;
  if (P > C && (P = C), C === 0)
    return a[u++] = 1 << 24 | 64 << 16 | 0, a[u++] = 1 << 24 | 64 << 16 | 0, h.bits = 1, 0;
  for (L = 1; L < C && Z[L] === 0; L++)
    ;
  for (P < L && (P = L), Y = 1, y = 1; y <= Vn; y++)
    if (Y <<= 1, Y -= Z[y], Y < 0)
      return -1;
  if (Y > 0 && (e === xd || C !== 1))
    return -1;
  for (T[1] = 0, y = 1; y < Vn; y++)
    T[y + 1] = T[y] + Z[y];
  for (x = 0; x < o; x++)
    t[r + x] !== 0 && (d[T[t[r + x]]++] = x);
  if (e === xd ? (W = re = d, K = 20) : e === fs ? (W = bS, re = PS, K = 257) : (W = TS, re = LS, K = 0), w = 0, x = 0, y = L, F = u, $ = P, B = 0, A = -1, k = 1 << P, N = k - 1, e === fs && k > _d || e === kd && k > wd)
    return 1;
  for (; ; ) {
    pe = y - B, d[x] + 1 < K ? (Ct = 0, Ee = d[x]) : d[x] >= K ? (Ct = re[d[x] - K], Ee = W[d[x] - K]) : (Ct = 96, Ee = 0), S = 1 << y - B, E = 1 << $, L = E;
    do
      E -= S, a[F + (w >> B) + E] = pe << 24 | Ct << 16 | Ee | 0;
    while (E !== 0);
    for (S = 1 << y - 1; w & S; )
      S >>= 1;
    if (S !== 0 ? (w &= S - 1, w += S) : w = 0, x++, --Z[y] === 0) {
      if (y === C)
        break;
      y = t[r + d[x]];
    }
    if (y > P && (w & N) !== A) {
      for (B === 0 && (B = P), F += L, $ = y - B, Y = 1 << $; $ + B < C && (Y -= Z[$ + B], !(Y <= 0)); )
        $++, Y <<= 1;
      if (k += 1 << $, e === fs && k > _d || e === kd && k > wd)
        return 1;
      A = w & N, a[A] = P << 24 | $ << 16 | F - u | 0;
    }
  }
  return w !== 0 && (a[F + w] = y - B << 24 | 64 << 16 | 0), h.bits = P, 0;
};
var to = DS;
const RS = 0, j0 = 1, N0 = 2, {
  Z_FINISH: Sd,
  Z_BLOCK: FS,
  Z_TREES: dl,
  Z_OK: Tn,
  Z_STREAM_END: $S,
  Z_NEED_DICT: AS,
  Z_STREAM_ERROR: Jt,
  Z_DATA_ERROR: z0,
  Z_MEM_ERROR: B0,
  Z_BUF_ERROR: OS,
  Z_DEFLATED: Ed
} = O0, ha = 16180, Cd = 16181, bd = 16182, Pd = 16183, Td = 16184, Ld = 16185, Dd = 16186, Rd = 16187, Fd = 16188, $d = 16189, ql = 16190, br = 16191, ds = 16192, Ad = 16193, ps = 16194, Od = 16195, Md = 16196, Id = 16197, jd = 16198, pl = 16199, vl = 16200, Nd = 16201, zd = 16202, Bd = 16203, Ud = 16204, Vd = 16205, vs = 16206, Wd = 16207, Hd = 16208, Ue = 16209, U0 = 16210, V0 = 16211, MS = 852, IS = 592, jS = 15, NS = jS, Gd = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function zS() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Fn = (e) => {
  if (!e)
    return 1;
  const t = e.state;
  return !t || t.strm !== e || t.mode < ha || t.mode > V0 ? 1 : 0;
}, W0 = (e) => {
  if (Fn(e))
    return Jt;
  const t = e.state;
  return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = ha, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(MS), t.distcode = t.distdyn = new Int32Array(IS), t.sane = 1, t.back = -1, Tn;
}, H0 = (e) => {
  if (Fn(e))
    return Jt;
  const t = e.state;
  return t.wsize = 0, t.whave = 0, t.wnext = 0, W0(e);
}, G0 = (e, t) => {
  let r;
  if (Fn(e))
    return Jt;
  const o = e.state;
  return t < 0 ? (r = 0, t = -t) : (r = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? Jt : (o.window !== null && o.wbits !== t && (o.window = null), o.wrap = r, o.wbits = t, H0(e));
}, X0 = (e, t) => {
  if (!e)
    return Jt;
  const r = new zS();
  e.state = r, r.strm = e, r.window = null, r.mode = ha;
  const o = G0(e, t);
  return o !== Tn && (e.state = null), o;
}, BS = (e) => X0(e, NS);
let Xd = !0, hs, ms;
const US = (e) => {
  if (Xd) {
    hs = new Int32Array(512), ms = new Int32Array(32);
    let t = 0;
    for (; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (to(j0, e.lens, 0, 288, hs, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    to(N0, e.lens, 0, 32, ms, 0, e.work, { bits: 5 }), Xd = !1;
  }
  e.lencode = hs, e.lenbits = 9, e.distcode = ms, e.distbits = 5;
}, Y0 = (e, t, r, o) => {
  let a;
  const u = e.state;
  return u.window === null && (u.window = new Uint8Array(1 << u.wbits)), u.wsize === 0 && (u.wsize = 1 << u.wbits, u.wnext = 0, u.whave = 0), o >= u.wsize ? (u.window.set(t.subarray(r - u.wsize, r), 0), u.wnext = 0, u.whave = u.wsize) : (a = u.wsize - u.wnext, a > o && (a = o), u.window.set(t.subarray(r - o, r - o + a), u.wnext), o -= a, o ? (u.window.set(t.subarray(r - o, r), 0), u.wnext = o, u.whave = u.wsize) : (u.wnext += a, u.wnext === u.wsize && (u.wnext = 0), u.whave < u.wsize && (u.whave += a))), 0;
}, VS = (e, t) => {
  let r, o, a, u, d, h, g, y, x, L, C, P, $, B, Y = 0, k, w, S, E, A, N, F, W;
  const K = new Uint8Array(4);
  let Z, T;
  const re = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Fn(e) || !e.output || !e.input && e.avail_in !== 0)
    return Jt;
  r = e.state, r.mode === br && (r.mode = ds), d = e.next_out, a = e.output, g = e.avail_out, u = e.next_in, o = e.input, h = e.avail_in, y = r.hold, x = r.bits, L = h, C = g, W = Tn;
  e:
    for (; ; )
      switch (r.mode) {
        case ha:
          if (r.wrap === 0) {
            r.mode = ds;
            break;
          }
          for (; x < 16; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if (r.wrap & 2 && y === 35615) {
            r.wbits === 0 && (r.wbits = 15), r.check = 0, K[0] = y & 255, K[1] = y >>> 8 & 255, r.check = hr(r.check, K, 2, 0), y = 0, x = 0, r.mode = Cd;
            break;
          }
          if (r.head && (r.head.done = !1), !(r.wrap & 1) || /* check if zlib header allowed */
          (((y & 255) << 8) + (y >> 8)) % 31) {
            e.msg = "incorrect header check", r.mode = Ue;
            break;
          }
          if ((y & 15) !== Ed) {
            e.msg = "unknown compression method", r.mode = Ue;
            break;
          }
          if (y >>>= 4, x -= 4, F = (y & 15) + 8, r.wbits === 0 && (r.wbits = F), F > 15 || F > r.wbits) {
            e.msg = "invalid window size", r.mode = Ue;
            break;
          }
          r.dmax = 1 << r.wbits, r.flags = 0, e.adler = r.check = 1, r.mode = y & 512 ? $d : br, y = 0, x = 0;
          break;
        case Cd:
          for (; x < 16; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if (r.flags = y, (r.flags & 255) !== Ed) {
            e.msg = "unknown compression method", r.mode = Ue;
            break;
          }
          if (r.flags & 57344) {
            e.msg = "unknown header flags set", r.mode = Ue;
            break;
          }
          r.head && (r.head.text = y >> 8 & 1), r.flags & 512 && r.wrap & 4 && (K[0] = y & 255, K[1] = y >>> 8 & 255, r.check = hr(r.check, K, 2, 0)), y = 0, x = 0, r.mode = bd;
        case bd:
          for (; x < 32; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          r.head && (r.head.time = y), r.flags & 512 && r.wrap & 4 && (K[0] = y & 255, K[1] = y >>> 8 & 255, K[2] = y >>> 16 & 255, K[3] = y >>> 24 & 255, r.check = hr(r.check, K, 4, 0)), y = 0, x = 0, r.mode = Pd;
        case Pd:
          for (; x < 16; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          r.head && (r.head.xflags = y & 255, r.head.os = y >> 8), r.flags & 512 && r.wrap & 4 && (K[0] = y & 255, K[1] = y >>> 8 & 255, r.check = hr(r.check, K, 2, 0)), y = 0, x = 0, r.mode = Td;
        case Td:
          if (r.flags & 1024) {
            for (; x < 16; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            r.length = y, r.head && (r.head.extra_len = y), r.flags & 512 && r.wrap & 4 && (K[0] = y & 255, K[1] = y >>> 8 & 255, r.check = hr(r.check, K, 2, 0)), y = 0, x = 0;
          } else r.head && (r.head.extra = null);
          r.mode = Ld;
        case Ld:
          if (r.flags & 1024 && (P = r.length, P > h && (P = h), P && (r.head && (F = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Uint8Array(r.head.extra_len)), r.head.extra.set(
            o.subarray(
              u,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              u + P
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            F
          )), r.flags & 512 && r.wrap & 4 && (r.check = hr(r.check, o, P, u)), h -= P, u += P, r.length -= P), r.length))
            break e;
          r.length = 0, r.mode = Dd;
        case Dd:
          if (r.flags & 2048) {
            if (h === 0)
              break e;
            P = 0;
            do
              F = o[u + P++], r.head && F && r.length < 65536 && (r.head.name += String.fromCharCode(F));
            while (F && P < h);
            if (r.flags & 512 && r.wrap & 4 && (r.check = hr(r.check, o, P, u)), h -= P, u += P, F)
              break e;
          } else r.head && (r.head.name = null);
          r.length = 0, r.mode = Rd;
        case Rd:
          if (r.flags & 4096) {
            if (h === 0)
              break e;
            P = 0;
            do
              F = o[u + P++], r.head && F && r.length < 65536 && (r.head.comment += String.fromCharCode(F));
            while (F && P < h);
            if (r.flags & 512 && r.wrap & 4 && (r.check = hr(r.check, o, P, u)), h -= P, u += P, F)
              break e;
          } else r.head && (r.head.comment = null);
          r.mode = Fd;
        case Fd:
          if (r.flags & 512) {
            for (; x < 16; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            if (r.wrap & 4 && y !== (r.check & 65535)) {
              e.msg = "header crc mismatch", r.mode = Ue;
              break;
            }
            y = 0, x = 0;
          }
          r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = br;
          break;
        case $d:
          for (; x < 32; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          e.adler = r.check = Gd(y), y = 0, x = 0, r.mode = ql;
        case ql:
          if (r.havedict === 0)
            return e.next_out = d, e.avail_out = g, e.next_in = u, e.avail_in = h, r.hold = y, r.bits = x, AS;
          e.adler = r.check = 1, r.mode = br;
        case br:
          if (t === FS || t === dl)
            break e;
        case ds:
          if (r.last) {
            y >>>= x & 7, x -= x & 7, r.mode = vs;
            break;
          }
          for (; x < 3; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          switch (r.last = y & 1, y >>>= 1, x -= 1, y & 3) {
            case 0:
              r.mode = Ad;
              break;
            case 1:
              if (US(r), r.mode = pl, t === dl) {
                y >>>= 2, x -= 2;
                break e;
              }
              break;
            case 2:
              r.mode = Md;
              break;
            case 3:
              e.msg = "invalid block type", r.mode = Ue;
          }
          y >>>= 2, x -= 2;
          break;
        case Ad:
          for (y >>>= x & 7, x -= x & 7; x < 32; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if ((y & 65535) !== (y >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", r.mode = Ue;
            break;
          }
          if (r.length = y & 65535, y = 0, x = 0, r.mode = ps, t === dl)
            break e;
        case ps:
          r.mode = Od;
        case Od:
          if (P = r.length, P) {
            if (P > h && (P = h), P > g && (P = g), P === 0)
              break e;
            a.set(o.subarray(u, u + P), d), h -= P, u += P, g -= P, d += P, r.length -= P;
            break;
          }
          r.mode = br;
          break;
        case Md:
          for (; x < 14; ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if (r.nlen = (y & 31) + 257, y >>>= 5, x -= 5, r.ndist = (y & 31) + 1, y >>>= 5, x -= 5, r.ncode = (y & 15) + 4, y >>>= 4, x -= 4, r.nlen > 286 || r.ndist > 30) {
            e.msg = "too many length or distance symbols", r.mode = Ue;
            break;
          }
          r.have = 0, r.mode = Id;
        case Id:
          for (; r.have < r.ncode; ) {
            for (; x < 3; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            r.lens[re[r.have++]] = y & 7, y >>>= 3, x -= 3;
          }
          for (; r.have < 19; )
            r.lens[re[r.have++]] = 0;
          if (r.lencode = r.lendyn, r.lenbits = 7, Z = { bits: r.lenbits }, W = to(RS, r.lens, 0, 19, r.lencode, 0, r.work, Z), r.lenbits = Z.bits, W) {
            e.msg = "invalid code lengths set", r.mode = Ue;
            break;
          }
          r.have = 0, r.mode = jd;
        case jd:
          for (; r.have < r.nlen + r.ndist; ) {
            for (; Y = r.lencode[y & (1 << r.lenbits) - 1], k = Y >>> 24, w = Y >>> 16 & 255, S = Y & 65535, !(k <= x); ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            if (S < 16)
              y >>>= k, x -= k, r.lens[r.have++] = S;
            else {
              if (S === 16) {
                for (T = k + 2; x < T; ) {
                  if (h === 0)
                    break e;
                  h--, y += o[u++] << x, x += 8;
                }
                if (y >>>= k, x -= k, r.have === 0) {
                  e.msg = "invalid bit length repeat", r.mode = Ue;
                  break;
                }
                F = r.lens[r.have - 1], P = 3 + (y & 3), y >>>= 2, x -= 2;
              } else if (S === 17) {
                for (T = k + 3; x < T; ) {
                  if (h === 0)
                    break e;
                  h--, y += o[u++] << x, x += 8;
                }
                y >>>= k, x -= k, F = 0, P = 3 + (y & 7), y >>>= 3, x -= 3;
              } else {
                for (T = k + 7; x < T; ) {
                  if (h === 0)
                    break e;
                  h--, y += o[u++] << x, x += 8;
                }
                y >>>= k, x -= k, F = 0, P = 11 + (y & 127), y >>>= 7, x -= 7;
              }
              if (r.have + P > r.nlen + r.ndist) {
                e.msg = "invalid bit length repeat", r.mode = Ue;
                break;
              }
              for (; P--; )
                r.lens[r.have++] = F;
            }
          }
          if (r.mode === Ue)
            break;
          if (r.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", r.mode = Ue;
            break;
          }
          if (r.lenbits = 9, Z = { bits: r.lenbits }, W = to(j0, r.lens, 0, r.nlen, r.lencode, 0, r.work, Z), r.lenbits = Z.bits, W) {
            e.msg = "invalid literal/lengths set", r.mode = Ue;
            break;
          }
          if (r.distbits = 6, r.distcode = r.distdyn, Z = { bits: r.distbits }, W = to(N0, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Z), r.distbits = Z.bits, W) {
            e.msg = "invalid distances set", r.mode = Ue;
            break;
          }
          if (r.mode = pl, t === dl)
            break e;
        case pl:
          r.mode = vl;
        case vl:
          if (h >= 6 && g >= 258) {
            e.next_out = d, e.avail_out = g, e.next_in = u, e.avail_in = h, r.hold = y, r.bits = x, CS(e, C), d = e.next_out, a = e.output, g = e.avail_out, u = e.next_in, o = e.input, h = e.avail_in, y = r.hold, x = r.bits, r.mode === br && (r.back = -1);
            break;
          }
          for (r.back = 0; Y = r.lencode[y & (1 << r.lenbits) - 1], k = Y >>> 24, w = Y >>> 16 & 255, S = Y & 65535, !(k <= x); ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if (w && !(w & 240)) {
            for (E = k, A = w, N = S; Y = r.lencode[N + ((y & (1 << E + A) - 1) >> E)], k = Y >>> 24, w = Y >>> 16 & 255, S = Y & 65535, !(E + k <= x); ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            y >>>= E, x -= E, r.back += E;
          }
          if (y >>>= k, x -= k, r.back += k, r.length = S, w === 0) {
            r.mode = Vd;
            break;
          }
          if (w & 32) {
            r.back = -1, r.mode = br;
            break;
          }
          if (w & 64) {
            e.msg = "invalid literal/length code", r.mode = Ue;
            break;
          }
          r.extra = w & 15, r.mode = Nd;
        case Nd:
          if (r.extra) {
            for (T = r.extra; x < T; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            r.length += y & (1 << r.extra) - 1, y >>>= r.extra, x -= r.extra, r.back += r.extra;
          }
          r.was = r.length, r.mode = zd;
        case zd:
          for (; Y = r.distcode[y & (1 << r.distbits) - 1], k = Y >>> 24, w = Y >>> 16 & 255, S = Y & 65535, !(k <= x); ) {
            if (h === 0)
              break e;
            h--, y += o[u++] << x, x += 8;
          }
          if (!(w & 240)) {
            for (E = k, A = w, N = S; Y = r.distcode[N + ((y & (1 << E + A) - 1) >> E)], k = Y >>> 24, w = Y >>> 16 & 255, S = Y & 65535, !(E + k <= x); ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            y >>>= E, x -= E, r.back += E;
          }
          if (y >>>= k, x -= k, r.back += k, w & 64) {
            e.msg = "invalid distance code", r.mode = Ue;
            break;
          }
          r.offset = S, r.extra = w & 15, r.mode = Bd;
        case Bd:
          if (r.extra) {
            for (T = r.extra; x < T; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            r.offset += y & (1 << r.extra) - 1, y >>>= r.extra, x -= r.extra, r.back += r.extra;
          }
          if (r.offset > r.dmax) {
            e.msg = "invalid distance too far back", r.mode = Ue;
            break;
          }
          r.mode = Ud;
        case Ud:
          if (g === 0)
            break e;
          if (P = C - g, r.offset > P) {
            if (P = r.offset - P, P > r.whave && r.sane) {
              e.msg = "invalid distance too far back", r.mode = Ue;
              break;
            }
            P > r.wnext ? (P -= r.wnext, $ = r.wsize - P) : $ = r.wnext - P, P > r.length && (P = r.length), B = r.window;
          } else
            B = a, $ = d - r.offset, P = r.length;
          P > g && (P = g), g -= P, r.length -= P;
          do
            a[d++] = B[$++];
          while (--P);
          r.length === 0 && (r.mode = vl);
          break;
        case Vd:
          if (g === 0)
            break e;
          a[d++] = r.length, g--, r.mode = vl;
          break;
        case vs:
          if (r.wrap) {
            for (; x < 32; ) {
              if (h === 0)
                break e;
              h--, y |= o[u++] << x, x += 8;
            }
            if (C -= g, e.total_out += C, r.total += C, r.wrap & 4 && C && (e.adler = r.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            r.flags ? hr(r.check, a, C, d - C) : hu(r.check, a, C, d - C)), C = g, r.wrap & 4 && (r.flags ? y : Gd(y)) !== r.check) {
              e.msg = "incorrect data check", r.mode = Ue;
              break;
            }
            y = 0, x = 0;
          }
          r.mode = Wd;
        case Wd:
          if (r.wrap && r.flags) {
            for (; x < 32; ) {
              if (h === 0)
                break e;
              h--, y += o[u++] << x, x += 8;
            }
            if (r.wrap & 4 && y !== (r.total & 4294967295)) {
              e.msg = "incorrect length check", r.mode = Ue;
              break;
            }
            y = 0, x = 0;
          }
          r.mode = Hd;
        case Hd:
          W = $S;
          break e;
        case Ue:
          W = z0;
          break e;
        case U0:
          return B0;
        case V0:
        default:
          return Jt;
      }
  return e.next_out = d, e.avail_out = g, e.next_in = u, e.avail_in = h, r.hold = y, r.bits = x, (r.wsize || C !== e.avail_out && r.mode < Ue && (r.mode < vs || t !== Sd)) && Y0(e, e.output, e.next_out, C - e.avail_out), L -= e.avail_in, C -= e.avail_out, e.total_in += L, e.total_out += C, r.total += C, r.wrap & 4 && C && (e.adler = r.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  r.flags ? hr(r.check, a, C, e.next_out - C) : hu(r.check, a, C, e.next_out - C)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === br ? 128 : 0) + (r.mode === pl || r.mode === ps ? 256 : 0), (L === 0 && C === 0 || t === Sd) && W === Tn && (W = OS), W;
}, WS = (e) => {
  if (Fn(e))
    return Jt;
  let t = e.state;
  return t.window && (t.window = null), e.state = null, Tn;
}, HS = (e, t) => {
  if (Fn(e))
    return Jt;
  const r = e.state;
  return r.wrap & 2 ? (r.head = t, t.done = !1, Tn) : Jt;
}, GS = (e, t) => {
  const r = t.length;
  let o, a, u;
  return Fn(e) || (o = e.state, o.wrap !== 0 && o.mode !== ql) ? Jt : o.mode === ql && (a = 1, a = hu(a, t, r, 0), a !== o.check) ? z0 : (u = Y0(e, t, r, r), u ? (o.mode = U0, B0) : (o.havedict = 1, Tn));
};
var XS = H0, YS = G0, KS = W0, QS = BS, ZS = X0, qS = VS, JS = WS, eE = HS, tE = GS, rE = "pako inflate (from Nodeca project)", gr = {
  inflateReset: XS,
  inflateReset2: YS,
  inflateResetKeep: KS,
  inflateInit: QS,
  inflateInit2: ZS,
  inflate: qS,
  inflateEnd: JS,
  inflateGetHeader: eE,
  inflateSetDictionary: tE,
  inflateInfo: rE
};
function nE() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var iE = nE;
const K0 = Object.prototype.toString, {
  Z_NO_FLUSH: oE,
  Z_FINISH: Yd,
  Z_OK: si,
  Z_STREAM_END: gs,
  Z_NEED_DICT: ys,
  Z_STREAM_ERROR: lE,
  Z_DATA_ERROR: Kd,
  Z_MEM_ERROR: aE,
  Z_BUF_ERROR: Qd
} = O0, sE = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ""
};
function ma(e) {
  this.options = M0.assign({}, sE, e || {});
  const t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new SS(), this.strm.avail_out = 0;
  let r = gr.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (r !== si)
    throw new Error(mu[r]);
  if (this.header = new iE(), gr.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = gu.string2buf(t.dictionary) : K0.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = gr.inflateSetDictionary(this.strm, t.dictionary), r !== si)))
    throw new Error(mu[r]);
}
ma.prototype.push = function(e, t) {
  const r = this.strm, o = this.options.chunkSize, a = this.options.dictionary;
  let u, d, h;
  if (this.ended) return !1;
  for (t === ~~t ? d = t : d = t === !0 ? Yd : oE, K0.call(e) === "[object ArrayBuffer]" ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length; ; ) {
    for (r.avail_out === 0 && (r.output = new Uint8Array(o), r.next_out = 0, r.avail_out = o), u = gr.inflate(r, d), u === ys && a && (u = gr.inflateSetDictionary(r, a), u === si ? u = gr.inflate(r, d) : u === Kd && (u = ys)); r.avail_in > 0 && u === gs && r.state.wrap & 2 && r.state.flags !== 0 && r.input[r.next_in] !== 0; )
      gr.inflateReset(r), u = gr.inflate(r, d);
    switch (u) {
      case lE:
      case Kd:
      case ys:
      case aE:
        return this.onEnd(u), this.ended = !0, !1;
    }
    if (h = r.avail_out, r.next_out && (r.avail_out === 0 || u === gs || d > 0))
      if (this.options.to === "string") {
        let g = gu.utf8border(r.output, r.next_out), y = r.next_out - g, x = gu.buf2string(r.output, g);
        r.next_out = y, r.avail_out = o - y, y && r.output.set(r.output.subarray(g, g + y), 0), this.onData(x);
      } else
        this.onData(r.output.length === r.next_out ? r.output : r.output.subarray(0, r.next_out)), r.avail_out = 0, r.next_out = 0;
    if (!((u === si || u === Qd) && h === 0)) {
      if (u === gs)
        return u = gr.inflateEnd(this.strm), this.onEnd(u), this.ended = !0, !0;
      if (r.avail_in === 0) {
        if (d === Yd)
          return u = gr.inflateEnd(this.strm), this.onEnd(u === si ? Qd : u), this.ended = !0, !1;
        break;
      }
    }
  }
  return !0;
};
ma.prototype.onData = function(e) {
  this.chunks.push(e);
};
ma.prototype.onEnd = function(e) {
  e === si && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = M0.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function uE(e, t) {
  const r = new ma(t);
  if (r.push(e, !0), r.err) throw r.msg || mu[r.err];
  return r.result;
}
var cE = uE, fE = {
  inflate: cE
};
const { inflate: dE } = fE;
var Q0 = dE;
function pE(e) {
  const t = e.toLowerCase();
  return t.startsWith("volume") ? "volume" : t.startsWith("mask") ? "mask" : t.startsWith("mesh") ? "mesh" : t.startsWith("image") ? "image" : (console.warn(`imfusion_viewer: unrecognized layer kind "${e}", treating as "volume"`), "volume");
}
function vE(e) {
  try {
    const t = JSON.parse(e || "{}"), r = t && typeof t == "object" ? t.labels : null;
    return r && typeof r == "object" ? r : null;
  } catch {
    return console.warn(`imfusion_viewer: malformed json_extra, ignoring label map: ${e}`), null;
  }
}
function hE(e) {
  const [t = 1, r = 1, o = 1, a = 1] = e;
  return [t, r, o, a];
}
function mE(e) {
  try {
    const t = JSON.parse(e || "{}"), r = t && typeof t == "object" ? t.labelValue : null;
    return typeof r == "number" && Number.isFinite(r) ? r : 1;
  } catch {
    return 1;
  }
}
async function gE() {
  const e = await fetch("./license_token");
  if (!e.ok)
    throw new Error(`Failed to fetch ./license_token: ${e.status} ${e.statusText}`);
  return (await e.json()).license_token;
}
async function Z0() {
  const e = await fetch("./cases");
  if (!e.ok)
    throw new Error(`Failed to fetch ./cases: ${e.status} ${e.statusText}`);
  const t = await e.json(), r = {};
  for (const [o, a] of Object.entries(t)) {
    r[o] = {};
    for (const [u, d] of Object.entries(a))
      r[o][u] = {
        steps: [...d.steps].sort((h, g) => h - g),
        layers: d.layers.map(
          (h) => ({
            ...h,
            kind: pE(h.kind),
            default_color: hE(h.default_color),
            steps: [...h.steps ?? []].sort((g, y) => g - y),
            maskLabels: vE(h.json_extra),
            legacyLabelValue: mE(h.json_extra)
          })
        ).sort((h, g) => h.order - g.order)
      };
  }
  return r;
}
class hc extends Error {
  constructor(r, o) {
    super(r);
    Ie(this, "status");
    this.name = "LayerFetchError", this.status = o;
  }
}
async function Zd(e) {
  const t = new URLSearchParams({
    run: e.run,
    case: e.case,
    layer: e.layer,
    step: String(e.step)
  });
  e.cropAxis !== void 0 && e.cropPosition !== void 0 && (t.set("crop_axis", e.cropAxis), t.set("crop_position", String(e.cropPosition)), t.set("compressed", String(e.compressed)));
  const r = await fetch(`./layer_data?${t.toString()}`);
  if (!r.ok)
    throw new hc(
      `Failed to fetch layer_data for "${e.layer}" @ step ${e.step}: ${r.status} ${r.statusText}`,
      r.status
    );
  const o = await r.arrayBuffer();
  if (!e.compressed) return o;
  const a = Q0(new Uint8Array(o));
  return a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
}
const yE = 1e3;
class q0 extends Error {
  constructor(t) {
    super(t), this.name = "GridMismatchError";
  }
}
async function _E(e) {
  const t = new URLSearchParams({
    case: e.case,
    step: String(e.step),
    pairs: e.pairs.map((u) => `${u.run}:${u.layer}`).join(","),
    compressed: String(e.compressed)
  }), r = await fetch(`./combined_layer_data?${t.toString()}`);
  if (!r.ok) {
    const u = await r.text().catch(() => r.statusText);
    throw r.status === 409 ? new q0(u) : new hc(`Failed to fetch combined_layer_data @ step ${e.step}: ${u}`, r.status);
  }
  const o = await r.arrayBuffer(), a = Q0(new Uint8Array(o));
  return a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
}
async function wE(e) {
  const t = new URLSearchParams(window.location.search).get("experiment"), r = new URLSearchParams();
  t && r.set("experiment", t);
  const o = r.toString() ? `?${r.toString()}` : "", a = await fetch(`./../scalars/tags${o}`);
  if (!a.ok)
    throw new Error(`Failed to fetch scalar tags for run "${e}": ${a.status} ${a.statusText}`);
  const u = await a.json();
  return Object.keys(u[e] ?? {});
}
async function xE(e, t) {
  const r = new URLSearchParams(window.location.search).get("experiment"), o = new URLSearchParams({ run: e, tag: t });
  r && o.set("experiment", r);
  const a = await fetch(`./../scalars/scalars?${o.toString()}`);
  if (!a.ok)
    throw new Error(`Failed to fetch scalars for run "${e}" tag "${t}": ${a.status} ${a.statusText}`);
  return (await a.json()).map(([d, h, g]) => ({ wallTime: d, step: h, value: g }));
}
const xo = [
  "#4da3ff",
  "#ff8a4d",
  "#26a45e",
  // was #4dd68a: too pale against a light background.
  "#e5534b",
  "#c792ea",
  "#b58a00",
  // was #ffd54d: too pale against a light background.
  "#25a0a0",
  // was #4dd6d6: too pale against a light background.
  "#ff6ec7"
];
function kE(e) {
  const t = [...new Set(e)].sort(), r = /* @__PURE__ */ new Map();
  return t.forEach((o, a) => {
    r.set(o, xo[a % xo.length]);
  }), r;
}
const SE = 3e3;
function EE(e, t) {
  const r = t.trim();
  if (!r) return e;
  let o;
  try {
    o = new RegExp(r, "i");
  } catch {
    return e;
  }
  return e.filter((a) => o.test(a));
}
function CE({
  selectedCaseByRun: e,
  onSelect: t,
  onCasesUpdate: r,
  checkedRuns: o,
  onToggleRun: a,
  onToggleAllRuns: u,
  runColors: d,
  activeControlsRuns: h,
  registerControlsContainer: g
}) {
  const [y, x] = M.useState(null), [L, C] = M.useState(null), [P, $] = M.useState(""), B = M.useRef(r);
  M.useEffect(() => {
    B.current = r;
  }), M.useEffect(() => {
    let w = !1;
    const S = async () => {
      var A;
      try {
        const N = await Z0();
        if (w) return;
        x(N), C(null), (A = B.current) == null || A.call(B, N);
      } catch (N) {
        w || C(N instanceof Error ? N.message : "Failed to load cases.");
      }
    };
    S();
    const E = window.setInterval(S, SE);
    return () => {
      w = !0, window.clearInterval(E);
    };
  }, []);
  const Y = M.useMemo(() => y ? Object.keys(y).sort() : [], [y]), k = M.useMemo(() => EE(Y, P), [Y, P]);
  return L ? /* @__PURE__ */ D.jsx("div", { style: jE, children: L }) : y ? Y.length === 0 ? /* @__PURE__ */ D.jsx("div", { style: _s, children: "No runs with imfusion_viewer data yet." }) : /* @__PURE__ */ D.jsxs("div", { style: bE, children: [
    /* @__PURE__ */ D.jsx(
      "input",
      {
        type: "text",
        value: P,
        onChange: (w) => $(w.target.value),
        placeholder: "Write a regex to filter runs",
        "aria-label": "Write a regex to filter runs",
        style: PE
      }
    ),
    /* @__PURE__ */ D.jsxs("div", { style: TE, children: [
      k.length === 0 && /* @__PURE__ */ D.jsx("div", { style: _s, children: "No runs match this filter." }),
      k.map((w, S) => {
        const E = Object.keys(y[w]).sort(), A = E.length === 1, N = A ? E[0] : void 0, F = d.get(w) ?? xo[0], W = o.has(w);
        return /* @__PURE__ */ D.jsxs("div", { style: S === 0 ? LE : J0, children: [
          /* @__PURE__ */ D.jsxs("div", { style: DE, children: [
            /* @__PURE__ */ D.jsx(
              "input",
              {
                type: "checkbox",
                checked: W,
                onChange: () => {
                  A && N && !W ? t({ run: w, case: N }, y) : a(w);
                },
                style: { accentColor: F },
                title: A ? `View "${w}" and include it in the Metrics comparison` : `Include "${w}" in the Metrics comparison`
              }
            ),
            /* @__PURE__ */ D.jsx("span", { style: { ...RE, background: F }, title: `"${w}"'s color` }),
            /* @__PURE__ */ D.jsx(
              "span",
              {
                style: A ? FE : eh,
                onClick: A && N ? () => t({ run: w, case: N }, y) : void 0,
                title: A ? `View "${w}" in the 3D viewer` : void 0,
                children: w
              }
            ),
            A && /* @__PURE__ */ D.jsxs("span", { style: qd, children: [
              y[w][N].steps.length,
              " step",
              y[w][N].steps.length === 1 ? "" : "s"
            ] })
          ] }),
          !A && /* @__PURE__ */ D.jsx("div", { style: $E, children: E.map((K) => {
            const Z = y[w][K], T = e.get(w) === K;
            return /* @__PURE__ */ D.jsxs(
              "button",
              {
                type: "button",
                style: T ? OE : th,
                onClick: () => t({ run: w, case: K }, y),
                children: [
                  /* @__PURE__ */ D.jsx("span", { style: ME, children: K }),
                  /* @__PURE__ */ D.jsxs("span", { style: qd, children: [
                    Z.steps.length,
                    " step",
                    Z.steps.length === 1 ? "" : "s"
                  ] })
                ]
              },
              K
            );
          }) }),
          h.has(w) && /* @__PURE__ */ D.jsx("div", { style: { ...AE, borderLeftColor: F }, children: /* @__PURE__ */ D.jsx("div", { ref: g(w) }) })
        ] }, w);
      })
    ] }),
    /* @__PURE__ */ D.jsx(
      "button",
      {
        type: "button",
        style: IE,
        disabled: k.length === 0,
        onClick: () => u(k),
        children: "Toggle All Runs"
      }
    )
  ] }) : /* @__PURE__ */ D.jsx("div", { style: _s, children: "Loading cases…" });
}
const bE = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  minHeight: 0
}, PE = {
  width: "100%",
  boxSizing: "border-box",
  font: "inherit",
  padding: "6px 8px",
  borderRadius: 5,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit"
}, TE = {
  display: "flex",
  flexDirection: "column",
  overflowY: "auto"
}, J0 = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  paddingTop: 10,
  borderTop: "1px solid var(--tb-border)"
}, LE = {
  ...J0,
  paddingTop: 0,
  borderTop: "none"
}, DE = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 4px",
  borderRadius: 5,
  border: "1px solid transparent"
}, RE = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  flexShrink: 0,
  display: "inline-block"
}, eh = {
  flex: 1,
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, FE = {
  ...eh,
  cursor: "pointer"
}, $E = {
  display: "flex",
  flexDirection: "column",
  gap: 3
}, AE = {
  marginLeft: 4,
  paddingLeft: 10,
  borderLeft: "2px solid transparent"
}, th = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "6px 8px",
  borderRadius: 5,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  font: "inherit",
  textAlign: "left",
  cursor: "pointer"
}, OE = {
  ...th,
  border: "1px solid var(--tb-accent)",
  background: "var(--tb-accent-soft)"
}, ME = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, qd = {
  flexShrink: 0,
  opacity: 0.55
}, IE = {
  width: "100%",
  font: "inherit",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  padding: "7px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer"
}, _s = {
  padding: "8px 0",
  opacity: 0.55
}, jE = {
  padding: "8px 0",
  color: "var(--tb-error)"
}, Jd = [
  [0.9, 0.25, 0.25],
  [0.25, 0.75, 0.35],
  [0.3, 0.55, 0.95],
  [0.95, 0.6, 0.15],
  [0.65, 0.35, 0.9],
  [0.2, 0.75, 0.8],
  [0.85, 0.8, 0.2],
  [0.9, 0.45, 0.65],
  [0.6, 0.4, 0.25],
  [0.6, 0.6, 0.6]
];
function ws(e) {
  const t = Jd.length, r = (e % t + t) % t;
  return Jd[r];
}
const NE = 2e3, zE = 3, BE = ["volume", "image", "mask", "mesh"], UE = {
  Axial: (e) => e.mainAxialView(),
  Coronal: (e) => e.mainCoronalView(),
  Sagittal: (e) => e.mainSagittalView(),
  "3D": (e) => e.main3dView()
};
function Br(e) {
  return e.replace(/[^a-zA-Z0-9_.-]/g, "_");
}
function vn(e, t) {
  for (const r of t)
    try {
      e.dataModel.remove(r);
    } catch {
    }
}
function ep(e, t) {
  return JSON.stringify(e) === JSON.stringify(t);
}
function Ze(e, t) {
  return `${e}::${t}`;
}
function tp(e) {
  const t = e.indexOf("::");
  return [e.slice(0, t), e.slice(t + 2)];
}
function rp([e, t, r]) {
  const o = (a) => Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
  return `#${o(e)}${o(t)}${o(r)}`;
}
function np(e) {
  const t = Number.parseInt(e.slice(1), 16);
  return [(t >> 16 & 255) / 255, (t >> 8 & 255) / 255, (t & 255) / 255];
}
function VE([e, t, r]) {
  const o = Math.max(e, t, r), a = Math.min(e, t, r), u = (o + a) / 2;
  if (o === a) return [0, 0, u];
  const d = o - a, h = u > 0.5 ? d / (2 - o - a) : d / (o + a);
  let g;
  return o === e ? g = (t - r) / d % 6 : o === t ? g = (r - e) / d + 2 : g = (e - t) / d + 4, g /= 6, g < 0 && (g += 1), [g, h, u];
}
function WE([e, t, r]) {
  if (t === 0) return [r, r, r];
  const o = r < 0.5 ? r * (1 + t) : r + t - r * t, a = 2 * r - o, u = (d) => {
    let h = d;
    return h < 0 && (h += 1), h > 1 && (h -= 1), h < 1 / 6 ? a + (o - a) * 6 * h : h < 1 / 2 ? o : h < 2 / 3 ? a + (o - a) * (2 / 3 - h) * 6 : a;
  };
  return [u(e + 1 / 3), u(e), u(e - 1 / 3)];
}
const HE = 0.5;
function hn(e) {
  const [t, r, o] = VE(e);
  return WE([t, r * HE, o]);
}
function GE({
  run: e,
  caseName: t,
  initialLayers: r,
  initialSteps: o,
  overlayRuns: a = [],
  overlayContainers: u,
  viewToggleContainer: d,
  onCurrentStepChange: h
}) {
  const g = sn(), y = cl(g.display.mainAxialView()), x = cl(g.display.mainCoronalView()), L = cl(g.display.mainSagittalView()), C = cl(g.display.main3dView()), P = [
    { label: "Axial", ...y },
    { label: "Coronal", ...x },
    { label: "Sagittal", ...L },
    { label: "3D", ...C }
  ], $ = M.useRef({}), B = M.useCallback(() => {
    const O = g.display.layouter();
    for (const [I, Q] of Object.entries($.current)) {
      const z = UE[I];
      z && O.setViewHidden(z(g.display), Q);
    }
  }, [g]), Y = [{ run: e, color: null }, ...a.map((O) => ({ run: O.run, color: O.color }))], [k, w] = M.useState(() => {
    const O = { [e]: r };
    for (const I of a)
      I.initialLayers && (O[I.run] = I.initialLayers);
    return O;
  }), [S, E] = M.useState(() => {
    const O = { [e]: o };
    for (const I of a)
      I.initialSteps && (O[I.run] = I.initialSteps);
    return O;
  }), [A, N] = M.useState(() => {
    const O = /* @__PURE__ */ new Map();
    O.set(e, o.length > 0 ? o[o.length - 1] : null);
    for (const I of a) {
      const Q = I.initialSteps ?? [];
      O.set(I.run, Q.length > 0 ? Q[Q.length - 1] : null);
    }
    return O;
  }), [F, W] = M.useState(() => {
    const O = /* @__PURE__ */ new Map();
    O.set(e, !0);
    for (const I of a) O.set(I.run, !0);
    return O;
  }), [K, Z] = M.useState(() => {
    const O = /* @__PURE__ */ new Map();
    for (const I of r) O.set(Ze(e, I.layer_name), I.default_visible);
    return O;
  }), [T, re] = M.useState(/* @__PURE__ */ new Map()), [pe, Ct] = M.useState(/* @__PURE__ */ new Map()), [Ee, Vt] = M.useState(/* @__PURE__ */ new Map()), [Ye, ie] = M.useState(/* @__PURE__ */ new Map()), [fe, me] = M.useState(/* @__PURE__ */ new Map()), [$e, ye] = M.useState(/* @__PURE__ */ new Map()), [$t, dt] = M.useState(!1), [cr, gt] = M.useState(null), [er, oe] = M.useState(0), Te = M.useCallback(() => oe((O) => O + 1), []), be = M.useRef(F), Le = M.useRef(k), We = M.useRef(K), Wt = M.useRef(S), At = M.useRef(A), yt = M.useRef(Y), $n = M.useRef(fe);
  M.useEffect(() => {
    be.current = F, Le.current = k, We.current = K, Wt.current = S, At.current = A, yt.current = Y, $n.current = fe;
  });
  const lt = M.useRef([]), _e = M.useRef(null), tr = M.useRef(/* @__PURE__ */ new Map()), Ot = M.useRef(/* @__PURE__ */ new Set()), xr = M.useRef(!1);
  M.useEffect(() => {
    let O = !1;
    const I = async () => {
      var z;
      try {
        const J = await Z0();
        if (O) return;
        const p = {}, se = {};
        for (const H of yt.current) {
          const q = (z = J[H.run]) == null ? void 0 : z[t];
          q && (p[H.run] = q.layers, se[H.run] = q.steps);
        }
        w((H) => ep(H, p) ? H : p), E((H) => ep(H, se) ? H : se), N((H) => {
          let q = !1;
          const ne = new Map(H);
          for (const de of yt.current) {
            const xe = se[de.run] ?? [];
            if ((be.current.get(de.run) ?? !0) && xe.length > 0) {
              const Oe = xe[xe.length - 1];
              ne.get(de.run) !== Oe && (ne.set(de.run, Oe), q = !0);
            }
          }
          return q ? ne : H;
        });
        for (const H of yt.current) {
          const q = At.current.get(H.run) ?? null;
          if (q !== null && !Ot.current.has(`${H.run}:${q}`) && !lt.current.some((ne) => ne.run === H.run && ne.step === q)) {
            Te();
            break;
          }
        }
      } catch {
      }
    }, Q = window.setInterval(I, NE);
    return () => {
      O = !0, window.clearInterval(Q);
    };
  }, [t, Te]), M.useEffect(() => {
    h == null || h(A.get(e) ?? null);
  }, [A, e, h]);
  const Ir = M.useRef(!1);
  M.useEffect(() => (Ir.current = !1, () => {
    Ir.current = !0;
    for (const O of lt.current)
      vn(g, O.layers.values());
    lt.current = [], _e.current && (vn(g, [_e.current.data]), _e.current = null);
  }), [g]);
  const kr = M.useCallback(
    // Visibility is driven entirely through LabelConfig, never viewGroup.hideData/showData:
    // that silently breaks a mask's rendering once combined-workspace mode shares the WASM
    // instance with a second run's label data (checkbox/opacity read back fine, nothing draws).
    (O, I, Q, z) => {
      O.setModality("LABEL");
      const J = g.bindings, p = Ze(I, Q.layer_name), se = pe.get(p) ?? Q.default_opacity, H = I !== e, q = Q.maskLabels;
      if (q && Object.keys(q).length > 0) {
        const Oe = Object.entries(q).map(([Je, at]) => [Je, Number(Je), at]).sort((Je, at) => Je[1] - at[1]);
        for (const [Je, at, st] of Oe) {
          if (!Number.isFinite(at)) {
            console.warn(`imfusion_viewer: skipping non-numeric mask label key "${Je}" (name "${st}")`);
            continue;
          }
          const tt = ws(at), Nr = Ee.get(`${p}:${at}`) ?? (H ? hn(tt) : tt), _t = z && (Ye.get(`${p}:${at}`) ?? Q.default_visible), On = {
            name: st,
            color: [...Nr, se],
            isVisible2d: _t,
            isVisible3d: _t
          };
          J.setLabelConfig(O, at, On);
        }
        return;
      }
      const ne = Q.legacyLabelValue;
      J.setDefaultLabelConfig(O, ne);
      const de = [Q.default_color[0], Q.default_color[1], Q.default_color[2]], xe = T.get(p) ?? (H ? hn(de) : de), ae = {
        name: Q.display_name,
        color: [...xe, se],
        isVisible2d: z,
        isVisible3d: z
      };
      J.setLabelConfig(O, ne, ae);
    },
    [g, e, T, pe, Ee, Ye]
  ), rr = M.useCallback(
    (O, I) => {
      O.setModality("LABEL");
      const Q = g.bindings;
      I.forEach(({ sourceRun: z, meta: J, layerVisible: p }, se) => {
        const H = Ze(z, J.layer_name), q = pe.get(H) ?? J.default_opacity, ne = z !== e, de = se * yE, xe = J.maskLabels;
        if (xe && Object.keys(xe).length > 0) {
          const at = Object.entries(xe).map(([st, tt]) => [st, Number(st), tt]).sort((st, tt) => st[1] - tt[1]);
          for (const [st, tt, Nr] of at) {
            if (!Number.isFinite(tt)) {
              console.warn(`imfusion_viewer: skipping non-numeric mask label key "${st}" (name "${Nr}")`);
              continue;
            }
            const _t = ws(tt), On = Ee.get(`${H}:${tt}`) ?? (ne ? hn(_t) : _t), Ro = p && (Ye.get(`${H}:${tt}`) ?? J.default_visible);
            Q.setLabelConfig(O, tt + de, {
              name: `${z}: ${Nr}`,
              color: [...On, q],
              isVisible2d: Ro,
              isVisible3d: Ro
            });
          }
          return;
        }
        const ae = J.legacyLabelValue + de, Oe = [J.default_color[0], J.default_color[1], J.default_color[2]], Je = T.get(H) ?? (ne ? hn(Oe) : Oe);
        Q.setLabelConfig(O, ae, {
          name: `${z}: ${J.display_name}`,
          color: [...Je, q],
          isVisible2d: p,
          isVisible3d: p
        });
      });
    },
    [g, e, T, pe, Ee, Ye]
  ), Sr = M.useCallback(
    (O, I, Q) => {
      const z = Ze(I, Q.layer_name), J = pe.get(z) ?? Q.default_opacity, p = [Q.default_color[0], Q.default_color[1], Q.default_color[2]], se = T.get(z) ?? (I !== e ? hn(p) : p), H = O.displayOptions(), q = H.state(), ne = q.surfaceRendering;
      if (ne) {
        ne.opacity = J;
        for (const de of ["materialFront", "materialBack"]) {
          const xe = ne[de];
          xe && (xe.ambientColor = se, xe.diffuseColor = se);
        }
      }
      "showSurface" in q && (q.showSurface = !0), H.setState(q);
    },
    [e, T, pe]
  ), Mt = M.useCallback(
    (O, I, Q) => {
      const z = fe.get(Ze(I, Q.layer_name));
      O.autoWindow();
      const J = O.displayOptions2d(), p = O.displayOptions3d();
      p.transferFunction = g.bindings.TransferFunctionFactory.createMriDefaultPreset(O), (z == null ? void 0 : z.window2d) !== void 0 && (J.window = z.window2d), (z == null ? void 0 : z.level2d) !== void 0 && (J.level = z.level2d), (z == null ? void 0 : z.gamma2d) !== void 0 && (J.gamma = z.gamma2d), (z == null ? void 0 : z.invert2d) !== void 0 && (J.invert = z.invert2d), (z == null ? void 0 : z.window3d) !== void 0 && (p.window = z.window3d), (z == null ? void 0 : z.level3d) !== void 0 && (p.level = z.level3d), (z == null ? void 0 : z.invert3d) !== void 0 && (p.invert = z.invert3d);
    },
    [g, fe]
  ), wi = M.useCallback(
    async (O, I, Q) => {
      const z = Ze(O, Q.layer_name), J = $n.current.get(z), p = (J == null ? void 0 : J.cropAxis) !== void 0 && (J == null ? void 0 : J.cropPosition) !== void 0 ? { cropAxis: J.cropAxis, cropPosition: J.cropPosition } : void 0, se = await Zd({
        run: O,
        case: t,
        layer: Q.layer_name,
        step: I,
        compressed: Q.zlib_compressed,
        ...p
      }), H = p ? `__crop_${p.cropAxis}_${Math.round(p.cropPosition * 1e3)}` : "", q = `${Br(O)}__${Br(t)}__${Br(Q.layer_name)}__s${I}${H}${Q.file_extension}`, de = (await g.loadBuffer(se, q))[0];
      if (!de)
        throw new Error(`Layer "${Q.display_name}" @ step ${I} contains no readable data.`);
      return Mt(de, O, Q), de;
    },
    [t, g, Mt]
  ), An = M.useCallback(
    async (O, I) => {
      const Q = `${O}:${I}`;
      if (!(Ot.current.has(Q) || lt.current.some((z) => z.run === O && z.step === I))) {
        Ot.current.add(Q), dt(!0);
        try {
          const z = /* @__PURE__ */ new Map();
          let J = !1, p = !1;
          const H = (Le.current[O] ?? []).filter((q) => q.steps.includes(I));
          for (const q of H) {
            const ne = Ze(O, q.layer_name);
            try {
              const de = q.kind === "volume" ? $n.current.get(ne) : void 0, xe = (de == null ? void 0 : de.cropAxis) !== void 0 && (de == null ? void 0 : de.cropPosition) !== void 0 ? { cropAxis: de.cropAxis, cropPosition: de.cropPosition } : void 0, ae = await Zd({
                run: O,
                case: t,
                layer: q.layer_name,
                step: I,
                compressed: q.zlib_compressed,
                ...xe
              }), Oe = xe ? `__crop_${xe.cropAxis}_${Math.round(xe.cropPosition * 1e3)}` : "", Je = `${Br(O)}__${Br(t)}__${Br(q.layer_name)}__s${I}${Oe}${q.file_extension}`, st = (await g.loadBuffer(ae, Je))[0];
              if (!st) {
                console.error(
                  `imfusion_viewer: layer "${q.layer_name}" (run "${O}") @ step ${I} loaded no data.`
                ), gt(`Layer "${q.display_name}" @ step ${I} contains no readable data.`), p = !0;
                continue;
              }
              if (z.set(ne, st), q.kind === "mask") {
                const tt = We.current.get(ne) ?? q.default_visible;
                kr(st, O, q, tt);
              } else q.kind === "mesh" ? Sr(st, O, q) : q.kind === "volume" && Mt(st, O, q);
            } catch (de) {
              de instanceof hc && de.status === 404 ? (console.warn(
                `imfusion_viewer: layer "${q.layer_name}" (run "${O}") @ step ${I} not currently retained (likely reservoir eviction on a long/live run) - will retry on next poll.`
              ), J = !0) : (console.error(`imfusion_viewer: failed to load layer "${q.layer_name}" (run "${O}") @ step ${I}`, de), gt(`Failed to load layer "${q.display_name}" @ step ${I}.`), p = !0);
            }
          }
          if (Ir.current) {
            vn(g, z.values());
            return;
          }
          if (J && !p) {
            vn(g, z.values());
            return;
          }
          for (lt.current.push({ run: O, step: I, layers: z }); lt.current.filter((q) => q.run === O).length > zE; ) {
            const q = At.current.get(O) ?? null, ne = lt.current.findIndex((xe) => xe.run === O && xe.step !== q);
            if (ne === -1) break;
            const [de] = lt.current.splice(ne, 1);
            vn(g, de.layers.values());
            for (const xe of de.layers.keys()) tr.current.delete(`${de.step}:${xe}`);
          }
          Te();
        } finally {
          Ot.current.delete(Q), dt(Ot.current.size > 0);
        }
      }
    },
    [t, g, kr, Sr, Mt, Te]
  ), Po = M.useCallback(
    async (O, I) => {
      const Q = I.map((p) => `${p.sourceRun}:${p.meta.layer_name}`).join(","), z = `combined:${O}:${Q}`, J = _e.current;
      if (!(Ot.current.has(z) || J && J.step === O && J.pairsKey === Q)) {
        Ot.current.add(z), dt(!0);
        try {
          const p = await _E({
            case: t,
            step: O,
            pairs: I.map((ne) => ({ run: ne.sourceRun, layer: ne.meta.layer_name })),
            compressed: I[0].meta.zlib_compressed
          });
          if (Ir.current) return;
          const se = `combined__${Br(t)}__s${O}__${Br(Q)}.nii`, q = (await g.loadBuffer(p, se))[0];
          if (!q) {
            console.error(`imfusion_viewer: combined mask @ step ${O} loaded no data.`);
            return;
          }
          if (Ir.current) {
            g.dataModel.remove(q);
            return;
          }
          if (_e.current)
            try {
              g.dataModel.remove(_e.current.data);
            } catch {
            }
          _e.current = { pairsKey: Q, step: O, data: q }, Te();
        } catch (p) {
          p instanceof q0 ? console.warn(
            `imfusion_viewer: combined mask @ step ${O} can't be merged (${p.message}) - showing each run's own masks separately instead.`
          ) : console.error(`imfusion_viewer: failed to load combined mask @ step ${O}`, p);
        } finally {
          Ot.current.delete(z), dt(Ot.current.size > 0);
        }
      }
    },
    [t, g, Te]
  );
  M.useEffect(() => {
    let O = !1;
    return (async () => {
      for (const z of yt.current) {
        const J = At.current.get(z.run) ?? null;
        if (J === null) continue;
        const p = lt.current.find((se) => se.run === z.run && se.step === J);
        if (p)
          for (const se of Le.current[z.run] ?? []) {
            if (se.kind !== "volume") continue;
            const H = Ze(z.run, se.layer_name), q = p.layers.get(H);
            if (!q) continue;
            const ne = $n.current.get(H), de = `${p.step}:${H}`, xe = JSON.stringify([ne == null ? void 0 : ne.cropAxis, ne == null ? void 0 : ne.cropPosition]), ae = fr.current.get(de);
            if (fr.current.set(de, xe), !(ae === void 0 || ae === xe))
              try {
                const Oe = await wi(z.run, p.step, se);
                if (O) {
                  vn(g, [Oe]);
                  continue;
                }
                eo.flushSync(() => {
                  ye((at) => new Map(at).set(H, Oe));
                }), p.layers.set(H, Oe);
                const Je = g.display.viewGroup();
                Je.showData(Oe), Je.hideData(q), vn(g, [q]);
              } catch (Oe) {
                console.error(`imfusion_viewer: failed to reload cropped volume layer "${se.layer_name}"`, Oe);
              }
          }
      }
      for (const z of yt.current) {
        const J = At.current.get(z.run) ?? null;
        J !== null && (lt.current.some((p) => p.run === z.run && p.step === J) || await An(z.run, J));
      }
      if (O) return;
      const I = g.display.viewGroup(), Q = /* @__PURE__ */ new Map();
      for (const z of lt.current) {
        const J = z.step === (At.current.get(z.run) ?? null);
        for (const [p, se] of z.layers) {
          const [H, q] = tp(p), ne = (Le.current[H] ?? []).find((xe) => xe.layer_name === q), de = We.current.get(p) ?? (ne == null ? void 0 : ne.default_visible) ?? !0;
          (ne == null ? void 0 : ne.kind) === "mask" ? (kr(se, H, ne, de), J ? I.showData(se) : I.hideData(se)) : J && de ? I.showData(se) : I.hideData(se), (ne == null ? void 0 : ne.kind) === "volume" && J && Q.set(p, se);
        }
      }
      if (ye((z) => z.size === Q.size && [...Q].every(([J, p]) => z.get(J) === p) ? z : Q), yt.current.length > 1) {
        const z = [], J = yt.current.map((ne) => At.current.get(ne.run) ?? null), p = J[0], se = p !== null && J.every((ne) => ne === p);
        if (se)
          for (const ne of yt.current)
            for (const de of Le.current[ne.run] ?? [])
              de.kind === "mask" && z.push({ sourceRun: ne.run, meta: de });
        const H = z.map((ne) => `${ne.sourceRun}:${ne.meta.layer_name}`).join(",");
        if (se && z.length >= 2 && await Po(p, z), O) return;
        const q = _e.current;
        if (q && se && q.step === p && q.pairsKey === H) {
          const ne = z.map(({ sourceRun: de, meta: xe }) => ({
            sourceRun: de,
            meta: xe,
            layerVisible: We.current.get(Ze(de, xe.layer_name)) ?? xe.default_visible
          }));
          rr(q.data, ne), I.showData(q.data);
          for (const { sourceRun: de, meta: xe } of z) {
            const ae = lt.current.find((Je) => Je.run === de && Je.step === p), Oe = ae == null ? void 0 : ae.layers.get(Ze(de, xe.layer_name));
            Oe && I.hideData(Oe);
          }
        } else if (q) {
          I.hideData(q.data);
          try {
            g.dataModel.remove(q.data);
          } catch {
          }
          _e.current = null;
        }
      }
      if (!xr.current) {
        const z = At.current.get(e) ?? null, J = lt.current.find((p) => p.run === e && p.step === z);
        if (J) {
          let p;
          const se = Le.current[e] ?? [];
          for (const H of BE) {
            const q = se.find((ne) => ne.kind === H && J.layers.has(Ze(e, ne.layer_name)));
            if (q) {
              p = J.layers.get(Ze(e, q.layer_name));
              break;
            }
          }
          p && (I.centerOnData(p), xr.current = !0);
        }
      }
      B(), g.render();
    })(), () => {
      O = !0;
    };
  }, [
    A,
    k,
    K,
    er,
    fe,
    g,
    An,
    wi,
    Po,
    B,
    e,
    kr,
    Sr,
    rr
  ]);
  const fr = M.useRef(/* @__PURE__ */ new Map());
  M.useEffect(() => {
    for (const O of lt.current)
      for (const [I, Q] of O.layers) {
        const [z, J] = tp(I), p = (k[z] ?? []).find((H) => H.layer_name === J);
        if (!p) continue;
        const se = `${O.step}:${I}`;
        if (p.kind === "mask") {
          const H = K.get(I) ?? p.default_visible, q = JSON.stringify([
            H,
            T.get(I),
            pe.get(I),
            [...Ee].filter(([ne]) => ne.startsWith(`${I}:`)),
            [...Ye].filter(([ne]) => ne.startsWith(`${I}:`))
          ]);
          if (tr.current.get(se) === q) continue;
          tr.current.set(se, q), kr(Q, z, p, H);
        } else if (p.kind === "mesh") {
          const H = JSON.stringify([T.get(I), pe.get(I)]);
          if (tr.current.get(se) === H) continue;
          tr.current.set(se, H), Sr(Q, z, p);
        } else if (p.kind === "volume") {
          const H = JSON.stringify(fe.get(I));
          if (tr.current.get(se) === H) continue;
          tr.current.set(se, H), Mt(Q, z, p);
        }
      }
    if (_e.current) {
      const O = _e.current, I = O.pairsKey.split(",").flatMap((Q) => {
        const [z, J] = Q.split(":"), p = (k[z] ?? []).find((H) => H.layer_name === J);
        if (!p) return [];
        const se = K.get(Ze(z, J)) ?? p.default_visible;
        return [{ sourceRun: z, meta: p, layerVisible: se }];
      });
      if (I.length > 0) {
        const Q = JSON.stringify(
          I.map(({ sourceRun: J, meta: p, layerVisible: se }) => {
            const H = Ze(J, p.layer_name);
            return [
              se,
              T.get(H),
              pe.get(H),
              [...Ee].filter(([q]) => q.startsWith(`${H}:`)),
              [...Ye].filter(([q]) => q.startsWith(`${H}:`))
            ];
          })
        ), z = `combined:${O.step}:${O.pairsKey}`;
        tr.current.get(z) !== Q && (tr.current.set(z, Q), rr(O.data, I));
      }
    }
    g.render();
  }, [
    T,
    pe,
    Ee,
    Ye,
    fe,
    k,
    K,
    g,
    kr,
    Sr,
    Mt,
    rr
  ]);
  const xi = M.useCallback((O, I) => {
    Z((Q) => {
      const z = Ze(O, I), J = new Map(Q);
      return J.set(z, !(Q.get(z) ?? !0)), J;
    });
  }, []), To = M.useCallback((O, I, Q) => {
    re((z) => {
      const J = new Map(z);
      return J.set(Ze(O, I), np(Q)), J;
    });
  }, []);
  M.useCallback((O, I, Q) => {
    Ct((z) => {
      const J = new Map(z);
      return J.set(Ze(O, I), Q), J;
    });
  }, []);
  const Lo = M.useCallback((O, I, Q) => {
    me((z) => {
      const J = Ze(O, I), p = new Map(z);
      return p.set(J, { ...p.get(J), ...Q }), p;
    });
  }, []), he = M.useCallback((O, I, Q, z) => {
    Vt((J) => {
      const p = new Map(J);
      return p.set(`${Ze(O, I)}:${Q}`, np(z)), p;
    });
  }, []), ga = M.useCallback((O, I, Q, z) => {
    ie((J) => {
      const p = new Map(J);
      return p.set(`${Ze(O, I)}:${Q}`, !z), p;
    });
  }, []), ki = M.useCallback(
    (O, I) => {
      const Q = S[O] ?? [], z = Q[I];
      if (z === void 0) return;
      N((p) => new Map(p).set(O, z));
      const J = Q[Q.length - 1];
      z !== J && W((p) => new Map(p).set(O, !1));
    },
    [S]
  ), ya = M.useCallback(
    (O) => {
      W((Q) => new Map(Q).set(O, !0));
      const I = S[O] ?? [];
      I.length > 0 && N((Q) => new Map(Q).set(O, I[I.length - 1]));
    },
    [S]
  );
  function Si(O) {
    const I = S[O] ?? [], Q = A.get(O) ?? null, z = Q !== null ? I.indexOf(Q) : -1, J = F.get(O) ?? !0;
    return /* @__PURE__ */ D.jsxs("div", { style: ZE, children: [
      /* @__PURE__ */ D.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: Math.max(0, I.length - 1),
          value: Math.max(0, z),
          disabled: I.length === 0,
          onChange: (p) => ki(O, Number(p.target.value)),
          style: JE
        }
      ),
      /* @__PURE__ */ D.jsxs("div", { style: qE, children: [
        /* @__PURE__ */ D.jsxs("span", { style: eC, children: [
          Q !== null ? `epoch ${Q}` : "—",
          /* @__PURE__ */ D.jsxs("span", { style: tC, children: [
            " / ",
            Math.max(0, I.length - 1)
          ] })
        ] }),
        /* @__PURE__ */ D.jsx("button", { type: "button", onClick: () => ya(O), disabled: J, style: rC, children: J ? "● live" : "○ go live" })
      ] })
    ] });
  }
  function dr(O, I) {
    const Q = Ze(O.run, I.layer_name), z = I.kind === "mask" || I.kind === "mesh", J = O.color !== null, p = [I.default_color[0], I.default_color[1], I.default_color[2]], se = T.get(Q) ?? (J ? hn(p) : p);
    pe.get(Q) ?? I.default_opacity;
    const H = I.kind === "mask" && I.maskLabels && Object.keys(I.maskLabels).length > 0 ? Object.entries(I.maskLabels).map(([q, ne]) => [Number(q), ne]).filter(([q]) => Number.isFinite(q)).sort((q, ne) => q[0] - ne[0]) : null;
    return /* @__PURE__ */ D.jsxs("div", { children: [
      /* @__PURE__ */ D.jsxs("label", { style: iC, children: [
        /* @__PURE__ */ D.jsx(
          "input",
          {
            type: "checkbox",
            checked: K.get(Q) ?? I.default_visible,
            onChange: () => xi(O.run, I.layer_name)
          }
        ),
        !H && (z ? /* @__PURE__ */ D.jsx(
          "input",
          {
            type: "color",
            value: rp(se),
            onChange: (q) => To(O.run, I.layer_name, q.target.value),
            style: aC,
            title: "Layer color"
          }
        ) : /* @__PURE__ */ D.jsx("span", { style: { ...lC, background: XE(I.default_color) } })),
        /* @__PURE__ */ D.jsx("span", { style: oC, children: I.display_name }),
        /* @__PURE__ */ D.jsx("span", { style: xC, children: I.kind })
      ] }),
      !1,
      I.kind === "volume" && (() => {
        const q = $e.get(Q);
        return q ? /* @__PURE__ */ D.jsx(
          YE,
          {
            sis: q,
            crop: fe.get(Q),
            onOverrideChange: (ne) => Lo(O.run, I.layer_name, ne)
          },
          Q
        ) : null;
      })(),
      H && /* @__PURE__ */ D.jsx("div", { style: _C, children: H.map(([q, ne]) => {
        const de = ws(q), xe = Ee.get(`${Q}:${q}`) ?? (J ? hn(de) : de), ae = Ye.get(`${Q}:${q}`) ?? I.default_visible;
        return /* @__PURE__ */ D.jsxs("label", { style: wC, title: `Show/hide ${ne}`, children: [
          /* @__PURE__ */ D.jsx(
            "input",
            {
              type: "checkbox",
              checked: ae,
              onChange: () => ga(O.run, I.layer_name, q, ae)
            }
          ),
          /* @__PURE__ */ D.jsx(
            "input",
            {
              type: "color",
              value: rp(xe),
              onChange: (Oe) => he(O.run, I.layer_name, q, Oe.target.value),
              style: sC,
              title: `${ne} color`,
              onClick: (Oe) => Oe.stopPropagation()
            }
          ),
          ne
        ] }, q);
      }) })
    ] }, Q);
  }
  const jr = /* @__PURE__ */ D.jsx("div", { style: KE, children: P.map(({ label: O, hidden: I, setHidden: Q }) => /* @__PURE__ */ D.jsxs("label", { style: QE, children: [
    /* @__PURE__ */ D.jsx(
      "input",
      {
        type: "checkbox",
        checked: !I,
        onChange: (z) => {
          $.current[O] = !z.target.checked, Q(!z.target.checked);
        }
      }
    ),
    O
  ] }, O)) }), Do = /* @__PURE__ */ D.jsxs("div", { style: ip, children: [
    !d && jr,
    Si(e),
    $t && /* @__PURE__ */ D.jsx("div", { style: xs, children: "Loading layers…" }),
    cr && /* @__PURE__ */ D.jsx("div", { style: nC, children: cr }),
    /* @__PURE__ */ D.jsx("div", { style: op, children: (() => {
      const O = k[e] ?? [];
      return /* @__PURE__ */ D.jsxs("div", { children: [
        O.map((I) => dr({ run: e, color: null }, I)),
        O.length === 0 && /* @__PURE__ */ D.jsx("div", { style: xs, children: "No layers reported for this case." })
      ] });
    })() })
  ] });
  return /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
    Do,
    d && eo.createPortal(jr, d),
    a.map((O) => {
      const I = u == null ? void 0 : u.get(O.run);
      if (!I) return null;
      const Q = { run: O.run, color: O.color }, z = k[O.run] ?? [];
      return eo.createPortal(
        /* @__PURE__ */ D.jsxs("div", { style: ip, children: [
          Si(O.run),
          /* @__PURE__ */ D.jsxs("div", { style: op, children: [
            z.map((J) => dr(Q, J)),
            z.length === 0 && /* @__PURE__ */ D.jsx("div", { style: xs, children: "No data available for this run." })
          ] })
        ] }),
        I,
        O.run
      );
    })
  ] });
}
function XE([e, t, r, o]) {
  return `rgba(${Math.round(e * 255)}, ${Math.round(t * 255)}, ${Math.round(r * 255)}, ${o})`;
}
function YE({
  sis: e,
  crop: t,
  onOverrideChange: r
}) {
  const o = sn(), a = zk(e), u = Bk(e), [d, h] = M.useState("2d"), g = d === "2d" ? a : u, y = (t == null ? void 0 : t.cropAxis) ?? "z", x = (t == null ? void 0 : t.cropPosition) ?? 1, L = (t == null ? void 0 : t.cropAxis) !== void 0 && (t == null ? void 0 : t.cropPosition) !== void 0;
  return /* @__PURE__ */ D.jsxs("div", { style: uC, children: [
    /* @__PURE__ */ D.jsx("div", { style: lp, children: ["2d", "3d"].map((C) => /* @__PURE__ */ D.jsx(
      "button",
      {
        type: "button",
        style: { ...ap, ...d === C ? sp : {} },
        onClick: () => h(C),
        children: C.toUpperCase()
      },
      C
    )) }),
    /* @__PURE__ */ D.jsxs("label", { style: vC, children: [
      /* @__PURE__ */ D.jsx(
        "input",
        {
          type: "checkbox",
          checked: g.invert,
          onChange: (C) => {
            const P = C.target.checked;
            g.invert = P, r(d === "2d" ? { invert2d: P } : { invert3d: P }), o.render();
          }
        }
      ),
      "Invert"
    ] }),
    /* @__PURE__ */ D.jsx(
      "button",
      {
        type: "button",
        style: hC,
        onClick: () => {
          e.autoWindow(), u.window = a.window, u.level = a.level, r({
            window2d: a.window,
            level2d: a.level,
            window3d: u.window,
            level3d: u.level
          }), o.render();
        },
        children: "Auto Window"
      }
    ),
    /* @__PURE__ */ D.jsxs("div", { style: mC, children: [
      /* @__PURE__ */ D.jsxs("div", { style: gC, children: [
        /* @__PURE__ */ D.jsx("span", { children: "Cross-section" }),
        L && /* @__PURE__ */ D.jsx(
          "button",
          {
            type: "button",
            style: yC,
            onClick: () => r({ cropAxis: void 0, cropPosition: void 0 }),
            children: "Clear"
          }
        )
      ] }),
      /* @__PURE__ */ D.jsx("div", { style: lp, children: ["x", "y", "z"].map((C) => /* @__PURE__ */ D.jsx(
        "button",
        {
          type: "button",
          style: { ...ap, ...L && y === C ? sp : {} },
          onClick: () => r({ cropAxis: C, cropPosition: L ? x : 1 }),
          children: C.toUpperCase()
        },
        C
      )) }),
      /* @__PURE__ */ D.jsxs("label", { style: cC, children: [
        /* @__PURE__ */ D.jsx("span", { style: fC, children: "Cut" }),
        /* @__PURE__ */ D.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: x,
            disabled: !L,
            onChange: (C) => r({ cropAxis: y, cropPosition: Number(C.target.value) }),
            style: dC
          }
        ),
        /* @__PURE__ */ D.jsx("span", { style: pC, children: L ? `${Math.round(x * 100)}%` : "off" })
      ] })
    ] })
  ] });
}
const ip = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  color: "var(--tb-text)"
}, KE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px 10px"
}, QE = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  opacity: 0.85,
  cursor: "pointer"
}, ZE = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, qE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
}, JE = {
  width: "100%"
}, eC = {
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap"
}, tC = {
  opacity: 0.55
}, rC = {
  font: "inherit",
  padding: "4px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer",
  whiteSpace: "nowrap"
}, xs = {
  opacity: 0.55
}, nC = {
  color: "var(--tb-error)"
}, op = {
  display: "flex",
  flexDirection: "column",
  gap: 4
}, iC = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer"
}, oC = {
  flex: 1,
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, lC = {
  width: 10,
  height: 10,
  borderRadius: 2,
  flexShrink: 0,
  display: "inline-block",
  border: "1px solid var(--tb-border)"
}, aC = {
  width: 16,
  height: 16,
  padding: 0,
  flexShrink: 0,
  border: "none",
  borderRadius: 2,
  cursor: "pointer"
}, sC = {
  width: 14,
  height: 14,
  padding: 0,
  flexShrink: 0,
  border: "none",
  borderRadius: 2,
  cursor: "pointer"
}, uC = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "4px 0 4px 22px"
}, lp = {
  display: "flex",
  gap: 4,
  marginBottom: 2
}, ap = {
  font: "inherit",
  fontSize: "0.85em",
  padding: "1px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "transparent",
  color: "inherit",
  opacity: 0.6,
  cursor: "pointer"
}, sp = {
  opacity: 1,
  background: "var(--tb-surface)"
}, cC = {
  display: "flex",
  alignItems: "center",
  gap: 8
}, fC = {
  flexShrink: 0,
  width: 46,
  opacity: 0.7
}, dC = {
  flex: 1,
  height: 14
}, pC = {
  opacity: 0.6,
  fontVariantNumeric: "tabular-nums",
  minWidth: 40,
  textAlign: "right"
}, vC = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  opacity: 0.85,
  cursor: "pointer"
}, hC = {
  font: "inherit",
  fontSize: "0.85em",
  padding: "2px 8px",
  marginTop: 2,
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer",
  alignSelf: "flex-start"
}, mC = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: 6,
  paddingTop: 6,
  borderTop: "1px solid var(--tb-border)"
}, gC = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  opacity: 0.7
}, yC = {
  font: "inherit",
  fontSize: "0.8em",
  padding: "0 6px",
  border: "none",
  background: "transparent",
  color: "inherit",
  opacity: 0.7,
  cursor: "pointer",
  textDecoration: "underline"
}, _C = {
  display: "flex",
  flexWrap: "wrap",
  gap: "3px 10px",
  padding: "2px 0 2px 22px",
  // aligned past the checkbox + a bit more
  opacity: 0.85
}, wC = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap",
  cursor: "pointer"
}, xC = {
  flexShrink: 0,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  opacity: 0.45
};
function up({ label: e, labelSuffix: t, defaultExpanded: r = !0, children: o }) {
  const [a, u] = M.useState(r);
  return /* @__PURE__ */ D.jsxs("div", { style: kC, children: [
    /* @__PURE__ */ D.jsxs("button", { type: "button", onClick: () => u((d) => !d), style: SC, children: [
      /* @__PURE__ */ D.jsx("span", { style: EC, children: a ? "▾" : "▸" }),
      /* @__PURE__ */ D.jsxs("span", { style: CC, children: [
        e,
        t ?? ""
      ] })
    ] }),
    a && /* @__PURE__ */ D.jsx("div", { style: bC, children: o })
  ] });
}
const kC = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "4px 10px 12px",
  borderTop: "1px solid var(--tb-border)"
}, SC = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "transparent",
  border: "none",
  padding: "8px 0 0",
  margin: 0,
  cursor: "pointer",
  color: "inherit",
  textAlign: "left",
  font: "inherit"
}, EC = {
  opacity: 0.55,
  width: 10,
  display: "inline-block"
}, CC = {
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  opacity: 0.55
}, bC = {
  display: "flex",
  flexDirection: "column",
  gap: 14
};
function PC({ tag: e, series: t, currentStep: r = null, width: o = 320, height: a = 160 }) {
  const h = t.filter((E) => E.points.length > 0);
  if (h.length === 0) return /* @__PURE__ */ D.jsxs("div", { style: RC, children: [
    "Waiting for scalar data (",
    e,
    ")…"
  ] });
  const g = h.map((E) => ({ ...E, points: [...E.points].sort((A, N) => A.step - N.step) })), y = Math.max(1, ...g.flatMap((E) => E.points.map((A) => A.step))), x = g.flatMap((E) => E.points.map((A) => A.value)), L = Math.min(...x), C = Math.max(...x), P = Math.max(C - L, 1e-6), $ = L - P * 0.1, B = C + P * 0.1, Y = Math.max(B - $, 1e-6), k = (E) => 34 + E / y * (o - 2 * 34), w = (E) => a - 34 - (E - $) / Y * (a - 34 - 28), S = r !== null && r <= y;
  return /* @__PURE__ */ D.jsxs("div", { style: TC, children: [
    /* @__PURE__ */ D.jsx("div", { style: LC, children: e }),
    /* @__PURE__ */ D.jsxs("svg", { viewBox: `0 0 ${o} ${a}`, preserveAspectRatio: "xMidYMid meet", style: DC, children: [
      /* @__PURE__ */ D.jsx("line", { x1: 34, y1: a - 34, x2: o - 34, y2: a - 34, stroke: "var(--tb-border)" }),
      /* @__PURE__ */ D.jsx("line", { x1: 34, y1: 28, x2: 34, y2: a - 34, stroke: "var(--tb-border)" }),
      g.map(({ run: E, color: A, points: N }) => {
        const F = N.map((K, Z) => `${Z === 0 ? "M" : "L"} ${k(K.step).toFixed(1)} ${w(K.value).toFixed(1)}`).join(" "), W = N[N.length - 1];
        return /* @__PURE__ */ D.jsxs("g", { children: [
          N.length > 1 && /* @__PURE__ */ D.jsx("path", { d: F, fill: "none", stroke: A, strokeWidth: 2 }),
          N.map((K) => /* @__PURE__ */ D.jsx("circle", { cx: k(K.step), cy: w(K.value), r: K === W ? 3 : 1.5, fill: A, children: /* @__PURE__ */ D.jsx("title", { children: `${E} · epoch ${K.step} · ${e} ${K.value.toFixed(4)}` }) }, K.step))
        ] }, E);
      }),
      S && /* @__PURE__ */ D.jsx(
        "line",
        {
          x1: k(r),
          y1: 28,
          x2: k(r),
          y2: a - 34,
          stroke: "var(--tb-accent)",
          strokeDasharray: "3,3"
        }
      ),
      /* @__PURE__ */ D.jsx("text", { x: 34, y: a - 11, fontSize: 15, fill: "var(--tb-text-muted)", children: "epoch 0" }),
      /* @__PURE__ */ D.jsxs("text", { x: o - 34, y: a - 11, fontSize: 15, fill: "var(--tb-text-muted)", textAnchor: "end", children: [
        "epoch ",
        y
      ] }),
      /* @__PURE__ */ D.jsxs("text", { x: 34, y: 18, fontSize: 15, fill: "var(--tb-text-muted)", children: [
        $.toFixed(3),
        "–",
        B.toFixed(3)
      ] })
    ] })
  ] });
}
const TC = {
  display: "flex",
  flexDirection: "column",
  gap: 4
}, LC = {
  opacity: 0.75,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, DC = {
  display: "block",
  width: "100%",
  height: "auto",
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, RC = {
  padding: "16px 8px",
  textAlign: "center",
  opacity: 0.55,
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, FC = 320, $C = 190;
function AC({ data: e, currentStep: t = null }) {
  const [r, o] = M.useState(!0), { status: a, error: u, groups: d, seriesForTag: h } = e, g = d.reduce((y, x) => y + x.tags.length, 0);
  return /* @__PURE__ */ D.jsxs("div", { style: OC, children: [
    /* @__PURE__ */ D.jsxs("button", { type: "button", onClick: () => o((y) => !y), style: MC, children: [
      /* @__PURE__ */ D.jsx("span", { style: IC, children: r ? "▾" : "▸" }),
      /* @__PURE__ */ D.jsxs("span", { style: jC, children: [
        "Metrics",
        a === "ready" ? ` (${g})` : ""
      ] })
    ] }),
    r && /* @__PURE__ */ D.jsxs("div", { style: NC, children: [
      a === "empty-runs" && /* @__PURE__ */ D.jsx("div", { style: Pl, children: "Check a run above to see its metrics." }),
      a === "loading" && /* @__PURE__ */ D.jsx("div", { style: Pl, children: "Looking for scalar data…" }),
      a === "error" && /* @__PURE__ */ D.jsx("div", { style: VC, children: u }),
      a === "no-tags" && /* @__PURE__ */ D.jsx("div", { style: Pl, children: "No scalar tags found for the checked run(s)." }),
      a === "ready" && d.map(({ group: y, tags: x }) => /* @__PURE__ */ D.jsxs("div", { style: zC, children: [
        /* @__PURE__ */ D.jsx("div", { style: BC, children: y }),
        x.map((L) => /* @__PURE__ */ D.jsx("div", { style: UC, children: /* @__PURE__ */ D.jsx(
          PC,
          {
            tag: L,
            series: h(L),
            currentStep: t,
            width: FC,
            height: $C
          }
        ) }, L))
      ] }, y))
    ] })
  ] });
}
const OC = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "4px 10px 12px",
  borderTop: "1px solid var(--tb-border)"
}, MC = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "transparent",
  border: "none",
  padding: "8px 0 0",
  margin: 0,
  cursor: "pointer",
  color: "inherit",
  textAlign: "left",
  font: "inherit"
}, IC = {
  opacity: 0.55,
  width: 10,
  display: "inline-block"
}, jC = {
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  opacity: 0.55
}, NC = {
  display: "flex",
  flexDirection: "column",
  gap: 14
}, zC = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, BC = {
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  opacity: 0.4
}, UC = {
  display: "block"
}, Pl = {
  padding: "10px 8px",
  textAlign: "center",
  opacity: 0.55,
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, VC = {
  ...Pl,
  color: "var(--tb-error)"
}, WC = {
  background: "#ffffff",
  // Not `background`: a white viewport wrecks grayscale window/level contrast.
  // Reusing DARK_THEME's page background keeps it inside TensorBoard's palette.
  canvasBackground: "#303030",
  sidebarBackground: "#f5f5f5",
  surface: "#fafafa",
  textPrimary: "#212121",
  textMuted: "#616161",
  border: "#ebebeb",
  accent: "#f57c00",
  accentSoft: "rgba(245, 124, 0, 0.14)",
  error: "#e5534b"
}, HC = {
  background: "#303030",
  // One shade below the page background, so the viewport reads as recessed.
  // 0x1a/255 = 0.102, essentially the SDK's own default: dark mode is unchanged.
  canvasBackground: "#1a1a1a",
  sidebarBackground: "#3a3a3a",
  surface: "#424242",
  textPrimary: "rgba(255, 255, 255, 0.87)",
  textMuted: "rgba(255, 255, 255, 0.7)",
  border: "#555555",
  accent: "#ef6c00",
  accentSoft: "rgba(239, 108, 0, 0.22)",
  error: "#e5534b"
};
function mc(e) {
  return e ? HC : WC;
}
function cp(e) {
  const t = parseInt(e.slice(1), 16);
  return [(t >> 16) / 255, (t >> 8 & 255) / 255, (t & 255) / 255];
}
const GC = 2e3;
function XC(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = o.indexOf("/"), u = a === -1 ? o : o.slice(0, a);
    r.has(u) || (r.set(u, []), t.push(u)), r.get(u).push(o);
  }
  return t.map((o) => ({ group: o, tags: r.get(o) ?? [] }));
}
function YC(e) {
  return [...e.map((t) => t.run)].sort().join("::");
}
function KC(e) {
  const [t, r] = M.useState({}), [o, a] = M.useState({}), [u, d] = M.useState(null), h = YC(e), g = M.useRef(e), y = M.useRef({});
  M.useEffect(() => {
    g.current = e, y.current = t;
  });
  const [x, L] = M.useState(h);
  h !== x && (L(h), r({}), a({}), d(null)), M.useEffect(() => {
    y.current = {};
    const Y = g.current;
    if (Y.length === 0) return;
    let k = !1;
    return Promise.all(
      Y.map(async ({ run: w }) => [w, await wE(w)])
    ).then((w) => {
      if (k) return;
      const S = {};
      for (const [E, A] of w) S[E] = A;
      y.current = S, r(S);
    }).catch((w) => {
      k || d(w instanceof Error ? w.message : "Failed to discover scalar tags.");
    }), () => {
      k = !0;
    };
  }, [h]), M.useEffect(() => {
    const Y = Object.values(t).reduce((E, A) => E + A.length, 0);
    if (!h || Y === 0) return;
    let k = !1;
    const w = async () => {
      try {
        const E = [];
        for (const { run: F } of g.current)
          for (const W of y.current[F] ?? []) E.push([F, W]);
        const A = await Promise.all(
          E.map(
            async ([F, W]) => [F, W, await xE(F, W)]
          )
        );
        if (k) return;
        const N = {};
        for (const [F, W, K] of A)
          N[F] || (N[F] = {}), N[F][W] = K;
        a(N), d(null);
      } catch (E) {
        k || d(E instanceof Error ? E.message : "Failed to load scalars.");
      }
    };
    w();
    const S = window.setInterval(w, GC);
    return () => {
      k = !0, window.clearInterval(S);
    };
  }, [h, t]);
  const C = (Y) => e.filter(({ run: k }) => (t[k] ?? []).includes(Y)).map(({ run: k, color: w }) => {
    var S;
    return { run: k, color: w, points: ((S = o[k]) == null ? void 0 : S[Y]) ?? [] };
  });
  if (e.length === 0)
    return { status: "empty-runs", error: null, groups: [], seriesForTag: C };
  if (u)
    return { status: "error", error: u, groups: [], seriesForTag: C };
  if (!e.every(({ run: Y }) => Y in t))
    return { status: "loading", error: null, groups: [], seriesForTag: C };
  const $ = /* @__PURE__ */ new Set(), B = [];
  for (const { run: Y } of e)
    for (const k of t[Y] ?? [])
      $.has(k) || ($.add(k), B.push(k));
  return B.length === 0 ? { status: "no-tags", error: null, groups: [], seriesForTag: C } : { status: "ready", error: null, groups: XC(B), seriesForTag: C };
}
function yu() {
  var e;
  try {
    return window.parent.document.body.classList.contains("dark-mode");
  } catch {
    return ((e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-color-scheme: dark)").matches) ?? !1;
  }
}
function QC() {
  const [e, t] = M.useState(yu);
  return M.useEffect(() => {
    let r;
    try {
      r = window.parent.document.body;
    } catch {
      return;
    }
    const o = new MutationObserver(() => {
      t(yu());
    });
    return o.observe(r, { attributes: !0, attributeFilter: ["class"] }), () => o.disconnect();
  }, []), e;
}
function fp(e) {
  return e.replace(/[^a-zA-Z0-9_.-]/g, "_");
}
function ZC() {
  const e = Nk();
  return /* @__PURE__ */ D.jsxs("div", { style: Cb, children: [
    "Failed to initialize ImFusion WebSDK: ",
    e.message
  ] });
}
function qC({ isDark: e, color: t }) {
  const r = sn();
  return M.useEffect(() => {
    const o = cp(mc(e).canvasBackground);
    r.display.setBackgroundColor(o);
    for (const a of [
      r.display.mainAxialView(),
      r.display.mainCoronalView(),
      r.display.mainSagittalView(),
      r.display.main3dView(),
      r.display.main2dView()
    ])
      a.setBackgroundColor(o);
    r.display.main3dView().setBorderColor(cp(t)), r.render();
  }, [r, e, t]), null;
}
const ks = /* @__PURE__ */ new Set(), JC = 1e-4;
function dp(e) {
  const t = e.camera();
  try {
    return [...t.position, ...t.lookVector, ...t.upVector, t.fovY];
  } finally {
    t.delete();
  }
}
function eb(e, t) {
  const r = e.camera();
  try {
    r.setVectors([t[0], t[1], t[2]], [t[3], t[4], t[5]], [t[6], t[7], t[8]]), r.fovY = t[9], e.setCamera(r, !0);
  } finally {
    r.delete();
  }
}
function pp(e, t) {
  return e.every((r, o) => Math.abs(r - t[o]) < JC);
}
function tb({ caseName: e, linked: t }) {
  const r = sn();
  return M.useEffect(() => {
    if (e === null || !t) return;
    const o = r.display.main3dView();
    let a = dp(o);
    const u = (h) => {
      h.case !== e || pp(h.values, a) || (a = h.values, eb(o, h.values));
    };
    ks.add(u);
    const d = r.display.onUpdateRequested(() => {
      if (!r.canvas.matches(":hover")) return;
      const h = dp(o);
      if (!pp(h, a)) {
        a = h;
        for (const g of ks)
          g !== u && g({ case: e, values: h });
      }
    });
    return () => {
      ks.delete(u), d();
    };
  }, [r, e, t]), null;
}
function rb(e, t, r) {
  requestAnimationFrame(() => {
    e.render(), t.toBlob((o) => {
      if (!o) {
        console.error("imfusion_viewer: canvas.toBlob() returned null - export failed.");
        return;
      }
      const a = URL.createObjectURL(o), u = document.createElement("a");
      u.href = a, u.download = r, document.body.appendChild(u), u.click(), u.remove(), URL.revokeObjectURL(a);
    }, "image/png");
  });
}
function nb({ canvasRef: e, run: t, caseName: r, step: o }) {
  const a = sn(), u = M.useCallback(() => {
    const d = e.current;
    if (!d) return;
    const h = o !== null ? `epoch${o}` : "epoch_unknown", g = `${fp(t)}_${fp(r)}_${h}.png`;
    rb(a, d, g);
  }, [a, e, t, r, o]);
  return /* @__PURE__ */ D.jsx("button", { type: "button", onClick: u, style: Sb, children: "Export PNG" });
}
function ib({
  run: e,
  color: t,
  isDark: r,
  licenseToken: o,
  linkCameras: a,
  selection: u,
  caseMeta: d,
  overlayRuns: h,
  onCurrentStepChange: g,
  controlsContainer: y,
  overlayControlsContainers: x,
  viewToggleContainer: L
}) {
  const C = M.useRef(null), P = h.map((k) => k.run).sort().join(","), [$, B] = M.useState(null), Y = M.useCallback(
    (k) => {
      B(k), g == null || g(k);
    },
    [g]
  );
  return /* @__PURE__ */ D.jsx(Ak, { options: { autoResize: !0, uiAnimations: !1, licenseToken: o ?? void 0 }, children: /* @__PURE__ */ D.jsxs("div", { style: mb, children: [
    /* @__PURE__ */ D.jsx("div", { style: gb, children: /* @__PURE__ */ D.jsxs("div", { style: yb, children: [
      /* @__PURE__ */ D.jsx("span", { style: { ..._b, background: t } }),
      /* @__PURE__ */ D.jsx("span", { style: wb, title: e, children: e })
    ] }) }),
    /* @__PURE__ */ D.jsxs("div", { style: xb, children: [
      /* @__PURE__ */ D.jsx(Ok, { ref: C, style: db }),
      /* @__PURE__ */ D.jsx(Ik, { children: /* @__PURE__ */ D.jsx("div", { style: _u, children: "Initializing ImFusion WebSDK…" }) }),
      /* @__PURE__ */ D.jsx(jk, { children: /* @__PURE__ */ D.jsx(ZC, {}) }),
      /* @__PURE__ */ D.jsxs(Mk, { children: [
        /* @__PURE__ */ D.jsx(qC, { isDark: r, color: t }),
        /* @__PURE__ */ D.jsx(tb, { caseName: (u == null ? void 0 : u.case) ?? null, linked: a }),
        !(u && d) && /* @__PURE__ */ D.jsx("div", { style: _u, children: "Select a case from the list to begin." }),
        y && eo.createPortal(
          u && d ? /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
            /* @__PURE__ */ D.jsx(
              GE,
              {
                run: u.run,
                caseName: u.case,
                initialLayers: d.layers,
                initialSteps: d.steps,
                overlayRuns: h,
                overlayContainers: x,
                viewToggleContainer: L,
                onCurrentStepChange: Y
              },
              `${u.run} ${u.case} ${P}`
            ),
            /* @__PURE__ */ D.jsx("div", { style: kb, children: /* @__PURE__ */ D.jsx(
              nb,
              {
                canvasRef: C,
                run: u.run,
                caseName: u.case,
                step: $
              }
            ) })
          ] }) : /* @__PURE__ */ D.jsx("div", { style: Eb, children: "No case selected." }),
          y
        )
      ] })
    ] })
  ] }) });
}
function ob() {
  var gt, er;
  const e = QC(), t = mc(e), [r, o] = M.useState(/* @__PURE__ */ new Map()), [a, u] = M.useState(null), [d, h] = M.useState(/* @__PURE__ */ new Set()), [g, y] = M.useState([]), [x, L] = M.useState(null), [C, P] = M.useState(void 0), [$, B] = M.useState(!0), [Y, k] = M.useState(!1), w = M.useRef(/* @__PURE__ */ new Map()), [, S] = M.useState(0), E = M.useRef(/* @__PURE__ */ new Map()), A = M.useCallback((oe) => {
    let Te = E.current.get(oe);
    return Te || (Te = (be) => {
      be ? w.current.get(oe) !== be && (w.current.set(oe, be), S((Le) => Le + 1)) : w.current.delete(oe);
    }, E.current.set(oe, Te)), Te;
  }, []), N = M.useRef(null), [, F] = M.useState(0), W = M.useCallback((oe) => {
    N.current !== oe && (N.current = oe, F((Te) => Te + 1));
  }, []);
  M.useEffect(() => {
    gE().then(P, (oe) => {
      console.warn("imfusion_viewer: could not fetch the WebSDK license token", oe), P(null);
    });
  }, []);
  const K = M.useCallback((oe, Te) => {
    u(Te), o((be) => {
      const Le = new Map(be);
      return Le.set(oe.run, oe.case), Le;
    }), h((be) => be.has(oe.run) ? be : new Set(be).add(oe.run));
  }, []), Z = M.useCallback((oe) => {
    h((Te) => {
      const be = new Set(Te);
      return be.has(oe) ? be.delete(oe) : be.add(oe), be;
    });
  }, []), T = M.useCallback((oe) => {
    h((Te) => {
      const be = oe.length > 0 && oe.every((We) => Te.has(We)), Le = new Set(Te);
      for (const We of oe)
        be ? Le.delete(We) : Le.add(We);
      return Le;
    });
  }, []), re = kE(a ? Object.keys(a) : []), Ct = (a ? Object.keys(a).sort() : []).filter((oe) => d.has(oe)).map((oe) => ({ run: oe, color: re.get(oe) ?? xo[0] })), Ee = KC(Ct), Vt = [...d].filter((oe) => !g.includes(oe));
  Vt.length > 0 && (y((oe) => [...oe, ...Vt]), o((oe) => {
    let Te = !1;
    const be = new Map(oe);
    for (const Le of Vt) {
      if (be.has(Le)) continue;
      const We = a ? Object.keys(a[Le] ?? {}) : [];
      We.length === 1 && (be.set(Le, We[0]), Te = !0);
    }
    return Te ? be : oe;
  }));
  const Ye = d.size, ie = Y && Ye >= 2, fe = g.map((oe, Te) => {
    var yt;
    const be = r.get(oe), Le = be !== void 0 ? { run: oe, case: be } : null, We = Le ? (yt = a == null ? void 0 : a[Le.run]) == null ? void 0 : yt[Le.case] : void 0, Wt = d.has(oe), At = Te === 0;
    return {
      run: oe,
      color: re.get(oe) ?? xo[0],
      selection: Le,
      caseMeta: We,
      active: Wt,
      isPrimary: At,
      // In combined-workspace mode, every other active run's data folds into
      // the primary column as an overlay (see `overlayRunsForPrimary`), so
      // only the primary itself gets a rendered column and sidebar controls.
      showAsColumn: Wt && (!ie || At)
    };
  }), me = {
    ...lb,
    "--tb-bg": t.background,
    "--tb-canvas-bg": t.canvasBackground,
    "--tb-sidebar-bg": t.sidebarBackground,
    "--tb-surface": t.surface,
    "--tb-text": t.textPrimary,
    "--tb-text-muted": t.textMuted,
    "--tb-border": t.border,
    "--tb-accent": t.accent,
    "--tb-accent-soft": t.accentSoft,
    "--tb-error": t.error
  }, $e = new Set(fe.filter((oe) => oe.active).map((oe) => oe.run)), ye = (er = (gt = fe.find((oe) => oe.isPrimary)) == null ? void 0 : gt.selection) == null ? void 0 : er.case, $t = ie ? fe.filter((oe) => oe.active && !oe.isPrimary && oe.selection).map((oe) => {
    var Te, be, Le, We;
    return {
      run: oe.run,
      color: oe.color,
      initialLayers: ye ? (be = (Te = a == null ? void 0 : a[oe.run]) == null ? void 0 : Te[ye]) == null ? void 0 : be.layers : void 0,
      initialSteps: ye ? (We = (Le = a == null ? void 0 : a[oe.run]) == null ? void 0 : Le[ye]) == null ? void 0 : We.steps : void 0
    };
  }) : [], dt = new Map(
    $t.map((oe) => [oe.run, w.current.get(oe.run) ?? null])
  ), cr = /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
    /* @__PURE__ */ D.jsxs("label", { style: vp, title: "Orbiting one run's 3D view moves every other column showing the same case", children: [
      /* @__PURE__ */ D.jsx(
        "input",
        {
          type: "checkbox",
          checked: $,
          disabled: Y || Ye < 2,
          onChange: (oe) => B(oe.target.checked)
        }
      ),
      /* @__PURE__ */ D.jsx("span", { style: Y || Ye < 2 ? hp : void 0, children: "Link 3D cameras" })
    ] }),
    /* @__PURE__ */ D.jsxs(
      "label",
      {
        style: vp,
        title: "Show every checked run's layers together in one shared viewer, colored per run, instead of separate side-by-side columns",
        children: [
          /* @__PURE__ */ D.jsx(
            "input",
            {
              type: "checkbox",
              checked: Y,
              disabled: Ye < 2,
              onChange: (oe) => k(oe.target.checked)
            }
          ),
          /* @__PURE__ */ D.jsx("span", { style: Ye < 2 ? hp : void 0, children: "Combine into one workspace" })
        ]
      }
    )
  ] });
  return /* @__PURE__ */ D.jsxs("div", { style: me, children: [
    /* @__PURE__ */ D.jsxs("aside", { style: ab, children: [
      /* @__PURE__ */ D.jsxs("div", { style: sb, children: [
        /* @__PURE__ */ D.jsx("h1", { style: ub, children: "ImFusion Viewer" }),
        /* @__PURE__ */ D.jsx(Wk, { isDark: e })
      ] }),
      /* @__PURE__ */ D.jsxs(up, { label: "Viewer Control", children: [
        /* @__PURE__ */ D.jsx("div", { ref: W, style: cb }),
        cr
      ] }),
      /* @__PURE__ */ D.jsx(up, { label: "Runs", children: /* @__PURE__ */ D.jsx(
        CE,
        {
          selectedCaseByRun: r,
          onSelect: K,
          onCasesUpdate: u,
          checkedRuns: d,
          onToggleRun: Z,
          onToggleAllRuns: T,
          runColors: re,
          activeControlsRuns: $e,
          registerControlsContainer: A
        }
      ) }),
      /* @__PURE__ */ D.jsx(AC, { data: Ee, currentStep: x })
    ] }),
    /* @__PURE__ */ D.jsx("main", { style: fb, children: /* @__PURE__ */ D.jsx("div", { style: pb, children: C !== void 0 && fe.map(({ run: oe, color: Te, selection: be, caseMeta: Le, showAsColumn: We, isPrimary: Wt }) => /* @__PURE__ */ D.jsx("div", { style: We ? vb : hb, children: /* @__PURE__ */ D.jsx(
      ib,
      {
        run: oe,
        color: Te,
        isDark: e,
        licenseToken: C,
        linkCameras: $,
        selection: be,
        caseMeta: Le,
        overlayRuns: Wt ? $t : [],
        overlayControlsContainers: Wt ? dt : void 0,
        viewToggleContainer: Wt ? N.current : null,
        onCurrentStepChange: Wt ? L : void 0,
        controlsContainer: We ? w.current.get(oe) ?? null : null
      }
    ) }, oe)) }) })
  ] });
}
const lb = {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  background: "var(--tb-bg)",
  color: "var(--tb-text)",
  // Matches TensorBoard core's own typography (Roboto/Noto, 15px). The font
  // itself is made available via index.tsx's font-face injection, since this
  // plugin's iframe doesn't automatically inherit TB core's fonts.
  fontFamily: "Roboto, Noto, sans-serif",
  fontSize: 15,
  overflow: "hidden"
}, ab = {
  width: 340,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  padding: "12px 14px",
  // Distinct from the main area's --tb-bg: TensorBoard's sidebar is
  // consistently one shade off from its main content area, in both themes.
  background: "var(--tb-sidebar-bg)",
  borderRight: "1px solid var(--tb-border)",
  overflowY: "auto"
}, sb = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8
}, ub = {
  font: "inherit",
  margin: 0
}, vp = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer"
}, hp = {
  opacity: 0.45
}, cb = {
  marginBottom: 4
}, fb = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
}, db = {
  width: "100%",
  height: "100%",
  display: "block"
}, pb = {
  flex: 1,
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gridAutoRows: "minmax(320px, 1fr)",
  gap: 8,
  padding: 8,
  overflow: "auto"
}, vb = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  border: "1px solid var(--tb-border)",
  borderRadius: 8,
  overflow: "hidden"
}, hb = {
  display: "none"
}, mb = {
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
}, gb = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexShrink: 0,
  padding: "6px 10px",
  background: "var(--tb-surface)",
  borderBottom: "1px solid var(--tb-border)",
  overflow: "hidden"
}, yb = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
  overflow: "hidden"
}, _b = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  flexShrink: 0,
  display: "inline-block"
}, wb = {
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, xb = {
  position: "relative",
  width: "100%",
  flex: 1,
  minHeight: 0,
  background: "var(--tb-canvas-bg)"
}, kb = {
  padding: "0 10px 4px"
}, Sb = {
  width: "100%",
  font: "inherit",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer"
}, Eb = {
  minHeight: 160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  opacity: 0.55,
  textAlign: "center"
}, _u = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.6,
  textAlign: "center",
  padding: 24,
  // Fixed light color, not var(--tb-text): the canvas and the container behind
  // it are painted `canvasBackground`, dark in both themes by design, so a
  // theme-aware color would be invisible in light mode.
  color: "#e8eaed"
}, Cb = {
  ..._u,
  color: "var(--tb-error)"
};
D0({ url: new URL("./wasm/ImFusionLib.wasm", import.meta.url) });
const bb = `
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(/font-roboto/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(/font-roboto/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
`;
function Pb() {
  if (document.getElementById("imfusion-viewer-roboto-fontface")) return;
  const e = document.createElement("style");
  e.id = "imfusion-viewer-roboto-fontface", e.textContent = bb, document.head.appendChild(e);
}
function $b() {
  Pb();
  const e = document.createElement("div");
  e.id = "imfusion-viewer-root", e.style.width = "100vw", e.style.height = "100vh", document.documentElement.style.margin = "0", document.documentElement.style.height = "100%", document.body.style.margin = "0", document.body.style.height = "100%", document.body.style.background = mc(yu()).background, document.body.appendChild(e), T0(e).render(/* @__PURE__ */ D.jsx(ob, {}));
}
const Tb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  $b as render
};
