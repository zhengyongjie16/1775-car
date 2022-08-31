<template>
  <div class="main">
    <navTag :isSub="true" :subtitle="subtitle" :title="title" @click="doShare"></navTag>
    <div class="content">
      <div>
        <div class="picItem" :id="`pic_${item.id}`" :url="item.path"  v-for="item of carData.attachments" :key="item.id"
             :style="item.id?{background:`url(${item.path}) no-repeat center center`,backgroundSize: `cover`}:{background:`url(${src}) no-repeat center center`,backgroundSize: `cover`}"
           @click="addToCheck(item.id)"
        >
              <div class="roll" v-show="showPoint" :class="[checkIds.includes(item.id)?'ac':'']"></div>
        </div>
      </div>
    </div>
    <div class="ft"></div>
    <md-popup
      v-model="showWenAn"
      :hasMask="true"
      position="bottom"
    >
      <div class="waBox">
         <div class="t">分享文案</div>
        <div class="b">
          <md-tabs @change="handleTabChange">
            <md-tab-pane  name="p1" label="标准">
              <textarea v-model="standarText"></textarea>
            </md-tab-pane>
            <md-tab-pane  name="p2" label="车辆描述">
              <textarea v-model="carDesc"> </textarea>
            </md-tab-pane>
<!--            <md-tab-pane  name="p3" label="车主说">-->
<!--              <textarea v-model="carTell"></textarea>-->
<!--            </md-tab-pane>-->
            <md-tab-pane  name="p4" label="自定义">
              <textarea v-model="newWn"></textarea>
            </md-tab-pane>
          </md-tabs>
        </div>
        <div class="btns">
          <div>不复制</div>
          <div @click="doCopy">复制</div>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import html2canvas from 'html2canvas';
    import { Dialog} from 'mand-mobile'
    export default {

        name: 'Mutipic',
        data() {
            return {
                showPoint:true,
                title: '多图分享',
                subtitle: '立即分享',
                posters: [],
                src:'https://fakeimg.pl/250x250/',
                total:0,
                slider:[],
                carData:{},
                attachments:[],
                checkIds:[],
                showWenAn:true,
                standarText:'',
                carDesc:'',
                carTell:'',
                newWn:'',
                wenan:''
            }
        },
        components: {
            navTag,
        },
        watch: {},
        created() {
            this.getCarInfo()
        },
        methods: {
            doShare(){
             this.showWenAn = true
            },
            addToCheck(id){
                if(!this.checkIds.includes(id)) return  this.checkIds.push(id);
                this.checkIds = this.checkIds.filter(r=>r!=id);
            },
          async getCarInfo(){
            try{
              this.$toast.loading('1775正在加载中');
              const res = await  this.$api.get('/getVehicleInfoApp',{params:{ id: this.$route.query.id }});
              const { success, data } = res.data;
              this.$toast.hide();
              if (success) {
                this.carData = data;
                this.checkIds = this.carData.attachments.map(r=>r.id).slice(0,9)

                const _isAc = window.localStorage.getItem('isAc');
                const _url = _isAc == '0'  ? `http://m.1775.top/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.account}&lxname=${this.$store.state.ac.lxName}`;
                const contactInfo = _isAc =='0'? this.$store.state.company.lxPhone + ` ${this.$store.state.company.lxName}`: this.$store.state.ac.account + ` ${this.$store.state.ac.lxName}`
                this.standarText = `【车辆信息】 ${this.carData.title}\n`+
                  `【上牌时间】 ${new Date(this.carData.brandDate).getFullYear()}年\n`+
                  `【行驶里程】 ${this.carData.mileage}万公里\n`+
                  `【车辆价格】 ${this.carData.onlinePrice}万元\n`+
                  `【车辆详情】 ${_url}\n`+
                  `【联系方式】 ${contactInfo}\n`+
                  `【诚信车商】 ${this.$store.state.company.companyName}`
                this.standarText = this.standarText.trim()
                this.carDesc = this.carData.carDescribe.trim();
                //  this.slider = this.carData.attachments.splice(0,4)
                // this.setInfo(this.carData);1
                // this.getPz();
                // this.getCompanyInfo();

              } else {
                this.$toast.info('获取车辆信息失败');
              }
            }catch (e) {
              this.$toast.info(e,1000)
            }finally {
              this.$toast.hide()
            }

          },
            async mtSave(){
                let count =  0;
                const total = this.checkIds.length;
                for(const id of this.checkIds){
                       console.log('the is is ', id)
                       console.log('the dom ',document.getElementById(`pic_`+id))
                  try{
                    this.$toast.loading(` ${count}/${total}进行中`)
                    // await this.commonSave(document.getElementById(`pic_`+id))
                    const _url = document.getElementById(`pic_`+id).getAttribute('url')
                    console.log('_url',_url)
                    await this.saveByUrl(_url)
                    count++
                    if(count == total) {
                      this.$toast.hide()
                      this.$toast.succeed('保存成功')
                      // todo 拉起微信分享
                    }
                  }catch (e) {
                    this.$toast.info(e,1000)
                  }finally {
                    this.$toast.hide()
                  }


                }
            },
            commonSave(dom){
                return new Promise((resolve, reject) => {
                    const album = '1775';
                    html2canvas(dom,{
                        useCORS:true
                    }).then(canvas => {
                        const abc = canvas.toDataURL('image/jpeg')
                        cordova.plugins.photoLibrary.saveImage(abc, album, (libraryItem) => {
                             console.log('do save the pic')
                            resolve(libraryItem)
                        }, (err) => {
                            console.log(err);
                            reject()
                            cordova.plugins.photoLibrary.requestAuthorization(
                                function () {
                                    // User gave us permission to his library, retry reading it!
                                     this.$toast.succeed('信息获取中');

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

                    }).catch(err=>{
                        console.log('errinfo',err)
                    });
                })
            },
           saveByUrl(_url){
               return new Promise((resolve, reject) => {
                 const album = '1775';
                 cordova.plugins.photoLibrary.saveImage(_url, album, (libraryItem) => {
                   console.log('do save the pic')
                   resolve(libraryItem)
                 }, (err) => {
                   console.log(err);
                   reject()
                   cordova.plugins.photoLibrary.requestAuthorization(
                     function () {
                       // User gave us permission to his library, retry reading it!
                       this.$toast.succeed('权限已经打开');
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

               })
           },
            doCopy(){
                console.log(12312312)


                Dialog.confirm({
                    title: '温馨提示',
                    content: '文案已复制,图片将保存到相册当中,请手动在相册中选择多图发布朋友圈',
                    confirmText: '确定',
                    onConfirm:async  () => {
                        // 隐藏小黄点
                       this.showPoint = false;
                        this.wenan = this.wenan ? this.wenan: this.standarText
                        this.$copyText(this.wenan).then(async (e) => {
                            this.$toast.succeed('复制成功');
                            let _res = await this.mtSave();
                            console.log('_res',_res)
                            this.showPoint = true
                            /*   Wechat.share({
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
                               });*/

                        }, (e) => {
                            this.showPoint = true
                        });

                    },
                })


            },
            async handleTabChange(tab){
                if(tab.name === p1){
                    this.wenan = this.standarText;
                }
                if(tab.name === p2){
                    this.wenan = this.carDesc
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
  .main {
    background: #f7f7f7;
  }

  /* 主要内容 */
  .content {
    flex-direction: row;
    height: 0;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    flex-wrap: wrap;
    padding:10px;


    .picItem{
      width: 30vw;
      height:30vw;
      border: 1px solid #777;
      margin-top: 10px;
      float:left;
      margin-right: 15px;
      position: relative;
      .roll{
        border: 1px solid #d2d2d2;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        top:20px;
        right:20px;
      }
      .ac{
        background: #ff6600;
      }
    }
    .picItem:nth-child(3n){
      margin-right: 0;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 vw(32);

      .item {
        width: vw(210);
        height: vw(382);
        border-radius: vw(16);
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-right: vw(21);
        margin-top: vw(40);
      }

      a:nth-child(3n+3) .item {
        margin-right: 0;
      }
    }
  }



</style>
