<template>
    <div class="goods">
        <!-- $refs -->
        <div class="menulist" ref="menulist">
 <ul >
            <li v-for="(item,index) in goods" :key="index" @click="selectIndex(index,$event)" :class="{current:calHeight===index}">
                <div class="menuitem">
                 <span v-if="item.type>0" class="logoicon " :class="classMap[item.type]">

                </span>
                <span class="text-wrapper">
                      {{item.name}}
                </span>
                </div>
               
                
              
            </li>
        </ul>
        </div>
       
       
        <div class="foodswrapper" ref="foodswrapper">
            <div>
                   <div class="food_item" v-for="(item,index) in goods" :key="index">
                <div class="food_item_title">
                    {{item.name}}
                </div>
                <div class="food_item_list" v-for="(value,key) in item.foods" :key="key">
                <div class="food_item_inner">
                    <div class="image">
                         <img :src="value.image">
                    </div>
                    <div class="textcontent">
                        <div class="name"> {{value.name}} </div>
                        
                        <div class="description" v-if="value.description">
                            {{value.description}}
                        </div>
                        <div class="detail">
                            <span>月售{{value.sellCount}}</span>
                            <span>好评率{{value.rating}}</span>
                        </div>
                        <div class="price">
                            <span>￥{{value.price}}</span>
                            <span v-if="value.oldPrice">￥{{value.oldPrice}}</span>
                        </div>
                        <div class="cart-control-wrapper">
                          <cart-control :food=value></cart-control>
                        </div>
                    </div>
                    </div>
                    
                    

                </div>
                
            </div>
                </div>
         
        </div>
        <my-cart :minPrice="seller.minPrice"  :deliveryPrice="seller.deliveryPrice" :selectfood=selectFoods  ></my-cart>

    </div>
   
</template>
<script>
import axios from "axios";
import vue from "vue";
import BScroll from "better-scroll";
import myCart from "../components/cart";
import cartControl from "../components/cartcontrol";

export default {
  name: "goods",
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    cartControl: cartControl,
    myCart: myCart
  },
  data() {
    return {
      goods: [],
      menuScroll: null,
      foodScroll: null,
      heightList: [],
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      scrollY: 0
    };
  },
  created() {
    // console.log(this.$store.state.goods);
    axios.get("sell/goods").then(res => {
      if (res.data.code === 0) {
        this.goods = res.data.data;
        // this.$store.commit("setgoods",res.data.data);
        console.log(this.goods);
        vue.nextTick(() => {
          // DOM挂载和渲染都已完成
          this._initscroll();
          this._caculateHeight();
        });
      }
    });
  },
  methods: {
    selectIndex(index, event) {
      if (!event._constructed) {
        // 忽略scroll事件
        return;
      }
      let foodList = this.$refs.foodswrapper.getElementsByClassName(
        "food_item"
      );
      this.foodScroll.scrollToElement(foodList[index], 300);
    },

    _initscroll() {
      this.menuScroll = new BScroll(this.$refs.menulist, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodswrapper, {
        probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _caculateHeight() {
      let foodList = this.$refs.foodswrapper.getElementsByClassName(
        "food_item"
      );
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.heightList.push(height);
      }
      console.log(this.heightList);
    }
  },
  computed: {
    calHeight() {
      // console.log(this.scrollY)
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      console.log(this.goods);
      if (this.goods.length !== 0) {
        this.goods.forEach(ele => {
          ele.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
      }
      return foods;
    }
  }
};
</script>
<style lang="scss">
.goods {
  display: flex;
  position: absolute;
  top: 180px;
  bottom: 48px;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  .menulist {
    flex: 0 0 80px;
    width: 80px;
    background: #f4f5f7;
    font-size: 12px;
    color: rgb(0, 0, 0);
    font-weight: 200;
    li {
      height: 54px;
      line-height: 14px;
      padding-left: 12px;
      .menuitem {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        height: 54px;
      }
      &.current {
        background: #fff;
      }
    }
  }
  .foodswrapper {
    flex: 1;
    .food_item {
      .food_item_title {
        font-size: 12px;
        color: rgb(147, 153, 159);
        border-left: 2px solid #d9dde1;
        background: #f3f5f7;
        height: 26px;
        line-height: 26px;
        padding-left: 14px;
      }
      .food_item_list {
        padding: 0 18px;
        position: relative;
        .food_item_inner {
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          padding: 18px 0;
          display: flex;
          .image {
            width: 60px;
            flex: 0 0 60px;
            height: 60px;
            img {
              width: 100%;
              height: 100%;
              background-size: cover;
            }
          }
          .textcontent {
            margin-left: 10px;

            flex: 1;
            .name {
              margin-top: 2px;
              font-size: 14px;
              color: rgb(7, 17, 27);
              line-height: 14px;
            }
            .description {
              margin-top: 8px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 10px;
            }
            .detail {
              margin-top: 8px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 10px;
              span:nth-of-type(2) {
                margin-left: 12px;
              }
            }
            .price {
              margin-top: 8px;
              span:nth-of-type(1) {
                font-size: 14px;
                color: rgb(240, 20, 20);

                font-weight: 700;
                line-height: 24px;
              }
              span:nth-of-type(2) {
                font-size: 10px;
                font-weight: normal;
                line-height: 24px;
                color: rgb(147, 153, 159);
                text-decoration: line-through;
              }
            }
            .cart-control-wrapper {
              position: absolute;
              right: 18px;
              bottom: 18px;
            }
          }
        }
      }
    }
  }
}

.decrease {
  background: url("/static/img/decrease_3@2x.png");
}
.discount {
  background: url("/static/img/discount_3@2x.png");
}
.guarantee {
  background: url("/static/img/guarantee_3@2x.png");
}
.invoice {
  background: url("/static/img/invoice_3@2x.png");
}
.special {
  background: url("/static/img/special_3@2x.png");
}
.logoicon {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: top;
  background-size: 100% 100%;
}
</style>
