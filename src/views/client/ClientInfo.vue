<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="content">
      <div class="info">
        <div class="state">
          <div class="people">
            <span>{{info.cusName}}</span> <i v-if="info.sex"> {{info.sex |
            sex}}|</i> <i v-if="info.age"> {{info.age}}岁|</i> <i v-if="info.address">{{info.address}}|</i> {{info.job}}
            <router-link :to="{path:'/UpdateClient',query:{id:info.id,companyId:info.companyId}}"
                         class="edit"
                         tag="div"></router-link>
          </div>

        </div>
        <div class="sell">
          <div class="tel">
            手机号码:{{info.phoneNum}}
          </div>
          <div class="name" v-if="info.subAccount">
            销售：{{info.subAccount.lxName}}
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">
          购车意向
          <div class="tag">
            {{info.followState | followState}}
          </div>
        </div>
        <div v-if="info.followState!=3">
          <div class="componment" v-if="info.vehicleInfo">
            <Carlist :data="info.vehicleInfo" class="item"></Carlist>
          </div>
          <div class="componment" v-else-if="info.series">
            意向品牌:{{info.brandName}}
          </div>
          <div class="componment" v-else>
            暂无意向车型，请尽快联系跟进
          </div>
        </div>
        <div v-else>
          <div class="componment" v-if="info.vehicleInfo">
            <Carlist :data="info.vehicleInfo" class="item"></Carlist>
          </div>
          <div class="componment" v-else-if="info.series">
            成交品牌:{{info.brandName}}
          </div>
        </div>
      </div>
      <div class="plan">
        <!--          <div class="date">预计购买日期：{{info.visitTime}}</div>-->
        <div class="budget" v-if="info.followState!=3">预算：{{info.minBudget}}-{{info.maxBudget}}万</div>
        <div class="budget" v-else>成交价格: {{info.dealPrice}} 万</div>
      </div>
      <div :class="{moreRecord:showmore}" class="record">

        <div class="title">跟进记录 <span :class="{active:showmore}" @click="showmore=!showmore"></span>
        </div>
        <md-scroll-view
          :scrolling-x="false"
          :scrolling-y="true"
          auto-reflow
          ref="scrollView1"
        >
          <div class="show">
            <div class="items" v-for="(item,key) in info.clients">
              <div class="top">
                <div class="txt">
                  第{{info.clients.length-key}}次到店|{{item.followTime | followTime}}
                </div>
                <!-- 状态分为结束和搁置 -->
                <div class="tag">{{item.followState | followState}}</div>
              </div>
              <div class="marks">
                {{item.followNote}}
              </div>
            </div>
          </div>
        </md-scroll-view>
      </div>
    </div>
    <div class="link">
      <div class="item">
        <a :href="`tel:${info.phoneNum}`">
          <span class="phone"></span>
          <div class="name">电话</div>
        </a>
      </div>
      <div class="item">
        <span class="wechat"></span>
        <div class="name">微信</div>
      </div>
      <div class="item">
        <span class="infomation"></span>
        <div class="name">短信</div>
      </div>
      <router-link
        :to="{path:'/ClientFollow',query:{companyId:info.companyId,id:info.id,sellMan:info.sellMan,carId:info.carId,vehicleName:info.vehicleInfo.title}}"
        v-if="info.carId">
        <div class="follow">
          跟进
        </div>
      </router-link>
      <router-link
        :to="{path:'/ClientFollow',query:{companyId:info.companyId,id:info.id,sellMan:info.sellMan}}"
        v-else>
        <div class="follow">
          跟进
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
    import Carlist from '../../component/Carlist';

    export default {
        name: 'ClientInfo',
        data() {
            return {
                title: '客户详情',
                info: {
                    subAccount: {
                        lxName: ''
                    },
                    vehicleInfo: {
                        cover: ''
                    }
                },
                showmore: false,
            }
        },
        components: {
            Carlist
        },
        created() {
            this.getClientInfo()
        },
        filters: {
            sex: value => {
                if (value === 0) return '男';
                if (value == 1) return '女';
            },
            followState: value => {
                if (value === 0) return '跟进中';
                if (value == 1) return '搁置';
                if (value == 2) return '预定';
                if (value == 3) return '成交';
            },
            followTime: value => {
                if (!value) return '正在跟进';
                let time = new Date(value);
                let year = time.getFullYear();
                let mouth = time.getMonth() + 1;
                let day = time.getDate();
                return `${year}-${mouth}-${day}`
            },
            followState: value => {
                // 跟进状态，0跟进中，1搁置，2预定，3成交
                if (value == 0) return '跟进中';
                if (value == 1) return '搁置';
                if (value == 2) return '预定';
                if (value == 3) return '成交';
            }
        },
        methods: {
            async getClientInfo() {
                let res = await this.$api.get('/bus/client/getClientInfo', {
                    params: {
                        id: this.$route.query.id,
                        companyId: this.$route.query.companyId,
                    }
                });
                console.log(res);
                let {success, data} = res.data;
                if (!success) return this.$toast.info('资料加载失败');
                this.getMaxSort(data.clients);
                this.info = data;
                console.log('2333', this.info)
            },
            // 时间大到小排序
            getMaxSort: function (arr) {
                let max;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = i; j < arr.length; j++) {
                        if (arr[i].followTime < arr[j].followTime) {
                            max = arr[j];
                            arr[j] = arr[i];
                            arr[i] = max
                        }
                    }
                }
                return arr
            }
        }

    };
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #f7f7f7;
  }

  .componment {
    font-size: 28px;
    color: #333;
  }

  .content {
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 0 vw(32);
  }

  .state {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: vw(40);

    .people {
      font-size: vw(28);
      color: #999;
      max-width: 100%;
      display: flex;
      align-items: flex-end;

      span {
        font-size: vw(40);
        color: #333;
        font-weight: bold;
        margin-right: vw(20);
      }

      .edit {
        width: 36px;
        height: 36px;
        background: url('../../assets/edit.png') no-repeat center center;
        background-size: 36px 36px;
        margin-left: 20px;
        margin-bottom: 5px;
      }
    }

    .tag {
      color: #D52002;
      font-size: vw(28);
      margin-top: vw(15);
    }
  }

  .sell {
    margin-top: vw(52);
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: vw(28);

    .tel, .name {
      color: #999;
    }
  }

  .list {
    padding: 0 vw(32);
    margin-top: vw(80);

    .title {
      font-size: vw(32);
      color: #333;
      line-height: 1;
      margin-bottom: vw(40);
      font-weight: bold;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .tag {
        font-size: 28px;
        color: #D52002;
        font-weight: normal;
      }
    }

    .item {
      padding: 0;
      background: #f7f7f7;
    }
  }

  .plan {
    margin-top: vw(4);
    padding: 0 vw(32);

    .date, .budget {
      font-size: vw(28);
      color: #666;
      margin-top: vw(36);
      line-height: 1;
    }
  }

  .record {
    padding: 24px vw(32) 0;
    box-sizing: border-box;
    background: #fff;
    border-radius: 40px 40px 0 0;
    height: 84px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    transition: 0.5s;

    .title {
      font-size: vw(32);
      color: #333333;
      font-weight: bold;
      line-height: 1;
      position: relative;
      margin-bottom: 28px;

      span {
        position: absolute;
        width: 21px;
        height: 24px;
        background: url("../../assets/up_icon.png") no-repeat center center;
        background-size: 21px 24px;
        left: 50%;
        margin-left: -10px;
        top: 50%;
        margin-top: -12px;
        transform: rotate(0deg);
      }

      span.active {
        transform: rotate(180deg);
      }
    }

    .show {
      margin-top: vw(36);

      .items {
        position: relative;
        min-height: vw(182);
        box-sizing: border-box;
        padding: 0 vw(32) 0 vw(40);

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 1;
          font-size: vw(24);

          .txt {
            color: #999;
            display: flex;
            align-items: center;

            i {
              color: #FF3434;
              margin-left: vw(10);

            }
          }

          .tag {
            color: #D52002;
          }
        }

        .marks {
          font-size: vw(28);
          color: #333;
          margin-top: vw(40);

        }
      }

      .items::before {
        content: '';
        width: vw(20);
        height: vw(20);
        border-radius: 50%;
        background: #999;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .items::after {
        content: '';
        width: 0;
        height: 100%;
        border-left: 1px dashed #999;
        position: absolute;
        top: 0;
        left: vw(10);
      }

      .items:first-child::before {
        background: #FF3434;
      }

      .items:last-child::after {
        content: '';
        width: 0;
        height: 100%;
        border-left: 1px dashed #999;
        position: absolute;
        top: 0;
        left: vw(10);
        opacity: 0;
      }
    }
  }

  .moreRecord {
    height: 900px;
    transition: 0.5s;
  }

  .link {
    height: vw(96);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 9;

    .item {
      width: 0;
      flex-grow: 1;
      height: 100%;
      text-align: center;

      span {
        display: block;
        width: vw(44);
        height: vw(44);
        margin: vw(12) auto 0;
      }

      span.phone {
        background: url("../../assets/phone.png") no-repeat center center;
        background-size: vw(44) vw(44);
      }

      span.wechat {
        background: url("../../assets/wechat.png") no-repeat center center;
        background-size: vw(44) vw(44);
      }

      a {
        display: block;
        height: 100%;
      }

      span.infomation {
        background: url("../../assets/information.png") no-repeat center center;
        background-size: vw(44) vw(44);
      }

      .name {
        margin-top: 2px;
        color: #FF3434;
        line-height: 1;
        font-size: vw(20);
      }
    }

    .follow {
      width: vw(240);
      height: vw(98);
      background: #FF3434;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: vw(32);
    }
  }
</style>
