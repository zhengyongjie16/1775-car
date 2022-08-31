<template>
  <div class="content">
    <div class="menu" style="margin-bottom: 0">
<!--      <div class="choType">-->
<!--        <p>买车商机</p>-->
<!--        <i></i>-->
<!--      </div>-->
      <div class="left">
        <div>
          <i class="p" :class="{active: distribution==0}" @click="distribution=0">未分配({{noShare}})</i>
        </div>
        <div>
          <i class="p" :class="{active: distribution==1}" @click="distribution=1">已分配({{Share}})</i>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="left">
        <div>
          <i class="p" :class="{active: upType==0}" @click="upType=0">普通商机</i>
        </div>
        <div>
          <i class="p" :class="{active: upType==1}" @click="upType=1">已收藏</i>
        </div>
        <div>
          <i class="p" :class="{active: upType==2}" @click="upType=2">已预约</i>
        </div>
      </div>
    </div>
    <div class="page" v-show="distribution==0">
      <div class="list">
        <md-scroll-view
          :scrolling-x="false"
          :scrolling-y="true"
          auto-reflow
          @end-reached="$_onEndReached"
          @refreshing="refresh"
          ref="scrollView1"
        >
          <md-scroll-view-refresh
            slot="refresh"
            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
            :end-reached-threshold="300"
          ></md-scroll-view-refresh>
          <div :class="{choItem:item.flag}" class="item" v-for="item in list" :key="item.id">
            <div class="cho" :class="{choActive:item.state}" @click="item.state=!item.state"></div>
            <div class="title">
              <div class="time">
                询价 | 产生时间：{{item.addTime | time}}
              </div>
              <div class="tag">已等待:{{item.addTime | ago }}天</div>
            </div>
            <div class="info" v-if="item.vehicleInfo">
              <div class="img"
                   :style="item.vehicleInfo.cover?{background: `url(${item.vehicleInfo.cover}) no-repeat center center`,backgroundSize: `cover`}:{}">

              </div>
              <div class="data">
                <p>{{item.vehicleInfo.title}}</p>
                <div class="detail">
                  <p>{{item.vehicleInfo.brandDate | year}}年上牌·{{item.vehicleInfo.mileage}}万公里</p>
                  <p>￥{{item.vehicleInfo.onlinePrice}}万</p>
                </div>
              </div>
            </div>
            <div class="brand" v-else-if="item.series">
              意向品牌： {{item.brandName}}
            </div>
            <div class="brand" v-else>
              暂无意向车型，请尽快联系跟进
            </div>
            <div class="assign">
              <p>{{item.cusName | cusName}} <i></i> {{item.phoneNum}}</p>
              <div @click="choClient(item.phoneNum)" class="btn" >分配</div>
            </div>
          </div>
          <md-scroll-view-more
            slot="more"
            :is-finished="isFinished"
          >
          </md-scroll-view-more>
        </md-scroll-view>
      </div>
     <!--      -->
      <div class="foot" v-show="click==false">
        <p>共{{noShare}}条商机</p>
        <div @click="choAll" class="btn">批量分配</div>
      </div>
      <div class="foot" v-show="click==true">
        <p></p>
        <div @click="sureAccount" class="btn" >指定员工</div>
      </div>

      <div @click="popus=false" class="mask" v-show="popus"></div>
      <div :class="{openPopus:popus}" class="popus">
        <div class="ptop">
          <p><i></i>{{noShare}}</p>
          <div :class="{choAct:pclick}" @click="confirmShare()" class="btn">确定分配</div>
        </div>
        <div class="pmain">
          <md-scroll-view
            :scrolling-x="false"
            :scrolling-y="true"
            auto-reflow
            ref="scrollView3"
          >
            <div class="plist">
              <div :class="{pactive:item.check}" @click="choPitem(key)" class="pitem" v-for="(item,key) in account" :key="item.id">
                <img alt="" :src="item.pic?item.pic:''">
                <p>{{item.lxName}}</p>
              </div>
            </div>
            <md-scroll-view-more
              slot="more"
              :is-finished="isFinished"
            >
            </md-scroll-view-more>
          </md-scroll-view>
        </div>
      </div>
    </div>
    <div class="page" v-show="distribution==1">
      <div class="list">
        <md-scroll-view
          :scrolling-x="false"
          :scrolling-y="true"
          auto-reflow
          @end-reached="$_onEndReached"
          @refreshing="refresh"
          ref="scrollView2"
        >
          <div :class="{choItem:item.flag}" class="item" v-for="item in list" :key="item.id">
            <div class="cho" :class="{choActive:item.state}" @click="item.state=!item.state"></div>
            <div class="title">
              <div class="time">
                询价 | 产生时间：{{item.addTime | time}}
              </div>
              <div class="tag" v-if="item.subAccount">销售员：{{item.subAccount.lxName}}</div>
            </div>
            <div class="info" v-if="item.vehicleInfo">
              <div class="img"
                   :style="item.vehicleInfo.cover?{background: `url(${item.vehicleInfo.cover}) no-repeat center center`,backgroundSize: `cover`}:{}">

              </div>
              <div class="data">
                <p>{{item.vehicleInfo.title}}</p>
                <div class="detail">
                  <p>{{item.vehicleInfo.brandDate | year}}年上牌·{{item.vehicleInfo.mileage}}万公里</p>
                  <p>￥{{item.vehicleInfo.onlinePrice}}万</p>
                </div>
              </div>
            </div>
            <div class="brand" v-else-if="item.series">
             意向品牌： {{item.brandName}}
            </div>
            <div class="brand" v-else>
              暂无意向车型，请尽快联系跟进
            </div>
            <div class="assign">
              <p>{{item.cusName | cusName }} <i></i> {{item.phoneNum}}</p>
              <div @click="choClient(item.phoneNum)" class="btn">分配</div>
            </div>
          </div>
          <md-scroll-view-more
            slot="more"
            :is-finished="isFinished"
          >
          </md-scroll-view-more>
        </md-scroll-view>
      </div>
      <!--      -->
      <div class="foot" v-show="click==false">
        <p>共{{Share}}条商机</p>
        <div @click="choAll" class="btn">重新分配</div>
      </div>
      <div class="foot" v-show="click==true">
        <p></p>
        <div @click="sureAccount" class="btn">指定员工</div>
      </div>

      <div @click="popus=false" class="mask" v-show="popus"></div>
      <div :class="{openPopus:popus}" class="popus">
        <div class="ptop">
          <p></p>
          <div :class="{choAct:pclick}"  @click="confirmShare()" class="btn">确定指派</div>
        </div>
        <div class="pmain">
          <md-scroll-view
            :scrolling-x="false"
            :scrolling-y="true"
            auto-reflow
            ref="scrollView"
          >
            <div class="plist">
              <div :class="{pactive:item.check}" @click="choPitem(key)" class="pitem" v-for="(item,key) in account" :key="item.id">
                <img alt="" :src="item.pic?item.pic:''">
                <p>{{item.lxName}}</p>
              </div>
            </div>
<!--            <md-scroll-view-more-->
<!--              slot="more"-->
<!--              :is-finished="isFinished"-->
<!--            >-->
<!--            </md-scroll-view-more>-->
          </md-scroll-view>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

  import { Toast } from 'mand-mobile'
  export default {
    name: 'BusinessFollow',
    data() {
      return {
        type: 1,
        state: 1,
        isLoading: false,
          isRefreshing:false,
        items: [
          { flag: false },
          { flag: false },
          { flag: false },
          { flag: false },
        ],
        click: false,
        pclick: false,
        popus: false,
        distribution:0,//默认未分配
        upType:0,  //默认展示全部
        page:1,    //默认查看第一页
        limit:10,  //默认查看20条
        list:[],
        Share:'',
        noShare:'',
        account:[], //员工列表
        accPage:1,  //员工默认页数
        accLimit:20,  // 员工默认个数
        choid:[],   //暂时存储客户
        accountId:'', //选择员工id
        isFinished:false,
        tipsShow: false,
      };
    },
    created(){
      this.getBusiness();
      this.findSubAccount();
    },
    filters:{
        time:value=>{
           if(!value) return '添加时间未知';
           let time = new Date(value);
           let year = time.getFullYear();
           let mouth = time.getMonth()+1;
           let day = time.getDate();
           return `${year}-${mouth}-${day}`
        },
        ago:value=>{
            if(!value) return '未知';
            let date = Date.now();
            let time = date - value;
            let day =parseInt(time/24/60/60/1000)
            return day
        },
        year:value=>{
            if(!value) return '添加时间未知';
            let time = new Date(value);
            let year = time.getFullYear();
            return year
        },
        cusName:value=>{
            if(!value) return '联系电话'
            return value
        }
    },
    watch:{
        distribution: function(){
           this.page=1;
           this.choid=[];   //暂时存储客户
           this.accountId=''; //选择员工id
           this.click= false;
           this.getBusiness();
           this.isFinished=false
           this.$refs.scrollView1.finishLoadMore()
        },
        upType:function(){
          this.page=1;
          this.choid=[];   //暂时存储客户
          this.accountId=''; //选择员工id
          this.click= false;
          this.getBusiness();
          this.isFinished=false
          this.$refs.scrollView1.finishLoadMore()
        }
    },
    methods: {
      choAll() {
        this.click = !this.click;
        if (this.click) {
          this.list.forEach(item => {
            item.flag = true;
          });
        } else {
          this.list.forEach(item => {
            item.flag = false;
          });
        }
      },
      // 获取商机列表
      async getBusiness(){
          let res = await this.$api.get('/bus/client/getBusiness', {
              params:{
                  companyId: this.$store.state.company.id,
                  accountType: this.$store.state.company.accountType,
                  authority:this.$store.state.company.authority,
                  distribution: this.distribution,
                  type: this.upType,
                  page:this.page,
                  limit: this.limit,
              }
          })
          let { success, data, Share, noShare } = res.data
          if(!success) return Toast.info('商机加载失败，请重新加载')
          console.log(data)
          for (const item of data){
              item.flag = false;
              item.state = false
          }
          this.list = data
          this.Share = Share
          this.noShare = noShare
      },
      // 获取员工列表
      async findSubAccount(){
          let res = await this.$api.get('/bus/company/findSubAccount', {
              params: {
                  companyId:this.$store.state.company.id,
                  limit: 50,
                  page:this.accPage,
              }
          })
          let { success, data } = res.data
          for (const item of data ){
              item.check = false
          }
          if(!success) return Toast.info('员工加载失败，请重新加载')
          this.account = data
          console.log(this.account)
      },
      // 未分配选择员工
      choPitem(key){
          for( const i in this.account){
             if(key==i){
                 this.account[i].check=true
                 this.accountId = this.account[i].id
             }else {
                 this.account[i].check=false
             }
          }
          this.pclick = true
      },
      // 选择客户
      choClient(id){
          this.popus=true
          this.choid[0] = id.toString()
      },
      // 确定分配
      sureAccount(){
          let _arr = [];
          for ( const item of  this.list){
             if (item.state==true){
                 _arr.push(item.phoneNum)
             }
          }
          let _obj = [];
          for (const item of _arr){
              if(!_obj.includes(item)){
                  _obj.push(item)
              }
          }
          this.choid = _obj;
          this.popus=true;

      },
      confirmShare(){
          this.$dialog.confirm({
              title: '确认',
              content: '确认后该客户所有商机都将分配给该员工，是否确认分配？',
              confirmText: '确定',
              onConfirm: async () => {
                  let id = this.choid.toString()
                  let sellMan = this.accountId
                  if (!sellMan) return Toast.info('请选择销售',1000)
                  if (!id) return Toast.info('请选择商机',1000)
                  //判断子账号权限
                  let accountType = null;
                  // 如果为子账号且authority=4有分配
                  let authority = null;
                  if (this.$store.state.ac.account) {
                      if (this.$store.state.ac.authority.indexOf('ex')<0) {
                          Toast.info('您没有权限分配！',1000)
                      }else {
                          accountType = 4;
                      }
                  }else {
                      // 为主账号
                      accountType = 0;
                  }
                  let res = await this.$api.post('/bus/client/setBusiness', {
                      companyId: this.$store.state.company.id,
                      accountType: accountType,
                      authority: authority,
                      id,
                      sellMan,
                  });
                  let {success} = res.data;
                  if (!success) return Toast.info('分配失败');
                  this.popus = false;
                  this.page = 1;
                  this.getBusiness();
                  Toast.info('分配成功');
                  this.choid = [];
                  this.list.forEach(item => {
                      item.flag = false;
                  });
                  this.click = false
              },
          })


        },
      async $_onEndReached(){
          if (this.isFinished){
              return
          }
          this.page++
          console.log(this.isFinished,this.page)
          this.isFinished = true
          let res = await this.$api.get('/bus/client/getBusiness', {
              params:{
                  companyId: this.$store.state.company.id,
                  accountType: this.$store.state.company.accountType,
                  authority:this.$store.state.company.authority,
                  distribution:this.distribution,
                  type: this.upType,
                  page:this.page,
                  limit: this.limit,
              }
          })
          let { success, data } = res.data
          if(!success) return Toast.info('商机加载失败，请重新加载')
          for (const item of data){
              item.flag = false;
              item.state = false
          }
          this.list = this.list.concat(data);
          if(this.distribution==0){
              this.$refs.scrollView1.finishLoadMore();
          }else {
              this.$refs.scrollView2.finishLoadMore();
          }

          this.isFinished = false

      },
      refresh() {
          if (this.isRefreshing) return this.$toast.info('1775正在努力的加载')
          this.page=1;
          this.isRefreshing = true;//标记正在刷新中 避免重复进行
          this.getBusiness();
          this.$refs.scrollView1.finishRefresh()
          this.isRefreshing = false; //移除标记
      },
        confir(){
          console.log('266666')
        }
    }

  };
</script>

<style lang="scss" scoped>
  .content {
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
  }

  .menu {
    display: flex;
    align-items: center;
    padding: vw(20) vw(32) 0;
    height: vw(80);
    margin-bottom: vw(16);
    background: #fff;
    .choType {
      display: flex;
      align-items: center;
      padding-right: vw(32);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      margin-right: vw(32);

      p {
        font-size: vw(28);
        color: #333;
      }

      i {
        width: vw(16);
        height: vw(9);
        background: url("../assets/down.png") no-repeat center center;
        background-size: vw(16) vw(9);
        margin-left: vw(8);
      }
    }

    .left {
      display: flex;
      align-items: center;
      font-size: vw(28);
      justify-content: space-between;
      flex-grow: 1;
      height: 100%;
      div{
        flex: 1;
        text-align: center;
      }
      .p {
        color: #999;
        width: auto;
        text-align: center;
        position: relative;
        height: vw(80);
        line-height: vw(80);
        width: auto;
      }

      .p::after {
        content: '';
        width: 100%;
        height: vw(4);
        position: absolute;
        left: 0;
        transform: translateX(50%);
        bottom: vw(-24);
        transform: scale(0);
        transition: 0.5s;
        background: #FF4C4C;
        border-radius: vw(2);
      }

      .p:last-child {
        margin-right: 0;
      }

      .p.active {
        color: #FF4C4C;
        font-weight: bold;
      }

      .p.active::after {
        width: 100%;
        transform: scale(1);
        transition: 0.5s;
      }
    }

    .state {
      display: flex;
      align-items: center;
      font-size: vw(28);
      width: vw(224);
      height: vw(60);
      border: 1px solid rgba(255, 52, 52, 1);
      border-radius: vw(32);

      div {
        color: #FF3434;
        flex: 1;
        text-align: center;
        height: vw(60);
        line-height: vw(60);
        border-radius: vw(32);
      }

      div.active {
        color: #fff;
        background: #FF3434;

      }
    }
  }
  .page{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .list {
    height: 0;
    flex-grow: 1;
    overflow: hidden;

    .item {
      background: #fff;
      border-radius: vw(16);
      margin: 0 auto;
      margin-bottom: vw(36);
      width: vw(686);
      transform: translateX(0);
      position: relative;
      transition: 0.5s;

      .cho {
        width: vw(32);
        height: vw(32);
        border-radius: 50%;
        border: 1px solid #999;
        position: absolute;
        top: 50%;
        margin-top: vw(-16);
        left: vw(-52);
        display: none;
        opacity: 0;
      }
      .choActive{
        border: 1px solid #FF3434;
        background: #FF3434;
      }

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: vw(20);

        .time {
          font-size: vw(24);
          color: #666;
        }

        .tag {
          font-size: vw(24);
          color: #D52002;
          line-height: 1;
        }
      }
      .brand{
        padding: 0 vw(20);
        font-size: 28px;
        color: #333;
      }
      .info {
        display: flex;
        box-sizing: border-box;
        padding: 0 vw(20) vw(20);

        .img {
          width: vw(180);
          height: vw(120);
          margin-right: vw(20);
        }

        .data {
          width: 0;
          flex-grow: 1;
          height: vw(120);
          position: relative;
          box-sizing: border-box;

          P {
            font-size: vw(24);
            color: #333;
            line-height: vw(36);
          }

          .detail {
            position: absolute;
            bottom: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: vw(24);
            line-height: 1;
            color: #666;

            p {
              color: #999;
            }
          }
        }
      }
    }

    .assign {
      margin-top: vw(4);
      display: flex;
      align-content: center;
      box-sizing: border-box;
      justify-content: space-between;
      padding: 0 vw(20) vw(20);

      p {
        font-size: vw(28);
        color: #999;
        display: flex;
        align-items: center;

        i {
          color: #f7f7f7;
          width: vw(16);
          height: 100%;
        }
      }

      .btn {
        width: vw(116);
        height: vw(56);
        border-radius: vw(8);
        background: #FF3434;
        color: #fff;
        font-size: vw(28);
        line-height: vw(56);
        text-align: center;
      }
    }

    .choItem {
      transform: translateX(vw(50));
      transition: 0.5s;

      .cho {
        display: block;
        opacity: 1;
        transition: 0.5s;
      }

    }
  }

  .foot {
    box-sizing: border-box;
    height: vw(96);
    padding: 0 vw(32);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;

    p {
      font-size: vw(28);
      color: #999;
      display: flex;
      align-items: center;

      i {
        width: vw(32);
        height: vw(32);
        border: 1px solid #999;
        border-radius: 50%;
        margin-right: vw(20);
      }

    }

    .btn {
      width: vw(192);
      height: vw(64);
      text-align: center;
      line-height: vw(64);
      border-radius: vw(8);
      background: #FF3434;
      color: #fff;
      font-size: vw(28);
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }

  .popus {
    position: fixed;
    z-index: 1000;
    height: vw(496);
    background: #fff;
    width: 100%;
    bottom: vw(-496);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: 0.5s;

    .ptop {
      padding: vw(20) vw(32);
      height: vw(96);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      box-sizing: border-box;
      p {
        font-size: vw(28);
        color: #999;
        display: flex;
        align-items: center;

        i {
          display: block;
          margin-right: vw(20);
          width: vw(32);
          height: vw(32);
          border-radius: 50%;
          border: 1px solid #999;
        }
      }

      .btn {
        width: vw(192);
        height: vw(64);
        border-radius: vw(8);
        text-align: center;
        line-height: vw(64);
        color: #fff;
        background: #999;
        font-size: vw(28);
      }

      .choAct {
        background: #FF3434;
      }
    }
    .pmain{
      height: 0;
      flex-grow: 1;
    }
    .plist {
      height: vw(400);
      flex-grow: 1;
      padding: 0 vw(32);
      overflow: hidden;
      .pitem {
        display: flex;
        align-items: center;
        width: 33%;
        height: vw(80);
        flex-grow: 1;
        margin-top: vw(20);
        float: left;
        box-sizing: border-box;
        img {
          width: vw(80);
          height: vw(80);
          background: #d8d8d8;
          border: 2px solid #d8d8d8;
          border-radius: 50%;
          margin-right: vw(20);
          box-sizing: border-box;
        }

        p {
          width: 0;
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: vw(28);
          color: #333;
        }
      }

      .pactive {
        img {
          border-color: #FF3434;
        }

        p {
          color: #FF3434;
        }
      }
    }
  }

  .openPopus {
    bottom: 0;
    transition: 0.5s;
  }
</style>
