<template>
    <div class="evaluate">
      <div class="evaluateBox">
        <div class="MyCarLi">
          <div class="MyCarLiFon">
            车源列表
          </div>
          <span>查看、回复您的店铺评价，还可以对不合理的评价进行申诉</span>
        </div>
        <!--公司名称-->
        <h3 class="evaName">xxxxx公司</h3>
        <!--评分-->
        <div class="evaScore">
            综合评分:
            <span>3.5分</span>
          <!--评分小星星-->
          <div class="evaScoData">
            <p>
              <span>车源真实:</span>
              <el-rate
                v-model="evaCarReal"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="gray"
                score-template="{value}分"
                >
              </el-rate>
            </p>
            <p>
              <span>服务态度:</span>
              <el-rate
                v-model="evaService"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="gray"
                score-template="{value}分"
              >
              </el-rate>
            </p>
            <p>
              <span>车商专业:</span>
              <el-rate
                v-model="evaCarmajor"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="gray"
                score-template="{value}分"
              >
              </el-rate>
            </p>

          </div>

        </div>
        <!--网友评论-->
        <div class="evaComment">
          <div class="evaComTie">
            <span></span>
            网友评论（{{commentNum}}）
          </div>
          <div class="evaComFrom">
            <div>
              <span>回复状态:</span>
              <el-select class="evaSelect" size="mini" v-model="RecState" placeholder="请选择">
                <el-option
                  v-for="item in RecStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>申述状态:</span>
              <el-select class="evaSelect" size="mini" v-model="RepState" placeholder="请选择">
                <el-option
                  v-for="item in RepStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <!--暂时没有数据-->
          <div class="evaDataNull">
            抱歉，暂时没有数据
          </div>

        </div>



      </div>
    </div>
</template>

<script>
    export default {
        name: "evaluate",
      data(){
          return{
            evaCarReal:2,//车源真实
            evaService :2,//服务态度
            evaCarmajor:2,//车商专业

            commentNum:'',//评论数量
            RecState:'',//回复状态
            RepState:'',//申述状态

            RecStateData:[
              {value:'全部'},
              {value:'未回复'},
              {value:'已回复'},
            ],//回复状态数据
            RepStateData:[
              {value:'全部'},
              {value:'未申述'},
              {value:'申述中'},
              {value:'申述成功'},
              {value:'申述失败'},
            ],//申述状态数据

          }
      }
    }
</script>

<style scoped lang="scss">

  .evaluate{
    margin-top: 64px;
    width: 100%;
  }
  .evaluateBox{
    width: 1140px;
    margin: 0 auto;
  }
  .MyCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .MyCarLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .MyCarLi>span{
    font-size: 14px;
    color: #666666;
    margin-left: 10px;
  }

  .evaName{
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #666666;
    font-weight: 400;
    margin: 30px 20px;
  }
  .evaScore{
    width: 100%;
    height: 26px;
    margin-left: 30px;
    font-size: 18px;
    color: #666666;
    padding-bottom: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .evaScore>span{
    color: $ora;
  }
  .evaScoData{
    width: 980px;
    height: 23px;
    float: right;
    line-height: 23px;

  }
  .evaScoData>p{
    font-size: 14px;
    color: #666666;
    display: inline-block;
    width: 250px;
    height: 23px;
    float: left;
  }
  .evaScoData>p>span{
    float: left;
  }
  .el-rate{
    line-height: 1.5;
  }

  .evaComment{
    width: 100%;
    margin: 20px 30px;
  }
  .evaComTie{
    width: 100%;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: #4A4A4A;
  }
  .evaComTie>span{
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color:$ora;
    position: relative;
    top: -3px;
  }
  .evaComFrom{
    width: 100%;
    height: 46px;
    margin-top: 20px;
    background-color: #F9FAFA;
  }
  .evaComFrom>div{
    width: 260px;
    height: 36px;
    line-height: 46px;
    float: left;
    margin-right: 10px;
  }
  .evaComFrom>div>span{
    float: left;
    font-size: 12px;
    color: #666666;
    line-height: 46px;
    margin-right: 5px;
  }
  .evaSelect{
    width: 180px;
  }

  .evaDataNull{
    width: 100%;
    height: 200px;
    line-height: 200px;
    color: #666666;
    font-size: 24px;
    text-align: center;
  }


</style>
