<template>
<div class="search">
    <input type="text"
        placeholder="输入城市名或拼音"
        class="search-ipt"
        v-model="keyword"
    />
    <div class="search-content" ref="search" v-show="keyword">
        <ul>
            <li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
            <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
        </ul>
    </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'

// import axios from 'axios'

export default {
    name: 'CitySearch',
    props: {
        cities: Object
    },
    data () {
        return {
            keyword: '',
            list: [],
            timer: null
        }
    },
    computed: {
        hasNoData () {
            return !this.list.length
        }
    },
    watch: {
        keyword () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            if (!this.keyword) {
                this.list = []
                return
            }
            this.timer = setTimeout(() => {
                const result = []
                for (let i in this.cities) {
                    this.cities[i].forEach((value) => {
                        if (value.spell.indexOf(this.keyword) > -1 ||
                            value.name.indexOf(this.keyword) > -1) {
                            result.push(value)
                        }
                    })
                }
                this.list = result
            }, 100)
        }
    },
    mounted () {
        this.scroll = new Bscroll(this.$refs.search)
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

.search
    height .72rem
    padding 0 .1rem
    background-color $bgColor
    .search-ipt
        box-sizing: border-box
        height .62rem
        line-height .62rem
        padding 0 .1rem
        width 100%
        text-align center
        border-radius .06rem
        color #666666
.search-content
    position absolute
    overflow hidden
    z-index 1
    top 1.58rem
    left 0
    right 0
    bottom 0
    background-color #ffffff
    .search-item
        line-height .62rem
        padding-left .2rem
        background-color #ffffff
        color #666666
</style>
