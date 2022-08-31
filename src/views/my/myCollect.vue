<template>
    <div class="main">
      <navTag :isShare="false" :title="title"></navTag>
      <div class="menu">
        <div class="item" :class="{active:showType==1}" @click="showType=1">批车信息</div>
        <div class="item" :class="{active:showType==2}" @click="showType=2">收车信息</div>
      </div>
      <div class="content" v-show="showType==1">

        <md-scroll-view
          :scrolling-y="true"
          :scrolling-x="false"
          @end-reached="moreMyCollect"
          @refreshing="refreshCollect"
          auto-reflow
          ref="scrollView1"
        >
          <div class="lable" v-for="item in Carlist" :key="item.id" @click="$router.push({path:'/CarInfo',query:{id:item.vehicleInfo.id,companyId:item.vehicleInfo.companyId,isTrade:1,sCollect: 1}})">
            <div class="top">
              <div class="pic" :style="item.vehicleInfo.cover?{background:`url(${item.vehicleInfo.cover})`,
            backgroundSize: `cover`}:{}"></div>
              <div class="data">
                <div class="title mt" v-if="item.vehicleInfo.title">
                  {{item.vehicleInfo.title}}
                </div>
                <div class="trip">
                  {{item.vehicleInfo.year}}年上牌·{{item.vehicleInfo.mileage}}万公里
                </div>
              </div>
            </div>
          </div>
          <md-scroll-view-more
            :is-finished="cisFinished"
            slot="more"
          ></md-scroll-view-more>
        </md-scroll-view>
      </div>

      <div class="content" v-show="showType==2">

        <md-scroll-view
          :scrolling-y="true"
          :scrolling-x="false"
          @end-reached="moreMyInfos"
          @refreshing="refresh"
          auto-reflow
          ref="scrollView"
        >
          <div class="lable" v-for="item in list" :key="item.id">
            <div class="top">
              <div class="pic" :style="item.info.pic?{background:`url(${item.info.pic.split(',').slice(0,1)})`,
            backgroundSize: `cover`}:{}" @click="showPic(item.info.pic)"></div>
              <div class="data">
                <div class="concat">
                  <div class="name">
                    联系人：{{item.info.lxName}}
                  </div>
                  <div class="phone">
                    {{item.info.lxPhone}}
                  </div>
                </div>
                <div class="title" v-if="item.info.brandName">
                  {{item.info.brandName}}
                </div>
                <div class="trip">
                  {{item.info.year}}年上牌·{{item.info.mileage}}万公里
                </div>
              </div>
            </div>
            <div class="handle">
              <div class="tag" @click="celCollect(item.info.id)">取消收藏</div>
              <div class="tag"><a :href="`tel:${item.lxPhone}`">电话联系</a></div>
            </div>
          </div>
          <md-scroll-view-more
            :is-finished="isFinished"
            slot="more"
          ></md-scroll-view-more>
        </md-scroll-view>
      </div>




      <!-- 图片预览 -->
      <md-image-viewer
        v-model="isViewerShow"
        :list="imgs"
        :has-dots="true"
        :initial-index="viewerIndex">
      </md-image-viewer>
    </div>
</template>

<script>
    export default {
        name: "myCollect",
        data(){
            return{
                title:'我的收藏',
                // 我的收车
                isFinished: false,
                page: 1,
                list:[],
                isViewerShow:false,
                imgs:[],
                viewerIndex:0,

                showType: 1,
                // 我的批车
                Carlist: [],
                cisFinished: false,
                cpage: 1,
            }
        },
        created() {
            this.findMyInfos();
            this.getCollectCar()
        },
        methods:{
            // 获取关于我的
            async findMyInfos() {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/findMyInfos', {
                    account: account,
                    page: 1,
                    type: 0
                });
                const {success, info, data} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                for(const item of data){
                    if(!item.info.iscollect){
                        item.info.iscollect=1
                    }
                }
                this.list = data;
            },
            // 下拉加载关于我的收车
            async moreMyInfos() {
                if(this.showType ==2){
                    if (this.isFinished == false) {
                        this.page++;
                        this.isFinished = true;
                        let account = null;
                        if(this.$store.state.ac.account){
                            account = this.$store.state.ac.account
                        }else {
                            account = this.$store.state.company.phone
                        }
                        const res = await this.$api.post('/carSource/findMyInfos', {
                            account: account,
                            page: this.page,
                            type: 0
                        });
                        const {success, info, data} = res.data;
                        this.cisFinished = false;
                        if (!success) return this.$toast.info(info, 1000);
                        if(!data){
                            this.cisFinished = true;
                        }
                        this.$refs.scrollView.finishLoadMore();
                        for(const item of data){
                            if(!item.info.iscollect){
                                item.info.iscollect=1
                            }
                        }
                        this.list = this.list.concat(data);
                    }
                }
            },
             // 刷新我的收车
            refresh(){
                this.isFinished = false;
                this.page = 1;
                this.findMyInfos()
            },
            // 取消收藏
            async celCollect(id) {
                const res = await this.$api.post('/carSource/cancelInfos', {
                    id: id,
                    account: this.$store.state.company.phone,
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info, 1000);
                for (const index in this.list){
                     if(id == this.list[index].info.id ){
                         this.list.splice(index,1)
                     }
                }
            },
            // 预览图片
            showPic(pic){
                const imgs = pic.split(',');
                this.imgs = imgs;
                this.isViewerShow=true;
            },
            // 获取我的批车
            async getCollectCar(){
                //确认账号
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const _res = await this.$api.get('/car/getCollectCar',{
                    params: {
                        account
                    }
                })
                const { success, info, data } = _res.data;
                if(!data){
                    this.cisFinished = true;
                }
                if(!success) return this.$toast.info(info,1000);
                this.Carlist = data
            },
            // 刷新我的批车
            refreshCollect(){
                this.cisFinished = false;
                this.cpage = 1;
                this.getCollectCar()
            },
            // 上拉加载我的批车
            async moreMyCollect(){
                if(this.showType ==1){
                    if (this.cisFinished == false) {
                        this.cpage++;
                        this.cisFinished = true;
                        let account = null;
                        if(this.$store.state.ac.account){
                            account = this.$store.state.ac.account
                        }else {
                            account = this.$store.state.company.phone
                        }
                        const _res = await this.$api.get('/car/getCollectCar',{
                            params: {
                                account,
                                page: this.cpage,
                            }
                        })
                        const { success, info, data } = _res.data;
                        this.cisFinished = false;
                        if(!data){
                            this.cisFinished = true;
                        }
                        if(!success) return this.$toast.info(info,1000);
                        this.$refs.scrollView1.finishLoadMore();
                        this.Carlist = this.Carlist.concat(data);
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .main{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .menu{
    height: 80px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .item{
      font-size: 28px;
      color: #999;
      height: 80px;
      line-height: 80px;
      position: relative;
    }
    .item::after{
      content: '';
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background: #fff;
      position: absolute;
      bottom: 2px;
      left: 0;
      transform: scaleX(0);
      transition: 0.5s;
    }
    .item.active{
      color: #FF4C4C;
      font-size: 32px;
      font-weight: bold;
    }
    .item.active::after{
      background: #FF4C4C;
      transform: scaleX(1);
      transition: 0.5s;
    }
  }
  .content{
    height: 0;
    flex-grow: 1;
    padding: 0 32px;

    .lable{
      /*height: 298px;*/
      background: #fff;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      margin-top: 16px;
    }
    .lable:first-child{
      margin-top: 26px;
    }
    .lable:last-child{
      margin-bottom: 60px;
    }
  }
  .top{
    display: flex;
    padding: 20px;
    height: 178px;
    .pic{
      width: 268px;
      height: 178px;
      margin-right: 20px;
      background: #8cc5ff;
    }
    .data{
      width: 0;
      flex-grow: 1;
      height: 100%;
      position: relative;
      .concat{
        display: flex;
        align-items: flex-start;
        font-size: 24px;
        color: #999;
        line-height: 1;
        .phone{
          margin-left: 20px;
        }
      }
      .title{
        font-size: 32px;
        color: #333;
        line-height: 48px;
        margin-top: 10px;
        font-weight: bold;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .mt{
        margin-top: -6px;}
      .trip{
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 24px;
        color: #999999;
        line-height: 1;
      }
    }
  }
  .handle{
    height: 80px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tag{
      flex: 1;
      text-align: center;
      font-size: 28px;
      color: #333;
      line-height: 1;
      a{
        color: #333;
      }
    }
    .tag:first-child{
      border-right: 2px solid #E3E5E5;
    }
  }
</style>
