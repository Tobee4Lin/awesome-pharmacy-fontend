import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "/api/";

Vue.prototype.$get = function(url, params='') {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
};

Vue.prototype.$post = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
axios.defaults.transformRequest = [function (data) {
    var newData = "";
    for (var k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}];


// axios.interceptors.request.use( // 请求拦截
//     config => {
//         config.headers['X-Requested-With'] = "XMLHttpRequest";
//         return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   )

export default axios;