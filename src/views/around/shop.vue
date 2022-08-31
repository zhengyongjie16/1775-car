<template>
  <div class="main">
    <navTag title="商店详情"></navTag>
    <div class="banner" :style="data.bg?{background:`url(${data.bg}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
    <div class="shop">
      <div class="show">
        <div class="logo" :style="data.logo?{background:`url(${data.logo}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
        <div class="name">{{data.name}}</div>
        <div class="lable">
          <div class="tag">{{data.address}}</div>
          <a :href="`tel:`+data.phone"><md-icon name="phone"></md-icon></a>
        </div>
<!--        <div class="tips">通告：通告通告通告通告通告通告通告通告通告通告</div>-->
      </div>
    </div>
    <div class="screen">
      <div class="item" :class="{active:menu==1}" @click="menu=1" >商品</div>
      <div class="item" :class="{active:menu==3}" @click="menu=3">商家</div>
    </div>
    <div class="content">
      <div class="cmain" v-show="menu==1">
        <div class="right">
          <div class="txt">为您推荐 <span>(您可能感兴趣的商品)</span></div>
          <div class="list">
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
            <div class="bill" v-for="(item,index) in goods" :key="item.id"
            @click="$router.push({path:'/AroundDetail',query:{id:item.id}})">
              <div class="logo" :style="item.cover?{background:`url(${item.cover}) no-repeat center center`,backgroundSize:`cover`}:{}">
                <div class="tag" v-if="item.type">{{item.type}}</div>
              </div>
              <div class="data">
                <div class="name">{{item.name}}</div>
                <div class="price">
                  {{item.price}}
                </div>
              </div>
            </div>
              <md-scroll-view-more
                slot="more"
                :isFinished="isFinished"
              ></md-scroll-view-more>
            </md-scroll-view>

          </div>
        </div>
      </div>
      <div class="home" v-show="menu==3">
<!--        <md-scroll-view-->
<!--          auto-reflow-->
<!--          :scrolling-x="false"-->
<!--          :scrolling-y="true"-->
<!--          :manual-init="true"-->
<!--          ref="scrollItem"-->
<!--        >-->
        <div class="show">
          <div class="list">
            <div class="left">
              <md-icon name="location"></md-icon>
              {{data.address}}
            </div>
            <div class="right">
              <a :href="'tel:' + data.phone">
              <md-icon name="phone"></md-icon>
              </a>
            </div>
          </div>
          <div class="list content" v-html="data.desc">
<!--            <div class="img" :style="data.logo?{background:`url(${data.logo}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>-->
          </div>
<!--          <div class="list line">-->
<!--            <div class="left">-->
<!--              <div class="icon look"></div>-->
<!--              查看档案-->
<!--            </div>-->
<!--            <div class="ricon">-->
<!--              <md-icon name="arrow-right"></md-icon>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="list">-->
<!--            <div class="left">-->
<!--              <div class="icon service"></div>-->
<!--              配送服务： <span>商家提供</span>上门维修-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="list line">-->
<!--            <div class="left">-->
<!--              <div class="icon time"></div>-->
<!--              上班时间： 周一至周五，早上09：00至下午06：00-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="list">-->
<!--            <div class="left">-->
<!--              <div class="icon tips"></div>-->
<!--              <div class="div">-->
<!--                商家公告： 商家公告商家公告商家公告商家公告商家公告商家公告商家公告-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="list">-->
<!--            <div class="left">-->
<!--              <div class="lable">-->
<!--                <div class="tag">-->
<!--                  <div class="icon tag1"></div>-->
<!--                  标签1-->
<!--                </div>-->
<!--                <div class="tag">-->
<!--                  <div class="icon tag2"></div>-->
<!--                  标签2-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
<!--        </md-scroll-view>-->
      </div>
    </div>
  </div>
</template>

<script>
  import navTag from "../../component/navTag";
  export default {
    name: "shop",
    data() {
      return {
        list: ['', '', '', '', '', '', ''],
        menu:1,
        data:'',
        goods:[],
        page:1,
        tpage:999,
        isLoading: false,
        isFinished:false
      }
    },
    created() {
      this.getShopDetail();
      this.findGoods()
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
    comments:{
      navTag
    },
    methods:{
      async getShopDetail(){
        const id = this.$route.query.id;
        try{
          this.$toast.loading('1775加载中...');
          const _data = await this.$api.post('/getShopDetail',{id});
          this.$toast.hide();
          const { data, success, info} = _data.data;
          if(!success) return this.$toast.info(info,1000);
          this.data = data
        }catch (e) {
          this.$toast.info(e,1000)
        }finally {
          this.$toast.hide()
        }

      },
      async findGoods(){
        try{
          const sid = this.$route.query.id;
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
        this.findGoods();
      },
      // 上拉加载
      async loadShop(){
        this.isFinished = true;
        if(this.page<this.tpage){
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
      init(){
        this.page = 1;
        this.findGoods();
        setTimeout(() => this.$refs.scrollView.scrollTo(0,0), 100);
      }
    },
    deactivated() {
      const st = this.$refs.scrollView.getOffsets();
      sessionStorage.setItem('scrollTop1', st.top);
    },
    activated() {
      const st = sessionStorage.getItem('scrollTop1');
      const from = window.sessionStorage.getItem('from1');
      if(from === 'AroundList') this.init()
      if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView.scrollTo(0, parseFloat(st)), 100);

    },
    beforeRouteEnter(to, from, next){
      window.sessionStorage.setItem('from1',from.name);
      next()
    },
    updated() {
      const obj = document.querySelector('.content')
      const imgs = obj.getElementsByTagName('img')
      for(const item of imgs){
        item.style.maxWidth='100%'
      }
    },

  }
</script>

<style lang="scss" scoped>
  .main {
    background: rgb(254, 254, 254);
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .banner {
    height: 320px;
    background: #3a8ee6;
  }
  .shop {
    margin-top: -98px;
    padding: 0 26px;
    box-sizing: border-box;
    .show{
      position: relative;
      background: #fff;
      border-radius: 12px;
      box-sizing: border-box;
      padding: 36px 36px 28px 36px;
      box-shadow: 0px 2px 10px rgb(239, 239, 239);
      .logo{
        position: absolute;
        width: 102px;
        height: 102px;
        border-radius: 12px;
        top: -51px;
        right: 36px;
        background: #8cc5ff;
        box-shadow: 2px 2px 6px #878787;
      }
      .name{
        font-size: 35px;
        font-weight: bold;
        color: #333;
        line-height: 1.2;
        max-width: 80%;
      }
      .lable{
        margin-top: 24px;
        display: flex;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        .tag{
          color: #333;
          margin-right: 20px;
          line-height: 1.5;
        }
        i{
          font-size: 40px;
          color: #666;
        }
      }
      .tips{
        font-size: 20px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 20px;
      }
    }
  }
  .screen{
    display: flex;
    align-items: center;
    height: 98px;
    border-bottom: 1px solid rgb(237,237,237);
    box-sizing: border-box;
    padding: 0 32px;
    margin-top: 10px;
    .item{
      font-size: 32px;
      color: #333;
      margin-right: 110px;
    }
    .item.active{
      font-weight: bold;
    }
    .item:last-child{
      margin-right: 0;
    }
  }
  .content{
    height: 0;
    flex-grow: 1;
  }
  .cmain{
    display: flex;
    height: 100%;
    .left{
      width: 168px;
      height: 100%;
      background: rgb(248,248,248);
      .item{
        box-sizing: border-box;
        padding: 35px;
        font-size: 24px;
        color: #666;
      }
      .item.active{
        background: #fff;
        font-weight: bold;
      }
    }
    .right{
      width: 0;
      flex-grow: 1;
      box-sizing: border-box;
      padding: 0 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      .txt{
        padding: 35px 0;
        font-size: 24px;
        color: #333;
        span{
          font-size: 20px;
          color: #666;
        }
      }
      .list{
        height: 0;
        flex-grow: 1;
      }
      .bill{
        display: flex;
        margin-bottom: 30px;
        .logo{
          width: 190px;
          height: 190px;
          border-radius: 12px;
          position: relative;
          background: #409EFF;
          overflow: hidden;
          margin-right: 20px;
          .tag{
            width: 75px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 20px;
            color: #fff;
            background: rgb(48,48,41);
            border-radius: 0 0 12px 0;
          }
        }
        .data{
          width: 0;
          flex-grow: 1;
          .name{
            font-size: 35px;
            line-height: 1.2;
            font-weight: bold;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .lable{
            margin-top: 14px;
            .tag{
              display: inline-block;
              padding: 0 14px;
              height: 35px;
              font-size: 20px;
              background: rgb(241,241,241);
              color: #333;
              margin-right: 8px;
              margin-bottom: 14px;
            }
          }
          .num{
            font-size: 24px;
            color: #666;
          }
          .price{
            font-size: 32px;
            font-weight: bold;
            color: rgb(226,87,86);
            margin-top: 14px;
            span{
              font-size: 20px;
              color: #999;
            }
          }
          .price::before{
            content: '￥';
            font-size: 24px;
            font-weight: bold;
            color: rgb(226,87,86);
          }
        }
      }
    }
  }
  .home{
    height: 96%;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .show{

    }
    .list{
      display: flex;
      align-items: center;
      padding: 35px;
      border-bottom: 1px solid rgb(240,240,240);
      position: relative;
      .img{
        width: 190px;
        height: 140px;
        background: #8cc5ff;
      }
      .left{
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #333;
        line-height: 1.5;
        width: 0;
        flex-grow: 1;
        i{
          padding: 0;
          margin-right: 20px;
          font-size: 30px;
          color: #333;
        }
        .icon{
          width: 35px;
          height: 35px;
          background: #66b1ff;
          margin-right: 20px;
        }
        .div{
          width: 0;
          flex-grow: 1;
        }
        .lable{
          display: flex;
          align-items: center;
          .tag{
            display: flex;
            align-items: center;
            margin-right: 30px;
          }
        }
      }
      .right{
        margin-left: 100px;
        position: relative;
        i{
          font-size: 35px!important;
          color: #333;
          padding: 0;
        }
      }
      .right::before{
        content: '|';
        font-size: 22px;
        color: #999;
        position: absolute;
        left: -50px;
      }
    }
    .list::before{
      content: '';
      width: 35px;
      height: 1px;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .content{
      display: block;
    }
    .list.line{
      border-bottom: 15px solid rgb(240,240,240);
    }
    .list.line::before{
      background: rgb(240,240,240);
    }
    .list:last-child{
      border-bottom: none;
    }
  }
</style>
