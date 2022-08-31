<template>
    <div class="CarDetailed">
      <div class="MyCarLi">
        <div class="MyCarLiFon"> 车源详细: {{Data.title}}  <el-button style="float:right;margin-top: 10px;margin-right: 5px;" size="small" @click.native="$router.go(-1)">返回</el-button></div>

      </div>
      <div class="CarDetaBox">

        <!--车源详细信息-->
        <div class="CarData">
          <!--车辆图片-->
          <div class="CarDataLine">
            <div style="width:100%"  v-viewer="{movable: true}">
              <div style="font-size:16px;">车辆图片:</div>
              <div class="gallery">
                <div class="CarDataTu"
                     :style="{
                      marginRight: `5px`
                   }"
                     v-for="item of Data.attachments"
                     :key="item.id"

                >
                  <img :src="mobilePic(item.path)" alt="">
                </div>
              </div>

            </div>
          </div>
          <!--车辆码-->
          <div class="CarDataLine">
            <div style="width: 100%;">
              <span>车辆:</span>
              <p>{{Data.brand.brandName }}</p>
            </div>
          </div>
          <div class="CarDataLine">
            <div style="width: 100%;">
              <span>车辆VIN码:</span>
              <p>{{Data.vin}}</p>
            </div>
          </div>


          <!--排量 变速箱-->
          <div class="CarDataLine">
            <div>
              <span>排量:</span>
              <p>{{Data.displacement}}L</p>
            </div>
            <div>
              <span>变速箱:</span>
              <p>{{Data.gearBox|gearfiter}}</p>
            </div>
          </div>
          <!--首次上牌时间 表显里程-->
          <div class="CarDataLine">
            <div>
              <span>首次上牌时间:</span>
              <p>{{Data.brandDate|moment('YYYY-MM-DD') }}</p>
            </div>
            <div>
              <span>表显里程:</span>
              <p>{{Data.mileage}}万公里</p>
            </div>
          </div>
          <!--下次验车 交强险到期-->
          <div class="CarDataLine">
            <div>
              <span>下次验车:</span>
              <p>{{Data.nextCheckDate|moment('YYYY-MM-DD')}}</p>
            </div>
            <div>
              <span>交强险到期:</span>
              <p>{{Data.safeExpireDate|moment('YYYY-MM-DD')}}</p>
            </div>
          </div>
          <!--过户次数 内饰颜色-->
          <div class="CarDataLine">
            <div>
              <span>过户次数:</span>
              <p>{{Data.transferCount}}次</p>
            </div>
            <div>
              <span>内饰颜色:</span>
              <p>{{Data.insideColor | inColor}}</p>
            </div>
          </div>
          <!--用途 车源所在地-->
          <div class="CarDataLine">
            <div>
              <span>用途:</span>
              <p>{{Data.application|apption}}</p>
            </div>
            <div>
              <span>车源所在地:</span>
              <p>{{Data.displayLocation}}</p>
            </div>
          </div>
          <!--在库状态 车身颜色-->
          <div class="CarDataLine">
            <div>
              <span>在库状态:</span>
              <p>{{Data.stockState|inState}}</p>
            </div>
            <div>
              <span>车身颜色:</span>
              <p>{{Data.carColor}}</p>
            </div>
          </div>

        </div>
        <div class="Line"></div>
        <!--车源手续、车况、价格、采购信息-->
        <div class="CarData">
          <!--车源手续信息-->
          <div class="CarDataTitle">
            <span></span>
            车源手续信息
          </div>
              <!--登记证 购买发票-->
              <div class="CarDataLine">
                <div>
                  <span>登记证:</span>
                  <p>{{Data.registration|regtion}}</p>
                </div>
                <div>
                  <span>购买发票:</span>
                  <p>{{Data.carInvoice|carInvoice}}</p>
                </div>
              </div>
              <!--保养记录-->
              <div class="CarDataLine">
                <div>
                  <span>保养记录:</span>
                  <p>{{Data.keepRecord|keepfiter}}</p>
                </div>
              </div>

          <!--车源车况信息-->
          <div class="CarDataTitle">
            <span></span>
            车源车况信息
          </div>
              <!--外观成色 内饰状况-->
              <div class="CarDataLine">
                <div>
                  <span>外观成色:</span>
                  <p>{{Data.surfaceState|surfacefiter}}</p>
                </div>
                <div>
                  <span>内饰状况:</span>
                  <p>{{Data.insideState|insidefiter}}</p>
                </div>
              </div>
              <!--车辆状况-->
              <div class="CarDataLine">
                <div>
                  <span>车辆状况:</span>
                  <p>{{Data.carState|carStatefiter}}</p>
                </div>
              </div>

          <!--车源价格信息-->
          <div class="CarDataTitle">
            <span></span>
            车源价格信息
          </div>
              <!--采购价格 展厅价格-->
              <div class="CarDataLine" v-if="!isPf">
                <div>
                  <span>采购价格:</span>
                  <p>{{Data.procurePrice}}万</p>
                </div>
                <div>
                  <span>展厅价格:</span>
                  <p>{{Data.offlinePrice}}万</p>
                </div>
              </div>
              <!--销售底价 网络价格-->
              <div class="CarDataLine" v-if="!isPf">
                <div>
                  <span>销售底价:</span>
                  <p>{{Data.lowPrice}}万</p>
                </div>
                <div>
                  <span>网销价格:</span>
                  <p>{{Data.onlinePrice}}万</p>
                </div>
              </div >
              <!--批发价格-->
              <div class="CarDataLine">
                <div>
                  <span>批发价格:</span>
                  <p>{{Data.tradePrice}}万</p>
                </div>
              </div>

          <template v-if="!isPf">
            <!--车源采购信息-->
            <div class="CarDataTitle" >
              <span></span>
              车源采购信息
            </div>
            <!--采购员 采购日期-->
            <div class="CarDataLine">
              <div>
                <span>采购员:</span>
                <p>{{Data.purchaseMan}}</p>
              </div>
              <div>
                <span>采购日期:</span>
                <p>{{Data.purchaseDate|moment('YYYY-MM-DD')}}</p>
              </div>
            </div>
            <!--收购方式 车辆来源-->
            <div class="CarDataLine">
              <div>
                <span>收购方式:</span>
                <p>{{Data.payMode|payfiter}}</p>
              </div>
              <div>
                <span>车辆来源:</span>
                <p>{{Data.carSource-1}}</p>
              </div>
            </div>
            <!--车源收购地 钥匙数量-->
            <div class="CarDataLine">
              <div>
                <span>车源收购地:</span>
                <p>{{Data.purchaseCity}}</p>
              </div>
            </div>
            <div class="CarDataLine">
              <div>
                <span>钥匙数量:</span>
                <p>{{Data.keyNum}}</p>
              </div>
            </div>
          </template>

        </div>
        <div class="Line"></div>
        <!--车源网络同步-->
        <div class="carData" style="display: none">
          <div class="CarDataTitle">
            <span></span>
            车源网络同步
          </div>
          <div class="CarDataLine">
            <!--支持同步网站-->
            <div>
              <span>支持同步网站:</span>
              <p>{{DetaSynWeb}}</p>
            </div>
          </div>
          <div class="CarDataLine">
            <!--网销人员-->
            <div>
              <span>网销人员:</span>
              <p>{{Data.salesMan}}</p>
            </div>
          </div>
          <div class="CarDataLine">
            <!--商家附言-->
            <div>
              <span>商家附言:</span>
              <p>{{DetaBusEnclo}}</p>
            </div>
          </div>
        </div>
        <div class="Line"></div>
        <!--车源记录-->
        <div class="CarDataTitle" style="display: none">
          <span></span>
          车源记录
        </div>
          <div class="DataRecord" style="display: none">
            <div class="DateCarTab">
              <div class="DateOpeType">
                <p>操作类型</p>
              </div>
              <div class="DateOpeTime">
                <p>操作时间</p>
              </div>
              <div class="DateOpePeo">
                <p>操作人员</p>
              </div>
            </div>
            <div class="DateCarTab">
              <div class="DateOpeType">
                <p>操作类型</p>
              </div>
              <div class="DateOpeTime">
                <p>操作时间</p>
              </div>
              <div class="DateOpePeo">
                <p>操作人员</p>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CarDetailed',

  data() {
    return {
      isPf: false,
      carId: '',
      CarTableDataLi: '',
      DetaCarTu: {
        backgroundImage: '',
      }, // 车辆图片
      DrivingCarTu: {
        backgroundImage: '',
      }, // 行驶证图片

      Data: {},
      DetaSynWeb: '',
      DetaBusEnclo: '',

    };
  },
  methods: {
    async getCarInfo() {
      const res = await this.$api(`/getVehicleInfo?id=${this.carId}`);
      const { success, data } = res.data;
      if (success) {
        this.Data = data;
      }
    },
  },
  created() {
    this.carId = this.$route.query.id;
    this.isPf = this.$route.query.isPf == 1;
    if (!this.carId) return this.$message.warning('未能获取正确的车辆编号');
    this.getCarInfo();
  },
  filters: {
    gettime(value) {
      return new Date(value);
    },
    inColor(value) { // 内饰颜色
      switch (value) {
        case 1: return '深色'; break;
        case 2: return '浅色'; break;
      }
    },
    apption(value) { // 用途
      switch (value) {
        case 1: return '家用'; break;
        case 2: return '单位用车'; break;
      }
    },
    gearfiter(value) {
      switch (value) {
        case 1: return '自动'; break;
        case 2: return '手动'; break;
      }
    },

    inState(value) {
      // 在库状态 1.在厅 2.在途 3.整备 4.在售
      switch (value) {
        case 1: return '在厅'; break;
        case 2: return '在途'; break;
        case 3: return '整备'; break;
        case 4: return '在售'; break;
        case 5: return '预约'; break;
        case 6: return '约定'; break;
        case 7: return '已售'; break;
      }
    },
    // 登记证
    regtion(value) {
      switch (value) {
        case 1: return '齐全'; break;
        case 2: return '丢失'; break;
        case 3: return '补办中'; break;
      }
    },
    // 购车发票
    carInvoice(value) {
      switch (value) {
        case 1: return '齐全'; break;
        case 2: return '丢失'; break;
        case 3: return '补办中'; break;
      }
    },
    // 保养
    keepfiter(value) {
      switch (value) {
        case 1: return '4s店定期保养'; break;
        case 2: return '非4s店定期保养'; break;
        case 3: return '无保养'; break;
      }
    },
    // 外观成色
    surfacefiter(value) {
      switch (value) {
        case 1: return '极新'; break;
        case 2: return '较新'; break;
        case 3: return '一般'; break;
        case 4: return '较差'; break;
      }
    },
    // 内饰状况
    insidefiter(value) {
      switch (value) {
        case 1: return '完好'; break;
        case 2: return '有破损'; break;
      }
    },
    // 车辆状况
    carStatefiter(value) {
      switch (value) {
        case 1: return '无事故'; break;
        case 2: return '有轻微剐蹭'; break;
      }
    },
    // 收购方式
    payfiter(value) {
      switch (value) {
        case 1: return '全款'; break;
        case 2: return '贷款'; break;
      }
    },

  },

};
</script>

<style scoped lang="scss">
  .CarDetailed{
    width: 100%;
    background-color: #fff;
    height: 100%;
  }
  .CarDetaBox{
    margin: 0 auto;
    padding-top: 30px;
  }
  .MyCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .MyCarLiFon{
    width: 100%;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .CarData{
    margin: 0 auto;
    padding:10px
  }
  .CarDataLine{
    width: 100%;
    color: #666666;
    font-size: 12px;
    margin: 5px 0;
    display: flex;

  }
  .CarDataLine>div{
    width: 0;
    flex-grow: 1;
  }
  .CarDataLine>div:nth-child(1){
    float: left;
  }
  .CarDataLine>div:nth-child(2){
    float: right;
  }
  .CarDataLine>div>span{
    display: inline-block;
    width: 80px;
    height: 12px;
    text-align: right;
    float: left;
    margin-right: 10px;
  }
  .CarDataTu{
    width: 160px;
    height: 120px;
    background-color: gray;
    float: left;
    overflow: hidden;
    margin-bottom: 10px;
    &>img{
      width: 100%;
    }
  }
  .Line{
    height: 10px;
    width: 100%;
    background-color: #f4f6f9;
  }
  .CarDataTitle{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height:14px;
    line-height: 14px;
    font-size: 14px;
    color: #4A4A4A;
  }
  .CarDataTitle>span{
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: $ora;
    margin-right: 5px;
    position: relative;
    top: -2px;
  }

  .DateCarTab{
    width: 1140px;
    height: 41px;
    line-height: 41px;
    margin: 0 auto;
    border-top: 1px solid #eceef0;
    border-left: 1px solid #eceef0;
    color: #666666;
    font-size: 12px;
  }
  .DateCarTab>div{
    float: left;
    border-right: 1px solid #eceef0;
  }
  .DateOpeType{
    width: 281px;
  }
  .DateOpeTime{
    width: 395px;
  }
  .DateOpePeo{
    width: 460px;
  }
  .DataRecord{
    padding-bottom: 50px;
  }
  .DateCarTab>div>p{
    margin-left: 10px;
  }
  .DataRecord>div:nth-child(1){
    background-color: #FAF9F9;
  }
  .DataRecord>div:nth-last-child(1){
    border-bottom: 1px solid #eceef0;
  }
  .gallery{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

</style>
