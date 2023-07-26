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
          <span style="font-size: 25px">{{takeoffPlaceA}}-{{arrivalPlaceA}}</span>
          <el-row style="margin-top: 10px;font-size: 20px">
            <el-col :span="3">
              <span>{{idA}}</span>
            </el-col>
            <el-col :span="9">
              <span>{{takeoffDateA}} {{takeoffTimeA}} ---- {{arrivalDateA}} {{arrivalTimeA}}</span>
            </el-col>
            <el-col :span="4">
              <span>{{takeoffAirportA}}-{{arrivalAirportA}}</span>
            </el-col>
          </el-row>
          <br>
          <span style="font-size: 25px">{{takeoffPlaceB}}-{{arrivalPlaceB}}</span>
          <el-row style="margin-top: 10px;font-size: 20px">
            <el-col :span="3">
              <span>{{idB}}</span>
            </el-col>
            <el-col :span="9">
              <span>{{takeoffDateB}} {{takeoffTimeB}} ---- {{arrivalDateB}} {{arrivalTimeB}}</span>
            </el-col>
            <el-col :span="4">
              <span>{{takeoffAirportB}}-{{arrivalAirportB}}</span>
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
                  <span>￥1300.00</span>
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="warning"
                    size="medium"
                    @click="reserve(idA,economyPriceA,idB,economyPriceB)"
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
                <el-col :span="5">
                  <span style="margin-left: 120px">余票{{busleftTick}}张</span>
                </el-col>
                <el-col :span="4">
                  <span>￥3330.00</span>
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="warning"
                    size="medium"
                    @click="reserve(idA,businessPriceA,idB,businessPriceB)"
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
        //商务舱退改备注
        busmodMessage:'',
        //商务舱余票
        busleftTick:0,

        //经济舱价
        economyPriceA:'',
        //商务舱价
        businessPriceA:'',
        //航班号
        idA:'',
        //出发地
        takeoffPlaceA:'',
        //目的地
        arrivalPlaceA:'',
        takeoffDateA:'',
        arrivalDateA:'',
        takeoffTimeA:'',
        arrivalTimeA:'',
        takeoffAirportA:'',
        arrivalAirportA:'',
        //经济舱价
        economyPriceB:'',
        //商务舱价
        businessPriceB:'',
        //航班号
        idB:'',
        //出发地
        takeoffPlaceB:'',
        //目的地
        arrivalPlaceB:'',
        takeoffDateB:'',
        arrivalDateB:'',
        takeoffTimeB:'',
        arrivalTimeB:'',
        takeoffAirportB:'',
        arrivalAirportB:'',

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
        //   economyPriceA:row.economyPrice,
        //   businessPriceA:row.businessPrice,
        //   idA:row.id,
        //   takeoffPlaceA:row.takeoffPlace,
        //   arrivalPlaceA:row.arrivalPlace,
        //   takeoffDateA:row.takeoffDate,
        //   takeoffTimeA:row.takeoffTime,
        //   arrivalDateA:row.arrivalDate,
        //   arrivalTimeA:row.arrivalTime,
        //   takeoffAirportA:row.takeoffAirport,
        //   arrivalAirportA:row.arrivalAirport,
        //   user_id:this.$route.query.user_id,
        //   economyPriceB:res02.data.economyPrice,
        //   businessPriceB:res02.data.businessPrice,
        //   idB:res02.data.id,
        //   takeoffPlaceB:res02.data.takeoffPlace,
        //   arrivalPlaceB:res02.data.arrivalPlace,
        //   takeoffDateB:res02.data.takeoffDate,
        //   takeoffTimeB:res02.data.takeoffTime,
        //   arrivalDateB:res02.data.arrivalDate,
        //   arrivalTimeB:res02.data.arrivalTime,
        //   takeoffAirportB:res02.data.takeoffAirport,
        //   arrivalAirportB:res02.data.arrivalAirport,

        this.ecomodMessage = this.$route.query.ecomodMessage;
        this.busmodMessage = this.$route.query.busmodMessage;
        this.ecoleftTick = this.$route.query.ecoleftTick;
        this.busleftTick = this.$route.query.busleftTick;

        this.economyPriceA = this.$route.query.economyPriceA;
        this.businessPriceA = this.$route.query.businessPriceA;
        this.idA = this.$route.query.idA;
        this.takeoffPlaceA = this.$route.query.takeoffPlaceA;
        this.arrivalPlaceA = this.$route.query.arrivalPlaceA;
        this.takeoffDateA = this.$route.query.takeoffDateA;
        this.takeoffTimeA = this.$route.query.takeoffTimeA;
        this.arrivalDateA = this.$route.query.arrivalDateA;
        this.arrivalTimeA = this.$route.query.arrivalTimeA;
        this.takeoffAirportA = this.$route.query.takeoffAirportA;
        this.arrivalAirportA = this.$route.query.arrivalAirportA;

        this.economyPriceB = this.$route.query.economyPriceB;
        this.businessPriceB = this.$route.query.businessPriceB;
        this.idB = this.$route.query.idB;
        this.takeoffPlaceB = this.$route.query.takeoffPlaceB;
        this.arrivalPlaceB = this.$route.query.arrivalPlaceB;
        this.takeoffDateB = this.$route.query.takeoffDateB;
        this.takeoffTimeB = this.$route.query.takeoffTimeB;
        this.arrivalDateB = this.$route.query.arrivalDateB;
        this.arrivalTimeB = this.$route.query.arrivalTimeB;
        this.takeoffAirportB = this.$route.query.takeoffAirportB;
        this.arrivalAirportB = this.$route.query.arrivalAirportB;


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

      async reserve(idA,priceA,idB,priceB){
        if(priceA == this.businessPriceA){
          await this.$http.post('editTick', {id:idA,ecoleftTick:this.ecoleftTick,busleftTick:(this.busleftTick-1).toString()})
        }else{
          await this.$http.post('editTick',{id:idA,ecoleftTick:(this.ecoleftTick-1).toString(),busleftTick:this.busleftTick})
        }
        if(priceB == this.businessPriceB){
          await this.$http.post('editTick', {id:idB,ecoleftTick:this.ecoleftTick,busleftTick:(this.busleftTick-1).toString()})
        }else{
          await this.$http.post('editTick',{id:idB,ecoleftTick:(this.ecoleftTick-1).toString(),busleftTick:this.busleftTick})
        }
        // console.log(priceA)
        // console.log(priceA.substring(1))
        console.log(parseFloat(priceA.substring(1)))
        console.log(parseFloat(priceB.substring(1)))
        var price = parseFloat(priceA.substring(1))+parseFloat(priceB.substring(1))
        price = "￥"+price+".00"
        console.log(price)
          this.$router.push({
            path:'/userInfo',
            query:{
              air_id:idA,
              price:price,
              user_id:this.$route.query.user_id,
              ecoleftTick:this.ecoleftTick,
              busleftTick:this.busleftTick
            }
          })
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
