<template>
  <div class="tab-control">
   <div v-for="(item,index) in titles" 
   :key="index"  :class="{active:index ===currentIndex}" @click="itemclick(index)"
   class="tab-control-item">
   <span>{{item}}</span>
   </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
      titles: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data() {
      return {
          currentIndex: 0  
      }
  },
  methods: {
      itemclick(index) {
          this.currentIndex = index;
         this.$emit('qwe',index)
      }
  }
}
</script>

<style>
 .tab-control {
     display: flex;
    text-align: center;
   font-size: 18px;
   background-color: #fff;
    
 }
 .tab-control-item {
     flex: 1;
      height: 40px;
      line-height: 40px;
  }
  .active {
      color: var(--color-high-text);
     
  }
   .active span {
 border-bottom: 1px solid #000;
 padding: 5px;
   }
</style>