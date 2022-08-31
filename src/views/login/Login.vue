<template>
  <div class="main">
    <div class="content" :class="{up:isFous}">
      <div class="logo" v-show="hideLogo">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div v-show="type==1">
        <div class="list">
          <div class="item">
            <p>账号</p>
            <input type="text" @focus="isFous=true" @blur="isFous=false" placeholder="请输入账号" v-model="phone">
          </div>
          <div class="item">
            <p>密码</p>
            <input type="password" @focus="isFous=true" @blur="isFous=false" placeholder="请输入密码" v-model="pwd">
          </div>
        </div>
        <p class="type" @click="type=2">短信验证码登录</p>
      </div>
      <div v-show="type==2">
        <div class="list">
          <div class="item">
            <p>手机号</p>
            <input type="number" @focus="isFous=true" @blur="isFous=false" placeholder="请输入账号" v-model="phone">
          </div>
          <div class="item">
            <p>验证码</p>
            <input class="codeInput" type="number" @focus="isFous=true" @blur="isFous=false" placeholder="验证码" v-model="code">
            <div class="code" :class="{grey:code}" @click="takeCode">{{codeTxt}}</div>
          </div>
        </div>
        <p class="type" @click="type=1">账号密码登录</p>
      </div>
      <div class="btn" :class="{upBtn:isFous}" @click="login">登录</div>
      <div class="agreement">
      <md-agree
        v-model="checked"
      >
        <p>我已阅读并同意 <span style="color:#34CCFF"  @click="$router.push({path:'/WorksDetail',query: {id:'22'}})">《用户使用协议》</span>、<span style="color:#34CCFF" @click="$router.push({path:'/WorksDetail',query: {id:'55'}})">《隐私权条款》</span></p>
      </md-agree>
      </div>
<!--      <p class="register" v-show="isFous">-->
<!--        <span><router-link :to="{ path: '/Register', query: { type: 1}}">注册账号</router-link> </span>-->
<!--        <span><router-link :to="{ path: '/Register', query: { type: 2}}">找回密码</router-link> </span>-->
<!--      </p>-->
    </div>
    <div class="foot" :class="{upFoot:isFous}">
      <div class="cho">
        <span><router-link :to="{ path: '/Registered'}">注册账号</router-link> </span>
        <span><router-link :to="{ path: '/Pwd' }">找回密码</router-link></span>
      </div>
    </div>
    <!--    隐私条款  -->
    <md-landscape v-model="showYC" full-screen class="yc">
      <h1>用户协议与隐私政策</h1>
      <p>本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有
        个性化的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但
        本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，
        在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。
        本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您
        已经同意本隐私权政策全部内容。本隐私权政策属于本软件服务使用协议不可分
        割的一部分。</p>
      <h5>1.适用范围</h5>
      <p>a)在您使用本软件网络服务，本软件自动接收并记录的您的手机上的信息，包括
        但不限于您的健康数据、使用的语言、访问日期和时间、软硬件特征信息及您需
        求的网页记录等数据；</p>
      <h5>2.信息的使用</h5>
      <p>     a)在获得您的数据之后，本软件会将其上传至服务器，以生成您的使用数据，以
        便您能够更好地使用服务。</p>

      <h5>3.信息披露</h5>
      <p>a)本软件不会将您的信息披露给不受信任的第三方。</p>
      <p>b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法
        机构披露；</p>
      <p>   c)如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露；</p>

      <h5>4.信息存储和交换</h5>

      <p>本软件收集的有关您的信息和资料将保存在本软件及（或）其关联公司的服务器
        上，这些信息和资料可能传送至您所在国家、地区或本软件收集信息和资料所在
        地的境外并在境外被访问、存储和展示。</p>
      <h5>5.信息安全</h5>
      <p>  a)在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的
        交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的
        个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您
        立即联络本软件客服，以便本软件采取相应措施。</p>

    </md-landscape>

  </div>
</template>
<script>
  import { check } from '../../assets/js/js'
  export default {

    name: 'Registered',
    data() {
      return {
        isCode: false,
        codeTxt: '获取验证码',
        type: 1,  //默认密码登录,
        isFous:false,
        phone:'',
        pwd:'',
        // code:'',
        checked:true,
        showYC:false,
        account:'',
        pw:'',
        // isFous:false,
        // type:1,
        // codeTxt:'发送验证码',
        code:false,
        codeNum:'',
        hideLogo:true
      };
    },
    components: {},
    watch: {

    },
    mounted(){

    },
    methods: {
        //获取设备信息
        getNavigator(){
            console.log(navigator.userAgent)
            let agent = navigator.userAgent
            if(agent.includes('iPad')){
                return  this.hideLogo=false
            }else {
                return  this.hideLogo=true
            }
        },
        async takeCode(){
            let time =60;
            if(!this.code){
                this.code=true;
                if(!this.phone) this.$toast.info('请输入手机号',2000);
                if(!check(this.phone)) this.$toast.info('请输入正确的手机号',2000);
                let res = await this.$api.post('/common/getCode',{
                    type:'login',
                    phone:this.phone
                });
                let { success } =res.data
                if(!success){
                    this.$toast.info('发送错误，请重新获取！');
                    this.code=true;
                    this.codeTxt='发送验证码';
                    return
                };
                let interval= setInterval(()=>{
                    time--;
                    this.codeTxt='重新发送'+time+'s';
                    if(time<1){
                        this.codeTxt='发送验证码';
                        this.code=false;
                        clearInterval(interval)
                    }
                },1000)
            }
        },
      onChange(check){
         this.checked=check
      },
      set(){
        let res = {
          uid:1,
          name:'小明',
          userPhone:13888888888
        }
        this.$store.commit('setUserInfo',res)
      },
      async login(){
        if(this.type==1){
          if(!this.phone) return this.$toast.info('请输入账号',2000);
          if(!this.pwd) return this.$toast.info('请输入密码',2000);
          if(!this.checked) return this.$toast.info('请阅读服务协议',2000);
          let res = await this.$api.post('/bus/loginByPhone',{
            phone:this.phone,
            pwd:this.pwd
          })
          let {info,success,data}  = res.data
          if(!success){
            this.$toast.info(info)
          }else{
            if(data.isMaker ==0 ){
              if (data.account) {
                window.localStorage.setItem('isAc', 1);
                this.$store.commit('updateAcInfo', data.account);
              } else {
                console.log('主账号登录+++')
                window.localStorage.setItem('isAc', 0);
                this.$store.commit('updateAcInfo', {
                  addEnable: 1,
                  editEnable: 1,
                  delEnable: 1
                });
              }
              this.$store.commit('setUserInfo',data)
              const cid = data.companyId;
              window.localStorage.setItem('cid', cid);
              this.$store.dispatch('getCompanyInfo');
              if (data.state == 1) {
                return this.$router.replace({ name: 'Home' });
              }
              this.$router.push({
                name: 'Home',
              });
            }else {
              this.$store.commit('updateAcInfo', data);
              const cid = 'm90';
              window.localStorage.setItem('cid', cid);
              return this.$router.replace({ name: 'shop' });
            }

          }
        }

        if(this.type ==2){
            if(!this.phone) return this.$toast.info('请输入电话',2000);
            if(!check(this.phone)) this.$toast.info('请输入正确的手机号',2000);
            if(!this.code) return this.$toast.info('请阅读输入验证码',2000);
            if(!this.checked) return this.$toast.info('请阅读服务协议',2000);
          let res = await this.$api.post('/bus/loginByCode',{
            phone:this.phone,
            code:this.code
          })
          let {info,success,data}  = res.data
          if(!success){
            this.$toast.info(info)
          }else{
            if(data.isMaker ==0){
              this.$store.commit('setUserInfo',data)
              const cid = data.companyId;
              // this.$cookie.set('cid', cid, 1);
              window.localStorage.setItem('cid', cid);
              this.$store.dispatch('getCompanyInfo');
              if (data.state == 1) {
                return this.$router.replace({ name: 'Home' });
              }
              this.$router.push({
                name: 'Home',
              });
            }else {
              this.$store.commit('updateAcInfo', data);
              const cid = 'm90';
              window.localStorage.setItem('cid', cid);
              return this.$router.replace({ name: 'shop' });
            }

          }
        }

      }
    }
  };
</script>
<style lang="scss" scoped>
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    height: 0;
    flex-grow: 1;
    width: 550px;
    margin: 0 auto;
    transform: translateY(0);
    transition: 0.5s;
    display: flex;
    flex-direction: column;
  }
  .up{
    height: auto;
    flex-grow: 0;
    transform: translateY(-380px);
    transition: 0.5s;
  }
  .logo{
    width: 254px;
    height: 180px;
    margin: 120px auto 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .list{
    width: 550px;
    margin: 120px auto 0;
    .item{
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      height: 120px;
      border-radius: 62px;
      background: rgba(238,238,238,0.6);
      p{
        margin-left: 60px;
        margin-right: 52px;
        font-size:32px;
        color: #666;
        font-weight: bold;
        width: 102px;
      }
      input{
        margin-right: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 32px;
        color: #333;
        width: 0;
        flex-grow: 1;
        border: none;
        background: none
      }
      .codeInput{
        margin-right: 30px;
      }
      .code{
        margin-right: 60px;
        font-size: 24px;
        color: #333;
      }
      .grey{
        color: #999;
      }
    }
  }
  .type{
    margin-left: 60px;
    color:rgba(52,204,255,1);
    font-size: 24px;
  }
  .btn{
    margin-top: 100px;
    height: 120px;
    border-radius: 60px;
    background: #FF3434;
    color: #fff;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    line-height: 120px;
    transition: 0.5s;
  }
  .upBtn{
    margin-top: 40px;
    transition: 0.5s;
  }

  .foot{
    text-align: center;
    flex-grow: 0;
    display: block;
    height: auto;
    .cho{
      font-size:24px;
      font-weight:bold;
      color:rgba(102,102,102,1);
      line-height:24px;
      width: 352px;
      margin: 0 auto 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      a{
        color:rgba(102,102,102,1);
      }
    }
    p{
      font-size:24px;
      color:rgba(102,102,102,1);
      margin-bottom: 40px;
      line-height: 1;
      display: block;
      span{
        color: #34CCFF;
      }
    }
  }
  .register{
    font-size:24px;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:24px;
    width: 352px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
    a{
      color:rgba(102,102,102,1);
    }

  }
  .upFoot{
    display: none;
  }

  .agreeMent{
    display: flex;
    align-items: flex-start;
  }
  .agreeMent i{

  }
</style>
