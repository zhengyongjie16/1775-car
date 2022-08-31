<template>
     <div class="brandZone">
       <el-button @click="showBox=!showBox" size="medium">
         {{str2? `${str2}/${str3}`:resStr}}  <i class="el-icon-arrow-down" :class="{s:showBox}"></i>
       </el-button>
       <div class="brandBox" v-show="showBox">
          <div class="col1">
            <div class="indexList">
              <md-scroll-view
                :scrolling-x="false"
                auto-reflow
              >
                <span :data-index="item"   v-for="item of charts" :key="item" @click="toView(item,$event)">{{item}}</span>

              </md-scroll-view>
            </div>
            <div class="l1List" ref="lv1">
              <md-scroll-view
                :scrolling-x="false"
                auto-reflow
              >
                <div v-for="item of col1Data"  :key="item.name">
                  <h1 :id="item.name"> {{item.name}} </h1>
                  <span v-for="sub of item.list" :id="`col1${sub.value}`" :key="sub.value" @click="loadLv2(sub,$event)">{{sub.label}}</span>
                </div>

              </md-scroll-view>
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
         <div class="olay2" @click="hide2"></div>
         <div class="olay3" @click="hide3"></div>
         <div class="closeBox" @click="showBox = false">完成</div>
       </div>

     </div>
</template>

<script>
import pinyin4js from 'pinyin4js';
import brandData from '@/brand'
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
    // this.getCol1();
    this.resStr = this.placeholder;
    this.col1Data = this.charts.split('').map(r => ({ name: r, list: [] }));
  },
  mounted(){
    this.getCol1();
  },
  methods: {
    async getCol1() {

      const _data = brandData.map(r=>r);
      this.baseBrandList = _data
      //  加上首字母先
      _data.forEach((r) => {
        const letter = pinyin4js.getShortPinyin(r.label)[0].toUpperCase();
        const _tem = this.col1Data.find(item => item.name === letter);

        if (_tem) {
          _tem.list.push(r);
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

      try{
        this.$toast.loading('亲!加载中....')
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
        this.$toast.hide()
        document.querySelector('.col2').style.right = '0';
        document.querySelector('.olay2').style.display = 'block';
      }catch (e) {
        this.$toast.info(e,1000)
      }finally {
        this.$toast.hide()
      }

    },
    async loadLv3(sub, ev) {
      this.str3 = sub.label ? sub.label : this.col2Data.find(r => r.value == sub.value).label;
      this.resArr = [this.resArr[0], sub.value];
      this.$emit('input', this.resArr);

      try{
        this.$toast.loading('亲!加载中....')
        await this.$api.get(`/getBrand?pid=${sub.value}&level=8`).then((res) => {
          const { success, data } = res.data;
          if (success) {
            this.col3Data = data;
            console.log(this.col3Data);
            //  激活样式
            const domac = document.querySelector('.col2 .ac');
            if (domac) domac.classList.remove('ac');
            document.getElementById(`col2${sub.value}`).classList.add('ac');
            document.querySelector('.col3').style.right = '0';
            document.querySelector('.olay3').style.display = 'block';
          }
        });
        this.$toast.hide()
      }catch (e) {
        this.$toast.info(e,1000)
      }finally {
        this.$toast.hide()
      }

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
      document.getElementById(chart).scrollIntoView(true);
    },
    hide2() {
      document.querySelector('.col2').style.right = '-75vw';
      document.querySelector('.olay2').style.display = 'none';
    },
    hide3() {
      document.querySelector('.col3').style.right = '-60vw';
      document.querySelector('.olay3').style.display = 'none';
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

  i{
    transform: rotate(0deg);
    transition: transform 200ms;
  }
  .s{
    transform: rotate(180deg);
  }
}
  .brandBox{
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: env(safe-area-inset-top);
    paddint-bottom: env(safe-area-inset-bottom);
    top:0;
    left:0;
    background: #fff;
    z-index: 999;
    display: flex;
    &>div{
        border-right:1px solid #000
     }
    .col1{
      width: 230px;
      display: flex;
      .indexList{
        width: 50px;
        background: #c8c8c8;
        text-align: center;
        cursor: pointer;
        span{
          display: block;
          font-size: 28px;
          line-height: 1.5;
          padding-left: 0;

        }
        span:first-child{
          margin-top: 20px;
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
        line-height: 50px;
        padding-left: 18px;

      }
    }


    .col2{
      z-index: 889;
      width: 75vw;
      position: absolute;
      right:-75vw;
      transition: right 200ms;
      top:0;
      height: 100%;
      overflow: scroll;
      background: #fff;
      box-shadow: 1px 3px 27px rgba(0,0,0,.5);
      span{
        display: block;
        line-height: 60px;
        padding-left: 18px;
      }
    }

    .col3{
      width: 60vw;
      height: 100%;
      overflow: scroll;
      position: absolute;
      z-index: 999;
      right:-60vw;
      background: #fff;
      box-shadow: 1px 3px 27px rgba(0,0,0,.5);
      h1{
        font-size: 14px;
        font-weight: 500;
        background: #e6e6e6;
        padding-left: 18px;
        line-height: 2;

      }
      span{
        display: block;
        line-height: 60px;
        padding-left: 18px;

      }
    }
    .l1List{
      height: 100vh;

      overflow: scroll;
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
.olay2{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.2);
  z-index: 888;
  display: none;
}
.olay3{
     position: fixed;
     top:0;
     left:0;
     width: 100%;
     height: 100%;
     background:rgba(0,0,0,.2);
     z-index: 998;
     display: none;
   }
  .col3{
    box-sizing: border-box;
    padding-top: env(safe-area-inset-top);
    paddint-bottom: env(safe-area-inset-bottom);
  }
  .col2{
    box-sizing: border-box;
    padding-top: env(safe-area-inset-top);
    paddint-bottom: env(safe-area-inset-bottom);
  }
  .closeBox{
    position: absolute;
    top:env(safe-area-inset-top);
    right:10px;
    z-index: 999999;
    padding:3px 5px;
    border: 1px solid #ccc;
    background: #fff;
    box-sizing: 1px 2px 1px #ccc;
  }
</style>
