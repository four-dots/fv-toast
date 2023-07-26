<template>
    <section class="bv-accordions"><slot></slot></section>
</template>

<script>
import {onBeforeUnmount, onMounted, provide} from 'vue';

import eventBus from './bus.js';

export default {
    name: 'bv-accordions',
    props: {
        single: {
            default: true,
            type: Boolean,
        },
    },
    setup(props, {slots}) {
        const children = [];
        const registeredAccordions = slots.default()[0].children.length;

        const dispatchCloseEvent = (accordionId) => {
            let accordionsToClose = children.reduce((carry, child) => {
                if (child.id === accordionId) return carry;
                child.state = false;
                return [child.id, ...carry];
            }, []);

            eventBus.emit('accordion.close', accordionsToClose);
        };

        const closeAccordions = ({accordionId, state}) => {
            if (!props.single || !state) return;
            if (!children.find((child) => child.id === accordionId)) return;

            dispatchCloseEvent(accordionId);
        };

        const closeOtherAccordions = () => {
            if (!props.single) return;
            let openAccordion = null;

            for (const child of children) {
                openAccordion ||= child.state ? child.id : null;
                if (openAccordion) break;
            }

            if (!openAccordion) return;
            dispatchCloseEvent(openAccordion);
        };

        const registerChild = (child) => {
            children.push(child);
            if (children.length !== registeredAccordions) return;
            closeOtherAccordions();
        };

        provide('registerChild', registerChild);

        onMounted(() => eventBus.on('accordion.toggle', closeAccordions));
        onBeforeUnmount(() => eventBus.off('accordion.toggle'));
    },
};
</script>
