<template>
  <div class="cartlist">
    <better-scroll class="content" ref='scroll'>
    <cart-list-item
    v-for="(item,index) in cartList"
    :key="index" 
    :itemInfo="item">
    </cart-list-item>
    </better-scroll>
  </div>
</template>

<script>
import BetterScroll from 'components/common/scroll/Scroll'

import CartListItem from  './CartListItem'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartListItem,
    BetterScroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cartlist {
  height: calc(100% - 44px - 49px);
  /* width: 100%; */
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>