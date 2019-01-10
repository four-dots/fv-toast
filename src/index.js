import Accordions from './components/Accordions.vue';
import Accordion from './components/Accordion.vue';

function plugin(Vue) {
    Vue.component('Accordions', Accordions);
    Vue.component('Accordion', Accordion);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
const version = '__VERSION__';
export {Accordions, Accordion, version};
