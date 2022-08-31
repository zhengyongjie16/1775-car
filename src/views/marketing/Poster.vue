<template>
  <div class="main">
    <navTag :isSub="true" :subtitle="subtitle" :title="title" @click="goRaiders"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
        @end-reached="$_onEndReached"
        @refreshing="refresh"
      >
        <div class="list">
          <router-link v-for="item in posters" :key="item.id" :to="{path:'PosterInfo',query:{id:item.id}}">

          <div  class="item"
               :style="item.src?{background:`url(${item.src}) no-repeat center center`,backgroundSize: `cover`}:{background:`url(${src}) no-repeat center center`,backgroundSize: `cover`}"
               ></div>
          </router-link>

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
    import navTag from '../../component/navTag';
    import html2canvas from 'html2canvas';

    export default {

        name: 'Marketing',
        data() {
            return {
                title: '创意海报',
                subtitle: '使用攻略',
                posters: [],
                src:'https://fakeimg.pl/250x250/',
                page:1,  //默认请求第一页
                isFinished:false,
                total:0
            };
        },
        components: {
            navTag,
        },
        watch: {},
        created() {
            this.getAllPoster()
        },
        methods: {
            refresh(){
                this.page=1
                this.getAllPoster()
            },
            goRaiders() {
              this.$toast.info('暂未开通该功能，敬请期待', 1000);
            },
            //  获取海报列表
            async getAllPoster() {
                if(this.posters.length>= this.total && this.page >1){
                    this.$toast.info('暂时没有更多的海报了哦！', 1000)
                    this.isFinished = false;
                    this.$refs.scrollView.finishLoadMore()
                    return false
                }
                let res = await this.$api.post('/getAllPoster',{
                    page:this.page,
                    limit:12
                });
                const {success, data} = res.data;
                if (!success) return this.$toast.info('加载海报失败', 1000);
                this.total = data.count
                this.posters = this.posters.concat(data.rows);
                this.page++;
                this.isFinished = false;
                this.$refs.scrollView.finishLoadMore()
                console.log(data)
            },
            async $_onEndReached(){
              this.getAllPoster()
            }
        },
        deactivated() {
        const st = this.$refs.scrollView.getOffsets();
        sessionStorage.setItem('scrollTop', st.top);
      },
        activated() {
        const st = sessionStorage.getItem('scrollTop');
        const from = window.sessionStorage.getItem('from');
        if(from === 'Marketing') setTimeout(() => this.$refs.scrollView.scrollTo(0, 0), 100)
        if (parseFloat(st) > 0) setTimeout(() => this.$refs.scrollView.scrollTo(0, parseFloat(st)), 100);
        this.qwe=1
      },
        beforeRouteEnter(to, from, next){
          window.sessionStorage.setItem('from',from.name);
          next()
      },
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

    .list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 vw(32);

      .item {
        width: vw(210);
        height: vw(382);
        border-radius: vw(16);
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-right: vw(21);
        margin-top: vw(40);
      }

      a:nth-child(3n+3) .item {
        margin-right: 0;
      }
    }
  }

</style>
