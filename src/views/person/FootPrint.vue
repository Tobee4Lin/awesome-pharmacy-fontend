<template>
    <div style="background-color:#fff;">
        <HeaderTop />
        <div class="history-box">
            <div class="no-history" v-if="!historyList">
                <i class="iconfont icon-liulanjilu"></i>
                <p class="title">还没有浏览记录，去逛逛吧</p>
                <div class="btn" @click="showHome">去看看</div>
            </div>
            <div class="history-list-box" v-else v-for="(item, index) in mapHistoryList" :key="index">
                <p class="time">{{item.time}}</p>
                <div class="products">
                    <div class="product" v-for="product in item.history" :key="product.id" @click="getDetail(product.id)">
                        <img :src="'http://localhost:8080/shop/public/static/'+product.img" alt="">
                        <p class="price">￥{{product.price}}</p>
                        <p class="name">{{product.name}}</p>
                    </div>
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
    name: "footprint",
    data() {
        return {
            historyList: '',  //我的足迹
            mapHistoryList: '',
        }
    },
    created() {
        let id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).id : '';
        this.historyList = JSON.parse(localStorage.getItem(`historyInfo_${id}`));
        this.mapHistoryList = this.mapHistoryProducts((this.historyList));
        console.log(this.mapHistoryList)
    },
    methods: {
        mapHistoryProducts(arr) {
            if(!arr) return;
            let newArr = [];
            arr.forEach((product, i) => {
                let index = -1;
                let alreadyExists = newArr.some((newPro, j) => {
                    if (product.time === newPro.time) {
                        index = j;
                        return true;
                    }
                });
                if (!alreadyExists) {
                    newArr.push({
                        time: product.time,
                        history: [product.history]
                    });
                } else {
                    newArr[index].history.push(product.history);
                }
            });
            return newArr;
        },
        getDetail(id) {
            this.$router.push({
                path: "/goods/detail",
                query: {
                    "gid": id
                }
            })
        }
    },
    components: {
        HeaderTop,
        myFooter
    }
}
</script>

<style scoped lang="less">
    .history-box {
        width: 1100px;
        min-height: 250px;
        margin: 120px auto;
        background-color: #fff;
        .history-list-box {
            width: 100%;
            margin-bottom: 20px;
            .time {
                font-size: 24px;
                font-weight: bold;
                text-align: left;
            }
            .products {
                text-align: left;
                .product {
                    width: 170px;
                    height: auto;
                    border: 1px solid #eee;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 15px;
                    padding: 5px;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover {
                        box-shadow: 0 0 5px #ddd;
                    }
                    img {
                        width: 100%;
                    }
                    .price {
                        color: #f10;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .name {
                        font-size: 13px;
                        height: 22px;
                        line-height: 22px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-bottom: 2px;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
