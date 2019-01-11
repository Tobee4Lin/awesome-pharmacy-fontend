<template>
    <div style="background:#fff;">
        <HeaderTop />

        <div class="no-collection" v-if="has_collection">
            <p style="font-size: 18px;">您还没有收藏过宝贝哦</p>
            <p><a href="/" style="color:#f60;">去随便逛逛吧</a>，看看有没有喜欢的</p>
        </div>
        <div class="collection" v-else>
            <div class="collection-top">
                <div class="left">全部宝贝 <span>{{collection.length}}</span></div>
                <div class="right cancel-all" @click="cancelManageAll()">取消</div>
                <div class="right manage-all" @click="manageAll()">批量管理</div>
                <div class="right delete-all" @click="delete_items()">删除</div>
            </div>
            <div class="collection-content" v-if="collection">
                <div class="item" v-for="(item, index) in collection" :key="index" @click="getDetail(item.pid)">
                    <div class="img">
                        <a ><img src="~@/assets/images/3.jpg" alt=""></a>
                    </div>
                    <div class="title"><a >{{item.name}}</a></div>
                    <p class="price">￥ {{item.sellprice}}</p>
                    <div class="delete-item" @click.stop="delete_item(item.id)"><i class="iconfont icon-shanchu"></i></div>
                    <div class="choose-item" @click.stop="choose(item.id, index)"><i class="iconfont icon-gou"></i></div>
                    <div class="choose-mask" @click.stop="choose(item.id, index)"></div>
                </div>
            </div>
            <div class="collection-content" v-else><p style="margin: 40px auto;text-align: center;font-size:26px;">暂无收藏</p></div>
        </div>
        <myFooter />
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import myFooter from "@/components/Footer";
export default {
    name: "collection",
    data() {
        return {
            has_collection: false,
            collection: '', //收藏夹商品
            choose_items: [],   //选中删除的商品
            limit: -1,
        }
    },
    created() {
        this.getCollection();
    },
    methods: {
        //获取收藏夹商品
        getCollection() {
            this.$get("/person/collection")
                .then(res => {
                    if(res.data.code == 200) {
                        this.collection = res.data.info;
                    }
                    console.log(this.collection)
                })
        },
        
        //删除收藏夹商品
        delete_item(goods_id) {
            this.$Modal.confirm({
                title: '操作',
                content: '确认删除收藏夹项吗？',
                onOk: () => {
                    this.$post("/person/deletecollection", {"pid": goods_id})
                        .then(res => {
                            if(res.data.code == 200) {
                                this.$Message.info(res.data.info);
                                setTimeout(() => {
                                    this.$router.go(0);
                                }, 500);
                            } else {
                                this.$Message.warning(res.data.info);
                            }
                        })
                },
                onCancel: () => {
                    // this.$Message.info('取消删除');
                }
            });
            
        },

        //批量删除
        manageAll() {
            let choose_items_icon = document.querySelectorAll(".choose-item");
            let delete_items_icon = document.querySelectorAll(".delete-item");
            let manage_all = document.getElementsByClassName("manage-all")[0];
            let delete_all = document.getElementsByClassName("delete-all")[0];
            let cancel_manage_all = document.getElementsByClassName("cancel-all")[0];
            let choose_mask = document.querySelectorAll(".choose-mask");
            let c_items = document.querySelectorAll(".item");

            for(let i = 0; i < choose_items_icon.length; i++) {
                choose_items_icon[i].style.display = "block";
            }
            cancel_manage_all.style.display = "block";
            manage_all.style.display = "none";
            delete_all.style.display = "block";
            // manage_all.innerHTML = "删除";

            for(let i = 0; i < c_items.length; i++) {
                c_items[i].onmouseover = function() {
                    for(let j = 0; j < choose_mask.length; j++) {
                        choose_mask[j].style.display = "none";
                        delete_items_icon[j].style.display = "none";
                    }
                    choose_mask[i].style.display = "block";
                }
                c_items[i].onmouseleave = function() {
                    // for(let j = 0; j < choose_mask.length; j++) {
                    //     choose_mask[j].style.display = "none";
                    //     delete_items_icon[j].style.display = "none";
                    // }
                    choose_mask[i].style.display = "none";
                }
            }
        },
        //取消批量删除
        cancelManageAll() {
            let choose_items_icon = document.querySelectorAll(".choose-item");
            let delete_items_icon = document.querySelectorAll(".delete-item");
            let manage_all = document.getElementsByClassName("manage-all")[0];
            let cancel_manage_all = document.getElementsByClassName("cancel-all")[0];
            let choose_mask = document.querySelectorAll(".choose-mask");
            let c_items = document.querySelectorAll(".item");

            for(let i = 0; i < choose_items_icon.length; i++) {
                choose_items_icon[i].style.display = "none";
            }
            cancel_manage_all.style.display = "none";
            manage_all.innerHTML = "批量管理";
            
            for(let i = 0; i < c_items.length; i++) {
                c_items[i].onmouseover = function() {
                    choose_mask[i].style.display = "none";
                    for(let j = 0; j < delete_items_icon.length; j++) {
                        delete_items_icon[j].style.display = "none";
                    }
                    delete_items_icon[i].style.display = "block";
                }
            }
        },
        //选择
        choose(id, index) {
            let choose_items_icon = document.querySelectorAll(".choose-item");
            if(!choose_items_icon[index].selectStatus) {
                choose_items_icon[index].selectStatus = !choose_items_icon[index].selectStatus;
                choose_items_icon[index].style.borderTopColor = "#f60";
                choose_items_icon[index].style.borderRightColor = "#f60";
                this.choose_items.push(id);
            } else {
                choose_items_icon[index].selectStatus = !choose_items_icon[index].selectStatus;
                choose_items_icon[index].style.borderTopColor = "rgba(0,0,0.5)";
                choose_items_icon[index].style.borderRightColor = "rgba(0,0,0.5)";
                this.choose_items.pop(id);
            }
            // console.log(this.choose_items)

        },
        //批量删除收藏夹商品
        delete_items() {
            let ids = this.choose_items;
            console.log(ids)
            this.$Modal.confirm({
                title: '操作',
                content: '确认删除收藏夹项吗？',
                onOk: () => {
                    // axios.post("/person/deletecollection", {
                    //     params: ids,
                    //     paramsSerializer: function(params) {
                    //         return Qs.stringify(params, {arrayFormat: 'repeat'})
                    //     }
                    // })
                    this.$post("/person/deletecollection", {"pid": ids})
                    .then(res => {
                        console.log(ids)
                        if(res.data.code == 200) {
                            this.$Message.info(res.data.info);
                            setTimeout(() => {
                                this.$router.go(0);
                            }, 500);
                        } else {
                            this.$Message.warning(res.data.info);
                        }
                    })
                },
                onCancel: () => {
                    // this.$Message.info('取消删除');
                }
            });
        },

        getDetail(goods_id) {
            this.$router.push({
                path: "/goods/detail",
                query: {
                    gid: goods_id
                }
            });
        },
    },
    components: {
        HeaderTop,
        myFooter
    }
}
</script>

<style scoped lang="less">
    html {
        background-color: #fff;
    }
    .no-collection {
        padding: 50px 0 250px;
    }

    .collection {
        width: 1200px;
        background-color: #fff;
        margin: 0 auto;
        .collection-top {
            width: 100%;
            height: 45px;
            border-bottom: 2px solid #eee;
            margin-bottom: 15px;
            .left {
                float: left;
                height: 100%;
                line-height: 45px;
                width: 120px;
                color: #f60;
                font-size: 14px;
                border-bottom: 2px solid #f60;
                cursor: pointer;
            }
            .right {
                float: right;
                height: 25px;
                line-height: 25px;
                border: 1px solid #aaa;
                margin-top: 10px;
                margin-right: 10px;
                padding: 0 10px;
                cursor: pointer;
                &:hover {
                    color: #f60;
                    border: 1px solid #f60;
                }
            }
            .cancel-all, .delete-all {
                display: none;
            }
        }
        .collection-content {
            width: 100%;
            min-height: 250px;
            background-color: #fff;
            text-align: left;
            .item {
                height: 226px;
                width: 150px;
                margin-right: 20px;
                display: inline-block;
                text-align: center;
                position: relative;
                margin-bottom: 14px;
                .img {
                    border: #eee 1px solid;
                    margin-bottom: 11px;
                    height: 148px;
                    overflow: hidden;
                    position: relative;
                    a {
                        width: 148px;
                        height: 148px;
                        display: block;
                        line-height: 145px;
                        img {
                            vertical-align: middle;
                            display: inline-block;
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                }
                .title {
                    height: 23px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    a {
                        color: #3c3c3c;
                    }
                }
                .price {
                    word-wrap: break-word;
                    word-break: normal;
                    height: 23px;
                    line-height: 23px;
                    overflow: hidden;
                    color: #f40;
                    font-weight: 700;
                }
                .delete-item {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 30px;
                    height: 30px;
                    background-color: rgba(0, 0, 0, .7);
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                    display: none;
                    &:hover {
                        background-color: #f60;
                    }
                }
                .choose-mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 148px;
                    height: 148px;
                    background-color: rgba(0, 0, 0, .4);
                    z-index: 10;
                    cursor: pointer;
                    display: none;
                }
                .choose-item {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0;
                    height: 0;
                    border-top: 20px solid rgba(0, 0, 0, .7);
                    border-right: 20px solid rgba(0, 0, 0, .7);
                    border-bottom: 20px solid transparent;
                    border-left: 20px solid transparent;
                    color: #fff;
                    text-align: center;
                    cursor: pointer;
                    z-index: 12;
                    display: none;
                    &:hover {
                        border-top: 20px solid #f60;
                        border-right: 20px solid #f60;
                        border-bottom: 20px solid transparent;
                        border-left: 20px solid transparent;
                    }
                    i {
                        display: block;
                        margin-top: -15px;
                        font-size: 12px;
                    }
                }
                .active {
                    border-top: 20px solid #f60;
                    border-right: 20px solid #f60;
                }
                &:hover {
                    .delete-item {
                        display: block;
                    }
                }
            }
        }
    }
</style>
