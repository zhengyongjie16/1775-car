<template>
  <div class="main">
    <navTag :isSub="false" title="添加员工"></navTag>
    <div class="content addEdit addMt">
      <md-field>
        <md-input-item
          align="right"
          placeholder="请输入员工姓名"
          ref="input0"
          title="员工姓名"
          v-model="lxName"
        ></md-input-item>
        <md-input-item
          ref="input1"
          title="性别"
        >
          <template slot="right">
            <md-check-box :name="0" label="男" style="margin-right: 10px;" v-model="sex"/>
            <md-check-box :name="1" label="女" v-model="sex"/>
          </template>
        </md-input-item>
        <md-input-item
          align="right"
          placeholder="请输入员工手机号码"
          title="手机号码"
          type="phone"
          v-model="lxPhone"
        ></md-input-item>
        <md-input-item
          align="right"
          placeholder="默认12345"
          title="初始密码"
          type="password"
          v-model="pwd"
        ></md-input-item>
        <md-input-item
          align="right"
          placeholder="再次输入密码"
          title="确认密码"
          type="password"
          v-model="repwd"
        ></md-input-item>
        <md-input-item
          align="right"
          title="权限"
        >
          <template slot="right">
            <md-check-group class="rights" v-model="right">
              <md-check-box name="add">上架车辆</md-check-box>
              <md-check-box name="remove">下架车辆</md-check-box>
              <md-check-box name="edit">修改车辆</md-check-box>
              <md-check-box name="ex">分配商机</md-check-box>
            </md-check-group>
          </template>
        </md-input-item>
      </md-field>


    </div>
    <div @click="doAdd" class="swBtn">确认添加</div>
  </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                sex: 1,
                phone: '',
                pwd: '',
                repwd: '',
                right: [],
                account: '',
                lxName: '',
                lxPhone: ''
            }
        },
        watch: {
            right(nv) {
                console.log(nv)
            }
        },
        methods: {
            async doAdd() {
                if(this.$store.state.ac.account){
                    if(this.$store.state.ac.authority.indexOf('add')<0) return this.$toast.info('您没有权限添加子账号！',1000);
                }
                console.log(11111,this.right)
                const res = await this.$api.post('/bus/company/addSubAccount', {
                    account: this.lxPhone,
                    pwd: this.pwd,
                    lxName: this.lxName,
                    lxPhone: this.lxPhone,
                    sex: this.sex,
                    companyId: this.$store.state.company.id,
                    authority: this.right.join()
                });
                const {success, data} = res.data;
                console.log(this.right);
                
                if (success) {
                    this.$toast.succeed('添加成功');
                    this.$router.back()
                } else {
                  console.log(66666,data);
                    this.$toast.failed('添加失败')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    background: #fff;
  }

  .content {
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .rights {
    display: flex;
    width: 400px;
    flex-wrap: wrap;

    & > div {
      width: 160px;
      margin-left: 40px;
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 28px;
    }
  }
  .swBtn{
    margin-bottom: 40px;
  }
</style>
