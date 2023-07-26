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
          <el-menu-item index="2" style="font-size: 20px" @click="toSinTick">机票</el-menu-item>
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
      <el-card >
        <!--card头部-->
        <div slot="header" style="text-align: center">
          <span style="font-size: 25px">乘机人信息</span>
        </div>
        <!--card内容-->
          <!--必填项-->
        <div >
          <el-form
          ref="userInfoRef"
          :rules="userInfoRules"
          :model="userInfoForm"
          label-width="120px"
          style="margin-left: 750px"
          >
            <el-form-item label="姓名:"  prop="passengername" >
              <el-input
                placeholder="与乘机证件一致"
                v-model="userInfoForm.passengername"
                style="width: 217px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="证件类型:" prop="idType">
              <el-select v-model="userInfoForm.idType" placeholder="请选择证件类型">
              <el-option label="身份证" :value="0"></el-option>
              <el-option label="护照" :value="1"></el-option>
                <el-option label="台胞证" :value="2"></el-option>
                <el-option label="回乡证" :value="3"></el-option>
                <el-option label="军人证" :value="4"></el-option>
                <el-option label="户口簿" :value="5"></el-option>
                <el-option label="出生证明(限14天-2周岁内婴儿)" :value="5"></el-option>
                <el-option label="外国人永久居留身份证" :value="6"></el-option>
                <el-option label="港澳台居民居住证" :value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码:" prop="id">
              <el-input
                placeholder="请输入证件号"
                v-model="userInfoForm.id"
                style="width: 217px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="tel">
              <el-input
                placeholder="请输入电话号,用于接收航变信息"
                v-model="userInfoForm.tel"
                style="width: 217px"
              >
              </el-input>
            </el-form-item>
<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="addItem">添加乘机人</el-button>-->
<!--            </el-form-item>-->
              <el-button type="primary" round style="width: 200px;margin-left: 70px" @click="submit">提交订单</el-button>
          </el-form>
        </div>
          <!--动态表单部分-->
<!--        <div v-for="(item, index) in userInfoForm.dynamicItem" :key="index">-->
<!--          <el-form-item-->
<!--            label="姓名:"-->
<!--            :prop="'dynamicItem.' + index + '.passengername'"-->
<!--            :rules="{-->
<!--            required: true, message: '请输入姓名', trigger: 'blur'-->
<!--        }"-->
<!--          >-->
<!--            <el-input v-model="item.passengername"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            label="证件类型:"-->
<!--            :prop="'dynamicItem.' + index + '.idType'"-->
<!--            :rules="{-->
<!--            required: true, message: '请选择证件类型', trigger: 'blur'-->
<!--        }"-->
<!--          >-->
<!--            <el-select v-model="item.idType" placeholder="请选择证件类型">-->
<!--              <el-option label="身份证" value="身份证"></el-option>-->
<!--              <el-option label="护照" value="护照"></el-option>-->
<!--              <el-option label="台胞证" value="台胞证"></el-option>-->
<!--              <el-option label="回乡证" value="回乡证"></el-option>-->
<!--              <el-option label="军人证" value="军人证"></el-option>-->
<!--              <el-option label="户口簿" value="户口簿"></el-option>-->
<!--              <el-option label="出生证明(限14天-2周岁内婴儿)" value="出生证明"></el-option>-->
<!--              <el-option label="外国人永久居留身份证" value="外国人永久居留身份证"></el-option>-->
<!--              <el-option label="港澳台居民居住证" value="港澳台居民居住证"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            label="证件号码:"-->
<!--            :prop="'dynamicItem.' + index + '.id'"-->
<!--            :rules="{-->
<!--            required: true, message: '请输入证件号码', trigger: 'blur'-->
<!--        }"-->
<!--          >-->
<!--            <el-input v-model="item.id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item-->
<!--            label="电话"-->
<!--            :prop="'dynamicItem.' + index + '.tel'"-->
<!--          >-->
<!--            <el-input v-model="item.tel"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <i class="el-icon-delete" @click="deleteItem(item, index)"></i>-->
<!--          </el-form-item>-->
<!--        </div>-->
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

  export default {
    name: "sinTickets",
    data() {
      //验证邮箱输入是否正确的校验规则
      var checkEmail = (rule, value, callback)=>{
        //验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        //邮箱合法
        if(regEmail.test(value)){ //value值为用户输入的邮箱值
          return callback() //callback为回调函数
        }
        //邮箱非法
        callback(new Error('请输入合法的邮箱！'))
      }
      //验证手机号输入是否正确的校验规则
      var checkMobile = (rule, value, callback) =>{
        //验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)){
          return callback
        }
        callback(new Error('请输入合法的手机号！'))
      }
      //验证身份证号输入是否正确的校验规则
      var checkId = (rule, value, callback) =>{
        //验证手机号的正则表达式
        const regId = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if(regId.test(value)){
          return callback
        }
        callback(new Error('请输入合法的身份证号！'))
      }
      return {
        //传给pay页面的航班号
        air_id:'',
        //传给pay页面的乘机人证件号
        // pass_id:'',
        //用户信息表单
        userInfoForm:{
          //证件号码
          id:'',
          //证件类型
          idType:null,
          //乘机人姓名
          passengername:'',
          //乘机人电话
          tel:'',
          // //动态表单项
          // dynamicItem:[]
        },
        //用户信息表单校验规则
        userInfoRules: {
          passengername: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          idType: [
            {required: true, message: '请选择证件类型', trigger: 'blur'}
          ],
          id:[
            {required: true, message: '请输入证件号码', trigger: 'blur'},
            {validator:checkId,trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {validator:checkMobile,trigger: 'blur'}
          ]
        },
        //菜单激活颜色
        activeIndex:'2',
        // // 遮罩层
        // loading: true,
        // 显示搜索条件
        showSearch: true,
      };
    },
    created() {
      this.getInfo();
    },
    methods: {
      // //删除动态表单项
      // deleteItem (item, index) {
      //   this.userInfoForm.dynamicItem.splice(index, 1)
      // },
      // //动态增加表单项
      // addItem () {
      //   this.userInfoForm.dynamicItem.push({
      //     passengername: '',
      //     idType:'',
      //     id:'',
      //     tel: '',
      //   })
      // },

      getInfo(){
        this.air_id = this.$route.query.air_id;
      },
      //提交订单按钮
      submit(){
        console.log(this.userInfoForm)
        // this.pass_id = this.userInfoForm.id
        // console.log(pass_id)
        this.$http.post('addPassenger',this.userInfoForm)
        this.$http.post('addBelonging', { user_id:this.$route.query.user_id, pass_id:this.userInfoForm.id })
        this.$router.push({
          path:'/pay',
          query:{
            price:this.$route.query.price,
            air_id:this.$route.query.air_id,
            pass_id:this.userInfoForm.id,
            ecoleftTick:this.$route.query.ecoleftTick,
            busleftTick:this.$route.query.busleftTick,
          }
        })
      },
      toSinTick(){
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
  .paginationLayout{
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
  }
</style>
