import api from './api.js';
import './assets/style.scss';

export default (app, options = {}) => {
    const holder = document.createElement('div');
    holder.id = 'fv-toasts';
    holder.className = 'fv-toasts';

    document.body.appendChild(holder);

    app.config.globalProperties.$toast = api(app, options);
    app.provide('toast', app.config.globalProperties.$toast);
};
