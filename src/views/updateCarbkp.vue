<template>
  <div class="AddCar">
    <div class="AddCarLi">
      <div class="AddCarLiFon">添加车辆</div>
      <span class="back" @click="$router.go(-1)">返回</span>
    </div>
    <!--车源信息状态-->
    <div class="AddCarState">
      <div class="AddCarStateLi"  v-for="(item,r) in AddCarStateLiData" :class="AddCarStateNum==r?'StateColor':''">{{item}}</div>
    </div>
    <div class="AddCarBox">

      <!--1.车辆基本信息-->
      <div class="CarBasic" v-if="AddCarStateNum==0">
        <div class="BasicTit">
          <span></span>基本信息 带<strong>*</strong>项为必填项，全部填写后才能发布车源
        </div>

        <div class="CarBasicTuLi">


          <div class="CarBasicTu">

          </div>
          <div >
            <draggable v-model="imgList" class="imgList"  v-loading="uprecent!=100"   element-loading-text="上传中请等待"
                       element-loading-spinner="el-icon-loading" >
              <transition-group>
                <div  @click="doPreview"  v-for="(item,index) of  imgList" :style="{background:`url(${mobilePic(item.response.data)}) center center`,backgroundSize:`cover`,overflow:`hidden`}" :key="item.response.data">
                  <div class="imgTool">
                    <i >{{index+1}}</i>
                    <i  class="el-icon-delete" @click.stop="removeImg(item)" style="margin-left: 10px;">删除</i>
                  </div>
                </div>
              </transition-group>

            </draggable>
            <!--<van-uploader-->
              <!--v-model="fileList"-->
              <!--multiple-->
              <!--:preview-image="false"-->
              <!--:max-count="20"-->
              <!--:after-read="uploadPre"-->
              <!--:before-read="newPre"-->
            <!--/>-->

            <button @click="addPic"> 添加图片</button>

            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <p><strong>*</strong> 点击从电脑上传图片(第一张图将是封面图),可拖拽排序</p>


        </div>
        <div class="CarBasicFrom">
          <!-- 车辆-->
          <div>
            <div>
              <span><strong>*</strong>标题:</span>
              <el-input v-model="title" class="AddCarClass" size="mini" style="width:300px" placeholder="标题"></el-input>
            </div>
            <div>
              <span><strong>*</strong>所属品牌:</span>
              <el-input :value="temBrandStr" v-if="!showBrandSet" disabled class="AddCarClass" size="mini" style="width: 200px;"></el-input>
              <brandPicker  v-else  @change="handBrandChane" :defalut="brandFromVin" style="display: inline-block" v-model="brandId"></brandPicker>
              <span style="color: #A2A7B2;" @click="showBrandSet=true">修改</span>
              <el-input v-if="ManualAdd" v-model="AddCartype" class="AddCarClass" size="mini" placeholder="请写入车辆"></el-input>
            </div>
          </div>
          <!--车辆Vin码  变速箱子-->
          <div>
            <div>
              <span>车辆Vin码:</span>

              <el-select
                v-model="newVin"
                filterable
                remote
                size="mini"
                placeholder="不包含I、O、Q"
                :remote-method="remoteMethod"
                :loading="vinLoading">
                <el-option
                  v-for="item in vinOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span style="margin:0 10px;"> {{CarVinCode}}</span>
            </div>
            <div>
              <span><strong>*</strong>表显里程:</span>
              <el-input v-model="CarMileage" class="AddCarClass" size="mini" placeholder="请输入里程"></el-input>
              <strong>万公里</strong>
            </div>
            <div>
              <span><strong>*</strong>上牌时间:</span>
              <el-date-picker
                v-model="ToBrandTime"
                size="mini"
                class="checkSele"
                type="month"
                :editable="false"
              >
              </el-date-picker>
              <span></span>
            </div>
            <div>
              <span><strong>*</strong>网销售价:</span>
              <el-input v-model="AddNetPinPrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>
              <strong>万元</strong>
            </div>
            <div>
              <span>变速箱:</span>
              <el-select class="checkSele" size="mini" v-model="Gearbox" placeholder="选择变速箱">
                <el-option
                  v-for="item in GearboxData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--排量 是否上牌-->
          <div>


            <div>
              <span>是否上牌:</span>
              <el-select class="checkSele" size="mini" v-model="IsToBrand">
                <el-option
                  v-for="item in IsToBrandData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--首次上牌时间 表显里程-->
          <div>

            <div>
              <span>排量:</span>
              <el-select class="checkSele" size="mini" v-model="displacement" placeholder="排量">
                <el-option
                  v-for="item in displacementData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <span></span>
            </div>
          </div>
          <!--下次验车 交强险到期-->
          <div>

            <div>
              <span>交强险到期:</span>
              <el-date-picker
                v-model="InsuranceTerm"
                size="mini"
                class="checkSele"
                type="month"
                :editable="false"
              >
              </el-date-picker>
            </div>
          </div>
          <!--过户次数  内饰颜色-->
          <div>
            <div>
              <span>过户次数:</span>
              <el-input v-model="TransferNum" class="AddCarClass" size="mini"></el-input>
              <strong>次</strong>
            </div>
            <div>
              <span>内饰颜色:</span>
              <el-select class="checkSele" size="mini" v-model="DecoColor" placeholder="选择内饰颜色">
                <el-option
                  v-for="item in DecoColorData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </div>
          </div>
          <!--用途-->
          <div>
            <div>
              <span>车辆性质:</span>
              <el-select class="checkSele" size="mini" v-model="AddCarpur" placeholder="选择用途">
                <el-option
                  v-for="item in AddCarpurData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>下次验车:</span>
              <el-date-picker
                v-model="NextTestTime"
                size="mini"
                class="checkSele"
                type="month"
                :editable="false"
              >
              </el-date-picker>
              <span></span>
            </div>
            <!--车型-->
          <!--  <div>
              <span>车型:</span>
              <el-select class="checkSele" size="mini" v-model="carType" placeholder="选择车型">
                <el-option
                  v-for="item in carTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>-->
          </div>
          <!--在库状态-->
          <div>
            <div style="width: 100%">
              <span style="float: left">在库状态:</span>
              <div class="CarInState">
                <div class="CarInLi" :class="CarInStateNum==r?CarInClick:''" v-for="(item,r) in CarInState" @click="CarInStateNum=r">{{item}}</div>
              </div>
            </div>
          </div>
          <!--车身颜色-->
          <div>
            <div style="width: 100%">
              <span style="float: left"><strong>*</strong>车身颜色:</span>
              <div class="CarInState">
                <div class="CarInLi" :class="CarInCoNum==r?CarInClick:''" v-for="(item,r) in CarInCoFont" @click="CarInCoNum=r">
                  <div class="CarInLiCo" :style=CarInCoColor[r]></div>
                  {{item}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--2.补充车源信息 -->
      <div class="CarRepair" v-if="AddCarStateNum==1">
        <!--车源手续信息-->
        <div class="BasicTit">
          <span></span>车源手续信息
        </div>
        <!--登记证 购车发票-->
        <div>
          <div>
            <span>登记证:</span>
            <el-select class="checkSele" size="mini" v-model="Registration">
              <el-option
                v-for="item in RegistrationData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>购车发票:</span>
            <el-select class="checkSele" size="mini" v-model="Carinvoice">
              <el-option
                v-for="item in CarinvoiceData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--保养记录-->
        <div>
          <div>
            <span>保养记录:</span>
            <el-select class="checkSele" size="mini" v-model="MaintainRecord">
              <el-option
                v-for="item in MaintainRecordData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <!--车源车况信息-->
        <div class="BasicTit">
          <span></span>车源车况信息
        </div>
        <!--外观成色 内饰状况-->
        <div>
          <div>
            <span>外观成色:</span>
            <el-select class="checkSele" size="mini" v-model="AbroadCondition">
              <el-option
                v-for="item in AbroadConditionData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>内饰状况:</span>
            <el-select class="checkSele" size="mini" v-model="InteriorStatus">
              <el-option
                v-for="item in InteriorStatusData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--车辆状况-->
        <div>
          <div>
            <span>车辆状况:</span>
            <el-select class="checkSele" size="mini" v-model="CarStatus">
              <el-option
                v-for="item in CarStatusData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <!--车源价格信息-->
        <div class="BasicTit">
          <span></span>车源车况信息
          <!--<strong>发车参考价格xx元</strong>-->
          <!--<strong>新车价格xx元</strong>-->
        </div>
        <!--采购价格 展厅价格-->
        <div>
          <div>
            <span>采购价格:</span>
            <el-input v-model="AddPurPrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>
            <strong>万元</strong>
          </div>
          <div>
            <span>展厅价格:</span>
            <el-input v-model="AddExhiPrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>
            <strong>万元</strong>
          </div>
        </div>
        <!--销售底价 网销售价-->
        <div>
          <div>
            <span>销售底价:</span>
            <el-input v-model="AddSaleMiniPrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>
            <strong>万元</strong>
          </div>
         <!-- <div>
            <span><strong>*</strong>网销售价:</span>
            <el-input v-model="AddNetPinPrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>
            <strong>万元</strong>
          </div>-->
        </div>
        <!--批发价格-->
        <div>
          <div>
            <span>批发价格:</span>
            <el-input v-model="AddWholesalePrice" class="AddCarClass" size="mini" placeholder="请输入价格"></el-input>

            <strong>万元</strong>
          </div>
        </div>

        <!--车源采购信息-->
        <div class="BasicTit">
          <span></span>车源采购信息
        </div>
        <!--采购员 采购日期-->
        <div>
          <div>
            <span>采购员:</span>
            <el-select class="checkSele" size="mini" v-model="AddBuyer">
              <el-option
                v-for="item in AddBuyerData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>采购日期:</span>
            <el-date-picker
              class="AddCarClass"
              size="mini"
              v-model="PurchaseData"
              type="date"
              :editable="false"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <!--收购方式 车辆来源-->
        <div>
          <div>
            <span>收购方式:</span>
            <div class="AddBuyMode">
              <div class="AddBuyModeLi" v-for="(item,r) in AddBuyModeLi" @click="AddBuyModeLiNum=r" :class="AddBuyModeLiNum==r?AddBuyLiCli:''">{{item}}</div>
            </div>
          </div>
          <div>
            <span>车辆来源:</span>
            <div class="AddCarSource">
              <!--<area-cascader :immediate="false" v-model="value1" :placeholder="carInfo.carLocation" style="width: 200px;"  :level="2"  @change="onChange3" />-->
              <area-cascader size="small"  :data="pca" type="text" v-model="value1" :placeholder="carInfo.carLocation" style="width: 200px;"  :level="0"  @change="onChange3" />

            </div>
          </div>
        </div>
        <!--车源收购地 钥匙数量-->
        <div>
          <div>
            <span>车源收购地:</span>
            <!--<area-cascader v-model="value2" :placeholder="carInfo.purchaseCity" style="width: 200px;"  :level="2"  @change="onChange2" />-->
            <area-cascader size="small" v-model="value2" :data="pca" type="text" :placeholder="carInfo.purchaseCity" style="width: 200px;"  :level="0"  @change="onChange2" />

          </div>
          <div>
            <span>钥匙数量:</span>
            <el-input v-model="KeyNum" class="AddCarClass" size="mini" placeholder="请输入钥匙数量"></el-input>
            <strong>把</strong>
          </div>
        </div>

        <!-- 车源展示信息-->
        <div class="BasicTit">
          <span></span>车源展示信息
        </div>
        <!--车源展示地-->
        <div>
          <div>
            <span>车源收购地</span>
            <!--<area-cascader v-model="value" :placeholder="carInfo.displayLocation" style="width: 200px;"  :level="2"  @change="onChange" />-->
            <area-cascader :data="pca" v-model="value" type="text" :placeholder="carInfo.displayLocation" style="width: 200px;"  :level="0"  @change="onChange"  size="small"/>

          </div>
        </div>


      </div>
      <!--3.网络发布信息-->
      <div class="OnlineRelease"  v-if="AddCarStateNum==2">
        <div class="OnReTitle">
          <div></div>网络发布信息
        </div>
        <!--信息-->
        <div class="OnReinfor">
          <div class="NetSalesPe" style="display: none">
            <span> <strong>*</strong>   网销人员:</span>
            <el-select class="checkSele" size="mini" v-model="NetSalesPe">
              <el-option
                v-for="item in NetSalesPeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <span>商机附言:</span>
          <div class="BusPost">
            <p> 商家附言禁止加入网址链接、广告语、联系方式及违反《广告法》等信息</p>
            <p>若您未填附言，同步到其他网站时，我们将会把标准模板1的内容作为您的附言同步至对方网站。</p>
          </div>

          <div class="PostTemplate">

            <div v-for="(item,r) in PostTemplate"  @click="carDesc=PostTemplateData[r].value">{{item}}</div>
          </div>

            <el-input type="textarea" :rows="10" :cols="80" v-model="carDesc"  style="margin-top: 10px;" @focus.once="carDesc=''"></el-input>


        </div>


      </div>
    </div>
    <!--下一步-->
    <div class="step">
      <div class="stepBox">

        <div class="upper" v-if="AddCarStateNum!=0" @click="upper">上一步</div>
        <div class="lower" v-if="AddCarStateNum!=2" @click="lower">下一步</div>
        <div class="complete" v-if="AddCarStateNum==2" @click="AddCom">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { pca, pcaa } from 'area-data';
import { ImagePreview, Notify } from 'vant';
import brandPicker from '../components/mbrandPicker';
// v5 or higher
export default {
  name: 'AddCar',
  components: {
    draggable,
    brandPicker,
  },
  data() {
    return {
      vinOptions: [],
      newVin: '',
      brandFromVin: [],
      AddCarStateNum: '0',
      StateColor: 'StateColor',
      AddCarStateLiData: ['1.车源基本信息', '2.补充车源信息', '3.网络发布车源'],
      // 图片url
      dialogImageUrl: '',
      dialogVisible: false,
      brandId: [],
      AddCartype: '', // 车辆品牌 车系 年款
      ManualAdd: false,
      CarVinCode: '', // 车辆Vin码
      Gearbox: '', // 变速箱
      displacement: '', // 排量
      IsToBrand: '', // 是否上牌
      ToBrandTime: '', // 上牌时间
      CarMileage: '', // 表里程
      NextTestTime: '', // 下次验车时间
      InsuranceTerm: '', // 交强险到期
      TransferNum: '', // 过户次数
      DecoColor: '', // 内饰颜色
      AddCarpur: '', // 用途
      carType: '', // 车型
      carDesc: '',
      imgList: [],
      uprecent: 100,
      vinLoading: false,
      showBrandSet: false,
      carTypeData: [
        { value: 1, label: '三厢轿车' },
        { value: 2, label: 'SUV' },
        { value: 3, label: '两厢轿车' },
        { value: 4, label: 'MPV' },
        { value: 5, label: '跑车' },
        { value: 6, label: '面包车' },
        { value: 7, label: '皮卡' },
        { value: 8, label: '旅行车' },
      ],
      AddCartypeData: [
        { value: '宝马' },
      ], // 车辆品牌 车系 年款数据
      GearboxData: [
        { value: 1, label: '自动' },
        { value: 2, label: '手动' },
      ], // 变速箱Data
      IsToBrandData: [
        { label: '已上牌', value: 1 },
        { label: '未上牌', value: 2 },
      ], // 是否上牌
      DecoColorData: [
        { value: 1, label: '深色' },
        { value: 2, label: '浅色' },
      ], // 内饰颜色
      AddCarpurData: [
        { label: '家用', value: 1 },
        { label: '单位用车', value: 2 },
      ], // 用途
      fileList: [],
      CarInState: ['在厅', '在途', '整备', '在售', '预约', '预定', '已售'], // 在库状态数据
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
      CarInCoNum: '0', // 车身颜色选择

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
      AddCarBuyDre: [], // 车源收购地的区域
      AddCarforShow: [], // 车源收购地的区域
      carBrand: [],
      temCarBrand: [],
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
        { label: '无定期保养', value: 3 },
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
      PostTemplate: ['标准模板1', '标准模板2'],
      PostTemplateData: [
        { value: '外观：漆面保养良好，车身结构无修复，无重大事故。 内饰：干净整洁。安全指示灯正常，气囊等被动安全项正常，车辆内电子器件使用良好， 车内静态动态设备完善。 驾驶：车辆点火、起步、提速、过弯、减速、制动均无问题，加速迅猛，动力输出平稳舒 适,无怠速抖动。 整体：整体车况一般。车体骨架结构无变形扭曲、无火烧泡水痕迹。车身有喷漆痕迹，整体漆面良好，排除大事故车辆。视野宽阔，练手最佳选择，空间宽敞明亮通风性好，适 合家庭代步车。' },
        { value: '车况精品，无重大事故，无火烧泡水，无加装改装配置。让您买的放心，省心，开心。底盘结构：无明显磨损发动机舱：运转良好外观：车身无结构性损伤内饰：干净整洁漆面：保养良好' },
      ],
      PostNum: '0',
      textarea: '',
      inputTextFocus: '',
      //  步骤
      stepNum: 0,
      carId: null,
      value: [],
      value1: [],
      value2: [],
      displayLocation: '',
      buyLocation: '',
      carLocation: '',
      carInfo: '',
      temPid: '',
      temBrand: '',
      imgQuality: 0.5, // 压缩图片的质量
      props: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          const { level, value } = node;
          console.log(node);
          if (level === 0) { // 第一次获取主品牌
            this.$api.get('/getBrand?pid=0').then((res) => {
              const { success, data } = res.data;
              if (success) {
                resolve(data);
              }
            });
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
      temBrandStr: '',
    };
  },
  watch: {
    newVin(nv) {
      this.showBrandSet = true;
      setTimeout(() => {
        const _res = nv.split(',');
        this.brandFromVin = _res;
      }, 800);
    },
    imgList(nv) {
      console.log(nv);
    },
    brandId(nv) {
      if (nv[3]) {
        console.log(nv);
        try {
          const res = this.temBrand.find(r => r.value == nv[3]).label;
          this.title = res;
        } catch (e) {

        }
      }
    },
  },
  created() {
    this.carId = this.$route.query.id;
    this.pca = pca;
    if (!this.carId) return this.$message.warning('未能获取正确的车辆编号');
    this.getCarInfo();
    this.getBrands();
  },
  methods: {
    // 图片转blob
    dataURItoBlob(dataURI, type) {
      const binary = atob(dataURI.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type });
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
    async newPre() {
      this.uprecent = 0;
      Notify({
        message: '开始上传，请等待',
        duration: 1000,
        background: '#1989fa',
      });
      return true;
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
      if (imgSize > 1) {
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
      } else {
        formData.append('file', param);
        this.doPost(formData);
      }
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
    handBrandChane(r) {
      this.title = r;
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
    uploading(event, file, fileList) {
      const { percent, loaded, total } = event;
      this.uprecent = percent;
    },
    async getCarInfo() {
      const res = await this.$api(`/getVehicleInfo?id=${this.carId}&_t=${Date.now()}`);
      const { success, data } = res.data;
      if (success) {
        this.carInfo = data;
        this.title = data.title;
        this.CarVinCode = data.vin;
        this.displacement = data.displacement;
        this.ToBrandTime = new Date(data.brandDate);
        this.NextTestTime = data.nextCheckDate ? new Date(data.nextCheckDate) : '';
        this.TransferNum = data.transferCount;
        this.Gearbox = data.gearBox;
        this.IsToBrand = data.hasBrand;
        this.CarMileage = data.mileage;
        this.imgList = data.attachments.map(r => ({
          response: {
            data: r.path,
          },
          url: r.path,
        }));
        this.DecoColor = data.insideColor;
        this.AddCarpur = data.application;
        this.carType = data.carType;
        this.InsuranceTerm = data.safeExpireDate ? new Date(data.safeExpireDate) : '';
        this.CarInStateNum = data.stockState - 1;
        this.carColor = data.carColor;
        const _carColorIndex = this.CarInCoFont.indexOf(data.carColor);
        this.CarInCoNum = _carColorIndex;
        this.brandId = data.brandArr;
        this.Registration = data.registration;
        this.Carinvoice = data.carInvoice;
        this.MaintainRecord = data.keepRecord;
        this.AbroadCondition = data.surfaceState;
        this.InteriorStatus = data.insideState;
        this.CarStatus = data.carState;
        this.AddPurPrice = data.procurePrice;
        this.AddExhiPrice = data.offlinePrice;
        this.AddSaleMiniPrice = data.lowPrice;
        this.AddNetPinPrice = data.onlinePrice;
        this.AddWholesalePrice = data.tradePrice;
        this.PurchaseData = data.purchaseDate ? new Date(data.purchaseDate) : '';
        this.AddBuyModeLiNum = data.payMode - 1;
        this.AddCarSourceLiNum = data.carSource - 1;
        this.KeyNum = data.keyNum;

        this.carDesc = data.carDescribe;
        this.temBrandStr = data.brandArrStr.join() + data.title;
      }
    },
    doPreview(file) {
      ImagePreview(this.imgList.map(r => r.response.data));
    },
    doRemove(file, filelist) {
      this.imgList = filelist;
    },
    CarTuLoad(res, file, fileList) {
      this.$message.success('上传成功');
      this.imgList = fileList.map(r => r);
    },
    lower() {
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
      //  if (!this.KeyNum) return this.$message.warning('请填写钥匙数量');
        // if (!this.PurchaseData) return this.$message.warning('请选择采购日期');
        //  if (!this.displayLocation) return this.$message.warning('请填写展示地址');
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
        ft.upload(fileURL, encodeURI('https://api.1775.net.cn/common/upload'), (res) => {
          const { response, responseCode } = res;

          console.log(typeof res);
          console.log(response);
          console.log(typeof response);
          console.log(responseCode);
          console.log(response.success);


          const _res = JSON.parse(response);
          console.log(_res);
          if (responseCode == 200 && _res.success) {
            this.$message.success('上传成功');
            console.log(_res.data);
            setTimeout((_) => {
              this.imgList.push({ response: _res });
            }, 800);
            console.log(this.imgList);
          }
          resolve();
        }, (err) => {
          // alert(JSON.stringify(err));
          reject(err);
        }, options, true);
      });
    },
    async addPic() {
      ImagePicker.getPictures(async (result) => {
        const arr = result.images;
        console.log('arr', result);
        for (const item of arr) {
          await this.newUpload(item.uri);
        }
      }, (err) => {
        alert(err);
      }, {
        maximumImagesCount: 20,
        width: 1500,
        quality: 80,
      });
    },
    upper() {
      if (this.stepNum >= 0) {
        this.stepNum--;
        this.AddCarStateNum = this.stepNum;
      }
    },
    brandChange(a, b, c) {
      console.log(a);
    },
    async getBrands() {
      const res = await this.$api.get('/getBrand?pid=0');
      const { success, data } = res.data;
      if (success) {
        this.temCarBrand = data;
        this.carBrand = this.temCarBrand;
      }
    },
    filterBrand(node, keyword) {
      console.log(12313123);
      this.carBrand = this.temCarBrand.filter(r => r.label.includes(keyword));
      console.log(keyword);
      console.log(this.carBrand);
      return this.carBrand.length > 0;
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
    // 删除上传图片
    removeImg(item) {
      const { uid } = item;
      this.imgList = this.imgList.filter(r => r.response.data != item.response.data);
    },
    async AddCom() {
      const res2 = await this.$api.post('/updateVehicle', {
        id: this.carId,
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
        carLocation: this.carLocation.length ? this.carLocation.join('') : this.carInfo.carLocation, // 车源地址
        displayLocation: this.displayLocation.length ? this.displayLocation.join('') : this.carInfo.displayLocation, // 展示地址
        purchaseCity: this.buyLocation.length ? this.buyLocation.join('') : this.carInfo.purchaseCity, // 车源收购地址
        salesMan: this.NetSalesPe, // 网销人员
        carDescribe: this.carDesc, // 附言
        companyId: this.$store.state.company.id,
        title: this.title,
      });

      const { data, success, info } = res2.data;
      if (success) {
        this.$message.success('更新成功');
        this.$router.go(-1);
      } else {
        this.$message.warning(info);
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .AddCar{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .AddCarBox{
    width: 100%;
    margin: 0 auto;
    padding:0 10px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 0;
    flex-grow: 1;
    box-sizing: border-box;
  }
  .AddCarLi{
    height: 50px;
    line-height: 50px;
    background-color: #F9FAFA;
    position: relative;
  }
  .AddCarLiFon{
    width: 60px;
    height: 50px;
    color: #1B1B1B;
    font-size: 14px;
    float: left;
    margin-left: 20px;

  }

  .AddCarState{
    margin-top: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 40px;
    display: flex;
    justify-content: space-around;
  }
  .AddCarStateLi{
    width: 120px;
    height: 28px;
    border: 1px solid #e3e3e3;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    color: #666666;
    cursor: pointer;
  }
  .StateColor{
    background-color: $ora;
    color: #fff;
  }

  .CarBasic{
    width: 100%;
  }

  .BasicTit{
    height: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    color: #4A4A4A;
    font-size: 14px;
  }
  .BasicTit>span{
    background-color: $ora;
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
  }
  .BasicTit>strong {
    color: #A2A7B2;
    font-size: 12px;
    font-weight: 400;
    margin-right: 10px;
  }

  .CarBasicTuLi{
    width: 100%;
    p{
      font-size: 12px;
    }

  }
 ::v-deep .area-cascader-wrap{
    float:left!important;
    line-height: 1;
  }
 ::v-deep .area-select.small{
    width: 200px;
  }
 ::v-deep   .el-upload--picture-card{
    width: 80px!important;
    height: 80px!important;
    line-height: 80px;
  }
  .CarBasicTuLi ul{
    width: 100%;
    display: flex;
  }
  .CarBasicTuLi li{
    width: 148px;
    height: 178px;
    margin-right: 20px;
  }
  .CarBasicTu{

    &>div:first-child{
      display: flex;
    }
  }
  .imgTool{
    background: rgba(0,0,0,.6);
    i{
      color:#fff;
      font-size: 12px;
      margin-left: 5px;
    }
    font-size: 12px;
  }
  .CarBasicTuLi li>p{
    line-height: 30px;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .CarBasicTuLi li strong{
    color: $ora;
  }
  .CarBasicFrom{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .CarBasicFrom>div{
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
  }
  .CarBasicFrom>div>div{
    color: #666;
    font-size: 12px;
    margin-bottom: 5px;
    display: flex;
    line-height: 36px;
  }
  .CarBasicFrom>div>div>div:nth-child(2){
    width: 0;
    flex: 1;
  }
  .CarBasicFrom>div:nth-child(1)>div{

  }
  .CarBasicFrom>div>div:nth-child(1){
    float: left;
  }
  .CarBasicFrom>div>div:nth-child(2){
    float: right;
  }
  .CarBasicFrom>div>div>span{
    display: inline-block;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: right;
    margin-right: 10px;
    /*float: left;*/
  }
  .CarBasicFrom>div>div>strong{
    font-weight: 400;
    margin-left: 5px;
    color: #666;
  }
  .CarBasicFrom>div>div>span>strong{
    color: $ora;
    font-weight: 400;
    cursor: pointer;
  }
  .CarInState{
    line-height: 26px;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .CarInLi{
    width: 76px;
    height: 26px;
    border: 1px solid #e3e3e3;
    cursor:pointer;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .CarInClick{
    border: 1px solid $ora;
    color: $ora;
  }
  .checkSele{
    width: 160px;
    height: 36px;
    line-height: 36px;

  }
  .checkSeleDate{
    width: 160px;
    height: 30px;
    margin-top: 2px;
  }
  .AddCarClass{
    width: 160px;
    height: 36px;
    line-height: 36px;
  }
  .CarInLiCo{
    width: 26px;
    height: 26px;
    float: left;
  }

  .CarRepair{
    width: 100%;
    line-height: 26px;
  }
  .CarRepair>div{
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
  }
  .CarRepair>div>div{
    height: 36px;
    color: #666;
    font-size: 12px;
  }
  .CarRepair>div>div:nth-child(1){
    float: left;
  }
  .CarRepair>div>div:nth-child(2){
    float: right;
  }
  .CarRepair>div>div>span{
    display: inline-block;
    width: 96px;
    height: 36px;
    line-height: 36px;
    text-align: right;
    margin-right: 10px;
    float: left;
  }
  .CarRepair>div>div>strong{
    font-weight: 400;
    margin-left: 5px;
    color: #666;
  }
  .CarRepair>div>div>span>strong{
    color: $ora;
    font-weight: 400;
    cursor: pointer;
  }

  .AddBuyMode{
    width: 300px;
    height: 36px;
  }
  .AddBuyModeLi{
    float: left;
    margin-right: 10px;
    width: 76px;
    height: 26px;
    border: 1px solid #e3e3e3;
    text-align: center;
    font-size: 12px;
    position: relative;
    top: 5px;
    cursor: pointer;
  }


  .AddCarSource{
    width: 500px;
    height: 36px;
  }
  .AddCarSourceLi{
    float: left;
    margin-right: 10px;
    width: 76px;
    height: 26px;
    border: 1px solid #e3e3e3;
    text-align: center;
    font-size: 12px;
    position: relative;
    top: 5px;
    cursor: pointer;
  }
  .AddBuyLiCli{
    border: 1px solid $ora;
    color: $ora;
  }


  .OnlineRelease{
    width: 100%;
    height: 400px;
    margin-top: 20px;
  }
  .OnReTitle{
    width: 100%;
    height: 22px;
    color: #4A4A4A;font-size: 16px;
    text-align: left;
    font-weight: 600;
    line-height: 22px;
  }
  .OnReTitle>div{
    width: 5px;
    height: 14px;
    background-color: $ora;
    float: left;
    margin-right: 10px;
    position: relative;
    top: 4px;
  }
  .OnReinfor{

  }
  .NetSalesPe{
    height: 30px;
    margin-bottom: 30px;
  }
  .NetSalesPe>span{
    display: inline-block;
    width: 100px;
    height: 26px;
    text-align: right;
    font-size: 14px;
    color: #666666;
    margin-right: 5px;
    line-height: 26px;
    font-weight: 600;
  }
  .NetSalesPe>span>strong{
    margin-right: 5px;
    color: $ora;
    line-height: 26px;
  }

  .OnReinfor>span{
    display: inline-block;
    width: 100px;
    height: 26px;
    float: left;
    color: #666;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }
  .BusPost{
    line-height: 21px;
    float: left;
    margin-bottom: 30px;
  }
  .BusPost>p{
    color: #666666;
    font-size: 14px;
  }
  .PostTemplate{
    clear: both;
    width: 400px;
    height: 26px;
    margin-left: 40px;
  }
  .PostTemplate>div{
    width: 95px;
    height: 26px;
    text-align: center;
    font-size: 14px;
    line-height: 26px;
    color: #fff;
    background-color: $ora;
    margin-right: 10px;
    float: left;
    cursor: pointer;
  }
  .PostTemplate>div:hover{
    background-color: #FF9922;
  }

  .inputText{
    height: 270px;
    /*background-color: red;*/
    width: 90vw;
    border:1px solid #ccc;
    overflow: auto;
    margin-top: 10px;
  }
  .inputText>textarea{
    color: #333;
    width: 90vw;
    font-size: 14px;
    line-height: 22px;
    padding:5px;

  }


  .step{
    width: 100%;
    height: 50px;
    background-color: #fff;
    bottom: 0;
    box-shadow: 0 0 15px 3px rgba(221,221,221,0.5);;
  }
  .stepBox{
    height: 40px;
    display: flex;
  }
  .stepBox>div{
    width: 140px;
    height: 30px;
    text-align: center;
    font-weight: 600;
    color: #fff;
    background-color: $ora;
    line-height: 30px;
    margin:15px auto 0;
    cursor:pointer;


  }
  .imgList > span {
    display: flex;
    flex-wrap: wrap;
  }
  .imgList >span >div{
    width: 100px;
    height: 75px;
    border: 1px solid #969696;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .back{
    position: absolute;
    right:20px;
    top:50%;
    font-size: 14px;
    transform: translateY(-50%);
  }


</style>
