<template>
    <div>
        <div class="header">
            <div class="logo">
                <a href="/"><img src="../assets/images/logo2.png" alt=""></a>
            </div>
        </div>
        <div class="register">
            <Form ref="formValidate" 
                  :model="formValidate" 
                  :rules="ruleValidate" 
                  :label-width="80" 
                  inline style="text-align:left;">
                <FormItem label="用户名" prop="name" >
                    <Input v-model="formValidate.name" name="username" placeholder="输入用户名" style="width:280px;"></Input>
                </FormItem>
                <br>
                <FormItem label="手机号码" prop="phone" >
                    <Input v-model="formValidate.phone" name="phone" placeholder="输入手机号码" style="width:280px;"></Input>
                </FormItem>
                <br>
                <FormItem label="验证码" prop="code">
                    <Input v-model="formValidate.code" name="code" placeholder="输入验证码" style="width:170px;" :disabled="is_disabled"></Input>
                </FormItem>
                <Button type="success" @click="getCode()" style="width: 100px;" ref="getcode" :disabled="is_getCode_disabled">{{getcode_desc}}</Button>
                <br>
                <FormItem label="密码" prop="pwd">
                    <Input v-model="formValidate.pwd" name="password" placeholder="输入密码" style="width:280px;"></Input>
                </FormItem>
                <br>
                <FormItem label="确认密码" prop="repwd">
                    <Input v-model="formValidate.repwd" name="repassowrd" placeholder="再次输入密码" style="width:280px;"></Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button type="success" @click="handleSubmit('formValidate')" style="width: 100px;">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
    
</template>
<script>
export default {
  data() {
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
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (this.code != value) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      }
    };
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
      code: '', //验证码
      is_getCode_disabled: true,
      getcode_desc: "获取验证码",
      is_disabled: true,
      formValidate: {
        name: "",
        phone: "",
        code: "",
        pwd: "",
        repwd: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "change" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
        pwd: [{ required: true, validator: validatePwd, trigger: "blur" }],
        repwd: [{ required: true, validator: validateRepwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    //获取验证码及校验
    getCode() {
      let phone = this.formValidate.phone;
      let _this = this;
      this.is_getCode_disabled = true;
      let t = 60;
      let timer = setInterval(() => {
        t--;
        _this.getcode_desc = t + " s后重新获取";
        if(t <= 0) {
          clearInterval(timer);
           this.is_getCode_disabled = false;
           _this.getcode_desc = "获取验证码";
        }
      }, 1000);
      this.$post("/common/tellcode", {phone:phone})
          .then((res) => {
            _this.code = res.data.code;
            _this.is_disabled = false;
          });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let data = {
            "username": this.formValidate.name,
            "phone": this.formValidate.phone,
            "tellcode": this.code,
            "password": this.formValidate.pwd,
            "repassword": this.formValidate.repwd,
          }
          
          this.$post("/common/register", data)
              .then((res) => {
                this.$Message.success("注册成功");
                setTimeout(() => {
                    this.$router.push("/");
                }, 1000);
              })
              .catch(err => {
                console.log(err);
              });
        } else {
          // this.$Message.error('Fail!');
        }
      });
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
    .register {
    width: 890px;
    margin: 40px auto;
    }
</style>
