import { ref as g, onMounted as v, onBeforeUnmount as h, createBlock as y, openBlock as _, Transition as S, withCtx as T, withDirectives as w, createElementVNode as f, normalizeClass as C, unref as b, vShow as k, createApp as M } from "vue";
import { marked as A } from "marked";
import B from "mitt";
import { nanoid as $ } from "nanoid";
class x {
  constructor(e, t) {
    this.startedAt = Date.now(), this.callback = e, this.delay = t, this.timer = setTimeout(e, t);
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
const i = B(), D = ["innerHTML"], H = {
  __name: "Toast",
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
      validator: (s) => ["right", "left"].includes(s)
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
  setup(s) {
    const e = s, t = g(!1), o = e.message && A(e.message);
    let a = null;
    const n = () => {
      a?.stop(), t.value = !1, e.onClose.apply(null, arguments), setTimeout(() => i.emit("toast.delete", e.toastId), 150);
    }, r = () => {
      t.value = !0, a = new x(n, e.duration);
    }, l = () => {
      e.dismissible && (e.onClick.apply(null, arguments), n());
    }, d = (m) => {
      !e.pauseOnHover || a === null || (m ? a.pause() : a.resume());
    };
    return i.on("toast.clear", n), v(r), h(() => i.off("toast.clear", n)), (m, u) => (_(), y(S, {
      "enter-active-class": "fv-toast--fade-in-up",
      "leave-active-class": "fv-toast--fade-out"
    }, {
      default: T(() => [
        w(f("div", {
          role: "alert",
          class: C(["fv-toast__message", [s.toastState, `fv-toast__message--${s.position}`]]),
          onMouseover: u[0] || (u[0] = (p) => d(!0)),
          onMouseleave: u[1] || (u[1] = (p) => d(!1)),
          onClick: l
        }, [
          f("p", {
            class: "fv-toast__text",
            innerHTML: b(o)
          }, null, 8, D)
        ], 34), [
          [k, t.value]
        ])
      ]),
      _: 1
    }));
  }
}, c = /* @__PURE__ */ new Map(), E = (s) => {
  const e = c.get(s);
  e && (e.unmount(), c.delete(s), document.querySelector(`[data-toast-id="${s}"]`)?.remove());
}, q = (s, e = { toastState: "fv-toast__message--success" }) => (i.on("toast.delete", E), {
  open(t) {
    const o = $(), a = typeof t == "string" ? t : null;
    t = typeof t == "string" ? {} : t;
    const n = { message: a, toastId: o, ...e, ...t }, r = document.createElement("div");
    r.setAttribute("data-toast-id", o), r.classList.add("fv-toast");
    const l = M(H, n);
    l.mount(r), document.getElementById("fv-toasts").appendChild(r), c.set(o, l);
  },
  clear() {
    i.emit("toast.clear");
  },
  error(t, o = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--danger", ...o });
  },
  info(t, o = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--info", ...o });
  },
  warning(t, o = {}) {
    return this.open({ message: t, toastState: "fv-toast__message--warning", ...o });
  }
}), I = (s, e = {}) => {
  const t = document.createElement("div");
  t.id = "fv-toasts", t.className = "fv-toasts", document.body.appendChild(t), s.config.globalProperties.$toast = q(s, e), s.provide("toast", s.config.globalProperties.$toast);
};
export {
  I as default
};
//# sourceMappingURL=fv-toast.js.map
