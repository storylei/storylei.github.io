<template>
<div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="showSwiper">
        <!-- slides -->
        <swiper-slide v-for="item of list" :key="item.id">
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
    props: {
        list: Array
    },
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                loop: true
            }
        }
    },
    computed: {
        showSwiper () {
            return this.list.length
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
