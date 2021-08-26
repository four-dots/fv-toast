import Accordions from './Accordions.vue';
import Accordion from './Accordion.vue';
import './assets/style.scss';

export default (app) => {
    app.component('Accordion', Accordion);
    app.component('Accordions', Accordions);
};
