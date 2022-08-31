<template>
  <div class="main">
    <div class="search">
      <div class="input">
        <p v-show="searchTxt.length<1">
          <md-icon
            name="search"
            size="lg"
          ></md-icon>
          搜索你想要的车
        </p>
        <input :class="{op:searchTxt.length>0}" type="text" v-model="searchTxt">
      </div>
      <p @click="doSearch">搜索</p>
    </div>
    <div class="screen">
      <div class="item" :class="{active:type==1}" @click="type==1?type=9:type=1">
        排序
        <md-icon
          name="arrow-down"
          size="lg"
          class="down"
        ></md-icon>
        <md-icon
          name="arrow-up"
          size="lg"
          class="up"
        ></md-icon>
      </div>
      <div class="item" @click="showBrandList=true">
        {{brandName?brandName:'品牌'}}
        <md-icon
          name="arrow-down"
          size="lg"
          class="down"
        ></md-icon>
        <md-icon
          name="arrow-up"
          size="lg"
          class="up"
        ></md-icon>
      </div>
      <div class="item" :class="{active:type==2}" @click="type==2?type=0:type=2">
        价格
        <md-icon
          name="arrow-down"
          size="lg"
          class="down"
        ></md-icon>
        <md-icon
          name="arrow-up"
          size="lg"
          class="up"
        ></md-icon>
      </div>
      <div class="item" :class="{active:type==3}" @click="type==3?type=0:type=3">
        筛选
        <md-icon
          name="arrow-down"
          size="lg"
          class="down"
        ></md-icon>
        <md-icon
          name="arrow-up"
          size="lg"
          class="up"
        ></md-icon>
      </div>

      <!--      下拉层-->

      <div class="layout"  :style="{height:countHeight}">



        <!-- 价格 -->
        <div class="choContent"  >
          <md-scroll-view
            :auto-reflow="true"
            :scrolling-x="false"
            :scrolling-y="true"
            ref="scrollView"
          >

            <div class="choMain" :class="{active: type ==2 }">

              <div class="name">自定义价格</div>
              <div class="custom">
                <div class="item">
                  <input placeholder="1" type="number" v-model="nowOption.onlinePriceMin">万
                </div>
                <i></i>
                <div class="item">
                  <input placeholder="1" type="number" v-model="nowOption.onlinePriceMax">万
                </div>
                <div class="btn" @click="doOk">确定</div>
              </div>
              <div class="cholist">
                <!-- 已选状态添加selected类 -->
                <div class="choItem" :class="priceSelected==0?'selected':''" @click="priceSelected=0">价格最高</div>
                <div class="choItem" :class="priceSelected==1?'selected':''" @click="priceSelected=1">价格最低</div>
                <div class="choItem" :class="priceSelected==2?'selected':''" @click="priceSelected=2">不限</div>
                <div class="choItem" :class="priceSelected==3?'selected':''" @click="priceSelected=3">3万以下</div>
                <div class="choItem" :class="priceSelected==4?'selected':''" @click="priceSelected=4">3万-5万</div>
                <div class="choItem" :class="priceSelected==5?'selected':''" @click="priceSelected=5">5-10万</div>
                <div class="choItem" :class="priceSelected==6?'selected':''" @click="priceSelected=6">10-15万</div>
                <div class="choItem" :class="priceSelected==7?'selected':''" @click="priceSelected=7">15-20万</div>
                <div class="choItem" :class="priceSelected==8?'selected':''" @click="priceSelected=8">20-25万</div>
                <div class="choItem" :class="priceSelected==9?'selected':''" @click="priceSelected=9">25万以上</div>
              </div>

            </div>
            <div class="choMain" :class="{active: type ==1 }">

              <div class="cholist" ref="orderPrice">
                <!-- 已选状态添加selected类 -->
                <div class="choItem" :class="[order===0?'selected':'']"  @click="order=0">默认排序</div>
                <div class="choItem" :class="[order===1?'selected':'']"  @click="order=1">价格最高</div>
                <div class="choItem" :class="[order===2?'selected':'']"  @click="order=2">价格最低</div>
                <div class="choItem" :class="[order===3?'selected':'']"  @click="order=3">最新发布</div>
                <div class="choItem" :class="[order===4?'selected':'']"  @click="order=4">最短里程</div>
                <div class="choItem" :class="[order===5?'selected':'']"  @click="order=5">车龄最短</div>
              </div>

            </div>
            <div class="choMain" :class="{active: type ==3 }">
              <div class="option">
                <div class="name m40">车型</div>
                <div class="choOption sb">
                  <!--  已选添加choTag类  -->
                  <md-check-box class="tag"  name="" v-model="nowOption.typeStr" label="不限" />
                  <md-check-box class="tag" v-for="item in typeOption" :key="item.label"  :name="item.label" v-model="nowOption.typeStr" :label="item.label" />

                </div>
                <div class="name m60">变速箱</div>
                <div class="choOption">
                  <!--  已选添加choTag类  -->
                  <md-check-box class="tag" style="margin-right:20px" name="" v-model="nowOption.bxc" label="不限" />
                  <md-check-box class="tag" style="margin-right:20px" name="自动" v-model="nowOption.bxc" label="自动" />
                  <md-check-box class="tag" name="手动" v-model="nowOption.bxc" label="手动" />
                </div>
                <div class="name m60">车龄要求 <span>(单位:年)</span></div>
                <div class="optionInput">
                  <input type="number" placeholder="最小车龄" v-model.number="sYear">
                  <i></i>
                  <input type="number" placeholder="最大车龄" v-model.number="eYear">
                </div>
                <div class="name m60">公里数 <span>(单位:万公里)</span></div>
                <div class="optionInput">
                  <input type="number" placeholder="最小公里数" v-model.number="nowOption.mileageMin">
                  <i></i>
                  <input type="number" placeholder="最大公里数" v-model.number="nowOption.mileageMax">
                </div>
                <div class="name m60">排放标准</div>
                <div class="choOption sb">
                  <!--  已选添加choTag类  -->
                  <!--                <div class="tag choTag" style="margin-right:20px">国四</div>-->
                  <!--                <div class="tag">国五</div>-->

                  <md-check-box class="tag"  name="" v-model="nowOption.paifang" label="不限" />
                  <md-check-box class="tag"  name="国三" v-model="nowOption.paifang" label="国三" />
                  <md-check-box class="tag"  name="国四" v-model="nowOption.paifang" label="国四" />
                  <md-check-box class="tag" name="国五" v-model="nowOption.paifang" label="国五" />
                </div>
                <div class="name m60">选择颜色 （{{nowOption.color}}）</div>
                <div class="choOption colorOpt sb" >
                  <!--  已选添加choTag类  -->
                  <md-check-box class="tag"  v-model="nowOption.color"
                                :label="item.label"
                                v-for="item in colorOpt"
                                :key="item.name"
                                :name="item.label"
                                :class="item.name"
                  >
                  </md-check-box>
                </div>

              </div>

            </div>

          </md-scroll-view>
          <div class="optionBtn" v-show="type ==3">
            <div class="reset" @click="reset">重置选项</div>
            <div class="form" @click="doOk">确定选项</div>
          </div>
        </div>
        <!--  排序  -->

        <!--  筛选  -->

      </div>
    </div>
    <div class="content">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
        :scrolling-y="true"
        ref="scrollView4"
        @refreshing="$_onRefresh"
        @end-reached="loadMore"
        :immediate-check-end-reaching="true"
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
        <div class="tags">
          <md-tag size="small" shape="circle" type="ghost"
                  v-for="(item,name) in nowOption"
                  :key="name"
                  v-show="item!=='不限'&&item&&name!=='brandId'"
          >
            <template v-if="name=='order'">
              <span v-if="order==1">价格最高</span>
              <span v-if="order==2">价格最低</span>
              <span v-if="order==3">最新发布</span>
              <span v-if="order==4">最短里程</span>
              <span v-if="order==5">车龄最短</span>
            </template>
            <template v-else-if="name=='onlinePriceMax'">
              <span>{{item}}万以下</span>
            </template>
            <template v-else-if="name=='onlinePriceMin'">
              <span>{{item}}万以上</span>
            </template>
            <template v-else> {{item}} </template>
          </md-tag>
        </div>
        <!--车辆列表-->
        <vsCard class="carItem"  v-for="(car,index) in carList" :key="`${car.id}_${index}`" :carData="car"></vsCard>
        <!--加载更多-->
        <md-scroll-view-more
          slot="more"
          :is-finished="isEnd"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>
    <div class="mask" v-show="type>0" @click="type=0"></div>
    <!--    品牌选择-->
    <md-popup
      v-model="showBrandList"
      position="right"
    >
      <BrandOpt @change="handleBrand"></BrandOpt>
    </md-popup>

  </div>
</template>

<script>

    export default {
        name: "trade/List",
        data() {
            return {
                qwe: 1,
                searchTxt: '',
                brandName:'',
                choPrice:false,
                choSort:false,
                choOption:false,
                type:0,
                priceSelected:2,
                colorOpt:[
                    {label:'不限',name:''},
                    {label:'黑色',name:'black'},
                    {label:'白色',name:'white'},
                    {label:'银灰色',name:'grey'},
                    {label:'红色',name:'red'},
                    {label:'深灰色',name:'dgrey'},
                    {label:'香槟色',name:'beige'},
                    {label:'蓝色',name:'blue'},
                    {label:'黄色',name:'yellow'},
                    {label:'棕色',name:'brown'},
                    {label:'绿色',name:'green'},
                    {label:'橙色',name:'orange'},
                    {label:'紫色',name:'violet'},
                    {label:'其他色',name:'other'},
                ],
                typeOption:[
                    {label:'SUV'},
                    {label:'两厢'},
                    {label:'三厢'},
                    {label:'单厢'},
                    {label:'皮卡'},
                    {label:'跑车'},
                    {label:'掀背车'},
                ],
                nowOption:{
                    color:'不限',
                    paifang:'',
                    bxc:'',
                    typeStr:'',
                    mileageMin:'',
                    mileageMax:'',
                    carAgeStart:'',
                    carAgeEnd:'',
                    order:null,
                    brandId:null,
                    onlinePriceMax:'',
                    onlinePriceMin:''
                },
                sYear:'',
                eYear:'',
                order:0, // 0 默认  1 价格高到低  2 价格低到高  3 发布时间倒叙 4 里程顺序  5 上牌时间倒叙
                page:1, // 页码
                carList:[],
                limit:20,
                isRefreshing:false,
                isEnd: false, // 下载加载是否到了最后一页
                showBrandList:false,
            }
        },
        computed:{
            countHeight(){
                if(this.type==1) return  this.$refs.orderPrice.clientHeight+'px';
                if(this.type==2) return  '80vh';
                if(this.type==3) return '80vh'
                return  0
            }
        },
        watch:{
            'nowOption.order':function (nv) {
                console.log(nv)
            },
            'nowOption.mileageMin':function(nv){
                if(  this.nowOption.mileageMax  && this.nowOption.mileageMin > this.nowOption.mileageMax){
                    this.nowOption.mileageMin = this.nowOption.mileageMax
                    this.$toast.info('最大里程不能小于最小里程')
                }
            },
            'nowOption.mileageMax':function(nv){

                if(  this.nowOption.mileageMax  && this.nowOption.mileageMin > this.nowOption.mileageMax){
                    this.nowOption.mileageMin = this.nowOption.mileageMax
                    this.$toast.info('最大里程不能小于最小里程')
                }
            },
            type(nv,ov){
                this.$nextTick(()=>{
                    this.$refs.scrollView.reflowScroller()
                })
            },
            sYear(nv){
                if(nv<0) return  this.sYear = '';
                if(  this.eYear  && this.sYear > this.eYear){
                    this.sYear = this.eYear
                    this.$toast.info('最大车龄不能小于最小车龄')
                }
                const year =  new Date().getFullYear()
                this.nowOption.carAgeEnd = year - nv
            },
            eYear(nv){
                if(nv<0) return  this.eYear = 1;
                if(  this.eYear  && this.sYear > this.eYear){
                    this.sYear = this.eYear
                    this.$toast.info('最大车龄不能小于最小车龄')
                }
                const year = new Date().getFullYear()
                this.nowOption.carAgeStart = year - nv
            },
            order(nv){
                if(nv==0) this.nowOption.order = null;
                if(nv==1) this.nowOption.order = JSON.stringify(['onlinePrice','DESC']);
                if(nv==2) this.nowOption.order = JSON.stringify(['onlinePrice','ASC']);
                if(nv==3) this.nowOption.order = JSON.stringify(['updateTime','DESC']);
                if(nv==4) this.nowOption.order = JSON.stringify(['mileage','ASC']);
                if(nv==5) this.nowOption.order = JSON.stringify(['brandDate','DESC']);
                this.doOk()
            },
            priceSelected(nv){
                console.log('价格选项有变动',nv)
                if(nv==0) this.order = 1;
                if(nv==1) this.order = 2;
                if(nv==2){
                    this.nowOption.onlinePriceMax = '';
                    this.nowOption.onlinePriceMin = '';
                    this.order= 0;
                }
                if(nv==3){
                    this.nowOption.onlinePriceMax = 3
                    this.nowOption.onlinePriceMin = 0
                }
                if(nv==4) {this.nowOption.onlinePriceMax = 5;this.nowOption.onlinePriceMin = 3}
                if(nv==5) {this.nowOption.onlinePriceMax = 10;this.nowOption.onlinePriceMin = 5}
                if(nv==6) {this.nowOption.onlinePriceMax = 15;this.nowOption.onlinePriceMin = 10}
                if(nv==7) {this.nowOption.onlinePriceMax = 20;this.nowOption.onlinePriceMin = 15}
                if(nv==8) {this.nowOption.onlinePriceMax = 25;this.nowOption.onlinePriceMin = 20}
                if(nv==9) {this.nowOption.onlinePriceMax = '';this.nowOption.onlinePriceMin = 25}
                this.doOk()

                /*
                *    <div class="choItem" :class="priceSelected==0?'selected':''" @click="priceSelected=0">价格最高</div>
                      <div class="choItem" :class="priceSelected==1?'selected':''" @click="priceSelected=1">价格最低</div>
                      <div class="choItem" :class="priceSelected==2?'selected':''" @click="priceSelected=2">不限</div>
                      <div class="choItem" :class="priceSelected==3?'selected':''" @click="priceSelected=3">3万以下</div>
                      <div class="choItem" :class="priceSelected==4?'selected':''" @click="priceSelected=4">3万-5万</div>
                      <div class="choItem" :class="priceSelected==5?'selected':''" @click="priceSelected=5">5-10万</div>
                      <div class="choItem" :class="priceSelected==6?'selected':''" @click="priceSelected=6">10-15万</div>
                      <div class="choItem" :class="priceSelected==7?'selected':''" @click="priceSelected=7">15-20万</div>
                      <div class="choItem" :class="priceSelected==8?'selected':''" @click="priceSelected=8">20-25万</div>
                      <div class="choItem" :class="priceSelected==9?'selected':''" @click="priceSelected=9">25万以上</div>
                * */
            }
        },
        created(){
            //  this.getList()
            this.init();
        },
        methods:{
            pickerColor(item){
                this.nowOption.color = item.label
            },
            doSearch(){
                this.page =1;
                this.carList = [];
                this.getList()
            },
            doOk(){ //确认
                this.page =1;
                this.carList = [];
                this.type = 0;
                this.getList()
            },
            reset(){ // 重设表单
                this.nowOption = {
                    color:'不限',
                    paifang:'',
                    bxc:'',
                    typeStr:'',
                    mileageMin:'',
                    mileageMax:'',
                    order:null,
                    onlinePriceMax: '',
                    onlinePriceMin: ''
                }
                this.sYear  = '';
                this.eYear = '';
                this.order = 0
                this.doOk()
            },
            async getList(){
                let postData = {
                    limit:20,
                    page:this.page,
                    title:this.searchTxt,
                    companyId:this.$store.state.company.id,
                    ...this.nowOption,
                }



                let res = await this.$api.post('/vc/getCarList',postData);
                const { success,data } = res.data;
                if(success){
                    if(this.page==1){
                        this.carList = data.list; //保证下拉刷新的时候页面重置
                        this.$refs.scrollView4.scrollTo(0,0,true);
                    }
                    data.list.map( r=>{
                        // 有重复的就不再加载
                        if(this.carList.findIndex(item=> item.id===r.id) === -1) this.carList.push(r)
                    })
                    this.page++
                }

            },
            async loadMore(){ //处理加载更多
                if(this.isEnd) return  this.$toast.info('暂时没有更多的加载了哦！')
                await this.getList();
                this.$nextTick(() => {
                    this.$refs.scrollView4.reflowScroller();
                    this.$refs.scrollView4.finishLoadMore();
                });

            },
            async $_onRefresh(){  //处理下拉刷新
                if(this.isRefreshing) return  this.$toast.info('1775正在努力的加载')

                this.page = 1;
                this.isRefreshing = true;//标记正在刷新中 避免重复进行
                await this.getList();
                this.$refs.scrollView4.finishRefresh()
                this.isRefreshing = false; //移除标记

            },
            handleBrand(item){

                this.showBrandList = false;
                if(item===1) return false
                if(item ==5){
                    this.nowOption.brandId = null
                }else{
                    this.nowOption.brandId = item.brandId
                    this.brandName = item.brandName
                }
                this.page = 1
                this.getList()
            },
            init(){
                console.log('列表页初始化')
                const { title , typeStr, onlinePriceMin,onlinePriceMax,brandId} = this.$route.query;
                this.page = 1;
                this.nowOption = {
                    color:'不限',
                    paifang:'',
                    bxc:'',
                    typeStr:'',
                    mileageMin:'',
                    mileageMax:'',
                    carAgeStart:'',
                    carAgeEnd:'',
                    order:null,
                    brandId:null,
                    onlinePriceMax:'',
                    onlinePriceMin:''
                }
                this.sYear  = '';
                this.eYear = '';
                this.order = 0
                if(title) this.searchTxt = title;
                if(typeStr)  this.nowOption.typeStr = typeStr;
                if(onlinePriceMin)  this.nowOption.onlinePriceMin =onlinePriceMin;
                if(onlinePriceMax)  this.nowOption.onlinePriceMax = onlinePriceMax;
                if(brandId)  this.nowOption.brandId = brandId;
                this.doOk()
            }
        },
        mounted(){
            this.qwe=1
        },
        deactivated() {
            const st = this.$refs.scrollView4.getOffsets();
            sessionStorage.setItem('scrollTop', st.top);
        },
        activated() {
            console.log(1);
            const st = sessionStorage.getItem('scrollTop');
            const from = window.sessionStorage.getItem('from');
            if(from === 'home') this.init()
            if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView4.scrollTo(0, parseFloat(st)), 100);
            this.qwe=1

        },
        beforeRouteEnter(to, from, next){
            window.sessionStorage.setItem('from',from.name)
            next()
        },

    }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
  }

  .search {
    box-sizing: border-box;
    padding: 12px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 99;
    background: #fff;
    .input {
      width: 0;
      flex-grow: 1;
      height: 72px;
      position: relative;
      overflow: hidden;
      border-radius: 36px;
      background: rgba(238, 238, 238, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 28px;

        i {
          padding: 0;
          margin-right: 22px;
          font-size: 30px;
        }
      }

      input {
        position: absolute;
        box-sizing: border-box;
        padding: 0 32px;
        background: none;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 28px;
        color: #333;
        top: 0;
        left: 0;
        opacity: 0;
        text-align: center;
      }

      input.op {
        opacity: 1;
      }
    }

    p {
      margin-left: 32px;
      font-size: 32px;
      color: #333;
    }
  }

  .screen {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 99;
    background: #fff;
    .layout{
      width: 100%;
      position: absolute;
      top:80px;
      left:0;
      border: 1px solid rgba(0,0,0,.2);
      background: #fff;
      transition:all 150ms
    }

    .item {
      width: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      color: #333;
      font-size: 28px;
      i {
        font-size: 20px;
        margin-left: 8px;
        color: #999;
      }
      i.down{
        display: block;
      }
      i.up{
        display: none;
      }
    }
    .active{
      color: #FF3434;
      i.down{
        display: none;
      }
      i.up{
        display: block;
        color: #FF3434;
      }
    }
  }

  .content {
    height: 0;
    flex-grow: 1;
  }


  .carItem {
    width: 100% !important;
    height: auto !important;
    padding: 40px 24px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0;
  }

  .carItem:last-child {
    border-bottom: none;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background: rgba(0,0,0,0.3);
  }

  .choContent{
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    .choMain.active{
      height:auto;
    }
    .choMain{
      height:0;
      overflow: hidden;
      position: relative;
      z-index: 10;
      .name{
        line-height: 1;
        font-size: 28px;
        color: #333;
        padding: 40px 32px;
        background: #fff;
      }
      .custom{
        background: #fff;
        padding: 0 32px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        .item{
          display: flex;
          align-items: center;
          width: 192px;
          height: 56px;
          padding: 0 30px;
          border-radius: 36px;
          background: rgba(238,238,238,0.6);
          font-size: 28px;
          color: #999;
          input{
            color: #333;
            text-align: center;
            border: none;
            width: 0;
            flex-grow: 1;
            margin-right: 10px;
            background: none;
          }

        }
        i{
          display: block;
          width: 32px;
          height: 2px;
          background: rgba(0,0,0,0.1);
          margin: 0 34px;
        }
        .btn{
          margin-left: 84px;
          width: 116px;
          height: 56px;
          line-height: 56px;
          text-align: center;
          background: #FF3434;
          border-radius: 8px;
          color: #fff;
          font-size: 28px;
        }
      }
      .cholist{
        background: #fff;

      }
      .choItem{
        width: 718px;
        margin: 0 auto;
        height: 100px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        line-height: 100px;
        font-size: 28px;
        color: #333;
      }
      .selected{
        color:#FF3434 ;
      }
      .choItem:last-child{
        border-bottom: none;
      }
    }
    .option{
      background: #fff;
      .name{
        padding: 0 32px;
        font-size: 32px;
        color: #333;
        line-height: 1;
        span{
          color: #999;
        }
      }
      .choOption{
        padding: 0 32px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;

        .tag{
          width: 160px;
          height: 60px;
          border: 1px solid #999;
          box-sizing: border-box;
          font-size: 28px;
          color: #999;
          margin-bottom: 16px;
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .black{
          color: #fff;
          background: #000;
        }
        .grey{
          color: #fff;
          background: #C1C2C4;
        }
        .red{
          color: #fff;
          background: #C70C01;
        }
        .dgrey{
          color: #fff;
          background: #585858;
        }
        .beige{
          color: #fff;
          background: #CD8034;
        }
        .blue{
          color: #fff;
          background: #024D98;
        }
        .yellow{
          color: #fff;
          background: #EBE41B;
        }
        .brown{
          color: #fff;
          background: #48280B;
        }
        .green{
          color: #fff;
          background: #009947;
        }
        .orange{
          color: #fff;
          background: #E94034;
        }
        .violet{
          color: #fff;
          background: #4F314F;
        }
        .choTag{
          border-color: #FF3434;
          color: #FF3434;
        }
        .is-checked{
          border-color: #FF3434;
          color: #FF3434;
        }
        .choTag::after{
          content: '';
          width: 0;
          height: 0;
          border-width: 0 vw(28) vw(28) 0;
          border-style: solid;
          border-color: transparent #FF3434;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .optionInput{
        padding: 0 32px;
        margin-top: 40px;
        display: flex;
        align-items: center;
        input{
          width: 192px;
          height: 56px;
          border: none;
          background: #eee;
          color: #333;
          text-align: center;
          line-height: 56px;
          border-radius: 36px;
          padding: 0 32px;
        }
        input::placeholder{
          color: #999;
        }
        i{
          display: block;
          width: 32px;
          height: 2px;
          margin: 0 34px;
          background: rgba(0,0,0,0.1);
        }
      }
      .m40{
        padding-top: 40px;
      }
      .m60{
        margin-top: 60px ;
      }
    }
    .optionBtn{
      display: flex;
      align-items: center;
      margin-top: 20px;
      justify-content: space-between;
      padding: 0 32px 20px;
      .reset{
        width: 336px;
        height: 88px;
        border-radius: 16px;
        text-align: center;
        line-height: 88px;
        border: 1px solid #FF3434;
        color: #FF3434;
        font-size: 32px;
      }
      .form{
        background: #FF3434;
        color: #fff;
        width: 336px;
        height: 88px;
        border-radius: 16px;
        font-size: 32px;
        text-align: center;
        line-height: 88px;
      }
    }
  }
  .sr{

  }
  .sb{
    justify-content: space-between;
  }
  .tags{
    padding:20px;
    &>div{
      margin-right: 10px;
    }
  }


</style>
