<template>
    <transition>
        <slot></slot>
    </transition>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'FadeAnimation',
    components: {
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.v-enter, .v-leave-to
    opacity 0
.v-enter-active , .v-leave-active
    transition: opacity .5s
</style>
