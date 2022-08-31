<template>
    <div>
      <el-upload
        slot="footer"
        action="http://usc.1775.net.cn:7002/common/upload"
        list-type="picture-card"
        :data="{type:'attache'}"
        :on-preview="doPreview"
        :on-remove="doRemove"
        :on-success="CarTuLoad"
        :file-list="imgList"
        :limit="10"
        multiple
        :on-exceed="()=>$message.info('最多只能上传10张图片哦')"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny" :modal="false">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div class="action">
         <el-button size="small" @click="submit">提交 </el-button>
      </div>
    </div>
</template>

<script>
// 车辆附件组件
export default {
  name: 'carAttach',
  props: ['data'],
  data() {
    return {
      nowCar: null,
      imgList: [],
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  watch: {
    data(nv, ov) {
      this.nowCar = nv;
      console.log(this.nowCar);
      this.getCarAttache();
    },
  },
  methods: {
    async getCarAttache() {
      if (!this.nowCar) return false;
      console.log(this.$store.state.nowCar.id);
      const res = await this.$api.post('/vehicle/getCarAttache', { carId: this.$store.state.nowCar.id });
      const { success, data } = res.data;
      if (success) {
        this.imgList = data.map(r => ({
          response: {
            data: r.path,
          },
          url: r.path,
        }));
        console.log('now Imglist', this.imgList);
      } else {
        this.$message.warning('获取失败');
      }
    },
    doPreview(file) {
      this.dialogImageUrl = file.response.data;
      this.dialogVisible = true;
    },
    doRemove(file, fileList) {
      this.imgList = fileList;
    },
    CarTuLoad(res, file, fileList) {
      this.$message.success('上传成功');
      this.imgList = fileList;
      console.log(this.imgList);
    },
    async submit() {
      console.log(this.$store.state.nowCar.id);
      const res = await this.$api.post('/vehicle/updateCarAttache', {
        carId: this.$store.state.nowCar.id,
        imgList: this.imgList.map(r => r.response.data), // 附件图片
      });
      const { success, data } = res.data;
      if (success) {
        this.$message.success('提交成功');
      } else {
        this.$message.success('更新失败,请5分钟重试');
      }
    },
  },
};
</script>

<style scoped lang="scss">
 ::v-deep   .el-upload--picture-card{
    width: 80px!important;
    height: 80px!important;
    line-height: 80px;
  }
.action{
  padding-top: 20px;
  &>*{
    float:right
  }
}
  .action:after{
    content:'';
    display:block;
    clear: both;
  }
</style>
