<template>
  <header class="header">
    <div class="logo" @click="$router.push('/index') ">
<!--      <img :src="require('@/assets/images/toubu-logo.png')" alt="">-->
    <span>logo图片</span>
    </div>
    <Navbar/>
    <el-dropdown >
      <div class="user">
<!--        <img :src="require('@/assets/images/user_head.png')" alt="">-->
        <span>用户头像图片</span>
        <p>{{loginUserName}}</p>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="signOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>

  // import jwt from 'jsonwebtoken'
  import Navbar from "./navbar.vue";

  // import {
  //   logout
  // } from "@/api/login";
  // import {
  //   getToken
  // } from "@/utils/auth";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        meunIndex: "1",
        loginUserName: "NaN",
        list: {}
      };
    },
    // computed: {
    //   setting: {
    //     get() {
    //       return this.$store.state.settings.showSettings;
    //     },
    //     set(val) {
    //       this.$store.dispatch("settings/changeSetting", {
    //         key: "showSettings",
    //         value: val,
    //       });
    //     },
    //   },
    // },
    // mounted() {
    //   this.getLoginUserName();
    // },
    // methods: {
    //
    //
    //   handleSelect(key, keyPath) {
    //     console.log(this.list, key);
    //     this.currentIndex = key;
    //     if (this.ishttp(key)) {
    //       // http(s):// 路径新窗口打开
    //       window.open(key, "_blank");
    //     } else if (key.indexOf("/redirect") !== -1) {
    //       // /redirect 路径内部打开
    //       this.$router.push({
    //         path: key.replace("/redirect", "")
    //       });
    //     }
    //     if (key.indexOf(this.list)) {
    //       console.log(keyPath);
    //     }
    //     let menuUrl = "";
    //     this.list.map((item) => {
    //       if (key == item.menu.menuId) {
    //         menuUrl = item.menu.menuUrl;
    //       }
    //     });
    //     console.log(menuUrl, "menuUrl");
    //     this.$router.push({
    //       path: menuUrl
    //     });
    //   },
    //   ishttp(url) {
    //     return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    //   },
    //
    //   async signOut() {
    //
    //     this.$confirm("确定退出系统吗？", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //       })
    //       .then(() => {
    //
    //         this.$store.dispatch("LogOut").then(() => {
    //           // location.href = '/index';
    //           location.href = "/login";
    //         });
    //         // logout().then(() => {
    //         //   this.$router.push({ path: "/login" });
    //         // });
    //       })
    //       .catch(() => {});
    //   },
    //   getLoginUserName() {
    //     let data = jwt.decode(getToken());
    //     let json = JSON.parse(data.sub);
    //     this.loginUserName = json.userName;
    //   }
    // },
  };
</script>

<style lang="less" scoped>
  .header {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    border: none;
    box-shadow: 0px 0 12px #d0cbcb;
    background: #f7f8fc;

    .user {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #585d78;

      img {
        margin-right: 10px;
      }
    }
  }
</style>
