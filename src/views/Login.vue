<template>
    <div>
        <div class="header">
            <div class="logo">
                <a href="/"><img src="../assets/images/logo2.png" alt=""></a>
            </div>
        </div>
        <div class="content">
            <div class="pic">
                <img src="../assets/images/login_bg.png" alt="">
            </div>
            <div class="form">
                <div class="login-box">
                    <p class="title">密码登录</p>
                    <div class="input-box">
                        <Form ref="loginForm" :model="loginForm" :rules="ruleInline">
                            <FormItem prop="phone">
                                <Input type="text" name="phone" v-model="loginForm.phone" placeholder="请输入手机号">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" name="password" v-model="loginForm.password" placeholder="请输入密码">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Button style="width:100%;" type="success" @click="login('loginForm')">登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="link">
                        <a @click="goTo('/findpassword')" class="forget-pwd">忘记密码</a>
                        <a @click="goTo('/register')" class="register">免费注册</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: ""
      },
      ruleInline: {
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            let data = {
                "phone": this.loginForm.phone,
                "password": this.loginForm.password
            };
            this.$post("/common/login", data)
                .then(res => {
                    // console.log(res.data)
                    if(res.data.code == 200) {
                        this.$store.commit("addUserInfo", res.data.result);
                        localStorage.setItem("is_login", true);
                        this.$Message.success("登录成功!");

                        //做一个延时效果。。
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                    } else {
                        this.$Message.warning("账号或密码错误!");
                        return;
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
        //   this.$Message.error("Fail!");
        }
      });
    },

    goTo(url) {
      this.$router.push(url);
    }
  }
};
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
.content {
  margin: 0 auto 100px;
  padding-top: 49px;
  min-height: 510px;
  background: #10b78c;
  .pic {
    width: 528px;
    float: left;
    img {
      float: right;
      width: 440px;
    }
  }
  .form {
    float: right;
    width: 520px;
    padding-top: 40px;
    padding-right: 180px;
    .login-box {
      width: 350px;
      padding: 25px 25px 23px;
      color: #6c6c6c;
      background: #fff;
      position: relative;
      margin: 0 auto;
      text-align: left;
      .title {
        height: 18px;
        line-height: 18px;
        font-size: 16px;
        color: #3c3c3c;
        margin-top: 9px;
        padding-bottom: 8px;
        font-weight: 700;
      }
      .input-box {
        margin-top: 20px;
        width: 300px;
        .user,
        .password {
          width: 100%;
          height: 42px;
          position: relative;
          display: block;
          margin-bottom: 20px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          .i-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 42px;
            height: 42px;
            background-color: #ddd;
            margin-top: -1px;
            text-align: center;
            line-height: 42px;
            i {
              font-size: 30px;
              color: #fff;
            }
          }
          input {
            position: absolute;
            left: 42px;
            top: 0;
            width: 256px;
            height: 40px;
            border: 0;
            text-indent: 10px;
            font-size: 16px;
          }
        }

        .submit-btn {
          width: 300px;
          height: 42px;
          border: 0;
          display: inline-block;
          overflow: hidden;
          vertical-align: middle;
          line-height: 42px;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          background: #10b78c;
          border-radius: 3px;
          cursor: pointer;
          zoom: 1;
        }
      }
      .link {
        width: 100%;
        margin-top: 25px;
        overflow: hidden;
        text-align: right;
        .forget-pwd,
        .register {
          color: #6c6c6c;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
