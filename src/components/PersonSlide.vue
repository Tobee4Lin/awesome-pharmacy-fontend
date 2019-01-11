<template>
    <div class="slide">
        <p class="title">管理中心</p>
        <p><a :class="{'active': num==1}" @click="goTo('/account/info')">个人信息管理</a></p>
        <p><a :class="{'active': num==2}" @click="goTo('/account/address')">收货地址管理</a></p>
        <p><a :class="{'active': num==3}" @click="goTo('/order/all-order')">所有订单管理</a></p>
    </div>
</template>

<script>
export default {
    name: "person-slide",
    data() {
        return {
            uid: '',
        }
    },
    props: ["num"],
    created() {
        this.uid = JSON.parse(localStorage.getItem("userInfo")).id || '';
    },
    methods: {
        goTo(url) {
            this.$router.push({
                path: url,
                query: {
                    "uid": this.uid
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
    .slide {
        width: 200px;
        background-color: #fff;
        display: inline-block;
        vertical-align: top;
        margin-right: 5px;
        p {
            margin: 10px 0;
            a {
                color: #000;
            }
            .active {
                color: #f60;
            }
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #f60;
        }
    }
</style>
