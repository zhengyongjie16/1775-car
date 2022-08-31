<template>

  <div class="items" @click="toInfo" >
    <div class="card">
      <div class="left">
        <div class="img" :style="vbData.cover?{background:`url(${vbData.cover}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
      </div>
      <div class="right">
        <div class="name">{{vbData.title}}</div>
        <div class="info">{{vbData.brandDate | getTime}}年上牌·{{vbData.mileage}}万公里·{{vbData.brand.paifang}}</div>
        <div class="price">
          <div class="trade" v-show="vbData.tradePrice">批发:<span>{{vbData.tradePrice}}</span>万</div>
          <div class="net">网销价:{{vbData.onlinePrice}}万</div>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="left">
        车辆来源：{{vbData.company.companyName}}
      </div>
      <div class="right">
        联系人：{{vbData.company.lxName}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vbCar",
        props:['vbData'],
        data() {
            return {}
        },
        filters:{
            getTime:(value)=>{
                let date = new Date(value)
                let year = date.getFullYear()
                let mouth = date.getMonth()+1
                let day  = date.getDate()
                return `${year}-${mouth}-${day}`
            }
        },
        methods:{
            toInfo(){
                this.$router.push({
                    path:'/carInfo'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .items {
    width: vw(686);
    box-sizing: border-box;
    padding: vw(20);
    background: #fff;
    border-radius: vw(16);
    margin: 0 auto vw(16);
    .card{
      display: flex;
      align-items: flex-start;
      .left {
        width: vw(240);
        margin-right: vw(20);

        .img {
          width: vw(240);
          height: vw(160);
          background: #999999;
        }

        .txt {
          margin-top: vw(38);
          font-size: vw(24);
          line-height: 1;
          color: #999999;
        }
      }

      .right {
        width: 0;
        flex-grow: 1;

        .name {
          font-size: vw(32);
          line-height: vw(48);
          font-weight: bold;
          color: #333;
        }

        .info {
          margin-top: vw(8);
          line-height: 1.5;
          font-size: vw(24);
          color: #999;
        }

        .price {
          display: flex;
          align-items: flex-end;
          margin-top: vw(16);
          justify-content: space-between;

          .trade {
            font-size: vw(24);
            color: #D52002;
            font-weight: bold;
            line-height: 1;

            span {
              font-size: vw(40);
              color: #D52002;
            }
          }

          .net {
            font-size: vw(24);
            color: #999;
            line-height: 1;
          }
        }

        .tel {
          margin-top: vw(16);
          color: #999;
          font-size: vw(24);
        }
      }
    }
    .contact{
      display: flex;
      align-items: flex-start;
      font-size: vw(24);
      line-height: 1.5;
      margin-top: vw(20);
      .left{
        width: vw(240);
        margin-right: vw(20);
        color: #999;
      }
      .right{
        color: #999;
      }
    }
  }
</style>
