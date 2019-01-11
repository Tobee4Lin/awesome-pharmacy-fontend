<template>
  <div class="home">
      <HeaderTop />
      <div class="cat-wrap">
        <div class="cat-top">
          <span>全部商品分类</span>
          <p href="#" @click="routeTo('/shop/overseas')">海外自营馆</p>
          <p href="#" @click="routeTo('/shop/gynaecology')">妇科馆</p>
          <p href="#" @click="routeTo('/shop/health')">保健滋补馆</p>
          <p href="#" @click="routeTo('/shop/health')">医疗器械馆</p>
          <p href="#" @click="routeTo('/shop/makeup')">美妆个护馆</p>
          <p href="#" @click="routeTo('/shop/infant')">母婴馆</p>
          <!-- <p href="#" @click="routeTo('jisheng')">成人计生馆</p> -->
        </div>
        <div class="cat-content">
          <!--分类-->
          <div class="cat-left">
            <div class="cat-item" data-num="1">
              <div class="cat-item-left">
                <div class="cat-item-title">
                  <img src="../assets/images/si1.png" alt="">
                  <a href="#" target="_blank">中西药品</a>
                </div>
                <div class="cat-item-hots">
                  <a href="">补肾 </a>
                  <a href="">/ 减肥瘦身 </a>
                  <a href="">/ 皮肤癣症</a>
                </div>
              </div>
              <div class="pan-item-right hidden" data-num="1">
                <div class="pan-item clearfix" v-for="(item, index) in category1" :key="index">
                  <div class="cat-item-head">{{item.name}}</div>
                  <div class="cat-item-body">
                    <a v-for="v in item.type" @click="searchByCategoryName(v.id)" :key="v.id">{{v.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cat-item" data-num="2">
              <div class="cat-item-left">
                <div class="cat-item-title">
                  <img src="../assets/images/si1.png" alt="">
                  <a href="#" target="_blank">人群健康</a>
                </div>
                <div class="cat-item-hots">
                  <a href="">秋季养护 </a>
                  <a href="">/ 美颜瘦身 </a>
                  <a href="">/ 补钙</a>
                </div>
              </div>
              <div class="pan-item-right hidden">
                <div class="pan-item clearfix" v-for="(item, index) in category2" :key="index">
                  <div class="cat-item-head">{{item.name}}</div>
                  <div class="cat-item-body">
                    <a v-for="v in item.type" @click="searchByCategoryName(v.id)" :key="v.pid">{{v.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cat-item" data-num="3">
              <div class="cat-item-left">
                <div class="cat-item-title">
                  <img src="../assets/images/si1.png" alt="">
                  <a href="#" target="_blank">滋补调养</a>
                </div>
                <div class="cat-item-hots">
                  <a href="">保健食品 </a>
                  <a href="">/ 维钙保健 </a>
                  <a href="">/ 滋补中药</a>
                </div>
              </div>
              <div class="pan-item-right hidden">
                <div class="pan-item clearfix" v-for="(item, index) in category3" :key="index">
                  <div class="cat-item-head">{{item.name}}</div>
                  <div class="cat-item-body">
                    <a v-for="v in item.type" @click="searchByCategoryName(v.id)" :key="v.pid">{{v.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cat-item" data-num="4">
              <div class="cat-item-left">
                <div class="cat-item-title">
                  <img src="../assets/images/si1.png" alt="">
                  <a href="#" target="_blank">母婴孕产</a>
                </div>
                <div class="cat-item-hots">
                  <a href="">奶粉辅食 </a>
                  <a href="">/ 尿裤湿巾 </a>
                  <a href="">/ 妈妈专区</a>
                </div>
              </div>
              <div class="pan-item-right hidden">
                <div class="pan-item clearfix" v-for="(item, index) in category4" :key="index">
                  <div class="cat-item-head">{{item.name}}</div>
                  <div class="cat-item-body">
                    <a v-for="v in item.type" @click="searchByCategoryName(v.id)" :key="v.pid">{{v.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cat-item" data-num="5">
              <div class="cat-item-left">
                <div class="cat-item-title">
                  <img src="../assets/images/si1.png" alt="">
                  <a href="#" target="_blank">居家生活</a>
                </div>
                <div class="cat-item-hots">
                  <a href="">美妆个护 </a>
                  <a href="">/ 家庭保健 </a>
                  <a href="">/ 环境清洁</a>
                </div>
              </div>
              <div class="pan-item-right hidden">
                <div class="pan-item clearfix" v-for="(item, index) in category5" :key="index">
                  <div class="cat-item-head">{{item.name}}</div>
                  <div class="cat-item-body">
                    <a v-for="v in item.type" @click="searchByCategoryName(v.id)" :key="v.pid">{{v.name}}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--轮播-->
          <div class="swiper">
            <Carousel class="c1" 
              loop 
              radius-dot 
              autoplay 
              autoplay-speed="3000" 
              arrow="none">
              <CarouselItem class="c2">
                  <div class="c3">
                    <a href="">
                      <img src="../assets/images/banner/ba1.jpg" alt="">
                    </a>
                  </div>
              </CarouselItem>
              <CarouselItem class="c2">
                  <div class="c3">
                    <a href="">
                      <img src="../assets/images/banner/ba2.jpg" alt="">
                    </a>
                  </div>
              </CarouselItem>
              <CarouselItem class="c2">
                  <div class="c3">
                    <a href="">
                      <img src="../assets/images/banner/ba3.jpg" alt="">
                    </a>
                  </div>
              </CarouselItem>
              <CarouselItem class="c2">
                  <div class="c3">
                    <a href="">
                      <img src="../assets/images/banner/ba4.jpg" alt="">
                    </a>
                  </div>
              </CarouselItem>
            </Carousel>
          </div>
          <!--固定图-->
          <div class="daily-item">
            <a href="">
              <h4>百年老字号 北京同仁堂</h4>
              <div class="item-image">
                <img src="../assets/images/banner/daily.jpg" alt="">
              </div>
              <div class="item-bottom">
                <div class="item-price">
                  ￥<span>2232.5</span>
                </div>
                <div class="item-title">永盛合阿胶500g</div>
                <div class="item-desc">5折再送搅拌杯</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="first-section">
        <div class="title">
          <span>热门推荐</span>
        </div>
        <div class="content" v-for="(item, index) in recommend_result" :key="index">
          <div class="block-img">
            <img :src="'http://localhost:8080/shop/public/static/images/index-section/section0/is'+item.image+'.jpg'" alt="">
          </div>
          <div class="block-content">
            <div class="block-title">{{item.name}}</div>
            <div class="block-desc">{{item.commend}}</div>
            <div class="block-item clearfix">
              <div v-for="v in item.imgs" :key="v.pid" @click="getDetail(v.pid)" >
                <img :src="'http://localhost:8080/shop/public/static/'+v.frontimage" alt="">
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      <IndexSection title="跌打损伤" num="1" cid="14"/>
      <IndexSection title="颈椎病" num="2" cid="20"/>
      <IndexSection title="活血止痛" num="3" cid="18"/>
      <IndexSection title="抗风湿" num="4" cid="21"/>
      <IndexSection title="骨质增生" num="5" cid="16"/>

      <!--右侧侧边栏-->
      <div class="flexd-slide" ref="f_slide">
        <div class="center-box">
          <div class="top" @click="routeTo('/person/cart')">
            <i class="iconfont icon-shopcart"></i>
            <p>购物车</p>
          </div>
          <div class="bottom">
            <i class="iconfont icon-xingxing collection" @click="routeTo('/person/collection')" @mouseover="first('collection-box')" @mouseout="second('collection-box')"></i>
            <i class="iconfont icon-unie646 history" @click="routeTo('/person/footprint')" @mouseover="first('history-box')" @mouseout="second('history-box')"></i>
            <div class="box collection-box">
              我的收藏
            </div>
            <div class="box history-box">
              我看过的
            </div>
          </div>
        </div>
        <div class="back-top" v-show="goTopShow" @click="goTop()" @mouseover="first('back-box')" @mouseout="second('back-box')">
          <i class="iconfont icon-fanhuidingbu1"></i>
          <div class="box back-box">
            返回顶部
          </div>
        </div>
      </div>

      <div class="fragment-footer">
        <div class="item">
          <div class="image">
            <img src="../assets/images/footer/but1.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">自营正品</p>
            <p class="p2">阿里健康官方直营</p>
          </div>
        </div>
        <div class="item">
          <div class="image">
            <img src="../assets/images/footer/but2.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">担保交易</p>
            <p class="p2">由支付宝提供交易担保</p>
          </div>
        </div>
        <div class="item">
          <div class="image">
            <img src="../assets/images/footer/but3.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">满69包邮</p>
            <p class="p2">全场满就免费配送</p>
          </div>
        </div>
        <div class="item">
          <div class="image">
            <img src="../assets/images/footer/but4.png" alt="">
          </div>
          <div class="desc">
            <p class="p1">药师服务</p>
            <p class="p2">专业药师在线咨询</p>
          </div>
        </div>
      </div>
      
      <myFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTop from "@/components/HeaderTop";
import IndexSection from "@/components/IndexSection";
import myFooter from "@/components/Footer";
export default {
  name: "home",
  components: {
    HeaderTop,
    IndexSection,
    myFooter
  },
  data() {
    return {
      categoryData: [],
      category1: [],  //中西药品
      category2: [],  //人群健康
      category3: [],  //滋补调养
      category4: [],  //母婴孕产
      category5: [],  //居家生活
      recommend_result: '',   //热门推荐
      recommend_img_result: '', //热门推荐图片
      hotsellgoods_result: '',  //热卖商品
      categoryId: [],
      goTopShow: false
    };
  },
  created() {
    this.getCategoryData(); //获取分类列表
    this.getGoodsRecommend(); //获取热门推荐
    this.getHotSellGoods(); //获取热卖商品
  },
  mounted() {
    this.initList();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    routeTo(url) {
      this.$router.push(url);
    },

    //获取分类列表
    getCategoryData() {
      this.$get("/index/ShowType")
          .then(res => {
            this.categoryData = res.data.info;
            this.category1.push(this.categoryData[2], this.categoryData[7], this.categoryData[24], this.categoryData[27]);
            this.category2.push(this.categoryData[0], this.categoryData[1], this.categoryData[8], this.categoryData[9], this.categoryData[21], this.categoryData[22], this.categoryData[23]);
            this.category3.push(this.categoryData[3], this.categoryData[4], this.categoryData[5], this.categoryData[19], this.categoryData[24]);
            this.category4.push(this.categoryData[10], this.categoryData[11], this.categoryData[12], this.categoryData[13], this.categoryData[14]);
            this.category5.push(this.categoryData[15], this.categoryData[16], this.categoryData[17], this.categoryData[18]);
          })
    },
    getGoodsRecommend() {
      this.$get("/goodsrecommend/recommend")
          .then(res => {
            this.recommend_result = res.data.recommendType;
            // this.recommend_img_result = res.data.recommendGoods;
            console.log(res.data)
          });
      
    },

    getHotSellGoods() {
      let categoryId = 132;
      let data = {"categoryId": categoryId};
      this.$post("/hotsell/sellHotGoods", data)
          .then(res => {
            // console.log(res.data)
          });
    },
    //查找商品详情
    getDetail(goods_id) {
      this.$router.push({
        path: "/goods/detail",
        query: {
          gid: goods_id
        }
      });
    },

    initList() {
      let catItem = document.getElementsByClassName("cat-item");
      let panItem = document.getElementsByClassName("pan-item-right");
      for(let i = 0; i < catItem.length; i++) {
        catItem[i].addEventListener("mouseenter", function(e) {
          for(let j = 0; j < panItem.length; j++) {
            panItem[j].classList.add("hidden");
          }
          panItem[i].classList.remove("hidden");
        })
        catItem[i].addEventListener("mouseleave", function(e) {
          for(let j = 0; j < panItem.length; j++) {
            panItem[j].classList.add("hidden");
          }
        })
      }
    },
    
    //通过二级目录查找相关商品
    searchByCategoryName(id) {
      this.$router.push({
        path: "/goods/searchByCategory",
        query: {
          "id": id
        }
      });
    },

    first(dom) {
      let Dom = document.getElementsByClassName(dom)[0]
      Dom.style.right = 35 + 'px';
      Dom.style.opacity = 1;
    },
    second(dom) {
      let Dom = document.getElementsByClassName(dom)[0]
      Dom.style.right = 105 + 'px';
      Dom.style.opacity = 0;
    },

    handleScroll() {
      this.scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      if (this.scrollTop > 500) {
          this.goTopShow = true;
      }
    },
    goTop() {
        let timer = null,
            _that = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            if (_that.scrollTop > 0) {
                _that.scrollTop -= 50;
                document.body.scrollTop = document.documentElement.scrollTop =
                    _that.scrollTop;
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
                _that.goTopShow = false;
            }
        });
    }
  },

  watch: {
    scrollTop(val) {
      if (this.scrollTop > 500) {
          this.goTopShow = true;
      } else {
          this.goTopShow = false;
      }
    }
  },

  destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
  }

};
</script>

<style scoped lang="less">
.cat-wrap {
  margin-top: 100px;
  text-align: left;
  width: 100%;
  .cat-top {
    padding: 0 40px;
    height: 30px;
    min-width: 1240px;
    line-height: 30px;
    font-size: 16px;
    background-color: #fff;
    border-bottom: 2px solid #3e424c;
    margin-top: -1px;
    span {
      display: inline-block;
      width: 240px;
      color: #fff;
      background: #00cbab;
      padding-left: 20px;
    }
    p {
      height: 30px;
      line-height: 30px;
      display: inline-block;
      color: #000;
      font-weight: bold;
      margin-left: 62px;
      cursor: pointer;
    }
  }

  .cat-content {
    position: relative;
    margin: 0 40px;
    min-width: 1200px;
    .cat-left {
      position: relative;
      width: 240px;
      height: 400px;
      background-color: #3e424c;
      .cat-item {
        // position: relative;
        height: 20%;
        &:hover {
          background-color: #00cbab;
        }
        .cat-item-left {
          margin-left: 20px;
          font-size: 12px;
          height: 100%;
          cursor: pointer;
          .cat-item-title {
            padding-top: 15px;
            font-size: 16px;
            font-weight: bold;
            img {
              width: 25px;
              margin-right: 10px;
            }
            a {
              display: inline-block;
              vertical-align: top;
              line-height: 30px;
              color: #fff;
            }
          }

          .cat-item-hots {
            margin-top: 5px;
            white-space: nowrap;
            a {
              color: #fff;
            }
          }
        }

        .pan-item-right {
          position: absolute;
          top: 0;
          left: 240px;
          width: 730px;
          min-height: 360px;
          padding: 30px;
          background-color: #fff;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          z-index: 20;
          .pan-item {
            display: inline-block;
            vertical-align: top;
            width: 313px;
            height: auto;
            margin-right: 22px;
            margin-bottom: 26px;
            overflow: hidden;
            .cat-item-head {
              font-size: 12px;
              color: #333;
              height: 25px;
              position: relative;
              font-weight: bold;
              border-bottom: 1px solid #000;
            }
            .cat-item-body {
              margin-top: 10px;
              margin-left: -10px;
              a {
                padding: 0 7px 0 10px;
                margin-top: 10px;
                border-left: 1px solid #d9d9d9;
                display: inline-block;
                line-height: 12px;
                box-sizing: border-box;
                height: 12px;
                color: #666;
              }
            }
          }
          .clearfix {
            zoom: 1;
            &:before {
              display: table;
              content: "";
              overflow: hidden;
            }
          }
        }
        .hidden {
          display: none;
        }
      }
    }

    .swiper {
      position: absolute;
      top: 0;
      left: 240px;
      width: 730px;
      height: 400px;
      background-color: #eee;
      .c3 {
        overflow: hidden;
        img {
          margin: 0 0 0 -35%;
        }
      }
    }

    .daily-item {
      position: absolute;
      top: 0;
      right: 0;
      width: 230px;
      height: 400px;
      background-color: #fff;
      text-align: center;
      h4 {
        font-size: 24px;
        color: #fca100;
        margin-top: 46px;
        font-weight: 400;
      }
      .item-image {
        border-radius: 50%;
        width: 168px;
        max-height: 168px;
        height: 168px;
        margin: 20px auto 0;
        background: #f8f8f8;
        img {
          width: 142px;
          margin-top: 13px;
        }
      }
      .item-bottom {
        position: absolute;
        width: 100%;
        bottom: 20px;
        .item-price {
          color: #f82424;
          font-size: 20px;
          span {
            font-size: 30px;
            margin-left: 5px;
          }
        }
        .item-title {
          color: #323232;
          font-size: 20px;
        }
        .item-desc {
          color: #999;
          font-size: 16px;
        }
      }
    }
  }
}
.first-section {
  background-color: #f8f8f8;
  color: #575859;
  font-size: 24px;
  padding: 0 0 0 37px;
  min-width: 1260px;
  span {
    position: relative;
    display: inline-block;
    margin: 35px 0 15px;
    &:before,
    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 50%;
      width: 18px;
      height: 1px;
      left: -32px;
      background-color: #aaa;
    }
    &:after {
      left: 100%;
      margin-left: 14px;
    }
  }

  .content {
    display: inline-block;
    width: 381px;
    height: 290px;
    background: #fff;
    margin-right: 2%;
    margin-top: 20px;
    position: relative;
    vertical-align: top;
    .block-img {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 124px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .block-content {
      padding: 30px 20px 30px 144px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .block-title {
        color: #333;
        font-size: 18px;
      }
      .block-desc {
        color: #999;
        font-size: 12px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        text-align: left;
        -webkit-box-orient: vertical;
      }
      .block-item {
        margin-top: 10px;
        div {
          margin-top: 5px;
          float: left;
          width: 50%;
          text-align: center;
          cursor: pointer;
          img {
            max-height: 80px;
          }
        }
      }
      .clearfix {
        zoom: 1;
        &:before {
          display: table;
          content: "";
          overflow: hidden;
        }
      }
    }
  }
}
.flexd-slide {
  position: fixed;
  right: 0;
  top: 0;
  width: 35px;
  background-color: #000;
  height: 100vh;
  color: #fff;
  .center-box {
    position: absolute;
    top: 50%;
    margin-top: -150px;
    .top {
      padding: 5px 0;
      border-top: 1px solid rgb(105, 103, 103);
      border-bottom: 1px solid rgb(105, 103, 103);
      cursor: pointer;
      &:hover {
        background-color: #FF0036;
        i {
          color: #fff;
        }
      }
      i {
        margin: 0 8px;
        display: block;
        color: #c2163b;
        font-weight: bold;
        font-size: 20px;
      }
      p {
        margin: 0 8px 8px;
      }
    }
    .bottom {
      padding: 5px 0;
      position: relative;
      i {
        margin: 13px 0;
        padding: 5px 0;
        display: block;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          background-color: #FF0036;
        }
      }
      .box {
        position: absolute;
        // right: 105px;
        right: 105px;
        width: 120px;
        height: 35px;
        color: #fff;
        background-color: #333;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        opacity: 0;
        transition: all .4s;
        &:after {
          position: absolute;
          right: -10px;
          top: 50%;
          margin-top: -5px;
          content: '';
          display: block;
          border-top: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #333;
          line-height: 35px;
        }
      }
      .collection-box {
        top: 20px;
      }
      .history-box {
        top: 73px;
      }
    }
    // i.collection:hover {
    //   right: 50px;
    //   opacity: 0;
    // }
  }
  .back-top {
    position: absolute;
    bottom: 5px;
    width: 35px;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      background-color: #FF0036;
    }
    i {
      font-size: 20px;
    }
    .box {
      position: absolute;
      right: 105px;
      width: 120px;
      height: 35px;
      color: #fff;
      background-color: #333;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
      opacity: 0;
      transition: all .4s;
      &:after {
        position: absolute;
        right: -10px;
        top: 50%;
        margin-top: -5px;
        content: '';
        display: block;
        border-top: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #333;
        line-height: 35px;
      }
    }
    .back-box {
      position: absolute;
      bottom: 6px;
    }
  }
}
.fragment-footer {
  height: 160px;
  background: #fff;
  padding: 30px 0;
  width: 100%;
  margin: 0;
  .item {
    width: 25%;
    display: inline-block;
    height: 100px;
    overflow: hidden;
    box-sizing: border-box;
    .image {
      height: 100px;
      width: 70px;
      display: inline-block;
      img {
        width: 54px;
        height: 54px;
        margin-top: 20px;
        margin-left: 1px;
      }
    }
    .desc {
      display: inline-block;
      margin-left: 5px;
      height: 100px;
      padding: 20px 0;
      .p1 {
        color: #333333;
        font-size: 18px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;
      }
      .p2 {
        color: #666666;
        font-size: 14px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;
        line-height: 1.2;
      }
    }
  }
}

</style>

