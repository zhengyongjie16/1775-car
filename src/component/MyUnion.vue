<template>
  <div class="bd">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      auto-reflow
    >
      <div class="unionBox">
        <div class="title">
          <div>联盟伙伴</div>
          <div class="more" @click="$router.push({path:'/UnionList'})">
            查看全部
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <ul>
          <li class="unionItem" v-for="item in unionList" :key="item.id"
              @click="$router.push({path:'/UnionDetail',query:{type:1, inviteId:item.companyId ,memberId:item.member,id:item.unionInfoId}})">
            <div class="img" v-if="item.company" :style="item.company.picPath?{background:`url(${item.company.picPath}) no-repeat center center`,backgroundSize:`cover`}:{background: `url(${url}) no-repeat center center`,backgroundSize:`cover`}">
            </div>
            <div>
              <div class="top clear" >
                <div class="fl">
                  <span class="name">{{item.company.companyName}}</span>
                  <span class="time">{{item.addTime | getTime}}结盟</span>
                </div>
                <md-icon name="arrow-right"></md-icon>
              </div>
              <div class="down">
                <span>车辆库存{{item.vehicleInfos.length ? item.vehicleInfos.length : 0 }}辆</span>
                <span>{{item.company.lxName}}</span> <span>{{item.company.lxPhone}}</span>
              </div>
            </div>
          </li>
          <li class="addBtn" @click="$router.push({name:'AddPartner'})">
            <div class="iconPlus">
              <div class="num" v-if="count>0">{{count}}</div>
            </div>
            <span>添加新盟友</span>
          </li>
        </ul>
        <div class="unionCar">
          <div class="ctitle" @click="$router.push({path:'/UnionCar'})">
            <div class="name">联盟车库</div>
            <div class="more">
              查看全部
              <md-icon name="arrow-right"></md-icon>
            </div>
          </div>
          <div class="list">
            <div class="lable" v-for="item in unionCar" :key="item.id" v-if="item.moveState==false" @click="$router.push({path:'/CarDetailed',query:{id:item.id,companyId:item.company.id}})">
              <div class="top">
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
            </div>
          </div>

        </div>
      </div>
    </md-scroll-view>
  </div>
</template>



<script>
  export default {
    name: 'MyUnion',
    data(){
      return{
        navTabs:[
          { value:1, name:'我的联盟' },
          { value:2, name: '我的车库' }
        ],
        url:'https://fakeimg.pl/100x100/',
        unionList:[],
        count: 0,
        unionCar: [],
      }
    },
    created(){
      this.getUnion();
      this.getUnionCar()
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
        // 获取我的伙伴
        async getUnion(){
            try{
              this.$toast.loading('1775加载中...')
              const res = await this.$api.post('/union/union/getUnion',{
                companyId: this.$store.state.company.id,
                page:1,
                limit:3
              })
              const { success, info, data, count } = res.data;
              this.$toast.hide()
              if(!success) return this.$toast.info(info,1000);
              this.count = count;
              return this.unionList = data;
            }catch (e) {
              this.$toast.info(e,1000)
            }finally{
              this.$toast.hide()
            }

        },
        async getUnionCar(){
          try{
            this.$toast.loading('1775加载中...');
            const res = await this.$api.get('/union/union/unionCar',{
              params:{
                companyId: this.$store.state.company.id,
                page: 1,
                limit: 5,
              }
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
        }
    },

  };
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .bd{
    height: 0;
    flex-grow: 1;
  }
  .tongji{
    width: vw(686);
    height: vw(236);
    background: #fff;
    border-radius: vw(8);
    margin:vw(24) auto vw(80);
    box-sizing: border-box;
    padding:vw(20) vw(20) vw(40);
    position: relative;
    .tongjiTitle{
      font-size: vw(32);
      font-weight: 600;
    }
    .tongjiRow{
      display: flex;
      position: absolute;
      left:0;
      width: 100%;
      bottom:vw(40);
      &>div{
        width: 0;
        flex-grow: 1;
        text-align: center;
        .num{
          font-size: vw(36);
          font-weight: 600;
          line-height: 1;
        }
        .name{
          font-size: vw(24);
          color:#666;
          line-height: 1;
          margin-top: vw(20);
        }
      }
    }
  }
  .unionBox{
    width: vw(686);
    margin:40px auto;

    .title{
      font-size: vw(32);
      font-weight: 600;
      margin-bottom: vw(40);
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .more{
        color: #999;
        font-size: 24px;
        font-weight: normal;
        i{
          margin-left: 8px;
          color: #999;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
    li.unionItem{
      height: vw(160);
      margin-bottom: vw(16);
      background: #fff;
      padding:vw(20);
      display: flex;
      box-sizing: border-box;
      .img{
        height: vw(120);
        width: vw(120);
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      &>div:last-child{
        width: 0;
        flex-grow: 1;
        padding-left: vw(20);
        padding-top: vw(8);
        .name{
          font-size: vw(30);
          font-weight: 600;
        }
        .time{
          font-size: vw(20);
          color:#999;
          margin-left: vw(20);
        }
        .addNum{
          color:#d52002;
          font-size: vw(20);
          display: flex;
          align-items: center;
          &:after{
            content: '>';
            color:#999;
            margin-left: vw(20);
          }
        }
        .down{
          display: flex;
          align-items: center;
          line-height: 1;
          margin-top: 40px;
          span{
            font-size: vw(20);
            color:#999;
            line-height: 1;
            height: vw(20);
            display: inline-block;
          }
          &>span:first-child{
            padding-right: vw(42);
          }
          &>span:last-child{
            padding-left: vw(20);
          }
        }
      }
      .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1;
        .fl{
          display: flex;
          align-items: flex-end;
          max-width: 95%;
          .name{
            display: block;
            max-width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        i{
          font-size: 20px;
          color: #999;
          font-weight: bold;
        }
      }
    }
  }
  .addBtn{
  height: vw(160);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
  .iconPlus{
    width: vw(56);
    height: vw(56);
    border: vw(3) solid rgba(0,0,0,0.1);
    border-radius: 50%;
    line-height: vw(56);
    font-size: vw(35);
    color: rgba(0,0,0,0.1);
    text-align: center;
    margin-right: vw(34);
    position: relative;
    .num{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FF4C4C;
      color: #fff;
      font-size: 24px;
      position: absolute;
      bottom: 36px;
      left: 36px;
      font-weight: normal;
    }
  }
  .iconPlus::before{
    content: '';
    width: 22px;
    height: 4px;
    border-radius: 2px;
    background: rgba(0,0,0,0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .iconPlus::after{
    content: '';
    width: 4px;
    height: 22px;
    border-radius: 2px;
    background: rgba(0,0,0,0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .unionCar{
    margin-top: 80px;
    .ctitle{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .name{
        font-size: 32px;
        color: #333;
        line-height: 1;
        font-weight: bold;
      }
      .more{
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #999;
        i{
          margin-left: 8px;
          font-size: 20px;
          color: #999;
          font-weight: bold;
          margin-top: 2px;
        }
      }
    }
  }
  .list{

    box-sizing: border-box;
    margin-top: 40px;
    padding-bottom: 40px;
  }
  .lable{
    background: #fff;
    border-radius: 16px;
    margin-bottom: 20px;
    .top{
      display: flex;
      padding: 20px;
      .pic{
        width: 274px;
        height: 182px;
        margin-right: 20px;
        background: #3a8ee6;
        background: url("../assets/logo.png") no-repeat center center;
        background-size: cover;
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
  }
</style>
