<template>
  <div class="main">
    <navTag :isShare="false" title="我的车库"></navTag>
    <div class="search">
      <div class="opt" @click="showState=!showState">
        {{st}}
        <div class="more" v-show="showState">
           <ul>
             <li @click.stop="changeState('上架')">上架</li>
             <li @click.stop="changeState('下架')">下架</li>
             <li @click.stop="changeState('在库')">在库</li>
             <li @click.stop="changeState('预定')">预定</li>
             <li @click.stop="changeState('出售')">出售</li>
           </ul>
        </div>
      </div>
      <div class="input">
        <p v-show="!facus">
          <md-icon
            name="search"
            size="lg"
          ></md-icon>
          搜索你想要的车
        </p>
        <input :class="{op:facus}" @focus="facus=true" @blur="facus=false" type="text" v-model="searchTxt">
      </div>
      <p @click="doSearch">搜索</p>
    </div>
    <div class="screen">
      <div class="item" :class="{active:type==1}" @click="type==1?type=0:type=1">
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
        :immediate-check-end-reaching="false"
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
             <md-icon name="wrong" @click="closeTag(name)"></md-icon>
          </md-tag>
        </div>
        <ckCard class="carItem"  v-for="(car,index) in carList" :key="`${car.id}_${index}`"
                @forsafle="handSale"
                :carData="car"
                @change="handleChange"
                @doShare="handleShare"
        ></ckCard>
        <!--加载更多-->
        <md-scroll-view-more
          slot="more"
          :is-finished="isEnd"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>
    <tab></tab>
    <div class="mask" v-show="type>0" @click="type=0"></div>
    <!--    品牌选择-->
    <md-popup
      v-model="showBrandList"
      position="right"
    >
      <BrandOpt @change="handleBrand"></BrandOpt>
    </md-popup>
    <md-popup
      v-model="showSell"
      position="center"
    >
      <div class="InCarSell">
        <div class="InCarSellbox">
          <div class="onCarboxTop">
            车源出售
          </div>
          <div class="onCarData">
            <div class="onCarDataTu">
              <img :src="nowCarInfo.cover|mobilePic" alt="">
            </div>
            <h3>{{nowCarInfo.title}}</h3>
            <p>上牌时间:{{ new Date(nowCarInfo.brandDate)|moment('YYYY-MM-DD')}}</p>
            <p>车辆Vin码:{{nowCarInfo.vin}}</p>
          </div>
          <div class="InCarSellLi">

            <md-field>
              <md-input-item
                ref="input0"
                title="成交价格"
                is-amount
                v-model="saleInfo.dealPrice"
              >
                <span slot="right">万</span>
              </md-input-item>
              <md-input-item
                ref="input1"
                title="客户姓名"
                v-model="saleInfo.lxName"
              ></md-input-item>
              <md-input-item
                ref="input1"
                title="手机号"
                type="phone"
                v-model="saleInfo.lxPhone"
              ></md-input-item>
            </md-field>

          </div>
          <div class="StateBtn">
            <md-button type="default" size="small" inline style="margin-right: 20px;" @click="showSell=false">取消</md-button>
            <md-button type="primary" size="small" inline @click="saleThisCar(nowCarInfo.id,nowCarInfo.brand.pid,nowCarInfo.company.id)">确定</md-button>
          </div>
        </div>
      </div>
    </md-popup>
    <md-popup
      v-model="showWenAn"
      :hasMask="true"
      position="bottom"
    >
      <div class="waBox">
        <div class="t">分享文案</div>
        <div class="b">
          <md-tabs @change="handleTabChange">
            <md-tab-pane  name="p1" label="标准">
              <textarea v-model="standarText"></textarea>
            </md-tab-pane>
            <md-tab-pane  name="p2" label="车辆描述">
              <textarea v-model="carDesc"> </textarea>
            </md-tab-pane>
            <!--            <md-tab-pane  name="p3" label="车主说">-->
            <!--              <textarea v-model="carTell"></textarea>-->
            <!--            </md-tab-pane>-->
            <md-tab-pane  name="p4" label="自定义">
              <textarea v-model="newWn"></textarea>
            </md-tab-pane>
          </md-tabs>
        </div>
        <div class="btns">
          <div>不复制</div>
          <div @click="doCopy">复制</div>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
   import tab from '../component/tab'
   import { ActionSheet } from 'mand-mobile'
    export default {
        name: "ShareCars",
        data() {
            return {
                showState:false,
                st:'上架',
                showSell: false,
                qwe: 1,
                facus:false,
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
                nowCarInfo:{},
                saleInfo:{},
                attachments:[],
                checkIds:[],
                showWenAn:false,
                standarText:'',
                carDesc:'',
                carTell:'',
                newWn:'',
                wenan:'',
                carData:{},
                onlineState:1,
                stockState:'',
                scrollTop:3745
            }
        },
        components:{
            tab
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
            },
            page:value=>{
                console.log('this page is', value)
            }
        },
        created(){
            this.init();
        },
        methods: {
            closeTag(name){
                if(name === 'color') return this.nowOption.color ='不限';
                if(name === 'order') return this.nowOption.order = null;
                if(name === 'brandId') return this.nowOption.brandId = null;
                this.nowOption[name] ='';
                this.doOk();
            },
            shareIt(item) {
               // this.nowCar = this.carData;
                ActionSheet.create({
                    value: true,
                    options: [
                        {
                            label: '分享到朋友圈',
                            value: 0,
                        },
                        {
                            label: '分享给微信好友',
                            value: 1,
                        },
                        {
                            label: '复制链接',
                            value: 2,
                        },
                    ],
                    cancelText: '取消',
                    onSelected: this.$_selected2,
                });
            },
            $_selected2(se) {
                const item = this.carData;
                const _isAc = window.localStorage.getItem('isAc');
                const _url = _isAc == '0' ? `http://m.1775.top/#/content?id=${item.id}` : `http://m.1775.top/#/content?id=${item.id}&phone=${this.$store.state.ac.account}&lxname=${this.$store.state.ac.lxName}`;
                const contactInfo = _isAc =='0'? this.$store.state.company.lxPhone + ` ${this.$store.state.company.lxName}`: this.$store.state.ac.account + ` ${this.$store.state.ac.lxName}`

                if (se.value == 0) {
                    Wechat.share({
                        message: {
                            title: `${item.title}`,
                            description: contactInfo,
                            thumb: this.mobilePic(item.cover),
                            mediaTagName: 'TEST-TAG-001',
                            messageExt: '这是第三方带的测试字段',
                            messageAction: '<action>dotalist</action>',
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: _url,
                            },
                        },
                        scene: Wechat.Scene.TIMELINE, // share to Timeline
                    }, () => {
                        this.$toast.success('分享成功');
                    }, (reason) => {
                        //   alert(`Failed: ${reason}`);
                        this.$toast.failed(reason);
                    });
                }
                if (se.value == 1) {
                    Wechat.share({
                        message: {
                            title: `${item.title}`,
                            description: contactInfo,
                            thumb: this.mobilePic(item.cover),
                            mediaTagName: 'TEST-TAG-001',
                            messageExt: '这是第三方带的测试字段',
                            messageAction: '<action>dotalist</action>',
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: _url,
                            },
                        },
                        scene: Wechat.Scene.SESSION, // share to Timeline
                    }, () => {
                        this.$toast.success('分享成功');
                    }, (reason) => {
                        //   alert(`Failed: ${reason}`);
                        this.$toast.failed(reason);
                    });
                }
                if (se.value == 2) {
                    const txt = this.standarText;
                    this.$copyText(txt).then((e) => {
                        this.$toast.succeed('复制成功');
                    }, (e) => {

                    });
                }
            },
            handSale(data) {
                this.nowCarInfo = data
                this.showSell = true
            },
            pickerColor(item) {
                this.nowOption.color = item.label
            },
            doSearch() {
                this.page = 1;
                this.carList = [];
                this.getList()
            },
            doOk() { //确认
                this.page = 1;
                this.carList = [];
                this.type = 0;
                this.getList()
            },
            reset() { // 重设表单
                this.nowOption = {
                    color: '不限',
                    paifang: '',
                    bxc: '',
                    typeStr: '',
                    mileageMin: '',
                    mileageMax: '',
                    order: null,
                    onlinePriceMax: '',
                    onlinePriceMin: ''
                }
                this.sYear = '';
                this.eYear = '';
                this.stockState = '',
                this.order = 0
                this.doOk()
            },
            async getList() {
                let postData = {
                    limit: 20,
                    page: this.page,
                    title: this.searchTxt,
                    companyId: this.$store.state.company.id,
                    onlineState: this.onlineState,
                    stockState: this.stockState,
                    ...this.nowOption,
                }
                // this.$toast.loading('1775正在加载中...')
                let res = await this.$api.post('/vc/getCarList', postData);
                const {success, data} = res.data;
                this.$toast.hide()
                if (success) {
                    if (this.page == 1) {
                        this.carList = data.list; //保证下拉刷新的时候页面重置
                        this.$refs.scrollView4.scrollTo(0, 0, true);
                    }
                    data.list.map(r => {
                        // 有重复的就不再加载
                        if (this.carList.findIndex(item => item.id === r.id) === -1) this.carList.push(r)
                    })
                    if(data.list&&data.list.length>0){
                      this.page++
                    } else{
                      // this.isEnd = true;
                      // this.$toast.info('暂时没有更多的车辆了哦')
                    }


                }

            },
            async loadMore() { //处理加载更多
                if (this.isEnd) return this.$toast.info('暂时没有更多的加载了哦！')
                await this.getList();
                this.$nextTick(() => {
                    this.$refs.scrollView4.reflowScroller();
                    this.$refs.scrollView4.finishLoadMore();
                });

            },
            async $_onRefresh() {  //处理下拉刷新
                if (this.isRefreshing) return this.$toast.info('1775正在努力的加载')

                this.page = 1;
                this.isRefreshing = true;//标记正在刷新中 避免重复进行
                await this.getList();
                this.$refs.scrollView4.finishRefresh()
                this.isRefreshing = false; //移除标记

            },
            handleBrand(item) {

                this.showBrandList = false;
                if (item === 1) return false
                if (item == 5) {
                    this.nowOption.brandId = null
                } else {
                    this.nowOption.brandId = item.brandId
                    this.brandName = item.brandName
                }
                this.page = 1
                this.getList()
            },
            init() {
                console.log('列表页初始化')
                const {title, typeStr, onlinePriceMin, onlinePriceMax, brandId} = this.$route.query;
                this.page = 1;
                this.nowOption = {
                    color: '不限',
                    paifang: '',
                    bxc: '',
                    typeStr: '',
                    mileageMin: '',
                    mileageMax: '',
                    carAgeStart: '',
                    carAgeEnd: '',
                    order: null,
                    brandId: null,
                    onlinePriceMax: '',
                    onlinePriceMin: '',
                }
                this.sYear = '';
                stockState: '',
                this.eYear = '';
                this.order = 0
                if (title) this.searchTxt = title;
                if (typeStr) this.nowOption.typeStr = typeStr;
                if (onlinePriceMin) this.nowOption.onlinePriceMin = onlinePriceMin;
                if (onlinePriceMax) this.nowOption.onlinePriceMax = onlinePriceMax;
                if (brandId) this.nowOption.brandId = brandId;
                this.doOk()
            },
            handleChange(r) {
                console.log('it happend', r)
                this.carList = []
                this.init()
            },
            doShare() {
                this.$toast.info('分享')
            },
            addToCheck(id) {
                if (!this.checkIds.includes(id)) return this.checkIds.push(id);
                this.checkIds = this.checkIds.filter(r => r != id);
            },
            async getCarInfo(){
              try{
                this.$toast.loading('分享信息加载中');
                const res = await  this.$api.get('/getVehicleInfoApp',{params:{ id: this.carData.id }});
                const { success, data } = res.data;
                this.$toast.hide();
                if (success) {
                  this.carData = data;
                  const _isAc = window.localStorage.getItem('isAc');
                  const _url = _isAc == '0'  ? `http://m.1775.top/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.account}`;

                  const contactInfo = _isAc =='0'? this.$store.state.company.lxPhone + ` ${this.$store.state.company.lxName}`: this.$store.state.ac.account + ` ${this.$store.state.ac.lxName}`
                  this.standarText = `【车辆信息】 ${this.carData.title}\n`+
                    `【上牌时间】 ${new Date(this.carData.brandDate).getFullYear()}年\n`+
                    `【行驶里程】 ${this.carData.mileage}万公里\n`+
                    `【车辆价格】 ${this.carData.onlinePrice}万元\n`+
                    `【车辆详情】 ${_url}\n`+
                    `【联系方式】 ${contactInfo}\n`+
                    `【诚信车商】 ${this.$store.state.company.companyName}`
                  this.standarText = this.standarText.trim()
                  this.carDesc =  this.carData.carDescribe?this.carData.carDescribe.trim():'';
                  this.shareIt()
                } else {
                  this.$toast.info('获取车辆信息失败');
                }
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }

            },
            async mtSave() {
                let count = 0;
                const total = this.checkIds.length;
                for (const id of this.checkIds) {
                    console.log('the is is ', id)
                    console.log('the dom ', document.getElementById(`pic_` + id))

                  try{
                    this.$toast.loading(` ${count}/${total}进行中`)
                    await this.commonSave(document.getElementById(`pic_` + id))
                    count++
                    if (count == total) {
                      this.$toast.hide()
                      this.$toast.succeed('保存成功')
                      // todo 拉起微信分享
                    }
                  }catch (e) {
                    this.$toast.info(e,1000)
                  }finally {
                    this.$toast.hide()
                  }


                }
            },
            commonSave(dom) {
                return new Promise((resolve, reject) => {
                    const album = '1775';
                    html2canvas(dom, {
                        useCORS: true
                    }).then(canvas => {
                        const abc = canvas.toDataURL('image/jpeg')
                        cordova.plugins.photoLibrary.saveImage(abc, album, (libraryItem) => {
                            console.log('do save the pic')
                            resolve(libraryItem)
                        }, (err) => {
                            console.log(err);
                            reject()
                            cordova.plugins.photoLibrary.requestAuthorization(
                                function () {
                                    // User gave us permission to his library, retry reading it!
                                    this.$toast.succeed('get info');

                                },
                                function (err) {
                                    this.$toast.failed('不确定权限就不能正常使用');
                                    throw err
                                    // User denied the access
                                }, // if options not provided, defaults to {read: true}.
                                {
                                    read: true,
                                    write: true,

                                },
                            );
                            this.$toast.failed(err);
                        });

                    }).catch(err => {
                        console.log('errinfo', err)
                    });
                })
            },
            doCopy() {
                console.log(12312312)
                this.wenan = this.wenan ? this.wenan : this.standarText
                this.$copyText(this.wenan).then(async (e) => {
                    this.$toast.succeed('复制成功');
                    let _res = await this.mtSave();
                    console.log('_res', _res)
                    /*   Wechat.share({
                           message: {
                               title: `${this.$store.state.company.companyName}欢迎您`,
                               description: this.wenan,
                               thumb: _res.photoURL,
                               media: {
                                   type: Wechat.Type.IMAGE,
                                   image: this.imgSrc,
                               },
                           },
                           scene: Wechat.Scene.TIMELINE,

                       }, () => {
                           this.$toast.succeed('分享成功');
                       }, (reason) => {
                           this.$toast.failed(reason);
                       });*/

                }, (e) => {

                });
            },
            async handleTabChange(tab) {
                if (tab.name === p1) {
                    this.wenan = this.standarText;
                }
                if (tab.name === p2) {
                    this.wenan = this.carDesc
                }
            },
            handleShare(carData) {
                //  const res = await  this.$api.get('/getVehicleInfoApp',{params:{ id: this.$route.query.id }});
                  console.log('分享',carData)
                this.carData = carData;
                this.getCarInfo()

            },
            changeState(state,ev){
                if(state==='上架'){
                    this.onlineState = 1;
                    this.stockState = { $in:[1,2,3,4] };
                }
                if(state==='下架'){
                    this.onlineState = { $in:[5,6] };
                    this.stockState = { $in:[1,2,3,4] };
                }
                if(state==='在库'){
                    this.onlineState = null;
                    this.stockState = { $in:[1,2,3,4] };
                }
                if(state==='预定'){
                    this.onlineState = null;
                    this.stockState = { $in:[5,6] };
                }
                if(state==='出售'){
                    this.onlineState = null;
                    this.stockState = { $in:[7] };
                }
                this.carList = [];
                this.init();
                this.page = 1;
                this.st = state;
                this.showState = false;
            },
            async saleThisCar(id,series,companyId){
                console.log(this.$store.state.ac)
                // 判断是不是主账号
                const upData= {};
                if(!this.saleInfo.dealPrice) return this.$toast.info('请输入成交价格',1000);
                if(!this.saleInfo.lxName) return this.$toast.info('请输入客户姓名',1000);
                if(!this.saleInfo.lxPhone) return this.$toast.info('请输入客户电话',1000);
                upData.dealPrice = this.saleInfo.dealPrice;
                upData.cusName = this.saleInfo.lxName;
                upData.phoneNum = this.saleInfo.lxPhone;
                upData.series = series;
                upData.carId = id;
                upData.companyId = companyId;
                upData.followState = 3;
                upData.distribution = 2; //不是商机
                if(this.$store.state.ac.account){ // 如果员工登录
                    upData.sellMan = this.$store.state.ac.id; //出售人为登录员工姓名
                } else { // 否则
                    upData.sellMan = null; //出售人为公司主体
                }
                this.showSell=false
                const _res = await this.$api.post('/clientOrder',upData);
                const { success, info } = _res.data;
                this.$toast.info(info,1000)
                if (!success) return
                for (const index in this.carList){
                    if(id == this.carList[index].id){
                        this.carList[index].stockState=7
                    }
                }
                this.saleInfo.dealPrice='';
                this.saleInfo.lxName='';
                this.saleInfo.lxPhone='';
            }
        },
        mounted(){
            this.qwe=1;

        },
        deactivated() {
            const st = this.$refs.scrollView4.getOffsets();
            sessionStorage.setItem('scrollTop', st.top);
        },
        activated() {
            const st = sessionStorage.getItem('scrollTop');
            const from = window.sessionStorage.getItem('from');
            if(from === 'home' || from == 'updateCar') this.init()
            if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView4.scrollTo(0, parseFloat(st)), 100);
            this.qwe=1
        },
        beforeRouteEnter(to, from, next){
            window.sessionStorage.setItem('from',from.name);
            next()
        },
    }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background:rgba(247,247,247,1);
  }

  .search {
    box-sizing: border-box;
    padding: 12px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 100;
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
          background: rgba(0,0,0,0);
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
        text-align: left;
      }

      input.op {
        opacity: 1;
      }
    }
    p {
      margin-left: 32px;
      font-size: 32px;
      font-weight: bold;
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
    z-index: 2;
    background: #fff;
    .layout{
      width: 100%;
      position: absolute;
      top:80px;
      left:0;
      /*border: 1px solid rgba(0,0,0,.2);*/
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
    z-index: 1;
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

  .onCarboxTop{
    width: 100%;
    height: 60px;
    font-size: 40px;
    color: #666;
    line-height: 60px;
    text-align: left;
    margin-bottom: 20px;
  }
  .onCarData{
    width: 100%;

    margin-bottom: 10px;
  }
  .onCarDataTu{
    width: 150px;
    height: 112px;
    background-color: gray;
    float: left;
    margin-right: 20px;
    overflow: hidden;
    &>img{
      width: 100%;
    }
  }
.InCarSell{
  background: #fff;
  width: 80vw;
  padding:20px;
  h3{
    font-size: 28px;
  }
}

  .StateBtn{
    display: flex;
    justify-content: flex-end;
    &>div{
    }
  }
  .search{
    .opt{
      width: 80px;
      height: 35px;
      position: relative;
      padding-right: 10px;
      .more{
        position: absolute;
        bottom:0;
        left:0;
        transform: translateY(100%);
        z-index: 999;
        background: #fff;
        width: 120px;
        box-shadow: 1px 2px 2px rgba(0,0,0,.3);
        ul{
          font-size: 28px;
          line-height: 3;
          text-align: center;
        }
      }
    }
  }
</style>
