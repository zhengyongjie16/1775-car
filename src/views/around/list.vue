<template>
  <div class="main">
    <div class="nav">
      <!--      <div class="left" @click="$router.go(-1)">-->
      <!--        <md-icon name="arrow-left"></md-icon>-->
      <!--      </div>-->
      <div class="title">周边服务</div>
    </div>
    <div class="content">
      <div class="search">
        <div class="show">
          <md-icon name="search" @click="doSearch"></md-icon>
          <input placeholder="请输入关键字进行搜索" type="text" v-model="keywords">
        </div>
      </div>
      <div class="menu-show">
        <div class="menu">
          <div class="item itag" :class="{active:type==0}" @click="type=0">
            <div class="img" :style="{ background:`url(${url}) no-repeat center center`,
              backgroundSize:`cover`}"></div>
            <div class="title">全部</div>
          </div>
          <div class="item itag" :class="{active:type==item.id}" v-for='(item,index) in menu' :key="item.id"
               @click="type=item.id" v-show="index<8">
            <div class="img"  :style="item.url?{ background:`url(${item.url}) no-repeat center center`,
              backgroundSize:`cover`}:{}"></div>
            <div class="title">{{item.name}}</div>
          </div>
          <div class="item itag" :class="{active:type==1}" @click="moreMenu=true">
            <div class="img" :style="{ background:`url(${more}) no-repeat center center`,
              backgroundSize:`cover`}"></div>
            <div class="title">其他</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="listing">
          <md-scroll-view
            :scrolling-x="false"
            :scrolling-y="true"
            auto-reflow
            @refreshing="onRefresh"
            ref="scrollView"
            @endReached="loadShop"
          >
            <md-scroll-view-refresh
              slot="refresh"
              slot-scope="{ scrollTop, isRefreshActive}"
              :scroll-top="scrollTop"
              :is-refreshing="isLoading"
              :isRefreshActive="isRefreshActive"
            ></md-scroll-view-refresh>
            <div :key="item.id" class="bill" v-for="(item) in bill"
                 @click="$router.push({path:'/AroundShop', query:{ id:item.id }})">
              <div class="logo">
                <div class="tag">{{item.type | typeAbc(menu)}}</div>
                <img :src="item.logo" alt="">
              </div>
              <div class="data">
                <div class="name">{{item.name}}
                </div>
                <div class="detail">
                  <div class="num">电话：{{item.phone}}</div>
                  <!--                  <div class="distance">1.8km</div>-->
                </div>
                <div class="price">{{item.address}}</div>
                <!--                <div class="shop">-->
                <!--                  <div class="goods" v-for="obj in item.goods" :key="obj.id" @click.stop="$router.push({path:'/AroundDetail',query:{id:obj.id}})">-->
                <!--                    <div class="img">-->
                <!--                      <div class="tag" v-if="obj.type">{{obj.type}}</div>-->
                <!--                      <img :src="obj.cover" alt="">-->
                <!--                    </div>-->
                <!--                    <div class="txt">{{obj.name}}</div>-->
                <!--                    <div class="money">￥{{obj.price}}</div>-->
                <!--                  </div>-->
                <!--                </div>-->
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
    <tab></tab>


    <template>
      <md-popup
        v-model="moreMenu"
        position="right"
      >
        <div class="page">
          <md-scroll-view auto-reflow :scrolling-x="false" :scrolling-y="true">
            <div class="title">全部分类</div>
            <div class="plist">
              <div class="item" :class="{active:type==item.id}" v-for='item in menu' :key="item.id"
                   @click="type=item.id">
                <div class="icon" :style="item.url?{ background:`url(${item.url}) no-repeat center center`,
              backgroundSize:`cover`}:{}"></div>
                <div class="name">{{item.name}}</div>
              </div>
            </div>
          </md-scroll-view>
        </div>
      </md-popup>
    </template>
  </div>
</template>

<script>
  import tab from '../../component/tab'
  export default {
    name: "index",
    data() {
      return {
        currentName:'',
        moreMenu:false,
        url:require('../../assets/all_icon.png'),
        more:require('../../assets/more_icon.png'),
        menu: [],
        list: ['', '', '', '', '', '', ''],
        type: 0,
        keywords: '',
        page: 1,
        tPage: 99,
        bill: [],
        isLoading: false,
        isFinished:false,
        qwe: 4,
        num:3
      }
    },
    components:{
      tab
    },
    created() {
      if(this.$route.query.type){
        this.type = this.$route.query.type
      }
      this.getTypeList()
    },
    watch:{
      type(value){
        console.log(value)
        this.type = value;
        this.page = 1;
        this.moreMenu=false
        this.getShop()
      }
    },
    filters:{
      typeAbc(value,menu){
        for(const obj of menu){
          if(value == obj.id){
            return obj.name
          }
        }
        if(value == 1) return '其他';
      },
    },
    methods: {
      async getTypeList(){
        const res = await this.$api.get('/getShopType')
        const { data, success, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.menu = data
        this.getShop()
      },
      async getShop() {
        let type = this.type;
        if (type ==0) {
          type = '';
        }
        let keywords = this.keywords;
        let page = this.page;
        const limit = 15;

        try{
          this.$toast.loading('1775加载中...');
          let _data = await this.$api.post('/getShop', {
            type, keywords, page, limit,
          });
          this.$toast.hide()
          const {data, total, success, info} = _data.data;
          if(!success) return this.$toast(info,1000);
          this.tPage = Math.floor(total/limit);
          console.log('取+++',this.tPage);
          this.bill = data;
          setTimeout(()=>{ this.$refs.scrollView.scrollTo(0,0)},100)
          this.isLoading = false;
          this.$refs.scrollView.finishRefresh();
          this.$refs.scrollView.finishLoadMore();
        }catch (e) {
          this.$toast.info(e,1000)
        }finally {
          this.$toast.hide()
        }

      },
      doSearch(){
        this.page = 1;
        this.type =0;
        this.getShop()
      },
      // 刷新
      onRefresh(){
        this.page = 1;
        this.type =0;
        this.name='';
        this.getShop();
      },
      // 上拉加载
      async loadShop(){
        this.isFinished = true;
        if(this.page<this.tPage){
          this.page++;
        }else {
          return
        }
        let type = this.type;
        if (type ==0) {
          type = '';
        }
        let name = this.name;
        let page = this.page;
        const limit = 15;
        try{
          this.$toast.loading('1775加载中...');
          let _data = await this.$api.post('/getShop', {
            type, name, page, limit,
          });
          this.isFinished =false;
          const {data, total, success, info} = _data.data;
          if(!success) return this.$toast('加载失败',1000);
          this.bill = this.bill.concat(data);
          this.$refs.scrollView.finishLoadMore();
        }catch (e) {
          this.$toast.info(e,1000)
        }finally {
          this.$toast.hide()
        }
      },
      init(){
        this.page = 1;
        this.type =0;
        this.name='';
        this.getShop();
        setTimeout(() => this.$refs.scrollView.scrollTo(0,0), 100);
      },
      ddd() {
        const a1 = document.querySelector('.tab1-');// 获取首页导航标签图标的节点
        const op = document.querySelector('.op');// 获取op图标的节点
        const po = document.querySelector('.po');// 获取po图标的节点
        const ic = document.querySelector('.ic');// 获取第二个的首页的样式
        const o = getComputedStyle(a1, null).getPropertyValue('display');// 获取a1节点的display的值
        const centDom = document.querySelector('.cct');// 获取首页内容框的节点 可以直接获取到首页的节点
        // 更改两个不一样的首页的样式，一个显示一个隐藏
        a1.style.display = 'flex';
        ic.style.display = 'none';
        // 阻止nav函数内部执行
        // this.sdsc = true;
        if (o == 'flex' && this.a) {
          // 满足条件将更改op节点与po节点的top的值 起到更换的i标签内的图标更换
          op.style.top = '-50%';
          po.style.top = '23%';
          centDom.scrollTop = 900;// 滚动值赋予值为900(首页内容框的滚动条)
          this.a = !this.a;// 取a的相反值
        } else {
          op.style.top = '27%';
          po.style.top = '100%';
          centDom.scrollTop = 0;// 滚动值赋予值为0(首页内容框的滚动条)
          this.a = !this.a;
        }
        // 允许nav函数内部执行
        // this.sdsc =false
      },

    },
    deactivated() {
      const st = this.$refs.scrollView.getOffsets();
      sessionStorage.setItem('scrollTop', st.top);
    },
    activated() {
      const st = sessionStorage.getItem('scrollTop');
      const from = window.sessionStorage.getItem('from');
      if(from === 'Around') this.init()
      if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView.scrollTo(0, parseFloat(st)), 100);
    },
    beforeRouteEnter(to, from, next){
      window.sessionStorage.setItem('from',from.name);
      next()
    },



  }
</script>

<style lang="scss" scoped>
  .showlist{
    background: #fff;}
  .main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #FF4C4C;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .nav {
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    position: relative;

    .left {
      display: flex;
      align-items: center;

      i {
        font-size: 40px;
        margin-right: 12px;
        font-weight: bold;
        color: #fff;
      }
    }

    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      color: #fff;
    }
  }
  .content {
    background: rgb(247, 247, 247);
    border-radius: 36px 36px 0 0;
    overflow: hidden;
    width: 750px;
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .search {
    padding: 24px;
    width: 750px;
    box-sizing: border-box;

    .show {
      height: 70px;
      box-sizing: border-box;
      border-radius: 35px;
      overflow: hidden;
      background: #fff;
      display: flex;
      align-items: center;
      color: #333;
      font-size: 26px;
      i {
        font-size: 30px;
        font-weight: bold;
        margin-right: 20px;
        padding: 0;
        margin-left: 20px;
        color: #333;

        width: auto;
      }

      input {
        width: 0;
        flex-grow: 1;
        height: 100%;
        border: none;
        outline: none;
        color: #333;
        font-size: 26px;
      }
    }
  }
  .menu-show.scroll {
    position: absolute;
    width: 100%;
    top: 0;
    background: rgb(247, 247, 247);
    z-index: 999;
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 150px;
      text-align: center;
      float: left;
      .img {
        height: 32px;
        width: 32px;
        background: #000;
        margin: 16px auto 0;
      }
      .title {
        font-size: 24px;
        color: #333;
        margin-top: 14px;
        margin-bottom: 16px;
        line-height: 1;
      }
    }

    .item.itag {
      .img {
        width: 50px;
        height: 50px;
      }
    }
    .item.active{
      .title{
        color: #f0b21d;
      }
    }
  }
  .menu-show {
    width: 750px;
    padding-bottom: 16px;
  }
  .list {
    /*margin-top: 30px;*/
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 0;
    flex-grow: 1;
  }
  .screen {
    height: 80px;
    display: flex;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 750px;
    box-sizing: border-box;

    .total {
      font-size: 36px;
      color: #333;
      font-weight: bold;

      i {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
    }

    .detail {
      display: flex;
      align-items: center;

      .tag {
        font-size: 28px;
        color: #333;
        margin-left: 80px;

        i {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }
  .lable {
    margin-top: 20px;
    padding: 0 24px;
    box-sizing: border-box;
    margin-bottom: 20px;

    .show {
      display: flex;

      .tag {
        width: 160px;
        height: 56px;
        border-radius: 12px;
        background: #fff;
        margin-right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 32px;
      }
    }
  }
  .listing {
    padding: 0 24px;
    width: 750px;
    box-sizing: border-box;
    height: 100%;

    .bill {
      display: flex;
      align-items: flex-start;
      background: #fff;
      border-radius: 16px;
      margin-bottom: 20px;
      padding: 20px;

      .logo {
        width: 140px;
        height: 140px;
        border-radius: 12px;
        position: relative;
        background: #f7f7f7;
        margin-right: 14px;
        img{
          width: 140px;
          height: 140px;
          object-fit: cover;
        }

        .tag {
          position: absolute;
          padding: 12px;
          font-size: 16px;
          background: rgb(252, 211, 106);
          border-radius: 12px;
          top: 0;
          right: 0;
          color: #333;
          line-height: 1;
        }
      }

      .data {
        width: 0;
        flex-grow: 1;

        .name {
          font-size: 32px;
          font-weight: bold;
          line-height: 1.5;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .detail, .price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26px;
          color: #333;
          margin-top: 10px;
        }

        .evaluate {
          font-size: 26px;
          margin-top: 10px;
          /*background: rgb(255,252,254);*/
          color: rgb(205, 171, 90);
          /*border-radius: 12px;*/
          /*border: 1px solid rgb(205,171,90);*/
        }

        .shop {
          display: flex;
          align-items: center;
          margin-top: 20px;

          .goods {
            width: 150px;
            margin-right: 15px;

            .img {
              width: 150px;
              height: 170px;
              border-radius: 12px;
              background: #f7f7f7;
              position: relative;
              overflow: hidden;
              img{
                width: 150px;
                height: 170px;
                border-radius: 12px;
                object-fit: cover;
              }
              .tag {
                height: 36px;
                width: 76px;
                text-align: center;
                line-height: 36px;
                border-radius: 0 0 12px 0;
                background: linear-gradient(90deg, rgba(239, 149, 48, 1) 0%, rgba(249, 77, 34, 1) 100%);
                font-size: 16px;
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
              }
            }

            .txt {
              width: 100%;
              margin-top: 10px;
              font-size: 26px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .money {
              font-size: 26px;
              font-weight: bold;
              color: rgb(255, 63, 47);
              margin-top: 15px;
            }
          }
          .goods:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
  /*弹出层 */
  .page{
    width: 562px;
    height: 100%;
    background: #fff;
    .title{
      line-height: 96px;
      padding: 0 32px;
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    .plist{
      padding: 0 32px;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 25%;
        text-align: center;
        .icon{
          width: 50px;
          height: 50px;
          margin: 16px auto 0;
        }
        .name{
          font-size: 24px;
          color: #333;
          line-height: 1;
          margin-top: 24px;
          margin-bottom: 16px;
        }
      }
      .item.active{
        .name{
          color: #f0b21d;
        }
      }
    }
  }
</style>
