<template>
    <div class="detail">
        <detail-banner :name="sightName" :imgUrl="bannerImg" :galleryImgs="galleryImgs"></detail-banner>
        <detail-header></detail-header>
        <detail-list :list="list"></detail-list>
    </div>
</template>

<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
import axios from 'axios'

export default {
    name: 'Detail',
    components: {
        DetailBanner,
        DetailHeader,
        DetailList
    },
    data () {
        return {
            list: [],
            sightName: '',
            bannerImg: '',
            galleryImgs: []
        }
    },
    mounted () {
        this.getDetailInfo()
    },
    methods: {
        getDetailInfo () {
            axios.get('/api/detail.json', {
                params: {
                    id: this.$route.params.id
                }
            }).then(this.handleGetDetailSucc)
        },
        handleGetDetailSucc (res) {
            res = res.data
            console.log('success:', res)
            if (res.ret && res.data) {
                const data = res.data
                this.sightName = data.sightName
                this.bannerImg = data.bannerImg
                this.galleryImgs = data.galleryImgs
                this.list = data.categoryList
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl'
.detail
    height 50rem
</style>
