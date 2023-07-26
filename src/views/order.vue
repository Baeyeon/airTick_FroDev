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
          style="border: none"
        >
          <el-menu-item index="1" style="font-size: 20px">首页</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px" @click="toSinTickets">机票</el-menu-item>
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
        <span style="color: #ffd04b">我的订单</span>
      </div>
    </el-header>

<!--页面主体区域-->
    <el-container>
<!--        &lt;!&ndash;      侧边栏&ndash;&gt;-->
<!--        <el-aside width="200px">-->
<!--              <el-menu-->
<!--        :default-active="side_default_index"-->
<!--        class="el-menu-vertical-demo"-->
<!--        unique-opened-->
<!--        mode="vertical"-->
<!--        background-color="#373d41"-->
<!--        text-color="#fff"-->
<!--        active-text-color="#ffd04b"-->
<!--        style="height: 100%"-->
<!--              >-->
<!--        <el-menu-item index="1" style="font-size: 20px">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>我的订单</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->
<!--              </el-menu>-->
<!--        </el-aside>-->
      <!--main区域-->
      <el-main>
        <div>
          <!--搜索区域-->
          <el-form
            :model="queryParams"
            ref="queryForm"
            v-show="showSearch"
            label-width="90px"
            label-posion="right"
          >
            <!--搜索栏-->
            <el-row>
              <!--航班号-->
              <el-col :span="5">
                <el-form-item label="航班号" >
                  <el-input v-model="queryParams.air_id" clearable placeholder="请输入航班号"></el-input>
                </el-form-item>
              </el-col>
              <!--乘机人证件号-->
              <el-col :span="6">
                <el-form-item label="乘机人证件号"  label-width="180px">
                  <el-input v-model="queryParams.pass_id" clearable placeholder="请输入乘机人证件号"></el-input>
                </el-form-item>
              </el-col>
              <!--搜索重置按钮-->
              <el-col :span="7">
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="medium"
                    @click="handleQuery"
                    style="font-size: 17px"
                  >搜索</el-button
                  >
                  <!--                <el-button icon="el-icon-refresh" size="medium" @click="" style="font-size: 17px"-->
                  <!--                >重置</el-button-->
                  <!--                >-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--内容显示区域-->

          <el-table :data="orderList" border v-if="orderList" style="font-size: 20px;margin-top: 20px">
            <el-table-column
              label="航班信息"
              prop="airline"
              align="center"
            />
            <el-table-column
              label="乘机人姓名"
              prop="passengername"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="乘机人证件类型"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.idType == 0">身份证</span>
                <span v-if="scope.row.idType == 1">护照</span>
                <span v-if="scope.row.idType == 2">台胞证</span>
                <span v-if="scope.row.idType == 3">回乡证</span>
                <span v-if="scope.row.idType == 4">军人证</span>
                <span v-if="scope.row.idType == 5">户口簿</span>
                <span v-if="scope.row.idType == 6">出生证明(限14天-2周岁内婴儿)</span>
                <span v-if="scope.row.idType == 7">外国人永久居留身份证</span>
                <span v-if="scope.row.idType == 8">港澳台居民居住证</span>
              </template>
            </el-table-column>

            <el-table-column
              label="乘机人电话"
              prop="tel"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="乘机人证件号"
              prop="pass_id"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="行程区间"
              prop="takeoffPlace"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.takeoffPlace}}{{scope.row.takeoffAirport}}
                <br>---<br>
                {{scope.row.arrivalPlace}}{{scope.row.arrivalAirport}}
              </template>
            </el-table-column>

            <el-table-column
              label="行程时间"
              prop="takeoffDate"
              align="center"
              width="240px"
            >
              <template slot-scope="scope">
                {{scope.row.takeoffDate}} {{scope.row.takeoffTime}}
                <br>---<br>
                {{scope.row.arrivalDate}} {{scope.row.arrivalTime}}
              </template>
            </el-table-column>

            <el-table-column
              label="实付款"
              prop="price"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="订单状态"
              prop="status"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未使用</span>
                <span v-if="scope.row.status == 1">已使用</span>
                <span v-if="scope.row.status == 2">已取消</span>
                <span v-if="scope.row.status == 3">已改签</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              prop="status"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="warning"  size="mini" @click="change(scope.row)">
                  <span>改签</span>
                </el-button>
                <el-button type="info"  size="mini" @click="refund(scope.row)">
                  <span>退票</span>
                </el-button>
              </template>
            </el-table-column>

            <!--          <el-table-column-->
            <!--            label="操作"-->
            <!--            align="center"-->
            <!--          >-->
            <!--            <template slot-scope="scope">-->
            <!--              <el-button type="warning"  size="mini" @click="edit(scope.row)">-->
            <!--                <span>修改</span>-->
            <!--              </el-button>-->
            <!--              <el-button type="info"  size="mini" @click="deleteAirline(scope.row)">-->
            <!--                <span>删除</span>-->
            <!--              </el-button>-->
            <!--            </template>-->
            <!--          </el-table-column>-->
          </el-table>
          <!--分页区域-->
          <!--        <div class="paginationLayout">-->
          <!--          <pagination-->
          <!--            v-show="total >= 0"-->
          <!--            :total="total"-->
          <!--            :page.sync="queryParams.page"-->
          <!--            :limit.sync="queryParams.limit"-->
          <!--            @pagination="getList"-->
          <!--          />-->
          <!--        </d改期iv>-->

          <!--        &lt;!&ndash;地址选择器&ndash;&gt;-->
          <!--        <el-card class="box-card">-->
          <!--          <div slot="header" class="clearfix">-->
          <!--            <span>卡片名称</span>-->
          <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          <!--          </div>-->
          <!--          <div v-for="o in 4" :key="o" class="text item">-->
          <!--            {{'列表内容 ' + o }}-->
          <!--          </div>-->
          <!--        </el-card>-->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // import Treeselect from '@riophae/vue-treeselect'
  // import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  // import {
  //   listInfoLog,
  //   getTreeorg,
  // } from "@/api/system/infoLog";
  // import Pagination from '@/components/Pagination';

  import axios from 'axios'

  export default {
    name: "airlineAdmin",
    // components: {Pagination},
    data() {
      return {
        //菜单激活颜色
        activeIndex: '',
        side_default_index: '1',
        //返回订单列表
        orderList: [],
        // // 遮罩层
        // loading: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 查询参数
        queryParams: {
          // page: 1,
          // limit: 10,
          price: '',
          //航班号
          air_id: '',
          //用户id
          user_id: null,
          //乘机人证件号
          pass_id: ''
        },

      };
    },
    created() {
      // this.getInfo();
      this.getList();
    },
    methods: {
      // /***获得用户id*/
      // getInfo(){
      //   this.user_id = window.sessionStorage.getItem('user_id');
      //   // console.log(this.user_id)
      // },
      /** 查询订单列表 */
      async getList() {
        this.loading = true;
        this.queryParams.user_id = window.sessionStorage.getItem("user_id")
        const { data: res } = await this.$http.post('queryOrder', this.queryParams)
        this.orderList = res
        console.log(this.orderList)
        // this.total = res.data.totalRow;
        this.loading = false;
      },
      /** 搜索按钮操作 */
      handleQuery() {
        // this.queryParams.page = 1;
        this.getList();
      },
      // /** 重置按钮操作 */
      // resetQuery() {
      //   this.queryParams.orgId = null;
      //   this.queryParams.logType = '';
      //   this.resetForm("queryForm");
      //   this.handleQuery();
      // },
      toSinTickets() {
        this.$router.push('/sinTickets')
      },
      async refund(row) {
        //订单状态改为2-已取消
        await this.$http.post('editOrder', { air_id: row.air_id, pass_id: row.pass_id, status: 2 })
        //余票数+1
        const { data: res } = await this.$http.post('queryAirlineById', { id: row.air_id })
        console.log(res)
        // console.log(res.economyPrice)
        if (row.price == res.economyPrice) {
          console.log("是经济舱")
          await this.$http.post('editTick', {
            ecoleftTick: ++res.ecoleftTick,
            busleftTick: res.busleftTick,
            id: res.id
          })
        } else {
          console.log("是商务舱")
          await this.$http.post('editTick', {
            ecoleftTick: res.ecoleftTick,
            busleftTick: ++res.busleftTick,
            id: res.id
          })
        }
        this.getList();
        this.$message.success("退票成功!退款将在3-5个工作日退还到您原账户！")
      },

      /**改签**/
      async change(row) {
        //改签凭证
        window.sessionStorage.setItem("changeToken", "1")
        //余票+1
        const { data: res } = await this.$http.post('queryAirlineById', { id: row.air_id })
        console.log(res)
        if (row.price == res.economyPrice) {
          console.log("是经济舱")
          await this.$http.post('editTick', {
            ecoleftTick: ++res.ecoleftTick,
            busleftTick: res.busleftTick,
            id: res.id
          })
        } else {
          console.log("是商务舱")
          await this.$http.post('editTick', {
            ecoleftTick: res.ecoleftTick,
            busleftTick: ++res.busleftTick,
            id: res.id
          })
        }
        //将pass_id等属性传递到pay界面，便于生成订单
        window.sessionStorage.setItem("change_pass_id", row.pass_id);
        //将订单状态改为”已改签“
        await this.$http.post('editOrder', { status: 3, air_id: row.air_id, pass_id: row.pass_id })
        //跳转到预订界面预订飞机
        this.$router.push({
          path: '/sinTickets',
          query: {
            takeoffPlace: row.takeoffPlace,
            arrivalPlace: row.arrivalPlace,
            takeoffDate: row.arrivalDate
          }
        });
      },
    }
  }
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
  /*.el-dialog__footer{*/
  /*  padding: 0;*/
  /*}*/
  .el-dialog__body{
    padding-left:50px ;
  }
  /* 弹出框滚动条 */
  /* 设置滚动条的样式 */
  /**解决了滚动条之间发生错位的现象 */
  ::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    /* 滚动条的颜色 */
    background-color: #e4e4e4;
  }
</style>

