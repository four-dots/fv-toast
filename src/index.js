import AccordionsGroup from './components/AccordionsGroup.vue';
import Accordion from './components/Accordion.vue';

export default {
    install(Vue) {
        Vue.component('AccordionsGroup', AccordionsGroup);
        Vue.component('Accordion', Accordion);
    },
};
