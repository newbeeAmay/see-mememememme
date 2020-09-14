<template>
  <div class="tab">
    <div v-for="(item,index) in titles" :key="index" class="tab-item" 
    :class="{active: currentIndex===index}" @click="changeitem(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default : ['流行','新型','精选']
    }
  },
  methods: {
    changeitem(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style>
.tab {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.tab-item {
  flex: 1;
}
.active {
  color: red
}
.active span {
 border-bottom: 1px solid #000;
 padding: 5px;
   }
</style>