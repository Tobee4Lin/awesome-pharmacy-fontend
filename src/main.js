import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from '../node_modules/iview/dist/iview';
import 'iview/dist/styles/iview.css';

import axios from '../axiosTool';
import "@/assets/font/iconfont.css";
import "@/assets/css/normalize.css";

Vue.use(iView);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    if (localStorage.getItem("is_login") == "true") { // 已经登陆
      next();     // 正常跳转到你设置好的页面
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next({ path: '/login', query: { Rurl: to.fullPath } });
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
