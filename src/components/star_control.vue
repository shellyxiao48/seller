<template>
    <div class="star_wrapper">
            <img :src="objimg.star_on" alt="" v-for="item1 in onnumber"  v-if="onnumber">
            <img :src="objimg.star_half" alt="" v-for="item2 in halfnumber"   v-if="halfnumber">
            <img :src="objimg.star_off" alt="" v-for="item3 in offnumber"   v-if="offnumber">
           
      
    </div>
</template>
<script>
export default {
  name: "myStar",

  data() {
    return {
      objimg: {
        star_off: "/static/img/star36_off@2x.png",
        star_half: "/static/img/star36_half@2x.png",
        star_on: "/static/img/star36_on@2x.png"
      }
    };
  },
  props: {
    scores: {
      type: Number
    }
  },
  computed: {
    onnumber() {
      let num = Math.floor(this.scores);
      let onDecimal = this.scores - num;
      if (onDecimal > 0.75) {
        num++;
      }
      return num;
    },
    halfnumber() {
      let halfnum = 0;
      let onDecimal = this.scores - Math.floor(this.scores);
      if (onDecimal <= 0.75 && onDecimal > 0.25) {
        halfnum++;
      }
      return halfnum;
    },
    offnumber() {
      return 5 - this.onnumber - this.halfnumber;
    }
  }
};
</script>
<style lang="scss" scoped>
.star_wrapper {
  margin: 0 12px;
  font-size: 0;

  img {
    width: 13px;
    display: inline-block;
  }
}
</style>
