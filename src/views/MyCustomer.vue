<template>

  <div class="MyCustomer">
    <van-nav-bar
      title="我的客户"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="mcsBody">
      <van-tabs v-model="active">
        <van-tab title="未跟进">
          <div v-for="item of unFollow" :key="item.id" class="cmbox">
            <h1> {{item.vehicleInfo.title}}</h1>
            <div>
              <p>客户电话:{{item.phoneNum}}</p>
              <p>添加时间:{{new Date(item.addTime)|moment('YYYY-MM-DD HH:mm')}}</p>
              <p>跟进次数:{{item.visitCount}}</p>
              <p>最后跟进时间:{{item.endDate}}</p>
              <p>最后跟进结果:{{item.state}}</p>
            </div>
            <div class="opt">
              <van-button type="warning" size="small" @click="showFL(item)">跟进</van-button>
              <van-button type="primary" size="small" style="margin-left:10px">
                <a :href="`tel:${item.phoneNum}`">
                  联系客户
                </a>
              </van-button>
            </div>
          </div>
        </van-tab>
        <van-tab title="已跟进">
          <div v-for="item of followed" :key="item.id" class="cmbox">
            <h1> {{item.vehicleInfo.title}}</h1>
            <div>
              <p>客户电话:{{item.phoneNum}}</p>
              <p>添加时间:{{new Date(item.addTime)|moment('YYYY-MM-DD HH:mm')}}</p>
              <p>跟进次数:{{item.visitCount}}</p>
              <p>最后跟进时间:{{new Date(item.endDate)|moment('YYYY-MM-DD HH:mm')}}</p>
              <p>最后跟进结果:{{item.state}}</p>
            </div>
            <div class="opt">
              <van-button type="warning" size="small" @click="showFL(item)">跟进</van-button>
              <van-button type="primary"  size="small" style="margin-left:10px" @click="sf(item)">释放客户</van-button>

            </div>
          </div>
        </van-tab>
      </van-tabs>


    </van-pull-refresh>


      <!--与客户交互的状态-->
      <!--<div class="GuestState">-->
        <!--<div class="GuestStateLi"  v-for="(item,r) in GuestStateLiData" :class="StateNum==r?'StateColor':''" @click="StateNum=r">{{item}}</div>-->
      <!--</div>-->

      <!--筛选表单-->
    <!--  <div class="MyCusSele">
        &lt;!&ndash;快速查询 FastSelect&ndash;&gt;
        <div >
          <span>快速查询:</span>
          <el-input class="checkSele" size="mini" v-model="FastSelect" placeholder="姓名和联系方式"></el-input>
        </div>
        &lt;!&ndash;创建时间 CreateTime&ndash;&gt;
        <div>
          <span>创建时间:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="CreateTime"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        &lt;!&ndash;客户来源 CustFrom&ndash;&gt;
        <div>
          <span>客户来源:</span>
          <el-select class="checkSele" size="mini" v-model="CustFrom" placeholder="全部">
            <el-option
              v-for="item in CustFromData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        &lt;!&ndash;客户级别 CustLevel&ndash;&gt;
        <div>
          <span>客户级别:</span>
          <el-select class="checkSele" size="mini" v-model="CustLevel" placeholder="客户级别">
            <el-option
              v-for="item in CustLevelData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        &lt;!&ndash;最后跟进 EndGoTime&ndash;&gt;
        <div>
          <span>最后跟进:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="EndGoTime"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        &lt;!&ndash;跟进状态 GoState&ndash;&gt;
        <div>
          <span>跟进状态:</span>
          <el-select class="checkSele" size="mini" v-model="GoState" placeholder="跟进状态">
            <el-option
              v-for="item in GoStateData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        &lt;!&ndash;预警状态 EarlyState&ndash;&gt;
        <div>
          <span>预警状态:</span>
          <el-select class="checkSele" size="mini" v-model="EarlyState" placeholder="请选择">
            <el-option
              v-for="item in EarlyStateData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="height: 30px;">
        <div class="SeletBtn" style="float: left;" @click="empty">清空</div>
        <div class="SeletBtn" style="float: left;" @click="khSelect">查找</div>
      </div>
      <div class="MyCusLine">

      </div>
      <div class="WinSort">
        <div class="TableNum" >
          <p>共有<strong>0</strong> 符合线索</p>
        </div>
      </div>-->

      <!--客户信息表-->


      <el-pagination
        :current-page.sync="paging"
        layout="prev, pager, next, jumper"
        :page-size="pageSize"
        @current-change="currentChange"
        @size-change="sizeChange"
        :total="maxpaging">
      </el-pagination>


    <!--蒙版-->
    <div class="WinM" :style="Dis"  @click="Disnone"></div>
    <!--操作--释放客户-->
    <div class="releaseKh" :style="KhDis">
      <div class="BusClose" ><i @click="Disnone" class="el-icon-close" ></i></div>
      <p>确认释放客户</p>
      <div class="StateBtn">
        <div class="StateBtnconfirm" @click="releaseKhOk">确定</div>
        <div class="StateBtnCancel"  @click="Disnone">取消</div>
      </div>
    </div>

    <!--跟进客户-->
    <van-popup v-model="flBox">
        <div class="fbox">
          <el-form ref="form" :model="orderInfo" label-width="80px" size="mini">
            <el-form-item label="客户姓名">
              <el-input v-model="orderInfo.consumerName" placeholder="请详细咨询客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="客户预算">
              <el-input v-model="orderInfo.money" placeholder="客服购车预算"></el-input>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-date-picker
                v-model="orderInfo.orderTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-radio-group v-model="orderInfo.payMode">
                <el-radio-button :label="1" :value="1">全款</el-radio-button>
                <el-radio-button :label="2" :value="2">贷款</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="doAdd">确认</el-button>
            </el-form-item>


          </el-form>
        </div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  name: 'MyCustomer',
  data() {
    return {
      active: 0,
      isLoading: false,
      cusData: [], // 客户列表数据
      StateNum: '0',
      StateColor: 'StateColor',
      GuestStateLiData: ['跟进', '邀约', '到店', '成交', '战败', '客户关怀', '回收客户'],
      unFollow: [],
      followed: [],
      FastSelect: '', // MyCus快速查询
      CreateTime: '', // MyCus创建时间
      CustFrom: '', // MyCus客户来源
      CustLevel: '', // MyCus客户级别
      EndGoTime: '', // MyCus最后跟进
      GoState: '', // MyCus跟进状态
      EarlyState: '', // MyCus预警状态

      paging: 1, // 页数
      maxpaging: 40, // 最大页数
      pageSize: 20,


      CustFromData: [
        { value: '直接来源' },
        { value: '朋友介绍' },
        { value: '1775二手车网' },
        { value: '线下活动' },
      ], // 客户来源Data
      CustLevelData: [
        { value: '全部' },
        { value: 'H-当天回访' },
        { value: 'A-3天内回访' },
      ], // 客户级别Data
      GoStateData: [
        { value: '成功销售' },
        { value: '销售失败' },
        { value: '延期购买' },
        { value: '全部' },
      ], // 跟进状态Data
      EarlyStateData: [
        { value: '全部预警' },
        { value: '正常' },
        { value: '黄色' },
        { value: '蓝色' },
        { value: '橙色' },
        { value: '红色' },
      ], // 预警状态Data

      MyCusLiData: true, // 判断是否有客户信息
      releaseKhId: '', // 传入操作的是id
      // 蒙版显示隐藏绑定
      Dis: {
        display: 'none',
      },
      // 客户释放显示隐藏绑定
      KhDis: {
        display: 'none',
      },
      nowOrder: null,
      flBox: false,
      orderInfo: {
        money: '',
        orderTime: null,
        consumerName: '',
        payMode: 1,
        orderId: '',
      },

    };
  },
  methods: {
    async doAdd() {
      const res = await this.$api.post('order/fl', {
        consumerName: this.orderInfo.consumerName,
        orderTime: this.orderInfo.orderTime ? this.orderInfo.orderTime.getTime() : '',
        money: this.orderInfo.money ? this.orderInfo.money : 0,
        payMode: this.orderInfo.payMode,
        orderId: this.orderInfo.orderId,
      });

      const { success, data } = res.data;
      if (success) {
        this.$message.success('跟进状态更新成功');
        this.khSelect();
      } else {
        this.$message.warning('跟进状态更新有误');
      }
      this.flBox = false;
    },
    // 显示根据弹窗
    showFL(item) {
      this.nowOrder = item;
      this.orderInfo = {
        money: item.money,
        orderTime: item.orderTime ? new Date(item.orderTime) : null,
        consumerName: item.consumerName,
        payMode: item.payMode,
        orderId: item.id,
      };
      this.flBox = true;
    },
    onRefresh() {
      this.khSelect();
    },
    // 客户清空
    empty() {

    },
    // 释放客户
    sf(item) {
      Dialog.confirm({
        title: '请确认',
        message: '释放该用户将不能再看到该信息',
      }).then(async () => {
        // on confirm
        const res = await this.$api.post('order/sf', { orderId: item.id });
        const { success, data } = res.data;
        if (success) {
          this.$message.success('释放成功');
        }
        this.khSelect();
      }).catch(() => {
        // on cancel
      });
    },
    // 客户查找
    khSelect() {
      this.isLoading = true;

      this.$api.post('findOrderList',
        {
          sdate: this.CreateTime[0] ? this.CreateTime[0].getTime() : '',
          edate: this.CreateTime[1] ? this.CreateTime[1].getTime() : '',
          page: this.paging,
          limit: this.pageSize,
          consumerName: this.FastSelect,
          state: this.GoState,
          companyId: this.$store.state.company.id,
          isFollow: 1,
        }).then((res) => {
        this.followed = res.data.data.list;
        this.maxpaging = res.data.data.totalCount;
        this.isLoading = false;
      });

      this.$api.post('findOrderList',
        {
          sdate: this.CreateTime[0] ? this.CreateTime[0].getTime() : '',
          edate: this.CreateTime[1] ? this.CreateTime[1].getTime() : '',
          page: this.paging,
          limit: this.pageSize,
          consumerName: this.FastSelect,
          state: this.GoState,
          companyId: this.$store.state.company.id,
          isFollow: 0,
        }).then((res) => {
        this.unFollow = res.data.data.list;
        this.maxpaging = res.data.data.totalCount;
        this.isLoading = false;
      });
    },
    // 取消
    Disnone() {
      this.Dis.display = 'none';
      this.KhDis.display = 'none';
    },
    // 跟进
    followUp(id) {
      this.$api.get('/visitClient', { params: { orderId: id } }).then((res) => {
        alert(res.data.info);
      });
    },
    // 客户释放操作
    releaseKh(item) {
      this.Dis.display = 'block';
      this.KhDis.display = 'block';
      this.$api.get('/deleteClient', { params: { clientId: item.consumerId } }).then((res) => {
        alert(res.data.info);
      });
    },
    // 客户下单
    placeOrder() {

    },
    async releaseKhOk() {
      this.Dis.display = 'none';
      this.KhDis.display = 'none';


      const res2 = await this.$api.get('deleteClient', {
        params: {
          consumerId: this.releaseKhId, // 客户id
        },
      });
      alert(res2.data.info);
    },
    // 分页
    currentChange(index) {
      this.paging = index;
      this.khSelect();
    },
    sizeChange(size) {
      this.pageSize = size;
      this.khSelect();
    },
  },
  created() {
    this.khSelect();
  },
};
</script>

<style scoped lang="scss">

  .MyCustomer{

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .MyCustomerBox{
    width: 1140px;
    margin: 0 auto;
  }

  .MyCusLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .MyCusLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }

  .GuestState{
    height: 60px;
    line-height: 60px;
    font-size: 40px;
  }
  .GuestStateLi{
    width: 120px;
    height: 28px;
    border: 1px solid #e3e3e3;
    margin-right: 15px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    float: left;
    color: #666666;
    cursor: pointer;
  }
  .StateColor{
    background-color: $ora;
    color: #fff;
  }


  .MyCusSele{
    width: 1140px;
    height:60px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .MyCusSele>div{
    width: 246px;
    height: 36px;

  }
  .MyCusSele span{
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

  .SeletBtn{
    background-color: $ora;
    text-align: center;
    color: #fff;
    width: 76px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 15px;
    cursor: pointer;
  }
  .SeletBtn:hover{
    background-color: #f9912e;
  }
  .MyCusLine{
    height: 10px;
    margin: 20px 0;
    background-color: #f9fafa;
  }

  .WinSort{
    width: 1140px;
    height: 60px;
    position: relative;
  }
  .TableNum>div{
    position: absolute;
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
  .CusInTable{
    width: 1180px;
    height: 40px;
  }
  .CusInTable>div:nth-last-child(1){
    border-bottom: 1px solid #eee;
  }
  .CusInTabtile{
    height: 40px;
    background-color: #f8f8f8;
    color: #666666;
    font-size: 12px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
  }
  .CusInTabtile>div{
    height: 40px;
    float: left;
    line-height: 40px;
    border-right: 1px solid #eee;
  }
  .CusInTabtile>div>p{
    margin-left: 15px;
  }

  .CusInData{
    width: 159px;
  }
  .CusInVeCar{
    width: 82px;
  }
  .createTime{
    width: 96px;
  }
  .SalesAttri{
    width: 77px;
  }
  .CusFollow{
    width: 228px;
  }
  .RevisitTime{
    width: 77px;
  }
  .Cussource{
    width: 89px;
  }
  .CusStage{
    width: 77px;
  }
  .CarPurBu{
    width: 125px;
  }
  .CarOpera{
    width: 158px;
  }

  .CusFollow>p{
    display: inline-block;
    width: 200px;
    height: 16px;
    overflow: hidden;
    white-space:nowrap;
  }

  .CusInTabData{
    height: 76px;
  }
  .CusInTabData:hover{
    background-color: #f8f8f8;
  }
  .CusInTabData>div{
    height: 65px;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    float: left;
    color: #666666;
    font-size: 12px;
    padding-top:10px;
  }
  .CusInTabData>div>span{
    color: $ora;
    font-size: 12px;
    margin-left: 15px;
  }
  .CusInTabData>div>p{
    margin-left: 15px;
  }
  .CarOpera>strong{
    cursor:pointer;
    margin-left: 15px;
    font-weight: 400;
  }
  .CarOpera>strong:hover {
    color: $ora;
  }

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
  .releaseKh{
    width: 530px;
    height: 205px;
    background-color: #fff;
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .BusClose{
    width: 520px;
    height:40px;
    font-size: 30px;
    line-height: 40px;
    text-align: right;
    color: #666;
    cursor: pointer;
  }
  .releaseKh>p{
    font-size: 24px;
    color: #1B1B1B;
    text-align: center;
    margin: 20px 0;
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
.mcsBody{
  height: 0;
  flex: 1;
}

  .cmbox{
    padding:5px 15px;
    border-bottom: 1px solid #ccc;
    h1{
      font-size: 14px;
      line-height: 2;
    }
    p{
      font-size: 13px;
      line-height: 1.4;
    }
  }
  .opt{
    a{
      color:#fff
    }
  }
  .fbox{
    padding:10px;
  }
</style>
