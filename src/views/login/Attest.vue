<template>
  <div class="main">
    <navTag :isSub="isSub" :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="item">
          <p>认证模式</p>
          <div class="itemType">
            <div :class="{active:carType==4}" @click="carType=4" class="chobtn">个体户</div>
            <div :class="{active:carType==1}" @click="carType=1" class="chobtn">企业</div>
          </div>
        </div>
        <div class="img" v-show="carType==1" v-if="state==1">
          <p class="name">上传营业执照照片</p>
          <div class="list">
            <div class="tag" @click="addPic('picPath')">
              <img :src="picPath" alt="" v-if="picPath" class="imgTag">
              <div v-else class="imgTag addTag" >
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
        <div :class="{vtop:carType==1}" class="img" v-if="state==1">
          <p class="name">上传身份证正反面照片</p>
          <div class="list">
            <div class="tag">
              <div class="imgTag addTag"  @click="addPic('IDCardFront')">
                <template v-if="IDCardFront">
                  <img :src="IDCardFront" alt="" v-if="picPath" class="imgTag">
                </template>
                <template v-else>
                  <span>+</span>
                </template>
              </div>
              <div class="imgTag addTag" @click="addPic('IDCardReverse')">
                <template v-if="IDCardReverse">
                  <img :src="IDCardReverse" alt="" v-if="picPath" class="imgTag">
                </template>
                <template v-else>
                  <span>+</span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <p class="tips" v-show="carType==1" v-if="state==1">确保以下信息与营业执照的信息一致</p>
        <div class="item" v-if="state==2">
          <p>原账号绑定号码</p>
          <input placeholder="请输入原账号绑定号码" v-model="oldphone">
        </div>
        <div class="item" v-if="state==2">
          <p>手机验证码</p>
          <div class="code">
            <input placeholder="请输入验证码" type="number" v-model="code">
            <div :class="{codeing:codeing}" @click="getCode" class="getCode">
              {{codeTxt}}
            </div>
          </div>
        </div>
        <div class="item mt" v-if="state==2">
          <p>新账号绑定号码</p>
          <input placeholder="请输入新账号绑定号码" type="number" v-model="phone">
        </div>
        <div class="item" v-if="state==1">
          <p>联系人姓名</p>
          <input placeholder="请输入联系人姓名" type="text" v-model="lxName">
        </div>
        <div class="item" v-if="state==1">
          <p>联系人手机</p>
          <input placeholder="请输入联系人手机" type="number" v-model="lxPhone">
        </div>
        <div class="img mt">
          <p class="name">上传店铺门头照片/logo</p>
          <div class="list">
            <div class="tag" @click="addPic('logo')">
              <img :src="logo" alt="" v-if="logo" class="imgTag">
              <div class="imgTag addTag" v-else >
                <span>+</span>
              </div>
            </div>
          </div>
        </div>

        <div class="item" v-show="carType==1" v-if="state==1">
          <p>公司名称</p>
          <input placeholder="请输入公司名称" type="text" v-model="licenceName">
        </div>
        <div class="item" v-show="carType==4" v-if="state==1">
          <p>车行名称</p>
          <input placeholder="请输入车行名称" type="text" v-model="licenceName">
        </div>
        <div class="item">
          <p>所在地区</p>
          <div @click="isPickerShow1 = true">
            <input disabled placeholder="请输入企业所在省、市、区(县)" type="text" v-model="area">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <div class="item">
          <p>详细地址</p>
          <input placeholder="请输入地址" type="text" v-model="address">
        </div>
        <div class="item" v-show="carType==1" v-if="state==1">
          <p>公司成立日期</p>
          <div @click="isDatePickerShow = true">
            <input disabled placeholder="请选择时间" type="text" v-model="buildDate">
            <md-icon name="arrow-right"></md-icon>
          </div>
        </div>
        <div class="item" v-show="carType==1" v-if="state==1">
          <p>营业执照号码</p>
          <input placeholder="请输入营业执照号码" v-model="licenceNum">
        </div>
        <div class="item" v-show="carType==1">
          <p>公司简称</p>
          <input placeholder="请输入公司的简称" type="text" v-model="companyName">
        </div>
        <div class="item" v-show="carType==4">
          <p>车行简称</p>
          <input placeholder="请输入车行简称" type="text" v-model="companyName">
        </div>
        <div :class="{mtop:carType==4}" @click="formSub" class="btn">
          提交认证
        </div>
        <div style="font-size: 12px;color:#999" @click="logout"> 重新登录 </div>

      </md-scroll-view>

    </div>

    <!--   时间选择器   -->
    <div class="timepiker">
    </div>
    <template>
      <md-date-picker
        :default-date="currentDate"
        :max-date="maxDate"
        @confirm="onDatePickerConfirm"
        ref="datePicker"
        title="公司成立日期"
        v-model="isDatePickerShow"
      ></md-date-picker>
      <md-picker
        :cols="3"
        :data="pickerData1"
        @confirm="onPickerConfirm(1)"
        is-cascade
        large-radius
        ref="picker1"
        title="选择地址"
        v-model="isPickerShow1"
      ></md-picker>
    </template>

  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import district from 'mand-mobile/components/picker/demo/data/district';
    import { check } from "../../assets/js/js";

    export default {
        name: 'Attest',
        data() {
            return {
                title: '企业认证',
                isShare: false,
                isSub: false,
                question: '',
                height: 6,
                currentDate: new Date(),
                maxDate: new Date(),
                isDatePickerShow: false,
                datePickerValue: '',
                isPickerShow1: false,
                pickerData1: district,  //地址选择器数据源
                pickerValue1: '',   //地址
                codeTxt: '获取验证码',

                codeing: false,
                carType: 1,  //1企业4个人
                state:1,
                oldphone: '', //之前绑定的手机号码
                code: '',  //验证码
                phone: '',  //新绑定的手机号码
                lxName: '',  //联系人姓名
                lxPhone: '', //联系人号码
                licenceName: '', //公司名称
                area: '',   //所在地区
                address: '',   //详细地址
                licenceNum: '', //营业执照号码
                companyName: '', //公司简称
                picPath: '',  //营业执照，为企业的时候上传
                logo: '',  //门头照或者logo，都上传
                IDCardFront: '', // 身份证正面，都上传
                IDCardReverse: '',// 身份证反面，都上传
                buildDate: '', //公司成立时间
            }
        },
        components: {
            navTag,
        },
        created(){
           this.getAccountInfo()
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            question: function (newQuestion) {
                if (newQuestion.length > 12) {
                    // console.log(newQuestion.length%12)
                    this.height = (Math.ceil(newQuestion.length / 12)) * 5.5
                }
            }
        },
        methods: {
          logout(){
            this.$store.commit('logOut');
            window.location.reload();
          },
            newUpload(fileURL,type) {
                return new Promise((resolve, reject) => {
                    const options = new FileUploadOptions();
                    options.fileKey = 'file';
                    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                    // options.mimeType = 'text/plain';
                    const params = {};
                    params.type = type;
                    options.params = params;
                    const ft = new FileTransfer();
                    console.log('ready to upload',params)
                    ft.upload(fileURL, encodeURI(`https://api.1775.net.cn/common/upload?r=${Math.random()}`), (res) => {
                        this.$toast.succeed('上传完成');
                        const { response, responseCode } = res;
                        const _res = JSON.parse(response);
                        if (responseCode == 200 && _res.success) {
                            setTimeout((_) => {
                                console.log('ffffffff',_res)
                                this[type] = _res.data;
                                try{
                                    this.$set(this[type],_res.data)
                                }catch (e) {

                                }
                                console.log(this[type])
                            }, 800);
                        }
                        resolve();
                    }, (err) => {
                        reject(err);
                    }, options, true);
                });
            },
            addPic(type) {
                // 打包的应用才能看到起效
                ImagePicker.getPictures(async (result) => {
                    console.log('pic is get ',result)
                    const arr = result.images;
                    for (const item of arr) {
                        await this.newUpload(item.uri,type);
                        this.$toast.succeed(' 上传完成')
                    }
                }, (err) => {
                }, {
                    maximumImagesCount: 1,
                    width: 1500,
                    quality: 80,
                });
            },
            CarTuLoad(res, file, fileList) {
                if (!res.success) return this.$message.error('上传失败');
                this.$message.success('上传成功');
                this.imgList = fileList.filter(r => r.response.success).map(r => r);
                console.log('图片list是', this.imgList);
            },
            mobilePic(path) {
                try {
                    //  console.log('tt1', _tem);
                    const _tem = path.split('/');
                    //   console.log('tt2', _tem);
                    _tem.splice(-1, 0, 'm');
                    //   console.log(_tem.join);
                    return _tem.join('/');
                } catch (e) {
                    return path;
                }
            },
            async newPre() {
                this.uprecent = 0;
                Notify({
                    message: '开始上传，请等待',
                    duration: 1000,
                    background: '#1989fa',
                });
                return true;
            },
            async uploadPre(file, info) {
                if (file instanceof Array) {
                    for (const item of file) {
                        this.compressImg(item);
                    }
                } else {
                    this.compressImg(file);
                }
            },
            async compressImg(file) {
                const param = file.file;
                this.uprecent = 0;
                this.loading = true;
                const isJPG = param.type === 'image/jpeg';
                const isPNG = param.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.warning('仅支持png 和 jpeg');
                    return false;
                }

                const formData = new FormData(); // 要上传的表单
                this.uploadTotal = this.uploadTotal + 100;
                // 对图片进行压缩
                const imgSize = param.size / 1024 / 1024;

                const _this = this;
                const image = new Image();
                const reader = new FileReader();
                image.src = file.content;
                image.onload = (imageEvent) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    let width = image.width * _this.imgQuality;
                    let height = image.height * _this.imgQuality;
                    // 图片宽度最大值在1500
                    const maxWidth = 1000;
                    // 如果压缩过后还是大于最小宽度就再继续同比缩小
                    if (width > maxWidth) {
                        canvas.width = maxWidth;
                        canvas.height = parseInt(height * maxWidth / width);
                        width = canvas.width;
                        height = canvas.height;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }

                    context.clearRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL(param.type);
                    const blobData = _this.dataURItoBlob(dataUrl, param.type);
                    formData.append('file', blobData, param.name);
                    this.doPost(formData);
                };
            },
            async doPost(formData) {
                formData.append('type', 'car');
                console.log(formData);
                const res = await this.$api.post('common/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const { success, data } = res.data;
                console.log(res);
                if (success) {
                    this.imgList.push({ response: { data } });
                    this.uprecent = 100;
                    Notify({
                        message: '上传完成',
                        duration: 1000,
                        background: '#1989fa',
                    });
                }
            },
            onDatePickerConfirm() {
                // console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
                this.buildDate = this.$refs.datePicker.getFormatDate('yyyy/MM/dd')
            },
            onPickerConfirm(index) {
                const values = this.$refs[`picker${index}`].getColumnValues();
                let res = '';
                values.forEach(value => {
                    value && (res += `${value.text || value.label} `);
                });
                this[`pickerValue${index}`] = res;
                this.area = res
            },
            async getAccountInfo(){
                let _res = await this.$api.get('/bus/getAccountInfo', {
                    params: {
                        id: this.$store.state.company.id,
                    }
                });
                let { success, data } = _res.data;
                if(!success) return this.$toast.info('获取数据失败');
                this.carType = data.type ? data.type : 1;
                this.oldphone = data.phone
                this.licenceName = data.licenceName
                this.area = data.area
                this.address = data.address
                this.licenceNum = data.licenceNum
                this.companyName = data.companyName
                this.picPath = data.picPath
                this.logo = data.logo
                this.IDCardFront = data.IDCardFront
                this.IDCardReverse = data.IDCardReverse
                this.buildDate = this.getTime(data.buildDate)
                this.state = data.state
            },
            async getCode() {
                let time = 60;
                if (!this.codeing) {
                    this.codeing = true;
                    let res = await this.$api.post('/common/getCode', {
                        type: 'reg',
                        phone: this.oldphone
                    });
                    let {success} = res.data;
                    if (!success) {
                        this.$toast.info('发送错误，请重新获取！');
                        this.code = true;
                        this.codeTxt = '发送验证码';
                        return
                    }
                    let interval = setInterval(() => {
                        time--;
                        this.codeTxt = `${time}s`;
                        if (time < 1) {
                            clearInterval(interval);
                            this.codeTxt = '获取验证码';
                            this.codeing = false
                        }
                    }, 1000)
                }
            },
            //  提交认证
            async formSub() {


                if(this.state==1){
                    if(this.carType===1){  //1企业4个人
                        // if(!this.picPath) return this.$toast.info('请上传营业执照',2000); //营业执照号码
                    }
                      // if(!this.IDCardFront) return this.$toast.info('请上传身份证正面',2000); //之前绑定的手机号码
                      // if(!this.IDCardReverse) return this.$toast.info('请上传身份证反面',2000); //之前绑定的手机号码

                      if(!this.lxName) return this.$toast.info('请输入联系人姓名',2000); //联系人姓名
                      if(!this.lxPhone) return this.$toast.info('请输入联系人号码',2000); //联系人号码
                     if( this.carType===1){
                         if(!this.licenceName) return this.$toast.info('请输入公司名称',2000); //公司名称
                         if(!this.area) return this.$toast.info('请选择所在地区',2000); //所在地区
                         if(!this.address) return this.$toast.info('请输入详细地址',2000); //详细地址
                         if(!this.buildDate) return this.$toast.info('请选择公司成立时间',2000); //成立时间
                         if(!this.licenceNum) return this.$toast.info('请输入营业执照号码',2000); //营业执照
                     }
                     if(this.carType===4){
                         if(!this.licenceName) return this.$toast.info('请输入车行名称',2000); //公司名称
                     }
                }else {
                    //修改资料
                    // if(!this.oldphone) return this.$toast.info('请输入原账号绑定号码',2000); //之前绑定的手机号码
                    // if(!this.code) return this.$toast.info('请输入验证码',2000);  //验证码
                    // if(!this.phone) return this.$toast.info('请输入新账号绑定号码',2000); //新绑定的手机号码
                    if(this.phone){
                        if(!check(this.oldphone)) return this.$toast.info('请输入正确的手机号')
                        if(!this.code) return this.$toast.info('请输入验证码',2000);  //验证码
                        if(!check(this.phone)) return this.$toast.info('请输入正确的手机号')
                    }

                    if(!this.logo) return this.$toast.info('请上传门头照或者logo',2000); //门头照或照片
                    if(!this.area) return this.$toast.info('请选择所在地区',2000); //所在地区
                    if(!this.address) return this.$toast.info('请输入详细地址',2000); //详细地址
                    if(this.carType===1){
                        if(!this.companyName) return this.$toast.info('请输入公司简称',2000); //公司简称
                    }else {
                        if(!this.companyName) return this.$toast.info('请输入车行简称',2000); //公司简称
                    }

                }

                let res = await this.$api.post('/bus/company/verify', {
                    type: this.carType,  //1企业4个人
                    oldphone: this.oldphone, //之前绑定的手机号码
                    code: this.code,  //验证码
                    phone: this.phone,  //新绑定的手机号码
                    lxName: this.lxName,  //联系人姓名
                    lxPhone: this.lxPhone, //联系人号码
                    licenceName: this.licenceName, //公司名称
                    area: this.area,   //所在地区
                    address: this.address,   //详细地址
                    licenceNum: this.licenceNum, //营业执照号码
                    companyName: this.companyName, //公司简称
                    picPath: this.picPath,  //营业执照，为企业的时候上传
                    logo: this.logo,  //门头照或者logo，都上传
                    IDCardFront: this.IDCardFront, // 身份证正面，都上传
                    IDCardReverse: this.IDCardReverse,// 身份证反面，都上传
                    buildDate: this.buildDate, //公司成立时间
                    companyId: this.$store.state.company.id,
                    state:this.state
                });
                let { success, info } = res.data;
                if(!success) return this.$toast.info(info);
                this.$toast.info('认证成功');
                window.localStorage.setItem('state',2)
                this.$store.dispatch('getCompanyInfo');
                this.$router.go(-1);
            },
            getTime(time){
                let date = new Date(time);
                let year =date.getFullYear();
                let mouth = date.getMonth()+1;
                if(mouth<10) mouth = '0' +mouth;
                let day = date.getDate();
                if(day<10) day = '0' +day;
                return `${year}/${mouth}/${day}`
            }
        }
    };
</script>
<style lang="scss" scoped>

  .main {
    background: #fff;
  }

  input, textarea {
    background: #f7f7f7;
  }

  /* 主要内容 */
  .content {
    padding: 0 vw(32);
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .img {
    padding-top: vw(60);

    .name {
      font-size: vw(28);

      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
    }

  }

  .vtop {
    padding-top: 0;
  }

  .tips {
    font-size: vw(24);
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: vw(24);
    margin-top: vw(36);
    margin-bottom: vw(20);
  }

  .tag {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: vw(40);

    .imgTag {
      width: vw(316);
      height: vw(190);
      margin-right: vw(36);
      border-radius: vw(16);
      position: relative;
      overflow: hidden;
      margin-top: vw(40);

      img {
        width: 100%;
        height: 100%;
      }

      i {
        position: absolute;
        z-index: 9;
        font-size: vw(34);
        color: rgba(0, 0, 0, 0.2);
        top: vw(14);
        right: vw(14);
      }
    }

    .imgTag:nth-child(2n+2) {
      margin-right: 0;
    }

    .addTag {
      border: 1px dashed #999;
      width: vw(316);
      height: vw(190);
      text-align: center;
      line-height: vw(190);
      color: #999;
      font-size: vw(84);
      position: relative;

      input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0;
      }
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: vw(100);
    background: #f7f7f7;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 0 20px;
    margin-bottom: 20px;

    p {
      height: vw(28);
      font-size: vw(28);
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      line-height: vw(28);
      margin-left: 4px;
    }

    input {
      border: none;
      color: #666;
      font-size: vw(28);
      line-height: vw(100);
      height: vw(100);
      width: 65%;
      text-align: right;
      outline: none;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 68%;

      input {
        width: 0;
        flex-grow: 1;
      }

      p {
        margin-left: vw(20);
        text-align: right;
      }

      i {
        font-size: vw(16) !important;
        color: #999;
        margin-left: vw(12);
        margin-top: vw(3);
      }
    }

    .itemType {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .chobtn {
        width: 124px;
        height: 60px;
        border-radius: 8px;
        border: 1px solid #999;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 40px;
        font-size: 28px;
        color: #999;
      }

      .chobtn.active {
        color: #FF4C4C;
        border-color: #FF4C4C;
      }
    }

    .code {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .getCode {
        padding-left: 20px;
        max-width: 150px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 28px;
        color: #34CCFF;
      }

      .codeing {
        color: #999;
      }
    }
  }

  .mt {
    margin-bottom: 40px;
  }

  .itemTxt {
    display: flex;
    justify-content: space-between;
    padding: vw(36) 0;

    p {
      height: vw(28);
      font-size: vw(28);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: vw(50);

    }

    textarea {
      border: none;
      color: #666;
      font-size: vw(28);
      min-height: vw(28);
      line-height: vw(42);
      width: vw(352) !important;
      text-align: right;
      resize: none;
      outline: none;
    }
  }

  input::placeholder {
    color: #999;
  }

  .checked {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: vw(42);
    font-size: vw(24);
    color: rgb(102, 102, 102);
    margin-top: vw(120);

    span {
      color: #34CCFF;
    }

    i {
      display: block;
      margin-right: vw(20);
      width: vw(40);
      height: vw(40);
      border-radius: vw(8);
      border: vw(2) solid rgba(0, 0, 0, 0.1);;
    }
  }

  .btn {
    width: vw(512);
    height: vw(80);
    background: #FF3434;
    border-radius: vw(16);
    margin: vw(66) auto vw(40);
    line-height: vw(80);
    text-align: center;
    color: #fff;
    font-size: vw(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  .mtop {
    margin-top: 242px;
  }

</style>
