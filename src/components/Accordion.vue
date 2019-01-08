<template>
    <div class="bv-accordion">
        <header class="bv-accordion_header">
            <div class="bv-accordion_toggle" @click="toggle">
                +
            </div>
            <div class="bv-accordion_title" @click="toggle">
                <h3 class="title is-3">{{ title }}</h3>
            </div>
            <div class="bv-accordion_actions">
                <slot name="actions"></slot>
            </div>
        </header>
        <article v-if="open" class="bv-accordion_content content">
            <slot name="content"></slot>
        </article>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
    data() {
        return {
            open: false,
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
    },
};
</script>

<style lang="scss">
.bv-accordion_header {
    display: flex;
    align-items: center;
}
.bv-accordion_toggle {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 1rem;
    cursor: pointer;
}
.bv-accordion_actions {
    flex-grow: 0;
    flex-shrink: 0;
}
.bv-accordion_title {
    flex-basis: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    cursor: pointer;

    .title {
        margin: 0;
    }
}
</style>
