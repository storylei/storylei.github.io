<template>
<div>
    <div class="banner" @click="handleBannerClick">
        <img class="banner-img" :src="imgUrl" alt="">
        <div class="banner-info">
            <div class="banner-title">{{name}}</div>
            <div class="banner-number"><span class="iconfont banner-icon">&#xe64a;</span>{{this.galleryImgs.length}}</div>
        </div>
    </div>
    <fade-animation>
        <common-gallery :imgs="galleryImgs" v-show="showGallery" @close="handleGalleryClose"></common-gallery>
    </fade-animation>
</div>
</template>

<script>
import CommonGallery from 'common/gallery/Gallery'
import FadeAnimation from 'common/fade/Fade'

// import axios from 'axios'
export default {
    name: 'DetailBanner',
    props: {
        name: String,
        imgUrl: String,
        galleryImgs: Array
    },
    data () {
        return {
            showGallery: false
        }
    },
    components: {
        CommonGallery,
        FadeAnimation
    },
    methods: {
        handleBannerClick () {
            this.showGallery = true
        },
        handleGalleryClose () {
            this.showGallery = false
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'

.banner
    position relative
    overflow hidden
    height 0
    padding-bottom 55%
    .banner-img
        width 100%
    .banner-info
        background-image linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8))
        display flex
        position absolute
        left 0
        right 0
        bottom 0
        height .6rem
        color #fff
        .banner-title
            flex 1
            font-size .32rem
            padding 0 .2rem
        .banner-number
            margin .14rem .2rem 0 0
            padding: 0 .3rem
            line-height .32rem
            height .32rem
            font-size .24rem
            border-radius .2rem
            background rgba(0, 0, 0, .8)
            .banner-icon
                padding 0 .04rem
                font-size .24rem
</style>
