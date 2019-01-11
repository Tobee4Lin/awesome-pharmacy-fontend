<template>
  <div style="background-color:#fff;">
    <HeaderTop />

    <div class="content">
        <div class="photo-wrap">
            <div class="photo" @mousemove="zoomGoodsPhoto($event)">
                <img :src="currentImgSrc" alt="">
                <div class="photo-mask"></div>
            </div>
            <div class="photo-list">
                <ul>
                    <li v-for="(item, index) in goods_result.img.middleimage" 
                        :key="index" 
                        @mouseover="changeGoodsPhoto($event)">
                        <img :src="'http://localhost:8080/shop/public/static/'+item" alt="" class="goods-li-img" >
                    </li>
                </ul>
            </div>
            <div class="photo-zoom"></div>
        </div>
        
        <div class="info-wrap">
            <p class="title">{{goods_result.name}}</p>
            <p class="newp">XXl</p>
            <div class="price-wrap">
                <div class="price-box">
                    <p class="p1">价格</p>
                    <p class="origin-price">￥<span>{{goods_result.sellprice}}</span></p>
                </div>
                <div class="price-box">
                    <p class="p1">促销价</p>
                    <p class="now-price">￥<span>{{goods_result.baseprice}}</span></p>
                </div>
            </div>
            <div class="tran">
                <p class="p1">运费</p>
                <p class="local">
                    <span class="form">广东广州 </span>
                    <span>至</span>
                    <span class="to" @click="show_localchoose()"> {{local}}<i class="iconfont icon-arrow-down"> </i></span>
                    <span> 满69元包邮(1kg内)</span>
                </p>
                <div class="location-box" :hidden="is_local_hidden">
                    <span class="close" @click="closeLocalBox()"><i class="iconfont icon-fork"></i></span>
                    <p class="p1"><i class="iconfont icon-didian"></i>选择当前定位地址</p>
                    <span class="local-active" @click="selectCurrent()">
                        <span>{{current_local}}</span>
                        <i ref="localActiveI"></i>
                    </span>
                    <div class="choose-local">
                        <Cascader class="mycity" 
                            :data="city" 
                            @on-change="(value, selectedData)=>{getLocalValue(value, selectedData)}">
                        </Cascader>
                    </div>
                </div>
            </div>
            <div class="some-info">
                <div class="sele">
                    <p>月销量</p>
                    <span>{{goods_result.sellcount}}</span>
                </div>
                <div class="comment">
                    <p>累计评价</p>
                    <span>{{goods_result.commend}}</span>
                </div>
            </div>
            <div class="choose">
                <div class="row">
                    <p class="left">数量</p>
                    <div class="right">
                        <div class="change-num">
                            <input type="number" value="1" title="请输入购买数量" v-model="num">
                            <span class="add" @click="add()">+</span>
                            <span class="reduce" @click="reduce()">-</span>
                            <span style="left: 65px;top: 10px;border: 0;color:#999;">件</span>
                            <p class="shock">库存{{goods_result.total}}件</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buy-box">
                <div class="buy" @click="createOrder()">
                    立即购买
                </div>
                <div class="cart" @click="addToCart()">
                    <i class="iconfont icon-cart"></i>
                    加入购物车
                </div>
            </div>
            <div class="server">
                <p class="left">服务承诺</p>
                <div class="right">
                    <a>正品保证</a>
                    <a>极速退款</a>
                    <a>赠运费险</a>
                    <a>七天无理由退换</a>
                    <a @click="toggleCollection(goods_result.id)" v-if="is_collection">
                        <i class="iconfont icon-shoucang" style="color:red;"></i>收藏(<span>1234</span>人气)
                    </a>
                    <a @click="toggleCollection(goods_result.id)" v-else><i class="iconfont icon-shoucang"></i>收藏(<span>1234</span>人气)</a>
                </div>
            </div>
        </div>

        <div class="main-wrap">
            <div class="main-wrap-nav">
                <ul>
                    <li :class="{selected: detailStatus}" @click="changeStatus(1)"><a>商品详情</a></li>
                    <li :class="{selected: commentStatus}" @click="changeStatus(2)"><a>累计评价<span>{{comment_num}}</span></a></li>
                </ul>
            </div>
            <div class="goods-wrap goods-content" :hidden="!detailStatus">
                <p class="p1">品牌名称：{{goods_result.name}}</p>
                <p class="p2">产品参数：</p>
                <ul>
                    <li v-for="(key, item, index) in desc" :key="index">{{item}}: {{key}}</li>
                </ul>
                <div class="img-box">
                    <div class="img" v-for="(item, index) in goods_result.img.largeimage" :key="index">
                        <img :src="'http://localhost:8080/shop/public/static/'+item" alt="">
                    </div>
                </div>
            </div>
            <div class="goods-wrap goods-comment" :hidden="!commentStatus">
                <div class="c_content" v-if="comment_num!=0">
                    <div class="outer" v-for="(item, index) in comments" :key="index">
                        <p class="p1"><span class="name">{{item.username}}</span> 说：</p>
                        <div class="inner">
                            <p>{{item.comment}}</p>
                        </div>
                    </div>
                </div>
                <div class="c_content" v-else>
                    5656
                </div>
            </div>
        </div>

        <div class="fixed-top">
            <div class="main-wrap-nav">
                <ul>
                    <li :class="{selected: detailStatus}" @click="changeStatus(1)"><a>商品详情</a></li>
                    <li :class="{selected: commentStatus}" @click="changeStatus(2)"><a>累计评价<span>{{comment_num}}</span></a></li>
                </ul>
            </div>
            <div class="cart" @click="addToCart()">
                <i class="iconfont icon-cart"></i>
                加入购物车
            </div>
        </div>        
    </div>

    <myFooter />
  </div>
</template>

<script>
import { Cascader } from "iview";
import HeaderTop from "@/components/HeaderTop";
import myFooter from "@/components/Footer";
import city from "@/assets/js/city.js";
export default {
  name: 'goodsDetail',
  data: function() {
    return {
        goods_result: '',   //对应商品
        local: '东莞',    //选择的收货地
        current_local: '东莞',    //当前所在地
        city: city,
        is_local_hidden: true,
        num: 1,     //商品数量
        is_collection: false,   //判断是否收藏
        detailStatus: true,
        commentStatus: false,

        currentImgSrc: '',
        description_0: '',
        description_1: '',
        desc: {},

        comments: '',   //存放商品评价
        comment_num: '',   //存放商品评价数量
    }
  },
  created() {
    let gid = this.$route.query.gid;
    this.is_collection = JSON.parse(localStorage.getItem(`is_collection_${gid}`)) || false;
    this.getGoodsDetail(gid);
    this.getGoodsComment(gid);
    // window.addEventListener('scroll', this.showFixedMenu);
  },
  mounted() {
      //鼠标移动显示大图细节
      this.zoomGoodsPhoto();
      //判断固定菜单栏是否应该出现
    //   this.showFixedMenu();
    
  },
  destroyed() {
      this.addToHistory();
  },
  methods: {
    goTo(url) {
        this.$router.push(url)
    },
    getGoodsDetail(gid) {
        this.$post("/goods/detail", {"id": gid})
            .then(res => {
                this.goods_result = res.data.info;
                console.log(this.goods_result)
                this.dealDesc();    //对描述字段进行处理
                //首次图片展示
                this.currentImgSrc = "http://localhost:8080/shop/public/static/" + res.data.info.img.middleimage[0];
            });
    },
    dealDesc() {
        this.description_0 = this.goods_result.description[0];
        this.description_1 = this.goods_result.description[1];
        let desc = {};
        for(let i = 0, len = this.description_0.length; i < len; i++) {
            desc[this.description_0[i]] = this.description_1[i];
        }
        this.desc = desc;
    },
    //鼠标移入小图列表切换图片展示
    changeGoodsPhoto(e) {
        let aLiImg = document.getElementsByClassName("goods-li-img");
        let photo = document.getElementsByClassName("photo")[0];
        let aLiImg_len = aLiImg.length;
        let _this = e.target;
        for(let j = 0; j < aLiImg_len; j++) {
            aLiImg[j].classList.remove("selected");
        }
        _this.classList.add("selected");
        let img_src = _this.getAttribute("src");
        this.currentImgSrc = img_src;
        photo.children[0].setAttribute("src", img_src);
    },

    zoomGoodsPhoto(e) {
        let photo = document.getElementsByClassName("photo")[0];
        let photo_mask = document.getElementsByClassName("photo-mask")[0];
        let photo_left = photo.offsetLeft;
        let photo_top = 167;
        let photo_height = parseFloat(getComputedStyle(photo).height);
        let photo_width = parseFloat(getComputedStyle(photo).width);
        let photo_mask_width = parseFloat(getComputedStyle(photo_mask).width);

        let zoom_photo = document.getElementsByClassName("photo-zoom")[0];
        let z_width = parseFloat(getComputedStyle(zoom_photo).width);
        let z_height = parseFloat(getComputedStyle(zoom_photo).height);
        
        let zoom_size = z_width * photo_width / photo_mask_width + "px " + z_height * photo_height / photo_mask_width + "px";
        // let _this = e.target;
        
        let pos_x = e.pageX - photo_left,
            pos_y = e.pageY - photo_top;
        let topMax = Math.max(0, photo_height - photo_mask_width),
            leftMax = Math.max(0, photo_width - photo_mask_width);
        let point_left = pos_x - photo_mask_width / 2,
            point_top = pos_y - photo_mask_width / 2;

        point_left = Math.max(0, point_left);
        point_left = Math.min(leftMax, point_left);
        point_top = Math.max(0, point_top);
        point_top = Math.min(topMax, point_top);

        photo_mask.style.display = "block";
        photo_mask.style.left = point_left + 70 + "px";
        photo_mask.style.top = point_top + 40 + 'px';

        zoom_photo.style.display = "block";
        zoom_photo.style.backgroundImage = `url(${this.currentImgSrc})`;
        zoom_photo.style.backgroundSize = zoom_size;
        zoom_photo.style.backgroundPosition = -point_left * photo_width / photo_mask_width + "px " + -point_top * photo_height / photo_mask_width + "px";
        
        photo.addEventListener("mouseleave", function(e) {
            photo_mask.style.display = "none";
            zoom_photo.style.display = "none";
        });

        // photo.addEventListener("mouseleave", _this.dealMouseLeave(e));
    },

    show_localchoose() {
        this.is_local_hidden = false;
    },

    closeLocalBox() {
        this.is_local_hidden = true;
    },

    getLocalValue(value, selectedData) {
        this.local = selectedData[2].__label.split("/").join("");
        this.is_local_hidden = true;
        this.$refs.localActiveI.style.display = "none";
    },

    selectCurrent() {
        this.local = this.current_local;
        this.is_local_hidden = true;
        this.$refs.localActiveI.style.display = "block";
    },

    //商品数量增加
    add() {
        this.num++;
    },
    //商品数量减少
    reduce() {
        if(this.num > 1) {
            this.num--;
        }
    },

    changeStatus(val) {
        if(val === 1) {
            this.detailStatus = true;
            this.commentStatus = false;
        } else if(val === 2) {
            this.detailStatus = false;
            this.commentStatus = true;
        }
    },

    //加入收藏夹
    toggleCollection(id) {
        if(!this.is_collection) {
            this.$post("/person/addcollection", {"pid": id})
                .then(res => {
                    if(res.data.code == 200) {
                        this.$Message.success(res.data.info);
                        this.is_collection = true;
                        localStorage.setItem(`is_collection_${id}`, this.is_collection);
                    } else {
                        this.$Message.warning(res.data.info);
                    }
                })
                .catch(err => {
                    this.$Message.warning(err);
                });
        } else {
            this.$Message.warning("已收藏");
        }
        // else {
        //     //取消收藏
        //     this.$post("/person/deletecollection", {"pid": id})
        //         .then(res => {
        //             if(res.data.code == 200) {
        //                 this.$Message.success(res.data.info);
        //                 this.is_collection = false;
        //                 localStorage.setItem("is_collection", this.is_collection);
        //             } else {
        //                 this.$Message.warning(res.data.info);                        
        //             }
        //         })
        // }
    },
    // throttle(fn, delay){
    //     var timer = null;
    //     return function(){
    //         var context = this, args = arguments;
    //         clearTimeout(timer);
    //         timer = setTimeout(function(){
    //             fn.apply(context, args);
    //         }, delay);
    //     };
    // },
    // showFixedMenu() {
    //     this.throttle(this.showFixedMenu1(), 300);
    // },
    showFixedMenu() {
        let main_wrap_nav = document.getElementsByClassName("main-wrap-nav")[0];
        let fixed_top = document.getElementsByClassName("fixed-top")[0];
        let mwn_height = parseFloat(getComputedStyle(main_wrap_nav).height);
        let mwn_top = main_wrap_nav.offsetTop + mwn_height * 2 + 32;
        window.addEventListener("scroll", function(e) {
            if(document.documentElement.scrollTop > mwn_top) {
                main_wrap_nav.style.display = "none";
                fixed_top.style.display = "block";
            } else {
                main_wrap_nav.style.display = "block";
                fixed_top.style.display = "none";
            }
        })
    },
    //创建订单
    createOrder() {
        let uid = JSON.parse(localStorage.getItem("userInfo")).id,
            id = this.goods_result.id,
            title = this.goods_result.name,
            image = this.goods_result.frontImage,
            old_price = this.goods_result.sellprice,
            new_price = this.goods_result.baseprice,
            chooseNum = this.num
        let order_items = {
            uid, id, title, image, old_price, new_price, chooseNum
        };
        if(!uid) {
            this.$Message.warning("请先登录");
            setTimeout(() => {
                this.$router.push("/login");
            }, 1000);
        } else {
            this.$router.push({
                path: "/order/detail",
                query: {
                    "uid": uid,
                    "order_items": JSON.stringify([order_items])
                }
            });
        }
    },
    //加入购物车
    addToCart() {
        let uid = JSON.parse(localStorage.getItem("userInfo")).id,
            id = this.goods_result.id,
            title = this.goods_result.name,
            image = this.goods_result.frontImage,
            old_price = this.goods_result.sellprice,
            new_price = this.goods_result.baseprice,
            chooseNum = this.num,
            selectStatus = 1;
        let data = {
            uid, id, title, image, old_price, new_price, chooseNum, selectStatus
        };

        let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
        cartItem.push(data);
        this.$Message.success("加入购物车成功");
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    },

    //添加到浏览记录中
    addToHistory() {
        let id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).id : '';
        if(!id) return;
        let historyInfo = JSON.parse(localStorage.getItem(`historyInfo_${id}`)) || [];
        let cache = [];
        let nowDate = this.getCurrentDate();
        let history = {
            id: this.goods_result.id,
            name: this.goods_result.name,
            img: this.goods_result.frontImage,
            price: this.goods_result.sellprice,
        };
        let goods_result_h = {
            history: history,
            time: nowDate
        };
        //若添加项已存在，则删除并重新添加。返回最新历史浏览记录
        cache = this.clearRepeat(historyInfo, goods_result_h);
        cache.unshift(goods_result_h);
        
        this.$store.commit("updateHistory", [id, cache]);
    },

    getCurrentDate() {
        let date = new Date();
        let nowMonth = date.getMonth() + 1;
        let strDate = date.getDate();
        let seperator = '-';
        let nowDate = '';

        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }

        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        return nowDate;
    },

    clearRepeat(historyProducts, goodItemInfo) {
        if(historyProducts.length === 0) {
            return [];
        }
        for(let i = 0, len = historyProducts.length; i < len; i++) {
            if(historyProducts[i].history.id === goodItemInfo.history.id && historyProducts[i].time === goodItemInfo.time) {
                historyProducts.splice(i, 1);
                break;
            }
        }
        this.$store.commit("updateHistory", historyProducts);
        return historyProducts;
    },

    getGoodsComment(gid) {
        this.$post("/goods/comments", {"id": gid})
            .then(res => {
                if(res.data.code == 200) {
                    this.comments = res.data.info;
                    this.comment_num = res.data.comment_num;
                    // console.log(this.comments)
                }
            });
    }
  },
  computed: {
    //   dealSelectedLocal(local) {
    //       return local.split("/").join("");
    //   }
  },
  components: {
      HeaderTop,
      myFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    ul, li {
        list-style: none;
    }
    .content {
        position: relative;
        padding: 40px 70px 0;
        width: 100%;
        min-width: 1200px;
        background-color: #fff;
        margin-bottom: 30px;
        .photo-wrap {
            float: left;
            width: 460px;
            .photo {
                width: 418px;
                height: 418px;
                border: 1px solid rgba(0,0,0,.05);
                border: 1px solid silver\9;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                img {
                    vertical-align: middle;
                    width: 100%;
                    max-width: 100%;
                    max-height: 100%;
                }
                .photo-mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 218px;
                    height: 218px;
                    background-image: url("~@/assets/images/dot.png");
                    background-color: transparent;
                    // background-attachment: scroll;
                    background-repeat: repeat;
                    cursor: move;
                    z-index: 1;
                    overflow: hidden;
                    // background-position: 0 0;

                    display: none;
                }
            }
            .photo-list {
                ul {
                    width: 100%;
                    text-align: center;
                    margin-left: -16px;
                    white-space: nowrap;
                    position: relative;
                    padding-top: 22px;
                    font-size: 0;
                    li {
                        display: inline-block;
                        margin: 0 0 0 16px;
                        // padding-top: 22px;
                        cursor: pointer;
                        box-sizing: border-box;
                        img {
                            position: relative;
                            max-width: 60px;
                            max-height: 60px;
                            transition: border .2s cubic-bezier(0,0,.25,1);
                            // &:hover {
                            //     border: 2px solid #000;
                            // }
                        }
                    }
                    .selected {
                        border: 2px solid #000;
                    }
                }
            }
            .photo-zoom {
                position: absolute;
                left: 530px;
                top: 0;
                width: 418px;
                height: 418px;
                border: 1px solid rgba(0,0,0,.05);
                background-repeat: no-repeat;
                z-index: 100;
                display: none;
            }
        }

        .info-wrap {
            float: left;
            width: 500px;
            text-align: left;
            .title {
                padding-bottom: .2em;
                line-height: 1;
                font-size: 16px;
                font-weight: 700;
                color: #000;
            }
            .newp {
                font-size: 14px;
                color: #FF0036;
                margin-bottom: 10px;
            }
            .price-wrap {
                background-color: #e9e9e9;
                background-repeat: no-repeat;
                background-position: left 0;
                position: relative;
                left: 0;
                z-index: 10;
                font: 12px/1.5 "Microsoft Yahei",tahoma,arial;
                margin-right: 20px;
                background-image: url("~@/assets/images/detail_bg.png");
                padding: 20px 0 5px;
                width: 100%;
                .price-box {
                    width: 100%;
                    margin-bottom: 10px;
                    p {
                        display: inline-block;
                    }
                    .p1 {
                        color: #999;
                        font-size: 12px;
                        text-align: left;
                        width: 69px;
                        margin: 0 0 0 8px;
                    }
                    .origin-price {
                        span {
                            text-decoration: line-through;
                            font-size: 14px;
                        }
                    }
                    .now-price {
                        color: #FF0036;
                        font-size: 18px;
                        -webkit-font-smoothing: antialiased;
                        vertical-align: middle;
                        span {
                            vertical-align: middle;
                            font-size: 30px;
                            font-weight: bolder;
                        }
                    }
                }
            }

            .tran {
                width: 100%;
                margin: 15px 0;
                .p1 {
                    width: 69px;
                    color: #999;
                    font-size: 12px;
                    margin: 0 0 0 8px;
                    display: inline-block;
                }
                .local {
                    display: inline-block;
                    .to {
                        cursor: pointer;
                        i {
                            font-size: 12px;
                        }
                    }
                }
                .location-box {
                    width: 500px;
                    position: absolute;
                    padding: 15px 10px 5px;
                    border: 1px solid #aaa;
                    margin-top: 3px;
                    background-color: #fff;
                    z-index: 111;

                    .close {
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        cursor: pointer;
                    }
                    .p1 {
                        width: 100%;
                        color: #545454;
                        font-size: 14px;
                        margin-bottom: 5px;
                        margin-left: -3px;
                    }
                    
                    .local-active, .local-show {
                        border: 2px solid #FF0036;
                        position: relative;
                        padding: 2px 6px;
                        width: auto;
                        border-radius: 2px;
                        cursor: pointer;
                        i {
                            background-image: url("~@/assets/images/local_active.png");
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 12px;
                            height: 12px;
                            overflow: hidden;
                            text-indent: -99em;
                            background-repeat: no-repeat;
                            background-position: 0 0;
                        }
                    }
                    .local-show {
                        border: 2px solid #aaa;
                    }
                    .choose-local {
                        width: 100%;
                        background-color: #eee;
                        .mycity {
                            margin-top: 10px;
                        }
                    }
                }
            }

            .some-info {
                display: flex;
                border: 1px dotted #c9c9c9;
                border-width: 1px 0;
                margin: -1px 20px 0 0;
                padding: 10px 0;
                position: relative;
                overflow: hidden;
                clear: both;
                div {
                    float: left;
                    // width: 33%;
                    text-align: center;
                    position: relative;
                    left: -1px;
                    border-left: 1px solid #e5dfda;
                    flex: 1;
                    line-height: 16px;
                    p {
                        display: inline-block;
                        line-height: 16px;
                        height: 16px;
                        color: #999;
                    }
                    span {
                        display: inline-block;
                        line-height: 16px;
                        height: 16px;
                        color: #FF0036;
                        font-weight: 700;
                        margin-left: 3px;
                    }
                }
            }

            .choose {
                width: 100%;
                margin-top: 20px;
                .row {
                    width: 100%;
                    height: 40px;
                    .left {
                        width: 68px;
                        text-align: left;
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        color: #999;
                        margin-left: 8px;
                    }
                    .right {
                        float: left;
                        .change-num {
                            position: relative;
                            input {
                                width: 40px;
                                height: 30px;
                                text-indent: 3px;
                                outline: 0;
                            }
                            span {
                                position: absolute;
                                top: 0px;
                                left: 45px;
                                display: block;
                                width: 15px;
                                height: 15px;
                                text-align: center;
                                line-height: 10px;
                                border: 1px solid #aaa;
                                box-sizing: border-box;
                                cursor: pointer;
                            }
                            .reduce {
                                top: 16px;
                            }
                        }

                        .shock {
                            float: right;
                            margin-left: 55px;
                            height: 30px;
                            line-height: 30px;
                            color: #999;
                        }
                    }
                }
            }

            .buy-box {
                width: 100%;
                height: 45px;
                margin-top: 40px;
                div {
                    float: left;
                    width: 200px;
                    height: 45px;
                    text-align: center;
                    line-height: 45px;
                    margin-right: 30px;
                    font-size: 16px;
                    cursor: pointer;
                }
                .buy {
                    overflow: hidden;
                    position: relative;
                    width: 178px;
                    background-color: #ffeded;
                    border: 1px solid #FF0036;
                    color: #FF0036;
                    margin-left: 50px;
                }
                .cart {
                    background-color: #ff0036;
                    border: 1px solid #ff0036;
                    color: #fff;
                    i {
                        color: #fff;
                        font-size: 16px;
                        margin-right: 4px;
                    }
                }
            }

            .server {
                margin-top: 40px;
                width: 100%;
                .left {
                    width: 68px;
                    text-align: left;
                    float: left;
                    height: 30px;
                    line-height: 30px;
                    color: #999;
                    margin-left: 8px;
                }
                .right {
                    a {
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        margin-right: 20px;
                        color: #545454;
                    }
                }
            }
        }

        .main-wrap {
            width: 790px;
            overflow: hidden;
            padding-top: 50px;
            margin: 0 auto;
            background-color: #fff;
            .main-wrap-nav {
                width: 789px;
                border: 1px solid #dfdfdf;
                z-index: 9999;
                ul {
                    width: 100%;
                    position: relative;
                    height: 48px;
                    li {
                        float: left;
                        margin-left: -1px;
                        height: 48px;
                        line-height: 48px;
                        display: block;
                        cursor: pointer;
                        a {
                            font-weight: 700;
                            display: block;
                            height: 100%;
                            line-height: 46px;
                            
                            border-left: 1px solid #cfbfb1;
                            
                            border-right: 1px dotted #d2d2d2;
                            color: #333;
                            padding: 0 20px;
                        }
                    }
                    .selected {
                        position: relative;
                        border-top: 2px solid #FF0036;
                        height: 47px;
                        margin: -1px 0 0 -1px;
                        z-index: 1;
                        padding: 0;
                        a {
                            color: #FF0036;
                            border-right: 1px solid #cfbfb1;
                            padding: 0 20px;
                            &:after {
                                content: ' ';
                                display: block;
                                border-width: 5px;
                                border-style: solid;
                                border-color: #FF0036 transparent transparent;
                                width: 0;
                                height: 0;
                                font-family: arial;
                                position: absolute;
                                top: -1px;
                                left: 50%;
                                margin-left: -5px;
                            }
                        }
                    }
                }
            }

            .goods-wrap {
                clear: both;
                border: 1px solid #e6e6e6;
                border-top: none;
                margin-bottom: 10px;
                padding: 20px 15px 0;
            }
            .goods-content {
                text-align: left;
                .p1 {
                    margin-bottom: 25px;
                }
                .p2 {
                    // padding: 5px 20px;
                    line-height: 22px;
                    color: #999;
                }
                ul {
                    padding: 0 20px 18px 0;
                    text-indent: 0;
                    border-top: 1px solid #fff;
                    li {
                        display: inline-block;
                        // float: left;
                        width: 220px;
                        height: 18px;
                        overflow: hidden;
                        margin: 10px 15px 0 0;
                        line-height: 18px;
                        vertical-align: top;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #666;
                    }
                }
                .img-box {
                    width: 790px;
                    .img {
                        width: 100%;
                        img {
                            width: 90%;
                            min-width: 700px;
                        }
                    }
                }
            }

            .goods-comment {
                text-align: left;
                .outer {
                    margin-bottom: 10px;
                    border-bottom: 1px solid #ddd;
                    padding: 0 0 10px;
                    .p1 {
                        .name {
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                    .inner {
                        width: auto;
                        text-indent: 20px;
                        font-size: 14px;
                        p {
                            word-wrap: break-word;
                            word-break: break-all;
                        }
                    }
                }
            }
        }

        .fixed-top {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
            z-index: 105;
            background-color: #fff;
            box-shadow: 0 0 5px #aaa;
            display: none;
            .main-wrap-nav {
                width: 789px;
                border: 1px solid #dfdfdf;
                margin: 0 auto;
                ul {
                    width: 100%;
                    position: relative;
                    height: 48px;
                    li {
                        float: left;
                        margin-left: -1px;
                        height: 48px;
                        line-height: 48px;
                        display: block;
                        cursor: pointer;
                        a {
                            font-weight: 700;
                            display: block;
                            height: 100%;
                            line-height: 46px;
                            
                            border-left: 1px solid #cfbfb1;
                            
                            border-right: 1px dotted #d2d2d2;
                            color: #333;
                            padding: 0 20px;
                        }
                    }
                    .selected {
                        position: relative;
                        border-top: 2px solid #FF0036;
                        height: 47px;
                        margin: -1px 0 0 -1px;
                        z-index: 1;
                        padding: 0;
                        a {
                            color: #FF0036;
                            border-right: 1px solid #cfbfb1;
                            padding: 0 20px;
                            &:after {
                                content: ' ';
                                display: block;
                                border-width: 5px;
                                border-style: solid;
                                border-color: #FF0036 transparent transparent;
                                width: 0;
                                height: 0;
                                font-family: arial;
                                position: absolute;
                                top: -1px;
                                left: 50%;
                                margin-left: -5px;
                            }
                        }
                    }
                }
            }

            .cart {
                display: block;
                width: 200px;
                height: 49px;
                left: 1026px;
                top: 0;
                line-height: 48px;
                vertical-align: middle;
                background-color: #FF0036;
                color: #fff;
                font-size: 14px;
                text-align: center;
                position: fixed;
                z-index: 999;
            }
        }
    }
</style>
