<template>
<div class="main">
  <navTag title="添加盟友"></navTag>
  <div class="bd">
    <!--    搜索框-->
    <div class="search">
      <div class="input">
        <div class="tips" v-show="keyword.length<1 || isInput">
          <md-icon name="search"></md-icon>
          搜索名字或电话号码
        </div>
        <input type="text" :class="{active:keyword.length>0,act:isInput}"  @focus="isInput=true" @blur="isInput=false" v-model="keyword">
      </div>
      <div class="btn" @click="searchUnion(keyword)">搜索</div>
    </div>
    <div class="unionBox">
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
      >
        <div class="title" v-show="keyword.length<1">请求同盟</div>
        <ul v-show="keyword.length<1">
          <li class="unionItem" v-for="item in UnionInfo" :key="item.id"
              @click="$router.push({path:'/UnionDetail',query:{type:0, inviteId:item.inviteId ,memberId:item.memberId,id:item.id}})">
            <div class="img" :style="item.company.picPath?{background: `url(${item.company.picPath}) no-repeat center center`,backgroundSize: `cover`}:{}">
            </div>
            <div class="data">
              <div class="top" >
                  <span class="name">{{item.company.companyName}}</span>
                  <div class="state">
                    <span class="alUnion" v-if="item.state==1">已结盟</span>
                    <span class="alRefu" v-if="item.state==2">已拒绝</span>
                    <span class="alRefu" v-if="item.state==3">已删除</span>
                    <span v-if="item.state==0">待处理</span>
                    <md-icon name="arrow-right"></md-icon>
                  </div>
              </div>
              <div class="down">
                  <span>车辆库存{{item.count}}辆 </span><span>{{item.company.lxName}} </span><span>{{item.company.lxPhone}}</span>
              </div>
            </div>
          </li>

        </ul>
        <ul v-show="keyword.length>0" class="searchItem">
          <li class="unionItem" v-for="item in searchList" :key="item.id"
              @click="$router.push({path:'/UnionDetail',query:{ type:1, memberId:item.id,id:item.id}})">
            <div class="img" :style="item.picPath?{background: `url(${item.picPath}) no-repeat center center`,backgroundSize: `cover`}:{}" >
            </div>
            <div class="data">
              <div class="top" >
                <span class="name">{{item.companyName}} </span>
                <div class="state">
                  <md-icon name="arrow-right"></md-icon>
                </div>
              </div>
              <div class="down">
                <span>车辆库存{{item.vehicleInfos?item.vehicleInfos.length:0}}辆 </span><span>{{item.lxName}} </span><span>{{item.lxPhone}}</span>
              </div>
            </div>
          </li>

        </ul>
      </md-scroll-view>

    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'AddPartner',
    data(){
      return {
        title:'添加伙伴',
        keyword:'',
        isInput:false,
        UnionInfo:[],
        url:'https://fakeimg.pl/100x100/',
        searchList:[]
      }
    },
    created() {
       this.getUnionInfo()
    },
    methods:{
       // 获取自己的联盟消息
       async getUnionInfo(){
         try{
           this.$toast.loading('1775加载中...')
           const res = await this.$api.get('/union/union/findMsg', {
             params: {
               companyId: this.$store.state.company.id
             }
           })
           const { success, data, info } = res.data;
           this.$toast.hide();
           if(!success) return this.$toast.info(info,1000);
           this.UnionInfo = data;
         }catch (e) {
           this.$toast.info(e,1000)
         }finally {
           this.$toast.hide()
         }
       },
       //搜索要联盟的车辆
       async searchUnion(keyword){
         try{
           this.$toast.loading('1775搜索中...')
           const res = await this.$api.post('/union/union/searchUnion',{
             keyword
           });
           const { success, info, data } = res.data;
           this.$toast.hide();
           if(!success) return this.$toast.info(info,1000);
           this.searchList = data;
         }catch (e) {
           this.$toast.info(e,1000)
         }finally {
           this.$toast.hide()
         }

       }
    }
  };
</script>

<style scoped lang="scss">
  .bd{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

  }
  .search{
    height: vw(96);
    box-sizing: border-box;
    background: #fff;
    padding: 0 32px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input{
      position: relative;
      width: 586px;
      height: 72px;
      border-radius: 36px;
      background: #F6F6F6;
      box-sizing: border-box;
      padding: 0 20px;
      overflow: hidden;
      .tips{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: #999;
        i{
          background: rgba(0,0,0,0);
          font-size: 30px;
          color: #999;
          padding: 0 20px;
        }
      }
      input{
        text-align: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        outline: none;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
        background: #F6F6F6;
        font-size: 28px;
        color: #666;
        opacity: 0;
      }
      input.active,input.act{
        opacity: 1;
      }
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #999;
      /* placeholder字体大小  */
      font-size: vw(24);
    }
    .btn{
       font-size: 32px;
      font-weight: bold;
    }
  }
  .unionBox{
    height: 0;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 32px;

    .title{
      font-size: vw(32);
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: vw(40);
      line-height: 1;
    }
    li.unionItem{
      height: vw(160);
      margin-bottom: vw(16);
      background: #fff;
      padding:vw(20);
      display: flex;
      box-sizing: border-box;
      .img{
        height: vw(120);
        width: vw(120);
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        background: url("../../assets/logo.png") no-repeat center center;
        background-size: cover;
        img{
          width: 100%;
        }
      }
      .data{
        width: 0;
        flex-grow: 1;
        .top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          .name{
            font-size: 32px;
            color: #333;
            font-weight: bold;
            line-height: 1;
          }
          .state{
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #333;
            i{
              font-size: 24px;
              color: #999;
              font-weight: bold;
              margin-left: 20px;
              margin-top: 2px;
            }
            .alUnion{
              color: #FF4C4C;
            }
            .alRefu{
              color: #999;
            }
          }

        }
        .down{
          margin-top: 40px;
          font-size: 24px;
          color: #999;
          line-height: 1;
          span:first-child{
            margin-right: 40px;
          }
          span:last-child{
            margin-left: 20px;
          }
        }
      }
    }
  }
  .searchItem{
    margin-top: 40px;
  }
</style>
