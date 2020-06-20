<template>
    <div class="header">
        <div class="header-left"><span class="iconfont">&#xe658;</span></div>
        <div class="header-input"><span class="iconfont">&#xe63c;</span>输入城市</div>
        <div class="header-right">城市<span class="iconfont">&#xe65c;</span></div>
    </div>
</template>

<script>

export default {
    name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.header
    display flex
    line-height .86rem
    background $bgColor
    color #fff;
    .header-left
        width .64rem
        height .86rem
        line-height .86rem
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
        width 1.24rem
        text-align center
        height .86rem
        line-height .86rem
        .iconfont
            font-size .4rem
            vertical-align bottom
</style>
