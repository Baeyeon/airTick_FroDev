<template>
  <div class="container">
    <div class="login">
      <div class="illustration"></div>
<!--      <img src="../../assets/images/login_mask.png" alt="" class="mask">-->
      <img src="../assets/images/login_mask.png" alt="" class="mask">
      <img src="../assets/images/login_badge.png" alt="" class="badge">
      <div class="form">
        <h2 class="title">飞机票售票系统</h2>
<!--        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" type="text" placeholder="请输入账号"></el-input>-->
        <el-input
          placeholder="请输入用户名"
          v-model="loginForm.username">
<!--          <div class="icon">-->
<!--            <i slot="prefix" class="el-input__icon el-icon-user"></i>-->
<!--          </div>-->
        </el-input>
          <el-input @keyup.enter="signIn()" v-model="loginForm.password"  type="password"
                    placeholder="请输入密码"></el-input>
          <button class="sign_in" @click="signIn()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   setToken
  // } from "@/utils/auth";

  export default {
    name: "Login",
    data() {
      return {
        //请求参数表单
        loginForm: {
          username: "liyan",
          password: "123456",
        },

        //校验规则
        loginRules: {
          username: [{
            required: true,
            trigger: "blur",
            message: "用户名不能为空"
          }, ],
          password: [{
            required: true,
            trigger: "blur",
            message: "密码不能为空"
          }],
        },

        //重定向路径
        redirect: undefined,
      };
    },

    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true,
      },
    },
    created() {},

    methods: {
      // 登录
      async signIn() {
        try {
          //打开遮罩层
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
          console.log(this.loginForm)
          const {data:res} = await this.$http.post('loginServlet02', this.loginForm)
          console.log(res)
          // setTimeout(() => {
            loading.close();
          // }, 500);
          // const res = await login(JSON.stringify(this.loginForm))   //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
          if(res == null){
            this.$message.error("用户名或密码错误！")
          }else if(res.status == 1){
            this.$router.push('/airlineAdmin')
          } else{
            this.$message.success("登录成功！")
            this.$router.push({
              path:'/sinTickets',
              query:{
                user_id:res.id
              }
            });
            //1.将登录成功之后的token，保存到客户端的sessionStorage中
            //项目中除了登录之外的其他API接口，须在登录之后才能访问
            //token是服务器颁发的登录成功的令牌,访问其他API接口时携带该令牌，即可成功访问
            //token只应在网站打开期间有效，故放于sessionStorage
            window.sessionStorage.setItem('user_id',res.id);
          }
          // let tokenId = "sx-jwt";
          // setToken(res[tokenId]);
        } catch (err) {
        }
      },


    },

  };
</script>

<style lang="less" scope>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../assets/images/login_bg.png') 0 no-repeat;
    background-size: cover;

    .login {
      width: 85%;
      height: 80%;
      // height: 80%;
      // padding: 0 5%;
      border-radius: 20px;
      box-shadow: 0 0px 10px #938f8f;
      position: relative;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .form {
        position: absolute;
        right: 15%;
        top: 0;
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 20;

        .el-input__inner {
          width: 100%;
          background: #eee !important;
          border-color: #eee;
          height: 60px;
          border-radius: 20px;
          padding: 0 30px;
          margin-top: 30px;
          font-size: 18px;
        }

        .logo {
          width: 100%;
        }

        .title {
          color: #0049b2;
          font-weight: bold;
          font-size: 40px;
          margin: 40px 0 15px 0;
          letter-spacing: 20px;
        }

        .sign_in {
          width: 100%;
          height: 60px;
          background: #0049b2;
          font-size: 24px;
          color: #fff;
          border-radius: 30px;
          border: none;
          height: 60px;
          margin-top: 60px;
          letter-spacing: 30px;
        }
      }

      .mask {
        position: absolute;
        right: 0;
        top: 0;
        width: 50%;
        height: 100%;
        z-index: 10;
      }

      .badge {
        position: absolute;
        right: 10%;
        top: 0;
        z-index: 20;
      }

      .illustration {
        width: 60%;
        height: 100%;
        background: url('../assets/images/login_illustration.png') 20% no-repeat;
        background-size: contain;
      }
    }
  }

</style>
