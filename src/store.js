import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //保存用户信息
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : [],
    //保存购物车商品信息
    cartsProducts: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    
  },
  mutations: {
    addUserInfo: (state, userInfo) => {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    clearUserInfo: (state, userInfo) => {
      localStorage.setItem("userInfo", "");
    },
    addToCart: (state, pObj) => {
      if (pObj.hasProduct) {
        state.cartsProducts[pObj.pIndex].chooseNum += pObj.productInfo["chooseNum"];
      } else {
        state.cartsProducts.push(pObj.productInfo);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartsProducts));
    },

    add(state, pIndex) {
      state.cartsProducts[pIndex].chooseNum++;
      localStorage.setItem("cartItem", JSON.stringify(state.cartsProducts));
    },
    reduce(state, pIndex) {
      if(state.cartsProducts[pIndex].chooseNum < 0) {
        state.cartsProducts[pIndex].chooseNum--;
      } else {
        state.cartsProducts[pIndex].chooseNum = 1;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartsProducts));
    },
    delete(state, pIndex) {
      state.cartsProducts.splice(pIndex, 1);
      localStorage.setItem("cartItem", JSON.stringify(state.cartsProducts));
    },
    deleteMore(state, arr) {
      for(let i = arr.length - 1; i >= 0; i--) {
        state.cartsProducts.splice(arr[i], 1);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartsProducts));
    },
    updateHistory(state, arr) {
      let [id, cache] = arr;
      localStorage.setItem(`historyInfo_${id}`, JSON.stringify(cache));
    },
  },
  actions: {

  }
})
