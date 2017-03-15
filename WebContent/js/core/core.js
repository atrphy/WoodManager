$(function(){
	var options = {
			url : "jsp/outPutCache.jsp",
			dataType:"text",
			async:false,
			callFunction:null,
			loading:false,
			fixString:false,			//是否去掉null
			param:{
				"sql":"",			//必须，类型，必须是[insert,search|select,update,delete,sql]中的一个  
			},
	}
	
	var ret = jimFrame.doSend(options);
	 debugger;
});