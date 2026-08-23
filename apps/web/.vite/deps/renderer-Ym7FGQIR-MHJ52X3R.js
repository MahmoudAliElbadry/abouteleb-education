import {
  Be,
  Ct,
  D,
  De,
  E,
  F,
  Ge,
  Ie as Ie2,
  Je,
  Ke,
  N,
  O,
  Oe,
  P,
  Se,
  St,
  Te as Te2,
  Ve,
  We,
  Xe,
  Y,
  Ye,
  Ze,
  _t,
  at,
  bt,
  ce as ce2,
  ct,
  dt,
  gt,
  j,
  k,
  mt,
  ne as ne2,
  pt,
  qe,
  we
} from "./chunk-XKBHHYPN.js";
import {
  Aa,
  Cn,
  Ie,
  Ne,
  Pe,
  Sn,
  Te,
  _n,
  a,
  ae,
  c,
  ce,
  de,
  go,
  ja,
  ke,
  l,
  le,
  m,
  ne,
  o,
  oe,
  re,
  se,
  t,
  te,
  ue,
  vn
} from "./chunk-HNU6O7RQ.js";
import "./chunk-PX6F3LHL.js";

// ../../node_modules/react-grab/dist/renderer-Ym7FGQIR.js
var G = (e, t2, n) => e + (t2 - e) * n;
var be = (e, t2) => {
  let n = Math.max(t2, 1);
  return 1 - (1 - e) ** (n / re);
};
var xe = Be(`<canvas data-react-grab-overlay-canvas style=position:fixed;top:0;left:0;pointer-events:none>`);
var Se2 = { borderColor: ce, fillColor: le, lerpFactor: c };
var K = { drag: { borderColor: oe, fillColor: se, lerpFactor: ne }, selection: Se2, grabbed: Se2 };
var Ce = (e) => {
  let t2, i = null, a2 = 0, o2 = 0, s = 1, l2 = null, u = null, d = null, f = [], g = null, _ = [], v = t() ? `display-p3` : `srgb`, y = () => {
    t2 && (s = Math.max(window.devicePixelRatio || 1, 2), a2 = document.documentElement.clientWidth || window.innerWidth, o2 = document.documentElement.clientHeight || window.innerHeight, t2.width = a2 * s, t2.height = o2 * s, t2.style.width = `${a2}px`, t2.style.height = `${o2}px`, i = t2.getContext(`2d`, { colorSpace: v }), i && i.scale(s, s));
  }, b = (e2) => {
    if (!e2) return 0;
    let t3 = e2.match(/^(\d+(?:\.\d+)?)/);
    return t3 ? parseFloat(t3[1]) : 0;
  }, x = (e2, t3, n) => ({ id: e2, current: { x: t3.x, y: t3.y, width: t3.width, height: t3.height }, target: { x: t3.x, y: t3.y, width: t3.width, height: t3.height }, borderRadius: b(t3.borderRadius), opacity: n?.opacity ?? 1, targetOpacity: n?.targetOpacity ?? n?.opacity ?? 1, createdAt: n?.createdAt, fadeStartTimestamp: null, isInitialized: true }), S = (e2, t3, n) => {
    let r = e2.target;
    r.x = t3.x, r.y = t3.y, r.width = t3.width, r.height = t3.height, e2.borderRadius = b(t3.borderRadius), n !== void 0 && (n > e2.targetOpacity && (e2.opacity = n), e2.targetOpacity = n);
  }, C = (e2) => e2.boundsMultiple ?? [e2.bounds], w = (e2, t3, n, r, i2, a3, o3, s2, c2 = 1) => {
    if (r <= 0 || i2 <= 0) return;
    let l3 = Math.min(r / 2, i2 / 2), u2 = Math.min(a3, l3), d2 = c2 !== 1;
    d2 && (e2.globalAlpha = c2), e2.beginPath(), u2 > 0 ? e2.roundRect(t3, n, r, i2, u2) : e2.rect(t3, n, r, i2), e2.fillStyle = o3, e2.fill(), e2.strokeStyle = s2, e2.lineWidth = 1, e2.stroke(), d2 && (e2.globalAlpha = 1);
  }, T = () => {
    if (!i || !e.dragVisible || !g) return;
    let t3 = K.drag;
    w(i, g.current.x, g.current.y, g.current.width, g.current.height, g.borderRadius, t3.fillColor, t3.borderColor);
  }, E2 = () => {
    if (!i || !e.selectionVisible) return;
    let t3 = K.selection;
    for (let e2 of f) w(i, e2.current.x, e2.current.y, e2.current.width, e2.current.height, e2.borderRadius, t3.fillColor, t3.borderColor, e2.opacity);
  }, D2 = (e2) => {
    if (!i) return;
    let t3 = K.grabbed;
    for (let n of e2) w(i, n.current.x, n.current.y, n.current.width, n.current.height, n.borderRadius, t3.fillColor, t3.borderColor, n.opacity);
  }, O2 = () => {
    !i || !t2 || a2 <= 0 || o2 <= 0 || (i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, t2.width, t2.height), i.setTransform(s, 0, 0, s, 0, 0), T(), E2(), D2(_));
  }, k2 = (e2, t3, n) => {
    let r = G(e2.current.x, e2.target.x, t3), i2 = G(e2.current.y, e2.target.y, t3), a3 = G(e2.current.width, e2.target.width, t3), o3 = G(e2.current.height, e2.target.height, t3), s2 = Math.abs(r - e2.target.x) < 0.5 && Math.abs(i2 - e2.target.y) < 0.5 && Math.abs(a3 - e2.target.width) < 0.5 && Math.abs(o3 - e2.target.height) < 0.5;
    e2.current.x = s2 ? e2.target.x : r, e2.current.y = s2 ? e2.target.y : i2, e2.current.width = s2 ? e2.target.width : a3, e2.current.height = s2 ? e2.target.height : o3;
    let c2 = true;
    if (n?.interpolateOpacity) {
      let n2 = G(e2.opacity, e2.targetOpacity, t3);
      c2 = Math.abs(n2 - e2.targetOpacity) < ae, e2.opacity = c2 ? e2.targetOpacity : n2;
    }
    return !s2 || !c2;
  }, A = () => {
    let e2 = performance.now(), t3 = d === null ? re : e2 - d;
    d = e2;
    let n = be(K.drag.lerpFactor, t3), r = be(K.selection.lerpFactor, t3), i2 = be(K.grabbed.lerpFactor, t3), a3 = false, o3 = null;
    g?.isInitialized && k2(g, n) && (a3 = true);
    for (let e3 of f) e3.isInitialized && k2(e3, r) && (a3 = true);
    let s2 = Date.now();
    _ = _.filter((t4) => {
      let n2 = t4.id.startsWith(`label-`);
      if (t4.isInitialized && k2(t4, i2) && (a3 = true), n2 && t4.targetOpacity === 0) {
        t4.fadeStartTimestamp === null && (t4.fadeStartTimestamp = e2);
        let n3 = e2 - t4.fadeStartTimestamp, r2 = Math.min(1, n3 / 125), i3 = 1 - (1 - r2) * (1 - r2);
        return t4.opacity = Math.max(0, 1 - i3), r2 >= 1 ? false : (a3 = true, true);
      } else n2 && (t4.fadeStartTimestamp = null);
      if (t4.createdAt !== void 0) {
        let e3 = s2 - t4.createdAt;
        if (e3 >= 1625) return false;
        if (e3 > 1500) {
          let n3 = Math.min(1, (e3 - l) / 125);
          t4.opacity = 1 - (1 - (1 - n3) * (1 - n3)), a3 = true;
        } else {
          let t5 = l - e3;
          o3 = o3 === null ? t5 : Math.min(o3, t5);
        }
        return true;
      }
      return n2 ? true : t4.opacity > 0;
    }), O2(), a3 ? l2 = Sn(A) : (l2 = null, d = null, o3 !== null && (u = window.setTimeout(() => {
      u = null, j2();
    }, Math.max(0, o3))));
  }, j2 = () => {
    u !== null && (window.clearTimeout(u), u = null), l2 === null && (l2 = Sn(A));
  }, M = () => {
    y(), j2();
  };
  return O(N(() => [e.selectionVisible, e.selectionBounds, e.selectionBoundsMultiple, e.selectionShouldSnap], ([e2, t3, n, r]) => {
    if (!e2 || !t3 && (!n || n.length === 0)) {
      f = [], j2();
      return;
    }
    let i2;
    i2 = n && n.length > 0 ? n : t3 ? [t3] : [];
    let a3 = /* @__PURE__ */ new Map();
    for (let e3 of f) a3.set(e3.id, e3);
    f = i2.map((e3, t4) => {
      let n2 = `selection-${t4}`, i3 = a3.get(n2);
      return i3 ? (S(i3, e3), r && (i3.current.x = i3.target.x, i3.current.y = i3.target.y, i3.current.width = i3.target.width, i3.current.height = i3.target.height), i3) : x(n2, e3);
    }), j2();
  })), O(N(() => [e.dragVisible, e.dragBounds], ([e2, t3]) => {
    if (!e2 || !t3) {
      g = null, j2();
      return;
    }
    g ? S(g, t3) : g = x(`drag`, t3), j2();
  })), O(N(() => [e.grabbedBoxes, e.labelInstances], ([e2, t3]) => {
    let n = e2 ?? [], r = t3 ?? [], i2 = /* @__PURE__ */ new Map();
    for (let e3 of n) i2.set(e3.id, e3);
    let a3 = /* @__PURE__ */ new Map();
    for (let e3 of _) a3.set(e3.id, e3);
    for (let e3 of n) if (!a3.has(e3.id)) {
      let t4 = x(e3.id, e3.bounds, { createdAt: e3.createdAt });
      _.push(t4), a3.set(e3.id, t4);
    }
    for (let e3 of _) {
      let t4 = i2.get(e3.id);
      t4 && S(e3, t4.bounds);
    }
    let o3 = /* @__PURE__ */ new Set();
    for (let e3 of r) {
      let t4 = C(e3), n2 = e3.status === `fading` ? 0 : 1;
      for (let r2 = 0; r2 < t4.length; r2++) {
        let i3 = t4[r2], s2 = `label-${e3.id}-${r2}`;
        o3.add(s2);
        let c2 = a3.get(s2);
        if (c2) S(c2, i3, n2);
        else {
          let e4 = x(s2, i3, { opacity: 1, targetOpacity: n2 });
          _.push(e4), a3.set(s2, e4);
        }
      }
    }
    _ = _.filter((e3) => e3.id.startsWith(`label-`) ? o3.has(e3.id) : i2.has(e3.id)), j2();
  })), P(() => {
    y(), j2(), window.addEventListener(`resize`, M);
    let e2 = null, t3 = () => {
      Math.max(window.devicePixelRatio || 1, 2) !== s && (M(), n());
    }, n = () => {
      e2 && e2.removeEventListener(`change`, t3), e2 = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`), e2.addEventListener(`change`, t3);
    };
    n(), ne2(() => {
      window.removeEventListener(`resize`, M), e2 && e2.removeEventListener(`change`, t3), l2 !== null && Cn(l2), u !== null && window.clearTimeout(u);
    });
  }), (() => {
    var e2 = xe(), r = t2;
    return typeof r == `function` ? Xe(r, e2) : t2 = e2, D((t3) => Je(e2, `z-index`, String(te))), e2;
  })();
};
var we2 = Be(`<div style=position:fixed;pointer-events:none;will-change:opacity;contain:strict;transform:translateZ(0)>`);
var Te3 = (e) => {
  let t2 = _n(), i = t2 ? getComputedStyle(t2).borderRadius : `0px`, a2 = () => t2?.getBoundingClientRect() ?? null, [o2, s] = E(a2());
  if (t2) {
    let n = () => s(a2());
    P(() => {
      let e2 = new ResizeObserver(n);
      e2.observe(t2), window.addEventListener(`scroll`, n, { capture: true, passive: true }), window.addEventListener(`resize`, n), ne2(() => {
        e2.disconnect(), window.removeEventListener(`scroll`, n, { capture: true }), window.removeEventListener(`resize`, n);
      });
    }), O(() => {
      e.visible && n();
    });
  }
  let l2 = () => {
    let e2 = o2();
    return e2 ? `${e2.top}px` : `0`;
  }, u = () => {
    let e2 = o2();
    return e2 ? `${e2.left}px` : `0`;
  }, f = () => {
    let e2 = o2();
    return e2 ? `${e2.width}px` : `100%`;
  }, p = () => {
    let e2 = o2();
    return e2 ? `${e2.height}px` : `100%`;
  };
  return (() => {
    var t3 = we2();
    return Je(t3, `border-radius`, i), Je(t3, `z-index`, te), Je(t3, `transition`, `opacity 125ms ease-out`), Je(t3, `box-shadow`, `inset 0 0 50px ${ue}`), D((n) => {
      var r = l2(), i2 = u(), a3 = f(), o3 = p(), s2 = +!!e.visible;
      return r !== n.e && Je(t3, `top`, n.e = r), i2 !== n.t && Je(t3, `left`, n.t = i2), a3 !== n.a && Je(t3, `width`, n.a = a3), o3 !== n.o && Je(t3, `height`, n.o = o3), s2 !== n.i && Je(t3, `opacity`, n.i = s2), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }), t3;
  })();
};
var Ee = (e, t2) => {
  e.style.height = `auto`, e.style.height = `${Math.min(e.scrollHeight, t2)}px`;
};
var De2 = (e, t2) => {
  e && e.focus(t2);
};
var Oe2 = (e) => {
  if (e <= 0) return 8;
  let t2 = e * de;
  return Math.round(Math.max(4, Math.min(8, t2)));
};
var q = () => {
  let e = _n();
  if (e) {
    let t3 = e.getBoundingClientRect();
    return { width: t3.width, height: t3.height, offsetLeft: t3.left, offsetTop: t3.top };
  }
  let t2 = window.visualViewport;
  return t2 ? { width: t2.width, height: t2.height, offsetLeft: t2.offsetLeft, offsetTop: t2.offsetTop } : { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
};
var ke2 = (e) => e.isComposing || e.keyCode === 229;
var Ae = (e) => {
  if (typeof e == `string` || typeof e == `number`) return String(e);
  if (!e || typeof e != `object`) return ``;
  if (Array.isArray(e)) {
    let t3 = ``;
    for (let n of e) {
      if (!n) continue;
      let e2 = Ae(n);
      e2 && (t3 = t3 ? `${t3} ${e2}` : e2);
    }
    return t3;
  }
  let t2 = ``;
  for (let n in e) e[n] && (t2 = t2 ? `${t2} ${n}` : n);
  return t2;
};
var J = (...e) => {
  let t2 = ``;
  for (let n of e) {
    if (!n) continue;
    let e2 = Ae(n);
    e2 && (t2 = t2 ? `${t2} ${e2}` : e2);
  }
  return t2;
};
var Y2 = (e) => e.elementsCount && e.elementsCount > 1 ? { tagName: `${e.elementsCount} elements`, componentName: void 0 } : { tagName: e.tagName || e.componentName || `element`, componentName: e.tagName ? e.componentName : void 0 };
var je = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M19.2929 12.7071C19.6834 13.0976 20.3166 13.0976 20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289L3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071C3.68342 13.0976 4.31658 13.0976 4.70711 12.7071L11 6.41421L11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20L13 6.41422L19.2929 12.7071Z">`);
var Me = (e) => {
  let t2 = () => e.size ?? 10;
  return (() => {
    var r = je();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var Ne2 = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path class=icon-loader-bar d="M12 2v4"style=animation-delay:0ms></path><path class=icon-loader-bar d="M15 6.8l2-3.5"style=animation-delay:-42ms></path><path class=icon-loader-bar d="M17.2 9l3.5-2"style=animation-delay:-83ms></path><path class=icon-loader-bar d="M18 12h4"style=animation-delay:-125ms></path><path class=icon-loader-bar d="M17.2 15l3.5 2"style=animation-delay:-167ms></path><path class=icon-loader-bar d="M15 17.2l2 3.5"style=animation-delay:-208ms></path><path class=icon-loader-bar d="M12 18v4"style=animation-delay:-250ms></path><path class=icon-loader-bar d="M9 17.2l-2 3.5"style=animation-delay:-292ms></path><path class=icon-loader-bar d="M6.8 15l-3.5 2"style=animation-delay:-333ms></path><path class=icon-loader-bar d="M2 12h4"style=animation-delay:-375ms></path><path class=icon-loader-bar d="M6.8 9l-3.5-2"style=animation-delay:-417ms></path><path class=icon-loader-bar d="M9 6.8l-2-3.5"style=animation-delay:-458ms>`);
var Pe2 = (e) => {
  let t2 = () => e.size ?? 16;
  return (() => {
    var r = Ne2();
    return r.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling, D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var Fe = Be(`<svg data-react-grab-arrow class="absolute block z-10"><path>`);
var Ie3 = (e) => {
  let t2 = () => e.position === `bottom`, r = () => Oe2(e.labelWidth ?? 0), i = () => r() * 2, a2 = () => r(), o2 = () => {
    let e2 = i(), n = a2(), r2 = 1 * Math.SQRT1_2, o3 = e2 / 2, s = t2() ? n : 0, c2 = t2() ? r2 : n - r2, l2 = +!!t2();
    return `M0 ${s} L${o3 - r2} ${c2} A1 1 0 0 ${l2} ${o3 + r2} ${c2} L${e2} ${s} Z`;
  };
  return (() => {
    var r2 = Fe(), s = r2.firstChild;
    return Y(s, `fill`, a), D((n) => {
      var c2 = i(), l2 = a2(), u = `0 0 ${i()} ${a2()}`, d = `calc(${e.leftPercent}% + ${e.leftOffsetPx}px)`, f = t2() ? `0` : void 0, p = t2() ? void 0 : `0`, m2 = t2() ? `translateX(-50%) translateY(calc(-100% + 1px))` : `translateX(-50%) translateY(calc(100% - 1px))`, h = o2();
      return c2 !== n.e && Y(r2, `width`, n.e = c2), l2 !== n.t && Y(r2, `height`, n.t = l2), u !== n.a && Y(r2, `viewBox`, n.a = u), d !== n.o && Je(r2, `left`, n.o = d), f !== n.i && Je(r2, `top`, n.i = f), p !== n.n && Je(r2, `bottom`, n.n = p), m2 !== n.s && Je(r2, `transform`, n.s = m2), h !== n.h && Y(s, `d`, n.h = h), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0, s: void 0, h: void 0 }), r2;
  })();
};
var X = Be(`<span> `);
var Le = Be(`<span class=text-[var(--rg-text-secondary)]> `);
var Re = Be(`<span class=text-[var(--rg-text-primary)]> `);
var ze = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-4 h-fit font-medium overflow-hidden text-ellipsis whitespace-nowrap min-w-0">`);
var Be2 = Be(`<button type=button>`);
var Ve2 = Be(`<div>`);
var He = (e) => {
  let t2 = () => {
    e.onHoverChange?.(true);
  }, r = () => {
    e.onHoverChange?.(false);
  }, i = () => e.componentName ? `${e.componentName}.${e.tagName}` : e.tagName, a2 = () => (() => {
    var t3 = ze();
    return Ze(t3, Se(Oe, { get when() {
      return e.componentName;
    }, get children() {
      return [(() => {
        var t4 = X(), r2 = t4.firstChild;
        return D(() => r2.data = e.componentName), t4;
      })(), (() => {
        var t4 = Le(), r2 = t4.firstChild;
        return D(() => r2.data = `.${e.tagName}`), t4;
      })()];
    } }), null), Ze(t3, Se(Oe, { get when() {
      return !e.componentName;
    }, get children() {
      var t4 = Re(), r2 = t4.firstChild;
      return D(() => r2.data = e.tagName), t4;
    } }), null), t3;
  })();
  return Se(Oe, { get when() {
    return e.isClickable;
  }, get fallback() {
    return (() => {
      var i2 = Ve2();
      return Ge(i2, `click`, e.onClick, true), i2.addEventListener(`mouseleave`, r), i2.addEventListener(`mouseenter`, t2), Ze(i2, a2), D(() => We(i2, J(`contain-layout flex items-center gap-1 max-w-[280px] overflow-hidden`, e.shrink && `shrink-0`))), i2;
    })();
  }, get children() {
    var o2 = Be2();
    return Ge(o2, `click`, e.onClick, true), o2.addEventListener(`mouseleave`, r), o2.addEventListener(`mouseenter`, t2), Ze(o2, a2), D((t3) => {
      var n = `Open source for ${i()}`, r2 = J(`contain-layout flex items-center gap-1 max-w-[280px] overflow-hidden cursor-pointer bg-transparent border-none p-0 m-0 text-left`, e.shrink && `shrink-0`);
      return n !== t3.e && Y(o2, `aria-label`, t3.e = n), r2 !== t3.t && We(o2, t3.t = r2), t3;
    }, { e: void 0, t: void 0 }), o2;
  } });
};
Ve([`click`]);
var Ue = Be(`<div class="[font-synthesis:none] contain-layout shrink-0 flex flex-col items-start px-2 py-1.5 w-auto h-fit self-stretch [border-top-width:0.5px] border-t-[var(--rg-border-subtle)] antialiased">`);
var We2 = (e) => (() => {
  var t2 = Ue();
  return Ze(t2, () => e.children), t2;
})();
var Ge2 = (e, t2 = {}) => (n = {}) => {
  let r = t2.variants;
  if (!r) return e;
  let i = [e];
  for (let e2 in r) {
    let a2 = n[e2] ?? t2.defaultVariants?.[e2];
    if (a2 === void 0) continue;
    let o2 = r[e2][String(a2)];
    o2 && i.push(o2);
  }
  return J(...i);
};
var Ke2 = Be(`<div>`);
var qe2 = Ge2(`contain-layout antialiased [font-synthesis:none] bg-[var(--rg-panel-bg)]`, { variants: { shape: { panel: `rounded-[14px] [corner-shape:superellipse(1.25)]`, pill: `rounded-full` } }, defaultVariants: { shape: `panel` } });
var Je2 = (e) => {
  let [t2, n] = Te2(e, [`shape`, `class`]);
  return (() => {
    var e2 = Ke2();
    return Ye(e2, we({ get class() {
      return J(qe2({ shape: t2.shape }), t2.class);
    } }, n), false, false), e2;
  })();
};
var Ye2 = null;
var Xe2 = { claim: (e) => {
  Ye2 = e;
}, release: (e) => {
  Ye2 === e && (Ye2 = null);
}, isActive: (e) => Ye2 === e };
var Ze2 = (e) => {
  let t2 = /* @__PURE__ */ Symbol(), n = vn((n2) => {
    Xe2.isActive(t2) && (ct(n2) || (n2.code === `Enter` ? e.onEnter?.(n2) : n2.code === `Escape` && e.onEscape?.(n2)));
  });
  return P(() => {
    Xe2.claim(t2), window.addEventListener(`keydown`, n, { capture: true });
  }), ne2(() => {
    Xe2.release(t2), window.removeEventListener(`keydown`, n, { capture: true });
  }), { claimFocus: () => Xe2.claim(t2) };
};
var Qe = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M10.7071 21.2071C10.3166 21.5976 9.68342 21.5976 9.29289 21.2071L3.29289 15.2071C2.90237 14.8166 2.90237 14.1834 3.29289 13.7929L9.29289 7.79289C9.68342 7.40237 10.3166 7.40237 10.7071 7.79289C11.0976 8.18342 11.0976 8.81658 10.7071 9.20711L6.41421 13.5H16C16.5523 13.5 17 13.0523 17 12.5V3.5C17 2.94772 17.4477 2.5 18 2.5C18.5523 2.5 19 2.94772 19 3.5V12.5C19 14.1569 17.6569 15.5 16 15.5H6.41421L10.7071 19.7929C11.0976 20.1834 11.0976 20.8166 10.7071 21.2071Z">`);
var $e = (e) => {
  let t2 = () => e.size ?? 10;
  return (() => {
    var r = Qe();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var et = Be(`<button>`);
var tt = Ge2(`contain-layout shrink-0 flex items-center justify-center cursor-pointer transition-all press-scale`, { variants: { variant: { chip: `px-[3px] py-px h-[17px] rounded-sm bg-[var(--rg-surface-hover)] [border-width:0.5px] border-solid border-[var(--rg-border-button)] hover:bg-[var(--rg-surface-active)] text-[var(--rg-text-primary)]`, destructive: `px-[3px] py-px h-[17px] rounded-sm bg-[var(--rg-error-bg)] hover:bg-[var(--rg-error-bg-hover)] text-[var(--rg-error-text)]`, ghost: `rounded-sm bg-transparent hover:bg-[var(--rg-surface-hover)] border-none outline-none p-0` } }, defaultVariants: { variant: `chip` } });
var nt = (e) => {
  let [t2, n] = Te2(e, [`variant`, `class`, `type`]);
  return (() => {
    var e2 = et();
    return Ye(e2, we({ get type() {
      return t2.type ?? `button`;
    }, get class() {
      return J(tt({ variant: t2.variant }), t2.class);
    } }, n), false, false), e2;
  })();
};
var rt = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-3.5 font-sans font-medium">No`);
var it = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-3.5 font-sans font-medium">Copy`);
var at2 = Be(`<span class="text-[var(--rg-error-text)] text-[13px] leading-3.5 font-sans font-medium">Yes`);
var ot = Be(`<div class="contain-layout shrink-0 flex items-center justify-end gap-[5px] w-full h-fit">`);
var st = Be(`<div data-react-grab-discard-prompt class="contain-layout shrink-0 flex flex-col justify-center items-end w-fit h-fit"><div class="contain-layout shrink-0 flex items-center gap-1 pt-1.5 pb-1 px-2 w-full h-fit"><span class="text-[var(--rg-text-primary)] text-[13px] leading-4 shrink-0 font-sans font-medium w-fit h-fit"> `);
var ct2 = (e) => {
  let t2 = () => e.showCancel ?? true, { claimFocus: r } = Ze2({ onEnter: (t3) => {
    t3.preventDefault(), t3.stopPropagation();
    let n = t3.composedPath()[0], r2 = n instanceof HTMLElement ? n : null;
    if (r2?.closest(`[data-react-grab-discard-copy]`)) {
      e.onCopy?.();
      return;
    }
    if (r2?.closest(`[data-react-grab-discard-no]`)) {
      e.onCancel?.();
      return;
    }
    e.onConfirm?.();
  }, onEscape: (t3) => {
    t3.preventDefault(), t3.stopPropagation(), e.cancelOnEscape ? e.onCancel?.() : e.onConfirm?.();
  } });
  return (() => {
    var i = st(), a2 = i.firstChild.firstChild.firstChild;
    return Ge(i, `click`, r, true), Ge(i, `pointerdown`, r, true), Ze(i, Se(We2, { get children() {
      var n = ot();
      return Ze(n, Se(Oe, { get when() {
        return t2();
      }, get children() {
        return Se(nt, { "data-react-grab-discard-no": true, get onClick() {
          return e.onCancel;
        }, get children() {
          return rt();
        } });
      } }), null), Ze(n, Se(Oe, { get when() {
        return e.onCopy;
      }, get children() {
        return Se(nt, { "data-react-grab-discard-copy": true, get onClick() {
          return e.onCopy;
        }, get children() {
          return it();
        } });
      } }), null), Ze(n, Se(nt, { variant: `destructive`, class: `gap-0.5`, "data-react-grab-discard-yes": true, get onClick() {
        return e.onConfirm;
      }, get children() {
        return [at2(), Se($e, { size: 10, class: `text-[var(--rg-error-text)] opacity-50` })];
      } }), null), n;
    } }), null), D(() => a2.data = e.label ?? `Discard?`), i;
  })();
};
Ve([`pointerdown`, `click`]);
var lt = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M7 2C4.23858 2 2 4.23858 2 7V15C2 17.7614 4.23858 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.34315 18 4 16.6569 4 15V7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V15C20 16.6569 18.6569 18 17 18H14.4142L16.2071 16.2071C16.5976 15.8166 16.5976 15.1834 16.2071 14.7929C15.8166 14.4024 15.1834 14.4024 14.7929 14.7929L11.2929 18.2929C11.197 18.3888 11.1247 18.4993 11.0759 18.6172C11.027 18.7351 11 18.8644 11 19C11 19.2728 11.1093 19.5201 11.2864 19.7005C11.2889 19.7031 11.2914 19.7056 11.2939 19.7081L14.7929 23.2071C15.1834 23.5976 15.8166 23.5976 16.2071 23.2071C16.5976 22.8166 16.5976 22.1834 16.2071 21.7929L14.4142 20H17C19.7614 20 22 17.7614 22 15V7C22 4.23858 19.7614 2 17 2H7Z">`);
var ut = (e) => {
  let t2 = () => e.size ?? 12;
  return (() => {
    var r = lt();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var dt2 = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-3.5 font-sans font-medium">Retry`);
var ft = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-3.5 font-sans font-medium">Ok`);
var pt2 = Be(`<div class="contain-layout shrink-0 flex items-center justify-end gap-[5px] w-full h-fit">`);
var mt2 = Be(`<div data-react-grab-error role=alert aria-live=assertive class="contain-layout shrink-0 flex flex-col justify-center items-end w-fit h-fit max-w-[280px]"><div class="contain-layout shrink-0 flex items-start gap-1 px-2 w-full h-fit"><span class="text-[var(--rg-error-text)] text-[13px] leading-4 font-sans font-medium overflow-hidden line-clamp-5"> `);
var ht = (e) => {
  let { claimFocus: t2 } = Ze2({ onEnter: (t3) => {
    if (mt(t3, `data-react-grab-error-ok`)) {
      t3.preventDefault(), t3.stopPropagation(), e.onAcknowledge?.();
      return;
    }
    t3.preventDefault(), t3.stopPropagation(), e.onRetry?.();
  }, onEscape: (t3) => {
    t3.preventDefault(), t3.stopPropagation(), e.onAcknowledge?.();
  } }), r = () => !!(e.onRetry || e.onAcknowledge);
  return (() => {
    var i = mt2(), a2 = i.firstChild, o2 = a2.firstChild, s = o2.firstChild;
    return Ge(i, `click`, t2, true), Ge(i, `pointerdown`, t2, true), Ze(i, Se(Oe, { get when() {
      return r();
    }, get children() {
      return Se(We2, { get children() {
        var t3 = pt2();
        return Ze(t3, Se(Oe, { get when() {
          return e.onRetry;
        }, get children() {
          return Se(nt, { "data-react-grab-retry": true, class: `gap-1`, "aria-keyshortcuts": `Enter`, get onClick() {
            return e.onRetry;
          }, get children() {
            return [dt2(), Se(ut, { size: 10, "aria-hidden": `true`, class: `text-[var(--rg-text-secondary)]` })];
          } });
        } }), null), Ze(t3, Se(Oe, { get when() {
          return e.onAcknowledge;
        }, get children() {
          return Se(nt, { "data-react-grab-error-ok": true, class: `gap-1`, "aria-keyshortcuts": `Escape`, get onClick() {
            return e.onAcknowledge;
          }, get children() {
            return ft();
          } });
        } }), null), t3;
      } });
    } }), null), D((t3) => {
      var n = { "pt-1.5 pb-1": r(), "py-1.5": !r() }, i2 = e.error, c2 = e.error;
      return t3.e = Ke(a2, n, t3.e), i2 !== t3.t && Y(o2, `title`, t3.t = i2), c2 !== t3.a && (s.data = t3.a = c2), t3;
    }, { e: void 0, t: void 0, a: void 0 }), i;
  })();
};
Ve([`pointerdown`, `click`]);
var gt2 = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M7.5 12C7.5 13.3807 6.38071 14.5 5 14.5C3.61929 14.5 2.5 13.3807 2.5 12C2.5 10.6193 3.61929 9.5 5 9.5C6.38071 9.5 7.5 10.6193 7.5 12ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12ZM19 14.5C20.3807 14.5 21.5 13.3807 21.5 12C21.5 10.6193 20.3807 9.5 19 9.5C17.6193 9.5 16.5 10.6193 16.5 12C16.5 13.3807 17.6193 14.5 19 14.5Z">`);
var _t2 = (e) => {
  let t2 = () => e.size ?? 14;
  return (() => {
    var r = gt2();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var vt = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM17.7071 10.7071C18.0976 10.3166 18.0976 9.68342 17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289L11 14.5858L8.70711 12.2929C8.31658 11.9024 7.68342 11.9024 7.29289 12.2929C6.90237 12.6834 6.90237 13.3166 7.29289 13.7071L10.2929 16.7071C10.6834 17.0976 11.3166 17.0976 11.7071 16.7071L17.7071 10.7071Z">`);
var yt = (e) => {
  let t2 = () => e.size ?? 14;
  return (() => {
    var r = vt();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var bt2 = Be(`<button type=button data-react-grab-ignore-events data-react-grab-more-options aria-label="More options">`);
var xt = Be(`<span class="text-[var(--rg-text-primary)] text-[13px] leading-3.5 font-sans font-medium">Keep`);
var St2 = Be(`<div class="contain-layout shrink-0 flex items-center justify-between gap-2 pt-1.5 pb-1 px-2 w-full h-fit"><span class="text-[var(--rg-text-primary)] text-[13px] leading-4 font-sans font-medium h-fit tabular-nums overflow-hidden text-ellipsis whitespace-nowrap min-w-0"> </span><div class="contain-layout shrink-0 flex items-center gap-2 h-fit">`);
var Ct2 = Be(`<div class="contain-layout shrink-0 flex items-center gap-0.5 py-1.5 px-2 w-full h-fit"><span class="text-[var(--rg-text-primary)] text-[13px] leading-4 font-sans font-medium h-fit tabular-nums overflow-hidden text-ellipsis whitespace-nowrap min-w-0"> `);
var wt = (e) => (() => {
  var t2 = bt2();
  return Ge(t2, `click`, (t3) => {
    t3.stopImmediatePropagation(), e.onClick();
  }), Ge(t2, `pointerdown`, (e2) => {
    e2.stopImmediatePropagation();
  }), Ze(t2, Se(_t2, { size: 14, "aria-hidden": `true`, class: `opacity-50 group-hover:opacity-100 transition-opacity` })), D(() => We(t2, J(tt({ variant: `ghost` }), `group size-4 text-[var(--rg-text-secondary)] hover:text-[var(--rg-text-primary)]`))), t2;
})();
var Tt = (e) => {
  let t2, r, [i, a2] = E(false), [o2, s] = E(false), c2 = () => i() ? `Copied` : e.statusText, l2 = () => {
    t2 !== void 0 && window.clearTimeout(t2), r !== void 0 && window.clearTimeout(r), s(true), e.onFadingChange?.(true), e.onShowContextMenu?.();
  }, u = () => {
    i() || (a2(true), t2 = window.setTimeout(() => {
      s(true), e.onFadingChange?.(true), r = window.setTimeout(() => {
        e.onDismiss?.();
      }, 125);
    }, l - 125));
  }, { claimFocus: f } = Ze2({ onEnter: (e2) => {
    if (mt(e2, `data-react-grab-more-options`)) {
      e2.preventDefault(), e2.stopPropagation(), l2();
      return;
    }
    mt(e2, `data-react-grab-context-menu`) || (e2.preventDefault(), e2.stopPropagation(), u());
  }, onEscape: (t3) => {
    t3.preventDefault(), t3.stopPropagation(), e.onDismiss?.();
  } });
  return ne2(() => {
    t2 !== void 0 && window.clearTimeout(t2), r !== void 0 && window.clearTimeout(r);
  }), Se(Je2, { shape: `pill`, "data-react-grab-completion": true, role: `status`, "aria-live": `polite`, "aria-atomic": `true`, class: `shrink-0 flex flex-col justify-center items-end w-fit h-fit max-w-[280px] transition-opacity duration-100 ease-out`, get style() {
    return { opacity: +!o2() };
  }, onPointerDown: f, onClick: f, get children() {
    return [Se(Oe, { get when() {
      return Ie2(() => !i())() && e.onDismiss;
    }, get children() {
      var t3 = St2(), r2 = t3.firstChild, a3 = r2.firstChild, o3 = r2.nextSibling;
      return Ze(o3, Se(Oe, { get when() {
        return e.onShowContextMenu;
      }, get children() {
        return Se(wt, { onClick: l2 });
      } }), null), Ze(o3, Se(Oe, { get when() {
        return e.onDismiss;
      }, get children() {
        return Se(nt, { "data-react-grab-dismiss": true, class: `gap-1`, "aria-keyshortcuts": `Enter`, onClick: u, get disabled() {
          return i();
        }, get "aria-disabled"() {
          return i();
        }, get children() {
          return [xt(), Se(Oe, { get when() {
            return !i();
          }, get children() {
            return Se($e, { size: 10, class: `text-[var(--rg-text-secondary)]` });
          } })];
        } });
      } }), null), D(() => a3.data = c2()), t3;
    } }), Se(Oe, { get when() {
      return i() || !e.onDismiss;
    }, get children() {
      var t3 = Ct2(), r2 = t3.firstChild, i2 = r2.firstChild;
      return Ze(t3, Se(yt, { size: 14, "aria-hidden": `true`, class: `text-[var(--rg-text-primary-85)] shrink-0` }), r2), Ze(t3, Se(Oe, { get when() {
        return e.onShowContextMenu;
      }, get children() {
        return Se(wt, { onClick: l2 });
      } }), null), D(() => i2.data = c2()), t3;
    } })];
  } });
};
var Et = Be(`<div class="contain-layout shrink-0 flex flex-col justify-center items-start w-fit h-fit max-w-[280px]"><div class="contain-layout shrink-0 flex items-center gap-1 py-1.5 px-2 w-full h-fit"><span class="shimmer-text text-[13px] leading-4 font-sans font-medium h-fit tabular-nums overflow-hidden text-ellipsis whitespace-nowrap"> `);
var Dt = Be(`<div class="contain-layout shrink-0 flex flex-col items-start w-fit h-fit"><div class="contain-layout shrink-0 flex items-center gap-1 w-fit h-fit px-2 py-1.5">`);
var Ot = Be(`<button data-react-grab-submit type=button aria-label="Submit context"class="contain-layout shrink-0 flex items-center justify-center size-4 rounded-full bg-[var(--rg-submit-bg)] cursor-pointer ml-1 interactive-scale a11y-hitbox">`);
var kt = Be(`<div class="shrink-0 flex justify-between items-end w-full min-h-4"><textarea data-react-grab-ignore-events data-react-grab-input aria-label="Add context for selected element"aria-keyshortcuts="Enter Escape"class="text-[var(--rg-text-primary)] text-[13px] leading-4 font-medium bg-transparent border-none resize-none flex-1 p-0 m-0 wrap-break-word overflow-y-auto"placeholder="Add context"rows=1 style=field-sizing:content;min-height:16px;scrollbar-width:none>`);
var At = Be(`<div class="contain-layout shrink-0 flex flex-col justify-center items-start w-fit h-fit min-w-[150px] max-w-[280px]"><div class="contain-layout shrink-0 flex items-center gap-1 pt-1.5 pb-1 w-fit h-fit px-2 max-w-full">`);
var jt = Be(`<div data-react-grab-ignore-events data-react-grab-selection-label class="fixed font-sans text-[13px] antialiased select-none">`);
var Mt = { left: Ie, top: Ie, arrowLeftPercent: 50, arrowLeftOffset: 0, edgeOffsetX: 0 };
var Nt = (e) => {
  let t2, i, a2, o2 = false, [s, l2] = E(0), [f, _] = E(0), [v, y] = E(0), [b, x] = E(0), [S, C] = E(false), [w, D2] = E(false), O2 = () => e.status !== `copying` && e.status !== `copied` && e.status !== `fading` && e.status !== `error`, k2 = () => e.status === `copied` || e.status === `fading`, A = () => !!(e.isPromptMode || e.discardPrompt || k2() && (e.onDismiss || e.onShowContextMenu) || e.status === `error` && (e.onAcknowledgeError || e.onRetry)), j2, M = (e2) => {
    o2 = e2;
  }, N2 = () => {
    x((e2) => e2 + 1);
  };
  P(() => {
    let e2 = _n();
    if (j2 = new ResizeObserver((n) => {
      for (let r of n) {
        let n2 = r.target.getBoundingClientRect();
        r.target === t2 && !o2 ? (l2(n2.width), _(n2.height)) : r.target === i ? y(n2.width) : r.target === e2 && N2();
      }
    }), e2 && j2.observe(e2), t2) {
      let e3 = t2.getBoundingClientRect();
      l2(e3.width), _(e3.height), j2.observe(t2);
    }
    i && (y(i.getBoundingClientRect().width), j2.observe(i)), window.addEventListener(`scroll`, N2, true), window.addEventListener(`resize`, N2), window.visualViewport?.addEventListener(`resize`, N2), window.visualViewport?.addEventListener(`scroll`, N2);
  }), ne2(() => {
    j2?.disconnect(), window.removeEventListener(`scroll`, N2, true), window.removeEventListener(`resize`, N2), window.visualViewport?.removeEventListener(`resize`, N2), window.visualViewport?.removeEventListener(`scroll`, N2);
  });
  let F2 = () => `${e.tagName ?? ``}:${e.componentName ?? ``}`, L = k((t3) => {
    b();
    let n = F2(), r = n === t3.elementIdentity ? t3 : { position: Mt, computedArrowPosition: null, hadValidBounds: false, elementIdentity: n }, i2 = e.selectionBounds, a3 = s(), o3 = f(), c2 = a3 > 0 && o3 > 0, l3 = i2 && i2.width > 0 && i2.height > 0;
    if (!c2 || !l3) return { position: r.hadValidBounds ? r.position : Mt, computedArrowPosition: r.computedArrowPosition, hadValidBounds: r.hadValidBounds, elementIdentity: n };
    let u = q(), d = u.offsetLeft, p = u.offsetTop, m2 = d + u.width, h = p + u.height;
    if (!(i2.x + i2.width > d && i2.x < m2 && i2.y + i2.height > p && i2.y < h)) return { position: Mt, computedArrowPosition: r.computedArrowPosition, hadValidBounds: r.hadValidBounds, elementIdentity: n };
    let g = i2.x + i2.width / 2, _2 = e.mouseX ?? g, y2 = i2.y + i2.height, x2 = i2.y, S2 = e.hideArrow ? 0 : Oe2(v()), C2 = _2, w2 = 0, T = y2 + S2 + 4, E2 = C2 - a3 / 2, D3 = C2 + a3 / 2;
    D3 > m2 - 8 && (w2 = m2 - 8 - D3), E2 + w2 < d + 8 && (w2 = d + 8 - E2);
    let O3 = o3 + S2 + 4, k3 = T + o3 <= h - 8;
    k3 || (T = x2 - O3), T < p + 8 && (T = p + 8);
    let A2 = a3 / 2, j3 = A2 - w2, M2 = Math.min(16, A2), N3 = Math.max(a3 - 16, A2), P2 = Math.max(M2, Math.min(N3, j3)) - A2;
    return { position: { left: C2, top: T, arrowLeftPercent: 50, arrowLeftOffset: P2, edgeOffsetX: w2 }, computedArrowPosition: k3 ? `bottom` : `top`, hadValidBounds: true, elementIdentity: n };
  }, { position: Mt, computedArrowPosition: null, hadValidBounds: false, elementIdentity: `` }), R = () => L().computedArrowPosition ?? `bottom`, te2 = () => L().hadValidBounds;
  O(N(() => e.selectionLabelShakeCount, () => D2(true), { defer: true }));
  let ne3 = (t3) => {
    if (ke2(t3)) return;
    t3.stopImmediatePropagation();
    let n = t3.code === `Enter` && !t3.shiftKey, r = t3.code === `Escape`;
    n ? (t3.preventDefault(), e.onSubmit?.()) : r && (t3.preventDefault(), e.onConfirmDismiss?.());
  }, re2 = (t3) => {
    let n = t3.target;
    n instanceof HTMLTextAreaElement && (Ee(n, 95), e.onInputChange?.(n.value));
  }, z = () => Y2({ tagName: e.tagName, componentName: e.componentName, elementsCount: e.elementsCount }), B = k(() => !(e.error || e.discardPrompt || O2() && e.isPromptMode)), V = (t3) => {
    t3.stopImmediatePropagation(), e.filePath && e.onOpen && e.onOpen();
  }, ae2 = (t3) => {
    t3.stopImmediatePropagation(), O2() && e.isPromptMode && !e.discardPrompt && e.onSubmit && a2 && De2(a2, { preventScroll: true });
  }, oe2 = () => te2() && (k2() || e.status === `error`);
  return Se(Oe, { get when() {
    return Ie2(() => e.visible !== false)() && (e.selectionBounds || oe2());
  }, get children() {
    var r = jt();
    r.addEventListener(`mouseleave`, () => e.onHoverChange?.(false)), r.addEventListener(`mouseenter`, () => e.onHoverChange?.(true)), r.$$click = (e2) => {
      e2.stopImmediatePropagation();
    }, r.$$pointerdown = ae2;
    var o3 = t2;
    return typeof o3 == `function` ? Xe(o3, r) : t2 = r, Je(r, `z-index`, `${m}`), Je(r, `transition`, `opacity 125ms ease-out, filter 125ms ease-out`), Ze(r, Se(Oe, { get when() {
      return !e.hideArrow;
    }, get children() {
      return Se(Ie3, { get position() {
        return R();
      }, get leftPercent() {
        return L().position.arrowLeftPercent;
      }, get leftOffsetPx() {
        return L().position.arrowLeftOffset;
      }, get labelWidth() {
        return v();
      } });
    } }), null), Ze(r, Se(Oe, { get when() {
      return Ie2(() => !!k2())() && !e.error;
    }, get children() {
      return Se(Tt, { get statusText() {
        return e.statusText ?? `Copied`;
      }, get onDismiss() {
        return e.onDismiss;
      }, onFadingChange: C, get onShowContextMenu() {
        return e.onShowContextMenu;
      } });
    } }), null), Ze(r, Se(Je2, { ref: (e2) => i = e2, get shape() {
      return B() ? `pill` : `panel`;
    }, get class() {
      return J(`flex items-center gap-[5px] w-fit h-fit p-0`, w() && `animate-shake`);
    }, get style() {
      return { display: k2() && !e.error ? `none` : void 0 };
    }, onAnimationEnd: () => D2(false), get children() {
      return [Se(Oe, { get when() {
        return e.status === `copying`;
      }, get children() {
        var t3 = Et(), r2 = t3.firstChild, i2 = r2.firstChild, a3 = i2.firstChild;
        return Ze(r2, Se(Pe2, { size: 13, class: `text-[var(--rg-text-secondary)] shrink-0` }), i2), D(() => a3.data = e.statusText ?? `Grabbing…`), t3;
      } }), Se(Oe, { get when() {
        return Ie2(() => !!(O2() && !e.isPromptMode))() && !e.discardPrompt;
      }, get children() {
        var t3 = Dt(), n = t3.firstChild;
        return Ze(n, Se(He, { get tagName() {
          return z().tagName;
        }, get componentName() {
          return z().componentName;
        }, get isClickable() {
          return !!(e.filePath && e.onOpen);
        }, onClick: V, onHoverChange: M, shrink: true })), t3;
      } }), Se(Oe, { get when() {
        return Ie2(() => !!(O2() && e.isPromptMode))() && !e.discardPrompt;
      }, get children() {
        var t3 = At(), r2 = t3.firstChild;
        return Ze(r2, Se(He, { get tagName() {
          return z().tagName;
        }, get componentName() {
          return z().componentName;
        }, get isClickable() {
          return !!(e.filePath && e.onOpen);
        }, onClick: V, onHoverChange: M })), Ze(t3, Se(We2, { get children() {
          var t4 = kt(), r3 = t4.firstChild;
          return r3.$$keydown = ne3, r3.$$input = re2, Xe((t5) => {
            a2 = t5, e.onSubmit && queueMicrotask(() => {
              De2(t5, { preventScroll: true }), Ee(t5, 95);
            });
          }, r3), Je(r3, `max-height`, `95px`), Ze(t4, Se(Oe, { get when() {
            return e.onSubmit;
          }, get children() {
            var t5 = Ot();
            return t5.$$click = () => e.onSubmit?.(), Ze(t5, Se(Me, { size: 10, "aria-hidden": `true`, class: `text-[var(--rg-submit-fg)]` })), t5;
          } }), null), D(() => r3.readOnly = !e.onSubmit), D(() => r3.value = e.inputValue ?? ``), t4;
        } }), null), t3;
      } }), Se(Oe, { get when() {
        return e.discardPrompt;
      }, keyed: true, children: (e2) => Se(ct2, { get label() {
        return Ie2(() => !!e2.isKeyboardSelection)() ? `Discard selection?` : e2.label;
      }, get showCancel() {
        return !e2.isKeyboardSelection;
      }, get cancelOnEscape() {
        return e2.cancelOnEscape;
      }, get onConfirm() {
        return e2.onConfirm;
      }, get onCopy() {
        return e2.onCopy;
      }, onCancel: () => {
        e2.isKeyboardSelection || e2.onCancel?.(), De2(a2, { preventScroll: true });
      } }) }), Se(Oe, { get when() {
        return e.error;
      }, get children() {
        return Se(ht, { get error() {
          return e.error;
        }, get onAcknowledge() {
          return e.onAcknowledgeError;
        }, get onRetry() {
          return e.onRetry;
        } });
      } })];
    } }), null), D((t3) => {
      var n = `${L().position.top}px`, i2 = `${L().position.left}px`, a3 = `translateX(calc(-50% + ${L().position.edgeOffsetX}px))`, o4 = A() ? `auto` : `none`, s2 = e.status === `fading` || S() ? 0 : 1, c2 = `drop-shadow(${o}) blur(${e.status === `fading` || S() ? `3px` : `0`})`;
      return n !== t3.e && Je(r, `top`, t3.e = n), i2 !== t3.t && Je(r, `left`, t3.t = i2), a3 !== t3.a && Je(r, `transform`, t3.a = a3), o4 !== t3.o && Je(r, `pointer-events`, t3.o = o4), s2 !== t3.i && Je(r, `opacity`, t3.i = s2), c2 !== t3.n && Je(r, `filter`, t3.n = c2), t3;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }), r;
  } });
};
Ve([`pointerdown`, `click`, `input`, `keydown`]);
var Pt = Be(`<span style="transition-property:transform;transition-timing-function:cubic-bezier(0.32, 0.72, 0, 1)"><svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M20.8977 4.02356L21.8277 4.39121C22.3784 2.99813 21.0382 1.60206 19.6238 2.09546L3.47334 7.72936C1.38661 8.45728 1.49021 11.443 3.6224 12.0245L10.1289 13.799L11.2331 19.8724C11.638 22.0991 14.7072 22.4019 15.5393 20.2972L21.8277 4.39121L20.8977 4.02356Z">`);
var Ft = (e) => {
  let t2 = () => e.size ?? 14, r = () => e.rotationDeg ?? 0;
  return (() => {
    var i = Pt(), a2 = i.firstChild;
    return Je(i, `transition-duration`, `180ms`), D((n) => {
      var o2 = J(`inline-flex items-center justify-center will-change-transform`, e.class), s = `rotate(${r()}deg)`, c2 = t2(), l2 = t2();
      return o2 !== n.e && We(i, n.e = o2), s !== n.t && Je(i, `transform`, n.t = s), c2 !== n.a && Y(a2, `width`, n.a = c2), l2 !== n.o && Y(a2, `height`, n.o = l2), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0 }), i;
  })();
};
var It = Be(`<div> `);
var Lt = 0;
var Rt = () => Date.now() - Lt < 800;
var zt = (e) => {
  let [r, i] = E(false), [a2, o2] = E(true), s;
  O(N(() => e.visible, (e2) => {
    s !== void 0 && (clearTimeout(s), s = void 0), e2 ? Rt() ? (o2(false), i(true)) : (o2(true), s = setTimeout(() => {
      i(true);
    }, 400)) : (r() && (Lt = Date.now()), i(false));
  })), ne2(() => {
    s !== void 0 && clearTimeout(s), r() && (Lt = Date.now());
  });
  let l2 = () => e.position === `top` || e.position === `bottom` ? { left: `50%`, translate: `-50%`, "z-index": `${m}` } : { top: `50%`, translate: `0 -50%`, "z-index": `${m}` };
  return Se(Oe, { get when() {
    return r();
  }, get children() {
    var r2 = It(), i2 = r2.firstChild;
    return D((n) => {
      var o3 = J(`absolute whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-sans font-medium leading-4 pointer-events-none`, `bg-[var(--rg-panel-bg)] text-[var(--rg-text-primary)] [box-shadow:var(--rg-shadow)]`, e.position === `top` && `bottom-full mb-2.5`, e.position === `bottom` && `top-full mt-2.5`, e.position === `left` && `right-full mr-2.5`, e.position === `right` && `left-full ml-2.5`, a2() && `animate-tooltip-fade-in`), s2 = l2(), c2 = e.textContent;
      return o3 !== n.e && We(r2, n.e = o3), n.t = qe(r2, s2, n.t), c2 !== n.a && (i2.data = n.a = c2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r2;
  } });
};
var Bt = Be(`<div><button data-react-grab-ignore-events type=button>`);
var Vt = (e) => (() => {
  var t2 = Bt(), r = t2.firstChild;
  Ge(r, `mouseleave`, e.onMouseLeave), Ge(r, `mouseenter`, e.onMouseEnter), Ge(r, `contextmenu`, (t3) => e.onContextMenu?.(t3)), Ge(r, `click`, e.onClick, true);
  var i = e.ref;
  return typeof i == `function` ? Xe(i, r) : e.ref = r, Ze(r, () => e.icon), Ze(t2, Se(Oe, { get when() {
    return e.tooltip;
  }, children: (t3) => Se(zt, { get visible() {
    return !!e.tooltipVisible;
  }, get position() {
    return e.tooltipPosition ?? `top`;
  }, get textContent() {
    return t3();
  } }) }), null), D((n) => {
    var i2 = e.wrapperClass, a2 = e.isToggle ? `` : void 0, o2 = e.actionId, s = e.label, c2 = !!e.isActive, l2 = e.class;
    return i2 !== n.e && We(t2, n.e = i2), a2 !== n.t && Y(r, `data-react-grab-toolbar-toggle`, n.t = a2), o2 !== n.a && Y(r, `data-react-grab-toolbar-action`, n.a = o2), s !== n.o && Y(r, `aria-label`, n.o = s), c2 !== n.i && Y(r, `aria-pressed`, n.i = c2), l2 !== n.n && We(r, n.n = l2), n;
  }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }), t2;
})();
Ve([`click`]);
var Z = (e) => e === `top` || e === `bottom`;
var Ht = (e) => {
  let t2 = Z(e);
  return { width: t2 ? 30 : 16, height: t2 ? 16 : 30 };
};
var Ut = (e, t2, n, r) => {
  let i = q(), a2 = i.width, o2 = i.height, s = i.offsetLeft + 16, c2 = Math.max(s, i.offsetLeft + a2 - n - 16), l2 = i.offsetTop + 16, u = Math.max(l2, i.offsetTop + o2 - r - 16);
  if (Z(e)) {
    let r2 = Math.max(0, a2 - n - 32);
    return { x: Math.min(c2, Math.max(s, i.offsetLeft + 16 + r2 * t2)), y: e === `top` ? l2 : u };
  }
  let d = Math.max(0, o2 - r - 32), f = Math.min(u, Math.max(l2, i.offsetTop + 16 + d * t2));
  return { x: e === `left` ? s : c2, y: f };
};
var Wt = (e, t2, n, r, i) => {
  let a2 = q(), o2 = a2.width, s = a2.height;
  if (Z(e)) {
    let e2 = o2 - r - 32;
    return e2 <= 0 ? Te : Math.max(0, Math.min(1, (t2 - a2.offsetLeft - 16) / e2));
  }
  let c2 = s - i - 32;
  return c2 <= 0 ? Te : Math.max(0, Math.min(1, (n - a2.offsetTop - 16) / c2));
};
var Gt = (e, t2, n, r, i) => {
  let a2 = q(), o2 = a2.width, s = a2.height, { width: c2, height: l2 } = n, u;
  if (Z(t2)) {
    let n2 = (c2 - r) / 2;
    u = { x: dt(e.x - n2, a2.offsetLeft + 16, a2.offsetLeft + o2 - c2 - 16), y: t2 === `top` ? a2.offsetTop + 16 : a2.offsetTop + s - l2 - 16 };
  } else {
    let n2 = (l2 - i) / 2, r2 = dt(e.y - n2, a2.offsetTop + 16, a2.offsetTop + s - l2 - 16);
    u = { x: t2 === `left` ? a2.offsetLeft + 16 : a2.offsetLeft + o2 - c2 - 16, y: r2 };
  }
  let d = Wt(t2, u.x, u.y, c2, l2);
  return { position: u, ratio: d };
};
var Kt = (e, t2, n, r) => {
  let i = q(), { width: a2, height: o2 } = n, { width: s, height: c2 } = r;
  switch (e) {
    case `top`:
    case `bottom`: {
      let n2 = (a2 - s) / 2;
      return { x: dt(t2.x + n2, i.offsetLeft, i.offsetLeft + i.width - s), y: e === `top` ? i.offsetTop : i.offsetTop + i.height - c2 };
    }
    case `left`:
    case `right`: {
      let n2 = (o2 - c2) / 2, r2 = dt(t2.y + n2, i.offsetTop, i.offsetTop + i.height - c2);
      return { x: e === `left` ? i.offsetLeft : i.offsetLeft + i.width - s, y: r2 };
    }
  }
};
var qt = (e, t2, n, r, i, a2) => {
  let o2 = q(), s = o2.width, c2 = o2.height, l2 = e + i * 150, u = t2 + a2 * 150, d = u - o2.offsetTop + r / 2, f = o2.offsetTop + c2 - u - r / 2, p = l2 - o2.offsetLeft + n / 2, m2 = o2.offsetLeft + s - l2 - n / 2, h = Math.min(d, f, p, m2), g = (e2) => dt(e2, o2.offsetLeft + 16, o2.offsetLeft + s - n - 16), _ = (e2) => dt(e2, o2.offsetTop + 16, o2.offsetTop + c2 - r - 16);
  return h === d ? { edge: `top`, x: g(l2), y: o2.offsetTop + 16 } : h === p ? { edge: `left`, x: o2.offsetLeft + 16, y: _(u) } : h === m2 ? { edge: `right`, x: o2.offsetLeft + s - n - 16, y: _(u) } : { edge: `bottom`, x: g(l2), y: o2.offsetTop + c2 - r - 16 };
};
var Jt = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L12.5858 12L9.29289 8.70711C8.90237 8.31658 8.90237 7.68342 9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C14.8946 11.4804 15 11.7348 15 12C15 12.2652 14.8946 12.5196 14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071Z">`);
var Yt = (e) => {
  let t2 = () => e.size ?? 14;
  return (() => {
    var r = Jt();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var Xt = Be(`<div data-react-grab-toolbar-panel><div><div><div></div></div></div><button data-react-grab-ignore-events data-react-grab-toolbar-collapse type=button class="group contain-layout shrink-0 flex items-center justify-center cursor-pointer interactive-scale a11y-hitbox">`);
var Zt = (e) => {
  let t2 = () => e.snapEdge ?? `bottom`, r = () => !Z(t2()), i = () => e.isCollapsed ? `duration-140` : `duration-220`, a2 = () => r() ? `transition-[grid-template-rows] ${i()} ease-drawer` : `transition-[grid-template-columns] ${i()} ease-drawer`, o2 = () => r() ? `min-h-0` : `min-w-0`, s = () => e.isCollapsed ? `${{ top: `rounded-t-none rounded-b-[10px]`, bottom: `rounded-b-none rounded-t-[10px]`, left: `rounded-l-none rounded-r-[10px]`, right: `rounded-r-none rounded-l-[10px]` }[t2()]} ${r() ? `px-0.25 py-2` : `px-2 py-0.25`}` : ``, c2 = () => {
    let n = e.isCollapsed;
    switch (t2()) {
      case `top`:
        return n ? `rotate-90` : `-rotate-90`;
      case `bottom`:
        return n ? `-rotate-90` : `rotate-90`;
      case `left`:
        return n ? `rotate-0` : `rotate-180`;
      case `right`:
        return n ? `rotate-180` : `rotate-0`;
      default:
        return `-rotate-90`;
    }
  }, l2 = () => {
    if (e.isChevronPressed) return r() ? `scale(0.97, 1)` : `scale(1, 0.97)`;
  }, u = () => e.isChevronPressed ? `transition-[padding,border-radius,transform] duration-60 ease-[cubic-bezier(0,0,0.2,1)]` : `transition-[padding,border-radius,transform] ${i()} ease-drawer`;
  return (() => {
    var t3 = Xt(), i2 = t3.firstChild, d = i2.firstChild, f = d.firstChild, p = i2.nextSibling;
    return Ge(t3, `click`, e.onPanelClick, true), Ge(t3, `animationend`, e.onAnimationEnd), Ze(f, () => e.actionButtons), Ge(p, `pointercancel`, e.onCollapsePointerLeave), Ge(p, `pointerleave`, e.onCollapsePointerLeave), Ge(p, `pointerup`, e.onCollapsePointerUp, true), Ge(p, `pointerdown`, e.onCollapsePointerDown), Ge(p, `click`, e.onCollapseClick, true), Ze(p, Se(Yt, { size: 18, get class() {
      return J(`text-[var(--rg-text-secondary)] group-hover:text-[var(--rg-text-primary)] transition-[transform,color] duration-150 ease-drawer -m-0.5`, c2());
    } })), D((n) => {
      var c3 = J(`flex items-center justify-center rounded-[13px] antialiased relative overflow-visible [font-synthesis:none]`, u(), r() && `flex-col`, `bg-[var(--rg-panel-bg)] [box-shadow:var(--rg-shadow)]`, !e.isCollapsed && (r() ? `px-1.5 gap-0 py-2` : `py-1.5 gap-0 px-2`), s(), e.isShaking && (r() ? `animate-shake-vertical` : `animate-shake`)), m2 = e.transformOrigin, h = l2(), g = J(`grid relative overflow-visible`, a2(), e.isCollapsed ? r() ? `grid-rows-[0fr] pointer-events-none` : `grid-cols-[0fr] pointer-events-none` : r() ? `grid-rows-[1fr]` : `grid-cols-[1fr]`), _ = J(`flex`, r() ? `flex-col items-center min-h-0` : `items-center min-w-0`, e.isCollapsed ? `opacity-0` : `opacity-100`, e.isCollapsed ? `transition-opacity duration-100 ease-drawer` : `transition-opacity duration-180 ease-drawer delay-[80ms]`), y = J(`relative overflow-visible flex`, r() ? `flex-col items-center` : `items-center`, o2()), b = e.isCollapsed ? `Expand toolbar` : `Collapse toolbar`, x = !e.isCollapsed;
      return c3 !== n.e && We(t3, n.e = c3), m2 !== n.t && Je(t3, `transform-origin`, n.t = m2), h !== n.a && Je(t3, `transform`, n.a = h), g !== n.o && We(i2, n.o = g), _ !== n.i && We(d, n.i = _), y !== n.n && We(f, n.n = y), b !== n.s && Y(p, `aria-label`, n.s = b), x !== n.h && Y(p, `aria-expanded`, n.h = x), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0, s: void 0, h: void 0 }), t3;
  })();
};
Ve([`click`, `pointerup`]);
var Qt = (e) => {
  let [t2, n] = E(false), [r, i] = E(false), [a2, o2] = E(false), [s, c2] = E({ x: 0, y: 0 }), l2 = { x: 0, y: 0 }, u = { x: 0, y: 0, time: 0 }, f = { x: 0, y: 0 }, p = false, m2, g, _ = null, v = () => {
    _?.abort(), _ = null;
  }, y = () => {
    m2 !== void 0 && (Cn(m2), m2 = void 0);
  }, b = (t3) => {
    if (!a2()) {
      if (Math.hypot(t3.clientX - f.x, t3.clientY - f.y) <= 5) return;
      o2(true), e.onDragStart();
    }
    let n2 = performance.now(), r2 = n2 - u.time;
    r2 > 0 && c2({ x: (t3.clientX - u.x) / r2, y: (t3.clientY - u.y) / r2 }), u = { x: t3.clientX, y: t3.clientY, time: n2 };
    let i2 = t3.clientX - l2.x, s2 = t3.clientY - l2.y;
    e.onPositionUpdate({ x: i2, y: s2 });
  }, x = () => {
    v();
    let t3 = a2();
    if (n(false), !t3) return;
    p = true;
    let r2 = e.getContainerRef(), o3 = r2?.getBoundingClientRect();
    if (!o3) return;
    let c3 = s(), l3 = qt(o3.left, o3.top, o3.width, o3.height, c3.x, c3.y), u2 = Wt(l3.edge, l3.x, l3.y, o3.width, o3.height);
    e.onSnapEdgeChange(l3.edge, u2), i(true), y(), m2 = Sn(() => {
      let t4 = r2?.getBoundingClientRect(), n2 = t4 ? { width: t4.width, height: t4.height } : e.getExpandedDimensions();
      m2 = Sn(() => {
        m2 = void 0;
        let t5 = Ut(l3.edge, u2, n2.width, n2.height);
        e.onSnapComplete({ edge: l3.edge, ratio: u2, position: t5, expandedDimensions: n2 }), g = setTimeout(() => {
          i(false), e.onSnapAnimationEnd?.();
        }, 300);
      });
    });
  }, S = vn((t3) => {
    if (t3.button !== 0 || e.isCollapsed() || r()) return;
    let i2 = e.getContainerRef()?.getBoundingClientRect();
    if (!i2) return;
    f = { x: t3.clientX, y: t3.clientY }, l2 = { x: t3.clientX - i2.left, y: t3.clientY - i2.top }, n(true), o2(false), c2({ x: 0, y: 0 }), u = { x: t3.clientX, y: t3.clientY, time: performance.now() }, v(), _ = new AbortController();
    let { signal: a3 } = _;
    window.addEventListener(`pointermove`, b, { signal: a3 }), window.addEventListener(`pointerup`, x, { signal: a3 }), window.addEventListener(`pointercancel`, x, { signal: a3 });
  });
  return ne2(() => {
    v(), y(), clearTimeout(g);
  }), { isDragging: t2, isSnapping: r, handlePointerDown: S, createDragAwareHandler: (e2) => (t3) => {
    if (t3.stopImmediatePropagation(), p) {
      p = false;
      return;
    }
    e2();
  } };
};
var $t = (e, t2) => {
  let n = t2 - e;
  return e + (n - Math.round(n / 360) * 360);
};
var en = Be(`<div data-react-grab-ignore-events data-react-grab-toolbar>`);
var tn = (e) => {
  let t2, a2, o2 = null, s = gt(), [l2, u] = E(false), [f, v] = E(false), [y, b] = E(false), [x, S] = E(s?.edge ?? `bottom`), [E2, D2] = E(s?.ratio ?? 0.5), [O2, k2] = E({ x: 0, y: 0 }), [j2, M] = E(false), [N2, F2] = E(false), [L, te2] = E(false), [ne3, re2] = E(false), [ie, z] = E(0), [V, ae2] = E(null), oe2 = () => {
    o2?.(), o2 = null, e.isActive || ja();
  }, H = Qt({ getContainerRef: () => t2, isCollapsed: f, getExpandedDimensions: () => G2, onDragStart: () => {
    ae2(null), o2 && oe2();
  }, onPositionUpdate: (e2) => k2(e2), onSnapEdgeChange: (e2, t3) => {
    Se3(x(), e2), S(e2), D2(t3);
  }, onSnapComplete: (e2) => {
    G2 = e2.expandedDimensions, k2(e2.position), Le2({ edge: e2.edge, ratio: e2.ratio, collapsed: f(), enabled: !f() });
  } }), se2 = () => !Z(x()), ce3 = () => se2() ? `mb-1.5` : `mr-1.5`, U = () => e.defaultActionId ?? `copy`, fe = () => e.defaultActionLabel ?? `Copy`, W = () => !!e.isActive && (e.activeActionId ?? `copy`) === U(), pe = (t3) => V() === t3 && !e.isActive && !f() && !H.isDragging() && !H.isSnapping() && !e.isContextMenuOpen, me = () => {
    switch (x()) {
      case `top`:
        return `bottom`;
      case `bottom`:
        return `top`;
      case `left`:
        return `right`;
      case `right`:
        return `left`;
      default:
        return `top`;
    }
  }, ge = (e2) => {
    e2.stopImmediatePropagation();
  }, ye = (t3) => ({ onMouseEnter: (e2) => {
    H.isDragging() || (ae2(t3()), o2 || (o2 = go(), Aa(e2.clientX, e2.clientY)));
  }, onMouseLeave: () => {
    let n = t3();
    ae2((e2) => e2 === n ? null : e2), !e.isActive && !e.isContextMenuOpen && oe2();
  } });
  O(N(() => e.shakeCount, (t3) => {
    t3 && !e.enabled && M(true);
  })), O(N(() => [e.isActive, e.isContextMenuOpen], ([e2, t3]) => {
    !e2 && !t3 && o2 && oe2();
  })), O(N(() => W(), (e2) => {
    if (!e2) {
      z((e3) => $t(e3, 0));
      return;
    }
    let t3 = null, n = 0, r = 0, i = () => {
      if (t3 = null, !a2) return;
      let e3 = a2.getBoundingClientRect(), i2 = e3.left + e3.width / 2, o4 = e3.top + e3.height / 2, s2 = n - i2, c2 = r - o4;
      if (Math.hypot(s2, c2) < 4) return;
      let l3 = Math.atan2(c2, s2) * 180 / Math.PI - -45;
      z((e4) => $t(e4, l3));
    }, o3 = vn((e3) => {
      n = e3.clientX, r = e3.clientY, t3 === null && (t3 = Sn(i));
    });
    window.addEventListener(`pointermove`, o3, { passive: true }), ne2(() => {
      window.removeEventListener(`pointermove`, o3), t3 !== null && Cn(t3);
    });
  }));
  let G2 = { width: 38, height: 28 }, [be2, xe2] = E(Ht(x())), Se3 = (e2, t3) => {
    Z(e2) !== Z(t3) && xe2(Ht(t3));
  }, K2 = (e2, n) => {
    let r = t2?.getBoundingClientRect(), i = Ht(n);
    return Gt(e2, n, G2, r?.width ?? i.width, r?.height ?? i.height);
  }, Ce2 = () => {
    k2(Ut(x(), E2(), G2.width, G2.height));
  }, we3 = H.createDragAwareHandler(() => e.onToggle?.()), Te4 = () => J(`relative contain-layout flex items-center justify-center`, ce3()), Ee2 = (e2) => e2 ? `text-[var(--rg-text-primary)]` : `text-[var(--rg-text-secondary)] group-hover:text-[var(--rg-text-primary)]`, De3 = H.createDragAwareHandler(() => {
    if (f()) {
      Ne3();
      return;
    }
    let e2 = t2?.getBoundingClientRect(), n = E2();
    e2 && (G2 = { width: e2.width, height: e2.height }), F2(true), v(true), Le2({ edge: x(), ratio: n, collapsed: true, enabled: false }), Me2();
  }), Oe3 = () => Kt(x(), O2(), G2, be2()), ke3, Ae2, Y3 = null, je2 = () => {
    let e2 = t2?.getBoundingClientRect();
    !e2 || e2.width === 0 || e2.height === 0 || (f() ? xe2({ width: e2.width, height: e2.height }) : (G2 = { width: e2.width, height: e2.height }, Y3 = { width: e2.width, height: e2.height }));
  }, Me2 = () => {
    Ae2 && clearTimeout(Ae2), Ae2 = setTimeout(() => {
      F2(false), je2();
    }, 260);
  }, Ne3 = () => {
    let { position: e2, ratio: t3 } = K2(Re2(), x());
    k2(e2), D2(t3), F2(true), v(false), Le2({ edge: x(), ratio: t3, collapsed: false, enabled: true }), Me2();
  }, Pe3 = (e2, t3) => {
    if (!(e2 === 0 || t3 === 0) && !(H.isDragging() || H.isSnapping()) && !N2()) {
      if (f()) {
        let n = be2();
        if (n.width === e2 && n.height === t3) return;
        xe2({ width: e2, height: t3 });
        return;
      }
      Y3 && Y3.width === e2 && Y3.height === t3 || (Y3 = { width: e2, height: t3 }, G2 = { width: e2, height: t3 }, k2(Ut(x(), E2(), e2, t3)));
    }
  }, Fe2 = null, Ie4 = () => {
    H.isDragging() || H.isSnapping() || Fe2 === null && (Fe2 = Sn(() => {
      Fe2 = null, Ce2();
    }));
  }, X2 = () => {
    H.isDragging() || (b(true), Ce2(), ke3 && clearTimeout(ke3), ke3 = setTimeout(() => {
      b(false);
      let e2 = Wt(x(), O2().x, O2().y, G2.width, G2.height);
      D2(e2), Le2({ edge: x(), ratio: e2, collapsed: f(), enabled: !f() });
    }, 500));
  }, Le2 = (t3) => {
    let n = { ...t3, defaultAction: U() };
    _t(n), e.onStateChange?.(n);
  };
  P(() => {
    t2 && e.onContainerRef?.(t2);
    let n = t2?.getBoundingClientRect(), r = q(), i = !!(n && n.width > 0 && n.height > 0);
    s ? (i && n && (G2 = { width: n.width, height: n.height }), v(s.collapsed), k2(Ut(s.edge, s.ratio, G2.width, G2.height))) : i && n ? (G2 = { width: n.width, height: n.height }, k2({ x: r.offsetLeft + (r.width - n.width) / 2, y: r.offsetTop + r.height - n.height - 16 }), D2(Te)) : (k2(Ut(`bottom`, Te, G2.width, G2.height)), D2(Te)), e.onSubscribeToStateChanges && ne2(e.onSubscribeToStateChanges((e2) => {
      if (N2() || !t2?.getBoundingClientRect()) return;
      let n2 = f() !== e2.collapsed;
      if (Se3(x(), e2.edge), S(e2.edge), n2 && !e2.collapsed) {
        let t3 = Re2();
        F2(true), v(e2.collapsed);
        let { position: n3, ratio: r2 } = K2(t3, e2.edge);
        k2(n3), D2(r2), Me2();
      } else n2 && (F2(true), Me2()), v(e2.collapsed), k2(Ut(e2.edge, e2.ratio, G2.width, G2.height)), D2(e2.ratio);
    })), window.addEventListener(`resize`, X2), window.visualViewport?.addEventListener(`resize`, X2), window.visualViewport?.addEventListener(`scroll`, X2);
    let a3 = _n();
    if (a3 && (window.addEventListener(`scroll`, Ie4, { passive: true, capture: true }), typeof ResizeObserver < `u`)) {
      let e2 = new ResizeObserver(Ie4);
      e2.observe(a3), ne2(() => e2.disconnect());
    }
    if (typeof ResizeObserver < `u` && t2) {
      let e2 = new ResizeObserver((e3) => {
        let n2 = e3[0];
        if (!n2) return;
        let r2 = n2.borderBoxSize?.[0], i2, a4;
        if (r2) i2 = r2.inlineSize, a4 = r2.blockSize;
        else {
          let e4 = t2?.getBoundingClientRect();
          if (!e4) return;
          i2 = e4.width, a4 = e4.height;
        }
        Pe3(i2, a4);
      });
      e2.observe(t2), ne2(() => e2.disconnect());
    }
    let o3 = setTimeout(() => {
      u(true);
    }, 500);
    ne2(() => {
      clearTimeout(o3);
    });
  }), ne2(() => {
    window.removeEventListener(`resize`, X2), window.visualViewport?.removeEventListener(`resize`, X2), window.visualViewport?.removeEventListener(`scroll`, X2), window.removeEventListener(`scroll`, Ie4, { capture: true }), Fe2 !== null && Cn(Fe2), clearTimeout(ke3), clearTimeout(Ae2), o2 && oe2();
  });
  let Re2 = () => f() ? Oe3() : O2(), ze2 = () => f() ? `cursor-pointer` : H.isDragging() ? `cursor-grabbing` : `cursor-grab`, Be3 = () => ne3() || !!e.isContextMenuOpen || H.isDragging() || H.isSnapping() || N2() || L(), Ve3 = () => !!e.isActive && !Be3(), He2 = () => y() || H.isDragging() ? `` : H.isSnapping() ? `transition-[transform,opacity] duration-300 ease-out` : N2() ? `transition-[transform,opacity] ${f() ? `duration-140` : `duration-220`} ease-drawer` : `transition-[transform,opacity] duration-400 ease-drawer`, Ue2 = () => {
    switch (x()) {
      case `top`:
        return `center top`;
      case `bottom`:
        return `center bottom`;
      case `left`:
        return `left center`;
      case `right`:
        return `right center`;
      default:
        return `center center`;
    }
  };
  return (() => {
    var r = en();
    r.addEventListener(`mouseleave`, () => {
      re2(false), e.onSelectHoverChange?.(false);
    }), r.addEventListener(`mouseenter`, () => {
      re2(true), f() || e.onSelectHoverChange?.(true);
    }), Ge(r, `mousedown`, ge), Ge(r, `pointerdown`, (e2) => {
      ge(e2), H.handlePointerDown(e2);
    });
    var o3 = t2;
    return typeof o3 == `function` ? Xe(o3, r) : t2 = r, Ze(r, Se(Zt, { get isCollapsed() {
      return f();
    }, get snapEdge() {
      return x();
    }, get isShaking() {
      return j2();
    }, get isChevronPressed() {
      return L();
    }, get transformOrigin() {
      return Ue2();
    }, onAnimationEnd: () => M(false), onCollapseClick: De3, onCollapsePointerDown: () => te2(true), onCollapsePointerUp: () => te2(false), onCollapsePointerLeave: () => te2(false), onPanelClick: (e2) => {
      f() && (e2.stopPropagation(), Ne3());
    }, get actionButtons() {
      return Se(Vt, we({ get actionId() {
        return U();
      }, isToggle: true, ref: (e2) => a2 = e2, get label() {
        return Ie2(() => !!W())() ? `Stop selecting element` : `${fe()} element`;
      }, get isActive() {
        return W();
      }, class: `group contain-layout flex items-center justify-center cursor-pointer interactive-scale a11y-hitbox`, get wrapperClass() {
        return Te4();
      }, onClick: we3, onContextMenu: (t3) => {
        t3.preventDefault(), t3.stopPropagation(), ae2(null), e.onToggleToolbarMenu?.();
      } }, () => ye(U), { get icon() {
        return Se(Ft, { size: 14, get rotationDeg() {
          return ie();
        }, get class() {
          return Ee2(W());
        } });
      }, get tooltipVisible() {
        return pe(U());
      }, get tooltipPosition() {
        return me();
      }, get tooltip() {
        return fe();
      } }));
    } })), D((e2) => {
      var t3 = J(`fixed left-0 top-0 font-sans text-[13px] antialiased select-none`, ze2(), He2(), l2() ? `pointer-events-auto` : `pointer-events-none`), n = String(m), i = `translate(${Re2().x}px, ${Re2().y}px) scale(${Ve3() ? 0.97 : 1})`, a3 = Ue2(), o4 = l2() ? Ve3() ? 0.55 : 1 : 0;
      return t3 !== e2.e && We(r, e2.e = t3), n !== e2.t && Je(r, `z-index`, e2.t = n), i !== e2.a && Je(r, `transform`, e2.a = i), a3 !== e2.o && Je(r, `transform-origin`, e2.o = a3), o4 !== e2.i && Je(r, `opacity`, e2.i = o4), e2;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }), r;
  })();
};
var nn = ce2();
var rn = () => {
  let e = F(nn);
  if (!e) throw Error(`Menu subcomponents must be rendered inside <Menu.Provider>`);
  return e;
};
var an = (e) => Se(nn.Provider, { get value() {
  return e.store;
}, get children() {
  return e.children;
} });
var on = (e) => Se(Je2, { get class() {
  return J(`flex flex-col w-fit h-fit`, e.class);
}, get style() {
  return e.style;
}, get children() {
  return e.children;
} });
var sn = Be(`<div role=menu aria-orientation=vertical><div aria-hidden=true class="pointer-events-none absolute opacity-0 transition-[top,left,width,height,opacity,border-radius] duration-75 ease-out bg-[var(--rg-surface-hover)]">`);
var cn = (e) => {
  let t2 = rn();
  return (() => {
    var r = sn(), i = r.firstChild;
    r.$$pointermove = () => t2.notePointerMove(), Xe((n) => {
      t2.setHighlightContainer(n), e.ref?.(n);
    }, r);
    var a2 = t2.setHighlightRail;
    return typeof a2 == `function` ? Xe(a2, i) : t2.setHighlightRail = i, Ze(r, () => e.children, null), D((n) => {
      var i2 = e.label, a3 = t2.keyboardNavigation ? t2.activeDescendantId() : void 0, o2 = t2.keyboardNavigation ? -1 : void 0, s = J(`relative flex flex-col`, e.class);
      return i2 !== n.e && Y(r, `aria-label`, n.e = i2), a3 !== n.t && Y(r, `aria-activedescendant`, n.t = a3), o2 !== n.a && Y(r, `tabindex`, n.a = o2), s !== n.o && We(r, n.o = s), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0 }), r;
  })();
};
Ve([`pointermove`]);
var ln = Be(`<button data-react-grab-ignore-events type=button>`);
var un = (e) => {
  let t2 = rn(), i = t2.createItemId(), a2 = e.value, o2 = () => e.role ?? `menuitem`, s = () => !e.disabled, c2 = () => t2.activeValue() === a2, l2;
  return P(() => {
    l2 && (t2.registerItem({ value: a2, domId: i, element: l2, isEnabled: s, onSelect: () => e.onSelect?.() }), ne2(() => t2.unregisterItem(a2)));
  }), (() => {
    var r = ln();
    r.$$click = (t3) => {
      t3.stopPropagation(), s() && e.onSelect?.();
    }, r.addEventListener(`pointerleave`, () => {
      t2.clearActiveOnPointerLeave && t2.setActiveItem(null);
    }), r.addEventListener(`pointerenter`, () => {
      s() && t2.canActivateOnHover() && t2.setActiveItem(a2);
    }), r.$$pointerdown = (e2) => e2.stopPropagation();
    var u = l2;
    return typeof u == `function` ? Xe(u, r) : l2 = r, Y(r, `id`, i), Ze(r, () => e.children), D((n) => {
      var i2 = e.dataId ?? a2, s2 = o2(), l3 = o2() === `menuitemradio` ? !!e.checked : void 0, u2 = !!e.disabled, d = t2.keyboardNavigation ? c2() ? 0 : -1 : void 0, f = e.disabled, p = J(`relative z-1 contain-layout flex items-center justify-between w-full px-2 py-1 cursor-pointer text-left border-none bg-transparent disabled:opacity-40 disabled:cursor-default`, e.class);
      return i2 !== n.e && Y(r, `data-react-grab-menu-item`, n.e = i2), s2 !== n.t && Y(r, `role`, n.t = s2), l3 !== n.a && Y(r, `aria-checked`, n.a = l3), u2 !== n.o && Y(r, `aria-disabled`, n.o = u2), d !== n.i && Y(r, `tabindex`, n.i = d), f !== n.n && (r.disabled = n.n = f), p !== n.s && We(r, n.s = p), n;
    }, { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0, s: void 0 }), r;
  })();
};
Ve([`pointerdown`, `click`]);
var dn = Be(`<span> `);
var fn = (e) => (() => {
  var t2 = dn(), r = t2.firstChild;
  return D((n) => {
    var i = J(`text-[13px] leading-4 font-sans font-medium`, e.class), a2 = e.textContent;
    return i !== n.e && We(t2, n.e = i), a2 !== n.t && (r.data = n.t = a2), n;
  }, { e: void 0, t: void 0 }), t2;
})();
var pn = Be(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path fill-rule=evenodd clip-rule=evenodd d="M6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8V6.5C8 5.67157 7.32843 5 6.5 5ZM10 8V6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10H8V14H6.5C4.567 14 3 15.567 3 17.5C3 19.433 4.567 21 6.5 21C8.433 21 10 19.433 10 17.5V16H14V17.5C14 19.433 15.567 21 17.5 21C19.433 21 21 19.433 21 17.5C21 15.567 19.433 14 17.5 14H16V10H17.5C19.433 10 21 8.433 21 6.5C21 4.567 19.433 3 17.5 3C15.567 3 14 4.567 14 6.5V8H10ZM10 10V14H14V10H10ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16Z">`);
var mn = (e) => {
  let t2 = () => e.size ?? 11;
  return (() => {
    var r = pn();
    return D((n) => {
      var i = t2(), a2 = t2(), o2 = e.class;
      return i !== n.e && Y(r, `width`, n.e = i), a2 !== n.t && Y(r, `height`, n.t = a2), o2 !== n.a && Y(r, `class`, n.a = o2), n;
    }, { e: void 0, t: void 0, a: void 0 }), r;
  })();
};
var hn = Be(`<span> `);
var gn = Be(`<span style=display:inline-flex;align-items:center;gap:2px>`);
var _n2 = (e) => {
  let t2 = () => e.shortcut === `Enter`, r = () => e.modifier !== false, i = pt();
  return (() => {
    var a2 = gn();
    return Ze(a2, Se(Oe, { get when() {
      return t2();
    }, get children() {
      return Se($e, { size: 8 });
    } }), null), Ze(a2, Se(Oe, { get when() {
      return !t2();
    }, get children() {
      return Se(Oe, { get when() {
        return r();
      }, get fallback() {
        return (() => {
          var t3 = hn(), r2 = t3.firstChild;
          return D(() => r2.data = e.shortcut), t3;
        })();
      }, get children() {
        return Se(Oe, { when: i, get fallback() {
          return (() => {
            var t3 = hn(), r2 = t3.firstChild;
            return D(() => r2.data = `Ctrl+${e.shortcut}`), t3;
          })();
        }, get children() {
          return [Se(mn, { size: 9 }), (() => {
            var t3 = hn(), r2 = t3.firstChild;
            return D(() => r2.data = e.shortcut), t3;
          })()];
        } });
      } });
    } }), null), D(() => We(a2, e.class)), a2;
  })();
};
var vn2 = (e) => Se(_n2, { get shortcut() {
  return e.shortcut;
}, get modifier() {
  return e.modifier;
}, get class() {
  return J(`text-[11px] font-sans text-[var(--rg-text-secondary)] ml-4`, e.class);
} });
var yn = ({ hiddenOpacity: e = `0`, visibleOpacity: t2 = `1` } = {}) => {
  let n, r, i, a2 = (e2) => {
    r && (r.style.opacity = t2, r.style.top = `${e2.offsetTop}px`, r.style.left = `${e2.offsetLeft}px`, r.style.width = `${e2.offsetWidth}px`, r.style.height = `${e2.offsetHeight}px`);
  }, o2 = typeof ResizeObserver > `u` ? void 0 : new ResizeObserver(() => {
    i && a2(i);
  });
  ne2(() => o2?.disconnect());
  let s = () => {
    i = void 0, o2?.disconnect(), r && (r.style.opacity = e);
  };
  return { containerRef: (e2) => {
    n = e2;
  }, followerRef: (e2) => {
    r = e2;
  }, followElement: (e2) => {
    if (!(!r || !n)) {
      if (!e2) {
        s();
        return;
      }
      i = e2, a2(e2), o2?.disconnect(), o2?.observe(e2), o2?.observe(n);
    }
  }, hideFollower: s };
};
var bn = (e, t2) => e !== t2 && e instanceof HTMLElement;
var xn = (e, t2) => {
  let n = [];
  for (let r of Array.from(e.children)) bn(r, t2) && n.push(r);
  return n;
};
var Sn2 = (e = {}) => {
  let { topCornerRadiusPx: t2, bottomCornerRadiusPx: n, cornerShape: r } = e, i = t2 !== void 0 || n !== void 0, a2, o2 = false, s = (e2) => {
    if (!a2 || !i) return;
    let s2 = e2.parentElement;
    if (!s2) return;
    let c3 = xn(s2, a2), l3 = c3[0] === e2, u2 = c3[c3.length - 1] === e2, d2 = l3 && t2 !== void 0 ? `${t2}px` : `0px`, f = u2 && n !== void 0 ? `${n}px` : `0px`;
    a2.style.borderTopLeftRadius = d2, a2.style.borderTopRightRadius = d2, a2.style.borderBottomLeftRadius = f, a2.style.borderBottomRightRadius = f, r && !o2 && (a2.style.setProperty(`corner-shape`, r), o2 = true);
  }, { containerRef: c2, followerRef: l2, followElement: u, hideFollower: d } = yn();
  return { containerRef: c2, highlightRef: (e2) => {
    a2 = e2, o2 = false, l2(e2);
  }, updateHighlight: (e2) => {
    u(e2), e2 && s(e2);
  }, clearHighlight: d };
};
var Cn2 = (e = {}) => {
  let t2 = /* @__PURE__ */ new Map(), n = [], r = `react-grab-menu-${Math.random().toString(36).slice(2, 8)}`, i = 0, a2 = false, o2 = e.value !== void 0, [s, l2] = E(null), [f, p] = E(0), h = k(() => o2 ? e.value?.() ?? null : s()), g = (t3) => {
    if (o2) {
      e.onValueChange?.(t3);
      return;
    }
    l2(t3);
  }, _ = Sn2(e.highlight ?? {});
  O(N([h, f], ([e2]) => {
    if (e2 === null) {
      _.clearHighlight();
      return;
    }
    let n2 = t2.get(e2);
    n2 ? _.updateHighlight(n2.element) : _.clearHighlight();
  }));
  let v = () => n.filter((e2) => t2.get(e2)?.isEnabled()), y = () => {
    let e2 = v();
    e2.length > 0 && g(e2[0]);
  }, b = () => {
    let e2 = v();
    e2.length > 0 && g(e2[e2.length - 1]);
  }, x = () => {
    let e2 = v();
    if (e2.length === 0) return;
    let t3 = e2.indexOf(h() ?? ``);
    g(e2[t3 === -1 ? 0 : (t3 + 1) % e2.length]);
  }, S = () => {
    let e2 = v();
    if (e2.length === 0) return;
    let t3 = e2.indexOf(h() ?? ``);
    g(e2[t3 === -1 ? e2.length - 1 : (t3 - 1 + e2.length) % e2.length]);
  }, C = k(() => {
    f();
    let e2 = h();
    if (e2 !== null) return t2.get(e2)?.domId;
  });
  return { keyboardNavigation: e.keyboardNavigation ?? false, clearActiveOnPointerLeave: e.clearActiveOnPointerLeave ?? false, activeValue: h, activeDescendantId: C, setActiveItem: g, createItemId: () => `${r}-item-${i++}`, canActivateOnHover: () => !(e.requirePointerMove ?? false) || a2, notePointerMove: () => {
    a2 = true;
  }, resetPointerMove: () => {
    a2 = false;
  }, registerItem: (e2) => {
    t2.set(e2.value, e2), n.includes(e2.value) || n.push(e2.value), p((e3) => e3 + 1);
  }, unregisterItem: (e2) => {
    t2.delete(e2);
    let r2 = n.indexOf(e2);
    r2 !== -1 && n.splice(r2, 1), o2 || l2((t3) => t3 === e2 ? null : t3), p((e3) => e3 + 1);
  }, getActiveItem: () => {
    let e2 = h();
    return e2 === null ? void 0 : t2.get(e2);
  }, selectFirst: y, selectLast: b, selectNext: x, selectPrevious: S, setHighlightContainer: _.containerRef, setHighlightRail: _.highlightRef };
};
var Q = { Provider: an, Panel: on, List: cn, Item: un, Label: fn, Shortcut: vn2 };
var $ = (e) => {
  e.type === `contextmenu` && e.preventDefault(), e.stopImmediatePropagation();
};
var wn = (e) => {
  let t2 = vn((t3) => {
    e.isOpen() && (e.shouldIgnoreKeyboardEvent?.(t3) || e.shouldIgnoreInputEvents && ct(t3) || t3.code === `Escape` && (t3.preventDefault(), t3.stopImmediatePropagation(), e.onDismiss(`keyboard`)));
  }), n = vn((t3) => {
    e.isOpen() && (mt(t3, `data-react-grab-ignore-events`) || e.shouldIgnoreRightClick && t3 instanceof MouseEvent && t3.button === 2 || e.onDismiss(`pointer`));
  }), r = Sn(() => {
    window.addEventListener(`mousedown`, n, { capture: true }), window.addEventListener(`touchstart`, n, { capture: true });
  });
  return window.addEventListener(`keydown`, t2, { capture: true }), () => {
    Cn(r), window.removeEventListener(`keydown`, t2, { capture: true }), window.removeEventListener(`mousedown`, n, { capture: true }), window.removeEventListener(`touchstart`, n, { capture: true });
  };
};
var Tn = Be(`<div class="contain-layout shrink-0 flex items-center gap-1 pt-1.5 pb-1 w-fit h-fit px-2">`);
var En = Be(`<div data-react-grab-ignore-events data-react-grab-context-menu class="fixed font-sans text-[13px] antialiased [filter:var(--rg-drop-shadow)] select-none"style=pointer-events:auto>`);
var Dn = (e) => {
  let t2, i, a2 = null, o2 = Cn2({ keyboardNavigation: true, highlight: { bottomCornerRadiusPx: 14, cornerShape: ke } }), [s, f] = E(0), [_, v] = E(0), y = k(() => e.position !== null), b = k(() => Y2({ tagName: e.tagName, componentName: e.componentName })), x = () => {
    if (t2) {
      let e2 = t2.getBoundingClientRect();
      f(e2.width), v(e2.height);
    }
  };
  O(() => {
    y() && Sn(x);
  });
  let S = k(() => {
    let t3 = e.selectionBounds, n = e.position, r = s(), i2 = _();
    if (r === 0 || i2 === 0 || !t3 || !n) return { left: Ne.left, top: Ne.top, arrowLeft: 0, arrowPosition: `bottom` };
    let a3 = n.x ?? t3.x + t3.width / 2, o3 = Math.max(4, Math.min(a3 - r / 2, window.innerWidth - r - 4)), c2 = Math.max(8, Math.min(a3 - o3, r - 8)), l2 = t3.y + t3.height + 8 + 4, u = t3.y - i2 - 8 - 4, d = l2 + i2 > window.innerHeight, f2 = u >= 0, p = d && f2, m2 = p ? u : l2, h = p ? `top` : `bottom`;
    if (d && !f2) {
      let e2 = n.y ?? t3.y + t3.height / 2;
      m2 = Math.max(4, Math.min(e2 + 4, window.innerHeight - i2 - 4)), h = `top`;
    }
    return { left: o3, top: m2, arrowLeft: c2, arrowPosition: h };
  }), C = k(() => {
    let t3 = e.actions ?? [], n = e.actionContext;
    return t3.map((e2) => ({ id: e2.id, label: e2.label, action: () => {
      n && Ct(e2, n);
    }, enabled: St(e2, n), shortcut: e2.shortcut, shortcutModifier: e2.shortcutModifier }));
  });
  O(N(y, (e2) => {
    if (e2) {
      let e3 = t2?.getRootNode(), n2 = e3 instanceof ShadowRoot ? e3.activeElement : null, r = document.activeElement;
      a2 = r instanceof HTMLElement && n2 === null && !(t2 instanceof Element && t2.contains(r)) ? r : null, i?.focus({ preventScroll: true });
      return;
    }
    o2.setActiveItem(null);
    let n = a2;
    a2 = null, !(!(n instanceof HTMLElement) || !document.contains(n)) && Sn(() => {
      let e3 = document.activeElement;
      (e3 === null || e3 === document.body) && n.focus({ preventScroll: true });
    });
  })), P(() => {
    x();
    let t3 = (t4) => {
      if (!y()) return;
      let n2 = t4.key === `ArrowDown`, r2 = t4.key === `ArrowUp`, i2 = t4.key === `Home`, a3 = t4.key === `End`, s2 = t4.key === `Tab`;
      if (n2 || r2 || i2 || a3 || s2) {
        t4.preventDefault(), t4.stopPropagation();
        let e2 = n2 || s2 && !t4.shiftKey;
        i2 ? o2.selectFirst() : a3 ? o2.selectLast() : e2 ? o2.selectNext() : o2.selectPrevious();
        return;
      }
      let c2 = e.actions ?? [], l2 = e.actionContext, u = (n3) => {
        l2 && Ct(n3, l2) && (t4.preventDefault(), t4.stopPropagation(), e.onHide());
      };
      if (t4.key === `Enter`) {
        let e2 = o2.getActiveItem();
        if (e2) {
          t4.preventDefault(), t4.stopPropagation(), e2.isEnabled() && e2.onSelect();
          return;
        }
      }
      let d = bt(c2, t4, { includeModifierShortcuts: true });
      d && u(d);
    }, n = wn({ isOpen: y, onDismiss: e.onDismiss, shouldIgnoreRightClick: true }), r = vn(t3);
    window.addEventListener(`keydown`, r, { capture: true }), ne2(() => {
      n(), window.removeEventListener(`keydown`, r, { capture: true });
    });
  });
  let w = k(() => {
    let { tagName: e2, componentName: t3 } = b();
    return `Actions for ${t3 ? `${t3}.${e2}` : e2}`;
  });
  return Se(Oe, { get when() {
    return y();
  }, get children() {
    var r = En();
    Ge(r, `contextmenu`, $, true), Ge(r, `click`, $, true), Ge(r, `mousedown`, $, true), Ge(r, `pointerdown`, $, true);
    var a3 = t2;
    return typeof a3 == `function` ? Xe(a3, r) : t2 = r, Je(r, `z-index`, `${m}`), Ze(r, Se(Ie3, { get position() {
      return S().arrowPosition;
    }, leftPercent: 0, get leftOffsetPx() {
      return S().arrowLeft;
    } }), null), Ze(r, Se(Q.Panel, { class: `justify-center items-start min-w-[100px]`, get children() {
      return [(() => {
        var t3 = Tn();
        return Ze(t3, Se(He, { get tagName() {
          return b().tagName;
        }, get componentName() {
          return b().componentName;
        }, get isClickable() {
          return e.hasFilePath;
        }, onClick: (t4) => {
          if (t4.stopPropagation(), e.hasFilePath && e.actionContext) {
            let t5 = e.actions?.find((e2) => e2.id === `open`);
            t5 && Ct(t5, e.actionContext);
          }
        }, shrink: true })), t3;
      })(), Se(We2, { get children() {
        return Se(Q.Provider, { store: o2, get children() {
          return Se(Q.List, { ref: (e2) => i = e2, get label() {
            return w();
          }, class: `w-[calc(100%+16px)] -mx-2 -my-1.5 outline-none`, get children() {
            return Se(De, { get each() {
              return C();
            }, children: (t3) => Se(Q.Item, { get value() {
              return t3.id;
            }, get dataId() {
              return t3.label.toLowerCase();
            }, get disabled() {
              return !t3.enabled;
            }, onSelect: () => {
              t3.action(), e.onHide();
            }, get children() {
              return [Se(Q.Label, { class: `text-[var(--rg-text-primary)]`, get textContent() {
                return t3.label;
              } }), Se(Oe, { get when() {
                return t3.shortcut;
              }, children: (e2) => Se(Q.Shortcut, { get shortcut() {
                return e2();
              }, get modifier() {
                return t3.shortcutModifier;
              } }) })];
            } }) });
          } });
        } });
      } })];
    } }), null), D((e2) => {
      var t3 = `${S().top}px`, n = `${S().left}px`;
      return t3 !== e2.e && Je(r, `top`, e2.e = t3), n !== e2.t && Je(r, `left`, e2.t = n), e2;
    }, { e: void 0, t: void 0 }), r;
  } });
};
Ve([`pointerdown`, `mousedown`, `click`, `contextmenu`]);
var On = (e, t2, n, r) => Math.max(r, Math.min(e, n - t2 - r));
var kn = ({ anchor: e, measuredWidth: t2, measuredHeight: n, viewportLeft: r = 0, viewportTop: i = 0, viewportWidth: a2, viewportHeight: o2, anchorGapPx: s, viewportPaddingPx: c2, offscreenPosition: l2 }) => {
  if (!e || t2 === 0 || n === 0) return l2;
  let u, d;
  return e.edge === `left` || e.edge === `right` ? (u = e.edge === `left` ? e.x + s : e.x - t2 - s, d = e.y - n / 2) : (u = e.x - t2 / 2, d = e.edge === `top` ? e.y + s : e.y - n - s), { left: r + On(u - r, t2, a2, c2), top: i + On(d - i, n, o2, c2) };
};
var An = (t2, n) => {
  let [r, i] = E(0), [a2, o2] = E(0), [s, l2] = E(false), [f, p] = E(false), [m2, g] = E(0), [_, v] = E(`bottom`), y, b, x = () => {
    clearTimeout(y), b !== void 0 && (Cn(b), b = void 0);
  }, S = () => {
    let e = t2();
    e && (i(e.offsetWidth), o2(e.offsetHeight));
  }, C = () => {
    j(() => {
      g((e) => e + 1), S();
    });
  }, w = k(() => n() !== null);
  return O(() => {
    let e = n();
    e ? (v(e.edge), clearTimeout(y), l2(true), b !== void 0 && Cn(b), b = Sn(() => {
      S(), t2()?.offsetHeight, p(true);
    })) : (b !== void 0 && Cn(b), p(false), y = setTimeout(() => {
      l2(false);
    }, 120)), ne2(x);
  }), O(() => {
    if (!w()) return;
    window.addEventListener(`resize`, C), window.visualViewport?.addEventListener(`resize`, C), window.visualViewport?.addEventListener(`scroll`, C);
    let e = _n(), t3;
    e && typeof ResizeObserver < `u` && (t3 = new ResizeObserver(C), t3.observe(e)), ne2(() => {
      window.removeEventListener(`resize`, C), window.visualViewport?.removeEventListener(`resize`, C), window.visualViewport?.removeEventListener(`scroll`, C), t3?.disconnect();
    });
  }), { shouldMount: s, isAnimatedIn: f, lastAnchorEdge: _, displayPosition: k((e) => {
    m2();
    let t3 = q(), i2 = kn({ anchor: n(), measuredWidth: r(), measuredHeight: a2(), viewportLeft: t3.offsetLeft, viewportTop: t3.offsetTop, viewportWidth: t3.width, viewportHeight: t3.height, anchorGapPx: 8, viewportPaddingPx: 8, offscreenPosition: Ne });
    return i2.left === Ne.left ? e : i2;
  }, Ne), measure: S, clearAnimationHandles: x };
};
var jn = Be(`<div data-react-grab-ignore-events>`);
var Mn = (e) => {
  let t2, n = () => e.interactive !== false, a2 = An(() => t2, () => e.position);
  return P(() => {
    a2.measure();
    let t3 = e.onDismiss ? wn({ isOpen: () => !!e.position, onDismiss: e.onDismiss }) : void 0;
    ne2(() => {
      a2.clearAnimationHandles(), t3?.();
    });
  }), Se(Oe, { get when() {
    return a2.shouldMount();
  }, get children() {
    var r = jn(), o2 = t2;
    return typeof o2 == `function` ? Xe(o2, r) : t2 = r, Ye(r, we(() => ({ [e.dataAttribute]: `` }), { get class() {
      return J(`fixed font-sans text-[13px] antialiased [filter:var(--rg-drop-shadow)] select-none will-change-[opacity,transform]`, a2.isAnimatedIn() ? `transition-[opacity,transform] duration-220 ease-spring` : `transition-[opacity,transform] duration-120 ease-drawer`);
    }, get style() {
      return { top: `${a2.displayPosition().top}px`, left: `${a2.displayPosition().left}px`, "z-index": `${m}`, "pointer-events": n() && a2.isAnimatedIn() ? `auto` : `none`, "transform-origin": Pe[a2.lastAnchorEdge()], opacity: a2.isAnimatedIn() ? `1` : `0`, transform: a2.isAnimatedIn() ? `scale(1)` : `scale(0.92)` };
    }, onPointerDown: $, onMouseDown: $, onClick: $, onContextMenu: $ }), false, true), Ze(r, () => e.children), r;
  } });
};
var Nn = (e) => {
  let t2 = Cn2({ clearActiveOnPointerLeave: true, highlight: { topCornerRadiusPx: 14, bottomCornerRadiusPx: 14, cornerShape: ke } });
  return Se(Mn, { get position() {
    return e.position;
  }, dataAttribute: `data-react-grab-toolbar-menu`, get onDismiss() {
    return e.onDismiss;
  }, get children() {
    return Se(Q.Panel, { class: `overflow-hidden`, style: { "min-width": `100px` }, get children() {
      return Se(Q.Provider, { store: t2, get children() {
        return Se(Q.List, { label: `Default action`, get children() {
          return Se(De, { get each() {
            return e.actions;
          }, children: (t3) => {
            let n = () => t3.id === e.defaultActionId;
            return Se(Q.Item, { get value() {
              return t3.id;
            }, role: `menuitemradio`, get checked() {
              return n();
            }, onSelect: () => {
              e.onSetDefaultAction(t3.id), e.onDismiss();
            }, get children() {
              return [Se(Q.Label, { get class() {
                return n() ? `text-[var(--rg-text-primary)]` : `text-[var(--rg-text-secondary)]`;
              }, get textContent() {
                return t3.label;
              } }), Se(Oe, { get when() {
                return t3.shortcut;
              }, children: (e2) => Se(Q.Shortcut, { get shortcut() {
                return e2();
              }, get modifier() {
                return t3.shortcutModifier;
              } }) })];
            } });
          } });
        } });
      } });
    } });
  } });
};
var Pn = Be(`<span aria-hidden=true class="shrink-0 font-mono text-[11px] leading-4 text-[var(--rg-text-secondary)] opacity-60 mr-1"> `);
var Fn = Be(`<span> `);
var In = Be(`<span class=text-[var(--rg-text-secondary)]>.`);
var Ln = Be(`<span class="flex items-center min-w-0 w-full"><span class="text-[13px] leading-4 h-fit font-medium overflow-hidden text-ellipsis whitespace-nowrap min-w-0 transition-colors"><span> `);
var Rn = (e) => {
  let t2 = () => e.state?.activeIndex ?? 0, r = Cn2({ value: () => String(t2()), highlight: { topCornerRadiusPx: 14, bottomCornerRadiusPx: 14, cornerShape: ke } });
  return Se(Mn, { get position() {
    return e.position;
  }, dataAttribute: `data-react-grab-hierarchy-menu`, interactive: false, get children() {
    return Se(Q.Panel, { class: `overflow-hidden`, style: { "min-width": `160px` }, get children() {
      return Se(Q.Provider, { store: r, get children() {
        return Se(Q.List, { label: `Navigate element hierarchy`, get children() {
          return Se(De, { get each() {
            return e.state?.items ?? [];
          }, children: (e2, r2) => Se(Q.Item, { get value() {
            return String(r2());
          }, role: `menuitemradio`, get checked() {
            return r2() === t2();
          }, get children() {
            var i = Ln(), a2 = i.firstChild, o2 = a2.firstChild, s = o2.firstChild;
            return Ze(i, Se(Oe, { get when() {
              return e2.depth > 0;
            }, get children() {
              var t3 = Pn(), r3 = t3.firstChild;
              return D((n) => {
                var i2 = `${(e2.depth - 1) * 12}px`, a3 = e2.isLast ? `└─` : `├─`;
                return i2 !== n.e && Je(t3, `padding-left`, n.e = i2), a3 !== n.t && (r3.data = n.t = a3), n;
              }, { e: void 0, t: void 0 }), t3;
            } }), a2), Ze(a2, Se(Oe, { get when() {
              return e2.componentName;
            }, get children() {
              return [(() => {
                var t3 = Fn(), r3 = t3.firstChild;
                return D(() => r3.data = e2.componentName), t3;
              })(), In()];
            } }), o2), D((n) => {
              var i2 = r2() === t2(), o3 = r2() !== t2(), c2 = e2.tagName;
              return i2 !== n.e && a2.classList.toggle(`text-[var(--rg-text-primary)]`, n.e = i2), o3 !== n.t && a2.classList.toggle(`text-[var(--rg-text-secondary)]`, n.t = o3), c2 !== n.a && (s.data = n.a = c2), n;
            }, { e: void 0, t: void 0, a: void 0 }), i;
          } }) });
        } });
      } });
    } });
  } });
};
var zn = (e) => [Se(Ce, { get selectionVisible() {
  return e.selectionVisible;
}, get selectionBounds() {
  return e.selectionBounds;
}, get selectionBoundsMultiple() {
  return e.selectionBoundsMultiple;
}, get selectionShouldSnap() {
  return e.selectionShouldSnap;
}, get dragVisible() {
  return e.dragVisible;
}, get dragBounds() {
  return e.dragBounds;
}, get grabbedBoxes() {
  return e.grabbedBoxes;
}, get labelInstances() {
  return e.labelInstances;
} }), Se(Te3, { get visible() {
  return e.isFrozen ?? false;
} }), Se(Oe, { get when() {
  return Ie2(() => !!e.selectionLabelVisible)() && (e.frozenLabelEntryAccessors?.length ?? 0) > 0;
}, get children() {
  return Se(De, { get each() {
    return e.frozenLabelEntryAccessors ?? [];
  }, children: (e2) => Se(Oe, { get when() {
    return e2.read();
  }, children: (e3) => Se(Nt, { get tagName() {
    return e3().tagName;
  }, get componentName() {
    return e3().componentName;
  }, get selectionBounds() {
    return e3().bounds;
  }, get mouseX() {
    return e3().mouseX;
  }, visible: true }) }) });
} }), Se(Oe, { get when() {
  return Ie2(() => !!e.selectionLabelVisible)() && e.pendingShiftPreviewEntry;
}, children: (e2) => Se(Nt, { get tagName() {
  return e2().tagName;
}, get componentName() {
  return e2().componentName;
}, get selectionBounds() {
  return e2().bounds;
}, get mouseX() {
  return e2().mouseX;
}, visible: true }) }), Se(Oe, { get when() {
  return Ie2(() => !!(e.selectionLabelVisible && e.selectionBounds))() && (e.frozenLabelEntryAccessors?.length ?? 0) === 0;
}, get children() {
  return Se(Nt, { get tagName() {
    return e.selectionTagName;
  }, get componentName() {
    return e.selectionComponentName;
  }, get elementsCount() {
    return e.selectionElementsCount;
  }, get selectionBounds() {
    return e.selectionBounds;
  }, get mouseX() {
    return e.mouseX;
  }, get visible() {
    return e.selectionLabelVisible;
  }, get isPromptMode() {
    return e.isPromptMode;
  }, get inputValue() {
    return e.inputValue;
  }, get status() {
    return e.selectionLabelStatus;
  }, get filePath() {
    return e.selectionFilePath;
  }, get onInputChange() {
    return e.onInputChange;
  }, get onSubmit() {
    return e.onInputSubmit;
  }, get selectionLabelShakeCount() {
    return e.selectionLabelShakeCount;
  }, get onConfirmDismiss() {
    return e.onConfirmDismiss;
  }, get discardPrompt() {
    return e.discardPrompt;
  }, get onOpen() {
    return e.onOpenSelectionFile;
  } });
} }), Se(De, { get each() {
  return e.labelInstanceAccessors ?? [];
}, children: (t2) => Se(Oe, { get when() {
  return t2.read();
}, children: (t3) => Se(Nt, { get tagName() {
  return t3().tagName;
}, get componentName() {
  return t3().componentName;
}, get elementsCount() {
  return t3().elementsCount;
}, get selectionBounds() {
  return t3().bounds;
}, get mouseX() {
  return t3().mouseX;
}, visible: true, get status() {
  return t3().status;
}, get statusText() {
  return t3().statusText;
}, get isPromptMode() {
  return t3().isPromptMode;
}, get inputValue() {
  return t3().inputValue;
}, get error() {
  return t3().errorMessage;
}, get hideArrow() {
  return t3().hideArrow;
}, get onShowContextMenu() {
  let n = t3();
  if (!(!(n.status === `copied` || n.status === `fading`) || !at(n.element))) return () => e.onShowContextMenuInstance?.(n.id);
}, onRetry: () => e.onRetryInstance?.(t3().id), onAcknowledgeError: () => e.onAcknowledgeErrorInstance?.(t3().id), onHoverChange: (n) => e.onLabelInstanceHoverChange?.(t3().id, n) }) }) }), Se(Oe, { get when() {
  return e.toolbarVisible !== false;
}, get children() {
  return Se(tn, { get isActive() {
    return e.isActive;
  }, get isContextMenuOpen() {
    return e.contextMenuPosition !== null;
  }, get onToggle() {
    return e.onToggleActive;
  }, get activeActionId() {
    return e.activeActionId;
  }, get defaultActionId() {
    return e.defaultActionId;
  }, get defaultActionLabel() {
    return e.defaultActionLabel;
  }, get enabled() {
    return e.enabled;
  }, get shakeCount() {
    return e.shakeCount;
  }, get onStateChange() {
    return e.onToolbarStateChange;
  }, get onSubscribeToStateChanges() {
    return e.onSubscribeToToolbarStateChanges;
  }, get onSelectHoverChange() {
    return e.onToolbarSelectHoverChange;
  }, get onContainerRef() {
    return e.onToolbarRef;
  }, get onToggleToolbarMenu() {
    return e.onToggleToolbarMenu;
  } });
} }), Se(Dn, { get position() {
  return e.contextMenuPosition ?? null;
}, get selectionBounds() {
  return e.contextMenuBounds ?? null;
}, get tagName() {
  return e.contextMenuTagName;
}, get componentName() {
  return e.contextMenuComponentName;
}, get hasFilePath() {
  return e.contextMenuHasFilePath ?? false;
}, get actions() {
  return e.actions;
}, get actionContext() {
  return e.actionContext;
}, get onDismiss() {
  return e.onContextMenuDismiss ?? (() => {
  });
}, get onHide() {
  return e.onContextMenuHide ?? (() => {
  });
} }), Se(Nn, { get position() {
  return e.toolbarMenuPosition ?? null;
}, get actions() {
  return e.toolbarMenuActions ?? [];
}, get defaultActionId() {
  return e.defaultActionId ?? `copy`;
}, get onSetDefaultAction() {
  return e.onSetDefaultAction ?? (() => {
  });
}, get onDismiss() {
  return e.onToolbarMenuDismiss ?? (() => {
  });
} }), Se(Rn, { get position() {
  return e.hierarchyMenuPosition ?? null;
}, get state() {
  return e.hierarchyState;
} })];
export {
  zn as ReactGrabRenderer
};
//# sourceMappingURL=renderer-Ym7FGQIR-MHJ52X3R.js.map
