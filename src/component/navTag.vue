<template>
    <div class="nav">
      <md-icon name="arrow-left" @click="$router.go(-1)"></md-icon>
      <p>{{title}}</p>
      <div>
        <i class="subTitle" v-show="isSub" @click="click" :style="{marginRight:marginRight}">{{subtitle}}</i>
        <span v-show="isShare"></span>
        <div v-show="client" class="addbtn" @click="$router.push({name:'AddClient',params: {}})">添加</div>
        <div v-show="relInfos" class="addbtn" @click="$router.push({name:'relInfos',params: {}})">发布</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'navTag',
    props:['title','isShare','subtitle','isSub','marginRight','client','relInfos'],
    data(){
      return{

      }
    },
    methods:{
      click(){
        this.$emit('click')
      }
    }
  };
</script>

<style scoped lang="scss">
   .nav{
     display: flex;
     padding: 0 vw(32);
     align-items: center;
     justify-content: space-between;
     background: $navBg;
     color: #333;
     position: relative;
     height: vw(96);
     z-index: 99;
     p{
       display: block;
       width: 60vw;
       position: absolute;
       left: 50%;
       margin-left: -30vw;
       top: 50% ;
       height: vw(40);
       margin-top: vw(-20);
       font-size:vw(36);
       line-height: vw(40);
       font-family:PingFangSC-Semibold,PingFang SC;
       font-weight:600;
       color:#333;
       text-align: center;
     }
     i{
       font-size: vw(36)!important;
     }
     div{
       display: flex;
       align-items: center;
     }
     span{
       display: block;
       width: vw(40);
       height: vw(40);
       background: url("../assets/share.png") no-repeat center center;
       background-size: vw(40) vw(40);
     }
     .subTitle{
       font-size: vw(32)!important;
       font-weight: normal;
     }
     .addbtn{
       width: 116px;
       height: 56px;
       border-radius: 8px;
       background: #FF4C4C;
       color: #fff;
       font-size: 32px;
       display: flex;
       align-items: center;
       justify-content: center;
     }
   }

</style>
