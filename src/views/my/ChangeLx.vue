<template>
  <div class="main">
    <navTag :title="title" :isSub="isSub"></navTag>
    <div class="content">
      <div class="body">
        <div class="item">
          <p>联系人姓名</p>
          <input placeholder="请输入联系人姓名" v-model="lxName" @focus="isFous=true" @blur="isFous=false" type="text">
        </div>
        <div class="item">
          <p>联系电话</p>
          <input placeholder="请输入联系电话" v-model="lxPhone" @focus="isFous=true" @blur="isFous=false" type="text">
        </div>
        <div class="item">
          <p>账号手机验证码</p>
          <div class="code">
            <input placeholder="输入验证码" v-model="code" @focus="isFous=true" @blur="isFous=false" type="text">
            <i>|</i>
            <span :class="{act:isCode}" @click="getCode">{{codeTxt}}</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="btn" @click="changeLxName" >确认修改</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { check } from '../../assets/js/js'
  export default {

    name: 'Registered',
    data() {
      return {
        title: '设置联系人',
        isShare: false,
        isSub:false,

        isCode: false,
        codeTxt: '获取验证码',
        pwType: 'password',
        pwIcon: 'invisible',
        isFous:false,
          code:'',
        lxName:'',
        lxPhone:'',
        screenHeight: document.documentElement.clientHeight, // 屏幕高度
        screenHeight1: document.documentElement.clientHeight, // 屏幕高度
      };
    },
    components: {},
      created(){
        this.type = this.$route.query.type
      },
    mounted(){
       window.onresize = ()=> { // 定义窗口大小变更通知事件
           this.screenHeight1 = document.body.clientHeight || window.screen.height; // 窗口高度
       }
    },
    watch: {
      isFous:(value)=>{
        if(value){
          let inputs= document.querySelectorAll('input')
          for (const item of inputs) {
            item.addEventListener('focus', (event) => {
              event.target.scrollIntoView(true);
            });
          }
        }
      }
    },
    methods: {
      async getCode() {
        if (!this.isCode) {
          let time = 60;
          if(!this.lxPhone){
              this.$toast.info('请输入手机号',2000);
            return
          }
          if(!check(this.lxPhone)) return this.$toast.info('请输入正确的手机号',2000);
          let interval = setInterval(() => {
            if (time > 0) {
              time--;
              this.isCode = true;
              this.codeTxt = time + 's';
            } else {
              clearInterval(interval);
              this.codeTxt = '获取验证码';
              this.isCode = false;
            }
          }, 1000);
          let res = await this.$api.post('/common/getCode',{
              phone:this.lxPhone,
              type:'reg',
              date:Date.now()
          })
          let { success } =res.data
            console.log(success)
          if(!success){
            this.$toast.info('请重新发送');
            clearInterval(interval);
            this.codeTxt = '获取验证码';
            this.isCode = false;
          }
        }
      },
      changeType() {
        if (this.pwIcon === 'invisible') {
          this.pwIcon = 'visible';
          this.pwType = 'text';
        } else {
          this.pwIcon = 'invisible';
          this.pwType = 'password';
        }
      },
      onChange(check){
        this.checked=check
      },

      async changeLxName(){
         if(this.$store.state.ac.account) return this.$toast.info('您没有权限修改联系人！',1000);
         if(!this.lxName) return this.$toast.info('请输入联系人');
         if(!this.lxPhone) return this.$toast.info('请输入联系人号码');
         if(!check(this.lxPhone)) return this.$toast.info('请输入正确的手机号',2000);
         if(!this.code) return this.$toast.info('请输入验证码');
        let res = await this.$api.post('/bus/changeLxName',{
          lxName:this.lxName,
          lxPhone:this.lxPhone,
          code:this.code,
          companyId:this.$store.state.company.id,
        });
        let { success,info } = res.data;
        if(!success){
          this.$toast.info(info);
        }else {
          this.$toast.info(info);
          this.$router.go(-1);
        }
      }

    }
  };
</script>
<style lang="scss" scoped>
  .main {
    background: #fff;
  }
  input, textarea {
    background: #F7F7F7;
  }
  /* 主要内容 */
  .content {

    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .body {
    padding: 0 vw(36);
    height: 0;
    flex-grow: 1;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: vw(100);
    background: #F7F7F7;
    box-sizing: border-box;
    border-radius: vw(16);
    margin-bottom: vw(26);
    padding:0 vw(20) ;
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
      height:vw(100);
      line-height: vw(100);
      width: 70%;
      text-align: right;
      outline: none;
    }

    .code {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 0;
      flex-grow: 1;

      input {
        width: 0;
        flex-grow: 1;
      }

      i {
        margin: 0 vw(18);
        font-size: vw(28);
        color: rgba(0, 0, 0, 0.1);
      }

      span {
        display: block;
        font-size: vw(28);
        color: #34CCFF;
        width: vw(150);
        text-align: center;
      }

      span.act {
        color: #666;
      }
    }

    .pw {
      width: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      i {
        font-size: vw(28);
        margin-left: vw(20);
      }
    }
  }

  .item:first-child {
    margin-top: vw(20);
  }

  .mtop {
    margin-top: vw(84);
  }

  input::placeholder {
    color: #999;
  }

  .foot{
    text-align: center;
    p{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: vw(24);
      color: #666;
      >>>.md-agree-icon{
        width: vw(30);
        height: vw(30);
      }
      a{
        text-align: left;
        margin-left: vw(-10);
      }
      span{
        color: #34CCFF;
      }
      i{
        display: block;
        width: vw(40);
        height: vw(40);
        border-radius: vw(8);
        border: 1px solid rgba(0,0,0,0.1);
        box-sizing: border-box;
        margin-right: vw(20);
      }
    }
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
