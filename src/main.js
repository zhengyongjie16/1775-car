import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import Vant from 'vant';
import store from './store';
import router from './router';
import App from './App.vue';
import 'vant/lib/index.css';
import VueClipboard from 'vue-clipboard2';
import Vconsole from 'vconsole';
import './registerServiceWorker';
import mandMobile from 'mand-mobile';
import 'mand-mobile/lib-vw/mand-mobile.css';
import VueQrcode from '@chenfengyuan/vue-qrcode';
// const vs = new Vconsole();   //手机端调试窗口


Vue.use(VueAreaLinkage);
Vue.use(Viewer);
Vue.use(VueClipboard);
const moment = require('moment');
require('moment/locale/zh-cn');

Vue.use(require('vue-moment'), {
  moment,
});
import vcCard from './component/vcCard';
import vsCard from './component/vsCard';
import pfCard from './component/pfCard';
import ckCard from './component/ckCard';
// import FastLogin from './component/FastLogin';
import Navigation from '@/component/Navigation.vue';
import BrandOpt from './component/BrandOpt';
import navTag from './component/navTag';
//  组件
Vue.component('VcCard',vcCard)
Vue.component('vsCard',vsCard)
Vue.component('pfCard',pfCard)
Vue.component('ckCard',ckCard)
// Vue.component('FastLogin',FastLogin)
Vue.component('Navigation',Navigation)
Vue.component('BrandOpt',BrandOpt)
Vue.component('navTag',navTag)

Vue.use(mandMobile);

Vue.use(Vant);
Vue.component(VueQrcode.name, VueQrcode);



Vue.prototype.$api = Axios.create({
  // baseURL: 'http://192.168.6.130:7002/',
  // baseURL: 'http://192.168.6.129:7002/'
  // baseURL: 'http://127.0.0.1:7002/',
  // baseURL: 'https://api.1775.net.cn/',
  //  baseURL: 'https://api.1775.net.cn/',
  baseURL:'http://api.yiker.cc'
});
const VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 路由守卫


Vue.mixin({
  data() {
    return {
      displacementData: [
        { value: '0.8L' },
        { value: '1.0L' },
        { value: '1.1L' },
        { value: '1.2L' },
        { value: '1.3L' },
        { value: '1.5L' },
        { value: '1.4L' },
        { value: '1.6L' },
        { value: '1.8L' },
        { value: '1.9L' },
        { value: '2.0L' },
        { value: '2.2L' },
        { value: '2.3L' },
        { value: '2.4L' },
        { value: '2.5L' },
        { value: '2.6L' },
        { value: '2.7L' },
        { value: '2.8L' },
        { value: '2.9L' },
        { value: '3.0L' },
        { value: '3.5L' },
        { value: '3.6L' },
        { value: '3.7L' },
        { value: '3.8L' },
        { value: '4.0L' },
        { value: '4.3L' },
        { value: '4.4L' },
        { value: '4.6L' },
        { value: '4.7L' },
        { value: '5.0L' },
      ], // 排量数据
    };
  },
  methods: {
    mobilePic(path) {
      const _tem = path.split('/');
      _tem.splice(-1, 0, 'm');
      return _tem.join('/');
    },
  },
  beforeRouteEnter: (to, from, next) => {
    // const cid = Vue.cookie.get('cid');
    const cid = window.localStorage.getItem('cid');
    let state = null;
    try {
      // state = Vue.cookie.get('state');
      state = window.localStorage.getItem('state');
      if (state == 1 && to.name !== 'Attest') {
        next('/Attest');
      }
    } catch (e) {
      console.log(e);
    }
    // 如果是周边商户则跳转到shop页面，不能让他进入主页
    if(cid=='m90'){
      if(to.path ==='/'){
       // this.$router.replace({ name: 'shop' });
      }
    }

    if (!cid && to.name !== 'login' && to.name !== 'Registered' && to.name !=='WorksDetail'  && to.name !== 'Pwd' ) {
      //  Toast.failed('请先登录');
      next({ path: '/login' });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    const _isAc = window.localStorage.getItem('isAc');
    if(_isAc=='0'){
      next();
    }else{
       //子账号不能处理的事情
       if(to.path ==='/account'||to.path==='/ChangeLx'||to.path==='/Attest'){
          this.$toast.info('没有权限')
       }else{
         next()
       }
    }
    const cid = window.localStorage.getItem('cid');
    if(cid=='m90'){
      if(to.path ==='/'){
        this.$router.replace({ name: 'shop' });
      }else {
        next()
      }
    }

  },
  filters: {
    mobilePic(path) {
      try{
        const _tem = path.split('/');
        _tem.splice(-1, 0, 'm');
        return _tem.join('/');
      }catch (e) {
        return  '1111'
      }
    },
    getYear:(value)=>{
      let time = new Date(value)
      let year = time.getFullYear()
      // console.log(year)
      //返回的时间格式，可自定义
      return year
    },
  },
});


const app = {
  // Application Constructor
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady() {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  },
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

app.initialize();
