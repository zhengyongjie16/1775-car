<template>

  <div class="BusOppmarket">
    <div class="BusOppBox">
      <div class="BusOppLi">
        <div class="BusOppLiFon">
          商机市场
        </div>
        <span>每日为您精选高匹配线索，快速提升车源成交量</span>
      </div>
      <div class="BusOppSeTop">
        <div class="BusOppSeTopLe">
          <ul>
            <li v-for="(item,r) in BusOppLi"  class="BusOppSeTopLeLi" :class="SeTopLeNum==r?SeTopLeCli:''" @click="SeTopLeNum=r">{{item}}</li>
          </ul>
        </div>
      </div>
      <!--今日线索-->
      <div class="TodayClue" v-if="SeTopLeNum==0">
          <p>今日线索已完，明天再来抢吧。</p>
      </div>

      <!--领取纪录-->
      <div class="ReceiveRecord"  v-if="SeTopLeNum==1">
        <div class="ReceiveSele">
          <!--所在地-->
          <div>
            <span>所在地:</span>
            <el-select class="checkSele" size="mini" v-model="BusLocation" placeholder="请选择城市">
              <el-option
                v-for="item in BusLocationData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--匹配车源-->
          <div>
            <span>匹配车源:</span>
            <el-select class="checkSele" size="mini" v-model="MatchingCar" placeholder="选择车型">
              <el-option
                v-for="item in MatchingCarData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--领取人-->
          <div>
            <span>领取人:</span>
            <el-select class="checkSele" size="mini" v-model="BusReceiver" placeholder="请选择领取人">
              <el-option
                v-for="item in ReceiverData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--领取时间-->
          <div>
            <span>领取时间:</span>
            <el-date-picker
              class="checkSeleDate"
              size="mini"
              v-model="BusReceiveTime"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
          <!--快速查找-->
          <div>
            <span>快速查找:</span>
            <el-input class="checkSele" size="mini" v-model="BusfastSelet" placeholder="请输入手机号/车源"></el-input>
          </div>
        </div>
        <div class="BusOppLine"></div>
        <!--空的时候-->
        <div class="ReceReNull">
          <p>暂无领取记录，请到商机市场中抢购优质线索</p>
        </div>

      </div>



    </div>
  </div>


</template>

<script>
    export default {
        name: "BusOppmarket",
      data(){
          return{
            BusOppLi: ['商机市场', '领取记录'], // 车源状态列表
            SeTopLeNum: '0',
            SeTopLeCli: 'SeTopLeCli',

            BusLocation:'',//所在地
            MatchingCar:'',//匹配车源
            BusReceiver:'',//领取人
            BusReceiveTime:'',//领取时间
            BusfastSelet:'',//快速查询


            BusLocationData: ['南宁'],
            MatchingCarData:['宝马'],
            ReceiverData:['全部',],

          }
      }
    }
</script>

<style scoped lang="scss">

  .BusOppmarket{
    margin-top: 64px;
    width: 100%;
  }
  .BusOppBox{
    width: 1140px;
    margin: 0 auto;
  }
  .BusOppLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .BusOppLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .BusOppLi>span{
    color: #666666;
    font-size: 12px;
    margin-left: 20px;
  }

  .BusOppSeTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .BusOppSeTopLe{
    width: 360px;
    height: 40px;
    float: left;
  }
  .BusOppSeTopLe ul{
    width: 366px;
    height: 40px;
  }
  .BusOppSeTopLeLi{
    width: 120px;
    height: 40px;
    float: left;
    background-color: #f9fafa;
    border: 1px solid #e3e3e3;
    border-right: none;
    text-align: center;
    line-height: 40px;
    color: #333;
    font-size: 12px;
    z-index: 1;
  }
  .BusOppSeTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }

  .TodayClue{
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
    color: #999;
    font-size: 20px;
  }

  .ReceiveRecord{
    width: 100%;
  }
  .ReceiveSele{
    width: 1140px;
    /*height: 180px;*/
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .ReceiveSele>div{
    width: 266px;
    height: 36px;

  }
  .ReceiveSele span{
    width: 94px;
    height: 36px;
    display: block;
    color: #666;
    font-size: 12px;
    text-align: right;
    line-height: 36px;
    float: left;
    margin-right: 10px;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }
  .PriceFont{
    width: 72px;
    height: 36px;
    line-height: 36px;
  }

  .BusOppLine{
    height: 10px;
    margin: 20px 0;
    background-color: #f9fafa;
  }

  .ReceReNull{
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align:center;
    color: #999;
    font-size: 20px;
  }


</style>
