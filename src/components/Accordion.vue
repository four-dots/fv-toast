<template>
    <section class="bv-accordion" :data-id="id" :data-state="state">
        <header class="bv-accordion_header">
            <div class="bv-accordion_toggle" @click="toggle">
                <template v-if="usesFontAwesome">
                    <span class="icon"><i class="fas fal" :class="[state ? 'fa-minus' : 'fa-plus']"></i></span>
                </template>
                <template v-else>{{ state ? '-' : '+' }}</template>
            </div>
            <div class="bv-accordion_title" @click="toggle">
                <slot name="title"></slot>
            </div>
            <div class="bv-accordion_actions">
                <slot name="actions"></slot>
            </div>
        </header>
        <article v-if="state" class="bv-accordion_content content">
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
        },
    },
    data() {
        return {
            state: false,
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
    .bv-accordions & .bv-accordion_content {
        margin-bottom: 0;
    }

    .bv-accordions &:last-child .bv-accordion_content {
        margin-bottom: 0.5rem;
    }
}
.bv-accordion_header {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
}
.bv-accordion_toggle {
    flex-grow: 0;
    flex-shrink: 0;
    padding-right: 1rem;
    cursor: pointer;
    font-size: 0.75rem;
}
.bv-accordion_actions {
    flex-grow: 1;
    flex-shrink: 1;
}
.bv-accordion_title {
    flex-basis: 100%;
    flex-grow: 2;
    flex-shrink: 1;
    cursor: pointer;

    .title {
        margin: 0;
        line-height: 1;
    }
}
.bv-accordion_content {
    margin-bottom: 0.5rem;
}
</style>
