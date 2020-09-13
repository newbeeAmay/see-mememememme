<template>
 <div id="home" >
   <nav-bar class="home-nav"><div slot="center">chongchoncghong</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view/>   
    <tab-control :titles="['流行','新型','精选']"  @qwe="tabclick" />
    <good-list :goods="goods[currentType]"></good-list>
    <ul>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
 </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from  'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'

import HomeSwiper from './childComps/HomeSwiper' 
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
 
import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components: {
        NavBar,
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
        'pop': {page: 0, list:[] },
        'news': {page: 0, list:[] },
        'sell': {page: 0, list:[] },
      },
      currentType: 'pop'
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
      getHomeMultidata() {
        getHomeMultidata().then(res => {
               this.banners = res.data.banner.list
               this.recommends = res.data.recommend.list;
        })          
          },
      getHomeGoods(type) {
           const page = this.goods[type].page + 1
         getHomeGoods(type, page).then(res => {
           console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
       })
      }
     },
    //  dasddddddddddddddsdasd事件
    tabclick(index) {
      //  console.log(index);
      switch(index) {
        case 0 :
          this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'news'
          break;
        case 2 :
         this.currentType = 'sell'
        
      }
    },

  }
</script>


<style scoped>
#home {
  padding-top: 44px;
}
 .home-nav {
   background-color: pink;
   color: #ffffff;

   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 9;
 }
</style>
