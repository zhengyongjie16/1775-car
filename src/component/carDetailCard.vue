<template>
  <router-link to="CarInfo">
      <div class="itemCard" >
          <div class="carImg">
            <img src="https://fakeimg.pl/100x100/">
          </div>
          <div class="carInfo">
            <div class="title">
              丰田 锐志 2010款 2.5V 风度箐版
            </div>
            <div class="detail">
              2011年上牌 . 9.3万公里 .国  III
            </div>
            <div class="price"> <span>￥</span>  10.98 <span>万</span></div>
            <div class="shopinfo">
              <span>二手店名称</span>
              <span>库龄44天</span>
              <span>在厅</span>
            </div>
          </div>
      </div>
  </router-link>
</template>

<script>
  export default {
    name: 'carDetailCard'
  };
</script>

<style scoped lang="scss">
    .itemCard{
      width: vw(686);
      height: vw(268);
      background: #fff;
      border-radius: vw(8);
      margin:0 auto vw(16);
      padding:vw(20);
      box-sizing: border-box;
      display: flex;
      .carImg{
        /*border: 1px solid #000;*/
        width: vw(230);
        height: vw(184);
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .carInfo{
        height: 100%;
        padding-left: vw(20);
        .title{
          height: vw(96);
          font-size: vw(32);
          color:#333;
          font-weight: bolder;
        }
        .detail{
          font-size: vw(24);
          color:#999;
          line-height: 1;
          margin-top: vw(12);
        }
        .price{
          color:#d52002;
          font-size: vw(30);
          font-weight: bolder;
          line-height: 1;
          margin-top: vw(20);
          span{
            font-size: vw(20);
            color:#d52002;
          }
        }
        .shopinfo{
          font-size: vw(24);
          margin-top: vw(20);
          span{
            color:#999;
            line-height: 1;
            &:after{
              content: '|';
              margin:vw(20)
            }
            &:last-child::after{
              content:''
            }
          }
        }
      }

    }
</style>
