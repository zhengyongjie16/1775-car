<template>
  <div style="height: 100%">
    <keep-alive >     <!--使用keep-alive会将页面缓存-->
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      TopLiclick: '-1',
      // TopLi: ['工作平台', '车源管理', '客户管理', '营销管理', '金融业务', '数据中心'], // TopLi
      TopLi: ['工作平台', '车源管理', '客户管理'], // TopLi
      Trackfont: ['审核未通过资源', '待跟进客户', '待处理商机'], // 今日待办、审核内容列表
      TrackRouData: ['MyCar', 'MyCustomer', 'MyBusiness', 'MyCar'], // 今日待办、审核内容Roter列表
      TrackIcon: ['el-icon-edit-outline', 'el-icon-document', 'el-icon-coin', 'el-icon-caret-right'], // 今日待办、审核内容列表Icon
      Trackdata: ['', '', '', '13'], // 审核内容列表data
      // Mypfont: ['我的钱包', '修改密码', '我的点评', '我的审批', '帮助中心', '系统设置'], // 个人资料的操作列表
      Mypfont: ['修改密码', '我的审批', '系统设置'], // 个人资料的操作列表
      MypfontRouter: ['', 'Password', '', '', '', 'SystemSet'], // 个人资料的操作Router列表
      MypIcon: ['el-icon-bank-card', 'el-icon-lock', 'el-icon-chat-line-square', 'el-icon-document', 'el-icon-reading', 'el-icon-s-tools'], // 个人资料的操作列表Icon
      bgray: 'bgray',
      workLiboxLi: [
        ['工作平台'],
        ['我的车源', '个人车源'],
        ['我的商机', '我的客户', '添加客户'],
        ['车源推广', '商家推广', '小视频', '在线商城', '店铺装修', '促销新闻', '优选商家'],
        ['消费贷', '车商贷'],
        ['数据概况', '数据统计', '经营报告'],
        ['行业风向标', '文章分析', '课程中心', '直播公开课']], // workLiboxLi中的列表数据
      workLiRouter: [
        ['Home'],
        ['MyCar', 'BeatCar', 'PersonalCar', '', '', ''],
        ['MyBusiness', 'MyCustomer', '', '', 'BusOppmarket'],
        ['', '', '', '', '', '', ''],
        ['', ''],
        ['', '', ''],
        ['', '', '', '']], // workLiboxLi中的列表数据
      workLiOpa: {
        // opacity: 0,
        top: '-240px',
      },
      version: '2.4.3'  //系统版本
    };
  },
  methods: {
      async checkUpdate(){
            const res = await this.$api.post('/common/checkUpdate',{version:this.version})
           const { success } = res.data;
            if(success){
                this.$dialog.confirm({
                    title: '有新版本了哟！',
                    content: '为保证功能能正常使用，我们建议您更新到最新版本',
                    confirmText: '立即更新',
                    cancelText:'忽略',
                    onConfirm: () =>   window.location.href="https://a.app.qq.com/o/simple.jsp?pkgname=io.gxusdcar.newApp"  ,
                })
            }
      },
    dologout() {
      this.$store.commit('logOut');
      this.$router.replace({ name: 'login' });
    },
    NewsRouter() {
      this.$router.push({
        name: 'AllNews',
      });
    },
    workLiWin() {
      this.workLiOpa.top = '64px';
    }, // 列表鼠标悬浮、离开事件
    workLiNo() {
      this.workLiOpa.top = '-240px';
    },
    TopRouter(r, newI) { // 头部鼠标点击跳转事件
      this.TopLiclick = r;
      this.$router.push({
        name: this.workLiRouter[r][newI],
      });
    },
    TrackRouter(r) { // 审核鼠标点击跳转事件
      this.$router.push({
        name: this.TrackRouData[r],
      });
    },
    MypIconRouter(r) {
      this.$router.push({
        name: this.MypfontRouter[r],
      });
    },
  },
  created() {
    // 判断是否已经是在登录状态 如果是的话就直接是登录
    // const cid = this.$cookie.get('cid');
    this.checkUpdate()
    const cid = window.sessionStorage.getItem('cid');
    if (cid) {
      this.$store.dispatch('getCompanyInfo');
    }
  },

};

</script>
<style lang="scss">
  *{
    margin:0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  body {overflow-x: hidden}
  html,body {
    /*height: 100%;*/
  }
  .Top{
    position: fixed;
    top: 0;
    width:100%;
    height: 64px;
    background-color:#484B54;
    z-index: 100;
  }
  .Topbox{
    width: 1200px;
    height: 64px;
    margin: 0 auto;
    position: relative;
  }
  .Toplogo{
    width: 95px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: gray;
    float: left;
  }
  .TopLi{
    float: left;
    width: 710px;
    height: 64px;
    margin-left: 162px;
    padding: 0 26px;

  }
  .TopLi ul{
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .TopLi li{
    width: 104px;
    height: 64px;
    text-align: center;
    float: left;
    line-height: 64px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .TopLiclick{
    background:linear-gradient($ora,#fc9c6c);
    font-weight: 600;
  }
  .TopRi{
    width: 160px;
    height: 64px;
    float: right;
    display: flex;
    justify-content: space-between;
  }
  .TopRi ul{
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .TopRi li{
    width: 36px;
    height: 50px;
    float: left;
    font-size: 30px;
    color: #fff;
    cursor:pointer;
  }
  .TrackLi li{
    width: 256px;
    height: 36px;
    font-size: 26px;
    line-height: 26px;
    cursor:pointer;
  }
  .TrackLi li>span{
    color: #9c9c9c;
  }
  .TrackLi li:hover >p{
    color: $ora;
  }

  .Mypbox{
    width: 270px;
    margin: 0 auto;
  }
  .Myptop{
    width: 100%;
    height: 130px;
  }
  .MyptopTu{
    width: 60px;
    height: 60px;
    background-color: gray;
    border-radius: 50%;
    float: left;
    margin-right: 15px;
  }
  .MyptopDate{
    /*width: 130px;*/
    height: 130px;

  }
  .MyptopDate strong{
    font-size: 18px;
    color: #4b4b4b;
    font-weight: 400;
  }
  .MyptopDate>div{
    width: 198px;
    height: 36px;
    line-height: 18px;
    font-size: 12px;
    color: #666;
    background-color: #f8f8f8;
    float: right;
  }

  .MypIcon{
    width: 100%;
    height: 170px;
    display: block;

  }
  .MypIcon ul{
    width: 100%;
    height: 170px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
  .MypIcon li{
    width: 60px;
    height: 60px;
    margin-right: 7px;
    cursor: pointer;
  }
  .MypIconTu{
    width: 50px;
    height: 35px;
    font-size: 28px;
    text-align: center;
  }
  .MypIconfont{
    width: 50px;
    font-size: 12px;
    color: #4a4a4a;
    text-align: center;
  }
  .Signout{
    cursor: pointer;
    text-decoration:underline ;
    height: 20px;
    color: $ora;
  }

  .workLi{
    width: 100%;
    height: 286px;
    position: fixed;
    top: 64px;
    color: #fff;
    box-shadow:0 10px 16px 0 #dedede;
    background-color: #fff;
    transition: all .5s;
    z-index: 10;
  }
  .workLibox{
    width: 1200px;
    height: 286px;
    margin: 0 auto;
  }
  .workLiboxLi{
    width: 710px;
    height: 286px;
    margin-left: 162px;
    padding: 0 26px;
  }
  .workLiboxLi>ul{
    width: 710px;
    height: 286px;
    display: flex;
    justify-content: flex-start;
  }
  .workLiboxLi>ul>li{
    width: 104px;
    height: 286px;
    float: left;
  }
  .workLiboxLi>ul>li:hover{
    background-color: #f8f8f8;
  }
  .bgray{
    background-color: #fdfdfd;
  }
  .workLiboxLi>ul>li li{
    width: 100%;
    height: 34px;
    line-height: 34px;
    color: #4a4a4a;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  .workLiboxLi>ul>li li:hover{
    color: $ora;
  }


</style>
