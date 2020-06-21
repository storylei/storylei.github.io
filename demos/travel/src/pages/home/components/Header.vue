<template>
    <div class="header">
        <div class="header-left"><span class="iconfont">&#xe658;</span></div>
        <div class="header-input"><span class="iconfont">&#xe63c;</span>输入城市</div>
        <router-link to="/city">
            <div class="header-right">{{this.city}}<span class="iconfont">&#xe65c;</span></div>
        </router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'HomeHeader',
    computed: {
        ...mapState(['city'])
        // ...mapGetters(['dobuleCity'])
    },
    updated () {
        console.log(this.doubleCity)
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.header
    display flex
    line-height $headerHeight
    background $bgColor
    color #fff;
    .header-left
        width .64rem
        height $headerHeight
        line-height $headerHeight
        text-align center
        .iconfont
            font-size .5rem
    .header-input
        flex 1
        margin-top .12rem
        margin-left .2rem
        padding-left .2rem
        height .64rem
        line-height .64rem
        background-color #fff
        border-radius .1rem
        color #ccc
    .header-right
        min-width 1.04rem
        padding 0 .1rem
        text-align center
        height $headerHeight
        line-height $headerHeight
        color: #fff
        .iconfont
            font-size .4rem
            vertical-align bottom
</style>
