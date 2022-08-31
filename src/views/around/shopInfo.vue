<template>
   <div class="main">
     <div class="back" @click="$router.go(-1)">
       <md-icon name="arrow-left"></md-icon>
     </div>
     <md-scroll-view
       auto-reflow
       :scrolling-x="false"
       :scrolling-y="true"
       @refreshing="onRefresh"
       ref="scrollView"
       @endReached="loadShop"
     >
       <md-scroll-view-refresh
         slot="refresh"
         slot-scope="{ scrollTop, isRefreshActive, isRefreshing}"
         :scroll-top="scrollTop"
         :is-refreshing="isLoading"
         :isRefreshActive="isRefreshActive"
       ></md-scroll-view-refresh>
     <div class="banner">
       <md-swiper
         ref="swiper"
         :is-prevent="false"
         :useNative-driver="false"
       >
         <md-swiper-item v-for="(item,index) in swiper" :key="index">
           <div class="banner-item" :style="item?{background:`url(${item}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
         </md-swiper-item>
       </md-swiper>
     </div>
     <div class="data">
       <div class="name">
         <div class="txt">{{data.name}}</div>
<!--         <md-icon name="share"></md-icon>-->
       </div>
       <div class="lable" v-if="data.type">
         <div class="tag">{{data.type}}</div>
       </div>
<!--       <div class="num">月售888</div>-->
       <div class="price">
         {{data.price}}
<!--         <span>￥1000.00</span> -->
       </div>
     </div>

     <div class="screen">
       <div class="item" :class="{active:menu==1}" @click="menu=1">详情</div>
       <div class="item" :class="{active:menu==2}" @click="menu=2">其他商品</div>
     </div>
     <div class="content">
       <div class="info" v-show="menu==1">
         <div class="div" v-html="data.desc"></div>
       </div>
     </div>
     <div class="shop" v-show="menu==2">
       <div class="shopShow">
         <div class="bill" v-for="item in goods" :key="item.id"
         @click="getGoods(item.id)">
           <div class="pic" :style="item.cover?{background:`url(${item.cover}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
           <div class="name">{{item.name}}</div>
           <div class="price">￥{{item.price}}</div>
         </div>
         </div>
     </div>
       <md-scroll-view-more
         slot="more"
         :isFinished="isFinished"
       ></md-scroll-view-more>
     </md-scroll-view>
   </div>
</template>

<script>
    export default {
      name: "shopInfo",
      data(){
          return{
            menu:1,
            data:'',
            swiper:[],
            goods:[],
            page:1,
            tpage:999,
            isLoading: false,
            isFinished:false
          }
      },
      created() {
        this.getDetail()
      },
      filters:{
        type:value=>{
          if(value == 1) return '过户';
          if(value == 2) return '美容装饰';
          if(value == 3) return '改装防护';
          if(value == 4) return '维修';
          if(value == 5) return '保险';
          if(value == 6) return '验车';
          if(value == 7) return '洗车';
          if(value == 8) return '其他';
        }
      },
      methods:{
        async getDetail(){
          try{
            const id = this.$route.query.id;
            this.$toast.loading('1775加载中...');
            const _data = await this.$api.post('/findGoodsDetail',{id})
            this.$toast.hide();
            const { data, success, info } = _data.data;
            if(!success) return this.$toast.info(info,1000);
            this.data = data;
            this.swiper = data.swiper.split(',');
            console.log(this.swiper)
            this.findGoods()
          }catch (e) {
            this.$toast.info(e,1000)
          }finally {
            this.$toast.hide()
          }

        },
        async findGoods(){
          try{
            const sid = this.data.sid;
            this.$toast.loading('1775加载中...');
            const _list = await this.$api.post('/findGoods',{
              sid,
              page: 1,
              limit: 20,
            });
            this.$toast.hide();
            const { data, success, info, count} = _list.data;
            if(!success) return this.$toast.info(info,1000);
            this.goods = data
            this.tpage = Math.floor(count/20);
            this.isLoading = false;
            this.$refs.scrollView.finishRefresh();
            this.$refs.scrollView.finishLoadMore();
          }catch (e) {
            this.$toast.info(e,1000)
          }finally {
            this.$toast.hide()
          }

        },
        // 刷新
        onRefresh(){
          this.page = 1;
          this.getDetail();
        },
        // 上拉加载
        async loadShop(){
          this.isFinished = true;
          if(this.page<this.tpage&&this.menu==2){
            this.page++;
          }else {
            return
          }
          let page = this.page;
          const sid = this.$route.query.id;
          const _list = await this.$api.post('/findGoods',{
            sid,
            page,
            limit: 20,
          });
          const { data, success, info} = _list.data;
          if(!success) return this.$toast.info(info,1000);
          this.goods = this.goods.concat(data)
          this.isFinished =false;
          this.$refs.scrollView.finishLoadMore();
        },
        async getGoods(id){
          try{
            this.$toast.loading('1775加载中...');
            const _data = await this.$api.post('/findGoodsDetail',{id})
            this.$toast.hide();
            const { data, success, info } = _data.data;
            if(!success) return this.$toast.info(info,1000);
            this.data = data;
            this.swiper = data.swiper.split(',');
            setTimeout(() => this.$refs.scrollView.scrollTo(0,0), 100);
          }catch (e) {
            this.$toast.info(e,1000)
          }finally {
            this.$toast.hide()
          }
        }
      },
      updated() {
        const obj = document.querySelector('.info .div')
        const imgs = obj.getElementsByTagName('img')
        for(const item of imgs){
          item.style.maxWidth='100%'
        }
      },
    }
</script>

<style scoped lang="scss">
   .main{
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
     background: #f2f2f2;
   }
   .back{
     width: 50px;
     height: 50px;
     background: rgba(0,0,0,0.5);
     position: fixed;
     top: 25px;
     left: 25px;
     z-index: 999;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     i{
       padding: 0;
       font-size: 35px;
       color: #fff;
     }
   }
  .banner{
    width: 750px;
    height: 490px;
    position: relative;
    .banner-item{
      height: 490px;
    }
  }
  .data{
    padding: 42px 35px;
    background: #fff;
    box-sizing: border-box;
    width: 750px;
    .name{
      display: flex;
      .txt{
        font-size: 36px;
        color: #333;
        font-weight: bold;
        width: 0;
        flex-grow: 1;
        line-height: 1.5;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      i{
        font-size: 40px;
        color: #333;
        margin-left: 50px;
        margin-top: 10px;
      }
    }
    .lable{
      display: flex;
      flex-wrap: wrap;
      .tag{
        height: 40px;
        padding: 0 16px;
        border-radius: 10px;
        background: #f1f1f1;
        display: inline-block;
        font-size: 24px;
        line-height: 40px;
        margin-right: 10px;
        margin-top: 20px;
      }
    }
    .num{
      margin-top: 20px;
      font-size: 24px;
      color: #666;
    }
    .price{
      font-size: 36px;
      font-weight: bold;
      color: rgb(244,91,80);
      margin-top: 40px;
      span{
        font-size: 24px;
        color: #666;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    .price::before{
      content: '￥';
      font-size: 30px;
      font-weight: bold;
      color: rgb(244,91,80);
    }
  }
  .screen{
    margin-top: 20px;
    display: flex;
    align-items: center;
    background: #fff;
    height: 88px;
    padding: 0 35px;
    width: 750px;
    box-sizing: border-box;
    .item{
      font-size: 30px;
      color: #333;
      margin-right: 68px;
      line-height: 88px;
      position: relative;
    }
    .item.active::after{
      content: '';
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background: rgba(249,213,112,1);
      position: absolute;
      bottom: -1px;
      left: 0;
    }
    .item.active{
      font-weight: bold;
    }
  }
  .content{
    background: #fff;
    /*border-top: 35px solid #fff;*/
    width: 750px;
  }
 .info{
   padding:35px;
   font-size: 28px;
   color: #333;
 }

 .shopShow{
   padding: 35px 35px 0;
   background: #fff;
   display: flex;
   flex-wrap: wrap;
   box-sizing: border-box;
   width: 750px;
   box-sizing: border-box;
   .bill{
     width: 30%;
     margin-bottom: 35px;
     margin-right: 4%;
     .pic{
       height: 165px;
       background: #f7f7f7;
       border-radius: 12px;
     }
     .name{
       font-size: 28px;
       color: #666;
       margin-top: 10px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
     .price{
       margin-top: 10px;
       font-size: 30px;
       font-weight: bold;
       color: #333;
     }
   }
   .bill:nth-child(3n+3){
     margin-right: 0;
   }
 }


</style>
