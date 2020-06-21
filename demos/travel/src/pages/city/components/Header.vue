<template>
    <div class="header">
        城市选择
        <router-link to="/">
            <div class="icon-back iconfont">&#xe658;</div>
        </router-link>
    </div>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'CityHeader',
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

.header
    position relative
    overflow hidden
    height $headerHeight
    line-height $headerHeight
    text-align center
    color #ffffff
    background-color $bgColor
    font-size .3rem
    .icon-back
        position absolute
        top 0
        left 0
        width .64rem
        text-align center
        font-size .5rem
        color #fff
</style>
