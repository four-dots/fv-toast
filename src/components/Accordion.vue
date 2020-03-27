<template>
    <section
        class="bv-accordion"
        :class="{'bv-accordion--without-toggle': !togglable, 'is-open': state}"
        :data-id="id"
        :data-state="readyState"
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
        <transition
            name="bv-accordion-toggle"
            @enter="enter"
            @after-enter="afterEnter"
            @after-leave="afterLeave"
            @leave="leave"
        >
            <article v-show="state" class="bv-accordion__content content">
                <slot name="content" v-bind:state="state"></slot>
            </article>
        </transition>
    </section>
</template>

<script>
import {nanoid} from 'nanoid';

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
            readyState: this.open,
            id: nanoid(),
        };
    },
    methods: {
        toggle() {
            if (!this.togglable) return;
            this.$nextTick(() => {
                this.state = !this.state;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
            });
        },
        toggleFromOutside(value) {
            this.$nextTick(() => {
                this.state = value;
                if (this.state === true) {
                    this.readyState = true;
                }
                this.$emit('toggle', this.state);
            });
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
        afterLeave() {
            this.readyState = this.state;
        },
    },
};
</script>

<style lang="scss" src="../style.scss"></style>
