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
                                <!-- <p v-for="item in seller.supports" :key="item.type">
                                   {{item.description}} 
                                </p> -->

                    </div>
                    <div class="supports_num" v-if="seller.supports">
                        <span class="num">{{seller.supports.length}}</span>
                        <span class="icon icon-keyboard_arrow_right"></span>
                      
                    </div>
            </div>
            
        </div>
        <div class="bulletin">
                  <div class="bulletinlabel"></div>
                  <span class="text">{{seller.bulletin}} </span>
                  <span class="icon icon-keyboard_arrow_right"></span>
        </div>
        <div class="bg">
          <img :src="seller.avatar" alt="">
        </div>
        
    </div>
</template>
<script>

export default {
  name: "my-header",
  data() {
    return {
      logoclass: []
    };
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
