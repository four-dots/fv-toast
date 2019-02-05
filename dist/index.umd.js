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

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

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
      

      
      var Accordions = normalizeComponent_1(
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

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
      return function (id, style) {
        return addStyle(id, style);
      };
    }
    var HEAD = document.head || document.getElementsByTagName('head')[0];
    var styles = {};

    function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });

      if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) style.element.setAttribute('media', css.media);
          HEAD.appendChild(style.element);
        }

        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          var index = style.ids.size - 1;
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    }

    var browser = createInjector;

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
        inject("data-v-47497dea_0", { source: ".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0;\n}\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem;\n}\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0;\n}\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n    cursor: pointer;\n}\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1;\n}\n.bv-accordion__title .title {\n    margin: 0;\n    line-height: 1;\n}\n.bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n    cursor: pointer;\n}\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden;\n}\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden;\n}\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden;\n}\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n}\n\n/*# sourceMappingURL=Accordion.vue.map */", map: {"version":3,"sources":["C:\\Code\\bulma-vue-accordion\\src\\components\\Accordion.vue","Accordion.vue"],"names":[],"mappings":"AAqHA;EACA,gBAAA;AAAA;AAGA;EACA,qBAAA;AAAA;AAGA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;AAAA;AAEA;EACA,YAAA;EACA,cAAA;EACA,qBAAA;EACA,kBAAA;AAAA;AAEA;IACA,eAAA;AAAA;AAGA;EACA,YAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;AAAA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,cAAA;AAAA;AAHA;IAMA,SAAA;IACA,cAAA;AAAA;AAGA;IACA,eAAA;AAAA;AAGA;EACA,qBAAA;EACA,mBAAA;EAEA,2BAAA;AAAA;AAGA;;EAEA,gBAAA;AAAA;AAGA;EACA,qDAAA;EACA,gBAAA;AAAA;AAGA;EACA,gDAAA;EACA,gBAAA;AAAA;AAGA;;EAEA,SAAA;EACA,2BAAA;EACA,wBAAA;AAAA;;AChIA,wCAAwC","file":"Accordion.vue","sourcesContent":["<template>\r\n    <section\r\n        class=\"bv-accordion\"\r\n        :class=\"{'bv-accordion--without-toggle': !togglable, 'is-open': state}\"\r\n        :data-id=\"id\"\r\n        :data-state=\"readyState\"\r\n    >\r\n        <header class=\"bv-accordion__header\">\r\n            <div v-if=\"togglable\" class=\"bv-accordion__toggle\" @click=\"toggle\">\r\n                <template v-if=\"usesFontAwesome\">\r\n                    <span class=\"icon\"><i class=\"fas fal\" :class=\"[state ? 'fa-minus' : 'fa-plus']\"></i></span>\r\n                </template>\r\n                <template v-else>{{ state ? '-' : '+' }}</template>\r\n            </div>\r\n            <div class=\"bv-accordion__title\" @click=\"toggle\"><slot name=\"title\"></slot></div>\r\n            <div class=\"bv-accordion__actions\"><slot name=\"actions\"></slot></div>\r\n        </header>\r\n        <transition\r\n            name=\"bv-accordion-toggle\"\r\n            @enter=\"enter\"\r\n            @after-enter=\"afterEnter\"\r\n            @after-leave=\"afterLeave\"\r\n            @leave=\"leave\"\r\n        >\r\n            <article v-show=\"state\" class=\"bv-accordion__content content\">\r\n                <slot name=\"content\" v-bind:state=\"state\"></slot>\r\n            </article>\r\n        </transition>\r\n    </section>\r\n</template>\r\n\r\n<script>\r\nimport nanoid from 'nanoid';\r\n\r\nexport default {\r\n    props: {\r\n        usesFontAwesome: {\r\n            type: Boolean,\r\n            default: true,\r\n        },\r\n        togglable: {\r\n            type: Boolean,\r\n            default: true,\r\n        },\r\n        open: {\r\n            type: Boolean,\r\n            default: false,\r\n        },\r\n    },\r\n    data() {\r\n        return {\r\n            state: this.open,\r\n            readyState: this.open,\r\n            id: nanoid(),\r\n        };\r\n    },\r\n    methods: {\r\n        toggle() {\r\n            if (!this.togglable) return;\r\n            this.$nextTick(() => {\r\n                this.state = !this.state;\r\n                if (this.state === true) {\r\n                    this.readyState = true;\r\n                }\r\n                this.$emit('toggle', this.state);\r\n            });\r\n        },\r\n        toggleFromOutside(value) {\r\n            this.$nextTick(() => {\r\n                this.state = value;\r\n                if (this.state === true) {\r\n                    this.readyState = true;\r\n                }\r\n                this.$emit('toggle', this.state);\r\n            });\r\n        },\r\n        enter(element) {\r\n            const width = getComputedStyle(element).width;\r\n\r\n            element.style.width = width;\r\n            element.style.position = 'absolute';\r\n            element.style.visibility = 'hidden';\r\n            element.style.height = 'auto';\r\n\r\n            const height = getComputedStyle(element).height;\r\n\r\n            element.style.width = null;\r\n            element.style.position = null;\r\n            element.style.visibility = null;\r\n            element.style.height = 0;\r\n\r\n            getComputedStyle(element).height;\r\n            this.$nextTick(() => {\r\n                element.style.height = height;\r\n            });\r\n        },\r\n        afterEnter(element) {\r\n            element.style.height = 'auto';\r\n        },\r\n        leave(element) {\r\n            const height = getComputedStyle(element).height;\r\n            element.style.height = height;\r\n\r\n            getComputedStyle(element).height;\r\n            this.$nextTick(() => {\r\n                element.style.height = 0;\r\n            });\r\n        },\r\n        afterLeave() {\r\n            this.readyState = this.state;\r\n        },\r\n    },\r\n};\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.bv-accordion {\r\n    .bv-accordions & .bv-accordion__content {\r\n        margin-bottom: 0;\r\n    }\r\n\r\n    .bv-accordions &:last-child .bv-accordion__content {\r\n        margin-bottom: 0.5rem;\r\n    }\r\n}\r\n.bv-accordion__header {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 0.5rem 0;\r\n}\r\n.bv-accordion__toggle {\r\n    flex-grow: 0;\r\n    flex-shrink: 0;\r\n    padding-right: 0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    .bv-accordion:not(.bv-accordion--without-toggle) & {\r\n        cursor: pointer;\r\n    }\r\n}\r\n.bv-accordion__actions {\r\n    flex-grow: 1;\r\n    flex-shrink: 1;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n}\r\n.bv-accordion__title {\r\n    flex-basis: 100%;\r\n    flex-grow: 2;\r\n    flex-shrink: 1;\r\n\r\n    .title {\r\n        margin: 0;\r\n        line-height: 1;\r\n    }\r\n\r\n    .bv-accordion:not(.bv-accordion--without-toggle) & {\r\n        cursor: pointer;\r\n    }\r\n}\r\n.bv-accordion__content {\r\n    margin-bottom: 0.5rem;\r\n    will-change: height;\r\n    // transform: translateZ(0);\r\n    backface-visibility: hidden;\r\n    // perspective: 1000px;\r\n}\r\n.bv-accordion-toggle-enter-active,\r\n.bv-accordion-toggle-leave-active {\r\n    overflow: hidden;\r\n}\r\n\r\n.bv-accordion-toggle-leave-active {\r\n    transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\r\n    overflow: hidden;\r\n}\r\n\r\n.bv-accordion-toggle-enter-active {\r\n    transition: height 0.3s ease-in-out, margin 0.3s;\r\n    overflow: hidden;\r\n}\r\n\r\n.bv-accordion-toggle-enter,\r\n.bv-accordion-toggle-leave-to {\r\n    height: 0;\r\n    margin-bottom: 0 !important;\r\n    margin-top: 0 !important;\r\n}\r\n</style>\r\n",".bv-accordions .bv-accordion .bv-accordion__content {\n  margin-bottom: 0; }\n\n.bv-accordions .bv-accordion:last-child .bv-accordion__content {\n  margin-bottom: 0.5rem; }\n\n.bv-accordion__header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0; }\n\n.bv-accordion__toggle {\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  font-size: 0.75rem; }\n  .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle {\n    cursor: pointer; }\n\n.bv-accordion__actions {\n  flex-grow: 1;\n  flex-shrink: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end; }\n\n.bv-accordion__title {\n  flex-basis: 100%;\n  flex-grow: 2;\n  flex-shrink: 1; }\n  .bv-accordion__title .title {\n    margin: 0;\n    line-height: 1; }\n  .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title {\n    cursor: pointer; }\n\n.bv-accordion__content {\n  margin-bottom: 0.5rem;\n  will-change: height;\n  backface-visibility: hidden; }\n\n.bv-accordion-toggle-enter-active,\n.bv-accordion-toggle-leave-active {\n  overflow: hidden; }\n\n.bv-accordion-toggle-leave-active {\n  transition: height 0.3s ease-in-out, margin 0.3s 0.1s;\n  overflow: hidden; }\n\n.bv-accordion-toggle-enter-active {\n  transition: height 0.3s ease-in-out, margin 0.3s;\n  overflow: hidden; }\n\n.bv-accordion-toggle-enter,\n.bv-accordion-toggle-leave-to {\n  height: 0;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important; }\n\n/*# sourceMappingURL=Accordion.vue.map */"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      

      
      var Accordion = normalizeComponent_1(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        browser,
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

    exports.default = plugin;
    exports.Accordions = Accordions;
    exports.Accordion = Accordion;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
