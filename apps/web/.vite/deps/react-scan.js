"use client";
import {
  Li,
  zr
} from "./chunk-UZ3NOUD3.js";
import {
  C,
  Le
} from "./chunk-HNU6O7RQ.js";
import "./chunk-PX6F3LHL.js";

// ../../node_modules/react-scan/node_modules/bippy/dist/rdt-hook.js
var e = `0.5.43`;
var t = `bippy-${e}`;
var n = Object.defineProperty;
var r = Object.prototype.hasOwnProperty;
var i = () => {
};
var a = (e5) => {
  try {
    Function.prototype.toString.call(e5).indexOf(`^_^`) > -1 && setTimeout(() => {
      throw Error(`React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build`);
    });
  } catch {
  }
};
var o = (e5 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) => !!(e5 && `getFiberRoots` in e5);
var s = false;
var c;
var l = (e5 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) => s ? true : (e5 && typeof e5.inject == `function` && (c = e5.inject.toString()), !!c?.includes(`(injected)`));
var u = /* @__PURE__ */ new Set();
var d = /* @__PURE__ */ new Set();
var f = (e5) => {
  let r6 = /* @__PURE__ */ new Map(), o5 = 0, s5 = { _instrumentationIsActive: false, _instrumentationSource: t, checkDCE: a, hasUnsupportedRendererAttached: false, inject(e6) {
    let t5 = ++o5;
    return r6.set(t5, e6), d.add(e6), s5._instrumentationIsActive || (s5._instrumentationIsActive = true, u.forEach((e7) => e7())), t5;
  }, on: i, onCommitFiberRoot: i, onCommitFiberUnmount: i, onPostCommitFiberRoot: i, renderers: r6, supportsFiber: true, supportsFlight: true };
  try {
    n(globalThis, `__REACT_DEVTOOLS_GLOBAL_HOOK__`, { configurable: true, enumerable: true, get() {
      return s5;
    }, set(t6) {
      if (t6 && typeof t6 == `object`) {
        let n4 = s5.renderers;
        s5 = t6, n4.size > 0 && (n4.forEach((e6, n5) => {
          d.add(e6), t6.renderers.set(n5, e6);
        }), p(e5));
      }
    } });
    let t5 = window.hasOwnProperty, r7 = false;
    n(window, `hasOwnProperty`, { configurable: true, value: function(...e6) {
      try {
        if (!r7 && e6[0] === `__REACT_DEVTOOLS_GLOBAL_HOOK__`) return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__ = void 0, r7 = true, -0;
      } catch {
      }
      return t5.apply(this, e6);
    }, writable: true });
  } catch {
    p(e5);
  }
  return s5;
};
var p = (e5) => {
  e5 && u.add(e5);
  try {
    let n4 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!n4) return;
    if (!n4._instrumentationSource) {
      n4.checkDCE = a, n4.supportsFiber = true, n4.supportsFlight = true, n4.hasUnsupportedRendererAttached = false, n4._instrumentationSource = t, n4._instrumentationIsActive = false;
      let e6 = o(n4);
      if (e6 || (n4.on = i), n4.renderers.size) {
        n4._instrumentationIsActive = true, u.forEach((e7) => e7());
        return;
      }
      let r6 = n4.inject, c5 = l(n4);
      c5 && !e6 && (s = true, n4.inject({ scheduleRefresh() {
      } }) && (n4._instrumentationIsActive = true)), n4.inject = (e7) => {
        let t5 = r6(e7);
        return d.add(e7), c5 && n4.renderers.set(t5, e7), n4._instrumentationIsActive = true, u.forEach((e8) => e8()), t5;
      };
    }
    (n4.renderers.size || n4._instrumentationIsActive || l()) && e5?.();
  } catch {
  }
};
var m = () => r.call(globalThis, `__REACT_DEVTOOLS_GLOBAL_HOOK__`);
var h = (e5) => m() ? (p(e5), globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) : f(e5);
var g = () => !!(typeof window < `u` && (window.document?.createElement || window.navigator?.product === `ReactNative`));
var _ = () => {
  try {
    g() && h();
  } catch {
  }
};

// ../../node_modules/react-scan/node_modules/bippy/dist/install-hook-only.js
_();

// ../../node_modules/react-scan/node_modules/bippy/dist/core.js
var d2 = 0;
var ee = 1;
var re = 11;
var ie = 13;
var ae = 14;
var oe = 15;
var g2 = 60111;
var _2 = `Symbol(react.concurrent_mode)`;
var v = `Symbol(react.async_mode)`;
var y = 13366;
var b = (e5) => {
  switch (e5.tag) {
    case 5:
    case 26:
    case 27:
      return true;
    default:
      return typeof e5.type == `string`;
  }
};
var be = (e5) => {
  switch (e5.tag) {
    case 1:
    case 11:
    case 0:
    case 14:
    case 15:
      return true;
    default:
      return false;
  }
};
var Ce = (e5, t5) => {
  try {
    let n4 = e5.dependencies, r6 = e5.alternate?.dependencies;
    if (!n4 || !r6 || typeof n4 != `object` || !(`firstContext` in n4) || typeof r6 != `object` || !(`firstContext` in r6)) return false;
    let i5 = n4.firstContext, a5 = r6.firstContext;
    for (; i5 && typeof i5 == `object` && `memoizedValue` in i5 || a5 && typeof a5 == `object` && `memoizedValue` in a5; ) {
      if (t5(i5, a5) === true) return true;
      i5 = i5?.next, a5 = a5?.next;
    }
  } catch {
  }
  return false;
};
var S = (e5, t5) => {
  try {
    let n4 = e5.memoizedProps, r6 = e5.alternate?.memoizedProps || {}, i5 = /* @__PURE__ */ new Set([...Object.keys(n4), ...Object.keys(r6)]);
    for (let e6 of i5) {
      let i6 = r6?.[e6], a5 = n4?.[e6];
      if (t5(e6, a5, i6) === true) return true;
    }
  } catch {
  }
  return false;
};
var C2 = (e5) => {
  let t5 = e5.memoizedProps, n4 = e5.alternate?.memoizedProps || {}, r6 = e5.flags ?? e5.effectTag ?? 0;
  switch (e5.tag) {
    case 1:
    case 9:
    case 11:
    case 0:
    case 14:
    case 15:
      return (r6 & 1) == 1;
    default:
      return e5.alternate ? n4 !== t5 || e5.alternate.memoizedState !== e5.memoizedState || e5.alternate.ref !== e5.ref : true;
  }
};
var w = (e5) => !!(e5.flags & (y | 8) || e5.subtreeFlags & (y | 8));
var T = (e5) => {
  let t5 = [], n4 = [e5];
  for (; n4.length; ) {
    let e6 = n4.pop();
    e6 && (b(e6) && w(e6) && C2(e6) && t5.push(e6), e6.child && n4.push(e6.child), e6.sibling && n4.push(e6.sibling));
  }
  return t5;
};
var D = (e5) => {
  switch (e5.tag) {
    case 18:
      return true;
    case 7:
    case 6:
    case 23:
    case 22:
      return true;
    case 3:
      return false;
    default: {
      let t5 = typeof e5.type == `object` && e5.type !== null ? e5.type.$$typeof : e5.type;
      switch (typeof t5 == `symbol` ? t5.toString() : t5) {
        case g2:
        case _2:
        case v:
          return true;
        default:
          return false;
      }
    }
  }
};
var k = (e5) => {
  let t5 = [], n4 = [];
  for (b(e5) ? t5.push(e5) : e5.child && n4.push(e5.child); n4.length; ) {
    let e6 = n4.pop();
    if (!e6) break;
    b(e6) ? t5.push(e6) : e6.child && n4.push(e6.child), e6.sibling && n4.push(e6.sibling);
  }
  return t5;
};
function A(e5, t5, n4 = false) {
  if (!e5) return null;
  let r6 = t5(e5);
  if (r6 instanceof Promise) return (async () => {
    if (await r6 === true) return e5;
    let i6 = n4 ? e5.return : e5.child;
    for (; i6; ) {
      let e6 = await M(i6, t5, n4);
      if (e6) return e6;
      i6 = n4 ? null : i6.sibling;
    }
    return null;
  })();
  if (r6 === true) return e5;
  let i5 = n4 ? e5.return : e5.child;
  for (; i5; ) {
    let e6 = j(i5, t5, n4);
    if (e6) return e6;
    i5 = n4 ? null : i5.sibling;
  }
  return null;
}
var j = (e5, t5, n4 = false) => {
  if (!e5) return null;
  if (t5(e5) === true) return e5;
  let r6 = n4 ? e5.return : e5.child;
  for (; r6; ) {
    let e6 = j(r6, t5, n4);
    if (e6) return e6;
    r6 = n4 ? null : r6.sibling;
  }
  return null;
};
var M = async (e5, t5, n4 = false) => {
  if (!e5) return null;
  if (await t5(e5) === true) return e5;
  let r6 = n4 ? e5.return : e5.child;
  for (; r6; ) {
    let e6 = await M(r6, t5, n4);
    if (e6) return e6;
    r6 = n4 ? null : r6.sibling;
  }
  return null;
};
var we = (e5) => {
  let t5 = e5?.actualDuration ?? 0, n4 = t5, r6 = e5?.child ?? null;
  for (; t5 > 0 && r6 != null; ) n4 -= r6.actualDuration ?? 0, r6 = r6.sibling;
  return { selfTime: n4, totalTime: t5 };
};
var Te = (e5) => !!e5.updateQueue?.memoCache;
var N = (e5) => {
  let t5 = e5;
  return typeof t5 == `function` ? t5 : typeof t5 == `object` && t5 ? N(t5.type || t5.render) : null;
};
var Ee = (e5) => {
  let t5 = e5;
  if (typeof t5 == `string`) return t5;
  if (typeof t5 != `function` && !(typeof t5 == `object` && t5)) return null;
  let n4 = t5.displayName || t5.name || null;
  if (n4) return n4;
  let r6 = N(t5);
  return r6 && (r6.displayName || r6.name) || null;
};
var P = (e5) => {
  try {
    if (typeof e5.version == `string` && e5.bundleType > 0) return `development`;
  } catch {
  }
  return `production`;
};
var De = () => {
  let e5 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  return !!e5?._instrumentationIsActive || o(e5) || l(e5);
};
var F = 0;
var I = /* @__PURE__ */ new WeakMap();
var L = (e5, t5 = F++) => {
  I.set(e5, t5);
};
var R = (e5) => {
  let t5 = I.get(e5);
  return !t5 && e5.alternate && (t5 = I.get(e5.alternate)), t5 || (t5 = F++, L(e5, t5)), t5;
};
var z = (e5, t5, n4) => {
  let r6 = t5;
  for (; r6 != null; ) {
    if (I.has(r6) || R(r6), !D(r6) && C2(r6) && e5(r6, `mount`), r6.tag === 13) if (r6.memoizedState !== null) {
      let t6 = r6.child, n5 = t6 ? t6.sibling : null;
      if (n5) {
        let t7 = n5.child;
        t7 !== null && z(e5, t7, false);
      }
    } else {
      let t6 = null;
      r6.child !== null && (t6 = r6.child.child), t6 !== null && z(e5, t6, false);
    }
    else r6.child != null && z(e5, r6.child, true);
    r6 = n4 ? r6.sibling : null;
  }
};
var B = (e5, t5, n4, r6) => {
  if (I.has(t5) || R(t5), !n4) return;
  I.has(n4) || R(n4);
  let i5 = t5.tag === 13, a5 = !D(t5);
  a5 && C2(t5) && e5(t5, `update`);
  let o5 = i5 && n4.memoizedState !== null, s5 = i5 && t5.memoizedState !== null;
  if (o5 && s5) {
    let r7 = t5.child?.sibling ?? null, i6 = n4.child?.sibling ?? null;
    r7 !== null && i6 !== null && B(e5, r7, i6, t5);
  } else if (o5 && !s5) {
    let n5 = t5.child;
    n5 !== null && z(e5, n5, true);
  } else if (!o5 && s5) {
    H(e5, n4);
    let r7 = t5.child?.sibling ?? null;
    r7 !== null && z(e5, r7, true);
  } else if (t5.child !== n4.child) {
    let n5 = t5.child;
    for (; n5; ) {
      if (n5.alternate) {
        let i6 = n5.alternate;
        B(e5, n5, i6, a5 ? t5 : r6);
      } else z(e5, n5, false);
      n5 = n5.sibling;
    }
  }
};
var V = (e5, t5) => {
  (t5.tag === 3 || !D(t5)) && e5(t5, `unmount`);
};
var H = (e5, t5) => {
  let n4 = t5.tag === 13 && t5.memoizedState !== null, r6 = t5.child;
  for (n4 && (r6 = (t5.child?.sibling ?? null)?.child ?? null); r6 !== null; ) r6.return !== null && (V(e5, r6), H(e5, r6)), r6 = r6.sibling;
};
var ke = 0;
var U = /* @__PURE__ */ new WeakMap();
var Ae = (e5, t5) => {
  let n4 = `current` in e5 ? e5.current : e5, r6 = U.get(e5);
  r6 || (r6 = { id: ke++, prevFiber: null }, U.set(e5, r6));
  let { prevFiber: i5 } = r6;
  if (!n4) V(t5, n4);
  else if (i5 !== null) {
    let e6 = i5 && i5.memoizedState != null && i5.memoizedState.element != null && i5.memoizedState.isDehydrated !== true, r7 = n4.memoizedState != null && n4.memoizedState.element != null && n4.memoizedState.isDehydrated !== true;
    !e6 && r7 ? z(t5, n4, false) : e6 && r7 ? B(t5, n4, n4.alternate, null) : e6 && !r7 && V(t5, n4);
  } else z(t5, n4, true);
  r6.prevFiber = n4;
};
var Ne = (e5) => {
  let t5 = h(e5.onActive);
  t5._instrumentationSource = e5.name ?? t;
  let n4 = t5.onCommitFiberRoot;
  if (e5.onCommitFiberRoot) {
    let r7 = (t6, i6, a5) => {
      n4 !== r7 && (n4?.(t6, i6, a5), e5.onCommitFiberRoot?.(t6, i6, a5));
    };
    t5.onCommitFiberRoot = r7;
  }
  let r6 = t5.onCommitFiberUnmount;
  if (e5.onCommitFiberUnmount) {
    let n5 = (i6, a5) => {
      t5.onCommitFiberUnmount === n5 && (r6?.(i6, a5), e5.onCommitFiberUnmount?.(i6, a5));
    };
    t5.onCommitFiberUnmount = n5;
  }
  let i5 = t5.onPostCommitFiberRoot;
  if (e5.onPostCommitFiberRoot) {
    let n5 = (r7, a5) => {
      t5.onPostCommitFiberRoot === n5 && (i5?.(r7, a5), e5.onPostCommitFiberRoot?.(r7, a5));
    };
    t5.onPostCommitFiberRoot = n5;
  }
  return t5;
};
var Z = Error();

// ../../node_modules/preact/dist/preact.module.js
var n2;
var l2;
var u2;
var t2;
var i2;
var r2;
var o2;
var e2;
var f3;
var c2;
var a2;
var s2;
var h3;
var p3;
var v2;
var y2;
var d3 = {};
var w2 = [];
var _3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g3 = Array.isArray;
function m3(n4, l6) {
  for (var u6 in l6) n4[u6] = l6[u6];
  return n4;
}
function b2(n4) {
  n4 && n4.parentNode && n4.parentNode.removeChild(n4);
}
function k2(l6, u6, t5) {
  var i5, r6, o5, e5 = {};
  for (o5 in u6) "key" == o5 ? i5 = u6[o5] : "ref" == o5 ? r6 = u6[o5] : e5[o5] = u6[o5];
  if (arguments.length > 2 && (e5.children = arguments.length > 3 ? n2.call(arguments, 2) : t5), "function" == typeof l6 && null != l6.defaultProps) for (o5 in l6.defaultProps) void 0 === e5[o5] && (e5[o5] = l6.defaultProps[o5]);
  return x2(l6, e5, i5, r6, null);
}
function x2(n4, t5, i5, r6, o5) {
  var e5 = { type: n4, props: t5, key: i5, ref: r6, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o5 ? ++u2 : o5, __i: -1, __u: 0 };
  return null == o5 && null != l2.vnode && l2.vnode(e5), e5;
}
function S2(n4) {
  return n4.children;
}
function C3(n4, l6) {
  this.props = n4, this.context = l6;
}
function $(n4, l6) {
  if (null == l6) return n4.__ ? $(n4.__, n4.__i + 1) : null;
  for (var u6; l6 < n4.__k.length; l6++) if (null != (u6 = n4.__k[l6]) && null != u6.__e) return u6.__e;
  return "function" == typeof n4.type ? $(n4) : null;
}
function I2(n4) {
  if (n4.__P && n4.__d) {
    var u6 = n4.__v, t5 = u6.__e, i5 = [], r6 = [], o5 = m3({}, u6);
    o5.__v = u6.__v + 1, l2.vnode && l2.vnode(o5), q2(n4.__P, o5, u6, n4.__n, n4.__P.namespaceURI, 32 & u6.__u ? [t5] : null, i5, null == t5 ? $(u6) : t5, !!(32 & u6.__u), r6), o5.__v = u6.__v, o5.__.__k[o5.__i] = o5, D2(i5, o5, r6), u6.__e = u6.__ = null, o5.__e != t5 && P2(o5);
  }
}
function P2(n4) {
  if (null != (n4 = n4.__) && null != n4.__c) return n4.__e = n4.__c.base = null, n4.__k.some(function(l6) {
    if (null != l6 && null != l6.__e) return n4.__e = n4.__c.base = l6.__e;
  }), P2(n4);
}
function A2(n4) {
  (!n4.__d && (n4.__d = true) && i2.push(n4) && !H2.__r++ || r2 != l2.debounceRendering) && ((r2 = l2.debounceRendering) || o2)(H2);
}
function H2() {
  try {
    for (var n4, l6 = 1; i2.length; ) i2.length > l6 && i2.sort(e2), n4 = i2.shift(), l6 = i2.length, I2(n4);
  } finally {
    i2.length = H2.__r = 0;
  }
}
function L2(n4, l6, u6, t5, i5, r6, o5, e5, f7, c5, a5) {
  var s5, h7, p7, v5, y6, _7, g8 = t5 && t5.__k || w2, m7 = l6.length;
  for (f7 = T2(u6, l6, g8, f7, m7), s5 = 0; s5 < m7; s5++) null != (p7 = u6.__k[s5]) && (h7 = -1 != p7.__i && g8[p7.__i] || d3, p7.__i = s5, _7 = q2(n4, p7, h7, i5, r6, o5, e5, f7, c5, a5), v5 = p7.__e, p7.ref && h7.ref != p7.ref && (h7.ref && J(h7.ref, null, p7), a5.push(p7.ref, p7.__c || v5, p7)), null == y6 && null != v5 && (y6 = v5), 4 & p7.__u ? (f7 = j2(p7, f7, n4), h7.__e && (h7.__e = null)) : "function" == typeof p7.type && void 0 !== _7 ? f7 = _7 : v5 && (f7 = v5.nextSibling), p7.__u &= -7);
  return u6.__e = y6, f7;
}
function T2(n4, l6, u6, t5, i5) {
  var r6, o5, e5, f7, c5, a5 = u6.length, s5 = a5, h7 = 0;
  for (n4.__k = new Array(i5), r6 = 0; r6 < i5; r6++) null != (o5 = l6[r6]) && "boolean" != typeof o5 && "function" != typeof o5 ? ("string" == typeof o5 || "number" == typeof o5 || "bigint" == typeof o5 || o5.constructor == String ? o5 = n4.__k[r6] = x2(null, o5, null, null, null) : g3(o5) ? o5 = n4.__k[r6] = x2(S2, { children: o5 }, null, null, null) : void 0 === o5.constructor && o5.__b > 0 ? o5 = n4.__k[r6] = x2(o5.type, o5.props, o5.key, o5.ref ? o5.ref : null, o5.__v) : n4.__k[r6] = o5, f7 = r6 + h7, o5.__ = n4, o5.__b = n4.__b + 1, e5 = null, -1 != (c5 = o5.__i = O2(o5, u6, f7, s5)) && (s5--, (e5 = u6[c5]) && (e5.__u |= 2)), null == e5 || null == e5.__v ? (-1 == c5 && (i5 > a5 ? h7-- : i5 < a5 && h7++), "function" != typeof o5.type && (o5.__u |= 4)) : c5 != f7 && (c5 == f7 - 1 ? h7-- : c5 == f7 + 1 ? h7++ : (c5 > f7 ? h7-- : h7++, o5.__u |= 4))) : n4.__k[r6] = null;
  if (s5) for (r6 = 0; r6 < a5; r6++) null != (e5 = u6[r6]) && 0 == (2 & e5.__u) && (e5.__e == t5 && (t5 = $(e5)), K(e5, e5));
  return t5;
}
function j2(n4, l6, u6) {
  var t5, i5;
  if ("function" == typeof n4.type) {
    for (t5 = n4.__k, i5 = 0; t5 && i5 < t5.length; i5++) t5[i5] && (t5[i5].__ = n4, l6 = j2(t5[i5], l6, u6));
    return l6;
  }
  n4.__e != l6 && (l6 && n4.type && !l6.parentNode && (l6 = $(n4)), l6 = u6.insertBefore(n4.__e, l6 || null));
  do {
    l6 = l6 && l6.nextSibling;
  } while (null != l6 && 8 == l6.nodeType);
  return l6;
}
function F2(n4, l6) {
  return l6 = l6 || [], null == n4 || "boolean" == typeof n4 || (g3(n4) ? n4.some(function(n5) {
    F2(n5, l6);
  }) : l6.push(n4)), l6;
}
function O2(n4, l6, u6, t5) {
  var i5, r6, o5, e5 = n4.key, f7 = n4.type, c5 = l6[u6], a5 = null != c5 && 0 == (2 & c5.__u);
  if (null === c5 && null == e5 || a5 && e5 == c5.key && f7 == c5.type) return u6;
  if (t5 > (a5 ? 1 : 0)) {
    for (i5 = u6 - 1, r6 = u6 + 1; i5 >= 0 || r6 < l6.length; ) if (null != (c5 = l6[o5 = i5 >= 0 ? i5-- : r6++]) && 0 == (2 & c5.__u) && e5 == c5.key && f7 == c5.type) return o5;
  }
  return -1;
}
function z2(n4, l6, u6) {
  "-" == l6[0] ? n4.setProperty(l6, null == u6 ? "" : u6) : n4[l6] = null == u6 ? "" : "number" != typeof u6 || _3.test(l6) ? u6 : u6 + "px";
}
function N2(n4, l6, u6, t5, i5) {
  var r6, o5;
  n: if ("style" == l6) if ("string" == typeof u6) n4.style.cssText = u6;
  else {
    if ("string" == typeof t5 && (n4.style.cssText = t5 = ""), t5) for (l6 in t5) u6 && l6 in u6 || z2(n4.style, l6, "");
    if (u6) for (l6 in u6) t5 && u6[l6] == t5[l6] || z2(n4.style, l6, u6[l6]);
  }
  else if ("o" == l6[0] && "n" == l6[1]) r6 = l6 != (l6 = l6.replace(s2, "$1")), o5 = l6.toLowerCase(), l6 = o5 in n4 || "onFocusOut" == l6 || "onFocusIn" == l6 ? o5.slice(2) : l6.slice(2), n4.l || (n4.l = {}), n4.l[l6 + r6] = u6, u6 ? t5 ? u6[a2] = t5[a2] : (u6[a2] = h3, n4.addEventListener(l6, r6 ? v2 : p3, r6)) : n4.removeEventListener(l6, r6 ? v2 : p3, r6);
  else {
    if ("http://www.w3.org/2000/svg" == i5) l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l6 && "height" != l6 && "href" != l6 && "list" != l6 && "form" != l6 && "tabIndex" != l6 && "download" != l6 && "rowSpan" != l6 && "colSpan" != l6 && "role" != l6 && "popover" != l6 && l6 in n4) try {
      n4[l6] = null == u6 ? "" : u6;
      break n;
    } catch (n5) {
    }
    "function" == typeof u6 || (null == u6 || false === u6 && "-" != l6[4] ? n4.removeAttribute(l6) : n4.setAttribute(l6, "popover" == l6 && 1 == u6 ? "" : u6));
  }
}
function V2(n4) {
  return function(u6) {
    if (this.l) {
      var t5 = this.l[u6.type + n4];
      if (null == u6[c2]) u6[c2] = h3++;
      else if (u6[c2] < t5[a2]) return;
      return t5(l2.event ? l2.event(u6) : u6);
    }
  };
}
function q2(n4, u6, t5, i5, r6, o5, e5, f7, c5, a5) {
  var s5, h7, p7, v5, y6, d7, _7, k6, x6, M4, I4, P5, A6, H5, T9, j6, F5 = u6.type;
  if (void 0 !== u6.constructor) return null;
  128 & t5.__u && (c5 = !!(32 & t5.__u), o5 = [f7 = u6.__e = t5.__e]), (s5 = l2.__b) && s5(u6);
  n: if ("function" == typeof F5) {
    h7 = e5.length;
    try {
      if (x6 = u6.props, M4 = F5.prototype && F5.prototype.render, I4 = (s5 = F5.contextType) && i5[s5.__c], P5 = s5 ? I4 ? I4.props.value : s5.__ : i5, t5.__c ? k6 = (p7 = u6.__c = t5.__c).__ = p7.__E : (M4 ? u6.__c = p7 = new F5(x6, P5) : (u6.__c = p7 = new C3(x6, P5), p7.constructor = F5, p7.render = Q2), I4 && I4.sub(p7), p7.state || (p7.state = {}), p7.__n = i5, v5 = p7.__d = true, p7.__h = [], p7._sb = []), M4 && null == p7.__s && (p7.__s = p7.state), M4 && null != F5.getDerivedStateFromProps && (p7.__s == p7.state && (p7.__s = m3({}, p7.__s)), m3(p7.__s, F5.getDerivedStateFromProps(x6, p7.__s))), y6 = p7.props, d7 = p7.state, p7.__v = u6, v5) M4 && null == F5.getDerivedStateFromProps && null != p7.componentWillMount && p7.componentWillMount(), M4 && null != p7.componentDidMount && p7.__h.push(p7.componentDidMount);
      else {
        if (M4 && null == F5.getDerivedStateFromProps && x6 !== y6 && null != p7.componentWillReceiveProps && p7.componentWillReceiveProps(x6, P5), u6.__v == t5.__v || !p7.__e && null != p7.shouldComponentUpdate && false === p7.shouldComponentUpdate(x6, p7.__s, P5)) {
          u6.__v != t5.__v && (p7.props = x6, p7.state = p7.__s, p7.__d = false), u6.__e = t5.__e, u6.__k = t5.__k, u6.__k.some(function(n5) {
            n5 && (n5.__ = u6);
          }), w2.push.apply(p7.__h, p7._sb), p7._sb = [], p7.__h.length && e5.push(p7), f7 = $(t5);
          break n;
        }
        null != p7.componentWillUpdate && p7.componentWillUpdate(x6, p7.__s, P5), M4 && null != p7.componentDidUpdate && p7.__h.push(function() {
          p7.componentDidUpdate(y6, d7, _7);
        });
      }
      if (p7.context = P5, p7.props = x6, p7.__P = n4, p7.__e = false, A6 = l2.__r, H5 = 0, M4) p7.state = p7.__s, p7.__d = false, A6 && A6(u6), s5 = p7.render(p7.props, p7.state, p7.context), w2.push.apply(p7.__h, p7._sb), p7._sb = [];
      else do {
        p7.__d = false, A6 && A6(u6), s5 = p7.render(p7.props, p7.state, p7.context), p7.state = p7.__s;
      } while (p7.__d && ++H5 < 25);
      p7.state = p7.__s, null != p7.getChildContext && (i5 = m3(m3({}, i5), p7.getChildContext())), M4 && !v5 && null != p7.getSnapshotBeforeUpdate && (_7 = p7.getSnapshotBeforeUpdate(y6, d7)), T9 = null != s5 && s5.type === S2 && null == s5.key ? E2(s5.props.children) : s5, f7 = L2(n4, g3(T9) ? T9 : [T9], u6, t5, i5, r6, o5, e5, f7, c5, a5), p7.base = u6.__e, u6.__u &= -161, p7.__h.length && e5.push(p7), k6 && (p7.__E = p7.__ = null);
    } catch (n5) {
      if (e5.length = h7, u6.__v = null, c5 || null != o5) {
        if (n5.then) {
          for (u6.__u |= c5 ? 160 : 128; f7 && 8 == f7.nodeType && f7.nextSibling; ) f7 = f7.nextSibling;
          null != o5 && (o5[o5.indexOf(f7)] = null), u6.__e = f7;
        } else if (null != o5) for (j6 = o5.length; j6--; ) b2(o5[j6]);
      } else u6.__e = t5.__e;
      null == u6.__k && (u6.__k = t5.__k || []), n5.then || B2(u6), l2.__e(n5, u6, t5);
    }
  } else null == o5 && u6.__v == t5.__v ? (u6.__k = t5.__k, u6.__e = t5.__e) : f7 = u6.__e = G(t5.__e, u6, t5, i5, r6, o5, e5, c5, a5);
  return (s5 = l2.diffed) && s5(u6), 128 & u6.__u ? void 0 : f7;
}
function B2(n4) {
  n4 && (n4.__c && (n4.__c.__e = true), n4.__k && n4.__k.some(B2));
}
function D2(n4, u6, t5) {
  for (var i5 = 0; i5 < t5.length; i5++) J(t5[i5], t5[++i5], t5[++i5]);
  l2.__c && l2.__c(u6, n4), n4.some(function(u7) {
    try {
      n4 = u7.__h, u7.__h = [], n4.some(function(n5) {
        n5.call(u7);
      });
    } catch (n5) {
      l2.__e(n5, u7.__v);
    }
  });
}
function E2(n4) {
  return "object" != typeof n4 || null == n4 || n4.__b > 0 ? n4 : g3(n4) ? n4.map(E2) : void 0 !== n4.constructor ? null : m3({}, n4);
}
function G(u6, t5, i5, r6, o5, e5, f7, c5, a5) {
  var s5, h7, p7, v5, y6, w7, _7, m7 = i5.props || d3, k6 = t5.props, x6 = t5.type;
  if ("svg" == x6 ? o5 = "http://www.w3.org/2000/svg" : "math" == x6 ? o5 = "http://www.w3.org/1998/Math/MathML" : o5 || (o5 = "http://www.w3.org/1999/xhtml"), null != e5) {
    for (s5 = 0; s5 < e5.length; s5++) if ((y6 = e5[s5]) && "setAttribute" in y6 == !!x6 && (x6 ? y6.localName == x6 : 3 == y6.nodeType)) {
      u6 = y6, e5[s5] = null;
      break;
    }
  }
  if (null == u6) {
    if (null == x6) return document.createTextNode(k6);
    u6 = document.createElementNS(o5, x6, k6.is && k6), c5 && (l2.__m && l2.__m(t5, e5), c5 = false), e5 = null;
  }
  if (null == x6) m7 === k6 || c5 && u6.data == k6 || (u6.data = k6);
  else {
    if (e5 = "textarea" == x6 && null != k6.defaultValue ? null : e5 && n2.call(u6.childNodes), !c5 && null != e5) for (m7 = {}, s5 = 0; s5 < u6.attributes.length; s5++) m7[(y6 = u6.attributes[s5]).name] = y6.value;
    for (s5 in m7) y6 = m7[s5], "dangerouslySetInnerHTML" == s5 ? p7 = y6 : "children" == s5 || s5 in k6 || "value" == s5 && "defaultValue" in k6 || "checked" == s5 && "defaultChecked" in k6 || N2(u6, s5, null, y6, o5);
    for (s5 in k6) y6 = k6[s5], "children" == s5 ? v5 = y6 : "dangerouslySetInnerHTML" == s5 ? h7 = y6 : "value" == s5 ? w7 = y6 : "checked" == s5 ? _7 = y6 : c5 && "function" != typeof y6 || m7[s5] === y6 || N2(u6, s5, y6, m7[s5], o5);
    if (h7) c5 || p7 && (h7.__html == p7.__html || h7.__html == u6.innerHTML) || (u6.innerHTML = h7.__html), t5.__k = [];
    else if (p7 && (u6.innerHTML = ""), L2("template" == t5.type ? u6.content : u6, g3(v5) ? v5 : [v5], t5, i5, r6, "foreignObject" == x6 ? "http://www.w3.org/1999/xhtml" : o5, e5, f7, e5 ? e5[0] : i5.__k && $(i5, 0), c5, a5), null != e5) for (s5 = e5.length; s5--; ) b2(e5[s5]);
    c5 && "textarea" != x6 || (s5 = "value", "progress" == x6 && null == w7 ? u6.removeAttribute("value") : null != w7 && (w7 !== u6[s5] || "progress" == x6 && !w7 || "option" == x6 && w7 != m7[s5]) && N2(u6, s5, w7, m7[s5], o5), s5 = "checked", null != _7 && _7 != u6[s5] && N2(u6, s5, _7, m7[s5], o5));
  }
  return u6;
}
function J(n4, u6, t5) {
  try {
    if ("function" == typeof n4) {
      var i5 = "function" == typeof n4.__u;
      i5 && n4.__u(), i5 && null == u6 || (n4.__u = n4(u6));
    } else n4.current = u6;
  } catch (n5) {
    l2.__e(n5, t5);
  }
}
function K(n4, u6, t5) {
  var i5, r6;
  if (l2.unmount && l2.unmount(n4), (i5 = n4.ref) && (i5.current && i5.current != n4.__e || J(i5, null, u6)), null != (i5 = n4.__c)) {
    if (i5.componentWillUnmount) try {
      i5.componentWillUnmount();
    } catch (n5) {
      l2.__e(n5, u6);
    }
    i5.base = i5.__P = i5.__n = null;
  }
  if (i5 = n4.__k) for (r6 = 0; r6 < i5.length; r6++) i5[r6] && K(i5[r6], u6, t5 || "function" != typeof n4.type);
  t5 || b2(n4.__e), n4.__c = n4.__ = n4.__e = void 0;
}
function Q2(n4, l6, u6) {
  return this.constructor(n4, u6);
}
function R2(u6, t5, i5) {
  var r6, o5, e5, f7;
  t5 == document && (t5 = document.documentElement), l2.__ && l2.__(u6, t5), o5 = (r6 = "function" == typeof i5) ? null : i5 && i5.__k || t5.__k, e5 = [], f7 = [], q2(t5, u6 = (!r6 && i5 || t5).__k = k2(S2, null, [u6]), o5 || d3, d3, t5.namespaceURI, !r6 && i5 ? [i5] : o5 ? null : t5.firstChild ? n2.call(t5.childNodes) : null, e5, !r6 && i5 ? i5 : o5 ? o5.__e : t5.firstChild, r6, f7), D2(e5, u6, f7), u6.props.children = null;
}
function X2(n4) {
  function l6(n5) {
    var u6, t5;
    return this.getChildContext || (u6 = /* @__PURE__ */ new Set(), (t5 = {})[l6.__c] = this, this.getChildContext = function() {
      return t5;
    }, this.componentWillUnmount = function() {
      u6 = null;
    }, this.shouldComponentUpdate = function(n6) {
      this.props.value != n6.value && u6.forEach(function(n7) {
        n7.__e = true, A2(n7);
      });
    }, this.sub = function(n6) {
      u6.add(n6);
      var l7 = n6.componentWillUnmount;
      n6.componentWillUnmount = function() {
        u6 && u6.delete(n6), l7 && l7.call(n6);
      };
    }), n5.children;
  }
  return l6.__c = "__cC" + y2++, l6.__ = n4, l6.Provider = l6.__l = (l6.Consumer = function(n5, l7) {
    return n5.children(l7);
  }).contextType = l6, l6;
}
n2 = w2.slice, l2 = { __e: function(n4, l6, u6, t5) {
  for (var i5, r6, o5; l6 = l6.__; ) if ((i5 = l6.__c) && !i5.__) try {
    if ((r6 = i5.constructor) && null != r6.getDerivedStateFromError && (i5.setState(r6.getDerivedStateFromError(n4)), o5 = i5.__d), null != i5.componentDidCatch && (i5.componentDidCatch(n4, t5 || {}), o5 = i5.__d), o5) return i5.__E = i5;
  } catch (l7) {
    n4 = l7;
  }
  throw n4;
} }, u2 = 0, t2 = function(n4) {
  return null != n4 && void 0 === n4.constructor;
}, C3.prototype.setState = function(n4, l6) {
  var u6;
  u6 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m3({}, this.state), "function" == typeof n4 && (n4 = n4(m3({}, u6), this.props)), n4 && m3(u6, n4), null != n4 && this.__v && (l6 && this._sb.push(l6), A2(this));
}, C3.prototype.forceUpdate = function(n4) {
  this.__v && (this.__e = true, n4 && this.__h.push(n4), A2(this));
}, C3.prototype.render = S2, i2 = [], o2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e2 = function(n4, l6) {
  return n4.__v.__b - l6.__v.__b;
}, H2.__r = 0, f3 = Math.random().toString(8), c2 = "__d" + f3, a2 = "__a" + f3, s2 = /(PointerCapture)$|Capture$/i, h3 = 0, p3 = V2(false), v2 = V2(true), y2 = 0;

// ../../node_modules/preact/hooks/dist/hooks.module.js
var t3;
var r3;
var u3;
var i3;
var o3 = 0;
var f4 = [];
var c3 = l2;
var e3 = c3.__b;
var a3 = c3.__r;
var v3 = c3.diffed;
var l3 = c3.__c;
var m4 = c3.unmount;
var p4 = c3.__;
function s3(n4, t5) {
  c3.__h && c3.__h(r3, n4, o3 || t5), o3 = 0;
  var u6 = r3.__H || (r3.__H = { __: [], __h: [] });
  return n4 >= u6.__.length && u6.__.push({}), u6.__[n4];
}
function d4(n4) {
  return o3 = 1, y3(D3, n4);
}
function y3(n4, u6, i5) {
  var o5 = s3(t3++, 2);
  if (o5.t = n4, !o5.__c && (o5.__ = [i5 ? i5(u6) : D3(void 0, u6), function(n5) {
    var t5 = o5.__N ? o5.__N[0] : o5.__[0], r6 = o5.t(t5, n5);
    t5 !== r6 && (o5.__N = [r6, o5.__[1]], o5.__c.setState({}));
  }], o5.__c = r3, !r3.__f)) {
    var f7 = function(n5, t5, r6) {
      if (!o5.__c.__H) return true;
      var u7 = false, i6 = o5.__c.props !== n5;
      if (o5.__c.__H.__.some(function(n6) {
        if (n6.__N) {
          u7 = true;
          var t6 = n6.__[0];
          n6.__ = n6.__N, n6.__N = void 0, t6 !== n6.__[0] && (i6 = true);
        }
      }), c5) {
        var f8 = c5.call(this, n5, t5, r6);
        return u7 ? f8 || i6 : f8;
      }
      return !u7 || i6;
    };
    r3.__f = true;
    var c5 = r3.shouldComponentUpdate, e5 = r3.componentWillUpdate;
    r3.componentWillUpdate = function(n5, t5, r6) {
      if (this.__e) {
        var u7 = c5;
        c5 = void 0, f7(n5, t5, r6), c5 = u7;
      }
      e5 && e5.call(this, n5, t5, r6);
    }, r3.shouldComponentUpdate = f7;
  }
  return o5.__N || o5.__;
}
function h4(n4, u6) {
  var i5 = s3(t3++, 3);
  !c3.__s && C4(i5.__H, u6) && (i5.__ = n4, i5.u = u6, r3.__H.__h.push(i5));
}
function _4(n4, u6) {
  var i5 = s3(t3++, 4);
  !c3.__s && C4(i5.__H, u6) && (i5.__ = n4, i5.u = u6, r3.__h.push(i5));
}
function A3(n4) {
  return o3 = 5, T3(function() {
    return { current: n4 };
  }, []);
}
function T3(n4, r6) {
  var u6 = s3(t3++, 7);
  return C4(u6.__H, r6) && (u6.__ = n4(), u6.__H = r6, u6.__h = n4), u6.__;
}
function q3(n4, t5) {
  return o3 = 8, T3(function() {
    return n4;
  }, t5);
}
function x3(n4) {
  var u6 = r3.context[n4.__c], i5 = s3(t3++, 9);
  return i5.c = n4, u6 ? (null == i5.__ && (i5.__ = true, u6.sub(r3)), u6.props.value) : n4.__;
}
function j3() {
  for (var n4; n4 = f4.shift(); ) {
    var t5 = n4.__H;
    if (n4.__P && t5) try {
      t5.__h.some(z3), t5.__h.some(B3), t5.__h = [];
    } catch (r6) {
      t5.__h = [], c3.__e(r6, n4.__v);
    }
  }
}
c3.__b = function(n4) {
  r3 = null, e3 && e3(n4);
}, c3.__ = function(n4, t5) {
  n4 && t5.__k && t5.__k.__m && (n4.__m = t5.__k.__m), p4 && p4(n4, t5);
}, c3.__r = function(n4) {
  a3 && a3(n4), t3 = 0;
  var i5 = (r3 = n4.__c).__H;
  i5 && (u3 === r3 ? (i5.__h = [], r3.__h = [], i5.__.some(function(n5) {
    n5.__N && (n5.__ = n5.__N), n5.u = n5.__N = void 0;
  })) : (i5.__h.some(z3), i5.__h.some(B3), i5.__h = [], t3 = 0)), u3 = r3;
}, c3.diffed = function(n4) {
  v3 && v3(n4);
  var t5 = n4.__c;
  t5 && t5.__H && (t5.__H.__h.length && (1 !== f4.push(t5) && i3 === c3.requestAnimationFrame || ((i3 = c3.requestAnimationFrame) || w3)(j3)), t5.__H.__.some(function(n5) {
    n5.u && (n5.__H = n5.u, n5.u = void 0);
  })), u3 = r3 = null;
}, c3.__c = function(n4, t5) {
  t5.some(function(n5) {
    try {
      n5.__h.some(z3), n5.__h = n5.__h.filter(function(n6) {
        return !n6.__ || B3(n6);
      });
    } catch (r6) {
      t5.some(function(n6) {
        n6.__h && (n6.__h = []);
      }), t5 = [], c3.__e(r6, n5.__v);
    }
  }), l3 && l3(n4, t5);
}, c3.unmount = function(n4) {
  m4 && m4(n4);
  var t5, r6 = n4.__c;
  r6 && r6.__H && (r6.__H.__.some(function(n5) {
    try {
      z3(n5);
    } catch (n6) {
      t5 = n6;
    }
  }), r6.__H = void 0, t5 && c3.__e(t5, r6.__v));
};
var k3 = "function" == typeof requestAnimationFrame;
function w3(n4) {
  var t5, r6 = function() {
    clearTimeout(u6), k3 && cancelAnimationFrame(t5), setTimeout(n4);
  }, u6 = setTimeout(r6, 35);
  k3 && (t5 = requestAnimationFrame(r6));
}
function z3(n4) {
  var t5 = r3, u6 = n4.__c;
  "function" == typeof u6 && (n4.__c = void 0, u6()), r3 = t5;
}
function B3(n4) {
  var t5 = r3;
  n4.__c = n4.__(), r3 = t5;
}
function C4(n4, t5) {
  return !n4 || n4.length !== t5.length || t5.some(function(t6, r6) {
    return t6 !== n4[r6];
  });
}
function D3(n4, t5) {
  return "function" == typeof t5 ? t5(n4) : t5;
}

// ../../node_modules/@preact/signals-core/dist/signals-core.module.js
var i4 = /* @__PURE__ */ Symbol.for("preact-signals");
function t4() {
  if (!(v4 > 1)) {
    var i5, t5 = false;
    !(function() {
      var i6 = c4;
      c4 = void 0;
      while (void 0 !== i6) {
        var t6 = i6.S;
        if (t6.v === i6.v) {
          for (var n5 = t6.t; void 0 !== n5; n5 = n5.x) if (n5.i === i6.i) n5.i = t6.i;
        }
        i6 = i6.o;
      }
    })();
    while (void 0 !== h5) {
      var n4 = h5;
      h5 = void 0;
      s4++;
      while (void 0 !== n4) {
        var r6 = n4.u;
        n4.u = void 0;
        n4.f &= -3;
        if (!(8 & n4.f) && w4(n4)) try {
          n4.c();
        } catch (n5) {
          if (!t5) {
            i5 = n5;
            t5 = true;
          }
        }
        n4 = r6;
      }
    }
    s4 = 0;
    v4--;
    if (t5) throw i5;
  } else v4--;
}
function n3(i5) {
  if (v4 > 0) return i5();
  e4 = ++u4;
  v4++;
  try {
    return i5();
  } finally {
    t4();
  }
}
var r4;
var o4 = void 0;
function f5(i5) {
  var t5 = o4, n4 = r4;
  o4 = void 0;
  r4 = void 0;
  try {
    return i5();
  } finally {
    o4 = t5;
    r4 = n4;
  }
}
var h5 = void 0;
var v4 = 0;
var s4 = 0;
var u4 = 0;
var e4 = 0;
var c4 = void 0;
var d5 = 0;
function a4(i5) {
  if (void 0 !== o4) {
    var t5 = i5.n;
    if (void 0 === t5 || t5.t !== o4) {
      t5 = { i: 0, S: i5, p: o4.s, n: void 0, t: o4, e: void 0, x: void 0, r: t5 };
      if (void 0 !== o4.s) o4.s.n = t5;
      o4.s = t5;
      i5.n = t5;
      if (32 & o4.f) i5.S(t5);
      return t5;
    } else if (-1 === t5.i) {
      t5.i = 0;
      if (void 0 !== t5.n) {
        t5.n.p = t5.p;
        if (void 0 !== t5.p) t5.p.n = t5.n;
        t5.p = o4.s;
        t5.n = void 0;
        o4.s.n = t5;
        o4.s = t5;
      }
      return t5;
    }
  }
}
function l4(i5, t5) {
  this.v = i5;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
  this.l = 0;
  this.W = null == t5 ? void 0 : t5.watched;
  this.Z = null == t5 ? void 0 : t5.unwatched;
  this.name = null == t5 ? void 0 : t5.name;
}
l4.prototype.brand = i4;
l4.prototype.h = function() {
  return true;
};
l4.prototype.S = function(i5) {
  var t5 = this, n4 = this.t;
  if (n4 !== i5 && void 0 === i5.e) {
    i5.x = n4;
    this.t = i5;
    if (void 0 !== n4) n4.e = i5;
    else f5(function() {
      var i6;
      null == (i6 = t5.W) || i6.call(t5);
    });
  }
};
l4.prototype.U = function(i5) {
  var t5 = this;
  if (void 0 !== this.t) {
    var n4 = i5.e, r6 = i5.x;
    if (void 0 !== n4) {
      n4.x = r6;
      i5.e = void 0;
    }
    if (void 0 !== r6) {
      r6.e = n4;
      i5.x = void 0;
    }
    if (i5 === this.t) {
      this.t = r6;
      if (void 0 === r6) f5(function() {
        var i6;
        null == (i6 = t5.Z) || i6.call(t5);
      });
    }
  }
};
l4.prototype.subscribe = function(i5) {
  var t5 = this;
  return j4(function() {
    var n4 = t5.value;
    f5(function() {
      return i5(n4);
    });
  }, { name: "sub" });
};
l4.prototype.valueOf = function() {
  return this.value;
};
l4.prototype.toString = function() {
  return this.value + "";
};
l4.prototype.toJSON = function() {
  return this.value;
};
l4.prototype.peek = function() {
  var i5 = this;
  return f5(function() {
    return i5.value;
  });
};
Object.defineProperty(l4.prototype, "value", { get: function() {
  var i5 = a4(this);
  if (void 0 !== i5) i5.i = this.i;
  return this.v;
}, set: function(i5) {
  if (i5 !== this.v) {
    if (s4 > 100) throw new Error("Cycle detected");
    !(function(i6) {
      if (0 !== v4 && 0 === s4) {
        if (i6.l !== e4) {
          i6.l = e4;
          c4 = { S: i6, v: i6.v, i: i6.i, o: c4 };
        }
      }
    })(this);
    this.v = i5;
    this.i++;
    d5++;
    v4++;
    try {
      for (var n4 = this.t; void 0 !== n4; n4 = n4.x) n4.t.N();
    } finally {
      t4();
    }
  }
} });
function y4(i5, t5) {
  return new l4(i5, t5);
}
function w4(i5) {
  for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) if (t5.S.i !== t5.i || !t5.S.h() || t5.S.i !== t5.i) return true;
  return false;
}
function _5(i5) {
  for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) {
    var n4 = t5.S.n;
    if (void 0 !== n4) t5.r = n4;
    t5.S.n = t5;
    t5.i = -1;
    if (void 0 === t5.n) {
      i5.s = t5;
      break;
    }
  }
}
function b3(i5) {
  var t5 = i5.s, n4 = void 0;
  while (void 0 !== t5) {
    var r6 = t5.p;
    if (-1 === t5.i) {
      t5.S.U(t5);
      if (void 0 !== r6) r6.n = t5.n;
      if (void 0 !== t5.n) t5.n.p = r6;
    } else n4 = t5;
    t5.S.n = t5.r;
    if (void 0 !== t5.r) t5.r = void 0;
    t5 = r6;
  }
  i5.s = n4;
}
function p5(i5, t5) {
  l4.call(this, void 0, t5);
  this.x = i5;
  this.s = void 0;
  this.g = d5 - 1;
  this.f = 4;
}
p5.prototype = new l4();
p5.prototype.h = function() {
  this.f &= -3;
  if (1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  this.f &= -5;
  if (this.g === d5) return true;
  this.g = d5;
  this.f |= 1;
  if (this.i > 0 && !w4(this)) {
    this.f &= -2;
    return true;
  }
  var i5 = o4;
  try {
    _5(this);
    o4 = this;
    var t5 = this.x();
    if (16 & this.f || this.v !== t5 || 0 === this.i) {
      this.v = t5;
      this.f &= -17;
      this.i++;
    }
  } catch (i6) {
    this.v = i6;
    this.f |= 16;
    this.i++;
  }
  o4 = i5;
  b3(this);
  this.f &= -2;
  return true;
};
p5.prototype.S = function(i5) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (var t5 = this.s; void 0 !== t5; t5 = t5.n) t5.S.S(t5);
  }
  l4.prototype.S.call(this, i5);
};
p5.prototype.U = function(i5) {
  if (void 0 !== this.t) {
    l4.prototype.U.call(this, i5);
    if (void 0 === this.t) {
      this.f &= -33;
      for (var t5 = this.s; void 0 !== t5; t5 = t5.n) t5.S.U(t5);
    }
  }
};
p5.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i5 = this.t; void 0 !== i5; i5 = i5.x) i5.t.N();
  }
};
Object.defineProperty(p5.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i5 = a4(this);
  this.h();
  if (void 0 !== i5) i5.i = this.i;
  if (16 & this.f) throw this.v;
  return this.v;
} });
function g4(i5, t5) {
  return new p5(i5, t5);
}
function S3(i5) {
  var n4 = i5.m;
  i5.m = void 0;
  if ("function" == typeof n4) {
    v4++;
    var r6 = o4;
    o4 = void 0;
    try {
      n4();
    } catch (t5) {
      i5.f &= -2;
      i5.f |= 8;
      m5(i5);
      throw t5;
    } finally {
      o4 = r6;
      t4();
    }
  }
}
function m5(i5) {
  for (var t5 = i5.s; void 0 !== t5; t5 = t5.n) t5.S.U(t5);
  i5.x = void 0;
  i5.s = void 0;
  S3(i5);
}
function x4(i5) {
  if (o4 !== this) throw new Error("Out-of-order effect");
  b3(this);
  o4 = i5;
  this.f &= -2;
  if (8 & this.f) m5(this);
  t4();
}
function E3(i5, t5) {
  this.x = i5;
  this.m = void 0;
  this.s = void 0;
  this.u = void 0;
  this.f = 32;
  this.name = null == t5 ? void 0 : t5.name;
  if (r4) r4.push(this);
}
E3.prototype.c = function() {
  var i5 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    var t5 = this.x();
    if ("function" == typeof t5) this.m = t5;
  } finally {
    i5();
  }
};
E3.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  S3(this);
  _5(this);
  v4++;
  var i5 = o4;
  o4 = this;
  return x4.bind(this, i5);
};
E3.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.u = h5;
    h5 = this;
  }
};
E3.prototype.d = function() {
  this.f |= 8;
  if (!(1 & this.f)) m5(this);
};
E3.prototype.dispose = function() {
  this.d();
};
function j4(i5, t5) {
  var n4 = new E3(i5, t5);
  try {
    n4.c();
  } catch (i6) {
    n4.d();
    throw i6;
  }
  var r6 = n4.d.bind(n4);
  r6[Symbol.dispose] = r6;
  return r6;
}

// ../../node_modules/@preact/signals/dist/signals.module.js
var l5;
var h6;
var d6;
var p6 = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__;
var m6 = [];
var _6 = [];
j4(function() {
  l5 = this.N;
})();
function g5(i5, r6) {
  l2[i5] = r6.bind(null, l2[i5] || function() {
  });
}
function b4(i5) {
  if (d6) {
    var n4 = d6;
    d6 = void 0;
    n4();
  }
  d6 = i5 && i5.S();
}
function y5(i5) {
  var n4 = this, t5 = i5.data, f7 = useSignal(t5);
  f7.name = "ReactiveDom";
  f7.value = t5;
  var e5 = T3(function() {
    var i6 = n4, t6 = n4.__v;
    while (t6 = t6.__) if (t6.__c) {
      t6.__c.__$f |= 4;
      break;
    }
    var o5 = g4(function() {
      var i7 = f7.value.value;
      return 0 === i7 ? 0 : true === i7 ? "" : i7 || "";
    }), e6 = g4(function() {
      return !Array.isArray(o5.value) && !t2(o5.value);
    }), a6 = j4(function() {
      this.N = F3;
      if (e6.value) {
        var n5 = o5.value;
        if (i6.__v && i6.__v.__e && 3 === i6.__v.__e.nodeType) i6.__v.__e.data = n5;
      }
    }), v6 = n4.__$u.d;
    n4.__$u.d = function() {
      a6();
      v6.call(this);
    };
    return [e6, o5];
  }, []), a5 = e5[0], v5 = e5[1];
  return a5.value ? v5.peek() : v5.value;
}
y5.displayName = "ReactiveTextNode";
Object.defineProperties(l4.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: y5 }, props: { configurable: true, get: function() {
  var i5 = this;
  return { data: { get value() {
    return i5.value;
  } } };
} }, __b: { configurable: true, value: 1 } });
g5("__b", function(i5, n4) {
  if ("string" == typeof n4.type) {
    var r6, t5 = n4.props;
    for (var o5 in t5) if ("children" !== o5) {
      var f7 = t5[o5];
      if (f7 instanceof l4) {
        if (!r6) n4.__np = r6 = {};
        r6[o5] = f7;
        t5[o5] = f7.peek();
      }
    }
  }
  i5(n4);
});
g5("__r", function(i5, n4) {
  i5(n4);
  if (n4.type !== S2) {
    b4();
    var r6, o5 = n4.__c;
    if (o5) {
      o5.__$f &= -2;
      if (void 0 === (r6 = o5.__$u)) o5.__$u = r6 = (function(i6, n5) {
        var r7;
        j4(function() {
          r7 = this;
        }, { name: n5 });
        r7.c = i6;
        return r7;
      })(/* @__PURE__ */ (function(i6) {
        return function() {
          var n5;
          if (p6) null == (n5 = this.y) || n5.call(this);
          i6.__$f |= 1;
          i6.setState({});
        };
      })(o5), "function" == typeof n4.type ? n4.type.displayName || n4.type.name : "");
    }
    h6 = o5;
    b4(r6);
  }
});
g5("__e", function(i5, n4, r6, t5) {
  b4();
  h6 = void 0;
  i5(n4, r6, t5);
});
g5("diffed", function(i5, n4) {
  b4();
  h6 = void 0;
  var r6;
  if ("string" == typeof n4.type && (r6 = n4.__e)) {
    var t5 = n4.__np, o5 = n4.props, f7 = r6.U;
    if (f7) for (var e5 in f7) {
      var u6 = f7[e5];
      if (!(void 0 === u6 || t5 && e5 in t5)) {
        u6.d();
        f7[e5] = void 0;
      }
    }
    if (t5) {
      if (!f7) {
        f7 = {};
        r6.U = f7;
      }
      for (var a5 in t5) {
        var c5 = f7[a5], v5 = t5[a5];
        if (void 0 === c5) {
          c5 = w5(r6, a5, v5, o5);
          f7[a5] = c5;
        } else c5.o(v5, o5);
      }
    }
  }
  i5(n4);
});
function w5(i5, n4, r6, t5) {
  var o5 = n4 in i5 && void 0 === i5.ownerSVGElement, f7 = y4(r6);
  return { o: function(i6, n5) {
    f7.value = i6;
    t5 = n5;
  }, d: j4(function() {
    this.N = F3;
    var r7 = f7.value.value;
    if (t5[n4] !== r7) {
      t5[n4] = r7;
      if (o5) i5[n4] = r7;
      else if (null != r7 && (false !== r7 || "-" === n4[4])) i5.setAttribute(n4, r7);
      else i5.removeAttribute(n4);
    }
  }) };
}
g5("unmount", function(i5, n4) {
  if ("string" == typeof n4.type) {
    var r6 = n4.__e;
    if (r6) {
      var t5 = r6.U;
      if (t5) {
        r6.U = void 0;
        for (var o5 in t5) {
          var f7 = t5[o5];
          if (f7) f7.d();
        }
      }
    }
    var e5 = n4.__np;
    if (e5) {
      var u6 = n4.props;
      for (var a5 in e5) u6[a5] = e5[a5];
    }
    n4.__np = void 0;
  } else {
    var c5 = n4.__c;
    if (c5) {
      var v5 = c5.__$u;
      if (v5) {
        c5.__$u = void 0;
        v5.d();
      }
    }
  }
  i5(n4);
});
g5("__h", function(i5, n4, r6, t5) {
  if (t5 < 3) n4.__$f |= 2;
  i5(n4, r6, t5);
});
C3.prototype.shouldComponentUpdate = function(i5, n4) {
  if (this.__R) return true;
  var r6 = this.__$u, t5 = r6 && void 0 !== r6.s;
  for (var o5 in n4) return true;
  if (this.__f || "boolean" == typeof this.u && true === this.u) {
    var f7 = 2 & this.__$f;
    if (!(t5 || f7 || 4 & this.__$f)) return true;
    if (1 & this.__$f) return true;
  } else {
    if (!(t5 || 4 & this.__$f)) return true;
    if (3 & this.__$f) return true;
  }
  for (var e5 in i5) if ("__source" !== e5 && i5[e5] !== this.props[e5]) return true;
  for (var u6 in this.props) if (!(u6 in i5)) return true;
  return false;
};
function useSignal(i5, n4) {
  return T3(function() {
    return y4(i5, n4);
  }, []);
}
var k4 = "undefined" == typeof requestAnimationFrame ? setTimeout : function(i5) {
  var n4 = function() {
    clearTimeout(r6);
    cancelAnimationFrame(t5);
    i5();
  }, r6 = setTimeout(n4, 35), t5 = requestAnimationFrame(n4);
};
var q4 = function(i5) {
  queueMicrotask(function() {
    queueMicrotask(i5);
  });
};
function A4() {
  n3(function() {
    var i5;
    while (i5 = m6.shift()) l5.call(i5);
  });
}
function T5() {
  if (1 === m6.push(this)) (l2.requestAnimationFrame || k4)(A4);
}
function x5() {
  n3(function() {
    var i5;
    while (i5 = _6.shift()) l5.call(i5);
  });
}
function F3() {
  if (1 === _6.push(this)) (l2.requestAnimationFrame || q4)(x5);
}
function useSignalEffect(i5, n4) {
  var r6 = A3(i5);
  r6.current = i5;
  h4(function() {
    return j4(function() {
      this.N = T5;
      return r6.current();
    }, n4);
  }, []);
}

// ../../node_modules/preact/compat/dist/compat.module.js
function g7(n4, t5) {
  for (var e5 in t5) n4[e5] = t5[e5];
  return n4;
}
function E4(n4, t5) {
  for (var e5 in n4) if ("__source" !== e5 && !(e5 in t5)) return true;
  for (var r6 in t5) if ("__source" !== r6 && n4[r6] !== t5[r6]) return true;
  return false;
}
function C6(n4, t5) {
  var e5 = t5(), r6 = d4({ t: { __: e5, u: t5 } }), u6 = r6[0].t, o5 = r6[1];
  return _4(function() {
    u6.__ = e5, u6.u = t5, R3(u6) && o5({ t: u6 });
  }, [n4, e5, t5]), h4(function() {
    return R3(u6) && o5({ t: u6 }), n4(function() {
      R3(u6) && o5({ t: u6 });
    });
  }, [n4]), e5;
}
function R3(n4) {
  try {
    return !((t5 = n4.__) === (e5 = n4.u()) && (0 !== t5 || 1 / t5 == 1 / e5) || t5 != t5 && e5 != e5);
  } catch (n5) {
    return true;
  }
  var t5, e5;
}
function M3(n4, t5) {
  this.props = n4, this.context = t5;
}
function N3(n4, e5) {
  function r6(n5) {
    var t5 = this.props.ref;
    return t5 != n5.ref && t5 && ("function" == typeof t5 ? t5(null) : t5.current = null), e5 ? !e5(this.props, n5) || t5 != n5.ref : E4(this.props, n5);
  }
  function u6(e6) {
    return this.shouldComponentUpdate = r6, k2(n4, e6);
  }
  return u6.displayName = "Memo(" + (n4.displayName || n4.name) + ")", u6.__f = u6.prototype.isReactComponent = true, u6.type = n4, u6;
}
(M3.prototype = new C3()).isPureReactComponent = true, M3.prototype.shouldComponentUpdate = function(n4, t5) {
  return E4(this.props, n4) || E4(this.state, t5);
};
var T6 = l2.__b;
l2.__b = function(n4) {
  n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), T6 && T6(n4);
};
var A5 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.forward_ref") || 3911;
function D4(n4) {
  function t5(t6) {
    var e5 = g7({}, t6);
    return delete e5.ref, n4(e5, t6.ref || null);
  }
  return t5.$$typeof = A5, t5.render = n4, t5.prototype.isReactComponent = t5.__f = true, t5.displayName = "ForwardRef(" + (n4.displayName || n4.name) + ")", t5;
}
var O3 = l2.__e;
l2.__e = function(n4, t5, e5, r6) {
  if (n4.then) {
    for (var u6, o5 = t5; o5 = o5.__; ) if ((u6 = o5.__c) && u6.__c) return null == t5.__e && (t5.__e = e5.__e, t5.__k = e5.__k || []), u6.__c(n4, t5);
  }
  O3(n4, t5, e5, r6);
};
var U3 = l2.unmount;
function V3(n4, t5, e5) {
  return n4 && (n4.__c && n4.__c.__H && (n4.__c.__H.__.forEach(function(n5) {
    "function" == typeof n5.__c && n5.__c();
  }), n4.__c.__H = null), null != (n4 = g7({}, n4)).__c && (n4.__c.__P === e5 && (n4.__c.__P = t5), n4.__c.__e = true, n4.__c = null), n4.__k = n4.__k && n4.__k.map(function(n5) {
    return V3(n5, t5, e5);
  })), n4;
}
function W2(n4, t5, e5) {
  return n4 && e5 && (n4.__v = null, n4.__k = n4.__k && n4.__k.map(function(n5) {
    return W2(n5, t5, e5);
  }), n4.__c && n4.__c.__P === t5 && (n4.__e && e5.appendChild(n4.__e), n4.__c.__e = true, n4.__c.__P = e5)), n4;
}
function P4() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j5(n4) {
  var t5 = n4.__ && n4.__.__c;
  return t5 && t5.__a && t5.__a(n4);
}
function B4() {
  this.i = null, this.l = null;
}
l2.unmount = function(n4) {
  var t5 = n4.__c;
  t5 && (t5.__z = true), t5 && t5.__R && t5.__R(), t5 && 32 & n4.__u && (n4.type = null), U3 && U3(n4);
}, (P4.prototype = new C3()).__c = function(n4, t5) {
  var e5 = t5.__c, r6 = this;
  null == r6.o && (r6.o = []), r6.o.push(e5);
  var u6 = j5(r6.__v), o5 = false, i5 = function() {
    o5 || r6.__z || (o5 = true, e5.__R = null, u6 ? u6(f7) : f7());
  };
  e5.__R = i5;
  var l6 = e5.__P;
  e5.__P = null;
  var f7 = function() {
    if (!--r6.__u) {
      if (r6.state.__a) {
        var n5 = r6.state.__a;
        r6.__v.__k[0] = W2(n5, n5.__c.__P, n5.__c.__O);
      }
      var t6;
      for (r6.setState({ __a: r6.__b = null }); t6 = r6.o.pop(); ) t6.__P = l6, t6.forceUpdate();
    }
  };
  r6.__u++ || 32 & t5.__u || r6.setState({ __a: r6.__b = r6.__v.__k[0] }), n4.then(i5, i5);
}, P4.prototype.componentWillUnmount = function() {
  this.o = [];
}, P4.prototype.render = function(n4, e5) {
  if (this.__b) {
    if (this.__v.__k) {
      var r6 = document.createElement("div"), o5 = this.__v.__k[0].__c;
      this.__v.__k[0] = V3(this.__b, r6, o5.__O = o5.__P);
    }
    this.__b = null;
  }
  var i5 = e5.__a && k2(S2, null, n4.fallback);
  return i5 && (i5.__u &= -33), [k2(S2, null, e5.__a ? null : n4.children), i5];
};
var H3 = function(n4, t5, e5) {
  if (++e5[1] === e5[0] && n4.l.delete(t5), n4.props.revealOrder && ("t" !== n4.props.revealOrder[0] || !n4.l.size)) for (e5 = n4.i; e5; ) {
    for (; e5.length > 3; ) e5.pop()();
    if (e5[1] < e5[0]) break;
    n4.i = e5 = e5[2];
  }
};
function Z2(n4) {
  return this.getChildContext = function() {
    return n4.context;
  }, n4.children;
}
function Y(n4) {
  var e5 = this, r6 = n4.h;
  if (e5.componentWillUnmount = function() {
    R2(null, e5.v), e5.v = null, e5.h = null;
  }, e5.h && e5.h !== r6 && e5.componentWillUnmount(), !e5.v) {
    for (var u6 = e5.__v; null !== u6 && !u6.__m && null !== u6.__; ) u6 = u6.__;
    e5.h = r6, e5.v = { nodeType: 1, parentNode: r6, childNodes: [], __k: { __m: u6.__m }, contains: function() {
      return true;
    }, namespaceURI: r6.namespaceURI, insertBefore: function(n5, t5) {
      this.childNodes.push(n5), e5.h.insertBefore(n5, t5);
    }, removeChild: function(n5) {
      this.childNodes.splice(this.childNodes.indexOf(n5) >>> 1, 1), e5.h.removeChild(n5);
    } };
  }
  R2(k2(Z2, { context: e5.context }, n4.__v), e5.v);
}
function $2(n4, e5) {
  var r6 = k2(Y, { __v: n4, h: e5 });
  return r6.containerInfo = e5, r6;
}
(B4.prototype = new C3()).__a = function(n4) {
  var t5 = this, e5 = j5(t5.__v), r6 = t5.l.get(n4);
  return r6[0]++, function(u6) {
    var o5 = function() {
      t5.props.revealOrder ? (r6.push(u6), H3(t5, n4, r6)) : u6();
    };
    e5 ? e5(o5) : o5();
  };
}, B4.prototype.render = function(n4) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t5 = F2(n4.children);
  n4.revealOrder && "b" === n4.revealOrder[0] && t5.reverse();
  for (var e5 = t5.length; e5--; ) this.l.set(t5[e5], this.i = [1, 0, this.i]);
  return n4.children;
}, B4.prototype.componentDidUpdate = B4.prototype.componentDidMount = function() {
  var n4 = this;
  this.l.forEach(function(t5, e5) {
    H3(n4, e5, t5);
  });
};
var q5 = "undefined" != typeof Symbol && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103;
var G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var K2 = /[A-Z0-9]/g;
var Q3 = "undefined" != typeof document;
var X3 = function(n4) {
  return ("undefined" != typeof Symbol && "symbol" == typeof /* @__PURE__ */ Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n4);
};
C3.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t5) {
  Object.defineProperty(C3.prototype, t5, { configurable: true, get: function() {
    return this["UNSAFE_" + t5];
  }, set: function(n4) {
    Object.defineProperty(this, t5, { configurable: true, writable: true, value: n4 });
  } });
});
var en = l2.event;
l2.event = function(n4) {
  return en && (n4 = en(n4)), n4.persist = function() {
  }, n4.isPropagationStopped = function() {
    return this.cancelBubble;
  }, n4.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, n4.nativeEvent = n4;
};
var rn;
var un = { configurable: true, get: function() {
  return this.class;
} };
var on = l2.vnode;
l2.vnode = function(n4) {
  "string" == typeof n4.type && (function(n5) {
    var t5 = n5.props, e5 = n5.type, u6 = {}, o5 = -1 == e5.indexOf("-");
    for (var i5 in t5) {
      var l6 = t5[i5];
      if (!("value" === i5 && "defaultValue" in t5 && null == l6 || Q3 && "children" === i5 && "noscript" === e5 || "class" === i5 || "className" === i5)) {
        var f7 = i5.toLowerCase();
        "defaultValue" === i5 && "value" in t5 && null == t5.value ? i5 = "value" : "download" === i5 && true === l6 ? l6 = "" : "translate" === f7 && "no" === l6 ? l6 = false : "o" === f7[0] && "n" === f7[1] ? "ondoubleclick" === f7 ? i5 = "ondblclick" : "onchange" !== f7 || "input" !== e5 && "textarea" !== e5 || X3(t5.type) ? "onfocus" === f7 ? i5 = "onfocusin" : "onblur" === f7 ? i5 = "onfocusout" : J2.test(i5) && (i5 = f7) : f7 = i5 = "oninput" : o5 && G2.test(i5) ? i5 = i5.replace(K2, "-$&").toLowerCase() : null === l6 && (l6 = void 0), "oninput" === f7 && u6[i5 = f7] && (i5 = "oninputCapture"), u6[i5] = l6;
      }
    }
    "select" == e5 && (u6.multiple && Array.isArray(u6.value) && (u6.value = F2(t5.children).forEach(function(n6) {
      n6.props.selected = -1 != u6.value.indexOf(n6.props.value);
    })), null != u6.defaultValue && (u6.value = F2(t5.children).forEach(function(n6) {
      n6.props.selected = u6.multiple ? -1 != u6.defaultValue.indexOf(n6.props.value) : u6.defaultValue == n6.props.value;
    }))), t5.class && !t5.className ? (u6.class = t5.class, Object.defineProperty(u6, "className", un)) : t5.className && (u6.class = u6.className = t5.className), n5.props = u6;
  })(n4), n4.$$typeof = q5, on && on(n4);
};
var ln = l2.__r;
l2.__r = function(n4) {
  ln && ln(n4), rn = n4.__c;
};
var fn = l2.diffed;
l2.diffed = function(n4) {
  fn && fn(n4);
  var t5 = n4.props, e5 = n4.__e;
  null != e5 && "textarea" === n4.type && "value" in t5 && t5.value !== e5.value && (e5.value = null == t5.value ? "" : t5.value), rn = null;
};

// ../../node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f6 = 0;
function u5(e5, t5, n4, o5, i5, u6) {
  t5 || (t5 = {});
  var a5, c5, p7 = t5;
  if ("ref" in p7) for (c5 in p7 = {}, t5) "ref" == c5 ? a5 = t5[c5] : p7[c5] = t5[c5];
  var l6 = { type: e5, props: p7, key: n4, ref: a5, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f6, __i: -1, __u: 0, __source: i5, __self: u6 };
  if ("function" == typeof e5 && (a5 = e5.defaultProps)) for (c5 in a5) void 0 === p7[c5] && (p7[c5] = a5[c5]);
  return l2.vnode && l2.vnode(l6), l6;
}

// ../../node_modules/react-grab/dist/primitives.js
var C7 = new Map([`top`, `right`, `bottom`, `left`].flatMap((e5) => [[`border-${e5}-style`, e5], [`border-${e5}-color`, e5]]));
var w6 = null;
var T8 = /* @__PURE__ */ new Map();
var E5 = () => w6 || (w6 = document.createElement(`iframe`), w6.style.cssText = `position:fixed;left:-9999px;width:0;height:0;border:none;visibility:hidden;`, document.body.appendChild(w6), w6);
var D5 = (e5) => {
  let t5 = T8.get(e5);
  if (t5) return t5;
  let n4 = E5(), r6 = n4.contentDocument, i5 = r6.createElement(e5);
  r6.body.appendChild(i5);
  let a5 = n4.contentWindow.getComputedStyle(i5), s5 = /* @__PURE__ */ new Map();
  for (let e6 of Le) {
    let t6 = a5.getPropertyValue(e6);
    t6 && s5.set(e6, t6);
  }
  return i5.remove(), T8.set(e5, s5), s5;
};
var O4 = (e5, t5) => {
  let n4 = C7.get(e5);
  if (!n4) return false;
  let r6 = t5.getPropertyValue(`border-${n4}-width`);
  return r6 === `0px` || r6 === `0`;
};
var k5 = (e5) => {
  if (C(e5)?.supportsDomEditing === false) return ``;
  let t5 = D5(e5.tagName.toLowerCase()), n4 = getComputedStyle(e5), r6 = [];
  for (let e6 of Le) {
    let i6 = n4.getPropertyValue(e6);
    i6 && i6 !== t5.get(e6) && (O4(e6, n4) || r6.push(`${e6}: ${i6};`));
  }
  let i5 = e5.getAttribute(`class`)?.trim(), a5 = r6.join(`
`);
  return i5 ? a5 ? `className: ${i5}

${a5}` : `className: ${i5}` : a5;
};
var I3 = async (e5) => {
  let t5 = await Li(e5), n4 = zr(e5), r6 = k5(e5);
  return { element: e5, snippet: t5.elementInfo, htmlPreview: n4, stackString: t5.stackContext, stack: t5.stack, componentName: t5.componentName, filePath: t5.source?.filePath ?? null, lineNumber: t5.source?.lineNumber ?? null, columnNumber: t5.source?.columnNumber ?? null, fiber: t5.fiber, selector: t5.selector, styles: r6 };
};

// ../../node_modules/react-grab/package.json
var version = "0.2.0";

// ../../node_modules/react-scan/dist/index.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
if (!Array.prototype.toSorted) {
  Object.defineProperty(Array.prototype, "toSorted", {
    value: function(compareFn) {
      return [...this].sort(compareFn);
    },
    writable: true,
    configurable: true
  });
}
var IS_CLIENT = typeof window !== "undefined";
function descending(a5, b5) {
  return b5 - a5;
}
function getComponentGroupNames(group) {
  let result = group[0].name;
  const len = group.length;
  const max = Math.min(4, len);
  for (let i5 = 1; i5 < max; i5++) {
    result += `, ${group[i5].name}`;
  }
  return result;
}
function getComponentGroupTotalTime(group) {
  let result = group[0].time;
  for (let i5 = 1, len = group.length; i5 < len; i5++) {
    result += group[i5].time;
  }
  return result;
}
function componentGroupHasForget(group) {
  for (let i5 = 0, len = group.length; i5 < len; i5++) {
    if (group[i5].forget) {
      return true;
    }
  }
  return false;
}
var getLabelText = (groupedAggregatedRenders) => {
  let labelText = "";
  const componentsByCount = /* @__PURE__ */ new Map();
  for (const aggregatedRender of groupedAggregatedRenders) {
    const { forget, time, aggregatedCount, name } = aggregatedRender;
    if (!componentsByCount.has(aggregatedCount)) {
      componentsByCount.set(aggregatedCount, []);
    }
    const components = componentsByCount.get(aggregatedCount);
    if (components) {
      components.push({ name, forget, time: time != null ? time : 0 });
    }
  }
  const sortedCounts = Array.from(componentsByCount.keys()).sort(descending);
  const parts = [];
  let cumulativeTime = 0;
  for (const count of sortedCounts) {
    const componentGroup = componentsByCount.get(count);
    if (!componentGroup) continue;
    let text = getComponentGroupNames(componentGroup);
    const totalTime = getComponentGroupTotalTime(componentGroup);
    const hasForget = componentGroupHasForget(componentGroup);
    cumulativeTime += totalTime;
    if (componentGroup.length > 4) {
      text += "…";
    }
    if (count > 1) {
      text += ` × ${count}`;
    }
    if (hasForget) {
      text = `✨${text}`;
    }
    parts.push(text);
  }
  labelText = parts.join(", ");
  if (!labelText.length) return null;
  if (labelText.length > 40) {
    labelText = `${labelText.slice(0, 40)}…`;
  }
  if (cumulativeTime >= 0.01) {
    labelText += ` (${Number(cumulativeTime.toFixed(2))}ms)`;
  }
  return labelText;
};
function isEqual(a5, b5) {
  return a5 === b5 || a5 !== a5 && b5 !== b5;
}
var not_globally_unique_generateId = () => {
  if (!IS_CLIENT) {
    return "0";
  }
  if (window.reactScanIdCounter === void 0) {
    window.reactScanIdCounter = 0;
  }
  return `${++window.reactScanIdCounter}`;
};
var playNotificationSound = (audioContext) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  const options = {
    type: "sine",
    freq: [
      392,
      //  523.25,
      600
      //  659.25
    ],
    duration: 0.3,
    gain: 0.12
  };
  const frequencies = options.freq;
  const timePerNote = options.duration / frequencies.length;
  frequencies.forEach((freq, i5) => {
    oscillator.frequency.setValueAtTime(
      freq,
      audioContext.currentTime + i5 * timePerNote
    );
  });
  oscillator.type = options.type;
  gainNode.gain.setValueAtTime(options.gain, audioContext.currentTime);
  gainNode.gain.setTargetAtTime(
    0,
    audioContext.currentTime + options.duration * 0.7,
    0.05
  );
  oscillator.start();
  oscillator.stop(audioContext.currentTime + options.duration);
};
var Icon = D4(({
  size = 15,
  name,
  fill = "currentColor",
  stroke = "currentColor",
  className,
  externalURL = "",
  style
}, ref) => {
  const width = Array.isArray(size) ? size[0] : size;
  const height = Array.isArray(size) ? size[1] || size[0] : size;
  const path = `${externalURL}#${name}`;
  return u5(
    "svg",
    {
      ref,
      width: `${width}px`,
      height: `${height}px`,
      fill,
      stroke,
      className,
      style: {
        ...style,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        minHeight: `${height}px`,
        maxHeight: `${height}px`
      },
      children: [
        u5("title", { children: name }),
        u5("use", { href: path })
      ]
    }
  );
});
var SAFE_AREA = 24;
var COPY_FEEDBACK_DURATION_MS = 600;
var MIN_SIZE = {
  width: 550,
  height: 350,
  initialHeight: 400
};
var MIN_CONTAINER_WIDTH = 240;
var LOCALSTORAGE_KEY = "react-scan-widget-settings-v2";
var LOCALSTORAGE_COLLAPSED_KEY = "react-scan-widget-collapsed-v1";
var LOCALSTORAGE_LAST_VIEW_KEY = "react-scan-widget-last-view-v1";
var TOOLBAR_INTERACTIVE_SELECTOR = "button, a, input, textarea, select, pre, [contenteditable], [data-react-scan-selectable]";
function r5(e5) {
  var t5, f7, n4 = "";
  if ("string" == typeof e5 || "number" == typeof e5) n4 += e5;
  else if ("object" == typeof e5) if (Array.isArray(e5)) {
    var o5 = e5.length;
    for (t5 = 0; t5 < o5; t5++) e5[t5] && (f7 = r5(e5[t5])) && (n4 && (n4 += " "), n4 += f7);
  } else for (f7 in e5) e5[f7] && (n4 && (n4 += " "), n4 += f7);
  return n4;
}
function clsx() {
  for (var e5, t5, f7 = 0, n4 = "", o5 = arguments.length; f7 < o5; f7++) (e5 = arguments[f7]) && (t5 = r5(e5)) && (n4 && (n4 += " "), n4 += t5);
  return n4;
}
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i5 = 0; i5 < array1.length; i5++) {
    combinedArray[i5] = array1[i5];
  }
  for (let i5 = 0; i5 < array2.length; i5++) {
    combinedArray[array1.length + i5] = array2[i5];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i5 = 0; i5 < validatorsLength; i5++) {
    const validatorObj = validators[i5];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i5 = 0; i5 < len; i5++) {
    const classDefinition = classGroup[i5];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i5 = 0; i5 < len; i5++) {
    const [key, value] = entries[i5];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i5 = 0; i5 < len; i5++) {
    const part = parts[i5];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache2 = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache2[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache2;
      cache2 = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache2[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache2) {
        cache2[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i5 = 0; i5 < modifiers.length; i5++) {
      const modifier = modifiers[i5];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i5 = 0; i5 < conflictGroups.length; ++i5) {
      const group = conflictGroups[i5];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k6 = 0; k6 < mix.length; k6++) {
    if (mix[k6]) {
      if (resolvedValue = toValue(mix[k6])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = createTailwindMerge(getDefaultConfig);
var cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
var isFirefox = typeof navigator !== "undefined" && navigator.userAgent.includes("Firefox");
var throttle = (callback, delay) => {
  let lastCall = 0;
  return (e5) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return callback(e5);
    }
    return void 0;
  };
};
var readLocalStorage = (storageKey) => {
  if (!IS_CLIENT) return null;
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};
var saveLocalStorage = (storageKey, state) => {
  if (!IS_CLIENT) return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
  }
};
var removeLocalStorage = (storageKey) => {
  if (!IS_CLIENT) return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
  }
};
var LazyComponentTag = 24;
var ProfilerTag = 12;
var getExtendedDisplayName = (fiber) => {
  if (!fiber) {
    return {
      name: "Unknown",
      wrappers: [],
      wrapperTypes: []
    };
  }
  const { tag, type, elementType } = fiber;
  let name = Ee(type);
  const wrappers = [];
  const wrapperTypes = [];
  if (Te(fiber) || tag === oe || tag === ae || (type == null ? void 0 : type.$$typeof) === /* @__PURE__ */ Symbol.for("react.memo") || (elementType == null ? void 0 : elementType.$$typeof) === /* @__PURE__ */ Symbol.for("react.memo")) {
    const compiler = Te(fiber);
    wrapperTypes.push({
      type: "memo",
      title: compiler ? "This component has been auto-memoized by the React Compiler." : "Memoized component that skips re-renders if props are the same",
      compiler
    });
  }
  if (tag === LazyComponentTag) {
    wrapperTypes.push({
      type: "lazy",
      title: "Lazily loaded component that supports code splitting"
    });
  }
  if (tag === ie) {
    wrapperTypes.push({
      type: "suspense",
      title: "Component that can suspend while content is loading"
    });
  }
  if (tag === ProfilerTag) {
    wrapperTypes.push({
      type: "profiler",
      title: "Component that measures rendering performance"
    });
  }
  if (typeof name === "string") {
    const wrapperRegex = /^(\w+)\((.*)\)$/;
    let currentName = name;
    while (wrapperRegex.test(currentName)) {
      const match = currentName.match(wrapperRegex);
      if ((match == null ? void 0 : match[1]) && (match == null ? void 0 : match[2])) {
        wrappers.unshift(match[1]);
        currentName = match[2];
      } else {
        break;
      }
    }
    name = currentName;
  }
  return {
    name: name || "Unknown",
    wrappers,
    wrapperTypes
  };
};
var isFiniteNonNegative = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;
var isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
var getSafeArea = () => {
  const value = ReactScanInternals.options.value.safeArea;
  if (isFiniteNonNegative(value)) {
    return { top: value, right: value, bottom: value, left: value };
  }
  if (isPlainObject(value)) {
    const top = value.top;
    const right = value.right;
    const bottom = value.bottom;
    const left = value.left;
    return {
      top: isFiniteNonNegative(top) ? top : SAFE_AREA,
      right: isFiniteNonNegative(right) ? right : SAFE_AREA,
      bottom: isFiniteNonNegative(bottom) ? bottom : SAFE_AREA,
      left: isFiniteNonNegative(left) ? left : SAFE_AREA
    };
  }
  return {
    top: SAFE_AREA,
    right: SAFE_AREA,
    bottom: SAFE_AREA,
    left: SAFE_AREA
  };
};
var signalIsSettingsOpen = y4(false);
var signalRefWidget = y4(
  null
);
var getDefaultWidgetConfig = () => ({
  corner: "bottom-right",
  dimensions: {
    isFullWidth: false,
    isFullHeight: false,
    width: MIN_SIZE.width,
    height: MIN_SIZE.height,
    position: { x: SAFE_AREA, y: SAFE_AREA }
  },
  lastDimensions: {
    isFullWidth: false,
    isFullHeight: false,
    width: MIN_SIZE.width,
    height: MIN_SIZE.height,
    position: { x: SAFE_AREA, y: SAFE_AREA }
  },
  componentsTree: {
    width: MIN_CONTAINER_WIDTH
  }
});
var defaultWidgetConfig = getDefaultWidgetConfig();
var getInitialWidgetConfig = () => {
  var _a, _b, _c, _d, _e2;
  const defaults = getDefaultWidgetConfig();
  const stored = readLocalStorage(LOCALSTORAGE_KEY);
  if (!stored) {
    saveLocalStorage(LOCALSTORAGE_KEY, {
      corner: defaults.corner,
      dimensions: defaults.dimensions,
      lastDimensions: defaults.lastDimensions,
      componentsTree: defaults.componentsTree
    });
    return defaults;
  }
  return {
    corner: (_a = stored.corner) != null ? _a : defaults.corner,
    dimensions: (_b = stored.dimensions) != null ? _b : defaults.dimensions,
    lastDimensions: (_d = (_c = stored.lastDimensions) != null ? _c : stored.dimensions) != null ? _d : defaults.lastDimensions,
    componentsTree: (_e2 = stored.componentsTree) != null ? _e2 : defaults.componentsTree
  };
};
var signalWidget = y4(getInitialWidgetConfig());
var updateDimensions = () => {
  if (!IS_CLIENT) return;
  const { dimensions } = signalWidget.value;
  const { width, height, position } = dimensions;
  const safeArea = getSafeArea();
  signalWidget.value = {
    ...signalWidget.value,
    dimensions: {
      isFullWidth: width >= window.innerWidth - safeArea.left - safeArea.right,
      isFullHeight: height >= window.innerHeight - safeArea.top - safeArea.bottom,
      width,
      height,
      position
    }
  };
};
var signalWidgetViews = y4({
  view: "none"
});
var storedCollapsed = readLocalStorage(
  LOCALSTORAGE_COLLAPSED_KEY
);
var signalWidgetCollapsed = y4(storedCollapsed != null ? storedCollapsed : null);
function CONSTANT_UPDATE() {
  return false;
}
function constant(Component3) {
  function Memoed(props) {
    this.shouldComponentUpdate = CONSTANT_UPDATE;
    return k2(Component3, props);
  }
  Memoed.displayName = `Memo(${Component3.displayName || Component3.name})`;
  Memoed.prototype.isReactComponent = true;
  Memoed._forwarded = true;
  return Memoed;
}
var useVirtualList = (options) => {
  const { count, getScrollElement, estimateSize, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = d4(0);
  const [containerHeight, setContainerHeight] = d4(0);
  const refResizeObserver = A3();
  const refScrollElement = A3(null);
  const refRafId = A3(null);
  const itemHeight = estimateSize();
  const updateContainer = q3((entries) => {
    var _a, _b;
    if (!refScrollElement.current) return;
    const height = (_b = (_a = entries == null ? void 0 : entries[0]) == null ? void 0 : _a.contentRect.height) != null ? _b : refScrollElement.current.getBoundingClientRect().height;
    setContainerHeight(height);
  }, []);
  const debouncedUpdateContainer = q3(() => {
    if (refRafId.current !== null) {
      cancelAnimationFrame(refRafId.current);
    }
    refRafId.current = requestAnimationFrame(() => {
      updateContainer();
      refRafId.current = null;
    });
  }, [updateContainer]);
  h4(() => {
    const element = getScrollElement();
    if (!element) return;
    refScrollElement.current = element;
    const handleScroll = () => {
      if (!refScrollElement.current) return;
      setScrollTop(refScrollElement.current.scrollTop);
    };
    updateContainer();
    if (!refResizeObserver.current) {
      refResizeObserver.current = new ResizeObserver(() => {
        debouncedUpdateContainer();
      });
    }
    refResizeObserver.current.observe(element);
    element.addEventListener("scroll", handleScroll, { passive: true });
    const mutationObserver = new MutationObserver(debouncedUpdateContainer);
    mutationObserver.observe(element, {
      attributes: true,
      childList: true,
      subtree: true
    });
    return () => {
      element.removeEventListener("scroll", handleScroll);
      if (refResizeObserver.current) {
        refResizeObserver.current.disconnect();
      }
      mutationObserver.disconnect();
      if (refRafId.current !== null) {
        cancelAnimationFrame(refRafId.current);
      }
    };
  }, [getScrollElement, updateContainer, debouncedUpdateContainer]);
  const visibleRange = T3(() => {
    const start2 = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    return {
      start: Math.max(0, start2 - overscan),
      end: Math.min(count, start2 + visibleCount + overscan)
    };
  }, [scrollTop, itemHeight, containerHeight, count, overscan]);
  const items = T3(() => {
    const virtualItems = [];
    for (let index = visibleRange.start; index < visibleRange.end; index++) {
      virtualItems.push({
        key: index,
        index,
        start: index * itemHeight
      });
    }
    return virtualItems;
  }, [visibleRange, itemHeight]);
  return {
    virtualItems: items,
    totalSize: count * itemHeight,
    scrollTop,
    containerHeight
  };
};
var getFiberPath = (fiber) => {
  var _a;
  const pathSegments = [];
  let currentFiber = fiber;
  while (currentFiber) {
    const elementType = currentFiber.elementType;
    const name = typeof elementType === "function" ? elementType.displayName || elementType.name : typeof elementType === "string" ? elementType : "Unknown";
    const index = currentFiber.index !== void 0 ? `[${currentFiber.index}]` : "";
    pathSegments.unshift(`${name}${index}`);
    currentFiber = (_a = currentFiber.return) != null ? _a : null;
  }
  return pathSegments.join("::");
};
var fadeOutTimers = /* @__PURE__ */ new WeakMap();
var trackElementPosition = (element, callback) => {
  const handleScroll = callback.bind(null, element);
  document.addEventListener("scroll", handleScroll, {
    passive: true,
    capture: true
  });
  return () => {
    document.removeEventListener("scroll", handleScroll, { capture: true });
  };
};
var flashManager = {
  activeFlashes: /* @__PURE__ */ new Map(),
  create(container) {
    const existingOverlay = container.querySelector(
      ".react-scan-flash-overlay"
    );
    const overlay = existingOverlay instanceof HTMLElement ? existingOverlay : (() => {
      const newOverlay = document.createElement("div");
      newOverlay.className = "react-scan-flash-overlay";
      container.appendChild(newOverlay);
      const scrollCleanup = trackElementPosition(container, () => {
        if (container.querySelector(".react-scan-flash-overlay")) {
          this.create(container);
        }
      });
      this.activeFlashes.set(container, {
        element: container,
        overlay: newOverlay,
        scrollCleanup
      });
      return newOverlay;
    })();
    const existingTimer = fadeOutTimers.get(overlay);
    if (existingTimer) {
      clearTimeout(existingTimer);
      fadeOutTimers.delete(overlay);
    }
    requestAnimationFrame(() => {
      overlay.style.transition = "none";
      overlay.style.opacity = "0.9";
      const timerId = setTimeout(() => {
        overlay.style.transition = "opacity 150ms ease-out";
        overlay.style.opacity = "0";
        const cleanupTimer = setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          const entry = this.activeFlashes.get(container);
          if (entry == null ? void 0 : entry.scrollCleanup) {
            entry.scrollCleanup();
          }
          this.activeFlashes.delete(container);
          fadeOutTimers.delete(overlay);
        }, 150);
        fadeOutTimers.set(overlay, cleanupTimer);
      }, 300);
      fadeOutTimers.set(overlay, timerId);
    });
  },
  cleanup(container) {
    const entry = this.activeFlashes.get(container);
    if (entry) {
      const existingTimer = fadeOutTimers.get(entry.overlay);
      if (existingTimer) {
        clearTimeout(existingTimer);
        fadeOutTimers.delete(entry.overlay);
      }
      if (entry.overlay.parentNode) {
        entry.overlay.parentNode.removeChild(entry.overlay);
      }
      if (entry.scrollCleanup) {
        entry.scrollCleanup();
      }
      this.activeFlashes.delete(container);
    }
  },
  cleanupAll() {
    for (const [, entry] of this.activeFlashes) {
      this.cleanup(entry.element);
    }
  }
};
var TIMELINE_MAX_UPDATES = 1e3;
var timelineStateDefault = {
  updates: [],
  currentFiber: null,
  totalUpdates: 0,
  windowOffset: 0,
  currentIndex: 0,
  isViewingHistory: false,
  latestFiber: null,
  isVisible: false,
  playbackSpeed: 1
};
var timelineState = y4(timelineStateDefault);
var inspectorUpdateSignal = y4(0);
var pendingUpdates = [];
var batchTimeout = null;
var batchUpdates = () => {
  if (pendingUpdates.length === 0) return;
  const batchedUpdates = [...pendingUpdates];
  const { updates, totalUpdates, currentIndex, isViewingHistory } = timelineState.value;
  const newUpdates = [...updates];
  let newTotalUpdates = totalUpdates;
  for (const { update } of batchedUpdates) {
    if (newUpdates.length >= TIMELINE_MAX_UPDATES) {
      newUpdates.shift();
    }
    newUpdates.push(update);
    newTotalUpdates++;
  }
  const newWindowOffset = Math.max(0, newTotalUpdates - TIMELINE_MAX_UPDATES);
  let newCurrentIndex;
  if (isViewingHistory) {
    if (currentIndex === totalUpdates - 1) {
      newCurrentIndex = newUpdates.length - 1;
    } else if (currentIndex === 0) {
      newCurrentIndex = 0;
    } else {
      if (newWindowOffset === 0) {
        newCurrentIndex = currentIndex;
      } else {
        newCurrentIndex = currentIndex - 1;
      }
    }
  } else {
    newCurrentIndex = newUpdates.length - 1;
  }
  const lastUpdate = batchedUpdates[batchedUpdates.length - 1];
  timelineState.value = {
    ...timelineState.value,
    latestFiber: lastUpdate.fiber,
    updates: newUpdates,
    totalUpdates: newTotalUpdates,
    windowOffset: newWindowOffset,
    currentIndex: newCurrentIndex,
    isViewingHistory
  };
  pendingUpdates = pendingUpdates.slice(batchedUpdates.length);
};
var timelineActions = {
  showTimeline: () => {
    timelineState.value = {
      ...timelineState.value,
      isVisible: true
    };
  },
  hideTimeline: () => {
    timelineState.value = {
      ...timelineState.value,
      isVisible: false,
      currentIndex: timelineState.value.updates.length - 1
    };
  },
  updateFrame: (index, isViewingHistory) => {
    timelineState.value = {
      ...timelineState.value,
      currentIndex: index,
      isViewingHistory
    };
  },
  updatePlaybackSpeed: (speed) => {
    timelineState.value = {
      ...timelineState.value,
      playbackSpeed: speed
    };
  },
  addUpdate: (update, latestFiber) => {
    pendingUpdates.push({ update, fiber: latestFiber });
    if (!batchTimeout) {
      const processBatch = () => {
        batchUpdates();
        batchTimeout = null;
        if (pendingUpdates.length > 0) {
          batchTimeout = setTimeout(processBatch, 96);
        }
      };
      batchTimeout = setTimeout(processBatch, 96);
    }
  },
  reset: () => {
    if (batchTimeout) {
      clearTimeout(batchTimeout);
      batchTimeout = null;
    }
    pendingUpdates = [];
    timelineState.value = timelineStateDefault;
  }
};
var searchState = y4({
  query: "",
  matches: [],
  currentMatchIndex: -1
});
var signalSkipTreeUpdate = y4(false);
var flattenTree = (nodes, depth = 0, parentPath = null) => {
  return nodes.reduce((acc, node, index) => {
    var _a, _b;
    const nodePath = node.element ? getFiberPath(node.fiber) : `${parentPath}-${index}`;
    const renderData = ((_a = node.fiber) == null ? void 0 : _a.type) ? getRenderData(node.fiber) : void 0;
    const flatNode = {
      ...node,
      depth,
      nodeId: nodePath,
      parentId: parentPath,
      fiber: node.fiber,
      renderData
    };
    acc.push(flatNode);
    if ((_b = node.children) == null ? void 0 : _b.length) {
      acc.push(...flattenTree(node.children, depth + 1, nodePath));
    }
    return acc;
  }, []);
};
var getMaxDepth = (nodes) => {
  return nodes.reduce((max, node) => Math.max(max, node.depth), 0);
};
var calculateIndentSize = (containerWidth, maxDepth) => {
  const MIN_INDENT = 0;
  const MAX_INDENT = 24;
  const MIN_TOTAL_INDENT = 24;
  if (maxDepth <= 0) return MAX_INDENT;
  const availableSpace = Math.max(0, containerWidth - MIN_CONTAINER_WIDTH);
  if (availableSpace < MIN_TOTAL_INDENT) return MIN_INDENT;
  const targetTotalIndent = Math.min(
    availableSpace * 0.3,
    maxDepth * MAX_INDENT
  );
  const baseIndent = targetTotalIndent / maxDepth;
  return Math.max(MIN_INDENT, Math.min(MAX_INDENT, baseIndent));
};
var VALID_TYPES = ["memo", "forwardRef", "lazy", "suspense"];
var parseTypeSearch = (query) => {
  const typeMatch = query.match(/\[(.*?)\]/);
  if (!typeMatch) return null;
  const typeSearches = [];
  const parts = typeMatch[1].split(",");
  for (const part of parts) {
    const trimmed = part.trim().toLowerCase();
    if (trimmed) typeSearches.push(trimmed);
  }
  return typeSearches;
};
var isValidTypeSearch = (typeSearches) => {
  if (typeSearches.length === 0) return false;
  for (const search of typeSearches) {
    let isValid = false;
    for (const validType of VALID_TYPES) {
      if (validType.toLowerCase().includes(search)) {
        isValid = true;
        break;
      }
    }
    if (!isValid) return false;
  }
  return true;
};
var matchesTypeSearch = (typeSearches, wrapperTypes) => {
  if (typeSearches.length === 0) return true;
  if (!wrapperTypes.length) return false;
  for (const search of typeSearches) {
    let foundMatch = false;
    for (const wrapper of wrapperTypes) {
      if (wrapper.type.toLowerCase().includes(search)) {
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) return false;
  }
  return true;
};
var useNodeHighlighting = (node, searchValue) => {
  return T3(() => {
    const { query, matches } = searchValue;
    const isMatch = matches.some((match) => match.nodeId === node.nodeId);
    const typeSearches = parseTypeSearch(query) || [];
    const searchQuery = query ? query.replace(/\[.*?\]/, "").trim() : "";
    if (!query || !isMatch) {
      return {
        highlightedText: u5("span", { className: "truncate", children: node.label }),
        typeHighlight: false
      };
    }
    let matchesType = true;
    if (typeSearches.length > 0) {
      if (!node.fiber) {
        matchesType = false;
      } else {
        const { wrapperTypes } = getExtendedDisplayName(node.fiber);
        matchesType = matchesTypeSearch(typeSearches, wrapperTypes);
      }
    }
    let textContent = u5("span", { className: "truncate", children: node.label });
    if (searchQuery) {
      try {
        if (searchQuery.startsWith("/") && searchQuery.endsWith("/")) {
          const pattern = searchQuery.slice(1, -1);
          const regex = new RegExp(`(${pattern})`, "i");
          const parts = node.label.split(regex);
          textContent = u5("span", { className: "tree-node-search-highlight", children: parts.map(
            (part, index) => regex.test(part) ? u5(
              "span",
              {
                className: cn("regex", {
                  start: regex.test(part) && index === 0,
                  middle: regex.test(part) && index % 2 === 1,
                  end: regex.test(part) && index === parts.length - 1,
                  "!ml-0": index === 1
                }),
                children: part
              },
              `${node.nodeId}-${part}`
            ) : part
          ) });
        } else {
          const lowerLabel = node.label.toLowerCase();
          const lowerQuery = searchQuery.toLowerCase();
          const index = lowerLabel.indexOf(lowerQuery);
          if (index >= 0) {
            textContent = u5("span", { className: "tree-node-search-highlight", children: [
              node.label.slice(0, index),
              u5("span", { className: "single", children: node.label.slice(index, index + searchQuery.length) }),
              node.label.slice(index + searchQuery.length)
            ] });
          }
        }
      } catch {
      }
    }
    return {
      highlightedText: textContent,
      typeHighlight: matchesType && typeSearches.length > 0
    };
  }, [node.label, node.nodeId, node.fiber, searchValue]);
};
var formatTime = (time) => {
  if (time > 0) {
    if (time < 0.1 - Number.EPSILON) {
      return "< 0.1";
    }
    if (time < 1e3) {
      return Number(time.toFixed(1)).toString();
    }
    return `${(time / 1e3).toFixed(1)}k`;
  }
  return "0";
};
var TreeNodeItem = ({
  node,
  nodeIndex,
  hasChildren,
  isCollapsed,
  handleTreeNodeClick,
  handleTreeNodeToggle,
  searchValue
}) => {
  var _a, _b, _c;
  const refRenderCount = A3(null);
  const refPrevRenderCount = A3((_b = (_a = node.renderData) == null ? void 0 : _a.renderCount) != null ? _b : 0);
  const { highlightedText, typeHighlight } = useNodeHighlighting(
    node,
    searchValue
  );
  h4(() => {
    var _a2;
    const currentRenderCount = (_a2 = node.renderData) == null ? void 0 : _a2.renderCount;
    const element = refRenderCount.current;
    if (!element || !refPrevRenderCount.current || !currentRenderCount || refPrevRenderCount.current === currentRenderCount) {
      return;
    }
    element.classList.remove("count-flash");
    void element.offsetWidth;
    element.classList.add("count-flash");
    refPrevRenderCount.current = currentRenderCount;
  }, [(_c = node.renderData) == null ? void 0 : _c.renderCount]);
  const renderTimeInfo = T3(() => {
    if (!node.renderData) return null;
    const { selfTime, totalTime, renderCount } = node.renderData;
    if (!renderCount) {
      return null;
    }
    return u5(
      "span",
      {
        className: cn(
          "flex items-center gap-x-0.5 ml-1.5",
          "text-[10px] text-neutral-400"
        ),
        children: u5(
          "span",
          {
            ref: refRenderCount,
            title: `Self time: ${formatTime(selfTime)}ms
Total time: ${formatTime(totalTime)}ms`,
            className: "count-badge",
            children: [
              "×",
              renderCount
            ]
          }
        )
      }
    );
  }, [node.renderData]);
  const componentTypes = T3(() => {
    if (!node.fiber) return null;
    const { wrapperTypes } = getExtendedDisplayName(node.fiber);
    const firstWrapperType = wrapperTypes[0];
    return u5(
      "span",
      {
        className: cn(
          "flex items-center gap-x-1",
          "text-[10px] text-neutral-400 tracking-wide",
          "overflow-hidden"
        ),
        children: [
          firstWrapperType && u5(S2, { children: [
            u5(
              "span",
              {
                title: firstWrapperType == null ? void 0 : firstWrapperType.title,
                className: cn(
                  "rounded py-[1px] px-1",
                  "bg-neutral-700 text-neutral-300",
                  "truncate",
                  firstWrapperType.type === "memo" && "bg-[#8e61e3] text-white",
                  typeHighlight && "bg-yellow-300 text-black"
                ),
                children: firstWrapperType.type
              },
              firstWrapperType.type
            ),
            firstWrapperType.compiler && u5("span", { className: "text-yellow-300 ml-1", children: "✨" })
          ] }),
          wrapperTypes.length > 1 && `×${wrapperTypes.length}`,
          renderTimeInfo
        ]
      }
    );
  }, [node.fiber, typeHighlight, renderTimeInfo]);
  return u5(
    "button",
    {
      type: "button",
      title: node.title,
      "data-index": nodeIndex,
      className: cn(
        "flex items-center gap-x-1",
        "pl-1 pr-2",
        "w-full h-7",
        "text-left",
        "rounded",
        "cursor-pointer select-none"
      ),
      onClick: handleTreeNodeClick,
      children: [
        u5(
          "button",
          {
            type: "button",
            "data-index": nodeIndex,
            onClick: handleTreeNodeToggle,
            className: cn("w-6 h-6 flex items-center justify-center", "text-left"),
            children: hasChildren && u5(
              Icon,
              {
                name: "icon-chevron-right",
                size: 12,
                className: cn("transition-transform", !isCollapsed && "rotate-90")
              }
            )
          }
        ),
        highlightedText,
        componentTypes
      ]
    }
  );
};
var ComponentsTree = () => {
  const refContainer = A3(null);
  const refMainContainer = A3(null);
  const refSearchInputContainer = A3(null);
  const refSearchInput = A3(null);
  const refSelectedElement = A3(null);
  const refMaxTreeDepth = A3(0);
  const refIsHovering = A3(false);
  const refIsResizing = A3(false);
  const refResizeHandle = A3(null);
  const [flattenedNodes, setFlattenedNodes] = d4([]);
  const [collapsedNodes, setCollapsedNodes] = d4(/* @__PURE__ */ new Set());
  const [selectedIndex, setSelectedIndex] = d4(
    void 0
  );
  const [searchValue, setSearchValue] = d4(searchState.value);
  const visibleNodes = T3(() => {
    const visible = [];
    const nodes = flattenedNodes;
    const nodeMap = new Map(nodes.map((node) => [node.nodeId, node]));
    for (const node of nodes) {
      let isVisible = true;
      let currentNode = node;
      while (currentNode.parentId) {
        const parent = nodeMap.get(currentNode.parentId);
        if (!parent) break;
        if (collapsedNodes.has(parent.nodeId)) {
          isVisible = false;
          break;
        }
        currentNode = parent;
      }
      if (isVisible) {
        visible.push(node);
      }
    }
    return visible;
  }, [collapsedNodes, flattenedNodes]);
  const ITEM_HEIGHT = 28;
  const { virtualItems, totalSize } = useVirtualList({
    count: visibleNodes.length,
    getScrollElement: () => refContainer.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5
  });
  const handleElementClick = q3(
    (element) => {
      var _a;
      refIsHovering.current = true;
      (_a = refSearchInput.current) == null ? void 0 : _a.blur();
      signalSkipTreeUpdate.value = true;
      const { parentCompositeFiber } = getCompositeComponentFromElement(element);
      if (!parentCompositeFiber) return;
      Store.inspectState.value = {
        kind: "focused",
        focusedDomElement: element,
        fiber: parentCompositeFiber
      };
      const nodeIndex = visibleNodes.findIndex(
        (node) => node.element === element
      );
      if (nodeIndex !== -1) {
        setSelectedIndex(nodeIndex);
        const itemTop = nodeIndex * ITEM_HEIGHT;
        const container = refContainer.current;
        if (container) {
          const containerHeight = container.clientHeight;
          const scrollTop = container.scrollTop;
          if (itemTop < scrollTop || itemTop + ITEM_HEIGHT > scrollTop + containerHeight) {
            container.scrollTo({
              top: Math.max(0, itemTop - containerHeight / 2),
              behavior: "instant"
            });
          }
        }
      }
    },
    [visibleNodes]
  );
  const handleTreeNodeClick = q3(
    (e5) => {
      const target = e5.currentTarget;
      const index = Number(target.dataset.index);
      if (Number.isNaN(index)) return;
      const element = visibleNodes[index].element;
      if (!element) return;
      handleElementClick(element);
    },
    [visibleNodes, handleElementClick]
  );
  const handleToggle = q3((nodeId) => {
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);
  const handleTreeNodeToggle = q3(
    (e5) => {
      e5.stopPropagation();
      const target = e5.target;
      const index = Number(target.dataset.index);
      if (Number.isNaN(index)) return;
      const nodeId = visibleNodes[index].nodeId;
      handleToggle(nodeId);
    },
    [visibleNodes, handleToggle]
  );
  const handleOnChangeSearch = q3(
    (query) => {
      var _a, _b, _c, _d, _e2;
      (_a = refSearchInputContainer.current) == null ? void 0 : _a.classList.remove("!border-red-500");
      const matches = [];
      if (!query) {
        searchState.value = { query, matches, currentMatchIndex: -1 };
        return;
      }
      if (query.includes("[") && !query.includes("]")) {
        if (query.length > query.indexOf("[") + 1) {
          (_b = refSearchInputContainer.current) == null ? void 0 : _b.classList.add("!border-red-500");
          return;
        }
      }
      const typeSearches = parseTypeSearch(query) || [];
      if (query.includes("[")) {
        if (!isValidTypeSearch(typeSearches)) {
          (_c = refSearchInputContainer.current) == null ? void 0 : _c.classList.add("!border-red-500");
          return;
        }
      }
      const searchQuery = query.replace(/\[.*?\]/, "").trim();
      const isRegex = /^\/.*\/$/.test(searchQuery);
      let matchesLabel = (_label) => false;
      if (searchQuery.startsWith("/") && !isRegex) {
        if (searchQuery.length > 1) {
          (_d = refSearchInputContainer.current) == null ? void 0 : _d.classList.add("!border-red-500");
          return;
        }
      }
      if (isRegex) {
        try {
          const pattern = searchQuery.slice(1, -1);
          const regex = new RegExp(pattern, "i");
          matchesLabel = (label) => regex.test(label);
        } catch {
          (_e2 = refSearchInputContainer.current) == null ? void 0 : _e2.classList.add("!border-red-500");
          return;
        }
      } else if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        matchesLabel = (label) => label.toLowerCase().includes(lowerQuery);
      }
      for (const node of flattenedNodes) {
        let matchesSearch = true;
        if (searchQuery) {
          matchesSearch = matchesLabel(node.label);
        }
        if (matchesSearch && typeSearches.length > 0) {
          if (!node.fiber) {
            matchesSearch = false;
          } else {
            const { wrapperTypes } = getExtendedDisplayName(node.fiber);
            matchesSearch = matchesTypeSearch(typeSearches, wrapperTypes);
          }
        }
        if (matchesSearch) {
          matches.push(node);
        }
      }
      searchState.value = {
        query,
        matches,
        currentMatchIndex: matches.length > 0 ? 0 : -1
      };
      if (matches.length > 0) {
        const firstMatch = matches[0];
        const nodeIndex = visibleNodes.findIndex(
          (node) => node.nodeId === firstMatch.nodeId
        );
        if (nodeIndex !== -1) {
          const itemTop = nodeIndex * ITEM_HEIGHT;
          const container = refContainer.current;
          if (container) {
            const containerHeight = container.clientHeight;
            container.scrollTo({
              top: Math.max(0, itemTop - containerHeight / 2),
              behavior: "instant"
            });
          }
        }
      }
    },
    [flattenedNodes, visibleNodes]
  );
  const handleInputChange = q3(
    (e5) => {
      const target = e5.currentTarget;
      if (!target) return;
      handleOnChangeSearch(target.value);
    },
    [handleOnChangeSearch]
  );
  const navigateSearch = q3(
    (direction) => {
      const { matches, currentMatchIndex } = searchState.value;
      if (matches.length === 0) return;
      const newIndex = direction === "next" ? (currentMatchIndex + 1) % matches.length : (currentMatchIndex - 1 + matches.length) % matches.length;
      searchState.value = {
        ...searchState.value,
        currentMatchIndex: newIndex
      };
      const currentMatch = matches[newIndex];
      const nodeIndex = visibleNodes.findIndex(
        (node) => node.nodeId === currentMatch.nodeId
      );
      if (nodeIndex !== -1) {
        setSelectedIndex(nodeIndex);
        const itemTop = nodeIndex * ITEM_HEIGHT;
        const container = refContainer.current;
        if (container) {
          const containerHeight = container.clientHeight;
          container.scrollTo({
            top: Math.max(0, itemTop - containerHeight / 2),
            behavior: "instant"
          });
        }
      }
    },
    [visibleNodes]
  );
  const updateContainerWidths = q3((width) => {
    if (refMainContainer.current) {
      refMainContainer.current.style.width = `${width}px`;
    }
    if (refContainer.current) {
      refContainer.current.style.width = `${width}px`;
      const indentSize = calculateIndentSize(width, refMaxTreeDepth.current);
      refContainer.current.style.setProperty(
        "--indentation-size",
        `${indentSize}px`
      );
    }
  }, []);
  const updateResizeDirection = q3((width) => {
    if (!refResizeHandle.current) return;
    const parentWidth = signalWidget.value.dimensions.width;
    const maxWidth = Math.floor(parentWidth - MIN_CONTAINER_WIDTH / 2);
    refResizeHandle.current.classList.remove(
      "cursor-ew-resize",
      "cursor-w-resize",
      "cursor-e-resize"
    );
    if (width <= MIN_CONTAINER_WIDTH) {
      refResizeHandle.current.classList.add("cursor-w-resize");
    } else if (width >= maxWidth) {
      refResizeHandle.current.classList.add("cursor-e-resize");
    } else {
      refResizeHandle.current.classList.add("cursor-ew-resize");
    }
  }, []);
  const handleResize = q3(
    (e5) => {
      e5.preventDefault();
      e5.stopPropagation();
      if (!refContainer.current) return;
      refContainer.current.style.setProperty("pointer-events", "none");
      refIsResizing.current = true;
      const startX = e5.clientX;
      const startWidth = refContainer.current.offsetWidth;
      const parentWidth = signalWidget.value.dimensions.width;
      const maxWidth = Math.floor(parentWidth - MIN_CONTAINER_WIDTH / 2);
      updateResizeDirection(startWidth);
      const handlePointerMove = (e22) => {
        const delta = startX - e22.clientX;
        const newWidth = startWidth + delta;
        updateResizeDirection(newWidth);
        const clampedWidth = Math.min(
          maxWidth,
          Math.max(MIN_CONTAINER_WIDTH, newWidth)
        );
        updateContainerWidths(clampedWidth);
      };
      const handlePointerUp = () => {
        if (!refContainer.current) return;
        refContainer.current.style.removeProperty("pointer-events");
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        signalWidget.value = {
          ...signalWidget.value,
          componentsTree: {
            ...signalWidget.value.componentsTree,
            width: refContainer.current.offsetWidth
          }
        };
        saveLocalStorage(LOCALSTORAGE_KEY, signalWidget.value);
        refIsResizing.current = false;
      };
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [updateContainerWidths, updateResizeDirection]
  );
  h4(() => {
    if (!refContainer.current) return;
    const currentWidth = refContainer.current.offsetWidth;
    updateResizeDirection(currentWidth);
    return signalWidget.subscribe(() => {
      if (!refContainer.current) return;
      updateResizeDirection(refContainer.current.offsetWidth);
    });
  }, [updateResizeDirection]);
  const onPointerLeave = q3(() => {
    refIsHovering.current = false;
  }, []);
  h4(() => {
    let isInitialTreeBuild = true;
    const buildTreeFromElements = (elements) => {
      const nodeMap = /* @__PURE__ */ new Map();
      const rootNodes = [];
      for (const { element, name, fiber } of elements) {
        if (!element) continue;
        let title = name;
        const { name: componentName, wrappers } = getExtendedDisplayName(fiber);
        if (componentName) {
          if (wrappers.length > 0) {
            title = `${wrappers.join("(")}(${componentName})${")".repeat(wrappers.length)}`;
          } else {
            title = componentName;
          }
        }
        nodeMap.set(element, {
          label: componentName || name,
          title,
          children: [],
          element,
          fiber
        });
      }
      for (const { element, depth } of elements) {
        if (!element) continue;
        const node = nodeMap.get(element);
        if (!node) continue;
        if (depth === 0) {
          rootNodes.push(node);
        } else {
          let parent = element.parentElement;
          while (parent) {
            const parentNode = nodeMap.get(parent);
            if (parentNode) {
              parentNode.children = parentNode.children || [];
              parentNode.children.push(node);
              break;
            }
            parent = parent.parentElement;
          }
        }
      }
      return rootNodes;
    };
    const updateTree = () => {
      const element = refSelectedElement.current;
      if (!element) return;
      const inspectableElements = getInspectableElements();
      const tree = buildTreeFromElements(inspectableElements);
      if (tree.length > 0) {
        const flattened = flattenTree(tree);
        const newMaxDepth = getMaxDepth(flattened);
        refMaxTreeDepth.current = newMaxDepth;
        updateContainerWidths(signalWidget.value.componentsTree.width);
        setFlattenedNodes(flattened);
        if (isInitialTreeBuild) {
          isInitialTreeBuild = false;
          const focusedIndex = flattened.findIndex(
            (node) => node.element === element
          );
          if (focusedIndex !== -1) {
            const itemTop = focusedIndex * ITEM_HEIGHT;
            const container = refContainer.current;
            if (container) {
              setTimeout(() => {
                container.scrollTo({
                  top: itemTop,
                  behavior: "instant"
                });
              }, 96);
            }
          }
        }
      }
    };
    const unsubscribeStore = Store.inspectState.subscribe((state) => {
      if (state.kind === "focused") {
        if (signalSkipTreeUpdate.value) {
          return;
        }
        handleOnChangeSearch("");
        refSelectedElement.current = state.focusedDomElement;
        updateTree();
      }
    });
    let rafId = 0;
    const unsubscribeUpdates = inspectorUpdateSignal.subscribe(() => {
      if (Store.inspectState.value.kind === "focused") {
        cancelAnimationFrame(rafId);
        if (refIsResizing.current) return;
        rafId = requestAnimationFrame(() => {
          signalSkipTreeUpdate.value = false;
          updateTree();
        });
      }
    });
    return () => {
      unsubscribeStore();
      unsubscribeUpdates();
      searchState.value = {
        query: "",
        matches: [],
        currentMatchIndex: -1
      };
    };
  }, []);
  h4(() => {
    const handleKeyDown = (e5) => {
      if (!refIsHovering.current) return;
      if (!selectedIndex) return;
      switch (e5.key) {
        case "ArrowUp": {
          e5.preventDefault();
          e5.stopPropagation();
          if (selectedIndex > 0) {
            const currentNode = visibleNodes[selectedIndex - 1];
            if (currentNode == null ? void 0 : currentNode.element) {
              handleElementClick(currentNode.element);
            }
          }
          return;
        }
        case "ArrowDown": {
          e5.preventDefault();
          e5.stopPropagation();
          if (selectedIndex < visibleNodes.length - 1) {
            const currentNode = visibleNodes[selectedIndex + 1];
            if (currentNode == null ? void 0 : currentNode.element) {
              handleElementClick(currentNode.element);
            }
          }
          return;
        }
        case "ArrowLeft": {
          e5.preventDefault();
          e5.stopPropagation();
          const currentNode = visibleNodes[selectedIndex];
          if (currentNode == null ? void 0 : currentNode.nodeId) {
            handleToggle(currentNode.nodeId);
          }
          return;
        }
        case "ArrowRight": {
          e5.preventDefault();
          e5.stopPropagation();
          const currentNode = visibleNodes[selectedIndex];
          if (currentNode == null ? void 0 : currentNode.nodeId) {
            handleToggle(currentNode.nodeId);
          }
          return;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, visibleNodes, handleElementClick, handleToggle]);
  h4(() => {
    return searchState.subscribe(setSearchValue);
  }, []);
  h4(() => {
    const unsubscribe = signalWidget.subscribe((state) => {
      var _a;
      (_a = refMainContainer.current) == null ? void 0 : _a.style.setProperty("transition", "width 0.1s");
      updateContainerWidths(state.componentsTree.width);
      setTimeout(() => {
        var _a2;
        (_a2 = refMainContainer.current) == null ? void 0 : _a2.style.removeProperty("transition");
      }, 500);
    });
    return unsubscribe;
  }, []);
  return u5("div", { className: "react-scan-components-tree flex", children: [
    u5(
      "div",
      {
        ref: refResizeHandle,
        onPointerDown: handleResize,
        className: "relative resize-v-line",
        children: u5("span", { children: u5(Icon, { name: "icon-ellipsis", size: 18 }) })
      }
    ),
    u5("div", { ref: refMainContainer, className: "flex flex-col h-full", children: [
      u5("div", { className: "p-2 border-b border-[#1e1e1e]", children: u5(
        "div",
        {
          ref: refSearchInputContainer,
          title: `Search components by:

• Name (e.g., "Button") — Case insensitive, matches any part

• Regular Expression (e.g., "/^Button/") — Use forward slashes

• Wrapper Type (e.g., "[memo,forwardRef]"):
   - Available types: memo, forwardRef, lazy, suspense
   - Matches any part of type name (e.g., "mo" matches "memo")
   - Use commas for multiple types

• Combined Search:
   - Mix name/regex with type: "button [for]"
   - Will match components satisfying both conditions

• Navigation:
   - Enter → Next match
   - Shift + Enter → Previous match
   - Cmd/Ctrl + Enter → Select and focus match
`,
          className: cn(
            "relative",
            "flex items-center gap-x-1 px-2",
            "rounded",
            "border border-transparent",
            "focus-within:border-[#454545]",
            "bg-[#1e1e1e] text-neutral-300",
            "transition-colors",
            "whitespace-nowrap",
            "overflow-hidden"
          ),
          children: [
            u5(Icon, { name: "icon-search", size: 12, className: " text-neutral-500" }),
            u5("div", { className: "relative flex-1 h-7 overflow-hidden", children: u5(
              "input",
              {
                ref: refSearchInput,
                type: "text",
                value: searchState.value.query,
                onClick: (e5) => {
                  e5.stopPropagation();
                  e5.currentTarget.focus();
                },
                onPointerDown: (e5) => {
                  e5.stopPropagation();
                },
                onKeyDown: (e5) => {
                  if (e5.key === "Escape") {
                    e5.currentTarget.blur();
                  }
                  if (searchState.value.matches.length) {
                    if (e5.key === "Enter" && e5.shiftKey) {
                      navigateSearch("prev");
                    } else if (e5.key === "Enter") {
                      if (e5.metaKey || e5.ctrlKey) {
                        e5.preventDefault();
                        e5.stopPropagation();
                        handleElementClick(
                          searchState.value.matches[searchState.value.currentMatchIndex].element
                        );
                        e5.currentTarget.focus();
                      } else {
                        navigateSearch("next");
                      }
                    }
                  }
                },
                onChange: handleInputChange,
                className: "absolute inset-y-0 inset-x-1",
                placeholder: "Component name, /regex/, or [type]"
              }
            ) }),
            searchState.value.query ? u5(S2, { children: [
              u5("span", { className: "flex items-center gap-x-0.5 text-xs text-neutral-500", children: [
                searchState.value.currentMatchIndex + 1,
                "|",
                searchState.value.matches.length
              ] }),
              !!searchState.value.matches.length && u5(S2, { children: [
                u5(
                  "button",
                  {
                    type: "button",
                    onClick: (e5) => {
                      e5.stopPropagation();
                      navigateSearch("prev");
                    },
                    className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                    children: u5(
                      Icon,
                      {
                        name: "icon-chevron-right",
                        className: "-rotate-90",
                        size: 12
                      }
                    )
                  }
                ),
                u5(
                  "button",
                  {
                    type: "button",
                    onClick: (e5) => {
                      e5.stopPropagation();
                      navigateSearch("next");
                    },
                    className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                    children: u5(
                      Icon,
                      {
                        name: "icon-chevron-right",
                        className: "rotate-90",
                        size: 12
                      }
                    )
                  }
                )
              ] }),
              u5(
                "button",
                {
                  type: "button",
                  onClick: (e5) => {
                    e5.stopPropagation();
                    handleOnChangeSearch("");
                  },
                  className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                  children: u5(Icon, { name: "icon-close", size: 12 })
                }
              )
            ] }) : !!flattenedNodes.length && u5("span", { className: "text-xs text-neutral-500", children: flattenedNodes.length })
          ]
        }
      ) }),
      u5("div", { className: "flex-1 overflow-hidden", children: u5(
        "div",
        {
          ref: refContainer,
          onPointerLeave,
          className: "tree h-full overflow-auto will-change-transform",
          children: u5(
            "div",
            {
              className: "relative w-full",
              style: {
                height: totalSize
              },
              children: virtualItems.map((virtualItem) => {
                var _a;
                const node = visibleNodes[virtualItem.index];
                if (!node) return null;
                const isSelected = Store.inspectState.value.kind === "focused" && node.element === Store.inspectState.value.focusedDomElement;
                const isKeyboardSelected = virtualItem.index === selectedIndex;
                return u5(
                  "div",
                  {
                    className: cn(
                      "absolute left-0 w-full overflow-hidden",
                      "text-neutral-400 hover:text-neutral-300",
                      "bg-transparent hover:bg-[#5f3f9a]/20",
                      (isSelected || isKeyboardSelected) && "text-neutral-300 bg-[#5f3f9a]/40 hover:bg-[#5f3f9a]/40"
                    ),
                    style: {
                      top: virtualItem.start,
                      height: ITEM_HEIGHT
                    },
                    children: u5(
                      "div",
                      {
                        className: "w-full h-full",
                        style: {
                          paddingLeft: `calc(${node.depth} * var(--indentation-size))`
                        },
                        children: u5(
                          TreeNodeItem,
                          {
                            node,
                            nodeIndex: virtualItem.index,
                            hasChildren: !!((_a = node.children) == null ? void 0 : _a.length),
                            isCollapsed: collapsedNodes.has(node.nodeId),
                            handleTreeNodeClick,
                            handleTreeNodeToggle,
                            searchValue
                          }
                        )
                      }
                    )
                  },
                  node.nodeId
                );
              })
            }
          )
        }
      ) })
    ] })
  ] });
};
var CopyToClipboard = N3(
  ({
    text,
    children,
    onCopy,
    className,
    iconSize = 14
  }) => {
    const [isCopied, setIsCopied] = d4(false);
    h4(() => {
      if (isCopied) {
        const timeout2 = setTimeout(() => setIsCopied(false), 600);
        return () => {
          clearTimeout(timeout2);
        };
      }
    }, [isCopied]);
    const copyToClipboard = q3(
      (e5) => {
        e5.preventDefault();
        e5.stopPropagation();
        navigator.clipboard.writeText(text).then(
          () => {
            setIsCopied(true);
            onCopy == null ? void 0 : onCopy(true, text);
          },
          () => {
            onCopy == null ? void 0 : onCopy(false, text);
          }
        );
      },
      [text, onCopy]
    );
    const ClipboardIcon = u5(
      "button",
      {
        onClick: copyToClipboard,
        type: "button",
        className: cn(
          "z-10",
          "flex items-center justify-center",
          "hover:text-dev-pink-400",
          "transition-colors duration-200 ease-in-out",
          "cursor-pointer",
          `size-[${iconSize}px]`,
          className
        ),
        children: u5(
          Icon,
          {
            name: `icon-${isCopied ? "check" : "copy"}`,
            size: [iconSize],
            className: cn(isCopied && "text-green-500")
          }
        )
      }
    );
    if (!children) {
      return ClipboardIcon;
    }
    return children({
      ClipboardIcon,
      onClick: copyToClipboard
    });
  }
);
var ArrayHeader = ({
  length,
  expanded,
  onToggle,
  isNegative
}) => u5("div", { className: "flex items-center gap-1", children: [
  u5(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: "flex items-center p-0 opacity-50",
      children: u5(
        Icon,
        {
          name: "icon-chevron-right",
          size: 12,
          className: cn(
            "transition-[color,transform]",
            isNegative ? "text-[#f87171]" : "text-[#4ade80]",
            expanded && "rotate-90"
          )
        }
      )
    }
  ),
  u5("span", { children: [
    "Array(",
    length,
    ")"
  ] })
] });
var TreeNode = ({
  value,
  path,
  isNegative
}) => {
  const [isExpanded, setIsExpanded] = d4(false);
  const canExpand = value !== null && typeof value === "object" && !(value instanceof Date);
  if (!canExpand) {
    return u5("div", { className: "flex items-center gap-1", children: [
      u5("span", { className: "text-gray-500", children: [
        path,
        ":"
      ] }),
      u5("span", { className: "truncate", children: formatValuePreview(value) })
    ] });
  }
  const entries = Object.entries(value);
  return u5("div", { className: "flex flex-col", children: [
    u5("div", { className: "flex items-center gap-1", children: [
      u5(
        "button",
        {
          type: "button",
          onClick: () => setIsExpanded(!isExpanded),
          className: "flex items-center p-0 opacity-50",
          children: u5(
            Icon,
            {
              name: "icon-chevron-right",
              size: 12,
              className: cn(
                "transition-[color,transform]",
                isNegative ? "text-[#f87171]" : "text-[#4ade80]",
                isExpanded && "rotate-90"
              )
            }
          )
        }
      ),
      u5("span", { className: "text-gray-500", children: [
        path,
        ":"
      ] }),
      !isExpanded && u5("span", { className: "truncate", children: value instanceof Date ? formatValuePreview(value) : `{${Object.keys(value).join(", ")}}` })
    ] }),
    isExpanded && u5("div", { className: "pl-5 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: entries.map(([key, val]) => u5(
      TreeNode,
      {
        value: val,
        path: key,
        isNegative
      },
      key
    )) })
  ] });
};
var DiffValueView = ({
  value,
  expanded,
  onToggle,
  isNegative
}) => {
  const { value: safeValue, error } = safeGetValue(value);
  if (error) {
    return u5("span", { className: "text-gray-500 font-italic", children: error });
  }
  const isExpandable = safeValue !== null && typeof safeValue === "object" && !(safeValue instanceof Promise);
  if (!isExpandable) {
    return u5("span", { children: formatValuePreview(safeValue) });
  }
  if (Array.isArray(safeValue)) {
    return u5("div", { className: "flex flex-col gap-1 relative", children: [
      u5(
        ArrayHeader,
        {
          length: safeValue.length,
          expanded,
          onToggle,
          isNegative
        }
      ),
      expanded && u5("div", { className: "pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: safeValue.map((item, index) => u5(
        TreeNode,
        {
          value: item,
          path: index.toString(),
          isNegative
        },
        index.toString()
      )) }),
      u5(
        CopyToClipboard,
        {
          text: formatForClipboard(safeValue),
          className: "absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end",
          children: ({ ClipboardIcon }) => u5(S2, { children: ClipboardIcon })
        }
      )
    ] });
  }
  return u5("div", { className: "flex items-start gap-1 relative", children: [
    u5(
      "button",
      {
        type: "button",
        onClick: onToggle,
        className: cn("flex items-center", "p-0 mt-0.5 mr-1", "opacity-50"),
        children: u5(
          Icon,
          {
            name: "icon-chevron-right",
            size: 12,
            className: cn(
              "transition-[color,transform]",
              isNegative ? "text-[#f87171]" : "text-[#4ade80]",
              expanded && "rotate-90"
            )
          }
        )
      }
    ),
    u5("div", { className: "flex-1", children: !expanded ? u5("span", { children: formatValuePreview(safeValue) }) : u5("div", { className: "pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: Object.entries(safeValue).map(([key, val]) => u5(
      TreeNode,
      {
        value: val,
        path: key,
        isNegative
      },
      key
    )) }) }),
    u5(
      CopyToClipboard,
      {
        text: formatForClipboard(safeValue),
        className: "absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end",
        children: ({ ClipboardIcon }) => u5(S2, { children: ClipboardIcon })
      }
    )
  ] });
};
var CHANGES_QUEUE_INTERVAL = 50;
var inspectorState = y4({
  fiber: null,
  fiberProps: { current: [], changes: /* @__PURE__ */ new Set() },
  fiberState: { current: [], changes: /* @__PURE__ */ new Set() },
  fiberContext: { current: [], changes: /* @__PURE__ */ new Set() }
});
var getContextChangesValue = (discriminated) => {
  switch (discriminated.kind) {
    case "initialized": {
      return discriminated.changes.currentValue;
    }
    case "partially-initialized": {
      return discriminated.value;
    }
  }
};
var processChanges = (changes, targetMap) => {
  for (const change of changes) {
    const existing = targetMap.get(change.name);
    if (existing) {
      targetMap.set(existing.name, {
        count: existing.count + 1,
        currentValue: change.value,
        id: existing.name,
        lastUpdated: Date.now(),
        name: existing.name,
        previousValue: change.prevValue
      });
      continue;
    }
    targetMap.set(change.name, {
      count: 1,
      currentValue: change.value,
      id: change.name,
      lastUpdated: Date.now(),
      name: change.name,
      previousValue: change.prevValue
    });
  }
};
var processContextChanges = (contextChanges, aggregatedChanges) => {
  for (const change of contextChanges) {
    const existing = aggregatedChanges.contextChanges.get(change.contextType);
    if (existing) {
      if (isEqual(getContextChangesValue(existing), change.value)) {
        continue;
      }
      if (existing.kind === "partially-initialized") {
        aggregatedChanges.contextChanges.set(change.contextType, {
          kind: "initialized",
          changes: {
            count: 1,
            currentValue: change.value,
            id: change.contextType.toString(),
            // come back to this why was this ever expected to be a number?
            lastUpdated: Date.now(),
            name: change.name,
            previousValue: existing.value
          }
        });
        continue;
      }
      aggregatedChanges.contextChanges.set(change.contextType, {
        kind: "initialized",
        changes: {
          count: existing.changes.count + 1,
          currentValue: change.value,
          id: change.contextType.toString(),
          lastUpdated: Date.now(),
          name: change.name,
          previousValue: existing.changes.currentValue
        }
      });
      continue;
    }
    aggregatedChanges.contextChanges.set(change.contextType, {
      kind: "partially-initialized",
      id: change.contextType.toString(),
      lastUpdated: Date.now(),
      name: change.name,
      value: change.value
    });
  }
};
var collapseQueue = (queue) => {
  const localAggregatedChanges = {
    contextChanges: /* @__PURE__ */ new Map(),
    propsChanges: /* @__PURE__ */ new Map(),
    stateChanges: /* @__PURE__ */ new Map()
  };
  queue.forEach((changes) => {
    processContextChanges(changes.contextChanges, localAggregatedChanges);
    processChanges(changes.stateChanges, localAggregatedChanges.stateChanges);
    processChanges(changes.propsChanges, localAggregatedChanges.propsChanges);
  });
  return localAggregatedChanges;
};
var mergeSimpleChanges = (existingChanges, incomingChanges) => {
  const mergedChanges = /* @__PURE__ */ new Map();
  existingChanges.forEach((value, key) => {
    mergedChanges.set(key, value);
  });
  incomingChanges.forEach((incomingChange, key) => {
    const existing = mergedChanges.get(key);
    if (!existing) {
      mergedChanges.set(key, incomingChange);
      return;
    }
    mergedChanges.set(key, {
      count: existing.count + incomingChange.count,
      currentValue: incomingChange.currentValue,
      id: incomingChange.id,
      lastUpdated: incomingChange.lastUpdated,
      name: incomingChange.name,
      previousValue: incomingChange.previousValue
    });
  });
  return mergedChanges;
};
var mergeContextChanges = (existing, incoming) => {
  const contextChanges = /* @__PURE__ */ new Map();
  existing.contextChanges.forEach((value, key) => {
    contextChanges.set(key, value);
  });
  incoming.contextChanges.forEach((incomingChange, key) => {
    const existingChange = contextChanges.get(key);
    if (!existingChange) {
      contextChanges.set(key, incomingChange);
      return;
    }
    if (getContextChangesValue(incomingChange) === getContextChangesValue(existingChange)) {
      return;
    }
    switch (existingChange.kind) {
      case "initialized": {
        switch (incomingChange.kind) {
          case "initialized": {
            const preInitEntryOffset = 1;
            contextChanges.set(key, {
              kind: "initialized",
              changes: {
                ...incomingChange.changes,
                // if existing was initialized, the pre-initialization done by the collapsed queue was not necessary, so we need to increment count to account for the preInit entry
                count: incomingChange.changes.count + existingChange.changes.count + preInitEntryOffset,
                currentValue: incomingChange.changes.currentValue,
                previousValue: incomingChange.changes.previousValue
                // we always want to show this value, since this will be the true state transition (if you make the previousValue the last seen currentValue, u will have weird behavior with primitive state updates)
              }
            });
            return;
          }
          case "partially-initialized": {
            contextChanges.set(key, {
              kind: "initialized",
              changes: {
                count: existingChange.changes.count + 1,
                currentValue: incomingChange.value,
                id: incomingChange.id,
                lastUpdated: incomingChange.lastUpdated,
                name: incomingChange.name,
                previousValue: existingChange.changes.currentValue
              }
            });
            return;
          }
        }
      }
      case "partially-initialized": {
        switch (incomingChange.kind) {
          case "initialized": {
            contextChanges.set(key, {
              kind: "initialized",
              changes: {
                count: incomingChange.changes.count + 1,
                currentValue: incomingChange.changes.currentValue,
                id: incomingChange.changes.id,
                lastUpdated: incomingChange.changes.lastUpdated,
                name: incomingChange.changes.name,
                previousValue: existingChange.value
              }
            });
            return;
          }
          case "partially-initialized": {
            contextChanges.set(key, {
              kind: "initialized",
              changes: {
                count: 1,
                currentValue: incomingChange.value,
                id: incomingChange.id,
                lastUpdated: incomingChange.lastUpdated,
                name: incomingChange.name,
                previousValue: existingChange.value
              }
            });
            return;
          }
        }
      }
    }
  });
  return contextChanges;
};
var mergeChanges = (existing, incoming) => {
  const contextChanges = mergeContextChanges(existing, incoming);
  const propChanges = mergeSimpleChanges(
    existing.propsChanges,
    incoming.propsChanges
  );
  const stateChanges = mergeSimpleChanges(
    existing.stateChanges,
    incoming.stateChanges
  );
  return {
    contextChanges,
    propsChanges: propChanges,
    stateChanges
  };
};
var calculateTotalChanges = (changes) => {
  return Array.from(changes.propsChanges.values()).reduce(
    (acc, change) => acc + change.count,
    0
  ) + Array.from(changes.stateChanges.values()).reduce(
    (acc, change) => acc + change.count,
    0
  ) + Array.from(changes.contextChanges.values()).filter(
    (change) => change.kind === "initialized"
  ).reduce((acc, change) => acc + change.changes.count, 0);
};
var useInspectedFiberChangeStore = (opts) => {
  const pendingChanges = A3({ queue: [] });
  const [aggregatedChanges, setAggregatedChanges] = d4({
    propsChanges: /* @__PURE__ */ new Map(),
    stateChanges: /* @__PURE__ */ new Map(),
    contextChanges: /* @__PURE__ */ new Map()
  });
  const fiber = Store.inspectState.value.kind === "focused" ? Store.inspectState.value.fiber : null;
  const fiberId = fiber ? R(fiber) : null;
  h4(() => {
    const interval = setInterval(() => {
      if (pendingChanges.current.queue.length === 0) return;
      setAggregatedChanges((prevAggregatedChanges) => {
        var _a;
        const queueChanges = collapseQueue(pendingChanges.current.queue);
        const merged = mergeChanges(prevAggregatedChanges, queueChanges);
        const prevTotal = calculateTotalChanges(prevAggregatedChanges);
        const newTotal = calculateTotalChanges(merged);
        const changeCount = newTotal - prevTotal;
        (_a = opts == null ? void 0 : opts.onChangeUpdate) == null ? void 0 : _a.call(opts, changeCount);
        return merged;
      });
      pendingChanges.current.queue = [];
    }, CHANGES_QUEUE_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [fiber]);
  h4(() => {
    if (!fiberId) {
      return;
    }
    const listener = (change) => {
      var _a;
      (_a = pendingChanges.current) == null ? void 0 : _a.queue.push(change);
    };
    let listeners = Store.changesListeners.get(fiberId);
    if (!listeners) {
      listeners = [];
      Store.changesListeners.set(fiberId, listeners);
    }
    listeners.push(listener);
    return () => {
      var _a, _b;
      setAggregatedChanges({
        propsChanges: /* @__PURE__ */ new Map(),
        stateChanges: /* @__PURE__ */ new Map(),
        contextChanges: /* @__PURE__ */ new Map()
      });
      pendingChanges.current.queue = [];
      Store.changesListeners.set(
        fiberId,
        (_b = (_a = Store.changesListeners.get(fiberId)) == null ? void 0 : _a.filter((l6) => l6 !== listener)) != null ? _b : []
      );
    };
  }, [fiberId]);
  h4(() => {
    return () => {
      setAggregatedChanges({
        propsChanges: /* @__PURE__ */ new Map(),
        stateChanges: /* @__PURE__ */ new Map(),
        contextChanges: /* @__PURE__ */ new Map()
      });
      pendingChanges.current.queue = [];
    };
  }, [fiberId]);
  return aggregatedChanges;
};
var WhatChanged = N3(() => {
  const [isExpanded, setIsExpanded] = d4(true);
  const aggregatedChanges = useInspectedFiberChangeStore();
  const [hasInitialized, setHasInitialized] = d4(false);
  const hasAnyChanges = calculateTotalChanges(aggregatedChanges) > 0;
  h4(() => {
    if (!hasInitialized && hasAnyChanges) {
      const timer = setTimeout(() => {
        setHasInitialized(true);
        requestAnimationFrame(() => {
          setIsExpanded(true);
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [hasInitialized, hasAnyChanges]);
  const initializedContextChanges = new Map(
    Array.from(aggregatedChanges.contextChanges.entries()).filter(([, value]) => value.kind === "initialized").map(([key, value]) => [
      key,
      // oxlint-disable-next-line typescript/no-non-null-assertion
      value.kind === "partially-initialized" ? null : value.changes
    ])
  );
  const fiber = Store.inspectState.value.kind === "focused" ? Store.inspectState.value.fiber : null;
  if (!fiber) {
    return;
  }
  return u5(S2, { children: [
    u5(WhatsChangedHeader, {}),
    u5("div", { className: "overflow-hidden h-full flex flex-col gap-y-2", children: [
      u5("div", { className: "flex flex-col gap-2 px-3 pt-2", children: [
        u5("span", { className: "text-sm font-medium text-[#888]", children: [
          "Why did",
          " ",
          u5("span", { className: "text-[#A855F7]", children: Ee(fiber) }),
          " ",
          "render?"
        ] }),
        !hasAnyChanges && u5("div", { className: "text-sm text-[#737373] bg-[#1E1E1E] rounded-md p-4 flex flex-col gap-4", children: [
          u5("div", { children: "No changes detected since selecting" }),
          u5("div", { children: "The props, state, and context changes within your component will be reported here" })
        ] })
      ] }),
      u5(
        "div",
        {
          className: cn(
            "flex flex-col gap-y-2 pl-3 relative overflow-y-auto h-full"
          ),
          children: [
            u5(
              Section,
              {
                changes: aggregatedChanges.propsChanges,
                title: "Changed Props",
                isExpanded
              }
            ),
            u5(
              Section,
              {
                renderName: (name) => {
                  var _a;
                  return renderStateName(
                    name,
                    (_a = Ee(N(fiber))) != null ? _a : "Unknown Component"
                  );
                },
                changes: aggregatedChanges.stateChanges,
                title: "Changed State",
                isExpanded
              }
            ),
            u5(
              Section,
              {
                changes: initializedContextChanges,
                title: "Changed Context",
                isExpanded
              }
            )
          ]
        }
      )
    ] })
  ] });
});
var renderStateName = (key, componentName) => {
  if (Number.isNaN(Number(key))) {
    return key;
  }
  const n4 = Number.parseInt(key);
  const getOrdinalSuffix = (num) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return "th";
    }
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return u5("span", { className: "truncate", children: [
    u5("span", { className: "text-white", children: [
      n4,
      getOrdinalSuffix(n4),
      " hook",
      " "
    ] }),
    u5("span", { style: { color: "#666" }, children: [
      "called in ",
      u5("i", { className: "text-[#A855F7] truncate", children: componentName })
    ] })
  ] });
};
var WhatsChangedHeader = N3(() => {
  const refProps = A3(null);
  const refState = A3(null);
  const refContext = A3(null);
  const refStats = A3({
    isPropsChanged: false,
    isStateChanged: false,
    isContextChanged: false
  });
  h4(() => {
    const flash = throttle(() => {
      var _a, _b, _c;
      const flashElements = [];
      if (((_a = refProps.current) == null ? void 0 : _a.dataset.flash) === "true") {
        flashElements.push(refProps.current);
      }
      if (((_b = refState.current) == null ? void 0 : _b.dataset.flash) === "true") {
        flashElements.push(refState.current);
      }
      if (((_c = refContext.current) == null ? void 0 : _c.dataset.flash) === "true") {
        flashElements.push(refContext.current);
      }
      for (const element of flashElements) {
        element.classList.remove("count-flash-white");
        void element.offsetWidth;
        element.classList.add("count-flash-white");
      }
    }, 400);
    const unsubscribe = timelineState.subscribe((state) => {
      var _a, _b, _c, _d, _e2, _f, _g, _h, _i;
      if (!refProps.current || !refState.current || !refContext.current) {
        return;
      }
      const { currentIndex, updates } = state;
      const currentUpdate = updates[currentIndex];
      if (!currentUpdate || currentIndex === 0) {
        return;
      }
      flash();
      refStats.current = {
        isPropsChanged: ((_c = (_b = (_a = currentUpdate.props) == null ? void 0 : _a.changes) == null ? void 0 : _b.size) != null ? _c : 0) > 0,
        isStateChanged: ((_f = (_e2 = (_d = currentUpdate.state) == null ? void 0 : _d.changes) == null ? void 0 : _e2.size) != null ? _f : 0) > 0,
        isContextChanged: ((_i = (_h = (_g = currentUpdate.context) == null ? void 0 : _g.changes) == null ? void 0 : _h.size) != null ? _i : 0) > 0
      };
      if (refProps.current.dataset.flash !== "true") {
        refProps.current.dataset.flash = refStats.current.isPropsChanged.toString();
      }
      if (refState.current.dataset.flash !== "true") {
        refState.current.dataset.flash = refStats.current.isStateChanged.toString();
      }
      if (refContext.current.dataset.flash !== "true") {
        refContext.current.dataset.flash = refStats.current.isContextChanged.toString();
      }
    });
    return unsubscribe;
  }, []);
  return u5(
    "button",
    {
      type: "button",
      className: cn(
        "react-section-header",
        "overflow-hidden",
        "max-h-0",
        "transition-[max-height]"
      ),
      children: u5("div", { className: cn("flex-1 react-scan-expandable"), children: u5("div", { className: "overflow-hidden", children: u5("div", { className: "flex items-center whitespace-nowrap", children: [
        u5("div", { className: "flex items-center gap-x-2", children: "What changed?" }),
        u5(
          "div",
          {
            className: cn(
              "ml-auto",
              "change-scope",
              "transition-opacity duration-300 delay-150"
            ),
            children: [
              u5("div", { ref: refProps, children: "props" }),
              u5("div", { ref: refState, children: "state" }),
              u5("div", { ref: refContext, children: "context" })
            ]
          }
        )
      ] }) }) })
    }
  );
});
var identity = (x6) => x6;
var Section = N3(
  ({ title, changes, renderName = identity }) => {
    const [expandedFns, setExpandedFns] = d4(/* @__PURE__ */ new Set());
    const [expandedEntries, setExpandedEntries] = d4(/* @__PURE__ */ new Set());
    const entries = Array.from(changes.entries());
    if (changes.size === 0) {
      return null;
    }
    return u5("div", { children: [
      u5("div", { className: "text-xs text-[#888] mb-1.5", children: title }),
      u5("div", { className: "flex flex-col gap-2", children: entries.map(([entryKey, change]) => {
        const isEntryExpanded = expandedEntries.has(String(entryKey));
        const { value: prevValue, error: prevError } = safeGetValue(
          change.previousValue
        );
        const { value: currValue, error: currError } = safeGetValue(
          change.currentValue
        );
        const diff = getObjectDiff(prevValue, currValue);
        return u5("div", { children: [
          u5(
            "button",
            {
              onClick: () => {
                setExpandedEntries((prev) => {
                  const next = new Set(prev);
                  if (next.has(String(entryKey))) {
                    next.delete(String(entryKey));
                  } else {
                    next.add(String(entryKey));
                  }
                  return next;
                });
              },
              className: "flex items-center gap-2 w-full bg-transparent border-none p-0 cursor-pointer text-white text-xs",
              children: u5("div", { className: "flex items-center gap-1.5 flex-1", children: [
                u5(
                  Icon,
                  {
                    name: "icon-chevron-right",
                    size: 12,
                    className: cn(
                      "text-[#666] transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      {
                        "rotate-90": isEntryExpanded
                      }
                    )
                  }
                ),
                u5("div", { className: "whitespace-pre-wrap break-words text-left font-medium flex items-center gap-x-1.5", children: [
                  renderName(change.name),
                  u5(
                    CountBadge,
                    {
                      count: change.count,
                      isFunction: typeof change.currentValue === "function",
                      showWarning: diff.changes.length === 0,
                      forceFlash: true
                    }
                  )
                ] })
              ] })
            }
          ),
          u5(
            "div",
            {
              className: cn("react-scan-expandable", {
                "react-scan-expanded": isEntryExpanded
              }),
              children: u5("div", { className: "pl-3 text-xs font-mono border-l-1 border-[#333]", children: u5("div", { className: "flex flex-col gap-0.5", children: prevError || currError ? u5(
                AccessError,
                {
                  currError,
                  prevError
                }
              ) : diff.changes.length > 0 ? u5(
                DiffChange,
                {
                  change,
                  diff,
                  expandedFns,
                  renderName,
                  setExpandedFns,
                  title
                }
              ) : u5(
                ReferenceOnlyChange,
                {
                  currValue,
                  entryKey,
                  expandedFns,
                  prevValue,
                  setExpandedFns
                }
              ) }) })
            }
          )
        ] }, entryKey);
      }) })
    ] });
  }
);
var AccessError = ({
  prevError,
  currError
}) => {
  return u5(S2, { children: [
    prevError && u5("div", { className: "text-[#f87171] bg-[#2a1515] pr-1.5 py-[3px] rounded italic", children: prevError }),
    currError && u5("div", { className: "text-[#4ade80] bg-[#1a2a1a] pr-1.5 py-[3px] rounded italic mt-0.5", children: currError })
  ] });
};
var DiffChange = ({
  diff,
  title,
  renderName,
  change,
  expandedFns,
  setExpandedFns
}) => {
  return diff.changes.map((diffChange, i5) => {
    const { value: prevDiffValue, error: prevDiffError } = safeGetValue(
      diffChange.prevValue
    );
    const { value: currDiffValue, error: currDiffError } = safeGetValue(
      diffChange.currentValue
    );
    const isFunction = typeof prevDiffValue === "function" || typeof currDiffValue === "function";
    let path;
    if (title === "Props") {
      path = diffChange.path.length > 0 ? `${renderName(String(change.name))}.${formatPath(diffChange.path)}` : void 0;
    }
    if (title === "State" && diffChange.path.length > 0) {
      path = `state.${formatPath(diffChange.path)}`;
    }
    if (!path) {
      path = formatPath(diffChange.path);
    }
    return u5(
      "div",
      {
        className: cn(
          "flex flex-col gap-y-1",
          i5 < diff.changes.length - 1 && "mb-4"
        ),
        children: [
          path && u5("div", { className: "text-[#666] text-[10px]", children: path }),
          u5(
            "button",
            {
              type: "button",
              className: cn(
                "group",
                "flex items-start",
                "py-[3px] px-1.5",
                "text-left text-[#f87171] bg-[#2a1515]",
                "rounded",
                "overflow-hidden break-all",
                isFunction && "cursor-pointer"
              ),
              onClick: isFunction ? () => {
                const fnKey = `${formatPath(diffChange.path)}-prev`;
                setExpandedFns((prev) => {
                  const next = new Set(prev);
                  if (next.has(fnKey)) {
                    next.delete(fnKey);
                  } else {
                    next.add(fnKey);
                  }
                  return next;
                });
              } : void 0,
              children: [
                u5("span", { className: "w-3 flex items-center justify-center opacity-50", children: "-" }),
                u5("span", { className: "flex-1 whitespace-nowrap font-mono", children: prevDiffError ? u5("span", { className: "italic text-[#f87171]", children: prevDiffError }) : isFunction ? u5("div", { className: "flex gap-1 items-start flex-col", children: [
                  u5("div", { className: "flex gap-1 items-start w-full", children: [
                    u5("span", { className: "flex-1 max-h-40", children: formatFunctionPreview(
                      prevDiffValue,
                      expandedFns.has(`${formatPath(diffChange.path)}-prev`)
                    ) }),
                    typeof prevDiffValue === "function" && u5(
                      CopyToClipboard,
                      {
                        text: prevDiffValue.toString(),
                        className: "opacity-0 transition-opacity group-hover:opacity-100",
                        children: ({ ClipboardIcon }) => u5(S2, { children: ClipboardIcon })
                      }
                    )
                  ] }),
                  (prevDiffValue == null ? void 0 : prevDiffValue.toString()) === (currDiffValue == null ? void 0 : currDiffValue.toString()) && u5("div", { className: "text-[10px] text-[#666] italic", children: "Function reference changed" })
                ] }) : u5(
                  DiffValueView,
                  {
                    value: prevDiffValue,
                    expanded: expandedFns.has(
                      `${formatPath(diffChange.path)}-prev`
                    ),
                    onToggle: () => {
                      const key = `${formatPath(diffChange.path)}-prev`;
                      setExpandedFns((prev) => {
                        const next = new Set(prev);
                        if (next.has(key)) {
                          next.delete(key);
                        } else {
                          next.add(key);
                        }
                        return next;
                      });
                    },
                    isNegative: true
                  }
                ) })
              ]
            }
          ),
          u5(
            "button",
            {
              type: "button",
              className: cn(
                "group",
                "flex items-start",
                "py-[3px] px-1.5",
                "text-left text-[#4ade80] bg-[#1a2a1a]",
                "rounded",
                "overflow-hidden break-all",
                isFunction && "cursor-pointer"
              ),
              onClick: isFunction ? () => {
                const fnKey = `${formatPath(diffChange.path)}-current`;
                setExpandedFns((prev) => {
                  const next = new Set(prev);
                  if (next.has(fnKey)) {
                    next.delete(fnKey);
                  } else {
                    next.add(fnKey);
                  }
                  return next;
                });
              } : void 0,
              children: [
                u5("span", { className: "w-3 flex items-center justify-center opacity-50", children: "+" }),
                u5("span", { className: "flex-1 whitespace-pre-wrap font-mono", children: currDiffError ? u5("span", { className: "italic text-[#4ade80]", children: currDiffError }) : isFunction ? u5("div", { className: "flex gap-1 items-start flex-col", children: [
                  u5("div", { className: "flex gap-1 items-start w-full", children: [
                    u5("span", { className: "flex-1", children: formatFunctionPreview(
                      currDiffValue,
                      expandedFns.has(`${formatPath(diffChange.path)}-current`)
                    ) }),
                    typeof currDiffValue === "function" && u5(
                      CopyToClipboard,
                      {
                        text: currDiffValue.toString(),
                        className: "opacity-0 transition-opacity group-hover:opacity-100",
                        children: ({ ClipboardIcon }) => u5(S2, { children: ClipboardIcon })
                      }
                    )
                  ] }),
                  (prevDiffValue == null ? void 0 : prevDiffValue.toString()) === (currDiffValue == null ? void 0 : currDiffValue.toString()) && u5("div", { className: "text-[10px] text-[#666] italic", children: "Function reference changed" })
                ] }) : u5(
                  DiffValueView,
                  {
                    value: currDiffValue,
                    expanded: expandedFns.has(
                      `${formatPath(diffChange.path)}-current`
                    ),
                    onToggle: () => {
                      const key = `${formatPath(diffChange.path)}-current`;
                      setExpandedFns((prev) => {
                        const next = new Set(prev);
                        if (next.has(key)) {
                          next.delete(key);
                        } else {
                          next.add(key);
                        }
                        return next;
                      });
                    },
                    isNegative: false
                  }
                ) })
              ]
            }
          )
        ]
      },
      `${path}-${change.name}-${i5}`
    );
  });
};
var ReferenceOnlyChange = ({
  prevValue,
  currValue,
  entryKey,
  expandedFns,
  setExpandedFns
}) => {
  return u5(S2, { children: [
    u5("div", { className: "group flex gap-0.5 items-start text-[#f87171] bg-[#2a1515] py-[3px] px-1.5 rounded", children: [
      u5("span", { className: "w-3 flex items-center justify-center opacity-50", children: "-" }),
      u5("span", { className: "flex-1 overflow-hidden whitespace-pre-wrap font-mono", children: u5(
        DiffValueView,
        {
          value: prevValue,
          expanded: expandedFns.has(`${String(entryKey)}-prev`),
          onToggle: () => {
            const key = `${String(entryKey)}-prev`;
            setExpandedFns((prev) => {
              const next = new Set(prev);
              if (next.has(key)) {
                next.delete(key);
              } else {
                next.add(key);
              }
              return next;
            });
          },
          isNegative: true
        }
      ) })
    ] }),
    u5("div", { className: "group flex gap-0.5 items-start text-[#4ade80] bg-[#1a2a1a] py-[3px] px-1.5 rounded mt-0.5", children: [
      u5("span", { className: "w-3 flex items-center justify-center opacity-50", children: "+" }),
      u5("span", { className: "flex-1 overflow-hidden whitespace-pre-wrap font-mono", children: u5(
        DiffValueView,
        {
          value: currValue,
          expanded: expandedFns.has(`${String(entryKey)}-current`),
          onToggle: () => {
            const key = `${String(entryKey)}-current`;
            setExpandedFns((prev) => {
              const next = new Set(prev);
              if (next.has(key)) {
                next.delete(key);
              } else {
                next.add(key);
              }
              return next;
            });
          },
          isNegative: false
        }
      ) })
    ] }),
    typeof currValue === "object" && currValue !== null && u5("div", { className: "text-[#666] text-[10px] italic mt-1 flex items-center gap-x-1", children: [
      u5(
        Icon,
        {
          name: "icon-triangle-alert",
          className: "text-yellow-500 mb-px",
          size: 14
        }
      ),
      u5("span", { children: "Reference changed but objects are structurally the same" })
    ] })
  ] });
};
var CountBadge = ({
  count,
  forceFlash,
  isFunction,
  showWarning
}) => {
  const refIsFirstRender = A3(true);
  const refBadge = A3(null);
  const refPrevCount = A3(count);
  h4(() => {
    const element = refBadge.current;
    if (!element || refPrevCount.current === count) {
      return;
    }
    element.classList.remove("count-flash");
    void element.offsetWidth;
    element.classList.add("count-flash");
    refPrevCount.current = count;
  }, [count]);
  h4(() => {
    if (refIsFirstRender.current) {
      refIsFirstRender.current = false;
      return;
    }
    if (forceFlash) {
      let timer = setTimeout(() => {
        var _a;
        (_a = refBadge.current) == null ? void 0 : _a.classList.add("count-flash-white");
        timer = setTimeout(() => {
          var _a2;
          (_a2 = refBadge.current) == null ? void 0 : _a2.classList.remove("count-flash-white");
        }, 300);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [forceFlash]);
  return u5("div", { ref: refBadge, className: "count-badge", children: [
    showWarning && u5(
      Icon,
      {
        name: "icon-triangle-alert",
        className: "text-yellow-500 mb-px",
        size: 14
      }
    ),
    isFunction && u5(Icon, { name: "icon-function", className: "text-[#A855F7] mb-px", size: 14 }),
    "x",
    count
  ] });
};
var globalInspectorState = {
  lastRendered: /* @__PURE__ */ new Map(),
  expandedPaths: /* @__PURE__ */ new Set(),
  cleanup: () => {
    globalInspectorState.lastRendered.clear();
    globalInspectorState.expandedPaths.clear();
    flashManager.cleanupAll();
    resetTracking();
    timelineActions.reset();
  }
};
var InspectorErrorBoundary = class extends C3 {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false,
      error: null
    });
    __publicField(this, "handleReset", () => {
      this.setState({ hasError: false, error: null });
      globalInspectorState.cleanup();
    });
  }
  static getDerivedStateFromError(e5) {
    return { hasError: true, error: e5 };
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return u5("div", { className: "p-4 bg-red-950/50 h-screen backdrop-blur-sm", children: [
        u5("div", { className: "flex items-center gap-2 mb-3 text-red-400 font-medium", children: [
          u5(Icon, { name: "icon-flame", className: "text-red-500", size: 16 }),
          "Something went wrong in the inspector"
        ] }),
        u5("div", { className: "p-3 bg-black/40 rounded font-mono text-xs text-red-300 mb-4 break-words", children: ((_a = this.state.error) == null ? void 0 : _a.message) || JSON.stringify(this.state.error) }),
        u5(
          "button",
          {
            type: "button",
            onClick: this.handleReset,
            className: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2",
            children: "Reset Inspector"
          }
        )
      ] });
    }
    return this.props.children;
  }
};
var inspectorContainerClassName = g4(
  () => cn(
    "react-scan-inspector",
    "flex-1",
    "opacity-0",
    "overflow-y-auto overflow-x-hidden",
    "transition-opacity delay-0",
    "pointer-events-none",
    !signalIsSettingsOpen.value && "opacity-100 delay-300 pointer-events-auto"
  )
);
var Inspector = constant(() => {
  const refLastInspectedFiber = A3(null);
  const processUpdate = (fiber) => {
    if (!fiber) return;
    refLastInspectedFiber.current = fiber;
    const { data: inspectorData, shouldUpdate } = collectInspectorData(fiber);
    if (shouldUpdate) {
      const update = {
        timestamp: Date.now(),
        fiberInfo: extractMinimalFiberInfo(fiber),
        props: inspectorData.fiberProps,
        state: inspectorData.fiberState,
        context: inspectorData.fiberContext,
        stateNames: getStateNames(fiber)
      };
      timelineActions.addUpdate(update, fiber);
    }
  };
  useSignalEffect(() => {
    const state = Store.inspectState.value;
    f5(() => {
      var _a;
      if (state.kind !== "focused" || !state.focusedDomElement) {
        refLastInspectedFiber.current = null;
        globalInspectorState.cleanup();
        return;
      }
      if (state.kind === "focused") {
        signalIsSettingsOpen.value = false;
      }
      const { parentCompositeFiber } = getCompositeFiberFromElement(
        state.focusedDomElement,
        state.fiber
      );
      if (!parentCompositeFiber) {
        Store.inspectState.value = {
          kind: "inspect-off"
        };
        signalWidgetViews.value = {
          view: "none"
        };
        return;
      }
      const isNewComponent = ((_a = refLastInspectedFiber.current) == null ? void 0 : _a.type) !== parentCompositeFiber.type;
      if (isNewComponent) {
        refLastInspectedFiber.current = parentCompositeFiber;
        globalInspectorState.cleanup();
        processUpdate(parentCompositeFiber);
      }
    });
  });
  useSignalEffect(() => {
    inspectorUpdateSignal.value;
    f5(() => {
      const inspectState = Store.inspectState.value;
      if (inspectState.kind !== "focused" || !inspectState.focusedDomElement) {
        refLastInspectedFiber.current = null;
        globalInspectorState.cleanup();
        return;
      }
      const { parentCompositeFiber } = getCompositeFiberFromElement(
        inspectState.focusedDomElement,
        inspectState.fiber
      );
      if (!parentCompositeFiber) {
        Store.inspectState.value = {
          kind: "inspect-off"
        };
        signalWidgetViews.value = {
          view: "none"
        };
        return;
      }
      processUpdate(parentCompositeFiber);
      if (!inspectState.focusedDomElement.isConnected) {
        refLastInspectedFiber.current = null;
        globalInspectorState.cleanup();
        Store.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        };
      }
    });
  });
  h4(() => {
    return () => {
      globalInspectorState.cleanup();
    };
  }, []);
  return u5(InspectorErrorBoundary, { children: u5("div", { className: inspectorContainerClassName, children: u5("div", { className: "w-full h-full", children: u5(WhatChanged, {}) }) }) });
});
var ViewInspector = constant(() => {
  if (Store.inspectState.value.kind !== "focused") return null;
  return u5(InspectorErrorBoundary, { children: [
    u5(Inspector, {}),
    u5(ComponentsTree, {})
  ] });
});
var getFiberFromElement = (element) => {
  var _a, _b, _c, _d;
  if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in window) {
    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!(hook == null ? void 0 : hook.renderers)) return null;
    for (const [, renderer] of Array.from(hook.renderers)) {
      try {
        const fiber = (_a = renderer.findFiberByHostInstance) == null ? void 0 : _a.call(renderer, element);
        if (fiber) return fiber;
      } catch {
      }
    }
  }
  if ("_reactRootContainer" in element) {
    const elementWithRoot = element;
    const rootContainer2 = elementWithRoot._reactRootContainer;
    return (_d = (_c = (_b = rootContainer2 == null ? void 0 : rootContainer2._internalRoot) == null ? void 0 : _b.current) == null ? void 0 : _c.child) != null ? _d : null;
  }
  for (const key in element) {
    if (key.startsWith("__reactInternalInstance$") || key.startsWith("__reactFiber")) {
      const elementWithFiber = element;
      return elementWithFiber[key];
    }
  }
  return null;
};
var getFirstStateNode = (fiber) => {
  let current = fiber;
  while (current) {
    if (current.stateNode instanceof Element) {
      return current.stateNode;
    }
    if (!current.child) {
      break;
    }
    current = current.child;
  }
  while (current) {
    if (current.stateNode instanceof Element) {
      return current.stateNode;
    }
    if (!current.return) {
      break;
    }
    current = current.return;
  }
  return null;
};
var getNearestFiberFromElement = (element) => {
  if (!element) return null;
  try {
    const fiber = getFiberFromElement(element);
    if (!fiber) return null;
    const res = getParentCompositeFiber(fiber);
    return res ? res[0] : null;
  } catch {
    return null;
  }
};
var getParentCompositeFiber = (fiber) => {
  let current = fiber;
  let prevHost = null;
  while (current) {
    if (be(current)) return [current, prevHost];
    if (b(current) && !prevHost) prevHost = current;
    current = current.return;
  }
  return null;
};
var isFiberInTree = (fiber, root) => {
  {
    const res = !!A(root, (searchFiber) => searchFiber === fiber);
    return res;
  }
};
var getAssociatedFiberRect = async (element) => {
  const associatedFiber = getNearestFiberFromElement(element);
  if (!associatedFiber) return null;
  const stateNode = getFirstStateNode(associatedFiber);
  if (!stateNode) return null;
  const rect = await new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      var _a, _b;
      observer.disconnect();
      resolve((_b = (_a = entries[0]) == null ? void 0 : _a.boundingClientRect) != null ? _b : null);
    });
    observer.observe(stateNode);
  });
  return rect;
};
var getCompositeComponentFromElement = (element) => {
  const associatedFiber = getNearestFiberFromElement(element);
  if (!associatedFiber) return {};
  const stateNode = getFirstStateNode(associatedFiber);
  if (!stateNode) return {};
  const parentCompositeFiberInfo = getParentCompositeFiber(associatedFiber);
  if (!parentCompositeFiberInfo) {
    return {};
  }
  const [parentCompositeFiber] = parentCompositeFiberInfo;
  return {
    parentCompositeFiber
  };
};
var getCompositeFiberFromElement = (element, knownFiber) => {
  var _a, _b, _c, _d;
  if (!element.isConnected) return {};
  let fiber = knownFiber != null ? knownFiber : getNearestFiberFromElement(element);
  if (!fiber) return {};
  let curr = fiber;
  let rootFiber = null;
  let currentRootFiber = null;
  while (curr) {
    if (!curr.stateNode) {
      curr = curr.return;
      continue;
    }
    if ((_a = ReactScanInternals.instrumentation) == null ? void 0 : _a.fiberRoots.has(curr.stateNode)) {
      rootFiber = curr;
      currentRootFiber = curr.stateNode.current;
      break;
    }
    curr = curr.return;
  }
  if (!rootFiber || !currentRootFiber) return {};
  fiber = isFiberInTree(fiber, currentRootFiber) ? fiber : (_b = fiber.alternate) != null ? _b : fiber;
  if (!fiber) return {};
  if (!getFirstStateNode(fiber)) return {};
  const parentCompositeFiber = (_c = getParentCompositeFiber(fiber)) == null ? void 0 : _c[0];
  if (!parentCompositeFiber) return {};
  return {
    parentCompositeFiber: isFiberInTree(parentCompositeFiber, currentRootFiber) ? parentCompositeFiber : (_d = parentCompositeFiber.alternate) != null ? _d : parentCompositeFiber
  };
};
var getChangedPropsDetailed = (fiber) => {
  var _a, _b, _c;
  const currentProps = (_a = fiber.memoizedProps) != null ? _a : {};
  const previousProps = (_c = (_b = fiber.alternate) == null ? void 0 : _b.memoizedProps) != null ? _c : {};
  const changes = [];
  for (const key in currentProps) {
    if (key === "children") continue;
    const currentValue = currentProps[key];
    const prevValue = previousProps[key];
    if (!isEqual(currentValue, prevValue)) {
      changes.push({
        name: key,
        value: currentValue,
        prevValue,
        type: 1
        /* Props */
      });
    }
  }
  return changes;
};
var nonVisualTags = /* @__PURE__ */ new Set([
  "HTML",
  "HEAD",
  "META",
  "TITLE",
  "BASE",
  "SCRIPT",
  "SCRIPT",
  "STYLE",
  "LINK",
  "NOSCRIPT",
  "SOURCE",
  "TRACK",
  "EMBED",
  "OBJECT",
  "PARAM",
  "TEMPLATE",
  "PORTAL",
  "SLOT",
  "AREA",
  "XML",
  "DOCTYPE",
  "COMMENT"
]);
var findComponentDOMNode = (fiber, excludeNonVisualTags = true) => {
  if (fiber.stateNode && "nodeType" in fiber.stateNode) {
    const element = fiber.stateNode;
    if (excludeNonVisualTags && element.tagName && nonVisualTags.has(element.tagName.toLowerCase())) {
      return null;
    }
    return element;
  }
  let child = fiber.child;
  while (child) {
    const result = findComponentDOMNode(child, excludeNonVisualTags);
    if (result) return result;
    child = child.sibling;
  }
  return null;
};
var getInspectableElements = (root = document.body) => {
  const result = [];
  const findInspectableFiber = (element) => {
    if (!element) return null;
    const { parentCompositeFiber } = getCompositeComponentFromElement(element);
    if (!parentCompositeFiber) return null;
    const componentRoot = findComponentDOMNode(parentCompositeFiber);
    return componentRoot === element ? element : null;
  };
  const traverse = (element, depth = 0) => {
    var _a;
    const inspectable = findInspectableFiber(element);
    if (inspectable) {
      const { parentCompositeFiber } = getCompositeComponentFromElement(inspectable);
      if (!parentCompositeFiber) return;
      result.push({
        element: inspectable,
        depth,
        name: (_a = Ee(parentCompositeFiber.type)) != null ? _a : "Unknown",
        fiber: parentCompositeFiber
      });
    }
    for (const child of Array.from(element.children)) {
      traverse(child, inspectable ? depth + 1 : depth);
    }
  };
  traverse(root);
  return result;
};
var formatForClipboard = (value) => {
  try {
    if (value === null) return "null";
    if (value === void 0) return "undefined";
    if (isPromise(value)) return "Promise";
    if (typeof value === "function") {
      const fnStr = value.toString();
      try {
        const formatted = fnStr.replace(/\s+/g, " ").replace(/{\s+/g, "{\n  ").replace(/;\s+/g, ";\n  ").replace(/}\s*$/g, "\n}").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").replace(/,\s+/g, ", ");
        return formatted;
      } catch {
        return fnStr;
      }
    }
    switch (true) {
      case value instanceof Date:
        return value.toISOString();
      case value instanceof RegExp:
        return value.toString();
      case value instanceof Error:
        return `${value.name}: ${value.message}`;
      case value instanceof Map:
        return JSON.stringify(Array.from(value.entries()), null, 2);
      case value instanceof Set:
        return JSON.stringify(Array.from(value), null, 2);
      case value instanceof DataView:
        return JSON.stringify(
          Array.from(new Uint8Array(value.buffer)),
          null,
          2
        );
      case value instanceof ArrayBuffer:
        return JSON.stringify(Array.from(new Uint8Array(value)), null, 2);
      case (ArrayBuffer.isView(value) && "length" in value):
        return JSON.stringify(
          Array.from(value),
          null,
          2
        );
      case Array.isArray(value):
        return JSON.stringify(value, null, 2);
      case typeof value === "object":
        return JSON.stringify(value, null, 2);
      default:
        return String(value);
    }
  } catch {
    return String(value);
  }
};
var areFunctionsEqual = (prev, current) => {
  try {
    if (typeof prev !== "function" || typeof current !== "function") {
      return false;
    }
    return prev.toString() === current.toString();
  } catch {
    return false;
  }
};
var getObjectDiff = (prev, current, path = [], seen = /* @__PURE__ */ new WeakSet()) => {
  if (prev === current) {
    return { type: "primitive", changes: [], hasDeepChanges: false };
  }
  if (typeof prev === "function" && typeof current === "function") {
    const isSameFunction = areFunctionsEqual(prev, current);
    return {
      type: "primitive",
      changes: [
        {
          path,
          prevValue: prev,
          currentValue: current,
          sameFunction: isSameFunction
        }
      ],
      hasDeepChanges: !isSameFunction
    };
  }
  if (prev === null || current === null || prev === void 0 || current === void 0 || typeof prev !== "object" || typeof current !== "object") {
    return {
      type: "primitive",
      changes: [{ path, prevValue: prev, currentValue: current }],
      hasDeepChanges: true
    };
  }
  if (seen.has(prev) || seen.has(current)) {
    return {
      type: "object",
      changes: [{ path, prevValue: "[Circular]", currentValue: "[Circular]" }],
      hasDeepChanges: false
    };
  }
  seen.add(prev);
  seen.add(current);
  const prevObj = prev;
  const currentObj = current;
  const allKeys = /* @__PURE__ */ new Set([
    ...Object.keys(prevObj),
    ...Object.keys(currentObj)
  ]);
  const changes = [];
  let hasDeepChanges = false;
  for (const key of allKeys) {
    const prevValue = prevObj[key];
    const currentValue = currentObj[key];
    if (prevValue !== currentValue) {
      if (typeof prevValue === "object" && typeof currentValue === "object" && prevValue !== null && currentValue !== null) {
        const nestedDiff = getObjectDiff(
          prevValue,
          currentValue,
          [...path, key],
          seen
        );
        changes.push(...nestedDiff.changes);
        if (nestedDiff.hasDeepChanges) {
          hasDeepChanges = true;
        }
      } else {
        changes.push({
          path: [...path, key],
          prevValue,
          currentValue
        });
        hasDeepChanges = true;
      }
    }
  }
  return {
    type: "object",
    changes,
    hasDeepChanges
  };
};
var formatPath = (path) => {
  if (path.length === 0) return "";
  return path.reduce((acc, segment, i5) => {
    if (/^\d+$/.test(segment)) {
      return `${acc}[${segment}]`;
    }
    return i5 === 0 ? segment : `${acc}.${segment}`;
  }, "");
};
function hackyJsFormatter(code) {
  const normalizedCode = code.replace(/\s+/g, " ").trim();
  const rawTokens = [];
  let current = "";
  for (let i5 = 0; i5 < normalizedCode.length; i5++) {
    const c5 = normalizedCode[i5];
    if (c5 === "=" && normalizedCode[i5 + 1] === ">") {
      if (current.trim()) rawTokens.push(current.trim());
      rawTokens.push("=>");
      current = "";
      i5++;
      continue;
    }
    if (/[(){}[\];,<>:\?!]/.test(c5)) {
      if (current.trim()) {
        rawTokens.push(current.trim());
      }
      rawTokens.push(c5);
      current = "";
    } else if (/\s/.test(c5)) {
      if (current.trim()) {
        rawTokens.push(current.trim());
      }
      current = "";
    } else {
      current += c5;
    }
  }
  if (current.trim()) {
    rawTokens.push(current.trim());
  }
  const merged = [];
  for (let i5 = 0; i5 < rawTokens.length; i5++) {
    const t5 = rawTokens[i5];
    const n4 = rawTokens[i5 + 1];
    if (t5 === "(" && n4 === ")" || t5 === "[" && n4 === "]" || t5 === "{" && n4 === "}" || t5 === "<" && n4 === ">") {
      merged.push(t5 + n4);
      i5++;
    } else {
      merged.push(t5);
    }
  }
  const arrowParamSet = /* @__PURE__ */ new Set();
  const genericSet = /* @__PURE__ */ new Set();
  function findMatchingPair(openTok, closeTok, startIndex) {
    let depth = 0;
    for (let j6 = startIndex; j6 < merged.length; j6++) {
      const token = merged[j6];
      if (token === openTok) depth++;
      else if (token === closeTok) {
        depth--;
        if (depth === 0) return j6;
      }
    }
    return -1;
  }
  for (let i5 = 0; i5 < merged.length; i5++) {
    const t5 = merged[i5];
    if (t5 === "(") {
      const closeIndex = findMatchingPair("(", ")", i5);
      if (closeIndex !== -1 && merged[closeIndex + 1] === "=>") {
        for (let k6 = i5; k6 <= closeIndex; k6++) {
          arrowParamSet.add(k6);
        }
      }
    }
  }
  for (let i5 = 1; i5 < merged.length; i5++) {
    const prev = merged[i5 - 1];
    const t5 = merged[i5];
    if (/^[a-zA-Z0-9_$]+$/.test(prev) && t5 === "<") {
      const closeIndex = findMatchingPair("<", ">", i5);
      if (closeIndex !== -1) {
        for (let k6 = i5; k6 <= closeIndex; k6++) {
          genericSet.add(k6);
        }
      }
    }
  }
  let indentLevel = 0;
  const indentStr = "  ";
  const lines = [];
  let line = "";
  function pushLine() {
    if (line.trim()) {
      lines.push(line.replace(/\s+$/, ""));
    }
    line = "";
  }
  function newLine() {
    pushLine();
    line = indentStr.repeat(indentLevel);
  }
  const stack = [];
  function stackTop() {
    return stack.length ? stack[stack.length - 1] : null;
  }
  function placeToken(tok, noSpaceBefore = false) {
    if (!line.trim()) {
      line += tok;
    } else {
      if (noSpaceBefore || /^[),;:\].}>]$/.test(tok)) {
        line += tok;
      } else {
        line += ` ${tok}`;
      }
    }
  }
  for (let i5 = 0; i5 < merged.length; i5++) {
    const tok = merged[i5];
    const next = merged[i5 + 1] || "";
    if (["(", "{", "[", "<"].includes(tok)) {
      placeToken(tok);
      stack.push(tok);
      if (tok === "{") {
        indentLevel++;
        newLine();
      } else if (tok === "(" || tok === "[" || tok === "<") {
        if (arrowParamSet.has(i5) && tok === "(" || genericSet.has(i5) && tok === "<") {
        } else {
          const directClose = {
            "(": ")",
            "[": "]",
            "<": ">"
          }[tok];
          if (next !== directClose && next !== "()" && next !== "[]" && next !== "<>") {
            indentLevel++;
            newLine();
          }
        }
      }
    } else if ([")", "}", "]", ">"].includes(tok)) {
      const opening = stackTop();
      if (tok === ")" && opening === "(" || tok === "]" && opening === "[" || tok === ">" && opening === "<") {
        if (!(arrowParamSet.has(i5) && tok === ")") && !(genericSet.has(i5) && tok === ">")) {
          indentLevel = Math.max(indentLevel - 1, 0);
          newLine();
        }
      } else if (tok === "}" && opening === "{") {
        indentLevel = Math.max(indentLevel - 1, 0);
        newLine();
      }
      stack.pop();
      placeToken(tok);
      if (tok === "}") {
        newLine();
      }
    } else if (/^\(\)|\[\]|\{\}|\<\>$/.test(tok)) {
      placeToken(tok);
    } else if (tok === "=>") {
      placeToken(tok);
    } else if (tok === ";") {
      placeToken(tok, true);
      newLine();
    } else if (tok === ",") {
      placeToken(tok, true);
      const top = stackTop();
      if (!(arrowParamSet.has(i5) && top === "(") && !(genericSet.has(i5) && top === "<")) {
        if (top && ["{", "[", "(", "<"].includes(top)) {
          newLine();
        }
      }
    } else {
      placeToken(tok);
    }
  }
  pushLine();
  return lines.join("\n").replace(/\n\s*\n+/g, "\n").trim();
}
var formatFunctionPreview = (fn2, expanded = false) => {
  try {
    const fnStr = fn2.toString();
    const match = fnStr.match(
      /(?:function\s*)?(?:\(([^)]*)\)|([^=>\s]+))\s*=>?/
    );
    if (!match) return "ƒ";
    const params = match[1] || match[2] || "";
    const cleanParams = params.replace(/\s+/g, "");
    if (!expanded) {
      return `ƒ (${cleanParams}) => ...`;
    }
    return hackyJsFormatter(fnStr);
  } catch {
    return "ƒ";
  }
};
var formatValuePreview = (value) => {
  if (value === null) return "null";
  if (value === void 0) return "undefined";
  if (typeof value === "string")
    return `"${value.length > 150 ? `${value.slice(0, 20)}...` : value}"`;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (typeof value === "function") return formatFunctionPreview(value);
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (value instanceof Map) return `Map(${value.size})`;
  if (value instanceof Set) return `Set(${value.size})`;
  if (value instanceof Date) return value.toISOString();
  if (value instanceof RegExp) return value.toString();
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === "object") {
    const keys = Object.keys(value);
    return `{${keys.length > 2 ? `${keys.slice(0, 2).join(", ")}, ...` : keys.join(", ")}}`;
  }
  return String(value);
};
var safeGetValue = (value) => {
  var _a;
  if (value === null || value === void 0) return { value };
  if (typeof value === "function") return { value };
  if (typeof value !== "object") return { value };
  if (isPromise(value)) {
    return { value: "Promise" };
  }
  try {
    const proto = Object.getPrototypeOf(value);
    if (proto === Promise.prototype || ((_a = proto == null ? void 0 : proto.constructor) == null ? void 0 : _a.name) === "Promise") {
      return { value: "Promise" };
    }
    return { value };
  } catch {
    return { value: null, error: "Error accessing value" };
  }
};
var isPromise = (value) => {
  return !!value && (value instanceof Promise || typeof value === "object" && "then" in value);
};
var extractMinimalFiberInfo = (fiber) => {
  var _a, _b;
  const timings = we(fiber);
  return {
    displayName: Ee(fiber) || "Unknown",
    type: fiber.type,
    key: fiber.key,
    id: fiber.index,
    selfTime: (_a = timings == null ? void 0 : timings.selfTime) != null ? _a : null,
    totalTime: (_b = timings == null ? void 0 : timings.totalTime) != null ? _b : null
  };
};
var propsTracker = /* @__PURE__ */ new Map();
var stateTracker = /* @__PURE__ */ new Map();
var contextTracker = /* @__PURE__ */ new Map();
var lastComponentType = null;
var STATE_NAME_REGEX = /\[(?<name>\w+),\s*set\w+\]/g;
var getStateNames = (fiber) => {
  var _a, _b;
  const componentSource = ((_b = (_a = fiber.type) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a)) || "";
  return componentSource ? Array.from(
    componentSource.matchAll(STATE_NAME_REGEX),
    (m7) => {
      var _a2, _b2;
      return (_b2 = (_a2 = m7.groups) == null ? void 0 : _a2.name) != null ? _b2 : "";
    }
  ) : [];
};
var resetTracking = () => {
  propsTracker.clear();
  stateTracker.clear();
  contextTracker.clear();
  lastComponentType = null;
};
var isInitialComponentUpdate = (fiber) => {
  const isNewComponent = fiber.type !== lastComponentType;
  lastComponentType = fiber.type;
  return isNewComponent;
};
var trackChange = (tracker, key, currentValue, previousValue) => {
  const existing = tracker.get(key);
  const isInitialValue = tracker === propsTracker || tracker === contextTracker;
  const hasChanged = !isEqual(currentValue, previousValue);
  if (!existing) {
    tracker.set(key, {
      count: hasChanged && isInitialValue ? 1 : 0,
      currentValue,
      previousValue,
      lastUpdated: Date.now()
    });
    return {
      hasChanged,
      count: hasChanged && isInitialValue ? 1 : isInitialValue ? 0 : 1
    };
  }
  if (!isEqual(existing.currentValue, currentValue)) {
    const newCount = existing.count + 1;
    tracker.set(key, {
      count: newCount,
      currentValue,
      previousValue: existing.currentValue,
      lastUpdated: Date.now()
    });
    return { hasChanged: true, count: newCount };
  }
  return { hasChanged: false, count: existing.count };
};
var getStateFromFiber = (fiber) => {
  if (!fiber) return {};
  if (fiber.tag === d2 || fiber.tag === re || fiber.tag === oe || fiber.tag === ae) {
    let memoizedState = fiber.memoizedState;
    const state = {};
    let index = 0;
    while (memoizedState) {
      if (memoizedState.queue && memoizedState.memoizedState !== void 0) {
        state[index] = memoizedState.memoizedState;
      }
      memoizedState = memoizedState.next;
      index++;
    }
    return state;
  }
  if (fiber.tag === ee) {
    return fiber.memoizedState || {};
  }
  return {};
};
var collectPropsChanges = (fiber) => {
  var _a;
  const currentProps = fiber.memoizedProps || {};
  const prevProps = ((_a = fiber.alternate) == null ? void 0 : _a.memoizedProps) || {};
  const current = {};
  const prev = {};
  const allProps = Object.keys(currentProps);
  for (const key of allProps) {
    if (key in currentProps) {
      current[key] = currentProps[key];
      prev[key] = prevProps[key];
    }
  }
  const changes = getChangedPropsDetailed(fiber).map((change) => ({
    name: change.name,
    value: change.value,
    prevValue: change.prevValue
  }));
  return { current, prev, changes };
};
var collectStateChanges = (fiber) => {
  const current = getStateFromFiber(fiber);
  const prev = fiber.alternate ? getStateFromFiber(fiber.alternate) : {};
  const changes = [];
  for (const [index, value] of Object.entries(current)) {
    const stateKey = fiber.tag === ee ? index : Number(index);
    if (fiber.alternate && !isEqual(prev[index], value)) {
      changes.push({
        name: stateKey,
        value,
        prevValue: prev[index]
      });
    }
  }
  return { current, prev, changes };
};
var collectContextChanges = (fiber) => {
  const currentContexts = getAllFiberContexts(fiber);
  const prevContexts = fiber.alternate ? getAllFiberContexts(fiber.alternate) : /* @__PURE__ */ new Map();
  const current = {};
  const prev = {};
  const changes = [];
  const seenContexts = /* @__PURE__ */ new Set();
  for (const [contextType, ctx2] of currentContexts) {
    const name = ctx2.displayName;
    const contextKey = contextType;
    if (seenContexts.has(contextKey)) continue;
    seenContexts.add(contextKey);
    current[name] = ctx2.value;
    const prevCtx = prevContexts.get(contextType);
    if (prevCtx) {
      prev[name] = prevCtx.value;
      if (!isEqual(prevCtx.value, ctx2.value)) {
        changes.push({
          name,
          value: ctx2.value,
          prevValue: prevCtx.value,
          contextType
        });
      }
    }
  }
  return { current, prev, changes };
};
var collectInspectorData = (fiber) => {
  const emptySection = () => ({
    current: [],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  });
  if (!fiber) {
    return {
      data: {
        fiberProps: emptySection(),
        fiberState: emptySection(),
        fiberContext: emptySection()
      },
      shouldUpdate: false
    };
  }
  let hasNewChanges = false;
  const isInitialUpdate = isInitialComponentUpdate(fiber);
  const propsData = emptySection();
  if (fiber.memoizedProps) {
    const { current, changes } = collectPropsChanges(fiber);
    for (const [key, value] of Object.entries(current)) {
      propsData.current.push({
        name: key,
        value: isPromise(value) ? { type: "promise", displayValue: "Promise" } : value
      });
    }
    for (const change of changes) {
      const { hasChanged, count } = trackChange(
        propsTracker,
        change.name,
        change.value,
        change.prevValue
      );
      if (hasChanged) {
        hasNewChanges = true;
        propsData.changes.add(change.name);
        propsData.changesCounts.set(change.name, count);
      }
    }
  }
  const stateData = emptySection();
  const { current: stateCurrent, changes: stateChanges } = collectStateChanges(fiber);
  for (const [index, value] of Object.entries(stateCurrent)) {
    const stateKey = fiber.tag === ee ? index : Number(index);
    stateData.current.push({ name: stateKey, value });
  }
  for (const change of stateChanges) {
    const { hasChanged, count } = trackChange(
      stateTracker,
      change.name,
      change.value,
      change.prevValue
    );
    if (hasChanged) {
      hasNewChanges = true;
      stateData.changes.add(change.name);
      stateData.changesCounts.set(change.name, count);
    }
  }
  const contextData = emptySection();
  const { current: contextCurrent, changes: contextChanges } = collectContextChanges(fiber);
  for (const [name, value] of Object.entries(contextCurrent)) {
    contextData.current.push({ name, value });
  }
  if (!isInitialUpdate) {
    for (const change of contextChanges) {
      const { hasChanged, count } = trackChange(
        contextTracker,
        change.name,
        change.value,
        change.prevValue
      );
      if (hasChanged) {
        hasNewChanges = true;
        contextData.changes.add(change.name);
        contextData.changesCounts.set(change.name, count);
      }
    }
  }
  if (!hasNewChanges && !isInitialUpdate) {
    propsData.changes.clear();
    stateData.changes.clear();
    contextData.changes.clear();
  }
  return {
    data: {
      fiberProps: propsData,
      fiberState: stateData,
      fiberContext: contextData
    },
    shouldUpdate: hasNewChanges || isInitialUpdate
  };
};
var fiberContextsCache = /* @__PURE__ */ new WeakMap();
var getAllFiberContexts = (fiber) => {
  var _a;
  if (!fiber) {
    return /* @__PURE__ */ new Map();
  }
  const cachedContexts = fiberContextsCache.get(fiber);
  if (cachedContexts) {
    return cachedContexts;
  }
  const contexts = /* @__PURE__ */ new Map();
  let currentFiber = fiber;
  while (currentFiber) {
    const dependencies = currentFiber.dependencies;
    if (dependencies == null ? void 0 : dependencies.firstContext) {
      let contextItem = dependencies.firstContext;
      while (contextItem) {
        const memoizedValue = contextItem.memoizedValue;
        const displayName = (_a = contextItem.context) == null ? void 0 : _a.displayName;
        if (!contexts.has(memoizedValue)) {
          contexts.set(contextItem.context, {
            value: memoizedValue,
            displayName: displayName != null ? displayName : "UnnamedContext",
            contextType: null
          });
        }
        if (contextItem === contextItem.next) {
          break;
        }
        contextItem = contextItem.next;
      }
    }
    currentFiber = currentFiber.return;
  }
  fiberContextsCache.set(fiber, contexts);
  return contexts;
};
var collectInspectorDataWithoutCounts = (fiber) => {
  const emptySection = () => ({
    current: [],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  });
  if (!fiber) {
    return {
      fiberProps: emptySection(),
      fiberState: emptySection(),
      fiberContext: emptySection()
    };
  }
  const propsData = emptySection();
  if (fiber.memoizedProps) {
    const { current: current2, changes: changes2 } = collectPropsChanges(fiber);
    for (const [key, value] of Object.entries(current2)) {
      propsData.current.push({
        name: key,
        value: isPromise(value) ? { type: "promise", displayValue: "Promise" } : value
      });
    }
    for (const change of changes2) {
      propsData.changes.add(change.name);
      propsData.changesCounts.set(change.name, 1);
    }
  }
  const stateData = emptySection();
  if (fiber.memoizedState) {
    const { current: current2, changes: changes2 } = collectStateChanges(fiber);
    for (const [key, value] of Object.entries(current2)) {
      stateData.current.push({
        name: key,
        value: isPromise(value) ? { type: "promise", displayValue: "Promise" } : value
      });
    }
    for (const change of changes2) {
      stateData.changes.add(change.name);
      stateData.changesCounts.set(change.name, 1);
    }
  }
  const contextData = emptySection();
  const { current, changes } = collectContextChanges(fiber);
  for (const [key, value] of Object.entries(current)) {
    contextData.current.push({
      name: key,
      value: isPromise(value) ? { type: "promise", displayValue: "Promise" } : value
    });
  }
  for (const change of changes) {
    contextData.changes.add(change.name);
    contextData.changesCounts.set(change.name, 1);
  }
  return {
    // data: {
    fiberProps: propsData,
    fiberState: stateData,
    fiberContext: contextData
    // },
  };
};
var RENDER_PHASE_STRING_TO_ENUM = {
  mount: 1,
  update: 2,
  unmount: 4
  /* Unmount */
};
var fps = 0;
var lastTime = performance.now();
var frameCount = 0;
var initedFps = false;
var updateFPS = () => {
  frameCount++;
  const now = performance.now();
  if (now - lastTime >= 1e3) {
    fps = frameCount;
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(updateFPS);
};
var getFPS = () => {
  if (!initedFps) {
    initedFps = true;
    updateFPS();
    fps = 60;
  }
  return fps;
};
var isValueUnstable = (prevValue, nextValue) => {
  const prevValueString = fastSerialize(prevValue);
  const nextValueString = fastSerialize(nextValue);
  return prevValueString === nextValueString && unstableTypes.includes(typeof prevValue) && unstableTypes.includes(typeof nextValue);
};
var unstableTypes = ["function", "object"];
var cache = /* @__PURE__ */ new WeakMap();
function fastSerialize(value, depth = 0) {
  var _a;
  if (depth < 0) return "…";
  switch (typeof value) {
    case "function":
      return value.toString();
    case "string":
      return value;
    case "number":
    case "boolean":
    case "undefined":
      return String(value);
    case "object":
      break;
    default:
      return String(value);
  }
  if (value === null) return "null";
  if (cache.has(value)) {
    const cached = cache.get(value);
    if (cached !== void 0) {
      return cached;
    }
  }
  if (Array.isArray(value)) {
    const str2 = value.length ? `[${value.length}]` : "[]";
    cache.set(value, str2);
    return str2;
  }
  if (t2(value)) {
    const type = (_a = Ee(value.type)) != null ? _a : "";
    const propCount = value.props ? Object.keys(value.props).length : 0;
    const str2 = `<${type} ${propCount}>`;
    cache.set(value, str2);
    return str2;
  }
  if (Object.getPrototypeOf(value) === Object.prototype) {
    const keys = Object.keys(value);
    const str2 = keys.length ? `{${keys.length}}` : "{}";
    cache.set(value, str2);
    return str2;
  }
  const ctor = value && typeof value === "object" ? value.constructor : void 0;
  if (ctor && typeof ctor === "function" && ctor.name) {
    const str2 = `${ctor.name}{…}`;
    cache.set(value, str2);
    return str2;
  }
  const tagString = Object.prototype.toString.call(value).slice(8, -1);
  const str = `${tagString}{…}`;
  cache.set(value, str);
  return str;
}
var getStateChanges = (fiber) => {
  var _a, _b;
  if (!fiber) return [];
  const changes = [];
  if (fiber.tag === d2 || fiber.tag === re || fiber.tag === oe || fiber.tag === ae) {
    let memoizedState = fiber.memoizedState;
    let prevState = (_a = fiber.alternate) == null ? void 0 : _a.memoizedState;
    let index = 0;
    while (memoizedState) {
      if (memoizedState.queue && memoizedState.memoizedState !== void 0) {
        const change = {
          type: 2,
          name: index.toString(),
          value: memoizedState.memoizedState,
          prevValue: prevState == null ? void 0 : prevState.memoizedState
        };
        if (!isEqual(change.prevValue, change.value)) {
          changes.push(change);
        }
      }
      memoizedState = memoizedState.next;
      prevState = prevState == null ? void 0 : prevState.next;
      index++;
    }
    return changes;
  }
  if (fiber.tag === ee) {
    const change = {
      type: 3,
      name: "state",
      value: fiber.memoizedState,
      prevValue: (_b = fiber.alternate) == null ? void 0 : _b.memoizedState
    };
    if (!isEqual(change.prevValue, change.value)) {
      changes.push(change);
    }
    return changes;
  }
  return changes;
};
var lastContextId = 0;
var contextIdMap = /* @__PURE__ */ new WeakMap();
var getContextId = (contextFiber) => {
  const existing = contextIdMap.get(contextFiber);
  if (existing) {
    return existing;
  }
  lastContextId++;
  contextIdMap.set(contextFiber, lastContextId);
  return lastContextId;
};
function getContextChangesTraversal(nextValue, prevValue) {
  var _a;
  if (!nextValue || !prevValue) return;
  const nextMemoizedValue = nextValue.memoizedValue;
  const change = {
    type: 4,
    name: (_a = nextValue.context.displayName) != null ? _a : "Context.Provider",
    value: nextMemoizedValue,
    contextType: getContextId(nextValue.context)
    // unstable: false,
  };
  this.push(change);
}
var getContextChanges = (fiber) => {
  const changes = [];
  Ce(fiber, getContextChangesTraversal.bind(changes));
  return changes;
};
var instrumentationInstances = /* @__PURE__ */ new Map();
var inited = false;
var getAllInstances = () => Array.from(instrumentationInstances.values());
function isRenderUnnecessaryTraversal(_propsName, prevValue, nextValue) {
  if (!isEqual(prevValue, nextValue) && !isValueUnstable(prevValue, nextValue)) {
    this.isRequiredChange = true;
  }
}
var isRenderUnnecessary = (fiber) => {
  if (!w(fiber)) return true;
  const mutatedHostFibers = T(fiber);
  for (const mutatedHostFiber of mutatedHostFibers) {
    const state = {
      isRequiredChange: false
    };
    S(mutatedHostFiber, isRenderUnnecessaryTraversal.bind(state));
    if (state.isRequiredChange) return false;
  }
  return true;
};
var TRACK_UNNECESSARY_RENDERS = false;
var RENDER_DEBOUNCE_MS = 16;
var renderDataMap = /* @__PURE__ */ new WeakMap();
function getFiberIdentifier(fiber) {
  return String(R(fiber));
}
function getRenderData(fiber) {
  const id = getFiberIdentifier(fiber);
  const keyMap = renderDataMap.get(N(fiber));
  if (keyMap) {
    return keyMap.get(id);
  }
  return void 0;
}
function setRenderData(fiber, value) {
  const type = N(fiber.type);
  const id = getFiberIdentifier(fiber);
  let keyMap = renderDataMap.get(type);
  if (!keyMap) {
    keyMap = /* @__PURE__ */ new Map();
    renderDataMap.set(type, keyMap);
  }
  keyMap.set(id, value);
}
var trackRender = (fiber, fiberSelfTime, fiberTotalTime, hasChanges, hasDomMutations) => {
  const currentTimestamp = Date.now();
  const existingData = getRenderData(fiber);
  if ((hasChanges || hasDomMutations) && (!existingData || currentTimestamp - (existingData.lastRenderTimestamp || 0) > RENDER_DEBOUNCE_MS)) {
    const renderData = existingData || {
      selfTime: 0,
      totalTime: 0,
      renderCount: 0,
      lastRenderTimestamp: currentTimestamp
    };
    renderData.renderCount = (renderData.renderCount || 0) + 1;
    renderData.selfTime = fiberSelfTime || 0;
    renderData.totalTime = fiberTotalTime || 0;
    renderData.lastRenderTimestamp = currentTimestamp;
    setRenderData(fiber, { ...renderData });
  }
};
var createInstrumentation = (instanceKey, config) => {
  const instrumentation = {
    // this will typically be false, but in cases where a user provides showToolbar: true, this will be true
    isPaused: y4(!ReactScanInternals.options.value.enabled),
    fiberRoots: /* @__PURE__ */ new WeakSet()
  };
  instrumentationInstances.set(instanceKey, {
    key: instanceKey,
    config,
    instrumentation
  });
  if (!inited) {
    inited = true;
    Ne({
      name: "react-scan",
      onActive: config.onActive,
      onCommitFiberRoot(_rendererID, root) {
        instrumentation.fiberRoots.add(root);
        const allInstances = getAllInstances();
        for (const instance of allInstances) {
          instance.config.onCommitStart();
        }
        Ae(
          root.current,
          (fiber, phase) => {
            const type = N(fiber.type);
            if (!type) return null;
            const allInstances2 = getAllInstances();
            const validInstancesIndicies = [];
            for (let i5 = 0, len = allInstances2.length; i5 < len; i5++) {
              const instance = allInstances2[i5];
              if (!instance.config.isValidFiber(fiber)) continue;
              validInstancesIndicies.push(i5);
            }
            if (!validInstancesIndicies.length) return null;
            const changes = [];
            if (allInstances2.some((instance) => instance.config.trackChanges)) {
              const changesProps = collectPropsChanges(fiber).changes;
              const changesState = collectStateChanges(fiber).changes;
              const changesContext = collectContextChanges(fiber).changes;
              changes.push.apply(
                null,
                changesProps.map(
                  (change) => ({
                    type: 1,
                    name: change.name,
                    value: change.value
                  })
                )
              );
              for (const change of changesState) {
                if (fiber.tag === ee) {
                  changes.push({
                    type: 3,
                    name: change.name.toString(),
                    value: change.value
                  });
                } else {
                  changes.push({
                    type: 2,
                    name: change.name.toString(),
                    value: change.value
                  });
                }
              }
              changes.push.apply(
                null,
                changesContext.map(
                  (change) => ({
                    type: 4,
                    name: change.name,
                    value: change.value,
                    contextType: Number(change.contextType)
                  })
                )
              );
            }
            const { selfTime: fiberSelfTime, totalTime: fiberTotalTime } = we(fiber);
            const fps2 = getFPS();
            const render2 = {
              phase: RENDER_PHASE_STRING_TO_ENUM[phase],
              componentName: Ee(type),
              count: 1,
              changes,
              time: fiberSelfTime,
              forget: Te(fiber),
              // todo: allow this to be toggle-able through toolbar
              // todo: performance optimization: if the last fiber measure was very off screen, do not run isRenderUnnecessary
              unnecessary: TRACK_UNNECESSARY_RENDERS ? isRenderUnnecessary(fiber) : null,
              didCommit: w(fiber),
              fps: fps2
            };
            const hasChanges = changes.length > 0;
            const hasDomMutations = T(fiber).length > 0;
            if (phase === "update") {
              trackRender(
                fiber,
                fiberSelfTime,
                fiberTotalTime,
                hasChanges,
                hasDomMutations
              );
            }
            for (let i5 = 0, len = validInstancesIndicies.length; i5 < len; i5++) {
              const index = validInstancesIndicies[i5];
              const instance = allInstances2[index];
              instance.config.onRender(fiber, [render2]);
            }
          }
        );
        for (const instance of allInstances) {
          instance.config.onCommitFinish();
        }
      },
      onPostCommitFiberRoot() {
        const allInstances = getAllInstances();
        for (const instance of allInstances) {
          instance.config.onPostCommitFiberRoot();
        }
      }
    });
  }
  return instrumentation;
};
var log = (renders) => {
  var _a;
  const logMap = /* @__PURE__ */ new Map();
  for (let i5 = 0, len = renders.length; i5 < len; i5++) {
    const render2 = renders[i5];
    if (!render2.componentName) continue;
    const changeLog = (_a = logMap.get(render2.componentName)) != null ? _a : [];
    renders;
    const labelText = getLabelText([
      {
        aggregatedCount: 1,
        computedKey: null,
        name: render2.componentName,
        frame: null,
        ...render2,
        changes: {
          // TODO(Alexis): use a faster reduction method
          type: render2.changes.reduce((set, change) => set | change.type, 0),
          unstable: render2.changes.some((change) => change.unstable)
        },
        phase: render2.phase,
        computedCurrent: null
      }
    ]);
    if (!labelText) continue;
    let prevChangedProps = null;
    let nextChangedProps = null;
    if (render2.changes) {
      for (let i22 = 0, len2 = render2.changes.length; i22 < len2; i22++) {
        const { name, prevValue, nextValue, unstable, type } = render2.changes[i22];
        if (type === 1) {
          prevChangedProps != null ? prevChangedProps : prevChangedProps = {};
          nextChangedProps != null ? nextChangedProps : nextChangedProps = {};
          prevChangedProps[`${unstable ? "⚠️" : ""}${name} (prev)`] = prevValue;
          nextChangedProps[`${unstable ? "⚠️" : ""}${name} (next)`] = nextValue;
        } else {
          changeLog.push({
            prev: prevValue,
            next: nextValue,
            type: type === 4 ? "context" : "state",
            unstable: unstable != null ? unstable : false
          });
        }
      }
    }
    if (prevChangedProps && nextChangedProps) {
      changeLog.push({
        prev: prevChangedProps,
        next: nextChangedProps,
        type: "props",
        unstable: false
      });
    }
    logMap.set(labelText, changeLog);
  }
  for (const [name, changeLog] of Array.from(logMap.entries())) {
    console.group(
      `%c${name}`,
      "background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;"
    );
    for (const { type, prev, next, unstable } of changeLog) {
      console.log(`${type}:`, unstable ? "⚠️" : "", prev, "!==", next);
    }
    console.groupEnd();
  }
};
var logIntro = () => {
  if (window.hideIntro) {
    window.hideIntro = void 0;
    return;
  }
  console.log(
    "%c[·] %cReact Scan",
    "font-weight:bold;color:#7a68e8;font-size:20px;",
    "font-weight:bold;font-size:14px;"
  );
};
var OUTLINE_ARRAY_SIZE = 7;
var MONO_FONT = "Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace";
var INTERPOLATION_SPEED = 0.2;
var SNAP_THRESHOLD = 0.5;
var lerp = (start2, end) => {
  const delta = end - start2;
  if (Math.abs(delta) < SNAP_THRESHOLD) return end;
  return start2 + delta * INTERPOLATION_SPEED;
};
var MAX_PARTS_LENGTH = 4;
var MAX_LABEL_LENGTH = 40;
var TOTAL_FRAMES = 45;
var PRIMARY_COLOR = "115,97,230";
function sortEntry(prev, next) {
  return next[0] - prev[0];
}
function getSortedEntries(countByNames) {
  const entries = [...countByNames.entries()];
  return entries.sort(sortEntry);
}
function getLabelTextPart([count, names]) {
  let part = `${names.slice(0, MAX_PARTS_LENGTH).join(", ")} ×${count}`;
  if (part.length > MAX_LABEL_LENGTH) {
    part = `${part.slice(0, MAX_LABEL_LENGTH)}…`;
  }
  return part;
}
var getLabelText2 = (outlines) => {
  const nameByCount = /* @__PURE__ */ new Map();
  for (const { name, count } of outlines) {
    nameByCount.set(name, (nameByCount.get(name) || 0) + count);
  }
  const countByNames = /* @__PURE__ */ new Map();
  for (const [name, count] of nameByCount) {
    const names = countByNames.get(count);
    if (names) {
      names.push(name);
    } else {
      countByNames.set(count, [name]);
    }
  }
  const partsEntries = getSortedEntries(countByNames);
  let labelText = getLabelTextPart(partsEntries[0]);
  for (let i5 = 1, len = partsEntries.length; i5 < len; i5++) {
    labelText += ", " + getLabelTextPart(partsEntries[i5]);
  }
  if (labelText.length > MAX_LABEL_LENGTH) {
    return `${labelText.slice(0, MAX_LABEL_LENGTH)}…`;
  }
  return labelText;
};
var getAreaFromOutlines = (outlines) => {
  let area = 0;
  for (const outline of outlines) {
    area += outline.width * outline.height;
  }
  return area;
};
var updateOutlines = (activeOutlines2, outlines) => {
  for (const { id, name, count, x: x6, y: y6, width, height, didCommit } of outlines) {
    const outline = {
      id,
      name,
      count,
      x: x6,
      y: y6,
      width,
      height,
      frame: 0,
      targetX: x6,
      targetY: y6,
      targetWidth: width,
      targetHeight: height,
      didCommit
    };
    const key = String(outline.id);
    const existingOutline = activeOutlines2.get(key);
    if (existingOutline) {
      existingOutline.count++;
      existingOutline.frame = 0;
      existingOutline.targetX = x6;
      existingOutline.targetY = y6;
      existingOutline.targetWidth = width;
      existingOutline.targetHeight = height;
      existingOutline.didCommit = didCommit;
    } else {
      activeOutlines2.set(key, outline);
    }
  }
};
var updateScroll = (activeOutlines2, deltaX, deltaY) => {
  for (const outline of activeOutlines2.values()) {
    const newX = outline.x - deltaX;
    const newY = outline.y - deltaY;
    outline.targetX = newX;
    outline.targetY = newY;
  }
};
var initCanvas = (canvas2, dpr2) => {
  const ctx2 = canvas2.getContext("2d", { alpha: true });
  if (ctx2) {
    ctx2.scale(dpr2, dpr2);
  }
  return ctx2;
};
var drawCanvas = (ctx2, canvas2, dpr2, activeOutlines2) => {
  ctx2.clearRect(0, 0, canvas2.width / dpr2, canvas2.height / dpr2);
  const groupedOutlinesMap = /* @__PURE__ */ new Map();
  const rectMap = /* @__PURE__ */ new Map();
  for (const outline of activeOutlines2.values()) {
    const {
      x: x6,
      y: y6,
      width,
      height,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      frame
    } = outline;
    if (targetX !== x6) {
      outline.x = lerp(x6, targetX);
    }
    if (targetY !== y6) {
      outline.y = lerp(y6, targetY);
    }
    if (targetWidth !== width) {
      outline.width = lerp(width, targetWidth);
    }
    if (targetHeight !== height) {
      outline.height = lerp(height, targetHeight);
    }
    const labelKey = `${targetX != null ? targetX : x6},${targetY != null ? targetY : y6}`;
    const rectKey = `${labelKey},${targetWidth != null ? targetWidth : width},${targetHeight != null ? targetHeight : height}`;
    const outlines = groupedOutlinesMap.get(labelKey);
    if (outlines) {
      outlines.push(outline);
    } else {
      groupedOutlinesMap.set(labelKey, [outline]);
    }
    const alpha = 1 - frame / TOTAL_FRAMES;
    outline.frame++;
    const rect = rectMap.get(rectKey) || {
      x: x6,
      y: y6,
      width,
      height,
      alpha
    };
    if (alpha > rect.alpha) {
      rect.alpha = alpha;
    }
    rectMap.set(rectKey, rect);
  }
  for (const { x: x6, y: y6, width, height, alpha } of rectMap.values()) {
    ctx2.strokeStyle = `rgba(${PRIMARY_COLOR},${alpha})`;
    ctx2.lineWidth = 1;
    const rx = Math.round(x6) + 0.5;
    const ry = Math.round(y6) + 0.5;
    const rw = Math.round(width);
    const rh = Math.round(height);
    ctx2.beginPath();
    ctx2.rect(rx, ry, rw, rh);
    ctx2.stroke();
    ctx2.fillStyle = `rgba(${PRIMARY_COLOR},${alpha * 0.1})`;
    ctx2.fill();
  }
  ctx2.font = `11px ${MONO_FONT}`;
  const labelMap = /* @__PURE__ */ new Map();
  ctx2.textRendering = "optimizeSpeed";
  for (const outlines of groupedOutlinesMap.values()) {
    const first = outlines[0];
    const { x: x6, y: y6, frame } = first;
    const alpha = 1 - frame / TOTAL_FRAMES;
    const text = getLabelText2(outlines);
    const { width } = ctx2.measureText(text);
    const height = 11;
    labelMap.set(`${x6},${y6},${width},${text}`, {
      text,
      width,
      height,
      alpha,
      x: x6,
      y: y6,
      outlines
    });
    let labelY = y6 - height - 4;
    if (labelY < 0) {
      labelY = 0;
    }
    if (frame > TOTAL_FRAMES) {
      for (const outline of outlines) {
        activeOutlines2.delete(String(outline.id));
      }
    }
  }
  const sortedLabels = Array.from(labelMap.entries()).sort(
    ([_7, a5], [__, b5]) => {
      return getAreaFromOutlines(b5.outlines) - getAreaFromOutlines(a5.outlines);
    }
  );
  for (const [labelKey, label] of sortedLabels) {
    if (!labelMap.has(labelKey)) continue;
    for (const [otherKey, otherLabel] of labelMap.entries()) {
      if (labelKey === otherKey) continue;
      const { x: x6, y: y6, width, height } = label;
      const {
        x: otherX,
        y: otherY,
        width: otherWidth,
        height: otherHeight
      } = otherLabel;
      if (x6 + width > otherX && otherX + otherWidth > x6 && y6 + height > otherY && otherY + otherHeight > y6) {
        label.text = getLabelText2(label.outlines.concat(otherLabel.outlines));
        label.width = ctx2.measureText(label.text).width;
        labelMap.delete(otherKey);
      }
    }
  }
  for (const label of labelMap.values()) {
    const { x: x6, y: y6, alpha, width, height, text } = label;
    let labelY = y6 - height - 4;
    if (labelY < 0) {
      labelY = 0;
    }
    ctx2.fillStyle = `rgba(${PRIMARY_COLOR},${alpha})`;
    ctx2.fillRect(x6, labelY, width + 4, height + 4);
    ctx2.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx2.fillText(text, x6 + 2, labelY + height);
  }
  return activeOutlines2.size > 0;
};
var workerCode = '"use strict";(()=>{var D="Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace";var T=(t,n)=>{let r=n-t;return Math.abs(r)<.5?n:t+r*.2};var x="115,97,230";function P(t,n){return n[0]-t[0]}function F(t){return[...t.entries()].sort(P)}function v([t,n]){let r=`${n.slice(0,4).join(", ")} \\xD7${t}`;return r.length>40&&(r=`${r.slice(0,40)}\\u2026`),r}var $=t=>{let n=new Map;for(let{name:e,count:u}of t)n.set(e,(n.get(e)||0)+u);let r=new Map;for(let[e,u]of n){let A=r.get(u);A?A.push(e):r.set(u,[e])}let d=F(r),a=v(d[0]);for(let e=1,u=d.length;e<u;e++)a+=", "+v(d[e]);return a.length>40?`${a.slice(0,40)}\\u2026`:a},H=t=>{let n=0;for(let r of t)n+=r.width*r.height;return n};var N=(t,n)=>{let r=t.getContext("2d",{alpha:!0});return r&&r.scale(n,n),r},X=(t,n,r,d)=>{t.clearRect(0,0,n.width/r,n.height/r);let a=new Map,e=new Map;for(let i of d.values()){let{x:o,y:c,width:l,height:g,targetX:s,targetY:f,targetWidth:h,targetHeight:m,frame:O}=i;s!==o&&(i.x=T(o,s)),f!==c&&(i.y=T(c,f)),h!==l&&(i.width=T(l,h)),m!==g&&(i.height=T(g,m));let M=`${s??o},${f??c}`,L=`${M},${h??l},${m??g}`,S=a.get(M);S?S.push(i):a.set(M,[i]);let C=1-O/45;i.frame++;let _=e.get(L)||{x:o,y:c,width:l,height:g,alpha:C};C>_.alpha&&(_.alpha=C),e.set(L,_)}for(let{x:i,y:o,width:c,height:l,alpha:g}of e.values()){t.strokeStyle=`rgba(${x},${g})`,t.lineWidth=1;let s=Math.round(i)+.5,f=Math.round(o)+.5,h=Math.round(c),m=Math.round(l);t.beginPath(),t.rect(s,f,h,m),t.stroke(),t.fillStyle=`rgba(${x},${g*.1})`,t.fill()}t.font=`11px ${D}`;let u=new Map;t.textRendering="optimizeSpeed";for(let i of a.values()){let o=i[0],{x:c,y:l,frame:g}=o,s=1-g/45,f=$(i),{width:h}=t.measureText(f),m=11;u.set(`${c},${l},${h},${f}`,{text:f,width:h,height:m,alpha:s,x:c,y:l,outlines:i});let O=l-m-4;if(O<0&&(O=0),g>45)for(let M of i)d.delete(String(M.id))}let A=Array.from(u.entries()).sort(([i,o],[c,l])=>H(l.outlines)-H(o.outlines));for(let[i,o]of A)if(u.has(i))for(let[c,l]of u.entries()){if(i===c)continue;let{x:g,y:s,width:f,height:h}=o,{x:m,y:O,width:M,height:L}=l;g+f>m&&m+M>g&&s+h>O&&O+L>s&&(o.text=$(o.outlines.concat(l.outlines)),o.width=t.measureText(o.text).width,u.delete(c))}for(let i of u.values()){let{x:o,y:c,alpha:l,width:g,height:s,text:f}=i,h=c-s-4;h<0&&(h=0),t.fillStyle=`rgba(${x},${l})`,t.fillRect(o,h,g+4,s+4),t.fillStyle=`rgba(255,255,255,${l})`,t.fillText(f,o+2,h+s)}return d.size>0};var p=null,w=null,b=1,y=new Map,E=null,R=()=>{if(!w||!p)return;X(w,p,b,y)?E=requestAnimationFrame(R):E=null};self.onmessage=t=>{let{type:n}=t.data;if(n==="init"&&(p=t.data.canvas,b=t.data.dpr,p&&(p.width=t.data.width,p.height=t.data.height,w=N(p,b))),!(!p||!w)){if(n==="resize"){b=t.data.dpr,p.width=t.data.width*b,p.height=t.data.height*b,w.resetTransform(),w.scale(b,b),R();return}if(n==="draw-outlines"){let{data:r,names:d}=t.data,a=new Float32Array(r);for(let e=0;e<a.length;e+=7){let u=a[e+2],A=a[e+3],i=a[e+4],o=a[e+5],c=a[e+6],l={id:a[e],name:d[e/7],count:a[e+1],x:u,y:A,width:i,height:o,frame:0,targetX:u,targetY:A,targetWidth:i,targetHeight:o,didCommit:c},g=String(l.id),s=y.get(g);s?(s.count++,s.frame=0,s.targetX=u,s.targetY=A,s.targetWidth=i,s.targetHeight=o,s.didCommit=c):y.set(g,l)}E||(E=requestAnimationFrame(R));return}if(n==="scroll"){let{deltaX:r,deltaY:d}=t.data;for(let a of y.values()){let e=a.x-r,u=a.y-d;a.targetX=e,a.targetY=u}}}};})();\n';
var worker = null;
var canvas = null;
var ctx = null;
var dpr = 1;
var animationFrameId = null;
var activeOutlines = /* @__PURE__ */ new Map();
var blueprintMap = /* @__PURE__ */ new Map();
var blueprintMapKeys = /* @__PURE__ */ new Set();
var outlineFiber = (fiber) => {
  if (!be(fiber)) return;
  const name = typeof fiber.type === "string" ? fiber.type : Ee(fiber);
  if (!name) return;
  const blueprint = blueprintMap.get(fiber);
  const nearestFibers = k(fiber);
  const didCommit = w(fiber);
  if (!blueprint) {
    blueprintMap.set(fiber, {
      name,
      count: 1,
      elements: nearestFibers.map((fiber2) => fiber2.stateNode),
      didCommit: didCommit ? 1 : 0
    });
    blueprintMapKeys.add(fiber);
  } else {
    blueprint.count++;
  }
};
var mergeRects = (rects) => {
  const firstRect = rects[0];
  if (rects.length === 1) return firstRect;
  let minX;
  let minY;
  let maxX;
  let maxY;
  for (let i5 = 0, len = rects.length; i5 < len; i5++) {
    const rect = rects[i5];
    minX = minX == null ? rect.x : Math.min(minX, rect.x);
    minY = minY == null ? rect.y : Math.min(minY, rect.y);
    maxX = maxX == null ? rect.x + rect.width : Math.max(maxX, rect.x + rect.width);
    maxY = maxY == null ? rect.y + rect.height : Math.max(maxY, rect.y + rect.height);
  }
  if (minX == null || minY == null || maxX == null || maxY == null) {
    return rects[0];
  }
  return new DOMRect(minX, minY, maxX - minX, maxY - minY);
};
function onIntersect(entries, observer) {
  const newEntries = [];
  for (const entry of entries) {
    const element = entry.target;
    if (!this.seenElements.has(element)) {
      this.seenElements.add(element);
      newEntries.push(entry);
    }
  }
  if (newEntries.length > 0 && this.resolveNext) {
    this.resolveNext(newEntries);
    this.resolveNext = null;
  }
  if (this.seenElements.size === this.uniqueElements.size) {
    observer.disconnect();
    this.done = true;
    if (this.resolveNext) {
      this.resolveNext([]);
    }
  }
}
var getBatchedRectMap = async function* (elements) {
  const state = {
    uniqueElements: new Set(elements),
    seenElements: /* @__PURE__ */ new Set(),
    resolveNext: null,
    done: false
  };
  const observer = new IntersectionObserver(onIntersect.bind(state));
  for (const element of state.uniqueElements) {
    observer.observe(element);
  }
  while (!state.done) {
    const entries = await new Promise(
      (resolve) => {
        state.resolveNext = resolve;
      }
    );
    if (entries.length > 0) {
      yield entries;
    }
  }
};
var SupportedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : ArrayBuffer;
var flushOutlines = async () => {
  const elements = [];
  for (const fiber of blueprintMapKeys) {
    const blueprint = blueprintMap.get(fiber);
    if (!blueprint) continue;
    for (let i5 = 0; i5 < blueprint.elements.length; i5++) {
      if (!(blueprint.elements[i5] instanceof Element)) {
        continue;
      }
      elements.push(blueprint.elements[i5]);
    }
  }
  const rectsMap = /* @__PURE__ */ new Map();
  for await (const entries of getBatchedRectMap(elements)) {
    for (const entry of entries) {
      const element = entry.target;
      const rect = entry.intersectionRect;
      if (entry.isIntersecting && rect.width && rect.height) {
        rectsMap.set(element, rect);
      }
    }
    const blueprints = [];
    const blueprintRects = [];
    const blueprintIds = [];
    for (const fiber of blueprintMapKeys) {
      const blueprint = blueprintMap.get(fiber);
      if (!blueprint) continue;
      const rects = [];
      for (let i5 = 0; i5 < blueprint.elements.length; i5++) {
        const element = blueprint.elements[i5];
        const rect = rectsMap.get(element);
        if (!rect) continue;
        rects.push(rect);
      }
      if (!rects.length) continue;
      blueprints.push(blueprint);
      blueprintRects.push(mergeRects(rects));
      blueprintIds.push(R(fiber));
    }
    if (blueprints.length > 0) {
      const arrayBuffer = new SupportedArrayBuffer(
        blueprints.length * OUTLINE_ARRAY_SIZE * 4
      );
      const sharedView = new Float32Array(arrayBuffer);
      const blueprintNames = new Array(blueprints.length);
      let outlineData;
      for (let i5 = 0, len = blueprints.length; i5 < len; i5++) {
        const blueprint = blueprints[i5];
        const id = blueprintIds[i5];
        const { x: x6, y: y6, width, height } = blueprintRects[i5];
        const { count, name, didCommit } = blueprint;
        if (worker) {
          const scaledIndex = i5 * OUTLINE_ARRAY_SIZE;
          sharedView[scaledIndex] = id;
          sharedView[scaledIndex + 1] = count;
          sharedView[scaledIndex + 2] = x6;
          sharedView[scaledIndex + 3] = y6;
          sharedView[scaledIndex + 4] = width;
          sharedView[scaledIndex + 5] = height;
          sharedView[scaledIndex + 6] = didCommit;
          blueprintNames[i5] = name;
        } else {
          outlineData || (outlineData = new Array(blueprints.length));
          outlineData[i5] = {
            id,
            name,
            count,
            x: x6,
            y: y6,
            width,
            height,
            didCommit
          };
        }
      }
      if (worker) {
        worker.postMessage({
          type: "draw-outlines",
          data: arrayBuffer,
          names: blueprintNames
        });
      } else if (canvas && ctx && outlineData) {
        updateOutlines(activeOutlines, outlineData);
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(draw);
        }
      }
    }
  }
  for (const fiber of blueprintMapKeys) {
    blueprintMap.delete(fiber);
    blueprintMapKeys.delete(fiber);
  }
};
var draw = () => {
  if (!ctx || !canvas) return;
  const shouldContinue = drawCanvas(ctx, canvas, dpr, activeOutlines);
  if (shouldContinue) {
    animationFrameId = requestAnimationFrame(draw);
  } else {
    animationFrameId = null;
  }
};
var IS_OFFSCREEN_CANVAS_WORKER_SUPPORTED = typeof OffscreenCanvas !== "undefined" && typeof Worker !== "undefined";
var getDpr = () => {
  return Math.min(window.devicePixelRatio || 1, 2);
};
var getCanvasEl = () => {
  cleanup();
  const host = document.createElement("div");
  host.setAttribute("data-react-scan", "true");
  const shadowRoot2 = host.attachShadow({ mode: "open" });
  const canvasEl = document.createElement("canvas");
  canvasEl.style.position = "fixed";
  canvasEl.style.top = "0";
  canvasEl.style.left = "0";
  canvasEl.style.pointerEvents = "none";
  canvasEl.style.zIndex = "2147483646";
  canvasEl.setAttribute("aria-hidden", "true");
  shadowRoot2.appendChild(canvasEl);
  if (!canvasEl) return null;
  dpr = getDpr();
  canvas = canvasEl;
  const { innerWidth, innerHeight } = window;
  canvasEl.style.width = `${innerWidth}px`;
  canvasEl.style.height = `${innerHeight}px`;
  const width = innerWidth * dpr;
  const height = innerHeight * dpr;
  canvasEl.width = width;
  canvasEl.height = height;
  const workerOptOut = ReactScanInternals.options.value.useOffscreenCanvasWorker === false;
  if (IS_OFFSCREEN_CANVAS_WORKER_SUPPORTED && !window.__REACT_SCAN_EXTENSION__ && !workerOptOut) {
    try {
      const blobUrl = URL.createObjectURL(
        new Blob([workerCode], { type: "application/javascript" })
      );
      worker = new Worker(blobUrl);
      const offscreenCanvas = canvasEl.transferControlToOffscreen();
      worker.postMessage(
        {
          type: "init",
          canvas: offscreenCanvas,
          width: canvasEl.width,
          height: canvasEl.height,
          dpr
        },
        [offscreenCanvas]
      );
    } catch (error) {
      worker = null;
      if (ReactScanInternals.options.value._debug === "verbose") {
        console.warn("Failed to initialize OffscreenCanvas worker:", error);
      }
    }
  }
  if (!worker) {
    ctx = initCanvas(canvasEl, dpr);
  }
  let isResizeScheduled = false;
  window.addEventListener("resize", () => {
    if (!isResizeScheduled) {
      isResizeScheduled = true;
      setTimeout(() => {
        const width2 = window.innerWidth;
        const height2 = window.innerHeight;
        dpr = getDpr();
        canvasEl.style.width = `${width2}px`;
        canvasEl.style.height = `${height2}px`;
        if (worker) {
          worker.postMessage({
            type: "resize",
            width: width2,
            height: height2,
            dpr
          });
        } else {
          canvasEl.width = width2 * dpr;
          canvasEl.height = height2 * dpr;
          if (ctx) {
            ctx.resetTransform();
            ctx.scale(dpr, dpr);
          }
          draw();
        }
        isResizeScheduled = false;
      });
    }
  });
  let prevScrollX = window.scrollX;
  let prevScrollY = window.scrollY;
  let isScrollScheduled = false;
  window.addEventListener("scroll", () => {
    if (!isScrollScheduled) {
      isScrollScheduled = true;
      setTimeout(() => {
        const { scrollX, scrollY } = window;
        const deltaX = scrollX - prevScrollX;
        const deltaY = scrollY - prevScrollY;
        prevScrollX = scrollX;
        prevScrollY = scrollY;
        if (worker) {
          worker.postMessage({
            type: "scroll",
            deltaX,
            deltaY
          });
        } else {
          requestAnimationFrame(
            updateScroll.bind(null, activeOutlines, deltaX, deltaY)
          );
        }
        isScrollScheduled = false;
      }, 16 * 2);
    }
  });
  setInterval(() => {
    if (blueprintMapKeys.size) {
      requestAnimationFrame(flushOutlines);
    }
  }, 16 * 2);
  shadowRoot2.appendChild(canvasEl);
  return host;
};
var hasStopped = () => {
  return globalThis.__REACT_SCAN_STOP__;
};
var cleanup = () => {
  const host = document.querySelector("[data-react-scan]");
  if (host) {
    host.remove();
  }
};
var reportRenderToListeners = (fiber) => {
  var _a, _b;
  if (be(fiber)) {
    if (ReactScanInternals.options.value.showToolbar !== false && Store.inspectState.value.kind === "focused") {
      const reportFiber = fiber;
      const { selfTime } = we(fiber);
      const displayName = Ee(fiber.type);
      const fiberId = R(reportFiber);
      const currentData = Store.reportData.get(fiberId);
      const existingCount = (_a = currentData == null ? void 0 : currentData.count) != null ? _a : 0;
      const existingTime = (_b = currentData == null ? void 0 : currentData.time) != null ? _b : 0;
      const changes = [];
      const listeners = Store.changesListeners.get(R(fiber));
      if (listeners == null ? void 0 : listeners.length) {
        const propsChanges = getChangedPropsDetailed(
          fiber
        ).map((change) => ({
          type: 1,
          name: change.name,
          value: change.value,
          prevValue: change.prevValue,
          unstable: false
        }));
        const stateChanges = getStateChanges(fiber);
        const fiberContext = getContextChanges(fiber);
        const contextChanges = fiberContext.map(
          (info) => ({
            name: info.name,
            type: 4,
            value: info.value,
            contextType: info.contextType
          })
        );
        listeners.forEach((listener) => {
          listener({
            propsChanges,
            stateChanges,
            contextChanges
          });
        });
      }
      const fiberData = {
        count: existingCount + 1,
        time: existingTime + selfTime || 0,
        renders: [],
        displayName,
        type: N(fiber.type) || null,
        changes
      };
      Store.reportData.set(fiberId, fiberData);
      needsReport = true;
    }
  }
};
var needsReport = false;
var reportInterval;
var startReportInterval = () => {
  clearInterval(reportInterval);
  reportInterval = setInterval(() => {
    if (needsReport) {
      Store.lastReportTime.value = Date.now();
      needsReport = false;
    }
  }, 50);
};
var isValidFiber = (fiber) => {
  if (ignoredProps.has(fiber.memoizedProps)) {
    return false;
  }
  return true;
};
var isInstrumentationInitialized = false;
var initReactScanInstrumentation = (setupToolbar) => {
  if (hasStopped()) return;
  if (isInstrumentationInitialized) return;
  isInstrumentationInitialized = true;
  let schedule;
  let mounted = false;
  const scheduleSetup = () => {
    if (mounted) {
      return;
    }
    if (schedule) {
      cancelAnimationFrame(schedule);
    }
    schedule = requestAnimationFrame(() => {
      mounted = true;
      const host = getCanvasEl();
      if (host) {
        document.documentElement.appendChild(host);
      }
      setupToolbar();
    });
  };
  const instrumentation = createInstrumentation("react-scan-devtools-0.1.0", {
    onCommitStart: () => {
      var _a, _b;
      (_b = (_a = ReactScanInternals.options.value).onCommitStart) == null ? void 0 : _b.call(_a);
    },
    onActive: /* @__PURE__ */ (() => {
      let didActivate = false;
      return () => {
        if (hasStopped()) return;
        if (didActivate) return;
        didActivate = true;
        scheduleSetup();
        if (!window.__REACT_SCAN_EXTENSION__) {
          globalThis.__REACT_SCAN__ = {
            ReactScanInternals
          };
        }
        startReportInterval();
        logIntro();
      };
    })(),
    onError: () => {
    },
    isValidFiber,
    onRender: (fiber, renders) => {
      var _a, _b, _c, _d, _e2;
      if (be(fiber)) {
        (_b = (_a = Store).interactionListeningForRenders) == null ? void 0 : _b.call(_a, fiber, renders);
      }
      const isOverlayPaused = (_c = ReactScanInternals.instrumentation) == null ? void 0 : _c.isPaused.value;
      const isInspectorInactive = Store.inspectState.value.kind === "inspect-off" || Store.inspectState.value.kind === "uninitialized";
      const shouldFullyAbort = isOverlayPaused && isInspectorInactive;
      if (shouldFullyAbort) {
        return;
      }
      if (!isOverlayPaused) {
        outlineFiber(fiber);
      }
      if (ReactScanInternals.options.value.log) {
        log(renders);
      }
      if (Store.inspectState.value.kind === "focused") {
        inspectorUpdateSignal.value = Date.now();
      }
      if (!isInspectorInactive) {
        reportRenderToListeners(fiber);
      }
      (_e2 = (_d = ReactScanInternals.options.value).onRender) == null ? void 0 : _e2.call(_d, fiber, renders);
    },
    onCommitFinish: () => {
      var _a, _b;
      scheduleSetup();
      (_b = (_a = ReactScanInternals.options.value).onCommitFinish) == null ? void 0 : _b.call(_a);
    },
    onPostCommitFiberRoot() {
      scheduleSetup();
    },
    trackChanges: false
  });
  ReactScanInternals.instrumentation = instrumentation;
};
var styles_default = `/*! tailwindcss v4.2.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --color-red-300: oklch(80.8% 0.114 19.571);
    --color-red-400: oklch(70.4% 0.191 22.216);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-950: oklch(25.8% 0.092 26.042);
    --color-yellow-300: oklch(90.5% 0.182 98.111);
    --color-yellow-500: oklch(79.5% 0.184 86.047);
    --color-green-500: oklch(72.3% 0.219 149.579);
    --color-purple-400: oklch(71.4% 0.203 305.504);
    --color-purple-500: oklch(62.7% 0.265 303.9);
    --color-purple-800: oklch(43.8% 0.218 303.724);
    --color-gray-100: oklch(96.7% 0.003 264.542);
    --color-gray-300: oklch(87.2% 0.01 258.338);
    --color-gray-400: oklch(70.7% 0.022 261.325);
    --color-gray-500: oklch(55.1% 0.027 264.364);
    --color-zinc-200: oklch(92% 0.004 286.32);
    --color-zinc-400: oklch(70.5% 0.015 286.067);
    --color-zinc-500: oklch(55.2% 0.016 285.938);
    --color-zinc-600: oklch(44.2% 0.017 285.786);
    --color-zinc-700: oklch(37% 0.013 285.805);
    --color-zinc-800: oklch(27.4% 0.006 286.033);
    --color-zinc-900: oklch(21% 0.006 285.885);
    --color-neutral-300: oklch(87% 0 0);
    --color-neutral-400: oklch(70.8% 0 0);
    --color-neutral-500: oklch(55.6% 0 0);
    --color-neutral-700: oklch(37.1% 0 0);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 4px;
    --container-md: 448px;
    --text-xs: 12px;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 14px;
    --text-sm--line-height: calc(1.25 / 0.875);
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --tracking-wide: 0.025em;
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --blur-sm: 8px;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
      -o-tab-size: 4;
         tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
    font-feature-settings: normal;
    font-variation-settings: normal;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::-moz-placeholder {
    opacity: 1;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::-moz-placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    -webkit-appearance: button;
       -moz-appearance: button;
            appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-auto {
    pointer-events: auto;
  }
  .pointer-events-bounding-box {
    pointer-events: bounding-box;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .collapse {
    visibility: collapse;
  }
  .visible {
    visibility: visible;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .static {
    position: static;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0);
  }
  .inset-x-1 {
    inset-inline: calc(var(--spacing) * 1);
  }
  .inset-y-0 {
    inset-block: calc(var(--spacing) * 0);
  }
  .start {
    inset-inline-start: var(--spacing);
  }
  .end {
    inset-inline-end: var(--spacing);
  }
  .-top-1 {
    top: calc(var(--spacing) * -1);
  }
  .-top-2\\.5 {
    top: calc(var(--spacing) * -2.5);
  }
  .top-0 {
    top: calc(var(--spacing) * 0);
  }
  .top-0\\.5 {
    top: calc(var(--spacing) * 0.5);
  }
  .top-1\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .top-2 {
    top: calc(var(--spacing) * 2);
  }
  .-right-1 {
    right: calc(var(--spacing) * -1);
  }
  .-right-2\\.5 {
    right: calc(var(--spacing) * -2.5);
  }
  .right-0 {
    right: calc(var(--spacing) * 0);
  }
  .right-0\\.5 {
    right: calc(var(--spacing) * 0.5);
  }
  .right-2 {
    right: calc(var(--spacing) * 2);
  }
  .right-4 {
    right: calc(var(--spacing) * 4);
  }
  .bottom-0 {
    bottom: calc(var(--spacing) * 0);
  }
  .bottom-4 {
    bottom: calc(var(--spacing) * 4);
  }
  .left-0 {
    left: calc(var(--spacing) * 0);
  }
  .left-3 {
    left: calc(var(--spacing) * 3);
  }
  .z-10 {
    z-index: 10;
  }
  .z-50 {
    z-index: 50;
  }
  .z-100 {
    z-index: 100;
  }
  .z-\\[214748365\\] {
    z-index: 214748365;
  }
  .z-\\[214748367\\] {
    z-index: 214748367;
  }
  .z-\\[124124124124\\] {
    z-index: 124124124124;
  }
  .container {
    width: 100%;
    @media (width >= 640px) {
      max-width: 640px;
    }
    @media (width >= 768px) {
      max-width: 768px;
    }
    @media (width >= 1024px) {
      max-width: 1024px;
    }
    @media (width >= 1280px) {
      max-width: 1280px;
    }
    @media (width >= 1536px) {
      max-width: 1536px;
    }
  }
  .m-\\[2px\\] {
    margin: 2px;
  }
  .mx-0\\.5 {
    margin-inline: calc(var(--spacing) * 0.5);
  }
  .mt-0\\.5 {
    margin-top: calc(var(--spacing) * 0.5);
  }
  .mt-1 {
    margin-top: calc(var(--spacing) * 1);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mr-0\\.5 {
    margin-right: calc(var(--spacing) * 0.5);
  }
  .mr-1 {
    margin-right: calc(var(--spacing) * 1);
  }
  .mr-1\\.5 {
    margin-right: calc(var(--spacing) * 1.5);
  }
  .mr-16 {
    margin-right: calc(var(--spacing) * 16);
  }
  .mr-auto {
    margin-right: auto;
  }
  .mb-1\\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4);
  }
  .mb-px {
    margin-bottom: 1px;
  }
  .\\!ml-0 {
    margin-left: calc(var(--spacing) * 0) !important;
  }
  .ml-1 {
    margin-left: calc(var(--spacing) * 1);
  }
  .ml-1\\.5 {
    margin-left: calc(var(--spacing) * 1.5);
  }
  .ml-auto {
    margin-left: auto;
  }
  .block {
    display: block;
  }
  .contents {
    display: contents;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .h-1 {
    height: calc(var(--spacing) * 1);
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-4\\/5 {
    height: calc(4 / 5 * 100%);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-\\[28px\\] {
    height: 28px;
  }
  .h-\\[48px\\] {
    height: 48px;
  }
  .h-\\[50px\\] {
    height: 50px;
  }
  .h-\\[150px\\] {
    height: 150px;
  }
  .h-\\[235px\\] {
    height: 235px;
  }
  .h-\\[calc\\(100\\%-25px\\)\\] {
    height: calc(100% - 25px);
  }
  .h-\\[calc\\(100\\%-40px\\)\\] {
    height: calc(100% - 40px);
  }
  .h-\\[calc\\(100\\%-48px\\)\\] {
    height: calc(100% - 48px);
  }
  .h-\\[calc\\(100\\%-150px\\)\\] {
    height: calc(100% - 150px);
  }
  .h-\\[calc\\(100\\%-200px\\)\\] {
    height: calc(100% - 200px);
  }
  .h-fit {
    height: -moz-fit-content;
    height: fit-content;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }
  .max-h-0 {
    max-height: calc(var(--spacing) * 0);
  }
  .max-h-9 {
    max-height: calc(var(--spacing) * 9);
  }
  .max-h-40 {
    max-height: calc(var(--spacing) * 40);
  }
  .min-h-9 {
    min-height: calc(var(--spacing) * 9);
  }
  .min-h-\\[48px\\] {
    min-height: 48px;
  }
  .min-h-fit {
    min-height: -moz-fit-content;
    min-height: fit-content;
  }
  .w-1 {
    width: calc(var(--spacing) * 1);
  }
  .w-1\\/2 {
    width: calc(1 / 2 * 100%);
  }
  .w-1\\/3 {
    width: calc(1 / 3 * 100%);
  }
  .w-2\\/4 {
    width: calc(2 / 4 * 100%);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-4\\/5 {
    width: calc(4 / 5 * 100%);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-80 {
    width: calc(var(--spacing) * 80);
  }
  .w-\\[20px\\] {
    width: 20px;
  }
  .w-\\[72px\\] {
    width: 72px;
  }
  .w-\\[90\\%\\] {
    width: 90%;
  }
  .w-\\[calc\\(100\\%-200px\\)\\] {
    width: calc(100% - 200px);
  }
  .w-fit {
    width: -moz-fit-content;
    width: fit-content;
  }
  .w-full {
    width: 100%;
  }
  .w-px {
    width: 1px;
  }
  .w-screen {
    width: 100vw;
  }
  .max-w-md {
    max-width: var(--container-md);
  }
  .min-w-0 {
    min-width: calc(var(--spacing) * 0);
  }
  .min-w-\\[200px\\] {
    min-width: 200px;
  }
  .min-w-fit {
    min-width: -moz-fit-content;
    min-width: fit-content;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .grow {
    flex-grow: 1;
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-\\[200\\%\\] {
    --tw-translate-y: calc(200% * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-0 {
    --tw-translate-y: calc(var(--spacing) * 0);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .scale-110 {
    --tw-scale-x: 110%;
    --tw-scale-y: 110%;
    --tw-scale-z: 110%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .-rotate-90 {
    rotate: calc(90deg * -1);
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .rotate-180 {
    rotate: 180deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .animate-fade-in {
    animation: fadeIn ease-in forwards;
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-e-resize {
    cursor: e-resize;
  }
  .cursor-ew-resize {
    cursor: ew-resize;
  }
  .cursor-ew-resize {
    cursor: ew-resize;
  }
  .cursor-move {
    cursor: move;
  }
  .cursor-move {
    cursor: move;
  }
  .cursor-nesw-resize {
    cursor: nesw-resize;
  }
  .cursor-nesw-resize {
    cursor: nesw-resize;
  }
  .cursor-ns-resize {
    cursor: ns-resize;
  }
  .cursor-ns-resize {
    cursor: ns-resize;
  }
  .cursor-nwse-resize {
    cursor: nwse-resize;
  }
  .cursor-nwse-resize {
    cursor: nwse-resize;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-w-resize {
    cursor: w-resize;
  }
  .\\[touch-action\\:none\\] {
    touch-action: none;
  }
  .resize {
    resize: both;
  }
  .flex-col {
    flex-direction: column;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .gap-0\\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-1 {
    gap: calc(var(--spacing) * 1);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .space-y-1\\.5 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .gap-x-0\\.5 {
    -moz-column-gap: calc(var(--spacing) * 0.5);
         column-gap: calc(var(--spacing) * 0.5);
  }
  .gap-x-1 {
    -moz-column-gap: calc(var(--spacing) * 1);
         column-gap: calc(var(--spacing) * 1);
  }
  .gap-x-1\\.5 {
    -moz-column-gap: calc(var(--spacing) * 1.5);
         column-gap: calc(var(--spacing) * 1.5);
  }
  .gap-x-2 {
    -moz-column-gap: calc(var(--spacing) * 2);
         column-gap: calc(var(--spacing) * 2);
  }
  .gap-x-3 {
    -moz-column-gap: calc(var(--spacing) * 3);
         column-gap: calc(var(--spacing) * 3);
  }
  .gap-x-4 {
    -moz-column-gap: calc(var(--spacing) * 4);
         column-gap: calc(var(--spacing) * 4);
  }
  .gap-y-0\\.5 {
    row-gap: calc(var(--spacing) * 0.5);
  }
  .gap-y-1 {
    row-gap: calc(var(--spacing) * 1);
  }
  .gap-y-2 {
    row-gap: calc(var(--spacing) * 2);
  }
  .gap-y-4 {
    row-gap: calc(var(--spacing) * 4);
  }
  .divide-y {
    :where(& > :not(:last-child)) {
      --tw-divide-y-reverse: 0;
      border-bottom-style: var(--tw-border-style);
      border-top-style: var(--tw-border-style);
      border-top-width: calc(1px * var(--tw-divide-y-reverse));
      border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    }
  }
  .divide-zinc-800 {
    :where(& > :not(:last-child)) {
      border-color: var(--color-zinc-800);
    }
  }
  .place-self-center {
    place-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .\\!overflow-visible {
    overflow: visible !important;
  }
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 4px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-sm {
    border-radius: var(--radius-sm);
  }
  .rounded-t-lg {
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
  }
  .rounded-t-sm {
    border-top-left-radius: var(--radius-sm);
    border-top-right-radius: var(--radius-sm);
  }
  .rounded-l-md {
    border-top-left-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
  }
  .rounded-l-sm {
    border-top-left-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
  }
  .rounded-tl-lg {
    border-top-left-radius: var(--radius-lg);
  }
  .rounded-r-md {
    border-top-right-radius: var(--radius-md);
    border-bottom-right-radius: var(--radius-md);
  }
  .rounded-r-sm {
    border-top-right-radius: var(--radius-sm);
    border-bottom-right-radius: var(--radius-sm);
  }
  .rounded-tr-lg {
    border-top-right-radius: var(--radius-lg);
  }
  .rounded-br-lg {
    border-bottom-right-radius: var(--radius-lg);
  }
  .rounded-bl-lg {
    border-bottom-left-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-4 {
    border-style: var(--tw-border-style);
    border-width: 4px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-r {
    border-right-style: var(--tw-border-style);
    border-right-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-l {
    border-left-style: var(--tw-border-style);
    border-left-width: 1px;
  }
  .border-l-0 {
    border-left-style: var(--tw-border-style);
    border-left-width: 0px;
  }
  .border-l-1 {
    border-left-style: var(--tw-border-style);
    border-left-width: 1px;
  }
  .border-none {
    --tw-border-style: none;
    border-style: none;
  }
  .\\!border-red-500 {
    border-color: var(--color-red-500) !important;
  }
  .border-\\[\\#1e1e1e\\] {
    border-color: #1e1e1e;
  }
  .border-\\[\\#222\\] {
    border-color: #222;
  }
  .border-\\[\\#333\\] {
    border-color: #333;
  }
  .border-\\[\\#27272A\\] {
    border-color: #27272A;
  }
  .border-transparent {
    border-color: transparent;
  }
  .border-zinc-800 {
    border-color: var(--color-zinc-800);
  }
  .bg-\\[\\#0A0A0A\\] {
    background-color: #0A0A0A;
  }
  .bg-\\[\\#1D3A66\\] {
    background-color: #1D3A66;
  }
  .bg-\\[\\#1E1E1E\\] {
    background-color: #1E1E1E;
  }
  .bg-\\[\\#1a2a1a\\] {
    background-color: #1a2a1a;
  }
  .bg-\\[\\#1e1e1e\\] {
    background-color: #1e1e1e;
  }
  .bg-\\[\\#2a1515\\] {
    background-color: #2a1515;
  }
  .bg-\\[\\#4b4b4b\\] {
    background-color: #4b4b4b;
  }
  .bg-\\[\\#5f3f9a\\] {
    background-color: #5f3f9a;
  }
  .bg-\\[\\#5f3f9a\\]\\/40 {
    background-color: color-mix(in oklab, #5f3f9a 40%, transparent);
  }
  .bg-\\[\\#6a369e\\] {
    background-color: #6a369e;
  }
  .bg-\\[\\#8e61e3\\] {
    background-color: #8e61e3;
  }
  .bg-\\[\\#7521c8\\] {
    background-color: #7521c8;
  }
  .bg-\\[\\#18181B\\] {
    background-color: #18181B;
  }
  .bg-\\[\\#18181B\\]\\/50 {
    background-color: color-mix(in oklab, #18181B 50%, transparent);
  }
  .bg-\\[\\#27272A\\] {
    background-color: #27272A;
  }
  .bg-\\[\\#44444a\\] {
    background-color: #44444a;
  }
  .bg-\\[\\#141414\\] {
    background-color: #141414;
  }
  .bg-\\[\\#214379d4\\] {
    background-color: #214379d4;
  }
  .bg-\\[\\#412162\\] {
    background-color: #412162;
  }
  .bg-\\[\\#EFD81A\\] {
    background-color: #EFD81A;
  }
  .bg-\\[\\#b77116\\] {
    background-color: #b77116;
  }
  .bg-\\[\\#b94040\\] {
    background-color: #b94040;
  }
  .bg-\\[\\#d36cff\\] {
    background-color: #d36cff;
  }
  .bg-\\[\\#efd81a6b\\] {
    background-color: #efd81a6b;
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-black\\/40 {
    background-color: color-mix(in srgb, #000 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 40%, transparent);
    }
  }
  .bg-green-500\\/50 {
    background-color: color-mix(in srgb, oklch(72.3% 0.219 149.579) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-green-500) 50%, transparent);
    }
  }
  .bg-green-500\\/60 {
    background-color: color-mix(in srgb, oklch(72.3% 0.219 149.579) 60%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-green-500) 60%, transparent);
    }
  }
  .bg-neutral-700 {
    background-color: var(--color-neutral-700);
  }
  .bg-purple-500 {
    background-color: var(--color-purple-500);
  }
  .bg-purple-500\\/90 {
    background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-purple-500) 90%, transparent);
    }
  }
  .bg-purple-800 {
    background-color: var(--color-purple-800);
  }
  .bg-red-500 {
    background-color: var(--color-red-500);
  }
  .bg-red-500\\/90 {
    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-500) 90%, transparent);
    }
  }
  .bg-red-950\\/50 {
    background-color: color-mix(in srgb, oklch(25.8% 0.092 26.042) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-950) 50%, transparent);
    }
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-yellow-300 {
    background-color: var(--color-yellow-300);
  }
  .bg-zinc-800 {
    background-color: var(--color-zinc-800);
  }
  .bg-zinc-900\\/30 {
    background-color: color-mix(in srgb, oklch(21% 0.006 285.885) 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-zinc-900) 30%, transparent);
    }
  }
  .bg-zinc-900\\/50 {
    background-color: color-mix(in srgb, oklch(21% 0.006 285.885) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-zinc-900) 50%, transparent);
    }
  }
  .p-0 {
    padding: calc(var(--spacing) * 0);
  }
  .p-1 {
    padding: calc(var(--spacing) * 1);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-3 {
    padding: calc(var(--spacing) * 3);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-5 {
    padding: calc(var(--spacing) * 5);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .px-1 {
    padding-inline: calc(var(--spacing) * 1);
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1 {
    padding-block: calc(var(--spacing) * 1);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-\\[1px\\] {
    padding-block: 1px;
  }
  .py-\\[3px\\] {
    padding-block: 3px;
  }
  .py-\\[5px\\] {
    padding-block: 5px;
  }
  .pt-0 {
    padding-top: calc(var(--spacing) * 0);
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
  }
  .pr-1 {
    padding-right: calc(var(--spacing) * 1);
  }
  .pr-1\\.5 {
    padding-right: calc(var(--spacing) * 1.5);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-2\\.5 {
    padding-right: calc(var(--spacing) * 2.5);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing) * 2);
  }
  .pl-1 {
    padding-left: calc(var(--spacing) * 1);
  }
  .pl-2 {
    padding-left: calc(var(--spacing) * 2);
  }
  .pl-2\\.5 {
    padding-left: calc(var(--spacing) * 2.5);
  }
  .pl-3 {
    padding-left: calc(var(--spacing) * 3);
  }
  .pl-5 {
    padding-left: calc(var(--spacing) * 5);
  }
  .pl-6 {
    padding-left: calc(var(--spacing) * 6);
  }
  .text-left {
    text-align: left;
  }
  .font-mono {
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\[8px\\] {
    font-size: 8px;
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .text-\\[11px\\] {
    font-size: 11px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[14px\\] {
    font-size: 14px;
  }
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .leading-6 {
    --tw-leading: calc(var(--spacing) * 6);
    line-height: calc(var(--spacing) * 6);
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide);
    letter-spacing: var(--tracking-wide);
  }
  .text-wrap {
    text-wrap: wrap;
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .break-all {
    word-break: break-all;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
  .text-\\[\\#4ade80\\] {
    color: #4ade80;
  }
  .text-\\[\\#5a5a5a\\] {
    color: #5a5a5a;
  }
  .text-\\[\\#6E6E77\\] {
    color: #6E6E77;
  }
  .text-\\[\\#6F6F78\\] {
    color: #6F6F78;
  }
  .text-\\[\\#8E61E3\\] {
    color: #8E61E3;
  }
  .text-\\[\\#666\\] {
    color: #666;
  }
  .text-\\[\\#888\\] {
    color: #888;
  }
  .text-\\[\\#999\\] {
    color: #999;
  }
  .text-\\[\\#7346a0\\] {
    color: #7346a0;
  }
  .text-\\[\\#65656D\\] {
    color: #65656D;
  }
  .text-\\[\\#737373\\] {
    color: #737373;
  }
  .text-\\[\\#A1A1AA\\] {
    color: #A1A1AA;
  }
  .text-\\[\\#A855F7\\] {
    color: #A855F7;
  }
  .text-\\[\\#E4E4E7\\] {
    color: #E4E4E7;
  }
  .text-\\[\\#d36cff\\] {
    color: #d36cff;
  }
  .text-\\[\\#f87171\\] {
    color: #f87171;
  }
  .text-black {
    color: var(--color-black);
  }
  .text-gray-100 {
    color: var(--color-gray-100);
  }
  .text-gray-300 {
    color: var(--color-gray-300);
  }
  .text-gray-400 {
    color: var(--color-gray-400);
  }
  .text-gray-500 {
    color: var(--color-gray-500);
  }
  .text-green-500 {
    color: var(--color-green-500);
  }
  .text-neutral-300 {
    color: var(--color-neutral-300);
  }
  .text-neutral-400 {
    color: var(--color-neutral-400);
  }
  .text-neutral-500 {
    color: var(--color-neutral-500);
  }
  .text-purple-400 {
    color: var(--color-purple-400);
  }
  .text-red-300 {
    color: var(--color-red-300);
  }
  .text-red-400 {
    color: var(--color-red-400);
  }
  .text-red-500 {
    color: var(--color-red-500);
  }
  .text-white {
    color: var(--color-white);
  }
  .text-white\\/30 {
    color: color-mix(in srgb, #fff 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--color-white) 30%, transparent);
    }
  }
  .text-white\\/70 {
    color: color-mix(in srgb, #fff 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--color-white) 70%, transparent);
    }
  }
  .text-yellow-300 {
    color: var(--color-yellow-300);
  }
  .text-yellow-500 {
    color: var(--color-yellow-500);
  }
  .text-zinc-200 {
    color: var(--color-zinc-200);
  }
  .text-zinc-400 {
    color: var(--color-zinc-400);
  }
  .text-zinc-500 {
    color: var(--color-zinc-500);
  }
  .text-zinc-600 {
    color: var(--color-zinc-600);
  }
  .uppercase {
    text-transform: uppercase;
  }
  .italic {
    font-style: italic;
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-white\\/\\[0\\.08\\] {
    --tw-ring-color: color-mix(in srgb, #fff 8%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-white) 8%, transparent);
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .backdrop-blur-sm {
    --tw-backdrop-blur: blur(var(--blur-sm));
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[border-radius\\] {
    transition-property: border-radius;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[color\\,transform\\] {
    transition-property: color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[max-height\\] {
    transition-property: max-height;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\] {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-none {
    transition-property: none;
  }
  .delay-0 {
    transition-delay: 0ms;
  }
  .delay-150 {
    transition-delay: 150ms;
  }
  .delay-300 {
    transition-delay: 300ms;
  }
  .\\!duration-0 {
    --tw-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
  .duration-0 {
    --tw-duration: 0ms;
    transition-duration: 0ms;
  }
  .duration-120 {
    --tw-duration: 120ms;
    transition-duration: 120ms;
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .ease-\\[cubic-bezier\\(0\\.25\\,0\\.1\\,0\\.25\\,1\\)\\] {
    --tw-ease: cubic-bezier(0.25,0.1,0.25,1);
    transition-timing-function: cubic-bezier(0.25,0.1,0.25,1);
  }
  .ease-in {
    --tw-ease: var(--ease-in);
    transition-timing-function: var(--ease-in);
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .will-change-transform {
    will-change: transform;
  }
  .select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
         user-select: none;
  }
  .animation-delay-0 {
    animation-delay: 0s;
  }
  .animation-delay-100 {
    animation-delay: .1s;
  }
  .animation-delay-150 {
    animation-delay: .15s;
  }
  .animation-delay-200 {
    animation-delay: .2s;
  }
  .animation-delay-300 {
    animation-delay: .3s;
  }
  .animation-delay-500 {
    animation-delay: .5s;
  }
  .animation-delay-700 {
    animation-delay: .7s;
  }
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  .animation-duration-0 {
    animation-duration: 0s;
  }
  .animation-duration-100 {
    animation-duration: .1s;
  }
  .animation-duration-200 {
    animation-duration: .2s;
  }
  .animation-duration-300 {
    animation-duration: .3s;
  }
  .animation-duration-500 {
    animation-duration: .5s;
  }
  .animation-duration-700 {
    animation-duration: .7s;
  }
  .animation-duration-1000 {
    animation-duration: 1s;
  }
  .group-hover\\:bg-\\[\\#5b2d89\\] {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        background-color: #5b2d89;
      }
    }
  }
  .group-hover\\:bg-\\[\\#6a6a6a\\] {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        background-color: #6a6a6a;
      }
    }
  }
  .group-hover\\:bg-\\[\\#21437982\\] {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        background-color: #21437982;
      }
    }
  }
  .group-hover\\:bg-\\[\\#efda1a2f\\] {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        background-color: #efda1a2f;
      }
    }
  }
  .group-hover\\:opacity-100 {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .peer-hover\\/bottom\\:rounded-b-none {
    &:is(:where(.peer\\/bottom):hover ~ *) {
      @media (hover: hover) {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .peer-hover\\/left\\:rounded-l-none {
    &:is(:where(.peer\\/left):hover ~ *) {
      @media (hover: hover) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .peer-hover\\/right\\:rounded-r-none {
    &:is(:where(.peer\\/right):hover ~ *) {
      @media (hover: hover) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
  .peer-hover\\/top\\:rounded-t-none {
    &:is(:where(.peer\\/top):hover ~ *) {
      @media (hover: hover) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
  .after\\:absolute {
    &::after {
      content: var(--tw-content);
      position: absolute;
    }
  }
  .after\\:inset-0 {
    &::after {
      content: var(--tw-content);
      inset: calc(var(--spacing) * 0);
    }
  }
  .after\\:top-\\[100\\%\\] {
    &::after {
      content: var(--tw-content);
      top: 100%;
    }
  }
  .after\\:left-1\\/2 {
    &::after {
      content: var(--tw-content);
      left: calc(1 / 2 * 100%);
    }
  }
  .after\\:h-\\[6px\\] {
    &::after {
      content: var(--tw-content);
      height: 6px;
    }
  }
  .after\\:w-\\[10px\\] {
    &::after {
      content: var(--tw-content);
      width: 10px;
    }
  }
  .after\\:-translate-x-1\\/2 {
    &::after {
      content: var(--tw-content);
      --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .after\\:animate-\\[fadeOut_1s_ease-out_forwards\\] {
    &::after {
      content: var(--tw-content);
      animation: fadeOut 1s ease-out forwards;
    }
  }
  .after\\:border-t-\\[6px\\] {
    &::after {
      content: var(--tw-content);
      border-top-style: var(--tw-border-style);
      border-top-width: 6px;
    }
  }
  .after\\:border-r-\\[5px\\] {
    &::after {
      content: var(--tw-content);
      border-right-style: var(--tw-border-style);
      border-right-width: 5px;
    }
  }
  .after\\:border-l-\\[5px\\] {
    &::after {
      content: var(--tw-content);
      border-left-style: var(--tw-border-style);
      border-left-width: 5px;
    }
  }
  .after\\:border-t-white {
    &::after {
      content: var(--tw-content);
      border-top-color: var(--color-white);
    }
  }
  .after\\:border-r-transparent {
    &::after {
      content: var(--tw-content);
      border-right-color: transparent;
    }
  }
  .after\\:border-l-transparent {
    &::after {
      content: var(--tw-content);
      border-left-color: transparent;
    }
  }
  .after\\:bg-purple-500\\/30 {
    &::after {
      content: var(--tw-content);
      background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-purple-500) 30%, transparent);
      }
    }
  }
  .after\\:content-\\[\\"\\"\\] {
    &::after {
      --tw-content: "";
      content: var(--tw-content);
    }
  }
  .focus-within\\:border-\\[\\#454545\\] {
    &:focus-within {
      border-color: #454545;
    }
  }
  .hover\\:bg-\\[\\#0f0f0f\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #0f0f0f;
      }
    }
  }
  .hover\\:bg-\\[\\#5f3f9a\\]\\/20 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in oklab, #5f3f9a 20%, transparent);
      }
    }
  }
  .hover\\:bg-\\[\\#5f3f9a\\]\\/40 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in oklab, #5f3f9a 40%, transparent);
      }
    }
  }
  .hover\\:bg-\\[\\#18181B\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #18181B;
      }
    }
  }
  .hover\\:bg-\\[\\#34343b\\] {
    &:hover {
      @media (hover: hover) {
        background-color: #34343b;
      }
    }
  }
  .hover\\:bg-red-600 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-red-600);
      }
    }
  }
  .hover\\:bg-zinc-700 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-zinc-700);
      }
    }
  }
  .hover\\:bg-zinc-800\\/50 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, oklch(27.4% 0.006 286.033) 50%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-zinc-800) 50%, transparent);
        }
      }
    }
  }
  .hover\\:text-neutral-300 {
    &:hover {
      @media (hover: hover) {
        color: var(--color-neutral-300);
      }
    }
  }
  .hover\\:text-white {
    &:hover {
      @media (hover: hover) {
        color: var(--color-white);
      }
    }
  }
}
* {
  outline: none !important;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}
@-moz-document url-prefix() {
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
    scrollbar-width: 6px;
  }
}
button {
  &:hover {
    @media (hover: hover) {
      background-image: none;
    }
  }
  --tw-outline-style: none;
  outline-style: none;
  --tw-border-style: none;
  border-style: none;
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-ease: var(--ease-out);
  transition-timing-function: var(--ease-out);
  cursor: pointer;
}
input {
  --tw-outline-style: none;
  outline-style: none;
  --tw-border-style: none;
  border-style: none;
  background-color: transparent;
  background-image: none;
  &::-moz-placeholder {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  &::placeholder {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  &::-moz-placeholder {
    color: var(--color-neutral-500);
  }
  &::placeholder {
    color: var(--color-neutral-500);
  }
  &::-moz-placeholder {
    font-style: italic;
  }
  &::placeholder {
    font-style: italic;
  }
  &:-moz-placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:placeholder-shown {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
svg {
  height: auto;
  width: auto;
  pointer-events: none;
}
.with-data-text {
  overflow: hidden;
  &::before {
    content: attr(data-text);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
#react-scan-toolbar {
  position: fixed;
  top: calc(var(--spacing) * 0);
  left: calc(var(--spacing) * 0);
  display: flex;
  flex-direction: column;
  --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  font-size: 13px;
  color: var(--color-white);
  background-color: var(--color-black);
  -webkit-user-select: none;
  -moz-user-select: none;
       user-select: none;
  cursor: move;
  opacity: 0%;
  z-index: 2147483678;
  animation: fadeIn ease-in forwards;
  animation-delay: .3s;
  animation-duration: .3s;
  --tw-shadow: 0 4px 12px var(--tw-shadow-color, rgba(0,0,0,0.2));
  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  place-self: start;
  will-change: transform;
  backface-visibility: hidden;
}
#react-scan-toolbar pre,
#react-scan-toolbar textarea,
#react-scan-toolbar input[type='text'],
#react-scan-toolbar input[type='search'],
#react-scan-toolbar [data-react-scan-selectable] {
  -webkit-user-select: text;
  -moz-user-select: text;
       user-select: text;
  cursor: text;
}
.button {
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
}
.resize-line-wrapper {
  position: absolute;
  overflow: hidden;
}
.resize-line {
  position: absolute;
  inset: calc(var(--spacing) * 0);
  overflow: hidden;
  background-color: var(--color-black);
  transition-property: all;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  svg {
    position: absolute;
    top: calc(1 / 2 * 100%);
    left: calc(1 / 2 * 100%);
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.resize-right,
.resize-left {
  inset-block: calc(var(--spacing) * 0);
  width: calc(var(--spacing) * 6);
  cursor: ew-resize;
  .resize-line-wrapper {
    inset-block: calc(var(--spacing) * 0);
    width: calc(1 / 2 * 100%);
  }
  &:hover {
    .resize-line {
      --tw-translate-x: calc(var(--spacing) * 0);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
}
.resize-right {
  right: calc(var(--spacing) * 0);
  --tw-translate-x: calc(1 / 2 * 100%);
  translate: var(--tw-translate-x) var(--tw-translate-y);
  .resize-line-wrapper {
    right: calc(var(--spacing) * 0);
  }
  .resize-line {
    border-top-right-radius: var(--radius-lg);
    border-bottom-right-radius: var(--radius-lg);
    --tw-translate-x: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.resize-left {
  left: calc(var(--spacing) * 0);
  --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
  .resize-line-wrapper {
    left: calc(var(--spacing) * 0);
  }
  .resize-line {
    border-top-left-radius: var(--radius-lg);
    border-bottom-left-radius: var(--radius-lg);
    --tw-translate-x: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.resize-top,
.resize-bottom {
  inset-inline: calc(var(--spacing) * 0);
  height: calc(var(--spacing) * 6);
  cursor: ns-resize;
  .resize-line-wrapper {
    inset-inline: calc(var(--spacing) * 0);
    height: calc(1 / 2 * 100%);
  }
  &:hover {
    .resize-line {
      --tw-translate-y: calc(var(--spacing) * 0);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
}
.resize-top {
  top: calc(var(--spacing) * 0);
  --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
  .resize-line-wrapper {
    top: calc(var(--spacing) * 0);
  }
  .resize-line {
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    --tw-translate-y: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.resize-bottom {
  bottom: calc(var(--spacing) * 0);
  --tw-translate-y: calc(1 / 2 * 100%);
  translate: var(--tw-translate-x) var(--tw-translate-y);
  .resize-line-wrapper {
    bottom: calc(var(--spacing) * 0);
  }
  .resize-line {
    border-bottom-right-radius: var(--radius-lg);
    border-bottom-left-radius: var(--radius-lg);
    --tw-translate-y: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.react-scan-header {
  display: flex;
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 2);
       column-gap: calc(var(--spacing) * 2);
  padding-right: calc(var(--spacing) * 2);
  padding-left: calc(var(--spacing) * 3);
  min-height: calc(var(--spacing) * 9);
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
  border-color: #222;
  overflow: hidden;
  white-space: nowrap;
}
.react-scan-replay-button,
.react-scan-close-button {
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1);
  min-width: -moz-fit-content;
  min-width: fit-content;
  border-radius: 4px;
  transition-property: all;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-duration: 300ms;
  transition-duration: 300ms;
}
.react-scan-replay-button {
  position: relative;
  overflow: hidden;
  background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 50%, transparent) !important;
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-purple-500) 50%, transparent) !important;
  }
  &:hover {
    background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 25%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-purple-500) 25%, transparent);
    }
  }
  &.disabled {
    opacity: 50%;
    pointer-events: none;
  }
  &:before {
    content: "";
    position: absolute;
    inset: calc(var(--spacing) * 0);
    --tw-translate-x: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
    animation: shimmer 2s infinite;
    background: linear-gradient(
      to right,
      transparent,
      rgba(142, 97, 227, 0.3),
      transparent
    );
  }
}
.react-scan-close-button {
  background-color: color-mix(in srgb, #fff 10%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
  }
  &:hover {
    background-color: color-mix(in srgb, #fff 15%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 15%, transparent);
    }
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
.react-section-header {
  position: sticky;
  z-index: 100;
  display: flex;
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 2);
       column-gap: calc(var(--spacing) * 2);
  padding-inline: calc(var(--spacing) * 3);
  height: calc(var(--spacing) * 7);
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #888;
  border-bottom-style: var(--tw-border-style);
  border-bottom-width: 1px;
  border-color: #222;
  background-color: #0a0a0a;
}
.react-scan-section {
  display: flex;
  flex-direction: column;
  padding-inline: calc(var(--spacing) * 2);
  color: #888;
  &::before {
    content: var(--tw-content);
    color: var(--color-gray-500);
  }
  &::before {
    --tw-content: attr(data-section);
    content: var(--tw-content);
  }
  font-size: var(--text-xs);
  line-height: var(--tw-leading, var(--text-xs--line-height));
  > .react-scan-property {
    margin-left: calc(14px * -1);
  }
}
.react-scan-property {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: calc(var(--spacing) * 8);
  border-left-style: var(--tw-border-style);
  border-left-width: 1px;
  border-color: transparent;
  overflow: hidden;
}
.react-scan-property-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(var(--spacing) * 7);
  max-width: 100%;
  overflow: hidden;
}
.react-scan-string {
  color: #9ecbff;
}
.react-scan-number {
  color: #79c7ff;
}
.react-scan-boolean {
  color: #56b6c2;
}
.react-scan-key {
  width: -moz-fit-content;
  width: fit-content;
  max-width: calc(var(--spacing) * 60);
  white-space: nowrap;
  color: var(--color-white);
}
.react-scan-input {
  color: var(--color-white);
  background-color: var(--color-black);
}
@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.react-scan-arrow {
  position: absolute;
  top: calc(var(--spacing) * 0);
  left: calc(var(--spacing) * 7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: calc(var(--spacing) * 7);
  width: calc(var(--spacing) * 6);
  --tw-translate-x: -100%;
  translate: var(--tw-translate-x) var(--tw-translate-y);
  z-index: 10;
  > svg {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
}
.react-scan-nested {
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: calc(var(--spacing) * 0);
    left: calc(var(--spacing) * 0);
    height: 100%;
    width: 1px;
    background-color: color-mix(in srgb, oklch(55.1% 0.027 264.364) 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-gray-500) 30%, transparent);
    }
  }
}
.react-scan-settings {
  position: absolute;
  inset: calc(var(--spacing) * 0);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 2);
  color: #888;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
}
.react-scan-preview-line {
  position: relative;
  display: flex;
  min-height: calc(var(--spacing) * 7);
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 2);
       column-gap: calc(var(--spacing) * 2);
}
.react-scan-flash-overlay {
  position: absolute;
  inset: calc(var(--spacing) * 0);
  opacity: 0%;
  z-index: 50;
  pointer-events: none;
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  mix-blend-mode: multiply;
  background-color: color-mix(in srgb, oklch(62.7% 0.265 303.9) 90%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-purple-500) 90%, transparent);
  }
}
.react-scan-toggle {
  position: relative;
  display: inline-flex;
  height: calc(var(--spacing) * 6);
  width: calc(var(--spacing) * 10);
  input {
    position: absolute;
    inset: calc(var(--spacing) * 0);
    z-index: 20;
    opacity: 0%;
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  input:checked {
    + div {
      background-color: #5f3f9a;
      &::before {
        --tw-translate-x: 100%;
        translate: var(--tw-translate-x) var(--tw-translate-y);
        left: auto;
        border-color: #5f3f9a;
      }
    }
  }
  > div {
    position: absolute;
    inset: calc(var(--spacing) * 1);
    background-color: var(--color-neutral-700);
    border-radius: calc(infinity * 1px);
    pointer-events: none;
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
    --tw-duration: 300ms;
    transition-duration: 300ms;
    &:before {
      --tw-content: '';
      content: var(--tw-content);
      position: absolute;
      top: calc(1 / 2 * 100%);
      left: calc(var(--spacing) * 0);
      --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
      height: calc(var(--spacing) * 4);
      width: calc(var(--spacing) * 4);
      background-color: var(--color-white);
      border-style: var(--tw-border-style);
      border-width: 2px;
      border-color: var(--color-neutral-700);
      border-radius: calc(infinity * 1px);
      --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      transition-property: all;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
      --tw-duration: 300ms;
      transition-duration: 300ms;
    }
  }
}
.react-scan-flash-active {
  opacity: 40%;
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-duration: 300ms;
  transition-duration: 300ms;
}
.react-scan-inspector-overlay {
  display: flex;
  flex-direction: column;
  opacity: 0%;
  transition-property: opacity;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-duration: 200ms;
  transition-duration: 200ms;
  --tw-ease: var(--ease-out);
  transition-timing-function: var(--ease-out);
  will-change: opacity;
  &.fade-out {
    opacity: 0%;
  }
  &.fade-in {
    opacity: 100%;
  }
}
.react-scan-what-changed {
  ul {
    list-style-type: disc;
    padding-left: calc(var(--spacing) * 4);
  }
  li {
    white-space: nowrap;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      -moz-column-gap: calc(var(--spacing) * 2);
           column-gap: calc(var(--spacing) * 2);
    }
  }
}
.count-badge {
  display: flex;
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 2);
       column-gap: calc(var(--spacing) * 2);
  padding-inline: calc(var(--spacing) * 1.5);
  padding-block: calc(var(--spacing) * 0.5);
  border-radius: 4px;
  font-size: var(--text-xs);
  line-height: var(--tw-leading, var(--text-xs--line-height));
  --tw-font-weight: var(--font-weight-medium);
  font-weight: var(--font-weight-medium);
  color: #a855f7;
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  background-color: color-mix(in oklab, #a855f7 10%, transparent);
  transform-origin: center;
  transition-property: all;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  transition-delay: 150ms;
  --tw-duration: 300ms;
  transition-duration: 300ms;
}
.count-flash {
  animation: countFlash .3s ease-out forwards;
}
.count-flash-white {
  animation: countFlashShake .3s ease-out forwards;
  transition-delay: 500ms !important;
}
.change-scope {
  display: flex;
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 1);
       column-gap: calc(var(--spacing) * 1);
  color: #666;
  font-size: var(--text-xs);
  line-height: var(--tw-leading, var(--text-xs--line-height));
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  > div {
    padding-inline: calc(var(--spacing) * 1.5);
    padding-block: calc(var(--spacing) * 0.5);
    border-radius: 4px;
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
    transform-origin: center;
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
    transition-delay: 150ms;
    --tw-duration: 300ms;
    transition-duration: 300ms;
    &[data-flash="true"] {
      background-color: color-mix(in oklab, #a855f7 10%, transparent);
      color: #a855f7;
    }
  }
}
.react-scan-slider {
  position: relative;
  min-height: calc(var(--spacing) * 6);
  > input {
    position: absolute;
    inset: calc(var(--spacing) * 0);
    opacity: 0%;
  }
  &:before {
    --tw-content: '';
    content: var(--tw-content);
    position: absolute;
    inset-inline: calc(var(--spacing) * 0);
    top: calc(1 / 2 * 100%);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    height: calc(var(--spacing) * 1.5);
    background-color: color-mix(in oklab, #8e61e3 40%, transparent);
    border-radius: var(--radius-lg);
    pointer-events: none;
  }
  &:after {
    --tw-content: '';
    content: var(--tw-content);
    position: absolute;
    inset-inline: calc(var(--spacing) * 0);
    inset-block: calc(var(--spacing) * -2);
    z-index: calc(10 * -1);
  }
  span {
    position: absolute;
    top: calc(1 / 2 * 100%);
    left: calc(var(--spacing) * 0);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    height: calc(var(--spacing) * 2.5);
    width: calc(var(--spacing) * 2.5);
    border-radius: var(--radius-lg);
    background-color: #8e61e3;
    pointer-events: none;
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
    --tw-duration: 75ms;
    transition-duration: 75ms;
  }
}
.resize-v-line {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: calc(var(--spacing) * 1);
  min-width: calc(var(--spacing) * 1);
  height: 100%;
  width: 100%;
  transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  &:hover,
  &:active {
    > span {
      background-color: #222;
    }
    svg {
      opacity: 100%;
    }
  }
  &::before {
    --tw-content: "";
    content: var(--tw-content);
    position: absolute;
    inset: calc(var(--spacing) * 0);
    left: calc(1 / 2 * 100%);
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    width: 1px;
    background-color: #222;
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  > span {
    position: absolute;
    top: calc(1 / 2 * 100%);
    left: calc(1 / 2 * 100%);
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    height: 18px;
    width: calc(var(--spacing) * 1.5);
    border-radius: 4px;
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  svg {
    position: absolute;
    top: calc(1 / 2 * 100%);
    left: calc(1 / 2 * 100%);
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    rotate: 90deg;
    color: var(--color-neutral-400);
    opacity: 0%;
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
    z-index: 50;
  }
}
.tree-node-search-highlight {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    padding-block: 1px;
    border-radius: var(--radius-sm);
    background-color: var(--color-yellow-300);
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
    color: var(--color-black);
  }
  .single {
    margin-right: 1px;
    padding-inline: 2px;
  }
  .regex {
    padding-inline: 2px;
  }
  .start {
    margin-left: 1px;
    border-top-left-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
  }
  .end {
    margin-right: 1px;
    border-top-right-radius: var(--radius-sm);
    border-bottom-right-radius: var(--radius-sm);
  }
  .middle {
    margin-inline: 1px;
    border-radius: var(--radius-sm);
  }
}
.react-scan-toolbar-notification {
  position: absolute;
  inset-inline: calc(var(--spacing) * 0);
  display: flex;
  align-items: center;
  -moz-column-gap: calc(var(--spacing) * 2);
       column-gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 1);
  padding-left: calc(var(--spacing) * 2);
  font-size: 10px;
  color: var(--color-neutral-300);
  background-color: color-mix(in srgb, #000 90%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-black) 90%, transparent);
  }
  transition-property: transform, translate, scale, rotate;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  &:before {
    --tw-content: '';
    content: var(--tw-content);
    position: absolute;
    inset-inline: calc(var(--spacing) * 0);
    background-color: var(--color-black);
    height: calc(var(--spacing) * 2);
  }
  &.position-top {
    top: 100%;
    --tw-translate-y: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
    border-bottom-right-radius: var(--radius-lg);
    border-bottom-left-radius: var(--radius-lg);
    &::before {
      top: calc(var(--spacing) * 0);
      --tw-translate-y: -100%;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  &.position-bottom {
    bottom: 100%;
    --tw-translate-y: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    &::before {
      bottom: calc(var(--spacing) * 0);
      --tw-translate-y: 100%;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  &.is-open {
    --tw-translate-y: calc(var(--spacing) * 0);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.react-scan-header-item {
  position: absolute;
  inset: calc(var(--spacing) * 0);
  --tw-translate-y: calc(200% * -1);
  translate: var(--tw-translate-x) var(--tw-translate-y);
  transition-property: transform, translate, scale, rotate;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-duration: 300ms;
  transition-duration: 300ms;
  &.is-visible {
    --tw-translate-y: calc(var(--spacing) * 0);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
.react-scan-components-tree:has(.resize-v-line:hover, .resize-v-line:active)
  .tree {
  overflow: hidden;
}
.react-scan-expandable {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition-property: all;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
  transition-duration: var(--tw-duration, var(--default-transition-duration));
  --tw-duration: 75ms;
  transition-duration: 75ms;
  transition-timing-function: ease-out;
  > * {
    min-height: 0;
  }
  &.react-scan-expanded {
    grid-template-rows: 1fr;
    transition-duration: 100ms;
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes countFlash {
  0% {
    background-color: rgba(168, 85, 247, 0.3);
    transform: scale(1.05);
  }
  100% {
    background-color: rgba(168, 85, 247, 0.1);
    transform: scale(1);
  }
}
@keyframes countFlashShake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px) scale(1.1);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-space-y-reverse: 0;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-content: "";
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
    }
  }
}
`;
var useDelayedValue = (value, onDelay, offDelay = onDelay) => {
  const [delayedValue, setDelayedValue] = d4(value);
  h4(() => {
    if (value === delayedValue) return;
    const delay = value ? onDelay : offDelay;
    const timeout2 = setTimeout(() => setDelayedValue(value), delay);
    return () => clearTimeout(timeout2);
  }, [value, onDelay, offDelay]);
  return delayedValue;
};
var copyFocusedElement = async (element) => {
  try {
    const context = await I3(element);
    const snippet = `${context.htmlPreview}${context.stackString}`;
    if (!snippet.trim()) return false;
    await navigator.clipboard.writeText(snippet);
    return true;
  } catch {
    return false;
  }
};
var hasNonEmptyTextSelection = () => {
  var _a;
  const selection = (_a = window.getSelection) == null ? void 0 : _a.call(window);
  return Boolean(selection && selection.toString().length > 0);
};
var isInputLikeFocused = () => {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (active instanceof HTMLElement && active.isContentEditable) return true;
  return false;
};
var isMac = () => {
  if (typeof navigator === "undefined") return false;
  const platform = navigator.platform || "";
  if (platform) return /Mac|iPhone|iPad|iPod/i.test(platform);
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
var isUserReactGrabActive = () => typeof window !== "undefined" && Boolean(window.__REACT_GRAB__);
var headerInspectClassName = g4(
  () => cn(
    "absolute inset-0 flex items-center gap-x-2",
    "translate-y-0",
    "transition-transform duration-300",
    signalIsSettingsOpen.value && "-translate-y-[200%]"
  )
);
var HeaderInspect = () => {
  const refReRenders = A3(null);
  const refTiming = A3(null);
  const [currentFiber, setCurrentFiber] = d4(null);
  useSignalEffect(() => {
    const state = Store.inspectState.value;
    if (state.kind === "focused") {
      setCurrentFiber(state.fiber);
    }
  });
  useSignalEffect(() => {
    const state = timelineState.value;
    f5(() => {
      var _a, _b;
      if (Store.inspectState.value.kind !== "focused") return;
      if (!refReRenders.current || !refTiming.current) return;
      const { totalUpdates, currentIndex, updates, isVisible, windowOffset } = state;
      const reRenders = Math.max(0, totalUpdates - 1);
      const headerText = isVisible ? `#${windowOffset + currentIndex} Re-render` : reRenders > 0 ? `×${reRenders}` : "";
      let formattedTime;
      if (reRenders > 0 && currentIndex >= 0 && currentIndex < updates.length) {
        const time = (_b = (_a = updates[currentIndex]) == null ? void 0 : _a.fiberInfo) == null ? void 0 : _b.selfTime;
        formattedTime = time > 0 ? time < 0.1 - Number.EPSILON ? "< 0.1ms" : `${Number(time.toFixed(1))}ms` : void 0;
      }
      refReRenders.current.dataset.text = headerText ? ` • ${headerText}` : "";
      refTiming.current.dataset.text = formattedTime ? ` • ${formattedTime}` : "";
    });
  });
  const componentName = T3(() => {
    if (!currentFiber) return null;
    const { name, wrappers, wrapperTypes } = getExtendedDisplayName(currentFiber);
    const title = wrappers.length ? `${wrappers.join("(")}(${name})${")".repeat(wrappers.length)}` : name != null ? name : "";
    const firstWrapperType = wrapperTypes[0];
    return u5("span", { title, className: "flex items-center gap-x-1", children: [
      name != null ? name : "Unknown",
      u5(
        "span",
        {
          title: firstWrapperType == null ? void 0 : firstWrapperType.title,
          className: "flex items-center gap-x-1 text-[10px] text-purple-400",
          children: !!firstWrapperType && u5(S2, { children: [
            u5(
              "span",
              {
                className: cn(
                  "rounded py-[1px] px-1",
                  "truncate",
                  firstWrapperType.compiler && "bg-purple-800 text-neutral-400",
                  !firstWrapperType.compiler && "bg-neutral-700 text-neutral-300",
                  firstWrapperType.type === "memo" && "bg-[#5f3f9a] text-white"
                ),
                children: firstWrapperType.type
              },
              firstWrapperType.type
            ),
            firstWrapperType.compiler && u5("span", { className: "text-yellow-300", children: "✨" })
          ] })
        }
      ),
      wrapperTypes.length > 1 && u5("span", { className: "text-[10px] text-neutral-400", children: [
        "×",
        wrapperTypes.length - 1
      ] })
    ] });
  }, [currentFiber]);
  return u5("div", { className: headerInspectClassName, children: [
    componentName,
    u5("div", { className: "flex items-center gap-x-2 mr-auto text-xs text-[#888]", children: [
      u5(
        "span",
        {
          ref: refReRenders,
          className: "with-data-text cursor-pointer !overflow-visible",
          title: "Click to toggle between rerenders and total renders"
        }
      ),
      u5("span", { ref: refTiming, className: "with-data-text !overflow-visible" })
    ] })
  ] });
};
var Header = () => {
  const isInitialView = useDelayedValue(Store.inspectState.value.kind === "focused", 150, 0);
  const isCopied = useSignal(false);
  const handleClose = () => {
    signalWidgetViews.value = {
      view: "none"
    };
    Store.inspectState.value = {
      kind: "inspect-off"
    };
  };
  const handleCopy = async () => {
    const state = Store.inspectState.value;
    if (state.kind !== "focused" || !state.focusedDomElement) return;
    const didCopy = await copyFocusedElement(state.focusedDomElement);
    if (!didCopy) return;
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
      handleClose();
    }, COPY_FEEDBACK_DURATION_MS);
  };
  const refHandleCopy = A3(handleCopy);
  refHandleCopy.current = handleCopy;
  h4(() => {
    const onKeyDown = (event) => {
      const state = Store.inspectState.value;
      if (state.kind !== "focused" || !state.focusedDomElement) return;
      if (isUserReactGrabActive()) return;
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.shiftKey || event.altKey) return;
      if (event.key !== "c" && event.code !== "KeyC") return;
      if (isInputLikeFocused() || hasNonEmptyTextSelection()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      void refHandleCopy.current();
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, []);
  const isHeaderIsNotifications = signalWidgetViews.value.view === "notifications";
  if (isHeaderIsNotifications) {
    return;
  }
  const isFocused = Store.inspectState.value.kind === "focused";
  const copyShortcutLabel = isMac() ? "⌘C" : "Ctrl+C";
  return u5("div", { className: "react-scan-header", children: [
    u5("div", { className: "relative flex-1 h-full", children: u5("div", { className: cn("react-scan-header-item is-visible", !isInitialView && "!duration-0"), children: u5(HeaderInspect, {}) }) }),
    isFocused && u5(
      "button",
      {
        type: "button",
        title: `Copy element (${copyShortcutLabel})`,
        className: "react-scan-close-button",
        onClick: handleCopy,
        children: u5(
          Icon,
          {
            name: isCopied.value ? "icon-check" : "icon-copy",
            className: cn(isCopied.value && "text-green-500")
          }
        )
      }
    ),
    u5("button", { type: "button", title: "Close", className: "react-scan-close-button", onClick: handleClose, children: u5(Icon, { name: "icon-close" }) })
  ] });
};
var Toggle = ({
  className,
  ...props
}) => {
  return u5("div", { className: cn("react-scan-toggle", className), children: [
    u5(
      "input",
      {
        type: "checkbox",
        ...props
      }
    ),
    u5("div", {})
  ] });
};
var FpsMeterInner = ({ fps: fps2 }) => {
  const getColor = (fps3) => {
    if (fps3 < 30) return "#EF4444";
    if (fps3 < 50) return "#F59E0B";
    return "rgb(214,132,245)";
  };
  return u5(
    "div",
    {
      className: cn(
        "flex items-center gap-x-1 px-2 w-full",
        "h-6",
        "rounded-md",
        "font-mono leading-none",
        "bg-[#141414]",
        "ring-1 ring-white/[0.08]"
      ),
      children: [
        u5(
          "div",
          {
            style: { color: getColor(fps2) },
            className: "text-sm font-semibold tracking-wide transition-colors ease-in-out w-full flex justify-center items-center",
            children: fps2
          }
        ),
        u5("span", { className: "text-white/30 text-[11px] font-medium tracking-wide ml-auto min-w-fit", children: "FPS" })
      ]
    }
  );
};
var FPSMeter = () => {
  const [fps2, setFps] = d4(null);
  h4(() => {
    const intervalId = setInterval(() => {
      setFps(getFPS());
    }, 200);
    return () => clearInterval(intervalId);
  }, []);
  return u5(
    "div",
    {
      className: cn(
        "flex items-center justify-end gap-x-2 px-1 ml-1 w-[72px]",
        "whitespace-nowrap text-sm text-white"
      ),
      children: fps2 === null ? u5(S2, { children: "️" }) : u5(FpsMeterInner, { fps: fps2 })
    }
  );
};
var THROW_INVARIANTS = false;
var invariantError = (message) => {
  if (THROW_INVARIANTS) {
    throw new Error(message);
  }
};
var iife = (fn2) => fn2();
var BoundedArray = class _BoundedArray extends Array {
  constructor(capacity = 25) {
    super();
    __publicField(this, "capacity", capacity);
  }
  push(...items) {
    const result = super.push(...items);
    while (this.length > this.capacity) {
      this.shift();
    }
    return result;
  }
  // do not couple capacity with a default param, it must be explicit
  static fromArray(array, capacity) {
    const arr = new _BoundedArray(capacity);
    arr.push(...array);
    return arr;
  }
};
var Store2 = class {
  constructor(initialValue) {
    __publicField(this, "subscribers", /* @__PURE__ */ new Set());
    __publicField(this, "currentValue");
    this.currentValue = initialValue;
  }
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
    subscriber(this.currentValue);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }
  setState(data) {
    this.currentValue = data;
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
  getCurrentState() {
    return this.currentValue;
  }
};
var MAX_INTERACTION_BATCH = 150;
var interactionStore = new Store2(
  new BoundedArray(MAX_INTERACTION_BATCH)
);
var MAX_CHANNEL_SIZE = 50;
var PerformanceEntryChannels = class {
  constructor() {
    __publicField(this, "channels", {});
  }
  publish(item, to, createIfNoChannel = true) {
    const existingChannel = this.channels[to];
    if (!existingChannel) {
      if (!createIfNoChannel) {
        return;
      }
      this.channels[to] = {
        callbacks: new BoundedArray(MAX_CHANNEL_SIZE),
        state: new BoundedArray(MAX_CHANNEL_SIZE)
      };
      this.channels[to].state.push(item);
      return;
    }
    existingChannel.state.push(item);
    existingChannel.callbacks.forEach((cb) => cb(item));
  }
  getAvailableChannels() {
    return BoundedArray.fromArray(Object.keys(this.channels), MAX_CHANNEL_SIZE);
  }
  subscribe(to, cb, dropFirst = false) {
    const defer = () => {
      if (!dropFirst) {
        this.channels[to].state.forEach((item) => {
          cb(item);
        });
      }
      return () => {
        const filtered = this.channels[to].callbacks.filter(
          (subscribed) => subscribed !== cb
        );
        this.channels[to].callbacks = BoundedArray.fromArray(
          filtered,
          MAX_CHANNEL_SIZE
        );
      };
    };
    const existing = this.channels[to];
    if (!existing) {
      this.channels[to] = {
        callbacks: new BoundedArray(MAX_CHANNEL_SIZE),
        state: new BoundedArray(MAX_CHANNEL_SIZE)
      };
      this.channels[to].callbacks.push(cb);
      return defer();
    }
    existing.callbacks.push(cb);
    return defer();
  }
  updateChannelState(channel, updater, createIfNoChannel = true) {
    const existingChannel = this.channels[channel];
    if (!existingChannel) {
      if (!createIfNoChannel) {
        return;
      }
      const state = new BoundedArray(MAX_CHANNEL_SIZE);
      const newChannel = {
        callbacks: new BoundedArray(MAX_CHANNEL_SIZE),
        state
      };
      this.channels[channel] = newChannel;
      newChannel.state = updater(state);
      return;
    }
    existingChannel.state = updater(existingChannel.state);
  }
  getChannelState(channel) {
    var _a;
    return (_a = this.channels[channel].state) != null ? _a : new BoundedArray(MAX_CHANNEL_SIZE);
  }
};
var performanceEntryChannels = new PerformanceEntryChannels();
var DEFAULT_PATH_FILTERS = {
  skipProviders: true,
  skipHocs: true,
  skipContainers: true,
  skipMinified: true,
  skipUtilities: true,
  skipBoundaries: true
};
var PATH_FILTER_PATTERNS = {
  providers: [/Provider$/, /^Provider$/, /^Context$/],
  hocs: [/^with[A-Z]/, /^forward(?:Ref)?$/i, /^Forward(?:Ref)?\(/],
  containers: [/^(?:App)?Container$/, /^Root$/, /^ReactDev/],
  utilities: [
    /^Fragment$/,
    /^Suspense$/,
    /^ErrorBoundary$/,
    /^Portal$/,
    /^Consumer$/,
    /^Layout$/,
    /^Router/,
    /^Hydration/
  ],
  boundaries: [/^Boundary$/, /Boundary$/, /^Provider$/, /Provider$/]
};
var shouldIncludeInPath = (name, filters = DEFAULT_PATH_FILTERS) => {
  const patternsToCheck = [];
  if (filters.skipProviders) patternsToCheck.push(...PATH_FILTER_PATTERNS.providers);
  if (filters.skipHocs) patternsToCheck.push(...PATH_FILTER_PATTERNS.hocs);
  if (filters.skipContainers) patternsToCheck.push(...PATH_FILTER_PATTERNS.containers);
  if (filters.skipUtilities) patternsToCheck.push(...PATH_FILTER_PATTERNS.utilities);
  if (filters.skipBoundaries) patternsToCheck.push(...PATH_FILTER_PATTERNS.boundaries);
  return !patternsToCheck.some((pattern) => pattern.test(name));
};
var minifiedPatterns = [
  /^[a-z]$/,
  /^[a-z][0-9]$/,
  /^_+$/,
  /^[A-Za-z][_$]$/,
  /^[a-z]{1,2}$/
];
var isMinified = (name) => {
  var _a, _b;
  for (let i5 = 0; i5 < minifiedPatterns.length; i5++) {
    if (minifiedPatterns[i5].test(name)) return true;
  }
  const hasNoVowels = !/[aeiou]/i.test(name);
  const hasMostlyNumbers = ((_b = (_a = name.match(/\d/g)) == null ? void 0 : _a.length) != null ? _b : 0) > name.length / 2;
  const isSingleWordLowerCase = /^[a-z]+$/.test(name);
  const hasRandomLookingChars = /[$_]{2,}/.test(name);
  return Number(hasNoVowels) + Number(hasMostlyNumbers) + Number(isSingleWordLowerCase) + Number(hasRandomLookingChars) >= 2;
};
var getCleanComponentName = (component) => {
  const name = Ee(component);
  if (!name) return "";
  return name.replace(
    /^(?:Memo|Forward(?:Ref)?|With.*?)\((?<inner>.*?)\)$/,
    "$<inner>"
  );
};
var getInteractionPath = (initialFiber, filters = DEFAULT_PATH_FILTERS) => {
  if (!initialFiber) return [];
  const currentName = Ee(initialFiber.type);
  if (!currentName) return [];
  const stack = new Array();
  let fiber = initialFiber;
  while (fiber.return) {
    const name = getCleanComponentName(fiber.type);
    if (name && !isMinified(name) && shouldIncludeInPath(name, filters) && name.toLowerCase() !== name) {
      stack.push(name);
    }
    fiber = fiber.return;
  }
  const fullPath = new Array(stack.length);
  for (let i5 = 0; i5 < stack.length; i5++) {
    fullPath[i5] = stack[stack.length - i5 - 1];
  }
  return fullPath;
};
var getFirstNameFromAncestor = (fiber, accept = () => true) => {
  let curr = fiber;
  while (curr) {
    const currName = Ee(curr.type);
    if (currName && accept(currName)) {
      return currName;
    }
    curr = curr.return;
  }
  return null;
};
var unsubscribeTrackVisibilityChange;
var lastVisibilityHiddenAt = "never-hidden";
var trackVisibilityChange = () => {
  unsubscribeTrackVisibilityChange == null ? void 0 : unsubscribeTrackVisibilityChange();
  const onVisibilityChange = () => {
    if (document.hidden) {
      lastVisibilityHiddenAt = Date.now();
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  unsubscribeTrackVisibilityChange = () => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
};
var getInteractionType = (eventName) => {
  if (["pointerup", "click"].includes(eventName)) {
    return "pointer";
  }
  if (eventName.includes("key")) {
  }
  if (["keydown", "keyup"].includes(eventName)) {
    return "keyboard";
  }
  return null;
};
var onEntryAnimationId = null;
var setupPerformanceListener = (onEntry) => {
  trackVisibilityChange();
  const interactionMap = /* @__PURE__ */ new Map();
  const interactionTargetMap = /* @__PURE__ */ new Map();
  const processInteractionEntry = (entry) => {
    if (!entry.interactionId) return;
    if (entry.interactionId && entry.target && !interactionTargetMap.has(entry.interactionId)) {
      interactionTargetMap.set(entry.interactionId, entry.target);
    }
    if (entry.target) {
      let current = entry.target;
      while (current) {
        if (current.id === "react-scan-toolbar-root" || current.id === "react-scan-root") {
          return;
        }
        current = current.parentElement;
      }
    }
    const existingInteraction = interactionMap.get(entry.interactionId);
    if (existingInteraction) {
      if (entry.duration > existingInteraction.latency) {
        existingInteraction.entries = [entry];
        existingInteraction.latency = entry.duration;
      } else if (entry.duration === existingInteraction.latency && entry.startTime === existingInteraction.entries[0].startTime) {
        existingInteraction.entries.push(entry);
      }
    } else {
      const interactionType = getInteractionType(entry.name);
      if (!interactionType) {
        return;
      }
      const interaction = {
        id: entry.interactionId,
        latency: entry.duration,
        entries: [entry],
        target: entry.target,
        type: interactionType,
        startTime: entry.startTime,
        endTime: Date.now(),
        processingStart: entry.processingStart,
        processingEnd: entry.processingEnd,
        duration: entry.duration,
        inputDelay: entry.processingStart - entry.startTime,
        processingDuration: entry.processingEnd - entry.processingStart,
        presentationDelay: entry.duration - (entry.processingEnd - entry.startTime),
        // componentPath:
        timestamp: Date.now(),
        timeSinceTabInactive: lastVisibilityHiddenAt === "never-hidden" ? "never-hidden" : Date.now() - lastVisibilityHiddenAt,
        visibilityState: document.visibilityState,
        timeOrigin: performance.timeOrigin,
        referrer: document.referrer
      };
      interactionMap.set(interaction.id, interaction);
      if (!onEntryAnimationId) {
        onEntryAnimationId = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onEntry(interactionMap.get(interaction.id));
            onEntryAnimationId = null;
          });
        });
      }
    }
  };
  const po = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (let i5 = 0, len = entries.length; i5 < len; i5++) {
      const entry = entries[i5];
      processInteractionEntry(entry);
    }
  });
  try {
    po.observe({
      type: "event",
      buffered: true,
      durationThreshold: 16
    });
    po.observe({
      type: "first-input",
      buffered: true
    });
  } catch {
  }
  return () => po.disconnect();
};
var setupPerformancePublisher = () => {
  return setupPerformanceListener((entry) => {
    performanceEntryChannels.publish(
      {
        kind: "entry-received",
        entry
      },
      "recording"
    );
  });
};
var MAX_INTERACTION_TASKS = 25;
var tasks = new BoundedArray(MAX_INTERACTION_TASKS);
var getAssociatedDetailedTimingInteraction = (entry, activeTasks) => {
  let closestTask = null;
  for (const task of activeTasks) {
    if (task.type !== entry.type) {
      continue;
    }
    if (closestTask === null) {
      closestTask = task;
      continue;
    }
    const getAbsoluteDiff = (task2, entry2) => Math.abs(task2.startDateTime) - (entry2.startTime + entry2.timeOrigin);
    if (getAbsoluteDiff(task, entry) < getAbsoluteDiff(closestTask, entry)) {
      closestTask = task;
    }
  }
  return closestTask;
};
var listenForPerformanceEntryInteractions = (onComplete) => {
  const unsubscribe = performanceEntryChannels.subscribe(
    "recording",
    (event) => {
      const associatedDetailedInteraction = event.kind === "auto-complete-race" ? tasks.find((task) => task.interactionUUID === event.interactionUUID) : getAssociatedDetailedTimingInteraction(event.entry, tasks);
      if (!associatedDetailedInteraction) {
        return;
      }
      const completedInteraction = associatedDetailedInteraction.completeInteraction(event);
      onComplete(completedInteraction);
    }
  );
  return unsubscribe;
};
var trackDetailedTiming = ({
  onMicroTask,
  onRAF,
  onTimeout,
  abort
}) => {
  queueMicrotask(() => {
    if ((abort == null ? void 0 : abort()) === true) {
      return;
    }
    if (!onMicroTask()) {
      return;
    }
    requestAnimationFrame(() => {
      if ((abort == null ? void 0 : abort()) === true) {
        return;
      }
      if (!onRAF()) {
        return;
      }
      setTimeout(() => {
        if ((abort == null ? void 0 : abort()) === true) {
          return;
        }
        onTimeout();
      }, 0);
    });
  });
};
var getTargetInteractionDetails = (target) => {
  var _a;
  const associatedFiber = getFiberFromElement(target);
  if (!associatedFiber) {
    return;
  }
  let componentName = associatedFiber ? Ee(associatedFiber == null ? void 0 : associatedFiber.type) : "N/A";
  if (!componentName) {
    componentName = (_a = getFirstNameFromAncestor(associatedFiber, (name) => name.length > 2)) != null ? _a : "N/A";
  }
  if (!componentName) {
    return;
  }
  const componentPath = getInteractionPath(associatedFiber);
  return {
    componentPath,
    childrenTree: {},
    componentName,
    elementFiber: associatedFiber
  };
};
var setupDetailedPointerTimingListener = (kind, options) => {
  let instrumentationIdInControl = null;
  const getEvent = (info) => {
    switch (kind) {
      case "pointer": {
        if (info.phase === "start") {
          return "pointerup";
        }
        if (info.target instanceof HTMLInputElement || info.target instanceof HTMLSelectElement) {
          return "change";
        }
        return "click";
      }
      case "keyboard": {
        if (info.phase === "start") {
          return "keydown";
        }
        return "change";
      }
    }
  };
  const lastInteractionRef = {
    current: {
      kind: "uninitialized-stage",
      interactionUUID: not_globally_unique_generateId(),
      // the first interaction uses this
      stageStart: Date.now(),
      interactionType: kind
    }
  };
  const onInteractionStart = (e5) => {
    var _a, _b;
    const path = e5.composedPath();
    if (path.some(
      (el) => el instanceof Element && el.id === "react-scan-toolbar-root"
    )) {
      return;
    }
    if (Date.now() - lastInteractionRef.current.stageStart > 2e3) {
      lastInteractionRef.current = {
        kind: "uninitialized-stage",
        interactionUUID: not_globally_unique_generateId(),
        stageStart: Date.now(),
        interactionType: kind
      };
    }
    if (lastInteractionRef.current.kind !== "uninitialized-stage") {
      return;
    }
    const pointerUpStart = performance.now();
    (_a = options == null ? void 0 : options.onStart) == null ? void 0 : _a.call(options, lastInteractionRef.current.interactionUUID);
    const details = getTargetInteractionDetails(e5.target);
    if (!details) {
      (_b = options == null ? void 0 : options.onError) == null ? void 0 : _b.call(options, lastInteractionRef.current.interactionUUID);
      return;
    }
    const fiberRenders = {};
    const stopListeningForRenders = listenForRenders(fiberRenders);
    lastInteractionRef.current = {
      ...lastInteractionRef.current,
      interactionType: kind,
      blockingTimeStart: Date.now(),
      childrenTree: details.childrenTree,
      componentName: details.componentName,
      componentPath: details.componentPath,
      fiberRenders,
      kind: "interaction-start",
      interactionStartDetail: pointerUpStart,
      stopListeningForRenders
    };
    const event = getEvent({ phase: "end", target: e5.target });
    document.addEventListener(event, onLastJS, {
      once: true
    });
    requestAnimationFrame(() => {
      document.removeEventListener(event, onLastJS);
    });
  };
  document.addEventListener(
    getEvent({ phase: "start" }),
    // oxlint-disable-next-line typescript/no-explicit-any
    onInteractionStart,
    {
      capture: true
    }
  );
  const onLastJS = (e5, instrumentationId, abort) => {
    var _a;
    if (lastInteractionRef.current.kind !== "interaction-start" && instrumentationId === instrumentationIdInControl) {
      if (kind === "pointer" && e5.target instanceof HTMLSelectElement) {
        lastInteractionRef.current = {
          kind: "uninitialized-stage",
          interactionUUID: not_globally_unique_generateId(),
          stageStart: Date.now(),
          interactionType: kind
        };
        return;
      }
      (_a = options == null ? void 0 : options.onError) == null ? void 0 : _a.call(options, lastInteractionRef.current.interactionUUID);
      lastInteractionRef.current = {
        kind: "uninitialized-stage",
        interactionUUID: not_globally_unique_generateId(),
        stageStart: Date.now(),
        interactionType: kind
      };
      invariantError("pointer -> click");
      return;
    }
    instrumentationIdInControl = instrumentationId;
    trackDetailedTiming({
      abort,
      onMicroTask: () => {
        if (lastInteractionRef.current.kind === "uninitialized-stage") {
          return false;
        }
        lastInteractionRef.current = {
          ...lastInteractionRef.current,
          kind: "js-end-stage",
          jsEndDetail: performance.now()
        };
        return true;
      },
      onRAF: () => {
        var _a2;
        if (lastInteractionRef.current.kind !== "js-end-stage" && lastInteractionRef.current.kind !== "raf-stage") {
          (_a2 = options == null ? void 0 : options.onError) == null ? void 0 : _a2.call(options, lastInteractionRef.current.interactionUUID);
          invariantError("bad transition to raf");
          lastInteractionRef.current = {
            kind: "uninitialized-stage",
            interactionUUID: not_globally_unique_generateId(),
            stageStart: Date.now(),
            interactionType: kind
          };
          return false;
        }
        lastInteractionRef.current = {
          ...lastInteractionRef.current,
          kind: "raf-stage",
          rafStart: performance.now()
        };
        return true;
      },
      onTimeout: () => {
        var _a2;
        if (lastInteractionRef.current.kind !== "raf-stage") {
          (_a2 = options == null ? void 0 : options.onError) == null ? void 0 : _a2.call(options, lastInteractionRef.current.interactionUUID);
          lastInteractionRef.current = {
            kind: "uninitialized-stage",
            interactionUUID: not_globally_unique_generateId(),
            stageStart: Date.now(),
            interactionType: kind
          };
          invariantError("raf->timeout");
          return;
        }
        const now = Date.now();
        const timeoutStage = Object.freeze({
          ...lastInteractionRef.current,
          kind: "timeout-stage",
          blockingTimeEnd: now,
          commitEnd: performance.now()
        });
        lastInteractionRef.current = {
          kind: "uninitialized-stage",
          interactionUUID: not_globally_unique_generateId(),
          stageStart: now,
          interactionType: kind
        };
        let completed = false;
        const completeInteraction = (event) => {
          var _a3;
          completed = true;
          const latency = event.kind === "auto-complete-race" ? event.detailedTiming.commitEnd - event.detailedTiming.interactionStartDetail : event.entry.latency;
          const finalInteraction = {
            detailedTiming: timeoutStage,
            latency,
            completedAt: Date.now(),
            flushNeeded: true
          };
          (_a3 = options == null ? void 0 : options.onComplete) == null ? void 0 : _a3.call(
            options,
            timeoutStage.interactionUUID,
            finalInteraction,
            event
          );
          const newTasks = tasks.filter(
            (task2) => task2.interactionUUID !== timeoutStage.interactionUUID
          );
          tasks = BoundedArray.fromArray(newTasks, MAX_INTERACTION_TASKS);
          return finalInteraction;
        };
        const task = {
          completeInteraction,
          endDateTime: Date.now(),
          startDateTime: timeoutStage.blockingTimeStart,
          type: kind,
          interactionUUID: timeoutStage.interactionUUID
        };
        tasks.push(task);
        if (!isPerformanceEventAvailable()) {
          const newTasks = tasks.filter(
            (task2) => task2.interactionUUID !== timeoutStage.interactionUUID
          );
          tasks = BoundedArray.fromArray(newTasks, MAX_INTERACTION_TASKS);
          completeInteraction({
            kind: "auto-complete-race",
            // redundant
            detailedTiming: timeoutStage,
            interactionUUID: timeoutStage.interactionUUID
          });
        } else {
          setTimeout(() => {
            if (completed) {
              return;
            }
            completeInteraction({
              kind: "auto-complete-race",
              // redundant
              detailedTiming: timeoutStage,
              interactionUUID: timeoutStage.interactionUUID
            });
            const newTasks = tasks.filter(
              (task2) => task2.interactionUUID !== timeoutStage.interactionUUID
            );
            tasks = BoundedArray.fromArray(newTasks, MAX_INTERACTION_TASKS);
          }, 1e3);
        }
      }
    });
  };
  const onKeyPress = (e5) => {
    const id = not_globally_unique_generateId();
    onLastJS(e5, id, () => id !== instrumentationIdInControl);
  };
  if (kind === "keyboard") {
    document.addEventListener("keypress", onKeyPress);
  }
  return () => {
    document.removeEventListener(
      getEvent({ phase: "start" }),
      // oxlint-disable-next-line typescript/no-explicit-any
      onInteractionStart,
      {
        capture: true
      }
    );
    document.removeEventListener("keypress", onKeyPress);
  };
};
var getHostFromFiber = (fiber) => {
  var _a;
  return (_a = A(fiber, (node) => {
    if (b(node)) {
      return true;
    }
  })) == null ? void 0 : _a.stateNode;
};
var isPerformanceEventAvailable = () => {
  return "PerformanceEventTiming" in globalThis;
};
var listenForRenders = (fiberRenders) => {
  const listener = (fiber) => {
    var _a, _b, _c, _d, _e2, _f, _g;
    const displayName = Ee(fiber.type);
    if (!displayName) {
      return;
    }
    const existing = fiberRenders[displayName];
    if (!existing) {
      const parents = /* @__PURE__ */ new Set();
      const res = fiber.return && getParentCompositeFiber(fiber.return);
      const parentCompositeName = res && Ee(res[0]);
      if (parentCompositeName) {
        parents.add(parentCompositeName);
      }
      const { selfTime: selfTime2, totalTime: totalTime2 } = we(fiber);
      const newChanges2 = collectInspectorDataWithoutCounts(fiber);
      const emptySection2 = {
        current: [],
        changes: /* @__PURE__ */ new Set(),
        changesCounts: /* @__PURE__ */ new Map()
      };
      const changes = {
        fiberProps: newChanges2.fiberProps || emptySection2,
        fiberState: newChanges2.fiberState || emptySection2,
        fiberContext: newChanges2.fiberContext || emptySection2
      };
      fiberRenders[displayName] = {
        renderCount: 1,
        hasMemoCache: Te(fiber),
        wasFiberRenderMount: wasFiberRenderMount(fiber),
        parents,
        selfTime: selfTime2,
        totalTime: totalTime2,
        nodeInfo: [
          {
            element: getHostFromFiber(fiber),
            name: (_a = Ee(fiber.type)) != null ? _a : "Unknown",
            selfTime: we(fiber).selfTime
          }
        ],
        changes
      };
      return;
    }
    const parentType = (_c = (_b = getParentCompositeFiber(fiber)) == null ? void 0 : _b[0]) == null ? void 0 : _c.type;
    if (parentType) {
      const res = fiber.return && getParentCompositeFiber(fiber.return);
      const parentCompositeName = res && Ee(res[0]);
      if (parentCompositeName) {
        existing.parents.add(parentCompositeName);
      }
    }
    const { selfTime, totalTime } = we(fiber);
    const newChanges = collectInspectorDataWithoutCounts(fiber);
    if (!newChanges) return;
    const emptySection = {
      current: [],
      changes: /* @__PURE__ */ new Set(),
      changesCounts: /* @__PURE__ */ new Map()
    };
    existing.wasFiberRenderMount = existing.wasFiberRenderMount || wasFiberRenderMount(fiber);
    existing.hasMemoCache = existing.hasMemoCache || Te(fiber);
    existing.changes = {
      fiberProps: mergeSectionData(
        ((_d = existing.changes) == null ? void 0 : _d.fiberProps) || emptySection,
        newChanges.fiberProps || emptySection
      ),
      fiberState: mergeSectionData(
        ((_e2 = existing.changes) == null ? void 0 : _e2.fiberState) || emptySection,
        newChanges.fiberState || emptySection
      ),
      fiberContext: mergeSectionData(
        ((_f = existing.changes) == null ? void 0 : _f.fiberContext) || emptySection,
        newChanges.fiberContext || emptySection
      )
    };
    existing.renderCount += 1;
    existing.selfTime += selfTime;
    existing.totalTime += totalTime;
    existing.nodeInfo.push({
      element: getHostFromFiber(fiber),
      name: (_g = Ee(fiber.type)) != null ? _g : "Unknown",
      selfTime: we(fiber).selfTime
    });
  };
  Store.interactionListeningForRenders = listener;
  return () => {
    if (Store.interactionListeningForRenders === listener) {
      Store.interactionListeningForRenders = null;
    }
  };
};
var mergeSectionData = (existing, newData) => {
  const mergedSection = {
    current: [...existing.current],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  };
  for (const value of newData.current) {
    if (!mergedSection.current.some((item) => item.name === value.name)) {
      mergedSection.current.push(value);
    }
  }
  for (const change of newData.changes) {
    if (typeof change === "string" || typeof change === "number") {
      mergedSection.changes.add(change);
      const existingCount = existing.changesCounts.get(change) || 0;
      const newCount = newData.changesCounts.get(change) || 0;
      mergedSection.changesCounts.set(change, existingCount + newCount);
    }
  }
  return mergedSection;
};
var wasFiberRenderMount = (fiber) => {
  if (!fiber.alternate) {
    return true;
  }
  const prevFiber = fiber.alternate;
  const wasMounted = prevFiber && prevFiber.memoizedState != null && prevFiber.memoizedState.element != null && prevFiber.memoizedState.isDehydrated !== true;
  const isMounted = fiber.memoizedState != null && fiber.memoizedState.element != null && fiber.memoizedState.isDehydrated !== true;
  return !wasMounted && isMounted;
};
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (selectorOrListener, listener) => {
    let selector;
    let actualListener;
    if (listener) {
      selector = selectorOrListener;
      actualListener = listener;
    } else {
      actualListener = selectorOrListener;
    }
    let currentSlice = selector ? selector(state) : void 0;
    const wrappedListener = (newState, previousState) => {
      if (selector) {
        const nextSlice = selector(newState);
        const prevSlice = selector(previousState);
        if (!Object.is(currentSlice, nextSlice)) {
          currentSlice = nextSlice;
          actualListener(nextSlice, prevSlice);
        }
      } else {
        actualListener(newState, previousState);
      }
    };
    listeners.add(wrappedListener);
    return () => listeners.delete(wrappedListener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
var accumulatedFiberRendersOverTask = null;
var debugEventStore = createStore()((set) => ({
  state: {
    events: []
  },
  actions: {
    addEvent: (event) => {
      set((store) => ({
        state: {
          events: [...store.state.events, event]
        }
      }));
    },
    clear: () => {
      set({
        state: {
          events: []
        }
      });
    }
  }
}));
var EVENT_STORE_CAPACITY = 200;
var toolbarEventStore = createStore()(
  (set, get) => {
    const listeners = /* @__PURE__ */ new Set();
    return {
      state: {
        events: new BoundedArray(EVENT_STORE_CAPACITY)
      },
      actions: {
        addEvent: (event) => {
          listeners.forEach((listener) => listener(event));
          const events = [...get().state.events, event];
          const applyOverlapCheckToLongRenderEvent = (longRenderEvent, onOverlap) => {
            const overlapsWith = events.find((event2) => {
              if (event2.kind === "long-render") {
                return;
              }
              if (event2.id === longRenderEvent.id) {
                return;
              }
              if (longRenderEvent.data.startAt <= event2.data.startAt && longRenderEvent.data.endAt <= event2.data.endAt && longRenderEvent.data.endAt >= event2.data.startAt) {
                return true;
              }
              if (event2.data.startAt <= longRenderEvent.data.startAt && event2.data.endAt >= longRenderEvent.data.startAt) {
                return true;
              }
              if (longRenderEvent.data.startAt <= event2.data.startAt && longRenderEvent.data.endAt >= event2.data.endAt) {
                return true;
              }
            });
            if (overlapsWith) {
              onOverlap(overlapsWith);
            }
          };
          const toRemove = /* @__PURE__ */ new Set();
          events.forEach((event2) => {
            if (event2.kind === "interaction") return;
            applyOverlapCheckToLongRenderEvent(event2, () => {
              toRemove.add(event2.id);
            });
          });
          const withRemovedEvents = events.filter(
            (event2) => !toRemove.has(event2.id)
          );
          set(() => ({
            state: {
              events: BoundedArray.fromArray(
                withRemovedEvents,
                EVENT_STORE_CAPACITY
              )
            }
          }));
        },
        addListener: (listener) => {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        clear: () => {
          set({
            state: {
              events: new BoundedArray(EVENT_STORE_CAPACITY)
            }
          });
        }
      }
    };
  }
);
var useToolbarEventLog = () => {
  return C6(
    toolbarEventStore.subscribe,
    toolbarEventStore.getState
  );
};
var taskDirtyAt = null;
var taskDirtyOrigin = null;
var previousTrackCurrentMouseOverElementCallback = null;
var overToolbar;
var trackCurrentMouseOverToolbar = () => {
  const callback = (e5) => {
    overToolbar = e5.composedPath().map((path) => path.id).filter(Boolean).includes("react-scan-toolbar");
  };
  document.addEventListener("mouseover", callback);
  previousTrackCurrentMouseOverElementCallback = callback;
  return () => {
    if (previousTrackCurrentMouseOverElementCallback) {
      document.removeEventListener(
        "mouseover",
        previousTrackCurrentMouseOverElementCallback
      );
    }
  };
};
var startDirtyTaskTracking = () => {
  const onVisibilityChange = () => {
    taskDirtyAt = performance.now();
    taskDirtyOrigin = performance.timeOrigin;
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
};
var HIGH_SEVERITY_FPS_DROP_TIME = 150;
var framesDrawnInTheLastSecond = [];
function startLongPipelineTracking() {
  let rafHandle;
  let timeoutHandle;
  function measure() {
    let unSub = null;
    accumulatedFiberRendersOverTask = null;
    accumulatedFiberRendersOverTask = {};
    unSub = listenForRenders(accumulatedFiberRendersOverTask);
    const startOrigin = performance.timeOrigin;
    const startTime = performance.now();
    rafHandle = requestAnimationFrame(() => {
      timeoutHandle = setTimeout(() => {
        const endNow = performance.now();
        const duration = endNow - startTime;
        const endOrigin = performance.timeOrigin;
        framesDrawnInTheLastSecond.push(endNow + endOrigin);
        const framesInTheLastSecond = framesDrawnInTheLastSecond.filter(
          (frameAt) => endNow + endOrigin - frameAt <= 1e3
        );
        const fps2 = framesInTheLastSecond.length;
        framesDrawnInTheLastSecond = framesInTheLastSecond;
        const taskConsideredDirty = taskDirtyAt !== null && taskDirtyOrigin !== null ? endNow + endOrigin - (taskDirtyOrigin + taskDirtyAt) < 100 : null;
        const wasTaskInfluencedByToolbar = overToolbar !== null && overToolbar;
        if (duration > HIGH_SEVERITY_FPS_DROP_TIME && !taskConsideredDirty && document.visibilityState === "visible" && !wasTaskInfluencedByToolbar) {
          const endAt = endOrigin + endNow;
          const startAt = startTime + startOrigin;
          toolbarEventStore.getState().actions.addEvent({
            kind: "long-render",
            id: not_globally_unique_generateId(),
            data: {
              endAt,
              startAt,
              meta: {
                // oxlint-disable-next-line typescript/no-non-null-assertion
                fiberRenders: accumulatedFiberRendersOverTask,
                latency: duration,
                fps: fps2
              }
            }
          });
        }
        taskDirtyAt = null;
        taskDirtyOrigin = null;
        unSub == null ? void 0 : unSub();
        measure();
      }, 0);
    });
    return unSub;
  }
  const measureUnSub = measure();
  return () => {
    measureUnSub();
    cancelAnimationFrame(rafHandle);
    clearTimeout(timeoutHandle);
  };
}
var startTimingTracking = () => {
  const unSubPerformance = setupPerformancePublisher();
  const unSubMouseOver = trackCurrentMouseOverToolbar();
  const unSubDirtyTaskTracking = startDirtyTaskTracking();
  const unSubLongPipelineTracking = startLongPipelineTracking();
  const onComplete = async (_7, finalInteraction, event) => {
    toolbarEventStore.getState().actions.addEvent({
      kind: "interaction",
      id: not_globally_unique_generateId(),
      data: {
        startAt: finalInteraction.detailedTiming.blockingTimeStart,
        endAt: performance.now() + performance.timeOrigin,
        meta: { ...finalInteraction, kind: event.kind }
        // TODO, will need interaction specific metadata here
      }
    });
    const existingCompletedInteractions = performanceEntryChannels.getChannelState("recording");
    finalInteraction.detailedTiming.stopListeningForRenders();
    if (existingCompletedInteractions.length) {
      performanceEntryChannels.updateChannelState(
        "recording",
        () => new BoundedArray(MAX_CHANNEL_SIZE)
      );
    }
  };
  const unSubDetailedPointerTiming = setupDetailedPointerTimingListener(
    "pointer",
    {
      onComplete
    }
  );
  const unSubDetailedKeyboardTiming = setupDetailedPointerTimingListener(
    "keyboard",
    {
      onComplete
    }
  );
  const unSubInteractions = listenForPerformanceEntryInteractions(
    (completedInteraction) => {
      interactionStore.setState(
        BoundedArray.fromArray(
          interactionStore.getCurrentState().concat(completedInteraction),
          MAX_INTERACTION_BATCH
        )
      );
    }
  );
  return () => {
    unSubMouseOver();
    unSubDirtyTaskTracking();
    unSubLongPipelineTracking();
    unSubPerformance();
    unSubDetailedPointerTiming();
    unSubInteractions();
    unSubDetailedKeyboardTiming();
  };
};
var getComponentName = (path) => {
  var _a;
  const filteredPath = path.filter((item) => item.length > 2);
  if (filteredPath.length === 0) {
    return (_a = path.at(-1)) != null ? _a : "Unknown";
  }
  return filteredPath.at(-1);
};
var getTotalTime = (timing) => {
  switch (timing.kind) {
    case "interaction": {
      const {
        renderTime,
        otherJSTime,
        framePreparation,
        frameConstruction,
        frameDraw
      } = timing;
      return renderTime + otherJSTime + framePreparation + frameConstruction + (frameDraw != null ? frameDraw : 0);
    }
    case "dropped-frames": {
      return timing.otherTime + timing.renderTime;
    }
  }
};
var isRenderMemoizable = (groupedFiberRender) => {
  if (groupedFiberRender.wasFiberRenderMount) {
    return false;
  }
  if (groupedFiberRender.hasMemoCache) {
    return false;
  }
  return groupedFiberRender.changes.context.length === 0 && groupedFiberRender.changes.props.length === 0 && groupedFiberRender.changes.state.length === 0;
};
var getEventSeverity = (event) => {
  const totalTime = getTotalTime(event.timing);
  switch (event.kind) {
    case "interaction": {
      if (totalTime < 200) return "low";
      if (totalTime < 500) return "needs-improvement";
      return "high";
    }
    case "dropped-frames": {
      if (totalTime < 50) return "low";
      if (totalTime < HIGH_SEVERITY_FPS_DROP_TIME) return "needs-improvement";
      return "high";
    }
  }
};
var useNotificationsContext = () => x3(NotificationStateContext);
var NotificationStateContext = X2(null);
var ChevronRight = ({
  size = 24,
  className
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: cn(["lucide lucide-chevron-right", className]),
    children: u5("path", { d: "m9 18 6-6-6-6" })
  }
);
var Notification = ({
  className = "",
  size = 24,
  events = []
}) => {
  const hasHighSeverity = events.includes(true);
  const totalSevere = events.filter((e5) => e5).length;
  const displayCount = totalSevere > 99 ? ">99" : totalSevere;
  const badgeSize = hasHighSeverity ? Math.max(size * 0.6, 14) : Math.max(size * 0.4, 6);
  return u5("div", { className: "relative", children: [
    u5(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: `lucide lucide-bell ${className}`,
        children: [
          u5("path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }),
          u5("path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" })
        ]
      }
    ),
    events.length > 0 && totalSevere > 0 && ReactScanInternals.options.value.showNotificationCount && u5(
      "div",
      {
        className: cn([
          "absolute",
          hasHighSeverity ? "-top-2.5 -right-2.5" : "-top-1 -right-1",
          "rounded-full",
          "flex items-center justify-center",
          "text-[8px] font-medium text-white",
          "aspect-square",
          hasHighSeverity ? "bg-red-500/90" : "bg-purple-500/90"
        ]),
        style: {
          width: `${badgeSize}px`,
          height: `${badgeSize}px`,
          padding: hasHighSeverity ? "0.5px" : "0"
        },
        children: hasHighSeverity && displayCount
      }
    )
  ] });
};
var CloseIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className,
    children: [
      u5("path", { d: "M18 6 6 18" }),
      u5("path", { d: "m6 6 12 12" })
    ]
  }
);
var VolumeOnIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className,
    children: [
      u5("path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" }),
      u5("path", { d: "M16 9a5 5 0 0 1 0 6" }),
      u5("path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728" })
    ]
  }
);
var VolumeOffIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className,
    children: [
      u5("path", { d: "M16 9a5 5 0 0 1 .95 2.293" }),
      u5("path", { d: "M19.364 5.636a9 9 0 0 1 1.889 9.96" }),
      u5("path", { d: "m2 2 20 20" }),
      u5("path", { d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" }),
      u5("path", { d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686" })
    ]
  }
);
var ArrowLeft = ({
  size = 24,
  className
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: cn(["lucide lucide-arrow-left", className]),
    children: [
      u5("path", { d: "m12 19-7-7 7-7" }),
      u5("path", { d: "M19 12H5" })
    ]
  }
);
var PointerIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className,
    children: [
      u5("path", { d: "M14 4.1 12 6" }),
      u5("path", { d: "m5.1 8-2.9-.8" }),
      u5("path", { d: "m6 12-1.9 2" }),
      u5("path", { d: "M7.2 2.2 8 5.1" }),
      u5("path", { d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" })
    ]
  }
);
var KeyboardIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className,
    children: [
      u5("path", { d: "M10 8h.01" }),
      u5("path", { d: "M12 12h.01" }),
      u5("path", { d: "M14 8h.01" }),
      u5("path", { d: "M16 12h.01" }),
      u5("path", { d: "M18 8h.01" }),
      u5("path", { d: "M6 8h.01" }),
      u5("path", { d: "M7 16h10" }),
      u5("path", { d: "M8 12h.01" }),
      u5("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" })
    ]
  }
);
var ClearIcon = ({
  className = "",
  size = 24
}) => {
  return u5(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      className,
      style: { transform: "rotate(180deg)" },
      children: [
        u5("circle", { cx: "12", cy: "12", r: "10" }),
        u5("path", { d: "m4.9 4.9 14.2 14.2" })
      ]
    }
  );
};
var TrendingDownIcon = ({
  className = "",
  size = 24
}) => u5(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      u5("polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }),
      u5("polyline", { points: "16 17 22 17 22 11" })
    ]
  }
);
var Popover = ({
  children,
  triggerContent,
  wrapperProps
}) => {
  const [popoverState, setPopoverState] = d4("closed");
  const [elBoundingRect, setElBoundingRect] = d4(null);
  const [viewportSize, setViewportSize] = d4({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const triggerRef = A3(null);
  const popoverRef = A3(null);
  const portalEl = x3(ToolbarElementContext);
  const isHoveredRef = A3(false);
  h4(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      updateRect();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const updateRect = () => {
    if (triggerRef.current && portalEl) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const portalRect = portalEl.getBoundingClientRect();
      const centerX = triggerRect.left + triggerRect.width / 2;
      const centerY = triggerRect.top;
      const rect = new DOMRect(
        centerX - portalRect.left,
        centerY - portalRect.top,
        triggerRect.width,
        triggerRect.height
      );
      setElBoundingRect(rect);
    }
  };
  h4(() => {
    updateRect();
  }, [triggerRef.current]);
  h4(() => {
    if (popoverState === "opening") {
      const timer = setTimeout(() => setPopoverState("open"), 120);
      return () => clearTimeout(timer);
    } else if (popoverState === "closing") {
      const timer = setTimeout(() => setPopoverState("closed"), 120);
      return () => clearTimeout(timer);
    }
  }, [popoverState]);
  h4(() => {
    const interval = setInterval(() => {
      if (!isHoveredRef.current && popoverState !== "closed") {
        setPopoverState("closing");
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [popoverState]);
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    updateRect();
    setPopoverState("opening");
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    updateRect();
    setPopoverState("closing");
  };
  const getPopoverPosition = () => {
    var _a;
    if (!elBoundingRect || !portalEl) return { top: 0, left: 0 };
    const portalRect = portalEl.getBoundingClientRect();
    const popoverWidth = 175;
    const popoverHeight = ((_a = popoverRef.current) == null ? void 0 : _a.offsetHeight) || 40;
    const safeArea = 5;
    const viewportX = elBoundingRect.x + portalRect.left;
    const viewportY = elBoundingRect.y + portalRect.top;
    let left = viewportX;
    let top = viewportY - 4;
    if (left - popoverWidth / 2 < safeArea) {
      left = safeArea + popoverWidth / 2;
    } else if (left + popoverWidth / 2 > viewportSize.width - safeArea) {
      left = viewportSize.width - safeArea - popoverWidth / 2;
    }
    if (top - popoverHeight < safeArea) {
      top = viewportY + elBoundingRect.height + 4;
    }
    return {
      top: top - portalRect.top,
      left: left - portalRect.left
    };
  };
  const popoverPosition = getPopoverPosition();
  return u5(S2, { children: [
    portalEl && elBoundingRect && popoverState !== "closed" && $2(
      u5(
        "div",
        {
          ref: popoverRef,
          className: cn([
            "absolute z-100 bg-white text-black rounded-lg px-3 py-2 shadow-lg",
            "transition-[opacity] duration-120 ease-out",
            'after:content-[""] after:absolute after:top-[100%]',
            "after:left-1/2 after:-translate-x-1/2",
            "after:w-[10px] after:h-[6px]",
            "after:border-l-[5px] after:border-l-transparent",
            "after:border-r-[5px] after:border-r-transparent",
            "after:border-t-[6px] after:border-t-white",
            "pointer-events-none",
            popoverState === "opening" || popoverState === "closing" ? "opacity-0" : "opacity-100"
          ]),
          style: {
            top: popoverPosition.top + "px",
            left: popoverPosition.left + "px",
            transform: `translate(-50%, calc(-100% - 4px)) scale(${popoverState === "open" ? 1 : 0.97})`,
            minWidth: "175px",
            willChange: "opacity, transform"
          },
          children
        }
      ),
      portalEl
    ),
    u5(
      "div",
      {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...wrapperProps,
        children: triggerContent
      }
    )
  ] });
};
var NotificationTabs = ({
  selectedEvent: _7
}) => {
  const { notificationState, setNotificationState, setRoute } = useNotificationsContext();
  return u5(
    "div",
    {
      className: cn([
        "flex w-full justify-between items-center px-3 py-2 text-xs"
      ]),
      children: [
        u5(
          "div",
          {
            className: cn([
              "bg-[#18181B] flex items-center gap-x-1 p-1 rounded-sm"
            ]),
            children: [
              u5(
                "button",
                {
                  onClick: () => {
                    setRoute({
                      route: "render-visualization",
                      routeMessage: null
                    });
                  },
                  className: cn([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    notificationState.route === "render-visualization" || notificationState.route === "render-explanation" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: "Ranked"
                }
              ),
              u5(
                "button",
                {
                  onClick: () => {
                    setRoute({
                      route: "other-visualization",
                      routeMessage: null
                    });
                  },
                  className: cn([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    notificationState.route === "other-visualization" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: "Overview"
                }
              ),
              u5(
                "button",
                {
                  onClick: () => {
                    setRoute({
                      route: "optimize",
                      routeMessage: null
                    });
                  },
                  className: cn([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    notificationState.route === "optimize" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: u5("span", { children: "Prompts" })
                }
              )
            ]
          }
        ),
        u5(
          Popover,
          {
            triggerContent: u5(
              "button",
              {
                onClick: () => {
                  setNotificationState((prev) => {
                    if (prev.audioNotificationsOptions.enabled && prev.audioNotificationsOptions.audioContext.state !== "closed") {
                      prev.audioNotificationsOptions.audioContext.close();
                    }
                    const prevEnabledState = prev.audioNotificationsOptions.enabled;
                    localStorage.setItem(
                      "react-scan-notifications-audio",
                      String(!prevEnabledState)
                    );
                    const audioContext = new AudioContext();
                    if (!prev.audioNotificationsOptions.enabled) {
                      playNotificationSound(audioContext);
                    }
                    if (prevEnabledState) {
                      audioContext.close();
                    }
                    return {
                      ...prev,
                      audioNotificationsOptions: prevEnabledState ? {
                        audioContext: null,
                        enabled: false
                      } : {
                        audioContext,
                        enabled: true
                      }
                    };
                  });
                },
                className: "ml-auto",
                children: u5(
                  "div",
                  {
                    className: cn([
                      "flex gap-x-2 justify-center items-center text-[#6E6E77]"
                    ]),
                    children: [
                      u5("span", { children: "Alerts" }),
                      notificationState.audioNotificationsOptions.enabled ? u5(VolumeOnIcon, { size: 16, className: "text-[#6E6E77]" }) : u5(VolumeOffIcon, { size: 16, className: "text-[#6E6E77]" })
                    ]
                  }
                )
              }
            ),
            children: u5(S2, { children: "Play a chime when a slowdown is recorded" })
          }
        )
      ]
    }
  );
};
var formatReactData = (groupedFiberRenders) => {
  let text = "";
  const filteredFibers = groupedFiberRenders.toSorted((a5, b5) => b5.totalTime - a5.totalTime).slice(0, 30).filter((fiber) => fiber.totalTime > 5);
  filteredFibers.forEach((fiberRender) => {
    let localText = "";
    localText += "Component Name:";
    localText += fiberRender.name;
    localText += "\n";
    localText += `Rendered: ${fiberRender.count} times
`;
    localText += `Sum of self times for ${fiberRender.name} is ${fiberRender.totalTime.toFixed(0)}ms
`;
    if (fiberRender.changes.props.length > 0) {
      localText += `Changed props for all ${fiberRender.name} instances ("name:count" pairs)
`;
      fiberRender.changes.props.forEach((change) => {
        localText += `${change.name}:${change.count}x
`;
      });
    }
    if (fiberRender.changes.state.length > 0) {
      localText += `Changed state for all ${fiberRender.name} instances ("hook index:count" pairs)
`;
      fiberRender.changes.state.forEach((change) => {
        localText += `${change.index}:${change.count}x
`;
      });
    }
    if (fiberRender.changes.context.length > 0) {
      localText += `Changed context for all ${fiberRender.name} instances ("context display name (if exists):count" pairs)
`;
      fiberRender.changes.context.forEach((change) => {
        localText += `${change.name}:${change.count}x
`;
      });
    }
    text += localText;
    text += "\n";
  });
  return text;
};
var generateInteractionDataPrompt = ({
  renderTime,
  eHandlerTimeExcludingRenders,
  toRafTime,
  commitTime,
  framePresentTime,
  formattedReactData
}) => {
  return `I will provide you with a set of high level, and low level performance data about an interaction in a React App:
### High level
- react component render time: ${renderTime.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${eHandlerTimeExcludingRenders.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${toRafTime.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${commitTime.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${framePresentTime === null ? "" : `- how long it took from dom commit for the frame to be presented: ${framePresentTime.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${formattedReactData}`;
};
var generateInteractionOptimizationPrompt = ({
  interactionType,
  name,
  componentPath,
  time,
  renderTime,
  eHandlerTimeExcludingRenders,
  toRafTime,
  commitTime,
  framePresentTime,
  formattedReactData
}) => `You will attempt to implement a performance improvement to a user interaction in a React app. You will be provided with data about the interaction, and the slow down.

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.


Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)

The interaction was a ${interactionType} on the component named ${name}. This component has the following ancestors ${componentPath}. This is the path from the component, to the root. This should be enough information to figure out where this component is in the user's code base

This path is the component that was clicked, so it should tell you roughly where component had an event handler that triggered a state change.

Please note that the leaf node of this path might not be user code (if they use a UI library), and they may contain many wrapper components that just pass through children that aren't relevant to the actual click. So make you sure analyze the path and understand what the user code is doing

We have a set of high level, and low level data about the performance issue.

The click took ${time.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${renderTime.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${eHandlerTimeExcludingRenders.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${toRafTime.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${commitTime.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${framePresentTime === null ? "" : `- how long it took from dom commit for the frame to be presented: ${framePresentTime.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${formattedReactData}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could have been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

`;
var generateFrameDropOptimizationPrompt = ({
  renderTime,
  otherTime,
  formattedReactData
}) => `You will attempt to implement a performance improvement to a large slowdown in a react app

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.

Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)


We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${renderTime.toFixed(0)}ms
- other time: ${otherTime}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${formattedReactData}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could have been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

If renders don't seem to be the problem, see if there are any expensive CSS properties being added/mutated, or any expensive DOM Element mutations/new elements being created that could cause this slowdown. 
`;
var generateFrameDropExplanationPrompt = ({
  renderTime,
  otherTime,
  formattedReactData
}) => `Your goal will be to help me find the source of a performance problem in a React App. I collected a large dataset about this specific performance problem.

We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${renderTime.toFixed(0)}ms
- other time (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${otherTime}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${formattedReactData}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could have been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one, and this can add significant overhead when thousands of effects ran.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`;
var generateFrameDropDataPrompt = ({
  renderTime,
  otherTime,
  formattedReactData
}) => `I will provide you with a set of high level, and low level performance data about a large frame drop in a React App:
### High level
- react component render time: ${renderTime.toFixed(0)}ms
- how long it took to run everything else (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${otherTime}ms

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${formattedReactData}`;
var generateInteractionExplanationPrompt = ({
  interactionType,
  name,
  time,
  renderTime,
  eHandlerTimeExcludingRenders,
  toRafTime,
  commitTime,
  framePresentTime,
  formattedReactData
}) => `Your goal will be to help me find the source of a performance problem. I collected a large dataset about this specific performance problem.

There was a ${interactionType} on a component named ${name}. This means, roughly, the component that handled the ${interactionType} event was named ${name}.

We have a set of high level, and low level data about the performance issue.

The click took ${time.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${renderTime.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${eHandlerTimeExcludingRenders.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${toRafTime.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${commitTime.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${framePresentTime === null ? "" : `- how long it took from dom commit for the frame to be presented: ${framePresentTime.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${formattedReactData}


You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could have been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`;
var getLLMPrompt = (activeTab, selectedEvent) => iife(() => {
  switch (activeTab) {
    case "data": {
      switch (selectedEvent.kind) {
        case "dropped-frames": {
          return generateFrameDropDataPrompt({
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            otherTime: selectedEvent.timing.otherTime
          });
        }
        case "interaction": {
          return generateInteractionDataPrompt({
            commitTime: selectedEvent.timing.frameConstruction,
            eHandlerTimeExcludingRenders: selectedEvent.timing.otherJSTime,
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            framePresentTime: selectedEvent.timing.frameDraw,
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            toRafTime: selectedEvent.timing.framePreparation
          });
        }
      }
    }
    case "explanation": {
      switch (selectedEvent.kind) {
        case "dropped-frames": {
          return generateFrameDropExplanationPrompt({
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            otherTime: selectedEvent.timing.otherTime
          });
        }
        case "interaction": {
          return generateInteractionExplanationPrompt({
            commitTime: selectedEvent.timing.frameConstruction,
            eHandlerTimeExcludingRenders: selectedEvent.timing.otherJSTime,
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            framePresentTime: selectedEvent.timing.frameDraw,
            interactionType: selectedEvent.type,
            name: getComponentName(selectedEvent.componentPath),
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            time: getTotalTime(selectedEvent.timing),
            toRafTime: selectedEvent.timing.framePreparation
          });
        }
      }
    }
    case "fix": {
      switch (selectedEvent.kind) {
        case "dropped-frames": {
          return generateFrameDropOptimizationPrompt({
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            otherTime: selectedEvent.timing.otherTime
          });
        }
        case "interaction": {
          return generateInteractionOptimizationPrompt({
            commitTime: selectedEvent.timing.frameConstruction,
            componentPath: selectedEvent.componentPath.join(">"),
            eHandlerTimeExcludingRenders: selectedEvent.timing.otherJSTime,
            formattedReactData: formatReactData(
              selectedEvent.groupedFiberRenders
            ),
            framePresentTime: selectedEvent.timing.frameDraw,
            interactionType: selectedEvent.type,
            name: getComponentName(selectedEvent.componentPath),
            renderTime: selectedEvent.groupedFiberRenders.reduce(
              (prev, curr) => prev + curr.totalTime,
              0
            ),
            time: getTotalTime(selectedEvent.timing),
            toRafTime: selectedEvent.timing.framePreparation
          });
        }
      }
    }
  }
});
var Optimize = ({
  selectedEvent
}) => {
  const [activeTab, setActiveTab] = d4(
    "fix"
  );
  const [copying, setCopying] = d4(false);
  return u5("div", { className: cn(["w-full h-full"]), children: [
    u5(
      "div",
      {
        className: cn([
          "border border-[#27272A] rounded-sm h-4/5 text-xs overflow-hidden"
        ]),
        children: [
          u5("div", { className: cn(["bg-[#18181B] p-1 rounded-t-sm"]), children: u5("div", { className: cn(["flex items-center gap-x-1"]), children: [
            u5(
              "button",
              {
                onClick: () => setActiveTab("fix"),
                className: cn([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  activeTab === "fix" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Fix"
              }
            ),
            u5(
              "button",
              {
                onClick: () => setActiveTab("explanation"),
                className: cn([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  activeTab === "explanation" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Explanation"
              }
            ),
            u5(
              "button",
              {
                onClick: () => setActiveTab("data"),
                className: cn([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  activeTab === "data" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Data"
              }
            )
          ] }) }),
          u5("div", { className: cn(["overflow-y-auto h-full"]), children: u5(
            "pre",
            {
              className: cn([
                "p-2 h-full",
                "whitespace-pre-wrap break-words",
                "text-gray-300 font-mono "
              ]),
              children: getLLMPrompt(activeTab, selectedEvent)
            }
          ) })
        ]
      }
    ),
    u5(
      "button",
      {
        onClick: async () => {
          const text = getLLMPrompt(activeTab, selectedEvent);
          await navigator.clipboard.writeText(text);
          setCopying(true);
          setTimeout(() => setCopying(false), 1e3);
        },
        className: cn([
          "mt-4 px-4 py-2 bg-[#18181B] text-[#6E6E77] rounded-sm",
          "hover:text-white transition-colors duration-200",
          "flex items-center justify-center gap-x-2 text-xs"
        ]),
        children: [
          u5("span", { children: copying ? "Copied!" : "Copy Prompt" }),
          u5(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: cn([
                "transition-transform duration-200",
                copying && "scale-110"
              ]),
              children: copying ? u5("path", { d: "M20 6L9 17l-5-5" }) : u5(S2, { children: [
                u5("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
                u5("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
              ] })
            }
          )
        ]
      }
    )
  ] });
};
var getTimeData = (selectedEvent, isProduction2) => {
  switch (selectedEvent.kind) {
    // todo: push instead of conditional spread
    case "dropped-frames": {
      const timeData = [
        ...isProduction2 ? [
          {
            name: "Total Processing Time",
            time: getTotalTime(selectedEvent.timing),
            color: "bg-red-500",
            kind: "total-processing-time"
          }
        ] : [
          {
            name: "Renders",
            time: selectedEvent.timing.renderTime,
            color: "bg-purple-500",
            kind: "render"
          },
          {
            name: "JavaScript, DOM updates, Draw Frame",
            time: selectedEvent.timing.otherTime,
            color: "bg-[#4b4b4b]",
            kind: "other-frame-drop"
          }
        ]
      ];
      return timeData;
    }
    case "interaction": {
      const timeData = [
        ...!isProduction2 ? [
          {
            name: "Renders",
            time: selectedEvent.timing.renderTime,
            color: "bg-purple-500",
            kind: "render"
          }
        ] : [],
        {
          name: isProduction2 ? "React Renders, Hooks, Other JavaScript" : "JavaScript/React Hooks ",
          time: selectedEvent.timing.otherJSTime,
          color: "bg-[#EFD81A]",
          kind: "other-javascript"
        },
        {
          name: "Update DOM and Draw New Frame",
          time: getTotalTime(selectedEvent.timing) - selectedEvent.timing.renderTime - selectedEvent.timing.otherJSTime,
          color: "bg-[#1D3A66]",
          kind: "other-not-javascript"
        }
      ];
      return timeData;
    }
  }
};
var OtherVisualization = ({
  selectedEvent
}) => {
  var _a, _b;
  const [isProduction2] = d4((_a = getIsProduction()) != null ? _a : false);
  const { notificationState } = useNotificationsContext();
  const [expandedItems, setExpandedItems] = d4(
    ((_b = notificationState.routeMessage) == null ? void 0 : _b.name) ? [notificationState.routeMessage.name] : []
  );
  const timeData = getTimeData(selectedEvent, isProduction2);
  const root = x3(ToolbarElementContext);
  h4(() => {
    var _a2;
    if ((_a2 = notificationState.routeMessage) == null ? void 0 : _a2.name) {
      const container = root == null ? void 0 : root.querySelector("#overview-scroll-container");
      const element = root == null ? void 0 : root.querySelector(
        `#react-scan-overview-bar-${notificationState.routeMessage.name}`
      );
      if (container && element) {
        const elementTop = element.getBoundingClientRect().top;
        const containerTop = container.getBoundingClientRect().top;
        const scrollOffset = elementTop - containerTop;
        container.scrollTop = container.scrollTop + scrollOffset;
      }
    }
  }, [notificationState.route]);
  h4(() => {
    if (notificationState.route === "other-visualization") {
      setExpandedItems(
        (prev) => {
          var _a2;
          return ((_a2 = notificationState.routeMessage) == null ? void 0 : _a2.name) ? [notificationState.routeMessage.name] : prev;
        }
      );
    }
  }, [notificationState.route]);
  const totalTime = timeData.reduce((acc, item) => acc + item.time, 0);
  return u5("div", { className: "rounded-sm border border-zinc-800 text-xs", children: [
    u5("div", { className: "p-2 border-b border-zinc-800 bg-zinc-900/50", children: u5("div", { className: "flex items-center justify-between", children: [
      u5("h3", { className: "text-xs font-medium", children: "What was time spent on?" }),
      u5("span", { className: "text-xs text-zinc-400", children: [
        "Total: ",
        totalTime.toFixed(0),
        "ms"
      ] })
    ] }) }),
    u5("div", { className: "divide-y divide-zinc-800", children: timeData.map((entry) => {
      const isExpanded = expandedItems.includes(entry.kind);
      return u5("div", { id: `react-scan-overview-bar-${entry.kind}`, children: [
        u5(
          "button",
          {
            onClick: () => setExpandedItems(
              (prev) => prev.includes(entry.kind) ? prev.filter((item) => item !== entry.kind) : [...prev, entry.kind]
            ),
            className: "w-full px-3 py-2 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors",
            children: u5("div", { className: "flex-1", children: [
              u5("div", { className: "flex items-center justify-between mb-2", children: [
                u5("div", { className: "flex items-center gap-0.5", children: [
                  u5(
                    "svg",
                    {
                      className: `h-4 w-4 text-zinc-400 transition-transform ${isExpanded ? "rotate-90" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: u5(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M9 5l7 7-7 7"
                        }
                      )
                    }
                  ),
                  u5("span", { className: "font-medium flex items-center text-left", children: entry.name })
                ] }),
                u5("span", { className: " text-zinc-400", children: [
                  entry.time.toFixed(0),
                  "ms"
                ] })
              ] }),
              u5("div", { className: "h-1 bg-zinc-800 rounded-full overflow-hidden", children: u5(
                "div",
                {
                  className: `h-full ${entry.color} transition-all`,
                  style: {
                    width: `${entry.time / totalTime * 100}%`
                  }
                }
              ) })
            ] })
          }
        ),
        isExpanded && u5("div", { className: "bg-zinc-900/30 border-t border-zinc-800 px-2.5 py-3", children: u5("p", { className: " text-zinc-400 mb-4 text-xs", children: iife(() => {
          switch (selectedEvent.kind) {
            case "interaction": {
              switch (entry.kind) {
                case "render": {
                  return u5(
                    Explanation,
                    {
                      input: getRenderInput(selectedEvent)
                    }
                  );
                }
                case "other-javascript": {
                  return u5(
                    Explanation,
                    {
                      input: getJSInput(selectedEvent)
                    }
                  );
                }
                case "other-not-javascript": {
                  return u5(
                    Explanation,
                    {
                      input: getDrawInput(selectedEvent)
                    }
                  );
                }
              }
            }
            case "dropped-frames": {
              switch (entry.kind) {
                case "total-processing-time": {
                  return u5(
                    Explanation,
                    {
                      input: {
                        kind: "total-processing",
                        data: {
                          time: getTotalTime(selectedEvent.timing)
                        }
                      }
                    }
                  );
                }
                case "render": {
                  return u5(S2, { children: u5(
                    Explanation,
                    {
                      input: {
                        kind: "render",
                        data: {
                          topByTime: selectedEvent.groupedFiberRenders.toSorted(
                            (a5, b5) => b5.totalTime - a5.totalTime
                          ).slice(0, 3).map((render2) => ({
                            name: render2.name,
                            percentage: render2.totalTime / getTotalTime(
                              selectedEvent.timing
                            )
                          }))
                        }
                      }
                    }
                  ) });
                }
                case "other-frame-drop": {
                  return u5(
                    Explanation,
                    {
                      input: {
                        kind: "other"
                      }
                    }
                  );
                }
              }
            }
          }
        }) }) })
      ] }, entry.kind);
    }) })
  ] });
};
var getDrawInput = (event) => {
  const renderCount = event.groupedFiberRenders.reduce(
    (prev, curr) => prev + curr.count,
    0
  );
  const renderTime = event.timing.renderTime;
  const totalTime = getTotalTime(event.timing);
  const renderPercentage = renderTime / totalTime * 100;
  if (renderCount > 100) {
    return {
      kind: "high-render-count-update-dom-draw-frame",
      data: {
        count: renderCount,
        percentageOfTotal: renderPercentage,
        copyButton: u5(CopyPromptButton, {})
      }
    };
  }
  return {
    kind: "update-dom-draw-frame",
    data: {
      copyButton: u5(CopyPromptButton, {})
    }
  };
};
var CopyPromptButton = () => {
  const [copying, setCopying] = d4(false);
  const { notificationState } = useNotificationsContext();
  return u5(
    "button",
    {
      onClick: async () => {
        if (!notificationState.selectedEvent) {
          return;
        }
        await navigator.clipboard.writeText(
          getLLMPrompt("explanation", notificationState.selectedEvent)
        );
        setCopying(true);
        setTimeout(() => setCopying(false), 1e3);
      },
      className: "bg-zinc-800 flex hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded gap-x-3",
      children: [
        u5("span", { children: copying ? "Copied!" : "Copy Prompt" }),
        u5(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: cn([
              "transition-transform duration-200",
              copying && "scale-110"
            ]),
            children: copying ? u5("path", { d: "M20 6L9 17l-5-5" }) : u5(S2, { children: [
              u5("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
              u5("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
            ] })
          }
        )
      ]
    }
  );
};
var getRenderInput = (event) => {
  if (event.timing.renderTime / getTotalTime(event.timing) > 0.3) {
    return {
      kind: "render",
      data: {
        topByTime: event.groupedFiberRenders.toSorted((a5, b5) => b5.totalTime - a5.totalTime).slice(0, 3).map((e5) => ({
          percentage: e5.totalTime / getTotalTime(event.timing),
          name: e5.name
        }))
      }
    };
  }
  return {
    kind: "other"
  };
};
var getJSInput = (event) => {
  const renderCount = event.groupedFiberRenders.reduce(
    (prev, curr) => prev + curr.count,
    0
  );
  if (event.timing.otherJSTime / getTotalTime(event.timing) < 0.2) {
    return {
      kind: "js-explanation-base"
    };
  }
  if (event.groupedFiberRenders.find((render2) => render2.count > 200) || event.groupedFiberRenders.reduce((prev, curr) => prev + curr.count, 0) > 500) {
    return {
      kind: "high-render-count-high-js",
      data: {
        renderCount,
        topByCount: event.groupedFiberRenders.filter((groupedRender) => groupedRender.count > 100).toSorted((a5, b5) => b5.count - a5.count).slice(0, 3)
      }
    };
  }
  if (event.timing.otherJSTime / getTotalTime(event.timing) > 0.3) {
    if (event.timing.renderTime > 0.2) {
      return {
        kind: "js-explanation-base"
      };
    }
    return {
      kind: "low-render-count-high-js",
      data: {
        renderCount
      }
    };
  }
  return {
    kind: "js-explanation-base"
  };
};
var Explanation = ({ input }) => {
  switch (input.kind) {
    case "total-processing": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: [
              "This is the time it took to draw the entire frame that was presented to the user. To be at 60FPS, this number needs to be ",
              "<=16ms"
            ] }),
            u5("p", { children: 'To debug the issue, check the "Ranked" tab to see if there are significant component renders' }),
            u5("p", { children: "On a production React build, React Scan can't access the time it took for component to render. To get that information, run React Scan on a development build" }),
            u5("p", { children: [
              "To understand precisely what caused the slowdown while in production, use the ",
              u5("strong", { children: "Chrome profiler" }),
              " and analyze the function call times."
            ] }),
            u5("p", {})
          ]
        }
      );
    }
    case "render": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "This is the time it took React to run components, and internal logic to handle the output of your component." }),
            u5("div", { className: cn(["flex flex-col"]), children: [
              u5("p", { children: "The slowest components for this time period were:" }),
              input.data.topByTime.map((item) => u5("div", { children: [
                u5("strong", { children: item.name }),
                ":",
                " ",
                (item.percentage * 100).toFixed(0),
                "% of total"
              ] }, item.name))
            ] }),
            u5("p", { children: 'To view the render times of all your components, and what caused them to render, go to the "Ranked" tab' }),
            u5("p", { children: 'The "Ranked" tab shows the render times of every component.' }),
            u5("p", { children: "The render times of the same components are grouped together into one bar." }),
            u5("p", { children: "Clicking the component will show you what props, state, or context caused the component to re-render." })
          ]
        }
      );
    }
    case "js-explanation-base": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            u5("p", { children: [
              "The most common culprit for high JS time is expensive hooks, like expensive callbacks inside of ",
              u5("code", { children: "useEffect" }),
              "'s or a large number of useEffect's called, but this can also be JavaScript event handlers (",
              u5("code", { children: "'onclick'" }),
              ", ",
              u5("code", { children: "'onchange'" }),
              ") that performed expensive computation."
            ] }),
            u5("p", { children: "If you have lots of components rendering that call hooks, like useEffect, it can add significant overhead even if the callbacks are not expensive. If this is the case, you can try optimizing the renders of those components to avoid the hook from having to run." }),
            u5("p", { children: [
              "You should profile your app using the",
              " ",
              u5("strong", { children: "Chrome DevTools profiler" }),
              " to learn exactly which functions took the longest to execute."
            ] })
          ]
        }
      );
    }
    case "high-render-count-high-js": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            input.data.renderCount === 0 ? u5(S2, { children: [
              u5("p", { children: "There were no renders, which means nothing related to React caused this slowdown. The most likely cause of the slowdown is a slow JavaScript event handler, or code related to a Web API" }),
              u5("p", { children: [
                "You should try to reproduce the slowdown while profiling your website with the",
                u5("strong", { children: "Chrome DevTools profiler" }),
                " to see exactly what functions took the longest to execute."
              ] })
            ] }) : u5(S2, { children: [
              " ",
              u5("p", { children: [
                "There were ",
                u5("strong", { children: input.data.renderCount }),
                " renders, which could have contributed to the high JavaScript/Hook time if they ran lots of hooks, like ",
                u5("code", { children: "useEffects" }),
                "."
              ] }),
              u5("div", { className: cn(["flex flex-col"]), children: [
                u5("p", { children: "You should try optimizing the renders of:" }),
                input.data.topByCount.map((item) => u5("div", { children: [
                  "- ",
                  u5("strong", { children: item.name }),
                  " (rendered ",
                  item.count,
                  "x)"
                ] }, item.name))
              ] }),
              "and then checking if the problem still exists.",
              u5("p", { children: [
                "You can also try profiling your app using the",
                " ",
                u5("strong", { children: "Chrome DevTools profiler" }),
                " to see exactly what functions took the longest to execute."
              ] })
            ] })
          ]
        }
      );
    }
    case "low-render-count-high-js": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            u5("p", { children: [
              "There were only ",
              u5("strong", { children: input.data.renderCount }),
              " renders detected, which means either you had very expensive hooks like",
              " ",
              u5("code", { children: "useEffect" }),
              "/",
              u5("code", { children: "useLayoutEffect" }),
              ", or there is other JavaScript running during this interaction that took up the majority of the time."
            ] }),
            u5("p", { children: [
              "To understand precisely what caused the slowdown, use the",
              " ",
              u5("strong", { children: "Chrome profiler" }),
              " and analyze the function call times."
            ] })
          ]
        }
      );
    }
    case "high-render-count-update-dom-draw-frame": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction." }),
            u5("p", { children: "This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations." }),
            u5("p", { children: [
              "During this interaction, there were",
              " ",
              u5("strong", { children: input.data.count }),
              " renders, which was",
              " ",
              u5("strong", { children: [
                input.data.percentageOfTotal.toFixed(0),
                "%"
              ] }),
              " of the time spent processing"
            ] }),
            u5("p", { children: "The work performed as a result of the renders may have forced the browser to spend a lot of time to draw the next frame." }),
            u5("p", { children: 'You can try optimizing the renders to see if the performance problem still exists using the "Ranked" tab.' }),
            u5("p", { children: "If you use an AI-based code editor, you can export the performance data collected as a prompt." }),
            u5("p", { children: input.data.copyButton }),
            u5("p", { children: "Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem." }),
            u5("p", { children: 'For a larger selection of prompts, try the "Prompts" tab' })
          ]
        }
      );
    }
    case "update-dom-draw-frame": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: "These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction." }),
            u5("p", { children: "This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations." }),
            u5("p", { children: "If you use an AI-based code editor, you can export the performance data collected as a prompt." }),
            u5("p", { children: input.data.copyButton }),
            u5("p", { children: "Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem." }),
            u5("p", { children: 'For a larger selection of prompts, try the "Prompts" tab' })
          ]
        }
      );
    }
    case "other": {
      return u5(
        "div",
        {
          className: cn([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            u5("p", { children: [
              "This is the time it took to run everything other than React renders. This can be hooks like ",
              u5("code", { children: "useEffect" }),
              ", other JavaScript not part of React, or work the browser has to do to update the DOM and draw the next frame."
            ] }),
            u5("p", { children: [
              "To get a better picture of what happened, profile your app using the",
              " ",
              u5("strong", { children: "Chrome profiler" }),
              " when the performance problem arises."
            ] })
          ]
        }
      );
    }
  }
};
var highlightCanvas = null;
var highlightCtx = null;
var animationFrame = null;
var HighlightStore = y4({
  kind: "idle",
  current: null
});
var currFrame = null;
var lastFrameTime = 0;
var FADE_SPEED = 1.8;
var MAX_DELTA = 0.05;
var DEFAULT_DELTA = 1 / 60;
var drawHighlights = () => {
  if (currFrame) {
    cancelAnimationFrame(currFrame);
  }
  currFrame = requestAnimationFrame((timestamp) => {
    if (!highlightCanvas || !highlightCtx) {
      return;
    }
    const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1e3, MAX_DELTA) : DEFAULT_DELTA;
    lastFrameTime = timestamp;
    const step = FADE_SPEED * dt;
    highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
    const color = "hsl(271, 76%, 53%)";
    const state = HighlightStore.value;
    const { alpha, current } = iife(() => {
      var _a, _b, _c;
      switch (state.kind) {
        case "transition": {
          const current2 = ((_a = state.current) == null ? void 0 : _a.alpha) && state.current.alpha > 0 ? state.current : state.transitionTo;
          return {
            alpha: current2 ? current2.alpha : 0,
            current: current2
          };
        }
        case "move-out": {
          return { alpha: (_c = (_b = state.current) == null ? void 0 : _b.alpha) != null ? _c : 0, current: state.current };
        }
        case "idle": {
          return { alpha: 1, current: state.current };
        }
      }
      state;
    });
    current == null ? void 0 : current.rects.forEach((rect) => {
      if (!highlightCtx) {
        return;
      }
      highlightCtx.shadowColor = color;
      highlightCtx.shadowBlur = 6;
      highlightCtx.strokeStyle = color;
      highlightCtx.lineWidth = 2;
      highlightCtx.globalAlpha = alpha;
      highlightCtx.beginPath();
      highlightCtx.rect(rect.left, rect.top, rect.width, rect.height);
      highlightCtx.stroke();
      highlightCtx.shadowBlur = 0;
      highlightCtx.beginPath();
      highlightCtx.rect(rect.left, rect.top, rect.width, rect.height);
      highlightCtx.stroke();
    });
    switch (state.kind) {
      case "move-out": {
        if (state.current.alpha === 0) {
          HighlightStore.value = {
            kind: "idle",
            current: null
          };
          lastFrameTime = 0;
          return;
        }
        if (state.current.alpha <= 0.01) {
          state.current.alpha = 0;
        }
        state.current.alpha = Math.max(0, state.current.alpha - step);
        drawHighlights();
        return;
      }
      case "transition": {
        if (state.current && state.current.alpha > 0) {
          state.current.alpha = Math.max(0, state.current.alpha - step);
          drawHighlights();
          return;
        }
        if (state.transitionTo.alpha === 1) {
          HighlightStore.value = {
            kind: "idle",
            current: state.transitionTo
          };
          lastFrameTime = 0;
          return;
        }
        state.transitionTo.alpha = Math.min(state.transitionTo.alpha + step, 1);
        drawHighlights();
      }
      case "idle": {
        lastFrameTime = 0;
        return;
      }
    }
  });
};
var handleResizeListener = null;
var createHighlightCanvas = (root) => {
  highlightCanvas = document.createElement("canvas");
  highlightCtx = highlightCanvas.getContext("2d", { alpha: true });
  if (!highlightCtx) return null;
  const dpr2 = window.devicePixelRatio || 1;
  const { innerWidth, innerHeight } = window;
  highlightCanvas.style.width = `${innerWidth}px`;
  highlightCanvas.style.height = `${innerHeight}px`;
  highlightCanvas.width = innerWidth * dpr2;
  highlightCanvas.height = innerHeight * dpr2;
  highlightCanvas.style.position = "fixed";
  highlightCanvas.style.left = "0";
  highlightCanvas.style.top = "0";
  highlightCanvas.style.pointerEvents = "none";
  highlightCanvas.style.zIndex = "2147483600";
  highlightCtx.scale(dpr2, dpr2);
  root.appendChild(highlightCanvas);
  if (handleResizeListener) {
    window.removeEventListener("resize", handleResizeListener);
  }
  const handleResize = () => {
    if (!highlightCanvas || !highlightCtx) return;
    const dpr3 = window.devicePixelRatio || 1;
    const { innerWidth: innerWidth2, innerHeight: innerHeight2 } = window;
    highlightCanvas.style.width = `${innerWidth2}px`;
    highlightCanvas.style.height = `${innerHeight2}px`;
    highlightCanvas.width = innerWidth2 * dpr3;
    highlightCanvas.height = innerHeight2 * dpr3;
    highlightCtx.scale(dpr3, dpr3);
    drawHighlights();
  };
  handleResizeListener = handleResize;
  window.addEventListener("resize", handleResize);
  HighlightStore.subscribe(() => {
    requestAnimationFrame(() => {
      drawHighlights();
    });
  });
  return cleanup2;
};
function cleanup2() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  if (highlightCanvas == null ? void 0 : highlightCanvas.parentNode) {
    highlightCanvas.parentNode.removeChild(highlightCanvas);
  }
  highlightCanvas = null;
  highlightCtx = null;
}
var fadeOutHighlights = () => {
  var _a, _b;
  const curr = HighlightStore.value.current ? HighlightStore.value.current : HighlightStore.value.kind === "transition" ? HighlightStore.value.transitionTo : null;
  if (!curr) {
    return;
  }
  if (HighlightStore.value.kind === "transition") {
    HighlightStore.value = {
      kind: "move-out",
      // because we want to dynamically fade this value
      current: ((_a = HighlightStore.value.current) == null ? void 0 : _a.alpha) === 0 ? (
        // we want to only start fading from transition if current is done animating out
        HighlightStore.value.transitionTo
      ) : (
        // if current doesn't exist then transition must exist
        (_b = HighlightStore.value.current) != null ? _b : HighlightStore.value.transitionTo
      )
    };
    return;
  }
  HighlightStore.value = {
    kind: "move-out",
    current: {
      alpha: 0,
      ...curr
    }
  };
};
var RenderBarChart = ({
  selectedEvent
}) => {
  const totalInteractionTime = getTotalTime(selectedEvent.timing);
  const nonRender = totalInteractionTime - selectedEvent.timing.renderTime;
  const [isProduction2] = d4(getIsProduction());
  const events = selectedEvent.groupedFiberRenders;
  const bars = events.map((event) => ({
    event,
    kind: "render",
    totalTime: isProduction2 ? event.count : event.totalTime
  }));
  const isShowingExtraInfo = iife(() => {
    switch (selectedEvent.kind) {
      case "dropped-frames": {
        return selectedEvent.timing.renderTime / totalInteractionTime < 0.1;
      }
      case "interaction": {
        return (selectedEvent.timing.otherJSTime + selectedEvent.timing.renderTime) / totalInteractionTime < 0.2;
      }
    }
  });
  if (selectedEvent.kind === "interaction" && !isProduction2) {
    bars.push({
      kind: "other-javascript",
      totalTime: selectedEvent.timing.otherJSTime
    });
  }
  if (isShowingExtraInfo && !isProduction2) {
    if (selectedEvent.kind === "interaction") {
      bars.push({
        kind: "other-not-javascript",
        totalTime: getTotalTime(selectedEvent.timing) - selectedEvent.timing.renderTime - selectedEvent.timing.otherJSTime
      });
    } else {
      bars.push({
        kind: "other-frame-drop",
        totalTime: nonRender
      });
    }
  }
  const debouncedMouseEnter = A3({
    lastCallAt: null,
    timer: null
  });
  const totalBarTime = bars.reduce((prev, curr) => prev + curr.totalTime, 0);
  return u5("div", { className: cn(["flex flex-col h-full w-full gap-y-1"]), children: [
    iife(() => {
      if (isProduction2 && bars.length === 0) {
        return u5("div", { className: "flex flex-col items-center justify-center h-full text-zinc-400", children: [
          u5("p", { className: "text-sm w-full text-left text-white mb-1.5", children: "No data available" }),
          u5("p", { className: "text-x w-full text-lefts", children: "No data was collected during this period" })
        ] });
      }
      if (bars.length === 0) {
        return u5("div", { className: "flex flex-col items-center justify-center h-full text-zinc-400", children: [
          u5("p", { className: "text-sm w-full text-left text-white mb-1.5", children: "No renders collected" }),
          u5("p", { className: "text-x w-full text-lefts", children: "There were no renders during this period" })
        ] });
      }
    }),
    bars.toSorted((a5, b5) => b5.totalTime - a5.totalTime).map((bar) => u5(
      RenderBar,
      {
        bars,
        bar,
        debouncedMouseEnter,
        totalBarTime,
        isProduction: isProduction2
      },
      bar.kind === "render" ? bar.event.id : bar.kind
    ))
  ] });
};
var getTransitionState = (state) => {
  if (!state.current) {
    return "fading-in";
  }
  if (state.current.alpha > 0) {
    return "fading-out";
  }
  return "fading-in";
};
var RenderBar = ({
  bar,
  debouncedMouseEnter,
  totalBarTime,
  isProduction: isProduction2,
  bars,
  depth = 0
}) => {
  const { setNotificationState, setRoute } = useNotificationsContext();
  const [isExpanded, setIsExpanded] = d4(false);
  const isLeaf = bar.kind === "render" ? bar.event.parents.size === 0 : true;
  const parentBars = bars.filter(
    (otherBar) => otherBar.kind === "render" && bar.kind === "render" ? bar.event.parents.has(otherBar.event.name) && otherBar.event.name !== bar.event.name : false
  );
  const missingParentNames = bar.kind === "render" ? Array.from(bar.event.parents).filter(
    (parentName) => !bars.some(
      (b5) => b5.kind === "render" && b5.event.name === parentName
    )
  ) : [];
  const handleBarClick = () => {
    if (bar.kind === "render") {
      setNotificationState((prev) => ({
        ...prev,
        selectedFiber: bar.event
      }));
      setRoute({
        route: "render-explanation",
        routeMessage: null
      });
    } else {
      setRoute({
        route: "other-visualization",
        routeMessage: {
          kind: "auto-open-overview-accordion",
          name: bar.kind
        }
      });
    }
  };
  return u5("div", { className: "w-full", children: [
    u5(
      "div",
      {
        className: cn(["w-full flex items-center relative text-xs min-w-0"]),
        children: [
          u5(
            "button",
            {
              onMouseLeave: () => {
                debouncedMouseEnter.current.timer && clearTimeout(debouncedMouseEnter.current.timer);
                fadeOutHighlights();
              },
              onMouseEnter: async () => {
                const highlightBars = async () => {
                  debouncedMouseEnter.current.lastCallAt = Date.now();
                  if (bar.kind !== "render") {
                    const curr = HighlightStore.value.current ? HighlightStore.value.current : HighlightStore.value.kind === "transition" ? HighlightStore.value.transitionTo : null;
                    if (!curr) {
                      HighlightStore.value = {
                        kind: "idle",
                        current: null
                      };
                      return;
                    }
                    HighlightStore.value = {
                      kind: "move-out",
                      current: {
                        alpha: 0,
                        ...curr
                      }
                    };
                    return;
                  }
                  const state = HighlightStore.value;
                  const currentState = iife(() => {
                    switch (state.kind) {
                      case "transition": {
                        return state.transitionTo;
                      }
                      case "idle":
                      case "move-out": {
                        return state.current;
                      }
                    }
                  });
                  const stateRects = [];
                  if (state.kind === "transition") {
                    const transitionState = getTransitionState(state);
                    iife(() => {
                      switch (transitionState) {
                        case "fading-in": {
                          HighlightStore.value = {
                            kind: "transition",
                            current: state.transitionTo,
                            transitionTo: {
                              rects: stateRects,
                              alpha: 0,
                              name: bar.event.name
                            }
                          };
                          return;
                        }
                        case "fading-out": {
                          HighlightStore.value = {
                            kind: "transition",
                            current: HighlightStore.value.current ? {
                              alpha: 0,
                              ...HighlightStore.value.current
                            } : null,
                            transitionTo: {
                              rects: stateRects,
                              alpha: 0,
                              name: bar.event.name
                            }
                          };
                          return;
                        }
                      }
                    });
                  } else {
                    HighlightStore.value = {
                      kind: "transition",
                      transitionTo: {
                        rects: stateRects,
                        alpha: 0,
                        name: bar.event.name
                      },
                      current: currentState ? {
                        alpha: 0,
                        ...currentState
                      } : null
                    };
                  }
                  const trueElements = bar.event.elements.filter(
                    (element) => element instanceof Element
                  );
                  for await (const entries of getBatchedRectMap(trueElements)) {
                    entries.forEach(({ boundingClientRect }) => {
                      stateRects.push(boundingClientRect);
                    });
                    drawHighlights();
                  }
                };
                if (debouncedMouseEnter.current.lastCallAt && Date.now() - debouncedMouseEnter.current.lastCallAt < 200) {
                  debouncedMouseEnter.current.timer && clearTimeout(debouncedMouseEnter.current.timer);
                  debouncedMouseEnter.current.timer = setTimeout(() => {
                    highlightBars();
                  }, 200);
                  return;
                }
                highlightBars();
              },
              onClick: handleBarClick,
              className: cn([
                "h-full w-[90%] flex items-center hover:bg-[#0f0f0f] rounded-l-md min-w-0 relative"
              ]),
              children: [
                u5(
                  "div",
                  {
                    style: {
                      minWidth: "fit-content",
                      width: `${bar.totalTime / totalBarTime * 100}%`
                    },
                    className: cn([
                      "flex items-center rounded-sm text-white text-xs h-[28px] shrink-0",
                      bar.kind === "render" && "bg-[#412162] group-hover:bg-[#5b2d89]",
                      bar.kind === "other-frame-drop" && "bg-[#44444a] group-hover:bg-[#6a6a6a]",
                      bar.kind === "other-javascript" && "bg-[#efd81a6b] group-hover:bg-[#efda1a2f]",
                      bar.kind === "other-not-javascript" && "bg-[#214379d4] group-hover:bg-[#21437982]"
                    ])
                  }
                ),
                u5(
                  "div",
                  {
                    className: cn([
                      "absolute inset-0 flex items-center px-2",
                      "min-w-0"
                    ]),
                    children: u5("div", { className: "flex items-center gap-x-2 min-w-0 w-full", children: [
                      u5("span", { className: cn(["truncate"]), children: iife(() => {
                        switch (bar.kind) {
                          case "other-frame-drop": {
                            return "JavaScript, DOM updates, Draw Frame";
                          }
                          case "other-javascript": {
                            return "JavaScript/React Hooks";
                          }
                          case "other-not-javascript": {
                            return "Update DOM and Draw New Frame";
                          }
                          case "render": {
                            return bar.event.name;
                          }
                        }
                      }) }),
                      bar.kind === "render" && isRenderMemoizable(bar.event) && u5(
                        "div",
                        {
                          style: {
                            lineHeight: "10px"
                          },
                          className: cn([
                            "px-1 py-0.5 bg-[#6a369e] flex items-center rounded-sm font-semibold text-[8px] shrink-0"
                          ]),
                          children: "Memoizable"
                        }
                      )
                    ] })
                  }
                )
              ]
            }
          ),
          u5(
            "button",
            {
              onClick: () => bar.kind === "render" && !isLeaf && setIsExpanded(!isExpanded),
              className: cn([
                "flex items-center min-w-fit shrink-0 rounded-r-md h-[28px]",
                !isLeaf && "hover:bg-[#0f0f0f]",
                bar.kind === "render" && !isLeaf ? "cursor-pointer" : "cursor-default"
              ]),
              children: [
                u5("div", { className: "w-[20px] flex items-center justify-center", children: bar.kind === "render" && !isLeaf && u5(
                  ChevronRight,
                  {
                    className: cn(
                      "transition-transform",
                      isExpanded && "rotate-90"
                    ),
                    size: 16
                  }
                ) }),
                u5(
                  "div",
                  {
                    style: {
                      minWidth: isLeaf ? "fit-content" : isProduction2 ? "30px" : "60px"
                    },
                    className: "flex items-center justify-end gap-x-1",
                    children: [
                      bar.kind === "render" && u5("span", { className: cn(["text-[10px]"]), children: [
                        "x",
                        bar.event.count
                      ] }),
                      (bar.kind !== "render" || !isProduction2) && u5("span", { className: "text-[10px] text-[#7346a0] pr-1", children: [
                        bar.totalTime < 1 ? "<1" : bar.totalTime.toFixed(0),
                        "ms"
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          depth === 0 && u5(
            "div",
            {
              className: cn([
                "absolute right-0 top-1/2 transition-none -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-16",
                "pointer-events-none"
              ]),
              children: "Click to learn more"
            }
          )
        ]
      }
    ),
    isExpanded && (parentBars.length > 0 || missingParentNames.length > 0) && u5("div", { className: "pl-3 flex flex-col gap-y-1 mt-1", children: [
      parentBars.toSorted((a5, b5) => b5.totalTime - a5.totalTime).map((parentBar, i5) => u5(
        RenderBar,
        {
          depth: depth + 1,
          bar: parentBar,
          debouncedMouseEnter,
          totalBarTime,
          isProduction: isProduction2,
          bars
        },
        i5
      )),
      missingParentNames.map((parentName) => u5("div", { className: "w-full", children: u5("div", { className: "w-full flex items-center relative text-xs", children: u5("div", { className: "h-full w-full flex items-center relative", children: [
        u5("div", { className: "flex items-center rounded-sm text-white text-xs h-[28px] w-full" }),
        u5("div", { className: "absolute inset-0 flex items-center px-2", children: u5("span", { className: "truncate whitespace-nowrap text-white/70 w-full", children: parentName }) })
      ] }) }) }, parentName))
    ] })
  ] });
};
var RenderExplanation = ({
  selectedEvent: _7,
  selectedFiber
}) => {
  const { setRoute } = useNotificationsContext();
  const [tipisShown, setTipIsShown] = d4(true);
  const [isProduction2] = d4(getIsProduction());
  _4(() => {
    const res = localStorage.getItem("react-scan-tip-shown");
    const asBool = res === "true" ? true : res === "false" ? false : null;
    if (asBool === null) {
      setTipIsShown(true);
      localStorage.setItem("react-scan-tip-is-shown", "true");
      return;
    }
    if (!asBool) {
      setTipIsShown(false);
    }
  }, []);
  const isMemoizable = selectedFiber.changes.context.length === 0 && selectedFiber.changes.props.length === 0 && selectedFiber.changes.state.length === 0;
  return u5(
    "div",
    {
      className: cn([
        "w-full min-h-fit h-full flex flex-col py-4 pt-0 rounded-sm"
      ]),
      children: [
        u5("div", { className: cn(["flex items-start gap-x-4 "]), children: [
          u5(
            "button",
            {
              onClick: () => {
                setRoute({
                  route: "render-visualization",
                  routeMessage: null
                });
              },
              className: cn([
                "text-white hover:bg-[#34343b] flex gap-x-1 justify-center items-center mb-4 w-fit px-2.5 py-1.5 text-xs rounded-sm bg-[#18181B]"
              ]),
              children: [
                u5(ArrowLeft, { size: 14 }),
                " ",
                u5("span", { children: "Overview" })
              ]
            }
          ),
          u5("div", { className: cn(["flex flex-col gap-y-1"]), children: [
            u5(
              "div",
              {
                className: cn(["text-sm font-bold text-white overflow-x-hidden"]),
                children: u5("div", { className: "flex items-center gap-x-2 truncate", children: selectedFiber.name })
              }
            ),
            u5("div", { className: cn(["flex gap-x-2"]), children: [
              !isProduction2 && u5(S2, { children: u5("div", { className: cn(["text-xs text-gray-400"]), children: [
                "• Render time: ",
                selectedFiber.totalTime.toFixed(0),
                "ms"
              ] }) }),
              u5("div", { className: cn(["text-xs text-gray-400 mb-4"]), children: [
                "• Renders: ",
                selectedFiber.count,
                "x"
              ] })
            ] })
          ] })
        ] }),
        tipisShown && !isMemoizable && u5(
          "div",
          {
            className: cn([
              "w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex relative"
            ]),
            children: [
              u5(
                "button",
                {
                  onClick: () => {
                    setTipIsShown(false);
                    localStorage.setItem("react-scan-tip-shown", "false");
                  },
                  className: cn([
                    "absolute right-2 top-2 rounded-sm p-1 hover:bg-[#18181B]"
                  ]),
                  children: u5(CloseIcon, { size: 12 })
                }
              ),
              u5("div", { className: cn(["w-1 bg-[#d36cff]"]) }),
              u5("div", { className: cn(["flex-1"]), children: [
                u5(
                  "div",
                  {
                    className: cn(["px-3 py-2 text-gray-100 text-xs font-semibold"]),
                    children: "How to stop renders"
                  }
                ),
                u5("div", { className: cn(["px-3 pb-2 text-gray-400 text-[10px]"]), children: "Stop the following props, state and context from changing between renders, and wrap the component in React.memo if not already" })
              ] })
            ]
          }
        ),
        isMemoizable && u5(
          "div",
          {
            className: cn([
              "w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex"
            ]),
            children: [
              u5("div", { className: cn(["w-1 bg-[#d36cff]"]) }),
              u5("div", { className: cn(["flex-1"]), children: [
                u5(
                  "div",
                  {
                    className: cn(["px-3 py-2 text-gray-100 text-sm font-semibold"]),
                    children: "No changes detected"
                  }
                ),
                u5("div", { className: cn(["px-3 pb-2 text-gray-400 text-xs"]), children: "This component would not have rendered if it was memoized" })
              ] })
            ]
          }
        ),
        u5("div", { className: cn(["flex w-full"]), children: [
          u5(
            "div",
            {
              className: cn([
                "flex flex-col border border-[#27272A] rounded-l-sm overflow-hidden w-1/3"
              ]),
              children: [
                u5(
                  "div",
                  {
                    className: cn([
                      "text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed Props"
                  }
                ),
                selectedFiber.changes.props.length > 0 ? selectedFiber.changes.props.toSorted((a5, b5) => b5.count - a5.count).map((change) => u5(
                  "div",
                  {
                    className: cn([
                      "flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]"
                    ]),
                    children: [
                      u5("span", { className: cn(["text-white "]), children: change.name }),
                      u5(
                        "div",
                        {
                          className: cn([" text-[8px]  text-[#d36cff] pl-1 py-1 "]),
                          children: [
                            change.count,
                            "/",
                            selectedFiber.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  change.name
                )) : u5(
                  "div",
                  {
                    className: cn([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          ),
          u5(
            "div",
            {
              className: cn([
                "flex flex-col border border-[#27272A] border-l-0 overflow-hidden w-1/3"
              ]),
              children: [
                u5(
                  "div",
                  {
                    className: cn([
                      " text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed State"
                  }
                ),
                selectedFiber.changes.state.length > 0 ? selectedFiber.changes.state.toSorted((a5, b5) => b5.count - a5.count).map((change) => u5(
                  "div",
                  {
                    className: cn([
                      "flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]"
                    ]),
                    children: [
                      u5("span", { className: cn(["text-white "]), children: [
                        "index ",
                        change.index
                      ] }),
                      u5(
                        "div",
                        {
                          className: cn([
                            "rounded-full  text-[#d36cff] pl-1 py-1 text-[8px]"
                          ]),
                          children: [
                            change.count,
                            "/",
                            selectedFiber.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  change.index
                )) : u5(
                  "div",
                  {
                    className: cn([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          ),
          u5(
            "div",
            {
              className: cn([
                "flex flex-col border border-[#27272A] border-l-0 rounded-r-sm overflow-hidden w-1/3"
              ]),
              children: [
                u5(
                  "div",
                  {
                    className: cn([
                      " text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed Context"
                  }
                ),
                selectedFiber.changes.context.length > 0 ? selectedFiber.changes.context.toSorted((a5, b5) => b5.count - a5.count).map((change) => u5(
                  "div",
                  {
                    className: cn([
                      "flex flex-col justify-between items-center border-t  border-[#27272A] px-1 py-1 bg-[#0A0A0A] text-[10px] overflow-x-auto"
                    ]),
                    children: [
                      u5("span", { className: cn(["text-white "]), children: change.name }),
                      u5(
                        "div",
                        {
                          className: cn([
                            "rounded-full text-[#d36cff] pl-1 py-1 text-[8px] text-wrap"
                          ]),
                          children: [
                            change.count,
                            "/",
                            selectedFiber.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  change.name
                )) : u5(
                  "div",
                  {
                    className: cn([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A] py-2"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
};
var DetailsRoutes = () => {
  const { notificationState, setNotificationState } = useNotificationsContext();
  const [dots, setDots] = d4("...");
  const containerRef = A3(null);
  h4(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  if (!notificationState.selectedEvent) {
    return u5(
      "div",
      {
        ref: containerRef,
        className: cn([
          "h-full w-full flex flex-col items-center justify-center relative py-2 px-4"
        ]),
        children: [
          u5(
            "div",
            {
              className: cn([
                "p-2 flex justify-center items-center border-[#27272A] absolute top-0 right-0"
              ]),
              children: u5(
                "button",
                {
                  onClick: () => {
                    signalWidgetViews.value = {
                      view: "none"
                    };
                  },
                  children: u5(CloseIcon, { size: 18, className: "text-[#6F6F78]" })
                }
              )
            }
          ),
          u5(
            "div",
            {
              className: cn([
                "flex flex-col items-start pt-5 bg-[#0A0A0A] p-5 rounded-sm max-w-md",
                " shadow-lg"
              ]),
              children: u5("div", { className: cn(["flex flex-col items-start gap-y-4"]), children: [
                u5("div", { className: cn(["flex items-center"]), children: u5("span", { className: cn(["text-zinc-400 font-medium text-[17px]"]), children: [
                  "Scanning for slowdowns",
                  dots
                ] }) }),
                notificationState.events.length !== 0 && u5("p", { className: cn(["text-xs"]), children: [
                  "Click on an item in the",
                  " ",
                  u5("span", { className: cn(["text-purple-400"]), children: "History" }),
                  " list to get started"
                ] }),
                u5("p", { className: cn(["text-zinc-600 text-xs"]), children: "You don't need to keep this panel open for React Scan to record slowdowns" }),
                u5("p", { className: cn(["text-zinc-600 text-xs"]), children: "Enable audio alerts to hear a delightful ding every time a large slowdown is recorded" }),
                u5(
                  "button",
                  {
                    onClick: () => {
                      if (notificationState.audioNotificationsOptions.enabled) {
                        setNotificationState((prev) => {
                          var _a, _b;
                          if (((_a = prev.audioNotificationsOptions.audioContext) == null ? void 0 : _a.state) !== "closed") {
                            (_b = prev.audioNotificationsOptions.audioContext) == null ? void 0 : _b.close();
                          }
                          localStorage.setItem("react-scan-notifications-audio", "false");
                          return {
                            ...prev,
                            audioNotificationsOptions: {
                              audioContext: null,
                              enabled: false
                            }
                          };
                        });
                        return;
                      }
                      localStorage.setItem("react-scan-notifications-audio", "true");
                      const audioContext = new AudioContext();
                      playNotificationSound(audioContext);
                      setNotificationState((prev) => ({
                        ...prev,
                        audioNotificationsOptions: {
                          enabled: true,
                          audioContext
                        }
                      }));
                    },
                    className: cn([
                      "px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm w-full",
                      " text-sm flex items-center gap-x-2 justify-center"
                    ]),
                    children: notificationState.audioNotificationsOptions.enabled ? u5(S2, { children: u5("span", { className: "flex items-center gap-x-1", children: "Disable audio alerts" }) }) : u5(S2, { children: u5("span", { className: "flex items-center gap-x-1", children: "Enable audio alerts" }) })
                  }
                )
              ] })
            }
          )
        ]
      }
    );
  }
  switch (notificationState.route) {
    case "render-visualization": {
      return u5(TabLayout, { children: u5(RenderBarChart, { selectedEvent: notificationState.selectedEvent }) });
    }
    case "render-explanation": {
      if (!notificationState.selectedFiber) {
        throw new Error(
          "Invariant: must have selected fiber when viewing render explanation"
        );
      }
      return u5(TabLayout, { children: u5(
        RenderExplanation,
        {
          selectedFiber: notificationState.selectedFiber,
          selectedEvent: notificationState.selectedEvent
        }
      ) });
    }
    case "other-visualization": {
      return u5(TabLayout, { children: u5(
        "div",
        {
          className: cn(["flex w-full h-full flex-col overflow-y-auto"]),
          id: "overview-scroll-container",
          children: u5(
            OtherVisualization,
            {
              selectedEvent: notificationState.selectedEvent
            }
          )
        }
      ) });
    }
    case "optimize": {
      return u5(TabLayout, { children: u5(Optimize, { selectedEvent: notificationState.selectedEvent }) });
    }
  }
  notificationState.route;
};
var TabLayout = ({ children }) => {
  const { notificationState } = useNotificationsContext();
  if (!notificationState.selectedEvent) {
    throw new Error(
      "Invariant: d must have selected event when viewing render explanation"
    );
  }
  return u5("div", { className: cn([`w-full h-full flex flex-col gap-y-2`]), children: [
    u5("div", { className: cn(["h-[50px] w-full"]), children: u5(NotificationTabs, { selectedEvent: notificationState.selectedEvent }) }),
    u5(
      "div",
      {
        className: cn(["h-calc(100%-50px) flex flex-col overflow-y-auto px-3"]),
        children
      }
    )
  ] });
};
var NotificationHeader = ({
  selectedEvent
}) => {
  const severity = getEventSeverity(selectedEvent);
  switch (selectedEvent.kind) {
    case "interaction": {
      return (
        // h-[48px] is a hack to adjust for header size
        u5(
          "div",
          {
            className: cn([`w-full flex border-b border-[#27272A] min-h-[48px]`]),
            children: u5(
              "div",
              {
                className: cn([
                  "min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4"
                ]),
                children: [
                  u5("div", { className: cn(["flex items-center gap-x-2 "]), children: [
                    u5("span", { className: cn(["text-[#5a5a5a] mr-0.5"]), children: selectedEvent.type === "click" ? "Clicked " : "Typed in " }),
                    u5("span", { children: getComponentName(selectedEvent.componentPath) }),
                    u5(
                      "div",
                      {
                        className: cn([
                          "w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap",
                          severity === "low" && "bg-green-500/50",
                          severity === "needs-improvement" && "bg-[#b77116]",
                          severity === "high" && "bg-[#b94040]"
                        ]),
                        children: [
                          getTotalTime(selectedEvent.timing).toFixed(0),
                          "ms processing time"
                        ]
                      }
                    )
                  ] }),
                  u5(
                    "div",
                    {
                      className: cn(["flex items-center gap-x-2  justify-end ml-auto"]),
                      children: u5(
                        "div",
                        {
                          className: cn([
                            "p-2 flex justify-center items-center border-[#27272A]"
                          ]),
                          children: u5(
                            "button",
                            {
                              onClick: () => {
                                signalWidgetViews.value = {
                                  view: "none"
                                };
                              },
                              title: "Close",
                              children: u5(CloseIcon, { size: 18, className: "text-[#6F6F78]" })
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            )
          }
        )
      );
    }
    case "dropped-frames": {
      return u5(
        "div",
        {
          className: cn([`w-full flex border-b border-[#27272A] min-h-[48px]`]),
          children: u5(
            "div",
            {
              className: cn([
                "min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4"
              ]),
              children: [
                u5("div", { className: cn(["flex items-center gap-x-2 "]), children: [
                  "FPS Drop",
                  u5(
                    "div",
                    {
                      className: cn([
                        "w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap",
                        severity === "low" && "bg-green-500/50",
                        severity === "needs-improvement" && "bg-[#b77116]",
                        severity === "high" && "bg-[#b94040]"
                      ]),
                      children: [
                        "dropped to ",
                        selectedEvent.fps,
                        " FPS"
                      ]
                    }
                  )
                ] }),
                u5(
                  "div",
                  {
                    className: cn([
                      "flex items-center gap-x-2 w-2/4 justify-end ml-auto"
                    ]),
                    children: u5(
                      "div",
                      {
                        className: cn([
                          "p-2 flex justify-center items-center border-[#27272A]"
                        ]),
                        children: u5(
                          "button",
                          {
                            onClick: () => {
                              signalWidgetViews.value = {
                                view: "none"
                              };
                            },
                            children: u5(CloseIcon, { size: 18, className: "text-[#6F6F78]" })
                          }
                        )
                      }
                    )
                  }
                )
              ]
            }
          )
        }
      );
    }
  }
};
var useNestedFlash = ({
  flashingItemsCount,
  totalEvents
}) => {
  const [newFlash, setNewFlash] = d4(false);
  const flashedFor = A3(0);
  const lastFlashTime = A3(0);
  h4(() => {
    if (flashedFor.current >= totalEvents) {
      return;
    }
    const now = Date.now();
    const debounceTime = 250;
    const timeSinceLastFlash = now - lastFlashTime.current;
    if (timeSinceLastFlash >= debounceTime) {
      setNewFlash(false);
      const timeout2 = setTimeout(() => {
        flashedFor.current = totalEvents;
        lastFlashTime.current = Date.now();
        setNewFlash(true);
        setTimeout(() => {
          setNewFlash(false);
        }, 2e3);
      }, 50);
      return () => clearTimeout(timeout2);
    } else {
      const delayNeeded = debounceTime - timeSinceLastFlash;
      const timeout2 = setTimeout(() => {
        setNewFlash(false);
        setTimeout(() => {
          flashedFor.current = totalEvents;
          lastFlashTime.current = Date.now();
          setNewFlash(true);
          setTimeout(() => {
            setNewFlash(false);
          }, 2e3);
        }, 50);
      }, delayNeeded);
      return () => clearTimeout(timeout2);
    }
  }, [flashingItemsCount]);
  return newFlash;
};
var CollapsedItem = ({
  item,
  shouldFlash
}) => {
  var _a, _b;
  const [expanded, setExpanded] = d4(false);
  const severity = item.events.map(getEventSeverity).reduce((prev, curr) => {
    switch (curr) {
      case "high": {
        return "high";
      }
      case "needs-improvement": {
        return prev === "high" ? "high" : "needs-improvement";
      }
      case "low": {
        return prev;
      }
    }
  }, "low");
  const flashingItemsCount = item.events.reduce(
    (prev, curr) => shouldFlash(curr.id) ? prev + 1 : prev,
    0
  );
  const shouldFlashAgain = useNestedFlash({
    flashingItemsCount,
    totalEvents: item.events.length
  });
  return u5("div", { className: cn(["flex flex-col gap-y-0.5"]), children: [
    u5(
      "button",
      {
        onClick: () => setExpanded((expanded2) => !expanded2),
        className: cn([
          "pl-2 py-1.5  text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
          shouldFlashAgain && !expanded && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
        ]),
        children: [
          u5(
            "div",
            {
              className: cn([
                "w-4/5 flex items-center justify-start h-full text-xs truncate gap-x-1.5"
              ]),
              children: [
                u5("span", { className: cn(["min-w-fit"]), children: u5(
                  ChevronRight,
                  {
                    className: cn([
                      "text-[#A1A1AA] transition-transform",
                      expanded ? "rotate-90" : ""
                    ]),
                    size: 14
                  },
                  `chevron-${item.timestamp}`
                ) }),
                u5("span", { className: cn(["text-xs"]), children: item.kind === "collapsed-frame-drops" ? "FPS Drops" : getComponentName((_b = (_a = item.events.at(0)) == null ? void 0 : _a.componentPath) != null ? _b : []) })
              ]
            }
          ),
          u5(
            "div",
            {
              className: cn(["ml-auto min-w-fit flex justify-end items-center"]),
              children: u5(
                "div",
                {
                  style: {
                    lineHeight: "10px"
                  },
                  className: cn([
                    "w-fit flex items-center text-[10px] justify-center h-full text-white px-1 py-1 rounded-sm font-semibold",
                    severity === "low" && "bg-green-500/60",
                    severity === "needs-improvement" && "bg-[#b77116] text-[10px]",
                    severity === "high" && "bg-[#b94040]"
                  ]),
                  children: [
                    "x",
                    item.events.length
                  ]
                }
              )
            }
          )
        ]
      }
    ),
    expanded && u5(IndentedContent, { children: item.events.toSorted((a5, b5) => b5.timestamp - a5.timestamp).map((event) => u5(
      SlowdownHistoryItem,
      {
        event,
        shouldFlash: shouldFlash(event.id)
      }
    )) })
  ] });
};
var IndentedContent = ({
  children
}) => u5("div", { className: "relative pl-6 flex flex-col gap-y-1", children: [
  u5("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-[#27272A]" }),
  children
] });
var useFlashManager = (events) => {
  const prevEventsRef = A3([]);
  const [newEventIds, setNewEventIds] = d4(/* @__PURE__ */ new Set());
  const isInitialMount = A3(true);
  h4(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevEventsRef.current = events;
      return;
    }
    const currentIds = new Set(events.map((e5) => e5.id));
    const prevIds = new Set(prevEventsRef.current.map((e5) => e5.id));
    const newIds = /* @__PURE__ */ new Set();
    currentIds.forEach((id) => {
      if (!prevIds.has(id)) {
        newIds.add(id);
      }
    });
    if (newIds.size > 0) {
      setNewEventIds(newIds);
      setTimeout(() => {
        setNewEventIds(/* @__PURE__ */ new Set());
      }, 2e3);
    }
    prevEventsRef.current = events;
  }, [events]);
  return (id) => newEventIds.has(id);
};
var useFlash = ({ shouldFlash }) => {
  const [isFlashing, setIsFlashing] = d4(shouldFlash);
  h4(() => {
    if (shouldFlash) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 1e3);
      return () => clearTimeout(timer);
    }
  }, [shouldFlash]);
  return isFlashing;
};
var SlowdownHistoryItem = ({
  event,
  shouldFlash
}) => {
  var _a, _b;
  const { notificationState, setNotificationState } = useNotificationsContext();
  const severity = getEventSeverity(event);
  const isFlashing = useFlash({ shouldFlash });
  switch (event.kind) {
    case "interaction": {
      return u5(
        "button",
        {
          onClick: () => {
            setNotificationState((prev) => ({
              ...prev,
              selectedEvent: event,
              route: "render-visualization",
              selectedFiber: null
            }));
          },
          className: cn([
            "pl-2 py-1.5  text-sm flex w-full items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
            event.id === ((_a = notificationState.selectedEvent) == null ? void 0 : _a.id) && "bg-[#18181B]",
            isFlashing && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
          ]),
          children: [
            u5(
              "div",
              {
                className: cn([
                  "w-4/5 flex items-center justify-start h-full gap-x-1.5"
                ]),
                children: [
                  u5("span", { className: cn(["min-w-fit text-xs"]), children: iife(() => {
                    switch (event.type) {
                      case "click": {
                        return u5(PointerIcon, { size: 14 });
                      }
                      case "keyboard": {
                        return u5(KeyboardIcon, { size: 14 });
                      }
                    }
                  }) }),
                  u5("span", { className: cn(["text-xs pr-1 truncate"]), children: getComponentName(event.componentPath) })
                ]
              }
            ),
            u5(
              "div",
              {
                className: cn([" min-w-fit flex justify-end items-center ml-auto"]),
                children: u5(
                  "div",
                  {
                    style: {
                      lineHeight: "10px"
                    },
                    className: cn([
                      "gap-x-0.5 w-fit flex items-end justify-center h-full text-white px-1 py-1 rounded-sm font-semibold text-[10px]",
                      severity === "low" && "bg-green-500/50",
                      severity === "needs-improvement" && "bg-[#b77116] text-[10px]",
                      severity === "high" && "bg-[#b94040]"
                    ]),
                    children: u5(
                      "div",
                      {
                        style: {
                          lineHeight: "10px"
                        },
                        className: cn(["text-[10px] text-white flex items-end"]),
                        children: [
                          getTotalTime(event.timing).toFixed(0),
                          "ms"
                        ]
                      }
                    )
                  }
                )
              }
            )
          ]
        }
      );
    }
    case "dropped-frames": {
      return u5(
        "button",
        {
          onClick: () => {
            setNotificationState((prev) => ({
              ...prev,
              selectedEvent: event,
              // explicitly force back to render-visualization since the user might get confused when they don't see the detailed view immediately when clicking the view
              route: "render-visualization",
              selectedFiber: null
            }));
          },
          className: cn([
            "pl-2 py-1.5  w-full text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
            event.id === ((_b = notificationState.selectedEvent) == null ? void 0 : _b.id) && "bg-[#18181B]",
            isFlashing && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
          ]),
          children: [
            u5(
              "div",
              {
                className: cn([
                  "w-4/5 flex items-center justify-start h-full text-xs truncate"
                ]),
                children: [
                  u5(TrendingDownIcon, { size: 14, className: "mr-1.5" }),
                  " FPS Drop"
                ]
              }
            ),
            u5(
              "div",
              {
                className: cn([" min-w-fit flex justify-end items-center ml-auto"]),
                children: u5(
                  "div",
                  {
                    style: {
                      lineHeight: "10px"
                    },
                    className: cn([
                      "w-fit flex items-center justify-center h-full text-white px-1 py-1 rounded-sm text-[10px] font-bold",
                      severity === "low" && "bg-green-500/60",
                      severity === "needs-improvement" && "bg-[#b77116] text-[10px]",
                      severity === "high" && "bg-[#b94040]"
                    ]),
                    children: [
                      event.fps,
                      " FPS"
                    ]
                  }
                )
              }
            )
          ]
        }
      );
    }
  }
};
var collapseEvents = (events) => {
  const newEvents = events.reduce((prev, curr) => {
    const lastEvent = prev.at(-1);
    if (!lastEvent) {
      return [
        {
          kind: "single",
          event: curr,
          timestamp: curr.timestamp
        }
      ];
    }
    switch (lastEvent.kind) {
      case "collapsed-keyboard": {
        if (curr.kind === "interaction" && curr.type === "keyboard" && // must be on the same semantic component, it would be ideal to compare on fiberId, but i digress
        curr.componentPath.join("-") === lastEvent.events[0].componentPath.join("-")) {
          const eventsWithoutLast = prev.filter((e5) => e5 !== lastEvent);
          return [
            ...eventsWithoutLast,
            {
              kind: "collapsed-keyboard",
              events: [...lastEvent.events, curr],
              timestamp: Math.max(
                ...[...lastEvent.events, curr].map((e5) => e5.timestamp)
              )
            }
          ];
        }
        return [
          ...prev,
          {
            kind: "single",
            event: curr,
            timestamp: curr.timestamp
          }
        ];
      }
      case "single": {
        if (lastEvent.event.kind === "interaction" && lastEvent.event.type === "keyboard" && curr.kind === "interaction" && curr.type === "keyboard" && lastEvent.event.componentPath.join("-") === curr.componentPath.join("-")) {
          const eventsWithoutLast = prev.filter((e5) => e5 !== lastEvent);
          return [
            ...eventsWithoutLast,
            {
              kind: "collapsed-keyboard",
              events: [lastEvent.event, curr],
              timestamp: Math.max(lastEvent.event.timestamp, curr.timestamp)
            }
          ];
        }
        if (lastEvent.event.kind === "dropped-frames" && curr.kind === "dropped-frames") {
          const eventsWithoutLast = prev.filter((e5) => e5 !== lastEvent);
          return [
            ...eventsWithoutLast,
            {
              kind: "collapsed-frame-drops",
              events: [lastEvent.event, curr],
              timestamp: Math.max(lastEvent.event.timestamp, curr.timestamp)
            }
          ];
        }
        return [
          ...prev,
          {
            kind: "single",
            event: curr,
            timestamp: curr.timestamp
          }
        ];
      }
      case "collapsed-frame-drops": {
        if (curr.kind === "dropped-frames") {
          const eventsWithoutLast = prev.filter((e5) => e5 !== lastEvent);
          return [
            ...eventsWithoutLast,
            {
              kind: "collapsed-frame-drops",
              events: [...lastEvent.events, curr],
              timestamp: Math.max(
                ...[...lastEvent.events, curr].map((e5) => e5.timestamp)
              )
            }
          ];
        }
        return [
          ...prev,
          {
            kind: "single",
            event: curr,
            timestamp: curr.timestamp
          }
        ];
      }
    }
  }, []);
  return newEvents;
};
var useLaggedEvents = (lagMs = 150) => {
  const { notificationState } = useNotificationsContext();
  const [laggedEvents, setLaggedEvents] = d4(notificationState.events);
  h4(() => {
    setTimeout(() => {
      setLaggedEvents(notificationState.events);
    }, lagMs);
  }, [notificationState.events]);
  return [laggedEvents, setLaggedEvents];
};
var SlowdownHistory = () => {
  const { notificationState, setNotificationState } = useNotificationsContext();
  const shouldFlash = useFlashManager(notificationState.events);
  const [laggedEvents, setLaggedEvents] = useLaggedEvents();
  const collapsedEvents = collapseEvents(laggedEvents).toSorted(
    (a5, b5) => b5.timestamp - a5.timestamp
  );
  return u5(
    "div",
    {
      className: cn([
        `w-full h-full gap-y-2 flex flex-col border-r border-[#27272A] overflow-y-auto`
      ]),
      children: [
        u5(
          "div",
          {
            className: cn([
              "text-sm text-[#65656D] pl-3 pr-1 w-full flex items-center justify-between"
            ]),
            children: [
              u5("span", { children: "History" }),
              u5(
                Popover,
                {
                  wrapperProps: {
                    className: "h-full flex items-center justify-center ml-auto"
                  },
                  triggerContent: u5(
                    "button",
                    {
                      className: cn(["hover:bg-[#18181B] rounded-full p-2"]),
                      title: "Clear all events",
                      onClick: () => {
                        toolbarEventStore.getState().actions.clear();
                        setNotificationState((prev) => ({
                          ...prev,
                          selectedEvent: null,
                          selectedFiber: null,
                          route: prev.route === "other-visualization" ? "other-visualization" : "render-visualization"
                        }));
                        setLaggedEvents([]);
                      },
                      children: u5(ClearIcon, { className: cn([""]), size: 16 })
                    }
                  ),
                  children: u5("div", { className: cn(["w-full flex justify-center"]), children: "Clear all events" })
                }
              )
            ]
          }
        ),
        u5("div", { className: cn(["flex flex-col px-1 gap-y-1"]), children: [
          collapsedEvents.length === 0 && u5(
            "div",
            {
              className: cn([
                "flex items-center justify-center text-zinc-500 text-sm py-4"
              ]),
              children: "No Events"
            }
          ),
          collapsedEvents.map(
            (historyItem) => iife(() => {
              switch (historyItem.kind) {
                case "collapsed-keyboard": {
                  return u5(CollapsedItem, { shouldFlash, item: historyItem });
                }
                case "single": {
                  return u5(
                    SlowdownHistoryItem,
                    {
                      event: historyItem.event,
                      shouldFlash: shouldFlash(historyItem.event.id)
                    },
                    historyItem.event.id
                  );
                }
                case "collapsed-frame-drops": {
                  return u5(CollapsedItem, { shouldFlash, item: historyItem });
                }
              }
            })
          )
        ] })
      ]
    }
  );
};
var getGroupedFiberRenders = (fiberRenders) => {
  const res = Object.values(fiberRenders).map((render2) => ({
    id: not_globally_unique_generateId(),
    totalTime: render2.nodeInfo.reduce((prev, curr) => prev + curr.selfTime, 0),
    count: render2.nodeInfo.length,
    name: render2.nodeInfo[0].name,
    // invariant, at least one exists,
    deletedAll: false,
    parents: render2.parents,
    hasMemoCache: render2.hasMemoCache,
    wasFiberRenderMount: render2.wasFiberRenderMount,
    // it would be nice if we calculated the % of components memoizable, but this would have to be calculated downstream before it got aggregated
    elements: render2.nodeInfo.map((node) => node.element),
    changes: {
      context: render2.changes.fiberContext.current.filter(
        (change) => render2.changes.fiberContext.changesCounts.get(change.name)
      ).map((change) => {
        var _a;
        return {
          name: String(change.name),
          count: (_a = render2.changes.fiberContext.changesCounts.get(change.name)) != null ? _a : 0
        };
      }),
      props: render2.changes.fiberProps.current.filter(
        (change) => render2.changes.fiberProps.changesCounts.get(change.name)
      ).map((change) => {
        var _a;
        return {
          name: String(change.name),
          count: (_a = render2.changes.fiberProps.changesCounts.get(change.name)) != null ? _a : 0
        };
      }),
      state: render2.changes.fiberState.current.filter(
        (change) => render2.changes.fiberState.changesCounts.get(Number(change.name))
      ).map((change) => {
        var _a;
        return {
          index: change.name,
          count: (_a = render2.changes.fiberState.changesCounts.get(Number(change.name))) != null ? _a : 0
        };
      })
    }
  }));
  return res;
};
var useGarbageCollectElements = (notificationEvents) => {
  h4(() => {
    const checkElementsExistence = () => {
      notificationEvents.forEach((event) => {
        if (!event.groupedFiberRenders) return;
        event.groupedFiberRenders.forEach((render2) => {
          if (render2.deletedAll) return;
          if (!render2.elements || render2.elements.length === 0) {
            render2.deletedAll = true;
            return;
          }
          const initialLength = render2.elements.length;
          render2.elements = render2.elements.filter((element) => {
            return element && element.isConnected;
          });
          if (render2.elements.length === 0 && initialLength > 0) {
            render2.deletedAll = true;
          }
        });
      });
    };
    const intervalId = setInterval(checkElementsExistence, 5e3);
    return () => {
      clearInterval(intervalId);
    };
  }, [notificationEvents]);
};
var useAppNotifications = () => {
  const log2 = useToolbarEventLog();
  const notificationEvents = [];
  useGarbageCollectElements(notificationEvents);
  log2.state.events.forEach((event) => {
    const fiberRenders = event.kind === "interaction" ? event.data.meta.detailedTiming.fiberRenders : event.data.meta.fiberRenders;
    const groupedFiberRenders = getGroupedFiberRenders(fiberRenders);
    const renderTime = groupedFiberRenders.reduce(
      (prev, curr) => prev + curr.totalTime,
      0
    );
    switch (event.kind) {
      case "interaction": {
        const { commitEnd, jsEndDetail, interactionStartDetail, rafStart } = event.data.meta.detailedTiming;
        if (jsEndDetail - interactionStartDetail - renderTime < 0) {
          invariantError("js time must be longer than render time");
        }
        const otherJSTime = Math.max(
          0,
          jsEndDetail - interactionStartDetail - renderTime
        );
        const frameDraw = Math.max(
          event.data.meta.latency - (commitEnd - interactionStartDetail),
          0
        );
        notificationEvents.push({
          componentPath: event.data.meta.detailedTiming.componentPath,
          groupedFiberRenders,
          id: event.id,
          kind: "interaction",
          memory: null,
          timestamp: event.data.startAt,
          type: event.data.meta.detailedTiming.interactionType === "keyboard" ? "keyboard" : "click",
          timing: {
            renderTime,
            kind: "interaction",
            otherJSTime,
            framePreparation: rafStart - jsEndDetail,
            frameConstruction: commitEnd - rafStart,
            frameDraw
          }
        });
        return;
      }
      case "long-render": {
        notificationEvents.push({
          kind: "dropped-frames",
          id: event.id,
          memory: null,
          timing: {
            kind: "dropped-frames",
            renderTime,
            otherTime: event.data.meta.latency
          },
          groupedFiberRenders,
          timestamp: event.data.startAt,
          fps: event.data.meta.fps
        });
        return;
      }
    }
  });
  return notificationEvents;
};
var timeout = 1e3;
var NotificationAudio = () => {
  const { notificationState, setNotificationState } = useNotificationsContext();
  const playedFor = A3(null);
  const debounceTimeout = A3(null);
  const lastPlayedTime = A3(0);
  const [laggedEvents] = useLaggedEvents();
  const alertEventsCount = laggedEvents.filter(
    // todo: make this configurable
    (event) => getEventSeverity(event) === "high"
  ).length;
  h4(() => {
    const audioEnabledString = localStorage.getItem(
      "react-scan-notifications-audio"
    );
    if (audioEnabledString !== "false" && audioEnabledString !== "true") {
      localStorage.setItem("react-scan-notifications-audio", "false");
      return;
    }
    const audioEnabled = audioEnabledString === "false" ? false : true;
    if (audioEnabled) {
      setNotificationState((prev) => {
        if (prev.audioNotificationsOptions.enabled) {
          return prev;
        }
        return {
          ...prev,
          audioNotificationsOptions: {
            enabled: true,
            audioContext: new AudioContext()
          }
        };
      });
      return;
    }
  }, []);
  h4(() => {
    const { audioNotificationsOptions } = notificationState;
    if (!audioNotificationsOptions.enabled) {
      return;
    }
    if (alertEventsCount === 0) {
      return;
    }
    if (playedFor.current && playedFor.current >= alertEventsCount) {
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    const now = Date.now();
    const timeSinceLastPlay = now - lastPlayedTime.current;
    const remainingDebounceTime = Math.max(0, timeout - timeSinceLastPlay);
    debounceTimeout.current = setTimeout(() => {
      playNotificationSound(audioNotificationsOptions.audioContext);
      playedFor.current = alertEventsCount;
      lastPlayedTime.current = Date.now();
      debounceTimeout.current = null;
    }, remainingDebounceTime);
  }, [alertEventsCount]);
  h4(() => {
    if (alertEventsCount !== 0) {
      return;
    }
    playedFor.current = null;
  }, [alertEventsCount]);
  h4(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  return null;
};
var NotificationWrapper = D4((_7, ref) => {
  var _a;
  const events = useAppNotifications();
  const [notificationState, setNotificationState] = d4({
    detailsExpanded: false,
    events,
    filterBy: "latest",
    moreInfoExpanded: false,
    route: "render-visualization",
    selectedEvent: (_a = events.toSorted((a5, b5) => a5.timestamp - b5.timestamp).at(-1)) != null ? _a : null,
    selectedFiber: null,
    routeMessage: null,
    audioNotificationsOptions: {
      enabled: false,
      audioContext: null
    }
  });
  notificationState.events = events;
  return u5(
    NotificationStateContext.Provider,
    {
      value: {
        notificationState,
        setNotificationState,
        setRoute: ({ route, routeMessage }) => {
          setNotificationState((prev) => {
            const newState = { ...prev, route, routeMessage };
            switch (route) {
              case "render-visualization": {
                fadeOutHighlights();
                return {
                  ...newState,
                  selectedFiber: null
                };
              }
              case "optimize": {
                fadeOutHighlights();
                return {
                  ...newState,
                  selectedFiber: null
                };
              }
              case "other-visualization": {
                fadeOutHighlights();
                return {
                  ...newState,
                  selectedFiber: null
                };
              }
              case "render-explanation": {
                fadeOutHighlights();
                return newState;
              }
            }
            route;
          });
        }
      },
      children: [
        u5(NotificationAudio, {}),
        u5(Notifications, { ref })
      ]
    }
  );
});
var Notifications = D4((_7, ref) => {
  var _a;
  const { notificationState } = useNotificationsContext();
  return u5("div", { ref, className: cn(["h-full w-full flex flex-col"]), children: [
    notificationState.selectedEvent && u5(
      "div",
      {
        className: cn([
          "w-full h-[48px] flex flex-col",
          notificationState.moreInfoExpanded && "h-[235px]",
          notificationState.moreInfoExpanded && notificationState.selectedEvent.kind === "dropped-frames" && "h-[150px]"
        ]),
        children: [
          u5(NotificationHeader, { selectedEvent: notificationState.selectedEvent }),
          notificationState.moreInfoExpanded && u5(MoreInfo, {})
        ]
      }
    ),
    u5(
      "div",
      {
        className: cn([
          "flex ",
          notificationState.selectedEvent ? "h-[calc(100%-48px)]" : "h-full",
          notificationState.moreInfoExpanded && "h-[calc(100%-200px)]",
          notificationState.moreInfoExpanded && ((_a = notificationState.selectedEvent) == null ? void 0 : _a.kind) === "dropped-frames" && "h-[calc(100%-150px)]"
        ]),
        children: [
          u5("div", { className: cn(["h-full min-w-[200px]"]), children: u5(SlowdownHistory, {}) }),
          u5("div", { className: cn(["w-[calc(100%-200px)] h-full overflow-y-auto"]), children: u5(DetailsRoutes, {}) })
        ]
      }
    )
  ] });
});
var MoreInfo = () => {
  const { notificationState } = useNotificationsContext();
  if (!notificationState.selectedEvent) {
    throw new Error("Invariant must have selected event for more info");
  }
  const event = notificationState.selectedEvent;
  return u5(
    "div",
    {
      className: cn([
        "px-4 py-2 border-b border-[#27272A] bg-[#18181B]/50 h-[calc(100%-40px)]",
        event.kind === "dropped-frames" && `h-[calc(100%-25px)]`
      ]),
      children: u5("div", { className: cn(["flex flex-col gap-y-4 h-full"]), children: iife(() => {
        switch (event.kind) {
          case "interaction": {
            return u5(S2, { children: [
              u5("div", { className: cn(["flex items-center gap-x-3"]), children: [
                u5("span", { className: "text-[#6F6F78] text-xs font-medium", children: event.type === "click" ? "Clicked component location" : "Typed in component location" }),
                u5("div", { className: "font-mono text-[#E4E4E7] flex items-center bg-[#27272A] pl-2 py-1 rounded-sm overflow-x-auto", children: event.componentPath.toReversed().map((part, i5) => u5(S2, { children: [
                  u5(
                    "span",
                    {
                      style: {
                        lineHeight: "14px"
                      },
                      className: "text-[10px] whitespace-nowrap",
                      children: part
                    },
                    part
                  ),
                  i5 < event.componentPath.length - 1 && u5("span", { className: "text-[#6F6F78] mx-0.5", children: "‹" })
                ] })) })
              ] }),
              u5("div", { className: cn(["flex items-center gap-x-3"]), children: [
                u5("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Total Time" }),
                u5("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: [
                  getTotalTime(event.timing).toFixed(0),
                  "ms"
                ] })
              ] }),
              u5("div", { className: cn(["flex items-center gap-x-3"]), children: [
                u5("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Occurred" }),
                u5("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: `${((Date.now() - event.timestamp) / 1e3).toFixed(0)}s ago` })
              ] })
            ] });
          }
          case "dropped-frames": {
            return u5(S2, { children: [
              u5("div", { className: cn(["flex items-center gap-x-3"]), children: [
                u5("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Total Time" }),
                u5("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: [
                  getTotalTime(event.timing).toFixed(0),
                  "ms"
                ] })
              ] }),
              u5("div", { className: cn(["flex items-center gap-x-3"]), children: [
                u5("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Occurred" }),
                u5("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: `${((Date.now() - event.timestamp) / 1e3).toFixed(0)}s ago` })
              ] })
            ] });
          }
        }
      }) })
    }
  );
};
var Toolbar = constant(() => {
  var _a;
  const events = useAppNotifications();
  const [laggedEvents, setLaggedEvents] = d4(events);
  h4(() => {
    const timeout2 = setTimeout(() => {
      setLaggedEvents(events);
    }, 500 + 100);
    return () => {
      clearTimeout(timeout2);
    };
  }, [events]);
  const inspectState = Store.inspectState;
  const isInspectActive = inspectState.value.kind === "inspecting";
  const isInspectFocused = inspectState.value.kind === "focused";
  const [seenEvents, setSeenEvents] = d4([]);
  const onToggleInspect = q3(() => {
    const currentState = Store.inspectState.value;
    switch (currentState.kind) {
      case "inspecting": {
        signalWidgetViews.value = {
          view: "none"
        };
        Store.inspectState.value = {
          kind: "inspect-off"
        };
        return;
      }
      case "focused": {
        signalWidgetViews.value = {
          view: "inspector"
        };
        Store.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        };
        return;
      }
      // todo: auto select the root fibers first stateNode, and tell the user to select the element
      case "inspect-off": {
        signalWidgetViews.value = {
          view: "none"
        };
        Store.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        };
        return;
      }
      case "uninitialized": {
        return;
      }
    }
  }, []);
  const onToggleActive = q3((e5) => {
    e5.preventDefault();
    e5.stopPropagation();
    if (!ReactScanInternals.instrumentation) {
      return;
    }
    const isPaused = !ReactScanInternals.instrumentation.isPaused.value;
    ReactScanInternals.instrumentation.isPaused.value = isPaused;
    const existingLocalStorageOptions = readLocalStorage("react-scan-options");
    saveLocalStorage("react-scan-options", {
      ...existingLocalStorageOptions,
      enabled: !isPaused
    });
  }, []);
  useSignalEffect(() => {
    const state = Store.inspectState.value;
    if (state.kind === "uninitialized") {
      Store.inspectState.value = {
        kind: "inspect-off"
      };
    }
  });
  let inspectIcon = null;
  let inspectColor = "#999";
  if (isInspectActive) {
    inspectIcon = u5(Icon, { name: "icon-inspect" });
    inspectColor = "#8e61e3";
  } else if (isInspectFocused) {
    inspectIcon = u5(Icon, { name: "icon-focus" });
    inspectColor = "#8e61e3";
  } else {
    inspectIcon = u5(Icon, { name: "icon-inspect" });
    inspectColor = "#999";
  }
  _4(() => {
    if (signalWidgetViews.value.view !== "notifications") {
      return;
    }
    const ids = new Set(events.map((event) => event.id));
    setSeenEvents([...ids.values()]);
  }, [events.length, signalWidgetViews.value.view]);
  return u5("div", { className: "flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden", children: [
    u5("div", { className: "h-full flex items-center min-w-fit", children: u5(
      "button",
      {
        type: "button",
        id: "react-scan-inspect-element",
        title: "Inspect element",
        onClick: onToggleInspect,
        className: "button flex items-center justify-center h-full w-full pl-3 pr-2.5",
        style: { color: inspectColor },
        children: inspectIcon
      }
    ) }),
    u5("div", { className: "h-full flex items-center justify-center", children: u5(
      "button",
      {
        type: "button",
        id: "react-scan-notifications",
        title: "Notifications",
        onClick: () => {
          if (Store.inspectState.value.kind !== "inspect-off") {
            Store.inspectState.value = {
              kind: "inspect-off"
            };
          }
          switch (signalWidgetViews.value.view) {
            case "inspector": {
              Store.inspectState.value = {
                kind: "inspect-off"
              };
              const ids = new Set(events.map((event) => event.id));
              setSeenEvents([...ids.values()]);
              signalWidgetViews.value = {
                view: "notifications"
              };
              return;
            }
            case "notifications": {
              signalWidgetViews.value = {
                view: "none"
              };
              return;
            }
            case "none": {
              const ids = new Set(events.map((event) => event.id));
              setSeenEvents([...ids.values()]);
              signalWidgetViews.value = {
                view: "notifications"
              };
              return;
            }
          }
        },
        className: "button flex items-center justify-center h-full pl-2.5 pr-2.5",
        style: { color: inspectColor },
        children: u5(
          Notification,
          {
            events: laggedEvents.filter((event) => !seenEvents.includes(event.id)).map((event) => getEventSeverity(event) === "high"),
            size: 16,
            className: cn([
              "text-[#999]",
              signalWidgetViews.value.view === "notifications" && "text-[#8E61E3]"
            ])
          }
        )
      }
    ) }),
    u5(
      Toggle,
      {
        checked: !((_a = ReactScanInternals.instrumentation) == null ? void 0 : _a.isPaused.value),
        onChange: onToggleActive,
        className: "place-self-center",
        title: "Outline Re-renders"
      }
    ),
    ReactScanInternals.options.value.showFPS && u5(FPSMeter, {})
  ] });
});
var isInspecting = g4(
  () => Store.inspectState.value.kind === "inspecting"
);
var headerClassName = g4(
  () => cn(
    "relative",
    "flex-1",
    "flex flex-col",
    "rounded-t-lg",
    "overflow-hidden",
    "opacity-100",
    "transition-[opacity]",
    isInspecting.value && "opacity-0 duration-0 delay-0"
  )
);
var isInspectorViewOpen = g4(
  () => signalWidgetViews.value.view === "inspector"
);
var isNotificationsViewOpen = g4(
  () => signalWidgetViews.value.view === "notifications"
);
var Content = () => {
  return u5(
    "div",
    {
      className: cn(
        "flex flex-1 flex-col",
        "overflow-hidden z-10",
        "rounded-lg",
        "bg-black",
        "opacity-100",
        "transition-[border-radius]",
        "peer-hover/left:rounded-l-none",
        "peer-hover/right:rounded-r-none",
        "peer-hover/top:rounded-t-none",
        "peer-hover/bottom:rounded-b-none"
      ),
      children: [
        u5("div", { className: headerClassName, children: [
          u5(Header, {}),
          u5(
            "div",
            {
              className: cn(
                "relative",
                "flex-1 flex",
                "text-white",
                "bg-[#0A0A0A]",
                "transition-opacity delay-150",
                "overflow-hidden",
                "border-b border-[#222]"
              ),
              children: [
                u5(ContentView, { isOpen: isInspectorViewOpen, children: u5(ViewInspector, {}) }),
                u5(ContentView, { isOpen: isNotificationsViewOpen, children: u5(NotificationWrapper, {}) })
              ]
            }
          )
        ] }),
        u5(Toolbar, {})
      ]
    }
  );
};
var ContentView = ({ isOpen, children }) => {
  return u5(
    "div",
    {
      className: cn(
        "flex-1",
        "opacity-0",
        "overflow-y-auto overflow-x-hidden",
        "transition-opacity delay-0",
        "pointer-events-none",
        isOpen.value && "opacity-100 delay-150 pointer-events-auto"
      ),
      children: u5("div", { className: "absolute inset-0 flex", children })
    }
  );
};
var lerp2 = (start2, end, t5) => start2 + (end - start2) * t5;
var ANIMATION_CONFIG = {
  frameInterval: 1e3 / 60,
  speeds: {
    fast: 0.51,
    slow: 0.1,
    off: 0
  }
};
var OVERLAY_DPR = IS_CLIENT ? window.devicePixelRatio || 1 : 1;
var ScanOverlay = () => {
  const refCanvas = A3(null);
  const refEventCatcher = A3(null);
  const refCurrentRect = A3(null);
  const refCurrentLockIconRect = A3(null);
  const refLastHoveredElement = A3(null);
  const refRafId = A3(0);
  const refTimeout = A3();
  const refCleanupMap = A3(
    /* @__PURE__ */ new Map()
  );
  const refIsFadingOut = A3(false);
  const refLastFrameTime = A3(0);
  const drawLockIcon = (ctx2, x6, y6, size) => {
    ctx2.save();
    ctx2.strokeStyle = "white";
    ctx2.fillStyle = "white";
    ctx2.lineWidth = 1.5;
    const shackleWidth = size * 0.6;
    const shackleHeight = size * 0.5;
    const shackleX = x6 + (size - shackleWidth) / 2;
    const shackleY = y6;
    ctx2.beginPath();
    ctx2.arc(
      shackleX + shackleWidth / 2,
      shackleY + shackleHeight / 2,
      shackleWidth / 2,
      Math.PI,
      0,
      false
    );
    ctx2.stroke();
    const bodyWidth = size * 0.8;
    const bodyHeight = size * 0.5;
    const bodyX = x6 + (size - bodyWidth) / 2;
    const bodyY = y6 + shackleHeight / 2;
    ctx2.fillRect(bodyX, bodyY, bodyWidth, bodyHeight);
    ctx2.restore();
  };
  const drawStatsPill = (ctx2, rect, kind, fiber) => {
    var _a;
    if (!fiber) return;
    const pillHeight = 24;
    const pillPadding = 8;
    const componentName = (_a = (fiber == null ? void 0 : fiber.type) && Ee(fiber.type)) != null ? _a : "Unknown";
    const text = componentName;
    ctx2.save();
    ctx2.font = "12px system-ui, -apple-system, sans-serif";
    const textMetrics = ctx2.measureText(text);
    const textWidth = textMetrics.width;
    const lockIconSize = kind === "locked" ? 14 : 0;
    const lockIconPadding = kind === "locked" ? 6 : 0;
    const pillWidth = textWidth + pillPadding * 2 + lockIconSize + lockIconPadding;
    const pillX = rect.left;
    const pillY = rect.top - pillHeight - 4;
    ctx2.fillStyle = "rgb(37, 37, 38, .75)";
    ctx2.beginPath();
    ctx2.roundRect(pillX, pillY, pillWidth, pillHeight, 3);
    ctx2.fill();
    if (kind === "locked") {
      const lockX = pillX + pillPadding;
      const lockY = pillY + (pillHeight - lockIconSize) / 2 + 2;
      drawLockIcon(ctx2, lockX, lockY, lockIconSize);
      refCurrentLockIconRect.current = {
        x: lockX,
        y: lockY,
        width: lockIconSize,
        height: lockIconSize
      };
    } else {
      refCurrentLockIconRect.current = null;
    }
    ctx2.fillStyle = "white";
    ctx2.textBaseline = "middle";
    const textX = pillX + pillPadding + (kind === "locked" ? lockIconSize + lockIconPadding : 0);
    ctx2.fillText(text, textX, pillY + pillHeight / 2);
    ctx2.restore();
  };
  const drawRect = (canvas2, ctx2, kind, fiber) => {
    if (!refCurrentRect.current) return;
    const rect = refCurrentRect.current;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.strokeStyle = "rgba(142, 97, 227, 0.5)";
    ctx2.fillStyle = "rgba(173, 97, 230, 0.10)";
    if (kind === "locked") {
      ctx2.setLineDash([]);
    } else {
      ctx2.setLineDash([4]);
    }
    ctx2.lineWidth = 1;
    ctx2.fillRect(rect.left, rect.top, rect.width, rect.height);
    ctx2.strokeRect(rect.left, rect.top, rect.width, rect.height);
    drawStatsPill(ctx2, rect, kind, fiber);
  };
  const animate = (canvas2, ctx2, targetRect, kind, parentCompositeFiber, onComplete) => {
    var _a;
    const speed = ReactScanInternals.options.value.animationSpeed;
    const t5 = (_a = ANIMATION_CONFIG.speeds[speed]) != null ? _a : ANIMATION_CONFIG.speeds.off;
    const animationFrame2 = (timestamp) => {
      if (timestamp - refLastFrameTime.current < ANIMATION_CONFIG.frameInterval) {
        refRafId.current = requestAnimationFrame(animationFrame2);
        return;
      }
      refLastFrameTime.current = timestamp;
      if (!refCurrentRect.current) {
        cancelAnimationFrame(refRafId.current);
        return;
      }
      refCurrentRect.current = {
        left: lerp2(refCurrentRect.current.left, targetRect.left, t5),
        top: lerp2(refCurrentRect.current.top, targetRect.top, t5),
        width: lerp2(refCurrentRect.current.width, targetRect.width, t5),
        height: lerp2(refCurrentRect.current.height, targetRect.height, t5)
      };
      drawRect(canvas2, ctx2, kind, parentCompositeFiber);
      const stillMoving = Math.abs(refCurrentRect.current.left - targetRect.left) > 0.1 || Math.abs(refCurrentRect.current.top - targetRect.top) > 0.1 || Math.abs(refCurrentRect.current.width - targetRect.width) > 0.1 || Math.abs(refCurrentRect.current.height - targetRect.height) > 0.1;
      if (stillMoving) {
        refRafId.current = requestAnimationFrame(animationFrame2);
      } else {
        refCurrentRect.current = targetRect;
        drawRect(canvas2, ctx2, kind, parentCompositeFiber);
        cancelAnimationFrame(refRafId.current);
        ctx2.restore();
        onComplete == null ? void 0 : onComplete();
      }
    };
    cancelAnimationFrame(refRafId.current);
    clearTimeout(refTimeout.current);
    refRafId.current = requestAnimationFrame(animationFrame2);
    refTimeout.current = setTimeout(() => {
      cancelAnimationFrame(refRafId.current);
      refCurrentRect.current = targetRect;
      drawRect(canvas2, ctx2, kind, parentCompositeFiber);
      ctx2.restore();
      onComplete == null ? void 0 : onComplete();
    }, 1e3);
  };
  const setupOverlayAnimation = (canvas2, ctx2, targetRect, kind, parentCompositeFiber) => {
    ctx2.save();
    if (!refCurrentRect.current) {
      refCurrentRect.current = targetRect;
      drawRect(canvas2, ctx2, kind, parentCompositeFiber);
      ctx2.restore();
      return;
    }
    animate(canvas2, ctx2, targetRect, kind, parentCompositeFiber);
  };
  const drawHoverOverlay = async (overlayElement, canvas2, ctx2, kind) => {
    if (!overlayElement || !canvas2 || !ctx2) return;
    const { parentCompositeFiber } = getCompositeComponentFromElement(overlayElement);
    const targetRect = await getAssociatedFiberRect(overlayElement);
    if (!parentCompositeFiber || !targetRect) return;
    setupOverlayAnimation(canvas2, ctx2, targetRect, kind, parentCompositeFiber);
  };
  const unsubscribeAll = () => {
    for (const cleanup3 of refCleanupMap.current.values()) {
      cleanup3 == null ? void 0 : cleanup3();
    }
  };
  const cleanupCanvas = (canvas2) => {
    const ctx2 = canvas2.getContext("2d");
    if (ctx2) {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
    refCurrentRect.current = null;
    refCurrentLockIconRect.current = null;
    refLastHoveredElement.current = null;
    canvas2.classList.remove("fade-in");
    refIsFadingOut.current = false;
  };
  const startFadeOut = (onComplete) => {
    if (!refCanvas.current || refIsFadingOut.current) return;
    const handleTransitionEnd = (e5) => {
      if (!refCanvas.current || e5.propertyName !== "opacity" || !refIsFadingOut.current) {
        return;
      }
      refCanvas.current.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
      cleanupCanvas(refCanvas.current);
      onComplete == null ? void 0 : onComplete();
    };
    const existingListener = refCleanupMap.current.get("fade-out");
    if (existingListener) {
      existingListener();
      refCleanupMap.current.delete("fade-out");
    }
    refCanvas.current.addEventListener("transitionend", handleTransitionEnd);
    refCleanupMap.current.set("fade-out", () => {
      var _a;
      (_a = refCanvas.current) == null ? void 0 : _a.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    });
    refIsFadingOut.current = true;
    refCanvas.current.classList.remove("fade-in");
    requestAnimationFrame(() => {
      var _a;
      (_a = refCanvas.current) == null ? void 0 : _a.classList.add("fade-out");
    });
  };
  const startFadeIn = () => {
    if (!refCanvas.current) return;
    refIsFadingOut.current = false;
    refCanvas.current.classList.remove("fade-out");
    requestAnimationFrame(() => {
      var _a;
      (_a = refCanvas.current) == null ? void 0 : _a.classList.add("fade-in");
    });
  };
  const handleHoverableElement = (componentElement) => {
    if (componentElement === refLastHoveredElement.current) return;
    refLastHoveredElement.current = componentElement;
    if (nonVisualTags.has(componentElement.tagName)) {
      startFadeOut();
    } else {
      startFadeIn();
    }
    Store.inspectState.value = {
      kind: "inspecting",
      hoveredDomElement: componentElement
    };
  };
  const handleNonHoverableArea = () => {
    if (!refCurrentRect.current || !refCanvas.current || refIsFadingOut.current) {
      return;
    }
    startFadeOut();
  };
  const handlePointerMove = throttle((e5) => {
    var _a, _b;
    const state = Store.inspectState.peek();
    if (state.kind !== "inspecting" || !refEventCatcher.current) return;
    refEventCatcher.current.style.pointerEvents = "none";
    const element = document.elementFromPoint((_a = e5 == null ? void 0 : e5.clientX) != null ? _a : 0, (_b = e5 == null ? void 0 : e5.clientY) != null ? _b : 0);
    refEventCatcher.current.style.removeProperty("pointer-events");
    clearTimeout(refTimeout.current);
    if (element && element !== refCanvas.current) {
      const { parentCompositeFiber } = getCompositeComponentFromElement(
        element
      );
      if (parentCompositeFiber) {
        const componentElement = findComponentDOMNode(parentCompositeFiber);
        if (componentElement) {
          handleHoverableElement(componentElement);
          return;
        }
      }
    }
    handleNonHoverableArea();
  }, 32);
  const isClickInLockIcon = (e5, canvas2) => {
    const currentRect = refCurrentLockIconRect.current;
    if (!currentRect) return false;
    const rect = canvas2.getBoundingClientRect();
    const scaleX = canvas2.width / rect.width;
    const scaleY = canvas2.height / rect.height;
    const x6 = (e5.clientX - rect.left) * scaleX;
    const y6 = (e5.clientY - rect.top) * scaleY;
    const adjustedX = x6 / OVERLAY_DPR;
    const adjustedY = y6 / OVERLAY_DPR;
    return adjustedX >= currentRect.x && adjustedX <= currentRect.x + currentRect.width && adjustedY >= currentRect.y && adjustedY <= currentRect.y + currentRect.height;
  };
  const handleLockIconClick = (state) => {
    if (state.kind === "focused") {
      Store.inspectState.value = {
        kind: "inspecting",
        hoveredDomElement: state.focusedDomElement
      };
    }
  };
  const handleElementClick = (e5) => {
    var _a, _b;
    const clickableElements = [
      "react-scan-inspect-element",
      "react-scan-power"
    ];
    if (e5.target instanceof HTMLElement && clickableElements.includes(e5.target.id)) {
      return;
    }
    const tagName = (_a = refLastHoveredElement.current) == null ? void 0 : _a.tagName;
    if (tagName && nonVisualTags.has(tagName)) {
      return;
    }
    e5.preventDefault();
    e5.stopPropagation();
    const element = (_b = refLastHoveredElement.current) != null ? _b : document.elementFromPoint(e5.clientX, e5.clientY);
    if (!element) return;
    const clickedEl = e5.composedPath().at(0);
    if (clickedEl instanceof HTMLElement && clickableElements.includes(clickedEl.id)) {
      const syntheticEvent = new MouseEvent(e5.type, e5);
      syntheticEvent.__reactScanSyntheticEvent = true;
      clickedEl.dispatchEvent(syntheticEvent);
      return;
    }
    const { parentCompositeFiber } = getCompositeComponentFromElement(
      element
    );
    if (!parentCompositeFiber) return;
    const componentElement = findComponentDOMNode(parentCompositeFiber);
    if (!componentElement) {
      refLastHoveredElement.current = null;
      Store.inspectState.value = {
        kind: "inspect-off"
      };
      return;
    }
    Store.inspectState.value = {
      kind: "focused",
      focusedDomElement: componentElement,
      fiber: parentCompositeFiber
    };
  };
  const handleClick = (e5) => {
    if (e5.__reactScanSyntheticEvent) {
      return;
    }
    const state = Store.inspectState.peek();
    const canvas2 = refCanvas.current;
    if (!canvas2 || !refEventCatcher.current) return;
    if (isClickInLockIcon(e5, canvas2)) {
      e5.preventDefault();
      e5.stopPropagation();
      handleLockIconClick(state);
      return;
    }
    if (state.kind === "inspecting") {
      handleElementClick(e5);
    }
  };
  const handleKeyDown = (e5) => {
    var _a;
    if (e5.key !== "Escape") return;
    const state = Store.inspectState.peek();
    const canvas2 = refCanvas.current;
    if (!canvas2) return;
    if (((_a = document.activeElement) == null ? void 0 : _a.id) === "react-scan-root") {
      return;
    }
    signalWidgetViews.value = {
      view: "none"
    };
    if (state.kind === "focused" || state.kind === "inspecting") {
      e5.preventDefault();
      e5.stopPropagation();
      switch (state.kind) {
        case "focused": {
          startFadeIn();
          refCurrentRect.current = null;
          refLastHoveredElement.current = state.focusedDomElement;
          Store.inspectState.value = {
            kind: "inspecting",
            hoveredDomElement: state.focusedDomElement
          };
          break;
        }
        case "inspecting": {
          startFadeOut(() => {
            signalIsSettingsOpen.value = false;
            Store.inspectState.value = {
              kind: "inspect-off"
            };
          });
          break;
        }
      }
    }
  };
  const handleStateChange = (state, canvas2, ctx2) => {
    var _a;
    (_a = refCleanupMap.current.get(state.kind)) == null ? void 0 : _a();
    if (refEventCatcher.current) {
      if (state.kind !== "inspecting") {
        refEventCatcher.current.style.pointerEvents = "none";
      }
    }
    if (refRafId.current) {
      cancelAnimationFrame(refRafId.current);
    }
    let unsubReport;
    switch (state.kind) {
      case "inspect-off":
        startFadeOut();
        return;
      case "inspecting":
        drawHoverOverlay(state.hoveredDomElement, canvas2, ctx2, "inspecting");
        break;
      case "focused":
        if (!state.focusedDomElement) return;
        if (refLastHoveredElement.current !== state.focusedDomElement) {
          refLastHoveredElement.current = state.focusedDomElement;
        }
        signalWidgetViews.value = {
          view: "inspector"
        };
        drawHoverOverlay(state.focusedDomElement, canvas2, ctx2, "locked");
        unsubReport = Store.lastReportTime.subscribe(() => {
          if (refRafId.current && refCurrentRect.current) {
            const { parentCompositeFiber } = getCompositeComponentFromElement(
              state.focusedDomElement
            );
            if (parentCompositeFiber) {
              drawHoverOverlay(state.focusedDomElement, canvas2, ctx2, "locked");
            }
          }
        });
        if (unsubReport) {
          refCleanupMap.current.set(state.kind, unsubReport);
        }
        break;
    }
  };
  const updateCanvasSize = (canvas2, ctx2) => {
    const rect = canvas2.getBoundingClientRect();
    canvas2.width = rect.width * OVERLAY_DPR;
    canvas2.height = rect.height * OVERLAY_DPR;
    ctx2.scale(OVERLAY_DPR, OVERLAY_DPR);
    ctx2.save();
  };
  const handleResizeOrScroll = () => {
    const state = Store.inspectState.peek();
    const canvas2 = refCanvas.current;
    if (!canvas2) return;
    const ctx2 = canvas2 == null ? void 0 : canvas2.getContext("2d");
    if (!ctx2) return;
    cancelAnimationFrame(refRafId.current);
    clearTimeout(refTimeout.current);
    updateCanvasSize(canvas2, ctx2);
    refCurrentRect.current = null;
    if (state.kind === "focused" && state.focusedDomElement) {
      drawHoverOverlay(state.focusedDomElement, canvas2, ctx2, "locked");
    } else if (state.kind === "inspecting" && state.hoveredDomElement) {
      drawHoverOverlay(state.hoveredDomElement, canvas2, ctx2, "inspecting");
    }
  };
  const handlePointerDown = (e5) => {
    const state = Store.inspectState.peek();
    const canvas2 = refCanvas.current;
    if (!canvas2) return;
    if (state.kind === "inspecting" || isClickInLockIcon(e5, canvas2)) {
      e5.preventDefault();
      e5.stopPropagation();
      e5.stopImmediatePropagation();
    }
  };
  h4(() => {
    const canvas2 = refCanvas.current;
    if (!canvas2) return;
    const ctx2 = canvas2 == null ? void 0 : canvas2.getContext("2d");
    if (!ctx2) return;
    updateCanvasSize(canvas2, ctx2);
    const unSubState = Store.inspectState.subscribe((state) => {
      handleStateChange(state, canvas2, ctx2);
    });
    window.addEventListener("scroll", handleResizeOrScroll, { passive: true });
    window.addEventListener("resize", handleResizeOrScroll, { passive: true });
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
      capture: true
    });
    document.addEventListener("pointerdown", handlePointerDown, {
      capture: true
    });
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      unsubscribeAll();
      unSubState();
      window.removeEventListener("scroll", handleResizeOrScroll);
      window.removeEventListener("resize", handleResizeOrScroll);
      document.removeEventListener("pointermove", handlePointerMove, {
        capture: true
      });
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("pointerdown", handlePointerDown, {
        capture: true
      });
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      if (refRafId.current) {
        cancelAnimationFrame(refRafId.current);
      }
      clearTimeout(refTimeout.current);
    };
  }, []);
  return u5(S2, { children: [
    u5(
      "div",
      {
        ref: refEventCatcher,
        className: cn("fixed top-0 left-0 w-screen h-screen", "z-[214748365]"),
        style: {
          pointerEvents: "none"
        }
      }
    ),
    u5(
      "canvas",
      {
        ref: refCanvas,
        dir: "ltr",
        className: cn(
          "react-scan-inspector-overlay",
          "fixed top-0 left-0 w-screen h-screen",
          "pointer-events-none",
          "z-[214748367]"
        )
      }
    )
  ] });
};
var WindowDimensions = class {
  constructor(width, height, safeArea) {
    __publicField(this, "width", width);
    __publicField(this, "height", height);
    __publicField(this, "safeArea", safeArea);
    __publicField(this, "maxWidth");
    __publicField(this, "maxHeight");
    this.maxWidth = width - safeArea.left - safeArea.right;
    this.maxHeight = height - safeArea.top - safeArea.bottom;
  }
  rightEdge(width) {
    return this.width - width - this.safeArea.right;
  }
  bottomEdge(height) {
    return this.height - height - this.safeArea.bottom;
  }
  isFullWidth(width) {
    return width >= this.maxWidth;
  }
  isFullHeight(height) {
    return height >= this.maxHeight;
  }
};
var cachedWindowDimensions;
var safeAreaMatches = (a5, b5) => a5.top === b5.top && a5.right === b5.right && a5.bottom === b5.bottom && a5.left === b5.left;
var getWindowDimensions = () => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  const currentSafeArea = getSafeArea();
  if (cachedWindowDimensions && cachedWindowDimensions.width === currentWidth && cachedWindowDimensions.height === currentHeight && safeAreaMatches(cachedWindowDimensions.safeArea, currentSafeArea)) {
    return cachedWindowDimensions;
  }
  cachedWindowDimensions = new WindowDimensions(
    currentWidth,
    currentHeight,
    currentSafeArea
  );
  return cachedWindowDimensions;
};
var getOppositeCorner = (position, currentCorner, isFullScreen, isFullWidth, isFullHeight) => {
  if (isFullScreen) {
    if (position === "top-left") return "bottom-right";
    if (position === "top-right") return "bottom-left";
    if (position === "bottom-left") return "top-right";
    if (position === "bottom-right") return "top-left";
    const [vertical, horizontal] = currentCorner.split("-");
    if (position === "left") return `${vertical}-right`;
    if (position === "right") return `${vertical}-left`;
    if (position === "top") return `bottom-${horizontal}`;
    if (position === "bottom") return `top-${horizontal}`;
  }
  if (isFullWidth) {
    if (position === "left")
      return `${currentCorner.split("-")[0]}-right`;
    if (position === "right")
      return `${currentCorner.split("-")[0]}-left`;
  }
  if (isFullHeight) {
    if (position === "top")
      return `bottom-${currentCorner.split("-")[1]}`;
    if (position === "bottom")
      return `top-${currentCorner.split("-")[1]}`;
  }
  return currentCorner;
};
var calculatePosition = (corner, width, height) => {
  const isRTL = getComputedStyle(document.body).direction === "rtl";
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const safeArea = getSafeArea();
  const isMinimized = width === MIN_SIZE.width;
  const effectiveWidth = isMinimized ? width : Math.min(width, windowWidth - safeArea.left - safeArea.right);
  const effectiveHeight = isMinimized ? height : Math.min(height, windowHeight - safeArea.top - safeArea.bottom);
  let x6;
  let y6;
  let leftBound = safeArea.left;
  let rightBound = windowWidth - effectiveWidth - safeArea.right;
  let topBound = safeArea.top;
  let bottomBound = windowHeight - effectiveHeight - safeArea.bottom;
  const rtlRightCornerX = -safeArea.right;
  const rtlLeftCornerX = -(windowWidth - effectiveWidth - safeArea.left);
  switch (corner) {
    case "top-right":
      x6 = isRTL ? rtlRightCornerX : rightBound;
      y6 = topBound;
      break;
    case "bottom-right":
      x6 = isRTL ? rtlRightCornerX : rightBound;
      y6 = bottomBound;
      break;
    case "bottom-left":
      x6 = isRTL ? rtlLeftCornerX : leftBound;
      y6 = bottomBound;
      break;
    case "top-left":
      x6 = isRTL ? rtlLeftCornerX : leftBound;
      y6 = topBound;
      break;
    default:
      x6 = leftBound;
      y6 = topBound;
      break;
  }
  if (isMinimized) {
    if (isRTL) {
      x6 = Math.min(
        rtlRightCornerX,
        Math.max(x6, rtlLeftCornerX)
      );
    } else {
      x6 = Math.max(
        leftBound,
        Math.min(x6, rightBound)
      );
    }
    y6 = Math.max(
      topBound,
      Math.min(y6, bottomBound)
    );
  }
  return { x: x6, y: y6 };
};
var positionMatchesCorner = (position, corner) => {
  const [vertical, horizontal] = corner.split("-");
  return position !== vertical && position !== horizontal;
};
var getHandleVisibility = (position, corner, isFullWidth, isFullHeight) => {
  if (isFullWidth && isFullHeight) {
    return true;
  }
  if (!isFullWidth && !isFullHeight) {
    return positionMatchesCorner(position, corner);
  }
  if (isFullWidth) {
    return position !== corner.split("-")[0];
  }
  if (isFullHeight) {
    return position !== corner.split("-")[1];
  }
  return false;
};
var calculateBoundedSize = (currentSize, delta, isWidth) => {
  const min = isWidth ? MIN_SIZE.width : MIN_SIZE.initialHeight;
  const max = isWidth ? getWindowDimensions().maxWidth : getWindowDimensions().maxHeight;
  const newSize = currentSize + delta;
  return Math.min(Math.max(min, newSize), max);
};
var calculateNewSizeAndPosition = (position, initialSize, initialPosition, deltaX, deltaY) => {
  const isRTL = getComputedStyle(document.body).direction === "rtl";
  const safeArea = getSafeArea();
  const maxWidth = window.innerWidth - safeArea.left - safeArea.right;
  const maxHeight = window.innerHeight - safeArea.top - safeArea.bottom;
  let newWidth = initialSize.width;
  let newHeight = initialSize.height;
  let newX = initialPosition.x;
  let newY = initialPosition.y;
  if (isRTL && position.includes("right")) {
    const availableWidth = -initialPosition.x + initialSize.width - safeArea.right;
    const proposedWidth = Math.min(initialSize.width + deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
    newX = initialPosition.x + (newWidth - initialSize.width);
  }
  if (isRTL && position.includes("left")) {
    const availableWidth = window.innerWidth - initialPosition.x - safeArea.left;
    const proposedWidth = Math.min(initialSize.width - deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
  }
  if (!isRTL && position.includes("right")) {
    const availableWidth = window.innerWidth - initialPosition.x - safeArea.right;
    const proposedWidth = Math.min(initialSize.width + deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
  }
  if (!isRTL && position.includes("left")) {
    const availableWidth = initialPosition.x + initialSize.width - safeArea.left;
    const proposedWidth = Math.min(initialSize.width - deltaX, availableWidth);
    newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, proposedWidth));
    newX = initialPosition.x - (newWidth - initialSize.width);
  }
  if (position.includes("bottom")) {
    const availableHeight = window.innerHeight - initialPosition.y - safeArea.bottom;
    const proposedHeight = Math.min(
      initialSize.height + deltaY,
      availableHeight
    );
    newHeight = Math.min(
      maxHeight,
      Math.max(MIN_SIZE.initialHeight, proposedHeight)
    );
  }
  if (position.includes("top")) {
    const availableHeight = initialPosition.y + initialSize.height - safeArea.top;
    const proposedHeight = Math.min(
      initialSize.height - deltaY,
      availableHeight
    );
    newHeight = Math.min(
      maxHeight,
      Math.max(MIN_SIZE.initialHeight, proposedHeight)
    );
    newY = initialPosition.y - (newHeight - initialSize.height);
  }
  let leftBound = safeArea.left;
  let rightBound = window.innerWidth - safeArea.right - newWidth;
  let topBound = safeArea.top;
  let bottomBound = window.innerHeight - safeArea.bottom - newHeight;
  const rtlRightCornerX = -safeArea.right;
  const rtlLeftCornerX = -(window.innerWidth - newWidth - safeArea.left);
  if (isRTL) {
    newX = Math.min(
      rtlRightCornerX,
      Math.max(newX, rtlLeftCornerX)
    );
  } else {
    newX = Math.max(
      leftBound,
      Math.min(newX, rightBound)
    );
  }
  newY = Math.max(
    topBound,
    Math.min(newY, bottomBound)
  );
  return {
    newSize: { width: newWidth, height: newHeight },
    newPosition: { x: newX, y: newY }
  };
};
var getClosestCorner = (position) => {
  const windowDims = getWindowDimensions();
  const distances = {
    "top-left": Math.hypot(position.x, position.y),
    "top-right": Math.hypot(windowDims.maxWidth - position.x, position.y),
    "bottom-left": Math.hypot(position.x, windowDims.maxHeight - position.y),
    "bottom-right": Math.hypot(
      windowDims.maxWidth - position.x,
      windowDims.maxHeight - position.y
    )
  };
  let closest = "top-left";
  for (const key in distances) {
    if (distances[key] < distances[closest]) {
      closest = key;
    }
  }
  return closest;
};
var getBestCorner = (mouseX, mouseY, initialMouseX, initialMouseY, threshold = 100) => {
  const deltaX = initialMouseX !== void 0 ? mouseX - initialMouseX : 0;
  const deltaY = initialMouseY !== void 0 ? mouseY - initialMouseY : 0;
  const windowCenterX = window.innerWidth / 2;
  const windowCenterY = window.innerHeight / 2;
  const movingRight = deltaX > threshold;
  const movingLeft = deltaX < -threshold;
  const movingDown = deltaY > threshold;
  const movingUp = deltaY < -threshold;
  if (movingRight || movingLeft) {
    const isBottom = mouseY > windowCenterY;
    return movingRight ? isBottom ? "bottom-right" : "top-right" : isBottom ? "bottom-left" : "top-left";
  }
  if (movingDown || movingUp) {
    const isRight = mouseX > windowCenterX;
    return movingDown ? isRight ? "bottom-right" : "bottom-left" : isRight ? "top-right" : "top-left";
  }
  return mouseX > windowCenterX ? mouseY > windowCenterY ? "bottom-right" : "top-right" : mouseY > windowCenterY ? "bottom-left" : "top-left";
};
var ResizeHandle = ({ position }) => {
  const refContainer = A3(null);
  const prevWidth = A3(null);
  const prevHeight = A3(null);
  const prevCorner = A3(null);
  h4(() => {
    const container = refContainer.current;
    if (!container) return;
    const updateVisibility = () => {
      container.classList.remove("pointer-events-none");
      const isFocused = Store.inspectState.value.kind === "focused";
      const shouldShow = signalWidgetViews.value.view !== "none";
      const isVisible = (isFocused || shouldShow) && getHandleVisibility(
        position,
        signalWidget.value.corner,
        signalWidget.value.dimensions.isFullWidth,
        signalWidget.value.dimensions.isFullHeight
      );
      if (isVisible) {
        container.classList.remove(
          "hidden",
          "pointer-events-none",
          "opacity-0"
        );
      } else {
        container.classList.add("hidden", "pointer-events-none", "opacity-0");
      }
    };
    const unsubscribeSignalWidget = signalWidget.subscribe((state) => {
      if (prevWidth.current !== null && prevHeight.current !== null && prevCorner.current !== null && state.dimensions.width === prevWidth.current && state.dimensions.height === prevHeight.current && state.corner === prevCorner.current) {
        return;
      }
      updateVisibility();
      prevWidth.current = state.dimensions.width;
      prevHeight.current = state.dimensions.height;
      prevCorner.current = state.corner;
    });
    const unsubscribeInspectState = Store.inspectState.subscribe(() => {
      updateVisibility();
    });
    return () => {
      unsubscribeSignalWidget();
      unsubscribeInspectState();
      prevWidth.current = null;
      prevHeight.current = null;
      prevCorner.current = null;
    };
  }, []);
  const handleResize = q3(
    (e5) => {
      e5.preventDefault();
      e5.stopPropagation();
      const widget = signalRefWidget.value;
      if (!widget) return;
      const containerStyle = widget.style;
      const { dimensions } = signalWidget.value;
      const initialX = e5.clientX;
      const initialY = e5.clientY;
      const initialWidth = dimensions.width;
      const initialHeight = dimensions.height;
      const initialPosition = dimensions.position;
      signalWidget.value = {
        ...signalWidget.value,
        dimensions: {
          ...dimensions,
          isFullWidth: false,
          isFullHeight: false,
          width: initialWidth,
          height: initialHeight,
          position: initialPosition
        }
      };
      let rafId = null;
      const handlePointerMove = (e22) => {
        if (rafId) return;
        containerStyle.transition = "none";
        rafId = requestAnimationFrame(() => {
          const { newSize, newPosition } = calculateNewSizeAndPosition(
            position,
            { width: initialWidth, height: initialHeight },
            initialPosition,
            e22.clientX - initialX,
            e22.clientY - initialY
          );
          containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
          containerStyle.width = `${newSize.width}px`;
          containerStyle.height = `${newSize.height}px`;
          const maxTreeWidth = Math.floor(newSize.width - MIN_CONTAINER_WIDTH / 2);
          const currentTreeWidth = signalWidget.value.componentsTree.width;
          const newTreeWidth = Math.min(
            maxTreeWidth,
            Math.max(MIN_CONTAINER_WIDTH, currentTreeWidth)
          );
          signalWidget.value = {
            ...signalWidget.value,
            dimensions: {
              isFullWidth: false,
              isFullHeight: false,
              width: newSize.width,
              height: newSize.height,
              position: newPosition
            },
            componentsTree: {
              ...signalWidget.value.componentsTree,
              width: newTreeWidth
            }
          };
          rafId = null;
        });
      };
      const handlePointerUp = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        const { dimensions: dimensions2, corner } = signalWidget.value;
        const windowDims = getWindowDimensions();
        const isCurrentFullWidth = windowDims.isFullWidth(dimensions2.width);
        const isCurrentFullHeight = windowDims.isFullHeight(dimensions2.height);
        const isFullScreen = isCurrentFullWidth && isCurrentFullHeight;
        let newCorner = corner;
        if (isFullScreen || isCurrentFullWidth || isCurrentFullHeight) {
          newCorner = getClosestCorner(dimensions2.position);
        }
        const newPosition = calculatePosition(
          newCorner,
          dimensions2.width,
          dimensions2.height
        );
        const onTransitionEnd = () => {
          widget.removeEventListener("transitionend", onTransitionEnd);
        };
        widget.addEventListener("transitionend", onTransitionEnd);
        containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
        signalWidget.value = {
          ...signalWidget.value,
          corner: newCorner,
          dimensions: {
            isFullWidth: isCurrentFullWidth,
            isFullHeight: isCurrentFullHeight,
            width: dimensions2.width,
            height: dimensions2.height,
            position: newPosition
          },
          lastDimensions: {
            isFullWidth: isCurrentFullWidth,
            isFullHeight: isCurrentFullHeight,
            width: dimensions2.width,
            height: dimensions2.height,
            position: newPosition
          }
        };
        saveLocalStorage(LOCALSTORAGE_KEY, {
          corner: newCorner,
          dimensions: signalWidget.value.dimensions,
          lastDimensions: signalWidget.value.lastDimensions,
          componentsTree: signalWidget.value.componentsTree
        });
      };
      document.addEventListener("pointermove", handlePointerMove, {
        passive: true
      });
      document.addEventListener("pointerup", handlePointerUp);
    },
    []
  );
  const handleDoubleClick = q3(
    (e5) => {
      e5.preventDefault();
      e5.stopPropagation();
      const widget = signalRefWidget.value;
      if (!widget) return;
      const containerStyle = widget.style;
      const { dimensions, corner } = signalWidget.value;
      const windowDims = getWindowDimensions();
      const isCurrentFullWidth = windowDims.isFullWidth(dimensions.width);
      const isCurrentFullHeight = windowDims.isFullHeight(dimensions.height);
      const isFullScreen = isCurrentFullWidth && isCurrentFullHeight;
      const isPartiallyMaximized = (isCurrentFullWidth || isCurrentFullHeight) && !isFullScreen;
      let newWidth = dimensions.width;
      let newHeight = dimensions.height;
      const newCorner = getOppositeCorner(
        position,
        corner,
        isFullScreen,
        isCurrentFullWidth,
        isCurrentFullHeight
      );
      if (position === "left" || position === "right") {
        newWidth = isCurrentFullWidth ? dimensions.width : windowDims.maxWidth;
        if (isPartiallyMaximized) {
          newWidth = isCurrentFullWidth ? MIN_SIZE.width : windowDims.maxWidth;
        }
      } else {
        newHeight = isCurrentFullHeight ? dimensions.height : windowDims.maxHeight;
        if (isPartiallyMaximized) {
          newHeight = isCurrentFullHeight ? MIN_SIZE.initialHeight : windowDims.maxHeight;
        }
      }
      if (isFullScreen) {
        if (position === "left" || position === "right") {
          newWidth = MIN_SIZE.width;
        } else {
          newHeight = MIN_SIZE.initialHeight;
        }
      }
      const newPosition = calculatePosition(newCorner, newWidth, newHeight);
      const newDimensions = {
        isFullWidth: windowDims.isFullWidth(newWidth),
        isFullHeight: windowDims.isFullHeight(newHeight),
        width: newWidth,
        height: newHeight,
        position: newPosition
      };
      const maxTreeWidth = Math.floor(newWidth - MIN_SIZE.width / 2);
      const currentTreeWidth = signalWidget.value.componentsTree.width;
      const defaultWidth = Math.floor(newWidth * 0.3);
      const newTreeWidth = isCurrentFullWidth ? MIN_CONTAINER_WIDTH : (position === "left" || position === "right") && !isCurrentFullWidth ? Math.min(maxTreeWidth, Math.max(MIN_CONTAINER_WIDTH, defaultWidth)) : Math.min(
        maxTreeWidth,
        Math.max(MIN_CONTAINER_WIDTH, currentTreeWidth)
      );
      requestAnimationFrame(() => {
        signalWidget.value = {
          corner: newCorner,
          dimensions: newDimensions,
          lastDimensions: dimensions,
          componentsTree: {
            ...signalWidget.value.componentsTree,
            width: newTreeWidth
          }
        };
        containerStyle.transition = "all 0.25s cubic-bezier(0, 0, 0.2, 1)";
        containerStyle.width = `${newWidth}px`;
        containerStyle.height = `${newHeight}px`;
        containerStyle.transform = `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`;
      });
      saveLocalStorage(LOCALSTORAGE_KEY, {
        corner: newCorner,
        dimensions: newDimensions,
        lastDimensions: dimensions,
        componentsTree: {
          ...signalWidget.value.componentsTree,
          width: newTreeWidth
        }
      });
    },
    []
  );
  return u5(
    "div",
    {
      ref: refContainer,
      onPointerDown: handleResize,
      onDblClick: handleDoubleClick,
      className: cn(
        "absolute z-50",
        "flex items-center justify-center",
        "group",
        "transition-colors select-none",
        "peer",
        {
          "resize-left peer/left": position === "left",
          "resize-right peer/right z-10": position === "right",
          "resize-top peer/top": position === "top",
          "resize-bottom peer/bottom": position === "bottom"
        }
      ),
      children: u5("span", { className: "resize-line-wrapper", children: u5("span", { className: "resize-line", children: u5(
        Icon,
        {
          name: "icon-ellipsis",
          size: 18,
          className: cn(
            "text-neutral-400",
            (position === "left" || position === "right") && "rotate-90"
          )
        }
      ) }) })
    }
  );
};
var COLLAPSED_SIZE = {
  horizontal: { width: 20, height: 48 },
  vertical: { width: 48, height: 20 }
};
var Widget = () => {
  const refWidget = A3(null);
  const refShouldOpen = A3(false);
  const refInitialMinimizedWidth = A3(0);
  const refInitialMinimizedHeight = A3(0);
  const refExpandingFromCollapsed = A3(false);
  const updateWidgetPosition = q3((shouldSave = true) => {
    if (!refWidget.current) return;
    const { corner } = signalWidget.value;
    let newWidth;
    let newHeight;
    if (signalWidgetCollapsed.value) {
      const orientation = signalWidgetCollapsed.value.orientation || "horizontal";
      const size = COLLAPSED_SIZE[orientation];
      newWidth = size.width;
      newHeight = size.height;
    } else if (refShouldOpen.current) {
      const lastDims = signalWidget.value.lastDimensions;
      newWidth = calculateBoundedSize(lastDims.width, 0, true);
      newHeight = calculateBoundedSize(lastDims.height, 0, false);
      if (refExpandingFromCollapsed.current) {
        refExpandingFromCollapsed.current = false;
      }
    } else {
      newWidth = refInitialMinimizedWidth.current;
      newHeight = refInitialMinimizedHeight.current;
    }
    const newPosition = calculatePosition(corner, newWidth, newHeight);
    let finalPosition = newPosition;
    if (signalWidgetCollapsed.value) {
      const { corner: collapsedCorner, orientation = "horizontal" } = signalWidgetCollapsed.value;
      const size = COLLAPSED_SIZE[orientation];
      const safeArea2 = getSafeArea();
      switch (collapsedCorner) {
        case "top-left":
          finalPosition = orientation === "horizontal" ? { x: -1, y: safeArea2.top } : { x: safeArea2.left, y: -1 };
          break;
        case "bottom-left":
          finalPosition = orientation === "horizontal" ? { x: -1, y: window.innerHeight - size.height - safeArea2.bottom } : { x: safeArea2.left, y: window.innerHeight - size.height + 1 };
          break;
        case "top-right":
          finalPosition = orientation === "horizontal" ? { x: window.innerWidth - size.width + 1, y: safeArea2.top } : { x: window.innerWidth - size.width - safeArea2.right, y: -1 };
          break;
        case "bottom-right":
        default:
          finalPosition = orientation === "horizontal" ? {
            x: window.innerWidth - size.width + 1,
            y: window.innerHeight - size.height - safeArea2.bottom
          } : {
            x: window.innerWidth - size.width - safeArea2.right,
            y: window.innerHeight - size.height + 1
          };
          break;
      }
    }
    const isTooSmall = newWidth < MIN_SIZE.width || newHeight < MIN_SIZE.initialHeight;
    const shouldPersist = shouldSave && !isTooSmall;
    const container = refWidget.current;
    const containerStyle = container.style;
    let rafId = null;
    const onTransitionEnd = () => {
      updateDimensions();
      container.removeEventListener("transitionend", onTransitionEnd);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
    container.addEventListener("transitionend", onTransitionEnd);
    containerStyle.transition = "all 0.25s cubic-bezier(0, 0, 0.2, 1)";
    rafId = requestAnimationFrame(() => {
      containerStyle.width = `${newWidth}px`;
      containerStyle.height = `${newHeight}px`;
      containerStyle.transform = `translate3d(${finalPosition.x}px, ${finalPosition.y}px, 0)`;
      rafId = null;
    });
    const safeArea = getSafeArea();
    const newDimensions = {
      isFullWidth: newWidth >= window.innerWidth - safeArea.left - safeArea.right,
      isFullHeight: newHeight >= window.innerHeight - safeArea.top - safeArea.bottom,
      width: newWidth,
      height: newHeight,
      position: finalPosition
    };
    signalWidget.value = {
      corner,
      dimensions: newDimensions,
      lastDimensions: refShouldOpen ? signalWidget.value.lastDimensions : newWidth > refInitialMinimizedWidth.current ? newDimensions : signalWidget.value.lastDimensions,
      componentsTree: signalWidget.value.componentsTree
    };
    if (shouldPersist) {
      saveLocalStorage(LOCALSTORAGE_KEY, {
        corner: signalWidget.value.corner,
        dimensions: signalWidget.value.dimensions,
        lastDimensions: signalWidget.value.lastDimensions,
        componentsTree: signalWidget.value.componentsTree
      });
    }
    updateDimensions();
  }, []);
  const handleDrag = q3(
    (e5) => {
      const target = e5.target;
      if (target.closest(TOOLBAR_INTERACTIVE_SELECTOR)) {
        return;
      }
      e5.preventDefault();
      if (!refWidget.current) return;
      const container = refWidget.current;
      const containerStyle = container.style;
      const { dimensions } = signalWidget.value;
      const initialMouseX = e5.clientX;
      const initialMouseY = e5.clientY;
      const initialX = dimensions.position.x;
      const initialY = dimensions.position.y;
      let currentX = initialX;
      let currentY = initialY;
      let rafId = null;
      let hasMoved = false;
      let lastMouseX = initialMouseX;
      let lastMouseY = initialMouseY;
      const handlePointerMove = (e22) => {
        if (rafId) return;
        hasMoved = true;
        lastMouseX = e22.clientX;
        lastMouseY = e22.clientY;
        rafId = requestAnimationFrame(() => {
          const deltaX = lastMouseX - initialMouseX;
          const deltaY = lastMouseY - initialMouseY;
          currentX = Number(initialX) + deltaX;
          currentY = Number(initialY) + deltaY;
          containerStyle.transition = "none";
          containerStyle.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          const widgetRight = currentX + dimensions.width;
          const widgetBottom = currentY + dimensions.height;
          const outsideLeft = Math.max(0, -currentX);
          const outsideRight = Math.max(0, widgetRight - window.innerWidth);
          const outsideTop = Math.max(0, -currentY);
          const outsideBottom = Math.max(0, widgetBottom - window.innerHeight);
          const horizontalOutside = Math.min(
            dimensions.width,
            outsideLeft + outsideRight
          );
          const verticalOutside = Math.min(
            dimensions.height,
            outsideTop + outsideBottom
          );
          const areaOutside = horizontalOutside * dimensions.height + verticalOutside * dimensions.width - horizontalOutside * verticalOutside;
          const totalArea = dimensions.width * dimensions.height;
          let shouldCollapse = areaOutside > totalArea * 0.35;
          if (!shouldCollapse && ReactScanInternals.options.value.showFPS) {
            const fpsRight = currentX + dimensions.width;
            const fpsLeft = fpsRight - 100;
            const fpsFullyOutside = fpsRight <= 0 || fpsLeft >= window.innerWidth || currentY + dimensions.height <= 0 || currentY >= window.innerHeight;
            shouldCollapse = fpsFullyOutside;
          }
          if (shouldCollapse) {
            const widgetCenterX = currentX + dimensions.width / 2;
            const widgetCenterY = currentY + dimensions.height / 2;
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight / 2;
            let targetCorner;
            if (widgetCenterX < screenCenterX) {
              targetCorner = widgetCenterY < screenCenterY ? "top-left" : "bottom-left";
            } else {
              targetCorner = widgetCenterY < screenCenterY ? "top-right" : "bottom-right";
            }
            let orientation;
            const horizontalOverflow = Math.max(outsideLeft, outsideRight);
            const verticalOverflow = Math.max(outsideTop, outsideBottom);
            orientation = horizontalOverflow > verticalOverflow ? "horizontal" : "vertical";
            signalWidget.value = {
              ...signalWidget.value,
              corner: targetCorner,
              lastDimensions: {
                ...dimensions,
                position: calculatePosition(
                  targetCorner,
                  dimensions.width,
                  dimensions.height
                )
              }
            };
            const collapsedPosition = {
              corner: targetCorner,
              orientation
            };
            signalWidgetCollapsed.value = collapsedPosition;
            saveLocalStorage(LOCALSTORAGE_COLLAPSED_KEY, collapsedPosition);
            saveLocalStorage(LOCALSTORAGE_KEY, signalWidget.value);
            updateWidgetPosition(false);
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerEnd);
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
          }
          rafId = null;
        });
      };
      const handlePointerEnd = () => {
        if (!container) return;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerEnd);
        const totalDeltaX = Math.abs(lastMouseX - initialMouseX);
        const totalDeltaY = Math.abs(lastMouseY - initialMouseY);
        const totalMovement = Math.sqrt(
          totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY
        );
        if (!hasMoved || totalMovement < 60) return;
        const newCorner = getBestCorner(
          lastMouseX,
          lastMouseY,
          initialMouseX,
          initialMouseY,
          Store.inspectState.value.kind === "focused" ? 80 : 40
        );
        if (newCorner === signalWidget.value.corner) {
          containerStyle.transition = "transform 0.25s cubic-bezier(0, 0, 0.2, 1)";
          const currentPosition = signalWidget.value.dimensions.position;
          requestAnimationFrame(() => {
            containerStyle.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;
          });
          return;
        }
        const snappedPosition = calculatePosition(
          newCorner,
          dimensions.width,
          dimensions.height
        );
        if (currentX === initialX && currentY === initialY) return;
        const onTransitionEnd = () => {
          containerStyle.transition = "none";
          updateDimensions();
          container.removeEventListener("transitionend", onTransitionEnd);
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        };
        container.addEventListener("transitionend", onTransitionEnd);
        containerStyle.transition = "transform 0.25s cubic-bezier(0, 0, 0.2, 1)";
        requestAnimationFrame(() => {
          containerStyle.transform = `translate3d(${snappedPosition.x}px, ${snappedPosition.y}px, 0)`;
        });
        signalWidget.value = {
          corner: newCorner,
          dimensions: {
            isFullWidth: dimensions.isFullWidth,
            isFullHeight: dimensions.isFullHeight,
            width: dimensions.width,
            height: dimensions.height,
            position: snappedPosition
          },
          lastDimensions: signalWidget.value.lastDimensions,
          componentsTree: signalWidget.value.componentsTree
        };
        saveLocalStorage(LOCALSTORAGE_KEY, {
          corner: newCorner,
          dimensions: signalWidget.value.dimensions,
          lastDimensions: signalWidget.value.lastDimensions,
          componentsTree: signalWidget.value.componentsTree
        });
      };
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerEnd);
    },
    []
  );
  const handleCollapsedDrag = q3(
    (e5) => {
      e5.preventDefault();
      if (!refWidget.current || !signalWidgetCollapsed.value) return;
      const { corner: collapsedCorner, orientation = "horizontal" } = signalWidgetCollapsed.value;
      const initialMouseX = e5.clientX;
      const initialMouseY = e5.clientY;
      let rafId = null;
      let hasExpanded = false;
      const DRAG_THRESHOLD = 50;
      const handlePointerMove = (e22) => {
        if (hasExpanded || rafId) return;
        const deltaX = e22.clientX - initialMouseX;
        const deltaY = e22.clientY - initialMouseY;
        let shouldExpand = false;
        if (orientation === "horizontal") {
          if (collapsedCorner.endsWith("left") && deltaX > DRAG_THRESHOLD) {
            shouldExpand = true;
          } else if (collapsedCorner.endsWith("right") && deltaX < -DRAG_THRESHOLD) {
            shouldExpand = true;
          }
        } else {
          if (collapsedCorner.startsWith("top") && deltaY > DRAG_THRESHOLD) {
            shouldExpand = true;
          } else if (collapsedCorner.startsWith("bottom") && deltaY < -DRAG_THRESHOLD) {
            shouldExpand = true;
          }
        }
        if (shouldExpand) {
          hasExpanded = true;
          signalWidgetCollapsed.value = null;
          saveLocalStorage(LOCALSTORAGE_COLLAPSED_KEY, null);
          if (refInitialMinimizedWidth.current === 0 && refWidget.current) {
            requestAnimationFrame(() => {
              if (refWidget.current) {
                refWidget.current.style.width = "min-content";
                const naturalWidth = refWidget.current.offsetWidth;
                refInitialMinimizedWidth.current = naturalWidth || 300;
                const lastDims = signalWidget.value.lastDimensions;
                const targetWidth = calculateBoundedSize(
                  lastDims.width,
                  0,
                  true
                );
                const targetHeight = calculateBoundedSize(
                  lastDims.height,
                  0,
                  false
                );
                let newX = e22.clientX - targetWidth / 2;
                let newY = e22.clientY - targetHeight / 2;
                const safeArea = getSafeArea();
                newX = Math.max(
                  safeArea.left,
                  Math.min(newX, window.innerWidth - targetWidth - safeArea.right)
                );
                newY = Math.max(
                  safeArea.top,
                  Math.min(newY, window.innerHeight - targetHeight - safeArea.bottom)
                );
                signalWidget.value = {
                  ...signalWidget.value,
                  dimensions: {
                    ...signalWidget.value.dimensions,
                    position: { x: newX, y: newY }
                  }
                };
                updateWidgetPosition(true);
                const savedView = readLocalStorage(
                  LOCALSTORAGE_LAST_VIEW_KEY
                );
                signalWidgetViews.value = savedView || { view: "none" };
                setTimeout(() => {
                  if (refWidget.current) {
                    const dragEvent = new PointerEvent("pointerdown", {
                      clientX: e22.clientX,
                      clientY: e22.clientY,
                      pointerId: e22.pointerId,
                      bubbles: true
                    });
                    refWidget.current.dispatchEvent(dragEvent);
                  }
                }, 100);
              }
            });
          } else {
            updateWidgetPosition(true);
            const savedView = readLocalStorage(
              LOCALSTORAGE_LAST_VIEW_KEY
            );
            signalWidgetViews.value = savedView || { view: "none" };
          }
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerEnd);
        }
      };
      const handlePointerEnd = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerEnd);
      };
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerEnd);
    },
    []
  );
  h4(() => {
    if (!refWidget.current) return;
    removeLocalStorage(LOCALSTORAGE_LAST_VIEW_KEY);
    if (!signalWidgetCollapsed.value) {
      refWidget.current.style.width = "min-content";
      refInitialMinimizedHeight.current = 36;
      refInitialMinimizedWidth.current = refWidget.current.offsetWidth;
    } else {
      refInitialMinimizedHeight.current = 36;
      refInitialMinimizedWidth.current = 0;
    }
    const safeArea = getSafeArea();
    refWidget.current.style.maxWidth = `calc(100vw - ${safeArea.left + safeArea.right}px)`;
    refWidget.current.style.maxHeight = `calc(100vh - ${safeArea.top + safeArea.bottom}px)`;
    updateWidgetPosition();
    if (Store.inspectState.value.kind !== "focused" && !signalWidgetCollapsed.value && !refExpandingFromCollapsed.current) {
      signalWidget.value = {
        ...signalWidget.value,
        dimensions: {
          isFullWidth: false,
          isFullHeight: false,
          width: refInitialMinimizedWidth.current,
          height: refInitialMinimizedHeight.current,
          position: signalWidget.value.dimensions.position
        }
      };
    }
    signalRefWidget.value = refWidget.current;
    const unsubscribeSignalWidget = signalWidget.subscribe((widget) => {
      if (!refWidget.current) return;
      const { x: x6, y: y6 } = widget.dimensions.position;
      const { width, height } = widget.dimensions;
      const container = refWidget.current;
      requestAnimationFrame(() => {
        container.style.transform = `translate3d(${x6}px, ${y6}px, 0)`;
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
      });
    });
    const unsubscribeSignalWidgetViews = signalWidgetViews.subscribe(
      (state) => {
        refShouldOpen.current = state.view !== "none";
        updateWidgetPosition();
        if (!signalWidgetCollapsed.value) {
          if (state.view !== "none") {
            saveLocalStorage(LOCALSTORAGE_LAST_VIEW_KEY, state);
          } else {
            removeLocalStorage(LOCALSTORAGE_LAST_VIEW_KEY);
          }
        }
      }
    );
    const unsubscribeStoreInspectState = Store.inspectState.subscribe(
      (state) => {
        refShouldOpen.current = state.kind === "focused";
        updateWidgetPosition();
      }
    );
    const handleWindowResize = () => {
      updateWidgetPosition(true);
    };
    window.addEventListener("resize", handleWindowResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      unsubscribeSignalWidgetViews();
      unsubscribeStoreInspectState();
      unsubscribeSignalWidget();
      saveLocalStorage(LOCALSTORAGE_KEY, {
        ...getDefaultWidgetConfig(),
        corner: signalWidget.value.corner
      });
    };
  }, []);
  const [_7, setTriggerRender] = d4(false);
  h4(() => {
    setTriggerRender(true);
  }, []);
  const isCollapsed = signalWidgetCollapsed.value;
  let arrowRotationClass = "";
  if (isCollapsed) {
    const { orientation = "horizontal", corner } = isCollapsed;
    if (orientation === "horizontal") {
      arrowRotationClass = (corner == null ? void 0 : corner.endsWith("right")) ? "rotate-180" : "";
    } else {
      arrowRotationClass = (corner == null ? void 0 : corner.startsWith("bottom")) ? "-rotate-90" : "rotate-90";
    }
  }
  return u5(S2, { children: [
    u5(ScanOverlay, {}),
    u5(ToolbarElementContext.Provider, { value: refWidget.current, children: u5(
      "div",
      {
        id: "react-scan-toolbar",
        dir: "ltr",
        ref: refWidget,
        onPointerDown: !isCollapsed ? handleDrag : handleCollapsedDrag,
        className: cn(
          "fixed inset-0",
          isCollapsed ? (() => {
            const { orientation = "horizontal", corner } = isCollapsed;
            if (orientation === "horizontal") {
              return (corner == null ? void 0 : corner.endsWith("right")) ? "rounded-tl-lg rounded-bl-lg shadow-lg" : "rounded-tr-lg rounded-br-lg shadow-lg";
            } else {
              return (corner == null ? void 0 : corner.startsWith("bottom")) ? "rounded-tl-lg rounded-tr-lg shadow-lg" : "rounded-bl-lg rounded-br-lg shadow-lg";
            }
          })() : "rounded-lg shadow-lg",
          "flex flex-col",
          "font-mono text-[13px]",
          "user-select-none",
          "opacity-0",
          isCollapsed ? "cursor-pointer" : "cursor-move",
          "z-[124124124124]",
          "animate-fade-in animation-duration-300 animation-delay-300",
          "will-change-transform",
          "[touch-action:none]"
        ),
        style: { WebkitAppRegion: "no-drag" },
        children: isCollapsed ? u5(
          "button",
          {
            type: "button",
            onClick: () => {
              signalWidgetCollapsed.value = null;
              saveLocalStorage(LOCALSTORAGE_COLLAPSED_KEY, null);
              if (refInitialMinimizedWidth.current === 0 && refWidget.current) {
                requestAnimationFrame(() => {
                  if (refWidget.current) {
                    refWidget.current.style.width = "min-content";
                    const naturalWidth = refWidget.current.offsetWidth;
                    refInitialMinimizedWidth.current = naturalWidth || 300;
                    updateWidgetPosition(true);
                  }
                });
              }
              const savedView = readLocalStorage(
                LOCALSTORAGE_LAST_VIEW_KEY
              );
              signalWidgetViews.value = savedView || { view: "none" };
            },
            className: "flex items-center justify-center w-full h-full text-white",
            title: "Expand toolbar",
            children: u5(
              Icon,
              {
                name: "icon-chevron-right",
                size: 16,
                className: cn("transition-transform", arrowRotationClass)
              }
            )
          }
        ) : u5(S2, { children: [
          u5(ResizeHandle, { position: "top" }),
          u5(ResizeHandle, { position: "bottom" }),
          u5(ResizeHandle, { position: "left" }),
          u5(ResizeHandle, { position: "right" }),
          u5(Content, {})
        ] })
      }
    ) })
  ] });
};
var ToolbarElementContext = X2(null);
var SvgSprite = () => {
  return u5("svg", { xmlns: "http://www.w3.org/2000/svg", style: "display: none;", children: [
    u5("title", { children: "React Scan Icons" }),
    u5("symbol", { id: "icon-inspect", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" }),
      u5("path", { d: "M5 3a2 2 0 0 0-2 2" }),
      u5("path", { d: "M19 3a2 2 0 0 1 2 2" }),
      u5("path", { d: "M5 21a2 2 0 0 1-2-2" }),
      u5("path", { d: "M9 3h1" }),
      u5("path", { d: "M9 21h2" }),
      u5("path", { d: "M14 3h1" }),
      u5("path", { d: "M3 9v1" }),
      u5("path", { d: "M21 9v2" }),
      u5("path", { d: "M3 14v1" })
    ] }),
    u5("symbol", { id: "icon-focus", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" }),
      u5("path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" })
    ] }),
    u5("symbol", { id: "icon-next", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: u5("path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z" }) }),
    u5("symbol", { id: "icon-previous", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: u5("path", { d: "M18 15h-6v4l-7-7 7-7v4h6v6z" }) }),
    u5("symbol", { id: "icon-close", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      u5("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ] }),
    u5("symbol", { id: "icon-replay", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }),
      u5("path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }),
      u5("path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }),
      u5("path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }),
      u5("circle", { cx: "12", cy: "12", r: "1" }),
      u5("path", { d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" })
    ] }),
    u5("symbol", { id: "icon-ellipsis", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("circle", { cx: "12", cy: "12", r: "1" }),
      u5("circle", { cx: "19", cy: "12", r: "1" }),
      u5("circle", { cx: "5", cy: "12", r: "1" })
    ] }),
    u5("symbol", { id: "icon-copy", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
      u5("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
    ] }),
    u5("symbol", { id: "icon-check", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: u5("path", { d: "M20 6 9 17l-5-5" }) }),
    u5("symbol", { id: "icon-chevron-right", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: u5("path", { d: "m9 18 6-6-6-6" }) }),
    u5("symbol", { id: "icon-settings", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
      u5("circle", { cx: "12", cy: "12", r: "3" })
    ] }),
    u5("symbol", { id: "icon-flame", viewBox: "0 0 24 24", children: u5("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }) }),
    u5("symbol", { id: "icon-function", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
      u5("path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" }),
      u5("path", { d: "M9 11.2h5.7" })
    ] }),
    u5("symbol", { id: "icon-triangle-alert", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
      u5("path", { d: "M12 9v4" }),
      u5("path", { d: "M12 17h.01" })
    ] }),
    u5("symbol", { id: "icon-gallery-horizontal-end", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M2 7v10" }),
      u5("path", { d: "M6 5v14" }),
      u5("rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" })
    ] }),
    u5("symbol", { id: "icon-search", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("circle", { cx: "11", cy: "11", r: "8" }),
      u5("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
    ] }),
    u5("symbol", { id: "icon-lock", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
      u5("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ] }),
    u5("symbol", { id: "icon-lock-open", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
      u5("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
    ] }),
    u5("symbol", { id: "icon-sanil", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
      u5("path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" }),
      u5("circle", { cx: "10", cy: "13", r: "8" }),
      u5("path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" }),
      u5("path", { d: "M18 3 19.1 5.2" })
    ] })
  ] });
};
var ToolbarErrorBoundary = class extends C3 {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { hasError: false, error: null });
    __publicField(this, "handleReset", () => {
      this.setState({ hasError: false, error: null });
    });
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return u5("div", { className: "fixed bottom-4 right-4 z-[124124124124]", children: u5("div", { className: "p-3 bg-black rounded-lg shadow-lg w-80", children: [
        u5("div", { className: "flex items-center gap-2 mb-2 text-red-400 text-sm font-medium", children: [
          u5(Icon, { name: "icon-flame", className: "text-red-500", size: 14 }),
          "React Scan ran into a problem"
        ] }),
        u5("div", { className: "p-2 bg-black rounded font-mono text-xs text-red-300 mb-3 break-words", children: ((_a = this.state.error) == null ? void 0 : _a.message) || JSON.stringify(this.state.error) }),
        u5(
          "button",
          {
            type: "button",
            onClick: this.handleReset,
            className: "px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5",
            children: "Restart"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
};
var createToolbar = (root) => {
  const container = document.createElement("div");
  container.id = "react-scan-toolbar-root";
  window.__REACT_SCAN_TOOLBAR_CONTAINER__ = container;
  root.appendChild(container);
  R2(
    u5(ToolbarErrorBoundary, { children: u5(S2, { children: [
      u5(SvgSprite, {}),
      u5(Widget, {})
    ] }) }),
    container
  );
  const originalRemove = container.remove.bind(container);
  container.remove = () => {
    window.__REACT_SCAN_TOOLBAR_CONTAINER__ = void 0;
    if (container.hasChildNodes()) {
      R2(null, container);
      R2(null, container);
    }
    originalRemove();
  };
  return container;
};
var didRunVersionCheck = false;
var checkReactGrabVersion = () => {
  if (didRunVersionCheck) return;
  didRunVersionCheck = true;
  if (typeof window === "undefined") return;
  if (window.__REACT_GRAB__) return;
  if (!navigator.onLine) return;
  if (!version) return;
  const fetchOptions = {
    referrerPolicy: "origin",
    keepalive: true,
    priority: "low",
    cache: "no-store"
  };
  try {
    fetch(
      `https://www.react-grab.com/api/version?source=react-scan&v=${version}&t=${Date.now()}`,
      fetchOptions
    ).then((response) => response.ok ? response.text() : null).then((rawLatestVersion) => {
      if (!rawLatestVersion) return;
      const latestVersion = rawLatestVersion.trim();
      if (!/^\d+\.\d+\.\d+/.test(latestVersion)) return;
      if (latestVersion === version) return;
      console.warn(
        `[React Scan] react-grab v${version} is outdated (latest: v${latestVersion}). Update react-scan to pick up the newer react-grab.`
      );
    }).catch(() => null);
  } catch {
  }
};
var SAFE_AREA_EDGES = ["top", "right", "bottom", "left"];
var parseSafeAreaOption = (value) => {
  if (isFiniteNonNegative(value)) {
    return { ok: true, value };
  }
  if (!isPlainObject(value)) {
    return {
      ok: false,
      error: `- safeArea must be a non-negative number or { top?, right?, bottom?, left? }. Got "${JSON.stringify(value)}"`
    };
  }
  const inset = {};
  for (const edge of SAFE_AREA_EDGES) {
    const edgeValue = value[edge];
    if (edgeValue === void 0) continue;
    if (!isFiniteNonNegative(edgeValue)) {
      return {
        ok: false,
        error: `- safeArea.${edge} must be a non-negative number. Got "${JSON.stringify(edgeValue)}"`
      };
    }
    inset[edge] = edgeValue;
  }
  return { ok: true, value: inset };
};
var package_default = {
  name: "react-scan",
  version: "0.5.7",
  description: "Scan your React app for renders",
  keywords: [
    "react",
    "react-scan",
    "react scan",
    "render",
    "performance"
  ],
  homepage: "https://react-scan.million.dev",
  bugs: {
    url: "https://github.com/aidenybai/react-scan/issues"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/aidenybai/react-scan.git"
  },
  license: "MIT",
  author: {
    name: "Aiden Bai",
    email: "aiden@million.dev",
    url: "https://million.dev"
  },
  scripts: {
    build: "pnpm build:css && NODE_ENV=production tsup",
    "build:copy": "pnpm build && cat dist/auto.global.js | pbcopy",
    "build:css": "postcss ./src/web/assets/css/styles.tailwind.css -o ./src/web/assets/css/styles.css",
    "dev:css": "postcss ./src/web/assets/css/styles.tailwind.css -o ./src/web/assets/css/styles.css --watch",
    "dev:tsup": "NODE_ENV=development tsup --watch",
    dev: 'pnpm run --parallel "/^dev:(css|tsup)/"',
    pack: "npm version patch && pnpm build && npm pack",
    "pack:bump": `node scripts/bump-version.mjs && pnpm run pack && echo $(pwd)/react-scan-$(node -p "require('./package.json').version").tgz | pbcopy`,
    publint: "publint",
    test: "vp test run",
    "test:watch": "vp test",
    lint: "vp lint",
    format: "vp fmt",
    typecheck: "tsc --noEmit"
  },
  exports: {
    "./package.json": "./package.json",
    ".": {
      production: {
        import: {
          types: "./dist/index.d.mts",
          "react-server": "./dist/rsc-shim.mjs",
          default: "./dist/index.mjs"
        },
        require: {
          types: "./dist/index.d.mts",
          "react-server": "./dist/rsc-shim.js",
          default: "./dist/index.mjs"
        }
      },
      development: {
        import: {
          types: "./dist/index.d.mts",
          "react-server": "./dist/rsc-shim.mjs",
          default: "./dist/index.mjs"
        },
        require: {
          types: "./dist/index.d.ts",
          "react-server": "./dist/rsc-shim.js",
          default: "./dist/index.js"
        }
      },
      default: {
        import: {
          types: "./dist/index.d.mts",
          "react-server": "./dist/rsc-shim.mjs",
          default: "./dist/index.mjs"
        },
        require: {
          types: "./dist/index.d.ts",
          "react-server": "./dist/rsc-shim.js",
          default: "./dist/index.js"
        }
      }
    },
    "./all-environments": {
      types: "./dist/core/all-environments.d.ts",
      import: "./dist/core/all-environments.mjs",
      require: "./dist/core/all-environments.js"
    },
    "./install-hook": {
      types: "./dist/install-hook.d.ts",
      import: "./dist/install-hook.mjs",
      require: "./dist/install-hook.js"
    },
    "./lite": {
      types: "./dist/lite/index.d.ts",
      import: "./dist/lite/index.mjs",
      require: "./dist/lite/index.js"
    },
    "./auto": {
      production: {
        import: {
          types: "./dist/rsc-shim.d.mts",
          "react-server": "./dist/rsc-shim.mjs",
          default: "./dist/rsc-shim.mjs"
        },
        require: {
          types: "./dist/rsc-shim.d.ts",
          "react-server": "./dist/rsc-shim.js",
          default: "./dist/rsc-shim.js"
        }
      },
      development: {
        import: {
          types: "./dist/auto.d.mts",
          "react-server": "./dist/rsc-shim.mjs",
          default: "./dist/auto.mjs"
        },
        require: {
          types: "./dist/auto.d.ts",
          "react-server": "./dist/rsc-shim.js",
          default: "./dist/auto.js"
        }
      }
    },
    "./dist/*": "./dist/*.js",
    "./dist/*.js": "./dist/*.js",
    "./dist/*.mjs": "./dist/*.mjs",
    "./react-component-name/vite": {
      types: "./dist/react-component-name/vite.d.ts",
      import: "./dist/react-component-name/vite.mjs",
      require: "./dist/react-component-name/vite.js"
    },
    "./react-component-name/webpack": {
      types: "./dist/react-component-name/webpack.d.ts",
      import: "./dist/react-component-name/webpack.mjs",
      require: "./dist/react-component-name/webpack.js"
    },
    "./react-component-name/esbuild": {
      types: "./dist/react-component-name/esbuild.d.ts",
      import: "./dist/react-component-name/esbuild.mjs",
      require: "./dist/react-component-name/esbuild.js"
    },
    "./react-component-name/rspack": {
      types: "./dist/react-component-name/rspack.d.ts",
      import: "./dist/react-component-name/rspack.mjs",
      require: "./dist/react-component-name/rspack.js"
    },
    "./react-component-name/rolldown": {
      types: "./dist/react-component-name/rolldown.d.ts",
      import: "./dist/react-component-name/rolldown.mjs",
      require: "./dist/react-component-name/rolldown.js"
    },
    "./react-component-name/rollup": {
      types: "./dist/react-component-name/rollup.d.ts",
      import: "./dist/react-component-name/rollup.mjs",
      require: "./dist/react-component-name/rollup.js"
    },
    "./react-component-name/astro": {
      types: "./dist/react-component-name/astro.d.ts",
      import: "./dist/react-component-name/astro.mjs",
      require: "./dist/react-component-name/astro.js"
    },
    "./react-component-name/loader": {
      types: "./dist/react-component-name/loader.d.ts",
      import: "./dist/react-component-name/loader.mjs",
      require: "./dist/react-component-name/loader.js"
    }
  },
  main: "dist/index.js",
  module: "dist/index.mjs",
  browser: "dist/auto.global.js",
  types: "dist/index.d.ts",
  typesVersions: {
    "*": {
      "react-component-name/vite": [
        "./dist/react-component-name/vite.d.ts"
      ],
      "react-component-name/webpack": [
        "./dist/react-component-name/webpack.d.ts"
      ],
      "react-component-name/esbuild": [
        "./dist/react-component-name/esbuild.d.ts"
      ],
      "react-component-name/rspack": [
        "./dist/react-component-name/rspack.d.ts"
      ],
      "react-component-name/rolldown": [
        "./dist/react-component-name/rolldown.d.ts"
      ],
      "react-component-name/rollup": [
        "./dist/react-component-name/rollup.d.ts"
      ],
      "react-component-name/astro": [
        "./dist/react-component-name/astro.d.ts"
      ],
      "react-component-name/loader": [
        "./dist/react-component-name/loader.d.ts"
      ]
    }
  },
  bin: "bin/cli.js",
  files: [
    "dist",
    "bin",
    "package.json",
    "README.md",
    "LICENSE",
    "auto.d.ts"
  ],
  dependencies: {
    "@babel/core": "^7.29.0",
    "@babel/types": "^7.29.0",
    "@preact/signals": "^2.9.0",
    "@rollup/pluginutils": "^5.3.0",
    bippy: "^0.5.39",
    commander: "^14.0.0",
    picocolors: "^1.1.1",
    preact: "^10.29.1",
    prompts: "^2.4.2",
    "react-doctor": "latest",
    "react-grab": "latest"
  },
  devDependencies: {
    "@esbuild-plugins/tsconfig-paths": "^0.1.2",
    "@remix-run/react": "*",
    "@tailwindcss/postcss": "^4.2.4",
    "@types/babel__core": "^7.20.5",
    "@types/prompts": "^2.4.9",
    "@types/react": "^19.2.14",
    autoprefixer: "^10.5.0",
    clsx: "^2.1.1",
    "es-module-lexer": "^2.1.0",
    esbuild: "^0.28.0",
    next: "*",
    postcss: "^8.5.13",
    "postcss-cli": "^11.0.0",
    publint: "^0.3.18",
    react: "*",
    "react-dom": "*",
    "tailwind-merge": "^3.5.0",
    tailwindcss: "^4.2.4",
    terser: "^5.46.2",
    tsup: "^8.5.1",
    vitest: "^3.0.0"
  },
  peerDependencies: {
    esbuild: ">=0.18.0",
    react: "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
  },
  peerDependenciesMeta: {
    esbuild: {
      optional: true
    }
  },
  optionalDependencies: {
    unplugin: "^3.0.0"
  },
  publishConfig: {
    access: "public"
  }
};
var rootContainer = null;
var shadowRoot = null;
var initRootContainer = () => {
  if (rootContainer && shadowRoot) {
    return { rootContainer, shadowRoot };
  }
  rootContainer = document.createElement("div");
  rootContainer.id = "react-scan-root";
  shadowRoot = rootContainer.attachShadow({ mode: "open" });
  const cssStyles = document.createElement("style");
  cssStyles.textContent = styles_default;
  shadowRoot.appendChild(cssStyles);
  document.documentElement.appendChild(rootContainer);
  return { rootContainer, shadowRoot };
};
var Store = {
  wasDetailsOpen: y4(true),
  isInIframe: y4(IS_CLIENT && window.self !== window.top),
  inspectState: y4({
    kind: "uninitialized"
  }),
  fiberRoots: /* @__PURE__ */ new Set(),
  reportData: /* @__PURE__ */ new Map(),
  legacyReportData: /* @__PURE__ */ new Map(),
  lastReportTime: y4(0),
  interactionListeningForRenders: null,
  changesListeners: /* @__PURE__ */ new Map()
};
var ReactScanInternals = {
  instrumentation: null,
  componentAllowList: null,
  options: y4({
    enabled: true,
    log: false,
    showToolbar: true,
    animationSpeed: "fast",
    dangerouslyForceRunInProduction: false,
    showFPS: true,
    showNotificationCount: true,
    allowInIframe: false
  }),
  runInAllEnvironments: false,
  onRender: null,
  Store,
  version: package_default.version
};
if (IS_CLIENT && window.__REACT_SCAN_EXTENSION__) {
  window.__REACT_SCAN_VERSION__ = ReactScanInternals.version;
}
var applyLocalStorageOptions = (options) => {
  const { onCommitStart, onRender: onRender2, onCommitFinish, ...rest } = options;
  return rest;
};
var validateOptions = (options) => {
  const errors = [];
  const validOptions = {};
  for (const key in options) {
    const value = options[key];
    switch (key) {
      case "enabled":
      case "log":
      case "showToolbar":
      case "showNotificationCount":
      case "dangerouslyForceRunInProduction":
      case "showFPS":
      case "allowInIframe":
      case "useOffscreenCanvasWorker":
        if (typeof value !== "boolean") {
          errors.push(`- ${key} must be a boolean. Got "${value}"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case "animationSpeed":
        if (!["slow", "fast", "off"].includes(value)) {
          errors.push(`- Invalid animation speed "${value}". Using default "fast"`);
        } else {
          validOptions[key] = value;
        }
        break;
      case "safeArea": {
        const parsed = parseSafeAreaOption(value);
        if (parsed.ok) {
          validOptions.safeArea = parsed.value;
        } else {
          errors.push(parsed.error);
        }
        break;
      }
      case "onCommitStart":
        if (typeof value !== "function") {
          errors.push(`- ${key} must be a function. Got "${value}"`);
        } else {
          validOptions.onCommitStart = value;
        }
        break;
      case "onCommitFinish":
        if (typeof value !== "function") {
          errors.push(`- ${key} must be a function. Got "${value}"`);
        } else {
          validOptions.onCommitFinish = value;
        }
        break;
      case "onRender":
        if (typeof value !== "function") {
          errors.push(`- ${key} must be a function. Got "${value}"`);
        } else {
          validOptions.onRender = value;
        }
        break;
      default:
        errors.push(`- Unknown option "${key}"`);
    }
  }
  if (errors.length > 0) {
    console.warn(`[React Scan] Invalid options:
${errors.join("\n")}`);
  }
  return validOptions;
};
var getReport = (type) => {
  if (type) {
    for (const reportData of Array.from(Store.legacyReportData.values())) {
      if (reportData.type === type) {
        return reportData;
      }
    }
    return null;
  }
  return Store.legacyReportData;
};
var setOptions = (userOptions) => {
  var _a;
  try {
    const validOptions = validateOptions(userOptions);
    if (Object.keys(validOptions).length === 0) {
      return;
    }
    const shouldInitToolbar = "showToolbar" in validOptions && validOptions.showToolbar !== void 0;
    const newOptions = {
      ...ReactScanInternals.options.value,
      ...validOptions
    };
    const { instrumentation } = ReactScanInternals;
    if (instrumentation && "enabled" in validOptions) {
      instrumentation.isPaused.value = validOptions.enabled === false;
    }
    ReactScanInternals.options.value = newOptions;
    try {
      const existing = (_a = readLocalStorage(
        "react-scan-options"
      )) == null ? void 0 : _a.enabled;
      if (typeof existing === "boolean") {
        newOptions.enabled = existing;
      }
    } catch (e5) {
      if (ReactScanInternals.options.value._debug === "verbose") {
        console.error(
          "[React Scan Internal Error]",
          "Failed to create notifications outline canvas",
          e5
        );
      }
    }
    saveLocalStorage(
      "react-scan-options",
      applyLocalStorageOptions(newOptions)
    );
    if (shouldInitToolbar) {
      initToolbar(!!newOptions.showToolbar);
    }
    return newOptions;
  } catch (e5) {
    if (ReactScanInternals.options.value._debug === "verbose") {
      console.error(
        "[React Scan Internal Error]",
        "Failed to create notifications outline canvas",
        e5
      );
    }
  }
};
var getOptions = () => ReactScanInternals.options;
var isProduction = null;
var rdtHook;
var getIsProduction = () => {
  if (isProduction === false) {
    return false;
  }
  rdtHook != null ? rdtHook : rdtHook = h();
  const renderers = Array.from(rdtHook.renderers.values());
  if (renderers.length === 0) {
    return null;
  }
  for (const renderer of renderers) {
    const buildType = P(renderer);
    if (buildType !== "production") {
      isProduction = false;
      return false;
    }
  }
  return true;
};
var start = () => {
  try {
    if (!IS_CLIENT) {
      return;
    }
    if (!ReactScanInternals.runInAllEnvironments && getIsProduction() && !ReactScanInternals.options.value.dangerouslyForceRunInProduction) {
      return;
    }
    checkReactGrabVersion();
    const localStorageOptions = readLocalStorage("react-scan-options");
    if (localStorageOptions) {
      const validLocalOptions = validateOptions(localStorageOptions);
      if (Object.keys(validLocalOptions).length > 0) {
        ReactScanInternals.options.value = {
          ...ReactScanInternals.options.value,
          ...validLocalOptions
        };
      }
    }
    const options = getOptions();
    initReactScanInstrumentation(() => {
      initToolbar(!!options.value.showToolbar);
    });
    if (IS_CLIENT) {
      setTimeout(() => {
        if (De()) return;
        console.error("[React Scan] Failed to load. Must import React Scan before React runs.");
      }, 5e3);
    }
  } catch (e5) {
    if (ReactScanInternals.options.value._debug === "verbose") {
      console.error(
        "[React Scan Internal Error]",
        "Failed to create notifications outline canvas",
        e5
      );
    }
  }
};
var initToolbar = (showToolbar) => {
  var _a;
  (_a = window.reactScanCleanupListeners) == null ? void 0 : _a.call(window);
  const cleanupTimingTracking = startTimingTracking();
  const cleanupOutlineCanvas = createNotificationsOutlineCanvas();
  window.reactScanCleanupListeners = () => {
    cleanupTimingTracking();
    cleanupOutlineCanvas == null ? void 0 : cleanupOutlineCanvas();
  };
  const windowToolbarContainer = window.__REACT_SCAN_TOOLBAR_CONTAINER__;
  if (!showToolbar) {
    windowToolbarContainer == null ? void 0 : windowToolbarContainer.remove();
    return;
  }
  windowToolbarContainer == null ? void 0 : windowToolbarContainer.remove();
  const { shadowRoot: shadowRoot2 } = initRootContainer();
  createToolbar(shadowRoot2);
};
var createNotificationsOutlineCanvas = () => {
  try {
    const highlightRoot = document.documentElement;
    return createHighlightCanvas(highlightRoot);
  } catch (e5) {
    if (ReactScanInternals.options.value._debug === "verbose") {
      console.error(
        "[React Scan Internal Error]",
        "Failed to create notifications outline canvas",
        e5
      );
    }
  }
};
var scan = (options = {}) => {
  setOptions(options);
  const isInIframe = Store.isInIframe.value;
  if (isInIframe && !ReactScanInternals.options.value.allowInIframe && !ReactScanInternals.runInAllEnvironments) {
    return;
  }
  if (options.enabled === false && options.showToolbar !== true) {
    return;
  }
  start();
};
var useScan = (options = {}) => {
  setOptions(options);
  start();
};
var onRender = (type, _onRender) => {
  const prevOnRender = ReactScanInternals.onRender;
  ReactScanInternals.onRender = (fiber, renders) => {
    prevOnRender == null ? void 0 : prevOnRender(fiber, renders);
    if (N(fiber.type) === type) {
      _onRender(fiber, renders);
    }
  };
};
var ignoredProps = /* @__PURE__ */ new WeakSet();
var ignoreScan = (node) => {
  if (node && typeof node === "object") {
    ignoredProps.add(node);
  }
};
export {
  ReactScanInternals,
  Store,
  getIsProduction,
  getOptions,
  getReport,
  ignoreScan,
  ignoredProps,
  onRender,
  scan,
  setOptions,
  start,
  useScan
};
//# sourceMappingURL=react-scan.js.map
