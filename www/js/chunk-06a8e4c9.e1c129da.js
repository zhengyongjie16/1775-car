(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06a8e4c9"],{"37e6":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"SystemSet"},[s("van-nav-bar",{attrs:{title:"设置","left-text":"返回","left-arrow":""},on:{"click-left":function(t){return e.$router.go(-1)}}}),s("div",{staticClass:"SystemSetBox"},[s("div",{staticClass:"SystemSetRi"},[s("div",{staticClass:"SystemSetTop"},[s("div",{staticClass:"SystemSetTopLe"},[s("ul",e._l(e.SystemSetState,function(t,a){return s("li",{staticClass:"SystemSetTopLeLi",class:e.SystemSetTopLeNum==a?e.SeTopLeCli:"",on:{click:function(t){e.SystemSetTopLeNum=a}}},[e._v(e._s(t))])}),0)])]),0==e.SystemSetTopLeNum?s("div",{staticClass:"BasicData"},[s("div",{staticClass:"BasicDataTop"},[e._m(0),s("div",{staticClass:"BasicTable"},[s("div",[s("div",[s("span",[e._v("公司名称:")]),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.CompanyName,callback:function(t){e.CompanyName=t},expression:"CompanyName"}})],1),s("div",[e._m(1),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.Contacts,callback:function(t){e.Contacts=t},expression:"Contacts"}})],1)]),s("div",[s("div",[s("span",[e._v("营业时间:")]),s("el-input",{staticClass:"shortSele",attrs:{size:"mini"},model:{value:e.SyBusTimeSta,callback:function(t){e.SyBusTimeSta=t},expression:"SyBusTimeSta"}}),s("strong",[e._v("--")]),s("el-input",{staticClass:"shortSele",attrs:{size:"mini"},model:{value:e.SyBusTimeEnd,callback:function(t){e.SyBusTimeEnd=t},expression:"SyBusTimeEnd"}})],1),s("div",[e._m(2),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.ContactsIph,callback:function(t){e.ContactsIph=t},expression:"ContactsIph"}})],1)]),s("div",[s("div",[s("span",[e._v("所属地区:")]),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.SyRegion,callback:function(t){e.SyRegion=t},expression:"SyRegion"}})],1),s("div",[s("span",[e._v("座机")]),s("el-input",{staticClass:"shortSele",attrs:{size:"mini"},model:{value:e.fixedSta,callback:function(t){e.fixedSta=t},expression:"fixedSta"}}),s("strong",[e._v("--")]),s("el-input",{staticClass:"shortSele",attrs:{size:"mini"},model:{value:e.fixedEnd,callback:function(t){e.fixedEnd=t},expression:"fixedEnd"}})],1)]),s("div",[s("div",[e._m(3),s("el-input",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.GenusPlace,callback:function(t){e.GenusPlace=t},expression:"GenusPlace"}})],1)])])]),s("div",{staticClass:"newRow"}),s("div",{staticClass:"BasicAddress"},[e._m(4),s("div",{staticClass:"BasicAddCont"},[s("div",[e._m(5),s("el-input",{staticClass:"checkSele",attrs:{size:"mini"},model:{value:e.CompanyName,callback:function(t){e.CompanyName=t},expression:"CompanyName"}}),s("strong",[e._v("为了让用户更好的找到你，请核实地图标注的精确位置是否准确。")])],1)])]),e._m(6),s("div",{staticClass:"BasicBtn"},[e._v("\n            保存\n        ")])]):e._e(),1==e.SystemSetTopLeNum?s("div",{staticClass:"Propaganda"},[e._m(7),s("p",[e._v("1.公司logo尺寸为180×180，按要求上传则有机会在二手车列表页展示哟。")]),s("p",[e._v("2.公司宣传照片最大3M，请上传公司门头照，不得违反国家法律法规。")]),s("div",{staticClass:"TuUpload"},[s("div",[s("el-upload",{attrs:{slot:"footer",action:"https://api.1775.net.cn/common/upload","list-type":"picture-card",data:{type:"company"},"on-remove":e.doRemove1,"on-success":e.uploadLogo,"before-upload":e.uploadPre,limit:1,"show-file-list":!1},slot:"footer"},[e.companyInfo.logo?s("img",{attrs:{src:e.companyInfo.logo}}):s("i",{staticClass:"el-icon-plus"})])],1),s("p",[e._v("点击从电脑上上传公司logo")])]),s("div",{staticClass:"TuUpload"},[s("div",[s("el-upload",{staticClass:"otherPic",attrs:{slot:"footer",action:"https://api.1775.net.cn/common/upload","list-type":"picture-card",data:{type:"company"},"on-remove":e.doRemove2,"on-success":e.uploadOtherPic,"before-upload":e.uploadPre,limit:15,multiple:"","file-list":e.imgList,"show-file-list":!0},slot:"footer"},[s("i",{staticClass:"el-icon-plus"})])],1),s("p",[e._v("点击从电脑上上传公司宣传照片")])]),s("div",{staticClass:"PropagandaBtn",on:{click:e.doSave}},[e._v("\n          保存\n        ")])]):e._e(),2==e.SystemSetTopLeNum?s("div",{staticClass:"NewsInfor"},[e._m(8),e._m(9),e._m(10),s("div",{staticClass:"NewsInforFrom"},[s("div",[s("div",[e._m(11),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.LicenseName,callback:function(t){e.LicenseName=t},expression:"LicenseName"}})],1),s("div",[e._m(12),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.LicenseNumber,callback:function(t){e.LicenseNumber=t},expression:"LicenseNumber"}})],1)]),s("div",[s("div",[e._m(13),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.EstablishTime,callback:function(t){e.EstablishTime=t},expression:"EstablishTime"}})],1),s("div",[e._m(14),s("el-input",{staticClass:"checkSele",attrs:{disabled:!0,size:"mini"},model:{value:e.legalName,callback:function(t){e.legalName=t},expression:"legalName"}})],1)])])]):e._e()])])],1)},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"BasicTit"},[s("span"),e._v("基本信息\n          ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v(" 联系人")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v(" 手机")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v("所属交易场所:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"BasicTit"},[s("span"),e._v("地址信息\n          ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v(" 公司地址:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"CharaSer"},[s("div",{staticClass:"BasicTit"},[s("span"),e._v("特色服务\n          ")]),s("div",{staticClass:"CharaSerLi"},[s("div",[e._v("经纪公司")]),s("div",[e._v("车辆置换")]),s("div",[e._v("价格评估")]),s("div",[e._v("待办过户")]),s("div",[e._v("待办上牌")]),s("div",[e._v("待办转籍")]),s("div",[e._v("待办保险")]),s("div",[e._v("车辆寄售")]),s("div",[e._v("补办手续")]),s("div",[e._v("分期贷款")]),s("div",[e._v("延长质保")]),s("div",[e._v("整顿翻新")]),s("div",[e._v("车辆美容")]),s("div",[e._v("试乘驾驶")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"BasicTit"},[s("span"),e._v("公司logo照片&宣传照片\n        ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"examine"},[e._v("审核状态: "),s("span")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"BasicTit"},[s("span"),e._v("营业执照信息\n        ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"License"},[s("div",{staticClass:"LicenseFon"},[s("span",[s("strong",[e._v("*")]),e._v(" 营业执照:上传营业执照需要复印件照片加盖公章")])]),s("div",{staticClass:"LicenseTu"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v("营业执照名称:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v("营业执照注册号:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v("成立时间:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("strong",[e._v("*")]),e._v("法人代表姓名:")])}],n=(s("96cf"),s("3b8d")),c=(s("34ef"),s("28a5"),{name:"SystemSet",data:function(){return{SetLi:["公司设置"],SetNum:"0",SetClick:"SetClick",Rotate:{transform:"rotate(180deg)"},SetReleaseTime:"",SetSelect:"",SystemSetState:["基本信息","宣传信息"],SystemSetTopLeNum:"0",SeTopLeCli:"SeTopLeCli",CompanyName:"xxx",Contacts:"xxx",SyBusTimeSta:"",SyBusTimeEnd:"",ContactsIph:"xxx",SyRegion:"xxx",fixedSta:"",fixedEnd:"",GenusPlace:"",imageUrl:"",companyInfo:null,LicenseName:"",LicenseNumber:"",EstablishTime:"",legalName:""}},created:function(){this.companyInfo=this.$store.state.company},methods:{dataURItoBlob:function(e,t){for(var s=atob(e.split(",")[1]),a=[],i=0;i<s.length;i++)a.push(s.charCodeAt(i));return new Blob([new Uint8Array(a)],{type:t})},doRemove1:function(){this.compnayInfo.logo=""},doRemove2:function(e,t){this.imgList=t},uploadPre:function(e){var t="image/jpeg"===e.type,s="image/png"===e.type;if(!t&&!s)return this.$message.warning("仅支持png 和 jpeg"),!1;this.uploadTotal=this.uploadTotal+100;var a=e.size/1024/1024;if(a>1){var i=this;return new Promise(function(t){var s=new FileReader,a=new Image;a.onload=function(s){var n=document.createElement("canvas"),c=n.getContext("2d"),o=a.width*i.imgQuality,l=a.height*i.imgQuality,r=1e3;o>r?(n.width=r,n.height=parseInt(l*r/o),o=n.width,l=n.height):(n.width=o,n.height=l),c.clearRect(0,0,o,l),c.drawImage(a,0,0,o,l);var u=n.toDataURL(e.type),m=i.dataURItoBlob(u,e.type);t(m)},s.onload=function(e){a.src=e.target.result},s.readAsDataURL(e)})}},uploadOtherPic:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,s,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.imgList=a;case 1:case"end":return e.stop()}},e,this)}));function t(t,s,a){return e.apply(this,arguments)}return t}(),uploadLogo:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.companyInfo.logo=t.data;case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),doSave:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,s,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.companyInfo.conpanyId=this.companyInfo.id,this.companyInfo.otherPic=this.imgList.map(function(e){return e.response.data}).join(),e.next=4,this.$api.post("/updateCompanyInfo",this.companyInfo);case 4:t=e.sent,s=t.data,a=s.success,s.data,a?(this.$message.success("更新成功"),this.$store.dispatch("getCompanyInfo")):this.$message.error("更新失败");case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),handleAvatarSuccess:function(e,t){this.imageUrl=URL.createObjectURL(t.raw)},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type,s=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),s||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&s}}}),o=c,l=(s("9254"),s("2877")),r=Object(l["a"])(o,a,i,!1,null,"1cd0c872",null);t["default"]=r.exports},"557d":function(e,t,s){},9254:function(e,t,s){"use strict";var a=s("557d"),i=s.n(a);i.a}}]);