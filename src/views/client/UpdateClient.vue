<template>
  <div class="main">
    <navTag :title="title" :isSub="isSub"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="item">
          <p>销售归属</p>
          <div @click="isPickerShow1 = true">
            <input disabled placeholder="指派员工" type="text" v-model="sellName">
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
          <div>
            <div :class="{active:isWechat==0}" @click="isWechat=0" class="check">
              是
            </div>
            <div :class="{active:isWechat==1}" @click="isWechat=1" class="check">
              否
            </div>
          </div>
        </div>
        <div class="item">
          <p>性别</p>
          <div>
            <div :class="{active:sex==0}" @click="sex=0" class="check">
              男
            </div>
            <div :class="{active:sex==1}" @click="sex=1" class="check">
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

        <div class="btn" @click="updateClient">
          保存
        </div>
      </md-scroll-view>
    </div>


    <template>
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

    </template>
  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import { Toast } from 'mand-mobile';
    import { check } from "../../assets/js/js";
    export default {

        name: 'addClient',
        data() {
            return {
                title: '客户资料',
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
                sellName:''
            };
        },
        components: {
            navTag,
        },
        created(){
          this.getSubAccount();
          this.getClientInfo()
        },
        methods: {

            onPickerConfirm(index) {
                const values = this.$refs[`picker${index}`].getColumnValues();
                let res = '';
                values.forEach(value => {
                    value && (res += `${value.text || value.label} `);
                });
                this.sellName = res;
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
            async updateClient(){
                let sellMan = this.sellMan
                if(!sellMan) return Toast.info('请选择员工');
                let companyId = this.$store.state.company.id;
                let cusName = this.cusName;
                if(!cusName) return Toast.info('请输入客户名字');
                let phoneNum = this.phoneNum
                if(!phoneNum) return Toast.info('请输入客户电话');
                if(!check(this.phoneNum)) return this.$toast.info('请输入正确的手机号',2000);
                let isWechat = this.isWechat;
                let sex = this.sex;
                let age = this.age;
                let job = this.job;
                let address = this.address;
                let minBudget = this.minBudget;
                let maxBudget = this.maxBudget;
                let res = await this.$api.post('/bus/client/updateClient',{
                    id:this.$route.query.id,
                    sellMan,
                    companyId,cusName,phoneNum,isWechat,sex,age,job,address,
                    minBudget,maxBudget,
                })
                let { success,info} = res.data
                if(!success) return Toast.info(info);
                Toast.info(info);
                this.$router.go(-1)
            },
            async getClientInfo() {
                let res = await this.$api.get('/bus/client/getClientInfo', {
                    params: {
                        id: this.$route.query.id,
                        companyId: this.$route.query.companyId,
                    }
                });
                console.log(res);
                let {success, data} = res.data;
                if (!success) return this.$toast.info('资料加载失败');
                this.info = data;
                this.sellName = data.subAccount.lxName;
                this.sellMan = data.subAccount.id;
                this.cusName = data.cusName;
                this.phoneNum  = data.phoneNum
                this.isWechat = data.isWechat
                this.sex = data.sex
                this.age = data.age
                this.job = data.job
                this.address =data.address;
                this.minBudget = data.minBudget;
                this.maxBudget = data.maxBudget;
            },
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
        width: 124px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 8px;
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
    margin: vw(208) auto vw(40);
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
