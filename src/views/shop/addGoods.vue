<template>
  <div class="main">
    <div class="nav">
      <md-icon name="arrow-left" @click="$router.go(-1)"></md-icon>
      <div class="title">添加商品</div>
    </div>
    <div class="content">
<!--      <md-scroll-view-->
<!--        :scrolling-x="false"-->
<!--        :scrolling-y="true"-->
<!--        auto-reflow-->
<!--      >-->
        <div class="name">上传商品封面图</div>
        <div>
          <ul class="pic">
            <li
              v-show="cover"
              :style="{
                'backgroundImage': `url(${cover?cover:''})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'
              }"
              class="img">
              <md-tag
                @click.native="delCover"
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
            <li class="img add" v-show="!cover" @click="upCover">
              <md-icon color="#CCC" name="camera" size="md"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </div>

        <div class="name m20">上传商品轮播图</div>
        <div class="txt">上传清晰光线良好的照片，将有助于产品的销量。</div>
        <div>
          <ul class="pic">
            <li
              :key="index"
              :style="{
                'backgroundImage': `url(${item.response?mobilePic(item.response.data):''})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'
              }"
              class="img"
              v-for="(item, index) in imgList">
              <md-tag
                @click.native="onDeleteImage('reader0', index)"
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
            <li class="img add" @click="addPic">
              <md-icon color="#CCC" name="camera" size="md"></md-icon>
              <p>添加图片</p>
            </li>
          </ul>
        </div>

        <div class="item">
          <div class="title">商品名称</div>
          <input placeholder="请输入商品名称" v-model="formData.name" type="text">
        </div>
        <div class="item">
          <div class="title">商品价格</div>
          <input placeholder="请输入商品价格" v-model="formData.price" type="text">
        </div>
        <div class="info">
          <div class="title">商品详情</div>
          <quill-editor
            class="editor"
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
    <div class="fixbtn" @click="addGoods">确定发布</div>
    <div id="quill-upload" v-show="false" @click="upEdit"> </div>
  </div>
</template>

<script>
  import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: "addGoods",
    data() {
      return {
        formData:{},
        cover:'',
        imageList: {
          reader0: [],
          reader1: [],
        },
        uploadList: 0,
        uploadCount: 0,
        imgList:[],
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
    watch:{
      cover(val){
        console.log(val)
      },
      imgList(nv) {
        console.log(nv);
      },
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
      upCover(){
        console.log('++++++++++执行不',)
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

      addPic(){
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
                this.cover = _res.data;
                }, 800);
              }
              if(index==2){
                setTimeout((_) => {
                  this.imgList.push({ response: _res });
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



      delCover(){
        this.cover =''
      },

      // 删除图片
      onDeleteImage(name, index) {
        this.imgList.splice(index, 1);
      },

      // 提交
      async addGoods(){
        const formData = this.formData
        const swiper = []
        formData.sid =  this.$route.query.sid
        formData.cover = this.cover
        for(const item of this.imgList){
          swiper.push(item.response.data)
        }
        formData.swiper = swiper.toString()
        console.log('swiper++++++', swiper.toString())
        if(!formData.sid) return this.$toast.info('请登录',1000)
        if(!formData.cover) return this.$toast.info('请上传封面图',1000)
        if(!formData.swiper) return this.$toast.info('请上传轮播图',1000)
        if(!formData.name) return this.$toast.info('请输入商品名字',1000)
        if(!formData.price) return this.$toast.info('请输入商品价格',1000)
        if(!formData.desc) return this.$toast.info('请输入商品详情',1000)
        const res = await this.$api.post('/addGoods',formData)
        const { data, success, info } = res.data
        if(!success) return this.$toast.info(info,1000)
        this.$toast.info(info,1000)
        this.$router.go(-1)
      },

    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .nav{
    height: 96px;
    box-sizing: border-box;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size:36px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight: bold;
      color: #333;
    }
    .del{
      font-size:28px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight: bold;
      color:rgba(255,52,52,1);
      line-height:36px;
    }
  }
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
  .editor{
    height: 500px;
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
      width: 686px;
      border-radius: 16px;

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
