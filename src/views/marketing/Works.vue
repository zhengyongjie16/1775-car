<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        @end-reached="$_onEndReached"
        @refreshing="refresh"
        ref="scrollView"
      >
<!--        <router-link v-for="item in newsList" :key="item.id" :to="{path:'',query:{id:item.id}}">-->
        <!-- 两张图或者无图 -->
        <div class="list" v-for="item in newsList" :key="item.id" @click="$router.push({path:'/WorksDetail', query:{id:item.id}})">
          <div class="title">{{item.title}}</div>
          <!-- 含有三张图class为imgs,两张图class添加ilist类 -->
          <div class="imgs">
            <div class="img" v-for="(pic,keys) in item.pic" :key="keys"
                 :style="pic? {background: `url(${pic}) no-repeat center center`,backgroundSize: `cover`}:{background: `url(${img}) no-repeat center center`}"></div>

          </div>
          <p>{{item.share}}分享 <i></i>{{item.pageviews}}查看 </p>
        </div>
        <!-- 1张图使用 -->
<!--        <div class="list items" v-if="item.pic&&item.pic.length==1">-->
<!--          <div class="pic"-->
<!--               :style="item.pic?{background: `url(${item.pic}) no-repeat center center`,backgroundSize: `cover`}:{background: `url(${img}) no-repeat center center`,backgroundSize: `cover`}"></div>-->
<!--          <div class="data">-->
<!--            <p>{{item.title}}</p>-->
<!--            <span>{{item.share}}分享 <i></i>{{item.pageviews}}查看</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        </router-link>-->
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
    import navTag from '../../component/navTag';

    export default {

        name: 'Marketing',
        data() {
            return {
                title: '爆款文章',
                img:'https://fakeimg.pl/250x250/',
                newsList: [],
                page:1,  //默认请求第一页
                isFinished:false
            };
        },
        components: {
            navTag,
        },
        watch: {},
        created() {
           this.getNewsAll()
        },
        methods: {
            // 下拉刷新
            refresh(){
                this.page=1
                this.getNewsAll()
            },
            // 获取新闻列表
            async getNewsAll() {
                let res = await this.$api.get('/market/getNews',{
                    params:{
                        page:1
                    }
                });
                const {success, data} = res.data;
                if (!success) return alert('加载文章失败');
                this.newsList = data;
            },
            //  上拉加载
            async $_onEndReached(){
                if (this.isFinished){
                    return
                }
                this.page++
                this.isFinished = true
                let res = await this.$api.get('/new/getNewsAll',{
                    params:{
                        page:this.page
                    }
                });
                const {success, data} = res.data;
                if (!success) return alert('加载失败');
                this.isFinished = false;
                this.newsList= this.newsList.concat(data);
                this.$refs.scrollView.finishLoadMore()
            }
        }
    };
</script>
<style lang="scss" scoped>
  .main {
    background: #f7f7f7;
  }

  /* 主要内容 */
  .content {
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    padding: 0 vw(32);

    .list {
      box-sizing: border-box;
      padding: vw(20);
      background: #fff;
      border-radius: vw(16);
      margin-bottom: vw(16);

      .title {
        font-size: vw(32);
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: vw(54);
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .imgs {
        margin-top: vw(28);
        display: flex;
        align-items: center;

        .img {
          width: vw(200);
          height: vw(133);
          margin-right: vw(16);
        }

        .img:nth-child(3n+3) {
          margin-right: 0;
        }
      }

      .ilist {
        .img {
          width: vw(240);
          height: vw(159);
        }
      }

      p {
        margin-top: vw(22);
        font-size: vw(28);
        color: rgba(153, 153, 153, 1);
        line-height: vw(28);
        display: flex;
        align-items: center;

        i {
          display: block;
          width: vw(40);
          height: vw(28);
        }
      }
    }

    .list:first-child {
      margin-top: vw(40);
    }

    .items {
      display: flex;

      .pic {
        width: vw(240);
        height: vw(158);
      }

      .data {
        width: 0;
        flex-grow: 1;
        box-sizing: border-box;
        height: vw(158);
        position: relative;

        p {
          display: block !important;
          margin-top: vw(-10);
          color: rgba(51, 51, 51, 1);
          line-height: vw(54);
          font-size: vw(32);
          font-weight: bold;
          padding-left: vw(20);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }

        span {
          position: absolute;
          bottom: 0;
          left: vw(20);
          font-size: vw(28);
          color: rgba(153, 153, 153, 1);
          line-height: vw(28);
          display: flex;
          align-items: center;

          i {
            display: block;
            width: vw(40);
            height: vw(28);
          }
        }
      }
    }
  }

</style>
