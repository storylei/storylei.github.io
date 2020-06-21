<template>
    <div class="container" @click="handleGalleryClick">
        <div class="wrapper">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(item, index) in imgs" :key="index">
                    <img :src="item" alt="" class="swiper-img">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>

// import axios from 'axios'

export default {
    name: 'CommonGallery',
    props: {
        imgs: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                observeParents: true,
                observer: true
            }
        }
    },
    components: {
    },
    mounted () {
    },
    methods: {
        handleGalleryClick () {
            this.$emit('close')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.container >>> .swiper-.container
    overflow inherit
.container
    display flex
    flex-direction column
    justify-content center
    position fixed
    z-index 99
    left 0
    right 0
    top 0
    bottom 0
    background #000000
    .wrapper
        background #fff
        width 100%
        height 0
        padding-bottom 100%
        .swiper-img
            width 100%
        .swiper-pagination
            color #ffffff
            bottom -1rem
</style>
