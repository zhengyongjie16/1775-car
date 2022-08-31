<template>
  <div class="main">
    <div class="content">
      <md-scroll-view
        :auto-reflow="true"
        :scrolling-x="false"
        :scrolling-y="true"
        ref="scrollView"
      >
    <div class="top">
      <div class="quit" @click="out"></div>
      <div class="head">
      <div class="img" :style="data.logo?{ background:`url(${data.logo}) no-repeat center center`, backgroundSize:`cover` }:{}"></div>
      <div class="data">
        <div class="name">
          <div class="title">{{data.companyName | company }}</div>
          <em></em>
        </div>
        <div class="lx">
          <span>{{data.lxName}}</span>
          <span>{{data.lxPhone}}</span>
        </div>
      </div>
      </div>
    </div>
    <div class="list">
      <div class="item" @click="$router.push({name:'MyCollect'})">
        <div class="name">
          我的收藏
        </div>
        <div class="right">
          <span>查看全部</span>
          <md-icon name="arrow-right"></md-icon>
        </div>
      </div>

      <div class="item" @click="$router.push({name:'Union'})">
        <div class="name">
          我的联盟
        </div>
        <div class="right">
        <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
    </div>
<!--    <div class="lable">账号管理</div>-->
    <div class="list">
      <div class="item" @click="$router.push({name:'Help'})">
        <div class="name">
          帮助中心
        </div>
        <div class="right">
          <span>查看全部</span>
          <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
      <div class="item"  @click="$router.push({name:'ChangeLx'})">
        <div class="name">
          设置联系人
        </div>
        <div class="right">
        <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
      <div class="item"  @click="$router.push({name :'Attest'})">
        <div class="name">
          车商认证
        </div>
        <div class="right">
<!--          <span :class="{checked:checked}" v-if="data.state==1">点击认证</span>-->
<!--          <span :class="{checked:checked}" v-if="data.state==2">点击修改</span>-->
          <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
      <div class="item" @click="$router.push({name:'ChangePwd',params: {}})">
        <div class="name">
          修改密码
        </div>
        <div class="right">
        <md-icon name="arrow-right"></md-icon>
        </div>
      </div>
    </div>
      </md-scroll-view>
    </div>
    <tab></tab>
  </div>
</template>

<script>
  import tab from "../../component/tab";
    export default {
        name: "my",
        data(){
            return{
                checked: true,
                data: '',
            }
        },
        components:{
          tab,
        },
        created(){
          this.getAccountInfo()
        },
        filters:{
            company:value=>{
                console.log(typeof (value))
                if(value==='NULL') return '请完善资料'
                return value
            }
        },
        methods:{
           async getAccountInfo(){
               let _res = await this.$api.get('/bus/getAccountInfo', {
                  params: {
                      id: this.$store.state.company.id,
                  }
               });
               let { success, data } = _res.data;
               if(!success) return this.$toast.info('获取数据失败');
               this.data = data
             const _isAc = window.localStorage.getItem('isAc');
               if(_isAc !='0'){
                 this.data.lxName = this.$store.state.ac.lxName
                 this.data.lxPhone = this.$store.state.ac.account
               }

           },
            out(){
                this.$store.commit('logOut');
                window.location.reload();
            },
            collect(){
               this.$toast.info('该功能暂不开放，敬请期待')
            }
        },

    }
</script>

<style scoped lang="scss">
  .main{
    height: 100%;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .content{
    height: 0;
    flex-grow: 1;
  }
  .top{
    width: 100%;
    height: 374px;
    position: relative;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 32px;
    background: url("../../assets/bg.png") no-repeat top right 48px;
    background-size: 572px 374px ;
    .quit{
      position: absolute;
      right: 34px;
      top: 108px;
      width: 36px;
      height: 36px;
      background: url("../../assets/out.png") no-repeat center center;
      background-size: 36px 36px;
    }
    .head{
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }
    .img{
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-right: 40px;
      background: #fff url("../../assets/logobg.png") no-repeat center center;
      background-size: cover;

    }
    .data{
      width: 0;
      flex-grow: 1;
      .name{
        display: flex;
        align-items: flex-start;
        .title{
          max-width: 60%;
          color: #333;
          font-size: 40px;
          line-height: 1.2;
        }
        em{
          display: block;
          width: 118px;
          height: 40px;
          background: url("../../assets/lable.png") no-repeat center center;
          background-size: 118px 40px;
          margin-left: 16px;
          margin-top: 8px;
        }
      }
      .lx{
        margin-top: 38px;
        font-size: 28px;
        color: #999;
      }
    }
  }
  .list{
    width: 686px;
    margin: 26px auto 0;
    background: #fff;
    border-radius: 16px;
    a.item{
      padding: 0;
    }
    .item{
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      width: 100%;
      .name{
        font-size: 32px;
        color: #333;
        font-weight: bold;
      }
    }
    .item:last-child{
      border-bottom: none;
    }
    .right{
      font-size: 24px;
      color: #999;
      display: flex;
      align-items: center;
      line-height: 24px;
      span{
        margin-right: 16px;
      }
      span.checked{
        color: #FF4C4C;
      }
    }
  }
  .list:last-child{
    margin-top: 120px;
    margin-bottom: 40px;
  }
  .lable{
    width: 686px;
    margin: 172px auto 6px;
    font-size: 32px;
    line-height: 36px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 0 20px;
  }
</style>
