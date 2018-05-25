<template>
  <div id="app">
    <my-header :seller="seller" @isshow="isshow=true"></my-header>
    <div class="mytab">
    <router-link to="/"  >商品</router-link>
    <router-link to="/ratings">评价</router-link>
    <router-link to="/shop" >商店</router-link>
    </div>
    <router-view :seller="seller"></router-view>
    <div class="showlayer" v-show="isshow">
      <div class="innerlayer">
        <div class="header">
          <div class="title">
             {{seller.name}}
          </div>
          <my-star :scores=seller.serviceScore></my-star>
        </div>
        <div class="header-title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <div class="discountwrapper">
        <div class="supports"  v-if="seller.supports" v-for="(item,index) in seller.supports" :key="index">
          <span class="logoicon" :class="logoclass[item.type]" ></span>
          <span class="supports_description">  {{item.description}} </span>
        </div>

        </div>
         <div class="header-title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
          
        </div>
        <div class="discountwrapper bulletin">
              {{seller.bulletin}}

        </div>
        <span class="icon-close" @click="isshow=false"></span>
      </div>
      



    </div>
  </div>
</template>

<script>
import myHeader from "./components/header";
import myStar from "./components/star_control";
import axios from "axios";
import "../static/css/reset.css";
import "../static/css/style.css";

export default {
  name: "App",
  data() {
    return {
      seller: {},
      isshow:false,
      logoclass: ["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  components: {
    myHeader: myHeader,
    myStar
  },
  created() {
    axios.get("sell/seller").then(res => {
      if (res.data.code === 0) {
        // this.$store.commit("setSeller",res.data.data);
        this.seller = res.data.data;
      }
    });
  },
  methods:{
    close(){

    }
  }
};
</script>
<style lang="scss">
.mytab {
  height: 40px;
  width: 100%;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  a {
    flex: 1;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.router-link-exact-active {
      color: rgb(240, 20, 20);
    }
  }
}
.showlayer {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(7, 17, 27, 0.8);
  .header {
    padding-bottom: 28px;

    .title {
      margin: 64px auto 16px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
    }
    .star_wrapper {
      height: 24px;
      margin: 0 auto;
      text-align: center;
      img {
        height: 24px;
        width: 24px;
        margin: 0 12px;
      }
    }
  }
  .header-title{
    display: flex;
    align-items: center;
    margin: 0 36px;
    .line{
      width: 110px;
      flex: 0 0 110px;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }
    .text{
      margin: 0 12px;
      color: #fff;
      font-size: 14px;
      line-height: 14px;
      font-weight: 700;
    }
  }
  .discountwrapper {
    margin: 0 36px;
    padding: 24px 12px 16px;
    color: #fff;
    &.bulletin{
      line-height: 24px;
    }
    .supports {
      margin-bottom: 12px;
      .supports_description {
        margin-left: 6px;
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
      }
    }
  }
  .icon-close{
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    color: rgba(255,255,255,0.5);
  }
  .decrease {
    background: url("/static/img/decrease_2@2x.png");
  }
  .discount {
    background: url("/static/img/discount_2@2x.png");
  }
  .guarantee {
    background: url("/static/img/guarantee_2@2x.png");
  }
  .invoice {
    background: url("/static/img/invoice_2@2x.png");
  }
  .special {
    background: url("/static/img/special_2@2x.png");
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

