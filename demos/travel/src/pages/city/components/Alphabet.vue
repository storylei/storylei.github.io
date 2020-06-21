<template>
    <ul class="list">
        <li class="item"
            v-for="item of letters"
            :key="item"
            :ref="item"
            @touchstart.prevent="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @click="handleLetterClick">
            {{item}}
        </li>
    </ul>
</template>

<script>
// import axios from 'axios'
const HEADER_HEIGHT = 79
const LETTER_HEIGHT = 20
export default {
    name: 'CityAlphabet',
    props: {
        cities: Object
    },
    data () {
        return {
            touchStatus: false,
            startY: 0,
            timer: null
        }
    },
    updated () {
        this.startY = this.$refs['A'][0].offsetTop
    },
    computed: {
        letters () {
            return Object.keys(this.cities)
        }
    },
    methods: {
        handleLetterClick (e) {
            this.$emit('change', e.target.innerText)
        },
        handleTouchStart () {
            this.touchStatus = true
        },
        handleTouchMove (e) {
            if (this.touchStatus) {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    const startY = this.startY
                    console.log(startY)
                    const touchY = e.touches[0].clientY - HEADER_HEIGHT
                    const index = Math.floor((touchY - startY) / LETTER_HEIGHT)
                    if (index >= 0 && index < this.letters.length) {
                        this.$emit('change', this.letters[index])
                    }
                }, 16)
            }
        },
        handleTouchEnd () {
            this.touchStatus = false
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'

.list
    display flex
    flex-direction column
    justify-content center
    position absolute
    top 1.58rem
    right 0
    bottom 0
    width .4rem
    .item
        text-align center
        line-height .36rem
        color $bgColor
</style>
