<template>
  <div id="app">
    <my-header :seller="seller" ></my-header>
    <div class="mytab">
    <router-link to="/"  >商品</router-link>
    <router-link to="/ratings">评价</router-link>
    <router-link to="/shop" >商店</router-link>
    </div>
    <router-view :seller="seller"></router-view>
   
    <!-- <foodshow></foodshow> -->

  </div>
</template>

<script>
import myHeader from "./components/header";
// import foodshow from "./components/foodshow"
import axios from "axios";
import "../static/css/reset.css";
import "../static/css/style.css";

export default {
  name: "App",
  data() {
    return {
      seller: {}
     
    };
  },
  components: {
    myHeader: myHeader,
    // myStar
    // ,
  //  foodshow

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

</style>

