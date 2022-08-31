<template>
  <div class="login">

    <!--<button @click="doUpload">上传</button>-->
    <div class="img">
      <img alt="" src="../../img/icons/logo.png" v-show="!Dis" :class="{big:isBig}">
    </div>
    <div class="inputItems">
      <div class="items mt">
        <h5>账号</h5>
        <input type="text" @focus="isBig=false" @blur="isBig=true" placeholder="请输入手机号" v-model.number="Account">
      </div>
      <div class="items">
        <h5>密码</h5>
        <input type="password" @focus="isBig=false"  @blur="isBig=true"  placeholder="请输入密码" v-model="Password">
      </div>
      <md-agree
        v-model="agreeConf.checked"
        :disabled="agreeConf.disabled"
        :size="agreeConf.size"
      >
        本人了解并同意 <span style="color:red" @click="showYC = true">《1775二手车隐私政策》及 《用户协议》</span>
      </md-agree>
      <div class="inputbtn" @click="Landbtn">登陆</div>
      <div class="registered" @click="MeRegiRou">注册账号</div>
    </div>
    <div class="Land">
      <!--        <div class="LandTop">-->
      <!--          <ul>-->
      <!--            <li v-for="(item,r) in Disfont" class="LandTopli" :class="clifont==r? DisfontCo:''" @click="lifont(r)">{{item}}</li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--当选择密码登陆时显示-->
      <!--        <div v-show="!Dis">-->
      <!--          <div class="LandInput">-->
      <!--            <md-field>-->
      <!--              <md-input-item-->
      <!--                ref="input0"-->
      <!--                title="手机号"-->
      <!--                placeholder="请输入手机号"-->
      <!--                v-model="Account"-->
      <!--              ></md-input-item>-->
      <!--              <md-input-item-->
      <!--                ref="input1"-->
      <!--                title="密码"-->
      <!--                type="password"-->
      <!--                value="请输入密码"-->
      <!--                clearable-->
      <!--                v-model="Password"-->
      <!--              ></md-input-item>-->
      <!--            </md-field>-->
      <!--<div>-->
      <!--<el-input v-model="Account" placeholder="请输入手机号"></el-input>-->
      <!--</div>-->
      <!--<div>-->
      <!--<el-input v-model="Password" placeholder="请输入密码"></el-input>-->
      <!--</div>-->
      <!--          </div>-->
      <!--          <div class="register">-->
      <!--            <ul>-->
      <!--              &lt;!&ndash;<li @click="forgeRou">忘记密码?</li>&ndash;&gt;-->
      <!--              <li @click="MeRegiRou">商家注册</li>-->
      <!--            </ul>-->
      <!--          </div>-->
      <!-- <div class="Verification" >
         <el-popover
           ref="popover2"
           placement="right"
           width="200"
           trigger="click">
           <div class="Verificationbox">

           </div>
         </el-popover>
         <div class="VerIcon" v-popover:popover2>
           <div></div>
         </div>

         <div class="Verfont">点击进行验证</div>

       </div>-->
      <!--          <md-button type="primary" size="small" @click="Landbtn">       登陆</md-button>-->

      <!--账号或者密码错误提示-->
      <div class="Error">{{errfont}}</div>
    </div>
    <!--当选择扫码登陆时显示-->
    <!--    <div v-show="Dis">-->
    <!--      &lt;!&ndash;二维码&ndash;&gt;-->
    <!--      <div class="SweepCode"></div>-->
    <!--      <div class="SweepCodefont">打开APP扫码即可登陆网站</div>-->
    <!--      &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--    </div>-->

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
    export default {
        name: 'login',
        data() {
            return {
                showYC:false,
                agreeConf: {
                    checked: false,
                    name: 'agree0',
                    size: 'sm',
                    disabled: false,
                    introduction: '选中状态',
                },
                isBig:true,
                Account: '', // 绑定账号
                Password: '', // 绑定密码
                errfont: '', // 判断是否输入账号是否显示的数据
                Dis: false, // 判断是密码登陆还是扫码登陆
                Disfont: ['密码登陆'],
                DisfontCo: 'DisfontCo',
                clifont: '0',
                codeDis: false,
            };
        },
        methods: {

            doUpload() {
                console.log(cordova);
                ImagePicker.getPictures((result) => {
                    alert(JSON.stringify(result));
                }, (err) => {
                    alert(err);
                }, {
                    maximumImagesCount: 9,
                    width: 1920,
                    height: 1440,
                    quality: 100,
                });
            },
            // 登陆点击函数
            async Landbtn() {
                if(!this.agreeConf.checked) return this.$toast.info('请勾选同意隐私政策')
                const res2 = await this.$api.post('companyLogin', {
                    phone: this.Account,
                    pwd: this.Password,
                });
                const { data, success } = res2.data;
                if (success) {
                    if (data.account) {
                        window.localStorage.setItem('isAc', 1);
                        this.$store.commit('updateAcInfo', data.account);
                    } else {
                        window.localStorage.setItem('isAc', 0);
                        this.$store.commit('updateAcInfo', {
                            addEnable: 1,
                            editEnable: 1,
                            delEnable: 1
                        });
                    }
                    console.log('登录函数', data)
                    const cid = data.companyId;
                    // this.$cookie.set('cid', cid, 1);
                    window.localStorage.setItem('cid', cid);
                    this.$store.dispatch('getCompanyInfo');
                    if (data.state == 1) {
                        return this.$router.replace({ name: 'BusRegister' });
                    }
                    this.$router.push({
                        name: 'Home',
                    });
                } else {
                    this.errfont = res2.data.info;
                }
            },
            lifont(r) {
                this.Dis = !this.Dis;
                return this.clifont = r;
            },
            codeDisover() {
                this.codeDis = true;
            },
            codeDisout() {
                this.codeDis = false;
            },

            //  forgeRou忘记密码
            forgeRou() {
                this.$router.push({
                    name: 'ForgetPass',
                });
            },
            //  商家注册
            MeRegiRou() {
                this.$router.push({
                    name: 'BusRegister',
                });
            },

        },
    };
</script>

<style lang="scss" scoped>
  .img {
    text-align: center;
    margin: vw(200) auto 0;
  }

  .img img {
    height: auto;
    width: vw(200);
    transition: all 100ms;
  }

  .img .big{
    width: vw(449)!important;
  }
  .inputItems{
    width: vw(734);
    margin: vw(110) auto 0;
    position: relative;
    z-index: 9;
  }
  .inputItems .items{
    display: flex;
    align-items: center;
    padding: vw(23) 0;
    border-bottom: 1px solid #d8d8d8;
  }
  .mt{
    margin-bottom: vw(108);
  }
  .inputItems .items h5{
    width: vw(121);
    height:vw(58);
    font-size:vw(46);
    font-family:PingFangSC-Medium,PingFang SC;
    color:#666;
    line-height:vw(58);
    margin-right: vw(66);
    font-weight: normal;
  }
  .inputItems .items input{
    width: vw(547);
    border: none;
    height: vw(58);
    line-height: vw(58);
    font-size:vw(46);
    font-family:PingFangSC-Medium,PingFang SC;
    background: none;
    color: #333!important;
  }
  .inputItems .items input::placeholder{
    color: #999;
  }
  .inputbtn{
    width:vw(737);
    height:vw(115);
    background:rgba(255,52,52,1);
    border-radius:vw(23);
    text-align: center;
    line-height: vw(115);
    margin: vw(140) auto 0;
    color: #fff;
    font-size:vw(58);
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight: normal;
  }
  .registered{
    margin: vw(34) auto ;
    text-align: center;
    font-size:vw(35);
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(52,173,225,1);
    line-height: vw(35);
  }
  .login {
    height: 100%;
    width: 100%;
    background: #fff;
    z-index: 999999;
    overflow: hidden;
  }

  .lgTop {
    width: 100%;
    height: 64px;
    background-color: $gray;
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .lgContent {
    width: 100%;
    height: 580px;
    background-color: #0D0E11;

  }


  .lgfont {
    width: 360px;
    height: 154px;
    position: absolute;
    left: 40%;
    top: 180px;
    transform: translate(-50%);
    color: #FFF;
    font-size: 30px;
  }

  .Appload {
    width: 102px;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #F9712C;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
  }

  .AppcodeBox {
    width: 135px;
    height: 122px;
    border-radius: 5px;
    background-color: red;
    margin-left: 8px;
  }

  .Appcode {
    width: 116px;
    height: 132px;
    background-color: #fff;
    position: absolute;
    bottom: -10px;
    border-radius: 5px;
  }

  .Appcode:after {
    content: "";
    width: 10px;
    height: 10px;
    clip-path: polygon(50% 3px, 0 100%, 100% 100%);
    background-color: #fff;
    position: absolute;
    top: -9px;
    left: 30px;
  }

  .Appcode > div {
    width: 95px;
    height: 95px;
    margin: 10px auto 0;
    background-color: red;
  }

  .Appcode > p {
    color: #000;
    font-size: 14px;
    margin: 5px 10px;
  }


  /*登陆框表单*/
  .Land {
    width: 70vw;
    background-color: #fff;
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 20px 30px;
    transition: opacity 1.5s;
  }

  .LandTop {
    width: 176px;
    height: 30px;
    margin: 0 auto;
  }

  .LandTop ul {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
  }

  .LandTopli {
    float: left;
    font-size: 16px;
    color: #999999;
  }

  .DisfontCo {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }

  .LandInput {
    margin-top: 20px;
  }

  .LandInput > div {
    margin: 10px 0 0;
    padding: 9px 13px;
  }

  .LandInput input {
    border: none;
    width: 100%;
    text-rendering: auto;
    color: initial;
  }

  .register {
    width: 280px;
    height: 13px;
    margin: 0 0 15px;
  }

  .register ul {
    float: right;
  }

  .register li {
    float: left;
    margin-right: 10px;
    padding-right: 10px;
    font-size: 13px;
    color: #666666;
  }

  .register li:hover {
    color: #F9712C;
  }

  .Verification {
    clear: both;
    width: 280px;
    height: 44px;
    margin: 0 auto;
    background-color: #eee;
    position: relative;
  }

  .Verificationbox {
    width: 251px;
    height: 258px;

  }

  .Verfont {
    width: 200px;
    height: 42px;
    margin: 0 auto;
    line-height: 40px;
    color: #666;
  }

  .VerIcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .VerIcon > div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: blue;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .Landbtn {
    margin: 15px auto 0;
    width: 278px;
    height: 34px;
    background-color: #F9712C;
    line-height: 34px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  .Landbtn:hover {
    background-color: #f98f66;
  }

  .Error {
    position: absolute;
    bottom: vw(500);
    left: vw(270);
    color: #F9712C;
    font-size: 12px;
  }

  /*扫码登陆*/
  .SweepCode {
    width: 160px;
    height: 160px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
  }

  .SweepCodefont {
    position: absolute;
    bottom: 30px;
    width: 320px;
    color: #999;
    text-align: center;
  }

  /*尾部*/

  .lgfooter {
    width: 100%;
    height: 108px;
    background-color: #fff;
  }

  .lgfooterbox {
    width: 1200px;
    height: 108px;
    margin: 0 auto;
    text-align: center;
  }

  .fotop {
    width: 510px;
    height: 20px;
    margin: 40px auto 10px;
    color: #999;
    font-size: 14px;
  }

  .fotopL {
    float: left;
  }

  .fotopL span {
    font-weight: 600;
  }

  .fotopR {
    float: right;
    color: #666;
  }

  .lgfooterbox span:hover {
    color: #F9712C;
  }

  .focenter {
    font-size: 12px;
    color: #999;
    line-height: 20px;
  }
/deep/ .md-agree-content{
  font-size: 12px;
}
 ::v-deep .md-agree{
    margin-top: 10px;
  }
  .yc{
    padding-top: 50px;
  }
 ::v-deep .md-popup{

    top: constant(safe-area-inset-top)!important;

    /* Status bar height on iOS 11+ */
    top: env(safe-area-inset-top)!important;
    .md-landscape-body{
      padding:10px;
      box-sizing: border-box;
    }
    p{
      margin-top: vw(20);
    }
    h5{
      font-size: 16px;
    }
  }
</style>
