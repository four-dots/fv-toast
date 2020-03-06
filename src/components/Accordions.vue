<template>
    <section class="bv-accordions"><slot></slot></section>
</template>

<script>
export default {
    props: {
        single: {
            default: true,
            type: Boolean,
        },
    },
    data: () => ({
        observer: null,
    }),
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

        this.observer = new MutationObserver(mutations => {
            this.toggleAccordions(mutations[0]);
        });

        this.$nextTick(() => {
            this.observer.observe(this.$el, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['data-state'],
                subtree: true,
            });
        });
    },
    beforeDestroy() {
        this.observer.disconnect();
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
        closeAllAccordions() {
            for (const child of this.$children) {
                child.toggleFromOutside(false);
            }
        },
    },
};
</script>
