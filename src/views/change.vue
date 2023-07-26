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
          <el-menu-item index="9" style="font-size: 20px"></el-menu-item>
        </el-menu>
      </div>
      <!--用户区域-->
      <div style="font-size: 20px ">
        <i class="el-icon-user-solid"></i>
        <a class="a" @click="toOrder" style="margin-right:30px">我的订单</a>
        <el-button type="info" @click="logout">退出系统</el-button>
      </div>
    </el-header>
    <!--main区域-->
    <el-main>
      <div>
        <!--搜索区域-->
        <el-form
          :model="queryParams"
          ref="queryForm"
          v-show="showSearch"
        >
          <!--          &lt;!&ndash;行程类别&ndash;&gt;-->
          <!--          <el-row>-->
          <!--            <el-col>-->
          <!--                <el-form-item label="行程类别">-->
          <!--                  <el-radio v-model="radio" :label="1">单程</el-radio>-->
          <!--                  <el-radio v-model="radio" :label="2">往返</el-radio>-->
          <!--                </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <!--搜索栏-->
          <el-row>
            <!--出发地-->
            <el-col :span="4">
              <el-form-item  label="出发地">
                <el-cascader
                  v-model="queryParams.takeoffPlace"
                  :props="{emitPath:false}"
                  :options="PlaceOptions"
                  @change=""
                  :show-all-levels="false"
                  clearable
                  filterable
                  placeholder="请选择或输入城市名"
                ></el-cascader>
                <!--              <el-input-->
                <!--                placeholder="请选择出发地"-->
                <!--                v-model="takeoffPlace">-->
                <!--                <i slot="suffix" class="el-input__icon el-icon-location-outline" @click="chooseLocation"></i>-->
                <!--              </el-input>-->
              </el-form-item>
            </el-col>
            <!--目的地-->
            <el-col :span="4">
              <el-form-item  label="目的地">
                <el-cascader
                  :props="{emitPath:false}"
                  v-model="queryParams.arrivalPlace"
                  :options="PlaceOptions"
                  @change=""
                  :show-all-levels="false"
                  clearable
                  filterable
                  placeholder="请选择或输入城市名"

                ></el-cascader>
              </el-form-item>
            </el-col>
            <!--行程日期-->
            <el-col :span="5">
              <el-form-item label="出发日期" prop="value">
                <!--              <el-date-picker-->
                <!--                v-model="timeRange"-->
                <!--                style="width: 240px"-->
                <!--                value-format="yyyy-MM-dd hh:mm:ss"-->
                <!--                type="date"-->
                <!--                range-separator="-"-->
                <!--                placeholder="出发日期"-->
                <!--                @change="v"-->
                <!--              ></el-date-picker>-->
                <el-date-picker
                  v-model="queryParams.takeoffDate"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
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
                <!--              <el-button icon="el-icon-refresh" size="medium" @click="" style="font-size: 17px"-->
                <!--              >重置</el-button-->
                <!--              >-->
              </el-form-item>
            </el-col>
          </el-row>
          <!--          &lt;!&ndash;筛选列&ndash;&gt;-->
          <!--          <el-row>-->
          <!--            <el-col>-->
          <!--              <el-form-item>-->
          <!--                &lt;!&ndash;起飞时间&ndash;&gt;-->
          <!--                <el-dropdown>-->
          <!--              <span class="el-dropdown-link">-->
          <!--                起飞时间<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--              </span>-->
          <!--                  <el-dropdown-menu slot="dropdown">-->
          <!--                    <el-checkbox-group v-model="queryParams.takeoffTime">-->
          <!--                      <el-dropdown-item>-->
          <!--                        <el-checkbox label="00:00-10:00" />-->
          <!--                      </el-dropdown-item>-->
          <!--                      <el-dropdown-item>-->
          <!--                        <el-checkbox label="10:00-14:00" />-->
          <!--                      </el-dropdown-item>-->
          <!--                      <el-dropdown-item>-->
          <!--                        <el-checkbox label="14:00-19:00" />-->
          <!--                      </el-dropdown-item>-->
          <!--                      <el-dropdown-item>-->
          <!--                        <el-checkbox label="19:00-24:00" />-->
          <!--                      </el-dropdown-item>-->
          <!--                    </el-checkbox-group>-->
          <!--                  </el-dropdown-menu>-->
          <!--                </el-dropdown>-->
          <!--                &lt;!&ndash;起飞机场&ndash;&gt;-->
          <!--                <el-dropdown>-->
          <!--              <span class="el-dropdown-link">-->
          <!--                起飞机场<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--              </span>-->
          <!--                  <el-dropdown-menu slot="dropdown">-->
          <!--                    <el-checkbox-group v-model="queryParams.takeoffAirport">-->
          <!--                      <el-dropdown-item>-->
          <!--                        <el-checkbox label="大兴机场" />-->
          <!--                      </el-dropdown-item>-->
          <!--                    </el-checkbox-group>-->
          <!--                  </el-dropdown-menu>-->
          <!--                </el-dropdown>-->
          <!--                &lt;!&ndash;航空公司&ndash;&gt;-->
          <!--&lt;!&ndash;                <el-dropdown>&ndash;&gt;-->
          <!--&lt;!&ndash;              <span class="el-dropdown-link">&ndash;&gt;-->
          <!--&lt;!&ndash;                航空公司<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>&ndash;&gt;-->
          <!--&lt;!&ndash;              </span>&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                  <el-dropdown-menu slot="dropdown">&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                    <el-checkbox-group v-model="airlineCom">&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                      <el-dropdown-item>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                        <el-checkbox label="春秋航空" />&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                      </el-dropdown-item>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                    </el-checkbox-group>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;                  </el-dropdown-menu>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;                </el-dropdown>&ndash;&gt;-->
          <!--换乘或直飞-->
          <!--                <el-checkbox v-model="queryParams.straight">直飞</el-checkbox>-->

          <template>
            <el-radio v-model="straight" label="1">直飞</el-radio>
            <el-radio v-model="straight" label="2">换乘</el-radio>
          </template>
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
        </el-form>
        <!--内容显示区域-->
        <el-table v-bind:data="airlineList"
                  border v-if="airlineList"
                  style="font-size: 20px;margin-top: 20px"
                  v-loading="loading"
                  :span-method="objectSpanMethod"
        >
          <el-table-column
            label="航班"
            prop="airline"
            align="center"
          />
          <el-table-column
            label="起飞地点"
            prop="takeoffPlace"
            align="center"
          />
          <el-table-column
            label="到达地点"
            prop="arrivalPlace"
            align="center"
          />
          <el-table-column
            label="起飞日期"
            prop="takeoffDate"
            align="center"
          />
          <el-table-column
            label="起飞时间"
            prop="takeoffTime"
            align="center"
          />
          <el-table-column
            label="到达日期"
            prop="arrivalDate"
            align="center"
          />
          <el-table-column
            label="到达时间"
            prop="arrivalTime"
            align="center"
          />
          <el-table-column
            label="起飞机场"
            prop="takeoffAirport"
            align="center"
          />
          <el-table-column
            label="到达机场"
            prop="arrivalAirport"
            align="center"
          />
          <el-table-column
            label="价格"
            prop="economyPrice"
            align="center"
          />
          <el-table-column
            label="运行状态"
            prop="status"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">正常</span>
              <span v-if="scope.row.status == 1">停运</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="warning"  size="medium" style="font-size: 17px" @click="reserve(scope.row)">
                <span>预订</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "sinTickets",
    data() {
      return {
        //菜单激活颜色
        activeIndex:'2',
        //出发地列表
        PlaceOptions:[
          //国内
          {
            value: '国内',
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
                      value: '阿里',
                      label: '阿里'
                    }, {
                      value: '阿尔山',
                      label: '阿尔山'
                    }, {
                      value: '安庆',
                      label: '安庆'
                    }, {
                      value: '鞍山',
                      label: '鞍山'
                    },{
                      value: '安顺',
                      label: '安顺'
                    },{
                      value: '阿克苏',
                      label: '阿克苏'
                    },{
                      value: '阿拉善左旗',
                      label: '阿拉善左旗'
                    },{
                      value: '阿拉善右旗',
                      label: '阿拉善右旗'
                    }
                    ]
                  },
                  //B
                  {value: 'B',
                    label: 'B',
                    children: [{
                      value: '包头',
                      label: '包头'
                    }, {
                      value: '北海',
                      label: '北海'
                    }, {
                      value: '北京',
                      label: '北京'
                    },{
                      value: '百色',
                      label: '百色'
                    },{
                      value: '保山',
                      label: '保山'
                    },{
                      value: '博乐',
                      label: '博乐'
                    },{
                      value: '毕节',
                      label: '毕节'
                    },{
                      value: '巴彦淖尔',
                      label: '巴彦淖尔'
                    }]
                  },
                  //C
                  {value: 'C',
                    label: 'C',
                    children: [{
                      value: '长治',
                      label: '长治'
                    }, {
                      value: '池州',
                      label: '池州'
                    }, {
                      value: '长春',
                      label: '长春'
                    },{
                      value: '常州',
                      label: '常州'
                    },{
                      value: '昌都',
                      label: '昌都'
                    },{
                      value: '朝阳',
                      label: '朝阳'
                    },{
                      value: '常德',
                      label: '常德'
                    },{
                      value: '长白山',
                      label: '长白山'
                    },{
                      value: '成都',
                      label: '成都'
                    },{
                      value: '重庆',
                      label: '重庆'
                    },{
                      value: '长沙',
                      label: '长沙'
                    },{
                      value: '赤峰',
                      label: '赤峰'
                    }]
                  },
                  //D
                  {value: 'D',
                    label: 'D',
                    children: [{
                      value: '大同',
                      label: '大同'
                    }, {
                      value: '大连',
                      label: '大连'
                    }, {
                      value: '东营',
                      label: '东营'
                    },{
                      value: '大庆',
                      label: '大庆'
                    },{
                      value: '丹东',
                      label: '丹东'
                    },{
                      value: '大理',
                      label: '大理'
                    },{
                      value: '敦煌',
                      label: '敦煌'
                    },{
                      value: '达州',
                      label: '达州'
                    },{
                      value: '稻城',
                      label: '稻城'
                    }]
                  },
                  //E
                  {value: 'E',
                    label: 'E',
                    children: [{
                      value: '恩施',
                      label: '恩施'
                    }, {
                      value: '鄂尔多斯',
                      label: '鄂尔多斯'
                    }, {
                      value: '二连浩特',
                      label: '二连浩特'
                    },{
                      value: '额济纳旗',
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
                      value: '佛山',
                      label: '佛山'
                    }, {
                      value: '福州',
                      label: '福州'
                    }, {
                      value: '阜阳',
                      label: '阜阳'
                    }, {
                      value: '抚远',
                      label: '抚远'
                    }]
                  },
                  //G
                  {
                    value: 'G',
                    label: 'G',
                    children: [{
                      value: '贵阳',
                      label: '贵阳'
                    }, {
                      value: '桂林',
                      label: '桂林'
                    }, {
                      value: '广州',
                      label: '广州'
                    }, {
                      value: '广元',
                      label: '广元'
                    }, {
                      value: '格尔木',
                      label: '格尔木'
                    }, {
                      value: '赣州',
                      label: '赣州'
                    }, {
                      value: '固原',
                      label: '固原'
                    }]
                  },
                  //H
                  {
                    value: 'H',
                    label: 'H',
                    children: [{
                      value: '哈密',
                      label: '哈密'
                    }, {
                      value: '呼和浩特',
                      label: '呼和浩特'
                    }, {
                      value: '黑河',
                      label: '黑河'
                    }, {
                      value: '海拉尔',
                      label: '海拉尔'
                    }, {
                      value: '哈尔滨',
                      label: '哈尔滨'
                    }, {
                      value: '海口',
                      label: '海口'
                    }, {
                      value: '黄山',
                      label: '黄山'
                    }, {
                      value: '杭州',
                      label: '杭州'
                    }, {
                      value: '邯郸',
                      label: '邯郸'
                    }, {
                      value: '合肥',
                      label: '合肥'
                    }, {
                      value: '黄龙',
                      label: '黄龙'
                    }, {
                      value: '汉中',
                      label: '汉中'
                    }, {
                      value: '和田',
                      label: '和田'
                    }, {
                      value: '淮安',
                      label: '淮安'
                    }]
                  },
                  //J
                  {
                    value: 'J',
                    label: 'J',
                    children: [{
                      value: '鸡西',
                      label: '鸡西'
                    }, {
                      value: '晋江',
                      label: '晋江'
                    }, {
                      value: '锦州',
                      label: '锦州'
                    }, {
                      value: '景德镇',
                      label: '景德镇'
                    }, {
                      value: '嘉峪关',
                      label: '嘉峪关'
                    }, {
                      value: '井冈山',
                      label: '井冈山'
                    }, {
                      value: '济宁',
                      label: '济宁'
                    }, {
                      value: '九江',
                      label: '九江'
                    }, {
                      value: '佳木斯',
                      label: '佳木斯'
                    }, {
                      value: '济南',
                      label: '济南'
                    }, {
                      value: '加格达奇',
                      label: '加格达奇'
                    }, {
                      value: '金昌',
                      label: '金昌'
                    }, {
                      value: '揭阳',
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
                      value: '喀什',
                      label: '喀什'
                    }, {
                      value: '昆明',
                      label: '昆明'
                    }, {
                      value: '康定',
                      label: '康定'
                    }, {
                      value: '克拉玛依',
                      label: '克拉玛依'
                    }, {
                      value: '库尔勒',
                      label: '库尔勒'
                    }, {
                      value: '库车',
                      label: '库车'
                    }, {
                      value: '喀纳斯',
                      label: '喀纳斯'
                    }, {
                      value: '凯里',
                      label: '凯里'
                    }]
                  },
                  //L
                  {
                    value: 'L',
                    label: 'L',
                    children: [{
                      value: '兰州',
                      label: '兰州'
                    }, {
                      value: '洛阳',
                      label: '洛阳'
                    }, {
                      value: '丽江',
                      label: '丽江'
                    }, {
                      value: '荔波',
                      label: '荔波'
                    }, {
                      value: '林芝',
                      label: '林芝'
                    }, {
                      value: '柳州',
                      label: '柳州'
                    }, {
                      value: '泸州',
                      label: '泸州'
                    }, {
                      value: '连云港',
                      label: '连云港'
                    }, {
                      value: '黎平',
                      label: '黎平'
                    }, {
                      value: '连城',
                      label: '连城'
                    }, {
                      value: '拉萨',
                      label: '拉萨'
                    }, {
                      value: '临沂',
                      label: '临沂'
                    }, {
                      value: '临沧',
                      label: '临沧'
                    }, {
                      value: '吕梁',
                      label: '吕梁'
                    }]
                  },
                  //M
                  {
                    value: 'M',
                    label: 'M',
                    children: [{
                      value: '芒市',
                      label: '芒市'
                    }, {
                      value: '牡丹江',
                      label: '牡丹江'
                    }, {
                      value: '满洲里',
                      label: '满洲里'
                    }, {
                      value: '绵阳',
                      label: '绵阳'
                    }, {
                      value: '梅县',
                      label: '梅县'
                    }, {
                      value: '漠河',
                      label: '漠河'
                    }]
                  },
                  //N
                  {
                    value: 'N',
                    label: 'N',
                    children: [{
                      value: '南京',
                      label: '南京'
                    }, {
                      value: '南充',
                      label: '南充'
                    }, {
                      value: '南宁',
                      label: '南宁'
                    }, {
                      value: '南阳',
                      label: '南阳'
                    }, {
                      value: '南通',
                      label: '南通'
                    }, {
                      value: '南昌',
                      label: '南昌'
                    }, {
                      value: '那拉提',
                      label: '那拉提'
                    }, {
                      value: '宁波',
                      label: '宁波'
                    }]
                  },
                  //P
                  {
                    value: 'P',
                    label: 'P',
                    children: [{
                      value: '攀枝花',
                      label: '攀枝花'
                    }, {
                      value: '普洱',
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
                      value: '衢州',
                      label: '衢州'
                    }, {
                      value: '黔江',
                      label: '黔江'
                    }, {
                      value: '秦皇岛',
                      label: '秦皇岛'
                    }, {
                      value: '庆阳',
                      label: '庆阳'
                    }, {
                      value: '且末',
                      label: '且末'
                    }, {
                      value: '齐齐哈尔',
                      label: '齐齐哈尔'
                    }, {
                      value: '青岛',
                      label: '青岛'
                    }, {
                      value: '祁连',
                      label: '祁连'
                    }]
                  },
                  //R
                  {
                    value: 'R',
                    label: 'R',
                    children: [{
                      value: '日喀则',
                      label: '日喀则'
                    }]
                  },
                  //S
                  {
                    value: 'S',
                    label: 'S',
                    children: [{
                      value: '深圳',
                      label: '深圳'
                    }, {
                      value: '石家庄',
                      label: '石家庄'
                    }, {
                      value: '三亚',
                      label: '三亚'
                    }, {
                      value: '沈阳',
                      label: '沈阳'
                    }, {
                      value: '上海',
                      label: '上海'
                    }, {
                      value: '神农架',
                      label: '神农架'
                    }]
                  },
                  //T
                  {
                    value: 'T',
                    label: 'T',
                    children: [{
                      value: '唐山',
                      label: '唐山'
                    }, {
                      value: '铜仁',
                      label: '铜仁'
                    }, {
                      value: '塔城',
                      label: '塔城'
                    }, {
                      value: '腾冲',
                      label: '腾冲'
                    }, {
                      value: '台州',
                      label: '台州'
                    }, {
                      value: '天水',
                      label: '天水'
                    }, {
                      value: '天津',
                      label: '天津'
                    }, {
                      value: '通辽',
                      label: '通辽'
                    }, {
                      value: '吐鲁番',
                      label: '吐鲁番'
                    }, {
                      value: '太原',
                      label: '太原'
                    }, {
                      value: '泰州',
                      label: '泰州'
                    }]
                  },
                  //W
                  {
                    value: 'W',
                    label: 'W',
                    children: [{
                      value: '威海',
                      label: '威海'
                    }, {
                      value: '武汉',
                      label: '武汉'
                    }, {
                      value: '梧州',
                      label: '梧州'
                    }, {
                      value: '文山',
                      label: '文山'
                    }, {
                      value: '无锡',
                      label: '无锡'
                    }, {
                      value: '潍坊',
                      label: '潍坊'
                    }, {
                      value: '武夷山',
                      label: '武夷山'
                    }, {
                      value: '乌兰浩特',
                      label: '乌兰浩特'
                    }, {
                      value: '温州',
                      label: '温州'
                    }, {
                      value: '乌鲁木齐',
                      label: '乌鲁木齐'
                    }, {
                      value: '万州',
                      label: '万州'
                    }, {
                      value: '乌海',
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
                      value: '兴义',
                      label: '兴义'
                    }, {
                      value: '西昌',
                      label: '西昌'
                    }, {
                      value: '厦门',
                      label: '厦门'
                    }, {
                      value: '香格里拉',
                      label: '香格里拉'
                    }, {
                      value: '西安',
                      label: '西安'
                    }, {
                      value: '西宁',
                      label: '西宁'
                    }, {
                      value: '襄阳',
                      label: '襄阳'
                    }, {
                      value: '锡林浩特',
                      label: '锡林浩特'
                    }, {
                      value: '西双版纳',
                      label: '西双版纳'
                    }, {
                      value: '徐州',
                      label: '徐州'
                    }, {
                      value: '香港',
                      label: '香港'
                    }]
                  },
                  //Y
                  {
                    value: 'Y',
                    label: 'Y',
                    children: [{
                      value: '义乌',
                      label: '义乌'
                    }, {
                      value: '永州',
                      label: '永州'
                    }, {
                      value: '榆林',
                      label: '榆林'
                    }, {
                      value: '扬州',
                      label: '扬州'
                    }, {
                      value: '延安',
                      label: '延安'
                    }, {
                      value: '运城',
                      label: '运城'
                    }, {
                      value: '烟台',
                      label: '烟台'
                    }, {
                      value: '银川',
                      label: '银川'
                    }, {
                      value: '宜昌',
                      label: '宜昌'
                    }, {
                      value: '宜宾',
                      label: '宜宾'
                    }, {
                      value: '宜春',
                      label: '宜春'
                    }, {
                      value: '盐城',
                      label: '盐城'
                    }, {
                      value: '延吉',
                      label: '延吉'
                    }, {
                      value: '玉树',
                      label: '玉树'
                    }, {
                      value: '伊宁',
                      label: '伊宁'
                    }, {
                      value: '伊春',
                      label: '伊春'
                    }]
                  },
                  //Z
                  {
                    value: 'Z',
                    label: 'Z',
                    children: [{
                      value: '珠海',
                      label: '珠海'
                    }, {
                      value: '昭通',
                      label: '昭通'
                    }, {
                      value: '张家界',
                      label: '张家界'
                    }, {
                      value: '舟山',
                      label: '舟山'
                    }, {
                      value: '郑州',
                      label: '郑州'
                    }, {
                      value: '中卫',
                      label: '中卫'
                    }, {
                      value: '芷江',
                      label: '芷江'
                    }, {
                      value: '湛江',
                      label: '湛江'
                    }, {
                      value: '遵义',
                      label: '遵义'
                    }, {
                      value: '张掖',
                      label: '张掖'
                    }, {
                      value: '张家口',
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
                    value: '香港',
                    label: '香港'
                  }, {
                    value: '新加坡',
                    label: '新加坡'
                  }, {
                    value: '首尔',
                    label: '首尔'
                  }, {
                    value: '曼谷',
                    label: '曼谷'
                  },{
                    value: '吉隆坡',
                    label: '吉隆坡'
                  },{
                    value: '东京',
                    label: '东京'
                  },{
                    value: '中国台北',
                    label: '中国台北'
                  },{
                    value: '悉尼',
                    label: '悉尼'
                  },
                  {
                    value: '澳门',
                    label: '澳门'
                  }, {
                    value: '普吉',
                    label: '普吉'
                  }, {
                    value: '墨尔本',
                    label: '墨尔本'
                  },{
                    value: '胡志明市',
                    label: '胡志明市'
                  },{
                    value: '大阪',
                    label: '大阪'
                  },{
                    value: '巴厘岛',
                    label: '巴厘岛'
                  },{
                    value: '马尼拉',
                    label: '马尼拉'
                  },{
                    value: '河内',
                    label: '河内'
                  },{
                    value: '加德满都',
                    label: '加德满都'
                  }, {
                    value: '金边',
                    label: '金边'
                  }, {
                    value: '雅加达',
                    label: '雅加达'
                  },{
                    value: '马累',
                    label: '马累'
                  },{
                    value: '暹粒',
                    label: '暹粒'
                  },{
                    value: '迪拜',
                    label: '迪拜'
                  },{
                    value: '釜山',
                    label: '釜山'
                  },{
                    value: '名古屋',
                    label: '名古屋'
                  },{
                    value: '奥克兰',
                    label: '奥克兰'
                  },{
                    value: '布里斯班',
                    label: '布里斯班'
                  },{
                    value: '槟城',
                    label: '槟城'
                  },{
                    value: '中国高雄',
                    label: '中国高雄'
                  },{
                    value: '新德里',
                    label: '新德里'
                  }, {
                    value: '济州岛',
                    label: '济州岛'
                  }, {
                    value: '韩国',
                    label: '韩国'
                  },{
                    value: '泰国',
                    label: '泰国'
                  },{
                    value: '马来西亚',
                    label: '马来西亚'
                  },{
                    value: '日本',
                    label: '日本'
                  },{
                    value: '澳大利亚',
                    label: '澳大利亚'
                  },{
                    value: '越南',
                    label: '越南'
                  },{
                    value: '印度尼西亚',
                    label: '印度尼西亚'
                  },{
                    value: '菲律宾',
                    label: '菲律宾'
                  }, {
                    value: '尼泊尔',
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
                    value: '纽约',
                    label: '纽约'
                  }, {
                    value: '洛杉矶',
                    label: '洛杉矶'
                  }, {
                    value: '多伦多',
                    label: '多伦多'
                  }, {
                    value: '温哥华',
                    label: '温哥华'
                  }, {
                    value: '旧金山',
                    label: '旧金山'
                  }, {
                    value: '芝加哥',
                    label: '芝加哥'
                  }, {
                    value: '华盛顿',
                    label: '华盛顿'
                  }, {
                    value: '西雅图',
                    label: '西雅图'
                  }, {
                    value: '波士顿',
                    label: '波士顿'
                  }, {
                    value: '底特律',
                    label: '底特律'
                  }, {
                    value: '亚特兰大',
                    label: '亚特兰大'
                  }, {
                    value: '蒙特利尔',
                    label: '蒙特利尔'
                  },
                  {
                    value: '休斯顿',
                    label: '休斯顿'
                  }, {
                    value: '火奴鲁鲁',
                    label: '火奴鲁鲁'
                  }, {
                    value: '达拉斯',
                    label: '达拉斯'
                  }, {
                    value: '拉斯维加斯',
                    label: '拉斯维加斯'
                  }, {
                    value: '费城',
                    label: '费城'
                  }, {
                    value: '圣保罗',
                    label: '圣保罗'
                  }, {
                    value: '明尼阿波利斯',
                    label: '明尼阿波利斯'
                  }, {
                    value: '渥太华',
                    label: '渥太华'
                  }, {
                    value: '凤凰城',
                    label: '凤凰城'
                  }, {
                    value: '墨西哥城',
                    label: '墨西哥城'
                  }, {
                    value: '迈阿密',
                    label: '迈阿密'
                  }, {
                    value: '丹佛',
                    label: '丹佛'
                  }, {
                    value: '奥兰多',
                    label: '奥兰多'
                  }, {
                    value: '卡尔加里',
                    label: '卡尔加里'
                  }, {
                    value: '埃德蒙顿',
                    label: '埃德蒙顿'
                  }, {
                    value: '布宜诺斯艾利',
                    label: '布宜诺斯艾利'
                  }, {
                    value: '里约热内卢',
                    label: '里约热内卢'
                  }, {
                    value: '匹兹堡',
                    label: '匹兹堡'
                  }
                ]
              },
              //欧洲
              {
                value: 'ouzhou',
                label: '欧洲',
                children: [
                  {
                    value: '伦敦',
                    label: '伦敦'
                  }, {
                    value: '巴黎',
                    label: '巴黎'
                  }, {
                    value: '法兰克福',
                    label: '法兰克福'
                  }, {
                    value: '莫斯科',
                    label: '莫斯科'
                  }, {
                    value: '阿姆斯特丹',
                    label: '阿姆斯特丹'
                  }, {
                    value: '罗马',
                    label: '罗马'
                  }, {
                    value: '米兰',
                    label: '米兰'
                  }, {
                    value: '马德里',
                    label: '马德里'
                  },{
                    value: '慕尼黑',
                    label: '慕尼黑'
                  },{
                    value: '柏林',
                    label: '柏林'
                  },{
                    value: '斯德哥尔摩',
                    label: '斯德哥尔摩'
                  },{
                    value: '伊斯坦布尔',
                    label: '伊斯坦布尔'
                  },{
                    value: '伯明翰',
                    label: '伯明翰'
                  },{
                    value: '巴塞罗那',
                    label: '巴塞罗那'
                  },{
                    value: '雅典',
                    label: '雅典'
                  },{
                    value: '哥本哈根',
                    label: '哥本哈根'
                  },{
                    value: '苏黎世',
                    label: '苏黎世'
                  },{
                    value: '布鲁塞尔',
                    label: '布鲁塞尔'
                  },{
                    value: '赫尔辛基',
                    label: '赫尔辛基'
                  },{
                    value: '爱丁堡',
                    label: '爱丁堡'
                  },{
                    value: '维也纳',
                    label: '维也纳'
                  },{
                    value: '格拉斯哥',
                    label: '格拉斯哥'
                  },{
                    value: '日内瓦',
                    label: '日内瓦'
                  },{
                    value: '圣彼得堡',
                    label: '圣彼得堡'
                  },{
                    value: '都柏林',
                    label: '都柏林'
                  },{
                    value: '汉堡',
                    label: '汉堡'
                  },{
                    value: '杜塞尔多夫',
                    label: '杜塞尔多夫'
                  },
                  {
                    value: '布拉格',
                    label: '布拉格'
                  }, {
                    value: '布达佩斯',
                    label: '布达佩斯'
                  }, {
                    value: '基辅',
                    label: '基辅'
                  }
                ]
              },
              //非洲
              {
                value: 'feizhou',
                label: '非洲',
                children: [
                  {
                    value: '开罗',
                    label: '开罗'
                  }, {
                    value: '约翰内斯堡',
                    label: '约翰内斯堡'
                  }, {
                    value: '内罗毕',
                    label: '内罗毕'
                  }, {
                    value: '开普敦',
                    label: '开普敦'
                  }, {
                    value: '毛里求斯',
                    label: '毛里求斯'
                  }, {
                    value: '拉各斯',
                    label: '拉各斯'
                  }, {
                    value: '喀土穆',
                    label: '喀土穆'
                  }, {
                    value: '亚的斯亚贝巴',
                    label: '亚的斯亚贝巴'
                  }, {
                    value: '阿克拉',
                    label: '阿克拉'
                  }, {
                    value: '达累斯萨拉姆',
                    label: '达累斯萨拉姆'
                  }, {
                    value: '塞舌尔',
                    label: '塞舌尔'
                  }, {
                    value: '阿尔及尔',
                    label: '阿尔及尔'
                  }, {
                    value: '的黎波里',
                    label: '的黎波里'
                  }, {
                    value: '阿布贾',
                    label: '阿布贾'
                  }, {
                    value: '卡萨布兰卡',
                    label: '卡萨布兰卡'
                  }, {
                    value: '突尼斯',
                    label: '突尼斯'
                  }
                ]
              },
            ]
          },
        ],
        // //行程类别单选框
        // radio:1,
        //返回航班列表
        airlineList:[],
        // // 遮罩层
        loading: false,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 查询参数
        queryParams: {
          // page: 1,
          // limit: 10,
          //出发地
          takeoffPlace:'济南',
          //目的地
          arrivalPlace:'上海',
          //起飞时间
          takeoffDate:'2021-09-18',
          // //起飞机场
          // takeoffAirport:[],
        },
        //换乘或直飞
        straight:"2",
        // //用户id
        // user_id:null,
      };
    },
    created() {
      this.handleQuery();
      // this.getInfo();
    },
    methods: {
      /** 搜索按钮操作 */
      async handleQuery() {
        // this.queryParams.page = 1;
        if(this.straight == "1"){
          this.getList();
        }else {
          const {data:res} = await this.$http.post('queryTransfer', this.queryParams)
          var temp_res_string = res.toString()
          temp_res_string = temp_res_string.substring(0,temp_res_string.length-2);
          temp_res_string = temp_res_string+"]"
          console.log(temp_res_string)
          this.airlineList = JSON.parse(temp_res_string);
          console.log(this.airlineList)
        }
      },

      async reserve(row){
        const res01 = await this.$http.post('queryTransferB',this.queryParams)
        const Bstr = res01.data
        console.log(Bstr)
        const res02 = await this.$http.post('queryAirlineById',{id:Bstr})
        console.log(res02.data.id)
        this.$router.push({
          path:'/changeInfo',
          query:{
            ecomodMessage:row.ecomodMessage,
            busmodMessage:row.busmodMessage,
            ecoleftTick:row.ecoleftTick,
            busleftTick:row.busleftTick,
            economyPriceA:row.economyPrice,
            businessPriceA:row.businessPrice,
            idA:row.id,
            takeoffPlaceA:row.takeoffPlace,
            arrivalPlaceA:row.arrivalPlace,
            takeoffDateA:row.takeoffDate,
            takeoffTimeA:row.takeoffTime,
            arrivalDateA:row.arrivalDate,
            arrivalTimeA:row.arrivalTime,
            takeoffAirportA:row.takeoffAirport,
            arrivalAirportA:row.arrivalAirport,
            user_id:this.$route.query.user_id,
            economyPriceB:res02.data.economyPrice,
            businessPriceB:res02.data.businessPrice,
            idB:res02.data.id,
            takeoffPlaceB:res02.data.takeoffPlace,
            arrivalPlaceB:res02.data.arrivalPlace,
            takeoffDateB:res02.data.takeoffDate,
            takeoffTimeB:res02.data.takeoffTime,
            arrivalDateB:res02.data.arrivalDate,
            arrivalTimeB:res02.data.arrivalTime,
            takeoffAirportB:res02.data.takeoffAirport,
            arrivalAirportB:res02.data.arrivalAirport,
          }
        })

      },
      toOrder(){
        this.$router.push('/order')
      },
      /**两行合并为一行**/
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 11) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      logout(){
        window.sessionStorage.setItem("user_id",null);
        this.$router.push('/login')
      }
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
    height: 100px !important;
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
  .a:link{
    color: #ffffff;
  }
  .a:hover{
    color: #ffd04b;
  }
  .a:visited{
    color: #ffffff;
  }
  /*.el-footer{*/
  /*  width: 100%;*/
  /*  line-height: 100px;*/
  /*  background-color: #373d41;*/
  /*  color: #eeeeee;*/
  /*}*/
</style>
