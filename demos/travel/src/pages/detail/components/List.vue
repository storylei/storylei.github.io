<template>
    <div class="">
        <div class="item" v-for="(item, index) of list" :key="index">
            <div class="item-title border-bottom">
                <span class="item-title-icon"></span>
                <span>{{item.title}}</span>
            </div>
            <div class="item-children" v-if="item.children">
                <detail-list :list="item.children"></detail-list>
            </div>
        </div>
    </div>
</template>

<script>

// import axios from 'axios'
export default {
    name: 'DetailList',
    props: {
        list: Array
    },
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
.item-title
    line-height .8rem
    font-size .32rem
    padding 0 .2rem
    display flex
    align-items center
    .item-title-icon
        margin-right .2rem
        background $bgColor
        height 10px
        width 10px
.item-children
    padding 0 .2rem

</style>
