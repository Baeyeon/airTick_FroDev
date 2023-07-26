<template>
  <div class="navbar">
    <el-menu :default-active="navbarIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <template v-for="(item,index) in navbarList">
        <el-menu-item :index="item.menu.menuId" v-if="!item.children[0]">{{ item.menu.menuName }}
        </el-menu-item>
        <el-submenu :index="item.menu.menuId" v-else>
          <template slot="title">{{ item.menu.menuName }}</template>

          <template v-for="(infer, inferIndex) in item.children">
            <el-menu-item :index="infer.menu.menuId" v-if="!infer.children[0]">{{ infer.menu.menuName }}
            </el-menu-item>
            <el-submenu :index="infer.menu.menuId" v-else>
              <template slot="title">{{ infer.menu.menuName }}</template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
  import {
    getRouters
  } from "@/api/menu";
  export default {
    name: 'Menu',
    data() {
      return {
        navbarList: [],
        navbarIndex: '1',
        visibleNumber: 5,
        isFrist: false,
      };
    },

    created() {
      this.getMenuList()
    
    },
    watch: {
      $route() {
        // console.log(this.$route, 'nini')
        this.navbarList.forEach(item => {
          // console.log(item.menu.menuUrl,this.$route.path)
          if (item.menu.menuUrl === this.$route.path) {
            // console.log('item', item)
            this.navbarIndex = item.menu.menuId
          } else {
            item.children.forEach(node => {
              if (node.menu.menuUrl === this.$route.path) {
                // console.log('node', node)
                this.navbarIndex = node.menu.menuId
              }
            })
          }
        })
        this.navbarIndex = this.navbarIndex.toString()
        sessionStorage.setItem(
          "navbarIndex",
          JSON.stringify({
            'navbarIndex': this.navbarIndex
          })
        );
        // console.log(this.navbarIndex)
      },
    },
    methods: {

      // 获取菜单列表
      async getMenuList() {
        try {
          const res = await getRouters()
          this.navbarList = res.list
          sessionStorage.setItem(
            "topMenusMenuRoutes",
            JSON.stringify(this.navbarList || "[]")
          );
          
          if(sessionStorage.getItem('navbarIndex')){
            this.navbarIndex = JSON.parse(sessionStorage.getItem('navbarIndex')).navbarIndex
          }else{
            this.navbarIndex = this.navbarList[0].menu.menuId
          }
          
        } catch (err) {
          console.log(err)
        }
      },

      handleSelect(key, keyPath) {

        sessionStorage.setItem(
          "navbarIndex",
          JSON.stringify({
            'navbarIndex': key
          })
        );

        // console.log(key, keyPath, '12321332');
        // return false

        let path = ''
        this.navbarList.forEach(item => {
          if (item.menu.menuId == keyPath[0]) {
            if (item.children[0]) {
              item.children.forEach(node => {
                if (node.menu.menuId == keyPath[1]) {
                  path = node.menu.menuUrl
                }
              })
            } else {
              path = item.menu.menuUrl
            }
          }
        })
        // console.log(path)
        if (path.indexOf('http') !== -1) {
          window.open(path, '_blank')
          // window.location.href =path;
        } else {
          this.$router.push({
            path,
          });
        }

      },
    },
  };
</script>

<style>
  .navbar .is-active {
    border-bottom: 6px solid #0049b2 !important;
    color: #0049B2 !important;
    font-size: 14px !important;
    font-weight: bold;
    background: none;
  }


  .navbar .is-active .el-submenu__title {
    border: none !important;
  }

  .navbar ul {
    padding-top: 15px;
  }

  .navbar ul li,
  .navbar .el-submenu__title {
    color: #5D6B7C;
  }

  .navbar ul,
  .navbar ul li {
    height: 100% !important;
  }

  .navbar .el-menu--horizontal {
    border: none !important;
    background: none;
  }

  .navbar ul li {
    margin: 0 6px !important;
    font-size: 14px;
  }

  .navbar .el-menu-item,
  .navbar .el-menu-item {}

  .navbar .el-submenu__title {
    background: none !important;
  }
</style>
<style lang="scss" scoped>
  .navbar {
    height: 100%;
  }
</style>
