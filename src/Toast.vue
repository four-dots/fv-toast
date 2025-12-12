<template>
    <transition enter-active-class="fv-toast--fade-in-up" leave-active-class="fv-toast--fade-out">
        <div
            role="alert"
            v-show="visible"
            class="fv-toast__message"
            :class="[toastState, `fv-toast__message--${position}`]"
            @mouseover="toggleTimer(true)"
            @mouseleave="toggleTimer(false)"
            @click="triggerClick"
        >
            <!-- <div class="fv-toast__icon"></div> -->
            <p class="fv-toast__text" v-html="parsedMessage"></p>
        </div>
    </transition>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {marked} from 'marked';

import Timer from './timer.js';
import eventBus from './bus.js';

const props = defineProps({
    toastId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    toastState: {
        type: String,
        default: 'fv-toast__message--success',
    },
    position: {
        type: String,
        default: 'right',
        validator: (value) => ['right', 'left'].includes(value),
    },
    duration: {
        type: Number,
        default: 3000,
    },
    dismissible: {
        type: Boolean,
        default: true,
    },
    onClose: {
        type: Function,
        default: () => {},
    },
    onClick: {
        type: Function,
        default: () => {},
    },
    pauseOnHover: {
        type: Boolean,
        default: true,
    },
});

const visible = ref(false);
const parsedMessage = props.message && marked(props.message);

let timer = null;

const close = () => {
    timer?.stop();
    visible.value = false;
    props.onClose.apply(null, arguments);
    setTimeout(() => eventBus.emit('toast.delete', props.toastId), 150);
};

const open = () => {
    visible.value = true;
    timer = new Timer(close, props.duration);
};

const triggerClick = () => {
    if (!props.dismissible) return;
    props.onClick.apply(null, arguments);
    close();
};

const toggleTimer = (pause) => {
    if (!props.pauseOnHover || timer === null) return;
    pause ? timer.pause() : timer.resume();
};

eventBus.on('toast.clear', close);

onMounted(open);
onBeforeUnmount(() => eventBus.off('toast.clear', close));
</script>
