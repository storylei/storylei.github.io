<template>
    <div>
        <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
            <span class="iconfont">&#xe658;</span>
        </router-link>
        <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            景点详情
            <router-link to="/">
                <div class="iconfont">&#xe658;</div>
            </router-link>
        </div>
    </div>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'DetailHeader',
    data () {
        return {
            showAbs: true,
            opacityStyle: {
                opacity: 0
            }
        }
    },
    activated () {
        window.addEventListener('scroll', this.handleScroll)
    },
    deactivated () {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll () {
            const top = document.documentElement.scrollTop
            if (top > 60) {
                let opacity = top / 140
                opacity = opacity > 1 ? 1 : opacity
                this.opacityStyle = {
                    opacity
                }
                this.showAbs = false
            } else {
                this.showAbs = true
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.header-abs
    position absolute
    left .2rem
    top .2rem
    width .6rem
    height .6rem
    line-height .6rem
    text-align center
    border-radius .4rem
    background: rgba(0, 0, 0, .8)
    .iconfont
        color #ffffff
        font-size .4rem
.header-fixed
    position fixed
    z-index 2
    top 0
    left 0
    right 0
    // overflow hidden
    height $headerHeight
    line-height $headerHeight
    text-align center
    color #ffffff
    background-color $bgColor
    font-size .3rem
    .iconfont
        position absolute
        top 0
        left 0
        width .64rem
        text-align center
        font-size .5rem
        color #fff
</style>
