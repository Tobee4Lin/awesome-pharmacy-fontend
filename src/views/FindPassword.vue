<template>
    <div>
        <div class="header">
            <div class="logo">
                <a href="/"><img src="../assets/images/logo2.png" alt=""></a>
            </div>
        </div>

        <div class="findpassword">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" inline>
                <FormItem label="手机号" prop="phone" style="width:380px;" :label-width="60" label-position="left">
                    <Input name="phone" v-model="formValidate.phone" placeholder="请输入手机号">
                        <Icon type="ios-call-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br>
                <FormItem prop="code" label="验证码" style="width:280px;" :label-width="60" label-position="left">
                    <Input name="code" v-model="formValidate.code" placeholder="请输入验证码" :disabled="is_code_disabled">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="getCode()" :disabled="is_getcode_disabled">{{getcode_desc}}</Button>
                </FormItem>
                <br>
                <FormItem>
                    <Button type="success" @click="goTo('/findpassword2')" :disabled="is_next_disabled">下一步</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>

export default {
    name: "findpassword",
    data () {
        const validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else {
                this.is_getcode_disabled = false;
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else {
                if (this.code != value) {
                    callback(new Error("验证码错误"));
                } else {
                    this.is_next_disabled = false;
                    callback();
                }
            }
        };
        return {
            is_code_disabled: true,
            is_getcode_disabled: true,
            is_next_disabled: true,
            code: '',
            getcode_desc: "获取验证码",
            formValidate: {
                phone: '',
                code: ''
            },
            ruleValidate: {
                phone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                ],
                code: [
                    { required: true, validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //获取验证码及校验
        getCode() {
            let phone = this.formValidate.phone;
            let _this = this;
            this.is_getcode_disabled = true;
            let t = 60;
            let timer = setInterval(() => {
                t--;
                _this.getcode_desc = t + " s后重新获取";
                if(t <= 0) {
                clearInterval(timer);
                this.is_getcode_disabled = false;
                _this.getcode_desc = "获取验证码";
                }
            }, 1000);
            this.$post("/common/tellcode", {phone:phone})
                .then((res) => {
                    _this.code = res.data.code;
                    _this.is_code_disabled = false;
                });
        },
        // handleSubmit(name) {
        //     this.$refs[name].validate((valid) => {
        //         if (valid) {
        //             this.$Message.success('Success!');
        //         } else {
        //             this.$Message.error('Fail!');
        //         }
        //     })
        // }
        goTo(url) {
            this.$router.push({
                path: url,
                query: {
                    "phone": this.formValidate.phone,
                    "code": this.code
                }
            });
        }
    },
    components: {
       
    }
}
</script>

<style scoped lang="less">
    .header {
      height: 80px;
      background: #fff;
      width: 100%;
      margin-bottom: 0;
      border-bottom: 2px solid #17b890;
      text-align: left;
      .logo {
          padding-top: 22px;
          padding-left: 220px;
          img {
          width: 150px;
          }
      }
    }
    .findpassword {
        width: 990px;
        margin: 100px auto;
    }
</style>
