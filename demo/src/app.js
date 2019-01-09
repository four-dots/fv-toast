import Vue from 'vue';
import AccordionPlugin from '../../src/index.js';

Vue.use(AccordionPlugin);

new Vue({
    el: '#app',
    data: {
        accordions: [
            {title: 'ASD dasd a', content: 'sadwqqwd das dqw qdwdasdqw qdw'},
            {title: 'DWEDA dasd a', content: 'sadwqqwd das dqw qdwdasdqw qdw'},
        ],
    },
});
