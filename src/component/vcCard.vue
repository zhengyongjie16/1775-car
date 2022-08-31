<template>
<div class="card">
  <div class="cardL">
    <img :src="carData.cover|mobilePic"  @click="toCt(carData)">
  </div>
  <div class="cardR">
    <div class="carname" @click="toCt(carData)">{{carData.title}}</div>
    <div class="carinfo">
      <span>{{carData.brandDate | getYear}}年上牌</span>
      .
      <span>{{carData.mileage}}万公里</span>
      .
      <span v-if="carData.brand">{{carData.brand.paifang}}</span>
    </div>
    <div class="price">
      <div class="amount">{{carData.onlinePrice}}</div>
      <div class="shoufu" v-if="carData.firPrice>0">首付{{carData.firPrice}}万</div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'vcCard',
    props:{
      carData:{
        type: Object,
        default: function(){
          return {
            title:'我是一个测试的标题',
            onlinePrice:25.00,
            brand:{
                paifang:'123'
            },
            cover:"https://api.1775.net.cn/public/atache/car/20190911/1568188919866.jpeg"
          }
        }
      }
    },
    created(){
      // console.log(this.carData)
    },
    methods:{
      toCt(data){
        console.log('2333333')
        this.$router.push({path:'/Content',query:{id:data.id,companyId:data.companyId}}).catch(err=>console.log(err))
      }
    }
  };
</script>

<style scoped lang="scss">
  .card{
    width:684px ;
    height: 222px;
    margin:0 auto;
    display: flex;
    padding:20px;
    box-sizing: border-box;
    margin-bottom: 16px;
    position: relative;
    z-index: 9999;
    .cardL{
      width: 274px;
      height: 182px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cardR{
      padding-left: 20px;
      box-sizing: border-box;
      width: 0;
      flex-grow: 1;
      .carname{
        min-height: 90px;
        font-size: 32px;
        font-weight:bold;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .carinfo{
        font-size:24px;
        line-height: 24px;
        color:#999;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price{
        margin-top: 20px;
        display: flex;
        line-height: 40px;
        align-items: flex-end;
      }
      .amount{
        color:$mainColor;
        font-size: 40px;
        font-weight: 500;
      }
      .amount::before{
        content: '￥ ';
        display: inline-block;
        font-size: 24px;
      }
      .amount::after{
        content: ' 万';
        display: inline-block;
        font-size: 24px;
      }
      .shoufu{
        color:$mainColor;
        font-size: 24px;
        margin-left: 20px;
      }
    }
  }
</style>
