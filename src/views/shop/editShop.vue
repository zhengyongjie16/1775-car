<template>
  <div class="main">
    <navTag title="修改资料" class="bd"></navTag>
    <div class="content">
<!--      <md-scroll-view-->
<!--        :scrolling-x="false"-->
<!--        :scrolling-y="true"-->
<!--        auto-reflow-->
<!--      >-->
        <div class="name">上传门面图片</div>
        <div>
          <ul class="pic">
            <li
              v-show="formData.logo"
              :style="{
                'backgroundImage': `url(${formData.logo})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'
              }"
              class="img"
              >
              <md-tag
                @click.native="delLogo"
                class="image-reader-item-del"
                fill-color="#111A34"
                font-color="#fff"
                shape="quarter"
                size="small"
                type="fill"
              >
                <md-icon name="close"></md-icon>
              </md-tag>
            </li>
            <li class="img add"  v-show="!formData.logo" @click="upLogo">
              <md-icon color="#CCC" name="camera" size="md"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </div>

        <div class="name m20">上传背景图片</div>
        <div class="txt">上传清晰光线良好的照片，将有助于产品的销量。</div>
        <div>
          <ul class="pic">
            <li
              :style="{
                'backgroundImage': `url(${formData.bg})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'
              }"
              class="img"
              v-show="formData.bg"
            >
              <md-tag
                @click.native="delBg"
                class="image-reader-item-del"
                fill-color="#111A34"
                font-color="#fff"
                shape="quarter"
                size="small"
                type="fill"
              >
                <md-icon name="close"></md-icon>
              </md-tag>
            </li>
            <li class="img add" v-show="!formData.bg" @click="addBg">
              <md-icon color="#CCC" name="camera" size="md"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </div>

        <div class="item">
          <div class="title">商家名称</div>
          <input placeholder="请输入商家名称" v-model="formData.name" type="text">
        </div>
        <div class="item">
          <div class="title">登录密码</div>
          <input placeholder="请输入登录密码" type="password" v-model="formData.pwd">
        </div>
        <div class="item">
          <div class="title">联系电话</div>
          <input placeholder="请输入联系电话" type="number" v-model="formData.phone">
        </div>
        <div class="item">
          <div class="title">联系人姓名</div>
          <input placeholder="请输入联系人姓名" type="text" v-model="formData.lxName">
        </div>
        <div class="item">
          <div class="title">商店类型</div>
          <input placeholder="请选择商店类型" type="text" v-model="formData.type"  @click="isPickerShow0 = true">
        </div>
        <div class="item">
          <div class="title">商店地址</div>
          <input placeholder="请输入商店地址" type="text" v-model="formData.address">
        </div>
        <div class="info">
          <div class="title">商店详情介绍</div>
          <quill-editor
            ref="myQuillEditor"
            v-model="formData.desc"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
        </div>
<!--      </md-scroll-view>-->
    </div>
    <div class="fixbtn" @click="updateShop">确定修改</div>
    <template>
      <div id="quill-upload" v-show="false" @click="upEdit"> </div>
      <md-picker
        ref="picker0"
        v-model="isPickerShow0"
        :data="pickerData"
        large-radius
        @confirm="onPickerConfirm(0)"
        title="选择类型"
      ></md-picker>
    </template>
  </div>
</template>

<script>
  import imageProcessor from "mand-mobile/components/image-reader/image-processor";
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: "editShop",
    data() {
      return {
        imageList: {
          reader0: [
            '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
            '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
          ],
          reader1: [],
        },
        isPickerShow0: false,
        pickerData: [],
        pickerValue: '',
        formData:{},
        type:[],
        value:'',
        editorOption: {
          placeholder: '',
          theme: 'snow',
          modules: {
            toolbar: {
              container: [             // 工具栏配置, 默认是全部
                ['bold'],
                ['italic'],
                ['underline'],
                ['strike'],
                [{'list':'ordered'},{'list': 'bullet' }],
                ['blockquote'], ['code-block'],
                ['link'],
                ['image'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
              ],
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 给个点击触发mand-mobile上传组件，input框选择图片文件
                    document.querySelector('#quill-upload').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
      }
    },
    components:{
      quillEditor
    },
    filters:{
      getType(value,type){
        for (const item of type){
          if(value ==item.id){
            return item.name
          }
        }
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },

      async getShopDetail(){
        const res = await this.$api.post('/getShopDetail',{id: this.$route.query.id})
        const { data, success, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.formData = data
        const obj = {
          value:1,
          text: '其他',
        }
        this.value = data.type
        for(const item of this.type){
          if(data.type==item.value){
            this.formData.type = item.text
          }
        }
        this.type.push(obj)
      },
      upLogo(){
        ImagePicker.getPictures(async (result) => {
          console.log(result)
          const arr = result.images;
          this.uploadList = arr.length;
          for (const item of arr) {
            console.log(item.uri);
            await this.newUpload(item.uri,1);
          }
        }, (err) => {
          console.log('-------错误', err)
        }, {
          maximumImagesCount: 1,
          width: 1500,
          quality: 80,
        });
      },
      addBg(){
        ImagePicker.getPictures(async (result) => {
          const arr = result.images;
          this.uploadList = arr.length;
          //  console.log('arr', result);
          for (const item of arr) {
            console.log(item.uri);
            await this.newUpload(item.uri,2);
          }
        }, (err) => {

        }, {
          maximumImagesCount: 20,
          width: 1500,
          quality: 80,
        });
      },
      upEdit(){
        ImagePicker.getPictures(async (result) => {
          const arr = result.images;
          this.uploadList = arr.length;
          //  console.log('arr', result);
          for (const item of arr) {
            console.log(item.uri);
            await this.newUpload(item.uri,3);
          }
        }, (err) => {

        }, {
          maximumImagesCount: 20,
          width: 1500,
          quality: 80,
        });
      },

      newUpload(fileURL,index) {
        return new Promise((resolve, reject) => {
          const options = new FileUploadOptions();
          options.fileKey = 'file';
          options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
          // options.mimeType = 'text/plain';
          const params = {};
          params.type = 'car';
          options.params = params;
          const ft = new FileTransfer();
          ft.upload(fileURL, encodeURI(`https://api.1775.net.cn/common/upload?r=${Math.random()}`), (res) => {
            this.uploadCount++;
            if (this.uploadCount == this.uploadList) {
              this.$toast.succeed('上传完成');
              this.uploadCount = 0;
            }

            const { response, responseCode } = res;
            const _res = JSON.parse(response);
            if (responseCode == 200 && _res.success) {
              if(index==1){
                setTimeout((_) => {
                  this.formData.logo = _res.data;
                }, 800);
              }
              if(index==2){
                setTimeout((_) => {
                  this.formData.bg = _res.data;
                }, 800);
              }
              if(index==3){
                setTimeout((_) => {
                  let quill = this.$refs.myQuillEditor.quill
                  let length = quill.getSelection().index;
                  quill.insertEmbed(length, 'image', _res.data)
                  // 调整光标到最后
                  quill.setSelection(length + 1)
                }, 800);
              }
            }
            resolve();
          }, (err) => {
            // alert(JSON.stringify(err));
            this.uploadCount++;
            if (this.uploadCount == this.uploadList) {
              this.$toast.succeed('上传完成');
              this.uploadCount = 0;
            }
            reject(err);
          }, options, true);
        });
      },

      delLogo(){
        this.formData.logo =''
      },
      // 删除背景图
      delBg() {
        this.formData.bg=''
      },

      // 提交修改
      async updateShop(){
        const formData = this.formData
        if(!formData.id) return this.$toast.info('请选择商品',1000)
        if(!formData.logo) return this.$toast.info('请上传门面图片',1000)
        if(!formData.bg) return this.$toast.info('请上传背景图片',1000)
        if(!formData.name) return this.$toast.info('请输入商店名称',1000)
        if(!formData.pwd) return this.$toast.info('请输入登录密码',1000)
        if(!formData.phone) return this.$toast.info('请输入联系电话',1000)
        if(!formData.lxName) return this.$toast.info('请输入联系人姓名',1000)
        if(!formData.type) return this.$toast.info('请选择商店类型',1000)
        if(!formData.address) return this.$toast.info('请输入商店地址',1000)
        if(!formData.desc) return this.$toast.info('请输入商店详情介绍',1000)
        formData.type = this.value
        const res = await this.$api.post('/updateShop',formData)
        const { data, success, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.$toast.info(info,1000)
        this.$router.go(-1)
      },
      // 获取商家类型
      async getShopType(){
        const res = await this.$api.get('/getShopType')
        const { success, data, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.type = []
        for (const item of data){
          let obj = {}
          obj.text = item.name
          obj.value=item.id
          this.type.push(obj)
        }

        this.pickerData = [this.type]
        this.getShopDetail();
      },

      onPickerConfirm(index) {
        const values = this.$refs[`picker${index}`].getColumnValues()
        this.value=values[0].value
        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
        })
        this.formData.type = res

      },
    },
    created() {
      this.getShopType()
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    box-sizing: border-box;
    background: #fff;
  }
  .bd{}
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: none;
  }
  .content {
    height: 0;
    flex-grow: 1;
    padding: 0 32px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .name {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #666;
      margin-top: 42px;
      line-height: 1;
    }
    .m20{
      margin-top: 20px;
    }

    .txt {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999;
      margin-top: 30px;
      line-height: 1;
    }

    .pic {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;

      .img {
        width: 204px;
        height: 204px;
        border-radius: 16px;
        border: 1px dashed rgba(153, 153, 153, 1);
        margin-right: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        position: relative;
      }
      .add{
        text-align: center;
        i{
          font-size: 50px;
          margin-top: 45px;
          display: block;
        }
        p{
          font-size: 30px;
          color: #666;
          margin-top: 10px;
        }

      }
      .md-tag{
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .item {
      width: 686px;
      height: 100px;
      background: rgba(247, 247, 247, 1);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;
      margin-bottom: 20px;

      .name {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #666;
        font-weight: bold;
      }

      input {
        background: rgba(0, 0, 0, 0);
        text-align: right;
        border: none;
        outline: none;
        color: #666;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }

    .info {
      box-sizing: border-box;
      padding: 36px 20px;
      .title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #666;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 20px;
      }

      textarea {
        background: rgba(0, 0, 0, 00);
        margin-top: 30px;
        width: 100%;
        height: 266px;
        outline: none;
        border: none;
        resize: none;
      }
    }
  }

  .fixbtn {
    width: 688px;
    height: 80px;
    background: rgba(255, 76, 76, 1);
    border-radius: 16px;
    margin: 20px auto;
    line-height: 80px;
    text-align: center;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #fff;
  }
</style>
