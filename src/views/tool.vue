<template>
    <div>
      <van-nav-bar
        title="营销工具"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="tlsec">
         <h1>海报推荐</h1>
          <div class="postList">
              <div v-for="item of postList" class="poster" :key="item.id"  @click="$router.push({name:'poster',query:{id:item.id}})">
                <img :src="item.src"  alt="">
            <!-- <qrcode-vue :value="value" :size="20" class="qrcode" level="H"></qrcode-vue>-->
              </div>

          </div>
      </div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'tool',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      postList: [],
      value: 'himan',
    };
  },
  created() {
    this.getPostList();
  },
  methods: {
    async getPostList() {
      const res = await this.$api.post('/getAllPoster', { limit: 10 });
      const { success, data } = res.data;
      if (success) {
        this.postList = data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tlsec{
  border-bottom: 10px solid #d4d4d4;
  padding:vw(30);
  h1{
    font-size: vw(40);
    font-weight: 400;
    line-height: 2;
  }
}
  .postList{
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    div{
      border: 1px solid #ccc;
      width: vw(300);
      height: vw(500);
      flex-shrink: 0;
      margin-bottom: 10px;
      img{
        width: vw(300);
        height: vw(500);
      }
    }
  }
  .poster{
    position: relative;
    .qrcode{
      position: absolute;
      left:10px;
      top:20px;
      width: 100px!important;
      height: 100px!important;
      canvas{
        width: 100%!important;
        height: 100%!important;

      }
    }

  }
</style>
