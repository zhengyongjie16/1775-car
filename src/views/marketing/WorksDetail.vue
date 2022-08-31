<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="title ">
          {{info.title}}
        </div>
        <!-- 富文本 -->
        <div class="info worksDetail" v-html="info.content"></div>
      </md-scroll-view>
    </div>
    <div class="share" @click="isShare=true">
       <i></i> 分享
    </div>

    <template>
      <md-action-sheet
        v-model="isShare"
        :title="shareTitle"
        :default-index="defaultIndex"
        :invalid-index="invalidIndex"
        :cancel-text="cancelText"
        :options="options"
        @selected="handleShare"
        @cancel="isShare=false"
      ></md-action-sheet>
    </template>
  </div>
</template>

<script>
  import navTag from '../../component/navTag';

  export default {

    name: 'Marketing',
    data() {
      return {
        title: '文章详情',
        info:'',
        isShare:false,
          shareTitle: '分享',
          options: [
              {
                  label: '分享给我的好友',
                  value: 0,
              },
              {
                  label: '分享到朋友圈',
                  value: 1,
              },
          ],
          defaultIndex: 1,
          invalidIndex: 2,
          cancelText: '取消',
      };
    },
    components: {
      navTag,
    },
    watch: {},
    created(){
        this.getNewById()
    },
    methods: {
        handleShare(item){
          // const _url = 'http://m.1775.top/#/News?id='+this.$route.query.id;
          // 设置转发链接
          const _isAc = window.localStorage.getItem('isAc');
          // const _isAc = '0';
          const _url = _isAc == '0' ? `http://m.1775.top/#/News?id=${this.$route.query.id}&companyId=${this.$store.state.company.id}` : `http://m.1775.top/#/News?id=${this.$route.query.id}&companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.account}&lxName=${this.$store.state.ac.lxName}`;
          if(item.label === '分享给我的好友'){
                Wechat.share({
                    message: {
                        title: `${this.info.title}`,
                        description: '',
                        thumb: this.info.pic ? this.info.pic[0] : 'http://m.1775.top/mlogo.jpg',
                        mediaTagName: 'TEST-TAG-001',
                        messageExt: 1775,
                        messageAction: '<action>dotalist</action>',
                        media: {
                            type: Wechat.Type.SESSION,
                            webpageUrl: _url,
                        },
                    },
                    scene: Wechat.Scene.SESSION, // share to Timeline
                }, () => {
                    this.$toast.success('分享成功');
                }, (reason) => {
                    //   alert(`Failed: ${reason}`);
                    this.$toast.failed(reason);
                });
            }
            if(item.label === '分享到朋友圈'){
                Wechat.share({
                    message: {
                        title: `${this.info.title}`,
                        description: '',
                        thumb: this.info.pic ? this.info.pic[0] : 'http://m.1775.top/mlogo.jpg',
                        mediaTagName: 'TEST-TAG-001',
                        messageExt: 1775,
                        messageAction: '<action>dotalist</action>',
                        media: {
                            type: Wechat.Type.WEBPAGE,
                            webpageUrl: _url,
                        },
                    },
                    scene: Wechat.Scene.TIMELINE, // share to Timeline
                }, () => {
                    this.$toast.success('分享成功');
                }, (reason) => {
                    //   alert(`Failed: ${reason}`);
                    this.$toast.failed(reason);
                });
            }
            this.isShare  = false
        },
        async getNewById(){
            let res = await  this.$api.get('/new/getNewById',{
                params:{
                    id:this.$route.query.id
                }
            })
            let { success,data } = res.data
            if(!success) return alert('文章详情获取失败')
            this.info = data
        }
    }
  };
</script>
<style lang="scss" scoped>
  .main{
    background: #fff;
  }

  /* 主要内容 */
  .content {
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    padding: 0 vw(32);
    .info{
      padding-bottom: vw(30);
      margin-top: vw(62);
    }
  }
  .title{
    text-align: left;
    margin-top: vw(28);
    font-size: vw(40);
    color: #333;
    line-height: vw(60);
    font-weight: bold;
  }
  .share{
    height: vw(96);
    display: flex;
    align-items: center;
    justify-content: center;
    color:rgba(255,52,52,1);
    font-size: vw(32);
    i{
      display: block;
      width: vw(48);
      height: vw(48);
      background: url("../../assets/icon4.png") no-repeat center center;
      background-size: vw(48) vw(48);
      margin-right: vw(12);
    }
  }

  /* todo  富文本样式无法修改  */
  .worksDetail >>> img{
    width: 100%!important;
  }


</style>
