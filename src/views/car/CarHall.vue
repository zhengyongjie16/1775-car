<template>
    <div class="main">
      <navTag :isShare="false" :title="title1"></navTag>
      <div class="search">
        <div class="input">
          <p> <md-icon name="search"></md-icon>搜索车的品牌型号</p>
          <input type="text" :class="{opacity:facus,show:keyword.length>0}" @focus="facus=true" @blur="facus=false" v-model="keyword">
        </div>
        <div class="btn" @click="getInfosHall">搜索</div>
      </div>
      <div class="menu">
        <div class="item" @click="choSort=!choSort">
          排序 <md-icon name="arrow-down"></md-icon>
        </div>
        <div class="item" @click="showBrandList=true">
          {{brandName?brandName:'品牌'}} <md-icon name="arrow-down"></md-icon>
        </div>
        <div class="layout" :class="{active:choSort}">
          <div class="cho" :class="{active:order==1}" @click="order=1"> 默认排序</div>
          <div class="cho" :class="{active:order==2}" @click="order=2"> 车龄最短</div>
          <div class="cho" :class="{active:order==3}" @click="order=3"> 里程最短</div>
          <div class="cho" :class="{active:order==4}" @click="order=4"> 最新发布</div>
          <div class="up" @click="choSort=false">
            <md-icon name="arrow-up"></md-icon>
          </div>
        </div>
      </div>
      <div class="mask" :class="{show:choSort}" @click="choSort=false"></div>
      <div class="content">
        <md-scroll-view
         :scrolling-y="true"
         :scrolling-x="false"
         @end-reached="moreInfos"
         @refreshing="refresh"
         auto-reflow
         ref="scrollView"
        >
        <div class="lable" v-for="item in list" :key="item.id">
          <div class="top">
            <div class="pic" :style="item.pic?{background:`url(${item.pic.split(',').slice(0,1)})`,
            backgroundSize: `cover`}:{}" @click="showPic(item.pic)"></div>
            <div class="data">
              <div class="concat">
                <div class="name">
                  联系人：{{item.lxName}}
                </div>
                <div class="phone">
                  {{item.lxPhone}}
                </div>
              </div>
              <div class="title" v-if="item.brandName">
                {{item.brandName}}
              </div>
              <div class="trip">
                {{item.year}}年上牌·{{item.mileage}}万公里
              </div>
            </div>
          </div>
          <div class="handle">
            <div class="tag" v-show="item.iscollect==2" @click="celCollect(item.id)">取消收藏</div>
            <div class="tag" v-show="item.iscollect!=2"  @click="collect(item.id,item.type)">收藏</div>
            <div class="tag"><a :href="`tel:${item.lxPhone}`">电话联系</a></div>
          </div>
        </div>
          <md-scroll-view-more
            :is-finished="isFinished"
            slot="more"
          ></md-scroll-view-more>
        </md-scroll-view>
      </div>

      <template>
        <md-image-viewer
          v-model="isViewerShow"
          :list="imgs"
          :has-dots="true"
          :initial-index="viewerIndex">
        </md-image-viewer>
        <md-popup
          v-model="showBrandList"
          position="right"
        >
          <BrandOpt @change="handleBrand"></BrandOpt>
        </md-popup>
      </template>
    </div>
</template>

<script>
    import brandPicker from "../../components/mbrandPicker";
    export default {
        name: "CarHall",
        data(){
            return{
                title1: '收车大厅',
                facus:false,
                keyword:'',
                order:1,
                choSort:false,
                list:[
                    {
                        brand:{
                            brandName:''
                        }
                    }
                ],
                // 图片预览
                isViewerShow:false,
                imgs:[],
                viewerIndex:0,
                showBrandList:false,
                brandName:'',
                brandId:'',
                page:1,
                isFinished:false,
            }
        },
        created() {
            this.getInfosHall()
        },
        components:{
            brandPicker
        },
        watch:{
            order:function () {
                this.getInfosHall()
            },
            newVin(nv) {
                const _res = nv.split(',');
                this.brandFromVin = _res;
            },
        },
        methods:{
            // 获取卖车列表
            async getInfosHall(){
              try{
                this.$toast.loading('1775加载中...')
                let account = null;
                if(this.$store.state.ac.account){
                  account = this.$store.state.ac.account
                }else {
                  account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/getInfosHall', {
                  account: account,
                  page:1,
                  limit:20,
                  order: this.order,
                  keyword: this.keyword,
                  brandId: this.brandId,
                })
                const { success, info, data } = res.data
                if(!success) return this.$toast.info(info,1000);
                this.$toast.hide()
                this.choSort=false;
                for(const item of data){
                  if(!item.iscollect){
                    item.iscollect=1
                  }
                }
                this.list = data;
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }

            },
            // 预览图片
            showPic(pic){
                const imgs = pic.split(',');
                this.imgs = imgs;
                this.isViewerShow=true;
            },
            // 品牌选择
            handleBrand(item) {
                this.showBrandList = false;
                if (item === 1) return this.brandName='';
                if (item == 5) {
                    this.brandId = null;
                } else {
                    this.brandId = item.brandId;
                    this.brandName = item.brandName;
                }
                this.getInfosHall()
            },
            // 下拉刷新
            refresh(){
                this.getInfosHall()
            },
            // 上拉加载
            async moreInfos(){
                if (this.isFinished) {
                    return
                }
                this.page++;
                this.isFinished = true;
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                let res = await this.$api.post('/carSource/getInfosHall', {
                    account: account,
                    page:this.page,
                    limit:20,
                    order: this.order,
                    keyword: this.keyword,
                    brandId: this.brandId,
                });
                const { success, info, data } = res.data
                if(!success) return this.$toast.info(info,1000);
                this.$toast.hide()
                this.choSort=false;
                for(const item of data){
                    if(!item.iscollect){
                        item.iscollect=1
                    }
                }
                this.list = this.list.concat(data);
                this.isFinished = false;
                this.$refs.scrollView.finishLoadMore();
            },
            // 收藏卖车信息
            async collect(id,type) {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/collectInfos', {
                    infosId: id,
                    account: account,
                    type,
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info);
                for ( const item of this.list){
                    if(id==item.id){
                        item.iscollect=2
                    }
                }
                console.log(this.list)
            },
            // 取消收藏
            async celCollect(id) {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/cancelInfos', {
                    id: id,
                    account: account,
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info, 1000);
                for ( const item of this.list){
                    if(id==item.id){
                        item.iscollect=1
                    }
                }
            },
        }
    }
</script>

<style scoped lang="scss">
  .main{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
   .search{
     height: 96px;
     background: #fff;
     display: flex;
     align-items: center;
     justify-content: space-between;
     box-sizing: border-box;
     padding: 0 32px;
     position: relative;
     z-index: 9;
     .input{
       position: relative;
       width: 586px;
       height: 72px;
       background: #f6f6f6;
       border-radius: 36px;
       box-sizing: border-box;
       padding: 0 24px;
       p{
         font-size: 28px;
         color: #999;
         display: flex;
         align-items: center;
         width: 100%;
         height: 72px;
         justify-content: center;
         i{
           font-size: 30px;
           padding: 0;
           background: rgba(0,0,0,0);
           margin-right: 20px;
           height: 100%;
         }
       }
       input{
         width: 100%;
         height: 100%;
         position: absolute;
         left: 0;
         top: 0;
         border-radius: 36px;
         border: none;
         background: #f6f6f6;
         box-sizing: border-box;
         padding: 0 24px;
         text-align: center;
         font-size: 28px;
         color: #666;
         opacity: 0;
         z-index: 10;
       }
       input.opacity,input.show{
         opacity: 1;
       }
     }
     .btn{
       font-size: 32px;
       color: #333;
       font-weight: bold;
     }
   }
   .menu{
     height: 80px;
     display: flex;
     align-items: center;
     justify-content: space-around;
     background: #fff;
     font-size: 28px;
     color: #333;
     position: relative;
     z-index: 9;
     .item{
       display: flex;
       align-items: center;
       justify-content: center;
       flex: 1;

       i{
         font-size: 16px;
         color: #333;
         margin-top: 6px;
         margin-left: 8px;
       }
       .brand{
         border: none;
         .el-button{
           border: none;
         }
       }
     }
     .layout{
       width: 100%;
       height: 0;
       background: #fff;
       position: absolute;
       top: 80px;
       left: 0;
       z-index: 2;
       border-radius: 0 0 16px 16px;
       box-sizing: border-box;
       padding-left: 32px;
       transition: 0.3s;
       overflow: hidden;
       .cho{
         height: 100px;
         box-sizing: border-box;
         border-bottom: 1px solid rgba(0,0,0,0.1);
         display: flex;
         align-items: center;
         font-size: 28px;
         color: #333;
       }
       .cho.active{
         color: #FF4C4C;
       }
       .up{
         display: flex;
         align-items: center;
         justify-content: center;
         padding-top: 38px;
         i{
           font-size: 28px;
           color: #e5e5e5;
         }

       }
     }
     .layout.active{
       height: 476px;
       transition: 0.3s;
     }
   }
   .mask{
     position: fixed;
     width: 100%;
     height: 100%;
     z-index: 2;
     top: 0;
     left: 0;
     background: rgba(0,0,0,0.4);
     opacity: 0;
     transition: 0.3s;
     display: none;
   }
   .mask.show{
     opacity: 1;
     transition: 0.3s;
     display: block;
   }
  .content{
    height: 0;
    flex-grow: 1;
    padding: 0 32px;
    .lable{
      height: 298px;
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
