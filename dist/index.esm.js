import nanoid from 'nanoid';

//
//
//
//

var script = {
    props: {
        single: {
            default: true,
            type: Boolean,
        },
    },
    mounted() {
        if (!this.single) {
            return;
        }

        let isAnyOpen = false;
        for (const child of this.$children) {
            if (!isAnyOpen && child.state === true) {
                isAnyOpen = true;
                continue;
            }
            if (!isAnyOpen) continue;
            child.toggleFromOutside(false);
        }

        const observer = new MutationObserver(mutations => {
            this.toggleAccordions(mutations[0]);
        });

        this.$nextTick(() => {
            observer.observe(this.$el, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['data-state'],
                subtree: true,
            });
        });
    },
    methods: {
        toggleAccordions(mutation) {
            let accordionData = mutation.target.dataset;
            if (accordionData.state !== 'true') return;
            for (const child of this.$children) {
                if (child.id === accordionData.id) continue;
                child.toggleFromOutside(false);
            }
        },
        closeAllAccordions() {
            for (const child of this.$children) {
                child.toggleFromOutside(false);
            }
        },
    },
};

function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof isShadowMode === 'function') {
        createInjectorSSR = createInjector;
        createInjector = isShadowMode;
        isShadowMode = false;
    }
    // Vue.extend constructor export interop
    const options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
    // render functions
    if (compiledTemplate && compiledTemplate.render) {
        options.render = compiledTemplate.render;
        options.staticRenderFns = compiledTemplate.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyle) {
                injectStyle.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (injectStyle) {
        hook = isShadowMode
            ? function () {
                injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
            }
            : function (context) {
                injectStyle.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return defaultExport;
}

/* script */
const __vue_script__ = script;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script.__file = "G:\\Code\\bulma-vue-accordion\\src\\components\\Accordions.vue";

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("section", { staticClass: "bv-accordions" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Accordions = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//

var script$1 = {
    props: {
        usesFontAwesome: {
            type: Boolean,
            default: true,
        },
        togglable: {
            type: Boolean,
            default: true,
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            state: this.open,
            readyState: this.open,
            id: nanoid(),
        };
    },
    methods: {
        toggle() {
            if (!this.togglable) return;
            this.$nextTick(() => {
                this.state = !this.state;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
            });
        },
        toggleFromOutside(value) {
            this.$nextTick(() => {
                this.state = value;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
            });
        },
        enter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;
            this.$nextTick(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;
            element.style.height = height;

            getComputedStyle(element).height;
            this.$nextTick(() => {
                element.style.height = 0;
            });
        },
        afterLeave() {
            this.readyState = this.state;
        },
    },
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
const HEAD = document.head || document.getElementsByTagName('head')[0];
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
// For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
script$1.__file = "G:\\Code\\bulma-vue-accordion\\src\\components\\Accordion.vue";

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "section",
    {
      staticClass: "bv-accordion",
      class: {
        "bv-accordion--without-toggle": !_vm.togglable,
        "is-open": _vm.state
      },
      attrs: { "data-id": _vm.id, "data-state": _vm.readyState }
    },
    [
      _c("header", { staticClass: "bv-accordion__header" }, [
        _vm.togglable
          ? _c(
              "div",
              {
                staticClass: "bv-accordion__toggle",
                on: { click: _vm.toggle }
              },
              [
                _vm.usesFontAwesome
                  ? [
                      _c("span", { staticClass: "icon" }, [
                        _c("i", {
                          staticClass: "fas fal",
                          class: [_vm.state ? "fa-minus" : "fa-plus"]
                        })
                      ])
                    ]
                  : [_vm._v(_vm._s(_vm.state ? "-" : "+"))]
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "bv-accordion__title", on: { click: _vm.toggle } },
          [_vm._t("title")],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "bv-accordion__actions" },
          [_vm._t("actions")],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { name: "bv-accordion-toggle" },
          on: {
            enter: _vm.enter,
            "after-enter": _vm.afterEnter,
            "after-leave": _vm.afterLeave,
            leave: _vm.leave
          }
        },
        [
          _c(
            "article",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.state,
                  expression: "state"
                }
              ],
              staticClass: "bv-accordion__content content"
            },
            [_vm._t("content", null, { state: _vm.state })],
            2
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-19ce2ba2_0", { source: ".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0;\n}\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem;\n}\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0;\n}\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n    cursor: pointer;\n}\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1;\n}\n.bv-accordion__title .title {\n    margin: 0;\n    line-height: 1;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n    cursor: pointer;\n}\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden;\n}\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden;\n}\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n}\n\n/*# sourceMappingURL=Accordion.vue.map */", map: {"version":3,"sources":["G:\\Code\\bulma-vue-accordion/G:\\Code\\bulma-vue-accordion/G:\\Code\\bulma-vue-accordion\\src\\components\\Accordion.vue","Accordion.vue"],"names":[],"mappings":"AAqHA;EACA,gBAAA;AAAA;AAGA;EACA,qBAAA;AAAA;AAGA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;AAAA;AAEA;EACA,YAAA;EACA,cAAA;EACA,qBAAA;EACA,kBAAA;AAAA;AAEA;IACA,eAAA;AAAA;AAGA;EACA,YAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;AAAA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,cAAA;AAAA;AAHA;IAMA,SAAA;IACA,cAAA;AAAA;AAGA;IACA,eAAA;AAAA;AAGA;EACA,qBAAA;EACA,mBAAA;EAEA,2BAAA;AAAA;AAGA;;EAEA,gBAAA;AAAA;AAGA;EACA,qDAAA;EACA,gBAAA;AAAA;AAGA;EACA,gDAAA;EACA,gBAAA;AAAA;AAGA;;EAEA,SAAA;EACA,2BAAA;EACA,wBAAA;AAAA;;AChIA,wCAAwC","file":"Accordion.vue","sourcesContent":[null,".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0; }\n\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem; }\n\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0; }\n\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem; }\n  .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n    cursor: pointer; }\n\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end; }\n\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1; }\n  .bv-accordion__title .title {\n    margin: 0;\n    line-height: 1; }\n  .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n    cursor: pointer; }\n\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden; }\n\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden; }\n\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden; }\n\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden; }\n\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important; }\n\n/*# sourceMappingURL=Accordion.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var Accordion = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    createInjector,
    undefined
  );

function plugin(Vue) {
    Vue.component('Accordions', Accordions);
    Vue.component('Accordion', Accordion);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
const version = '__VERSION__';

export default plugin;
export { Accordions, Accordion, version };
