<template>
    <div style="background-color: #fff;">
        <HeaderTop />

        <div class="cart-wrap">
            <div class="top">
                <div class="logo">
                    <h2>购物车</h2>
                </div>
                <div class="search">
                    <div class="icon-box">
                        <i class="iconfont"></i>
                    </div>
                    <input type="text" v-model="search_content">
                    <div class="search-btn" @click="searchCartItem()">搜索</div>
                </div>
            </div>
            <div class="main">
                <div class="main-top">
                    <div class="all-goods" @click="showAllCartItems()">
                        全部商品 
                        <span> {{cartItemNum}}</span>
                    </div>
                    <div class="search-goods" :hidden="is_searchGoods_hidden">
                        搜索商品 
                        <span> {{searchResultNum}}</span>
                    </div>
                </div>
                <div class="main-center">
                    <p class="title all-select">
                        <label><input type="checkbox" :checked="checkAllFlag" @click="checkAll()"> 全选</label>
                    </p>
                    <p class="title info">商品信息</p>
                    <p class="title">单价</p>
                    <p class="title">数量</p>
                    <p class="title">金额</p>
                    <p class="title">操作</p>
                </div>

                <!--购物车所有商品-->
                <div class="cart-goods-wrap" v-if="is_searchGoods_hidden">
                    <div class="cart-goods-item" v-for="(item, index) in cartItem" :key="index">
                        <div class="box select">
                            <input type="checkbox" :checked="item.selectStatus" @click="selectGoods(index)">
                            <img :src="'http://localhost:8080/shop/public/static/'+item.image" :alt="item.title">
                        </div>

                        <div class="box info">
                            <p class="title">{{item.title}}</p>                            
                        </div>

                        <div class="box price">
                            <p class="p1"><span>￥{{item.old_price}}</span></p>
                            <p class="p2"><span>￥{{item.new_price}}</span></p>
                        </div>

                        <div class="box number">
                            <span class="reduce" @click="reduce(item.id)">-</span>
                            <span class="add" @click="add(item.id)">+</span>
                            <input type="text" v-model="item.chooseNum">
                        </div>

                        <div class="box total-price">
                            <p class="p1"><span>￥{{item.new_price}}</span></p>
                        </div>

                        <div class="box caozuo">
                            <a @click="addToCollection(item.id)">移入收藏夹</a>
                            <a @click="deleteItem(item.id)">删除</a>
                        </div>
                    </div>
                    <!-- <div class="cart-goods-item">
                        <div class="box select">
                            <input type="checkbox" >
                            <img src="~@/assets/images/2.jpg" alt="">
                        </div>

                        <div class="box info">
                            <p class="title">sasad撒多撒多付群发的发</p>                            
                        </div>

                        <div class="box price">
                            <p class="p1"><span>￥89</span></p>
                            <p class="p2"><span>￥9</span></p>
                        </div>

                        <div class="box number">
                            <span class="reduce" @click="reduce()">-</span>
                            <span class="add" @click="add()">+</span>
                            <input type="text" v-model="num">
                        </div>

                        <div class="box total-price">
                            <p class="p1"><span>￥89</span></p>
                        </div>

                        <div class="box caozuo">
                            <a>移入收藏夹</a>
                            <a>删除</a>
                        </div>
                    </div> -->
                </div>

                <!--筛选的购物车商品-->
                <div class="cart-goods-wrap" v-else>
                    <div class="cart-goods-item" v-for="(item, index) in search_result" :key="index">
                        <div class="box select">
                            <input type="checkbox" :checked="item.selectStatus" @click="selectGoods(index)">
                            <img :src="'http://localhost:8080/shop/public/static/'+item.image" alt="">
                        </div>

                        <div class="box info">
                            <p class="title">{{item.title}}</p>                            
                        </div>

                        <div class="box price">
                            <p class="p1"><span>￥{{item.old_price}}</span></p>
                            <p class="p2"><span>￥{{item.new_price}}</span></p>
                        </div>

                        <div class="box number">
                            <span class="reduce" @click="reduce(item.id)">-</span>
                            <span class="add" @click="add(item.id)">+</span>
                            <input type="text" v-model="item.chooseNum">
                        </div>

                        <div class="box total-price">
                            <p class="p1"><span>￥{{item.new_price}}</span></p>
                        </div>

                        <div class="box caozuo">
                            <a @click="addToCollection(item.id)">移入收藏夹</a>
                            <a @click="deleteItem(item.id)">删除</a>
                        </div>
                    </div>
                </div>

                <div class="fixed-box-wrap">
                    <div class="fixed-box">
                        <div class="left">
                            <p><label><input type="checkbox" :checked="checkAllFlag" @click="checkAll()"> 全选</label></p>
                            <p @click="deleteMore()"><span>删除</span></p>
                            <p><span>清除失效宝贝</span></p>
                            <p @click="addAllToCollection()"><span>移入收藏夹</span></p>
                            <p><span>分享</span></p>
                        </div>
                        <div class="right">
                            <div>已选商品 <span>{{allChooseNum}}</span> 件</div>
                            <div>合计（不含运费）：<span>{{totalPrice}}</span></div>
                            <div class="jiesuan active" v-if="totalPrice>0" @click="createOrder()">结算</div>
                            <div class="jiesuan" v-else>结算</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
export default {
    name: "cart",
    data() {
        return {
            num: 1,
            search_content: '', //输入搜索的内容
            search_result: [],  //存放查找结果
            is_allGoods_hidden: false,
            is_searchGoods_hidden: true,
            cartItem: '',   //所有购物车商品
            cartItemNum: 0, //购物车商品类别数量
            searchResultNum: 0, //购物车查询结果数量
            checkAllFlag: true, //判断是否全选
        }
    },
    created() {
        this.cartItem = this.$store.state.cartsProducts;
        this.cartItemNum = this.cartItem.length;
        console.log(this.cartItem)
    },
    methods: {
        selectGoods(index) {
            this.cartItem[index].selectStatus = !this.cartItem[index].selectStatus;
            this.checkAllFlag = this.cartItem.every(item => {
                return item.selectStatus == true;
            });
        },
        checkAll() {
            this.checkAllFlag = !this.checkAllFlag;
            this.cartItem.map(item => {
                if(item.selectStatus != this.checkAllFlag) {
                    item.selectStatus = !item.selectStatus;
                }
            });
        },
        reduce(id) {
            let index = this.getProductIndex(id);
            this.$store.commit("reduce", index);
        },
        add(id) {
            let index = this.getProductIndex(id);
            this.$store.commit("add", index);
        },

        //加入收藏夹
        addToCollection(id) {
            this.$post("/person/addcollection", {"pid": id})
                .then(res => {
                    if(res.code == 200) {
                        this.$Message.success(res.data.info);
                    } else {
                        this.$Message.warning(res.data.info);                        
                    }
                })
                .catch(err => {
                    this.$Message.warning(err);
                });
        },
        deleteItem(id) {
            let index = this.getProductIndex(id);
            this.$Modal.confirm({
                title: '操作',
                content: '确认删除购物车项吗？',
                onOk: () => {
                    this.$store.commit("delete", index);
                    this.$Message.info('删除成功');
                },
                onCancel: () => {
                    // this.$Message.info('取消删除');
                }
            });
        },
        //批量删除
        deleteMore() {
            let deleteArr = [];
            this.$Modal.confirm({
                title: '操作',
                content: '确认删除选中项吗？',
                onOk: () => {
                    for(let i = 0, len = this.cartItem.length; i < len; i++) {
                        if(this.cartItem[i].selectStatus) {
                            deleteArr.push(this.getProductIndex(this.cartItem[i].id));
                        }
                    }
                    this.$store.commit("deleteMore", deleteArr);
                    this.$Message.info('删除成功');
                },
                onCancel: () => {
                    // this.$Message.info('取消删除');
                }
            });
            
        },
        getProductIndex(id) {
            let index = -1;
            let cartItem = this.cartItem;
            let length = cartItem.length;
            for(let i = 0; i < length; i++) {
                if(cartItem[i].id == id) {
                    index = i;
                }
            }
            return index;
        },

        //计算选中商品的属性(下单的时候用到该函数)
        calcTotalAccountAndCounts(cartItems) {
            let len = cartItems.length;
            let account = 0,    //选中商品的总价格
                selectedCounts = 0,     //选中商品的总数量
                selectedTypeCounts = 0;     //选中商品的类别总数量
            
            let _m = 100;
            for(let i = 0; i < len; i++) {
                if(cartItems[i].selectStatus) {
                    account += Number(cartItems[i].new_price) * _m * cartItems[i].chooseNum * _m;
                    selectedCounts += cartItems[i].chooseNum;
                    selectedTypeCounts++;
                }
            }

            return {
                selectedCounts: selectedCounts,
                selectedTypeCounts: selectedTypeCounts,
                account: account / (_m * _m)
            }

        },

        //根据商品名查找相应商品
        searchCartItem() {
            for(let i = 0, len = this.cartItem.length; i < len; i++) {
                if(this.cartItem[i].title.indexOf(this.search_content) != -1) {
                    this.search_result.push(this.cartItem[i]);
                    this.searchResultNum = this.search_result.length;
                }
            }
            this.is_searchGoods_hidden = false;
        },
        //返回购物车全部商品
        showAllCartItems() {
            this.is_allGoods_hidden = false;
            this.is_searchGoods_hidden = true;
            this.search_result = [];
        },

        //生成订单
        createOrder() {
            // let cartItem = JSON.parse(localStorage.getItem("cartItem"));
            let cartItem = this.cartItem;
            let order_items = [];
            let uid = JSON.parse(localStorage.getItem("userInfo")).id;
            //选中的商品放入订单
            cartItem.forEach(element => {
                if(element.selectStatus == 1) {
                    order_items.push(element);
                }
            });
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
                        "order_items": JSON.stringify(order_items)      
                        //在此处用JSON.stringify将对象转为字符串，在订单页再转为对象，否则一刷新参数就消失了
                    }
                });
            }
        }
    },
    computed: {
        allChooseNum() {
            let count = 0;
            for(let i = 0, len = this.cartItem.length; i < len; i++) {
                if(this.cartItem[i].selectStatus) {
                    count += this.cartItem[i].chooseNum;
                }
            }
            return count;
        },
        totalPrice() {
            let totalPrice = 0;
            for(let i = 0, len = this.cartItem.length; i < len; i++) {
                if(this.cartItem[i].selectStatus) {
                    totalPrice += this.cartItem[i].new_price * this.cartItem[i].chooseNum;
                }
            }
            return totalPrice.toFixed(2);
        },
    },
    components: {
        HeaderTop
    },
    watch: {
        "$route" (to, from) {
            this.$router.go(0);
        }
    }
}
</script>

<style scoped lang="less">
    .cart-wrap {
        width: 990px;
        margin: 0 auto;
        background-color: #fff;
        .top {
            width: 100%;
            height: 80px;
            .logo {
                float: left;
                padding: 25px 80px;
            }
            .search {
                position: relative;
                float: right;
                padding: 25px 80px;
                input {
                    width: 260px;
                    height: 29px;
                    border: 2px solid #00af8d;
                    text-indent: 10px;
                }
                .search-btn {
                    position: absolute;
                    right: 0;
                    top: 25px;
                    width: 80px;
                    height: 29px;
                    text-align: center;
                    line-height: 29px;
                    background-color: #00af8d;
                    font-size: 16px;
                    color: #fff;
                    letter-spacing: 5px;
                    cursor: pointer;
                }
            }
        }
        .main {
            width: 100%;
            .main-top {
                width: 100%;
                height: 40px;
                border-bottom: 2px solid #ccc;
                margin-top: -2px;
                .all-goods, .search-goods {
                    float: left;
                    width: 150px;
                    height: 100%;
                    margin-right: 10px;
                    text-align: center;
                    line-height: 40px;
                    color: #00af8d;
                    border-bottom: 2px solid #00af8d;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .main-center {
                margin-top: 20px;
                margin-bottom: 25px;
                text-align: left;
                padding: 0 10px;
                .title {
                    display: inline-block;
                    width: 120px;
                    height: 40px;
                    text-align: left;
                }
                // .all-select {
                //     text-align: left;
                // }
                .info {
                    // text-align: left;
                    width: 365px;
                }
            }
            .cart-goods-wrap {
                width: 100%;
                .cart-goods-item {
                    width: 100%;
                    background-color: rgb(247, 247, 247);
                    border: 1px solid rgb(238, 235, 235);
                    padding: 15px;
                    height: 100px;
                    margin-bottom: 45px;
                    .box {
                        position: relative;
                        width: 115px;
                        float: left;
                        input {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        img {
                            width: 60px;
                        }
                        .title {
                            text-align: left;
                        }
                    }
                    .info {
                        width: 365px;
                    }
                    .price {
                        width: 120px;
                        text-align: left;
                        .p1 {
                            color: #aaa;
                            span {
                                text-decoration: line-through;
                            }
                        }
                        .p2 {
                            font-size: 12px;
                        }
                    }
                    .number {
                        margin-top: 5px;
                        width: 120px;
                        span {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 15px;
                            height: 20px;
                            background-color: #bbb;
                            text-align: center;
                            line-height: 20px;
                            cursor: pointer;
                        }
                        .add {
                            left: 55px;
                        }
                        input {
                            width: 40px;
                            height: 20px;
                            margin-left: 15px;
                            outline: 0;
                            text-align: center;
                        }
                    }
                    .total-price {
                        width: 120px;
                        text-align: left;
                        .p1 {
                            color: #f60;
                            font-weight: bold;
                        }
                    }
                    .caozuo {
                        // width: 120px;
                        text-align: left;
                        a {
                            color: #000;
                            display: block;
                            margin-top: 3px;
                        }
                    }
                }
            }
            .fixed-box-wrap {
                width: 100%;
                height: 45px;
                margin: 0 auto;
                background-color: #fff;
                .fixed-box {
                    position: fixed;
                    bottom: 0;
                    width: 990px;
                    height: 45px;
                    background-color: #ddd;
                    .left {
                        float: left;
                        // width: 360px;
                        p {
                            float: left;
                            height: 45px;
                            padding: 0 15px;
                            line-height: 45px;
                            text-align: center;
                            span {
                                cursor: pointer;
                            }
                        }
                    }
                    .right {
                        float: right;
                        div {
                            float: left;
                            height: 45px;
                            padding: 0 15px;
                            text-align: center;
                            line-height: 45px;
                            span {
                                color: #f60;
                                font-weight: bold;
                                font-size: 16px;
                            }
                        }
                        .jiesuan {
                            padding: 0 40px;
                            background-color: #aaa;
                            color: #fff;
                            font-size: 16px;
                            letter-spacing: 5px;
                            cursor: pointer;
                        }
                        .active {
                            background-color: #f60;
                        }
                    }
                }
            }
        }
    }
</style>
