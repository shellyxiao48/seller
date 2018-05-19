import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods'
import Rating from '@/components/ratings'
import Shop from '@/components/shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Rating
    },
     {
      path: '/shop',
      name: 'shop',
      component: Shop
    }
  ]
})
