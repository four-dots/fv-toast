<template>
    <section class="bv-accordion" :data-id="id" :data-state="state">
        <header class="bv-accordion__header">
            <div class="bv-accordion__toggle" @click="toggle">
                <template v-if="usesFontAwesome">
                    <span class="icon"><i class="fas fal" :class="[state ? 'fa-minus' : 'fa-plus']"></i></span>
                </template>
                <template v-else>{{ state ? '-' : '+' }}</template>
            </div>
            <div class="bv-accordion__title" @click="toggle">
                <slot name="title"></slot>
            </div>
            <div class="bv-accordion__actions">
                <slot name="actions"></slot>
            </div>
        </header>
        <article v-if="state" class="bv-accordion__content content">
            <slot name="content"></slot>
        </article>
    </section>
</template>

<script>
import nanoid from 'nanoid';

export default {
    props: {
        usesFontAwesome: {
            default: true,
            type: Boolean,
            open: false,
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
            this.state = !this.state;
            this.$emit('toggle', this.state);
        },
        toggleFromOutside(value) {
            this.state = value;
            this.$emit('toggle', this.state);
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
    cursor: pointer;
    font-size: 0.75rem;
}
.bv-accordion__actions {
    flex-grow: 1;
    flex-shrink: 1;
}
.bv-accordion__title {
    flex-basis: 100%;
    flex-grow: 2;
    flex-shrink: 1;
    cursor: pointer;

    .title {
        margin: 0;
        line-height: 1;
    }
}
.bv-accordion__content {
    margin-bottom: 0.5rem;
}
</style>
