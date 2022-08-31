<template>
    <div class="ServiceXy">
      <div class="ServiceXybox">
        <div class="SerTile">xxxx服务协议</div>
        <div class="SerContent">
          <div class="MiddleTie">1775二手车网网站声明</div>
          <p>欢迎您使用1775二手车网网站，我们很高兴能为您提供服务。为了您更好的使用1775二手车网网站，请您详细阅读《1775二手车网网站经销商系统使用服务协议》（以下简称“本协议”），认真遵守该协议是我们为您提供服务的前提。</p>

        </div>


      </div>
    </div>
</template>

<script>
    export default {
        name: "ServiceXy"
    }
</script>

<style scoped>

  .ServiceXy{
    width: 100%;
    background-color: #fff;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
  }
  .ServiceXybox{
    width: 1180px;
    margin: 0 auto;
    border: 1px solid #a7caf0;

  }
  .SerTile{
    width: 1100px;
    height: 41px;
    line-height: 41px;
    margin: 0 auto;
    font-size: 20px;
    color: #5F5F5F;
    text-align: left;
    border-bottom:1px solid #5F5F5F;

  }
  .SerContent{
    width: 940px;
    margin: 0 auto;
  }
  .MiddleTie{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }
  .SerContent>p{
    font-size: 12px;
    line-height: 18px;
    color: #000;
  }
</style>
