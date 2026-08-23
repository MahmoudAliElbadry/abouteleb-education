import {
  C,
  Ee,
  H,
  Te,
  cn,
  h,
  nn,
  tn
} from "./chunk-HNU6O7RQ.js";

// ../../node_modules/react-grab/dist/execute-context-menu-action-Bbh74u99.js
var c = { context: void 0, registry: void 0, effects: void 0, done: false, getContextId() {
  return l(this.context.count);
}, getNextContextId() {
  return l(this.context.count++);
} };
function l(e) {
  let t = String(e), n = t.length - 1;
  return c.context.id + (n ? String.fromCharCode(96 + n) : ``) + t;
}
function u(e) {
  c.context = e;
}
var d = (e, t) => e === t;
var f = /* @__PURE__ */ Symbol(`solid-proxy`);
var p = typeof Proxy == `function`;
var m = /* @__PURE__ */ Symbol(`solid-track`);
var h2 = { equals: d };
var g = me;
var _ = { owned: null, cleanups: null, context: null, owner: null };
var v = {};
var y = null;
var b = null;
var x = null;
var S = null;
var C2 = null;
var w = 0;
function T(e, t) {
  let n = x, r = y, i = e.length === 0, a = t === void 0 ? r : t, o = i ? _ : { owned: null, cleanups: null, context: a ? a.context : null, owner: a }, s = i ? e : () => e(() => M(() => H2(o)));
  y = o, x = null;
  try {
    return B(s, true);
  } finally {
    x = n, y = r;
  }
}
function E(e, t) {
  t = t ? Object.assign({}, h2, t) : h2;
  let n = { value: e, observers: null, observerSlots: null, comparator: t.equals || void 0 };
  return [ue.bind(n), (e2) => (typeof e2 == `function` && (e2 = b && b.running && b.sources.has(n) ? e2(n.tValue) : e2(n.value)), de(n, e2))];
}
function ee(e, t, n) {
  L(R(e, t, true, 1));
}
function D(e, t, n) {
  L(R(e, t, false, 1));
}
function O(e, t, n) {
  g = he;
  let r = R(e, t, false, 1), i = I && F(I);
  i && (r.suspense = i), (!n || !n.render) && (r.user = true), C2 ? C2.push(r) : L(r);
}
function k(e, t, n) {
  n = n ? Object.assign({}, h2, n) : h2;
  let r = R(e, t, true, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, L(r), ue.bind(r);
}
function te(e) {
  return e && typeof e == `object` && `then` in e;
}
function A(e, t, n) {
  let r, i, a;
  typeof t == `function` ? (r = e, i = t, a = n || {}) : (r = true, i = e, a = t || {});
  let o = null, s = v, l2 = null, u2 = false, d2 = false, f2 = `initialValue` in a, p2 = typeof r == `function` && k(r), m2 = /* @__PURE__ */ new Set(), [h3, g2] = (a.storage || E)(a.initialValue), [_2, S2] = E(void 0), [C3, w2] = E(void 0, { equals: false }), [T2, D2] = E(f2 ? `ready` : `unresolved`);
  c.context && (l2 = c.getNextContextId(), a.ssrLoadFrom === `initial` ? s = a.initialValue : c.load && c.has(l2) && (s = c.load(l2)));
  function O2(e2, t2, n2, r2) {
    return o === e2 && (o = null, r2 !== void 0 && (f2 = true), (e2 === s || t2 === s) && a.onHydrated && queueMicrotask(() => a.onHydrated(r2, { value: t2 })), s = v, b && e2 && u2 ? (b.promises.delete(e2), u2 = false, B(() => {
      b.running = true, A2(t2, n2);
    }, false)) : A2(t2, n2)), t2;
  }
  function A2(e2, t2) {
    B(() => {
      t2 === void 0 && g2(() => e2), D2(t2 === void 0 ? f2 ? `ready` : `unresolved` : `errored`), S2(t2);
      for (let e3 of m2.keys()) e3.decrement();
      m2.clear();
    }, false);
  }
  function j2() {
    let e2 = I && F(I), t2 = h3(), n2 = _2();
    if (n2 !== void 0 && !o) throw n2;
    return x && !x.user && e2 && ee(() => {
      C3(), o && (e2.resolved && b && u2 ? b.promises.add(o) : m2.has(e2) || (e2.increment(), m2.add(e2)));
    }), t2;
  }
  function N2(e2 = true) {
    if (e2 !== false && d2) return;
    d2 = false;
    let t2 = p2 ? p2() : r;
    if (u2 = b && b.running, t2 == null || t2 === false) {
      O2(o, M(h3));
      return;
    }
    b && o && b.promises.delete(o);
    let n2, a2 = s === v ? M(() => {
      try {
        return i(t2, { value: h3(), refetching: e2 });
      } catch (e3) {
        n2 = e3;
      }
    }) : s;
    if (n2 !== void 0) {
      O2(o, void 0, U(n2), t2);
      return;
    } else if (!te(a2)) return O2(o, a2, void 0, t2), a2;
    return o = a2, `v` in a2 ? (a2.s === 1 ? O2(o, a2.v, void 0, t2) : O2(o, void 0, U(a2.v), t2), a2) : (d2 = true, queueMicrotask(() => d2 = false), B(() => {
      D2(f2 ? `refreshing` : `pending`), w2();
    }, false), a2.then((e3) => O2(a2, e3, void 0, t2), (e3) => O2(a2, void 0, U(e3), t2)));
  }
  Object.defineProperties(j2, { state: { get: () => T2() }, error: { get: () => _2() }, loading: { get() {
    let e2 = T2();
    return e2 === `pending` || e2 === `refreshing`;
  } }, latest: { get() {
    if (!f2) return j2();
    let e2 = _2();
    if (e2 && !o) throw e2;
    return h3();
  } } });
  let P2 = y;
  return p2 ? ee(() => (P2 = y, N2(false))) : N2(false), [j2, { refetch: (e2) => ae(P2, () => N2(e2)), mutate: g2 }];
}
function j(e) {
  return B(e, false);
}
function M(e) {
  if (x === null) return e();
  let t = x;
  x = null;
  try {
    return e();
  } finally {
    x = t;
  }
}
function N(e, t, n) {
  let r = Array.isArray(e), i, a = n && n.defer;
  return (n2) => {
    let o;
    if (r) {
      o = Array(e.length);
      for (let t2 = 0; t2 < e.length; t2++) o[t2] = e[t2]();
    } else o = e();
    if (a) return a = false, n2;
    let s = M(() => t(o, i, n2));
    return i = o, s;
  };
}
function P(e) {
  O(() => M(e));
}
function ne(e) {
  return y === null || (y.cleanups === null ? y.cleanups = [e] : y.cleanups.push(e)), e;
}
function re() {
  return x;
}
function ie() {
  return y;
}
function ae(e, t) {
  let n = y, r = x;
  y = e, x = null;
  try {
    return B(t, true);
  } catch (e2) {
    W(e2);
  } finally {
    y = n, x = r;
  }
}
var [oe, se] = E(false);
function ce(e, t) {
  let n = /* @__PURE__ */ Symbol(`context`);
  return { id: n, Provider: ve(n), defaultValue: e };
}
function F(e) {
  let t;
  return y && y.context && (t = y.context[e.id]) !== void 0 ? t : e.defaultValue;
}
function le(e) {
  let t = k(e), n = k(() => G(t()));
  return n.toArray = () => {
    let e2 = n();
    return Array.isArray(e2) ? e2 : e2 == null ? [] : [e2];
  }, n;
}
var I;
function ue() {
  let e = b && b.running;
  if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === 1) L(this);
  else {
    let e2 = S;
    S = null, B(() => V(this), false), S = e2;
  }
  if (x) {
    let e2 = this.observers ? this.observers.length : 0;
    x.sources ? (x.sources.push(this), x.sourceSlots.push(e2)) : (x.sources = [this], x.sourceSlots = [e2]), this.observers ? (this.observers.push(x), this.observerSlots.push(x.sources.length - 1)) : (this.observers = [x], this.observerSlots = [x.sources.length - 1]);
  }
  return e && b.sources.has(this) ? this.tValue : this.value;
}
function de(e, t, n) {
  let r = b && b.running && b.sources.has(e) ? e.tValue : e.value;
  if (!e.comparator || !e.comparator(r, t)) {
    if (b) {
      let r2 = b.running;
      (r2 || !n && b.sources.has(e)) && (b.sources.add(e), e.tValue = t), r2 || (e.value = t);
    } else e.value = t;
    e.observers && e.observers.length && B(() => {
      for (let t2 = 0; t2 < e.observers.length; t2 += 1) {
        let n2 = e.observers[t2], r2 = b && b.running;
        r2 && b.disposed.has(n2) || ((r2 ? !n2.tState : !n2.state) && (n2.pure ? S.push(n2) : C2.push(n2), n2.observers && ge(n2)), r2 ? n2.tState = 1 : n2.state = 1);
      }
      if (S.length > 1e6) throw S = [], Error();
    }, false);
  }
  return t;
}
function L(e) {
  if (!e.fn) return;
  H2(e);
  let t = w;
  fe(e, b && b.running && b.sources.has(e) ? e.tValue : e.value, t), b && !b.running && b.sources.has(e) && queueMicrotask(() => {
    B(() => {
      b && (b.running = true), x = y = e, fe(e, e.tValue, t), x = y = null;
    }, false);
  });
}
function fe(e, t, n) {
  let r, i = y, a = x;
  x = y = e;
  try {
    r = e.fn(t);
  } catch (t2) {
    return e.pure && (b && b.running ? (e.tState = 1, e.tOwned && e.tOwned.forEach(H2), e.tOwned = void 0) : (e.state = 1, e.owned && e.owned.forEach(H2), e.owned = null)), e.updatedAt = n + 1, W(t2);
  } finally {
    x = a, y = i;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && `observers` in e ? de(e, r, true) : b && b.running && e.pure ? (b.sources.has(e) || (e.value = r), b.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function R(e, t, n, r = 1, i) {
  let a = { fn: e, state: r, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: t, owner: y, context: y ? y.context : null, pure: n };
  return b && b.running && (a.state = 0, a.tState = r), y === null || y !== _ && (b && b.running && y.pure ? y.tOwned ? y.tOwned.push(a) : y.tOwned = [a] : y.owned ? y.owned.push(a) : y.owned = [a]), a;
}
function z(e) {
  let t = b && b.running;
  if ((t ? e.tState : e.state) === 0) return;
  if ((t ? e.tState : e.state) === 2) return V(e);
  if (e.suspense && M(e.suspense.inFallback)) return e.suspense.effects.push(e);
  let n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < w); ) {
    if (t && b.disposed.has(e)) return;
    (t ? e.tState : e.state) && n.push(e);
  }
  for (let r = n.length - 1; r >= 0; r--) {
    if (e = n[r], t) {
      let t2 = e, i = n[r + 1];
      for (; (t2 = t2.owner) && t2 !== i; ) if (b.disposed.has(t2)) return;
    }
    if ((t ? e.tState : e.state) === 1) L(e);
    else if ((t ? e.tState : e.state) === 2) {
      let t2 = S;
      S = null, B(() => V(e, n[0]), false), S = t2;
    }
  }
}
function B(e, t) {
  if (S) return e();
  let n = false;
  t || (S = []), C2 ? n = true : C2 = [], w++;
  try {
    let t2 = e();
    return pe(n), t2;
  } catch (e2) {
    n || (C2 = null), S = null, W(e2);
  }
}
function pe(e) {
  if (S &&= (me(S), null), e) return;
  let t;
  if (b) {
    if (!b.promises.size && !b.queue.size) {
      let e2 = b.sources, n2 = b.disposed;
      C2.push.apply(C2, b.effects), t = b.resolve;
      for (let e3 of C2) `tState` in e3 && (e3.state = e3.tState), delete e3.tState;
      b = null, B(() => {
        for (let e3 of n2) H2(e3);
        for (let t2 of e2) {
          if (t2.value = t2.tValue, t2.owned) for (let e3 = 0, n3 = t2.owned.length; e3 < n3; e3++) H2(t2.owned[e3]);
          t2.tOwned && (t2.owned = t2.tOwned), delete t2.tValue, delete t2.tOwned, t2.tState = 0;
        }
        se(false);
      }, false);
    } else if (b.running) {
      b.running = false, b.effects.push.apply(b.effects, C2), C2 = null, se(true);
      return;
    }
  }
  let n = C2;
  C2 = null, n.length && B(() => g(n), false), t && t();
}
function me(e) {
  for (let t = 0; t < e.length; t++) z(e[t]);
}
function he(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    let r = e[t];
    r.user ? e[n++] = r : z(r);
  }
  if (c.context) {
    if (c.count) {
      c.effects ||= [], c.effects.push(...e.slice(0, n));
      return;
    }
    u();
  }
  for (c.effects && (c.done || !c.count) && (e = [...c.effects, ...e], n += c.effects.length, delete c.effects), t = 0; t < n; t++) z(e[t]);
}
function V(e, t) {
  let n = b && b.running;
  n ? e.tState = 0 : e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    let i = e.sources[r];
    if (i.sources) {
      let e2 = n ? i.tState : i.state;
      e2 === 1 ? i !== t && (!i.updatedAt || i.updatedAt < w) && z(i) : e2 === 2 && V(i, t);
    }
  }
}
function ge(e) {
  let t = b && b.running;
  for (let n = 0; n < e.observers.length; n += 1) {
    let r = e.observers[n];
    (t ? !r.tState : !r.state) && (t ? r.tState = 2 : r.state = 2, r.pure ? S.push(r) : C2.push(r), r.observers && ge(r));
  }
}
function H2(e) {
  let t;
  if (e.sources) for (; e.sources.length; ) {
    let t2 = e.sources.pop(), n = e.sourceSlots.pop(), r = t2.observers;
    if (r && r.length) {
      let e2 = r.pop(), i = t2.observerSlots.pop();
      n < r.length && (e2.sourceSlots[i] = n, r[n] = e2, t2.observerSlots[n] = i);
    }
  }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) H2(e.tOwned[t]);
    delete e.tOwned;
  }
  if (b && b.running && e.pure) _e(e, true);
  else if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) H2(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  b && b.running ? e.tState = 0 : e.state = 0;
}
function _e(e, t) {
  if (t || (e.tState = 0, b.disposed.add(e)), e.owned) for (let t2 = 0; t2 < e.owned.length; t2++) _e(e.owned[t2]);
}
function U(e) {
  return e instanceof Error ? e : Error(typeof e == `string` ? e : `Unknown error`, { cause: e });
}
function W(e, t = y) {
  throw U(e);
}
function G(e) {
  if (typeof e == `function` && !e.length) return G(e());
  if (Array.isArray(e)) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
      let r = G(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function ve(e, t) {
  return function(t2) {
    let n;
    return D(() => n = M(() => (y.context = { ...y.context, [e]: t2.value }, le(() => t2.children))), void 0), n;
  };
}
var ye = /* @__PURE__ */ Symbol(`fallback`);
function be(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function xe(e, t, n = {}) {
  let r = [], i = [], a = [], o = 0, s = t.length > 1 ? [] : null;
  return ne(() => be(a)), () => {
    let c2 = e() || [], l2 = c2.length, u2, d2;
    return c2[m], M(() => {
      let e2, t2, p2, m2, h3, g2, _2, v2, y2;
      if (l2 === 0) o !== 0 && (be(a), a = [], r = [], i = [], o = 0, s &&= []), n.fallback && (r = [ye], i[0] = T((e3) => (a[0] = e3, n.fallback())), o = 1);
      else if (o === 0) {
        for (i = Array(l2), d2 = 0; d2 < l2; d2++) r[d2] = c2[d2], i[d2] = T(f2);
        o = l2;
      } else {
        for (p2 = Array(l2), m2 = Array(l2), s && (h3 = Array(l2)), g2 = 0, _2 = Math.min(o, l2); g2 < _2 && r[g2] === c2[g2]; g2++) ;
        for (_2 = o - 1, v2 = l2 - 1; _2 >= g2 && v2 >= g2 && r[_2] === c2[v2]; _2--, v2--) p2[v2] = i[_2], m2[v2] = a[_2], s && (h3[v2] = s[_2]);
        for (e2 = /* @__PURE__ */ new Map(), t2 = Array(v2 + 1), d2 = v2; d2 >= g2; d2--) y2 = c2[d2], u2 = e2.get(y2), t2[d2] = u2 === void 0 ? -1 : u2, e2.set(y2, d2);
        for (u2 = g2; u2 <= _2; u2++) y2 = r[u2], d2 = e2.get(y2), d2 !== void 0 && d2 !== -1 ? (p2[d2] = i[u2], m2[d2] = a[u2], s && (h3[d2] = s[u2]), d2 = t2[d2], e2.set(y2, d2)) : a[u2]();
        for (d2 = g2; d2 < l2; d2++) d2 in p2 ? (i[d2] = p2[d2], a[d2] = m2[d2], s && (s[d2] = h3[d2], s[d2](d2))) : i[d2] = T(f2);
        i = i.slice(0, o = l2), r = c2.slice(0);
      }
      return i;
    });
    function f2(e2) {
      if (a[d2] = e2, s) {
        let [e3, n2] = E(d2);
        return s[d2] = n2, t(c2[d2], e3);
      }
      return t(c2[d2]);
    }
  };
}
function Se(e, t) {
  return M(() => e(t || {}));
}
function K() {
  return true;
}
var q = { get(e, t, n) {
  return t === f ? n : e.get(t);
}, has(e, t) {
  return t === f ? true : e.has(t);
}, set: K, deleteProperty: K, getOwnPropertyDescriptor(e, t) {
  return { configurable: true, enumerable: true, get() {
    return e.get(t);
  }, set: K, deleteProperty: K };
}, ownKeys(e) {
  return e.keys();
} };
function J(e) {
  return (e = typeof e == `function` ? e() : e) ? e : {};
}
function Ce() {
  for (let e = 0, t = this.length; e < t; ++e) {
    let t2 = this[e]();
    if (t2 !== void 0) return t2;
  }
}
function we(...e) {
  let t = false;
  for (let n2 = 0; n2 < e.length; n2++) {
    let r2 = e[n2];
    t ||= !!r2 && f in r2, e[n2] = typeof r2 == `function` ? (t = true, k(r2)) : r2;
  }
  if (p && t) return new Proxy({ get(t2) {
    for (let n2 = e.length - 1; n2 >= 0; n2--) {
      let r2 = J(e[n2])[t2];
      if (r2 !== void 0) return r2;
    }
  }, has(t2) {
    for (let n2 = e.length - 1; n2 >= 0; n2--) if (t2 in J(e[n2])) return true;
    return false;
  }, keys() {
    let t2 = [];
    for (let n2 = 0; n2 < e.length; n2++) t2.push(...Object.keys(J(e[n2])));
    return [...new Set(t2)];
  } }, q);
  let n = {}, r = /* @__PURE__ */ Object.create(null);
  for (let t2 = e.length - 1; t2 >= 0; t2--) {
    let i2 = e[t2];
    if (!i2) continue;
    let a2 = Object.getOwnPropertyNames(i2);
    for (let e2 = a2.length - 1; e2 >= 0; e2--) {
      let t3 = a2[e2];
      if (t3 === `__proto__` || t3 === `constructor`) continue;
      let o = Object.getOwnPropertyDescriptor(i2, t3);
      if (!r[t3]) r[t3] = o.get ? { enumerable: true, configurable: true, get: Ce.bind(n[t3] = [o.get.bind(i2)]) } : o.value === void 0 ? void 0 : o;
      else {
        let e3 = n[t3];
        e3 && (o.get ? e3.push(o.get.bind(i2)) : o.value !== void 0 && e3.push(() => o.value));
      }
    }
  }
  let i = {}, a = Object.keys(r);
  for (let e2 = a.length - 1; e2 >= 0; e2--) {
    let t2 = a[e2], n2 = r[t2];
    n2 && n2.get ? Object.defineProperty(i, t2, n2) : i[t2] = n2 ? n2.value : void 0;
  }
  return i;
}
function Te2(e, ...t) {
  let n = t.length;
  if (p && f in e) {
    let r2 = n > 1 ? t.flat() : t[0], i = t.map((t2) => new Proxy({ get(n2) {
      return t2.includes(n2) ? e[n2] : void 0;
    }, has(n2) {
      return t2.includes(n2) && n2 in e;
    }, keys() {
      return t2.filter((t3) => t3 in e);
    } }, q));
    return i.push(new Proxy({ get(t2) {
      return r2.includes(t2) ? void 0 : e[t2];
    }, has(t2) {
      return r2.includes(t2) ? false : t2 in e;
    }, keys() {
      return Object.keys(e).filter((e2) => !r2.includes(e2));
    } }, q)), i;
  }
  let r = [];
  for (let e2 = 0; e2 <= n; e2++) r[e2] = {};
  for (let i of Object.getOwnPropertyNames(e)) {
    let a = n;
    for (let e2 = 0; e2 < t.length; e2++) if (t[e2].includes(i)) {
      a = e2;
      break;
    }
    let o = Object.getOwnPropertyDescriptor(e, i);
    !o.get && !o.set && o.enumerable && o.writable && o.configurable ? r[a][i] = o.value : Object.defineProperty(r[a], i, o);
  }
  return r;
}
var Ee2 = (e) => `Stale read from <${e}>.`;
function De(e) {
  let t = `fallback` in e && { fallback: () => e.fallback };
  return k(xe(() => e.each, e.children, t || void 0));
}
function Oe(e) {
  let t = e.keyed, n = k(() => e.when, void 0, void 0), r = t ? n : k(n, void 0, { equals: (e2, t2) => !e2 == !t2 });
  return k(() => {
    let i = r();
    if (i) {
      let a = e.children;
      return typeof a == `function` && a.length > 0 ? M(() => a(t ? i : () => {
        if (!M(r)) throw Ee2(`Show`);
        return n();
      })) : a;
    }
    return e.fallback;
  }, void 0, void 0);
}
var ke = /* @__PURE__ */ new Set([`className`, `value`, `readOnly`, `noValidate`, `formNoValidate`, `isMap`, `noModule`, `playsInline`, `adAuctionHeaders`, `allowFullscreen`, `browsingTopics`, `defaultChecked`, `defaultMuted`, `defaultSelected`, `disablePictureInPicture`, `disableRemotePlayback`, `preservesPitch`, `shadowRootClonable`, `shadowRootCustomElementRegistry`, `shadowRootDelegatesFocus`, `shadowRootSerializable`, `sharedStorageWritable`, ...`allowfullscreen.async.alpha.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.hidden.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.adauctionheaders.browsingtopics.credentialless.defaultchecked.defaultmuted.defaultselected.defer.disablepictureinpicture.disableremoteplayback.preservespitch.shadowrootclonable.shadowrootcustomelementregistry.shadowrootdelegatesfocus.shadowrootserializable.sharedstoragewritable`.split(`.`)]);
var Ae = /* @__PURE__ */ new Set([`innerHTML`, `textContent`, `innerText`, `children`]);
var je = Object.assign(/* @__PURE__ */ Object.create(null), { className: `class`, htmlFor: `for` });
var Me = Object.assign(/* @__PURE__ */ Object.create(null), { class: `className`, novalidate: { $: `noValidate`, FORM: 1 }, formnovalidate: { $: `formNoValidate`, BUTTON: 1, INPUT: 1 }, ismap: { $: `isMap`, IMG: 1 }, nomodule: { $: `noModule`, SCRIPT: 1 }, playsinline: { $: `playsInline`, VIDEO: 1 }, readonly: { $: `readOnly`, INPUT: 1, TEXTAREA: 1 }, adauctionheaders: { $: `adAuctionHeaders`, IFRAME: 1 }, allowfullscreen: { $: `allowFullscreen`, IFRAME: 1 }, browsingtopics: { $: `browsingTopics`, IMG: 1 }, defaultchecked: { $: `defaultChecked`, INPUT: 1 }, defaultmuted: { $: `defaultMuted`, AUDIO: 1, VIDEO: 1 }, defaultselected: { $: `defaultSelected`, OPTION: 1 }, disablepictureinpicture: { $: `disablePictureInPicture`, VIDEO: 1 }, disableremoteplayback: { $: `disableRemotePlayback`, AUDIO: 1, VIDEO: 1 }, preservespitch: { $: `preservesPitch`, AUDIO: 1, VIDEO: 1 }, shadowrootclonable: { $: `shadowRootClonable`, TEMPLATE: 1 }, shadowrootdelegatesfocus: { $: `shadowRootDelegatesFocus`, TEMPLATE: 1 }, shadowrootserializable: { $: `shadowRootSerializable`, TEMPLATE: 1 }, sharedstoragewritable: { $: `sharedStorageWritable`, IFRAME: 1, IMG: 1 } });
function Ne(e, t) {
  let n = Me[e];
  return typeof n == `object` ? n[t] ? n.$ : void 0 : n;
}
var Pe = /* @__PURE__ */ new Set([`beforeinput`, `click`, `dblclick`, `contextmenu`, `focusin`, `focusout`, `input`, `keydown`, `keyup`, `mousedown`, `mousemove`, `mouseout`, `mouseover`, `mouseup`, `pointerdown`, `pointermove`, `pointerout`, `pointerover`, `pointerup`, `touchend`, `touchmove`, `touchstart`]);
var Fe = { xlink: `http://www.w3.org/1999/xlink`, xml: `http://www.w3.org/XML/1998/namespace` };
var Ie = (e) => k(() => e());
function Le(e, t, n) {
  let r = n.length, i = t.length, a = r, o = 0, s = 0, c2 = t[i - 1].nextSibling, l2 = null;
  for (; o < i || s < a; ) {
    if (t[o] === n[s]) {
      o++, s++;
      continue;
    }
    for (; t[i - 1] === n[a - 1]; ) i--, a--;
    if (i === o) {
      let t2 = a < r ? s ? n[s - 1].nextSibling : n[a - s] : c2;
      for (; s < a; ) e.insertBefore(n[s++], t2);
    } else if (a === s) for (; o < i; ) (!l2 || !l2.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[a - 1] && n[s] === t[i - 1]) {
      let r2 = t[--i].nextSibling;
      e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--a], r2), t[i] = n[a];
    } else {
      if (!l2) {
        l2 = /* @__PURE__ */ new Map();
        let e2 = s;
        for (; e2 < a; ) l2.set(n[e2], e2++);
      }
      let r2 = l2.get(t[o]);
      if (r2 != null) if (s < r2 && r2 < a) {
        let c3 = o, u2 = 1, d2;
        for (; ++c3 < i && c3 < a && !((d2 = l2.get(t[c3])) == null || d2 !== r2 + u2); ) u2++;
        if (u2 > r2 - s) {
          let i2 = t[o];
          for (; s < r2; ) e.insertBefore(n[s++], i2);
        } else e.replaceChild(n[s++], t[o++]);
      } else o++;
      else t[o++].remove();
    }
  }
}
var Re = `_$DX_DELEGATE`;
function ze(e, t, n, r = {}) {
  let i;
  return T((r2) => {
    i = r2, t === document ? e() : Ze(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    i(), t.textContent = ``;
  };
}
function Be(e, t, n, r) {
  let i, a = () => {
    let t2 = r ? document.createElementNS(`http://www.w3.org/1998/Math/MathML`, `template`) : document.createElement(`template`);
    return t2.innerHTML = e, n ? t2.content.firstChild.firstChild : r ? t2.firstChild : t2.content.firstChild;
  }, o = t ? () => M(() => document.importNode(i ||= a(), true)) : () => (i ||= a()).cloneNode(true);
  return o.cloneNode = o, o;
}
function Ve(e, t = window.document) {
  let n = t[Re] || (t[Re] = /* @__PURE__ */ new Set());
  for (let r = 0, i = e.length; r < i; r++) {
    let i2 = e[r];
    n.has(i2) || (n.add(i2), t.addEventListener(i2, nt));
  }
}
function Y(e, t, n) {
  X(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function He(e, t, n, r) {
  X(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function Ue(e, t, n) {
  X(e) || (n ? e.setAttribute(t, ``) : e.removeAttribute(t));
}
function We(e, t) {
  X(e) || (t == null ? e.removeAttribute(`class`) : e.className = t);
}
function Ge(e, t, n, r) {
  if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    let r2 = n[0];
    e.addEventListener(t, n[0] = (t2) => r2.call(e, n[1], t2));
  } else e.addEventListener(t, n, typeof n != `function` && n);
}
function Ke(e, t, n = {}) {
  let r = Object.keys(t || {}), i = Object.keys(n), a, o;
  for (a = 0, o = i.length; a < o; a++) {
    let r2 = i[a];
    !r2 || r2 === `undefined` || t[r2] || (et(e, r2, false), delete n[r2]);
  }
  for (a = 0, o = r.length; a < o; a++) {
    let i2 = r[a], o2 = !!t[i2];
    !i2 || i2 === `undefined` || n[i2] === o2 || !o2 || (et(e, i2, true), n[i2] = o2);
  }
  return n;
}
function qe(e, t, n) {
  if (!t) return n ? Y(e, `style`) : t;
  let r = e.style;
  if (typeof t == `string`) return r.cssText = t;
  typeof n == `string` && (r.cssText = n = void 0), n ||= {}, t ||= {};
  let i, a;
  for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
  for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
  return n;
}
function Je(e, t, n) {
  n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n);
}
function Ye(e, t = {}, n, r) {
  let i = {};
  return r || D(() => i.children = Z(e, t.children, i.children)), D(() => typeof t.ref == `function` && Xe(t.ref, e)), D(() => Qe(e, t, n, true, i, true)), i;
}
function Xe(e, t, n) {
  return M(() => e(t, n));
}
function Ze(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != `function`) return Z(e, t, r, n);
  D((r2) => Z(e, t(), r2, n), r);
}
function Qe(e, t, n, r, i = {}, a = false) {
  t ||= {};
  for (let r2 in i) if (!(r2 in t)) {
    if (r2 === `children`) continue;
    i[r2] = tt(e, r2, null, i[r2], n, a, t);
  }
  for (let o in t) {
    if (o === `children`) {
      r || Z(e, t.children);
      continue;
    }
    let s = t[o];
    i[o] = tt(e, o, s, i[o], n, a, t);
  }
}
function X(e) {
  return !!c.context && !c.done && (!e || e.isConnected);
}
function $e(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (e2, t) => t.toUpperCase());
}
function et(e, t, n) {
  let r = t.trim().split(/\s+/);
  for (let t2 = 0, i = r.length; t2 < i; t2++) e.classList.toggle(r[t2], n);
}
function tt(e, t, n, r, i, a, o) {
  let s, c2, l2, u2, d2;
  if (t === `style`) return qe(e, n, r);
  if (t === `classList`) return Ke(e, n, r);
  if (n === r) return r;
  if (t === `ref`) a || n(e);
  else if (t.slice(0, 3) === `on:`) {
    let i2 = t.slice(3);
    r && e.removeEventListener(i2, r, typeof r != `function` && r), n && e.addEventListener(i2, n, typeof n != `function` && n);
  } else if (t.slice(0, 10) === `oncapture:`) {
    let i2 = t.slice(10);
    r && e.removeEventListener(i2, r, true), n && e.addEventListener(i2, n, true);
  } else if (t.slice(0, 2) === `on`) {
    let i2 = t.slice(2).toLowerCase(), a2 = Pe.has(i2);
    if (!a2 && r) {
      let t2 = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(i2, t2);
    }
    (a2 || n) && (Ge(e, i2, n, a2), a2 && Ve([i2]));
  } else if (t.slice(0, 5) === `attr:`) Y(e, t.slice(5), n);
  else if (t.slice(0, 5) === `bool:`) Ue(e, t.slice(5), n);
  else if ((d2 = t.slice(0, 5) === `prop:`) || (l2 = Ae.has(t)) || !i && ((u2 = Ne(t, e.tagName)) || (c2 = ke.has(t))) || (s = e.nodeName.includes(`-`) || `is` in o)) {
    if (d2) t = t.slice(5), c2 = true;
    else if (X(e)) return n;
    t === `class` || t === `className` ? We(e, n) : s && !c2 && !l2 ? e[$e(t)] = n : e[u2 || t] = n;
  } else {
    let r2 = i && t.indexOf(`:`) > -1 && Fe[t.split(`:`)[0]];
    r2 ? He(e, r2, t, n) : Y(e, je[t] || t, n);
  }
  return n;
}
function nt(e) {
  if (c.registry && c.events && c.events.find(([t2, n2]) => n2 === e)) return;
  let t = e.target, n = `$$${e.type}`, r = e.target, i = e.currentTarget, a = (t2) => Object.defineProperty(e, `target`, { configurable: true, value: t2 }), o = () => {
    let r2 = t[n];
    if (r2 && !t.disabled) {
      let i2 = t[`${n}Data`];
      if (i2 === void 0 ? r2.call(t, e) : r2.call(t, i2, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != `string` && !t.host._$host && t.contains(e.target) && a(t.host), true;
  }, s = () => {
    for (; o() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, `currentTarget`, { configurable: true, get() {
    return t || document;
  } }), c.registry && !c.done && (c.done = _$HY.done = true), e.composedPath) {
    let n2 = e.composedPath();
    a(n2[0]);
    for (let e2 = 0; e2 < n2.length - 2 && (t = n2[e2], o()); e2++) {
      if (t._$host) {
        t = t._$host, s();
        break;
      }
      if (t.parentNode === i) break;
    }
  } else s();
  a(r);
}
function Z(e, t, n, r, i) {
  let a = X(e);
  if (a) {
    !n && (n = [...e.childNodes]);
    let t2 = [];
    for (let e2 = 0; e2 < n.length; e2++) {
      let r2 = n[e2];
      r2.nodeType === 8 && r2.data.slice(0, 2) === `!$` ? r2.remove() : t2.push(r2);
    }
    n = t2;
  }
  for (; typeof n == `function`; ) n = n();
  if (t === n) return n;
  let o = typeof t, s = r !== void 0;
  if (e = s && n[0] && n[0].parentNode || e, o === `string` || o === `number`) {
    if (a || o === `number` && (t = t.toString(), t === n)) return n;
    if (s) {
      let i2 = n[0];
      i2 && i2.nodeType === 3 ? i2.data !== t && (i2.data = t) : i2 = document.createTextNode(t), n = Q(e, n, r, i2);
    } else n = n !== `` && typeof n == `string` ? e.firstChild.data = t : e.textContent = t;
  } else if (t == null || o === `boolean`) {
    if (a) return n;
    n = Q(e, n, r);
  } else if (o === `function`) return D(() => {
    let i2 = t();
    for (; typeof i2 == `function`; ) i2 = i2();
    n = Z(e, i2, n, r);
  }), () => n;
  else if (Array.isArray(t)) {
    let o2 = [], c2 = n && Array.isArray(n);
    if (rt(o2, t, n, i)) return D(() => n = Z(e, o2, n, r, true)), () => n;
    if (a) {
      if (!o2.length) return n;
      if (r === void 0) return n = [...e.childNodes];
      let t2 = o2[0];
      if (t2.parentNode !== e) return n;
      let i2 = [t2];
      for (; (t2 = t2.nextSibling) !== r; ) i2.push(t2);
      return n = i2;
    }
    if (o2.length === 0) {
      if (n = Q(e, n, r), s) return n;
    } else c2 ? n.length === 0 ? it(e, o2, r) : Le(e, n, o2) : (n && Q(e), it(e, o2));
    n = o2;
  } else if (t.nodeType) {
    if (a && t.parentNode) return n = s ? [t] : t;
    if (Array.isArray(n)) {
      if (s) return n = Q(e, n, r, t);
      Q(e, n, null, t);
    } else n == null || n === `` || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
    n = t;
  }
  return n;
}
function rt(e, t, n, r) {
  let i = false;
  for (let a = 0, o = t.length; a < o; a++) {
    let o2 = t[a], s = n && n[e.length], c2;
    if (!(o2 == null || o2 === true || o2 === false)) if ((c2 = typeof o2) == `object` && o2.nodeType) e.push(o2);
    else if (Array.isArray(o2)) i = rt(e, o2, s) || i;
    else if (c2 === `function`) if (r) {
      for (; typeof o2 == `function`; ) o2 = o2();
      i = rt(e, Array.isArray(o2) ? o2 : [o2], Array.isArray(s) ? s : [s]) || i;
    } else e.push(o2), i = true;
    else {
      let t2 = String(o2);
      s && s.nodeType === 3 && s.data === t2 ? e.push(s) : e.push(document.createTextNode(t2));
    }
  }
  return i;
}
function it(e, t, n = null) {
  for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function Q(e, t, n, r) {
  if (n === void 0) return e.textContent = ``;
  let i = r || document.createTextNode(``);
  if (t.length) {
    let r2 = false;
    for (let a = t.length - 1; a >= 0; a--) {
      let o = t[a];
      if (i !== o) {
        let t2 = o.parentNode === e;
        !r2 && !a ? t2 ? e.replaceChild(i, o) : e.insertBefore(i, n) : t2 && o.remove();
      } else r2 = true;
    }
  } else e.insertBefore(i, n);
  return [i];
}
var at = (e) => {
  if (!e) return false;
  let t = C(e);
  return t ? t.isConnected() : !!(e.isConnected || e.ownerDocument?.contains(e));
};
var ot = [`input`, `textarea`, `select`, `searchbox`, `slider`, `spinbutton`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `textbox`, `combobox`];
var st = (e) => {
  if (e.composed) {
    let t = e.composedPath()[0];
    if (t instanceof HTMLElement) return t;
  } else if (e.target instanceof HTMLElement) return e.target;
};
var ct = (e) => {
  if (document.designMode === `on`) return true;
  let t = st(e);
  if (!t) return false;
  if (t.isContentEditable) return true;
  let n = cn(t);
  return ot.some((e2) => e2 === n || e2 === t.role);
};
var lt = (e) => {
  let t = e.target;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
    let e2 = t.selectionStart ?? 0;
    return (t.selectionEnd ?? 0) - e2 > 0;
  }
  return false;
};
var ut = () => {
  let e = window.getSelection();
  return e ? e.toString().length > 0 : false;
};
var dt = (e, t, n) => Math.max(t, Math.min(e, n));
var $ = null;
var ft = () => {
  if (typeof navigator > `u` || !(`userAgentData` in navigator)) return null;
  let e = navigator.userAgentData;
  if (typeof e != `object` || !e || !(`platform` in e)) return null;
  let t = e.platform;
  return typeof t == `string` ? t : null;
};
var pt = () => {
  if ($ === null) {
    if (typeof navigator > `u`) return $ = false, $;
    let e = navigator.platform ?? ft() ?? navigator.userAgent;
    $ = /Mac|iPhone|iPad|iPod/i.test(e);
  }
  return $;
};
var mt = (e, t) => {
  try {
    return e.composedPath().some((e2) => h(e2) && e2.hasAttribute(t));
  } catch {
    return false;
  }
};
var ht = `react-grab-toolbar-state`;
var gt = () => {
  try {
    let e = localStorage.getItem(ht);
    if (!e) return null;
    let t = JSON.parse(e);
    if (typeof t != `object` || !t) return null;
    let n = t, r = typeof n.collapsed == `boolean` ? n.collapsed : false;
    return { edge: n.edge === `top` || n.edge === `bottom` || n.edge === `left` || n.edge === `right` ? n.edge : `bottom`, ratio: typeof n.ratio == `number` ? n.ratio : Te, collapsed: r, enabled: !r, defaultAction: typeof n.defaultAction == `string` ? n.defaultAction : Ee };
  } catch (e) {
    console.warn(`[react-grab] Failed to load toolbar state from localStorage:`, e);
  }
  return null;
};
var _t = (e) => {
  try {
    localStorage.setItem(ht, JSON.stringify(e));
  } catch (e2) {
    console.warn(`[react-grab] Failed to save toolbar state to localStorage:`, e2);
  }
};
var vt = (e) => e.key === `Enter`;
var yt = (e) => e.metaKey || e.ctrlKey;
var bt = (e, t, n = {}) => {
  if (!t.key) return null;
  if (vt(t)) return e.find((e2) => e2.shortcut === `Enter`) ?? null;
  if (t.repeat) return null;
  let r = t.key.toLowerCase();
  return yt(t) ? n.includeModifierShortcuts === true ? e.find((e2) => e2.shortcut !== void 0 && e2.shortcut !== `Enter` && e2.shortcutModifier !== false && r === e2.shortcut.toLowerCase()) ?? null : null : e.find((e2) => e2.shortcut !== void 0 && e2.shortcutModifier === false && r === e2.shortcut.toLowerCase()) ?? null;
};
var xt = (e) => e ?? true;
var St = (t, n) => {
  if (typeof t.enabled == `function`) {
    if (!n) return false;
    try {
      return t.enabled(n);
    } catch (n2) {
      return H(new nn(t.id, n2)), false;
    }
  }
  return xt(t.enabled);
};
var Ct = (e, n) => {
  if (!St(e, n)) return false;
  try {
    let i = e.onAction(n);
    i && i.catch((n2) => {
      H(new tn(e.id, n2));
    });
  } catch (n2) {
    H(new tn(e.id, n2));
  }
  return true;
};

export {
  f,
  m,
  T,
  E,
  D,
  O,
  k,
  A,
  j,
  M,
  N,
  P,
  ne,
  re,
  ie,
  ce,
  F,
  xe,
  Se,
  we,
  Te2 as Te,
  De,
  Oe,
  Ie,
  ze,
  Be,
  Ve,
  Y,
  We,
  Ge,
  Ke,
  qe,
  Je,
  Ye,
  Xe,
  Ze,
  at,
  ct,
  lt,
  ut,
  dt,
  pt,
  mt,
  gt,
  _t,
  bt,
  St,
  Ct
};
//# sourceMappingURL=chunk-XKBHHYPN.js.map
