<template>
  <div class="Password">
    <div class="PasswordBox">
      <div class="PassLi">
        <div class="PassLiFon">
          修改密码
        </div>
        <div class="PassLibtn">
          <span @click="ReturnRouter">返回</span>
        </div>
      </div>
      <div class="passTips">
        <p>为了保证您的账号资产安全，保护车源，员工，客户信息不被盗取，需按以下要求修改密码。</p>
        <p>密码长度：8-25位，需数字+字母组合，不支持（+）符号。</p>
      </div>
      <div class="passFrom">
        <div>
          <strong>*</strong>
          <span>旧密码:</span>
          <el-input v-model="Oldpwd"  class="checkSele" size="mini" show-password placeholder="请输入旧密码"></el-input>
        </div>
        <div>
          <strong>*</strong>
          <span>新密码:</span>
          <el-input v-model="Newpwd"  class="checkSele" size="mini" show-password placeholder="请输入新密码"></el-input>
        </div>
        <div>
          <strong>*</strong>
          <span>再次输入:</span>
          <el-input v-model="Againpwd"  class="checkSele" size="mini" show-password placeholder="请再次输出新密码"></el-input>
        </div>
        <p v-if="Tips">提示:{{Tips}}</p>
      </div>
      <div class="passbtn" @click="AgainpassBtn">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  data() {
    return {
      Oldpwd: '',
      Newpwd: '',
      Againpwd: '',
      Tips: '',
      formRouter: '',
    };
  },
  methods: {
    async AgainpassBtn() {
      if (this.Oldpwd === this.Newpwd) {
        this.Tips = '旧密码不能与新密码相同';
      } else if (this.Newpwd != this.Againpwd) {
        this.Tips = '再次输入密码有误';
      } else if (this.Oldpwd == '' || this.Newpwd == '' || this.Againpwd == '') {
        this.$message.warning('请填写完整信息');
        return null;
      } else {
        const res = await this.$api.post('companyUpdatePwd', {
          id: this.$store.state.company.id, // 用户id
          oldPwd: this.Oldpwd, // 旧密码
          newPwd: this.Newpwd, // 新密码
        });
        const { success, data, info } = res.data;

        this.Tips = '';
        if (success) {
          this.$message.success('修改成功，需重新登录');
          this.$store.commit('logOut');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          this.$message.error(info);
        }
      }
    },
    ReturnRouter() {
      this.$router.replace({name:'Home'});
    },
  },
  beforeRouteEnter(to, from, next) {
    next();
  },


};
</script>

<style scoped lang="scss">
  .Password{
    margin-top: 64px;
    width: 100%;
  }
  .PasswordBox{
    width: 1140px;
    margin: 0 auto;
  }
  .PassLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .PassLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }

  .PassLibtn{
    height: 50px;
    width: 100px;
    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .PassLibtn>span{
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 14px;
    color: #fff;
    background-color: $ora;
    text-align: center;
    cursor:pointer;
  }
  .PassLibtn>span:hover{
    background-color: #ff9d37;
    color: #fff;
  }
  .passTips{
    margin-top: 20px;
    width: 100%;
  }
  .passTips>p{
    font-size: 12px;
    color: #333;
  }
  .passFrom{
    width: 256px;
  }
  .passFrom>div{
    height: 30px;
    margin-top: 20px;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .passFrom>p{
    margin-top: 10px;
    color: red;
    font-size: 12px;
    text-align: center;
  }
  .passFrom span{
  margin-left: 2px;
  display: inline-block;
  width: 55px;
  height: 30px;
  line-height: 30px;
  color: #666;
  font-size: 12px;
}
  .passFrom strong{
    color: #ff594b;
    height: 30px;
    font-size: 12px;
  }
  .passbtn{
    width: 140px;
    height: 40px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    line-height: 40px;
    background-color: $ora;
    font-weight: 600;
    margin-top: 10px;

  }
</style>
