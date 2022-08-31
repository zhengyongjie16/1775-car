<template>
  <div class="main">
    <navTag :isShare="false" title="联盟成员"></navTag>
    <div class="bd">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        auto-reflow
        @end-reached="onEndReached"
        @refreshing="refresh"
        ref="scrollView"
      >
        <div class="unionBox">
          <ul>
            <li :key="item.id" class="unionItem" v-for="item in unionList"
                @click="$router.push({path:'/UnionDetail',query:{type:1, inviteId:item.companyId ,memberId:item.member,id:item.unionInfoId}})">
              <div :style="item.company.picPath?{background:`url(${item.company.picPath}) no-repeat center center`,backgroundSize:`cover`}:{background: `url(${url}) no-repeat center center`,backgroundSize:`cover`}" class="img" v-if="item.company">
              </div>
              <div>
                <div class="top clear">
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
          </ul>
        </div>
        <md-scroll-view-more
          slot="more"
          :is-finished="isFinished"
        >
        </md-scroll-view-more>
      </md-scroll-view>
    </div>
  </div>
</template>


<script>
    export default {
        name: 'UnionList',
        data() {
            return {
                url: 'https://fakeimg.pl/100x100/',
                unionList: [],
                isFinished: false,
                page:1
            }
        },
        created() {
            this.getUnion();
        },
        filters: {
            getTime: value => {
                const time = new Date(value);
                const year = time.getFullYear();
                const mouth = time.getMonth() + 1;
                return `${year}-${mouth}`
            }
        },
        methods: {
            // 获取我的伙伴
            async getUnion() {
              try{
                this.$toast.loading('1775加载中...')
                const res = await this.$api.post('/union/union/getUnion', {
                  companyId: this.$store.state.company.id,
                  page: 1,
                  limit: 20
                });
                const {success, info, data} = res.data;
                this.$toast.hide();
                if (!success) return this.$toast.info(info, 1000);
                return this.unionList = data;
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            // 下拉刷新
            refresh(){
                this.getUnion();
                this.page=1;
            },
            // 上拉加载
            async onEndReached(){
                if(this.isFinished) return;
                this.isFinished = true;
                this.page++;
                const res = await this.$api.post('/union/union/getUnion', {
                    companyId: this.$store.state.company.id,
                    page: this.page,
                    limit: 20,
                });
                const {success, info, data} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                return this.unionList = this.unionList.concat(data);
            }
        },
        beforeRouteLeave(to,form,next){
            const myCarTop = this.$refs.scrollView.getOffsets().top;
            const myCarPage = this.page;
            const myCarList = this.carList;
            const from = to.name
            const _obj = {
                top: myCarTop,
                page: myCarPage,
                list: myCarList,
                from: from
            }
            // 如果是跳转汽车详情页，则存储当前页数、list和滚动高度
            if(from == 'UnionDetail'){
                this.$store.commit('updateSlider', _obj);
            }else {
                this.$store.commit('updateSlider', null);
            }
            next()
        },
        updated() {
            // 如果是从汽车详情返回，则设置滚动条滚动位置
            if(this.$store.state.slider.from = 'UnionDetail'){
                this.$nextTick(function(){
                    let slider = this.$store.state.slider; //返回页面取出来
                    console.log(slider.top)
                    this.$refs.scrollView.reflowScroller();
                    setTimeout(()=>{this.$refs.scrollView.scrollTo(0,slider.top,false);},100);
                    this.page = slider.page;
                    this.carList = slider.list;
                    // 销毁，防止下拉刷新重置页数
                    this.$store.commit('updateSlider', null);
                })
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

  .bd {
    height: 0;
    flex-grow: 1;
  }

  .tongji {
    width: vw(686);
    height: vw(236);
    background: #fff;
    border-radius: vw(8);
    margin: vw(24) auto vw(80);
    box-sizing: border-box;
    padding: vw(20) vw(20) vw(40);
    position: relative;

    .tongjiTitle {
      font-size: vw(32);
      font-weight: 600;
    }

    .tongjiRow {
      display: flex;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: vw(40);

      & > div {
        width: 0;
        flex-grow: 1;
        text-align: center;

        .num {
          font-size: vw(36);
          font-weight: 600;
          line-height: 1;
        }

        .name {
          font-size: vw(24);
          color: #666;
          line-height: 1;
          margin-top: vw(20);
        }
      }
    }
  }

  .unionBox {
    width: vw(686);
    margin: 35px auto;

    .title {
      font-size: vw(32);
      font-weight: 600;
      margin-bottom: vw(40);
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .more {
        color: #999;
        font-size: 24px;
        font-weight: normal;

        i {
          margin-left: 8px;
          color: #999;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }

    li.unionItem {
      height: vw(160);
      margin-bottom: vw(16);
      background: #fff;
      padding: vw(20);
      display: flex;
      box-sizing: border-box;

      .img {
        height: vw(120);
        width: vw(120);
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      & > div:last-child {
        width: 0;
        flex-grow: 1;
        padding-left: vw(20);
        padding-top: vw(8);

        .name {
          font-size: vw(30);
          font-weight: 600;
        }

        .time {
          font-size: vw(20);
          color: #999;
          margin-left: vw(20);
        }

        .addNum {
          color: #d52002;
          font-size: vw(20);
          display: flex;
          align-items: center;

          &:after {
            content: '>';
            color: #999;
            margin-left: vw(20);
          }
        }

        .down {
          display: flex;
          align-items: center;
          line-height: 1;
          margin-top: 40px;

          span {
            font-size: vw(20);
            color: #999;
            line-height: 1;
            height: vw(20);
            display: inline-block;
          }

          & > span:first-child {
            padding-right: vw(42);
          }

          & > span:last-child {
            padding-left: vw(20);
          }
        }
      }

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1;

        .fl {
          display: flex;
          align-items: flex-end;
          max-width: 95%;

          .name {
            display: block;
            max-width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        i {
          font-size: 20px;
          color: #999;
          font-weight: bold;
        }
      }
    }
  }
  .unionBox:last-child{
    margin-bottom: 30px;
  }

</style>
