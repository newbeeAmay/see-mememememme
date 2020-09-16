<template>
  <div>
    <nav-bar>
      <div slot="left" class="backImage">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in titles" :key="index"
         class="item" :class="{active: currentIndex === index}" @click="changeTitle(index)">
         {{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNav',
   components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评价','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    changeTitle(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .center{ 
    display: flex;
  }
  .item {
    flex: 1;
  }
  .active {
    color:red;
  }
  .backImage {
    margin-top: 5px;
  }
</style>