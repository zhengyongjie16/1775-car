<template>
     <div class="brandZone">
       <el-button @click="showBox=!showBox" size="mini">
         {{str2? `${str2}/${str3}/${str4}`:resStr}}  <i class="el-icon-arrow-down" :class="{s:showBox}"></i>
       </el-button>
       <div class="brandBox" v-show="showBox">
          <div class="col1">
            <div class="indexList">
              <span :data-index="item"   v-for="item of charts" :key="item" @click="toView(item,$event)">{{item}}</span>
            </div>
            <div class="l1List" ref="lv1">
              <div v-for="item of col1Data" >
                <h1 :id="item.name"> {{item.name}} </h1>
                <span v-for="sub of item.list" :id="`col1${sub.value}`" :key="sub.value" @click="loadLv2(sub,$event)">{{sub.label}}</span>
              </div>
            </div>
          </div>
          <div class="col2">
             <span v-for="item of col2Data"  :id="`col2${item.value}`" @click="loadLv3(item,$event)">
               {{item.label}}
             </span>
          </div>
          <div class="col3">
            <div v-for="item of col3Data" :key="item.value" >
              <h1 :id="item.name"> {{item.name}} </h1>
              <span v-for="sub of item.list" :key="sub.value" :id="`col3${sub.value}`"  @click="sureLv4(item.name,sub,$event)">{{sub.label}}</span>
            </div>
          </div>
       </div>
     </div>
</template>

<script>
import pinyin4js from 'pinyin4js';

export default {
  name: 'brandPicker',
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    value: [String, Array],
    defalut: Array,
  },
  data() {
    return {
      charts: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      showBox: false,
      brandLevel1: [],
      col1Data: [],
      col2Data: [],
      col3Data: [],
      resStr: '',
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      resArr: [],
      baseBrandList: [],
    };
  },
  created() {
    this.getCol1();
    this.resStr = this.placeholder;
    this.col1Data = this.charts.split('').map(r => ({ name: r, list: [] }));
  },
  methods: {
    async getCol1() {
      this.$api.get('/getBrand?pid=0').then((res) => {
        const { success, data } = res.data;
        if (success) {
          this.baseBrandList = data;
          //  加上首字母先
          data.forEach((r) => {
            const letter = pinyin4js.getShortPinyin(r.label)[0].toUpperCase();
            const _tem = this.col1Data.find(item => item.name === letter);

            if (_tem) {
              _tem.list.push(r);
            }
          });
        }
      });
    },
    async loadLv2(sub, ev) {
      this.str2 = sub.label ? sub.label : this.baseBrandList.find(r => r.value == sub.value).label;
      this.resArr = [sub.value];
      this.$emit('input', this.resArr);
      this.col2Data = [];
      this.col3Data = [];
      this.resStr = sub.label;
      await this.$api.get(`/getBrand?pid=${sub.value}&level=1`).then((res) => {
        const { success, data } = res.data;
        if (success) {
          this.col2Data = data;
          //  激活样式
          const domac = document.querySelector('.l1List .ac');
          if (domac) domac.classList.remove('ac');
          document.getElementById(`col1${sub.value}`).classList.add('ac');
        }
      });
    },
    async loadLv3(sub, ev) {
      this.str3 = sub.label ? sub.label : this.col2Data.find(r => r.value == sub.value).label;
      this.resArr = [this.resArr[0], sub.value];
      this.$emit('input', this.resArr);
      await this.$api.get(`/getBrand?pid=${sub.value}&level=8`).then((res) => {
        const { success, data } = res.data;
        if (success) {
          this.col3Data = data;
          console.log(this.col3Data);
          //  激活样式
          const domac = document.querySelector('.col2 .ac');
          if (domac) domac.classList.remove('ac');
          document.getElementById(`col2${sub.value}`).classList.add('ac');
        }
      });
    },
    sureLv4(year, sub, ev) {
      const baseArr = this.col3Data.find(r => r.name == year).list;
      console.log('baseArr', baseArr);
      console.log('the target', baseArr.find(r => r.value == sub.value));
      this.str4 = sub.label ? sub.label : baseArr.find(r => r.value == sub.value).label;
      this.resArr[2] = year;
      this.resArr[3] = sub.value;
      console.log(this.resArr);
      this.$emit('input', this.resArr);
      this.$emit('change', `${this.str3} ${this.str4}`);
      //  激活样式
      const domac = document.querySelector('.col3 .ac');
      if (domac) domac.classList.remove('ac');
      document.querySelector(`#col3${sub.value}`).classList.add('ac');
      this.showBox = false;
    },
    toView(name, ev) {
      const acdom = document.querySelector('.ac');
      if (acdom) acdom.classList.remove('ac');
      ev.target.classList.add('ac');

      const chart = name.toUpperCase();
      console.log(chart);
      document.getElementById(chart).scrollIntoView();
    },
  },
  watch: {
    async defalut(nv) {
      console.log(nv);
      setTimeout(() => {
        if (nv[0]) {
          this.loadLv2({ value: nv[0] }).then(() => {
            console.log('这个位置应用有', this.col2Data);
            if (nv[1]) {
              this.loadLv3({ value: nv[1] }).then(() => {
                if (nv[2] && nv[3]) this.sureLv4(nv[2], { value: nv[3] });
              });
            }
          });
        }
      }, 500);


      // if (this.col2Data.length === 0 && nv[1]) {
      //   this.loadLv3(nv[1]);
      // }
      // if (this.col3Data.length === 0 && nv[3]) {
      //
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.brandZone{
  position: relative;

  box-sizing: border-box;

  i{
    transform: rotate(0deg);
    transition: transform 200ms;
  }
  .s{
    transform: rotate(180deg);
  }
}
  .brandBox{
    position: absolute;
    width: 100vw;
    height:100vh;
    border: 1px solid #000;
    background: #fff;
    z-index: 999;
    display: flex;
    transform: translateX(-50%) translateY(10px);
    &>div{
        border-right:1px solid #000
     }
    .col1{
      width: 200px;
      display: flex;
      .indexList{
        width: 25px;
        background: #c8c8c8;
        text-align: center;
        cursor: pointer;
        span{
          display: block;
          font-size: 12px;
          line-height: 15px;
          padding-left: 0;
        }
      }
      h1{
        font-size: 14px;
        font-weight: 500;
        background: #e6e6e6;
        padding-left: 18px;
        line-height: 2;
      }
      span{
        display: block;
        line-height: 36px;
        padding-left: 18px;

      }
    }
    .col2{
      width: 220px;
      height: 100%;
      overflow: auto;
      span{
        display: block;
        line-height: 36px;
        padding-left: 18px;

      }
    }
    .col3{
      width: 0;
      flex-grow: 1;
      height: 100%;
      overflow: auto;
      h1{
        font-size: 14px;
        font-weight: 500;
        background: #e6e6e6;
        padding-left: 18px;
        line-height: 2;

      }
      span{
        display: block;
        line-height: 36px;
        padding-left: 18px;

      }
    }
    .l1List{
      height: 100%;
      overflow: auto;
      width: 0;
      flex-grow: 1;
    }
    .ac{
      color:#fff;
      background: #f9823e;
    }
      span:hover{
      background: #e5e5e5;
    }
  }
</style>
