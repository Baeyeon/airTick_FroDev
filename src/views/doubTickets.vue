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
        <span>我的</span>
      </div>
    </el-header>
    <!--main区域-->
    <el-main>
      <div>
        <!--搜索区域-->
        <el-form
          :model="queryParams"
          ref="queryRef"
          v-show="showSearch"
        >
          <!--行程类别-->
          <el-row>
            <el-col>
              <el-form-item label="行程类别">
                <el-radio v-model="radio" :label="1">单程</el-radio>
                <el-radio v-model="radio" :label="2">往返</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <!--搜索栏-->
          <el-row>
            <!--出发地-->
            <el-col :span="4">
              <el-form-item  label="出发地">
                <el-cascader
                  v-model="queryParams.depPlace"
                  :options="PlaceOptions"
                  @change=""
                  :show-all-levels="false"
                  clearable
                  filterable
                ></el-cascader>
                <!--              <el-input-->
                <!--                placeholder="请选择出发地"-->
                <!--                v-model="depPlace">-->
                <!--                <i slot="suffix" class="el-input__icon el-icon-location-outline" @click="chooseLocation"></i>-->
                <!--              </el-input>-->
              </el-form-item>
            </el-col>
            <!--目的地-->
            <el-col :span="4">
              <el-form-item  label="目的地">
                <el-cascader
                  v-model="queryParams.destination"
                  :options="PlaceOptions"
                  @change=""
                  :show-all-levels="false"
                  clearable
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <!--行程日期-->
            <el-col :span="5">
              <el-form-item label="行程日期">
                <el-date-picker
                  v-model="queryParams.timeRange"
                  style="width: 240px"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="出发日期"
                  end-placeholder="返程日期"
                  @change="v"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!--搜索重置按钮-->
            <el-col :span="4">
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="medium"
                  @click="handleQuery"
                  style="font-size: 17px"
                >搜索</el-button
                >
                <el-button icon="el-icon-refresh" size="medium" @click="resetQuery" style="font-size: 17px"
                >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--内容显示区域-->
        <el-form :inline="true">
          <el-row>
            <!--去程-->
            <el-col :span="12">
              <el-form-item>
                <el-card style="width: 900px">
                  <div slot="header" >
                  <span style="font-size: 25px">北京-重庆</span>
                  <!--筛选列-->
                  <el-row>
                    <el-col>
                      <!--起飞时间-->
                      <el-dropdown>
                    <span class="el-dropdown-link">
                      起飞时间<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-checkbox-group v-model="toParams.takeoffTime">
                            <el-dropdown-item>
                              <el-checkbox label="00:00-10:00" />
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-checkbox label="10:00-14:00" />
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-checkbox label="14:00-19:00" />
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-checkbox label="19:00-24:00" />
                            </el-dropdown-item>
                          </el-checkbox-group>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <!--起飞机场-->
                      <el-dropdown>
                    <span class="el-dropdown-link">
                      起飞机场<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-checkbox-group v-model="toParams.takeoffAirport">
                            <el-dropdown-item>
                              <el-checkbox label="大兴机场" />
                            </el-dropdown-item>
                          </el-checkbox-group>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <!--航空公司-->
                      <el-dropdown>
                    <span class="el-dropdown-link">
                      航空公司<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-checkbox-group v-model="toParams.airlineCom">
                            <el-dropdown-item>
                              <el-checkbox label="春秋航空" />
                            </el-dropdown-item>
                          </el-checkbox-group>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <!--换乘或直飞-->
                      <el-checkbox v-model="toParams.straight">直飞</el-checkbox>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <el-table :data="toTable" border v-if="toTable" style="font-size: 20px">
                    <el-table-column
                      label="航班"
                      prop="airline"
                      align="center"
                    />
                    <el-table-column
                      label="起飞时间"
                      prop="takeoffTime"
                      align="center"
                    />
                    <el-table-column
                      label="到达时间"
                      prop="landingTime"
                      align="center"
                    />
                    <el-table-column
                      label="起飞机场"
                      prop="takeoffAirport"
                      align="center"
                    />
                    <el-table-column
                      label="到达机场"
                      prop="landingAirport"
                      align="center"
                    />
                    <el-table-column
                      label="价格"
                      prop="price"
                      align="center"
                    />
                    <el-table-column
                      label="操作"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-button type="warning"  size="medium" @click="reserve()">
                          <span>预订</span>
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--分页区域-->
                <div class="paginationLayout">
                  <pagination
                    v-show="total >= 0"
                    :total="total"
                    :page.sync="toParams.page"
                    :limit.sync="toParams.limit"
                    @pagination="getList"
                  />
                </div>
              </el-card>
              </el-form-item>
            </el-col>
            <!--返程-->
            <el-col :span="10">
              <el-form-item>
                <el-card style="width: 900px">
                  <div slot="header">
                    <span style="font-size: 25px">重庆-北京</span>
                    <!--筛选列-->
                    <el-row>
                      <el-col>
                        <!--起飞时间-->
                        <el-dropdown>
                    <span class="el-dropdown-link">
                      起飞时间<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="backParams.takeoffTime">
                              <el-dropdown-item>
                                <el-checkbox label="00:00-10:00" />
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-checkbox label="10:00-14:00" />
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-checkbox label="14:00-19:00" />
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <el-checkbox label="19:00-24:00" />
                              </el-dropdown-item>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <!--起飞机场-->
                        <el-dropdown>
                    <span class="el-dropdown-link">
                      起飞机场<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="backParams.takeoffAirport">
                              <el-dropdown-item>
                                <el-checkbox label="大兴机场" />
                              </el-dropdown-item>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <!--航空公司-->
                        <el-dropdown>
                    <span class="el-dropdown-link">
                      航空公司<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="backParams.airlineCom">
                              <el-dropdown-item>
                                <el-checkbox label="春秋航空" />
                              </el-dropdown-item>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <!--换乘或直飞-->
                        <el-checkbox v-model="backParams.straight">直飞</el-checkbox>
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-table :data="backTable" border v-if="backTable" style="font-size: 20px">
                      <el-table-column
                        label="航班"
                        prop="airline"
                        align="center"
                      />
                      <el-table-column
                        label="起飞时间"
                        prop="takeoffTime"
                        align="center"
                      />
                      <el-table-column
                        label="到达时间"
                        prop="landingTime"
                        align="center"
                      />
                      <el-table-column
                        label="起飞机场"
                        prop="takeoffAirport"
                        align="center"
                      />
                      <el-table-column
                        label="到达机场"
                        prop="landingAirport"
                        align="center"
                      />
                      <el-table-column
                        label="价格"
                        prop="price"
                        align="center"
                      />
                      <el-table-column
                        label="操作"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-button type="warning"  size="medium" @click="reserve()">
                            <span>预订</span>
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--分页区域-->
                  <div class="paginationLayout">
                    <pagination
                      v-show="total >= 0"
                      :total="total"
                      :page.sync="backParams.page"
                      :limit.sync="backParams.limit"
                      @pagination="getList"
                    />
                  </div>
                </el-card>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
        //原生查询参数
        queryParams:{
          depPlace: '',
          destination: '',
          timeRange:''
        },
        //菜单激活颜色
        activeIndex:'2',
        //出发地列表
        PlaceOptions:[
          //国内
          {
            value: 'guonei',
            label: '国内',
            children: [
              //ABCDE
              {
                value: 'ABCDE',
                label: 'ABCDE',
                children: [
                  //A
                  {
                    value: 'A',
                    label: 'A',
                    children: [{
                      value: 'ali',
                      label: '阿里'
                    }, {
                      value: 'aershan',
                      label: '阿尔山'
                    }, {
                      value: 'anqing',
                      label: '安庆'
                    }, {
                      value: 'anshan',
                      label: '鞍山'
                    },{
                      value: 'anshun',
                      label: '安顺'
                    },{
                      value: 'akesu',
                      label: '阿克苏'
                    },{
                      value: 'alashanzuoqi',
                      label: '阿拉善左旗'
                    },{
                      value: 'alashanyouqi',
                      label: '阿拉善右旗'
                    }
                    ]
                  },
                  //B
                  {value: 'B',
                    label: 'B',
                    children: [{
                      value: 'baotou',
                      label: '包头'
                    }, {
                      value: 'beihai',
                      label: '北海'
                    }, {
                      value: 'beijing',
                      label: '北京'
                    },{
                      value: 'baise',
                      label: '百色'
                    },{
                      value: 'baoshan',
                      label: '保山'
                    },{
                      value: 'buole',
                      label: '博乐'
                    },{
                      value: 'bijie',
                      label: '毕节'
                    },{
                      value: 'bayannaoer',
                      label: '巴彦淖尔'
                    }]
                  },
                  //C
                  {value: 'C',
                    label: 'C',
                    children: [{
                      value: 'changzhi',
                      label: '长治'
                    }, {
                      value: 'chizhou',
                      label: '池州'
                    }, {
                      value: 'changchun',
                      label: '长春'
                    },{
                      value: 'changzhou',
                      label: '常州'
                    },{
                      value: 'changdu',
                      label: '昌都'
                    },{
                      value: 'chaoyang',
                      label: '朝阳'
                    },{
                      value: 'changde',
                      label: '常德'
                    },{
                      value: 'changbaishan',
                      label: '长白山'
                    },{
                      value: 'chengdu',
                      label: '成都'
                    },{
                      value: 'chongqing',
                      label: '重庆'
                    },{
                      value: 'changsha',
                      label: '长沙'
                    },{
                      value: 'chifeng',
                      label: '赤峰'
                    }]
                  },
                  //D
                  {value: 'D',
                    label: 'D',
                    children: [{
                      value: 'datong',
                      label: '大同'
                    }, {
                      value: 'dalian',
                      label: '大连'
                    }, {
                      value: 'dongying',
                      label: '东营'
                    },{
                      value: 'daqing',
                      label: '大庆'
                    },{
                      value: 'dandong',
                      label: '丹东'
                    },{
                      value: 'dali',
                      label: '大理'
                    },{
                      value: 'dunhuang',
                      label: '敦煌'
                    },{
                      value: 'dazhou',
                      label: '达州'
                    },{
                      value: 'daocheng',
                      label: '稻城'
                    }]
                  },
                  //E
                  {value: 'E',
                    label: 'E',
                    children: [{
                      value: 'enshi',
                      label: '恩施'
                    }, {
                      value: 'eerduosi',
                      label: '鄂尔多斯'
                    }, {
                      value: 'erlianhaote',
                      label: '二连浩特'
                    },{
                      value: 'ejinaqi',
                      label: '额济纳旗'
                    }]
                  }
                ]
              },
              //FGHJ
              {
                value: 'FGHJ',
                label: 'FGHJ',
                children: [
                  //F
                  {
                    value: 'F',
                    label: 'F',
                    children: [{
                      value: 'foshan',
                      label: '佛山'
                    }, {
                      value: 'fuzhou',
                      label: '福州'
                    }, {
                      value: 'fuyang',
                      label: '阜阳'
                    }, {
                      value: 'fuyuan',
                      label: '抚远'
                    }]
                  },
                  //G
                  {
                    value: 'G',
                    label: 'G',
                    children: [{
                      value: 'guiyang',
                      label: '贵阳'
                    }, {
                      value: 'guilin',
                      label: '桂林'
                    }, {
                      value: 'guangzhou',
                      label: '广州'
                    }, {
                      value: 'guangyuan',
                      label: '广元'
                    }, {
                      value: 'geermu',
                      label: '格尔木'
                    }, {
                      value: 'ganzhou',
                      label: '赣州'
                    }, {
                      value: 'guyuan',
                      label: '固原'
                    }]
                  },
                  //H
                  {
                    value: 'H',
                    label: 'H',
                    children: [{
                      value: 'hami',
                      label: '哈密'
                    }, {
                      value: 'huhehaote',
                      label: '呼和浩特'
                    }, {
                      value: 'heihe',
                      label: '黑河'
                    }, {
                      value: 'hailaer',
                      label: '海拉尔'
                    }, {
                      value: 'haerbin',
                      label: '哈尔滨'
                    }, {
                      value: 'haikou',
                      label: '海口'
                    }, {
                      value: 'huangshan',
                      label: '黄山'
                    }, {
                      value: 'hangzhou',
                      label: '杭州'
                    }, {
                      value: 'handan',
                      label: '邯郸'
                    }, {
                      value: 'hefei',
                      label: '合肥'
                    }, {
                      value: 'huanglong',
                      label: '黄龙'
                    }, {
                      value: 'hanzhong',
                      label: '汉中'
                    }, {
                      value: 'hetian',
                      label: '和田'
                    }, {
                      value: 'huaian',
                      label: '淮安'
                    }]
                  },
                  //J
                  {
                    value: 'J',
                    label: 'J',
                    children: [{
                      value: 'jixi',
                      label: '鸡西'
                    }, {
                      value: 'jinjiang',
                      label: '晋江'
                    }, {
                      value: 'jinzhou',
                      label: '锦州'
                    }, {
                      value: 'jingdezhen',
                      label: '景德镇'
                    }, {
                      value: 'jiayuguan',
                      label: '嘉峪关'
                    }, {
                      value: 'jinggangshan',
                      label: '井冈山'
                    }, {
                      value: 'jining',
                      label: '济宁'
                    }, {
                      value: 'jiujiang',
                      label: '九江'
                    }, {
                      value: 'jiamusi',
                      label: '佳木斯'
                    }, {
                      value: 'jinan',
                      label: '济南'
                    }, {
                      value: 'jiagedaqi',
                      label: '加格达奇'
                    }, {
                      value: 'jinchang',
                      label: '金昌'
                    }, {
                      value: 'jieyang',
                      label: '揭阳'
                    }]
                  }]
              },
              //KLMNP
              {
                value: 'KLMNP',
                label: 'KLMNP',
                children: [
                  //K
                  {
                    value: 'K',
                    label: 'K',
                    children: [{
                      value: 'kashi',
                      label: '喀什'
                    }, {
                      value: 'kunming',
                      label: '昆明'
                    }, {
                      value: 'kangding',
                      label: '康定'
                    }, {
                      value: 'kelamayi',
                      label: '克拉玛依'
                    }, {
                      value: 'kuerle',
                      label: '库尔勒'
                    }, {
                      value: 'kuche',
                      label: '库车'
                    }, {
                      value: 'kanasi',
                      label: '喀纳斯'
                    }, {
                      value: 'kaili',
                      label: '凯里'
                    }]
                  },
                  //L
                  {
                    value: 'L',
                    label: 'L',
                    children: [{
                      value: 'lanzhou',
                      label: '兰州'
                    }, {
                      value: 'luoyang',
                      label: '洛阳'
                    }, {
                      value: 'lijiang',
                      label: '丽江'
                    }, {
                      value: 'libo',
                      label: '荔波'
                    }, {
                      value: 'linzhi',
                      label: '林芝'
                    }, {
                      value: 'liuzhou',
                      label: '柳州'
                    }, {
                      value: 'luzhou',
                      label: '泸州'
                    }, {
                      value: 'lianyungang',
                      label: '连云港'
                    }, {
                      value: 'liping',
                      label: '黎平'
                    }, {
                      value: 'liancheng',
                      label: '连城'
                    }, {
                      value: 'lasa',
                      label: '拉萨'
                    }, {
                      value: 'linyi',
                      label: '临沂'
                    }, {
                      value: 'lincang',
                      label: '临沧'
                    }, {
                      value: 'lvliang',
                      label: '吕梁'
                    }]
                  },
                  //M
                  {
                    value: 'M',
                    label: 'M',
                    children: [{
                      value: 'mangshi',
                      label: '芒市'
                    }, {
                      value: 'mudanjiang',
                      label: '牡丹江'
                    }, {
                      value: 'manzhouli',
                      label: '满洲里'
                    }, {
                      value: 'mianyang',
                      label: '绵阳'
                    }, {
                      value: 'meixian',
                      label: '梅县'
                    }, {
                      value: 'mohe',
                      label: '漠河'
                    }]
                  },
                  //N
                  {
                    value: 'N',
                    label: 'N',
                    children: [{
                      value: 'nanjing',
                      label: '南京'
                    }, {
                      value: 'nanchong',
                      label: '南充'
                    }, {
                      value: 'nanning',
                      label: '南宁'
                    }, {
                      value: 'nanyang',
                      label: '南阳'
                    }, {
                      value: 'nantong',
                      label: '南通'
                    }, {
                      value: 'nanchang',
                      label: '南昌'
                    }, {
                      value: 'nalati',
                      label: '那拉提'
                    }, {
                      value: 'ningbo',
                      label: '宁波'
                    }]
                  },
                  //P
                  {
                    value: 'P',
                    label: 'P',
                    children: [{
                      value: 'panzhihua',
                      label: '攀枝花'
                    }, {
                      value: 'puer',
                      label: '普洱'
                    }]
                  }
                ]
              },
              //QRSTW
              {
                value: 'QRSTW',
                label: 'QRSTW',
                children: [
                  //Q
                  {
                    value: 'Q',
                    label: 'Q',
                    children: [{
                      value: 'quzhou',
                      label: '衢州'
                    }, {
                      value: 'qianjiang',
                      label: '黔江'
                    }, {
                      value: 'qinhuangdao',
                      label: '秦皇岛'
                    }, {
                      value: 'qingyang',
                      label: '庆阳'
                    }, {
                      value: 'qiemo',
                      label: '且末'
                    }, {
                      value: 'qiqihaer',
                      label: '齐齐哈尔'
                    }, {
                      value: 'qingdao',
                      label: '青岛'
                    }, {
                      value: 'qilian',
                      label: '祁连'
                    }]
                  },
                  //R
                  {
                    value: 'R',
                    label: 'R',
                    children: [{
                      value: 'rikaze',
                      label: '日喀则'
                    }]
                  },
                  //S
                  {
                    value: 'S',
                    label: 'S',
                    children: [{
                      value: 'shenzhen',
                      label: '深圳'
                    }, {
                      value: 'shijiazhuang',
                      label: '石家庄'
                    }, {
                      value: 'sanya',
                      label: '三亚'
                    }, {
                      value: 'shenyang',
                      label: '沈阳'
                    }, {
                      value: 'shanghai',
                      label: '上海'
                    }, {
                      value: 'shennongjia',
                      label: '神农架'
                    }]
                  },
                  //T
                  {
                    value: 'T',
                    label: 'T',
                    children: [{
                      value: 'tangshan',
                      label: '唐山'
                    }, {
                      value: 'tongren',
                      label: '铜仁'
                    }, {
                      value: 'tacheng',
                      label: '塔城'
                    }, {
                      value: 'tengchong',
                      label: '腾冲'
                    }, {
                      value: 'taizhou',
                      label: '台州'
                    }, {
                      value: 'tianshui',
                      label: '天水'
                    }, {
                      value: 'tianjin',
                      label: '天津'
                    }, {
                      value: 'tongliao',
                      label: '通辽'
                    }, {
                      value: 'tulufan',
                      label: '吐鲁番'
                    }, {
                      value: 'taiyuan',
                      label: '太原'
                    }, {
                      value: 'taizhou',
                      label: '泰州'
                    }]
                  },
                  //W
                  {
                    value: 'W',
                    label: 'W',
                    children: [{
                      value: 'weihai',
                      label: '威海'
                    }, {
                      value: 'wuhan',
                      label: '武汉'
                    }, {
                      value: 'wuzhou',
                      label: '梧州'
                    }, {
                      value: 'wenshan',
                      label: '文山'
                    }, {
                      value: 'wuxi',
                      label: '无锡'
                    }, {
                      value: 'weifang',
                      label: '潍坊'
                    }, {
                      value: 'wuyishan',
                      label: '武夷山'
                    }, {
                      value: 'wulanhaote',
                      label: '乌兰浩特'
                    }, {
                      value: 'wenzhou',
                      label: '温州'
                    }, {
                      value: 'wulumuqi',
                      label: '乌鲁木齐'
                    }, {
                      value: 'wanzhou',
                      label: '万州'
                    }, {
                      value: 'wuhai',
                      label: '乌海'
                    }]
                  }
                ]
              },
              //XYZ
              {
                value: 'XYZ',
                label: 'XYZ',
                children: [
                  //X
                  {
                    value: 'X',
                    label: 'X',
                    children: [{
                      value: 'xingyi',
                      label: '兴义'
                    }, {
                      value: 'xichang',
                      label: '西昌'
                    }, {
                      value: 'xiamen',
                      label: '厦门'
                    }, {
                      value: 'xianggelila',
                      label: '香格里拉'
                    }, {
                      value: 'xian',
                      label: '西安'
                    }, {
                      value: 'xining',
                      label: '西宁'
                    }, {
                      value: 'xiangyang',
                      label: '襄阳（中国）'
                    }, {
                      value: 'xilinhaote',
                      label: '锡林浩特'
                    }, {
                      value: 'xilinhaote',
                      label: '西双版纳'
                    }, {
                      value: 'xilinhaote',
                      label: '锡林浩特'
                    }, {
                      value: 'xuzhou',
                      label: '徐州'
                    }, {
                      value: 'xianggang',
                      label: '香港'
                    }]
                  },
                  //Y
                  {
                    value: 'Y',
                    label: 'Y',
                    children: [{
                      value: 'yiwu',
                      label: '义乌'
                    }, {
                      value: 'yongzhou',
                      label: '永州'
                    }, {
                      value: 'yulin',
                      label: '榆林'
                    }, {
                      value: 'yangzhou',
                      label: '扬州'
                    }, {
                      value: 'yanan',
                      label: '延安'
                    }, {
                      value: 'yuncheng',
                      label: '运城'
                    }, {
                      value: 'yantai',
                      label: '烟台'
                    }, {
                      value: 'yinchuan',
                      label: '银川'
                    }, {
                      value: 'yichang',
                      label: '宜昌'
                    }, {
                      value: 'yibin',
                      label: '宜宾'
                    }, {
                      value: 'yichun',
                      label: '宜春'
                    }, {
                      value: 'yancheng',
                      label: '盐城'
                    }, {
                      value: 'yanji',
                      label: '延吉'
                    }, {
                      value: 'yvshu',
                      label: '玉树'
                    }, {
                      value: 'yining',
                      label: '伊宁'
                    }, {
                      value: 'yichun',
                      label: '伊春'
                    }]
                  },
                  //Z
                  {
                    value: 'Z',
                    label: 'Z',
                    children: [{
                      value: 'zhuhai',
                      label: '珠海'
                    }, {
                      value: 'zhaotong',
                      label: '昭通'
                    }, {
                      value: 'zhangjiajie',
                      label: '张家界'
                    }, {
                      value: 'zhoushan',
                      label: '舟山'
                    }, {
                      value: 'zhengzhou',
                      label: '郑州'
                    }, {
                      value: 'zhongwei',
                      label: '中卫'
                    }, {
                      value: 'zhijiang',
                      label: '芷江'
                    }, {
                      value: 'zhanjiang',
                      label: '湛江'
                    }, {
                      value: 'zunyi',
                      label: '遵义'
                    }, {
                      value: 'zhangye',
                      label: '张掖'
                    }, {
                      value: 'zhangjiakou',
                      label: '张家口'
                    }]
                  }
                ]
              }
            ]
          },
          //国际
          {
            value: 'guoji',
            label: '国际·港澳台',
            children: [
              //亚洲/大洋洲
              {
                value: 'yazhou',
                label: '亚洲/大洋洲',
                children: [
                  {
                    value: 'zhongguoxianggang',
                    label: '中国香港'
                  }, {
                    value: 'xinjiapo',
                    label: '新加坡'
                  }, {
                    value: 'shouer',
                    label: '首尔'
                  }, {
                    value: 'mangu',
                    label: '曼谷'
                  },{
                    value: 'jilongpo',
                    label: '吉隆坡'
                  },{
                    value: 'dongjing',
                    label: '东京'
                  },{
                    value: 'zhongguotaibei',
                    label: '中国台北'
                  },{
                    value: 'xini',
                    label: '悉尼'
                  },
                  {
                    value: 'zhongguoaomen',
                    label: '中国澳门'
                  }, {
                    value: 'puji',
                    label: '普吉'
                  }, {
                    value: 'moerben',
                    label: '墨尔本'
                  },{
                    value: 'huzhimingshi',
                    label: '胡志明市'
                  },{
                    value: 'daban',
                    label: '大阪'
                  },{
                    value: 'balidao',
                    label: '巴厘岛'
                  },{
                    value: 'manila',
                    label: '马尼拉'
                  },{
                    value: 'henei',
                    label: '河内'
                  },{
                    value: 'jiademandu',
                    label: '加德满都'
                  }, {
                    value: 'jinbian',
                    label: '金边'
                  }, {
                    value: 'yajiada',
                    label: '雅加达'
                  },{
                    value: 'malei',
                    label: '马累'
                  },{
                    value: 'xianli',
                    label: '暹粒'
                  },{
                    value: 'dibai',
                    label: '迪拜'
                  },{
                    value: 'fushan',
                    label: '釜山'
                  },{
                    value: 'mingguwu',
                    label: '名古屋'
                  },{
                    value: 'aokelan',
                    label: '奥克兰'
                  },{
                    value: 'bulisiban',
                    label: '布里斯班'
                  },{
                    value: 'bincheng',
                    label: '槟城'
                  },{
                    value: 'zhongguogaoxiong',
                    label: '中国高雄'
                  },{
                    value: 'xindeli',
                    label: '新德里'
                  }, {
                    value: 'jizhoudao',
                    label: '济州岛'
                  }, {
                    value: 'hanguo',
                    label: '韩国'
                  },{
                    value: 'taiguo',
                    label: '泰国'
                  },{
                    value: 'malaixiya',
                    label: '马来西亚'
                  },{
                    value: 'riben',
                    label: '日本'
                  },{
                    value: 'aodaliya',
                    label: '澳大利亚'
                  },{
                    value: 'yuenan',
                    label: '越南'
                  },{
                    value: 'yindunixiya',
                    label: '印度尼西亚'
                  },{
                    value: 'feilvbin',
                    label: '菲律宾'
                  }, {
                    value: 'niboer',
                    label: '尼泊尔'
                  }
                ]
              },
              //美洲
              {
                value: 'meizhou',
                label: '美洲',
                children: [
                  {
                    value: 'niuyue',
                    label: '纽约'
                  }, {
                    value: 'luoshanji',
                    label: '洛杉矶'
                  }, {
                    value: 'duolunduo',
                    label: '多伦多'
                  }, {
                    value: 'wengehua',
                    label: '温哥华'
                  }, {
                    value: 'jiujinshan',
                    label: '旧金山'
                  }, {
                    value: 'zhijiage',
                    label: '芝加哥'
                  }, {
                    value: 'huashengdun',
                    label: '华盛顿'
                  }, {
                    value: 'xiyatu',
                    label: '西雅图'
                  }, {
                    value: 'boshidun',
                    label: '波士顿'
                  }, {
                    value: 'ditelv',
                    label: '底特律'
                  }, {
                    value: 'yatelanda',
                    label: '亚特兰大'
                  }, {
                    value: 'mengtellier',
                    label: '蒙特利尔'
                  },
                  {
                    value: 'xiusidun',
                    label: '休斯顿'
                  }, {
                    value: 'huonululu',
                    label: '火奴鲁鲁'
                  }, {
                    value: 'dalasi',
                    label: '达拉斯'
                  }]
              },
              //欧洲
              {
                value: 'ouzhou',
                label: '欧洲',
                children: [
                  {
                    value: 'kashi',
                    label: '喀什'
                  }, {
                    value: 'kunming',
                    label: '昆明'
                  }, {
                    value: 'kangding',
                    label: '康定'
                  }, {
                    value: 'kelamayi',
                    label: '克拉玛依'
                  }, {
                    value: 'kuerle',
                    label: '库尔勒'
                  }, {
                    value: 'kuche',
                    label: '库车'
                  }, {
                    value: 'kanasi',
                    label: '喀纳斯'
                  }, {
                    value: 'kaili',
                    label: '凯里'
                  },
                  {
                    value: 'lanzhou',
                    label: '兰州'
                  }, {
                    value: 'luoyang',
                    label: '洛阳'
                  }, {
                    value: 'lijiang',
                    label: '丽江'
                  }, {
                    value: 'libo',
                    label: '荔波'
                  }, {
                    value: 'linzhi',
                    label: '林芝'
                  }, {
                    value: 'liuzhou',
                    label: '柳州'
                  }, {
                    value: 'luzhou',
                    label: '泸州'
                  }, {
                    value: 'lianyungang',
                    label: '连云港'
                  }, {
                    value: 'liping',
                    label: '黎平'
                  }, {
                    value: 'liancheng',
                    label: '连城'
                  }, {
                    value: 'lasa',
                    label: '拉萨'
                  }, {
                    value: 'linyi',
                    label: '临沂'
                  }, {
                    value: 'lincang',
                    label: '临沧'
                  }, {
                    value: 'lvliang',
                    label: '吕梁'
                  }
                ]
              },
              //非洲
              {
                value: 'feizhou',
                label: '非洲',
                children: [
                  {
                    value: 'quzhou',
                    label: '衢州'
                  }, {
                    value: 'qianjiang',
                    label: '黔江'
                  }, {
                    value: 'qinhuangdao',
                    label: '秦皇岛'
                  }, {
                    value: 'qingyang',
                    label: '庆阳'
                  }, {
                    value: 'qiemo',
                    label: '且末'
                  }, {
                    value: 'qiqihaer',
                    label: '齐齐哈尔'
                  }, {
                    value: 'qingdao',
                    label: '青岛'
                  }, {
                    value: 'qilian',
                    label: '祁连'
                  }
                ]
              },
            ]
          },
        ],
        //去程查询参数
        toParams:{
          //去程日期
          toDate:'',
          //出发地
          depPlace:'',
          //起飞时间
          takeoffTime:[],
          //起飞机场
          takeoffAirport:[],
          //航空公司
          airlineCom:[],
          //换乘或直飞
          straight:false,
          page: 1,
          limit: 10,
        },
          //返程查询参数
          backParams:{
              //返程日期
              backDate:'',
              //目的地
              destination:'',
              //起飞时间
              takeoffTime:[],
              //起飞机场
              takeoffAirport:[],
              //航空公司
              airlineCom:[],
              //换乘或直飞
              straight:false,
            page: 1,
            limit: 10,
          },
        //行程类别单选框
        radio:2,
        // // 遮罩层
        // loading: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 去程返回列表
        toTable: [
          {
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },
        ],
        //返程返回列表
        backTable: [
          {
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },{
            airline:'春秋航空 9C887 空客320',
            takeoffTime: '13:35',
            landingTime:'16:25',
            takeoffAirport:'浦东机场T2',
            landingAirport:'江北机场T2',
            price:'￥700',
          },
        ],
      };
    },
    created() {
      this.getList();
      this.getOrganizationList();
    },
    methods: {
      /** 查询 **/
      getList() {
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
      /** 搜索按钮 */
      handleQuery() {
        this.queryParams.page = 1;
        this.getList();
      },
      /** 重置按钮 */
      resetQuery() {
        this.timeRange = [];
        this.queryParams.orgId = null;
        this.queryParams.logType = '';
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 时间范围设定 **/
      v(e) {
        this.queryParams.timeRange = e;
      },
      /** 预订按钮 **/
      reserve(){
        // console.log("预订成功")
        this.$router.push('/seatTypeChoose')
      }
    },
  };
</script>

<style scoped>
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
