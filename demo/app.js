import {createApp} from 'vue';
// import luxon from 'luxon';
import Accordion from '../src/index.js';

const app = createApp({
    data: () => ({
        accordions: [
            {title: 'first', content: 'First content here'},
            {title: 'second', content: 'Second content here'},
            {title: 'third', content: 'Third content here'},
        ],
    }),
});

app.use(Accordion);
app.mount('#app');
