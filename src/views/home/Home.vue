<template>
 <div id="home" >
   <nav-bar class="home-nav"><div slot="center">chongchoncghong</div></nav-bar>
    <tab-control ref="tabControl1" :titles="['流行','新型','精选']" 
    class="tab-control" @qwe="titleChange" v-show="isTabFixed" />
   <better-scroll class="content" ref="bscroll" 
   :probe-type="3" :pullUpLoad="true" @pullingUp="loadMore"
    @scroll="contentScroll">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends" class="recommend"></recommend-view>
    <feature-view/>   
    <tab-control ref="tabControl2" :titles="['流行','新型','精选']" 
     @qwe="titleChange"  />
    <good-list :goods="showGoods"></good-list>
    </better-scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
 </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import BetterScroll from 'components/common/scroll/Scroll'

import TabControl from  'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/backTop'


import HomeSwiper from './childComps/HomeSwiper' 
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
 
import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import { backTopMixin } from 'common/mixin'

  export default {
    name: "Home",
    components: {
        NavBar,
        BetterScroll,

      TabControl,
      GoodList,

      HomeSwiper,
    
      RecommendView,
      FeatureView
    },
    data() {
      return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0    
      }
    },
    mixins: [backTopMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.bscroll.scrollTo(0,this.saveY,0)
      this.$refs.bscroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.bscroll.getScrollY
      // console.log(this.saveY);
    },
    created() {
      //1.请求多个数据
     this.getHomeMultidata()
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    //监听item中图片的加载   
    },
    mounted() {
      const refresh = debounce(this.$refs.bscroll.refresh,300)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
      //2.获取tabcontrol的offsettop
      //所有组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods: {
      titleChange(index) {
          switch(index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
      // backTop() {
      //    this.$refs.bscroll.scrollTo(0,0)
      // },
      //backtop的显示与隐藏
      contentScroll(position) {
        this.isShow = (-position.y) > 1000
        //决定tabconteol是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.bscroll.finishPullUp()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 拿数据
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
               this.banners = res.data.banner.list
               this.recommends = res.data.recommend.list;
        })          
          },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {       
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
       },
    }
  }
</script>


<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
 .home-nav {
   background-color: pink;
   color: #ffffff;
   /* width: 350px; */
/* 
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 9; */
 }
 .tab-control {
   position: relative;
   z-index: 9;
 }
 .content {
   /* height: 400px; */
   position: absolute;
   top: 44px;
   bottom: 49px;
   overflow: hidden;
   /* margin-top: 44px; */
 }
</style>
