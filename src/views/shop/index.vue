<template>
  <div class="main">
    <div :style="data.bg?{background:`url(${data.bg})`,backgroundSize:`cover`}:{}" class="banner">
      <div class="top">
        <md-icon name="arrow-left" @click="out"></md-icon>
        <md-icon @click="$router.push({path:'editShop',query:{id:data.id}})" name="edit"></md-icon>
      </div>
      <div class="shop">
        <div class="logo">
          <img :alt="data.data" :src="data.logo">
        </div>
        <div class="data">
          <div class="name">{{data.name}}</div>
          <div class="address">{{data.address}}</div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="input">
        <div class="txt">
          <md-icon name="search"></md-icon>
          请输入搜索内容
        </div>
        <input type="text" v-model="keywords" :class="{op:keywords.length>0,op1:isFaus}"
               @focus="isFaus=true" @blur="isFaus=false"   >
      </div>
      <div class="btn" @click="getGoods">搜索</div>
    </div>
    <div class="list">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
        ref="scrollView"
        @refreshing="getGoods"
        @end-reached="$_onEndReached"
      >
        <md-scroll-view-refresh
          slot="refresh"
          slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
          :scroll-top="scrollTop"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></md-scroll-view-refresh>
        <div class="item" v-for="item in list" :key="item.id"
           @click="$router.push({path:'/AroundDetail',query:{id:item.id}})"
          >
          <div class="lable">{{data.type | getType(type)}}</div>
          <div class="pic">
            <img alt="" :src="item.cover">
          </div>
          <div class="data">
            <div class="name">{{item.name}}</div>
            <div class="address">{{data.address}}</div>
            <div class="price">{{item.price}}</div>
            <div class="btn" @click.stop="$router.push({path:'/editGoods',query:{id:item.id}})">编辑资料</div>
          </div>
        </div>
        <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>
    <div @click="$router.push({path:'/addGoods', query:{sid:data.id} })" class="fixAdd">
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        keywords:'',
        isFaus:false,
        data: '',
        list: [],
        type: [],
        page: 1,
        count: 99,
        isRefreshing: false,
        isFinished: false,
      }
    },
    filters:{
      getType(value,type){
        for (const item of type){
          if(value ==item.id){
            return item.name
          }
        }
      }
    },
    methods: {
      async getShopType(){
        const res = await this.$api.get('/getShopType')
        const { success, data, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.type = data
        this.getShop();
        this.getGoods()
      },
      async getShop() {
        const id = this.$store.state.ac.data.id;
        const res = await this.$api.post('/getShopDetail', {id});
        const {success, data, info} = res.data;
        if (!success) return this.$toast.info(info, 1000);
        this.data = data
      },
      async getGoods() {
        const sid = this.$store.state.ac.data.id;
        const page = this.page
        const keywords = this.keywords
        const res = await this.$api.post('/findGoods', {sid,page,keywords});
        const {data, success, info, allPage} = res.data;
        if (!success) return this.$toast.info(info, 1000);
        this.list = data
        this.isRefreshing = false
        this.$refs.scrollView.finishRefresh()
        this.count = allPage
        if(this.page>=allPage){
          this.isFinished = true
        }
      },
      async $_onEndReached(){
        if(this.page<this.count){
          if(this.isFinished==false){
            this.isFinished = true
            this.page++;
            const sid = this.$store.state.ac.data.id;
            const page = this.page
            const keywords = this.keywords
            const res = await this.$api.post('/findGoods', {sid,page,keywords});
            const {data, success, info} = res.data;
            if (!success){
              this.isFinished = false
              this.page--;
              return this.$toast.info(info, 1000);
            }
            this.list.concat(data)
          }
        }
      },
      out(){
        this.$dialog.confirm({
          title: '退出',
          content: '是否退出?',
          confirmText: '确定',
          onConfirm: () =>{
            this.$store.commit('logOut');
            window.location.reload();
          }
        })

      }

    },
    created() {
      this.getShopType()
    }

  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .banner {
    width: 100%;
    height: 500px;
    position: relative;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);

    .top {
      width: 100%;
      height: 96px;
      box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 32px;
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 9;

      i {
        color: #fff;
      }

      i:first-child {
        font-size: 28px;
      }

      i:last-child {
        font-size: 40px;
      }
    }

    .shop {
      width: 686px;
      height: 210px;
      position: absolute;
      background: #fff;
      box-shadow: 0px 4px 8px 0px rgba(242, 242, 242, 1);
      border-radius: 20px;
      z-index: 99;
      bottom: -105px;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;

      .logo {
        width: 160px;
        height: 100%;
        padding: 0 20px;
        position: relative;

        img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          position: absolute;
          top: -40px;
          background: #f7f7f7;
          border-radius: 16px;
        }
      }

      .data {
        width: 0;
        flex-grow: 1;
        box-sizing: border-box;
        padding-right: 20px;

        .name {
          padding-top: 30px;
          font-size: 36px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          line-height: 42px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .address {
          margin-top: 10px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          line-height: 36px;
          color: #333;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .search {
    box-sizing: border-box;
    height: 218px;
    padding: 134px 32px 12px;
    background: #fff;
    display: flex;
    align-items: center;

    .input {
      width: 586px;
      height: 72px;
      background: rgba(246, 246, 246, 1);
      border-radius: 36px;
      position: relative;
      overflow: hidden;

      .txt {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 72px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #999;

        i {
          font-size: 32px;
          margin-right: 20px;
          padding: 0;
          background: rgba(0, 0, 0, 0);
          margin-top: 5px;
        }

      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: 72px;
        background: rgba(246, 246, 246, 1);
        position: absolute;
        left: 0;
        top: 0;
        border: none;
        outline: none;
        opacity: 0;
        box-sizing: border-box;
        padding: 0 30px;
        text-align: center;
      }
      input.op,input.op1 {
        opacity: 1;
      }
    }

    .btn {
      margin-left: 32px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333;
      font-weight: bold;
    }
  }

  .list {
    height: 0;
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    padding: 0 32px;

    .item {
      background: #fff;
      width: 686px;
      height: 218px;
      border-radius: 16px;
      display: flex;
      box-sizing: border-box;
      padding: 20px;
      margin-top: 20px;
      position: relative;

      .lable {
        position: absolute;
        height: 40px;
        padding: 0 12px;
        line-height: 40px;
        background: rgba(255, 52, 52, 1);
        border-radius: 16px 0px 16px 0px;
        top: 0;
        left: 0;
        z-index: 1;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #fff;
      }

      .pic {
        width: 268px;
        height: 178px;
        margin-right: 20px;
        img {
          display: block;
          width: 268px;
          height: 178px;
          object-fit: cover;
          background: #f7f7f7;
        }
      }

      .data {
        height: 100%;
        width: 0;
        flex-grow: 1;
        position: relative;

        .name {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          line-height: 40px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .address {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #999;
          margin-top: 12px;
          line-height: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .price {
          position: absolute;
          bottom: 0;
          left: 0;
          color: #D52002;
          font-size: 40px;
          line-height: 1;
        }

        .price::before {
          content: '￥';
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #D52002;
        }

        .price::after {
          content: '元';
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #D52002;
        }

        .btn {
          width: 142px;
          height: 56px;
          border-radius: 28px;
          border: 2px solid rgba(255, 52, 52, 1);
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FF3434;
          text-align: center;
          line-height: 56px;
          position: absolute;
          right: 0;
          bottom: 0;
        }

      }
    }

    .item:last-child {
      margin-bottom: 20px;
    }
  }
  .fixAdd {
    width: 108px;
    height: 108px;
    background: rgba(255, 52, 52, 1);
    box-shadow: 0px 8px 12px 0px rgba(255, 52, 52, 0.4);
    border-radius: 50%;
    position: fixed;
    bottom: 40px;
    right: 32px;
    z-index: 10;

    .line {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .line::after {
      content: '';
      width: 58px;
      height: 8px;
      border-radius: 8px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .line::before {
      content: '';
      width: 8px;
      height: 58px;
      border-radius: 8px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
