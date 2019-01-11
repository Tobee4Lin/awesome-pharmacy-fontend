<template>
    <div style="background-color:#fff;">
        <HeaderTop />

        <div class="order-detail-box">
            <div class="detail-top">
                <div class="left">
                    <p class="p1">订单信息</p>
                    <ul class="table-list">
                        <li>
                            <div class="t-left">收货地址：</div>
                            <div class="t-right">
                                <span>{{order_detail.address}} {{order_detail.addressDetail}}</span>
                            </div>
                        </li>
                        <li>
                            <div class="t-left">订单编号：</div>
                            <div class="t-right">
                                <span>{{order_detail.orderNumber}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <p class="p1">订单状态：{{statusDesc(order_detail.status)}}</p>
                </div>
            </div>

            <div class="order-show">
                <div class="title">
                    <ul>
                        <li class="goods">宝贝</li>
                        <li class="li">单价</li>
                        <li class="li">数量</li>
                        <li class="li">交易状态</li>
                    </ul>
                </div>
                <div class="order-item">
                <!-- <div class="order-item" > -->
                    <div class="content">
                        <ul>
                            <li class="goods">
                                <div class="img" @click="goTo('/goods/detail', order_detail.id)">
                                <!-- <div class="img"> -->
                                    <img :src="'http://localhost:8080/shop/public/static/'+order_detail.frontImage" alt="">
                                    <!-- <img src="../../assets/images/first_img/538135755514_160x160.jpg" alt=""> -->
                                </div>
                                <p class="name" @click="goTo('/goods/detail', order_detail.id)">{{order_detail.name}}</p>
                            </li>
                            <li class="li">
                                <p class="new">￥{{order_detail.sellprice}}</p>
                            </li>
                            <li class="li">{{order_detail.amount}}</li>
                            <li class="li">
                                {{statusDesc(order_detail.status)}}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="total-price">
                    <p class="p1">
                        <span class="s1">实付款：</span>
                        <span class="s2">￥{{totalPrice}}</span>
                    </p>
                </div>
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import myFooter from "@/components/Footer";
export default {
    name: "one-detail",
    data() {
        return {
            order_detail: '',   //订单详情
            totalPrice: '',
        }
    },
    created() {
        this.getOneOrderDetail();
    },
    methods: {
        getOneOrderDetail() {
            let oid = this.$route.query.oid;
            console.log(oid)
            this.$post("/order/detail", {"id": oid})
                .then(res => {
                    this.order_detail = res.data.info[0];
                    console.log(res.data);
                    this.totalPrice = this.order_detail.amount * this.order_detail.sellprice;
                })
        },
        goTo(url, id) {
            this.$router.push({
                path: url,
                query: {
                    "gid": id
                }
            });
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
    },
    components: {
        HeaderTop,
        myFooter
    }
}
</script>

<style scoped lang="less">
    ul, li {
        list-style: none;
    }
    .order-detail-box {
        width: 990px;
        margin: 100px auto;
        .detail-top {
            width: 100%;
            text-align: left;
            border: 1px solid #DDD;
            .left {
                width: 266px;
                height: 228px;
                color: #666;
                background-color: #fbfbfb;
                border-right: 1px solid #DDD;
                vertical-align: top;
                display: inline-block;
                .p1 {
                    width: 100%;
                    height: 29px;
                    border-bottom: 1px solid #DDD;
                    background-color: #F3F3F3;
                    line-height: 29px;
                    color: #333;
                    font-size: 12px;
                    font-weight: 700;
                    text-align: left;
                    padding-left: 20px;
                }
                .table-list {
                    padding-bottom: 15px;
                    li {
                        width: 236px;
                        line-height: 1.5;
                        margin: 10px 8px 0 20px;
                        .t-left {
                            min-width: 62px;
                            display: inline-block;
                            zoom: 1;
                            vertical-align: top;
                            
                        }
                        .t-right {
                            width: 162px;
                            display: inline-block;
                            zoom: 1;
                            color: #666;
                            text-align: left;
                            span {
                                word-wrap: break-word;
                                word-break: break-all;
                                display: inline-block;
                            }
                        }
                    }

                }
            }
            .right {
                vertical-align: top;
                height: 228px;
                width: 722px;
                display: inline-block;
                padding: 40px;
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
                        width: 200px;
                        text-align: center;
                        line-height: 35px;
                    }
                    .goods {
                        width: 370px;
                    }
                }
            }
            .order-item {
                width: 100%;
                margin-top: 10px;
                height: 120px;
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
                        width: 200px;
                        text-align: center;
                        padding-top: 20px;
                        .old {
                            text-decoration: line-through;
                            color: #aaa;
                        }
                    }
                    .goods {
                        width: 370px;
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
        }

        .total-price {
            width: 100%;
            height: 60px;
            margin-top: 20px;
            background-color: #F3F3F3;
            text-align: right;
            line-height: 60px;
            .p1 {
                text-align: right;
                padding-right: 20px;
                .s1 {
                    font-size: 16px;
                    font-weight: bold;
                }
                .s2 {
                    color: #f10;
                    font-size: 16px;
                    font-weight: bold;
                    margin-left: 50px;
                }
            }
        }
    }
</style>
