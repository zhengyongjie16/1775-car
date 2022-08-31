<template>
  <div class="main">
    <navTag :isShare="false" title="车商联盟"></navTag>
    <MyUnion></MyUnion>
  </div>
</template>



<script>
  import MyUnion from '@/component/MyUnion'
  import UnionCarList from '@/component/UnionCarList'
  export default {
    name: 'Union',
    components:{
      MyUnion,
      UnionCarList
    },
    data(){
      return{
        current:1,
        navTabs:[
          { value:1, name:'我的联盟' },
          { value:2, name: '我的车库' }
        ]
      }
    },

    methods:{

    }

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
    margin:0 auto;

    .title{
      font-size: vw(32);
      font-weight: 600;
      margin-bottom: vw(40);

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
          font-size: vw(32);
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
          span{
            font-size: vw(20);
            color:#999;
            line-height: 1;
            height: vw(20);
            display: inline-block;
          }
          &>span:first-child{
            padding-right: vw(20);
            border-right:1px solid #999
          }
          &>span:last-child{
            padding-left: vw(20);
          }

          margin-top: vw(42);
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
  }
  .iconPlus{
    width: vw(56);
    height: vw(56);
    border: vw(3) solid #999;
    border-radius: 50%;
    line-height: vw(56);
    font-size: vw(35);
    color:#999;
    text-align: center;
    margin-right: vw(34);
  }

</style>
