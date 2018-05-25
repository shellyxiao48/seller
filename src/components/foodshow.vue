<template>
    <div class="fooddetail" ref="fooddetail">
        <div>
            <div class="image">
                <span class="icon-close" @click="close"></span>
                <img :src="food.image" >
            </div>
            <div class="foodheader">
                <div class="name">{{food.name}}</div>
                <div class="detail">
                    <span>月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                    <span >￥{{food.price}}</span>
                    <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="addcart" @click="addcart">加入购物车</div>
            </div>
            <div class="bg"></div>
            <div class="intro">
                <div class="title">商品介绍</div>
                <div class="info">
                    {{food.info}}
                </div>
            
            </div>
            <div class="bg"></div>
            <div class="intro">
                <div class="title">商品评价</div>
                <ul class="tablist">
                    <li class="all" @click="type=2">全部<span>{{count.all}}</span></li>
                    <li class="good" @click="type=0">推荐<span>{{count.good}}</span></li>
                    <li class="bad" @click="type=1">吐槽<span>{{count.bad}}</span></li>
                    
                </ul>
                <div class="selectbar" :class="{active:active}" @click="active=!active">
                    <span class="icon icon-check_circle"></span>
                    <span>只看有内容的评价</span>
                </div>
             
            </div>
            <div class="content">
                <div class="rating_item" v-for="(item,index) in foodshowlist" :key="index" >
                    <div class="date" >
                          {{item.rateTime|formatDate1}}
                    </div>
                    <div class="username">
                          {{item.username}}
                            <img :src="item.avatar" alt="">

                    </div>
                    <div class="clearfix"></div>
                    <div class="detail">
                        <span class="icon" :class="icontype[item.rateType]"></span>
                        <span class="text">{{item.text}}</span>
                    </div>
                   </div>
               </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import Vue from "vue";
import formatDate from "../common/index.js";

export default {
  data() {
    return {
      active: false,
      icontype: ["icon-thumb_up", "icon-thumb_down"],
      count: {
        all: "",
        good: "",
        bad: ""
      },
      type: 2,
      foodscroll: ""
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  created() {

      this.count.all = this.food.ratings.length;
      let goodArr= this.food.ratings.filter(ele => {
        return ele.rateType == 0;
      });
      this.count.good =goodArr.length;
      this.count.bad = this.count.all - this.count.good;
      
    Vue.nextTick(() => {
      this.foodscroll = new BScroll(this.$refs.fooddetail, {
        click: true
      });
    });
  },
  methods: {
    close() {
      this.$emit("hidefood");
    },
    addcart(){
        if(!this.food.count){
            Vue.set(this.food,"count",1);
        }else{
            this.food.count++;
            
        }
    }
  },
  computed:{
      foodshowlist(){
         let arr = [];
        let type=this.type;
          console.log(this.type)
          console.log(this.active)
          if(type===0){
            //   满意
            if(this.active){
              arr=  this.food.ratings.filter((ele)=>{
                    return (ele.text!="")&&(ele.rateType===0);
                })
            }else{
              arr= this.food.ratings.filter((ele)=>{
                    return (ele.rateType===0);
                })
            }
          }
          else if(type===1){
            //   满意
            if(this.active){
              arr=  this.food.ratings.filter((ele)=>{
                    return (ele.text!="")&&(ele.rateType===1);
                })
            }else{
              arr= this.food.ratings.filter((ele)=>{
                    return (ele.rateType===1);
                })
            }
          }else{
              if(this.active){
              arr=  this.food.ratings.filter((ele)=>{
                    return (ele.text!="");
                })
            }else{
              arr= this.food.ratings;
            }
          }

          return arr;
          
      }
  },
  filters: {
    formatDate1: function(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang="scss" scoped>
.fooddetail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  background: #fff;
  overflow: hidden;
  .image {
    width: 100%;
    height: 375px;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .icon-close {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 24px;
      background: #f3f5f7;
    }
  }
  .foodheader {
    padding: 18px;
    position: relative;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .addcart{
        position: absolute;
        right: 36px;
        font-size: 10px;
        color: #fff;
        line-height: 12px;
        padding: 6px 12px;
        border-radius: 12px;
        background-color: rgb(0, 160, 220);
        bottom: 18px;
    }
    .name {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .detail {
      font-size: 10px;
      margin-top: 8px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      span {
        margin-right: 12px;
      }
    }
    .price {
      margin-top: 18px;
      span:nth-of-type(1) {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }
      span:nth-of-type(2) {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 24px;
      }
    }
  }
  .bg {
    width: 100%;
    height: 16px;
    background: #f3f5f7;
  }
  .intro {
    padding: 18px 18px 0;
    .title {
      font-size: 15px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 6px;
    }
    .info {
      margin: 6px 8px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
    .tablist {
      overflow: hidden;
      margin: 18px 0;
      display: flex;
      li {
        padding: 8px;
        width: 80px;
        text-align: center;
        font-size: 12px;
        color: rgb(255, 255, 255);
        line-height: 16px;
        border-radius: 1px;
        margin-right: 8px;
        span {
          font-size: 8px;
        }
        &.all {
          background: rgb(0, 160, 220);
        }
        &.good {
          background: #ccecf8;
          color: rgb(77, 85, 93);
        }
        &.bad {
          background: rgba(77, 85, 93, 0.2);
          color: rgb(77, 85, 93);
        }
      }
    }
    .selectbar {
      padding: 12px 0;
      border-top: 1px solid #ccc;

      .icon-check_circle {
        color: #ccc;
        font-size: 24px;
        vertical-align: middle;
      }
      &.active {
        .icon-check_circle {
          color: #45ff45;
        }
      }
    }
  }
  .content {
    padding: 0 18px;
    border-top: 1px solid #ccc;
    .rating_item {
      padding: 8px 0;
      border-bottom: 1px solid #ccc;
      .date,
      .username {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 24px;
        float: left;
      }
      .username {
        float: right;
        img {
          margin-left: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
      .clearfix {
        display: block;
        clear: both;
        content: "";
      }
      .detail {
        margin-top: 6px;
        .icon {
          font-size: 12px;
          line-height: 24px;
        }
        .text {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 16px;
        }
      }
      .icon-thumb_up {
        color: rgb(0, 160, 220);
      }
      .icon-thumb_down {
        color: rgb(183, 187, 191);
      }
    }
  }
}
</style>
