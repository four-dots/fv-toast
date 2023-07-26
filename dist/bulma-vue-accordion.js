import { provide as I, onMounted as j, onBeforeUnmount as A, openBlock as a, createElementBlock as d, renderSlot as C, ref as x, inject as N, watch as T, normalizeClass as b, createElementVNode as u, Fragment as k, createCommentVNode as p, createBlock as w, resolveDynamicComponent as O, createVNode as V, Transition as D, withCtx as L, withDirectives as z, vShow as F, nextTick as y } from "vue";
import M from "mitt";
import { nanoid as U } from "nanoid";
const g = M(), E = (t, s) => {
  const e = t.__vccOpts || t;
  for (const [o, c] of s)
    e[o] = c;
  return e;
}, q = {
  name: "bv-accordions",
  props: {
    single: {
      default: !0,
      type: Boolean
    }
  },
  setup(t, { slots: s }) {
    const e = [], o = s.default()[0].children.length, c = (i) => {
      let l = e.reduce((f, v) => v.id === i ? f : (v.state = !1, [v.id, ...f]), []);
      g.emit("accordion.close", l);
    }, h = ({ accordionId: i, state: l }) => {
      !t.single || !l || e.find((f) => f.id === i) && c(i);
    }, r = () => {
      if (!t.single)
        return;
      let i = null;
      for (const l of e)
        if (i || (i = l.state ? l.id : null), i)
          break;
      i && c(i);
    };
    I("registerChild", (i) => {
      e.push(i), e.length === o && r();
    }), j(() => g.on("accordion.toggle", h)), A(() => g.off("accordion.toggle"));
  }
}, G = { class: "bv-accordions" };
function H(t, s, e, o, c, h) {
  return a(), d("section", G, [
    C(t.$slots, "default")
  ]);
}
const J = /* @__PURE__ */ E(q, [["render", H]]), S = {
  data: {
    baseIconClass: "fas",
    openClass: "fa-minus",
    closedClass: "fa-plus",
    openComponent: null,
    closedComponent: null
  },
  getOptions() {
    return this.data;
  },
  setOptions(t) {
    for (const s in t)
      Object.hasOwn(this.data, s) && (this.data[s] = t[s]);
  },
  setOption(t, s) {
    Object.hasOwn(this.data, t) && (this.data[t] = s);
  }
}, K = {
  name: "bv-accordion",
  props: {
    togglable: {
      type: Boolean,
      default: !0
    },
    open: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["toggle"],
  setup(t, { emit: s }) {
    const e = x(t.open), o = U(), c = N("registerChild", null), h = async () => {
      t.togglable && (await y(), e.value = !e.value, s("toggle", e.value), g.emit("accordion.toggle", { accordionId: o, state: e.value }));
    }, r = async (n) => {
      await y(), e.value = n, s("toggle", e.value), g.emit("accordion.toggle", { accordionId: o, state: e.value });
    }, m = async (n) => {
      const _ = getComputedStyle(n).width;
      n.style.width = _, n.style.position = "absolute", n.style.visibility = "hidden", n.style.height = "auto";
      const B = getComputedStyle(n).height;
      n.style.width = null, n.style.position = null, n.style.visibility = null, n.style.height = 0, getComputedStyle(n).height, await y(), n.style.height = B;
    }, i = (n) => {
      n.style.height = "auto";
    }, l = async (n) => {
      const _ = getComputedStyle(n).height;
      n.style.height = _, getComputedStyle(n).height, await y(), n.style.height = 0;
    }, f = (n) => {
      !e.value || !t.togglable || !n.includes(o) || (e.value = !1);
    };
    g.on("accordion.close", f), c && c({ id: o, state: e.value }), A(() => g.off("accordion.close")), T(
      () => t.open,
      (n) => {
        n !== e.value && h();
      }
    );
    const v = S.getOptions();
    return { accordionId: o, state: e, toggle: h, trigger: r, enter: m, afterEnter: i, leave: l, options: v };
  }
}, P = ["data-accordion-id"], Q = { class: "bv-accordion__header" }, R = {
  key: 0,
  class: "icon"
}, W = {
  key: 0,
  class: "icon"
}, X = { class: "bv-accordion__actions" }, Y = { class: "bv-accordion__content content" };
function Z(t, s, e, o, c, h) {
  return a(), d("section", {
    class: b(["bv-accordion", { "bv-accordion--without-toggle": !e.togglable, "is-open": o.state }]),
    "data-accordion-id": o.accordionId
  }, [
    u("header", Q, [
      e.togglable ? (a(), d("div", {
        key: 0,
        class: "bv-accordion__toggle",
        onClick: s[0] || (s[0] = (...r) => o.toggle && o.toggle(...r))
      }, [
        o.state ? (a(), d(k, { key: 0 }, [
          o.options.baseIconClass ? (a(), d("span", R, [
            u("i", {
              class: b([o.options.baseIconClass, o.options.openClass])
            }, null, 2)
          ])) : p("", !0),
          o.options.openComponent ? (a(), w(O(o.options.openComponent), { key: 1 })) : p("", !0)
        ], 64)) : (a(), d(k, { key: 1 }, [
          o.options.baseIconClass ? (a(), d("span", W, [
            u("i", {
              class: b([o.options.baseIconClass, o.options.closedClass])
            }, null, 2)
          ])) : p("", !0),
          o.options.closedComponent ? (a(), w(O(o.options.closedComponent), { key: 1 })) : p("", !0)
        ], 64))
      ])) : p("", !0),
      u("div", {
        class: "bv-accordion__title",
        onClick: s[1] || (s[1] = (...r) => o.toggle && o.toggle(...r))
      }, [
        C(t.$slots, "title")
      ]),
      u("div", X, [
        C(t.$slots, "actions")
      ])
    ]),
    V(D, {
      name: "bv-accordion-toggle",
      onEnter: o.enter,
      onAfterEnter: o.afterEnter,
      onLeave: o.leave
    }, {
      default: L(() => [
        z(u("article", Y, [
          C(t.$slots, "content", { state: o.state })
        ], 512), [
          [F, o.state]
        ])
      ]),
      _: 3
    }, 8, ["onEnter", "onAfterEnter", "onLeave"])
  ], 10, P);
}
const $ = /* @__PURE__ */ E(K, [["render", Z]]);
const no = (t, s) => {
  S.setOptions(s), t.component("Accordion", $), t.component("Accordions", J);
};
export {
  no as default
};
//# sourceMappingURL=bulma-vue-accordion.js.map
