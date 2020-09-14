<template>
 <div id="home" >
   <nav-bar class="home-nav"><div slot="center">chongchoncghong</div></nav-bar>
   <better-scroll class="content" ref="bscroll" 
   :probe-type="3" :pullUpLoad="true"
    @scroll="contentScroll"
     @pullingUp="loadMore">
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends" class="recommend"></recommend-view>
    <feature-view/>   
    <tab-control :titles="['流行','新型','精选']" class="tab-control" @qwe="titleChange" />
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

  export default {
    name: "Home",
    components: {
        NavBar,
        BetterScroll,

      TabControl,
      GoodList,
      BackTop,

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
      isShow: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
     this.getHomeMultidata()
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
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
          // console.log(this.goods[this.currentType].list);
      },
      backTop() {
         this.$refs.bscroll.scrollTo(0,0)
        //  console.log(this.goods[this.currentType].list);
      },
      contentScroll(position) {
        // console.log(position);
        this.isShow = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.bscroll.scroll.finishPullUp()
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
               this.banners = res.data.banner.list
               this.recommends = res.data.recommend.list;
        })          
          },
      getHomeGoods(type) {
           const page = this.goods[type].page + 1
          //  console.log(page);
         getHomeGoods(type,page).then(res => {       
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // this.$refs.bscroll.scroll.finishPullUp()
       })
        
       },
    }
  }
</script>


<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
}
 .home-nav {
   background-color: pink;
   color: #ffffff;
   /* width: 350px; */

   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 9;
 }
 .tab-control {
   position: sticky;
   top: 44px;
   z-index: 9;
   background-color: #fff;
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
