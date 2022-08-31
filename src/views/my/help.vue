<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="logo"></div>
    <div class="name">1775二手车 &nbsp;V2.0</div>
    <div class="list">
<!--      <div class="item" @click="showYC=true" >使用说明</div>-->
      <div class="item" @click="isPopupShow=true">联系我们</div>
      <div class="item" @click="$router.push({path:'/WorksDetail',query: {id:'55'}})">《隐私权政策》</div>
      <div class="item" @click="$router.push({path:'/WorksDetail',query: {id:'22'}})">《平台服务协议》</div>
    </div>
    <md-popup v-model="isPopupShow">
      <div class="md-example-popup md-example-popup-center">
        微信号： usc1775
      </div>
    </md-popup>
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
        name: "help",
        data() {
            return {
                title:'帮助中心',
                showYC:false,
                isPopupShow:false

            }
        },
        methods:{
            showPopUp(type) {
                this.$set(this.isPopupShow, type, true)
            },
            hidePopUp(type) {
                this.$set(this.isPopupShow, type, false)
            },
        }

    }
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    background: #f7f7f7;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .logo{
    width: 278px;
    height: 200px;
    margin: 40px auto 0;
    background: url("../../assets/logo.png") no-repeat center center;
    background-size: 278px 200px;
  }
  .name{
    text-align: center;
    margin-top: 42px;
    font-size: 28px;
    color: #999999;
    line-height: 32px;
  }
  .list{
    padding: 0 32px;
    margin-top: 114px;
    .item{
      box-sizing: border-box;
      height: 100px;
      border-radius: 16px;
      background: #fff;
      padding: 0 20px;
      display: flex;
      align-items: center;
      font-size: 32px;
      color: #666;
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
</style>
