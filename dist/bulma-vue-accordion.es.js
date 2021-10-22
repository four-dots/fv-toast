import { provide, onMounted, onBeforeUnmount, openBlock, createElementBlock, renderSlot, ref, inject, watch, normalizeClass, createElementVNode, Fragment, createTextVNode, toDisplayString, createCommentVNode, createVNode, Transition, withCtx, withDirectives, vShow, nextTick } from "vue";
import mitt from "mitt";
import { nanoid } from "nanoid";
const emitter = mitt();
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {
  name: "bv-accordions",
  props: {
    single: {
      default: true,
      type: Boolean
    }
  },
  setup(props, { slots }) {
    const children = [];
    const registeredAccordions = slots.default()[0].children.length;
    const dispatchCloseEvent = (accordionId) => {
      let accordionsToClose = children.reduce((carry, child) => {
        if (child.id === accordionId)
          return carry;
        child.state = false;
        return [child.id, ...carry];
      }, []);
      emitter.emit("accordion.close", accordionsToClose);
    };
    const closeAccordions = ({ accordionId, state }) => {
      if (!props.single || !state)
        return;
      if (!children.find((child) => child.id === accordionId))
        return;
      dispatchCloseEvent(accordionId);
    };
    const closeOtherAccordions = () => {
      if (!props.single)
        return;
      let openAccordion = null;
      for (const child of children) {
        openAccordion || (openAccordion = child.state ? child.id : null);
        if (openAccordion)
          break;
      }
      if (!openAccordion)
        return;
      dispatchCloseEvent(openAccordion);
    };
    const registerChild = (child) => {
      children.push(child);
      if (children.length !== registeredAccordions)
        return;
      closeOtherAccordions();
    };
    provide("registerChild", registerChild);
    onMounted(() => {
      emitter.on("accordion.toggle", closeAccordions);
    });
    onBeforeUnmount(() => {
      emitter.off("accordion.toggle");
    });
  }
};
const _hoisted_1$1 = { class: "bv-accordions" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var Accordions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "bv-accordion",
  props: {
    usesFontAwesome: {
      type: Boolean,
      default: true
    },
    togglable: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const state = ref(props.open);
    const accordionId = nanoid();
    const registerChild = inject("registerChild", null);
    const toggle = async (newState) => {
      if (!props.togglable)
        return;
      await nextTick();
      state.value = newState !== void 0 ? newState : !state.value;
      emit("toggle", state.value);
      emitter.emit("accordion.toggle", { accordionId, state: state.value });
    };
    const enter = async (element) => {
      const width = getComputedStyle(element).width;
      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = "auto";
      const height = getComputedStyle(element).height;
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;
      getComputedStyle(element).height;
      await nextTick();
      element.style.height = height;
    };
    const afterEnter = (element) => {
      element.style.height = "auto";
    };
    const leave = async (element) => {
      const height = getComputedStyle(element).height;
      element.style.height = height;
      getComputedStyle(element).height;
      await nextTick();
      element.style.height = 0;
    };
    const close = (accordionsToClose) => {
      if (!state.value || !props.togglable || !accordionsToClose.includes(accordionId))
        return;
      state.value = false;
    };
    emitter.on("accordion.close", close);
    if (registerChild) {
      registerChild({ id: accordionId, state: state.value });
    }
    onBeforeUnmount(() => emitter.off("accordion.close"));
    watch(() => props.open, (value) => {
      if (value === state.value)
        return;
      toggle();
    });
    return { accordionId, state, toggle, enter, afterEnter, leave };
  }
};
const _hoisted_1 = ["data-accordion-id"];
const _hoisted_2 = { class: "bv-accordion__header" };
const _hoisted_3 = {
  key: 0,
  class: "icon"
};
const _hoisted_4 = { class: "bv-accordion__actions" };
const _hoisted_5 = { class: "bv-accordion__content content" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["bv-accordion", { "bv-accordion--without-toggle": !$props.togglable, "is-open": $setup.state }]),
    "data-accordion-id": $setup.accordionId
  }, [
    createElementVNode("header", _hoisted_2, [
      $props.togglable ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "bv-accordion__toggle",
        onClick: _cache[0] || (_cache[0] = (...args) => $setup.toggle && $setup.toggle(...args))
      }, [
        $props.usesFontAwesome ? (openBlock(), createElementBlock("span", _hoisted_3, [
          createElementVNode("i", {
            class: normalizeClass(["fas fal", [$setup.state ? "fa-minus" : "fa-plus"]])
          }, null, 2)
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createTextVNode(toDisplayString($setup.state ? "-" : "+"), 1)
        ], 64))
      ])) : createCommentVNode("", true),
      createElementVNode("div", {
        class: "bv-accordion__title",
        onClick: _cache[1] || (_cache[1] = (...args) => $setup.toggle && $setup.toggle(...args))
      }, [
        renderSlot(_ctx.$slots, "title")
      ]),
      createElementVNode("div", _hoisted_4, [
        renderSlot(_ctx.$slots, "actions")
      ])
    ]),
    createVNode(Transition, {
      name: "bv-accordion-toggle",
      onEnter: $setup.enter,
      onAfterEnter: $setup.afterEnter,
      onLeave: $setup.leave
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("article", _hoisted_5, [
          renderSlot(_ctx.$slots, "content", { state: $setup.state })
        ], 512), [
          [vShow, $setup.state]
        ])
      ]),
      _: 3
    }, 8, ["onEnter", "onAfterEnter", "onLeave"])
  ], 10, _hoisted_1);
}
var Accordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var style = "";
var index = (app) => {
  app.component("Accordion", Accordion);
  app.component("Accordions", Accordions);
};
export { index as default };
//# sourceMappingURL=bulma-vue-accordion.es.js.map
