import Accordions from './Accordions.vue';
import Accordion from './Accordion.vue';
import './assets/style.scss';

import optionsStore from './options.js';

export default (app, options) => {
    optionsStore.setOptions(options);

    app.component('Accordion', Accordion);
    app.component('Accordions', Accordions);
};
