<template>
  <div class="PersonalCar">
    <div class="PersonalCarBox">
      <div class="PerCarLi">
        <div class="PerCarLiFon">
          竞拍资源
        </div>
        <span>实时精准推送以收个人车源信息</span>
        <div class="PerCarLibtn">
          <span>我的订阅</span>
          <span>竞拍收车介绍</span>
        </div>
      </div>

      <div class="PerCarSeTop">
        <div class="PerCarSeTopLe">
          <ul>
            <li v-for="(item,r) in PerCarState"  class="PerCarSeTopLeLi" :class="PerSeTopLeNum==r?PerSeTopLeCli:''" @click="PerSeTopLeNum=r">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="PerCarSele">
        <!--品牌筛选-->
        <div>
          <span>品牌筛选:</span>
          <el-select class="checkSele" size="mini" v-model="PerScreen" placeholder="请选择">
            <el-option-group
              v-for="group in PerScreenData"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <!--车牌所在地-->
        <div>
          <span>车牌所在地:</span>
          <el-select class="checkSele" size="mini" v-model="PerLocation" placeholder="请选择车牌所在地">
            <el-option
              v-for="item in PerLocationData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--公里数-->
        <div>
          <span>公里数:</span>
          <el-input class="PriceFont" size="mini" v-model="PerMileageStart" ></el-input>&nbsp;-
          <el-input class="PriceFont" size="mini" v-model="PerMileageEnd" ></el-input>
        </div>
        <!--上牌日期-->
        <div >
          <span>上牌日期:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="PerPlayTime"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!--线索产生时间-->
        <div>
          <span>线索产生时间:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="PerProduce"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!--线索来源-->
        <div v-if="PerSeTopLeNum==0">
          <span>线索来源:</span>
          <el-select class="checkSele" size="mini" v-model="PerSource" placeholder="请选择线索来源">
            <el-option
              v-for="item in PerSourceData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--跟进状态-->
        <div v-if="PerSeTopLeNum==0">
          <span>跟进状态:</span>
          <el-select class="checkSele" size="mini" v-model="PerState" placeholder="请选择跟进状态">
            <el-option
              v-for="item in PerStateData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button  type="warning" v-if="PerSeTopLeNum==1" style="margin-bottom: 20px">查找</el-button>
      </div>

      <div class="Line">

      </div>
  <!--    <div class="WinSort">
        <div class="PerCarDataNum">
          &lt;!&ndash;<p>当前金豆数量: <strong>0.00</strong>个 <strong>去充值金豆</strong></p>&ndash;&gt;
        </div>
      </div>-->

      <div class="PerCarTable">
        <el-table
          :data="dataList"
        >
          <el-table-column
            prop="id"
            label="编号"
            width="50">
          </el-table-column>
          <el-table-column
            label="来源"
            width="150">
          </el-table-column>
          <el-table-column
            label="联系人"
            prop="user.phoneNum"
            width="150">
          </el-table-column>
          <el-table-column
            label="车型名称"
            prop="brand.brandName"
            width="250">
          </el-table-column>

          <el-table-column
            label="上牌时间"
            width="150">
            <template slot-scope="scope">
              {{new Date(scope.row.brandDate)|moment('YYYY-MM')}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>


        </el-table>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'PersonalCar',
  data() {
    return {
      // 我的线索 公共线索
      PerCarState: ['个人线索', '公共线索'],
      PerSeTopLeNum: '1',
      PerSeTopLeCli: 'SeTopLeCli',

      // from数据
      PerScreen: '', // 品牌筛选
      PerLocation: '', // 车辆所在地
      PerMileageStart: '', // 最低公里数
      PerMileageEnd: '', // 最高公里数
      PerPlayTime: '', // 上牌日期
      PerProduce: '', // 线索产生时间
      PerSource: '', // 线索来源
      PerState: '', // 跟进状态

      PerScreenData: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海',
        }, {
          value: 'Beijing',
          label: '北京',
        }],
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都',
        }, {
          value: 'Shenzhen',
          label: '深圳',
        }, {
          value: 'Guangzhou',
          label: '广州',
        }, {
          value: 'Dalian',
          label: '大连',
        }],
      }],
      PerLocationData: [
        { value: '北京' },
        { value: '上海' },
        { value: '南宁' },
      ],
      PerSourceData: [
        { value: '全部线索' },
        { value: '微店线索' },
        { value: '订阅线索' },
        { value: '公共线索' },
      ],
      PerStateData: [
        { value: '全部' },
        { value: '未联系' },
        { value: '查看点化' },
        { value: '约看车' },
        { value: '已看车' },
        { value: '战败' },
        { value: '收购' },
      ],
      limit: 20,
      page: 1,
      dataList: [],
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$api.post('/c/sell/getSellList', {
        limit: this.limit,
        page: this.page,
      });
      const { success, data } = res.data;
      if (success) {
        this.dataList = data.rows;
        this.total = data.count;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .PersonalCar{
    margin-top: 64px;
    width: 100%;
  }
  .PersonalCarBox{
    width: 1140px;
    margin: 0 auto;
  }

  .PerCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .PerCarLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .PerCarLi>span{
    font-size: 12px;
    color: #666;
    position: absolute;
    left: 90px;
  }
  .PerCarLibtn{
    height: 50px;
    width: 200px;
    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .PerCarLibtn>span{
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 14px;
    color: #fff;
    background-color: $ora;
    text-align: center;
    cursor:pointer;
  }
  .PerCarLibtn>span:hover{
    background-color: #ff9d37;
    color: #fff;
  }

  .PerCarSeTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .PerCarSeTopLe{
    width: 360px;
    height: 40px;
    float: left;
  }
  .PerCarSeTopLe ul{
    width: 366px;
    height: 40px;
  }
  .PerCarSeTopLeLi{
    width: 120px;
    height: 40px;
    float: left;
    background-color: #f9fafa;
    border: 1px solid #e3e3e3;
    border-right: none;
    text-align: center;
    line-height: 40px;
    color: #333;
    font-size: 12px;
    z-index: 1;
  }
  .PerCarSeTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }
  .SeletBtn{
    background-color: $ora;
    text-align: center;
    color: #fff;
    width: 76px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 2px;
  }

  .PerCarSele{
    margin-top: 10px;
    width: 1140px;
    /*height:80px;*/
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .PerCarSele>div{
    width: 266px;
    height: 36px;

  }
  .PerCarSele span{
    width: 75px;
    height: 36px;
    display: block;
    color: #666;
    font-size: 12px;
    text-align: right;
    line-height: 36px;
    float: left;
    margin-right: 10px;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }
  .PriceFont{
    width: 72px;
    height: 36px;
    line-height: 36px;
  }
  .SeletBtn{
    background-color: $ora;
    text-align: center;
    color: #fff;
    width: 76px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
  }
  .SeletBtn:hover{
    background-color: #f9912e;
  }
  .CarData{
    width: 1140px;
    color: #666;
    font-size: 12px;
    line-height: 26px;
  }

  .Line{
    height: 10px;
    background-color: #f9fafa;
  }

  .WinSort{
    width: 1140px;
    height: 60px;
  }
  .WinSort span{
    color: #666;
    font-size: 12px;
    text-align: right;
    line-height: 36px;
    float: left;
    margin-right: 10px;
  }
  .PerCarDataNum{
    width: 200px;
    height: 60px;
    line-height:60px;
    color: #666;
    font-size: 12px;
    position: relative;
    top: 5px;
    float: right;
  }
  .PerCarDataNum p{
    display: inline-block;
    width: 200px;
    height: 26px;
    line-height: 26px;
    text-align: right;
  }
  .PerCarDataNum strong{
    font-weight: 400;
    color: $ora;
    line-height: 26px;
  }

  .PerCarTable {
    width: 1140px;
  }
  .CarTableTit{
    width: 100%;
    height: 40px;
    background-color: #F8F8F8;
    border: 1px solid #eee;
  }
  .CarTableTit>div{
    float: left;
    border-right: 1px solid #eee;
    color: #666;
    font-size: 12px;
    margin-left: 14px;
    line-height: 40px;
  }
  .PerNewTime{
    width: 100px;
  }
  .PerClueNew{
    width: 100px;
  }
  .PerContacts{
    width: 100px;
  }
  .PerCarName{
    width: 217px;
  }
  .PerCarOther{
    width: 185px;
   }
  .PerCuIphone{
    width: 100px;
  }
  .PerState{
    width: 100px;
  }
  .PerAction{
    width: 119px;
  }
 ::v-deep th{
    background: #F8F8F8;
  }


</style>
