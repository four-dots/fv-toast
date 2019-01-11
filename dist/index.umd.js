(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('nanoid')) :
    typeof define === 'function' && define.amd ? define(['exports', 'nanoid'], factory) :
    (factory((global.BulmaVueAccordion = {}),global.nanoid));
}(this, (function (exports,nanoid) { 'use strict';

    nanoid = nanoid && nanoid.hasOwnProperty('default') ? nanoid['default'] : nanoid;

    (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




    var Accordions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"bv-accordions"},[_vm._t("default")],2)},staticRenderFns: [],
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

    (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".bv-accordions .bv-accordion .bv-accordion__content { margin-bottom: 0; } .bv-accordions .bv-accordion:last-child .bv-accordion__content { margin-bottom: 0.5rem; } .bv-accordion__header { display: flex; align-items: center; padding: 0.5rem 0; } .bv-accordion__toggle { flex-grow: 0; flex-shrink: 0; padding-right: 0.5rem; font-size: 0.75rem; } .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__toggle { cursor: pointer; } .bv-accordion__actions { flex-grow: 1; flex-shrink: 1; display: flex; align-items: center; justify-content: flex-end; } .bv-accordion__title { flex-basis: 100%; flex-grow: 2; flex-shrink: 1; } .bv-accordion__title .title { margin: 0; line-height: 1; } .bv-accordion:not(.bv-accordion--without-toggle) .bv-accordion__title { cursor: pointer; } .bv-accordion__content { margin-bottom: 0.5rem; will-change: height; transform: translateZ(0); backface-visibility: hidden; perspective: 1000px; } .bv-accordion-toggle-enter-active, .bv-accordion-toggle-leave-active { transition: height 0.3s ease-in-out, margin 0.3s; overflow: hidden; } .bv-accordion-toggle-enter, .bv-accordion-toggle-leave-to { height: 0; margin-bottom: 0 !important; margin-top: 0 !important; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

    var Accordion = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"bv-accordion",class:{'bv-accordion--without-toggle': !_vm.togglable},attrs:{"data-id":_vm.id,"data-state":_vm.readyState}},[_c('header',{staticClass:"bv-accordion__header"},[(_vm.togglable)?_c('div',{staticClass:"bv-accordion__toggle",on:{"click":_vm.toggle}},[(_vm.usesFontAwesome)?[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fas fal",class:[_vm.state ? 'fa-minus' : 'fa-plus']})])]:[_vm._v(_vm._s(_vm.state ? '-' : '+'))]],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"bv-accordion__title",on:{"click":_vm.toggle}},[_vm._t("title")],2),_vm._v(" "),_c('div',{staticClass:"bv-accordion__actions"},[_vm._t("actions")],2)]),_vm._v(" "),_c('transition',{attrs:{"name":"bv-accordion-toggle"},on:{"enter":_vm.enter,"after-enter":_vm.afterEnter,"after-leave":_vm.afterLeave,"leave":_vm.leave}},[(_vm.state)?_c('article',{staticClass:"bv-accordion__content content"},[_vm._t("content")],2):_vm._e()])],1)},staticRenderFns: [],
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
                this.state = !this.state;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
            },
            toggleFromOutside(value) {
                if (!this.togglable) return;
                this.state = value;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
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

})));
