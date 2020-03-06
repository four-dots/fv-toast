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
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
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
        undefined,
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
