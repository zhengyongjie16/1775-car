<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="shop">
          <div class="img"
               style="background: url('https://fakeimg.pl/250x250/') no-repeat center center;background-size: cover">

          </div>
          <div class="data">
            <div class="name">
              <p>车行名字</p>
              <span></span>
            </div>
            <p class="stock">库存<span>255辆</span> <i>|</i> 成交车辆<span>255辆</span></p>
            <p class="caption">
              真实车源 电话直通
            </p>
          </div>
        </div>
        <div class="newCar">
          <div class="title">
            <p>新车入库</p>
            <router-link :to="{path:'/Garage'}">
            <i>
              查看更多
              <md-icon name="arrow-right" size="12"></md-icon>
            </i>
            </router-link>
          </div>
          <div class="list">
            <router-link to="CarInfo">
            <div :key="key" class="item" v-for="(item,key) in list">
              <div class="img"
                   style="background: url('https://fakeimg.pl/250x250/') no-repeat center center;background-size: cover">
              </div>
              <div class="data">
                <div class="name">车名</div>
                <p class="time">2013年上牌·1.6万公里·国 V</p>
                <p class="price">
                  ￥<span>155</span>万
                </p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
        <div class="show">
          <div class="title">风采展示</div>
          <md-scroll-view
            :scrolling-x="true"
            :scrolling-y="false"
            auto-reflow
            ref="scrollView"
          >
            <div class="slist">
              <div :key="key" class="pic" style="background: url('https://fakeimg.pl/250x250/') no-repeat center center;background-size: cover"
                   v-for="(item,key) in slist"></div>
            </div>
          </md-scroll-view>

        </div>
        <div class="basic">
          <div class="title">基本信息</div>
          <div class="info">
            <p class="sale">
              拥有销售: 555人 <i></i>电话： <span>15588888888</span>
            </p>
            <p class="address">
              详细地址：详细地址
            </p>
          </div>
        </div>
        <div class="button">
          <p>于2019.10.23结盟</p>
          <!-- alAct true为已结盟，value为已结盟,否则为邀请结盟 -->
          <input :class="{active:alAct}" class="btn" type="button" value="邀请结盟">
        </div>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
  import navTag from '../../component/navTag';
  import { ScrollView, ScrollViewMore } from 'mand-mobile';

  export default {

    name: 'CarHome',
    data() {
      return {
        title: '车行主页',
        isSub: false,
        list: ['1', '1'],
        slist: ['1', '1', '1', '1', '1'],
        alAct: false
      };
    },
    components: {
      navTag,
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
    },
    watch: {},
    created() {

    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .main, input, textarea {
    background: #f7f7f7;
  }

  /* 主要内容 */
  .content {
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .shop {
    display: flex;
    align-items: flex-start;
    padding: 0 vw(32);
    padding-top: vw(40);

    .img {
      width: vw(160);
      height: vw(160);
      border-radius: 50%;
      overflow: hidden;
    }

    .data {
      width: 0;
      flex-grow: 1;
      height: vw(160);
      position: relative;

      .name {
        padding-left: vw(40);
        display: flex;
        align-items: center;

        p {
          font-size: vw(40);
          color: #333333;
          font-weight: bold;
          margin-right: vw(16);
          max-width: 80%;
        }

        span {
          display: block;
          width: vw(118);
          height: vw(40);
          background: url("../../assets/lable_no.png") no-repeat center center;
          background-size: vw(118) vw(40);
          margin-top: vw(5);
        }

        span.active {
          background: url("../../assets/lable.png") no-repeat center center;
          background-size: vw(118) vw(40);
        }
      }

      .stock {
        display: flex;
        align-items: center;
        margin-top: vw(16);
        font-size: vw(24);
        font-weight: 400;
        color: rgb(153, 153, 153);
        line-height: 1;
        padding-left: vw(40);

        i {
          margin: 0 vw(18);
          font-size: vw(10);
        }

        span {
          margin-left: vw(10);
        }
      }

      .caption {
        position: absolute;
        padding-left: vw(40);
        bottom: 0;
        font-size: vw(24);
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 1;
      }
    }
  }

  .newCar {
    padding: 0 vw(32);

    .list {
      .item {
        display: flex;
        background: #fff;
        border-radius: vw(16);
        margin-bottom: vw(16);
        padding: vw(20);

        .img {
          width: vw(218);
          height: vw(174);
          border-radius: vw(2);
          margin-right: vw(20);
        }

        .data {
          width: 0;
          flex-grow: 1;
          height: vw(174);
          position: relative;

          .name {
            font-size: vw(28);
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: vw(42);
            padding-right: vw(40);
          }

          .time {
            margin-top: vw(14);
            font-size: vw(24);
            color: rgba(153, 153, 153, 1);
            line-height: 1
          }

          .price {
            position: absolute;
            bottom: 0;
            font-size: vw(24);
            color: #D52002;
            font-weight: bold;

            span {
              font-size: vw(40);
            }
          }
        }
      }

      .item:last-child {
        margin-bottom: 0;
      }
    }
  }

  .title {
    padding: 0 vw(32);
    font-size: vw(32);
    font-weight: 600;
    color: rgb(51, 51, 51);
    display: flex;
    justify-content: space-between;
    margin-top: vw(80);
    margin-bottom: vw(40);

    i {
      display: flex;
      align-items: center;
      font-size: vw(24);
      color: rgba(153, 153, 153, 1);
      line-height: 1;
      justify-content: center;

      i {
        padding-right: vw(20);
      }
    }
  }

  .show {
    .slist {
      padding-left: vw(32);
      height: vw(160);
      display: flex;
    }

    div.pic {
      width: vw(240);
      height: vw(160);
      border-radius: vw(8);
      overflow: hidden;
      margin-right: vw(16);
      display: inline-block;
    }
  }

  .basic {
    margin-top: vw(4);

    .info {
      padding: 0 vw(32);
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
      font-size: vw(28);

      p {
        margin-bottom: vw(20);

        i {
          display: inline-block;
          width: vw(40);
        }

        span {
          color: #D52002;
        }
      }
    }
  }

  .button {
    padding: vw(120) 0 vw(40);
    text-align: center;

    p {
      color: rgba(153, 153, 153, 1);
      line-height: 1;
      font-size: vw(24);
      margin-bottom: vw(20);
    }

    .btn {
      width: vw(512);
      height: vw(80);
      background: rgba(255, 52, 52, 1);
      border-radius: vw(16);
      border: none;
      margin: 0 auto;
      color: #fff;
      font-size: vw(32);
    }

    .active {
      background: #fff;
      border: 1px solid rgba(255, 52, 52, 1);
      color: rgba(255, 52, 52, 1);
    }
  }
</style>
