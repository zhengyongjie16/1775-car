import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import newHome from './views/newHome.vue';
import Te from './views/te/index'

Vue.use(Router);

export default new Router({

  routes: [
    {// 工作平台
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
      },
    },
    { // 登录页面
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue'),
    },
    { // 我的车源
      path: '/MyCar',
      name: 'MyCar',
      component: () => import('./views/MyCar.vue'),
      meta: {
        keepAlive: true,
      },
    },
    { // 拍车大厅
      path: '/BeatCar',
      name: 'BeatCar',
      component: () => import('./views/BeatCar.vue'),
    },
    { // 个人车源
      path: '/PersonalCar',
      name: 'PersonalCar',
      component: () => import('./views/PersonalCar.vue'),
    },
    { // 我的商机
      path: '/MyBusiness',
      name: 'MyBusiness',
      component: () => import('./views/MyBusiness.vue'),
    },
    { // 我的客户
      path: '/MyCustomer',
      name: 'MyCustomer',
      component: () => import('./views/MyCustomer.vue'),
    },
    { // 商机市场
      path: '/BusOppmarket',
      name: 'BusOppmarket',
      component: () => import('./views/BusOppmarket.vue'),
    },
    { // 全部消息
      path: '/AllNews',
      name: 'AllNews',
      component: () => import('./views/AllNews.vue'),
    },
    { // 修改密码
      path: '/Password',
      name: 'Password',
      component: () => import('./views/Password.vue'),
    },
    {// 系统设置
      path: '/SystemSet',
      name: 'SystemSet',
      component: () => import('./views/SystemSet.vue'),
    },
    {// 添加车源
      path: '/AddCar',
      name: 'AddCar',
      component: () => import('./views/AddCar.vue'),
    },
    {// 更新车源
      path: '/updateCar',
      name: 'updateCar',
      component: () => import('./views/updateCar.vue'),
    },
    {// 被投诉的车辆
      path: '/ComplaintCar',
      name: 'ComplaintCar',
      component: () => import('./views/ComplaintCar.vue'),
    },
    { // 在库配置状态InLibraryState
      path: '/InLibraryState',
      name: 'InLibraryState',
      component: () => import('./views/InLibraryState.vue'),
    },
    { // 商家注册
      path: '/BusRegister',
      name: 'BusRegister',
      component: () => import('./views/BusRegister.vue'),
    },
    { // 忘记密码
      path: '/ForgetPass',
      name: 'ForgetPass',
      component: () => import('./views/ForgetPass.vue'),
    },
    { // 服务协议
      path: '/ServiceXy',
      name: 'ServiceXy',
      component: () => import('./views/ServiceXy.vue'),
    },
    { // 车源详细
      path: '/CarDetailed',
      name: 'CarDetailed',
      component: () => import('./views/car/CarInfo.vue'),
    },
    { // 车检查报告
      path: '/CarInsPre',
      name: 'CarInsPre',
      component: () => import('./views/CarInsPre.vue'),
    },
    { // 评价
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./views/evaluate.vue'),
    },
    { // 评价
      path: '/account',
      name: 'account',
      component: () => import('./views/account/account.vue'),
    },
    { // 添加员工
      path: '/addAccount',
      name: 'addAccount',
      component:()=>  import('./views/account/add')
    },
    { // 编辑员工权限
      path: '/editAccount',
      name: 'editAccount',
      component:()=>  import('./views/account/edit')
    },
    {
      // 编辑员工详情
      path: '/AccountDetail',
      name: 'AccountDetail',
      component:()=>  import('./views/account/detail')
    },
    {// 营销工具
      path: '/Tool',
      name: 'Tool',
      component: () => import('./views/tool.vue'),
    },
    // {
    //   // 海报详情
    //   path: '/poster',
    //   name: 'poster',
    //   component: () => import('./views/poster.vue'),
    // },
    { // 车牌查询
      path: '/brandtool',
      name: 'brandtool',
      component: () => import('./views/brandtool.vue'),
    },

    // 2.0

    { //认证
      path: '/Attest',
      name: 'Attest',
      component: ()=>import('@/views/login/Attest'),
    },
    { //车行主页
      path: '/CarHome',
      name: 'CarHome',
      component: ()=> import('@/views/car/CarHome'),
    },
    { //营销工具
      path: '/Marketing',
      name: 'Marketing',
      component: ()=> import('@/views/marketing/Marketing'),
      meta: {
        keepAlive: true,
      },
    },
    { // 添加伙伴
      path: '/AddPartner',
      name: "AddPartner",
      component: () => import('@/views/union/AddPartner')
    },
    { //我的车库
      path: '/MyCarInUnion',
      component: () => import('@/views/union/MyCarInUnion')
    },
    { // 联盟
      path: '/Union',
      name: 'Union',
      component: ()=> import('@/views/union/Index')
    },
    { // 我的联盟
      path: '/UnionList',
      name: 'UnionList',
      component: ()=> import('@/views/union/unionList')
    },
    { // 联盟商家详情
      path: '/UnionDetail',
      name: 'UnionDetail',
      component: ()=> import('@/views/union/Detail'),
      meta:{
        keepAlive: true,
      }
    },
    { // 联盟车库
      path: '/UnionCar',
      name: 'UnionCar',
      component: ()=> import('@/views/union/unionCar'),
      meta:{
        keepAlive: true
      }
    },
    { // 注册
      path: '/Registered',
      name: 'Registered',
      component: ()=> import('@/views/login/Registered')
    },
    { // 注册
      path: '/Pwd',
      name: 'Pwd',
      component: ()=> import('@/views/login/Pwd')
    },
    { // 添加客户
      path: '/AddClient',
      name: 'AddClient',
      component: ()=> import('@/views/client/AddClient')
    },
    { // 海报
      path: '/Poster',
      name:'Poster',
      component: ()=> import('@/views/marketing/Poster'),
      meta:{
        keepAlive: true
      }
    },{ // 海报详情
      path: '/PosterInfo',
      name:'PosterInfo',
      component: ()=> import('@/views/marketing/PosterInfo')
    },{ // 海报拼图
      path: '/PosterMerge',
      name:'PosterMerge',
      component: ()=> import('@/views/marketing/PosterMerge')
    },
    { // 文章列表
      path: '/Works',
      name:'Works',
      component: ()=> import('@/views/marketing/Works')
    },
    { // 文章详情
      path: '/WorksDetail',
      name: 'WorksDetail',
      component: ()=> import('@/views/marketing/WorksDetail')
    },{ // 登录
      path: '/Login',
      name: 'Login',
      component: ()=> import('@/views/login/Login')
    },{ //  商机
      path: '/Business',
      name:'Business',
      component: ()=> import('@/views/business/Index')
    },{ //  客户端登录
      path: '/clientLogin',
      name:'clientLogin',
      component: ()=> import('@/views/client/login')
    },{ //  车辆管理
      path: '/CarManager',
      name: 'CarManager',
      component: ()=> import('@/views/car/CarManager')
    },{ //  车辆详情
      path: '/CarInfo',
      name: 'CarInfo',
      component: ()=> import('@/views/car/CarInfo')
    },{ //  客户管理
      path: '/ClientManager',
      name: 'ClientManager',
      component: ()=> import('@/views/client/Manager'),
      meta:{
        keepAlive: true
      }
    },{ // 客户详情
      path: '/ClientInfo',
      name: 'ClientInfo',
      component: ()=> import('@/views/client/ClientInfo')
    },{ // 客户跟进
      path: '/ClientFollow',
      name: 'ClientFollow',
      component: ()=> import('@/views/client/Follow')
    },{ // 更新客户资料
      path: '/UpdateClient',
      name: 'UpdateClient',
      component: ()=> import('@/views/client/UpdateClient')
    },{ // 批车大厅
      path: '/BatchCar',
      name: 'BatchCar',
      component: ()=> import('@/views/car/BatchCar')
    },{ // 我的车库
      path: '/Garage',
      name: 'Garage',
      component: ()=> import('@/views/car/Garage')
    },
    { // 分享的车库
      path: '/ShareCars',
      name: 'ShareCars',
      component: ()=> import('@/views/marketing/ShareCars')
    },
    { // 多图分享
      path: '/Mutipic',
      name: 'Mutipic',
      component: ()=> import('@/views/marketing/Mutipic')
    },
    { // 个人中心
      path: '/My',
      name: 'My',
      component: ()=> import('@/views/my/my'),
      // meta: {
      //   keepAlive: true,
      // },
    },
    { // 帮助中心
      path: '/Help',
      name: 'Help',
      component: ()=> import('@/views/my/help'),
      meta: {
        keepAlive: true,
      },
    },
    { // 修改密码
      path: '/ChangePwd',
      name: 'ChangePwd',
      component: ()=> import('@/views/my/ChangePwd')
    },
    { // 修改联系人
      path: '/ChangeLx',
      name: 'ChangeLx',
      component: ()=> import('@/views/my/ChangeLx')
    },
    { // 车源信息
      path: '/InfoHall',
      name: 'InfoHall',
      component: ()=> import('@/views/infos/list')
    },
    { // 营销工具生成界面
      path: '/MarkCreate',
      name: 'MarkCreate',
      component: ()=> import('@/views/marketing/markCreate')
    },
    { // 发布车源
      path: '/relInfos',
      name: 'relInfos',
      component: ()=> import('@/views/infos/relInfos')
    },
    { // 收车大厅
      path: '/CarHall',
      name: 'CarHall',
      component: ()=> import('@/views/car/CarHall')
    },
    { // 我的收藏
      path: '/MyCollect',
      name: 'MyCollect',
      component: ()=> import('@/views/my/myCollect')
    },{ //周边主页
      path:'/Around',
      name:'Around',
      component:()=> import('@/views/around/index')
    },{ // 周边商家
      path:'/AroundList',
      name:'AroundList',
      component:()=> import('@/views/around/list'),
      meta: {
        keepAlive: true,
      },
    },{ // 周边商家主页
      path:'/AroundShop',
      name:'AroundShop',
      component: ()=> import('@/views/around/shop')
    },{ // 周边商家商品详情
      path:'/AroundDetail',
      name:'AroundDetail',
      component: ()=> import('@/views/around/shopInfo')
    },{
    //  测试专用
      path: '/te',
      name: 'te',
      component: ()=> import('@/views/te/index')
    },{ //周边商户主页
      path: '/shop',
      name: 'shop',
      component: ()=> import('@/views/shop/index')
    },{ // 添加商品
      path: '/addGoods',
      name: 'addGoods',
      component: ()=> import('@/views/shop/addGoods')
    },{ // 编辑商店
      path: '/editShop',
      name: 'editShop',
      component: ()=> import('@/views/shop/editShop')
    },{ // 编辑商品
      path: '/editGoods',
      name: 'editGoods',
      component: ()=> import('@/views/shop/editGoods')
    }
  ],
});
