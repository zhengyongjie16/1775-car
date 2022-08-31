<template>
  <div class="main">
    <navTag :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :scrolling-x="false"
        auto-reflow
        ref="scrollView"
      >
        <div class="myShare">
          <div class="title">
            <p>我的分享</p>
            <i>
              查看详细信息
              <md-icon name="arrow-right"></md-icon>
            </i>
          </div>
          <div class="data">
            <div class="item">
              <p>{{tongji.shareCount}}</p>
              <i>本周分享次数</i>
            </div>
            <div class="item">
              <p>{{tongji.viewCount}}</p>
              <i>本周浏览次数</i>
            </div>
          </div>
        </div>
        <div class="menu">
          <div class="item" @click="$router.push({name:'Poster'})">
            <div class="icon icon5"></div>
            <p>创意海报</p>
          </div>
          <div class="item" @click="$router.push({name:'Works'})">
            <div class="icon icon6"></div>
            <p>爆款文章</p>
          </div>
          <div class="item" @click="$router.push({name:'ShareCars'})">
            <div class="icon icon7"></div>
            <p>车辆分享</p>
          </div>
       <!--   <div class="item">
            <div class="icon icon8"></div>
            <p>车辆拼图</p>
          </div>-->
          <div class="item" @click="shareAll">
            <div class="icon icon9"></div>
            <p>门店分享</p>
          </div>

        </div>
        <div class="poster">
          <router-link :to="{path:'/Poster'}">
          <div class="name">
            <p>海报推荐</p>
            <i>
              查看更多
              <md-icon name="arrow-right" size="12"></md-icon>
            </i>
          </div>
          </router-link>
          <md-scroll-view
            :scrolling-x="true"
            :scrolling-y="false"
            auto-reflow
            ref="scrollView"
          >
            <div class="slist">
              <div class="pic" v-for="item in posters.slice(0,6)" :key="item.id"
              :style="item.src?{background:`url(${item.src}) no-repeat center center`,backgroundSize:`cover`}:{background:`url(${pic}) no-repeat center center`,backgroundSize:`cover`}"
              @click="$router.push({path:'PosterInfo',query:{id:item.id}})"></div>
            </div>
          </md-scroll-view>

        </div>
        <div class="article">
          <router-link :to="{path:'/Works'}">
          <div class="name">
            <p>文章推荐</p>
            <i>
              查看更多
              <md-icon name="arrow-right" size="12"></md-icon>
            </i>
          </div>
          </router-link>
          <div class="list">
            <!-- 显示三条 -->
            <router-link v-for="item in newsList.slice(0,3)" :key="item.id" :to="{path:'/WorksDetail',query:{id:item.id}}">
            <div class="item" >
              <div class="pic" v-show="item.pic"
                   :style="item.pic?{background: `url(${item.pic}) no-repeat center center`,backgroundSize: `cover`}:{background: `url(${pic}) no-repeat center center`,backgroundSize: `cover`}"></div>
              <div class="pic" v-show="item.pic&&item.pic.length!==1"
                   :style="item.pic?{background: `url(${item.pic[1]}) no-repeat center center`,backgroundSize: `cover`}:{background: `url(${pic}) no-repeat center center`,backgroundSize: `cover`}"></div>
              <div class="data">
                <p>{{item.title}}</p>
                <i>{{item.share}}分享 &nbsp; &nbsp; {{item.pageviews}}查看</i>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </md-scroll-view>
    </div>
    <tab></tab>
  </div>
</template>

<script>
    import navTag from '../../component/navTag';
    import tab from "../../component/tab";
    import {ActionSheet} from 'mand-mobile'
    export default {

        name: 'Marketing',
        data() {
            return {
                title: '营销工具',
                pic: 'https://fakeimg.pl/250x250/',
                slist: ['1', '1', '1', '1', '1'],
                posters:[],
                newsList:[],
                tongji:{
                    shareCount:0,
                    viewCount:0
                }
            };
        },
        components: {
            navTag,tab,
        },
        watch: {},
        created() {
            this.getNewsAll();
            this.getAllPoster();
            this.getTongjiData()
        },
        methods: {
            // share the shop
            shareAll() {
                this.sxBox = false;
                ActionSheet.create({
                    value: true,
                    options: [
                        {
                            label: '分享到朋友圈',
                            value: 0,
                        },
                        {
                            label: '分享给微信好友',
                            value: 1,
                        },
                        {
                            label: '复制链接',
                            value: 2,
                        },
                    ],
                    cancelText: '取消',
                    onSelected: this.$_selected1,
                });
            },
            async $_selected1(item) {
                console.log(item);
                // 获取全部的发车总笔数
                const res = await this.$api.post('/market/getCompanyCount',{cid:this.$store.state.company.id});
                const {data} = res.data;
                const count = data.count
                const _isAc = window.localStorage.getItem('isAc');
              //  const _url = _isAc == '0' ? `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.net.cn/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.phone}`;
                const _url = _isAc == '0' ? `http://m.1775.top/#/shop?companyId=${this.$store.state.company.id}` : `http://m.1775.top/#/shop?companyId=${this.$store.state.company.id}&phone=${this.$store.state.ac.account}&lxname=${this.$store.state.ac.lxName}`;
                const contactInfo = _isAc =='0'? this.$store.state.company.lxPhone + ` ${this.$store.state.company.lxName}`: this.$store.state.ac.account + ` ${this.$store.state.ac.lxName}`

              const lxName = _isAc == 1 ? this.$store.state.ac.lxname : '';


                if (item.value == 0) {
                    Wechat.share({
                        message: {
                            title: `${this.$store.state.company.companyName} - ${count}辆靓车推荐 \n欢迎访问 1775.top 实体车商网`,
                            description: contactInfo,
                            thumb: this.$store.state.company.logo ? this.$store.state.company.logo : 'https://m.1775.net.cn/mlogo.jpg',
                            mediaTagName: 'TEST-TAG-001',
                            messageExt: '这是第三方带的测试字段',
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
                if (item.value == 1) {
                    Wechat.share({
                        message: {
                            title: `${this.$store.state.company.companyName} - ${count}辆靓车推荐`,
                            description: contactInfo,
                            thumb: this.$store.state.company.logo ? this.$store.state.company.logo : 'https://m.1775.net.cn/mlogo.jpg',
                            mediaTagName: 'TEST-TAG-001',
                            messageExt: '这是第三方带的测试字段',
                            messageAction: '<action>dotalist</action>',
                            media: {
                                type: Wechat.Type.WEBPAGE,
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
                if (item.value == 2) {
                    const txt = `${this.$store.state.company.companyName} - ${count}辆靓车推荐 点击访问：${_url}
                    \n来自 ${contactInfo}`;
                    this.$copyText(txt).then((e) => {
                        this.$toast.succeed('复制成功');
                    }, (e) => {

                    });
                }
            },
            // 获取新闻列表
            async getNewsAll(){
                let res = await this.$api.get('/market/getNews');
                const { success, data } = res.data;
                if(!success) return  alert('加载文章失败');
                this.newsList = data;
            },
            //  获取海报列表
            async getAllPoster(){
                let res = await this.$api.post('/getAllPoster',{limit:5});
                const  { success,data } = res.data;
                if(!success) return alert('加载海报失败');
                this.posters = data.rows;
                console.log(data)
            },
            // 获取统计数据
            async getTongjiData(){
                const res = await this.$api.post('/market/getTongji',{
                    companyId: this.$store.state.company.id
                });
                const {data,info,success} = res.data
                if(success){
                     this.tongji = data
                }else{
                    this.tongji = {
                        shareCount:0,
                        viewCount:0
                    }
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
    display: flex;
    flex-direction: column;
    height: 0;
    flex-grow: 1;
    overflow: hidden;
  }

  .myShare {
    width: vw(686);
    height: vw(236);
    background: #fff;
    border-radius: vw(16);
    margin: vw(40) auto 0;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: vw(20) vw(20) 0;

      p {
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: vw(32);
        font-size: vw(32);
      }

      i {
        font-size: vw(24);
        color: rgba(153, 153, 153, 1);
        line-height: 1;
      }
    }

    .data {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: vw(64) 0 0;

      .item {
        flex: 1;
        text-align: center;

        p {
          font-size: vw(48);
          font-weight: bolder;
          color: rgba(51, 51, 51, 1);
          line-height: 1;
        }

        i {
          color: rgba(102, 102, 102, 1);
          margin-top: vw(20);
          font-size: vw(24);
        }
      }
    }
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      color: rgba(51, 51, 51, 1);
      font-size: vw(32);
      font-weight: bold;
    }

    i {
      font-size: vw(24);
      color: #999;

      i {
        margin-right: vw(20);
      }
    }
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: vw(56);
    padding: 0 vw(20);

    .item {
      width: 0;
      flex-grow: 1;
      text-align: center;

      .icon {
        width: vw(80);
        height: vw(80);
        margin: 0 auto;
        background: #fff;
        border-radius: 50%;
      }
      .icon.icon5{
        background: url("../../assets/icon5.png") no-repeat center center;
        background-size: vw(80) vw(80);
      }
      .icon.icon6{
        background: url("../../assets/icon6.png") no-repeat center center;
        background-size: vw(80) vw(80);
      }
      .icon.icon7{
        background: url("../../assets/icon7.png") no-repeat center center;
        background-size: vw(80) vw(80);
      }
      .icon.icon8{
        background: url("../../assets/icon8.png") no-repeat center center;
        background-size: vw(80) vw(80);
      }
      .icon.icon9{
        background: url("../../assets/icon9.png") no-repeat center center;
        background-size: vw(80) vw(80);
      }

      p {
        line-height: 1;
        color: rgba(102, 102, 102, 1);
        font-size: vw(24);
        margin-top: vw(20);
      }
    }
  }

  .poster {
    margin-top: vw(80);

    .name {
      padding: 0 vw(32);
    }

    .slist {
      padding-left: vw(32);
      display: flex;
      height: vw(354);
      margin-top: vw(40);
      .pic {
        width: vw(200);
        height: vw(354);
        margin-right: vw(18);
        border-radius: vw(4);
      }
    }

  }

  .article {
    padding: 0 vw(32);
    margin-top: vw(82);

    .name {
      margin-bottom: vw(40);
    }

    .list {
      display: flex;
      flex-direction: column;
      padding-bottom: vw(80);

      .item {
        display: flex;
        padding: vw(20);
        border-radius: vw(16);
        background: #fff;
        border-radius: vw(4);
        margin-bottom: vw(16);

        .pic {
          width: vw(180);
          height: vw(120);
          border-radius: vw(4);
          margin-right: vw(18);
        }

        .data {
          width: 0;
          flex-grow: 1;
          height: vw(120);
          position: relative;

          p {
            font-size: vw(28);
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: vw(42);
          }

          i {
            position: absolute;
            bottom: 0;
            font-size: vw(24);
            color: rgba(153, 153, 153, 1);
            line-height: 1;
          }
        }
      }

    }
  }
</style>
