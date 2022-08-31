<template>
    <div class="InLibraryState">
      <div class="InLiStateBox">
        <div class="InLiStateLi">
          <div class="InLiStateLiFon">
            在库配置状态
          </div>
        </div>
        <div class="InLiStateData">
          <div class="InLiStateBtn">
            <div class="NewInLiSta" @click="NewInLiStaCli">新建</div>
          </div>
          <div class="InLiStaTable">
            <div class="InStaTaTil">
              <div class="InliStateName">
                <p>状态名字</p>
              </div>
              <div class="InopeTime">
                <p>操作时间</p>
              </div>
              <div class="InopePeo">
                <p>操作人</p>
              </div>
              <div class="RelationCar">
                <p>关联车源</p>
              </div>
              <div class="InOpera">
                <p>操作</p>
              </div>
            </div>
            <div class="InStaTaLi">
              <div>
                <div class="InliStateName">
                  <p>状态名字</p>
                </div>
                <div class="InopeTime">
                  <p>操作时间</p>
                </div>
                <div class="InopePeo">
                  <p>操作人</p>
                </div>
                <div class="RelationCar">
                  <p>关联车源</p>
                </div>
                <div class="InOpera">
                  <p>修改名称</p>
                  <p>删除</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <!--操作-->
      <div class="WinM" :style="Dis"  @click="Disnone"></div>
      <!--新建配置-->
      <div class="NewConfigure" :style="NewConfDis">
        <div class="NewConfClo">
          <i @click="NewConfcancel" class="el-icon-close" style="margin-right: 10px;"></i>
        </div>
        <div class="NewConfTile">
          添加在库状态
        </div>
        <div class="NewConfCont">
          <span>状态名称:</span>
          <el-input class="StateNameIpt" size="small" v-model="StateName" placeholder="请输入名称"></el-input>
        </div>
        <div class="NewConfBtn">
            <div class="NewConfisOk NewConfCli" @click="NewConfOk">确定</div>
            <div class="NewConfisOk" @click="NewConfcancel">取消</div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "InLibraryState",
      data(){
          return{
            InStaTaLi:[],


            Dis:{
              display:'none'
            },
            NewConfDis:{
              display:'none'
            },//新建配置display
            StateName:'',//新建配置的名字
          }
      },
      methods:{
        Disnone(){
          this.Dis.display='none';
          this.NewConfDis.display='none';
        },
        //点击新建
        NewInLiStaCli(){
          this.Dis.display='block';
          this.NewConfDis.display='block';
        },
        //确认新建
        NewConfOk(){
          this.Dis.display='none';
          this.NewConfDis.display='none';
        },
        //取消新建
        NewConfcancel(){
          this.Dis.display='none';
          this.NewConfDis.display='none';
        }
      }
    }
</script>

<style scoped lang="scss">
  .InLibraryState{
    margin-top: 64px;
    width: 100%;
  }
  .InLiStateBox{
    width: 1140px;
    margin: 0 auto;
  }
  .InLiStateLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .InLiStateLiFon{
    width: 120px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .InLiStateData{
    width: 100%;
    position: relative;
    top: 20px;
  }
  .InLiStateBtn{
    width: 100% ;
    height: 26px;
    margin-bottom: 20px;
  }
  .NewInLiSta{
    width: 76px;
    height: 26px;
    background-color: $ora;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 26px;
    float: right;
    cursor:pointer;
  }

  .InLiStaTable{
    width: 100%;
  }
  .InStaTaTil{
    width: 100%;
    height: 41px;
    background-color: #f8f8f8;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
  }
  .InStaTaTil>div{
    height: 100%;
    line-height: 41px;
    font-size: 12px;
    color: #666;
    border-right: 1px solid #e3e3e3;
    float: left;
  }
  .InStaTaTil>div>p{
    margin-left: 20px;
  }
  .InliStateName{
    width: 285px;
  }
  .InopeTime{
    width: 273px;
  }
  .InopePeo{
    width: 240px;
  }
  .RelationCar{
    width: 166px;
  }
  .InOpera{
    width: 170px;
  }

  .InStaTaLi{
    width: 100%;
  }
  .InStaTaLi>div{
    width: 100%;
    height: 60px;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
  }
  .InStaTaLi>div:nth-last-child(1){
    border-bottom: 1px solid #e3e3e3;
  }
  .InStaTaLi>div>div{
    float: left;
    height: 60px;
    line-height: 41px;
    font-size: 12px;
    color: #666;
    border-right: 1px solid #e3e3e3;
  }
  .InStaTaLi>div>div>p{
    margin-top: 10px;
    margin-left: 20px;
    line-height: 10px;
  }
  .InStaTaLi>div>div:nth-last-child(1)>p{
    color: $ora;
    cursor:pointer;
  }

  .WinM{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 999;
    display: none;
  }

  .NewConfigure{
    width: 530px;
    height: 277px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 0 10px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  .NewConfClo{
    width: 40px;
    height: 40px;
    text-align: right;
    font-size: 30px;
    float: right;
    cursor: pointer;
  }
  .NewConfTile{
    clear: both;
    width: 410px;
    height: 36px;
    margin: 20px auto 0;
    text-align: left;
    font-size: 24px;
    color: #666;
  }
  .NewConfCont{
    width: 410px;
    height: 36px;
    margin: 10px auto 0;
    line-height: 36px;
    font-size: 12px;
    color: #666666;
  }
  .NewConfCont>span{
    margin-right: 10px;
  }
  .StateNameIpt{
    width: 320px;
    height: 36px;
    line-height: 36px;
  }

  .NewConfBtn{
    width: 410px;
    height: 40px;
    margin: 30px auto;
    display: flex;
    justify-content: center;
  }
  .NewConfBtn>div{
    line-height: 40px;
    margin-right: 20px;
    cursor:pointer;
  }
  .NewConfisOk{
    width: 140px;
    height: 40px;
    text-align: center;
    color: #000;
    font-weight: 600;
    border: 1px solid  #e3e3e3;
  }
  .NewConfCli{
    background-color: $ora;
    color: #fff;
    border: 1px solid  $ora;

  }

</style>
