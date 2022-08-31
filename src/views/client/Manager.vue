<template>
  <div class="main">
    <navTag :title="title" :client="true"></navTag>
    <div class="content">
      <div class="search">
        <div class="input">
          <p :class="{fous:isFous==true,isTxt:searchTxt.length>1}">
            <md-icon name="search" size="xs"></md-icon>
            搜索客户的名字、手机号码
          </p>
          <input :class="{fous:isFous==true,isTxt:searchTxt.length>0}" @focus="isFous=true" @blur="isFous=false" placeholder="" type="text" v-model="searchTxt">
        </div>
        <div @click="search" class="btn">搜索</div>
      </div>
      <div class="menu">
        <div :class="{active:type==0}" @click="type=0" class="type">持续</div>
        <div :class="{active:type==1}" @click="type=1" class="type">搁置</div>
        <div :class="{active:type==2}" @click="type=2" class="type">预定</div>
        <div :class="{active:type==3}" @click="type=3" class="type">成交</div>
      </div>
      <div class="list">
        <md-scroll-view
          :scrolling-x="false"
          :scrolling-y="true"
          @end-reached="$_onEndReached"
          @refreshing="refresh"
          auto-reflow
          ref="scrollView"
        >

          <div :key="item.id" class="item" v-for="item in list">
            <router-link :to="{path:'/ClientInfo',query:{id:item.id,companyId:item.companyId}}">
              <div class="state">
                <div class="left">
                  <!-- 持续跟进，type1，搁置没有类，预定type2,成交type3  -->
                  <span class="type1" v-show="item.followState==0">持</span>
                  <span class="type2" v-show="item.followState==2">预</span>
                  <span class="type3" v-show="item.followState==3">成</span>
                  <span v-show="item.followState==1">搁</span>

                  <p>{{item.cusName?item.cusName:'还没沟通'}}</p>
                </div>
                <div class="right">
                  <p>
                    {{item.addTime | time }}
                  </p>
                  <p v-if="item.subAccount">
                    销售:{{ item.subAccount.lxName }}
                  </p>
                </div>
              </div>
              <div class="txt" v-if="item.followState!=3">
                 <span v-if="item.minBudget||item.maxBudget"> 预算:{{item.minBudget}}万-{{item.maxBudget}}万;</span>
                <span v-if="item.vehicleInfo">{{item.vehicleInfo.title }}</span>
                <span v-else-if="item.series">意向品牌:{{item.brandName}}</span>
                <span v-else>暂无意向车型，请尽快联系跟进</span>
              </div>
              <div class="txt" v-else>
                <span>成交价格:  {{item.dealPrice}}万</span>&nbsp;&nbsp;
                <span v-if="item.vehicleInfo">成交车辆:{{item.vehicleInfo.title}}</span>
                <span v-if="item.brandName&&!item.vehicleInfo">成交车辆:{{item.brandName}}</span>
              </div>
            </router-link>
          </div>

          <md-scroll-view-more
            :is-finished="isFinished"
            slot="more"
          >
          </md-scroll-view-more>
        </md-scroll-view>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'manager',
        data() {
            return {
                title: '负责客户',
                isFous: false,
                searchTxt: '',
                type: 0,
                stype: 0, //跟进状态 0.跟进中 1.搁置 2.预定 3.成交
                list: [],
                isFinished: false,
                page: 1
            }
        },
        created() {
            this.findAllClient()
        },
        filters: {
            time: function (value) {
                if (!value) return '暂无时间';
                let time = new Date(value);
                let year = time.getFullYear();
                let mouth = time.getMonth() + 1;
                let day = time.getDate();
                return `${year}-${mouth}-${day}`
            },
        },
        watch: {
            type: function (value) {
                this.page = 1;
                this.findAllClient()
            },
            $route(to, from) {
                this.page = 1;
                console.log('23655')
                this.findAllClient()
            }
        },
        methods: {
            async test(id){
               console.log(id)
            },
            async findAllClient() {
              try{
                // 区别子账号跟主账号
                let subAccountId =null;
                let accountType = null;
                if(this.$store.state.ac.account){
                  subAccountId = this.$store.state.ac.id;
                  //accountType = 1为子账号
                  accountType = 2;
                }else {
                  //accountType = 1为主账号
                  accountType = 0;
                }
                console.log(4444444,subAccountId)
                console.log(111111,this.$store.state.company.id,)
                this.$toast.loading('1775加载中...');
                let res = await this.$api.get('/bus/company/findAllClient', {
                  params: {
                    id: subAccountId,
                    companyId: this.$store.state.company.id,
                    accountType: accountType,
                    followState: this.type,
                    keyword: this.searchTxt,
                    page: this.page
                  }
                });
                console.log('res', res);
                let {success, data} = res.data;
                this.$toast.hide();
                if (!success) return this.$toast.info('暂无数据，请查看其他类别');
                this.list = data
                console.log(this.list)
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            async $_onEndReached() {
                if (this.isFinished) {
                    return
                }
                this.page++;
                console.log(this.isFinished, this.page);
                this.isFinished = true;
                // 区别子账号跟主账号
                let subAccountId =null;
                let accountType = null;
                if(this.$store.state.ac.account){
                    subAccountId = this.$store.state.ac.id;
                    //accountType = 1为子账号
                    accountType = 2;
                }else {
                    //accountType = 1为主账号
                    accountType = 1;
                }
                let res = await this.$api.get('/bus/company/findAllClient', {
                    params: {
                        id: subAccountId,
                        companyId: this.$store.state.company.id,
                        accountType: accountType,
                        followState: this.type,
                        keyword: this.searchTxt,
                        page: this.page
                    }
                });
                let {success, data} = res.data;
                if (!success) return this.$toast.info('商机加载失败，请重新加载');
                this.list = this.list.concat(data);
                this.isFinished = false;
                this.$refs.scrollView.finishLoadMore();
            },
            refresh() {
                this.page = 1;
                this.findAllClient()
            },
            search() {
                this.page = 1;
                this.findAllClient()
            }
        },
        deactivated() {
            const st = this.$refs.scrollView.getOffsets();
            sessionStorage.setItem('scrollTop', st.top);
        },
        activated() {
            const st = sessionStorage.getItem('scrollTop');
            const from = window.sessionStorage.getItem('from');
            if(from === 'home') this.init()
            if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView.scrollTo(0, parseFloat(st)), 100);
            this.qwe=1
        },
        beforeRouteEnter(to, from, next){
            window.sessionStorage.setItem('from',from.name);
            next()
        },

    };
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #f7f7f7;
  }

  .content {
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .search {
    display: flex;
    align-items: center;
    padding: vw(12) vw(32);
    box-sizing: border-box;
    background: #fff;

    .state {
      font-size: vw(32);
      color: #333;
      margin-right: vw(24);
      display: flex;
      align-items: center;

      i {
        width: vw(20);
        height: vw(13);
        background: #333;
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        margin-left: vw(8);
      }
    }

    .input {
      position: relative;
      width: 0;
      flex-grow: 1;
      height: vw(72);
      border-radius: vw(32);
      background: #F6F6F6;
      overflow: hidden;
      margin-right: 32px;

      p {
        position: absolute;
        width: 100%;
        line-height: vw(72);
        text-align: center;
        color: #999;
        font-size: vw(28);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        opacity: 1;

        i {
          margin-right: vw(8) !important;
          font-size: vw(32) !important;
          color: #999 !important;
          padding: 0 !important;
          background: #F6F6F6 !important;
        }
      }

      p.fous,p.isTxt {
        opacity: 0;
      }

      input {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: vw(28);
        color: #333;
        border: none;
        position: relative;
        z-index: 2;
        opacity: 0;
        background: #F6F6F6;
      }

      input.fous,input.isTxt {
        opacity: 1;
      }
    }

    .btn {
      font-size: 32px;
      color: #333;
      font-weight: bold;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    height: 80px;

    .type {
      font-size: 28px;
      color: #999;
      height: 100%;
      line-height: 80px;
      position: relative;
      transition: 0.5s;
    }

    .type.active {
      color: #FF4C4C;
      font-weight: bold;
      transition: 0.5s;
    }

    .type::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: #FF4C4C;
      border-radius: 4px;
      transform: scale(0);
      bottom: 0;
      left: 0;
    }

    .type.active::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: #FF4C4C;
      border-radius: 4px;
      bottom: 0;
      left: 0;
      transform: scale(1);
      transition: 0.5s;
    }
  }

  .list {
    width: vw(686);
    box-sizing: border-box;
    margin: vw(14) auto 0;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .item {
    box-sizing: border-box;
    padding: vw(20);
    background: #fff;
    border-radius: vw(16);
    margin-bottom: vw(16);
    display: flex;
    flex-direction: column;

    .state {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        span {
          display: block;
          width: vw(40);
          height: vw(40);
          border-radius: vw(4);
          background: #d8d8d8;
          text-align: center;
          line-height: vw(40);
          font-size: vw(24);
          color: #fff;
        }

        span.type1 {
          background: #FFB3B3;
        }

        span.type2 {
          background: #FF8080;
        }

        span.type3 {
          background: #FF4C4C;
        }

        p {
          margin-left: vw(20);
          font-size: vw(32);
          color: #333;
          font-weight: bold;
        }
      }

      .right {
        display: flex;
        align-items: center;

        p {
          font-size: vw(24);
          color: #999;
          margin-left: vw(20);
        }
      }
    }

    .txt {
      margin-top: vw(20);
      font-size: vw(28);
      color: #333;
      line-height: vw(40);
      text-align: left;
    }
  }

</style>
