import Toast from './Toast.vue';
import eventBus from './bus.js';
import {createApp} from 'vue';
import {nanoid} from 'nanoid';

const TOASTS = new Map();

const deleteToast = (toastId) => {
    const currentToast = TOASTS.get(toastId);
    if (!currentToast) return;

    currentToast.unmount();
    TOASTS.delete(toastId);

    document.querySelector(`[data-toast-id="${toastId}"]`)?.remove();
};

export default (app, globalOptions = {toastState: 'fv-toast__message--success'}) => {
    eventBus.on('toast.delete', deleteToast);

    return {
        open(options) {
            const toastId = nanoid();
            const message = typeof options === 'string' ? options : null;
            options = typeof options === 'string' ? {} : options;

            const propsData = {message, toastId, ...globalOptions, ...options};

            const toastHolder = document.createElement('div');
            toastHolder.setAttribute('data-toast-id', toastId);
            toastHolder.classList.add('fv-toast');

            const instance = createApp(Toast, propsData);
            instance.mount(toastHolder);

            document.getElementById('fv-toasts').appendChild(toastHolder);

            TOASTS.set(toastId, instance);
        },
        clear() {
            eventBus.emit('toast.clear');
        },
        error(message, options = {}) {
            return this.open({message, toastState: 'fv-toast__message--danger', ...options});
        },
        info(message, options = {}) {
            return this.open({message, toastState: 'fv-toast__message--info', ...options});
        },
        warning(message, options = {}) {
            return this.open({message, toastState: 'fv-toast__message--warning', ...options});
        },
    };
};
