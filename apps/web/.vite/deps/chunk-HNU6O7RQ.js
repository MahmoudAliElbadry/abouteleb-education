// ../../node_modules/react-grab/dist/freeze-updates-dBIOHHh-.js
var e = null;
var t = () => {
  if (e !== null) return e;
  try {
    e = window.matchMedia(`(color-gamut: p3)`).matches;
  } catch {
    e = false;
  }
  return e;
};
var n = t();
var r = (e2) => n ? `color(display-p3 0.84 0.19 0.78 / ${e2})` : `rgba(210, 57, 192, ${e2})`;
var i = `0.2.0`;
var a = `var(--rg-panel-bg)`;
var o = `var(--rg-shadow)`;
var s = -1e3;
var c = 0.95;
var l = 1500;
var u = [`/components/ui/`, `/packages/ui/`, `/design-system/`, `/design-systems/`, `/primitives/`];
var d = 5e3;
var f = 8e3;
var p = 1e4;
var ee = 0.5;
var m = 2147483647;
var te = 2147483645;
var ne = 0.7;
var re = 1e3 / 60;
var ae = 0.01;
var oe = r(0.4);
var se = r(0.05);
var ce = r(0.5);
var le = r(0.08);
var ue = r(0.15);
var de = 0.2;
var fe = [`id`, `class`, `aria-label`, `data-testid`, `role`, `name`, `title`];
var pe = /* @__PURE__ */ new Set([`id`, `data-testid`, `aria-label`, `href`, `src`, `alt`, `type`, `name`, `placeholder`, `role`, `for`, `action`, `method`, `title`, `disabled`, `checked`, `readonly`, `required`, `selected`, `open`]);
var me = /* @__PURE__ */ new Set([`a`, `button`, `code`, `label`, `option`, `pre`, `summary`, `text`]);
var he = /* @__PURE__ */ new Set([`script`, `style`, `template`, `noscript`]);
var ge = [`Meta`, `Control`, `Shift`, `Alt`];
var _e = /* @__PURE__ */ new Set([`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`]);
var ve = `data-react-grab-frozen`;
var ye = `data-react-grab-same-origin-frame`;
var Se = 0.5;
var Ce = `data-react-grab-input`;
var we = 0.9;
var Te = 0.5;
var Ee = `copy`;
var De = `comment`;
var ke = `superellipse(1.25)`;
var je = 0.01;
var Me = 1e3;
var Ne = { left: -9999, top: -9999 };
var Pe = { left: `left center`, right: `right center`, top: `center top`, bottom: `center bottom` };
var Fe = 1e3;
var Ie = -9999;
var Le = new Set(`display.position.top.right.bottom.left.z-index.overflow.overflow-x.overflow-y.width.height.min-width.min-height.max-width.max-height.margin-top.margin-right.margin-bottom.margin-left.padding-top.padding-right.padding-bottom.padding-left.flex-direction.flex-wrap.justify-content.align-items.align-self.align-content.flex-grow.flex-shrink.flex-basis.order.gap.row-gap.column-gap.grid-template-columns.grid-template-rows.grid-template-areas.font-family.font-size.font-weight.font-style.line-height.letter-spacing.text-align.text-decoration-line.text-decoration-style.text-transform.text-overflow.text-shadow.white-space.word-break.overflow-wrap.vertical-align.color.background-color.background-image.background-position.background-size.background-repeat.border-top-width.border-right-width.border-bottom-width.border-left-width.border-top-style.border-right-style.border-bottom-style.border-left-style.border-top-color.border-right-color.border-bottom-color.border-left-color.border-top-left-radius.border-top-right-radius.border-bottom-left-radius.border-bottom-right-radius.box-shadow.opacity.transform.filter.backdrop-filter.object-fit.object-position`.split(`.`));
var Re = (e2) => typeof e2 == `object` && !!e2 && `nodeType` in e2 && e2.nodeType === Node.ELEMENT_NODE;
var h = (e2) => Re(e2) && e2.namespaceURI === `http://www.w3.org/1999/xhtml`;
var g = (e2) => h(e2) && e2.tagName === `IFRAME`;
var ze = /* @__PURE__ */ new WeakMap();
var _ = (e2) => {
  let t2 = Number.parseFloat(e2);
  return Number.isFinite(t2) ? t2 : 0;
};
var Be = (e2) => {
  let t2 = performance.now(), n2 = ze.get(e2);
  if (n2 && t2 - n2.timestamp < 16) return n2.metrics;
  let r2 = e2.ownerDocument.defaultView?.getComputedStyle(e2), i2;
  if (!r2) i2 = { contentOffsetX: e2.clientLeft, contentOffsetY: e2.clientTop, height: e2.offsetHeight, width: e2.offsetWidth };
  else {
    let t3 = _(r2.borderLeftWidth), n3 = _(r2.borderRightWidth), a2 = _(r2.borderTopWidth), o2 = _(r2.borderBottomWidth), s2 = _(r2.paddingLeft), c2 = _(r2.paddingRight), l2 = _(r2.paddingTop), u2 = _(r2.paddingBottom), d2 = _(r2.width), f2 = _(r2.height), p2 = t3 + n3 + s2 + c2, ee2 = a2 + o2 + l2 + u2, m2 = r2.boxSizing === `border-box` ? d2 : d2 + p2, te2 = r2.boxSizing === `border-box` ? f2 : f2 + ee2;
    i2 = { contentOffsetX: t3 + s2, contentOffsetY: a2 + l2, height: te2 > 0 ? te2 : e2.offsetHeight, width: m2 > 0 ? m2 : e2.offsetWidth };
  }
  return ze.set(e2, { metrics: i2, timestamp: t2 }), i2;
};
var Ve = (e2, t2) => t2 > 0 ? e2 / t2 : 1;
var He = (e2) => {
  if (!e2) return null;
  try {
    return e2.frameElement;
  } catch {
    return null;
  }
};
var Ue = (e2, t2, n2) => {
  let r2 = t2, i2 = n2, a2 = 1, o2 = 1, s2 = e2;
  for (; s2 && s2 !== window; ) {
    let e3 = He(s2);
    if (!e3 || !g(e3)) break;
    let t3 = e3.getBoundingClientRect(), n3 = Be(e3), c2 = Ve(t3.width, n3.width), l2 = Ve(t3.height, n3.height);
    r2 = t3.left + (n3.contentOffsetX + r2) * c2, i2 = t3.top + (n3.contentOffsetY + i2) * l2, a2 *= c2, o2 *= l2, s2 = e3.ownerDocument.defaultView;
  }
  return { x: r2, y: i2, scaleX: a2, scaleY: o2 };
};
var We = (e2) => {
  let t2 = e2.ownerDocument.defaultView;
  return t2 ? t2.getComputedStyle(e2) : window.getComputedStyle(e2);
};
var Ge = (e2, t2) => e2.replace(/([\d.]+)px/g, (e3, n2) => {
  let r2 = Number(n2) * Math.abs(t2);
  return `${Number(r2.toFixed(3))}px`;
});
var Ke = (e2, t2, n2) => {
  let [r2, i2] = e2.split(`/`).map((e3) => e3.trim()), a2 = Ge(r2, t2), o2 = Ge(i2 ?? r2, n2);
  return i2 === void 0 && a2 === o2 ? a2 : `${a2} / ${o2}`;
};
var qe = (e2) => Object.assign(e2, { [Symbol.dispose]: e2 });
var Je = `bippy-0.6.1`;
var Ye = Object.defineProperty;
var Xe = Object.prototype.hasOwnProperty;
var Ze = () => {
};
var Qe = (e2) => {
  try {
    Function.prototype.toString.call(e2).indexOf(`^_^`) > -1 && setTimeout(() => {
      throw Error(`React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build`);
    });
  } catch {
  }
};
var $e = (e2 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) => !!(e2 && `getFiberRoots` in e2);
var et = false;
var tt;
var nt = (e2 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) => et ? true : (e2 && typeof e2.inject == `function` && (tt = e2.inject.toString()), !!tt?.includes(`(injected)`));
var v = /* @__PURE__ */ new Set();
var rt = /* @__PURE__ */ new Set();
var it = (e2) => {
  e2 && v.add(e2);
  let t2 = /* @__PURE__ */ new Map(), n2 = 0, r2 = { _instrumentationIsActive: false, _instrumentationSource: Je, checkDCE: Qe, hasUnsupportedRendererAttached: false, inject(e3) {
    let i2 = ++n2;
    return t2.set(i2, e3), rt.add(e3), r2._instrumentationIsActive || (r2._instrumentationIsActive = true, v.forEach((e4) => e4())), i2;
  }, on: Ze, onCommitFiberRoot: Ze, onCommitFiberUnmount: Ze, onPostCommitFiberRoot: Ze, renderers: t2, supportsFiber: true, supportsFlight: true };
  try {
    Ye(globalThis, `__REACT_DEVTOOLS_GLOBAL_HOOK__`, { configurable: true, enumerable: true, get() {
      return r2;
    }, set(t4) {
      if (t4 && typeof t4 == `object`) {
        let n4 = r2.renderers;
        r2 = t4, n4.size > 0 && (n4.forEach((e3, n5) => {
          rt.add(e3), t4.renderers.set(n5, e3);
        }), at(e2));
      }
    } });
    let t3 = window.hasOwnProperty, n3 = false;
    Ye(window, `hasOwnProperty`, { configurable: true, value: function(...e3) {
      try {
        if (!n3 && e3[0] === `__REACT_DEVTOOLS_GLOBAL_HOOK__`) return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__ = void 0, n3 = true, -0;
      } catch {
      }
      return t3.apply(this, e3);
    }, writable: true });
  } catch {
    at(e2);
  }
  return r2;
};
var at = (e2) => {
  e2 && v.add(e2);
  try {
    let t2 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!t2) return;
    if (!t2._instrumentationSource) {
      t2.checkDCE = Qe, t2.supportsFiber = true, t2.supportsFlight = true, t2.hasUnsupportedRendererAttached = false, t2._instrumentationSource = Je, t2._instrumentationIsActive = false;
      let e3 = $e(t2);
      if (e3 || (t2.on = Ze), t2.renderers.size) {
        t2._instrumentationIsActive = true, v.forEach((e4) => e4());
        return;
      }
      let n2 = t2.inject, r2 = nt(t2);
      r2 && !e3 && (et = true, t2.inject({ scheduleRefresh() {
      } }) && (t2._instrumentationIsActive = true)), t2.inject = (e4) => {
        let i2 = n2(e4);
        return rt.add(e4), r2 && t2.renderers.set(i2, e4), t2._instrumentationIsActive = true, v.forEach((e5) => e5()), i2;
      };
    }
    (t2.renderers.size || t2._instrumentationIsActive || nt()) && e2?.();
  } catch {
  }
};
var ot = () => Xe.call(globalThis, `__REACT_DEVTOOLS_GLOBAL_HOOK__`);
var y = (e2) => ot() ? (at(e2), globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) : it(e2);
var st = () => !!(typeof window < `u` && (window.document?.createElement || window.navigator?.product === `ReactNative`));
(() => {
  try {
    st() && y();
  } catch {
  }
})();
var ct = (e2) => {
  switch (e2.tag) {
    case 5:
    case 26:
    case 27:
      return true;
    default:
      return typeof e2.type == `string`;
  }
};
var lt = (e2) => {
  switch (e2.tag) {
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
var ut = (e2) => !e2 || typeof e2 != `object` ? false : `pendingProps` in e2 && !(`containerInfo` in e2);
var pt = (e2) => {
  let t2 = [], n2 = [];
  for (ct(e2) ? t2.push(e2) : e2.child && n2.push(e2.child); n2.length; ) {
    let e3 = n2.pop();
    if (!e3) break;
    ct(e3) ? t2.push(e3) : e3.child && n2.push(e3.child), e3.sibling && n2.push(e3.sibling);
  }
  return t2;
};
function mt(e2, t2, n2 = false) {
  if (!e2) return null;
  let r2 = t2(e2);
  if (r2 instanceof Promise) return (async () => {
    if (await r2 === true) return e2;
    let i3 = n2 ? e2.return : e2.child;
    for (; i3; ) {
      let e3 = await gt(i3, t2, n2);
      if (e3) return e3;
      i3 = n2 ? null : i3.sibling;
    }
    return null;
  })();
  if (r2 === true) return e2;
  let i2 = n2 ? e2.return : e2.child;
  for (; i2; ) {
    let e3 = ht(i2, t2, n2);
    if (e3) return e3;
    i2 = n2 ? null : i2.sibling;
  }
  return null;
}
var ht = (e2, t2, n2 = false) => {
  if (!e2) return null;
  if (t2(e2) === true) return e2;
  let r2 = n2 ? e2.return : e2.child;
  for (; r2; ) {
    let e3 = ht(r2, t2, n2);
    if (e3) return e3;
    r2 = n2 ? null : r2.sibling;
  }
  return null;
};
var gt = async (e2, t2, n2 = false) => {
  if (!e2) return null;
  if (await t2(e2) === true) return e2;
  let r2 = n2 ? e2.return : e2.child;
  for (; r2; ) {
    let e3 = await gt(r2, t2, n2);
    if (e3) return e3;
    r2 = n2 ? null : r2.sibling;
  }
  return null;
};
var _t = (e2) => {
  let t2 = e2;
  return typeof t2 == `function` ? t2 : typeof t2 == `object` && t2 ? _t(t2.type || t2.render) : null;
};
var vt = (e2) => {
  let t2 = e2;
  if (typeof t2 == `string`) return t2;
  if (typeof t2 != `function` && !(typeof t2 == `object` && t2)) return null;
  let n2 = t2.displayName || t2.name || null;
  if (n2) return n2;
  let r2 = _t(t2);
  return r2 && (r2.displayName || r2.name) || null;
};
var yt = () => {
  let e2 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  return !!e2?._instrumentationIsActive || $e(e2) || nt(e2);
};
var bt = /* @__PURE__ */ new Set();
var xt = (e2) => {
  let t2 = e2.alternate;
  if (!t2) return e2;
  if (t2.actualStartTime && e2.actualStartTime) return t2.actualStartTime > e2.actualStartTime ? t2 : e2;
  for (let t3 of bt) {
    let n2 = mt(t3.current, (t4) => {
      if (t4 === e2) return true;
    });
    if (n2) return n2;
  }
  return e2;
};
var Ot = (e2) => {
  if (!ot()) return null;
  let t2 = e2;
  for (; t2.return; ) t2 = t2.return;
  let n2 = Ft.get(t2.stateNode);
  return n2 === void 0 ? null : y().renderers?.get(n2) ?? null;
};
var jt = /* @__PURE__ */ new Set();
var Mt = /* @__PURE__ */ new Set();
var Nt = /* @__PURE__ */ new Set();
var Pt = /* @__PURE__ */ new Set();
var S = /* @__PURE__ */ new WeakMap();
var Ft = /* @__PURE__ */ new WeakMap();
var It = (e2) => {
  let t2 = S.get(e2) ?? {};
  if (S.set(e2, t2), !t2.onCommitFiberRoot || e2.onCommitFiberRoot !== t2.onCommitFiberRoot) {
    let n2 = e2.onCommitFiberRoot, r2 = (t3, i2, a2) => {
      if (n2?.(t3, i2, a2), S.get(e2)?.onCommitFiberRoot === r2) {
        bt.add(i2), Ft.set(i2, t3);
        for (let e3 of jt) e3(t3, i2, a2);
      }
    };
    t2.onCommitFiberRoot = r2, e2.onCommitFiberRoot = r2;
  }
  if (!t2.onCommitFiberUnmount || e2.onCommitFiberUnmount !== t2.onCommitFiberUnmount) {
    let n2 = e2.onCommitFiberUnmount, r2 = (t3, i2) => {
      if (n2?.(t3, i2), S.get(e2)?.onCommitFiberUnmount === r2) for (let e3 of Mt) e3(t3, i2);
    };
    t2.onCommitFiberUnmount = r2, e2.onCommitFiberUnmount = r2;
  }
  if (!t2.onPostCommitFiberRoot || e2.onPostCommitFiberRoot !== t2.onPostCommitFiberRoot) {
    let n2 = e2.onPostCommitFiberRoot, r2 = (t3, i2) => {
      if (n2?.(t3, i2), S.get(e2)?.onPostCommitFiberRoot === r2) for (let e3 of Nt) e3(t3, i2);
    };
    t2.onPostCommitFiberRoot = r2, e2.onPostCommitFiberRoot = r2;
  }
  if (!t2.onScheduleFiberRoot || e2.onScheduleFiberRoot !== t2.onScheduleFiberRoot) {
    let n2 = e2.onScheduleFiberRoot, r2 = (t3, i2, a2) => {
      if (n2?.(t3, i2, a2), S.get(e2)?.onScheduleFiberRoot === r2) for (let e3 of Pt) e3(t3, i2, a2);
    };
    t2.onScheduleFiberRoot = r2, e2.onScheduleFiberRoot = r2;
  }
};
var Lt = (e2) => {
  let t2 = y(e2.onActive);
  t2._instrumentationSource = e2.name ?? Je, It(t2);
  let { onActive: n2, onCommitFiberRoot: r2, onCommitFiberUnmount: i2, onPostCommitFiberRoot: a2, onScheduleFiberRoot: o2 } = e2;
  return r2 && jt.add(r2), i2 && Mt.add(i2), a2 && Nt.add(a2), o2 && Pt.add(o2), qe(() => {
    n2 && v.delete(n2), r2 && jt.delete(r2), i2 && Mt.delete(i2), a2 && Nt.delete(a2), o2 && Pt.delete(o2);
  });
};
var Rt = /* @__PURE__ */ new Set();
var zt = (e2) => e2.startsWith(`__reactContainer$`) || e2.startsWith(`__reactInternalInstance$`) || e2.startsWith(`__reactFiber`);
var Bt = (e2) => {
  let t2 = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (t2?.renderers) for (let n2 of t2.renderers.values()) try {
    let t3 = n2.findFiberByHostInstance?.(e2);
    if (t3) return t3;
  } catch {
  }
  if (typeof e2 == `object` && e2) {
    if (`_reactRootContainer` in e2) return e2._reactRootContainer?._internalRoot?.current?.child;
    let t3 = e2.__internalInstanceHandle ?? e2._internalInstanceHandle;
    if (ut(t3)) return t3;
    let n2 = e2;
    for (let e3 of Rt) {
      let t4 = n2[e3];
      if (t4) return t4;
    }
    for (let e3 of Object.keys(n2)) if (zt(e3)) return Rt.add(e3), n2[e3] || null;
    for (let t4 of bt) {
      if (Ot(t4.current)?.findFiberByHostInstance) continue;
      let n3 = mt(t4.current, (t5) => t5.stateNode === e2);
      if (n3) return n3;
    }
  }
  return null;
};
var Vt = /* @__PURE__ */ new WeakMap();
var Ht = (e2, t2) => {
  Vt.set(e2, t2);
};
var C = (e2) => Vt.get(e2) ?? null;
var Ut = (e2) => C(e2)?.getFiber() ?? Bt(e2);
var Wt = /* @__PURE__ */ new WeakMap();
var Gt = /* @__PURE__ */ new WeakMap();
var Kt = () => {
  Wt = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap();
};
var qt = (e2, t2, n2) => {
  let r2 = Gt.get(e2);
  if (r2 && n2 - r2.timestamp < 200) return r2.borderRadius;
  let i2 = (t2 ?? We(e2)).borderRadius || `0px`;
  return Gt.set(e2, { borderRadius: i2, timestamp: n2 }), i2;
};
var Jt = (e2) => {
  let t2 = performance.now(), n2 = Wt.get(e2);
  if (n2 && t2 - n2.timestamp < 16) return n2.bounds;
  let r2 = C(e2);
  if (r2) {
    let n3 = r2.getBounds();
    return Wt.set(e2, { bounds: n3, timestamp: t2 }), n3;
  }
  let i2 = e2.getBoundingClientRect(), a2 = Ue(e2.ownerDocument.defaultView, i2.left, i2.top), o2 = { borderRadius: Ke(qt(e2, null, t2), a2.scaleX, a2.scaleY), height: i2.height * a2.scaleY, width: i2.width * a2.scaleX, x: a2.x, y: a2.y };
  return Wt.set(e2, { bounds: o2, timestamp: t2 }), o2;
};
var Yt = (e2) => {
  let t2 = e2.ownerDocument?.defaultView;
  return !!(t2 && e2 instanceof t2.ShadowRoot);
};
var w = class extends Error {
  constructor(e2, t2) {
    super(e2, t2), this.name = `ReactGrabError`;
  }
};
var T = class extends w {
  constructor(e2, t2) {
    super(e2, { cause: t2 }), this.name = `RecoverableError`;
  }
};
var Xt = class extends w {
  constructor(e2) {
    super(`Failed to freeze page`, { cause: e2 }), this.name = `FreezeError`;
  }
};
var Zt = class extends T {
  constructor(e2, t2, n2) {
    super(`Failed to open source file "${e2}"`, n2), this.name = `OpenFileError`, this.filePath = e2, this.lineNumber = t2;
  }
};
var Qt = class extends T {
  constructor(e2, t2, n2) {
    super(`Plugin hook "${t2}" failed for "${e2}"`, n2), this.name = `PluginHookError`, this.pluginName = e2, this.hookName = t2;
  }
};
var $t = class extends T {
  constructor(e2, t2) {
    super(`Plugin cleanup failed for "${e2}"`, t2), this.name = `PluginCleanupError`, this.pluginName = e2;
  }
};
var en = class extends T {
  constructor(e2, t2) {
    super(`Plugin setup failed for "${e2}"`, t2), this.name = `PluginSetupError`, this.pluginName = e2;
  }
};
var tn = class extends T {
  constructor(e2, t2) {
    super(`Action "${e2}" failed`, t2), this.name = `ContextMenuActionError`, this.actionId = e2;
  }
};
var nn = class extends T {
  constructor(e2, t2) {
    super(`Action "${e2}" enabled check failed`, t2), this.name = `ContextMenuActionEnabledError`, this.actionId = e2;
  }
};
var rn = class extends w {
  constructor() {
    super(`Can't generate CSS selector for non-element node type.`), this.name = `NonElementNodeError`;
  }
};
var an = class extends w {
  constructor(e2) {
    super(`Timeout: Can't find a unique selector after ${e2}ms`), this.name = `SelectorTimeoutError`, this.timeoutMs = e2;
  }
};
var on = class extends w {
  constructor() {
    super(`Selector was not found.`), this.name = `SelectorNotFoundError`;
  }
};
var sn = class extends w {
  constructor() {
    super(`Failed to copy`), this.name = `CopyFailedError`;
  }
};
var cn = (e2) => C(e2)?.getTagName() ?? (e2.tagName || ``).toLowerCase();
var ln = /* @__PURE__ */ new WeakMap();
var un = (e2 = document) => {
  let t2 = ln.get(e2);
  if (t2 !== void 0) return t2;
  let n2 = e2.querySelector(`script[nonce], style[nonce]`), r2 = n2?.nonce || n2?.getAttribute(`nonce`) || null;
  return r2 && ln.set(e2, r2), r2;
};
var dn = [[`data-rr-block`, ``], [`data-rr-ignore`, ``], [`data-rr-mask`, ``], [`data-sentry-block`, ``], [`data-sentry-ignore`, ``], [`data-sentry-mask`, ``], [`data-dd-privacy`, `hidden`], [`data-fs-exclude`, ``], [`data-lr-exclude`, ``], [`data-hj-suppress`, ``], [`data-recording-disable`, ``], [`data-clarity-mask`, `true`], [`data-heap-redact-text`, ``]];
var fn = (e2) => {
  for (let [t2, n2] of dn) e2.setAttribute(t2, n2);
  e2.setAttribute(`data-testid`, `react-grab-overlay`), e2.classList.add(`ph-no-capture`);
};
var pn = (e2) => typeof e2 == `object` && !!e2 && `nodeType` in e2 && e2.nodeType === 9;
var E = (e2) => {
  if (e2.assignedSlot) return e2.assignedSlot;
  if (e2.parentElement) return e2.parentElement;
  let t2 = e2.getRootNode();
  return Yt(t2) ? t2.host : pn(t2) ? He(t2.defaultView) : null;
};
var mn = (e2, t2) => {
  let n2 = C(e2)?.hostElement ?? e2;
  for (; n2; ) {
    if (n2 === t2) return true;
    n2 = E(n2);
  }
  return false;
};
var hn = null;
var gn = (e2) => {
  hn = e2;
};
var _n = () => hn;
var D = (e2) => hn ? e2 ? mn(e2, hn) : false : true;
var vn = (e2) => e2;
var yn = typeof window < `u`;
var bn = (e2) => 0;
var xn = (e2) => {
};
var Sn = yn ? (Object.getOwnPropertyDescriptor(Window.prototype, `requestAnimationFrame`)?.value ?? window.requestAnimationFrame).bind(window) : bn;
var Cn = yn ? (Object.getOwnPropertyDescriptor(Window.prototype, `cancelAnimationFrame`)?.value ?? window.cancelAnimationFrame).bind(window) : xn;
var wn = () => yn ? new Promise((e2) => Sn(() => e2())) : Promise.resolve();
var O = (e2) => {
  try {
    return e2.contentDocument;
  } catch {
    return null;
  }
};
var Tn = (e2, t2, n2) => {
  let r2 = e2.getBoundingClientRect(), i2 = Be(e2), a2 = Ve(r2.width, i2.width), o2 = Ve(r2.height, i2.height);
  return { x: (t2 - r2.left) / a2 - i2.contentOffsetX, y: (n2 - r2.top) / o2 - i2.contentOffsetY };
};
var En = (e2, t2, n2) => {
  let r2 = e2.elementFromPoint(t2, n2);
  for (; r2; ) {
    let e3 = r2.shadowRoot?.elementFromPoint(t2, n2);
    if (e3 && e3 !== r2) {
      r2 = e3;
      continue;
    }
    if (g(r2)) {
      let e4 = O(r2);
      if (!e4) return r2;
      let i2 = Tn(r2, t2, n2);
      return En(e4, i2.x, i2.y) ?? r2;
    }
    return r2;
  }
  return null;
};
var Dn = (e2, t2) => En(document, e2, t2);
var On = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    if (t2.hasAttribute(`data-react-grab-ignore`)) return true;
    t2 = E(t2);
  }
  return false;
};
var kn = typeof Element < `u` && typeof Element.prototype.checkVisibility == `function`;
var An = { checkOpacity: true, checkVisibilityCSS: true, opacityProperty: true, visibilityProperty: true };
var jn = { checkVisibilityCSS: true, visibilityProperty: true };
var Mn = (e2, t2) => {
  if (kn && !t2) return e2.checkVisibility(An) ? true : e2.checkVisibility(jn) ? We(e2).opacity !== `0` : false;
  let n2 = t2 ?? We(e2);
  return n2.display !== `none` && n2.visibility !== `hidden` && n2.opacity !== `0`;
};
var Nn = (e2) => {
  let t2 = cn(e2);
  return t2 === `html` || t2 === `body`;
};
var Pn = [`data-react-grab`, `data-react-grab-demo`];
var Fn = (e2) => Pn.some((t2) => e2.hasAttribute(t2));
var In = (e2) => {
  if (Fn(e2)) return true;
  let t2 = e2.getRootNode();
  return Yt(t2) && Fn(t2.host);
};
var Ln = (e2) => {
  let t2 = parseInt(e2.zIndex, 10);
  return e2.pointerEvents === `none` && e2.position === `fixed` && !isNaN(t2) && t2 >= 2147483600;
};
var Rn = (e2) => {
  let t2 = e2.backgroundColor;
  return t2 === `transparent` || t2 === `rgba(0, 0, 0, 0)`;
};
var zn = (e2) => {
  let t2 = e2.position;
  if (t2 !== `fixed` && t2 !== `absolute`) return false;
  if (Rn(e2) || parseFloat(e2.opacity) < 0.1) return true;
  let n2 = parseInt(e2.zIndex, 10);
  return !isNaN(n2) && n2 > 1e3;
};
var Bn = /* @__PURE__ */ new WeakMap();
var Vn = () => {
  Bn = /* @__PURE__ */ new WeakMap();
};
var Hn = (e2) => {
  let t2 = C(e2);
  if (t2) return t2.isConnected();
  if (Nn(e2) || In(e2) || On(e2)) return false;
  let n2 = performance.now(), r2 = Bn.get(e2);
  if (r2 && n2 - r2.timestamp < 50) return r2.isVisible;
  if (!Mn(e2)) return Bn.set(e2, { isVisible: false, timestamp: n2 }), false;
  if (e2.clientWidth / (e2.ownerDocument.defaultView?.innerWidth ?? window.innerWidth) >= 0.9 && e2.clientHeight / (e2.ownerDocument.defaultView?.innerHeight ?? window.innerHeight) >= 0.9) {
    let t3 = We(e2);
    if (Ln(t3) || zn(t3)) return false;
  }
  return Bn.set(e2, { isVisible: true, timestamp: n2 }), true;
};
var Un = (e2) => {
  if (e2 === `transparent`) return true;
  let t2 = e2.lastIndexOf(`/`);
  if (t2 >= 0) return Number.parseFloat(e2.slice(t2 + 1)) === 0;
  if (!e2.startsWith(`rgba(`)) return false;
  let n2 = e2.lastIndexOf(`,`);
  return n2 >= 0 && Number.parseFloat(e2.slice(n2 + 1)) === 0;
};
var Wn = (e2) => {
  let t2 = e2.ownerDocument.defaultView?.getComputedStyle?.(e2);
  if (!t2) return false;
  let n2 = t2.backgroundClip !== `text` && (t2.backgroundImage !== `none` || !Un(t2.backgroundColor)), r2 = t2.borderTopStyle !== `none` && t2.borderTopWidth !== `0px` || t2.borderRightStyle !== `none` && t2.borderRightWidth !== `0px` || t2.borderBottomStyle !== `none` && t2.borderBottomWidth !== `0px` || t2.borderLeftStyle !== `none` && t2.borderLeftWidth !== `0px`;
  return n2 || r2 || t2.boxShadow !== `none` || t2.outlineStyle !== `none`;
};
var Gn = /* @__PURE__ */ new Set([`A`, `AUDIO`, `BUTTON`, `CANVAS`, `DETAILS`, `EMBED`, `IFRAME`, `IMG`, `INPUT`, `METER`, `OBJECT`, `OPTION`, `PROGRESS`, `SELECT`, `SUMMARY`, `SVG`, `TEXTAREA`, `VIDEO`]);
var Kn = /* @__PURE__ */ new Set([`button`, `checkbox`, `combobox`, `gridcell`, `link`, `listbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `scrollbar`, `searchbox`, `slider`, `spinbutton`, `switch`, `tab`, `textbox`, `treeitem`]);
var qn = new Set(`A.ABBR.B.BDI.BDO.BR.CITE.CODE.DATA.DEL.DFN.EM.I.INS.KBD.MARK.Q.S.SAMP.SMALL.SPAN.STRONG.SUB.SUP.TIME.U.VAR.WBR`.split(`.`));
var Jn = /* @__PURE__ */ new WeakMap();
var Yn = /* @__PURE__ */ new WeakMap();
var Xn = () => {
  Jn = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap();
};
var k = (e2, t2, n2) => (Jn.set(e2, t2), Yn.set(e2, n2), t2);
var Zn = (e2) => Gn.has(e2.tagName) || Kn.has(e2.getAttribute(`role`) ?? ``) || h(e2) && e2.isContentEditable;
var Qn = (e2) => {
  let t2 = performance.now(), n2 = Yn.get(e2);
  if (n2 !== void 0 && t2 - n2 < 16) return Jn.get(e2) ?? null;
  if (Zn(e2) || e2.childNodes.length > 64) return k(e2, null, t2);
  let r2 = [], i2 = [], a2 = 0;
  for (let t3 = e2.childNodes.length - 1; t3 >= 0; --t3) i2.push(e2.childNodes[t3]);
  for (; i2.length > 0; ) {
    if (a2 += 1, a2 > 64) return k(e2, null, t2);
    let n3 = i2.pop();
    if (n3) {
      if (n3.nodeType === Node.TEXT_NODE) {
        if (n3.textContent?.trim() && (r2.push(n3), r2.length > 32)) return k(e2, null, t2);
        continue;
      }
      if (!Re(n3) || !qn.has(n3.tagName) || a2 + i2.length + n3.childNodes.length > 64) return k(e2, null, t2);
      for (let e3 = n3.childNodes.length - 1; e3 >= 0; --e3) i2.push(n3.childNodes[e3]);
    }
  }
  if (r2.length === 0 || Wn(e2)) return k(e2, null, t2);
  try {
    let n3 = e2.ownerDocument.createRange(), i3 = Ue(e2.ownerDocument.defaultView, 0, 0), a3 = [];
    for (let o2 of r2) {
      n3.selectNodeContents(o2);
      let r3 = n3.getClientRects();
      if (a3.length + r3.length > 64) return k(e2, null, t2);
      for (let e3 = 0; e3 < r3.length; e3 += 1) {
        let t3 = r3[e3], n4 = t3.width * i3.scaleX, o3 = t3.height * i3.scaleY;
        !Number.isFinite(t3.left) || !Number.isFinite(t3.top) || !Number.isFinite(n4) || !Number.isFinite(o3) || n4 <= 0 || o3 <= 0 || a3.push({ borderRadius: `0px`, height: o3, width: n4, x: i3.x + t3.left * i3.scaleX, y: i3.y + t3.top * i3.scaleY });
      }
    }
    return k(e2, a3.length > 0 ? a3 : null, t2);
  } catch {
    return k(e2, null, t2);
  }
};
var $n = (e2, t2, n2) => {
  let r2 = Qn(e2);
  if (!r2) return true;
  for (let e3 of r2) if (t2 >= e3.x && t2 <= e3.x + e3.width && n2 >= e3.y && n2 <= e3.y + e3.height) return true;
  return false;
};
var er = (e2, t2, n2, r2, i2) => {
  let a2 = true;
  for (let o2 of e2.elementsFromPoint(t2, n2)) {
    if (On(o2) && (a2 = false), !D(o2)) continue;
    let s2 = o2.shadowRoot;
    if (a2 && s2 && s2 !== e2) {
      let e3 = er(s2, t2, n2, r2, i2);
      if (e3) return e3;
    }
    if (a2 && g(o2)) {
      let e3 = O(o2);
      if (e3) {
        let a3 = Tn(o2, t2, n2), s3 = er(e3, a3.x, a3.y, r2, i2);
        if (s3) return s3;
      }
    }
    if (Hn(o2) && $n(o2, r2, i2)) return o2;
  }
  return null;
};
var tr = (e2, t2) => er(document, e2, t2, e2, t2);
var nr = (e2, t2, n2, r2) => {
  let i2 = e2.elementsFromPoint(t2, n2), a2 = true;
  for (let o2 of i2) {
    if (On(o2) && (a2 = false), a2 && o2.shadowRoot && o2.shadowRoot !== e2 && nr(o2.shadowRoot, t2, n2, r2), a2 && g(o2)) {
      let e3 = O(o2);
      if (e3) {
        let i3 = Tn(o2, t2, n2);
        nr(e3, i3.x, i3.y, r2);
      }
    }
    r2.add(o2);
  }
};
var rr = (e2, t2) => {
  let n2 = /* @__PURE__ */ new Set();
  return nr(document, e2, t2, n2), [...n2];
};
var ir = (e2, t2, n2) => {
  let r2 = [], i2 = e2;
  for (; i2 && i2 !== window; ) {
    let e3 = He(i2);
    if (!e3 || !g(e3)) break;
    r2.push(e3), i2 = e3.ownerDocument.defaultView;
  }
  let a2 = t2, o2 = n2;
  for (let e3 = r2.length - 1; e3 >= 0; --e3) {
    let t3 = Tn(r2[e3], a2, o2);
    a2 = t3.x, o2 = t3.y;
  }
  return { x: a2, y: o2 };
};
var ar = `http://www.w3.org/2000/svg`;
var or = (e2) => {
  if (e2.localName === `svg`) return e2;
  let t2 = e2, n2 = e2.parentElement;
  for (; n2?.namespaceURI === ar && (t2 = n2, n2.localName !== `svg`); ) n2 = n2.parentElement;
  return t2;
};
var sr = (e2, t2, n2, r2) => {
  if (typeof e2.caretPositionFromPoint == `function`) {
    let i2 = e2.caretPositionFromPoint(t2, n2, { shadowRoots: r2 ? [r2] : [] });
    if (i2) return i2.offsetNode;
  }
  return typeof e2.caretRangeFromPoint == `function` ? e2.caretRangeFromPoint(t2, n2)?.startContainer ?? null : null;
};
var cr = (e2, t2, n2) => {
  if (Nn(e2)) return null;
  let r2 = e2.ownerDocument, i2 = r2.defaultView;
  if (!i2) return null;
  let a2 = ir(i2, t2, n2), o2 = e2.getRootNode(), s2 = sr(r2, a2.x, a2.y, Yt(o2) ? o2 : null);
  if (!s2) return null;
  let c2 = Re(s2) ? s2 : s2.parentElement;
  if (!c2 || c2 === e2) return null;
  let l2 = e2.namespaceURI === ar;
  return !(l2 ? or(e2) : e2).contains(c2) || !l2 && We(c2).pointerEvents !== `none` ? null : c2;
};
var lr = (e2, t2, n2) => e2 >= n2.left && e2 <= n2.right && t2 >= n2.top && t2 <= n2.bottom;
var ur = (e2, t2, n2 = document) => {
  let r2 = n2.createElement(`style`);
  r2.setAttribute(e2, ``);
  let i2 = un(n2);
  return i2 && (r2.nonce = i2), fn(r2), r2.textContent = t2, n2.head.appendChild(r2), r2;
};
var dr = `html { pointer-events: none !important; }
iframe[${ye}] { pointer-events: auto !important; }`;
var fr = /* @__PURE__ */ new Set();
var A = /* @__PURE__ */ new Map();
var j = false;
var pr = (e2) => {
  if (A.has(e2)) return;
  let t2 = ur(`data-react-grab-frozen-pseudo`, dr, e2), n2 = ur(`data-react-grab-hittest-override`, `html, body { pointer-events: auto !important; }`, e2);
  n2.disabled = true, A.set(e2, { pointerEventsStyle: t2, hitTestOverrideStyle: n2 });
};
var mr = (e2) => {
  let t2 = A.get(e2);
  t2 && (t2.pointerEventsStyle.remove(), t2.hitTestOverrideStyle.remove(), A.delete(e2));
};
var hr = () => j;
var gr = (e2) => (fr.add(e2), j && pr(e2), () => {
  fr.delete(e2), mr(e2);
});
var _r = () => {
  if (!j) {
    j = true, fr.add(document);
    for (let e2 of fr) pr(e2);
  }
};
var vr = () => {
  if (j) {
    j = false;
    for (let e2 of [...A.keys()]) mr(e2);
  }
};
var yr = () => {
  if (j) for (let e2 of A.values()) e2.pointerEventsStyle.disabled || (e2.pointerEventsStyle.disabled = true), e2.hitTestOverrideStyle.disabled && (e2.hitTestOverrideStyle.disabled = false);
};
var br = () => {
  if (j) for (let e2 of A.values()) e2.pointerEventsStyle.disabled && (e2.pointerEventsStyle.disabled = false), e2.hitTestOverrideStyle.disabled || (e2.hitTestOverrideStyle.disabled = true);
};
var M = (e2, t2) => {
  if (e2.length !== 0) throw e2.length === 1 ? e2[0] : AggregateError(e2, t2);
};
var xr = /* @__PURE__ */ new Set();
var N = /* @__PURE__ */ new Set();
var P = false;
var Sr = (e2, t2) => {
  if (N.has(e2)) try {
    e2.unfreeze();
  } catch (e3) {
    t2.push(e3);
  } finally {
    N.delete(e2);
  }
};
var Cr = (e2) => {
  xr.add(e2);
  try {
    P && e2.isConnected() && (e2.freeze(), N.add(e2));
  } catch (t2) {
    throw xr.delete(e2), t2;
  }
  return () => {
    let t2 = [];
    Sr(e2, t2), xr.delete(e2), M(t2, `Unregistering renderer freeze failed`);
  };
};
var wr = () => {
  if (!P) {
    P = true;
    try {
      for (let e2 of xr) e2.isConnected() && (e2.freeze(), N.add(e2));
    } catch (e2) {
      P = false;
      let t2 = [];
      for (let e3 of [...N].reverse()) Sr(e3, t2);
      throw t2.length === 0 ? e2 : AggregateError([e2, ...t2], `Rolling back renderer freeze failed`);
    }
  }
};
var Tr = () => {
  if (!P) return;
  P = false;
  let e2 = [];
  for (let t2 of [...N].reverse()) Sr(t2, e2);
  M(e2, `Unfreezing renderers failed`);
};
var Er = /* @__PURE__ */ new WeakMap();
var Dr = /* @__PURE__ */ new WeakMap();
var F = /* @__PURE__ */ new WeakMap();
var Or = /* @__PURE__ */ new WeakMap();
var kr = /* @__PURE__ */ new WeakMap();
var Ar = [`name`, `position`, `rotation`, `scale`, `color`, `visible`, `args`];
var I = (e2) => typeof e2 == `object` && !!e2;
var jr = (e2) => typeof e2 == `object` && !!e2 || typeof e2 == `function`;
var L = (e2, t2) => typeof e2[t2] == `function`;
var R = (e2) => I(e2) && typeof e2.x == `number` && typeof e2.y == `number` && typeof e2.z == `number` && L(e2, `set`) && L(e2, `clone`) && L(e2, `applyMatrix4`) && L(e2, `project`);
var Mr = (e2) => I(e2) && L(e2, `clone`) && L(e2, `premultiply`);
var Nr = (e2) => I(e2) && `boundingBox` in e2 && L(e2, `computeBoundingBox`);
var Pr = (e2) => I(e2) && typeof e2.type == `string` && I(e2.props) && Fr(e2.object);
var Fr = (e2) => I(e2) && e2.isObject3D === true && typeof e2.uuid == `string` && typeof e2.name == `string` && typeof e2.type == `string` && typeof e2.visible == `boolean` && Mr(e2.matrixWorld) && L(e2, `updateWorldMatrix`);
var Ir = (e2) => I(e2) && e2.isCamera === true;
var Lr = (e2) => Fr(e2) && e2.isScene === true && Array.isArray(e2.children);
var Rr = (e2) => I(e2) && typeof e2.tagName == `string` && e2.tagName.toLowerCase() === `canvas` && L(e2, `getContext`);
var zr = (e2) => I(e2) && Rr(e2.domElement);
var Br = (e2) => I(e2) && L(e2, `set`);
var Vr = (e2) => I(e2) && L(e2, `setFromCamera`) && L(e2, `intersectObjects`);
var Hr = (e2) => I(e2) && zr(e2.gl) && Lr(e2.scene) && Ir(e2.camera) && Vr(e2.raycaster) && Br(e2.pointer);
var Ur = (e2) => e2 === `always` || e2 === `demand` || e2 === `never`;
var Wr = (e2) => I(e2) && typeof e2.elapsedTime == `number`;
var Gr = (e2, t2) => {
  let n2 = e2.getState();
  if (typeof n2.setFrameloop != `function`) return;
  let r2 = Wr(n2.clock) ? n2.clock.elapsedTime : null;
  n2.setFrameloop(t2);
  let i2 = e2.getState().clock;
  r2 !== null && Wr(i2) && (i2.elapsedTime = r2);
};
var Kr = (e2) => {
  if (Or.has(e2)) return;
  let t2 = null, n2 = Cr({ freeze: () => {
    let n3 = F.get(e2);
    if (!n3) return;
    let r2 = n3.getState();
    if (Ur(r2.frameloop) && typeof r2.setFrameloop == `function`) {
      let e3 = r2.frameloop;
      Gr(n3, `never`), t2 = () => Gr(n3, e3);
    }
  }, isConnected: () => e2.isConnected, unfreeze: () => {
    t2?.(), t2 = null;
  } });
  Or.set(e2, n2);
};
var qr = (e2) => {
  let t2 = Or.get(e2);
  t2 && (Or.delete(e2), t2());
};
var Jr = (e2) => Pr(e2.__r3f) ? e2.__r3f : null;
var Yr = (e2) => {
  let t2 = e2.current.stateNode;
  if (!I(t2) || !jr(t2.containerInfo)) return null;
  let n2 = t2.containerInfo, r2 = Reflect.get(n2, `getState`);
  if (typeof r2 != `function`) return null;
  let i2 = Reflect.apply(r2, n2, []);
  return Hr(i2) ? () => {
    let e3 = Reflect.apply(r2, n2, []);
    return Hr(e3) ? e3 : i2;
  } : null;
};
var Xr = (e2) => {
  let t2 = kr.get(e2);
  t2 && (kr.delete(e2), F.get(t2.canvas) === t2.root && (F.delete(t2.canvas), qr(t2.canvas)));
};
var Zr = (e2) => {
  let t2 = Yr(e2);
  if (!t2) {
    Xr(e2);
    return;
  }
  let n2 = t2().gl.domElement;
  if (!n2.isConnected || !e2.current.child) {
    Xr(e2);
    return;
  }
  let r2 = kr.get(e2);
  r2 && r2.canvas !== n2 && (Xr(e2), r2 = void 0), r2 ? (r2.root.getState = t2, r2.root.selectableObjects = null) : (r2 = { canvas: n2, root: { getState: t2, selectableObjects: null } }, kr.set(e2, r2)), F.set(n2, r2.root), Kr(n2);
};
Lt({ name: `react-grab-three-selection`, onCommitFiberRoot: (e2, t2) => Zr(t2) });
var Qr = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    if (Jr(t2)) return t2;
    t2 = t2.parent;
  }
  return null;
};
var $r = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    let e3 = Jr(t2);
    if (e3 && typeof e3.eventCount == `number` && e3.eventCount > 0) return true;
    t2 = t2.parent;
  }
  return false;
};
var ei = (e2, t2) => {
  let n2 = e2;
  for (; n2; ) {
    if (n2 === t2) return true;
    n2 = n2.parent;
  }
  return false;
};
var ti = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    if (!t2.visible) return false;
    t2 = t2.parent;
  }
  return true;
};
var ni = (e2) => !!Jr(e2) && (Nr(e2.geometry) || e2.type.toLowerCase() === `sprite`);
var ri = (e2) => e2.isInstancedMesh !== true || typeof e2.count != `number` || !Number.isInteger(e2.count) || e2.count <= 0 || !e2.getMatrixAt ? 0 : e2.count;
var ii = (e2, t2, n2, r2) => {
  try {
    let i2 = { object: n2 };
    r2 !== void 0 && (i2.instanceId = r2);
    let a2 = ai(t2, n2, i2);
    a2 && e2.push(a2);
  } catch {
  }
};
var ai = (e2, t2, n2) => {
  let r2 = typeof n2.instanceId == `number` && Number.isInteger(n2.instanceId) ? n2.instanceId : null, i2 = Er.get(t2);
  i2 || (i2 = /* @__PURE__ */ new Map(), Er.set(t2, i2));
  let a2 = i2.get(r2);
  if (a2) return a2.canvas = e2.gl.domElement, a2.intersectionPoint = R(n2.point) ? n2.point : null, a2.object = t2, a2.rootState = e2, a2.element;
  let o2 = Jr(t2), s2 = o2 ? Bt(o2) : null;
  if (o2 && !s2) return null;
  let c2 = (o2?.type || t2.type || `object-3d`).toLowerCase(), l2 = e2.gl.domElement.ownerDocument.createElement(c2), u2 = { canvas: e2.gl.domElement, element: l2, fiber: s2, instance: o2, instanceId: r2, intersectionPoint: R(n2.point) ? n2.point : null, object: t2, rootState: e2, tagName: c2 }, d2 = l2.getBoundingClientRect.bind(l2);
  return l2.getBoundingClientRect = () => {
    let e3 = gi(u2), t3 = l2.ownerDocument.defaultView?.DOMRect;
    return t3 ? new t3(e3.x, e3.y, e3.width, e3.height) : d2();
  }, Ht(l2, { hostElement: u2.canvas, supportsDomEditing: false, getBounds: () => gi(u2), getFiber: () => u2.fiber ? xt(u2.fiber) : null, getPreview: () => li(u2), getSelector: () => ui(u2), getTagName: () => u2.tagName, isConnected: () => u2.canvas.isConnected && ei(u2.object, u2.rootState.scene) }), i2.set(r2, u2), Dr.set(l2, u2), l2;
};
var oi = (e2, t2, n2) => {
  if (!Rr(e2)) return e2;
  let r2 = F.get(e2);
  if (!r2) return e2;
  try {
    let i2 = r2.getState(), a2 = Jt(e2);
    if (a2.width <= 0 || a2.height <= 0) return e2;
    let o2 = (t2 - a2.x) / a2.width * 2 - 1, s2 = -((n2 - a2.y) / a2.height) * 2 + 1;
    if (o2 < -1 || o2 > 1 || s2 < -1 || s2 > 1) return e2;
    i2.pointer.set(o2, s2), i2.raycaster.setFromCamera(i2.pointer, i2.camera);
    let c2 = i2.raycaster.intersectObjects(i2.scene.children, true);
    for (let e3 of c2) {
      if (!$r(e3.object)) continue;
      let t3 = Qr(e3.object);
      if (!t3 || t3.visible === false) continue;
      let n3 = ai(i2, t3, e3);
      if (n3) return n3;
    }
    for (let e3 of c2) {
      let t3 = Qr(e3.object);
      if (!t3 || t3.visible === false) continue;
      let n3 = ai(i2, t3, e3);
      if (n3) return n3;
    }
  } catch {
  }
  return e2;
};
var si = (e2, t2) => {
  if (!Rr(e2)) return [];
  let n2 = F.get(e2);
  if (!n2) return [];
  try {
    let e3 = n2.getState(), r2 = t2 ? Dr.get(t2) : null;
    if (!n2.selectableObjects) {
      let t3 = [], r3 = [...e3.scene.children];
      for (let e4 = 0; e4 < r3.length; e4 += 1) {
        let n3 = r3[e4];
        if (n3.children) for (let e5 of n3.children) r3.push(e5);
        ni(n3) && t3.push(n3);
      }
      n2.selectableObjects = t3;
    }
    let i2 = [];
    for (let t3 of n2.selectableObjects) {
      if (!ti(t3) || !ei(t3, e3.scene) || t3.isInstancedMesh === true && t3.count === 0) continue;
      let n3 = ri(t3);
      if (n3 > 0 && n3 <= 512) {
        for (let r3 = 0; r3 < n3; r3 += 1) ii(i2, e3, t3, r3);
        continue;
      }
      if (n3 > 512 && r2?.object === t3 && r2.instanceId !== null) {
        i2.push(r2.element);
        continue;
      }
      ii(i2, e3, t3);
    }
    return i2;
  } catch {
    return [];
  }
};
var ci = (e2) => typeof e2 == `string` ? JSON.stringify(e2) : typeof e2 == `number` || typeof e2 == `boolean` ? `{${String(e2)}}` : Array.isArray(e2) && e2.length <= 4 && e2.every((e3) => typeof e3 == `number` || typeof e3 == `string`) ? `{${JSON.stringify(e2)}}` : null;
var li = (e2) => {
  let t2 = e2.instance?.props ?? {}, n2 = [];
  for (let r2 of Ar) {
    let i2 = t2[r2];
    r2 === `name` && i2 === void 0 && e2.object.name && (i2 = e2.object.name);
    let a2 = ci(i2);
    a2 && n2.push(`${r2}=${a2}`);
  }
  return e2.instanceId !== null && n2.push(`instanceId={${e2.instanceId}}`), `<${e2.tagName}${n2.length > 0 ? ` ${n2.join(` `)}` : ``} />`;
};
var ui = (e2) => {
  if (e2.object.name) return `${e2.tagName}[name=${JSON.stringify(e2.object.name)}]`;
  let t2 = e2.instanceId === null ? `` : `:${e2.instanceId}`;
  return `${e2.tagName}[uuid=${JSON.stringify(`${e2.object.uuid}${t2}`)}]`;
};
var di = (e2) => {
  e2.object.updateWorldMatrix(true, false);
  let t2 = e2.object.matrixWorld.clone();
  if (e2.instanceId === null || !e2.object.getMatrixAt) return t2;
  let n2 = e2.object.matrixWorld.clone();
  return e2.object.getMatrixAt(e2.instanceId, n2), n2.premultiply(t2);
};
var fi = (e2) => {
  if (!Nr(e2.geometry)) return null;
  if (!e2.geometry.boundingBox) try {
    e2.geometry.computeBoundingBox();
  } catch {
    return null;
  }
  let t2 = e2.geometry.boundingBox;
  return !t2 || !R(t2.min) || !R(t2.max) ? null : t2;
};
var pi = (e2) => {
  if (e2.isInstancedMesh !== true || typeof e2.computeBoundingBox != `function`) return null;
  if (!e2.boundingBox) try {
    e2.computeBoundingBox();
  } catch {
    return null;
  }
  let t2 = e2.boundingBox;
  return !t2 || !R(t2.min) || !R(t2.max) ? null : t2;
};
var mi = (e2) => e2.instanceId === null ? pi(e2.object) ?? fi(e2.object) : fi(e2.object);
var hi = (e2, t2) => {
  let n2 = t2.x + t2.width / 2, r2 = t2.y + t2.height / 2;
  try {
    let i2 = e2.intersectionPoint ? e2.intersectionPoint.clone() : R(e2.object.position) ? e2.object.position.clone().set(0, 0, 0).applyMatrix4(di(e2)) : null;
    i2 && (i2.project(e2.rootState.camera), Number.isFinite(i2.x) && Number.isFinite(i2.y) && (n2 = t2.x + (i2.x + 1) / 2 * t2.width, r2 = t2.y + (1 - i2.y) / 2 * t2.height));
  } catch {
  }
  return { x: n2 - 16 / 2, y: r2 - 16 / 2, width: 16, height: 16, borderRadius: `0px` };
};
var gi = (e2) => {
  let t2 = Jt(e2.canvas);
  try {
    let n2 = mi(e2);
    if (!n2) return hi(e2, t2);
    let r2 = di(e2), i2 = [n2.min.x, n2.max.x], a2 = [n2.min.y, n2.max.y], o2 = [n2.min.z, n2.max.z], s2 = 1 / 0, c2 = 1 / 0, l2 = -1 / 0, u2 = -1 / 0, d2 = n2.min.clone();
    for (let n3 of i2) for (let i3 of a2) for (let a3 of o2) {
      if (d2.set(n3, i3, a3).applyMatrix4(r2).project(e2.rootState.camera), !Number.isFinite(d2.x) || !Number.isFinite(d2.y)) continue;
      let o3 = t2.x + (d2.x + 1) / 2 * t2.width, f3 = t2.y + (1 - d2.y) / 2 * t2.height;
      s2 = Math.min(s2, o3), c2 = Math.min(c2, f3), l2 = Math.max(l2, o3), u2 = Math.max(u2, f3);
    }
    if (!Number.isFinite(s2) || !Number.isFinite(c2) || !Number.isFinite(l2) || !Number.isFinite(u2)) return hi(e2, t2);
    let f2 = Math.max(t2.x, s2), p2 = Math.max(t2.y, c2), ee2 = Math.min(t2.x + t2.width, l2), m2 = Math.min(t2.y + t2.height, u2);
    return ee2 <= f2 || m2 <= p2 ? hi(e2, t2) : { x: f2, y: p2, width: ee2 - f2, height: m2 - p2, borderRadius: `0px` };
  } catch {
    return hi(e2, t2);
  }
};
var z = null;
var B = null;
var V = null;
var _i = () => {
  V !== null && clearTimeout(V), V = setTimeout(() => {
    V = null, br();
  }, 100);
};
var vi = () => {
  V !== null && (clearTimeout(V), V = null);
};
var yi = (e2, t2, n2, r2) => {
  let i2 = Math.abs(e2 - n2), a2 = Math.abs(t2 - r2);
  return i2 <= 2 && a2 <= 2;
};
var bi = (e2, t2, n2) => {
  let r2 = oi(e2, t2, n2);
  return Hn(r2) && D(e2) && $n(e2, t2, n2) ? r2 : null;
};
var xi = (e2, t2) => {
  if (!Number.isFinite(e2) || !Number.isFinite(t2)) return [];
  vi(), yr();
  try {
    let n2 = rr(e2, t2), r2 = _n() ? n2.filter(D) : n2, i2 = [], a2 = /* @__PURE__ */ new Set(), o2 = false;
    for (let n3 of r2) {
      let r3 = n3, s2 = $n(n3, e2, t2);
      if (!o2) {
        let i3 = cr(n3, e2, t2);
        i3 && D(i3) && Hn(i3) && $n(i3, e2, t2) ? (r3 = i3, s2 = true, o2 = true) : Hn(n3) && s2 && (o2 = true);
      }
      let c2 = oi(r3, e2, t2);
      if (s2 && !a2.has(c2) && (a2.add(c2), i2.push(c2)), r3 === n3) continue;
      let l2 = E(r3);
      for (; l2 && D(l2); ) {
        let n4 = oi(l2, e2, t2);
        $n(l2, e2, t2) && !a2.has(n4) && (a2.add(n4), i2.push(n4)), l2 = E(l2);
      }
      break;
    }
    return i2;
  } finally {
    _i();
  }
};
var Si = (e2, t2) => {
  if (!Number.isFinite(e2) || !Number.isFinite(t2)) return null;
  let n2 = performance.now();
  if (B) {
    let r2 = B.element, i2 = n2 - B.timestamp < 16;
    if (r2.isConnected && i2 && lr(e2, t2, B.bounds) && !O(r2)) return r2;
    B = null, z?.element === r2 && (z = null);
  }
  if (z) {
    let r2 = yi(e2, t2, z.clientX, z.clientY), i2 = n2 - z.timestamp < 16;
    if (r2 && i2) {
      if (!z.preciseHitElement) return z.element;
      let n3 = cr(z.preciseHitElement, e2, t2);
      if (n3) {
        let r3 = bi(n3, e2, t2);
        if (r3) return r3;
      }
      return z.usesTextHitTesting ? bi(z.preciseHitElement, e2, t2) ?? tr(e2, t2) : z.fallbackElement;
    }
  }
  vi(), yr();
  try {
    let r2 = null, i2 = Dn(e2, t2), a2 = i2 ? Qn(i2) !== null : false, o2 = i2 ? cr(i2, e2, t2) : null, s2 = o2 ? bi(o2, e2, t2) : null, c2 = (i2 ? bi(i2, e2, t2) : null) ?? tr(e2, t2);
    if (r2 = s2 ?? c2, r2 && g(r2) && !O(r2)) {
      let e3 = Jt(r2);
      B = { element: r2, timestamp: n2, bounds: { left: e3.x, top: e3.y, right: e3.x + e3.width, bottom: e3.y + e3.height } };
    } else B = null;
    return z = { clientX: e2, clientY: t2, element: r2, fallbackElement: c2, preciseHitElement: i2?.namespaceURI === `http://www.w3.org/2000/svg` || o2 || a2 ? i2 : null, usesTextHitTesting: a2, timestamp: n2 }, r2;
  } finally {
    _i();
  }
};
var Ci = () => {
  vi(), br(), z = null, B = null;
};
var H = (e2) => {
  console.warn(`[react-grab]`, e2);
};
var wi = (e2, t2) => e2.length === t2.length && e2.every((e3, n2) => e3 === t2[n2]);
var U = false;
var W = null;
var G = false;
var K = /* @__PURE__ */ new Map();
var Ti = -1;
var Ei = /* @__PURE__ */ new WeakSet();
var Di = /* @__PURE__ */ new WeakSet();
var Oi = /* @__PURE__ */ new WeakMap();
var ki = /* @__PURE__ */ new Map();
var q = /* @__PURE__ */ new Map();
var Ai = (e2) => {
  if (W === e2 && (G = true), Ei.has(e2)) return true;
  if (!U && W === e2) {
    let t2 = (Oi.get(e2) ?? 0) + 1;
    return Oi.set(e2, t2), t2 < 4 ? false : (Ei.add(e2), true);
  }
  return !U || !(`gsapVersions` in window) || !(Error().stack ?? ``).includes(`_tick`) ? false : (Ei.add(e2), Di.add(e2), true);
};
typeof window < `u` && (window.requestAnimationFrame = (e2) => {
  let t2 = Ai(e2);
  if (U && t2) {
    let t3 = Ti--;
    return K.set(t3, e2), t3;
  }
  let n2 = Sn((t3) => {
    if (U && Ai(e2)) {
      let t4 = Ti--;
      K.set(t4, e2), ki.set(n2, t4);
      return;
    }
    let r2 = W, i2 = G;
    W = e2, G = false;
    try {
      e2(t3);
    } finally {
      let t4 = G;
      W = r2, G = i2, !t4 && !Di.has(e2) && (Ei.delete(e2), Oi.delete(e2));
    }
  });
  return n2;
}, window.cancelAnimationFrame = (e2) => {
  if (K.has(e2)) {
    K.delete(e2);
    return;
  }
  let t2 = q.get(e2);
  if (t2 !== void 0) {
    Cn(t2.nativeId), q.delete(e2);
    return;
  }
  let n2 = ki.get(e2);
  if (n2 !== void 0) {
    K.delete(n2), ki.delete(e2);
    return;
  }
  Cn(e2);
});
var ji = () => {
  if (!U) {
    U = true, K.clear(), ki.clear();
    for (let [e2, { nativeId: t2, callback: n2 }] of q) Cn(t2), K.set(e2, n2);
    q.clear();
  }
};
var Mi = () => {
  if (U) {
    U = false;
    for (let [e2, t2] of K.entries()) {
      let n2 = Sn((n3) => {
        q.delete(e2);
        let r2 = W, i2 = G;
        W = t2, G = false;
        try {
          t2(n3);
        } finally {
          let e3 = G;
          W = r2, G = i2, !e3 && !Di.has(t2) && (Ei.delete(t2), Oi.delete(t2));
        }
      });
      q.set(e2, { nativeId: n2, callback: t2 });
    }
    K.clear(), ki.clear();
  }
};
var Ni = `
[${ve}],
[${ve}] * {
  animation-play-state: paused !important;
  transition: none !important;
}
`;
var Pi = (e2) => e2?.namespaceURI === `http://www.w3.org/2000/svg` && e2.tagName === `svg`;
var Fi = null;
var J = [];
var Ii = [];
var Li = [];
var Ri = /* @__PURE__ */ new Set();
var Y = /* @__PURE__ */ new Map();
var X = /* @__PURE__ */ new Map();
var zi = [];
var Bi = () => Y.size > 0;
var Vi = () => {
  Fi ||= ur(`data-react-grab-frozen-styles`, Ni);
};
var Hi = (e2) => {
  let t2 = /* @__PURE__ */ new Set();
  for (let n2 of e2) {
    let e3 = Pi(n2) ? n2 : n2.closest(`svg`);
    Pi(e3) && t2.add(e3);
    for (let e4 of n2.querySelectorAll(`svg`)) Pi(e4) && t2.add(e4);
  }
  return [...t2];
};
var Ui = (e2, t2) => {
  let n2 = Reflect.get(e2, t2);
  typeof n2 == `function` && n2.call(e2);
};
var Wi = (e2, t2) => {
  for (let n2 of e2) {
    let e3 = X.get(n2) ?? 0;
    if (e3 === 0) {
      X.set(n2, 1), t2.push(n2), Ui(n2, `pauseAnimations`);
      continue;
    }
    X.set(n2, e3 + 1), t2.push(n2);
  }
};
var Gi = (e2, t2) => {
  let n2 = [];
  for (let r2 of e2) {
    let e3 = X.get(r2);
    if (e3) {
      if (e3 === 1) {
        try {
          Ui(r2, `unpauseAnimations`), X.delete(r2);
        } catch (e4) {
          n2.push(r2), t2.push(e4);
        }
        continue;
      }
      X.set(r2, e3 - 1);
    }
  }
  return n2;
};
var Ki = (e2) => {
  let t2 = [];
  for (let n2 of e2) for (let e3 of n2.getAnimations({ subtree: true })) e3.playState === `running` && t2.push(e3);
  return t2;
};
var qi = (e2) => {
  for (let t2 of e2) try {
    t2.finish();
  } catch {
  }
};
var Ji = (e2) => {
  for (let t2 of e2) try {
    t2.finish();
  } catch {
    try {
      t2.play();
    } catch {
    }
  }
};
var Yi = (e2) => {
  if (!(e2.effect instanceof KeyframeEffect)) return false;
  let t2 = e2.effect.target;
  if (!Re(t2)) return false;
  let n2 = t2.getRootNode();
  return Yt(n2) && Fn(n2.host);
};
var Xi = (e2) => {
  if (e2.length === 0 || wi(e2, Li)) return;
  Zi();
  let t2 = [...e2];
  Vi(), J = t2, Ii = [];
  try {
    Wi(Hi(J), Ii);
    for (let e4 of J) e4.setAttribute(ve, ``);
    let e3 = Ki(J);
    zi = [];
    for (let t3 of e3) t3.pause(), zi.push(t3);
    Li = t2;
  } catch (e3) {
    try {
      Zi();
    } catch (t3) {
      throw AggregateError([e3, t3], `Rolling back animation freeze failed`);
    }
    throw e3;
  }
};
var Zi = () => {
  if (J.length === 0 && Ii.length === 0 && zi.length === 0) return;
  let e2 = J, t2 = Ii, n2 = zi, r2 = [], i2 = [];
  Li = [];
  for (let t3 of e2) try {
    t3.removeAttribute(ve);
  } catch (e3) {
    i2.push(t3), r2.push(e3);
  }
  J = i2, Ii = Gi(t2, r2), Ji(n2), zi = [], M(r2, `Unfreezing element animations failed`);
};
var Qi = (e2) => e2.length === 0 ? (Zi(), () => {
}) : (Xi(e2), Zi);
var $i = (e2) => {
  let t2 = [];
  for (let n2 of e2.getAnimations()) Yi(n2) || n2.playState === `running` && t2.push(n2);
  return { targetDocument: e2, runningAnimations: t2 };
};
var ea = (e2) => {
  let t2 = Y.get(e2);
  if (!t2) return [];
  let n2 = [], r2 = t2.styleElement;
  if (r2) {
    try {
      if (t2.didUseCssFreeze) {
        r2.textContent = `
*, *::before, *::after {
  transition: none !important;
}
`;
        let t3 = [];
        for (let n3 of e2.getAnimations()) Yi(n3) || t3.push(n3);
        qi(t3);
      } else Ji(t2.frozenWaapiAnimations);
      t2.didUseCssFreeze = false, t2.frozenWaapiAnimations = [];
    } catch (e3) {
      n2.push(e3);
    }
    try {
      r2.remove(), t2.styleElement = null;
    } catch (e3) {
      n2.push(e3);
    }
  }
  return t2.frozenSvgElements = Gi(t2.frozenSvgElements, n2), t2.styleElement === null && t2.frozenSvgElements.length === 0 && t2.frozenWaapiAnimations.length === 0 && Y.delete(e2), n2;
};
var ta = (e2) => {
  if (Y.has(e2.targetDocument)) return;
  let t2 = ur(`data-react-grab-global-freeze`, ``, e2.targetDocument), n2 = { styleElement: t2, frozenSvgElements: [], frozenWaapiAnimations: [], didUseCssFreeze: false };
  if (Y.set(e2.targetDocument, n2), e2.runningAnimations.length > 200) t2.textContent = `
*, *::before, *::after {
  animation-play-state: paused !important;
  transition: none !important;
}
`, n2.didUseCssFreeze = true;
  else for (let t3 of e2.runningAnimations) t3.pause(), n2.frozenWaapiAnimations.push(t3);
  Wi(Hi(Array.from(e2.targetDocument.querySelectorAll(`svg`))), n2.frozenSvgElements);
};
var na = (e2) => {
  Ri.add(e2);
  try {
    Bi() && ta($i(e2));
  } catch (t2) {
    Ri.delete(e2);
    let n2 = ea(e2);
    throw n2.length === 0 ? t2 : AggregateError([t2, ...n2], `Freezing frame animations failed`);
  }
  return () => {
    Ri.delete(e2), M(ea(e2), `Unfreezing frame animations failed`);
  };
};
var ra = () => Bi() ? [] : (Ri.add(document), [...Ri].map($i));
var ia = (e2) => {
  if (!Bi()) {
    for (let t2 of e2) ta(t2);
    ji();
  }
};
var aa = () => {
  if (!Bi()) return;
  let e2 = [];
  for (let t2 of [...Y.keys()]) e2.push(...ea(t2));
  try {
    Mi();
  } catch (t2) {
    e2.push(t2);
  }
  M(e2, `Unfreezing global animations failed`);
};
var oa = (e2, t2) => {
  for (let n2 of e2.querySelectorAll(`:hover`)) if (!In(n2) && (h(n2) && t2.add(n2), n2.shadowRoot && oa(n2.shadowRoot, t2), g(n2))) {
    let e3 = O(n2);
    e3 && oa(e3, t2);
  }
};
var sa = () => {
  let e2 = /* @__PURE__ */ new Set();
  return oa(document, e2), [...e2];
};
var ca = [`mouseenter`, `mouseleave`, `mouseover`, `mouseout`, `pointerenter`, `pointerleave`, `pointerover`, `pointerout`];
var la = [`focus`, `blur`, `focusin`, `focusout`];
var ua = [`background-color`, `color`, `border-color`, `box-shadow`, `transform`, `opacity`, `outline`, `filter`, `scale`, `visibility`, `display`];
var da = [`background-color`, `color`, `border-color`, `box-shadow`, `outline`, `outline-offset`, `outline-width`, `outline-color`, `outline-style`, `filter`, `opacity`, `ring-color`, `ring-width`];
var fa = /* @__PURE__ */ new Map();
var pa = /* @__PURE__ */ new Map();
var ma = /* @__PURE__ */ new Set();
var ha = false;
var ga = (e2) => {
  e2.stopImmediatePropagation();
};
var _a = (e2) => {
  e2.preventDefault(), e2.stopImmediatePropagation();
};
var va = (e2) => {
  for (let t2 of ca) e2.addEventListener(t2, ga, true);
  for (let t2 of la) e2.addEventListener(t2, _a, true);
};
var ya = (e2) => {
  for (let t2 of ca) e2.removeEventListener(t2, ga, true);
  for (let t2 of la) e2.removeEventListener(t2, _a, true);
};
var ba = (e2) => {
  ma.add(e2);
  let t2 = gr(e2);
  return ha && va(e2), () => {
    ha && ya(e2), ma.delete(e2), t2();
  };
};
var xa = (e2, t2, n2) => {
  if (n2?.has(e2)) return null;
  let r2 = getComputedStyle(e2), i2 = /* @__PURE__ */ new Map(), a2 = /* @__PURE__ */ new Map();
  for (let n3 of t2) {
    let t3 = r2.getPropertyValue(n3);
    t3 && (i2.set(n3, t3), a2.set(n3, { value: e2.style.getPropertyValue(n3), priority: e2.style.getPropertyPriority(n3) }));
  }
  return { element: e2, frozenPropertyValues: i2, originalPropertyValues: a2 };
};
var Sa = (e2, t2) => {
  let n2 = [], r2 = Dn(e2, t2);
  for (; r2 && r2 !== document.documentElement && !In(r2); ) h(r2) && n2.push(r2), r2 = E(r2);
  return n2;
};
var Ca = () => {
  let e2 = [], t2 = document.activeElement;
  for (; t2 && t2 !== document.body; ) {
    if (h(t2) && e2.push(t2), t2.shadowRoot?.activeElement) {
      t2 = t2.shadowRoot.activeElement;
      continue;
    }
    if (g(t2)) {
      t2 = O(t2)?.activeElement ?? null;
      continue;
    }
    t2 = null;
  }
  return e2;
};
var wa = (e2, t2) => {
  for (let { element: n2, frozenPropertyValues: r2, originalPropertyValues: i2 } of e2) {
    t2.set(n2, i2);
    for (let [e3, t3] of r2) n2.style.setProperty(e3, t3, `important`);
  }
};
var Ta = (e2) => {
  let t2 = [];
  for (let [n2, r2] of e2) {
    for (let [e3, i2] of r2) try {
      i2.value ? n2.style.setProperty(e3, i2.value, i2.priority) : n2.style.removeProperty(e3), r2.delete(e3);
    } catch (e4) {
      t2.push(e4);
    }
    r2.size === 0 && e2.delete(n2);
  }
  return t2;
};
var Ea = (e2, t2) => {
  if (hr()) return null;
  let n2 = [], r2 = e2 !== void 0 && t2 !== void 0 && e2 >= 0 && t2 >= 0 && e2 < window.innerWidth && t2 < window.innerHeight ? Sa(e2, t2) : sa();
  for (let e3 of r2) {
    let t3 = xa(e3, ua);
    t3 && n2.push(t3);
  }
  let i2 = [];
  for (let e3 of Ca()) {
    let t3 = xa(e3, da, pa);
    t3 && i2.push(t3);
  }
  return { hoverStates: n2, focusStates: i2 };
};
var Da = (e2) => {
  if (e2) {
    ha = true, ma.add(document);
    for (let e3 of ma) va(e3);
    wa(e2.hoverStates, fa), wa(e2.focusStates, pa), _r();
  }
};
var Oa = () => {
  Ci(), ha = false;
  for (let e3 of ma) ya(e3);
  let e2 = [...Ta(fa), ...Ta(pa)];
  try {
    vr();
  } catch (t2) {
    e2.push(t2);
  }
  M(e2, `Unfreezing pseudo states failed`);
};
var ka = () => {
  let e2 = [];
  try {
    Tr();
  } catch (t2) {
    e2.push(t2);
  }
  try {
    Oa();
  } catch (t2) {
    e2.push(t2);
  }
  try {
    aa();
  } catch (t2) {
    e2.push(t2);
  }
  return e2;
};
var Aa = (e2, t2) => {
  let n2 = Ea(e2, t2), r2 = ra();
  try {
    Da(n2), ia(r2), wr();
  } catch (e3) {
    let t3 = ka();
    throw t3.length === 0 ? e3 : AggregateError([e3, ...t3], `Freezing global interactions failed`);
  }
};
var ja = () => {
  M(ka(), `Unfreezing global interactions failed`);
};
var Z = false;
var Q = 0;
var Ma = 0;
var Na = (e2, t2, n2) => {
  let r2 = e2.get(t2);
  if (r2) return r2;
  let i2 = n2();
  return e2.set(t2, i2), i2;
};
var Pa = /* @__PURE__ */ new WeakMap();
var Fa = /* @__PURE__ */ new WeakMap();
var Ia = /* @__PURE__ */ new WeakMap();
var La = /* @__PURE__ */ new Set();
var Ra = [];
var $ = [];
var za = /* @__PURE__ */ new WeakMap();
var Ba = /* @__PURE__ */ new WeakMap();
var Va = /* @__PURE__ */ new WeakSet();
var Ha = bt;
var Ua = /* @__PURE__ */ new Set();
var Wa = /* @__PURE__ */ new WeakMap();
Lt({ name: `react-grab-freeze-updates`, onCommitFiberRoot: (e2, t2) => {
  let n2 = y().renderers.get(e2);
  n2 && Wa.set(t2, n2);
} });
var Ga = (e2) => {
  try {
    let t2 = e2.rendererPackageName;
    return typeof t2 == `string` && t2.startsWith(`react-dom`);
  } catch {
    return false;
  }
};
var Ka = (e2) => {
  let t2 = e2;
  for (; t2.return; ) t2 = t2.return;
  return t2.stateNode ?? null;
};
var qa = (e2) => {
  let t2 = e2.current, n2 = t2;
  for (; n2; ) {
    let e3 = n2.stateNode;
    if (e3 && typeof e3 == `object` && typeof Reflect.get(e3, `nodeType`) == `number`) return e3;
    if (n2.child) {
      n2 = n2.child;
      continue;
    }
    for (; n2 !== t2 && !n2.sibling; ) if (n2 = n2.return, !n2) return null;
    if (n2 === t2) return null;
    n2 = n2.sibling;
  }
  return null;
};
var Ja = (e2) => {
  let t2 = Wa.get(e2);
  if (t2) return Ga(t2) ? t2 : null;
  let n2 = Array.from(y().renderers.values()).filter(Ga);
  if (n2.length === 1) {
    let t3 = n2[0];
    return t3 && Wa.set(e2, t3), t3 ?? null;
  }
  let r2 = qa(e2);
  if (!r2) return null;
  for (let t3 of n2) try {
    let n3 = t3.findFiberByHostInstance?.(r2);
    if (n3 && Ka(n3) === e2) return Wa.set(e2, t3), t3;
  } catch {
  }
  return null;
};
var Ya = (e2) => {
  let t2 = e2.current?.stateNode;
  if (!t2 || typeof t2 != `object`) return false;
  let n2 = Reflect.get(t2, `containerInfo`);
  return !!(n2 && typeof n2 == `object` && typeof Reflect.get(n2, `nodeType`) == `number`);
};
var Xa = () => {
  if (Ha.size > 0) {
    let e3 = /* @__PURE__ */ new Set();
    for (let t3 of Ha) Ya(t3) && e3.add(t3);
    return e3;
  }
  let e2 = /* @__PURE__ */ new Set(), t2 = (n2) => {
    let r2 = Bt(n2);
    if (r2) {
      let t3 = Ka(r2);
      t3 && e2.add(t3);
      return;
    }
    for (let r3 of Array.from(n2.children)) if (t2(r3), e2.size > 0) return;
  };
  return t2(document.body), e2;
};
var Za = (e2, t2) => {
  if (!e2) return t2;
  if (!t2) return e2;
  if (!e2.next || !t2.next) return t2;
  let n2 = e2.next, r2 = t2.next, i2 = e2 === n2, a2 = t2 === r2;
  return i2 && a2 ? (e2.next = t2, t2.next = e2) : i2 ? (e2.next = r2, t2.next = e2) : a2 ? (t2.next = n2, e2.next = t2) : (e2.next = r2, t2.next = n2), t2;
};
var Qa = (e2) => {
  if (!e2 || za.has(e2)) return;
  let t2 = { originalPendingDescriptor: Object.getOwnPropertyDescriptor(e2, `pending`), pendingValueAtPause: e2.pending, bufferedPending: null };
  typeof e2.getSnapshot == `function` && (t2.originalGetSnapshot = e2.getSnapshot, t2.snapshotValueAtPause = e2.getSnapshot(), e2.getSnapshot = () => Z ? t2.snapshotValueAtPause : t2.originalGetSnapshot());
  let n2 = t2.pendingValueAtPause;
  Object.defineProperty(e2, `pending`, { configurable: true, enumerable: true, get: () => Z ? null : n2, set: (e3) => {
    if (Z) {
      e3 !== null && (t2.bufferedPending = Za(t2.bufferedPending ?? null, e3));
      return;
    }
    n2 = e3;
  } }), za.set(e2, t2);
};
var $a = (e2) => {
  if (!e2) return [];
  let t2 = [], n2 = e2.next;
  if (!n2) return [];
  let r2 = n2;
  do
    r2 &&= (t2.push(r2.action), r2.next);
  while (r2 && r2 !== n2);
  return t2;
};
var eo = (e2) => {
  let t2 = za.get(e2);
  if (!t2) return;
  t2.originalGetSnapshot && (e2.getSnapshot = t2.originalGetSnapshot), t2.originalPendingDescriptor ? Object.defineProperty(e2, `pending`, t2.originalPendingDescriptor) : delete e2.pending, e2.pending = null;
  let n2 = e2.dispatch;
  if (typeof n2 == `function`) {
    let e3 = $a(t2.pendingValueAtPause ?? null), r2 = $a(t2.bufferedPending ?? null);
    for (let t3 of [...e3, ...r2]) $.push(() => n2(t3));
  }
  za.delete(e2);
};
var to = (e2) => {
  if (Ba.has(e2)) return;
  let t2 = { originalDescriptor: Object.getOwnPropertyDescriptor(e2, `memoizedValue`), frozenValue: e2.memoizedValue };
  Object.defineProperty(e2, `memoizedValue`, { configurable: true, enumerable: true, get() {
    return Z ? t2.frozenValue : t2.originalDescriptor?.get ? t2.originalDescriptor.get.call(this) : this._memoizedValue;
  }, set(e3) {
    if (Z) {
      t2.pendingValue = e3, t2.didReceivePendingValue = true;
      return;
    }
    t2.originalDescriptor?.set ? t2.originalDescriptor.set.call(this, e3) : this._memoizedValue = e3;
  } }), t2.originalDescriptor?.get || (e2._memoizedValue = t2.frozenValue), Ba.set(e2, t2);
};
var no = (e2) => {
  let t2 = Ba.get(e2);
  t2 && (t2.originalDescriptor ? Object.defineProperty(e2, `memoizedValue`, t2.originalDescriptor) : delete e2.memoizedValue, t2.didReceivePendingValue && (e2.memoizedValue = t2.pendingValue), Ba.delete(e2));
};
var ro = (e2) => {
  let t2 = e2.memoizedState;
  for (; t2; ) t2.queue && typeof t2.queue == `object` && Qa(t2.queue), t2 = t2.next;
  let n2 = e2.dependencies?.firstContext;
  for (; n2 && typeof n2 == `object` && `memoizedValue` in n2; ) to(n2), n2 = n2.next;
};
var io = (e2) => {
  let t2 = e2.memoizedState;
  for (; t2; ) t2.queue && typeof t2.queue == `object` && eo(t2.queue), t2 = t2.next;
  let n2 = e2.dependencies?.firstContext;
  for (; n2 && typeof n2 == `object` && `memoizedValue` in n2; ) no(n2), n2 = n2.next;
};
var ao = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    if (lt(t2) && ro(t2), t2.child) {
      t2 = t2.child;
      continue;
    }
    for (; t2 !== e2 && !t2.sibling; ) if (t2 = t2.return, !t2) return;
    if (t2 === e2) return;
    t2 = t2.sibling;
  }
};
var oo = (e2) => {
  let t2 = e2;
  for (; t2; ) {
    if (lt(t2) && io(t2), t2.child) {
      t2 = t2.child;
      continue;
    }
    for (; t2 !== e2 && !t2.sibling; ) if (t2 = t2.return, !t2) return;
    if (t2 === e2) return;
    t2 = t2.sibling;
  }
};
var so = (e2) => {
  if (Pa.has(e2)) return;
  let t2 = e2, n2 = { useState: t2.useState, useReducer: t2.useReducer, useTransition: t2.useTransition, useSyncExternalStore: t2.useSyncExternalStore };
  Pa.set(e2, n2), t2.useState = (...t3) => {
    let r2 = n2.useState.apply(e2, t3);
    if (!Z || !Array.isArray(r2) || typeof r2[1] != `function`) return r2;
    let [i2, a2] = r2;
    return [i2, Na(Fa, a2, () => (...e3) => {
      Z ? $.push(() => a2(...e3)) : a2(...e3);
    })];
  }, t2.useReducer = (...t3) => {
    let r2 = n2.useReducer.apply(e2, t3);
    if (!Z || !Array.isArray(r2) || typeof r2[1] != `function`) return r2;
    let [i2, a2] = r2;
    return [i2, Na(Fa, a2, () => (...e3) => {
      Z ? $.push(() => a2(...e3)) : a2(...e3);
    })];
  }, t2.useTransition = (...t3) => {
    let r2 = n2.useTransition.apply(e2, t3);
    if (!Z || !Array.isArray(r2) || typeof r2[1] != `function`) return r2;
    let [i2, a2] = r2;
    return [i2, Na(Ia, a2, () => (e3) => {
      Z ? Ra.push(() => a2(e3)) : a2(e3);
    })];
  }, t2.useSyncExternalStore = ((e3, t3, r2) => Z ? n2.useSyncExternalStore((t4) => e3(() => {
    Z ? La.add(t4) : t4();
  }), t3, r2) : n2.useSyncExternalStore(e3, t3, r2));
};
var co = (e2) => {
  let t2 = e2.currentDispatcherRef;
  if (!t2 || typeof t2 != `object`) return;
  let n2 = `H` in t2 ? `H` : `current`, r2 = t2[n2];
  Object.defineProperty(t2, n2, { configurable: true, enumerable: true, get: () => (r2 && typeof r2 == `object` && so(r2), r2), set: (e3) => {
    r2 = e3;
  } });
};
var lo = (e2, t2) => {
  queueMicrotask(() => {
    if (!(Z || Ma !== t2)) try {
      for (let t3 of e2) {
        let e3 = Ja(t3);
        if (t3.current && e3?.scheduleUpdate) try {
          e3.scheduleUpdate(t3.current);
        } catch (e4) {
          H(new T(`scheduleUpdate failed during unfreeze`, e4));
        }
      }
    } catch (e3) {
      H(new T(`scheduleReactUpdate failed`, e3));
    }
  });
};
var uo = (e2) => {
  for (let t2 of e2) try {
    t2();
  } catch (e3) {
    H(new T(`Callback failed during state replay`, e3));
  }
};
var fo = () => {
  for (let e2 of y().renderers.values()) Ga(e2) && (Va.has(e2) || (co(e2), Va.add(e2)));
};
var po = () => {
  La.clear(), Ra.length = 0, $.length = 0;
};
var mo = () => {
  let e2 = Ma, t2 = new Set(Ua);
  try {
    for (let e3 of Xa()) t2.add(e3);
  } catch (e3) {
    H(new T(`Collecting fiber roots failed during unfreeze`, e3));
  }
  Ua.clear(), Z = false;
  for (let e3 of t2) try {
    oo(e3.current);
  } catch (e4) {
    H(new T(`Resuming a fiber root failed during unfreeze`, e4));
  }
  let n2 = Array.from(La), r2 = Ra.slice(), i2 = $.slice();
  po(), uo(n2), uo(r2), uo(i2), !Z && Ma === e2 && lo(t2, e2);
};
var ho = () => {
  let e2 = Q === 0;
  if (Q += 1, e2) try {
    fo(), Ma += 1, Z = true;
    let e3 = Xa();
    for (let t3 of e3) Ua.add(t3), ao(t3.current);
  } catch (e3) {
    throw --Q, Z && mo(), e3;
  }
  let t2 = false;
  return () => {
    t2 || (t2 = true, --Q, Q === 0 && mo());
  };
};
var go = () => {
  try {
    return ho();
  } catch (e2) {
    return H(new T(`Pausing React updates failed`, e2)), () => {
    };
  }
};

export {
  t,
  i,
  a,
  o,
  s,
  c,
  l,
  u,
  d,
  f,
  p,
  ee,
  m,
  te,
  ne,
  re,
  ae,
  oe,
  se,
  ce,
  le,
  ue,
  de,
  fe,
  pe,
  me,
  he,
  ge,
  _e,
  ye,
  Se,
  Ce,
  we,
  Te,
  Ee,
  De,
  ke,
  je,
  Me,
  Ne,
  Pe,
  Fe,
  Ie,
  Le,
  Re,
  h,
  g,
  He,
  Ue,
  rt,
  y,
  ct,
  lt,
  pt,
  mt,
  vt,
  yt,
  xt,
  Bt,
  C,
  Ut,
  Kt,
  Jt,
  Yt,
  w,
  T,
  Xt,
  Zt,
  Qt,
  $t,
  en,
  tn,
  nn,
  rn,
  an,
  on,
  sn,
  cn,
  un,
  fn,
  pn,
  E,
  gn,
  _n,
  D,
  vn,
  Sn,
  Cn,
  wn,
  O,
  Nn,
  In,
  Vn,
  Hn,
  Xn,
  Qn,
  rr,
  cr,
  yr,
  br,
  M,
  oi,
  si,
  xi,
  Si,
  Ci,
  H,
  Xi,
  Qi,
  na,
  ba,
  Aa,
  ja,
  go
};
//# sourceMappingURL=chunk-HNU6O7RQ.js.map
