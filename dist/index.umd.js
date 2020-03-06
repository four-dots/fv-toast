(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('nanoid')) :
    typeof define === 'function' && define.amd ? define(['exports', 'nanoid'], factory) :
    (global = global || self, factory(global.BulmaVueAccordion = {}, global.nanoid));
}(this, function (exports, nanoid) { 'use strict';

    nanoid = nanoid && nanoid.hasOwnProperty('default') ? nanoid['default'] : nanoid;

    //
    //
    //
    //
    var script = {
      props: {
        single: {
          default: true,
          type: Boolean
        }
      },
      data: () => ({
        observer: null
      }),

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

        this.observer = new MutationObserver(mutations => {
          this.toggleAccordions(mutations[0]);
        });
        this.$nextTick(() => {
          this.observer.observe(this.$el, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: ['data-state'],
            subtree: true
          });
        });
      },

      beforeDestroy() {
        this.observer.disconnect();
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
        }

      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
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
                if (style) {
                    style.call(this, createInjectorSSR(context));
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
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
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
        return script;
    }

    /* script */
    const __vue_script__ = script;

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
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    var script$1 = {
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

      data() {
        return {
          state: this.open,
          readyState: this.open,
          id: nanoid()
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
        }

      }
    };

    const isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return (id, style) => addStyle(id, style);
    }
    let HEAD;
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
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
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
        inject("data-v-48bb8fe4_0", { source: ".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0;\n}\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem;\n}\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0;\n}\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n  cursor: pointer;\n}\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1;\n}\n.bv-accordion__title .title {\n  margin: 0;\n  line-height: 1;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n  cursor: pointer;\n}\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden;\n}\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden;\n}\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n}\n\n/*# sourceMappingURL=Accordion.vue.map */", map: {"version":3,"sources":["E:\\Code\\bulma-vue-accordion\\src\\components\\Accordion.vue","Accordion.vue"],"names":[],"mappings":"AAqHA;EACA,gBAAA;ACpHA;ADuHA;EACA,qBAAA;ACrHA;ADwHA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;ACrHA;ADuHA;EACA,YAAA;EACA,cAAA;EACA,qBAAA;EACA,kBAAA;ACpHA;ADsHA;EACA,eAAA;ACpHA;ADuHA;EACA,YAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;ACpHA;ADsHA;EACA,gBAAA;EACA,YAAA;EACA,cAAA;ACnHA;ADqHA;EACA,SAAA;EACA,cAAA;ACnHA;ADsHA;EACA,eAAA;ACpHA;ADuHA;EACA,qBAAA;EACA,mBAAA;EAEA,2BAAA;ACrHA;ADwHA;;EAEA,gBAAA;ACrHA;ADwHA;EACA,qDAAA;EACA,gBAAA;ACrHA;ADwHA;EACA,gDAAA;EACA,gBAAA;ACrHA;ADwHA;;EAEA,SAAA;EACA,2BAAA;EACA,wBAAA;ACrHA;;AAEA,wCAAwC","file":"Accordion.vue","sourcesContent":["<template>\n    <section\n        class=\"bv-accordion\"\n        :class=\"{'bv-accordion--without-toggle': !togglable, 'is-open': state}\"\n        :data-id=\"id\"\n        :data-state=\"readyState\"\n    >\n        <header class=\"bv-accordion__header\">\n            <div v-if=\"togglable\" class=\"bv-accordion__toggle\" @click=\"toggle\">\n                <template v-if=\"usesFontAwesome\">\n                    <span class=\"icon\"><i class=\"fas fal\" :class=\"[state ? 'fa-minus' : 'fa-plus']\"></i></span>\n                </template>\n                <template v-else>{{ state ? '-' : '+' }}</template>\n            </div>\n            <div class=\"bv-accordion__title\" @click=\"toggle\"><slot name=\"title\"></slot></div>\n            <div class=\"bv-accordion__actions\"><slot name=\"actions\"></slot></div>\n        </header>\n        <transition\n            name=\"bv-accordion-toggle\"\n            @enter=\"enter\"\n            @after-enter=\"afterEnter\"\n            @after-leave=\"afterLeave\"\n            @leave=\"leave\"\n        >\n            <article v-show=\"state\" class=\"bv-accordion__content content\">\n                <slot name=\"content\" v-bind:state=\"state\"></slot>\n            </article>\n        </transition>\n    </section>\n</template>\n\n<script>\nimport nanoid from 'nanoid';\n\nexport default {\n    props: {\n        usesFontAwesome: {\n            type: Boolean,\n            default: true,\n        },\n        togglable: {\n            type: Boolean,\n            default: true,\n        },\n        open: {\n            type: Boolean,\n            default: false,\n        },\n    },\n    data() {\n        return {\n            state: this.open,\n            readyState: this.open,\n            id: nanoid(),\n        };\n    },\n    methods: {\n        toggle() {\n            if (!this.togglable) return;\n            this.$nextTick(() => {\n                this.state = !this.state;\n                if (this.state === true) {\n                    this.readyState = true;\n                }\n                this.$emit('toggle', this.state);\n            });\n        },\n        toggleFromOutside(value) {\n            this.$nextTick(() => {\n                this.state = value;\n                if (this.state === true) {\n                    this.readyState = true;\n                }\n                this.$emit('toggle', this.state);\n            });\n        },\n        enter(element) {\n            const width = getComputedStyle(element).width;\n\n            element.style.width = width;\n            element.style.position = 'absolute';\n            element.style.visibility = 'hidden';\n            element.style.height = 'auto';\n\n            const height = getComputedStyle(element).height;\n\n            element.style.width = null;\n            element.style.position = null;\n            element.style.visibility = null;\n            element.style.height = 0;\n\n            getComputedStyle(element).height;\n            this.$nextTick(() => {\n                element.style.height = height;\n            });\n        },\n        afterEnter(element) {\n            element.style.height = 'auto';\n        },\n        leave(element) {\n            const height = getComputedStyle(element).height;\n            element.style.height = height;\n\n            getComputedStyle(element).height;\n            this.$nextTick(() => {\n                element.style.height = 0;\n            });\n        },\n        afterLeave() {\n            this.readyState = this.state;\n        },\n    },\n};\n</script>\n\n<style lang=\"scss\">\n.bv-accordion {\n    .bv-accordions & .bv-accordion__content {\n        margin-bottom: 0;\n    }\n\n    .bv-accordions &:last-child .bv-accordion__content {\n        margin-bottom: 0.5rem;\n    }\n}\n.bv-accordion__header {\n    display: flex;\n    align-items: center;\n    padding: 0.5rem 0;\n}\n.bv-accordion__toggle {\n    flex-grow: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    font-size: 0.75rem;\n\n    .bv-accordion:not(.bv-accordion--without-toggle) & {\n        cursor: pointer;\n    }\n}\n.bv-accordion__actions {\n    flex-grow: 1;\n    flex-shrink: 1;\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n}\n.bv-accordion__title {\n    flex-basis: 100%;\n    flex-grow: 2;\n    flex-shrink: 1;\n\n    .title {\n        margin: 0;\n        line-height: 1;\n    }\n\n    .bv-accordion:not(.bv-accordion--without-toggle) & {\n        cursor: pointer;\n    }\n}\n.bv-accordion__content {\n    margin-bottom: 0.5rem;\n    will-change: height;\n    // transform: translateZ(0);\n    backface-visibility: hidden;\n    // perspective: 1000px;\n}\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n    overflow: hidden;\n}\n\n.bv-accordion-toggle-leave-active {\n    transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n    overflow: hidden;\n}\n\n.bv-accordion-toggle-enter-active {\n    transition: height 0.3s ease-in-out, margin 0.3s;\n    overflow: hidden;\n}\n\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n    height: 0;\n    margin-bottom: 0 !important;\n    margin-top: 0 !important;\n}\n</style>\n",".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0;\n}\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem;\n}\n\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0;\n}\n\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n  cursor: pointer;\n}\n\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1;\n}\n.bv-accordion__title .title {\n  margin: 0;\n  line-height: 1;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n  cursor: pointer;\n}\n\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden;\n}\n\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden;\n}\n\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden;\n}\n\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden;\n}\n\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n}\n\n/*# sourceMappingURL=Accordion.vue.map */"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        createInjector,
        undefined,
        undefined
      );

    function plugin(Vue) {
      Vue.component('Accordions', __vue_component__);
      Vue.component('Accordion', __vue_component__$1);
    }

    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
    const version = '__VERSION__';

    exports.default = plugin;
    exports.Accordions = __vue_component__;
    exports.Accordion = __vue_component__$1;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
