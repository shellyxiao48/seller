<template>
    <div class="ratings_wrapper" ref="ratingdetail">
      <div>
        <div class="totalpart">
            <div class="totalratings">
                <div class="num">{{seller.score}}</div>
                <div class="label">综合评分</div>
                <div class="ratingsdetail">高于周边商家{{seller.rankRate}}</div>
            </div>
            <div class="star">
                <div class="items">
                    <span class="lebel">服务态度</span>
                      <my-star :scores=seller.serviceScore></my-star>
                    <span class="starscore">{{seller.serviceScore}}</span>
                    
                    </div>
                <div  class="items">
                    <span class="lebel">食物分数</span>
                    <my-star :scores=seller.foodScore></my-star>
                     <span class="starscore">{{seller.foodScore}}</span>
                </div>
                <div  class="items">
                    <span class="lebel">送达时间</span>
                <span class="deliveryTime"> {{seller.deliveryTime}}分钟</span>
               
                </div>
            </div>
        </div>
        <div class="bg"></div>
        <div class="ratings_detail_wrapper">
            <ul class="ratings_type">
                <li class="all" @click="type=2">全部 <span>{{count.all}}</span></li>
                <li class="good" @click="type=0">满意<span>{{count.good}}</span></li>
                <li class="bad" @click="type=1">不满意<span>{{count.bad}}</span></li>
            </ul>
             <div class="selectbar" :class="{active:active}" @click="active=!active">
                <span class="icon icon-check_circle"></span>
                <span>只看有内容的评价</span>
            </div>
            <div class="content">
                <div class="rating_item" v-for="(item,index) in showratings" :key="index" >
                    <div class="img">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="detail">
                        <div class="username">
                            {{item.username}}
                        </div>
                        <div class="server">
                            <my-star :scores=item.score></my-star>
                            <div class="deliverytime" v-if="item.deliveryTime">
                                {{item.deliveryTime}}分钟送达
                            </div>
                        </div>
                        <div class="text">{{item.text}}</div>
                        <div class="recommendcontent">
                            <span class="icon" :class="icontype[item.rateType]"></span>
                            <ul class="recom">
                    <li class="recommend" v-for="(list,index2) in item.recommend" :key="index2">
                                {{list}}
                            </li>
                            </ul>
                            
                        </div>
                    </div>
                    <div class="date">
                       {{item.rateTime}}
                    </div>
                </div>
            </div>
        </div>
</div>
    </div>
</template>
<script>
import axios from "axios";
import myStar from "../components/star_control";
import BScroll from "better-scroll";
import Vue from "vue";

export default {
  name: "ratings",
  data() {
    return {
      ratings: [],
      type: 2,
      active: false,
      icontype: ["icon-thumb_up", "icon-thumb_down"],
      count: {
        all: "",
        good: "",
        bad: ""
      },
      ratingscroll:null
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    myStar
  },
  computed: {
    showratings() {
      let arr = [];
      let _this = this;
        if (_this.type == 2) {
          if (_this.active) {
            _this.ratings.forEach(function(ele) {
              if (ele.text != "") {
                arr.push(ele);
              }
            });
          } else {
            _this.ratings.forEach(function(ele) {
              arr.push(ele);
            });
          }

          _this.count.all = arr.length;
        } else {
          if (_this.active) {
            _this.ratings.forEach(function(ele) {
              if (ele.rateType == _this.type && ele.text != "") {
                arr.push(ele);
              }
            });
          } else {
            _this.ratings.forEach(function(ele) {
              if (ele.rateType == _this.type) {
                arr.push(ele);
              }
            });
          }
          if (_this.type == 0) {
            _this.count.good = arr.length;
          } else {
            _this.count.bad = arr.length;
          }
        }
      return arr;
    }
  },

  created() {
    Vue.nextTick(() => {
      this.ratingscroll = new BScroll(this.$refs.ratingdetail, {
        click: true
      });
    });
    axios.get("sell/ratings").then(res => {
      if (res.data.code === 0) {
        this.ratings = res.data.data;
      }
    });
  }
};
</script>
<style lang="scss">
$orange: rgb(255, 153, 0);
$black7: rgb(7, 17, 27);
$grey7: rgb(147, 153, 159);
.ratings_wrapper {
    position: absolute;
    top:180px;
    right:0;
    left:0;
    bottom:0;
  overflow: hidden;
  .totalpart {
    display: flex;
    padding: 18px 24px;
    .totalratings {
      width: 137px;
      flex: 0 0 137px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .num {
        font-size: 24px;
        color: $orange;
        line-height: 28px;
      }
      .label {
        font-size: 12px;
        color: $black7;
        line-height: 12px;
        margin-top: 6px;
      }
      .ratingsdetail {
        font-size: 10px;
        color: $grey7;
        margin-top: 8px;
      }
    }
    .star {
      padding-left: 24px;
      border-left: 1px solid $grey7;
      .items {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .lebel {
          font-size: 12px;
          color: $black7;
          line-height: 18px;
        }
        .deliveryTime {
          font-size: 12px;
          color: $grey7;
          line-height: 18px;
          margin-left: 12px;
        }
      }
    }
  }
  .bg {
    background: #f3f5f7;
    width: 100%;
    height: 16px;
    border-top: 1px solid $grey7;
    border-bottom: 1px solid $grey7;
  }
  .ratings_detail_wrapper {
    .ratings_type {
      margin: 0 24px;
      padding: 18px 0;

      border-bottom: 1px solid #ccc;
      li {
        padding: 8px;
        color: #596168;
        display: inline-block;
        margin-right: 6px;
        font-size: 14px;
      }
      .all {
        background: #00a0dc;
        color: #fff;
      }
      .good {
        background: #ccecf8;
      }
      .bad {
        background: #e9ebec;
      }
    }
    .selectbar {
      padding: 18px 24px;
      border-bottom: 1px solid #ccc;
      .icon-check_circle {
        color: #ccc;
        vertical-align: top;
      }
      &.active {
        .icon-check_circle {
          color: #45ff45;
        }
      }
    }
    .content {
      border-top: 1px solid #ccc;
      .rating_item {
        position: relative;
        margin: 0 18px;
        padding: 18px 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: flex-start;
        .img {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          img {
            border-radius: 50%;
            width: 100%;
          }
        }
        .detail {
          margin-left: 12px;
          .username {
            font-size: 10px;
            color: $grey7;
            line-height: 12px;
            margin-bottom: 4px;
          }
          .server {
            display: flex;
            margin-bottom: 6px;
            .star_wrapper {
              margin: 0;
            }
            .deliverytime {
              margin-left: 6px;
              font-size: 10px;
              font-weight: 200;
              color: rgb(147, 153, 159);
              line-height: 12px;
            }
          }
          .text {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            font-size: 12px;
            color: $black7;
            line-height: 18px;
            margin-bottom: 8px;
          }
          .recommendcontent {
            display: flex;
            align-items: flex-start;
            .icon {
              line-height: 16px;
              font-size: 12px;
              vertical-align: top;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(183, 187, 191);
            }
            .recom {
              margin-left: 8px;
              li {
                padding: 0 6px;
                width: 70px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border: 1px solid rgba(7, 17, 27, 0.1);
                color: $grey7;
                font-size: 9px;
                display: inline-block;
                line-height: 16px;
                height: 16px;
                margin-right: 8px;
                margin-bottom: 4px;
                border-radius: 2px;
              }
            }
          }
        }
        .date {
          position: absolute;
          top: 18px;
          right: 18px;
          font-size: 10px;
          font-weight: 200;
          color: $grey7;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
