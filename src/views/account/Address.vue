<template>
    <div style="background-color:#fff;">
        <HeaderTop />
        
        <div class="wrap">
            <PersonSlide :num="2"/>

            <div class="address">
                <p class="p1">收货地址</p>

                <div class="add-address">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                        <FormItem label="地址信息" prop="address" name="address">
                            <Cascader 
                                :data="city" 
                                v-model="address" 
                                placeholder="请选择省/市/区/街道" 
                                @on-change="(value, selectedData)=>{getLocalValue(value, selectedData)}">
                            </Cascader>
                        </FormItem>
                        <FormItem label="详细地址" prop="addressDetail" name="addressDatail">
                            <Input v-model="formValidate.addressDetail" placeholder="请输入详细地址信息"></Input>
                        </FormItem>
                        <FormItem label="收货人姓名" prop="name" name="name">
                            <Input v-model="formValidate.name" placeholder="长度不超过25个字符"></Input>
                        </FormItem>
                        <FormItem label="手机号码" prop="phone" name="phone">
                            <Input v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
                        </FormItem>
                        <FormItem label="" style="text-align:left;">
                            <CheckboxGroup v-model="formValidate.checkbox">
                                <Checkbox label="设为默认地址"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem  style="text-align:left;">
                            <Button type="primary" @click="handleSubmit('formValidate')">保存地址</Button>
                        </FormItem>
                    </Form>
                </div>

                <p class="p1">已保存的地址</p>
                <div class="show-address">
                    <Table border :columns="columns1" :data="address_info"></Table>
                </div>
            </div>
        </div>

        <myFooter />
    </div>
</template>

<script>
import city from "@/assets/js/city.js";
import HeaderTop from "@/components/HeaderTop";
import PersonSlide from "@/components/PersonSlide";
import myFooter from "@/components/Footer";
export default {
    name: "address",
    data () {
        const validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
                callback("手机号格式不正确");
            } else {
                this.is_getCode_disabled = false;
                callback();
            }
        };
        return {
            address_info: [],   //保存所有地址信息
            current_address: [],    //保存需要修改的地址信息
            columns1: [
                    {
                        title: '收货人',
                        key: 'name'
                    },
                    {
                        title: '所在地区',
                        key: 'address'
                    },
                    {
                        title: '详细地址',
                        key: 'addressDetail'
                    },
                    {
                        title: '手机号码',
                        key: 'phone'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: 'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify_address(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: 'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove_address(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
            ],
            uid: this.$route.query.uid,
            city: city,
            address: '',
            formValidate: {
                address: '',
                addressDetail: '',
                name: '',
                phone: '',
                checkbox: ''
            },
            ruleValidate: {
                // address: [
                //     { required: true, message: '地址不能为空', trigger: 'blur' }
                // ],
                addressDetail: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '收货人姓名应为2-25个字符，一个汉字为两个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: validatePhone, trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.getAddress();
        //获取需要修改的地址内容
        this.getModifyAddress();

    },
    methods: {
        getAddress() {
            this.$get("/account/showaddress")
                .then(res => {
                    this.address_info = res.data.info;
                    // console.log(this.address_info)
                })
        },
        getModifyAddress() {
            this.current_address = JSON.parse(this.$route.query.current_address) || [];
            if(this.current_address) {
                this.showModifyAddress();   //将修改信息放置在信息框中
            }
            // console.log(this.current_address)
        },
        showModifyAddress() {
            let c_addr = this.current_address;
            this.address = c_addr.address;
            this.formValidate.addressDetail = c_addr.addressDetail;
            this.formValidate.name = c_addr.name;
            this.formValidate.phone = c_addr.phone;
        },
        modify_address(index) {
            let current_address = {
                "id": this.address_info[index].id,
                "customerId": this.uid,
                "address": this.address_info[index].address,
                "addressDetail": this.address_info[index].addressDetail,
                "name": this.address_info[index].name,
                "phone": this.address_info[index].phone,
                // "is_default": Number(this.address_info[index].checkbox)
            };
            this.$router.push({
                path: "/account/address",
                query: {
                    "is_modify": true,
                    "current_address": JSON.stringify(current_address)
                }
            });
        },
        remove_address(index) {
            let id = this.address_info[index].id;
            this.$post("/account/deleteaddress", {"id": id})
                .then(res => {
                    // console.log(res.data)
                    if(res.data.code == 200) {
                        this.$Message.success('删除地址成功!');
                        setTimeout(() => {
                            this.$router.go(0);
                        }, 1000);
                    }
                })
        },
        getLocalValue(value, selectedData) {
            this.address = selectedData[2].__label.split("/").join("");
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //修改地址
                    if(this.$route.query.is_modify) {
                        let new_address = {
                            "id": this.current_address.id,
                            "address": this.address,
                            "addressDetail": this.formValidate.addressDetail,
                            "name": this.formValidate.name,
                            "phone": this.formValidate.phone,
                            "is_default": Number(this.formValidate.checkbox)
                        };
                        this.$post("/account/eidtaddress", new_address)
                            .then(res => {
                                if(res.data.code == 200) {
                                    this.$Message.success('地址修改成功!');
                                    setTimeout(() => {
                                        this.$router.push("/account/address")
                                    }, 1000);
                                }
                            })
                    } else {
                        //新增地址
                        let new_address = {
                            "customerId": this.uid,
                            "address": this.address,
                            "addressDetail": this.formValidate.addressDetail,
                            "name": this.formValidate.name,
                            "phone": this.formValidate.phone,
                            "is_default": Number(this.formValidate.checkbox)
                        };
                        // console.log(new_address)
                        this.$post("/account/addaddress", new_address)
                            .then(res => {
                                if(res.data.code == 200) {
                                    this.$Message.success('新增地址成功!');
                                    setTimeout(() => {
                                        this.$router.go(0)
                                    }, 1000);
                                }
                            })
                    }
                } else {
                    this.$Message.error('请正确填写地址相关信息');
                }
            })
        }
    },
    watch: {
        "$route" (to, from) {
            // console.log(to, from)
            this.$router.go(0)
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
    .wrap {
        vertical-align: top;
        
        .address {
            width: 790px;
            // margin: 50px auto;
            background-color: #fff;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 50px;
            border: 1px solid #eee;
            padding: 5px;
            .p1 {
                font-size: 14px;
                color: #014d7f;
                background-color: #f3f8fe;
                height: 30px;
                line-height: 30px;
                margin-bottom: 20px;
                text-align: left;
                padding-left: 10px;
            }
            .add-address {
                margin-bottom: 50px;
            }
        }
    }
</style>
