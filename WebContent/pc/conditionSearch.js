$(function(){
//	cond_search();
});


function cond_search(){
	var origin = $('#origin').val();
	//var generas = document.getElementsByName('Genera'); 
	var genera=null;
	for(var i =0;i<generas.length;i++){
		if(generas[i].checked){
			  genera=generas[i].value;
			  break;
			}
	}
	/*
	var subjects = document.getElementsByName('Subject'); 
	var subject=null;
	for(var i =0;i<subjects.length;i++){
		if(subjects[i].checked){
			subject=subjects[i].value;
			  break;
			}
	}
	*/
	var query = "select * from tb_wood ";
	if(origin!=""||genera!=null){
		query=query+"where ";
		if(origin!="")query=query+"wood_origin = '"+origin+"' and ";
		//if(air_dry_density_min!=""||air_dry_density_max!="")query=query+"wood_air_dry_density = '"+air_dry_density+"' and ";
		if(genera!=null)query=query+"genera_id = '"+genera+"' and ";
		//if(subject!=null)query=query+"subject_id = '"+subject+"'";
		var index=query.lastIndexOf("and");
		query=query.slice(0,index);
		alert(query);
	}
	
	var options = {
			dataType:"text",
			async:false,
			callFunction:showWoodInfo,
			loading:false,
			fixString:false,		//是否去掉null
			param:{
				"sql": query,
			},
	}
	var ret = jimFrame.doSend_jsonp(options);
}

function showWoodInfo(data){
	var a_d_d_min = $('.min').val(); 
	var a_d_d_max = $('.max').val(); 
	
	var newData=new Array();
	var j=0;
	
	if(a_d_d_min!=""||a_d_d_max!=""){
		if(a_d_d_min<=a_d_d_max){
		for(var i=0;i<data.length;i++){
			var air_dry_density = data[i].wood_air_dry_density;
			if(air_dry_density.indexOf("-")!=-1){
				var densitys=new Array();
				densitys[0] = air_dry_density.slice(0,air_dry_density.indexOf("-"));
				densitys[1] = air_dry_density.slice(air_dry_density.indexOf("-")+1);
				if(densitys[0]>=a_d_d_min&&densitys[1]<=a_d_d_max){
					newData[j++]=data[i];
				}
			}
			else if(air_dry_density>=a_d_d_min&&air_dry_density<=a_d_d_max){
				newData[j++]=data[i];
			}
		}
		}
		else {
			alert("查询有误！");
		}
	}else{
		newData=data;
	}
	
	for(var i=0;i<newData.length;i++){
		document.write("<p>"+newData[i].id+"</p>");
	}
	
//	  var obj = {'total':newData.length,'rows':newData};  
//		$('#dg').datagrid('loadData',obj);  
}