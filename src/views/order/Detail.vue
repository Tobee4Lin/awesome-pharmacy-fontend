<template>
    <div style="background-color:#fff;" id="_order">
        <HeaderTop />

        <div class="order">
            <div class="addr">
                <h3>选择收货地址</h3>
                <div :class="['addr-item', item.is_default==1?'active-bg':'']" 
                        v-for="(item, index) in address" 
                        :key="index"
                        @click="changeDefaultAddress($event, item.id)" 
                        v-if="address">
                    <div class="inner">
                        <p class="p1">
                            <!-- <span class="prov">广东</span>
                            <span class="city">东莞</span> -->
                            <span>{{item.address}}</span>
                            <span> （ </span>
                            <span class="name">{{item.name}}</span>
                            <span> ）收 </span>
                        </p>
                        <p class="p2">
                            <!-- <span class="town">松山湖 </span>
                            <span class="street"> 东莞理工学院 11329 </span> -->
                            <span>{{item.addressDetail}}</span>
                            <span class="phone"> {{item.phone}}</span>
                        </p>
                        <a class="verify" @click="modify_address(item.id)">修改</a>
                    </div>
                </div>
                <div v-else>请先添加一个收货地址</div>

                <div class="caozuo">
                    <a class="show-all">显示全部收货地址</a>
                    <a class="manage" @click="manageAddress()">管理收货地址</a>
                </div>
            </div>

            <div class="detail">
                <h3>确认订单信息</h3>
                <div class="content">
                    <ul class="name">
                        <li class="title">店铺宝贝</li>
                        <li class="price">单价</li>
                        <li class="num">数量</li>
                        <li class="total">小计</li>
                    </ul>
                    <div class="cont" v-for="(item, index) in order_items" :key="index">
                        <div class="f title">
                            <div class="img">
                                <img :src="'http://localhost:8080/shop/public/static/'+item.image" alt="">
                                <p>{{item.title}}</p>
                            </div>
                        </div>
                        <div class="f price">{{item.new_price | moneyFilter}}</div>
                        <div class="f num">{{item.chooseNum}}</div>
                        <div class="f total">{{item.new_price * item.chooseNum | moneyFilter}}</div>
                    </div>
                    <div class="total-price">
                        <span class="span1">店铺合计： <span class="span2"> ￥{{total_price | moneyFilter}}</span></span>
                    </div>
                </div>
            </div>

            <div class="pay-box">
                <div class="pay">
                    <div class="p1">
                        <span class="s1">实付款：</span>
                        <span class="s2">￥</span>
                        <span class="s3">{{total_price | moneyFilter}}</span>
                    </div>
                    <div class="p2">
                        <span class="s1">寄送至：</span> {{selected_address.address}} {{selected_address.addressDetail}}<br>
                        <span class="s1">收货人：</span> {{selected_address.name}} {{selected_address.phone}}
                    </div>
                </div>
                <div class="pay-btn" @click="addOrder()">
                    提交订单
                </div>
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import myFooter from "@/components/Footer";
import { toMoney } from "@/filter/moneyFilter";
export default {
    name: 'order-detail',
    data() {
        return {
            uid: '',    //订单用户ID
            order_items: [],    //订单商品
            addr_id: '',    //订单所选收货地址ID
            rFlag: true,
            address: '',    //用户所有地址
            selected_address: [],   //用户选取的收货地址
        }
    },
    created() {
        this.getOrderItems();
        this.getAddress();
    },
    methods: {
        getAddress() {
            this.$get("/account/showaddress")
                .then(res => {
                    let sort_address = res.data.info;
                    sort_address.sort(function(a, b) {
                        return b.is_default - a.is_default
                    });
                    this.address = sort_address;
                    // console.log(this.address)
                    this.address.map(item => {
                        if(item.is_default == 1) {
                            this.selected_address = item;
                            this.addr_id = item.id;
                        }
                        return;
                    })
                    // console.log(this.selected_address)
                })
        },
        changeDefaultAddress(e, id) {
            let addr_items = document.querySelectorAll(".addr-item");
            let _this = e.currentTarget;
            addr_items.forEach(item => {
                item.classList.remove("active-bg");
            });
            _this.classList.add("active-bg");
            // this.addr_id = id;
            this.address.map(item => {
                if(item.id == id) {
                    this.selected_address = item;
                    // console.log(this.selected_address)
                    this.addr_id = id;
                }
                return;
            })
        },
        modify_address(id) {
            this.$router.push({
                path: "/account/address",
                query: {
                    "id": id,
                    "uid": this.$route.query.uid
                }
            })
        },
        manageAddress() {
            this.$router.push({
                path: "/account/address",
                query: {
                    "uid": this.$route.query.uid
                }
            });
        },
        getOrderItems() {
            this.uid = this.$route.query.uid;
            this.order_items = JSON.parse(this.$route.query.order_items);
        },

        //下单
        async addOrder() {
            let _this = this;
            let data_arr = [];
            let order_num = '';
            for(let i = 0; i < this.order_items.length; i++) {
                // if(_this.rFlag) {
                //     _this.rFlag = false;
                    let data = {
                        "totalPrice": this.order_items[i].chooseNum*this.order_items[i].new_price,
                        "status": 0,    //有无付款的标志
                        "aid": this.addr_id,   //地址id
                        "pId": this.order_items[i].id,
                        "amount": this.order_items[i].chooseNum,    //商品总数量
                        "truename": this.selected_address.name,
                        "address": this.selected_address.address+this.selected_address.addressDetail,
                        "phone": this.selected_address.phone
                        //地址。联系人，电话 
                        //this.selected_address.address, this.selected_address.addressDetail, this.selected_address.name, this.selected_address.phone
                    };
                    data_arr.push(JSON.stringify(data));
                    console.log(data_arr);
                    // let res = await this.getOrderDataStatus(data);
                    
                    // order_num = res.data.order_num;
                    // console.log(order_num)
                    // _this.rFlag = true;
                // }
            }

            this.$post("/order/addOrder", data_arr)
                .then(res => {
                    order_num = res.data.order_num;

                    this.$Message.success("正在跳转支付页");
                    let title = '';
                    let content = '';
                    let totalPrice = 0;
                    title = this.order_items[0].title;
                    if(this.order_items.length > 1) {
                        title += `等 ${this.order_items.length} 件商品`;
                    }
                    this.order_items.forEach(item => {
                        content += item.title + ' ';
                        totalPrice += item.chooseNum*item.new_price;
                    });
                    
                    let alipay_data = {
                        "order_num": order_num,    //订单号
                        "goods_title": title,   //商品标题
                        "goods_price": totalPrice,  //总价格
                        "goods_content": content    //商品内容
                    };
                    console.log(alipay_data);
                    // setTimeout(() => {
                        this.$post("/pay/index", alipay_data)
                            .then(res => {
                                document.getElementById("_order").innerHTML = res.data;
                                this.$nextTick(() => {
                                    document.forms[0].submit();
                                })
                            })
                    // }, 1000);
                });


        },
        getOrderDataStatus(data) {
            return this.$post("/order/addOrder", data);
        }
    },
    destroyed() {
        //每次离开清除订单
        // localStorage.removeItem("order_items");
    },
    components: {
        HeaderTop,
        myFooter
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    computed: {
        total_price() {
            let t = 0;
            this.order_items.map(item => {
                t += item.chooseNum * item.new_price;
            });
            return t;
        }
    }
}
</script>

<style scoped lang="less">
    ul, li {
        list-style: none;
    }
    .order {
        width: 1090px;
        min-width: 1090px;
        margin: 100px auto;
        text-align: left;
        .addr {
            width: 100%;
            padding-left: 10px;
            h3 {
                padding: 20px 0;
            }
            
            .addr-item {
                padding: 10px 15px;
                width: 250px;
                display: inline-block;
                margin-right: 15px;
                margin-top: 15px;
                // border: 1px solid #ddd;
                cursor: pointer;
                background-image: url("../../assets/images/addr_inner.png");
                // background-image: url("../../assets/images/addr_active.png");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
                vertical-align: middle;
                .inner {
                    width: 100%;
                    overflow: hidden;
                    .p1 {
                        width: 100%;
                        padding: 5px 0;
                        border-bottom: 1px solid #eee;
                        .city {
                            font-weight: bold;
                        }
                    }
                    .p2 {
                        padding: 5px 0;
                        height: 45px;
                        overflow: hidden;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                    .verify {
                        display: block;
                        color: #c97;
                        cursor: pointer;
                    }
                }
            }
            .active-bg {
                background-image: url("../../assets/images/addr_active.png");
            }
            .caozuo {
                margin-top: 10px;
                .show-all, .manage {
                    color: #c97;
                }
                .manage {
                    float: right;
                }
            }
        }
        .detail {
            margin-top: 30px;
            .content {
                width: 100%;
                .name {
                    width: 100%;
                    height: 30px;
                    margin-top: 20px;
                    li {
                        float: left;
                        text-align: center;
                        line-height: 30px;
                        border-bottom: 3px solid #b2d1ff;
                        margin-right: 2px;
                    }
                    .title {
                        width: 530px;
                    }
                    .price {
                        width: 180px;
                    }
                    .num {
                        width: 180px;
                    }
                    .total {
                        width: 191px;
                    }
                }
                .cont {
                    width: 100%;
                    border-bottom: 1px dotted #ddd;
                    background-color: #fbfcff;
                    padding: 10px 0;
                    .f {
                        display: inline-block;
                        text-align: center;
                        height: 80px;
                        margin-right: 2px;
                    }
                    .title {
                        width: 530px;
                        position: relative;
                        padding: 5px 10px;
                        .img {
                            width: 80px;
                            height: 80px;
                            img {
                                width: 100%;
                            }
                        }
                        p {
                            position: absolute;
                            left: 100px;
                            top: 20px;
                            text-align: left;
                        }
                    }
                    .price {
                        width: 180px;
                        vertical-align: top;
                        padding-top: 35px;
                    }
                    .num {
                        width: 180px;
                        vertical-align: top;
                        padding-top: 35px;
                    }
                    .total {
                        width: 191px;
                        color: #f10;
                        font-weight: bold;
                        vertical-align: top;
                        padding-top: 35px;
                    }
                }
                .total-price {
                    width: 100%;
                    padding: 3px 10px 3px 0;
                    line-height: 45px;
                    background-color: #f2f7ff;
                    text-align: right;
                    .span1, .span2 {
                        display: inline-block;
                        line-height: 45px;
                    }
                    .span2 {
                        font-size: 18px;
                        font-weight: bold;
                        color: #f10;
                    }
                }
            }
        }
        .pay-box {
            text-align: right;
            position: relative;
            .pay {
                border: 1px solid #ff0036;
                min-width: 230px;
                padding: 10px 10px 10px 20px;
                display: inline-block;
                margin-top: 20px;
                text-align: right;
                .p1 {
                    .s1 {
                        font-weight: 700;
                        color: #333;
                    }
                    .s2 {
                        font-size: 26px;
                        margin-right: 4px;
                        color: #999;
                    }
                    .s3 {
                        color: #ff0036;
                        font: 700 26px tahoma;
                    }
                }
                .p2 {
                    line-height: 1.6;
                    margin-top: 10px;
                    .s1 {
                        font-weight: 700;
                        color: #333;
                    }
                }
            }
            .pay-btn {
                position: absolute;
                right: 0;
                bottom: -39px;
                width: 182px;
                height: 39px;
                vertical-align: middle;
                line-height: 39px;
                cursor: pointer;
                text-align: center;
                font-size: 14px;
                font-weight: 700;
                background: #ff0036;
                color: #fff;
            }
        }
    }
</style>
