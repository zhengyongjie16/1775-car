<template>
  <div class="main">
    <navTag :title="title" :isSub="true" :isShare="true"  :subtitle="subtitle" :marginRight="marginRight"  class="poster" @click="goRaiders"></navTag>

    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="list">
          <div class="item"
               style="background: url('https://fakeimg.pl/290x520/') no-repeat center center;background-size: 100% 100%"></div>
        </div>
      </md-scroll-view>
    </div>
    <div class="merge">
      <md-scroll-view
        :scrolling-x="true"
        :scrolling-y="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="mergeItem">
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
       <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
       <div class="item"
             style="background: url('https://fakeimg.pl/67x120/') no-repeat center center;background-size: 100% 100%"></div>
        </div>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
  import navTag from '../../component/navTag';

  export default {

    name: 'PosterMerge',
    data() {
      return {
        title: '海报详情',
          subtitle:'保存',
          marginRight:'4vw'
      };
    },
    components: {
      navTag,
    },
    watch: {},
    created(){

    },
    methods: {
      goRaiders(){
        alert('暂未开通该功能，敬请期待')
      }
    }
  };
</script>
<style lang="scss" scoped>
  .main{
    background: #000;
  }
  .poster{
    background: #000;
  }

  /* 主要内容 */
  .content {
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    .list{
      display: flex;
      flex-wrap: wrap;
      padding: 0 vw(32);
      .item{
        width: vw(580);
        height: vw(1040);
        margin: vw(40) auto 0;
      }
    }
  }
  .merge{
    padding: vw(40) 0 vw(16) 0;
    .mergeItem{
      display: flex;
      align-items: center;
      .item{
        width: vw(134);
        height: vw(240);
        margin-right: vw(16);
      }
      .item:first-child{
        margin-left: vw(32);
      }
    }

  }

</style>
