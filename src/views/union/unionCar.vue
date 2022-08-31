<template>
    <div class="main">
      <navTag title="联盟车库"></navTag>
      <div class="content">
        <div class="search">
          <div class="garage" :class="{gact:svalue>1}" @click="isSelectorShow=!isSelectorShow">
            <div>车行</div>
            <md-icon name="arrow-down"></md-icon>
          </div>
          <div class="input">
            <div class="p">
              <md-icon name="search"></md-icon>
              搜索车的品牌型号
            </div>
            <input :class="{opacity:keyword.length>0,opaci:facus}" type="text" v-model="keyword" @focus="facus=true" @blur="facus=false">
          </div>
          <div class="btn" @click="doSearch">搜索</div>
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
                    <div class="btn" >确定</div>
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
                      <md-check-box class="tag" style="margin-right:20px" name="1" v-model="nowOption.bxc" label="自动" />
                      <md-check-box class="tag" name="2" v-model="nowOption.bxc" label="手动" />
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
        <template>
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

        </template>
        <div class="list">
          <md-scroll-view
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
          <div class="lable" v-for="(item,key) in unionCar">
            <div class="top" @click="$router.push({path:'/CarDetailed',query:{id:item.id,companyId:item.company.id}})">
              <div class="pic" :style="item.cover?{background:`url(${item.cover}) no-repeat center center`,backgroundSize:`cover`}:{background: `url(${url}) no-repeat center center`,backgroundSize:`cover`}"></div>
              <div class="info">
                <div class="name">{{item.title}}</div>
                <div class="data">
                  <div class="left">
                    {{item.brandDate | getTime }}上牌·{{item.mileage}}万公里
                  </div>
                </div>
                <div class="shop">
                  <div class="price">{{item.onlinePrice}}</div>
                  <div class="sname">{{item.company.companyName}}</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="tag" :class="{grey:item.moveState==true}" @click="moveUnionCar(key,item.moveState,item.id)">移出车库</div>
              <div class="tag" :class="{grey:item.moveState==false}" @click="addUnionCar(key,item.moveState,item.id)">加入车库</div>
            </div>
          </div>
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

        <md-selector
          v-model="isSelectorShow"
          :default-value="svalue"
          :data="unionList[0]"
          max-height="320px"
          title="选择车商"
          large-radius
          @choose="onSelectorChoose"
        ></md-selector>

      </div>
    </div>
</template>

<script>
    export default {
        name: "unionCar",
        data(){
            return{
                unionCar:[],
                isRefreshing:false,
                isEnd: false, // 下载加载是否到了最后一页
                page: 1,
                showBrandList: false,
                brandId:'',
                keyword: '',
                facus:false,

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
                order:0,
                sYear:'',
                eYear:'',
                isSelectorShow: false,
                unionList:[
                    [
                        {
                            value: '1',
                            text: '选项一',
                        },
                        {
                            value: '2',
                            text: '选项二',
                        },
                        {
                            value: '3',
                            text: '选项三',
                        },
                        {
                            value: '4',
                            text: '选项四',
                        },
                     ]
                ],
                selectorValue: '',
                member: '',
                svalue: 1
            }
        },
        created() {
            this.getUnionCar();
            this.getUnion()
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
        filters:{
            getTime:value=>{
                const time = new Date(value);
                const year = time.getFullYear();
                const mouth = time.getMonth()+1;
                return `${year}-${mouth}`
            }
        },
        methods:{
            closeTag(name){
                if(name === 'color') return this.nowOption.color ='不限';
                if(name === 'order') return this.nowOption.order = null;
                if(name === 'brandId') return this.nowOption.brandId = null;
                this.nowOption[name] ='';
                this.doOk();
            },
            // 获取联盟车库
            async getUnionCar(){
                let postData = {
                    companyId: this.$store.state.company.id,
                    title: this.keyword,
                    companyId: this.$store.state.company.id,
                    brandId: this.brandId,
                    onlineState: this.onlineState,
                    member: this.member,
                    ...this.nowOption,
                }

              try{
                this.$toast.loading('1775加载中...');
                const res = await this.$api.get('/union/union/unionCar',{
                  params:postData
                })
                const { success, info, data } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.$toast.hide();
                this.unionCar = data;
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }

            },
            // 移出车库
            async moveUnionCar(key,state,id){
                if(state) return this.$toast.info('该车辆已经移除！',1000);
                const res = await this.$api.post('/union/moveUnionCar',{
                    companyId: this.$store.state.company.id,
                    id,
                })
                const { success, info } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.$toast.info('移除成功',1000);
                this.unionCar[key].moveState = true;
            },
            async $_onRefresh() {  //处理下拉刷新
                if (this.isRefreshing) return this.$toast.info('1775正在加载...')
                this.page = 1;
                this.isRefreshing = true;//标记正在刷新中 避免重复进行
                await this.getUnionCar();
                this.$refs.scrollView4.finishRefresh()
                this.isRefreshing = false; //移除标记

            },
            async loadMore() { //处理加载更多
                if (this.isEnd) return this.$toast.info('暂时没有更多的加载了哦！')
                this.page++;
                this.isEnd=true;
                let postData = {
                    companyId: this.$store.state.company.id,
                    title: this.keyword,
                    companyId: this.$store.state.company.id,
                    brandId: this.brandId,
                    onlineState: this.onlineState,
                    member: this.member,
                    page:this.page,
                    ...this.nowOption,
                }
                const res = await this.$api.get('/union/union/unionCar',{
                    params:postData
                })
                const { success, info, data } = res.data;
                this.isEnd=false;
                if(!success) return this.$totast
                this.unionCar = this.unionCar.concat(data);

                this.$nextTick(() => {
                    this.$refs.scrollView4.reflowScroller();
                    this.$refs.scrollView4.finishLoadMore();
                });

            },
            // 添加到车库
            async addUnionCar(key,state,id){

                if(!state) return this.$toast.info('该车辆已经在库！',1000);
                const res = await this.$api.post('/union/addUnionCar',{
                    companyId: this.$store.state.company.id,
                    id,
                })
                const { success, info } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.$toast.info('入库成功',1000);
                this.unionCar[key].moveState = false;
            },

            // 品牌选择
            handleBrand(item) {
                this.showBrandList = false;
                if (item === 1){
                    this.brandName = '品牌';
                    return false;
                }
                if (item == 5) {
                    this.nowOption.brandId = null
                } else {
                    this.nowOption.brandId = item.brandId;
                    this.brandName = item.brandName;
                };
                this.page = 1;
                this.getUnionCar();
            },
            // 重置选项
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
                this.order = 0
                this.doOk()
            },
            // 确认选择
            doOk() { //确认
                this.page = 1;
                this.unionCar = [];
                this.type = 0;
                this.getUnionCar()
            },
            // 搜索
            doSearch() {
                this.page = 1;
                this.unionCar = [];
                this.getUnionCar();
            },
            // 选择车商
            onSelectorChoose({value,text,member}) {
                console.log(value)
               this.svalue = value;
               this.selectorValue = text;
               this.member = member;
                this.page = 1;
                this.unionCar = [];
                this.getUnionCar();
            },
            // 获取联盟伙伴
            async getUnion() {
                this.$toast.loading('1775加载中...')
                const res = await this.$api.post('/union/union/getUnion', {
                    companyId: this.$store.state.company.id,
                    page: 1,
                    limit: 900
                });
                const {success, info, data} = res.data;
                this.$toast.hide();
                if (!success) return this.$toast.info(info, 1000);
                let _arr = [];
                for(const index in data){
                    const _obj = {
                        value: index+2,
                        text: data[index].company.companyName,
                        member: data[index].member
                    }
                    _arr.push(_obj);
                }
                const _ob = {
                    value: 1,
                    text: '不限',
                    member: ''
                }
                _arr.unshift(_ob);
                this.unionList=[_arr];
            },
        },
        deactivated() {
            const st = this.$refs.scrollView4.getOffsets();
            sessionStorage.setItem('scrollTop', st.top);
        },
        activated() {
            const st = sessionStorage.getItem('scrollTop');
            const from = window.sessionStorage.getItem('from');
            if(from === 'Union') return setTimeout(() => this.$refs.scrollView4.scrollTo(0,0), 100);
            if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView4.scrollTo(0, parseFloat(st)), 100);
            this.qwe=1
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
   }
   .content{
     height: 0;
     flex-grow: 1;
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
   }
  .search{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 96px;
    box-sizing: border-box;
    background: #fff;
    padding: 0 32px;
    position: relative;
    z-index: 8;
    .garage{
      display: flex;
      align-items: center;
      div{
        max-width: 80px;
        font-size: 32px;
        color: #333;
      }
      i{
        margin-left: 8px;
        font-size: 20px;
        color: #999;
        font-weight: bold;
        margin-top: 8px;
      }
    }
    .garage.gact{
      div,i{
        color: #FF3434 ;
      }
    }
    .input{
      width: 462px;
      height: 72px;
      border-radius: 36px;
      background: #f6f6f6;
      box-sizing: border-box;
      padding: 32px;
      position: relative;
      overflow: hidden;
      .p{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: #999;
        i{
          margin-right: 8px;
          background: rgba(0,0,0,0);
          padding: 0;
          font-size: 32px;
          margin-top: 4px;
        }
      }
      input{
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: #666;
        font-size: 28px;
        text-align: center;
        outline: none;
        background: #f6f6f6;
        border: none;
        z-index: 10;
      }

      input::placeholder{
        color: #999;
      }
      input.opacity,input.opaci{
        opacity: 1;
      }
    }
    .btn{
      font-size: 32px;
      color: #333;
      font-weight: bold;
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

   .list{
    height: 0;
    flex-grow: 1;
    padding: 0 32px;
    box-sizing: border-box;
  }
  .lable{
    background: #fff;
    border-radius: 16px;
    margin-bottom: 20px;
    .top{
      display: flex;
      padding: 20px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      .pic{
        width: 274px;
        height: 182px;
        margin-right: 20px;
        background: #3a8ee6;
      }
      .info{
        width: 0;
        flex-grow: 1;
        height: 182px;
        position: relative;
        .name{
          font-size: 32px;
          color: #333;
          font-weight: bold;
          line-height: 48px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: -6px;
        }
        .data{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 24px;
          color: #999;
          line-height: 1;
          margin-top: 10px;
        }
        .shop{
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price{
            font-size: 40px;
            color: #D52002;
            line-height: 1;
            font-weight: bold;
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
          .sname{
            font-size: 24px;
            color: #999;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

      }
    }
    .bottom{
      display: flex;
      align-items: center;
      height: 78px;
      .tag{
        flex: 1;
        text-align: center;
        font-size: 28px;
        line-height: 1;
        color: #333;
      }
      .tag:first-child{
       border-right: 1px solid #E3E5E5;
      }
      .tag.grey{
        color: #999;
      }
    }
  }
  .lable:nth-child(2){
     margin-top: 20px;
  }
  .lable:last-child{
    margin-bottom: 40px;
  }
  .mask{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
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
           margin-right: 10px;
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
           font-size: 28px;
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
</style>
