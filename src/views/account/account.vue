<template>
  <div class="mbox main">
    <navTag :isSub="true" @click="$router.push({name:'addAccount'})" class="accNavtag" subtitle="添加" title="员工管理"></navTag>
    <div class="mainbox">
      <div class="searchBox">
        <div class="search">
          <input placeholder="搜索名字或电话号码" type="text" v-model="keyWord">
        </div>
        <div @click="getAcList" class="searchBtn">搜索</div>
      </div>
      <md-scroll-view
      auto-reflow
      :scrolling-y="true"
      :scrolling-x="false">
      <ul>
        <li :key="item.phone" @click="$router.push({name:'AccountDetail',query:{id:item.id}})" class="acBox"
            v-for="item of acList">
          <div :style="item.pic?{background:`url(${item.pic}) no-repeat center center`,backgroundSize:`cover`}:{}" class="avt"
               v-if="item.pic"></div>
          <div class="avt avtTxt" v-else>
            {{item.lxName.slice((item.lxName.length-1),(item.lxName.length))}}
          </div>
          <div class="info">
            <div class="row1">
              <span class="name">{{item.lxName}}</span>
              <span>{{item.sex==1?'女':'男'}}</span>
              <span>{{item.lxPhone}}</span>
            </div>
            <div class="row2">
              <span>跟进客户:{{item.num}}</span>
              <span>周分分享量:32</span>
            </div>
          </div>
        </li>
      </ul>

      </md-scroll-view>
    </div>
    <md-popup @beforeShow="preShowEdit" v-model="showEdit">
      <div class="addBox">
        <md-field>
          <md-input-item
            :maxlength="5"
            align="right"
            placeholder="请填写姓名"
            ref="input0"
            title="姓名"
            v-model="editData.lxname"
          ></md-input-item>
          <md-input-item
            align="right"
            placeholder="请填写手机号码"
            title="手机号码"
            type="phone"
            v-model="editData.phone"
          ></md-input-item>
          <md-input-item
            align="right"
            placeholder="请填写密码"
            title="密码"
            type="password"
            v-model="editData.pwd"
          ></md-input-item>
          <md-field-item solid title="发布车">
            <md-switch
              style="float:right"
              v-model="editData.addEnable"
            ></md-switch>
          </md-field-item>
          <md-field-item solid title="编辑车">
            <md-switch
              style="float:right"
              v-model="editData.editEnable"
            ></md-switch>
          </md-field-item>
          <md-field-item solid title="删除车">
            <md-switch
              style="float:right"
              v-model="editData.delEnable"
            ></md-switch>
          </md-field-item>
        </md-field>
        <md-button @click="doEdit" type="primary">确定</md-button>
      </div>
    </md-popup>

  </div>
</template>

<script>
    import {Dialog} from 'mand-mobile';

    export default {
        name: 'account',
        data() {
            return {
                showEdit: false,
                showAdd: false,
                addEnable: false,
                editEnable: false,
                delEnable: false,
                lxname: '',
                phone: '',
                keyWord: '',
                pwd: '',
                acList: [],
                editData: {
                    addEnable: false,
                    editEnable: false,
                    delEnable: false,
                    lxname: '',
                    phone: '',
                    pwd: '',
                    uid: '',
                },
            };
        },
        created() {
            this.getAcList();
        },
        methods: {
            edit(item) {
                this.editData = {
                    uid: item.uid,
                    lxname: item.lxname,
                    phone: item.phone,
                    pwd: item.pwd,
                    addEnable: !!item.addEnable,
                    editEnable: !!item.editEnable,
                    delEnable: !!item.delEnable,
                };
                this.showEdit = true;
            },
            add() {
                this.showAdd = true;
            },
            preShowEdit() {
            },
            preShow() {
                this.addEnable = false;
                this.editEnable = false;
                this.delEnable = false;
                this.lxname = '';
                this.phone = '';
                this.pwd = '';
            },
            async doAdd() {
                if (!this.lxname) return this.$toast.info('请填写正确的姓名');
                if (!this.phone) return this.$toast.info('请填写手机会长');
                if (!this.pwd) return this.$toast.info('请填写登录密码');
                const postData = {
                    lxname: this.lxname,
                    phone: this.phone,
                    pwd: this.pwd,
                    addEnable: this.addEnable ? 1 : 0,
                    editEnable: this.editEnable ? 1 : 0,
                    delEnable: this.delEnable ? 1 : 0,
                    companyId: this.$store.state.company.id,
                };
                const res = await this.$api.post('/ac/addAccount', postData);
                const {success, data, info} = res.data;
                if (success) {
                    this.$toast.succeed('添加成功');
                    this.getAcList();
                    this.showAdd = false;
                } else {
                    this.$toast.failed(info);
                }
            },
            async doEdit() {
                if (!this.editData.lxname) return this.$toast.info('请填写正确的姓名');
                if (!this.editData.phone) return this.$toast.info('请填写手机会长');
                if (!this.editData.pwd) return this.$toast.info('请填写登录密码');
                const postData = {
                    lxname: this.editData.lxname,
                    phone: this.editData.phone,
                    pwd: this.editData.pwd,
                    addEnable: this.editData.addEnable ? 1 : 0,
                    editEnable: this.editData.editEnable ? 1 : 0,
                    delEnable: this.editData.delEnable ? 1 : 0,
                    companyId: this.$store.state.company.id,
                    uid: this.editData.uid,
                };
                const res = await this.$api.post('/ac/updateAccount', postData);
                const {success, data, info} = res.data;
                if (success) {
                    this.$toast.succeed('更新成功');
                    this.getAcList();
                    this.showEdit = false;
                } else {
                    this.$toast.failed(info);
                }
            },
            async doDel(item) {
                Dialog.confirm({
                    title: '确认',
                    content: `确认要删除${item.lxname}的账号?`,
                    confirmText: '确定',
                    onConfirm: async () => {
                        const res = await this.$api.post('/ac/delAccount', {uid: item.uid});
                        const {success, data} = res.data;
                        if (success) {
                            this.$toast.succeed('删除成功');
                            this.getAcList();
                        } else {
                            this.$toast.failed('删除失败');
                        }
                    },
                });
            },
            async getAcList() {
                const res = await this.$api.get('/bus/company/findSubAccount?t=' + Date.now(),
                    {
                        params: {
                            companyId: this.$store.state.company.id,
                            limit: 10,
                            page: 1,
                            keyWord: this.keyWord
                        }
                    });
                    console.log('res',res)
                    console.log(111,Date.now())
                    console.log('keyWord',this.keyWord)
                const {success, data} = res.data;
                if (success) {
                    this.acList = data;
                }
            },
        },

    };
</script>

<style lang="scss" scoped>

  .addBox {
    padding: vw(50);
    background: #fff;
    width: 80vw;

  }

  .mbox {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(247, 247, 247, 1);

    .navtop {

    }

    .mainbox {
      height: 0;
      flex-grow: 1;
      overflow-x: auto;

      li {
        width: 686px;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        margin: 16px auto;
      }

      .acZone {

      }

      .searchBtn {
        font-size: 32px;
        font-weight: 600;
        line-height: 1;
      }
    }
  }

  .searchBox {
    box-sizing: border-box;
    height: 96px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .search {
    width: 586px;
    height: 72px;
    box-sizing: border-box;
    background: rgba(246, 246, 246, 1);
    border-radius: 36px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      font-size: 32px;
    }

    input {
      width: 100%;
      height: 100%;
      line-height: 72px;
      outline: none;
      background: none;
      border: none;
      text-align: center;
    }
  }

  .acBox {
    display: flex;
    padding: 20px;
    box-sizing: border-box;

    .avt {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .avtTxt {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FF4C4C;
      border: 1px solid #E3E5E5;
      color: #fff;
      font-size: 48px;
      font-weight: bold;
    }

    .info {
      font-size: 28px;
      color: #999;
      margin-left: 40px;

      .name {
        font-size: 32px;
        color: #333;
        font-weight: 600;
      }

      .row1 {
        margin-bottom: 30px;
        line-height: 1;
      }

      span {
        margin-right: 20px;
      }
    }
  }
</style>
