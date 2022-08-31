<template>
  <div class="main">
    <navTag :title="title" :isSub="isSub" ></navTag>
    <div class="content">
      <div class="body">
        <div class="item">
          <p>手机号码</p>
          <input placeholder="输入手机号" v-model="phone" @focus="isFous=true" @blur="isFous=false" type="text">
        </div>
        <div class="item">
          <p>手机验证码</p>
          <div class="code">
            <input placeholder="输入验证码" v-model="code" @focus="isFous=true" @blur="isFous=false" type="text">
            <i>|</i>
            <span :class="{act:isCode}" @click="getCode">{{codeTxt}}</span>
          </div>
        </div>
        <div class="item">
          <p>登录密码</p>
          <div class="pw">
            <input :type="pwType" v-model="pwd" @focus="isFous=true" @blur="checkPw" placeholder="密码至少由五位英文或数字组成">
            <md-icon :name="pwIcon" @click="changeType"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>确认登录密码</p>
          <input placeholder="再次输入密码" v-model="pwd1" @focus="isFous=true" @blur="isFous=false"  type="password">
        </div>
      </div>
      <div class="foot" v-show="isFous==false">
        <p>
        <md-agree
          v-model="checked"
          @change="onChange(checked)"
        >
          <a>我已阅读并同意<span @click="$router.push({path:'/WorksDetail',query: {id:'22'}})">《1775实体车商网经销商服务协议》</span></a>
        </md-agree>
        </p>
        <div class="btn" @click="accountReg">确认注册</div>
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
        title: '注册',
        isShare: false,
        isSub:false,

        isCode: false,
        codeTxt: '获取验证码',
        pwType: 'password',
        pwIcon: 'invisible',
        isFous:false,

        phone:'',
        code:'',
        lxName:'',
        pwd:'',
        pwd1:'',
        checked:true,  // 是否选中，
        type:1,
        title1:'找回密码',
        showYC:false,
        screenHeight: document.documentElement.clientHeight || document.body.clientHeight || window.screen.height, // 屏幕高度
        screenHeight1: document.documentElement.clientHeight || document.body.clientHeight || window.screen.height, // 屏幕高度
      };
    },
    components: {},
      created(){
        this.type = this.$route.query.type
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

    mounted(){
       window.onresize = ()=> { // 定义窗口大小变更通知事件
          this.screenHeight1 = document.documentElement.clientHeight || document.body.clientHeight || window.screen.height; // 窗口高度
       }
    },
    methods: {
      async getCode() {
        if (!this.isCode) {
          let time = 60;
          if(!this.phone) return this.$toast.info('请输入手机号',2000);
          if(!check(this.phone)) return this.$toast.info('请输入正确的手机号',2000);
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
              phone:this.phone,
              type:'reg'
          })
          let { success } =res.data
          if(!success){
            this.$toast.info('获取验证码失败,请重新发送',2000);
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
      checkPw(){
         if(this.pwd.length<5){
           this.$toast.info('密码长度不能小于5',2000)
         }
         this.isFous=false
      },
      checkPw1(){
        if(this.pwd!==this.pwd1){
          this.$toast.info('密码不一致，请重新输入！',2000)
          this.pwd1=''
        }
      },
      async accountReg(){
        if(!this.phone){
           return this.$toast.info('请输入手机号',2000)
        }
        if(!check(this.phone)) return this.$toast.info('请输入正确的手机号',2000);
        if(!this.code){
            return this.$toast.info('请输入验证码',2000)
        }
        if(!this.pwd||!this.pwd1){
            return this.$toast.info('请输入密码',2000)
        }else{
            this.checkPw1()
        }
        if(!this.checked){
            return this.$toast.info('请阅读并勾选服务协议',2000)
        }
        let res = await this.$api.post('/bus/company/reg',{
          phone:this.phone,
          code:this.code,
          pwd:this.pwd
        });
        let { success,info } = res.data;
        if(!success){
          this.$toast.info(info,2000);
        }else {
          await this.$toast.info(info,200);
          this.$router.go(-1);
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  .main {
    background: #fff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  input, textarea {
    background: #F7F7F7;
  }
  /* 主要内容 */
  .content {
    display: flex;
    flex-direction: column;
    height: 0;
    min-height: 80vh;
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
      height: vw(28);
      height: vw(100);
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
