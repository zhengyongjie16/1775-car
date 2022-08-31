<template>
  <div class="main">
    <navTag :isShare="true" :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
        ref="scrollView"
      >
        <div class="slider carInfo">
          <md-swiper
            :is-prevent="false"
            :useNative-driver="false"
            @after-change="afterChange"
            ref="swiper"
          >
            <md-swiper-item :key="$index" v-for="(item, $index) in slider">
              <div
                :style="{background: `url(${item.path})  no-repeat  center center`,backgroundSize:'cover'}"
                class="banner-item">
              </div>
            </md-swiper-item>
          </md-swiper>
          <div class="label"><span>{{sliderNum}}</span> /{{slider.length}}</div>
        </div>
        <div class="info">
          <div class="price">
            ￥
            <span>{{$route.query.isTrade? `${carData.tradePrice}`: carData.onlinePrice}}</span>
            万
          </div>
          <div class="stages">
            首付¥{{carData.firPrice}}万 &nbsp;&nbsp; 月供¥{{carData.monPay}}万
          </div>
          <div class="title">
             {{carData.title}}
          </div>
          <div class="about">
            {{new Date(carData.brandDate).getFullYear()}}年上牌·{{carData.mileage}}万公里·{{ carData.brand.paifang }}
          </div>
          <div class="data">
            <div class="name">
              车辆信息
            </div>
            <div class="list">
              <div class="item">
                <div class="lable">
                  <p>汽车排量:<span>{{carData.brand.pl}}</span></p>
                </div>
                <div class="lable">
                  <p>变速箱:<span>{{carData.gearBox==1?'自动':'手动'}}</span></p>
                </div>
              </div>
              <div class="item">
                <div class="lable">
                  <p>过户次数:<span>{{carData.transferCount}}次</span></p>
                </div>
                <div class="lable">
                  <p>表显里程:<span>{{carData.mileage}}万公里</span></p>
                </div>
              </div>
              <div class="item">
                <div class="lable">
                  <p>在库状态:<span>{{carData.stockState|inState}}</span></p>
                </div>
                <div class="lable">
                  <p>车身颜色:<span>{{carData.carColor}}</span></p>
                </div>
              </div>
              <div class="item">
                <div class="lable">
                  <p>下次验车:<span></span></p>
                </div>
                <div class="lable">
                  <p>车源所在地:<span>{{carData.displayLocation}}</span></p>
                </div>
              </div>
              <div class="item">
                <div class="lable">
                  <p>车辆VIN码:<span>{{carData.vin}}</span></p>
                </div>
              </div>
              <div class="item">
                <div class="lable">
                  <p>首次上牌时间:<span>{{new Date(carData.brandDate)|moment('YYYY-MM-DD')}}</span></p>
                </div>
              </div>
<!--              <div class="item">-->
<!--                <div class="lable">-->
<!--                  <p>交强险到期:<span>{{}}</span></p>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
          <div class="pic">
            <div class="name">
              车辆信息
            </div>
            <div class="list">
              <div class="img" :key="$index" v-for="(item, $index) in carData.attachments"
                   :style="{background: `url(${item.path})  no-repeat  center center`,backgroundSize:'cover'}"
              ></div>

            </div>
          </div>
        </div>

      </md-scroll-view>
    </div>
    <div class="null"></div>
    <div class="fixbtn" v-if="$route.query.sCollect">
      <div class="collectBtn" @click="collectCar" v-if="isCollect==1">
        <div class="icon" :class="{col:isCollect}"></div>
        <div class="name"> 收藏 </div>
      </div>
      <div class="collectBtn" @click="cancelCollectCar" v-else>
        <div class="icon col"></div>
        <div class="name"> 取消收藏 </div>
      </div>
      <a style="color:#fff" :href="`tel:${carData.company.lxPhone}`">电话联系</a>
    </div>
    <div class="fixbtn" v-else><a style="color:#fff" :href="`tel:${carData.company.lxPhone}`">电话联系</a> </div>

  </div>
</template>

<script>

  export default {
    name: 'CarInfo',
    data() {
      return {
        title: '车辆详情',
          slider:[],
          simple: [{ color: '#666' }, { color: 'blue' }, { color: 'green' }, { color: '#999' }],
          sliderNum: 1,
          carData: {
              brand:{
                  pl:''
              }
          },
          companyData:{},
          isCollect: 1
      };
    },
      created(){
      this.getCarInfo();
      this.findCollectCar()
      },
      filters:{
          inState(value) {
              // 在库状态 1.在厅 2.在途 3.整备 4.在售
              switch (value) {
                  case 1: return '在厅'; break;
                  case 2: return '在途'; break;
                  case 3: return '整备'; break;
                  case 4: return '在售'; break;
                  case 5: return '预约'; break;
                  case 6: return '预定'; break;
                  case 7: return '已售'; break;
              }
          },
      },
    mounted() {
      window.triggerSwiper3 = () => {
        this.getIndex();
      };
    },
    methods: {
      async getCarInfo() {
        try{
          this.$toast.loading('1775正在加载中');
          const res = await  this.$api.get('/getVehicleInfoApp',{params:{ id: this.$route.query.id,t:Date.now() }});
          const { success, data } = res.data;
          this.$toast.hide();
          if (success) {
            this.carData = data;
            this.slider = [
              this.carData.attachments[0],
              this.carData.attachments[1],
              this.carData.attachments[2],
              this.carData.attachments[3],
            ]
            this.getCompanyInfo();
          } else {
            this.$toast.info('获取车辆信息失败');
          }
        }catch (e) {
          this.$toast.info(e,1000)
        }finally {
          this.$toast.hide()
        }


        },
      async getCompanyInfo() {
            let _res = await this.$api.post('/getCompanyInfo', {companyId: this.carData.companyId});
            this.companyData = _res.data.data;
        },
      getIndex() {
        console.log('000');
      },
      afterChange(from, to) {
        this.sliderNum = to + 1;
      },
      async findCollectCar(){
          //确认账号
          let account = null;
          if(this.$store.state.ac.account){
              account = this.$store.state.ac.account
          }else {
              account = this.$store.state.company.phone
          }
          const _res = await this.$api.post('/car/findCollectCar',{
               account,
              carId: this.$route.query.id,
          });
          const { success, info, data } = _res.data;
          if(data){
              if(data.isCollect =0){
                  this.isCollect = 1;
              }else {
                  this.isCollect = 0
              }
          } else {
            this.isCollect = 1
          }
      },
      async collectCar(){
          //确认账号
          let account = null;
          if(this.$store.state.ac.account){
              account = this.$store.state.ac.account
          }else {
              account = this.$store.state.company.phone
          }
          const _res = await this.$api.post('/car/myCollectCar',{
              account,
              carId: this.$route.query.id,
          })
          const { success, info, data } = _res.data;
          this.$toast.info(info,1000);
          if(success==true){
              this.isCollect = 0
          }
      },
      async cancelCollectCar(){
          //确认账号
          let account = null;
          if(this.$store.state.ac.account){
              account = this.$store.state.ac.account
          }else {
              account = this.$store.state.company.phone
          }
          const _res = await this.$api.post('/car/cancelCollectCar',{
              account,
              carId: this.$route.query.id,
          })
          const { success, info, data } = _res.data;
          this.$toast.info(info,1000);
          if(success==true){
              this.isCollect = 1
          }
      }
    },

  };
</script>

<style lang="scss" scoped>

  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content {
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .slider {
    height: vw(500);
    position: relative;

    .label {
      position: absolute;
      z-index: 1;
      bottom: vw(42);
      right: vw(30);
      color: #fff;
      font-size: vw(24);
      display: flex;
      align-items: flex-end;

      span {
        font-size: vw(36);
        color: #fff;
      }
    }
  }
  .banner-item {
    height: vw(500);
  }
  .info{
    padding: 0 vw(32);
    .title{
      margin-top: vw(30);
      font-size: vw(32);
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    .about{
      margin-top: vw(20);
      font-size: vw(24);
      color: #999;
    }
    .price{
      margin-top: vw(40);
      color: #D52002;
      font-size: 28px;
      line-height: 1;
      span{
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
    .stages{
      margin-top: 40px;
      font-size: 28px;
      color: #999;
      line-height: 1;
    }
    .data{
      .name{
        margin-top: vw(80);
        font-weight: bold;
        font-size: vw(32);
      }
      .item{
        display: flex;
        align-items: center;
        margin-top: vw(40);
        .lable{
          flex: 1;
          p{
            font-size: vw(28);
            color: #999;
            span{
              color: #333;
              margin-left: vw(20);
            }
          }
        }
      }
    }
    .pic{
      .name{
        margin-top: vw(80);
        font-weight: bold;
        font-size: vw(32);
      }
      .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: vw(20);
        padding-bottom: 20px;
        .img{
          width: vw(334);
          height: vw(222);
          margin-top: vw(20);
          background: #999;
          border-radius: vw(16);
        }
      }
    }

  }
  .null {
    height: vw(100);
  }
  .fixbtn {
    width: 100%;
    height: vw(100);
    background: #FF3434;
    position: fixed;
    bottom: vw(0);
    color: #fff;
    font-size: vw(32);
    text-align: center;
    line-height: vw(100);
    z-index: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .collectBtn{
      width: 188px;
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon{
        width: 44px;
        height: 44px;
        background: url("../../assets/showCollect.png") no-repeat center center;
        background-size: 44px 44px;
      }
      .icon.col{
        background: url("../../assets/cancelCollect.png") no-repeat center center;
        background-size: 44px 44px;
      }
      .name{
        color: #FF4C4C;
        font-size: 20px;
        margin-top: 4px;
        line-height: 1;
      }
    }
    a{
      display: block;
      width: 0;
      height: 100%;
      flex-grow: 1;
      text-align: center;
    }
  }
</style>
