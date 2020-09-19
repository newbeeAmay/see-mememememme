<template>
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav>
    <better-scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goodsInfo"></detail-base-info>
    <detail-shop-info :shop="shopInfo"></detail-shop-info> 
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="param" :paramInfo="itemParams"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <good-list ref="goodList" :goods="goodsList"></good-list>
    </better-scroll>
    <back-top @click.native="backTop"  v-show="isShow"></back-top>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
  </div>
</template>

<script>
import  DetailNav from './detailChild/DetailNav'
import DetailSwiper from './detailChild/DetailSwiper'
import DetailBaseInfo from './detailChild/DetailBaseInfo'
import DetailShopInfo from './detailChild/DetailShopInfo'
import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
import DetailParamInfo from './detailChild/DetailParamInfo'
import DetailCommentInfo from './detailChild/DetailCommentInfo'
import DetailBottomBar from './detailChild/DetailBottomBar'

import BetterScroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/backTop'

import {getDetail,GoodsInfo,getRecommend} from 'network/detail'
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      goodsList: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: null,
    }
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    BetterScroll,
  },
  mixins: [backTopMixin],
  created() {
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goodsInfo = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      this.shopInfo = data.shopInfo
      this.detailInfo = data.detailInfo
      this.itemParams = data.itemParams
      if(data.rate.cRate !== 0) {
      this.commentInfo = data.rate.list[0]
      }
      // //渲染出来后执行这个函数,但是图片可能没渲染出来
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.goodList.$el.offsetTop - 44);
      //   console.log(this.themeTopYs);
      // })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.goodList.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      },300)
    })
    getRecommend().then(res => {
      this.goodsList = res.data.list
      // console.log(this.goodsList);
		})
  },
  mounted() {
   const refresh = debounce(this.$refs.scroll.refresh,300)
      this.$bus.$on('detailImageLoad',() => {
        refresh()
      })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      //拿到top值
      this.getThemeTopY() 
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],400)
    },
    contentScroll(position) {
      // console.log(position); 获取y值
      const positionY = -position.y
      const length = this.themeTopYs.length
      for(let i = 0; i < length -1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // for(let i = 0;i < length; i++) {
      //   if(this.currentIndex !== i &&
      //  ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY
      //   >= this.themeTopYs[i]))) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      this.isShow = positionY > 1500
    },
    backTop() {
    //    console.log(this.$refs.hasOwnProperty('scroll'));
       this.$refs.scroll.scrollTo(0,0)
    },
    addToCart() {
      // 拿到商品在购物车展示的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;
      // this.$store.commit('addList',product)
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res);
      })
    }
  },
}

</script>

<style scoped>
 #detail {
    height: 100vh;
   background-color: #fff;
   position: relative; 
   z-index: 4;
  }
  .detail-nav {
   position: relative; 
   z-index: 9;
   background-color: #fff;
  }
 .content {
   background-color: #fff;
   height: calc(100% - 44px);
 }
</style>