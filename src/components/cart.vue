<template>
    <div class="cartfooter">
      <div class="footer">
        <div class="carticon" @click="show=!show">
            <div class="bg" :class="{active:totalnum}" >
                <span class="icon icon-shopping_cart" ></span>
                <span class="shopnum" v-show="totalnum">{{totalnum}}</span>
            </div>
        </div>
        <span class="price" :class="{hasprice:totalprice>0}">￥{{totalprice}}</span>
        <span class="delivery">另需配送费￥{{deliveryPrice}}元</span>
        <div class="startsend" :class="{ok:totalprice>=minPrice}">  {{inform}}</div>
      </div>
      <div class="cart-list-wrapper" v-show="show">
        <div class="cart-layer" @click="show=!show"></div>
        <div class="cart-list">
          <div class="cart-header">
            购物车
            <span class="reset" @click="reset">清空</span>
          </div>
          <div class="cart-content" ref="cartcontent">
            <div class="cart-item" v-for="(item,index) in selectfood" :key="index" v-if="selectfood.length>0">
              <span class="name">{{item.name}}</span>
               <div class="rightpart">
                <span class="itemprice"><em>￥</em><span>{{item.price}}</span></span>
               <cart-control :food=item :type='1'></cart-control>
                
              </div>

            </div>

          </div>
        </div>
      </div>
       
    </div>
    
</template>
<script>
import cartControl from "../components/cartcontrol";
export default {
  name: "myCart",
  components: {
    cartControl: cartControl
  },
  data() {
    return {
      show: false
    };
  },
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    },
    selectfood: {
      type: Array
    }
  },
  computed: {
    totalnum() {
      let totalnum = 0;
      console.log(this.selectfood);
      this.selectfood.forEach(ele => {
        totalnum += ele.count;
      });
      return totalnum;
    },
    totalprice() {
      let totalprice = 0;
      this.selectfood.forEach(ele => {
        totalprice += ele.count * ele.price;
      });
      return totalprice;
    },
    inform() {
      if (this.totalprice == 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalprice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalprice}`;
      } else {
        return `去结算`;
      }
    }
  },
  methods:{
    reset(){
      this.selectfood.forEach((ele)=>{
        ele.count=0;
      });
    }
  }
};
</script>
<style lang="scss">
.cartfooter {
  position: fixed;
  z-index: 98;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  box-sizing: border-box;
  background: #141d27;
  color: rgba(255, 255, 255, 0.4);
  .footer {
    padding-left: 80px;
    .carticon {
      background: #141d27;
      position: absolute;
      width: 44px;
      height: 44px;
      padding: 7px;
      border-radius: 50%;
      bottom: 8px;
      left: 18px;
      text-align: center;
      line-height: 48px;
      .bg {
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        position: relative;
        &.active {
          background: rgb(0, 160, 220);
          .icon {
            color: #fff;
          }
        }
        .icon {
          font-size: 24px;
          line-height: 44px;
          text-align: center;
        }
        .shopnum {
          position: absolute;
          font-size: 9px;
          line-height: 16px;
          padding: 2px 4px;
          background: rgb(240, 20, 20);
          color: rgb(255, 255, 255);
          width: 24px;
          border-radius: 20px;
          font-weight: 700;
          text-align: center;
          top: -8px;
          left: 25px;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
        }
      }
    }
    .price {
      font-size: 16px;
      font-weight: 700;
      margin: 12px 0;
      padding-right: 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      &.hasprice {
        color: #fff;
      }
    }
    .delivery {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
      font-weight: 700;
      margin-left: 12px;
    }
    .startsend {
      position: absolute;
      width: 105px;
      height: 100%;
      font-size: 16px;
      font-weight: 700;
      padding: 8px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.4);
      right: 0;
      bottom: 0;
      line-height: 32px;
      text-align: center;
      &.ok {
        color: #fff;
        background: green;
      }
    }
  }

  .cart-list-wrapper {
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 48px;
    width: 100%;
    display: flex;
    .cart-layer {
      width: 100%;
      height: 100%;
      flex: 1;
      left: 0;
      background: rgba(7, 17, 27, 0.6);
    }
    .cart-list {
      width: 100%;
      position: fixed;
      bottom: 48px;
      background: #fff;
      .cart-header {
        width: 100%;
        background: #f3f5f7;
        font-size: 14px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 40px;
        padding-left: 18px;
        height: 40px;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .reset {
          position: absolute;
          font-size: 12px;
          color: rgb(0, 160, 220);
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .cart-content {
        .cart-item {
          display: flex;
          height: 48px;
          line-height: 48px;
          padding: 0 18px;
          justify-content: space-between;
          .name {
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .rightpart {
            display: flex;
            .itemprice {
              margin-right: 12px;
              
              color: rgb(240, 20, 20);
              em {
                font-style: normal;
                font-size: 12px;
              }
              span {
                font-weight: 700;
                font-size: 14px;
              }
            }
            
          }
        }
      }
    }
  }
}
</style>
