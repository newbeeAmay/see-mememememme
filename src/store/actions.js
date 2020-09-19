export default {
  addCart(context,payload) {
   return new Promise((resolve,reject) => {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if(oldProduct) {
      context.commit('addCount',oldProduct);
      resolve('当前的商品数量+1')
    } else {
      payload.count = 1;
      context.commit('addToCart',payload);
      resolve('当前的商品已加入购物车')
    }
   })
  }
}