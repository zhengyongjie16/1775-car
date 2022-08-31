<template>
  <div class="main">
    <navTag :isShare="false" :title="title"></navTag>
    <div class="content">
      <md-scroll-view
        :auto-reflow="true"
        :immediate-check-end-reaching="true"
        :scrolling-x="false"
        :scrolling-y="true"
        ref="scrollView4"
      >
        <div class="txt">
          <textarea placeholder="请描述车辆信息和车源信息" v-model="txt"></textarea>
        </div>
        <div class="item">
          <div class="name">联系人姓名</div>
          <input placeholder="请输入姓名" type="text" v-model="lxName">
        </div>
        <div class="item">
          <div class="name">联系人电话</div>
          <input placeholder="请输入电话" type="text" v-model="lxPhone">
        </div>
        <div class="item">
          <div class="name">车源地</div>
          <input placeholder="请输入车源所在市/县" type="text" v-model="area">
        </div>
        <div class="item">
          <div class="name">信息类型</div>
          <div class="tag">
            <div :class="{active:type==1}" @click="type=1" class="lable">商家求车</div>
            <div :class="{active:type==2}" @click="type=2" class="lable">合收好车</div>
          </div>
        </div>
        <div class="tips">列为求车信息，将会在客户端-商家求车模块展示</div>
      </md-scroll-view>
    </div>
    <div @click="updateInfo" class="btn" v-if="$route.query.id">确认修改</div>
    <div @click="releaseInfo" class="btn" v-else>确认发布</div>
  </div>
</template>

<script>
    export default {
        name: "relInfos",
        data() {
            return {
                title: '发布车源信息',
                type: 1,
                txt: '',
                lxName: '',
                lxPhone: '',
                area: ''
            }
        },
        created(){
          if(this.$route.query.id) this.getInfosData()
        },
        methods: {
            // 发布车源信息
            async releaseInfo() {
                if(!this.txt) return this.$toast.info('请输入车辆状态和车源信息');
                if(!this.lxName) return this.$toast.info('请输入联系人姓名');
                if(!this.lxPhone) return this.$toast.info('请输入联系人电话');
                if(!this.area) return this.$toast.info('请输入车源地');
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                let res = await this.$api.post('/carSource/releaseInfo', {
                    type: this.type,
                    txt: this.txt,
                    lxName: this.lxName,
                    lxPhone: this.lxPhone,
                    area: this.area,
                    source: 1,
                    state: 0,
                    accountId: account
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info);
                this.$toast.info(info);
                this.$router.go(-1);
            },
            // 获取车源信息详情
            async getInfosData(){
                this.page++;
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                let res = await this.$api.post('/carSource/getInfosData',{
                    id: this.$route.query.id,
                    accountId: account,
                });
                const { success, info, data } = res.data;
                if(!success) return this.$toast.info(info,1000);
                this.type = data.type;
                this.txt = data.txt;
                this.lxName = data.lxName;
                this.lxPhone = data.lxPhone;
                this.area = data.area;
            },
            // 更新车源信息
            async updateInfo() {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                if(!this.txt) return this.$toast.info('请输入车辆状态和车源信息');
                if(!this.lxName) return this.$toast.info('请输入联系人姓名');
                if(!this.lxPhone) return this.$toast.info('请输入联系人电话');
                if(!this.area) return this.$toast.info('请输入车源地');
                let res = await this.$api.post('/carSource/updateInfo', {
                    type: this.type,
                    txt: this.txt,
                    lxName: this.lxName,
                    lxPhone: this.lxPhone,
                    area: this.area,
                    source: 1,
                    state: 0,
                    id:this.$route.query.id,
                    accountId: account
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info);
                this.$toast.info(info);
                this.$router.go(-1);
            },
        }

    }
</script>

<style lang="scss" scoped>
  input::placeholder, textarea::placeholder {
    color: #999;
  }

  .main {
    background: #fff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .content {
    height: 0;
    flex-grow: 1;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .txt {
      box-sizing: border-box;
      width: 686px;
      height: 360px;
      padding: 20px;
      border-radius: 16px;
      background: #f7f7f7;
      margin-top: 16px;

      textarea {
        font-size: 32px;
        color: #666;
        width: 100%;
        height: 100%;
        resize: none;
        background: #f7f7f7;
        border: none;
      }
    }

    .item {
      box-sizing: border-box;
      padding: 0 24px;
      display: flex;
      align-items: center;
      height: 100px;
      background: #f7f7f7;
      border-radius: 16px;
      margin-top: 16px;
      justify-content: space-between;

      .name {
        font-size: 28px;
        color: #666;
        font-weight: bold;
      }

      input {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        color: #666;
        text-align: right;
        border: none;
        background: #f7f7f7;
      }

      div.tag {
        display: flex;
        align-items: center;

        .lable {
          width: 150px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin-left: 40px;
          box-sizing: border-box;
          border: 1px solid #999;
          color: #999;
          font-size: 28px;
        }

        .lable.active {
          color: #FF3434;
          border-color: #FF3434;
        }
      }
    }

    .tips {
      padding: 20px;
      font-size: 24px;
      color: #999;
      line-height: 1;
    }
  }

  .btn {
    width: 688px;
    height: 80px;
    margin: 0 auto 40px;
    border-radius: 16px;
    background: #FF4C4C;
    color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 80px;
  }
</style>
