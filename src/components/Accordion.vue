<template>
    <section
        class="bv-accordion"
        :class="{'bv-accordion--without-toggle': !togglable}"
        :data-id="id"
        :data-state="state"
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
            <article v-if="state" class="bv-accordion__content content"><slot name="content"></slot></article>
        </transition>
    </section>
</template>

<script>
import nanoid from 'nanoid';

export default {
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
    data() {
        return {
            state: this.open,
            id: nanoid(),
        };
    },
    methods: {
        toggle() {
            if (!this.togglable) return;
            this.state = !this.state;
            this.$emit('toggle', this.state);
        },
        toggleFromOutside(value) {
            if (!this.togglable) return;
            this.state = value;
            this.$emit('toggle', this.state);
        },
        enter(element) {
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
            this.$nextTick(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;
            element.style.height = height;

            getComputedStyle(element).height;
            this.$nextTick(() => {
                element.style.height = 0;
            });
        },
    },
};
</script>

<style lang="scss">
.bv-accordion {
    .bv-accordions & .bv-accordion__content {
        margin-bottom: 0;
    }

    .bv-accordions &:last-child .bv-accordion__content {
        margin-bottom: 0.5rem;
    }
}
.bv-accordion__header {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
}
.bv-accordion__toggle {
    flex-grow: 0;
    flex-shrink: 0;
    padding-right: 0.5rem;
    font-size: 0.75rem;

    .bv-accordion:not(.bv-accordion--without-toggle) & {
        cursor: pointer;
    }
}
.bv-accordion__actions {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.bv-accordion__title {
    flex-basis: 100%;
    flex-grow: 2;
    flex-shrink: 1;

    .title {
        margin: 0;
        line-height: 1;
    }

    .bv-accordion:not(.bv-accordion--without-toggle) & {
        cursor: pointer;
    }
}
.bv-accordion__content {
    margin-bottom: 0.5rem;
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
.bv-accordion-toggle-enter-active,
.bv-accordion-toggle-leave-active {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
}

.bv-accordion-toggle-enter,
.bv-accordion-toggle-leave-to {
    height: 0;
}
</style>
