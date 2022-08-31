<template>

  <div class="CarInsPre">
    <div class="CarInsPreBox">
      <div class="MyCarLi">
        <div class="MyCarLiFon">
          车检报告
        </div>
      </div>
      <div class="CarInsBasic">
        <div class="InsBasicbox">
          <div class="InBasicLe">
            <div class="InBasicTu">
              <img :src=InBasicTuLi[InBasTuLiNum]>
            </div>
            <div class="InBasicTuLi">
              <div class="LeClick">
                <i class="el-icon-arrow-left"></i>
              </div>
              <ul>
                <li class="InBasicTuLiLi" :class="InBasTuLiNum==r?InBaTuLiHover:''" v-for="(item,r) in InBasicTuLi" @mouseover="InBasTuLiNum=r">
                  <img :src=item >
                </li>
              </ul>
              <div class="RiClick">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>

          </div>
          <div class="InBasicRi">
            <h3>【泉州】别克 凯越 2011款 1.6LX-AT</h3>
            <div class="InBasicRiData">
              <ul>
                <li v-for="(item,r) in InsBasicData1">
                  <span>{{InsBasicData2[r]}}</span>
                  <p>{{item}}</p>
                </li>
              </ul>
            </div>
            <!--评级-->
            <div class="GradeTile">
              <div>
                <p>
                  综合评级:
                  <strong>EF</strong>
                  <span>评级等级</span>
                </p>
              </div>
              <div style="text-align: right">
                <span>车辆差异认定标准</span>
              </div>
            </div>
            <!--评分小星星-->
            <div class="InBaScore">
              <div>
                <span>骨架：</span>
                <el-rate
                  v-model="skeleton"
                  disabled
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
              <div>
                <span>装置：</span>
                <el-rate
                  v-model="device"
                  disabled
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
              <div>
                <span>外观：</span>
                <el-rate
                  v-model="Appear"
                  disabled
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
              <div>
                <span>内饰：</span>
                <el-rate
                  v-model="InteriorTrim"
                  disabled
                  text-color="#ff9900"
                >
                </el-rate>
              </div>
            </div>
            <!--简述-->
            <div class="Sketch">
              <strong>简述:</strong>
              <p>该车整车印象较差。赣A户籍。2003年07月上牌。骨架-伤及后围板、后裙板。外观-多处钣金喷漆。内饰-正常磨损。装置-发动机 因变形拆卸维修等原因导致的部位抖动 、变速箱 档位变化时有延时的异常抖动或晃动 、空调 制冷/热不足 有油渍，且熄火2分钟后未滴油 发动机发出异响，随着转速升高频率加快 更换过缸垫 、娱乐设备 花屏。强险交至2019年06随车。车主口述过户五次，产证未见。详情见报告文字、图片和视频等描述。</p>
            </div>
          </div>
        </div>

      </div>
      <div class="MyCarSeTop">
        <div class="MyCarSeTopLe">
          <ul>
            <li v-for="(item,r) in MyCarLi"  class="MyCarSeTopLeLi" :class="SeTopLeNum==r?SeTopLeCli:''" @click="SeTopLeNum=r">{{item}}</li>
          </ul>
        </div>
        <!--出价按钮-->
        <div class="BidButton">
            <p>
              剩余时间
              <span>123456</span>
            </p>
          <div>出价</div>
        </div>
      </div>

      <!--车辆信息-->
      <div>
        <div class="InsRepTitle">
          <span></span>
          车辆信息
        </div>
          <!--基本信息-->
        <div class="table">
          <div class="InsRepHeader">基本信息</div>
          <div class="InsRepLione">
            <div>
              <div><p>表显里程</p></div>
              <div><p>{{irAppMile}}</p></div>
            </div>
            <div>
              <div><p>车身颜色</p></div>
              <div><p>{{irCarColo}}</p></div>
            </div>
            <div>
              <div><p>车牌</p></div>
              <div><p>{{irLipla}}</p></div>
            </div>
            <div>
              <div><p>首次上牌时间</p></div>
              <div><p>{{irCardTime}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>牌照性质</p></div>
              <div><p>{{irLichar}}</p></div>
            </div>
            <div>
              <div><p>使用性质</p></div>
              <div><p>{{irUsechar}}</p></div>
            </div>
            <div>
              <div><p>车辆类型</p></div>
              <div><p>{{irCarType}}</p></div>
            </div>
            <div>
              <div><p>核定载人数</p></div>
              <div><p>{{irManCount}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>车门数</p></div>
              <div><p>{{irCarDoor}}</p></div>
            </div>
            <div>
              <div><p>过户次数</p></div>
              <div><p>{{irTransCount}}</p></div>
            </div>
            <div>
              <div><p>新车指导价</p></div>
              <div><p>{{irNewCarPre}}</p></div>
            </div>
            <div>
              <div><p>特殊车辆</p></div>
              <div><p>{{irSpeCar}}</p></div>
            </div>
          </div>
        </div>
        <!--证件信息-->
        <div class="table">
          <div class="InsRepHeader">证件信息</div>
          <div class="InsRepLione">
            <div>
              <div><p>年检有效期</p></div>
              <div><p>{{irYearEffeDate}}</p></div>
            </div>
            <div>
              <div><p>发证日期</p></div>
              <div><p>{{irCertifiDate}}</p></div>
            </div>
            <div>
              <div><p>出厂日期</p></div>
              <div><p>{{irFactDate}}</p></div>
            </div>
            <div>
              <div><p>交强险期</p></div>
              <div><p>{{irComInsPer}}</p></div>
            </div>
          </div>
        </div>
        <!--历史信息-->
        <div class="table">
          <div class="InsRepHeader">历史信息</div>
          <div class="InsRepLione">
            <div style="width: 1180px;">
              <div><p>车身颜色更改</p></div>
              <div><p>{{irYearEffeDate}}</p></div>
            </div>
          </div>
        </div>
        <div class="InsRepHeader">备注信息:</div>
      </div>

      <!--车辆配置-->
      <div>
        <div class="InsRepTitle">
          <span></span>
          车辆配置
        </div>
        <div class="table">
          <div class="InsRepLione">
            <div>
              <div><p>外观颜色</p></div>
              <div><p>{{isCarAppCo}}</p></div>
            </div>
            <div>
              <div><p>气囊</p></div>
              <div><p>{{isGasbag}}</p></div>
            </div>
            <div>
              <div><p>电门车窗</p></div>
              <div><p>{{isSwitchWin}}</p></div>
            </div>
            <div>
              <div><p>导航</p></div>
              <div><p>{{isCarGps}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>内饰颜色</p></div>
              <div><p>{{isInterCo}}</p></div>
            </div>
            <div>
              <div><p>abs</p></div>
              <div><p>{{isCarabs}}</p></div>
            </div>
            <div>
              <div><p>天窗</p></div>
              <div><p>{{isCarskyli}}</p></div>
            </div>
            <div>
              <div><p>雷达</p></div>
              <div><p>{{isCarRadar}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>排量(I/t)</p></div>
              <div><p>{{isCarDispla}}</p></div>
            </div>
            <div>
              <div><p>电动钥匙数量</p></div>
              <div><p>{{isCarElekey}}</p></div>
            </div>
            <div>
              <div><p>座椅</p></div>
              <div><p>{{isCarChair}}</p></div>
            </div>
            <div>
              <div><p>影音系统</p></div>
              <div><p>{{isCarViAuSty}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>排档</p></div>
              <div><p>{{isCargear}}</p></div>
            </div>
            <div>
              <div><p>手动钥匙数量</p></div>
              <div><p>{{isCarManKey}}</p></div>
            </div>
            <div>
              <div><p>铝合金轮毂</p></div>
              <div><p>{{isCarAwHub}}</p></div>
            </div>
            <div>
              <div><p>电动座椅</p></div>
              <div><p>{{isCarEleSeat}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>燃料</p></div>
              <div><p>{{isCarFuel}}</p></div>
            </div>
            <div>
              <div><p>空调</p></div>
              <div><p>{{isCarAirCon}}</p></div>
            </div>
            <div>
              <div><p>巡航</p></div>
              <div><p>{{isCarCruise}}</p></div>
            </div>
            <div>
              <div><p>电加热座椅</p></div>
              <div><p>{{isCarEhseat}}</p></div>
            </div>
          </div>
          <div class="InsRepLione">
            <div>
              <div><p>记忆座椅</p></div>
              <div><p>{{isCarMeSeat}}</p></div>
            </div>
            <div>
              <div><p>转向助力</p></div>
              <div><p>{{isCarSteAss}}</p></div>
            </div>
            <div>
              <div><p>驱动方式</p></div>
              <div><p>{{isCarDriMode}}</p></div>
            </div>
            <div>
              <div><p>备胎</p></div>
              <div><p>{{isCarSpatire}}</p></div>
            </div>
          </div>
        </div>
        <div class="InsRepHeader">原厂加装配置:</div>
        <div class="InsRepHeader">非原厂加装配置:</div>
      </div>

      <!--损伤明细-->
      <div>
        <div class="InsRepTitle">
          <span></span>
          损伤明细
        </div>
        <p class="TestScore">
          <span>骨架损伤 检测师总体评分：</span>
          <el-rate
            v-model="skeleton"
            disabled
            text-color="#ff9900">
          </el-rate>
        </p>
        <p class="TestScore">
          <span>装置损伤 检测师总体评分：</span>
          <el-rate
            v-model="device"
            disabled
            text-color="#ff9900">
          </el-rate>
        </p>
        <div class="table">
          <div class="InsRepLiTwo">
            <div>
              <div><p>空调</p></div>
              <div><p>{{damaAir}}</p></div>
            </div>
            <div>
              <div><p>气囊</p></div>
              <div><p>{{damaGasbag}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>制动</p></div>
              <div><p>{{damabraking}}</p></div>
            </div>
            <div>
              <div><p>中控</p></div>
              <div><p>{{damaCenCon}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>冷却系统</p></div>
              <div><p>{{damaCooSye}}</p></div>
            </div>
            <div>
              <div><p>驱动</p></div>
              <div><p>{{damaDrive}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>发动机</p></div>
              <div><p>{{damaEngine}}</p></div>
            </div>
            <div>
              <div><p>娱乐设备</p></div>
              <div><p>{{damaEnterAll}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>排气系统</p></div>
              <div><p>{{damaExhSye}}</p></div>
            </div>
            <div>
              <div><p>变速箱</p></div>
              <div><p>{{damaTranCase}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>仪表</p></div>
              <div><p>{{damaMeter}}</p></div>
            </div>
            <div>
              <div><p>车灯</p></div>
              <div><p>{{damaAutoLig}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>电动后视镜</p></div>
              <div><p>{{damaPowerMi}}</p></div>
            </div>
              <div>
                <div><p>电动车椅</p></div>
                <div><p>{{damaEleSeat}}</p></div>
              </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>天窗</p></div>
              <div><p>{{damaSkylight}}</p></div>
            </div>
            <div>
              <div><p>启动机</p></div>
              <div><p>{{damaStaMach}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>操舵装置</p></div>
              <div><p>{{damaSteGear}}</p></div>
            </div>
            <div>
              <div><p>电动车窗</p></div>
              <div><p>{{damaEleWin}}</p></div>
            </div>
          </div>

        </div>
      </div>
      <!--外观损伤-->
      <div>
        <div class="InsRepTitle">
          <span></span>
          外观损伤
        </div>
        <p class="TestScore">
          <span>骨架损伤 检测师总体评分：</span>
          <el-rate
            v-model="Appear"
            disabled
            text-color="#ff9900">
          </el-rate>
        </p>
        <div class="table">
          <div class="InsRepLiTwo">
            <div>
              <div><p>后盖</p></div>
              <div><p>{{damaAir}}</p></div>
            </div>
            <div>
              <div><p>前保险杠</p></div>
              <div><p>{{damaGasbag}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>机盖</p></div>
              <div><p>{{damabraking}}</p></div>
            </div>
            <div>
              <div><p>左前门</p></div>
              <div><p>{{damaCenCon}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>左前叶子板</p></div>
              <div><p>{{damaCooSye}}</p></div>
            </div>
            <div>
              <div><p>左前轮</p></div>
              <div><p>{{damaDrive}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>左后门</p></div>
              <div><p>{{damaEngine}}</p></div>
            </div>
            <div>
              <div><p>左后叶子板</p></div>
              <div><p>{{damaEnterAll}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>左后轮</p></div>
              <div><p>{{damaExhSye}}</p></div>
            </div>
            <div>
              <div><p>后保险杠</p></div>
              <div><p>{{damaTranCase}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>右前门</p></div>
              <div><p>{{damaMeter}}</p></div>
            </div>
            <div>
              <div><p>右叶子板</p></div>
              <div><p>{{damaAutoLig}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>右前轮</p></div>
              <div><p>{{damaPowerMi}}</p></div>
            </div>
            <div>
              <div><p>右后门</p></div>
              <div><p>{{damaEleSeat}}</p></div>
            </div>
          </div>
          <div class="InsRepLiTwo">
            <div>
              <div><p>右后叶子板</p></div>
              <div><p>{{damaSkylight}}</p></div>
            </div>
            <div>
              <div><p>有后轮</p></div>
              <div><p>{{damaStaMach}}</p></div>
            </div>
          </div>
        </div>
      </div>


      <p class="TestScore">
        <span>骨架损伤 检测师总体评分：</span>
        <el-rate
          v-model="InteriorTrim"
          disabled
          text-color="#ff9900">
        </el-rate>
      </p>


    </div>
  </div>

</template>

<script>
export default {
  name: 'CarInsPre',
  data() {
    return {
      InBasicTuLi: ['http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg', 'http://img4.imgtn.bdimg.com/it/u=2153937626,1074119156&fm=26&gp=0.jpg'],
      InBaTuLiHover: 'InBaTuLiHover',
      InBasTuLiNum: '0',

      InsBasicData1: ['牌照所属', '行驶里程', '牌照类型', '厂商指导价'],
      InsBasicData2: ['闽C', '195882公里', '私牌', '10.49万'],

      //  评分小星星
      skeleton: 5, // 骨架
      device: 3, // 装置
      Appear: 1, // 外观
      InteriorTrim: 4, // 内饰

      MyCarLi: ['车辆信息', '车辆配置', '损伤明细', '维修保养记录'],
      SeTopLeNum: '0',
      SeTopLeCli: 'SeTopLeCli',

      //  基本信息
      irAppMile: '', // 表显里程
      irCarColo: '', // 车身颜色
      irLipla: '', // 车牌
      irCardTime: '', // 首次上牌时间
      irLichar: '', // 牌照性质
      irUsechar: '', // 使用性质
      irCarType: '', // 车辆类型
      irManCount: '', // 核定载人数
      irCarDoor: '', // 车门数
      irTransCount: '', // 过户次数
      irNewCarPre: '', // 新车指导价
      irSpeCar: '', // 特殊车辆

      //  证件信息
      irYearEffeDate: '', // 年检有效期
      irCertifiDate: '', // 发证日期
      irFactDate: '', // 年检有效期
      irComInsPer: '', // 交强险期
      irIsCarCo: '', // 车身颜色是否更改

      //  车辆配置
      isCarAppCo: '', // 外观颜色
      isGasbag: '', // 气囊
      isSwitchWin: '', // 电门车窗
      isCarGps: '', // 导航
      isInterCo: '', // 内饰颜色
      isCarabs: '', // abs
      isCarskyli: '', // 天窗
      isCarRadar: '', // 雷达
      isCarDispla: '', // 排量
      isCarElekey: '', // 电动钥匙数量
      isCarChair: '', // 座椅
      isCarViAuSty: '', // 影音系统
      isCargear: '', // 排档
      isCarManKey: '', // 手动钥匙数量
      isCarAwHub: '', // 铝合金轮毂
      isCarEleSeat: '', // 电动座椅
      isCarFuel: '', // 燃料
      isCarAirCon: '', // 空调
      isCarCruise: '', // 巡航
      isCarEhseat: '', // 电加热座椅
      isCarMeSeat: '', // 记忆座椅
      isCarSteAss: '', // 转向助力
      isCarDriMode: '', // 驱动方式
      isCarSpatire: '', // 备胎

      // 损伤明细
      damaAir: '', // 空调
      damaGasbag: '', // 气囊
      damabraking: '', // 制动
      damaCenCon: '', // 中控
      damaCooSye: '', // 冷却系统
      damaDrive: '', // 驱动
      damaEngine: '', // 发动机
      damaEnterAll: '', // 娱乐设配
      damaExhSye: '', // 排气系统
      damaTranCase: '', // 变速箱
      damaMeter: '', // 仪表
      damaAutoLig: '', // 车灯
      damaPowerMi: '', // 电动后视镜
      damaEleSeat: '', // 电动座椅
      damaSkylight: '', // 天窗
      damaStaMach: '', // 启动机
      damaSteGear: '', // 操舵装置
      damaEleWin: '', // 电动车窗


    };
  },
};
</script>

<style scoped lang="scss">
  .CarInsPre{
    margin-top: 64px;
    width: 100%;
  }
  .CarInsPreBox{
    width: 1180px;
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
  .CarInsBasic{
    width: 1180px;
    height: 561px;

  }
  .InsBasicbox{
    margin: 20px;
    width: 1180px;
    height: 520px;
  }
  .InBasicLe{
    width: 580px;
    height: 521px;
    float: left;
    /*background-color: red;*/
    position: relative;
  }
  .InBasicTu{
    width: 580px;
    height: 435px;
    background-color: gray;
  }
  .InBasicTu>img{
    width: 580px;
    height: 435px;
  }
  .InBasicTuLi{
    width: 580px;
    height: 66px;
    margin-top: 20px;
    overflow: hidden;
    position: relative;
  }
  .InBasicTuLi>ul{
    width: 1180px;
    height: 66px;
  }
  .InBasicTuLiLi{
    width: 88px;
    height: 66px;
    float:left;
    background-color: gray;
    margin-left: 10px;
    border: 2px solid #fff;
    /*box-sizing: border-box;*/
  }
  .InBaTuLiHover{
    border: 2px solid $ora;
  }
  .InBasicTuLi>ul>li>img{
    width: 88px;
    height: 64px;
  }
  .LeClick{
    width: 23px;
    height: 66px;
    background-color:#000000;
    background-color:rgba(0,0,0,0.5);
    line-height: 66px;
    font-size: 26px;
    text-align: center;
    color: #fff;
    position: absolute;
    left: 0;
  }
  .RiClick{
    width: 23px;
    height: 66px;
    background-color:#000000;
    background-color:rgba(0,0,0,0.5);
    line-height: 66px;
    font-size: 26px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
  }


  .InBasicRi{
    width: 540px;
    height: 363px;
    float: right;
    margin-right: 40px;
  }
  .InBasicRi>h3{
    font-weight: 400;
    font-size: 24px;
    color: #666;
  }
  .InBasicRiData{
    height: 52px;
    margin: 20px 0 0 20px;
  }
  .InBasicRiData li{
    height: 52px;
    float: left;
    text-align: center;
    color: #A2A7B2;
    font-size: 12px;
    margin-right: 25px;
  }
  .InBasicRiData li>span{
    color: #666666;
    font-size: 18px;

  }

  .GradeTile{
    width: 100%;
    height: 18px;
    margin: 20px 0 0 20px;
  }
  .GradeTile>div{
    width: 50%;
    height: 18px;
  }
  .GradeTile>div:nth-child(1){
    float: left;
  }
  .GradeTile>div:nth-child(2){
    float: right;
  }
  .GradeTile>div>p{
    color: #333;
    font-size: 12px;
  }
  .GradeTile>div>p>strong{
    display: inline-block;
    text-align: center;
    width: 27px;
    height: 16px;
    background-color: $ora;
    font-size: 12px;
    color: #fff;
  }
  .GradeTile>div>p>span{
    margin-left: 40px;
    color:$ora;
    cursor:pointer;
  }
  .GradeTile>div>span{
    color: $ora;
    cursor:pointer;
    font-size: 12px;
    line-height: 18px;
  }

  .InBaScore{
    width: 540px;
    height: 45px;
    font-size: 12px;
    color: #666666;
    margin: 10px 0 0 20px;
    border-bottom: 1px solid #f4f6f8;
  }
  .InBaScore>div{
    width: 160px;
    height: 22px;
    color:#333;
    font-size: 12px;
    float: left ;
  }
  .InBaScore>div>span{
    float: left;
  }
  .Sketch{
    width: 540px;
    margin: 20px 0 0 20px;
    border-bottom: 1px solid #f4f6f8;
    padding-bottom: 20px;
  }
  .Sketch>strong{
    font-weight: 400;
    font-size: 12px;
    color: #333;
  }
  .Sketch>p{
    color: #999;
    font-size: 12px;
  }

  .MyCarSeTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    margin-left: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .MyCarSeTopLe{
    width:800px;
    height: 40px;
    float: left;
  }
  .MyCarSeTopLe ul{
    width: 800px;
    height: 40px;
  }
  .MyCarSeTopLeLi{
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
  .MyCarSeTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }

  .BidButton{
    width: 230px;
    height: 40px;
    float: right;
    position: relative;
    top: -10px;
  }
  .BidButton>p{
    display: inline-block;
    height: 40px;
    width: 80px;
    text-align: right;
    font-size: 12px;
    color: #666666;
  }
  .BidButton>div{
    width: 140px;
    height: 40px;
    background-color: $ora;
    color: #fff;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
    cursor:pointer;
    float: right;
  }

  .InsRepTitle{
    width: 100%;
    height: 14px;
    text-align: left;
    color: #4A4A4A;
    font-size: 14px;
    margin: 20px 0 0 20px;
  }
  .InsRepTitle>span{
    display: inline-block;
    width: 5px;
    height: 14px;
    background-color: $ora;
    position: relative;
    top: 2px;
  }
  .InsRepHeader{
    font-size: 12px;
    color: #333;
    margin: 20px 0 20px 20px;
  }

  .InsRepLione{
    width: 1180px;
    height: 41px;
    margin-left: 20px;
    border-left: 1px solid #eceef0;
    border-top: 1px solid #eceef0;
  }
  .InsRepLione>div{
    width: 295px;
    height: 41px;
    float: left;
  }
  .InsRepLione>div>div{
    height: 41px;
    border-right: 1px solid #eceef0;
    line-height: 41px;
    color: #666666;
    font-size: 12px;
  }
  .InsRepLione>div>div>p{
    margin-left: 10px;
  }
  .InsRepLione>div>div:nth-child(1){
    width: 137px;
    float: left;
    background-color: #f9fafa;
  }
  .InsRepLione>div>div:nth-child(2){
    width: 149px;
    float: right;
  }

  .table>div:nth-last-child(1){
    border-bottom:1px solid #eceef0;
  }

  .TestScore{
    color: #333;
    font-size: 12px;
    margin: 20px  0 20px 20px;
  }
  .TestScore>span{
    float: left;
  }
  .InsRepLiTwo{
    width: 1180px;
    height: 41px;
    border-top: 1px solid #eceef0;
    border-left: 1px solid #eceef0;
    margin-left: 20px;

  }
  .InsRepLiTwo>div{
    width: 589px;
    height: 41px;
  }
  .InsRepLiTwo>div:nth-child(1){
    float: left;
  }
  .InsRepLiTwo>div:nth-child(2){
    float:right;
  }
  .InsRepLiTwo>div>div{
    border-right:1px solid #eceef0;
    height: 41px;
    float: left;
    line-height: 41px;
  }
  .InsRepLiTwo>div>div:nth-child(1){
    width: 114px;
    background-color: #F9FAFA;
  }
  .InsRepLiTwo>div>div:nth-child(2){
    width: 473px;
  }
  .InsRepLiTwo>div>div>p{
    margin-left: 10px;
    color: #666666;
    font-size: 12px;
  }


</style>
