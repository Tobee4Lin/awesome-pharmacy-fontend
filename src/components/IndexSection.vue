<template>
    <section>
        <p class="title">
          <span>{{title}}</span>
        </p>
        <div class="content">
          <div class="left" :style="bg">
            <h4>国际尖货</h4>
            <p>健康自营 品质保障</p>
            <a href="">
              <img :src="'http://localhost:8080/shop/public/static/images/index-section/section'+num+'/sectionma.png'" alt="" class="left-img">
            </a>
            <div class="tags">
              <a href="">进口眼药水</a>
              <a href="">进口药水</a>
              <a href="">进眼药水</a>
              <a href="">进口药水</a>
              <a href="">进口药水</a>
              <a href="">进口药水</a>
            </div>
          </div>
          <div class="center">
            <a class="item first" @click="getDetail(first_goods_result.id)">
              <div class="item-info">
                <p>{{first_goods_result.name}}</p>
                <div class="price">
                  <span class="price-mark">￥</span>{{first_goods_result.sellprice}}
                  <span class="origin-price">
                    <span class="price-mark">￥</span>{{first_goods_result.baseprice}}
                  </span>
                </div>
              </div>
              <div class="image">
                <img :src="'http://localhost:8080/shop/public/static/'+first_goods_result.frontImage" alt="">
              </div>
            </a>
            <a class="item" v-for="(item, index) in goods_result" :key="index" @click="getDetail(item.id)">
              <div class="image">
                <img :src="'http://localhost:8080/shop/public/static/'+item.frontImage" alt="">
              </div>
              <div class="item-info">
                <p>{{item.name}}</p>
                <div class="price">
                  <span class="price-mark">￥</span>{{item.sellprice}}
                  <span class="origin-price">
                    <span class="price-mark">￥</span>{{item.baseprice}}
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div class="right">
            <div class="title1">
              <span>热卖品牌</span>
            </div>
            <div class="brands" v-if="num==1">
              <a href="" v-for="i in 8" :key="i">
                <div class="image">
                  <img :src="'http://localhost:8080/shop/public/static/images/index-section/section1/is'+i+'.png'" alt="">
                </div>
                <span>善存</span>
              </a>
            </div>
            <div class="brands" v-else-if="num==2">
              <a href="" v-for="i in 8" :key="i">
                <div class="image">
                  <img :src="'http://localhost:8080/shop/public/static/images/index-section/section2/is'+i+'.png'" alt="">
                </div>
                <span>善存</span>
              </a>
            </div>
            <div class="brands" v-else-if="num==3">
              <a href="" v-for="i in 8" :key="i">
                <div class="image">
                  <img :src="'http://localhost:8080/shop/public/static/images/index-section/section3/is'+i+'.png'" alt="">
                </div>
                <span>善存</span>
              </a>
            </div>
            <div class="brands" v-else-if="num==4">
              <a href="" v-for="i in 8" :key="i">
                <div class="image">
                  <img :src="'http://localhost:8080/shop/public/static/images/index-section/section4/is'+i+'.png'" alt="">
                </div>
                <span>善存</span>
              </a>
            </div>
            <div class="brands" v-else-if="num==5">
              <a href="" v-for="i in 8" :key="i">
                <div class="image">
                  <img :src="'http://localhost:8080/shop/public/static/images/index-section/section5/is'+i+'.png'" alt="">
                </div>
                <span>善存</span>
              </a>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
export default {
  name: "index-section",
  data() {
    return {
      bg: {
        backgroundImage: "url(" + require(`../assets/images/index-section/section${this.num}/sectionbg.png`) + ")",
      },
      goods_result: '', //存放分类的数据
      first_goods_result: '', //存放第一条数据
    }
  },
  props: ["title", "num", "cid"],
  created() {
    //14, 20, 18, 21, 16  假数据
    this.$post("/index/show", {"id": this.cid, "num": 7})
        .then(res => {
          // console.log(res.data)
          if(res.data.code == 200) {
            this.goods_result = res.data.info;
            this.first_goods_result = this.goods_result.pop();
            // console.log(this.goods_result, this.first_goods_result)
          }
        });
  },
  methods: {
    getDetail(id) {
      this.$router.push({
        path: "/goods/detail",
        query: {
          "gid": id
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
section {
  margin: 0 40px;
  text-align: left;
  .title {
    background: #f8f8f8;
    height: 80px;
    line-height: 80px;
    width: 100%;
    min-width: 1200px;
    color: #575859;
    font-size: 24px;
    text-align: center;
    span {
      position: relative;
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
  }

  .content {
    border-top: 1px solid#31d0dc;
    min-width: 1195px;
    height: 420px;
    .left {
      // background: url("../assets/images/index-section/section1/sectionbg.png")
      //   no-repeat;
      position: relative;
      width: 200px;
      height: 420px;
      padding: 18px;
      box-sizing: border-box;
      float: left;
      color: #fff;
      background-size: cover;
      h4 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
      .left-img {
        max-height: 150px;
        display: block;
        margin: 15px auto;
        max-width: 100%;
      }
      .tags {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.1);
        padding: 18px 10px 6px;
        box-sizing: border-box;
        a {
          display: block;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.45);
          color: #fff;
          text-decoration: none;
          width: 76px;
          height: 28px;
          line-height: 28px;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          text-align: center;
          box-sizing: border-box;
          margin-left: 10px;
          margin-bottom: 12px;
        }
      }
    }

    .center {
      width: 716px;
      min-width: 716px;
      float: left;
      background-color: #fff;
      .item {
        width: 179px;
        height: 210px;
        box-sizing: border-box;
        padding: 30px;
        display: block;
        float: left;
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        text-decoration: none;
        color: #333333;
        font-size: 14px;
        text-align: center;
        .item-info {
          float: left;
          width: 100%;
          text-align: left;
          p {
            margin-top: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .price {
            color: #fd2537;
            font-size: 18px;
            margin-top: 10px;
            line-height: 1;

            .origin-price {
              color: #999999;
              font-size: 14px;
              text-decoration: line-through;
              margin-left: 5px;
            }
          }
        }
        .image {
          img {
            height: 100px;
            max-width: 100%;
          }
        }
        .price-mark {
          font-size: 14px;
        }
      }
      .first {
        width: 358px;
        .item-info {
          float: left;
          width: 50%;
          text-align: left;
          margin-top: 35px;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
          }
          .price {
            color: #fd2537;
            font-size: 18px;
            margin-top: 10px;
            line-height: 1;

            .origin-price {
              color: #999999;
              font-size: 14px;
              text-decoration: line-through;
              margin-left: 5px;
            }
          }
        }
        .image {
          text-align: center;
          float: left;
          width: 50%;
          img {
            width: 122px;
            max-height: 100%;
            height: auto;
          }
        }
      }
    }

    .right {
      width: 274px;
      height: 420px;
      float: left;
      padding: 15px;
      box-sizing: border-box;
      background-color: #fff;
      .title1 {
        color: #666666;
        font-size: 18px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 21px;
        padding-bottom: 5px;
        span {
          border-bottom: 1px solid #666666;
          line-height: 21px;
          padding-bottom: 5px;
        }
      }
      .brands {
        a {
          text-align: center;
          text-decoration: none;
          font-size: 12px;
          color: #999999;
          width: 50%;
          display: block;
          float: left;
          margin-top: 20px;
          box-sizing: border-box;
          .image {
            text-align: center;
            height: 50px;
            img {
              max-height: 100%;
              max-width: 100%;
            }
          }
          span {
            background: #f4f4f4;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          &:nth-child(2n) {
            border-left: 15px solid #fff;
          }
        }
      }
    }
  }
}
</style>
