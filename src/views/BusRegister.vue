<template>

  <div class="BusRegister">
    <van-nav-bar
      @click-left="$router.go(-1)"
      left-arrow
      left-text=""
      title="注册"
    />
    <div class="BusRegisterBox">
      <div class="BusRegRi">
        <template v-if="active==1">
          <!--营业执照信息-->
          <!--          <div>-->
          <!--            <div class="BusRegRiTit">-->
          <!--              <span></span>-->
          <!--              营业执照信息-->
          <!--            </div>-->
          <!--            <div class="BusLicense">-->
          <!--              <div class="BusLicenseTu">-->
          <!--                <p>请确保以下信息与营业执照一致</p>-->
          <!--                <div class="BusLiTuImg">-->
          <!--                  <span><strong>*</strong>营业执照</span>-->
          <!--                  <el-upload-->
          <!--                    :before-upload="beforeAvatarUpload"-->
          <!--                    :data="{type:'company'}"-->
          <!--                    :on-success="handleAvatarSuccess"-->
          <!--                    :show-file-list="false"-->
          <!--                    action="https://api.1775.net.cn/common/upload"-->
          <!--                    class="avatar-uploader">-->
          <!--                    <img :src="imageUrl" class="avatar" v-if="imageUrl">-->
          <!--                    <i class="el-icon-plus avatar-uploader-icon" v-else></i>-->
          <!--                  </el-upload>-->
          <!--                  <p>请从电脑中上传营业执照</p>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--              &lt;!&ndash;营业执照名称 所在地区&ndash;&gt;-->
          <!--              <div class="BusLiInfor" style="clear: both;">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>营业执照名称:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="BusLiceName"></el-input>-->
          <!--                  <strong style="color: #F9712C;" v-if="BusLiceNameoff">{{BusNameNull}}</strong>-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>所在地区:</span>-->
          <!--                  <div style="width: 160px; float: left">-->
          <!--                    <el-cascader-->
          <!--                      :options="options"-->
          <!--                      @change="handleChange"-->
          <!--                      size="small"-->
          <!--                      v-model="RegLocation">-->
          <!--                    </el-cascader>-->
          <!--                  </div>-->
          <!--                  <strong style="color: #F9712C;" v-if="RegLocationoff">{{RegLocaNull}}</strong>-->

          <!--                </div>-->
          <!--              </div>-->
          <!--              &lt;!&ndash;详细地址  公司成立日期&ndash;&gt;-->
          <!--              <div class="BusLiInfor">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>详细地址:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegAddress"></el-input>-->
          <!--                  <strong style="color: #F9712C;" v-if="RegAddressoff">{{RegAddNull}}</strong>-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>公司成立日期:</span>-->
          <!--                  <el-date-picker-->
          <!--                    class="RegLiIpt"-->
          <!--                    placeholder="选择日期"-->
          <!--                    size="small"-->
          <!--                    type="date"-->
          <!--                    v-model="RegComestTime">-->
          <!--                  </el-date-picker>-->
          <!--                  <strong style="color: #F9712C;" v-if="RegComestTimeoff">{{RegTimeNull}}</strong>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--              &lt;!&ndash;营业执照号码  公司简称&ndash;&gt;-->
          <!--              <div class="BusLiInfor">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>营业执照号码:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegBusLiCen"></el-input>-->
          <!--                  <strong style="color: #F9712C;" v-if="RegBusLiCenoff">{{RegLiCenNull}}</strong>-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>公司简称:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegComSimName"></el-input>-->
          <!--                  <strong style="color: #F9712C;"-->
          <!--                          v-if="RegComSimNameoff">{{RegmSimNameNull}}</strong>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--联系人信息-->
          <!--          <div>-->
          <!--            <div class="BusRegRiTit">-->
          <!--              <span></span>-->
          <!--              联系人信息-->
          <!--            </div>-->
          <!--            <div class="BusLicense">-->
          <!--              &lt;!&ndash;联系人手机 联系人姓名&ndash;&gt;-->
          <!--              <div class="BusLiInfor">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>联系人手机:</span>-->
          <!--                  <el-input class="IphRegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegContactsIph"></el-input>-->
          <!--                  <div @click="ObtainYz" class="Obtain">获取验证码</div>-->
          <!--                  <strong style="color: #F9712C;" v-if="RegContactsIphoff">{{Iphnull}}</strong>-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>联系人姓名:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegContactsName"></el-input>-->
          <!--                  <strong style="color: #F9712C;"-->
          <!--                          v-if="RegContactsNameoff">{{RegmConNameNull}}</strong>-->
          <!--                </div>-->
          <!--              </div>-->

          <!--              &lt;!&ndash;手机验证码&ndash;&gt;-->
          <!--              <div class="BusLiInfor">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>手机验证码:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入内容" size="small"-->
          <!--                            v-model="RegIphVerCode"></el-input>-->
          <!--                  <strong style="color: #F9712C;"-->
          <!--                          v-if="RegIphVerCodeoff">{{RegIphCodeNull}}</strong>-->
          <!--                </div>-->
          <!--              </div>-->

          <!--              <div class="BusLiInfor">-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>登录密码:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请输入密码" size="small" type="password"-->
          <!--                            v-model="pwd"></el-input>-->
          <!--                </div>-->
          <!--                <div>-->
          <!--                  <span><strong>*</strong>确认登录密码:</span>-->
          <!--                  <el-input class="RegLiIpt" placeholder="请确认刚才输入的密码" size="small" type="password"-->
          <!--                            v-model="repwd"></el-input>-->

          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!--  新的注册界面 -->
          <div class="view">
<!--             <p class="phone">输入手机号进行注册，作为登入账号</p>-->
            <div class="items">
              <p>手机号码</p>
              <input type="number" @click="isView=false" placeholder="输入手机号">
            </div>
            <div class="items">
              <p>手机验证码</p>
              <div class="code">
                <input type="number"  @click="isView=false"  placeholder="输入验证码">
                <span v-on:click="setInter" v-show="isCode">{{code}}</span>
                <span class="sec" v-show="!isCode">{{sec}}s</span>
              </div>
            </div>
            <div class="mt"></div>
            <div class="items">
              <p>联系人姓名</p>
              <input type="number"  @click="isView=false" placeholder="请输入联系人名称">
            </div>
            <div class="items">
              <p>登入密码</p>
              <div class="pw">
                <input :type="pw"  v-model="pwd" @click="isView=false"  placeholder="密码由英文和字母8位组成">
                <van-icon :name="eye" v-on:click="changePw" />
              </div>
            </div>
            <div class="items">
              <p>确认登入密码</p>
              <input type="password" v-model="repwd"  @click="isView=false"  placeholder="请再次输入密码">
            </div>
<!--            <van-cell-group>            -->
<!--              -->
<!--              <van-field-->
<!--                value=""-->
<!--                type="password"-->
<!--                label="确认登入密码"-->
<!--                placeholder="请再次输入密码"-->
<!--                input-align="right"-->
<!--                input-class="boder"-->
<!--              />-->
<!--            </van-cell-group>-->
          </div>
          <div class="fixbtn" v-show="hidshow">
            <p>
              <van-checkbox checked-color="#FF3434" icon-size="16px" shape="square"
                            value="false"></van-checkbox>
              <i> 我已阅读并同意<span>《1775实体车商网经销商服务协议》</span></i>
            </p>
            <div class="sub">确认注册</div>
          </div>


          <!--          <div class="Agree">-->
          <!--            <el-checkbox v-model="Agreeche"></el-checkbox>-->
          <!--            <span>我同意遵守 <strong @click="Read"> 《1775二手车网经销商服务协议》 </strong></span>-->
          <!--            <p style="color: #F9712C;" v-if="Agreecheoff">{{AgreecheNo}}</p>-->
          <!--          </div>-->
          <!--提交-->
          <!--          <div @click="RegSub" class="RegSub">-->
          <!--            提交信息-->
          <!--          </div>-->
        </template>
        <!--已经提交过注册等待审核结果的场景-->
        <template v-else>
          <div>
            <el-alert
              description="我们将在两个工作日内完成审核"
              show-icon
              title="您已经提交了申请,请等待我们的审核额结果"
              type="success">
            </el-alert>
          </div>
        </template>
      </div>


    </div>
  </div>


</template>

<script>
  import { provinceAndCityData } from 'element-china-area-data';

  export default {
    name: 'BusRegister',
    data() {
      return {

        pw: 'password',
        eye: 'closed-eye',
        code: '获取验证码',
        isCode: true,
        sec: 60,
        viewHeight: window.screen.height,
        isView: true,
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hidshow:true,
        pwd: '', // 密码
        repwd: '', // 确认密码
        options: provinceAndCityData,
        RegLocation: [], // 所在地区 // 三级联动
        area: '',
        imageUrl: '',

        BusLiceName: '', // 营业执照名称

        RegAddress: '', // 详细地址
        RegComestTime: '', // 公司成立日期
        RegBusLiCen: '', // 营业执照号码
        RegComSimName: '', // 公司简称
        RegContactsIph: '', // 联系人手机
        RegContactsName: '', // 联系人名字
        RegIphVerCode: '', // 验证码
        PerName: '', // 个人姓名
        PerId: '', // 身份证
        PerIdExTime: '', // 身份证过期日期
        Agreeche: false,

        BusLiceNameoff: false, // 营业执照名称
        RegLocationoff: false, // 所在地区
        RegAddressoff: false, // 详细地址
        RegComestTimeoff: false, // 公司成立日期
        RegBusLiCenoff: false, // 营业执照号码
        RegComSimNameoff: false, // 公司简称
        RegContactsIphoff: false, // 联系人手机
        RegContactsNameoff: false, // 联系人名字
        RegIphVerCodeoff: false, // 验证码
        Agreecheoff: false, // 是否同意


        BusNameNull: '请输入营业执照名称',
        RegLocaNull: '请填写所在地区',
        RegAddNull: '请填写详细地址',
        RegTimeNull: '请填写公司成立日期',
        RegLiCenNull: '请填写营业执照号码',
        RegmSimNameNull: '请填写营业公司简称',
        Iphnull: '请输入联系人手机',
        RegmConNameNull: '请填写联系人姓名',
        RegIphCodeNull: '请填写手机验证码',
        AgreecheNo: '请阅读并同意二手车经销商服务协议',
        PerNameNull: '请填写姓名',
        PerIdNull: '请填写身份证',
        PerIdExTimeNull: '请填写身份证到期日',

        RegLocationData: [
          {
            value: 'beijing',
            label: '北京',
            children: [{
              value: 'beijing',
              label: '北京',
              children: [{
                value: 'chaoyang',
                label: '朝阳区',
              }, {
                value: 'changping',
                label: '昌平区',
              }, {
                value: 'daxing',
                label: '大兴区',
              }, {
                value: 'dongcheng',
                label: '东城',
              }],
            }],
          },
          {
            value: 'guangxi',
            label: '广西',
            children: [{
              value: 'beihang',
              label: '北海',
              children: [{
                value: 'haicheng',
                label: '海城区',
              }, {
                value: 'hepu',
                label: '合浦区',
              }, {
                value: 'tieshangang',
                label: '铁山港区',
              }, {
                value: 'yinhai',
                label: '银海区',
              }],
            }, {
              value: 'nanning',
              label: '南宁',
              children: [{
                value: 'binyang',
                label: '宾阳县',
              }, {
                value: 'hengxian',
                label: '横县',
              }],
            }],
          },
        ], // 所在地区数据
      };
    },
    watch:{
       isView:(bel)=>{
         if (bel==false){
           const inputs= document.querySelectorAll('input')
           inputs.forEach((item)=>{
                item.addEventListener('focus',(event)=>{
                  event.target.scrollIntoView(true)
                })
           } )
         }
       },
      //解决底部按钮浮动问题
      showHeight:function() {
        if(this.docmHeight > this.showHeight){
          this.hidshow=false
        }else{
          this.hidshow=true
        }
      }
    },
    computed: {
      active() {
        if (this.$store.state.company.state == 1) {
          return 2;
        }
        return 1;
      },
    },
    created() {
    },
    methods: {
      //显示密码
      changePw() {
        console.log(this.pw);
        if (this.pw == 'password') {
          this.pw = 'textarea ';
          this.eye = 'eye-o';
        } else {
          this.pw = 'password';
          this.eye = 'closed-eye';
        }
      },
      //倒计时
      setInter() {
        let interval;
        let time = 60;
        if (this.isCode) {
          this.isCode = false;
          interval = setInterval(() => {
            time--;
            this.sec = time;
            if (time < 1) {
              this.isCode = true;
              this.sec = 60;
              clearInterval(interval);

            }
          }, 1000);
        }
      },



      // 三级联动
      handleChange(value, text) {
        console.log(value);
        console.log(text);
        console.log(this.RegLocation);
        const _province = provinceAndCityData.find(r => r.value === value[0]);
        const province = _province.label;
        const city = _province.children.find(r => r.value === value[1]).label;
        console.log(city);
        this.area = province + city;
        console.log(this.area);
      },

      // 获取验证码
      async ObtainYz() {
        const res = await this.$api.get('getCode', {
          params: {
            phone: this.RegContactsIph,
          },
        });
        this.$message.success('发送成功请查收');
        console.log(res.data);
      },

      // 图片上传函数
      handleAvatarSuccess(res, file) {
        this.$toast.succeed('上传成功');
        setTimeout(() => this.imageUrl = res.data, 1000);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        const isLt2M = true;
        if (isJPG || isPNG) {
          console.log(111);
        } else {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },

      // 提交
      async RegSub() {
        // BusLiceName: '', // 营业执照名称
        //   RegLocation: '', // 所在地区
        //   RegAddress: '', // 详细地址
        //   RegComestTime: '', // 公司成立日期
        //   RegBusLiCen: '', // 营业执照号码
        //   RegComSimName: '', // 公司简称
        //   RegContactsIph: '', // 联系人手机
        //   RegContactsName: '', // 联系人名字
        //   RegIphVerCode: '', // 验证码

        // 营业执照名称
        if (this.BusLiceName === '') {
          this.BusLiceNameoff = true;
          return null;
        }
        this.BusLiceNameoff = false;

        // 所在地区
        if (this.RegLocation === '') {
          this.RegLocationoff = true;
          return null;
        }
        this.RegLocationoff = false;

        // 详细地址
        if (this.RegAddress === '') {
          this.RegAddressoff = true;
          return null;
        }
        this.RegAddressoff = false;

        // 公司成立日期
        if (this.RegComestTime === '') {
          this.RegComestTimeoff = true;
          return null;
        }
        this.RegComestTimeoff = false;

        // 营业执照号码
        if (this.RegBusLiCen === '') {
          this.RegBusLiCenoff = true;
          return null;
        }
        this.RegBusLiCenoff = false;

        // 公司简称
        if (this.RegComSimName === '') {
          this.RegComSimNameoff = true;
          return null;
        }
        this.RegComSimNameoff = false;

        // 联系人手机
        if (this.RegContactsIph === '') {
          this.RegContactsIphoff = true;
          return null;
        }
        this.RegContactsIphoff = false;

        // 联系人名字
        if (this.RegContactsName === '') {
          this.RegContactsNameoff = true;
          return null;
        }
        this.RegContactsNameoff = false;

        // 验证码
        if (this.RegIphVerCode === '') {
          this.RegIphVerCodeoff = true;
          return null;
        }
        this.RegIphVerCodeoff = false;
        // 是否勾选
        if (this.Agreeche === false) {
          this.Agreecheoff = true;
          return null;
        }
        if (this.pwd !== this.repwd) {
          this.$message.error('两次密码输入不一致');
          return;
        }


        const res = await this.$api.post('companyReg', {
          type: '1',
          phone: this.RegContactsIph, // 手机号
          pwd: this.pwd, // 密码
          code: this.RegIphVerCode,
          lxPhone: this.RegContactsIph, // 联系电话
          lxName: this.RegContactsName, // 联系人
          licenceName: this.BusLiceName, // 经营许可证昵称
          address: this.RegAddress, // 地址
          area: this.area, // 地区
          licenceNum: this.RegBusLiCen, // 营业执照号码
          buildDate: Date.parse(new Date(this.RegComestTime)), // 公司成立日期
          companyName: this.RegComSimName, // 公司简称
          picPath: this.imageUrl,
          // IDcard: '1',
          // IDcardEnd: '1',
        });
        const { success, data, info } = res.data;
        if (success) {
          this.$message.success('注册成功,我们将在两个工作日内完成审核');
          this.$router.replace({ name: 'login' });
        } else {
          this.$message.error(info);
        }
      },


      Read() {
        this.$router.push({
          name: 'ServiceXy',
        });
      },
    },
    mounted() {
      // 重置浏览器界面大小的时候解决底部按钮浮动问题
      window.onresize = ()=>{
        return(()=>{
          this.showHeight = document.body.clientHeight;
          this.hidshow=true
        })()
      }
    }


  };
</script>

<style lang="scss" scoped>
   .view .van-button__text{
     display: inline-block;
     margin-left: vw(26);
     border-left: 1px solid #999;
     width: 35%;
     text-align: center;
   }
   .active .van-button__text{
     color: #666;
   }
  .van-nav-bar {
    background: #D52002 !important;
  }

  .van-nav-bar__title {
    color: #fff !important;
  }

  .van-icon-arrow-left:before {
    color: #fff;
  }

  .view {
    padding: 0 vw(46);
    margin-top: vw(139);

    .phone {
      height: vw(40);
      font-size: vw(40);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(40);
      margin-top: vw(115);
    }
  }

  .items {
    display: flex;
    align-items: center;
    padding: vw(49) 0;
    font-size: vw(40);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    align-items: center;
    border-bottom: 1px solid #ebedf0;
    justify-content: space-between;

    input {
      text-align: right;
      border: none;
      color: #333;
      width: 70%;
    }

    input::placeholder {
      color: #999;
    }

    .code {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70%;

      input {
        width: 60%;
      }

      span {
        display: inline-block;
        /*padding-left: vw(26);*/
        border-left: 1px solid #999;
        margin-left: vw(29);
        color: #34CCFF;
        line-height: 1;
        width: 35%;
        text-align: center;

      }

      span.sec {
        color: #666;
      }
    }

    .pw {
      width: 80%;
      display: flex;
      align-items: center;

      input {
        width: 90%;
      }

      i {
        margin-left: vw(30);
      }
    }
  }

  .van-cell {
    padding: vw(49) 0 !important;
    font-size: vw(40) !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1) !important;
    align-items: center;
  }

  .van-button--small {
    height: vw(40) !important;
    line-height: vw(40) !important;
    padding: 0 !important;
    font-size: vw(40) !important;
    background: #fff;
    border: none !important;
    color: #34CCFF !important;
  }

  .van-field__control {
    font-size: vw(40) !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1) !important;

  }

  .van-cell__title, .van-cell__value {
    height: vw(40);
    line-height: vw(40);
  }

  .van-cell:not(:last-child)::after {
    left: 0 !important;
  }

  [class*=van-hairline]::after {
    border-bottom: 1px solid #ebedf0 !important;
  }

  .van-field__button {
    padding-left: vw(26) !important;
    margin-left: vw(29);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  .mt {
    width: 100%;
    height: 1px;
    margin-bottom: vw(120);
  }

  .fixbtn {
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    text-align: center;

    p {
      display: flex;
      align-items: center;
      height: vw(58);
      font-size: vw(35);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(58);
      margin-bottom: vw(58);
      justify-content: center;

      span {
        color: #34CCFF;
      }

      i {
        margin-left: vw(29);
        font-style: normal;
      }
    }

    .sub {
      width: vw(737);
      height: vw(115);
      background: rgba(255, 52, 52, 1);
      border-radius: vw(23);
      margin: 0 auto vw(58);
      line-height: vw(115);
      font-size: vw(46);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

  }


  .BusRegister {
    width: 100%;
    background-color: #fff;
    height: 100%;
  }

  .BusRegisterBox {
    margin: 0 auto;
    /*height: 100%;*/
  }

  .BusRegLeft {
    width: 190px;
    height: 1000px;
    float: left;
    position: relative;
  }

  .BusRegLeft > ul {
    width: 140px;
    height: 127px;
    margin-top: 20px;
    float: right;
  }

  .BusRegLeft > ul > li {
    width: 140px;
    height: 21px;
    line-height: 21px;
    text-align: left;
    font-size: 14px;
    margin-bottom: 32px;
  }

  .RegLeftLi {
    color: #666666;
  }

  .RegStep {
    color: $ora;
  }

  .StepBar {
    height: 158px;
    position: absolute;
    top: 18px;
    left: 0;
    color: #000;
  }

  .verLine {
    width: 10px;
    height: 100%;
    background-color: #e9e9e9;
    float: left;
  }

  .BusRegRi {
    height: 100%;
    overflow: auto;

    & > div {

    }
  }

  .BusRegRiTit {
    color: #4A4A4A;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .BusRegRiTit > span {
    display: inline-block;
    width: 4px;
    height: 4px;
    position: relative;
    top: -2px;
    background-color: $ora;
    margin-right: 5px;
  }

  .EditionCla {
    width: 555px;
    height: 26px;
    margin: 20px 0;
    line-height: 26px;
    color: #4A4A4A;
    font-size: 12px;
  }

  .EditionCla > span {
    display: inline-block;
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: right;
    float: left;
    margin-right: 5px;
  }

  .EditionCla > span > strong {
    color: $ora;
    margin-right: 5px;
  }

  .EditionCla > ul {
    width: 450px;
    height: 26px;
    float: left;
  }

  .EdiClaLi {
    width: 76px;
    height: 26px;
    text-align: center;
    border: 1px solid #e3e3e3;
    float: left;
    margin-left: 10px;
    cursor: pointer;
  }

  .EdiClaCli {
    color: $ora;
    border: 1px solid $ora;
  }

  .BusLicense {
    width: 100%;
  }

  .BusLicenseTu {
    width: 100%;
    height: 190px;
    color: #666;
    font-size: 12px;
    margin: 0 0 0 15px;
  }

  .BusLiTuImg {
    width: 300px;
    height: 200px;
    float: left;
  }

  .BusLiTuImg > span {
    display: inline-block;
    width: 80px;
    height: 26px;
    text-align: right;
    line-height: 26px;
    float: left;
    margin-right: 20px;
  }

  .BusLiTuImg > span > strong {
    color: $ora;
    margin-right: 5px;
  }

  .avatar-uploader {
    width: 168px;
    height: 120px;
    margin-top: 10px;
    background-size: 168px 120px;
  }

  .avatar-uploader, .el-upload {
    border: 1px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader:hover, .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .BusLiTuImg > p {
    margin-top: 10px;
    margin-left: 120px;
  }

  .BusLiInfor {
    width: 100%;

    margin-bottom: 20px;
  }

  .BusLiInfor > div {
    height: 36px;
    margin-bottom: 8px;
    overflow: hidden;
  }

  .BusLiInfor > div > span {
    display: inline-block;
    width: 100px;
    text-align: right;
    height: 26px;
    color: #666666;
    font-size: 12px;
    line-height: 26px;
    margin-right: 5px;
    float: left;
  }

  .BusLiInfor > div > strong {
    font-weight: 400;
    margin-left: 10px;
    font-size: 12px;
    line-height: 26px;
  }

  .BusLiInfor > div > span > strong {
    color: $ora;
    margin-right: 5px;
  }

  .RegLiIpt {
    width: 220px;
    height: 36px;
  }

  .IphRegLiIpt {
    width: 130px;
    height: 36px;
    float: left;
  }

  .Obtain {
    width: 66px;
    height: 26px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 26px;
    float: left;
    margin-left: 2px;
    background-color: $ora;
    margin-top: 1px;
    cursor: pointer;
  }

  .Iphnull {
    color: $ora;
  }

  .Agree {
    height: 40px;
    line-height: 26px;
    width: 300px;
    margin-left: 20px;
    color: #666;
    font-size: 12px;
  }

  .Agree > span {
    position: relative;
    left: -10px;
  }

  .Agree > span > strong {
    color: $ora;
    cursor: pointer;
    font-weight: 400;
  }

  .RegSub {
    height: 40px;
    background-color: $ora;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
    margin-top: 40px;
    cursor: pointer;
  }


</style>
