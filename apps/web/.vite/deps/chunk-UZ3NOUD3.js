import {
  C,
  E,
  He,
  Re,
  Ut,
  Yt,
  Zt,
  an,
  cn,
  d,
  ee,
  f,
  fe,
  h,
  he,
  i,
  lt,
  me,
  mt,
  on,
  p,
  pe,
  pn,
  rn,
  rt,
  u,
  vt,
  xt,
  y,
  yt
} from "./chunk-HNU6O7RQ.js";

// ../../node_modules/react-grab/dist/open-file-BYqKjxo7.js
var ce = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
var le = [`rsc://`, `file:///`, `webpack-internal://`, `webpack://`, `node:`, `turbopack://`, `metro://`, `/app-pages-browser/`, `/(app-pages-browser)/`];
var ue = [`rsc://`, `about://React/`];
var de = [`<anonymous>`, `eval`, ``];
var fe2 = /\.(jsx|tsx|ts|js)$/;
var pe2 = /(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i;
var me2 = /^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/;
var he2 = /\(at [^)]+\)$/;
var ge = [`react_stack_bottom_frame`, `react-stack-bottom-frame`];
var _e = /(^|@)\S+:\d+/;
var ve = /^\s*at .*(\S+:\d+|\(native\))/m;
var ye = /^(eval@)?(\[native code\])?$/;
var S = (e, t) => {
  if (t?.includeInElement !== false) {
    let n = e.split(`
`), r = [];
    for (let e2 of n) if (/^\s*at\s+/.test(e2)) {
      let t2 = Se(e2, void 0)[0];
      t2 && r.push(t2);
    } else if (/^\s*in\s+/.test(e2)) {
      let t2 = e2.replace(/^\s*in\s+/, ``).replace(/\s*\(at .*\)$/, ``);
      r.push({ functionName: t2, source: e2 });
    } else if (e2.match(_e)) {
      let t2 = Ce(e2, void 0)[0];
      t2 && r.push(t2);
    }
    return xe(r, t);
  }
  return e.match(ve) ? Se(e, t) : Ce(e, t);
};
var be = (e) => {
  if (!e.includes(`:`)) return [e, void 0, void 0];
  let t = e.startsWith(`(`) && /:\d+\)$/.test(e) ? e.slice(1, -1) : e, n = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);
  return n ? [n[1], n[2] || void 0, n[3] || void 0] : [t, void 0, void 0];
};
var xe = (e, t) => t && t.slice != null ? Array.isArray(t.slice) ? e.slice(t.slice[0], t.slice[1]) : e.slice(0, t.slice) : e;
var Se = (e, t) => xe(e.split(`
`).filter((e2) => !!e2.match(ve)), t).map((e2) => {
  let t2 = e2;
  t2.includes(`(eval `) && (t2 = t2.replace(/eval code/g, `eval`).replace(/(\(eval at [^()]*)|(,.*$)/g, ``));
  let n = t2.replace(/^\s+/, ``).replace(/\(eval code/g, `(`).replace(/^.*?\s+/, ``), r = n.match(/ (\(.+\)$)/);
  n = r ? n.replace(r[0], ``) : n;
  let i2 = be(r ? r[1] : n);
  return { functionName: r && n || void 0, fileName: [`eval`, `<anonymous>`].includes(i2[0]) ? void 0 : i2[0], lineNumber: i2[1] ? +i2[1] : void 0, columnNumber: i2[2] ? +i2[2] : void 0, source: t2 };
});
var Ce = (e, t) => xe(e.split(`
`).filter((e2) => !e2.match(ye)), t).map((e2) => {
  let t2 = e2;
  if (t2.includes(` > eval`) && (t2 = t2.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, `:$1`)), !t2.includes(`@`) && !t2.includes(`:`)) return { functionName: t2 };
  {
    let e3 = /(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/, n = t2.match(e3), r = n && n[1] ? n[1] : void 0, i2 = be(t2.replace(e3, ``));
    return { functionName: r, fileName: i2[0], lineNumber: i2[1] ? +i2[1] : void 0, columnNumber: i2[2] ? +i2[2] : void 0, source: t2 };
  }
});
var we = /* @__PURE__ */ new WeakMap();
var Te = (e) => ge.some((t) => e.includes(t));
var Ee = (e) => {
  let t = e.getFunctionName?.() ?? ``;
  if (t) return t;
  let n = e.getTypeName?.() ?? ``, r = e.getMethodName?.() ?? ``;
  return n && r ? `${n}.${r}` : r;
};
var De = (e) => {
  let t = [];
  for (let n = 1; n < e.length; n++) {
    let r = e[n], i2 = Ee(r);
    if (Te(i2)) return { frames: t, isTrusted: true };
    if (r.isNative?.()) {
      t.push({ functionName: i2 || void 0 });
      continue;
    }
    let a = r.getScriptNameOrSourceURL?.() ?? ``;
    !a && r.isEval?.() && (a = r.getEvalOrigin?.() ?? ``), t.push({ functionName: i2 && i2 !== `<anonymous>` ? i2 : void 0, fileName: a && a !== `<anonymous>` ? a : void 0, lineNumber: r.getLineNumber?.() ?? void 0, columnNumber: r.getColumnNumber?.() ?? void 0, enclosingLineNumber: r.getEnclosingLineNumber?.() ?? void 0, enclosingColumnNumber: r.getEnclosingColumnNumber?.() ?? void 0, source: `    at ${r.toString()}` });
  }
  return { frames: t, isTrusted: false };
};
var Oe = (e) => {
  let t = -1;
  for (let n of ge) if (t = e.indexOf(n), t !== -1) break;
  return { frames: S(t === -1 ? e : e.slice(0, e.lastIndexOf(`
`, t))).slice(1), isTrusted: t !== -1 };
};
var C2 = (e) => {
  let t = we.get(e);
  if (t) return t;
  let n = null, r = (e2, t2) => {
    n = De(t2);
    let r2 = `${e2.name || `Error`}: ${e2.message || ``}`;
    for (let e3 of t2) r2 += `
    at ${e3.toString()}`;
    return r2;
  }, i2 = Error.prepareStackTrace;
  Error.prepareStackTrace = r;
  let a;
  try {
    a = String(e.stack);
  } finally {
    Error.prepareStackTrace = i2;
  }
  let o = n ?? Oe(a);
  return we.set(e, o), o;
};
var ke = 44;
var Ae = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
var je = new Uint8Array(64);
var Me = new Uint8Array(128);
for (let e = 0; e < Ae.length; e++) {
  let t = Ae.charCodeAt(e);
  je[e] = t, Me[t] = e;
}
function w(e, t) {
  let n = 0, r = 0, i2 = 0;
  do
    i2 = Me[e.next()], n |= (i2 & 31) << r, r += 5;
  while (i2 & 32);
  let a = n & 1;
  return n >>>= 1, a && (n = -2147483648 | -n), t + n;
}
function Ne(e, t) {
  return e.pos >= t ? false : e.peek() !== ke;
}
var Pe = class {
  constructor(e) {
    this.pos = 0, this.buffer = e;
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(e) {
    let { buffer: t, pos: n } = this, r = t.indexOf(e, n);
    return r === -1 ? t.length : r;
  }
};
function Fe(e) {
  let { length: t } = e, n = new Pe(e), r = [], i2 = 0, a = 0, o = 0, s = 0, c = 0;
  do {
    let e2 = n.indexOf(`;`), t2 = [], l = true, u2 = 0;
    for (i2 = 0; n.pos < e2; ) {
      let r2;
      i2 = w(n, i2), i2 < u2 && (l = false), u2 = i2, Ne(n, e2) ? (a = w(n, a), o = w(n, o), s = w(n, s), Ne(n, e2) ? (c = w(n, c), r2 = [i2, a, o, s, c]) : r2 = [i2, a, o, s]) : r2 = [i2], t2.push(r2), n.pos++;
    }
    l || Ie(t2), r.push(t2), n.pos = e2 + 1;
  } while (n.pos <= t);
  return r;
}
function Ie(e) {
  e.sort(Le);
}
function Le(e, t) {
  return e[0] - t[0];
}
var Re2 = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
var ze = /^data:application\/json[^,]+base64,/;
var Be = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/;
var T = /* @__PURE__ */ new Map();
var E2 = /* @__PURE__ */ new Map();
var Ve = (e, t, n, r, i2) => {
  if (n < 0 || n >= e.length) return null;
  let a = e[n];
  if (!a || a.length === 0) return null;
  let o = null, s = 0, c = a.length - 1;
  for (; s <= c; ) {
    let e2 = s + c >> 1;
    a[e2][0] <= r ? (o = a[e2], s = e2 + 1) : c = e2 - 1;
  }
  if (!o || o.length < 4) return null;
  let [, l, u2, d2] = o;
  if (l === void 0 || u2 === void 0 || d2 === void 0) return null;
  let f2 = t[l];
  return f2 ? { columnNumber: d2, fileName: f2, lineNumber: u2 + 1, isIgnoreListed: i2?.has(l) ?? false } : null;
};
var He2 = (e, t, n) => {
  if (e.sections) {
    let r = t - 1, i2 = null;
    for (let t2 of e.sections) if (r > t2.offset.line || r === t2.offset.line && n >= t2.offset.column) i2 = t2;
    else break;
    if (!i2) return null;
    let a = r - i2.offset.line, o = r === i2.offset.line ? n - i2.offset.column : n;
    return Ve(i2.map.mappings, i2.map.sources, a, o, i2.map.ignoredSourceIndices);
  }
  return Ve(e.mappings, e.sources, t - 1, n, e.ignoredSourceIndices);
};
var Ue = (e, t) => {
  let n, r = t.length;
  for (; r > 0 && !n; ) {
    let e2 = t.lastIndexOf(`
`, r - 1) + 1, i3 = t.slice(e2, r).match(Be);
    i3 && (n = i3[1] || i3[2]), r = e2 - 1;
  }
  if (!n) return null;
  let i2 = Re2.test(n);
  if (!(ze.test(n) || i2 || n.startsWith(`/`))) {
    let t2 = e.split(`/`);
    t2[t2.length - 1] = n, n = t2.join(`/`);
  }
  return n;
};
var We = (e) => {
  let t = e.ignoreList ?? e.x_google_ignoreList;
  return Array.isArray(t) && t.length > 0 ? new Set(t) : void 0;
};
var Ge = (e) => ({ file: e.file, ignoredSourceIndices: We(e), mappings: Fe(e.mappings), names: e.names, sourceRoot: e.sourceRoot, sources: e.sources, sourcesContent: e.sourcesContent, version: 3 });
var Ke = (e) => {
  let t = e.sections.map(({ map: e2, offset: t2 }) => ({ map: { ...e2, ignoredSourceIndices: We(e2), mappings: Fe(e2.mappings) }, offset: t2 })), n = /* @__PURE__ */ new Set();
  for (let e2 of t) for (let t2 of e2.map.sources) n.add(t2);
  return { file: e.file, mappings: [], names: [], sections: t, sourceRoot: void 0, sources: Array.from(n), sourcesContent: void 0, version: 3 };
};
var qe = (e) => {
  if (!e) return false;
  let t = e.trim();
  if (!t) return false;
  let n = t.match(Re2);
  if (!n) return true;
  let r = n[0].toLowerCase();
  return r === `http:` || r === `https:`;
};
var Je = async (e, t = fetch) => {
  if (!qe(e)) return null;
  let n = await t(e);
  if (!n.ok) return null;
  let r = await n.text();
  if (!r) return null;
  let i2 = Ue(e, r);
  if (!i2 || !qe(i2) && !ze.test(i2)) return null;
  let a = await t(i2);
  if (!a.ok) return null;
  try {
    let e2 = await a.json();
    return `sections` in e2 ? Ke(e2) : Ge(e2);
  } catch {
    return null;
  }
};
var Ye = async (e, t = true, n) => {
  if (t && T.has(e)) return T.get(e) ?? null;
  let r = t ? E2.get(e) : void 0;
  if (r) return (await r).sourceMap;
  let i2 = Je(e, n).then((e2) => ({ sourceMap: e2, isTransientFailure: false }), () => ({ sourceMap: null, isTransientFailure: true }));
  t && E2.set(e, i2);
  let { sourceMap: a, isTransientFailure: o } = await i2;
  return t && (E2.delete(e), o || T.set(e, a)), a;
};
var D = async (e, t = true, n) => await Promise.all(e.map(async (e2) => {
  if (!e2.fileName) return e2;
  let r = await Ye(e2.fileName, t, n);
  if (!r || typeof e2.lineNumber != `number` || typeof e2.columnNumber != `number`) return e2;
  let i2 = He2(r, e2.lineNumber, e2.columnNumber);
  return i2 ? { ...e2, source: i2.fileName && e2.source ? e2.source.replace(e2.fileName, i2.fileName) : e2.source, fileName: i2.fileName, lineNumber: i2.lineNumber, columnNumber: i2.columnNumber, isIgnoreListed: i2.isIgnoreListed, isSymbolicated: true } : e2;
}));
var O = (e) => e._debugStack instanceof Error && typeof e._debugStack?.stack == `string`;
var Xe = (e) => typeof e.tag == `number`;
var Ze = (e) => e._debugOwner;
var Qe = (e) => {
  let t = null;
  if (mt(e, (n2) => {
    if (n2 === e) return false;
    let r2 = n2._debugOwner;
    return (r2 === e || e.alternate !== null && r2 === e.alternate) && n2._debugStack instanceof Error ? (t = n2._debugStack, true) : false;
  }), !t) return null;
  let { frames: n, isTrusted: r } = C2(t);
  if (!r) return null;
  for (let e2 = n.length - 1; e2 >= 0; e2--) {
    let t2 = n[e2];
    if (t2.fileName) return { ...t2, lineNumber: t2.enclosingLineNumber || t2.lineNumber, columnNumber: t2.enclosingColumnNumber || t2.columnNumber };
  }
  return null;
};
var $e = () => {
  let e = y();
  for (let t of [...Array.from(rt), ...Array.from(e.renderers.values())]) {
    let e2 = t.currentDispatcherRef;
    if (e2 && typeof e2 == `object`) return `H` in e2 ? e2.H : e2.current;
  }
  return null;
};
var et = (e) => {
  for (let t of rt) {
    let n = t.currentDispatcherRef;
    n && typeof n == `object` && (`H` in n ? n.H = e : n.current = e);
  }
};
var k = (e) => `
    in ${e}`;
var tt = (e, t) => {
  let n = k(e);
  return t && (n += ` (at ${t})`), n;
};
var A = false;
var nt = /* @__PURE__ */ new WeakMap();
var rt2 = (e, t) => {
  if (!e || A) return ``;
  let n = nt.get(e);
  if (n !== void 0) return n;
  let r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0, A = true;
  let i2 = $e();
  et(null);
  let a = console.error, o = console.warn;
  console.error = () => {
  }, console.warn = () => {
  };
  try {
    let n2 = { DetermineComponentFrameRoot() {
      let n3;
      try {
        if (t) {
          let t2 = function() {
            throw Error();
          };
          if (Object.defineProperty(t2.prototype, `props`, { set: function() {
            throw Error();
          } }), typeof Reflect == `object` && Reflect.construct) {
            try {
              Reflect.construct(t2, []);
            } catch (e2) {
              n3 = e2;
            }
            Reflect.construct(e, [], t2);
          } else {
            try {
              t2.call();
            } catch (e2) {
              n3 = e2;
            }
            e.call(t2.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (e2) {
            n3 = e2;
          }
          let t2 = e();
          t2 && typeof t2.catch == `function` && t2.catch(() => {
          });
        }
      } catch (e2) {
        if (e2 instanceof Error && n3 instanceof Error && typeof e2.stack == `string`) return [e2.stack, n3.stack];
      }
      return [null, null];
    } };
    n2.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`, Object.getOwnPropertyDescriptor(n2.DetermineComponentFrameRoot, `name`)?.configurable && Object.defineProperty(n2.DetermineComponentFrameRoot, `name`, { value: `DetermineComponentFrameRoot` });
    let [r2, i3] = n2.DetermineComponentFrameRoot();
    if (r2 && i3) {
      let t2 = r2.split(`
`), n3 = i3.split(`
`), a2 = 0, o2 = 0;
      for (; a2 < t2.length && !t2[a2].includes(`DetermineComponentFrameRoot`); ) a2++;
      for (; o2 < n3.length && !n3[o2].includes(`DetermineComponentFrameRoot`); ) o2++;
      if (a2 === t2.length || o2 === n3.length) for (a2 = t2.length - 1, o2 = n3.length - 1; a2 >= 1 && o2 >= 0 && t2[a2] !== n3[o2]; ) o2--;
      for (; a2 >= 1 && o2 >= 0; a2--, o2--) if (t2[a2] !== n3[o2]) {
        if (a2 !== 1 || o2 !== 1) do
          if (a2--, o2--, o2 < 0 || t2[a2] !== n3[o2]) {
            let n4 = `
${t2[a2].replace(` at new `, ` at `)}`, r3 = vt(e);
            return r3 && n4.includes(`<anonymous>`) && (n4 = n4.replace(`<anonymous>`, r3)), nt.set(e, n4), n4;
          }
        while (a2 >= 1 && o2 >= 0);
        break;
      }
    }
  } finally {
    A = false, Error.prepareStackTrace = r, et(i2), console.error = a, console.warn = o;
  }
  let s = e ? vt(e) : ``, c = s ? k(s) : ``;
  return nt.set(e, c), c;
};
var it = (e, t) => {
  let n = e.tag, r = ``;
  switch (n) {
    case 28:
      r = k(`Activity`);
      break;
    case 1:
      r = rt2(e.type, true);
      break;
    case 11:
      r = rt2(e.type.render, false);
      break;
    case 0:
    case 15:
      r = rt2(e.type, false);
      break;
    case 5:
    case 26:
    case 27:
      r = k(e.type);
      break;
    case 16:
      r = k(`Lazy`);
      break;
    case 13:
      r = e.child !== t && t !== null ? k(`Suspense Fallback`) : k(`Suspense`);
      break;
    case 19:
      r = k(`SuspenseList`);
      break;
    case 30:
      r = k(`ViewTransition`);
      break;
    default:
      return ``;
  }
  return r;
};
var at = (e) => {
  try {
    let t = ``, n = e, r = null;
    do {
      t += it(n, r);
      let e2 = n._debugInfo;
      if (e2 && Array.isArray(e2)) for (let n2 = e2.length - 1; n2 >= 0; n2--) {
        let r2 = e2[n2];
        typeof r2.name == `string` && (t += tt(r2.name, r2.env));
      }
      r = n, n = n.return;
    } while (n);
    return t;
  } catch (e2) {
    return e2 instanceof Error ? `
Error generating stack: ${e2.message}
${e2.stack}` : ``;
  }
};
var ot = (e) => {
  let t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  let n = e;
  if (!n) return ``;
  Error.prepareStackTrace = t, n.startsWith(`Error: react-stack-top-frame
`) && (n = n.slice(29));
  let r = n.indexOf(`
`);
  r !== -1 && (n = n.slice(r + 1));
  let i2 = Math.max(n.indexOf(`react_stack_bottom_frame`), n.indexOf(`react-stack-bottom-frame`));
  if (i2 !== -1 && (i2 = n.lastIndexOf(`
`, i2)), i2 !== -1) n = n.slice(0, i2);
  else return ``;
  return n;
};
var st = (e) => !!(e.functionName && e.fileName && dt(e.fileName));
var ct = (e, t) => e.fileName === t.fileName && e.lineNumber === t.lineNumber && e.columnNumber === t.columnNumber;
var lt2 = (e) => {
  let t = /* @__PURE__ */ new Map();
  for (let n of e) for (let e2 of n.stackFrames) {
    if (!st(e2)) continue;
    let n2 = e2.functionName, r = t.get(n2) ?? [];
    r.some((t2) => ct(t2, e2)) || (r.push(e2), t.set(n2, r));
  }
  return t;
};
var ut = (e, t, n) => {
  if (!e.functionName) return { ...e, isServer: true };
  let r = t.get(e.functionName);
  if (!r || r.length === 0) return { ...e, isServer: true };
  let i2 = n.get(e.functionName) ?? 0, a = r[i2 % r.length];
  return n.set(e.functionName, i2 + 1), { ...e, isServer: true, fileName: a.fileName, lineNumber: a.lineNumber, columnNumber: a.columnNumber, source: e.source?.replace(`(at Server)`, `(${a.fileName}:${a.lineNumber}:${a.columnNumber})`) };
};
var dt = (e) => ue.some((t) => e.startsWith(t));
var ft = (e) => !e.isServer && e.fileName && dt(e.fileName) ? { ...e, isServer: true } : e;
var pt = (e) => {
  let t = [], n = e;
  for (; n; ) if (Xe(n)) {
    let e2 = n;
    if (n = Ze(e2), n && O(e2)) {
      let { frames: n2, isTrusted: r } = C2(e2._debugStack);
      if (r) for (let e3 of n2) t.push(ft(e3));
    }
  } else {
    let e2 = n;
    if (n = e2.owner, n && e2.debugStack instanceof Error) for (let n2 of C2(e2.debugStack).frames) t.push({ ...n2, isServer: true });
  }
  return t;
};
var mt2 = (e) => {
  let t = [];
  return mt(e, (e2) => {
    if (!O(e2)) return;
    let n = typeof e2.type == `string` ? e2.type : vt(e2.type) || `<anonymous>`;
    t.push({ componentName: n, stackFrames: S(ot(e2._debugStack?.stack)) });
  }, true), t;
};
var ht = async (e, t = true, n) => {
  let r = mt2(e), i2 = S(at(e)), a = lt2(r), o = /* @__PURE__ */ new Map();
  return D(i2.map((e2) => (e2.source?.includes(`(at Server)`) ?? false) || e2.source != null && he2.test(e2.source) ? ut(e2, a, o) : e2).filter((e2, t2, n2) => {
    if (t2 === 0) return true;
    let r2 = n2[t2 - 1];
    return e2.functionName !== r2.functionName;
  }), t, n);
};
var gt = (e) => !!e.fileName && !e.isIgnoreListed;
var _t = async (e, t = true, n) => {
  let r = pt(e);
  if (r.length > 0) {
    let i2 = Qe(e) ?? {};
    i2.functionName = vt(e.type) ?? i2.functionName;
    let a = await D([i2, ...r], t, n);
    if (a.some((e2, t2) => t2 > 0 && gt(e2))) return a;
  }
  return ht(e, t, n);
};
var vt2 = (e) => {
  let t = e._debugSource;
  return t ? typeof t == `object` && !!t && `fileName` in t && typeof t.fileName == `string` && `lineNumber` in t && typeof t.lineNumber == `number` : false;
};
var yt2 = (e) => e.fileName ? { fileName: e.fileName, lineNumber: e.lineNumber, columnNumber: e.columnNumber, functionName: e.functionName } : null;
var bt = (e) => {
  if (!O(e)) return null;
  let { frames: t, isTrusted: n } = C2(e._debugStack);
  if (!n) return null;
  for (let e2 of t) if (e2.fileName) return e2;
  return null;
};
var xt2 = async (e, t = true, n) => {
  if (vt2(e)) return e._debugSource || null;
  let r = bt(e) ?? Qe(e);
  if (r) {
    let [e2] = await D([r], t, n), i3 = yt2(e2);
    if (i3) return i3;
  }
  let i2 = await ht(e, t, n);
  for (let e2 of i2) if (e2.fileName) return yt2(e2);
  return null;
};
var St = (e) => e.split(`/`).filter(Boolean).length;
var Ct = (e) => e.split(`/`).filter(Boolean)[0] ?? null;
var wt = (e) => {
  let t = e.indexOf(`/`, 1);
  if (t === -1 || St(e.slice(0, t)) !== 1) return e;
  let n = e.slice(t);
  if (!fe2.test(n) || St(n) < 2) return e;
  let r = Ct(n);
  return !r || r.startsWith(`@`) || r.length > 4 ? e : n;
};
var j = (e) => {
  if (!e || de.some((t2) => t2 === e)) return ``;
  let t = e, n = t.startsWith(`http://`) || t.startsWith(`https://`);
  if (n) try {
    t = new URL(t).pathname;
  } catch {
  }
  if (n && (t = wt(t)), t.startsWith(`about://React/`)) {
    let e2 = t.slice(14), n2 = e2.indexOf(`/`), r2 = e2.indexOf(`:`);
    t = n2 !== -1 && (r2 === -1 || n2 < r2) ? e2.slice(n2 + 1) : e2;
  }
  let r = true;
  for (; r; ) {
    r = false;
    for (let e2 of le) if (t.startsWith(e2)) {
      t = t.slice(e2.length), e2 === `file:///` && (t = `/${t.replace(/^\/+/, ``)}`), r = true;
      break;
    }
  }
  if (ce.test(t)) {
    let e2 = t.match(ce);
    e2 && (t = t.slice(e2[0].length));
  }
  if (t.startsWith(`//`)) {
    let e2 = t.indexOf(`/`, 2);
    t = e2 === -1 ? `` : t.slice(e2);
  }
  let i2 = t.indexOf(`?`);
  if (i2 !== -1) {
    let e2 = t.slice(i2);
    me2.test(e2) && (t = t.slice(0, i2));
  }
  return t;
};
var Tt = (e) => {
  let t = j(e);
  return !(!t || !fe2.test(t) || pe2.test(t));
};
var Et = /* @__PURE__ */ Symbol.for(`react.context`);
var Dt = [];
var Ot = null;
var kt = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render.");
var M = () => {
  let e = Ot;
  return e !== null && (Ot = e.next), e;
};
var N = (e) => e._currentValue;
var P = (e, t, n, r = null) => {
  Dt.push({ displayName: r, primitive: e, stackError: Error(), value: t, dispatcherHookName: n });
};
var At = (e) => {
  if (typeof e == `object` && e) {
    let t = e;
    if (typeof t.then == `function`) {
      let e2 = t;
      switch (e2.status) {
        case `fulfilled`:
          return P(`Promise`, e2.value, `Use`), e2.value;
        case `rejected`:
          throw e2.reason;
      }
      throw P(`Unresolved`, e2, `Use`), kt;
    }
    if (t.$$typeof === Et && `_currentValue` in t) {
      let e2 = t, n = N(e2);
      return P(`Context (use)`, n, `Use`, e2.displayName || `Context`), n;
    }
  }
  throw Error(`An unsupported type was passed to use(): ` + String(e));
};
var jt = (e) => {
  let t = N(e);
  return P(`Context`, t, `Context`, e.displayName || null), t;
};
var Mt = (e) => {
  let t = M(), n = t === null ? typeof e == `function` ? e() : e : t.memoizedState;
  return P(`State`, n, `State`), [n, () => {
  }];
};
var Nt = (e, t, n) => {
  let r = M(), i2 = r === null ? n === void 0 ? t : n(t) : r.memoizedState;
  return P(`Reducer`, i2, `Reducer`), [i2, () => {
  }];
};
var Pt = (e) => {
  let t = M(), n = t === null ? { current: e } : t.memoizedState;
  return P(`Ref`, n.current, `Ref`), n;
};
var Ft = () => {
  let e = M();
  return P(`CacheRefresh`, e === null ? () => {
  } : e.memoizedState, `CacheRefresh`), () => {
  };
};
var It = (e) => {
  M(), P(`LayoutEffect`, e, `LayoutEffect`);
};
var Lt = (e) => {
  M(), P(`InsertionEffect`, e, `InsertionEffect`);
};
var Rt = (e) => {
  M(), P(`Effect`, e, `Effect`);
};
var zt = (e) => {
  M();
  let t;
  typeof e == `object` && e && `current` in e && (t = e.current), P(`ImperativeHandle`, t, `ImperativeHandle`);
};
var Bt = (e, t) => {
  P(`DebugValue`, typeof t == `function` ? t(e) : e, `DebugValue`);
};
var Vt = (e) => {
  let t = M();
  return P(`Callback`, t === null ? e : t.memoizedState[0], `Callback`), e;
};
var Ht = (e) => {
  let t = M(), n = t === null ? e() : t.memoizedState[0];
  return P(`Memo`, n, `Memo`), n;
};
var Ut2 = (e, t) => {
  let n = M();
  M();
  let r = n === null ? t() : n.memoizedState;
  return P(`SyncExternalStore`, r, `SyncExternalStore`), r;
};
var Wt = () => {
  let e = M();
  M();
  let t = e === null ? false : e.memoizedState;
  return P(`Transition`, t, `Transition`), [t, () => {
  }];
};
var Gt = (e) => {
  let t = M(), n = t === null ? e : t.memoizedState;
  return P(`DeferredValue`, n, `DeferredValue`), n;
};
var Kt = () => {
  let e = M(), t = e === null ? `` : e.memoizedState;
  return P(`Id`, t, `Id`), t;
};
var qt = (e) => [];
var Jt = (e) => {
  let t = M(), n = t === null ? e : t.memoizedState;
  return P(`Optimistic`, n, `Optimistic`), [n, () => {
  }];
};
var Yt2 = (e, t) => {
  let n, r = null;
  if (e !== null) {
    let t2 = e.memoizedState;
    if (typeof t2 == `object` && t2 && `then` in t2 && typeof t2.then == `function`) {
      let e2 = t2;
      switch (e2.status) {
        case `fulfilled`:
          n = e2.value;
          break;
        case `rejected`:
          r = e2.reason;
          break;
        default:
          r = kt, n = e2;
      }
    } else n = t2;
  } else n = t;
  return { value: n, error: r };
};
var Xt = (e) => (t, n) => {
  let r = M();
  M(), M();
  let i2 = Error(), { value: a, error: o } = Yt2(r, n);
  if (Dt.push({ displayName: null, primitive: e, stackError: i2, value: a, dispatcherHookName: e }), o !== null) throw o;
  return [a, () => {
  }, false];
};
var Zt2 = Xt(`ActionState`);
var Qt = { readContext: N, use: At, useCallback: Vt, useContext: jt, useEffect: Rt, useImperativeHandle: zt, useLayoutEffect: It, useInsertionEffect: Lt, useMemo: Ht, useReducer: Nt, useRef: Pt, useState: Mt, useDebugValue: Bt, useDeferredValue: Gt, useTransition: Wt, useSyncExternalStore: Ut2, useId: Kt, useHostTransitionStatus: () => {
  let e = N({ _currentValue: null });
  return P(`HostTransitionStatus`, e, `HostTransitionStatus`), e;
}, useFormState: Xt(`FormState`), useActionState: Zt2, useOptimistic: Jt, useMemoCache: qt, useCacheRefresh: Ft, useEffectEvent: (e) => (M(), P(`EffectEvent`, e, `EffectEvent`), e) };
typeof Proxy > `u` || new Proxy(Qt, { get(e, t) {
  if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
  let n = Error(`Missing method in Dispatcher: ` + t);
  throw n.name = `ReactDebugToolsUnsupportedHookError`, n;
} });
var $t = (e) => e === void 0 || !Number.isFinite(e) ? 3 : Math.max(0, Math.floor(e));
var en = /^(?:\.\/)?\/?\([a-z][a-z0-9-]*\)\//;
var F = (e) => {
  let t = j(e);
  return t = t.replace(en, ``), t.startsWith(`./`) && (t = t.slice(2)), t;
};
var I = (e) => {
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
};
var tn = /(?:^|[/\\])node_modules[/\\]/;
var nn = /[/\\]\.vite[/\\]deps[^/\\]*[/\\]/;
var rn2 = /\.[mc]?[jt]sx?$/i;
var an2 = /^chunk-[A-Za-z0-9_-]+$/;
var on2 = /[/\\]/;
var sn = /^(.+?)@v?\d/;
var L = (e) => e.split(on2).filter(Boolean);
var cn2 = (e) => {
  let [t, n] = L(e);
  return !t || t.startsWith(`.`) ? null : t.startsWith(`@`) ? n ? `${t}/${n}` : null : t;
};
var ln = (e) => {
  let t = L(e)[0];
  if (!t) return null;
  let n = t.replace(rn2, ``);
  if (an2.test(n)) return null;
  if (!n.startsWith(`@`)) return n;
  let r = n.indexOf(`_`);
  return r === -1 ? null : `${n.slice(0, r)}/${n.slice(r + 1)}`;
};
var un = (e, t, n) => {
  let r = e.split(t);
  return r.length > 1 ? n(r[r.length - 1]) : null;
};
var dn = (e) => e?.match(sn)?.[1] ?? null;
var fn = (e) => {
  let t;
  try {
    t = new URL(e);
  } catch {
    return null;
  }
  if (!t.hostname) return null;
  let n = L(t.pathname).map(I);
  for (let [e2, t2] of n.entries()) {
    if (t2.startsWith(`@`)) {
      let r2 = dn(n[e2 + 1]);
      if (r2) return `${t2}/${r2}`;
      continue;
    }
    let r = dn(t2);
    if (r) return r;
  }
  return null;
};
var pn2 = (e) => un(e, nn, ln) ?? un(e, tn, cn2);
var mn = (e) => {
  if (!e) return null;
  let t = j(e);
  return t && (pn2(I(t)) || fn(e)) || null;
};
var hn = /^@[A-Za-z0-9][A-Za-z0-9._-]*$/;
var gn = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
var _n = /* @__PURE__ */ new Set([`app`, `web`, `website`, `frontend`, `client`, `src`]);
var vn = /* @__PURE__ */ new Set([`app`, `src`, `components`, `pages`, `features`, `modules`, `hooks`, `lib`, `utils`, `ui`, `shared`, `common`, `core`, `styles`, `assets`]);
var yn = (e) => {
  let t = e;
  for (; t.startsWith(`../`) || t.startsWith(`./`); ) t = t.slice(t.startsWith(`../`) ? 3 : 2);
  return t;
};
var bn = (e) => {
  let t = yn(I(j(e)));
  if (t.startsWith(`/`)) return null;
  let [n, r, ...i2] = L(t);
  return !n || !r || i2.length === 0 || !hn.test(n) || vn.has(n.slice(1)) || !gn.test(r) || rn2.test(r) || _n.has(r) ? null : `${n}/${r}`;
};
var xn = (e) => e ? mn(e) ?? bn(e) : null;
var R = (e) => {
  if (!e) return { origin: `unknown`, packageName: null };
  let t = xn(e);
  return t ? { origin: `package`, packageName: t } : Tt(e) ? { origin: `app`, packageName: null } : { origin: `unknown`, packageName: null };
};
var Sn = /* @__PURE__ */ new Set([`role`, `name`, `aria-label`, `rel`, `href`]);
var z = (e) => {
  if (!/^[a-z-]{3,}$/i.test(e)) return false;
  let t = e.split(/-|[A-Z]/);
  for (let e2 of t) if (e2.length <= 2 || /[^aeiou]{4,}/i.test(e2)) return false;
  return true;
};
var Cn = (e, t) => {
  let n = Sn.has(e) || e.startsWith(`data-`) && z(e), r = z(t) && t.length < 100 || t.startsWith(`#`) && z(t.slice(1));
  return n && r;
};
var wn = (e) => {
  let t = e[0].name;
  for (let n = 1; n < e.length; n++) t = `${e[n].name} > ${t}`;
  return t;
};
var Tn = (e) => {
  let t = 0;
  for (let n of e) t += n.penalty;
  return t;
};
var En = (e, t) => Tn(e) - Tn(t);
var Dn = (e, t) => {
  let n = e.parentNode;
  if (!n) return;
  let r = n.firstChild;
  if (!r) return;
  let i2 = 0;
  for (; r && (Re(r) && (t === void 0 || r.tagName.toLowerCase() === t) && i2++, r !== e); ) r = r.nextSibling;
  return i2;
};
var On = (e, t) => e === `html` ? `html` : `${e}:nth-child(${t})`;
var kn = (e, t) => e === `html` ? `html` : `${e}:nth-of-type(${t})`;
var An = (e, t) => {
  let n = [], r = e.getAttribute(`id`), i2 = e.tagName.toLowerCase();
  r && z(r) && n.push({ name: `#${CSS.escape(r)}`, penalty: 0 });
  for (let t2 of e.classList) z(t2) && n.push({ name: `.${CSS.escape(t2)}`, penalty: 1 });
  for (let r2 of e.attributes) t(r2.name, r2.value) && n.push({ name: `[${CSS.escape(r2.name)}="${CSS.escape(r2.value)}"]`, penalty: 2 });
  n.push({ name: i2, penalty: 5 });
  let a = Dn(e, i2);
  a !== void 0 && n.push({ name: kn(i2, a), penalty: 10 });
  let o = Dn(e);
  return o !== void 0 && n.push({ name: On(i2, o), penalty: 50 }), n;
};
var jn = (e, t = p, r = []) => {
  if (t <= 0) return [];
  if (e.length === 0) return [r];
  let i2 = [];
  for (let n of e[0]) {
    let a = t - i2.length;
    if (a <= 0) break;
    i2.push(...jn(e.slice(1), a, [...r, n]));
  }
  return i2;
};
var Mn = (t, n) => {
  let r = n.getRootNode();
  return Yt(r) ? r : pn(t) ? t : t.ownerDocument;
};
var B = (e, t) => t.querySelectorAll(wn(e)).length === 1;
var Nn = (e, t) => {
  let n = e, r = [];
  for (; n && n !== t; ) {
    let e2 = n.tagName.toLowerCase(), t2 = Dn(n, e2);
    if (t2 === void 0) return;
    r.push({ name: kn(e2, t2), penalty: 10 }), n = n.parentElement;
  }
  return B(r, t) ? r : void 0;
};
var Pn = (e, t, n, r) => {
  if (e.nodeType !== Node.ELEMENT_NODE) throw new rn();
  if (e.tagName.toLowerCase() === `html`) return `html`;
  let i2 = Mn(t, e), o = Date.now(), s = [], l = e, u2 = 0, f2;
  for (; l && l !== i2 && !f2; ) if (s.push(An(l, r)), l = l.parentElement, u2++, u2 >= 3) {
    let t2 = jn(s);
    t2.sort(En);
    for (let r2 of t2) {
      if (Date.now() - o > n) {
        let t3 = Nn(e, i2);
        if (!t3) throw new an(n);
        return wn(t3);
      }
      if (B(r2, i2)) {
        f2 = r2;
        break;
      }
    }
  }
  if (!f2 && u2 < 3) {
    let e2 = jn(s);
    e2.sort(En);
    for (let t2 of e2) {
      if (Date.now() - o > n) break;
      if (B(t2, i2)) {
        f2 = t2;
        break;
      }
    }
  }
  if (!f2) throw new on();
  return wn(f2);
};
var Fn = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
var In = /:r[a-z0-9]+:/i;
var Ln = /_r_[a-z0-9]+_(?:$|-)/i;
var Rn = /«r[a-z0-9]+»/i;
var zn = /^(?:downshift-\d+(?:-|$)|headlessui-[a-z-]+-\d+(?:-|$)|mui-\d+(?:-|$)|radix-\d+(?:-|$)|react-aria-\d+(?:-|$)|react-select-\d+(?:-|$))/i;
var Bn = /^ember\d+$/i;
var Vn = /^\d+$/;
var Hn = (e) => e.length > 0 && e.length <= 120 && !In.test(e) && !Fn.test(e) && !Ln.test(e) && !Rn.test(e) && !zn.test(e) && !Bn.test(e) && !Vn.test(e);
var Un = /* @__PURE__ */ new Set([`data-testid`, `data-test-id`, `data-test`, `data-cy`, `data-qa`, `aria-label`, `href`, `src`, `role`, `name`, `title`, `alt`]);
var Wn = /* @__PURE__ */ new Set([`button`, `link`, `checkbox`, `radio`, `switch`, `tab`, `menuitem`, `option`, `textbox`, `combobox`, `slider`, `spinbutton`]);
var Gn = (e) => e.ownerDocument.body ?? e.ownerDocument.documentElement;
var Kn = (e) => e.length > 0 && e.length <= 120;
var qn = (e, t) => Un.has(e) && Kn(t) && (e !== `role` || t.split(/\s+/).some((e2) => Wn.has(e2)));
var Jn = (t, n) => {
  try {
    let r = t.getRootNode(), i2 = (Yt(r) ? r : t.ownerDocument).querySelectorAll(n);
    return i2.length === 1 && i2[0] === t;
  } catch {
    return false;
  }
};
var Yn = (e) => {
  let t = e.getAttribute(`id`), n = null;
  if (t) {
    let r = `#${CSS.escape(t)}`;
    if (Jn(e, r)) {
      if (Hn(t)) return { selector: r, isSemantic: true };
      n = r;
    }
  }
  for (let t2 of Un) {
    let n2 = e.getAttribute(t2);
    if (!n2 || !qn(t2, n2)) continue;
    let r = `[${t2}=${JSON.stringify(n2)}]`;
    if (Jn(e, r)) return { selector: r, isSemantic: true };
    let i2 = `${e.tagName.toLowerCase()}${r}`;
    if (Jn(e, i2)) return { selector: i2, isSemantic: true };
  }
  return n ? { selector: n, isSemantic: false } : null;
};
var Xn = (t) => {
  let n = [], r = t.getRootNode(), i2 = Yt(r) ? r : Gn(t), a = t;
  for (; a; ) {
    let e = a.getAttribute(`id`);
    if (e) {
      n.unshift(`#${CSS.escape(e)}`);
      break;
    }
    let t2 = a.parentNode;
    if (!t2) {
      n.unshift(a.tagName.toLowerCase());
      break;
    }
    let r2 = Array.from(t2.children).indexOf(a) + 1;
    if (n.unshift(`${a.tagName.toLowerCase()}:nth-child(${r2})`), t2 === i2) {
      Re(i2) && n.unshift(i2.tagName.toLowerCase());
      break;
    }
    a = Re(t2) ? t2 : null;
  }
  return n.join(` > `);
};
var Zn = (e) => {
  let t = Yn(e);
  if (t) return t;
  try {
    let t2 = Pn(e, Gn(e), 200, (e2, t3) => Cn(e2, t3) || qn(e2, t3));
    if (t2) return { selector: t2, isSemantic: false };
  } catch {
  }
  return { selector: Xn(e), isSemantic: false };
};
var V = (t) => {
  let n = C(t);
  if (n) return { selector: n.getSelector(), isSemantic: true };
  let r = Yn(t);
  if (!r?.isSemantic) return null;
  let i2 = t.getRootNode();
  if (Yt(i2)) {
    let e = V(i2.host);
    return e ? { selector: `${e.selector} >>> ${r.selector}`, isSemantic: true } : null;
  }
  let a = He(t.ownerDocument.defaultView);
  if (!a) return r;
  let o = V(a);
  return o ? { selector: `${o.selector} >>iframe>> ${r.selector}`, isSemantic: true } : null;
};
var H = (t) => {
  let n = C(t);
  if (n) return { selector: n.getSelector(), isSemantic: true };
  let r = Zn(t), i2 = t.getRootNode();
  if (Yt(i2)) {
    let e = H(i2.host);
    return { selector: `${e.selector} >>> ${r.selector}`, isSemantic: e.isSemantic && r.isSemantic };
  }
  let a = He(t.ownerDocument.defaultView);
  if (!a) return r;
  let o = H(a);
  return { selector: `${o.selector} >>iframe>> ${r.selector}`, isSemantic: o.isSemantic && r.isSemantic };
};
var $n = [...Array.from(Un).filter((e) => e !== `role`).map((e) => `[${e}]`), ...Array.from(Wn).map((e) => `[role~="${e}"]`)].join(`,`);
var er = [`button`, `input`, `select`, `textarea`].join(`,`);
var tr = (e) => {
  let t = e.getAttribute(`id`);
  return !!(t && Hn(t) || e.matches($n));
};
var nr = (e) => tr(e) || e.matches(er);
var rr = (e) => {
  let { body: t, documentElement: n } = e.ownerDocument;
  if (e === t || e === n) return true;
  if (!t) return false;
  let r = t.getElementsByTagName(`*`).length;
  return r === 0 ? false : e.getElementsByTagName(`*`).length / r >= ee;
};
var ir = (e, n) => {
  let r = e.getRootNode(), i2 = e;
  for (; i2; ) {
    let a = nr(i2), o = a && rr(i2);
    if (a) {
      if (o && i2 !== e) return e;
      if (!n || n(i2) || o || !tr(i2) && i2 === e) return i2;
    }
    let s = E(i2);
    i2 = s?.getRootNode() === r ? s : null;
  }
  return e;
};
var ar = (e) => {
  if (C(e)) return V(e);
  let t = null;
  return ir(e, (e2) => {
    let n = V(e2);
    return n ? (t = n, true) : false;
  }), t;
};
var or = [/\/assets\/[^/?#]+-[a-z0-9_-]{6,}\.(?:c|m)?js(?:[?#]|$)/, /\/_next\/static\/.*\.(?:c|m)?js(?:[?#]|$)/, /\/static\/chunks\/.*\.(?:c|m)?js(?:[?#]|$)/];
var sr = (e) => {
  if (!e) return false;
  let t = `/${F(e)}`.toLowerCase();
  return or.some((e2) => e2.test(t));
};
var cr = (e) => {
  if (!e) return false;
  let t = `/${F(e)}/`.toLowerCase();
  return u.some((e2) => t.includes(e2));
};
var lr;
var ur = (e = false) => {
  let t = new URL(document.baseURI);
  return Array.from(document.scripts).some((n) => {
    if (!n.src) return false;
    try {
      let r = new URL(n.src, t);
      return (e || r.origin === t.origin) && r.pathname.includes(`/_next/static/`);
    } catch {
      return false;
    }
  });
};
var dr = () => Array.from(document.scripts).some((e) => e.textContent?.includes(`self.__next_f.push`));
var U = (e) => (e && (lr = void 0), lr ??= typeof document < `u` && !!(document.getElementById(`__NEXT_DATA__`) || document.querySelector(`nextjs-portal`) || ur() || dr() && ur(true)), lr);
var fr = (e) => e.map((e2) => `
  in ${e2}`).join(``);
var W;
var pr = () => {
  if (W !== void 0) return W;
  let e = document.querySelector(`script[src*="/_next/"]`)?.src, t = e ? new URL(e).pathname : ``, n = t.indexOf(`/_next/`);
  return W = n > 0 ? t.slice(0, n) : ``, W;
};
var mr = [`about://React/`, `rsc://React/`];
var hr = (e) => mr.some((t) => e.startsWith(t));
var gr = (e) => {
  for (let t of mr) {
    if (!e.startsWith(t)) continue;
    let n = e.indexOf(`/`, t.length);
    if (n === -1) continue;
    let r = n + 1, i2 = e.lastIndexOf(`?`);
    return I(i2 > r ? e.slice(r, i2) : e.slice(r));
  }
  return e;
};
var _r = (e) => {
  if (typeof e != `object` || !e || !(`status` in e) || e.status !== `fulfilled` || !(`value` in e) || typeof e.value != `object` || e.value === null || !(`originalStackFrame` in e.value)) return null;
  let t = e.value.originalStackFrame;
  return typeof t != `object` || !t || !(`file` in t) || typeof t.file != `string` || !t.file || `ignored` in t && t.ignored ? null : { file: t.file, line1: `line1` in t && typeof t.line1 == `number` ? t.line1 : null, column1: `column1` in t && typeof t.column1 == `number` ? t.column1 : null };
};
var vr = async (e, t) => {
  let n = [], r = [];
  for (let t2 = 0; t2 < e.length; t2++) {
    let i3 = e[t2];
    !i3.isServer || !i3.fileName || (n.push(t2), r.push({ file: gr(i3.fileName), methodName: i3.functionName ?? `<unknown>`, line1: i3.lineNumber ?? null, column1: i3.columnNumber ?? null, arguments: [] }));
  }
  if (r.length === 0) return e;
  let i2 = new AbortController(), a = setTimeout(() => i2.abort(), d), o = () => i2.abort();
  t?.aborted && i2.abort(), t?.addEventListener(`abort`, o);
  try {
    let t2 = await fetch(`${pr()}/__nextjs_original-stack-frames`, { method: `POST`, headers: { "Content-Type": `application/json` }, body: JSON.stringify({ frames: r, isServer: true, isEdgeServer: false, isAppDirectory: true }), priority: `high`, signal: i2.signal });
    if (!t2.ok) return e;
    let a2 = await t2.json();
    if (!Array.isArray(a2)) return e;
    let o2 = [...e];
    for (let t3 = 0; t3 < n.length; t3++) {
      let r2 = _r(a2[t3]);
      if (!r2) continue;
      let i3 = n[t3];
      o2[i3] = { ...e[i3], fileName: r2.file, lineNumber: r2.line1 ?? void 0, columnNumber: r2.column1 ?? void 0, isSymbolicated: true };
    }
    return o2;
  } catch {
    return e;
  } finally {
    clearTimeout(a), t?.removeEventListener(`abort`, o);
  }
};
var yr = (e) => {
  let t = /* @__PURE__ */ new Map();
  return mt(e, (e2) => {
    if (!O(e2)) return false;
    let n = ot(e2._debugStack.stack);
    if (!n) return false;
    for (let e3 of S(n)) !e3.functionName || !e3.fileName || hr(e3.fileName) && (t.has(e3.functionName) || t.set(e3.functionName, { ...e3, isServer: true }));
    return false;
  }, true), t;
};
var br = (e, t) => {
  if (!t.some((e2) => e2.isServer && !e2.fileName && e2.functionName)) return t;
  let n = yr(e);
  return n.size === 0 ? t : t.map((e2) => {
    if (!e2.isServer || e2.fileName || !e2.functionName) return e2;
    let t2 = n.get(e2.functionName);
    return t2 ? { ...e2, fileName: t2.fileName, lineNumber: t2.lineNumber, columnNumber: t2.columnNumber } : e2;
  });
};
var xr = 0;
var G = [];
var Sr = (e) => e?.aborted ? Promise.resolve(false) : xr < 3 ? (xr += 1, Promise.resolve(true)) : new Promise((t) => {
  let n = { abortSignal: e, resolve: t };
  e && (n.handleAbort = () => {
    let e2 = G.indexOf(n);
    e2 !== -1 && (G.splice(e2, 1), t(false));
  }, e.addEventListener(`abort`, n.handleAbort, { once: true })), G.push(n);
});
var Cr = () => {
  let e = G.shift();
  if (e) {
    e.abortSignal && e.handleAbort && e.abortSignal.removeEventListener(`abort`, e.handleAbort), e.resolve(true);
    return;
  }
  --xr;
};
var wr = async (e, t, n = f, r) => {
  if (!await Sr(r)) return t;
  let i2 = new AbortController(), a, o = new Promise((e2) => {
    a = setTimeout(() => {
      i2.abort(), e2(t);
    }, n);
  }), s, c = new Promise((e2) => {
    r && (s = () => {
      i2.abort(), e2(t);
    }, r.aborted ? s() : r.addEventListener(`abort`, s, { once: true }));
  });
  try {
    let t2 = e(i2.signal);
    return t2.catch(() => {
    }), await Promise.race([t2, o, c]);
  } finally {
    clearTimeout(a), s && r?.removeEventListener(`abort`, s), Cr();
  }
};
var K = (e) => e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
var Tr = (e) => K(e).replace(/"/g, `&quot;`).replace(/\r/g, `&#13;`).replace(/\n/g, `&#10;`).replace(/\t/g, `&#9;`);
var q = (e, t) => {
  if (e.length <= t) return e;
  let n = Math.max(0, t - 3), r = e.slice(0, n), i2 = r.lastIndexOf(`&`);
  return `${i2 > r.lastIndexOf(`;`) ? r.slice(0, i2) : r}...`.slice(0, t);
};
var Er = (e) => e.startsWith(`data-react-grab-`);
var Dr = (e) => e.replace(/\s+/g, ` `).trim();
var Or = (e) => {
  let t = [];
  for (let n of e.childNodes) {
    if (n.nodeType !== Node.TEXT_NODE) continue;
    let e2 = Dr(n.textContent ?? ``);
    e2 && t.push(e2);
  }
  return t.join(` `);
};
var kr = (e) => e.getAttribute(`aria-hidden`) === `true` || e.hasAttribute(`hidden`) ? true : he.has(e.tagName.toLowerCase());
var Ar = (e, t, n) => {
  if (e.nodeType === Node.TEXT_NODE) {
    let r = Dr(e.textContent ?? ``);
    return r ? (t.push(r), n - r.length) : n;
  }
  if (!Re(e) || kr(e)) return n;
  for (let r of e.childNodes) if (n = Ar(r, t, n), n <= 0) break;
  return n;
};
var jr = (e, t) => {
  if (kr(e)) return ``;
  let n = Or(e);
  if (!me.has(t) || n && e.children.length === 0) return n;
  let r = [];
  return Ar(e, r, 100), r.join(` `);
};
var Mr = (e, t, n) => `${e}="${q(Tr(t), n)}"`;
var Nr = (e) => {
  let t = [];
  for (let n of fe) {
    if (t.length >= 8) break;
    let r = e.getAttribute(n);
    if (!r) continue;
    let i2 = n === `class` ? 15 : 120;
    t.push(Mr(n, r, i2));
  }
  return t;
};
var Pr = (e) => {
  let t = Nr(e);
  return t.length > 0 ? ` ${t.join(` `)}` : ``;
};
var Fr = (e) => e === `class` || e === `className` || e === `style`;
var Ir = (e) => {
  let t = Nr(e).map((e2) => ` ${e2}`), n = [], r = [];
  for (let { name: t2, value: i2 } of e.attributes) Er(t2) || fe.includes(t2) || Fr(t2) || (pe.has(t2) ? n.push(i2 ? ` ${Mr(t2, i2, 120)}` : ` ${t2}`) : i2 && r.push(` ${Mr(t2, i2, 15)}`));
  return [...t, ...n, ...r].slice(0, 8).join(``);
};
var Lr = (e) => e.length === 0 ? `` : e.length <= 2 ? e.map((e2) => `<${cn(e2)} ...>`).join(`
  `) : `(${e.length} elements)`;
var Rr = (e) => {
  let t = C(e);
  if (t) return t.getPreview();
  let n = cn(e);
  if (!h(e)) {
    let t2 = Pr(e), r2 = q(K(jr(e, n)), 100);
    return r2 ? `<${n}${t2}>${r2}</${n}>` : `<${n}${t2} />`;
  }
  let r = Ir(e), i2 = q(K(jr(e, n)), 100);
  return i2 ? `<${n}${r}>${i2}</${n}>` : `<${n}${r} />`;
};
var zr = (e) => {
  let t = C(e);
  if (t) return t.getPreview();
  let n = cn(e), r = Ir(e), i2 = jr(e, n), a = [], o = [], s = false;
  for (let t2 of e.childNodes) t2.nodeType !== Node.COMMENT_NODE && (t2.nodeType === Node.TEXT_NODE ? t2.textContent && t2.textContent.trim().length > 0 && (s = true) : Re(t2) && (s ? o.push(t2) : a.push(t2)));
  let c = i2.length > 0 && me.has(n), l = ``, d2 = Lr(a);
  d2 && !c && (l += `
  ${d2}`), i2 && (l += `
  ${q(K(i2), 100)}`);
  let f2 = Lr(o);
  return f2 && !c && (l += `
  ${f2}`), l.length > 0 ? `<${n}${r}>${l}
</${n}>` : `<${n}${r} />`;
};
var Br = /* @__PURE__ */ new Set([`_`, `$`, `motion.`, `styled.`, `chakra.`, `ark.`, `Primitive.`, `Slot.`]);
var Vr = new Set(`AppRouter.AppRouterAnnouncer.AppDevOverlay.AppDevOverlayErrorBoundary.ClientPageRoot.ClientSegmentRoot.DevRootHTTPAccessFallbackBoundary.ErrorBoundary.ErrorBoundaryHandler.GracefulDegradeBoundary.HTTPAccessErrorFallback.HTTPAccessFallbackBoundary.HTTPAccessFallbackErrorBoundary.HandleRedirect.Head.HistoryUpdater.HotReload.InnerLayoutRouter.InnerScrollAndFocusHandler.InnerScrollAndFocusHandlerOld.InnerScrollAndMaybeFocusHandler.InnerScrollHandlerNew.LinkComponent.LoadableComponent.LoadingBoundary.LoadingBoundaryProvider.NotAllowedRootHTTPFallbackError.OfflineProvider.OuterLayoutRouter.RedirectBoundary.RedirectErrorBoundary.RenderFromTemplateContext.RenderValidationBoundaryAtThisLevel.ReplaySsrOnlyErrors.RootErrorBoundary.RootLevelDevOverlayElement.Router.ScrollAndFocusHandler.ScrollAndMaybeFocusHandler.SegmentBoundaryTrigger.SegmentBoundaryTriggerNode.SegmentStateProvider.SegmentTrieNode.SegmentViewNode.SegmentViewStateNode.ServerRoot.body.html`.split(`.`));
var Hr = /* @__PURE__ */ new Set([`<anonymous>`, `<unknown>`, `Anonymous`, `Unknown`]);
var Ur = /* @__PURE__ */ new Set([`Suspense`, `Fragment`, `StrictMode`, `Profiler`, `SuspenseList`]);
var Wr = /* @__PURE__ */ new Set([`MotionDOMComponent`, `Slot`, `SlotClone`]);
var Gr = [`.Consumer`, `.Context`, `.Provider`, `.Slot`, `.SlotClone`, `.Slottable`, `ProviderProvider`];
var Kr = (e, t = false) => {
  if (Hr.has(e) || t && Vr.has(e) || Ur.has(e) || Wr.has(e)) return true;
  for (let t2 of Gr) if (e.endsWith(t2)) return true;
  for (let t2 of Br) if (e.startsWith(t2)) return true;
  return false;
};
var qr = (e, t = false) => !(!e || Kr(e, t));
var Jr = (e, t) => e || t.isSemantic;
var Yr = (e) => {
  let t = e.alternate, n = e._debugOwner, r = e._debugSource, i2 = e._debugStack;
  return { matches: (a) => (a === e || a === t || a.alternate === e) && a._debugOwner === n && a._debugSource === r && a._debugStack === i2 };
};
var Xr = (e, t) => e.length > t ? `${e.slice(0, t)}...` : e;
var Zr = (e) => JSON.stringify(Xr(e, 120));
var Qr = (e, t, n) => {
  e.get(t) === n && e.delete(t);
};
var $r = async (e, t) => {
  for (let n = 0; n < 2; n += 1) {
    let r = e();
    if (!r) return t();
    let i2 = await r.valuePromise;
    if (r.isCurrent() || n === 1) return i2;
  }
  return t();
};
var ei = (e, t) => !(e.length <= 1 || Kr(e, t) || e[0] !== e[0].toUpperCase());
var J = (e, t) => e && ei(e, t) ? e : null;
var Y = (e) => !cr(e) && !sr(e);
var X = (t) => {
  if (!yt()) return t;
  let n = t;
  for (; n?.ownerDocument === t.ownerDocument; ) {
    if (Ut(n)) return n;
    if (n.parentElement) {
      n = n.parentElement;
      continue;
    }
    let t2 = n.getRootNode();
    n = Yt(t2) ? t2.host : null;
  }
  return t;
};
var ti = (e) => {
  let t = e.return?.child ?? null;
  for (; t; ) {
    if (t !== e && t.key !== null) return true;
    t = t.sibling;
  }
  return false;
};
var ni = (e) => {
  let t = e, n = 0;
  for (; t; ) {
    if (t.key !== null && ti(t)) return String(t.key);
    if (lt(t) && (n += 1, n === 2)) break;
    t = t.return;
  }
  return null;
};
var ri = (e) => {
  if (!yt()) return null;
  let t = Ut(X(e));
  return ni(t ? xt(t) : null);
};
var ii = /* @__PURE__ */ new WeakMap();
var ai = /* @__PURE__ */ new WeakMap();
var oi = (e) => {
  let t = X(e), n = Ut(t);
  if (!n) return null;
  let r = xt(n);
  return { element: t, fiber: r, revision: Yr(r) };
};
var si = (e, t) => {
  let n = oi(e);
  return !!(n && n.element === t.element && t.revision.matches(n.fiber));
};
var Z = (e, t, n) => $r(() => {
  let t2 = oi(e);
  return t2 ? { isCurrent: () => si(e, t2), valuePromise: n(t2) } : null;
}, t);
var ci = (e) => (t) => fetch(t, { signal: e, priority: `high` });
var li = (e, t) => wr(async (t2) => {
  try {
    let n = await _t(e, true, ci(t2));
    return U() ? await vr(br(e, n), t2) : n;
  } catch {
    return null;
  }
}, null, void 0, t);
var ui = (e) => {
  if (!yt()) return Promise.resolve([]);
  let t = ii.get(e.element);
  if (t?.revision.matches(e.fiber)) return t.promise;
  let n = new AbortController(), r = li(e.fiber, n.signal);
  if (!si(e.element, e)) return r;
  let i2 = { controller: n, promise: r, revision: e.revision };
  return ii.set(e.element, i2), t?.controller.abort(), i2.promise.then((t2) => {
    t2 === null && Qr(ii, e.element, i2);
  }), i2.promise;
};
var di = (e) => yt() ? Z(e, () => null, ui) : Promise.resolve([]);
var fi = async (e) => {
  if (!yt()) return null;
  let t = U(), n = J(C(e) ? bi(e) : null, t);
  if (n) return n;
  let r = await di(e);
  if (!r) return null;
  for (let e2 of r) {
    let n2 = J(e2.functionName, t);
    if (n2) return n2;
  }
  return null;
};
var pi = (e) => e[0] ?? null;
var mi = (e, t) => !e || !lt(e) ? null : J(vt(e.type), t);
var hi = (e, t) => wr(async (t2) => {
  try {
    let n = await xt2(e, true, ci(t2));
    if (!n?.fileName) return null;
    let r = U();
    return { filePath: F(n.fileName), lineNumber: n.lineNumber ?? null, columnNumber: n.columnNumber ?? null, componentName: J(n.functionName, r) ?? mi(e._debugOwner, r), origin: R(n.fileName).origin };
  } catch {
    return null;
  }
}, null, void 0, t);
var gi = (e) => {
  let t = ai.get(e.element);
  if (t?.revision.matches(e.fiber)) return t.promise;
  let n = new AbortController(), r = hi(e.fiber, n.signal);
  if (!si(e.element, e)) return r;
  let i2 = { controller: n, promise: r, revision: e.revision };
  return ai.set(e.element, i2), t?.controller.abort(), i2.promise.then((t2) => {
    t2 || Qr(ai, e.element, i2);
  }), i2.promise;
};
var _i = async (e) => {
  let [t, n] = await Promise.all([gi(e), ui(e)]);
  return { fiber: e.fiber, fiberSource: t, stack: n };
};
var vi = (e, t) => {
  let n = U(), r = (e2, t2) => {
    let r2 = pi(e2);
    return r2?.fileName ? { filePath: F(r2.fileName), lineNumber: r2.lineNumber ?? null, columnNumber: r2.columnNumber ?? null, componentName: J(r2.functionName, n), origin: t2 } : null;
  }, i2 = t.filter((e2) => R(e2.fileName).origin === `app`), a = i2.filter((e2) => Y(e2.fileName));
  return e?.origin === `app` && Y(e.filePath) ? e : r(a, `app`) || (e?.origin === `app` && !sr(e.filePath) ? e : r(i2, `app`) || (e?.origin === `app` || e?.origin === `package` ? e : r(t.filter((e2) => R(e2.fileName).origin === `package`), `package`)));
};
var yi = async (e) => Z(e, () => null, async (e2) => {
  let t = await gi(e2);
  return t?.origin === `app` && Y(t.filePath) ? t : vi(t, await ui(e2) ?? []);
});
var bi = (e) => xi(X(e), 1)[0] ?? null;
var xi = (e, t, n = () => true) => {
  if (!yt()) return [];
  let r = Ut(e);
  if (!r) return [];
  let i2 = U(), a = [];
  return mt(xt(r), (e2) => {
    if (a.length >= t) return true;
    if (lt(e2)) {
      let t2 = vt(e2.type);
      t2 && qr(t2, i2) && n(t2) && a.push(t2);
    }
    return false;
  }, true), a;
};
var Si = [`/src/app/`, `/src/pages/`, `/app/`, `/pages/`];
var Ci = (e, t) => {
  let n = F(e);
  if (!t || !n.startsWith(`/`)) return n;
  for (let e2 of Si) {
    let t2 = n.indexOf(e2);
    if (t2 !== -1) return `/./${n.slice(t2 + 1)}`;
  }
  return n;
};
var wi = (e, t) => {
  let n = Ci(e.filePath, t), r = t && e.lineNumber ? `${n}:${e.lineNumber}${e.columnNumber ? `:${e.columnNumber}` : ``}` : n;
  return e.componentName ? `
  in ${e.componentName} (at ${r})` : `
  in ${r}`;
};
var Ti = { isAppSource: false, consumesBudget: false };
var Ei = (e, t, n, r) => {
  let i2 = t.packageName, a = t.origin === `app` ? e.fileName : null;
  if (e.isServer && !a && (n || !e.functionName)) {
    let e2 = i2 ? `${i2} at Server` : `at Server`;
    return { text: `
  in ${n ?? `<anonymous>`} (${e2})`, ...Ti };
  }
  return !a && n ? { text: i2 ? `
  in ${n} (${i2})` : `
  in ${n}`, ...Ti } : i2 ? { text: `
  in ${i2}`, ...Ti } : a ? { text: wi({ componentName: n, filePath: a, lineNumber: e.lineNumber ?? null, columnNumber: e.columnNumber ?? null }, r), isAppSource: true, consumesBudget: Y(a) } : null;
};
var Di = (e, t = {}, n = null) => {
  let r = $t(t.maxLines), i2 = Math.max(r, 20), a = U(), o = [], s = /* @__PURE__ */ new Set(), c = null, l = false, u2 = false, d2 = false, f2 = 0, ee2 = (e2) => {
    e2 && s.add(e2);
  };
  if (n) {
    let e2 = n.origin === `app` && Y(n.filePath);
    u2 = e2, e2 && (f2 += 1), ee2(n.componentName), o.push(wi(n, a));
  }
  for (let t2 of e) {
    if (!r || o.length >= i2) break;
    let e2 = R(t2.fileName), s2 = J(t2.functionName, a), p2 = e2.packageName ? `${e2.packageName}:${s2 ?? ``}:${t2.isServer ? `server` : `client`}` : null;
    if (p2 && p2 === c) continue;
    if (!l && s2 && s2 === n?.componentName) {
      l = true;
      continue;
    }
    let m = Ei(t2, e2, s2, a);
    m !== null && (m.consumesBudget && f2 >= r || m.text !== o[o.length - 1] && (m.isAppSource && m.consumesBudget && (u2 = true), m.consumesBudget && (f2 += 1, d2 = true), ee2(s2), o.push(m.text), c = p2));
  }
  return { text: o.join(``), shouldAppendSelectorHint: !u2, hasBudgetedStackFrame: d2, renderedComponentNames: s, remainingHardLineCapacity: Math.max(0, i2 - o.length) };
};
var Oi = (e, t) => {
  let n = vi(e, t);
  return n?.origin === `app` ? n : null;
};
var ki = (e, t, n) => {
  let r = Math.min(n, t.remainingHardLineCapacity);
  if (r === 0) return t;
  let i2 = U(), a = xi(X(e), r, (e2) => ei(e2, i2) && !t.renderedComponentNames.has(e2));
  return a.length === 0 ? t : { ...t, text: `${t.text}${fr(a)}`, remainingHardLineCapacity: t.remainingHardLineCapacity - a.length };
};
var Q = (e, t, n) => {
  let r = n.stack ?? [], i2 = Oi(n.fiberSource, r), a = $t(t.maxLines), o = Di(r, t, i2);
  if (o.text) return o.hasBudgetedStackFrame ? o : ki(e, o, a);
  let s = xi(X(e), a), c = Math.max(a, 20);
  return { text: fr(s), shouldAppendSelectorHint: true, hasBudgetedStackFrame: false, renderedComponentNames: new Set(s), remainingHardLineCapacity: Math.max(0, c - s.length) };
};
var Ai = (e, t = {}) => Z(e, () => Q(e, t, { fiber: null, fiberSource: null, stack: [] }), async (n) => Q(e, t, await _i(n)));
var ji = async (e, t = {}) => (await Ai(e, t)).text;
var $ = (e, t) => {
  let n = ri(e), r = n === null ? `` : `
  key: ${Zr(n)}`, i2 = t.shouldAppendSelectorHint ? H(ir(e)) : ar(e), a = i2 && Jr(t.shouldAppendSelectorHint, i2) ? i2.selector : null, o = a ? `
  selector: ${a}` : ``;
  return { selector: a, text: `${t.text}${r}${o}` };
};
var Mi = async (e, t = {}) => {
  let n = X(e);
  return `${zr(n)}${$(n, await Ai(n, t)).text}`;
};
var Ni = (e, t, n) => {
  let r = t.stack ?? [], i2 = vi(t.fiberSource, r);
  return { componentName: bi(e), fiber: t.fiber, source: i2, stack: r, stackContext: n.text };
};
var Pi = (e, t, n) => {
  let r = Q(e, t, n), i2 = X(e), a = $(i2, r);
  return { ...Ni(e, n, r), elementInfo: `${zr(i2)}${a.text}`, selector: a.selector };
};
var Fi = (e, t, n) => {
  let r = Q(e, t, n), i2 = $(e, r);
  return { ...Ni(e, n, r), referenceContext: `${Rr(e)}${i2.text.replace(/\n\s+/g, ` `)}` };
};
var Ii = (e, t, n) => Z(e, () => n(e, t, { fiber: null, fiberSource: null, stack: [] }), async (r) => n(e, t, await _i(r)));
var Li = (e, t = {}) => Ii(e, t, Pi);
var Ri = (e, t = {}) => Ii(e, t, Fi);
var zi = (e, t) => {
  let n = t?.componentName ?? `div`, r = { version: i, content: e, entries: t?.entries ?? [{ tagName: t?.tagName, componentName: n, content: e, commentText: t?.commentText }], timestamp: Date.now() }, i2 = (t2) => {
    t2.preventDefault(), t2.clipboardData?.setData(`text/plain`, e), t2.clipboardData?.setData(`text/html`, `<meta charset='utf-8'><pre><code>${K(e)}</code></pre>`), t2.clipboardData?.setData(`application/x-react-grab`, JSON.stringify(r));
  }, a = document.createElement(`textarea`);
  document.addEventListener(`copy`, i2);
  try {
    return a.value = e, a.style.position = `fixed`, a.style.left = `-9999px`, a.ariaHidden = `true`, document.body.appendChild(a), a.select(), typeof document.execCommand == `function` ? document.execCommand(`copy`) : false;
  } finally {
    document.removeEventListener(`copy`, i2), a.remove();
  }
};
var Bi = async (e, t) => {
  let n = U(), r = new URLSearchParams({ file: e }), i2 = n ? `line1` : `line`, a = n ? `column1` : `column`;
  t && r.set(i2, String(t)), r.set(a, `1`);
  let o = n ? `${pr()}/__nextjs_launch-editor` : `/__open-in-editor`;
  return (await fetch(`${o}?${r}`)).ok;
};
var Vi = async (e, t, n) => {
  try {
    let r = F(e);
    if (await Bi(r, t).catch(() => false)) return;
    let i2 = t ? `&line=${t}` : ``, a = `https://react-grab.com/open-file?url=${encodeURIComponent(r)}${i2}`, o = n ? n(a, r, t) : a;
    window.open(o, `_blank`, `noopener,noreferrer`);
  } catch (n2) {
    throw n2 instanceof Zt ? n2 : new Zt(e, t, n2);
  }
};

export {
  U,
  zr,
  di,
  fi,
  yi,
  bi,
  ji,
  Mi,
  Li,
  Ri,
  zi,
  Vi
};
//# sourceMappingURL=chunk-UZ3NOUD3.js.map
