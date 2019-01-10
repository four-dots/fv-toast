import nanoid from 'nanoid';

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
    },
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".bv-accordions .bv-accordion .bv-accordion_content { margin-bottom: 0; } .bv-accordions .bv-accordion:last-child .bv-accordion_content { margin-bottom: 0.5rem; } .bv-accordion_header { display: flex; align-items: center; padding: 0.5rem 0; } .bv-accordion_toggle { flex-grow: 0; flex-shrink: 0; padding-right: 1rem; cursor: pointer; font-size: 0.75rem; } .bv-accordion_actions { flex-grow: 1; flex-shrink: 1; } .bv-accordion_title { flex-basis: 100%; flex-grow: 2; flex-shrink: 1; cursor: pointer; } .bv-accordion_title .title { margin: 0; line-height: 1; } .bv-accordion_content { margin-bottom: 0.5rem; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var Accordion = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"bv-accordion",attrs:{"data-id":_vm.id,"data-state":_vm.state}},[_c('header',{staticClass:"bv-accordion_header"},[_c('div',{staticClass:"bv-accordion_toggle",on:{"click":_vm.toggle}},[(_vm.usesFontAwesome)?[_c('span',{staticClass:"icon"},[_c('i',{staticClass:"fas fal",class:[_vm.state ? 'fa-minus' : 'fa-plus']})])]:[_vm._v(_vm._s(_vm.state ? '-' : '+'))]],2),_vm._v(" "),_c('div',{staticClass:"bv-accordion_title",on:{"click":_vm.toggle}},[_vm._t("title")],2),_vm._v(" "),_c('div',{staticClass:"bv-accordion_actions"},[_vm._t("actions")],2)]),_vm._v(" "),(_vm.state)?_c('article',{staticClass:"bv-accordion_content content"},[_vm._t("content")],2):_vm._e()])},staticRenderFns: [],
    props: {
        usesFontAwesome: {
            default: true,
            type: Boolean,
            open: false,
        },
    },
    data() {
        return {
            state: this.open,
            id: nanoid(),
        };
    },
    methods: {
        toggle() {
            this.state = !this.state;
            this.$emit('toggle', this.state);
        },
        toggleFromOutside(value) {
            this.state = value;
            this.$emit('toggle', this.state);
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

export default plugin;
export { Accordions, Accordion, version };
