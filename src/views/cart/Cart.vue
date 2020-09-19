<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车 ({{cartList.length}})
      </div>
    </nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './cartChild/CartList'
import BottomBar from './cartChild/CartBottomBar'

import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color:pink;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
</style>
