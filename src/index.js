import Accordions from './components/Accordions.vue';
import Accordion from './components/Accordion.vue';

export default {
    install(Vue) {
        Vue.component('Accordions', Accordions);
        Vue.component('Accordion', Accordion);
    },
};
