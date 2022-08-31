<template>
  <div class="main">
    <navTag :isSub="true"  subtitle="删除员工" title="修改权限" @click="doDelet"></navTag>
     <div class="content">
       <div>
            <div class="avt" v-if="pic" :style="pic?{background:`url(${pic}) no-repeat center center`,backgroundSize:`cover`}:{}"></div>
            <div class="avt avtName" v-else>{{lxName.slice((lxName.length-1),lxName.length)}}</div>
            <div class="name">点击更换头像</div>
       </div>
       <div class="editList">
       <md-field>
         <md-input-item
           ref="input0"
           title="员工姓名"
           v-model="lxName"
           placeholder="请输入员工姓名"
           align="right"
         ></md-input-item>
         <md-input-item
           title="手机号码"
           v-model="lxPhone"
           type="phone"
           placeholder="请输入员工手机号码"
           align="right"
         ></md-input-item>
         <md-input-item
           title="权限"
           align="right"
          >
            <template slot="right">
              <md-check-group v-model="right" class="rights">
                <md-check-box name="add">上架车辆</md-check-box>
                <md-check-box name="remove">下架车辆</md-check-box>
                <md-check-box name="edit">修改车辆</md-check-box>
                <md-check-box name="ex">分配商机</md-check-box>
              </md-check-group>
            </template>
         </md-input-item>
       </md-field>
       </div>
       <div class="swBtn" @click="doEdit">确认修改</div>
     </div>
  </div>
</template>

<script>
    import {Dialog, Button} from 'mand-mobile'

    export default {
        name: "edit",
        data(){
            return {
                sex:1,
                phone:'',
                pwd:'',
                repwd:'',
                right:[],
                account:'',
                lxName:'',
                lxPhone:'',
                pic:''
            }
        },
        watch:{
            right(nv){
                console.log(nv)
            }
        },
        created(){
          this.getAcInfo()
        },
        methods:{
            async getAcInfo(){
              try{
                this.$toast.loading('加载中')
                let res = await this.$api.post('/bus/company/getAcInfo',{id:this.$route.query.id})
                const {success,data,info} = res.data;
                if(!success){
                  this.$toast.failed(info);
                  this.$router.back()
                }else{
                  this.lxPhone = data.lxPhone;
                  this.lxName = data.lxName
                  this.pic = data.pic
                  this.right = data.authority.split(",")
                }
                this.$toast.hide()
              }catch (e) {
                this.$toast.info(e,1000)
              }finally {
                this.$toast.hide()
              }
            },

            async doDelet(){
                if(this.$store.state.ac.account){
                    if(this.$store.state.ac.authority!='remove') return this.$toast.info('您没有权限删除！',1000);
                }
                Dialog.confirm({
                    title: '确认删除',
                    content: '请确认是否进行操作?',
                    confirmText: '确定',
                    onConfirm: () =>  this.doDelete(),
                })
            },
            
            async doEdit(){
                if(this.$store.state.ac.account) return this.$toast.info('您没有权限修改！',1000);

                let _obj = [];
                for(const item of this.right){
                  if(item){
                      _obj.push(item)
                  }
                }
                const res = await this.$api.post('/bus/company/updateSubAccount',{
                    id:this.$route.query.id,
                    lxName: this.lxName,
                    lxPhone:this.lxPhone,
                    authority: _obj.toString()
                });
                const { success,data } = res.data
                if(success){
                    this.$toast.succeed('修改成功');
                    setTimeout(()=>  this.$router.back(),2000)
                    this.$router.back()
                }else{
                    this.$toast.failed('修改失败')
                }
            },
            async doDelete(){
                  const id = this.$route.query.id;
                  // todo 这里不能传id 也要传公司id不然不安全
                  const res = await this.$api.post('/bus/company/deleteSubAccount',{ id })
                  const {success,data,info} = res.data;
                  if(!success) return  this.$toast.failed(info);
                  this.$toast.succeed('删除成功')
                 setTimeout(()=>  this.$router.back(),2000)
            }
        }
    }
</script>

<style scoped lang="scss">
  .main{
    background: #fff;
  }
  .content{
    height: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .rights{
    display: flex;
    width: 400px;
    flex-wrap: wrap;
    &>div{
      width: 160px;
      margin-left: 40px;
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 28px;
    }
  }
  .avt{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
    margin:80px auto 20px
  }
  .avt.avtName{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E3E5E5;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    background: #FF4C4C;
  }
  .name{
    text-align: center;
    font-size: 24px;
    color:#999;
  }
  .editList{
    height: 0;
    flex-grow: 1;
  }
  .swBtn{
    margin-bottom: 40px;
  }
</style>
