<template>
  <div class="main">
    <navTag title="添加汽车" :isSub="isSub"></navTag>
    <div class="content">
      <!--      <md-scroll-view
              :scrolling-x="false"
              auto-reflow
              ref="scrollView"
            >-->
      <div class="img">
        <p class="name">上传车辆照片</p>
        <div class="tips">
          <span>*</span>上传图片数不小于6张，首张默认为封面图,可随时拖动调整图片 排列顺序。
        </div>
        <div class="list">
          <div class="tag">
            <div :key="index" class="imgTag" v-for="(item,index) in imgList">
              <md-icon name="clear"></md-icon>
              <img :src="item" alt="">
            </div>
            <div class="imgTag addTag">
              +
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <p><i>*</i>标题</p>
        <input placeholder="如未找到车型，请直接天于标题" type="text">
      </div>
      <div class="item">
        <p><i>*</i>品牌</p>
        <div>
          <brandPicker  slot="right"  @change="handBrandChane" :defalut="brandFromVin" style="display: inline-block;float:right" v-model="brandId"></brandPicker>
          <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
      <div class="item">
        <p>VIN</p>
        <input placeholder="不含I、O、Q" type="text">
      </div>
      <div class="item">
        <p><i>*</i>里程</p>
        <div>
          <input placeholder="请输入里程" type="text">
          <p>万公里</p>
        </div>
      </div>
      <div class="item">
        <p><i>*</i>上牌时间</p>
        <div @click="choTime(1)">
          <input disabled placeholder="请选择上牌时间" type="text" v-model="datePickerValue">
          <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
      <div class="item">
        <p><i>*</i>售价(万)</p>
        <input placeholder="请输入要出售的价格" type="number">
      </div>
      <p class="moreData" v-show="moreData==false" @click="moreData=true">更多资料</p>
      <div v-show="moreData==true">
        <div class="item">
          <p>变速箱</p>
          <div>
            <div :class="{active:gearShift==0}" @click="gearShift=0" class="check">
              <i><em></em></i>
              手动
            </div>
            <div :class="{active:gearShift==1}" @click="gearShift=1" class="check">
              <i><em></em></i>
              自动
            </div>
          </div>
        </div>
        <div class="item">
          <p>首付(万)</p>
          <input placeholder="请输入首付价格" type="number">
        </div>
        <div class="item">
          <p>月供(万)</p>
          <input placeholder="请输入月供价格" type="number">
        </div>
        <div class="item">
          <p>排量</p>
          <input placeholder="请输入排量" type="number">
        </div>
        <div class="item">
          <p>强交险</p>
          <div @click="choTime(2)">
            <input disabled placeholder="请选择强交险到期时间" type="text" v-model="strongTime">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>年检时间</p>
          <div @click="choTime(3)">
            <input disabled placeholder="请选择下次年检时间" type="text" v-model="checkTime">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>保养记录</p>
          <div class="cho">
            <span :class="{active:fix==0}" @click="fix=0"> 4S定期保养 </span>
            <span :class="{active:fix==1}" @click="fix=1"> 非4S定期保养 </span>
          </div>
        </div>
        <div class="item">
          <p>展示地址</p>
          <div @click="isPickerShow1 = true">
            <input disabled placeholder="请选择城市" type="text" v-model="pickerValue1">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>是否批发</p>
          <div>
            <div :class="{active:wholesale==0}" @click="wholesale=0" class="check">
              <i><em></em></i>
              是
            </div>
            <div :class="{active:wholesale==1}" @click="wholesale=1" class="check">
              <i><em></em></i>
              否
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <p><i>*</i>在库状态</p>
        <div class="state">
          <span :class="{active:state==0}" @click="state=0"> 在厅 </span>
          <span :class="{active:state==1}" @click="state=1"> 在途 </span>
          <span :class="{active:state==2}" @click="state=2"> 整备 </span>
          <span :class="{active:state==3}" @click="state=3"> 在售 </span>
        </div>
      </div>
      <div class="item">
        <p><i>*</i>车身颜色</p>
        <div class="color">
          <span :class="{active:color==0}" @click="color=0" class="black"> 黑色 </span>
          <span :class="{active:color==1}" @click="color=1" class="white"> 白色 </span>
          <span :class="{active:color==2}" @click="color=2" class="grey"> 银灰色 </span>
          <span :class="{active:color==3}" @click="color=3" class="red"> 红色 </span>
          <span :class="{active:color==4}" @click="color=4" class="dgrey"> 深灰色 </span>
          <span :class="{active:color==5}" @click="color=5" class="blue"> 蓝色 </span>
          <span :class="{active:color==6}" @click="color=6" class="champagne"> 香槟色 </span>
          <span :class="{active:color==7}" @click="color=7" class="brown"> 棕色 </span>
          <span :class="{active:color==8}" @click="color=8" class="yellow"> 黄色 </span>
          <span :class="{active:color==9}" @click="color=9" class="green"> 绿色 </span>
          <span :class="{active:color==10}" @click="color=10" class="orange"> 橙色 </span>
          <span :class="{active:color==11}" @click="color=11" class="purple"> 紫色 </span>
          <span :class="{active:color==12}" @click="color=12"> 银灰色 </span>
        </div>
      </div>
      <div class="remarks">
        <p>备注</p>
        <textarea placeholder="输入其他需求" v-model="question"></textarea>
      </div>
      <div class="btn">
        确认发布
      </div>
      <!--      </md-scroll-view>-->
    </div>


    <!--     时间组件-->
    <template>
      <md-date-picker
        :default-date="currentDate"
        :max-date="maxDate"
        :title="timeTitle"
        @confirm="onDatePickerConfirm"
        ref="datePicker"
        v-model="isDatePickerShow"
      ></md-date-picker>

      <md-picker
        :cols="3"
        :data="pickerData1"
        @confirm="onPickerConfirm(1)"
        is-cascade
        large-radius
        ref="picker1"
        title="选择地址"
        v-model="isPickerShow1"
      ></md-picker>
    </template>

    <!--  -->
  </div>
</template>

<script>
  import navTag from '../../component/navTag';
  import district from 'mand-mobile/components/picker/demo/data/district';

  export default {

    name: 'addCar',
    data() {
      return {
        title: '',
        isShare: false,
        isSub:false,
        question: '',
        height: 6,
        imgList: [
          'https://fakeimg.pl/250x250/',
          'https://fakeimg.pl/250x250/',
        ],
        currentDate: new Date(),
        maxDate: new Date(),
        isDatePickerShow: false,
        timeTitle: '',      //时间插件标题
        datePickerValue: '',  //上牌时间
        moreData:false,  //是否展示更多资料
        gearShift: 0,   //0为手动，1为自动
        wholesale: 0,   //是否批发 0是 1否
        fix: 0,         //是否定期保养 0定期保养 1 非定期
        state: 0,       //在库状态 0在厅1在途2整备3在售
        color: 0,       //颜色 依次为黑色、白色、银灰色、红色、深灰色、蓝色、香槟色、棕色、黄色、绿色、橙色、紫色
        timeType: '',   //1.上牌时间 2.强交险时间 3.下次年检时间
        strongTime: '',  //强交险时间
        checkTime: '',    //年检时间
        isPickerShow1: false,
        pickerData1: district,  //地址选择器数据源
        pickerValue1: '',   //地址
        brandId:'', // 品牌id
        brandFromVin: [],
        props: {
          lazy: true,
          lazyLoad: (node, resolve) => {
            const { level, value } = node;
            console.log(node);
            if (level === 0) { // 第一次获取主品牌
              this.$api.get('/getBrand?pid=0').then((res) => {
                const { success, data } = res.data;
                if (success) {
                  resolve(data);
                }
              });
            }
            if (level === 1 || level === 2) {
              this.temPid = node.value;
              this.temBrand = [];//  重置临时品牌id
              this.$api.get(`/getBrand?pid=${value}&level=${level}`).then((res) => {
                const { success, data } = res.data;
                if (success) {
                  resolve(data);
                }
              });
            }
            if (level === 3) {
              this.$api.get(`/getBrand?pid=${this.temPid}&level=${level}&year=${value}`).then((res) => {
                const { success, data } = res.data;
                this.temBrand = data;
                if (success) {
                  resolve(data);
                }
              });
            }
            if (level === 4) {
              this.title = node.label;
            }
          },
        },
      };
    },
    components: {
      navTag
    },
    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      question: function (newQuestion) {
        if (newQuestion.length > 12) {
          // console.log(newQuestion.length%12)
          this.height = (Math.ceil(newQuestion.length / 12)) * 5.5;
        }
      }
    },
    methods: {
      handBrandChane(r) {
        this.title = r;
      },
      onDatePickerConfirm() {
        // console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
        this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
        if (this.timeType == 1) {
          this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
        } else if (this.timeType == 2) {
          this.strongTime = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
        } else {
          this.checkTime = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
        }
      },
      choTime(key) {
        //key=1上牌时间 =2强交险到期时间 =3下次年检时间
        this.isDatePickerShow = true;
        this.timeType = key;
        if (key == 3) {
          this.maxDate = '';
          this.timeTitle = '下次年检时间';
        } else if (key == 2) {
          this.maxDate = '';
          this.timeTitle = '强交险到期时间';
        } else {
          this.maxDate = new Date();
          this.timeTitle = '上牌时间';
        }
      },
      onPickerConfirm(index) {
        const values = this.$refs[`picker${index}`].getColumnValues();
        let res = '';
        values.forEach(value => {
          value && (res += `${value.text || value.label} `);
        });
        this[`pickerValue${index}`] = res;
      },
    }
  };
</script>
<style lang="scss" scoped>
  .main, input, textarea {
    background: #f0f2f5;
  }

  /* 主要内容 */
  .content {
    padding: 0 vw(36);
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .img {
    padding-top: vw(52);

    .name {
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
    }

    .tips {
      padding: vw(24) 0 vw(16);
      font-size: vw(24);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: vw(36);

      span {
        color: rgba(213, 32, 2, 1);
      }
    }
  }

  .tag {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: vw(44);

    .imgTag {
      width: vw(210);
      height: vw(210);
      margin-right: vw(22);
      border-radius: vw(16);
      position: relative;
      overflow: hidden;
      margin-top: vw(16);

      img {
        width: 100%;
        height: 100%;
      }

      i {
        position: absolute;
        z-index: 9;
        font-size: vw(34);
        color: rgba(0, 0, 0, 0.2);
        top: vw(14);
        right: vw(14);
      }
    }

    .imgTag:nth-child(3n+3) {
      margin-right: 0;
    }

    .addTag {
      border: 1px dashed #999;
      width: vw(208);
      height: vw(208);
      text-align: center;
      line-height: vw(210);
      color: #999;
      font-size: vw(84);
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: vw(100);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    p {
      height: vw(28);
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);

      i {
        color: #d52002;
      }
    }

    input {
      border: none;
      color: #333;
      font-size: vw(28);
      height: vw(28);
      line-height: vw(28);
      width: 70%;
      text-align: right;
      outline: none;
    }

    div {
      display: flex;
      align-items: center;
      width: 80%;
      justify-content: flex-end;

      input {
        width: 0;
        flex-grow: 1;
      }

      p {
        margin-left: vw(20);
        text-align: right;
        margin-top: vw(5);
      }

      i {
        font-size: vw(16) !important;
        color: #999;
        margin-left: vw(12);
        line-height: vw(18);
      }

      .check {
        display: flex;
        align-items: center;
        margin-left: vw(40);
        width: auto;
        font-size: vw(28);
        color: #999;

        i {
          display: block;
          width: vw(32);
          height: vw(32);
          border: 1px solid #999;
          margin-right: vw(20);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          em {
            display: block;
            width: vw(24);
            height: vw(24);
            border-radius: vw(24);
          }

        }
      }

      .active {
        i {
          border-color: #D52002;

          em {
            background: #D52002;
          }
        }
      }
    }

    .cho {
      span {
        display: block;
        margin-left: vw(28);
        width: vw(218);
        height: vw(60);
        border: 1px solid #999;
        text-align: center;
        line-height: vw(60);
        border-radius: vw(8);
        position: relative;
        font-size: vw(28);
        color: #999;
        overflow: hidden;
      }

      span.active {
        border-color: #d52002;
        color: #D52002;
      }

      span.active::after {
        content: '';
        width: 0;
        height: 0;
        border-width: 0 vw(28) vw(28) 0;
        border-style: solid;
        border-color: transparent #d52002;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .state {
      width: vw(320);
      display: flex;
      flex-wrap: wrap;
      padding-bottom: vw(20);

      span {
        display: block;
        width: vw(124);
        height: vw(60);
        border: 1px solid #999;
        border-radius: vw(8);
        text-align: center;
        line-height: vw(60);
        margin-left: vw(40);
        font-size: vw(28);
        color: #999;
        margin-top: vw(20);
        position: relative;
        overflow: hidden;
      }

      span:nth-child(2n+1) {
        margin-left: 0;
      }

      span.active {
        color: #d52002;
        border-color: #D52002;
      }

      span.active::after {
        content: '';
        width: 0;
        height: 0;
        border-width: 0 vw(28) vw(28) 0;
        border-style: solid;
        border-color: transparent #d52002;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .color {
      width: vw(480);
      padding-bottom: vw(20);
      display: flex;
      flex-wrap: wrap;

      span {
        display: block;
        width: vw(124);
        height: vw(60);
        line-height: vw(60);
        text-align: center;
        font-size: vw(28);
        border: 1px solid #999;
        border-radius: vw(8);
        overflow: hidden;
        position: relative;
        margin-left: vw(40);
        margin-top: vw(20);
      }

      span:nth-child(3n+1) {
        margin-left: 0;
      }

      span.black {
        background: #000;
        color: #fff;
      }

      span.white {
        background: #fff;
        color: #999;
      }

      span.grey {
        background: #C1C2C4;
        color: #fff;
      }

      span.red {
        background: #C70C01;
        color: #fff;
      }

      span.dgrey {
        background: #585858;
        color: #fff;
      }

      span.blue {
        background: #024D98;
        color: #fff;
      }

      span.champagne {
        background: #CD8034;
        color: #fff;
      }

      span.brown {
        background: #48280B;
        color: #fff;
      }

      span.yellow {
        background: #EBE41B;
        color: #fff;
      }

      span.green {
        background: #009947;
        color: #fff;
      }

      span.orange {
        background: #E94034;
        color: #fff;
      }

      span.purple {
        background: #4F314F;
        color: #fff;
      }

      span.active {
        border-color: #d52002;
        /*color: #D52002;*/
      }

      span.active::after {
        content: '';
        width: 0;
        height: 0;
        border-width: 0 vw(28) vw(28) 0;
        border-style: solid;
        border-color: transparent #d52002;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .moreData{
    text-align: right;
    margin-top: vw(20);
    margin-bottom: vw(60);
    font-size: vw(24);
    color: #34CCFF;
  }
  .remarks {
    p {
      padding: vw(34) 0;
      font-size: vw(28);
      color: #666;
    }

    textarea {
      width: 100%;
      height: vw(234);
      padding: vw(20);
      color: #333;
      font-size: vw(28);
      line-height: vw(42);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: vw(16);
      box-sizing: border-box;
      resize: none;
      outline: none;
      word-break: break-all;
    }
  }

  input::placeholder {
    color: #999;
  }

  .btn {
    width: vw(512);
    height: vw(80);
    background: #FF3434;
    border-radius: vw(16);
    margin: vw(120) auto vw(40);
    line-height: vw(80);
    text-align: center;
    color: #fff;
    font-size: vw(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  /*  时间选择样式 */
  .md-popup-title-bar .title-bar-title p.title {
    font-size: vw(40);
  }
</style>
