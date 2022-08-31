import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    company: {
      id: 11,
      name: '',
      state: '',
      accountType: 0,  //默认主账号，0主账号1子账号，主账号可以删除子账号
      authority: 4,    //子账号权限，0没有权限，1增加车辆，2修改车辆，3上下架车辆4.分配商机
      subAccountId: 2,    //子账号id
    },
    carLiShu: '1', // 选择的车辆列表的数据,作为编辑车辆页面的获取数据信息
    nowCar: {},
    ac: null,
    // 储存列表滑动的数据
    slider:null,
  },
  mutations: {
    updateCompany(state, r) {
      for (const i in r) {
        state.company[i] = r[i];
        if (i === 'state') {
          // Vue.cookie.set('state', r[i]);
          window.localStorage.setItem('state', r[i]);
        }
      }
    },
    // 退出登录
    logOut(state) {
      state.company = {
        id: '',
        name: '',
        state: '',
      };
      // Vue.cookie.delete('cid');
      // Vue.cookie.delete('state');
      window.localStorage.removeItem('isAc')
      window.localStorage.removeItem('state');
      window.localStorage.removeItem('cid');
      window.location.reload();
    },

    carLiCount(state, r) {
      state.carLiShu = r;
    },
    updateNowCar(state, r) {
      state.nowCar = r;
    },
    updateAcInfo(state, r) {
      state.ac = r;
    },
    updateSlider(state, r) {
      state.slider = r;
    },

  },
  actions: {
    getCompanyInfo(ctx) {
      // const cid = Vue.cookie.get('cid');
      const cid = window.localStorage.getItem('cid');
      if (cid) {
        Axios.post(`https://api.1775.net.cn/getCompanyInfo?t=${Date.now()}`, { companyId: cid }).then((res) => {
        // Axios.post(`https://test.1775.top/getCompanyInfo?t=${Date.now()}`, { companyId: cid }).then((res) => {
          const { data, success } = res.data;
          if (success) {
            ctx.commit('updateCompany', data);
          }
        });
      }
    },
  },
});
