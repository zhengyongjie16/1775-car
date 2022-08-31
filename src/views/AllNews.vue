<template>
  <!--1-->
      <div class="AllNews">
         <div class="AllNewsBox">
           <div class="AllNewsLeft">
             <div class="AllNewsLeftLi">
               <div>
                 <i class="el-icon-menu"></i>
                 全部消息
               </div>
               <div v-for="(item,r) in NewsLi" :class="NewsNum==r?NewsClick:''" @click="NewsNum=r">
                 <div class="NewsLeftLiTop">{{item}}
                   <i class="el-icon-caret-top" :style="NewsNum==r?Rotate:''"></i>
                 </div>
                 <div class="NewsLeftLiData" v-if="NewsNum==r">违规警告</div>
               </div>
             </div>

             <div class="NewLine"></div>
           </div>
           <div class="AllNewsRi">
             <div class="AllNewsRiTop">
               <!--发布时间 ReleaseTime-->
               <div>
                 <span>发布时间:</span>
                 <el-date-picker
                   class="checkSeleDate"
                   size="mini"
                   v-model="NewsReleaseTime"
                   type="daterange"
                   :default-time="['00:00:00', '23:59:59']">
                 </el-date-picker>
               </div>
               <div>
                 <span>快速查询:</span>
                 <el-input class="checkSele" v-model="NewsSelect" size="mini" placeholder="请输入内容"></el-input>
               </div>
             </div>
             <div class="newRow"></div>

             <div class="AllNewsLi">
               <div class="AllNewsLiTitle">
                 <p>全部消息 <span>(共95条, <strong>12</strong>)未读</span></p>
                 <p style="float: right;cursor: pointer;"><strong>全标已读</strong></p>
               </div>
               <div class="AllNewsLiData">
                 <ul>
                   <li>
                     <div class="NewsLiDataLe">
                       <div class="Unread"></div>
                       <span>2019-05-09</span>
                       <p>10:02</p>
                     </div>
                     <div class="NewsLiDataRi">
                       <div class="LiDataRitop">
                         <div class="LiDataSign">本地个人车源</div>
                         <h3>本地个人车源线索</h3>
                       </div>
                       <div class="LiDataRiTu">
                         <div class="LiDataRiTuLe"></div>
                         <div class="LiDataRiTuFont">老板，有本地车源线索</div>
                       </div>
                       <div class="LiDatabtn">查看详细</div>
                     </div>
                   </li>
                 </ul>
               </div>
             </div>

           </div>

         </div>
      </div>
</template>

<script>
export default {
  name: 'AllNews',
  data() {
    return {
      NewsLi: ['车辆动态', '客户信息', '店铺动态', '赢+小秘'],
      NewsNum: '-1',
      NewsClick: 'NewsClick',
      Rotate: { transform: 'rotate(180deg)'},

      NewsReleaseTime: '',
      NewsSelect: '',
    };
  },
};
</script>

<style scoped lang="scss">
  .AllNews{
    width:100%;
    margin-top: 64px;
  }
  .AllNewsBox{
    width: 1180px;
    margin: 0 auto;
  }

  .AllNewsLeft{
    width: 200px;
    height: 520px;
    background-color: #fff;
    float: left;
    position: relative;
  }
  .AllNewsLeftLi>div:nth-child(1){
    height: 66px;
    line-height: 66px;
    font-size: 20px;
  }
  .AllNewsLeftLi>div{
    margin-left: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  .NewsLeftLiTop{
    height: 66px;
    line-height: 66px;
    font-size: 14px;
  }
  .NewsLeftLiTop i{
    transition: all .5s;
  }
  .NewsLeftLiData{
    width: 100%;
    height: 22px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666666;
    cursor:pointer;
  }


  .NewsClick{
    color: $ora;
  }

  .NewLine{
    float: left;
    width: 10px;
    height: 100%;
    background-color: #F4F6F9;
    position: absolute;
    top: 0;
    right: -10px;
  }

  .AllNewsRi{
    width: 980px;
    float: right;
  }
  .AllNewsRiTop{
    width: 100%;
    height: 66px;
    background-color: #fff;
    line-height: 66px;
  }
  .AllNewsRiTop>div{
    margin-left: 10px;
    width: 240px;
    height: 44px;
    float: left;
    color: #666;
    font-size: 12px;
  }
  .AllNewsRiTop>div span{
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

  .newRow{
    width: 100%;
    height: 10px;
    background-color: #F4F6F9;
  }
  .AllNewsLi{
    width: 100%;
  }
  .AllNewsLiTitle{
    width: 800px;
    height: 35px;
    background-color: #fff;
    color: #666;
    margin-top: 20px;
    margin-left: 20px;
    border-bottom: 1px solid #eee;
  }
  .AllNewsLiTitle p{
    display: inline-block;
    font-size: 14px;

  }
  .AllNewsLiTitle span{
    font-size: 12px;
  }
  .AllNewsLiTitle strong{
    font-size: 12px;
    color: $ora;
    font-weight: 400;
  }
  .AllNewsLiTitle strong:hover{
    color: #ffaf2b;
  }

  .AllNewsLiData{
    width: 800px;
    margin-top: 20px;
    margin-left: 20px;
    background-color: #fff;
  }
  .AllNewsLiData li{
    width: 100%;
    height: 124px;
  }
  .NewsLiDataLe{
    float: left;
    width: 80px;
    height: 40px;
    font-size: 12px;
    color: #666666;
    text-align: right;
    margin-right: 10px;
  }
  .Unread{
    width: 5px;
    height: 5px;
    background-color: $ora;
    border-radius:50%;
    position: relative;
    top: 25%;

  }

  .NewsLiDataRi{
    width: 655px;
    height: 100%;
    float: left;
  }
  .LiDataRitop{
    width: 100%;
    height: 16px;
    margin-bottom: 10px;
  }
  .LiDataRitop>div{
    float: left;
  }
  .LiDataSign{
    width:80px;
    height: 15px;
    font-size: 12px;
    line-height: 15px;
    color: #2873ff;
    background-color: #e2ecff;
    text-align: center;
    border-radius:2px;
  }
  .LiDataRitop>h3{
    font-size: 14px;
    font-weight: 400;
    position: relative;
    top: -5px;
    left: 15px;
    color: #666666;
  }

  .LiDataRiTu{
    width: 100%;
    height: 60px;
  }
  .LiDataRiTuLe{
    width: 80px;
    height: 60px;
    background-color: gray;
    float: left;
    margin-right: 10px;
  }
  .LiDataRiTuFont{
    color: #666666;
    font-size: 12px;
  }
  .LiDatabtn{
    width: 78px;
    height: 26px;
    background-color: #FF8E2F;
    border-radius: 2px;
    line-height: 26px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    cursor:pointer;
    margin-top: 10px;
  }
  .LiDatabtn:hover{
    background-color: $ora;
  }

</style>
