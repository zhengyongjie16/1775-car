<template>
  <div class="main">
    <div class="nav">
      <div class="left">
        <md-icon name="arrow-left"></md-icon>
        <div class="name">周边</div>
      </div>
      <div class="right">
        <div class="address">
          广西南宁市西乡塘区
          <md-icon name="arrow-right"></md-icon>
        </div>
        <div class="icon">
          <div class="num"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <div class="show">
        <md-icon name="search"></md-icon>
        请输入关键字进行搜索
        </div>
      </div>
      <div class="hot">
        <md-scroll-view
        auto-reflow
        :scrolling-x="true"
        :scrolling-y="false"
        >
        <div class="show">
        <div class="tag">关键字</div>
        <div class="tag">关键字</div>
        <div class="tag">关键字</div>
        <div class="tag">关键字</div>
        </div>
        </md-scroll-view>
      </div>
      <div class="banner">

      </div>
      <div class="menu-show">
      <div class="menu">
        <div class="item itag" @click="$router.push({path:'/AroundList'})">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item itag">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item itag">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item itag">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item itag">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
        <div class="item">
          <div class="img"></div>
          <div class="title">栏目</div>
        </div>
      </div>

      </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">
  .main{
    background: linear-gradient(90deg,rgba(254,244,77,1) 0%, rgba(254,195,75,1) 100% );
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .nav{
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
   .left{
      display: flex;
      align-items: center;
      i{
        font-size: 28px;
        margin-right: 12px;
        font-weight: bold;
        color:#333;
      }
      .name{
        font-size: 40px;
        color: #333;
        font-weight: bold;
      }
    }
    .right{
      display: flex;
      align-items: center;
      .address{
        display: flex;
        align-items: center;
        font-size: 36px;
        i{
          font-size: 30px;
        }
      }
      .icon{
        margin-left: 30px;
        width: 40px;
        height: 40px;
        background: #000;
      }
    }
  }
  .content{
    background: rgb(247,247,247);
    border-radius: 36px 36px 0 0;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .search{
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
    .show{
      height: 70px;
      box-sizing: border-box;
      border-radius: 35px;
      background: rgb(242,242,242);
      display: flex;
      align-items: center;
      color: #333;
      font-size: 26px;
      i{
        font-size: 30px;
        font-weight: bold;
        margin-right: 20px;
        padding: 0;
        margin-left: 20px;
        color: #333;
      }
    }
  }
  .hot{
    padding: 0 24px;
    background: #fff;
    .show{
      display: flex;
      align-items: center;
      .tag{
        height: 40px;
        border-radius: 20px;
        background: rgb(242,242,242);
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: #333;
        padding: 0 14px;
        margin-right: 16px;
      }
    }
  }
  .banner{
    padding-top: 20px;
    background: #fff;
    height: 180px;
  }
  .menu-show{
    padding: 0 20px;
    margin-top: 30px;
  }
  .menu{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 18px;
    .item{
      width: 20%;
      text-align: center;
      .img{
        height: 32px;
        width: 32px;
        background: #000;
        margin: 28px auto 0;
      }
      .title{
        font-size: 28px;
        color: #333;
        margin-top: 14px;
        margin-bottom: 28px;
        line-height: 1;
      }
    }
    .item.itag{
      .img{
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
