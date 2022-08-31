<template>
  <div class="SystemSet">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="SystemSetBox">
      <md-tabs>
        <md-tab-pane class="content" name="p1" label="基本信息">
          <!--基本信息-->
          <div class="BasicDataTop">
            <div class="BasicTit">
              <span></span>基本信息
            </div>
            <div class="BasicTable">
              <!--公司名称 联系人-->
              <div>
                <div>
                  <span>公司名称:</span>
                  <el-input v-model="companyInfo.companyName" class="checkSele" size="mini"></el-input>
                </div>
                <div>
                  <span><strong>*</strong> 联系人</span>
                  <el-input v-model="companyInfo.lxName" class="checkSele" size="mini"></el-input>
                </div>
              </div>
              <!--营业时间 手机-->
              <div>
                <div>
                  <span>营业时间:</span>
                  <el-input v-model="SyBusTimeSta" class="shortSele" size="mini"></el-input>
                  <strong>--</strong>
                  <el-input v-model="SyBusTimeEnd" class="shortSele" size="mini"></el-input>
                </div>
                <div>
                  <span><strong>*</strong> 手机</span>
                  <el-input   v-model="companyInfo.lxPhone" class="checkSele" size="mini"></el-input>
                </div>
              </div>
              <!--所属地区 座机-->
              <div>

                <div>
                  <span>座机</span>
                  <el-input v-model="fixedSta" class="shortSele" size="mini"></el-input>
                  <strong>--</strong>
                  <el-input v-model="fixedEnd" class="shortSele" size="mini"></el-input>
                </div>
              </div>
              <!--所属交易市场-->
              <div>
                <div>
                  <span><strong>*</strong>所属交易场所:</span>
                  <el-input v-model="GenusPlace" class="checkSele" size="mini"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="newRow"></div>
          <!--地址信息-->
          <div class="BasicAddress">
            <div class="BasicTit">
              <span></span>地址信息
            </div>
            <div class="BasicAddCont">
              <div>
                <span><strong>*</strong> 公司地址:</span>
                <el-input v-model="companyInfo.address" class="checkSele" size="mini"></el-input>
                <strong>为了让用户更好的找到你，请核实地图标注的精确位置是否准确。</strong>
              </div>
              <!-- <div>
                 <span>地理位置:</span>
                 <div class="Map"></div>
               </div>-->
            </div>
          </div>
          <!--特色服务-->
          <div class="CharaSer">
            <div class="BasicTit">
              <span></span>特色服务
            </div>
            <div class="CharaSerLi">
              <div>经纪公司</div>
              <div>车辆置换</div>
              <div>价格评估</div>
              <div>代办过户</div>
              <div>代办上牌</div>
              <div>代办转籍</div>
              <div>代办保险</div>
              <div>车辆寄售</div>
              <div>补办手续</div>
              <div>分期贷款</div>
              <div>延长质保</div>
              <div>整顿翻新</div>
              <div>车辆美容</div>
              <div>试乘驾驶</div>
            </div>
          </div>
          <md-button type="primary" style="margin-top: 20px;" size="small" @click="doSave">
            保存
          </md-button>
        </md-tab-pane>
        <md-tab-pane class="content Propaganda" name="p2" label="宣传信息">
          <div class="BasicTit">
            <span></span>公司logo照片&宣传照片
          </div>
          <p>1.公司logo尺寸为180×180，按要求上传则有机会在二手车列表页展示哟。</p>
          <p>2.公司宣传照片最大3M，请上传公司门头照，不得违反国家法律法规。</p>
          <div class="TuUpload">
            <div>
              <el-upload
                slot="footer"
                action="https://api.1775.net.cn/common/upload"
                list-type="picture-card"
                :data="{type:'company'}"
                :on-remove="doRemove1"
                :on-success="uploadLogo"
                :before-upload="uploadPre"
                :limit="1"
                :show-file-list="false"
              >
                <img :src="companyInfo.logo" v-if="companyInfo.logo" />
                <i class="el-icon-plus" v-else></i>
              </el-upload>
            </div>
            <p>点击从电脑上上传公司logo</p>
          </div>
          <div class="TuUpload">
            <div>
              <el-upload
                slot="footer"
                action="https://api.1775.net.cn/common/upload"
                list-type="picture-card"
                :data="{type:'company'}"
                :on-remove="doRemove2"
                :on-success="uploadOtherPic"
                :before-upload="uploadPre"
                :limit="15"
                multiple
                :file-list="imgList"
                :show-file-list="true"
                class="otherPic"
              >
                <i class="el-icon-plus" ></i>
              </el-upload>
            </div>
            <p>点击从电脑上上传公司宣传照片</p>
          </div>
          <md-button type="primary" style="margin-top: 20px;" size="small" @click="doSave">
            保存
          </md-button>
        </md-tab-pane>
        <md-tab-pane class="content Propaganda" name="p3" label="密码修改"  style="width:100vw">
          <md-field >
            <md-input-item
              title="旧密码"
              placeholder="请输入旧的密码"
              clearable
              type="password"
              v-model="opwd"
            ></md-input-item>
            <md-input-item
              title="新密码"
              placeholder="请输入新密码"
              clearable
              type="password"
              v-model="npwd"
            ></md-input-item>
            <md-input-item
              title="确认新密码"
              placeholder="请重新输入新密码"
              clearable
              v-model="n2pwd"
              type="password"
            ></md-input-item>
          </md-field>

          <md-button @click="doUpdatePwd" type="primary">确认修改</md-button>
        </md-tab-pane>
        <md-tab-pane class="content" name="p4" label="隐私政策">
              <div>
                <h1>用户协议与隐私政策</h1>
                <p>本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有
                  个性化的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但
                  本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，
                  在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。
                  本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您
                  已经同意本隐私权政策全部内容。本隐私权政策属于本软件服务使用协议不可分
                  割的一部分。</p>
                <h5>1.适用范围</h5>
                <p>a)在您使用本软件网络服务，本软件自动接收并记录的您的手机上的信息，包括
                  但不限于您的健康数据、使用的语言、访问日期和时间、软硬件特征信息及您需
                  求的网页记录等数据；</p>
                <h5>2.信息的使用</h5>
                <p>     a)在获得您的数据之后，本软件会将其上传至服务器，以生成您的使用数据，以
                  便您能够更好地使用服务。</p>

                <h5>3.信息披露</h5>
                <p>a)本软件不会将您的信息披露给不受信任的第三方。</p>
                <p>b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法
                  机构披露；</p>
                <p>   c)如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露；</p>

                <h5>4.信息存储和交换</h5>

                <p>本软件收集的有关您的信息和资料将保存在本软件及（或）其关联公司的服务器
                  上，这些信息和资料可能传送至您所在国家、地区或本软件收集信息和资料所在
                  地的境外并在境外被访问、存储和展示。</p>
                <h5>5.信息安全</h5>
                <p>  a)在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的
                  交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的
                  个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您
                  立即联络本软件客服，以便本软件采取相应措施。</p>

              </div>
        </md-tab-pane>
        <md-tab-pane class="content" name="p5" label="退出">
              <md-button @click="out">退出</md-button>
        </md-tab-pane>
      </md-tabs>

    </div>
  </div>
</template>

<script>

export default {
  name: 'SystemSet',
  data() {
    return {
      SetLi: ['公司设置'],
      SetNum: '0',
      SetClick: 'SetClick',
      Rotate: { transform: 'rotate(180deg)' },
      SetReleaseTime: '',
      SetSelect: '',
      SystemSetState: ['基本信息', '宣传信息'],
      SystemSetTopLeNum: '0',
      SeTopLeCli: 'SeTopLeCli',
      CompanyName: '', // 公司名称
      lxName: '', // 联系人
      SyBusTimeSta: '', // 营业时间 开始
      SyBusTimeEnd: '', // 营业时间 结束
      ContactsIph: '', // 手机
      SyRegion: '', // 所属地区
      fixedSta: '', // 座机 前缀
      fixedEnd: '', // 座机 后尾
      GenusPlace: '', // 所属交易场所
      imgList: [],
      imageUrl: '',
      companyInfo: {
        companyName: '',
        lxName: '',
        lxPhone: '',
        address: '',

      },
      LicenseName: '', // 营业执照名称
      LicenseNumber: '', // 营业执照注册号
      EstablishTime: '', // 成立时间
      legalName: '', // 法人代表姓名
      address: '',
      opwd: '',
      npwd: '',
      n2pwd: '',
    };
  },
  created() {
    this.companyInfo = this.$store.state.company;
    this.imgList = this.companyInfo.otherPic.split(',').map(r => ({ url: r, response: { data: r } }));
  },
  methods: {
      out(){
          this.$store.commit('logOut');
          window.location.reload();
      },
    // 修改密码
    async doUpdatePwd() {
      if (!this.opwd || !this.npwd || !this.n2pwd) return this.$toast.info('请填写必要的信息');
      if (this.npwd != this.n2pwd) return this.$toast.info('两次输入的新密码不一致');
      const res = await this.$api.post('/companyUpdatePwd', {
        id: this.companyInfo.id,
        oldPwd: this.opwd,
        newPwd: this.npwd,
      });

      const { success, data, info } = res.data;
      if (success) {
        this.$toast.succeed('更新成功');
        setTimeout(() => { this.$store.commit('logOut'); }, 1500);
      } else {
        this.$toast.failed(info);
      }
    },
    dataURItoBlob(dataURI, type) {
      const binary = atob(dataURI.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type });
    },
    doRemove1() {
      this.compnayInfo.logo = '';
    },
    doRemove2(file, fileList) {
      // this.compnayInfo.otherPic = '';
      this.imgList = fileList;
    },
    uploadPre(param) {
      const isJPG = param.type === 'image/jpeg';
      const isPNG = param.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.$message.warning('仅支持png 和 jpeg');
        return false;
      }
      this.uploadTotal = this.uploadTotal + 100;
      // 对图片进行压缩
      const imgSize = param.size / 1024 / 1024;
      if (imgSize > 1) {
        const _this = this;
        return new Promise((resolve) => {
          const reader = new FileReader();
          const image = new Image();
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
            resolve(blobData);
          };
          reader.onload = ((e) => { image.src = e.target.result; });
          reader.readAsDataURL(param);
        });
      }
    },
    async uploadOtherPic(res, file, fileList) {
      // this.companyInfo.otherPic = res.data;
      this.imgList = fileList;
    },
    async uploadLogo(res) {
          //图片复制需要点时间
      setTimeout(()=>   this.companyInfo.logo = res.data,1000)

    },
    async doSave() {
      this.companyInfo.conpanyId = this.companyInfo.id;
        setTimeout(()=> {
            this.companyInfo.otherPic = this.imgList.map(r => r.response.data).join();
        },1000)

      const res = await this.$api.post('/updateCompanyInfo', this.companyInfo);
      const { success, data } = res.data;
      if (success) {
        this.$message.success('更新成功');
        // state更新公司信息
        this.$store.dispatch('getCompanyInfo');
      } else {
        this.$message.error('更新失败');
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="scss">

  //宣传信息
  .Propaganda{
    margin-top: 20px;
    /*width: 500px;*/

    padding:0 10px;
  }
  .Propaganda>p{
    color: #666;
    font-size: 12px;
    line-height: 18px;
  }

  .TuUpload{
    width: 100%;
    margin-top: 20px;
    box-sizing: content-box;
  }
  .TuUpload>div{
  display: flex;
    flex-wrap: wrap;
  }
  .TuUpload img{
    width: 100%;
    height: 100%;
  }
  .TuUpload>p{
    text-align: center;
    font-size: 12px;
    color: #666666;
    margin-top: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 150px;
    display: block;
  }

  .PropagandaBtn{
    width: 140px;
    height: 40px;
    background-color: $ora;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    margin-top: 40px;
  }
  .NewsInfor{
    width: 100%;
  }
  .examine{
    font-size: 12px;
    color: #666;
    margin: 20px 0;
  }
  .examine>span{
    color: $ora;
  }

  .License{
    width: 300px;
    height: 180px;
  }
  .LicenseFon{
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .LicenseFon strong{
    color: $ora;
  }
  .LicenseTu{
    width: 160px;
    height: 120px;
    background-color: gray;
    position: relative;
    top: 20px;
    left: 50%;
    transform:translateX(-50%);
  }
  .NewsInforFrom{
    width: 100%;
    height: 80px;
  }
  .NewsInforFrom>div{
    width: 100%;
    height: 35px;
  }
  .NewsInforFrom>div>div{
    width: 50%;
    height: 100%;
    font-size: 12px;
    color: #666666;
    line-height: 36px;
  }
  .NewsInforFrom>div>div:nth-child(1){
    float: left;
  }
  .NewsInforFrom>div>div:nth-child(2){
    float: right;
  }
  .NewsInforFrom>div>div>span{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .NewsInforFrom>div>div>span>strong{
    color: $ora;
  }


  //基本信息
  .BasicData{
    width: 100%;
    padding:0 10px;
    box-sizing: border-box;
  }
  .BasicDataTop{
    width: 100%;

    margin-top: 20px;
  }
  .BasicTit{
    height: 20px;
    margin-bottom: 20px;
    color: #4A4A4A;
    font-size: 14px;
  }
  .BasicTit>span{
    background-color: $ora;
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
  }
  .BasicTable{

  }
  .BasicTable>div{
    width: 100%;
    line-height: 36px;
  }
  .BasicTable>div>div{
    height: 36px;
  }
  .BasicTable>div>div:nth-child(1){

  }
  .BasicTable>div>div:nth-child(2){

  }
  .BasicTable>div>div>strong{
    color: #E3E3E3;
  }
  .BasicTable>div>div>span{
    display: inline-block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: right;
    color: #6666;
    font-size: 12px;
    margin-right: 5px;
  }
  .BasicTable>div>div>span>strong{
    color: $ora;
  }


  .BasicAddress{
    margin-top: 20px;
    width: 100%;
  }
  .BasicAddCont{
    width: 100%;
    /*height: 535px;*/
  }
  .BasicAddCont>div{
    width: 100%;
    color: #666666;
    font-size: 12px;
    line-height: 26px;
  }
  .BasicAddCont>div>span{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .BasicAddCont>div>span>strong{
    color: $ora;
  }
  .BasicAddCont>div>strong{
    color: #666;
    font-weight: 400;
    margin-left: 20px;
  }
  .Map{
    width: 800px;
    height: 450px;
    background-color: gray;
    float: right;
    margin: 10px 50px 0 0 ;
  }

  .CharaSer{
    margin-top: 20px;
    width: 100%;
  }
  .CharaSerLi{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap:wrap;
  }
  .CharaSerLi>div{
    width: 78px;
    height: 30px;
    border: 1px solid #e3e3e3;
    text-align: center;
    line-height: 30px;
    color: #666;
    font-size: 12px;
    margin-right: 10px;
  }

  .BasicBtn{
    width: 140px;
    height: 40px;
    background-color: $ora;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-weight: 600;
    margin: 20px 0 50px;
  }

  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .shortSele{
    width: 73px;
    height: 36px;
    line-height: 36px;
  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }


  .SystemSet{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .SystemSetBox{
    margin: 0 auto;
    height: 0;
    flex:1;
    overflow: auto;
  }

  .SystemSetLeft{
    width: 200px;
    height: 520px;
    background-color: #fff;
    float: left;
    position: relative;
  }
  .SystemSetLeftLi>div:nth-child(1){
    height: 66px;
    line-height: 66px;
    font-size: 20px;
  }
  .SystemSetLeftLi>div{
    margin-left: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  .SetLeftLiTop{
    height: 66px;
    line-height: 66px;
    font-size: 14px;
  }
  .SetLeftLiTop i{
    transition: all .5s;
  }
  .SetLeftLiData{
    width: 100%;
    height: 22px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666666;
    cursor:pointer;
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
  .SetClick{
    color: $ora;
  }

  .SystemSetRiTop{
    width: 100%;
    height: 66px;
    background-color: #fff;
    line-height: 66px;
  }

  .SystemSetLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .SystemSetLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;
  }
  .SystemSetLi>span{
    font-size: 12px;
    color: #666;
    position: absolute;
    left: 90px;
  }

  .SystemSetTop{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  .SystemSetTopLe{
    width: 360px;
    height: 40px;
    float: left;
  }
  .SystemSetTopLe ul{
    width: 366px;
    height: 40px;
  }
  .SystemSetTopLeLi{
    width: 120px;
    height: 40px;
    float: left;
    background-color: #f9fafa;
    border: 1px solid #e3e3e3;
    border-right: none;
    text-align: center;
    line-height: 40px;
    color: #333;
    font-size: 12px;
    z-index: 1;
  }
  .SystemSetTopLe li:nth-last-child(1){
    border-right: 1px solid #e3e3e3;
  }
  .SeTopLeCli{
    background-color: #fff;
    color: $ora;
    border-bottom: none;
    border-top: 1px solid $ora;
  }
  .newRow{
    width: 100%;
    height: 10px;
    background-color: #F4F6F9;
  }
 ::v-deep {
    .avatar-uploader-icon{
      width: 80px;
      height: 80px;
      font-size: 20px;
      line-height: 80px;
    }
    .el-upload--picture-card{
      width: 80px;
      height: 80px;
      line-height: 80px;
    }
    .el-upload-list__item{
      width: 80px;
      height: 80px;
      float:left
    }
  }
 ::v-deep .content{
    padding:0 15px;
    box-sizing: border-box;
  }
</style>
