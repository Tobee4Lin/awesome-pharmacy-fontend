<template>
    <div style="background-color: #fff;">
        <HeaderTop />

        <div class="search-goods-wrap">
            <div class="search-menu">
                <p class="search-p active" @click="ComprehensiveSort()">综合排序</p>
                <p class="search-p" @click="sortBySell()">销量<i class="iconfont icon-downarrow"></i></p>
                <p class="search-p">新品<i class="iconfont icon-downarrow"></i></p>
                <p class="search-p" @click="sortByCollection()">收藏<i class="iconfont icon-downarrow"></i></p>
                <p class="search-p" @click="sortByPrice()">价格<i class="iconfont icon-shangxiajiantou"></i></p>
            </div>
            <div class="search-result" v-if="search_result==''">
                <p style="margin:50px auto;font-size:24px;text-align:center;">该分类暂时没有商品</p>
            </div>
            <div class="search-result" v-else>
                <div class="item" v-for="(item, index) in search_result" :key="index" @click="getDetail(item.id)">
                    <a class="img">
                        <!-- <img src="../../assets/images/3.jpg" alt=""> -->
                        <img :src="'http://localhost:8080/shop/public/static/'+item.frontImage" alt="">
                    </a>
                    <div class="info">
                        <p class="price">￥{{item.sellprice | moneyFilter}}</p>
                        <a class="title">{{item.name}}</a>
                        <div class="num">
                            <p class="sell-num">
                                总销量：<span>{{item.sellcount}}</span>
                            </p>
                            <p><a class="comment-num">评价：{{item.commend}}</a></p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import { firstBy } from "thenby";
import { toMoney } from "@/filter/moneyFilter";
import HeaderTop from "@/components/HeaderTop";
import myFooter from "@/components/Footer";
export default {
    name: "searchByCategory",
    data() {
        return {
            search_result: [],
            sortPriceFlag: 1,
        }
    },
    created() {
        this.initSearchMenu();
        this.ComprehensiveSort();
        this.getCategoryData();
    },
    methods: {
        getCategoryData() {
            let data = {
                "id": this.$route.query.id
            }
            this.$post("/index/show", data)
                .then(res => {
                    if(res.data.code == 200) {
                        this.search_result = res.data.info;
                        console.log(this.search_result)
                    }
                });
        },
        getDetail(id) {
            this.$router.push({
                path: "/goods/detail",
                query: {
                    "gid": id
                }
            });
        },
        initSearchMenu() {
            let s_p = document.getElementsByClassName("search-p");
            for(let i = 0; i < s_p.length; i++) {
                //神奇的bug？点击无效
                s_p[i].addEventListener("click", function(e) {
                    for(let j = 0; j < s_p.length; j++) {
                        s_p[j].classList.remove("active");
                    }
                    this.classList.add("active");
                });
            }
        },
        //利用thenby实现综合排序
        ComprehensiveSort() {
            this.search_result.sort(
                firstBy((a, b) => {
                    return a.sellprice - b.sellprice;
                })
                .thenBy((a, b) => {
                    return a.sellcount - b.sellcount
                })
            );
        },
        sortBySell() {
            this.handleSort("sellcount");
        },
        sortByCollection() {
            //
        },
        sortByPrice() {
            if(this.sortPriceFlag == 1) {
                this.sortPriceFlag = -1;
                this.handleSort("sellprice");
            } else if (this.sortPriceFlag == -1) {
                this.sortPriceFlag = 1;
                this.search_result.sort((a, b) => {
                    return a.sellprice - b.sellprice;
                });
            }
        },
        handleSort(val) {
            this.search_result.sort((a, b) => {
                return b[val] - a[val];
            });
        }
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    computed: {
        
    },
    components: {
        HeaderTop,
        myFooter
    }
}
</script>

<style scoped lang="less">
    .search-goods-wrap {
        width: 1000px;
        min-height: 300px;
        margin: 0 auto;
        background-color: #fff;
        .search-menu {
            height: 29px;
            background-color: #eee;
            p {
                float: left;
                padding: 0 15px;
                height: 29px;
                line-height: 29px;
                text-align: center;
                background-color: #fff;
                border: 1px solid #aaa;
                border-left: 0;
                box-sizing: border-box;
                color: #806f66;
                cursor: pointer;
                &:first-child {
                    border-left: 1px solid #aaa;
                }
                &:hover {
                   color: #B10000;
                }
                i {
                    font-size: 10px;
                    color: #806f66;
                }
            }
            .active {
                color: #B10000;
                background: #F1EDEC;
            }
        }
        .search-result {
            width: 100%;
            margin: 30px auto;
            text-align: left;
            .item {
                // float: left;
                display: inline-block;
                width: 240px;
                margin: 0 10px 30px 0;
                background-color: #fff;
                
                .img {
                    width: 240px;
                    img {
                        width: 100%;
                    }
                }
                .info {
                    width: 240px;
                    text-align: left;
                    .price {
                        font-size: 14px;
                        font-weight: 700;
                        height: 40px;
                        line-height: 20px;
                        color: #c00;
                    }
                    .title {
                        color: #000;
                    }
                    .num {
                        p {
                            float: left;
                            padding: 0 5px;
                            span {
                                color: #c49173;
                            }
                            &:first-child {
                                padding-left: 0;
                                border-right: 1px solid #ccc;
                            }
                            a {
                                color: #38b;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
