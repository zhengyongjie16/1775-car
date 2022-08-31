<template>
  <div class="AddCar main">
    <navTag :isShare="false" title="添加车辆" style="border-bottom:1px solid #ccc"></navTag>
    <!--车源信息状态-->

   <div class="content">
     <div class="AddCarBox"  style="height:730px">

       <!--1.车辆基本信息-->
       <div class="CarBasic" v-if="AddCarStateNum==0">

         <div class="CarBasicTuLi">

           <div class="CarBasicTu">
             <div class="t">上传车辆图片</div>
             <div class="tips">
               上传图片不能小于6张，首页默认为封面图，课随时拖动调整图片排列顺序。
             </div>
           </div>

           <div >
             <draggable v-model="imgList" class="imgList"  v-loading="uprecent!=100"      element-loading-text="上传中请等待"
                        element-loading-spinner="el-icon-loading"
                        :scroll-sensitivity="250" :fallback-tolerance="1" :force-fallback="true"
             >
               <transition-group>
                 <div  @click="doPreview" v-for="(item,index) of  imgList" :style="{background:`url(${item.response? mobilePic(item.response.data):''}) center center`,backgroundSize:`cover`}" :key="item.response.data">
                   <div class="imgTool"  @click.stop="removeImg(item)">
                     <i >{{index+1}}</i>
                     <i  class="el-icon-delete" style="margin-left: 10px;">删除</i>
                   </div>
                 </div>
               </transition-group>

             </draggable>
             <!--        <el-upload
                       slot="footer"
                       action="https://api.1775.net.cn/common/upload"
                       list-type="picture-card"
                       :data="{type:'car'}"
                       :on-preview="doPreview"
                       :on-remove="doRemove"
                       :on-success="CarTuLoad"
                       :on-progress="uploading"
                       :before-upload="uploadPre"
                       :file-list="imgList"
                       :limit="20"
                       :show-file-list="false"
                       multiple
                       :on-exceed="()=>$message.info('最多只能上传20张图片哦')"
                     >
                       <i class="el-icon-plus"></i>
                     </el-upload>-->

             <button class="nbt" @click="addPic"> 添加图片</button>

             <!--<van-uploader-->
             <!--v-model="fileList"-->
             <!--multiple-->
             <!--:preview-image="false"-->
             <!--:max-count="20"-->
             <!--:after-read="uploadPre"-->
             <!--:before-read="newPre"-->

             <!--/>-->

             <el-dialog :visible.sync="dialogVisible" size="tiny">
               <img width="100%" :src="dialogImageUrl" alt="">
             </el-dialog>
           </div>


         </div>
         <div class="CarBasicFrom showMoreOpt">

           <md-field brief="如没有找到车型,直接填写在标题"  >
             <md-input-item solid title="标题" placeholder="若不填写就以品牌系列为标题" v-model="title" align="right" />
             <md-field-item solid title="品牌">
                    <md-button size="small" @click="showPicker=true" class="limitWidth" slot="right">{{title ?title+'选择':'请选择'}}</md-button>
<!--               <brandPicker  slot="right"  @change="handBrandChane" :defalut="brandFromVin" style="display: inline-block;float:right" v-model="brandId"></brandPicker>-->
             </md-field-item>
             <md-field-item solid title="vin">
               <el-select
                 slot="right"
                 v-model="newVin"
                 filterable
                 remote
                 class="vinIpt"
                 size="medium"
                 placeholder="不包含I、O、Q"
                 :remote-method="remoteMethod"
                 :loading="vinLoading"
               >
                 <el-option
                   v-for="item in vinOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </md-field-item>
             <md-input-item solid title="里程" placeholder="请输入里程" v-model="CarMileage" align="right" type="money" >
               <span slot="right">万公里</span>
             </md-input-item>
             <md-input-item solid title="价格(万)" placeholder="填写要销售的价格" v-model="AddNetPinPrice" align="right" type="money">
             </md-input-item>
             <md-field-item solid title="上牌时间" :addon="brandDateTxt?brandDateTxt:'请选择上牌时间'"  arrow @click="showDatePicker=true" />

             <md-field-item  title="填写更多" arrow @click="showMoreOpt=true" v-show="!showMoreOpt" />
             <div v-show="showMoreOpt" showMoreOpt>
               <md-field-item solid title="变速箱" >
                 <md-check-box v-for="item of GearboxData" :key="item.label" v-model="Gearbox" :label="item.label" :name="item.value" inline style="float:right;margin-left: 5px" />
               </md-field-item>
               <md-input-item solid title="首付(万)" placeholder="填写首付价格" v-model="firPrice" align="right" type="money" />
               <md-input-item solid title="月供(元)" placeholder="填写月供价格" v-model="monPay" align="right" type="money" />
               <md-input-item solid title="排量" placeholder="请填写排量 " v-model="displacement" align="right" type="money" />
               <md-field-item solid title="交强险" :addon="jqxDateTxt?jqxDateTxt:'请选择交强险到期时间'"  arrow @click="showjqxDatePicker=true" />
               <md-field-item solid title="年检时间" :addon="njDateTxt?njDateTxt:'请选择下次年检时间'"  arrow @click="shownjDatePicker=true" />
               <md-field-item solid title="保养记录" >
                 <md-check-box v-for="item of MaintainRecordData" :key="item.label" v-model="MaintainRecord" :label="item.label" :name="item.value" inline style="float:right;margin-left: 5px" />
               </md-field-item>
               <md-field-item solid title="展示地址"          :addon="cityText?cityText:'请选择城市'" arrow @click="showCity=true">
                 <!--<area-cascader  :data="pca" v-model="value" type="text"  style="float:right!important;"  :level="0"  @change="onChange" size="medium"/>-->

               </md-field-item>
               <md-field-item solid title="是否批发" >
                 <md-check-box  v-model="isPf" label="是" :name="1" inline style="float:right;margin-left: 5px" />
                 <md-check-box  v-model="isPf" label="否" :name="0" inline style="float:right;margin-left: 5px" />
               </md-field-item>
               <md-input-item v-show="isPf == 1" solid title="批发(万)" placeholder="填写批发价格" v-model="AddWholesalePrice" align="right" type="money" />
               <md-field-item title="车辆描述">

                 <div class="PostTemplate">
                   <div v-for="(item,r) in PostTemplate"  @click="carDesc=PostTemplateData[r].value">{{item}}</div>
                 </div>
               </md-field-item>
               <md-field-item >
                 <el-input type="textarea" :rows="10" style="margin-top: 10px;" :cols="80" v-model="carDesc" ></el-input>
               </md-field-item>

               <md-field-item solid title="在库状态" >
                 <md-check-box v-for="(item,r) in CarInState" :key="item.label" v-model="CarInStateNum" :label="item" :name="r" inline style="float:right;margin-left: 5px" />
               </md-field-item>
               <md-field-item solid title="车身颜色" >
                 <md-check-box class="coloritem" v-for="(item,r) in CarInCoFont" :key="item.label" v-model="CarInCoNum" :label="item" :name="r" inline
                               :style="{
                             float:'right',
                             marginLeft: '5px',
                             marginBottom:'5px',
                             background: CarInCoColor[r].background,
                             color: item ==='白色' || item ==='其他' || item ==='黄色'?'#666':'#fff',
                             }"
                 />
               </md-field-item>

             </div>
           </md-field>

         </div>
         <div style="height:40vw" id="sss"  ref="sss">
         </div>
       </div>


     </div>
   </div>

    <md-button  type="primary" class="complete" @click="AddCom">立即发布</md-button>
    <md-date-picker
      ref="datePicker"
      today-text="今天"
      :max-date="new Date()"
      :default-date="new Date()"
      @confirm="handleDateChange"
      v-model="showDatePicker"
    ></md-date-picker>
    <!--交强险到期-->
    <md-date-picker
      ref="datePicker"
      today-text="今天"
      :default-date="new Date()"
      @confirm="handleJqxChange"
      v-model="showjqxDatePicker"
    ></md-date-picker>
    <!--年检到期-->
    <md-date-picker
      ref="datePicker"
      today-text="今天"
      :default-date="new Date()"
      @confirm="handleNjChange"
      v-model="shownjDatePicker"
    ></md-date-picker>
    <!-- 城区选择-->
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      large-radius
      :data="cityData"
      v-model="showCity"
      @change="handleCityChange"
    />
<!--    品牌选择器-->
    <md-landscape v-model="showPicker" full-screen>
      <newPicker  :defalut="brandFromVin"  v-model="brandId"  @change="handNewBrandChane" @over="showPicker=false"></newPicker>
    </md-landscape>
  </div>
</template>

<script>
import { pca, pcaa } from 'area-data';
import draggable from 'vuedraggable';
import { ImagePreview, Notify } from 'vant';

import MdCheckBox from 'mand-mobile/components/check/box'; // 移动版的
import brandPicker from '../components/mbrandPicker';
import newPicker from '../components/newPicker';
import cityJSON from '../components/data/cityJSON';
import brandData from '@/brand'


// v5 or higher
export default {
  name: 'AddCar',
  components: {
    newPicker,
    MdCheckBox,
    draggable,
    brandPicker,
  },
  data(){
    return {
      showPicker:false,
      pickerShowText:'',
      cityText: '',
      cityData: cityJSON,
      showCity: false,
      showDatePicker: false,
      showjqxDatePicker: false,
      shownjDatePicker: false,
      jqxDateTxt: '',
      brandDateTxt: '',
      njDateTxt: '',
      firPrice: null,
      monPay: null,
      showMoreOpt: false,
      fileList: [],
      vinOptions: [],
      vinLoading: false,
      newVin: '',
      AddCarStateNum: '0',
      StateColor: 'StateColor',
      AddCarStateLiData: ['1.车源基本信息', '2.补充车源信息', '3.车辆描述'],
      // 图片url
      dialogImageUrl: '',
      dialogVisible: false,
      brandId: '',
      AddCartype: '', // 车辆品牌 车系 年款
      ManualAdd: false,
      CarVinCode: '', // 车辆Vin码
      Gearbox: '1', // 变速箱
      displacement: '', // 排量
      IsToBrand: '', // 是否上牌
      ToBrandTime: '', // 上牌时间
      CarMileage: '', // 表里程
      NextTestTime: '', // 下次验车时间
      InsuranceTerm: '', // 交强险到期
      TransferNum: '', // 过户次数
      DecoColor: '', // 内饰颜色
      AddCarpur: '', // 用途
      isPf: 0,
      carType: '', // 车型
      imgList: [],
      carTypeData: [
        { value: '1', label: '三厢轿车' },
        { value: '2', label: 'SUV' },
        { value: '3', label: '两厢轿车' },
        { value: '4', label: 'MPV' },
        { value: '5', label: '跑车' },
        { value: '6', label: '面包车' },
        { value: '7', label: '皮卡' },
        { value: '8', label: '旅行车' },
      ],
      AddCartypeData: [
        { value: '宝马' },
      ], // 车辆品牌 车系 年款数据
      GearboxData: [
        { value: '1', label: '自动' },
        { value: '2', label: '手动' },
      ], // 变速箱Data

      IsToBrandData: [
        { label: '已上牌', value: '1' },
        { label: '未上牌', value: '2' },
      ], // 是否上牌
      DecoColorData: [
        { value: '1', label: '深色' },
        { value: '2', label: '浅色' },
      ], // 内饰颜色
      AddCarpurData: [
        { label: '家用', value: '1' },
        { label: '单位用车', value: '2' },
      ], // 用途

      CarInState: ['在厅', '在途', '整备', '在售'], // 在库状态数据
      // 1.在厅 2.在途 3.整备 4.在售 5.预约 6.预定 7.已售
      CarInStateNum: 0,
      CarInClick: 'CarInClick',
      CarInCoFont: ['黑色', '白色', '银灰色', '红色', '深灰色', '蓝色', '香槟色', '棕色', '黄色',
        '绿色', '紫色', '橙色', '其他'],
      CarInCoColor: [
        { background: '#000' },
        { background: '#fff' },
        { background: '#BEC3C4' },
        { background: '#CA0A00' },
        { background: '#595959' },
        { background: '#004D97' },
        { background: '#CD7F32' },
        { background: '#482709' },
        { background: '#FFF600' },
        { background: '#009944' },
        { background: '#4F2F4F' },
        { background: '#E93F35' },
        { background: '' }],
      CarInCoNum: 0, // 车身颜色选择

      // 2.补充车源信息
      Registration: 1, // 登记证
      Carinvoice: 1, // 登记证
      MaintainRecord: 1, // 保养记录
      AbroadCondition: 1, // 外观成色
      InteriorStatus: 1, // 内饰状况
      CarStatus: 1, // 车辆状况
      AddPurPrice: '', // 采购价格
      AddExhiPrice: '', // 展厅价格
      AddSaleMiniPrice: '', // 销售底价
      AddNetPinPrice: '', // 网销售价
      AddWholesalePrice: '', // 批发价格
      AddBuyer: '', // 采购员
      PurchaseData: '', // 采购日期
      title: '', // 标题
      AddBuyModeLi: ['全款', '贷款'], // 收购方式font
      AddBuyModeLiNum: 0, // 收购方式Num
      AddBuyLiCli: 'AddBuyLiCli', // 收购方式点击
      AddCarSourceLi: ['收购', '寄卖', '置换', '其他'], // 车辆来源数据
      AddCarSourceLiNum: 0, // 车辆来源选择
      AddCarBuyLocal: '广西 柳州', // 车源收购地
      KeyNum: '', // 钥匙数量
      AddCarBuyDre: '', // 车源收购地的区域
      carBrand: [],
      uploadList: 0,
      uploadCount: 0,
      RegistrationData: [
        { label: '齐全', value: 1 },
        { label: '丢失', value: 2 },
        { label: '补办中', value: 3 },
      ], // 登记证数据
      CarinvoiceData: [
        { label: '齐全', value: 1 },
        { label: '丢失', value: 2 },
        { label: '补办中', value: 3 },
      ], // 购车发票数据
      MaintainRecordData: [
        { label: '4s定期保养', value: 1 },
        { label: '非4s定期保养', value: 2 },
        // { label: '无定期保养', value: 3 },
      ], // 保养记录数据

      //   外观成色 1.极新 2.较新 3.一般 4.较差
      AbroadConditionData: [
        { label: '极新', value: 1 },
        { label: '较新', value: 2 },
        { label: '一般', value: 3 },
        { label: '较差', value: 4 },
      ], // 外观成色数据
      InteriorStatusData: [
        { label: '完好', value: 1 },
        { label: '有破损', value: 2 },
      ], //  内饰状态 1.完好 2.有破损
      CarStatusData: [
        { label: '无事故', value: 1 },
        { label: '有轻微刮蹭', value: 2 },
        { label: '有过大修', value: 3 },
      ], // 车辆状态 1.无事故 2.有轻微剐蹭 3.有过大修
      AddBuyerData: [
        { value: '请选择' },
        { value: 'xxxx' },
      ], // 采购员数据
      AddCarBuyLocalData: '', // 车源收购地
      AddCarBuyDreData: [
        { value: '城中区' },
        { value: '城南区' },
        { value: '城北区' },
      ], // 车源收购地的区域

      // 网络发布信息

      NetSalesPe: '', // 网销人员
      NetSalesPeData: [
        { value: '' },
      ], // 网销人员数据
      PostTemplate: ['模板1', '模板2'],
      PostTemplateData: [
        { value: '外观：漆面保养良好，车身结构无修复，无重大事故。\n 内饰：干净整洁。安全指示灯正常，气囊等被动安全项正常，车辆内电子器件使用良好， 车内静态动态设备完善。\n 驾驶：车辆点火、起步、提速、过弯、减速、制动均无问题，加速迅猛，动力输出平稳舒 适,无怠速抖动。\n 整体：整体车况一般。车体骨架结构无变形扭曲、无火烧泡水痕迹。车身有喷漆痕迹，整体漆面良好，排除大事故车辆。视野宽阔，练手最佳选择，空间宽敞明亮通风性好，适 合家庭代步车。' },
        { value: '车况精品，无重大事故，无火烧泡水，无加装改装配置。\n让您买的放心，省心，开心。\n底盘结构：无明显磨损发动机舱：运转良好外观：车身无结构性损伤内饰：干净整洁漆面：保养良好' },
      ],
      PostNum: 0,
      textarea: '',
      inputTextFocus: '',
      //  步骤
      stepNum: 0,
      value: [],
      value1: [],
      value2: [],
      displayLocation: '',
      buyLocation: '',
      carLocation: '',
      carDesc: '',
      temPid: '',
      temBrand: '',
      uploadTotal: 0,
      uploadIng: 0,
      uprecent: 100,
      loading: false,
      brandFromVin: [],
      props: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node;
          console.log(node);
          if (level === 0) { // 第一次获取主品牌
            // this.$api.get('/getBrand?pid=0').then((res) => {
            //   const { success, data } = res.data;
            //   if (success) {
            //     resolve(data);
            //   }
            // });
            resolve(brandData)
          }
          if (level === 1 || level === 2) {
            this.temPid = node.value;
            this.temBrand = [];//  重置临时品牌id
            this.$api.get(`/getBrand?pid=${value}&level=${level}`).then((res) => {
              const { success, data } = res.data;
              if (success) {
                resolve(data);
              }
            });
          }
          if (level === 3) {
            this.$api.get(`/getBrand?pid=${this.temPid}&level=${level}&year=${value}`).then((res) => {
              const { success, data } = res.data;
              this.temBrand = data;
              if (success) {
                resolve(data);
              }
            });
          }
          if (level === 4) {
            this.title = node.label;
          }
        },
      },
      imgQuality: 0.5, // 压缩图片的质量
      isIng: false,
      scrollTop:''
    };
  },
  watch: {
    showMoreOpt(nv, ov) {

    },
    newVin(nv) {
      const _res = nv.split(',');
      this.brandFromVin = _res;
    },
    imgList(nv) {
      console.log(nv);
    },
    brandId(nv) {
      console.log(nv);
      if (nv[3]) {
        console.log(this.temBrand);
        console.log(nv[3]);
        const res = this.temBrand.find(r => r.value == nv[3]).label;
        this.title = res;
      }
    },
  },
  computed: {

  },
  created() {
    // this.getBrands(0);
    this.pca = pca;
  //  this.carDesc = this.PostTemplateData[0].value;
  },
  mounted() {

    // 得到nav 的 高度和 距离屏幕顶部的 大小周

    const navheight = document.querySelector('.nav').clientHeight;
    const navStop =  document.querySelector('.nav')
    window.addEventListener("scroll", this.handleScroll);
      const evs = document.querySelectorAll('input');
    console.log(evs)
      // 先移除后添加
      for (const item of evs) {
          item.addEventListener('focus', (event) => {

            event.target.scrollIntoView({
              behavbior:'smooth',
              block:'center'
            })
              //  this.$refs.scrollView.scrollTo(0,event.scrollTop)
            this.$refs.sss.style.display='block';
            this.$refs.scrollView.init()
            this.$refs.scrollView.reflowScroller()
          //  setTimeout(()=>     window.scrollTo(0, this.scrollTop),500)

        //    setTimeout(()=> this.$refs.scrollView.init(),1000)
        //   setTimeout(()=> this.$refs.scrollView.reflowScroller(),1000)
          });


        item.addEventListener('blur',(event) =>{
          console.log('重新blur')
          setTimeout(()=>{

            // document.querySelector(".CarBasic").style.marginTop = "49px"
            window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
          },500)

          let ctdom = document.querySelector(".AddCarBox")

           // document.querySelector('.t').scrollIntoView(true)
          console.log(ctdom.offsetTop)
          console.log(ctdom.offsetLeft)
          setTimeout(()=> this.$refs.scrollView.init(),1000)
          setTimeout(()=> this.$refs.scrollView.reflowScroller(),1000)
        })
      }

      //  end code


  },
  methods: {
      handleScroll(res){
          console.log('滚动中')
       //   Keyboard.hide()
          //  cordova.plugins.Keyboard.hide(); //滚动的时候隐藏键盘

        //  new code
        console.log(res)
        this.$refs.sss.style.display='none';
        this.$refs.scrollView.reflowScroller()
      },
    //  新的处理城市选择
    handleCityChange(data) {
      this.cityText = data.options.map(r => r.label).join('');
      this.displayLocation = this.cityText;
    },
    // 处理新的日期选择
    handleDateChange(col) {
      this.ToBrandTime = new Date(col[0].value, col[1].value - 1, col[2].value);
      this.brandDateTxt = col[0].text + col[1].text;
    },
    handleJqxChange(col) {
      this.InsuranceTerm = new Date(col[0].value, col[1].value - 1, col[2].value);
      this.jqxDateTxt = col[0].text + col[1].text;
    },
    handleNjChange(col) {
      this.NextTestTime = new Date(col[0].value, col[1].value - 1, col[2].value);
      this.njDateTxt = col[0].text + col[1].text;
    },
    // 图片转blob
    dataURItoBlob(dataURI, type) {
      const binary = atob(dataURI.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type });
    },
    async remoteMethod(query) {
      this.vinLoading = true;
      if (query.length != 17) return this.vinLoading = false;
      if (query.includes('i') || query.includes('I') || query.includes('o') || query.includes('O') || query.includes('Q') || query.includes('q')) {
        this.vinLoading = false;
        this.$message.warning('vin不包含I，O，Q');
        return false;
      }
      const res = await this.$api.post('/vehicle/getInfoByVin', { vin: query });
      this.CarVinCode = query;
      this.vinLoading = false;
      const { success, data } = res.data;
      if (success) {
        this.vinOptions = data;
      }
    },
    doUpload(file) {
      console.log('要上传的文件是', file);
    },
    handBrandChane(r) {
      this.title = r;
      this.showPicker = false
    },
    handNewBrandChane({str1,str2,str3,str4}) {
      this.title = `${str3} ${str4}`;
      this.pickerShowText=  str2? `${str2}/${str3}`:''
    },
    mobilePic(path) {
      try {
      //  console.log('tt1', _tem);
        const _tem = path.split('/');
        //   console.log('tt2', _tem);
        _tem.splice(-1, 0, 'm');
        //   console.log(_tem.join);
        return _tem.join('/');
      } catch (e) {
        return path;
      }
    },
    async newPre() {
      this.uprecent = 0;
      Notify({
        message: '开始上传，请等待',
        duration: 1000,
        background: '#1989fa',
      });
      return true;
    },
    async uploadPre(file, info) {
      if (file instanceof Array) {
        for (const item of file) {
          this.compressImg(item);
        }
      } else {
        this.compressImg(file);
      }
    },
    async compressImg(file) {
      const param = file.file;
      this.uprecent = 0;
      this.loading = true;
      const isJPG = param.type === 'image/jpeg';
      const isPNG = param.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.$message.warning('仅支持png 和 jpeg');
        return false;
      }

      const formData = new FormData(); // 要上传的表单
      this.uploadTotal = this.uploadTotal + 100;
      // 对图片进行压缩
      const imgSize = param.size / 1024 / 1024;

      const _this = this;
      const image = new Image();
      const reader = new FileReader();
      image.src = file.content;
      image.onload = (imageEvent) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let width = image.width * _this.imgQuality;
        let height = image.height * _this.imgQuality;
        // 图片宽度最大值在1500
        const maxWidth = 1000;
        // 如果压缩过后还是大于最小宽度就再继续同比缩小
        if (width > maxWidth) {
          canvas.width = maxWidth;
          canvas.height = parseInt(height * maxWidth / width);
          width = canvas.width;
          height = canvas.height;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(param.type);
        const blobData = _this.dataURItoBlob(dataUrl, param.type);
        formData.append('file', blobData, param.name);
        this.doPost(formData);
      };
    },
    async doPost(formData) {
      formData.append('type', 'car');
      console.log(formData);
      const res = await this.$api.post('common/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { success, data } = res.data;
      console.log(res);
      if (success) {
        this.imgList.push({ response: { data } });
        this.uprecent = 100;
        Notify({
          message: '上传完成',
          duration: 1000,
          background: '#1989fa',
        });
      }
    },
    uploading(event, file, fileList) {
      const { percent, loaded, total } = event;
      this.uprecent = percent;
    },
    doPreview(file) {
      ImagePreview(this.imgList.map(r => r.response.data));
    },
    doRemove(file, fileList) {
      this.imgList = fileList;
    },
    CarTuLoad(res, file, fileList) {
      if (!res.success) return this.$message.error('上传失败');
      this.$message.success('上传成功');
      this.imgList = fileList.filter(r => r.response.success).map(r => r);
      console.log('图片list是', this.imgList);
    },
    lower() {
      console.log(this.brandId);
      // 第一步的时候的过滤
      if (this.stepNum === 0) {
        if (!this.AddNetPinPrice || parseFloat(this.AddNetPinPrice) < 0) return this.$message.warning('请填写正确的网销售价');
        if (!this.title) return this.$message.warning('请填写标题');
        if (this.imgList.length < 5) return this.$message.warning('车辆图片不能少于5张');
        if (!this.brandId[1]) return this.$message.warning('请选择汽车品牌');
        //  if (!this.CarVinCode) return this.$message.warning('请填写Vin');
        //   if (!this.Gearbox) return this.$message.warning('请选择变速箱类型');
        //   if (!this.displacement) return this.$message.warning('请选择排量');
        //   if (!this.IsToBrand) return this.$message.warning('请选择是否上牌');
        if (!this.ToBrandTime) return this.$message.warning('请选择首次上牌时间');
        if (!this.CarMileage) return this.$message.warning('请选择表显里程数');
        //   if (!this.InsuranceTerm) return this.$message.warning('请选择保险到期时间');
        //   if (!this.TransferNum) return this.$message.warning('请填写过户次数');
        //    if (!this.DecoColor) return this.$message.warning('请选择内饰颜色');
        //  if (!this.AddCarpur) return this.$message.warning('请选择原车用途');
        //   if (!this.carType) return this.$message.warning('请选择车型');
      }

      // 第二步的过滤
      if (this.stepNum === 1) {
        // if (!this.KeyNum) return this.$message.warning('请填写钥匙数量');
        //   if (!this.PurchaseData) return this.$message.warning('请选择采购日期');
        // if (!this.displayLocation) return this.$message.warning('请填写展示地址');
        // if (!this.AddPurPrice || parseFloat(this.AddPurPrice) < 0) return this.$message.warning('请填写正确的采购价格');
        // if (!this.AddExhiPrice || parseFloat(this.AddExhiPrice) < 0) return this.$message.warning('请填写正确的展厅价格');
        // if (!this.AddSaleMiniPrice || parseFloat(this.AddSaleMiniPrice) < 0) return this.$message.warning('请填写正确的销售底价');
        if (!this.AddNetPinPrice || parseFloat(this.AddNetPinPrice) < 0) return this.$message.warning('请填写正确的网销售价');
        // if (!this.AddWholesalePrice || parseFloat(this.AddWholesalePrice) < 0) return this.$message.warning('请填写正确的批发价格');
      }

      if (this.stepNum <= 2) {
        this.stepNum++;
        this.AddCarStateNum = this.stepNum;
      }
    },
    upper() {
      if (this.stepNum >= 0) {
        this.stepNum--;
        this.AddCarStateNum = this.stepNum;
      }
    },
    async getBrands(pid) {
      const res = await this.$api.get(`/getBrand?pid=${pid}`);
      const { success, data } = res.data;
      if (success) {
        this.carBrand = data;
      }
    },
    onChange(val, text) {
      this.displayLocation = val;
    },
    onChange2(val, text) {
      this.buyLocation = val;
    },
    onChange3(val, text) {
      this.carLocation = val;
    },
    brandChange(a, b, c) {
      console.log(a);
    },
    // 删除上传图片
    removeImg(item) {
      const { uid } = item;
      this.imgList = this.imgList.filter(r => r.response.data != item.response.data);
    },
    async AddCom() {
      // 数据过滤
      if (!this.AddNetPinPrice || parseFloat(this.AddNetPinPrice) < 0) return this.$message.warning('请填写正确的网销售价');
      if (!this.title) return this.$message.warning('请填写标题');
      if (this.imgList.length < 5) return this.$message.warning('车辆图片不能少于5张');
      if (!this.brandId[1]) return this.$message.warning('请选择汽车品牌');
      if (!this.ToBrandTime) return this.$message.warning('请选择首次上牌时间');
      if (!this.CarMileage) return this.$message.warning('请选择表显里程数');
      if (this.isIng) return this.$message.warning('提交中请耐心等待');

      this.isIng = true;
      try {
        const res2 = await this.$api.post('/addVehicle', {
          brandId: this.brandId[1], // 品牌ID
          carPic: this.imgList.map(r => r.response.data), // 车辆图片
          // brandName: this.AddCartype, // 车辆品牌 车系 年款
          // series: this.AddCartype, // 车辆品牌 车系 年款
          // yearType: this.AddCartype, // 车辆品牌 车系 年款
          vin: this.CarVinCode, // 车辆Vin码
          gearBox: this.Gearbox, // 变速箱
          displacement: this.displacement, // 排量
          hasBrand: this.IsToBrand, // 是否上牌
          brandDate: this.ToBrandTime.getTime(), // 上牌时间
          mileage: this.CarMileage, // 表里程
          nextCheckDate: this.NextTestTime ? this.NextTestTime.getTime() : '', // 下次验车时间
          safeExpireDate: this.InsuranceTerm ? this.InsuranceTerm.getTime() : '', // 交强险到期
          transferCount: this.TransferNum, // 过户次数
          insideColor: this.DecoColor, // 内饰颜色
          application: this.AddCarpur, // 用途
          carType: this.carType, // 车型
          stockState: this.CarInStateNum + 1, // 在库状态
          carColor: this.CarInCoFont[this.CarInCoNum],
          // 车源补充信息
          registration: this.Registration, // 登记证
          carInvoice: this.Carinvoice, // 购车发票
          keepRecord: this.MaintainRecord, // 保养记录
          surfaceState: this.AbroadCondition, // 外观成色
          insideState: this.InteriorStatus, // 内饰状况
          carState: this.CarStatus, // 车辆状况
          procurePrice: this.AddPurPrice, // 采购价格
          offlinePrice: this.AddExhiPrice, // 展厅价格
          lowPrice: this.AddSaleMiniPrice, // 销售底价
          onlinePrice: this.AddNetPinPrice, // 网销售价
          tradePrice: this.AddWholesalePrice, // 批发价格
          AddBuyer: this.AddBuyer, // 采购员
          purchaseDate: this.PurchaseData ? this.PurchaseData.getTime() : '', // 采购日期
          payMode: this.AddBuyModeLiNum + 1, // 收购方式
          carSource: this.AddCarSourceLiNum + 1, // 车辆来源
          keyNum: this.KeyNum, // 钥匙数量
          carLocation: this.carLocation ? this.carLocation.join('') : '', // 车源地址
          displayLocation: this.cityText, // 展示地址
          purchaseCity: this.buyLocation ? this.buyLocation.join('') : '', // 车源收购地址
          salesMan: this.NetSalesPe, // 网销人员
          carDescribe: this.carDesc, // 附言
          companyId: this.$store.state.company.id,
          title: this.title,
          year: this.brandId[2] || '',
          detailBrandId: this.brandId[3] || '',
          monPay: this.monPay ? this.monPay : 0,
          firPrice: this.firPrice ? this.firPrice : 0,
        });

        const { data, success, info } = res2.data;
        if (success) {
          this.$message.success('添加成功');
          this.$router.go(-1);
        } else {
          this.$message.warning(info);
        }
        this.isIng = false;
      } catch (e) {
        this.$message.error('请检查你要提交的内容');
        this.isIng = false;
      }
    },

    newUpload(fileURL) {
      return new Promise((resolve, reject) => {
        const options = new FileUploadOptions();
        options.fileKey = 'file';
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        // options.mimeType = 'text/plain';
        const params = {};
        params.type = 'car';
        options.params = params;
        const ft = new FileTransfer();
        ft.upload(fileURL, encodeURI(`https://api.1775.net.cn/common/upload?r=${Math.random()}`), (res) => {
          this.uploadCount++;
          if (this.uploadCount == this.uploadList) {
           // this.$toast.succeed('上传完成');
            this.uploadCount = 0;
          }

          const { response, responseCode } = res;


          const _res = JSON.parse(response);

          if (responseCode == 200 && _res.success) {
            setTimeout((_) => {
              this.imgList.push({ response: _res });
            }, 800);
          }
          resolve();
        }, (err) => {
          // alert(JSON.stringify(err));
          this.uploadCount++;
          if (this.uploadCount == this.uploadList) {
            this.$toast.succeed('上传完成');
            this.uploadCount = 0;
          }
          reject(err);
        }, options, true);
      });
    },
    addPic() {
      ImagePicker.getPictures(async (result) => {
        const arr = result.images;
        this.uploadList = arr.length;
        //  console.log('arr', result);
          const _total = arr.length;
          let _complete = 0;
        for (const item of arr) {
          console.log(item.uri);
          await this.newUpload(item.uri);
            _complete++;
          try{
            this.$toast.loading(`${_complete}/${_total}`);
            if(_complete === _total ){
              this.$toast.hide();
              this.$toast.succeed(' 上传完成')
            }
          }catch (e) {
            this.$toast.info(e,1000)
          }finally {
            this.$toast.hide()
          }

        }
      }, (err) => {

      }, {
        maximumImagesCount: 20,
        width: 1500,
        quality: 80,
      });
    },
  },
};
</script>

<style scoped>
  .content{
    /*-webkit-overflow-scrolling: touch;*/
  }
  .limitWidth{
    max-width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
  }
</style>

