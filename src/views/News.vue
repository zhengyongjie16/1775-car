<template>
  <div class="main">
      <div class="tabNav">
          <md-icon name="arrow-left" class="navBt" @click="$router.back()"></md-icon>
           {{title}}
      </div>
      <div class="ct">
        <md-scroll-view
        :scrolling-y="true"
        :scrolling-x="false"
        :auto-reflow="true"
        >
          <h1>{{news.title}}</h1>
          <div class="info">
            <span v-if="news.author">作者: {{news.author}} </span>
            <span v-if="news.date">{{news.date}} </span>
            <span v-if="news.cat">{{news.cat}}</span>
          </div>
          <div v-html="news.content" class="content"></div>

        </md-scroll-view>

      </div>
  </div>
</template>

<script>
  export default {
    name: 'News',
    data(){
      return {
        title:'',
        news:{
          title:'文章的标题内容',
          author:'作者名称',
          date:'2019.10.13',
          cat:'',
          content: '这里放置的文档'
        }   ,
        newsId:null
      }
    } ,
    created(){
      const {id} = this.$route.query;
      console.log('id',id)
      if(!id) {
        this.$toast.failed('请出入正确的文章id')
         setTimeout(() => this.$router.go(-1), 2000);
        return
      }
      this.newsId = id
      this.getNews()
    },
    methods:{
      async getNews(){
        const res = await this.$api.get(`/new/getNewById?id=${this.newsId}`);
        const {success,data} = res.data
        if(success){
          this.news = data
        } else{
            this.$toast.failed('请出入正确的文章id')
            setTimeout(()=>this.$router.go(-1),2000);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
.tabNav{
  height: 80px;
  background: #efefef;
  line-height: 80px;
  width: 100vw;
  text-align: center;
}
  .ct{
    height: 0;
    flex-grow: 1;
    border:1px solid #ccc;
    padding:30px;
    color:#333;
    overflow: hidden;
    h1{
      font-size: 40px;
    }
    img{
      max-width: 80vw;
      width: 80vw!important;
    }

  }

  .navBt{
    float:left;
    position:relative;
    top:50%;
    transform: translateY(-50%)   translateX(30px);
  }
  .info{
    span{
      line-height: 2;
      margin-right: 20px;
      color:#999;
    }

  }

  .content{

    img{
      width: 100%;
    }
  }
</style>
