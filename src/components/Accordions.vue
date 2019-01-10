<template>
    <section class="bv-accordions">
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: {
        single: {
            default: true,
            type: Boolean,
        },
    },
    mounted() {
        if (!this.single) {
            return;
        }

        let isAnyOpen = false;
        for (const child of this.$children) {
            if (!isAnyOpen && child.state === true) {
                isAnyOpen = true;
                continue;
            }
            if (!isAnyOpen) continue;
            child.toggleFromOutside(false);
        }

        const observer = new MutationObserver(mutations => {
            this.toggleAccordions(mutations[0]);
        });

        this.$nextTick(() => {
            observer.observe(this.$el, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['data-state'],
                subtree: true,
            });
        });
    },
    methods: {
        toggleAccordions(mutation) {
            let accordionData = mutation.target.dataset;
            if (accordionData.state !== 'true') return;
            for (const child of this.$children) {
                if (child.id === accordionData.id) continue;
                child.toggleFromOutside(false);
            }
        },
    },
};
</script>
