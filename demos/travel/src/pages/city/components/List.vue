<template>
    <div class="list" ref="wrapper">
        <div>
            <div class="area">
                <div class="title border-topbottom">当前城市</div>
                <div class="button-list">
                    <div class="button-wrapper">
                        <div class="button">{{this.city}}</div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="title border-topbottom">热门城市</div>
                <div class="button-list">
                    <div class="button-wrapper" v-for="item of hot" :key="item.id" @click="handleCityClick(item.name)">
                        <div class="button">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
                <div class="title border-topbottom">{{key}}</div>
                <div class="item-list">
                    <div class="item border-bottom" v-for="innerItem of item" :key="innerItem.id" @click="handleCityClick(innerItem.name)">{{innerItem.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'

// import axios from 'axios'

export default {
    name: 'CityList',
    props: {
        hot: Array,
        cities: Object,
        letter: String
    },
    computed: {
        ...mapState(['city'])
    },
    mounted () {
        this.scroll = new Bscroll(this.$refs.wrapper)
    },
    watch: {
        letter () {
            if (this.letter) {
                const ele = this.$refs[this.letter] // 返回一个数组
                this.scroll.scrollToElement(ele[0])
            }
        }
    },
    methods: {
        ...mapMutations(['changeCity']),
        handleCityClick (city) {
            // this.$store.dispatch('changCity', city)
            this.changeCity(city)
            this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.border-topbottom
    &:before
        border-color #cccccc
    &:after
        border-color #cccccc
.border-bottom
    &:before
        border-color #cccccc
.list
    position absolute
    overflow hidden
    top 1.58rem
    left 0
    right 0
    bottom 0
    .title
        line-height .54rem
        background-color #eeeeee
        padding-left .2rem
        color #666666
        font-size .26rem
    .button-list
        padding .1rem .6rem .1rem .1rem
        overflow hidden
        .button-wrapper
            float left
            width 33.33%
            .button
                margin .1rem
                padding .1rem 0;
                text-align center
                border .02rem solid #ccc
                border-radius .06rem
    .item-list
        .item
            line-height .76rem
            padding-left .2rem
</style>
