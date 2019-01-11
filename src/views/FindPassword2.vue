<template>
    <div>
        <div class="header">
            <div class="logo">
                <a href="/"><img src="../assets/images/logo2.png" alt=""></a>
            </div>
        </div>

        <div class="findpassword2">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" inline>
                <FormItem label="新密码" prop="pwd" style="width:280px;" label-position="left">
                    <Input name="pwd" v-model="formValidate.pwd" placeholder="请输入新密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br>
                <FormItem label="确认密码" prop="repwd" style="width:280px;" label-position="left">
                    <Input name="repwd" v-model="formValidate.repwd" placeholder="请再次输入新密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button type="success" @click="handleSubmit('formValidate')">修改密码</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: "findpassword2",
    data() {
        const validatePwd = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.formValidate.repwd !== "") {
                // 对第二个密码框单独验证
                this.$refs.formValidate.validateField("repwd");
                }
                callback();
            }
        };
        const validateRepwd = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.formValidate.pwd) {
                callback(new Error("两次密码不一致"));
            } else {
                callback();
            }
        };
        return {
            phone: '',
            code: '',
            formValidate: {
                pwd: '',
                repwd: ''
            },
            ruleValidate: {
                pwd: [{ required: true, validator: validatePwd, trigger: "blur" }],
                repwd: [{ required: true, validator: validateRepwd, trigger: "blur" }]
            }
        }
    },
    created() {
        this.getQuery();
    },
    methods: {
        getQuery() {
            if(this.$route.query.phone && this.$route.query.code) {
                this.phone = this.$route.query.phone;
                this.code = this.$route.query.code;
            } else {
                this.$Message.error('无效访问，缺失所需参数!');
                setTimeout(() => {
                    this.$router.push("/");
                }, 1500);
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let data = {
                        "phone": this.phone,
                        "tellcode": this.code,
                        "password": this.formValidate.pwd
                    };
                    this.$post("/common/findpassword", data)
                        .then(res => {
                            if(res.data.code == 200) {
                                this.$Message.success("修改成功");
                                setTimeout(() => {
                                    this.$router.push("/login");
                                }, 1000);
                            } else if (res.data.code == 400) {
                                this.$Message.error("修改失败，手机号码有误");
                                setTimeout(() => {
                                    this.$router.push("/findpassword");
                                }, 1000);
                            } else {
                                this.$Message.error("修改失败");
                            }
                        });
                } else {
                    //
                }
            })
        }
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
    .findpassword2 {
        width: 990px;
        margin: 100px auto;
    }
</style>
