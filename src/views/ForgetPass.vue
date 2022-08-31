<template>
    <div class="ForgetPass">
      <div class="PassBox">
        <div class="PassBoxLi">
          <div class="PassBoxLiFon">
            忘记密码
          </div>
        </div>

        <div class="passFrom">
          <div>
            <span>手机号:</span>
            <el-input   class="checkSele" size="mini" v-model="phone" placeholder="请输入手机号"></el-input>
            <span class="ihpCode" @click="ihpCode">获取验证码</span>
          </div>
          <div>
            <span>验证码:</span>
            <el-input   class="checkSele" size="mini" v-model="code" placeholder="请输入验证码"></el-input>
          </div>
          <div>
            <span>新密码:</span>
            <el-input   class="checkSele" size="mini" v-model="newPwd" placeholder="请输入新密码"></el-input>
          </div>
          <span class="Tips">{{Tips}}</span>
        </div>

        <div class="okBtn" @click="okBtn">
          确定
        </div>


      </div>

    </div>
</template>

<script>
    export default {
        name: "ForgetPass",
      data(){
          return{
            phone:'', //手机号
            code:'',//验证码
            newPwd:'',//新密码
            Tips:'',
          }
      },
      methods:{
         async okBtn(){
          let res=await this.$api.post('companyForgetPwd',{
            phone:this.phone,
            code:this.code,
            newPwd:this.newPwd,
          })
            if(res.data.success){
              alert('修改成功')
              this.$router.push({
                name:'login'
              })
            }else{
              this.Tips = res.data.info;
            }

        },
        async ihpCode(){
          let res=await this.$api.get('getCode',{
            params:{
              phone:this.phone,
            }
          })
        }
      }

    }
</script>

<style scoped lang="scss">

  .ForgetPass{
    margin-top: 64px;
    width: 100%;
  }
  .PassBox{
    width: 1140px;
    margin: 0 auto;
  }
  .PassBoxLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
  }
  .PassBoxLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }

  .passFrom{
    width: 100%;
    height: 200px;
  }
  .passFrom>div{
    width: 100% ;
    height: 50px;
    line-height: 50px;
    color: #666666;
    font-size: 14px;
    float: left;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .ihpCode{
    width: 70px;
    height: 25px;
    display:inline-block;
    text-align: center;
    line-height: 25px;
    margin-left: 10px;
    color: #fff;
    font-size: 12px;
    background-color: $ora;
    cursor: pointer;
  }
  .okBtn{
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: $ora;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
  .Tips{
    color: $ora;
    font-size: 12px;
  }



</style>
