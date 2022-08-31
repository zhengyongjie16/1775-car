<template>
<div class="card">
  <div class="row1">
    <div class="cardL">
      <img :src="carData.cover|mobilePic"  @click="toCt(carData)">
    </div>
    <div class="cardR">
      <div class="carname" @click="toCt(carData)">{{carData.title}}</div>
      <div class="carinfo">
        <span v-if="carData.stockState==1">在库 {{carData.addTime | countDays}} 天</span>
        <span v-if="carData.stockState==2">在途</span>
        <span v-if="carData.stockState==3">整备</span>
        <span v-if="carData.stockState==4">在库 {{carData.addTime | countDays}} 天</span>
        <span v-if="carData.stockState==5">预约</span>
        <span v-if="carData.stockState==6">预定</span>
        <span v-if="carData.stockState==7">已售</span>
        <span>{{carData.mileage}}万公里</span>
        <span > <md-icon name="visible"></md-icon> {{carData.views}}</span>
      </div>
      <div class="price">
        <div class="amount">{{carData.onlinePrice | changePrice}}</div>
        <div class="shoufu" v-if="carData.firPrice>0">首付{{carData.firPrice}}万</div>
      </div>
    </div>
  </div>
   <div class="row2">
     <div @click="toEdit(carData.id)">编辑</div>
     <div @click="toUpdate(carData.id)">刷新</div>
<!--     <div @click="doDelete">删除</div>-->
     <div @click="doSale">出售</div>
     <div v-if="carData.onlineState == 5" @click="putOn(carData.id)"> 上架</div>
     <div v-if="carData.onlineState == 1" @click="putOff(carData.id)"> 下架</div>
     <div @click="doShare">分享</div>
   </div>

</div>
</template>

<script>
  import {Dialog}  from 'mand-mobile'
  export default {
    name: 'vsCard',
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
    data(){
      return {
          showSell:false,
          saleInfo:{
              dealPrice:'',
              lxName:'',
              lxPhone:''
          },
          attachments:[],
          checkIds:[],
          showWenAn:false,
          standarText:'',
          carDesc:'',
          carTell:'',
          newWn:'',
          wenan:''
      }
    },
    methods:{
      toEdit(id){
          if(this.$store.state.ac.account){
                if(this.$store.state.ac.authority.indexOf('edit')<0) return this.$toast.info('您没有权限编辑车辆！',1000);
          }
          this.$router.push({name:'updateCar',query:{id: id}})
        },
      async doDelete(){
            if(this.$store.state.ac.account){
                if(this.$store.state.ac.authority.indexOf('remove')<0) return this.$toast.info('您没有权限删除车辆！',1000);
            }
            Dialog.confirm({
                title: '确认',
                content: '请确认是否进行操作',
                confirmText: '确定',
                onConfirm:async  () => {
                    const  res = await this.$api.get('/vehicleDelete?id='+this.carData.id);
                    const {success} = res.data;
                    if( success ){
                        this.$emit('change',{type:'destory'})
                        this.$toast.succeed('删除成功')
                    } else {
                        this.$toast.failed('删除失败')
                    }
                },
            })
        },
      async doShare(){
          this.$emit('doShare',this.carData)
        },
      async doSale(){
          this.$emit('forsafle',this.carData)
      },
      async putOn(carId){
          if(this.$store.state.ac.account){
              if(this.$store.state.ac.authority.indexOf('add')<0) return this.$toast.info('您没有权限上架车辆！',1000);
          }
            let res = await this.$api.post('/vehicle/doOnline',{carId})
            const { success }  =  res.data;
            if(success){
                this.$emit('change',{carId,type:'destory'})
                this.$toast.succeed('上架成功！')
            }
      },
      async putOff(carId){
          if(this.$store.state.ac.account){
              if(this.$store.state.ac.authority.indexOf('remove')<0) return this.$toast.info('您没有权限下架车辆！',1000);
          }
        Dialog.confirm({
            title: '确认',
            content: '请确认是否进行操作',
            confirmText: '确定',
            onConfirm:async  () => {
                let res = await this.$api.post('/vehicle/doOffline',{carId})
                const { success }  =  res.data;
                if(success){
                    this.$emit('change',{carId,type:'destory'})
                    this.$toast.succeed('下架成功！')
                }
            },
        })
      } ,
      toCt(data){
        console.log('2333333')
        this.$router.push({path:'/CarDetailed',query:{id:data.id,companyId:data.companyId}}).catch(err=>console.log(err))
      },
      async toUpdate(id){
        try{
          this.$toast.loading('正在刷新...')
          const _data = await this.$api.post('/vehicle/updateTime',{ id })
          this.$toast.hide()
          const { success } = _data.data
          if(!success) return this.$toast.info('刷新失败，请重试',800)
          this.$toast.info('刷新成功',800)
        }catch (e) {
          this.$toast.info(e,1000)
        }finally {
          this.$toast.hide()
        }

      }
    },
     filters:{
         countDays(r){
              const  _day = Date.now() - r;
             return Math.floor(_day / (24*60*60*1000))
         },
         changePrice(value){
             if(value>1000000){
                 value = value/10000
                 return value.toFixed(2)
             }else {
                 return value
             }
         }
     }
  };
</script>

<style scoped lang="scss">
  .card{
    width:684px;
    height:302px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    margin:0 auto;

    padding:20px 0 0;
    box-sizing: border-box;
    margin-bottom: 16px;
    position: relative;
    z-index: 9999;
    background: #fff;
    .row1{
      display: flex;
      border-bottom: 1px solid rgba(0,0,0,.1);
      padding: 0 20px;
      padding-bottom: 18px;
      box-sizing: border-box;

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
        height: 182px;
        position: relative;
        .carname{
          max-height: 96px;
          font-size: 32px;
          font-weight:bold;
          margin-top: -8px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
          line-height: 48px;
        }
        .carinfo{
          font-size:24px;
          line-height: 1;
          color:#999;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price{
          margin-top: 20px;
          display: flex;
          line-height: 40px;
          align-items: flex-end;
          position: absolute;
          bottom: 0;
        }
        .amount{
          color:$mainColor;
          font-size: 40px;
          font-weight: 500;
          line-height: 1;
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
          color: $mainColor;
          font-size: 24px;
          margin-left: 20px;
        }
      }
    }

    .row2{
      display: flex;
      /*padding-top: 20px;*/
      &>div{
        width: 0;
        flex-grow: 1;
        text-align: center;
        font-size: 28px;
        line-height: 1;
        color: #333;
        cursor: pointer;
        position: relative;
        padding: 20px 0;
      }
      &>div::after{
        content: '|';
        width: 0.5vw;
        height: 28px;
        position: absolute;
        top: 20px;
        right: 0;
        color: rgba(0,0,0,0.2);
        z-index: 1;
      }
      &>div:last-child::after{
        color: rgba(0,0,0,0);
      }
    }


    .InCarSell
    {
      width: 80vw;
      height: 376px;
      box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
      z-index: 1000;
      background-color: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding:20px
      /*display: none;*/


    }

    .onCarboxTop{
      width: 100%;
      height: 36px;
      font-size: 24px;
      color: #666;
      line-height: 36px;
      text-align: left;
      margin-bottom: 20px;
    }
    .onCarData{
      width: 100%;
      height: 75px;
      margin-bottom: 10px;
    }
    .onCarDataTu{
      width: 100px;
      height: 75px;
      background-color: gray;
      float: left;
      margin-right: 20px;
      overflow: hidden;
      &>img{
        width: 100%;
      }
    }
  }


</style>
