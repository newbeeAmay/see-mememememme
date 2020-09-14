<template>
  <div>
    <h2>分类</h2>
    <tab :titles="['流行','新型','精选']"></tab>
    <div class="wrapper" ref="aaaa">
      <div class="content">
        <ul>
          <li>*</li>
          <li>*ad</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>dd*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*dd</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>ddd*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>dddd*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from './child/Tab'

import BScroll from 'better-scroll'
// import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    components: {
      Tab
    },
    created() {
      
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
       probeType: 3,  
       click: true,
      //  pullUpLoad: true,
       pullUpLoad: true
      })
      // this.scroll.on('scroll',(position) => {
      //   console.log(position);
      // })
      this.scroll.on('pullingUp',() => {
         console.log('asd');
         setTimeout(() => {
           this.scroll.finishPullUp()
         },2000)
      })
    },
    methods: {
      // getHomeGoods(type) {
      //   const page = this.goods[type].page + 1
      //   getHomeGoods(type,page).then((res) => {
      //     this.goods[type].list.push(...res.data.list)
      //     this.goods[type].page += 1
      //      console.log(this.goods[type].list);
      //   })
      // }
    }
  }
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: pink;
  overflow: hidden; 
}
</style>
