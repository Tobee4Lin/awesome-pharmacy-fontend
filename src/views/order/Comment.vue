<template>
    <div>
        <HeaderTop />
        
        <div class="comment">
            <p class="p1">对订单发表一下评价吧......</p>
            <div class="order-detail">
                <Card style="width:320px">
                    <div style="text-align:center">
                        <img :src="'http://localhost:8080/shop/public/static/'+goods_detail.frontImage">
                        <h4>{{goods_detail.name}}</h4>
                    </div>
                </Card>
            </div>
            <div class="content">
                <Rate v-model="heart" icon="ios-heart" @on-change="(value)=>{changeRate(value)}"/>
                <div class="text">
                    <Input v-model="text" type="textarea" :rows="4" placeholder="随便说点什么..." />
                    <Button type="success" style="margin-top:10px;" @click="commitComment()">评论</Button>
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
    name: "comment",
    data() {
        return {
            gid: '',
            goods_detail: '',
            heart: 0,
            text: ''
        }
    },
    created() {
        this.gid = this.$route.query.gid;
        this.getGoodsDetail();
    },
    methods: {
        getGoodsDetail() {
            this.$post("/goods/detail", {"id": this.gid})
                .then(res => {
                    this.goods_detail = res.data.info;
                    console.log(this.goods_detail)
                })
        },
        changeRate(value) {
            this.heart = value;
        },
        commitComment() {
            let data = {
                "pid": this.goods_detail.id,
                "rate": this.heart,
                "comment": this.text
            }
            this.$post("/goods/AddComments", data)
                .then(res => {
                    if(res.data.code == 200) {
                        this.$Message.success("添加成功");
                        setTimeout(() => {
                            this.$router.push("/order/all-order");
                        }, 1000);
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
    .comment {
        margin: 130px auto;
        width: 790px;
        text-align: left;
        .p1 {
            width: 100%;
            height: 35px;
            padding-left: 20px;
            line-height: 35px;
            font-size: 12px;
            font-weight: 700;
            background-color: #00cbab;
            color: #Fff;
            border-radius: 4px;
        }
        .order-detail {
            margin-top: 10px;
        }
        .content {
            margin-top: 10px;
            background-color: #fff;
            border: 1px solid #eee;
            padding: 20px;
            .text {
                margin-top: 5px;
            }
        }
    }
</style>
