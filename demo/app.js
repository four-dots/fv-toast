import {createApp} from 'vue';

import ToastPlugin from '../src/index.js';

const app = createApp({
    data() {
        return {test: 'asd'};
    },
    mounted() {
        this.$toast.open({message: 'long toast', duration: 200000});
        this.$toast.error('**some toast**', {duration: 2000});
        this.$toast.info('some toast', {duration: 2000});
        this.$toast.warning('some toast', {duration: 2000});
    },
});

app.use(ToastPlugin);
app.mount('#app');
