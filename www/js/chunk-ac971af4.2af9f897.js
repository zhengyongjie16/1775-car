(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ac971af4"],{"3bf7":function(e,a,t){},"59a5":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"AddCar"},[t("div",{staticClass:"AddCarLi"},[t("div",{staticClass:"AddCarLiFon"},[e._v("添加车辆")]),t("span",{staticClass:"back",on:{click:function(a){return e.$router.go(-1)}}},[e._v("返回")])]),t("div",{staticClass:"AddCarState"},e._l(e.AddCarStateLiData,function(a,i){return t("div",{staticClass:"AddCarStateLi",class:e.AddCarStateNum==i?"StateColor":""},[e._v(e._s(a))])}),0),t("div",{staticClass:"AddCarBox"},[0==e.AddCarStateNum?t("div",{staticClass:"CarBasic"},[e._m(0),t("div",{staticClass:"CarBasicTuLi"},[t("div",{staticClass:"CarBasicTu"}),t("div",[t("draggable",{directives:[{name:"loading",rawName:"v-loading",value:100!=e.uprecent,expression:"uprecent!=100"}],staticClass:"imgList",attrs:{"element-loading-text":"上传中请等待","element-loading-spinner":"el-icon-loading"},model:{value:e.imgList,callback:function(a){e.imgList=a},expression:"imgList"}},[t("transition-group",e._l(e.imgList,function(a,i){return t("div",{key:a.response.data,style:{background:"url("+e.mobilePic(a.response.data)+") center center",backgroundSize:"cover",overflow:"hidden"},on:{click:e.doPreview}},[t("div",{staticClass:"imgTool"},[t("i",[e._v(e._s(i+1))]),t("i",{staticClass:"el-icon-delete",staticStyle:{"margin-left":"10px"},on:{click:function(t){return e.removeImg(a)}}},[e._v("删除")])])])}),0)],1),t("el-upload",{attrs:{slot:"footer",action:"https://api.1775.net.cn/common/upload","list-type":"picture-card",data:{type:"car"},"on-preview":e.doPreview,"on-remove":e.doRemove,"on-success":e.CarTuLoad,"on-progress":e.uploading,"before-upload":e.uploadPre,"file-list":e.imgList,limit:20,"show-file-list":!1,multiple:"","on-exceed":function(){return e.$message.info("最多只能上传20张图片哦")}},slot:"footer"},[t("i",{staticClass:"el-icon-plus"})]),t("el-dialog",{attrs:{visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._m(1)]),t("div",{staticClass:"CarBasicFrom"},[t("div",[t("div",[e._m(2),t("el-input",{staticClass:"AddCarClass",staticStyle:{width:"300px"},attrs:{size:"mini",placeholder:"标题"},model:{value:e.title,callback:function(a){e.title=a},expression:"title"}})],1),t("div",[e._m(3),e.showBrandSet?t("brandPicker",{staticStyle:{display:"inline-block"},attrs:{defalut:e.brandFromVin},on:{change:e.handBrandChane},model:{value:e.brandId,callback:function(a){e.brandId=a},expression:"brandId"}}):t("el-input",{staticClass:"AddCarClass",staticStyle:{width:"200px"},attrs:{value:e.temBrandStr,disabled:"",size:"mini"}}),t("span",{staticStyle:{color:"#A2A7B2"},on:{click:function(a){e.showBrandSet=!0}}},[e._v("修改")]),e.ManualAdd?t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请写入车辆"},model:{value:e.AddCartype,callback:function(a){e.AddCartype=a},expression:"AddCartype"}}):e._e()],1)]),t("div",[t("div",[t("span",[e._v("车辆Vin码:")]),t("el-select",{attrs:{filterable:"",remote:"",size:"mini",placeholder:"不包含I、O、Q","remote-method":e.remoteMethod,loading:e.vinLoading},model:{value:e.newVin,callback:function(a){e.newVin=a},expression:"newVin"}},e._l(e.vinOptions,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),t("span",{staticStyle:{margin:"0 10px"}},[e._v(" "+e._s(e.CarVinCode))])],1),t("div",[t("span",[e._v("变速箱:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini",placeholder:"选择变速箱"},model:{value:e.Gearbox,callback:function(a){e.Gearbox=a},expression:"Gearbox"}},e._l(e.GearboxData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),t("div",[t("div",[e._m(4),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入里程"},model:{value:e.CarMileage,callback:function(a){e.CarMileage=a},expression:"CarMileage"}}),t("strong",[e._v("万公里")])],1),t("div",[t("span",[e._v("是否上牌:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.IsToBrand,callback:function(a){e.IsToBrand=a},expression:"IsToBrand"}},e._l(e.IsToBrandData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),t("div",[t("div",[e._m(5),t("el-date-picker",{staticClass:"checkSele",attrs:{size:"mini",type:"month",editable:!1},model:{value:e.ToBrandTime,callback:function(a){e.ToBrandTime=a},expression:"ToBrandTime"}}),t("span")],1),t("div",[t("span",[e._v("排量:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini",placeholder:"排量"},model:{value:e.displacement,callback:function(a){e.displacement=a},expression:"displacement"}},e._l(e.displacementData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),t("span")],1)]),t("div",[t("div",[e._m(6),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入价格"},model:{value:e.AddNetPinPrice,callback:function(a){e.AddNetPinPrice=a},expression:"AddNetPinPrice"}}),t("strong",[e._v("万元")])],1),t("div",[t("span",[e._v("交强险到期:")]),t("el-date-picker",{staticClass:"checkSele",attrs:{size:"mini",type:"month",editable:!1},model:{value:e.InsuranceTerm,callback:function(a){e.InsuranceTerm=a},expression:"InsuranceTerm"}})],1)]),t("div",[t("div",[t("span",[e._v("过户次数:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini"},model:{value:e.TransferNum,callback:function(a){e.TransferNum=a},expression:"TransferNum"}}),t("strong",[e._v("次")])],1),t("div",[t("span",[e._v("内饰颜色:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini",placeholder:"选择内饰颜色"},model:{value:e.DecoColor,callback:function(a){e.DecoColor=a},expression:"DecoColor"}},e._l(e.DecoColorData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),t("div",[t("div",[t("span",[e._v("车辆性质:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini",placeholder:"选择用途"},model:{value:e.AddCarpur,callback:function(a){e.AddCarpur=a},expression:"AddCarpur"}},e._l(e.AddCarpurData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),t("div",[t("span",[e._v("下次验车:")]),t("el-date-picker",{staticClass:"checkSele",attrs:{size:"mini",type:"month",editable:!1},model:{value:e.NextTestTime,callback:function(a){e.NextTestTime=a},expression:"NextTestTime"}}),t("span")],1)]),t("div",[t("div",{staticStyle:{width:"100%"}},[t("span",{staticStyle:{float:"left"}},[e._v("在库状态:")]),t("div",{staticClass:"CarInState"},e._l(e.CarInState,function(a,i){return t("div",{staticClass:"CarInLi",class:e.CarInStateNum==i?e.CarInClick:"",on:{click:function(a){e.CarInStateNum=i}}},[e._v(e._s(a))])}),0)])]),t("div",[t("div",{staticStyle:{width:"100%"}},[e._m(7),t("div",{staticClass:"CarInState"},e._l(e.CarInCoFont,function(a,i){return t("div",{staticClass:"CarInLi",class:e.CarInCoNum==i?e.CarInClick:"",on:{click:function(a){e.CarInCoNum=i}}},[t("div",{staticClass:"CarInLiCo",style:e.CarInCoColor[i]}),e._v("\n                "+e._s(a)+"\n              ")])}),0)])])])]):e._e(),1==e.AddCarStateNum?t("div",{staticClass:"CarRepair"},[e._m(8),t("div",[t("div",[t("span",[e._v("登记证:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.Registration,callback:function(a){e.Registration=a},expression:"Registration"}},e._l(e.RegistrationData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),t("div",[t("span",[e._v("购车发票:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.Carinvoice,callback:function(a){e.Carinvoice=a},expression:"Carinvoice"}},e._l(e.CarinvoiceData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),t("div",[t("div",[t("span",[e._v("保养记录:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.MaintainRecord,callback:function(a){e.MaintainRecord=a},expression:"MaintainRecord"}},e._l(e.MaintainRecordData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),e._m(9),t("div",[t("div",[t("span",[e._v("外观成色:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.AbroadCondition,callback:function(a){e.AbroadCondition=a},expression:"AbroadCondition"}},e._l(e.AbroadConditionData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),t("div",[t("span",[e._v("内饰状况:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.InteriorStatus,callback:function(a){e.InteriorStatus=a},expression:"InteriorStatus"}},e._l(e.InteriorStatusData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),t("div",[t("div",[t("span",[e._v("车辆状况:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.CarStatus,callback:function(a){e.CarStatus=a},expression:"CarStatus"}},e._l(e.CarStatusData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)]),e._m(10),t("div",[t("div",[t("span",[e._v("采购价格:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入价格"},model:{value:e.AddPurPrice,callback:function(a){e.AddPurPrice=a},expression:"AddPurPrice"}}),t("strong",[e._v("万元")])],1),t("div",[t("span",[e._v("展厅价格:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入价格"},model:{value:e.AddExhiPrice,callback:function(a){e.AddExhiPrice=a},expression:"AddExhiPrice"}}),t("strong",[e._v("万元")])],1)]),t("div",[t("div",[t("span",[e._v("销售底价:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入价格"},model:{value:e.AddSaleMiniPrice,callback:function(a){e.AddSaleMiniPrice=a},expression:"AddSaleMiniPrice"}}),t("strong",[e._v("万元")])],1)]),t("div",[t("div",[t("span",[e._v("批发价格:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入价格"},model:{value:e.AddWholesalePrice,callback:function(a){e.AddWholesalePrice=a},expression:"AddWholesalePrice"}}),t("strong",[e._v("万元")])],1)]),e._m(11),t("div",[t("div",[t("span",[e._v("采购员:")]),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.AddBuyer,callback:function(a){e.AddBuyer=a},expression:"AddBuyer"}},e._l(e.AddBuyerData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),t("div",[t("span",[e._v("采购日期:")]),t("el-date-picker",{staticClass:"AddCarClass",attrs:{size:"mini",type:"date",editable:!1,placeholder:"选择日期时间"},model:{value:e.PurchaseData,callback:function(a){e.PurchaseData=a},expression:"PurchaseData"}})],1)]),t("div",[t("div",[t("span",[e._v("收购方式:")]),t("div",{staticClass:"AddBuyMode"},e._l(e.AddBuyModeLi,function(a,i){return t("div",{staticClass:"AddBuyModeLi",class:e.AddBuyModeLiNum==i?e.AddBuyLiCli:"",on:{click:function(a){e.AddBuyModeLiNum=i}}},[e._v(e._s(a))])}),0)]),t("div",[t("span",[e._v("车辆来源:")]),t("div",{staticClass:"AddCarSource"},[t("area-cascader",{staticStyle:{width:"200px"},attrs:{size:"small",data:e.pca,type:"text",placeholder:e.carInfo.carLocation,level:0},on:{change:e.onChange3},model:{value:e.value1,callback:function(a){e.value1=a},expression:"value1"}})],1)])]),t("div",[t("div",[t("span",[e._v("车源收购地:")]),t("area-cascader",{staticStyle:{width:"200px"},attrs:{size:"small",data:e.pca,type:"text",placeholder:e.carInfo.purchaseCity,level:0},on:{change:e.onChange2},model:{value:e.value2,callback:function(a){e.value2=a},expression:"value2"}})],1),t("div",[t("span",[e._v("钥匙数量:")]),t("el-input",{staticClass:"AddCarClass",attrs:{size:"mini",placeholder:"请输入钥匙数量"},model:{value:e.KeyNum,callback:function(a){e.KeyNum=a},expression:"KeyNum"}}),t("strong",[e._v("把")])],1)]),e._m(12),t("div",[t("div",[t("span",[e._v("车源收购地")]),t("area-cascader",{staticStyle:{width:"200px"},attrs:{data:e.pca,type:"text",placeholder:e.carInfo.displayLocation,level:0,size:"small"},on:{change:e.onChange},model:{value:e.value,callback:function(a){e.value=a},expression:"value"}})],1)])]):e._e(),2==e.AddCarStateNum?t("div",{staticClass:"OnlineRelease"},[e._m(13),t("div",{staticClass:"OnReinfor"},[t("div",{staticClass:"NetSalesPe",staticStyle:{display:"none"}},[e._m(14),t("el-select",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.NetSalesPe,callback:function(a){e.NetSalesPe=a},expression:"NetSalesPe"}},e._l(e.NetSalesPeData,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),t("span",[e._v("商机附言:")]),e._m(15),t("div",{staticClass:"PostTemplate"},e._l(e.PostTemplate,function(a,i){return t("div",{on:{click:function(a){e.carDesc=e.PostTemplateData[i].value}}},[e._v(e._s(a))])}),0),t("div",{staticClass:"inputText"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.carDesc,expression:"carDesc"}],attrs:{rows:"10",cols:"80"},domProps:{value:e.carDesc},on:{input:function(a){a.target.composing||(e.carDesc=a.target.value)}}})])])]):e._e()]),t("div",{staticClass:"step"},[t("div",{staticClass:"stepBox"},[0!=e.AddCarStateNum?t("div",{staticClass:"upper",on:{click:e.upper}},[e._v("上一步")]):e._e(),2!=e.AddCarStateNum?t("div",{staticClass:"lower",on:{click:e.lower}},[e._v("下一步")]):e._e(),2==e.AddCarStateNum?t("div",{staticClass:"complete",on:{click:e.AddCom}},[e._v("完成")]):e._e()])])])},n=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("基本信息 带"),t("strong",[e._v("*")]),e._v("项为必填项，全部填写后才能发布车源\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("p",[t("strong",[e._v("*")]),e._v(" 点击从电脑上传图片(第一张图将是封面图),可拖拽排序")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("标题:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("所属品牌:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("表显里程:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("上牌时间:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("网销售价:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",{staticStyle:{float:"left"}},[t("strong",[e._v("*")]),e._v("车身颜色:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("车源手续信息\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("车源车况信息\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("车源车况信息\n        ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("车源采购信息\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BasicTit"},[t("span"),e._v("车源展示信息\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"OnReTitle"},[t("div"),e._v("网络发布信息\n      ")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",[t("strong",[e._v("*")]),e._v("   网销人员:")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"BusPost"},[t("p",[e._v(" 商家附言禁止加入网址链接、广告语、联系方式及违反《广告法》等信息")]),t("p",[e._v("若您未填附言，同步到其他网站时，我们将会把标准模板1的内容作为您的附言同步至对方网站。")])])}],s=(t("6762"),t("2fdb"),t("96cf"),t("3b8d")),r=(t("34ef"),t("7514"),t("28a5"),t("310e")),l=t.n(r),c=t("92e9"),o=t("28a2"),d=t("ebc1"),u={name:"AddCar",components:{draggable:l.a,brandPicker:d["a"]},data:function(){var e=this;return{vinOptions:[],newVin:"",brandFromVin:[],AddCarStateNum:"0",StateColor:"StateColor",AddCarStateLiData:["1.车源基本信息","2.补充车源信息","3.网络发布车源"],dialogImageUrl:"",dialogVisible:!1,brandId:[],AddCartype:"",ManualAdd:!1,CarVinCode:"",Gearbox:"",displacement:"",IsToBrand:"",ToBrandTime:"",CarMileage:"",NextTestTime:"",InsuranceTerm:"",TransferNum:"",DecoColor:"",AddCarpur:"",carType:"",carDesc:"",imgList:[],uprecent:100,vinLoading:!1,showBrandSet:!1,carTypeData:[{value:1,label:"三厢轿车"},{value:2,label:"SUV"},{value:3,label:"两厢轿车"},{value:4,label:"MPV"},{value:5,label:"跑车"},{value:6,label:"面包车"},{value:7,label:"皮卡"},{value:8,label:"旅行车"}],AddCartypeData:[{value:"宝马"}],GearboxData:[{value:1,label:"自动"},{value:2,label:"手动"}],IsToBrandData:[{label:"已上牌",value:1},{label:"未上牌",value:2}],DecoColorData:[{value:1,label:"深色"},{value:2,label:"浅色"}],AddCarpurData:[{label:"家用",value:1},{label:"单位用车",value:2}],CarInState:["在厅","在途","整备","在售","预约","预定","已售"],CarInStateNum:0,CarInClick:"CarInClick",CarInCoFont:["黑色","白色","银灰色","红色","深灰色","蓝色","香槟色","棕色","黄色","绿色","紫色","橙色","其他"],CarInCoColor:[{background:"#000"},{background:"#fff"},{background:"#BEC3C4"},{background:"#CA0A00"},{background:"#595959"},{background:"#004D97"},{background:"#CD7F32"},{background:"#482709"},{background:"#FFF600"},{background:"#009944"},{background:"#4F2F4F"},{background:"#E93F35"},{background:""}],CarInCoNum:"0",Registration:1,Carinvoice:1,MaintainRecord:1,AbroadCondition:1,InteriorStatus:1,CarStatus:1,AddPurPrice:"",AddExhiPrice:"",AddSaleMiniPrice:"",AddNetPinPrice:"",AddWholesalePrice:"",AddBuyer:"",PurchaseData:"",title:"",AddBuyModeLi:["全款","贷款"],AddBuyModeLiNum:0,AddBuyLiCli:"AddBuyLiCli",AddCarSourceLi:["收购","寄卖","置换","其他"],AddCarSourceLiNum:0,AddCarBuyLocal:"广西 柳州",KeyNum:"",AddCarBuyDre:[],AddCarforShow:[],carBrand:[],temCarBrand:[],RegistrationData:[{label:"齐全",value:1},{label:"丢失",value:2},{label:"补办中",value:3}],CarinvoiceData:[{label:"齐全",value:1},{label:"丢失",value:2},{label:"补办中",value:3}],MaintainRecordData:[{label:"4s定期保养",value:1},{label:"非4s定期保养",value:2},{label:"无定期保养",value:3}],AbroadConditionData:[{label:"极新",value:1},{label:"较新",value:2},{label:"一般",value:3},{label:"较差",value:4}],InteriorStatusData:[{label:"完好",value:1},{label:"有破损",value:2}],CarStatusData:[{label:"无事故",value:1},{label:"有轻微刮蹭",value:2},{label:"有过大修",value:3}],AddBuyerData:[{value:"请选择"},{value:"xxxx"}],AddCarBuyLocalData:"",AddCarBuyDreData:[{value:"城中区"},{value:"城南区"},{value:"城北区"}],NetSalesPe:"",NetSalesPeData:[{value:""}],PostTemplate:["标准模板1","标准模板2"],PostTemplateData:[{value:"外观：漆面保养良好，车身结构无修复，无重大事故。 内饰：干净整洁。安全指示灯正常，气囊等被动安全项正常，车辆内电子器件使用良好， 车内静态动态设备完善。 驾驶：车辆点火、起步、提速、过弯、减速、制动均无问题，加速迅猛，动力输出平稳舒 适,无怠速抖动。 整体：整体车况一般。车体骨架结构无变形扭曲、无火烧泡水痕迹。车身有喷漆痕迹，整体漆面良好，排除大事故车辆。视野宽阔，练手最佳选择，空间宽敞明亮通风性好，适 合家庭代步车。"},{value:"车况精品，无重大事故，无火烧泡水，无加装改装配置。让您买的放心，省心，开心。底盘结构：无明显磨损发动机舱：运转良好外观：车身无结构性损伤内饰：干净整洁漆面：保养良好"}],PostNum:"0",textarea:"",inputTextFocus:"",stepNum:0,carId:null,value:[],value1:[],value2:[],displayLocation:"",buyLocation:"",carLocation:"",carInfo:"",temPid:"",temBrand:"",imgQuality:.5,props:{lazy:!0,lazyLoad:function(a,t){var i=a.level,n=a.value;console.log(a),0===i&&e.$api.get("/getBrand?pid=0").then(function(e){var a=e.data,i=a.success,n=a.data;i&&t(n)}),1!==i&&2!==i||(e.temPid=a.value,e.temBrand=[],e.$api.get("/getBrand?pid=".concat(n,"&level=").concat(i)).then(function(e){var a=e.data,i=a.success,n=a.data;i&&t(n)})),3===i&&e.$api.get("/getBrand?pid=".concat(e.temPid,"&level=").concat(i,"&year=").concat(n)).then(function(a){var i=a.data,n=i.success,s=i.data;e.temBrand=s,n&&t(s)}),4===i&&(e.title=a.label)}},temBrandStr:""}},watch:{newVin:function(e){var a=this;this.showBrandSet=!0,setTimeout(function(){var t=e.split(",");a.brandFromVin=t},800)},imgList:function(e){console.log(e)},brandId:function(e){if(e[3]){console.log(e);try{var a=this.temBrand.find(function(a){return a.value==e[3]}).label;this.title=a}catch(t){}}}},created:function(){if(this.carId=this.$route.query.id,this.pca=c["pca"],!this.carId)return this.$message.warning("未能获取正确的车辆编号");this.getCarInfo(),this.getBrands()},methods:{dataURItoBlob:function(e,a){for(var t=atob(e.split(",")[1]),i=[],n=0;n<t.length;n++)i.push(t.charCodeAt(n));return new Blob([new Uint8Array(i)],{type:a})},uploadPre:function(e){this.uprecent=0;var a="image/jpeg"===e.type,t="image/png"===e.type;if(!a&&!t)return this.$message.warning("仅支持png 和 jpeg"),!1;this.uploadTotal=this.uploadTotal+100;var i=e.size/1024/1024;if(i>1){var n=this;return new Promise(function(a){var t=new FileReader,i=new Image;i.onload=function(t){var s=document.createElement("canvas"),r=s.getContext("2d"),l=i.width*n.imgQuality,c=i.height*n.imgQuality,o=1e3;l>o?(s.width=o,s.height=parseInt(c*o/l),l=s.width,c=s.height):(s.width=l,s.height=c),console.log("k",s.width),console.log("g",s.height),r.clearRect(0,0,l,c),r.drawImage(i,0,0,l,c);var d=s.toDataURL(e.type),u=n.dataURItoBlob(d,e.type);a(u)},t.onload=function(e){i.src=e.target.result},t.readAsDataURL(e)})}},handBrandChane:function(e){this.title=e},remoteMethod:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(a){var t,i,n,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.vinLoading=!0,17==a.length){e.next=3;break}return e.abrupt("return",this.vinLoading=!1);case 3:if(!(a.includes("i")||a.includes("I")||a.includes("o")||a.includes("O")||a.includes("Q")||a.includes("q"))){e.next=7;break}return this.vinLoading=!1,this.$message.warning("vin不包含I，O，Q"),e.abrupt("return",!1);case 7:return e.next=9,this.$api.post("/vehicle/getInfoByVin",{vin:a});case 9:t=e.sent,this.CarVinCode=a,this.vinLoading=!1,i=t.data,n=i.success,s=i.data,n&&(this.vinOptions=s);case 14:case"end":return e.stop()}},e,this)}));function a(a){return e.apply(this,arguments)}return a}(),uploading:function(e,a,t){var i=e.percent;e.loaded,e.total;this.uprecent=i},getCarInfo:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var a,t,i,n,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api("/getVehicleInfo?id=".concat(this.carId));case 2:a=e.sent,t=a.data,i=t.success,n=t.data,i&&(this.carInfo=n,this.title=n.title,this.CarVinCode=n.vin,this.displacement=n.displacement,this.ToBrandTime=new Date(n.brandDate),this.NextTestTime=n.nextCheckDate?new Date(n.nextCheckDate):"",this.TransferNum=n.transferCount,this.Gearbox=n.gearBox,this.IsToBrand=n.hasBrand,this.CarMileage=n.mileage,this.imgList=n.attachments.map(function(e){return{response:{data:e.path},url:e.path}}),this.DecoColor=n.insideColor,this.AddCarpur=n.application,this.carType=n.carType,this.InsuranceTerm=n.safeExpireDate?new Date(n.safeExpireDate):"",this.CarInStateNum=n.stockState-1,this.carColor=n.carColor,s=this.CarInCoFont.indexOf(n.carColor),this.CarInCoNum=s,this.brandId=n.brandArr,this.Registration=n.registration,this.Carinvoice=n.carInvoice,this.MaintainRecord=n.keepRecord,this.AbroadCondition=n.surfaceState,this.InteriorStatus=n.insideState,this.CarStatus=n.carState,this.AddPurPrice=n.procurePrice,this.AddExhiPrice=n.offlinePrice,this.AddSaleMiniPrice=n.lowPrice,this.AddNetPinPrice=n.onlinePrice,this.AddWholesalePrice=n.tradePrice,this.PurchaseData=n.purchaseDate?new Date(n.purchaseDate):"",this.AddBuyModeLiNum=n.payMode-1,this.AddCarSourceLiNum=n.carSource-1,this.KeyNum=n.keyNum,this.carDesc=n.carDescribe,this.temBrandStr=n.brandArrStr.join()+n.title);case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),doPreview:function(e){Object(o["a"])(this.imgList.map(function(e){return e.response.data}))},doRemove:function(e,a){this.imgList=a},CarTuLoad:function(e,a,t){this.$message.success("上传成功"),this.imgList=t.map(function(e){return e})},lower:function(){if(0===this.stepNum){if(!this.AddNetPinPrice||parseFloat(this.AddNetPinPrice)<0)return this.$message.warning("请填写正确的网销售价");if(!this.title)return this.$message.warning("请填写标题");if(this.imgList.length<5)return this.$message.warning("车辆图片不能少于5张");if(!this.brandId[1])return this.$message.warning("请选择汽车品牌");if(!this.ToBrandTime)return this.$message.warning("请选择首次上牌时间");if(!this.CarMileage)return this.$message.warning("请选择表显里程数")}if(1===this.stepNum&&(!this.AddNetPinPrice||parseFloat(this.AddNetPinPrice)<0))return this.$message.warning("请填写正确的网销售价");this.stepNum<=2&&(this.stepNum++,this.AddCarStateNum=this.stepNum)},upper:function(){this.stepNum>=0&&(this.stepNum--,this.AddCarStateNum=this.stepNum)},brandChange:function(e,a,t){console.log(e)},getBrands:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var a,t,i,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.get("/getBrand?pid=0");case 2:a=e.sent,t=a.data,i=t.success,n=t.data,i&&(this.temCarBrand=n,this.carBrand=this.temCarBrand);case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),filterBrand:function(e,a){return console.log(12313123),this.carBrand=this.temCarBrand.filter(function(e){return e.label.includes(a)}),console.log(a),console.log(this.carBrand),this.carBrand.length>0},onChange:function(e,a){this.displayLocation=e},onChange2:function(e,a){this.buyLocation=e},onChange3:function(e,a){this.carLocation=e},removeImg:function(e){var a=e.uid;this.imgList=this.imgList.filter(function(e){return e.uid!=a})},AddCom:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var a,t,i,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.post("/updateVehicle",{id:this.carId,brandId:this.brandId[1],carPic:this.imgList.map(function(e){return e.response.data}),vin:this.CarVinCode,gearBox:this.Gearbox,displacement:this.displacement,hasBrand:this.IsToBrand,brandDate:this.ToBrandTime.getTime(),mileage:this.CarMileage,nextCheckDate:this.NextTestTime?this.NextTestTime.getTime():"",safeExpireDate:this.InsuranceTerm?this.InsuranceTerm.getTime():"",transferCount:this.TransferNum,insideColor:this.DecoColor,application:this.AddCarpur,carType:this.carType,stockState:this.CarInStateNum+1,carColor:this.CarInCoFont[this.CarInCoNum],registration:this.Registration,carInvoice:this.Carinvoice,keepRecord:this.MaintainRecord,surfaceState:this.AbroadCondition,insideState:this.InteriorStatus,carState:this.CarStatus,procurePrice:this.AddPurPrice,offlinePrice:this.AddExhiPrice,lowPrice:this.AddSaleMiniPrice,onlinePrice:this.AddNetPinPrice,tradePrice:this.AddWholesalePrice,AddBuyer:this.AddBuyer,purchaseDate:this.PurchaseData?this.PurchaseData.getTime():"",payMode:this.AddBuyModeLiNum+1,carSource:this.AddCarSourceLiNum+1,keyNum:this.KeyNum,carLocation:this.carLocation.length?this.carLocation.join(""):this.carInfo.carLocation,displayLocation:this.displayLocation.length?this.displayLocation.join(""):this.carInfo.displayLocation,purchaseCity:this.buyLocation.length?this.buyLocation.join(""):this.carInfo.purchaseCity,salesMan:this.NetSalesPe,carDescribe:this.carDesc,companyId:this.$store.state.company.id,title:this.title});case 2:a=e.sent,t=a.data,t.data,i=t.success,n=t.info,i?(this.$message.success("更新成功"),this.$router.go(-1)):this.$message.warning(n);case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}()}},v=u,p=(t("98f2"),t("2877")),h=Object(p["a"])(v,i,n,!1,null,"4af55350",null);a["default"]=h.exports},"98f2":function(e,a,t){"use strict";var i=t("3bf7"),n=t.n(i);n.a}}]);