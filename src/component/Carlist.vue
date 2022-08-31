<template>
  <div class="item" @click="$router.push({path:'/CarInfo',query:{id:data.id}})">
    <div class="img" :style="data.cover? {background:`url(${data.cover}) no-repeat center center`,backgroundSize:`cover`}:{}">

    </div>
    <div class="data">
      <div class="title">
        {{data.title}}
      </div>
      <div class="info">
        {{data.brandDate | brandDate}}年上牌·{{data.mileage}}万公里
      </div>
      <div class="sell">
        <p class="price">
          ￥<span>{{data.onlinePrice}}</span>万
        </p>
        <p class="txt">
          <span v-show="data.reservoirAge">库龄{{data.reservoirAge}}|</span>{{data.stockState|stockState}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    name: 'Carlist',
    props:['data'],
    data(){
        return{

        }
    },
    filters:{
        stockState:value=>{
            console.log(value)
            //在库状态 1.在厅 2.在途 3.整备 4.在售 5.预约 6.预定 7.已售
            if(value==1) return '在厅';
            if(value==2) return '在途';
            if(value==3) return '整备';
            if(value==4) return '在售';
            if(value==5) return '预约';
            if(value==6) return '预定';
            if(value==7) return '已售';
            if(value==8) return '下架';
        },
        brandDate:value=>{
            if (!value) return '上牌时间未知';
            let time = new Date(value);
            let year = time.getFullYear();
            let mouth = time.getMonth()+1;
            let day = time.getDate();
            return `${year}-${mouth}-${day}`
        }
    },
    methods:{
        routeTo(){
            this.$router.push({path:'/CarInfo'})
        }
    }
  };
</script>

<style scoped lang="scss">
  .item{
    padding: vw(20);
    background: #fff;
    border-radius: vw(16);
    margin-bottom: vw(16);
    box-sizing: border-box;
    display: flex;
  .img{
    width: vw(274);
    height: vw(182);
    margin-right: vw(20);
    background: #999;
    border-radius: vw(4);
    background: #fff url("../assets/logobg.png") no-repeat center center;
    background-size: cover;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .data{
    width: 0;
    flex-grow: 1;
    height: vw(182);
    position: relative;
  .title{
    font-size: vw(32);
    color: #333;
    line-height: vw(48);
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info{
    font-size: vw(24);
    color: #999;
    margin-top: vw(12);
    line-height: 1;
  }
  .sell{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  .price{
    color: #D52002;
    font-size: vw(24);
    font-weight: bold;
  span{
    font-size: vw(40);
    color: #D52002;
  }
  }
  .txt{
    font-size: vw(24);
    color: #999;
  }
  }
  }
  }
</style>
