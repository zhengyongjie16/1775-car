<template>
  <div class="homemain  main">
    <div class="search">
      <input placeholder="搜索车" type="text" v-model="searchTxt">
      <div class="btn" @click="search">搜索</div>
    </div>
    <div class="sMain">
      <md-scroll-view
        auto-reflow
        :scrolling-x="false"
        :scrolling-y="true"
        ref="scrollView"
      >
        <div class="menu">
          <div class="item">
            <router-link :to="{path:'/AddCar'}">
              <img alt="" src='../assets/car.png'>
              <div class="name">添加车辆</div>
            </router-link>
          </div>
          <div class="item">
            <router-link :to="{path:'/ClientManager'}">
              <img alt="" src='../assets/client.png'>
              <div class="name">客户管理</div>
            </router-link>
          </div>
          <div class="item">
            <router-link :to="{path:'/Business'}">
              <img alt="" src='../assets/business.png'>
              <div class="name">商机处理</div>
            </router-link>
          </div>
          <div class="item">
            <router-link :to="{path:'/account'}">
              <img alt="" src='../assets/staff.png'>
              <div class="name">员工管理</div>
            </router-link>
          </div>
          <div class="item">
            <router-link :to="{path:'/BatchCar'}">
              <img alt="" src='../assets/batch.png'>
              <div class="name">批车大厅</div>
            </router-link>
          </div>
          <div class="item" @click="$router.push({path:'/CarHall'})">
              <img alt="" src='../assets/collect.png'>
              <div class="name">收车大厅</div>
          </div>
<!--          <div class="item" @click="$router.push({path:'/Union'})">-->
<!--              <div class="news"></div>-->
<!--              <img alt="" src='../assets/union_icon.png'>-->
<!--              <div class="name">车商联盟</div>-->
<!--          </div>-->
<!--          <div class="item">-->
<!--            <img alt="" src='../assets/insure.png'>-->
<!--            <div class="name grey">车险</div>-->
<!--          </div>-->
<!--          <div class="item" @click="$router.push({path:'/AroundList'})">-->
<!--            <img alt="" src='../assets/periphery.png'>-->
<!--            <div class="name">汽车服务</div>-->
<!--          </div>-->
        </div>
        <div class="content">
          <div class="card">
            <div class="title">今日任务</div>
            <div class="type">
              <div class="item" @click="$router.push({path:'/Business'})">
                <div class="num">{{homeData.bus}}</div>
                <div class="txt">新商机分配</div>
              </div>
              <div class="item" @click="$router.push({path:'/ClientManager'})">
                <div class="num">{{homeData.client}}</div>
                <div class="txt">客户跟进</div>
              </div>
              <div class="item" @click="$router.push({path:'/MyCar'})">
                <div class="num">{{homeData.cars}}</div>
                <div class="txt">新车入库</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="title">
              系统公告
              <p><i>{{swiNum}}</i>/{{noticeList.length}}</p>
            </div>
            <md-swiper
              :has-dots="false"
              :is-prevent="false"
              :useNative-driver="false"
              @after-change="afterChange"
              ref="swiper"
            >
              <md-swiper-item :key="item.id" v-for="item in noticeList">
                <div class="ctxt"  @click="$router.push({path:'/WorksDetail',query:{id:item.id}})">
                  {{item.title | swiTxt }}<i class="more" v-show="item.title.length>40">查看更多</i>
                </div>
              </md-swiper-item>
            </md-swiper>

          </div>
          <div class="card">
            <div class="title" @click="$router.push({path:'/InfoHall'})">
              车源广场
            </div>
            <div class="section">
              <div :key="item.id" class="item" v-for="item in infos">
                {{item.txt}}，车源信息详情请联系 <span>{{item.lxPhone}}</span>
              </div>
            </div>
          </div>
        </div>
      </md-scroll-view>
    </div>
<!--    <div class="ft">-->
<!--      <md-tab-bar-->
<!--        :has-ink="false"-->
<!--        :items="items"-->
<!--        :style="{padding:0}"-->
<!--        @change="nav"-->
<!--        v-model="curNav"-->
<!--      >-->
<!--        <template slot="item" slot-scope="{ item }">-->
<!--          <div class="custom-item">-->
<!--            <div class="icon">-->
<!--              <md-icon :name="item.icon"/>-->
<!--            </div>-->
<!--            <div class="text">-->
<!--              <span v-text="item.label"></span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </md-tab-bar>-->
<!--    </div>-->
    <tab></tab>
    <!--     <div id="vision"> 1775二手车@1.7.0 </div>-->
  </div>
</template>


<script>
    // @ is an alias to /src
    import p1 from '@/assets/loginCar.jpg';
    import p2 from '@/assets/tbg.png';
    import tab from "../component/tab";

    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: 'Home',
        data() {
            return {
              searchTxt:'',
                items: [
                    {name: 'Home', label: '首页', icon: 'home'},
                    {name: 'MyCar', label: '车库', icon: 'motor-vehicle'},
                    {name: 'Marketing', label: '营销工具', icon: 'message'},
                    {name: 'My', label: '我的', icon: 'discovery'}
                ],
                curNav: 'Home',
                isAc: false,
                p1: null,
                p2: null,
                value: 1,
                Trackfont: ['未通过资源', '待跟进客户', '待处理商机', '我的车源'], // 今日待办、审核内容列表
                TrackRouData: ['MyCar', 'MyCustomer', 'MyBusiness', 'MyCar'], // 今日待办、审核内容列表Router
                TrackIcon: ['el-icon-edit-outline', 'el-icon-document', 'el-icon-coin', 'el-icon-caret-right'], // 审核内容列表Icon
                todayLiData: ['', '', '', ''],
                todayLinum: '-1',
                Shopradio: '1', // 店铺经营报告绑定时间划分
                Stockradio: '1', // 库存情况数据绑定时间划分
                Custradio: '1', // 客户数据绑定时间划分
                Markeradio: '1', // 营销数据绑定时间划分
                // 店铺经营诊断数据
                ShopIcon: ['el-icon-mobile', 'el-icon-coin', 'el-icon-s-marketing'],
                ShopTitie: ['库存情况', '线索情况', '营销情况'],
                ShopFont: ['xxx', 'xxx', 'xxx'],
                checkedCities: ['上海', '北京', '广州'],
                cities: cityOptions,
                // 评分数据
                ComData1: 4,
                ComData2: 4,
                ComData3: 4,

                //  拍车大厅评分数据
                CarLiData1: 5,
                infos:[],
                swiNum: 1,
                cars: [{
                    brand: {
                        paifang: '',
                    },
                    company:{
                        phone:''
                    }
                }],
                homeData:{
                    bus:'',
                    client:'',
                    cars:'',
                },
                noticeList:[

                ]
            };
        },
        components:{
          tab,
        },
        filters: {
            swiTxt: value => {
                if (!value) return '暂无公告';
                if (value) {
                    if (value.length > 40) {
                        return value.slice(0, 40)
                    } else {
                        return value
                    }
                }
            },
            brandDate:value=>{
                if(!value) return '';
                let time = new Date(value);
                let year = time.getFullYear()
                return year
            }
        },
        methods: {
             expect(){
               this.$toast.info('即将上线，敬请期待')
             },
            // 今日待办、审核列表Router
            TrackRouter(r) {
                this.TopLiclick = r;
                console.log(r);
                this.$router.push({
                    name: this.TrackRouData[r],
                });
            },
            // 评价
            ComRouter() {
                this.$router.push({
                    name: 'evaluate',
                });
            },
            // 我的商机跳转
            HoBusRou() {
                this.$router.push({
                    name: 'MyBusiness',
                });
            },
            // 拍车大厅跳转
            HoBeatRou() {
                this.$router.push({
                    name: 'BeatCar',
                });
            },
            out() {
                this.$store.commit('logOut');
                window.location.reload();
            },
            //导航
            nav(item) {
                if (item.name === 'Home') return this.$router.replace({name: item.name});
                // if(item.name === 'Message') return  this.$toast.info('即将开放')
                this.$router.push({name: item.name})
            },
            afterChange(before, after) {
                this.swiNum = after + 1
            },
            // 获取车源信息
            async findInfos() {
                let _res = await this.$api.get('/carSource/findInfos', {
                    params: {
                        page: 1,
                        limit: 5
                    }
                });
                console.log(_res);
                let {success, data} = _res.data;
                if (!success) return this.$toast.info('车源信息加载失败');
                this.infos = data
            },
            // 收车信息
            async getCarList() {
                let _res = await this.$api.post('/vc/getCarList', {
                    limit: 6,
                    page: 1,
                    isTrade: 1,
                });
                let {success, data} = _res.data;
                if (!success) return this.$toast.info('收车信息加载失败');
                return this.cars = data.list;
            },
            //  商机、客户、车库数量
            async getHomeData(){
              let res = await this.$api.get('/bus/getHomeData', {
                  params:{
                      accountType: this.$store.state.company.accountType,
                      authority: this.$store.state.company.authority,
                      companyId: this.$store.state.company.id,
                      sellMan: this.$store.state.company.subAccountId,
                      addtime:Date.now(),
                  }
              });
              let { success, info, data } = res.data;
              if(!success) return this.$toast.info(info);
              return this.homeData = data;
            },
            search(){
               // this.$router.push({path:'/BatchCar',query:{searchTxt:this.searchTxt}})
                this.$toast.info('该功能尚未开放，敬请期待！')
            },
            async getNotice(){
                let res = await this.$api.post('/common/getNotice')
                const { success,data } = res.data;
                if(success){
                    this.noticeList = data
                }
            }

        },

        created() {
          console.log('+++++', Date.now() )
            this.p1 = p1;
            this.p2 = p2;
            this.findInfos();
            this.getCarList();
            this.getHomeData();
            this.getNotice()
        },
        mounted() {
            const _isAc = window.localStorage.getItem('isAc');
            this.isAc = _isAc == 0;
            console.log('isAc', this.isAc);
        },

    };
</script>
<style lang="scss" scoped>

  .homemain {
    height: 100%;
    background: #f7f7f7;
    /*flex-direction: column;*/
    /*display: flex;*/
    /*padding-top: 50px;*/
    box-sizing: border-box;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 0;
    display: flex;
    flex-direction: column;
  }
  .sMain{
    height: 0;
    flex-grow: 1;
  }
  .homeContent {
    width: 100%;

    background-color: #fff;
    position: relative;
    top: 64px;
  }

  .homebox {

    margin: 0 auto;
  }

  .van-grid-item__content {
    background-color: #fff !important;
  }

  [class*=van-hairline]::after {
    border: none !important;
  }

  /*右边css*/
  .homeRight {
    width: 100vw;
  }

  .ComData {
    width: 312px;
    height: 210px;
    margin: 0 auto;
  }

  .Comfont {
    width: 348px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    text-decoration: none;
  }

  .Comevaluate {
    width: 348px;
    height: 32px;
    background-color: #FCFCFC;
    line-height: 32px;
    margin: 0 auto;
    color: #4A4A4A;
    padding: 0 8px 0;
    font-size: 12px;
  }

  .ComevaLe {
    width: 50%;
    float: left;
  }

  .ComevaLe span {
    font-size: 20px;
    color: $ora;
    margin: 0 5px;
  }

  .ComevaRi {
    float: right;
    cursor: pointer;
  }

  .ComevaRi:hover {
    color: $ora;
  }

  .evaData {
    width: 348px;
    height: 80px;
  }

  .DataAllLe {
    clear: both;
    width: 60px;
    height: 50px;
    margin-left: 30px;
    float: left;

  }

  .DataAllLe span {
    display: block;
    margin-bottom: 13px;
    width: 60px;
    height: 40px;
    font-size: 40px;
  }

  .DataAllLe p {
    text-align: center;
    font-size: 12px;
    color: #999;
  }

  .DataAllRi {
    width: 210px;
    height: 70px;
    float: right;

  }

  .DataAllRi li {
    height: 24px;
    line-height: 24px;
    color: #666666;
    font-size: 12px;
  }

  /*我的钱包*/
  .MyWallet {
    height: 324px;
    margin-left: 15px;
  }

  .MyWaData {
    width: 332px;
    height: 130px;
  }

  .MyWaData ul {
    width: 332px;
    height: 180px;
    margin: 20px 0 0 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .MyWaData ul li {
    width: 164px;
    height: 84px;
  }

  .MyWaDataTop {
    color: #666666;
    font-size: 12px;
  }

  .MyWaDatanum {
    color: #999;
    font-size: 12px;
  }

  .MyWaDatanum strong {
    color: #4A4A4A;
    font-size: 20px;
    font-weight: 400;
    margin: 0 5px;
  }

  .MyWaDatanum span {
    color: $ora;
    width: 51px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    margin-left: 15px;
    cursor: pointer;
  }

  /*轮播图*/
  .LunTu {
    display: block;
    width: 335px;
    height: 130px;
    margin-left: 20px;
  }

  .LunTuLi {
    width: 335px;
    height: 80px;
    background-color: #fff;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__container {
    height: 80px;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    height: 80px;
  }

  /*我的商机*/
  .MyOpp {
    height: 260px;
    position: relative;
    margin-left: 20px;
  }

  .MyTitle {
    width: 100%;
    height: 20px;
    line-height: 20px;

  }

  .MyTitleL {
    width: 50%;
    float: left;
  }

  .MyTitleL h3 {
    font-size: 17px;
    color: #1B1B1B;
  }

  .MyTitleR {
    float: right;
    color: #4A4A4A;
    font-size: 12px;
    cursor: pointer;
  }

  .MyTitleR:hover {
    color: $ora;
  }

  .OppNull {
    width: 217px;
    height: 234px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .OppNull img {
    width: 217px;
    height: 234px;
  }

  .beatCar {
    width: 332px;
    height: 340px;
    margin-left: 20px;
  }

  .beatCarData {
    width: 100%;
    height: 41px;
    margin-top: 40px;
  }

  .beatCarData ul {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-between;
  }

  .beatCarData ul li {
    width: 108px;
    height: 41px;
  }

  .beatCarData ul li p {
    font-size: 12px;
    color: #999;
  }

  .beatCarData ul li strong {
    font-size: 20px;
    color: #4A4A4A;
    margin: 0 5px 0 0;
    font-weight: 400;
  }

  .beatCarData ul li span {
    font-size: 12px;
    color: #666666;
  }

  .beatCarLi {
    width: 100%;
    margin: 10px 0 0 0;
  }

  .beatCarLi li {
    width: 100%;
    height: 105px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }

  .beatCarLi li:hover {
    box-shadow: 0 17px 30px 0 rgba(0, 0, 0, 0.15);
  }

  .CarLiTu {
    width: 88px;
    height: 66px;
    float: left;
    background-color: gray;
  }

  .CarLiFont {
    width: 220px;
    height: 70px;
  }

  .CarLiFont h4 {
    font-size: 12px;
    color: #666666;
    line-height: 18px;
    font-weight: 400;
  }

  .CarLiFont > p > span {
    font-size: 12px;
    color: #999;
    padding-right: 10px;
  }

  .CarLiFont > div {
    width: 100%;
    height: 20px;
    line-height: 20px;
  }

  .CarLiFont > div p {
    display: block;
    width: 25px;
    height: 16px;
    text-align: center;
    background-color: #E8F2F6;
    color: #59A0F6;
    font-size: 12px;
    float: left;
    margin-right: 10px;
  }

  .CarLiFont > div strong {
    line-height: 14px;
    position: relative;
    top: -2px;
    color: #999;
    font-size: 12px;
    font-weight: 400;
  }

  .CarLiping {
    width: 150px;
    height: 20px;
    float: right;
  }

  /*商学院*/
  .CarCollege {
    width: 332px;
    height: 330px;
    margin: 30px 0 0 20px;
  }

  .CollegeLi {
    width: 100%;
    margin: 10px 0 0 0;
  }

  .CollegeLi li {
    width: 100%;
    height: 105px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }

  .CollegeLi li:hover {
    box-shadow: 0 17px 30px 0 rgba(0, 0, 0, 0.15);
  }

  .CollegeLiTu {
    width: 93px;
    height: 70px;
    background-color: gray;
  }

  .CollegeLiFont {
    width: 220px;
    height: 70px;
  }

  .CollegeLiFont h4 {
    margin-top: -3px;
    margin-bottom: 13px;
    width: 182px;
    height: 40px;
    line-height: 20px;
    font-size: 13px;
    font-weight: bold;
    overflow: hidden;
  }

  .CollegeLiFont > div {
    width: 110px;
    height: 20px;
  }

  .CollegeLiFont > div > span {

    border: 1px solid #eee;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
  }

  .CollegeLiFont > div > p {
    display: inline-block;
    position: relative;
    left: 5px;
    font-size: 12px;
    color: #999;
  }


  /*左边css*/
  .homeLeft {
    width: 100vw;
  }

  .hlTitle {
    text-align: left;
    color: #1c1c1c;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 10px;
  }

  .todayLi {
    height: 92px;
  }

  .todayLi > ul {
    height: 92px;
    display: flex;
    justify-content: space-between;
  }

  .todayLi > ul li {
    width: 192px;
    height: 92px;
    box-shadow: 0 6px 15px 0 rgba(156, 156, 156, 0.15);
    transition: all .3s;
    cursor: pointer;
  }

  .todayhover {
    box-shadow: 0 17px 30px 0 rgba(0, 0, 0, 0.15);
    color: $ora;
  }

  .todayLiTu {
    width: 100%;
    height: 32px;
    text-align: center;
    font-size: 32px;
    margin-top: 16px;
  }

  .todayLi p {
    text-align: center;
    font-size: 13px;
    margin-top: 10px;
    color: #4A4A4A;
  }

  .StoCont {
    height: 328px;
    margin-top: 40px;
    display: flex;
  }

  .StoCont li {
    width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-content: center;

  }

  .StoContTu {
    width: 50px;
    height: 50px;
    background-color: #fff2ea;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: $ora;
    font-size: 30px;
    float: left;
  }

  .StoContFont {
    width: 735px;
    height: 102px;
  }

  .StoContFont h3 {
    font-size: 14px;
    color: #4A4A4A;
    margin-bottom: 10px;
  }

  .StoContFont p {
    width: 732px;
    height: 78px;
    font-size: 14px;
    line-height: 24px;
    color: #666666;
    overflow: hidden;
  }

  /*库存情况数据*/
  .DataSet {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: 38px;
    left: 150px;
  }

  .DataSetLi {
    width: 200px;
    height: 40px;
  }

  .DataWin {
    width: 804px;
    height: 151px;
    background-color: #fcfcfc;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .DataWin > div {
    width: 195px;
    height: 103px;
    margin-left: 10px;
    float: left;
  }

  .DataWinNum {
    color: #4A4A4A;
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 3px;
  }

  .DataWinNum:after {
    content: "辆";
    display: inline-block;
    width: 24px;
    color: #999;
    font-size: 12px;
  }

  .DataWinTips {
    font-size: 12px;
    color: #666666;
  }

  .DataWinbtn {
    margin-top: 17px;
    width: 68px;
    height: 24px;
    text-align: center;
    color: $ora;
    line-height: 24px;
    font-size: 12px;
    background: #fef0e8;
    border-color: #fef0e8;
  }

  .DataWinbtn:hover {
    background-color: $ora;
    color: #fff;
  }

  /*尾部*/
  .homebtm {
    width: 100%;
    height: 120px;
    background-color: #FCFCFC;

  }

  .homebtmbox {
    width: 1200px;
    height: 120px;
    margin: 0 auto;
    position: relative;
  }

  .homebtmData {
    width: 675px;
    height: 30px;
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: none;
  }

  .homebtmLogo {
    width: 127px;
    height: 34px;
    background-color: gray;
    position: relative;
    left: 0;
  }

  .homebtmIph {
    width: 260px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 160px;
    font-size: 28px;
  }

  .homebtmIph span {
    display: inline-block;
    font-size: 28px;
    color: #666;
    font-weight: 800;
    margin-left: 15px;
  }

  .homebtmLi {
    width: 168px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 50px;
  }

  .homebtmLi ul {
    width: 220px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .homebtmLi li {
    width: 56px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: $ora;
    line-height: 40px;
    cursor: pointer;
  }

  .homebtmSca {
    width: 110px;
    height: 110px;
    position: absolute;
    right: 200px;
    top: 50%;
    transform: translateY(-50%);
    background-color: gray;
  }

  .TuData {
    width: 804px;
    height: 400px;
    background-color: gray;
    display: none;
  }

  .sitem {
    height: 150px;
  }

  .sitem img {
    width: 100%;
  }

  #vision {
    text-align: center;
    font-size: 14px;
    color: #ccc;
    margin-top: 50px;

  }


  /* 新添加的页面样式 */
  .mian {
    padding: vw(46) vw(46) 0;
    margin-top: vw(58);
    /*height: 0;*/
    flex-grow: 1;
  }

  .task {
    background: #fff;
    border-radius: vw(23);
    margin-bottom: vw(58);

    h5 {
      padding: vw(28);
      font-size: vw(46);
      color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Semibold, PingFang SC;
    }

    .content {
      font-size: vw(69);
      color: #333;
      text-align: center;
      font-weight: bolder;
      font-family: PingFangSC-Semibold, PingFang SC;

      h4 {
        line-height: 1;
      }

      p {
        line-height: 1;
        margin-top: vw(16);
        color: #666;
        font-size: vw(35);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: normal;
      }
    }
  }

  .van-name {
    font-size: vw(58);
    color: #333;
    font-weight: bolder;
    font-family: PingFangSC-Semibold, PingFang SC;
  }

  .van-p {
    font-size: vw(35);
    color: #666;
    font-family: PingFangSC-Semibold, PingFang SC;
  }

  .md-scroll-view {
    text-align: center;
  }

  .ft {
    width: 100%;
    background: #fff;
    z-index: 9;
    bottom: 0;
  }

  .content {
    margin-bottom: 40px;
  }

  // 2.0
  .search {
    display: flex;
    align-items: center;
    background: #FF4C4C;
    height: 96px;
    box-sizing: border-box;
    padding: 12px 32px;
    justify-content: space-between;

    input {
      width: 594px;
      height: 72px;
      border: none;
      text-align: center;
      background: #FF6F6F;
      border-radius: 36px;
      color: #fff;
      font-size: 28px;
    }

    input::placeholder {
      color: #fff;
    }

    .btn {
      color: #fff;
      font-size: 32px
    }
  }

  .menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /*justify-content: space-around;*/

    .item {
      text-align: center;
      width: 25%;
      margin-top: 40px;
      margin-bottom: 20px;
      position: relative;

      img {
        width: 60px;
        height: 60px;
      }

      .name {
        font-size: 24px;
        color: #333;
        line-height: 24px;
        margin-top: 20px;
      }

      .grey {
        color: #999;
      }

      .news {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        background: #FF4C4C;
        top: -8px;
        right: 54px;
      }
    }
  }

  .card {
    width: 686px;
    margin: 20px auto 0;
    background: #fff;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 24px 20px;
    overflow: hidden;

    .title {
      line-height: 32px;
      font-size: 32px;
      color: #333;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-style: normal;
        font-size: 28px;
        letter-spacing: 8px;

        i {
          font-size: 32px;
          font-weight: bold;
        }
      }
    }

    .type {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        text-align: center;
        margin-top: 44px;

        .num {
          font-size: 40px;
          line-height: 40px;
          color: #333;
        }

        .txt {
          margin-top: 20px;
          font-size: 24px;
          color: #333;
          line-height: 24px;
        }
      }
    }

    .ctxt {
      font-size: 28px;
      color: #333;
      line-height: 42px;
      overflow: hidden;
      margin-top: 20px;
      text-align: left;
      width: 100%;
      word-break: break-all;
      overflow: hidden;

      i {
        color: #34CCFF;
      }
    }

    .section {
      margin-top: 4px;
      margin-bottom: 18px;

      .item {
        font-size: 28px;
        color: #333;
        line-height: 42px;
        padding-bottom: 36px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 40px;
        text-align: left;
        word-break: break-all;
      }

      .item:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

  }
</style>
