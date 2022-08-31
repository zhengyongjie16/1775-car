<template>
  <div class="MyCar">
    <van-nav-bar
      title="车源列表"
      left-text="返回"
      right-text="筛选"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="sxBox=true"
    />
    <div class="MyCarBox">
      <md-tab-bar
        v-model="current"
        :items="items"
        :maxLength="5"
        @change="handleChange"

      />
      <!--顶部-->

      <!--在库、预定、已售选择列表-->

      <!--筛选条件-->

      <!--点击查询-->


      <!--车辆显示列表-->
      <md-scroll-view
        ref="scrollView"
        :scrolling-x="false"
        @refreshing="onRefresh"
        @endReached="getMore"
        class="CarData"
        auto-reflow
        :endReachedThreshold="100"
        :scrollingX="false"
        :immediateCheckEndReaching="true"
      >
        <md-scroll-view-refresh
          slot="refresh"
          slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
          :scroll-top="scrollTop"
          :is-refreshing="isLoading"
          :is-refresh-active="isRefreshActive"
        ></md-scroll-view-refresh>
        <div class="CarDataLi" >

          <div class="CarDataLidata" v-if="CarTableData">
            <ul>
              <li v-for="(item,r) in CarTableDataLi" >
                <!--车辆信息-->
                <div class="CarinformationTh">
                  <div class="ciLeft">
                    <div class="CarDataLe">
                      <div class="CarDataLeTu">
                        <img :src="item.attachments.length>0? mobilePic(item.attachments[0].path):''" alt="">
                      </div>
                      <!--<div class="CarDataLeFont">视频未上传</div>-->
                    </div>
                    <div class="CarDataRi">
                      <div @click="CarDataRou(item)">{{item.title}}</div>
                      <p>上牌时间：{{new Date(item.brandDate)|moment('YYYY-MM')}}</p>
                      <p>里程：{{item.mileage}}万公里</p>
                      <p>网销价格: {{item.onlinePrice}}万</p>
                      <p>网络状态：{{item.onlineState|stateTxt}}</p>
                      <p>更新时间：{{new Date(item.updateTime)|moment('YYYY-MM-DD hh:mm')}}</p>
                    </div>

                  </div>

                  <div class="optbt">
                    <template  v-if="$store.state.ac&&$store.state.ac.editEnable">
                      <span @click="editCarClick(item)">编辑</span>
                      <el-divider direction="vertical" ></el-divider>
                      <span @click="InDepotClick(item)">在库</span>
                      <el-divider direction="vertical"></el-divider>
                      <span @click="InCarPriceClick(item)">定价</span>
                      <!--<span @click="InCarReserveClick(item)">预定</span>-->
                      <el-divider direction="vertical"></el-divider>
                      <span @click="InCarSellClick(item)">出售</span>
                      <el-divider direction="vertical"></el-divider>
                      <span @click="handleStatus(item)">上下架</span>
                      <el-divider direction="vertical"></el-divider>
                    </template>

                    <span @click="InCarDeleteClick(item)"  v-if="$store.state.ac&&$store.state.ac.delEnable">删除</span>
                    <el-divider direction="vertical"  v-if="$store.state.ac&&$store.state.ac.delEnable"></el-divider>
                    <span @click="reUpdate(item)">刷新</span>
                  </div>
                  <div class="shareBtn" @click="shareIt(item)">
                    <i class="iconfont icon-fenxiang"></i>
                  </div>
                </div>
                <!--车源价格-->
                <div class="CarPriceTh" v-if="false">
                  <div class="TableFont">
                    <p>收购价格: <strong>{{item.procurePrice}}</strong></p>
                    <p>网销价格: <strong>{{item.onlinePrice}}</strong></p>
                    <p>展厅价格: <strong>{{item.offlinePrice}}</strong></p>
                    <p>批发价格: <strong>{{item.tradePrice}}</strong></p>
                  </div>
                </div v- >
                <!--在库信息-->
                <div class="LibraryTh" v-if="false">
                  <div class="TableFont">
                    <p>在库状态:{{stockStateArr[item.stockState]}} </p>
                    <p>库龄:({{new Date(item.addTime)| moment("from", "now", true) }} ){{item.reservoirAge}}</p>
                    <p>网络状态:{{item.onlineState|stateTxt}}</p>
                    <p>更新时间: <br>{{new Date(item.updateTime?item.updateTime:item.addTime)|moment('YYYY-MM-DD HH:mm:ss')}}</p>
                    <!--<p>采购人员:{{item.purchaseMan}}</p>-->
                  </div>
                </div>
                <!--网络同步信息-->
                <div class="NetworkNewsTh" v-if="false" style="display:none">
                  <div class="TableFont">
                    <p>预计下架时间:-- </p>
                    <p>网络状态:{{onlineStateArr[item.onlineState]}} </p>
                    <p>同步成功:-- </p>
                    <p>同步失败:-- </p>
                  </div>
                </div>
                <!--车源推广-->
                <div class="CatExtenTh" v-if="false">
                  <div class="TableFont">
                    <p>车源推广:{{spreadSateArr[item.spreadSate]}}</p>
                  </div>
                </div>
                <!--操作-->
                <div class="operationTh" style="border-right: none" v-if="false">
                  <div class="operaFont">
                    <span @click="editCarClick(item)">编辑</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="InDepotClick(item)">在库状态</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="InCarPriceClick(item)">定价</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="InCarSellClick(item)">出售</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="InCarDeleteClick(item)">删除</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="handleStatus(item)">上下架</span>
                    <!--<span @click="attache(item)">车辆附件</span>-->

                  </div>
                </div>
              </li>
            </ul>

          </div>
          <div v-else class="CarDataLidataNull">
            <h1>老板您好，目前没有查询到车源！</h1>
            <p>您可以 <strong>添加车源</strong>，促进销售</p>
          </div>


        </div>
        <md-scroll-view-more
          slot="more"
          :is-finished="isloadmore"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>


    <!--操作内容-->
    <div class="WinM" :style="Dis"  @click="Disnone"></div>
    <!--修改在库状态-->
    <div class="InDepotState" :style="InDepotDis">
      <div class="InDepotStatebox">
        <div class="onCarboxTop">
          修改在库状态
        </div>
        <div class="onCarData">
          <div class="onCarDataTu"> <img :src="czImg" alt=""></div>
          <h3>{{czName}}</h3>
          <p>上牌时间:{{czTime}}</p>
          <p>车辆Vin码:{{czVin}}</p>
        </div>
        <div class="StateClass">
          <div class="StateClassLi" :class="InStateClassLiNum==item.value?'StateCli':''" @click="zkState(item.value)" v-for="(item) in InStateClassLi">
            {{item.name}}
            <div class="StateGra" :style="InStateClassLiNum==item.value?'display:block':'display:none'"></div>
          </div>
        </div>
        <div class="StateBtn">
          <div class="StateBtnconfirm" @click="InStateOk">确定</div>
          <div class="StateBtnCancel"  @click="Disnone">取消</div>
        </div>
      </div>
    </div>
    <!--车源定价-->
    <div class="InCarPrice" :style="InCarPriceDis">
      <div class="InCarPricebox">
        <div class="onCarboxTop">
          车源定价
        </div>
        <div class="onCarData">
          <div class="onCarDataTu">
            <img :src="czImg" alt="">
          </div>
          <h3>{{czName}}</h3>
          <p>上牌时间:{{ new Date(czTime)|moment('YYYY-MM-DD')}}</p>
          <p>车辆Vin码:{{czVin}}</p>
        </div>
        <div class="InCarPriceLi">
          <div>
            <span> <strong>*</strong> 收购价格:</span>
            <el-input v-model="PuPrice" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
          <div>
            <span>展厅价格:</span>
            <el-input v-model="DisPrice" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
          <div style="display: inline-block">
            <span> <strong>*</strong> 网销价格:</span>
            <el-input v-model="NetPrice" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
          <div>
            <span>批发价格:</span>
            <el-input v-model="WholesalePlace" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
          <div>
            <span>销售价格:</span>
            <el-input v-model="SellingPrice" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
        </div>
        <div class="StateBtn">
          <div class="StateBtnconfirm" @click="InCarPriceOk">确定</div>
          <div class="StateBtnCancel"  @click="Disnone">取消</div>
        </div>
      </div>
    </div>
    <!--车源预定-->
    <div class="InCarReserve" :style="InCarReserveDis">
      <div class="InCarReservebox">
        <div class="onCarboxTop">
          车源预定
        </div>
        <div class="onCarData">
          <div class="onCarDataTu"></div>
          <h3>{{czName}}</h3>
          <p>上牌时间:{{czTime}}</p>
          <p>车辆Vin码:{{czVin}}</p>
        </div>
        <div class="InCarReserveLi">
          <!--          <div>
                      <span> <strong>*</strong> 销售人员:</span>
                      <el-select v-model="ReserSalesMan" size="mini" placeholder="请选择">
                        <el-option
                          v-for="item in ReserSalesManLi"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>-->
          <div>
            <span><strong>*</strong> 预定金:</span>
            <el-input v-model="PrepaidGold" class="PriceLiIpt" size="mini"></el-input>
            <span>元</span>
          </div>
          <div>
            <span>客户姓名:</span>
            <el-input v-model="ReserCusName" class="PriceLiIpt" size="mini"></el-input>
          </div>
          <div>
            <span>手机号:</span>
            <el-input v-model="ReserCusIphone" class="PriceLiIpt" size="mini"></el-input>
          </div>
        </div>
        <div class="StateBtn">
          <div class="StateBtnconfirm" @click="InCarReserveOk">确定</div>
          <div class="StateBtnCancel"  @click="Disnone">取消</div>
        </div>
      </div>
    </div>
    <!--车源出售 :style="InCarSellDis"-->
    <div class="InCarSell" :style="InCarSellDis">
      <div class="InCarSellbox">
        <div class="onCarboxTop">
          车源出售
        </div>
        <div class="onCarData">
          <div class="onCarDataTu">
            <img :src="czImg" alt="">
          </div>
          <h3>{{czName}}</h3>
          <p>上牌时间:{{ new Date(czTime)|moment('YYYY-MM-DD')}}</p>
          <p>车辆Vin码:{{czVin}}</p>
        </div>
        <div class="InCarSellLi">
          <!--         <div>
                     <span> <strong>*</strong> 销售人员:</span>
                     <el-select v-model="SellSalesMan[0]" size="mini" placeholder="请选择">
                       <el-option
                         v-for="item in SellSalesManLi"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                       </el-option>
                     </el-select>
                   </div>-->
          <div>
            <span><strong>*</strong> 成交价格:</span>
            <el-input v-model="saleInfo.dealPrice" class="PriceLiIpt" size="mini"></el-input>
            <span>万元</span>
          </div>
          <div>
            <span>客户姓名:</span>
            <el-input v-model="saleInfo.lxName" class="PriceLiIpt" size="mini"></el-input>
          </div>
          <div>
            <span><strong>*</strong>手机号:</span>
            <el-input v-model="saleInfo.lxPhone" class="PriceLiIpt" size="mini"></el-input>
          </div>
          <div>
            <span>贷款收入:</span>
            <el-input  v-model="saleInfo.daiFee" class="PriceLiIpt" size="mini"></el-input>
            <span>元</span>
          </div>
          <div>
            <span>保险收入:</span>
            <el-input v-model="saleInfo.bxFee" class="PriceLiIpt" size="mini"></el-input>
            <span>元</span>
          </div>
          <div>
            <span>其他收入:</span>
            <el-input v-model="saleInfo.otherFee" class="PriceLiIpt" size="mini"></el-input>
            <span>元</span>
          </div>
        </div>
        <div class="StateBtn">
          <div class="StateBtnconfirm" @click="InCarSellOk">确定</div>
          <div class="StateBtnCancel"  @click="Disnone">取消</div>
        </div>
      </div>
    </div>
    <!--删除-->
    <div class="InCarDelete" :style="InCarDeleteDis">
      <div class="InCarClose"><i class="el-icon-close" @click="Disnone"> </i></div>
      <h3>删除提醒</h3>
      <p>删除该车源后将不可恢复，是否确认删除？</p>
      <div class="StateBtn">
        <div class="StateBtnconfirm" @click="InCarDeleteOk">确定</div>
        <div class="StateBtnCancel"  @click="Disnone">取消</div>
      </div>
    </div>
    <!--车源退库-->
    <el-dialog
      title="车源上下架"
      :visible.sync="showStatusBox"
      width="80vw"
      custom-class="InCarRet"
    >
      <div class="InCarRetBox"  >
        <div class="onCarData">
          <div class="onCarDataTu">
            <img :src="czImg" alt="">
          </div>
          <h3>{{czName}}</h3>
          <p>上牌时间:{{czTime}}</p>
          <p>车辆Vin码:{{czVin}}</p>
          <p>当前状态:{{nowCar.onlineState|stateTxt}}</p>
        </div>
      </div>
      <template slot="footer">
        <el-button @click="doOnline" size="mini" v-if="nowCar.onlineState>=4">上线</el-button>
        <el-button @click="doOffline" size="mini" v-if="nowCar.onlineState<4">下架</el-button>
      </template>

    </el-dialog>
    <!--车配件-->
    <el-dialog
      title="车辆附件管理"
      :visible.sync="attachBox"
      width="800"
    >
      <carAttach :data="nowCar"></carAttach>
    </el-dialog>

    <van-popup v-model="sxBox" position="right" :style="{width:'100vw',height:'100%'}" class="mypop">
      <!--筛选条件-->
      <div class="MyCarSele">
        <!--车辆选择-->
        <div>
          <span>车辆品牌:</span>
          <brandPicker v-model="brandArr"></brandPicker>
        </div>
        <!--上牌日期-->
        <div v-if="SeTopLeNum!=2">
          <span>上牌日期:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="Chodate"
            type="daterange"
            @change="getList"
          >
          </el-date-picker>
        </div>
        <!--成交日期-->
        <div v-if="SeTopLeNum==2">
          <span>成交日期:</span>
          <el-date-picker
            class="checkSeleDate"
            size="mini"
            v-model="Dealdate"
            type="daterange"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!--库龄-->

        <div>
          <span>库龄:</span>
          <el-select class="checkSele" size="mini" v-model="Choage" placeholder="不限" >
            <el-option
              v-for="item in ChodateData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--里程-->
        <div>
          <span>里程:</span>
          <el-select class="checkSele" size="mini" v-model="Chomileage" placeholder="不限" >
            <el-option
              v-for="item in ChomileageData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!--收购价格-->
        <div>
          <span>收购价格:</span>
          <el-input class="PriceFont" size="mini" v-model="BuyPriceStart"  @change="getList"></el-input>&nbsp-
          <el-input class="PriceFont" size="mini" v-model="BuyPriceEnd"   @change="getList"></el-input>
        </div>
        <!--成交价格-->
        <div v-if="SeTopLeNum==2">
          <span>成交价格:</span>
          <el-input class="PriceFont" size="mini" v-model="DealPriceStart" ></el-input>&nbsp;-
          <el-input class="PriceFont" size="mini" v-model="DealPriceEnd" ></el-input>
        </div>
        <!--预定价格-->
        <div v-if="SeTopLeNum==1">
          <span>预定价格:</span>
          <el-input class="PriceFont" size="mini" v-model="ReservePriceStart" ></el-input>&nbsp;-
          <el-input class="PriceFont" size="mini" v-model="ReservePriceEnd" ></el-input>
        </div>
        <!--网络状态-->
        <!--        <div v-if="SeTopLeNum!=2">
                  <span>网络状态:</span>
                  <el-select  @change="wlState" class="checkSele" size="mini" v-model="PinState"  placeholder="不限">
                    <el-option
                      v-for="(item,r) in PinStateData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>-->
        <!--      &lt;!&ndash;是否含有VIN码&ndash;&gt;
              <div v-if="SeTopLeNum!=2">
                <span>是否含有VIN码:</span>
                <el-select class="checkSele" size="mini" v-model="Vin" placeholder="全部">
                  <el-option
                    v-for="item in VinStateData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              &lt;!&ndash;车源推广状态&ndash;&gt;
              <div v-if="SeTopLeNum!=2">
                <span>车源推广状态:</span>
                <el-select @change="tkState" class="checkSele" size="mini" v-model="CarExtension" placeholder="全部">
                  <el-option
                    v-for="item in CarExtensionData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>-->
        <!--是否批发车源-->
        <div>
          <span>是否批发车源:</span>
          <el-select class="checkSele" size="mini" v-model="Wholesale" placeholder="全部">
            <el-option
              v-for="item in WholesaleData"
              :key="item.value"
              :label="item.label"
              :value="item.value" >
              {{item.label}}
            </el-option>
          </el-select>
        </div>
        <!--销售代表-->
        <!--<div>
          <span>销售代表:</span>
          <el-select class="checkSele" size="mini" v-model="Sale" placeholder="全部">
            <el-option
              v-for="item in SaleData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>-->
        <!--是否有小视频-->
        <!--    <div v-if="SeTopLeNum!=2">
              <span>是否有小视频:</span>
              <el-select class="checkSele" size="mini" v-model="miniMp4" placeholder="全部">
                <el-option
                  v-for="item in miniMp4Data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>-->
        <!--快速查找-->
        <div>
          <span>快速查找:</span>
          <el-input   class="checkSele" size="mini"  v-model="fastSearch" placeholder="车源名称/车源ID"></el-input>
        </div>
        <md-button  style="margin-top: 20px;"  @click="toFine">查找</md-button>
        <md-button  style="margin-top: 20px;" @click="init">重置</md-button>
        <md-button  style="margin-top: 20px;" @click="shareAll">分享全部车源</md-button>
        <md-button  style="margin-top: 20px;" @click="sxBox=false">取消</md-button>

      </div>

    </van-popup>

  </div>
</template>

<script>
  import { ActionSheet, Button, Dialog } from 'mand-mobile';
  import carAttach from '../components/carAttach';
  import brandPicker from '../components/mbrandPicker';

  export default {
    name: 'MyCar',
    components: { carAttach, brandPicker },
    data() {
      return {
        brandArr: [],
        current: 1,
        items: [
          { name: 1, label: '在售车型' },
          { name: 2, label: '下架车型' },
          { name: 3, label: '已售车型' },
        ],
        isLoading: false,
        sxBox: false,
        attachBox: false,
        nowState: '',
        carBrand: [],
        value: [],
        nowCar: {},
        // MyCarLi: ['在库', '预定', '已售'], // 车源状态列表
        MyCarLi: ['在库'], // 车源状态列表
        MyCarLiNum: ['0', '0', '0'], // 车源状态各个数目
        SeTopLeNum: '0',
        SeTopLeCli: 'SeTopLeCli',
        //  表单数据
        ChoCartype: '', // 选择车型
        Chodate: '', // 上牌日期
        Dealdate: '', // 成交日期
        Choage: 0, // 库龄
        Chomileage: '', // 里程
        BuyPriceStart: '', // Price收购最低价格
        BuyPriceEnd: '', // Price收购最高价格
        PinPriceStart: '', // Price网销最低价格
        PinPriceEnd: '', // Price网销最高价格
        DealPriceStart: '', // 成交价最低值
        DealPriceEnd: '', // 成交价最高值
        ReservePriceStart: '', // Price预定最低价格
        ReservePriceEnd: '', // Price预定最低价格
        PinState: '', // 网络状态
        PinStatecount: '', // 网络状态传回服务器的数据
        Vin: '', // Vin码
        CarExtension: '', // 车源推广状态
        CarExtensionConunt: '', // 车源推广状态传回服务器的数据
        Wholesale: 0, // 是否批发
        Sale: '', // 销售代表
        miniMp4: '', // 是否有小视频
        fastSearch: '', // 快速查找
        showStatusBox: false, // 网络状态上下架弹窗
        // 日期选择数据
        pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            },
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            },
          }],
        },
        ChoCartypeData: [{ // 选择车型数据
          value: '宝马',
        }],

        ChodateData: [
          { value: 0, label: '不限制' },
          { value: 30, label: '30天内' },
          { value: 60, label: '60天内' },
          { value: 120, label: '120天内' },
        ], // 选择库龄数据
        ChomileageData: [
          { value: '', label: '不限' },
          { value: '1', label: '1万公里内' },
          { value: '2', label: '3万公里内' },
          { value: '3', label: '6万公里内' },
          { value: '4', label: '10万公里内' },
          { value: '5', label: '10万公里以上' },
        ], // 选择里程数据
        PinStateData: [
          { value: '', label: '不限' },
          { value: '1', label: '网络在售' },
          { value: '2', label: '非网络车源' },
          { value: '3', label: '待审核' },
          { value: '4', label: '审核不通过' },
          { value: '5', label: '手动下架' },
          { value: '6', label: '系统下架' },
          { value: '7', label: '冻结下架' },
        ], // 选择网络状态数据
        PinStateArr: ['不限', '网络在售', '非网络车源', '待审核', '审核不通过', '手动下架', '系统下架', '冻结下架'], // 选择网络状态数据
        VinStateData: [
          { value: '全部' },
          { value: '是' },
          { value: '否' },
        ], // 选择Vin数据
        CarExtensionData: [
          { value: '', label: '全部' },
          { value: '1', label: '精准推广中' },
          { value: '2', label: '优质推广中' },
          { value: '3', label: '异地推广中' },
          { value: '4', label: '本地推广中' },
          { value: '5', label: '待本地推广中' },
        ], // 选择车源推广状态数据
        CarExtensionArr: ['全部', '精准推广中', '优质推广中', '异地推广中', '本地推广中', '待本地推广中'], // 选择车源推广状态数据
        WholesaleData: [
          { value: 0, label: '全部' },
          { value: 1, label: '是' },
          { value: 2, label: '否' },
        ], // 选择是否批发车源数据
        SaleData: [
          { value: '全部' },
        ], // 选择销售代表数据
        miniMp4Data: [
          { value: '全部' },
          { value: '是' },
          { value: '否' },
        ], // 选择是否有小视频数据
        CarArray: '',
        CarArrayData: [
          { value: '默认' },
          { value: '由新到旧' },
          { value: '由旧到新' },
        ], // 车源排列规则
        CarCheData: ['1', '4'], // 车源排列的多选项

        CarTableData: '1', // 判断车源是否有数据
        CarTableDataLi: [],
        // 车辆操作状态
        InStateClassLi: [
          { name: '在厅', value: 1 },
          { name: '在途', value: 2 },
          { name: '整备', value: 3 },
          { name: '在售', value: 4 },
          { name: '预约', value: 5 },
          { name: '预定', value: 6 },
          { name: '已售', value: 7 },
        ],
        // InStateClassLiNum: 0,
        InStateCli: 'StateCli',
        Dis: { display: 'none' }, // 遮罩层显示隐藏
        InDepotDis: { display: 'none' }, // 车辆在库状态显示隐藏
        InCarPriceDis: { display: 'none' }, // 车辆定价显示隐藏
        InCarReserveDis: { display: 'none' }, // 车辆预定显示隐藏
        InCarSellDis: { display: 'none' }, // 车辆出售显示隐藏
        InCarDeleteDis: { display: 'none' }, // 车辆数据删除提示
        InCarRetDis: { display: 'none' }, // 车源退库
        operationNum: '', // 操作信息数据来源
        nowCarid: '',

        // 车辆出售表单数据绑定
        SellSalesMan: ['111'], // 销售人员
        SellSalesManLi: [
          { value: '小精灵' },
        ], // 销售人员选择
        SellPrice: [], // 成交价格
        SellCusName: [''], // 客户姓名
        SellCusIphone: [''], // 手机号
        SellCusLoan: [''], // 贷款收入
        SellCusInsu: [''], // 保险收入
        SellCusOther: [''], // 其他收入

        //  分页
        MyCarpaging: 1, // 当前页数
        MyCarmaxpaging: 0, // 最大页数

        gearBoxArr: ['手动', '自动'],
        hasBrandArr: ['否', '是'],
        stockStateArr: ['', '在厅', '在途', '整备', '在售', '预约', '预定', '已售'], // 在库状态显示
        onlineStateArr: ['网络在售', '非网络在售', '待审核', '审核不通过', '手动下架', '系统下架', '冻结下架'],
        spreadSateArr: ['推广中', '顶置中', '推荐中', '待推荐'],
        carSourceArr: ['收购', '寄卖', '置换', '其他'], // 车辆来源
        payModeArr: ['全款', '贷款'], // 收购方式
        carStateArr: ['无事故', '有轻微剐蹭'], // 车辆状态
        insideStateArr: ['完好', '有破损'], // 内饰状态
        surfaceStateArr: ['极新', '较新', '一般', '较差'], // 外观成色
        keepRecordArr: ['4s店定期保养', '非4s店定期保养', '无保养'], // 保养记录
        carInvoiceArr: ['齐全', '丢失', '补办中'], // 发票
        registrationArr: ['齐全', '丢失', '补办中'], // 登记证
        insideColorArr: ['深色', '浅色'], // 内饰颜色
        applicationArr: ['家用', '单位用车'], // 用途


        // 在库状态绑定的数据
        czOkNum: '', // 接受car循环列表中的r，然后确认按钮的时候发送ajax请求
        InStateClassLiNum: 0, // 在库状态传送数据

        // 车源定价的表单绑定数据
        PuPrice: '', // 收购价格
        DisPrice: '', // 展厅价格
        NetPrice: '', // 网销价格
        NetPriceCheck: '', // 网销价格check
        NetPriceReference: '', // 网销价格参考
        NetPriceNewCarPritre: '', // 网销价格新车价
        WholesalePlace: '', // 批发价格
        SellingPrice: '', // 销售价格

        // 车源预定的表单数据绑定
        ReserSalesMan: '111', // 销售人员
        ReserSalesManLi: [
          { value: '小精灵' },
        ], // 销售人员选择
        PrepaidGold: '', // 预定金
        ReserCusName: '', // 客户姓名
        ReserCusIphone: '', // 手机号
        carReserveDate: '', // 车辆预定信息接收
        branId: '',
        limit: 15,
        page: 1,
        saleInfo: {
          lxName: '',
          lxPhone: '',
          dealPrice: '',
          bxFee: '',
          daiFee: '',
          otherFee: '',
          carId: '',
        },
        isref: false, // 是否是正在
        isloadmore: false, // 是否是加载更多
        maxPageSize: null,
        onlineState: 1,
        stockState: null,
        onsaleCount: 0,
      };
    },
    computed: {
      czName() {
        const { title, brand } = this.nowCar;
        return title || '';
      },
      czTime() {
        const { brandDate } = this.nowCar;
        if (brandDate) return this.$moment(new Date(brandDate)).format('YYYY-MM-DD');
        return '';
      },
      czVin() {
        const { vin } = this.nowCar;
        return vin || '';
      },
      czImg() {
        const { attachments } = this.nowCar;

        if (attachments && attachments.length) {
          return attachments[0].path;
        }
        return '';
      },
    },
    methods: {
      shareAll() {
        this.sxBox = false;
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
          onSelected: this.$_selected1,
        });
      },

      $_selected1(item) {
        console.log(item);
        const _isAc = window.localStorage.getItem('isAc');
        const _url = _isAc == '0' ? `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.phone}`;

        const lxName = _isAc == 1 ? this.$store.state.ac.lxname : '';
        if (item.value == 0) {
          Wechat.share({
            message: {
              title: `${this.$store.state.company.companyName} - ${this.onsaleCount}辆靓车推荐`,
              description: 'This is description.',
              thumb: this.$store.state.company.logo ? this.$store.state.company.logo : 'https://m.1775.net.cn/mlogo.jpg',
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
        if (item.value == 1) {
          Wechat.share({
            message: {
              title: `${this.$store.state.company.companyName} - ${this.onsaleCount}辆靓车推荐`,
              description: 'This is description.',
              thumb: this.$store.state.company.logo ? this.$store.state.company.logo : 'https://m.1775.net.cn/mlogo.jpg',
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
        if (item.value == 2) {
          const txt = `${this.$store.state.company.companyName} - ${this.onsaleCount}辆靓车推荐 点击访问：${_url}`;
          this.$copyText(txt).then((e) => {
            this.$toast.succeed('复制成功');
          }, (e) => {

          });
        }
      },
      shareIt(item) {
        this.nowCar = item;
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
        const item = this.nowCar;

        const _isAc = window.localStorage.getItem('isAc');
        const _url = _isAc == '0' ? `http://m.1775.net.cn/#/content?id=${item.id}` : `http://m.1775.net.cn/#/content?id=${item.id}&phone=${this.$store.state.ac.phone}`;

        const lxName = _isAc == 1 ? this.$store.state.ac.lxname : '';
        if (se.value == 0) {
          Wechat.share({
            message: {
              title: `${item.title}`,
              description: 'This is description.',
              thumb: this.mobilePic(item.attachments[0].path),
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
              description: 'This is description.',
              thumb: this.mobilePic(item.attachments[0].path),
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
          const txt = `${item.title}
         \n【 行驶里程 】${item.mileage} 万公里
         \n【 上牌时间 】${this.$moment(new Date(item.brandDate)).format('YYYY年MM月')}
         \n【 售   价 】￥${item.onlinePrice} 万元
         \n【 详情地址 】${_url} `;
          this.$copyText(txt).then((e) => {
            this.$toast.succeed('复制成功');
          }, (e) => {

          });
        }
      },
      toFine() {
        this.page = 1;
        this.CarTableDataLi = [];

        this.getList();
      },
      init() {
        this.fastSearch = '';
        this.page = 1;
        this.CarTableDataLi = [];
        this.brandArr = [];
        this.Chomileage = '';
        this.getList();
      },
      async countNum() {
        const res = await this.$api.post('/company/countNum', { id: this.$store.state.company.id });
        const { success, data } = res.data;
        if (success) {
          this.onsaleCount = data.onsale;
          this.items = [
            { name: 1, label: `在售车型${data.onsale}` },
            { name: 2, label: `下架车型${data.nosale}` },
            { name: 3, label: `已售车型${data.saled}` },
          ];
        }
      },
      handleChange(item) {
        this.maxPageSize = null;
        this.page = 1;
        this.CarTableDataLi = [];
        console.log(item);
        if (item.name == 1) {
          this.onlineState = 1;
        }
        if (item.name == 2) {
          this.onlineState = 5;
        }
        if (item.name == 3) {
          this.onlineState = 6;
          this.stockState = 7;
        } else {
          this.stockState = null;
        }
        this.getList();
      },
      async onRefresh() {
        this.isref = true;
        this.page = 1;
        this.CarTableDataLi = [];
        this.getList();
      },
      // 申请上架
      async doOnline() {
        const res = await this.$api.post('/vehicle/doOnline', { carId: this.nowCar.id });
        const { success } = res.data;
        if (success) {
          this.$message.success('提交上线申请成功,待审核');
          this.showStatusBox = false;
          this.nowCar.onlineState = 3;
          this.getList();
        } else {
          this.$message.success('提交失败，请联系管理员');
        }
      },
      // 下架(下架不需要审核)
      async doOffline() {
        const res = await this.$api.post('/vehicle/doOffline', { carId: this.nowCar.id });
        const { success } = res.data;
        if (success) {
          this.$message.success('下架成功');
          this.showStatusBox = false;
          this.nowCar.onlineState = 5;
        } else {
          this.$message.success('提交失败，请联系管理员');
        }
      },
      wlState() {
        this.PinStatecount = this.PinStateArr.indexOf(this.PinState);
        this.getList();
      },
      tkState() {
        this.CarExtensionConunt = this.CarExtensionArr.indexOf(this.CarExtension);
        console.log(this.CarExtensionConunt);
      },
      cho() {
        console.log(1);
      },
      async StateLi(r) {
        this.SeTopLeNum = r;
      },
      async getBrands() {
        const res = await this.$api.get('/brands');
        const { success, data } = res.data;
        if (success) {
          this.carBrand = data.map(r => ({
            label: r.brandName,
            value: r.brandId,
          }));
          this.carBrand.unshift({ label: '全部', value: 0 });
          console.log(this.carBrand);
        }
      },

      getMore() {
        console.log('herer 0000');
        this.isloadmore = true;
        this.getList();
      },
      // 车源查找
      async getList() {
        if (this.maxPageSize && this.page > this.maxPageSize) {
          console.log('herer11111');
          if (this.isref) {
            this.isref = false;
            this.$refs.scrollView.finishRefresh();
          }
          if (this.isloadmore) {
            this.isref = false;
            this.$refs.scrollView.finishLoadMore();
          }
        }
        if (!this.$store.state.company.id) return this.$message.info('当前账号未登陆请重新尝试');
        this.companyId = this.$store.state.company.id;
        const _postData = {
          // 品牌id
          branId: this.brandId,

          // 上牌开始日期
          sdate: this.Chodate[0] ? this.Chodate[0].getTime() : '',
          // 上牌截至日期
          edate: this.Chodate[1] ? this.Chodate[1].getTime() + 24 * 60 * 60 * 1000 : '',
          // 库龄
          reservoirAge: this.Choage,
          // 页码
          page: this.page,
          // 每页条数
          limit: this.limit,
        };
        if (this.brandId) _postData.brandId = this.brandId;
        // 里程
        if (this.Chomileage) {
          // { value: '1', label: '1万公里内' },
          // { value: '2', label: '3万公里内' },
          // { value: '3', label: '6万公里内' },
          // { value: '4', label: '10万公里内' },
          // { value: '5', label: '10万公里以上' },

          if (this.Chomileage == 1) _postData.mileageMax = 1;
          if (this.Chomileage == 2) _postData.mileageMax = 3;
          if (this.Chomileage == 3) _postData.mileageMax = 6;
          if (this.Chomileage == 4) _postData.mileageMax = 10;
          if (this.Chomileage == 5) _postData.mileageMin = 10;
        }
        // 收购价范围 min值
        if (this.BuyPriceStart) _postData.procurePriceMin = this.BuyPriceStart;
        // 收购价范围 max值
        if (this.BuyPriceStart) _postData.procurePriceMax = this.BuyPriceEnd;
        // 网销价范围 min值
        if (this.PinPriceStart) _postData.onlinePriceMin = this.PinPriceStart;
        // 网销价范围 max值
        if (this.PinPriceEnd) _postData.onlinePriceMax = this.PinPriceEnd;
        // 网络状态
        if (this.PinState) _postData.onlineState = this.PinState;
        // 推广状态
        if (this.CarExtension) _postData.spreadSate = this.CarExtension;
        // 限定公司查询
        if (this.companyId) _postData.companyId = this.$store.state.company.id;
        // 快速查找
        if (this.fastSearch) _postData.fastSearch = this.fastSearch;
        // 是否是批发车辆
        if (this.Wholesale == 1) _postData.isPf = 1;
        if (this.Wholesale == 2) _postData.isPf = 0;
        //  if (this.CarCheData.length) _postData.CarCheData = this.CarCheData.join();
        if (this.onlineState) _postData.onlineState = this.onlineState;
        if (this.stockState) _postData.stockState = this.stockState;

        if (this.brandArr[1]) _postData.brandId = this.brandArr[1];

        console.log(_postData);
        //  this.$toast.loading('加载中', 1500);
        const res = await this.$api.post('/findVehicleList', _postData);
        this.$toast.hide();

        const { success, data } = res.data;
        if (success) {
          if (data.list.length == 0 && this.page == 1) return this.CarTableData = 0;
          this.CarTableData = 1;
          data.list.forEach(r => this.CarTableDataLi.push(r));
          this.MyCarmaxpaging = data.totalCount;
          this.maxPageSize = data.totalPageCount;
          if (this.isref) {
            this.isref = false;
            this.$refs.scrollView.finishRefresh();
          }
          if (this.isloadmore) {
            this.isref = false;
            this.$refs.scrollView.finishLoadMore();
          }
          this.page++;
        }

        this.isLoading = false;
        this.sxBox = false;
      },


      // 添加车源跳转
      AddcarRouter() {
        this.$router.push({
          name: 'AddCar',
        });
      },
      // 查看被投诉的车辆
      ComCarRouter() {
        this.$router.push({
          name: 'ComplaintCar',
        });
      },
      // 在库状态配置
      InLiStaRouter() {
        this.$router.push({
          name: 'InLibraryState',
        });
      },
      // 车辆详细
      CarDataRou(item) {
        //  this.$store.commit('carLiCount', r);
        // const carLiShu = this.CarTableDataLi[r].id
        // this.$cookie.set('carLishu', r);
        this.$router.push({
          name: 'CarDetailed',
          query: {
            id: item.id,
          },
        });
      },

      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      // 操作

      // 操作 -- 编辑
      editCarClick(item) {
        this.$router.push({
          name: 'updateCar',
          query: {
            id: item.id,
          },
        });
      },

      // 操作 -- 在库状态
      async InDepotClick(item) {
        this.Dis.display = 'block';
        this.InDepotDis.display = 'block';
        this.nowCar = item;
      },
      zkState(r) {
        this.InStateClassLiNum = r;
        console.log(this.InStateClassLiNum);
      },


      // 操作 -- 定价
      async InCarPriceClick(item) {
        this.Dis.display = 'block';
        this.InCarPriceDis.display = 'block';
        this.nowCar = item;
      },
      // 操作 -- 预定
      async InCarReserveClick(r) {
        this.Dis.display = 'block';
        this.InCarReserveDis.display = 'block';
        this.czOkNum = r;
      },
      // 操作 -- 出售
      InCarSellClick(item) {
        this.nowCar = item;
        this.Dis.display = 'block';
        this.InCarSellDis.display = 'block';
        this.saleInfo = {
          lxName: '',
          lxPhone: '',
          dealPrice: '',
          bxFee: '',
          daiFee: '',
          otherFee: '',
          carId: this.nowCar.id,
        };
      },
      // 操作 -- 删除
      InCarDeleteClick(r) {
        this.nowCarid = r.id;
        this.Dis.display = 'block';
        this.InCarDeleteDis.display = 'block';

        this.czOkNum = r;
      },
      // 操作 -- 退库
      InCarRetClick(r) {
        this.Dis.display = 'block';
        this.InCarRetDis.display = 'block';

        this.czOkNum = r;
      },
      // 网络状态的修改
      handleStatus(item) {
        this.nowCar = item;
        this.showStatusBox = true;
      },
      async reUpdate(item) {
        const res = await this.$api.post('/vehicle/updateTime', { id: item.id });
        const { success, data } = res.data;
        if (success) {
          this.$toast.succeed('刷新成功');
          // this.page = 1;
          // this.CarTableDataLi = [];
          // this.getList();
        }
      },
      // 取消
      Disnone() {
        this.Dis.display = 'none';
        this.InDepotDis.display = 'none';
        this.InCarPriceDis.display = 'none';
        this.InCarReserveDis.display = 'none';
        this.InCarSellDis.display = 'none';
        this.InCarDeleteDis.display = 'none';
        this.InCarRetDis.display = 'none';
      },
      // 在库状态确认
      async InStateOk() {
        this.Dis.display = 'none';
        this.InDepotDis.display = 'none';
        const res = await this.$api.post('/stockStateUpdate', {
          id: this.nowCar.id,
          stockState: this.InStateClassLiNum,
        });
        const { success, info, data } = res.data;
        if (success) {
          this.$message.success('修改成功');
          this.getList();
        } else {
          this.$message.error('修改失败');
        }
      },
      // 定价确认
      async InCarPriceOk() {
        if (parseFloat(this.NetPrice) <= 0) return this.$message.error('请填写正确的网销价格');
        if (parseFloat(this.PuPrice) <= 0) return this.$message.error('请填写正确的收购价格');
        this.Dis.display = 'none';
        this.InCarPriceDis.display = 'none';
        const res = await this.$api.post('/vehiclePriceUpdate', {
          id: this.nowCar.id,
          procurePrice: this.PuPrice, // 收购价格
          onlinePrice: this.NetPrice, // 网销价格
          offlinePrice: this.DisPrice, // 展厅价格
          tradePrice: this.WholesalePlace, // 批发价格
          lowPrice: this.SellingPrice, // 销售价格
        });
        const { success, data } = res.data;
        if (success) {
          this.$message.success('修改成功');
          this.getList();
        } else {
          this.$message.error('修改失败');
        }
      },
      // 预定确认
      async InCarReserveOk() {
        this.Dis.display = 'none';
        this.InCarReserveDis.display = 'none';

        const res = await this.$api.post('/addOrder', {
          orderType: '1', // 预定类型
          carId: this.CarTableDataLi[this.czOkNum].id, // 车辆id
          sellMan: this.ReserSalesMan, // 销售人员
          money: this.PrepaidGold, // 预定金
          consumerName: this.ReserCusName, // 客户姓名
          phoneNum: this.ReserCusIphone, // 手机号
        });
        console.log(res);
      },
      // 出售确认
      async InCarSellOk() {
        if (!this.saleInfo.dealPrice) return this.$message.warning('请填写正确的销售价格');
        if (!this.saleInfo.lxName) return this.$message.warning('请填写正确的联系人姓名');
        if (!this.saleInfo.lxPhone) return this.$message.warning('请填写正确的联系人电话');
        const res = await this.$api.post('/client/addSale', this.saleInfo);
        const { success, data } = res.data;
        if (success) {
          this.$message.success('添加成功');
          this.Dis.display = 'none';
          this.InCarSellDis.display = 'none';
          this.getList();
        } else {
          this.$message.warning('添加失败');
        }
      },
      // 删除确认
      async InCarDeleteOk() {
        this.Dis.display = 'none';
        this.InCarDeleteDis.display = 'none';
        const res = await this.$api.get(`/vehicleDelete?id=${this.nowCarid}`);
        const { success, data } = res.data;
        if (success) {
          this.$message.success('删除成功');
        } else {
          this.$message.error('删除失败');
        }

        // 再次刷新CarTableDataLi
        this.getList();
      },
      // 退库确认
      InCarRetOk() {
        this.Dis.display = 'none';
        this.InCarRetDis.display = 'none';
      },
      // attache附件管理
      async attache(item) {
        this.nowCar = item;
        this.attachBox = true;
      },

    },
    watch: {
      brandArr(nv) {
        // console.log(nv);
      },
      CarCheData(nv) {
        console.log(nv);
        this.getList();
      },
      value(nv) {
        this.brandId = nv[0];
        this.getList();
      },
      nowCar(nv) {
        this.InStateClassLiNum = nv.stockState;
        this.PuPrice = nv.procurePrice; // 收购价格
        this.DisPrice = nv.offlinePrice; // 展厅价格
        this.NetPrice = nv.onlinePrice; // 网销价格
        // NetPriceCheck: '', // 网销价格check
        // NetPriceReference: '', // 网销价格参考
        // NetPriceNewCarPritre: '', // 网销价格新车价
        this.WholesalePlace = nv.tradePrice; // 批发价格
        this.SellingPrice = nv.lowPrice; // 销售价格
        // 更新到store
        this.$store.commit('updateNowCar', nv);
      },
    },
    filters: {
      stateTxt(r) {
        // 网络状态 1.网络在售 2.非网络车源 3.待审核 4.审核不通过 5.手动下架 6.系统下架 7.冻结下架
        if (r == 1) return '网络在售';
        if (r == 2) return '非网络车源';
        if (r == 3) return '待审核';
        if (r == 4) return '审核不通过';
        if (r == 5) return '手动下架';
        if (r == 6) return '系统下架';
        if (r == 7) return '冻结下架';
      },
    },
    async beforeMount() {
      this.getBrands();
      this.countNum();
      // this.getList();
    },
    osStr(r) {

    },
  };

</script>

<style scoped lang="scss">
  .WinM{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 999;
    display: none;
  }
  .InDepotState ,.InCarPrice,
  .InCarReserve ,.InCarSell,
  {
    width: 80vw;
    height: 376px;
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /*display: none;*/
  }
  .InDepotStatebox,.InCarPricebox,
  .InCarReservebox,.InCarSellbox,
  {
    width: 100%;
    padding:10px;
    box-sizing: border-box;
    background: #fff;
  }
  .onCarboxTop{
    width: 100%;
    height: 36px;
    font-size: 24px;
    color: #666;
    line-height: 36px;
    text-align: left;
    margin-bottom: 20px;
  }
  .onCarData{
    width: 100%;
    height: 75px;
    margin-bottom: 10px;
  }
  .onCarDataTu{
    width: 100px;
    height: 75px;
    background-color: gray;
    float: left;
    margin-right: 20px;
    overflow: hidden;
    &>img{
      width: 100%;
    }
  }
  .optbt{
    width: 100%;
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .onCarData h3{
    height: 36px;
    font-weight: 400;
    color: #666666;
    font-size: 12px;
    overflow: hidden;
  }
  .onCarData p{
    color: #666666;
    font-size: 12px;
    overflow: hidden;
  }

  .StateClass{

    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
  .StateClassLi{
    width: 76px;
    height: 26px;
    border: 1px solid #e3e3e3;
    text-align: center;
    line-height: 26px;
    color: #666666;
    position: relative;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
  }
  .StateCli{
    color: $ora;
    border: 1px solid $ora;
  }
  .StateGra{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    background-color: $ora;
    top: 50%;
    right:-20px;
    display: none;
  }
  .InCarRet{

  }


  .StateBtn{
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
  }
  .StateBtn>div{
    width: 40%;
    height: 30px;
    text-align: center;
    line-height: 30px;

    font-weight: 600;
    cursor: pointer;
  }
  .StateBtnconfirm{
    background-color: $ora;
    color: #fff;
  }
  .StateBtnconfirm:hover{
    background-color: #ffa23b;
  }
  .StateBtnCancel{
    border: 1px solid #e3e3e3;
    color: #666;
    box-sizing: border-box;
  }
  .StateBtnCancel:hover{
    border: 1px solid $ora;
    color: $ora;
  }

  .InCarPrice{

  }
  .InCarPricebox{

  }
  .InCarPriceLi{
    width: 100%;

  }
  .InCarPriceLi>div{
    width: 100%;
    height: 36px;
    line-height: 36px;
  }
  .InCarPriceLi>div strong{
    font-size: 12px;
    color: red;
    line-height: 36px;
  }
  .InCarPriceLi>div span{
    text-align: right;
    color: #666;
    font-size: 12px;
    margin: 0 7px;
  }
  .InCarPriceLi>div>span:nth-of-type(1){
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .el-checkbox{
    margin-right: 10px;
  }
  .NetPinFont{
    height: 40px;
    position: relative;
    left: 83px;
  }
  .PriceLiIpt{
    width: 100px;
    height: 36px;
  }

  .InCarSell{

    display: block;
  }
  .InCarSellbox{

  }
  .InCarSellLi{

  }
  .InCarSellLi>div{
    width: 100%;
    height: 36px;

    line-height: 36px;
  }
  .InCarSellLi>div strong{
    font-size: 12px;
    color: red;
    line-height: 36px;
  }
  .InCarSellLi>div span{
    text-align: right;
    color: #666;
    font-size: 12px;
    margin: 0 7px;
  }
  .InCarSellLi>div>span:nth-of-type(1){
    display: inline-block;
    width: 70px;
    text-align: right;
  }

  .InCarReserve{
    height: 512px;
  }
  .InCarReservebox{
    height:400px;
  }
  .InCarReserveLi{
    height: 200px;
  }
  .InCarReserveLi>div{
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
    line-height: 36px;
  }
  .InCarReserveLi>div strong{
    font-size: 12px;
    color: red;
    line-height: 36px;
  }
  .InCarReserveLi>div span{
    text-align: right;
    color: #666;
    font-size: 12px;
    margin: 0 7px;
  }
  .InCarReserveLi>div>span:nth-of-type(1){
    display: inline-block;
    width: 70px;
    text-align: right;
  }

  .InCarDelete{
    width: 80vw;
    height: 240px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
  }

  .InCarRet{
    width: 420px;
    height: 240px;

    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);

  }
 ::v-deep .el-dialog__body{
    padding: 10px!important;
  }
  .InCarClose{
    width: 80vw;
    height:40px;
    font-size: 30px;
    line-height: 40px;
    text-align: right;
    color: #666;
  }
  .el-icon-close{
    cursor:pointer;
  }
  .InCarDelete>h3 {
    height: 24px;
    text-align: center;
    color: #666;
    font-size: 24px;
    font-weight: 400;
    margin: 20px 0 30px;
  }
  .InCarDelete>p{
    text-align: center;
    color: #666;
    font-size: 12px;
  }

  .InCarRetBox{

    height: 120px;

  }
  .InCarRetBox>h3{
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #666666;
    font-weight: 400 ;
  }


  .block{
    text-align: center;
  }
  .MyCar{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .MyCarBox{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  /*车源列表*/
  .MyCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .MyCarLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .MyCarLibtn{
    height: 50px;

    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .MyCarLibtn>span{
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 14px;
    color: #fff;
    background-color: $ora;
    text-align: center;
    cursor:pointer;
  }
  .MyCarLibtn>span:hover{
    background-color:#F99737;
  }

  .MyCarSeTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .MyCarSeTopLe{
    width: 360px;
    height: 40px;
    float: left;
  }
  .MyCarSeTopLe ul{
    width: 366px;
    height: 40px;
  }
  .MyCarSeTopLeLi{
    width: 120px;
    height: 40px;
    float: left;
    background-color: #f9fafa;
    border: 1px solid #e3e3e3;
    border-right: none;
    text-align: center;
    line-height: 40px;
    color: #333;
    font-size: 12px;
    z-index: 1;
  }
  .MyCarSeTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }

  /*查询车源表单*/
  .MyCarSele{
    /*height: 180px;*/
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    height: 0;
    padding:15px 5px;
    box-sizing: border-box;

  }
  .mypop{
    /*padding-top: env(safe-area-inset-top);*/
    /*paddint-bottom: env(safe-area-inset-bottom);*/
  }
  .MyCarSele>div{
    width: 100%;
    .SeletBtn{
      float:right;
      margin-right: 20px;
      height: 25px;
      line-height: 25px;
    }

  }
  .MyCarSele span{
    width: 94px;
    height: 36px;
    display: block;
    color: #666;
    font-size: 12px;
    text-align: right;
    line-height: 36px;
    float: left;
    margin-right: 10px;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }
  .PriceFont{
    width: 72px;
    height: 36px;
    line-height: 36px;
  }


  .SeletBtn{
    background-color: $ora;
    text-align: center;
    color: #fff;
    width: 76px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
  }
  .SeletBtn:hover{
    background-color: #f9912e;
  }
  .CarData{
    color: #666;
    font-size: 12px;
    line-height: 26px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .MyCarLine{
    height: 10px;
    margin: 20px 0;
    background-color: #f9fafa;
  }
  .CarDataform{
    width: 100%;
    height: 26px;
    float: left;
  }
  .CarDataform span{
    line-height: 36px;
    margin-right: 8px;
  }
  .CarDataCho{
    height: 26px;
    text-align: center;
  }
  .CarDataChe{
    width: 400px;
    float: left;
    position: relative;
    top: 8px;
  }
  .CarDataNum{
    width: 200px;
    height: 26px;
    line-height: 26px;
    color: #666;
    font-size: 12px;
    float: right;
    position: relative;
    top: 8px;
  }
  .CarDataNum p{
    display: inline-block;
    width: 200px;
    height: 26px;
    line-height: 26px;
    text-align: right;
  }
  .CarDataNum strong{
    font-weight: 400;
    color: $ora;
    line-height: 26px;
  }


  /*车辆列表*/
  .CarDataLi{
    height: 100%;
    display:flex;
    flex-direction: column;
    overflow: auto;
  }
  .CarDataLiTop{
    width: 100%;
    height: 41px;
    background-color: #f8f8f8;
    border: 1px solid #eee;
  }
  .CarDataLiTop>div{
    height: 41px;
    line-height: 41px;
    text-align: left;
    color: #666;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;

  }
  .CarinformationTh{
    width: 100%;
    padding:10px 10px 0;
    box-sizing: border-box;
    position: relative;
  }
  .shareBtn{
    position: absolute;
    right:5px;
    top:50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 40px;

  }
  .CarPriceTh{
    width: 160px;
  }
  .LibraryTh{
    width: 138px;
  }
  .NetworkNewsTh{
    width: 172px;
  }
  .CatExtenTh{
    width: 115px;
  }
  .CarScheIn{
    width: 160px;
  }
  .CarSalesIn{
    width: 200px;
  }
  .operationTh{
    width: 138px;
  }
  .CarDataLidata{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .CarDataLidata ul{

  }
  .CarDataLidata ul li{
    border: 1px solid #eee;
    border-top: none;
  }
  .CarDataLidata ul li:hover{
    background-color: #f8f8f8;
  }
  .CarDataLidata li>div{
    border-right: 1px solid #eee;
    box-sizing: border-box;

  }

  .CarDataLe{
    width: 128px;
  }
  .CarDataLeTu{
    width: 128px;
    height: 96px;
    overflow: hidden;
    background-color: gray;
    &>img{
      width: 100%;
    }
  }
  .CarDataLeFont{
    border: 1px solid #FD4D4D;
    width: 70px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    color: #FD4D4D;
    margin-top: 10px;
    border-radius: 2px;
  }

  .CarDataRi{
    margin-left:10px;
    color: #666;
    font-size: 12px;
  }
  .CarDataRi>div:nth-child(1):hover{
    color: #F98E36;
  ;
  }
  .CarDataRi>p{
    line-height: 1.5;
  }
  .CarDataRi>div{
    cursor: pointer;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 400;
    font-size: 12px;
    color: $ora;
  }
  .TableFont{
    width: 130px;
    margin-top: 8px;
    line-height: 21px;
  }
  .TableFont strong{
    color: $ora;
    font-weight: 400;
  }

  .operaFont{
    width: 130px;
    margin-top: 8px;
    line-height: 21px;
  }
  .operaFont span{
    text-decoration-line: underline;
    cursor: pointer;
  }
  .operaFont span:hover{
    color: $ora;
  }

  .CarDataLidataNull{
    width: 1140px;
    height: 154px;
    text-align: center;
    color: #999;
    padding-top: 100px;
  }
  .CarDataLidataNull h1{
    font-weight: 400;
    display: block;
  }
  .CarDataLidataNull p{
    line-height: 44px;
    font-size: 14px;
  }
  .CarDataLidataNull strong{
    font-weight: 400;
    color: $ora;
    cursor: pointer;
  }

  .ciLeft{
    display: flex;
  }
  .ciLeft > div:last-child{
    width: 0;
    flex: 1;
  }
 ::v-deep .el-pagination{
    padding:5px;
    box-shadow: 2px 3px 12px rgba(0,0,0,.5);
  }
</style>
