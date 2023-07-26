<template>
  <div class="container">
    <div class="login">
      <div class="illustration"></div>
<!--      <img src="../assets/images/login_mask.png" alt="" class="mask">-->
      <img src="../assets/images/login_badge.png" alt="" class="badge">
      <div class="form">
        <h2 class="title">用户注册</h2>
        <el-card style="text-align: center;height: 650px;margin-bottom: 30px">
          <el-form
          label-width="120px"
          label-position="right"
          style="margin-top: 30px"
          >
            <el-form-item label="用户名">
              <el-input
                placeholder="请输入用户名"
                v-model="queryParams.username">
                <!--          <div class="icon">-->
                <!--            <i slot="prefix" class="el-input__icon el-icon-user"></i>-->
                <!--          </div>-->
              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                placeholder="请输入密码"
                v-model="queryParams.username">
                <!--          <div class="icon">-->
                <!--            <i slot="prefix" class="el-input__icon el-icon-user"></i>-->
                <!--          </div>-->
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                placeholder="请确认密码"
                v-model="queryParams.username">
                <!--          <div class="icon">-->
                <!--            <i slot="prefix" class="el-input__icon el-icon-user"></i>-->
                <!--          </div>-->
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                placeholder="请输入邮箱"
                v-model="queryParams.email">
                <!--          <div class="icon">-->
                <!--            <i slot="prefix" class="el-input__icon el-icon-user"></i>-->
                <!--          </div>-->
              </el-input>
            </el-form-item>
              <button class="sign_in" @click="regist">注册</button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   login
  // } from "@/api/login";
  // import {
  //   setToken
  // } from "@/utils/auth";

  export default {
    name: "Login",
    data() {
      return {
        //请求参数表单
        queryParams: {
          username: "admin",
          password: "123456",
          email:''
        },

        //校验规则
        loginRules: {
          username: [{
            required: true,
            trigger: "blur",
            message: "用户名不能为空"
          }, ],
          pwd: [{
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
    created() {
      // this.getCode();
      //this.getCookie();
      if (sessionStorage.getItem('navbarIndex')) {
        sessionStorage.removeItem('navbarIndex')
      }
    },

    methods: {
      // 登录
      async regist() {
        this.$http.post('register',this.queryParams)
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
      justify-content: space-around;

      .form {
        right: 15%;
        top: 0;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 20;

        .el-card__body {
          width: 480px;
        }

        .el-input__inner {
          width: 75%;
          background: #eee !important;
          border-color: #eee;
          height: 60px;
          border-radius: 20px;
          padding: 0 30px;
          margin-top: 30px;
          font-size: 18px;
        }

        .title {
          color: #0049b2;
          font-weight: bold;
          font-size: 40px;
          margin: 10px 0 15px 0;
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
        margin-left: 30px;
        background: url('../assets/images/login_illustration.png') 20% no-repeat;
        background-size: contain;
      }

      .el-form-item__label{
        font-size: 20px;
        padding: 40px 12px 0 0;
      }
    }
  }

</style>
