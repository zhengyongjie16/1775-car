<template>
    <div class="main">
      <navTag :title="title"></navTag>
      <div class="content">
        <div class="search">
          <div class="state">
             已上架
             <!-- <i></i> -->
          </div>
          <div class="input" >
            <p :class="{fous:searchTxt.length>0}"> <md-icon name="search" size="xs"></md-icon>搜索</p>
            <input :class="{fous:searchTxt.length>0}"  type="text" placeholder=""  v-model="searchTxt">
          </div>
        </div>
        <div class="list">
          <md-scroll-view
            :scrolling-x="false"
            :scrolling-y="true"
            auto-reflow
            ref="scrollView"
          >
            <Carlist></Carlist>
          </md-scroll-view>
        </div>
      </div>
      <div class="foot">
        <p>共42辆</p>
        <!-- 分享量为分享车辆数量 -->
        <div class="btn">
          <button>选车分享</button>
          <button>分享此列表</button>
        </div>
      </div>
    </div>
</template>

<script>
  import Carlist from '../../component/Carlist';
  export default {
    name: 'carManager',
    data(){
      return{
        title:'车辆管理',
        isFous:true,
        searchTxt:''
      }
    },
   components:{
      Carlist
    }

  };
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .content{
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .search{
    display: flex;
    align-items: center;
    padding: vw(24) vw(32) vw(10);
    .state{
      font-size: vw(32);
      color: #333;
      margin-right: vw(24);
      display: flex;
      align-items: center;
      i{
        display: block;
        width: vw(16);
        height: vw(9);
        background: url("../../assets/down.png") no-repeat center center;
        background-size: vw(16) vw(9);
        margin-left: vw(8);
      }
    }
    .state::after{
      content: '';
      width: vw(20);
      height: vw(14);
      background: #333;
      margin-left: vw(8);
      display: block;
      clip-path: polygon(0 0,100% 0,50% 100%);
    }

    .input{
      position: relative;
      width: 0;
      flex-grow: 1;
      height: vw(65);
      border-radius: vw(32);
      border: 1px solid rgba(0,0,0,0.1);
      background: #fff;
      overflow: hidden;
      p{
        position: absolute;
        width: 100%;
        line-height: vw(65);
        text-align: center;
        color: #999;
        font-size: vw(32);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        opacity: 1;
        i{
          margin-right: vw(8)!important;
          font-size: vw(40)!important;
          color: #999!important;
          padding: 0!important;
        }
      }
      p.fous{
        opacity: 0;
      }
      input{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: vw(32);
        color: #333;
        border: none;
        position: relative;
        z-index: 2;
        opacity: 0;
      }
      input.fous{
        opacity: 1;
      }
    }
  }
  .list{
    width: vw(686);
    box-sizing: border-box;
    margin: 0 auto;
    height: 0;
    flex-grow: 1;
    overflow: hidden;

  }
  .foot{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 vw(30) 0 vw(32) ;
    height: vw(96);
    justify-content: space-between;
    background: #fff;
    p{
      font-size: vw(28);
      color: #999;
    }
    .btn{
      display: flex;
      align-items: center;
      button{
        margin-left: vw(40);
        height: vw(64);
        padding: 0 vw(36);
        line-height: vw(64);
        color: #fff;
        font-size: vw(28);
        background: #FF3434;
        border: none;
        border-radius: vw(8);
      }
    }
  }
</style>
