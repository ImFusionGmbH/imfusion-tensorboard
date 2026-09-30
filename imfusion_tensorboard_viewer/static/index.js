var X2 = Object.defineProperty;
var Y2 = (e, t, r) => t in e ? X2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Ye = (e, t, r) => Y2(e, typeof t != "symbol" ? t + "" : t, r);
var xh = { exports: {} }, Ms = {}, kh = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zo = Symbol.for("react.element"), K2 = Symbol.for("react.portal"), Q2 = Symbol.for("react.fragment"), Z2 = Symbol.for("react.strict_mode"), q2 = Symbol.for("react.profiler"), J2 = Symbol.for("react.provider"), ex = Symbol.for("react.context"), tx = Symbol.for("react.forward_ref"), rx = Symbol.for("react.suspense"), nx = Symbol.for("react.memo"), ix = Symbol.for("react.lazy"), Gf = Symbol.iterator;
function ox(e) {
  return e === null || typeof e != "object" ? null : (e = Gf && e[Gf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Sh = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Eh = Object.assign, bh = {};
function Vi(e, t, r) {
  this.props = e, this.context = t, this.refs = bh, this.updater = r || Sh;
}
Vi.prototype.isReactComponent = {};
Vi.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vi.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ch() {
}
Ch.prototype = Vi.prototype;
function sc(e, t, r) {
  this.props = e, this.context = t, this.refs = bh, this.updater = r || Sh;
}
var ac = sc.prototype = new Ch();
ac.constructor = sc;
Eh(ac, Vi.prototype);
ac.isPureReactComponent = !0;
var Xf = Array.isArray, Ph = Object.prototype.hasOwnProperty, uc = { current: null }, Rh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Th(e, t, r) {
  var o, s = {}, a = null, f = null;
  if (t != null) for (o in t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (a = "" + t.key), t) Ph.call(t, o) && !Rh.hasOwnProperty(o) && (s[o] = t[o]);
  var p = arguments.length - 2;
  if (p === 1) s.children = r;
  else if (1 < p) {
    for (var g = Array(p), y = 0; y < p; y++) g[y] = arguments[y + 2];
    s.children = g;
  }
  if (e && e.defaultProps) for (o in p = e.defaultProps, p) s[o] === void 0 && (s[o] = p[o]);
  return { $$typeof: Zo, type: e, key: a, ref: f, props: s, _owner: uc.current };
}
function lx(e, t) {
  return { $$typeof: Zo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function cc(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Zo;
}
function sx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(r) {
    return t[r];
  });
}
var Yf = /\/+/g;
function wa(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? sx("" + e.key) : t.toString(36);
}
function Gl(e, t, r, o, s) {
  var a = typeof e;
  (a === "undefined" || a === "boolean") && (e = null);
  var f = !1;
  if (e === null) f = !0;
  else switch (a) {
    case "string":
    case "number":
      f = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Zo:
        case K2:
          f = !0;
      }
  }
  if (f) return f = e, s = s(f), e = o === "" ? "." + wa(f, 0) : o, Xf(s) ? (r = "", e != null && (r = e.replace(Yf, "$&/") + "/"), Gl(s, t, r, "", function(y) {
    return y;
  })) : s != null && (cc(s) && (s = lx(s, r + (!s.key || f && f.key === s.key ? "" : ("" + s.key).replace(Yf, "$&/") + "/") + e)), t.push(s)), 1;
  if (f = 0, o = o === "" ? "." : o + ":", Xf(e)) for (var p = 0; p < e.length; p++) {
    a = e[p];
    var g = o + wa(a, p);
    f += Gl(a, t, r, g, s);
  }
  else if (g = ox(e), typeof g == "function") for (e = g.call(e), p = 0; !(a = e.next()).done; ) a = a.value, g = o + wa(a, p++), f += Gl(a, t, r, g, s);
  else if (a === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return f;
}
function kl(e, t, r) {
  if (e == null) return e;
  var o = [], s = 0;
  return Gl(e, o, "", "", function(a) {
    return t.call(r, a, s++);
  }), o;
}
function ax(e) {
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
var $t = { current: null }, Xl = { transition: null }, ux = { ReactCurrentDispatcher: $t, ReactCurrentBatchConfig: Xl, ReactCurrentOwner: uc };
function Lh() {
  throw Error("act(...) is not supported in production builds of React.");
}
Ae.Children = { map: kl, forEach: function(e, t, r) {
  kl(e, function() {
    t.apply(this, arguments);
  }, r);
}, count: function(e) {
  var t = 0;
  return kl(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return kl(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!cc(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Ae.Component = Vi;
Ae.Fragment = Q2;
Ae.Profiler = q2;
Ae.PureComponent = sc;
Ae.StrictMode = Z2;
Ae.Suspense = rx;
Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ux;
Ae.act = Lh;
Ae.cloneElement = function(e, t, r) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var o = Eh({}, e.props), s = e.key, a = e.ref, f = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (a = t.ref, f = uc.current), t.key !== void 0 && (s = "" + t.key), e.type && e.type.defaultProps) var p = e.type.defaultProps;
    for (g in t) Ph.call(t, g) && !Rh.hasOwnProperty(g) && (o[g] = t[g] === void 0 && p !== void 0 ? p[g] : t[g]);
  }
  var g = arguments.length - 2;
  if (g === 1) o.children = r;
  else if (1 < g) {
    p = Array(g);
    for (var y = 0; y < g; y++) p[y] = arguments[y + 2];
    o.children = p;
  }
  return { $$typeof: Zo, type: e.type, key: s, ref: a, props: o, _owner: f };
};
Ae.createContext = function(e) {
  return e = { $$typeof: ex, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: J2, _context: e }, e.Consumer = e;
};
Ae.createElement = Th;
Ae.createFactory = function(e) {
  var t = Th.bind(null, e);
  return t.type = e, t;
};
Ae.createRef = function() {
  return { current: null };
};
Ae.forwardRef = function(e) {
  return { $$typeof: tx, render: e };
};
Ae.isValidElement = cc;
Ae.lazy = function(e) {
  return { $$typeof: ix, _payload: { _status: -1, _result: e }, _init: ax };
};
Ae.memo = function(e, t) {
  return { $$typeof: nx, type: e, compare: t === void 0 ? null : t };
};
Ae.startTransition = function(e) {
  var t = Xl.transition;
  Xl.transition = {};
  try {
    e();
  } finally {
    Xl.transition = t;
  }
};
Ae.unstable_act = Lh;
Ae.useCallback = function(e, t) {
  return $t.current.useCallback(e, t);
};
Ae.useContext = function(e) {
  return $t.current.useContext(e);
};
Ae.useDebugValue = function() {
};
Ae.useDeferredValue = function(e) {
  return $t.current.useDeferredValue(e);
};
Ae.useEffect = function(e, t) {
  return $t.current.useEffect(e, t);
};
Ae.useId = function() {
  return $t.current.useId();
};
Ae.useImperativeHandle = function(e, t, r) {
  return $t.current.useImperativeHandle(e, t, r);
};
Ae.useInsertionEffect = function(e, t) {
  return $t.current.useInsertionEffect(e, t);
};
Ae.useLayoutEffect = function(e, t) {
  return $t.current.useLayoutEffect(e, t);
};
Ae.useMemo = function(e, t) {
  return $t.current.useMemo(e, t);
};
Ae.useReducer = function(e, t, r) {
  return $t.current.useReducer(e, t, r);
};
Ae.useRef = function(e) {
  return $t.current.useRef(e);
};
Ae.useState = function(e) {
  return $t.current.useState(e);
};
Ae.useSyncExternalStore = function(e, t, r) {
  return $t.current.useSyncExternalStore(e, t, r);
};
Ae.useTransition = function() {
  return $t.current.useTransition();
};
Ae.version = "18.3.1";
kh.exports = Ae;
var R = kh.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cx = R, fx = Symbol.for("react.element"), dx = Symbol.for("react.fragment"), px = Object.prototype.hasOwnProperty, hx = cx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, vx = { key: !0, ref: !0, __self: !0, __source: !0 };
function Dh(e, t, r) {
  var o, s = {}, a = null, f = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (f = t.ref);
  for (o in t) px.call(t, o) && !vx.hasOwnProperty(o) && (s[o] = t[o]);
  if (e && e.defaultProps) for (o in t = e.defaultProps, t) s[o] === void 0 && (s[o] = t[o]);
  return { $$typeof: fx, type: e, key: a, ref: f, props: s, _owner: hx.current };
}
Ms.Fragment = dx;
Ms.jsx = Dh;
Ms.jsxs = Dh;
xh.exports = Ms;
var L = xh.exports, Fh = { exports: {} }, er = {}, Ah = { exports: {} }, $h = {};
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
  function t(ae, ye) {
    var xe = ae.length;
    ae.push(ye);
    e: for (; 0 < xe; ) {
      var We = xe - 1 >>> 1, De = ae[We];
      if (0 < s(De, ye)) ae[We] = ye, ae[xe] = De, xe = We;
      else break e;
    }
  }
  function r(ae) {
    return ae.length === 0 ? null : ae[0];
  }
  function o(ae) {
    if (ae.length === 0) return null;
    var ye = ae[0], xe = ae.pop();
    if (xe !== ye) {
      ae[0] = xe;
      e: for (var We = 0, De = ae.length, Vt = De >>> 1; We < Vt; ) {
        var Wt = 2 * (We + 1) - 1, vr = ae[Wt], mt = Wt + 1, mr = ae[mt];
        if (0 > s(vr, xe)) mt < De && 0 > s(mr, vr) ? (ae[We] = mr, ae[mt] = xe, We = mt) : (ae[We] = vr, ae[Wt] = xe, We = Wt);
        else if (mt < De && 0 > s(mr, xe)) ae[We] = mr, ae[mt] = xe, We = mt;
        else break e;
      }
    }
    return ye;
  }
  function s(ae, ye) {
    var xe = ae.sortIndex - ye.sortIndex;
    return xe !== 0 ? xe : ae.id - ye.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function() {
      return a.now();
    };
  } else {
    var f = Date, p = f.now();
    e.unstable_now = function() {
      return f.now() - p;
    };
  }
  var g = [], y = [], w = 1, D = null, C = 3, b = !1, j = !1, z = !1, Q = typeof setTimeout == "function" ? setTimeout : null, x = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function E(ae) {
    for (var ye = r(y); ye !== null; ) {
      if (ye.callback === null) o(y);
      else if (ye.startTime <= ae) o(y), ye.sortIndex = ye.expirationTime, t(g, ye);
      else break;
      ye = r(y);
    }
  }
  function P(ae) {
    if (z = !1, E(ae), !j) if (r(g) !== null) j = !0, Te(B);
    else {
      var ye = r(y);
      ye !== null && dt(P, ye.startTime - ae);
    }
  }
  function B(ae, ye) {
    j = !1, z && (z = !1, x(I), I = -1), b = !0;
    var xe = C;
    try {
      for (E(ye), D = r(g); D !== null && (!(D.expirationTime > ye) || ae && !S()); ) {
        var We = D.callback;
        if (typeof We == "function") {
          D.callback = null, C = D.priorityLevel;
          var De = We(D.expirationTime <= ye);
          ye = e.unstable_now(), typeof De == "function" ? D.callback = De : D === r(g) && o(g), E(ye);
        } else o(g);
        D = r(g);
      }
      if (D !== null) var Vt = !0;
      else {
        var Wt = r(y);
        Wt !== null && dt(P, Wt.startTime - ye), Vt = !1;
      }
      return Vt;
    } finally {
      D = null, C = xe, b = !1;
    }
  }
  var U = !1, A = null, I = -1, $ = 5, F = -1;
  function S() {
    return !(e.unstable_now() - F < $);
  }
  function Z() {
    if (A !== null) {
      var ae = e.unstable_now();
      F = ae;
      var ye = !0;
      try {
        ye = A(!0, ae);
      } finally {
        ye ? ue() : (U = !1, A = null);
      }
    } else U = !1;
  }
  var ue;
  if (typeof k == "function") ue = function() {
    k(Z);
  };
  else if (typeof MessageChannel < "u") {
    var Pe = new MessageChannel(), Se = Pe.port2;
    Pe.port1.onmessage = Z, ue = function() {
      Se.postMessage(null);
    };
  } else ue = function() {
    Q(Z, 0);
  };
  function Te(ae) {
    A = ae, U || (U = !0, ue());
  }
  function dt(ae, ye) {
    I = Q(function() {
      ae(e.unstable_now());
    }, ye);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(ae) {
    ae.callback = null;
  }, e.unstable_continueExecution = function() {
    j || b || (j = !0, Te(B));
  }, e.unstable_forceFrameRate = function(ae) {
    0 > ae || 125 < ae ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < ae ? Math.floor(1e3 / ae) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return C;
  }, e.unstable_getFirstCallbackNode = function() {
    return r(g);
  }, e.unstable_next = function(ae) {
    switch (C) {
      case 1:
      case 2:
      case 3:
        var ye = 3;
        break;
      default:
        ye = C;
    }
    var xe = C;
    C = ye;
    try {
      return ae();
    } finally {
      C = xe;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(ae, ye) {
    switch (ae) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        ae = 3;
    }
    var xe = C;
    C = ae;
    try {
      return ye();
    } finally {
      C = xe;
    }
  }, e.unstable_scheduleCallback = function(ae, ye, xe) {
    var We = e.unstable_now();
    switch (typeof xe == "object" && xe !== null ? (xe = xe.delay, xe = typeof xe == "number" && 0 < xe ? We + xe : We) : xe = We, ae) {
      case 1:
        var De = -1;
        break;
      case 2:
        De = 250;
        break;
      case 5:
        De = 1073741823;
        break;
      case 4:
        De = 1e4;
        break;
      default:
        De = 5e3;
    }
    return De = xe + De, ae = { id: w++, callback: ye, priorityLevel: ae, startTime: xe, expirationTime: De, sortIndex: -1 }, xe > We ? (ae.sortIndex = xe, t(y, ae), r(g) === null && ae === r(y) && (z ? (x(I), I = -1) : z = !0, dt(P, xe - We))) : (ae.sortIndex = De, t(g, ae), j || b || (j = !0, Te(B))), ae;
  }, e.unstable_shouldYield = S, e.unstable_wrapCallback = function(ae) {
    var ye = C;
    return function() {
      var xe = C;
      C = ye;
      try {
        return ae.apply(this, arguments);
      } finally {
        C = xe;
      }
    };
  };
})($h);
Ah.exports = $h;
var mx = Ah.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gx = R, Jt = mx;
function ne(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Mh = /* @__PURE__ */ new Set(), Fo = {};
function ei(e, t) {
  Oi(e, t), Oi(e + "Capture", t);
}
function Oi(e, t) {
  for (Fo[e] = t, e = 0; e < t.length; e++) Mh.add(t[e]);
}
var Jr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), au = Object.prototype.hasOwnProperty, yx = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Kf = {}, Qf = {};
function wx(e) {
  return au.call(Qf, e) ? !0 : au.call(Kf, e) ? !1 : yx.test(e) ? Qf[e] = !0 : (Kf[e] = !0, !1);
}
function _x(e, t, r, o) {
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
function xx(e, t, r, o) {
  if (t === null || typeof t > "u" || _x(e, t, r, o)) return !0;
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
function Mt(e, t, r, o, s, a, f) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = o, this.attributeNamespace = s, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = f;
}
var wt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  wt[e] = new Mt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  wt[t] = new Mt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  wt[e] = new Mt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  wt[e] = new Mt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  wt[e] = new Mt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  wt[e] = new Mt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  wt[e] = new Mt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  wt[e] = new Mt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  wt[e] = new Mt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var fc = /[\-:]([a-z])/g;
function dc(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    fc,
    dc
  );
  wt[t] = new Mt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(fc, dc);
  wt[t] = new Mt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(fc, dc);
  wt[t] = new Mt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  wt[e] = new Mt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
wt.xlinkHref = new Mt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  wt[e] = new Mt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function pc(e, t, r, o) {
  var s = wt.hasOwnProperty(t) ? wt[t] : null;
  (s !== null ? s.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (xx(t, r, s, o) && (r = null), o || s === null ? wx(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : s.mustUseProperty ? e[s.propertyName] = r === null ? s.type === 3 ? !1 : "" : r : (t = s.attributeName, o = s.attributeNamespace, r === null ? e.removeAttribute(t) : (s = s.type, r = s === 3 || s === 4 && r === !0 ? "" : "" + r, o ? e.setAttributeNS(o, t, r) : e.setAttribute(t, r))));
}
var nn = gx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Sl = Symbol.for("react.element"), gi = Symbol.for("react.portal"), yi = Symbol.for("react.fragment"), hc = Symbol.for("react.strict_mode"), uu = Symbol.for("react.profiler"), Oh = Symbol.for("react.provider"), Ih = Symbol.for("react.context"), vc = Symbol.for("react.forward_ref"), cu = Symbol.for("react.suspense"), fu = Symbol.for("react.suspense_list"), mc = Symbol.for("react.memo"), hn = Symbol.for("react.lazy"), jh = Symbol.for("react.offscreen"), Zf = Symbol.iterator;
function ao(e) {
  return e === null || typeof e != "object" ? null : (e = Zf && e[Zf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var it = Object.assign, _a;
function yo(e) {
  if (_a === void 0) try {
    throw Error();
  } catch (r) {
    var t = r.stack.trim().match(/\n( *(at )?)/);
    _a = t && t[1] || "";
  }
  return `
` + _a + e;
}
var xa = !1;
function ka(e, t) {
  if (!e || xa) return "";
  xa = !0;
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
      for (var s = y.stack.split(`
`), a = o.stack.split(`
`), f = s.length - 1, p = a.length - 1; 1 <= f && 0 <= p && s[f] !== a[p]; ) p--;
      for (; 1 <= f && 0 <= p; f--, p--) if (s[f] !== a[p]) {
        if (f !== 1 || p !== 1)
          do
            if (f--, p--, 0 > p || s[f] !== a[p]) {
              var g = `
` + s[f].replace(" at new ", " at ");
              return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), g;
            }
          while (1 <= f && 0 <= p);
        break;
      }
    }
  } finally {
    xa = !1, Error.prepareStackTrace = r;
  }
  return (e = e ? e.displayName || e.name : "") ? yo(e) : "";
}
function kx(e) {
  switch (e.tag) {
    case 5:
      return yo(e.type);
    case 16:
      return yo("Lazy");
    case 13:
      return yo("Suspense");
    case 19:
      return yo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = ka(e.type, !1), e;
    case 11:
      return e = ka(e.type.render, !1), e;
    case 1:
      return e = ka(e.type, !0), e;
    default:
      return "";
  }
}
function du(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yi:
      return "Fragment";
    case gi:
      return "Portal";
    case uu:
      return "Profiler";
    case hc:
      return "StrictMode";
    case cu:
      return "Suspense";
    case fu:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ih:
      return (e.displayName || "Context") + ".Consumer";
    case Oh:
      return (e._context.displayName || "Context") + ".Provider";
    case vc:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case mc:
      return t = e.displayName || null, t !== null ? t : du(e.type) || "Memo";
    case hn:
      t = e._payload, e = e._init;
      try {
        return du(e(t));
      } catch {
      }
  }
  return null;
}
function Sx(e) {
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
      return du(t);
    case 8:
      return t === hc ? "StrictMode" : "Mode";
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
function Tn(e) {
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
function Nh(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ex(e) {
  var t = Nh(e) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), o = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
    var s = r.get, a = r.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return s.call(this);
    }, set: function(f) {
      o = "" + f, a.call(this, f);
    } }), Object.defineProperty(e, t, { enumerable: r.enumerable }), { getValue: function() {
      return o;
    }, setValue: function(f) {
      o = "" + f;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function El(e) {
  e._valueTracker || (e._valueTracker = Ex(e));
}
function zh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(), o = "";
  return e && (o = Nh(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== r ? (t.setValue(e), !0) : !1;
}
function ss(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function pu(e, t) {
  var r = t.checked;
  return it({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r ?? e._wrapperState.initialChecked });
}
function qf(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue, o = t.checked != null ? t.checked : t.defaultChecked;
  r = Tn(t.value != null ? t.value : r), e._wrapperState = { initialChecked: o, initialValue: r, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Bh(e, t) {
  t = t.checked, t != null && pc(e, "checked", t, !1);
}
function hu(e, t) {
  Bh(e, t);
  var r = Tn(t.value), o = t.type;
  if (r != null) o === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
  else if (o === "submit" || o === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? vu(e, t.type, r) : t.hasOwnProperty("defaultValue") && vu(e, t.type, Tn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Jf(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var o = t.type;
    if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t;
  }
  r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r);
}
function vu(e, t, r) {
  (t !== "number" || ss(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var wo = Array.isArray;
function Ti(e, t, r, o) {
  if (e = e.options, t) {
    t = {};
    for (var s = 0; s < r.length; s++) t["$" + r[s]] = !0;
    for (r = 0; r < e.length; r++) s = t.hasOwnProperty("$" + e[r].value), e[r].selected !== s && (e[r].selected = s), s && o && (e[r].defaultSelected = !0);
  } else {
    for (r = "" + Tn(r), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === r) {
        e[s].selected = !0, o && (e[s].defaultSelected = !0);
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function mu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(ne(91));
  return it({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ed(e, t) {
  var r = t.value;
  if (r == null) {
    if (r = t.children, t = t.defaultValue, r != null) {
      if (t != null) throw Error(ne(92));
      if (wo(r)) {
        if (1 < r.length) throw Error(ne(93));
        r = r[0];
      }
      t = r;
    }
    t == null && (t = ""), r = t;
  }
  e._wrapperState = { initialValue: Tn(r) };
}
function Uh(e, t) {
  var r = Tn(t.value), o = Tn(t.defaultValue);
  r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), o != null && (e.defaultValue = "" + o);
}
function td(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Vh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function gu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Vh(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var bl, Wh = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, o, s) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, r, o, s);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (bl = bl || document.createElement("div"), bl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = bl.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ao(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ko = {
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
}, bx = ["Webkit", "ms", "Moz", "O"];
Object.keys(ko).forEach(function(e) {
  bx.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), ko[t] = ko[e];
  });
});
function Hh(e, t, r) {
  return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || ko.hasOwnProperty(e) && ko[e] ? ("" + t).trim() : t + "px";
}
function Gh(e, t) {
  e = e.style;
  for (var r in t) if (t.hasOwnProperty(r)) {
    var o = r.indexOf("--") === 0, s = Hh(r, t[r], o);
    r === "float" && (r = "cssFloat"), o ? e.setProperty(r, s) : e[r] = s;
  }
}
var Cx = it({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function yu(e, t) {
  if (t) {
    if (Cx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(ne(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(ne(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(ne(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(ne(62));
  }
}
function wu(e, t) {
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
var _u = null;
function gc(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var xu = null, Li = null, Di = null;
function rd(e) {
  if (e = el(e)) {
    if (typeof xu != "function") throw Error(ne(280));
    var t = e.stateNode;
    t && (t = zs(t), xu(e.stateNode, e.type, t));
  }
}
function Xh(e) {
  Li ? Di ? Di.push(e) : Di = [e] : Li = e;
}
function Yh() {
  if (Li) {
    var e = Li, t = Di;
    if (Di = Li = null, rd(e), t) for (e = 0; e < t.length; e++) rd(t[e]);
  }
}
function Kh(e, t) {
  return e(t);
}
function Qh() {
}
var Sa = !1;
function Zh(e, t, r) {
  if (Sa) return e(t, r);
  Sa = !0;
  try {
    return Kh(e, t, r);
  } finally {
    Sa = !1, (Li !== null || Di !== null) && (Qh(), Yh());
  }
}
function $o(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var o = zs(r);
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
  if (r && typeof r != "function") throw Error(ne(231, t, typeof r));
  return r;
}
var ku = !1;
if (Jr) try {
  var uo = {};
  Object.defineProperty(uo, "passive", { get: function() {
    ku = !0;
  } }), window.addEventListener("test", uo, uo), window.removeEventListener("test", uo, uo);
} catch {
  ku = !1;
}
function Px(e, t, r, o, s, a, f, p, g) {
  var y = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, y);
  } catch (w) {
    this.onError(w);
  }
}
var So = !1, as = null, us = !1, Su = null, Rx = { onError: function(e) {
  So = !0, as = e;
} };
function Tx(e, t, r, o, s, a, f, p, g) {
  So = !1, as = null, Px.apply(Rx, arguments);
}
function Lx(e, t, r, o, s, a, f, p, g) {
  if (Tx.apply(this, arguments), So) {
    if (So) {
      var y = as;
      So = !1, as = null;
    } else throw Error(ne(198));
    us || (us = !0, Su = y);
  }
}
function ti(e) {
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
function qh(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function nd(e) {
  if (ti(e) !== e) throw Error(ne(188));
}
function Dx(e) {
  var t = e.alternate;
  if (!t) {
    if (t = ti(e), t === null) throw Error(ne(188));
    return t !== e ? null : e;
  }
  for (var r = e, o = t; ; ) {
    var s = r.return;
    if (s === null) break;
    var a = s.alternate;
    if (a === null) {
      if (o = s.return, o !== null) {
        r = o;
        continue;
      }
      break;
    }
    if (s.child === a.child) {
      for (a = s.child; a; ) {
        if (a === r) return nd(s), e;
        if (a === o) return nd(s), t;
        a = a.sibling;
      }
      throw Error(ne(188));
    }
    if (r.return !== o.return) r = s, o = a;
    else {
      for (var f = !1, p = s.child; p; ) {
        if (p === r) {
          f = !0, r = s, o = a;
          break;
        }
        if (p === o) {
          f = !0, o = s, r = a;
          break;
        }
        p = p.sibling;
      }
      if (!f) {
        for (p = a.child; p; ) {
          if (p === r) {
            f = !0, r = a, o = s;
            break;
          }
          if (p === o) {
            f = !0, o = a, r = s;
            break;
          }
          p = p.sibling;
        }
        if (!f) throw Error(ne(189));
      }
    }
    if (r.alternate !== o) throw Error(ne(190));
  }
  if (r.tag !== 3) throw Error(ne(188));
  return r.stateNode.current === r ? e : t;
}
function Jh(e) {
  return e = Dx(e), e !== null ? ev(e) : null;
}
function ev(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ev(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var tv = Jt.unstable_scheduleCallback, id = Jt.unstable_cancelCallback, Fx = Jt.unstable_shouldYield, Ax = Jt.unstable_requestPaint, st = Jt.unstable_now, $x = Jt.unstable_getCurrentPriorityLevel, yc = Jt.unstable_ImmediatePriority, rv = Jt.unstable_UserBlockingPriority, cs = Jt.unstable_NormalPriority, Mx = Jt.unstable_LowPriority, nv = Jt.unstable_IdlePriority, Os = null, Ir = null;
function Ox(e) {
  if (Ir && typeof Ir.onCommitFiberRoot == "function") try {
    Ir.onCommitFiberRoot(Os, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Cr = Math.clz32 ? Math.clz32 : Nx, Ix = Math.log, jx = Math.LN2;
function Nx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ix(e) / jx | 0) | 0;
}
var Cl = 64, Pl = 4194304;
function _o(e) {
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
function fs(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var o = 0, s = e.suspendedLanes, a = e.pingedLanes, f = r & 268435455;
  if (f !== 0) {
    var p = f & ~s;
    p !== 0 ? o = _o(p) : (a &= f, a !== 0 && (o = _o(a)));
  } else f = r & ~s, f !== 0 ? o = _o(f) : a !== 0 && (o = _o(a));
  if (o === 0) return 0;
  if (t !== 0 && t !== o && !(t & s) && (s = o & -o, a = t & -t, s >= a || s === 16 && (a & 4194240) !== 0)) return t;
  if (o & 4 && (o |= r & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= o; 0 < t; ) r = 31 - Cr(t), s = 1 << r, o |= e[r], t &= ~s;
  return o;
}
function zx(e, t) {
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
function Bx(e, t) {
  for (var r = e.suspendedLanes, o = e.pingedLanes, s = e.expirationTimes, a = e.pendingLanes; 0 < a; ) {
    var f = 31 - Cr(a), p = 1 << f, g = s[f];
    g === -1 ? (!(p & r) || p & o) && (s[f] = zx(p, t)) : g <= t && (e.expiredLanes |= p), a &= ~p;
  }
}
function Eu(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function iv() {
  var e = Cl;
  return Cl <<= 1, !(Cl & 4194240) && (Cl = 64), e;
}
function Ea(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function qo(e, t, r) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Cr(t), e[t] = r;
}
function Ux(e, t) {
  var r = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var o = e.eventTimes;
  for (e = e.expirationTimes; 0 < r; ) {
    var s = 31 - Cr(r), a = 1 << s;
    t[s] = 0, o[s] = -1, e[s] = -1, r &= ~a;
  }
}
function wc(e, t) {
  var r = e.entangledLanes |= t;
  for (e = e.entanglements; r; ) {
    var o = 31 - Cr(r), s = 1 << o;
    s & t | e[o] & t && (e[o] |= t), r &= ~s;
  }
}
var ze = 0;
function ov(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var lv, _c, sv, av, uv, bu = !1, Rl = [], xn = null, kn = null, Sn = null, Mo = /* @__PURE__ */ new Map(), Oo = /* @__PURE__ */ new Map(), mn = [], Vx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function od(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      xn = null;
      break;
    case "dragenter":
    case "dragleave":
      kn = null;
      break;
    case "mouseover":
    case "mouseout":
      Sn = null;
      break;
    case "pointerover":
    case "pointerout":
      Mo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Oo.delete(t.pointerId);
  }
}
function co(e, t, r, o, s, a) {
  return e === null || e.nativeEvent !== a ? (e = { blockedOn: t, domEventName: r, eventSystemFlags: o, nativeEvent: a, targetContainers: [s] }, t !== null && (t = el(t), t !== null && _c(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
}
function Wx(e, t, r, o, s) {
  switch (t) {
    case "focusin":
      return xn = co(xn, e, t, r, o, s), !0;
    case "dragenter":
      return kn = co(kn, e, t, r, o, s), !0;
    case "mouseover":
      return Sn = co(Sn, e, t, r, o, s), !0;
    case "pointerover":
      var a = s.pointerId;
      return Mo.set(a, co(Mo.get(a) || null, e, t, r, o, s)), !0;
    case "gotpointercapture":
      return a = s.pointerId, Oo.set(a, co(Oo.get(a) || null, e, t, r, o, s)), !0;
  }
  return !1;
}
function cv(e) {
  var t = Vn(e.target);
  if (t !== null) {
    var r = ti(t);
    if (r !== null) {
      if (t = r.tag, t === 13) {
        if (t = qh(r), t !== null) {
          e.blockedOn = t, uv(e.priority, function() {
            sv(r);
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
function Yl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var r = Cu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var o = new r.constructor(r.type, r);
      _u = o, r.target.dispatchEvent(o), _u = null;
    } else return t = el(r), t !== null && _c(t), e.blockedOn = r, !1;
    t.shift();
  }
  return !0;
}
function ld(e, t, r) {
  Yl(e) && r.delete(t);
}
function Hx() {
  bu = !1, xn !== null && Yl(xn) && (xn = null), kn !== null && Yl(kn) && (kn = null), Sn !== null && Yl(Sn) && (Sn = null), Mo.forEach(ld), Oo.forEach(ld);
}
function fo(e, t) {
  e.blockedOn === t && (e.blockedOn = null, bu || (bu = !0, Jt.unstable_scheduleCallback(Jt.unstable_NormalPriority, Hx)));
}
function Io(e) {
  function t(s) {
    return fo(s, e);
  }
  if (0 < Rl.length) {
    fo(Rl[0], e);
    for (var r = 1; r < Rl.length; r++) {
      var o = Rl[r];
      o.blockedOn === e && (o.blockedOn = null);
    }
  }
  for (xn !== null && fo(xn, e), kn !== null && fo(kn, e), Sn !== null && fo(Sn, e), Mo.forEach(t), Oo.forEach(t), r = 0; r < mn.length; r++) o = mn[r], o.blockedOn === e && (o.blockedOn = null);
  for (; 0 < mn.length && (r = mn[0], r.blockedOn === null); ) cv(r), r.blockedOn === null && mn.shift();
}
var Fi = nn.ReactCurrentBatchConfig, ds = !0;
function Gx(e, t, r, o) {
  var s = ze, a = Fi.transition;
  Fi.transition = null;
  try {
    ze = 1, xc(e, t, r, o);
  } finally {
    ze = s, Fi.transition = a;
  }
}
function Xx(e, t, r, o) {
  var s = ze, a = Fi.transition;
  Fi.transition = null;
  try {
    ze = 4, xc(e, t, r, o);
  } finally {
    ze = s, Fi.transition = a;
  }
}
function xc(e, t, r, o) {
  if (ds) {
    var s = Cu(e, t, r, o);
    if (s === null) $a(e, t, o, ps, r), od(e, o);
    else if (Wx(s, e, t, r, o)) o.stopPropagation();
    else if (od(e, o), t & 4 && -1 < Vx.indexOf(e)) {
      for (; s !== null; ) {
        var a = el(s);
        if (a !== null && lv(a), a = Cu(e, t, r, o), a === null && $a(e, t, o, ps, r), a === s) break;
        s = a;
      }
      s !== null && o.stopPropagation();
    } else $a(e, t, o, null, r);
  }
}
var ps = null;
function Cu(e, t, r, o) {
  if (ps = null, e = gc(o), e = Vn(e), e !== null) if (t = ti(e), t === null) e = null;
  else if (r = t.tag, r === 13) {
    if (e = qh(t), e !== null) return e;
    e = null;
  } else if (r === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ps = e, null;
}
function fv(e) {
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
      switch ($x()) {
        case yc:
          return 1;
        case rv:
          return 4;
        case cs:
        case Mx:
          return 16;
        case nv:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var wn = null, kc = null, Kl = null;
function dv() {
  if (Kl) return Kl;
  var e, t = kc, r = t.length, o, s = "value" in wn ? wn.value : wn.textContent, a = s.length;
  for (e = 0; e < r && t[e] === s[e]; e++) ;
  var f = r - e;
  for (o = 1; o <= f && t[r - o] === s[a - o]; o++) ;
  return Kl = s.slice(e, 1 < o ? 1 - o : void 0);
}
function Ql(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Tl() {
  return !0;
}
function sd() {
  return !1;
}
function tr(e) {
  function t(r, o, s, a, f) {
    this._reactName = r, this._targetInst = s, this.type = o, this.nativeEvent = a, this.target = f, this.currentTarget = null;
    for (var p in e) e.hasOwnProperty(p) && (r = e[p], this[p] = r ? r(a) : a[p]);
    return this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? Tl : sd, this.isPropagationStopped = sd, this;
  }
  return it(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var r = this.nativeEvent;
    r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Tl);
  }, stopPropagation: function() {
    var r = this.nativeEvent;
    r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Tl);
  }, persist: function() {
  }, isPersistent: Tl }), t;
}
var Wi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Sc = tr(Wi), Jo = it({}, Wi, { view: 0, detail: 0 }), Yx = tr(Jo), ba, Ca, po, Is = it({}, Jo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ec, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== po && (po && e.type === "mousemove" ? (ba = e.screenX - po.screenX, Ca = e.screenY - po.screenY) : Ca = ba = 0, po = e), ba);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ca;
} }), ad = tr(Is), Kx = it({}, Is, { dataTransfer: 0 }), Qx = tr(Kx), Zx = it({}, Jo, { relatedTarget: 0 }), Pa = tr(Zx), qx = it({}, Wi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jx = tr(qx), ek = it({}, Wi, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), tk = tr(ek), rk = it({}, Wi, { data: 0 }), ud = tr(rk), nk = {
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
}, ik = {
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
}, ok = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function lk(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ok[e]) ? !!t[e] : !1;
}
function Ec() {
  return lk;
}
var sk = it({}, Jo, { key: function(e) {
  if (e.key) {
    var t = nk[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ql(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ik[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ec, charCode: function(e) {
  return e.type === "keypress" ? Ql(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ql(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ak = tr(sk), uk = it({}, Is, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), cd = tr(uk), ck = it({}, Jo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ec }), fk = tr(ck), dk = it({}, Wi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), pk = tr(dk), hk = it({}, Is, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), vk = tr(hk), mk = [9, 13, 27, 32], bc = Jr && "CompositionEvent" in window, Eo = null;
Jr && "documentMode" in document && (Eo = document.documentMode);
var gk = Jr && "TextEvent" in window && !Eo, pv = Jr && (!bc || Eo && 8 < Eo && 11 >= Eo), fd = " ", dd = !1;
function hv(e, t) {
  switch (e) {
    case "keyup":
      return mk.indexOf(t.keyCode) !== -1;
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
function vv(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var wi = !1;
function yk(e, t) {
  switch (e) {
    case "compositionend":
      return vv(t);
    case "keypress":
      return t.which !== 32 ? null : (dd = !0, fd);
    case "textInput":
      return e = t.data, e === fd && dd ? null : e;
    default:
      return null;
  }
}
function wk(e, t) {
  if (wi) return e === "compositionend" || !bc && hv(e, t) ? (e = dv(), Kl = kc = wn = null, wi = !1, e) : null;
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
      return pv && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var _k = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function pd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!_k[e.type] : t === "textarea";
}
function mv(e, t, r, o) {
  Xh(o), t = hs(t, "onChange"), 0 < t.length && (r = new Sc("onChange", "change", null, r, o), e.push({ event: r, listeners: t }));
}
var bo = null, jo = null;
function xk(e) {
  Pv(e, 0);
}
function js(e) {
  var t = ki(e);
  if (zh(t)) return e;
}
function kk(e, t) {
  if (e === "change") return t;
}
var gv = !1;
if (Jr) {
  var Ra;
  if (Jr) {
    var Ta = "oninput" in document;
    if (!Ta) {
      var hd = document.createElement("div");
      hd.setAttribute("oninput", "return;"), Ta = typeof hd.oninput == "function";
    }
    Ra = Ta;
  } else Ra = !1;
  gv = Ra && (!document.documentMode || 9 < document.documentMode);
}
function vd() {
  bo && (bo.detachEvent("onpropertychange", yv), jo = bo = null);
}
function yv(e) {
  if (e.propertyName === "value" && js(jo)) {
    var t = [];
    mv(t, jo, e, gc(e)), Zh(xk, t);
  }
}
function Sk(e, t, r) {
  e === "focusin" ? (vd(), bo = t, jo = r, bo.attachEvent("onpropertychange", yv)) : e === "focusout" && vd();
}
function Ek(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return js(jo);
}
function bk(e, t) {
  if (e === "click") return js(t);
}
function Ck(e, t) {
  if (e === "input" || e === "change") return js(t);
}
function Pk(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Rr = typeof Object.is == "function" ? Object.is : Pk;
function No(e, t) {
  if (Rr(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length) return !1;
  for (o = 0; o < r.length; o++) {
    var s = r[o];
    if (!au.call(t, s) || !Rr(e[s], t[s])) return !1;
  }
  return !0;
}
function md(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function gd(e, t) {
  var r = md(e);
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
    r = md(r);
  }
}
function wv(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? wv(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function _v() {
  for (var e = window, t = ss(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = ss(e.document);
  }
  return t;
}
function Cc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Rk(e) {
  var t = _v(), r = e.focusedElem, o = e.selectionRange;
  if (t !== r && r && r.ownerDocument && wv(r.ownerDocument.documentElement, r)) {
    if (o !== null && Cc(r)) {
      if (t = o.start, e = o.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
      else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var s = r.textContent.length, a = Math.min(o.start, s);
        o = o.end === void 0 ? a : Math.min(o.end, s), !e.extend && a > o && (s = o, o = a, a = s), s = gd(r, a);
        var f = gd(
          r,
          o
        );
        s && f && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== f.node || e.focusOffset !== f.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), a > o ? (e.addRange(t), e.extend(f.node, f.offset)) : (t.setEnd(f.node, f.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Tk = Jr && "documentMode" in document && 11 >= document.documentMode, _i = null, Pu = null, Co = null, Ru = !1;
function yd(e, t, r) {
  var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  Ru || _i == null || _i !== ss(o) || (o = _i, "selectionStart" in o && Cc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), Co && No(Co, o) || (Co = o, o = hs(Pu, "onSelect"), 0 < o.length && (t = new Sc("onSelect", "select", null, t, r), e.push({ event: t, listeners: o }), t.target = _i)));
}
function Ll(e, t) {
  var r = {};
  return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
}
var xi = { animationend: Ll("Animation", "AnimationEnd"), animationiteration: Ll("Animation", "AnimationIteration"), animationstart: Ll("Animation", "AnimationStart"), transitionend: Ll("Transition", "TransitionEnd") }, La = {}, xv = {};
Jr && (xv = document.createElement("div").style, "AnimationEvent" in window || (delete xi.animationend.animation, delete xi.animationiteration.animation, delete xi.animationstart.animation), "TransitionEvent" in window || delete xi.transitionend.transition);
function Ns(e) {
  if (La[e]) return La[e];
  if (!xi[e]) return e;
  var t = xi[e], r;
  for (r in t) if (t.hasOwnProperty(r) && r in xv) return La[e] = t[r];
  return e;
}
var kv = Ns("animationend"), Sv = Ns("animationiteration"), Ev = Ns("animationstart"), bv = Ns("transitionend"), Cv = /* @__PURE__ */ new Map(), wd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Fn(e, t) {
  Cv.set(e, t), ei(t, [e]);
}
for (var Da = 0; Da < wd.length; Da++) {
  var Fa = wd[Da], Lk = Fa.toLowerCase(), Dk = Fa[0].toUpperCase() + Fa.slice(1);
  Fn(Lk, "on" + Dk);
}
Fn(kv, "onAnimationEnd");
Fn(Sv, "onAnimationIteration");
Fn(Ev, "onAnimationStart");
Fn("dblclick", "onDoubleClick");
Fn("focusin", "onFocus");
Fn("focusout", "onBlur");
Fn(bv, "onTransitionEnd");
Oi("onMouseEnter", ["mouseout", "mouseover"]);
Oi("onMouseLeave", ["mouseout", "mouseover"]);
Oi("onPointerEnter", ["pointerout", "pointerover"]);
Oi("onPointerLeave", ["pointerout", "pointerover"]);
ei("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ei("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ei("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ei("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ei("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ei("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var xo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Fk = new Set("cancel close invalid load scroll toggle".split(" ").concat(xo));
function _d(e, t, r) {
  var o = e.type || "unknown-event";
  e.currentTarget = r, Lx(o, t, void 0, e), e.currentTarget = null;
}
function Pv(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var o = e[r], s = o.event;
    o = o.listeners;
    e: {
      var a = void 0;
      if (t) for (var f = o.length - 1; 0 <= f; f--) {
        var p = o[f], g = p.instance, y = p.currentTarget;
        if (p = p.listener, g !== a && s.isPropagationStopped()) break e;
        _d(s, p, y), a = g;
      }
      else for (f = 0; f < o.length; f++) {
        if (p = o[f], g = p.instance, y = p.currentTarget, p = p.listener, g !== a && s.isPropagationStopped()) break e;
        _d(s, p, y), a = g;
      }
    }
  }
  if (us) throw e = Su, us = !1, Su = null, e;
}
function Qe(e, t) {
  var r = t[Au];
  r === void 0 && (r = t[Au] = /* @__PURE__ */ new Set());
  var o = e + "__bubble";
  r.has(o) || (Rv(t, e, 2, !1), r.add(o));
}
function Aa(e, t, r) {
  var o = 0;
  t && (o |= 4), Rv(r, e, o, t);
}
var Dl = "_reactListening" + Math.random().toString(36).slice(2);
function zo(e) {
  if (!e[Dl]) {
    e[Dl] = !0, Mh.forEach(function(r) {
      r !== "selectionchange" && (Fk.has(r) || Aa(r, !1, e), Aa(r, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Dl] || (t[Dl] = !0, Aa("selectionchange", !1, t));
  }
}
function Rv(e, t, r, o) {
  switch (fv(t)) {
    case 1:
      var s = Gx;
      break;
    case 4:
      s = Xx;
      break;
    default:
      s = xc;
  }
  r = s.bind(null, t, r, e), s = void 0, !ku || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), o ? s !== void 0 ? e.addEventListener(t, r, { capture: !0, passive: s }) : e.addEventListener(t, r, !0) : s !== void 0 ? e.addEventListener(t, r, { passive: s }) : e.addEventListener(t, r, !1);
}
function $a(e, t, r, o, s) {
  var a = o;
  if (!(t & 1) && !(t & 2) && o !== null) e: for (; ; ) {
    if (o === null) return;
    var f = o.tag;
    if (f === 3 || f === 4) {
      var p = o.stateNode.containerInfo;
      if (p === s || p.nodeType === 8 && p.parentNode === s) break;
      if (f === 4) for (f = o.return; f !== null; ) {
        var g = f.tag;
        if ((g === 3 || g === 4) && (g = f.stateNode.containerInfo, g === s || g.nodeType === 8 && g.parentNode === s)) return;
        f = f.return;
      }
      for (; p !== null; ) {
        if (f = Vn(p), f === null) return;
        if (g = f.tag, g === 5 || g === 6) {
          o = a = f;
          continue e;
        }
        p = p.parentNode;
      }
    }
    o = o.return;
  }
  Zh(function() {
    var y = a, w = gc(r), D = [];
    e: {
      var C = Cv.get(e);
      if (C !== void 0) {
        var b = Sc, j = e;
        switch (e) {
          case "keypress":
            if (Ql(r) === 0) break e;
          case "keydown":
          case "keyup":
            b = ak;
            break;
          case "focusin":
            j = "focus", b = Pa;
            break;
          case "focusout":
            j = "blur", b = Pa;
            break;
          case "beforeblur":
          case "afterblur":
            b = Pa;
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
            b = ad;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            b = Qx;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            b = fk;
            break;
          case kv:
          case Sv:
          case Ev:
            b = Jx;
            break;
          case bv:
            b = pk;
            break;
          case "scroll":
            b = Yx;
            break;
          case "wheel":
            b = vk;
            break;
          case "copy":
          case "cut":
          case "paste":
            b = tk;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            b = cd;
        }
        var z = (t & 4) !== 0, Q = !z && e === "scroll", x = z ? C !== null ? C + "Capture" : null : C;
        z = [];
        for (var k = y, E; k !== null; ) {
          E = k;
          var P = E.stateNode;
          if (E.tag === 5 && P !== null && (E = P, x !== null && (P = $o(k, x), P != null && z.push(Bo(k, P, E)))), Q) break;
          k = k.return;
        }
        0 < z.length && (C = new b(C, j, null, r, w), D.push({ event: C, listeners: z }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (C = e === "mouseover" || e === "pointerover", b = e === "mouseout" || e === "pointerout", C && r !== _u && (j = r.relatedTarget || r.fromElement) && (Vn(j) || j[en])) break e;
        if ((b || C) && (C = w.window === w ? w : (C = w.ownerDocument) ? C.defaultView || C.parentWindow : window, b ? (j = r.relatedTarget || r.toElement, b = y, j = j ? Vn(j) : null, j !== null && (Q = ti(j), j !== Q || j.tag !== 5 && j.tag !== 6) && (j = null)) : (b = null, j = y), b !== j)) {
          if (z = ad, P = "onMouseLeave", x = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (z = cd, P = "onPointerLeave", x = "onPointerEnter", k = "pointer"), Q = b == null ? C : ki(b), E = j == null ? C : ki(j), C = new z(P, k + "leave", b, r, w), C.target = Q, C.relatedTarget = E, P = null, Vn(w) === y && (z = new z(x, k + "enter", j, r, w), z.target = E, z.relatedTarget = Q, P = z), Q = P, b && j) t: {
            for (z = b, x = j, k = 0, E = z; E; E = hi(E)) k++;
            for (E = 0, P = x; P; P = hi(P)) E++;
            for (; 0 < k - E; ) z = hi(z), k--;
            for (; 0 < E - k; ) x = hi(x), E--;
            for (; k--; ) {
              if (z === x || x !== null && z === x.alternate) break t;
              z = hi(z), x = hi(x);
            }
            z = null;
          }
          else z = null;
          b !== null && xd(D, C, b, z, !1), j !== null && Q !== null && xd(D, Q, j, z, !0);
        }
      }
      e: {
        if (C = y ? ki(y) : window, b = C.nodeName && C.nodeName.toLowerCase(), b === "select" || b === "input" && C.type === "file") var B = kk;
        else if (pd(C)) if (gv) B = Ck;
        else {
          B = Ek;
          var U = Sk;
        }
        else (b = C.nodeName) && b.toLowerCase() === "input" && (C.type === "checkbox" || C.type === "radio") && (B = bk);
        if (B && (B = B(e, y))) {
          mv(D, B, r, w);
          break e;
        }
        U && U(e, C, y), e === "focusout" && (U = C._wrapperState) && U.controlled && C.type === "number" && vu(C, "number", C.value);
      }
      switch (U = y ? ki(y) : window, e) {
        case "focusin":
          (pd(U) || U.contentEditable === "true") && (_i = U, Pu = y, Co = null);
          break;
        case "focusout":
          Co = Pu = _i = null;
          break;
        case "mousedown":
          Ru = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ru = !1, yd(D, r, w);
          break;
        case "selectionchange":
          if (Tk) break;
        case "keydown":
        case "keyup":
          yd(D, r, w);
      }
      var A;
      if (bc) e: {
        switch (e) {
          case "compositionstart":
            var I = "onCompositionStart";
            break e;
          case "compositionend":
            I = "onCompositionEnd";
            break e;
          case "compositionupdate":
            I = "onCompositionUpdate";
            break e;
        }
        I = void 0;
      }
      else wi ? hv(e, r) && (I = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (I = "onCompositionStart");
      I && (pv && r.locale !== "ko" && (wi || I !== "onCompositionStart" ? I === "onCompositionEnd" && wi && (A = dv()) : (wn = w, kc = "value" in wn ? wn.value : wn.textContent, wi = !0)), U = hs(y, I), 0 < U.length && (I = new ud(I, e, null, r, w), D.push({ event: I, listeners: U }), A ? I.data = A : (A = vv(r), A !== null && (I.data = A)))), (A = gk ? yk(e, r) : wk(e, r)) && (y = hs(y, "onBeforeInput"), 0 < y.length && (w = new ud("onBeforeInput", "beforeinput", null, r, w), D.push({ event: w, listeners: y }), w.data = A));
    }
    Pv(D, t);
  });
}
function Bo(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function hs(e, t) {
  for (var r = t + "Capture", o = []; e !== null; ) {
    var s = e, a = s.stateNode;
    s.tag === 5 && a !== null && (s = a, a = $o(e, r), a != null && o.unshift(Bo(e, a, s)), a = $o(e, t), a != null && o.push(Bo(e, a, s))), e = e.return;
  }
  return o;
}
function hi(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function xd(e, t, r, o, s) {
  for (var a = t._reactName, f = []; r !== null && r !== o; ) {
    var p = r, g = p.alternate, y = p.stateNode;
    if (g !== null && g === o) break;
    p.tag === 5 && y !== null && (p = y, s ? (g = $o(r, a), g != null && f.unshift(Bo(r, g, p))) : s || (g = $o(r, a), g != null && f.push(Bo(r, g, p)))), r = r.return;
  }
  f.length !== 0 && e.push({ event: t, listeners: f });
}
var Ak = /\r\n?/g, $k = /\u0000|\uFFFD/g;
function kd(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ak, `
`).replace($k, "");
}
function Fl(e, t, r) {
  if (t = kd(t), kd(e) !== t && r) throw Error(ne(425));
}
function vs() {
}
var Tu = null, Lu = null;
function Du(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Fu = typeof setTimeout == "function" ? setTimeout : void 0, Mk = typeof clearTimeout == "function" ? clearTimeout : void 0, Sd = typeof Promise == "function" ? Promise : void 0, Ok = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sd < "u" ? function(e) {
  return Sd.resolve(null).then(e).catch(Ik);
} : Fu;
function Ik(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ma(e, t) {
  var r = t, o = 0;
  do {
    var s = r.nextSibling;
    if (e.removeChild(r), s && s.nodeType === 8) if (r = s.data, r === "/$") {
      if (o === 0) {
        e.removeChild(s), Io(t);
        return;
      }
      o--;
    } else r !== "$" && r !== "$?" && r !== "$!" || o++;
    r = s;
  } while (r);
  Io(t);
}
function En(e) {
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
function Ed(e) {
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
var Hi = Math.random().toString(36).slice(2), Or = "__reactFiber$" + Hi, Uo = "__reactProps$" + Hi, en = "__reactContainer$" + Hi, Au = "__reactEvents$" + Hi, jk = "__reactListeners$" + Hi, Nk = "__reactHandles$" + Hi;
function Vn(e) {
  var t = e[Or];
  if (t) return t;
  for (var r = e.parentNode; r; ) {
    if (t = r[en] || r[Or]) {
      if (r = t.alternate, t.child !== null || r !== null && r.child !== null) for (e = Ed(e); e !== null; ) {
        if (r = e[Or]) return r;
        e = Ed(e);
      }
      return t;
    }
    e = r, r = e.parentNode;
  }
  return null;
}
function el(e) {
  return e = e[Or] || e[en], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ki(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(ne(33));
}
function zs(e) {
  return e[Uo] || null;
}
var $u = [], Si = -1;
function An(e) {
  return { current: e };
}
function Ze(e) {
  0 > Si || (e.current = $u[Si], $u[Si] = null, Si--);
}
function Ke(e, t) {
  Si++, $u[Si] = e.current, e.current = t;
}
var Ln = {}, Ct = An(Ln), zt = An(!1), Yn = Ln;
function Ii(e, t) {
  var r = e.type.contextTypes;
  if (!r) return Ln;
  var o = e.stateNode;
  if (o && o.__reactInternalMemoizedUnmaskedChildContext === t) return o.__reactInternalMemoizedMaskedChildContext;
  var s = {}, a;
  for (a in r) s[a] = t[a];
  return o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
}
function Bt(e) {
  return e = e.childContextTypes, e != null;
}
function ms() {
  Ze(zt), Ze(Ct);
}
function bd(e, t, r) {
  if (Ct.current !== Ln) throw Error(ne(168));
  Ke(Ct, t), Ke(zt, r);
}
function Tv(e, t, r) {
  var o = e.stateNode;
  if (t = t.childContextTypes, typeof o.getChildContext != "function") return r;
  o = o.getChildContext();
  for (var s in o) if (!(s in t)) throw Error(ne(108, Sx(e) || "Unknown", s));
  return it({}, r, o);
}
function gs(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ln, Yn = Ct.current, Ke(Ct, e), Ke(zt, zt.current), !0;
}
function Cd(e, t, r) {
  var o = e.stateNode;
  if (!o) throw Error(ne(169));
  r ? (e = Tv(e, t, Yn), o.__reactInternalMemoizedMergedChildContext = e, Ze(zt), Ze(Ct), Ke(Ct, e)) : Ze(zt), Ke(zt, r);
}
var Kr = null, Bs = !1, Oa = !1;
function Lv(e) {
  Kr === null ? Kr = [e] : Kr.push(e);
}
function zk(e) {
  Bs = !0, Lv(e);
}
function $n() {
  if (!Oa && Kr !== null) {
    Oa = !0;
    var e = 0, t = ze;
    try {
      var r = Kr;
      for (ze = 1; e < r.length; e++) {
        var o = r[e];
        do
          o = o(!0);
        while (o !== null);
      }
      Kr = null, Bs = !1;
    } catch (s) {
      throw Kr !== null && (Kr = Kr.slice(e + 1)), tv(yc, $n), s;
    } finally {
      ze = t, Oa = !1;
    }
  }
  return null;
}
var Ei = [], bi = 0, ys = null, ws = 0, ar = [], ur = 0, Kn = null, Qr = 1, Zr = "";
function Bn(e, t) {
  Ei[bi++] = ws, Ei[bi++] = ys, ys = e, ws = t;
}
function Dv(e, t, r) {
  ar[ur++] = Qr, ar[ur++] = Zr, ar[ur++] = Kn, Kn = e;
  var o = Qr;
  e = Zr;
  var s = 32 - Cr(o) - 1;
  o &= ~(1 << s), r += 1;
  var a = 32 - Cr(t) + s;
  if (30 < a) {
    var f = s - s % 5;
    a = (o & (1 << f) - 1).toString(32), o >>= f, s -= f, Qr = 1 << 32 - Cr(t) + s | r << s | o, Zr = a + e;
  } else Qr = 1 << a | r << s | o, Zr = e;
}
function Pc(e) {
  e.return !== null && (Bn(e, 1), Dv(e, 1, 0));
}
function Rc(e) {
  for (; e === ys; ) ys = Ei[--bi], Ei[bi] = null, ws = Ei[--bi], Ei[bi] = null;
  for (; e === Kn; ) Kn = ar[--ur], ar[ur] = null, Zr = ar[--ur], ar[ur] = null, Qr = ar[--ur], ar[ur] = null;
}
var qt = null, Zt = null, tt = !1, br = null;
function Fv(e, t) {
  var r = cr(5, null, null, 0);
  r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r);
}
function Pd(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, qt = e, Zt = En(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, qt = e, Zt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (r = Kn !== null ? { id: Qr, overflow: Zr } : null, e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }, r = cr(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, qt = e, Zt = null, !0) : !1;
    default:
      return !1;
  }
}
function Mu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ou(e) {
  if (tt) {
    var t = Zt;
    if (t) {
      var r = t;
      if (!Pd(e, t)) {
        if (Mu(e)) throw Error(ne(418));
        t = En(r.nextSibling);
        var o = qt;
        t && Pd(e, t) ? Fv(o, r) : (e.flags = e.flags & -4097 | 2, tt = !1, qt = e);
      }
    } else {
      if (Mu(e)) throw Error(ne(418));
      e.flags = e.flags & -4097 | 2, tt = !1, qt = e;
    }
  }
}
function Rd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  qt = e;
}
function Al(e) {
  if (e !== qt) return !1;
  if (!tt) return Rd(e), tt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Du(e.type, e.memoizedProps)), t && (t = Zt)) {
    if (Mu(e)) throw Av(), Error(ne(418));
    for (; t; ) Fv(e, t), t = En(t.nextSibling);
  }
  if (Rd(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(ne(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Zt = En(e.nextSibling);
              break e;
            }
            t--;
          } else r !== "$" && r !== "$!" && r !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Zt = null;
    }
  } else Zt = qt ? En(e.stateNode.nextSibling) : null;
  return !0;
}
function Av() {
  for (var e = Zt; e; ) e = En(e.nextSibling);
}
function ji() {
  Zt = qt = null, tt = !1;
}
function Tc(e) {
  br === null ? br = [e] : br.push(e);
}
var Bk = nn.ReactCurrentBatchConfig;
function ho(e, t, r) {
  if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (r._owner) {
      if (r = r._owner, r) {
        if (r.tag !== 1) throw Error(ne(309));
        var o = r.stateNode;
      }
      if (!o) throw Error(ne(147, e));
      var s = o, a = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === a ? t.ref : (t = function(f) {
        var p = s.refs;
        f === null ? delete p[a] : p[a] = f;
      }, t._stringRef = a, t);
    }
    if (typeof e != "string") throw Error(ne(284));
    if (!r._owner) throw Error(ne(290, e));
  }
  return e;
}
function $l(e, t) {
  throw e = Object.prototype.toString.call(t), Error(ne(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Td(e) {
  var t = e._init;
  return t(e._payload);
}
function $v(e) {
  function t(x, k) {
    if (e) {
      var E = x.deletions;
      E === null ? (x.deletions = [k], x.flags |= 16) : E.push(k);
    }
  }
  function r(x, k) {
    if (!e) return null;
    for (; k !== null; ) t(x, k), k = k.sibling;
    return null;
  }
  function o(x, k) {
    for (x = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? x.set(k.key, k) : x.set(k.index, k), k = k.sibling;
    return x;
  }
  function s(x, k) {
    return x = Rn(x, k), x.index = 0, x.sibling = null, x;
  }
  function a(x, k, E) {
    return x.index = E, e ? (E = x.alternate, E !== null ? (E = E.index, E < k ? (x.flags |= 2, k) : E) : (x.flags |= 2, k)) : (x.flags |= 1048576, k);
  }
  function f(x) {
    return e && x.alternate === null && (x.flags |= 2), x;
  }
  function p(x, k, E, P) {
    return k === null || k.tag !== 6 ? (k = Va(E, x.mode, P), k.return = x, k) : (k = s(k, E), k.return = x, k);
  }
  function g(x, k, E, P) {
    var B = E.type;
    return B === yi ? w(x, k, E.props.children, P, E.key) : k !== null && (k.elementType === B || typeof B == "object" && B !== null && B.$$typeof === hn && Td(B) === k.type) ? (P = s(k, E.props), P.ref = ho(x, k, E), P.return = x, P) : (P = ns(E.type, E.key, E.props, null, x.mode, P), P.ref = ho(x, k, E), P.return = x, P);
  }
  function y(x, k, E, P) {
    return k === null || k.tag !== 4 || k.stateNode.containerInfo !== E.containerInfo || k.stateNode.implementation !== E.implementation ? (k = Wa(E, x.mode, P), k.return = x, k) : (k = s(k, E.children || []), k.return = x, k);
  }
  function w(x, k, E, P, B) {
    return k === null || k.tag !== 7 ? (k = Xn(E, x.mode, P, B), k.return = x, k) : (k = s(k, E), k.return = x, k);
  }
  function D(x, k, E) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return k = Va("" + k, x.mode, E), k.return = x, k;
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case Sl:
          return E = ns(k.type, k.key, k.props, null, x.mode, E), E.ref = ho(x, null, k), E.return = x, E;
        case gi:
          return k = Wa(k, x.mode, E), k.return = x, k;
        case hn:
          var P = k._init;
          return D(x, P(k._payload), E);
      }
      if (wo(k) || ao(k)) return k = Xn(k, x.mode, E, null), k.return = x, k;
      $l(x, k);
    }
    return null;
  }
  function C(x, k, E, P) {
    var B = k !== null ? k.key : null;
    if (typeof E == "string" && E !== "" || typeof E == "number") return B !== null ? null : p(x, k, "" + E, P);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Sl:
          return E.key === B ? g(x, k, E, P) : null;
        case gi:
          return E.key === B ? y(x, k, E, P) : null;
        case hn:
          return B = E._init, C(
            x,
            k,
            B(E._payload),
            P
          );
      }
      if (wo(E) || ao(E)) return B !== null ? null : w(x, k, E, P, null);
      $l(x, E);
    }
    return null;
  }
  function b(x, k, E, P, B) {
    if (typeof P == "string" && P !== "" || typeof P == "number") return x = x.get(E) || null, p(k, x, "" + P, B);
    if (typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Sl:
          return x = x.get(P.key === null ? E : P.key) || null, g(k, x, P, B);
        case gi:
          return x = x.get(P.key === null ? E : P.key) || null, y(k, x, P, B);
        case hn:
          var U = P._init;
          return b(x, k, E, U(P._payload), B);
      }
      if (wo(P) || ao(P)) return x = x.get(E) || null, w(k, x, P, B, null);
      $l(k, P);
    }
    return null;
  }
  function j(x, k, E, P) {
    for (var B = null, U = null, A = k, I = k = 0, $ = null; A !== null && I < E.length; I++) {
      A.index > I ? ($ = A, A = null) : $ = A.sibling;
      var F = C(x, A, E[I], P);
      if (F === null) {
        A === null && (A = $);
        break;
      }
      e && A && F.alternate === null && t(x, A), k = a(F, k, I), U === null ? B = F : U.sibling = F, U = F, A = $;
    }
    if (I === E.length) return r(x, A), tt && Bn(x, I), B;
    if (A === null) {
      for (; I < E.length; I++) A = D(x, E[I], P), A !== null && (k = a(A, k, I), U === null ? B = A : U.sibling = A, U = A);
      return tt && Bn(x, I), B;
    }
    for (A = o(x, A); I < E.length; I++) $ = b(A, x, I, E[I], P), $ !== null && (e && $.alternate !== null && A.delete($.key === null ? I : $.key), k = a($, k, I), U === null ? B = $ : U.sibling = $, U = $);
    return e && A.forEach(function(S) {
      return t(x, S);
    }), tt && Bn(x, I), B;
  }
  function z(x, k, E, P) {
    var B = ao(E);
    if (typeof B != "function") throw Error(ne(150));
    if (E = B.call(E), E == null) throw Error(ne(151));
    for (var U = B = null, A = k, I = k = 0, $ = null, F = E.next(); A !== null && !F.done; I++, F = E.next()) {
      A.index > I ? ($ = A, A = null) : $ = A.sibling;
      var S = C(x, A, F.value, P);
      if (S === null) {
        A === null && (A = $);
        break;
      }
      e && A && S.alternate === null && t(x, A), k = a(S, k, I), U === null ? B = S : U.sibling = S, U = S, A = $;
    }
    if (F.done) return r(
      x,
      A
    ), tt && Bn(x, I), B;
    if (A === null) {
      for (; !F.done; I++, F = E.next()) F = D(x, F.value, P), F !== null && (k = a(F, k, I), U === null ? B = F : U.sibling = F, U = F);
      return tt && Bn(x, I), B;
    }
    for (A = o(x, A); !F.done; I++, F = E.next()) F = b(A, x, I, F.value, P), F !== null && (e && F.alternate !== null && A.delete(F.key === null ? I : F.key), k = a(F, k, I), U === null ? B = F : U.sibling = F, U = F);
    return e && A.forEach(function(Z) {
      return t(x, Z);
    }), tt && Bn(x, I), B;
  }
  function Q(x, k, E, P) {
    if (typeof E == "object" && E !== null && E.type === yi && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Sl:
          e: {
            for (var B = E.key, U = k; U !== null; ) {
              if (U.key === B) {
                if (B = E.type, B === yi) {
                  if (U.tag === 7) {
                    r(x, U.sibling), k = s(U, E.props.children), k.return = x, x = k;
                    break e;
                  }
                } else if (U.elementType === B || typeof B == "object" && B !== null && B.$$typeof === hn && Td(B) === U.type) {
                  r(x, U.sibling), k = s(U, E.props), k.ref = ho(x, U, E), k.return = x, x = k;
                  break e;
                }
                r(x, U);
                break;
              } else t(x, U);
              U = U.sibling;
            }
            E.type === yi ? (k = Xn(E.props.children, x.mode, P, E.key), k.return = x, x = k) : (P = ns(E.type, E.key, E.props, null, x.mode, P), P.ref = ho(x, k, E), P.return = x, x = P);
          }
          return f(x);
        case gi:
          e: {
            for (U = E.key; k !== null; ) {
              if (k.key === U) if (k.tag === 4 && k.stateNode.containerInfo === E.containerInfo && k.stateNode.implementation === E.implementation) {
                r(x, k.sibling), k = s(k, E.children || []), k.return = x, x = k;
                break e;
              } else {
                r(x, k);
                break;
              }
              else t(x, k);
              k = k.sibling;
            }
            k = Wa(E, x.mode, P), k.return = x, x = k;
          }
          return f(x);
        case hn:
          return U = E._init, Q(x, k, U(E._payload), P);
      }
      if (wo(E)) return j(x, k, E, P);
      if (ao(E)) return z(x, k, E, P);
      $l(x, E);
    }
    return typeof E == "string" && E !== "" || typeof E == "number" ? (E = "" + E, k !== null && k.tag === 6 ? (r(x, k.sibling), k = s(k, E), k.return = x, x = k) : (r(x, k), k = Va(E, x.mode, P), k.return = x, x = k), f(x)) : r(x, k);
  }
  return Q;
}
var Ni = $v(!0), Mv = $v(!1), _s = An(null), xs = null, Ci = null, Lc = null;
function Dc() {
  Lc = Ci = xs = null;
}
function Fc(e) {
  var t = _s.current;
  Ze(_s), e._currentValue = t;
}
function Iu(e, t, r) {
  for (; e !== null; ) {
    var o = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === r) break;
    e = e.return;
  }
}
function Ai(e, t) {
  xs = e, Lc = Ci = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Nt = !0), e.firstContext = null);
}
function dr(e) {
  var t = e._currentValue;
  if (Lc !== e) if (e = { context: e, memoizedValue: t, next: null }, Ci === null) {
    if (xs === null) throw Error(ne(308));
    Ci = e, xs.dependencies = { lanes: 0, firstContext: e };
  } else Ci = Ci.next = e;
  return t;
}
var Wn = null;
function Ac(e) {
  Wn === null ? Wn = [e] : Wn.push(e);
}
function Ov(e, t, r, o) {
  var s = t.interleaved;
  return s === null ? (r.next = r, Ac(t)) : (r.next = s.next, s.next = r), t.interleaved = r, tn(e, o);
}
function tn(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; ) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
  return r.tag === 3 ? r.stateNode : null;
}
var vn = !1;
function $c(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Iv(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function qr(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function bn(e, t, r) {
  var o = e.updateQueue;
  if (o === null) return null;
  if (o = o.shared, Oe & 2) {
    var s = o.pending;
    return s === null ? t.next = t : (t.next = s.next, s.next = t), o.pending = t, tn(e, r);
  }
  return s = o.interleaved, s === null ? (t.next = t, Ac(o)) : (t.next = s.next, s.next = t), o.interleaved = t, tn(e, r);
}
function Zl(e, t, r) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
    var o = t.lanes;
    o &= e.pendingLanes, r |= o, t.lanes = r, wc(e, r);
  }
}
function Ld(e, t) {
  var r = e.updateQueue, o = e.alternate;
  if (o !== null && (o = o.updateQueue, r === o)) {
    var s = null, a = null;
    if (r = r.firstBaseUpdate, r !== null) {
      do {
        var f = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
        a === null ? s = a = f : a = a.next = f, r = r.next;
      } while (r !== null);
      a === null ? s = a = t : a = a.next = t;
    } else s = a = t;
    r = { baseState: o.baseState, firstBaseUpdate: s, lastBaseUpdate: a, shared: o.shared, effects: o.effects }, e.updateQueue = r;
    return;
  }
  e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
}
function ks(e, t, r, o) {
  var s = e.updateQueue;
  vn = !1;
  var a = s.firstBaseUpdate, f = s.lastBaseUpdate, p = s.shared.pending;
  if (p !== null) {
    s.shared.pending = null;
    var g = p, y = g.next;
    g.next = null, f === null ? a = y : f.next = y, f = g;
    var w = e.alternate;
    w !== null && (w = w.updateQueue, p = w.lastBaseUpdate, p !== f && (p === null ? w.firstBaseUpdate = y : p.next = y, w.lastBaseUpdate = g));
  }
  if (a !== null) {
    var D = s.baseState;
    f = 0, w = y = g = null, p = a;
    do {
      var C = p.lane, b = p.eventTime;
      if ((o & C) === C) {
        w !== null && (w = w.next = {
          eventTime: b,
          lane: 0,
          tag: p.tag,
          payload: p.payload,
          callback: p.callback,
          next: null
        });
        e: {
          var j = e, z = p;
          switch (C = t, b = r, z.tag) {
            case 1:
              if (j = z.payload, typeof j == "function") {
                D = j.call(b, D, C);
                break e;
              }
              D = j;
              break e;
            case 3:
              j.flags = j.flags & -65537 | 128;
            case 0:
              if (j = z.payload, C = typeof j == "function" ? j.call(b, D, C) : j, C == null) break e;
              D = it({}, D, C);
              break e;
            case 2:
              vn = !0;
          }
        }
        p.callback !== null && p.lane !== 0 && (e.flags |= 64, C = s.effects, C === null ? s.effects = [p] : C.push(p));
      } else b = { eventTime: b, lane: C, tag: p.tag, payload: p.payload, callback: p.callback, next: null }, w === null ? (y = w = b, g = D) : w = w.next = b, f |= C;
      if (p = p.next, p === null) {
        if (p = s.shared.pending, p === null) break;
        C = p, p = C.next, C.next = null, s.lastBaseUpdate = C, s.shared.pending = null;
      }
    } while (!0);
    if (w === null && (g = D), s.baseState = g, s.firstBaseUpdate = y, s.lastBaseUpdate = w, t = s.shared.interleaved, t !== null) {
      s = t;
      do
        f |= s.lane, s = s.next;
      while (s !== t);
    } else a === null && (s.shared.lanes = 0);
    Zn |= f, e.lanes = f, e.memoizedState = D;
  }
}
function Dd(e, t, r) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var o = e[t], s = o.callback;
    if (s !== null) {
      if (o.callback = null, o = r, typeof s != "function") throw Error(ne(191, s));
      s.call(o);
    }
  }
}
var tl = {}, jr = An(tl), Vo = An(tl), Wo = An(tl);
function Hn(e) {
  if (e === tl) throw Error(ne(174));
  return e;
}
function Mc(e, t) {
  switch (Ke(Wo, t), Ke(Vo, e), Ke(jr, tl), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : gu(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = gu(t, e);
  }
  Ze(jr), Ke(jr, t);
}
function zi() {
  Ze(jr), Ze(Vo), Ze(Wo);
}
function jv(e) {
  Hn(Wo.current);
  var t = Hn(jr.current), r = gu(t, e.type);
  t !== r && (Ke(Vo, e), Ke(jr, r));
}
function Oc(e) {
  Vo.current === e && (Ze(jr), Ze(Vo));
}
var rt = An(0);
function Ss(e) {
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
var Ia = [];
function Ic() {
  for (var e = 0; e < Ia.length; e++) Ia[e]._workInProgressVersionPrimary = null;
  Ia.length = 0;
}
var ql = nn.ReactCurrentDispatcher, ja = nn.ReactCurrentBatchConfig, Qn = 0, nt = null, ct = null, ht = null, Es = !1, Po = !1, Ho = 0, Uk = 0;
function St() {
  throw Error(ne(321));
}
function jc(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++) if (!Rr(e[r], t[r])) return !1;
  return !0;
}
function Nc(e, t, r, o, s, a) {
  if (Qn = a, nt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ql.current = e === null || e.memoizedState === null ? Gk : Xk, e = r(o, s), Po) {
    a = 0;
    do {
      if (Po = !1, Ho = 0, 25 <= a) throw Error(ne(301));
      a += 1, ht = ct = null, t.updateQueue = null, ql.current = Yk, e = r(o, s);
    } while (Po);
  }
  if (ql.current = bs, t = ct !== null && ct.next !== null, Qn = 0, ht = ct = nt = null, Es = !1, t) throw Error(ne(300));
  return e;
}
function zc() {
  var e = Ho !== 0;
  return Ho = 0, e;
}
function $r() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ht === null ? nt.memoizedState = ht = e : ht = ht.next = e, ht;
}
function pr() {
  if (ct === null) {
    var e = nt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ct.next;
  var t = ht === null ? nt.memoizedState : ht.next;
  if (t !== null) ht = t, ct = e;
  else {
    if (e === null) throw Error(ne(310));
    ct = e, e = { memoizedState: ct.memoizedState, baseState: ct.baseState, baseQueue: ct.baseQueue, queue: ct.queue, next: null }, ht === null ? nt.memoizedState = ht = e : ht = ht.next = e;
  }
  return ht;
}
function Go(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Na(e) {
  var t = pr(), r = t.queue;
  if (r === null) throw Error(ne(311));
  r.lastRenderedReducer = e;
  var o = ct, s = o.baseQueue, a = r.pending;
  if (a !== null) {
    if (s !== null) {
      var f = s.next;
      s.next = a.next, a.next = f;
    }
    o.baseQueue = s = a, r.pending = null;
  }
  if (s !== null) {
    a = s.next, o = o.baseState;
    var p = f = null, g = null, y = a;
    do {
      var w = y.lane;
      if ((Qn & w) === w) g !== null && (g = g.next = { lane: 0, action: y.action, hasEagerState: y.hasEagerState, eagerState: y.eagerState, next: null }), o = y.hasEagerState ? y.eagerState : e(o, y.action);
      else {
        var D = {
          lane: w,
          action: y.action,
          hasEagerState: y.hasEagerState,
          eagerState: y.eagerState,
          next: null
        };
        g === null ? (p = g = D, f = o) : g = g.next = D, nt.lanes |= w, Zn |= w;
      }
      y = y.next;
    } while (y !== null && y !== a);
    g === null ? f = o : g.next = p, Rr(o, t.memoizedState) || (Nt = !0), t.memoizedState = o, t.baseState = f, t.baseQueue = g, r.lastRenderedState = o;
  }
  if (e = r.interleaved, e !== null) {
    s = e;
    do
      a = s.lane, nt.lanes |= a, Zn |= a, s = s.next;
    while (s !== e);
  } else s === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function za(e) {
  var t = pr(), r = t.queue;
  if (r === null) throw Error(ne(311));
  r.lastRenderedReducer = e;
  var o = r.dispatch, s = r.pending, a = t.memoizedState;
  if (s !== null) {
    r.pending = null;
    var f = s = s.next;
    do
      a = e(a, f.action), f = f.next;
    while (f !== s);
    Rr(a, t.memoizedState) || (Nt = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), r.lastRenderedState = a;
  }
  return [a, o];
}
function Nv() {
}
function zv(e, t) {
  var r = nt, o = pr(), s = t(), a = !Rr(o.memoizedState, s);
  if (a && (o.memoizedState = s, Nt = !0), o = o.queue, Bc(Vv.bind(null, r, o, e), [e]), o.getSnapshot !== t || a || ht !== null && ht.memoizedState.tag & 1) {
    if (r.flags |= 2048, Xo(9, Uv.bind(null, r, o, s, t), void 0, null), vt === null) throw Error(ne(349));
    Qn & 30 || Bv(r, t, s);
  }
  return s;
}
function Bv(e, t, r) {
  e.flags |= 16384, e = { getSnapshot: t, value: r }, t = nt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, nt.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
}
function Uv(e, t, r, o) {
  t.value = r, t.getSnapshot = o, Wv(t) && Hv(e);
}
function Vv(e, t, r) {
  return r(function() {
    Wv(t) && Hv(e);
  });
}
function Wv(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !Rr(e, r);
  } catch {
    return !0;
  }
}
function Hv(e) {
  var t = tn(e, 1);
  t !== null && Pr(t, e, 1, -1);
}
function Fd(e) {
  var t = $r();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Go, lastRenderedState: e }, t.queue = e, e = e.dispatch = Hk.bind(null, nt, e), [t.memoizedState, e];
}
function Xo(e, t, r, o) {
  return e = { tag: e, create: t, destroy: r, deps: o, next: null }, t = nt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, nt.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (o = r.next, r.next = e, e.next = o, t.lastEffect = e)), e;
}
function Gv() {
  return pr().memoizedState;
}
function Jl(e, t, r, o) {
  var s = $r();
  nt.flags |= e, s.memoizedState = Xo(1 | t, r, void 0, o === void 0 ? null : o);
}
function Us(e, t, r, o) {
  var s = pr();
  o = o === void 0 ? null : o;
  var a = void 0;
  if (ct !== null) {
    var f = ct.memoizedState;
    if (a = f.destroy, o !== null && jc(o, f.deps)) {
      s.memoizedState = Xo(t, r, a, o);
      return;
    }
  }
  nt.flags |= e, s.memoizedState = Xo(1 | t, r, a, o);
}
function Ad(e, t) {
  return Jl(8390656, 8, e, t);
}
function Bc(e, t) {
  return Us(2048, 8, e, t);
}
function Xv(e, t) {
  return Us(4, 2, e, t);
}
function Yv(e, t) {
  return Us(4, 4, e, t);
}
function Kv(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Qv(e, t, r) {
  return r = r != null ? r.concat([e]) : null, Us(4, 4, Kv.bind(null, t, e), r);
}
function Uc() {
}
function Zv(e, t) {
  var r = pr();
  t = t === void 0 ? null : t;
  var o = r.memoizedState;
  return o !== null && t !== null && jc(t, o[1]) ? o[0] : (r.memoizedState = [e, t], e);
}
function qv(e, t) {
  var r = pr();
  t = t === void 0 ? null : t;
  var o = r.memoizedState;
  return o !== null && t !== null && jc(t, o[1]) ? o[0] : (e = e(), r.memoizedState = [e, t], e);
}
function Jv(e, t, r) {
  return Qn & 21 ? (Rr(r, t) || (r = iv(), nt.lanes |= r, Zn |= r, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Nt = !0), e.memoizedState = r);
}
function Vk(e, t) {
  var r = ze;
  ze = r !== 0 && 4 > r ? r : 4, e(!0);
  var o = ja.transition;
  ja.transition = {};
  try {
    e(!1), t();
  } finally {
    ze = r, ja.transition = o;
  }
}
function e0() {
  return pr().memoizedState;
}
function Wk(e, t, r) {
  var o = Pn(e);
  if (r = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null }, t0(e)) r0(t, r);
  else if (r = Ov(e, t, r, o), r !== null) {
    var s = At();
    Pr(r, e, o, s), n0(r, t, o);
  }
}
function Hk(e, t, r) {
  var o = Pn(e), s = { lane: o, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (t0(e)) r0(t, s);
  else {
    var a = e.alternate;
    if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
      var f = t.lastRenderedState, p = a(f, r);
      if (s.hasEagerState = !0, s.eagerState = p, Rr(p, f)) {
        var g = t.interleaved;
        g === null ? (s.next = s, Ac(t)) : (s.next = g.next, g.next = s), t.interleaved = s;
        return;
      }
    } catch {
    } finally {
    }
    r = Ov(e, t, s, o), r !== null && (s = At(), Pr(r, e, o, s), n0(r, t, o));
  }
}
function t0(e) {
  var t = e.alternate;
  return e === nt || t !== null && t === nt;
}
function r0(e, t) {
  Po = Es = !0;
  var r = e.pending;
  r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
}
function n0(e, t, r) {
  if (r & 4194240) {
    var o = t.lanes;
    o &= e.pendingLanes, r |= o, t.lanes = r, wc(e, r);
  }
}
var bs = { readContext: dr, useCallback: St, useContext: St, useEffect: St, useImperativeHandle: St, useInsertionEffect: St, useLayoutEffect: St, useMemo: St, useReducer: St, useRef: St, useState: St, useDebugValue: St, useDeferredValue: St, useTransition: St, useMutableSource: St, useSyncExternalStore: St, useId: St, unstable_isNewReconciler: !1 }, Gk = { readContext: dr, useCallback: function(e, t) {
  return $r().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: dr, useEffect: Ad, useImperativeHandle: function(e, t, r) {
  return r = r != null ? r.concat([e]) : null, Jl(
    4194308,
    4,
    Kv.bind(null, t, e),
    r
  );
}, useLayoutEffect: function(e, t) {
  return Jl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Jl(4, 2, e, t);
}, useMemo: function(e, t) {
  var r = $r();
  return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e;
}, useReducer: function(e, t, r) {
  var o = $r();
  return t = r !== void 0 ? r(t) : t, o.memoizedState = o.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, o.queue = e, e = e.dispatch = Wk.bind(null, nt, e), [o.memoizedState, e];
}, useRef: function(e) {
  var t = $r();
  return e = { current: e }, t.memoizedState = e;
}, useState: Fd, useDebugValue: Uc, useDeferredValue: function(e) {
  return $r().memoizedState = e;
}, useTransition: function() {
  var e = Fd(!1), t = e[0];
  return e = Vk.bind(null, e[1]), $r().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, r) {
  var o = nt, s = $r();
  if (tt) {
    if (r === void 0) throw Error(ne(407));
    r = r();
  } else {
    if (r = t(), vt === null) throw Error(ne(349));
    Qn & 30 || Bv(o, t, r);
  }
  s.memoizedState = r;
  var a = { value: r, getSnapshot: t };
  return s.queue = a, Ad(Vv.bind(
    null,
    o,
    a,
    e
  ), [e]), o.flags |= 2048, Xo(9, Uv.bind(null, o, a, r, t), void 0, null), r;
}, useId: function() {
  var e = $r(), t = vt.identifierPrefix;
  if (tt) {
    var r = Zr, o = Qr;
    r = (o & ~(1 << 32 - Cr(o) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = Ho++, 0 < r && (t += "H" + r.toString(32)), t += ":";
  } else r = Uk++, t = ":" + t + "r" + r.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Xk = {
  readContext: dr,
  useCallback: Zv,
  useContext: dr,
  useEffect: Bc,
  useImperativeHandle: Qv,
  useInsertionEffect: Xv,
  useLayoutEffect: Yv,
  useMemo: qv,
  useReducer: Na,
  useRef: Gv,
  useState: function() {
    return Na(Go);
  },
  useDebugValue: Uc,
  useDeferredValue: function(e) {
    var t = pr();
    return Jv(t, ct.memoizedState, e);
  },
  useTransition: function() {
    var e = Na(Go)[0], t = pr().memoizedState;
    return [e, t];
  },
  useMutableSource: Nv,
  useSyncExternalStore: zv,
  useId: e0,
  unstable_isNewReconciler: !1
}, Yk = { readContext: dr, useCallback: Zv, useContext: dr, useEffect: Bc, useImperativeHandle: Qv, useInsertionEffect: Xv, useLayoutEffect: Yv, useMemo: qv, useReducer: za, useRef: Gv, useState: function() {
  return za(Go);
}, useDebugValue: Uc, useDeferredValue: function(e) {
  var t = pr();
  return ct === null ? t.memoizedState = e : Jv(t, ct.memoizedState, e);
}, useTransition: function() {
  var e = za(Go)[0], t = pr().memoizedState;
  return [e, t];
}, useMutableSource: Nv, useSyncExternalStore: zv, useId: e0, unstable_isNewReconciler: !1 };
function Sr(e, t) {
  if (e && e.defaultProps) {
    t = it({}, t), e = e.defaultProps;
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function ju(e, t, r, o) {
  t = e.memoizedState, r = r(o, t), r = r == null ? t : it({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
}
var Vs = { isMounted: function(e) {
  return (e = e._reactInternals) ? ti(e) === e : !1;
}, enqueueSetState: function(e, t, r) {
  e = e._reactInternals;
  var o = At(), s = Pn(e), a = qr(o, s);
  a.payload = t, r != null && (a.callback = r), t = bn(e, a, s), t !== null && (Pr(t, e, s, o), Zl(t, e, s));
}, enqueueReplaceState: function(e, t, r) {
  e = e._reactInternals;
  var o = At(), s = Pn(e), a = qr(o, s);
  a.tag = 1, a.payload = t, r != null && (a.callback = r), t = bn(e, a, s), t !== null && (Pr(t, e, s, o), Zl(t, e, s));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var r = At(), o = Pn(e), s = qr(r, o);
  s.tag = 2, t != null && (s.callback = t), t = bn(e, s, o), t !== null && (Pr(t, e, o, r), Zl(t, e, o));
} };
function $d(e, t, r, o, s, a, f) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, a, f) : t.prototype && t.prototype.isPureReactComponent ? !No(r, o) || !No(s, a) : !0;
}
function i0(e, t, r) {
  var o = !1, s = Ln, a = t.contextType;
  return typeof a == "object" && a !== null ? a = dr(a) : (s = Bt(t) ? Yn : Ct.current, o = t.contextTypes, a = (o = o != null) ? Ii(e, s) : Ln), t = new t(r, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Vs, e.stateNode = t, t._reactInternals = e, o && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = a), t;
}
function Md(e, t, r, o) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, o), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
}
function Nu(e, t, r, o) {
  var s = e.stateNode;
  s.props = r, s.state = e.memoizedState, s.refs = {}, $c(e);
  var a = t.contextType;
  typeof a == "object" && a !== null ? s.context = dr(a) : (a = Bt(t) ? Yn : Ct.current, s.context = Ii(e, a)), s.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (ju(e, t, a, r), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && Vs.enqueueReplaceState(s, s.state, null), ks(e, r, s, o), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
}
function Bi(e, t) {
  try {
    var r = "", o = t;
    do
      r += kx(o), o = o.return;
    while (o);
    var s = r;
  } catch (a) {
    s = `
Error generating stack: ` + a.message + `
` + a.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function Ba(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function zu(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function() {
      throw r;
    });
  }
}
var Kk = typeof WeakMap == "function" ? WeakMap : Map;
function o0(e, t, r) {
  r = qr(-1, r), r.tag = 3, r.payload = { element: null };
  var o = t.value;
  return r.callback = function() {
    Ps || (Ps = !0, Qu = o), zu(e, t);
  }, r;
}
function l0(e, t, r) {
  r = qr(-1, r), r.tag = 3;
  var o = e.type.getDerivedStateFromError;
  if (typeof o == "function") {
    var s = t.value;
    r.payload = function() {
      return o(s);
    }, r.callback = function() {
      zu(e, t);
    };
  }
  var a = e.stateNode;
  return a !== null && typeof a.componentDidCatch == "function" && (r.callback = function() {
    zu(e, t), typeof o != "function" && (Cn === null ? Cn = /* @__PURE__ */ new Set([this]) : Cn.add(this));
    var f = t.stack;
    this.componentDidCatch(t.value, { componentStack: f !== null ? f : "" });
  }), r;
}
function Od(e, t, r) {
  var o = e.pingCache;
  if (o === null) {
    o = e.pingCache = new Kk();
    var s = /* @__PURE__ */ new Set();
    o.set(t, s);
  } else s = o.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), o.set(t, s));
  s.has(r) || (s.add(r), e = uS.bind(null, e, t, r), t.then(e, e));
}
function Id(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function jd(e, t, r, o, s) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = qr(-1, 1), t.tag = 2, bn(r, t, 1))), r.lanes |= 1), e);
}
var Qk = nn.ReactCurrentOwner, Nt = !1;
function Ft(e, t, r, o) {
  t.child = e === null ? Mv(t, null, r, o) : Ni(t, e.child, r, o);
}
function Nd(e, t, r, o, s) {
  r = r.render;
  var a = t.ref;
  return Ai(t, s), o = Nc(e, t, r, o, a, s), r = zc(), e !== null && !Nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, rn(e, t, s)) : (tt && r && Pc(t), t.flags |= 1, Ft(e, t, o, s), t.child);
}
function zd(e, t, r, o, s) {
  if (e === null) {
    var a = r.type;
    return typeof a == "function" && !Qc(a) && a.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = a, s0(e, t, a, o, s)) : (e = ns(r.type, null, o, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (a = e.child, !(e.lanes & s)) {
    var f = a.memoizedProps;
    if (r = r.compare, r = r !== null ? r : No, r(f, o) && e.ref === t.ref) return rn(e, t, s);
  }
  return t.flags |= 1, e = Rn(a, o), e.ref = t.ref, e.return = t, t.child = e;
}
function s0(e, t, r, o, s) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (No(a, o) && e.ref === t.ref) if (Nt = !1, t.pendingProps = o = a, (e.lanes & s) !== 0) e.flags & 131072 && (Nt = !0);
    else return t.lanes = e.lanes, rn(e, t, s);
  }
  return Bu(e, t, r, o, s);
}
function a0(e, t, r) {
  var o = t.pendingProps, s = o.children, a = e !== null ? e.memoizedState : null;
  if (o.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ke(Ri, Qt), Qt |= r;
  else {
    if (!(r & 1073741824)) return e = a !== null ? a.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ke(Ri, Qt), Qt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = a !== null ? a.baseLanes : r, Ke(Ri, Qt), Qt |= o;
  }
  else a !== null ? (o = a.baseLanes | r, t.memoizedState = null) : o = r, Ke(Ri, Qt), Qt |= o;
  return Ft(e, t, s, r), t.child;
}
function u0(e, t) {
  var r = t.ref;
  (e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152);
}
function Bu(e, t, r, o, s) {
  var a = Bt(r) ? Yn : Ct.current;
  return a = Ii(t, a), Ai(t, s), r = Nc(e, t, r, o, a, s), o = zc(), e !== null && !Nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, rn(e, t, s)) : (tt && o && Pc(t), t.flags |= 1, Ft(e, t, r, s), t.child);
}
function Bd(e, t, r, o, s) {
  if (Bt(r)) {
    var a = !0;
    gs(t);
  } else a = !1;
  if (Ai(t, s), t.stateNode === null) es(e, t), i0(t, r, o), Nu(t, r, o, s), o = !0;
  else if (e === null) {
    var f = t.stateNode, p = t.memoizedProps;
    f.props = p;
    var g = f.context, y = r.contextType;
    typeof y == "object" && y !== null ? y = dr(y) : (y = Bt(r) ? Yn : Ct.current, y = Ii(t, y));
    var w = r.getDerivedStateFromProps, D = typeof w == "function" || typeof f.getSnapshotBeforeUpdate == "function";
    D || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (p !== o || g !== y) && Md(t, f, o, y), vn = !1;
    var C = t.memoizedState;
    f.state = C, ks(t, o, f, s), g = t.memoizedState, p !== o || C !== g || zt.current || vn ? (typeof w == "function" && (ju(t, r, w, o), g = t.memoizedState), (p = vn || $d(t, r, p, o, C, g, y)) ? (D || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = g), f.props = o, f.state = g, f.context = y, o = p) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
  } else {
    f = t.stateNode, Iv(e, t), p = t.memoizedProps, y = t.type === t.elementType ? p : Sr(t.type, p), f.props = y, D = t.pendingProps, C = f.context, g = r.contextType, typeof g == "object" && g !== null ? g = dr(g) : (g = Bt(r) ? Yn : Ct.current, g = Ii(t, g));
    var b = r.getDerivedStateFromProps;
    (w = typeof b == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (p !== D || C !== g) && Md(t, f, o, g), vn = !1, C = t.memoizedState, f.state = C, ks(t, o, f, s);
    var j = t.memoizedState;
    p !== D || C !== j || zt.current || vn ? (typeof b == "function" && (ju(t, r, b, o), j = t.memoizedState), (y = vn || $d(t, r, y, o, C, j, g) || !1) ? (w || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, j, g), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(o, j, g)), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = j), f.props = o, f.state = j, f.context = g, o = y) : (typeof f.componentDidUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), o = !1);
  }
  return Uu(e, t, r, o, a, s);
}
function Uu(e, t, r, o, s, a) {
  u0(e, t);
  var f = (t.flags & 128) !== 0;
  if (!o && !f) return s && Cd(t, r, !1), rn(e, t, a);
  o = t.stateNode, Qk.current = t;
  var p = f && typeof r.getDerivedStateFromError != "function" ? null : o.render();
  return t.flags |= 1, e !== null && f ? (t.child = Ni(t, e.child, null, a), t.child = Ni(t, null, p, a)) : Ft(e, t, p, a), t.memoizedState = o.state, s && Cd(t, r, !0), t.child;
}
function c0(e) {
  var t = e.stateNode;
  t.pendingContext ? bd(e, t.pendingContext, t.pendingContext !== t.context) : t.context && bd(e, t.context, !1), Mc(e, t.containerInfo);
}
function Ud(e, t, r, o, s) {
  return ji(), Tc(s), t.flags |= 256, Ft(e, t, r, o), t.child;
}
var Vu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Wu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function f0(e, t, r) {
  var o = t.pendingProps, s = rt.current, a = !1, f = (t.flags & 128) !== 0, p;
  if ((p = f) || (p = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0), p ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), Ke(rt, s & 1), e === null)
    return Ou(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (f = o.children, e = o.fallback, a ? (o = t.mode, a = t.child, f = { mode: "hidden", children: f }, !(o & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = f) : a = Gs(f, o, 0, null), e = Xn(e, o, r, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Wu(r), t.memoizedState = Vu, e) : Vc(t, f));
  if (s = e.memoizedState, s !== null && (p = s.dehydrated, p !== null)) return Zk(e, t, f, o, p, s, r);
  if (a) {
    a = o.fallback, f = t.mode, s = e.child, p = s.sibling;
    var g = { mode: "hidden", children: o.children };
    return !(f & 1) && t.child !== s ? (o = t.child, o.childLanes = 0, o.pendingProps = g, t.deletions = null) : (o = Rn(s, g), o.subtreeFlags = s.subtreeFlags & 14680064), p !== null ? a = Rn(p, a) : (a = Xn(a, f, r, null), a.flags |= 2), a.return = t, o.return = t, o.sibling = a, t.child = o, o = a, a = t.child, f = e.child.memoizedState, f = f === null ? Wu(r) : { baseLanes: f.baseLanes | r, cachePool: null, transitions: f.transitions }, a.memoizedState = f, a.childLanes = e.childLanes & ~r, t.memoizedState = Vu, o;
  }
  return a = e.child, e = a.sibling, o = Rn(a, { mode: "visible", children: o.children }), !(t.mode & 1) && (o.lanes = r), o.return = t, o.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = o, t.memoizedState = null, o;
}
function Vc(e, t) {
  return t = Gs({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Ml(e, t, r, o) {
  return o !== null && Tc(o), Ni(t, e.child, null, r), e = Vc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Zk(e, t, r, o, s, a, f) {
  if (r)
    return t.flags & 256 ? (t.flags &= -257, o = Ba(Error(ne(422))), Ml(e, t, f, o)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (a = o.fallback, s = t.mode, o = Gs({ mode: "visible", children: o.children }, s, 0, null), a = Xn(a, s, f, null), a.flags |= 2, o.return = t, a.return = t, o.sibling = a, t.child = o, t.mode & 1 && Ni(t, e.child, null, f), t.child.memoizedState = Wu(f), t.memoizedState = Vu, a);
  if (!(t.mode & 1)) return Ml(e, t, f, null);
  if (s.data === "$!") {
    if (o = s.nextSibling && s.nextSibling.dataset, o) var p = o.dgst;
    return o = p, a = Error(ne(419)), o = Ba(a, o, void 0), Ml(e, t, f, o);
  }
  if (p = (f & e.childLanes) !== 0, Nt || p) {
    if (o = vt, o !== null) {
      switch (f & -f) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
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
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      s = s & (o.suspendedLanes | f) ? 0 : s, s !== 0 && s !== a.retryLane && (a.retryLane = s, tn(e, s), Pr(o, e, s, -1));
    }
    return Kc(), o = Ba(Error(ne(421))), Ml(e, t, f, o);
  }
  return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = cS.bind(null, e), s._reactRetry = t, null) : (e = a.treeContext, Zt = En(s.nextSibling), qt = t, tt = !0, br = null, e !== null && (ar[ur++] = Qr, ar[ur++] = Zr, ar[ur++] = Kn, Qr = e.id, Zr = e.overflow, Kn = t), t = Vc(t, o.children), t.flags |= 4096, t);
}
function Vd(e, t, r) {
  e.lanes |= t;
  var o = e.alternate;
  o !== null && (o.lanes |= t), Iu(e.return, t, r);
}
function Ua(e, t, r, o, s) {
  var a = e.memoizedState;
  a === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: o, tail: r, tailMode: s } : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = o, a.tail = r, a.tailMode = s);
}
function d0(e, t, r) {
  var o = t.pendingProps, s = o.revealOrder, a = o.tail;
  if (Ft(e, t, o.children, r), o = rt.current, o & 2) o = o & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Vd(e, r, t);
      else if (e.tag === 19) Vd(e, r, t);
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
  if (Ke(rt, o), !(t.mode & 1)) t.memoizedState = null;
  else switch (s) {
    case "forwards":
      for (r = t.child, s = null; r !== null; ) e = r.alternate, e !== null && Ss(e) === null && (s = r), r = r.sibling;
      r = s, r === null ? (s = t.child, t.child = null) : (s = r.sibling, r.sibling = null), Ua(t, !1, s, r, a);
      break;
    case "backwards":
      for (r = null, s = t.child, t.child = null; s !== null; ) {
        if (e = s.alternate, e !== null && Ss(e) === null) {
          t.child = s;
          break;
        }
        e = s.sibling, s.sibling = r, r = s, s = e;
      }
      Ua(t, !0, r, null, a);
      break;
    case "together":
      Ua(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function es(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rn(e, t, r) {
  if (e !== null && (t.dependencies = e.dependencies), Zn |= t.lanes, !(r & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(ne(153));
  if (t.child !== null) {
    for (e = t.child, r = Rn(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null; ) e = e.sibling, r = r.sibling = Rn(e, e.pendingProps), r.return = t;
    r.sibling = null;
  }
  return t.child;
}
function qk(e, t, r) {
  switch (t.tag) {
    case 3:
      c0(t), ji();
      break;
    case 5:
      jv(t);
      break;
    case 1:
      Bt(t.type) && gs(t);
      break;
    case 4:
      Mc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var o = t.type._context, s = t.memoizedProps.value;
      Ke(_s, o._currentValue), o._currentValue = s;
      break;
    case 13:
      if (o = t.memoizedState, o !== null)
        return o.dehydrated !== null ? (Ke(rt, rt.current & 1), t.flags |= 128, null) : r & t.child.childLanes ? f0(e, t, r) : (Ke(rt, rt.current & 1), e = rn(e, t, r), e !== null ? e.sibling : null);
      Ke(rt, rt.current & 1);
      break;
    case 19:
      if (o = (r & t.childLanes) !== 0, e.flags & 128) {
        if (o) return d0(e, t, r);
        t.flags |= 128;
      }
      if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Ke(rt, rt.current), o) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, a0(e, t, r);
  }
  return rn(e, t, r);
}
var p0, Hu, h0, v0;
p0 = function(e, t) {
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
Hu = function() {
};
h0 = function(e, t, r, o) {
  var s = e.memoizedProps;
  if (s !== o) {
    e = t.stateNode, Hn(jr.current);
    var a = null;
    switch (r) {
      case "input":
        s = pu(e, s), o = pu(e, o), a = [];
        break;
      case "select":
        s = it({}, s, { value: void 0 }), o = it({}, o, { value: void 0 }), a = [];
        break;
      case "textarea":
        s = mu(e, s), o = mu(e, o), a = [];
        break;
      default:
        typeof s.onClick != "function" && typeof o.onClick == "function" && (e.onclick = vs);
    }
    yu(r, o);
    var f;
    r = null;
    for (y in s) if (!o.hasOwnProperty(y) && s.hasOwnProperty(y) && s[y] != null) if (y === "style") {
      var p = s[y];
      for (f in p) p.hasOwnProperty(f) && (r || (r = {}), r[f] = "");
    } else y !== "dangerouslySetInnerHTML" && y !== "children" && y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && y !== "autoFocus" && (Fo.hasOwnProperty(y) ? a || (a = []) : (a = a || []).push(y, null));
    for (y in o) {
      var g = o[y];
      if (p = s != null ? s[y] : void 0, o.hasOwnProperty(y) && g !== p && (g != null || p != null)) if (y === "style") if (p) {
        for (f in p) !p.hasOwnProperty(f) || g && g.hasOwnProperty(f) || (r || (r = {}), r[f] = "");
        for (f in g) g.hasOwnProperty(f) && p[f] !== g[f] && (r || (r = {}), r[f] = g[f]);
      } else r || (a || (a = []), a.push(
        y,
        r
      )), r = g;
      else y === "dangerouslySetInnerHTML" ? (g = g ? g.__html : void 0, p = p ? p.__html : void 0, g != null && p !== g && (a = a || []).push(y, g)) : y === "children" ? typeof g != "string" && typeof g != "number" || (a = a || []).push(y, "" + g) : y !== "suppressContentEditableWarning" && y !== "suppressHydrationWarning" && (Fo.hasOwnProperty(y) ? (g != null && y === "onScroll" && Qe("scroll", e), a || p === g || (a = [])) : (a = a || []).push(y, g));
    }
    r && (a = a || []).push("style", r);
    var y = a;
    (t.updateQueue = y) && (t.flags |= 4);
  }
};
v0 = function(e, t, r, o) {
  r !== o && (t.flags |= 4);
};
function vo(e, t) {
  if (!tt) switch (e.tailMode) {
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
function Et(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, r = 0, o = 0;
  if (t) for (var s = e.child; s !== null; ) r |= s.lanes | s.childLanes, o |= s.subtreeFlags & 14680064, o |= s.flags & 14680064, s.return = e, s = s.sibling;
  else for (s = e.child; s !== null; ) r |= s.lanes | s.childLanes, o |= s.subtreeFlags, o |= s.flags, s.return = e, s = s.sibling;
  return e.subtreeFlags |= o, e.childLanes = r, t;
}
function Jk(e, t, r) {
  var o = t.pendingProps;
  switch (Rc(t), t.tag) {
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
      return Et(t), null;
    case 1:
      return Bt(t.type) && ms(), Et(t), null;
    case 3:
      return o = t.stateNode, zi(), Ze(zt), Ze(Ct), Ic(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (e === null || e.child === null) && (Al(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, br !== null && (Ju(br), br = null))), Hu(e, t), Et(t), null;
    case 5:
      Oc(t);
      var s = Hn(Wo.current);
      if (r = t.type, e !== null && t.stateNode != null) h0(e, t, r, o, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!o) {
          if (t.stateNode === null) throw Error(ne(166));
          return Et(t), null;
        }
        if (e = Hn(jr.current), Al(t)) {
          o = t.stateNode, r = t.type;
          var a = t.memoizedProps;
          switch (o[Or] = t, o[Uo] = a, e = (t.mode & 1) !== 0, r) {
            case "dialog":
              Qe("cancel", o), Qe("close", o);
              break;
            case "iframe":
            case "object":
            case "embed":
              Qe("load", o);
              break;
            case "video":
            case "audio":
              for (s = 0; s < xo.length; s++) Qe(xo[s], o);
              break;
            case "source":
              Qe("error", o);
              break;
            case "img":
            case "image":
            case "link":
              Qe(
                "error",
                o
              ), Qe("load", o);
              break;
            case "details":
              Qe("toggle", o);
              break;
            case "input":
              qf(o, a), Qe("invalid", o);
              break;
            case "select":
              o._wrapperState = { wasMultiple: !!a.multiple }, Qe("invalid", o);
              break;
            case "textarea":
              ed(o, a), Qe("invalid", o);
          }
          yu(r, a), s = null;
          for (var f in a) if (a.hasOwnProperty(f)) {
            var p = a[f];
            f === "children" ? typeof p == "string" ? o.textContent !== p && (a.suppressHydrationWarning !== !0 && Fl(o.textContent, p, e), s = ["children", p]) : typeof p == "number" && o.textContent !== "" + p && (a.suppressHydrationWarning !== !0 && Fl(
              o.textContent,
              p,
              e
            ), s = ["children", "" + p]) : Fo.hasOwnProperty(f) && p != null && f === "onScroll" && Qe("scroll", o);
          }
          switch (r) {
            case "input":
              El(o), Jf(o, a, !0);
              break;
            case "textarea":
              El(o), td(o);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (o.onclick = vs);
          }
          o = s, t.updateQueue = o, o !== null && (t.flags |= 4);
        } else {
          f = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Vh(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = f.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = f.createElement(r, { is: o.is }) : (e = f.createElement(r), r === "select" && (f = e, o.multiple ? f.multiple = !0 : o.size && (f.size = o.size))) : e = f.createElementNS(e, r), e[Or] = t, e[Uo] = o, p0(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (f = wu(r, o), r) {
              case "dialog":
                Qe("cancel", e), Qe("close", e), s = o;
                break;
              case "iframe":
              case "object":
              case "embed":
                Qe("load", e), s = o;
                break;
              case "video":
              case "audio":
                for (s = 0; s < xo.length; s++) Qe(xo[s], e);
                s = o;
                break;
              case "source":
                Qe("error", e), s = o;
                break;
              case "img":
              case "image":
              case "link":
                Qe(
                  "error",
                  e
                ), Qe("load", e), s = o;
                break;
              case "details":
                Qe("toggle", e), s = o;
                break;
              case "input":
                qf(e, o), s = pu(e, o), Qe("invalid", e);
                break;
              case "option":
                s = o;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!o.multiple }, s = it({}, o, { value: void 0 }), Qe("invalid", e);
                break;
              case "textarea":
                ed(e, o), s = mu(e, o), Qe("invalid", e);
                break;
              default:
                s = o;
            }
            yu(r, s), p = s;
            for (a in p) if (p.hasOwnProperty(a)) {
              var g = p[a];
              a === "style" ? Gh(e, g) : a === "dangerouslySetInnerHTML" ? (g = g ? g.__html : void 0, g != null && Wh(e, g)) : a === "children" ? typeof g == "string" ? (r !== "textarea" || g !== "") && Ao(e, g) : typeof g == "number" && Ao(e, "" + g) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Fo.hasOwnProperty(a) ? g != null && a === "onScroll" && Qe("scroll", e) : g != null && pc(e, a, g, f));
            }
            switch (r) {
              case "input":
                El(e), Jf(e, o, !1);
                break;
              case "textarea":
                El(e), td(e);
                break;
              case "option":
                o.value != null && e.setAttribute("value", "" + Tn(o.value));
                break;
              case "select":
                e.multiple = !!o.multiple, a = o.value, a != null ? Ti(e, !!o.multiple, a, !1) : o.defaultValue != null && Ti(
                  e,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                );
                break;
              default:
                typeof s.onClick == "function" && (e.onclick = vs);
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
      return Et(t), null;
    case 6:
      if (e && t.stateNode != null) v0(e, t, e.memoizedProps, o);
      else {
        if (typeof o != "string" && t.stateNode === null) throw Error(ne(166));
        if (r = Hn(Wo.current), Hn(jr.current), Al(t)) {
          if (o = t.stateNode, r = t.memoizedProps, o[Or] = t, (a = o.nodeValue !== r) && (e = qt, e !== null)) switch (e.tag) {
            case 3:
              Fl(o.nodeValue, r, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Fl(o.nodeValue, r, (e.mode & 1) !== 0);
          }
          a && (t.flags |= 4);
        } else o = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(o), o[Or] = t, t.stateNode = o;
      }
      return Et(t), null;
    case 13:
      if (Ze(rt), o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (tt && Zt !== null && t.mode & 1 && !(t.flags & 128)) Av(), ji(), t.flags |= 98560, a = !1;
        else if (a = Al(t), o !== null && o.dehydrated !== null) {
          if (e === null) {
            if (!a) throw Error(ne(318));
            if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(ne(317));
            a[Or] = t;
          } else ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Et(t), a = !1;
        } else br !== null && (Ju(br), br = null), a = !0;
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = r, t) : (o = o !== null, o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192, t.mode & 1 && (e === null || rt.current & 1 ? ft === 0 && (ft = 3) : Kc())), t.updateQueue !== null && (t.flags |= 4), Et(t), null);
    case 4:
      return zi(), Hu(e, t), e === null && zo(t.stateNode.containerInfo), Et(t), null;
    case 10:
      return Fc(t.type._context), Et(t), null;
    case 17:
      return Bt(t.type) && ms(), Et(t), null;
    case 19:
      if (Ze(rt), a = t.memoizedState, a === null) return Et(t), null;
      if (o = (t.flags & 128) !== 0, f = a.rendering, f === null) if (o) vo(a, !1);
      else {
        if (ft !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (f = Ss(e), f !== null) {
            for (t.flags |= 128, vo(a, !1), o = f.updateQueue, o !== null && (t.updateQueue = o, t.flags |= 4), t.subtreeFlags = 0, o = r, r = t.child; r !== null; ) a = r, e = o, a.flags &= 14680066, f = a.alternate, f === null ? (a.childLanes = 0, a.lanes = e, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = f.childLanes, a.lanes = f.lanes, a.child = f.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = f.memoizedProps, a.memoizedState = f.memoizedState, a.updateQueue = f.updateQueue, a.type = f.type, e = f.dependencies, a.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), r = r.sibling;
            return Ke(rt, rt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        a.tail !== null && st() > Ui && (t.flags |= 128, o = !0, vo(a, !1), t.lanes = 4194304);
      }
      else {
        if (!o) if (e = Ss(f), e !== null) {
          if (t.flags |= 128, o = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), vo(a, !0), a.tail === null && a.tailMode === "hidden" && !f.alternate && !tt) return Et(t), null;
        } else 2 * st() - a.renderingStartTime > Ui && r !== 1073741824 && (t.flags |= 128, o = !0, vo(a, !1), t.lanes = 4194304);
        a.isBackwards ? (f.sibling = t.child, t.child = f) : (r = a.last, r !== null ? r.sibling = f : t.child = f, a.last = f);
      }
      return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = st(), t.sibling = null, r = rt.current, Ke(rt, o ? r & 1 | 2 : r & 1), t) : (Et(t), null);
    case 22:
    case 23:
      return Yc(), o = t.memoizedState !== null, e !== null && e.memoizedState !== null !== o && (t.flags |= 8192), o && t.mode & 1 ? Qt & 1073741824 && (Et(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Et(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ne(156, t.tag));
}
function eS(e, t) {
  switch (Rc(t), t.tag) {
    case 1:
      return Bt(t.type) && ms(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return zi(), Ze(zt), Ze(Ct), Ic(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Oc(t), null;
    case 13:
      if (Ze(rt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(ne(340));
        ji();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ze(rt), null;
    case 4:
      return zi(), null;
    case 10:
      return Fc(t.type._context), null;
    case 22:
    case 23:
      return Yc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ol = !1, bt = !1, tS = typeof WeakSet == "function" ? WeakSet : Set, fe = null;
function Pi(e, t) {
  var r = e.ref;
  if (r !== null) if (typeof r == "function") try {
    r(null);
  } catch (o) {
    lt(e, t, o);
  }
  else r.current = null;
}
function Gu(e, t, r) {
  try {
    r();
  } catch (o) {
    lt(e, t, o);
  }
}
var Wd = !1;
function rS(e, t) {
  if (Tu = ds, e = _v(), Cc(e)) {
    if ("selectionStart" in e) var r = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      r = (r = e.ownerDocument) && r.defaultView || window;
      var o = r.getSelection && r.getSelection();
      if (o && o.rangeCount !== 0) {
        r = o.anchorNode;
        var s = o.anchorOffset, a = o.focusNode;
        o = o.focusOffset;
        try {
          r.nodeType, a.nodeType;
        } catch {
          r = null;
          break e;
        }
        var f = 0, p = -1, g = -1, y = 0, w = 0, D = e, C = null;
        t: for (; ; ) {
          for (var b; D !== r || s !== 0 && D.nodeType !== 3 || (p = f + s), D !== a || o !== 0 && D.nodeType !== 3 || (g = f + o), D.nodeType === 3 && (f += D.nodeValue.length), (b = D.firstChild) !== null; )
            C = D, D = b;
          for (; ; ) {
            if (D === e) break t;
            if (C === r && ++y === s && (p = f), C === a && ++w === o && (g = f), (b = D.nextSibling) !== null) break;
            D = C, C = D.parentNode;
          }
          D = b;
        }
        r = p === -1 || g === -1 ? null : { start: p, end: g };
      } else r = null;
    }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (Lu = { focusedElem: e, selectionRange: r }, ds = !1, fe = t; fe !== null; ) if (t = fe, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, fe = e;
  else for (; fe !== null; ) {
    t = fe;
    try {
      var j = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (j !== null) {
            var z = j.memoizedProps, Q = j.memoizedState, x = t.stateNode, k = x.getSnapshotBeforeUpdate(t.elementType === t.type ? z : Sr(t.type, z), Q);
            x.__reactInternalSnapshotBeforeUpdate = k;
          }
          break;
        case 3:
          var E = t.stateNode.containerInfo;
          E.nodeType === 1 ? E.textContent = "" : E.nodeType === 9 && E.documentElement && E.removeChild(E.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ne(163));
      }
    } catch (P) {
      lt(t, t.return, P);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, fe = e;
      break;
    }
    fe = t.return;
  }
  return j = Wd, Wd = !1, j;
}
function Ro(e, t, r) {
  var o = t.updateQueue;
  if (o = o !== null ? o.lastEffect : null, o !== null) {
    var s = o = o.next;
    do {
      if ((s.tag & e) === e) {
        var a = s.destroy;
        s.destroy = void 0, a !== void 0 && Gu(t, r, a);
      }
      s = s.next;
    } while (s !== o);
  }
}
function Ws(e, t) {
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
function Xu(e) {
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
function m0(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, m0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Or], delete t[Uo], delete t[Au], delete t[jk], delete t[Nk])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function g0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Hd(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || g0(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Yu(e, t, r) {
  var o = e.tag;
  if (o === 5 || o === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = vs));
  else if (o !== 4 && (e = e.child, e !== null)) for (Yu(e, t, r), e = e.sibling; e !== null; ) Yu(e, t, r), e = e.sibling;
}
function Ku(e, t, r) {
  var o = e.tag;
  if (o === 5 || o === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
  else if (o !== 4 && (e = e.child, e !== null)) for (Ku(e, t, r), e = e.sibling; e !== null; ) Ku(e, t, r), e = e.sibling;
}
var gt = null, Er = !1;
function dn(e, t, r) {
  for (r = r.child; r !== null; ) y0(e, t, r), r = r.sibling;
}
function y0(e, t, r) {
  if (Ir && typeof Ir.onCommitFiberUnmount == "function") try {
    Ir.onCommitFiberUnmount(Os, r);
  } catch {
  }
  switch (r.tag) {
    case 5:
      bt || Pi(r, t);
    case 6:
      var o = gt, s = Er;
      gt = null, dn(e, t, r), gt = o, Er = s, gt !== null && (Er ? (e = gt, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : gt.removeChild(r.stateNode));
      break;
    case 18:
      gt !== null && (Er ? (e = gt, r = r.stateNode, e.nodeType === 8 ? Ma(e.parentNode, r) : e.nodeType === 1 && Ma(e, r), Io(e)) : Ma(gt, r.stateNode));
      break;
    case 4:
      o = gt, s = Er, gt = r.stateNode.containerInfo, Er = !0, dn(e, t, r), gt = o, Er = s;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!bt && (o = r.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
        s = o = o.next;
        do {
          var a = s, f = a.destroy;
          a = a.tag, f !== void 0 && (a & 2 || a & 4) && Gu(r, t, f), s = s.next;
        } while (s !== o);
      }
      dn(e, t, r);
      break;
    case 1:
      if (!bt && (Pi(r, t), o = r.stateNode, typeof o.componentWillUnmount == "function")) try {
        o.props = r.memoizedProps, o.state = r.memoizedState, o.componentWillUnmount();
      } catch (p) {
        lt(r, t, p);
      }
      dn(e, t, r);
      break;
    case 21:
      dn(e, t, r);
      break;
    case 22:
      r.mode & 1 ? (bt = (o = bt) || r.memoizedState !== null, dn(e, t, r), bt = o) : dn(e, t, r);
      break;
    default:
      dn(e, t, r);
  }
}
function Gd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    r === null && (r = e.stateNode = new tS()), t.forEach(function(o) {
      var s = fS.bind(null, e, o);
      r.has(o) || (r.add(o), o.then(s, s));
    });
  }
}
function kr(e, t) {
  var r = t.deletions;
  if (r !== null) for (var o = 0; o < r.length; o++) {
    var s = r[o];
    try {
      var a = e, f = t, p = f;
      e: for (; p !== null; ) {
        switch (p.tag) {
          case 5:
            gt = p.stateNode, Er = !1;
            break e;
          case 3:
            gt = p.stateNode.containerInfo, Er = !0;
            break e;
          case 4:
            gt = p.stateNode.containerInfo, Er = !0;
            break e;
        }
        p = p.return;
      }
      if (gt === null) throw Error(ne(160));
      y0(a, f, s), gt = null, Er = !1;
      var g = s.alternate;
      g !== null && (g.return = null), s.return = null;
    } catch (y) {
      lt(s, t, y);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) w0(t, e), t = t.sibling;
}
function w0(e, t) {
  var r = e.alternate, o = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (kr(t, e), Fr(e), o & 4) {
        try {
          Ro(3, e, e.return), Ws(3, e);
        } catch (z) {
          lt(e, e.return, z);
        }
        try {
          Ro(5, e, e.return);
        } catch (z) {
          lt(e, e.return, z);
        }
      }
      break;
    case 1:
      kr(t, e), Fr(e), o & 512 && r !== null && Pi(r, r.return);
      break;
    case 5:
      if (kr(t, e), Fr(e), o & 512 && r !== null && Pi(r, r.return), e.flags & 32) {
        var s = e.stateNode;
        try {
          Ao(s, "");
        } catch (z) {
          lt(e, e.return, z);
        }
      }
      if (o & 4 && (s = e.stateNode, s != null)) {
        var a = e.memoizedProps, f = r !== null ? r.memoizedProps : a, p = e.type, g = e.updateQueue;
        if (e.updateQueue = null, g !== null) try {
          p === "input" && a.type === "radio" && a.name != null && Bh(s, a), wu(p, f);
          var y = wu(p, a);
          for (f = 0; f < g.length; f += 2) {
            var w = g[f], D = g[f + 1];
            w === "style" ? Gh(s, D) : w === "dangerouslySetInnerHTML" ? Wh(s, D) : w === "children" ? Ao(s, D) : pc(s, w, D, y);
          }
          switch (p) {
            case "input":
              hu(s, a);
              break;
            case "textarea":
              Uh(s, a);
              break;
            case "select":
              var C = s._wrapperState.wasMultiple;
              s._wrapperState.wasMultiple = !!a.multiple;
              var b = a.value;
              b != null ? Ti(s, !!a.multiple, b, !1) : C !== !!a.multiple && (a.defaultValue != null ? Ti(
                s,
                !!a.multiple,
                a.defaultValue,
                !0
              ) : Ti(s, !!a.multiple, a.multiple ? [] : "", !1));
          }
          s[Uo] = a;
        } catch (z) {
          lt(e, e.return, z);
        }
      }
      break;
    case 6:
      if (kr(t, e), Fr(e), o & 4) {
        if (e.stateNode === null) throw Error(ne(162));
        s = e.stateNode, a = e.memoizedProps;
        try {
          s.nodeValue = a;
        } catch (z) {
          lt(e, e.return, z);
        }
      }
      break;
    case 3:
      if (kr(t, e), Fr(e), o & 4 && r !== null && r.memoizedState.isDehydrated) try {
        Io(t.containerInfo);
      } catch (z) {
        lt(e, e.return, z);
      }
      break;
    case 4:
      kr(t, e), Fr(e);
      break;
    case 13:
      kr(t, e), Fr(e), s = e.child, s.flags & 8192 && (a = s.memoizedState !== null, s.stateNode.isHidden = a, !a || s.alternate !== null && s.alternate.memoizedState !== null || (Gc = st())), o & 4 && Gd(e);
      break;
    case 22:
      if (w = r !== null && r.memoizedState !== null, e.mode & 1 ? (bt = (y = bt) || w, kr(t, e), bt = y) : kr(t, e), Fr(e), o & 8192) {
        if (y = e.memoizedState !== null, (e.stateNode.isHidden = y) && !w && e.mode & 1) for (fe = e, w = e.child; w !== null; ) {
          for (D = fe = w; fe !== null; ) {
            switch (C = fe, b = C.child, C.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ro(4, C, C.return);
                break;
              case 1:
                Pi(C, C.return);
                var j = C.stateNode;
                if (typeof j.componentWillUnmount == "function") {
                  o = C, r = C.return;
                  try {
                    t = o, j.props = t.memoizedProps, j.state = t.memoizedState, j.componentWillUnmount();
                  } catch (z) {
                    lt(o, r, z);
                  }
                }
                break;
              case 5:
                Pi(C, C.return);
                break;
              case 22:
                if (C.memoizedState !== null) {
                  Yd(D);
                  continue;
                }
            }
            b !== null ? (b.return = C, fe = b) : Yd(D);
          }
          w = w.sibling;
        }
        e: for (w = null, D = e; ; ) {
          if (D.tag === 5) {
            if (w === null) {
              w = D;
              try {
                s = D.stateNode, y ? (a = s.style, typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none") : (p = D.stateNode, g = D.memoizedProps.style, f = g != null && g.hasOwnProperty("display") ? g.display : null, p.style.display = Hh("display", f));
              } catch (z) {
                lt(e, e.return, z);
              }
            }
          } else if (D.tag === 6) {
            if (w === null) try {
              D.stateNode.nodeValue = y ? "" : D.memoizedProps;
            } catch (z) {
              lt(e, e.return, z);
            }
          } else if ((D.tag !== 22 && D.tag !== 23 || D.memoizedState === null || D === e) && D.child !== null) {
            D.child.return = D, D = D.child;
            continue;
          }
          if (D === e) break e;
          for (; D.sibling === null; ) {
            if (D.return === null || D.return === e) break e;
            w === D && (w = null), D = D.return;
          }
          w === D && (w = null), D.sibling.return = D.return, D = D.sibling;
        }
      }
      break;
    case 19:
      kr(t, e), Fr(e), o & 4 && Gd(e);
      break;
    case 21:
      break;
    default:
      kr(
        t,
        e
      ), Fr(e);
  }
}
function Fr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null; ) {
          if (g0(r)) {
            var o = r;
            break e;
          }
          r = r.return;
        }
        throw Error(ne(160));
      }
      switch (o.tag) {
        case 5:
          var s = o.stateNode;
          o.flags & 32 && (Ao(s, ""), o.flags &= -33);
          var a = Hd(e);
          Ku(e, a, s);
          break;
        case 3:
        case 4:
          var f = o.stateNode.containerInfo, p = Hd(e);
          Yu(e, p, f);
          break;
        default:
          throw Error(ne(161));
      }
    } catch (g) {
      lt(e, e.return, g);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function nS(e, t, r) {
  fe = e, _0(e);
}
function _0(e, t, r) {
  for (var o = (e.mode & 1) !== 0; fe !== null; ) {
    var s = fe, a = s.child;
    if (s.tag === 22 && o) {
      var f = s.memoizedState !== null || Ol;
      if (!f) {
        var p = s.alternate, g = p !== null && p.memoizedState !== null || bt;
        p = Ol;
        var y = bt;
        if (Ol = f, (bt = g) && !y) for (fe = s; fe !== null; ) f = fe, g = f.child, f.tag === 22 && f.memoizedState !== null ? Kd(s) : g !== null ? (g.return = f, fe = g) : Kd(s);
        for (; a !== null; ) fe = a, _0(a), a = a.sibling;
        fe = s, Ol = p, bt = y;
      }
      Xd(e);
    } else s.subtreeFlags & 8772 && a !== null ? (a.return = s, fe = a) : Xd(e);
  }
}
function Xd(e) {
  for (; fe !== null; ) {
    var t = fe;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            bt || Ws(5, t);
            break;
          case 1:
            var o = t.stateNode;
            if (t.flags & 4 && !bt) if (r === null) o.componentDidMount();
            else {
              var s = t.elementType === t.type ? r.memoizedProps : Sr(t.type, r.memoizedProps);
              o.componentDidUpdate(s, r.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
            }
            var a = t.updateQueue;
            a !== null && Dd(t, a, o);
            break;
          case 3:
            var f = t.updateQueue;
            if (f !== null) {
              if (r = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  r = t.child.stateNode;
                  break;
                case 1:
                  r = t.child.stateNode;
              }
              Dd(t, f, r);
            }
            break;
          case 5:
            var p = t.stateNode;
            if (r === null && t.flags & 4) {
              r = p;
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
                var w = y.memoizedState;
                if (w !== null) {
                  var D = w.dehydrated;
                  D !== null && Io(D);
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
            throw Error(ne(163));
        }
        bt || t.flags & 512 && Xu(t);
      } catch (C) {
        lt(t, t.return, C);
      }
    }
    if (t === e) {
      fe = null;
      break;
    }
    if (r = t.sibling, r !== null) {
      r.return = t.return, fe = r;
      break;
    }
    fe = t.return;
  }
}
function Yd(e) {
  for (; fe !== null; ) {
    var t = fe;
    if (t === e) {
      fe = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      r.return = t.return, fe = r;
      break;
    }
    fe = t.return;
  }
}
function Kd(e) {
  for (; fe !== null; ) {
    var t = fe;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            Ws(4, t);
          } catch (g) {
            lt(t, r, g);
          }
          break;
        case 1:
          var o = t.stateNode;
          if (typeof o.componentDidMount == "function") {
            var s = t.return;
            try {
              o.componentDidMount();
            } catch (g) {
              lt(t, s, g);
            }
          }
          var a = t.return;
          try {
            Xu(t);
          } catch (g) {
            lt(t, a, g);
          }
          break;
        case 5:
          var f = t.return;
          try {
            Xu(t);
          } catch (g) {
            lt(t, f, g);
          }
      }
    } catch (g) {
      lt(t, t.return, g);
    }
    if (t === e) {
      fe = null;
      break;
    }
    var p = t.sibling;
    if (p !== null) {
      p.return = t.return, fe = p;
      break;
    }
    fe = t.return;
  }
}
var iS = Math.ceil, Cs = nn.ReactCurrentDispatcher, Wc = nn.ReactCurrentOwner, fr = nn.ReactCurrentBatchConfig, Oe = 0, vt = null, ut = null, yt = 0, Qt = 0, Ri = An(0), ft = 0, Yo = null, Zn = 0, Hs = 0, Hc = 0, To = null, jt = null, Gc = 0, Ui = 1 / 0, Yr = null, Ps = !1, Qu = null, Cn = null, Il = !1, _n = null, Rs = 0, Lo = 0, Zu = null, ts = -1, rs = 0;
function At() {
  return Oe & 6 ? st() : ts !== -1 ? ts : ts = st();
}
function Pn(e) {
  return e.mode & 1 ? Oe & 2 && yt !== 0 ? yt & -yt : Bk.transition !== null ? (rs === 0 && (rs = iv()), rs) : (e = ze, e !== 0 || (e = window.event, e = e === void 0 ? 16 : fv(e.type)), e) : 1;
}
function Pr(e, t, r, o) {
  if (50 < Lo) throw Lo = 0, Zu = null, Error(ne(185));
  qo(e, r, o), (!(Oe & 2) || e !== vt) && (e === vt && (!(Oe & 2) && (Hs |= r), ft === 4 && gn(e, yt)), Ut(e, o), r === 1 && Oe === 0 && !(t.mode & 1) && (Ui = st() + 500, Bs && $n()));
}
function Ut(e, t) {
  var r = e.callbackNode;
  Bx(e, t);
  var o = fs(e, e === vt ? yt : 0);
  if (o === 0) r !== null && id(r), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = o & -o, e.callbackPriority !== t) {
    if (r != null && id(r), t === 1) e.tag === 0 ? zk(Qd.bind(null, e)) : Lv(Qd.bind(null, e)), Ok(function() {
      !(Oe & 6) && $n();
    }), r = null;
    else {
      switch (ov(o)) {
        case 1:
          r = yc;
          break;
        case 4:
          r = rv;
          break;
        case 16:
          r = cs;
          break;
        case 536870912:
          r = nv;
          break;
        default:
          r = cs;
      }
      r = R0(r, x0.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = r;
  }
}
function x0(e, t) {
  if (ts = -1, rs = 0, Oe & 6) throw Error(ne(327));
  var r = e.callbackNode;
  if ($i() && e.callbackNode !== r) return null;
  var o = fs(e, e === vt ? yt : 0);
  if (o === 0) return null;
  if (o & 30 || o & e.expiredLanes || t) t = Ts(e, o);
  else {
    t = o;
    var s = Oe;
    Oe |= 2;
    var a = S0();
    (vt !== e || yt !== t) && (Yr = null, Ui = st() + 500, Gn(e, t));
    do
      try {
        sS();
        break;
      } catch (p) {
        k0(e, p);
      }
    while (!0);
    Dc(), Cs.current = a, Oe = s, ut !== null ? t = 0 : (vt = null, yt = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (s = Eu(e), s !== 0 && (o = s, t = qu(e, s))), t === 1) throw r = Yo, Gn(e, 0), gn(e, o), Ut(e, st()), r;
    if (t === 6) gn(e, o);
    else {
      if (s = e.current.alternate, !(o & 30) && !oS(s) && (t = Ts(e, o), t === 2 && (a = Eu(e), a !== 0 && (o = a, t = qu(e, a))), t === 1)) throw r = Yo, Gn(e, 0), gn(e, o), Ut(e, st()), r;
      switch (e.finishedWork = s, e.finishedLanes = o, t) {
        case 0:
        case 1:
          throw Error(ne(345));
        case 2:
          Un(e, jt, Yr);
          break;
        case 3:
          if (gn(e, o), (o & 130023424) === o && (t = Gc + 500 - st(), 10 < t)) {
            if (fs(e, 0) !== 0) break;
            if (s = e.suspendedLanes, (s & o) !== o) {
              At(), e.pingedLanes |= e.suspendedLanes & s;
              break;
            }
            e.timeoutHandle = Fu(Un.bind(null, e, jt, Yr), t);
            break;
          }
          Un(e, jt, Yr);
          break;
        case 4:
          if (gn(e, o), (o & 4194240) === o) break;
          for (t = e.eventTimes, s = -1; 0 < o; ) {
            var f = 31 - Cr(o);
            a = 1 << f, f = t[f], f > s && (s = f), o &= ~a;
          }
          if (o = s, o = st() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * iS(o / 1960)) - o, 10 < o) {
            e.timeoutHandle = Fu(Un.bind(null, e, jt, Yr), o);
            break;
          }
          Un(e, jt, Yr);
          break;
        case 5:
          Un(e, jt, Yr);
          break;
        default:
          throw Error(ne(329));
      }
    }
  }
  return Ut(e, st()), e.callbackNode === r ? x0.bind(null, e) : null;
}
function qu(e, t) {
  var r = To;
  return e.current.memoizedState.isDehydrated && (Gn(e, t).flags |= 256), e = Ts(e, t), e !== 2 && (t = jt, jt = r, t !== null && Ju(t)), e;
}
function Ju(e) {
  jt === null ? jt = e : jt.push.apply(jt, e);
}
function oS(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && (r = r.stores, r !== null)) for (var o = 0; o < r.length; o++) {
        var s = r[o], a = s.getSnapshot;
        s = s.value;
        try {
          if (!Rr(a(), s)) return !1;
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
function gn(e, t) {
  for (t &= ~Hc, t &= ~Hs, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var r = 31 - Cr(t), o = 1 << r;
    e[r] = -1, t &= ~o;
  }
}
function Qd(e) {
  if (Oe & 6) throw Error(ne(327));
  $i();
  var t = fs(e, 0);
  if (!(t & 1)) return Ut(e, st()), null;
  var r = Ts(e, t);
  if (e.tag !== 0 && r === 2) {
    var o = Eu(e);
    o !== 0 && (t = o, r = qu(e, o));
  }
  if (r === 1) throw r = Yo, Gn(e, 0), gn(e, t), Ut(e, st()), r;
  if (r === 6) throw Error(ne(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Un(e, jt, Yr), Ut(e, st()), null;
}
function Xc(e, t) {
  var r = Oe;
  Oe |= 1;
  try {
    return e(t);
  } finally {
    Oe = r, Oe === 0 && (Ui = st() + 500, Bs && $n());
  }
}
function qn(e) {
  _n !== null && _n.tag === 0 && !(Oe & 6) && $i();
  var t = Oe;
  Oe |= 1;
  var r = fr.transition, o = ze;
  try {
    if (fr.transition = null, ze = 1, e) return e();
  } finally {
    ze = o, fr.transition = r, Oe = t, !(Oe & 6) && $n();
  }
}
function Yc() {
  Qt = Ri.current, Ze(Ri);
}
function Gn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var r = e.timeoutHandle;
  if (r !== -1 && (e.timeoutHandle = -1, Mk(r)), ut !== null) for (r = ut.return; r !== null; ) {
    var o = r;
    switch (Rc(o), o.tag) {
      case 1:
        o = o.type.childContextTypes, o != null && ms();
        break;
      case 3:
        zi(), Ze(zt), Ze(Ct), Ic();
        break;
      case 5:
        Oc(o);
        break;
      case 4:
        zi();
        break;
      case 13:
        Ze(rt);
        break;
      case 19:
        Ze(rt);
        break;
      case 10:
        Fc(o.type._context);
        break;
      case 22:
      case 23:
        Yc();
    }
    r = r.return;
  }
  if (vt = e, ut = e = Rn(e.current, null), yt = Qt = t, ft = 0, Yo = null, Hc = Hs = Zn = 0, jt = To = null, Wn !== null) {
    for (t = 0; t < Wn.length; t++) if (r = Wn[t], o = r.interleaved, o !== null) {
      r.interleaved = null;
      var s = o.next, a = r.pending;
      if (a !== null) {
        var f = a.next;
        a.next = s, o.next = f;
      }
      r.pending = o;
    }
    Wn = null;
  }
  return e;
}
function k0(e, t) {
  do {
    var r = ut;
    try {
      if (Dc(), ql.current = bs, Es) {
        for (var o = nt.memoizedState; o !== null; ) {
          var s = o.queue;
          s !== null && (s.pending = null), o = o.next;
        }
        Es = !1;
      }
      if (Qn = 0, ht = ct = nt = null, Po = !1, Ho = 0, Wc.current = null, r === null || r.return === null) {
        ft = 1, Yo = t, ut = null;
        break;
      }
      e: {
        var a = e, f = r.return, p = r, g = t;
        if (t = yt, p.flags |= 32768, g !== null && typeof g == "object" && typeof g.then == "function") {
          var y = g, w = p, D = w.tag;
          if (!(w.mode & 1) && (D === 0 || D === 11 || D === 15)) {
            var C = w.alternate;
            C ? (w.updateQueue = C.updateQueue, w.memoizedState = C.memoizedState, w.lanes = C.lanes) : (w.updateQueue = null, w.memoizedState = null);
          }
          var b = Id(f);
          if (b !== null) {
            b.flags &= -257, jd(b, f, p, a, t), b.mode & 1 && Od(a, y, t), t = b, g = y;
            var j = t.updateQueue;
            if (j === null) {
              var z = /* @__PURE__ */ new Set();
              z.add(g), t.updateQueue = z;
            } else j.add(g);
            break e;
          } else {
            if (!(t & 1)) {
              Od(a, y, t), Kc();
              break e;
            }
            g = Error(ne(426));
          }
        } else if (tt && p.mode & 1) {
          var Q = Id(f);
          if (Q !== null) {
            !(Q.flags & 65536) && (Q.flags |= 256), jd(Q, f, p, a, t), Tc(Bi(g, p));
            break e;
          }
        }
        a = g = Bi(g, p), ft !== 4 && (ft = 2), To === null ? To = [a] : To.push(a), a = f;
        do {
          switch (a.tag) {
            case 3:
              a.flags |= 65536, t &= -t, a.lanes |= t;
              var x = o0(a, g, t);
              Ld(a, x);
              break e;
            case 1:
              p = g;
              var k = a.type, E = a.stateNode;
              if (!(a.flags & 128) && (typeof k.getDerivedStateFromError == "function" || E !== null && typeof E.componentDidCatch == "function" && (Cn === null || !Cn.has(E)))) {
                a.flags |= 65536, t &= -t, a.lanes |= t;
                var P = l0(a, p, t);
                Ld(a, P);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      b0(r);
    } catch (B) {
      t = B, ut === r && r !== null && (ut = r = r.return);
      continue;
    }
    break;
  } while (!0);
}
function S0() {
  var e = Cs.current;
  return Cs.current = bs, e === null ? bs : e;
}
function Kc() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), vt === null || !(Zn & 268435455) && !(Hs & 268435455) || gn(vt, yt);
}
function Ts(e, t) {
  var r = Oe;
  Oe |= 2;
  var o = S0();
  (vt !== e || yt !== t) && (Yr = null, Gn(e, t));
  do
    try {
      lS();
      break;
    } catch (s) {
      k0(e, s);
    }
  while (!0);
  if (Dc(), Oe = r, Cs.current = o, ut !== null) throw Error(ne(261));
  return vt = null, yt = 0, ft;
}
function lS() {
  for (; ut !== null; ) E0(ut);
}
function sS() {
  for (; ut !== null && !Fx(); ) E0(ut);
}
function E0(e) {
  var t = P0(e.alternate, e, Qt);
  e.memoizedProps = e.pendingProps, t === null ? b0(e) : ut = t, Wc.current = null;
}
function b0(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (r = eS(r, t), r !== null) {
        r.flags &= 32767, ut = r;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, ut = null;
        return;
      }
    } else if (r = Jk(r, t, Qt), r !== null) {
      ut = r;
      return;
    }
    if (t = t.sibling, t !== null) {
      ut = t;
      return;
    }
    ut = t = e;
  } while (t !== null);
  ft === 0 && (ft = 5);
}
function Un(e, t, r) {
  var o = ze, s = fr.transition;
  try {
    fr.transition = null, ze = 1, aS(e, t, r, o);
  } finally {
    fr.transition = s, ze = o;
  }
  return null;
}
function aS(e, t, r, o) {
  do
    $i();
  while (_n !== null);
  if (Oe & 6) throw Error(ne(327));
  r = e.finishedWork;
  var s = e.finishedLanes;
  if (r === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(ne(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var a = r.lanes | r.childLanes;
  if (Ux(e, a), e === vt && (ut = vt = null, yt = 0), !(r.subtreeFlags & 2064) && !(r.flags & 2064) || Il || (Il = !0, R0(cs, function() {
    return $i(), null;
  })), a = (r.flags & 15990) !== 0, r.subtreeFlags & 15990 || a) {
    a = fr.transition, fr.transition = null;
    var f = ze;
    ze = 1;
    var p = Oe;
    Oe |= 4, Wc.current = null, rS(e, r), w0(r, e), Rk(Lu), ds = !!Tu, Lu = Tu = null, e.current = r, nS(r), Ax(), Oe = p, ze = f, fr.transition = a;
  } else e.current = r;
  if (Il && (Il = !1, _n = e, Rs = s), a = e.pendingLanes, a === 0 && (Cn = null), Ox(r.stateNode), Ut(e, st()), t !== null) for (o = e.onRecoverableError, r = 0; r < t.length; r++) s = t[r], o(s.value, { componentStack: s.stack, digest: s.digest });
  if (Ps) throw Ps = !1, e = Qu, Qu = null, e;
  return Rs & 1 && e.tag !== 0 && $i(), a = e.pendingLanes, a & 1 ? e === Zu ? Lo++ : (Lo = 0, Zu = e) : Lo = 0, $n(), null;
}
function $i() {
  if (_n !== null) {
    var e = ov(Rs), t = fr.transition, r = ze;
    try {
      if (fr.transition = null, ze = 16 > e ? 16 : e, _n === null) var o = !1;
      else {
        if (e = _n, _n = null, Rs = 0, Oe & 6) throw Error(ne(331));
        var s = Oe;
        for (Oe |= 4, fe = e.current; fe !== null; ) {
          var a = fe, f = a.child;
          if (fe.flags & 16) {
            var p = a.deletions;
            if (p !== null) {
              for (var g = 0; g < p.length; g++) {
                var y = p[g];
                for (fe = y; fe !== null; ) {
                  var w = fe;
                  switch (w.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ro(8, w, a);
                  }
                  var D = w.child;
                  if (D !== null) D.return = w, fe = D;
                  else for (; fe !== null; ) {
                    w = fe;
                    var C = w.sibling, b = w.return;
                    if (m0(w), w === y) {
                      fe = null;
                      break;
                    }
                    if (C !== null) {
                      C.return = b, fe = C;
                      break;
                    }
                    fe = b;
                  }
                }
              }
              var j = a.alternate;
              if (j !== null) {
                var z = j.child;
                if (z !== null) {
                  j.child = null;
                  do {
                    var Q = z.sibling;
                    z.sibling = null, z = Q;
                  } while (z !== null);
                }
              }
              fe = a;
            }
          }
          if (a.subtreeFlags & 2064 && f !== null) f.return = a, fe = f;
          else e: for (; fe !== null; ) {
            if (a = fe, a.flags & 2048) switch (a.tag) {
              case 0:
              case 11:
              case 15:
                Ro(9, a, a.return);
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, fe = x;
              break e;
            }
            fe = a.return;
          }
        }
        var k = e.current;
        for (fe = k; fe !== null; ) {
          f = fe;
          var E = f.child;
          if (f.subtreeFlags & 2064 && E !== null) E.return = f, fe = E;
          else e: for (f = k; fe !== null; ) {
            if (p = fe, p.flags & 2048) try {
              switch (p.tag) {
                case 0:
                case 11:
                case 15:
                  Ws(9, p);
              }
            } catch (B) {
              lt(p, p.return, B);
            }
            if (p === f) {
              fe = null;
              break e;
            }
            var P = p.sibling;
            if (P !== null) {
              P.return = p.return, fe = P;
              break e;
            }
            fe = p.return;
          }
        }
        if (Oe = s, $n(), Ir && typeof Ir.onPostCommitFiberRoot == "function") try {
          Ir.onPostCommitFiberRoot(Os, e);
        } catch {
        }
        o = !0;
      }
      return o;
    } finally {
      ze = r, fr.transition = t;
    }
  }
  return !1;
}
function Zd(e, t, r) {
  t = Bi(r, t), t = o0(e, t, 1), e = bn(e, t, 1), t = At(), e !== null && (qo(e, 1, t), Ut(e, t));
}
function lt(e, t, r) {
  if (e.tag === 3) Zd(e, e, r);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Zd(t, e, r);
      break;
    } else if (t.tag === 1) {
      var o = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Cn === null || !Cn.has(o))) {
        e = Bi(r, e), e = l0(t, e, 1), t = bn(t, e, 1), e = At(), t !== null && (qo(t, 1, e), Ut(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function uS(e, t, r) {
  var o = e.pingCache;
  o !== null && o.delete(t), t = At(), e.pingedLanes |= e.suspendedLanes & r, vt === e && (yt & r) === r && (ft === 4 || ft === 3 && (yt & 130023424) === yt && 500 > st() - Gc ? Gn(e, 0) : Hc |= r), Ut(e, t);
}
function C0(e, t) {
  t === 0 && (e.mode & 1 ? (t = Pl, Pl <<= 1, !(Pl & 130023424) && (Pl = 4194304)) : t = 1);
  var r = At();
  e = tn(e, t), e !== null && (qo(e, t, r), Ut(e, r));
}
function cS(e) {
  var t = e.memoizedState, r = 0;
  t !== null && (r = t.retryLane), C0(e, r);
}
function fS(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var o = e.stateNode, s = e.memoizedState;
      s !== null && (r = s.retryLane);
      break;
    case 19:
      o = e.stateNode;
      break;
    default:
      throw Error(ne(314));
  }
  o !== null && o.delete(t), C0(e, r);
}
var P0;
P0 = function(e, t, r) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || zt.current) Nt = !0;
  else {
    if (!(e.lanes & r) && !(t.flags & 128)) return Nt = !1, qk(e, t, r);
    Nt = !!(e.flags & 131072);
  }
  else Nt = !1, tt && t.flags & 1048576 && Dv(t, ws, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var o = t.type;
      es(e, t), e = t.pendingProps;
      var s = Ii(t, Ct.current);
      Ai(t, r), s = Nc(null, t, o, e, s, r);
      var a = zc();
      return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Bt(o) ? (a = !0, gs(t)) : a = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, $c(t), s.updater = Vs, t.stateNode = s, s._reactInternals = t, Nu(t, o, e, r), t = Uu(null, t, o, !0, a, r)) : (t.tag = 0, tt && a && Pc(t), Ft(null, t, s, r), t = t.child), t;
    case 16:
      o = t.elementType;
      e: {
        switch (es(e, t), e = t.pendingProps, s = o._init, o = s(o._payload), t.type = o, s = t.tag = pS(o), e = Sr(o, e), s) {
          case 0:
            t = Bu(null, t, o, e, r);
            break e;
          case 1:
            t = Bd(null, t, o, e, r);
            break e;
          case 11:
            t = Nd(null, t, o, e, r);
            break e;
          case 14:
            t = zd(null, t, o, Sr(o.type, e), r);
            break e;
        }
        throw Error(ne(
          306,
          o,
          ""
        ));
      }
      return t;
    case 0:
      return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Sr(o, s), Bu(e, t, o, s, r);
    case 1:
      return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Sr(o, s), Bd(e, t, o, s, r);
    case 3:
      e: {
        if (c0(t), e === null) throw Error(ne(387));
        o = t.pendingProps, a = t.memoizedState, s = a.element, Iv(e, t), ks(t, o, null, r);
        var f = t.memoizedState;
        if (o = f.element, a.isDehydrated) if (a = { element: o, isDehydrated: !1, cache: f.cache, pendingSuspenseBoundaries: f.pendingSuspenseBoundaries, transitions: f.transitions }, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
          s = Bi(Error(ne(423)), t), t = Ud(e, t, o, r, s);
          break e;
        } else if (o !== s) {
          s = Bi(Error(ne(424)), t), t = Ud(e, t, o, r, s);
          break e;
        } else for (Zt = En(t.stateNode.containerInfo.firstChild), qt = t, tt = !0, br = null, r = Mv(t, null, o, r), t.child = r; r; ) r.flags = r.flags & -3 | 4096, r = r.sibling;
        else {
          if (ji(), o === s) {
            t = rn(e, t, r);
            break e;
          }
          Ft(e, t, o, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return jv(t), e === null && Ou(t), o = t.type, s = t.pendingProps, a = e !== null ? e.memoizedProps : null, f = s.children, Du(o, s) ? f = null : a !== null && Du(o, a) && (t.flags |= 32), u0(e, t), Ft(e, t, f, r), t.child;
    case 6:
      return e === null && Ou(t), null;
    case 13:
      return f0(e, t, r);
    case 4:
      return Mc(t, t.stateNode.containerInfo), o = t.pendingProps, e === null ? t.child = Ni(t, null, o, r) : Ft(e, t, o, r), t.child;
    case 11:
      return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Sr(o, s), Nd(e, t, o, s, r);
    case 7:
      return Ft(e, t, t.pendingProps, r), t.child;
    case 8:
      return Ft(e, t, t.pendingProps.children, r), t.child;
    case 12:
      return Ft(e, t, t.pendingProps.children, r), t.child;
    case 10:
      e: {
        if (o = t.type._context, s = t.pendingProps, a = t.memoizedProps, f = s.value, Ke(_s, o._currentValue), o._currentValue = f, a !== null) if (Rr(a.value, f)) {
          if (a.children === s.children && !zt.current) {
            t = rn(e, t, r);
            break e;
          }
        } else for (a = t.child, a !== null && (a.return = t); a !== null; ) {
          var p = a.dependencies;
          if (p !== null) {
            f = a.child;
            for (var g = p.firstContext; g !== null; ) {
              if (g.context === o) {
                if (a.tag === 1) {
                  g = qr(-1, r & -r), g.tag = 2;
                  var y = a.updateQueue;
                  if (y !== null) {
                    y = y.shared;
                    var w = y.pending;
                    w === null ? g.next = g : (g.next = w.next, w.next = g), y.pending = g;
                  }
                }
                a.lanes |= r, g = a.alternate, g !== null && (g.lanes |= r), Iu(
                  a.return,
                  r,
                  t
                ), p.lanes |= r;
                break;
              }
              g = g.next;
            }
          } else if (a.tag === 10) f = a.type === t.type ? null : a.child;
          else if (a.tag === 18) {
            if (f = a.return, f === null) throw Error(ne(341));
            f.lanes |= r, p = f.alternate, p !== null && (p.lanes |= r), Iu(f, r, t), f = a.sibling;
          } else f = a.child;
          if (f !== null) f.return = a;
          else for (f = a; f !== null; ) {
            if (f === t) {
              f = null;
              break;
            }
            if (a = f.sibling, a !== null) {
              a.return = f.return, f = a;
              break;
            }
            f = f.return;
          }
          a = f;
        }
        Ft(e, t, s.children, r), t = t.child;
      }
      return t;
    case 9:
      return s = t.type, o = t.pendingProps.children, Ai(t, r), s = dr(s), o = o(s), t.flags |= 1, Ft(e, t, o, r), t.child;
    case 14:
      return o = t.type, s = Sr(o, t.pendingProps), s = Sr(o.type, s), zd(e, t, o, s, r);
    case 15:
      return s0(e, t, t.type, t.pendingProps, r);
    case 17:
      return o = t.type, s = t.pendingProps, s = t.elementType === o ? s : Sr(o, s), es(e, t), t.tag = 1, Bt(o) ? (e = !0, gs(t)) : e = !1, Ai(t, r), i0(t, o, s), Nu(t, o, s, r), Uu(null, t, o, !0, e, r);
    case 19:
      return d0(e, t, r);
    case 22:
      return a0(e, t, r);
  }
  throw Error(ne(156, t.tag));
};
function R0(e, t) {
  return tv(e, t);
}
function dS(e, t, r, o) {
  this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function cr(e, t, r, o) {
  return new dS(e, t, r, o);
}
function Qc(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function pS(e) {
  if (typeof e == "function") return Qc(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === vc) return 11;
    if (e === mc) return 14;
  }
  return 2;
}
function Rn(e, t) {
  var r = e.alternate;
  return r === null ? (r = cr(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r;
}
function ns(e, t, r, o, s, a) {
  var f = 2;
  if (o = e, typeof e == "function") Qc(e) && (f = 1);
  else if (typeof e == "string") f = 5;
  else e: switch (e) {
    case yi:
      return Xn(r.children, s, a, t);
    case hc:
      f = 8, s |= 8;
      break;
    case uu:
      return e = cr(12, r, t, s | 2), e.elementType = uu, e.lanes = a, e;
    case cu:
      return e = cr(13, r, t, s), e.elementType = cu, e.lanes = a, e;
    case fu:
      return e = cr(19, r, t, s), e.elementType = fu, e.lanes = a, e;
    case jh:
      return Gs(r, s, a, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Oh:
          f = 10;
          break e;
        case Ih:
          f = 9;
          break e;
        case vc:
          f = 11;
          break e;
        case mc:
          f = 14;
          break e;
        case hn:
          f = 16, o = null;
          break e;
      }
      throw Error(ne(130, e == null ? e : typeof e, ""));
  }
  return t = cr(f, r, t, s), t.elementType = e, t.type = o, t.lanes = a, t;
}
function Xn(e, t, r, o) {
  return e = cr(7, e, o, t), e.lanes = r, e;
}
function Gs(e, t, r, o) {
  return e = cr(22, e, o, t), e.elementType = jh, e.lanes = r, e.stateNode = { isHidden: !1 }, e;
}
function Va(e, t, r) {
  return e = cr(6, e, null, t), e.lanes = r, e;
}
function Wa(e, t, r) {
  return t = cr(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function hS(e, t, r, o, s) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ea(0), this.expirationTimes = Ea(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ea(0), this.identifierPrefix = o, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
}
function Zc(e, t, r, o, s, a, f, p, g) {
  return e = new hS(e, t, r, p, g), t === 1 ? (t = 1, a === !0 && (t |= 8)) : t = 0, a = cr(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = { element: o, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, $c(a), e;
}
function vS(e, t, r) {
  var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: gi, key: o == null ? null : "" + o, children: e, containerInfo: t, implementation: r };
}
function T0(e) {
  if (!e) return Ln;
  e = e._reactInternals;
  e: {
    if (ti(e) !== e || e.tag !== 1) throw Error(ne(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Bt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(ne(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Bt(r)) return Tv(e, r, t);
  }
  return t;
}
function L0(e, t, r, o, s, a, f, p, g) {
  return e = Zc(r, o, !0, e, s, a, f, p, g), e.context = T0(null), r = e.current, o = At(), s = Pn(r), a = qr(o, s), a.callback = t ?? null, bn(r, a, s), e.current.lanes = s, qo(e, s, o), Ut(e, o), e;
}
function Xs(e, t, r, o) {
  var s = t.current, a = At(), f = Pn(s);
  return r = T0(r), t.context === null ? t.context = r : t.pendingContext = r, t = qr(a, f), t.payload = { element: e }, o = o === void 0 ? null : o, o !== null && (t.callback = o), e = bn(s, t, f), e !== null && (Pr(e, s, f, a), Zl(e, s, f)), f;
}
function Ls(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function qd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function qc(e, t) {
  qd(e, t), (e = e.alternate) && qd(e, t);
}
function mS() {
  return null;
}
var D0 = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Jc(e) {
  this._internalRoot = e;
}
Ys.prototype.render = Jc.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(ne(409));
  Xs(e, t, null, null);
};
Ys.prototype.unmount = Jc.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    qn(function() {
      Xs(null, e, null, null);
    }), t[en] = null;
  }
};
function Ys(e) {
  this._internalRoot = e;
}
Ys.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = av();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < mn.length && t !== 0 && t < mn[r].priority; r++) ;
    mn.splice(r, 0, e), r === 0 && cv(e);
  }
};
function ef(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ks(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Jd() {
}
function gS(e, t, r, o, s) {
  if (s) {
    if (typeof o == "function") {
      var a = o;
      o = function() {
        var y = Ls(f);
        a.call(y);
      };
    }
    var f = L0(t, o, e, 0, null, !1, !1, "", Jd);
    return e._reactRootContainer = f, e[en] = f.current, zo(e.nodeType === 8 ? e.parentNode : e), qn(), f;
  }
  for (; s = e.lastChild; ) e.removeChild(s);
  if (typeof o == "function") {
    var p = o;
    o = function() {
      var y = Ls(g);
      p.call(y);
    };
  }
  var g = Zc(e, 0, !1, null, null, !1, !1, "", Jd);
  return e._reactRootContainer = g, e[en] = g.current, zo(e.nodeType === 8 ? e.parentNode : e), qn(function() {
    Xs(t, g, r, o);
  }), g;
}
function Qs(e, t, r, o, s) {
  var a = r._reactRootContainer;
  if (a) {
    var f = a;
    if (typeof s == "function") {
      var p = s;
      s = function() {
        var g = Ls(f);
        p.call(g);
      };
    }
    Xs(t, f, e, s);
  } else f = gS(r, t, e, s, o);
  return Ls(f);
}
lv = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = _o(t.pendingLanes);
        r !== 0 && (wc(t, r | 1), Ut(t, st()), !(Oe & 6) && (Ui = st() + 500, $n()));
      }
      break;
    case 13:
      qn(function() {
        var o = tn(e, 1);
        if (o !== null) {
          var s = At();
          Pr(o, e, 1, s);
        }
      }), qc(e, 1);
  }
};
_c = function(e) {
  if (e.tag === 13) {
    var t = tn(e, 134217728);
    if (t !== null) {
      var r = At();
      Pr(t, e, 134217728, r);
    }
    qc(e, 134217728);
  }
};
sv = function(e) {
  if (e.tag === 13) {
    var t = Pn(e), r = tn(e, t);
    if (r !== null) {
      var o = At();
      Pr(r, e, t, o);
    }
    qc(e, t);
  }
};
av = function() {
  return ze;
};
uv = function(e, t) {
  var r = ze;
  try {
    return ze = e, t();
  } finally {
    ze = r;
  }
};
xu = function(e, t, r) {
  switch (t) {
    case "input":
      if (hu(e, r), t = r.name, r.type === "radio" && t != null) {
        for (r = e; r.parentNode; ) r = r.parentNode;
        for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== e && o.form === e.form) {
            var s = zs(o);
            if (!s) throw Error(ne(90));
            zh(o), hu(o, s);
          }
        }
      }
      break;
    case "textarea":
      Uh(e, r);
      break;
    case "select":
      t = r.value, t != null && Ti(e, !!r.multiple, t, !1);
  }
};
Kh = Xc;
Qh = qn;
var yS = { usingClientEntryPoint: !1, Events: [el, ki, zs, Xh, Yh, Xc] }, mo = { findFiberByHostInstance: Vn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, wS = { bundleType: mo.bundleType, version: mo.version, rendererPackageName: mo.rendererPackageName, rendererConfig: mo.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: nn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Jh(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: mo.findFiberByHostInstance || mS, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var jl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!jl.isDisabled && jl.supportsFiber) try {
    Os = jl.inject(wS), Ir = jl;
  } catch {
  }
}
er.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yS;
er.createPortal = function(e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ef(t)) throw Error(ne(200));
  return vS(e, t, null, r);
};
er.createRoot = function(e, t) {
  if (!ef(e)) throw Error(ne(299));
  var r = !1, o = "", s = D0;
  return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Zc(e, 1, !1, null, null, r, !1, o, s), e[en] = t.current, zo(e.nodeType === 8 ? e.parentNode : e), new Jc(t);
};
er.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(ne(188)) : (e = Object.keys(e).join(","), Error(ne(268, e)));
  return e = Jh(t), e = e === null ? null : e.stateNode, e;
};
er.flushSync = function(e) {
  return qn(e);
};
er.hydrate = function(e, t, r) {
  if (!Ks(t)) throw Error(ne(200));
  return Qs(null, e, t, !0, r);
};
er.hydrateRoot = function(e, t, r) {
  if (!ef(e)) throw Error(ne(405));
  var o = r != null && r.hydratedSources || null, s = !1, a = "", f = D0;
  if (r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (a = r.identifierPrefix), r.onRecoverableError !== void 0 && (f = r.onRecoverableError)), t = L0(t, null, e, 1, r ?? null, s, !1, a, f), e[en] = t.current, zo(e), o) for (e = 0; e < o.length; e++) r = o[e], s = r._getVersion, s = s(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, s] : t.mutableSourceEagerHydrationData.push(
    r,
    s
  );
  return new Ys(t);
};
er.render = function(e, t, r) {
  if (!Ks(t)) throw Error(ne(200));
  return Qs(null, e, t, !1, r);
};
er.unmountComponentAtNode = function(e) {
  if (!Ks(e)) throw Error(ne(40));
  return e._reactRootContainer ? (qn(function() {
    Qs(null, null, e, !1, function() {
      e._reactRootContainer = null, e[en] = null;
    });
  }), !0) : !1;
};
er.unstable_batchedUpdates = Xc;
er.unstable_renderSubtreeIntoContainer = function(e, t, r, o) {
  if (!Ks(r)) throw Error(ne(200));
  if (e == null || e._reactInternals === void 0) throw Error(ne(38));
  return Qs(e, t, r, !1, o);
};
er.version = "18.3.1-next-f1338f8080-20240426";
function F0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(F0);
    } catch (e) {
      console.error(e);
    }
}
F0(), Fh.exports = er;
var Ds = Fh.exports, A0, ep = Ds;
A0 = ep.createRoot, ep.hydrateRoot;
async function _S(e = {}) {
  var Uf, Vf, Wf;
  var t, r = e, o = !!globalThis.window, s = !!globalThis.WorkerGlobalScope, a = ((Vf = (Uf = globalThis.process) == null ? void 0 : Uf.versions) == null ? void 0 : Vf.node) && ((Wf = globalThis.process) == null ? void 0 : Wf.type) != "renderer";
  if (a) {
    const { createRequire: n } = await Promise.resolve().then(() => f4);
    var f = n(import.meta.url);
  }
  var p = "./this.program", g = (n, i) => {
    throw i;
  }, y = import.meta.url, w = "";
  function D(n) {
    return r.locateFile ? r.locateFile(n, w) : w + n;
  }
  var C, b;
  if (a) {
    var j = f("node:fs");
    y.startsWith("file:") && (w = f("node:path").dirname(f("node:url").fileURLToPath(y)) + "/"), b = (n) => {
      n = P(n) ? new URL(n) : n;
      var i = j.readFileSync(n);
      return i;
    }, C = async (n, i = !0) => {
      n = P(n) ? new URL(n) : n;
      var l = j.readFileSync(n, i ? void 0 : "utf8");
      return l;
    }, process.argv.length > 1 && (p = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), g = (n, i) => {
      throw process.exitCode = n, i;
    };
  } else if (o || s) {
    try {
      w = new URL(".", y).href;
    } catch {
    }
    s && (b = (n) => {
      var i = new XMLHttpRequest();
      return i.open("GET", n, !1), i.responseType = "arraybuffer", i.send(null), new Uint8Array(i.response);
    }), C = async (n) => {
      if (P(n))
        return new Promise((l, u) => {
          var c = new XMLHttpRequest();
          c.open("GET", n, !0), c.responseType = "arraybuffer", c.onload = () => {
            if (c.status == 200 || c.status == 0 && c.response) {
              l(c.response);
              return;
            }
            u(c.status);
          }, c.onerror = u, c.send(null);
        });
      var i = await fetch(n, { credentials: "same-origin" });
      if (i.ok)
        return i.arrayBuffer();
      throw new Error(i.status + " : " + i.url);
    };
  }
  var z = console.log.bind(console), Q = console.error.bind(console), x, k = !1, E, P = (n) => n.startsWith("file://"), B, U, A, I, $, F, S, Z, ue, Pe, Se, Te, dt = !1;
  function ae() {
    var n = xl.buffer;
    A = new Int8Array(n), $ = new Int16Array(n), r.HEAPU8 = I = new Uint8Array(n), F = new Uint16Array(n), S = new Int32Array(n), Z = new Uint32Array(n), ue = new Float32Array(n), Pe = new Float64Array(n), Se = new BigInt64Array(n), Te = new BigUint64Array(n);
  }
  function ye() {
    if (r.preRun)
      for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; )
        Mn(r.preRun.shift());
    ii(yr);
  }
  function xe() {
    dt = !0, !r.noFSInit && !v.initialized && v.init(), _e.root = v.mount(_e, {}, null), zn.Uc(), v.ignorePermissions = !1;
  }
  function We() {
    if (r.postRun)
      for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; )
        nr(r.postRun.shift());
    ii(gr);
  }
  function De(n) {
    var l;
    (l = r.onAbort) == null || l.call(r, n), n = "Aborted(" + n + ")", Q(n), k = !0, n += ". Build with -sASSERTIONS for more info.", dt && Af();
    var i = new WebAssembly.RuntimeError(n);
    throw U == null || U(i), i;
  }
  var Vt;
  function Wt() {
    return r.locateFile ? D("ImFusionLib.wasm") : new URL("ImFusionLib.wasm".concat(""), import.meta.url).href;
  }
  function vr(n) {
    if (n == Vt && x)
      return new Uint8Array(x);
    if (b)
      return b(n);
    throw "both async and sync fetching of the wasm failed";
  }
  async function mt(n) {
    if (!x)
      try {
        var i = await C(n);
        return new Uint8Array(i);
      } catch {
      }
    return vr(n);
  }
  async function mr(n, i) {
    try {
      var l = await mt(n), u = await WebAssembly.instantiate(l, i);
      return u;
    } catch (c) {
      Q(`failed to asynchronously prepare wasm: ${c}`), De(c);
    }
  }
  async function on(n, i, l) {
    if (!n && !P(i) && !a)
      try {
        var u = fetch(i, { credentials: "same-origin" }), c = await WebAssembly.instantiateStreaming(u, l);
        return c;
      } catch (d) {
        Q(`wasm streaming compile failed: ${d}`), Q("falling back to ArrayBuffer instantiation");
      }
    return mr(i, l);
  }
  function rr() {
    var n = { a: H2 };
    return n;
  }
  async function Nr() {
    function n(d, h) {
      return zn = d.exports, zn = G2(zn), W2(zn), ae(), zn;
    }
    function i(d) {
      return n(d.instance);
    }
    var l = rr();
    if (r.instantiateWasm)
      return new Promise((d, h) => {
        r.instantiateWasm(l, (m, _) => {
          d(n(m));
        });
      });
    Vt ?? (Vt = Wt());
    var u = await on(x, Vt, l), c = i(u);
    return c;
  }
  class ln {
    constructor(i) {
      Ye(this, "name", "ExitStatus");
      this.message = `Program terminated with exit(${i})`, this.status = i;
    }
  }
  var ii = (n) => {
    for (; n.length > 0; )
      n.shift()(r);
  }, gr = [], nr = (n) => gr.push(n), yr = [], Mn = (n) => yr.push(n), _t = !0, $e = { isAbs: (n) => n.charAt(0) === "/", splitPath: (n) => {
    var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return i.exec(n).slice(1);
  }, normalizeArray: (n, i) => {
    for (var l = 0, u = n.length - 1; u >= 0; u--) {
      var c = n[u];
      c === "." ? n.splice(u, 1) : c === ".." ? (n.splice(u, 1), l++) : l && (n.splice(u, 1), l--);
    }
    if (i)
      for (; l; l--)
        n.unshift("..");
    return n;
  }, normalize: (n) => {
    var i = $e.isAbs(n), l = n.slice(-1) === "/";
    return n = $e.normalizeArray(n.split("/").filter((u) => !!u), !i).join("/"), !n && !i && (n = "."), n && l && (n += "/"), (i ? "/" : "") + n;
  }, dirname: (n) => {
    var i = $e.splitPath(n), l = i[0], u = i[1];
    return !l && !u ? "." : (u && (u = u.slice(0, -1)), l + u);
  }, basename: (n) => n && n.match(/([^\/]+|\/)\/*$/)[1], join: (...n) => $e.normalize(n.join("/")), join2: (n, i) => $e.normalize(n + "/" + i) }, Xi = () => {
    if (a) {
      var n = f("node:crypto");
      return (i) => n.randomFillSync(i);
    }
    return (i) => crypto.getRandomValues(i);
  }, Pt = (n) => {
    (Pt = Xi())(n);
  }, Ue = { resolve: (...n) => {
    for (var i = "", l = !1, u = n.length - 1; u >= -1 && !l; u--) {
      var c = u >= 0 ? n[u] : v.cwd();
      if (typeof c != "string")
        throw new TypeError("Arguments to path.resolve must be strings");
      if (!c)
        return "";
      i = c + "/" + i, l = $e.isAbs(c);
    }
    return i = $e.normalizeArray(i.split("/").filter((d) => !!d), !l).join("/"), (l ? "/" : "") + i || ".";
  }, relative: (n, i) => {
    n = Ue.resolve(n).slice(1), i = Ue.resolve(i).slice(1);
    function l(T) {
      for (var O = 0; O < T.length && T[O] === ""; O++)
        ;
      for (var K = T.length - 1; K >= 0 && T[K] === ""; K--)
        ;
      return O > K ? [] : T.slice(O, K - O + 1);
    }
    for (var u = l(n.split("/")), c = l(i.split("/")), d = Math.min(u.length, c.length), h = d, m = 0; m < d; m++)
      if (u[m] !== c[m]) {
        h = m;
        break;
      }
    for (var _ = [], m = h; m < u.length; m++)
      _.push("..");
    return _ = _.concat(c.slice(h)), _.join("/");
  } }, sn = globalThis.TextDecoder && new TextDecoder(), zr = (n, i, l, u) => {
    var c = i + l;
    if (u) return c;
    for (; n[i] && !(i >= c); ) ++i;
    return i;
  }, Ht = (n, i = 0, l, u) => {
    i >>>= 0;
    var c = zr(n, i, l, u);
    if (c - i > 16 && n.buffer && sn)
      return sn.decode(n.subarray(i, c));
    for (var d = ""; i < c; ) {
      var h = n[i++];
      if (!(h & 128)) {
        d += String.fromCharCode(h);
        continue;
      }
      var m = n[i++] & 63;
      if ((h & 224) == 192) {
        d += String.fromCharCode((h & 31) << 6 | m);
        continue;
      }
      var _ = n[i++] & 63;
      if ((h & 240) == 224 ? h = (h & 15) << 12 | m << 6 | _ : h = (h & 7) << 18 | m << 12 | _ << 6 | n[i++] & 63, h < 65536)
        d += String.fromCharCode(h);
      else {
        var T = h - 65536;
        d += String.fromCharCode(55296 | T >> 10, 56320 | T & 1023);
      }
    }
    return d;
  }, an = [], ir = (n) => {
    for (var i = 0, l = 0; l < n.length; ++l) {
      var u = n.charCodeAt(l);
      u <= 127 ? i++ : u <= 2047 ? i += 2 : u >= 55296 && u <= 57343 ? (i += 4, ++l) : i += 3;
    }
    return i;
  }, at = (n, i, l, u) => {
    if (l >>>= 0, !(u > 0)) return 0;
    for (var c = l, d = l + u - 1, h = 0; h < n.length; ++h) {
      var m = n.codePointAt(h);
      if (m <= 127) {
        if (l >= d) break;
        i[l++ >>> 0] = m;
      } else if (m <= 2047) {
        if (l + 1 >= d) break;
        i[l++ >>> 0] = 192 | m >> 6, i[l++ >>> 0] = 128 | m & 63;
      } else if (m <= 65535) {
        if (l + 2 >= d) break;
        i[l++ >>> 0] = 224 | m >> 12, i[l++ >>> 0] = 128 | m >> 6 & 63, i[l++ >>> 0] = 128 | m & 63;
      } else {
        if (l + 3 >= d) break;
        i[l++ >>> 0] = 240 | m >> 18, i[l++ >>> 0] = 128 | m >> 12 & 63, i[l++ >>> 0] = 128 | m >> 6 & 63, i[l++ >>> 0] = 128 | m & 63, h++;
      }
    }
    return i[l >>> 0] = 0, l - c;
  }, V = (n, i, l) => {
    var u = ir(n) + 1, c = new Array(u), d = at(n, c, 0, c.length);
    return c.length = d, c;
  }, me = () => {
    var d;
    if (!an.length) {
      var n = null;
      if (a) {
        var i = 256, l = Buffer.alloc(i), u = 0, c = process.stdin.fd;
        try {
          u = j.readSync(c, l, 0, i);
        } catch (h) {
          if (h.toString().includes("EOF")) u = 0;
          else throw h;
        }
        u > 0 && (n = l.slice(0, u).toString("utf-8"));
      } else (d = globalThis.window) != null && d.prompt && (n = window.prompt("Input: "), n !== null && (n += `
`));
      if (!n)
        return null;
      an = V(n);
    }
    return an.shift();
  }, de = { ttys: [], init() {
  }, shutdown() {
  }, register(n, i) {
    de.ttys[n] = { input: [], output: [], ops: i }, v.registerDevice(n, de.stream_ops);
  }, stream_ops: { open(n) {
    var i = de.ttys[n.node.rdev];
    if (!i)
      throw new v.ErrnoError(43);
    n.tty = i, n.seekable = !1;
  }, close(n) {
    n.tty.ops.fsync(n.tty);
  }, fsync(n) {
    n.tty.ops.fsync(n.tty);
  }, read(n, i, l, u, c) {
    if (!n.tty || !n.tty.ops.get_char)
      throw new v.ErrnoError(60);
    for (var d = 0, h = 0; h < u; h++) {
      var m;
      try {
        m = n.tty.ops.get_char(n.tty);
      } catch {
        throw new v.ErrnoError(29);
      }
      if (m === void 0 && d === 0)
        throw new v.ErrnoError(6);
      if (m == null) break;
      d++, i[l + h] = m;
    }
    return d && (n.node.atime = Date.now()), d;
  }, write(n, i, l, u, c) {
    if (!n.tty || !n.tty.ops.put_char)
      throw new v.ErrnoError(60);
    try {
      for (var d = 0; d < u; d++)
        n.tty.ops.put_char(n.tty, i[l + d]);
    } catch {
      throw new v.ErrnoError(29);
    }
    return u && (n.node.mtime = n.node.ctime = Date.now()), d;
  } }, default_tty_ops: { get_char(n) {
    return me();
  }, put_char(n, i) {
    i === null || i === 10 ? (z(Ht(n.output)), n.output = []) : i != 0 && n.output.push(i);
  }, fsync(n) {
    var i;
    ((i = n.output) == null ? void 0 : i.length) > 0 && (z(Ht(n.output)), n.output = []);
  }, ioctl_tcgets(n) {
    return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
  }, ioctl_tcsets(n, i, l) {
    return 0;
  }, ioctl_tiocgwinsz(n) {
    return [24, 80];
  } }, default_tty1_ops: { put_char(n, i) {
    i === null || i === 10 ? (Q(Ht(n.output)), n.output = []) : i != 0 && n.output.push(i);
  }, fsync(n) {
    var i;
    ((i = n.output) == null ? void 0 : i.length) > 0 && (Q(Ht(n.output)), n.output = []);
  } } }, ke = (n, i) => I.fill(0, n, n + i), Me = (n, i) => Math.ceil(n / i) * i, Gt = (n) => {
    n = Me(n, 65536);
    var i = Ff(65536, n);
    return i && ke(i, n), i;
  }, ve = { ops_table: null, mount(n) {
    return ve.createNode(null, "/", 16895, 0);
  }, createNode(n, i, l, u) {
    if (v.isBlkdev(l) || v.isFIFO(l))
      throw new v.ErrnoError(63);
    ve.ops_table || (ve.ops_table = { dir: { node: { getattr: ve.node_ops.getattr, setattr: ve.node_ops.setattr, lookup: ve.node_ops.lookup, mknod: ve.node_ops.mknod, rename: ve.node_ops.rename, unlink: ve.node_ops.unlink, rmdir: ve.node_ops.rmdir, readdir: ve.node_ops.readdir, symlink: ve.node_ops.symlink }, stream: { llseek: ve.stream_ops.llseek } }, file: { node: { getattr: ve.node_ops.getattr, setattr: ve.node_ops.setattr }, stream: { llseek: ve.stream_ops.llseek, read: ve.stream_ops.read, write: ve.stream_ops.write, mmap: ve.stream_ops.mmap, msync: ve.stream_ops.msync } }, link: { node: { getattr: ve.node_ops.getattr, setattr: ve.node_ops.setattr, readlink: ve.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: ve.node_ops.getattr, setattr: ve.node_ops.setattr }, stream: v.chrdev_stream_ops } });
    var c = v.createNode(n, i, l, u);
    return v.isDir(c.mode) ? (c.node_ops = ve.ops_table.dir.node, c.stream_ops = ve.ops_table.dir.stream, c.contents = {}) : v.isFile(c.mode) ? (c.node_ops = ve.ops_table.file.node, c.stream_ops = ve.ops_table.file.stream, c.usedBytes = 0, c.contents = null) : v.isLink(c.mode) ? (c.node_ops = ve.ops_table.link.node, c.stream_ops = ve.ops_table.link.stream) : v.isChrdev(c.mode) && (c.node_ops = ve.ops_table.chrdev.node, c.stream_ops = ve.ops_table.chrdev.stream), c.atime = c.mtime = c.ctime = Date.now(), n && (n.contents[i] = c, n.atime = n.mtime = n.ctime = c.atime), c;
  }, getFileDataAsTypedArray(n) {
    return n.contents ? n.contents.subarray ? n.contents.subarray(0, n.usedBytes) : new Uint8Array(n.contents) : new Uint8Array(0);
  }, expandFileStorage(n, i) {
    var l = n.contents ? n.contents.length : 0;
    if (!(l >= i)) {
      var u = 1024 * 1024;
      i = Math.max(i, l * (l < u ? 2 : 1.125) >>> 0), l != 0 && (i = Math.max(i, 256));
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
    return i.dev = v.isChrdev(n.mode) ? n.id : 1, i.ino = n.id, i.mode = n.mode, i.nlink = 1, i.uid = 0, i.gid = 0, i.rdev = n.rdev, v.isDir(n.mode) ? i.size = 4096 : v.isFile(n.mode) ? i.size = n.usedBytes : v.isLink(n.mode) ? i.size = n.link.length : i.size = 0, i.atime = new Date(n.atime), i.mtime = new Date(n.mtime), i.ctime = new Date(n.ctime), i.blksize = 4096, i.blocks = Math.ceil(i.size / i.blksize), i;
  }, setattr(n, i) {
    for (const l of ["mode", "atime", "mtime", "ctime"])
      i[l] != null && (n[l] = i[l]);
    i.size !== void 0 && ve.resizeFileStorage(n, i.size);
  }, lookup(n, i) {
    throw ve.doesNotExistError || (ve.doesNotExistError = new v.ErrnoError(44), ve.doesNotExistError.stack = "<generic error, no stack>"), ve.doesNotExistError;
  }, mknod(n, i, l, u) {
    return ve.createNode(n, i, l, u);
  }, rename(n, i, l) {
    var u;
    try {
      u = v.lookupNode(i, l);
    } catch {
    }
    if (u) {
      if (v.isDir(n.mode))
        for (var c in u.contents)
          throw new v.ErrnoError(55);
      v.hashRemoveNode(u);
    }
    delete n.parent.contents[n.name], i.contents[l] = n, n.name = l, i.ctime = i.mtime = n.parent.ctime = n.parent.mtime = Date.now();
  }, unlink(n, i) {
    delete n.contents[i], n.ctime = n.mtime = Date.now();
  }, rmdir(n, i) {
    var l = v.lookupNode(n, i);
    for (var u in l.contents)
      throw new v.ErrnoError(55);
    delete n.contents[i], n.ctime = n.mtime = Date.now();
  }, readdir(n) {
    return [".", "..", ...Object.keys(n.contents)];
  }, symlink(n, i, l) {
    var u = ve.createNode(n, i, 41471, 0);
    return u.link = l, u;
  }, readlink(n) {
    if (!v.isLink(n.mode))
      throw new v.ErrnoError(28);
    return n.link;
  } }, stream_ops: { read(n, i, l, u, c) {
    var d = n.node.contents;
    if (c >= n.node.usedBytes) return 0;
    var h = Math.min(n.node.usedBytes - c, u);
    if (h > 8 && d.subarray)
      i.set(d.subarray(c, c + h), l);
    else
      for (var m = 0; m < h; m++) i[l + m] = d[c + m];
    return h;
  }, write(n, i, l, u, c, d) {
    if (i.buffer === A.buffer && (d = !1), !u) return 0;
    var h = n.node;
    if (h.mtime = h.ctime = Date.now(), i.subarray && (!h.contents || h.contents.subarray)) {
      if (d)
        return h.contents = i.subarray(l, l + u), h.usedBytes = u, u;
      if (h.usedBytes === 0 && c === 0)
        return h.contents = i.slice(l, l + u), h.usedBytes = u, u;
      if (c + u <= h.usedBytes)
        return h.contents.set(i.subarray(l, l + u), c), u;
    }
    if (ve.expandFileStorage(h, c + u), h.contents.subarray && i.subarray)
      h.contents.set(i.subarray(l, l + u), c);
    else
      for (var m = 0; m < u; m++)
        h.contents[c + m] = i[l + m];
    return h.usedBytes = Math.max(h.usedBytes, c + u), u;
  }, llseek(n, i, l) {
    var u = i;
    if (l === 1 ? u += n.position : l === 2 && v.isFile(n.node.mode) && (u += n.node.usedBytes), u < 0)
      throw new v.ErrnoError(28);
    return u;
  }, mmap(n, i, l, u, c) {
    if (!v.isFile(n.node.mode))
      throw new v.ErrnoError(43);
    var d, h, m = n.node.contents;
    if (!(c & 2) && m && m.buffer === A.buffer)
      h = !1, d = m.byteOffset;
    else {
      if (h = !0, d = Gt(i), !d)
        throw new v.ErrnoError(48);
      m && ((l > 0 || l + i < m.length) && (m.subarray ? m = m.subarray(l, l + i) : m = Array.prototype.slice.call(m, l, l + i)), A.set(m, d >>> 0));
    }
    return { ptr: d, allocated: h };
  }, msync(n, i, l, u, c) {
    return ve.stream_ops.write(n, i, 0, u, l, !1), 0;
  } } }, rl = (n) => {
    var i = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, l = i[n];
    if (typeof l > "u")
      throw new Error(`Unknown file open mode: ${n}`);
    return l;
  }, Xt = (n, i) => {
    var l = 0;
    return n && (l |= 365), i && (l |= 146), l;
  }, Yi = async (n) => {
    var i = await C(n);
    return new Uint8Array(i);
  }, Ki = (...n) => v.createDataFile(...n), Rt = 0, Br = null, Qi = (n) => {
    var l;
    if (Rt--, (l = r.monitorRunDependencies) == null || l.call(r, Rt), Rt == 0 && Br) {
      var i = Br;
      Br = null, i();
    }
  }, Ur = (n) => {
    var i;
    Rt++, (i = r.monitorRunDependencies) == null || i.call(r, Rt);
  }, Yt = [], oi = async (n, i) => {
    typeof oe < "u" && oe.init();
    for (var l of Yt)
      if (l.canHandle(i))
        return l.handle(n, i);
    return n;
  }, un = async (n, i, l, u, c, d, h, m) => {
    var _ = i ? Ue.resolve($e.join2(n, i)) : n;
    Ur();
    try {
      var T = l;
      typeof l == "string" && (T = await Yi(l)), T = await oi(T, _), m == null || m(), d || Ki(n, i, T, u, c, h);
    } finally {
      Qi();
    }
  }, nl = (n, i, l, u, c, d, h, m, _, T) => {
    un(n, i, l, u, c, m, _, T).then(d).catch(h);
  }, v = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: !1, ignorePermissions: !0, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
    constructor(n) {
      Ye(this, "name", "ErrnoError");
      this.errno = n;
    }
  }, FSStream: class {
    constructor() {
      Ye(this, "shared", {});
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
    constructor(n, i, l, u) {
      Ye(this, "node_ops", {});
      Ye(this, "stream_ops", {});
      Ye(this, "readMode", 365);
      Ye(this, "writeMode", 146);
      Ye(this, "mounted", null);
      n || (n = this), this.parent = n, this.mount = n.mount, this.id = v.nextInode++, this.name = i, this.mode = l, this.rdev = u, this.atime = this.mtime = this.ctime = Date.now();
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
      return v.isDir(this.mode);
    }
    get isDevice() {
      return v.isChrdev(this.mode);
    }
  }, lookupPath(n, i = {}) {
    if (!n)
      throw new v.ErrnoError(44);
    i.follow_mount ?? (i.follow_mount = !0), $e.isAbs(n) || (n = v.cwd() + "/" + n);
    e: for (var l = 0; l < 40; l++) {
      for (var u = n.split("/").filter((T) => !!T), c = v.root, d = "/", h = 0; h < u.length; h++) {
        var m = h === u.length - 1;
        if (m && i.parent)
          break;
        if (u[h] !== ".") {
          if (u[h] === "..") {
            if (d = $e.dirname(d), v.isRoot(c)) {
              n = d + "/" + u.slice(h + 1).join("/"), l--;
              continue e;
            } else
              c = c.parent;
            continue;
          }
          d = $e.join2(d, u[h]);
          try {
            c = v.lookupNode(c, u[h]);
          } catch (T) {
            if ((T == null ? void 0 : T.errno) === 44 && m && i.noent_okay)
              return { path: d };
            throw T;
          }
          if (v.isMountpoint(c) && (!m || i.follow_mount) && (c = c.mounted.root), v.isLink(c.mode) && (!m || i.follow)) {
            if (!c.node_ops.readlink)
              throw new v.ErrnoError(52);
            var _ = c.node_ops.readlink(c);
            $e.isAbs(_) || (_ = $e.dirname(d) + "/" + _), n = _ + "/" + u.slice(h + 1).join("/");
            continue e;
          }
        }
      }
      return { path: d, node: c };
    }
    throw new v.ErrnoError(32);
  }, getPath(n) {
    for (var i; ; ) {
      if (v.isRoot(n)) {
        var l = n.mount.mountpoint;
        return i ? l[l.length - 1] !== "/" ? `${l}/${i}` : l + i : l;
      }
      i = i ? `${n.name}/${i}` : n.name, n = n.parent;
    }
  }, hashName(n, i) {
    for (var l = 0, u = 0; u < i.length; u++)
      l = (l << 5) - l + i.charCodeAt(u) | 0;
    return (n + l >>> 0) % v.nameTable.length;
  }, hashAddNode(n) {
    var i = v.hashName(n.parent.id, n.name);
    n.name_next = v.nameTable[i], v.nameTable[i] = n;
  }, hashRemoveNode(n) {
    var i = v.hashName(n.parent.id, n.name);
    if (v.nameTable[i] === n)
      v.nameTable[i] = n.name_next;
    else
      for (var l = v.nameTable[i]; l; ) {
        if (l.name_next === n) {
          l.name_next = n.name_next;
          break;
        }
        l = l.name_next;
      }
  }, lookupNode(n, i) {
    var l = v.mayLookup(n);
    if (l)
      throw new v.ErrnoError(l);
    for (var u = v.hashName(n.id, i), c = v.nameTable[u]; c; c = c.name_next) {
      var d = c.name;
      if (c.parent.id === n.id && d === i)
        return c;
    }
    return v.lookup(n, i);
  }, createNode(n, i, l, u) {
    var c = new v.FSNode(n, i, l, u);
    return v.hashAddNode(c), c;
  }, destroyNode(n) {
    v.hashRemoveNode(n);
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
    return v.ignorePermissions ? 0 : i.includes("r") && !(n.mode & 292) || i.includes("w") && !(n.mode & 146) || i.includes("x") && !(n.mode & 73) ? 2 : 0;
  }, mayLookup(n) {
    if (!v.isDir(n.mode)) return 54;
    var i = v.nodePermissions(n, "x");
    return i || (n.node_ops.lookup ? 0 : 2);
  }, mayCreate(n, i) {
    if (!v.isDir(n.mode))
      return 54;
    try {
      var l = v.lookupNode(n, i);
      return 20;
    } catch {
    }
    return v.nodePermissions(n, "wx");
  }, mayDelete(n, i, l) {
    var u;
    try {
      u = v.lookupNode(n, i);
    } catch (d) {
      return d.errno;
    }
    var c = v.nodePermissions(n, "wx");
    if (c)
      return c;
    if (l) {
      if (!v.isDir(u.mode))
        return 54;
      if (v.isRoot(u) || v.getPath(u) === v.cwd())
        return 10;
    } else if (v.isDir(u.mode))
      return 31;
    return 0;
  }, mayOpen(n, i) {
    return n ? v.isLink(n.mode) ? 32 : v.isDir(n.mode) && (v.flagsToPermissionString(i) !== "r" || i & 576) ? 31 : v.nodePermissions(n, v.flagsToPermissionString(i)) : 44;
  }, checkOpExists(n, i) {
    if (!n)
      throw new v.ErrnoError(i);
    return n;
  }, MAX_OPEN_FDS: 4096, nextfd() {
    for (var n = 0; n <= v.MAX_OPEN_FDS; n++)
      if (!v.streams[n])
        return n;
    throw new v.ErrnoError(33);
  }, getStreamChecked(n) {
    var i = v.getStream(n);
    if (!i)
      throw new v.ErrnoError(8);
    return i;
  }, getStream: (n) => v.streams[n], createStream(n, i = -1) {
    return n = Object.assign(new v.FSStream(), n), i == -1 && (i = v.nextfd()), n.fd = i, v.streams[i] = n, n;
  }, closeStream(n) {
    v.streams[n] = null;
  }, dupStream(n, i = -1) {
    var u, c;
    var l = v.createStream(n, i);
    return (c = (u = l.stream_ops) == null ? void 0 : u.dup) == null || c.call(u, l), l;
  }, doSetAttr(n, i, l) {
    var u = n == null ? void 0 : n.stream_ops.setattr, c = u ? n : i;
    u ?? (u = i.node_ops.setattr), v.checkOpExists(u, 63), u(c, l);
  }, chrdev_stream_ops: { open(n) {
    var l, u;
    var i = v.getDevice(n.node.rdev);
    n.stream_ops = i.stream_ops, (u = (l = n.stream_ops).open) == null || u.call(l, n);
  }, llseek() {
    throw new v.ErrnoError(70);
  } }, major: (n) => n >> 8, minor: (n) => n & 255, makedev: (n, i) => n << 8 | i, registerDevice(n, i) {
    v.devices[n] = { stream_ops: i };
  }, getDevice: (n) => v.devices[n], getMounts(n) {
    for (var i = [], l = [n]; l.length; ) {
      var u = l.pop();
      i.push(u), l.push(...u.mounts);
    }
    return i;
  }, syncfs(n, i) {
    typeof n == "function" && (i = n, n = !1), v.syncFSRequests++, v.syncFSRequests > 1 && Q(`warning: ${v.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    var l = v.getMounts(v.root.mount), u = 0;
    function c(m) {
      return v.syncFSRequests--, i(m);
    }
    function d(m) {
      if (m)
        return d.errored ? void 0 : (d.errored = !0, c(m));
      ++u >= l.length && c(null);
    }
    for (var h of l)
      h.type.syncfs ? h.type.syncfs(h, n, d) : d(null);
  }, mount(n, i, l) {
    var u = l === "/", c = !l, d;
    if (u && v.root)
      throw new v.ErrnoError(10);
    if (!u && !c) {
      var h = v.lookupPath(l, { follow_mount: !1 });
      if (l = h.path, d = h.node, v.isMountpoint(d))
        throw new v.ErrnoError(10);
      if (!v.isDir(d.mode))
        throw new v.ErrnoError(54);
    }
    var m = { type: n, opts: i, mountpoint: l, mounts: [] }, _ = n.mount(m);
    return _.mount = m, m.root = _, u ? v.root = _ : d && (d.mounted = m, d.mount && d.mount.mounts.push(m)), _;
  }, unmount(n) {
    var i = v.lookupPath(n, { follow_mount: !1 });
    if (!v.isMountpoint(i.node))
      throw new v.ErrnoError(28);
    var l = i.node, u = l.mounted, c = v.getMounts(u);
    for (var [d, h] of Object.entries(v.nameTable))
      for (; h; ) {
        var m = h.name_next;
        c.includes(h.mount) && v.destroyNode(h), h = m;
      }
    l.mounted = null;
    var _ = l.mount.mounts.indexOf(u);
    l.mount.mounts.splice(_, 1);
  }, lookup(n, i) {
    return n.node_ops.lookup(n, i);
  }, mknod(n, i, l) {
    var u = v.lookupPath(n, { parent: !0 }), c = u.node, d = $e.basename(n);
    if (!d)
      throw new v.ErrnoError(28);
    if (d === "." || d === "..")
      throw new v.ErrnoError(20);
    var h = v.mayCreate(c, d);
    if (h)
      throw new v.ErrnoError(h);
    if (!c.node_ops.mknod)
      throw new v.ErrnoError(63);
    return c.node_ops.mknod(c, d, i, l);
  }, statfs(n) {
    return v.statfsNode(v.lookupPath(n, { follow: !0 }).node);
  }, statfsStream(n) {
    return v.statfsNode(n.node);
  }, statfsNode(n) {
    var i = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: v.nextInode, ffree: v.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
    return n.node_ops.statfs && Object.assign(i, n.node_ops.statfs(n.mount.opts.root)), i;
  }, create(n, i = 438) {
    return i &= 4095, i |= 32768, v.mknod(n, i, 0);
  }, mkdir(n, i = 511) {
    return i &= 1023, i |= 16384, v.mknod(n, i, 0);
  }, mkdirTree(n, i) {
    var l = n.split("/"), u = "";
    for (var c of l)
      if (c) {
        (u || $e.isAbs(n)) && (u += "/"), u += c;
        try {
          v.mkdir(u, i);
        } catch (d) {
          if (d.errno != 20) throw d;
        }
      }
  }, mkdev(n, i, l) {
    return typeof l > "u" && (l = i, i = 438), i |= 8192, v.mknod(n, i, l);
  }, symlink(n, i) {
    if (!Ue.resolve(n))
      throw new v.ErrnoError(44);
    var l = v.lookupPath(i, { parent: !0 }), u = l.node;
    if (!u)
      throw new v.ErrnoError(44);
    var c = $e.basename(i), d = v.mayCreate(u, c);
    if (d)
      throw new v.ErrnoError(d);
    if (!u.node_ops.symlink)
      throw new v.ErrnoError(63);
    return u.node_ops.symlink(u, c, n);
  }, rename(n, i) {
    var l = $e.dirname(n), u = $e.dirname(i), c = $e.basename(n), d = $e.basename(i), h, m, _;
    if (h = v.lookupPath(n, { parent: !0 }), m = h.node, h = v.lookupPath(i, { parent: !0 }), _ = h.node, !m || !_) throw new v.ErrnoError(44);
    if (m.mount !== _.mount)
      throw new v.ErrnoError(75);
    var T = v.lookupNode(m, c), O = Ue.relative(n, u);
    if (O.charAt(0) !== ".")
      throw new v.ErrnoError(28);
    if (O = Ue.relative(i, l), O.charAt(0) !== ".")
      throw new v.ErrnoError(55);
    var K;
    try {
      K = v.lookupNode(_, d);
    } catch {
    }
    if (T !== K) {
      var J = v.isDir(T.mode), ee = v.mayDelete(m, c, J);
      if (ee)
        throw new v.ErrnoError(ee);
      if (ee = K ? v.mayDelete(_, d, J) : v.mayCreate(_, d), ee)
        throw new v.ErrnoError(ee);
      if (!m.node_ops.rename)
        throw new v.ErrnoError(63);
      if (v.isMountpoint(T) || K && v.isMountpoint(K))
        throw new v.ErrnoError(10);
      if (_ !== m && (ee = v.nodePermissions(m, "w"), ee))
        throw new v.ErrnoError(ee);
      v.hashRemoveNode(T);
      try {
        m.node_ops.rename(T, _, d), T.parent = _;
      } catch (he) {
        throw he;
      } finally {
        v.hashAddNode(T);
      }
    }
  }, rmdir(n) {
    var i = v.lookupPath(n, { parent: !0 }), l = i.node, u = $e.basename(n), c = v.lookupNode(l, u), d = v.mayDelete(l, u, !0);
    if (d)
      throw new v.ErrnoError(d);
    if (!l.node_ops.rmdir)
      throw new v.ErrnoError(63);
    if (v.isMountpoint(c))
      throw new v.ErrnoError(10);
    l.node_ops.rmdir(l, u), v.destroyNode(c);
  }, readdir(n) {
    var i = v.lookupPath(n, { follow: !0 }), l = i.node, u = v.checkOpExists(l.node_ops.readdir, 54);
    return u(l);
  }, unlink(n) {
    var i = v.lookupPath(n, { parent: !0 }), l = i.node;
    if (!l)
      throw new v.ErrnoError(44);
    var u = $e.basename(n), c = v.lookupNode(l, u), d = v.mayDelete(l, u, !1);
    if (d)
      throw new v.ErrnoError(d);
    if (!l.node_ops.unlink)
      throw new v.ErrnoError(63);
    if (v.isMountpoint(c))
      throw new v.ErrnoError(10);
    l.node_ops.unlink(l, u), v.destroyNode(c);
  }, readlink(n) {
    var i = v.lookupPath(n), l = i.node;
    if (!l)
      throw new v.ErrnoError(44);
    if (!l.node_ops.readlink)
      throw new v.ErrnoError(28);
    return l.node_ops.readlink(l);
  }, stat(n, i) {
    var l = v.lookupPath(n, { follow: !i }), u = l.node, c = v.checkOpExists(u.node_ops.getattr, 63);
    return c(u);
  }, fstat(n) {
    var i = v.getStreamChecked(n), l = i.node, u = i.stream_ops.getattr, c = u ? i : l;
    return u ?? (u = l.node_ops.getattr), v.checkOpExists(u, 63), u(c);
  }, lstat(n) {
    return v.stat(n, !0);
  }, doChmod(n, i, l, u) {
    v.doSetAttr(n, i, { mode: l & 4095 | i.mode & -4096, ctime: Date.now(), dontFollow: u });
  }, chmod(n, i, l) {
    var u;
    if (typeof n == "string") {
      var c = v.lookupPath(n, { follow: !l });
      u = c.node;
    } else
      u = n;
    v.doChmod(null, u, i, l);
  }, lchmod(n, i) {
    v.chmod(n, i, !0);
  }, fchmod(n, i) {
    var l = v.getStreamChecked(n);
    v.doChmod(l, l.node, i, !1);
  }, doChown(n, i, l) {
    v.doSetAttr(n, i, { timestamp: Date.now(), dontFollow: l });
  }, chown(n, i, l, u) {
    var c;
    if (typeof n == "string") {
      var d = v.lookupPath(n, { follow: !u });
      c = d.node;
    } else
      c = n;
    v.doChown(null, c, u);
  }, lchown(n, i, l) {
    v.chown(n, i, l, !0);
  }, fchown(n, i, l) {
    var u = v.getStreamChecked(n);
    v.doChown(u, u.node, !1);
  }, doTruncate(n, i, l) {
    if (v.isDir(i.mode))
      throw new v.ErrnoError(31);
    if (!v.isFile(i.mode))
      throw new v.ErrnoError(28);
    var u = v.nodePermissions(i, "w");
    if (u)
      throw new v.ErrnoError(u);
    v.doSetAttr(n, i, { size: l, timestamp: Date.now() });
  }, truncate(n, i) {
    if (i < 0)
      throw new v.ErrnoError(28);
    var l;
    if (typeof n == "string") {
      var u = v.lookupPath(n, { follow: !0 });
      l = u.node;
    } else
      l = n;
    v.doTruncate(null, l, i);
  }, ftruncate(n, i) {
    var l = v.getStreamChecked(n);
    if (i < 0 || !(l.flags & 2097155))
      throw new v.ErrnoError(28);
    v.doTruncate(l, l.node, i);
  }, utime(n, i, l) {
    var u = v.lookupPath(n, { follow: !0 }), c = u.node, d = v.checkOpExists(c.node_ops.setattr, 63);
    d(c, { atime: i, mtime: l });
  }, open(n, i, l = 438) {
    if (n === "")
      throw new v.ErrnoError(44);
    i = typeof i == "string" ? rl(i) : i, i & 64 ? l = l & 4095 | 32768 : l = 0;
    var u, c;
    if (typeof n == "object")
      u = n;
    else {
      c = n.endsWith("/");
      var d = v.lookupPath(n, { follow: !(i & 131072), noent_okay: !0 });
      u = d.node, n = d.path;
    }
    var h = !1;
    if (i & 64)
      if (u) {
        if (i & 128)
          throw new v.ErrnoError(20);
      } else {
        if (c)
          throw new v.ErrnoError(31);
        u = v.mknod(n, l | 511, 0), h = !0;
      }
    if (!u)
      throw new v.ErrnoError(44);
    if (v.isChrdev(u.mode) && (i &= -513), i & 65536 && !v.isDir(u.mode))
      throw new v.ErrnoError(54);
    if (!h) {
      var m = v.mayOpen(u, i);
      if (m)
        throw new v.ErrnoError(m);
    }
    i & 512 && !h && v.truncate(u, 0), i &= -131713;
    var _ = v.createStream({ node: u, path: v.getPath(u), flags: i, seekable: !0, position: 0, stream_ops: u.stream_ops, ungotten: [], error: !1 });
    return _.stream_ops.open && _.stream_ops.open(_), h && v.chmod(u, l & 511), r.logReadFiles && !(i & 1) && (n in v.readFiles || (v.readFiles[n] = 1)), _;
  }, close(n) {
    if (v.isClosed(n))
      throw new v.ErrnoError(8);
    n.getdents && (n.getdents = null);
    try {
      n.stream_ops.close && n.stream_ops.close(n);
    } catch (i) {
      throw i;
    } finally {
      v.closeStream(n.fd);
    }
    n.fd = null;
  }, isClosed(n) {
    return n.fd === null;
  }, llseek(n, i, l) {
    if (v.isClosed(n))
      throw new v.ErrnoError(8);
    if (!n.seekable || !n.stream_ops.llseek)
      throw new v.ErrnoError(70);
    if (l != 0 && l != 1 && l != 2)
      throw new v.ErrnoError(28);
    return n.position = n.stream_ops.llseek(n, i, l), n.ungotten = [], n.position;
  }, read(n, i, l, u, c) {
    if (u < 0 || c < 0)
      throw new v.ErrnoError(28);
    if (v.isClosed(n))
      throw new v.ErrnoError(8);
    if ((n.flags & 2097155) === 1)
      throw new v.ErrnoError(8);
    if (v.isDir(n.node.mode))
      throw new v.ErrnoError(31);
    if (!n.stream_ops.read)
      throw new v.ErrnoError(28);
    var d = typeof c < "u";
    if (!d)
      c = n.position;
    else if (!n.seekable)
      throw new v.ErrnoError(70);
    var h = n.stream_ops.read(n, i, l, u, c);
    return d || (n.position += h), h;
  }, write(n, i, l, u, c, d) {
    if (u < 0 || c < 0)
      throw new v.ErrnoError(28);
    if (v.isClosed(n))
      throw new v.ErrnoError(8);
    if (!(n.flags & 2097155))
      throw new v.ErrnoError(8);
    if (v.isDir(n.node.mode))
      throw new v.ErrnoError(31);
    if (!n.stream_ops.write)
      throw new v.ErrnoError(28);
    n.seekable && n.flags & 1024 && v.llseek(n, 0, 2);
    var h = typeof c < "u";
    if (!h)
      c = n.position;
    else if (!n.seekable)
      throw new v.ErrnoError(70);
    var m = n.stream_ops.write(n, i, l, u, c, d);
    return h || (n.position += m), m;
  }, mmap(n, i, l, u, c) {
    if (u & 2 && !(c & 2) && (n.flags & 2097155) !== 2)
      throw new v.ErrnoError(2);
    if ((n.flags & 2097155) === 1)
      throw new v.ErrnoError(2);
    if (!n.stream_ops.mmap)
      throw new v.ErrnoError(43);
    if (!i)
      throw new v.ErrnoError(28);
    return n.stream_ops.mmap(n, i, l, u, c);
  }, msync(n, i, l, u, c) {
    return n.stream_ops.msync ? n.stream_ops.msync(n, i, l, u, c) : 0;
  }, ioctl(n, i, l) {
    if (!n.stream_ops.ioctl)
      throw new v.ErrnoError(59);
    return n.stream_ops.ioctl(n, i, l);
  }, readFile(n, i = {}) {
    i.flags = i.flags || 0, i.encoding = i.encoding || "binary", i.encoding !== "utf8" && i.encoding !== "binary" && De(`Invalid encoding type "${i.encoding}"`);
    var l = v.open(n, i.flags), u = v.stat(n), c = u.size, d = new Uint8Array(c);
    return v.read(l, d, 0, c, 0), i.encoding === "utf8" && (d = Ht(d)), v.close(l), d;
  }, writeFile(n, i, l = {}) {
    l.flags = l.flags || 577;
    var u = v.open(n, l.flags, l.mode);
    typeof i == "string" && (i = new Uint8Array(V(i))), ArrayBuffer.isView(i) ? v.write(u, i, 0, i.byteLength, void 0, l.canOwn) : De("Unsupported data type"), v.close(u);
  }, cwd: () => v.currentPath, chdir(n) {
    var i = v.lookupPath(n, { follow: !0 });
    if (i.node === null)
      throw new v.ErrnoError(44);
    if (!v.isDir(i.node.mode))
      throw new v.ErrnoError(54);
    var l = v.nodePermissions(i.node, "x");
    if (l)
      throw new v.ErrnoError(l);
    v.currentPath = i.path;
  }, createDefaultDirectories() {
    v.mkdir("/tmp"), v.mkdir("/home"), v.mkdir("/home/web_user");
  }, createDefaultDevices() {
    v.mkdir("/dev"), v.registerDevice(v.makedev(1, 3), { read: () => 0, write: (u, c, d, h, m) => h, llseek: () => 0 }), v.mkdev("/dev/null", v.makedev(1, 3)), de.register(v.makedev(5, 0), de.default_tty_ops), de.register(v.makedev(6, 0), de.default_tty1_ops), v.mkdev("/dev/tty", v.makedev(5, 0)), v.mkdev("/dev/tty1", v.makedev(6, 0));
    var n = new Uint8Array(1024), i = 0, l = () => (i === 0 && (Pt(n), i = n.byteLength), n[--i]);
    v.createDevice("/dev", "random", l), v.createDevice("/dev", "urandom", l), v.mkdir("/dev/shm"), v.mkdir("/dev/shm/tmp");
  }, createSpecialDirectories() {
    v.mkdir("/proc");
    var n = v.mkdir("/proc/self");
    v.mkdir("/proc/self/fd"), v.mount({ mount() {
      var i = v.createNode(n, "fd", 16895, 73);
      return i.stream_ops = { llseek: ve.stream_ops.llseek }, i.node_ops = { lookup(l, u) {
        var c = +u, d = v.getStreamChecked(c), h = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => d.path }, id: c + 1 };
        return h.parent = h, h;
      }, readdir() {
        return Array.from(v.streams.entries()).filter(([l, u]) => u).map(([l, u]) => l.toString());
      } }, i;
    } }, {}, "/proc/self/fd");
  }, createStandardStreams(n, i, l) {
    n ? v.createDevice("/dev", "stdin", n) : v.symlink("/dev/tty", "/dev/stdin"), i ? v.createDevice("/dev", "stdout", null, i) : v.symlink("/dev/tty", "/dev/stdout"), l ? v.createDevice("/dev", "stderr", null, l) : v.symlink("/dev/tty1", "/dev/stderr"), v.open("/dev/stdin", 0), v.open("/dev/stdout", 1), v.open("/dev/stderr", 1);
  }, staticInit() {
    v.nameTable = new Array(4096), v.mount(ve, {}, "/"), v.createDefaultDirectories(), v.createDefaultDevices(), v.createSpecialDirectories(), v.filesystems = { MEMFS: ve };
  }, init(n, i, l) {
    v.initialized = !0, n ?? (n = r.stdin), i ?? (i = r.stdout), l ?? (l = r.stderr), v.createStandardStreams(n, i, l);
  }, quit() {
    v.initialized = !1;
    for (var n of v.streams)
      n && v.close(n);
  }, findObject(n, i) {
    var l = v.analyzePath(n, i);
    return l.exists ? l.object : null;
  }, analyzePath(n, i) {
    try {
      var l = v.lookupPath(n, { follow: !i });
      n = l.path;
    } catch {
    }
    var u = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
    try {
      var l = v.lookupPath(n, { parent: !0 });
      u.parentExists = !0, u.parentPath = l.path, u.parentObject = l.node, u.name = $e.basename(n), l = v.lookupPath(n, { follow: !i }), u.exists = !0, u.path = l.path, u.object = l.node, u.name = l.node.name, u.isRoot = l.path === "/";
    } catch (c) {
      u.error = c.errno;
    }
    return u;
  }, createPath(n, i, l, u) {
    n = typeof n == "string" ? n : v.getPath(n);
    for (var c = i.split("/").reverse(); c.length; ) {
      var d = c.pop();
      if (d) {
        var h = $e.join2(n, d);
        try {
          v.mkdir(h);
        } catch (m) {
          if (m.errno != 20) throw m;
        }
        n = h;
      }
    }
    return h;
  }, createFile(n, i, l, u, c) {
    var d = $e.join2(typeof n == "string" ? n : v.getPath(n), i), h = Xt(u, c);
    return v.create(d, h);
  }, createDataFile(n, i, l, u, c, d) {
    var h = i;
    n && (n = typeof n == "string" ? n : v.getPath(n), h = i ? $e.join2(n, i) : n);
    var m = Xt(u, c), _ = v.create(h, m);
    if (l) {
      if (typeof l == "string") {
        for (var T = new Array(l.length), O = 0, K = l.length; O < K; ++O) T[O] = l.charCodeAt(O);
        l = T;
      }
      v.chmod(_, m | 146);
      var J = v.open(_, 577);
      v.write(J, l, 0, l.length, 0, d), v.close(J), v.chmod(_, m);
    }
  }, createDevice(n, i, l, u) {
    var m;
    var c = $e.join2(typeof n == "string" ? n : v.getPath(n), i), d = Xt(!!l, !!u);
    (m = v.createDevice).major ?? (m.major = 64);
    var h = v.makedev(v.createDevice.major++, 0);
    return v.registerDevice(h, { open(_) {
      _.seekable = !1;
    }, close(_) {
      var T;
      (T = u == null ? void 0 : u.buffer) != null && T.length && u(10);
    }, read(_, T, O, K, J) {
      for (var ee = 0, he = 0; he < K; he++) {
        var ge;
        try {
          ge = l();
        } catch {
          throw new v.ErrnoError(29);
        }
        if (ge === void 0 && ee === 0)
          throw new v.ErrnoError(6);
        if (ge == null) break;
        ee++, T[O + he] = ge;
      }
      return ee && (_.node.atime = Date.now()), ee;
    }, write(_, T, O, K, J) {
      for (var ee = 0; ee < K; ee++)
        try {
          u(T[O + ee]);
        } catch {
          throw new v.ErrnoError(29);
        }
      return K && (_.node.mtime = _.node.ctime = Date.now()), ee;
    } }), v.mkdev(c, d, h);
  }, forceLoadFile(n) {
    if (n.isDevice || n.isFolder || n.link || n.contents) return !0;
    if (globalThis.XMLHttpRequest)
      De("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    else
      try {
        n.contents = b(n.url);
      } catch {
        throw new v.ErrnoError(29);
      }
  }, createLazyFile(n, i, l, u, c) {
    class d {
      constructor() {
        Ye(this, "lengthKnown", !1);
        Ye(this, "chunks", []);
      }
      get(J) {
        if (!(J > this.length - 1 || J < 0)) {
          var ee = J % this.chunkSize, he = J / this.chunkSize | 0;
          return this.getter(he)[ee];
        }
      }
      setDataGetter(J) {
        this.getter = J;
      }
      cacheLength() {
        var J = new XMLHttpRequest();
        J.open("HEAD", l, !1), J.send(null), J.status >= 200 && J.status < 300 || J.status === 304 || De("Couldn't load " + l + ". Status: " + J.status);
        var ee = Number(J.getResponseHeader("Content-length")), he, ge = (he = J.getResponseHeader("Accept-Ranges")) && he === "bytes", Ce = (he = J.getResponseHeader("Content-Encoding")) && he === "gzip", Le = 1024 * 1024;
        ge || (Le = ee);
        var je = (Ne, Dt) => {
          Ne > Dt && De("invalid range (" + Ne + ", " + Dt + ") or no bytes requested!"), Dt > ee - 1 && De("only " + ee + " bytes available! programmer error!");
          var Ve = new XMLHttpRequest();
          return Ve.open("GET", l, !1), ee !== Le && Ve.setRequestHeader("Range", "bytes=" + Ne + "-" + Dt), Ve.responseType = "arraybuffer", Ve.overrideMimeType && Ve.overrideMimeType("text/plain; charset=x-user-defined"), Ve.send(null), Ve.status >= 200 && Ve.status < 300 || Ve.status === 304 || De("Couldn't load " + l + ". Status: " + Ve.status), Ve.response !== void 0 ? new Uint8Array(Ve.response || []) : V(Ve.responseText || "");
        }, Xe = this;
        Xe.setDataGetter((Ne) => {
          var Dt = Ne * Le, Ve = (Ne + 1) * Le - 1;
          return Ve = Math.min(Ve, ee - 1), typeof Xe.chunks[Ne] > "u" && (Xe.chunks[Ne] = je(Dt, Ve)), typeof Xe.chunks[Ne] > "u" && De("doXHR failed!"), Xe.chunks[Ne];
        }), (Ce || !ee) && (Le = ee = 1, ee = this.getter(0).length, Le = ee, z("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = ee, this._chunkSize = Le, this.lengthKnown = !0;
      }
      get length() {
        return this.lengthKnown || this.cacheLength(), this._length;
      }
      get chunkSize() {
        return this.lengthKnown || this.cacheLength(), this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      s || De("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
      var h = new d(), m = { isDevice: !1, contents: h };
    } else
      var m = { isDevice: !1, url: l };
    var _ = v.createFile(n, i, m, u, c);
    m.contents ? _.contents = m.contents : m.url && (_.contents = null, _.url = m.url), Object.defineProperties(_, { usedBytes: { get: function() {
      return this.contents.length;
    } } });
    var T = {};
    for (const [K, J] of Object.entries(_.stream_ops))
      T[K] = (...ee) => (v.forceLoadFile(_), J(...ee));
    function O(K, J, ee, he, ge) {
      var Ce = K.node.contents;
      if (ge >= Ce.length) return 0;
      var Le = Math.min(Ce.length - ge, he);
      if (Ce.slice)
        for (var je = 0; je < Le; je++)
          J[ee + je] = Ce[ge + je];
      else
        for (var je = 0; je < Le; je++)
          J[ee + je] = Ce.get(ge + je);
      return Le;
    }
    return T.read = (K, J, ee, he, ge) => (v.forceLoadFile(_), O(K, J, ee, he, ge)), T.mmap = (K, J, ee, he, ge) => {
      v.forceLoadFile(_);
      var Ce = Gt(J);
      if (!Ce)
        throw new v.ErrnoError(48);
      return O(K, A, Ce, J, ee), { ptr: Ce, allocated: !0 };
    }, _.stream_ops = T, _;
  } }, Kt = (n, i, l) => (n >>>= 0, n ? Ht(I, n, i, l) : ""), we = { calculateAt(n, i, l) {
    if ($e.isAbs(i))
      return i;
    var u;
    if (n === -100)
      u = v.cwd();
    else {
      var c = we.getStreamFromFD(n);
      u = c.path;
    }
    if (i.length == 0) {
      if (!l)
        throw new v.ErrnoError(44);
      return u;
    }
    return u + "/" + i;
  }, writeStat(n, i) {
    Z[n >>> 2 >>> 0] = i.dev, Z[n + 4 >>> 2 >>> 0] = i.mode, Z[n + 8 >>> 2 >>> 0] = i.nlink, Z[n + 12 >>> 2 >>> 0] = i.uid, Z[n + 16 >>> 2 >>> 0] = i.gid, Z[n + 20 >>> 2 >>> 0] = i.rdev, Se[n + 24 >>> 3 >>> 0] = BigInt(i.size), S[n + 32 >>> 2 >>> 0] = 4096, S[n + 36 >>> 2 >>> 0] = i.blocks;
    var l = i.atime.getTime(), u = i.mtime.getTime(), c = i.ctime.getTime();
    return Se[n + 40 >>> 3 >>> 0] = BigInt(Math.floor(l / 1e3)), Z[n + 48 >>> 2 >>> 0] = l % 1e3 * 1e3 * 1e3, Se[n + 56 >>> 3 >>> 0] = BigInt(Math.floor(u / 1e3)), Z[n + 64 >>> 2 >>> 0] = u % 1e3 * 1e3 * 1e3, Se[n + 72 >>> 3 >>> 0] = BigInt(Math.floor(c / 1e3)), Z[n + 80 >>> 2 >>> 0] = c % 1e3 * 1e3 * 1e3, Se[n + 88 >>> 3 >>> 0] = BigInt(i.ino), 0;
  }, writeStatFs(n, i) {
    Z[n + 4 >>> 2 >>> 0] = i.bsize, Z[n + 60 >>> 2 >>> 0] = i.bsize, Se[n + 8 >>> 3 >>> 0] = BigInt(i.blocks), Se[n + 16 >>> 3 >>> 0] = BigInt(i.bfree), Se[n + 24 >>> 3 >>> 0] = BigInt(i.bavail), Se[n + 32 >>> 3 >>> 0] = BigInt(i.files), Se[n + 40 >>> 3 >>> 0] = BigInt(i.ffree), Z[n + 48 >>> 2 >>> 0] = i.fsid, Z[n + 64 >>> 2 >>> 0] = i.flags, Z[n + 56 >>> 2 >>> 0] = i.namelen;
  }, doMsync(n, i, l, u, c) {
    if (!v.isFile(i.node.mode))
      throw new v.ErrnoError(43);
    if (u & 2)
      return 0;
    var d = I.slice(n, n + l);
    v.msync(i, d, c, l, u);
  }, getStreamFromFD(n) {
    var i = v.getStreamChecked(n);
    return i;
  }, varargs: void 0, getStr(n) {
    var i = Kt(n);
    return i;
  } }, il = 9007199254740992, ol = -9007199254740992, or = (n) => n < ol || n > il ? NaN : Number(n);
  function ll(n, i) {
    n >>>= 0;
    try {
      return n = we.getStr(n), v.chmod(n, i), 0;
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  var _e = { websocketArgs: {}, callbacks: {}, on(n, i) {
    _e.callbacks[n] = i;
  }, emit(n, i) {
    var l, u;
    (u = (l = _e.callbacks)[n]) == null || u.call(l, i);
  }, mount(n) {
    return _e.websocketArgs = r.websocket || {}, (r.websocket ?? (r.websocket = {})).on = _e.on, v.createNode(null, "/", 16895, 0);
  }, createSocket(n, i, l) {
    if (n != 2)
      throw new v.ErrnoError(5);
    if (i &= -526337, i != 1 && i != 2)
      throw new v.ErrnoError(28);
    var u = i == 1;
    if (u && l && l != 6)
      throw new v.ErrnoError(66);
    var c = { family: n, type: i, protocol: l, server: null, error: null, peers: {}, pending: [], recv_queue: [], sock_ops: _e.websocket_sock_ops }, d = _e.nextname(), h = v.createNode(_e.root, d, 49152, 0);
    h.sock = c;
    var m = v.createStream({ path: d, node: h, flags: 2, seekable: !1, stream_ops: _e.stream_ops });
    return c.stream = m, c;
  }, getSocket(n) {
    var i = v.getStream(n);
    return !i || !v.isSocket(i.node.mode) ? null : i.node.sock;
  }, stream_ops: { poll(n) {
    var i = n.node.sock;
    return i.sock_ops.poll(i);
  }, ioctl(n, i, l) {
    var u = n.node.sock;
    return u.sock_ops.ioctl(u, i, l);
  }, read(n, i, l, u, c) {
    var d = n.node.sock, h = d.sock_ops.recvmsg(d, u);
    return h ? (i.set(h.buffer, l), h.buffer.length) : 0;
  }, write(n, i, l, u, c) {
    var d = n.node.sock;
    return d.sock_ops.sendmsg(d, i, l, u);
  }, close(n) {
    var i = n.node.sock;
    i.sock_ops.close(i);
  } }, nextname() {
    return _e.nextname.current || (_e.nextname.current = 0), `socket[${_e.nextname.current++}]`;
  }, websocket_sock_ops: { createPeer(n, i, l) {
    var u;
    if (typeof i == "object" && (u = i, i = null, l = null), u)
      if (u._socket)
        i = u._socket.remoteAddress, l = u._socket.remotePort;
      else {
        var c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(u.url);
        if (!c)
          throw new Error("WebSocket URL must be in the format ws(s)://address:port");
        i = c[1], l = parseInt(c[2], 10);
      }
    else
      try {
        var d = "ws://".replace("#", "//"), h = "binary", m = void 0;
        if (_e.websocketArgs.url && (d = _e.websocketArgs.url), _e.websocketArgs.subprotocol ? h = _e.websocketArgs.subprotocol : _e.websocketArgs.subprotocol === null && (h = "null"), d === "ws://" || d === "wss://") {
          var _ = i.split("/");
          d = d + _[0] + ":" + l + "/" + _.slice(1).join("/");
        }
        h !== "null" && (h = h.replace(/^ +| +$/g, "").split(/ *, */), m = h);
        var T;
        a ? T = f("ws") : T = WebSocket, u = new T(d, m), u.binaryType = "arraybuffer";
      } catch {
        throw new v.ErrnoError(23);
      }
    var O = { addr: i, port: l, socket: u, msg_send_queue: [] };
    return _e.websocket_sock_ops.addPeer(n, O), _e.websocket_sock_ops.handlePeerEvents(n, O), n.type === 2 && typeof n.sport < "u" && O.msg_send_queue.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (n.sport & 65280) >> 8, n.sport & 255])), O;
  }, getPeer(n, i, l) {
    return n.peers[i + ":" + l];
  }, addPeer(n, i) {
    n.peers[i.addr + ":" + i.port] = i;
  }, removePeer(n, i) {
    delete n.peers[i.addr + ":" + i.port];
  }, handlePeerEvents(n, i) {
    var l = !0, u = function() {
      n.connecting = !1, _e.emit("open", n.stream.fd);
      try {
        for (var d = i.msg_send_queue.shift(); d; )
          i.socket.send(d), d = i.msg_send_queue.shift();
      } catch {
        i.socket.close();
      }
    };
    function c(d) {
      if (typeof d == "string") {
        var h = new TextEncoder();
        d = h.encode(d);
      } else {
        if (d.byteLength == 0)
          return;
        d = new Uint8Array(d);
      }
      var m = l;
      if (l = !1, m && d.length === 10 && d[0] === 255 && d[1] === 255 && d[2] === 255 && d[3] === 255 && d[4] === 112 && d[5] === 111 && d[6] === 114 && d[7] === 116) {
        var _ = d[8] << 8 | d[9];
        _e.websocket_sock_ops.removePeer(n, i), i.port = _, _e.websocket_sock_ops.addPeer(n, i);
        return;
      }
      n.recv_queue.push({ addr: i.addr, port: i.port, data: d }), _e.emit("message", n.stream.fd);
    }
    a ? (i.socket.on("open", u), i.socket.on("message", function(d, h) {
      h && c(new Uint8Array(d).buffer);
    }), i.socket.on("close", function() {
      _e.emit("close", n.stream.fd);
    }), i.socket.on("error", function(d) {
      n.error = 14, _e.emit("error", [n.stream.fd, n.error, "ECONNREFUSED: Connection refused"]);
    })) : (i.socket.onopen = u, i.socket.onclose = function() {
      _e.emit("close", n.stream.fd);
    }, i.socket.onmessage = function(h) {
      c(h.data);
    }, i.socket.onerror = function(d) {
      n.error = 14, _e.emit("error", [n.stream.fd, n.error, "ECONNREFUSED: Connection refused"]);
    });
  }, poll(n) {
    if (n.type === 1 && n.server)
      return n.pending.length ? 65 : 0;
    var i = 0, l = n.type === 1 ? _e.websocket_sock_ops.getPeer(n, n.daddr, n.dport) : null;
    return (n.recv_queue.length || !l || l && l.socket.readyState === l.socket.CLOSING || l && l.socket.readyState === l.socket.CLOSED) && (i |= 65), (!l || l && l.socket.readyState === l.socket.OPEN) && (i |= 4), (l && l.socket.readyState === l.socket.CLOSING || l && l.socket.readyState === l.socket.CLOSED) && (n.connecting ? i |= 4 : i |= 16), i;
  }, ioctl(n, i, l) {
    switch (i) {
      case 21531:
        var u = 0;
        return n.recv_queue.length && (u = n.recv_queue[0].data.length), S[l >>> 2 >>> 0] = u, 0;
      case 21537:
        var c = S[l >>> 2 >>> 0];
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
      _e.websocket_sock_ops.removePeer(n, i);
    }
    return 0;
  }, bind(n, i, l) {
    if (typeof n.saddr < "u" || typeof n.sport < "u")
      throw new v.ErrnoError(28);
    if (n.saddr = i, n.sport = l, n.type === 2) {
      n.server && (n.server.close(), n.server = null);
      try {
        n.sock_ops.listen(n, 0);
      } catch (u) {
        if (u.name !== "ErrnoError" || u.errno !== 138) throw u;
      }
    }
  }, connect(n, i, l) {
    if (n.server)
      throw new v.ErrnoError(138);
    if (typeof n.daddr < "u" && typeof n.dport < "u") {
      var u = _e.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
      if (u)
        throw u.socket.readyState === u.socket.CONNECTING ? new v.ErrnoError(7) : new v.ErrnoError(30);
    }
    var c = _e.websocket_sock_ops.createPeer(n, i, l);
    n.daddr = c.addr, n.dport = c.port, n.connecting = !0;
  }, listen(n, i) {
    if (!a)
      throw new v.ErrnoError(138);
    if (n.server)
      throw new v.ErrnoError(28);
    var l = f("ws").Server, u = n.saddr;
    n.server = new l({ host: u, port: n.sport }), _e.emit("listen", n.stream.fd), n.server.on("connection", function(c) {
      if (n.type === 1) {
        var d = _e.createSocket(n.family, n.type, n.protocol), h = _e.websocket_sock_ops.createPeer(d, c);
        d.daddr = h.addr, d.dport = h.port, n.pending.push(d), _e.emit("connection", d.stream.fd);
      } else
        _e.websocket_sock_ops.createPeer(n, c), _e.emit("connection", n.stream.fd);
    }), n.server.on("close", function() {
      _e.emit("close", n.stream.fd), n.server = null;
    }), n.server.on("error", function(c) {
      n.error = 23, _e.emit("error", [n.stream.fd, n.error, "EHOSTUNREACH: Host is unreachable"]);
    });
  }, accept(n) {
    if (!n.server || !n.pending.length)
      throw new v.ErrnoError(28);
    var i = n.pending.shift();
    return i.stream.flags = n.stream.flags, i;
  }, getname(n, i) {
    var l, u;
    if (i) {
      if (n.daddr === void 0 || n.dport === void 0)
        throw new v.ErrnoError(53);
      l = n.daddr, u = n.dport;
    } else
      l = n.saddr || 0, u = n.sport || 0;
    return { addr: l, port: u };
  }, sendmsg(n, i, l, u, c, d) {
    if (n.type === 2) {
      if ((c === void 0 || d === void 0) && (c = n.daddr, d = n.dport), c === void 0 || d === void 0)
        throw new v.ErrnoError(17);
    } else
      c = n.daddr, d = n.dport;
    var h = _e.websocket_sock_ops.getPeer(n, c, d);
    if (n.type === 1 && (!h || h.socket.readyState === h.socket.CLOSING || h.socket.readyState === h.socket.CLOSED))
      throw new v.ErrnoError(53);
    ArrayBuffer.isView(i) && (l += i.byteOffset, i = i.buffer);
    var m = i.slice(l, l + u);
    if (!h || h.socket.readyState !== h.socket.OPEN)
      return n.type === 2 && (!h || h.socket.readyState === h.socket.CLOSING || h.socket.readyState === h.socket.CLOSED) && (h = _e.websocket_sock_ops.createPeer(n, c, d)), h.msg_send_queue.push(m), u;
    try {
      return h.socket.send(m), u;
    } catch {
      throw new v.ErrnoError(28);
    }
  }, recvmsg(n, i) {
    if (n.type === 1 && n.server)
      throw new v.ErrnoError(53);
    var l = n.recv_queue.shift();
    if (!l) {
      if (n.type === 1) {
        var u = _e.websocket_sock_ops.getPeer(n, n.daddr, n.dport);
        if (!u)
          throw new v.ErrnoError(53);
        if (u.socket.readyState === u.socket.CLOSING || u.socket.readyState === u.socket.CLOSED)
          return null;
        throw new v.ErrnoError(6);
      }
      throw new v.ErrnoError(6);
    }
    var c = l.data.byteLength || l.data.length, d = l.data.byteOffset || 0, h = l.data.buffer || l.data, m = Math.min(i, c), _ = { buffer: new Uint8Array(h, d, m), addr: l.addr, port: l.port };
    if (n.type === 1 && m < c) {
      var T = c - m;
      l.data = new Uint8Array(h, d + m, T), n.recv_queue.unshift(l);
    }
    return _;
  } } }, Zi = (n) => {
    var i = _e.getSocket(n);
    if (!i) throw new v.ErrnoError(8);
    return i;
  }, li = (n) => (n & 255) + "." + (n >> 8 & 255) + "." + (n >> 16 & 255) + "." + (n >> 24 & 255), On = (n) => {
    var i = "", l = 0, u = 0, c = 0, d = 0, h = 0, m = 0, _ = [n[0] & 65535, n[0] >> 16, n[1] & 65535, n[1] >> 16, n[2] & 65535, n[2] >> 16, n[3] & 65535, n[3] >> 16], T = !0, O = "";
    for (m = 0; m < 5; m++)
      if (_[m] !== 0) {
        T = !1;
        break;
      }
    if (T) {
      if (O = li(_[6] | _[7] << 16), _[5] === -1)
        return i = "::ffff:", i += O, i;
      if (_[5] === 0)
        return i = "::", O === "0.0.0.0" && (O = ""), O === "0.0.0.1" && (O = "1"), i += O, i;
    }
    for (l = 0; l < 8; l++)
      _[l] === 0 && (l - c > 1 && (h = 0), c = l, h++), h > u && (u = h, d = l - u + 1);
    for (l = 0; l < 8; l++) {
      if (u > 1 && _[l] === 0 && l >= d && l < d + u) {
        l === d && (i += ":", d === 0 && (i += ":"));
        continue;
      }
      i += Number(ga(_[l] & 65535)).toString(16), i += l < 7 ? ":" : "";
    }
    return i;
  }, Js = (n, i) => {
    var l = $[n >>> 1 >>> 0], u = ga(F[n + 2 >>> 1 >>> 0]), c;
    switch (l) {
      case 2:
        if (i !== 16)
          return { errno: 28 };
        c = S[n + 4 >>> 2 >>> 0], c = li(c);
        break;
      case 10:
        if (i !== 28)
          return { errno: 28 };
        c = [S[n + 8 >>> 2 >>> 0], S[n + 12 >>> 2 >>> 0], S[n + 16 >>> 2 >>> 0], S[n + 20 >>> 2 >>> 0]], c = On(c);
        break;
      default:
        return { errno: 5 };
    }
    return { family: l, addr: c, port: u };
  }, si = (n) => {
    for (var i = n.split("."), l = 0; l < 4; l++) {
      var u = Number(i[l]);
      if (isNaN(u)) return null;
      i[l] = u;
    }
    return (i[0] | i[1] << 8 | i[2] << 16 | i[3] << 24) >>> 0;
  }, qi = (n) => {
    var i, l, u, c, d = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i, h = [];
    if (!d.test(n))
      return null;
    if (n === "::")
      return [0, 0, 0, 0, 0, 0, 0, 0];
    for (n.startsWith("::") ? n = n.replace("::", "Z:") : n = n.replace("::", ":Z:"), n.indexOf(".") > 0 ? (n = n.replace(new RegExp("[.]", "g"), ":"), i = n.split(":"), i[i.length - 4] = Number(i[i.length - 4]) + Number(i[i.length - 3]) * 256, i[i.length - 3] = Number(i[i.length - 2]) + Number(i[i.length - 1]) * 256, i = i.slice(0, i.length - 2)) : i = n.split(":"), u = 0, c = 0, l = 0; l < i.length; l++)
      if (typeof i[l] == "string")
        if (i[l] === "Z") {
          for (c = 0; c < 8 - i.length + 1; c++)
            h[l + c] = 0;
          u = c - 1;
        } else
          h[l + u] = _l(parseInt(i[l], 16));
      else
        h[l + u] = i[l];
    return [h[1] << 16 | h[0], h[3] << 16 | h[2], h[5] << 16 | h[4], h[7] << 16 | h[6]];
  }, wr = { address_map: { id: 1, addrs: {}, names: {} }, lookup_name(n) {
    var i = si(n);
    if (i !== null || (i = qi(n), i !== null))
      return n;
    var l;
    if (wr.address_map.addrs[n])
      l = wr.address_map.addrs[n];
    else {
      var u = wr.address_map.id++;
      l = "172.29." + (u & 255) + "." + (u & 65280), wr.address_map.names[l] = n, wr.address_map.addrs[n] = l;
    }
    return l;
  }, lookup_addr(n) {
    return wr.address_map.names[n] ? wr.address_map.names[n] : null;
  } }, sl = (n, i) => {
    var l = Js(n, i);
    if (l.errno) throw new v.ErrnoError(l.errno);
    return l.addr = wr.lookup_addr(l.addr) || l.addr, l;
  };
  function ea(n, i, l, u, c, d) {
    i >>>= 0, l >>>= 0;
    try {
      var h = Zi(n), m = sl(i, l);
      return h.sock_ops.connect(h, m.addr, m.port), 0;
    } catch (_) {
      if (typeof v > "u" || _.name !== "ErrnoError") throw _;
      return -_.errno;
    }
  }
  function ta(n, i, l, u) {
    i >>>= 0;
    try {
      if (i = we.getStr(i), i = we.calculateAt(n, i), l & -8)
        return -28;
      var c = v.lookupPath(i, { follow: !0 }), d = c.node;
      if (!d)
        return -44;
      var h = "";
      return l & 4 && (h += "r"), l & 2 && (h += "w"), l & 1 && (h += "x"), h && v.nodePermissions(d, h) ? -2 : 0;
    } catch (m) {
      if (typeof v > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  var In = () => {
    var n = S[+we.varargs >>> 2 >>> 0];
    return we.varargs += 4, n;
  }, Vr = In;
  function ra(n, i, l) {
    l >>>= 0, we.varargs = l;
    try {
      var u = we.getStreamFromFD(n);
      switch (i) {
        case 0: {
          var c = In();
          if (c < 0)
            return -28;
          for (; v.streams[c]; )
            c++;
          var d;
          return d = v.dupStream(u, c), d.fd;
        }
        case 1:
        case 2:
          return 0;
        case 3:
          return u.flags;
        case 4: {
          var c = In();
          return u.flags |= c, 0;
        }
        case 12: {
          var c = Vr(), h = 0;
          return $[c + h >>> 1 >>> 0] = 2, 0;
        }
        case 13:
        case 14:
          return 0;
      }
      return -28;
    } catch (m) {
      if (typeof v > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  function M(n, i) {
    i >>>= 0;
    try {
      return we.writeStat(i, v.fstat(n));
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  var N = (n, i, l) => at(n, I, i, l);
  function X(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      if (i === 0) return -28;
      var l = v.cwd(), u = ir(l) + 1;
      return i < u ? -68 : (N(l, n, i), u);
    } catch (c) {
      if (typeof v > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function re(n, i, l) {
    i >>>= 0, l >>>= 0;
    try {
      var u = we.getStreamFromFD(n);
      u.getdents || (u.getdents = v.readdir(u.path));
      for (var c = 280, d = 0, h = v.llseek(u, 0, 1), m = Math.floor(h / c), _ = Math.min(u.getdents.length, m + Math.floor(l / c)), T = m; T < _; T++) {
        var O, K, J = u.getdents[T];
        if (J === ".")
          O = u.node.id, K = 4;
        else if (J === "..") {
          var ee = v.lookupPath(u.path, { parent: !0 });
          O = ee.node.id, K = 4;
        } else {
          var he;
          try {
            he = v.lookupNode(u.node, J);
          } catch (ge) {
            if ((ge == null ? void 0 : ge.errno) === 28)
              continue;
            throw ge;
          }
          O = he.id, K = v.isChrdev(he.mode) ? 2 : v.isDir(he.mode) ? 4 : v.isLink(he.mode) ? 10 : 8;
        }
        Se[i + d >>> 3 >>> 0] = BigInt(O), Se[i + d + 8 >>> 3 >>> 0] = BigInt((T + 1) * c), $[i + d + 16 >>> 1 >>> 0] = 280, A[i + d + 18 >>> 0] = K, N(J, i + d + 19, 256), d += c;
      }
      return v.llseek(u, T * c, 0), d;
    } catch (ge) {
      if (typeof v > "u" || ge.name !== "ErrnoError") throw ge;
      return -ge.errno;
    }
  }
  function q(n, i, l) {
    l >>>= 0, we.varargs = l;
    try {
      var u = we.getStreamFromFD(n);
      switch (i) {
        case 21509:
          return u.tty ? 0 : -59;
        case 21505: {
          if (!u.tty) return -59;
          if (u.tty.ops.ioctl_tcgets) {
            var c = u.tty.ops.ioctl_tcgets(u), d = Vr();
            S[d >>> 2 >>> 0] = c.c_iflag || 0, S[d + 4 >>> 2 >>> 0] = c.c_oflag || 0, S[d + 8 >>> 2 >>> 0] = c.c_cflag || 0, S[d + 12 >>> 2 >>> 0] = c.c_lflag || 0;
            for (var h = 0; h < 32; h++)
              A[d + h + 17 >>> 0] = c.c_cc[h] || 0;
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
          return u.tty ? 0 : -59;
        case 21506:
        case 21507:
        case 21508: {
          if (!u.tty) return -59;
          if (u.tty.ops.ioctl_tcsets) {
            for (var d = Vr(), m = S[d >>> 2 >>> 0], _ = S[d + 4 >>> 2 >>> 0], T = S[d + 8 >>> 2 >>> 0], O = S[d + 12 >>> 2 >>> 0], K = [], h = 0; h < 32; h++)
              K.push(A[d + h + 17 >>> 0]);
            return u.tty.ops.ioctl_tcsets(u.tty, i, { c_iflag: m, c_oflag: _, c_cflag: T, c_lflag: O, c_cc: K });
          }
          return 0;
        }
        case 21519: {
          if (!u.tty) return -59;
          var d = Vr();
          return S[d >>> 2 >>> 0] = 0, 0;
        }
        case 21520:
          return u.tty ? -28 : -59;
        case 21537:
        case 21531: {
          var d = Vr();
          return v.ioctl(u, i, d);
        }
        case 21523: {
          if (!u.tty) return -59;
          if (u.tty.ops.ioctl_tiocgwinsz) {
            var J = u.tty.ops.ioctl_tiocgwinsz(u.tty), d = Vr();
            $[d >>> 1 >>> 0] = J[0], $[d + 2 >>> 1 >>> 0] = J[1];
          }
          return 0;
        }
        case 21524:
          return u.tty ? 0 : -59;
        case 21515:
          return u.tty ? 0 : -59;
        default:
          return -28;
      }
    } catch (ee) {
      if (typeof v > "u" || ee.name !== "ErrnoError") throw ee;
      return -ee.errno;
    }
  }
  function Y(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return n = we.getStr(n), we.writeStat(i, v.lstat(n));
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  function ie(n, i, l) {
    i >>>= 0;
    try {
      return i = we.getStr(i), i = we.calculateAt(n, i), v.mkdir(i, l, 0), 0;
    } catch (u) {
      if (typeof v > "u" || u.name !== "ErrnoError") throw u;
      return -u.errno;
    }
  }
  function H(n, i, l, u) {
    i >>>= 0, l >>>= 0;
    try {
      i = we.getStr(i);
      var c = u & 256, d = u & 4096;
      return u = u & -6401, i = we.calculateAt(n, i, d), we.writeStat(l, c ? v.lstat(i) : v.stat(i));
    } catch (h) {
      if (typeof v > "u" || h.name !== "ErrnoError") throw h;
      return -h.errno;
    }
  }
  function te(n, i, l, u) {
    i >>>= 0, u >>>= 0, we.varargs = u;
    try {
      i = we.getStr(i), i = we.calculateAt(n, i);
      var c = u ? In() : 0;
      return v.open(i, l, c).fd;
    } catch (d) {
      if (typeof v > "u" || d.name !== "ErrnoError") throw d;
      return -d.errno;
    }
  }
  function le(n, i, l, u) {
    i >>>= 0, l >>>= 0, u >>>= 0;
    try {
      if (i = we.getStr(i), i = we.calculateAt(n, i), u <= 0) return -28;
      var c = v.readlink(i), d = Math.min(u, ir(c)), h = A[l + d >>> 0];
      return N(c, l, u + 1), A[l + d >>> 0] = h, d;
    } catch (m) {
      if (typeof v > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  function ce(n, i, l, u) {
    i >>>= 0, u >>>= 0;
    try {
      return i = we.getStr(i), u = we.getStr(u), i = we.calculateAt(n, i), u = we.calculateAt(l, u), v.rename(i, u), 0;
    } catch (c) {
      if (typeof v > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function Ee(n) {
    n >>>= 0;
    try {
      return n = we.getStr(n), v.rmdir(n), 0;
    } catch (i) {
      if (typeof v > "u" || i.name !== "ErrnoError") throw i;
      return -i.errno;
    }
  }
  function Be(n, i, l, u, c, d) {
    i >>>= 0, l >>>= 0, c >>>= 0, d >>>= 0;
    try {
      var h = Zi(n);
      if (!c)
        return v.write(h.stream, A, i, l);
      var m = sl(c, d);
      return h.sock_ops.sendmsg(h, A, i, l, m.addr, m.port);
    } catch (_) {
      if (typeof v > "u" || _.name !== "ErrnoError") throw _;
      return -_.errno;
    }
  }
  function He(n, i, l) {
    try {
      var u = _e.createSocket(n, i, l);
      return u.stream.fd;
    } catch (c) {
      if (typeof v > "u" || c.name !== "ErrnoError") throw c;
      return -c.errno;
    }
  }
  function pt(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return n = we.getStr(n), we.writeStat(i, v.stat(n));
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return -l.errno;
    }
  }
  function Ge(n, i, l) {
    n >>>= 0, l >>>= 0;
    try {
      return n = we.getStr(n), l = we.getStr(l), l = we.calculateAt(i, l), v.symlink(n, l), 0;
    } catch (u) {
      if (typeof v > "u" || u.name !== "ErrnoError") throw u;
      return -u.errno;
    }
  }
  function _r(n, i, l) {
    i >>>= 0;
    try {
      if (i = we.getStr(i), i = we.calculateAt(n, i), !l)
        v.unlink(i);
      else if (l === 512)
        v.rmdir(i);
      else
        return -28;
      return 0;
    } catch (u) {
      if (typeof v > "u" || u.name !== "ErrnoError") throw u;
      return -u.errno;
    }
  }
  var cn = (n) => Z[n >>> 2 >>> 0] + S[n + 4 >>> 2 >>> 0] * 4294967296;
  function al(n, i, l, u) {
    i >>>= 0, l >>>= 0;
    try {
      i = we.getStr(i), i = we.calculateAt(n, i, !0);
      var c = Date.now(), d, h;
      if (!l)
        d = c, h = c;
      else {
        var m = cn(l), _ = S[l + 8 >>> 2 >>> 0];
        _ == 1073741823 ? d = c : _ == 1073741822 ? d = null : d = m * 1e3 + _ / (1e3 * 1e3), l += 16, m = cn(l), _ = S[l + 8 >>> 2 >>> 0], _ == 1073741823 ? h = c : _ == 1073741822 ? h = null : h = m * 1e3 + _ / (1e3 * 1e3);
      }
      return (h ?? d) !== null && v.utime(i, d, h), 0;
    } catch (T) {
      if (typeof v > "u" || T.name !== "ErrnoError") throw T;
      return -T.errno;
    }
  }
  var Ji = () => De(""), Lr = (n, i) => Object.defineProperty(i, "name", { value: n }), eo = [], Tt = [0, 1, , 1, null, 1, !0, 1, !1, 1], Wr = class extends Error {
    constructor(i) {
      super(i), this.name = "BindingError";
    }
  }, be = (n) => {
    throw new Wr(n);
  }, Fe = { toValue: (n) => (n || be(`Cannot use deleted val. handle = ${n}`), Tt[n]), toHandle: (n) => {
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
        const i = eo.pop() || Tt.length;
        return Tt[i] = n, Tt[i + 1] = 1, i;
      }
    }
  } };
  class to extends Error {
  }
  var se = (n) => {
    n >>>= 0;
    for (var i = ""; ; ) {
      var l = I[n++ >>> 0];
      if (!l) return i;
      i += String.fromCharCode(l);
    }
  }, Re = {}, Ie = (n, i) => {
    for (i === void 0 && be("ptr should not be undefined"); n.baseClass; )
      i = n.upcast(i), n = n.baseClass;
    return i;
  }, xt = (n, i, l) => {
    i = Ie(n, i), Re.hasOwnProperty(i) ? be(`Tried to register registered instance: ${i}`) : Re[i] = l;
  }, qe = {}, xr = (n) => {
    var i = Lf(n), l = se(i);
    return Dr(i), l;
  }, Lt = (n, i) => {
    var l = qe[n];
    return l === void 0 && be(`${i} has unknown type ${xr(n)}`), l;
  }, kt = (n, i) => {
    i = Ie(n, i), Re.hasOwnProperty(i) ? delete Re[i] : be(`Tried to unregister unregistered instance: ${i}`);
  }, fn = (n) => {
  }, ai = !1, gm = (n) => {
    n.smartPtr ? n.smartPtrType.rawDestructor(n.smartPtr) : n.ptrType.registeredClass.rawDestructor(n.ptr);
  }, nf = (n) => {
    n.count.value -= 1;
    var i = n.count.value === 0;
    i && gm(n);
  }, ui = (n) => globalThis.FinalizationRegistry ? (ai = new FinalizationRegistry((i) => {
    nf(i.$$);
  }), ui = (i) => {
    var l = i.$$, u = !!l.smartPtr;
    if (u) {
      var c = { $$: l };
      ai.register(i, c, i);
    }
    return i;
  }, fn = (i) => ai.unregister(i), ui(n)) : (ui = (i) => i, n);
  function ym(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, n = se(n), i = Lt(i, "wrapper"), l = Fe.toValue(l);
    var u = i.registeredClass, c = u.instancePrototype, d = u.baseClass, h = d.instancePrototype, m = u.baseClass.constructor, _ = Lr(n, function(...T) {
      for (var O of u.baseClass.pureVirtualFunctions)
        if (this[O] === h[O])
          throw new to(`Pure virtual function ${O} must be implemented in JavaScript`);
      Object.defineProperty(this, "__parent", { value: c }), this.__construct(...T);
    });
    return c.__construct = function(...O) {
      this === c && be("Pass correct 'this' to __construct");
      var K = m.implement(this, ...O);
      fn(K);
      var J = K.$$;
      K.notifyOnDestruction(), J.preservePointerOnDelete = !0, Object.defineProperties(this, { $$: { value: J } }), ui(this), xt(u, J.ptr, this);
    }, c.__destruct = function() {
      this === c && be("Pass correct 'this' to __destruct"), fn(this), kt(u, this.$$.ptr);
    }, _.prototype = Object.create(c), Object.assign(_.prototype, l), Fe.toHandle(_);
  }
  var ul = {}, ro = (n) => {
    for (; n.length; ) {
      var i = n.pop(), l = n.pop();
      l(i);
    }
  };
  function ci(n) {
    return this.fromWireType(Z[n >>> 2 >>> 0]);
  }
  var fi = {}, cl = {}, wm = class extends Error {
    constructor(i) {
      super(i), this.name = "InternalError";
    }
  }, fl = (n) => {
    throw new wm(n);
  }, Ot = (n, i, l) => {
    n.forEach((m) => cl[m] = i);
    function u(m) {
      var _ = l(m);
      _.length !== n.length && fl("Mismatched type converter count");
      for (var T = 0; T < n.length; ++T)
        It(n[T], _[T]);
    }
    var c = new Array(i.length), d = [], h = 0;
    for (let [m, _] of i.entries())
      qe.hasOwnProperty(_) ? c[m] = qe[_] : (d.push(_), fi.hasOwnProperty(_) || (fi[_] = []), fi[_].push(() => {
        c[m] = qe[_], ++h, h === d.length && u(c);
      }));
    d.length === 0 && u(c);
  }, _m = function(n) {
    n >>>= 0;
    var i = ul[n];
    delete ul[n];
    var l = i.elements, u = l.length, c = l.map((m) => m.getterReturnType).concat(l.map((m) => m.setterArgumentType)), d = i.rawConstructor, h = i.rawDestructor;
    Ot([n], c, (m) => {
      for (const [_, T] of l.entries()) {
        const O = m[_], K = T.getter, J = T.getterContext, ee = m[_ + u], he = T.setter, ge = T.setterContext;
        T.read = (Ce) => O.fromWireType(K(J, Ce)), T.write = (Ce, Le) => {
          var je = [];
          he(ge, Ce, ee.toWireType(je, Le)), ro(je);
        };
      }
      return [{ name: i.name, fromWireType: (_) => {
        for (var T = new Array(u), O = 0; O < u; ++O)
          T[O] = l[O].read(_);
        return h(_), T;
      }, toWireType: (_, T) => {
        if (u !== T.length)
          throw new TypeError(`Incorrect number of tuple elements for ${i.name}: expected=${u}, actual=${T.length}`);
        for (var O = d(), K = 0; K < u; ++K)
          l[K].write(O, T[K]);
        return _ !== null && _.push(h, O), O;
      }, readValueFromPointer: ci, destructorFunction: h }];
    });
  }, dl = {}, xm = function(n) {
    n >>>= 0;
    var i = dl[n];
    delete dl[n];
    var l = i.rawConstructor, u = i.rawDestructor, c = i.fields, d = c.map((h) => h.getterReturnType).concat(c.map((h) => h.setterArgumentType));
    Ot([n], d, (h) => {
      var m = {};
      for (var [_, T] of c.entries()) {
        const O = h[_], K = T.getter, J = T.getterContext, ee = h[_ + c.length], he = T.setter, ge = T.setterContext;
        m[T.fieldName] = { read: (Ce) => O.fromWireType(K(J, Ce)), write: (Ce, Le) => {
          var je = [];
          he(ge, Ce, ee.toWireType(je, Le)), ro(je);
        }, optional: O.optional };
      }
      return [{ name: i.name, fromWireType: (O) => {
        var K = {};
        for (var J in m)
          K[J] = m[J].read(O);
        return u(O), K;
      }, toWireType: (O, K) => {
        for (var J in m)
          if (!(J in K) && !m[J].optional)
            throw new TypeError(`Missing field: "${J}"`);
        var ee = l();
        for (J in m)
          m[J].write(ee, K[J]);
        return O !== null && O.push(u, ee), ee;
      }, readValueFromPointer: ci, destructorFunction: u }];
    });
  };
  function km(n, i, l = {}) {
    var u = i.name;
    if (n || be(`type "${u}" must have a positive integer typeid pointer`), qe.hasOwnProperty(n)) {
      if (l.ignoreDuplicateRegistrations)
        return;
      be(`Cannot register type '${u}' twice`);
    }
    if (qe[n] = i, delete cl[n], fi.hasOwnProperty(n)) {
      var c = fi[n];
      delete fi[n], c.forEach((d) => d());
    }
  }
  function It(n, i, l = {}) {
    return km(n, i, l);
  }
  var of = (n, i, l) => {
    switch (i) {
      case 1:
        return l ? (u) => A[u >>> 0] : (u) => I[u >>> 0];
      case 2:
        return l ? (u) => $[u >>> 1 >>> 0] : (u) => F[u >>> 1 >>> 0];
      case 4:
        return l ? (u) => S[u >>> 2 >>> 0] : (u) => Z[u >>> 2 >>> 0];
      case 8:
        return l ? (u) => Se[u >>> 3 >>> 0] : (u) => Te[u >>> 3 >>> 0];
      default:
        throw new TypeError(`invalid integer width (${i}): ${n}`);
    }
  }, Sm = function(n, i, l, u, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = se(i);
    const d = u === 0n;
    let h = (m) => m;
    if (d) {
      const m = l * 8;
      h = (_) => BigInt.asUintN(m, _), c = h(c);
    }
    It(n, { name: i, fromWireType: h, toWireType: (m, _) => (typeof _ == "number" && (_ = BigInt(_)), _), readValueFromPointer: of(i, l, !d), destructorFunction: null });
  };
  function Em(n, i, l, u) {
    n >>>= 0, i >>>= 0, i = se(i), It(n, { name: i, fromWireType: function(c) {
      return !!c;
    }, toWireType: function(c, d) {
      return d ? l : u;
    }, readValueFromPointer: function(c) {
      return this.fromWireType(I[c >>> 0]);
    }, destructorFunction: null });
  }
  var bm = (n) => ({ count: n.count, deleteScheduled: n.deleteScheduled, preservePointerOnDelete: n.preservePointerOnDelete, ptr: n.ptr, ptrType: n.ptrType, smartPtr: n.smartPtr, smartPtrType: n.smartPtrType }), na = (n) => {
    function i(l) {
      return l.$$.ptrType.registeredClass.name;
    }
    be(i(n) + " instance already deleted");
  }, Cm = () => {
    let n = pl.prototype;
    Object.assign(n, { isAliasOf(l) {
      if (!(this instanceof pl) || !(l instanceof pl))
        return !1;
      var u = this.$$.ptrType.registeredClass, c = this.$$.ptr;
      l.$$ = l.$$;
      for (var d = l.$$.ptrType.registeredClass, h = l.$$.ptr; u.baseClass; )
        c = u.upcast(c), u = u.baseClass;
      for (; d.baseClass; )
        h = d.upcast(h), d = d.baseClass;
      return u === d && c === h;
    }, clone() {
      if (this.$$.ptr || na(this), this.$$.preservePointerOnDelete)
        return this.$$.count.value += 1, this;
      var l = ui(Object.create(Object.getPrototypeOf(this), { $$: { value: bm(this.$$) } }));
      return l.$$.count.value += 1, l.$$.deleteScheduled = !1, l;
    }, delete() {
      this.$$.ptr || na(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && be("Object already scheduled for deletion"), fn(this), nf(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
    }, isDeleted() {
      return !this.$$.ptr;
    }, deleteLater() {
      return this.$$.ptr || na(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && be("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
    } });
    const i = Symbol.dispose;
    i && (n[i] = n.delete);
  };
  function pl() {
  }
  var lf = {}, ia = (n, i, l) => {
    if (n[i].overloadTable === void 0) {
      var u = n[i];
      n[i] = function(...c) {
        return n[i].overloadTable.hasOwnProperty(c.length) || be(`Function '${l}' called with an invalid number of arguments (${c.length}) - expects one of (${n[i].overloadTable})!`), n[i].overloadTable[c.length].apply(this, c);
      }, n[i].overloadTable = [], n[i].overloadTable[u.argCount] = u;
    }
  }, no = (n, i, l) => {
    r.hasOwnProperty(n) ? ((l === void 0 || r[n].overloadTable !== void 0 && r[n].overloadTable[l] !== void 0) && be(`Cannot register public name '${n}' twice`), ia(r, n, n), r[n].overloadTable.hasOwnProperty(l) && be(`Cannot register multiple overloads of a function with the same number of arguments (${l})!`), r[n].overloadTable[l] = i) : (r[n] = i, r[n].argCount = l);
  }, Pm = 48, Rm = 57, Tm = (n) => {
    n = n.replace(/[^a-zA-Z0-9_]/g, "$");
    var i = n.charCodeAt(0);
    return i >= Pm && i <= Rm ? `_${n}` : n;
  };
  function Lm(n, i, l, u, c, d, h, m) {
    this.name = n, this.constructor = i, this.instancePrototype = l, this.rawDestructor = u, this.baseClass = c, this.getActualType = d, this.upcast = h, this.downcast = m, this.pureVirtualFunctions = [];
  }
  var hl = (n, i, l) => {
    for (; i !== l; )
      i.upcast || be(`Expected null or instance of ${l.name}, got an instance of ${i.name}`), n = i.upcast(n), i = i.baseClass;
    return n;
  }, oa = (n) => {
    if (n === null)
      return "null";
    var i = typeof n;
    return i === "object" || i === "array" || i === "function" ? n.toString() : "" + n;
  };
  function Dm(n, i) {
    if (i === null)
      return this.isReference && be(`null is not a valid ${this.name}`), 0;
    i.$$ || be(`Cannot pass "${oa(i)}" as a ${this.name}`), i.$$.ptr || be(`Cannot pass deleted object as a pointer of type ${this.name}`);
    var l = i.$$.ptrType.registeredClass, u = hl(i.$$.ptr, l, this.registeredClass);
    return u;
  }
  function Fm(n, i) {
    var l;
    if (i === null)
      return this.isReference && be(`null is not a valid ${this.name}`), this.isSmartPointer ? (l = this.rawConstructor(), n !== null && n.push(this.rawDestructor, l), l) : 0;
    (!i || !i.$$) && be(`Cannot pass "${oa(i)}" as a ${this.name}`), i.$$.ptr || be(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && i.$$.ptrType.isConst && be(`Cannot convert argument of type ${i.$$.smartPtrType ? i.$$.smartPtrType.name : i.$$.ptrType.name} to parameter type ${this.name}`);
    var u = i.$$.ptrType.registeredClass;
    if (l = hl(i.$$.ptr, u, this.registeredClass), this.isSmartPointer)
      switch (i.$$.smartPtr === void 0 && be("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
        case 0:
          i.$$.smartPtrType === this ? l = i.$$.smartPtr : be(`Cannot convert argument of type ${i.$$.smartPtrType ? i.$$.smartPtrType.name : i.$$.ptrType.name} to parameter type ${this.name}`);
          break;
        case 1:
          l = i.$$.smartPtr;
          break;
        case 2:
          if (i.$$.smartPtrType === this)
            l = i.$$.smartPtr;
          else {
            var c = i.clone();
            l = this.rawShare(l, Fe.toHandle(() => c.delete())), n !== null && n.push(this.rawDestructor, l);
          }
          break;
        default:
          be("Unsupported sharing policy");
      }
    return l;
  }
  function Am(n, i) {
    if (i === null)
      return this.isReference && be(`null is not a valid ${this.name}`), 0;
    i.$$ || be(`Cannot pass "${oa(i)}" as a ${this.name}`), i.$$.ptr || be(`Cannot pass deleted object as a pointer of type ${this.name}`), i.$$.ptrType.isConst && be(`Cannot convert argument of type ${i.$$.ptrType.name} to parameter type ${this.name}`);
    var l = i.$$.ptrType.registeredClass, u = hl(i.$$.ptr, l, this.registeredClass);
    return u;
  }
  var sf = (n, i, l) => {
    if (i === l)
      return n;
    if (l.baseClass === void 0)
      return null;
    var u = sf(n, i, l.baseClass);
    return u === null ? null : l.downcast(u);
  }, $m = (n, i) => (i = Ie(n, i), Re[i]), vl = (n, i) => {
    (!i.ptrType || !i.ptr) && fl("makeClassHandle requires ptr and ptrType");
    var l = !!i.smartPtrType, u = !!i.smartPtr;
    return l !== u && fl("Both smartPtrType and smartPtr must be specified"), i.count = { value: 1 }, ui(Object.create(n, { $$: { value: i, writable: !0 } }));
  };
  function Mm(n) {
    var i = this.getPointee(n);
    if (!i)
      return this.destructor(n), null;
    var l = $m(this.registeredClass, i);
    if (l !== void 0) {
      if (l.$$.count.value === 0)
        return l.$$.ptr = i, l.$$.smartPtr = n, l.clone();
      var u = l.clone();
      return this.destructor(n), u;
    }
    function c() {
      return this.isSmartPointer ? vl(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: i, smartPtrType: this, smartPtr: n }) : vl(this.registeredClass.instancePrototype, { ptrType: this, ptr: n });
    }
    var d = this.registeredClass.getActualType(i), h = lf[d];
    if (!h)
      return c.call(this);
    var m;
    this.isConst ? m = h.constPointerType : m = h.pointerType;
    var _ = sf(i, this.registeredClass, m.registeredClass);
    return _ === null ? c.call(this) : this.isSmartPointer ? vl(m.registeredClass.instancePrototype, { ptrType: m, ptr: _, smartPtrType: this, smartPtr: n }) : vl(m.registeredClass.instancePrototype, { ptrType: m, ptr: _ });
  }
  var Om = () => {
    Object.assign(io.prototype, { getPointee(n) {
      return this.rawGetPointee && (n = this.rawGetPointee(n)), n;
    }, destructor(n) {
      var i;
      (i = this.rawDestructor) == null || i.call(this, n);
    }, readValueFromPointer: ci, fromWireType: Mm });
  };
  function io(n, i, l, u, c, d, h, m, _, T, O) {
    this.name = n, this.registeredClass = i, this.isReference = l, this.isConst = u, this.isSmartPointer = c, this.pointeeType = d, this.sharingPolicy = h, this.rawGetPointee = m, this.rawConstructor = _, this.rawShare = T, this.rawDestructor = O, !c && i.baseClass === void 0 ? u ? (this.toWireType = Dm, this.destructorFunction = null) : (this.toWireType = Am, this.destructorFunction = null) : this.toWireType = Fm;
  }
  var af = (n, i, l) => {
    r.hasOwnProperty(n) || fl("Replacing nonexistent public symbol"), r[n].overloadTable !== void 0 && l !== void 0 ? r[n].overloadTable[l] = i : (r[n] = i, r[n].argCount = l);
  }, uf = [], la = (n) => {
    var i = uf[n];
    return i || (uf[n] = i = Bf.get(n)), i;
  }, Im = (n, i, l = [], u = !1) => {
    var c = la(i), d = c(...l);
    function h(m) {
      return n[0] == "p" ? m >>> 0 : m;
    }
    return h(d);
  }, jm = (n, i, l = !1) => (...u) => Im(n, i, u, l), ot = (n, i, l = !1) => {
    n = se(n);
    function u() {
      if (n.includes("p"))
        return jm(n, i, l);
      var d = la(i);
      return d;
    }
    var c = u();
    return typeof c != "function" && be(`unknown function pointer with signature ${n}: ${i}`), c;
  };
  class Nm extends Error {
  }
  var jn = (n, i) => {
    var l = [], u = {};
    function c(d) {
      if (!u[d] && !qe[d]) {
        if (cl[d]) {
          cl[d].forEach(c);
          return;
        }
        l.push(d), u[d] = !0;
      }
    }
    throw i.forEach(c), new Nm(`${n}: ` + l.map(xr).join([", "]));
  };
  function zm(n, i, l, u, c, d, h, m, _, T, O, K, J) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0, m >>>= 0, _ >>>= 0, T >>>= 0, O >>>= 0, K >>>= 0, J >>>= 0, O = se(O), d = ot(c, d), m && (m = ot(h, m)), T && (T = ot(_, T)), J = ot(K, J);
    var ee = Tm(O);
    no(ee, function() {
      jn(`Cannot construct ${O} due to unbound types`, [u]);
    }), Ot([n, i, l], u ? [u] : [], (he) => {
      var pi;
      he = he[0];
      var ge, Ce;
      u ? (ge = he.registeredClass, Ce = ge.instancePrototype) : Ce = pl.prototype;
      var Le = Lr(O, function(...so) {
        if (Object.getPrototypeOf(this) !== je)
          throw new Wr(`Use 'new' to construct ${O}`);
        if (Xe.constructor_body === void 0)
          throw new Wr(`${O} has no accessible constructor`);
        var Hf = Xe.constructor_body[so.length];
        if (Hf === void 0)
          throw new Wr(`Tried to invoke ctor of ${O} with invalid number of parameters (${so.length}) - expected (${Object.keys(Xe.constructor_body).toString()}) parameters instead!`);
        return Hf.apply(this, so);
      }), je = Object.create(Ce, { constructor: { value: Le } });
      Le.prototype = je;
      var Xe = new Lm(O, Le, je, J, ge, d, m, T);
      Xe.baseClass && ((pi = Xe.baseClass).__derivedClasses ?? (pi.__derivedClasses = []), Xe.baseClass.__derivedClasses.push(Xe));
      var Ne = new io(O, Xe, !0, !1, !1), Dt = new io(O + "*", Xe, !1, !1, !1), Ve = new io(O + " const*", Xe, !1, !0, !1);
      return lf[n] = { pointerType: Dt, constPointerType: Ve }, af(ee, Le), [Ne, Dt, Ve];
    });
  }
  function cf(n) {
    for (var i = 1; i < n.length; ++i)
      if (n[i] !== null && n[i].destructorFunction === void 0)
        return !0;
    return !1;
  }
  function Bm(n, i, l, u) {
    var c = cf(n), d = n.length - 2, h = [], m = ["fn"];
    i && m.push("thisWired");
    for (var _ = 0; _ < d; ++_)
      h.push(`arg${_}`), m.push(`arg${_}Wired`);
    h = h.join(","), m = m.join(",");
    var T = `return function (${h}) {
`;
    c && (T += `var destructors = [];
`);
    var O = c ? "destructors" : "null", K = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    i && (T += `var thisWired = toClassParamWire(${O}, this);
`);
    for (var _ = 0; _ < d; ++_) {
      var J = `toArg${_}Wire`;
      T += `var arg${_}Wired = ${J}(${O}, arg${_});
`, K.push(J);
    }
    if (T += (l || u ? "var rv = " : "") + `invoker(${m});
`, c)
      T += `runDestructors(destructors);
`;
    else
      for (var _ = i ? 1 : 2; _ < n.length; ++_) {
        var ee = _ === 1 ? "thisWired" : "arg" + (_ - 2) + "Wired";
        n[_].destructorFunction !== null && (T += `${ee}_dtor(${ee});
`, K.push(`${ee}_dtor`));
      }
    return l && (T += `var ret = fromRetWire(rv);
return ret;
`), T += `}
`, new Function(K, T);
  }
  function ml(n, i, l, u, c, d) {
    var h = i.length;
    h < 2 && be("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var m = i[1] !== null && l !== null, _ = cf(i), T = !i[0].isVoid, O = i[0], K = i[1], J = [n, be, u, c, ro, O.fromWireType.bind(O), K == null ? void 0 : K.toWireType.bind(K)], ee = 2; ee < h; ++ee) {
      var he = i[ee];
      J.push(he.toWireType.bind(he));
    }
    if (!_)
      for (var ee = m ? 1 : 2; ee < i.length; ++ee)
        i[ee].destructorFunction !== null && J.push(i[ee].destructorFunction);
    var Ce = Bm(i, m, T, d)(...J);
    return Lr(n, Ce);
  }
  var gl = (n, i) => {
    for (var l = [], u = 0; u < n; u++)
      l.push(Z[i + u * 4 >>> 2 >>> 0]);
    return l;
  }, sa = (n) => {
    n = n.trim();
    const i = n.indexOf("(");
    return i === -1 ? n : n.slice(0, i);
  }, Um = function(n, i, l, u, c, d, h, m, _) {
    n >>>= 0, i >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0;
    var T = gl(l, u);
    i = se(i), i = sa(i), d = ot(c, d, m), Ot([], [n], (O) => {
      O = O[0];
      var K = `${O.name}.${i}`;
      function J() {
        jn(`Cannot call ${K} due to unbound types`, T);
      }
      i.startsWith("@@") && (i = Symbol[i.substring(2)]);
      var ee = O.registeredClass.constructor;
      return ee[i] === void 0 ? (J.argCount = l - 1, ee[i] = J) : (ia(ee, i, K), ee[i].overloadTable[l - 1] = J), Ot([], T, (he) => {
        var ge = [he[0], null].concat(he.slice(1)), Ce = ml(K, ge, null, d, h, m);
        if (ee[i].overloadTable === void 0 ? (Ce.argCount = l - 1, ee[i] = Ce) : ee[i].overloadTable[l - 1] = Ce, O.registeredClass.__derivedClasses)
          for (const Le of O.registeredClass.__derivedClasses)
            Le.constructor.hasOwnProperty(i) || (Le.constructor[i] = Ce);
        return [];
      }), [];
    });
  }, Vm = function(n, i, l, u, c, d) {
    n >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0;
    var h = gl(i, l);
    c = ot(u, c), Ot([], [n], (m) => {
      m = m[0];
      var _ = `constructor ${m.name}`;
      if (m.registeredClass.constructor_body === void 0 && (m.registeredClass.constructor_body = []), m.registeredClass.constructor_body[i - 1] !== void 0)
        throw new Wr(`Cannot register multiple constructors with identical number of parameters (${i - 1}) for class '${m.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      return m.registeredClass.constructor_body[i - 1] = () => {
        jn(`Cannot construct ${m.name} due to unbound types`, h);
      }, Ot([], h, (T) => (T.splice(1, 0, null), m.registeredClass.constructor_body[i - 1] = ml(_, T, null, c, d), [])), [];
    });
  }, Wm = function(n, i, l, u, c, d, h, m, _, T) {
    n >>>= 0, i >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0;
    var O = gl(l, u);
    i = se(i), i = sa(i), d = ot(c, d, _), Ot([], [n], (K) => {
      K = K[0];
      var J = `${K.name}.${i}`;
      i.startsWith("@@") && (i = Symbol[i.substring(2)]), m && K.registeredClass.pureVirtualFunctions.push(i);
      function ee() {
        jn(`Cannot call ${J} due to unbound types`, O);
      }
      var he = K.registeredClass.instancePrototype, ge = he[i];
      return ge === void 0 || ge.overloadTable === void 0 && ge.className !== K.name && ge.argCount === l - 2 ? (ee.argCount = l - 2, ee.className = K.name, he[i] = ee) : (ia(he, i, J), he[i].overloadTable[l - 2] = ee), Ot([], O, (Ce) => {
        var Le = ml(J, Ce, K, d, h, _);
        return he[i].overloadTable === void 0 ? (Le.argCount = l - 2, he[i] = Le) : he[i].overloadTable[l - 2] = Le, [];
      }), [];
    });
  }, ff = (n, i, l) => (n instanceof Object || be(`${l} with invalid "this": ${n}`), n instanceof i.registeredClass.constructor || be(`${l} incompatible with "this" of type ${n.constructor.name}`), n.$$.ptr || be(`cannot call emscripten binding method ${l} on deleted object`), hl(n.$$.ptr, n.$$.ptrType.registeredClass, i.registeredClass)), Hm = function(n, i, l, u, c, d, h, m, _, T) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0, m >>>= 0, _ >>>= 0, T >>>= 0, i = se(i), c = ot(u, c), Ot([], [n], (O) => {
      O = O[0];
      var K = `${O.name}.${i}`, J = { get() {
        jn(`Cannot access ${K} due to unbound types`, [l, h]);
      }, enumerable: !0, configurable: !0 };
      return _ ? J.set = () => jn(`Cannot access ${K} due to unbound types`, [l, h]) : J.set = (ee) => be(K + " is a read-only property"), Object.defineProperty(O.registeredClass.instancePrototype, i, J), Ot([], _ ? [l, h] : [l], (ee) => {
        var he = ee[0], ge = { get() {
          var Le = ff(this, O, K + " getter");
          return he.fromWireType(c(d, Le));
        }, enumerable: !0 };
        if (_) {
          _ = ot(m, _);
          var Ce = ee[1];
          ge.set = function(Le) {
            var je = ff(this, O, K + " setter"), Xe = [];
            _(T, je, Ce.toWireType(Xe, Le)), ro(Xe);
          };
        }
        return Object.defineProperty(O.registeredClass.instancePrototype, i, ge), [];
      }), [];
    });
  };
  function aa(n) {
    n >>>= 0, n > 9 && --Tt[n + 1] === 0 && (Tt[n] = void 0, eo.push(n));
  }
  var df = { name: "emscripten::val", fromWireType: (n) => {
    var i = Fe.toValue(n);
    return aa(n), i;
  }, toWireType: (n, i) => Fe.toHandle(i), readValueFromPointer: ci, destructorFunction: null };
  function pf(n) {
    return n >>>= 0, It(n, df);
  }
  var ua = (n, i, l) => {
    switch (i) {
      case 1:
        return l ? function(u) {
          return this.fromWireType(A[u >>> 0]);
        } : function(u) {
          return this.fromWireType(I[u >>> 0]);
        };
      case 2:
        return l ? function(u) {
          return this.fromWireType($[u >>> 1 >>> 0]);
        } : function(u) {
          return this.fromWireType(F[u >>> 1 >>> 0]);
        };
      case 4:
        return l ? function(u) {
          return this.fromWireType(S[u >>> 2 >>> 0]);
        } : function(u) {
          return this.fromWireType(Z[u >>> 2 >>> 0]);
        };
      default:
        throw new TypeError(`invalid integer width (${i}): ${n}`);
    }
  };
  function Gm(n) {
    return n === 0 ? "object" : n === 1 ? "number" : "string";
  }
  function Xm(n, i, l, u, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = se(i);
    const d = Gm(c);
    switch (d) {
      case "object": {
        let T = function() {
        };
        T.values = {}, It(n, { name: i, constructor: T, valueType: d, fromWireType: function(O) {
          return this.constructor.values[O];
        }, toWireType: (O, K) => K.value, readValueFromPointer: ua(i, l, u), destructorFunction: null }), no(i, T);
        break;
      }
      case "number": {
        var h = {};
        It(n, { name: i, keysMap: h, valueType: d, fromWireType: (T) => T, toWireType: (T, O) => O, readValueFromPointer: ua(i, l, u), destructorFunction: null }), no(i, h), delete r[i].argCount;
        break;
      }
      case "string": {
        var m = {}, _ = {}, h = {};
        It(n, { name: i, valuesMap: m, reverseMap: _, keysMap: h, valueType: d, fromWireType: function(O) {
          return this.reverseMap[O];
        }, toWireType: function(O, K) {
          return this.valuesMap[K];
        }, readValueFromPointer: ua(i, l, u), destructorFunction: null }), no(i, h), delete r[i].argCount;
        break;
      }
    }
  }
  function Ym(n, i, l) {
    n >>>= 0, i >>>= 0;
    var u = Lt(n, "enum");
    switch (i = se(i), u.valueType) {
      case "object": {
        var c = u.constructor, d = Object.create(u.constructor.prototype, { value: { value: l }, constructor: { value: Lr(`${u.name}_${i}`, function() {
        }) } });
        c.values[l] = d, c[i] = d;
        break;
      }
      case "number": {
        u.keysMap[i] = l;
        break;
      }
      case "string": {
        u.valuesMap[i] = l, u.reverseMap[l] = i, u.keysMap[i] = i;
        break;
      }
    }
  }
  var Km = (n, i) => {
    switch (i) {
      case 4:
        return function(l) {
          return this.fromWireType(ue[l >>> 2 >>> 0]);
        };
      case 8:
        return function(l) {
          return this.fromWireType(Pe[l >>> 3 >>> 0]);
        };
      default:
        throw new TypeError(`invalid float width (${i}): ${n}`);
    }
  }, Qm = function(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = se(i), It(n, { name: i, fromWireType: (u) => u, toWireType: (u, c) => c, readValueFromPointer: Km(i, l), destructorFunction: null });
  };
  function Zm(n, i, l, u, c, d, h, m) {
    n >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0;
    var _ = gl(i, l);
    n = se(n), n = sa(n), c = ot(u, c, h), no(n, function() {
      jn(`Cannot call ${n} due to unbound types`, _);
    }, i - 1), Ot([], _, (T) => {
      var O = [T[0], null].concat(T.slice(1));
      return af(n, ml(n, O, null, c, d, h), i - 1), [];
    });
  }
  var qm = function(n, i, l, u, c) {
    n >>>= 0, i >>>= 0, l >>>= 0, i = se(i);
    const d = u === 0;
    let h = (_) => _;
    if (d) {
      var m = 32 - 8 * l;
      h = (_) => _ << m >>> m, c = h(c);
    }
    It(n, { name: i, fromWireType: h, toWireType: (_, T) => T, readValueFromPointer: of(i, l, u !== 0), destructorFunction: null });
  }, Jm = (n, i, l) => {
    const u = (c, d) => {
      let h = 0;
      return { next() {
        if (h >= c)
          return { done: !0 };
        const m = h;
        return h++, { value: d(m), done: !1 };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
    n[Symbol.iterator] || (n[Symbol.iterator] = function() {
      const c = this[i]();
      return u(c, (d) => this[l](d));
    });
  }, eg = function(n, i, l, u) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, l = se(l), u = se(u), Ot([], [n, i], (c) => {
      const d = c[0];
      return Jm(d.registeredClass.instancePrototype, l, u), [];
    });
  };
  function tg(n, i, l) {
    n >>>= 0, l >>>= 0;
    var u = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array], c = u[i];
    function d(h) {
      var m = Z[h >>> 2 >>> 0], _ = Z[h + 4 >>> 2 >>> 0];
      return new c(A.buffer, _, m);
    }
    l = se(l), It(n, { name: l, fromWireType: d, readValueFromPointer: d }, { ignoreDuplicateRegistrations: !0 });
  }
  var rg = Object.assign({ optional: !0 }, df);
  function ng(n, i) {
    n >>>= 0, It(n, rg);
  }
  var ig = function(n, i, l, u, c, d, h, m, _, T, O, K) {
    n >>>= 0, i >>>= 0, l >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0, m >>>= 0, _ >>>= 0, T >>>= 0, O >>>= 0, K >>>= 0, l = se(l), d = ot(c, d), m = ot(h, m), T = ot(_, T), K = ot(O, K), Ot([n], [i], (J) => {
      J = J[0];
      var ee = new io(l, J.registeredClass, !1, !1, !0, J, u, d, m, T, K);
      return [ee];
    });
  };
  function og(n, i) {
    n >>>= 0, i >>>= 0, i = se(i), It(n, { name: i, fromWireType(l) {
      var u = Z[l >>> 2 >>> 0], c = l + 4, d;
      return d = Kt(c, u, !0), Dr(l), d;
    }, toWireType(l, u) {
      u instanceof ArrayBuffer && (u = new Uint8Array(u));
      var c, d = typeof u == "string";
      d || ArrayBuffer.isView(u) && u.BYTES_PER_ELEMENT == 1 || be("Cannot pass non-string to std::string"), d ? c = ir(u) : c = u.length;
      var h = di(4 + c + 1), m = h + 4;
      return Z[h >>> 2 >>> 0] = c, d ? N(u, m, c + 1) : I.set(u, m >>> 0), l !== null && l.push(Dr, h), h;
    }, readValueFromPointer: ci, destructorFunction(l) {
      Dr(l);
    } });
  }
  var hf = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, lg = (n, i, l) => {
    var u = n >>> 1, c = zr(F, u, i / 2, l);
    if (c - u > 16 && hf) return hf.decode(F.subarray(u >>> 0, c >>> 0));
    for (var d = "", h = u; h < c; ++h) {
      var m = F[h >>> 0];
      d += String.fromCharCode(m);
    }
    return d;
  }, sg = (n, i, l) => {
    if (l ?? (l = 2147483647), l < 2) return 0;
    l -= 2;
    for (var u = i, c = l < n.length * 2 ? l / 2 : n.length, d = 0; d < c; ++d) {
      var h = n.charCodeAt(d);
      $[i >>> 1 >>> 0] = h, i += 2;
    }
    return $[i >>> 1 >>> 0] = 0, i - u;
  }, ag = (n) => n.length * 2, ug = (n, i, l) => {
    for (var u = "", c = n >>> 2, d = 0; !(d >= i / 4); d++) {
      var h = Z[c + d >>> 0];
      if (!h && !l) break;
      u += String.fromCodePoint(h);
    }
    return u;
  }, cg = (n, i, l) => {
    if (i >>>= 0, l ?? (l = 2147483647), l < 4) return 0;
    for (var u = i, c = u + l - 4, d = 0; d < n.length; ++d) {
      var h = n.codePointAt(d);
      if (h > 65535 && d++, S[i >>> 2 >>> 0] = h, i += 4, i + 4 > c) break;
    }
    return S[i >>> 2 >>> 0] = 0, i - u;
  }, fg = (n) => {
    for (var i = 0, l = 0; l < n.length; ++l) {
      var u = n.codePointAt(l);
      u > 65535 && l++, i += 4;
    }
    return i;
  };
  function dg(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, l = se(l);
    var u, c, d;
    i === 2 ? (u = lg, c = sg, d = ag) : (u = ug, c = cg, d = fg), It(n, { name: l, fromWireType: (h) => {
      var m = Z[h >>> 2 >>> 0], _ = u(h + 4, m * i, !0);
      return Dr(h), _;
    }, toWireType: (h, m) => {
      typeof m != "string" && be(`Cannot pass non-string to C++ string type ${l}`);
      var _ = d(m), T = di(4 + _ + i);
      return Z[T >>> 2 >>> 0] = _ / i, c(m, T + 4, _ + i), h !== null && h.push(Dr, T), T;
    }, readValueFromPointer: ci, destructorFunction(h) {
      Dr(h);
    } });
  }
  function pg(n, i) {
    n >>>= 0, pf(n);
  }
  function hg(n, i, l, u, c, d) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, ul[n] = { name: se(i), rawConstructor: ot(l, u), rawDestructor: ot(c, d), elements: [] };
  }
  function vg(n, i, l, u, c, d, h, m, _) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0, m >>>= 0, _ >>>= 0, ul[n].elements.push({ getterReturnType: i, getter: ot(l, u), getterContext: c, setterArgumentType: d, setter: ot(h, m), setterContext: _ });
  }
  function mg(n, i, l, u, c, d) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, dl[n] = { name: se(i), rawConstructor: ot(l, u), rawDestructor: ot(c, d), fields: [] };
  }
  function gg(n, i, l, u, c, d, h, m, _, T) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, d >>>= 0, h >>>= 0, m >>>= 0, _ >>>= 0, T >>>= 0, dl[n].fields.push({ fieldName: se(i), getterReturnType: l, getter: ot(u, c), getterContext: d, setterArgumentType: h, setter: ot(m, _), setterContext: T });
  }
  var yg = function(n, i) {
    n >>>= 0, i >>>= 0, i = se(i), It(n, { isVoid: !0, name: i, fromWireType: () => {
    }, toWireType: (l, u) => {
    } });
  };
  function wg(n, i) {
    n >>>= 0, i >>>= 0, n = Fe.toValue(n), i = Fe.toValue(i), n.set(i);
  }
  var ca = [], _g = (n) => {
    var i = ca.length;
    return ca.push(n), i;
  }, xg = (n, i) => {
    for (var l = new Array(n), u = 0; u < n; ++u)
      l[u] = Lt(Z[i + u * 4 >>> 2 >>> 0], `parameter ${u}`);
    return l;
  }, kg = (n, i, l) => {
    var u = [], c = n(u, l);
    return u.length && (Z[i >>> 2 >>> 0] = Fe.toHandle(u)), c;
  }, Sg = {}, yl = (n) => {
    var i = Sg[n];
    return i === void 0 ? se(n) : i;
  }, Eg = function(n, i, l) {
    i >>>= 0;
    var u = 8, [c, ...d] = xg(n, i), h = c.toWireType.bind(c), m = d.map((ee) => ee.readValueFromPointer.bind(ee));
    n--;
    var _ = { toValue: Fe.toValue }, T = m.map((ee, he) => {
      var ge = `argFromPtr${he}`;
      return _[ge] = ee, `${ge}(args${he ? "+" + he * u : ""})`;
    }), O;
    switch (l) {
      case 0:
        O = "toValue(handle)";
        break;
      case 2:
        O = "new (toValue(handle))";
        break;
      case 3:
        O = "";
        break;
      case 1:
        _.getStringOrSymbol = yl, O = "toValue(handle)[getStringOrSymbol(methodName)]";
        break;
    }
    O += `(${T})`, c.isVoid || (_.toReturnWire = h, _.emval_returnValue = kg, O = `return emval_returnValue(toReturnWire, destructorsRef, ${O})`), O = `return function (handle, methodName, destructorsRef, args) {
${O}
}`;
    var K = new Function(Object.keys(_), O)(...Object.values(_)), J = `methodCaller<(${d.map((ee) => ee.name)}) => ${c.name}>`;
    return _g(Lr(J, K));
  };
  function bg(n) {
    return n >>>= 0, n ? (n = yl(n), Fe.toHandle(globalThis[n])) : Fe.toHandle(globalThis);
  }
  function Cg(n) {
    return n >>>= 0, n = yl(n), Fe.toHandle(r[n]);
  }
  function Pg(n, i) {
    return n >>>= 0, i >>>= 0, n = Fe.toValue(n), i = Fe.toValue(i), Fe.toHandle(n[i]);
  }
  function Rg(n) {
    n >>>= 0, n > 9 && (Tt[n + 1] += 1);
  }
  function Tg(n, i) {
    return n >>>= 0, i >>>= 0, n = Fe.toValue(n), i = Fe.toValue(i), n instanceof i;
  }
  function Lg(n, i, l, u, c) {
    return n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, c >>>= 0, ca[n](i, l, u, c);
  }
  function Dg(n) {
    return n >>>= 0, n = Fe.toValue(n), Fe.toHandle(n[Symbol.iterator]());
  }
  function Fg(n) {
    n >>>= 0, n = Fe.toValue(n);
    var i = n.next();
    return i.done ? 0 : Fe.toHandle(i.value);
  }
  function Ag() {
    return Fe.toHandle([]);
  }
  function $g(n) {
    n >>>= 0, n = Fe.toValue(n);
    for (var i = new Array(n.length), l = 0; l < n.length; l++) i[l] = n[l];
    return Fe.toHandle(i);
  }
  function Mg(n) {
    return n >>>= 0, Fe.toHandle(yl(n));
  }
  function Og() {
    return Fe.toHandle({});
  }
  function Ig(n) {
    n >>>= 0;
    var i = Fe.toValue(n);
    ro(i), aa(n);
  }
  function jg(n, i, l) {
    n >>>= 0, i >>>= 0, l >>>= 0, n = Fe.toValue(n), i = Fe.toValue(i), l = Fe.toValue(l), n[i] = l;
  }
  function Ng(n, i) {
    return n >>>= 0, i >>>= 0, n = Fe.toValue(n), i = Fe.toValue(i), n === i;
  }
  function zg(n) {
    return n >>>= 0, n = Fe.toValue(n), Fe.toHandle(typeof n);
  }
  function Bg(n, i) {
    n = or(n), i >>>= 0;
    var l = new Date(n * 1e3);
    S[i >>> 2 >>> 0] = l.getUTCSeconds(), S[i + 4 >>> 2 >>> 0] = l.getUTCMinutes(), S[i + 8 >>> 2 >>> 0] = l.getUTCHours(), S[i + 12 >>> 2 >>> 0] = l.getUTCDate(), S[i + 16 >>> 2 >>> 0] = l.getUTCMonth(), S[i + 20 >>> 2 >>> 0] = l.getUTCFullYear() - 1900, S[i + 24 >>> 2 >>> 0] = l.getUTCDay();
    var u = Date.UTC(l.getUTCFullYear(), 0, 1, 0, 0, 0, 0), c = (l.getTime() - u) / (1e3 * 60 * 60 * 24) | 0;
    S[i + 28 >>> 2 >>> 0] = c;
  }
  var Ug = (n) => n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0), Vg = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Wg = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], vf = (n) => {
    var i = Ug(n.getFullYear()), l = i ? Vg : Wg, u = l[n.getMonth()] + n.getDate() - 1;
    return u;
  };
  function Hg(n, i) {
    n = or(n), i >>>= 0;
    var l = new Date(n * 1e3);
    S[i >>> 2 >>> 0] = l.getSeconds(), S[i + 4 >>> 2 >>> 0] = l.getMinutes(), S[i + 8 >>> 2 >>> 0] = l.getHours(), S[i + 12 >>> 2 >>> 0] = l.getDate(), S[i + 16 >>> 2 >>> 0] = l.getMonth(), S[i + 20 >>> 2 >>> 0] = l.getFullYear() - 1900, S[i + 24 >>> 2 >>> 0] = l.getDay();
    var u = vf(l) | 0;
    S[i + 28 >>> 2 >>> 0] = u, S[i + 36 >>> 2 >>> 0] = -(l.getTimezoneOffset() * 60);
    var c = new Date(l.getFullYear(), 0, 1), d = new Date(l.getFullYear(), 6, 1).getTimezoneOffset(), h = c.getTimezoneOffset(), m = (d != h && l.getTimezoneOffset() == Math.min(h, d)) | 0;
    S[i + 32 >>> 2 >>> 0] = m;
  }
  var Gg = function(n) {
    n >>>= 0;
    var i = (() => {
      var l = new Date(S[n + 20 >>> 2 >>> 0] + 1900, S[n + 16 >>> 2 >>> 0], S[n + 12 >>> 2 >>> 0], S[n + 8 >>> 2 >>> 0], S[n + 4 >>> 2 >>> 0], S[n >>> 2 >>> 0], 0), u = S[n + 32 >>> 2 >>> 0], c = l.getTimezoneOffset(), d = new Date(l.getFullYear(), 0, 1), h = new Date(l.getFullYear(), 6, 1).getTimezoneOffset(), m = d.getTimezoneOffset(), _ = Math.min(m, h);
      if (u < 0)
        S[n + 32 >>> 2 >>> 0] = +(h != m && _ == c);
      else if (u > 0 != (_ == c)) {
        var T = Math.max(m, h), O = u > 0 ? _ : T;
        l.setTime(l.getTime() + (O - c) * 6e4);
      }
      S[n + 24 >>> 2 >>> 0] = l.getDay();
      var K = vf(l) | 0;
      S[n + 28 >>> 2 >>> 0] = K, S[n >>> 2 >>> 0] = l.getSeconds(), S[n + 4 >>> 2 >>> 0] = l.getMinutes(), S[n + 8 >>> 2 >>> 0] = l.getHours(), S[n + 12 >>> 2 >>> 0] = l.getDate(), S[n + 16 >>> 2 >>> 0] = l.getMonth(), S[n + 20 >>> 2 >>> 0] = l.getYear();
      var J = l.getTime();
      return isNaN(J) ? -1 : J / 1e3;
    })();
    return BigInt(i);
  };
  function Xg(n, i, l, u, c, d, h) {
    n >>>= 0, c = or(c), d >>>= 0, h >>>= 0;
    try {
      var m = we.getStreamFromFD(u), _ = v.mmap(m, n, c, i, l), T = _.ptr;
      return S[d >>> 2 >>> 0] = _.allocated, Z[h >>> 2 >>> 0] = T, 0;
    } catch (O) {
      if (typeof v > "u" || O.name !== "ErrnoError") throw O;
      return -O.errno;
    }
  }
  function Yg(n, i, l, u, c, d) {
    n >>>= 0, i >>>= 0, d = or(d);
    try {
      var h = we.getStreamFromFD(c);
      l & 2 && we.doMsync(n, h, i, u, d);
    } catch (m) {
      if (typeof v > "u" || m.name !== "ErrnoError") throw m;
      return -m.errno;
    }
  }
  var Kg = function(n, i, l, u) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0;
    var c = (/* @__PURE__ */ new Date()).getFullYear(), d = new Date(c, 0, 1), h = new Date(c, 6, 1), m = d.getTimezoneOffset(), _ = h.getTimezoneOffset(), T = Math.max(m, _);
    Z[n >>> 2 >>> 0] = T * 60, S[i >>> 2 >>> 0] = +(m != _);
    var O = (ee) => {
      var he = ee >= 0 ? "-" : "+", ge = Math.abs(ee), Ce = String(Math.floor(ge / 60)).padStart(2, "0"), Le = String(ge % 60).padStart(2, "0");
      return `UTC${he}${Ce}${Le}`;
    }, K = O(m), J = O(_);
    _ < m ? (N(K, l, 17), N(J, u, 17)) : (N(K, u, 17), N(J, l, 17));
  }, mf = () => performance.now(), gf = () => Date.now(), Qg = (n) => n >= 0 && n <= 3;
  function Zg(n, i, l) {
    if (l >>>= 0, !Qg(n))
      return 28;
    var u;
    n === 0 ? u = gf() : u = mf();
    var c = Math.round(u * 1e3 * 1e3);
    return Se[l >>> 3 >>> 0] = BigInt(c), 0;
  }
  var yf = (n) => {
    if (n instanceof ln || n == "unwind")
      return E;
    g(1, n);
  }, qg = 0, wf = () => _t || qg > 0, _f = (n) => {
    var i;
    E = n, wf() || ((i = r.onExit) == null || i.call(r, n), k = !0), g(n, new ln(n));
  }, Jg = (n, i) => {
    E = n, _f(n);
  }, xf = Jg, ey = () => {
    if (!wf())
      try {
        xf(E);
      } catch (n) {
        yf(n);
      }
  }, ty = (n) => {
    if (!k)
      try {
        return n();
      } catch (i) {
        yf(i);
      } finally {
        ey();
      }
  };
  function kf() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
  }
  var Sf = (n, i) => setTimeout(() => {
    ty(n);
  }, i), oe = { useWebGL: !1, isFullscreen: !1, pointerLock: !1, moduleContextCreatedCallbacks: [], workers: [], preloadedImages: {}, preloadedAudios: {}, getCanvas: () => r.canvas, init() {
    if (oe.initted) return;
    oe.initted = !0;
    var n = {};
    n.canHandle = function(d) {
      return !r.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test(d);
    }, n.handle = async function(d, h) {
      var m = new Blob([d], { type: oe.getMimetype(h) });
      m.size !== d.length && (m = new Blob([new Uint8Array(d).buffer], { type: oe.getMimetype(h) }));
      var _ = URL.createObjectURL(m);
      return new Promise((T, O) => {
        var K = new Image();
        K.onload = () => {
          var J = document.createElement("canvas");
          J.width = K.width, J.height = K.height;
          var ee = J.getContext("2d");
          ee.drawImage(K, 0, 0), oe.preloadedImages[h] = J, URL.revokeObjectURL(_), T(d);
        }, K.onerror = (J) => {
          Q(`Image ${_} could not be decoded`), O();
        }, K.src = _;
      });
    }, Yt.push(n);
    var i = {};
    i.canHandle = function(d) {
      return !r.noAudioDecoding && d.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
    }, i.handle = async function(d, h) {
      return new Promise((m, _) => {
        var T = !1;
        function O(he) {
          T || (T = !0, oe.preloadedAudios[h] = he, m(d));
        }
        var K = new Blob([d], { type: oe.getMimetype(h) }), J = URL.createObjectURL(K), ee = new Audio();
        ee.addEventListener("canplaythrough", () => O(ee), !1), ee.onerror = function(ge) {
          if (T) return;
          Q(`warning: browser could not fully decode audio ${h}, trying slower base64 approach`);
          function Ce(Le) {
            for (var je = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Xe = "=", Ne = "", Dt = 0, Ve = 0, pi = 0; pi < Le.length; pi++)
              for (Dt = Dt << 8 | Le[pi], Ve += 8; Ve >= 6; ) {
                var so = Dt >> Ve - 6 & 63;
                Ve -= 6, Ne += je[so];
              }
            return Ve == 2 ? (Ne += je[(Dt & 3) << 4], Ne += Xe + Xe) : Ve == 4 && (Ne += je[(Dt & 15) << 2], Ne += Xe), Ne;
          }
          ee.src = "data:audio/x-" + h.slice(-3) + ";base64," + Ce(d), O(ee);
        }, ee.src = J, Sf(() => {
          O(ee);
        }, 1e4);
      });
    }, Yt.push(i);
    function l() {
      var c = oe.getCanvas();
      oe.pointerLock = document.pointerLockElement === c;
    }
    var u = oe.getCanvas();
    u && (document.addEventListener("pointerlockchange", l, !1), r.elementPointerLock && u.addEventListener("click", (c) => {
      !oe.pointerLock && oe.getCanvas().requestPointerLock && (oe.getCanvas().requestPointerLock(), c.preventDefault());
    }, !1));
  }, createContext(n, i, l, u) {
    if (i && r.ctx && n == oe.getCanvas()) return r.ctx;
    var c, d;
    if (i) {
      var h = { antialias: !1, alpha: !1, majorVersion: typeof WebGL2RenderingContext < "u" ? 2 : 1 };
      if (u)
        for (var m in u)
          h[m] = u[m];
      typeof G < "u" && (d = G.createContext(n, h), d && (c = G.getContext(d).GLctx));
    } else
      c = n.getContext("2d");
    return c ? (l && (r.ctx = c, i && G.makeContextCurrent(d), oe.useWebGL = i, oe.moduleContextCreatedCallbacks.forEach((_) => _()), oe.init()), c) : null;
  }, fullscreenHandlersInstalled: !1, lockPointer: void 0, resizeCanvas: void 0, requestFullscreen(n, i) {
    oe.lockPointer = n, oe.resizeCanvas = i, typeof oe.lockPointer > "u" && (oe.lockPointer = !0), typeof oe.resizeCanvas > "u" && (oe.resizeCanvas = !1);
    var l = oe.getCanvas();
    function u() {
      var h, m;
      oe.isFullscreen = !1;
      var d = l.parentNode;
      kf() === d ? (l.exitFullscreen = oe.exitFullscreen, oe.lockPointer && l.requestPointerLock(), oe.isFullscreen = !0, oe.resizeCanvas ? oe.setFullscreenCanvasSize() : oe.updateCanvasDimensions(l)) : (d.parentNode.insertBefore(l, d), d.parentNode.removeChild(d), oe.resizeCanvas ? oe.setWindowedCanvasSize() : oe.updateCanvasDimensions(l)), (h = r.onFullScreen) == null || h.call(r, oe.isFullscreen), (m = r.onFullscreen) == null || m.call(r, oe.isFullscreen);
    }
    oe.fullscreenHandlersInstalled || (oe.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", u, !1), document.addEventListener("mozfullscreenchange", u, !1), document.addEventListener("webkitfullscreenchange", u, !1), document.addEventListener("MSFullscreenChange", u, !1));
    var c = document.createElement("div");
    l.parentNode.insertBefore(c, l), c.appendChild(l), c.requestFullscreen = c.requestFullscreen || c.mozRequestFullScreen || c.msRequestFullscreen || (c.webkitRequestFullscreen ? () => c.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (c.webkitRequestFullScreen ? () => c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null), c.requestFullscreen();
  }, exitFullscreen() {
    if (!oe.isFullscreen)
      return !1;
    var n = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || (() => {
    });
    return n.apply(document, []), !0;
  }, safeSetTimeout(n, i) {
    return Sf(n, i);
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
            De("unrecognized mouse wheel delta mode: " + n.deltaMode);
        }
        break;
      default:
        De("unrecognized mouse wheel event: " + n.type);
    }
    return i;
  }, mouseX: 0, mouseY: 0, mouseMovementX: 0, mouseMovementY: 0, touches: {}, lastTouches: {}, calculateMouseCoords(n, i) {
    var l = oe.getCanvas(), u = l.getBoundingClientRect(), c = typeof window.scrollX < "u" ? window.scrollX : window.pageXOffset, d = typeof window.scrollY < "u" ? window.scrollY : window.pageYOffset, h = n - (c + u.left), m = i - (d + u.top);
    return h = h * (l.width / u.width), m = m * (l.height / u.height), { x: h, y: m };
  }, setMouseCoords(n, i) {
    const { x: l, y: u } = oe.calculateMouseCoords(n, i);
    oe.mouseMovementX = l - oe.mouseX, oe.mouseMovementY = u - oe.mouseY, oe.mouseX = l, oe.mouseY = u;
  }, calculateMouseEvent(n) {
    if (oe.pointerLock)
      n.type != "mousemove" && "mozMovementX" in n ? oe.mouseMovementX = oe.mouseMovementY = 0 : (oe.mouseMovementX = oe.getMovementX(n), oe.mouseMovementY = oe.getMovementY(n)), oe.mouseX += oe.mouseMovementX, oe.mouseY += oe.mouseMovementY;
    else {
      if (n.type === "touchstart" || n.type === "touchend" || n.type === "touchmove") {
        var i = n.touch;
        if (i === void 0)
          return;
        var l = oe.calculateMouseCoords(i.pageX, i.pageY);
        if (n.type === "touchstart")
          oe.lastTouches[i.identifier] = l, oe.touches[i.identifier] = l;
        else if (n.type === "touchend" || n.type === "touchmove") {
          var u = oe.touches[i.identifier];
          u || (u = l), oe.lastTouches[i.identifier] = u, oe.touches[i.identifier] = l;
        }
        return;
      }
      oe.setMouseCoords(n.pageX, n.pageY);
    }
  }, resizeListeners: [], updateResizeListeners() {
    var n = oe.getCanvas();
    oe.resizeListeners.forEach((i) => i(n.width, n.height));
  }, setCanvasSize(n, i, l) {
    var u = oe.getCanvas();
    oe.updateCanvasDimensions(u, n, i), l || oe.updateResizeListeners();
  }, windowedWidth: 0, windowedHeight: 0, setFullscreenCanvasSize() {
    if (typeof SDL < "u") {
      var n = Z[SDL.screen >>> 2 >>> 0];
      n = n | 8388608, S[SDL.screen >>> 2 >>> 0] = n;
    }
    oe.updateCanvasDimensions(oe.getCanvas()), oe.updateResizeListeners();
  }, setWindowedCanvasSize() {
    if (typeof SDL < "u") {
      var n = Z[SDL.screen >>> 2 >>> 0];
      n = n & -8388609, S[SDL.screen >>> 2 >>> 0] = n;
    }
    oe.updateCanvasDimensions(oe.getCanvas()), oe.updateResizeListeners();
  }, updateCanvasDimensions(n, i, l) {
    i && l ? (n.widthNative = i, n.heightNative = l) : (i = n.widthNative, l = n.heightNative);
    var u = i, c = l;
    if (r.forcedAspectRatio > 0 && (u / c < r.forcedAspectRatio ? u = Math.round(c * r.forcedAspectRatio) : c = Math.round(u / r.forcedAspectRatio)), kf() === n.parentNode && typeof screen < "u") {
      var d = Math.min(screen.width / u, screen.height / c);
      u = Math.round(u * d), c = Math.round(c * d);
    }
    oe.resizeCanvas ? (n.width != u && (n.width = u), n.height != c && (n.height = c), typeof n.style < "u" && (n.style.removeProperty("width"), n.style.removeProperty("height"))) : (n.width != i && (n.width = i), n.height != l && (n.height = l), typeof n.style < "u" && (u != i || c != l ? (n.style.setProperty("width", u + "px", "important"), n.style.setProperty("height", c + "px", "important")) : (n.style.removeProperty("width"), n.style.removeProperty("height"))));
  } }, pe = { errorCode: 12288, defaultDisplayInitialized: !1, currentContext: 0, currentReadSurface: 0, currentDrawSurface: 0, contextAttributes: { alpha: !1, depth: !1, stencil: !1, antialias: !1 }, stringCache: {}, setErrorCode(n) {
    pe.errorCode = n;
  }, chooseConfig(n, i, l, u, c) {
    if (n != 62e3)
      return pe.setErrorCode(12296), 0;
    if (i)
      for (; ; ) {
        var d = S[i >>> 2 >>> 0];
        if (d == 12321) {
          var h = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.alpha = h > 0;
        } else if (d == 12325) {
          var m = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.depth = m > 0;
        } else if (d == 12326) {
          var _ = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.stencil = _ > 0;
        } else if (d == 12337) {
          var T = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.antialias = T > 0;
        } else if (d == 12338) {
          var T = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.antialias = T == 1;
        } else if (d == 12544) {
          var O = S[i + 4 >>> 2 >>> 0];
          pe.contextAttributes.lowLatency = O != 12547;
        } else if (d == 12344)
          break;
        i += 8;
      }
    return (!l || !u) && !c ? (pe.setErrorCode(12300), 0) : (c && (S[c >>> 2 >>> 0] = 1), l && u > 0 && (Z[l >>> 2 >>> 0] = 62002), pe.setErrorCode(12288), 1);
  } }, ry = (n) => n == 12448 ? (pe.setErrorCode(12288), 1) : (pe.setErrorCode(12300), 0);
  function ny(n, i, l, u, c) {
    return n >>>= 0, i >>>= 0, l >>>= 0, c >>>= 0, pe.chooseConfig(n, i, l, u, c);
  }
  var W, iy = (n) => {
    var i = n.getExtension("ANGLE_instanced_arrays");
    if (i)
      return n.vertexAttribDivisor = (l, u) => i.vertexAttribDivisorANGLE(l, u), n.drawArraysInstanced = (l, u, c, d) => i.drawArraysInstancedANGLE(l, u, c, d), n.drawElementsInstanced = (l, u, c, d, h) => i.drawElementsInstancedANGLE(l, u, c, d, h), 1;
  }, oy = (n) => {
    var i = n.getExtension("OES_vertex_array_object");
    if (i)
      return n.createVertexArray = () => i.createVertexArrayOES(), n.deleteVertexArray = (l) => i.deleteVertexArrayOES(l), n.bindVertexArray = (l) => i.bindVertexArrayOES(l), n.isVertexArray = (l) => i.isVertexArrayOES(l), 1;
  }, ly = (n) => {
    var i = n.getExtension("WEBGL_draw_buffers");
    if (i)
      return n.drawBuffers = (l, u) => i.drawBuffersWEBGL(l, u), 1;
  }, sy = (n) => !!(n.dibvbi = n.getExtension("WEBGL_draw_instanced_base_vertex_base_instance")), ay = (n) => !!(n.mdibvbi = n.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance")), uy = (n) => !!(n.extPolygonOffsetClamp = n.getExtension("EXT_polygon_offset_clamp")), cy = (n) => !!(n.extClipControl = n.getExtension("EXT_clip_control")), fy = (n) => !!(n.webglPolygonMode = n.getExtension("WEBGL_polygon_mode")), dy = (n) => !!(n.multiDrawWebgl = n.getExtension("WEBGL_multi_draw")), Ef = (n) => {
    var i = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode"];
    return (n.getSupportedExtensions() || []).filter((l) => i.includes(l));
  }, G = { counter: 1, buffers: [], programs: [], framebuffers: [], renderbuffers: [], textures: [], shaders: [], vaos: [], contexts: [], offscreenCanvases: {}, queries: [], samplers: [], transformFeedbacks: [], syncs: [], stringCache: {}, stringiCache: {}, unpackAlignment: 4, unpackRowLength: 0, recordError: (n) => {
    G.lastError || (G.lastError = n);
  }, getNewId: (n) => {
    for (var i = G.counter++, l = n.length; l < i; l++)
      n[l] = null;
    return i;
  }, genObject: (n, i, l, u) => {
    for (var c = 0; c < n; c++) {
      var d = W[l](), h = d && G.getNewId(u);
      d ? (d.name = h, u[h] = d) : G.recordError(1282), S[i + c * 4 >>> 2 >>> 0] = h;
    }
  }, getSource: (n, i, l, u) => {
    for (var c = "", d = 0; d < i; ++d) {
      var h = u ? Z[u + d * 4 >>> 2 >>> 0] : void 0;
      c += Kt(Z[l + d * 4 >>> 2 >>> 0], h);
    }
    return c;
  }, createContext: (n, i) => {
    if (!n.getContextSafariWebGL2Fixed) {
      let c = function(d, h) {
        var m = n.getContextSafariWebGL2Fixed(d, h);
        return d == "webgl" == m instanceof WebGLRenderingContext ? m : null;
      };
      n.getContextSafariWebGL2Fixed = n.getContext, n.getContext = c;
    }
    var l = i.majorVersion > 1 ? n.getContext("webgl2", i) : n.getContext("webgl", i);
    if (!l) return 0;
    var u = G.registerContext(l, i);
    return u;
  }, registerContext: (n, i) => {
    var l = G.getNewId(G.contexts), u = { handle: l, attributes: i, version: i.majorVersion, GLctx: n };
    return n.canvas && (n.canvas.GLctxObject = u), G.contexts[l] = u, (typeof i.enableExtensionsByDefault > "u" || i.enableExtensionsByDefault) && G.initExtensions(u), l;
  }, makeContextCurrent: (n) => {
    var i;
    return G.currentContext = G.contexts[n], r.ctx = W = (i = G.currentContext) == null ? void 0 : i.GLctx, !(n && !W);
  }, getContext: (n) => G.contexts[n], deleteContext: (n) => {
    var i;
    G.currentContext === G.contexts[n] && (G.currentContext = null), typeof JSEvents == "object" && JSEvents.removeAllHandlersOnTarget(G.contexts[n].GLctx.canvas), (i = G.contexts[n]) != null && i.GLctx.canvas && (G.contexts[n].GLctx.canvas.GLctxObject = void 0), G.contexts[n] = null;
  }, initExtensions: (n) => {
    if (n || (n = G.currentContext), !n.initExtensionsDone) {
      n.initExtensionsDone = !0;
      var i = n.GLctx;
      dy(i), uy(i), cy(i), fy(i), iy(i), oy(i), ly(i), sy(i), ay(i), n.version >= 2 && (i.disjointTimerQueryExt = i.getExtension("EXT_disjoint_timer_query_webgl2")), (n.version < 2 || !i.disjointTimerQueryExt) && (i.disjointTimerQueryExt = i.getExtension("EXT_disjoint_timer_query"));
      for (var l of Ef(i))
        !l.includes("lose_context") && !l.includes("debug") && i.getExtension(l);
    }
  } };
  function py(n, i, l, u) {
    if (n >>>= 0, u >>>= 0, n != 62e3)
      return pe.setErrorCode(12296), 0;
    for (var c = 1; ; ) {
      var d = S[u >>> 2 >>> 0];
      if (d == 12440)
        c = S[u + 4 >>> 2 >>> 0];
      else {
        if (d == 12344)
          break;
        return pe.setErrorCode(12292), 0;
      }
      u += 8;
    }
    return c < 2 || c > 3 ? (pe.setErrorCode(12293), 0) : (pe.contextAttributes.majorVersion = c - 1, pe.contextAttributes.minorVersion = 0, pe.context = G.createContext(oe.getCanvas(), pe.contextAttributes), pe.context != 0 ? (pe.setErrorCode(12288), G.makeContextCurrent(pe.context), oe.useWebGL = !0, oe.moduleContextCreatedCallbacks.forEach((h) => h()), G.makeContextCurrent(null), 62004) : (pe.setErrorCode(12297), 0));
  }
  function hy(n, i, l, u) {
    return n >>>= 0, i >>>= 0, n != 62e3 ? (pe.setErrorCode(12296), 0) : i != 62002 ? (pe.setErrorCode(12293), 0) : (pe.setErrorCode(12288), 62006);
  }
  function vy(n, i) {
    return n >>>= 0, i >>>= 0, n != 62e3 ? (pe.setErrorCode(12296), 0) : i != 62006 ? (pe.setErrorCode(12301), 1) : (pe.currentReadSurface == i && (pe.currentReadSurface = 0), pe.currentDrawSurface == i && (pe.currentDrawSurface = 0), pe.setErrorCode(12288), 1);
  }
  function my() {
    return pe.currentContext;
  }
  function gy(n) {
    return n >>>= 0, pe.setErrorCode(12288), n != 0 && n != 1 ? 0 : 62e3;
  }
  var yy = () => pe.errorCode;
  function wy(n, i, l) {
    return n >>>= 0, i >>>= 0, l >>>= 0, n != 62e3 ? (pe.setErrorCode(12296), 0) : (i && (S[i >>> 2 >>> 0] = 1), l && (S[l >>> 2 >>> 0] = 4), pe.defaultDisplayInitialized = !0, pe.setErrorCode(12288), 1);
  }
  function _y(n, i, l, u) {
    return n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0, n != 62e3 ? (pe.setErrorCode(12296), 0) : u != 0 && u != 62004 ? (pe.setErrorCode(12294), 0) : l != 0 && l != 62006 || i != 0 && i != 62006 ? (pe.setErrorCode(12301), 0) : (G.makeContextCurrent(u ? pe.context : null), pe.currentContext = u, pe.currentDrawSurface = i, pe.currentReadSurface = l, pe.setErrorCode(12288), 1);
  }
  var Hr = (n) => {
    var i = ir(n) + 1, l = di(i);
    return l && N(n, l, i), l;
  };
  function xy(n, i) {
    if (n >>>= 0, n != 62e3)
      return pe.setErrorCode(12296), 0;
    if (pe.setErrorCode(12288), pe.stringCache[i]) return pe.stringCache[i];
    var l;
    switch (i) {
      case 12371:
        l = Hr("Emscripten");
        break;
      case 12372:
        l = Hr("1.4 Emscripten EGL");
        break;
      case 12373:
        l = Hr("");
        break;
      case 12429:
        l = Hr("OpenGL_ES");
        break;
      default:
        return pe.setErrorCode(12300), 0;
    }
    return pe.stringCache[i] = l, l;
  }
  function ky(n) {
    return n >>>= 0, n != 62e3 ? (pe.setErrorCode(12296), 0) : (pe.currentContext = 0, pe.currentReadSurface = 0, pe.currentDrawSurface = 0, pe.defaultDisplayInitialized = !1, pe.setErrorCode(12288), 1);
  }
  var Sy = (n) => cancelAnimationFrame(n), bf = () => 4294901760;
  function Ey() {
    return bf();
  }
  var by = function(n, i) {
    return n >>>= 0, i >>>= 0, requestAnimationFrame((l) => la(n)(l, i));
  }, Cy = (n) => {
    var i = xl.buffer.byteLength, l = (n - i + 65535) / 65536 | 0;
    try {
      return xl.grow(l), ae(), 1;
    } catch {
    }
  };
  function Py(n) {
    n >>>= 0;
    var i = I.length, l = bf();
    if (n > l)
      return !1;
    for (var u = 1; u <= 4; u *= 2) {
      var c = i * (1 + 0.2 / u);
      c = Math.min(c, n + 100663296);
      var d = Math.min(l, Me(Math.max(n, c), 65536)), h = Cy(d);
      if (h)
        return !0;
    }
    return !1;
  }
  var fa = {}, Ry = () => p || "./this.program", oo = () => {
    var c;
    if (!oo.strings) {
      var n = (((c = globalThis.navigator) == null ? void 0 : c.language) ?? "C").replace("-", "_") + ".UTF-8", i = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: n, _: Ry() };
      for (var l in fa)
        fa[l] === void 0 ? delete i[l] : i[l] = fa[l];
      var u = [];
      for (var l in i)
        u.push(`${l}=${i[l]}`);
      oo.strings = u;
    }
    return oo.strings;
  };
  function Ty(n, i) {
    n >>>= 0, i >>>= 0;
    var l = 0, u = 0;
    for (var c of oo()) {
      var d = i + l;
      Z[n + u >>> 2 >>> 0] = d, l += N(c, d, 1 / 0) + 1, u += 4;
    }
    return 0;
  }
  function Ly(n, i) {
    n >>>= 0, i >>>= 0;
    var l = oo();
    Z[n >>> 2 >>> 0] = l.length;
    var u = 0;
    for (var c of l)
      u += ir(c) + 1;
    return Z[i >>> 2 >>> 0] = u, 0;
  }
  function Dy(n) {
    try {
      var i = we.getStreamFromFD(n);
      return v.close(i), 0;
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return l.errno;
    }
  }
  function Fy(n, i) {
    i >>>= 0;
    try {
      var l = 0, u = 0, c = 0, d = we.getStreamFromFD(n), h = d.tty ? 2 : v.isDir(d.mode) ? 3 : v.isLink(d.mode) ? 7 : 4;
      return A[i >>> 0] = h, $[i + 2 >>> 1 >>> 0] = c, Se[i + 8 >>> 3 >>> 0] = BigInt(l), Se[i + 16 >>> 3 >>> 0] = BigInt(u), 0;
    } catch (m) {
      if (typeof v > "u" || m.name !== "ErrnoError") throw m;
      return m.errno;
    }
  }
  var Ay = (n, i, l, u) => {
    for (var c = 0, d = 0; d < l; d++) {
      var h = Z[i >>> 2 >>> 0], m = Z[i + 4 >>> 2 >>> 0];
      i += 8;
      var _ = v.read(n, A, h, m, u);
      if (_ < 0) return -1;
      if (c += _, _ < m) break;
    }
    return c;
  };
  function $y(n, i, l, u) {
    i >>>= 0, l >>>= 0, u >>>= 0;
    try {
      var c = we.getStreamFromFD(n), d = Ay(c, i, l);
      return Z[u >>> 2 >>> 0] = d, 0;
    } catch (h) {
      if (typeof v > "u" || h.name !== "ErrnoError") throw h;
      return h.errno;
    }
  }
  function My(n, i, l, u) {
    i = or(i), u >>>= 0;
    try {
      if (isNaN(i)) return 61;
      var c = we.getStreamFromFD(n);
      return v.llseek(c, i, l), Se[u >>> 3 >>> 0] = BigInt(c.position), c.getdents && i === 0 && l === 0 && (c.getdents = null), 0;
    } catch (d) {
      if (typeof v > "u" || d.name !== "ErrnoError") throw d;
      return d.errno;
    }
  }
  var Oy = (n, i, l, u) => {
    for (var c = 0, d = 0; d < l; d++) {
      var h = Z[i >>> 2 >>> 0], m = Z[i + 4 >>> 2 >>> 0];
      i += 8;
      var _ = v.write(n, A, h, m, u);
      if (_ < 0) return -1;
      if (c += _, _ < m)
        break;
    }
    return c;
  };
  function Iy(n, i, l, u) {
    i >>>= 0, l >>>= 0, u >>>= 0;
    try {
      var c = we.getStreamFromFD(n), d = Oy(c, i, l);
      return Z[u >>> 2 >>> 0] = d, 0;
    } catch (h) {
      if (typeof v > "u" || h.name !== "ErrnoError") throw h;
      return h.errno;
    }
  }
  var jy = (n, i, l, u, c) => {
    switch (i) {
      case 2:
        l = si(l), ke(n, 16), $[n >>> 1 >>> 0] = i, S[n + 4 >>> 2 >>> 0] = l, $[n + 2 >>> 1 >>> 0] = _l(u);
        break;
      case 10:
        l = qi(l), ke(n, 28), S[n >>> 2 >>> 0] = i, S[n + 8 >>> 2 >>> 0] = l[0], S[n + 12 >>> 2 >>> 0] = l[1], S[n + 16 >>> 2 >>> 0] = l[2], S[n + 20 >>> 2 >>> 0] = l[3], $[n + 2 >>> 1 >>> 0] = _l(u);
        break;
      default:
        return 5;
    }
    return 0;
  };
  function Ny(n, i, l, u) {
    n >>>= 0, i >>>= 0, l >>>= 0, u >>>= 0;
    var c = 0, d = 0, h = 0, m = 0, _ = 0, T = 0, O;
    function K(J, ee, he, ge, Ce, Le) {
      var je, Xe, Ne;
      return Xe = J === 10 ? 28 : 16, Ce = J === 10 ? On(Ce) : li(Ce), je = di(Xe), jy(je, J, Ce, Le), Ne = di(32), S[Ne + 4 >>> 2 >>> 0] = J, S[Ne + 8 >>> 2 >>> 0] = ee, S[Ne + 12 >>> 2 >>> 0] = he, Z[Ne + 24 >>> 2 >>> 0] = ge, Z[Ne + 20 >>> 2 >>> 0] = je, J === 10 ? S[Ne + 16 >>> 2 >>> 0] = 28 : S[Ne + 16 >>> 2 >>> 0] = 16, S[Ne + 28 >>> 2 >>> 0] = 0, Ne;
    }
    if (l && (h = S[l >>> 2 >>> 0], m = S[l + 4 >>> 2 >>> 0], _ = S[l + 8 >>> 2 >>> 0], T = S[l + 12 >>> 2 >>> 0]), _ && !T && (T = _ === 2 ? 17 : 6), !_ && T && (_ = T === 17 ? 2 : 1), T === 0 && (T = 6), _ === 0 && (_ = 1), !n && !i)
      return -2;
    if (h & -1088 || l !== 0 && S[l >>> 2 >>> 0] & 2 && !n)
      return -1;
    if (h & 32)
      return -2;
    if (_ !== 0 && _ !== 1 && _ !== 2)
      return -7;
    if (m !== 0 && m !== 2 && m !== 10)
      return -6;
    if (i && (i = Kt(i), d = parseInt(i, 10), isNaN(d)))
      return h & 1024 ? -2 : -8;
    if (!n)
      return m === 0 && (m = 2), h & 1 || (m === 2 ? c = lo(2130706433) : c = [0, 0, 0, lo(1)]), O = K(m, _, T, null, c, d), Z[u >>> 2 >>> 0] = O, 0;
    if (n = Kt(n), c = si(n), c !== null)
      if (m === 0 || m === 2)
        m = 2;
      else if (m === 10 && h & 8)
        c = [0, 0, lo(65535), c], m = 10;
      else
        return -2;
    else if (c = qi(n), c !== null)
      if (m === 0 || m === 10)
        m = 10;
      else
        return -2;
    return c != null ? (O = K(m, _, T, n, c, d), Z[u >>> 2 >>> 0] = O, 0) : h & 4 ? -2 : (n = wr.lookup_name(n), c = si(n), m === 0 ? m = 2 : m === 10 && (c = [0, 0, lo(65535), c]), O = K(m, _, T, null, c, d), Z[u >>> 2 >>> 0] = O, 0);
  }
  var zy = (n) => W.activeTexture(n), By = zy, Uy = (n, i) => {
    W.attachShader(G.programs[n], G.shaders[i]);
  }, Vy = Uy, Wy = (n, i) => {
    n == 35051 ? W.currentPixelPackBufferBinding = i : n == 35052 && (W.currentPixelUnpackBufferBinding = i), W.bindBuffer(n, G.buffers[i]);
  }, Hy = Wy, Gy = (n, i) => {
    W.bindFramebuffer(n, G.framebuffers[i]);
  }, Xy = Gy, Yy = (n, i) => {
    W.bindSampler(n, G.samplers[i]);
  }, Ky = Yy, Qy = (n, i) => {
    W.bindTexture(n, G.textures[i]);
  }, Zy = Qy, qy = (n) => {
    W.bindVertexArray(G.vaos[n]);
  }, Jy = qy, ew = (n, i, l, u) => W.blendColor(n, i, l, u), tw = ew, rw = (n, i) => W.blendEquationSeparate(n, i), nw = rw, iw = (n, i) => W.blendFunc(n, i), ow = iw, lw = (n, i, l, u) => W.blendFuncSeparate(n, i, l, u), sw = lw, aw = (n, i, l, u, c, d, h, m, _, T) => W.blitFramebuffer(n, i, l, u, c, d, h, m, _, T), uw = aw;
  function cw(n, i, l, u) {
    i >>>= 0, l >>>= 0, W.bufferData(n, l ? I.subarray(l >>> 0, l + i >>> 0) : i, u);
  }
  var fw = cw;
  function dw(n, i, l, u) {
    i >>>= 0, l >>>= 0, u >>>= 0, W.bufferSubData(n, i, I.subarray(u >>> 0, u + l >>> 0));
  }
  var pw = dw, hw = (n) => W.checkFramebufferStatus(n), vw = hw, mw = (n) => W.clear(n), gw = mw, yw = (n, i, l, u) => W.clearColor(n, i, l, u), ww = yw, _w = (n) => W.clearDepth(n), xw = _w, kw = (n) => W.clearStencil(n), Sw = kw, Ew = (n, i, l, u) => {
    W.colorMask(!!n, !!i, !!l, !!u);
  }, bw = Ew, Cw = (n) => {
    W.compileShader(G.shaders[n]);
  }, Pw = Cw, Rw = () => {
    var n = G.getNewId(G.programs), i = W.createProgram();
    return i.name = n, i.maxUniformLength = i.maxAttributeLength = i.maxUniformBlockNameLength = 0, i.uniformIdCounter = 1, G.programs[n] = i, n;
  }, Tw = Rw, Lw = (n) => {
    var i = G.getNewId(G.shaders);
    return G.shaders[i] = W.createShader(n), i;
  }, Dw = Lw, Fw = (n) => W.cullFace(n), Aw = Fw;
  function $w(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var u = S[i + l * 4 >>> 2 >>> 0], c = G.buffers[u];
      c && (W.deleteBuffer(c), c.name = 0, G.buffers[u] = null, u == W.currentPixelPackBufferBinding && (W.currentPixelPackBufferBinding = 0), u == W.currentPixelUnpackBufferBinding && (W.currentPixelUnpackBufferBinding = 0));
    }
  }
  var Mw = $w;
  function Ow(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; ++l) {
      var u = S[i + l * 4 >>> 2 >>> 0], c = G.framebuffers[u];
      c && (W.deleteFramebuffer(c), c.name = 0, G.framebuffers[u] = null);
    }
  }
  var Iw = Ow, jw = (n) => {
    if (n) {
      var i = G.programs[n];
      if (!i) {
        G.recordError(1281);
        return;
      }
      W.deleteProgram(i), i.name = 0, G.programs[n] = null;
    }
  }, Nw = jw;
  function zw(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var u = S[i + l * 4 >>> 2 >>> 0], c = G.samplers[u];
      c && (W.deleteSampler(c), c.name = 0, G.samplers[u] = null);
    }
  }
  var Bw = zw, Uw = (n) => {
    if (n) {
      var i = G.shaders[n];
      if (!i) {
        G.recordError(1281);
        return;
      }
      W.deleteShader(i), G.shaders[n] = null;
    }
  }, Vw = Uw;
  function Ww(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var u = S[i + l * 4 >>> 2 >>> 0], c = G.textures[u];
      c && (W.deleteTexture(c), c.name = 0, G.textures[u] = null);
    }
  }
  var Hw = Ww;
  function Gw(n, i) {
    i >>>= 0;
    for (var l = 0; l < n; l++) {
      var u = S[i + l * 4 >>> 2 >>> 0];
      W.deleteVertexArray(G.vaos[u]), G.vaos[u] = null;
    }
  }
  var Xw = Gw, Yw = (n) => W.depthFunc(n), Kw = Yw, Qw = (n) => {
    W.depthMask(!!n);
  }, Zw = Qw, qw = (n, i) => {
    W.detachShader(G.programs[n], G.shaders[i]);
  }, Jw = qw, e1 = (n) => W.disable(n), t1 = e1, r1 = (n) => {
    W.disableVertexAttribArray(n);
  }, n1 = r1, i1 = (n, i, l) => {
    W.drawArrays(n, i, l);
  }, o1 = i1, l1 = (n, i, l, u) => {
    W.drawArraysInstanced(n, i, l, u);
  }, s1 = l1, Cf = [];
  function a1(n, i) {
    i >>>= 0;
    for (var l = Cf[n], u = 0; u < n; u++)
      l[u] = S[i + u * 4 >>> 2 >>> 0];
    W.drawBuffers(l);
  }
  var u1 = a1;
  function c1(n, i, l, u) {
    u >>>= 0, W.drawElements(n, i, l, u);
  }
  var f1 = c1, d1 = (n) => W.enable(n), p1 = d1, h1 = (n) => {
    W.enableVertexAttribArray(n);
  }, v1 = h1, m1 = () => W.finish(), g1 = m1, y1 = (n, i, l, u, c) => {
    W.framebufferTexture2D(n, i, l, G.textures[u], c);
  }, w1 = y1, _1 = (n, i, l, u, c) => {
    W.framebufferTextureLayer(n, i, G.textures[l], u, c);
  }, x1 = _1;
  function k1(n, i) {
    i >>>= 0, G.genObject(n, i, "createBuffer", G.buffers);
  }
  var S1 = k1;
  function E1(n, i) {
    i >>>= 0, G.genObject(n, i, "createFramebuffer", G.framebuffers);
  }
  var b1 = E1;
  function C1(n, i) {
    i >>>= 0, G.genObject(n, i, "createSampler", G.samplers);
  }
  var P1 = C1;
  function R1(n, i) {
    i >>>= 0, G.genObject(n, i, "createTexture", G.textures);
  }
  var T1 = R1;
  function L1(n, i) {
    i >>>= 0, G.genObject(n, i, "createVertexArray", G.vaos);
  }
  var D1 = L1, F1 = (n) => W.generateMipmap(n), A1 = F1, $1 = (n, i) => {
    Z[n >>> 2 >>> 0] = i;
    var l = Z[n >>> 2 >>> 0];
    Z[n + 4 >>> 2 >>> 0] = (i - l) / 4294967296;
  }, da = () => {
    var n = Ef(W);
    return n = n.concat(n.map((i) => "GL_" + i)), n;
  }, pa = (n, i, l) => {
    if (!i) {
      G.recordError(1281);
      return;
    }
    var u = void 0;
    switch (n) {
      case 36346:
        u = 1;
        break;
      case 36344:
        l != 0 && l != 1 && G.recordError(1280);
        return;
      case 34814:
      case 36345:
        u = 0;
        break;
      case 34466:
        var c = W.getParameter(34467);
        u = c ? c.length : 0;
        break;
      case 33309:
        if (G.currentContext.version < 2) {
          G.recordError(1282);
          return;
        }
        u = da().length;
        break;
      case 33307:
      case 33308:
        if (G.currentContext.version < 2) {
          G.recordError(1280);
          return;
        }
        u = n == 33307 ? 3 : 0;
        break;
    }
    if (u === void 0) {
      var d = W.getParameter(n);
      switch (typeof d) {
        case "number":
          u = d;
          break;
        case "boolean":
          u = d ? 1 : 0;
          break;
        case "string":
          G.recordError(1280);
          return;
        case "object":
          if (d === null)
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
                u = 0;
                break;
              }
              default: {
                G.recordError(1280);
                return;
              }
            }
          else if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
            for (var h = 0; h < d.length; ++h)
              switch (l) {
                case 0:
                  S[i + h * 4 >>> 2 >>> 0] = d[h];
                  break;
                case 2:
                  ue[i + h * 4 >>> 2 >>> 0] = d[h];
                  break;
                case 4:
                  A[i + h >>> 0] = d[h] ? 1 : 0;
                  break;
              }
            return;
          } else
            try {
              u = d.name | 0;
            } catch (m) {
              G.recordError(1280), Q(`GL_INVALID_ENUM in glGet${l}v: Unknown object returned from WebGL getParameter(${n})! (error: ${m})`);
              return;
            }
          break;
        default:
          G.recordError(1280), Q(`GL_INVALID_ENUM in glGet${l}v: Native code calling glGet${l}v(${n}) and it returns ${d} of type ${typeof d}!`);
          return;
      }
    }
    switch (l) {
      case 1:
        $1(i, u);
        break;
      case 0:
        S[i >>> 2 >>> 0] = u;
        break;
      case 2:
        ue[i >>> 2 >>> 0] = u;
        break;
      case 4:
        A[i >>> 0] = u ? 1 : 0;
        break;
    }
  };
  function M1(n, i) {
    return i >>>= 0, pa(n, i, 4);
  }
  var O1 = M1, I1 = () => {
    var n = W.getError() || G.lastError;
    return G.lastError = 0, n;
  }, j1 = I1;
  function N1(n, i) {
    return i >>>= 0, pa(n, i, 2);
  }
  var z1 = N1;
  function B1(n, i) {
    return i >>>= 0, pa(n, i, 0);
  }
  var U1 = B1;
  function V1(n, i, l, u) {
    l >>>= 0, u >>>= 0;
    var c = W.getProgramInfoLog(G.programs[n]);
    c === null && (c = "(unknown error)");
    var d = i > 0 && u ? N(c, u, i) : 0;
    l && (S[l >>> 2 >>> 0] = d);
  }
  var W1 = V1;
  function H1(n, i, l) {
    if (l >>>= 0, !l) {
      G.recordError(1281);
      return;
    }
    if (n >= G.counter) {
      G.recordError(1281);
      return;
    }
    if (n = G.programs[n], i == 35716) {
      var u = W.getProgramInfoLog(n);
      u === null && (u = "(unknown error)"), S[l >>> 2 >>> 0] = u.length + 1;
    } else if (i == 35719) {
      if (!n.maxUniformLength)
        for (var c = W.getProgramParameter(n, 35718), d = 0; d < c; ++d)
          n.maxUniformLength = Math.max(n.maxUniformLength, W.getActiveUniform(n, d).name.length + 1);
      S[l >>> 2 >>> 0] = n.maxUniformLength;
    } else if (i == 35722) {
      if (!n.maxAttributeLength)
        for (var h = W.getProgramParameter(n, 35721), d = 0; d < h; ++d)
          n.maxAttributeLength = Math.max(n.maxAttributeLength, W.getActiveAttrib(n, d).name.length + 1);
      S[l >>> 2 >>> 0] = n.maxAttributeLength;
    } else if (i == 35381) {
      if (!n.maxUniformBlockNameLength)
        for (var m = W.getProgramParameter(n, 35382), d = 0; d < m; ++d)
          n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, W.getActiveUniformBlockName(n, d).length + 1);
      S[l >>> 2 >>> 0] = n.maxUniformBlockNameLength;
    } else
      S[l >>> 2 >>> 0] = W.getProgramParameter(n, i);
  }
  var G1 = H1;
  function X1(n, i, l, u) {
    l >>>= 0, u >>>= 0;
    var c = W.getShaderInfoLog(G.shaders[n]);
    c === null && (c = "(unknown error)");
    var d = i > 0 && u ? N(c, u, i) : 0;
    l && (S[l >>> 2 >>> 0] = d);
  }
  var Y1 = X1;
  function K1(n, i, l) {
    if (l >>>= 0, !l) {
      G.recordError(1281);
      return;
    }
    if (i == 35716) {
      var u = W.getShaderInfoLog(G.shaders[n]);
      u === null && (u = "(unknown error)");
      var c = u ? u.length + 1 : 0;
      S[l >>> 2 >>> 0] = c;
    } else if (i == 35720) {
      var d = W.getShaderSource(G.shaders[n]), h = d ? d.length + 1 : 0;
      S[l >>> 2 >>> 0] = h;
    } else
      S[l >>> 2 >>> 0] = W.getShaderParameter(G.shaders[n], i);
  }
  var Q1 = K1;
  function Z1(n) {
    var i = G.stringCache[n];
    if (!i) {
      switch (n) {
        case 7939:
          i = Hr(da().join(" "));
          break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          var l = W.getParameter(n);
          l || G.recordError(1280), i = l ? Hr(l) : 0;
          break;
        case 7938:
          var u = W.getParameter(7938), c = `OpenGL ES 2.0 (${u})`;
          G.currentContext.version >= 2 && (c = `OpenGL ES 3.0 (${u})`), i = Hr(c);
          break;
        case 35724:
          var d = W.getParameter(35724), h = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/, m = d.match(h);
          m !== null && (m[1].length == 3 && (m[1] = m[1] + "0"), d = `OpenGL ES GLSL ES ${m[1]} (${d})`), i = Hr(d);
          break;
        default:
          G.recordError(1280);
      }
      G.stringCache[n] = i;
    }
    return i;
  }
  var q1 = Z1;
  function J1(n, i) {
    if (G.currentContext.version < 2)
      return G.recordError(1282), 0;
    var l = G.stringiCache[n];
    if (l)
      return i < 0 || i >= l.length ? (G.recordError(1281), 0) : l[i];
    switch (n) {
      case 7939:
        var u = da().map(Hr);
        return l = G.stringiCache[n] = u, i < 0 || i >= l.length ? (G.recordError(1281), 0) : l[i];
      default:
        return G.recordError(1280), 0;
    }
  }
  var e_ = J1;
  function t_(n, i, l) {
    if (l >>>= 0, !l) {
      G.recordError(1281);
      return;
    }
    S[l >>> 2 >>> 0] = W.getTexParameter(n, i);
  }
  var r_ = t_, n_ = (n) => parseInt(n), Pf = (n) => n.slice(-1) == "]" && n.lastIndexOf("["), i_ = (n) => {
    var i = n.uniformLocsById, l = n.uniformSizeAndIdsByName, u, c;
    if (!i) {
      n.uniformLocsById = i = {}, n.uniformArrayNamesById = {};
      var d = W.getProgramParameter(n, 35718);
      for (u = 0; u < d; ++u) {
        var h = W.getActiveUniform(n, u), m = h.name, _ = h.size, T = Pf(m), O = T > 0 ? m.slice(0, T) : m, K = n.uniformIdCounter;
        for (n.uniformIdCounter += _, l[O] = [_, K], c = 0; c < _; ++c)
          i[K] = c, n.uniformArrayNamesById[K++] = O;
      }
    }
  };
  function o_(n, i) {
    if (i >>>= 0, i = Kt(i), n = G.programs[n]) {
      i_(n);
      var l = n.uniformLocsById, u = 0, c = i, d = Pf(i);
      d > 0 && (u = n_(i.slice(d + 1)) >>> 0, c = i.slice(0, d));
      var h = n.uniformSizeAndIdsByName[c];
      if (h && u < h[0] && (u += h[1], l[u] = l[u] || W.getUniformLocation(n, i)))
        return u;
    } else
      G.recordError(1281);
    return -1;
  }
  var l_ = o_, s_ = (n) => W.isEnabled(n), a_ = s_, u_ = (n) => {
    n = G.programs[n], W.linkProgram(n), n.uniformLocsById = 0, n.uniformSizeAndIdsByName = {};
  }, c_ = u_, f_ = (n, i) => {
    n == 3317 ? G.unpackAlignment = i : n == 3314 && (G.unpackRowLength = i), W.pixelStorei(n, i);
  }, d_ = f_, p_ = (n) => W.readBuffer(n), h_ = p_, v_ = (n, i, l) => {
    function u(h, m) {
      return h + m - 1 & -m;
    }
    var c = (G.unpackRowLength || n) * l, d = u(c, G.unpackAlignment);
    return i * d;
  }, m_ = (n) => {
    var i = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 };
    return i[n - 6402] || 1;
  }, ha = (n) => (n -= 5120, n == 0 ? A : n == 1 ? I : n == 2 ? $ : n == 4 ? S : n == 6 ? ue : n == 5 || n == 28922 || n == 28520 || n == 30779 || n == 30782 ? Z : F), va = (n, i) => n >>> 31 - Math.clz32(i.BYTES_PER_ELEMENT), wl = (n, i, l, u, c, d) => {
    var h = ha(n), m = m_(i) * h.BYTES_PER_ELEMENT, _ = v_(l, u, m);
    return h.subarray(va(c, h) >>> 0, va(c + _, h) >>> 0);
  };
  function g_(n, i, l, u, c, d, h) {
    if (h >>>= 0, G.currentContext.version >= 2 && W.currentPixelPackBufferBinding) {
      W.readPixels(n, i, l, u, c, d, h);
      return;
    }
    var m = wl(d, c, l, u, h);
    if (!m) {
      G.recordError(1280);
      return;
    }
    W.readPixels(n, i, l, u, c, d, m);
  }
  var y_ = g_, w_ = (n, i, l) => {
    W.samplerParameterf(G.samplers[n], i, l);
  }, __ = w_, x_ = (n, i, l) => {
    W.samplerParameteri(G.samplers[n], i, l);
  }, k_ = x_, S_ = (n, i, l, u) => W.scissor(n, i, l, u), E_ = S_;
  function b_(n, i, l, u) {
    l >>>= 0, u >>>= 0;
    var c = G.getSource(n, i, l, u);
    W.shaderSource(G.shaders[n], c);
  }
  var C_ = b_, P_ = (n, i, l) => W.stencilFunc(n, i, l), R_ = P_, T_ = (n, i, l, u) => W.stencilFuncSeparate(n, i, l, u), L_ = T_, D_ = (n, i) => W.stencilMaskSeparate(n, i), F_ = D_, A_ = (n, i, l) => W.stencilOp(n, i, l), $_ = A_, M_ = (n, i, l, u) => W.stencilOpSeparate(n, i, l, u), O_ = M_;
  function I_(n, i, l, u, c, d, h, m, _) {
    if (_ >>>= 0, G.currentContext.version >= 2 && W.currentPixelUnpackBufferBinding) {
      W.texImage2D(n, i, l, u, c, d, h, m, _);
      return;
    }
    var T = _ ? wl(m, h, u, c, _) : null;
    W.texImage2D(n, i, l, u, c, d, h, m, T);
  }
  var j_ = I_;
  function N_(n, i, l, u, c, d, h, m, _, T) {
    if (T >>>= 0, W.currentPixelUnpackBufferBinding)
      W.texImage3D(n, i, l, u, c, d, h, m, _, T);
    else if (T) {
      ha(_);
      var O = wl(_, m, u, c * d, T);
      W.texImage3D(n, i, l, u, c, d, h, m, _, O);
    } else
      W.texImage3D(n, i, l, u, c, d, h, m, _, null);
  }
  var z_ = N_, B_ = (n, i, l) => W.texParameteri(n, i, l), U_ = B_;
  function V_(n, i, l, u, c, d, h, m, _) {
    if (_ >>>= 0, G.currentContext.version >= 2 && W.currentPixelUnpackBufferBinding) {
      W.texSubImage2D(n, i, l, u, c, d, h, m, _);
      return;
    }
    var T = _ ? wl(m, h, c, d, _) : null;
    W.texSubImage2D(n, i, l, u, c, d, h, m, T);
  }
  var W_ = V_;
  function H_(n, i, l, u, c, d, h, m, _, T, O) {
    if (O >>>= 0, W.currentPixelUnpackBufferBinding)
      W.texSubImage3D(n, i, l, u, c, d, h, m, _, T, O);
    else if (O) {
      var K = ha(T);
      W.texSubImage3D(n, i, l, u, c, d, h, m, _, T, K, va(O, K));
    } else
      W.texSubImage3D(n, i, l, u, c, d, h, m, _, T, null);
  }
  var G_ = H_, lr = (n) => {
    var i = W.currentProgram;
    if (i) {
      var l = i.uniformLocsById[n];
      return typeof l == "number" && (i.uniformLocsById[n] = l = W.getUniformLocation(i, i.uniformArrayNamesById[n] + (l > 0 ? `[${l}]` : ""))), l;
    } else
      G.recordError(1282);
  }, X_ = (n, i) => {
    W.uniform1f(lr(n), i);
  }, Y_ = X_, Nn = [];
  function K_(n, i, l) {
    if (l >>>= 0, i <= 288)
      for (var u = Nn[i], c = 0; c < i; ++c)
        u[c] = ue[l + 4 * c >>> 2 >>> 0];
    else
      var u = ue.subarray(l >>> 2 >>> 0, l + i * 4 >>> 2 >>> 0);
    W.uniform1fv(lr(n), u);
  }
  var Q_ = K_, Z_ = (n, i) => {
    W.uniform1i(lr(n), i);
  }, q_ = Z_, J_ = (n, i) => {
    W.uniform1ui(lr(n), i);
  }, e2 = J_;
  function t2(n, i, l) {
    l >>>= 0, i && W.uniform1uiv(lr(n), Z, l >>> 2, i);
  }
  var r2 = t2;
  function n2(n, i, l) {
    if (l >>>= 0, i <= 144) {
      i *= 2;
      for (var u = Nn[i], c = 0; c < i; c += 2)
        u[c] = ue[l + 4 * c >>> 2 >>> 0], u[c + 1] = ue[l + (4 * c + 4) >>> 2 >>> 0];
    } else
      var u = ue.subarray(l >>> 2 >>> 0, l + i * 8 >>> 2 >>> 0);
    W.uniform2fv(lr(n), u);
  }
  var i2 = n2, ma = [];
  function o2(n, i, l) {
    if (l >>>= 0, i <= 144) {
      i *= 2;
      for (var u = ma[i], c = 0; c < i; c += 2)
        u[c] = S[l + 4 * c >>> 2 >>> 0], u[c + 1] = S[l + (4 * c + 4) >>> 2 >>> 0];
    } else
      var u = S.subarray(l >>> 2 >>> 0, l + i * 8 >>> 2 >>> 0);
    W.uniform2iv(lr(n), u);
  }
  var l2 = o2;
  function s2(n, i, l) {
    if (l >>>= 0, i <= 96) {
      i *= 3;
      for (var u = Nn[i], c = 0; c < i; c += 3)
        u[c] = ue[l + 4 * c >>> 2 >>> 0], u[c + 1] = ue[l + (4 * c + 4) >>> 2 >>> 0], u[c + 2] = ue[l + (4 * c + 8) >>> 2 >>> 0];
    } else
      var u = ue.subarray(l >>> 2 >>> 0, l + i * 12 >>> 2 >>> 0);
    W.uniform3fv(lr(n), u);
  }
  var a2 = s2;
  function u2(n, i, l) {
    if (l >>>= 0, i <= 96) {
      i *= 3;
      for (var u = ma[i], c = 0; c < i; c += 3)
        u[c] = S[l + 4 * c >>> 2 >>> 0], u[c + 1] = S[l + (4 * c + 4) >>> 2 >>> 0], u[c + 2] = S[l + (4 * c + 8) >>> 2 >>> 0];
    } else
      var u = S.subarray(l >>> 2 >>> 0, l + i * 12 >>> 2 >>> 0);
    W.uniform3iv(lr(n), u);
  }
  var c2 = u2;
  function f2(n, i, l) {
    if (l >>>= 0, i <= 72) {
      var u = Nn[4 * i], c = ue;
      l = l >>> 2, i *= 4;
      for (var d = 0; d < i; d += 4) {
        var h = l + d;
        u[d] = c[h >>> 0], u[d + 1] = c[h + 1 >>> 0], u[d + 2] = c[h + 2 >>> 0], u[d + 3] = c[h + 3 >>> 0];
      }
    } else
      var u = ue.subarray(l >>> 2 >>> 0, l + i * 16 >>> 2 >>> 0);
    W.uniform4fv(lr(n), u);
  }
  var d2 = f2;
  function p2(n, i, l, u) {
    if (u >>>= 0, i <= 32) {
      i *= 9;
      for (var c = Nn[i], d = 0; d < i; d += 9)
        c[d] = ue[u + 4 * d >>> 2 >>> 0], c[d + 1] = ue[u + (4 * d + 4) >>> 2 >>> 0], c[d + 2] = ue[u + (4 * d + 8) >>> 2 >>> 0], c[d + 3] = ue[u + (4 * d + 12) >>> 2 >>> 0], c[d + 4] = ue[u + (4 * d + 16) >>> 2 >>> 0], c[d + 5] = ue[u + (4 * d + 20) >>> 2 >>> 0], c[d + 6] = ue[u + (4 * d + 24) >>> 2 >>> 0], c[d + 7] = ue[u + (4 * d + 28) >>> 2 >>> 0], c[d + 8] = ue[u + (4 * d + 32) >>> 2 >>> 0];
    } else
      var c = ue.subarray(u >>> 2 >>> 0, u + i * 36 >>> 2 >>> 0);
    W.uniformMatrix3fv(lr(n), !!l, c);
  }
  var h2 = p2;
  function v2(n, i, l, u) {
    if (u >>>= 0, i <= 18) {
      var c = Nn[16 * i], d = ue;
      u = u >>> 2, i *= 16;
      for (var h = 0; h < i; h += 16) {
        var m = u + h;
        c[h] = d[m >>> 0], c[h + 1] = d[m + 1 >>> 0], c[h + 2] = d[m + 2 >>> 0], c[h + 3] = d[m + 3 >>> 0], c[h + 4] = d[m + 4 >>> 0], c[h + 5] = d[m + 5 >>> 0], c[h + 6] = d[m + 6 >>> 0], c[h + 7] = d[m + 7 >>> 0], c[h + 8] = d[m + 8 >>> 0], c[h + 9] = d[m + 9 >>> 0], c[h + 10] = d[m + 10 >>> 0], c[h + 11] = d[m + 11 >>> 0], c[h + 12] = d[m + 12 >>> 0], c[h + 13] = d[m + 13 >>> 0], c[h + 14] = d[m + 14 >>> 0], c[h + 15] = d[m + 15 >>> 0];
      }
    } else
      var c = ue.subarray(u >>> 2 >>> 0, u + i * 64 >>> 2 >>> 0);
    W.uniformMatrix4fv(lr(n), !!l, c);
  }
  var m2 = v2, g2 = (n) => {
    n = G.programs[n], W.useProgram(n), W.currentProgram = n;
  }, y2 = g2, w2 = (n, i, l, u, c) => W.vertexAttrib4f(n, i, l, u, c), _2 = w2;
  function x2(n, i) {
    i >>>= 0, W.vertexAttrib4f(n, ue[i >>> 2], ue[i + 4 >>> 2], ue[i + 8 >>> 2], ue[i + 12 >>> 2]);
  }
  var k2 = x2;
  function S2(n, i, l, u, c) {
    c >>>= 0, W.vertexAttribIPointer(n, i, l, u, c);
  }
  var E2 = S2;
  function b2(n, i, l, u, c, d) {
    d >>>= 0, W.vertexAttribPointer(n, i, l, !!u, c, d);
  }
  var C2 = b2, P2 = (n, i, l, u) => W.viewport(n, i, l, u), R2 = P2;
  function T2(n, i) {
    n >>>= 0, i >>>= 0;
    try {
      return Pt(I.subarray(n >>> 0, n + i >>> 0)), 0;
    } catch (l) {
      if (typeof v > "u" || l.name !== "ErrnoError") throw l;
      return l.errno;
    }
  }
  var L2 = () => zf, Rf = (n) => {
    var i = n.getArg(L2(), 0);
    return jf(i);
  }, D2 = () => Of(), F2 = (n) => $f(n), Tf = (n) => Mf(n), A2 = (n) => {
    var i = D2(), l = Tf(4), u = Tf(4);
    Nf(n, l, u);
    var c = Z[l >>> 2 >>> 0], d = Z[u >>> 2 >>> 0], h = Kt(c);
    Dr(c);
    var m;
    return d && (m = Kt(d), Dr(d)), F2(i), [h, m];
  }, $2 = (n) => {
    var i = Rf(n);
    return A2(i);
  }, M2 = (n) => {
    var i = Rf(n);
    If(i);
  }, O2 = (...n) => v.createPath(...n), I2 = (...n) => v.unlink(...n), j2 = (...n) => v.createLazyFile(...n), N2 = (...n) => v.createDevice(...n);
  v.createPreloadedFile = nl, v.preloadFile = un, v.staticInit(), Cm(), Om();
  for (let n = 0; n < 32; ++n) Cf.push(new Array(n));
  for (var z2 = new Float32Array(288), Gr = 0; Gr <= 288; ++Gr)
    Nn[Gr] = z2.subarray(0, Gr);
  for (var B2 = new Int32Array(288), Gr = 0; Gr <= 288; ++Gr)
    ma[Gr] = B2.subarray(0, Gr);
  if (r.noExitRuntime && (_t = r.noExitRuntime), r.preloadPlugins && (Yt = r.preloadPlugins), r.print && (z = r.print), r.printErr && (Q = r.printErr), r.wasmBinary && (x = r.wasmBinary), r.arguments && r.arguments, r.thisProgram && (p = r.thisProgram), r.preInit)
    for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; )
      r.preInit.shift()();
  r.addRunDependency = Ur, r.removeRunDependency = Qi, r.decrementExceptionRefcount = M2, r.getExceptionMessage = $2, r.FS_preloadFile = un, r.FS_unlink = I2, r.FS_createPath = O2, r.FS_createDevice = N2, r.FS = v, r.FS_createDataFile = Ki, r.FS_createLazyFile = j2;
  function U2() {
    if (typeof r != "object" || !r) return;
    const n = (h) => h != null && typeof h.isAliasOf == "function", i = (h, m) => h === m ? !0 : n(h) && n(m) ? h.isAliasOf(m) : !1, l = (h, m) => {
      if (h == null) return 0;
      let _ = Number(h);
      return Number.isFinite(_) ? (_ = Math.trunc(_), _ < 0 ? Math.max(m + _, 0) : Math.min(_, m)) : _ < 0 ? 0 : m;
    }, u = (h, m) => {
      if (m === 0) return -1;
      if (h == null) return m - 1;
      let _ = Number(h);
      return Number.isFinite(_) ? (_ = Math.trunc(_), _ < 0 ? m + _ : Math.min(_, m - 1)) : _ < 0 ? -1 : m - 1;
    }, c = (h, m, _) => {
      for (let T = _; T < h.length; ++T)
        if (i(h[T], m)) return T;
      return -1;
    }, d = (h, m, _) => {
      for (let T = _; T >= 0; --T)
        if (i(h[T], m)) return T;
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
        return d(this, m, u(_, this.length));
      }
      static get [Symbol.species]() {
        return this;
      }
    }), r._imfusion_wrap_handle_array = function(h) {
      return Array.isArray(h) && Object.getPrototypeOf(h) !== r.HandleArray.prototype && Object.setPrototypeOf(h, r.HandleArray.prototype), h;
    };
  }
  function V2(n) {
    let i = !0;
    const l = function() {
      i && (i = !1, Df(n));
    };
    return Fe.toHandle(l);
  }
  var Lf, di, Df, Dr, ga, _l, lo, Ff, Af, $f, Mf, Of, If, jf, Nf, zf, xl, Bf;
  function W2(n) {
    Lf = n.Vc, di = n.Yc, Df = r._imfusion_disconnect_signal = n.Zc, Dr = n._c, ga = n.$c, _l = n.ad, lo = n.bd, Ff = n.cd, Af = n.dd, $f = n.ed, Mf = n.fd, Of = n.gd, If = n.hd, jf = n.id, Nf = n.jd, xl = n.Tc, Bf = n.Wc, zf = n.Xc;
  }
  var H2 = { fc: ll, Fb: ea, gc: ta, M: ra, bc: M, Zb: X, Nb: re, cc: q, _b: Y, Ub: ie, $b: H, Ca: te, Mb: le, Kb: ce, Lb: Ee, Eb: Be, Sa: He, ac: pt, Jb: Ge, Aa: _r, Ib: al, hc: Ji, xb: ym, x: _m, L: xm, Ra: Sm, Cb: Em, n: zm, B: Um, C: Vm, b: Wm, t: Hm, Ab: pf, G: Xm, g: Ym, Qa: Qm, s: Zm, T: qm, ja: eg, A: tg, z: ng, ia: ig, Bb: og, za: dg, p: pg, Q: hg, m: vg, ha: mg, y: gg, Db: yg, $: wg, f: Eg, a: aa, F: bg, I: Cg, i: Pg, c: Rg, R: Tg, e: Lg, ec: Dg, eb: Fg, D: Ag, va: $g, h: Mg, Y: Og, d: Ig, J: jg, X: Ng, La: zg, Qb: Bg, Rb: Hg, Sb: Gg, Ob: Xg, Pb: Yg, Tb: Kg, dc: Zg, lc: ry, nc: ny, kc: py, mc: hy, Za: vy, _: my, pc: gy, na: yy, oc: wy, Ya: _y, jc: xy, qc: ky, hb: Sy, Va: gf, Xa: Ey, Ta: mf, Ha: by, Hb: Py, Xb: Ty, Yb: Ly, Z: xf, ma: Dy, Wb: Fy, Ua: $y, Vb: My, Ba: Iy, Wa: Ny, aa: By, Qc: Vy, P: Hy, da: Xy, Ea: Ky, ca: Zy, O: Jy, vb: tw, Ma: nw, v: ow, ea: sw, wb: uw, sb: fw, rb: pw, pb: vw, u: gw, K: ww, N: xw, wc: Sw, ta: bw, Mc: Pw, jb: Tw, ib: Dw, V: Aw, Ka: Mw, lb: Iw, Pc: Nw, Dc: Bw, Oc: Vw, yc: Hw, Da: Xw, w: Kw, ya: Zw, fb: Jw, l: t1, E: n1, la: o1, uc: s1, xa: u1, vc: f1, k: p1, tc: v1, ua: g1, U: w1, kb: x1, tb: S1, mb: b1, Ec: P1, Bc: T1, _a: D1, Na: A1, ob: O1, qb: j1, ub: z1, o: U1, Rc: W1, gb: G1, Lc: Y1, db: Q1, ra: q1, nb: e_, ka: r_, q: l_, ba: a_, Sc: c_, ga: d_, W: h_, fa: y_, cb: __, S: k_, Cc: E_, Nc: C_, Pa: R_, bb: L_, sa: F_, Oa: $_, ab: O_, Ac: j_, zc: z_, r: U_, $a: W_, xc: G_, Fa: Y_, Ic: Q_, oa: q_, Kc: e2, Jc: r2, Ga: i2, Hc: l2, wa: a2, Gc: c2, pa: d2, Fc: h2, qa: m2, j: y2, Ja: _2, Ia: k2, sc: E2, rc: C2, H: R2, yb: U2, zb: V2, ic: _f, Gb: T2 };
  function G2(n) {
    n = Object.assign({}, n);
    var i = (c) => (d) => c(d) >>> 0, l = (c) => (d, h) => c(d, h) >>> 0, u = (c) => () => c() >>> 0;
    return n.Vc = i(n.Vc), n.Yc = i(n.Yc), n.cd = l(n.cd), n.fd = i(n.fd), n.gd = u(n.gd), n;
  }
  function ya() {
    if (Rt > 0) {
      Br = ya;
      return;
    }
    if (ye(), Rt > 0) {
      Br = ya;
      return;
    }
    function n() {
      var i;
      r.calledRun = !0, !k && (xe(), B == null || B(r), (i = r.onRuntimeInitialized) == null || i.call(r), We());
    }
    r.setStatus ? (r.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => r.setStatus(""), 1), n();
    }, 1)) : n();
  }
  var zn;
  return zn = await Nr(), ya(), dt ? t = r : t = new Promise((n, i) => {
    B = n, U = i;
  }), t;
}
async function xS(e, t) {
  if (!t || !e.body)
    return e.arrayBuffer();
  const r = e.headers.get("content-length"), o = r == null ? NaN : Number(r), s = Number.isFinite(o) ? o : null, a = e.body.getReader(), f = [];
  let p = 0;
  for (t(0, s); ; ) {
    const { done: w, value: D } = await a.read();
    if (w)
      break;
    D && (f.push(D), p += D.length, t(p, s));
  }
  const g = new Uint8Array(p);
  let y = 0;
  for (const w of f)
    g.set(w, y), y += w.length;
  return g.buffer;
}
const $0 = /* @__PURE__ */ new Map();
function kS(e, t) {
  const r = $0.get(e);
  if (!r)
    return null;
  SS(e, r), t != null && t.onProgress && (r.progress = t.onProgress);
  const o = t == null ? void 0 : t.signal;
  if (o)
    if (o.aborted)
      r.fetchController.abort();
    else {
      const s = () => r.fetchController.abort();
      o.addEventListener("abort", s, { once: !0 });
      const a = () => o.removeEventListener("abort", s);
      r.promise.then(a, a);
    }
  return r.promise;
}
function SS(e, t) {
  $0.delete(e), t.evictionController.abort();
}
class ES {
  constructor(t, r, o) {
    Ye(this, "_bindings");
    Ye(this, "_canvas");
    Ye(this, "_dpiScale");
    Ye(this, "_dataModel");
    Ye(this, "_display");
    Ye(this, "_annotationModel");
    Ye(this, "_brush");
    Ye(this, "_rafId", null);
    Ye(this, "_autoRenderPaused", !1);
    Ye(this, "_autoResizePaused", !1);
    Ye(this, "_resizeObserver", null);
    Ye(this, "_eventAbort", new AbortController());
    Ye(this, "_contextMenuCallback", null);
    Ye(this, "_dirCounter", 0);
    try {
      this._bindings = t, this._canvas = r, this._dpiScale = (o == null ? void 0 : o.dpiScale) ?? window.devicePixelRatio ?? 1, this._bindings.init(o == null ? void 0 : o.licenseToken), this._bindings.setDpiScale(this._dpiScale), this._dataModel = this._bindings.dataModel(), this._display = this._bindings.display(), this._annotationModel = this._bindings.annotationModel(), this._brush = this._bindings.brush(), (o == null ? void 0 : o.autoRender) !== !1 && this._setupAutoRender(), (o == null ? void 0 : o.autoResize) !== !1 && this._setupResizeObserver(), (o == null ? void 0 : o.autoInputHandling) !== !1 && this._setupInputHandling(), (o == null ? void 0 : o.uiAnimations) === !1 && this._bindings.enableAnimations(!1), this._updateCanvasSize(!0);
    } catch (s) {
      if (s instanceof WebAssembly.Exception) {
        const a = (() => {
          if ("message" in s && typeof s.message == "string")
            return s.message;
          {
            const [f, p] = t.getExceptionMessage(s);
            return `${f}: ${p}`;
          }
        })();
        throw t.decrementExceptionRefcount(s), new Error(a);
      }
      throw s;
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
    const { onProgress: o, signal: s } = r ?? {};
    s == null || s.throwIfAborted();
    const a = new URL(t, window.location.href).pathname, f = decodeURIComponent(a.slice(a.lastIndexOf("/") + 1));
    if (!f)
      throw new Error(`Cannot derive a filename from URL: ${t}`);
    const p = await this._fetchUrlBytes(t, { signal: s, onProgress: o });
    return this.loadBuffer(p, f);
  }
  async loadFolder(t) {
    if (t.length === 0)
      return this.asHandleArray([]);
    const r = this._generateTempDir();
    try {
      const o = t.map((p) => p.webkitRelativePath || p.name), { parentName: s, relativePaths: a } = this._stripCommonParent(o), f = s ? `${r}/${s}` : r;
      for (let p = 0; p < t.length; p++) {
        const g = await t[p].arrayBuffer();
        this._writeFileWithParents(`${f}/${a[p]}`, new Uint8Array(g));
      }
      return this.dataModel.loadFile(f);
    } finally {
      this._rmrf(r);
    }
  }
  async loadFolderFromUrls(t, r) {
    const { onProgress: o, signal: s, concurrency: a = 6 } = r ?? {};
    if (s == null || s.throwIfAborted(), !Number.isFinite(a) || a < 1)
      throw new Error(`concurrency must be a finite positive number, got ${a}`);
    if (t.length === 0)
      return this.asHandleArray([]);
    const f = t.map((z) => new URL(z, window.location.href)), { origin: p } = f[0];
    for (let z = 0; z < f.length; z++) {
      const Q = f[z];
      if (Q.origin !== p)
        throw new Error(`All URLs must share the same origin. Got both "${p}" and "${Q.origin}".`);
      if (Q.pathname.endsWith("/"))
        throw new Error(`URL must point to a file: ${t[z]}`);
    }
    const g = new AbortController(), y = () => g.abort();
    s == null || s.addEventListener("abort", y, { once: !0 });
    const w = this._generateTempDir(), D = f.map((z) => decodeURIComponent(z.pathname).replace(/^\/+/, "")), { parentName: C, relativePaths: b } = this._stripCommonParent(D), j = C ? `${w}/${C}` : w;
    try {
      const z = new Array(t.length).fill(null), Q = new Array(t.length).fill(0), x = () => {
        if (!o)
          return;
        let U = 0, A = 0;
        for (let I = 0; I < t.length; I++)
          if (U += Q[I], A !== null) {
            const $ = z[I];
            $ === null ? A = null : A += $;
          }
        o(U, A);
      };
      x();
      const k = async (U) => {
        const A = t[U], I = (F, S) => {
          Q[U] = F, z[U] === null && S !== null && (z[U] = S), x();
        }, $ = await this._fetchUrlBytes(A, { signal: g.signal, onProgress: I });
        Q[U] = $.byteLength, z[U] === null && (z[U] = $.byteLength), x(), this._writeFileWithParents(`${j}/${b[U]}`, new Uint8Array($));
      };
      let E = 0;
      const P = async () => {
        for (; !g.signal.aborted; ) {
          const U = E++;
          if (U >= t.length)
            return;
          try {
            await k(U);
          } catch (A) {
            throw g.abort(), A;
          }
        }
      }, B = Math.min(Math.floor(a), t.length);
      return await Promise.all(Array.from({ length: B }, () => P())), s == null || s.throwIfAborted(), this.dataModel.loadFile(j);
    } finally {
      s == null || s.removeEventListener("abort", y), this._rmrf(w);
    }
  }
  loadBuffer(t, r) {
    const o = this._generateTempDir(), s = `${o}/${r}`;
    try {
      return this._writeFileWithParents(s, new Uint8Array(t)), Promise.resolve(this.dataModel.loadFile(s));
    } finally {
      this._rmrf(o);
    }
  }
  createImage(t) {
    const { dimensions: r, channels: o, data: s, spacing: a } = t, { PixelType: f } = this._bindings;
    let p = null;
    if (s instanceof Int8Array ? p = f.Byte : s instanceof Uint8Array ? p = f.UByte : s instanceof Int16Array ? p = f.Short : s instanceof Uint16Array ? p = f.UShort : s instanceof Int32Array ? p = f.Int : s instanceof Uint32Array ? p = f.UInt : s instanceof Float32Array ? p = f.Float : s instanceof Float64Array && (p = f.Double), p === null)
      return null;
    const g = new this._bindings.ImageDescriptor(p, r, o);
    return a !== void 0 && g.setSpacing(a, !0), this._bindings.Image.fromTypedArray(g, s);
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
      const s = t[o];
      s && (r.showData(s), o === 0 && r.centerOnData(s));
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
    const t = this._canvas, r = this.display, { signal: o } = this._eventAbort, s = (a, f) => {
      const p = f(this._createScaledEvent(a));
      t.style.cursor = p.cursorShape, !p.contextMenu.isEmpty() && this._contextMenuCallback && this._contextMenuCallback(p.contextMenu, a), p.stopPropagation && a.stopPropagation();
    };
    t.addEventListener("pointerdown", (a) => {
      a.pointerType !== "touch" && (t.setPointerCapture(a.pointerId), s(a, (f) => r.handleMouseDown(f)));
    }, { signal: o }), t.addEventListener("pointermove", (a) => {
      a.pointerType !== "touch" && s(a, (f) => r.handleMouseMove(f));
    }, { signal: o }), t.addEventListener("pointerup", (a) => {
      a.pointerType !== "touch" && s(a, (f) => r.handleMouseUp(f));
    }, { signal: o }), t.addEventListener("touchstart", (a) => {
      a.preventDefault(), s(a, (f) => r.handleTouchStart(f));
    }, { passive: !1, signal: o }), t.addEventListener("touchmove", (a) => {
      a.preventDefault(), s(a, (f) => r.handleTouchMove(f));
    }, { passive: !1, signal: o }), t.addEventListener("touchend", (a) => {
      a.preventDefault(), s(a, (f) => r.handleTouchEnd(f));
    }, { signal: o }), t.addEventListener("dblclick", (a) => s(a, (f) => r.handleDoubleClick(f)), { signal: o }), t.addEventListener("wheel", (a) => {
      a.preventDefault(), s(a, (f) => r.handleMouseWheel(f));
    }, { passive: !1, signal: o }), t.addEventListener("contextmenu", (a) => {
      a.preventDefault(), s(a, (f) => r.handleContextMenu(f));
    }, { signal: o });
  }
  _updateCanvasSize(t = !1) {
    if (!this._canvas.isConnected)
      return;
    const r = this._canvas.getBoundingClientRect(), o = r.width, s = r.height, a = Math.floor(o * this._dpiScale), f = Math.floor(s * this._dpiScale);
    (t || this._canvas.width !== a || this._canvas.height !== f) && (this._canvas.width = a, this._canvas.height = f, this._bindings.setDpiScale(this._dpiScale), this.display.setSize(a, f), this.display.render());
  }
  _createScaledEvent(t) {
    if (this._dpiScale === 1)
      return t;
    const r = this._canvas.getBoundingClientRect(), o = this._dpiScale, s = (a, f) => f + (a - f) * o;
    if (t instanceof MouseEvent)
      return new Proxy(t, {
        get(a, f) {
          if (f === "clientX")
            return s(a.clientX, r.left);
          if (f === "clientY")
            return s(a.clientY, r.top);
          if (f === "deltaX" && "deltaX" in a)
            return a.deltaX * o;
          if (f === "deltaY" && "deltaY" in a)
            return a.deltaY * o;
          const p = Reflect.get(a, f);
          return typeof p == "function" ? p.bind(a) : p;
        }
      });
    if (t instanceof TouchEvent) {
      const a = (p) => new Proxy(p, {
        get(g, y) {
          return y === "clientX" ? s(g.clientX, r.left) : y === "clientY" ? s(g.clientY, r.top) : Reflect.get(g, y);
        }
      }), f = (p) => Array.from(p, a);
      return new Proxy(t, {
        get(p, g) {
          if (g === "touches")
            return f(p.touches);
          if (g === "changedTouches")
            return f(p.changedTouches);
          if (g === "targetTouches")
            return f(p.targetTouches);
          const y = Reflect.get(p, g);
          return typeof y == "function" ? y.bind(p) : y;
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
    const { signal: o, onProgress: s } = r, a = kS(t, { onProgress: s, signal: o });
    let f;
    if (a)
      f = await a;
    else {
      const p = await fetch(t, { signal: o });
      if (!p.ok)
        throw new Error(`Failed to fetch ${t}: ${p.status} ${p.statusText}`);
      f = await xS(p, s);
    }
    return o == null || o.throwIfAborted(), f;
  }
  _commonParentPath(t) {
    if (t.length === 0)
      return "";
    const r = t[0];
    let o = r.length;
    for (let s = 1; s < t.length; s++) {
      const a = t[s], f = Math.min(o, a.length);
      let p = 0;
      for (; p < f && a[p] === r[p]; )
        p++;
      o = p;
    }
    for (; o > 0 && r[o - 1] !== "/"; )
      o--;
    return r.slice(0, o);
  }
  /** Strip the shared parent directory from folder-entry paths and return its basename separately. */
  _stripCommonParent(t) {
    for (const f of t)
      this._validateRelativePath(f);
    const r = this._commonParentPath(t), o = r.replace(/\/+$/, ""), s = o ? o.slice(o.lastIndexOf("/") + 1) : null, a = t.map((f) => {
      const p = f.slice(r.length);
      return this._validateRelativePath(p), p;
    });
    return { parentName: s, relativePaths: a };
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
    for (const s of o)
      s === "." || s === ".." || this._rmrf(`${t}/${s}`);
    try {
      r.rmdir(t);
    } catch {
    }
  }
}
let Ha = null;
function M0(e) {
  return Ha ?? (Ha = (async () => {
    const t = (e == null ? void 0 : e.url) ?? new URL("..".concat("/wasm/ImFusionLib.wasm"), import.meta.url);
    try {
      return await WebAssembly.compileStreaming(fetch(t));
    } catch {
      const r = await fetch(t).then((o) => o.arrayBuffer());
      return WebAssembly.compile(r);
    }
  })().catch((t) => {
    throw Ha = null, t;
  })), Ha;
}
async function bS(e, t) {
  const r = await M0(), o = await _S({
    canvas: e,
    instantiateWasm: (s, a) => (WebAssembly.instantiate(r, s).then((f) => a(f, r)), {})
  });
  return new ES(o, e, t);
}
const ri = R.createContext(null);
function CS({ options: e, onReady: t, onError: r, children: o }) {
  const [s, a] = R.useState(null), [f, p] = R.useState(null), [g, y] = R.useState(null), w = R.useRef(null), D = R.useRef(null), C = R.useRef(e), b = R.useRef(t), j = R.useRef(r);
  b.current = t, j.current = r;
  const z = R.useCallback((x) => {
    if (D.current) {
      D.current !== x && console.warn("ImFusionProvider: A different canvas element was registered after SDK initialization. The SDK remains bound to the original canvas.");
      return;
    }
    D.current = x, a(x);
  }, []);
  R.useEffect(() => {
    if (!s)
      return;
    let x = !1;
    return w.current || (w.current = bS(s, C.current)), w.current.then((k) => {
      var E;
      x || (p(k), (E = b.current) == null || E.call(b, k));
    }).catch((k) => {
      var E;
      if (!x) {
        const P = k instanceof Error ? k : new Error(String(k));
        y(P), (E = j.current) == null || E.call(j, P);
      }
    }), () => {
      var k;
      x = !0, (k = w.current) == null || k.then((E) => E.destroy());
    };
  }, [s]);
  const Q = R.useMemo(() => ({ imf: f, error: g, registerCanvas: z }), [f, g, z]);
  return L.jsx(ri.Provider, { value: Q, children: o });
}
const PS = R.forwardRef(function(t, r) {
  const o = R.useContext(ri), s = R.useRef(null);
  if (!o)
    throw new Error("ImFusionCanvas must be used within an ImFusionProvider");
  R.useEffect(() => {
    const f = s.current;
    f && o.registerCanvas(f);
  }, [o.registerCanvas]);
  const a = (f) => {
    s.current = f, typeof r == "function" ? r(f) : r && (r.current = f);
  };
  return L.jsx("canvas", { ref: a, ...t });
});
function RS({ children: e }) {
  const t = R.useContext(ri);
  if (!t)
    throw new Error("ImFusionReady must be used within an ImFusionProvider");
  return t.imf ? L.jsx(L.Fragment, { children: e }) : null;
}
function TS({ children: e }) {
  const t = R.useContext(ri);
  if (!t)
    throw new Error("ImFusionLoading must be used within an ImFusionProvider");
  return !t.imf && !t.error ? L.jsx(L.Fragment, { children: e }) : null;
}
function LS({ children: e }) {
  const t = R.useContext(ri);
  if (!t)
    throw new Error("ImFusionError must be used within an ImFusionProvider");
  return t.error ? L.jsx(L.Fragment, { children: e }) : null;
}
function Tr() {
  const e = R.useContext(ri);
  if (!e)
    throw new Error("useImFusion must be used within an ImFusionProvider");
  if (!e.imf)
    throw new Error("ImFusion SDK is not yet initialized");
  return e.imf;
}
function DS() {
  const e = R.useContext(ri);
  if (!e)
    throw new Error("useImFusionError must be used within an ImFusionProvider");
  if (!e.error)
    throw new Error("No initialization error has occurred");
  return e.error;
}
function O0(e) {
  const [t, r] = R.useState(e);
  return e !== void 0 && t !== void 0 ? e.isAliasOf(t) || r(e) : e !== t && r(e), t;
}
function FS(e) {
  Tr();
  const [, t] = R.useReducer((a) => !a, !1), r = O0(e), [o, s] = R.useState(() => r.displayOptions2d());
  return R.useEffect(() => {
    const a = r.displayOptions2d();
    return s(a), a.onChanged(() => t());
  }, [r]), o;
}
function AS(e) {
  Tr();
  const [, t] = R.useReducer((a) => !a, !1), r = O0(e), [o, s] = R.useState(() => r.displayOptions3d());
  return R.useEffect(() => {
    const a = r.displayOptions3d();
    return s(a), a.onChanged(() => t());
  }, [r]), o;
}
function $S(e) {
  const t = Tr(), r = R.useRef(e);
  r.current = e, R.useEffect(() => t.onContextMenu((s, a) => r.current(s, a)), [t]);
}
const I0 = 320, j0 = 180, MS = j0 / I0;
function tp({ color: e, size: t = 24, style: r }) {
  const o = t * MS;
  return /* @__PURE__ */ L.jsxs(
    "svg",
    {
      width: t,
      height: o,
      viewBox: `0 0 ${I0} ${j0}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ L.jsx("path", { d: "M320 180H0V159.715L237.082 128.105L320 65.916V180Z", fill: e }),
        /* @__PURE__ */ L.jsx("path", { d: "M320 20.2832L82.918 51.8945L0 114.082V0H320V20.2832Z", fill: e })
      ]
    }
  );
}
const OS = "0.1.2";
function IS({ isDark: e }) {
  const [t, r] = R.useState(!1), o = R.useRef(null);
  R.useEffect(() => {
    if (!t) return;
    function a(p) {
      o.current && !o.current.contains(p.target) && r(!1);
    }
    function f(p) {
      p.key === "Escape" && r(!1);
    }
    return document.addEventListener("mousedown", a), document.addEventListener("keydown", f), () => {
      document.removeEventListener("mousedown", a), document.removeEventListener("keydown", f);
    };
  }, [t]);
  const s = e ? "#F9FDFE" : "#245EFF";
  return /* @__PURE__ */ L.jsxs("div", { ref: o, style: jS, children: [
    /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        onClick: () => r((a) => !a),
        style: NS,
        "aria-label": "About ImFusion Viewer",
        title: "About ImFusion Viewer",
        "aria-expanded": t,
        children: /* @__PURE__ */ L.jsx(tp, { color: s, size: 16 })
      }
    ),
    t && /* @__PURE__ */ L.jsxs("div", { style: zS, role: "dialog", "aria-label": "About ImFusion Viewer", children: [
      /* @__PURE__ */ L.jsx(tp, { color: s, size: 30, style: BS }),
      /* @__PURE__ */ L.jsx("div", { style: US, children: "ImFusion Viewer" }),
      /* @__PURE__ */ L.jsxs("div", { style: VS, children: [
        "Version ",
        OS
      ] }),
      /* @__PURE__ */ L.jsx("div", { style: WS, children: "Copyright © ImFusion GmbH." }),
      /* @__PURE__ */ L.jsx("div", { style: HS, children: "Not for clinical use." })
    ] })
  ] });
}
const jS = {
  position: "relative",
  flexShrink: 0
}, NS = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  cursor: "pointer"
}, zS = {
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
}, BS = {
  marginBottom: 2
}, US = {}, VS = {
  color: "var(--tb-text-muted)",
  marginBottom: 4
}, WS = {}, HS = {
  color: "var(--tb-error)"
}, GS = {
  color: "var(--tb-text-muted)",
  marginTop: 2
};
function Gi(e) {
  let t = e.length;
  for (; --t >= 0; )
    e[t] = 0;
}
const XS = 3, YS = 258, N0 = 29, KS = 256, QS = KS + 1 + N0, z0 = 30, ZS = 512, qS = new Array((QS + 2) * 2);
Gi(qS);
const JS = new Array(z0 * 2);
Gi(JS);
const eE = new Array(ZS);
Gi(eE);
const tE = new Array(YS - XS + 1);
Gi(tE);
const rE = new Array(N0);
Gi(rE);
const nE = new Array(z0);
Gi(nE);
const iE = (e, t, r, o) => {
  let s = e & 65535 | 0, a = e >>> 16 & 65535 | 0, f = 0;
  for (; r !== 0; ) {
    f = r > 2e3 ? 2e3 : r, r -= f;
    do
      s = s + t[o++] | 0, a = a + s | 0;
    while (--f);
    s %= 65521, a %= 65521;
  }
  return s | a << 16 | 0;
};
var ec = iE;
const oE = () => {
  let e, t = [];
  for (var r = 0; r < 256; r++) {
    e = r;
    for (var o = 0; o < 8; o++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[r] = e;
  }
  return t;
}, lE = new Uint32Array(oE()), sE = (e, t, r, o) => {
  const s = lE, a = o + r;
  e ^= -1;
  for (let f = o; f < a; f++)
    e = e >>> 8 ^ s[(e ^ t[f]) & 255];
  return e ^ -1;
};
var Ar = sE, tc = {
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
}, B0 = {
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
const aE = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
var uE = function(e) {
  const t = Array.prototype.slice.call(arguments, 1);
  for (; t.length; ) {
    const r = t.shift();
    if (r) {
      if (typeof r != "object")
        throw new TypeError(r + "must be non-object");
      for (const o in r)
        aE(r, o) && (e[o] = r[o]);
    }
  }
  return e;
}, cE = (e) => {
  let t = 0;
  for (let o = 0, s = e.length; o < s; o++)
    t += e[o].length;
  const r = new Uint8Array(t);
  for (let o = 0, s = 0, a = e.length; o < a; o++) {
    let f = e[o];
    r.set(f, s), s += f.length;
  }
  return r;
}, U0 = {
  assign: uE,
  flattenChunks: cE
};
let V0 = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  V0 = !1;
}
const Ko = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  Ko[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
Ko[254] = Ko[255] = 1;
var fE = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let t, r, o, s, a, f = e.length, p = 0;
  for (s = 0; s < f; s++)
    r = e.charCodeAt(s), (r & 64512) === 55296 && s + 1 < f && (o = e.charCodeAt(s + 1), (o & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (o - 56320), s++)), p += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
  for (t = new Uint8Array(p), a = 0, s = 0; a < p; s++)
    r = e.charCodeAt(s), (r & 64512) === 55296 && s + 1 < f && (o = e.charCodeAt(s + 1), (o & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (o - 56320), s++)), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | r & 63) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | r & 63) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | r & 63);
  return t;
};
const dE = (e, t) => {
  if (t < 65534 && e.subarray && V0)
    return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
  let r = "";
  for (let o = 0; o < t; o++)
    r += String.fromCharCode(e[o]);
  return r;
};
var pE = (e, t) => {
  const r = t || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, t));
  let o, s;
  const a = new Array(r * 2);
  for (s = 0, o = 0; o < r; ) {
    let f = e[o++];
    if (f < 128) {
      a[s++] = f;
      continue;
    }
    let p = Ko[f];
    if (p > 4) {
      a[s++] = 65533, o += p - 1;
      continue;
    }
    for (f &= p === 2 ? 31 : p === 3 ? 15 : 7; p > 1 && o < r; )
      f = f << 6 | e[o++] & 63, p--;
    if (p > 1) {
      a[s++] = 65533;
      continue;
    }
    f < 65536 ? a[s++] = f : (f -= 65536, a[s++] = 55296 | f >> 10 & 1023, a[s++] = 56320 | f & 1023);
  }
  return dE(a, s);
}, hE = (e, t) => {
  t = t || e.length, t > e.length && (t = e.length);
  let r = t - 1;
  for (; r >= 0 && (e[r] & 192) === 128; )
    r--;
  return r < 0 || r === 0 ? t : r + Ko[e[r]] > t ? r : t;
}, rc = {
  string2buf: fE,
  buf2string: pE,
  utf8border: hE
};
function vE() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var mE = vE;
const Nl = 16209, gE = 16191;
var yE = function(t, r) {
  let o, s, a, f, p, g, y, w, D, C, b, j, z, Q, x, k, E, P, B, U, A, I, $, F;
  const S = t.state;
  o = t.next_in, $ = t.input, s = o + (t.avail_in - 5), a = t.next_out, F = t.output, f = a - (r - t.avail_out), p = a + (t.avail_out - 257), g = S.dmax, y = S.wsize, w = S.whave, D = S.wnext, C = S.window, b = S.hold, j = S.bits, z = S.lencode, Q = S.distcode, x = (1 << S.lenbits) - 1, k = (1 << S.distbits) - 1;
  e:
    do {
      j < 15 && (b += $[o++] << j, j += 8, b += $[o++] << j, j += 8), E = z[b & x];
      t:
        for (; ; ) {
          if (P = E >>> 24, b >>>= P, j -= P, P = E >>> 16 & 255, P === 0)
            F[a++] = E & 65535;
          else if (P & 16) {
            B = E & 65535, P &= 15, P && (j < P && (b += $[o++] << j, j += 8), B += b & (1 << P) - 1, b >>>= P, j -= P), j < 15 && (b += $[o++] << j, j += 8, b += $[o++] << j, j += 8), E = Q[b & k];
            r:
              for (; ; ) {
                if (P = E >>> 24, b >>>= P, j -= P, P = E >>> 16 & 255, P & 16) {
                  if (U = E & 65535, P &= 15, j < P && (b += $[o++] << j, j += 8, j < P && (b += $[o++] << j, j += 8)), U += b & (1 << P) - 1, U > g) {
                    t.msg = "invalid distance too far back", S.mode = Nl;
                    break e;
                  }
                  if (b >>>= P, j -= P, P = a - f, U > P) {
                    if (P = U - P, P > w && S.sane) {
                      t.msg = "invalid distance too far back", S.mode = Nl;
                      break e;
                    }
                    if (A = 0, I = C, D === 0) {
                      if (A += y - P, P < B) {
                        B -= P;
                        do
                          F[a++] = C[A++];
                        while (--P);
                        A = a - U, I = F;
                      }
                    } else if (D < P) {
                      if (A += y + D - P, P -= D, P < B) {
                        B -= P;
                        do
                          F[a++] = C[A++];
                        while (--P);
                        if (A = 0, D < B) {
                          P = D, B -= P;
                          do
                            F[a++] = C[A++];
                          while (--P);
                          A = a - U, I = F;
                        }
                      }
                    } else if (A += D - P, P < B) {
                      B -= P;
                      do
                        F[a++] = C[A++];
                      while (--P);
                      A = a - U, I = F;
                    }
                    for (; B > 2; )
                      F[a++] = I[A++], F[a++] = I[A++], F[a++] = I[A++], B -= 3;
                    B && (F[a++] = I[A++], B > 1 && (F[a++] = I[A++]));
                  } else {
                    A = a - U;
                    do
                      F[a++] = F[A++], F[a++] = F[A++], F[a++] = F[A++], B -= 3;
                    while (B > 2);
                    B && (F[a++] = F[A++], B > 1 && (F[a++] = F[A++]));
                  }
                } else if (P & 64) {
                  t.msg = "invalid distance code", S.mode = Nl;
                  break e;
                } else {
                  E = Q[(E & 65535) + (b & (1 << P) - 1)];
                  continue r;
                }
                break;
              }
          } else if (P & 64)
            if (P & 32) {
              S.mode = gE;
              break e;
            } else {
              t.msg = "invalid literal/length code", S.mode = Nl;
              break e;
            }
          else {
            E = z[(E & 65535) + (b & (1 << P) - 1)];
            continue t;
          }
          break;
        }
    } while (o < s && a < p);
  B = j >> 3, o -= B, j -= B << 3, b &= (1 << j) - 1, t.next_in = o, t.next_out = a, t.avail_in = o < s ? 5 + (s - o) : 5 - (o - s), t.avail_out = a < p ? 257 + (p - a) : 257 - (a - p), S.hold = b, S.bits = j;
};
const vi = 15, rp = 852, np = 592, ip = 0, Ga = 1, op = 2, wE = new Uint16Array([
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
]), _E = new Uint8Array([
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
]), xE = new Uint16Array([
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
]), kE = new Uint8Array([
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
]), SE = (e, t, r, o, s, a, f, p) => {
  const g = p.bits;
  let y = 0, w = 0, D = 0, C = 0, b = 0, j = 0, z = 0, Q = 0, x = 0, k = 0, E, P, B, U, A, I = null, $;
  const F = new Uint16Array(vi + 1), S = new Uint16Array(vi + 1);
  let Z = null, ue, Pe, Se;
  for (y = 0; y <= vi; y++)
    F[y] = 0;
  for (w = 0; w < o; w++)
    F[t[r + w]]++;
  for (b = g, C = vi; C >= 1 && F[C] === 0; C--)
    ;
  if (b > C && (b = C), C === 0)
    return s[a++] = 1 << 24 | 64 << 16 | 0, s[a++] = 1 << 24 | 64 << 16 | 0, p.bits = 1, 0;
  for (D = 1; D < C && F[D] === 0; D++)
    ;
  for (b < D && (b = D), Q = 1, y = 1; y <= vi; y++)
    if (Q <<= 1, Q -= F[y], Q < 0)
      return -1;
  if (Q > 0 && (e === ip || C !== 1))
    return -1;
  for (S[1] = 0, y = 1; y < vi; y++)
    S[y + 1] = S[y] + F[y];
  for (w = 0; w < o; w++)
    t[r + w] !== 0 && (f[S[t[r + w]]++] = w);
  if (e === ip ? (I = Z = f, $ = 20) : e === Ga ? (I = wE, Z = _E, $ = 257) : (I = xE, Z = kE, $ = 0), k = 0, w = 0, y = D, A = a, j = b, z = 0, B = -1, x = 1 << b, U = x - 1, e === Ga && x > rp || e === op && x > np)
    return 1;
  for (; ; ) {
    ue = y - z, f[w] + 1 < $ ? (Pe = 0, Se = f[w]) : f[w] >= $ ? (Pe = Z[f[w] - $], Se = I[f[w] - $]) : (Pe = 96, Se = 0), E = 1 << y - z, P = 1 << j, D = P;
    do
      P -= E, s[A + (k >> z) + P] = ue << 24 | Pe << 16 | Se | 0;
    while (P !== 0);
    for (E = 1 << y - 1; k & E; )
      E >>= 1;
    if (E !== 0 ? (k &= E - 1, k += E) : k = 0, w++, --F[y] === 0) {
      if (y === C)
        break;
      y = t[r + f[w]];
    }
    if (y > b && (k & U) !== B) {
      for (z === 0 && (z = b), A += D, j = y - z, Q = 1 << j; j + z < C && (Q -= F[j + z], !(Q <= 0)); )
        j++, Q <<= 1;
      if (x += 1 << j, e === Ga && x > rp || e === op && x > np)
        return 1;
      B = k & U, s[B] = b << 24 | j << 16 | A - a | 0;
    }
  }
  return k !== 0 && (s[A + k] = y - z << 24 | 64 << 16 | 0), p.bits = b, 0;
};
var Do = SE;
const EE = 0, W0 = 1, H0 = 2, {
  Z_FINISH: lp,
  Z_BLOCK: bE,
  Z_TREES: zl,
  Z_OK: Jn,
  Z_STREAM_END: CE,
  Z_NEED_DICT: PE,
  Z_STREAM_ERROR: hr,
  Z_DATA_ERROR: G0,
  Z_MEM_ERROR: X0,
  Z_BUF_ERROR: RE,
  Z_DEFLATED: sp
} = B0, Zs = 16180, ap = 16181, up = 16182, cp = 16183, fp = 16184, dp = 16185, pp = 16186, hp = 16187, vp = 16188, mp = 16189, Fs = 16190, Xr = 16191, Xa = 16192, gp = 16193, Ya = 16194, yp = 16195, wp = 16196, _p = 16197, xp = 16198, Bl = 16199, Ul = 16200, kp = 16201, Sp = 16202, Ep = 16203, bp = 16204, Cp = 16205, Ka = 16206, Pp = 16207, Rp = 16208, Je = 16209, Y0 = 16210, K0 = 16211, TE = 852, LE = 592, DE = 15, FE = DE, Tp = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function AE() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const ni = (e) => {
  if (!e)
    return 1;
  const t = e.state;
  return !t || t.strm !== e || t.mode < Zs || t.mode > K0 ? 1 : 0;
}, Q0 = (e) => {
  if (ni(e))
    return hr;
  const t = e.state;
  return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = Zs, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(TE), t.distcode = t.distdyn = new Int32Array(LE), t.sane = 1, t.back = -1, Jn;
}, Z0 = (e) => {
  if (ni(e))
    return hr;
  const t = e.state;
  return t.wsize = 0, t.whave = 0, t.wnext = 0, Q0(e);
}, q0 = (e, t) => {
  let r;
  if (ni(e))
    return hr;
  const o = e.state;
  return t < 0 ? (r = 0, t = -t) : (r = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? hr : (o.window !== null && o.wbits !== t && (o.window = null), o.wrap = r, o.wbits = t, Z0(e));
}, J0 = (e, t) => {
  if (!e)
    return hr;
  const r = new AE();
  e.state = r, r.strm = e, r.window = null, r.mode = Zs;
  const o = q0(e, t);
  return o !== Jn && (e.state = null), o;
}, $E = (e) => J0(e, FE);
let Lp = !0, Qa, Za;
const ME = (e) => {
  if (Lp) {
    Qa = new Int32Array(512), Za = new Int32Array(32);
    let t = 0;
    for (; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (Do(W0, e.lens, 0, 288, Qa, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    Do(H0, e.lens, 0, 32, Za, 0, e.work, { bits: 5 }), Lp = !1;
  }
  e.lencode = Qa, e.lenbits = 9, e.distcode = Za, e.distbits = 5;
}, em = (e, t, r, o) => {
  let s;
  const a = e.state;
  return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), o >= a.wsize ? (a.window.set(t.subarray(r - a.wsize, r), 0), a.wnext = 0, a.whave = a.wsize) : (s = a.wsize - a.wnext, s > o && (s = o), a.window.set(t.subarray(r - o, r - o + s), a.wnext), o -= s, o ? (a.window.set(t.subarray(r - o, r), 0), a.wnext = o, a.whave = a.wsize) : (a.wnext += s, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += s))), 0;
}, OE = (e, t) => {
  let r, o, s, a, f, p, g, y, w, D, C, b, j, z, Q = 0, x, k, E, P, B, U, A, I;
  const $ = new Uint8Array(4);
  let F, S;
  const Z = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (ni(e) || !e.output || !e.input && e.avail_in !== 0)
    return hr;
  r = e.state, r.mode === Xr && (r.mode = Xa), f = e.next_out, s = e.output, g = e.avail_out, a = e.next_in, o = e.input, p = e.avail_in, y = r.hold, w = r.bits, D = p, C = g, I = Jn;
  e:
    for (; ; )
      switch (r.mode) {
        case Zs:
          if (r.wrap === 0) {
            r.mode = Xa;
            break;
          }
          for (; w < 16; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if (r.wrap & 2 && y === 35615) {
            r.wbits === 0 && (r.wbits = 15), r.check = 0, $[0] = y & 255, $[1] = y >>> 8 & 255, r.check = Ar(r.check, $, 2, 0), y = 0, w = 0, r.mode = ap;
            break;
          }
          if (r.head && (r.head.done = !1), !(r.wrap & 1) || /* check if zlib header allowed */
          (((y & 255) << 8) + (y >> 8)) % 31) {
            e.msg = "incorrect header check", r.mode = Je;
            break;
          }
          if ((y & 15) !== sp) {
            e.msg = "unknown compression method", r.mode = Je;
            break;
          }
          if (y >>>= 4, w -= 4, A = (y & 15) + 8, r.wbits === 0 && (r.wbits = A), A > 15 || A > r.wbits) {
            e.msg = "invalid window size", r.mode = Je;
            break;
          }
          r.dmax = 1 << r.wbits, r.flags = 0, e.adler = r.check = 1, r.mode = y & 512 ? mp : Xr, y = 0, w = 0;
          break;
        case ap:
          for (; w < 16; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if (r.flags = y, (r.flags & 255) !== sp) {
            e.msg = "unknown compression method", r.mode = Je;
            break;
          }
          if (r.flags & 57344) {
            e.msg = "unknown header flags set", r.mode = Je;
            break;
          }
          r.head && (r.head.text = y >> 8 & 1), r.flags & 512 && r.wrap & 4 && ($[0] = y & 255, $[1] = y >>> 8 & 255, r.check = Ar(r.check, $, 2, 0)), y = 0, w = 0, r.mode = up;
        case up:
          for (; w < 32; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          r.head && (r.head.time = y), r.flags & 512 && r.wrap & 4 && ($[0] = y & 255, $[1] = y >>> 8 & 255, $[2] = y >>> 16 & 255, $[3] = y >>> 24 & 255, r.check = Ar(r.check, $, 4, 0)), y = 0, w = 0, r.mode = cp;
        case cp:
          for (; w < 16; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          r.head && (r.head.xflags = y & 255, r.head.os = y >> 8), r.flags & 512 && r.wrap & 4 && ($[0] = y & 255, $[1] = y >>> 8 & 255, r.check = Ar(r.check, $, 2, 0)), y = 0, w = 0, r.mode = fp;
        case fp:
          if (r.flags & 1024) {
            for (; w < 16; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            r.length = y, r.head && (r.head.extra_len = y), r.flags & 512 && r.wrap & 4 && ($[0] = y & 255, $[1] = y >>> 8 & 255, r.check = Ar(r.check, $, 2, 0)), y = 0, w = 0;
          } else r.head && (r.head.extra = null);
          r.mode = dp;
        case dp:
          if (r.flags & 1024 && (b = r.length, b > p && (b = p), b && (r.head && (A = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Uint8Array(r.head.extra_len)), r.head.extra.set(
            o.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + b
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            A
          )), r.flags & 512 && r.wrap & 4 && (r.check = Ar(r.check, o, b, a)), p -= b, a += b, r.length -= b), r.length))
            break e;
          r.length = 0, r.mode = pp;
        case pp:
          if (r.flags & 2048) {
            if (p === 0)
              break e;
            b = 0;
            do
              A = o[a + b++], r.head && A && r.length < 65536 && (r.head.name += String.fromCharCode(A));
            while (A && b < p);
            if (r.flags & 512 && r.wrap & 4 && (r.check = Ar(r.check, o, b, a)), p -= b, a += b, A)
              break e;
          } else r.head && (r.head.name = null);
          r.length = 0, r.mode = hp;
        case hp:
          if (r.flags & 4096) {
            if (p === 0)
              break e;
            b = 0;
            do
              A = o[a + b++], r.head && A && r.length < 65536 && (r.head.comment += String.fromCharCode(A));
            while (A && b < p);
            if (r.flags & 512 && r.wrap & 4 && (r.check = Ar(r.check, o, b, a)), p -= b, a += b, A)
              break e;
          } else r.head && (r.head.comment = null);
          r.mode = vp;
        case vp:
          if (r.flags & 512) {
            for (; w < 16; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            if (r.wrap & 4 && y !== (r.check & 65535)) {
              e.msg = "header crc mismatch", r.mode = Je;
              break;
            }
            y = 0, w = 0;
          }
          r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = Xr;
          break;
        case mp:
          for (; w < 32; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          e.adler = r.check = Tp(y), y = 0, w = 0, r.mode = Fs;
        case Fs:
          if (r.havedict === 0)
            return e.next_out = f, e.avail_out = g, e.next_in = a, e.avail_in = p, r.hold = y, r.bits = w, PE;
          e.adler = r.check = 1, r.mode = Xr;
        case Xr:
          if (t === bE || t === zl)
            break e;
        case Xa:
          if (r.last) {
            y >>>= w & 7, w -= w & 7, r.mode = Ka;
            break;
          }
          for (; w < 3; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          switch (r.last = y & 1, y >>>= 1, w -= 1, y & 3) {
            case 0:
              r.mode = gp;
              break;
            case 1:
              if (ME(r), r.mode = Bl, t === zl) {
                y >>>= 2, w -= 2;
                break e;
              }
              break;
            case 2:
              r.mode = wp;
              break;
            case 3:
              e.msg = "invalid block type", r.mode = Je;
          }
          y >>>= 2, w -= 2;
          break;
        case gp:
          for (y >>>= w & 7, w -= w & 7; w < 32; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if ((y & 65535) !== (y >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", r.mode = Je;
            break;
          }
          if (r.length = y & 65535, y = 0, w = 0, r.mode = Ya, t === zl)
            break e;
        case Ya:
          r.mode = yp;
        case yp:
          if (b = r.length, b) {
            if (b > p && (b = p), b > g && (b = g), b === 0)
              break e;
            s.set(o.subarray(a, a + b), f), p -= b, a += b, g -= b, f += b, r.length -= b;
            break;
          }
          r.mode = Xr;
          break;
        case wp:
          for (; w < 14; ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if (r.nlen = (y & 31) + 257, y >>>= 5, w -= 5, r.ndist = (y & 31) + 1, y >>>= 5, w -= 5, r.ncode = (y & 15) + 4, y >>>= 4, w -= 4, r.nlen > 286 || r.ndist > 30) {
            e.msg = "too many length or distance symbols", r.mode = Je;
            break;
          }
          r.have = 0, r.mode = _p;
        case _p:
          for (; r.have < r.ncode; ) {
            for (; w < 3; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            r.lens[Z[r.have++]] = y & 7, y >>>= 3, w -= 3;
          }
          for (; r.have < 19; )
            r.lens[Z[r.have++]] = 0;
          if (r.lencode = r.lendyn, r.lenbits = 7, F = { bits: r.lenbits }, I = Do(EE, r.lens, 0, 19, r.lencode, 0, r.work, F), r.lenbits = F.bits, I) {
            e.msg = "invalid code lengths set", r.mode = Je;
            break;
          }
          r.have = 0, r.mode = xp;
        case xp:
          for (; r.have < r.nlen + r.ndist; ) {
            for (; Q = r.lencode[y & (1 << r.lenbits) - 1], x = Q >>> 24, k = Q >>> 16 & 255, E = Q & 65535, !(x <= w); ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            if (E < 16)
              y >>>= x, w -= x, r.lens[r.have++] = E;
            else {
              if (E === 16) {
                for (S = x + 2; w < S; ) {
                  if (p === 0)
                    break e;
                  p--, y += o[a++] << w, w += 8;
                }
                if (y >>>= x, w -= x, r.have === 0) {
                  e.msg = "invalid bit length repeat", r.mode = Je;
                  break;
                }
                A = r.lens[r.have - 1], b = 3 + (y & 3), y >>>= 2, w -= 2;
              } else if (E === 17) {
                for (S = x + 3; w < S; ) {
                  if (p === 0)
                    break e;
                  p--, y += o[a++] << w, w += 8;
                }
                y >>>= x, w -= x, A = 0, b = 3 + (y & 7), y >>>= 3, w -= 3;
              } else {
                for (S = x + 7; w < S; ) {
                  if (p === 0)
                    break e;
                  p--, y += o[a++] << w, w += 8;
                }
                y >>>= x, w -= x, A = 0, b = 11 + (y & 127), y >>>= 7, w -= 7;
              }
              if (r.have + b > r.nlen + r.ndist) {
                e.msg = "invalid bit length repeat", r.mode = Je;
                break;
              }
              for (; b--; )
                r.lens[r.have++] = A;
            }
          }
          if (r.mode === Je)
            break;
          if (r.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", r.mode = Je;
            break;
          }
          if (r.lenbits = 9, F = { bits: r.lenbits }, I = Do(W0, r.lens, 0, r.nlen, r.lencode, 0, r.work, F), r.lenbits = F.bits, I) {
            e.msg = "invalid literal/lengths set", r.mode = Je;
            break;
          }
          if (r.distbits = 6, r.distcode = r.distdyn, F = { bits: r.distbits }, I = Do(H0, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, F), r.distbits = F.bits, I) {
            e.msg = "invalid distances set", r.mode = Je;
            break;
          }
          if (r.mode = Bl, t === zl)
            break e;
        case Bl:
          r.mode = Ul;
        case Ul:
          if (p >= 6 && g >= 258) {
            e.next_out = f, e.avail_out = g, e.next_in = a, e.avail_in = p, r.hold = y, r.bits = w, yE(e, C), f = e.next_out, s = e.output, g = e.avail_out, a = e.next_in, o = e.input, p = e.avail_in, y = r.hold, w = r.bits, r.mode === Xr && (r.back = -1);
            break;
          }
          for (r.back = 0; Q = r.lencode[y & (1 << r.lenbits) - 1], x = Q >>> 24, k = Q >>> 16 & 255, E = Q & 65535, !(x <= w); ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if (k && !(k & 240)) {
            for (P = x, B = k, U = E; Q = r.lencode[U + ((y & (1 << P + B) - 1) >> P)], x = Q >>> 24, k = Q >>> 16 & 255, E = Q & 65535, !(P + x <= w); ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            y >>>= P, w -= P, r.back += P;
          }
          if (y >>>= x, w -= x, r.back += x, r.length = E, k === 0) {
            r.mode = Cp;
            break;
          }
          if (k & 32) {
            r.back = -1, r.mode = Xr;
            break;
          }
          if (k & 64) {
            e.msg = "invalid literal/length code", r.mode = Je;
            break;
          }
          r.extra = k & 15, r.mode = kp;
        case kp:
          if (r.extra) {
            for (S = r.extra; w < S; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            r.length += y & (1 << r.extra) - 1, y >>>= r.extra, w -= r.extra, r.back += r.extra;
          }
          r.was = r.length, r.mode = Sp;
        case Sp:
          for (; Q = r.distcode[y & (1 << r.distbits) - 1], x = Q >>> 24, k = Q >>> 16 & 255, E = Q & 65535, !(x <= w); ) {
            if (p === 0)
              break e;
            p--, y += o[a++] << w, w += 8;
          }
          if (!(k & 240)) {
            for (P = x, B = k, U = E; Q = r.distcode[U + ((y & (1 << P + B) - 1) >> P)], x = Q >>> 24, k = Q >>> 16 & 255, E = Q & 65535, !(P + x <= w); ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            y >>>= P, w -= P, r.back += P;
          }
          if (y >>>= x, w -= x, r.back += x, k & 64) {
            e.msg = "invalid distance code", r.mode = Je;
            break;
          }
          r.offset = E, r.extra = k & 15, r.mode = Ep;
        case Ep:
          if (r.extra) {
            for (S = r.extra; w < S; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            r.offset += y & (1 << r.extra) - 1, y >>>= r.extra, w -= r.extra, r.back += r.extra;
          }
          if (r.offset > r.dmax) {
            e.msg = "invalid distance too far back", r.mode = Je;
            break;
          }
          r.mode = bp;
        case bp:
          if (g === 0)
            break e;
          if (b = C - g, r.offset > b) {
            if (b = r.offset - b, b > r.whave && r.sane) {
              e.msg = "invalid distance too far back", r.mode = Je;
              break;
            }
            b > r.wnext ? (b -= r.wnext, j = r.wsize - b) : j = r.wnext - b, b > r.length && (b = r.length), z = r.window;
          } else
            z = s, j = f - r.offset, b = r.length;
          b > g && (b = g), g -= b, r.length -= b;
          do
            s[f++] = z[j++];
          while (--b);
          r.length === 0 && (r.mode = Ul);
          break;
        case Cp:
          if (g === 0)
            break e;
          s[f++] = r.length, g--, r.mode = Ul;
          break;
        case Ka:
          if (r.wrap) {
            for (; w < 32; ) {
              if (p === 0)
                break e;
              p--, y |= o[a++] << w, w += 8;
            }
            if (C -= g, e.total_out += C, r.total += C, r.wrap & 4 && C && (e.adler = r.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            r.flags ? Ar(r.check, s, C, f - C) : ec(r.check, s, C, f - C)), C = g, r.wrap & 4 && (r.flags ? y : Tp(y)) !== r.check) {
              e.msg = "incorrect data check", r.mode = Je;
              break;
            }
            y = 0, w = 0;
          }
          r.mode = Pp;
        case Pp:
          if (r.wrap && r.flags) {
            for (; w < 32; ) {
              if (p === 0)
                break e;
              p--, y += o[a++] << w, w += 8;
            }
            if (r.wrap & 4 && y !== (r.total & 4294967295)) {
              e.msg = "incorrect length check", r.mode = Je;
              break;
            }
            y = 0, w = 0;
          }
          r.mode = Rp;
        case Rp:
          I = CE;
          break e;
        case Je:
          I = G0;
          break e;
        case Y0:
          return X0;
        case K0:
        default:
          return hr;
      }
  return e.next_out = f, e.avail_out = g, e.next_in = a, e.avail_in = p, r.hold = y, r.bits = w, (r.wsize || C !== e.avail_out && r.mode < Je && (r.mode < Ka || t !== lp)) && em(e, e.output, e.next_out, C - e.avail_out), D -= e.avail_in, C -= e.avail_out, e.total_in += D, e.total_out += C, r.total += C, r.wrap & 4 && C && (e.adler = r.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  r.flags ? Ar(r.check, s, C, e.next_out - C) : ec(r.check, s, C, e.next_out - C)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === Xr ? 128 : 0) + (r.mode === Bl || r.mode === Ya ? 256 : 0), (D === 0 && C === 0 || t === lp) && I === Jn && (I = RE), I;
}, IE = (e) => {
  if (ni(e))
    return hr;
  let t = e.state;
  return t.window && (t.window = null), e.state = null, Jn;
}, jE = (e, t) => {
  if (ni(e))
    return hr;
  const r = e.state;
  return r.wrap & 2 ? (r.head = t, t.done = !1, Jn) : hr;
}, NE = (e, t) => {
  const r = t.length;
  let o, s, a;
  return ni(e) || (o = e.state, o.wrap !== 0 && o.mode !== Fs) ? hr : o.mode === Fs && (s = 1, s = ec(s, t, r, 0), s !== o.check) ? G0 : (a = em(e, t, r, r), a ? (o.mode = Y0, X0) : (o.havedict = 1, Jn));
};
var zE = Z0, BE = q0, UE = Q0, VE = $E, WE = J0, HE = OE, GE = IE, XE = jE, YE = NE, KE = "pako inflate (from Nodeca project)", Mr = {
  inflateReset: zE,
  inflateReset2: BE,
  inflateResetKeep: UE,
  inflateInit: VE,
  inflateInit2: WE,
  inflate: HE,
  inflateEnd: GE,
  inflateGetHeader: XE,
  inflateSetDictionary: YE,
  inflateInfo: KE
};
function QE() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var ZE = QE;
const tm = Object.prototype.toString, {
  Z_NO_FLUSH: qE,
  Z_FINISH: Dp,
  Z_OK: Mi,
  Z_STREAM_END: qa,
  Z_NEED_DICT: Ja,
  Z_STREAM_ERROR: JE,
  Z_DATA_ERROR: Fp,
  Z_MEM_ERROR: eb,
  Z_BUF_ERROR: Ap
} = B0, tb = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ""
};
function qs(e) {
  this.options = U0.assign({}, tb, e || {});
  const t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new mE(), this.strm.avail_out = 0;
  let r = Mr.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (r !== Mi)
    throw new Error(tc[r]);
  if (this.header = new ZE(), Mr.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = rc.string2buf(t.dictionary) : tm.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = Mr.inflateSetDictionary(this.strm, t.dictionary), r !== Mi)))
    throw new Error(tc[r]);
}
qs.prototype.push = function(e, t) {
  const r = this.strm, o = this.options.chunkSize, s = this.options.dictionary;
  let a, f, p;
  if (this.ended) return !1;
  for (t === ~~t ? f = t : f = t === !0 ? Dp : qE, tm.call(e) === "[object ArrayBuffer]" ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length; ; ) {
    for (r.avail_out === 0 && (r.output = new Uint8Array(o), r.next_out = 0, r.avail_out = o), a = Mr.inflate(r, f), a === Ja && s && (a = Mr.inflateSetDictionary(r, s), a === Mi ? a = Mr.inflate(r, f) : a === Fp && (a = Ja)); r.avail_in > 0 && a === qa && r.state.wrap & 2 && r.state.flags !== 0 && r.input[r.next_in] !== 0; )
      Mr.inflateReset(r), a = Mr.inflate(r, f);
    switch (a) {
      case JE:
      case Fp:
      case Ja:
      case eb:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (p = r.avail_out, r.next_out && (r.avail_out === 0 || a === qa || f > 0))
      if (this.options.to === "string") {
        let g = rc.utf8border(r.output, r.next_out), y = r.next_out - g, w = rc.buf2string(r.output, g);
        r.next_out = y, r.avail_out = o - y, y && r.output.set(r.output.subarray(g, g + y), 0), this.onData(w);
      } else
        this.onData(r.output.length === r.next_out ? r.output : r.output.subarray(0, r.next_out)), r.avail_out = 0, r.next_out = 0;
    if (!((a === Mi || a === Ap) && p === 0)) {
      if (a === qa)
        return a = Mr.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (r.avail_in === 0) {
        if (f === Dp)
          return a = Mr.inflateEnd(this.strm), this.onEnd(a === Mi ? Ap : a), this.ended = !0, !1;
        break;
      }
    }
  }
  return !0;
};
qs.prototype.onData = function(e) {
  this.chunks.push(e);
};
qs.prototype.onEnd = function(e) {
  e === Mi && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = U0.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function rb(e, t) {
  const r = new qs(t);
  if (r.push(e, !0), r.err) throw r.msg || tc[r.err];
  return r.result;
}
var nb = rb, ib = {
  inflate: nb
};
const { inflate: ob } = ib;
var rm = ob;
function lb(e) {
  const t = e.toLowerCase();
  return t.startsWith("volume") ? "volume" : t.startsWith("mask") ? "mask" : t.startsWith("mesh") ? "mesh" : t.startsWith("image") ? "image" : (console.warn(`imfusion_viewer: unrecognized layer kind "${e}", treating as "volume"`), "volume");
}
function sb(e) {
  try {
    const t = JSON.parse(e || "{}"), r = t && typeof t == "object" ? t.labels : null;
    return r && typeof r == "object" ? r : null;
  } catch {
    return console.warn(`imfusion_viewer: malformed json_extra, ignoring label map: ${e}`), null;
  }
}
function ab(e) {
  const [t = 1, r = 1, o = 1, s = 1] = e;
  return [t, r, o, s];
}
function ub(e) {
  try {
    const t = JSON.parse(e || "{}"), r = t && typeof t == "object" ? t.labelValue : null;
    return typeof r == "number" && Number.isFinite(r) ? r : 1;
  } catch {
    return 1;
  }
}
async function cb() {
  const e = await fetch("./license_token");
  if (!e.ok)
    throw new Error(`Failed to fetch ./license_token: ${e.status} ${e.statusText}`);
  const t = (await e.json()).license_token;
  return typeof t == "string" && t.trim() || null;
}
const fb = 1500;
let go = null, yn = null;
function nm() {
  return go || (yn && performance.now() - yn.at < fb ? Promise.resolve(yn.result) : (go = db().finally(() => {
    go = null;
  }), go));
}
async function db() {
  const e = await fetch("./cases");
  if (!e.ok)
    throw new Error(`Failed to fetch ./cases: ${e.status} ${e.statusText}`);
  const t = await e.text();
  if (yn && yn.text === t)
    return yn.at = performance.now(), yn.result;
  const r = pb(JSON.parse(t));
  return yn = { text: t, result: r, at: performance.now() }, r;
}
function pb(e) {
  const t = {};
  for (const [r, o] of Object.entries(e)) {
    t[r] = {};
    for (const [s, a] of Object.entries(o))
      t[r][s] = {
        steps: [...a.steps].sort((f, p) => f - p),
        layers: a.layers.map(
          (f) => ({
            ...f,
            kind: lb(f.kind),
            default_color: ab(f.default_color),
            steps: [...f.steps ?? []].sort((p, g) => p - g),
            maskLabels: sb(f.json_extra),
            legacyLabelValue: ub(f.json_extra)
          })
        ).sort((f, p) => f.order - p.order)
      };
  }
  return t;
}
class As extends Error {
  constructor(r, o) {
    super(r);
    Ye(this, "status");
    this.name = "LayerFetchError", this.status = o;
  }
}
async function $p(e, t) {
  const r = new URLSearchParams({
    run: e.run,
    case: e.case,
    layer: e.layer,
    step: String(e.step)
  });
  e.cropAxis !== void 0 && e.cropPosition !== void 0 && (r.set("crop_axis", e.cropAxis), r.set("crop_position", String(e.cropPosition)), r.set("compressed", String(e.compressed)));
  const o = await fetch(`./layer_data?${r.toString()}`, { signal: t });
  if (!o.ok)
    throw new As(
      `Failed to fetch layer_data for "${e.layer}" @ step ${e.step}: ${o.status} ${o.statusText}`,
      o.status
    );
  const s = await o.arrayBuffer();
  if (!e.compressed) return s;
  const a = rm(new Uint8Array(s));
  return a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
}
class im extends Error {
  constructor(t) {
    super(t), this.name = "GridMismatchError";
  }
}
async function hb(e, t) {
  const r = new URLSearchParams({
    case: e.case,
    step: String(e.step),
    pairs: e.pairs.map((f) => `${f.run}:${f.layer}`).join(","),
    labels: e.pairs.map((f) => f.labels.join(",")).join(";"),
    compressed: String(e.compressed)
  }), o = await fetch(`./combined_layer_data?${r.toString()}`, { signal: t });
  if (!o.ok) {
    const f = await o.text().catch(() => o.statusText);
    throw o.status === 409 ? new im(f) : new As(`Failed to fetch combined_layer_data @ step ${e.step}: ${f}`, o.status);
  }
  const s = await o.arrayBuffer(), a = rm(new Uint8Array(s));
  return a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
}
async function vb() {
  const e = new URLSearchParams(window.location.search).get("experiment"), t = new URLSearchParams();
  e && t.set("experiment", e);
  const r = t.toString() ? `?${t.toString()}` : "", o = await fetch(`./../scalars/tags${r}`);
  if (!o.ok)
    throw new Error(`Failed to fetch scalar tags: ${o.status} ${o.statusText}`);
  const s = await o.json(), a = {};
  for (const [f, p] of Object.entries(s)) a[f] = Object.keys(p);
  return a;
}
async function mb(e, t) {
  const r = new URLSearchParams(window.location.search).get("experiment"), o = new URLSearchParams({ run: e, tag: t });
  r && o.set("experiment", r);
  const s = await fetch(`./../scalars/scalars?${o.toString()}`);
  if (!s.ok)
    throw new Error(`Failed to fetch scalars for run "${e}" tag "${t}": ${s.status} ${s.statusText}`);
  return (await s.json()).map(([f, p, g]) => ({ wallTime: f, step: p, value: g }));
}
const Qo = [
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
function gb(e) {
  const t = [...new Set(e)].sort(), r = /* @__PURE__ */ new Map();
  return t.forEach((o, s) => {
    r.set(o, Qo[s % Qo.length]);
  }), r;
}
const yb = 3e3;
function wb(e) {
  const t = e.trim();
  return t ? new RegExp(t, "i") : null;
}
function _b({
  selectedCaseByRun: e,
  onSelect: t,
  onCasesUpdate: r,
  checkedRuns: o,
  onToggleRun: s,
  onToggleAllRuns: a,
  runColors: f,
  activeControlsRuns: p,
  registerControlsContainer: g
}) {
  const [y, w] = R.useState(null), [D, C] = R.useState(null), [b, j] = R.useState(""), [z, Q] = R.useState(null), [x, k] = R.useState(null), E = R.useRef(r);
  R.useEffect(() => {
    E.current = r;
  }), R.useEffect(() => {
    let I = !1;
    const $ = async () => {
      var S;
      try {
        const Z = await nm();
        if (I) return;
        w(Z), C(null), (S = E.current) == null || S.call(E, Z);
      } catch (Z) {
        I || C(Z instanceof Error ? Z.message : "Failed to load cases.");
      }
    };
    $();
    const F = window.setInterval($, yb);
    return () => {
      I = !0, window.clearInterval(F);
    };
  }, []);
  const P = R.useMemo(() => y ? Object.keys(y).sort() : [], [y]), B = R.useMemo(
    () => z ? P.filter((I) => z.test(I)) : P,
    [P, z]
  );
  if (!y) return /* @__PURE__ */ L.jsx("div", { style: D ? Op : eu, children: D ?? "Loading cases…" });
  if (P.length === 0)
    return /* @__PURE__ */ L.jsx("div", { style: eu, children: "No runs with imfusion_viewer data yet." });
  const U = (I) => {
    j(I);
    try {
      Q(wb(I)), k(null);
    } catch ($) {
      k($ instanceof Error ? $.message : "Invalid regex");
    }
  }, A = new Set(B);
  return /* @__PURE__ */ L.jsxs("div", { style: xb, children: [
    D && /* @__PURE__ */ L.jsx("div", { style: Op, children: D }),
    /* @__PURE__ */ L.jsxs("div", { style: kb, children: [
      /* @__PURE__ */ L.jsx(
        "input",
        {
          type: "text",
          value: b,
          onChange: (I) => U(I.target.value),
          placeholder: "Write a regex to filter runs",
          "aria-label": "Write a regex to filter runs",
          "aria-invalid": x !== null,
          style: x ? Sb : om
        }
      ),
      x && /* @__PURE__ */ L.jsx("div", { style: Eb, children: "Invalid regex, showing the last valid filter." })
    ] }),
    /* @__PURE__ */ L.jsxs("div", { style: bb, children: [
      B.length === 0 && /* @__PURE__ */ L.jsx("div", { style: eu, children: "No runs match this filter." }),
      P.map((I) => {
        const $ = Object.keys(y[I]).sort(), F = $.length === 1, S = F ? $[0] : void 0, Z = f.get(I) ?? Qo[0], ue = o.has(I);
        return /* @__PURE__ */ L.jsxs(
          "div",
          {
            style: A.has(I) ? I === B[0] ? Cb : lm : Ip,
            children: [
              /* @__PURE__ */ L.jsxs("div", { style: Pb, children: [
                /* @__PURE__ */ L.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: ue,
                    onChange: () => {
                      F && S && !ue ? t({ run: I, case: S }, y) : s(I);
                    },
                    style: { accentColor: Z },
                    title: F ? `View "${I}" and include it in the Metrics comparison` : `Include "${I}" in the Metrics comparison`
                  }
                ),
                /* @__PURE__ */ L.jsx("span", { style: { ...Rb, background: Z }, title: `"${I}"'s color` }),
                /* @__PURE__ */ L.jsx(
                  "span",
                  {
                    style: F ? Tb : sm,
                    onClick: F && S ? () => t({ run: I, case: S }, y) : void 0,
                    title: F ? `View "${I}" in the 3D viewer` : void 0,
                    children: I
                  }
                ),
                F && /* @__PURE__ */ L.jsxs("span", { style: Mp, children: [
                  y[I][S].steps.length,
                  " step",
                  y[I][S].steps.length === 1 ? "" : "s"
                ] })
              ] }),
              !F && /* @__PURE__ */ L.jsx("div", { style: Lb, children: $.map((Pe) => {
                const Se = y[I][Pe], Te = e.get(I) === Pe;
                return /* @__PURE__ */ L.jsxs(
                  "button",
                  {
                    type: "button",
                    style: Te ? Fb : am,
                    onClick: () => t({ run: I, case: Pe }, y),
                    children: [
                      /* @__PURE__ */ L.jsx("span", { style: Ab, children: Pe }),
                      /* @__PURE__ */ L.jsxs("span", { style: Mp, children: [
                        Se.steps.length,
                        " step",
                        Se.steps.length === 1 ? "" : "s"
                      ] })
                    ]
                  },
                  Pe
                );
              }) }),
              /* @__PURE__ */ L.jsx(
                "div",
                {
                  style: p.has(I) ? { ...Db, borderLeftColor: Z } : Ip,
                  children: /* @__PURE__ */ L.jsx("div", { ref: g(I) })
                }
              )
            ]
          },
          I
        );
      })
    ] }),
    /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        style: $b,
        disabled: B.length === 0,
        onClick: () => a(B),
        children: "Toggle All Runs"
      }
    )
  ] });
}
const xb = {
  display: "flex",
  flexDirection: "column",
  gap: 10
}, kb = {
  display: "flex",
  flexDirection: "column",
  gap: 3
}, om = {
  width: "100%",
  boxSizing: "border-box",
  font: "inherit",
  padding: "6px 8px",
  borderRadius: 5,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit"
}, Sb = {
  ...om,
  border: "1px solid var(--tb-error)"
}, Eb = {
  fontSize: 12,
  color: "var(--tb-error)"
}, bb = {
  display: "flex",
  flexDirection: "column"
}, lm = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  paddingTop: 10,
  borderTop: "1px solid var(--tb-border)"
}, Cb = {
  ...lm,
  paddingTop: 0,
  borderTop: "none"
}, Pb = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "2px 4px",
  borderRadius: 5,
  border: "1px solid transparent"
}, Rb = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  flexShrink: 0,
  display: "inline-block"
}, sm = {
  flex: 1,
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Tb = {
  ...sm,
  cursor: "pointer"
}, Lb = {
  display: "flex",
  flexDirection: "column",
  gap: 3
}, Db = {
  marginLeft: 4,
  paddingLeft: 10,
  borderLeft: "2px solid transparent"
}, am = {
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
}, Fb = {
  ...am,
  border: "1px solid var(--tb-accent)",
  background: "var(--tb-accent-soft)"
}, Ab = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, Mp = {
  flexShrink: 0,
  opacity: 0.55
}, $b = {
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
}, eu = {
  padding: "8px 0",
  opacity: 0.55
}, Op = {
  padding: "8px 0",
  color: "var(--tb-error)"
}, Ip = {
  display: "none"
}, Dn = [
  { name: "axial", label: "Axial", get: (e) => e.mainAxialView() },
  { name: "coronal", label: "Coronal", get: (e) => e.mainCoronalView() },
  { name: "sagittal", label: "Sagittal", get: (e) => e.mainSagittalView() },
  { name: "3d", label: "3D", get: (e) => e.main3dView() },
  { name: "2d", label: "2D image", get: (e) => e.main2dView() }
];
function Mb(e) {
  return e === "image" ? ["2d"] : ["axial", "coronal", "sagittal", "3d"];
}
function Ob(e, t) {
  for (const r of Dn)
    try {
      if (t.isAliasOf(r.get(e))) return r.name;
    } catch {
    }
  return null;
}
function tf(e, t) {
  if (t.size === 0) return;
  const r = e.layouter();
  for (const o of Dn) {
    if (!t.has(o.name)) continue;
    const s = o.get(e);
    r.isViewHidden(s) || r.setViewHidden(s, !0);
  }
}
function tu(e, t) {
  const r = Dn.find((a) => t.has(a.name));
  if (!r) return;
  const o = e.layouter(), s = r.get(e);
  o.setViewHidden(s, !1), o.setViewHidden(s, !0), tf(e, t);
}
let Ib = 0;
function jb(e, t) {
  let r = !1, o = null;
  const s = new e.bindings.AlignedBox(), a = [];
  for (const f of Dn)
    try {
      const p = f.get(e.display), g = e.createCustomGlObject(
        {
          render: (y) => {
            r || (o || (o = /* @__PURE__ */ new Map(), queueMicrotask(() => {
              const w = o;
              o = null, w && !r && t(w);
            })), o.set(f.name, y.viewport()));
          },
          bounds: () => s
        },
        `imfViewerLayoutProbe${++Ib}`
      );
      p.addObject(g), a.push({ view: p, probe: g });
    } catch (p) {
      console.warn(`imfusion_viewer: no layout probe for the ${f.label} pane`, p);
    }
  return () => {
    r = !0;
    for (const { view: f, probe: p } of a)
      try {
        f.removeObject(p), p.delete();
      } catch {
      }
    try {
      s.delete();
    } catch {
    }
  };
}
const jp = 0.9;
function Nb(e, t, r) {
  if (t.size < 2 || r.width <= 0 || r.height <= 0) return null;
  for (const [o, s] of e)
    if (s.width >= jp * r.width && s.height >= jp * r.height)
      return t.has(o) ? o : null;
  return null;
}
let nc = 0;
function zb(e) {
  nc++;
  try {
    e();
  } finally {
    nc--;
  }
}
function Bb() {
  return nc > 0;
}
const Ub = 250, Vb = /^combined__.+?__s(\d+)__.+$/, Wb = /^(.+?)__.+?__(.+)__s(\d+)(__crop_[\w-]+?)?(\.[\w.]+)?$/;
function Np(e) {
  const t = Vb.exec(e);
  if (t) return `combined masks · step ${t[1]}`;
  const r = Wb.exec(e);
  return r ? `${r[2]} · ${r[1]} · step ${r[3]}${r[4] ? " (3D cross-section)" : ""}` : null;
}
function ru(e) {
  return Np(e) ?? e.replace(/(['"])([^'"]+)\1/g, (t, r, o) => {
    const s = Np(o);
    return s ? `${r}${s}${r}` : t;
  });
}
function um(e, t) {
  const r = [], o = e.items();
  t.push(o);
  for (let s = 0; s < o.size(); s++) {
    const a = o.get(s);
    if (a) {
      if (t.push(a), a.isSeparator()) {
        const f = a.getSeparator();
        t.push(f), r.push({ kind: "separator", title: ru(f.title()), description: f.description() });
      } else if (a.isSubmenu()) {
        const f = a.getSubmenu();
        t.push(f), r.push({ kind: "submenu", title: ru(f.title()), description: f.description(), entries: um(f, t) });
      } else if (a.isAction()) {
        const f = a.getAction();
        t.push(f);
        const p = f.type();
        r.push({
          kind: "action",
          title: ru(f.title()),
          description: f.description(),
          mark: p === "checkable" ? "check" : p === "radio" ? "radio" : null,
          checked: f.isChecked(),
          run: () => f.activationCallback()
        });
      }
    }
  }
  return r;
}
function zp(e) {
  var t;
  for (const r of [...e].reverse())
    try {
      (t = r.isDeleted) != null && t.call(r) || r.delete();
    } catch {
    }
}
function Hb(e, t) {
  const r = [], o = e.display, s = [
    () => o.mainAxialView(),
    () => o.mainCoronalView(),
    () => o.mainSagittalView(),
    () => o.main3dView(),
    () => o.main2dView(),
    () => o.viewGroup()
  ];
  for (const a of s)
    try {
      const f = a();
      typeof (f == null ? void 0 : f.onVisibleDataChanged) == "function" && r.push(f.onVisibleDataChanged(t));
    } catch {
    }
  try {
    r.push(e.dataModel.onDataAboutToBeRemoved(t));
  } catch {
  }
  return r;
}
function Gb(e) {
  const t = (s) => {
    s.preventDefault(), s.stopPropagation();
  }, r = (s) => {
    s.pointerId === e && (t(s), window.removeEventListener("pointerup", r, !0), window.removeEventListener("pointercancel", r, !0), setTimeout(o, 0));
  }, o = () => {
    window.removeEventListener("pointerup", r, !0), window.removeEventListener("pointercancel", r, !0), window.removeEventListener("click", t, !0), window.removeEventListener("auxclick", t, !0), window.removeEventListener("pointerdown", o, !0);
  };
  window.addEventListener("pointerup", r, !0), window.addEventListener("pointercancel", r, !0), window.addEventListener("click", t, !0), window.addEventListener("auxclick", t, !0), window.addEventListener("pointerdown", o, !0);
}
const Bp = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.closest) != null && t.call(e, "[data-imf-context-menu]"));
}, ic = /* @__PURE__ */ new Set();
function Up() {
  for (const e of [...ic]) e();
}
let Xb = 0;
function Yb() {
  const e = Tr(), [t, r] = R.useState(null), o = R.useRef(null), s = R.useRef(!1), a = R.useCallback(() => {
    if (s.current) return;
    const p = o.current;
    if (p) {
      o.current = null;
      for (const g of p.offs)
        try {
          g();
        } catch {
        }
      zp(p.handles), r(null);
    }
  }, []);
  if ($S((p, g) => {
    g.preventDefault(), a();
    const y = [p];
    let w;
    try {
      w = um(p, y);
    } catch (j) {
      throw zp(y), j;
    }
    const { clientX: D, clientY: C } = g, b = { id: ++Xb, x: D, y: C, entries: w, handles: y, offs: [] };
    o.current = b, b.offs = Hb(e, () => queueMicrotask(() => o.current === b && a())), r(b);
  }), R.useEffect(() => (ic.add(a), () => {
    ic.delete(a), a();
  }), [a]), R.useEffect(() => {
    if (!t) return;
    const p = (w) => {
      Bp(w.target) || (a(), !(w.button === 2 || w.ctrlKey) && (w.preventDefault(), w.stopPropagation(), Gb(w.pointerId)));
    }, g = (w) => !Bp(w.target) && a(), y = (w) => w.key === "Escape" && a();
    return window.addEventListener("pointerdown", p, !0), window.addEventListener("wheel", g, { capture: !0, passive: !0 }), window.addEventListener("keydown", y), window.addEventListener("blur", a), window.addEventListener("resize", a), () => {
      window.removeEventListener("pointerdown", p, !0), window.removeEventListener("wheel", g, !0), window.removeEventListener("keydown", y), window.removeEventListener("blur", a), window.removeEventListener("resize", a);
    };
  }, [t, a]), !t) return null;
  const f = (p) => {
    s.current = !0;
    try {
      zb(p), e.render();
    } finally {
      s.current = !1, a();
    }
  };
  return /* @__PURE__ */ L.jsx(fm, { entries: t.entries, x: t.x, y: t.y, autoFocus: !0, onActivate: f, onClose: a }, t.id);
}
const cm = (e) => e.kind !== "separator";
function Kb(e) {
  const t = e.findIndex(cm);
  return t < 0 ? null : t;
}
function fm({ entries: e, x: t, y: r, flipX: o, autoFocus: s, initialActive: a = null, onActivate: f, onClose: p, onExit: g }) {
  const y = R.useRef(null), w = R.useRef([]), D = R.useRef(void 0), C = R.useId(), [b, j] = R.useState({ left: t, top: r }), [z, Q] = R.useState(a), [x, k] = R.useState(null);
  R.useLayoutEffect(() => {
    const F = y.current;
    if (!F) return;
    const S = F.getBoundingClientRect();
    let Z = t;
    Z + S.width > window.innerWidth - 4 && (Z = o !== void 0 ? o - S.width + 2 : window.innerWidth - S.width - 4), j({
      left: Math.max(0, Z),
      top: Math.max(0, Math.min(r, window.innerHeight - S.height - 4))
    });
  }, [t, r, o]), R.useEffect(() => {
    var F;
    s && ((F = y.current) == null || F.focus({ preventScroll: !0 }));
  }, [s]), R.useEffect(() => () => clearTimeout(D.current), []);
  const E = (F, S) => {
    clearTimeout(D.current);
    const Z = w.current[F];
    if (!Z) return;
    const ue = Z.getBoundingClientRect();
    Q(F), k({ index: F, x: ue.right - 2, y: ue.top - 4, flipX: ue.left, focus: S });
  }, P = () => {
    clearTimeout(D.current);
    const F = y.current;
    F && document.activeElement !== F && F.contains(document.activeElement) && F.focus({ preventScroll: !0 }), k(null);
  }, B = (F) => {
    clearTimeout(D.current), D.current = setTimeout(F, Ub);
  }, U = e.flatMap((F, S) => cm(F) ? [S] : []), A = (F) => {
    var S;
    F !== void 0 && (Q(F), x && x.index !== F && P(), (S = w.current[F]) == null || S.scrollIntoView({ block: "nearest" }));
  }, I = (F) => {
    const S = z === null ? -1 : U.indexOf(z), Z = z === null ? void 0 : e[z];
    switch (F.key) {
      case "ArrowDown":
        A(U[(S + 1) % U.length]);
        break;
      case "ArrowUp":
        A(U[S <= 0 ? U.length - 1 : S - 1]);
        break;
      case "Home":
        A(U[0]);
        break;
      case "End":
        A(U[U.length - 1]);
        break;
      case "ArrowRight":
      case "Enter":
      case " ":
        (Z == null ? void 0 : Z.kind) === "submenu" && z !== null ? E(z, !0) : (Z == null ? void 0 : Z.kind) === "action" && F.key !== "ArrowRight" && f(Z.run);
        break;
      case "ArrowLeft":
        if (!g) return;
        g();
        break;
      case "Escape":
        g ? g() : p();
        break;
      case "Tab":
        p();
        break;
      default:
        return;
    }
    F.preventDefault(), F.stopPropagation();
  }, $ = (F) => `${C}-${F}`;
  return /* @__PURE__ */ L.jsx(
    "div",
    {
      ref: y,
      "data-imf-context-menu": !0,
      role: "menu",
      tabIndex: -1,
      "aria-activedescendant": z !== null ? $(z) : void 0,
      style: { ...Qb, left: b.left, top: b.top },
      onContextMenu: (F) => F.preventDefault(),
      onKeyDown: I,
      onClick: (F) => F.stopPropagation(),
      children: e.map((F, S) => {
        if (F.kind === "separator")
          return F.title ? /* @__PURE__ */ L.jsx("div", { role: "separator", "aria-label": F.title, title: F.description || void 0, style: S === 0 ? Xp : { ...Xp, ...Jb }, children: F.title }, S) : /* @__PURE__ */ L.jsx("div", { role: "separator", style: qb }, S);
        const Z = z === S || (x == null ? void 0 : x.index) === S;
        if (F.kind === "submenu") {
          const Pe = (x == null ? void 0 : x.index) === S ? x : null;
          return /* @__PURE__ */ L.jsxs(
            "div",
            {
              id: $(S),
              ref: (Se) => {
                w.current[S] = Se;
              },
              role: "menuitem",
              "aria-haspopup": "menu",
              "aria-expanded": !!Pe,
              title: F.description || void 0,
              style: { ...Vp, ...Z ? Wp : null },
              onPointerEnter: () => {
                Q(S), (x == null ? void 0 : x.index) === S ? clearTimeout(D.current) : x ? B(() => E(S, !1)) : E(S, !1);
              },
              onClick: () => Pe ? P() : E(S, !1),
              children: [
                /* @__PURE__ */ L.jsx("span", { style: Hp }),
                /* @__PURE__ */ L.jsx("span", { style: Gp, children: F.title }),
                /* @__PURE__ */ L.jsx("span", { style: Zb, children: "›" }),
                Pe && /* @__PURE__ */ L.jsx(
                  fm,
                  {
                    entries: F.entries,
                    x: Pe.x,
                    y: Pe.y,
                    flipX: Pe.flipX,
                    autoFocus: Pe.focus,
                    initialActive: Pe.focus ? Kb(F.entries) : null,
                    onActivate: f,
                    onClose: p,
                    onExit: P
                  },
                  `${S}-${Pe.focus}`
                )
              ]
            },
            S
          );
        }
        const ue = F.mark === "check" ? "menuitemcheckbox" : F.mark === "radio" ? "menuitemradio" : "menuitem";
        return /* @__PURE__ */ L.jsxs(
          "div",
          {
            id: $(S),
            ref: (Pe) => {
              w.current[S] = Pe;
            },
            role: ue,
            "aria-checked": F.mark ? F.checked : void 0,
            title: F.description || void 0,
            style: { ...Vp, ...Z ? Wp : null },
            onPointerEnter: () => {
              Q(S), x && B(P);
            },
            onPointerLeave: () => Q((Pe) => Pe === S ? null : Pe),
            onClick: () => f(F.run),
            children: [
              /* @__PURE__ */ L.jsx("span", { style: Hp, children: F.checked ? F.mark === "radio" ? "●" : "✓" : "" }),
              /* @__PURE__ */ L.jsx("span", { style: Gp, children: F.title })
            ]
          },
          S
        );
      })
    }
  );
}
const Qb = {
  position: "fixed",
  zIndex: 1e3,
  minWidth: 180,
  maxHeight: "90vh",
  overflowY: "auto",
  padding: "4px 0",
  background: "var(--tb-sidebar-bg)",
  color: "var(--tb-text)",
  border: "1px solid var(--tb-border)",
  borderRadius: 4,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
  fontSize: 13,
  userSelect: "none",
  outline: "none"
}, Vp = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "4px 10px 4px 4px",
  cursor: "pointer",
  whiteSpace: "nowrap"
}, Wp = { background: "var(--tb-accent-soft)" }, Hp = { width: 18, textAlign: "center", flexShrink: 0 }, Gp = { flex: 1 }, Zb = { marginLeft: 16, opacity: 0.7 }, qb = { height: 1, margin: "4px 0", background: "var(--tb-border)" }, Xp = {
  padding: "4px 10px 2px 22px",
  fontSize: 11,
  fontWeight: 600,
  opacity: 0.65,
  whiteSpace: "nowrap",
  cursor: "default"
}, Jb = { marginTop: 4, borderTop: "1px solid var(--tb-border)" }, Yp = [
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
function Kp(e) {
  const t = Yp.length, r = (e % t + t) % t;
  return Yp[r];
}
const eC = 3e3, tC = 3, rC = ["volume", "image", "mask", "mesh"], nC = 250, Qp = 0.5, iC = !1, oC = /\.nii(\.gz)?$/i, dm = /* @__PURE__ */ new Set(["IMAGE", "VOLUME", "IMAGESET", "VOLUMESET"]);
function pn(e) {
  return e.replace(/[^a-zA-Z0-9_.-]/g, "_");
}
function sr(e, t) {
  for (const r of t)
    try {
      e.dataModel.remove(r);
    } catch {
    }
}
function nu(e) {
  return (e == null ? void 0 : e.name) === "AbortError";
}
function lC(e) {
  if (e.byteLength < 348) return;
  const t = new DataView(e);
  if (t.getInt32(0, !0) !== 348 && t.getInt32(0, !1) !== 348) return;
  const r = new Uint8Array(e);
  r[344] !== 110 || r[346] !== 49 || r[347] !== 0 || r[123] & 7 || (r[123] |= 2);
}
async function iu(e, t, r) {
  /\.nii$/i.test(r) && lC(t);
  const o = await e.loadBuffer(t, r);
  return o.length > 1 && sr(e, o.slice(1)), o[0] ?? null;
}
function Zp(e, t) {
  const r = t.kind();
  return (e.kind === "mesh" ? r === "SURFACE" : dm.has(r)) ? null : `Layer "${e.display_name}" is a ${e.kind} layer but its file loaded as ${r}.`;
}
function qp(e, t) {
  return JSON.stringify(e) === JSON.stringify(t);
}
function et(e, t) {
  return `${e}::${t}`;
}
function Vl(e) {
  const t = e.indexOf("::");
  return [e.slice(0, t), e.slice(t + 2)];
}
function Jp(e) {
  return (e == null ? void 0 : e.cropAxis) === void 0 || (e == null ? void 0 : e.cropPosition) === void 0 ? null : `${e.cropAxis}_${Math.round(e.cropPosition * 1e3)}`;
}
function eh(e, t) {
  const r = e.state();
  r.alpha !== t && (r.alpha = t, e.setState(r));
}
const th = /* @__PURE__ */ new Set();
function sC(e) {
  th.has(e) || (th.add(e), console.warn(e));
}
function rh(e) {
  const t = e.maskLabels;
  if (t && Object.keys(t).length > 0) {
    const o = /* @__PURE__ */ new Map();
    for (const [s, a] of Object.entries(t)) {
      const f = Number(s);
      if (!Number.isInteger(f) || f === 0) {
        sC(`imfusion_viewer: skipping mask label key "${s}" (name "${a}")`);
        continue;
      }
      o.has(f) || o.set(f, a);
    }
    return [...o].sort((s, a) => s[0] - a[0]);
  }
  const r = e.legacyLabelValue;
  return Number.isInteger(r) && r !== 0 ? [[r, e.display_name]] : [];
}
function nh(e) {
  return !!e.maskLabels && Object.keys(e.maskLabels).length > 0;
}
function ou(e) {
  return [e[0], e[1], e[2]];
}
function ih([e, t, r]) {
  const o = (s) => Math.round(Math.max(0, Math.min(1, s)) * 255).toString(16).padStart(2, "0");
  return `#${o(e)}${o(t)}${o(r)}`;
}
function oh(e) {
  const t = Number.parseInt(e.slice(1), 16);
  return [(t >> 16 & 255) / 255, (t >> 8 & 255) / 255, (t & 255) / 255];
}
function aC([e, t, r]) {
  const o = Math.max(e, t, r), s = Math.min(e, t, r), a = (o + s) / 2;
  if (o === s) return [0, 0, a];
  const f = o - s, p = a > 0.5 ? f / (2 - o - s) : f / (o + s);
  let g;
  return o === e ? g = (t - r) / f % 6 : o === t ? g = (r - e) / f + 2 : g = (e - t) / f + 4, g /= 6, g < 0 && (g += 1), [g, p, a];
}
function uC([e, t, r]) {
  if (t === 0) return [r, r, r];
  const o = r < 0.5 ? r * (1 + t) : r + t - r * t, s = 2 * r - o, a = (f) => {
    let p = f;
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? s + (o - s) * 6 * p : p < 1 / 2 ? o : p < 2 / 3 ? s + (o - s) * (2 / 3 - p) * 6 : s;
  };
  return [a(e + 1 / 3), a(e), a(e - 1 / 3)];
}
const cC = 0.5;
function Wl(e) {
  const [t, r, o] = aC(e);
  return uC([t, r * cC, o]);
}
function lh(e) {
  const t = e.get();
  if (!t) return null;
  try {
    return { dims: [...t.dimensions()], spacing: [...t.spacing()], range: [...e.minmaxIntensityOriginal()] };
  } finally {
    t.delete();
  }
}
function fC(e, t) {
  const r = [];
  e.dims.some((s, a) => s !== t.dims[a]) && r.push(`size ${e.dims.join("×")} vs ${t.dims.join("×")}`), e.spacing.some((s, a) => Math.abs(s - t.spacing[a]) > 1e-3 * Math.max(1, Math.abs(s))) && r.push("spacing");
  const o = Math.max(Math.abs(t.range[1] - t.range[0]), 1e-6);
  return e.range.some((s, a) => Math.abs(s - t.range[a]) > 0.01 * o) && r.push("intensity range"), r.length > 0 ? r.join(", ") : null;
}
const lu = /* @__PURE__ */ new Map();
function sh(e, t) {
  return `${e}
${t}`;
}
function mi(e, t) {
  const r = et(t, "");
  return new Map([...e].filter(([o]) => o.startsWith(r)));
}
function dC(e, t) {
  const r = e.length > 0 ? e[e.length - 1] : null;
  return t && !t.pinned && t.step !== null && e.includes(t.step) ? { step: t.step, pinned: !1 } : { step: r, pinned: !0 };
}
function pC({
  run: e,
  caseName: t,
  initialLayers: r,
  initialSteps: o,
  overlayRuns: s = [],
  overlayContainers: a,
  hiddenViews: f,
  onCurrentStepChange: p
}) {
  const g = Tr(), y = R.useRef(f), w = R.useCallback(() => tf(g.display, y.current), [g]), D = [{ run: e, color: null }, ...s.map((M) => ({ run: M.run, color: M.color }))], [C] = R.useState(() => {
    const M = [
      [e, o],
      ...s.map((q) => [q.run, q.initialSteps ?? []])
    ], N = M.map(([q]) => lu.get(sh(q, t))), X = (q) => new Map(N.flatMap((Y) => Y ? [...q(Y)] : [])), re = M.map(([q, Y], ie) => [q, dC(Y, N[ie])]);
    return {
      step: new Map(re.map(([q, Y]) => [q, Y.step])),
      pinned: new Map(re.map(([q, Y]) => [q, Y.pinned])),
      visibility: X((q) => q.visibility),
      colors: X((q) => q.colors),
      opacity: X((q) => q.opacity),
      labelColors: X((q) => q.labelColors),
      labelVisibility: X((q) => q.labelVisibility),
      volume: X((q) => q.volume)
    };
  }), [b, j] = R.useState(() => {
    const M = { [e]: r };
    for (const N of s)
      N.initialLayers && (M[N.run] = N.initialLayers);
    return M;
  }), [z, Q] = R.useState(() => {
    const M = { [e]: o };
    for (const N of s)
      N.initialSteps && (M[N.run] = N.initialSteps);
    return M;
  }), [x, k] = R.useState(C.step), [E, P] = R.useState(C.pinned), [B, U] = R.useState(C.visibility), [A, I] = R.useState(C.colors), [$, F] = R.useState(C.opacity), [S, Z] = R.useState(C.labelColors), [ue, Pe] = R.useState(C.labelVisibility), [Se, Te] = R.useState(C.volume), [dt, ae] = R.useState(/* @__PURE__ */ new Map()), [ye, xe] = R.useState(/* @__PURE__ */ new Map()), [We, De] = R.useState(/* @__PURE__ */ new Set()), [Vt, Wt] = R.useState(null), [vr, mt] = R.useState(/* @__PURE__ */ new Map()), [mr, on] = R.useState(!1), [rr, Nr] = R.useState(null), [ln, ii] = R.useState(0), gr = R.useCallback(() => ii((M) => M + 1), []), nr = R.useCallback(
    (M, N) => N.kind === "volume" && M !== e ? !1 : N.default_visible,
    [e]
  ), yr = R.useCallback(
    (M, N) => N.kind === "volume" && M === e && oC.test(N.file_extension),
    [e]
  ), Mn = R.useRef(E), _t = R.useRef(b), $e = R.useRef(B), Xi = R.useRef(z), Pt = R.useRef(x), Ue = R.useRef(D), sn = R.useRef(Se), zr = R.useRef(A), Ht = R.useRef($), an = R.useRef(S), ir = R.useRef(ue);
  R.useEffect(() => {
    Mn.current = E, _t.current = b, $e.current = B, Xi.current = z, Pt.current = x, Ue.current = D, sn.current = Se, zr.current = A, Ht.current = $, an.current = S, ir.current = ue, y.current = f;
  });
  const at = R.useRef([]), V = R.useRef(null), me = R.useRef(/* @__PURE__ */ new Map()), de = R.useRef(/* @__PURE__ */ new WeakMap()), ke = R.useRef(/* @__PURE__ */ new WeakMap()), Me = R.useRef([]), Gt = R.useRef(/* @__PURE__ */ new Map()), ve = R.useRef(/* @__PURE__ */ new Map()), rl = R.useRef(/* @__PURE__ */ new Map()), Xt = R.useRef(/* @__PURE__ */ new Set()), Yi = R.useRef(!1), Ki = R.useRef(/* @__PURE__ */ new Map()), Rt = R.useRef(!1), Br = R.useRef(null);
  R.useEffect(() => {
    let M = !1;
    const N = async () => {
      var re;
      try {
        const q = await nm();
        if (M) return;
        const Y = {}, ie = {};
        for (const H of Ue.current) {
          const te = (re = q[H.run]) == null ? void 0 : re[t];
          te && (Y[H.run] = te.layers, ie[H.run] = te.steps);
        }
        j((H) => qp(H, Y) ? H : Y), Q((H) => qp(H, ie) ? H : ie), k((H) => {
          let te = !1;
          const le = new Map(H);
          for (const ce of Ue.current) {
            const Ee = ie[ce.run] ?? [];
            if ((Mn.current.get(ce.run) ?? !0) && Ee.length > 0) {
              const He = Ee[Ee.length - 1];
              le.get(ce.run) !== He && (le.set(ce.run, He), te = !0);
            }
          }
          return te ? le : H;
        });
        for (const H of Ue.current) {
          const te = Pt.current.get(H.run) ?? null;
          if (te !== null && !Xt.current.has(`${H.run}:${te}`) && !at.current.some((le) => le.run === H.run && le.step === te)) {
            gr();
            break;
          }
        }
      } catch {
      }
    }, X = window.setInterval(N, eC);
    return () => {
      M = !0, window.clearInterval(X);
    };
  }, [t, gr]), R.useEffect(() => {
    p == null || p(x.get(e) ?? null);
  }, [x, e, p]);
  const Qi = R.useRef(null);
  R.useEffect(() => {
    const M = [
      x,
      E,
      B,
      A,
      $,
      S,
      ue,
      Se
    ], N = Qi.current;
    Qi.current = M;
    const X = (re) => !N || N[re] !== M[re];
    for (const { run: re } of Ue.current) {
      const q = sh(re, t), Y = lu.get(q), ie = (H, te, le) => X(H) || le === void 0 ? te() : le;
      lu.set(q, {
        step: ie(0, () => x.get(re) ?? null, Y == null ? void 0 : Y.step),
        pinned: ie(1, () => E.get(re) ?? !0, Y == null ? void 0 : Y.pinned),
        visibility: ie(2, () => mi(B, re), Y == null ? void 0 : Y.visibility),
        colors: ie(3, () => mi(A, re), Y == null ? void 0 : Y.colors),
        opacity: ie(4, () => mi($, re), Y == null ? void 0 : Y.opacity),
        labelColors: ie(5, () => mi(S, re), Y == null ? void 0 : Y.labelColors),
        labelVisibility: ie(6, () => mi(ue, re), Y == null ? void 0 : Y.labelVisibility),
        volume: ie(7, () => mi(Se, re), Y == null ? void 0 : Y.volume)
      });
    }
  }, [
    t,
    x,
    E,
    B,
    A,
    $,
    S,
    ue,
    Se
  ]);
  const Ur = R.useCallback((M, N) => {
    De((X) => {
      if (X.has(M) === N) return X;
      const re = new Set(X);
      return N ? re.add(M) : re.delete(M), re;
    });
  }, []), Yt = R.useCallback(
    (M) => {
      if (M.length === 0) return;
      Up();
      const N = new Set(M), X = (q) => [...q.values()].some((Y) => N.has(Y)) ? new Map([...q].filter(([, Y]) => !N.has(Y))) : q;
      Ds.flushSync(() => {
        ae(X), xe(X);
      }), Me.current = Me.current.filter((q) => !N.has(q));
      const re = g.display.viewGroup();
      for (const q of M)
        try {
          re.hideData(q);
        } catch {
        }
      sr(g, M);
    },
    [g]
  ), oi = R.useCallback(
    (M, N) => {
      N.discarded = !0, N.controller.abort(), N.promise.then((X) => X && sr(g, [X])), ve.current.get(M) === N && ve.current.delete(M), Ur(M, !1);
    },
    [g, Ur]
  );
  R.useEffect(() => {
    Rt.current = !1;
    const M = new AbortController();
    Br.current = M;
    try {
      g.display.viewGroup().reset();
    } catch (X) {
      console.warn("imfusion_viewer: view reset failed", X);
    }
    const N = ve.current;
    return () => {
      Rt.current = !0, M.abort();
      for (const [re, q] of [...N]) oi(re, q);
      const X = [];
      for (const re of at.current)
        X.push(...re.layers.values(), ...[...re.crops.values()].map((q) => q.data));
      V.current && X.push(V.current.data), at.current = [], V.current = null, Me.current = [], Up(), queueMicrotask(() => sr(g, X));
    };
  }, [g, oi]);
  const un = R.useCallback(
    (M) => {
      const N = new Set(Me.current), X = Pt.current.get(M) ?? null, re = [];
      for (; at.current.filter((q) => q.run === M).length > tC; ) {
        const q = at.current.findIndex(
          (ie) => ie.run === M && ie.step !== X && ![...ie.layers.values()].some((H) => N.has(H))
        );
        if (q === -1) break;
        const [Y] = at.current.splice(q, 1);
        re.push(...Y.layers.values(), ...[...Y.crops.values()].map((ie) => ie.data));
      }
      Yt(re);
    },
    [Yt]
  ), nl = R.useCallback(
    (M) => {
      const N = Me.current;
      N.length === M.length && N.every((X, re) => X === M[re]) || (g.display.viewGroup().setVisibleData(M), Me.current = M);
    },
    [g]
  ), v = R.useCallback(
    (M, N) => {
      const X = et(M, N.layer_name), re = $e.current.get(X) ?? nr(M, N), q = M !== e, Y = nh(N);
      return rh(N).map(([ie, H]) => {
        const te = `${X}:${ie}`, le = Y ? Kp(ie) : ou(N.default_color), ce = Y ? an.current.get(te) : zr.current.get(X);
        return {
          value: ie,
          name: H,
          color: ce ?? (q ? Wl(le) : le),
          // The layer checkbox alone sets the default; a class shows unless filtered out.
          visible: re && (Y ? ir.current.get(te) ?? !0 : !0)
        };
      });
    },
    [e, nr]
  ), Kt = R.useCallback(
    (M, N) => {
      const X = JSON.stringify(N);
      if (de.current.get(M) !== X) {
        M.modality() !== "LABEL" && M.setModality("LABEL");
        for (const [re, q] of N) g.bindings.setLabelConfig(M, re, q);
        de.current.set(M, X);
      }
    },
    [g]
  ), we = R.useCallback(
    (M, N, X, re) => {
      const q = Ht.current.get(et(N, X.layer_name)) ?? X.default_opacity;
      Kt(
        M,
        v(N, X).map(({ value: Y, name: ie, color: H, visible: te }) => [
          Y,
          { name: ie, color: [...H, q], isVisible2d: te, isVisible3d: re && te }
        ])
      );
    },
    [Kt, v]
  ), il = R.useCallback(
    (M, N) => {
      let X = 0;
      const re = [];
      for (const { sourceRun: q, meta: Y, labels: ie } of N) {
        const H = Ht.current.get(et(q, Y.layer_name)) ?? Y.default_opacity;
        for (const { value: te, name: le, color: ce, visible: Ee } of v(q, Y))
          ie.includes(te) && (X += 1, re.push([X, { name: `${q}: ${le}`, color: [...ce, H], isVisible2d: !1, isVisible3d: Ee }]));
      }
      Kt(M, re);
    },
    [Kt, v]
  ), ol = R.useCallback(
    (M, N, X) => {
      const re = et(N, X.layer_name), q = Ht.current.get(re) ?? X.default_opacity, Y = ou(X.default_color), ie = zr.current.get(re) ?? (N !== e ? Wl(Y) : Y), H = JSON.stringify([ie, q]);
      if (de.current.get(M) === H) return;
      const te = M.displayOptions(), le = te.state(), ce = le.surfaceRendering;
      if (ce) {
        ce.opacity = q;
        for (const Be of ["materialFront", "materialBack"]) {
          const He = ce[Be];
          He && (He.ambientColor = ie, He.diffuseColor = ie);
        }
      }
      const Ee = le.intersectionRendering;
      Ee && "lineColor" in Ee && (Ee.lineColor = [...ie, 1]), "showSurface" in le && (le.showSurface = !0), te.setState(le), de.current.set(M, H);
    },
    [e]
  ), or = R.useCallback(
    (M, N, X, re, q) => {
      const Y = sn.current.get(et(N, X.layer_name)), ie = {
        window2d: Y == null ? void 0 : Y.window2d,
        level2d: Y == null ? void 0 : Y.level2d,
        invert2d: Y == null ? void 0 : Y.invert2d,
        window3d: Y == null ? void 0 : Y.window3d,
        level3d: Y == null ? void 0 : Y.level3d,
        invert3d: Y == null ? void 0 : Y.invert3d,
        alpha2d: re === "3d" || re === "none" ? 0 : 1,
        alpha3d: re === "2d" || re === "none" ? 0 : 1
      }, H = ke.current.get(M), te = M.displayOptions2d(), le = M.displayOptions3d();
      if (!H)
        if (q) {
          const ce = q.displayOptions3d();
          le.transferFunction = ce.transferFunction, le.invert = ce.invert;
        } else
          le.transferFunction = g.bindings.TransferFunctionFactory.createMriDefaultPreset(M);
      ie.window2d !== void 0 && ie.window2d !== (H == null ? void 0 : H.window2d) && (te.window = ie.window2d), ie.level2d !== void 0 && ie.level2d !== (H == null ? void 0 : H.level2d) && (te.level = ie.level2d), ie.invert2d !== void 0 && ie.invert2d !== (H == null ? void 0 : H.invert2d) && (te.invert = ie.invert2d), ie.window3d !== void 0 && ie.window3d !== (H == null ? void 0 : H.window3d) && (le.window = ie.window3d), ie.level3d !== void 0 && ie.level3d !== (H == null ? void 0 : H.level3d) && (le.level = ie.level3d), ie.invert3d !== void 0 && ie.invert3d !== (H == null ? void 0 : H.invert3d) && (le.invert = ie.invert3d), ie.alpha2d !== (H == null ? void 0 : H.alpha2d) && eh(te, ie.alpha2d), ie.alpha3d !== (H == null ? void 0 : H.alpha3d) && eh(le, ie.alpha3d), ke.current.set(M, ie);
    },
    [g]
  ), ll = R.useCallback(
    async (M, N, X, re, q) => {
      const Y = await $p(
        {
          run: M,
          case: t,
          layer: X.layer_name,
          step: N,
          compressed: X.zlib_compressed,
          cropAxis: re.cropAxis,
          cropPosition: re.cropPosition
        },
        q
      ), ie = `${pn(M)}__${pn(t)}__${pn(X.layer_name)}__s${N}__crop_${Jp(re)}${X.file_extension}`, H = await iu(g, Y, ie);
      if (!H) throw new Error(`Layer "${X.display_name}" @ step ${N} contains no readable data.`);
      const te = Zp(X, H);
      if (te)
        throw sr(g, [H]), new Error(te);
      return H;
    },
    [t, g]
  ), _e = R.useCallback(
    (M, N, X, re, q, Y) => {
      const ie = new AbortController(), H = { sig: Y, step: N, controller: ie, discarded: !1, promise: Promise.resolve(null) };
      return H.promise = ll(X, N, re, q, ie.signal).then(
        (te) => !H.discarded && !Rt.current ? te : (sr(g, [te]), null),
        (te) => (nu(te) || (console.error(`imfusion_viewer: failed to load cropped volume layer "${re.layer_name}"`, te), rl.current.set(`${M}@${N}`, Y)), null)
      ), ve.current.set(M, H), Ur(M, !0), H;
    },
    [g, ll, Ur]
  ), Zi = R.useCallback(
    async (M, N) => {
      var q;
      const X = `${M}:${N}`;
      if (Xt.current.has(X) || at.current.some((Y) => Y.run === M && Y.step === N))
        return;
      Xt.current.add(X), on(!0);
      const re = /* @__PURE__ */ new Map();
      try {
        let Y = !1, ie = !1;
        const H = (_t.current[M] ?? []).filter((ce) => ce.steps.includes(N)), te = (q = Br.current) == null ? void 0 : q.signal, le = await Promise.allSettled(
          // Always uncropped: a crop only ever applies to a separate 3D copy.
          H.map(
            (ce) => $p(
              { run: M, case: t, layer: ce.layer_name, step: N, compressed: ce.zlib_compressed },
              te
            )
          )
        );
        for (let ce = 0; ce < H.length && !Rt.current; ce++) {
          const Ee = H[ce], Be = le[ce];
          if (Be.status === "rejected") {
            const Ge = Be.reason;
            nu(Ge) ? Y = !0 : Ge instanceof As && Ge.status === 404 ? (console.warn(
              `imfusion_viewer: layer "${Ee.layer_name}" (run "${M}") @ step ${N} not currently retained (likely reservoir eviction on a long/live run) - will retry on next poll.`
            ), Y = !0) : (console.error(`imfusion_viewer: failed to load layer "${Ee.layer_name}" (run "${M}") @ step ${N}`, Ge), Nr(`Failed to load layer "${Ee.display_name}" @ step ${N}.`), ie = !0);
            continue;
          }
          const He = `${pn(M)}__${pn(t)}__${pn(Ee.layer_name)}__s${N}${Ee.file_extension}`;
          let pt = null;
          try {
            if (pt = await iu(g, Be.value, He), !pt) {
              console.error(`imfusion_viewer: layer "${Ee.layer_name}" (run "${M}") @ step ${N} loaded no data.`), Nr(`Layer "${Ee.display_name}" @ step ${N} contains no readable data.`), ie = !0;
              continue;
            }
            const Ge = Zp(Ee, pt);
            if (Ge) throw new Error(Ge);
            re.set(et(M, Ee.layer_name), pt);
          } catch (Ge) {
            pt && sr(g, [pt]), console.error(`imfusion_viewer: failed to load layer "${Ee.layer_name}" (run "${M}") @ step ${N}`, Ge), Nr(Ge instanceof Error && Ge.message.startsWith('Layer "') ? Ge.message : `Failed to load layer "${Ee.display_name}" @ step ${N}.`), ie = !0;
          }
        }
        if (Rt.current || Y && !ie) {
          sr(g, re.values());
          return;
        }
        at.current.push({ run: M, step: N, layers: re, crops: /* @__PURE__ */ new Map() }), un(M), gr();
      } finally {
        Xt.current.delete(X), on(Xt.current.size > 0);
      }
    },
    [t, g, un, gr]
  ), li = R.useCallback(
    async (M, N, X) => {
      var H;
      const re = V.current;
      if (re && re.step === M && re.pairsKey === X) return "ok";
      const q = `${M}|${X}`, Y = me.current.get(q);
      if (Y) return Y;
      const ie = `combined:${q}`;
      if (Xt.current.has(ie)) return "pending";
      Xt.current.add(ie), on(!0);
      try {
        const te = await hb(
          {
            case: t,
            step: M,
            pairs: N.map((Be) => ({ run: Be.sourceRun, layer: Be.meta.layer_name, labels: Be.labels })),
            compressed: N[0].meta.zlib_compressed
          },
          (H = Br.current) == null ? void 0 : H.signal
        );
        if (Rt.current) return "pending";
        const le = `combined__${pn(t)}__s${M}__${pn(X)}.nii`, ce = await iu(g, te, le);
        if (!ce || !dm.has(ce.kind()))
          return ce && sr(g, [ce]), console.error(`imfusion_viewer: combined mask @ step ${M} loaded no label volume.`), me.current.set(q, "error"), "error";
        if (Rt.current)
          return sr(g, [ce]), "pending";
        const Ee = V.current;
        return V.current = { pairsKey: X, step: M, data: ce }, Ee && Yt([Ee.data]), gr(), "ok";
      } catch (te) {
        if (nu(te) || te instanceof As && te.status === 404) return "pending";
        const le = te instanceof im ? "mismatch" : "error";
        return le === "mismatch" ? console.warn(`imfusion_viewer: combined mask @ step ${M} can't be merged (${te instanceof Error ? te.message : te}).`) : console.error(`imfusion_viewer: failed to load combined mask @ step ${M}`, te), me.current.set(q, le), le;
      } finally {
        Xt.current.delete(ie), on(Xt.current.size > 0);
      }
    },
    [t, g, Yt, gr]
  ), On = R.useCallback(
    (M) => {
      if (!M) return !1;
      const N = _t.current[e] ?? [];
      for (const X of rC) {
        const re = N.find((Y) => Y.kind === X && M.layers.has(et(e, Y.layer_name))), q = re && M.layers.get(et(e, re.layer_name));
        if (q)
          return g.display.viewGroup().centerOnData(q), !0;
      }
      return !1;
    },
    [g, e]
  );
  R.useEffect(() => {
    const M = g.canvas;
    let N = null, X = null;
    const re = () => {
      X = null;
      const Y = Gt.current.get(e), ie = at.current.find((le) => le.run === e && le.step === Y), H = g.display.main3dView(), te = H.camera();
      try {
        On(ie) && H.setCamera(te, !0);
      } finally {
        te.delete();
      }
      g.render();
    }, q = new ResizeObserver(() => {
      const Y = M.clientWidth, ie = M.clientHeight;
      if (Y === 0 || ie === 0) return;
      const H = N !== null && (Math.abs(Y - N.w) > 0.25 * N.w || Math.abs(ie - N.h) > 0.25 * N.h);
      N = { w: Y, h: ie }, H && Yi.current && (X ?? (X = requestAnimationFrame(re)));
    });
    return q.observe(M), () => {
      q.disconnect(), X !== null && cancelAnimationFrame(X);
    };
  }, [g, e, On]), R.useEffect(() => {
    let M = !1;
    const N = (H, te) => te == null ? void 0 : at.current.find((le) => le.run === H && le.step === te), X = (H, te) => v(H, te).filter((le) => le.visible).map((le) => le.value), re = () => {
      const H = [], te = /* @__PURE__ */ new Set();
      for (const ce of Ue.current) {
        const Ee = Pt.current.get(ce.run) ?? null;
        if (Ee !== null)
          for (const Be of _t.current[ce.run] ?? []) {
            if (Be.kind !== "mask" || !Be.steps.includes(Ee)) continue;
            const He = X(ce.run, Be);
            He.length !== 0 && (te.add(Ee), H.push({ sourceRun: ce.run, meta: Be, labels: He }));
          }
      }
      if (H.length < 2) return null;
      const le = te.size === 1;
      return {
        contributors: H,
        aligned: le,
        step: le ? [...te][0] : null,
        pairsKey: H.map((ce) => `${ce.sourceRun}:${ce.meta.layer_name}=${ce.labels.join(".")}`).join(",")
      };
    }, q = () => {
      const H = /* @__PURE__ */ new Map();
      for (const se of Ue.current) {
        const Re = N(se.run, Pt.current.get(se.run)) ?? N(se.run, Gt.current.get(se.run));
        Re && (H.set(se.run, Re), Gt.current.set(se.run, Re.step), at.current = [...at.current.filter((Ie) => Ie !== Re), Re]);
      }
      const te = re(), le = V.current, ce = te != null && te.aligned && le && le.step === te.step && le.pairsKey === te.pairsKey ? le : null;
      le && !ce && (V.current = null, Yt([le.data]));
      let Ee = null;
      const Be = H.get(e), He = Ue.current.some(
        (se) => (_t.current[se.run] ?? []).some(
          (Re) => {
            var Ie;
            return Re.kind === "volume" && !!((Ie = H.get(se.run)) != null && Ie.layers.has(et(se.run, Re.layer_name))) && ($e.current.get(et(se.run, Re.layer_name)) ?? nr(se.run, Re));
          }
        )
      ), pt = ce !== null || Ue.current.some(
        (se) => (_t.current[se.run] ?? []).some(
          (Re) => {
            var Ie;
            return Re.kind === "mask" && !!((Ie = H.get(se.run)) != null && Ie.layers.has(et(se.run, Re.layer_name))) && X(se.run, Re).length > 0;
          }
        )
      ), Ge = Ue.current.some(
        (se) => (_t.current[se.run] ?? []).some(
          (Re) => {
            var Ie;
            return Re.kind === "mask" && !!((Ie = H.get(se.run)) != null && Ie.layers.has(et(se.run, Re.layer_name))) && (ce !== null || X(se.run, Re).length === 0);
          }
        )
      );
      if (Be && !He && pt && !Ge) {
        const se = (_t.current[e] ?? []).find(
          (Re) => Re.kind === "volume" && Be.layers.has(et(e, Re.layer_name))
        );
        Ee = se ? Be.layers.get(et(e, se.layer_name)) ?? null : null;
      }
      for (const se of at.current) {
        const Re = ce !== null && se.step === ce.step && H.get(se.run) === se;
        for (const [Ie, xt] of se.layers) {
          const [qe, xr] = Vl(Ie), Lt = (_t.current[qe] ?? []).find((kt) => kt.layer_name === xr);
          if (Lt)
            try {
              if (Lt.kind === "mask")
                we(xt, qe, Lt, !Re);
              else if (Lt.kind === "mesh")
                ol(xt, qe, Lt);
              else if (Lt.kind === "volume") {
                const kt = se.crops.get(Ie);
                or(xt, qe, Lt, xt === Ee ? "none" : kt || qe !== e ? "2d" : "both"), kt && or(kt.data, qe, Lt, "3d");
              }
            } catch (kt) {
              console.error(`imfusion_viewer: failed to style layer "${Lt.layer_name}" (run "${qe}")`, kt);
            }
        }
      }
      ce && te && il(ce.data, te.contributors);
      const _r = [], cn = [], al = [], Ji = [], Lr = [], eo = [], Tt = /* @__PURE__ */ new Map(), Wr = /* @__PURE__ */ new Map();
      for (const se of Ue.current) {
        const Re = H.get(se.run);
        if (Re)
          for (const Ie of _t.current[se.run] ?? []) {
            const xt = et(se.run, Ie.layer_name), qe = Re.layers.get(xt);
            if (!qe) continue;
            const xr = Re.crops.get(xt);
            if (Ie.kind === "volume" && (Tt.set(xt, qe), xr && Wr.set(xt, xr.data)), Ie.kind === "mask") {
              (X(se.run, Ie).length > 0 ? Ji : Lr).push(qe);
              continue;
            }
            ($e.current.get(xt) ?? nr(se.run, Ie)) && (Ie.kind === "volume" ? (xr && _r.push(xr.data), cn.push(qe)) : Ie.kind === "image" ? al.push(qe) : eo.push(qe));
          }
      }
      let be = null;
      _r.length === 0 && cn.length === 0 && !Ee && (be = (ce ? Ji[0] ?? Lr[0] : Lr[0]) ?? null);
      const Fe = [...Ji, ...Lr].filter((se) => se !== be);
      nl([
        ...Ee ? [Ee] : [],
        ...be ? [be] : [],
        ..._r,
        ...cn,
        ...al,
        ...ce ? [ce.data] : [],
        ...Fe,
        ...eo
      ]);
      const to = (se, Re) => se.size === Re.size && [...Re].every(([Ie, xt]) => se.get(Ie) === xt);
      if (ae((se) => to(se, Tt) ? se : Tt), xe((se) => to(se, Wr) ? se : Wr), !to(Ki.current, Tt)) {
        Ki.current = Tt;
        const se = /* @__PURE__ */ new Map(), Re = [...Tt].filter(([Ie]) => Vl(Ie)[0] === e);
        for (const [Ie, xt] of Tt) {
          const [qe, xr] = Vl(Ie);
          if (qe === e || Re.length === 0) continue;
          const Lt = Re.find(([kt]) => Vl(kt)[1] === xr) ?? Re[0];
          try {
            const kt = lh(xt), fn = lh(Lt[1]), ai = kt && fn ? fC(kt, fn) : null;
            ai && se.set(Ie, `Differs from ${e}'s volume (${ai}).`);
          } catch (kt) {
            console.warn("imfusion_viewer: could not compare volumes", kt);
          }
        }
        mt(se);
      }
      for (const se of Ue.current) un(se.run);
      Yi.current || (Yi.current = On(H.get(e))), w(), g.render();
    }, Y = async () => {
      for (const H of Ue.current) {
        const te = N(H.run, Pt.current.get(H.run));
        if (te)
          for (const le of _t.current[H.run] ?? []) {
            if (le.kind !== "volume") continue;
            const ce = et(H.run, le.layer_name), Ee = te.layers.get(ce);
            if (!Ee) continue;
            const Be = sn.current.get(ce), He = yr(H.run, le) ? Jp(Be) : null, pt = te.crops.get(ce);
            let Ge = ve.current.get(ce);
            if (Ge && (Ge.sig !== He || Ge.step !== te.step) && (oi(ce, Ge), Ge = void 0), ((pt == null ? void 0 : pt.sig) ?? null) === He) continue;
            if (He === null || !Be) {
              te.crops.delete(ce), or(Ee, H.run, le, H.run === e ? "both" : "2d"), pt && Yt([pt.data]), q();
              continue;
            }
            if (!Ge) {
              if (rl.current.get(`${ce}@${te.step}`) === He) continue;
              Ge = _e(ce, te.step, H.run, le, Be, He);
            }
            const _r = await Ge.promise;
            if (M) return;
            if (ve.current.get(ce) === Ge && (ve.current.delete(ce), Ur(ce, !1), !!_r)) {
              if (!at.current.includes(te) || te.layers.get(ce) !== Ee) {
                sr(g, [_r]);
                continue;
              }
              try {
                or(_r, H.run, le, "3d", Ee);
              } catch (cn) {
                console.error(`imfusion_viewer: failed to style cropped volume layer "${le.layer_name}"`, cn), sr(g, [_r]);
                continue;
              }
              te.crops.set(ce, { data: _r, sig: He }), or(Ee, H.run, le, "2d"), pt && Yt([pt.data]), q();
            }
          }
      }
    }, ie = async () => {
      const H = re();
      let te = null;
      if (H && !H.aligned)
        te = "Epochs differ: align epochs to merge masks in 3D (3D shows one mask image only).";
      else if (H && H.step !== null) {
        const le = await li(H.step, H.contributors, H.pairsKey);
        if (M) return;
        le === "mismatch" ? te = "Masks can't be merged in 3D: their volumes use different grids (3D shows one mask image only)." : le === "error" && (te = "Merging masks for 3D failed; 3D shows one mask image only.");
      }
      Wt(te);
    };
    return (async () => {
      if (await new Promise((te) => setTimeout(te, 0)), M) return;
      const H = [];
      for (const te of Ue.current) {
        const le = Pt.current.get(te.run) ?? null;
        le !== null && !N(te.run, le) && H.push(Zi(te.run, le));
      }
      if (q(), H.length > 0) {
        if (await Promise.all(H), M) return;
        q();
      }
      await Y(), !M && (await ie(), !M && q());
    })().catch((H) => console.error("imfusion_viewer: load/show pass failed", H)), () => {
      M = !0;
    };
  }, [
    x,
    b,
    B,
    ln,
    Se,
    A,
    $,
    S,
    ue,
    g,
    e,
    Zi,
    li,
    _e,
    oi,
    Yt,
    un,
    nl,
    we,
    il,
    ol,
    or,
    v,
    yr,
    nr,
    Ur,
    w,
    On
  ]);
  const Js = R.useCallback(
    (M, N) => {
      U((X) => {
        const re = et(M, N.layer_name);
        return new Map(X).set(re, !(X.get(re) ?? nr(M, N)));
      });
    },
    [nr]
  ), si = R.useCallback((M, N, X) => {
    I((re) => {
      const q = new Map(re);
      return q.set(et(M, N), oh(X)), q;
    });
  }, []);
  R.useCallback((M, N, X) => {
    F((re) => {
      const q = new Map(re);
      return q.set(et(M, N), X), q;
    });
  }, []);
  const qi = R.useCallback((M, N, X) => {
    Te((re) => {
      const q = et(M, N), Y = new Map(re);
      return Y.set(q, { ...Y.get(q), ...X }), Y;
    });
  }, []), wr = R.useCallback((M, N, X, re) => {
    Z((q) => {
      const Y = new Map(q);
      return Y.set(`${et(M, N)}:${X}`, oh(re)), Y;
    });
  }, []), sl = R.useCallback((M, N, X, re) => {
    Pe((q) => {
      const Y = new Map(q);
      return Y.set(`${et(M, N)}:${X}`, !re), Y;
    });
  }, []), ea = R.useCallback(
    (M, N) => {
      const X = z[M] ?? [], re = X[N];
      if (re === void 0) return;
      k((Y) => new Map(Y).set(M, re));
      const q = X[X.length - 1];
      re !== q && P((Y) => new Map(Y).set(M, !1));
    },
    [z]
  ), ta = R.useCallback(
    (M) => {
      P((X) => new Map(X).set(M, !0));
      const N = z[M] ?? [];
      N.length > 0 && k((X) => new Map(X).set(M, N[N.length - 1]));
    },
    [z]
  );
  function In(M) {
    const N = z[M] ?? [], X = x.get(M) ?? null, re = X !== null ? N.indexOf(X) : -1, q = E.get(M) ?? !0;
    return /* @__PURE__ */ L.jsxs("div", { style: mC, children: [
      /* @__PURE__ */ L.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: Math.max(0, N.length - 1),
          value: Math.max(0, re),
          disabled: N.length === 0,
          onChange: (Y) => ea(M, Number(Y.target.value)),
          style: yC
        }
      ),
      /* @__PURE__ */ L.jsxs("div", { style: gC, children: [
        /* @__PURE__ */ L.jsxs("span", { style: wC, children: [
          X !== null ? `epoch ${X}` : "—",
          re >= 0 && /* @__PURE__ */ L.jsxs("span", { style: _C, children: [
            " · ",
            re + 1,
            "/",
            N.length
          ] })
        ] }),
        /* @__PURE__ */ L.jsx("button", { type: "button", onClick: () => ta(M), disabled: q, style: xC, children: q ? "● live" : "○ go live" })
      ] })
    ] });
  }
  function Vr(M, N) {
    const X = et(M.run, N.layer_name), re = N.kind === "mask" || N.kind === "mesh", q = M.color !== null, Y = ou(N.default_color), ie = A.get(X) ?? (q ? Wl(Y) : Y);
    $.get(X) ?? N.default_opacity;
    const H = N.kind === "mask" && nh(N) ? rh(N) : null;
    return /* @__PURE__ */ L.jsxs("div", { children: [
      /* @__PURE__ */ L.jsxs("label", { style: SC, children: [
        /* @__PURE__ */ L.jsx(
          "input",
          {
            type: "checkbox",
            checked: B.get(X) ?? nr(M.run, N),
            onChange: () => Js(M.run, N)
          }
        ),
        !H && (re ? /* @__PURE__ */ L.jsx(
          "input",
          {
            type: "color",
            value: ih(ie),
            onChange: (te) => si(M.run, N.layer_name, te.target.value),
            style: CC,
            title: "Layer color"
          }
        ) : /* @__PURE__ */ L.jsx("span", { style: { ...bC, background: hC(N.default_color) } })),
        /* @__PURE__ */ L.jsx("span", { style: EC, children: N.display_name }),
        /* @__PURE__ */ L.jsx("span", { style: zC, children: N.kind })
      ] }),
      iC,
      N.kind === "volume" && (() => {
        const te = dt.get(X);
        return te ? /* @__PURE__ */ L.jsx(
          vC,
          {
            sis: te,
            sis3d: ye.get(X) ?? te,
            crop: Se.get(X),
            cropSupported: yr(M.run, N),
            show3d: !q,
            cutting: We.has(X),
            warning: vr.get(X),
            onOverrideChange: (le) => qi(M.run, N.layer_name, le)
          },
          X
        ) : null;
      })(),
      H && /* @__PURE__ */ L.jsx("div", { style: jC, children: H.map(([te, le]) => {
        const ce = Kp(te), Ee = S.get(`${X}:${te}`) ?? (q ? Wl(ce) : ce), Be = ue.get(`${X}:${te}`) ?? !0;
        return /* @__PURE__ */ L.jsxs("label", { style: NC, title: `Show/hide ${le}`, children: [
          /* @__PURE__ */ L.jsx(
            "input",
            {
              type: "checkbox",
              checked: Be,
              onChange: () => sl(M.run, N.layer_name, te, Be)
            }
          ),
          /* @__PURE__ */ L.jsx(
            "input",
            {
              type: "color",
              value: ih(Ee),
              onChange: (He) => wr(M.run, N.layer_name, te, He.target.value),
              style: PC,
              title: `${le} color`,
              onClick: (He) => He.stopPropagation()
            }
          ),
          le
        ] }, te);
      }) })
    ] }, X);
  }
  const ra = /* @__PURE__ */ L.jsxs("div", { style: uh, children: [
    In(e),
    mr && /* @__PURE__ */ L.jsx("div", { style: is, children: "Loading layers…" }),
    rr && /* @__PURE__ */ L.jsx("div", { style: kC, children: rr }),
    Vt && /* @__PURE__ */ L.jsx("div", { style: pm, children: Vt }),
    /* @__PURE__ */ L.jsx("div", { style: ch, children: (() => {
      const M = b[e] ?? [];
      return /* @__PURE__ */ L.jsxs("div", { children: [
        M.map((N) => Vr({ run: e, color: null }, N)),
        M.length === 0 && /* @__PURE__ */ L.jsx("div", { style: is, children: "No layers reported for this case." })
      ] });
    })() })
  ] });
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    ra,
    s.map((M) => {
      const N = a == null ? void 0 : a.get(M.run);
      if (!N) return null;
      const X = { run: M.run, color: M.color }, re = b[M.run] ?? [];
      return Ds.createPortal(
        /* @__PURE__ */ L.jsxs("div", { style: uh, children: [
          In(M.run),
          /* @__PURE__ */ L.jsxs("div", { style: ch, children: [
            re.map((q) => Vr(X, q)),
            re.length === 0 && /* @__PURE__ */ L.jsx("div", { style: is, children: "No data available for this run." })
          ] })
        ] }),
        N,
        M.run
      );
    })
  ] });
}
function hC([e, t, r, o]) {
  return `rgba(${Math.round(e * 255)}, ${Math.round(t * 255)}, ${Math.round(r * 255)}, ${o})`;
}
function ah(e, t) {
  const r = e.displayOptions2d(), o = [r.window, r.level];
  e.autoWindow();
  const s = [r.window, r.level];
  return t && (r.window = o[0], r.level = o[1]), s;
}
function vC({
  sis: e,
  sis3d: t,
  crop: r,
  cropSupported: o,
  show3d: s,
  cutting: a,
  warning: f,
  onOverrideChange: p
}) {
  const g = Tr(), y = FS(e), w = AS(t), [D, C] = R.useState("2d"), b = s ? D : "2d", j = b === "2d" ? y : w, z = (r == null ? void 0 : r.cropAxis) !== void 0 && (r == null ? void 0 : r.cropPosition) !== void 0, Q = (r == null ? void 0 : r.cropAxis) ?? "z", [x, k] = R.useState(null), E = x ?? (r == null ? void 0 : r.cropPosition) ?? Qp, P = R.useRef(null), B = R.useRef(void 0), U = R.useRef(p);
  R.useEffect(() => {
    U.current = p;
  });
  const A = R.useCallback(() => {
    window.clearTimeout(B.current), B.current = void 0, P.current = null, k(null);
  }, []), I = R.useCallback(() => {
    const $ = P.current;
    A(), $ && U.current($);
  }, [A]);
  return R.useEffect(() => () => I(), [I]), /* @__PURE__ */ L.jsxs("div", { style: RC, children: [
    f && /* @__PURE__ */ L.jsx("div", { style: pm, children: f }),
    s ? /* @__PURE__ */ L.jsx("div", { style: fh, children: ["2d", "3d"].map(($) => /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        style: { ...dh, ...b === $ ? ph : {} },
        onClick: () => C($),
        children: $.toUpperCase()
      },
      $
    )) }) : /* @__PURE__ */ L.jsx("div", { style: is, children: "2D only in the combined view" }),
    /* @__PURE__ */ L.jsxs("label", { style: AC, children: [
      /* @__PURE__ */ L.jsx(
        "input",
        {
          type: "checkbox",
          checked: j.invert,
          onChange: ($) => {
            const F = $.target.checked;
            j.invert = F, p(b === "2d" ? { invert2d: F } : { invert3d: F }), g.render();
          }
        }
      ),
      "Invert"
    ] }),
    /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        style: $C,
        onClick: () => {
          if (b === "2d") {
            const [$, F] = ah(e, !1);
            p({ window2d: $, level2d: F });
          } else {
            const [$, F] = ah(t, !0), S = t.displayOptions3d();
            S.window = $, S.level = F, p({ window3d: $, level3d: F });
          }
          g.render();
        },
        children: "Auto Window"
      }
    ),
    o && s && /* @__PURE__ */ L.jsxs("div", { style: MC, children: [
      /* @__PURE__ */ L.jsxs("div", { style: OC, children: [
        /* @__PURE__ */ L.jsxs("span", { children: [
          "Cross-section",
          a && /* @__PURE__ */ L.jsx("span", { style: BC, children: " · cutting…" })
        ] }),
        z && /* @__PURE__ */ L.jsx(
          "button",
          {
            type: "button",
            style: IC,
            onClick: () => {
              A(), p({ cropAxis: void 0, cropPosition: void 0 });
            },
            children: "Clear"
          }
        )
      ] }),
      /* @__PURE__ */ L.jsx("div", { style: fh, children: ["x", "y", "z"].map(($) => /* @__PURE__ */ L.jsx(
        "button",
        {
          type: "button",
          style: { ...dh, ...z && Q === $ ? ph : {} },
          onClick: () => {
            const F = z ? E : Qp;
            A(), p({ cropAxis: $, cropPosition: F });
          },
          children: $.toUpperCase()
        },
        $
      )) }),
      /* @__PURE__ */ L.jsxs("label", { style: TC, children: [
        /* @__PURE__ */ L.jsx("span", { style: LC, children: "Cut" }),
        /* @__PURE__ */ L.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: E,
            disabled: !z,
            onChange: ($) => {
              const F = Number($.target.value);
              k(F), P.current = { cropAxis: Q, cropPosition: F }, window.clearTimeout(B.current), B.current = window.setTimeout(I, nC);
            },
            onPointerUp: I,
            onKeyUp: I,
            style: DC
          }
        ),
        /* @__PURE__ */ L.jsx("span", { style: FC, children: z ? `${Math.round(E * 100)}%` : "off" })
      ] })
    ] })
  ] });
}
const uh = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  color: "var(--tb-text)"
}, mC = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, gC = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
}, yC = {
  width: "100%"
}, wC = {
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap"
}, _C = {
  opacity: 0.55
}, xC = {
  font: "inherit",
  padding: "4px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer",
  whiteSpace: "nowrap"
}, is = {
  opacity: 0.55
}, kC = {
  color: "var(--tb-error)"
}, ch = {
  display: "flex",
  flexDirection: "column",
  gap: 4
}, SC = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer"
}, EC = {
  flex: 1,
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, bC = {
  width: 10,
  height: 10,
  borderRadius: 2,
  flexShrink: 0,
  display: "inline-block",
  border: "1px solid var(--tb-border)"
}, CC = {
  width: 16,
  height: 16,
  padding: 0,
  flexShrink: 0,
  border: "none",
  borderRadius: 2,
  cursor: "pointer"
}, PC = {
  width: 14,
  height: 14,
  padding: 0,
  flexShrink: 0,
  border: "none",
  borderRadius: 2,
  cursor: "pointer"
}, RC = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "4px 0 4px 22px"
}, fh = {
  display: "flex",
  gap: 4,
  marginBottom: 2
}, dh = {
  font: "inherit",
  fontSize: "0.85em",
  padding: "1px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "transparent",
  color: "inherit",
  opacity: 0.6,
  cursor: "pointer"
}, ph = {
  opacity: 1,
  background: "var(--tb-surface)"
}, TC = {
  display: "flex",
  alignItems: "center",
  gap: 8
}, LC = {
  flexShrink: 0,
  width: 46,
  opacity: 0.7
}, DC = {
  flex: 1,
  height: 14
}, FC = {
  opacity: 0.6,
  fontVariantNumeric: "tabular-nums",
  minWidth: 40,
  textAlign: "right"
}, AC = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  opacity: 0.85,
  cursor: "pointer"
}, $C = {
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
}, MC = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: 6,
  paddingTop: 6,
  borderTop: "1px solid var(--tb-border)"
}, OC = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  opacity: 0.7
}, IC = {
  font: "inherit",
  fontSize: "0.8em",
  padding: "0 6px",
  border: "none",
  background: "transparent",
  color: "inherit",
  opacity: 0.7,
  cursor: "pointer",
  textDecoration: "underline"
}, jC = {
  display: "flex",
  flexWrap: "wrap",
  gap: "3px 10px",
  padding: "2px 0 2px 22px",
  // aligned past the checkbox + a bit more
  opacity: 0.85
}, NC = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap",
  cursor: "pointer"
}, zC = {
  flexShrink: 0,
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  opacity: 0.45
}, pm = {
  color: "var(--tb-warning, #d89614)",
  fontSize: "0.9em"
}, BC = {
  opacity: 0.8,
  fontStyle: "italic"
};
function hh({ label: e, labelSuffix: t, defaultExpanded: r = !0, children: o }) {
  const [s, a] = R.useState(r);
  return /* @__PURE__ */ L.jsxs("div", { style: UC, children: [
    /* @__PURE__ */ L.jsxs("button", { type: "button", onClick: () => a((f) => !f), style: VC, "aria-expanded": s, children: [
      /* @__PURE__ */ L.jsx("span", { style: WC, children: s ? "▾" : "▸" }),
      /* @__PURE__ */ L.jsxs("span", { style: HC, children: [
        e,
        t ?? ""
      ] })
    ] }),
    /* @__PURE__ */ L.jsx("div", { style: s ? GC : XC, children: o })
  ] });
}
const UC = {
  display: "flex",
  flexDirection: "column",
  // The sidebar is the one scroll container; sections never shrink into inner scrollers.
  flexShrink: 0,
  gap: 8,
  padding: "4px 10px 12px",
  borderTop: "1px solid var(--tb-border)"
}, VC = {
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
}, WC = {
  opacity: 0.55,
  width: 10,
  display: "inline-block"
}, HC = {
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  opacity: 0.55
}, GC = {
  display: "flex",
  flexDirection: "column",
  gap: 14
}, XC = {
  display: "none"
};
function Hl(e) {
  if (!Number.isFinite(e)) return String(e);
  if (e === 0) return "0";
  const t = Math.abs(e);
  return t >= 1e5 || t < 1e-3 ? e.toExponential(2) : String(Number(e.toPrecision(4)));
}
function YC({ tag: e, series: t, currentStep: r = null, width: o = 320, height: s = 160 }) {
  const p = t.filter((P) => P.points.length > 0);
  if (p.length === 0) return /* @__PURE__ */ L.jsxs("div", { style: qC, children: [
    "Waiting for scalar data (",
    e,
    ")…"
  ] });
  const g = p.map((P) => ({ ...P, points: [...P.points].sort((B, U) => B.step - U.step) })), y = Math.max(1, ...g.flatMap((P) => P.points.map((B) => B.step))), w = g.flatMap((P) => P.points.map((B) => B.value)), D = Math.min(...w), C = Math.max(...w), b = Math.max(C - D, 1e-6), j = D - b * 0.1, z = C + b * 0.1, Q = Math.max(z - j, 1e-6), x = (P) => 34 + P / y * (o - 2 * 34), k = (P) => s - 34 - (P - j) / Q * (s - 34 - 28), E = r !== null && r <= y;
  return /* @__PURE__ */ L.jsxs("div", { style: KC, children: [
    /* @__PURE__ */ L.jsx("div", { style: QC, children: e }),
    /* @__PURE__ */ L.jsxs("svg", { viewBox: `0 0 ${o} ${s}`, preserveAspectRatio: "xMidYMid meet", style: ZC, children: [
      /* @__PURE__ */ L.jsx("line", { x1: 34, y1: s - 34, x2: o - 34, y2: s - 34, stroke: "var(--tb-border)" }),
      /* @__PURE__ */ L.jsx("line", { x1: 34, y1: 28, x2: 34, y2: s - 34, stroke: "var(--tb-border)" }),
      g.map(({ run: P, color: B, points: U }) => {
        const A = U.map(($, F) => `${F === 0 ? "M" : "L"} ${x($.step).toFixed(1)} ${k($.value).toFixed(1)}`).join(" "), I = U[U.length - 1];
        return /* @__PURE__ */ L.jsxs("g", { children: [
          U.length > 1 && /* @__PURE__ */ L.jsx("path", { d: A, fill: "none", stroke: B, strokeWidth: 2 }),
          U.map(($) => (
            // Transparent stroke widens the hover target for the tooltip.
            /* @__PURE__ */ L.jsx(
              "circle",
              {
                cx: x($.step),
                cy: k($.value),
                r: $ === I ? 3 : 1.5,
                fill: B,
                stroke: "transparent",
                strokeWidth: 8,
                children: /* @__PURE__ */ L.jsx("title", { children: `${P} · epoch ${$.step} · ${e} ${Hl($.value)}` })
              },
              $.step
            )
          ))
        ] }, P);
      }),
      E && /* @__PURE__ */ L.jsx(
        "line",
        {
          x1: x(r),
          y1: 28,
          x2: x(r),
          y2: s - 34,
          stroke: "var(--tb-accent)",
          strokeDasharray: "3,3"
        }
      ),
      /* @__PURE__ */ L.jsx("text", { x: 34, y: s - 11, fontSize: 15, fill: "var(--tb-text-muted)", children: "epoch 0" }),
      /* @__PURE__ */ L.jsxs("text", { x: o - 34, y: s - 11, fontSize: 15, fill: "var(--tb-text-muted)", textAnchor: "end", children: [
        "epoch ",
        y
      ] }),
      /* @__PURE__ */ L.jsx("text", { x: 34, y: 18, fontSize: 15, fill: "var(--tb-text-muted)", children: D === C ? Hl(D) : `min ${Hl(D)} · max ${Hl(C)}` })
    ] })
  ] });
}
const KC = {
  display: "flex",
  flexDirection: "column",
  gap: 4
}, QC = {
  opacity: 0.75,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, ZC = {
  display: "block",
  width: "100%",
  height: "auto",
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, qC = {
  padding: "16px 8px",
  textAlign: "center",
  opacity: 0.55,
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, JC = 320, e3 = 190;
function t3({ data: e, currentStep: t = null }) {
  const [r, o] = R.useState(!0), { status: s, error: a, groups: f, legend: p, seriesForTag: g } = e, y = f.reduce((w, D) => w + D.tags.length, 0);
  return /* @__PURE__ */ L.jsxs("div", { style: r3, children: [
    /* @__PURE__ */ L.jsxs("button", { type: "button", onClick: () => o((w) => !w), style: n3, children: [
      /* @__PURE__ */ L.jsx("span", { style: i3, children: r ? "▾" : "▸" }),
      /* @__PURE__ */ L.jsxs("span", { style: o3, children: [
        "Metrics",
        s === "ready" ? ` (${y})` : ""
      ] })
    ] }),
    r && /* @__PURE__ */ L.jsxs("div", { style: l3, children: [
      s === "empty-runs" && /* @__PURE__ */ L.jsx("div", { style: os, children: "Check a run above to see its metrics." }),
      s === "loading" && /* @__PURE__ */ L.jsx("div", { style: os, children: "Looking for scalar data…" }),
      s === "error" && /* @__PURE__ */ L.jsx("div", { style: h3, children: a }),
      s === "no-tags" && /* @__PURE__ */ L.jsx("div", { style: os, children: "No scalar tags found for the checked run(s)." }),
      s === "ready" && p.length > 0 && /* @__PURE__ */ L.jsx("div", { style: u3, children: p.map(({ run: w, color: D }) => /* @__PURE__ */ L.jsxs("span", { style: c3, title: w, children: [
        /* @__PURE__ */ L.jsx("span", { style: { ...f3, background: D } }),
        /* @__PURE__ */ L.jsx("span", { style: d3, children: w })
      ] }, w)) }),
      s === "ready" && f.map(({ group: w, tags: D }) => /* @__PURE__ */ L.jsxs("div", { style: s3, children: [
        /* @__PURE__ */ L.jsx("div", { style: a3, children: w }),
        D.map((C) => /* @__PURE__ */ L.jsx("div", { style: p3, children: /* @__PURE__ */ L.jsx(
          YC,
          {
            tag: C,
            series: g(C),
            currentStep: t,
            width: JC,
            height: e3
          }
        ) }, C))
      ] }, w))
    ] })
  ] });
}
const r3 = {
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  gap: 8,
  padding: "4px 10px 12px",
  borderTop: "1px solid var(--tb-border)"
}, n3 = {
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
}, i3 = {
  opacity: 0.55,
  width: 10,
  display: "inline-block"
}, o3 = {
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  opacity: 0.55
}, l3 = {
  display: "flex",
  flexDirection: "column",
  gap: 14
}, s3 = {
  display: "flex",
  flexDirection: "column",
  gap: 6
}, a3 = {
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  opacity: 0.4
}, u3 = {
  display: "flex",
  flexWrap: "wrap",
  gap: "4px 12px",
  fontSize: 13
}, c3 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
  maxWidth: "100%"
}, f3 = {
  width: 14,
  height: 3,
  borderRadius: 2,
  flexShrink: 0
}, d3 = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, p3 = {
  display: "block"
}, os = {
  padding: "10px 8px",
  textAlign: "center",
  opacity: 0.55,
  background: "var(--tb-surface)",
  border: "1px solid var(--tb-border)",
  borderRadius: 6
}, h3 = {
  ...os,
  color: "var(--tb-error)"
}, v3 = {
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
}, m3 = {
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
function rf(e) {
  return e ? m3 : v3;
}
function vh(e) {
  const t = parseInt(e.slice(1), 16);
  return [(t >> 16) / 255, (t >> 8 & 255) / 255, (t & 255) / 255];
}
const g3 = 1e4;
function y3(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = o.indexOf("/"), a = s === -1 ? o : o.slice(0, s);
    r.has(a) || (r.set(a, []), t.push(a)), r.get(a).push(o);
  }
  return t.map((o) => ({ group: o, tags: r.get(o) ?? [] }));
}
function w3(e) {
  return [...e.map((t) => t.run)].sort().join("::");
}
function _3(e, t) {
  return e !== void 0 && e.length === t.length && e.every((r, o) => r.step === t[o].step && r.value === t[o].value && r.wallTime === t[o].wallTime);
}
function x3(e, t) {
  const r = Object.keys(t);
  return Object.keys(e).length === r.length && r.every((o) => e[o] !== void 0 && e[o].join(`
`) === t[o].join(`
`));
}
function k3(e, t = "") {
  const [r, o] = R.useState({}), [s, a] = R.useState({}), [f, p] = R.useState(null), g = w3(e), y = R.useRef(e);
  R.useEffect(() => {
    y.current = e;
  });
  const [w, D] = R.useState(g);
  g !== w && (D(g), o({}), a({}), p(null)), R.useEffect(() => {
    if (!g) return;
    let x = !1, k = !1;
    const E = async () => {
      if (!k) {
        k = !0;
        try {
          const B = await vb(), U = {};
          for (const { run: $ } of y.current) U[$] = B[$] ?? [];
          const A = Object.entries(U).flatMap(([$, F]) => F.map((S) => [$, S])), I = await Promise.all(
            A.map(async ([$, F]) => [$, F, await mb($, F)])
          );
          if (x) return;
          o(($) => x3($, U) ? $ : U), a(($) => {
            var Z;
            let F = Object.keys($).length !== Object.keys(U).length;
            const S = {};
            for (const [ue, Pe, Se] of I) {
              const Te = (Z = $[ue]) == null ? void 0 : Z[Pe];
              S[ue] ?? (S[ue] = {}), _3(Te, Se) ? S[ue][Pe] = Te : (S[ue][Pe] = Se, F = !0);
            }
            for (const ue of Object.keys(S))
              Object.keys(S[ue]).length !== Object.keys($[ue] ?? {}).length && (F = !0);
            return F ? S : $;
          }), p(null);
        } catch (B) {
          x || p(B instanceof Error ? B.message : "Failed to load scalars.");
        } finally {
          k = !1;
        }
      }
    };
    E();
    const P = window.setInterval(E, g3);
    return () => {
      x = !0, window.clearInterval(P);
    };
  }, [g, t]);
  const C = (x) => e.filter(({ run: k }) => (r[k] ?? []).includes(x)).map(({ run: k, color: E }) => {
    var P;
    return { run: k, color: E, points: ((P = s[k]) == null ? void 0 : P[x]) ?? [] };
  }), b = e.filter(({ run: x }) => (r[x] ?? []).length > 0);
  if (e.length === 0)
    return { status: "empty-runs", error: null, groups: [], legend: b, seriesForTag: C };
  if (f)
    return { status: "error", error: f, groups: [], legend: b, seriesForTag: C };
  if (!e.every(({ run: x }) => x in r))
    return { status: "loading", error: null, groups: [], legend: b, seriesForTag: C };
  const z = /* @__PURE__ */ new Set(), Q = [];
  for (const { run: x } of e)
    for (const k of r[x] ?? [])
      z.has(k) || (z.add(k), Q.push(k));
  return Q.length === 0 ? { status: "no-tags", error: null, groups: [], legend: b, seriesForTag: C } : { status: "ready", error: null, groups: y3(Q), legend: b, seriesForTag: C };
}
function oc() {
  var e;
  try {
    return window.parent.document.body.classList.contains("dark-mode");
  } catch {
    return ((e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-color-scheme: dark)").matches) ?? !1;
  }
}
function S3() {
  const [e, t] = R.useState(oc);
  return R.useEffect(() => {
    let r;
    try {
      r = window.parent.document.body;
    } catch {
      return;
    }
    const o = new MutationObserver(() => {
      t(oc());
    });
    return o.observe(r, { attributes: !0, attributeFilter: ["class"] }), () => o.disconnect();
  }, []), e;
}
function mh(e) {
  return e.replace(/[^a-zA-Z0-9_.-]/g, "_");
}
function E3() {
  const e = DS();
  return /* @__PURE__ */ L.jsxs("div", { style: l4, children: [
    "Failed to initialize ImFusion WebSDK: ",
    e.message
  ] });
}
function b3({ isDark: e, color: t }) {
  const r = Tr();
  return R.useEffect(() => {
    const o = vh(rf(e).canvasBackground);
    r.display.setBackgroundColor(o);
    for (const s of [
      r.display.mainAxialView(),
      r.display.mainCoronalView(),
      r.display.mainSagittalView(),
      r.display.main3dView(),
      r.display.main2dView()
    ])
      s.setBackgroundColor(o);
    r.display.main3dView().setBorderColor(vh(t)), r.render();
  }, [r, e, t]), null;
}
const su = /* @__PURE__ */ new Set();
let lc = null;
const ls = /* @__PURE__ */ new Map();
function C3(e) {
  var t;
  lc = e, (t = ls.get(e)) == null || t();
}
const P3 = 1e3, R3 = 1e-4;
function gh(e) {
  const t = e.camera();
  try {
    return [...t.position, ...t.lookVector, ...t.upVector, t.fovY];
  } finally {
    t.delete();
  }
}
function T3(e, t) {
  const r = e.camera();
  try {
    r.setVectors([t[0], t[1], t[2]], [t[3], t[4], t[5]], [t[6], t[7], t[8]]), r.fovY = t[9], e.setCamera(r, !0);
  } finally {
    r.delete();
  }
}
function yh(e, t) {
  return e.every((r, o) => Math.abs(r - t[o]) < R3);
}
function L3({ caseName: e, linked: t, token: r }) {
  const o = Tr();
  return R.useEffect(() => {
    if (e === null || !t) return;
    const s = o.display.main3dView();
    let a = gh(s), f = 0, p = null;
    const g = (C) => {
      C.case !== e || yh(C.values, a) || (a = C.values, T3(s, C.values));
    };
    su.add(g);
    const y = () => {
      if (p = null, lc !== r) return;
      const C = gh(s);
      if (!yh(C, a)) {
        a = C;
        for (const b of su)
          b !== g && b({ case: e, values: C });
      }
      performance.now() < f && (p = requestAnimationFrame(y));
    }, w = () => {
      f = performance.now() + P3, p ?? (p = requestAnimationFrame(y));
    };
    ls.set(r, w);
    const D = o.display.onUpdateRequested(() => {
      lc === r && performance.now() < f && w();
    });
    return () => {
      su.delete(g), ls.get(r) === w && ls.delete(r), D(), p !== null && cancelAnimationFrame(p);
    };
  }, [o, e, t, r]), null;
}
function D3({ visible: e }) {
  const t = Tr();
  return R.useLayoutEffect(() => {
    if (!e)
      return t.pauseAutoResize(), t.pauseAutoRender(), () => {
        t.resumeAutoResize(), t.resumeAutoRender(), t.render();
      };
  }, [t, e]), null;
}
function F3({
  hiddenViews: e,
  viewsWithData: t,
  restoreToken: r,
  onMenuHide: o,
  onMaximizedChange: s
}) {
  const a = Tr(), f = R.useRef(e), p = R.useRef(t), g = R.useRef(o), y = R.useRef(s), w = R.useRef(null), D = R.useRef(r), C = R.useRef(!1);
  return R.useLayoutEffect(() => {
    p.current = t, g.current = o, y.current = s;
  }), R.useLayoutEffect(() => {
    const b = a.display, j = b.layouter(), z = w.current;
    w.current = e, f.current = e, C.current = !0;
    try {
      D.current !== r && (D.current = r, j.setMaximizedView(null), tu(b, e));
      for (const Q of Dn) {
        const x = Q.get(b);
        e.has(Q.name) ? j.isViewHidden(x) || j.setViewHidden(x, !0) : z != null && z.has(Q.name) && p.current.has(Q.name) && j.isViewHidden(x) && j.setViewHidden(x, !1);
      }
    } catch (Q) {
      console.warn("imfusion_viewer: could not apply hidden views", Q);
    } finally {
      C.current = !1;
    }
  }, [a, e, r]), R.useEffect(() => {
    const b = a.display, j = b.layouter();
    let z = !1, Q = !1;
    const x = (A) => {
      C.current = !0;
      try {
        A();
      } catch (I) {
        console.warn("imfusion_viewer: could not apply hidden views", I);
      } finally {
        C.current = !1;
      }
    }, k = () => {
      Q || (Q = !0, queueMicrotask(() => {
        Q = !1, z || x(() => tf(b, f.current));
      }));
    }, E = () => x(() => tu(b, f.current)), P = [];
    P.push(
      j.onViewHiddenChanged((A, I) => {
        if (C.current) return;
        const $ = Ob(b, A);
        $ && (I ? Bb() && !f.current.has($) && queueMicrotask(() => {
          z || (x(() => {
            j.setMaximizedView(null), tu(b, new Set(f.current).add($));
          }), g.current($));
        }) : f.current.has($) && k());
      })
    ), typeof j.onModeChanged == "function" && P.push(j.onModeChanged(k));
    let B = null, U = null;
    return P.push(
      jb(a, (A) => {
        const I = new Set(Dn.map((Z) => Z.name).filter((Z) => !f.current.has(Z) && p.current.has(Z))), $ = Nb(A, I, a.canvas);
        $ !== B && (B = $, y.current($));
        const S = $ === null && [...A.keys()].some((Z) => f.current.has(Z)) ? [...A.keys()].sort().join(",") : null;
        S !== null && S !== U && E(), U = S;
      })
    ), () => {
      z = !0;
      for (const A of P) A();
      B && y.current(null);
    };
  }, [a]), null;
}
function A3(e, t, r) {
  requestAnimationFrame(() => {
    e.render(), t.toBlob((o) => {
      if (!o) {
        console.error("imfusion_viewer: canvas.toBlob() returned null - export failed.");
        return;
      }
      const s = URL.createObjectURL(o), a = document.createElement("a");
      a.href = s, a.download = r, document.body.appendChild(a), a.click(), a.remove(), setTimeout(() => URL.revokeObjectURL(s), 1e3);
    }, "image/png");
  });
}
function $3({ canvasRef: e, run: t, caseName: r, step: o }) {
  const s = Tr(), a = R.useCallback(() => {
    const f = e.current;
    if (!f) return;
    const p = o !== null ? `epoch${o}` : "epoch_unknown", g = `${mh(t)}_${mh(r)}_${p}.png`;
    A3(s, f, g);
  }, [s, e, t, r, o]);
  return /* @__PURE__ */ L.jsx("button", { type: "button", onClick: a, style: mm, children: "Export PNG" });
}
function M3(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e)
    for (const o of r ?? []) for (const s of Mb(o.kind)) t.add(s);
  return t;
}
function O3({
  run: e,
  color: t,
  visible: r,
  isDark: o,
  licenseToken: s,
  linkCameras: a,
  hiddenViews: f,
  layoutRestoreToken: p,
  onMenuHideView: g,
  onMaximizedChange: y,
  selection: w,
  caseMeta: D,
  overlayRuns: C,
  onCurrentStepChange: b,
  controlsContainer: j,
  overlayControlsContainers: z
}) {
  const Q = R.useRef(null), x = C.map((Te) => Te.run).sort().join(","), k = M3([D == null ? void 0 : D.layers, ...C.map((Te) => Te.initialLayers)]), [E, P] = R.useState(null), [B, U] = R.useState(0), [A, I] = R.useState(!1), [$] = R.useState(() => ({})), [F] = R.useState(() => document.createElement("div"));
  R.useLayoutEffect(() => {
    if (j)
      return j.appendChild(F), () => F.remove();
  }, [j, F]);
  const S = R.useCallback(() => {
    I(!1), U((Te) => Te + 1);
  }, []);
  R.useEffect(() => {
    const Te = Q.current;
    if (!Te) return;
    const dt = (ae) => {
      ae.preventDefault(), I(!0);
    };
    return Te.addEventListener("webglcontextlost", dt), Te.addEventListener("webglcontextrestored", S), () => {
      Te.removeEventListener("webglcontextlost", dt), Te.removeEventListener("webglcontextrestored", S), setTimeout(() => {
        var ae, ye;
        Te.isConnected || (ye = (ae = Te.getContext("webgl2")) == null ? void 0 : ae.getExtension("WEBGL_lose_context")) == null || ye.loseContext();
      }, 0);
    };
  }, [B, S]);
  const Z = R.useCallback(
    (Te) => {
      P(Te), b == null || b(Te);
    },
    [b]
  ), ue = R.useCallback(
    (Te) => {
      const dt = Te.target;
      (dt === Q.current || dt instanceof Element && dt.closest("[data-imf-context-menu]")) && C3($);
    },
    [$]
  ), Pe = R.useCallback((Te) => y(e, Te), [y, e]), Se = R.useCallback(
    (Te) => {
      Te.buttons !== 0 && ue(Te);
    },
    [ue]
  );
  return /* @__PURE__ */ L.jsxs("div", { style: q3, children: [
    /* @__PURE__ */ L.jsx("div", { style: J3, children: /* @__PURE__ */ L.jsxs("div", { style: e4, children: [
      /* @__PURE__ */ L.jsx("span", { style: { ...t4, background: t } }),
      /* @__PURE__ */ L.jsx("span", { style: r4, title: e, children: e })
    ] }) }),
    /* @__PURE__ */ L.jsx(
      CS,
      {
        options: { autoResize: !0, uiAnimations: !1, licenseToken: s ?? void 0 },
        children: /* @__PURE__ */ L.jsxs(
          "div",
          {
            style: n4,
            onPointerDownCapture: ue,
            onPointerMoveCapture: Se,
            onWheelCapture: ue,
            onContextMenuCapture: ue,
            children: [
              /* @__PURE__ */ L.jsx(PS, { ref: Q, style: Y3 }),
              /* @__PURE__ */ L.jsx(TS, { children: /* @__PURE__ */ L.jsx("div", { style: $s, children: "Initializing ImFusion WebSDK…" }) }),
              /* @__PURE__ */ L.jsx(LS, { children: /* @__PURE__ */ L.jsx(E3, {}) }),
              /* @__PURE__ */ L.jsxs(RS, { children: [
                /* @__PURE__ */ L.jsx(b3, { isDark: o, color: t }),
                /* @__PURE__ */ L.jsx(D3, { visible: r }),
                /* @__PURE__ */ L.jsx(
                  F3,
                  {
                    hiddenViews: f,
                    viewsWithData: k,
                    restoreToken: p,
                    onMenuHide: g,
                    onMaximizedChange: Pe
                  }
                ),
                /* @__PURE__ */ L.jsx(L3, { caseName: (w == null ? void 0 : w.case) ?? null, linked: a, token: $ }),
                /* @__PURE__ */ L.jsx(Yb, {}),
                !(w && D) && /* @__PURE__ */ L.jsx("div", { style: $s, children: "Select a case from the list to begin." }),
                Ds.createPortal(
                  w && D ? /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                    /* @__PURE__ */ L.jsx(
                      pC,
                      {
                        run: w.run,
                        caseName: w.case,
                        initialLayers: D.layers,
                        initialSteps: D.steps,
                        overlayRuns: C,
                        overlayContainers: z,
                        hiddenViews: f,
                        onCurrentStepChange: Z
                      },
                      `${w.run} ${w.case} ${x}`
                    ),
                    /* @__PURE__ */ L.jsx("div", { style: i4, children: /* @__PURE__ */ L.jsx(
                      $3,
                      {
                        canvasRef: Q,
                        run: w.run,
                        caseName: w.case,
                        step: E
                      }
                    ) })
                  ] }) : /* @__PURE__ */ L.jsx("div", { style: o4, children: "No case selected." }),
                  F
                )
              ] }),
              A && /* @__PURE__ */ L.jsxs("div", { style: s4, children: [
                /* @__PURE__ */ L.jsx("span", { children: "The WebGL context was lost." }),
                /* @__PURE__ */ L.jsx("button", { type: "button", onClick: S, style: a4, children: "Reload" })
              ] })
            ]
          }
        )
      },
      B
    )
  ] });
}
const I3 = 4;
function j3() {
  var ir, at;
  const e = S3(), t = rf(e), [r, o] = R.useState(/* @__PURE__ */ new Map()), [s, a] = R.useState(null), [f, p] = R.useState(/* @__PURE__ */ new Set()), [g, y] = R.useState([]), [w, D] = R.useState([]), [C, b] = R.useState(null), [j, z] = R.useState(void 0), [Q, x] = R.useState(!0), [k, E] = R.useState(!1), [P, B] = R.useState(() => /* @__PURE__ */ new Map()), U = R.useRef(/* @__PURE__ */ new Map()), A = R.useCallback((V) => {
    let me = U.current.get(V);
    return me || (me = (de) => {
      if (de)
        return B((ke) => ke.get(V) === de ? ke : new Map(ke).set(V, de)), () => B((ke) => {
          if (ke.get(V) !== de) return ke;
          const Me = new Map(ke);
          return Me.delete(V), Me;
        });
    }, U.current.set(V, me)), me;
  }, []), [I, $] = R.useState(() => /* @__PURE__ */ new Set()), [F, S] = R.useState(0), Z = R.useCallback((V, me) => {
    $((de) => {
      const ke = new Set(de);
      return me ? ke.delete(V) : ke.add(V), ke;
    }), S((de) => de + 1);
  }, []), ue = R.useCallback((V) => {
    $((me) => me.has(V) ? me : new Set(me).add(V));
  }, []), [Pe, Se] = R.useState(() => /* @__PURE__ */ new Map()), Te = R.useCallback((V, me) => {
    Se((de) => {
      if ((de.get(V) ?? null) === me) return de;
      const ke = new Map(de);
      return me ? ke.set(V, me) : ke.delete(V), ke;
    });
  }, []);
  R.useEffect(() => {
    cb().then(z, (V) => {
      console.warn("imfusion_viewer: could not fetch the WebSDK license token", V), z(null);
    });
  }, []);
  const dt = R.useCallback((V, me) => {
    a(me), o((de) => {
      const ke = new Map(de);
      return ke.set(V.run, V.case), ke;
    }), p((de) => de.has(V.run) ? de : new Set(de).add(V.run));
  }, []), ae = R.useCallback((V) => {
    p((me) => {
      const de = new Set(me);
      return de.has(V) ? de.delete(V) : de.add(V), de;
    });
  }, []), ye = R.useCallback((V) => {
    p((me) => {
      const de = V.length > 0 && V.every((Me) => me.has(Me)), ke = new Set(me);
      for (const Me of V)
        de ? ke.delete(Me) : ke.add(Me);
      return ke;
    });
  }, []), xe = gb(s ? Object.keys(s) : []), De = (s ? Object.keys(s).sort() : []).filter((V) => f.has(V)).map((V) => ({ run: V, color: xe.get(V) ?? Qo[0] })), Vt = De.map(({ run: V }) => {
    const de = Object.values((s == null ? void 0 : s[V]) ?? {}).reduce((ke, Me) => Math.max(ke, Me.steps[Me.steps.length - 1] ?? -1), -1);
    return `${V}:${de}`;
  }).join(","), Wt = k3(De, Vt), vr = [...f].filter((V) => !g.includes(V));
  vr.length > 0 && (y((V) => [...V, ...vr]), o((V) => {
    let me = !1;
    const de = new Map(V);
    for (const ke of vr) {
      if (de.has(ke)) continue;
      const Me = s ? Object.keys(s[ke] ?? {}) : [];
      Me.length === 1 && (de.set(ke, Me[0]), me = !0);
    }
    return me ? de : V;
  }));
  const mt = f.size, mr = k && mt >= 2, on = g.find((V) => f.has(V)), rr = g.map((V) => {
    var ve;
    const me = r.get(V), de = me !== void 0 ? { run: V, case: me } : null, ke = de ? (ve = s == null ? void 0 : s[de.run]) == null ? void 0 : ve[de.case] : void 0, Me = f.has(V), Gt = V === on;
    return {
      run: V,
      color: xe.get(V) ?? Qo[0],
      selection: de,
      caseMeta: ke,
      active: Me,
      isPrimary: Gt,
      // In combined mode every other active run folds into the primary column.
      showAsColumn: Me && (!mr || Gt)
    };
  }), Nr = rr.filter((V) => V.showAsColumn).map((V) => V.run), ln = [...Nr, ...w.filter((V) => !Nr.includes(V))];
  ln.join(`
`) !== w.join(`
`) && D(ln);
  const ii = new Set(ln.slice(0, Math.max(I3, Nr.length))), gr = {
    ...N3,
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
  }, nr = new Set(rr.filter((V) => V.active).map((V) => V.run)), yr = (at = (ir = rr.find((V) => V.isPrimary)) == null ? void 0 : ir.selection) == null ? void 0 : at.case, Mn = mr ? rr.filter((V) => V.active && !V.isPrimary && V.selection).map((V) => {
    var me, de, ke, Me;
    return {
      run: V.run,
      color: V.color,
      initialLayers: yr ? (de = (me = s == null ? void 0 : s[V.run]) == null ? void 0 : me[yr]) == null ? void 0 : de.layers : void 0,
      initialSteps: yr ? (Me = (ke = s == null ? void 0 : s[V.run]) == null ? void 0 : ke[yr]) == null ? void 0 : Me.steps : void 0
    };
  }) : [], _t = new Map(
    Mn.map((V) => [V.run, P.get(V.run) ?? null])
  ), $e = j === void 0 ? null : {
    isDark: e,
    licenseToken: j,
    linkCameras: Q,
    hiddenViews: I,
    layoutRestoreToken: F,
    onMenuHideView: ue,
    onMaximizedChange: Te
  }, Xi = rr.some(
    (V) => {
      var me;
      return V.active && ((me = V.caseMeta) == null ? void 0 : me.layers.some((de) => de.kind === "image"));
    }
  ), Pt = rr.filter((V) => V.showAsColumn), Ue = Pt.flatMap((V) => {
    const me = Pe.get(V.run);
    return me ? [{ run: V.run, name: me }] : [];
  }), sn = (V) => Pt.some((me) => (Pe.get(me.run) ?? V) === V), zr = (V) => {
    var me;
    return ((me = Dn.find((de) => de.name === V)) == null ? void 0 : me.label) ?? V;
  }, Ht = /* @__PURE__ */ L.jsxs("div", { style: V3, children: [
    Dn.filter((V) => V.name !== "2d" || Xi || I.has("2d")).map((V) => {
      const me = Ue.some((ke) => ke.name === V.name), de = !I.has(V.name) && Ue.length > 0 && !sn(V.name);
      return /* @__PURE__ */ L.jsxs(
        "label",
        {
          style: de ? W3 : hm,
          title: me ? "Maximized" : de ? "Hidden while another pane is maximized" : void 0,
          children: [
            /* @__PURE__ */ L.jsx(
              "input",
              {
                type: "checkbox",
                checked: !I.has(V.name),
                onChange: (ke) => Z(V.name, ke.target.checked)
              }
            ),
            V.label,
            me && " ⤢"
          ]
        },
        V.name
      );
    }),
    /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        style: Ue.length > 0 ? H3 : vm,
        title: "Un-maximize any pane maximized with its ⤢ corner button, in every column",
        onClick: () => S((V) => V + 1),
        children: "Restore layout"
      }
    ),
    Ue.length > 0 && /* @__PURE__ */ L.jsxs("div", { style: G3, children: [
      Ue.map((V) => Pt.length > 1 ? `${zr(V.name)} (${V.run})` : zr(V.name)).join(", "),
      " ",
      "maximized. Restore layout, or change a pane above, to show the others."
    ] })
  ] }), an = /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsxs("label", { style: wh, title: "Orbiting one run's 3D view moves every other column showing the same case", children: [
      /* @__PURE__ */ L.jsx(
        "input",
        {
          type: "checkbox",
          checked: Q,
          disabled: k || mt < 2,
          onChange: (V) => x(V.target.checked)
        }
      ),
      /* @__PURE__ */ L.jsx("span", { style: k || mt < 2 ? _h : void 0, children: "Link 3D cameras" })
    ] }),
    /* @__PURE__ */ L.jsxs(
      "label",
      {
        style: wh,
        title: "Show every checked run's layers together in one shared viewer, colored per run, instead of separate side-by-side columns",
        children: [
          /* @__PURE__ */ L.jsx(
            "input",
            {
              type: "checkbox",
              checked: k,
              disabled: mt < 2,
              onChange: (V) => E(V.target.checked)
            }
          ),
          /* @__PURE__ */ L.jsx("span", { style: mt < 2 ? _h : void 0, children: "Combine into one workspace" })
        ]
      }
    )
  ] });
  return /* @__PURE__ */ L.jsxs("div", { style: gr, children: [
    /* @__PURE__ */ L.jsxs("aside", { style: z3, children: [
      /* @__PURE__ */ L.jsxs("div", { style: B3, children: [
        /* @__PURE__ */ L.jsx("h1", { style: U3, children: "ImFusion Viewer" }),
        /* @__PURE__ */ L.jsx(IS, { isDark: e })
      ] }),
      /* @__PURE__ */ L.jsxs(hh, { label: "Viewer Control", children: [
        Ht,
        an
      ] }),
      /* @__PURE__ */ L.jsx(hh, { label: "Runs", children: /* @__PURE__ */ L.jsx(
        _b,
        {
          selectedCaseByRun: r,
          onSelect: dt,
          onCasesUpdate: a,
          checkedRuns: f,
          onToggleRun: ae,
          onToggleAllRuns: ye,
          runColors: xe,
          activeControlsRuns: nr,
          registerControlsContainer: A
        }
      ) }),
      /* @__PURE__ */ L.jsx(t3, { data: Wt, currentStep: C })
    ] }),
    /* @__PURE__ */ L.jsx("main", { style: X3, children: /* @__PURE__ */ L.jsx("div", { style: K3, children: $e && rr.filter(({ run: V }) => ii.has(V)).map(({ run: V, color: me, selection: de, caseMeta: ke, showAsColumn: Me, isPrimary: Gt }) => /* @__PURE__ */ L.jsx("div", { style: Me ? Q3 : Z3, children: /* @__PURE__ */ L.jsx(
      O3,
      {
        ...$e,
        run: V,
        color: me,
        visible: Me,
        selection: de,
        caseMeta: ke,
        overlayRuns: Gt ? Mn : [],
        overlayControlsContainers: Gt ? _t : void 0,
        onCurrentStepChange: Gt ? b : void 0,
        controlsContainer: Me ? P.get(V) ?? null : null
      }
    ) }, V)) }) })
  ] });
}
const N3 = {
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
}, z3 = {
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
  // The sidebar's single scroll container (sections don't scroll on their own).
  overflowY: "auto",
  overscrollBehavior: "contain"
}, B3 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8
}, U3 = {
  font: "inherit",
  margin: 0
}, wh = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer"
}, _h = {
  opacity: 0.45
}, V3 = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "4px 10px",
  marginBottom: 4
}, hm = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  opacity: 0.85,
  cursor: "pointer"
}, W3 = {
  ...hm,
  opacity: 0.45
}, vm = {
  font: "inherit",
  fontSize: "0.85em",
  padding: 0,
  border: "none",
  background: "transparent",
  color: "inherit",
  opacity: 0.6,
  cursor: "pointer",
  textDecoration: "underline"
}, H3 = {
  ...vm,
  opacity: 1,
  color: "var(--tb-accent)"
}, G3 = {
  flexBasis: "100%",
  fontSize: "0.85em",
  opacity: 0.7
}, X3 = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
}, Y3 = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block"
}, K3 = {
  flex: 1,
  minHeight: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gridAutoRows: "minmax(320px, 1fr)",
  gap: 8,
  padding: 8,
  overflow: "auto"
}, Q3 = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  border: "1px solid var(--tb-border)",
  borderRadius: 8,
  overflow: "hidden"
}, Z3 = {
  display: "none"
}, q3 = {
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
}, J3 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexShrink: 0,
  padding: "6px 10px",
  background: "var(--tb-surface)",
  borderBottom: "1px solid var(--tb-border)",
  overflow: "hidden"
}, e4 = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
  overflow: "hidden"
}, t4 = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  flexShrink: 0,
  display: "inline-block"
}, r4 = {
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, n4 = {
  position: "relative",
  width: "100%",
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  overflow: "hidden",
  background: "var(--tb-canvas-bg)"
}, i4 = {
  padding: "0 10px 4px"
}, mm = {
  width: "100%",
  font: "inherit",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid var(--tb-border)",
  background: "var(--tb-surface)",
  color: "inherit",
  cursor: "pointer"
}, o4 = {
  padding: "4px 0",
  fontSize: 13,
  opacity: 0.55
}, $s = {
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
}, l4 = {
  ...$s,
  color: "var(--tb-error)"
}, s4 = {
  ...$s,
  flexDirection: "column",
  gap: 10,
  opacity: 1,
  background: "var(--tb-canvas-bg)"
}, a4 = {
  ...mm,
  width: "auto",
  padding: "6px 16px"
};
M0({ url: new URL("./wasm/ImFusionLib.wasm", import.meta.url) });
const u4 = `
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
function c4() {
  if (document.getElementById("imfusion-viewer-roboto-fontface")) return;
  const e = document.createElement("style");
  e.id = "imfusion-viewer-roboto-fontface", e.textContent = u4, document.head.appendChild(e);
}
function m4() {
  c4();
  const e = document.createElement("div");
  e.id = "imfusion-viewer-root", e.style.width = "100vw", e.style.height = "100vh", document.documentElement.style.margin = "0", document.documentElement.style.height = "100%", document.body.style.margin = "0", document.body.style.height = "100%", document.body.style.background = rf(oc()).background, document.body.appendChild(e), A0(e).render(/* @__PURE__ */ L.jsx(j3, {}));
}
const f4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  m4 as render
};
