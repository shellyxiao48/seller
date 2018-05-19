<template>
    <div class="cartfooter">
        <div class="carticon">
            <div class="bg" :class="{active:totalnum}" >
                <span class="icon icon-shopping_cart" ></span>
                <span class="shopnum" v-show="totalnum">{{totalnum}}</span>
            </div>
        </div>
        <span class="price">￥{{price}}</span>
        <span class="delivery">另需配送费￥{{deliveryPrice}}元</span>
        <div class="startsend">￥{{minPrice}}起送</div>
    </div>
    
</template>
<script>
export default {
  name: "myCart",
  data() {
    return {
      price: 0,
      totalnum: 0
    };
  },
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    }
  }
};
</script>
<style lang="scss">
.cartfooter {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  box-sizing: border-box;
  background: #141d27;
  color: rgba(255, 255, 255, 0.4);
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
        padding: 2px 6px;
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
  }
}
</style>
