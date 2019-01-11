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
                <p style="text-align:center;font-size:26px;">没有所查询的商品</p>
            </div>
            <div class="search-result" v-else>
                <div class="item" v-for="(item, index) in search_result" :key="index">
                    <a class="img">
                        <!-- <img :src="item.frontImage" alt=""> -->
                        <img src="../../assets/images/3.jpg" alt="">
                    </a>
                    <div class="info">
                        <p class="price">￥{{item.sellprice | moneyFilter}}</p>
                        <a class="title">{{item.name}}</a>
                        <div class="num">
                            <p class="sell-num">
                                总销量：<span>{{item.sell}}</span>
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
    name: "search",
    data() {
        return {
            input_content: '',
            search_result: [],  //存放搜索结果
            sortPriceFlag: 1,
        }
    },
    created() {
        this.getSearchData();
        this.initSearchMenu();
        this.ComprehensiveSort();
    },
    watch: {
        "$route": function(route) {
            this.$router.go(0);
        }
    },
    methods: {
        getSearchData() {
            this.input_content = this.$route.query.searchContent;
            // var data = new URLSearchParams();
            // data.append('search', this.input_content);
            let data = {
                "search": this.input_content
            };
            this.$post("goods/search", data)
                .then(res => {
                    if(res.data.code == 200) {
                        this.search_result = res.data.info;
                    }
                })
        },
        initSearchMenu() {
            let s_p = document.getElementsByClassName("search-p");
            for(let i = 0; i < s_p.length; i++) {
                //神奇的bug？点击无效
                s_p[i].addEventListener("click", function(e) {
                    console.log(1)
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
                    return a.price - b.price;
                })
                .thenBy((a, b) => {
                    return a.sell - b.sell
                })
            );
        },
        sortBySell() {
            this.handleSort("sell");
        },
        sortByCollection() {
            //
        },
        sortByPrice() {
            if(this.sortPriceFlag == 1) {
                this.sortPriceFlag = -1;
                this.handleSort("price");
            } else if (this.sortPriceFlag == -1) {
                this.sortPriceFlag = 1;
                this.search_result.sort((a, b) => {
                    return a.price - b.price;
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
    components: {
        HeaderTop,
        myFooter
    }
}
</script>

<style scoped lang="less">
    .search-goods-wrap {
        width: 1000px;
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
            min-height: 250px;
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
