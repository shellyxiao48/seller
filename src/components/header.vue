<template>
    <div class="header">
        <div class="headercontent">
                  <img :src="seller.avatar" alt="" class="avatar">
            <div class="rightdetail">
                    <div class="sellername">
                        <span class="label"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                            {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div class="supports"  v-if="seller.supports">
                                <span class="logoicon" :class="logoclass[seller.supports[0].type]" ></span>
                                <span class="supports_description">  {{seller.supports[0].description}} </span>
                               

                    </div>
                    <div class="supports_num" v-if="seller.supports" @click="isshow=true">
                        <span class="num">{{seller.supports.length}}</span>
                        <span class="icon icon-keyboard_arrow_right"></span>
                      
                    </div>
            </div>
            
        </div>
        <div class="bulletin"  @click="isshow=true">
                  <div class="bulletinlabel"></div>
                  <span class="text">{{seller.bulletin}} </span>
                  <span class="icon icon-keyboard_arrow_right"></span>
        </div>
        <div class="bg">
          <img :src="seller.avatar" alt="">
        </div>
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
        <div class="discountwrapper bulletins">
              {{seller.bulletin}}

        </div>
        <span class="icon-close" @click="isshow=false"></span>
      </div>
      



    </div>
    </div>
</template>
<script>
import myStar from "../components/star_control";

export default {
  name: "my-header",
  data() {
    return {
      logoclass: [],
       isshow:false
    };
  },
   components: {
    myStar
    // ,
  //  foodshow

  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.logoclass = [
        "decrease","discount","special","invoice","guarantee"

    ];
  },
  methods:{
    showall(){
       this.$emit('isshow');//触发父组件的isshow事件
    }
  }
};
</script>
<style lang="scss" scoped>
$colorw: rgb(255, 255, 255);

.header {
  overflow: hidden;
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  
  .headercontent {
    display: flex;
    margin: 24px 0 18px 0;
    .avatar {
      margin: 0 16px 0 24px;
      width: 64px;
      height: 64px;
      border-radius: 4px;
    }
    .rightdetail {
      position: relative;
      flex: 1;
      .sellername {
        .label {
          background: url("/static/img/brand@2x.png") 0 0 no-repeat;
          background-size: 100% 100%;
          width: 40px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
        }
        .name {
          font-size: 16px;
          vertical-align: middle;
          color: $colorw;
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        margin-top: 8px;
        font-size: 12px;
        color: $colorw;
        font-weight: 200;
        line-height: 12px;
      }
      .supports {
        margin: 10px 4px 2px 0;

       
        .supports_description {
          vertical-align: middle;
          font-size: 10px;
          color: $colorw;
          font-weight: 200;
          line-height: 12px;
        }
      }
      .supports_num {
        position: absolute;
        line-height: 12px;
        font-size: 10px;
        background: rgba(0, 0, 0, 0.2);
        color: rgb(255, 255, 255);
        border-radius: 20px;
        padding: 7px 8px;
        right: 12px;
        bottom: 0;
        
      }
    }
  }
  .bulletin {
    position: relative;
    height: 28px;
    font-size: 10px;
    color: $colorw;
    font-weight: 200;
    line-height: 28px;
    background: rgba(7, 17, 27, 0.2);
    padding: 0 20px 0 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .bulletinlabel {
      position: absolute;
      left: 12px;
      width: 24px;
      height: 16px;
      top: 5px;
      background: url("/static/img/bulletin@2x.png");
      background-size: 100% 100%;
    }
    .icon {
        top: 8px;
      position: absolute;
      right: 12px;
    }
    
  }
  .bg{
    position: absolute;
    
    top: 0;
    left: 0;bottom: 0;
    right: 0;
    z-index: -1;
      text-align: center;
    
    img{
      background-size: cover;
        filter: blur(10px);
    }
  }
  .showlayer {
  position: fixed;
  z-index: 99;
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
    &.bulletins{
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
          width: 15px;
          height: 15px;
          vertical-align: middle;
          background-size: 100% 100%;
        }
</style>
