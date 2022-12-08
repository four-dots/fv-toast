import { ref as m, onMounted as f, onBeforeUnmount as g, openBlock as v, createBlock as p, Transition as _, withCtx as h, withDirectives as y, createElementVNode as u, normalizeClass as T, vShow as S, createApp as C } from "vue";
import { marked as k } from "marked";
import b from "mitt";
import { nanoid as w } from "nanoid";
class M {
  constructor(o, t) {
    this.startedAt = Date.now(), this.callback = o, this.delay = t, this.timer = setTimeout(o, t);
  }
  pause() {
    this.stop(), this.delay -= Date.now() - this.startedAt;
  }
  resume() {
    this.stop(), this.startedAt = Date.now(), this.timer = setTimeout(this.callback, this.delay);
  }
  stop() {
    clearTimeout(this.timer);
  }
}
const r = b(), x = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [s, n] of o)
    t[s] = n;
  return t;
}, A = {
  name: "fv-toast",
  props: {
    toastId: {
      type: String,
      required: !0
    },
    message: {
      type: String,
      required: !0
    },
    toastState: {
      type: String,
      default: "fv-toast__message--success"
    },
    position: {
      type: String,
      default: "right",
      validator: (e) => ["right", "left"].includes(e)
    },
    duration: {
      type: Number,
      default: 3e3
    },
    dismissible: {
      type: Boolean,
      default: !0
    },
    onClose: {
      type: Function,
      default: () => {
      }
    },
    onClick: {
      type: Function,
      default: () => {
      }
    },
    pauseOnHover: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    const o = m(!1), t = e.message && k(e.message);
    let s = null;
    const n = () => {
      s.stop(), o.value = !1, e.onClose.apply(null, arguments), setTimeout(() => r.emit("toast.delete", e.toastId), 150);
    }, i = () => {
      o.value = !0, s = new M(n, e.duration);
    }, a = () => {
      !e.dismissible || (e.onClick.apply(null, arguments), n());
    }, l = (d) => {
      !e.pauseOnHover || (d ? s.pause() : s.resume());
    };
    return r.on("toast.clear", n), f(i), g(() => r.off("toast.clear", n)), { visible: o, parsedMessage: t, triggerClick: a, toggleTimer: l };
  }
}, B = ["innerHTML"];
function D(e, o, t, s, n, i) {
  return v(), p(_, {
    "enter-active-class": "fv-toast--fade-in-up",
    "leave-active-class": "fv-toast--fade-out"
  }, {
    default: h(() => [
      y(u("div", {
        role: "alert",
        class: T(["fv-toast__message", [t.toastState, `fv-toast__message--${t.position}`]]),
        onMouseover: o[0] || (o[0] = (a) => s.toggleTimer(!0)),
        onMouseleave: o[1] || (o[1] = (a) => s.toggleTimer(!1)),
        onClick: o[2] || (o[2] = (...a) => s.triggerClick && s.triggerClick(...a))
      }, [
        u("p", {
          class: "fv-toast__text",
          innerHTML: s.parsedMessage
        }, null, 8, B)
      ], 34), [
        [S, s.visible]
      ])
    ]),
    _: 1
  });
}
const H = /* @__PURE__ */ x(A, [["render", D]]), c = /* @__PURE__ */ new Map(), E = (e) => {
  var t;
  const o = c.get(e);
  !o || (o.unmount(), c.delete(e), (t = document.querySelector(`[data-toast-id="${e}"]`)) == null || t.remove());
}, O = (e, o = { toastState: "fv-toast__message--success" }) => (r.on("toast.delete", E), {
  open(t) {
    const s = w(), n = typeof t == "string" ? t : null;
    t = typeof t == "string" ? {} : t;
    const i = { message: n, toastId: s, ...o, ...t }, a = document.createElement("div");
    a.setAttribute("data-toast-id", s), a.classList.add("fv-toast");
    const l = C(H, i);
    l.mount(a), document.getElementById("fv-toasts").appendChild(a), c.set(s, l);
  },
  clear() {
    r.emit("toast.clear");
  },
  error(t, s = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--danger", ...s });
  },
  info(t, s = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--info", ...s });
  },
  warning(t, s = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--warning", ...s });
  }
});
const I = (e, o = {}) => {
  const t = document.createElement("div");
  t.id = "fv-toasts", t.className = "fv-toasts", document.body.appendChild(t), e.config.globalProperties.$toast = O(e, o), e.provide("toast", e.config.globalProperties.$toast);
};
export {
  I as default
};
//# sourceMappingURL=fv-toast.mjs.map
