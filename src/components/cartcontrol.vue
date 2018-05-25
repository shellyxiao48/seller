<template>
    <div class="calwrapper">
        <span class="icon-remove_circle_outline" @click="remove($event)" v-show="food.count>0"></span>
        <span class="num" v-show="food.count>0">{{food.count}}</span>
        <span class="icon-add_circle" @click="add($event)"></span>
    </div>
</template>
<script>
import vue from 'vue'
export default {
  name: "foodcal",
  props:{
      food:{
          type:Object
      },
      type:{
          type :Number
      }
  },
  methods: {
    add($event) {
        // type 从购物车传入标志
      if ($event._constructed||this.type) {
          console.log(this.food.count);
          if(!this.food.count){
            //   新增count属性
              vue.set(this.food,"count");
              this.food.count=1;
          }else{
               this.food.count+=1;
          }
      }
    },
    remove($event) {
      if ($event._constructed||this.type) {
          if(this.food.count===0){
              return 
          }
          this.food.count--;
      }
    }
  }
};
</script>

<style lang="scss">
.calwrapper {
  .num {
    width: 24px;
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    text-align: center;
    display: inline-block;
  }
  .icon-remove_circle_outline,
  .icon-add_circle {
    font-size: 24px;
    vertical-align: middle;
    color: rgb(0, 160, 220);
    line-height: 24px;
    display: inline-block;
  }
}
</style>
