<template>
    <div>
      <header class="header">
        <div class="nav" v-if="!is_login">
          <div class="left-nav">
              <i class="iconfont icon-home"></i>
              <a href="#">天猫首页</a>
              <p>喵，欢迎来天猫</p>
              <a @click="goTo('/login')">请登录</a>
              <a @click="goTo('/register')">免费注册</a>
          </div>
          <div class="right-nav">
              <a>我的淘宝</a>
              <i class="iconfont icon-ic-cart"></i>
              <a href="/person/cart">购物车<span> 0 </span>件</a>
              <a @click="goTo('/person/collection')">收藏夹</a>
          </div>
        </div>
        <div class="nav" v-else>
          <div class="left-nav">
              <a class="sayhi" @click="getTo('/account/info')">Hi， <span>{{userInfo.account_username}}</span></a>
              <a >消息 <span style="font-weight: bold;color: #000;">2</span></a>
              <a @click="logout()">退出</a>
              <!-- <div class="manage-box">
                <p>管理中心</p>
              </div> -->
          </div>
          <div class="right-nav">
              <i class="iconfont icon-ic-cart"></i>
              <a @click="goTo('/person/cart')">购物车</a>
              <a @click="goTo('/person/collection')">收藏夹</a>
              <a @click="goTo('/order/all-order')">我的订单</a>
              <a @click="goTo('/person/footprint')">我的足迹</a>
          </div>
        </div>
        <div class="s_nav">
          <div class="logo">
            <a href="/">
              <img src="../assets/images/logo.png" alt="">
            </a>
          </div>
          <div class="tag">
            <div class="tag-box">
              <img src="../assets/images/header/top1.png" alt="">
              <p>自营正品</p>
            </div>
            <div class="tag-box">
              <img src="../assets/images/header/top2.png" alt="">
              <p>担保交易</p>
            </div>
            <div class="tag-box">
              <img src="../assets/images/header/top3.png" alt="">
              <p>满69包邮</p>
            </div>
            <div class="tag-box">
              <img src="../assets/images/header/top4.png" alt="">
              <p>药师服务</p>
            </div>
          </div>
          <div class="search-box">
            <input type="text" 
                  placeholder="搜索本店商品" 
                  class="search-input" 
                  v-model="input_content"
                  @keyup.enter="search()">
            <div class="search-btn" @click="search()">搜本店</div>
          </div>
        </div>
      </header>
    </div>
</template>

<script>
export default {
    name: "header-top",
    data() {
      return {
        is_login: false,
        userInfo: '',
        input_content: '',
      }
    },
    created() {
      //获取已登录的用户信息
      let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
      let is_login = JSON.parse(localStorage.getItem("is_login")) || false;
      this.userInfo = userInfo;
      this.is_login = is_login;
    },
    methods: {
      goTo(url) {
        this.$router.push(url);
      },
      getTo(url) {
        this.$router.push({
          path: url,
          query: {
            "uid": this.userInfo.id
          }
        });
      },
      //注销
      logout() {
        this.$get("/common/logout")
            .then(res => {
              localStorage.setItem("is_login", false);
              localStorage.setItem("userInfo", "");
              this.$Message.success("退出成功");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            })
      },
      search() {
        if(this.input_content) {
          this.$router.push({
            path: "/goods/search",
            query: {
              searchContent: this.input_content
            }
          });
        } else {
          return;
        }
      }
    }
}
</script>

<style scoped lang="less">
    .header {
      height: 27px;
      width: 100%;
      min-width: 1260px;
      background-color: #eee;
      border-bottom: 1px solid #ccc;
      margin-bottom: 100px;
      .nav {
        height: 100%;
        // padding: 0 40px;
        width: 1200px;
        margin: 0 auto;
        .left-nav {
          float: left;
          line-height: 25px;
          position: relative;
          .sayhi {
            padding: 0 5px;
            &:hover {
              background-color: #fff;
            }
          }
          // .sayhi:hover .manage-box {
          //   display: block;
          // }
          i {
            margin-right: 4px;
            position: relative;
            top: 1px;
            color: #FF0036;
            font-size: 14px;
          }
          a,p {
            height: 30px;
            display: inline-block;
            color: #999;
            margin-right: 15px;
          }
          // .manage-box {
          //   position: absolute;
          //   top: 26px;
          //   left: 0;
          //   width: 100px;
          //   height: 27px;
          //   background-color: #fff;
          //   text-align: center;
          //   line-height: 27px;
          //   border: 2px solid #eee;
          //   border-top: none;
          //   box-sizing: border-box;
          //   padding-left: 15px;
          //   cursor: pointer;
          //   display: none;
          //   z-index: 15;
          //   p {
          //     color: #aaa;
          //   }
          // }
        }

        .right-nav {
          float: right;
          text-align: right;
          i {
            color: #FF0036;
            margin-right: 4px;
          }
          a {
            color: #999;
            margin-right: 15px;
          }
        }
      }

      .s_nav {
        position: relative;
        // width: 1200px;
        padding: 0 20px;
        height: 100px;
        background-color: #fff;
        margin: 0 auto 20px;
        text-align: left;
        .logo {
          position: absolute;
          left: 40px;
          top: 50%;
          margin-top: -50px;
          width: 225px;
          height: 100%;
          line-height: 120px;
          a {
            width: 100%;
            height: 100%;
            display: block;
            img {
              width: 100%;
              height: 32px;
            }
          }
        }
        .tag {
          position: absolute;
          left: 425px;
          top: 50%;
          margin-top: -15px;
          .tag-box {
            position: relative;
            display: inline-block;
            width: 101px;
            height: 30px;
            margin-right: 20px;
            img {
              height: 100%;
              margin-right: 6px;
            }
            p {
              position: absolute;
              top: 17%;
              font-size: 14px;
              height: 100%;
              display: inline-block;
            }
          }
        }

        .search-box {
          position: absolute;
          right: 40px;
          top: 50%;
          margin-top: -17px;
          .search-input {
            float: left;
            text-indent: 10px;
            right: 80px;
            height: 36px;
            font-size: 14px;
            width: 190px;
            border: 2px solid #3E424C;
            color: #333;
            padding: 2px;
            outline: none;
          }
          .search-btn {
            float: left;
            background-color: #3E424C;
            color: #FFF;
            right: 0;
            height: 36px;
            line-height: 36px;
            border: 0;
            font-size: 16px;
            letter-spacing: 4px;
            cursor: pointer;
            padding: 0 10px;
          }
        }
      }
    }
</style>
