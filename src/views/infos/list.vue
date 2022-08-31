<template>
  <div class="main">
    <navTag :relInfos="true" :title="title"></navTag>
    <div class="menu">
      <div :class="{active:type==1}" @click="type=1" class="item">车商求车</div>
      <div :class="{active:type==2}" @click="type=2" class="item">合收好车</div>
      <div :class="{active:type==3}" @click="type=3" class="item">个人相关</div>
    </div>
    <div class="list" v-if="type!=3">
      <md-scroll-view
        :scrolling-x="false"
        :scrolling-y="true"
        @end-reached="moreInfos"
        @refreshing="findInfos"
        auto-reflow
        ref="scrollView"
      >
        <div :key="item.id" class="lable" v-for="(item,index) in list">
          <div class="top">
            <div class="address">{{item.area}}</div>
            <div class="date">
              {{item.addTime | time}}
            </div>
          </div>
          <div class="content" :class="{act:item.type==1&&item.iscollect!=0}">
            <span v-if="item.type==1&&item.iscollect!=0"></span> <em v-if="item.type==1&&item.iscollect!=0"></em>{{item.txt}}
          </div>
          <div class="bottom">
            <div class="lx">
              {{item.lxName}} <span>{{item.lxPhone}}</span>
            </div>
            <div @click="celCollect(item.id)" class="collect actCol" v-if="item.iscollect==2">
              标记 <em></em>
            </div>
            <div class="edit" v-else-if="item.iscollect==0">
              <div @click="$router.push({path:'/relInfos',query:{id:item.id}})" class="tag">
                编辑
                <md-icon name="edit"></md-icon>
              </div>
              <div @click="deleteInfo(item.id,index)" class="tag">
                删除
                <md-icon name="delete"></md-icon>
              </div>
            </div>
            <div @click="collect(item.id,item.type)" class="collect" v-else>
              标记 <em></em>
            </div>
          </div>
        </div>
        <md-scroll-view-more
          :is-finished="listFinished"
          slot="more"
        ></md-scroll-view-more>
      </md-scroll-view>
    </div>
    <div class="list" v-show="type==3">
      <md-scroll-view
        :immediate-check-end-reaching="true"
        :scrolling-x="false"
        :scrolling-y="true"
        @end-reached="moreMyInfos"
        @refreshing="findMyInfos"
        auto-reflow
        ref="scrollView1"
      >
        <div :key="item.id" class="lable" v-for="item in mylist">
          <div class="top">
            <div class="address" v-if="item.info">{{item.info.area}}</div>
            <div class="date" v-if="item.info">
              {{item.info.addTime | time}}
            </div>
          </div>
          <div class="content" :class="{act:item.info.type==1&&item.isRel==1}"  v-if="item.info">
            <span v-if="item.info.type==1&&item.isRel==1"></span> <em v-if="item.info.type==1&&item.isRel==1"></em>  {{item.info.txt}}
          </div>
          <div class="bottom" v-if="item.info">
            <div class="lx">
              {{item.info.lxName}} <span>{{item.info.lxPhone}}</span>
            </div>
            <div @click="celCollect(item.info.id)" class="collect actCol" v-if="item.isRel==1">
              标记 <em></em>
            </div>
            <div class="edit" v-if="item.isRel==0">
              <div @click="$router.push({path:'/relInfos',query:{id:item.info.id}})" class="tag">
                编辑
                <md-icon name="edit"></md-icon>
              </div>
              <div @click="deleteInfo(item.info.id)" class="tag" v-if="item.info.state==0">
                删除
                <md-icon name="delete"></md-icon>
              </div>
            </div>

          </div>
        </div>

        <md-scroll-view-more
          :is-finished="isFinished"
          slot="more"
        ></md-scroll-view-more>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                title: '车源信息',
                type: 1,
                list: [],
                mylist: {
                    info: {
                        area: '',
                        addTime: '',
                        txt: '',
                        lxName: '',
                        lxPhone: ''
                    }
                },

                page: 1,
                listFinished: false,

                mpage: 1,
                isFinished: false,
            }
        },
        created() {
            this.findInfos();
            this.findMyInfos();
        },
        watch: {
            type: function (value) {
                if (value != 3) this.findInfos();
                this.findMyInfos();
            }
        },
        filters: {
            time: value => {
                if (!value) return '';
                let time = new Date(value);
                let year = time.getFullYear();
                let mouth = time.getMonth() + 1;
                let day = time.getDate();
                let hour = time.getHours();
                let min = time.getMinutes();
                let sec = time.getSeconds();
                return `${year}-${mouth}-${day} ${hour}:${min}:${sec}`
            }
        },
        methods: {
            // 获取车源信息
            async findInfos() {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                let _res = await this.$api.get('/carSource/findInfos', {
                    params: {
                        page: 1,
                        limit: 20,
                        type: this.type,
                        account: account,
                        state: 0,
                    }
                });
                let {success, data} = _res.data;
                if (!success) return this.$toast.info('车源信息加载失败', 1000);
                for(const item of data){
                    if(item.iscollect==0||item.iscollect==2){
                    }else {
                        item.iscollect=1
                    }
                }
                this.list = data;
                console.log(this.list)
            },
            // 收藏车源信息
            async collect(id,type) {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/collectInfos', {
                    infosId: id,
                    account: account,
                    type,
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info);
                for ( const item of this.list){
                    if(id==item.id){
                        item.iscollect=2
                    }
                }
            },
            // 取消收藏
            async celCollect(id) {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/cancelInfos', {
                    id: id,
                    account: account,
                });
                let {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info, 1000);
                if (this.type != 3) {
                    for ( const item of this.list){
                        if(id==item.id){
                            item.iscollect=1
                        }
                    }
                } else {
                    for (const index in this.mylist){
                        if(id == this.mylist[index].info.id ){
                            this.mylist.iscollect=1
                        }
                    }
                }
            },
            // 删除车源信息
            async deleteInfo(id,index) {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/deleteInfo', {
                    id,
                    accountId: account,
                });
                const {success, info} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                this.$toast.info(info, 1000);
                if (this.type != 3) {
                    for (const index in this.list){
                        if(id == this.list[index].id ){
                            this.list.splice(index,1)
                        }
                    }
                } else {
                    for (const index in this.mylist){
                        if(id == this.mylist[index].info.id ){
                            this.mylist.splice(index,1)
                        }
                    }
                }

            },
            // 获取关于我的
            async findMyInfos() {
                let account = null;
                if(this.$store.state.ac.account){
                    account = this.$store.state.ac.account
                }else {
                    account = this.$store.state.company.phone
                }
                const res = await this.$api.post('/carSource/findMyInfos', {
                    account: account,
                    page: 1
                });
                const {success, info, data} = res.data;
                if (!success) return this.$toast.info(info, 1000);
                for(const item of data){
                    if(item.info.iscollect==0||item.info.iscollect==2){
                    }else {
                        item.info.iscollect=1
                    }
                }
                this.mylist = data;
            },
            // 下拉加载关于我的
            async moreMyInfos() {
                if (this.isFinished == false) {
                    this.mpage++;
                    this.isFinished = true;
                    let account = null;
                    if(this.$store.state.ac.account){
                        account = this.$store.state.ac.account
                    }else {
                        account = this.$store.state.company.phone
                    }
                    const res = await this.$api.post('/carSource/findMyInfos', {
                        account: account,
                        page: this.mpage,
                    });
                    const {success, info, data} = res.data;
                    if (!success) return this.$toast.info(info, 1000);
                    this.$refs.scrollView1.finishLoadMore();
                    for(const item of data){
                        if(item.iscollect==0||item.iscollect==2){
                        }else {
                            item.iscollect=1
                        }
                    }
                    this.mylist = this.mylist.concat(data);
                }
            },
            // 下拉加载列表
            async moreInfos() {
                if (this.listFinished == false) {
                    this.listFinished = true;
                    this.page++;
                    let account = null;
                    if(this.$store.state.ac.account){
                        account = this.$store.state.ac.account
                    }else {
                        account = this.$store.state.company.phone
                    }
                    let _res = await this.$api.get('/carSource/findInfos', {
                        params: {
                            page: this.page,
                            limit: 20,
                            type: this.type,
                            account: account,
                            state: 0,
                        }
                    });
                    let {success, data} = _res.data;
                    if (!success) return this.$toast.info('车源信息加载失败', 1000);
                    this.$refs.scrollView.finishLoadMore();
                    for(const item of data){
                        if(item.info.iscollect==0||item.info.iscollect==2){
                        }else {
                            item.info.iscollect=1
                        }
                    }
                    this.list = this.list.concat(data);
                }
            },


        }
    }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background: #FFF;
    height: 100%;
  }

  .menu {
    height: 80px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #E3E5E5;

    .item {
      height: 78px;
      font-size: 28px;
      color: #999999;
      line-height: 78px;
      transition: 0.5s;
      position: relative;
    }

    .item::after {
      position: absolute;
      bottom: -1px;
      left: 50%;
      margin-left: -56px;
      content: '';
      width: 112px;
      height: 4px;
      background: #FF4C4C;
      transform: scale(0);
      border-radius: 4px;
    }

    .item.active {
      color: #FF4C4C;
      font-size: 32px;
      font-weight: bold;
      transition: 0.5s;
    }

    .item.active::after {
      content: '';
      background: #FF4C4C;
      transform: scale(1);
      transition: 0.5s;
    }
  }

  .list {
    padding: 0 32px;
    height: 0;
    flex-grow: 1;
    .lable {
      box-sizing: border-box;
      padding: 24px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        color: #999;
        line-height: 1;
      }

      .content {
        font-size: 28px;
        color: #333;
        line-height: 42px;
        margin-top: 18px;
        position: relative;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        span{
          position: absolute;
          left: 0;
          top: 6px;
          display: inline-block;
          width: 80px;
          height: 32px;
          color: #fff;
          background: #FF3434 url("../../assets/seek.png") no-repeat center center;
          background-size: 80px 32px;
          text-align: center;
          line-height: 32px;
          border-radius: 0 16px 16px 16px;
          font-size:20px;
          font-family: AppleSystemUIFont;
        }
        em{
          display: inline-block;
          width: 80px;
          height: 32px;
          margin-right: 12px;
        }
      }
      .content.act{
        text-indent: 3.5em;
      }
      .bottom {
        font-size: 28px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1;
        margin-top: 22px;
        .collect{
          display: flex;
          align-items: center;
          em{
            display: block;
            width: 32px;
            height: 32px;
            background: url("../../assets/star.png") no-repeat center center;
            background-size: 32px 32px;
            margin-left: 16px;
          }
        }
        .actCol{
          color: #FF4C4C;
          em{
            background: url("../../assets/star_1.png") no-repeat center center;
            background-size: 32px 32px;
          }
        }
        .edit {
          display: flex;
          align-items: center;

          .tag {
            margin-left: 40px;
            display: flex;
            align-items: center;

            i {
              margin-left: 12px;
              font-size: 28px;
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
</style>
