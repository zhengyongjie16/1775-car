<template>
<div class="mbox">
  <van-nav-bar
    title="子账号管理"
    left-text="返回"
    right-text="添加"
    left-arrow
    @click-left="$router.go(-1)"
    @click-right="add"
    class="navtop"
  />

<div class="mainbox">
  <ul>
    <li v-for="item of acList" :key="item.phone">
     <div>
      <p style="font-weight: 600;"> {{item.lxname}}</p>
      <p>{{item.phone}}</p>
     </div>
      <div class="acZone">
        <md-button type="primary" size="small" icon="delete" plain inline style="margin-right:10px" @click="doDel(item)">删除</md-button>
        <md-button type="primary"  size="small"  icon="edit" plain inline  @click="edit(item)">修改</md-button>
      </div>
    </li>
  </ul>
</div>
  <md-popup v-model="showAdd" @beforeShow="preShow">
     <div class="addBox">
       <md-field>
         <md-input-item
           ref="input0"
           title="姓名"
           placeholder="请填写姓名"
           :maxlength="5"
           align="right"
           v-model="lxname"
         ></md-input-item>
         <md-input-item
           title="手机号码"
           type="phone"
           v-model="phone"
           align="right"
           placeholder="请填写手机号码"
         ></md-input-item>
         <md-input-item
           title="密码"
           type="password"
           v-model="pwd"
           align="right"
           placeholder="请填写密码"
         ></md-input-item>
         <md-field-item solid title="发布车">
           <md-switch
             v-model="addEnable"
             style="float:right"
           ></md-switch>
         </md-field-item>
         <md-field-item solid title="编辑车"  >
           <md-switch
             style="float:right"
             v-model="editEnable"
           ></md-switch>
         </md-field-item>
         <md-field-item solid title="删除车"  >
           <md-switch
             style="float:right"
             v-model="delEnable"
           ></md-switch>
         </md-field-item>
       </md-field>
       <md-button  type="primary"  @click="doAdd">确定</md-button>
     </div>
  </md-popup>

  <md-popup v-model="showEdit" @beforeShow="preShowEdit">
    <div class="addBox">
      <md-field>
        <md-input-item
          ref="input0"
          title="姓名"
          placeholder="请填写姓名"
          :maxlength="5"
          align="right"
          v-model="editData.lxname"
        ></md-input-item>
        <md-input-item
          title="手机号码"
          type="phone"
          v-model="editData.phone"
          align="right"
          placeholder="请填写手机号码"
        ></md-input-item>
        <md-input-item
          title="密码"
          type="password"
          v-model="editData.pwd"
          align="right"
          placeholder="请填写密码"
        ></md-input-item>
        <md-field-item solid title="发布车">
          <md-switch
            v-model="editData.addEnable"
            style="float:right"
          ></md-switch>
        </md-field-item>
        <md-field-item solid title="编辑车"  >
          <md-switch
            style="float:right"
            v-model="editData.editEnable"
          ></md-switch>
        </md-field-item>
        <md-field-item solid title="删除车"  >
          <md-switch
            style="float:right"
            v-model="editData.delEnable"
          ></md-switch>
        </md-field-item>
      </md-field>
      <md-button  type="primary"  @click="doEdit">确定</md-button>
    </div>
  </md-popup>

</div>
</template>

<script>
import { Dialog } from 'mand-mobile';

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
      const { success, data, info } = res.data;
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
      const { success, data, info } = res.data;
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
          const res = await this.$api.post('/ac/delAccount', { uid: item.uid });
          const { success, data } = res.data;
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
      const res = await this.$api.post('/ac/accountList', { companyId: this.$store.state.company.id });
      const { success, data } = res.data;
      if (success) {
        this.acList = data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.addBox{
  padding:vw(50);
  background: #fff;
  width: 80vw;

}
  .mbox{
    height: 100%;
    display: flex;
    flex-direction: column;
      .navtop{

      }
      .mainbox{
        height: 0;
        flex-grow: 1;
        overflow-x: auto;
        li{
          padding:vw(20) vw(30);
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
        }
        .acZone{

        }
      }
  }
</style>
