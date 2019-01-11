import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import FindPassword from './views/FindPassword.vue'
import FindPassword2 from './views/FindPassword2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop/Overseas',
      name: 'overseas',
      // route level code-splitting
      // this generates a separate chunk (overseas.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "overseas" */ './views/shop/Overseas.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/findpassword',
      name: 'findpassword',
      component: FindPassword
    },
    {
      path: '/findpassword2',
      name: 'findpassword2',
      component: FindPassword2
    },
    /*商品相关模块*/
    {
      path: '/goods/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/goods/Detail.vue')
    },
    {
      path: '/goods/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/goods/Search.vue')
    },
    {
      path: '/goods/searchByCategory',
      name: 'searchByCategory',
      component: () => import(/* webpackChunkName: "searchByCategory" */ './views/goods/SearchByCategory.vue')
    },
    /*用户操作模块*/
    {
      path: '/person/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ './views/person/Cart.vue'),
      meta: {   //需要用户登录
        auth: true
      }
    },
    {
      path: '/person/collection',
      name: 'collection',
      component: () => import(/* webpackChunkName: "collection" */ './views/person/Collection.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/person/footprint',
      name: 'footprint',
      component: () => import(/* webpackChunkName: "footprint" */ './views/person/FootPrint.vue')
    },
    /*订单相关模块*/
    {
      path: '/order/all-order',
      name: 'all-order',
      component: () => import(/* webpackChunkName: "all-order" */ './views/order/AllOrder.vue')
    },
    {
      path: '/order/one-detail',
      name: 'one-detail',
      component: () => import(/* webpackChunkName: "one-detail" */ './views/order/OneDetail.vue')
    },
    {
      path: '/order/detail',
      name: 'detail-name',
      component: () => import(/* webpackChunkName: "detail-name" */ './views/order/Detail.vue')
    },
    {
      path: '/order/pay',
      name: 'pay',
      component: () => import(/* webpackChunkName: "pay" */ './views/order/Pay.vue')
    },
    {
      path: '/order/comment',
      name: 'comment',
      component: () => import(/* webpackChunkName: "comment" */ './views/order/Comment.vue')
    },
    /*个人信息模块*/
    {
      path: '/account/address',
      name: 'address',
      component: () => import(/* webpackChunkName: "address" */ './views/account/Address.vue')
    },
    {
      path: '/account/info',
      name: 'info',
      component: () => import(/* webpackChunkName: "info" */ './views/account/Info.vue')
    },
  ],
  
  //控制路由跳转到页面顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
})
