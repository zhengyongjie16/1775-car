<template>
  <div class="main">
    <navTag title="添加客户" :isSub="isSub"></navTag>
    <div class="content">
<!--      <md-scroll-view-->
<!--        :scrolling-x="false"-->
<!--        auto-reflow-->
<!--        ref="scrollView"-->
<!--      >-->
        <div class="item">
          <p>销售归属</p>
          <div @click="isPickerShow1 = true">
            <input disabled placeholder="指派员工" type="text" v-model="pickerValue1">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>

        <div class="item">
          <p>客户姓名</p>
          <input placeholder="请输入姓名" type="text" v-model="cusName">
        </div>
        <div class="item">
          <p>手机号码</p>
          <input placeholder="请输入手机号码" type="number" v-model="phoneNum">
        </div>
        <div class="item">
          <p>微信手机是否同步</p>
          <div class="type">
            <div :class="{active:isWechat==0}" @click="isWechat=0" class="check lable">
              是
            </div>
            <div :class="{active:isWechat==1}" @click="isWechat=1" class="check lable">
              否
            </div>
          </div>
        </div>
        <div class="item">
          <p>性别</p>
          <div class="type">
            <div :class="{active:sex==0}" @click="sex=0" class="check lable">
              男
            </div>
            <div :class="{active:sex==1}" @click="sex=1" class="check lable">
              女
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <p>年龄</p>
            <input placeholder="请输入年龄" type="number" v-model="age">
          </div>
          <div class="item">
            <p>职业</p>
            <input placeholder="请输入职业" type="text" v-model="job">
          </div>
          <div class="item">
            <p>常驻地</p>
            <input placeholder="请输入常驻地" type="text" v-model="address">
          </div>
        </div>

        <div class="item">
          <p>预算</p>
          <div class="budget">
            <input placeholder="最小价格" type="number" v-model="minBudget">
            <i>—</i>
            <input placeholder="最大价格" type="number" v-model="maxBudget">
            <span>万</span>
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
          <input placeholder="请选择" type="text" disabled v-model="vehicleName">
          <md-icon name="arrow-right"></md-icon>
          <!--            <brandPicker  slot="right"  @change="handBrandChane" :defalut="brandFromVin" v-model="vehicle"></brandPicker>-->
        </div>
      </div>
<!--        <div class="item aim">-->
<!--          <p>预计购买日期</p>-->
<!--          <div @click="choTime()">-->
<!--            <input disabled placeholder="请选择" type="text" v-model="datePickerValue">-->
<!--            <md-icon name="arrow-right"></md-icon>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="remarks">-->
<!--          <p>备注</p>-->
<!--          <textarea placeholder="输入其他需求" v-model="remarks"></textarea>-->
<!--        </div>-->
        <div class="item">
          <p>跟进方式</p>
          <div class="type followType">
            <div class="lable" :class="{active:followType==0}" @click="followType=0">
              微信
            </div>
            <div class="lable" :class="{active:followType==1}" @click="followType=1">
              电话
            </div>
            <div class="lable" :class="{active:followType==2}" @click="followType=2">
               短息
            </div>
          </div>
        </div>
        <div class="remarks">
          <p>跟进记录</p>
          <textarea placeholder="本次跟进的目的及本次跟进的结果" v-model="followNote"></textarea>
        </div>
        <div class="item btor istate">
          <p>跟进状态</p>
          <div class="type">
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


        <div class="btn" @click="addClient">
          保存
        </div>
<!--      </md-scroll-view>-->
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
      ></md-picker>
    </template>
  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import brandPicker from "../../components/mbrandPicker";
    import { Toast } from 'mand-mobile';
    import { check } from '../../assets/js/js'
    export default {

        name: 'addClient',
        data() {
            return {
                title: '添加客户',
                isShare: false,
                type:1,
                isSub:false,
                moreData: false,  //是否展示更多资料
                isPickerShow1: false,
                pickerValue1: '',   //地址
                remarks: '',      //备注
                datePickerValue:'',
                currentDate: new Date(),
                maxDate:'',
                isDatePickerShow: false,
                timeTitle: '购买日期',      //时间插件标题
                pickerData:[],
                sellMan:'',
                cusName:'',
                isWechat: 0,  //手机同步微信 0是1否
                sex: 0,     //性别，0男1女
                phoneNum:'', //客户电话
                age: '', //年龄
                job: '', // 客户职业
                address: '', //客户地址
                minBudget:'', // 最小预算
                maxBudget:'', //最大预算
                vehicleList:'',   //意向车型
                vehicleName:'',
                vehicle: '',    //意向车型
                shopVehicle: '', //店内推荐车型
                followState: 0,  //跟进状态，0跟进中，1搁置，2预定，3成交
                followType: 0,  //跟进方式，0微信，1电话，3短息
                followNote:'',  //跟进记录
                brandFromVin: [], //车牌
                carListData: [],  //公司包含的汽车
                carCho: false,
                carId:'', //本店匹配车型
            };
        },
        components: {
            navTag,brandPicker,
        },
        created(){
          this.getSubAccount();
          this.getCarofCompany()
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
                this.sellMan = values[0].value;
            },
            async getSubAccount(){
                console.log(this.$store.state.company.id)
                 let res = await this.$api.get('/bus/company/findSubAccount',{
                     params:{
                         companyId: this.$store.state.company.id
                     }
                 });
                 let { success,data } = res.data
                 if(!success) return Toast.info('加载员工失败')
                 let arr = []
                 for(const item of data){
                     arr.push({
                         value: item.id,
                         text: item.lxName,
                     })
                 }
                 return this.pickerData=[arr]
            },
            async addClient(){
                let sellMan = this.sellMan
                console.log(99999999999,sellMan)
                if(!sellMan) return Toast.info('请选择员工',2000);
                let companyId = this.$store.state.company.id;
                let cusName = this.cusName;
                if(!cusName) return Toast.info('请输入客户名字',2000);
                let phoneNum = this.phoneNum
                if(!phoneNum) return Toast.info('请输入客户电话',2000);
                if(!check(this.phoneNum)) return this.$toast.info('请输入正确的手机号',2000);
                let isWechat = this.isWechat;
                let sex = this.sex;
                let age = this.age;
                let job = this.job;
                let address = this.address;
                let minBudget = this.minBudget;
                let maxBudget = this.maxBudget;
                let vehicle = this.vehicle;
                let followState = this.followState;
                let followNote = this.followNote;
                let followType = this.followType;
                let carId = this.carId;
                let res = await this.$api.post('/bus/client/addClient',{
                    sellMan,
                    companyId,cusName,phoneNum,isWechat,sex,age,job,address,
                    minBudget,maxBudget,followState,
                    followNote,followType,
                    vehicle,carId,
                })
                let { success,info} = res.data
                if(!success) return Toast.info(info);
                Toast.info('添加成功');
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
                console.log(this.vehicle)
            }
        }
    };
</script>
<style lang="scss" scoped>
  .main{
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .btor{
    margin-top: vw(32);
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: vw(100);
    /*border-bottom: 1px solid rgba(0, 0, 0, 0.1);*/
    border-radius: 16px;
    background: #F7F7F7;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    .type{
      width:vw(324);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: vw(32) 0;
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
    .followType {
      width: vw(520);
      .lable{margin: 0!important;margin-left: vw(40)!important;}
    }

    p {
      height: vw(28);
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
      margin-left: 4px;
      font-weight: bold;
    }

    input {
      border: none;
      color: #333;
      font-size: vw(28);
      height: vw(100);
      line-height: vw(100);
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
        /*margin-left: vw(40);*/
        width: auto;
        font-size: vw(28);
        color: #999;
        width: 124px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 8px;
        margin-bottom: 0!important;
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
        color: #FF3434 ;
        border-color: #FF3434;
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
        text-align: center;
      }

      i {
        margin: 0 vw(20);
      }
      span{
        margin-left: 20px;
        font-size: 28px;
        color: #333;

      }
    }
  }
  .item:first-child{
    margin-top: 16px;
  }
  .item.istate{
    min-height: 180px;
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
      padding: vw(34) vw(22);
      font-size: vw(28);
      color: #666;
      font-weight: bold;
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
    width: vw(688);
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
