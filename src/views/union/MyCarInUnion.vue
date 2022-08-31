<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="bd">
      <div class="search">
        <input placeholder="搜索" type="text">
      </div>
      <div class="options">
        <div class="selected  down">入库时间</div>
        <div class="up">价格</div>
        <div class="down">品牌</div>
        <div class="up">车龄</div>
      </div>
      <div class="carList">
        <md-scroll-view
          auto-reflow
          ref="scrollView"
        >
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
          <carDetailCard></carDetailCard>
        </md-scroll-view>

      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: 'MyCarInUnion',
        data() {
            return {
                title: '我的车库',
                navTabs: [
                    {value: 1, name: '我的联盟'},
                    {value: 2, name: '我的车库'}
                ]
            }
        },
        methods: {
            handleNavChange(res) {
                console.log(res)
            }
        }
    };
</script>

<style lang="scss" scoped>
  .bd {
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .carList {
      height: 0;
      flex-grow: 1;
    }
  }

  .search {
    width: vw(686);
    height: vw(64);
    border: 1px solid rgba(0, 0, 0, 0.1);;
    border-radius: vw(32);
    margin: vw(20) auto;
    box-sizing: border-box;
    overflow: hidden;

    input {
      text-align: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      outline: none;
      border: none;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #999;
      /* placeholder字体大小  */
      font-size: vw(24);
    }

  }

  .options {
    display: flex;
    width: vw(686);
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    font-size: vw(28);
    height: vw(80);

    & > div {
      color: #999;
      position: relative;
    }

    .selected {
      color: #D52002;

      &.up:after, &.down:after {
        background: #d52002;
      }
    }

    .up:after {
      content: '';
      display: inline-block;
      width: vw(20);
      height: vw(13);
      clip-path: polygon(50% 0, 0 100%, 100% 100%);
      position: relative;
      right: vw(-15);
      top: 50%;
      transform: translateY(-50%);
      background: #999;
    }

    .down:after {
      content: '';
      display: inline-block;
      width: vw(20);
      height: vw(13);
      clip-path: polygon(0 0, 50% 100%, 100% 0);
      position: relative;
      right: vw(-15);
      top: 50%;
      transform: translateY(-50%);
      background: #999;
    }

  }

</style>
