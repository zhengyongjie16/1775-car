<template>
  <div class="main">
    <van-nav-bar
      title="海报"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="ctbox">
      <div class="posterbd" id="posterbd" ref="poster" :style="{height: `${1334*80/750}vw`}">
        <img :src="imgSrc" alt="" crossorigin="anonymous" >
        <div class="qrcode"
             :style="{
                height:`${postInfo.height*80/750}vw`,
                width: `${postInfo.width*80/750}vw`,
                top: `${postInfo.posTop*80/750}vw`,
                left:`${postInfo.posLeft*80/750}vw`
             }"
        >
          <qrcode :value="qrurl" :options="{  height:`${postInfo.height*80/750}vw`,
                width: `${postInfo.width*80/750}vw`, }"></qrcode>
        </div>
      </div>
    </div>

    <div class="ft">
      <div @click="toFriend">
        <div><i class="iconfont iconweixin"></i></div>
        发送给朋友
      </div>
      <div @click="popBottom=true">
        <div><i class="iconfont iconpengyouquan"></i></div>
        朋友圈
      </div>
      <div @click="save">
        <div><i class="iconfont iconxiangce"></i></div>
        保存到本地
      </div>
    </div>
    <md-popup
      v-model="popBottom"
      position="center"
    >
      <md-popup-title-bar
        title="文案内容"
        describe="复制后可以直接粘贴"
        ok-text="复制"
        cancel-text="取消"
        @confirm="doCopy"
        @cancel="popBottom=false"
      ></md-popup-title-bar>
      <div class="wenan">
        <md-field>
          <md-textarea-item
            ref="demo0"
            title="文案"
            class="example"
            v-model="wenan"
            :rows="6"
            placeholder="普通文本域"
          />
        </md-field>

      </div>
    </md-popup>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';


export default {

  name: 'poster',
  data() {
    return {

      id: '',
      imgSrc: '',
      wenan: '',
      popBottom: false,
        qrurl:'',
        postInfo:{
            height:0,
            width:0,
            posTop:0,
            posLeft:0
        }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getPoster();
    const _isAc = window.localStorage.getItem('isAc');
    const _url = _isAc == '0' ? `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.phone}`;

    this.qrurl = _url
    this.wenan = `【联系我们】 ${this.$store.state.company.lxPhone}
                  \n【欢迎到店】 ${this.$store.state.company.address}
                  \n【我的店铺】 ${_url}
    `;
  },
  methods: {

    async getPoster() {
      try{
        this.$toast.loading('海报加载中')
        const res = await this.$api.post('/getPoster', { id: this.id });
        this.$toast.hide()
        const { success, data } = res.data;
        if (success) {
          this.imgSrc = data.src;
          this.postInfo = data
        }
      }catch (e) {
        this.$toast.info(e,1000)
      }finally {
        this.$toast.hide()
      }
    },
    toFriend() {

        html2canvas(document.querySelector("#posterbd"),{
            useCORS:true
        }).then(canvas => {
                const abc = canvas.toDataURL('image/jpeg')
            Wechat.share({
                message: {

                    title: `${this.$store.state.company.companyName}欢迎您`,
                    description: this.wenan,
                    thumb: abc,
                    media: {
                        type: Wechat.Type.IMAGE,
                        image: this.imgSrc,

                    },
                },
                scene: Wechat.Scene.SESSION,

            }, () => {
                this.$toast.succeed('分享成功');
            }, (reason) => {
                this.$toast.failed(reason);
            });
        })

    },
    doCopy() {
      this.$copyText(this.wenan).then(async (e) => {
        this.$toast.succeed('复制成功');

        let _res = await this.commonSave();
        console.log('_res',_res)
          Wechat.share({
              message: {
                  title: `${this.$store.state.company.companyName}欢迎您`,
                  description: this.wenan,
                  thumb: _res.photoURL,
                  media: {
                      type: Wechat.Type.IMAGE,
                      image: this.imgSrc,
                  },
              },
              scene: Wechat.Scene.TIMELINE,

          }, () => {
              this.$toast.succeed('分享成功');
          }, (reason) => {
              this.$toast.failed(reason);
          });

      }, (e) => {

      });
    },
    // save() {
    //   window.cordova.plugins.imagesaver.saveImageToGallery(encodeURI(this.imgSrc), ok => this.$toast.succeed(ok), err => this.$toast.failed(err));
    // },
    /*    save() {
      html2canvas(document.getElementById('posterbd')).then((canvas) => {
        document.body.appendChild(canvas);
        canvas.id = 'mp';
        window.canvas2ImagePlugin.saveImageDataToLibrary(
          (msg) => {
            this.$toast.succeed('保存成功');
          },
          (err) => {
            console.log(err);
            this.$toast.failed('保存失败', err);
          },
          document.getElementById('mp'),
        );
      });
    }, */
    commonSave(){
        return new Promise((resolve, reject) => {
            const album = '1775';
            html2canvas(document.querySelector("#posterbd"),{
                useCORS:true
            }).then(canvas => {
                const abc = canvas.toDataURL('image/jpeg')
                cordova.plugins.photoLibrary.saveImage(abc, album, (libraryItem) => {
                     resolve(libraryItem)
                }, (err) => {
                    console.log(err);
                    reject()
                    cordova.plugins.photoLibrary.requestAuthorization(
                        function () {
                            // User gave us permission to his library, retry reading it!
                           // this.$toast.succeed('get info');

                        },
                        function (err) {
                            this.$toast.failed('不确定权限就不能正常使用');
                            throw err
                            // User denied the access
                        }, // if options not provided, defaults to {read: true}.
                        {
                            read: true,
                            write: true,

                        },

                    );
                    this.$toast.failed(err);
                });

            });
        })
    },
    save() {
      const album = '1775';
        html2canvas(document.querySelector("#posterbd"),{
            useCORS:true
        }).then(canvas => {
            const abc = canvas.toDataURL('image/jpeg')
            console.log(abc)
            cordova.plugins.photoLibrary.saveImage(abc, album, (libraryItem) => {
                console.log(libraryItem)
                this.$toast.succeed('保存成功');
            }, (err) => {
                console.log(err);
                cordova.plugins.photoLibrary.requestAuthorization(
                    function () {
                        // User gave us permission to his library, retry reading it!
                        this.$toast.succeed('get info');
                    },
                    function (err) {
                        this.$toast.failed('not ok');
                        // User denied the access
                    }, // if options not provided, defaults to {read: true}.
                    {
                        read: true,
                        write: true,

                    },

                );
                this.$toast.failed(err);
            });

        });

    },
    /*    save() {
      const pictureUrl = encodeURI(this.imgSrc);
      let canvas; let context; let imageDataUrl; let imageData;
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous');
      img.onload = () => {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        context = canvas.getContext('2d');
        canvas.id = 'mypic';
        context.drawImage(img, 0, 0);
        try {
          console.log(canvas);
          imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
          imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
          window.canvas2ImagePlugin.saveImageDataToLibrary(
            (msg) => {
              this.$toast.succeed(msg);
            },
            (err) => {
              this.$toast.failed(err);
            },
            document.getElementById('mypic'),
          );
        } catch (e) {
          console.log(e);
          this.fail(e.message);
        }
      };
      try {
        img.src = pictureUrl;
      } catch (e) {
        this.fail(e.message);
      }
    }, */
    success() {
      this.$toast.succeed('上传成功');

    },
    fail(msg) {
      this.$toast.failed(msg);
    },
  },
};
</script>

<style scoped lang="scss">
.main{
  display: flex;
  flex-direction: column;
  height: 100%;

}
.ctbox{
  height: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
  .posterbd{
    position: relative;
  }
.posterbd img{
  width: 80vw;
  margin:0 auto;
}
  .ft{
    height: 60px;
    border: 1px solid #000;
    display: flex;
    justify-content: space-between;
    &>div{
      width: 25vw;
      font-size: 13px;
      text-align: center;
      i{
        font-size: 30px;
      }
    }
  }
  .wenan{

    width: 90vw;
    padding:vw(10);
    background: #fff;
    .md-field{
      padding-top: vw(5);
    }
    text-area{
      min-height: 10px;
      font-size: 13px;
    }
  }

  .qrcode{
    position: absolute;
    canvas{
      width: 100%!important;
      height: 100%!important;
    }
  }
.wenan  ::v-deep {
    .md-field-item.is-solid .md-field-item-title{
      display: none;
    }
    .md-field-item-control{
      font-size: 3vw;
    }
    textarea{
      font-size: 13px;
      font-weight: normal;
    }
  }
</style>
