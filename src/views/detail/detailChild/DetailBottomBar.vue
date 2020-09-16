<template>
  <div class="car">
    <button class="btn" @click="addCart">加入购物车</button>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}

</script>

<style scoped>
 .car {
   position: fixed;
   bottom: 10px;
   right: 10px;
   display: flex;
   text-align: center;
   font-size: 14px;
 }
 .btn {
   width: 90px;
   height: 50px;
   background-color: #ffffff;
 }

</style>