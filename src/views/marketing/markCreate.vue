<template>
   <div class="main">
     <navTag :title="title"></navTag>
     <md-scroll-view
       :auto-reflow="true"
       :scrolling-x="false"
       :scrolling-y="true"
       ref="scrollView4"
       :immediate-check-end-reaching="true"
     >
     <div class="banner">

     </div>
     <div class="content">
       <div class="name">奔驰车源特卖</div>
       <div class="txt">
         内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
         内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
       </div>
     </div>
     <pfCard class="carItem" :carData="car"></pfCard>
     <pfCard class="carItem" :carData="car"></pfCard>
     <pfCard class="carItem" :carData="car"></pfCard>
     <pfCard class="carItem" :carData="car"></pfCard>
     <pfCard class="carItem" :carData="car"></pfCard>
     </md-scroll-view>
   </div>
</template>

<script>
    export default {
        name: "markCreate",
        data(){
            return{
                title: '生成页面',
                car:{
                    company:{
                        companyName:'公司名字',
                        lxName: '小明',
                        lxPhone: '138888888888',

                    },
                    cover:'2222',
                    title: '名字名字',
                    brandDate: 1577171330504,
                    mileage:2.5,
                    brand:{
                      paifang: 2.5,
                    },
                    tradePrice:'18.5'
                }
            }
        },

    }
</script>

<style scoped lang="scss">
  .mian{
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .banner{
    width: 100%;
    height: 375px;
    background: #8cc5ff;
  }
  .content{
    padding: 0 40px;
    .name{
      margin-top: 44px;
      font-size: 40px;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .txt{
      padding: 80px 0;
      font-size: 28px;
      color: #999999;
      line-height: 1.5;
    }
  }
</style>
