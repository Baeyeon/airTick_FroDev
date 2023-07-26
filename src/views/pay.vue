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
        <a class="a" @click="toOrder">我的</a>
      </div>
    </el-header>
    <!--main区域-->
    <el-main>
        <div class="main_header">
        <span style="font-size: 25px;font-weight: bold;margin-top: 0;margin-left: 50px">订单支付</span>
        <span style="font-size: 50px;font-weight: bold;margin-top: 50px;margin-right: 100px">总计 {{queryParams.price}}</span>
      </div>
        <el-card class="card_box">
        <div>
            <i class="el-icon-s-opportunity" style="font-size: 50px"></i>
          <el-row>
          <span>航班价格变动频繁，请您仔细核对信息后及时付款。
            以免座位被取消或价格发生变化。</span>
          </el-row>
          <el-row>
          <span>为保障资金安全请务必使用在线支付。</span>
          </el-row>
          <el-row>
            <span>切勿通过搜索引擎搜索或拨打来路不明的
            400电话进行银行ATM机转账。</span>
          </el-row>
        </div>
      </el-card>
        <div class="main_bottom">
        <el-row>
          <span style="font-size: 25px;font-weight: bold">支付平台:</span>
        </el-row>
        <el-row style="margin-top: 50px">
          <el-radio v-model="radio" label="1" style="margin-left: 170px">
            <img src="../assets/images/alipay.png" alt="">
          </el-radio>
          <el-radio v-model="radio" label="2">
            <img src="../assets/images/vx.png" alt="">
          </el-radio>
        </el-row>
        <el-row style="margin-top: 50px;margin-left: 800px">
          <el-button style="width: 220px;font-size: 20px" type="primary" @click="handlePay">付款</el-button>
        </el-row>
      </div>
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

  export default {
    name: "sinTickets",
    components: {Pagination},
    data() {
      return {
        //单选框
        radio:'1',
        //菜单激活选择
        activeIndex:'2',
        //添加订单请求参数
        queryParams:{
          //航班号
          air_id:'',
          //用户id
          user_id:'',
          //乘机人证件号
          pass_id:'',
          //实付款
          price:''
        },
        //商务舱余票
        busleftTick:null,
        //经济舱余票
        ecoleftTick:null,
        // // 遮罩层
        // loading: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
      };
    },
    created() {
      this.getInfo();
    },
    methods: {
      //获得userInfo或seatTypeChoose界面所传数据
      getInfo() {
        this.queryParams.price = this.$route.query.price;
        this.queryParams.air_id = this.$route.query.air_id;
        this.busleftTick = this.$route.query.busleftTick;
        this.ecoleftTick = this.$route.query.ecoleftTick;
        this.queryParams.user_id = window.sessionStorage.getItem("user_id")
        if(window.sessionStorage.getItem("changeToken") == "1"){
          this.queryParams.pass_id = window.sessionStorage.getItem("change_pass_id")
        }else {
          this.queryParams.pass_id = this.$route.query.pass_id;
        }
      },
      //付款按钮
      async handlePay(){
        console.log(this.queryParams)
        await this.$http.post('addOrder', this.queryParams)
        await this.$http.post('editTick',{ecoleftTick:this.ecoleftTick,busleftTick:this.busleftTick,air_id:this.queryParams.air_id})
        if(window.sessionStorage.getItem("changeToken") == "1") {
          this.$message.success("改签成功！原订单退款将在3-5个工作日返还回您账户！")
          window.sessionStorage.setItem("changeToken","0")
        }else{
          this.$message.success("订票成功！")
        }
        this.$router.push('/sinTickets')
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
  .main_header{
    display: flex;
    justify-content: space-between;
  }
  .card_box{
    width:75%;
    height:150px;
    padding-top: 20px;
    padding-bottom: 50px;
    font-size: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,30%);
  }
  .main_bottom{
    position: absolute;
    top: 550px;
    margin-left: 50px;
    font-size: 20px;
  }
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
