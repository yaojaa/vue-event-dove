webpackJsonp([4,6],{256:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(3),n=i(s),r=a(16),c=i(r),o=a(2),l=a(4),d=a(172),u=(i(d),function t(e,a,i){var s=this;if("object"==("undefined"==typeof e?"undefined":(0,c.default)(e)))var n=e.splice(0,1);else var n=e;var r={success:{color:"green"},error:{color:"red"}},o=$(this.element).find(".comp-div").css({width:i+"%"}).css(r[a]);100==i&&setTimeout(function(){o.text(n)},200),setTimeout(function(){o.css({width:0}).text(""),"object"==("undefined"==typeof e?"undefined":(0,c.default)(e))&&e.length>0&&t.call(s,e,a,i)},2e3)});e.default={name:"designPanel",data:function(){return{msg:"Welcome to Event Dove",uploadUrl:o.upload.uploadURL,token:"",filesize:1,eventData:{thumbnail:"/images/no_up_banner.png",bannerUrl:"/images/no_up_banner.png",mobileBannerUrl:"/images/no_up_banner.png"}}},props:["pageData"],created:function(){this.eventData=$.extend(this.eventData,this.pageData)},mounted:function(){var t=this;$(".thumbnail").popup({popup:$(".thumbnail-popup"),on:"hover",hoverable:!0,position:"bottom left"}),$(".design-tab .item").tab(),$(".designImg").dimmer({opacity:.5,on:"hover"}),$(".designBar").sidebar({transition:"push",scrollLock:!1,context:".sidbarWarper"}).sidebar("attach events",".open.button","toggle"),this.uptoken=(0,l.getUptoken)();var e=this,a={url:this.uploadUrl,maxFiles:null,maxFilesize:this.filesize,acceptedFiles:".jpg,.jpeg,.png,.gif",sending:function(e,a,i){i.append("token",t.uptoken)},addedfile:function(t){t.size>1024*e.filesize*1024&&u.call(this,["文件太大","请上传"+e.filesize+"M","以内的文件"],"error",100)},init:function(){this.on("uploadprogress",function(t,e,a){u.call(this,"上传成功","success",e)})}};(0,l.loadJs)("/js/dropzone.js",function(){new Dropzone("#thumbnail",a).on("success",function(t){e.imgsrc=o.IMG_SERVER+JSON.parse(t.xhr.response).key,e.upload(e.imgsrc,this.element.id)}),new Dropzone("#bannerUrl",a).on("success",function(t){e.imgsrc=o.IMG_SERVER+JSON.parse(t.xhr.response).key,e.upload(e.imgsrc,this.element.id)}),new Dropzone("#mobileBannerUrl",a).on("success",function(t){e.imgsrc=o.IMG_SERVER+JSON.parse(t.xhr.response).key,e.upload(e.imgsrc,this.element.id)})})},methods:{upload:function(t,e){var a=this,i={id:this.$route.params.id};i[e]=t,$.ajax({type:"post",url:o.API_URL+"/event/update",data:(0,n.default)(i),success:function(i){a.$message.success("保存成功"),"bannerUrl"==e&&a.$emit("uploaded",t),a.eventData[e]=t}})}}}},438:function(t,e,a){e=t.exports=a(21)(),e.push([t.id,".designImg[data-v-0aa7d988]{position:relative}.designBar[data-v-0aa7d988]{background:#000;box-shadow:none!important}","",{version:3,sources:["/./src/components/design_panel.vue"],names:[],mappings:"AACA,4BACI,iBAAmB,CACtB,AACD,4BACI,gBAAiB,AACjB,yBAA4B,CAC/B",file:"design_panel.vue",sourcesContent:["\n.designImg[data-v-0aa7d988] {\n    position: relative;\n}\n.designBar[data-v-0aa7d988] {\n    background: #000;\n    box-shadow: none !important;\n}\n"],sourceRoot:"webpack://"}])},450:function(t,e,a){var i=a(438);"string"==typeof i&&(i=[[t.id,i,""]]);a(22)(i,{});i.locals&&(t.exports=i.locals)},576:function(t,e,a){var i,s;a(450),i=a(256);var n=a(670);s=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(s=i=i.default),"function"==typeof s&&(s=s.options),s.render=n.render,s.staticRenderFns=n.staticRenderFns,s._scopeId="data-v-0aa7d988",t.exports=i},670:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui left designBar sidebar fixed"},[a("div",{staticClass:"ui basic segment"},[t._m(0),t._v(" "),a("div",{staticClass:"designImg"},[t.eventData.thumbnail?a("img",{staticClass:"ui medium image",attrs:{src:t.eventData.thumbnail+"?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim",alt:""}}):t._e(),t._v(" "),t._m(1)]),t._v(" "),a("div",{staticClass:"space-sm f12 text-muted"},[t._v("\n            一张漂亮的封面图片可以提高浏览者视觉体验，同时可以宣传活动内容。建议上传尺寸720px*360px的.png、.jpg、.gif图片，图片小于1M。\n        ")]),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"ui thumbnail-popup popup right transition hidden"},[a("h4",{staticClass:"mb-xs"},[t._v("效果展示")]),t._v(" "),a("p",{staticClass:"text-info f12"},[t._v("此封面生效在发现活动及首页推广")]),t._v(" "),a("div",{staticClass:"hot-activity"},[a("div",{staticClass:"ui default card hot-card",staticStyle:{width:"200px"}},[a("div",{staticClass:"image"},[a("img",{attrs:{src:t.eventData.thumbnail+"?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim"}})]),t._v(" "),t._m(3)])])]),t._v(" "),a("div",{staticClass:"comp-div"}),t._v(" "),t._m(4),t._v(" "),a("div",{staticClass:"design-tab"},[t._m(5),t._v(" "),a("div",{staticClass:"ui active tab",attrs:{"data-tab":"pc-banner"}},[a("div",{staticClass:"designImg mt-md"},[t.eventData.bannerUrl?a("img",{staticClass:"ui medium image",attrs:{src:t.eventData.bannerUrl,alt:""}}):t._e(),t._v(" "),t._m(6)]),t._v(" "),a("div",{staticClass:"space-sm f12 text-muted"},[t._v("\n                    图片高度不限，网页端宽度推荐1920px\n                ")])]),t._v(" "),a("div",{staticClass:"ui tab",attrs:{"data-tab":"mob-banner"}},[a("div",{staticClass:"designImg mt-md"},[t.eventData.mobileBannerUrl?a("img",{staticClass:"ui medium image",attrs:{src:t.eventData.mobileBannerUrl,alt:""}}):t._e(),t._v(" "),t._m(7)]),t._v(" "),a("div",{staticClass:"space-sm f12 text-muted"},[t._v("\n                    图片高度不限，移动端推荐640px\n                ")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h4",{staticClass:"ui grey inverted header mt-sm"},[a("i",{staticClass:"icon-magic iconfont icon f16"}),a("div",{staticClass:"content"},[t._v("宣传封面")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui dimmer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"center"},[a("button",{staticClass:"ui button mini blue",staticStyle:{position:"relative"},attrs:{id:"thumbnail"}},[a("i",{staticClass:"upload  icon"}),t._v("上传封面")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-green"},[a("span",{staticClass:"thumbnail"},[a("i",{staticClass:"help circle icon"}),t._v("使用示例")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"card-box"},[a("div",{staticClass:"card-text f16 p-n"},[t._v("宣传封面示例活动")])]),t._v(" "),a("div",{staticClass:"info-box"},[a("p",{staticClass:"text-muted date"},[a("span",[a("i",{staticClass:"wait icon"}),t._v("20xx年x月x日")])]),t._v(" "),a("div",{staticClass:"text-muted"},[a("div",{staticClass:"text-hide"},[a("i",{staticClass:"marker icon"}),t._v("北京朝阳区XXX")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h4",{staticClass:"ui grey inverted header"},[a("i",{staticClass:"icon-yishu iconfont icon f16"}),a("div",{staticClass:"content"},[t._v("活动Banner图")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui mini two buttons"},[a("a",{staticClass:"active item ui grey inverted  button",attrs:{"data-tab":"pc-banner"}},[a("i",{staticClass:"desktop icon"}),t._v("网页端")]),t._v(" "),a("a",{staticClass:"item ui grey inverted button",attrs:{"data-tab":"mob-banner"}},[a("i",{staticClass:"tablet icon"}),t._v("移动端")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui dimmer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"center"},[a("button",{staticClass:"ui button mini blue",staticStyle:{position:"relative"},attrs:{id:"bannerUrl"}},[a("i",{staticClass:"upload  icon"}),t._v("上传网页端banner")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui dimmer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"center"},[a("button",{staticClass:"ui button mini blue",staticStyle:{position:"relative"},attrs:{id:"mobileBannerUrl"}},[a("i",{staticClass:"upload  icon"}),t._v("上传移动端banner")])])])])}]}}});
//# sourceMappingURL=4.f1231cc8713dc6c6c75e.js.map