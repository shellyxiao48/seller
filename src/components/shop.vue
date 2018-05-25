<template>
    <div class="shop_wrapper">
    <div class="shopmsg">
        <div class="msg">
            <div class="msgheader">
                <div class="name">{{seller.name}}</div>
                
            </div>

            <div class="sellmsg">
                 <my-star :scores=seller.foodScore></my-star>
                <div class="ratingCount">({{seller.ratingCount}})</div>
                <div class="sellCount">月售{{seller.sellCount}}单</div>
                
            </div>
            <div class="likewrapper " :class="{hasfav:like}" @click="like=!like">
                    <span class="icon-favorite"></span>
                    <span class="text">{{like?"已收藏":"收藏"}}</span>
                </div>

        </div>
        <div class="deliver">
            <div class="items">
                <div class="label">起送价</div>
                <div class="cost">{{seller.minPrice}}<span>元</span></div>
                
            </div>
            <div class="items">
                <div class="label">商家配送</div>
                <div class="cost">{{seller.deliveryPrice}}<span>元</span></div>
                
            </div>
            <div class="items">
                <div class="label">平均配送时间</div>
                <div class="cost">{{seller.deliveryTime}}<span>分钟</span></div>
                
            </div>
        </div>
    </div>
     <div class="bg"></div>
     <div class="content">
         <p>公告与活动</p>
         <div class="bulletin">
             {{seller.bulletin}}
         </div>
         <div class="supportsitem" v-for="item in seller.supports" :key="item.type">
                <span class="logoicon" :class="logoclass[item.type]" ></span>
                <span class="supports_description">  {{item.description}} </span>
                            
         </div>
     </div>
     <div class="bg"></div>
     <div class="surroundings">
         <p>商家实景</p>
         <div class="pics" ref="picScroll">
                 <div class="slider-item"  ref="slideritem">
                    <img :src="item" alt="" v-for="(item,index) in seller.pics" :key="index">


             </div>
         </div>
     </div>
     <div class="bg"></div>
    <div class="shop_detailmsg">
        <p>商家信息</p>
        <div class="msglist" v-for="(item,index) in seller.infos" :key="index">
            {{item}}
        </div>
        
    </div>     
    </div>
</template>
<script>
import myStar from "../components/star_control";
import BScroll from "better-scroll";
import Vue from "vue";

export default {
  name: "shop",
  data() {
    return {
      like: false,
      picScroll: null,
      logoclass: ["decrease", "discount", "special", "invoice", "guarantee"]
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
  created() {
    Vue.nextTick(() => {
     var _this = this;
      let width = _this.seller.pics.length * 132;
      _this.$refs.slideritem.style.width = width + "px";
      Vue.nextTick(() => {
      console.log(this.seller);
          
        if (!_this.picScroll) {
          _this.scroll = new BScroll(_this.$refs.picScroll, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          _this.picScroll.refresh();
        }
      });
    });
  }
};
</script>
<style lang="scss">
$grey7: rgba(147, 153, 159, 0.2);

.shop_wrapper {
  border-top: 1px solid #ccc;
  .shopmsg {
    position: relative;

    padding: 18px 0;
    margin: 0 18px;
    .msg {
      padding-bottom: 18px;
      border-bottom: 1px solid #ccc;

      .name {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .likewrapper {
        position: absolute;
        top: 18px;
        right: 18px;

        text-align: center;
        width: 40px;
        .icon-favorite {
          font-size: 24px;
          color: rgb(7, 17, 27);
          line-height: 24px;
          margin-bottom: 4px;
          display: block;
        }
        .text {
          font-size: 10px;
          display: block;
          color: rgb(77, 85, 93);
        }
        &.hasfav {
          .icon-favorite {
            font-size: 24px;
            color: rgb(240, 20, 20);
          }
        }
      }

      .sellmsg {
        display: flex;
        align-items: center;
        .star_wrapper {
          margin: 0;
          margin-right: 8px;
        }
        .ratingCount,
        .sellCount {
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
        }
      }
    }
    .deliver {
      padding-top: 18px;
      display: flex;
      .items {
        display: flex;
        flex: 1;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        flex-direction: column;
        align-items: center;
        &:last-of-type {
          border-right: none;
        }
        .label {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .cost {
          margin-top: 4px;
          font-size: 24px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 24px;
          span {
            font-size: 10px;
          }
        }
      }
    }
  }
  .bg {
    background: #f3f5f7;
    width: 100%;
    height: 20px;
    border-top: 1px solid $grey7;
    border-bottom: 1px solid $grey7;
  }
  .content {
    padding: 18px 0 0 0;
    margin: 0 18px;
    p {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 8px;
    }
    .bulletin {
      font-size: 12px;
      padding: 0 12px;
      font-weight: 200;
      color: rgb(240, 20, 20);
      line-height: 24px;
      padding-bottom: 16px;
    }
    .supportsitem {
      padding: 16px 12px;
      border-top: 1px solid $grey7;

      .supports_description {
        margin-left: 6px;
        font-family: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 16px;
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
  .surroundings {
    padding: 18px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    p {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 12px;
    }
    .pics {
      height: 90px;
      .slider-item {
        img {
          width: 120px;
          height: 90px;
          margin-right: 12px;
        }
      }
    }
  }
  .shop_detailmsg {
    padding: 18px 0 10px 0;
    p {
      padding: 12px 0;
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 12px;
      border-bottom: 1px solid $grey7;
    }
    .msglist {
      padding: 16px 12px;
      border-bottom: 1px solid $grey7;
      font-size: 12px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      line-height: 16px;
    }
  }
  .decrease {
    background: url("/static/img/decrease_4@2x.png");
  }
  .discount {
    background: url("/static/img/discount_4@2x.png");
  }
  .guarantee {
    background: url("/static/img/guarantee_4@2x.png");
  }
  .invoice {
    background: url("/static/img/invoice_4@2x.png");
  }
  .special {
    background: url("/static/img/special_4@2x.png");
  }
  .logoicon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background-size: 100% 100%;
  }
}
</style>
