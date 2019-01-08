<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.$refs);
    },
};
</script>
