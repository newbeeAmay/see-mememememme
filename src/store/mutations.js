export default {
   //做一个判断后加入购物车
   addCount(state,payload) {
    payload.count++;
  },
  addToCart(state,payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }
}