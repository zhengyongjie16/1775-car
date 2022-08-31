<template>
    <div class="nav">
      <md-icon name="arrow-left"  @click="goBack" ></md-icon>
      <div class="navTabs">
        <div v-for="item in tabs" :key="item.value" :class="[item.value===currentValue?'active':'']" @click="handleChange(item)">
          {{item.name}}
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'navTag',
    props:{
      tabs: {
        type: Array,
        default(){
          return [
            { value:1, name:'我的联盟' },
            { value:2, name: '我的车库' }
          ]
        }
      },
       current:[String, Number]
    },
    data(){
      return {
        currentValue:null
      }
    },

    created() {
      this.currentValue  = this.current;
    },
    methods:{
      handleChange(item){
        this.currentValue = item.value
        this.$emit('change',item)
      },
      goBack(){
          this.$router.go(-1)
      }
    }

  };
</script>

<style scoped lang="scss">
   .nav{
     display: flex;
     padding: 0 4%;
     width: 92%;
     align-items: center;
     justify-content: space-between;
     background: #fff;
     color: #444;
     position: relative;
     height: vw(96);
     .navTabs{
       position: absolute;
       line-height: vw(96);
       height: vw(96);
       width: 100%;
       top:0;
       left:0;
       display: flex;
       justify-content: center;
       font-size: vw(36);
       &>div{
         padding:0 vw(20);
         box-sizing: border-box;
         position: relative;
         /*color:#fff;*/
         line-height: vw(96);
       }
       &>div.active{
         font-weight: 600;
       }
       &>div.active:after{
         position: absolute;
         font-weight: 600;
         width: 100%;
         transform-origin: 50% 0;
         transition: width 300ms;
       }

       &>div:after{
         content:"";
         width: 0;
         height: vw(8);
         position: absolute;
         left:50%;
         transform: translateX(-50%);
         bottom:0;
         background: #fff;
       }
     }
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
       /*color:rgba(255,255,255,1);*/
       text-align: center;
     }
     i{
       font-size: vw(36)!important;
       /*color: #fff;*/
       position: relative;
       z-index: 9;
     }
     span{
       display: block;
       width: vw(40);
       height: vw(40);
       background: url("../assets/share.png") no-repeat center center;
       background-size: vw(40) vw(40);
     }
   }

</style>
