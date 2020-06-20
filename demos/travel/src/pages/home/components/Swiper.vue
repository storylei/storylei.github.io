<template>
<div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item of swiperList" :key="item.id">
            <img :src="item.imgUrl" alt="" class="swiper-img">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default {
    name: 'HomeSwiper',
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                loop: true
            },
            swiperList: [
                {
                    id: 1,
                    imgUrl: 'https://github.surmon.me/images/example/5.jpg'
                },
                {
                    id: 2,
                    imgUrl: 'https://github.surmon.me/images/example/7.jpg'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active
    background-color #fff
.wrapper
    width 100%
    height 0
    overflow hidden
    padding-bottom 31.25%
    background-color #ccc
    // height 31.25vw
    .swiper-img
        width 100%
        height: 31.25vw
</style>
