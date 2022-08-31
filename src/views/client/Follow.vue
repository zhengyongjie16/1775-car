<template>
  <div class="main">
    <navTag :title="title1" :isSub="isSub"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
        ref="scrollView"
      >
        <div class="item">
          <p>预算</p>
          <div class="budget">
            <input placeholder="10.00" v-model="minBudget" type="number">
            <i>—</i>
            <input placeholder="1000.00" v-model="maxBudget" type="number">
            <span>万</span>
          </div>
        </div>
        <div class="item mitem">
          <p>跟进方式</p>
          <div class="type" >
            <div class="lable" :class="{active:type==0}" @click="type=0">
              微信
            </div>
            <div class="lable" :class="{active:type==1}" @click="type=1">
              电话
            </div>
            <div class="lable" :class="{active:type==2}" @click="type=2">
              短信
            </div>
            <div class="lable" :class="{active:type==3}" @click="type=3">
              到店
            </div>
          </div>
        </div>
        <div class="remarks">
          <p>跟进记录</p>
          <textarea placeholder="本次跟进的目的及本次跟进的结果" v-model="followNote"></textarea>
        </div>
        <div class="item">
          <p>跟进状态</p>
          <div class="type" >
            <div class="lable" :class="{active:followState==0}" @click="followState=0">
              跟进中
            </div>
            <div class="lable" :class="{active:followState==1}" @click="followState=1">
              搁置
            </div>
            <div class="lable" :class="{active:followState==2}" @click="followState=2">
              预定
            </div>
            <div class="lable" :class="{active:followState==3}" @click="followState=3">
              成交
            </div>
          </div>
        </div>
        <div class="item aim">
          <p>意向车型</p>
          <div>
<!--            <input placeholder="若找不到对应车型，请在备注标注" type="text" disabled v-model="vehicleName">-->
<!--            <md-icon name="arrow-right"></md-icon>-->
                        <brandPicker  slot="right"  @change="handBrandChane" :defalut="brandFromVin" v-model="vehicle"></brandPicker>
          </div>
        </div>
      <div class="item aim">
        <p>店内匹配车型</p>
        <div @click="carCho = true">
          <input placeholder="若找不到对应车型，请在备注标注" type="text" disabled v-model="vehicleName">
          <md-icon name="arrow-right"></md-icon>
          <!--            <brandPicker  slot="right"  @change="handBrandChane" :defalut="brandFromVin" v-model="vehicle"></brandPicker>-->
        </div>
      </div>
        <div class="btn" @click="followClient">
          保存
        </div>
      </md-scroll-view>
    </div>

    <template>
      <md-date-picker
        :default-date="currentDate"
        :title="timeTitle"
        @confirm="onDatePickerConfirm"
        ref="datePicker"
        v-model="isDatePickerShow"
      ></md-date-picker>
      <md-picker
        :cols="1"
        :data="pickerData"
        @confirm="onPickerConfirm(1)"
        is-cascade
        large-radius
        ref="picker1"
        title="指派员工"
        v-model="isPickerShow1"
      ></md-picker>
      <md-picker
        :cols="1"
        :data="carListData"
        @confirm="pickerCar()"
        is-cascade
        large-radius
        ref="carPicker"
        title="选择车辆"
        v-model="carCho"
        :default-index="index"
      ></md-picker>
    </template>

    <!--  -->
  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import brandPicker from "../../components/mbrandPicker";
    export default {

        name: 'ClientFollow',
        data() {
            return {
                title1: '客户跟进',
                isShare: false,

                followremarks:"", //跟进结果
                isSub:false,
                moreData: false,  //是否展示更多资料
                comment: 0,  //手机同步微信 0是1否
                sex: 0,     //性别，0男1女
                isPickerShow1: false,
                pickerData: [
                    [
                        {
                            // 选项展示文案
                            'text': '未找到客户',
                            // 以下自定义字段
                            'value': ''
                        },
                    ],
                ],  //地址选择器数据源
                pickerValue1: '',   //地址
                remarks: '',      //备注
                datePickerValue:'',
                currentDate: new Date(),
                maxDate:'',
                isDatePickerShow: false,
                timeTitle: '购买日期',      //时间插件标题

                minBudget:'',   //最小价格
                maxBudget:'',  //最大价格
                type: 0,    // 跟进方式
                followNote: '',  // 跟进备注
                followState: 0,  // 跟进状态
                vehicle:'',   // 意向车型id
                carListData: [],  //公司包含的汽车
                carCho: false,
                vehicleName:'',
                brandFromVin: [],
                brandId:'',
                carId:'',  // 店内匹配车型
                index:[]
            };
        },
        components: {
            navTag,
            brandPicker,
        },
        created(){
            this.getCarofCompany();
            this.carId = this.$route.query.carId;
            this.vehicleName = this.$route.query.vehicleName;
        },
        watch: {
            newVin(nv) {
                const _res = nv.split(',');
                this.brandFromVin = _res;
            },
        },

        methods: {
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
            choTime() {
                this.isDatePickerShow = true;
            },
            onPickerConfirm(index) {
                const values = this.$refs[`picker${index}`].getColumnValues();
                let res = '';
                values.forEach(value => {
                    value && (res += `${value.text || value.label} `);
                });
                this[`pickerValue${index}`] = res;
            },
            async followClient(){
                let minBudget= this.minBudget;   //最小价格
                let maxBudget = this.maxBudget;  //最大价格
                let type = this.type;    // 跟进方式
                let followNote = this.followNote;  // 跟进备注
                if (!followNote) return this.$toast.info('请输入备注');
                let followState = this.followState;  // 跟进状态
                let vehicle = this.vehicle;   // 意向车型id
                let carId = this.carId
                let res = await this.$api.post('/bus/client/followClient',{
                    minBudget,  maxBudget, type, followNote,  followState, vehicle,
                    carId,
                    id: this.$route.query.id,
                    companyId: this.$route.query.companyId,
                    sellMan: this.$route.query.sellMan,
                    followType: this.type,
                })
                let { success, data } = res.data
                if(!success) return this.$toast.info('保存错误，请重新保存');
                this.$toast.info('保存成功');
                this.$router.go(-1)
            },
            //  品牌选择插件
            handBrandChane(r) {
                this.title = r;
            },
            async getCarofCompany(){
                let res = await this.$api.get('/car/getCompanyList', {
                    params:{
                        companyId: this.$store.state.company.id,
                    }
                })
                let { success, data, info } = res.data
                if(!success) return this.$toast.info(info);
                let arr = []
                for(const item of data){
                    arr.push({
                        value: item.id,
                        text: item.title,
                    })
                }
                return this.carListData=[arr]
            },
            pickerCar(){
                const values = this.$refs[`carPicker`].getColumnValues();
                let res = '';
                values.forEach(value => {
                    value && (res += `${value.text || value.label} `);
                });
                this.vehicleName = values[0].text;
                this.carId = values[0].value;
            }
        }
    };
</script>
<style lang="scss" scoped>
  .main {
    background: #fff;
  }
  input, textarea {
    background: #f7f7f7;
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
  .m220{
    margin-top: vw(220);}
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: vw(100);
    background: #f7f7f7;
    border-radius: 16px;
    margin-bottom: 16px;
    box-sizing: border-box;
    padding: 0 20px;
    .type{
      width:vw(324);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: vw(20) 0;
      box-sizing: border-box;
      .lable{
        width: vw(124);
        margin-right: vw(40);
        height: vw(60);
        border-radius: vw(8);
        border: 1px solid rgba(153,153,153,1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: vw(28);
        color: #999;
        position: relative;
        background: #fff;
      }
      .lable:nth-child(2n+2){
        margin-right: 0;
      }
      .lable:first-child,.lable:nth-child(2){
        margin-bottom: vw(20);
      }
      .lable.active{
        border-color: #FF3434;
        color: #FF3434;
      }
      .lable.active::after{
        content: '';
        width: 0;
        height: 0;
        border-width: 0 vw(28) vw(28) 0;
        border-style: solid;
        border-color: transparent #FF3434;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .twidth{
      width: 70%;
      .lable{
        margin-bottom: 0!important;
      }
      .lable:nth-child(3){
        margin: 0;
      }
      .lable:nth-child(2){
        margin-right: vw(40);
      }

    }
    p {
      height: vw(28);
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
    }

    input {
      border: none;
      color: #333;
      font-size: vw(28);
      height: vw(46);
      line-height: vw(28);
      width: 70%;
      text-align: right;
      outline: none;
    }

    div {
      display: flex;
      align-items: center;
      width: 60%;
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

    .budget {
      input {
        min-width: vw(122);
        flex-grow: 0;
      }

      i {
        margin: 0 vw(20);
      }
      span{
        font-size: 28px;
        margin-left: 20px;
        color: #333;
      }
    }
  }


  .aim {
    div {
      width: 70%;
    }
  }

  .moreData {
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
      border: 1px solid rgba(0, 0, 0, 0);
      border-radius: vw(16);
      box-sizing: border-box;
      resize: none;
      outline: none;
      word-break: break-all;
      margin-bottom: 16px;
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
    margin: vw(40) auto vw(40);
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
