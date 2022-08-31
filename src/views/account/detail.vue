<template>
  <div class="main">
    <navTag :isSub="true"  subtitle="修改权限" title="员工详情" @click="$router.push({name:'editAccount',query:{id:$route.query.id}})"></navTag>
    <div class="content">
      <md-scroll-view
       :scrolling-x="false"
       :scrolling-y="true"
       auto-reflow
      >
        <div class="info">
            <div class="infoLeft">
              <!-- 如果没有头像则显示名字最后一个字 -->
              <div class="avt" v-if="pic" :style="pic?{background:`url(${pic}) no-repeat center center`,backgroundSize: `cover`}:{}"></div>
              <div class="avt avtTxt" v-else>{{lxName.slice((lxName.length-1),(lxName.length))}}</div>
              <div class="other">
                <div class="name">{{lxName}}</div>
                <div class="bz"> {{sex==0?'男':'女'}}  {{lxPhone}}</div>
              </div>
            </div>
<!--            <div class="infoRight">-->
<!--                  <div class="count">98</div>-->
<!--                  <div class="t">周分享量</div>-->
<!--            </div>-->
        </div>
        <div class="clientList">
          <div class="hd">
            <span class="fl">负责客户</span>
           <span class="fr">
             查看全部
             <md-icon name="arrow-right"></md-icon>
           </span>
          </div>
          <div class="clientCard" v-for="item in list" :key="item.id">
              <div class="top">
                  <div class="tl">
                      <div class="state" v-if="item.followState==1">搁</div>
                      <div class="state state1" v-if="item.followState==0">持</div>
                      <div class="state state2" v-if="item.followState==2">预</div>
                      <div class="state state3" v-if="item.followState==3">成</div>
                      {{item.cusName?item.cusName:'还没沟通'}}
                  </div>
                  <div class="tr">
                    {{item.addTime}} 销售:{{lxName}}
                  </div>
              </div>
              <div class="ct">
                <div>
                   <i v-if="item.minBudget||item.maxBudget"> 预算： <span>{{item.minBudget}}万-</span>{{item.maxBudget}};</i>
                   <span v-if="item.vehicleInfo"> {{item.vehicleInfo.title}}</span>
                   <span v-else-if="item.brandName"> 意向车型：{{item.brandName}}</span>
                   <span v-else> 该客户暂无意向车型，请尽快联系跟进。</span>
                </div>
                <div>上次跟进：</div>
              </div>
          </div>
        </div>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                account:'',
                pic:'',
                lxName:'',
                lxPhone:'',
                sex: '',
                list:[]
            }
        },
        created(){
            this.getAcInfo();


        },
        methods: {
            async getAcInfo() {
              try{
                this.$toast.loading('加载中')
                let res = await this.$api.post('/bus/company/getAcInfo', 
                {id: this.$route.query.id})

              console.log(11111,res)

                const {success, data, info} = res.data;
                if (!success) {
                  this.$toast.failed(info);
                  this.$router.back()
                } else {
                  this.pic = data.pic;
                  this.lxPhone = data.lxPhone;
                  this.lxName = data.lxName;
                  this.sex = data.sex;
                  this.right = data.authority.split(",")
                  this.getAcAlient( data.companyId,data.id)
                }
                this.$toast.hide()
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },
            async getAcAlient(companyId,id){
              try{
                this.$toast.loading('加载中');
                const res = await  this.$api.post('/bus/company/getAcClient',{ companyId, id });
                const { success, data, info } = res.data;
                if(!success) return this.$toast.failed(info);
                this.list = data
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }

            }
        }
    }
</script>

<style scoped lang="scss">
.main{
  background:rgba(247,247,247,1);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
  .content{
    padding: 0 32px;
    box-sizing: border-box;
    height: 0;
    flex-grow: 1;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    .infoLeft{
      display: flex;
      .avt{
        width: 120px;
        height: 120px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        overflow: hidden;
      }
      .avtTxt{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: #fff;
        font-weight: bold;
        background: #FF4C4C;
        border: 1px solid #E3E5E5;
      }
      .name{
        font-size: 32px;
        font-weight: bold;
        line-height: 1;
      }
      .other{
        margin-left: 20px;
        margin-top: 20px;
      }
      .bz{
        color:#999;
        font-size: 28px;
        margin-top: 20px;
        line-height: 1;
      }
    }
    .infoRight{
      .count{
        font-size: 72px;
        font-weight: 500;
        line-height: 1;
      }
      .t{
        font-size: 24px;
        margin-top: 18px;
        line-height: 1;
      }
    }
  }
  .hd{
    .fl{
      float:left;
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
    .fr{
      float: right;
      font-size: 24px;
      color: #999;
      i{
        font-size: 20px;
        font-weight: bold;
        margin-left: 0px;
        color: #999;
      }
    }
    &:after{
      content: '';
      display: block;
      clear: both;
      zoom: 1;
    }
  }
  .clientList{
    margin-top: 100px;
    padding-bottom: 100px;
    .clientCard{
      width:686px;
      background:rgba(255,255,255,1);
      border-radius:16px;
      margin:20px auto;
      box-sizing: border-box;
      padding:20px;
      .top{
        line-height: 40px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        .tl{
          line-height: 40px;
          font-size: 32px;
          display: flex;
          align-items: center;
        }
        .tr{
          font-size: 24px;
          color:#999
        }
        .state{
          width: 40px;
          height: 40px;
          background: #D8D8D8;
          display: inline-block;
          margin-right: 20px;
          border-radius: 4px;
          color: #fff;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .state.state1{
          background: #FFB3B3;
        }
        .state.state2{
           background: #FF8080;
        }
        .state.state3{
           background: #FF4C4C;
        }

      }
      .ct{
        margin-top: 20px;
        color:#333;
        font-size: 28px;
        line-height: 1.5;
      }
    }
  }
</style>
