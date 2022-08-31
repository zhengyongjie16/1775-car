<template>
  <div class="MyBusiness">
    <van-nav-bar
      title="商机"
      left-text="返回"
      right-text="筛选"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="sxBox=true"
    />
    <div class="MyBusinessBox">


            <div class="busBox" v-for="item of listData">

              <h1>
                <span>商机ID:{{item.id}}</span>
                <span>{{item.vehicleInfo.title}}</span>
              </h1>
              <div class="GuestInfor">
                <a :href="`tel:${item.user.phoneNum}`" @click.stop="doHandle">用户电话:{{item.user.phoneNum}}</a>
              </div>
              <p>访问时间:{{new Date(parseInt(item.visitTime))|moment('YYYY-MM-DD HH:mm')}}</p>
              <p v-if="item.handleTime">{{new Date(parseInt(item.handleTime))|moment('YYYY-MM-DD hh:mm')  }}</p>

              <!--</div>-->
              <div class="MyBusoper" style=" border-right: none;">
                <div class="MyBuTableFont">
                  <!--<span @click="distribution">分配归属</span><br>-->
                  <!--<span @click="BusDe(item)">商机详细</span><br>-->
                  <!--<span @click="ReTa">申诉</span>-->
                </div>
              </div>
            </div>
      <div v-if="listData.length==0"  class="CarDataLidataNull">
        <h1>老板您好，暂时没有查询到！</h1>
        <p>您可以 <strong @click="$router.replace({name:'AddCar'})">添加车源</strong>，促进销售</p>
      </div>


      <!--操作-->

      <!--分配归属-->
      <div class="BusDistri" :style="BusDistriDis">
        <div class="BusClose" ><i @click="Disnone" class="el-icon-close" ></i></div>

        <div class="BusDistribox">
          <div class="onCarboxTop">
            分配归属
          </div>
          <el-input class="BusDisSelet" size="small"  v-model="BusDisSelet"><i @click="BusSelect" slot="prefix" class="el-icon-search clickSele"></i></el-input>
          <div class="BusDistriTab">
            <div class="StriTabTop">
              <div></div>
              <div>
                <p style="margin-left: 15px;">销售</p>
              </div>
              <div>
                <p style="margin-left: 15px;">已经分配线索</p>
              </div>
            </div>
            <div class="StriTabTop">
              <div>
                <el-radio v-model="BusRadio"></el-radio>
              </div>
              <div>
                <p style="margin-left: 15px;">已经分配线索</p>
              </div>
              <div>
                <p style="margin-left: 15px;">已经分配线索</p>
              </div>
            </div>

          </div>

          <div class="StateBtn">
            <div class="StateBtnconfirm" @click="BusDistriOk">确定</div>
            <div class="StateBtnCancel"  @click="Disnone">取消</div>
          </div>
        </div>

      </div>
      <!--商机详情-->
      <div class="BusinessDetailed" :style="BusDeDis">
        <div class="BusDeBox">
          <div class="BusDeTop">
            商机详细
          </div>
          <div class="BusDeCon">
            <div class="BusDeConTu">
              <img :src="BusDeDetail.vehicleInfo.carPic" alt="">
            </div>
            <div class="BusDeConFon">
              <p>咨询车辆：{{BusDeDetail.vehicleInfo.title}}</p>
              <p>上牌时间：{{new Date(parseInt(BusDeDetail.vehicleInfo.brandDate)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
              <p>行驶里程：{{BusDeDetail.vehicleInfo.mileage}}</p>
            </div>
          </div>
          <div class="BusDeConTab">
            <div>
              <div>
                <div>
                  <p>电话号码</p>
                </div>
                <div><p>{{BusDeDetail.client.phoneNum}}</p></div>
              </div>
              <div>
                <div>
                  <p>商机产生时间</p>
                </div>
                <div>
                  <p>{{new Date(parseInt(BusDeDetail.visitTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <p>商机来源</p>
                </div>
                <div><p>询价</p></div>
              </div>
              <div>
                <div>
                  <p>商机类型</p>
                </div>
                <div>
                  <p>	非电话</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <p>商机状态</p>
                </div>
                <div><p>已处理</p></div>
              </div>
              <div>
                <div>
                  <p>处理时间</p>
                </div>
                <div>
                  <p>	{{new Date(parseInt(BusDeDetail.handleTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
                </div>
              </div>
            </div>
            <!--<div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<p>是否扣费</p>-->
            <!--</div>-->
            <!--<div><p>否</p></div>-->
            <!--</div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<p>未知扣费</p>-->
            <!--</div>-->
            <!--<div>-->
            <!--<p>	自然流量</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<p>推广方案</p>-->
            <!--</div>-->
            <!--<div><p>自然流量</p></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<div>-->
            <!--<p>客户留言</p>-->
            <!--</div>-->
            <!--<div><p></p></div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <div class="BusDeBtn" @click="BusDeOk">
            确定
          </div>
        </div>
      </div>
      <!--申述-->
      <div class="Representations" :style="ReTaDis">
        <div class="ReTaClose"><i class="el-icon-close" @click="Disnone"> </i></div>
        <div class="ReTaBox">
          <div class="ReTaBoxFont">商机推广来源“自然流量”不符合申诉条件</div>
          <div class="ReTaBoxBtn" @click="ReTaOk">
            我知道了
          </div>
        </div>

      </div>
    </div>
    <el-pagination class="block"
      :current-page.sync="paging"
      layout="prev, pager, next, jumper"
      @current-change="currentChange"
      @size-change="sizeChange"
      :page-size = pageSize
      :total="maxpaging">
    </el-pagination>
    <div class="WinM" :style="Dis"  @click="Disnone"></div>

    <van-popup v-model="sxBox" position="right" :style="{width:'80vw',height:'100%'}">
      <!--筛选条件-->
      <div class="MyBusinessSele">
        <!--快速查询 FastSelect-->
        <div >
          <span>快速查询:</span>
          <el-input style="width: 130px" class="checkSele" size="mini" v-model="FastSelect" placeholder="电话号码/商机ID"></el-input>
          <div class="MyBusSele" @click="MyBusSele"><i class="el-icon-search"></i></div>
        </div>
        <!--咨询车源 InquiryCar-->
        <div>
          <span>咨询车源:</span>
          <el-select class="checkSele" size="mini" v-model="InquiryCar" placeholder="选择车型">
            <el-option
              v-for="item in InquiryCarData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--商机类型 OpporClass-->
        <div>
          <span>商机类型:</span>
          <el-select class="checkSele" size="mini" v-model="OpporClass" placeholder="不限">
            <el-option
              v-for="item in OpporClassData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--商机来源 OpporFrom-->
        <div>
          <span>商机来源:</span>
          <el-select class="checkSele" size="mini" v-model="OpporFrom" placeholder="不限">
            <el-option
              v-for="item in OpporFromData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--产生时间 CustToTime-->
        <div>
          <span>产生时间:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="CustToTime"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!--处理时间 CustHanTime-->
        <div v-if="MyBusinessTopLeNum==0">
          <span>处理时间:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="CustHanTime"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!--跟进销售 FollowSale-->
        <div>
          <span>跟进销售:</span>
          <el-select class="checkSele" size="mini" v-model="FollowSale" placeholder="请选择跟进销售">
            <el-option
              v-for="item in FollowSaleData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--推广来源 ExtenFrom-->
        <div>
          <span>推广来源:</span>
          <el-select class="checkSele" size="mini" v-model="ExtenFrom" placeholder="选择推广来源">
            <el-option
              v-for="item in ExtenFromData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--是否欠费 IfArrears-->
        <div v-if="false">
          <span>是否欠费:</span>
          <el-select class="checkSele" size="mini" v-model="IfArrears" placeholder="选择咨费情况">
            <el-option
              v-for="item in IfArrearsData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>
        <el-button size="small" style="display: inline-block" @click="getList">查询</el-button>
      </div>

    </van-popup>

  </div>
</template>

<script>
export default {
  name: 'MyBusiness',
  data() {
    return {
      sxBox: false,
      // 商机列表
      listData: [
      ],
      MyBusinessState: ['未处理商机'],
      MyBusinessTopLeNum: 0,
      SeTopLeCli: 'SeTopLeCli',

      FastSelect: '', // 绑定快速查询
      InquiryCar: '', // 绑定咨询车源
      OpporClass: '', // 绑定商机类型
      OpporFrom: '', // 绑定商机来源

      CustToTime: '', // 绑定产生时间
      CustHanTime: '', // 绑定处理时间

      FollowSale: '', // 绑定跟进销售
      ExtenFrom: '', // 绑定推广来源
      IfArrears: '', // 绑定是否欠费

      InquiryCarData: [
        { value: '宝马' },
        { value: '奔驰' },
      ], // 绑定咨询车源数据
      OpporClassData: [
        { value: '不限' },
        { value: '非点化线索' },
        { value: '电话线索' },
      ], // 绑定商机类型数据
      OpporFromData: [
        { value: '不限' },
        { value: '询价' },
        { value: '分期购' },
        { value: '抢先开' },
        { value: '商机市场' },
        { value: '求购' },
        { value: '限时特惠' },
      ], // 绑定商机来源数据
      FollowSaleData: [
        { value: '不限' },
      ], // 绑定跟进销售数据
      ExtenFromData: [{ value: '不限' }], // 绑定推广来源数据
      IfArrearsData: [{ value: '不限' }], // 绑定是否欠费数据


      MyBuLiData: true, // 判断是否有数据
      paging: 1, // 页数
      maxpaging: 40, // 最大页数
      pageSize: 20,

      //  操作
      Dis: {
        display: 'none',
      },
      // 分配归属
      BusDistriDis: {
        display: 'none',
      },
      BusDisSelet: '123456',
      //  单选
      BusRadio: '1',
      total: 0,
      limit: 20,
      page: 1,
      //  商机详细
      BusDeDis: {
        display: 'none',
      },
      // 商机详情信息
      BusDeDetail: {
        title: '',
        handleTime: '',
        visitTime: '',
        client: {
          phoneNum: '',
        },
        vehicleInfo: {
          title: '',
          brandDate: '',
          mileage: '',
          carPic: '',
        },

      },

      // 申述
      ReTaDis: {
        display: 'none',
      },

    };
  },
  methods: {

    // 快速查询
    MyBusSele() {
      alert('查询成功');
    },

    // 操作
    // 分配归属
    distribution() {
      this.Dis.display = 'block';
      this.BusDistriDis.display = 'block';
    },
    // 查询
    getList() {
      this.$api.post('/c/visit/findVisitRecord', {
        companyId: this.$store.state.company.id,
        page: this.paging,
        limit: this.pageSize,
        id: this.FastSelect,
        handleTimeStr: new Date(this.CustHanTime[0]).getTime(),
        handleTimeEnd: new Date(this.CustHanTime[1]).getTime(),
        visitTimeStr: new Date(this.CustToTime[0]).getTime(),
        visitTimeEnd: new Date(this.CustToTime[1]).getTime(),
      }).then((res) => {
        this.listData = res.data.data.list;
        console.log(this.listData);
      });
    },
    BusSelect() {
      alert('查询成功');
    },
    // 取消
    Disnone() {
      this.Dis.display = 'none';
      this.BusDistriDis.display = 'none';
    },
    // 确定
    BusDistriOk() {
      this.Dis.display = 'none';
      this.BusDistriDis.display = 'none';
    },

    // 商机详细
    BusDe(item) {
      console.log(item);
      this.BusDeDetail = item;
      this.display = 'block';
      this.BusDeDis.display = 'block';
    },
    BusDeOk() {
      this.Dis.display = 'none';
      this.BusDeDis.display = 'none';
    },

    // 申述
    ReTa() {
      this.Dis.display = 'block';
      this.ReTaDis.display = 'block';
    },
    ReTaOk() {
      this.Dis.display = 'none';
      this.ReTaDis.display = 'none';
    },

    // 分页
    currentChange(index) {
      this.paging = index;
      this.getList();
    },
    sizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
    doHandle() {

    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped lang="scss">
  .WinM{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 999;
    display: none;
  }

  //操作
  .BusDistri{
    width: 800px;
    height: 387px;
    background-color: #fff;
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .BusClose{
    width: 790px;
    height:40px;
    font-size: 30px;
    line-height: 40px;
    text-align: right;
    color: #666;
    cursor: pointer;
  }
  .BusDistribox{
    width: 680px;
    height: 255px;
    margin: 40px 60px 60px;
    position: relative;
  }
  .onCarboxTop{
    width: 100%;
    height: 36px;
    font-size: 24px;
    color: #666;
    line-height: 36px;
    text-align: left;
    margin-bottom: 20px;
  }
  .BusDisSelet{
    width: 280px;
    height: 36px;
    float: right;
    position: absolute;
    right: 20px;
    top: 0;
    cursor: pointer;
  }
  .clickSele{
    font-size: 20px;
    line-height: 36px;
    position: absolute;
    left: 250px;
  }

  .BusDistriTab{
    width: 680px;
    margin-bottom: 20px;
  }
  .BusDistriTab>div{
    width: 680px;
    height: 50px;
    line-height: 50px;
    color: #666;
    font-size: 12px;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
  }
  .BusDistriTab>div>div{
    border-right:1px solid #e3e3e3 ;
    height: 100%;
    float: left;
  }
  .BusDistriTab>div:nth-last-child(1){
    border-bottom: 1px solid #e3e3e3;
  }
  .BusDistriTab>div>div:nth-child(1){
    width: 60px;
    text-align: center;
  }
  .BusDistriTab>div>div:nth-child(2){
    width: 200px;
  }
  .BusDistriTab>div>div:nth-child(3){
    width: 416px;
  }

  .BusinessDetailed{
    width: 690px;
    height: 565px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  .BusDeBox{
    width: 570px;
    height: 440px;
    margin: 55px 60px 60px;
  }
  .BusDeTop{
    height: 24px;
    text-align: center;
    color: #666666;
    font-size: 24px;
  }
  .BusDeCon{
    height: 70px;
    margin-top: 20px;
  }
  .BusDeConTu{
    width: 100px;
    height: 70px;
    background-color: gray;
    float: left;
  }
  .BusDeConFon{
    width: 253px;
    height: 70px;
    color: #666666;
    font-size: 12px;
    float: left;
    margin-left: 10px;
    line-height: 18px;
  }
  .BusDeConTab{
    clear: both;
    width: 570px;
    height: 246px;
    padding-top: 20px;
  }
  .BusDeConTab>div{
    height: 41px;
    line-height: 41px;
    font-size: 12px;
    color: #666666;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
  }
  .BusDeConTab>div>div{
    width: 50%;
    height: 100%;
    float: left;
  }
  .BusDeConTab>div:nth-last-child(1){
    border-bottom: 1px solid #e3e3e3;
  }
  .BusDeConTab>div:nth-last-child(1)>div{
    width: 100%;
  }
  .BusDeConTab>div:nth-last-child(1)>div>div:nth-last-child(1){
    width:466.5px;
  }
  .BusDeConTab>div:nth-last-child(2)>div{
    width: 100%;
  }
  .BusDeConTab>div:nth-last-child(2)>div>div:nth-last-child(1){
    width:466.5px;
  }
  .BusDeConTab>div>div>div{
    float: left;
    height: 100%;
    border-right: 1px solid #e3e3e3;
  }
  .BusDeConTab>div>div>div:nth-child(1){
    width: 100px;
    background-color: #F9FAFA;
  }
  .BusDeConTab>div>div>div:nth-child(2){
    width: 182px;
  }
  .BusDeConTab>div>div>div>p{
    margin-left: 10px;
  }
  .BusDeBtn{
    clear:both;
    height: 40px;
    width: 140px;
    margin: 30px auto;
    color: #fff;
    background-color: $ora;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    cursor:pointer;
  }

  .Representations{
    width: 530px;
    height: 202px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  .ReTaClose{
    width: 520px;
    height:40px;
    font-size: 30px;
    line-height: 40px;
    text-align: right;
    color: #666;
  }
  .el-icon-close{
    cursor:pointer;
  }
  .ReTaBox{
    width: 400px;
    height: 120px;
    margin: 20px auto;
    text-align: center;
  }
  .ReTaBoxFont{
    font-size: 18px;
    color: #666666;
  }
  .ReTaBoxBtn{
    width: 140px;
    height: 40px;
    background-color: $ora;
    line-height: 40px;
    color: #fff;
    font-weight: 600;
    margin: 20px auto;
    cursor:pointer;
  }
  .ReTaBoxBtn:hover{
    background-color: #F98C2A;
  }


  .StateBtn{
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }
  .StateBtn>div{
    width: 140px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .StateBtnconfirm{
    background-color: $ora;
    color: #fff;
  }
  .StateBtnconfirm:hover{
    background-color: #ffa23b;
  }
  .StateBtnCancel{
    border: 1px solid #e3e3e3;
    color: #666;
    box-sizing: border-box;
  }
  .StateBtnCancel:hover{
    border: 1px solid $ora;
    color: $ora;
  }


  .MyBusiness{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }


  .MyBusinessLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .MyBusinessLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .MyBusinessLi>span{
    font-size: 12px;
    color: #666;
    position: absolute;
    left: 90px;
  }
  .MyBusinessLibtn{
    height: 50px;
    width: 100px;
    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .MyBusinessLibtn>span{
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 14px;
    color: #fff;
    background-color: $ora;
    text-align: center;
    cursor:pointer;
  }
  .MyBusinessLibtn>span:nth-child(2){
    background-color: #FEF0E8;
    color: $ora;
  }
  .MyBusinessLibtn>span:hover{
    background-color: #ff9d37;
    color: #fff;
  }

  .MyBusinessSeTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .MyBusinessSeTopLe{
    width: 360px;
    height: 40px;
    float: left;
  }
  .MyBusinessSeTopLe ul{
    width: 366px;
    height: 40px;
  }
  .MyBusinessSeTopLeLi{
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
  .MyBusinessSeTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }

  .MyBusinessSele{
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    padding:10px
  }
  .MyBusinessSele>div{
    width: 246px;
    height: 36px;

  }
  .MyBusinessSele span{
    color: #666;
    font-size: 12px;
    text-align: right;
    line-height: 36px;
    float: left;
    margin-right: 10px;
  }
  .MyBusSele{
    width: 25px;
    height: 25px;
    float: right ;
    background-color: $ora;
    text-align: center;
    line-height: 25px;
    color: #fff;
    position: relative;
    top: 5px;
    left: -25px;
    cursor: pointer;
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

  .Line{
    height: 10px;
    background-color: #f9fafa;
  }
  .WinSort{
    width: 1140px;
    height: 60px;
  }
  .WinSort>div:nth-child(1){
    float: left;
  }
  .TableNum{
    width: 250px;
    height: 60px;
    line-height:60px;
    color: #666;
    font-size: 12px;
    position: relative;
    top: 5px;
    float: right;
  }
  .TableNum p{
    display: inline-block;
    width: 100%;
    height: 26px;
    line-height: 26px;
    text-align: right;
  }
  .TableNum strong{
    font-weight: 400;
    color: $ora;
    line-height: 26px;
  }

  .block{
    text-align: center;
    background: #fff;
  }
  .MyBusinessTable {
    width: 1140px;
  }
  .BusinessTableTit{
    width: 100%;
    height: 40px;
    background-color: #F8F8F8;
    border: 1px solid #eee;
  }
  .BusinessTableTit>div{
    float: left;
    border-right: 1px solid #eee;
    color: #666;
    font-size: 12px;
    margin-left: 15px;
    line-height: 40px;
    height: 40px;
  }

  .merchantInfor{
    width: 137px;
  }
  .GuestInfor{
    width: 150px;
  }
  .ToTime{
    width: 110px;
  }
  .waitTime{
    width: 132px;
  }
  .askCar{
    width: 150px;
  }
  .withSale{
    width: 108px;
  }
  .ProFees{
    width: 125px;
  }
  .MyBusoper{
    width: 100px;
  }

  .CarDataLidataNull{
    height: 154px;
    text-align: center;
    color: #999;
    padding-top: 100px;
  }
  .CarDataLidataNull h1{
    font-weight: 400;
    display: block;
  }
  .CarDataLidataNull p{
    line-height: 44px;
    font-size: 14px;
  }
  .CarDataLidataNull strong{
    font-weight: 400;
    color: $ora;
    cursor: pointer;
  }

  .MyBuTableLi{
    width: 1142px;
  }
  .MyBuTableLi li{
    height: 90px;
    border: 1px solid #eee;
    border-top: none;
    color: #666;
    font-size: 12px;
  }
  .MyBuTableLi li:hover{
    background-color: #f8f8f8;
  }
  .MyBuTableLi li>div{
    height: 90px;
    float: left;
    margin-left: 15px;
    border-right: 1px solid #eee;
  }
  .MyBuTableLi li>div:nth-last-child(1){
    border-right: none;
  }
  .askCar>div{
    margin-top: 8px;
    cursor: pointer;
    width: 100%;
    height: 50px;
    line-height: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 400;
    font-size: 12px;
    color: $ora;
  }

  .MyBuTableFont{
    width: 200px;
    margin-top: 8px;
  }
  .MyBuTableFont>span{
    line-height:23px;
  }
  .MyBuTableFont p{
    width: 200px;
    height: 20px;
    display: inline-block;
    line-height: 23px;
    margin: 0;
    padding: 0;
  }
  .MyBuTableFont p>span{
    float: left;
  }
  .MyBuTableFont p>strong{
    background-color: $ora;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    margin-left: 3px;
    padding: 0 5px;

  }
  .BeatCarTime strong{
    font-weight: 400;
    font-size: 12px;
    color: $ora;
  }

  .MyBusoper span{
    cursor:pointer;
    text-decoration: underline;
  }
  .MyBusoper span:hover{
    color: $ora;
  }
.busBox{
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  line-height: 1.5;
  padding: 15px;
  h1{
    font-size: 14px;
    color:#ff6600;
    line-height: 2;
    span:first-child{
      color:#444;
      padding-right: 5px;
    }
  }
  a{
    color:#444
  }
}
  .MyBusinessBox{
    height: 0;
    flex: 1;
    overflow: auto;
  }


</style>
