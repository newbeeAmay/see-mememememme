<template>
  <div>
      <img :src="goodsItem.image" alt="">
      <div>
          <p>{{goodsItem}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="cfav">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
      goodsItem: {
          type: Object,
          default() {
              return {}
          }
      }
  }
}
</script>

<style>

</style>