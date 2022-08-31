<template>
  <div class="main">
    <navTag :title="title" :isSub="isSub"></navTag>
    <div class="content">
      <div class="body">
        <div class="item">
          <p>原登录密码</p>
          <div class="pw">
            <input :type="pwType" v-model="oldPwd"  @focus="isFous=true" @blur="isFous=false"   placeholder="请输入原登录密码">
            <md-icon :name="pwIcon" @click="changeType"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>新登录密码</p>
          <div class="pw">
            <input :type="pwType1" v-model="newPwd"  @focus="isFous=true" @blur="isFous=false"   placeholder="密码由英文和字母8位组成">
            <md-icon :name="pwIcon1" @click="changeType1"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>确认登录密码</p>
          <input placeholder="请再次确认登录密码" v-model="newPwd1"  @focus="isFous=true" @blur="isFous=false" type="password">
        </div>
      </div>
      <div class="foot">
        <div class="btn" @click="accountReg" >确认修改</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { check } from '../../assets/js/js'
  export default {

    name: 'Registered',
    data() {
      return {
        title: '修改密码',
        isShare: false,
        isSub: false,

        pwType: 'password',
        pwIcon: 'invisible',

        pwType1: 'password',
        pwIcon1: 'invisible',
        isFous: false,

        oldPwd:'',
        newPwd:'',
        newPwd1:'',
        screenHeight: document.documentElement.clientHeight, // 屏幕高度
        screenHeight1: document.documentElement.clientHeight, // 屏幕高度
      };
    },
    components: {},
      created(){
        this.type = this.$route.query.type
      },
    mounted(){

    },
    watch: {
      isFous:(value)=>{
        if(value){
          let inputs= document.querySelectorAll('input')
          for (const item of inputs) {
            item.addEventListener('focus', (event) => {
              event.target.scrollIntoView(true);
            });
          }
        }
      }
    },
    methods: {
        objBlurFun(sDom, time = 300) {
            if (isIphone) {  // 如果是ios环境下
                let objs = document.querySelectorAll(sDom)   // 这里如果传入的是2个以上 需要用querySelectorAll() 同时
                for(const obj of objs){
                    this.objBlur(obj, time)                  //  需要遍历调用函数
                }

            }
        },
        objBlur(sDom, time = 300) {
            if (sDom) {
                sDom.addEventListener(
                    'focus',
                    () => {
                        document.addEventListener('touchend', e => {   // 这里的e非常重要，用来判断是否是点击了input表单
                            this.docTouchend(time, sDom, e)
                        })
                    },
                    false
                )
            }
        },
        // 元素失去焦点隐藏ihpone的软键盘
        docTouchend(time, sDom, e) {
            if (e.target != sDom) {     // 如果点击的是 屏幕空白处的情况下
                console.log(sDom)
                console.log(e.target)
                setTimeout(() => {
                    sDom.blur()      // 表单失去焦点  键盘就会自动收起

                    document.removeEventListener('touchend', this.docTouchend, false)   // 收起之后 移除监听器
                }, time)
            } else {
            }
        },
      async getCode() {
        if (!this.isCode) {
          let time = 60;
          if(!this.phone){
              this.$toast.info('请输入手机号',2000);
            return
          }
          if(!check(this.lxPhone)) return this.$toast.info('请输入正确的手机号',2000);
          let interval = setInterval(() => {
            if (time > 0) {
              time--;
              this.isCode = true;
              this.codeTxt = time + 's';
            } else {
              clearInterval(interval);
              this.codeTxt = '获取验证码';
              this.isCode = false;
            }
          }, 1000);
          let res = await this.$api.get('/common/getCode',{
            params:{
              phone:this.phone,
              date:Date.now()
            }
          })
          let { success } =res.data
          if(!success){
            this.$toast.info('请重新发送');
            clearInterval(interval);
            this.codeTxt = '获取验证码';
            this.isCode = false;
          }
        }
      },
      changeType() {
        if (this.pwIcon === 'invisible') {
          this.pwIcon = 'visible';
          this.pwType = 'text';
        } else {
          this.pwIcon = 'invisible';
          this.pwType = 'password';
        }
      },
        changeType1() {
            if (this.pwIcon1 === 'invisible') {
                this.pwIcon1 = 'visible';
                this.pwType1 = 'text';
            } else {
                this.pwIcon1 = 'invisible';
                this.pwType1 = 'password';
            }
        },
      onChange(check){
        this.checked=check
      },
      checkPw(){
         if(this.newPwd.length<5){
           this.$toast.info('密码长度不能小于5')
         }
      },
      checkPw1(){
        if(this.newPwd!==this.newPwd1){
          this.$toast.info('密码不一致，请重新输入！')
          this.newPwd1=''
        }
      },
      async accountReg(){
         if(this.$store.state.ac.account) return this.$toast.info('您没有权限修改密码！',1000);
         if(!this.oldPwd) {
             return this.$toast.info('请输入旧密码')
         }
        if(!this.newPwd||!this.newPwd1){
            return this.$toast.info('请输入新密码')
        }else{
            this.checkPw1()
        }
        let id = '';
        if(this.$store.state.company.accountType){
            id =this.$store.state.company.id
        }else {
           id  = this.$store.state.company.id
        }
        let res = await this.$api.post('/bus/changePwd',{
            oldPwd:this.oldPwd,
            newPwd:this.newPwd,
            id,
            isAccount: this.$store.state.company.accountType,
        });
        let { success,info } = res.data;
        if(!success){
          this.$toast.info(info);
        }else {
          this.$toast.info('修改成功');
          this.$router.go(-1);
        }
      }

    }
  };
</script>
<style lang="scss" scoped>
  .main {
    background: #fff;
  }
  input, textarea {
    background: #F7F7F7;
  }
  /* 主要内容 */
  .content {

    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .body {
    padding: 0 vw(36);
    height: 0;
    flex-grow: 1;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: vw(100);
    background: #F7F7F7;
    box-sizing: border-box;
    border-radius: vw(16);
    margin-bottom: vw(26);
    padding:0 vw(20) ;
    p {
      height: vw(28);
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
    }

    input {
      border: none;
      color: #333;
      font-size: vw(28);
      height: vw(100);
      line-height: vw(100);
      width: 70%;
      text-align: right;
      outline: none;
    }

    .code {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 0;
      flex-grow: 1;

      input {
        width: 0;
        flex-grow: 1;
      }

      i {
        margin: 0 vw(18);
        font-size: vw(28);
        color: rgba(0, 0, 0, 0.1);
      }

      span {
        display: block;
        font-size: vw(28);
        color: #34CCFF;
        width: vw(150);
        text-align: center;
      }

      span.act {
        color: #666;
      }
    }

    .pw {
      width: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      i {
        font-size: vw(28);
        margin-left: vw(20);
      }
    }
  }

  .item:first-child {
    margin-top: vw(20);
  }

  .mtop {
    margin-top: vw(84);
  }

  input::placeholder {
    color: #999;
  }

  .foot{
    text-align: center;
    p{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: vw(24);
      color: #666;
      >>>.md-agree-icon{
        width: vw(30);
        height: vw(30);
      }
      a{
        text-align: left;
        margin-left: vw(-10);
      }
      span{
        color: #34CCFF;
      }
      i{
        display: block;
        width: vw(40);
        height: vw(40);
        border-radius: vw(8);
        border: 1px solid rgba(0,0,0,0.1);
        box-sizing: border-box;
        margin-right: vw(20);
      }
    }
  }
  .btn {
    width: vw(512);
    height: vw(80);
    background: #FF3434;
    border-radius: vw(16);
    margin: vw(40) auto vw(40);
    line-height: vw(80);
    text-align: center;
    color: #fff;
    font-size: vw(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  /*  时间选择样式 */
  .md-popup-title-bar .title-bar-title p.title {
    font-size: vw(40);
  }
</style>
