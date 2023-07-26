<template>
  <el-container>
    <!--header区域-->
    <el-header>
      <!--logo区域-->
      <div style="padding-left: 30px">
        <i class="el-icon-s-promotion"></i>
        <span>飞机票售票平台</span>
      </div>
      <!--导航栏-->
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border: none;"
        >
          <el-menu-item index="1" style="font-size: 20px">首页</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">机票</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">酒店</el-menu-item>
          <el-menu-item index="4" style="font-size: 20px">团购</el-menu-item>
          <el-menu-item index="5" style="font-size: 20px">度假</el-menu-item>
          <el-menu-item index="6" style="font-size: 20px">当地人</el-menu-item>
          <el-menu-item index="7" style="font-size: 20px">行程设计</el-menu-item>
          <el-menu-item index="8" style="font-size: 20px">旅游快讯</el-menu-item>
        </el-menu>
      </div>
      <!--用户区域-->
      <div style="font-size: 20px ; margin-right: 30px">
        <i class="el-icon-user-solid"></i>
        <a class="a" @click="toOrder">我的订单</a>
      </div>
    </el-header>
    <!--main区域-->
    <el-main>
      <el-card>
        <!--card头部-->
        <div slot="header" >
            <span style="font-size: 25px">{{takeoffPlace}}-{{arrivalPlace}}</span>
          <el-row style="margin-top: 10px;font-size: 20px">
            <el-col :span="3">
              <span>{{id}}</span>
            </el-col>
            <el-col :span="9">
              <span>{{takeoffDate}} {{takeoffTime}} ---- {{arrivalDate}} {{arrivalTime}}</span>
            </el-col>
            <el-col :span="4">
              <span>{{takeoffAirport}}-{{arrivalAirport}}</span>
            </el-col>
          </el-row>
        </div>
        <!--card内容-->
        <div>
          <el-form>
            <!--经济舱-->
            <el-form-item>
              <el-row style="font-size: 20px">
                <el-col :span="3">
                  <span>经济舱</span>
                </el-col>
                <el-col :span="8">
                  <span>{{ecomodMessage}}</span>
                </el-col>
                <el-col :span="5">
                  <span style="margin-left: 120px">余票{{ecoleftTick}}张</span>
                </el-col>
                <el-col :span="4">
                  <span>{{economyPrice}}</span>
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="warning"
                    size="medium"
                    @click="reserve(id,economyPrice)"
                    style="font-size: 17px"
                  >预订</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <!--商务舱-->
            <el-form-item>
              <el-row style="font-size: 20px">
                <el-col :span="3">
                  <span>商务舱</span>
                </el-col>
                <el-col :span="8">
                  <span>{{busmodMessage}}</span>
                </el-col>
                <el-col :span="5" >
                  <span style="margin-left: 120px">余票{{busleftTick}}张</span>
                </el-col>
                <el-col :span="4">
                  <span>{{businessPrice}}</span>
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="warning"
                    size="medium"
                    @click="reserve(id,businessPrice)"
                    style="font-size: 17px"
                  >预订</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  // import Treeselect from '@riophae/vue-treeselect'
  // import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  // import {
  //   listInfoLog,
  //   getTreeorg,
  // } from "@/api/system/infoLog";
  import Pagination from '@/components/Pagination';
  import pay from "./pay";

  export default {
    name: "sinTickets",
    components: {Pagination},
    data() {
      return {
        //菜单激活
        activeIndex:'2',
        //经济舱退改备注
        ecomodMessage:'',
        //经济舱余票
        ecoleftTick:0,
        //经济舱价
        economyPrice:'',
        //商务舱退改备注
        busmodMessage:'',
        //商务舱余票
        busleftTick:0,
        //商务舱价
        businessPrice:'',
        //航班号
        id:'',
        //出发地
        takeoffPlace:'',
        //目的地
        arrivalPlace:'',
        takeoffDate:'',
        arrivalDate:'',
        takeoffTime:'',
        arrivalTime:'',
        takeoffAirport:'',
        arrivalAirport:'',
        // // 遮罩层
        // loading: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 查询参数
        queryParams: {
        },
      };
    },
    created() {
      this.getInfo();
    },
    methods: {

      getInfo() {
        this.ecomodMessage = this.$route.query.ecomodMessage;
        this.busmodMessage = this.$route.query.busmodMessage;
        this.ecoleftTick = this.$route.query.ecoleftTick;
        this.busleftTick = this.$route.query.busleftTick;
        this.economyPrice = this.$route.query.economyPrice;
        this.businessPrice = this.$route.query.businessPrice;
        this.id = this.$route.query.id;
        this.takeoffPlace = this.$route.query.takeoffPlace;
        this.arrivalPlace = this.$route.query.arrivalPlace;
        this.takeoffDate = this.$route.query.takeoffDate;
        this.takeoffTime = this.$route.query.takeoffTime;
        this.arrivalDate = this.$route.query.arrivalDate;
        this.arrivalTime = this.$route.query.arrivalTime;
        this.takeoffAirport = this.$route.query.takeoffAirport;
        this.arrivalAirport = this.$route.query.arrivalAirport;


        // this.loading = true;
        // let obj = this.queryParams;
        // obj.startDate = this.timeRange[0];
        // obj.endDate = this.timeRange[1];
        // listInfoLog(obj).then((response) => {
        //   console.log(response)
        //   console.log("列表数据返回成功")
        //   this.infoList = response.data.list;
        //   this.total = response.data.totalRow;
        //   this.loading = false;
        // });
      },

      async reserve(id,price){
        if(price == this.businessPrice){
           await this.$http.post('editTick', {id:id,ecoleftTick:this.ecoleftTick,busleftTick:(this.busleftTick-1).toString()})
        }else{
          await this.$http.post('editTick',{id:id,ecoleftTick:(this.ecoleftTick-1).toString(),busleftTick:this.busleftTick})
        }
        if(window.sessionStorage.getItem("changeToken") == "1"){
          this.$router.push({
            path:'/pay',
            query:{
              air_id:id,
              price:price,
              ecoleftTick:this.ecoleftTick,
              busleftTick:this.busleftTick
            }
          })
        }else {
          this.$router.push({
            path:'/userInfo',
            query:{
              air_id:id,
              price:price,
              user_id:this.$route.query.user_id,
              ecoleftTick:this.ecoleftTick,
              busleftTick:this.busleftTick
            }
          })
        }
      },

      toOrder(){
        this.$router.push('/order')
      }
    },
  };
</script>

<style >
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    color: #eeeeee;
    font-size: 25px;
    height: 70px !important;
  }
  .el-form-item__label{
    font-size: 20px;
  }
  .el-radio__label{
    font-size: 20px;
  }
  .el-dropdown-link{
    font-size: 20px;
  }
  .el-checkbox__label{
    font-size: 20px;
  }
  .paginationLayout{
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
  }
  /*.el-cascader-panel {*/
  /*  height: 100px;*/
  /*}*/
  .a:link{
    color: #ffffff;
  }
  .a:hover{
    color: #ffd04b;
  }
  .a:visited{
    color: #ffffff;
  }
</style>
