const Dr = "2.4.7";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = globalThis, Ti = Gt.ShadowRoot && (Gt.ShadyCSS === void 0 || Gt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Hi = Symbol(), ln = /* @__PURE__ */ new WeakMap();
let Gn = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Hi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ti && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ln.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ln.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pr = (r) => new Gn(typeof r == "string" ? r : r + "", void 0, Hi), T = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Gn(t, r, Hi);
}, Rr = (r, e) => {
  if (Ti) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Gt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, cn = Ti ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Pr(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Fr, defineProperty: Gr, getOwnPropertyDescriptor: Wr, getOwnPropertyNames: Ur, getOwnPropertySymbols: Ir, getPrototypeOf: Br } = Object, ii = globalThis, dn = ii.trustedTypes, jr = dn ? dn.emptyScript : "", qr = ii.reactiveElementPolyfillSupport, wt = (r, e) => r, Ut = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? jr : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Oi = (r, e) => !Fr(r, e), hn = { attribute: !0, type: String, converter: Ut, reflect: !1, useDefault: !1, hasChanged: Oi };
Symbol.metadata ??= Symbol("metadata"), ii.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ke = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = hn) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Gr(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = Wr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: n, set(o) {
      const l = n?.call(this);
      s?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? hn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(wt("elementProperties"))) return;
    const e = Br(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(wt("properties"))) {
      const t = this.properties, i = [...Ur(t), ...Ir(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(cn(n));
    } else e !== void 0 && t.push(cn(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Ut).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ut;
      this._$Em = n;
      const l = o.fromAttribute(t, s.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (s = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Oi)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: o } = s, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ke.elementStyles = [], Ke.shadowRootOptions = { mode: "open" }, Ke[wt("elementProperties")] = /* @__PURE__ */ new Map(), Ke[wt("finalized")] = /* @__PURE__ */ new Map(), qr?.({ ReactiveElement: Ke }), (ii.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Di = globalThis, pn = (r) => r, It = Di.trustedTypes, un = It ? It.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Wn = "$lit$", we = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + we, Vr = `<${Un}>`, We = document, $t = () => We.createComment(""), kt = (r) => r === null || typeof r != "object" && typeof r != "function", Pi = Array.isArray, Zr = (r) => Pi(r) || typeof r?.[Symbol.iterator] == "function", bi = `[ 	
\f\r]`, mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fn = /-->/g, gn = />/g, Pe = RegExp(`>|${bi}(?:([^\\s"'>=/]+)(${bi}*=${bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mn = /'/g, yn = /"/g, In = /^(?:script|style|textarea|title)$/i, Bn = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), c = Bn(1), w = Bn(2), Qe = Symbol.for("lit-noChange"), U = Symbol.for("lit-nothing"), _n = /* @__PURE__ */ new WeakMap(), Fe = We.createTreeWalker(We, 129);
function jn(r, e) {
  if (!Pi(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return un !== void 0 ? un.createHTML(e) : e;
}
const Kr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = mt;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let h, d, p = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, d = o.exec(a), d !== null); ) g = o.lastIndex, o === mt ? d[1] === "!--" ? o = fn : d[1] !== void 0 ? o = gn : d[2] !== void 0 ? (In.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = Pe) : d[3] !== void 0 && (o = Pe) : o === Pe ? d[0] === ">" ? (o = n ?? mt, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? Pe : d[3] === '"' ? yn : mn) : o === yn || o === mn ? o = Pe : o === fn || o === gn ? o = mt : (o = Pe, n = void 0);
    const f = o === Pe && r[l + 1].startsWith("/>") ? " " : "";
    s += o === mt ? a + Vr : p >= 0 ? (i.push(h), a.slice(0, p) + Wn + a.slice(p) + we + f) : a + we + (p === -2 ? l : f);
  }
  return [jn(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let Ci = class qn {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [h, d] = Kr(e, t);
    if (this.el = qn.createElement(h, i), Fe.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = Fe.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(Wn)) {
          const g = d[o++], f = n.getAttribute(p).split(we), b = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: s, name: b[2], strings: f, ctor: b[1] === "." ? Qr : b[1] === "?" ? Xr : b[1] === "@" ? Jr : ni }), n.removeAttribute(p);
        } else p.startsWith(we) && (a.push({ type: 6, index: s }), n.removeAttribute(p));
        if (In.test(n.tagName)) {
          const p = n.textContent.split(we), g = p.length - 1;
          if (g > 0) {
            n.textContent = It ? It.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(p[f], $t()), Fe.nextNode(), a.push({ type: 2, index: ++s });
            n.append(p[g], $t());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Un) a.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(we, p + 1)) !== -1; ) a.push({ type: 7, index: s }), p += we.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = We.createElement("template");
    return i.innerHTML = e, i;
  }
};
function Xe(r, e, t = r, i) {
  if (e === Qe) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = kt(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = Xe(r, n._$AS(r, e.values), n, i)), e;
}
let Yr = class {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? We).importNode(t, !0);
    Fe.currentNode = n;
    let s = Fe.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new Ri(s, s.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (h = new es(s, this, e)), this._$AV.push(h), a = i[++l];
      }
      o !== a?.index && (s = Fe.nextNode(), o++);
    }
    return Fe.currentNode = We, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}, Ri = class Vn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = U, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Xe(this, e, t), kt(e) ? e === U || e == null || e === "" ? (this._$AH !== U && this._$AR(), this._$AH = U) : e !== this._$AH && e !== Qe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Zr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== U && kt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(We.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ci.createElement(jn(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const s = new Yr(n, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = _n.get(e.strings);
    return t === void 0 && _n.set(e.strings, t = new Ci(e)), t;
  }
  k(e) {
    Pi(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new Vn(this.O($t()), this.O($t()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = pn(e).nextSibling;
      pn(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, ni = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = U, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = U;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = Xe(this, e, t, 0), o = !kt(e) || e !== this._$AH && e !== Qe, o && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = s[0], a = 0; a < s.length - 1; a++) h = Xe(this, l[i + a], t, a), h === Qe && (h = this._$AH[a]), o ||= !kt(h) || h !== this._$AH[a], h === U ? e = U : e !== U && (e += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === U ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, Qr = class extends ni {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === U ? void 0 : e;
  }
}, Xr = class extends ni {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== U);
  }
}, Jr = class extends ni {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Xe(this, e, t, 0) ?? U) === Qe) return;
    const i = this._$AH, n = e === U && i !== U || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== U && (i === U || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, es = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Xe(this, e);
  }
};
const ts = Di.litHtmlPolyfillSupport;
ts?.(Ci, Ri), (Di.litHtmlVersions ??= []).push("3.3.3");
const is = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = n = new Ri(e.insertBefore($t(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fi = globalThis;
let N = class extends Ke {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = is(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Qe;
  }
};
N._$litElement$ = !0, N.finalized = !0, Fi.litElementHydrateSupport?.({ LitElement: N });
const ns = Fi.litElementPolyfillSupport;
ns?.({ LitElement: N });
(Fi.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = { attribute: !0, type: String, converter: Ut, reflect: !1, hasChanged: Oi }, ss = (r = rs, e, t) => {
  const { kind: i, metadata: n } = t;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), s.set(t.name, r), i === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function m(r) {
  return (e, t) => typeof t == "object" ? ss(r, e, t) : ((i, n, s) => {
    const o = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(r) {
  return m({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const os = (r, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(r, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function as(r, e) {
  return (t, i, n) => {
    const s = (o) => o.renderRoot?.querySelector(r) ?? null;
    return os(t, i, { get() {
      return s(this);
    } });
  };
}
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, oe = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? cs(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ls(e, t, n), n;
};
let Q = class extends N {
  constructor() {
    super(...arguments), this.forecast = [], this.forecastLoading = !1, this.show_forecast = !0, this.config = {}, this.compact = !1, this.startTomorrow = !1, this.maxDays = 7, this.alignRight = !1;
  }
  render() {
    const r = /* @__PURE__ */ new Date();
    r.setHours(0, 0, 0, 0);
    let e = Array.isArray(this.forecast) ? [...this.forecast] : [];
    this.startTomorrow && e.length > 0 && (e = e.filter((n) => {
      try {
        const s = new Date(n.datetime ?? n.date ?? "");
        return isNaN(s.getTime()) ? !0 : (s.setHours(0, 0, 0, 0), s.getTime() > r.getTime());
      } catch {
        return !0;
      }
    })), typeof this.maxDays == "number" && this.maxDays > 0 && (e = e.slice(0, this.maxDays));
    const t = ["forecast-section", this.compact ? "compact" : ""].filter(Boolean).join(" "), i = ["forecast-grid", this.compact ? "compact" : ""].filter(Boolean).join(" ");
    return this.config.show_forecast !== !1 ? this.forecastLoading && this.forecast.length === 0 ? c`
            <div class="${t}">
              <div class="section-title">
                <ha-icon icon="mdi:calendar"></ha-icon>
                ${this._t("hourly_charts.7d_forecast")}
                <small
                  style="font-size: 12px; color: var(--secondary-text-color, #666); margin-left: 10px;"
                  >${this._t("hourly_charts.loading")}</small
                >
              </div>
              <div
                style="text-align: center; padding: 20px; color: var(--secondary-text-color, #666); font-style: italic;"
              >
                ⏳ ${this._t("hourly_charts.loading_forecast")}<br />
                <small>Service: weather.get_forecasts</small>
              </div>
            </div>
          ` : e.length > 0 ? c`
              <div class="wrapper ${this.alignRight ? "align-right" : ""}">
                <div class="${t}">
                  ${this.compact ? c`` : c`
                          <div class="section-title">
                            <ha-icon icon="mdi:calendar"></ha-icon>
                            ${e.length === 7 ? this._t("hourly_charts.7d_forecast") : this._t("hourly_charts.xd_forecast", { days: e.length })}
                            <small
                              style="font-size: 12px; color: var(--secondary-text-color, #666); margin-left: 10px;"
                            >
                              (${e.length} ${this._t("hourly_charts.days_available")})
                            </small>
                          </div>
                        `}
                  <div class="${i}">
                    ${e.map(
      (n) => c`
                        <div class="forecast-day ${this.compact ? "compact" : ""}">
                          <div class="forecast-date ${this.compact ? "compact" : ""}">
                            ${this.formatDate(n.datetime ?? n.date)}
                          </div>
                          <div class="forecast-icon ${this.compact ? "compact" : ""}">
                            ${this.getWeatherIcon(
        n.condition,
        this.config.enable_animate_weather_icons ? "animated" : "mdi",
        this.compact ? "20px" : "24px",
        !0
      )}
                          </div>
                          <div class="forecast-temps ${this.compact ? "compact" : ""}">
                            <span class="temp-high">${Math.round(n.temperature)}°</span>
                            <span class="temp-low"
                              >${Math.round(
        n.templow ?? n.temperature - 5
      )}°</span
                            >
                          </div>
                        </div>
                      `
    )}
                  </div>
                </div>
              </div>
            ` : c`
              <div class="${t}">
                <div class="section-title">
                  <ha-icon icon="mdi:calendar"></ha-icon>
                  ${this._t("hourly_charts.7d_forecast")}
                  <small style="font-size: 12px; color: #666; margin-left: 10px;">
                    (0 ${this._t("hourly_charts.days_available")})
                  </small>
                </div>
                <div style="text-align: center; padding: 20px; color: #666; font-style: italic;">
                  ⚠️ ${this._t("hourly_charts.no_forecast_data")}<br />
                  <small>Entity: ${this.config.entity}</small><br />
                  <small>${this._t("hourly_charts.check_devtools")}</small><br />
                  <small style="color: #999;">${this._t("hourly_charts.try_other_entity")}</small>
                </div>
              </div>
            ` : c``;
  }
};
Q.styles = T`
    .wrapper {
      display: block;
      width: 100%;
    }
    .wrapper.align-right {
      display: flex;
      justify-content: flex-end;
    }

    .forecast-section {
      margin-top: 20px;
    }
    .forecast-section.compact {
      margin-top: 8px;
      padding: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }

    .forecast-7days {
      background: var(--code-editor-background-color, #f8f8f8);
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
    }
    .forecast-grid.compact {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: stretch;
      gap: 8px;
      overflow: hidden; /* keep within BG card */
      padding: 0;
      margin: 0;
    }

    .forecast-day {
      background: var(--card-background-color, rgba(255, 255, 255, 0.6));
      border-radius: 10px;
      padding: 12px 8px;
      text-align: center;
      border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
    }
    .forecast-day.compact {
      border-radius: 8px;
      padding: 8px 6px;
      width: 64px;
      min-width: 64px;
      box-sizing: border-box;
    }

    .forecast-date {
      font-size: 12px;
      color: var(--secondary-text-color, #7f8c8d);
      margin-bottom: 8px;
    }
    .forecast-date.compact {
      font-size: 10px;
      margin-bottom: 4px;
    }

    .forecast-icon {
      font-size: 24px;
      margin: 8px 0;
    }
    .forecast-icon.compact {
      font-size: 18px;
      margin: 4px 0;
    }

    .forecast-temps {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .forecast-temps.compact {
      font-size: 11px;
    }

    .temp-high {
      font-weight: bold;
      color: var(--material-error-text-color, #e74c3c);
    }

    .temp-low {
      color: var(--secondary-text-color, #00aaff);
    }
    @media (max-width: 768px) {
      .forecast-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Extra compact on very small screens to keep margins */
    @media (max-width: 400px) {
      .forecast-grid.compact {
        gap: 6px;
      }
      .forecast-day.compact {
        width: 56px;
        min-width: 56px;
      }
      .forecast-icon.compact {
        font-size: 16px;
      }
      .forecast-temps.compact {
        font-size: 10px;
      }
    }
  `;
oe([
  m({ type: Array })
], Q.prototype, "forecast", 2);
oe([
  m({ type: Boolean })
], Q.prototype, "forecastLoading", 2);
oe([
  m({ type: Boolean })
], Q.prototype, "show_forecast", 2);
oe([
  m({ type: Object })
], Q.prototype, "config", 2);
oe([
  m({ type: Function })
], Q.prototype, "_t", 2);
oe([
  m({ type: Function })
], Q.prototype, "getWeatherIcon", 2);
oe([
  m({ type: Function })
], Q.prototype, "formatDate", 2);
oe([
  m({ type: Boolean })
], Q.prototype, "compact", 2);
oe([
  m({ type: Boolean })
], Q.prototype, "startTomorrow", 2);
oe([
  m({ type: Number })
], Q.prototype, "maxDays", 2);
oe([
  m({ type: Boolean })
], Q.prototype, "alignRight", 2);
Q = oe([
  H("daily-forecast-chart")
], Q);
var ds = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, lt = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? hs(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ds(e, t, n), n;
};
let Ce = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_temperature = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".chart-svg-area");
    r && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const n = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        n > 0 && n !== this._measuredWidth && (this._measuredWidth = n, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(r));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_temperature === !1) return c``;
    const e = this.hourlyForecast.slice(0, this.forecastHours).map(
      (i) => typeof i.temperature == "number" && !isNaN(i.temperature) ? i.temperature : null
    ), t = e.filter((i) => i !== null);
    return c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          ${this._t("hourly_charts.temperature_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >°C</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      if (t.length < 2) return c``;
      const i = e.length, n = this._measuredWidth > 0 ? this._measuredWidth : 600, s = this._measuredHeight > 0 ? this._measuredHeight : 100, o = 28, l = 6, a = 8, h = 18, d = n - o - l, p = s - a - h;
      let g = Math.floor(Math.min(...t) / 5) * 5, f = Math.ceil(Math.max(...t) / 5) * 5;
      g === f && (g -= 5, f += 5);
      const b = f - g, C = d / (i - 1), v = (k) => o + k * C, E = (k) => a + p - (k - g) / b * p, D = [];
      for (let k = g; k <= f; k += 5) {
        const x = E(k), M = k % 10 === 0;
        D.push(w`
                <line x1="${o}" y1="${x}" x2="${n - l}" y2="${x}"
                  stroke="#888" stroke-width="${M ? 1 : 0.6}"
                  stroke-dasharray="${M ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${o - 3}" y="${x}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${k}°</text>
              `);
      }
      const P = [];
      for (let k = 0; k < i; k++) {
        const x = v(k), M = this.hourlyForecast[k], O = M?.datetime ? new Date(M.datetime) : null;
        ((O ? O.getHours() % 3 === 0 : !1) || i <= 8) && P.push(w`
                  <line x1="${x}" y1="${a}" x2="${x}" y2="${a + p}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${x}" y="${s - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${O ? O.getHours() + "h" : ""}
                  </text>
                `);
      }
      const q = e.map((k, x) => k !== null ? `${v(x)},${E(k)}` : "").filter(Boolean).join(" "), W = e.map(
        (k, x) => k !== null ? w`<circle cx="${v(x)}" cy="${E(k)}" r="2.5" fill="#db4a34"/>` : null
      );
      return w`<svg width="100%" height="100%" viewBox="0 0 ${n} ${s}" style="display:block;">
              <defs>
                <filter id="hourly-temp-shadow" x="-5%" y="-10%" width="110%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#000000" flood-opacity="0.4"/>
                </filter>
              </defs>
              <g filter="url(#hourly-temp-shadow)">
              ${D}
              ${P}
              <polyline points="${q}" fill="none" stroke="#db4a34" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
              ${W}
              </g>
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
Ce.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 100px;
    }
  `;
lt([
  m({ type: Array })
], Ce.prototype, "hourlyForecast", 2);
lt([
  m({ type: Number })
], Ce.prototype, "forecastHours", 2);
lt([
  m({ type: Boolean })
], Ce.prototype, "show_temperature", 2);
lt([
  m({ type: Function })
], Ce.prototype, "_t", 2);
lt([
  m({ type: Function })
], Ce.prototype, "showHoursChartLabel", 2);
Ce = lt([
  H("forecast-temperature-chart")
], Ce);
var ps = Object.defineProperty, us = Object.getOwnPropertyDescriptor, ct = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? us(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ps(e, t, n), n;
};
let Ae = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_precipitation = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".chart-svg-area");
    r && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const n = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        n > 0 && n !== this._measuredWidth && (this._measuredWidth = n, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(r));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_precipitation === !1) return c``;
    const r = this.hourlyForecast.slice(0, this.forecastHours), e = r.some((t) => typeof t.precipitation == "number" && !isNaN(t.precipitation));
    return this.hourlyForecast.length === 0 || !e ? c`
        <div class="chart">
          <div class="section-title">
            <ha-icon icon="mdi:weather-pouring"></ha-icon>
            ${this._t("hourly_charts.precipitation_hours", { hours: this.forecastHours })}
          </div>
          <div style="text-align:center; color:#888; padding:16px; font-size:14px;">
            ${this._t("hourly_charts.no_precipitation_data")}
          </div>
        </div>
      ` : c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:weather-pouring"></ha-icon>
          ${this._t("hourly_charts.precipitation_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >mm</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      const t = r.length;
      if (t === 0) return c``;
      const i = this._measuredWidth > 0 ? this._measuredWidth : 600, n = this._measuredHeight > 0 ? this._measuredHeight : 100, s = 28, o = 6, l = 8, a = 18, h = i - s - o, d = n - l - a, p = r.map(
        (x) => typeof x.precipitation == "number" && !isNaN(x.precipitation) ? x.precipitation : 0
      ), g = Math.max(5, Math.ceil(Math.max(...p))), f = g, b = (x) => l + d - x / f * d, C = h / t, v = (x) => s + x * C + C / 2, E = [1, 2, 3, 5, 8, 10, 15, 20].filter((x) => x <= g);
      E.includes(g) || E.push(g);
      const D = [];
      for (const x of E) {
        const M = b(x), O = x % 5 === 0;
        D.push(w`
                <line x1="${s}" y1="${M}" x2="${i - o}" y2="${M}"
                  stroke="#888" stroke-width="${O ? 1 : 0.6}"
                  stroke-dasharray="${O ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${s - 3}" y="${M}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${x}</text>
              `);
      }
      D.push(w`
              <line x1="${s}" y1="${b(0)}" x2="${i - o}" y2="${b(0)}"
                stroke="#888" stroke-width="1" opacity="0.5"/>
              <text x="${s - 3}" y="${b(0)}" text-anchor="end" dominant-baseline="middle"
                font-size="8" fill="#888" opacity="0.8">0</text>
            `);
      const P = [];
      for (let x = 0; x < t; x++) {
        const M = v(x), O = r[x]?.datetime ? new Date(r[x].datetime) : null;
        (O ? O.getHours() % 3 === 0 : t <= 8) && P.push(w`
                  <line x1="${M}" y1="${l}" x2="${M}" y2="${l + d}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${M}" y="${n - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${O ? O.getHours() + "h" : ""}
                  </text>
                `);
      }
      const q = [], W = [], k = Math.max(2, C * 0.55);
      for (let x = 0; x < t; x++) {
        const M = r[x], O = v(x) - k / 2, $ = typeof M.precipitation_probability == "number" && !isNaN(M.precipitation_probability) ? M.precipitation_probability : 0, F = typeof M.precipitation == "number" && !isNaN(M.precipitation) ? M.precipitation : 0, K = $ / 100 * 5 / f * d;
        if ($ > 0 && q.push(w`
                  <rect x="${O}" y="${b(0) - K}" width="${k}" height="${K}"
                    fill="#87898e" opacity="0.35" rx="1.5"/>
                `), F > 0) {
          const te = F / f * d;
          W.push(w`
                  <rect x="${O}" y="${b(0) - te}" width="${k}" height="${te}"
                    fill="url(#precip-grad)" opacity="1" rx="1.5"/>
                `);
        }
      }
      return w`<svg width="100%" height="100%" viewBox="0 0 ${i} ${n}" style="display:block;">
              <defs>
                <linearGradient id="precip-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#3498db"/>
                  <stop offset="100%" stop-color="#85c5e5"/>
                </linearGradient>
              </defs>
              ${D}
              ${P}
              ${q}
              ${W}
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
Ae.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 100px;
    }
  `;
ct([
  m({ type: Array })
], Ae.prototype, "hourlyForecast", 2);
ct([
  m({ type: Number })
], Ae.prototype, "forecastHours", 2);
ct([
  m({ type: Boolean })
], Ae.prototype, "show_precipitation", 2);
ct([
  m({ type: Function })
], Ae.prototype, "_t", 2);
ct([
  m({ type: Function })
], Ae.prototype, "showHoursChartLabel", 2);
Ae = ct([
  H("precipitation-chart")
], Ae);
var fs = Object.defineProperty, gs = Object.getOwnPropertyDescriptor, Ee = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? gs(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && fs(e, t, n), n;
};
let de = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_sunshine = !0;
  }
  render() {
    return this.show_sunshine !== !1 ? this.hourlyForecast.length > 0 && this.hourlyForecast.slice(0, this.forecastHours).some((r) => {
      const e = r;
      return typeof e.sunshine == "number" && !isNaN(e.sunshine) || typeof e.sunshine_duration == "number" && !isNaN(e.sunshine_duration);
    }) ? c`
            <div class="chart-sunshine" style="position:relative;">
              <div class="section-title">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                ${this._t("hourly_charts.sunshine_hours", { hours: this.forecastHours })}
                <span
                  style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
                  >min</span
                >
              </div>
              <div class="chart-bars" style="position:relative;">
                ${(() => {
      const r = this.weatherEntity?.attributes?.sunrise ? new Date(this.weatherEntity.attributes.sunrise) : this.sun_entity?.attributes?.next_rising ? new Date((this.sun_entity?.attributes).next_rising) : null, e = this.weatherEntity?.attributes?.sunset ? new Date(this.weatherEntity.attributes.sunset) : this.sun_entity?.attributes?.next_setting ? new Date((this.sun_entity?.attributes).next_setting) : null, t = this.hourlyForecast[0]?.datetime ? new Date(this.hourlyForecast[0].datetime) : null;
      let i = -1, n = -1;
      return r && t && (i = Math.round(
        (r.getTime() - t.getTime()) / (3600 * 1e3)
      )), e && t && (n = Math.round(
        (e.getTime() - t.getTime()) / (3600 * 1e3)
      )), c`
                    ${i >= 0 && i < this.forecastHours ? c`
                            <div
                              style="position:absolute;left:calc(${i / this.forecastHours * 100}% - 10px);top:0;height:100%;width:20px;pointer-events:none;z-index:2;display:flex;flex-direction:column;align-items:center;"
                            >
                              <ha-icon
                                icon="mdi:weather-sunset-up"
                                style="color:#fbc02d;font-size:18px;"
                              ></ha-icon>
                              <span style="font-size:10px;color:#fbc02d">
                                ${r ? r.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) : ""}</span
                              >
                            </div>
                          ` : ""}
                    ${n >= 0 && n < this.forecastHours ? c`
                            <div
                              style="position:absolute;left:calc(${n / this.forecastHours * 100}% - 10px);top:0;height:100%;width:20px;pointer-events:none;z-index:2;display:flex;flex-direction:column;align-items:center;"
                            >
                              <ha-icon
                                icon="mdi:weather-sunset-down"
                                style="color:#fbc02d;font-size:18px;"
                              ></ha-icon>
                              <span style="font-size:10px;color:#fbc02d;">
                                ${e ? e.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) : ""}</span
                              >
                            </div>
                          ` : ""}
                  `;
    })()}
                ${this.hourlyForecast.slice(0, this.forecastHours).map((r) => {
      const e = r, t = typeof e.sunshine == "number" && !isNaN(e.sunshine) ? e.sunshine : typeof e.sunshine_duration == "number" && !isNaN(e.sunshine_duration) ? e.sunshine_duration : null, i = t !== null ? Math.round(t) : 2;
      return c`
                    <div
                      style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end;"
                    >
                      <span
                        style="font-size:11px; color:#fbc02d; margin-bottom:2px; min-height:16px; font-variant-numeric:tabular-nums;"
                      >
                        ${t !== null ? t.toFixed(0) : ""}
                      </span>
                      <div class="chart-bar-sunshine" style="height: ${i}px;"></div>
                    </div>
                  `;
    })}
              </div>
              <div
                style="display:flex; justify-content:space-between; font-size:11px; color:var(--secondary-text-color, #888); margin-top:4px;"
              >
                ${this.hourlyForecast.slice(0, this.forecastHours).map((r) => {
      const e = r.datetime ? new Date(r.datetime) : null, t = e ? e.getHours() % 3 === 0 : !1;
      return c`<div style="flex:1; text-align:center; overflow:hidden;">
                    ${t && e ? e.getHours() + "h" : ""}
                  </div>`;
    })}
              </div>
            </div>
          ` : c`
            <div class="chart">
              <div class="section-title">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                ${this._t("hourly_charts.sunshine_hours", { hours: this.forecastHours })}
              </div>
              <div style="text-align:center; color:#888; padding:16px; font-size:14px;">
                ${this._t("hourly_charts.no_sunshine_data")}
              </div>
            </div>
          ` : c``;
  }
};
de.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chart-sunshine {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-bars {
      display: flex;
      justify-content: space-between;
      height: 80px;
      margin-bottom: 10px;
    }

    .chart-bar-sunshine {
      width: 18px;
      background: linear-gradient(to top, #ffe082, #fbc02d);
      border-radius: 2px 2px 0 0;
      min-height: 2px;
    }

    .chart-line {
      display: flex;
      justify-content: space-between;
      height: 60px;
      margin-bottom: 10px;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--secondary-text-color, #000);
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }

    .forecast-section {
      margin-top: 20px;
    }

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: var(--primary-text-color, #fff);
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;
Ee([
  m({ type: Array })
], de.prototype, "hourlyForecast", 2);
Ee([
  m({ type: Number })
], de.prototype, "forecastHours", 2);
Ee([
  m({ type: Boolean })
], de.prototype, "show_sunshine", 2);
Ee([
  m({ type: Object })
], de.prototype, "weatherEntity", 2);
Ee([
  m({ type: Object })
], de.prototype, "sun_entity", 2);
Ee([
  m({ type: Function })
], de.prototype, "_t", 2);
Ee([
  m({ type: Function })
], de.prototype, "showHoursChartLabel", 2);
de = Ee([
  H("sunshine-chart")
], de);
var ms = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, dt = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? ys(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ms(e, t, n), n;
};
let Se = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastHours = 12, this.show_wind = !0, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  firstUpdated() {
    const r = this.renderRoot.querySelector(".chart-svg-area");
    r && (this._resizeObserver = new ResizeObserver((e) => {
      let t = !1;
      for (const i of e) {
        const n = Math.floor(i.contentRect.width), s = Math.floor(i.contentRect.height);
        n > 0 && n !== this._measuredWidth && (this._measuredWidth = n, t = !0), s > 0 && s !== this._measuredHeight && (this._measuredHeight = s, t = !0);
      }
      t && this.requestUpdate();
    }), this._resizeObserver.observe(r));
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    if (this.show_wind === !1) return c``;
    const r = this.hourlyForecast.slice(0, this.forecastHours), e = r.some((t) => typeof t.wind_speed == "number" && !isNaN(t.wind_speed));
    return r.length === 0 || !e ? c`` : c`
      <div class="chart">
        <div class="section-title">
          <ha-icon icon="mdi:weather-windy"></ha-icon>
          ${this._t("hourly_charts.wind_hours", { hours: this.forecastHours })}
          <span style="font-size:12px; font-weight:normal; color:var(--secondary-text-color, #888);"
            >km/h</span
          >
        </div>
        <div class="chart-svg-area">
          ${(() => {
      const t = r.length;
      if (t < 2) return c``;
      const i = this._measuredWidth > 0 ? this._measuredWidth : 600, n = 22, s = this._measuredHeight > 0 ? this._measuredHeight : 100 + n, o = 28, l = 6, a = 8, h = 18 + n, d = i - o - l, p = s - a - h, g = r.map(
        ($) => typeof $.wind_speed == "number" && !isNaN($.wind_speed) ? $.wind_speed : null
      ), f = g.filter(($) => $ !== null), b = Math.max(10, Math.ceil(Math.max(...f) / 5) * 5), C = b, v = ($) => a + p - $ / C * p, E = d / (t - 1), D = ($) => o + $ * E, P = [];
      for (let $ = 0; $ <= b; $ += 5) {
        const F = v($), R = $ % 10 === 0;
        P.push(w`
                <line x1="${o}" y1="${F}" x2="${i - l}" y2="${F}"
                  stroke="#888" stroke-width="${R ? 1 : 0.6}"
                  stroke-dasharray="${R ? "4,3" : "2,3"}" opacity="0.6"/>
                <text x="${o - 3}" y="${F}" text-anchor="end" dominant-baseline="middle"
                  font-size="8" fill="#888" opacity="0.8">${$}</text>
              `);
      }
      const q = [];
      for (let $ = 0; $ < t; $++) {
        const F = D($), R = r[$]?.datetime ? new Date(r[$].datetime) : null;
        (R ? R.getHours() % 3 === 0 : t <= 8) && q.push(w`
                  <line x1="${F}" y1="${a}" x2="${F}" y2="${a + p}"
                    stroke="#888" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.3"/>
                  <text x="${F}" y="${s - n - 2}" text-anchor="middle"
                    font-size="8" fill="#888" opacity="0.7">
                    ${R ? R.getHours() + "h" : ""}
                  </text>
                `);
      }
      const W = g.map(($, F) => $ !== null ? `${D(F)},${v($)}` : "").filter(Boolean).join(" "), k = g.map(
        ($, F) => $ !== null ? w`<circle cx="${D(F)}" cy="${v($)}" r="2.5" fill="#44739e"/>` : null
      ), x = s - n / 2 + 2, M = 7, O = r.map(($, F) => {
        const R = typeof $.wind_bearing == "number" && !isNaN($.wind_bearing) ? $.wind_bearing : null;
        if (R === null) return null;
        const K = D(F), te = x, ie = (R - 90) * (Math.PI / 180), fi = K + M * Math.cos(ie), ce = te + M * Math.sin(ie), He = ie + Math.PI, gi = K + (M - 2) * Math.cos(He), mi = te + (M - 2) * Math.sin(He);
        return w`
                <circle cx="${K}" cy="${te}" r="${M}" fill="none" stroke="#44739e" stroke-width="0.8" opacity="0.5"/>
                <line x1="${gi}" y1="${mi}" x2="${fi}" y2="${ce}"
                  stroke="#44739e" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>
                <circle cx="${fi}" cy="${ce}" r="1.5" fill="#44739e" opacity="0.85"/>
              `;
      });
      return w`<svg width="100%" height="100%" viewBox="0 0 ${i} ${s}" style="display:block;">
              ${P}
              ${q}
              <polyline points="${W}" fill="none" stroke="#44739e" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
              ${k}
              ${O}
            </svg>`;
    })()}
        </div>
      </div>
    `;
  }
};
Se.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .chart {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: var(--chart-padding, 15px);
      margin-top: var(--chart-margin-top, 15px);
      margin-bottom: var(--chart-margin-bottom, 0);
      border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title ha-icon {
      color: var(--primary-text-color, #fff);
      font-size: 20px;
    }
    .chart-svg-area {
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      flex: 1;
      min-height: 122px;
    }
  `;
dt([
  m({ type: Array })
], Se.prototype, "hourlyForecast", 2);
dt([
  m({ type: Number })
], Se.prototype, "forecastHours", 2);
dt([
  m({ type: Boolean })
], Se.prototype, "show_wind", 2);
dt([
  m({ type: Function })
], Se.prototype, "_t", 2);
dt([
  m({ type: Function })
], Se.prototype, "showHoursChartLabel", 2);
Se = dt([
  H("wind-chart")
], Se);
var _s = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, ht = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? bs(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && _s(e, t, n), n;
};
let Me = class extends N {
  constructor() {
    super(...arguments), this.forecast = [], this.hourlyForecast = [], this.standalone = !1, this._measuredWidth = 0, this._measuredHeight = 0;
  }
  // fallback function to get a CSS variable with a default value
  getCSSVariable(r, e = "50") {
    const t = getComputedStyle(document.documentElement).getPropertyValue(r).trim();
    return Number.parseInt(t || e);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObserver = new ResizeObserver((r) => {
      for (const e of r) {
        const t = Math.floor(e.contentRect.width), i = Math.floor(e.contentRect.height);
        i > 0 && i !== this._measuredHeight && (this._measuredHeight = i, this.requestUpdate()), t > 0 && t !== this._measuredWidth && (this._measuredWidth = t, this.requestUpdate());
      }
    }), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect(), this._resizeObserver = void 0, super.disconnectedCallback();
  }
  render() {
    const r = this.forecast.slice(0, 7), e = this.hourlyForecast.slice(0, r.length * 24);
    if (!e.length) return c`<div>No hourly forecast available</div>`;
    const t = r.length, n = (this.standalone ? this.config.grid_options?.rows || 3 : 2) * 64 - 8, s = this.standalone ? this._measuredHeight > 0 ? this._measuredHeight : n : 200;
    let o = this._measuredWidth;
    if (!o) {
      const y = this.getBoundingClientRect?.();
      o = y?.width ? Math.floor(y.width) : 400;
    }
    const l = o, a = s, h = 16, d = a - h * 2, p = 0, g = 0, f = h + p, b = l - h - g, v = Math.max(0, b - f) / t, P = Math.min(
      120,
      Math.max(80, d * 0.35)
    ), q = Math.max(10, d * 0.05), W = d - P - q, k = Math.min(v * 0.7, P * 0.4), x = Math.max(9, Math.round(P * 0.075)), M = Math.max(11, Math.round(P * 0.11)), O = this.config?.diagram_labels ?? "compact", $ = Math.max(8, Math.min(10, Math.round(W * 0.05))), R = h + 10 + x, K = R + 10, te = K + k + 10, ie = h + P + q, ce = v / 24, He = e.map((y) => typeof y.temperature == "number" ? y.temperature : null), gi = Math.min(...He.filter((y) => y !== null)), mi = Math.max(...He.filter((y) => y !== null)), be = ie, ue = ie + W, zr = e.map((y) => {
      const _ = y;
      return typeof _.precipitation == "number" ? _.precipitation : typeof _.rain == "number" ? _.rain : 0;
    }), Lr = e.map((y) => {
      const _ = y, A = typeof _.precipitation_probability == "number" ? _.precipitation_probability : typeof _.probability_of_precipitation == "number" ? _.probability_of_precipitation : typeof _.pop == "number" ? _.pop <= 1 ? _.pop * 100 : _.pop : 0, S = Number(A);
      return Number.isFinite(S) ? Math.max(0, Math.min(100, S)) : 0;
    }), Ji = {};
    r.forEach((y, _) => {
      const A = new Date(y.datetime), S = `${A.getFullYear()}-${A.getMonth()}-${A.getDate()}`;
      Ji[S] = _;
    });
    function Er(y) {
      const _ = `${y.getFullYear()}-${y.getMonth()}-${y.getDate()}`, A = Ji[_], S = y.getHours();
      return {
        dayIdx: A !== void 0 ? A : -1,
        hourInDay: S >= 0 && S < 24 ? S : -1
      };
    }
    const ut = {};
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`;
        ut[A] = null;
      }
    e.forEach((y, _) => {
      if (y.datetime && He[_] !== null) {
        const A = new Date(y.datetime), { dayIdx: S, hourInDay: Y } = Er(A), fe = `${S}-${Y}`;
        S >= 0 && S < t && Y >= 0 && Y < 24 && (ut[fe] = {
          temp: He[_],
          precip: zr[_],
          precipProb: Lr[_],
          originalIndex: _
        });
      }
    });
    let Oe = Math.floor(gi / 5) * 5, De = Math.ceil(mi / 5) * 5;
    Oe > 0 && (Oe = 0), De < 0 && (De = 0);
    const yi = De - Oe, en = [], _i = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = ut[A];
        if (S && S.temp !== null) {
          const Y = f + y * v + _ * ce + ce / 2, fe = ue - (S.temp - Oe) / yi * (ue - be);
          _i.push(`${Y},${fe}`);
        }
      }
    _i.length > 0 && en.push(
      w`
          <!-- Main temperature line -->
          <polyline points="${_i.join(" ")}" fill="none" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        `
    );
    const Ze = Math.max(3, Math.floor(ce) - 2), tn = ue, nn = 5 / yi * (ue - be) / 5;
    function Nr(y) {
      if (y <= 0) return "transparent";
      const _ = [
        { val: 0, color: { r: 89, g: 148, b: 177 } },
        // #5994b1ff
        { val: 5, color: { r: 33, g: 150, b: 243 } },
        // #2196f3
        { val: 10, color: { r: 0, g: 100, b: 0 } },
        // #006400
        { val: 15, color: { r: 76, g: 175, b: 80 } },
        // #4caf50
        { val: 20, color: { r: 255, g: 224, b: 102 } }
        // #ffe066
      ];
      let A = _[0], S = _[_.length - 1];
      for (let ae = 1; ae < _.length; ae++)
        if (y < _[ae].val) {
          S = _[ae], A = _[ae - 1];
          break;
        }
      const Y = (y - A.val) / (S.val - A.val), fe = Math.round(A.color.r + (S.color.r - A.color.r) * Y), ft = Math.round(A.color.g + (S.color.g - A.color.g) * Y), gt = Math.round(A.color.b + (S.color.b - A.color.b) * Y);
      return `rgb(${fe},${ft},${gt})`;
    }
    const Tr = 5, rn = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = ut[A];
        if (S && S.precipProb > 0) {
          const Y = f + y * v + _ * ce + ce / 2 - Ze / 2, fe = f + y * v, ft = f + (y + 1) * v - Ze, gt = Math.max(fe, Math.min(ft, Y)), ae = S.precipProb / 100 * Tr * nn;
          rn.push(
            w`<rect x="${gt}" y="${tn - ae}" width="${Ze}" height="${ae}" fill="#988d8dff" opacity="0.4" rx="1.5"/>`
          );
        }
      }
    const sn = [];
    for (let y = 0; y < t; y++)
      for (let _ = 0; _ < 24; _++) {
        const A = `${y}-${_}`, S = ut[A];
        if (S && S.precip > 0) {
          const Y = f + y * v + _ * ce + ce / 2 - Ze / 2, fe = f + y * v, ft = f + (y + 1) * v - Ze, gt = Math.max(fe, Math.min(ft, Y)), ae = S.precip * nn, Or = Nr(S.precip);
          sn.push(
            w`<rect x="${gt}" y="${tn - ae}" width="${Ze}" height="${ae}"
              fill="${Or}" opacity="1" rx="1.5"/>`
          );
        }
      }
    const Dt = [];
    if (e.length > 0)
      for (let y = 0; y <= t; y++) {
        const _ = f + y * v;
        y === 0 ? Dt.push(
          w`<line x1="${_}" y1="${be}" x2="${_}" y2="${ue}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        ) : y === t ? Dt.push(
          w`<line x1="${_}" y1="${be}" x2="${_}" y2="${ue}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        ) : Dt.push(
          w`<line x1="${_}" y1="${be}" x2="${_}" y2="${ue}" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/>`
        );
      }
    const on = [];
    if (t > 0)
      for (let y = 0; y < t; y++) {
        const _ = f + y * v + v / 2, A = typeof r[y].templow == "number" ? Math.round(r[y].templow || r[y].temperature - 5) : "", S = typeof r[y].temperature == "number" ? Math.round(r[y].temperature) : "";
        on.push(w`
        <g>
          <!-- Weekday -->
          <text x="${_}" y="${R}" text-anchor="middle" font-size="${x}" class="weather-day">
            ${new Date(r[y].datetime).toLocaleDateString(void 0, { weekday: "short" })}
          </text>
          <!-- Icon -->
          <foreignObject x="${_ - k / 2}" y="${K}" width="${k}" height="${k}">
              ${this.getWeatherIcon(r[y].condition || "", this.config.enable_animate_weather_icons ? "animated" : "mdiAsSVG", k + "px", !0)}
          </foreignObject>
          <!-- Min/Max temp -->
          <text class="weather-temp" x="${_}" y="${te}" text-anchor="middle" font-size="${M}">${A}°<tspan fill="#aaa"> | </tspan><tspan class="weather-temp">${S}°</tspan></text>
        </g>
      `);
      }
    const an = [], Pt = /* @__PURE__ */ new Set();
    Pt.add(Oe), Oe < 0 && De > 0 && Pt.add(0), Pt.add(De);
    for (let y = Oe; y <= De; y += 5)
      if (y % 5 === 0) {
        const _ = be + (De - y) / yi * (ue - be);
        if (_ >= be && _ <= ue) {
          const A = y % 10 === 0;
          an.push(w`
            <line x1="${f}" y1="${_}" x2="${b}" y2="${_}"
              stroke="#ddd" stroke-width="${A ? 1 : 0.5}"
              stroke-dasharray="${A ? "none" : "2,2"}" opacity="0.6"/>
            ${O === "none" ? w`` : O === "full" ? A ? w`<text x="${f + 4}" y="${_}" font-size="${$}" fill="#888" opacity="0.9" text-anchor="start" dominant-baseline="middle">${y}°</text>` : w`` : Pt.has(y) ? w`<text x="${f + 4}" y="${_}" font-size="${$}" fill="#888" opacity="0.9" text-anchor="start" dominant-baseline="middle">${y}°</text>` : w``}
          `);
        }
      }
    const Hr = w``;
    return c`
      <style>
        .chart {
        ${this.standalone === !1 ? "background: var(--card-background-color, #fff);margin-top: 15px;" : ""}
          border-radius: 12px;
          padding: 0;
          margin-bottom: var(--chart-margin-bottom, 0);
          border: var(--chart-inner-border, 1px solid var(--border-color, rgba(220, 20, 60, 0.1)));
          overflow: hidden;
          position: relative; /* Enable absolute positioning for SVG overlay */
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .chart svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="chart">
        <svg width="100%" height="100%" viewBox="0 0 ${l} ${a}" style="display:block;">
          <defs>
            <filter id="text-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.9"/>
              <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="#000000" flood-opacity="0.8"/>
            </filter>
          </defs>
          <!-- Background grid lines (behind everything) -->
          ${an} ${Dt}
          <!-- Day groups (labels and icons) -->
          ${on}
          <!-- Precipitation bars -->
          ${rn} ${sn}
          <!-- Right-side labels for mm and % -->
          ${Hr}
        </svg>

        <!-- Temperature lines in completely separate SVG overlay (continuous line, always on top) -->
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 ${l} ${a}"
          style="display:block; position: absolute; top: 0; left: 0; pointer-events: none;"
        >
          <defs>
            <filter id="temp-line-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
            </filter>
          </defs>
          <g filter="url(#temp-line-shadow)">
            ${en}
          </g>
        </svg>
      </div>
    `;
  }
};
Me.styles = T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
    }
    .chart-bars {
      display: flex;
      justify-content: space-between;
      height: 120px;
      margin-bottom: 10px;
    }

    .chart-line {
      display: flex;
      justify-content: space-between;
      height: 60px;
      margin-bottom: 10px;
    }

    .chart-bar-precipitation {
      width: 18px;
      background: linear-gradient(to top, #3498db, #85c5e5);
      border-radius: 2px 2px 0 0;
      min-height: 2px;
    }
    .chart-bar-precipitation-prob {
      width: 18px;
      background: #87898eff;
      border-radius: 2px 2px 0 0;
      min-height: 2px;
      opacity: 0.6;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--secondary-text-color, #000);
    }
    .weather-temp {
      fill: #fff;
      filter: url(#text-glow);
      font-weight: 600;
    }
    .weather-day {
      fill: #fff;
      filter: url(#text-glow);
      font-weight: 600;
    }
  `;
ht([
  m({ type: Array })
], Me.prototype, "forecast", 2);
ht([
  m({ type: Array })
], Me.prototype, "hourlyForecast", 2);
ht([
  m({ type: Object })
], Me.prototype, "config", 2);
ht([
  m({ type: Function })
], Me.prototype, "getWeatherIcon", 2);
ht([
  m({ type: Boolean })
], Me.prototype, "standalone", 2);
Me = ht([
  H("daily-forecast-diagram")
], Me);
const Ai = "langChanged";
function ws(r, e, t) {
  return Object.entries(Si(e || {})).reduce((i, [n, s]) => i.replace(new RegExp(`{{[  ]*${n}[  ]*}}`, "gm"), String(Si(s))), r);
}
function xs(r, e) {
  const t = r.split(".");
  let i = e.strings;
  for (; i != null && t.length > 0; )
    i = i[t.shift()];
  return i != null ? i.toString() : null;
}
function Si(r) {
  return typeof r == "function" ? r() : r;
}
const vs = () => ({
  loader: () => Promise.resolve({}),
  empty: (r) => `[${r}]`,
  lookup: xs,
  interpolate: ws,
  translationCache: {}
});
let Ct = vs();
function I(r) {
  return Ct = Object.assign(Object.assign({}, Ct), r);
}
function $s(r) {
  window.dispatchEvent(new CustomEvent(Ai, { detail: r }));
}
function ks(r, e, t = Ct) {
  $s({
    previousStrings: t.strings,
    previousLang: t.lang,
    lang: t.lang = r,
    strings: t.strings = e
  });
}
function Cs(r, e) {
  const t = (i) => r(i.detail);
  return window.addEventListener(Ai, t, e), () => window.removeEventListener(Ai, t);
}
async function ee(r, e = Ct) {
  const t = await e.loader(r, e);
  e.translationCache = {}, ks(r, t, e);
}
function u(r, e, t = Ct) {
  let i = t.translationCache[r] || (t.translationCache[r] = t.lookup(r, t) || t.empty(r, t));
  return e = e != null ? Si(e) : null, e != null ? t.interpolate(i, e, t) : i;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zn = { CHILD: 2 }, As = (r) => (...e) => ({ _$litDirective$: r, values: e });
let Kn = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wi;
const Bt = window, Je = Bt.trustedTypes, bn = Je ? Je.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Mi = "$lit$", xe = `lit$${(Math.random() + "").slice(9)}$`, Yn = "?" + xe, Ss = `<${Yn}>`, Ue = document, jt = () => Ue.createComment(""), At = (r) => r === null || typeof r != "object" && typeof r != "function", Qn = Array.isArray, Ms = (r) => Qn(r) || typeof r?.[Symbol.iterator] == "function", xi = `[ 	
\f\r]`, yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wn = /-->/g, xn = />/g, Re = RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vn = /'/g, $n = /"/g, Xn = /^(?:script|style|textarea|title)$/i, et = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), kn = /* @__PURE__ */ new WeakMap(), Ge = Ue.createTreeWalker(Ue, 129, null, !1);
function Jn(r, e) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bn !== void 0 ? bn.createHTML(e) : e;
}
const zs = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : "", o = yt;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let h, d, p = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, d = o.exec(a), d !== null); ) g = o.lastIndex, o === yt ? d[1] === "!--" ? o = wn : d[1] !== void 0 ? o = xn : d[2] !== void 0 ? (Xn.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = Re) : d[3] !== void 0 && (o = Re) : o === Re ? d[0] === ">" ? (o = n ?? yt, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? Re : d[3] === '"' ? $n : vn) : o === $n || o === vn ? o = Re : o === wn || o === xn ? o = yt : (o = Re, n = void 0);
    const f = o === Re && r[l + 1].startsWith("/>") ? " " : "";
    s += o === yt ? a + Ss : p >= 0 ? (i.push(h), a.slice(0, p) + Mi + a.slice(p) + xe + f) : a + xe + (p === -2 ? (i.push(void 0), l) : f);
  }
  return [Jn(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : "")), i];
};
class St {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [h, d] = zs(e, t);
    if (this.el = St.createElement(h, i), Ge.currentNode = this.el.content, t === 2) {
      const p = this.el.content, g = p.firstChild;
      g.remove(), p.append(...g.childNodes);
    }
    for (; (n = Ge.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const p = [];
          for (const g of n.getAttributeNames()) if (g.endsWith(Mi) || g.startsWith(xe)) {
            const f = d[o++];
            if (p.push(g), f !== void 0) {
              const b = n.getAttribute(f.toLowerCase() + Mi).split(xe), C = /([.?@])?(.*)/.exec(f);
              a.push({ type: 1, index: s, name: C[2], strings: b, ctor: C[1] === "." ? Es : C[1] === "?" ? Ts : C[1] === "@" ? Hs : si });
            } else a.push({ type: 6, index: s });
          }
          for (const g of p) n.removeAttribute(g);
        }
        if (Xn.test(n.tagName)) {
          const p = n.textContent.split(xe), g = p.length - 1;
          if (g > 0) {
            n.textContent = Je ? Je.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(p[f], jt()), Ge.nextNode(), a.push({ type: 2, index: ++s });
            n.append(p[g], jt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Yn) a.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(xe, p + 1)) !== -1; ) a.push({ type: 7, index: s }), p += xe.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = Ue.createElement("template");
    return i.innerHTML = e, i;
  }
}
function tt(r, e, t = r, i) {
  var n, s, o, l;
  if (e === et) return e;
  let a = i !== void 0 ? (n = t._$Co) === null || n === void 0 ? void 0 : n[i] : t._$Cl;
  const h = At(e) ? void 0 : e._$litDirective$;
  return a?.constructor !== h && ((s = a?._$AO) === null || s === void 0 || s.call(a, !1), h === void 0 ? a = void 0 : (a = new h(r), a._$AT(r, t, i)), i !== void 0 ? ((o = (l = t)._$Co) !== null && o !== void 0 ? o : l._$Co = [])[i] = a : t._$Cl = a), a !== void 0 && (e = tt(r, a._$AS(r, e.values), a, i)), e;
}
class Ls {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var t;
    const { el: { content: i }, parts: n } = this._$AD, s = ((t = e?.creationScope) !== null && t !== void 0 ? t : Ue).importNode(i, !0);
    Ge.currentNode = s;
    let o = Ge.nextNode(), l = 0, a = 0, h = n[0];
    for (; h !== void 0; ) {
      if (l === h.index) {
        let d;
        h.type === 2 ? d = new ri(o, o.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (d = new Os(o, this, e)), this._$AV.push(d), h = n[++a];
      }
      l !== h?.index && (o = Ge.nextNode(), l++);
    }
    return Ge.currentNode = Ue, s;
  }
  v(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ri {
  constructor(e, t, i, n) {
    var s;
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cp = (s = n?.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = tt(this, e, t), At(e) ? e === G || e == null || e === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : e !== this._$AH && e !== et && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Ms(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== G && At(this._$AH) ? this._$AA.nextSibling.data = e : this.$(Ue.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var t;
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = St.createElement(Jn(n.h, n.h[0]), this.options)), n);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === s) this._$AH.v(i);
    else {
      const o = new Ls(s, this), l = o.u(this.options);
      o.v(i), this.$(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = kn.get(e.strings);
    return t === void 0 && kn.set(e.strings, t = new St(e)), t;
  }
  T(e) {
    Qn(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new ri(this.k(jt()), this.k(jt()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cp = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class si {
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = G;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = tt(this, e, t, 0), o = !At(e) || e !== this._$AH && e !== et, o && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = s[0], a = 0; a < s.length - 1; a++) h = tt(this, l[i + a], t, a), h === et && (h = this._$AH[a]), o || (o = !At(h) || h !== this._$AH[a]), h === G ? e = G : e !== G && (e += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Es extends si {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === G ? void 0 : e;
  }
}
const Ns = Je ? Je.emptyScript : "";
class Ts extends si {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== G ? this.element.setAttribute(this.name, Ns) : this.element.removeAttribute(this.name);
  }
}
class Hs extends si {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = tt(this, e, t, 0)) !== null && i !== void 0 ? i : G) === et) return;
    const n = this._$AH, s = e === G && n !== G || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, o = e !== G && (n === G || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Os {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    tt(this, e);
  }
}
const Cn = Bt.litHtmlPolyfillSupport;
Cn?.(St, ri), ((wi = Bt.litHtmlVersions) !== null && wi !== void 0 ? wi : Bt.litHtmlVersions = []).push("2.8.0");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ds = (r) => r.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = (r, e) => {
  var t, i;
  const n = r._$AN;
  if (n === void 0) return !1;
  for (const s of n) (i = (t = s)._$AO) === null || i === void 0 || i.call(t, e, !1), xt(s, e);
  return !0;
}, qt = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while (t?.size === 0);
}, er = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), Fs(e);
  }
};
function Ps(r) {
  this._$AN !== void 0 ? (qt(this), this._$AM = r, er(this)) : this._$AM = r;
}
function Rs(r, e = !1, t = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(i)) for (let s = t; s < i.length; s++) xt(i[s], !1), qt(i[s]);
  else i != null && (xt(i, !1), qt(i));
  else xt(this, r);
}
const Fs = (r) => {
  var e, t, i, n;
  r.type == Zn.CHILD && ((e = (i = r)._$AP) !== null && e !== void 0 || (i._$AP = Rs), (t = (n = r)._$AQ) !== null && t !== void 0 || (n._$AQ = Ps));
};
class Gs extends Kn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, i) {
    super._$AT(e, t, i), er(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    var i, n;
    e !== this.isConnected && (this.isConnected = e, e ? (i = this.reconnected) === null || i === void 0 || i.call(this) : (n = this.disconnected) === null || n === void 0 || n.call(this)), t && (xt(this, e), qt(this));
  }
  setValue(e) {
    if (Ds(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class Ws extends Gs {
  constructor() {
    super(...arguments), this.langChangedSubscription = null, this.getValue = (() => "");
  }
  /**
   * Sets up the directive by setting the getValue property and subscribing.
   * When subclassing LangChangedDirectiveBase this function should be call in the render function.
   * @param getValue
   */
  renderValue(e) {
    return this.getValue = e, this.subscribe(), this.getValue();
  }
  /**
   * Called when the lang changed event is dispatched.
   * @param e
   */
  langChanged(e) {
    this.setValue(this.getValue(e));
  }
  /**
   * Subscribes to the lang changed event.
   */
  subscribe() {
    this.langChangedSubscription == null && (this.langChangedSubscription = Cs(this.langChanged.bind(this)));
  }
  /**
   * Unsubscribes from the lang changed event.
   */
  unsubscribe() {
    this.langChangedSubscription != null && this.langChangedSubscription();
  }
  /**
   * Unsubscribes when disconnected.
   */
  disconnected() {
    this.unsubscribe();
  }
  /**
   * Subscribes when reconnected.
   */
  reconnected() {
    this.subscribe();
  }
}
class Us extends Ws {
  render(e, t, i) {
    return this.renderValue(() => u(e, t, i));
  }
}
const X = As(Us);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class An extends Kn {
  constructor(e) {
    if (super(e), this.et = G, e.type !== Zn.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === G || e == null) return this.ft = void 0, this.et = e;
    if (e === et) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const t = [e];
    return t.raw = t, this.ft = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
An.directiveName = "unsafeHTML", An.resultType = 1;
var Sn;
(function(r) {
  r.language = "language", r.system = "system", r.comma_decimal = "comma_decimal", r.decimal_comma = "decimal_comma", r.space_comma = "space_comma", r.none = "none";
})(Sn || (Sn = {}));
var Mn;
(function(r) {
  r.language = "language", r.system = "system", r.am_pm = "12", r.twenty_four = "24";
})(Mn || (Mn = {}));
const le = (r, e, t, i) => {
  i = i || {}, t = t ?? {};
  const n = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return n.detail = t, r.dispatchEvent(n), n;
}, Is = { entity: "Wetter Entity *", location: "Standort", show_location: "Standort anzeigen", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", wind_entity: "Windgeschwindigkeit", wind_direction_entity: "Windrichtung", sunshine_entity: "Sonnenscheindauer", precipitation_entity: "Niederschlagsprognose", show_forecast: "Wettervorhersage anzeigen", show_temperature: "Temperaturdiagramm anzeigen", show_precipitation: "Niederschlagsdiagramm anzeigen", show_sunshine: "Sonnenscheindauerdiagramm anzeigen", show_wind: "Winddiagramm anzeigen", enable_animate_weather_icons: "Animierte Wetter-Icons aktivieren", forecast_hours: "Prognose Stunden (Standard: 6)", compact_mode: "Kompakter Modus", display_mode: "Anzeigemodus", display_mode_full: "Vollständig", display_mode_compact: "Kompakt", display_mode_auto: "Automatisch", group_general: "Allgemeineinstellungen", group_current: "Aktuelles Wetter", group_forecast: "Wettervorhersage", group_charts: "Diagramme", group_sensors: "Sensoren", group_display: "Anzeigeeinstellungen", group_chart_order: "Reihenfolge der Diagramme", chart_order: "Reihenfolge der Diagramme (z.B. temperature,precipitation,sunshine,wind)", chart_temperature: "Temperatur", chart_precipitation: "Niederschlag", chart_sunshine: "Sonnenschein", chart_wind: "Wind", chart_forecast: "Prognose-Diagramm", move_up: "Nach oben", move_down: "Nach unten", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein. Wenn eine andere Wetter Entity genutzt wird kann es passieren, das nicht alle Daten korrekt angezeigt werden.", location: "Zeigt diesen Namen als Standort an.", show_location: "Zeige den Standortnamen über dem aktuellen Wetter an", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen.", wind_entity: "Die Wind-Entity wird benötigt, um die Windgeschwindigkeit anzuzeigen.", wind_direction_entity: "Die Windrichtungs-Entity wird benötigt, um die Windrichtung anzuzeigen.", sunshine_entity: "Die Sonnenscheindauer-Entity wird benötigt, um die Sonnenscheindauer anzuzeigen.", precipitation_entity: "Die Niederschlags-Entity wird benötigt, um die Niederschlagsprognose anzuzeigen.", show_forecast: "Blende den Wettervorhersage-Bereich ein oder aus. Die Vorhersage zeigt bis zu 7 Tage an, je nach dem was der Wetterdienst liefert.", show_temperature: "Zeige das Temperaturdiagramm an, mit den Vorhersage anhand der eingestellten Stunden", show_precipitation: "Zeige das Niederschlags an, mit den Vorhersage anhand der eingestellten Stunden", show_sunshine: "Zeige das Sonnenscheindauerdiagramm an, mit den Vorhersage anhand der eingestellten Stunden", show_wind: "Zeige das Winddiagramm an mit den Vorhersage anhand der eingestellten Stunden", enable_animate_weather_icons: "Zeige animierte Icons an. Wenn ausgeschaltet, werden statische Icons angezeigt.", compact_mode: "Im kompakten Modus werden weniger Details angezeigt für die Tagesvorhersage und den aktuellen Daten (z.B. Windrichtung)", display_mode: "Wähle wie viele Daten angezeigt werden: Vollständig (alle Sektionen), Kompakt (nur wesentliches), oder Auto (passt sich an Kartengrösse an)", forecast_hours: "Anzahl der Stunden für die Anzeige der stündlichen Vorhersage (Standard: 6, maximal 18)", auto_resolve_entities: "LNKtwo/ha-meteoswiss Sensoren automatisch erkennen (Empfohlen)", show_swiss: "Schweizer Werte anzeigen (Föhn, Schnee, 0°C-Grenze)", show_heating: "Heizgradtage anzeigen (SIA 381/3)", foehn_entity: "Föhn-Index Sensor (automatisch erkannt wenn auto_resolve aktiv)", snow_entity: "Schneehöhe Sensor (automatisch erkannt wenn auto_resolve aktiv)", freezing_level_entity: "Nullgradgrenze Sensor (automatisch erkannt wenn auto_resolve aktiv)", heating_degree_days_entity: "Heizgradtage Sensor (automatisch erkannt wenn auto_resolve aktiv)", season_heating_entity: "Saison-Heizgradtage Sensor (automatisch erkannt wenn auto_resolve aktiv)" } }, Bs = { config: { show_warnings: "Wetterwarnungen anzeigen", warning_entity: "Wetterwarnungen (Legacy)", primary_warning_entity: "Primäre Wetterwarnung", secondary_warning_entity: "Sekundäre Wetterwarnung", tertiary_warning_entity: "Tertiäre Wetterwarnung", descr: { show_warnings: "Zeige Wetterwarnungen an, wenn die Wetterwarnung Entity gesetzt ist und aktuelle Warnungen existieren.", warning_entity: "Wetterwarnungen Entity (LNKtwo/ha-meteoswiss: binary_sensor.*_any_alert). Wird automatisch erkannt.", primary_warning_entity: "Primäre Wetterwarnung (*_primary_weather_warning) aus LNKtwo/ha-meteoswiss. Wenn gesetzt, wird das neue Ranked-Model aktiviert.", secondary_warning_entity: "Sekundäre Wetterwarnung (*_secondary_weather_warning) aus LNKtwo/ha-meteoswiss.", tertiary_warning_entity: "Tertiäre Wetterwarnung (*_tertiary_weather_warning) aus LNKtwo/ha-meteoswiss." } }, weather_warning: "Wetterwarnung aktiv", weather_warnings: "{{count}} Wetterwarnungen aktiv", warnings: "Wetterwarnungen", warnings_none: "Keine aktiven Wetterwarnungen", warnings_additional: "+{{count}} weitere", valid_from: "Gültig ab", valid_to: "Gültig bis" }, js = { config: { entity: "Wetter Entity *", forecast_hours: "Prognose Stunden (Standard: 6)", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", sunshine_entity: "Sonnenscheindauer", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", forecast_hours: "Anzahl der Stunden für die Anzeige der stündlichen Vorhersage (Standard: 6, maximal 18)", sun_entity: "Die Sonnen-Entity wird für Sonnenaufgangs-/Untergangsmarkierungen im Diagramm benötigt.", sunshine_entity: "Die Sonnenscheindauer-Entity wird benötigt, um die Sonnenscheindauer anzuzeigen." } }, forecast_hours: "Prognose (nächste {{hours}}h)", temperature_chart: "Temperatur (nächste 6h)", temperature_hours: "Temperatur (nächste {{hours}}h)", temperature_none: "Keine Temperaturdaten vorhanden", precipitation_hours: "Niederschlag (nächste {{hours}}h)", precipitation_none: "Keine Niederschlagsdaten vorhanden", no_precipitation_data: "Keine Niederschlagsdaten vorhanden", sunshine_chart: "Sonnenschein (nächste 6h)", sunshine_hours: "Sonnenschein (nächste {{hours}}h)", sunshine_none: "Keine Sonnenscheindaten vorhanden", no_sunshine_data: "Keine Sonnenscheindaten vorhanden", wind_hours: "Wind (nächste {{hours}}h)", wind_compass: "Richtung", loading: "Lädt...", loading_forecast: "Vorhersagedaten werden geladen...", check_devtools: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", try_other_entity: "Versuchen Sie eine andere Wetter-Entity", no_forecast_data: "Keine Vorhersagedaten verfügbar", no_forecast_data_hint: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", forecast_none: "Keine Forecast-Daten verfügbar", forecast_none_hint: "Prüfen Sie die Developer Tools → Services → weather.get_forecasts", forecast_loading: "Lädt...", forecast_days: "{{count}}-Tage-Prognose", forecast_days_7: "7-Tage-Prognose", "7d_forecast": "7-Tage-Prognose", xd_forecast: "Tages Prognose", days_available: "Verfügbare Tage", now: "Jetzt", hour: "{{h}}h" }, qs = { config: { entity: "Wetter Entity *", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", forecast_mode: "Vorhersage-Modus", photo_mode: "Fotorealistischer Hintergrund (PoC)", show_day_temps: "Tages-Min/Max anzeigen", show_sun_times: "Sonnenauf-/-untergang anzeigen", temperature_font_size: "Temperatur Schriftgröße (px)", group_general: "Allgemeineinstellungen", group_display: "Anzeigeeinstellungen", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen.", forecast_mode: "Wähle, ob in der BG-Card die Tages- oder Stunden-Vorhersage (oder keine) angezeigt wird.", show_day_temps: "Blende die Tages-Min/Max-Anzeige ein oder aus.", show_sun_times: "Blende die Anzeige von Sonnenaufgang/-untergang ein oder aus.", photo_mode: "Experimenteller fotorealistischer Hintergrund mit atmosphärischen Overlays (PoC).", temperature_font_size: "Schriftgröße der Temperaturanzeige in Pixel. Standard: 36", scenery_image: "URL eines Landschaftsbilds (See, Berge, etc.). Wird unten angezeigt mit dynamischem Himmel darüber." }, scenery_image: "Landschaftsbild URL" }, forecast_mode: { daily: "Täglich", hourly: "Stündlich", none: "Keine" }, sunrise: "Sonnenaufgang", sunset: "Sonnenuntergang" }, Vs = { config: { entity: "Wetter Entity *", sun_entity: "Sonnen Entity für Sonnenaufgang und Sonnenuntergang", group_general: "Allgemeineinstellungen", group_sensors: "Sensoren", descr: { entity: "Die Wetter-Entity ist erforderlich und sollte von der Integration SwissWeather sein.", sun_entity: "Die Sonnen-Entity ist erforderlich, um Sonnenaufgangs- und Sonnenuntergangszeiten anzuzeigen." } } }, Zs = "Schweiz", Ks = "Wind", Ys = "Richtung", Qs = "Luftfeuchtigkeit", Xs = "Luftdruck", Js = "Sonnenschein", eo = "Sicht", to = "Aktuelles Wetter", io = "Unbekannt", no = "Einklappen", ro = "Ausklappen", so = "Bewölkt", oo = "Aussergewöhnliches Wetter", ao = "Nebel", lo = "Hagel", co = "Gewitter", ho = "Teilweise bewölkt", po = "Strömender Regen", uo = "Regnerisch", fo = "Schneefall", go = "Sonnig", mo = "Windig", yo = { title: "Pollenbelastung", no_data: "Keine Pollen-Typen aktiviert", not_configured: "Keine Pollen-Sensoren konfiguriert. Bitte Karte einrichten und Stufen-Sensoren aus LNKtwo/ha-meteoswiss zuweisen.", config: { level_sensor: "Stufen-Sensor", level_sensor_hint: "Pollen-Stufen-Sensor (SwissPollenLevelSensor aus LNKtwo/ha-meteoswiss). Mögliche Werte: NONE / LOW / MEDIUM / STRONG / VERY_STRONG", raw_sensor: "Rohwert-Sensor (optional)", raw_sensor_hint: "Optionaler Rohwert-Sensor in Partikel/m³" }, types: { birch: "Birke", grasses: "Gräser", alder: "Erle", hazel: "Hasel", beech: "Buche", ash: "Esche", oak: "Eiche" }, levels: { none: "Keine", low: "Gering", medium: "Mittel", strong: "Stark", very_strong: "Sehr stark" } }, _o = {
  config: Is,
  warning: Bs,
  hourly_charts: js,
  bg_card: qs,
  forecast_diagram: Vs,
  location: Zs,
  wind: Ks,
  direction: Ys,
  humidity: Qs,
  pressure: Xs,
  sunshine: Js,
  visibility: eo,
  current_weather: to,
  unknown: io,
  collapse: no,
  expand: ro,
  "clear-night": "Klarer Himmel in der Nacht",
  cloudy: so,
  exceptional: oo,
  fog: ao,
  hail: lo,
  lightning: co,
  "lightning-rainy": "Gewitter, regnerisch",
  partlycloudy: ho,
  pouring: po,
  rainy: uo,
  snowy: fo,
  "snowy-rainy": "Schnee mit Regen",
  sunny: go,
  windy: mo,
  "windy-variant": "Windige Variante",
  "windy-variant-cloudy": "Windig mit Wolken",
  "windy-variant-partlycloudy": "Windig mit teilweiser Bewölkung",
  "windy-variant-rainy": "Windig mit Regen",
  "windy-variant-snowy": "Windig mit Schnee",
  "windy-variant-snowy-rainy": "Windig mit Schnee und Regen",
  "windy-variant-sunny": "Windig mit Sonne",
  "windy-variant-clear-night": "Windig mit klarem Himmel in der Nacht",
  "windy-variant-fog": "Windig mit Nebel",
  "windy-variant-hail": "Windig mit Hagel",
  "windy-variant-lightning": "Windig mit Blitz",
  "windy-variant-lightning-rainy": "Windig mit Blitz und Regen",
  "windy-variant-pouring": "Windig mit starkem Regen",
  "windy-variant-exceptional": "Windig mit aussergewöhnlichem Wetter",
  pollen: yo
}, bo = { entity: "Weather Entity *", location: "Location", show_location: "Show Location", sun_entity: "Sun Entity to display sunrise and sunset times", wind_entity: "Wind Speed", wind_direction_entity: "Wind Direction", sunshine_entity: "Sunshine Duration", precipitation_entity: "Precipitation Forecast", show_forecast: "Show Weather Forecast", show_temperature: "Show Temperature Chart", show_precipitation: "Show Precipitation Chart", show_sunshine: "Show Sunshine Duration Chart", show_wind: "Show Wind Chart", enable_animate_weather_icons: "Enable Animated Weather Icons", forecast_hours: "Forecast Hours (default: 6)", compact_mode: "Compact Mode", display_mode: "Display Mode", display_mode_full: "Full", display_mode_compact: "Compact", display_mode_auto: "Auto", group_general: "General Settings", group_current: "Current Weather", group_forecast: "Weather Forecast", group_charts: "Charts", group_sensors: "Sensors", group_display: "Display Settings", group_chart_order: "Chart Order", chart_order: "Chart order (e.g. temperature,precipitation,sunshine,wind)", chart_temperature: "Temperature", chart_precipitation: "Precipitation", chart_sunshine: "Sunshine", chart_wind: "Wind", chart_forecast: "Forecast Chart", move_up: "Move up", move_down: "Move down", descr: { entity: "The weather entity is required and should be from the SwissWeather integration. If another weather entity is used, not all data may be displayed correctly.", location: "Displays this name as location.", show_location: "Show the location name above the current weather", sun_entity: "The sun entity is required to display sunrise and sunset times.", wind_entity: "The wind entity is required to display wind speed.", wind_direction_entity: "The wind direction entity is required to display wind direction.", sunshine_entity: "The sunshine entity is required to display sunshine duration.", precipitation_entity: "The precipitation entity is required to display the precipitation forecast.", show_forecast: "Toggle the weather forecast section on or off. The forecast shows up to 7 days depending on what the weather service provides.", show_temperature: "Show the temperature chart with the forecast based on the set hours", show_precipitation: "Show the precipitation chart with the forecast based on the set hours", show_sunshine: "Show the sunshine duration chart with the forecast based on the set hours", show_wind: "Show the wind chart with the forecast based on the set hours", enable_animate_weather_icons: "Show animated icons. If disabled, static icons are displayed.", compact_mode: "In compact mode, fewer details are displayed for the daily forecast and current data (e.g. wind direction)", display_mode: "Choose how much data to show: Full (all sections), Compact (essentials only), or Auto (adapts to card width)", forecast_hours: "Number of hours to show in the hourly forecast (default: 6, maximum 18)", auto_resolve_entities: "Auto-resolve LNKtwo/ha-meteoswiss sensor entities (Recommended)", show_swiss: "Show Swiss-specific values (foehn, snow, freezing level)", show_heating: "Show heating degree days (SIA 381/3)", foehn_entity: "Foehn index sensor (auto-resolved if auto_resolve enabled)", snow_entity: "Snow depth sensor (auto-resolved if auto_resolve enabled)", freezing_level_entity: "Freezing level sensor (auto-resolved if auto_resolve enabled)", heating_degree_days_entity: "Heating degree days sensor (auto-resolved if auto_resolve enabled)", season_heating_entity: "Season heating degree days sensor (auto-resolved if auto_resolve enabled)" } }, wo = { config: { show_warnings: "Show Weather Warnings", warning_entity: "Weather Warnings (Legacy)", primary_warning_entity: "Primary Weather Warning", secondary_warning_entity: "Secondary Weather Warning", tertiary_warning_entity: "Tertiary Weather Warning", descr: { show_warnings: "Show weather warnings if the weather warning entity is set and the actual warning exists.", warning_entity: "Weather warning entity (LNKtwo/ha-meteoswiss: binary_sensor.*_any_alert). Auto-detected from weather entity.", primary_warning_entity: "Primary weather warning entity (*_primary_weather_warning) from LNKtwo/ha-meteoswiss. When set, the new ranked model is activated.", secondary_warning_entity: "Secondary weather warning entity (*_secondary_weather_warning) from LNKtwo/ha-meteoswiss.", tertiary_warning_entity: "Tertiary weather warning entity (*_tertiary_weather_warning) from LNKtwo/ha-meteoswiss." } }, weather_warning: "Weather warning active", weather_warnings: "{{count}} weather warnings active", warnings: "Weather warnings", warnings_none: "No active weather warnings", warnings_additional: "+{{count}} more", valid_from: "Valid from", valid_to: "Valid to" }, xo = { config: { entity: "Weather Entity *", forecast_hours: "Forecast Hours (default: 6)", sun_entity: "Sun Entity to display sunrise and sunset times", sunshine_entity: "Sunshine Duration", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", forecast_hours: "Number of hours to show in the hourly forecast (default: 6, maximum 18)", sun_entity: "The sun entity is required for sunrise/sunset markers in the chart.", sunshine_entity: "The sunshine entity is required to display sunshine duration." } }, forecast_hours: "Forecast (next {{hours}}h)", temperature_chart: "Temperature (next 6h)", temperature_hours: "Temperature (next {{hours}}h)", temperature_none: "No temperature data available", precipitation_hours: "Precipitation (next {{hours}}h)", precipitation_none: "No precipitation data available", no_precipitation_data: "No precipitation data available", sunshine_chart: "Sunshine (next 6h)", sunshine_hours: "Sunshine (next {{hours}}h)", sunshine_none: "No sunshine data available", no_sunshine_data: "No sunshine data available", wind_hours: "Wind (next {{hours}}h)", wind_compass: "Direction", loading: "Loading...", loading_forecast: "Loading forecast data...", check_devtools: "Check Developer Tools → Services → weather.get_forecasts", try_other_entity: "Try a different weather entity", no_forecast_data: "No forecast data available", no_forecast_data_hint: "Check Developer Tools → Services → weather.get_forecasts", forecast_none: "No forecast data available", forecast_none_hint: "Check Developer Tools → Services → weather.get_forecasts", forecast_loading: "Loading...", forecast_days: "{{count}}-day forecast", forecast_days_7: "7-day forecast", "7d_forecast": "7-day forecast", xd_forecast: "Daily forecast", days_available: "Available Days", now: "Now", hour: "{{h}}h" }, vo = { config: { entity: "Weather Entity *", sun_entity: "Sun Entity to display sunrise and sunset times", forecast_mode: "Forecast Mode", photo_mode: "Photorealistic Background (PoC)", show_day_temps: "Show Day Min/Max", show_sun_times: "Show Sunrise/Sunset", temperature_font_size: "Temperature font size (px)", group_general: "General Settings", group_display: "Display Settings", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", sun_entity: "The sun entity is required to display sunrise and sunset times.", forecast_mode: "Choose whether the BG card shows the daily or hourly forecast (or none).", show_day_temps: "Toggle the per-day min/max display on or off.", show_sun_times: "Toggle the sunrise/sunset display on or off.", photo_mode: "Photorealistic background with atmospheric overlays.", temperature_font_size: "Font size for the temperature label in pixels. Default: 36", scenery_image: "Background landscape image URL (lake, mountains, etc.). Shown at the bottom with dynamic sky on top." }, scenery_image: "Scenery Image URL" }, forecast_mode: { daily: "Daily", hourly: "Hourly", none: "None" }, sunrise: "Sunrise", sunset: "Sunset" }, $o = { config: { entity: "Weather Entity *", sun_entity: "Sun Entity to display sunrise and sunset times", group_general: "General Settings", group_sensors: "Sensors", descr: { entity: "The weather entity is required and should be from the SwissWeather integration.", sun_entity: "The sun entity is required to display sunrise and sunset times." } } }, ko = "Switzerland", Co = "Wind", Ao = "Direction", So = "Humidity", Mo = "Pressure", zo = "Sunshine", Lo = "Visibility", Eo = "Current Weather", No = "Unknown", To = "Collapse", Ho = "Expand", Oo = "Cloudy", Do = "Exceptional weather", Po = "Foggy", Ro = "Hail", Fo = "Lightning", Go = "Partly cloudy", Wo = "Pouring rain", Uo = "Rainy", Io = "Snowy", Bo = "Sunny", jo = "Windy", qo = { title: "Pollen levels", no_data: "No pollen types enabled", not_configured: "No pollen sensors configured. Please edit the card and assign level sensors from LNKtwo/ha-meteoswiss.", config: { level_sensor: "Level sensor", level_sensor_hint: "Pollen level sensor (SwissPollenLevelSensor from LNKtwo/ha-meteoswiss). Values: NONE / LOW / MEDIUM / STRONG / VERY_STRONG", raw_sensor: "Raw value sensor (optional)", raw_sensor_hint: "Optional raw value sensor in particles/m³" }, types: { birch: "Birch", grasses: "Grasses", alder: "Alder", hazel: "Hazel", beech: "Beech", ash: "Ash", oak: "Oak" }, levels: { none: "None", low: "Low", medium: "Medium", strong: "Strong", very_strong: "Very strong" } }, Vo = {
  config: bo,
  warning: wo,
  hourly_charts: xo,
  bg_card: vo,
  forecast_diagram: $o,
  location: ko,
  wind: Co,
  direction: Ao,
  humidity: So,
  pressure: Mo,
  sunshine: zo,
  visibility: Lo,
  current_weather: Eo,
  unknown: No,
  collapse: To,
  expand: Ho,
  "clear-night": "Clear night sky",
  cloudy: Oo,
  exceptional: Do,
  fog: Po,
  hail: Ro,
  lightning: Fo,
  "lightning-rainy": "Lightning with rain",
  partlycloudy: Go,
  pouring: Wo,
  rainy: Uo,
  snowy: Io,
  "snowy-rainy": "Snowy with rain",
  sunny: Bo,
  windy: jo,
  "windy-variant": "Windy variant",
  "windy-variant-cloudy": "Windy with clouds",
  "windy-variant-partlycloudy": "Windy with partial clouds",
  "windy-variant-rainy": "Windy with rain",
  "windy-variant-snowy": "Windy with snow",
  "windy-variant-snowy-rainy": "Windy with snowy rain",
  "windy-variant-sunny": "Windy with sun",
  "windy-variant-clear-night": "Windy with clear night",
  "windy-variant-fog": "Windy with fog",
  "windy-variant-hail": "Windy with hail",
  "windy-variant-lightning": "Windy with lightning",
  "windy-variant-lightning-rainy": "Windy with lightning and rain",
  "windy-variant-pouring": "Windy with pouring rain",
  "windy-variant-exceptional": "Windy with exceptional weather",
  pollen: qo
}, B = { de: _o, en: Vo }, ye = "meteoswiss", ve = `${ye}-card`, tr = `${ve}-editor`, ir = [
  {
    name: "entity",
    required: !0,
    description: "config.descr.entity",
    selector: {
      entity: {
        domain: "weather"
      }
    }
  },
  {
    name: "location",
    description: "config.descr.location",
    selector: {
      text: {}
    }
  },
  {
    name: "show_location",
    description: "config.descr.show_location",
    selector: { boolean: {} }
  },
  {
    name: "wind_entity",
    description: "config.descr.wind_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "wind_direction_entity",
    description: "config.descr.wind_direction_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "sunshine_entity",
    description: "config.descr.sunshine_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "warning_entity",
    description: "warning.config.descr.warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "primary_warning_entity",
    description: "warning.config.descr.primary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "secondary_warning_entity",
    description: "warning.config.descr.secondary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "tertiary_warning_entity",
    description: "warning.config.descr.tertiary_warning_entity",
    selector: {
      entity: {
        domain: "sensor"
      }
    }
  },
  {
    name: "forecast_hours",
    description: "config.descr.forecast_hours",
    selector: { number: { min: 6, max: 18, step: 1 } }
  },
  {
    name: "show_forecast",
    description: "config.descr.show_forecast",
    selector: { boolean: {} }
  },
  {
    name: "show_precipitation",
    description: "config.descr.show_precipitation",
    selector: { boolean: {} }
  },
  {
    name: "show_temperature",
    description: "config.descr.show_temperature",
    selector: { boolean: {} }
  },
  {
    name: "show_sunshine",
    description: "config.descr.show_sunshine",
    selector: { boolean: {} }
  },
  {
    name: "show_wind",
    description: "config.descr.show_wind",
    selector: { boolean: {} }
  },
  {
    name: "enable_animate_weather_icons",
    description: "config.descr.enable_animate_weather_icons",
    selector: { boolean: {} }
  },
  {
    name: "show_warnings",
    description: "warning.config.descr.show_warnings",
    selector: { boolean: {} }
  },
  {
    name: "auto_resolve_entities",
    description: "config.descr.auto_resolve_entities",
    selector: { boolean: {} }
  },
  {
    name: "show_swiss",
    description: "config.descr.show_swiss",
    selector: { boolean: {} }
  },
  {
    name: "show_heating",
    description: "config.descr.show_heating",
    selector: { boolean: {} }
  },
  {
    name: "foehn_entity",
    description: "config.descr.foehn_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "snow_entity",
    description: "config.descr.snow_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "freezing_level_entity",
    description: "config.descr.freezing_level_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "heating_degree_days_entity",
    description: "config.descr.heating_degree_days_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "season_heating_entity",
    description: "config.descr.season_heating_entity",
    selector: { entity: { domain: "sensor" } }
  },
  {
    name: "display_mode",
    description: "config.descr.display_mode",
    selector: {
      select: {
        options: [
          { value: "full", label: "config.display_mode.full" },
          { value: "compact", label: "config.display_mode.compact" },
          { value: "auto", label: "config.display_mode.auto" }
        ]
      }
    }
  },
  {
    name: "compact_mode",
    description: "config.descr.compact_mode",
    selector: { boolean: {} }
  },
  {
    name: "chart_order",
    description: "config.descr.chart_order",
    selector: {
      select: {
        multiple: !0,
        options: [
          { value: "temperature", label: "config.descr.temperature" },
          { value: "precipitation", label: "config.descr.precipitation" },
          { value: "sunshine", label: "config.descr.sunshine" },
          { value: "wind", label: "config.descr.wind" },
          { value: "forecast", label: "config.descr.forecast" }
        ]
      }
    }
  }
];
var Zo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, oi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Ko(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Zo(e, t, n), n;
};
I({
  loader: (r) => B[r]
});
let Mt = class extends N {
  constructor() {
    super(...arguments), this._computeLabel = (r) => ({
      entity: u("config.entity"),
      show_location: u("config.show_location"),
      location: u("config.location"),
      auto_resolve_entities: u("config.auto_resolve_entities") || "Auto-resolve entities",
      sun_entity: u("config.sun_entity"),
      wind_entity: u("config.wind_entity"),
      wind_direction_entity: u("config.wind_direction_entity"),
      sunshine_entity: u("config.sunshine_entity"),
      warning_entity: u("warning.config.warning_entity"),
      show_warnings: u("warning.config.show_warnings"),
      show_swiss: u("config.show_swiss") || "Show Swiss values",
      show_heating: u("config.show_heating") || "Show heating degree days",
      foehn_entity: u("config.foehn_entity") || "Foehn index entity",
      snow_entity: u("config.snow_entity") || "Snow depth entity",
      freezing_level_entity: u("config.freezing_level_entity") || "Freezing level entity",
      heating_degree_days_entity: u("config.heating_degree_days_entity") || "Heating degree days entity",
      season_heating_entity: u("config.season_heating_entity") || "Season heating entity",
      show_forecast: u("config.show_forecast"),
      forecast_hours: u("config.forecast_hours"),
      show_temperature: u("config.show_temperature"),
      show_precipitation: u("config.show_precipitation"),
      show_sunshine: u("config.show_sunshine"),
      show_wind: u("config.show_wind"),
      enable_animate_weather_icons: u("config.enable_animate_weather_icons"),
      compact_mode: u("config.compact_mode"),
      display_mode: u("config.display_mode") || "Display Mode"
    })[r.name] || r.name, this._computeHelper = (r) => r.description ? u(r.description) : "";
  }
  setConfig(r) {
    const e = { ...r };
    for (const t of Object.keys(e))
      e[t] === "" && delete e[t];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config { padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif; }
      .header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color); }
      .header-title { font-size: 20px; font-weight: 600; }
      .group { margin-bottom: 20px; padding: 12px 0; border-top: 1px solid var(--divider-color); }
      .group-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
      ha-form { display: block; margin-bottom: 12px; }
      .preview-config {
        font-family: 'SF Mono', 'Monaco', monospace; font-size: 12px;
        background: var(--code-editor-background-color, rgba(0,0,0,0.05));
        padding: 12px; border-radius: 8px; white-space: pre-wrap;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = [
      { key: "temperature", label: "Temperature" },
      { key: "precipitation", label: "Precipitation" },
      { key: "sunshine", label: "Sunshine" },
      { key: "wind", label: "Wind" },
      { key: "forecast", label: "Forecast" }
    ], e = Array.isArray(this._config?.chart_order) ? this._config.chart_order : r.map((n) => n.key), t = {
      entity: this._config?.entity,
      show_location: this._config?.show_location ?? !0,
      location: this._config?.location ?? "",
      auto_resolve_entities: this._config?.auto_resolve_entities ?? !0,
      sun_entity: this._config?.sun_entity,
      wind_entity: this._config?.wind_entity,
      wind_direction_entity: this._config?.wind_direction_entity,
      sunshine_entity: this._config?.sunshine_entity,
      warning_entity: this._config?.warning_entity,
      show_warnings: this._config?.show_warnings ?? !0,
      show_swiss: this._config?.show_swiss ?? !0,
      show_heating: this._config?.show_heating ?? !0,
      foehn_entity: this._config?.foehn_entity,
      snow_entity: this._config?.snow_entity,
      freezing_level_entity: this._config?.freezing_level_entity,
      heating_degree_days_entity: this._config?.heating_degree_days_entity,
      season_heating_entity: this._config?.season_heating_entity,
      show_forecast: this._config?.show_forecast ?? !0,
      forecast_hours: this._config?.forecast_hours ?? 6,
      show_temperature: this._config?.show_temperature ?? !0,
      show_precipitation: this._config?.show_precipitation ?? !0,
      show_sunshine: this._config?.show_sunshine ?? !0,
      show_wind: this._config?.show_wind ?? !0,
      enable_animate_weather_icons: this._config?.enable_animate_weather_icons ?? !0,
      compact_mode: this._config?.compact_mode ?? !1,
      display_mode: this._config?.display_mode ?? "full"
    }, i = (n) => ir.find((s) => s.name === n);
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌦️ MeteoSwiss Weather Card</div>
        </div>

        <div class="group">
          <div class="group-title">General</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("entity"), i("location"), i("show_location"), i("auto_resolve_entities")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">⚠️ Warnings</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_warnings"), i("warning_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🇨🇭 Swiss Values</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_swiss"), i("foehn_entity"), i("snow_entity"), i("freezing_level_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">🏠 Heating Degree Days</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("show_heating"), i("heating_degree_days_entity"), i("season_heating_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
        </div>

        <div class="group">
          <div class="group-title">📊 Charts & Forecast</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[
      i("forecast_hours"),
      i("show_temperature"),
      i("show_precipitation"),
      i("show_sunshine"),
      i("show_wind"),
      i("show_forecast"),
      i("enable_animate_weather_icons")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">Wind, Sonnenscheindauer und weitere Sensoren werden automatisch erkannt (auto_resolve_entities). Optional überschreibbar unter Advanced.</p>
        </div>

        <div class="group">
          <div class="group-title">🔧 Advanced (Überschreibt Auto-Resolve)</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[
      i("wind_entity"),
      i("wind_direction_entity"),
      i("sunshine_entity")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel} .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);">Leer lassen für Auto-Resolve. Nur ausfüllen wenn du manuell überschreiben willst.</p>
        </div>

        <div class="group">
          <div class="group-title">Chart Order</div>
          <ul style="list-style:none;padding:0;margin:0;">
            ${e.map((n, s) => {
      const o = r.find((l) => l.key === n);
      return c`<li style="display:flex;align-items:center;margin-bottom:4px;">
                <span style="flex:1;">${o?.label || n}</span>
                <button @click=${() => this._moveChart(s, -1)} ?disabled=${s === 0}>⬆️</button>
                <button @click=${() => this._moveChart(s, 1)} ?disabled=${s === e.length - 1}>⬇️</button>
              </li>`;
    })}
          </ul>
        </div>

        <div class="group">
          <div class="group-title">Display</div>
          <ha-form .hass=${this.hass} .data=${t}
            .schema=${[i("display_mode"), i("compact_mode")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}></ha-form>
          <p style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">
            <strong>Full:</strong> Alle Sektionen (Warnungen, Messwerte, Schweizer Werte, Heizgradtage, Charts, Forecast)<br>
            <strong>Compact:</strong> Nur Header + Warnungen + Messwerte + Forecast<br>
            <strong>Auto:</strong> Compact bei schmalen Karten (z.B. auf Mobile), Full auf breiten
          </p>
        </div>

        ${this._config?.entity ? c`<div class="group">
              <div class="group-title">📋 YAML Preview</div>
              <div class="preview-config">${this._renderConfigPreview()}</div>
            </div>` : ""}
      </div>
    `;
  }
  _moveChart(r, e) {
    if (!this._config) return;
    const t = [...this._config.chart_order || ["temperature", "precipitation", "sunshine", "wind", "forecast"]], i = r + e;
    i < 0 || i >= t.length || ([t[r], t[i]] = [t[i], t[r]], this._config = { ...this._config, chart_order: t }, le(this, "config-changed", { config: this._config }), this.requestUpdate());
  }
  _renderConfigPreview() {
    const r = { ...this._config, type: "custom:" + ve };
    return Object.keys(r).forEach((e) => {
      (r[e] === void 0 || r[e] === "") && delete r[e];
    }), Object.entries(r).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(r) {
    this._config || (this._config = { type: "custom:" + ve, entity: "" });
    const e = {};
    this._config.chart_order !== void 0 && (e.chart_order = this._config.chart_order);
    const t = {
      ...this._config,
      ...r.detail.value,
      ...e,
      type: "custom:" + ve
    };
    Object.keys(t).forEach((i) => {
      (t[i] === "" || t[i] === void 0) && delete t[i];
    }), this._config = t, le(this, "config-changed", { config: this._config });
  }
};
oi([
  m({ attribute: !1 })
], Mt.prototype, "hass", 2);
oi([
  m({ attribute: !1 })
], Mt.prototype, "lovelace", 2);
oi([
  m({ attribute: !1 })
], Mt.prototype, "_config", 2);
Mt = oi([
  H(tr)
], Mt);
function Rt(r, e, t) {
  const i = /* @__PURE__ */ new Date();
  return c`
    <div class="chart-labels">
      ${Array.from({ length: r }, (n, s) => {
    const l = new Date(i.getTime() + s * 60 * 60 * 1e3).toLocaleTimeString([], { hour: "2-digit" });
    return c`
          <div
            style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end;"
          >
            <span>${l}</span>
          </div>
        `;
  })}
    </div>
  `;
}
function Yo(r) {
  const e = new Date(r);
  return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][e.getDay()];
}
const Qo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='21.92'%20x2='38.52'%20y1='18.75'%20y2='47.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='5%2032%2032;%20-15%2032%2032;%205%2032%2032'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%2372b9d5'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.5'%20d='M46.66%2036.2a16.66%2016.66%200%2001-16.78-16.55%2016.29%2016.29%200%2001.55-4.15A16.56%2016.56%200%201048.5%2036.1c-.61.06-1.22.1-1.84.1z'%3e%3canimateTransform%20attributeName='transform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='-5%2032%2032;%2015%2032%2032;%20-5%2032%2032'/%3e%3c/path%3e%3c/svg%3e", Xo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'%3e%3canimateTransform%20attributeName='transform'%20dur='7s'%20repeatCount='indefinite'%20type='translate'%20values='-3%200;%203%200;%20-3%200'/%3e%3c/path%3e%3c/svg%3e", Jo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='16.5'%20x2='21.5'%20y1='19.67'%20y2='28.33'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='.45'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20cx='19'%20cy='24'%20r='5'%20fill='url(%23a)'%20stroke='%23f8af18'%20stroke-miterlimit='10'%20stroke-width='.5'/%3e%3cpath%20fill='none'%20stroke='%23fbbf24'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M19%2015.67V12.5m0%2023v-3.17m5.89-14.22l2.24-2.24M10.87%2032.13l2.24-2.24m0-11.78l-2.24-2.24m16.26%2016.26l-2.24-2.24M7.5%2024h3.17m19.83%200h-3.17'%3e%3canimateTransform%20attributeName='transform'%20dur='45s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2019%2024;%20360%2019%2024'/%3e%3c/path%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3c/svg%3e", ea = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='13.58'%20x2='24.15'%20y1='15.57'%20y2='33.87'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='10%2019.22%2024.293;%20-10%2019.22%2024.293;%2010%2019.22%2024.293'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%2372b9d5'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.5'%20d='M29.33%2026.68a10.61%2010.61%200%2001-10.68-10.54A10.5%2010.5%200%200119%2013.5a10.54%2010.54%200%201011.5%2013.11%2011.48%2011.48%200%2001-1.17.07z'%3e%3canimateTransform%20attributeName='transform'%20dur='10s'%20repeatCount='indefinite'%20type='rotate'%20values='-10%2019.22%2024.293;%2010%2019.22%2024.293;%20-10%2019.22%2024.293'/%3e%3c/path%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3c/svg%3e", ta = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='27.5'%20x2='36.5'%20y1='50.21'%20y2='65.79'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20y1='44.21'%20y2='59.79'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M17%2058h30'%3e%3canimateTransform%20attributeName='transform'%20begin='0s'%20dur='5s'%20repeatCount='indefinite'%20type='translate'%20values='-4%200;%204%200;%20-4%200'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M17%2052h30'%3e%3canimateTransform%20attributeName='transform'%20begin='-4s'%20dur='5s'%20repeatCount='indefinite'%20type='translate'%20values='-4%200;%204%200;%20-4%200'/%3e%3c/path%3e%3c/svg%3e", ia = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='23.25'%20x2='24.75'%20y1='43.7'%20y2='46.3'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='30.25'%20x2='31.75'%20y1='43.7'%20y2='46.3'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='37.25'%20x2='38.75'%20y1='43.7'%20y2='46.3'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='url(%23a)'%20d='M24%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23c)'%20d='M31%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23d)'%20d='M38%2043.5a1.5%201.5%200%20101.5%201.5%201.5%201.5%200%2000-1.5-1.5z'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.6s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2018;%20-4%2014'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.6s'%20repeatCount='indefinite'%20values='1;1;0'/%3e%3c/path%3e%3c/svg%3e", na = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='22.53'%20x2='25.47'%20y1='42.95'%20y2='48.05'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.53'%20x2='32.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='36.53'%20x2='39.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='26.74'%20x2='35.76'%20y1='37.88'%20y2='53.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='.45'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='url(%23e)'%20stroke='%23f6a823'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M30%2036l-4%2012h4l-2%2010%2010-14h-6l4-8h-6z'%3e%3canimate%20attributeName='opacity'%20dur='2s'%20repeatCount='indefinite'%20values='1;%201;%201;%201;%201;%201;%200.1;%201;%200.1;%201;%201;%200.1;%201;%200.1;%201'/%3e%3c/path%3e%3c/svg%3e", ra = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='26.74'%20x2='35.76'%20y1='37.88'%20y2='53.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='.45'%20stop-color='%23f7b23b'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23a)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='url(%23b)'%20stroke='%23f6a823'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M30%2036l-4%2012h4l-2%2010%2010-14h-6l4-8h-6z'%3e%3canimate%20attributeName='opacity'%20dur='2s'%20repeatCount='indefinite'%20values='1;%201;%201;%201;%201;%201;%200.1;%201;%200.1;%201;%201;%200.1;%201;%200.1;%201'/%3e%3c/path%3e%3c/svg%3e", sa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='22.53'%20x2='25.47'%20y1='42.95'%20y2='48.05'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.53'%20x2='32.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='36.53'%20x2='39.47'%20y1='42.95'%20y2='48.05'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.4s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.39%2043.03l-.78%204.94'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.2s'%20dur='0.7s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3c/svg%3e", oa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='b'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='30.12'%20x2='31.88'%20y1='43.48'%20y2='46.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='29.67'%20x2='32.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='d'%20x1='23.12'%20x2='24.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='22.67'%20x2='25.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='f'%20x1='37.12'%20x2='38.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='g'%20x1='36.67'%20x2='39.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='url(%23b)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cg%3e%3ccircle%20cx='31'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23a)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23c)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M33.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M31%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='-1%20-6;%201%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2031%2045;%20360%2031%2045'/%3e%3canimate%20attributeName='opacity'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='24'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23d)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23e)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M26.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M24%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2045;%20360%2024%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='38'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23f)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23g)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M40.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M38%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2038%2045;%20360%2038%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3c/svg%3e", aa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='c'%20x1='22.56'%20x2='39.2'%20y1='21.96'%20y2='50.8'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='.45'%20stop-color='%23f3f7fe'/%3e%3cstop%20offset='1'%20stop-color='%23deeafb'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%20x1='23.12'%20x2='24.88'%20y1='43.48'%20y2='46.52'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2386c3db'/%3e%3cstop%20offset='.45'%20stop-color='%2386c3db'/%3e%3cstop%20offset='1'%20stop-color='%235eafcf'/%3e%3c/linearGradient%3e%3clinearGradient%20id='d'%20x1='22.67'%20x2='25.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='e'%20x1='37.12'%20x2='38.88'%20y1='43.48'%20y2='46.52'%20xlink:href='%23a'/%3e%3clinearGradient%20id='f'%20x1='36.67'%20x2='39.33'%20y1='42.69'%20y2='47.31'%20xlink:href='%23a'/%3e%3clinearGradient%20id='b'%20x1='23.31'%20x2='24.69'%20y1='44.3'%20y2='46.7'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%234286ee'/%3e%3cstop%20offset='.45'%20stop-color='%234286ee'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20id='g'%20x1='30.31'%20x2='31.69'%20y1='44.3'%20y2='46.7'%20xlink:href='%23b'/%3e%3clinearGradient%20id='h'%20x1='37.31'%20x2='38.69'%20y1='44.3'%20y2='46.7'%20xlink:href='%23b'/%3e%3c/defs%3e%3cpath%20fill='url(%23c)'%20stroke='%23e6effc'%20stroke-miterlimit='10'%20stroke-width='.5'%20d='M46.5%2031.5h-.32a10.49%2010.49%200%2000-19.11-8%207%207%200%2000-10.57%206%207.21%207.21%200%2000.1%201.14A7.5%207.5%200%200018%2045.5a4.19%204.19%200%2000.5%200v0h28a7%207%200%20000-14z'/%3e%3cg%3e%3ccircle%20cx='24'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23a)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23d)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M26.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M24%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2045;%20360%2024%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-2s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cg%3e%3ccircle%20cx='38'%20cy='45'%20r='1.25'%20fill='none'%20stroke='url(%23e)'%20stroke-miterlimit='10'/%3e%3cpath%20fill='none'%20stroke='url(%23f)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20d='M40.17%2046.25l-1.09-.63m-2.16-1.24l-1.09-.63M38%2042.5v1.25m0%203.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-6;%20-1%2012'/%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='9s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2038%2045;%20360%2038%2045'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='4s'%20repeatCount='indefinite'%20values='0;1;1;1;0'/%3e%3c/g%3e%3cpath%20fill='none'%20stroke='url(%23b)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M24.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23g)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M31.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20begin='-0.5s'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-0.5s'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23h)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='2'%20d='M38.08%2045.01l-.16.98'%3e%3canimateTransform%20attributeName='transform'%20begin='-1s'%20dur='1.5s'%20repeatCount='indefinite'%20type='translate'%20values='1%20-5;%20-2%2010'/%3e%3canimate%20attributeName='opacity'%20begin='-1s'%20dur='1.5s'%20repeatCount='indefinite'%20values='0;1;1;0'/%3e%3c/path%3e%3c/svg%3e", la = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='21.97'%20x2='42.03'%20y1='14.63'%20y2='49.37'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3canimateTransform%20attributeName='gradientTransform'%20dur='1s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2032%2032;%20360%2032%2032'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M43%2032a11%2011%200%2011-11-11%2011%2011%200%200111%2011zM25%2014.61l-.48%201a33.68%2033.68%200%2000-3.42%2017.82h0M39%2049.39l.48-1a33.68%2033.68%200%20003.42-17.82h0'%3e%3canimateTransform%20attributeName='transform'%20dur='1s'%20repeatCount='indefinite'%20type='rotate'%20values='360%2032%2032;%200%2032%2032'/%3e%3c/path%3e%3c/svg%3e", zn = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='27.56'%20x2='38.27'%20y1='17.64'%20y2='36.19'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='.45'%20stop-color='%23d4d7dd'/%3e%3cstop%20offset='1'%20stop-color='%23bec1c6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='19.96'%20x2='31.37'%20y1='29.03'%20y2='48.8'%20xlink:href='%23a'/%3e%3c/defs%3e%3cpath%20fill='none'%20stroke='url(%23a)'%20stroke-dasharray='35%2022'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M43.64%2020a5%205%200%20113.61%208.46h-35.5'%3e%3canimate%20attributeName='stroke-dashoffset'%20dur='2s'%20repeatCount='indefinite'%20values='-57;%2057'/%3e%3c/path%3e%3cpath%20fill='none'%20stroke='url(%23b)'%20stroke-dasharray='24%2015'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M29.14%2044a5%205%200%20103.61-8.46h-21'%3e%3canimate%20attributeName='stroke-dashoffset'%20begin='-1.5s'%20dur='2s'%20repeatCount='indefinite'%20values='-39;%2039'/%3e%3c/path%3e%3c/svg%3e", vi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='26.75'%20x2='37.25'%20y1='22.91'%20y2='41.09'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='.45'%20stop-color='%23fbbf24'/%3e%3cstop%20offset='1'%20stop-color='%23f59e0b'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle%20cx='32'%20cy='32'%20r='10.5'%20fill='url(%23a)'%20stroke='%23f8af18'%20stroke-miterlimit='10'%20stroke-width='.5'/%3e%3cpath%20fill='none'%20stroke='%23fbbf24'%20stroke-linecap='round'%20stroke-miterlimit='10'%20stroke-width='3'%20d='M32%2015.71V9.5m0%2045v-6.21m11.52-27.81l4.39-4.39M16.09%2047.91l4.39-4.39m0-23l-4.39-4.39m31.82%2031.78l-4.39-4.39M15.71%2032H9.5m45%200h-6.21'%3e%3canimateTransform%20attributeName='transform'%20dur='45s'%20repeatCount='indefinite'%20type='rotate'%20values='0%2032%2032;%20360%2032%2032'/%3e%3c/path%3e%3c/svg%3e", ca = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20512%20512'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='52.7'%20x2='133.4'%20y1='9.6'%20y2='149.3'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%239ca3af'/%3e%3cstop%20offset='.5'%20stop-color='%239ca3af'/%3e%3cstop%20offset='1'%20stop-color='%236b7280'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='99.5'%20x2='232.6'%20y1='30.7'%20y2='261.4'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%236b7280'/%3e%3cstop%20offset='.5'%20stop-color='%236b7280'/%3e%3cstop%20offset='1'%20stop-color='%234b5563'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='1381.3'%20x2='1399.5'%20y1='-1144.7'%20y2='-1097.4'%20gradientTransform='rotate(-9%208002.567%208233.063)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%230b65ed'/%3e%3cstop%20offset='.5'%20stop-color='%230a5ad4'/%3e%3cstop%20offset='1'%20stop-color='%230950bc'/%3e%3c/linearGradient%3e%3clinearGradient%20xlink:href='%23c'%20id='d'%20x1='1436.7'%20x2='1454.9'%20y1='-1137'%20y2='-1089.7'%20gradientTransform='rotate(-9%208009.537%208233.037)'/%3e%3clinearGradient%20xlink:href='%23c'%20id='e'%20x1='1492.1'%20x2='1510.3'%20y1='-1129.3'%20y2='-1082.1'%20gradientTransform='rotate(-9%208016.566%208233.078)'/%3e%3csymbol%20id='g'%20viewBox='0%200%20200.3%20126.1'%3e%3cpath%20fill='url(%23a)'%20stroke='%23848b98'%20stroke-miterlimit='10'%20d='M.5%2093.2a32.4%2032.4%200%200032.4%2032.4h129.8v-.1l2.3.1a34.8%2034.8%200%20006.5-68.9%2032.4%2032.4%200%2000-48.5-33%2048.6%2048.6%200%2000-88.6%2037.1h-1.5A32.4%2032.4%200%2000.5%2093.1Z'/%3e%3c/symbol%3e%3csymbol%20id='h'%20viewBox='0%200%20350%20222'%3e%3cpath%20fill='url(%23b)'%20stroke='%235b6472'%20stroke-miterlimit='10'%20stroke-width='6'%20d='m291%20107-2.5.1A83.9%2083.9%200%2000135.6%2043%2056%2056%200%200051%2091a56.6%2056.6%200%2000.8%209A60%2060%200%200063%20219l4-.2v.2h224a56%2056%200%20000-112Z'/%3e%3c/symbol%3e%3csymbol%20id='f'%20overflow='visible'%20viewBox='0%200%20398%20222'%3e%3cuse%20xlink:href='%23g'%20width='200.3'%20height='126.1'%20transform='translate(198%2027)'%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='6s'%20repeatCount='indefinite'%20type='translate'%20values='-9%200;%209%200;%20-9%200'/%3e%3c/use%3e%3cuse%20xlink:href='%23h'%20width='350'%20height='222'%3e%3canimateTransform%20additive='sum'%20attributeName='transform'%20dur='6s'%20repeatCount='indefinite'%20type='translate'%20values='-18%200;%2018%200;%20-18%200'/%3e%3c/use%3e%3c/symbol%3e%3csymbol%20id='i'%20overflow='visible'%20viewBox='0%200%20129%2057'%3e%3cpath%20fill='url(%23c)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M8.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x1'%20additive='sum'%20attributeName='transform'%20begin='0s;%20x1.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y1'%20attributeName='opacity'%20begin='0s;%20y1.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3cpath%20fill='url(%23d)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M64.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x2'%20additive='sum'%20attributeName='transform'%20begin='.33s;%20x2.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y2'%20attributeName='opacity'%20begin='.33s;%20y2.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3cpath%20fill='url(%23e)'%20stroke='%230a5ad4'%20stroke-miterlimit='10'%20d='M120.5%2056.5a8%208%200%2001-8-8v-40a8%208%200%200116%200v40a8%208%200%2001-8%208Z'%20opacity='0'%3e%3canimateTransform%20id='x3'%20additive='sum'%20attributeName='transform'%20begin='-.33s;%20x3.end+.33s'%20dur='.67s'%20type='translate'%20values='0%20-60;%200%2060'/%3e%3canimate%20id='y3'%20attributeName='opacity'%20begin='-.33s;%20y3.end+.33s'%20dur='.67s'%20keyTimes='0;%20.25;%201'%20values='0;%201;%200'/%3e%3c/path%3e%3c/symbol%3e%3c/defs%3e%3cuse%20xlink:href='%23f'%20width='398'%20height='222'%20transform='translate(68.84%20145)'/%3e%3cuse%20xlink:href='%23i'%20width='129'%20height='57'%20transform='translate(191.5%20343.5)'/%3e%3c/svg%3e";
var da = "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z", ha = "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z", pa = "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M10,18A2,2 0 0,1 12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20A2,2 0 0,1 10,18M14.5,16A1.5,1.5 0 0,1 16,17.5A1.5,1.5 0 0,1 14.5,19A1.5,1.5 0 0,1 13,17.5A1.5,1.5 0 0,1 14.5,16M10.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,15A1.5,1.5 0 0,1 9,13.5A1.5,1.5 0 0,1 10.5,12Z", ua = "M15,6.79C16.86,7.86 18,9.85 18,12C18,22 6,22 6,22C7.25,21.06 8.38,19.95 9.34,18.71C9.38,18.66 9.41,18.61 9.44,18.55C9.69,18.06 9.5,17.46 9,17.21C7.14,16.14 6,14.15 6,12C6,2 18,2 18,2C16.75,2.94 15.62,4.05 14.66,5.29C14.62,5.34 14.59,5.39 14.56,5.45C14.31,5.94 14.5,6.54 15,6.79M12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14Z", fa = "M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z", ga = "M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z", ma = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", ya = "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z", _a = "M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z", ba = "M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59", wa = "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z", xa = "M18.5,18.67C18.5,19.96 17.5,21 16.25,21C15,21 14,19.96 14,18.67C14,17.12 16.25,14.5 16.25,14.5C16.25,14.5 18.5,17.12 18.5,18.67M4,17.36C3.86,16.82 4.18,16.25 4.73,16.11L7,15.5L5.33,13.86C4.93,13.46 4.93,12.81 5.33,12.4C5.73,12 6.4,12 6.79,12.4L8.45,14.05L9.04,11.8C9.18,11.24 9.75,10.92 10.29,11.07C10.85,11.21 11.17,11.78 11,12.33L10.42,14.58L12.67,14C13.22,13.83 13.79,14.15 13.93,14.71C14.08,15.25 13.76,15.82 13.2,15.96L10.95,16.55L12.6,18.21C13,18.6 13,19.27 12.6,19.67C12.2,20.07 11.54,20.07 11.15,19.67L9.5,18L8.89,20.27C8.75,20.83 8.18,21.14 7.64,21C7.08,20.86 6.77,20.29 6.91,19.74L7.5,17.5L5.26,18.09C4.71,18.23 4.14,17.92 4,17.36M1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,11.85 3.35,12.61 3.91,13.16C4.27,13.55 4.26,14.16 3.88,14.54C3.5,14.93 2.85,14.93 2.47,14.54C1.56,13.63 1,12.38 1,11Z", nr = "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", va = "M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z", $a = "M6,6L6.69,6.06C7.32,3.72 9.46,2 12,2A5.5,5.5 0 0,1 17.5,7.5L17.42,8.45C17.88,8.16 18.42,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H6A4,4 0 0,1 2,10A4,4 0 0,1 6,6M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12H19A1,1 0 0,0 20,11A1,1 0 0,0 19,10H15.5V7.5A3.5,3.5 0 0,0 12,4A3.5,3.5 0 0,0 8.5,7.5V8H6M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";
const j = (r, e) => r ? (e || (e = "24px"), c`<ha-icon
    .icon="${r}"
    style="font-size:${e}; width: ${e}; height: ${e}"
  />`) : c`<ha-icon
      icon="mdi:weather-sunny"
      style="font-size:${e}; width: ${e}; height: ${e}"
    />`, V = (r, e) => r ? (e || (e = "24px"), w`<svg height=${e} width=${e} viewport="0 0 48 48"><path d="${r}" /></svg>`) : w`<svg height=${e} width=${e} viewport="0 0 48 48"><path d="${nr}" /></svg>`, zt = (r, e, t, i) => {
  if (!r)
    return j("mdi:weather-sunny", t);
  const n = String(r).trim().toLowerCase(), s = {
    "clear-night": V(ma, t),
    cloudy: V(da, t),
    fog: V(ha, t),
    hail: V(pa, t),
    lightning: V(fa, t),
    "lightning-rainy": V(ga, t),
    partlycloudy: V(ya, t),
    pouring: V(_a, t),
    rainy: V(ba, t),
    snowy: V(wa, t),
    "snowy-rainy": V(xa, t),
    sunny: V(nr, t),
    windy: V(va, t),
    "windy-variant": V($a, t),
    exceptional: V(ua, t)
  }, o = {
    "clear-night": j("mdi:weather-night", t),
    cloudy: j("mdi:weather-cloudy", t),
    fog: j("mdi:weather-fog", t),
    hail: j("mdi:weather-hail", t),
    lightning: j("mdi:weather-lightning", t),
    "lightning-rainy": j("mdi:weather-lightning-rainy", t),
    partlycloudy: j("mdi:weather-partly-cloudy", t),
    pouring: j("mdi:weather-pouring", t),
    rainy: j("mdi:weather-rainy", t),
    snowy: j("mdi:weather-snowy", t),
    "snowy-rainy": j("mdi:weather-snowy-rainy", t),
    sunny: j("mdi:weather-sunny", t),
    windy: j("mdi:weather-windy", t),
    "windy-variant": j("mdi:weather-windy-variant", t),
    exceptional: j("mdi:weather-hurricane", t)
  }, l = {
    "clear-night": c`<img src="${Qo}" style="font-size:${t}" />`,
    cloudy: c`<img src="${Xo}" style="font-size:${t}" />`,
    fog: c`<img src="${ta}" style="font-size:${t}" />`,
    hail: c`<img src="${ia}" style="font-size:${t}" />`,
    lightning: c`<img src="${ra}" style="font-size:${t}" />`,
    "lightning-rainy": c`<img src="${na}" style="font-size:${t}" />`,
    partlycloudy: c`<img
      src="${i ? Jo : ea}"
      style="font-size:${t}"
    />`,
    pouring: c`<img src="${ca}" style="font-size:${t}" />`,
    rainy: c`<img src="${sa}" style="font-size:${t}" />`,
    snowy: c`<img src="${oa}" style="font-size:${t}" />`,
    "snowy-rainy": c`<img src="${aa}" style="font-size:${t}" />`,
    sunny: c`<img src="${vi}" style="font-size:${t}" />`,
    windy: c`<img src="${zn}" style="font-size:${t}" />`,
    "windy-variant": c`<img src="${zn}" style="font-size:${t}" />`,
    exceptional: c`<img src="${la}" style="font-size:${t}" />`
  };
  return e === "mdi" ? o[n] || j("mdi:weather-sunny", t) : e === "mdiAsSVG" ? s[n] || c`<img src="${vi}" />` : l[n] || c`<img src="${vi}" />`;
};
function Gi() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let je = Gi();
function rr(r) {
  je = r;
}
const sr = /[&<>"']/, ka = new RegExp(sr.source, "g"), or = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Ca = new RegExp(or.source, "g"), Aa = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Ln = (r) => Aa[r];
function J(r, e) {
  if (e) {
    if (sr.test(r))
      return r.replace(ka, Ln);
  } else if (or.test(r))
    return r.replace(Ca, Ln);
  return r;
}
const Sa = /(^|[^\[])\^/g;
function L(r, e) {
  let t = typeof r == "string" ? r : r.source;
  e = e || "";
  const i = {
    replace: (n, s) => {
      let o = typeof s == "string" ? s : s.source;
      return o = o.replace(Sa, "$1"), t = t.replace(n, o), i;
    },
    getRegex: () => new RegExp(t, e)
  };
  return i;
}
function En(r) {
  try {
    r = encodeURI(r).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return r;
}
const vt = { exec: () => null };
function Nn(r, e) {
  const t = r.replace(/\|/g, (s, o, l) => {
    let a = !1, h = o;
    for (; --h >= 0 && l[h] === "\\"; )
      a = !a;
    return a ? "|" : " |";
  }), i = t.split(/ \|/);
  let n = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i[i.length - 1].trim() && i.pop(), e)
    if (i.length > e)
      i.splice(e);
    else
      for (; i.length < e; )
        i.push("");
  for (; n < i.length; n++)
    i[n] = i[n].trim().replace(/\\\|/g, "|");
  return i;
}
function _t(r, e, t) {
  const i = r.length;
  if (i === 0)
    return "";
  let n = 0;
  for (; n < i && r.charAt(i - n - 1) === e; )
    n++;
  return r.slice(0, i - n);
}
function Ma(r, e) {
  if (r.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let i = 0; i < r.length; i++)
    if (r[i] === "\\")
      i++;
    else if (r[i] === e[0])
      t++;
    else if (r[i] === e[1] && (t--, t < 0))
      return i;
  return -1;
}
function Tn(r, e, t, i) {
  const n = e.href, s = e.title ? J(e.title) : null, o = r[1].replace(/\\([\[\]])/g, "$1");
  if (r[0].charAt(0) !== "!") {
    i.state.inLink = !0;
    const l = {
      type: "link",
      raw: t,
      href: n,
      title: s,
      text: o,
      tokens: i.inlineTokens(o)
    };
    return i.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: t,
    href: n,
    title: s,
    text: J(o)
  };
}
function za(r, e) {
  const t = r.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const i = t[1];
  return e.split(`
`).map((n) => {
    const s = n.match(/^\s+/);
    if (s === null)
      return n;
    const [o] = s;
    return o.length >= i.length ? n.slice(i.length) : n;
  }).join(`
`);
}
class Vt {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(e) {
    this.options = e || je;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const i = t[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? i : _t(i, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const i = t[0], n = za(i, t[3] || "");
      return {
        type: "code",
        raw: i,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: n
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let i = t[2].trim();
      if (/#$/.test(i)) {
        const n = _t(i, "#");
        (this.options.pedantic || !n || / $/.test(n)) && (i = n.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: _t(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let i = _t(t[0], `
`).split(`
`), n = "", s = "";
      const o = [];
      for (; i.length > 0; ) {
        let l = !1;
        const a = [];
        let h;
        for (h = 0; h < i.length; h++)
          if (/^ {0,3}>/.test(i[h]))
            a.push(i[h]), l = !0;
          else if (!l)
            a.push(i[h]);
          else
            break;
        i = i.slice(h);
        const d = a.join(`
`), p = d.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`).replace(/^ {0,3}>[ \t]?/gm, "");
        n = n ? `${n}
${d}` : d, s = s ? `${s}
${p}` : p;
        const g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = g, i.length === 0)
          break;
        const f = o[o.length - 1];
        if (f?.type === "code")
          break;
        if (f?.type === "blockquote") {
          const b = f, C = b.raw + `
` + i.join(`
`), v = this.blockquote(C);
          o[o.length - 1] = v, n = n.substring(0, n.length - b.raw.length) + v.raw, s = s.substring(0, s.length - b.text.length) + v.text;
          break;
        } else if (f?.type === "list") {
          const b = f, C = b.raw + `
` + i.join(`
`), v = this.list(C);
          o[o.length - 1] = v, n = n.substring(0, n.length - f.raw.length) + v.raw, s = s.substring(0, s.length - b.raw.length) + v.raw, i = C.substring(o[o.length - 1].raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: n,
        tokens: o,
        text: s
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let i = t[1].trim();
      const n = i.length > 1, s = {
        type: "list",
        raw: "",
        ordered: n,
        start: n ? +i.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      i = n ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = n ? i : "[*+-]");
      const o = new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = !1;
      for (; e; ) {
        let a = !1, h = "", d = "";
        if (!(t = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        h = t[0], e = e.substring(h.length);
        let p = t[2].split(`
`, 1)[0].replace(/^\t+/, (E) => " ".repeat(3 * E.length)), g = e.split(`
`, 1)[0], f = !p.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, d = p.trimStart()) : f ? b = t[1].length + 1 : (b = t[2].search(/[^ ]/), b = b > 4 ? 1 : b, d = p.slice(b), b += t[1].length), f && /^[ \t]*$/.test(g) && (h += g + `
`, e = e.substring(g.length + 1), a = !0), !a) {
          const E = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), D = new RegExp(`^ {0,${Math.min(3, b - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), P = new RegExp(`^ {0,${Math.min(3, b - 1)}}(?:\`\`\`|~~~)`), q = new RegExp(`^ {0,${Math.min(3, b - 1)}}#`), W = new RegExp(`^ {0,${Math.min(3, b - 1)}}<(?:[a-z].*>|!--)`, "i");
          for (; e; ) {
            const k = e.split(`
`, 1)[0];
            let x;
            if (g = k, this.options.pedantic ? (g = g.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), x = g) : x = g.replace(/\t/g, "    "), P.test(g) || q.test(g) || W.test(g) || E.test(g) || D.test(g))
              break;
            if (x.search(/[^ ]/) >= b || !g.trim())
              d += `
` + x.slice(b);
            else {
              if (f || p.replace(/\t/g, "    ").search(/[^ ]/) >= 4 || P.test(p) || q.test(p) || D.test(p))
                break;
              d += `
` + g;
            }
            !f && !g.trim() && (f = !0), h += k + `
`, e = e.substring(k.length + 1), p = x.slice(b);
          }
        }
        s.loose || (l ? s.loose = !0 : /\n[ \t]*\n[ \t]*$/.test(h) && (l = !0));
        let C = null, v;
        this.options.gfm && (C = /^\[[ xX]\] /.exec(d), C && (v = C[0] !== "[ ] ", d = d.replace(/^\[[ xX]\] +/, ""))), s.items.push({
          type: "list_item",
          raw: h,
          task: !!C,
          checked: v,
          loose: !1,
          text: d,
          tokens: []
        }), s.raw += h;
      }
      s.items[s.items.length - 1].raw = s.items[s.items.length - 1].raw.trimEnd(), s.items[s.items.length - 1].text = s.items[s.items.length - 1].text.trimEnd(), s.raw = s.raw.trimEnd();
      for (let a = 0; a < s.items.length; a++)
        if (this.lexer.state.top = !1, s.items[a].tokens = this.lexer.blockTokens(s.items[a].text, []), !s.loose) {
          const h = s.items[a].tokens.filter((p) => p.type === "space"), d = h.length > 0 && h.some((p) => /\n.*\n/.test(p.raw));
          s.loose = d;
        }
      if (s.loose)
        for (let a = 0; a < s.items.length; a++)
          s.items[a].loose = !0;
      return s;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const i = t[1].toLowerCase().replace(/\s+/g, " "), n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: i,
        raw: t[0],
        href: n,
        title: s
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const i = Nn(t[1]), n = t[2].replace(/^\||\| *$/g, "").split("|"), s = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], o = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (i.length === n.length) {
      for (const l of n)
        /^ *-+: *$/.test(l) ? o.align.push("right") : /^ *:-+: *$/.test(l) ? o.align.push("center") : /^ *:-+ *$/.test(l) ? o.align.push("left") : o.align.push(null);
      for (let l = 0; l < i.length; l++)
        o.header.push({
          text: i[l],
          tokens: this.lexer.inline(i[l]),
          header: !0,
          align: o.align[l]
        });
      for (const l of s)
        o.rows.push(Nn(l, o.header.length).map((a, h) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: o.align[h]
        })));
      return o;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const i = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: J(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const i = t[2].trim();
      if (!this.options.pedantic && /^</.test(i)) {
        if (!/>$/.test(i))
          return;
        const o = _t(i.slice(0, -1), "\\");
        if ((i.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Ma(t[2], "()");
        if (o > -1) {
          const a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + o;
          t[2] = t[2].substring(0, o), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let n = t[2], s = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
        o && (n = o[1], s = o[3]);
      } else
        s = t[3] ? t[3].slice(1, -1) : "";
      return n = n.trim(), /^</.test(n) && (this.options.pedantic && !/>$/.test(i) ? n = n.slice(1) : n = n.slice(1, -1)), Tn(t, {
        href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let i;
    if ((i = this.rules.inline.reflink.exec(e)) || (i = this.rules.inline.nolink.exec(e))) {
      const n = (i[2] || i[1]).replace(/\s+/g, " "), s = t[n.toLowerCase()];
      if (!s) {
        const o = i[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Tn(i, s, i[0], this.lexer);
    }
  }
  emStrong(e, t, i = "") {
    let n = this.rules.inline.emStrongLDelim.exec(e);
    if (!n || n[3] && i.match(/[\p{L}\p{N}]/u))
      return;
    if (!(n[1] || n[2] || "") || !i || this.rules.inline.punctuation.exec(i)) {
      const o = [...n[0]].length - 1;
      let l, a, h = o, d = 0;
      const p = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (n = p.exec(t)) != null; ) {
        if (l = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !l)
          continue;
        if (a = [...l].length, n[3] || n[4]) {
          h += a;
          continue;
        } else if ((n[5] || n[6]) && o % 3 && !((o + a) % 3)) {
          d += a;
          continue;
        }
        if (h -= a, h > 0)
          continue;
        a = Math.min(a, a + h + d);
        const g = [...n[0]][0].length, f = e.slice(0, o + n.index + g + a);
        if (Math.min(o, a) % 2) {
          const C = f.slice(1, -1);
          return {
            type: "em",
            raw: f,
            text: C,
            tokens: this.lexer.inlineTokens(C)
          };
        }
        const b = f.slice(2, -2);
        return {
          type: "strong",
          raw: f,
          text: b,
          tokens: this.lexer.inlineTokens(b)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let i = t[2].replace(/\n/g, " ");
      const n = /[^ ]/.test(i), s = /^ /.test(i) && / $/.test(i);
      return n && s && (i = i.substring(1, i.length - 1)), i = J(i, !0), {
        type: "codespan",
        raw: t[0],
        text: i
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let i, n;
      return t[2] === "@" ? (i = J(t[1]), n = "mailto:" + i) : (i = J(t[1]), n = i), {
        type: "link",
        raw: t[0],
        text: i,
        href: n,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let i, n;
      if (t[2] === "@")
        i = J(t[0]), n = "mailto:" + i;
      else {
        let s;
        do
          s = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (s !== t[0]);
        i = J(t[0]), t[1] === "www." ? n = "http://" + t[0] : n = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: i,
        href: n,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let i;
      return this.lexer.state.inRawBlock ? i = t[0] : i = J(t[0]), {
        type: "text",
        raw: t[0],
        text: i
      };
    }
  }
}
const La = /^(?:[ \t]*(?:\n|$))+/, Ea = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Na = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ht = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ta = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ar = /(?:[*+-]|\d{1,9}[.)])/, lr = L(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, ar).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), Wi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Ha = /^[^\n]+/, Ui = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Oa = L(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Ui).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Da = L(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ar).getRegex(), ai = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ii = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Pa = L("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ii).replace("tag", ai).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cr = L(Wi).replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ai).getRegex(), Ra = L(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cr).getRegex(), Bi = {
  blockquote: Ra,
  code: Ea,
  def: Oa,
  fences: Na,
  heading: Ta,
  hr: Ht,
  html: Pa,
  lheading: lr,
  list: Da,
  newline: La,
  paragraph: cr,
  table: vt,
  text: Ha
}, Hn = L("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ai).getRegex(), Fa = {
  ...Bi,
  table: Hn,
  paragraph: L(Wi).replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Hn).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ai).getRegex()
}, Ga = {
  ...Bi,
  html: L(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ii).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: vt,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: L(Wi).replace("hr", Ht).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", lr).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, dr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Wa = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, hr = /^( {2,}|\\)\n(?!\s*$)/, Ua = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ot = "\\p{P}\\p{S}", Ia = L(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, Ot).getRegex(), Ba = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, ja = L(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, Ot).getRegex(), qa = L("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, Ot).getRegex(), Va = L("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, Ot).getRegex(), Za = L(/\\([punct])/, "gu").replace(/punct/g, Ot).getRegex(), Ka = L(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ya = L(Ii).replace("(?:-->|$)", "-->").getRegex(), Qa = L("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ya).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Zt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Xa = L(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Zt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), pr = L(/^!?\[(label)\]\[(ref)\]/).replace("label", Zt).replace("ref", Ui).getRegex(), ur = L(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ui).getRegex(), Ja = L("reflink|nolink(?!\\()", "g").replace("reflink", pr).replace("nolink", ur).getRegex(), ji = {
  _backpedal: vt,
  // only used for GFM url
  anyPunctuation: Za,
  autolink: Ka,
  blockSkip: Ba,
  br: hr,
  code: Wa,
  del: vt,
  emStrongLDelim: ja,
  emStrongRDelimAst: qa,
  emStrongRDelimUnd: Va,
  escape: dr,
  link: Xa,
  nolink: ur,
  punctuation: Ia,
  reflink: pr,
  reflinkSearch: Ja,
  tag: Qa,
  text: Ua,
  url: vt
}, el = {
  ...ji,
  link: L(/^!?\[(label)\]\((.*?)\)/).replace("label", Zt).getRegex(),
  reflink: L(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Zt).getRegex()
}, zi = {
  ...ji,
  escape: L(dr).replace("])", "~|])").getRegex(),
  url: L(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, tl = {
  ...zi,
  br: L(hr).replace("{2,}", "*").getRegex(),
  text: L(zi.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Ft = {
  normal: Bi,
  gfm: Fa,
  pedantic: Ga
}, bt = {
  normal: ji,
  gfm: zi,
  breaks: tl,
  pedantic: el
};
class ne {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || je, this.options.tokenizer = this.options.tokenizer || new Vt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: Ft.normal,
      inline: bt.normal
    };
    this.options.pedantic ? (t.block = Ft.pedantic, t.inline = bt.pedantic) : this.options.gfm && (t.block = Ft.gfm, this.options.breaks ? t.inline = bt.breaks : t.inline = bt.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Ft,
      inline: bt
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new ne(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new ne(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const i = this.inlineQueue[t];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], i = !1) {
    this.options.pedantic && (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""));
    let n, s, o;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (n = l.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
        if (n = this.tokenizer.space(e)) {
          e = e.substring(n.raw.length), n.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(n);
          continue;
        }
        if (n = this.tokenizer.code(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.fences(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.heading(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.hr(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.blockquote(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.list(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.html(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.def(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + n.raw, s.text += `
` + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
            href: n.href,
            title: n.title
          });
          continue;
        }
        if (n = this.tokenizer.table(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.lheading(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (o = e, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const a = e.slice(1);
          let h;
          this.options.extensions.startBlock.forEach((d) => {
            h = d.call({ lexer: this }, a), typeof h == "number" && h >= 0 && (l = Math.min(l, h));
          }), l < 1 / 0 && l >= 0 && (o = e.substring(0, l + 1));
        }
        if (this.state.top && (n = this.tokenizer.paragraph(o))) {
          s = t[t.length - 1], i && s?.type === "paragraph" ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n), i = o.length !== e.length, e = e.substring(n.raw.length);
          continue;
        }
        if (n = this.tokenizer.text(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && s.type === "text" ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n);
          continue;
        }
        if (e) {
          const l = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let i, n, s, o = e, l, a, h;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          d.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, l.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (a || (h = ""), a = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (i = d.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1))) {
        if (i = this.tokenizer.escape(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.tag(e)) {
          e = e.substring(i.raw.length), n = t[t.length - 1], n && i.type === "text" && n.type === "text" ? (n.raw += i.raw, n.text += i.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.link(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(i.raw.length), n = t[t.length - 1], n && i.type === "text" && n.type === "text" ? (n.raw += i.raw, n.text += i.text) : t.push(i);
          continue;
        }
        if (i = this.tokenizer.emStrong(e, o, h)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.codespan(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.br(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.del(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (i = this.tokenizer.autolink(e)) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (!this.state.inLink && (i = this.tokenizer.url(e))) {
          e = e.substring(i.raw.length), t.push(i);
          continue;
        }
        if (s = e, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const p = e.slice(1);
          let g;
          this.options.extensions.startInline.forEach((f) => {
            g = f.call({ lexer: this }, p), typeof g == "number" && g >= 0 && (d = Math.min(d, g));
          }), d < 1 / 0 && d >= 0 && (s = e.substring(0, d + 1));
        }
        if (i = this.tokenizer.inlineText(s)) {
          e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (h = i.raw.slice(-1)), a = !0, n = t[t.length - 1], n && n.type === "text" ? (n.raw += i.raw, n.text += i.text) : t.push(i);
          continue;
        }
        if (e) {
          const d = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return t;
  }
}
class Kt {
  options;
  parser;
  // set by the parser
  constructor(e) {
    this.options = e || je;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: i }) {
    const n = (t || "").match(/^\S*/)?.[0], s = e.replace(/\n$/, "") + `
`;
    return n ? '<pre><code class="language-' + J(n) + '">' + (i ? s : J(s, !0)) + `</code></pre>
` : "<pre><code>" + (i ? s : J(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, i = e.start;
    let n = "";
    for (let l = 0; l < e.items.length; l++) {
      const a = e.items[l];
      n += this.listitem(a);
    }
    const s = t ? "ol" : "ul", o = t && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + s + o + `>
` + n + "</" + s + `>
`;
  }
  listitem(e) {
    let t = "";
    if (e.task) {
      const i = this.checkbox({ checked: !!e.checked });
      e.loose ? e.tokens.length > 0 && e.tokens[0].type === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + e.tokens[0].tokens[0].text)) : e.tokens.unshift({
        type: "text",
        raw: i + " ",
        text: i + " "
      }) : t += i + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", i = "";
    for (let s = 0; s < e.header.length; s++)
      i += this.tablecell(e.header[s]);
    t += this.tablerow({ text: i });
    let n = "";
    for (let s = 0; s < e.rows.length; s++) {
      const o = e.rows[s];
      i = "";
      for (let l = 0; l < o.length; l++)
        i += this.tablecell(o[l]);
      n += this.tablerow({ text: i });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + n + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), i = e.header ? "th" : "td";
    return (e.align ? `<${i} align="${e.align}">` : `<${i}>`) + t + `</${i}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${e}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: i }) {
    const n = this.parser.parseInline(i), s = En(e);
    if (s === null)
      return n;
    e = s;
    let o = '<a href="' + e + '"';
    return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>", o;
  }
  image({ href: e, title: t, text: i }) {
    const n = En(e);
    if (n === null)
      return i;
    e = n;
    let s = `<img src="${e}" alt="${i}"`;
    return t && (s += ` title="${t}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : e.text;
  }
}
class qi {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}
class re {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || je, this.options.renderer = this.options.renderer || new Kt(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new qi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new re(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new re(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let i = "";
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = s, a = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          i += a || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "space": {
          i += this.renderer.space(o);
          continue;
        }
        case "hr": {
          i += this.renderer.hr(o);
          continue;
        }
        case "heading": {
          i += this.renderer.heading(o);
          continue;
        }
        case "code": {
          i += this.renderer.code(o);
          continue;
        }
        case "table": {
          i += this.renderer.table(o);
          continue;
        }
        case "blockquote": {
          i += this.renderer.blockquote(o);
          continue;
        }
        case "list": {
          i += this.renderer.list(o);
          continue;
        }
        case "html": {
          i += this.renderer.html(o);
          continue;
        }
        case "paragraph": {
          i += this.renderer.paragraph(o);
          continue;
        }
        case "text": {
          let l = o, a = this.renderer.text(l);
          for (; n + 1 < e.length && e[n + 1].type === "text"; )
            l = e[++n], a += `
` + this.renderer.text(l);
          t ? i += this.renderer.paragraph({
            type: "paragraph",
            raw: a,
            text: a,
            tokens: [{ type: "text", raw: a, text: a }]
          }) : i += a;
          continue;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return i;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let i = "";
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
        const l = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (l !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
          i += l || "";
          continue;
        }
      }
      const o = s;
      switch (o.type) {
        case "escape": {
          i += t.text(o);
          break;
        }
        case "html": {
          i += t.html(o);
          break;
        }
        case "link": {
          i += t.link(o);
          break;
        }
        case "image": {
          i += t.image(o);
          break;
        }
        case "strong": {
          i += t.strong(o);
          break;
        }
        case "em": {
          i += t.em(o);
          break;
        }
        case "codespan": {
          i += t.codespan(o);
          break;
        }
        case "br": {
          i += t.br(o);
          break;
        }
        case "del": {
          i += t.del(o);
          break;
        }
        case "text": {
          i += t.text(o);
          break;
        }
        default: {
          const l = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return i;
  }
}
class Wt {
  options;
  block;
  constructor(e) {
    this.options = e || je;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? ne.lex : ne.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? re.parse : re.parseInline;
  }
}
class il {
  defaults = Gi();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = re;
  Renderer = Kt;
  TextRenderer = qi;
  Lexer = ne;
  Tokenizer = Vt;
  Hooks = Wt;
  constructor(...e) {
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    let i = [];
    for (const n of e)
      switch (i = i.concat(t.call(this, n)), n.type) {
        case "table": {
          const s = n;
          for (const o of s.header)
            i = i.concat(this.walkTokens(o.tokens, t));
          for (const o of s.rows)
            for (const l of o)
              i = i.concat(this.walkTokens(l.tokens, t));
          break;
        }
        case "list": {
          const s = n;
          i = i.concat(this.walkTokens(s.items, t));
          break;
        }
        default: {
          const s = n;
          this.defaults.extensions?.childTokens?.[s.type] ? this.defaults.extensions.childTokens[s.type].forEach((o) => {
            const l = s[o].flat(1 / 0);
            i = i.concat(this.walkTokens(l, t));
          }) : s.tokens && (i = i.concat(this.walkTokens(s.tokens, t)));
        }
      }
    return i;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((i) => {
      const n = { ...i };
      if (n.async = this.defaults.async || n.async || !1, i.extensions && (i.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const o = t.renderers[s.name];
          o ? t.renderers[s.name] = function(...l) {
            let a = s.renderer.apply(this, l);
            return a === !1 && (a = o.apply(this, l)), a;
          } : t.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = t[s.level];
          o ? o.unshift(s.tokenizer) : t[s.level] = [s.tokenizer], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [s.start] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (t.childTokens[s.name] = s.childTokens);
      }), n.extensions = t), i.renderer) {
        const s = this.defaults.renderer || new Kt(this.defaults);
        for (const o in i.renderer) {
          if (!(o in s))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, a = i.renderer[l], h = s[l];
          s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p || "";
          };
        }
        n.renderer = s;
      }
      if (i.tokenizer) {
        const s = this.defaults.tokenizer || new Vt(this.defaults);
        for (const o in i.tokenizer) {
          if (!(o in s))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, a = i.tokenizer[l], h = s[l];
          s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p;
          };
        }
        n.tokenizer = s;
      }
      if (i.hooks) {
        const s = this.defaults.hooks || new Wt();
        for (const o in i.hooks) {
          if (!(o in s))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, a = i.hooks[l], h = s[l];
          Wt.passThroughHooks.has(o) ? s[l] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(s, d)).then((g) => h.call(s, g));
            const p = a.call(s, d);
            return h.call(s, p);
          } : s[l] = (...d) => {
            let p = a.apply(s, d);
            return p === !1 && (p = h.apply(s, d)), p;
          };
        }
        n.hooks = s;
      }
      if (i.walkTokens) {
        const s = this.defaults.walkTokens, o = i.walkTokens;
        n.walkTokens = function(l) {
          let a = [];
          return a.push(o.call(this, l)), s && (a = a.concat(s.call(this, l))), a;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return ne.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return re.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (i, n) => {
      const s = { ...n }, o = { ...this.defaults, ...s }, l = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && s.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof i > "u" || i === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof i != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(i) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const a = o.hooks ? o.hooks.provideLexer() : e ? ne.lex : ne.lexInline, h = o.hooks ? o.hooks.provideParser() : e ? re.parse : re.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(i) : i).then((d) => a(d, o)).then((d) => o.hooks ? o.hooks.processAllTokens(d) : d).then((d) => o.walkTokens ? Promise.all(this.walkTokens(d, o.walkTokens)).then(() => d) : d).then((d) => h(d, o)).then((d) => o.hooks ? o.hooks.postprocess(d) : d).catch(l);
      try {
        o.hooks && (i = o.hooks.preprocess(i));
        let d = a(i, o);
        o.hooks && (d = o.hooks.processAllTokens(d)), o.walkTokens && this.walkTokens(d, o.walkTokens);
        let p = h(d, o);
        return o.hooks && (p = o.hooks.postprocess(p)), p;
      } catch (d) {
        return l(d);
      }
    };
  }
  onError(e, t) {
    return (i) => {
      if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const n = "<p>An error occurred:</p><pre>" + J(i.message + "", !0) + "</pre>";
        return t ? Promise.resolve(n) : n;
      }
      if (t)
        return Promise.reject(i);
      throw i;
    };
  }
}
const Ie = new il();
function z(r, e) {
  return Ie.parse(r, e);
}
z.options = z.setOptions = function(r) {
  return Ie.setOptions(r), z.defaults = Ie.defaults, rr(z.defaults), z;
};
z.getDefaults = Gi;
z.defaults = je;
z.use = function(...r) {
  return Ie.use(...r), z.defaults = Ie.defaults, rr(z.defaults), z;
};
z.walkTokens = function(r, e) {
  return Ie.walkTokens(r, e);
};
z.parseInline = Ie.parseInline;
z.Parser = re;
z.parser = re.parse;
z.Renderer = Kt;
z.TextRenderer = qi;
z.Lexer = ne;
z.lexer = ne.lex;
z.Tokenizer = Vt;
z.Hooks = Wt;
z.parse = z;
z.options;
z.setOptions;
z.use;
z.walkTokens;
z.parseInline;
re.parse;
ne.lex;
function fr(r) {
  const e = document.createElement("template");
  e.innerHTML = r, e.content.querySelectorAll("script,style,iframe,object,embed,form,meta,base").forEach((i) => i.remove()), e.content.querySelectorAll("*").forEach((i) => {
    if (Array.from(i.attributes).forEach((n) => {
      /^on/i.test(n.name) && i.removeAttribute(n.name);
    }), i.tagName === "A") {
      const n = i.getAttribute("href") ?? "";
      /^https?:\/\//i.test(n) || i.removeAttribute("href");
    }
  });
  const t = document.createElement("div");
  return t.appendChild(e.content), t.innerHTML;
}
function nl(r) {
  return {
    yellow: "#f6c90e",
    orange: "#e17055",
    red: "#007AFF",
    violet: "#8e44ad",
    gray: "var(--disabled-text-color, #9e9e9e)"
  }[r?.toLowerCase()] ?? "var(--primary-text-color, #fff)";
}
function $i(r, e, t, i, n = 0) {
  const s = r.attributes;
  if (!s.has_warning) return null;
  const o = nl(s.icon_color), l = s.icon || "mdi:alert", a = s.warning_type || s.level_name || r.state, h = !!t[e], d = !!(s.html_text || s.text || s.links?.length);
  return c`
    <li style="margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <ha-icon icon="${l}" style="color: ${o}; flex-shrink: 0;"></ha-icon>
        <div
          style="flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px;"
        >
          <span style="font-weight: bold;">${a}</span>
          ${s.level_name ? c`<span style="font-size: 12px; opacity: 0.8;">(${s.level_name})</span>` : ""}
          ${n > 0 ? c`<span
                  style="font-size: 12px; opacity: 0.75;"
                  title="${u("warning.warnings_additional", { count: n })}"
                >
                  +${n}
                </span>` : ""}
        </div>
        ${d ? c`
                <button
                  @click=${() => i(e)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;flex-shrink:0;"
                  title="${u(h ? "collapse" : "expand")}"
                  aria-label="${u(h ? "collapse" : "expand")}"
                >
                  <ha-icon icon="${h ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
                </button>
              ` : ""}
      </div>
      ${h ? c`
              <div style="margin-top: 6px; font-size: 13px; opacity: 0.85;">
                ${s.valid_from || s.valid_to ? c`
                        <div style="margin-bottom: 4px;">
                          ${s.valid_from ? c`<strong>${u("warning.valid_from")}: </strong>${new Date(
    s.valid_from
  ).toLocaleString()}&nbsp;` : ""}
                          ${s.valid_to ? c`<strong>${u("warning.valid_to")}: </strong>${new Date(
    s.valid_to
  ).toLocaleString()}` : ""}
                        </div>
                      ` : ""}
                ${s.html_text ? c`<div
                        style="line-height: 1.4; margin-bottom: 4px;"
                        .innerHTML="${fr(s.html_text)}"
                      ></div>` : s.text ? c`<div style="line-height: 1.4; margin-bottom: 4px;">${s.text}</div>` : ""}
                ${s.links?.length ? c`
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                          ${s.links.map(
    (p) => c`
                              <a
                                href="${p.url.startsWith("http") ? p.url : p.alt_url ?? p.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center; gap: 4px;"
                              >
                                <ha-icon icon="mdi:link-variant" style="font-size: 14px;"></ha-icon>
                                ${p.text}
                              </a>
                            `
  )}
                        </div>
                      ` : ""}
              </div>
            ` : ""}
    </li>
  `;
}
function rl(r, e, t, i, n) {
  const s = r.attributes;
  if (!s.has_warning) return null;
  const o = {
    red: "danger",
    violet: "danger",
    orange: "severe",
    yellow: "warning"
  }[s.icon_color?.toLowerCase()] ?? "info", l = !!e?.attributes?.has_warning, a = !!t?.attributes?.has_warning, h = s.additional_warning_count ?? 0, d = Math.max(
    h - (l ? 1 : 0) - (a ? 1 : 0),
    0
  ), p = 1 + h, g = p === 1 ? u("warning.weather_warning") : u("warning.weather_warnings", { count: p }), f = [
    $i(r, "primary", i, n, d),
    e ? $i(e, "secondary", i, n) : null,
    t ? $i(t, "tertiary", i, n) : null
  ].filter(Boolean);
  return c`
    <div class="warning-section ${o}">
      <strong>${g}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${f}
      </ul>
    </div>
  `;
}
function sl(r, e, t) {
  const i = [];
  if (r.attributes.warning_levels && Array.isArray(r.attributes.warning_levels))
    for (let a = 0; a < r.attributes.warning_levels.length; a++)
      i.push({
        id: `warning_${a}`,
        title: r.attributes.warning_levels[a],
        level: r.attributes.warning_levels[a],
        type: r.attributes.warning_types[a],
        description: r.attributes.warning_texts[a],
        valid_from: r.attributes.warning_valid_from[a],
        valid_to: r.attributes.warning_valid_to[a],
        link: r.attributes.warning_links[a],
        regions: [],
        phenomena: []
      });
  if (i.length === 0) return null;
  const n = Math.max(...i.map((a) => a.level || 0)), s = n >= 4 ? "danger" : n >= 3 ? "severe" : n >= 2 ? "warning" : "info", o = (a) => a >= 4 ? "#007AFF" : a >= 3 ? "#e17055" : a >= 2 ? "#f6c90e" : "var(--primary-text-color, #fff)", l = {
    storm: "mdi:weather-lightning",
    thunderstorms: "mdi:weather-lightning-rainy",
    rain: "mdi:weather-pouring",
    snow: "mdi:snowflake",
    wind: "mdi:weather-windy",
    fog: "mdi:weather-fog",
    heat: "mdi:weather-sunny-alert",
    heat_waves: "mdi:thermometer-high",
    cold: "mdi:snowflake-alert",
    frost: "mdi:snowflake-thermometer",
    thaw: "mdi:thermometer-high",
    flood: "mdi:waves-arrow-up",
    drought: "mdi:water-off",
    avalanches: "mdi:snowflake-alert",
    slippery_roads: "mdi:car-brake-alert",
    forest_fires: "mdi:fire-alert",
    earthquakes: "mdi:pulse",
    default: "mdi:alert"
  };
  return c`
    <div class="warning-section ${s}">
      <strong>${u("warning.weather_warning")}</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        ${i.map(
    (a) => c`
            <li style="margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <ha-icon
                  icon="${l[a.type?.toLowerCase?.()] || l.default}"
                  style="color: ${o(a.level)};"
                ></ha-icon>
                <span style="font-weight: bold;">${a.title}</span>
                ${a.link ? c`
                        <a
                          href="${a.link}"
                          target="_blank"
                          rel="noopener noreferrer"
                          style="color: var(--primary-text-color, #fff); text-decoration: underline; display: flex; align-items: center;"
                        >
                          <ha-icon icon="mdi:link-variant" style="font-size: 16px;"></ha-icon>
                        </a>
                      ` : ""}
                <button
                  @click=${() => t(a.id)}
                  style="background:none;border:none;cursor:pointer;color:var(--primary-text-color,#fff);font-size:16px;"
                  title="${e[a.id] ? u("collapse") : u("expand")}"
                  aria-label="${e[a.id] ? u("collapse") : u("expand")}"
                >
                  <ha-icon
                    icon="${e[a.id] ? "mdi:chevron-up" : "mdi:chevron-down"}"
                  ></ha-icon>
                </button>
              </div>
              ${e[a.id] && a.description ? c`
                      <div>
                        <strong>${u("warning.valid_from")}: </strong>
                        ${a.valid_from ? new Date(a.valid_from).toLocaleString() : u("unknown")}
                        <strong>${u("warning.valid_to")}: </strong>
                        ${a.valid_to ? new Date(a.valid_to).toLocaleString() : u("unknown")}
                      </div>
                      <div
                        style="font-size: 14px; line-height: 1.4; margin-top: 4px;"
                        .innerHTML="${fr(String(z.parse(a.description || "")))}"
                      ></div>
                    ` : ""}
            </li>
          `
  )}
      </ul>
    </div>
  `;
}
function gr(r, e, t, i, n, s, o) {
  return e && e.attributes?.has_warning !== void 0 ? rl(
    e,
    t,
    i,
    n,
    s
  ) : r && r.attributes?.warning_levels ? sl(r, n, s) : r && (r.state === "on" || r.attributes?.alerts) ? ol(r, n, s, o) : null;
}
function ol(r, e, t, i) {
  const n = r.attributes, o = (n.alerts || []).filter((f) => !f.outlook);
  if (o.length === 0) {
    const f = n.active_alerts_count || 0, b = "#f6c90e";
    return c`
      <div class="ms-section" style="margin: 10px 16px;">
        <div style="display:flex;align-items:center;gap:8px;padding:12px;border-radius:10px;background:${b}15;">
          <ha-icon icon="mdi:alert" style="color:${b};flex-shrink:0;"></ha-icon>
          <div style="flex:1;font-size:13px;">${u("warning.weather_warning")}${f > 0 ? ` (${f})` : ""}</div>
        </div>
      </div>
    `;
  }
  const l = {
    1: "#4CAF50",
    // No/minor danger — green
    2: "#f6c90e",
    // Moderate — yellow
    3: "#FF9800",
    // Significant — orange
    4: "#f44336",
    // High — red
    5: "#9C27B0"
    // Very high — violet
  }, a = {
    1: "mdi:weather-lightning-rainy",
    // Thunderstorm
    2: "mdi:weather-pouring",
    // Rain
    3: "mdi:snowflake",
    // Snow/Snowfall
    4: "mdi:weather-windy",
    // Wind
    5: "mdi:weather-fog",
    // Fog
    6: "mdi:snowflake-alert",
    // Black ice / Slippery roads
    7: "mdi:weather-sunny-alert",
    // Heat
    8: "mdi:snowflake-thermometer",
    // Frost
    9: "mdi:thermometer-lines",
    // Cold/Snow drift
    10: "mdi:fire-alert",
    // Forest fire
    11: "mdi:waves-arrow-up",
    // Flood
    12: "mdi:snowflake-alert",
    // Avalanche
    13: "mdi:car-tire-alert"
    // Slippery roads
  }, h = {
    1: "Gewitter",
    2: "Regen",
    3: "Schnee",
    4: "Wind",
    5: "Nebel",
    6: "Glätte",
    7: "Hitze",
    8: "Frost",
    9: "Kälte",
    10: "Waldbrand",
    11: "Hochwasser",
    12: "Lawine",
    13: "Strassenverhältnisse"
  }, d = {
    1: "Thunderstorm",
    2: "Rain",
    3: "Snow",
    4: "Wind",
    5: "Fog",
    6: "Black Ice",
    7: "Heat",
    8: "Frost",
    9: "Cold",
    10: "Forest Fire",
    11: "Flood",
    12: "Avalanche",
    13: "Road Conditions"
  }, p = {
    1: "Keine oder geringe Gefahr",
    2: "Mässige Gefahr",
    3: "Markante Gefahr",
    4: "Grosse Gefahr",
    5: "Sehr grosse Gefahr"
  }, g = {
    "10_4": "Grosse Waldbrandgefahr. Offenes Feuer streng verboten. Die Kantone haben Massnahmen ergriffen. Weitere Infos beim BAFU.",
    "10_3": "Markante Waldbrandgefahr. Vorsicht bei offenen Feuerstellen. Waldbetretungsverbote möglich.",
    "10_2": "Erhöhte Waldbrandgefahr. Vorsicht mit Feuer im Freien.",
    "7_3": "Hitzebelastung: Signifikantes Risiko für Kreislaufprobleme und körperliches Unbehagen. Mindestens 1,5 Liter pro Tag trinken. Körperliche Anstrengung zur heissesten Tageszeit vermeiden. Empfehlungen des BAG beachten.",
    "7_4": "Grosse Hitzebelastung: Hohes Risiko für Kreislaufprobleme. Ausreichend trinken, körperliche Anstrengung vermeiden, kühle Orte aufsuchen.",
    "7_5": "Extreme Hitze: Sehr hohes Gesundheitsrisiko. Aufbesondere Vorsicht für Kinder, Ältere und Kranke.",
    "1_3": "Markante Gewittergefahr mit Starkregen, Hagel und Sturmböen. Freie Flächen meiden, Fenster schliessen.",
    "1_4": "Grosse Gewittergefahr. Lebensgefahr durch Blitzeinschlag, Sturmböen und Hagel. Im Gebäude bleiben.",
    "2_3": "Markante Regenmenge. Überschwemmungen möglich. Bachufer meiden.",
    "2_4": "Starkregen: Hochwassergefahr. Tiefgaragen und Unterführungen meiden.",
    "3_3": "Markanter Schneefall. Schneeketten empfohlen. Dächer auf Schneelast prüfen.",
    "4_3": "Markante Windböen. Lose Gegenstände sichern. Wälder und Baustellen meiden.",
    "4_4": "Sturm mit schweren Böen. Lebensgefahr durch herabfallende Äste und Gegenstände. Drinnen bleiben.",
    "11_3": "Erhöhte Hochwassergefahr. Uferbereiche meiden.",
    "11_4": "Grosse Hochwassergefahr. Überflutete Strassen meiden.",
    "12_3": "Erhöhte Lawinengefahr. Abseits der Pisten nicht unterwegs.",
    "12_4": "Grosse Lawinengefahr. Warnungen der lokalen Behörden beachten."
  };
  return c`
    <div style="margin: 10px 16px;">
      ${o.map((f, b) => {
    const C = `ms_alert_${b}`, v = f.warn_level || f.level || 3, E = l[v] || l[3], D = f.warn_type || 0, P = a[D] || "mdi:alert", W = (typeof i < "u" && i?.language || "en").startsWith("de"), x = (W ? h : d)[D] || f.warn_type_name || "", M = W ? p[v] || f.warn_level_name || "" : f.warn_level_name || "", O = `${D}_${v}`, $ = W && g[O] || "", F = f.description || "", R = $ || F, K = !!e[C], te = f.valid_from || f.start, ie = f.valid_to && f.valid_to !== "None" ? f.valid_to : f.end || null;
    return c`
          <div style="
            display: flex; align-items: flex-start; gap: 10px;
            padding: 12px; border-radius: 10px; margin-bottom: 8px;
            background: ${E}18; border-left: 4px solid ${E};
          ">
            <ha-icon icon="${P}" style="color:${E};flex-shrink:0;margin-top:2px;--mdc-icon-size:24px;"></ha-icon>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:14px;color:${E};">${x}</div>
              <div style="font-size:12px;opacity:0.8;margin-top:2px;">${M}</div>
              ${te || ie && ie !== "None" ? c`
                <div style="font-size:11px;opacity:0.65;margin-top:3px;">
                  ${te ? "von " + new Date(te).toLocaleDateString("de-CH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""}
                  ${ie && ie !== "None" ? " bis " + new Date(ie).toLocaleDateString("de-CH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""}
                </div>` : ""}
              ${R && K ? c`
                <div style="font-size:12px;margin-top:8px;line-height:1.5;opacity:0.85;white-space:pre-wrap;border-top:1px solid ${E}33;padding-top:6px;">${$ || R}</div>
              ` : ""}
              ${!K && $ ? c`
                <div style="font-size:11px;margin-top:4px;opacity:0.6;">${$.substring(0, 80)}...</div>
              ` : ""}
            </div>
            ${R ? c`
              <button @click=${() => t(C)}
                style="background:none;border:none;cursor:pointer;color:inherit;flex-shrink:0;padding:4px;">
                <ha-icon icon="${K ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon>
              </button>` : ""}
          </div>
        `;
  })}
    </div>
  `;
}
const al = [
  // Temperature — must NOT match bodentemperatur/lufttemperatur_in_X
  { key: "temperature", patterns: ["_temperatur", "_temperature"], exclude: ["boden", "soil", "luft"] },
  { key: "humidity", patterns: ["luftfeuchtigkeit", "humidity", "feuchtigkeit"] },
  { key: "wind_speed", patterns: ["windgeschwindigkeit", "wind_speed"] },
  { key: "wind_direction", patterns: ["windrichtung", "wind_direction"] },
  { key: "wind_gust", patterns: ["windboe", "wind_gust", "boee"] },
  { key: "pressure", patterns: ["luftdruck", "pressure"] },
  { key: "precipitation", patterns: ["niederschlag", "precipitation", "regenmenge"] },
  { key: "dew_point", patterns: ["taupunkt", "dew_point"] },
  { key: "sunshine_duration", patterns: ["sonnenscheindauer", "sunshine_duration"] },
  { key: "global_radiation", patterns: ["globalstrahlung", "global_radiation"] },
  { key: "uv_index", patterns: ["uv_index", "uvindex"] },
  { key: "snow_depth", patterns: ["schneehohe", "schneehöhe", "snow_depth"] },
  { key: "foehn_index", patterns: ["fohnindex", "foehn_index", "foehn"] },
  // Soil temps — must be checked BEFORE generic temperature
  // Substring matching is intentional: 'bodentemperatur_5' matches 'bodentemperatur_5_cm' in DE entity IDs
  { key: "soil_temp_5cm", patterns: ["bodentemperatur_5", "soil_temperature_5"] },
  { key: "soil_temp_10cm", patterns: ["bodentemperatur_10", "soil_temperature_10"] },
  { key: "soil_temp_20cm", patterns: ["bodentemperatur_20", "soil_temperature_20"] },
  { key: "pm25", patterns: ["pm2_5", "pm25", "feinstaub_pm2"] },
  { key: "pm10", patterns: ["pm10", "feinstaub_pm10"] },
  { key: "nitrogen_dioxide", patterns: ["stickstoffdioxid", "nitrogen_dioxide", "no2"] },
  { key: "ozone", patterns: ["ozon", "ozone"] },
  // Pollen
  { key: "pollen_birch", patterns: ["birch_pollen", "birkenpollen", "pollen_birch"] },
  { key: "pollen_alder", patterns: ["alder_pollen", "erlenpollen", "pollen_alder"] },
  { key: "pollen_grass", patterns: ["grass_pollen", "graserpollen", "pollen_grass", "pollen_grasses"] },
  { key: "pollen_mugwort", patterns: ["mugwort_pollen", "beifusspollen", "pollen_mugwort"] },
  { key: "pollen_ragweed", patterns: ["ragweed_pollen", "ambrosiapollen", "pollen_ambrosia", "pollen_ragweed"] },
  { key: "pollen_hazel", patterns: ["haselpollen", "hazel_pollen", "pollen_hazel"] },
  { key: "pollen_beech", patterns: ["buchenpollen", "beech_pollen", "pollen_beech"] },
  { key: "pollen_ash", patterns: ["eschenpollen", "ash_pollen", "pollen_ash"] },
  { key: "pollen_oak", patterns: ["eichenpollen", "oak_pollen", "pollen_oak"] },
  // Heating
  { key: "heating_degree_days", patterns: ["heizgradtage"] },
  { key: "season_heating_degree_days", patterns: ["heizgradtage_saison", "season_hgt"] }
];
function mr(r, e) {
  const t = {};
  if (!r?.states) return t;
  const i = Object.keys(r.states), n = e.match(/^weather\.meteoswiss_(.+)$/);
  let s = n ? n[1] : "";
  s = s.replace(/_\d+$/, "");
  for (const { key: o, patterns: l, exclude: a } of al) {
    let h;
    for (const d of i) {
      const p = d.toLowerCase();
      if (!(!p.startsWith("sensor.") || a && a.some((f) => p.includes(f)) || !l.some((f) => p.includes(f))) && !(o === "heating_degree_days" && (p.includes("saison") || p.includes("season"))) && !(o === "season_heating_degree_days" && !p.includes("saison") && !p.includes("season"))) {
        if (s && p.includes(s)) {
          h = d;
          break;
        }
        h || (h = d);
      }
    }
    h && (t[o] = h);
  }
  for (const o of i) {
    const l = o.toLowerCase();
    if (!l.startsWith("binary_sensor.")) continue;
    const a = l.includes("critical") || l.includes("kritisch"), h = l.includes("alert") || l.includes("warnung");
    a && h ? t.critical_alert = o : h && !t.any_alert && (t.any_alert = o);
  }
  return r.states[e] && (t.weather = e), t;
}
function Ye(r, e) {
  if (!e || !r.states[e]) return null;
  const t = r.states[e].state;
  if (t === "unavailable" || t === "unknown") return null;
  const i = parseFloat(t);
  return isNaN(i) ? null : i;
}
function ll(r) {
  const e = [
    { label: "Kein Föhn", color: "#4CAF50" },
    { label: "Stationär", color: "#8BC34A" },
    { label: "Möglicher Föhn", color: "#FFC107" },
    { label: "Gemischter Föhn", color: "#FF9800" },
    { label: "Föhn", color: "#FF5722" },
    { label: "Starker Föhn", color: "#f44336" }
  ];
  return e[r] || e[0];
}
var cl = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, Ne = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? dl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && cl(e, t, n), n;
};
I({
  loader: (r) => B[r]
});
let me = class extends N {
  constructor() {
    super(...arguments), this._forecast = [], this._hourlyForecast = [], this._forecastLoading = !1, this._openWarnings = {}, this._resolvedEntities = null, this._resizeObserver = null, this._toggleWarning = (r) => {
      this._openWarnings = { ...this._openWarnings, [r]: !this._openWarnings[r] }, this.requestUpdate();
    };
  }
  updated(r) {
    if (super.updated(r), this.hass && this.config && this.config.entity) {
      const e = this._lastEntityId !== this.config.entity, t = r.has("hass");
      if (e && (this._lastEntityId = this.config.entity), (e || t) && this.config.auto_resolve_entities !== !1) {
        const i = mr(this.hass, this.config.entity), n = Object.values(i).filter((o) => o).length, s = this._resolvedEntities ? Object.values(this._resolvedEntities).filter((o) => o).length : 0;
        (e || n > s) && (this._resolvedEntities = i);
      }
      e && this._loadForecast();
    }
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const r = async (i) => {
          try {
            const n = await this.hass.callWS({
              type: "weather/get_forecasts",
              entity_id: this.config.entity,
              forecast_type: i
            });
            return n?.[this.config.entity]?.forecast ?? n?.forecast ?? [];
          } catch {
            try {
              return (await this.hass.callWS({
                type: "call_service",
                domain: "weather",
                service: "get_forecasts",
                service_data: { entity_id: this.config.entity, type: i },
                return_response: !0
              }))?.response?.[this.config.entity]?.forecast ?? [];
            } catch {
              return [];
            }
          }
        }, [e, t] = await Promise.all([
          r("daily"),
          r("hourly")
        ]);
        this._forecast = e, this._hourlyForecast = t;
      } catch {
        this._forecast = [], this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  // ═══════════════════════════════════════════════════════════════
  // iOS WEATHER INSPIRED STYLES
  // ═══════════════════════════════════════════════════════════════
  static get styles() {
    return T`
      :host {
        display: block;
        container-type: inline-size;
        --ms-text: var(--primary-text-color, #fff);
        --ms-text-secondary: var(--secondary-text-color, rgba(235, 235, 245, 0.6));
        --ms-accent: #007AFF;
        --ms-card-bg: rgba(255, 255, 255, 0.08);
        --ms-card-border: rgba(255, 255, 255, 0.06);
        --ms-radius: 18px;
        --ms-radius-sm: 12px;
        --ms-font: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
          'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;

        background: var(--ha-card-background, var(--card-background-color, rgba(28, 28, 30, 0.72)));
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        border-radius: var(--ms-radius);
        padding: 0;
        font-family: var(--ms-font);
        color: var(--ms-text);
        overflow: hidden;
      }

      /* ── Display mode modifiers ── */
      :host([data-display='compact']) .ms-swiss-section,
      :host([data-display='compact']) .ms-heating-section,
      :host([data-display='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Auto mode: compact when container is narrow */
      :host([data-display-effective='compact']) .ms-swiss-section,
      :host([data-display-effective='compact']) .ms-heating-section,
      :host([data-display-effective='compact']) .ms-chart-container {
        display: none !important;
      }
      :host([data-display-effective='compact']) .ms-header { padding: 16px 16px 4px; }
      :host([data-display-effective='compact']) .ms-section { margin: 6px 12px; padding: 10px 12px; }

      /* Header — responsive with clamp() */
      .ms-header { text-align: center; padding: 28px 20px 8px; }
      .ms-header-main {
        display: flex; align-items: center; justify-content: center;
        gap: clamp(8px, 3cqw, 20px); margin: 4px 0;
      }
      .ms-location {
        font-size: clamp(20px, 5cqw, 28px); font-weight: 400; letter-spacing: -0.5px;
      }
      .ms-temp {
        font-size: clamp(48px, 14cqw, 72px); font-weight: 200; line-height: 1.1;
        letter-spacing: -2px; margin-top: 2px;
      }
      .ms-temp .ms-temp-unit {
        font-size: 0.45em; font-weight: 300; vertical-align: top;
        margin-left: 2px; opacity: 0.7;
      }
      .ms-condition {
        font-size: 16px; font-weight: 500;
        color: var(--ms-text-secondary); margin-top: -4px;
      }
      .ms-hl {
        font-size: 15px; font-weight: 400;
        color: var(--ms-text-secondary); margin-top: 2px;
      }
      .ms-weather-icon {
        width: clamp(56px, 12cqw, 80px); height: clamp(56px, 12cqw, 80px);
        margin: 0 auto; display: block; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ms-weather-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-weather-icon ha-icon {
        --mdc-icon-size: clamp(56px, 12cqw, 80px) !important;
      }

      /* Glass Sections */
      .ms-section {
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: var(--ms-radius-sm);
        margin: 10px 16px;
        padding: 14px 16px;
      }
      .ms-section-label {
        font-size: 11px; font-weight: 600; text-transform: uppercase;
        letter-spacing: 1px; color: var(--ms-text-secondary);
        margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
      }
      .ms-section-label ha-icon { --mdc-icon-size: 14px; }

      /* Metric Pills */
      .ms-metrics { display: flex; flex-wrap: wrap; gap: 8px; }
      .ms-pill {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 14px;
        background: var(--ms-card-bg);
        border: 0.5px solid var(--ms-card-border);
        border-radius: 20px; font-size: 14px;
      }
      .ms-pill ha-icon { --mdc-icon-size: 16px; opacity: 0.8; }
      .ms-pill-value { font-weight: 600; }
      .ms-pill-label { color: var(--ms-text-secondary); font-size: 12px; }

      /* Swiss Values */
      .ms-swiss-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
      }
      .ms-swiss-item {
        display: flex; flex-direction: column; align-items: center;
        padding: 10px; background: rgba(255, 255, 255, 0.04);
        border-radius: 10px;
      }
      .ms-swiss-value { font-size: 18px; font-weight: 500; }
      .ms-swiss-label { font-size: 11px; color: var(--ms-text-secondary); margin-top: 2px; }
      .ms-foehn-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 10px; border-radius: 10px;
        font-size: 13px; font-weight: 600;
      }

      /* Heating */
      .ms-hdd { display: flex; align-items: center; justify-content: space-between; }
      .ms-hdd-today { display: flex; align-items: baseline; gap: 4px; }
      .ms-hdd-value { font-size: 22px; font-weight: 400; }
      .ms-hdd-unit { font-size: 12px; color: var(--ms-text-secondary); }
      .ms-hdd-season { font-size: 13px; color: var(--ms-text-secondary); }

      /* Forecast Strip */
      .ms-forecast {
        display: flex; gap: 2px; overflow-x: auto;
        -webkit-overflow-scrolling: touch; scrollbar-width: none;
      }
      .ms-forecast::-webkit-scrollbar { display: none; }
      .ms-forecast-day {
        flex: 1; min-width: 48px;
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 8px 4px;
      }
      .ms-forecast-weekday { font-size: 13px; font-weight: 600; color: var(--ms-text-secondary); }
      .ms-forecast-icon {
        width: clamp(28px, 7cqw, 36px); height: clamp(28px, 7cqw, 36px);
        display: flex; align-items: center; justify-content: center;
      }
      .ms-forecast-icon img {
        width: 100% !important; height: 100% !important;
        object-fit: contain; font-size: inherit !important;
      }
      .ms-forecast-icon ha-icon {
        --mdc-icon-size: clamp(28px, 7cqw, 36px) !important;
      }
      .ms-forecast-temps { display: flex; flex-direction: column; align-items: center; }
      .ms-forecast-high { font-size: 15px; font-weight: 500; }
      .ms-forecast-low { font-size: 13px; color: var(--ms-text-secondary); }
      .ms-forecast-precip { font-size: 11px; color: var(--ms-accent); opacity: 0.8; }

      /* Chart Container */
      .ms-chart-container { margin: 10px 16px; }

      /* Footer */
      .ms-footer {
        text-align: center; padding: 8px 16px 16px;
        font-size: 11px; color: var(--ms-text-secondary); opacity: 0.5;
      }

      /* Wind Compass */
      .ms-wind-compass { width: 20px; height: 20px; position: relative; display: inline-block; }
      .ms-wind-compass::before {
        content: ''; position: absolute; inset: 0;
        border: 1.5px solid var(--ms-text-secondary);
        border-radius: 50%; opacity: 0.4;
      }
      .ms-wind-arrow {
        position: absolute; top: 50%; left: 50%; width: 0; height: 0;
        border-left: 4px solid transparent; border-right: 4px solid transparent;
        border-bottom: 10px solid var(--ms-accent);
        transform-origin: bottom center; transform: translate(-50%, -100%);
      }

      /* ── Mobile-first responsive ── */
      @media (max-width: 480px) {
        .ms-temp { font-size: clamp(48px, 18vw, 60px); }
        .ms-location { font-size: clamp(20px, 6vw, 24px); }
        .ms-weather-icon { width: clamp(48px, 14vw, 64px); height: clamp(48px, 14vw, 64px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; object-fit: contain; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(48px, 14vw, 64px) !important; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; }
        .ms-section { margin: 8px 12px; padding: 12px; }
        .ms-pill { padding: 6px 10px; font-size: 13px; }
        .ms-forecast-day { min-width: 42px; }
        .ms-forecast-high { font-size: 14px; }
        .ms-forecast-low { font-size: 12px; }
        .ms-forecast-weekday { font-size: 12px; }
      }

      /* ── Container queries for card width (not viewport) ── */
      @container (max-width: 350px) {
        .ms-temp { font-size: clamp(40px, 16cqw, 52px); }
        .ms-location { font-size: 18px; }
        .ms-weather-icon { width: 48px; height: 48px; }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: 48px !important; }
        .ms-section { margin: 6px 10px; padding: 10px; }
        .ms-pill { padding: 5px 8px; font-size: 12px; }
        .ms-swiss-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
        .ms-forecast-day { min-width: 38px; padding: 6px 2px; }
        .ms-forecast-icon { width: 26px; height: 26px; }
        .ms-forecast-icon img { width: 100% !important; height: 100% !important; }
        .ms-forecast-icon ha-icon { --mdc-icon-size: 26px !important; }
        .ms-forecast-high { font-size: 13px; }
        .ms-forecast-low { font-size: 11px; }
        .ms-section-label { font-size: 10px; }
      }

      @container (min-width: 600px) {
        .ms-temp { font-size: clamp(64px, 10cqw, 84px); }
        .ms-location { font-size: clamp(24px, 4cqw, 32px); }
        .ms-weather-icon { width: clamp(72px, 14cqw, 96px); height: clamp(72px, 14cqw, 96px); }
        .ms-weather-icon img { width: 100% !important; height: 100% !important; }
        .ms-weather-icon ha-icon { --mdc-icon-size: clamp(72px, 14cqw, 96px) !important; }
        .ms-metrics { justify-content: center; }
        .ms-swiss-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
      }
    `;
  }
  setConfig(r) {
    if (!r.entity) throw new Error("Entity required");
    this.config = r, setTimeout(() => {
      this._loadForecast();
    }, 500);
  }
  getCardSize() {
    return 8;
  }
  static getStubConfig() {
    return {
      type: "custom:" + ve,
      entity: "",
      show_location: !0,
      location: "Schweiz",
      show_forecast: !0,
      forecast_hours: 6,
      show_temperature: !0,
      show_precipitation: !0,
      show_sunshine: !0,
      show_warnings: !0,
      show_wind: !0,
      show_swiss: !0,
      show_heating: !0,
      auto_resolve_entities: !0,
      enable_animate_weather_icons: !0,
      display_mode: "full",
      compact_mode: !1,
      chart_order: ["temperature", "precipitation", "sunshine", "wind", "forecast"]
    };
  }
  static getConfigElement() {
    return document.createElement(tr);
  }
  static getConfigSchema() {
    return ir;
  }
  _getEntityState(r) {
    return this.hass?.states[r];
  }
  /** Parse entity state to float, returning fallback for unavailable/unknown/NaN */
  _safeParseFloat(r, e = NaN) {
    if (!r || r === "unavailable" || r === "unknown") return e;
    const t = parseFloat(r);
    return isNaN(t) ? e : t;
  }
  _formatWindDirection(r) {
    return ["N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"][Math.round(r / 22.5) % 16];
  }
  // ═══════════════════════════════════════════════════════════════
  // RENDER — iOS Weather Layout
  // ═══════════════════════════════════════════════════════════════
  render() {
    if (!this.hass || !this.config) return c``;
    const r = this.config.display_mode || (this.config.compact_mode ? "compact" : "full");
    this.setAttribute("data-display", r), r === "auto" && !this._resizeObserver ? (this._resizeObserver = new ResizeObserver(($) => {
      const R = ($[0]?.contentRect?.width ?? 400) < 350 ? "compact" : "full";
      this.getAttribute("data-display-effective") !== R && (this.setAttribute("data-display-effective", R), this.requestUpdate());
    }), this._resizeObserver.observe(this)) : r !== "auto" && this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null, this.removeAttribute("data-display-effective"));
    const t = (r === "auto" ? this.getAttribute("data-display-effective") || "full" : r) === "compact", i = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    i !== this._loadedLang && (this._loadedLang = i, ee(i).then(() => this.requestUpdate()));
    const n = this._getEntityState(this.config.entity);
    if (!n) return c`<div style="padding:20px;">Entity not found: ${this.config.entity}</div>`;
    const s = n.state, o = this.config.wind_entity ? this._getEntityState(this.config.wind_entity) : this._resolvedEntities?.wind_speed ? this._getEntityState(this._resolvedEntities.wind_speed) : null, l = this.config.wind_direction_entity ? this._getEntityState(this.config.wind_direction_entity) : this._resolvedEntities?.wind_direction ? this._getEntityState(this._resolvedEntities.wind_direction) : null, a = this.config.sunshine_entity ? this._getEntityState(this.config.sunshine_entity) : this._resolvedEntities?.sunshine_duration ? this._getEntityState(this._resolvedEntities.sunshine_duration) : null, h = this._resolvedEntities?.temperature ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.temperature)?.state) : NaN, d = isNaN(h) ? n.attributes.temperature ?? 0 : h, p = this._resolvedEntities?.pressure ? this._safeParseFloat(this._getEntityState(this._resolvedEntities.pressure)?.state) : NaN, g = o ? this._safeParseFloat(o.state) : n.attributes.wind_speed ?? 0, f = l ? this._safeParseFloat(l.state) : n.attributes.wind_bearing ?? 0, b = n.attributes.humidity ?? 0, C = isNaN(p) ? n.attributes.pressure ?? 0 : p, v = this._forecast[0], E = v?.temperature ?? d, D = v?.templow ?? d, P = this.config.show_location !== !1, q = this.config.location || X("location"), W = this.config.warning_entity || (this._resolvedEntities?.any_alert ? this._resolvedEntities.any_alert : void 0), k = this.config.primary_warning_entity ? this._getEntityState(this.config.primary_warning_entity) : null, x = this.config.secondary_warning_entity ? this._getEntityState(this.config.secondary_warning_entity) : null, M = this.config.tertiary_warning_entity ? this._getEntityState(this.config.tertiary_warning_entity) : null, O = W ? this._getEntityState(W) : null;
    return c`
      ${P ? c`
        <div class="ms-header">
          <div class="ms-location">${q}</div>
          <div class="ms-header-main">
            <div class="ms-weather-icon">
              ${zt(s, this.config.enable_animate_weather_icons !== !1 ? "animated" : "mdi", void 0, s !== "clear-night")}
            </div>
            <div class="ms-temp">${Math.round(d)}<span class="ms-temp-unit">°</span></div>
          </div>
          <div class="ms-condition">${X(s)}</div>
          <div class="ms-hl">H:${Math.round(E)}° T:${Math.round(D)}°</div>
        </div>
      ` : ""}

      ${this.config.show_warnings !== !1 ? gr(O, k, x, M, this._openWarnings, this._toggleWarning, this.hass) : ""}

      ${this._renderMetricsSection(g, f, b, C, a)}

      ${this.config.show_swiss !== !1 && !t ? this._renderSwissSection() : ""}
      ${this.config.show_heating !== !1 && !t ? this._renderHeatingSection() : ""}

      ${(this.config.show_temperature !== !1 || this.config.show_precipitation !== !1 || this.config.show_sunshine !== !1 || this.config.show_wind !== !1) && !t ? c`<div class="ms-chart-container">${this._renderCharts()}</div>` : ""}

      ${this.config.show_forecast !== !1 ? this._renderForecastSection() : ""}

      <div class="ms-footer">MeteoSwiss · ${X("location")}</div>
    `;
  }
  // ── Metrics as iOS pills ────────────────────────────────────────
  _renderMetricsSection(r, e, t, i, n) {
    return c`
      <div class="ms-section">
        <div class="ms-metrics">
          <div class="ms-pill">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
            <span class="ms-pill-value">${Math.round(r)}</span>
            <span class="ms-pill-label">km/h ${this._formatWindDirection(e)}</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:water-percent"></ha-icon>
            <span class="ms-pill-value">${t}</span>
            <span class="ms-pill-label">%</span>
          </div>
          <div class="ms-pill">
            <ha-icon icon="mdi:gauge"></ha-icon>
            <span class="ms-pill-value">${i}</span>
            <span class="ms-pill-label">hPa</span>
          </div>
          ${n ? c`<div class="ms-pill">
                <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
                <span class="ms-pill-value">${this._safeParseFloat(n.state, 0).toFixed(1)}</span>
                <span class="ms-pill-label">h Sonne</span>
              </div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Swiss section ───────────────────────────────────────────────
  _renderSwissSection() {
    if (!this.hass) return c``;
    const r = this.config.foehn_entity || this._resolvedEntities?.foehn_index, e = this.config.snow_entity || this._resolvedEntities?.snow_depth, t = this.config.freezing_level_entity || this._resolvedEntities?.freezing_level, i = r ? Ye(this.hass, r) : null, n = e ? Ye(this.hass, e) : null, s = t ? Ye(this.hass, t) : null;
    if (i === null && n === null && s === null) return c``;
    const o = i !== null ? ll(i) : null;
    return c`
      <div class="ms-section ms-swiss-section">
        <div class="ms-section-label"><ha-icon icon="mdi:flag-variant"></ha-icon> Schweizer Werte</div>
        <div class="ms-swiss-grid">
          ${o ? c`
            <div class="ms-swiss-item">
              <div class="ms-foehn-badge" style="background:${o.color}22;color:${o.color};">${o.label}</div>
              <div class="ms-swiss-label">Föhn</div>
            </div>` : ""}
          ${n !== null && n > 0 ? c`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${n.toFixed(0)} cm</div>
              <div class="ms-swiss-label">Schnee</div>
            </div>` : ""}
          ${s !== null ? c`
            <div class="ms-swiss-item">
              <div class="ms-swiss-value">${s.toFixed(0)} m</div>
              <div class="ms-swiss-label">0°C-Grenze</div>
            </div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Heating section ─────────────────────────────────────────────
  _renderHeatingSection() {
    if (!this.hass) return c``;
    const r = this.config.heating_degree_days_entity || this._resolvedEntities?.heating_degree_days, e = this.config.season_heating_entity || this._resolvedEntities?.season_heating_degree_days, t = r ? Ye(this.hass, r) : null, i = e ? Ye(this.hass, e) : null;
    if (t === null && i === null) return c``;
    const n = (/* @__PURE__ */ new Date()).getMonth() + 1;
    return n < 10 && n > 4 && t === 0 && i === 0 ? c`` : c`
      <div class="ms-section ms-heating-section">
        <div class="ms-section-label"><ha-icon icon="mdi:thermostat"></ha-icon> Heizgradtage</div>
        <div class="ms-hdd">
          <div class="ms-hdd-today">
            <span class="ms-hdd-value">${t !== null ? t.toFixed(1) : "--"}</span>
            <span class="ms-hdd-unit">°C·d heute</span>
          </div>
          ${i !== null ? c`<div class="ms-hdd-season">Saison: ${i.toFixed(0)} °C·d</div>` : ""}
        </div>
      </div>
    `;
  }
  // ── Hourly charts (existing dmoo500 charts, restyled container) ─
  _renderCharts() {
    const r = [], e = this.config.forecast_hours ?? 6, t = Array.isArray(this.config.chart_order) ? [...this.config.chart_order] : ["temperature", "precipitation", "sunshine", "wind"], i = this._getEntityState(this.config.sun_entity || "sun.sun"), n = this._getEntityState(this.config.entity);
    for (const s of t)
      if (s !== "forecast")
        switch (s) {
          case "temperature":
            this.config.show_temperature !== !1 && this._hourlyForecast.length > 0 && r.push(c`<forecast-temperature-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_temperature=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Rt(o)}
            ></forecast-temperature-chart>`);
            break;
          case "precipitation":
            this.config.show_precipitation !== !1 && this._hourlyForecast.length > 0 && r.push(c`<precipitation-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_precipitation=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Rt(o)}
            ></precipitation-chart>`);
            break;
          case "sunshine":
            this.config.show_sunshine !== !1 && this._hourlyForecast.length > 0 && r.push(c`<sunshine-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_sunshine=${!0}
              .weatherEntity=${n}
              .sun_entity=${i}
              ._t=${X}
              .showHoursChartLabel=${(o) => Rt(o)}
            ></sunshine-chart>`);
            break;
          case "wind":
            this.config.show_wind !== !1 && this._hourlyForecast.length > 0 && r.push(c`<wind-chart
              .hourlyForecast=${this._hourlyForecast}
              .forecastHours=${e}
              .show_wind=${!0}
              ._t=${X}
              .showHoursChartLabel=${(o) => Rt(o)}
            ></wind-chart>`);
            break;
        }
    return r;
  }
  // ── Daily forecast as iOS strip ─────────────────────────────────
  _renderForecastSection() {
    if (!this._forecast || this._forecast.length === 0)
      return this._forecastLoading ? c`<div class="ms-footer">Lade Vorhersage…</div>` : c``;
    const r = this._forecast.slice(0, 7), e = /* @__PURE__ */ new Date();
    return c`
      <div class="ms-section">
        <div class="ms-section-label"><ha-icon icon="mdi:calendar-month"></ha-icon> 7-Tage Vorhersage</div>
        <div class="ms-forecast">
          ${r.map((t, i) => {
      const n = new Date(t.datetime), o = i === 0 || n.toDateString() === e.toDateString() ? "Heute" : n.toLocaleDateString(this.hass?.language || "de", { weekday: "short" }), l = t.condition;
      return c`
              <div class="ms-forecast-day">
                <div class="ms-forecast-weekday">${o}</div>
                <div class="ms-forecast-icon">
                  ${zt(l, this.config.enable_animate_weather_icons !== !1 ? "animated" : "mdi", "32px", !0)}
                </div>
                <div class="ms-forecast-temps">
                  <div class="ms-forecast-high">${Math.round(t.temperature ?? 0)}°</div>
                  <div class="ms-forecast-low">${Math.round(t.templow ?? 0)}°</div>
                  ${t.precipitation_probability && t.precipitation_probability > 0 ? c`<div class="ms-forecast-precip">${t.precipitation_probability}%</div>` : ""}
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
};
Ne([
  m({ attribute: !1 })
], me.prototype, "hass", 2);
Ne([
  m({ attribute: !1 })
], me.prototype, "config", 2);
Ne([
  Z()
], me.prototype, "_forecast", 2);
Ne([
  Z()
], me.prototype, "_hourlyForecast", 2);
Ne([
  Z()
], me.prototype, "_forecastLoading", 2);
Ne([
  Z()
], me.prototype, "_openWarnings", 2);
Ne([
  Z()
], me.prototype, "_resolvedEntities", 2);
me = Ne([
  H(ve)
], me);
const $e = `${ye}-forecast-diagram-card`, yr = `${$e}-editor`, Li = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "forecast_diagram.config.descr.entity"
  }
];
var hl = Object.defineProperty, pl = Object.getOwnPropertyDescriptor, li = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? pl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && hl(e, t, n), n;
};
I({
  // Loads the language by returning a JSON structure for a given language
  loader: (r) => B[r]
});
let Lt = class extends N {
  constructor() {
    super(), this._computeLabel = (r) => ({
      entity: u("forecast_diagram.config.entity"),
      sun_entity: u("forecast_diagram.config.sun_entity")
    })[r.name] || r.name, this._computeHelper = (r) => r.description ? u(r.description) : "";
  }
  setConfig(r) {
    const e = { ...r }, t = ["entity", "sun_entity"];
    for (const i of t)
      e[i] === "" && delete e[i];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }

      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }

      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      ha-form {
        display: block;
        margin-bottom: 24px;
      }

      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }

      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }
      .group {
        margin-bottom: 24px;
        padding: 16px 0 0 0;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .group-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color, #007AFF);
        margin-bottom: 8px;
        margin-top: 0;
      }
      .card-config {
        padding: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      ha-form {
        display: block;
        margin-bottom: 24px;
      }
      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }
      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }

      @media (max-width: 768px) {
        .card-config {
          padding: 12px;
        }
      }
    `;
  }
  render() {
    if (!this.hass)
      return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div>
            <div class="header-title">🌦️ MeteoSwiss Forecast Diagram Card</div>
          </div>
        </div>

        <!-- General -->
        <div class="group">
          <div class="group-title">${u("forecast_diagram.config.group_general") || "General"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${r}
            .schema=${[Li.find((e) => e.name === "entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Sensors -->
        <div class="group">
          <div class="group-title">${u("forecast_diagram.config.group_sensors") || "Sensors"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${r}
            .schema=${[Li.find((e) => e.name === "sun_entity")].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Configuration Preview -->
        ${this._config?.entity ? c`
                <div class="preview">
                  <div class="preview-title">📋 YAML-Config</div>
                  <div class="preview-config">${this._renderConfigPreview()}</div>
                </div>
              ` : ""}
      </div>
    `;
  }
  _renderConfigPreview() {
    const r = { ...this._config };
    return r.type || (r.type = "custom:" + $e), Object.keys(r).forEach((e) => {
      (r[e] === void 0 || r[e] === "") && delete r[e];
    }), Object.entries(r).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(r) {
    if (this._config || (this._config = {
      type: `custom:${$e}`,
      entity: "",
      sun_entity: ""
    }), r.type === "value-changed") {
      const e = {}, { ...t } = r.detail.value || {}, i = {
        ...this._config,
        ...t,
        ...e,
        type: "custom:" + $e
      };
      Object.keys(i).forEach((n) => {
        (i[n] === "" || i[n] === void 0) && delete i[n];
      }), this._config = i, le(this, "config-changed", { config: this._config });
    }
  }
};
li([
  m({ attribute: !1 })
], Lt.prototype, "hass", 2);
li([
  m({ attribute: !1 })
], Lt.prototype, "lovelace", 2);
li([
  m({ attribute: !1 })
], Lt.prototype, "_config", 2);
Lt = li([
  H(yr)
], Lt);
const ze = (r, e) => r?.states[e], ul = (r, e) => {
  const t = /* @__PURE__ */ new Date(), i = ze(r, e.entity), n = ze(r, e.sun_entity || "sun.sun");
  if (n?.state === "above_horizon") return !0;
  if (n?.state === "below_horizon") return !1;
  let s = null, o = null;
  if (i && i.attributes && "sunrise" in i.attributes && "sunset" in i.attributes && i.attributes.sunrise && i.attributes.sunset)
    s = new Date(i.attributes.sunrise), o = new Date(i.attributes.sunset);
  else if (n?.attributes) {
    const l = n.attributes.next_rising ? new Date(n.attributes.next_rising) : null, a = n.attributes.next_setting ? new Date(n.attributes.next_setting) : null;
    if (l && a) {
      const h = l > t ? new Date(l.getTime() - 864e5) : l, d = a;
      s = h, o = d;
    }
  }
  return !s || !o ? !0 : t >= s && t < o;
};
function _e(r) {
  const e = window;
  e.customCards = e.customCards || [], e.customCards.push({
    ...r,
    preview: !0
    // documentationURL: `
  });
}
var fl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, pt = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? gl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && fl(e, t, n), n;
};
I({
  // Loads the language by returning a JSON structure for a given language
  loader: (r) => B[r]
});
let Be = class extends N {
  constructor() {
    super(), this._forecast = [], this._hourlyForecast = [], this._forecastLoading = !1;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  updated(r) {
    super.updated(r);
  }
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 0;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }

      daily-forecast-diagram {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
      }

      .chart {
        background: var(--card-background-color, #fff);
        border-radius: 12px;
        padding: 15px;
        border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
      }
    `;
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const [r, e] = await Promise.all([
          this.hass.callWS({
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            service_data: {
              entity_id: this.config.entity,
              type: "daily"
            },
            return_response: !0
          }),
          this.hass.callWS({
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            service_data: {
              entity_id: this.config.entity,
              type: "hourly"
            },
            return_response: !0
          })
        ]), t = r?.response;
        t && t[this.config.entity] ? (this._forecast = t[this.config.entity].forecast || [], this.requestUpdate("_forecast")) : this._forecast = [];
        const i = e?.response;
        i && i[this.config.entity] ? (this._hourlyForecast = i[this.config.entity].forecast || [], this.requestUpdate("_hourlyForecast")) : this._hourlyForecast = [];
      } catch {
        this._forecast = [], this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  setConfig(r) {
    if (!r.entity)
      throw new Error("You need to define an entity");
    this.config = r, setTimeout(() => {
      this._loadForecast();
    }, 1e3);
  }
  static getStubConfig() {
    return {
      type: `custom:${$e}`,
      entity: ""
    };
  }
  static getConfigElement() {
    return document.createElement(yr);
  }
  // Schema for the visual editor
  static getConfigSchema() {
    return Li;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 12,
      max_columns: 48,
      min_rows: 3,
      max_rows: 8
    };
  }
  render() {
    const r = ze(this.hass, this.config.entity), e = this.config?.grid_options?.rows ?? 3;
    return this.style.setProperty("--card-grid-rows", e.toString()), r ? !this._forecast || this._forecast.length === 0 ? c`<div>Loading forecast...</div>` : !this._hourlyForecast || this._hourlyForecast.length === 0 ? c`<div>Loading hourly forecast...</div>` : this._forecast.length > 0 && this._hourlyForecast.length > 0 ? c`<daily-forecast-diagram
          .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
          .forecast=${[...this._forecast?.slice(0, 7) ?? []]}
          .hourlyForecast=${[...this._hourlyForecast]}
          ._t=${X}
          .getWeatherIcon=${zt}
          .standalone=${!0}
        ></daily-forecast-diagram>` : c`` : c`<div>Entity not found: ${this.config.entity}</div>`;
  }
};
pt([
  m({ attribute: !1 })
], Be.prototype, "hass", 2);
pt([
  m({ attribute: !1 })
], Be.prototype, "config", 2);
pt([
  Z()
], Be.prototype, "_forecast", 2);
pt([
  Z()
], Be.prototype, "_hourlyForecast", 2);
pt([
  Z()
], Be.prototype, "_forecastLoading", 2);
Be = pt([
  H($e)
], Be);
const _r = () => w`
  <defs>
    <radialGradient id="lwStormFlashGradient" cx="50%" cy="20%" r="90%">
      <stop offset="0%" style="stop-color:#ffff88;stop-opacity:1" />
      <stop offset="15%" style="stop-color:#fff59d;stop-opacity:0.95" />
      <stop offset="40%" style="stop-color:#ffeb3b;stop-opacity:0.8" />
      <stop offset="70%" style="stop-color:#ffc107;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:#ff8f00;stop-opacity:0.2" />
    </radialGradient>

    <!-- Dramatic storm flash (full background) -->
    <rect id="lwStormFlash" x="0" y="0" width="100%" height="100%" fill="url(#lwStormFlashGradient)" opacity="0">
      <animate attributeName="opacity" 
               values="0;0;0;1;0;0.9;0;1;0;0.5;0;0;0;0;0;0;0.6;0;0;0;0;0;0.8;0" 
               dur="6s" 
               repeatCount="indefinite"/>
    </rect>

    <!-- Thunder rumble glow layer -->
    <rect id="lwThunderRumble" x="0" y="0" width="100%" height="100%" fill="#fff9c4" opacity="0">
      <animate attributeName="opacity" 
               values="0;0;0.2;0.1;0.3;0.05;0.4;0;0;0;0;0;0;0;0;0;0.1;0;0;0;0;0;0.2;0" 
               dur="6s" 
               begin="0.5s"
               repeatCount="indefinite"/>
    </rect>

    <!-- Subtle flicker -->
    <rect id="lwLightningFlicker" x="0" y="0" width="100%" height="100%" fill="#fff176" opacity="0">
      <animate attributeName="opacity" 
               values="0;0.2;0;0.3;0;0.1;0;0.5;0;0.25;0;0;0;0;0;0;0;0;0;0;0;0;0;0" 
               dur="4s" 
               begin="0.2s"
               repeatCount="indefinite"/>
    </rect>
  </defs>
  <use href="#lwLightningFlicker"/>
  <use href="#lwStormFlash"/>
  <use href="#lwThunderRumble"/>
`, ml = (r, e, t) => {
  if (!r)
    return c``;
  const i = {
    "clear-night": yl(t),
    cloudy: bl(t),
    fog: wl(t),
    hail: xl(t),
    lightning: kl(t),
    "lightning-rainy": Cl(t),
    partlycloudy: e ? Ml(t) : zl(t),
    pouring: $l(t),
    rainy: vl(t),
    snowy: Sl(t),
    "snowy-rainy": Al(t),
    sunny: _l(),
    windy: On(t),
    "windy-variant": On(t),
    exceptional: Ll(t)
  };
  return r ? i[r] : c``;
}, yl = (r) => w`
  <defs>
    <linearGradient id="moonGradient" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#86c3db"/>
      <stop offset=".45" stop-color="#86c3db"/>
      <stop offset="1" stop-color="#5eafcf"/>
      <animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/>
    </linearGradient>
    <linearGradient id="starGradient" x1="23.22" x2="40.78" y1="16.8" y2="47.2" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fcd966"/>
      <stop offset=".45" stop-color="#fcd966"/>
      <stop offset="1" stop-color="#fccd34"/>
      <animateTransform attributeName="gradientTransform" dur="18s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </linearGradient>
  <!-- star -->
  <g id="starIcon">
    <path fill="url(#starGradient)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M33 23l9.06-4.25a2.39 2.39 0 013.18 3.18L41 31a2.42 2.42 0 000 2l4.25 9.06a2.39 2.39 0 01-3.18 3.18L33 41a2.42 2.42 0 00-2 0l-9.06 4.25a2.39 2.39 0 01-3.18-3.18L23 33a2.42 2.42 0 000-2l-4.25-9.06a2.39 2.39 0 013.18-3.18L31 23a2.42 2.42 0 002 0z">
      <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="1; 0.4; 1"/>
      <animateTransform attributeName="transform" dur="18s" repeatCount="indefinite" type="rotate" values="360 32 32; 0 32 32"/>
    </path>
  </g>
  </defs>
  <!-- moon -->
  <g id="clearNightIcon" transform="translate(168,-30) scale(3)">
    <path fill="url(#moonGradient)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z">
      <animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/>
    </path>
  </g>
  <!-- stars -->
  <g>
  ${Array.from({ length: Math.ceil(r / 100) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), n = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i;
  return w`
    <use href="#starIcon" x="0" y="0" transform="translate(${s},${n}) scale(0.5)"/>
    `;
})}
  </g>
`, _l = () => w`
  <defs>
    <linearGradient id="sunshineBlueGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc3f7" />
      <stop offset="80%" stop-color="#4fc3f7" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="sunGradient" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fcd966"/>
      <stop offset=".45" stop-color="#fcd966"/>
      <stop offset="1" stop-color="#fccd34"/>
      <animateTransform attributeName="gradientTransform" dur="18s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </linearGradient>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#sunshineBlueGradient)" />
  <!-- sun -->
  <g id="sunIcon" transform="translate(168,-30) scale(3)">
    <circle cx="32" cy="32" r="10.5" fill="url(#sunGradient)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" />
    <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21">
      <animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
    </path>
  </g>
`, bl = (r) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a3bdc9ff" />
      <stop offset="100%" stop-color="#90d4f4ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${he(r)}
  `, wl = (r) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a3bdc9ff" />
      <stop offset="100%" stop-color="#90d4f4ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="fogCloud" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="fogLine1" x1="27.5" x2="36.5" y1="50.21" y2="65.79" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d4d7dd"/>
      <stop offset=".45" stop-color="#d4d7dd"/>
      <stop offset="1" stop-color="#bec1c6"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#fogCloud)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="none" stroke="url(#fogLine1)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 58h30">
        <animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/>
      </path>
      <path fill="none" stroke="url(#fogLine2)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 52h30">
        <animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${he(r)}
  `, xl = (r) => w`
  <defs>
    <linearGradient id="hailBackground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9eb7c6" />
      <stop offset="100%" stop-color="#87b9d3" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="hailGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <radialGradient id="hailStone" cx="32" cy="32" r="12" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d9ecff"/>
      <stop offset="1" stop-color="#8ec0df"/>
    </radialGradient>
    <g id="hailIcon">
      <path fill="url(#hailGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="24" cy="50" r="2.2" fill="url(#hailStone)">
        <animateTransform attributeName="transform" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
      <circle cx="32" cy="52" r="2.4" fill="url(#hailStone)">
        <animateTransform attributeName="transform" begin="-0.3s" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" begin="-0.3s" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
      <circle cx="40" cy="50" r="2.2" fill="url(#hailStone)">
        <animateTransform attributeName="transform" begin="-0.6s" dur="0.9s" repeatCount="indefinite" type="translate" values="0 -7; 0 12"/>
        <animate attributeName="opacity" begin="-0.6s" dur="0.9s" repeatCount="indefinite" values="1;1;0"/>
      </circle>
    </g>
  </defs>
  <rect width="100%" height="80%" fill="url(#hailBackground)" />
  ${Array.from({ length: Math.ceil(r / 100) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), n = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i;
  return w`
  <g>
    <use href="#hailIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(${s},${n})" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  `;
})}
  `, vl = (r) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3580a39c" />
      <stop offset="80%" stop-color="#3482a79c" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4286ee"/>
      <stop offset=".45" stop-color="#4286ee"/>
      <stop offset="1" stop-color="#0950bc"/>
    </linearGradient>
    <linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <g id="icon">
    <path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    <path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    <path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    <path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94">
      <animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
      <animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
    </path>
    </g>    
  </defs>
  <!-- background -->
  <rect width="100%" height="80%" fill="url(#background)" />
  ${he(r)}
  
  `;
w`<g transform="translate(168,-30) scale(3)"><path fill="#f3f7fe" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><circle cx="24" cy="50" r="2.2" fill="#9ac9e4"/><circle cx="32" cy="52" r="2.4" fill="#9ac9e4"/><circle cx="40" cy="50" r="2.2" fill="#9ac9e4"/></g>`;
const $l = (r) => w`
  <defs>
    <linearGradient id="extremeRainGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="extremeRainIcon">
      <path fill="url(#extremeRainGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="extremeRainDropGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#3a86ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#3a86ff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Cloud -->
  <g>
    <use href="#extremeRainIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  
  <!-- Rain drops -->
  ${Array.from({ length: Math.ceil(r / 20) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), n = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 20 + i;
  return w`
    <line x1="${s}" y1="${n}" x2="${s}" y2="${n + 10}" stroke="url(#extremeRainDropGradient)" stroke-width="2" stroke-linecap="round">
      <animate attributeName="y1" values="${n}; ${n + 20}" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="${n + 10}; ${n + 30}" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0" dur="0.5s" repeatCount="indefinite"/>
    </line>
    `;
})}
  `, On = (r) => w`
  <defs>
    <linearGradient id="windGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="windIcon">
      <path fill="url(#windGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="windLineGradient" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#9ca3af" stop-opacity="0"/>
      <stop offset="50%" stop-color="#9ca3af" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#9ca3af" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Cloud -->
  <g>
    <use href="#windIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
  </g>
  
  <!-- Wind lines -->
  ${Array.from({ length: Math.ceil(r / 50) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), n = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 50 + i;
  return w`
    <line x1="${s}" y1="${n}" x2="${s + 30}" y2="${n}" stroke="url(#windLineGradient)" stroke-width="4" stroke-linecap="round">
      <animate attributeName="x1" values="${s}; ${s + 10}; ${s}" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="${s + 30}; ${s + 40}; ${s + 30}" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0.4; 1" dur="3s" repeatCount="indefinite"/>
    </line>
    `;
})}
  `, kl = (r) => w`
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2e414aff" />
      <stop offset="100%" stop-color="#467388ff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="thunderstormGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
   
    <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#87ceeb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4169e1;stop-opacity:1" />
    </linearGradient>
    
    <g id="icon">
      <path fill="url(#thunderstormGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="#facc15" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z">
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="100%" fill="url(#background)" />
 
   ${he(r)}
   
  <!-- Lightning flash effect that illuminates the entire background (full-size overlay) -->
  ${_r()}
  `, Cl = (r) => w`
  <defs>
    <linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4286ee"/>
      <stop offset=".45" stop-color="#4286ee"/>
      <stop offset="1" stop-color="#0950bc"/>
    </linearGradient>
    <linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/>
    <linearGradient id="e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f7b23b"/>
      <stop offset=".45" stop-color="#f7b23b"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94">
        <animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
      </path>
      <path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/>
        <animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/>
      </path>
      <path fill="url(#e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z">
        <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/>
      </path>
    </g>
  </defs>

  ${he(r)}
  
  <!-- Lightning flash effect for rainy thunderstorms -->
  ${_r()}
  `, he = (r) => w`
${Array.from({ length: Math.ceil(r / 10) }, (e, t) => t).map((e) => {
  const t = Math.floor(Math.random() * 100), i = Math.floor(Math.random() * 10), n = (t - 50) / 5 + e * Math.floor(Math.random() * 25), s = e * 100 + i, o = Math.floor(Math.random() * 2) + 1, l = 1 + Math.random() * 1, a = 44 + Math.floor(Math.random() * 90);
  return w`
    <g>
      <use href="#icon" x="${s}" y="${n}" width="80" height="40" transform="scale(${o})" opacity="0">
        <animate attributeName="opacity" values="0;${l};${l};0" dur="${a}s" repeatCount="indefinite"/>
      </use>
      <animateTransform attributeName="transform" type="translate" values="-150,20;450,20" dur="${a}s" repeatCount="indefinite"/>
    </g>
    `;
})}
  `, Al = (r) => w`
  <defs>
    <linearGradient id="sleetGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#sleetGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="24" cy="42" r="4" fill="#a8dadc"/>
      <circle cx="40" cy="42" r="4" fill="#a8dadc"/>
      <line x1="32" y1="34" x2="32" y2="38" stroke="#3a86ff" stroke-width="2" stroke-linecap="round">
        <animate attributeName="y1" values="34; 44" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="38; 48" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1; 0" dur="1s" repeatCount="indefinite"/>
      </line>
    </g>
  </defs>
  
  ${he(r)}
  `, Sl = (r) => w`
  <defs>
    <linearGradient id="snowGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="snowIcon">
      <path fill="url(#snowGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <linearGradient id="snowFlakeGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#dbeafe" stop-opacity="0"/>
    </linearGradient>
    <g id="snowFlakeIcon" stroke="url(#snowFlakeGradient)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <line x1="0" y1="-4" x2="0" y2="4"/>
      <line x1="-3" y1="-3" x2="3" y2="3"/>
      <line x1="-3" y1="3" x2="3" y2="-3"/>
    </g>
    <g id="cloudIcon">
      <use href="#snowIcon" x="0" y="-10" width="80" height="40" transform="scale(2.2) translate(10,20)" opacity="0.9"/>
      <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="18s" repeatCount="indefinite"/>
    </g>
    <g id="icon">
      <use href="#snowFlakeIcon" x="0" y="0" width="8" height="8" opacity="1"/>
      <animateTransform attributeName="transform" type="translate" values="0,0;0,20" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1; 0" dur="3s" repeatCount="indefinite"/>
    </g>

  </defs>
  
  ${he(r)}
  `, Ml = (r) => w`
  <defs>
    <linearGradient id="sunshineBlueGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc3f7" />
      <stop offset="100%" stop-color="#4fc3f7" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="partlyCloudyDayGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <linearGradient id="a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fbbf24"/>
      <stop offset=".45" stop-color="#fbbf24"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient
    <g id="cloudIcon">
      <path fill="url(#partlyCloudyDayGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="icon">
      <path fill="url(#partlyCloudyDayGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="sunIcon">
      <circle cx="32" cy="32" r="10.5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/>
      <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21">
        <animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/>
      </path>
    </g>
  </defs>
  <!-- background -->
  <rect width="100%" height="100%" fill="url(#sunshineBlueGradient)" />
  <!-- Sun -->
  <g>
    <use href="#sunIcon" x="200" y="50" width="100" height="100" opacity="0.9"/>
  </g>
  ${he(r)}
  `, zl = (r) => w`
  <defs>
    <linearGradient id="partlyCloudyNightGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#partlyCloudyNightGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
    </g>
    <g id="moonIcon">
      <path fill="#fbbf24" stroke="#f59e0b" stroke-width="1" d="M12 2a10 10 0 1010 10A8 8 0 0112 2z"/>
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="60s" repeatCount="indefinite"/>
    </g>
  </defs>
  <!-- Moon -->
  <g>
    <use href="#moonIcon" x="200" y="50" width="100" height="100" opacity="0.9"/>
  </g>
  ${he(r)}
  `, Ll = (r) => w`
  <defs>
    <linearGradient id="hurricaneGradient" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f7fe"/>
      <stop offset=".45" stop-color="#f3f7fe"/>
      <stop offset="1" stop-color="#deeafb"/>
    </linearGradient>
    <g id="icon">
      <path fill="url(#hurricaneGradient)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/>
      <circle cx="32" cy="36" r="6" fill="#f87171" stroke="#b91c1c" stroke-width="1"/>
      <path fill="#f87171" stroke="#b91c1c" stroke-width="1" d="M32 30a6 6 0 016 6h-6V30zM32 42a6 6 0 01-6-6h6v6zM26 36a6 6 0 016-6v6H26zM38 36a6 6 0 01-6 6v-6h6z"/>
    </g>
  </defs>
  
  ${he(r)}
  `, ke = `${ye}-animated-background-card`, br = `${ke}-editor`, ge = [
  {
    name: "scenery_image",
    required: !1,
    selector: { text: {} },
    description: "bg_card.config.descr.scenery_image"
  },
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "bg_card.config.descr.entity"
  },
  {
    name: "sun_entity",
    required: !1,
    selector: { entity: { domain: "sun" } },
    description: "bg_card.config.descr.sun_entity"
  },
  {
    name: "show_sun_times",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.show_sun_times"
  },
  {
    name: "forecast_mode",
    required: !1,
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "daily", label: "forecast_mode.daily" },
          { value: "hourly", label: "forecast_mode.hourly" },
          { value: "none", label: "forecast_mode.none" }
        ]
      }
    },
    description: "bg_card.config.descr.forecast_mode"
  },
  {
    name: "show_day_temps",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.show_day_temps"
  },
  {
    name: "temperature_font_size",
    required: !1,
    selector: { number: { min: 12, max: 96, step: 1, mode: "box" } },
    description: "bg_card.config.descr.temperature_font_size"
  },
  {
    name: "photo_mode",
    required: !1,
    selector: { boolean: {} },
    description: "bg_card.config.descr.photo_mode"
  }
];
var El = Object.defineProperty, Nl = Object.getOwnPropertyDescriptor, pe = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Nl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && El(e, t, n), n;
};
let se = class extends N {
  constructor() {
    super(...arguments), this.hourlyForecast = [], this.forecastLoading = !1, this.show_forecast = !0, this.config = {}, this.compact = !0, this.maxHours = 6, this.alignRight = !0;
  }
  _fmtHour(r) {
    return new Date(r).toLocaleTimeString([], { hour: "2-digit" });
  }
  render() {
    if (this.show_forecast === !1 || this.config.show_forecast === !1) return c``;
    const r = (this.hourlyForecast || []).slice(0, Math.max(1, this.maxHours));
    return c`
      <div class="wrapper ${this.alignRight ? "align-right" : ""}">
        ${this.compact ? c`` : c`
                <div class="section-title">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  ${this._t("hourly_charts.forecast_hours", { hours: r.length })}
                </div>
              `}
        <div class="grid">
          ${r.map(
      (e) => c`
              <div class="tile">
                <div class="label">${this._fmtHour(e.datetime ?? e.time)}</div>
                <div class="icon">
                  ${this.getWeatherIcon(
        e.condition,
        this.config.enable_animate_weather_icons ? "animated" : "mdi",
        this.compact ? "18px" : "24px",
        !0
      )}
                </div>
                <div class="temps">
                  ${typeof e.temperature == "number" ? c`<span>${Math.round(e.temperature)}°</span>` : ""}
                </div>
              </div>
            `
    )}
        </div>
      </div>
    `;
  }
};
se.styles = T`
    .wrapper {
      display: block;
      width: 100%;
    }
    .wrapper.align-right {
      display: flex;
      justify-content: flex-end;
    }

    .section-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--primary-text-color, #fff);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .grid {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: stretch;
      gap: 8px;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .tile {
      background: var(--card-background-color, rgba(255, 255, 255, 0.6));
      border-radius: 8px;
      padding: 8px 6px;
      text-align: center;
      border: 1px solid var(--border-color, rgba(220, 20, 60, 0.1));
      width: 64px;
      min-width: 64px;
      box-sizing: border-box;
    }

    .label {
      font-size: 10px;
      color: var(--secondary-text-color, #7f8c8d);
      margin-bottom: 4px;
    }
    .icon {
      font-size: 18px;
      margin: 4px 0;
    }
    .temps {
      font-size: 11px;
      display: flex;
      justify-content: center;
      gap: 6px;
    }

    @media (max-width: 400px) {
      .grid {
        gap: 6px;
      }
      .tile {
        width: 56px;
        min-width: 56px;
      }
      .icon {
        font-size: 16px;
      }
      .temps {
        font-size: 10px;
      }
    }
  `;
pe([
  m({ type: Array })
], se.prototype, "hourlyForecast", 2);
pe([
  m({ type: Boolean })
], se.prototype, "forecastLoading", 2);
pe([
  m({ type: Boolean })
], se.prototype, "show_forecast", 2);
pe([
  m({ type: Object })
], se.prototype, "config", 2);
pe([
  m({ type: Function })
], se.prototype, "_t", 2);
pe([
  m({ type: Function })
], se.prototype, "getWeatherIcon", 2);
pe([
  m({ type: Boolean })
], se.prototype, "compact", 2);
pe([
  m({ type: Number })
], se.prototype, "maxHours", 2);
pe([
  m({ type: Boolean })
], se.prototype, "alignRight", 2);
se = pe([
  H("hourly-forecast-chart")
], se);
var Tl = Object.defineProperty, Hl = Object.getOwnPropertyDescriptor, qe = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Hl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Tl(e, t, n), n;
};
I({
  // Loads the language by returning a JSON structure for a given language
  loader: (r) => B[r]
});
let Le = class extends N {
  constructor() {
    super(...arguments), this._forecast = [], this._hourly = [], this._resolvedEntities = null, this._forecastLoading = !1, this._hourlyLoading = !1;
  }
  static get styles() {
    return T`
      :host {
        display: block;
        box-shadow: none;
        overflow: hidden;
        /* Calculate height according to HA docs: rows * 56px + (rows-1) * 8px gap */
        /* Simplified: height = rows * 64px - 8px */
        height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        min-height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        max-height: calc(var(--card-grid-rows, 4) * 64px - 8px);
        position: relative;
      }

      .bg-card-root {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .temperature {
        position: absolute;
        top: 8px;
        left: 12px;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        border: 2px solid var(--primary-text-color, #fff);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        padding: 5px 12px;
        box-shadow: var(
          --ha-card-box-shadow,
          0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12),
          0 3px 1px -2px rgba(0, 0, 0, 0.2)
        );
        font-size: var(--bg-temp-font-size, 36px);
        font-weight: bold;
        text-align: center;
      }

      .img-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
      }

      .img-photo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
        isolation: isolate;
        box-shadow: var(
          --ha-card-box-shadow,
          0 4px 20px var(--box-shadow-color, rgba(0, 0, 0, 0.1))
        );
        transition:
          filter 1.1s ease,
          transform 1.1s ease;
      }

      .img-photo.day {
        filter: saturate(1.04) brightness(1.03) hue-rotate(0deg);
      }

      .img-photo.night {
        filter: saturate(0.86) brightness(0.82) hue-rotate(-8deg);
      }

      .photo-layer {
        position: absolute;
        inset: 0;
      }

      .photo-base {
        animation: bg-pan 34s ease-in-out infinite alternate;
      }

      .photo-scenery {
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        z-index: 0;
        filter: saturate(1.05) brightness(1.0);
        transition: filter 1.1s ease;
      }

      .img-photo.day .photo-scenery {
        filter: saturate(1.08) brightness(1.02);
      }

      .img-photo.night .photo-scenery {
        filter: saturate(0.65) brightness(0.35) hue-rotate(-5deg);
      }

      .img-photo.has-scenery .photo-base {
        opacity: 0.55;
      }

      .img-photo.has-scenery.day .photo-base {
        background: linear-gradient(
          180deg,
          rgba(135, 206, 250, 0.65) 0%,
          rgba(135, 206, 250, 0.25) 50%,
          rgba(135, 206, 250, 0) 100%
        ) !important;
        animation: none !important;
      }

      .img-photo.has-scenery.night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(5, 16, 38, 0.85) 0%,
          rgba(5, 16, 38, 0.4) 50%,
          rgba(5, 16, 38, 0) 100%
        ) !important;
        animation: none !important;
      }

      .img-photo.has-scenery .photo-night-stars {
        height: 55%;
      }

      .photo-circadian {
        opacity: 0;
        transition: opacity 1.1s ease;
        z-index: 1;
        pointer-events: none;
      }

      .img-photo.day .photo-circadian {
        background:
          radial-gradient(circle at 72% 16%, rgba(255, 239, 181, 0.26), rgba(255, 239, 181, 0) 44%),
          linear-gradient(180deg, rgba(255, 245, 209, 0.1) 0%, rgba(255, 255, 255, 0) 72%);
        mix-blend-mode: screen;
        opacity: 0.58;
      }

      .img-photo.night .photo-circadian {
        background:
          radial-gradient(circle at 26% 18%, rgba(127, 161, 214, 0.2), rgba(127, 161, 214, 0) 40%),
          linear-gradient(180deg, rgba(7, 15, 33, 0.3) 0%, rgba(4, 10, 24, 0.5) 100%);
        mix-blend-mode: multiply;
        opacity: 0.74;
      }

      .img-photo.mood-sunny.day .photo-base {
        background:
          radial-gradient(circle at 75% 20%, rgba(255, 250, 196, 0.95), rgba(255, 250, 196, 0) 45%),
          linear-gradient(
            160deg,
            rgba(123, 198, 250, 0.95) 0%,
            rgba(88, 163, 221, 0.92) 46%,
            rgba(67, 138, 191, 0.96) 100%
          );
      }

      .img-photo.mood-sunny.night .photo-base {
        background:
          radial-gradient(circle at 78% 18%, rgba(80, 120, 160, 0.12), rgba(80, 120, 160, 0) 40%),
          linear-gradient(
            165deg,
            rgba(12, 24, 45, 0.99) 0%,
            rgba(8, 16, 32, 0.99) 58%,
            rgba(2, 6, 15, 1) 100%
          );
      }

      .img-photo.mood-sunny.clear-night .photo-base,
      .img-photo.clear-night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(5, 16, 38, 0.99) 0%,
          rgba(4, 12, 28, 1) 52%,
          rgba(1, 6, 16, 1) 100%
        );
        animation: none;
      }

      .img-photo.clear-night .photo-clouds {
        opacity: 0;
      }

      .img-photo.clear-night .photo-clouds-front {
        opacity: 0;
      }

      .img-photo.clear-night .photo-clouds-depth {
        opacity: 0;
      }

      .img-photo.clear-night .photo-cloud-shadow {
        opacity: 0;
      }

      .img-photo.clear-night .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.mood-cloudy .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.partly-cloudy .photo-sun-rays {
        opacity: 0;
        animation: none;
        display: none;
      }

      .img-photo.mood-cloudy.day .photo-base {
        background:
          radial-gradient(circle at 30% 15%, rgba(226, 238, 245, 0.6), rgba(226, 238, 245, 0) 40%),
          linear-gradient(
            160deg,
            rgba(144, 168, 183, 0.95) 0%,
            rgba(122, 147, 165, 0.96) 52%,
            rgba(96, 121, 141, 0.98) 100%
          );
      }

      .img-photo.mood-cloudy.night .photo-base {
        background:
          radial-gradient(circle at 25% 12%, rgba(123, 140, 166, 0.24), rgba(123, 140, 166, 0) 44%),
          linear-gradient(
            165deg,
            rgba(40, 52, 71, 0.98) 0%,
            rgba(29, 40, 56, 0.98) 56%,
            rgba(20, 28, 40, 1) 100%
          );
      }

      .img-photo.foggy.day .photo-base {
        background: linear-gradient(
          180deg,
          rgba(158, 176, 188, 0.98) 0%,
          rgba(146, 165, 179, 0.99) 54%,
          rgba(132, 152, 168, 1) 100%
        );
      }

      .img-photo.foggy.night .photo-base {
        background: linear-gradient(
          180deg,
          rgba(41, 54, 68, 0.99) 0%,
          rgba(33, 45, 59, 1) 52%,
          rgba(24, 35, 48, 1) 100%
        );
      }

      .img-photo.mood-rainy.day .photo-base {
        background:
          radial-gradient(circle at 72% 8%, rgba(226, 239, 252, 0.35), rgba(226, 239, 252, 0) 45%),
          linear-gradient(
            168deg,
            rgba(95, 120, 139, 0.95) 0%,
            rgba(73, 97, 118, 0.97) 50%,
            rgba(54, 78, 96, 0.99) 100%
          );
      }

      .img-photo.mood-rainy.night .photo-base {
        background:
          radial-gradient(circle at 72% 12%, rgba(122, 145, 170, 0.14), rgba(122, 145, 170, 0) 42%),
          linear-gradient(
            168deg,
            rgba(25, 36, 54, 0.99) 0%,
            rgba(17, 26, 42, 1) 55%,
            rgba(10, 16, 27, 1) 100%
          );
      }

      .photo-clouds {
        background:
          radial-gradient(
            118% 86% at 6% 24%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.08) 48%,
            rgba(255, 255, 255, 0) 62%
          ),
          radial-gradient(
            120% 90% at 28% 20%,
            rgba(255, 255, 255, 0.48),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            124% 92% at 50% 22%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            118% 88% at 72% 20%,
            rgba(255, 255, 255, 0.47),
            rgba(255, 255, 255, 0.08) 48%,
            rgba(255, 255, 255, 0) 62%
          ),
          radial-gradient(
            114% 84% at 95% 25%,
            rgba(255, 255, 255, 0.52),
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          linear-gradient(
            180deg,
            rgba(249, 253, 255, 0.42) 0%,
            rgba(233, 243, 252, 0.2) 34%,
            rgba(210, 224, 239, 0.04) 58%,
            rgba(210, 224, 239, 0) 74%
          ),
          linear-gradient(
            180deg,
            rgba(172, 194, 220, 0.18) 0%,
            rgba(172, 194, 220, 0.08) 46%,
            rgba(183, 205, 230, 0) 72%
          );
        filter: blur(5.5px) contrast(1.08) saturate(1.06) brightness(1.03);
        animation: cloud-drift 36s ease-in-out infinite alternate;
        opacity: 0.78;
      }

      .photo-clouds-front {
        background:
          radial-gradient(
            94% 74% at 0% 36%,
            rgba(255, 255, 255, 0.88),
            rgba(255, 255, 255, 0.16) 52%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            98% 76% at 22% 30%,
            rgba(255, 255, 255, 0.86),
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            102% 78% at 48% 34%,
            rgba(255, 255, 255, 0.84),
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            96% 74% at 74% 30%,
            rgba(255, 255, 255, 0.82),
            rgba(255, 255, 255, 0.14) 50%,
            rgba(255, 255, 255, 0) 64%
          ),
          radial-gradient(
            92% 72% at 100% 34%,
            rgba(255, 255, 255, 0.86),
            rgba(255, 255, 255, 0.16) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.34) 0%,
            rgba(242, 249, 255, 0.18) 44%,
            rgba(211, 226, 242, 0.1) 64%,
            rgba(255, 255, 255, 0) 74%
          );
        filter: blur(2.8px) contrast(1.12) saturate(1.05)
          drop-shadow(0 6px 8px rgba(122, 149, 178, 0.18));
        animation: cloud-drift-front 22s ease-in-out infinite alternate;
        mix-blend-mode: normal;
        opacity: 0;
      }

      .photo-clouds-depth {
        background:
          radial-gradient(
            118% 86% at 14% 68%,
            rgba(217, 232, 248, 0.42),
            rgba(255, 255, 255, 0.08) 52%,
            rgba(255, 255, 255, 0) 68%
          ),
          radial-gradient(
            122% 90% at 46% 62%,
            rgba(210, 226, 243, 0.36),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          radial-gradient(
            118% 88% at 78% 70%,
            rgba(215, 231, 247, 0.38),
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0) 66%
          ),
          linear-gradient(
            180deg,
            rgba(193, 214, 237, 0.28) 0%,
            rgba(172, 198, 225, 0.14) 44%,
            rgba(162, 189, 217, 0) 72%
          );
        filter: blur(7.5px) saturate(1.04);
        animation: cloud-drift-depth 28s ease-in-out infinite alternate;
        opacity: 0;
      }

      .img-photo.mood-cloudy .photo-clouds {
        opacity: 0.88;
      }

      .img-photo.mood-cloudy .photo-clouds-front {
        opacity: 0.8;
      }

      .img-photo.mood-cloudy .photo-clouds-depth {
        opacity: 0.62;
      }

      .img-photo.mood-rainy .photo-clouds {
        opacity: 0.94;
      }

      .img-photo.mood-rainy .photo-clouds-front {
        opacity: 0.9;
      }

      .img-photo.mood-rainy .photo-clouds-depth {
        opacity: 0.8;
      }

      .img-photo.mood-cloudy.night .photo-clouds,
      .img-photo.mood-rainy.night .photo-clouds {
        filter: blur(7px) saturate(0.9) brightness(0.88);
      }

      .img-photo.mood-cloudy.night .photo-clouds-front,
      .img-photo.mood-rainy.night .photo-clouds-front {
        mix-blend-mode: normal;
        filter: blur(4.8px) brightness(0.8);
      }

      .img-photo.mood-cloudy.night .photo-clouds-depth,
      .img-photo.mood-rainy.night .photo-clouds-depth {
        filter: blur(9px) saturate(0.86) brightness(0.78);
        opacity: 0.7;
      }

      .img-photo.partly-cloudy .photo-clouds {
        opacity: 0.62;
        filter: blur(9px) saturate(0.95);
      }

      .img-photo.partly-cloudy .photo-clouds-front {
        opacity: 0.36;
        filter: blur(7px) brightness(0.98);
      }

      .img-photo.partly-cloudy .photo-clouds-depth {
        opacity: 0.28;
        filter: blur(13px) saturate(0.9);
      }

      .img-photo.partly-cloudy.night .photo-clouds {
        opacity: 0.54;
        filter: blur(10px) saturate(0.82) brightness(0.9);
      }

      .img-photo.partly-cloudy.night .photo-clouds-front {
        opacity: 0.3;
        filter: blur(8px) brightness(0.84);
        mix-blend-mode: normal;
      }

      .img-photo.partly-cloudy.night .photo-clouds-depth {
        opacity: 0.24;
        filter: blur(14px) saturate(0.8) brightness(0.84);
      }

      .photo-fog {
        background:
          radial-gradient(
            130% 62% at 18% 74%,
            rgba(235, 243, 250, 0.34),
            rgba(235, 243, 250, 0) 72%
          ),
          radial-gradient(
            136% 66% at 72% 70%,
            rgba(229, 239, 248, 0.3),
            rgba(229, 239, 248, 0) 74%
          ),
          linear-gradient(
            180deg,
            rgba(217, 229, 240, 0.08) 0%,
            rgba(217, 229, 240, 0.24) 46%,
            rgba(217, 229, 240, 0.38) 100%
          );
        mix-blend-mode: screen;
        opacity: 0;
        animation: fog-drift 24s ease-in-out infinite alternate;
        z-index: 3;
        pointer-events: none;
      }

      .img-photo.foggy .photo-fog {
        opacity: 0.88;
      }

      .img-photo.foggy .photo-clouds {
        filter: blur(16px) saturate(0.72) brightness(0.94);
        opacity: 0.6;
      }

      .img-photo.foggy .photo-clouds-front {
        filter: blur(13px) saturate(0.68) brightness(0.92);
        opacity: 0.46;
      }

      .img-photo.foggy .photo-clouds-depth {
        filter: blur(20px) saturate(0.65) brightness(0.9);
        opacity: 0.44;
      }

      .img-photo.foggy .photo-cloud-shadow {
        opacity: 0.16;
      }

      .img-photo.foggy .photo-wind-streaks {
        opacity: 0;
      }

      .img-photo.sun-bloom.day .photo-sun-rays {
        opacity: 0.8;
      }

      .img-photo.windy .photo-wind-streaks {
        opacity: 1;
        height: 78%;
        animation-duration: 1.7s;
        background-size:
          260% 100%,
          240% 100%;
        background-position:
          -18% 18%,
          -58% 60%;
        filter: blur(0.15px);
      }

      .img-photo.windy .photo-wind-streaks::after {
        content: '';
        position: absolute;
        inset: 4% -8% 0 -8%;
        background-image:
          linear-gradient(
            114deg,
            rgba(224, 241, 255, 0) 0%,
            rgba(224, 241, 255, 0.3) 24%,
            rgba(224, 241, 255, 0.45) 38%,
            rgba(224, 241, 255, 0) 58%
          ),
          linear-gradient(
            114deg,
            rgba(204, 229, 250, 0) 14%,
            rgba(204, 229, 250, 0.24) 34%,
            rgba(204, 229, 250, 0.38) 52%,
            rgba(204, 229, 250, 0) 70%
          );
        background-size:
          280% 100%,
          250% 100%;
        background-position:
          -46% 24%,
          -86% 68%;
        animation: wind-streak-sweep-strong 1.35s linear infinite;
        opacity: 0.88;
        mix-blend-mode: screen;
        pointer-events: none;
      }

      .img-photo.windy .photo-clouds {
        animation-duration: 20s;
      }

      .img-photo.windy .photo-clouds-front {
        animation-duration: 10s;
      }

      .img-photo.windy .photo-clouds-depth {
        animation-duration: 14s;
      }

      .photo-rain {
        display: none;
      }

      .weather-particles {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 4;
      }

      .weather-cluster {
        position: absolute;
        top: 14%;
        width: 28%;
        height: 86%;
      }

      .weather-cluster.c1 {
        left: 4%;
      }

      .weather-cluster.c2 {
        left: 34%;
      }

      .weather-cluster.c3 {
        left: 64%;
      }

      .rain-drop {
        position: absolute;
        top: var(--start-y, -14%);
        left: var(--x, 50%);
        width: var(--w, 2px);
        height: var(--h, 22px);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(224, 241, 255, 0),
          rgba(224, 241, 255, 0.85) 35%,
          rgba(168, 214, 255, 0.9) 100%
        );
        filter: blur(0.2px);
        opacity: var(--opacity, 0.7);
        mix-blend-mode: screen;
        animation: rain-drop-fall var(--duration, 1.1s) linear infinite;
        animation-delay: var(--delay, 0s);
      }

      .snow-flake {
        position: absolute;
        top: -12%;
        left: var(--x, 50%);
        width: var(--size, 4px);
        height: var(--size, 4px);
        background: transparent;
        opacity: var(--opacity, 0.9);
        animation: snow-flake-fall var(--duration, 7s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 5;
      }

      .hail-stone {
        position: absolute;
        top: -14%;
        left: var(--x, 50%);
        width: var(--size, 4.6px);
        height: var(--size, 4.6px);
        border-radius: 999px;
        background: radial-gradient(
          circle at 28% 28%,
          rgba(248, 253, 255, 1),
          rgba(199, 224, 246, 0.95) 70%,
          rgba(136, 174, 209, 0.92) 100%
        );
        box-shadow:
          inset -1px -1px 1px rgba(97, 137, 177, 0.52),
          0 0 6px rgba(228, 241, 255, 0.6);
        opacity: var(--opacity, 0.84);
        animation: hail-stone-fall var(--duration, 0.7s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 5;
      }

      .img-photo.mood-cloudy .hail-stone {
        filter: contrast(1.08) brightness(1.06);
      }

      .rain-drizzle {
        position: absolute;
        top: var(--start-y, -12%);
        left: var(--x, 50%);
        width: var(--w, 1.1px);
        height: var(--h, 11px);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(234, 245, 255, 0),
          rgba(234, 245, 255, 0.55) 40%,
          rgba(182, 216, 246, 0.7) 100%
        );
        filter: blur(0.3px);
        opacity: var(--opacity, 0.4);
        mix-blend-mode: screen;
        animation: rain-drop-fall var(--duration, 1.45s) linear infinite;
        animation-delay: var(--delay, 0s);
        z-index: 4;
      }

      .snow-flake::before,
      .snow-flake::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.98),
          rgba(222, 240, 255, 0.96)
        );
        border-radius: 999px;
      }

      .snow-flake::before {
        width: max(1px, calc(var(--size, 4px) * 0.22));
        height: var(--size, 4px);
        box-shadow:
          0 0 6px rgba(255, 255, 255, 0.8),
          0 0 2px rgba(210, 233, 255, 0.9);
      }

      .snow-flake::after {
        width: var(--size, 4px);
        height: max(1px, calc(var(--size, 4px) * 0.22));
      }

      .snow-flake i,
      .snow-flake b {
        position: absolute;
        left: 50%;
        top: 50%;
        width: max(1px, calc(var(--size, 4px) * 0.18));
        height: calc(var(--size, 4px) * 0.86);
        border-radius: 999px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.92),
          rgba(216, 236, 255, 0.88)
        );
        transform-origin: center;
      }

      .snow-flake i {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      .snow-flake b {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      .photo-sun-rays {
        background: conic-gradient(
          from 20deg at 76% 20%,
          rgba(255, 249, 189, 0.28) 0deg,
          rgba(255, 249, 189, 0) 35deg,
          rgba(255, 246, 177, 0.24) 52deg,
          rgba(255, 246, 177, 0) 90deg,
          rgba(255, 247, 181, 0.28) 116deg,
          rgba(255, 247, 181, 0) 160deg,
          rgba(255, 249, 189, 0.22) 198deg,
          rgba(255, 249, 189, 0) 240deg,
          rgba(255, 250, 200, 0.26) 280deg,
          rgba(255, 250, 200, 0) 320deg,
          rgba(255, 249, 189, 0.28) 360deg
        );
        mix-blend-mode: screen;
        opacity: 0;
        animation: sun-ray-sweep 18s linear infinite;
        z-index: 2;
      }

      .photo-night-stars {
        background-image:
          radial-gradient(circle at 8% 18%, rgba(255, 247, 201, 0.95) 0 1.2px, transparent 1.9px),
          radial-gradient(circle at 16% 34%, rgba(235, 242, 255, 0.95) 0 1px, transparent 1.7px),
          radial-gradient(circle at 24% 12%, rgba(255, 247, 201, 0.88) 0 1.4px, transparent 2.1px),
          radial-gradient(circle at 34% 28%, rgba(235, 242, 255, 0.92) 0 1.1px, transparent 1.8px),
          radial-gradient(circle at 42% 16%, rgba(255, 247, 201, 0.9) 0 1.3px, transparent 2px),
          radial-gradient(circle at 56% 24%, rgba(235, 242, 255, 0.95) 0 1px, transparent 1.8px),
          radial-gradient(circle at 68% 10%, rgba(255, 247, 201, 0.9) 0 1.5px, transparent 2.2px),
          radial-gradient(circle at 78% 22%, rgba(235, 242, 255, 0.9) 0 1.1px, transparent 1.8px),
          radial-gradient(circle at 88% 14%, rgba(255, 247, 201, 0.9) 0 1.3px, transparent 2px);
        opacity: 0;
        filter: drop-shadow(0 0 4px rgba(255, 244, 180, 0.22));
        animation: night-stars-twinkle 5.8s ease-in-out infinite alternate;
        z-index: 1;
        pointer-events: none;
      }

      .img-photo.clear-night .photo-night-stars {
        opacity: 0.92;
      }

      .photo-wind-streaks {
        background-image:
          linear-gradient(
            112deg,
            rgba(225, 239, 255, 0) 0%,
            rgba(225, 239, 255, 0.18) 26%,
            rgba(225, 239, 255, 0.34) 38%,
            rgba(225, 239, 255, 0) 54%
          ),
          linear-gradient(
            112deg,
            rgba(213, 233, 255, 0) 18%,
            rgba(213, 233, 255, 0.2) 34%,
            rgba(213, 233, 255, 0.3) 48%,
            rgba(213, 233, 255, 0) 64%
          );
        background-size:
          220% 100%,
          200% 100%;
        background-position:
          0% 20%,
          -36% 62%;
        opacity: 0;
        animation: wind-streak-sweep 2.6s linear infinite;
        z-index: 4;
        pointer-events: none;
        inset: 0 0 auto 0;
        height: 68%;
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.82) 58%,
          rgba(0, 0, 0, 0) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.82) 58%,
          rgba(0, 0, 0, 0) 100%
        );
        mix-blend-mode: screen;
      }

      .photo-lightning {
        background: radial-gradient(
          circle at var(--flash-x, 52%) var(--flash-y, 26%),
          rgba(255, 246, 169, 0.95),
          rgba(255, 246, 169, 0) 52%
        );
        opacity: 0;
        mix-blend-mode: screen;
        animation: lightning-flash var(--flash-duration, 7s) infinite;
        animation-delay: var(--delay, 0s);
        z-index: 6;
      }

      .photo-lightning-bolt {
        position: absolute;
        top: var(--bolt-top, 8%);
        left: var(--bolt-left, 54%);
        width: var(--bolt-width, 6px);
        height: var(--bolt-height, 40%);
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.9) 22%,
          rgba(255, 241, 168, 0.95) 100%
        );
        clip-path: polygon(48% 0, 70% 0, 44% 36%, 68% 36%, 30% 100%, 44% 56%, 24% 56%);
        filter: drop-shadow(0 0 8px rgba(255, 248, 190, 0.9));
        opacity: 0;
        transform: rotate(var(--bolt-rotate, 0deg));
        animation: lightning-bolt var(--flash-duration, 7s) infinite;
        animation-delay: var(--delay, 0s);
        z-index: 7;
      }

      .photo-cloud-shadow {
        background:
          radial-gradient(ellipse at 22% 42%, rgba(42, 66, 94, 0.2), rgba(42, 66, 94, 0) 48%),
          radial-gradient(ellipse at 58% 40%, rgba(45, 70, 99, 0.16), rgba(45, 70, 99, 0) 46%),
          radial-gradient(ellipse at 85% 44%, rgba(42, 67, 96, 0.2), rgba(42, 67, 96, 0) 49%);
        animation: cloud-shadow-drift 20s ease-in-out infinite alternate;
        opacity: 0.36;
        mix-blend-mode: soft-light;
      }

      .photo-vignette {
        background: radial-gradient(
          circle at center,
          rgba(0, 0, 0, 0) 52%,
          rgba(0, 0, 0, 0.33) 100%
        );
        z-index: 3;
      }

      .photo-grain {
        background-image: radial-gradient(rgba(255, 255, 255, 0.2) 0.6px, transparent 0.8px);
        background-size: 3px 3px;
        opacity: 0.1;
        mix-blend-mode: soft-light;
        animation: grain-shift 0.25s steps(2, end) infinite;
        z-index: 8;
      }

      @keyframes bg-pan {
        0% {
          transform: scale(1.02) translate3d(0, 0, 0);
        }
        100% {
          transform: scale(1.07) translate3d(-1.5%, -1.2%, 0);
        }
      }

      @keyframes cloud-drift {
        0% {
          transform: translate3d(-2%, 0, 0) scale(1.02);
        }
        100% {
          transform: translate3d(2%, -1%, 0) scale(1.06);
        }
      }

      @keyframes cloud-drift-depth {
        0% {
          transform: translate3d(2%, 1%, 0) scale(1.04);
        }
        100% {
          transform: translate3d(-3%, -1%, 0) scale(1.08);
        }
      }

      @keyframes cloud-drift-front {
        0% {
          transform: translate3d(-3%, 1%, 0) scale(1.03);
        }
        100% {
          transform: translate3d(4%, -1%, 0) scale(1.08);
        }
      }

      @keyframes cloud-shadow-drift {
        0% {
          transform: translate3d(-2%, 1%, 0) scale(1.01);
        }
        100% {
          transform: translate3d(2%, -1%, 0) scale(1.06);
        }
      }

      @keyframes rain-fall {
        0% {
          transform: translateY(-14px);
        }
        100% {
          transform: translateY(14px);
        }
      }

      @keyframes rain-drop-fall {
        0% {
          transform: translate3d(0, -12%, 0) rotate(10deg);
        }
        100% {
          transform: translate3d(var(--drift, 6px), 132%, 0) rotate(10deg);
        }
      }

      @keyframes hail-stone-fall {
        0% {
          transform: translate3d(0, -10%, 0) scale(0.95);
        }
        82% {
          transform: translate3d(var(--drift, 4px), 126%, 0) scale(1);
        }
        100% {
          transform: translate3d(calc(var(--drift, 4px) * 1.15), 138%, 0) scale(0.92);
        }
      }

      @keyframes snow-flake-fall {
        0% {
          top: -12%;
          transform: translate3d(0, 0, 0) rotate(0deg);
        }
        35% {
          transform: translate3d(var(--drift, 10px), 0, 0) rotate(120deg);
        }
        70% {
          transform: translate3d(var(--drift-back, -10px), 0, 0) rotate(220deg);
        }
        100% {
          top: 112%;
          transform: translate3d(0, 0, 0) rotate(360deg);
        }
      }

      @keyframes sun-ray-sweep {
        0% {
          transform: rotate(0deg) scale(1);
          opacity: 0.55;
        }
        50% {
          transform: rotate(8deg) scale(1.04);
          opacity: 0.9;
        }
        100% {
          transform: rotate(16deg) scale(1);
          opacity: 0.58;
        }
      }

      @keyframes wind-streak-sweep {
        0% {
          background-position:
            0% 20%,
            -36% 62%;
          opacity: 0.55;
        }
        50% {
          background-position:
            76% 24%,
            46% 66%;
          opacity: 0.95;
        }
        100% {
          background-position:
            156% 28%,
            128% 70%;
          opacity: 0.45;
        }
      }

      @keyframes wind-streak-sweep-strong {
        0% {
          background-position:
            -46% 24%,
            -86% 68%;
          opacity: 0.66;
        }
        50% {
          background-position:
            72% 20%,
            38% 66%;
          opacity: 0.98;
        }
        100% {
          background-position:
            188% 16%,
            152% 62%;
          opacity: 0.62;
        }
      }

      @keyframes fog-drift {
        0% {
          transform: translate3d(-1.2%, 0.4%, 0) scale(1.01);
        }
        100% {
          transform: translate3d(1.8%, -0.6%, 0) scale(1.04);
        }
      }

      @keyframes lightning-bolt {
        0%,
        83%,
        100% {
          opacity: 0;
        }
        84% {
          opacity: 1;
        }
        85% {
          opacity: 0;
        }
        86% {
          opacity: 0.85;
        }
        87% {
          opacity: 0;
        }
      }

      @keyframes lightning-flash {
        0%,
        83%,
        100% {
          opacity: 0;
        }
        84% {
          opacity: 0.92;
        }
        85% {
          opacity: 0;
        }
        86% {
          opacity: 0.72;
        }
        87% {
          opacity: 0;
        }
      }

      @keyframes night-stars-twinkle {
        0% {
          opacity: 0.72;
          transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
          opacity: 1;
          transform: translate3d(0.4%, -0.3%, 0) scale(1.01);
        }
        100% {
          opacity: 0.82;
          transform: translate3d(-0.4%, 0.2%, 0) scale(1.02);
        }
      }

      @keyframes grain-shift {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(1px, 1px);
        }
      }
      .condition {
        position: absolute;
        top: 14px;
        right: 16px;
        font-size: 16px;
        color: #fff;
        text-align: right;
        z-index: 10;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .forecast-temps {
        position: absolute;
        top: calc(var(--bg-temp-font-size, 36px) + 52px);
        left: 12px;
        font-size: 14px;
        color: #fff;
        max-width: calc(100% - 32px);
        display: flex;
        flex-direction: row;
        gap: 10px;
        z-index: 10;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .sun-times {
        position: absolute;
        top: calc(var(--bg-temp-font-size, 36px) + 52px);
        right: 16px;
        display: flex;
        gap: 12px;
        align-items: center;
        color: #fff;
        font-size: 14px;
        z-index: 12;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .forecast-mini {
        position: absolute;
        bottom: 16px;
        right: 16px;
        z-index: 12;
        max-width: calc(100% - 32px);
        isolation: isolate;
        background: transparent !important;
      }
      /* Make child forecast charts transparent */
      .forecast-mini::part(background),
      .forecast-mini > * {
        background: transparent !important;
        --card-background-color: transparent !important;
        --ha-card-background: transparent !important;
      }
      .forecast-mini ha-card,
      .forecast-mini .card,
      .forecast-mini > div {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      @media (max-width: 400px) {
        .forecast-mini {
          right: 12px;
          bottom: 12px;
          max-width: calc(100% - 24px);
        }
      }
      .temp-high {
        font-weight: bold;
        color: #fff;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      .temp-low {
        color: #fff;
        text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8);
      }
      @media (max-width: 400px) {
        .temperature {
          font-size: calc(var(--bg-temp-font-size, 36px) * 0.8);
          padding: 4px 8px;
        }
        .condition {
          font-size: 14px;
        }
        .forecast-temps {
          font-size: 12px;
        }
      }
      @media (max-width: 768px) {
        .metrics-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }
  setConfig(r) {
    if (!r.entity)
      throw new Error("You need to define an entity");
    this.config = r;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 4;
  }
  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 4,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 4,
      max_columns: 48,
      min_rows: 3,
      max_rows: 12
    };
  }
  static getStubConfig() {
    return {
      type: `custom:${ke}`,
      entity: "",
      scenery_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg/1280px-Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg"
    };
  }
  static getConfigElement() {
    return document.createElement(br);
  }
  // Schema for the visual editor
  static getConfigSchema() {
    return ge;
  }
  updated(r) {
    if (super.updated(r), this.hass && this.config?.entity) {
      if (this._lastEntityId !== this.config.entity) {
        this._lastEntityId = this.config.entity;
        const e = this.config.forecast_mode || "daily";
        e === "daily" && this._loadDailyForecast(), e === "hourly" && this._loadHourlyForecast();
      }
      this.config.show_day_temps !== !1 && !this._forecastLoading && this._forecast.length === 0 && this._loadDailyForecast();
    }
  }
  render() {
    if (ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2)), !this.hass || !this.config)
      return c``;
    const r = this.config?.grid_options?.rows ?? 4;
    this.style.setProperty("--card-grid-rows", r.toString()), (!this._resolvedEntities || this._lastEntityId !== this.config.entity) && (this._resolvedEntities = mr(this.hass, this.config.entity));
    const e = ze(this.hass, this.config.entity);
    if (!e || !e.attributes)
      return c`<div class="bg-card-root"><div style="padding:20px;text-align:center;color:var(--secondary-text-color);">Entity not found: ${this.config.entity}</div></div>`;
    const t = e.attributes.temperature;
    let i = NaN;
    typeof t == "number" ? i = t : typeof t == "string" && (i = parseFloat(t)), isNaN(i) && this._resolvedEntities?.temperature && (i = Ye(this.hass, this._resolvedEntities.temperature) ?? NaN);
    const n = e.state, s = ul(this.hass, this.config), o = this.clientWidth || 300, l = r * 64 - 8, a = this.config?.temperature_font_size, h = typeof a == "number" && a > 0 ? `${a}px` : "36px";
    this.style.setProperty("--bg-temp-font-size", h), this.style.setProperty("--bg-temp-img-top", `calc(${h})`);
    const d = this._forecast && this._forecast.length > 0 ? this._forecast[0] : e.attributes.forecast ? e.attributes.forecast[0] : null, p = this.config.sun_entity, g = p ? this.hass.states[p] : void 0, f = g?.attributes?.next_rising ? new Date(g.attributes.next_rising) : void 0, b = g?.attributes?.next_setting ? new Date(g.attributes.next_setting) : void 0, C = (this.hass.selectedLanguage || this.hass.language || "en").replace("_", "-"), v = (E) => E ? E.toLocaleTimeString(C, { hour: "2-digit", minute: "2-digit" }) : "--:--";
    return c`
      <div class="bg-card-root">
        <div style="position:absolute;top:8px;left:12px;z-index:20;display:flex;align-items:center;justify-content:center;border-radius:45px;border:2px solid var(--primary-text-color,#fff);background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:5px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.4);font-size:${h};font-weight:bold;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.8);">
          ${isNaN(i) ? "--" : Math.round(i)}°
        </div>
        ${n ? c`${this.config.photo_mode === !0 ? this._renderPhotoLikeBackground(n, s) : c`<div class="img-svg">
                        <svg
                          viewBox="0 0 ${o} ${l}"
                          width="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          preserveAspectRatio="xMidYMid slice"
                        >
                          ${o > 0 ? ml(n, s, o) : w``}
                        </svg>
                      </div>`}
                ${d && this.config.show_day_temps !== !1 ? c`
                        <div style="position:absolute;top:calc(${h} + 52px);left:12px;z-index:20;font-size:14px;color:#fff;display:flex;flex-direction:row;gap:10px;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">
                          <span style="font-weight:bold;">
                            <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                            ${Math.round(d.temperature)}°
                          </span>
                          <span>
                            <ha-icon icon="mdi:arrow-down-bold"></ha-icon> ${Math.round(
      d.templow || d.temperature - 5
    )}°
                          </span>
                        </div>
                      ` : ""}
                ${p && this.config.show_sun_times !== !1 && n !== "clear-night" ? c`
                        <div style="position:absolute;top:calc(${h} + 52px);right:16px;z-index:20;display:flex;gap:12px;align-items:center;color:#fff;font-size:14px;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">
                          <span title="${X("bg_card.sunrise")}">
                            <ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${v(f)}
                          </span>
                          <span title="${X("bg_card.sunset")}">
                            <ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${v(b)}
                          </span>
                        </div>
                      ` : ""}
                ${(this.config.forecast_mode || "daily") === "daily" && this._forecast.length > 0 ? c`
                        <div class="forecast-mini">
                          <daily-forecast-chart
                            .forecast=${this._forecast?.slice(0, 7) ?? []}
                            .forecastLoading=${this._forecastLoading}
                            .show_forecast=${!0}
                            .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
                            .compact=${!0}
                            .startTomorrow=${!0}
                            .maxDays=${5}
                            .alignRight=${!0}
                            ._t=${X}
                            .getWeatherIcon=${zt}
                            .formatDate=${Yo}
                          ></daily-forecast-chart>
                        </div>
                      ` : c``}
                ${(this.config.forecast_mode || "daily") === "hourly" && this._hourly.length > 0 ? c`
                        <div class="forecast-mini">
                          <hourly-forecast-chart
                            .hourlyForecast=${this._hourly}
                            .forecastLoading=${this._hourlyLoading}
                            .show_forecast=${!0}
                            .config=${{ ...this.config, enable_animate_weather_icons: !0 }}
                            .compact=${!0}
                            .maxHours=${5}
                            .alignRight=${!0}
                            ._t=${X}
                            .getWeatherIcon=${zt}
                          ></hourly-forecast-chart>
                        </div>
                      ` : c``}
                <div style="position:absolute;top:14px;right:16px;z-index:20;font-size:16px;color:#fff;text-align:right;text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 2px rgba(0,0,0,0.8);">${X(n)}</div> ` : c``}
      </div>
    `;
  }
  _resolvePhotoMood(r) {
    return ["rainy", "pouring", "lightning", "lightning-rainy", "snowy-rainy", "exceptional"].includes(
      r
    ) ? "rainy" : ["cloudy", "fog", "windy", "windy-variant", "snowy", "hail"].includes(r) ? "cloudy" : "sunny";
  }
  _renderPhotoLikeBackground(r, e) {
    const t = this._resolvePhotoMood(r), i = r === "clear-night", n = r === "fog", s = r === "partlycloudy", o = i || !e, l = r === "windy" || r === "windy-variant", a = e && (r === "sunny" || r === "partlycloudy"), h = t === "rainy" || r === "snowy-rainy" || r === "rainy" || r === "pouring", d = r === "snowy" || r === "snowy-rainy", p = r === "hail", g = r === "lightning" || r === "lightning-rainy", f = r === "snowy-rainy", b = ["c1", "c2", "c3"], C = this.config.scenery_image, v = C !== void 0 ? C : this.config.photo_mode === !0 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg/1280px-Vierwaldst%C3%A4ttersee_with_Mountain_Panorama.jpg" : "";
    return c`
      <div
        class="img-photo ${v ? "has-scenery" : ""} mood-${t} ${o ? "night" : "day"} ${i ? "clear-night" : ""} ${n ? "foggy" : ""} ${s ? "partly-cloudy" : ""} ${l ? "windy" : ""} ${a ? "sun-bloom" : ""}"
      >
        ${v ? c`<div
                class="photo-layer photo-scenery"
                style="background-image: url('${v}');"
              ></div>` : c``}
        <div class="photo-layer photo-base"></div>
        <div class="photo-layer photo-circadian"></div>
        <div class="photo-layer photo-sun-rays"></div>
        ${i ? c`<div class="photo-layer photo-night-stars"></div>` : c``}
        <div class="photo-layer photo-clouds"></div>
        <div class="photo-layer photo-clouds-front"></div>
        <div class="photo-layer photo-clouds-depth"></div>
        <div class="photo-layer photo-fog"></div>
        <div class="photo-layer photo-wind-streaks"></div>
        <div class="photo-layer photo-cloud-shadow"></div>
        ${h || d || p ? c`<div class="photo-layer weather-particles">
                ${f ? c`${b.map(
      (E) => c`<div class="weather-cluster ${E}">
                            ${h ? this._renderRainParticles(6, !0) : c``}
                            ${d ? this._renderSnowParticles(10, !0) : c``}
                          </div>`
    )}` : c`${r === "pouring" ? this._renderRainParticles(68, !1, !0) : c``}
                      ${r === "pouring" ? this._renderDrizzleParticles(28, !1, !0) : c``}
                      ${r === "rainy" ? this._renderRainParticles(66, !1, !0) : c``}
                      ${r === "rainy" ? this._renderDrizzleParticles(22, !1, !0) : c``}
                      ${r === "lightning-rainy" ? this._renderRainParticles(54, !1) : c``}
                      ${r === "lightning-rainy" ? this._renderDrizzleParticles(18, !1) : c``}
                      ${h && r !== "pouring" && r !== "rainy" && r !== "lightning-rainy" ? this._renderRainParticles(28, !1) : c``}
                      ${d ? this._renderSnowParticles(36, !1) : c``}
                      ${p ? this._renderHailParticles(58, !1) : c``}`}
              </div>` : c``}
        ${g ? c`${this._renderLightningFlashes()} ${this._renderLightningBolts()}` : c``}
        <div class="photo-layer photo-vignette"></div>
        <div class="photo-layer photo-grain"></div>
      </div>
    `;
  }
  _renderRainParticles(r, e, t = !1) {
    return Array.from({ length: r }, (i, n) => {
      const s = e ? 14 : 4, o = e ? 72 : 96, l = s + (n * 31 + 17) % 100 / 100 * o, a = (e ? 0.95 : 0.9 + n % 5 * 0.14).toFixed(2), h = (-1 * (n % 7 * 0.23)).toFixed(2), d = (e ? 15 : 14) + n % 4 * 5, p = (0.46 + n % 4 * 0.11).toFixed(2), g = (n % 2 === 0 ? 5 : -5) + (n % 3 - 1) * 1.7, f = n % 3 === 0 ? 1.6 : 2.1, b = t ? `${(-8 + (n * 19 + 13) % 100).toFixed(1)}%` : "-14%";
      return c`<span
        class="rain-drop"
        style="--x:${l.toFixed(
        2
      )}%; --start-y:${b}; --duration:${a}s; --delay:${h}s; --h:${d}px; --opacity:${p}; --drift:${g.toFixed(
        1
      )}px; --w:${f}px;"
      ></span>`;
    });
  }
  _renderSnowParticles(r, e) {
    return Array.from({ length: r }, (t, i) => {
      const n = e ? 12 : 2, s = e ? 76 : 98, o = n + (i * 29 + 7) % 100 / 100 * s, l = (e ? 6.1 : 5.6 + i % 5 * 1.1).toFixed(2), a = (-1 * (i % 9 * 0.7)).toFixed(2), h = (e ? 2.8 : 2.4 + i % 4 * 1.1).toFixed(1), d = (0.52 + i % 4 * 0.11).toFixed(2), p = (i % 2 === 0 ? 13 : -13) + (i % 3 - 1) * 2.6, g = -p * 0.7;
      return c`<span
        class="snow-flake"
        style="--x:${o.toFixed(
        2
      )}%; --duration:${l}s; --delay:${a}s; --size:${h}px; --opacity:${d}; --drift:${p}px; --drift-back:${g.toFixed(
        1
      )}px;"
        ><i></i><b></b
      ></span>`;
    });
  }
  _renderDrizzleParticles(r, e, t = !1) {
    return Array.from({ length: r }, (i, n) => {
      const s = e ? 12 : 2, o = e ? 76 : 98, l = s + (n * 17 + 11) % 100 / 100 * o, a = (e ? 1.25 : 1.3 + n % 4 * 0.14).toFixed(2), h = (-1 * (n % 8 * 0.17)).toFixed(2), d = (e ? 8 : 7) + n % 3 * 2, p = (0.22 + n % 4 * 0.07).toFixed(2), g = (n % 2 === 0 ? 2.5 : -2.5) + (n % 3 - 1) * 1.1, f = n % 2 === 0 ? 1 : 1.2, b = t ? `${(-8 + (n * 23 + 5) % 100).toFixed(1)}%` : "-12%";
      return c`<span
        class="rain-drizzle"
        style="--x:${l.toFixed(
        2
      )}%; --start-y:${b}; --duration:${a}s; --delay:${h}s; --h:${d}px; --opacity:${p}; --drift:${g.toFixed(
        1
      )}px; --w:${f}px;"
      ></span>`;
    });
  }
  _renderHailParticles(r, e) {
    return Array.from({ length: r }, (t, i) => {
      const n = e ? 14 : 4, s = e ? 72 : 96, o = n + (i * 31 + 17) % 100 / 100 * s, l = (e ? 0.73 : 0.62 + i % 5 * 0.075).toFixed(2), a = (-1 * (i % 7 * 0.19)).toFixed(2), h = (0.72 + i % 4 * 0.09).toFixed(2), d = (i % 2 === 0 ? 3.4 : -3.4) + (i % 3 - 1) * 1.3, p = i % 2 === 0 ? 4.3 : 5.1;
      return c`<span
        class="hail-stone"
        style="--x:${o.toFixed(
        2
      )}%; --duration:${l}s; --delay:${a}s; --opacity:${h}; --drift:${d.toFixed(
        1
      )}px; --size:${p}px;"
      ></span>`;
    });
  }
  _renderLightningFlashes() {
    return [
      { x: 12, y: 24, delay: "-0.2s", duration: "6.8s" },
      { x: 28, y: 18, delay: "-1.1s", duration: "7.1s" },
      { x: 50, y: 26, delay: "-2.4s", duration: "6.6s" },
      { x: 72, y: 20, delay: "-3.2s", duration: "7.0s" },
      { x: 88, y: 28, delay: "-4.3s", duration: "6.9s" }
    ].map(
      (e) => c`<div
          class="photo-layer photo-lightning"
          style="--flash-x:${e.x}%; --flash-y:${e.y}%; --delay:${e.delay}; --flash-duration:${e.duration};"
        ></div>`
    );
  }
  _renderLightningBolts() {
    return [
      {
        left: 11,
        top: 10,
        height: 34,
        width: 7,
        rotate: "-6deg",
        delay: "-0.2s",
        duration: "6.8s"
      },
      { left: 27, top: 6, height: 42, width: 8, rotate: "5deg", delay: "-1.1s", duration: "7.1s" },
      { left: 49, top: 9, height: 38, width: 7, rotate: "-2deg", delay: "-2.4s", duration: "6.6s" },
      { left: 70, top: 7, height: 44, width: 8, rotate: "4deg", delay: "-3.2s", duration: "7.0s" },
      {
        left: 86,
        top: 12,
        height: 32,
        width: 6,
        rotate: "-8deg",
        delay: "-4.3s",
        duration: "6.9s"
      }
    ].map(
      (e) => c`<div
          class="photo-layer photo-lightning-bolt"
          style="--bolt-left:${e.left}%; --bolt-top:${e.top}%; --bolt-height:${e.height}%; --bolt-width:${e.width}px; --bolt-rotate:${e.rotate}; --delay:${e.delay}; --flash-duration:${e.duration};"
        ></div>`
    );
  }
  // Load only the daily forecast via Home Assistant WS API
  async _loadDailyForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const e = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: {
            entity_id: this.config.entity,
            type: "daily"
          },
          return_response: !0
        }))?.response;
        e && e[this.config.entity] ? (this._forecast = e[this.config.entity].forecast || [], this.requestUpdate("_forecast")) : this._forecast = [];
      } catch {
        this._forecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  // Load only the hourly forecast via Home Assistant WS API
  async _loadHourlyForecast() {
    if (!(!this.hass || !this.config?.entity || this._hourlyLoading)) {
      this._hourlyLoading = !0;
      try {
        const e = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: {
            entity_id: this.config.entity,
            type: "hourly"
          },
          return_response: !0
        }))?.response;
        e && e[this.config.entity] ? (this._hourly = e[this.config.entity].forecast || [], this.requestUpdate("_hourly")) : this._hourly = [];
      } catch {
        this._hourly = [];
      } finally {
        this._hourlyLoading = !1;
      }
    }
  }
};
qe([
  m({ attribute: !1 })
], Le.prototype, "hass", 2);
qe([
  m({ attribute: !1 })
], Le.prototype, "config", 2);
qe([
  as(".temperature")
], Le.prototype, "_tempEl", 2);
qe([
  Z()
], Le.prototype, "_forecast", 2);
qe([
  Z()
], Le.prototype, "_hourly", 2);
qe([
  Z()
], Le.prototype, "_resolvedEntities", 2);
Le = qe([
  H(ke)
], Le);
var Ol = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, ci = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Dl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Ol(e, t, n), n;
};
I({
  // Loads the language by returning a JSON structure for a given language
  loader: (r) => B[r]
});
let Et = class extends N {
  constructor() {
    super(), this._computeLabel = (r) => ({
      entity: u("bg_card.config.entity"),
      sun_entity: u("bg_card.config.sun_entity"),
      forecast_mode: u("bg_card.config.forecast_mode"),
      show_day_temps: u("bg_card.config.show_day_temps"),
      show_sun_times: u("bg_card.config.show_sun_times"),
      temperature_font_size: u("bg_card.config.temperature_font_size"),
      photo_mode: u("bg_card.config.photo_mode"),
      scenery_image: u("bg_card.config.scenery_image") || "Scenery Image URL"
    })[r.name] || r.name, this._computeHelper = (r) => r.description ? u(r.description) : "";
  }
  setConfig(r) {
    const e = { ...r }, t = ["entity", "sun_entity"];
    for (const i of t)
      e[i] === "" && delete e[i];
    this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }

      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }

      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      ha-form {
        display: block;
        margin-bottom: 24px;
      }

      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }

      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }
      .group {
        margin-bottom: 24px;
        padding: 16px 0 0 0;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .group-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color, #007AFF);
        margin-bottom: 8px;
        margin-top: 0;
      }
      .card-config {
        padding: 16px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .header-subtitle {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      ha-form {
        display: block;
        margin-bottom: 24px;
      }
      .preview {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 20px;
        margin-top: 24px;
      }
      .preview-title {
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-config {
        font-family: 'SFMono-Regular', 'Monaco', 'Consolas', monospace;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: var(--code-editor-background-color, #f8f8f8);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        border: 1px solid var(--divider-color);
      }

      @media (max-width: 768px) {
        .card-config {
          padding: 12px;
        }
      }
    `;
  }
  render() {
    if (!this.hass)
      return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0,
      scenery_image: typeof this._config?.scenery_image == "string" ? this._config.scenery_image : void 0,
      forecast_mode: typeof this._config?.forecast_mode == "string" ? this._config.forecast_mode : void 0,
      show_sun_times: typeof this._config?.show_sun_times == "boolean" ? this._config.show_sun_times : void 0,
      show_day_temps: typeof this._config?.show_day_temps == "boolean" ? this._config.show_day_temps : void 0,
      temperature_font_size: typeof this._config?.temperature_font_size == "number" ? this._config.temperature_font_size : void 0,
      photo_mode: typeof this._config?.photo_mode == "boolean" ? this._config.photo_mode : void 0
    }, e = ge.find((i) => i.name === "forecast_mode"), t = e ? {
      ...e,
      selector: {
        ...e.selector,
        select: {
          ...e.selector.select,
          options: [
            { value: "daily", label: u("bg_card.forecast_mode.daily") },
            { value: "hourly", label: u("bg_card.forecast_mode.hourly") },
            { value: "none", label: u("bg_card.forecast_mode.none") }
          ]
        }
      }
    } : void 0;
    return c`
      <div class="card-config">
        <div class="header">
          <div>
            <div class="header-title">🌦️ MeteoSwiss Animated Background Card</div>
          </div>
        </div>

        <!-- General -->
        <div class="group">
          <div class="group-title">${u("bg_card.config.group_general") || "General"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${r}
            .schema=${[
      ge.find((i) => i.name === "entity"),
      ge.find((i) => i.name === "sun_entity"),
      ge.find((i) => i.name === "temperature_font_size")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Display -->
        <div class="group">
          <div class="group-title">${u("bg_card.config.group_display") || "Display"}</div>
          <ha-form
            .hass=${this.hass}
            .data=${r}
            .schema=${[
      t,
      ge.find((i) => i.name === "show_day_temps"),
      ge.find((i) => i.name === "show_sun_times"),
      ge.find((i) => i.name === "photo_mode"),
      ge.find((i) => i.name === "scenery_image")
    ].filter(Boolean)}
            .computeLabel=${this._computeLabel}
            .computeHelper=${this._computeHelper}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>

        <!-- Configuration Preview -->
        ${this._config?.entity ? c`
                <div class="preview">
                  <div class="preview-title">📋 YAML-Config</div>
                  <div class="preview-config">${this._renderConfigPreview()}</div>
                </div>
              ` : ""}
      </div>
    `;
  }
  _renderConfigPreview() {
    const r = { ...this._config };
    return r.type || (r.type = `custom:${ke}`), Object.keys(r).forEach((e) => {
      (r[e] === void 0 || r[e] === "") && delete r[e];
    }), Object.entries(r).map(([e, t]) => typeof t == "string" ? `${e}: "${t}"` : `${e}: ${t}`).join(`
`);
  }
  _valueChanged(r) {
    if (this._config || (this._config = {
      type: `custom:${ke}`,
      entity: ""
    }), r.type === "value-changed") {
      const e = {}, { ...t } = r.detail.value || {}, i = {
        ...this._config,
        ...t,
        ...e,
        type: `custom:${ke}`
      };
      delete i.show_forecast, Object.keys(i).forEach((n) => {
        (i[n] === "" || i[n] === void 0) && delete i[n];
      }), this._config = i, le(this, "config-changed", { config: this._config });
    }
  }
};
ci([
  m({ attribute: !1 })
], Et.prototype, "hass", 2);
ci([
  m({ attribute: !1 })
], Et.prototype, "lovelace", 2);
ci([
  m({ attribute: !1 })
], Et.prototype, "_config", 2);
Et = ci([
  H(br)
], Et);
const it = `${ye}-temperature-card`, wr = `${it}-editor`, nt = `${ye}-precipitation-card`, xr = `${nt}-editor`, rt = `${ye}-sunshine-card`, vr = `${rt}-editor`, st = `${ye}-wind-card`, $r = `${st}-editor`, di = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  }
], kr = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  }
], Cr = [
  {
    name: "entity",
    required: !0,
    selector: { entity: { domain: "weather" } },
    description: "hourly_charts.config.descr.entity"
  },
  {
    name: "forecast_hours",
    required: !1,
    selector: { number: { min: 6, max: 48, step: 1, mode: "box" } },
    description: "hourly_charts.config.descr.forecast_hours"
  },
  {
    name: "sun_entity",
    required: !1,
    selector: { entity: { domain: "sun" } },
    description: "hourly_charts.config.descr.sun_entity"
  },
  {
    name: "sunshine_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "hourly_charts.config.descr.sunshine_entity"
  }
];
var Pl = Object.defineProperty, hi = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(e, t, n) || n);
  return n && Pl(e, t, n), n;
};
class Te extends N {
  constructor() {
    super(...arguments), this._hourlyForecast = [], this._forecastLoading = !1;
  }
  async _loadForecast() {
    if (!(!this.hass || !this.config?.entity || this._forecastLoading)) {
      this._forecastLoading = !0;
      try {
        const t = (await this.hass.callWS({
          type: "call_service",
          domain: "weather",
          service: "get_forecasts",
          service_data: { entity_id: this.config.entity, type: "hourly" },
          return_response: !0
        }))?.response;
        t && t[this.config.entity] ? (this._hourlyForecast = t[this.config.entity].forecast || [], this.requestUpdate("_hourlyForecast")) : this._hourlyForecast = [];
      } catch {
        this._hourlyForecast = [];
      } finally {
        this._forecastLoading = !1;
      }
    }
  }
  updated(e) {
    super.updated(e);
    const t = e.has("hass"), i = e.has("config");
    (t || i) && this._hourlyForecast.length === 0 && !this._forecastLoading && this._loadForecast();
  }
  setBaseConfig(e) {
    this.config = e, setTimeout(() => {
      this._loadForecast();
    }, 1e3);
  }
  getDefaultRows() {
    return 3;
  }
  setCardGridRows() {
    const e = this.config?.grid_options?.rows ?? this.getDefaultRows();
    this.style.setProperty("--card-grid-rows", e.toString());
  }
}
hi([
  m({ attribute: !1 })
], Te.prototype, "hass");
hi([
  m({ attribute: !1 })
], Te.prototype, "config");
hi([
  Z()
], Te.prototype, "_hourlyForecast");
hi([
  Z()
], Te.prototype, "_forecastLoading");
var Rl = Object.getOwnPropertyDescriptor, Fl = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Rl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(n) || n);
  return n;
};
I({
  loader: (r) => B[r]
});
let Dn = class extends Te {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      forecast-temperature-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(r) {
    if (!r.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(r);
  }
  static getStubConfig() {
    return { type: `custom:${it}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(wr);
  }
  static getConfigSchema() {
    return di;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (!this.hass || !this.config) return c``;
    if (this.setCardGridRows(), !ze(this.hass, this.config.entity))
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12;
    return c`
      <div class="card-content">
        <forecast-temperature-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_temperature=${!0}
          ._t=${u}
        ></forecast-temperature-chart>
      </div>
    `;
  }
};
Dn = Fl([
  H(it)
], Dn);
var Gl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, Vi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Wl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Gl(e, t, n), n;
};
I({ loader: (r) => B[r] });
let Yt = class extends N {
  setConfig(r) {
    const e = { ...r };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌡️ MeteoSwiss Temperature Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${di}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${it}`, entity: "" });
    const e = { ...this._config, ...r.detail.value };
    le(this, "config-changed", { config: e });
  }
};
Vi([
  m({ attribute: !1 })
], Yt.prototype, "hass", 2);
Vi([
  m({ attribute: !1 })
], Yt.prototype, "_config", 2);
Yt = Vi([
  H(wr)
], Yt);
var Ul = Object.getOwnPropertyDescriptor, Il = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Ul(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(n) || n);
  return n;
};
I({ loader: (r) => B[r] });
let Pn = class extends Te {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      precipitation-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(r) {
    if (!r.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(r);
  }
  static getStubConfig() {
    return { type: `custom:${nt}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(xr);
  }
  static getConfigSchema() {
    return di;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (!this.hass || !this.config) return c``;
    if (this.setCardGridRows(), !ze(this.hass, this.config.entity))
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12;
    return c`
      <div class="card-content">
        <precipitation-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_precipitation=${!0}
          ._t=${u}
        ></precipitation-chart>
      </div>
    `;
  }
};
Pn = Il([
  H(nt)
], Pn);
var Bl = Object.defineProperty, jl = Object.getOwnPropertyDescriptor, Zi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? jl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Bl(e, t, n), n;
};
I({ loader: (r) => B[r] });
let Qt = class extends N {
  setConfig(r) {
    const e = { ...r };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌧️ MeteoSwiss Precipitation Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${di}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${nt}`, entity: "" });
    const e = { ...this._config, ...r.detail.value };
    le(this, "config-changed", { config: e });
  }
};
Zi([
  m({ attribute: !1 })
], Qt.prototype, "hass", 2);
Zi([
  m({ attribute: !1 })
], Qt.prototype, "_config", 2);
Qt = Zi([
  H(xr)
], Qt);
var ql = Object.getOwnPropertyDescriptor, Vl = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? ql(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(n) || n);
  return n;
};
I({ loader: (r) => B[r] });
let Rn = class extends Te {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      sunshine-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(r) {
    if (!r.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(r);
  }
  static getStubConfig() {
    return { type: `custom:${rt}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement(vr);
  }
  static getConfigSchema() {
    return Cr;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  render() {
    if (!this.hass || !this.config) return c``;
    this.setCardGridRows();
    const r = ze(this.hass, this.config.entity);
    if (!r)
      return c`<div class="card-content">Entity not found: ${this.config.entity}</div>`;
    if (this._hourlyForecast.length === 0) return c`<div class="card-content">Loading...</div>`;
    const e = this.config.forecast_hours ?? 12, t = this.config.sun_entity ? ze(this.hass, this.config.sun_entity) : null;
    return c`
      <div class="card-content">
        <sunshine-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${e}
          .show_sunshine=${!0}
          .weatherEntity=${r}
          .sun_entity=${t}
          ._t=${u}
        ></sunshine-chart>
      </div>
    `;
  }
};
Rn = Vl([
  H(rt)
], Rn);
var Zl = Object.defineProperty, Kl = Object.getOwnPropertyDescriptor, Ki = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Kl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Zl(e, t, n), n;
};
I({ loader: (r) => B[r] });
let Xt = class extends N {
  setConfig(r) {
    const e = { ...r };
    e.entity === "" && delete e.entity, e.sun_entity === "" && delete e.sun_entity, e.sunshine_entity === "" && delete e.sunshine_entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12,
      sun_entity: typeof this._config?.sun_entity == "string" ? this._config.sun_entity : void 0,
      sunshine_entity: typeof this._config?.sunshine_entity == "string" ? this._config.sunshine_entity : void 0
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">☀️ MeteoSwiss Sunshine Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${Cr}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours",
      sun_entity: u("hourly_charts.config.sun_entity") ?? "Sun entity (sunrise/sunset markers)",
      sunshine_entity: u("hourly_charts.config.sunshine_entity") ?? "Sunshine duration sensor (optional)"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${rt}`, entity: "" });
    const e = { ...this._config, ...r.detail.value };
    le(this, "config-changed", { config: e });
  }
};
Ki([
  m({ attribute: !1 })
], Xt.prototype, "hass", 2);
Ki([
  m({ attribute: !1 })
], Xt.prototype, "_config", 2);
Xt = Ki([
  H(vr)
], Xt);
var Yl = Object.getOwnPropertyDescriptor, Ql = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Yl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(n) || n);
  return n;
};
I({ loader: (r) => B[r] });
let Fn = class extends Te {
  static get styles() {
    return T`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
        min-height: calc(var(--card-grid-rows, 3) * 64px - 8px);
        --chart-inner-border: none;
        --chart-padding: 8px 8px 4px;
        --chart-margin-top: 0;
        --chart-margin-bottom: 0;
      }
      .card-content {
        padding: 0;
        height: 100%;
        display: flex;
      }

      wind-chart {
        display: block;
        flex: 1;
        min-height: 0;
      }
    `;
  }
  setConfig(r) {
    if (!r.entity) throw new Error("You need to define an entity");
    this.setBaseConfig(r);
  }
  static getStubConfig() {
    return { type: `custom:${st}`, entity: "" };
  }
  static getConfigElement() {
    return document.createElement($r);
  }
  static getConfigSchema() {
    return kr;
  }
  getCardSize() {
    return this.config?.grid_options?.rows ?? 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.grid_options?.rows ?? 3,
      columns: this.config?.grid_options?.columns ?? 12,
      min_columns: 6,
      max_columns: 48,
      min_rows: 3,
      max_rows: 6
    };
  }
  getDefaultRows() {
    return 3;
  }
  render() {
    if (this.setCardGridRows(), !this.hass || !this.config) return c``;
    const r = this.config.forecast_hours ?? 12;
    return this._hourlyForecast.length === 0 ? c`<div class="card-content">Loading...</div>` : c`
      <div class="card-content">
        <wind-chart
          .hourlyForecast=${this._hourlyForecast}
          .forecastHours=${r}
          .show_wind=${!0}
          ._t=${u}
        ></wind-chart>
      </div>
    `;
  }
};
Fn = Ql([
  H(st)
], Fn);
var Xl = Object.defineProperty, Jl = Object.getOwnPropertyDescriptor, Yi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Jl(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Xl(e, t, n), n;
};
I({ loader: (r) => B[r] });
let Jt = class extends N {
  setConfig(r) {
    const e = { ...r };
    e.entity === "" && delete e.entity, this._config = e, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      entity: typeof this._config?.entity == "string" ? this._config.entity : void 0,
      forecast_hours: this._config?.forecast_hours ?? 12
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">💨 MeteoSwiss Wind Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${kr}
          .computeLabel=${(e) => ({
      entity: u("hourly_charts.config.entity"),
      forecast_hours: u("hourly_charts.config.forecast_hours") ?? "Forecast hours"
    })[e.name] ?? e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${st}`, entity: "" });
    const e = { ...this._config, ...r.detail.value };
    le(this, "config-changed", { config: e });
  }
};
Yi([
  m({ attribute: !1 })
], Jt.prototype, "hass", 2);
Yi([
  m({ attribute: !1 })
], Jt.prototype, "_config", 2);
Jt = Yi([
  H($r)
], Jt);
const ot = `${ye}-warning-card`, Ar = `${ot}-editor`, Sr = [
  {
    name: "primary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.primary_warning_entity"
  },
  {
    name: "secondary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.secondary_warning_entity"
  },
  {
    name: "tertiary_warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.tertiary_warning_entity"
  },
  {
    name: "warning_entity",
    required: !1,
    selector: { entity: { domain: "sensor" } },
    description: "warning.config.descr.warning_entity"
  }
];
var ec = Object.defineProperty, tc = Object.getOwnPropertyDescriptor, pi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? tc(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ec(e, t, n), n;
};
I({ loader: (r) => B[r] });
let Nt = class extends N {
  constructor() {
    super(...arguments), this._openWarnings = {}, this._toggle = (r) => {
      this._openWarnings = { ...this._openWarnings, [r]: !this._openWarnings[r] }, this.requestUpdate();
    };
  }
  static get styles() {
    return T`
      :host {
        display: block;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color, #fff);
      }

      .warning-section {
        border: 1px solid var(--warning-border-color, #ffeaa7);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 8px;
      }

      .warning-section.danger {
        background: linear-gradient(90deg, #f8d7da 0%, #f5c6cb 100%);
        border-color: var(--danger-border-color, #f1aeb5);
      }

      .warning-section.severe {
        background: linear-gradient(90deg, #ffeaa7 0%, #fdcb6e 100%);
        border-color: var(--severe-border-color, #e17055);
      }

      .no-warnings {
        opacity: 0.6;
        font-size: 14px;
        text-align: center;
        padding: 8px 0;
      }
    `;
  }
  setConfig(r) {
    this.config = r;
  }
  getCardSize() {
    return 2;
  }
  static getStubConfig() {
    return {
      type: `custom:${ot}`,
      primary_warning_entity: "",
      secondary_warning_entity: "",
      tertiary_warning_entity: ""
    };
  }
  static getConfigElement() {
    return document.createElement(Ar);
  }
  static getConfigSchema() {
    return Sr;
  }
  _getEntityState(r) {
    return this.hass?.states[r];
  }
  render() {
    if (!this.hass || !this.config) return c``;
    const r = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    r !== this._loadedLang && (this._loadedLang = r, ee(r).then(() => this.requestUpdate()));
    const e = this.config.primary_warning_entity ? this._getEntityState(this.config.primary_warning_entity) : null, t = this.config.secondary_warning_entity ? this._getEntityState(this.config.secondary_warning_entity) : null, i = this.config.tertiary_warning_entity ? this._getEntityState(this.config.tertiary_warning_entity) : null, n = this.config.warning_entity ? this._getEntityState(this.config.warning_entity) : null;
    if (e && e.attributes?.has_warning !== void 0 && !e.attributes.has_warning)
      return c`<div class="no-warnings">${u("warning.warnings_none")}</div>`;
    const s = gr(
      n,
      e,
      t,
      i,
      this._openWarnings,
      this._toggle
    );
    return s || c`<div class="no-warnings">${u("warning.warnings_none")}</div>`;
  }
};
pi([
  m({ attribute: !1 })
], Nt.prototype, "hass", 2);
pi([
  m({ attribute: !1 })
], Nt.prototype, "config", 2);
pi([
  Z()
], Nt.prototype, "_openWarnings", 2);
Nt = pi([
  H(ot)
], Nt);
var ic = Object.defineProperty, nc = Object.getOwnPropertyDescriptor, Qi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? nc(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && ic(e, t, n), n;
};
I({ loader: (r) => B[r] });
let ei = class extends N {
  setConfig(r) {
    this._config = { ...r }, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color, #007AFF);
      }
      .section-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--secondary-text-color);
        margin: 16px 0 4px;
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    if (!this.hass) return c`<div>Loading...</div>`;
    ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2));
    const r = {
      primary_warning_entity: this._config?.primary_warning_entity,
      secondary_warning_entity: this._config?.secondary_warning_entity,
      tertiary_warning_entity: this._config?.tertiary_warning_entity,
      warning_entity: this._config?.warning_entity
    };
    return c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">⚠️ MeteoSwiss Warning Card</div>
        </div>
        <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${Sr}
          .computeLabel=${(e) => ({
      primary_warning_entity: u("warning.config.primary_warning_entity"),
      secondary_warning_entity: u("warning.config.secondary_warning_entity"),
      tertiary_warning_entity: u("warning.config.tertiary_warning_entity"),
      warning_entity: u("warning.config.warning_entity")
    })[e.name] ?? e.name}
          .computeHelper=${(e) => ({
      primary_warning_entity: u("warning.config.descr.primary_warning_entity"),
      secondary_warning_entity: u("warning.config.descr.secondary_warning_entity"),
      tertiary_warning_entity: u("warning.config.descr.tertiary_warning_entity"),
      warning_entity: u("warning.config.descr.warning_entity")
    })[e.name] ?? ""}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${ot}`, entity: "" });
    const e = { ...this._config, ...r.detail.value };
    le(this, "config-changed", { config: e });
  }
};
Qi([
  m({ attribute: !1 })
], ei.prototype, "hass", 2);
Qi([
  m({ attribute: !1 })
], ei.prototype, "_config", 2);
ei = Qi([
  H(Ar)
], ei);
const at = `${ye}-pollen-card`, Mr = `${at}-editor`, Ei = ["birch", "grasses", "alder", "hazel", "beech", "ash", "oak"], Ni = ["NONE", "LOW", "MEDIUM", "STRONG", "VERY_STRONG"];
var rc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, ui = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? sc(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && rc(e, t, n), n;
};
I({ loader: (r) => B[r] });
const ki = {
  NONE: "var(--pollen-none-color, #9e9e9e)",
  LOW: "var(--pollen-low-color, #4caf50)",
  MEDIUM: "var(--pollen-medium-color, #ff9800)",
  STRONG: "var(--pollen-strong-color, #f44336)",
  VERY_STRONG: "var(--pollen-very-strong-color, #9c27b0)"
};
function oc(r) {
  const e = r.toUpperCase().replace(/ /g, "_");
  return Ni.includes(e) ? e : "NONE";
}
function ac(r) {
  return r.length === 0 ? "NONE" : r.reduce(
    (e, t) => Ni.indexOf(t) > Ni.indexOf(e) ? t : e
  );
}
let Tt = class extends N {
  constructor() {
    super(...arguments), this._expanded = !1, this._toggle = () => {
      this._expanded = !this._expanded, this.requestUpdate();
    };
  }
  static get styles() {
    return T`
      :host {
        display: block;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: 16px;
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.1));
        font-family: var(
          --primary-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          sans-serif
        );
        color: var(--primary-text-color);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
        background: none;
        border: none;
        padding: 0;
        width: 100%;
        text-align: left;
        color: inherit;
        font: inherit;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
      }

      .overall-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
      }

      .chevron {
        font-size: 18px;
        transition: transform 0.2s ease;
        color: var(--secondary-text-color);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .no-data {
        opacity: 0.6;
        font-size: 14px;
        text-align: center;
        padding: 8px 0;
      }

      .pollen-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }

      .pollen-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        border-radius: 10px;
        padding: 8px 6px 6px;
        gap: 4px;
      }

      .pollen-name {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        opacity: 0.85;
      }

      .pollen-level-dot {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }

      .pollen-level-label {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
      }

      .pollen-raw {
        font-size: 10px;
        opacity: 0.6;
        text-align: center;
      }
    `;
  }
  setConfig(r) {
    this.config = r;
  }
  getCardSize() {
    return 2;
  }
  static getStubConfig() {
    return {
      type: `custom:${at}`
      // all types enabled by default — user configures entities per type
    };
  }
  static getConfigElement() {
    return document.createElement(Mr);
  }
  static getConfigSchema() {
    return [];
  }
  _getEntityState(r) {
    if (r)
      return this.hass?.states[r];
  }
  render() {
    if (!this.hass || !this.config) return c``;
    const r = (this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2);
    r !== this._loadedLang && (this._loadedLang = r, ee(r).then(() => this.requestUpdate()));
    const e = [], t = Ei.some(
      (s) => !!this.config[`${s}_entity`]
    );
    for (const s of Ei) {
      if (this.config[`${s}_enabled`] === !1) continue;
      const l = this.config[`${s}_entity`], a = this._getEntityState(l);
      if (!a) continue;
      const h = oc(a.state), d = this._getEntityState(
        this.config[`${s}_raw_entity`]
      );
      e.push({
        type: s,
        level: h,
        raw: d ? d.state : void 0,
        unit: d?.attributes?.unit_of_measurement
      });
    }
    if (e.length === 0) {
      const s = u(t ? "pollen.no_data" : "pollen.not_configured");
      return c`<div class="no-data">${s}</div>`;
    }
    const i = ac(e.map((s) => s.level)), n = ki[i];
    return c`
      <button class="header" @click=${this._toggle} aria-expanded=${this._expanded}>
        <div class="header-left">
          <span class="title">🌿 ${u("pollen.title")}</span>
          <span class="overall-badge" style="background: ${n};">
            ${u(`pollen.levels.${i.toLowerCase()}`)}
          </span>
        </div>
        <span class="chevron ${this._expanded ? "open" : ""}">⌄</span>
      </button>

      ${this._expanded ? c`
              <div class="pollen-grid">
                ${e.map(
      ({ type: s, level: o, raw: l, unit: a }) => c`
                    <div class="pollen-item">
                      <div class="pollen-name">${u(`pollen.types.${s}`)}</div>
                      <div
                        class="pollen-level-dot"
                        style="background: ${ki[o]};"
                      ></div>
                      <div class="pollen-level-label" style="color: ${ki[o]};">
                        ${u(`pollen.levels.${o.toLowerCase()}`)}
                      </div>
                      ${l !== void 0 ? c`<div class="pollen-raw">${l}${a ? " " + a : ""}</div>` : ""}
                    </div>
                  `
    )}
              </div>
            ` : ""}
    `;
  }
};
ui([
  m({ attribute: !1 })
], Tt.prototype, "hass", 2);
ui([
  m({ attribute: !1 })
], Tt.prototype, "config", 2);
ui([
  Z()
], Tt.prototype, "_expanded", 2);
Tt = ui([
  H(at)
], Tt);
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, Xi = (r, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? cc(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && lc(e, t, n), n;
};
I({ loader: (r) => B[r] });
let ti = class extends N {
  setConfig(r) {
    this._config = { ...r }, this.requestUpdate();
  }
  static get styles() {
    return T`
      .card-config {
        padding: 16px;
      }
      .header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--card-divider-color);
      }
      .header-title {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color);
      }
      .pollen-type-block {
        margin-bottom: 12px;
        border: 1px solid var(--card-divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        overflow: hidden;
      }
      .pollen-type-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        user-select: none;
      }
      .pollen-type-toggle {
        background: none;
        border: none;
        padding: 0;
        flex: 1;
        text-align: left;
        cursor: pointer;
        color: inherit;
        font: inherit;
      }
      .pollen-type-name {
        font-size: 14px;
        font-weight: 600;
      }
      .pollen-type-fields {
        padding: 8px 14px 4px;
      }
      .field-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        margin: 8px 0 2px;
      }
      ha-form {
        display: block;
      }
    `;
  }
  render() {
    return this.hass ? (ee((this.hass.selectedLanguage || this.hass.language || "en").substring(0, 2)), c`
      <div class="card-config">
        <div class="header">
          <div class="header-title">🌿 MeteoSwiss Pollen Card</div>
        </div>
        ${Ei.map((r) => this._renderTypeBlock(r))}
      </div>
    `) : c`<div>Loading...</div>`;
  }
  _renderTypeBlock(r) {
    const e = this._config?.[`${r}_enabled`] !== !1, t = `${r}_entity`, i = `${r}_raw_entity`, n = this._config?.[t] ?? void 0, s = this._config?.[i] ?? void 0;
    return c`
      <div class="pollen-type-block">
        <div class="pollen-type-header">
          <button class="pollen-type-toggle" @click=${() => this._toggleType(r, !e)}>
            <span class="pollen-type-name">${u(`pollen.types.${r}`)}</span>
          </button>
          <ha-switch
            .checked=${e}
            @change=${(o) => this._toggleType(r, o.target.checked)}
          ></ha-switch>
        </div>
        ${e ? c`
                <div class="pollen-type-fields">
                  <div class="field-label">${u("pollen.config.level_sensor")}</div>
                  <ha-form
                    .hass=${this.hass}
                    .data=${{ [t]: n }}
                    .schema=${[
      {
        name: t,
        required: !1,
        selector: { entity: { domain: "sensor" } }
      }
    ]}
                    .computeLabel=${() => u("pollen.config.level_sensor")}
                    .computeHelper=${() => u("pollen.config.level_sensor_hint")}
                    @value-changed=${this._valueChanged}
                  ></ha-form>
                  <div class="field-label">${u("pollen.config.raw_sensor")}</div>
                  <ha-form
                    .hass=${this.hass}
                    .data=${{ [i]: s }}
                    .schema=${[
      { name: i, required: !1, selector: { entity: { domain: "sensor" } } }
    ]}
                    .computeLabel=${() => u("pollen.config.raw_sensor")}
                    .computeHelper=${() => u("pollen.config.raw_sensor_hint")}
                    @value-changed=${this._valueChanged}
                  ></ha-form>
                </div>
              ` : ""}
      </div>
    `;
  }
  _toggleType(r, e) {
    const t = { ...this._config, [`${r}_enabled`]: e };
    this._config = t, le(this, "config-changed", { config: t }), this.requestUpdate();
  }
  _valueChanged(r) {
    this._config || (this._config = { type: `custom:${at}` });
    const e = { ...this._config, ...r.detail.value };
    this._config = e, le(this, "config-changed", { config: e });
  }
};
Xi([
  m({ attribute: !1 })
], ti.prototype, "hass", 2);
Xi([
  m({ attribute: !1 })
], ti.prototype, "_config", 2);
ti = Xi([
  H(Mr)
], ti);
const Ve = (r) => (e, t) => t.split(".")[0] !== "weather" ? null : { config: { type: `custom:${r}`, entity: t } };
_e({
  type: ve,
  name: "MeteoSwiss Diagram Card",
  description: "A comprehensive weather card for Home Assistant with Swiss weather warnings and forecasts",
  getEntitySuggestion: Ve(ve)
});
_e({
  type: $e,
  name: "MeteoSwiss Daily Forecast Diagram Card",
  description: "A card to show daily weather forecast as diagram",
  getEntitySuggestion: Ve($e)
});
_e({
  type: ke,
  name: "MeteoSwiss Animated Background Card",
  description: "Animated weather background card with current conditions",
  getEntitySuggestion: Ve(ke)
});
_e({
  type: it,
  name: "MeteoSwiss Temperature Chart Card",
  description: "Hourly temperature forecast chart as standalone card",
  getEntitySuggestion: Ve(it)
});
_e({
  type: nt,
  name: "MeteoSwiss Precipitation Chart Card",
  description: "Hourly precipitation forecast chart as standalone card",
  getEntitySuggestion: Ve(nt)
});
_e({
  type: rt,
  name: "MeteoSwiss Sunshine Chart Card",
  description: "Hourly sunshine duration chart as standalone card",
  getEntitySuggestion: Ve(rt)
});
_e({
  type: st,
  name: "MeteoSwiss Wind Chart Card",
  description: "Hourly wind speed & direction chart as standalone card",
  getEntitySuggestion: Ve(st)
});
_e({
  type: ot,
  name: "MeteoSwiss Warning Card",
  description: "Standalone weather warning card supporting ranked and legacy warning models",
  getEntitySuggestion: (r, e) => {
    if (e.split(".")[0] !== "sensor") return null;
    const t = e.toLowerCase();
    if (!t.includes("warning")) return null;
    let i;
    return t.includes("primary") ? i = "primary_warning_entity" : t.includes("secondary") ? i = "secondary_warning_entity" : t.includes("tertiary") ? i = "tertiary_warning_entity" : i = "warning_entity", { config: { type: `custom:${ot}`, [i]: e } };
  }
});
_e({
  type: at,
  name: "MeteoSwiss Pollen Card",
  description: "Displays current pollen levels for up to 7 pollen types from MeteoSwiss integration",
  getEntitySuggestion: (r, e) => {
    if (e.split(".")[0] !== "sensor") return null;
    const t = e.toLowerCase();
    if (!t.includes("pollen")) return null;
    const n = ["birch", "grasses", "alder", "hazel", "beech", "ash", "oak"].find((s) => t.includes(s));
    return n ? { config: { type: `custom:${at}`, [`${n}_entity`]: e } } : null;
  }
});
console.info(
  `%c MeteoSwiss Weather Card %c v${Dr} `,
  "background: #0093DD; color: white; font-weight: bold;",
  "background: transparent; color: #0093DD;"
);
export {
  Q as DailyForecastChart,
  Me as DailyForecastDiagram,
  Be as ForecastDiagramCard,
  Lt as ForecastDiagramCardEditor,
  Ce as ForecastTemperatureChart,
  Le as MeteoSwissBGCard,
  Et as MeteoSwissBGCardEditor,
  me as MeteoSwissCard,
  Mt as MeteoSwissCardEditor,
  Tt as PollenCard,
  ti as PollenCardEditor,
  Pn as PrecipitationCard,
  Qt as PrecipitationCardEditor,
  Ae as PrecipitationChart,
  Rn as SunshineCard,
  Xt as SunshineCardEditor,
  de as SunshineChart,
  Dn as TemperatureCard,
  Yt as TemperatureCardEditor,
  Nt as WarningCard,
  ei as WarningCardEditor,
  Fn as WindCard,
  Jt as WindCardEditor,
  Se as WindChart
};
//# sourceMappingURL=meteoswiss-weather-card.js.map
