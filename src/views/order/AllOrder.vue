<template>
    <div style="background-color:#fff;">
        <HeaderTop />

        <div class="wrap">
            <PersonSlide :num="3"/>

            <div class="orders">
                <div class="top">
                    <p class="name">
                        {{userInfo.account_username}}
                        <span class="phone">( {{userInfo.account_name}} )</span>
                    </p>
                </div>
                <div class="order-box">
                    <ul>
                        <li @click="getStatusOrder(0)">未付款 <span>{{statusSum[0]}}</span></li>
                        <li @click="getStatusOrder(1)">待发货 <span>{{statusSum[1]}}</span></li>
                        <li @click="getStatusOrder(2)">待收货 <span>{{statusSum[2]}}</span></li>
                        <li @click="getStatusOrder(3)">待评价 <span>{{statusSum[3]}}</span></li>
                        <li @click="getStatusOrder(4)">退款 <span>{{statusSum[4]}}</span></li>
                    </ul>
                </div>
                <div class="order-show">
                    <div class="title">
                        <ul>
                            <li class="goods">宝贝</li>
                            <li class="li">单价</li>
                            <li class="li">数量</li>
                            <li class="li">实付款</li>
                            <li class="li">交易状态</li>
                        </ul>
                    </div>
                    <div class="order-item" v-for="(item, index) in orders" :key="index">
                        <div class="top">
                            <span class="date">{{item.addTime}}</span>
                            <span class="order-no">订单号：{{item.orderNumber}}</span>
                        </div>
                        <div class="content">
                            <ul>
                                <li class="goods">
                                    <div class="img" @click="goTo('/goods/detail', item.id)">
                                        <img :src="'http://localhost:8080/shop/public/static/'+item.frontImage" alt="">
                                    </div>
                                    <p class="name">{{item.name}}</p>
                                </li>
                                <li class="li">
                                    <p class="old">￥{{item.baseprice}}</p>
                                    <p class="new">￥{{item.sellprice}}</p>
                                </li>
                                <li class="li">{{item.amount}}</li>
                                <li class="li">￥{{item.totalPrice}}</li>
                                <li class="li">
                                    {{statusDesc(item.status)}}
                                    <p style="cursor:pointer;color:#aaa;" @click="getOrderDetail(item.oid)">订单详情</p>
                                    <p style="cursor:pointer;color:#aaa;" @click="comment(item.id)">评论</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="page">
                        <Button type="success" style="margin-right:10px;" @click="prev()">上一页</Button>
                        <Button type="success" @click="next()">下一页</Button>
                    </div>
                </div>
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import PersonSlide from "@/components/PersonSlide";
import myFooter from "@/components/Footer";
export default {
    name: "all-order",
    data() {
        return {
            orders: '', //所有订单
            statusSum: [],
            userInfo: '',   //用户信息
            page: 1,    //分页页码
            orders_num: 0,   //订单数量
        }
    },
    created() {
        this.getUserInfo();
        this.getAllOrder();
        this.getAllStatusSum();
    },
    methods: {
        getUserInfo() {
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        },
        getAllOrder() {
            this.$post("/order/showAll", {"setoff": this.page})
                .then(res => {
                    if(res.data.code == 200) {
                        this.orders = res.data.info;
                        this.orders_num = res.data.p_num;
                    }
                })
        },
        prev() {
            if(this.page <= 0) {
                return;
            } else {
                this.page--;
                this.getAllOrder();
            }
        },
        next() {
            if(this.page >= this.orders_num) {
                return;
            } else {
                this.page++;
                this.getAllOrder();
            }
        },
        getAllStatusSum() {
            this.$get("/order/statuSum")
                .then(res => {
                    this.statusSum = res.data.info;
                })
        },
        getStatusOrder(status) {
            this.$post("/order/show", {"status": status})
                .then(res => {
                    if(res.data.code == 200) {
                        this.orders = res.data.info;
                    } else if(res.data.code == 400) {
                        this.orders = [];
                    }
                })
        },
        statusDesc(status) {
            switch(status) {
                case 0:
                    return "未付款";
                    break;
                case 1:
                    return "待发货";
                    break;
                case 2:
                    return "待收货";
                    break;
                case 3:
                    return "待评价";
                    break;
                case 4:
                    return "退款";
                    break;
                default: 
                    return;
            }
        },
        goTo(url, id) {
            this.$router.push({
                path: url,
                query: {
                    "gid": id
                }
            });
        },
        getOrderDetail(oid) {
            this.$router.push({
                path: "/order/one-detail",
                query: {
                    "oid": oid
                }
            });
        },
        comment(id) {
            this.$router.push({
                path: "/order/comment",
                query: {
                    "gid": id
                }
            });
        }
    },
    components: {
        HeaderTop,
        PersonSlide,
        myFooter
    }
}
</script>

<style scoped lang="less">
    ul, li {
        list-style: none;
    }
    .wrap {
        min-height: 350px;
        .orders {
            text-align: left;
            width: 790px;
            // margin: 50px auto;
            background-color: #fff;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 50px;
            border: 1px solid #eee;
            padding: 5px;
            .top {
                vertical-align: middle;
                color: #546d7e;
                padding: 10px;
                background: #f5f8fa;
                border-bottom: 1px solid #e4eaee;
                line-height: 23px;
                padding-top: 11px;
                padding-bottom: 8px;
                .name {
                    font-size: 18px;
                    span {
                        font-size: 12px;
                    }
                }
            }
            .order-box {
                border: 1px solid #eee;
                height: 40px;
                margin-top: 5px;
                ul {
                    li {
                        width: 20%;
                        float: left;
                        height: 30px;
                        text-align: center;
                        cursor: pointer;
                        line-height: 30px;
                        margin-top: 5px;
                        border-right: 1px solid #eee;
                        transition: all .3s;
                        &:last-child {
                            border-right: none;
                        }
                        &:hover {
                            color: #f60;
                        }
                        span {
                            color: #f60;
                        }
                    }
                }
            }
            .order-show {
                .title {
                    width: 100%;
                    height: 35px;
                    margin-top: 5px;
                    background-color: #f5f5f5;
                    border: 1px solid #e8e8e8;
                    ul {
                        li {
                            float: left;
                            height: 100%;
                            width: 120px;
                            text-align: center;
                            line-height: 35px;
                        }
                        .goods {
                            width: 280px;
                        }
                    }
                }
                .order-item {
                    width: 100%;
                    margin-top: 10px;
                    height: 160px;
                    border: 1px solid #ccc;
                    .top {
                        .date {
                            font-weight: bold;
                            margin-right: 15px;
                        }
                    }
                    .content {
                        li {
                            float: left;
                            height: 100%;
                            width: 120px;
                            text-align: center;
                            padding-top: 20px;
                            .old {
                                text-decoration: line-through;
                                color: #aaa;
                            }
                        }
                        .goods {
                            width: 280px;
                            position: relative;
                            padding: 5px 0;
                            text-align: left;
                            .img {
                                width: 80px;
                                height: 80px;
                                margin-left: 15px;
                                margin-top: 10px;
                                img {
                                    width: 100%;
                                    cursor: pointer;
                                }
                            }
                            .name {
                                position: absolute;
                                left: 110px;
                                top: 15px;
                                width: 140px;
                                color: #3c3c3c;
                                text-decoration: none;
                                word-break: break-all;
                                line-height: 16px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .page {
                    padding: 15px 10px 0;
                    
                }
            }
        }
    }
</style>
