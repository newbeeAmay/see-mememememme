<template>
  <div class="goods">
      <good-list-item  v-for="(item,index) in goods" :goodsItem="item" :key="index"/>
  </div>
</template>

<script>
import GoodListItem from  './GoodListItem'

export default {
  name: 'GoodList',
  components: {
      GoodListItem
  },
  prop: {
      goods: {
          type: Array,
          default() {
              return []
          }
      }
  }
}
</script>

<style>
 .goods {
     display: flex;
     flex-wrap: wrap;
 }
</style>