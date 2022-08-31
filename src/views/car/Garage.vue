<template>
  <div class="mian">
    <navTag :title="title"></navTag>
  <div class="bd">
    <div class="search">
      <input type="text" placeholder="搜索">
    </div>
    <div class="options">
      <div class="selected  down">入库时间</div>
      <div class="up">价格</div>
      <div class="down">品牌</div>
      <div class="up">车龄</div>
    </div>
    <div class="carList">
      <md-scroll-view
        ref="scrollView"
        :scrolling-y='true'
        :scrolling-x="false"
        auto-reflow
      >
        <div class="carItem" :class="{active:carCho}" v-for="(item,keys) in list" :key="keys">
           <div class="choIcon" :class="{choAct:item.choAct}" @click="item.choAct=!item.choAct"></div>
           <carDetailCard class="card"></carDetailCard>
        </div>
      </md-scroll-view>

    </div>
    <div class="foot" v-show="!carCho">
      <div class="num">
        共56辆
      </div>
      <div class="btn">
        <button @click="carCho=true">选车分享</button>
        <button>分享此列表</button>
      </div>
    </div>
    <div class="foot" v-show="carCho">
      <div class="num">
        <i @click="AllCho"></i>全选(0/52)
      </div>
      <div class="btn">
        <div class="cancel" @click="cancel">取消</div>
        <button @click="carCho=false">确认分享</button>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
    export default {
        name: 'Garage',
        data(){
            return {
                title:'车库',
                isShare:false,
                carCho:false,
                choAct:false,
                list:[
                    {
                        choAct:false
                    },{
                        choAct:false
                    },{
                        choAct:false
                    },{
                        choAct:false
                    },{
                        choAct:false
                    },{
                        choAct:false
                    },{
                        choAct:false
                    },
                ]
            }
        },
        methods:{
            handleNavChange(res){
                console.log(res)
            },
            cancel(){
                this.carCho=false;
                this.list.forEach( value => {
                    value.choAct=false
                } )
            },
            AllCho(){
                this.list.forEach(value => {
                    value.choAct=true
                })
            }
        }
    };
</script>

<style scoped lang="scss">
  .mian{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .bd{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .carList{
      height: 0;
      flex-grow: 1;
    }
  }
  .search{
    width: vw(686);
    height: vw(64);
    border: 1px solid rgba(0,0,0,0.1);;
    border-radius: vw(32);
    margin: vw(20) auto;
    box-sizing: border-box;
    overflow: hidden;
    input{
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
  .options{
    display: flex;
    width: vw(686);
    margin:0 auto ;
    justify-content: space-between;
    align-items: center;
    font-size: vw(28);
    height: vw(80);
    &>div{
      color:#999;
      position: relative;
    }
    .selected{
      color:#D52002;
      &.up:after,&.down:after{
        background: #d52002;
      }
    }
    .up:after{
      content: '';
      display: inline-block;
      width: vw(20);
      height: vw(13);
      clip-path: polygon(50% 0,0 100%,100% 100%);
      position: relative;
      right: vw(-15);
      top:50%;
      transform: translateY(-50%);
      background: #999;
    }
    .down:after{
      content: '';
      display: inline-block;
      width: vw(20);
      height: vw(13);
      clip-path: polygon(0 0,50% 100%,100% 0);
      position: relative;
      right: vw(-15);
      top:50%;
      transform: translateY(-50%);
      background: #999;
    }

  }
  .carItem{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .card{
      transform: translateX(0);
      transition: 0.5s;
      margin: 0 auto;
    }
    .choIcon{
      transform: translateX(vw(0));
      transition: 0.5s;
    }
  }
  .carItem.active{
    .card{
      transform: translateX(vw(60));
      transition: 0.5s;
    }
    .choIcon{
      display: block;
      width: vw(32);
      height: vw(32);
      border-radius: 50%;
      border: 1px solid #999;
      transform: translateX(vw(32));
      transition: 0.5s;
    }
    .choIcon.choAct{
      border-color: #FF3434;
      background: #FF3434;
    }
  }
  .foot{
    height: vw(96);
    box-sizing: border-box;
    padding: vw(16) vw(32);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    .num{
      font-size: vw(28);
      color: #999;
      display: flex;
      align-items: center;
      i{
        display: block;
        width: vw(32);
        height: vw(32);
        border-radius: 50%;
        border: 1px solid #999;
        margin-right: vw(20);
      }
    }
    .btn{
      display: flex;
      align-items: center;
      .cancel{
        font-size: vw(28);
        color: #999;
      }
      button{
        height: vw(64);
        border: none;
        padding: 0 vw(36);
        margin-left: vw(40);
        background: #FF3434;
        color: #fff;
        font-size: vw(28);
        border-radius: vw(8);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
