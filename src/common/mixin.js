
import BackTop from 'components/content/backTop/backTop'
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backTop() {
      if(('scroll' in this.$refs)) {
        this.$refs.scroll.scrollTo(0,0)
      } else {
        this.$refs.bscroll.scrollTo(0,0)
      }
      
   },
  }
}