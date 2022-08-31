<template>
    <div class="ComplaintCar">
      <div class="CompCarbox">
        <div class="CompCarLi">
          <div class="CompCarLiFon">
            用户举报
          </div>
          <span>及时处理用户举报信息，避免商机流失</span>
        </div>
        <!--举报查询-->
        <div class="ComTime">
          <div class="ComTimeBox">
            <!--举报时间-->
            <div class="ComTimeLi">
              <span>举报时间:</span>
              <el-date-picker
                class="checkSeleDate"
                size="mini"
                v-model="ComTime"
                type="daterange"
              >
              </el-date-picker>

            </div>
            <!--车辆选择-->
            <div class="ComTimeLi">
              <span>车型筛选:</span>
              <el-select class="checkSele" size="mini" v-model="ComCarSel" placeholder="请选择车型">
                <el-option
                  v-for="item in ComCarSelData"
                  size="mini"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--销售代表-->
            <div class="ComTimeLi">
              <span>销售代表:</span>
              <el-select class="checkSele" size="mini" v-model="ComSalePeo" placeholder="请选择销售代表">
                <el-option
                  v-for="item in ComSalePeoData"
                  size="mini"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="ComLookup">
                查找
            </div>
          </div>
        </div>
        <div class="Line"></div>
        <div class="ComCaData">
          <div class="ComCaDataTitle">
            <span>0</span>个车源
          </div>
          <div class="ComCaDataLi">
              <div class="ComCaDataCon">
                <p>被举报车源</p>
              </div>
              <div class="ComCaDataCon">
                <p>被举报原因</p>
              </div>
          </div>
          <!--被举报数据-->
          <div class="ComCaDataDe">
            <div class="ComCaDataCon">
              <p>宝马三系</p>
            </div>
            <div class="ComCaDataCon">
              <p>因为xxx</p>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "ComplaintCar",
      data(){
          return{
            ComTime:'',//举报时间
            ComCarSel:'',//车型选择
            ComSalePeo:'',//销售代表

            ComCarSelData:[
              {value:'宝马'},
            ],//车辆选择数据
            ComSalePeoData:[
              {value:'xx'},
            ],//销售代表
          }
      }
    }
</script>
<style scoped lang="scss">
  .ComplaintCar{
    margin-top: 64px;
    width: 100%;
  }
  .CompCarbox{
    width: 1140px;
    margin: 0 auto;
  }
  .CompCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .CompCarLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .CompCarLi>span{
    color: #666666;
    font-size: 12px;
    margin-left: 10px;
  }

  .ComTime{
    width: 100%;
    height: 76px;
    background-color: #fff;
  }
  .ComTimeBox{
    width: 1140px;
    height: 36px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .ComTimeLi{
    width: 240px;
    height: 36px;
    float: left;
    margin-right: 10px;
    line-height: 36px;
  }
  .ComTimeLi>span{
    width: 60px;
    height: 36px;
    display: inline-block;
    float: left;
    text-align: right;
    color: #333;
    font-size: 12px;
    margin-right: 5px;
  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }

  .Line{
    height: 10px;
    background-color: #f9fafa;
  }
  .ComLookup{
    width: 76px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background-color: $ora;
    float: left;
    position: relative;
    top: 5px;
    cursor:pointer;
  }
  .ComCaData{
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
  }
  .ComCaDataTitle{
    width: 100%;
    height: 12px;
    font-size: 12px;
    text-align: right;
    color: #333;
    margin-right: 20px;

  }
  .ComCaDataTitle>span{
    color: $ora;
    margin-right: 5px;
  }
  .ComCaDataLi{
    width: 100%;
    height: 50px;
    background-color: #F9FAFA;
    margin-top: 10px;
    border-top: 1px solid #eceef0;
    border-left:1px solid #eceef0;
  }
  .ComCaDataLi>div{
    width: 568px;
    border-right: 1px solid #eceef0;
    float: left;
  }
  .ComCaDataCon{
    height: 100%;
    line-height: 50px;
    font-size: 14px;
    color: #333;
  }
  .ComCaDataCon>p{
    margin-left: 20px;
  }

  .ComCaDataDe{
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #eceef0;
    border-left:1px solid #eceef0;
  }
  .ComCaDataDe>div{
    width: 568px;
    border-right: 1px solid #eceef0;
    float: left;
  }
  .ComCaDataDe p{
    font-size: 12px;
    color: #666666;
  }
  .ComCaData>div:nth-last-child(1){
    border-bottom: 1px solid #eceef0;
  }

</style>
