<template>
  <div class="recommend">
   <div v-for="(item,index) in recommends" :key="index"   class="recommends-item">
     <a :href="item.link">
       <img :src="item.image" alt="" class="img">
       <div>{{item.title}}</div>
     </a>
   </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 10px;
    border-bottom: 7px solid #cccccc;
  }

  .recommends-item {
    flex: 1;
  }

   .img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
