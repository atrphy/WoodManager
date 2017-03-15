/**
 * 所有的返回都是返回 一个 json数组
 * 比如{"state":"1",value:1,msg:'错误'}
 * 其中 state==1表示请求成功状态，其他值为请求不成功
 * 	  value就是值，如果是增加或者删除或者修改操作，该值表示数据库更新的条数
 *    msg表示信息提示，用于debugger或者开发人员知道错在哪里
 * 
 */
var info;
$(function(){
	getWoodInfo();
	//_add();//增加
	//_update();//修改
	//_delete();
});





function newWood(){
	$('#dlg').dialog('open').dialog('setTitle','新增');
	$('#fm').form('clear');
}
function editWood(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		$('#dlg').dialog('open').dialog('setTitle','编辑');
		$('#fm').form('load',row);
	} else {
		errorMassage("未选定行！")
	}
}
function removeWood(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		$.messager.confirm('警告','是否确定删除该条记录?',function(r){
			if (r){
				//alert(row.id);
				_delete(row.wood_no);
			}
		});
	} else {
		errorMassage("未选定行！");
	}
}
function detailWood(){
	var row = $('#dg').datagrid('getSelected');
	if (row){
		addTab(row.wood_name,"details.html?no=" + row.wood_no);//增加tab
		//alert(row.wood_name + row.wood_no);
	} else {
		errorMassage("未选定行！");
	}
}




function saveWood(){
	//getElements('fm');
	var row = $('#dg').datagrid('getSelected');
	info = getElements('fm');
	if(row == null) {
		_add(info);
	}
	else {
		_update(row.wood_no, info);
	}
	$('#dlg').dialog('close');
	
}

/**
 * 根据弹窗中输入的值返回一个var
 * @param formId	
 */
function getElements(formId) {    
    var form = document.getElementById(formId); 
    var tagElements = form.getElementsByTagName('input');    
    var elements = {
			"wood_name":tagElements[0].value,				//可以继续添加属性
			"wood_latin":tagElements[1].value,		//可以继续添加属性
			"wood_origin":tagElements[2].value,	
			"wood_air_dry_density":tagElements[3].value,	
			"wood_common_name":tagElements[4].value,	
    }
   return elements;
}
function errorMassage(info) {
	 $.messager.show({
			title: 'Error',
			msg: info
	});
}

function close(pos) {
	$('#main').layout('remove',pos);  
}

function addEastPanel(){
	if($('#cond').length>0){
		close("east");
	}
	else{
	var eastContent = '<div style="font-size: 50%;  width: 190px;">' + 
	'<form id="cond"   method="post" novalidate>' + 
	'<p style="font-weight: bold">产地</p >' + 
	'<input type="text" name="Origin" id="origin"/>' + 
	'<p style="font-weight: bold">气干密度</p >' + 
	'<fieldset>' + 
    	'<legend>值域</legend>' + 
    		'<input type="text" name="A&D_density_min" id="min" placeholder="最低值（单位为g/cm3）" /> —' + 
    		'<input type="text" name="A&D_density_max" id="max" placeholder="最高值（单位为g/cm3）" />' + 
    '</fieldset>' + 
	'<br>' + 
	'<br>' + 
	'</form>' + 
	'</div>';
	$('#main').layout('add', {
		 region: 'east',
		 width: 230,
		 title: '条件查找', 
		 split: true,  
		 content:eastContent,
		    tools: [{    
		        iconCls:'icon-ok', 
		        handler:function(){cond_search();}
		    },{    
		        iconCls:'icon-reload',    
		        handler:function(){document.getElementById("cond").reset(); }    
		    }]  
    });
}
}


function cond_search(){
	var origin = $('#origin').val();
	/*var generas = document.getElementsByName('Genera'); 
	var genera=null;
	for(var i =0;i<generas.length;i++){
		if(generas[i].checked){
			  genera=generas[i].value;
			  break;
			}
	}*/
	
	var query = "select * from woods ";
	if(origin!=""){
		query=query+"where ";
		if(origin!="")query=query+"wood_origin = '"+origin+"' and ";
		//if(genera!=null)query=query+"genera_id = '"+genera+"' and ";
		var index=query.lastIndexOf("and");
		query=query.slice(0,index);
	}
	// 设置请求响应的URI
	var uri = "../executeSearchAndList.do"
	initXMLHttpRequest(uri, processResponse_CondSer);
	// 发送请求
	xmlrequest.send("sql=" + query);
}
function processResponse_CondSer() {
	// 响应完成且响应正常
	if (xmlrequest.readyState == 4) {
		if (xmlrequest.status == 200) {
			// 获取服务器的JSON响应
			// 并调用eval()函数将服务器响应解析成JavaScript数组
			// alert("OK");
			// var status = eval(xmlrequest.responseText);
			// alert(status);
			var woods = eval(xmlrequest.responseText);
			showCSResult(woods);
		} else {
			// 页面不正常
			window.alert("您所请求的页面有异常。");
		}
	}
}
function showCSResult(data){
	if(data == null || data.length == 0) errorMassage('无结果');
	else{
	var a_d_d_min = $('#min').val(); 
	var a_d_d_max = $('#max').val(); 
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
			errorMassage('查询条件有误');
		}
	}else{
		newData=data;
	}
	
	showWoodInfo(newData);
	}
	close("east");
}
function addBottomFont(operation, selectedRow) {
	var content = '最近' + operation + ':(名称)' + selectedRow.wood_name + "  点击获得<a href = '#' onclick = 'alert('test')' > 详情!!! </a>";
	//alert(content);
	$('#footF').html(content);
}

