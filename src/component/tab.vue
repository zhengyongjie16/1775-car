<template>
    <div class="tab">
      <router-link to="/">
        <span class="home"></span>
         <p>首页</p>
      </router-link>
      <router-link to="/MyCar">
        <span class="manager"></span>
        <p>车辆管理</p>
      </router-link>
      <router-link to="/Marketing">
        <span class="marking"></span>
        <p>营销工具</p>
      </router-link>
      <router-link to="/AroundList">
        <span class="service"></span>
        <p>同城服务</p>
      </router-link>
      <router-link to="/AroundList">
        <span class="around"></span>
        <p>同城生活</p>
      </router-link>
      <router-link to="/My">
        <span class="my"></span>
        <p>我的</p>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style scoped lang="scss">
   .tab{
     display: flex;
     align-items: center;
     height: 96px;
     background: #fff;
     /*box-shadow: 0 8px 12px 8px rgba(0,0,0,0.1);*/
     border-top: 1px solid rgba(0,0,0,0.1);
     position: relative;
     z-index: 1;
     box-sizing: border-box;
     a{
       display: block;
       width: 0;
       flex-grow: 1;
       text-align: center;
       span{
         display: block;
         width: 44px;
         height: 44px;
         margin: 0 auto;
       }
       p{
         font-size: 20px;
         color: #999;
         line-height: 1;
         margin-top: 10px;
       }
       span.home{
         background: url('../assets/tab1.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.manager{
         background: url('../assets/tab2.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.marking{
         background: url('../assets/tab3.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.around{
         background: url('../assets/icon_10.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.service{
         background: url('../assets/icon_10.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.my{
         background: url('../assets/tab4.png') no-repeat center center;
         background-size: 44px 44px;
       }
     }
     a.router-link-exact-active{
       p{
         color: #FF4C4C;
       }
       span.home{
         background: url('../assets/tab1_1.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.manager{
         background: url('../assets/tab2_1.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.marking{
         background: url('../assets/tab3_1.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.service{
         background: url('../assets/icon_9.png') no-repeat center center;
         background-size: 44px 44px;
       }
       span.my{
         background: url('../assets/tab4_1.png') no-repeat center center;
         background-size: 44px 44px;
       }
     }
   }
</style>
