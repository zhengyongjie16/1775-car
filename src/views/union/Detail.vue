<template>
    <div class="main">
      <navTag title="车行主页"></navTag>
      <div class="content">
        <md-scroll-view
         :scrolling-y="true"
         :scrolling-x="false"
         auto-reflow
         ref="scrollView4"
         @refreshing="$_onRefresh"
         @end-reached="loadMore"
        >
          <!--下拉刷新处理-->
          <md-scroll-view-refresh
            slot="refresh"
            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
            :end-reached-threshold="300"
          ></md-scroll-view-refresh>
          <div class="data">
            <div class="pic" v-if="info.picPath"
                 :style="info.picPath?{background: `url(${info.picPath}) no-repeat center center`,backgroundSize: `cover`}:{}"></div>
            <div class="right">
              <div class="name">
                 <div class="title">{{info.companyName}}</div>
                <div class="lable" v-if="unionInfo" :class="{alUnion:unionInfo.state==1}" ></div>
              </div>
              <div class="detail">
                <span>库存{{count}}辆 <i>|</i> {{info.lxName}}</span>
                <span>{{info.lxPhone}}</span>
              </div>
              <div class="address">
                {{info.address}}
              </div>
            </div>
          </div>
          <div class="list">
            <div class="name">
              拥有车辆
            </div>
            <div class="show">
              <div class="item" v-for="item in carList" :key="item.id" @click="$router.push({path:'/CarDetailed',query:{id:item.id,companyId:id}})">
                <div class="pic"
                     :style="item.cover?{background: `url(${item.cover}) no-repeat center center`,backgroundSize: `cover`}:{}"></div>
                <div class="info">
                   <div class="name">{{item.title}}</div>
                   <div class="detail">{{item.brandDate | brandTime}}年上牌·{{item.mileage}}万公里</div>
                  <div class="price">{{item.onlinePrice}}</div>
                </div>
              </div>
            </div>
          </div>
          <!--加载更多-->
          <md-scroll-view-more
            slot="more"
            :is-finished="isEnd"
          >
          </md-scroll-view-more>
        </md-scroll-view>
      </div>
      <div class="handle">

        <div class="alInvitBtn"  v-if="unionInfo&&unionInfo.state==1" @click="deleteUnion">解除同盟</div>
        <div class="item" v-else-if="unionInfo&&unionInfo.state==0">
          <div class="rebtn" @click="accUnion(2)">拒绝联盟</div>
          <div class="albtn" @click="accUnion(1)">接受联盟</div>
        </div>
        <!--   搜索列表    -->
        <div class="invitBtn" @click="invitationUnion" v-else>邀请同盟</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                state: 2,
                info:{
                    company:{
                        picPath:''
                    }
                },
                id:'',
                unionInfo:'',
                type:0,    //默认从消息列表进来
                carList:[],
                count: '',
                page:1,
                isRefreshing:false,  //下拉刷新处理
                isEnd: false, // 下载加载是否到了最后一页
            }
        },
        created() {
            // 如果是从联盟消息列表进来
            if(this.$route.query.type==0){
                this.type = 0;
                this.page=1;
                this.id = this.$route.query.inviteId
            }else {
                //如果是从搜索列表进来
                this.type = 1;
                this.page=1;
                this.id = this.$route.query.memberId
            }
            this.getCompany();
            this.getCompanyCars();
            this.getUnionInfo()
        },
        watch:{
            $route(to, from) {
                if(from.name=='Union'){
                  console.log('+++++++????')
                    if(this.$route.query.type==0){
                        this.type = 0;
                        this.page=1;
                        this.id = this.$route.query.inviteId
                    }else {
                      console.log('+++++++????2222222')
                        //如果是从搜索列表进来
                        this.type = 1;
                        this.page=1;
                        this.id = this.$route.query.memberId
                    }
                    this.getCompany();
                    this.getCompanyCars();
                    this.getUnionInfo()
                }
            }
        },
        filters:{
            brandTime:value=>{
                const time = new Date(value);
                const year = time.getFullYear();
                return year
            }
        },

        methods:{
            // 获取公司详情
            async getCompany(){
              try{
                this.$toast.loading('1775加载中...');
                const res = await this.$api.get('/union/getCompany',{
                  params: {
                    companyId: this.id,
                  }
                })
                const { success, info, data } = res.data;
                this.$toast.hide();
                return this.info = data
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            // 获取公司车辆
            async getCompanyCars(){

              try{
                this.$toast.loading('1775加载中...');
                const res = await this.$api.get('/union/getCompanyCars',{
                  params: {
                    companyId: this.id,
                    page: 1
                  }
                });
                const { success, info, data, count } = res.data;
                this.$toast.hide();
                if(!success) return this.$toast.info(info,1000);
                this.carList = data;
                this.count = count
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }

            },
            // 获取联盟消息
            async getUnionInfo(){
              try{
                console.log(this.$route.query)
                this.$toast.loading('1775加载中...')
                const res = await this.$api.get('/union/union/getUnionInfo',{
                  params: {
                    inviteId: this.$route.query.inviteId,
                    memberId: this.$route.query.memberId
                  }
                })
                const { success, info, data } = res.data
                this.$toast.hide();
                if(!success) this.$toast.info(info,1000);
                return this.unionInfo = data
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            // 是否接受同盟
            async accUnion(state){
                const res = await this.$api.post('/union/union/acceptInvitation',{
                    companyId: this.$route.query.inviteId,
                    member: this.$route.query.memberId,
                    state,
                    id:this.$route.query.id
                })
                const { success, info } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.$toast.info(info,1000);
                this.getUnionInfo()
            },
            // 解除同盟
            async deleteUnion(){
               const res = await this.$api.post('/union/union/deleteUnion',{
                    companyId: this.$route.query.inviteId,
                    member: this.$route.query.memberId,
                })
               const { success, info } = res.data;
               if(!success) return this.$toast.info(info,1000);
                this.$toast.info(info,1000);
                this.getCompany();
                this.getCompanyCars();
                this.getUnionInfo()
            },
            // 邀请同盟
            async invitationUnion(){
                if(this.id==this.$store.state.company.id) return this.$toast.info('不能对自己发出邀请',1000);
                const res = await this.$api.post('/union/union/invitationUnion',{
                    inviteId: this.$store.state.company.id,
                    memberId: this.id,
                })
                const { success, info, data } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.$toast.info(info,1000);
            },
            async $_onRefresh(){  //处理下拉刷新

              try{
                this.$refs.scrollView4.scrollTo(0,0,true);
                if(this.isRefreshing) return  this.$toast.info('1775加载中...')
                this.page = 1;
                this.isRefreshing = true;//标记正在刷新中 避免重复进行
                this.getCompany();
                this.getCompanyCars();
                this.$refs.scrollView4.finishRefresh()
                this.isRefreshing = false; //移除标记
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            async loadMore(){ //处理加载更多
                if(this.isEnd) return  this.$toast.info('暂时没有更多的加载了哦！',1000);
                this.page++;
                const res = await this.$api.get('/union/getCompanyCars',{
                    params: {
                        companyId: this.id,
                        page: this.page
                    }
                });
                this.isEnd =true
                const { success, info, data } =res.data;
                this.isEnd =false;
                this.carList = this.carList.concat(data)
                this.$nextTick(() => {
                    this.$refs.scrollView4.reflowScroller();
                    this.$refs.scrollView4.finishLoadMore();
                });

            },
        },
        deactivated() {
            const st = this.$refs.scrollView4.getOffsets();
            sessionStorage.setItem('scrollTop', st.top);
        },
        activated() {
            const st = sessionStorage.getItem('scrollTop');
            const from = window.sessionStorage.getItem('from');
            console.log(st,from)
            if(from === 'Union') return setTimeout(() => this.$refs.scrollView4.scrollTo(0,0), 100);
            if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView4.scrollTo(0, parseFloat(st)), 100);
          if(this.$route.query.type==0){
            this.type = 0;
            this.page=1;
            this.id = this.$route.query.inviteId
          }else {
            //如果是从搜索列表进来
            this.type = 1;
            this.page=1;
            this.id = this.$route.query.memberId
          }
          this.getCompany();
          this.getCompanyCars();
          this.getUnionInfo()

            },
        beforeRouteEnter(to, from, next){
            window.sessionStorage.setItem('from',from.name);
            next()
        },
    }
</script>

<style scoped lang="scss">
   .main{
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
     background: #F7F7F7;
     height: 100%;
   }
  .content{
    height: 0;
    flex-grow: 1;
    background: #f7f7f7;
  }
  .data{
    padding: 40px 32px;
    display: flex;
    align-items: flex-start;
    .pic{
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-right: 40px;
      background: #fff url("../../assets/logo.png") no-repeat center center;
      background-size: cover;
    }
    .right{
      width: 0px;
      flex-grow: 1;
      .name{
        font-size: 40px;
        color: #333;
        font-weight: bold;
        display: flex;
        align-items: flex-start;
        .title{
          max-width: 68%;
        }
        .lable{
          width: 120px;
          height: 40px;
          background: url("../../assets/lable.png") no-repeat center center;
          background-size: 120px 40px;
          margin-top: 10px;
          margin-left: 32px;
        }
        .lable.alUnion{
          background: url("../../assets/union.png") no-repeat center center;
          background-size: 120px 40px;
        }
      }
      .detail{
        display: flex;
        align-items: center;
        line-height: 1;
        margin-top: 40px;
        font-size: 28px;
        color: #999;
        span{
          display: flex;
          align-items: center;
        }
        span:last-child{
          display: block;
          margin-left: 10px;
        }
        span{
          i{
            margin: 0 10px;
            font-size: 20px;
          }
        }
      }
      .address{
        margin-top: 20px;
        font-size: 28px;
        color: #999;
        line-height: 1.2;
      }
    }
  }
  .handle{
    padding: 32px;
    .invitBtn{
      height: 80px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: #FF4C4C;
      font-size: 32px;
    }
    .alInvitBtn{
      height: 80px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      color: #FF4C4C;
      background: #fff;
      border: 1px solid #FF4C4C;
      font-size: 32px;
    }
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      div{
        width: 334px;
        height: 80px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        box-sizing: border-box;
      }
      div.rebtn{
        color: #FF4C4C;
        border: 1px solid #FF4C4C;
      }
      div.albtn{
        background: #FF4C4C;
        color: #fff;
      }
    }
  }
  .list{
    padding: 0 32px;
    margin-top: 52px;
    .name{
      font-size: 32px;
      color: #333;
      font-weight: bold;
    }
    .show{
      .item{
        height: 222px;
        background: #fff;
        border-radius: 16px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        margin-bottom: 16px;
        .pic{
          width: 274px;
          height: 182px;
          margin-right: 20px;
          background: url("../../assets/logo.png") no-repeat center center;
          background-size: cover;
        }
        .info{
          width: 0;
          flex-grow: 1;
          height: 100%;
          position: relative;
          .name{
            font-size: 32px;
            color: #333;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .detail{
            font-size: 24px;
            color: #999;
            line-height: 1;
            margin-top: 12px;
          }
          .price{
            font-size: 40px;
            font-weight: bold;
            color: #D52002;
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .price::before{
             content: '￥';
             font-size: 24px;
             color: #D52002;
             font-weight: bold;
           }
          .price::after{
            content: '万';
            font-size: 24px;
            color: #D52002;
            font-weight: bold;
          }
        }
      }
      .item:first-child{
        margin-top: 40px;
      }
    }
  }
</style>
