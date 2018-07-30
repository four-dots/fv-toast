<template>
    <div class="bv-accordion">
        <header class="bv-accordion_header">
            <div class="bv-accordion_toggle" @click="toggle">
                +
            </div>
            <div class="bv-accordion_title">
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
