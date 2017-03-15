var controllerUrl =   "jsp/controller.jsp";
var controllerUrl_jsonp = "http://120.24.176.17/jinFrame/jsp/controller_jsonp.jsp";
//var controllerUrl_jsonp = "http://localhost:8080/jinFrame/jsp/controller_jsonp.jsp";
var jimFrame = {
	options : {
			url : controllerUrl,
			dataType:"json",
			async:false,
			callFunction:null,
			loading:false,
			fixString:false,			
			param:{
				"type":"search",			
				"table":"tb_user",			
							
			},
			
	},
	doSend : function(json){
		if(json==undefined||json.param==undefined){
			alert("前端参数错误");
			return false;
		}
		if(json.param.sql!=undefined){
			return this.search(json);
		}
		json.param.type = json.param.type.toLowerCase();
		if(json.param.type=="search"||json.param.type=="select"){
			return this.search(json);
		}else if(json.param.type=="searchBean"){
			return this.searchBean(json);
		}else if(json.param.type=="insert"){
			return this.insert(json);
		}else if(json.param.type=="update"){
			return this.update(json);
		}else if(json.param.type=="delete"){
			return this.update(json);
		}else if(json.param.type=="service"){
			return this.update(json);
		}else{
			alert("类型要为：insert update delete search|select,sql中的一个");
		}
	},
	service : function(json){
		$.extend( this.options, json);
		return this.doPost(this.options);
	},
	insert : function(json){
		$.extend( this.options, json);
		return this.doPost(this.options);
	},
	update : function(json){
		$.extend( this.options, json);
		return this.doPost(this.options);
	},
	deleteItem : function(json){
		$.extend( this.options, json);
		return this.doGet(this.options);
	},
	search : function(json){
		$.extend( this.options, json);
		return this.doGet(this.options);
	},
	doGet : function (options){
		return this.doAjax(options,"get");
	},
	doPost : function (data,ajax){
		return this.doAjax(options,"post");
	},
	serialize : function (json){
		var str = jQuery.param(params);
		return str;  		
	},

	getString : function(str,a){
		return str=="null"?a:str;
	},
	
	checkXss : function(json){
		var r = new Object();
		$.each(json,function(name,value){
			r[name] = value.replace(/<script.*?>.*?<\/script>/ig, '');  
		});
		return r;
	},
	
	processJSON : function(json,a){
		var r ;
		if(json instanceof Array){
			r = new Array();
			for(j in json){
				var o = new Object();
				$.each(json[j],function(name,value){
					o[name] = jimFrame.getString(value,a);
				});
				r.push(o);
			}
			return r;
		}else if(json instanceof Object){
			r = new Object();
			$.each(json,function(name,value){
				r[name]  = jimFrame.getString(value,a);
			});
			return r;
		}else{
			return json;
		}
	},
	
	doAjax : function (options,type){
		data = jimFrame.checkXss(options.param);
		var fixString = options.fixString;
		var url = options.url;
		var dataType  = options.dataType;
		var async = options.async;
		var callFunction = options.callFunction;
		var loading = options.loading;
		dataType = dataType.toLowerCase();
		var ret = null;
		 $.ajax({
				 url:url,
				 data:data,
				 async:async,
				 cache:false,
				 dataType:dataType,
				 
				 global:true,
				 ifModified:false,
				 timeout:10*1000,
				 type:type,
				 contentType:'application/x-www-form-urlencoded',
				 beforeSend:function(xhr){
					 
					 
					 if(loading){
						 
					 }
				 },
				 complete:function(xhr,ts){
					 
				 },
				 dataFilter:function(data,type){
					 try{
						 
						 if(dataType=="html"||dataType=="text"){
							 if(fixString){
								 return jimFrame.processJSON(jQuery.parseJSON(data),""); 
							 }else{
								 return jQuery.parseJSON(data); 
							 }
						 }else{
							 return data;
						 }
					 }catch(e){
						 
						 
						 throw "无法转换数据："+data;
					 }
				 },
				 error:function(xhr,errorType,e){
					 
					 if(errorType=="timeout"){
						 alert("请求超时");
					 }
					 if(xhr.status=="500"){
						 alert("后台报错");
					 }else if(xhr.status=="404"){
						 alert("请求路径错误");
					 }
				 },
				 success:function(data){
					 try{
						 if(data==undefined){
							 throw "无法正确返回数据";
						 }
						 if(dataType=="html"||dataType=="text"||dataType=="json"){
							 ret = data;
							 if(ret.state=="-1"){
								 alert("ERROR"+ret['value']);
								 
							 }
						 }
						 
						 if(callFunction!=null){
							 callFunction(data);
						 }
						 if(loading){
							 
						 }
					 }catch(e){
						 alert(e);
						 return false;
					 }
				 }
		 	}
		 );
		 return ret;
	},
	options_jsonp : {
			url : controllerUrl_jsonp,
			async:false,
			callFunction:"",			
			loading:false,
			fixString:false,			
			param:{
				"type":"search",			
				"table":"tb_user",			
							
			},
			
	},
	doSend_jsonp : function(json){
		if(json==undefined||json.param==undefined){
			alert("前端参数错误");
			return false;
		}
		if(json.param.sql!=undefined){
			return this.search_jsonp(json);
		}
		json.param.type = json.param.type.toLowerCase();
		if(json.param.type=="search"||json.param.type=="select"){
			return this.search_jsonp(json);
		}else if(json.param.type=="searchBean"){
			return this.searchBean_jsonp(json);
		}else if(json.param.type=="insert"){
			return this.insert_jsonp(json);
		}else if(json.param.type=="update"){
			return this.update_jsonp(json);
		}else if(json.param.type=="delete"){
			return this.update_jsonp(json);
		}else if(json.param.type=="service"){
			return this.update_jsonp(json);
		}else{
			alert("类型要为：insert update delete search|select,sql中的一个");
		}
	},
	service_jsonp : function(json){
		$.extend( this.options_jsonp, json);
		return this.doPost_jsonp(this.options_jsonp);
	},
	insert_jsonp : function(json){
		$.extend( this.options_jsonp, json);
		return this.doPost_jsonp(this.options_jsonp);
	},
	update_jsonp : function(json){
		$.extend( this.options_jsonp, json);
		return this.doPost_jsonp(this.options_jsonp);
	},
	deleteItem_jsonp : function(json){
		$.extend( this.options_jsonp, json);
		return this.doGet_jsonp(this.options_jsonp);
	},
	search_jsonp : function(json){
		$.extend( this.options_jsonp, json);
		return this.doGet_jsonp(this.options_jsonp);
	},
	doGet_jsonp:function(){
		return this.doJsonp(this.options_jsonp,"get");
	},
	doPost_jsonp:function(){
		return this.doJsonp(this.options_jsonp,"post");
	},
	doJsonp:function(options,type){
		var url = options.url;
		var data = options.param;
		var callback = options.callFunction;
		return this.doCrossDomain(url,type,data,callback);
	},
	
	doCrossDomain:function(url,type,data,callback){
		data = jimFrame.checkXss(data);
		if(callback==undefined){
			alert("请定义回调函数");
			return false;
		}
		if(typeof(callback)!="function"){
			alert(callback+"不是一个函数");
			return false;
		}
		var ret = null;
		$.ajax({
			   async:false,
			   url: url,
			   type: type,
			   dataType: 'jsonp',
			   jsonp:'callback',            				
		       jsonpCallback:"successCallback",				
			   data: data,
			   timeout: 5000,
			   success: function (data) {
				   callback(data);
				   ret = data;
			   },
			   complete: function(XMLHttpRequest, textStatus){
				   
			   },
			   error: function(xhr){
				  alert(xhr.statusText);
				  if(xhr.status=="404"){
					  return false;
				  }
			   }
		});
		return ret;
	},
	
}

function showHtml(selector, json,clear,append){
	var target = $(selector).clone();
	if(clear==undefined||clear){
		$(selector).html("");
	}
	$(selector).show();
	if(json instanceof Array){
		var html = "";
		var template = target.html();
		for(var i =0;i<json.length;i++){
			html += htmlFormat(template,json[i]);
		}
		if(append==undefined||append){
			$(selector).append(html);
		}else{
			$(selector).prepend(html);
		}
	}else if(json instanceof Object){
		var template = target.html();
		var html = htmlFormat(template,json);
		if(append==undefined||append){
			$(selector).append(html);
		}else{
			$(selector).prepend(html);
		}
	}else{
		
		return false;
	}
}

function htmlFormat(template, json) {
	
	return template.replace(/\$\#([^\#]*)\#/g, function(matchStr, name) {
		
		return json[name] || "";
	});
}


function addLoading(){
	 var loading = $("#loading");
	 if(loading.length>0){
		loading.show();
		loading.fadeIn();
	 }else{
	     var str= '<div align="center" id="loading"  style="width:102%;height:100%;opacity: 0.5;background: black;z-index:9999;position:fixed;top:0;left:-1%;right:-1%;"> <div style="margin-top:40%;color:white;"></div><span class="mui-spinner"></span></div>';
	     $("body").append(str);
	 }
	 checkLoading(true);
	 $("#loading").click(function(){
		 closeLoading();
	 });
}
function closeLoading(){
	var loading = $("#loading");
	if(loading.length>0){
		loading.fadeOut();
	}
	checkLoading(false);
}
var int;
var closeSecond = 20*1000;
function checkLoading(flag){
	if(flag){
		int=self.setInterval("closeLoading()",closeSecond);
	}else{
		int=null;
	}
}
