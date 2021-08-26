<template>
    <section
        class="bv-accordion"
        :data-accordion-id="accordionId"
        :class="{'bv-accordion--without-toggle': !togglable, 'is-open': state}"
    >
        <header class="bv-accordion__header">
            <div v-if="togglable" class="bv-accordion__toggle" @click="toggle">
                <template v-if="usesFontAwesome">
                    <span class="icon"><i class="fas fal" :class="[state ? 'fa-minus' : 'fa-plus']"></i></span>
                </template>
                <template v-else>{{ state ? '-' : '+' }}</template>
            </div>
            <div class="bv-accordion__title" @click="toggle"><slot name="title"></slot></div>
            <div class="bv-accordion__actions"><slot name="actions"></slot></div>
        </header>
        <transition name="bv-accordion-toggle" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <article v-show="state" class="bv-accordion__content content">
                <slot name="content" v-bind:state="state"></slot>
            </article>
        </transition>
    </section>
</template>

<script>
import {ref, nextTick, onBeforeUnmount, watch, inject} from 'vue';
import {nanoid} from 'nanoid';

import eventBus from './bus.js';

export default {
    name: 'bv-accordion',
    props: {
        usesFontAwesome: {
            type: Boolean,
            default: true,
        },
        togglable: {
            type: Boolean,
            default: true,
        },
        open: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['toggle'],
    setup(props, {emit}) {
        const state = ref(props.open);
        const accordionId = nanoid();
        const registerChild = inject('registerChild', null);

        const toggle = async () => {
            if (!props.togglable) return;
            await nextTick();

            state.value = !state.value;
            emit('toggle', state.value);
            eventBus.emit('accordion.toggle', {accordionId, state: state.value});
        };

        const enter = async (element) => {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;
            await nextTick();
            element.style.height = height;
        };

        const afterEnter = (element) => {
            element.style.height = 'auto';
        };

        const leave = async (element) => {
            const height = getComputedStyle(element).height;
            element.style.height = height;

            getComputedStyle(element).height;
            await nextTick();
            element.style.height = 0;
        };

        const close = (accordionsToClose) => {
            if (!state.value || !props.togglable || !accordionsToClose.includes(accordionId)) return;
            state.value = false;
        };

        eventBus.on('accordion.close', close);

        if (registerChild) {
            registerChild({id: accordionId, state: state.value});
        }

        onBeforeUnmount(() => eventBus.off('accordion.close'));

        watch(
            () => props.open,
            (value) => {
                if (value === state.value) return;
                toggle();
            }
        );

        return {accordionId, state, toggle, enter, afterEnter, leave};
    },
};
</script>
